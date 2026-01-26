"use client";

import * as React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const COMPLETED_LESSONS_KEY = "kanam.completedLessonIds";

function loadCompletedLessonIdsOrNull(): string[] | null {
  try {
    const raw = window.localStorage.getItem(COMPLETED_LESSONS_KEY);
    if (raw === null) return null; // not set yet
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

type LessonRow = {
  id: string;
  title: string;
  href?: string;
  xp: number;
  badgeName: string;
  badgeIcon: string;
};

const lessons: LessonRow[] = [
  {
    id: "lesson-1",
    title: "My First AI Helper",
    href: "/learn/1",
    xp: 50,
    badgeName: "The Awakener",
    badgeIcon: "🤖",
  },
  {
    id: "lesson-2",
    title: "Smart Choices Bot",
    href: "/learn/2",
    xp: 100,
    badgeName: "Logic Master",
    badgeIcon: "🧠",
  },
  {
    id: "lesson-3",
    title: "Mood Coach Bot",
    href: undefined,
    xp: 120,
    badgeName: "Empathy Architect",
    badgeIcon: "💚",
  },
  {
    id: "lesson-4",
    title: "Mini Quiz Bot",
    href: undefined,
    xp: 130,
    badgeName: "Data Cruncher",
    badgeIcon: "📊",
  },
  {
    id: "lesson-5",
    title: "KanamBot Chat Loop",
    href: undefined,
    xp: 150,
    badgeName: "Full Stack Bot-Builder",
    badgeIcon: "🧩",
  },
];

export default function Home() {
  const [studentName] = React.useState<string>("Kanam");
  const [completedIds, setCompletedIds] = React.useState<string[]>([]);
  const [hasSavedProgress, setHasSavedProgress] = React.useState<boolean>(false);

  React.useEffect(() => {
    const saved = loadCompletedLessonIdsOrNull();
    // If there's no saved progress yet, start with Lesson 1 completed (demo-friendly)
    if (saved === null) {
      setHasSavedProgress(false);
      setCompletedIds(["lesson-1"]);
      return;
    }
    setHasSavedProgress(true);
    setCompletedIds(saved);
  }, []);

  const completedCount = lessons.filter((l) => completedIds.includes(l.id)).length;
  const totalCount = lessons.length;
  const starterPackPercent = Math.round((completedCount / totalCount) * 100);
  const totalXp = lessons
    .filter((l) => completedIds.includes(l.id))
    .reduce((sum, l) => sum + l.xp, 0);

  const activeIndex = lessons.findIndex((l) => !completedIds.includes(l.id));
  const nextLesson = activeIndex >= 0 ? lessons[activeIndex] : undefined;

  return (
    <div className="min-h-dvh bg-black px-4 py-6 text-slate-100 md:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        {/* Dashboard Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-slate-300">AI + Python Starter Pack</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
              Welcome back, {studentName}!
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="w-fit bg-white/10 text-slate-50">
              <Sparkles className="mr-1 h-4 w-4 text-[var(--accent)]" />
              {hasSavedProgress ? totalXp : 150} XP
            </Badge>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                try {
                  window.localStorage.setItem(
                    COMPLETED_LESSONS_KEY,
                    JSON.stringify([])
                  );
                } catch {
                  // ignore
                }
                setHasSavedProgress(true);
                setCompletedIds([]);
              }}
            >
              Reset progress
            </Button>
          </div>
        </div>

        <Card className="border-slate-700/60 bg-white/5">
          <CardContent className="space-y-3 pt-6">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-200">
                  Starter Pack Progress
                </p>
                <p className="text-xs text-slate-400">
                  {completedCount} out of {totalCount} lessons complete
                </p>
              </div>
              <div className="text-sm font-semibold text-slate-100">
                {starterPackPercent}%
              </div>
            </div>
            <Progress value={starterPackPercent} className="bg-white/10" />
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Learning Path */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-[var(--accent)]" />
              <h2 className="text-lg font-semibold">Your Learning Path</h2>
            </div>

            <div className="space-y-3">
              {lessons.map((lesson, idx) => {
                const completed = completedIds.includes(lesson.id);
                const isActive = idx === activeIndex && !completed;
                const locked = !completed && idx > activeIndex;

                return (
                  <Card
                    key={lesson.id}
                    className={[
                      "border bg-white/5",
                      completed
                        ? "border-[var(--brand)]/60 bg-[var(--brand)]/10"
                        : isActive
                          ? "border-[var(--brand)] shadow-[0_0_0_1px_rgba(24,161,109,0.35),0_0_24px_rgba(24,161,109,0.18)]"
                          : "border-slate-700/60",
                      locked ? "opacity-50 grayscale" : "",
                    ].join(" ")}
                  >
                    <CardContent className="flex items-center justify-between gap-4 p-5">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {completed ? (
                            <CheckCircle2 className="h-5 w-5 text-[var(--brand)]" />
                          ) : locked ? (
                            <Lock className="h-5 w-5 text-slate-400" />
                          ) : (
                            <Play className="h-5 w-5 text-[var(--accent)]" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">
                            Lesson {idx + 1}
                            {isActive ? (
                              <span className="ml-2 rounded-full bg-[var(--brand)]/20 px-2 py-0.5 text-[10px] font-semibold text-[var(--brand)]">
                                Next lesson
                              </span>
                            ) : null}
                          </p>
                          <p className="mt-1 font-semibold text-slate-100">
                            {lesson.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            +{lesson.xp} XP • Badge: {lesson.badgeIcon} {lesson.badgeName}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {completed && lesson.href ? (
                          <Button asChild variant="secondary">
                            <Link href={lesson.href}>Review</Link>
                          </Button>
                        ) : isActive && lesson.href ? (
                          <Button asChild className="px-6">
                            <Link href={lesson.href}>Start</Link>
                          </Button>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {nextLesson?.href ? (
              <div className="text-sm text-slate-300">
                Next step:{" "}
                <Link href={nextLesson.href} className="font-semibold text-slate-50 underline">
                  Start {nextLesson.title}
                </Link>
              </div>
            ) : (
              <div className="text-sm text-slate-300">
                Next step: keep going — more lessons coming soon.
              </div>
            )}
          </div>

          {/* Badge Case */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Your AI Badges</h2>
            <div className="grid grid-cols-2 gap-3">
              {lessons.map((l) => {
                const unlocked = completedIds.includes(l.id);
                return (
                  <Card
                    key={l.id}
                    className={[
                      "border bg-white/5",
                      unlocked ? "border-[var(--accent)]/50" : "border-slate-700/60 opacity-60",
                    ].join(" ")}
                  >
                    <CardContent className="p-4">
                      <div className="text-2xl">{l.badgeIcon}</div>
                      <p className="mt-2 text-sm font-semibold text-slate-100">
                        {l.badgeName}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {unlocked ? "Unlocked" : "Locked"}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Safety Moment */}
        <Card className="border-slate-700/60 bg-white/5">
          <CardHeader>
            <CardTitle className="text-base">AI Safety Moment</CardTitle>
            <CardDescription className="text-slate-400">
              Safety Tip: AI is smart, but it doesn't have feelings or a heart. Never share your home address or passwords with a bot!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
