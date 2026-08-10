import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isInstructorRole } from "@/lib/roles";

type AdminClient = ReturnType<typeof createSupabaseAdminClient>;

/** Shared cohort code for all self-paced / async learners. */
export function getAsyncClassCode(): string {
  const raw = (process.env.KANAM_ASYNC_CLASS_CODE || "KANAM-ASYNC").trim().toUpperCase();
  return raw || "KANAM-ASYNC";
}

export function getAsyncClassName(): string {
  return (process.env.KANAM_ASYNC_CLASS_NAME || "Self-paced learners").trim() || "Self-paced learners";
}

async function userExists(admin: AdminClient, userId: string) {
  const { data, error } = await admin.auth.admin.getUserById(userId);
  if (error || !data?.user?.id) return false;
  return true;
}

/**
 * Resolve who owns the shared self-paced class:
 * 1) KANAM_ASYNC_OWNER_USER_ID when that user still exists
 * 2) any existing class teacher
 * 3) any auth user with instructor/teacher app_metadata.role
 */
async function resolveAsyncClassOwnerId(admin: AdminClient): Promise<string | null> {
  const fromEnv = (process.env.KANAM_ASYNC_OWNER_USER_ID || "").trim();
  if (fromEnv && (await userExists(admin, fromEnv))) {
    return fromEnv;
  }

  const { data: existingClass } = await admin
    .from("classes")
    .select("teacher_user_id")
    .not("teacher_user_id", "is", null)
    .limit(1)
    .maybeSingle();
  const fromClass = String(existingClass?.teacher_user_id || "").trim();
  if (fromClass && (await userExists(admin, fromClass))) {
    return fromClass;
  }

  for (let page = 1; page <= 5; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 100 });
    if (error) break;
    const users = data?.users ?? [];
    const instructor = users.find((u) => isInstructorRole(u));
    if (instructor?.id) return instructor.id;
    if (users.length < 100) break;
  }

  return null;
}

/**
 * Ensure the single shared async class exists (all self-paced students enroll here).
 * Prefers KANAM_ASYNC_OWNER_USER_ID; falls back to an existing instructor if needed.
 */
export async function ensureAsyncClass(admin = createSupabaseAdminClient()) {
  const code = getAsyncClassCode();

  const { data: existing, error: findErr } = await admin
    .from("classes")
    .select("id, code, name")
    .eq("code", code)
    .maybeSingle();

  if (findErr) throw new Error(findErr.message);

  if (existing?.id) {
    try {
      await admin.from("classes").update({ is_async: true }).eq("id", existing.id);
    } catch {
      // Column may not exist until schema.sql is applied; enrollment still works by code.
    }
    return { id: existing.id as string, code, name: String(existing.name ?? getAsyncClassName()) };
  }

  const ownerId = await resolveAsyncClassOwnerId(admin);
  if (!ownerId) {
    throw new Error(
      "Self-paced class is not set up yet. Create an instructor account (or set KANAM_ASYNC_OWNER_USER_ID to a valid instructor user id), then try again."
    );
  }

  const { data: inserted, error: insertErr } = await admin
    .from("classes")
    .insert({
      teacher_user_id: ownerId,
      name: getAsyncClassName(),
      code,
      is_async: true,
    })
    .select("id, code, name")
    .single();

  if (insertErr) {
    // Race: another request created it.
    const { data: retry } = await admin
      .from("classes")
      .select("id, code, name")
      .eq("code", code)
      .maybeSingle();
    if (retry?.id) {
      return { id: retry.id as string, code, name: String(retry.name ?? getAsyncClassName()) };
    }
    throw new Error(insertErr.message);
  }

  return {
    id: inserted.id as string,
    code,
    name: String(inserted.name ?? getAsyncClassName()),
  };
}

/** Look up a class by join code. Async code is treated as valid (ensured if missing). */
export async function findClassByCode(
  classCode: string,
  admin = createSupabaseAdminClient()
) {
  const code = classCode.trim().toUpperCase();
  if (!code) return { ok: false as const, error: "Class code is required." };

  const klass = await admin
    .from("classes")
    .select("id, code, name, is_async")
    .eq("code", code)
    .maybeSingle();

  if (!klass.data?.id && code === getAsyncClassCode()) {
    const ensured = await ensureAsyncClass(admin);
    return {
      ok: true as const,
      id: ensured.id,
      code,
      name: ensured.name,
      isAsync: true,
    };
  }

  if (klass.error) return { ok: false as const, error: klass.error.message };
  if (!klass.data?.id) {
    return {
      ok: false as const,
      error: "That class code wasn't found. Check with your teacher, or choose self-paced learning.",
    };
  }

  return {
    ok: true as const,
    id: klass.data.id as string,
    code,
    name: String(klass.data.name ?? "Class"),
    isAsync: Boolean(klass.data.is_async),
  };
}

export async function enrollStudentInClassByCode(opts: {
  studentId: string;
  classCode: string;
  admin?: ReturnType<typeof createSupabaseAdminClient>;
}) {
  const admin = opts.admin ?? createSupabaseAdminClient();
  const found = await findClassByCode(opts.classCode, admin);
  if (!found.ok) return found;

  const { error: enrollErr } = await admin
    .from("class_enrollments")
    .upsert(
      { class_id: found.id, student_id: opts.studentId },
      { onConflict: "class_id,student_id" }
    );

  if (enrollErr) return { ok: false as const, error: enrollErr.message };
  return { ok: true as const, classId: found.id, isAsync: found.isAsync };
}
