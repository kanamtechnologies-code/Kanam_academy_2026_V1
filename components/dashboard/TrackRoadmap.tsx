"use client";

import Link from "next/link";
import { CheckCircle2, Lock, Play, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  type Track,
  weekSessionLabelFromIndex,
  trackProgress,
} from "@/lib/tracks";

export function TrackRoadmap({
  track,
  completedIds,
  locked = false,
  lockMessage,
  lockCtaHref,
  lockCtaLabel,
}: {
  track: Track;
  completedIds: string[];
  locked?: boolean;
  lockMessage?: string;
  lockCtaHref?: string;
  lockCtaLabel?: string;
}) {
  const { completedCount, totalCount, percent, totalXp, activeIndex, nextLesson } =
    trackProgress(completedIds, track.lessons);

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
            activeIndex={activeIndex}
            disableActions
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
                  ({weekSessionLabelFromIndex(Math.max(0, activeIndex))})
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
        activeIndex={activeIndex}
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
  activeIndex,
  disableActions = false,
}: {
  track: Track;
  completedIds: string[];
  completedCount: number;
  totalCount: number;
  percent: number;
  activeIndex: number;
  disableActions?: boolean;
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
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[var(--accent)]" />
            <h2 className="text-lg font-black tracking-tight text-slate-900">Learning path</h2>
          </div>
          <div className="space-y-3">
            {track.lessons.map((lesson, idx) => {
              const completed = completedIds.includes(lesson.id);
              const isActive = idx === activeIndex && !completed && !lesson.comingSoon;
              const canStart = lesson.href && !lesson.comingSoon && !disableActions;

              return (
                <Card
                  key={lesson.id}
                  className={[
                    "border shadow-sm transition-all",
                    completed
                      ? "border-[var(--brand)]/60 bg-[var(--brand)]/5"
                      : isActive
                        ? "border-[var(--brand)] bg-white shadow-[0_0_0_1px_rgba(24,161,109,0.25)]"
                        : "border-slate-200",
                    lesson.comingSoon ? "opacity-80" : "",
                  ].join(" ")}
                >
                  <CardContent className="flex items-center justify-between gap-4 p-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {completed ? (
                          <CheckCircle2 className="h-5 w-5 text-[var(--brand)]" />
                        ) : lesson.comingSoon ? (
                          <Lock className="h-5 w-5 text-slate-400" />
                        ) : (
                          <Play className="h-5 w-5 text-[var(--accent)]" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">
                          {weekSessionLabelFromIndex(idx)}
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
                        </p>
                        <p className="mt-1 text-base font-black tracking-tight text-slate-900">
                          {lesson.title}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          +{lesson.xp} XP · {lesson.badgeIcon} {lesson.badgeName}
                        </p>
                      </div>
                    </div>
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
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
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
