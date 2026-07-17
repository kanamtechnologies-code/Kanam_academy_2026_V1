"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { trackIdForLesson } from "@/lib/billing/access";
import { isGuestMode } from "@/lib/guestProgress";
import { isLessonOpenForStudent } from "@/lib/tracks";
import type { StudentLessonAccess } from "@/lib/classAssignments";

type LessonAccessGateProps = {
  lessonId: string;
  children: React.ReactNode;
};

export function LessonAccessGate({ lessonId, children }: LessonAccessGateProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(!isGuestMode());
  const [allowed, setAllowed] = React.useState(isGuestMode());
  const [needsChildSelect, setNeedsChildSelect] = React.useState(false);
  const [access, setAccess] = React.useState<StudentLessonAccess | null>(null);
  const [checkFailed, setCheckFailed] = React.useState(false);

  React.useEffect(() => {
    if (isGuestMode()) {
      setAllowed(true);
      setLoading(false);
      return;
    }

    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/student/lesson-access");
        const json = (await res.json()) as {
          ok?: boolean;
          access?: StudentLessonAccess;
          needsChildSelect?: boolean;
        };
        if (!mounted) return;
        if (json.needsChildSelect) {
          setNeedsChildSelect(true);
          setAllowed(false);
          return;
        }
        if (!res.ok || !json.access) {
          setCheckFailed(true);
          setAllowed(false);
          return;
        }
        setAccess(json.access);
        setAllowed(
          isLessonOpenForStudent(
            lessonId,
            Boolean(json.access.classRestricted),
            json.access.enabledLessonIds,
            [],
            Boolean(json.access.entitlementRestricted)
          )
        );
      } catch {
        if (mounted) {
          setCheckFailed(true);
          setAllowed(false);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [lessonId]);

  React.useEffect(() => {
    if (needsChildSelect) {
      router.replace("/parent?pick=1");
    }
  }, [needsChildSelect, router]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <p className="text-sm font-semibold text-slate-600">Checking lesson access…</p>
      </div>
    );
  }

  if (needsChildSelect) {
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

  if (!allowed) {
    const trackId = trackIdForLesson(lessonId);
    const billingHref = trackId ? `/billing?track=${encodeURIComponent(trackId)}` : "/billing";
    const isPaywall =
      !checkFailed &&
      Boolean(access?.entitlementRestricted) &&
      !access?.classRestricted;

    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-lg flex-col items-center justify-center px-4 py-16">
        <Notice
          variant={checkFailed ? "danger" : "lock"}
          role={checkFailed ? "alert" : "status"}
          title={
            checkFailed
              ? "Couldn’t verify access"
              : isPaywall
                ? "Unlock this track to continue"
                : "Lesson not assigned yet"
          }
          action={
            <>
              {isPaywall || checkFailed ? (
                <Button asChild size="sm">
                  <Link href={billingHref}>
                    {isPaywall ? "View plans & unlock" : "Go to billing"}
                  </Link>
                </Button>
              ) : null}
              <Button asChild size="sm" variant="outline" className="bg-white/80">
                <Link href={isGuestMode() ? "/demo" : "/dashboard"}>
                  {isGuestMode() ? "Back to demo" : "Back to dashboard"}
                </Link>
              </Button>
            </>
          }
        >
          {checkFailed
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

  return <>{children}</>;
}
