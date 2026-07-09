"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  Lightbulb,
  ListChecks,
  Loader2,
  PartyPopper,
  Play,
  Sparkles,
  Terminal,
  Trophy,
  Zap,
} from "lucide-react";

import { LessonModule, type LessonModuleData } from "@/components/data/LessonModule";
import { LessonAside } from "@/components/lesson/LessonAside";
import { LessonAccessGate } from "@/components/lesson/LessonAccessGate";
import { CoachNoteContent } from "@/components/python/CoachNoteContent";
import { PythonExerciseEditor } from "@/components/python/PythonExerciseEditor";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { runMiniPython, type MiniRunResult } from "@/lib/pythonRunner";
import {
  cursorForIncompleteCode,
  findTypingZonesForExercise,
  hasBlankTokens,
  prepareExerciseCode,
} from "@/lib/pythonStarter";
import { formatPythonTerminal, PYTHON_TERMINAL_PROMPT } from "@/lib/pythonTerminal";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isGuestMode, markGuestLessonComplete } from "@/lib/guestProgress";
import { cn } from "@/lib/utils";

export type PythonExplainItem = { title: string; text: string };
export type PythonCfuItem = { question: string; answer: string };

export type PythonCommandReference = {
  command: string;
  summary: string;
  example: string;
};

export type PythonRuntimeInput = {
  key: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
};

export type PythonExercise = {
  id: string;
  title: string;
  focusCommand: string;
  commandExplain: string;
  goal: string;
  starterCode: string;
  hint?: string;
  successMessage: string;
  failureMessage: string;
  runtimeInputs?: PythonRuntimeInput[];
  previewOutput?: string;
  validate: (code: string, run: MiniRunResult, runtime?: Record<string, string>) => boolean;
};

export type PythonLessonConfig = {
  id: string;
  title: string;
  goal: string;
  xpReward: number;
  badge: string;
  instructorScript: string;
  kidExplain: PythonExplainItem[];
  steps: string[];
  cfu: PythonCfuItem[];
  tryThis: string[];
  aiSafetyMoment: string;
  commandReference: PythonCommandReference[];
  exercises: PythonExercise[];
  lessonModule?: LessonModuleData;
  terminalPrompt?: string;
  prevHref?: string;
  nextHref?: string;
  dashboardHref?: string;
  coachNoteGateSeconds?: number;
};

