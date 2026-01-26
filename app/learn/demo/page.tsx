"use client";

import * as React from "react";
import { CheckCircle2, Play, RotateCcw, Zap } from "lucide-react";

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
  starterCode: "# Write your code below\nname = 'Kanam'\n",
} as const;

function getHardcodedOutput(code: string) {
  if (code.includes("print(")) {
    return "Kanam: Hi! I'm your first AI helper. 🚀\n\n(MVP note: output is hardcoded when your code contains print().)";
  }
  return "No output yet. Try using print(...) in your code, then press Run.";
}

export default function LessonDemoPage() {
  const [code, setCode] = React.useState<string>(lesson.starterCode);
  const [output, setOutput] = React.useState<string>(
    "Press Run to see output here."
  );
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const hasPrint = code.includes("print(");

  const onRun = () => {
    setOutput(getHardcodedOutput(code));
  };

  const onReset = () => {
    setCode(lesson.starterCode);
    setOutput("Press Run to see output here.");
    setSubmitted(false);
  };

  const onSubmit = () => {
    if (hasPrint) {
      setSubmitted(true);
      setOutput("✅ Submitted! Nice work — you used print().");
      return;
    }
    setSubmitted(false);
    setOutput("❌ Not quite — add a print(...) and try Submit again.");
  };

  const Instructions = (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate">{lesson.title}</CardTitle>
            <CardDescription>{lesson.goal}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="shrink-0">
              <Zap className="mr-1 h-3.5 w-3.5 text-amber-500" />
              {lesson.xpReward} XP
            </Badge>
            <Badge variant={submitted ? "success" : "outline"} className={submitted ? "animate-pulse" : ""}>
              {lesson.badge}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          <p className="font-medium">Your mission</p>
          <p className="mt-1">
            Use <span className="font-mono">print(...)</span> so your computer
            introduces itself.
          </p>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          <p className="font-medium text-slate-900 dark:text-slate-100">
            Tip
          </p>
          <p className="mt-1">
            Try: <span className="font-mono">print(name)</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const Editor = (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Code Editor</CardTitle>
        <CardDescription>Write Python in the textbox (no Monaco for MVP).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          aria-label="Python code editor"
        />
        <div className="flex flex-wrap gap-2">
          <Button onClick={onRun} variant="secondary">
            <Play className="h-4 w-4" />
            Run
          </Button>
          <Button onClick={onSubmit} disabled={!code.trim()}>
            <CheckCircle2 className="h-4 w-4" />
            Submit
          </Button>
          <Button onClick={onReset} variant="outline">
            <RotateCcw className="h-4 w-4" />
            Reset
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
      </CardContent>
    </Card>
  );

  const Output = (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Console Output</CardTitle>
        <CardDescription>Looks like a terminal.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="min-h-[220px] rounded-md bg-black p-3 font-mono text-sm text-emerald-400 shadow-inner">
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </CardContent>
    </Card>
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
                Lesson canvas MVP (hardcoded)
              </p>
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              20%
            </div>
          </div>
          <Progress value={20} />
        </CardContent>
      </Card>

      {/* Mobile / Tablet: Tabs */}
      <div className="md:hidden">
        <Tabs defaultValue="instructions">
          <TabsList className="w-full">
            <TabsTrigger value="instructions" className="flex-1">
              Instructions
            </TabsTrigger>
            <TabsTrigger value="code" className="flex-1">
              Code
            </TabsTrigger>
            <TabsTrigger value="output" className="flex-1">
              Output
            </TabsTrigger>
          </TabsList>
          <TabsContent value="instructions">{Instructions}</TabsContent>
          <TabsContent value="code">{Editor}</TabsContent>
          <TabsContent value="output">{Output}</TabsContent>
        </Tabs>
      </div>

      {/* Desktop: 3 columns */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-4">
        {Instructions}
        {Editor}
        {Output}
      </div>
    </div>
  );
}

