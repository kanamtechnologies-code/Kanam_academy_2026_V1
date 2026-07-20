import { createSupabaseAdminClient } from "@/lib/supabase/admin";

import { computeLearnerInsights } from "./computeLearnerInsights";
import type { LearnerInsights, ProgressEventRow, ProgressRow } from "./types";

type Admin = ReturnType<typeof createSupabaseAdminClient>;

const PROGRESS_SELECT =
  "student_id, lesson_id, opened_at, last_event_at, success, success_at, has_run, cfu_total, cfu_revealed_count, time_spent_seconds, quiz_attempts, quiz_correct, activities_completed, activities_total, exam_percent, exam_correct, exam_total";

const PROGRESS_SELECT_FALLBACK =
  "student_id, lesson_id, opened_at, last_event_at, success, success_at, has_run, cfu_total, cfu_revealed_count";

async function fetchProgress(admin: Admin, studentIds: string[]): Promise<ProgressRow[]> {
  if (studentIds.length === 0) return [];

  let { data, error } = await admin
    .from("lesson_progress")
    .select(PROGRESS_SELECT)
    .in("student_id", studentIds);

  if (error) {
    const retry = await admin
      .from("lesson_progress")
      .select(PROGRESS_SELECT_FALLBACK)
      .in("student_id", studentIds);
    if (retry.error) throw new Error(retry.error.message);
    data = retry.data;
  }

  return (data ?? []) as ProgressRow[];
}

async function fetchEvents(
  admin: Admin,
  studentIds: string[],
  sinceIso?: string
): Promise<ProgressEventRow[]> {
  if (studentIds.length === 0) return [];

  let q = admin
    .from("progress_events")
    .select("id, student_id, lesson_id, event_type, payload, created_at")
    .in("student_id", studentIds)
    .order("created_at", { ascending: false })
    .limit(Math.min(8000, studentIds.length * 1500));

  if (sinceIso) q = q.gte("created_at", sinceIso);

  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    ...row,
    payload: (row.payload ?? {}) as Record<string, unknown>,
  })) as ProgressEventRow[];
}

export async function loadLearnerInsights(
  admin: Admin,
  student: { id: string; display_name?: string | null; grade?: string | null }
): Promise<LearnerInsights> {
  const since = new Date(Date.now() - 120 * 86_400_000).toISOString();
  const [progress, events] = await Promise.all([
    fetchProgress(admin, [student.id]),
    fetchEvents(admin, [student.id], since),
  ]);

  return computeLearnerInsights({
    studentId: student.id,
    displayName: student.display_name || "Learner",
    grade: student.grade ?? null,
    progress,
    events,
  });
}

export async function loadProgressBundle(admin: Admin, studentIds: string[]) {
  const since = new Date(Date.now() - 120 * 86_400_000).toISOString();
  const [progress, events] = await Promise.all([
    fetchProgress(admin, studentIds),
    fetchEvents(admin, studentIds, since),
  ]);
  return { progress, events };
}
