/**
 * Parent DSAR helpers: export / erase a household kid profile and related rows.
 */

import { setActiveStudentMetadata } from "@/lib/households";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type Admin = ReturnType<typeof createSupabaseAdminClient>;

export type HouseholdKidRow = {
  id: string;
  household_id: string | null;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  grade: string | null;
  parent_name: string | null;
  parent_email: string | null;
  parent_phone: string | null;
  device_id: string | null;
  user_id: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export async function getHouseholdKidForOwner(
  admin: Admin,
  ownerUserId: string,
  householdId: string,
  studentId: string
): Promise<HouseholdKidRow | null> {
  const { data, error } = await admin
    .from("students")
    .select(
      "id, household_id, display_name, first_name, last_name, grade, parent_name, parent_email, parent_phone, device_id, user_id, created_at, updated_at"
    )
    .eq("id", studentId)
    .eq("household_id", householdId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data?.id) return null;
  return data as HouseholdKidRow;
}

export async function buildChildExportPayload(
  admin: Admin,
  kid: HouseholdKidRow
) {
  const studentId = kid.id;

  const [progress, events, enrollments, entitlements, tutoring] = await Promise.all([
    admin.from("lesson_progress").select("*").eq("student_id", studentId),
    admin.from("progress_events").select("*").eq("student_id", studentId),
    admin.from("class_enrollments").select("*").eq("student_id", studentId),
    admin.from("track_entitlements").select("*").eq("student_id", studentId),
    admin.from("tutoring_credits").select("*").eq("student_id", studentId),
  ]);

  for (const result of [progress, events, enrollments, entitlements, tutoring]) {
    if (result.error && !isMissingRelation(result.error.message)) {
      throw new Error(result.error.message);
    }
  }

  return {
    exported_at: new Date().toISOString(),
    export_type: "kanam_child_dsar_v1",
    note:
      "XP and badges are derived from lesson progress and are not stored as separate records.",
    student: {
      id: kid.id,
      display_name: kid.display_name,
      first_name: kid.first_name,
      last_name: kid.last_name,
      grade: kid.grade,
      parent_name: kid.parent_name,
      parent_email: kid.parent_email,
      parent_phone: kid.parent_phone,
      created_at: kid.created_at,
      updated_at: kid.updated_at,
    },
    lesson_progress: progress.data ?? [],
    progress_events: events.data ?? [],
    class_enrollments: enrollments.data ?? [],
    track_entitlements: entitlements.error ? [] : entitlements.data ?? [],
    tutoring_credits: tutoring.error ? [] : tutoring.data ?? [],
  };
}

function isMissingRelation(message: string) {
  const m = message.toLowerCase();
  return (
    m.includes("does not exist") ||
    m.includes("schema cache") ||
    m.includes("could not find the table")
  );
}

/**
 * Erase a household kid profile and related learning data.
 * Does not delete the parent Auth user or billing records.
 */
export async function eraseHouseholdChild(opts: {
  admin: Admin;
  ownerUserId: string;
  householdId: string;
  activeStudentId: string | null;
  kid: HouseholdKidRow;
}) {
  const { admin, ownerUserId, householdId, kid } = opts;
  const studentId = kid.id;

  // progress_events is ON DELETE SET NULL — delete explicitly for true erasure.
  {
    const { error } = await admin.from("progress_events").delete().eq("student_id", studentId);
    if (error && !isMissingRelation(error.message)) throw new Error(error.message);
  }
  if (kid.device_id) {
    const { error } = await admin
      .from("progress_events")
      .delete()
      .eq("device_id", kid.device_id);
    if (error && !isMissingRelation(error.message)) throw new Error(error.message);
  }

  {
    const { error } = await admin.from("lesson_progress").delete().eq("student_id", studentId);
    if (error && !isMissingRelation(error.message)) throw new Error(error.message);
  }

  {
    const { error } = await admin.from("class_enrollments").delete().eq("student_id", studentId);
    if (error && !isMissingRelation(error.message)) throw new Error(error.message);
  }

  // Parent-owned purchases stay on the parent user; clear kid link only.
  {
    const { error } = await admin
      .from("track_entitlements")
      .update({ student_id: null })
      .eq("student_id", studentId);
    if (error && !isMissingRelation(error.message)) throw new Error(error.message);
  }
  {
    const { error } = await admin
      .from("tutoring_credits")
      .update({ student_id: null })
      .eq("student_id", studentId);
    if (error && !isMissingRelation(error.message)) throw new Error(error.message);
  }

  if (opts.activeStudentId === studentId) {
    try {
      await setActiveStudentMetadata(admin, ownerUserId, null);
    } catch {
      // continue — student delete still proceeds
    }
  }

  const { error: delErr } = await admin
    .from("students")
    .delete()
    .eq("id", studentId)
    .eq("household_id", householdId);

  if (delErr) throw new Error(delErr.message);

  return { ok: true as const, deletedStudentId: studentId };
}
