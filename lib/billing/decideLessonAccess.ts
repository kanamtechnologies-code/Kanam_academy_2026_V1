import { loadCompletedLessonIdsForUser } from "@/lib/billing/loadCompletedLessonIds";
import { resolveStudentLessonAccess } from "@/lib/billing/resolveStudentLessonAccess";
import type { StudentLessonAccess } from "@/lib/classAssignments";
import { isAllLessonsUnlocked } from "@/lib/devUnlock";
import { safeNextPath } from "@/lib/roles";
import { isLessonOpenForStudent } from "@/lib/tracks";

const UNLOCKED_ACCESS: StudentLessonAccess = {
  classRestricted: false,
  enabledLessonIds: null,
  classIds: [],
  entitlementRestricted: false,
};

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

function parentGateHref(kind: "consent" | "pick", returnPath?: string | null): string {
  const params = new URLSearchParams();
  params.set(kind, "1");
  const next = safeNextPath(returnPath);
  if (next) params.set("next", next);
  return `/parent?${params.toString()}`;
}

/**
 * Decide whether a specific lesson may be rendered on the server.
 * Loads completed lesson ids so revisit stays open after assignment changes.
 */
export async function decideLessonAccess(
  lessonId: string,
  returnPath?: string | null
): Promise<LessonAccessDecision> {
  if (isAllLessonsUnlocked()) {
    void lessonId;
    void returnPath;
    return { kind: "allow", access: UNLOCKED_ACCESS, completedIds: [] };
  }

  const resolved = await resolveStudentLessonAccess();

  if (resolved.status === 401) {
    return { kind: "unauthenticated" };
  }

  if (resolved.needsParentalConsent) {
    return { kind: "redirect", href: parentGateHref("consent", returnPath) };
  }
  if (resolved.needsChildSelect) {
    return { kind: "redirect", href: parentGateHref("pick", returnPath) };
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
