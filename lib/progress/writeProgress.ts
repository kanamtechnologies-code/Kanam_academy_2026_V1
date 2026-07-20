import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export type ProgressEventType =
  | "lesson_opened"
  | "run"
  | "lesson_success"
  | "session_heartbeat"
  | "guided_run"
  | "cfu_reveal"
  | "coach_note_confirmed"
  | string;

export type WriteProgressInput = {
  studentDbId: string;
  deviceId: string;
  lessonId: string;
  eventType: ProgressEventType;
  payload?: Record<string, unknown>;
};

const TELEMETRY_KEYS = [
  "time_spent_seconds",
  "quiz_attempts",
  "quiz_correct",
  "activities_completed",
  "activities_total",
  "exam_percent",
  "exam_correct",
  "exam_total",
] as const;

/**
 * Insert a progress event and upsert lesson_progress rollup fields.
 * Telemetry columns are best-effort (retried without them if migration not applied).
 */
export async function writeProgressEvent(input: WriteProgressInput): Promise<void> {
  const { studentDbId, deviceId, lessonId, eventType, payload = {} } = input;
  if (!studentDbId || !deviceId || !lessonId) return;

  const supabase = createSupabaseBrowserClient();
  if (!supabase) return;

  const now = new Date().toISOString();

  await supabase.from("progress_events").insert({
    student_id: studentDbId,
    device_id: deviceId,
    lesson_id: lessonId,
    event_type: eventType,
    payload,
  });

  const patch: Record<string, unknown> = {
    student_id: studentDbId,
    lesson_id: lessonId,
    last_event_at: now,
  };

  if (eventType === "lesson_opened") {
    patch.opened_at = now;
  }
  if (eventType === "run" || eventType === "guided_run") {
    patch.has_run = true;
  }
  if (eventType === "lesson_success") {
    patch.success = true;
    patch.success_at = now;
    if (payload.kind === "ap_csp_exam") {
      const correct = Number(payload.correct ?? 0);
      const total = Number(payload.total ?? 0);
      const percent = Number(
        payload.percent ?? (total > 0 ? Math.round((correct / total) * 100) : 0)
      );
      patch.exam_correct = correct;
      patch.exam_total = total;
      patch.exam_percent = percent;
      patch.has_run = true;
    }
  }

  if (eventType === "session_heartbeat") {
    const delta = Math.max(
      0,
      Math.min(120, Number(payload.activeSecondsDelta ?? payload.seconds ?? 0))
    );
    if (delta > 0) {
      const { data: existing } = await supabase
        .from("lesson_progress")
        .select("time_spent_seconds")
        .eq("student_id", studentDbId)
        .eq("lesson_id", lessonId)
        .maybeSingle();
      const prev = Number(
        (existing as { time_spent_seconds?: number } | null)?.time_spent_seconds ?? 0
      );
      patch.time_spent_seconds = (Number.isFinite(prev) ? prev : 0) + delta;
    }
  }

  if (eventType === "run" && typeof payload.correct === "boolean") {
    const { data: existing } = await supabase
      .from("lesson_progress")
      .select("quiz_attempts, quiz_correct")
      .eq("student_id", studentDbId)
      .eq("lesson_id", lessonId)
      .maybeSingle();
    const row = existing as { quiz_attempts?: number; quiz_correct?: number } | null;
    const attempts = Number(row?.quiz_attempts ?? 0);
    const correctCount = Number(row?.quiz_correct ?? 0);
    patch.quiz_attempts = (Number.isFinite(attempts) ? attempts : 0) + 1;
    patch.quiz_correct =
      (Number.isFinite(correctCount) ? correctCount : 0) + (payload.correct ? 1 : 0);
  }

  if (eventType === "run" && typeof payload.activityId === "string") {
    const { data: existing } = await supabase
      .from("lesson_progress")
      .select("activities_completed")
      .eq("student_id", studentDbId)
      .eq("lesson_id", lessonId)
      .maybeSingle();
    const prev = Number(
      (existing as { activities_completed?: number } | null)?.activities_completed ?? 0
    );
    patch.activities_completed = (Number.isFinite(prev) ? prev : 0) + 1;
  }

  if (typeof payload.activitiesCompleted === "number") {
    patch.activities_completed = Math.max(0, payload.activitiesCompleted);
  }
  if (typeof payload.activitiesTotal === "number") {
    patch.activities_total = Math.max(0, payload.activitiesTotal);
  }

  const { error } = await supabase.from("lesson_progress").upsert(patch as never, {
    onConflict: "student_id,lesson_id",
  });

  if (error) {
    const basic: Record<string, unknown> = { ...patch };
    for (const key of TELEMETRY_KEYS) delete basic[key];
    await supabase.from("lesson_progress").upsert(basic as never, {
      onConflict: "student_id,lesson_id",
    });
  }
}