export function PythonLessonCanvas({ lesson }: { lesson: PythonLessonConfig }) {
  const terminalPrompt = lesson.terminalPrompt ?? PYTHON_TERMINAL_PROMPT;
  const gateSeconds = lesson.coachNoteGateSeconds ?? 8;

  const [animateIn, setAnimateIn] = React.useState(false);
  const [view, setView] = React.useState<"lesson" | "exercises">(
    lesson.lessonModule ? "lesson" : "exercises"
  );
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [codeByExercise, setCodeByExercise] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(
      lesson.exercises.map((ex) => [ex.id, prepareExerciseCode(ex.starterCode)])
    )
  );
  const [completedIds, setCompletedIds] = React.useState<Set<string>>(() => new Set());
  const [lastFeedback, setLastFeedback] = React.useState("");
  const [lastFeedbackSuccess, setLastFeedbackSuccess] = React.useState(false);
  const [terminalOutput, setTerminalOutput] = React.useState("");
  const [runError, setRunError] = React.useState<string | null>(null);
  const [lessonComplete, setLessonComplete] = React.useState(false);

  const [coachConfirmed, setCoachConfirmed] = React.useState(false);
  const [coachSecondsLeft, setCoachSecondsLeft] = React.useState(gateSeconds);

  const [deviceId, setDeviceId] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [studentDbId, setStudentDbId] = React.useState("");

  const activeExercise = lesson.exercises[activeIndex];
  const activeCode = codeByExercise[activeExercise?.id ?? ""] ?? "";

  const runtimeDefaults = React.useMemo(() => {
    const entries: [string, string][] = [];
    for (const ex of lesson.exercises) {
      for (const input of ex.runtimeInputs ?? []) {
        if (!entries.some(([k]) => k === input.key)) {
          entries.push([input.key, input.defaultValue ?? ""]);
        }
      }
    }
    return Object.fromEntries(entries) as Record<string, string>;
  }, [lesson.exercises]);

  const [runtime, setRuntime] = React.useState<Record<string, string>>(runtimeDefaults);

  React.useEffect(() => {
    setRuntime(runtimeDefaults);
  }, [runtimeDefaults]);

  React.useEffect(() => {
    setAnimateIn(false);
    const t = window.setTimeout(() => setAnimateIn(true), 10);
    return () => window.clearTimeout(t);
  }, [lesson.id]);

  React.useEffect(() => {
    if (!lesson.lessonModule) return;
    const requested = new URLSearchParams(window.location.search).get("view");
    if (requested === "exercises" || requested === "lesson") {
      setView(requested);
    }
  }, [lesson.lessonModule]);

  React.useEffect(() => {
    try {
      const key = "kanam.deviceId";
      const existing = window.localStorage.getItem(key);
      const id = existing || (crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()));
      if (!existing) window.localStorage.setItem(key, id);
      setDeviceId(id);
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    if (isGuestMode()) return;
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        if (!supabase) return;
        const { data } = await supabase.auth.getUser();
        const uid = data.user?.id ?? "";
        setUserId(uid);
        if (!uid) return;
        const { data: student } = await supabase
          .from("students")
          .select("id")
          .eq("user_id", uid)
          .maybeSingle();
        if (student?.id) setStudentDbId(student.id);
      } catch {
        // ignore
      }
    })();
  }, []);

  React.useEffect(() => {
    if (gateSeconds <= 0) {
      setCoachConfirmed(true);
      return;
    }
    const coachKey = `kanam.coachRead:python:v1:${lesson.id}:${userId || deviceId || "anon"}`;
    try {
      if (window.localStorage.getItem(coachKey) === "1") {
        setCoachConfirmed(true);
        setCoachSecondsLeft(0);
      }
    } catch {
      // ignore
    }
  }, [lesson.id, userId, deviceId, gateSeconds]);

  React.useEffect(() => {
    if (coachConfirmed || coachSecondsLeft <= 0) return;
    const t = window.setInterval(() => {
      setCoachSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [coachConfirmed, coachSecondsLeft]);

  const trackProgress = React.useCallback(
    async (eventType: string, payload?: unknown) => {
      if (isGuestMode()) {
        if (eventType === "lesson_success") markGuestLessonComplete(lesson.id);
        return;
      }
      if (!deviceId || !userId || !studentDbId) return;
      try {
        const supabase = createSupabaseBrowserClient();
        if (!supabase) return;
        const now = new Date().toISOString();
        await supabase.from("progress_events").insert({
          student_id: studentDbId,
          device_id: deviceId,
          lesson_id: lesson.id,
          event_type: eventType,
          payload: (payload ?? {}) as Record<string, unknown>,
        });
        const patch: Record<string, unknown> = {
          student_id: studentDbId,
          lesson_id: lesson.id,
          last_event_at: now,
        };
        if (eventType === "lesson_opened") patch.opened_at = now;
        if (eventType === "run") patch.has_run = true;
        if (eventType === "lesson_success") {
          patch.success = true;
          patch.success_at = now;
        }
        await supabase.from("lesson_progress").upsert(patch as never, {
          onConflict: "student_id,lesson_id",
        });
      } catch {
        // ignore
      }
    },
    [deviceId, userId, studentDbId, lesson.id]
  );

  React.useEffect(() => {
    if (!deviceId || !userId || !studentDbId) return;
    trackProgress("lesson_opened");
  }, [deviceId, userId, studentDbId, trackProgress]);

  const confirmCoachNote = () => {
    setCoachConfirmed(true);
    setCoachSecondsLeft(0);
    try {
      const coachKey = `kanam.coachRead:python:v1:${lesson.id}:${userId || deviceId || "anon"}`;
      window.localStorage.setItem(coachKey, "1");
    } catch {
      // ignore
    }
    trackProgress("coach_note_confirmed");
  };

  const setActiveCode = (next: string) => {
    if (!activeExercise) return;
    setCodeByExercise((prev) => ({ ...prev, [activeExercise.id]: next }));
  };

  const handleRunExercise = () => {
    if (!activeExercise) return;
    trackProgress("run", { exerciseId: activeExercise.id });

    if (hasBlankTokens(activeCode)) {
      setRunError(null);
      setLastFeedbackSuccess(false);
      setLastFeedback("Fill in every blank before running.");
      setTerminalOutput(formatPythonTerminal("❌ Fill in every blank first.", terminalPrompt));
      return;
    }

    if (activeCode.includes("Print(")) {
      setRunError("Use lowercase print(...), not Print(...).");
      setLastFeedbackSuccess(false);
      setLastFeedback(activeExercise.failureMessage);
      setTerminalOutput(
        formatPythonTerminal("❌ Python needs lowercase print(...), not Print(...).", terminalPrompt)
      );
      return;
    }

    const missingInputs =
      activeExercise.runtimeInputs?.filter((input) => {
        const expectsInput = new RegExp(`\\b${input.key}\\s*=\\s*input\\s*\\(`).test(activeCode);
        if (!expectsInput) return false;
        return !(runtime[input.key] ?? "").trim();
      }) ?? [];

    if (missingInputs.length) {
      setRunError(null);
      setLastFeedbackSuccess(false);
      setLastFeedback(`Type a test answer for: ${missingInputs.map((i) => i.label).join(", ")}`);
      setTerminalOutput(
        formatPythonTerminal("❌ Fill in the test input box above, then Run again.", terminalPrompt)
      );
      return;
    }

    const run = runMiniPython(activeCode, runtime);
    if (run.error) {
      setRunError(run.error);
      setLastFeedbackSuccess(false);
      setLastFeedback(activeExercise.failureMessage);
      setTerminalOutput(formatPythonTerminal(`❌ ${run.error}`, terminalPrompt));
      return;
    }

    setRunError(null);
    const body =
      run.stdout.length > 0
        ? run.stdout.join("\n")
        : "(no output)\nTip: add print(...) to see output.";

    const ok = activeExercise.validate(activeCode, run, runtime);
    if (ok) {
      setLastFeedbackSuccess(true);
      setLastFeedback(activeExercise.successMessage);
      setTerminalOutput(formatPythonTerminal(`✓ ${activeExercise.successMessage}\n\n${body}`, terminalPrompt));
      setCompletedIds((prev) => new Set(prev).add(activeExercise.id));

      if (activeIndex === lesson.exercises.length - 1) {
        setLessonComplete(true);
        trackProgress("lesson_success", { exerciseId: activeExercise.id });
      }
    } else {
      setLastFeedbackSuccess(false);
      setLastFeedback(activeExercise.failureMessage);
      setTerminalOutput(
        formatPythonTerminal(`Code ran but not quite right yet.\n\n${body}\n\n${activeExercise.failureMessage}`, terminalPrompt)
      );
    }
  };

  const goToNextExercise = () => {
    if (activeIndex < lesson.exercises.length - 1) {
      setActiveIndex((i) => i + 1);
      setRunError(null);
      setLastFeedback("");
      setLastFeedbackSuccess(false);
      setTerminalOutput("");
    }
  };

  const progressPercent = lessonComplete
    ? 100
    : Math.round((completedIds.size / lesson.exercises.length) * 100);

  const currentDone = activeExercise ? completedIds.has(activeExercise.id) : false;
  const canAdvance =
    currentDone && activeIndex < lesson.exercises.length - 1 && !lessonComplete;

  const typingZones = React.useMemo(() => {
    if (!activeExercise || currentDone) return [];
    return findTypingZonesForExercise(activeCode, activeExercise.starterCode);
  }, [activeExercise, activeCode, currentDone]);

  const workspaceLocked = !coachConfirmed && gateSeconds > 0 && !lesson.lessonModule;

  React.useEffect(() => {
    if (workspaceLocked || lessonComplete) return;
    const t = window.setTimeout(() => {
      const el = document.querySelector<HTMLTextAreaElement>(
        `[aria-label="Python exercise ${activeIndex + 1}"]`
      );
      if (el) {
        el.focus();
        const cursor = cursorForIncompleteCode(el.value, activeExercise?.starterCode);
        el.setSelectionRange(cursor, cursor);
      }
    }, 150);
    return () => window.clearTimeout(t);
  }, [activeIndex, workspaceLocked, lessonComplete, activeExercise?.starterCode]);

  return (
    <LessonAccessGate lessonId={lesson.id}>
    <WelcomeBackground>
      <div
        className={cn(
          "mx-auto max-w-[1400px] transition-all duration-300",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        <div className="kanam-lesson-hero mb-6 rounded-[22px] p-4 sm:mb-8 sm:rounded-[28px] sm:p-6 md:p-8">
          <div className="kanam-lesson-hero-overlay" />
          <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3.5">
                <div className="kanam-hero-brand-tile grid h-14 w-14 shrink-0 place-items-center rounded-2xl">
                  <Image src="/images/Logo.png" alt="Kanam Academy" width={40} height={40} />
                </div>
                <div className="leading-tight">
                  <p className="kanam-hero-kicker text-base font-black uppercase tracking-[0.16em] text-white md:text-lg">
                    Python + AI Hub
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75">
                    Kanam Academy
                  </p>
                </div>
              </div>
              <h1 className="kanam-hero-title mt-4 break-words text-2xl font-black tracking-tight text-white sm:mt-5 sm:text-3xl md:text-5xl">
                {lesson.title}
              </h1>
              <p className="mt-2.5 max-w-3xl text-base font-medium text-white/90 md:text-lg">
                {lesson.goal}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="kanam-hero-chip">
                <Zap className="mr-1.5 h-4 w-4" />
                {lesson.xpReward} XP
              </Badge>
              <Badge className="kanam-hero-chip">{lesson.badge}</Badge>
              <Button asChild className="kanam-hero-cta" size="sm">
                <Link href={lesson.dashboardHref ?? "/dashboard"}>Dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="relative z-10 mt-6">
            <div className="mb-2 flex justify-between text-sm font-semibold text-white/90">
              <span>
                Exercises complete: {completedIds.size} / {lesson.exercises.length}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2.5 bg-white/25" indicatorClassName="bg-white" />
          </div>
        </div>

        {lesson.lessonModule ? (
          <div className="mb-6 inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setView("lesson")}
              className={cn(
                "flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors",
                view === "lesson"
                  ? "bg-[var(--brand)] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Lesson
            </button>
            <button
              type="button"
              onClick={() => setView("exercises")}
              className={cn(
                "flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors",
                view === "exercises"
                  ? "bg-[var(--brand)] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <ListChecks className="h-4 w-4" />
              Exercises
            </button>
          </div>
        ) : null}

        {lesson.lessonModule && view === "lesson" ? (
          <LessonModule module={lesson.lessonModule} onStart={() => setView("exercises")} />
        ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-3 lg:sticky lg:top-[calc(var(--kanam-header-height,4.75rem)+0.75rem)] lg:max-h-[calc(100dvh-var(--kanam-header-height,4.75rem)-1.5rem)] lg:overflow-y-auto lg:self-start">
            <LessonAside
              title="Coach's note"
              defaultOpen={!lesson.lessonModule}
              icon={<Sparkles className="h-5 w-5 text-[var(--accent)]" />}
              className="border-[rgb(var(--accent-rgb)/0.55)]"
            >
              <div className="space-y-3 text-sm">
                <CoachNoteContent text={lesson.instructorScript} />
                {!coachConfirmed && gateSeconds > 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={coachSecondsLeft > 0}
                    onClick={confirmCoachNote}
                  >
                    Got it {coachSecondsLeft > 0 ? `(${coachSecondsLeft}s)` : ""}
                  </Button>
                ) : null}
              </div>
            </LessonAside>

            <LessonAside
              title="Python command guide"
              defaultOpen
              icon={<Code2 className="h-5 w-5 text-[var(--brand)]" />}
              className="border-[var(--brand)]/30 bg-[var(--brand)]/5"
            >
              <div className="space-y-3">
                {lesson.commandReference.map((cmd) => (
                  <div
                    key={cmd.command}
                    className="rounded-xl border border-white/80 bg-white/90 p-3 shadow-sm"
                  >
                    <p className="font-mono text-sm font-bold text-violet-800">{cmd.command}</p>
                    <p className="mt-1 text-sm text-slate-700">{cmd.summary}</p>
                    <p className="mt-2 font-mono text-xs text-slate-500">Example: {cmd.example}</p>
                  </div>
                ))}
              </div>
            </LessonAside>

            {lesson.kidExplain.length > 0 ? (
              <LessonAside title="Key ideas" icon={<Lightbulb className="h-5 w-5 text-amber-500" />}>
                <div className="space-y-3">
                  {lesson.kidExplain.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                    >
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                    </div>
                  ))}
                </div>
              </LessonAside>
            ) : null}

            {lesson.cfu.length > 0 ? (
              <LessonAside
                title="Check for understanding"
                icon={<CheckCircle2 className="h-5 w-5 text-[var(--brand)]" />}
              >
                <div className="space-y-3 text-sm text-slate-700">
                  {lesson.cfu.map((item) => (
                    <details key={item.question} className="rounded-lg border border-slate-200 p-3">
                      <summary className="cursor-pointer font-semibold text-slate-900">
                        {item.question}
                      </summary>
                      <p className="mt-2 text-slate-600">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </LessonAside>
            ) : null}

            <LessonAside
              title="AI safety moment"
              icon={<Sparkles className="h-5 w-5 text-violet-500" />}
              className="border-violet-200 bg-violet-50/50"
            >
              <p className="text-sm text-slate-700">{lesson.aiSafetyMoment}</p>
            </LessonAside>
          </div>

          <div className="space-y-4">
            {workspaceLocked ? (
              <Card>
                <CardContent className="flex items-center gap-3 py-8 text-slate-600">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Read the coach&apos;s note first — then unlock the code workspace.
                </CardContent>
              </Card>
            ) : (
              <>
                <Card className="border-slate-300 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Code2 className="h-5 w-5 text-[var(--brand)]" />
                      Python workspace
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {lesson.exercises.map((ex, idx) => {
                        const done = completedIds.has(ex.id);
                        const active = idx === activeIndex;
                        const locked = idx > 0 && !completedIds.has(lesson.exercises[idx - 1].id);
                        return (
                          <button
                            key={ex.id}
                            type="button"
                            disabled={locked}
                            onClick={() => {
                              if (!locked) setActiveIndex(idx);
                            }}
                            className={cn(
                              "flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors sm:min-h-0 sm:py-1.5",
                              active
                                ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                                : done
                                  ? "border-[var(--brand)]/40 bg-[var(--brand)]/10 text-[var(--brand-2)]"
                                  : locked
                                    ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                            )}
                          >
                            {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                            {idx + 1}. {ex.focusCommand}
                          </button>
                        );
                      })}
                    </div>

                    {activeExercise ? (
                      <>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className="bg-violet-700 text-white">
                              {activeExercise.focusCommand}
                            </Badge>
                            <p className="text-sm font-semibold text-slate-900">
                              {activeExercise.title}
                            </p>
                          </div>
                          <p className="mt-2 text-sm font-medium text-violet-900">
                            {activeExercise.commandExplain}
                          </p>
                          <p className="mt-2 text-sm text-slate-600">{activeExercise.goal}</p>
                          {activeExercise.hint ? (
                            <p className="mt-2 text-xs text-slate-500">Hint: {activeExercise.hint}</p>
                          ) : null}
                          {activeExercise.previewOutput ? (
                            <pre className="mt-3 rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-100">
                              {activeExercise.previewOutput}
                            </pre>
                          ) : null}
                        </div>

                        {activeExercise.runtimeInputs?.map((input) => (
                          <div key={input.key} className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600">{input.label}</label>
                            <Input
                              value={runtime[input.key] ?? ""}
                              placeholder={input.placeholder}
                              onChange={(e) =>
                                setRuntime((prev) => ({ ...prev, [input.key]: e.target.value }))
                              }
                            />
                          </div>
                        ))}

                        <PythonExerciseEditor
                          value={activeCode}
                          onChange={setActiveCode}
                          autoClearBlanks
                          starterCode={activeExercise.starterCode}
                          typingZones={typingZones}
                          ariaLabel={`Python exercise ${activeIndex + 1}`}
                          placeholder="Type your Python here…"
                          minHeightPx={140}
                          maxHeightPx={360}
                          readOnly={lessonComplete}
                        />

                        <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap">
                          <Button
                            type="button"
                            className="min-h-11 w-full sm:w-auto"
                            onClick={handleRunExercise}
                            disabled={lessonComplete}
                          >
                            <Play className="h-4 w-4" />
                            Run &amp; check
                          </Button>
                          {canAdvance ? (
                            <Button
                              key={`next-${activeExercise.id}`}
                              type="button"
                              size="lg"
                              className="kanam-data-next-exercise-btn min-h-11 w-full shadow-md sm:w-auto"
                              onClick={goToNextExercise}
                            >
                              Next exercise
                              <ChevronRight className="kanam-data-next-chevron h-4 w-4" />
                            </Button>
                          ) : null}
                          <Button
                            type="button"
                            variant="outline"
                            className="min-h-11 w-full sm:w-auto"
                            onClick={() =>
                              setActiveCode(prepareExerciseCode(activeExercise.starterCode))
                            }
                            disabled={lessonComplete}
                          >
                            Reset
                          </Button>
                        </div>

                        {lastFeedback ? (
                          lastFeedbackSuccess ? (
                            <div
                              key={`success-${activeExercise.id}`}
                              className="kanam-data-success-banner"
                              role="status"
                            >
                              <CheckCircle2 className="kanam-data-success-icon" aria-hidden />
                              <div>
                                <p className="kanam-data-success-title">Success!</p>
                                <p className="kanam-data-success-body">{lastFeedback}</p>
                                {canAdvance ? (
                                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[var(--brand)]">
                                    Ready for the next exercise →
                                  </p>
                                ) : lessonComplete ? (
                                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[var(--brand)]">
                                    You finished the whole lesson!
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          ) : (
                            <p
                              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
                              role="alert"
                            >
                              {lastFeedback}
                            </p>
                          )
                        ) : null}

                        {terminalOutput ? (
                          <div>
                            <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">
                              <Terminal className="h-3.5 w-3.5" />
                              Console output
                            </p>
                            <pre
                              className={cn(
                                "kanam-hide-scrollbar overflow-auto rounded-xl p-4 font-mono text-xs",
                                lastFeedbackSuccess
                                  ? "kanam-data-terminal-success text-emerald-100"
                                  : "bg-slate-900 text-emerald-100"
                              )}
                            >
                              {terminalOutput}
                            </pre>
                          </div>
                        ) : null}

                        {runError ? <p className="text-sm text-red-600">{runError}</p> : null}
                      </>
                    ) : null}
                  </CardContent>
                </Card>

                {lessonComplete ? (
                  <Card className="kanam-data-lesson-complete overflow-hidden border-0">
                    <CardContent className="py-8 text-center">
                      <span className="kanam-data-lesson-complete-emoji" aria-hidden>
                        🎉
                      </span>
                      <div className="mt-3 flex items-center justify-center gap-2">
                        <Trophy className="h-6 w-6 text-[var(--accent)]" aria-hidden />
                        <p className="text-2xl font-black tracking-tight text-slate-900">
                          Lesson complete!
                        </p>
                        <PartyPopper className="h-6 w-6 text-[var(--brand)]" aria-hidden />
                      </div>
                      <p className="mt-3 text-base font-semibold text-[var(--brand-2)]">
                        You earned {lesson.xpReward} XP
                      </p>
                      <Badge className="mt-3 bg-[var(--brand)] px-4 py-1.5 text-sm text-white">
                        {lesson.badge}
                      </Badge>
                      {lesson.tryThis.length > 0 ? (
                        <ul className="mt-4 space-y-1 text-left text-sm text-slate-600">
                          {lesson.tryThis.map((tip) => (
                            <li key={tip}>• {tip}</li>
                          ))}
                        </ul>
                      ) : null}
                      {lesson.nextHref ? (
                        <Button asChild className="mt-5 shadow-md" size="lg">
                          <Link href={lesson.nextHref}>Next lesson</Link>
                        </Button>
                      ) : (
                        <Button asChild className="mt-5 shadow-md" size="lg" variant="secondary">
                          <Link href={lesson.dashboardHref ?? "/dashboard"}>Back to dashboard</Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : null}
              </>
            )}
          </div>
        </div>
        )}
      </div>
    </WelcomeBackground>
    </LessonAccessGate>
  );
}
