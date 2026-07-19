import type { LessonRow } from "@/lib/tracks";

/** Core AP CSP Prep lessons (quiz + activities must be finished for each). */
export const AP_CSP_CORE_LESSON_IDS = Array.from(
  { length: 16 },
  (_, i) => `csp-${i + 1}`
) as readonly string[];

export const AP_CSP_PRACTICE_1_ID = "csp-practice-1";
export const AP_CSP_PRACTICE_2_ID = "csp-practice-2";
export const AP_CSP_FINAL_ID = "csp-final";

export const AP_CSP_EXAM_IDS = [
  AP_CSP_PRACTICE_1_ID,
  AP_CSP_PRACTICE_2_ID,
  AP_CSP_FINAL_ID,
] as const;

export type ApCspExamId = (typeof AP_CSP_EXAM_IDS)[number];

export function isApCspCoreComplete(completedIds: string[]): boolean {
  return AP_CSP_CORE_LESSON_IDS.every((id) => completedIds.includes(id));
}

export function isApCspAssessmentRow(lesson: Pick<LessonRow, "kind" | "id">): boolean {
  return lesson.kind === "assessment" || AP_CSP_EXAM_IDS.includes(lesson.id as ApCspExamId);
}

/**
 * Unlock policy:
 * - Practice 1 & 2: after all 16 lessons + exercises are complete
 * - Final: after both practice tests are submitted/complete
 */
export function isApCspExamUnlocked(examId: string, completedIds: string[]): boolean {
  if (!isApCspCoreComplete(completedIds)) return false;
  if (examId === AP_CSP_PRACTICE_1_ID || examId === AP_CSP_PRACTICE_2_ID) return true;
  if (examId === AP_CSP_FINAL_ID) {
    return (
      completedIds.includes(AP_CSP_PRACTICE_1_ID) &&
      completedIds.includes(AP_CSP_PRACTICE_2_ID)
    );
  }
  return false;
}

export function apCspExamLockReason(examId: string, completedIds: string[]): string {
  if (!isApCspCoreComplete(completedIds)) {
    const done = AP_CSP_CORE_LESSON_IDS.filter((id) => completedIds.includes(id)).length;
    return `Finish all 16 AP CSP Prep lessons and exercises first (${done}/16 complete).`;
  }
  if (examId === AP_CSP_FINAL_ID) {
    const missing = [
      !completedIds.includes(AP_CSP_PRACTICE_1_ID) ? "Practice Test 1" : null,
      !completedIds.includes(AP_CSP_PRACTICE_2_ID) ? "Practice Test 2" : null,
    ].filter(Boolean);
    if (missing.length) {
      return `Complete ${missing.join(" and ")} before the Final Exam.`;
    }
  }
  return "This assessment is locked.";
}
