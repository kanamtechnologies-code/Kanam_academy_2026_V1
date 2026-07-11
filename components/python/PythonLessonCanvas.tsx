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
  MessageCircle,
  Play,
  Sparkles,
  Terminal,
  Trophy,
  Zap,
} from "lucide-react";

import { PredictionInput } from "@/components/exercises/PredictionInput";
import { ParsonsLines } from "@/components/exercises/ParsonsLines";
import { GuestLessonTour } from "@/components/demo/GuestLessonTour";
import { LessonModule, type LessonModuleData } from "@/components/data/LessonModule";
import { LessonAside } from "@/components/lesson/LessonAside";
import { LessonAccessGate } from "@/components/lesson/LessonAccessGate";
import { AdventurePlayPanel } from "@/components/python/AdventurePlayPanel";
import { CoachNoteContent } from "@/components/python/CoachNoteContent";
import { PythonExerciseEditor } from "@/components/python/PythonExerciseEditor";
import { PremiumBadge } from "@/components/badges/PremiumBadge";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { predictionSoftMatches } from "@/lib/exercises/normalizePrediction";
import { canPlayAdventure } from "@/lib/pythonLessons/adventurePlay";
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

export type PythonExerciseKind = "fill" | "predict" | "debug" | "scratch" | "parsons";

