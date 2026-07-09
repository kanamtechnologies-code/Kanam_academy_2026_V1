"use client";

import * as React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { isGuestMode } from "@/lib/guestProgress";
import { isLessonOpenForStudent } from "@/lib/tracks";
import type { StudentLessonAccess } from "@/lib/classAssignments";

type LessonAccessGateProps = {
  lessonId: string;
  children: React.ReactNode;
};

export function LessonAccessGate({ lessonId, children }: LessonAccessGateProps) {
  const [loading, setLoading] = React.useState(!isGuestMode());
  const [allowed, setAllowed] = React.useState(isGuestMode());
  const [access, setAccess] = React.useState<StudentLessonAccess | null>(null);

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
        };
        if (!mounted) return;
        if (!res.ok || !json.access) {
          setAllowed(true);
          return;
        }
        setAccess(json.access);
        setAllowed(
          isLessonOpenForStudent(
            lessonId,
            json.access.classRestricted,
            json.access.enabledLessonIds,
            []
          )
        );
      } catch {
        if (mounted) setAllowed(true);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [lessonId]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <p className="text-sm font-semibold text-slate-600">Checking lesson access…</p>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-lg flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 ring-1 ring-amber-200">
          <Lock className="h-7 w-7 text-amber-800" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Lesson not assigned yet</h1>
        <p className="text-sm text-slate-600">
          Your instructor hasn&apos;t turned this lesson on for your class yet. Check your dashboard
          for lessons that are currently available.
        </p>
        {access?.classIds?.length ? (
          <p className="text-xs text-slate-500">
            You&apos;re enrolled in a class — only assigned lessons are open.
          </p>
        ) : null}
        <Button asChild className="mt-2">
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
