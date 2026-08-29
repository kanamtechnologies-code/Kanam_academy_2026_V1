"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ListChecks, Lock, Play, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Notice } from "@/components/ui/notice";
import { PremiumBadge, PremiumBadgeMark } from "@/components/badges/PremiumBadge";
import { readLessonModuleUnlocked } from "@/lib/lessonModuleUnlock";
import {
  apCspExamLockReason,
  isApCspAssessmentRow,
  isApCspExamUnlocked,
} from "@/lib/apCspExams/access";
import {
  type Track,
  isLessonOpenForStudent,
  weekSessionLabel,
  weeksForTrack,
  trackProgress,
} from "@/lib/tracks";

export function TrackRoadmap({
  track,
  completedIds,
  locked = false,
  lockMessage,
  lockCtaHref,
  lockCtaLabel,
  classRestricted = false,
  entitlementRestricted = false,
  enabledLessonIds = null,
}: {
  track: Track;
  completedIds: string[];
  locked?: boolean;
  lockMessage?: string;
  lockCtaHref?: string;
  lockCtaLabel?: string;
  /** When true, only instructor-assigned lessons are open (class enrollees). */
  classRestricted?: boolean;
  /** When true, only lessons from purchased/subscribed tracks are open. */
  entitlementRestricted?: boolean;
  enabledLessonIds?: string[] | null;
}) {
  if (locked) {
    return (
      <div className="space-y-6">
        <Notice
          variant="lock"
          title={`${track.title} is locked`}
          action={
            lockCtaHref ? (
              <Button asChild size="sm">
                <Link href={lockCtaHref}>{lockCtaLabel ?? "Go to Python lessons"}</Link>
              </Button>
            ) : undefined
          }
        >
          {lockMessage ??
            "Complete the recommended Python lessons first to unlock this track."}
        </Notice>

        <div className="opacity-60">
          <TrackRoadmapContent
            track={track}
            completedIds={completedIds}
            disableActions
            classRestricted={classRestricted}
            entitlementRestricted={entitlementRestricted}
            enabledLessonIds={enabledLessonIds}
          />
        </div>
      </div>
    );
  }

  return (
    <div id="roadmap" className="space-y-6">
      <TrackRoadmapContent
        track={track}
        completedIds={completedIds}
        classRestricted={classRestricted}
        entitlementRestricted={entitlementRestricted}
        enabledLessonIds={enabledLessonIds}
      />
    </div>
  );
}

