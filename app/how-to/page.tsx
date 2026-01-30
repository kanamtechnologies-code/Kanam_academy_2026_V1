"use client";

import * as React from "react";
import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  CornerDownLeft,
  Copy,
  Eye,
  LockKeyhole,
  MousePointerClick,
  Play,
  RotateCcw,
  Sparkles,
  Wand2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";

export default function HowToLessonsPage() {
  const [animateIn, setAnimateIn] = React.useState(false);

  React.useEffect(() => {
    setAnimateIn(false);
    const t = window.setTimeout(() => setAnimateIn(true), 10);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <WelcomeBackground>
      <div
        className={[
          "flex min-h-[calc(100dvh-160px)] w-full items-start justify-start px-4 md:px-10",
          "transition-all duration-300 ease-out",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
      >
        <div className="mx-auto w-full max-w-6xl space-y-6 py-2 md:py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-600">
              <BookOpen className="h-5 w-5" />
              <p className="text-sm font-semibold">How to use Kanam lessons</p>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Your lesson playbook (ages 10–14)
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
              Every lesson is the same “mini game.” You read on the left, you code on the right, and
              the console tells you what happened. You’ll practice twice: first with guided blanks,
              then from scratch (that’s the one that counts for Success).
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">The exact steps (do these in order)</CardTitle>
              <CardDescription>
                If you do this loop, you’ll finish every lesson — even if you’re brand new.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Step 1
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  Read “Coach’s Note” and “Steps” (left side).
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  You are hunting for the next thing to type — not memorizing.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Step 2
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  Start in <span className="font-semibold">Fill in the blanks (guided)</span>.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Replace every <Badge variant="secondary">____</Badge> with something real.
                </p>
                <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">Example:</p>
                  <p className="mt-1 font-mono text-xs text-slate-700">
                    name = &quot;____&quot; → name = &quot;Alex&quot;
                  </p>
                  <p className="mt-1 font-mono text-xs text-slate-700">
                    if mood == &quot;____&quot;: → if mood == &quot;happy&quot;:
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Step 3
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  Click the box you want to use.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  You’ll see a little badge that says <span className="font-semibold">Using this</span>.
                  That’s the code Run will read.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700">
                    <MousePointerClick className="h-4 w-4" />
                    Click inside a code box to “pick” it
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700">
                    <BadgeCheck className="h-4 w-4" />
                    “Using this” = active code
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Step 4
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  If your code asks a question, answer it.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Some lessons use <code className="font-mono">input()</code>. For now, Kanam auto-fills an
                  example answer in the background so you can focus on the code (you’ll still see the prompt
                  and what got “typed” in the console).
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Then press{" "}
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <Play className="h-4 w-4" /> Run
                  </span>{" "}
                  to see what your bot says.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Step 5
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  Read the Console Output and fix ONE thing at a time.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  If the console says “Add: …” that’s a hint. Copy that line into your code.
                  Run again. Repeat.
                </p>
                <div className="mt-3 flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <Copy className="mt-0.5 h-4 w-4 text-slate-700" />
                  <p>
                    Treat hints like a quest:{" "}
                    <span className="font-semibold text-slate-900">
                      copy the missing line → Run → check output.
                    </span>
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Step 6
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  Now do the real challenge: <span className="font-semibold">Try it from scratch (no hints)</span>.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Write the same idea again without looking. This is where it locks into your brain.
                </p>
                <div className="mt-3 flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <Eye className="mt-0.5 h-4 w-4 text-slate-700" />
                  <p>
                    If you forget, peek at guided for 10 seconds, then come back and keep going.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Step 7
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  Submit (from scratch) to win the lesson.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Press{" "}
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="h-4 w-4" /> Submit (from scratch)
                  </span>
                  . If it succeeds, you unlock the next lesson.
                </p>
                <div className="mt-3 flex items-start gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
                  <LockKeyhole className="mt-0.5 h-4 w-4" />
                  <p>
                    <span className="font-semibold">Important:</span> Success is based on the{" "}
                    <span className="font-semibold">from scratch</span> box — guided is practice.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Bonus
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  Level up with “Try This” challenges.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  These are optional, but they’re how you become an actual builder (not just a copy‑paster).
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="border-[rgb(var(--accent-rgb)/0.45)] bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Buttons you’ll use</CardTitle>
                <CardDescription>What each button means.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <Play className="mt-0.5 h-4 w-4 text-slate-700" />
                  <div>
                    <p className="font-semibold text-slate-900">Run</p>
                    <p className="text-slate-600">
                      Tries your code and shows the console output.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-slate-700" />
                  <div>
                    <p className="font-semibold text-slate-900">Submit (from scratch)</p>
                    <p className="text-slate-600">
                      Checks only your from‑scratch code. That’s what completes the lesson.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <RotateCcw className="mt-0.5 h-4 w-4 text-slate-700" />
                  <div>
                    <p className="font-semibold text-slate-900">Reset</p>
                    <p className="text-slate-600">Puts the lesson back to the starting blanks.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[rgb(var(--accent-rgb)/0.45)] bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Common “uh oh” fixes</CardTitle>
                <CardDescription>If something breaks, it’s usually one of these.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <CornerDownLeft className="mt-0.5 h-4 w-4 text-slate-700" />
                  <p>
                    <span className="font-semibold text-slate-900">Indent matters.</span>{" "}
                    After <span className="font-mono">if</span> / <span className="font-mono">elif</span> /{" "}
                    <span className="font-mono">else</span> lines, the next lines must be pushed right.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Wand2 className="mt-0.5 h-4 w-4 text-slate-700" />
                  <p>
                    <span className="font-semibold text-slate-900">Quotes are for words.</span>{" "}
                    Text needs quotes: <span className="font-mono">&quot;hello&quot;</span>. Numbers don’t:
                    <span className="font-mono"> 3</span>.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 text-slate-700" />
                  <p>
                    <span className="font-semibold text-slate-900">Make it yours.</span>{" "}
                    Change the bot’s messages — just keep the code structure.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[rgb(var(--accent-rgb)/0.45)] bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-base">What does the progress bar mean?</CardTitle>
                <CardDescription>A quick, honest explanation.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 leading-relaxed">
                The progress bar is based on your code patterns (like “did you write an if?” or “did
                you use print()?”). It helps you know you’re on track — but the real win is submitting
                the from‑scratch version.
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Grown‑up note (optional)</CardTitle>
            <CardDescription>For parents/teachers who are curious.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 leading-relaxed">
            This is an MVP learning sandbox. The console output is guided by checks that look for key
            Python patterns, so students can learn the structure step-by-step without getting blocked
            by setup.
          </CardContent>
        </Card>
        </div>
      </div>
    </WelcomeBackground>
  );
}

