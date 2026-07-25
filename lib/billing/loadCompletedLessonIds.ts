import "server-only";

import { resolveLearnerForUser } from "@/lib/resolveLearner";
import type { UserWithRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Lesson ids the active learner has successfully completed.
 * Used so revisit stays open even if class assignments change.
 */
export async function loadCompletedLessonIdsForUser(
  user: NonNullable<UserWithRole> & { id: string }
): Promise<string[]> {
  try {
    const admin = createSupabaseAdminClient();
    const learner = await resolveLearnerForUser(user, admin);
    if (!learner.studentId) return [];
    const { data } = await admin
      .from("lesson_progress")
      .select("lesson_id, success")
      .eq("student_id", learner.studentId);
    return (data ?? [])
      .filter((row) => Boolean(row?.success))
      .map((row) => String(row.lesson_id ?? ""))
      .filter(Boolean);
  } catch {
    return [];
  }
}
