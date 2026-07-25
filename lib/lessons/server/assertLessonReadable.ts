import "server-only";

import { decideLessonAccess } from "@/lib/billing/decideLessonAccess";
import { DEMO_LESSON_ID } from "@/lib/pythonLessons/demoLesson";

export type LessonReadable =
  | { ok: true }
  | { ok: false; status: number; error: string; redirect?: string };

/**
 * Auth + entitlement gate for lesson content/check APIs.
 * Public demo lesson is readable without a signed-in session.
 */
export async function assertLessonReadable(lessonId: string): Promise<LessonReadable> {
  if (lessonId === DEMO_LESSON_ID) {
    return { ok: true };
  }

  const decision = await decideLessonAccess(lessonId);
  if (decision.kind === "allow") return { ok: true };
  if (decision.kind === "unauthenticated") {
    return { ok: false, status: 401, error: "Not signed in." };
  }
  if (decision.kind === "redirect") {
    return { ok: false, status: 403, error: "Access blocked.", redirect: decision.href };
  }
  return {
    ok: false,
    status: 403,
    error:
      decision.reason === "paywall"
        ? "Unlock this track to continue."
        : decision.checkFailed
          ? "Could not verify lesson access."
          : "Lesson not assigned yet.",
  };
}
