"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ListChecks, Lock, Play, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
  enabledLessonIds?: string[] | null;
}) {
  const openLessonIds = React.useMemo(() => {
    if (!classRestricted || enabledLessonIds == null) return null;
    const set = new Set(enabledLessonIds);
    for (const id of completedIds) set.add(id);
    return set;
  }, [classRestricted, enabledLessonIds, completedIds]);

  const { completedCount, totalCount, percent, totalXp, nextLesson } =
    trackProgress(completedIds, track.lessons, { openLessonIds });

  if (locked) {
    return (
      <div className="space-y-6">
        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-sm">
          <CardContent className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 ring-1 ring-amber-200">
              <Lock className="h-6 w-6 text-amber-700" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-black tracking-tight text-amber-950">
                {track.title} is locked
              </p>
              <p className="mt-1 text-sm text-amber-900/90">
                {lockMessage ??
                  "Complete the recommended Python lessons first to unlock this track."}
              </p>
            </div>
            {lockCtaHref ? (
              <Button asChild className="shrink-0">
                <Link href={lockCtaHref}>{lockCtaLabel ?? "Go to Python lessons"}</Link>
              </Button>
            ) : null}
          </CardContent>
        </Card>

        <div className="opacity-60">
          <TrackRoadmapContent
            track={track}
            completedIds={completedIds}
            completedCount={completedCount}
            totalCount={totalCount}
            percent={percent}
            nextLesson={nextLesson}
            disableActions
            classRestricted={classRestricted}
            enabledLessonIds={enabledLessonIds}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="kanam-track-header rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
              Current focus
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">{track.subtitle}</p>
          </div>
          <Badge className="w-fit border border-emerald-200 bg-emerald-50 text-emerald-900">
            {totalXp} XP earned in this track
          </Badge>
        </div>
        <div className="mt-4">
          {nextLesson?.href && !nextLesson.comingSoon ? (
            <Button asChild size="lg" className="shadow-sm">
              <Link href={nextLesson.href}>
                <Play className="h-4 w-4" />
                Next step: {nextLesson.title}{" "}
                <span className="text-white/80">
                  ({weekSessionLabel(nextLesson)})
                </span>
              </Link>
            </Button>
          ) : nextLesson?.comingSoon ? (
            <Button size="lg" disabled className="mt-2 shadow-sm">
              Next lesson coming soon
            </Button>
          ) : (
            <Button size="lg" disabled className="shadow-sm">
              Track complete!
            </Button>
          )}
        </div>
      </div>

      <TrackRoadmapContent
        track={track}
        completedIds={completedIds}
        completedCount={completedCount}
        totalCount={totalCount}
        percent={percent}
        nextLesson={nextLesson}
        classRestricted={classRestricted}
        enabledLessonIds={enabledLessonIds}
      />
    </div>
  );
}

function TrackRoadmapContent({
  track,
  completedIds,
  completedCount,
  totalCount,
  percent,
  nextLesson,
  disableActions = false,
  classRestricted = false,
  enabledLessonIds = null,
}: {
  track: Track;
  completedIds: string[];
  completedCount: number;
  totalCount: number;
  percent: number;
  nextLesson?: Track["lessons"][number];
  disableActions?: boolean;
  classRestricted?: boolean;
  enabledLessonIds?: string[] | null;
}) {
  return (
    <>
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="space-y-3 pt-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-800">{track.title} progress</p>
              <p className="text-xs font-medium text-slate-500">
                {completedCount} of {totalCount} lessons complete
              </p>
            </div>
            <span className="text-sm font-bold text-slate-800">{percent}%</span>
          </div>
          <Progress value={percent} className="h-2.5" />
        </CardContent>
      </Card>

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
                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-black",
                      weekDone
                        ? "bg-[var(--brand)] text-white"
                        : "bg-white text-slate-700 ring-1 ring-slate-200",
                    ].join(" ")}
                  >
                    W{wk.week}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black tracking-tight text-slate-900">
                      Week {wk.week} — {wk.theme}
                    </p>
                    <p className="text-xs font-medium text-slate-500">{wk.focus}</p>
                  </div>
                </div>

                {weekLessons.map((lesson) => {
                  const completed = completedIds.includes(lesson.id);
                  const assignmentLocked =
                    classRestricted &&
                    !isLessonOpenForStudent(
                      lesson.id,
                      classRestricted,
                      enabledLessonIds,
                      completedIds
                    );
                  const isActive =
                    nextLesson?.id === lesson.id && !completed && !lesson.comingSoon && !assignmentLocked;
                  const canStart =
                    lesson.href && !lesson.comingSoon && !assignmentLocked && !disableActions;

                  return (
                    <Card
                      key={lesson.id}
                      className={[
                        "ml-3 border shadow-sm transition-all",
                        completed
                          ? "border-[var(--brand)]/60 bg-[var(--brand)]/5"
                          : isActive
                            ? "border-[var(--brand)] bg-white shadow-[0_0_0_1px_rgba(24,161,109,0.25)]"
                            : "border-slate-200",
                        lesson.comingSoon || assignmentLocked ? "opacity-80" : "",
                      ].join(" ")}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {completed ? (
                                <CheckCircle2 className="h-5 w-5 text-[var(--brand)]" />
                              ) : lesson.comingSoon || assignmentLocked ? (
                                <Lock className="h-5 w-5 text-slate-400" />
                              ) : (
                                <Play className="h-5 w-5 text-[var(--accent)]" />
                              )}
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">
                                {weekSessionLabel(lesson)}
                                {isActive ? (
                                  <span className="ml-2 rounded-full bg-[var(--brand)]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--brand)]">
                                    Next lesson
                                  </span>
                                ) : null}
                                {lesson.comingSoon ? (
                                  <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                                    Coming soon
                                  </span>
                                ) : null}
                                {assignmentLocked ? (
                                  <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                                    Not assigned
                                  </span>
                                ) : null}
                              </p>
                              <p className="mt-1 text-base font-black tracking-tight text-slate-900">
                                {lesson.title}
                              </p>
                              <p className="mt-1 text-xs font-semibold text-slate-500">
                                +{lesson.xp} XP · {lesson.badgeIcon} {lesson.badgeName}
                              </p>
                            </div>
                          </div>
                          {!lesson.hasLesson ? (
                            <div className="shrink-0">
                              {completed && canStart ? (
                                <Button asChild variant="secondary">
                                  <Link href={lesson.href!}>Review</Link>
                                </Button>
                              ) : canStart ? (
                                <Button asChild className="px-6 font-bold">
                                  <Link href={lesson.href!}>Start</Link>
                                </Button>
                              ) : lesson.comingSoon ? (
                                <Button disabled variant="secondary">
                                  Soon
                                </Button>
                              ) : assignmentLocked ? (
                                <Button disabled variant="secondary">
                                  Locked
                                </Button>
                              ) : null}
                            </div>
                          ) : null}
                        </div>

                        {lesson.hasLesson && canStart ? (
                          <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
                            <Button
                              asChild
                              size="lg"
                              className="h-auto justify-start gap-3 py-3"
                            >
                              <Link href={`${lesson.href}?view=lesson`}>
                                <BookOpen className="h-5 w-5 shrink-0" />
                                <span className="flex flex-col items-start leading-tight">
                                  <span className="text-[10px] font-bold uppercase tracking-wide text-white/80">
                                    Step 1 · Learn it
                                  </span>
                                  <span className="text-sm font-black">Open the Lesson</span>
                                </span>
                              </Link>
                            </Button>
                            <Button
                              asChild
                              size="lg"
                              variant="outline"
                              className="h-auto justify-start gap-3 border-[var(--brand)]/40 py-3 text-[var(--brand-2)] hover:bg-[var(--brand)]/5"
                            >
                              <Link href={`${lesson.href}?view=exercises`}>
                                <ListChecks className="h-5 w-5 shrink-0" />
                                <span className="flex flex-col items-start leading-tight">
                                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                    Step 2 · Practice
                                  </span>
                                  <span className="text-sm font-black">
                                    {completed ? "Review the Activity" : "Do the Activity"}
                                  </span>
                                </span>
                              </Link>
                            </Button>
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
          <div className="grid grid-cols-2 gap-3">
            {track.lessons.map((l) => {
              const unlocked = completedIds.includes(l.id);
              return (
                <Card
                  key={l.id}
                  className={[
                    "border",
                    unlocked
                      ? "border-[var(--accent)]/50 bg-amber-50/30"
                      : "border-slate-200 opacity-70",
                  ].join(" ")}
                >
                  <CardContent className="p-4">
                    <div className="text-2xl">{l.badgeIcon}</div>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{l.badgeName}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {unlocked ? "Unlocked" : l.comingSoon ? "Coming soon" : "Locked"}
                    </p>
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
