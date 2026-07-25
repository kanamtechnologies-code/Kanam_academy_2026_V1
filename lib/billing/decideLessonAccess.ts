import { loadCompletedLessonIdsForUser } from "@/lib/billing/loadCompletedLessonIds";
import { resolveStudentLessonAccess } from "@/lib/billing/resolveStudentLessonAccess";
import type { StudentLessonAccess } from "@/lib/classAssignments";
import { isLessonOpenForStudent } from "@/lib/tracks";

export type LessonAccessDecision =
  | { kind: "allow"; access: StudentLessonAccess; completedIds: string[] }
  | { kind: "unauthenticated" }
  | { kind: "redirect"; href: string }
  | {
      kind: "denied";
      access: StudentLessonAccess | null;
      checkFailed: boolean;
      reason: "paywall" | "not_assigned" | "error";
    };

/**
 * Decide whether a specific lesson may be rendered on the server.
 * Loads completed lesson ids so revisit stays open after assignment changes.
 */
export async function decideLessonAccess(lessonId: string): Promise<LessonAccessDecision> {
  const resolved = await resolveStudentLessonAccess();

  if (resolved.status === 401) {
    return { kind: "unauthenticated" };
  }

  if (resolved.needsParentalConsent) {
    return { kind: "redirect", href: "/parent?consent=1" };
  }
  if (resolved.needsChildSelect) {
    return { kind: "redirect", href: "/parent?pick=1" };
  }

  if (resolved.status !== 200 || resolved.error) {
    return {
      kind: "denied",
      access: resolved.access,
      checkFailed: true,
      reason: "error",
    };
  }

  const completedIds = resolved.user
    ? await loadCompletedLessonIdsForUser(resolved.user)
    : [];

  const allowed = isLessonOpenForStudent(
    lessonId,
    Boolean(resolved.access.classRestricted),
    resolved.access.enabledLessonIds,
    completedIds,
    Boolean(resolved.access.entitlementRestricted)
  );

  if (!allowed) {
    const isPaywall =
      Boolean(resolved.access.entitlementRestricted) && !resolved.access.classRestricted;
    return {
      kind: "denied",
      access: resolved.access,
      checkFailed: false,
      reason: isPaywall ? "paywall" : "not_assigned",
    };
  }

  return { kind: "allow", access: resolved.access, completedIds };
}
