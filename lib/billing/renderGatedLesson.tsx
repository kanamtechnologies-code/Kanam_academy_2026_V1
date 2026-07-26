import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { LessonPaywall } from "@/components/lesson/LessonPaywall";
import { decideLessonAccess } from "@/lib/billing/decideLessonAccess";
import { loginRedirectPath } from "@/lib/auth/routeProtection";

type RenderGatedLessonArgs = {
  lessonId: string;
  /** Current path for post-login return (e.g. /learn/ai/1). */
  pathname: string;
  /**
   * Dynamically load the lesson canvas ONLY after access is granted.
   * Keeps unpaid lesson modules out of denied responses.
   */
  load: () => Promise<ReactNode>;
};

/**
 * Server-side lesson gate. Call from async page components.
 * Unauthorized users are redirected; unpaid users get a paywall without lesson props.
 */
export async function renderGatedLesson({
  lessonId,
  pathname,
  load,
}: RenderGatedLessonArgs): Promise<ReactNode> {
  const decision = await decideLessonAccess(lessonId, pathname);

  if (decision.kind === "unauthenticated") {
    redirect(loginRedirectPath(pathname, ""));
  }
  if (decision.kind === "redirect") {
    redirect(decision.href);
  }
  if (decision.kind === "denied") {
    return (
      <LessonPaywall
        lessonId={lessonId}
        access={decision.access}
        checkFailed={decision.checkFailed}
        reason={decision.reason}
      />
    );
  }

  return load();
}
