import Link from "next/link";
import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { trackIdForLesson } from "@/lib/billing/access";
import type { StudentLessonAccess } from "@/lib/classAssignments";

type LessonPaywallProps = {
  lessonId: string;
  access: StudentLessonAccess | null;
  checkFailed?: boolean;
  reason?: "paywall" | "not_assigned" | "error";
};

/** Server- and client-safe lock screen when a lesson is not entitled. */
export function LessonPaywall({
  lessonId,
  access,
  checkFailed = false,
  reason,
}: LessonPaywallProps) {
  const trackId = trackIdForLesson(lessonId);
  const billingHref = trackId ? `/billing?track=${encodeURIComponent(trackId)}` : "/billing";
  const isPaywall =
    reason === "paywall" ||
    (!checkFailed &&
      Boolean(access?.entitlementRestricted) &&
      !access?.classRestricted);

  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-lg flex-col items-center justify-center px-4 py-16">
      <Notice
        variant={checkFailed || reason === "error" ? "danger" : "lock"}
        role={checkFailed || reason === "error" ? "alert" : "status"}
        title={
          checkFailed || reason === "error"
            ? "Couldn’t verify access"
            : isPaywall
              ? "Unlock this track to continue"
              : "Lesson not assigned yet"
        }
        action={
          <>
            {isPaywall || checkFailed || reason === "error" ? (
              <Button asChild size="sm">
                <Link href={billingHref}>
                  {isPaywall ? "View plans & unlock" : "Go to billing"}
                </Link>
              </Button>
            ) : null}
            <Button asChild size="sm" variant="outline" className="bg-white/80">
              <Link href="/dashboard">Back to dashboard</Link>
            </Button>
          </>
        }
      >
        {checkFailed || reason === "error"
          ? "We couldn’t confirm your lesson access. Refresh, or open Billing if you just purchased."
          : isPaywall
            ? "Subscribe for all tracks, or buy this learning path to open its lessons. Live tutoring is sold separately."
            : "Your instructor hasn’t turned this lesson on for your class yet. Check your dashboard for lessons that are currently available."}
        {access?.classRestricted && access.classIds?.length ? (
          <p className="mt-2 text-xs text-slate-500">
            You&apos;re enrolled in a class — only assigned lessons are open.
          </p>
        ) : null}
      </Notice>
    </div>
  );
}

export function LessonConsentNotice() {
  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-lg flex-col items-center justify-center px-4 py-16">
      <Notice
        variant="lock"
        title="Parental consent required"
        action={
          <Button asChild size="sm" variant="outline" className="border-[var(--brand)]/35 bg-white/80">
            <Link href="/parent?consent=1">
              <Users className="h-3.5 w-3.5" />
              Complete consent
            </Link>
          </Button>
        }
      >
        A parent or guardian must complete verifiable parental consent before kids can learn.
      </Notice>
    </div>
  );
}

export function LessonChildSelectNotice() {
  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-lg flex-col items-center justify-center px-4 py-16">
      <Notice
        variant="lock"
        title="Choose a child first"
        action={
          <Button asChild size="sm" variant="outline" className="border-[var(--brand)]/35 bg-white/80">
            <Link href="/parent?pick=1">
              <Users className="h-3.5 w-3.5" />
              Go to parent hub
            </Link>
          </Button>
        }
      >
        Progress saves to a kid profile. Pick who is learning in the parent hub, then open the
        lesson again.
      </Notice>
    </div>
  );
}