export type PythonProjectRequirement = {
  id: string;
  label: string;
  /** Checked after each successful Run — powers the live project checklist. */
  check: (code: string, run: MiniRunResult) => boolean;
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
  /** @deprecated Unused — input() uses a silent default in the runner. */
  runtimeInputs?: PythonRuntimeInput[];
  previewOutput?: string;
  /** Defaults to "fill". Prefer debug / scratch / parsons / predict over fill. */
  kind?: PythonExerciseKind;
  /** Predict exercises: question shown above the free-text box. */
  predictionPrompt?: string;
  /** Accepted free-text answers (normalized). Soft-matched against stdout if omitted and validate passes. */
  acceptedPredictions?: string[];
  /** When true, editor is read-only (typical for predict). */
  codeReadOnly?: boolean;
  /** Debug: short category hint (typo / logic / indent) — not the full fix. */
  debugHint?: string;
  /** Parsons: scrambled lines the learner must reorder (correct order). */
  parsonsLines?: string[];
  /**
   * Optional correct solution used only by TEMP test auto-pass.
   * Remove usages when shipping.
   */
  solutionCode?: string;
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
  /**
   * Capstone / big-project mode: one workspace + live requirements checklist
   * instead of a multi-exercise drill sequence.
   */
  project?: {
    missionTitle: string;
    timeLabel: string;
    requirements: PythonProjectRequirement[];
  };
  lessonModule?: LessonModuleData;
  terminalPrompt?: string;
  prevHref?: string;
  nextHref?: string;
  dashboardHref?: string;
  coachNoteGateSeconds?: number;
  /** When true, guest demo tour can spotlight this canvas. */
  guidedTour?: boolean;
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

  const [predictionByExercise, setPredictionByExercise] = React.useState<Record<string, string>>({});
  const [projectChecks, setProjectChecks] = React.useState<Record<string, boolean>>({});
  const [playTurns, setPlayTurns] = React.useState(0);
  const [projectWorkspace, setProjectWorkspace] = React.useState<"build" | "play">("build");
  const isProject = Boolean(lesson.project);

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
    const kind = activeExercise.kind ?? "fill";
    trackProgress("run", { exerciseId: activeExercise.id, kind });

    if (kind === "predict") {
      const prediction = (predictionByExercise[activeExercise.id] ?? "").trim();
      if (!prediction) {
        setRunError(null);
        setLastFeedbackSuccess(false);
        setLastFeedback("Type your prediction before you run.");
        setTerminalOutput(
          formatPythonTerminal("❌ Make a prediction first, then Run & check.", terminalPrompt)
        );
        return;
      }
    }

    if (hasBlankTokens(activeCode) && kind !== "predict") {
      setRunError(null);
      setLastFeedbackSuccess(false);
      setLastFeedback("Fill in every blank before running.");
      setTerminalOutput(formatPythonTerminal("❌ Fill in every blank first.", terminalPrompt));
      return;
    }

    if (hasBlankTokens(activeCode) && kind === "predict") {
      setRunError(null);
      setLastFeedbackSuccess(false);
      setLastFeedback("This predict exercise still has blanks — ask your teacher to fix the lesson.");
      setTerminalOutput(formatPythonTerminal("❌ Predict code should not contain blanks.", terminalPrompt));
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

    const run = runMiniPython(activeCode, {});
    if (run.error) {
      setRunError(run.error);
      setLastFeedbackSuccess(false);
      setLastFeedback(
        kind === "debug"
          ? `${activeExercise.failureMessage}${activeExercise.debugHint ? ` Hint category: ${activeExercise.debugHint}.` : ""}`
          : activeExercise.failureMessage
      );
      setTerminalOutput(formatPythonTerminal(`❌ ${run.error}`, terminalPrompt));
      return;
    }

    setRunError(null);
    const body =
      run.stdout.length > 0
        ? run.stdout.join("\n")
        : "(no output)\nTip: add print(...) to see output.";

    if (lesson.project?.requirements?.length) {
      const nextChecks: Record<string, boolean> = {};
      for (const req of lesson.project.requirements) {
        try {
          nextChecks[req.id] =
            req.id === "req-play" ? playTurns >= 3 : req.check(activeCode, run);
        } catch {
          nextChecks[req.id] = req.id === "req-play" ? playTurns >= 3 : false;
        }
      }
      setProjectChecks(nextChecks);

      const allGreen = lesson.project.requirements.every((req) => nextChecks[req.id]);
      if (allGreen) {
        setLastFeedbackSuccess(true);
        setLastFeedback(activeExercise.successMessage);
        setTerminalOutput(
          formatPythonTerminal(`✓ ${activeExercise.successMessage}\n\n${body}`, terminalPrompt)
        );
        setCompletedIds((prev) => new Set(prev).add(activeExercise.id));
        setLessonComplete(true);
        trackProgress("lesson_success", { exerciseId: activeExercise.id, kind: "project" });
        return;
      }
    }

    const codeOk = activeExercise.validate(activeCode, run, {});

    if (kind === "predict") {
      const prediction = predictionByExercise[activeExercise.id] ?? "";
      const accepted =
        activeExercise.acceptedPredictions && activeExercise.acceptedPredictions.length > 0
          ? activeExercise.acceptedPredictions
          : run.stdout.length > 0
            ? [run.stdout.join("\n")]
            : [];
      const predOk = predictionSoftMatches(prediction, accepted);

      if (!codeOk) {
        setLastFeedbackSuccess(false);
        setLastFeedback(activeExercise.failureMessage);
        setTerminalOutput(formatPythonTerminal(`❌ ${activeExercise.failureMessage}\n\n${body}`, terminalPrompt));
        return;
      }
      if (!predOk) {
        setLastFeedbackSuccess(false);
        setLastFeedback(
          "Not quite — your prediction doesn't match what the program does. Revise your prediction (the real output stays hidden until you get it)."
        );
        setTerminalOutput(
          formatPythonTerminal(
            `△ Prediction incorrect.\nYour prediction: ${prediction}\n(Output hidden until your prediction is right.)`,
            terminalPrompt
          )
        );
        return;
      }
      setLastFeedbackSuccess(true);
      setLastFeedback(activeExercise.successMessage);
      setTerminalOutput(
        formatPythonTerminal(`✓ ${activeExercise.successMessage}\n\n${body}`, terminalPrompt)
      );
      setCompletedIds((prev) => new Set(prev).add(activeExercise.id));
      if (activeIndex === lesson.exercises.length - 1) {
        setLessonComplete(true);
        trackProgress("lesson_success", { exerciseId: activeExercise.id, kind });
      }
      return;
    }

    if (codeOk) {
      // Project mode: only finish when the full checklist (incl. Adventure play) is green.
      if (isProject && lesson.project) {
        const playOk = playTurns >= 3 || Boolean(projectChecks["req-play"]);
        const buildOk = lesson.project.requirements
          .filter((r) => r.id !== "req-play")
          .every((r) => {
            try {
              return r.id === "req-play" ? playOk : r.check(activeCode, run);
            } catch {
              return false;
            }
          });
        if (!(buildOk && playOk)) {
          setLastFeedbackSuccess(false);
          setLastFeedback(
            playOk
              ? activeExercise.failureMessage
              : "Build looks good — now open Adventure and play at least 3 live turns to finish the capstone."
          );
          setTerminalOutput(
            formatPythonTerminal(
              playOk
                ? `△ Almost — finish every checklist item.\n\n${body}`
                : `✓ Build checks passed!\n→ Switch to Adventure and chat with your bot (3+ turns).\n\n${body}`,
              terminalPrompt
            )
          );
          return;
        }
      }

      setLastFeedbackSuccess(true);
      setLastFeedback(activeExercise.successMessage);
      setTerminalOutput(formatPythonTerminal(`✓ ${activeExercise.successMessage}\n\n${body}`, terminalPrompt));
      setCompletedIds((prev) => new Set(prev).add(activeExercise.id));

      if (activeIndex === lesson.exercises.length - 1) {
        setLessonComplete(true);
        trackProgress("lesson_success", { exerciseId: activeExercise.id, kind });
      }
    } else {
      setLastFeedbackSuccess(false);
      setLastFeedback(
        kind === "debug"
          ? `${activeExercise.failureMessage}${activeExercise.debugHint ? ` Hint category: ${activeExercise.debugHint}.` : ""}`
          : activeExercise.failureMessage
      );
      setTerminalOutput(formatPythonTerminal(`❌ ${activeExercise.failureMessage}\n\n${body}`, terminalPrompt));
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

  const handlePlayTurnsChange = (turns: number) => {
    setPlayTurns(turns);
    if (!lesson.project?.requirements?.length) return;

    setProjectChecks((prev) => {
      const next: Record<string, boolean> = { ...prev, "req-play": turns >= 3 };
      // Re-check build items against current code without requiring a fresh Run.
      const dry = runMiniPython(activeCode, {});
      for (const req of lesson.project!.requirements) {
        if (req.id === "req-play") continue;
        try {
          next[req.id] = req.check(activeCode, dry);
        } catch {
          // keep previous
        }
      }
      const allGreen = lesson.project!.requirements.every((req) => next[req.id]);
      if (allGreen && activeExercise && !lessonComplete) {
        setCompletedIds((p) => new Set(p).add(activeExercise.id));
        setLessonComplete(true);
        setLastFeedbackSuccess(true);
        setLastFeedback(activeExercise.successMessage);
        trackProgress("lesson_success", { exerciseId: activeExercise.id, kind: "project-play" });
      }
      return next;
    });
  };

  /** TEMP testing helper — remove before shipping. */
  const tempPassCurrentExercise = () => {
    if (!activeExercise || lessonComplete) return;
    const id = activeExercise.id;
    if (activeExercise.kind === "predict") {
      const answer = activeExercise.acceptedPredictions?.[0] ?? "ok";
      setPredictionByExercise((prev) => ({ ...prev, [id]: answer }));
    }
    if (activeExercise.solutionCode) {
      setCodeByExercise((prev) => ({ ...prev, [id]: activeExercise.solutionCode! }));
    }
    if (lesson.project?.requirements?.length) {
      const allGreen: Record<string, boolean> = {};
      for (const req of lesson.project.requirements) allGreen[req.id] = true;
      setProjectChecks(allGreen);
      setPlayTurns(3);
    }
    setCompletedIds((prev) => new Set(prev).add(id));
    setLastFeedbackSuccess(true);
    setLastFeedback(`[TEMP] Passed: ${activeExercise.successMessage}`);
    setTerminalOutput(
      formatPythonTerminal(`✓ [TEMP] Auto-passed ${activeExercise.title}`, terminalPrompt)
    );
    if (activeIndex === lesson.exercises.length - 1) {
      setLessonComplete(true);
      trackProgress("lesson_success", { exerciseId: id, kind: "temp-pass" });
    } else {
      goToNextExercise();
    }
  };

  /** TEMP testing helper — remove before shipping. */
  const tempPassAllRemaining = () => {
    if (lessonComplete) return;
    const nextCompleted = new Set(completedIds);
    const nextPredictions = { ...predictionByExercise };
    const nextCode = { ...codeByExercise };
    for (const ex of lesson.exercises) {
      nextCompleted.add(ex.id);
      if (ex.kind === "predict" && ex.acceptedPredictions?.[0]) {
        nextPredictions[ex.id] = ex.acceptedPredictions[0];
      }
      if (ex.solutionCode) nextCode[ex.id] = ex.solutionCode;
    }
    setCompletedIds(nextCompleted);
    setPredictionByExercise(nextPredictions);
    setCodeByExercise(nextCode);
    setActiveIndex(Math.max(0, lesson.exercises.length - 1));
    setLessonComplete(true);
    if (lesson.project?.requirements?.length) {
      const allGreen: Record<string, boolean> = {};
      for (const req of lesson.project.requirements) allGreen[req.id] = true;
      setProjectChecks(allGreen);
      setPlayTurns(3);
    }
    setLastFeedbackSuccess(true);
    setLastFeedback("[TEMP] All exercises auto-passed.");
    trackProgress("lesson_success", { kind: "temp-pass-all" });
  };

  const progressPercent = lessonComplete
    ? 100
    : isProject && lesson.project
      ? Math.round(
          (Object.values(projectChecks).filter(Boolean).length /
            Math.max(1, lesson.project.requirements.length)) *
            100
        )
      : Math.round((completedIds.size / Math.max(1, lesson.exercises.length)) * 100);

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

  const exitHref = lesson.dashboardHref ?? "/dashboard";
  const exitLabel =
    exitHref === "/welcome" || exitHref === "/demo" || exitHref === "/demo/complete"
      ? "Exit demo"
      : "Dashboard";

  return (
    <LessonAccessGate lessonId={lesson.id}>
    <WelcomeBackground>
      {lesson.guidedTour ? <GuestLessonTour onRequestView={setView} /> : null}
      <div
        className={cn(
          "mx-auto max-w-[1400px] transition-all duration-300",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        <div
          data-tour="lesson-hero"
          className="kanam-lesson-hero mb-6 rounded-[22px] p-4 sm:mb-8 sm:rounded-[28px] sm:p-6 md:p-8"
        >
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
              <PremiumBadge lessonId={lesson.id} name={lesson.badge} variant="chip" />
              <Button asChild className="kanam-hero-cta" size="sm">
                <Link href={exitHref}>{exitLabel}</Link>
              </Button>
            </div>
          </div>
          <div className="relative z-10 mt-6">
            <div className="mb-2 flex justify-between text-sm font-semibold text-white/90">
              <span>
                {isProject
                  ? `Project checklist: ${Object.values(projectChecks).filter(Boolean).length} / ${lesson.project?.requirements.length ?? 0}`
                  : `Exercises complete: ${completedIds.size} / ${lesson.exercises.length}`}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2.5 bg-white/25" indicatorClassName="bg-white" />
          </div>
        </div>

        {lesson.lessonModule ? (
          <div
            data-tour="lesson-tabs"
            className="mb-6 inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm"
          >
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
              {isProject ? "Capstone project" : "Exercises"}
            </button>
          </div>
        ) : null}

        {lesson.lessonModule && view === "lesson" ? (
          <div data-tour="lesson-module">
            <LessonModule
              module={lesson.lessonModule}
              onStart={() => setView("exercises")}
              startLabel={isProject ? "Start the project" : "Start the exercises"}
            />
          </div>
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

            {isProject && lesson.project ? (
              <LessonAside
                title="Project checklist"
                defaultOpen
                icon={<Trophy className="h-5 w-5 text-[var(--accent)]" />}
                className="border-[rgb(var(--accent-rgb)/0.55)] bg-amber-50/40"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-900">
                  {lesson.project.timeLabel}
                </p>
                <ul className="space-y-2">
                  {lesson.project.requirements.map((req) => {
                    const done = Boolean(projectChecks[req.id]);
                    return (
                      <li
                        key={req.id}
                        className={cn(
                          "flex items-start gap-2 rounded-lg border px-3 py-2 text-sm",
                          done
                            ? "border-emerald-300 bg-emerald-50 text-emerald-950"
                            : "border-slate-200 bg-white text-slate-700"
                        )}
                      >
                        <CheckCircle2
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            done ? "text-emerald-600" : "text-slate-300"
                          )}
                        />
                        <span>{req.label}</span>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 text-xs text-slate-500">
                  Work in order 1–8. Use <strong>Build</strong> + Run for items 1–7, then{" "}
                  <strong>Adventure</strong> for item 8 (3+ live chat turns).
                </p>
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
                <Card data-tour="lesson-exercise" className="border-slate-300 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Code2 className="h-5 w-5 text-[var(--brand)]" />
                      Python workspace
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isProject && lesson.project ? (
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
                          <p className="text-xs font-black uppercase tracking-wide text-amber-900">
                            Capstone mission · {lesson.project.timeLabel}
                          </p>
                          <p className="mt-1 text-lg font-black tracking-tight text-slate-900">
                            {lesson.project.missionTitle}
                          </p>
                          <p className="mt-2 text-sm text-slate-700">
                            {activeExercise?.commandExplain}
                          </p>
                          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-700">
                            <li>
                              Fill the <strong>design comments</strong> at the top of the code.
                            </li>
                            <li>
                              Replace every <strong>TODO</strong> — each rule needs{" "}
                              <code className="rounded bg-white/80 px-1">print</code> +{" "}
                              <code className="rounded bg-white/80 px-1">append</code>.
                            </li>
                            <li>
                              Press <strong>Run &amp; check</strong> until items 1–7 are green.
                            </li>
                            <li>
                              Open <strong>Adventure</strong> and send 3+ real messages (item 8).
                            </li>
                          </ol>
                        </div>
                        <div className="inline-flex w-full items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1 sm:w-auto">
                          <button
                            type="button"
                            onClick={() => setProjectWorkspace("build")}
                            className={cn(
                              "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors sm:flex-none",
                              projectWorkspace === "build"
                                ? "bg-[var(--brand)] text-white shadow-sm"
                                : "text-slate-600 hover:bg-white"
                            )}
                          >
                            <Code2 className="h-4 w-4" />
                            Build
                          </button>
                          <button
                            type="button"
                            onClick={() => setProjectWorkspace("play")}
                            className={cn(
                              "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors sm:flex-none",
                              projectWorkspace === "play"
                                ? "bg-violet-700 text-white shadow-sm"
                                : "text-slate-600 hover:bg-white"
                            )}
                          >
                            <MessageCircle className="h-4 w-4" />
                            Adventure
                            {playTurns > 0 ? (
                              <Badge className="bg-white/20 text-[10px] text-white">
                                {playTurns} turn{playTurns === 1 ? "" : "s"}
                              </Badge>
                            ) : null}
                          </button>
                        </div>
                      </div>
                    ) : (
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
                    )}

                    {isProject && projectWorkspace === "play" ? (
                      <AdventurePlayPanel
                        code={activeCode}
                        playReady={canPlayAdventure(activeCode)}
                        onPlayTurnsChange={handlePlayTurnsChange}
                      />
                    ) : activeExercise ? (
                      <>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          {!isProject ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge className="bg-violet-700 text-white">
                                {activeExercise.focusCommand}
                              </Badge>
                              {(activeExercise.kind ?? "fill") === "predict" ? (
                                <Badge className="bg-violet-100 text-violet-900">Predict</Badge>
                              ) : null}
                              {(activeExercise.kind ?? "fill") === "debug" ? (
                                <Badge className="bg-amber-100 text-amber-900">Debug</Badge>
                              ) : null}
                              {(activeExercise.kind ?? "fill") === "parsons" ? (
                                <Badge className="bg-indigo-100 text-indigo-900">Reorder</Badge>
                              ) : null}
                              {(activeExercise.kind ?? "fill") === "scratch" ? (
                                <Badge className="bg-emerald-100 text-emerald-900">Build</Badge>
                              ) : null}
                              <p className="text-sm font-semibold text-slate-900">
                                {activeExercise.title}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm font-semibold text-slate-900">
                              {activeExercise.title}
                            </p>
                          )}
                          {!isProject ? (
                            <p className="mt-2 text-sm font-medium text-violet-900">
                              {activeExercise.commandExplain}
                            </p>
                          ) : null}
                          <p className="mt-2 text-sm text-slate-600">{activeExercise.goal}</p>
                          {activeExercise.hint ? (
                            <p className="mt-2 text-xs text-slate-500">Hint: {activeExercise.hint}</p>
                          ) : null}
                          {activeExercise.debugHint && (activeExercise.kind ?? "fill") === "debug" ? (
                            <p className="mt-2 text-xs font-semibold text-amber-800">
                              Bug category: {activeExercise.debugHint}
                            </p>
                          ) : null}
                          {activeExercise.previewOutput ? (
                            <pre className="mt-3 rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-100">
                              {activeExercise.previewOutput}
                            </pre>
                          ) : null}
                        </div>

                        {(activeExercise.kind ?? "fill") === "predict" ? (
                          <PredictionInput
                            prompt={
                              activeExercise.predictionPrompt ??
                              "What will this program print when it runs?"
                            }
                            value={predictionByExercise[activeExercise.id] ?? ""}
                            onChange={(value) =>
                              setPredictionByExercise((prev) => ({
                                ...prev,
                                [activeExercise.id]: value,
                              }))
                            }
                            disabled={lessonComplete || currentDone}
                          />
                        ) : null}

                        {(activeExercise.kind ?? "fill") === "parsons" &&
                        activeExercise.parsonsLines?.length ? (
                          <ParsonsLines
                            lines={activeExercise.parsonsLines}
                            disabled={lessonComplete || currentDone}
                            languageLabel="Python lines"
                            onAssembledChange={(code) => {
                              setCodeByExercise((prev) => ({
                                ...prev,
                                [activeExercise.id]: code,
                              }));
                            }}
                          />
                        ) : (
                          <div data-tour="lesson-editor">
                            <PythonExerciseEditor
                              value={activeCode}
                              onChange={setActiveCode}
                              autoClearBlanks
                              starterCode={activeExercise.starterCode}
                              typingZones={
                                activeExercise.codeReadOnly ||
                                (activeExercise.kind ?? "fill") === "predict" ||
                                (activeExercise.kind ?? "fill") === "scratch"
                                  ? []
                                  : typingZones
                              }
                              ariaLabel={`Python exercise ${activeIndex + 1}`}
                              placeholder={
                                (activeExercise.kind ?? "fill") === "scratch"
                                  ? "Write the full program here…"
                                  : "Type your Python here…"
                              }
                              minHeightPx={isProject ? 280 : 140}
                              maxHeightPx={isProject ? 520 : 360}
                              readOnly={
                                lessonComplete ||
                                Boolean(activeExercise.codeReadOnly) ||
                                (activeExercise.kind ?? "fill") === "predict"
                              }
                            />
                          </div>
                        )}

                        <div
                          data-tour="lesson-run"
                          className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap"
                        >
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

                        <div data-tour="lesson-terminal">
                          <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">
                            <Terminal className="h-3.5 w-3.5" />
                            Console output
                          </p>
                          <pre
                            className={cn(
                              "kanam-hide-scrollbar min-h-[4.5rem] overflow-auto rounded-xl p-4 font-mono text-xs",
                              terminalOutput
                                ? lastFeedbackSuccess
                                  ? "kanam-data-terminal-success text-emerald-100"
                                  : "bg-slate-900 text-emerald-100"
                                : "bg-slate-900 text-slate-500"
                            )}
                          >
                            {terminalOutput || "Press Run & check to see output here."}
                          </pre>
                        </div>

                        {runError ? <p className="text-sm text-red-600">{runError}</p> : null}
                      </>
                    ) : null}
                  </CardContent>
                </Card>

                {lessonComplete ? (
                  <Card className="kanam-data-lesson-complete overflow-hidden border-0">
                    <CardContent className="py-8 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand)]/10">
                        <Trophy className="h-7 w-7 text-[var(--accent)]" aria-hidden />
                      </div>
                      <div className="mt-3 flex items-center justify-center gap-2">
                        <p className="text-2xl font-black tracking-tight text-slate-900">
                          Lesson complete!
                        </p>
                      </div>
                      <p className="mt-3 text-base font-semibold text-[var(--brand-2)]">
                        You earned {lesson.xpReward} XP
                      </p>
                      <div className="mt-4 flex justify-center">
                        <PremiumBadge
                          lessonId={lesson.id}
                          name={lesson.badge}
                          variant="seal"
                          unlocked
                        />
                      </div>
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

      {/* TEMP: testing skip controls — delete this block later */}
      {view === "exercises" && !lessonComplete ? (
        <div className="fixed bottom-4 right-4 z-[80] flex max-w-[min(100vw-2rem,20rem)] flex-col gap-2 rounded-2xl border-2 border-dashed border-orange-400 bg-orange-50 p-3 shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-wide text-orange-800">
            Temp test controls — remove later
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-10 border-orange-300 bg-white text-orange-950 hover:bg-orange-100"
            onClick={tempPassCurrentExercise}
          >
            Pass current exercise
          </Button>
          <Button
            type="button"
            size="sm"
            className="h-10 bg-orange-500 text-white hover:bg-orange-600"
            onClick={tempPassAllRemaining}
          >
            Pass all remaining
          </Button>
        </div>
      ) : null}
    </WelcomeBackground>
    </LessonAccessGate>
  );
}
