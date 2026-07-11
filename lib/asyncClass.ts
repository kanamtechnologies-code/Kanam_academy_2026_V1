import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/** Shared cohort code for all self-paced / async learners. */
export function getAsyncClassCode(): string {
  const raw = (process.env.KANAM_ASYNC_CLASS_CODE || "KANAM-ASYNC").trim().toUpperCase();
  return raw || "KANAM-ASYNC";
}

export function getAsyncClassName(): string {
  return (process.env.KANAM_ASYNC_CLASS_NAME || "Self-paced learners").trim() || "Self-paced learners";
}

/**
 * Ensure the single shared async class exists (all self-paced students enroll here).
 * Requires KANAM_ASYNC_OWNER_USER_ID (an instructor auth.users id) the first time it is created.
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

  const ownerId = (process.env.KANAM_ASYNC_OWNER_USER_ID || "").trim();
  if (!ownerId) {
    throw new Error(
      "Self-paced class is not set up yet. Set KANAM_ASYNC_OWNER_USER_ID to an instructor user id, then try again."
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

export async function enrollStudentInClassByCode(opts: {
  studentId: string;
  classCode: string;
  admin?: ReturnType<typeof createSupabaseAdminClient>;
}) {
  const admin = opts.admin ?? createSupabaseAdminClient();
  const code = opts.classCode.trim().toUpperCase();
  if (!code) return { ok: false as const, error: "Class code is required." };

  let klass = await admin.from("classes").select("id, is_async").eq("code", code).maybeSingle();

  // If they used the async code before the class row existed, create it.
  if (!klass.data?.id && code === getAsyncClassCode()) {
    const ensured = await ensureAsyncClass(admin);
    klass = { data: { id: ensured.id, is_async: true }, error: null } as typeof klass;
  }

  if (klass.error) return { ok: false as const, error: klass.error.message };
  if (!klass.data?.id) return { ok: false as const, error: "That class code was not found." };

  const { error: enrollErr } = await admin
    .from("class_enrollments")
    .upsert(
      { class_id: klass.data.id, student_id: opts.studentId },
      { onConflict: "class_id,student_id" }
    );

  if (enrollErr) return { ok: false as const, error: enrollErr.message };
  return { ok: true as const, classId: klass.data.id as string, isAsync: Boolean(klass.data.is_async) };
}
