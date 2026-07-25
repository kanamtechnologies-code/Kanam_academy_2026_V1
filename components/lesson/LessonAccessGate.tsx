"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  LessonChildSelectNotice,
  LessonConsentNotice,
  LessonPaywall,
} from "@/components/lesson/LessonPaywall";
import { isGuestMode } from "@/lib/guestProgress";
import { DEMO_LESSON_ID } from "@/lib/pythonLessons/demoLesson";
import { isLessonOpenForStudent } from "@/lib/tracks";
import type { StudentLessonAccess } from "@/lib/classAssignments";

type LessonAccessGateProps = {
  lessonId: string;
  children: React.ReactNode;
};

/**
 * Client-side defense-in-depth gate. Server pages should use renderGatedLesson
 * so unpaid lesson modules are never loaded for denied users.
 * Guest mode only unlocks the public demo lesson.
 * completedIds come from /api/student/lesson-access so revisit stays open.
 */
export function LessonAccessGate({ lessonId, children }: LessonAccessGateProps) {
  const router = useRouter();
  const guestDemo = isGuestMode() && lessonId === DEMO_LESSON_ID;
  const [loading, setLoading] = React.useState(!guestDemo);
  const [allowed, setAllowed] = React.useState(guestDemo);
  const [needsChildSelect, setNeedsChildSelect] = React.useState(false);
  const [needsParentalConsent, setNeedsParentalConsent] = React.useState(false);
  const [access, setAccess] = React.useState<StudentLessonAccess | null>(null);
  const [checkFailed, setCheckFailed] = React.useState(false);

  React.useEffect(() => {
    if (guestDemo) {
      setAllowed(true);
      setLoading(false);
      return;
    }

    // Guest on a paid lesson — lock (middleware should already redirect).
    if (isGuestMode()) {
      setAllowed(false);
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
          completedIds?: string[];
          needsChildSelect?: boolean;
          needsParentalConsent?: boolean;
        };
        if (!mounted) return;
        if (json.needsParentalConsent) {
          setNeedsParentalConsent(true);
          setAllowed(false);
          return;
        }
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
            Array.isArray(json.completedIds) ? json.completedIds : [],
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
  }, [lessonId, guestDemo]);

  React.useEffect(() => {
    if (needsParentalConsent) {
      router.replace("/parent?consent=1");
      return;
    }
    if (needsChildSelect) {
      router.replace("/parent?pick=1");
    }
  }, [needsChildSelect, needsParentalConsent, router]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <p className="text-sm font-semibold text-slate-600">Checking lesson access…</p>
      </div>
    );
  }

  if (needsParentalConsent) {
    return <LessonConsentNotice />;
  }

  if (needsChildSelect) {
    return <LessonChildSelectNotice />;
  }

  if (!allowed) {
    const isPaywall =
      !checkFailed && Boolean(access?.entitlementRestricted) && !access?.classRestricted;
    return (
      <LessonPaywall
        lessonId={lessonId}
        access={access}
        checkFailed={checkFailed}
        reason={checkFailed ? "error" : isPaywall ? "paywall" : "not_assigned"}
      />
    );
  }

  return <>{children}</>;
}
