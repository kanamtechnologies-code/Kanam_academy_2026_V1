"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Code2, Play, RotateCcw, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export type LessonCfuItem = {
  question: string;
  answer: string;
};

export type LessonExplainItem = {
  title: string;
  text: string;
};

export type LessonConfig = {
  title: string;
  goal: string;
  xpReward: number;
  badge: string;
  starterCode: string;
  instructorScript: string;
  kidExplain: LessonExplainItem[];
  steps: string[];
  cfu: LessonCfuItem[];
  tryThis: string[];
  aiSafetyMoment: string;

  editorPlaceholder?: string;
  terminalPrompt?: string;
  prevHref?: string;
  nextHref?: string;

  getRunOutput: (code: string) => string;
  computeProgressPercent: (code: string, submitted: boolean) => number;
  isSubmissionValid: (code: string) => boolean;
  getSubmitOutput: (ok: boolean) => string;
};

function asTerminal(prompt: string, body: string) {
  return `${prompt} python main.py\n${body}\n${prompt}`;
}

export function LessonCanvas({ lesson }: { lesson: LessonConfig }) {
  const terminalPrompt = lesson.terminalPrompt ?? "kanam-bot@python ~$";

  const [code, setCode] = React.useState<string>(lesson.starterCode);
  const [output, setOutput] = React.useState<string>(
    asTerminal(terminalPrompt, "Press Run to see output here.")
  );
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [revealedCfu, setRevealedCfu] = React.useState<boolean[]>(
    Array.from({ length: lesson.cfu.length }, () => false)
  );

  // Keep quiz state aligned if lesson changes or cfu count changes.
  React.useEffect(() => {
    setRevealedCfu(Array.from({ length: lesson.cfu.length }, () => false));
  }, [lesson.cfu.length]);

  const readyToSubmit = lesson.isSubmissionValid(code);
  const progressPercent = React.useMemo(
    () => lesson.computeProgressPercent(code, submitted),
    [code, submitted, lesson]
  );

  const onRun = () => {
    setOutput(lesson.getRunOutput(code));
  };

  const onReset = () => {
    setCode(lesson.starterCode);
    setOutput(asTerminal(terminalPrompt, "Press Run to see output here."));
    setSubmitted(false);
    setRevealedCfu(Array.from({ length: lesson.cfu.length }, () => false));
  };

  const onSubmit = () => {
    const ok = lesson.isSubmissionValid(code);
    setSubmitted(ok);
    setOutput(lesson.getSubmitOutput(ok));
  };

  const LessonHeader = (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Image src="/images/Logo.png" alt="Kanam Academy logo" width={18} height={18} />
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Lesson
          </p>
        </div>
        <h1 className="mt-1 truncate text-xl font-semibold text-slate-900">
          {lesson.title}
        </h1>
        <p className="mt-1 text-sm text-slate-600">{lesson.goal}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/">Home</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="sm"
            disabled={!lesson.prevHref}
          >
            <Link href={lesson.prevHref ?? "#"} aria-disabled={!lesson.prevHref}>
              Prev
            </Link>
          </Button>
          <Button asChild size="sm" disabled={!lesson.nextHref}>
            <Link href={lesson.nextHref ?? "#"} aria-disabled={!lesson.nextHref}>
              Next
            </Link>
          </Button>
        </div>
        <Badge variant="secondary" className="shrink-0">
          <Zap className="mr-1 h-3.5 w-3.5 text-[var(--accent)]" />
          {lesson.xpReward} XP
        </Badge>
        <Badge
          variant={submitted ? "success" : "outline"}
          className={submitted ? "animate-pulse" : ""}
        >
          {lesson.badge}
        </Badge>
      </div>
    </div>
  );

  const LearnContent = (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Coach’s Note
        </p>
        <p className="mt-2 leading-relaxed">{lesson.instructorScript}</p>
        <p className="mt-2 leading-relaxed">
          Read the steps, write your code on the right, then press{" "}
          <span className="font-medium">Run</span> to see output.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Quick Explainer
        </p>
        <div className="mt-3 space-y-3">
          {lesson.kidExplain.map((item) => (
            <div key={item.title} className="rounded-md bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          AI Safety Moment
        </p>
        <p className="mt-2 leading-relaxed">{lesson.aiSafetyMoment}</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Steps</p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {lesson.steps.map((step) => (
            <li key={step} className="leading-relaxed">
              <span className="font-medium">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );

  const ReviewContent = (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Check for Understanding (CFU)
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Try to answer first. Then tap <span className="font-semibold">Show answer</span>{" "}
          to check yourself.
        </p>
        <div className="mt-3 space-y-3">
          {lesson.cfu.map((item, idx) => (
            <div key={item.question} className="rounded-md bg-slate-50 p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-slate-900">
                  {idx + 1}. {item.question}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setRevealedCfu((prev) => prev.map((v, i) => (i === idx ? !v : v)))
                  }
                >
                  {revealedCfu[idx] ? "Hide" : "Show"} answer
                </Button>
              </div>
              {revealedCfu[idx] ? (
                <div className="mt-2 rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-700">
                  <span className="font-semibold">Answer:</span> {item.answer}
                </div>
              ) : (
                <div className="mt-2 rounded-md border border-dashed border-slate-300 bg-white/40 p-2 text-sm text-slate-500">
                  (Answer hidden — try it in your brain first!)
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              setRevealedCfu(Array.from({ length: lesson.cfu.length }, () => false))
            }
          >
            Reset quiz
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Try This
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {lesson.tryThis.map((challenge) => (
            <li key={challenge} className="leading-relaxed">
              {challenge}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const Editor = (
    <Card className="flex min-h-[420px] flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-slate-700" />
          <CardTitle>Write Your Python Code Here</CardTitle>
        </div>
        <CardDescription>
          Click inside the big box below and type. Then press{" "}
          <span className="font-medium">Run</span>.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          aria-label="Python code editor"
          placeholder={lesson.editorPlaceholder ?? '# Try typing:\n# print("Hello!")\n'}
          className={[
            "min-h-[260px] flex-1 resize-none border-2 bg-white shadow-sm",
            "focus-visible:ring-4",
            submitted
              ? "border-[var(--brand)] focus-visible:ring-[var(--brand)]/25"
              : "border-[var(--accent)] focus-visible:ring-[var(--accent)]/25",
            "dark:bg-slate-950",
          ].join(" ")}
        />
        <div className="mt-auto rounded-md border border-slate-200 bg-white p-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={onRun} variant="secondary">
              <Play className="h-4 w-4" />
              Run
            </Button>
            <Button onClick={onReset} variant="outline">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button onClick={onSubmit} disabled={!code.trim()}>
              <CheckCircle2 className="h-4 w-4" />
              Submit
            </Button>
            {submitted ? (
              <Badge variant="success" className="ml-auto animate-bounce">
                Success!
              </Badge>
            ) : readyToSubmit ? (
              <Badge variant="secondary" className="ml-auto">
                Ready to submit
              </Badge>
            ) : (
              <Badge variant="outline" className="ml-auto">
                Keep going
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const Output = (
    <Card className="flex min-h-[320px] flex-col">
      <CardHeader>
        <CardTitle>Console Output</CardTitle>
        <CardDescription>Looks like a terminal.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full min-h-[220px] overflow-y-auto rounded-md bg-black p-3 font-mono text-sm text-emerald-400 shadow-inner">
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </CardContent>
    </Card>
  );

  const CodingLab = (
    <div className="flex flex-col gap-4">
      {Editor}
      {Output}
      {submitted && lesson.nextHref ? (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Nice work!</p>
              <p className="text-sm text-slate-600">Ready for the next lesson?</p>
            </div>
            <Button asChild>
              <Link href={lesson.nextHref}>Next Lesson</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-4 md:p-6">
      <Card>
        <CardContent className="space-y-3 pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Progress
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Based on your code (MVP checks)
              </p>
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {progressPercent}%
            </div>
          </div>
          <Progress value={progressPercent} />
        </CardContent>
      </Card>

      {/* Mobile / Tablet: Tabs */}
      <div className="md:hidden">
        <Tabs defaultValue="learn">
          <TabsList className="w-full">
            <TabsTrigger value="learn" className="flex-1">
              Learn
            </TabsTrigger>
            <TabsTrigger value="code" className="flex-1">
              Code
            </TabsTrigger>
            <TabsTrigger value="review" className="flex-1">
              Review
            </TabsTrigger>
          </TabsList>
          <TabsContent value="learn">
            <Card className="bg-slate-50">
              <CardContent className="space-y-4 pt-6">
                {LessonHeader}
                {LearnContent}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="code">{CodingLab}</TabsContent>
          <TabsContent value="review">
            <Card className="bg-slate-50">
              <CardContent className="space-y-4 pt-6">
                {LessonHeader}
                {ReviewContent}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop: 40% lesson / 60% interactivity */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="grid grid-cols-5">
            <div className="col-span-2 bg-slate-50">
              <div className="max-h-[calc(100dvh-220px)] overflow-y-auto p-6">
                <div className="space-y-4">
                  {LessonHeader}
                  {LearnContent}
                  {ReviewContent}
                </div>
              </div>
            </div>
            <div className="col-span-3 border-l border-slate-200 bg-white">
              <div className="max-h-[calc(100dvh-220px)] overflow-y-auto p-6">
                {CodingLab}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