function TrackRoadmapContent({
  track,
  completedIds,
  disableActions = false,
  classRestricted = false,
  entitlementRestricted = false,
  enabledLessonIds = null,
}: {
  track: Track;
  completedIds: string[];
  disableActions?: boolean;
  classRestricted?: boolean;
  entitlementRestricted?: boolean;
  enabledLessonIds?: string[] | null;
}) {
  const lessonRestricted = classRestricted || entitlementRestricted;
  const openLessonIds = React.useMemo(() => {
    if (!lessonRestricted) return null;
    const set = new Set(enabledLessonIds ?? []);
    for (const id of completedIds) set.add(id);
    return set;
  }, [lessonRestricted, enabledLessonIds, completedIds]);

  const { nextLesson } = trackProgress(completedIds, track.lessons, { openLessonIds });
  const nextOpenAssessment = track.lessons.find(
    (l) =>
      isApCspAssessmentRow(l) &&
      !completedIds.includes(l.id) &&
      isApCspExamUnlocked(l.id, completedIds)
  );
  const [activityLockNoticeId, setActivityLockNoticeId] = React.useState<string | null>(null);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[var(--accent)]" />
            <h2 className="text-lg font-black tracking-tight text-slate-900">
              Learning path · 8-week program
            </h2>
          </div>
          {weeksForTrack(track.id).map((wk) => {
            const weekLessons = track.lessons.filter((l) => l.week === wk.week);
            if (weekLessons.length === 0) return null;
            const weekDone = weekLessons.every((l) => completedIds.includes(l.id));
            return (
              <div key={wk.week} className="space-y-3">
                <div className="flex items-start gap-3 rounded-xl bg-[var(--brand-2)] px-4 py-3.5 shadow-[0_12px_28px_rgba(15,110,87,0.32),0_4px_12px_rgba(15,23,42,0.12)] ring-1 ring-[rgb(var(--brand-2-rgb)/0.9)]">
                  <div
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-black",
                      weekDone
                        ? "bg-[var(--accent)] text-[var(--brand-2)] ring-2 ring-white/70"
                        : "bg-white/15 text-white ring-1 ring-white/35",
                    ].join(" ")}
                  >
                    W{wk.week}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black tracking-tight text-white sm:text-base">
                      Week {wk.week} — {wk.theme}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-white/80 sm:text-sm">
                      {wk.focus}
                    </p>
                  </div>
                </div>

                {weekLessons.map((lesson) => {
                  const completed = completedIds.includes(lesson.id);
                  const assessmentLocked =
                    isApCspAssessmentRow(lesson) &&
                    !isApCspExamUnlocked(lesson.id, completedIds);
                  const assignmentLocked =
                    lessonRestricted &&
                    !isLessonOpenForStudent(
                      lesson.id,
                      classRestricted,
                      enabledLessonIds,
                      completedIds,
                      entitlementRestricted
                    );
                  const lockedOut = Boolean(lesson.comingSoon || assignmentLocked || assessmentLocked);
                  // Prefer core "next lesson"; once lessons are done, highlight the next unlocked exam.
                  const isActive =
                    !completed &&
                    !lockedOut &&
                    (nextLesson?.id === lesson.id ||
                      (isApCspAssessmentRow(lesson) &&
                        !nextLesson &&
                        nextOpenAssessment?.id === lesson.id));
                  const canStart =
                    Boolean(lesson.href) && !lockedOut && !disableActions;

                  return (
                    <Card
                      key={lesson.id}
                      className={[
                        "ml-3 border bg-white shadow-[0_10px_28px_rgba(15,23,42,0.1),0_2px_8px_rgba(15,23,42,0.06)] transition-all",
                        completed
                          ? "border-[var(--brand)]/60 bg-[var(--brand)]/5"
                          : isActive
                            ? "border-[var(--brand)] shadow-[0_14px_34px_rgba(24,161,109,0.18),0_4px_12px_rgba(15,23,42,0.08)]"
                            : "border-slate-200",
                        lockedOut ? "opacity-80" : "",
                      ].join(" ")}
                    >
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex min-w-0 items-start gap-3">
                            <div className="mt-0.5 shrink-0">
                              {completed ? (
                                <CheckCircle2 className="h-5 w-5 text-[var(--brand)]" />
                              ) : lockedOut ? (
                                <Lock className="h-5 w-5 text-slate-400" />
                              ) : (
                                <Play className="h-5 w-5 text-[var(--accent)]" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-slate-500">
                                {isApCspAssessmentRow(lesson)
                                  ? "Week 8 · Assessment"
                                  : weekSessionLabel(lesson)}
                                {isActive ? (
                                  <span className="ml-2 rounded-full bg-[var(--brand)]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--brand)]">
                                    {isApCspAssessmentRow(lesson) ? "Next exam" : "Next lesson"}
                                  </span>
                                ) : null}
                                {lesson.comingSoon ? (
                                  <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                                    Coming soon
                                  </span>
                                ) : null}
                                {assignmentLocked ? (
                                  <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                                    {classRestricted ? "Not assigned" : "Locked"}
                                  </span>
                                ) : null}
                                {assessmentLocked ? (
                                  <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                                    Locked
                                  </span>
                                ) : null}
                              </p>
                              <p className="mt-1 break-words text-base font-black tracking-tight text-slate-900">
                                {lesson.title}
                              </p>
                              {assessmentLocked ? (
                                <p className="mt-1 text-xs font-medium text-amber-800">
                                  {apCspExamLockReason(lesson.id, completedIds)}
                                </p>
                              ) : null}
                              <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-500">
                                <span>+{lesson.xp} XP</span>
                                <span aria-hidden>·</span>
                                <span className="inline-flex items-center gap-1 text-slate-700">
                                  <PremiumBadgeMark lessonId={lesson.id} name={lesson.badgeName} />
                                  {lesson.badgeName}
                                </span>
                              </p>
                            </div>
                          </div>
                          {!lesson.hasLesson ? (
                            <div className="w-full shrink-0 sm:w-auto">
                              {completed && canStart ? (
                                <Button asChild variant="secondary" className="min-h-11 w-full sm:w-auto">
                                  <Link href={lesson.href!}>Review</Link>
                                </Button>
                              ) : canStart ? (
                                <Button asChild className="min-h-11 w-full px-6 font-bold sm:w-auto">
                                  <Link href={lesson.href!}>
                                    {isApCspAssessmentRow(lesson) ? "Start exam" : "Start"}
                                  </Link>
                                </Button>
                              ) : lesson.comingSoon ? (
                                <Button disabled variant="secondary" className="min-h-11 w-full sm:w-auto">
                                  Soon
                                </Button>
                              ) : assignmentLocked || assessmentLocked ? (
                                <Button disabled variant="secondary" className="min-h-11 w-full sm:w-auto">
                                  Locked
                                </Button>
                              ) : null}
                            </div>
                          ) : null}
                        </div>

                        {lesson.hasLesson && canStart ? (
                          <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                            <div className="grid gap-3 md:grid-cols-2">
                              <Button
                                asChild
                                size="lg"
                                className="h-auto min-h-[3.75rem] justify-start gap-3 border border-white/25 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] px-4 py-3.5 text-white shadow-[0_10px_24px_rgba(24,161,109,0.35)] hover:-translate-y-0.5 hover:from-[#1bb078] hover:to-[var(--brand-2)] hover:shadow-[0_14px_28px_rgba(24,161,109,0.42)]"
                              >
                                <Link
                                  href={`${lesson.href}?view=lesson`}
                                  onClick={() => setActivityLockNoticeId(null)}
                                >
                                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/20 shadow-inner ring-1 ring-white/30">
                                    <BookOpen className="h-5 w-5" />
                                  </span>
                                  <span className="flex flex-col items-start leading-tight">
                                    <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/90">
                                      Step 1 · Learn it
                                    </span>
                                    <span className="text-base font-black tracking-tight">
                                      Open the Lesson
                                    </span>
                                  </span>
                                </Link>
                              </Button>
                              {completed || readLessonModuleUnlocked(lesson.id) ? (
                                <Button
                                  asChild
                                  size="lg"
                                  className="h-auto min-h-[3.75rem] justify-start gap-3 border border-[rgb(var(--accent-rgb)/0.85)] bg-gradient-to-br from-[#f5e6b8] via-[var(--accent)] to-[#c9a84e] px-4 py-3.5 text-[var(--brand-2)] shadow-[0_10px_24px_rgba(201,168,78,0.38)] hover:-translate-y-0.5 hover:from-[#f8ecc4] hover:to-[#d4b45a] hover:shadow-[0_14px_28px_rgba(201,168,78,0.48)]"
                                >
                                  <Link href={`${lesson.href}?view=exercises`}>
                                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/55 shadow-inner ring-1 ring-[rgb(var(--brand-2-rgb)/0.2)]">
                                      <ListChecks className="h-5 w-5 text-[var(--brand-2)]" />
                                    </span>
                                    <span className="flex flex-col items-start leading-tight">
                                      <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--brand-2)]/80">
                                        Step 2 · Practice
                                      </span>
                                      <span className="text-base font-black tracking-tight text-[var(--brand-2)]">
                                        {completed ? "Review the Activity" : "Do the Activity"}
                                      </span>
                                    </span>
                                  </Link>
                                </Button>
                              ) : (
                                <Button
                                  type="button"
                                  size="lg"
                                  variant="outline"
                                  className="h-auto min-h-[3.75rem] justify-start gap-3 border-2 border-dashed border-slate-300 bg-slate-50/90 px-4 py-3.5 text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.08)] hover:border-slate-400 hover:bg-slate-100"
                                  onClick={() => setActivityLockNoticeId(lesson.id)}
                                >
                                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-200/80 ring-1 ring-slate-300/80">
                                    <Lock className="h-5 w-5 text-slate-500" />
                                  </span>
                                  <span className="flex flex-col items-start leading-tight">
                                    <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                                      Step 2 · Practice
                                    </span>
                                    <span className="text-base font-black tracking-tight">
                                      Do the Activity
                                    </span>
                                  </span>
                                </Button>
                              )}
                            </div>
                            {activityLockNoticeId === lesson.id ? (
                              <Notice
                                variant="lock"
                                title="Exercises are locked"
                                action={
                                  <Button asChild size="sm" variant="outline" className="border-[var(--brand)]/35 bg-white/80 text-[var(--brand-2)] hover:bg-white">
                                    <Link href={`${lesson.href}?view=lesson`}>
                                      <BookOpen className="h-3.5 w-3.5" />
                                      Open the Lesson
                                    </Link>
                                  </Button>
                                }
                              >
                                Finish the lesson slides and answer every question first. Then
                                practice unlocks.
                              </Notice>
                            ) : null}
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-black tracking-tight text-slate-900">Badges</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {track.lessons.map((l) => {
              const unlocked = completedIds.includes(l.id);
              return (
                <Card
                  key={l.id}
                  className={[
                    "border transition-shadow",
                    unlocked
                      ? "border-[rgb(var(--accent-rgb)/0.45)] bg-gradient-to-br from-amber-50/80 to-white shadow-[0_10px_24px_rgba(15,23,42,0.1),0_2px_8px_rgba(15,23,42,0.06)]"
                      : "border-slate-200 bg-slate-50/90 opacity-90 shadow-[0_6px_16px_rgba(15,23,42,0.08)]",
                  ].join(" ")}
                >
                  <CardContent className="p-4">
                    <PremiumBadge
                      lessonId={l.id}
                      name={l.badgeName}
                      variant="medal"
                      unlocked={unlocked}
                      statusLabel={
                        unlocked ? "Unlocked" : l.comingSoon ? "Coming soon" : "Locked"
                      }
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
