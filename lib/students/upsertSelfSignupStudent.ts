import type { createSupabaseAdminClient } from "@/lib/supabase/admin";

type AdminClient = ReturnType<typeof createSupabaseAdminClient>;

export type SelfSignupStudentFields = {
  userId: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  grade?: string;
  schoolId?: string | null;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
};

function isUniqueUserConflict(message: string) {
  const m = message.toLowerCase();
  return (
    m.includes("idx_students_user_unique") ||
    (m.includes("duplicate key") && m.includes("user_id")) ||
    m.includes("students_user_id")
  );
}

/**
 * Create or refresh the single students row for a self-signup auth user.
 * Idempotent under retries / races against ensure-profile.
 */
export async function upsertSelfSignupStudent(
  admin: AdminClient,
  fields: SelfSignupStudentFields
): Promise<{ ok: true; studentId: string } | { ok: false; error: string }> {
  const userId = fields.userId;
  const deviceId = `auth:${userId}`;

  const fullRow = {
    user_id: userId,
    display_name: fields.displayName,
    first_name: fields.firstName || null,
    last_name: fields.lastName || null,
    grade: fields.grade || null,
    school_id: fields.schoolId ?? null,
    parent_name: fields.parentName || null,
    parent_email: fields.parentEmail || null,
    parent_phone: fields.parentPhone || null,
    device_id: deviceId,
  };

  const leanRow = {
    user_id: userId,
    display_name: fields.displayName,
    grade: fields.grade || null,
    school_id: fields.schoolId ?? null,
    parent_name: fields.parentName || null,
    parent_email: fields.parentEmail || null,
    parent_phone: fields.parentPhone || null,
    device_id: deviceId,
  };

  const { data: existing } = await admin
    .from("students")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing?.id) {
    const { error: updateErr } = await admin
      .from("students")
      .update({
        display_name: fullRow.display_name,
        first_name: fullRow.first_name,
        last_name: fullRow.last_name,
        grade: fullRow.grade,
        school_id: fullRow.school_id,
        parent_name: fullRow.parent_name,
        parent_email: fullRow.parent_email,
        parent_phone: fullRow.parent_phone,
        device_id: deviceId,
      })
      .eq("id", existing.id);

    if (updateErr) {
      const msg = updateErr.message ?? "";
      const looksLikeSchemaCache =
        msg.includes("schema cache") || msg.includes("Could not find the 'first_name' column");
      if (looksLikeSchemaCache) {
        const { error: leanUpdateErr } = await admin
          .from("students")
          .update({
            display_name: leanRow.display_name,
            grade: leanRow.grade,
            school_id: leanRow.school_id,
            parent_name: leanRow.parent_name,
            parent_email: leanRow.parent_email,
            parent_phone: leanRow.parent_phone,
            device_id: deviceId,
          })
          .eq("id", existing.id);
        if (leanUpdateErr) return { ok: false, error: leanUpdateErr.message };
      } else {
        return { ok: false, error: msg };
      }
    }

    return { ok: true, studentId: String(existing.id) };
  }

  const { data: inserted, error: insertErr } = await admin
    .from("students")
    .insert(fullRow)
    .select("id")
    .single();

  if (!insertErr && inserted?.id) {
    return { ok: true, studentId: String(inserted.id) };
  }

  const insertMsg = insertErr?.message ?? "";
  const looksLikeSchemaCache =
    insertMsg.includes("schema cache") ||
    insertMsg.includes("Could not find the 'first_name' column");

  if (looksLikeSchemaCache) {
    const { data: leanInserted, error: leanErr } = await admin
      .from("students")
      .insert(leanRow)
      .select("id")
      .single();
    if (!leanErr && leanInserted?.id) {
      return { ok: true, studentId: String(leanInserted.id) };
    }
    if (leanErr && isUniqueUserConflict(leanErr.message ?? "")) {
      // fall through to conflict recovery
    } else if (leanErr) {
      return { ok: false, error: leanErr.message };
    }
  } else if (insertErr && !isUniqueUserConflict(insertMsg)) {
    return { ok: false, error: insertMsg || "Could not create student profile." };
  }

  // Race: another request inserted the row between select and insert.
  const { data: raced } = await admin
    .from("students")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (raced?.id) {
    return { ok: true, studentId: String(raced.id) };
  }

  return {
    ok: false,
    error: insertMsg || "Could not create student profile.",
  };
}
