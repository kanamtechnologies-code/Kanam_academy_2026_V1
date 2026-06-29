"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Play, Sparkles, Trophy } from "lucide-react";

import { SpotlightTour } from "@/components/ui/SpotlightTour";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";

function weekSessionLabelFromIndex(idx: number) {
  const week = Math.floor(idx / 2) + 1;
  const session = (idx % 2) + 1;
  return `Week ${week} · Session ${session}`;
}

const demoLessons = [
  { title: "My First AI Helper", badge: "🤖", xp: 50 },
  { title: "My AI Helper Listens", badge: "👂", xp: 100 },
  { title: "My AI Makes Choices", badge: "🧠", xp: 150 },
  { title: "Smarter AI Rules", badge: "🧠", xp: 250 },
  { title: "AI Repeats Tasks", badge: "🔁", xp: 300 },
  { title: "Patterns and Predictions", badge: "🔍", xp: 350 },
];

export default function DemoDashboardPage() {
  const completedCount = 2;
  const totalCount = demoLessons.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  return (
    <WelcomeBackground>
      <SpotlightTour
        storageKey="kanam_tour_demo_dashboard_v1_done"
        remember={false}
        fadeMs={420}
        moveMs={760}
        recomputeDelayMs={650}
        steps={[
          {
            id: "top",
            selector: '[data-tour="demo-hero"]',
            title: "This is a demo dashboard",
            body: "Nothing here saves to a profile and nothing writes to the database. It’s just a guided preview.",
            emoji: "👀",
            padding: 14,
          },
          {
            id: "progress",
            selector: '[data-tour="demo-progress"]',
            title: "Progress (preview)",
            body: "In the real app, this would update when a student submits a lesson. In demo mode, it’s just a pretend example.",
            emoji: "📈",
            padding: 12,
          },
          {
            id: "lessons",
            selector: '[data-tour="demo-lessons"]',
            title: "Lesson list (preview)",
            body: "Normally these would unlock + show completions. In the demo they don’t do anything.",
            emoji: "📚",
            padding: 12,
          },
          {
            id: "start",
            selector: '[data-tour="demo-start"]',
            title: "Try the canvas",
            body: "This button opens the interactive demo lesson builder (still no database).",
            emoji: "▶️",
            padding: 14,
          },
        ]}
      />

      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-10">
        <div
          data-tour="demo-hero"
          className="kanam-glow-card rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl md:p-8"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-700">
                Demo mode
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                Dashboard preview (tutorial only)
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">
                This page is intentionally <span className="font-semibold">not functional</span>. It
                doesn’t connect to any profile and it doesn’t write anything to the database. It’s
                just a guided walkthrough of what the real dashboard UI looks like.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">No sign-in required</Badge>
                <Badge variant="outline">No database</Badge>
                <Badge variant="outline">Tutorial only</Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button asChild data-tour="demo-start" className="h-12 px-5 text-base font-extrabold">
                <Link href="/learn/demo">
                  <Play className="h-5 w-5" />
                  Start interactive demo
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12">
                <Link href="/welcome">
                  <Sparkles className="h-4 w-4" />
                  Back to Welcome
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          <Card data-tour="demo-progress" className="kanam-glow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
                  <Trophy className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-slate-900">Progress preview</CardTitle>
                  <CardDescription className="text-slate-700">
                    Demo example (not saved)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white/85 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-600">
                  Starter pack
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {completedCount} / {totalCount} lessons completed
                </p>
                <Progress value={percent} className="mt-3 h-3" />
                <p className="mt-2 text-xs text-slate-600">
                  In the real app, this updates as students submit lessons.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/85 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-600">
                  Next step (preview)
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  Week 2 · Session 1 — My AI Makes Choices
                </p>
                <Button disabled className="mt-3 h-11 w-full">
                  Continue (disabled in demo)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card data-tour="demo-lessons" className="kanam-glow-card lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
                  <BookOpen className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-slate-900">Lessons preview</CardTitle>
                  <CardDescription className="text-slate-700">
                    Preview list (buttons are off in demo)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {demoLessons.map((l, idx) => {
                  const done = idx < completedCount;
                  return (
                    <div
                      key={`${l.title}-${idx}`}
                      className="rounded-2xl border border-slate-200 bg-white/85 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-600">
                            {weekSessionLabelFromIndex(idx)}
                          </p>
                          <p className="mt-1 text-sm font-extrabold tracking-tight text-slate-900">
                            {l.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-600">{l.xp} XP</p>
                        </div>
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
                          <span className="text-lg">{l.badge}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <Badge variant={done ? "secondary" : "outline"}>
                          {done ? "Completed (example)" : "Locked (example)"}
                        </Badge>
                        <Button disabled size="sm" variant="outline">
                          Open
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-slate-600">
                Want to actually try the editors + console? Use{" "}
                <Link href="/learn/demo" className="font-semibold underline">
                  Start interactive demo
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </WelcomeBackground>
  );
}

