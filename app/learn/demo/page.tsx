"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2, Code2, Play, RotateCcw, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const lesson = {
  title: "1. My First AI Helper",
  goal: "Teach your computer to introduce itself using Python!",
  xpReward: 50,
  badge: "First Spark",
  starterCode: '# Write your code below\nname = "Kanam"\n',
  instructorScript:
    "Think of a variable like a labeled box. We're putting a name inside so our AI remembers who it’s talking to.",
  kidExplain: [
    {
      title: "What is a variable?",
      text:
        'A **variable** is like a labeled box that holds something. The label is the variable name (like `name`). Inside the box is the value (like `"Kanam"`).',
    },
    {
      title: 'What do quotes "" mean?',
      text:
        'Quotes tell Python: “This is **text**.” Text is also called a **string**. So `"Kanam"` is a string.',
    },
    {
      title: "What does print(...) do?",
      text:
        "`print(...)` tells Python to show something on the screen (in the Output panel). It’s like your computer speaking out loud!",
    },
    {
      title: "Why do we use + here?",
      text:
        'The `+` joins (connects) pieces of text together. So `"Hello! I am " + name` becomes one message.',
    },
  ],
  steps: [
    'Create a variable: `name = "Kanam"`',
    'Print a message: `print("Hello! I am " + name)`',
    "Press Run to see what happens.",
  ],
  cfu: [
    {
      question: 'What do quotes "" tell Python?',
      answer: "It’s text (a string).",
    },
    {
      question: "What happens if you remove the + sign?",
      answer: "You get an error (Python can’t combine them like that).",
    },
  ],
  tryThis: [
    'Change "Kanam" to your name.',
    'Try printing: "Hello!" on one line and your name on the next line.',
    'Try: print("Nice to meet you, " + name)',
  ],
  aiSafetyMoment:
    "Remember: AI doesn't have feelings, it's just very good at following patterns!",
} as const;

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

function computeProgressPercent(code: string, submitted: boolean) {
  // Super simple checks for MVP (kid-friendly + forgiving)
  const hasName =
    /\bname\s*=\s*["'][^"']+["']/.test(code) || /\bname\s*=/.test(code);
  const hasPrint = code.includes("print(");
  const hasHelloMessage =
    /print\(\s*["'].*hello/i.test(code) && (code.includes("+") || code.includes("name"));

  const checks = [hasName, hasPrint, hasHelloMessage];
  const completed = checks.filter(Boolean).length;

  const percent = Math.round((completed / checks.length) * 100);
  return submitted ? 100 : percent;
}

function getHardcodedOutput(code: string) {
  if (code.includes("print(")) {
    return asTerminal('Hello! I am Kanam\n\n(MVP note: output is hardcoded when your code contains print().)');
  }
  return asTerminal("(no output)\nTip: add print(...) to see output.");
}

export default function LessonDemoPage() {
  const [code, setCode] = React.useState<string>(lesson.starterCode);
  const [output, setOutput] = React.useState<string>(
    asTerminal("Press Run to see output here.")
  );
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const hasPrint = code.includes("print(");
  const progressPercent = React.useMemo(
    () => computeProgressPercent(code, submitted),
    [code, submitted]
  );

  const onRun = () => {
    setOutput(getHardcodedOutput(code));
  };

  const onReset = () => {
    setCode(lesson.starterCode);
    setOutput(asTerminal("Press Run to see output here."));
    setSubmitted(false);
  };

  const onSubmit = () => {
    if (hasPrint) {
      setSubmitted(true);
      setOutput(asTerminal("✅ Submitted! Nice work — you used print()."));
      return;
    }
    setSubmitted(false);
    setOutput(asTerminal("❌ Not quite — add a print(...) and try Submit again."));
  };

  const LessonHeader = (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Image
            src="/images/Logo.png"
            alt="Kanam Academy logo"
            width={18}
            height={18}
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Lesson
          </p>
        </div>
        <h1 className="mt-1 truncate text-xl font-semibold text-slate-900">
          {lesson.title}
        </h1>
        <p className="mt-1 text-sm text-slate-600">{lesson.goal}</p>
      </div>
      <div className="flex items-center gap-2">
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
          Today you will teach your computer to introduce itself. You’ll store a
          name in a variable, then use <span className="font-mono">print(...)</span>{" "}
          to show the message in the Output.
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
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                {item.text}
              </p>
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
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Steps
        </p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {lesson.steps.map((step) => (
            <li key={step} className="leading-relaxed">
              <span className="font-medium">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Copy/paste example</p>
          <pre className="mt-2 whitespace-pre-wrap rounded bg-black p-2 font-mono text-xs text-emerald-300">
{`name = "Kanam"
print("Hello! I am " + name)`}
          </pre>
        </div>
      </div>
    </div>
  );

  const ReviewContent = (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Check for Understanding (CFU)
        </p>
        <div className="mt-3 space-y-3">
          {lesson.cfu.map((item) => (
            <div key={item.question} className="rounded-md bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-900">
                Q: {item.question}
              </p>
              <p className="mt-1 text-sm text-slate-700">
                <span className="font-semibold">A:</span> {item.answer}
              </p>
            </div>
          ))}
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
          Click inside the big box below and type. Then press <span className="font-medium">Run</span>.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          aria-label="Python code editor"
          placeholder={'# Try typing:\n# print("Hello! I am " + name)\n'}
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
            ) : hasPrint ? (
              <Badge variant="secondary" className="ml-auto">
                Ready to submit
              </Badge>
            ) : (
              <Badge variant="outline" className="ml-auto">
                Add print(...)
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
          <div className="grid h-[calc(100dvh-220px)] grid-cols-5">
            <div className="col-span-2 bg-slate-50">
              <div className="h-full overflow-y-auto p-6">
                <div className="space-y-4">
                  {LessonHeader}
                  {LearnContent}
                  {ReviewContent}
                </div>
              </div>
            </div>
            <div className="col-span-3 border-l border-slate-200 bg-white">
              <div className="h-full min-h-0 overflow-y-auto p-6">
                {CodingLab}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

