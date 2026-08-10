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

import { ExerciseHint } from "@/components/exercises/ExerciseHint";
import { PredictionInput } from "@/components/exercises/PredictionInput";
import { ParsonsLines } from "@/components/exercises/ParsonsLines";
import { GuestLessonTour } from "@/components/demo/GuestLessonTour";
import { LessonModule, type LessonModuleData } from "@/components/data/LessonModule";
import { LessonAside } from "@/components/lesson/LessonAside";
import {
  FinishLessonFirstHint,
  finishLessonTabClassName,
  useFinishLessonFirstNudge,
} from "@/components/lesson/FinishLessonFirstNudge";
import {
  MobileLessonPocket,
  type MobileLessonPocketPanel,
} from "@/components/lesson/MobileLessonPocket";
import { LessonAccessGate } from "@/components/lesson/LessonAccessGate";
import { dashboardHrefForLesson } from "@/lib/billing/access";
import { AdventurePlayPanel } from "@/components/python/AdventurePlayPanel";
import { CoachNoteContent } from "@/components/python/CoachNoteContent";
import { PythonExerciseEditor } from "@/components/python/PythonExerciseEditor";
import { PremiumBadge } from "@/components/badges/PremiumBadge";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumBulletList } from "@/components/ui/PremiumBulletList";
import { Progress } from "@/components/ui/progress";
import {
  readLessonModuleUnlocked,
  writeLessonModuleUnlocked,
} from "@/lib/lessonModuleUnlock";
import type { PublicPythonLessonConfig } from "@/lib/lessons/publicPythonLesson";
import type { PythonCheckResponse } from "@/lib/lessons/pythonCheckTypes";
import { canPlayAdventure } from "@/lib/pythonLessons/adventurePlay";
import { coachPythonExerciseFeedback } from "@/lib/pythonExerciseCoach";
import { runMiniPython } from "@/lib/pythonRunner";
import {
  findTypingZonesForExercise,
  hasBlankTokens,
  selectionForIncompleteCode,
} from "@/lib/pythonStarter";
import { formatPythonTerminal, PYTHON_TERMINAL_PROMPT } from "@/lib/pythonTerminal";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isGuestMode, markGuestLessonComplete } from "@/lib/guestProgress";
import { useLessonHeartbeat } from "@/lib/progress/useLessonHeartbeat";
import { writeProgressEvent } from "@/lib/progress/writeProgress";
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
  /**
   * Server-only grader. Never sent to the browser — use /api/student/lessons/[id]/check.
   */
  check?: (code: string, run: import("@/lib/pythonRunner").MiniRunResult) => boolean;
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
  /** Server-only accepted answers — stripped from public lesson payloads. */
  acceptedPredictions?: string[];
  /** Client hint that a prediction answer key exists server-side. */
  hasAcceptedPredictions?: boolean;
  /** When true, editor is read-only (typical for predict). */
  codeReadOnly?: boolean;
  /** Debug: short category hint (typo / logic / indent) — not the full fix. */
  debugHint?: string;
  /** Parsons: scrambled lines the learner must reorder (correct order). */
  parsonsLines?: string[];
  /** Server-only solution — stripped from public lesson payloads. */
  solutionCode?: string;
  /**
   * Server-only grader. Never sent to the browser — use /api/student/lessons/[id]/check.
   */
  validate?: (
    code: string,
    run: import("@/lib/pythonRunner").MiniRunResult,
    runtime?: Record<string, string>
  ) => boolean;
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
  /** Label for the post-completion next button (defaults to "Next lesson"). */
  nextCtaLabel?: string;
};

async function postPythonCheck(
  lessonId: string,
  body: Record<string, unknown>
): Promise<PythonCheckResponse | null> {
  try {
    const res = await fetch(`/api/student/lessons/${encodeURIComponent(lessonId)}/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json()) as PythonCheckResponse & { error?: string };
    if (!res.ok) return null;
    return json;
  } catch {
    return null;
  }
}

export function PythonLessonCanvas({
  lesson,
}: {
  lesson: PythonLessonConfig | PublicPythonLessonConfig;
}) {
  const terminalPrompt = lesson.terminalPrompt ?? PYTHON_TERMINAL_PROMPT;

  const [animateIn, setAnimateIn] = React.useState(false);
  const [view, setView] = React.useState<"lesson" | "exercises">(
    lesson.lessonModule ? "lesson" : "exercises"
  );
  /** True after finishing the slide deck (or restored from a prior completion). */
  const [lessonUnlocked, setLessonUnlocked] = React.useState(() =>
    lesson.lessonModule ? false : true
  );
  /** Demo tour may preview the Exercises tab before the deck is finished. */
  const [tourPreviewExercises, setTourPreviewExercises] = React.useState(false);
  const { nudgeActive, triggerNudge } = useFinishLessonFirstNudge();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [codeByExercise, setCodeByExercise] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(lesson.exercises.map((ex) => [ex.id, ex.starterCode]))
  );
  const [completedIds, setCompletedIds] = React.useState<Set<string>>(() => new Set());
  const [lastFeedback, setLastFeedback] = React.useState("");
  const [lastFeedbackSuccess, setLastFeedbackSuccess] = React.useState(false);
  const [terminalOutput, setTerminalOutput] = React.useState("");
  /** Bumps on every Run & check so retry UI re-pulses even when the message is unchanged. */
  const [checkPulseKey, setCheckPulseKey] = React.useState(0);
  const [isChecking, setIsChecking] = React.useState(false);
  const feedbackAnchorRef = React.useRef<HTMLDivElement | null>(null);
  const checkBusyTimerRef = React.useRef<number | null>(null);
  const [lessonComplete, setLessonComplete] = React.useState(false);

  const [deviceId, setDeviceId] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [studentDbId, setStudentDbId] = React.useState("");

  const activeExercise = lesson.exercises[activeIndex];
  const activeCode = codeByExercise[activeExercise?.id ?? ""] ?? "";

  const [predictionByExercise, setPredictionByExercise] = React.useState<Record<string, string>>({});
  const [exerciseResetToken, setExerciseResetToken] = React.useState(0);
  const [lessonModuleResetKey, setLessonModuleResetKey] = React.useState(0);
  const [tourActive, setTourActive] = React.useState(false);
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
    return () => {
      if (checkBusyTimerRef.current != null) window.clearTimeout(checkBusyTimerRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!lesson.lessonModule) {
      setLessonUnlocked(true);
      return;
    }
    const unlocked = readLessonModuleUnlocked(lesson.id);
    setLessonUnlocked(unlocked);
    const requested = new URLSearchParams(window.location.search).get("view");
    if (requested === "exercises" && unlocked) {
      setView("exercises");
    } else if (requested === "lesson" || requested === "exercises") {
      setView("lesson");
    }
  }, [lesson.lessonModule, lesson.id]);

  const openExercises = React.useCallback(() => {
    writeLessonModuleUnlocked(lesson.id);
    setLessonUnlocked(true);
    setTourPreviewExercises(false);
    setView("exercises");
  }, [lesson.id]);

  const requestView = React.useCallback((next: "lesson" | "exercises") => {
    if (next === "exercises") {
      setTourPreviewExercises(true);
      setView("exercises");
      return;
    }
    setTourPreviewExercises(false);
    setView("lesson");
  }, []);

  const canShowExercises = lessonUnlocked || tourPreviewExercises;

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
        const ensureRes = await fetch("/api/auth/ensure-profile", { method: "POST" });
        const ensureJson = (await ensureRes.json()) as { student?: { id?: string } };
        if (ensureJson?.student?.id) {
          setStudentDbId(String(ensureJson.student.id));
          return;
        }
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

  const trackProgress = React.useCallback(
    async (eventType: string, payload?: unknown) => {
      if (isGuestMode()) {
        if (eventType === "lesson_success") markGuestLessonComplete(lesson.id);
        return;
      }
      if (!deviceId || !userId || !studentDbId) return;
      try {
        await writeProgressEvent({
          studentDbId,
          deviceId,
          lessonId: lesson.id,
          eventType,
          payload: (payload ?? {}) as Record<string, unknown>,
        });
      } catch {
        // ignore
      }
    },
    [deviceId, userId, studentDbId, lesson.id]
  );

  useLessonHeartbeat({
    studentDbId,
    deviceId,
    lessonId: lesson.id,
    enabled: Boolean(deviceId && userId && studentDbId && !isGuestMode()),
  });

  React.useEffect(() => {
    if (!deviceId || !userId || !studentDbId) return;
    trackProgress("lesson_opened");
  }, [deviceId, userId, studentDbId, trackProgress]);

  const setActiveCode = (next: string) => {
    if (!activeExercise) return;
    setCodeByExercise((prev) => ({ ...prev, [activeExercise.id]: next }));
  };

  const handleResetExercise = () => {
    if (!activeExercise || lessonComplete) return;
    setCodeByExercise((prev) => ({
      ...prev,
      [activeExercise.id]: activeExercise.starterCode,
    }));
    setPredictionByExercise((prev) => ({ ...prev, [activeExercise.id]: "" }));
    setLastFeedback("");
    setLastFeedbackSuccess(false);
    setTerminalOutput("");
    setExerciseResetToken((n) => n + 1);
  };

  const handleRunExercise = () => {
    if (!activeExercise || isChecking) return;
    const kind = activeExercise.kind ?? "fill";
    trackProgress("run", { exerciseId: activeExercise.id, kind });
    setCheckPulseKey((n) => n + 1);
    setIsChecking(true);
    if (checkBusyTimerRef.current != null) window.clearTimeout(checkBusyTimerRef.current);
    checkBusyTimerRef.current = window.setTimeout(() => {
      setIsChecking(false);
      checkBusyTimerRef.current = null;
    }, 320);
    // Keep the tip/console in view on mobile so the pulse is actually visible.
    requestAnimationFrame(() => {
      feedbackAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    if (kind === "predict") {
      const prediction = (predictionByExercise[activeExercise.id] ?? "").trim();
      if (!prediction) {
        setLastFeedbackSuccess(false);
        setLastFeedback("Type your prediction before you run.");
        setTerminalOutput(
          formatPythonTerminal("❌ Make a prediction first, then Run & check.", terminalPrompt)
        );
        return;
      }
    }

    if (hasBlankTokens(activeCode) && kind !== "predict") {
      setLastFeedbackSuccess(false);
      setLastFeedback("Fill in every blank before running.");
      setTerminalOutput(formatPythonTerminal("❌ Fill in every blank first.", terminalPrompt));
      return;
    }

    if (hasBlankTokens(activeCode) && kind === "predict") {
      setLastFeedbackSuccess(false);
      setLastFeedback("This predict exercise still has blanks — ask your teacher to fix the lesson.");
      setTerminalOutput(formatPythonTerminal("❌ Predict code should not contain blanks.", terminalPrompt));
      return;
    }

    if (activeCode.includes("Print(")) {
      setLastFeedbackSuccess(false);
      setLastFeedback(
        coachPythonExerciseFeedback({
          code: activeCode,
          runError: "Use lowercase print(...), not Print(...).",
          fallback: activeExercise.failureMessage,
        })
      );
      setTerminalOutput(
        formatPythonTerminal("❌ Python needs lowercase print(...), not Print(...).", terminalPrompt)
      );
      return;
    }

    const run = runMiniPython(activeCode, {});
    if (run.error) {
      setLastFeedbackSuccess(false);
      setLastFeedback(
        coachPythonExerciseFeedback({
          code: activeCode,
          runError: run.error,
          fallback: activeExercise.failureMessage,
        })
      );
      setTerminalOutput(formatPythonTerminal(`❌ ${run.error}`, terminalPrompt));
      return;
    }
    const body =
      run.stdout.length > 0
        ? run.stdout.join("\n")
        : "(no output)\nTip: add print(...) to see output.";

    void (async () => {
      const graded = await postPythonCheck(lesson.id, {
        exerciseId: activeExercise.id,
        code: activeCode,
        run: { stdout: run.stdout, error: run.error ?? null },
        prediction: predictionByExercise[activeExercise.id] ?? "",
        playTurns,
      });

      if (!graded) {
        setLastFeedbackSuccess(false);
        setLastFeedback("Could not verify your answer. Check your connection and try again.");
        setTerminalOutput(
          formatPythonTerminal(`❌ Could not verify your answer.\n\n${body}`, terminalPrompt)
        );
        return;
      }

      if (graded.projectChecks) setProjectChecks(graded.projectChecks);

      if (kind === "predict" && graded.codeOk && graded.predictionOk === false) {
        const prediction = predictionByExercise[activeExercise.id] ?? "";
        setLastFeedbackSuccess(false);
        setLastFeedback(graded.feedback);
        setTerminalOutput(
          formatPythonTerminal(
            `△ Prediction incorrect.\nYour prediction: ${prediction}\n(Output hidden until your prediction is right.)`,
            terminalPrompt
          )
        );
        return;
      }

      if (!graded.ok) {
        const tip = coachPythonExerciseFeedback({
          code: activeCode,
          runError: null,
          fallback: graded.feedback || activeExercise.failureMessage,
        });
        setLastFeedbackSuccess(false);
        setLastFeedback(tip);
        setTerminalOutput(
          formatPythonTerminal(`❌ ${tip}\n\n${body}`, terminalPrompt)
        );
        return;
      }

      setLastFeedbackSuccess(true);
      setLastFeedback(graded.feedback || activeExercise.successMessage);
      setTerminalOutput(
        formatPythonTerminal(
          `✓ ${graded.feedback || activeExercise.successMessage}\n\n${body}`,
          terminalPrompt
        )
      );
      setCompletedIds((prev) => new Set(prev).add(activeExercise.id));
      if (graded.lessonComplete) {
        setLessonComplete(true);
        trackProgress("lesson_success", {
          exerciseId: activeExercise.id,
          kind: isProject ? "project" : kind,
        });
      }
    })();
  };

  const workspacePanelRef = React.useRef<HTMLDivElement | null>(null);

  const goToNextExercise = () => {
    if (activeIndex < lesson.exercises.length - 1) {
      setActiveIndex((i) => i + 1);
      setLastFeedback("");
      setLastFeedbackSuccess(false);
      setTerminalOutput("");
      requestAnimationFrame(() => {
        workspacePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const handlePlayTurnsChange = (turns: number) => {
    setPlayTurns(turns);
    if (!lesson.project?.requirements?.length || !activeExercise) return;

    const dry = runMiniPython(activeCode, {});
    void (async () => {
      const graded = await postPythonCheck(lesson.id, {
        exerciseId: activeExercise.id,
        code: activeCode,
        run: { stdout: dry.stdout, error: dry.error ?? null },
        playTurns: turns,
      });
      if (!graded?.projectChecks) return;
      setProjectChecks(graded.projectChecks);
      if (graded.ok && !lessonComplete) {
        setCompletedIds((p) => new Set(p).add(activeExercise.id));
        setLessonComplete(true);
        setLastFeedbackSuccess(true);
        setLastFeedback(graded.feedback || activeExercise.successMessage);
        trackProgress("lesson_success", { exerciseId: activeExercise.id, kind: "project-play" });
      }
    })();
  };

  /** TEMP testing helper — remove before shipping. */
  const tempPassCurrentExercise = () => {
    if (!activeExercise || lessonComplete) return;
    const id = activeExercise.id;
    void (async () => {
      const dry = runMiniPython(activeCode, {});
      const graded = await postPythonCheck(lesson.id, {
        exerciseId: id,
        code: activeCode,
        run: { stdout: dry.stdout, error: dry.error ?? null },
        prediction: "ok",
        playTurns: 3,
        tempPass: true,
      });
      if (!graded?.ok) {
        setLastFeedbackSuccess(false);
        setLastFeedback("Temp pass is only available in development.");
        return;
      }
      if (graded.projectChecks) setProjectChecks(graded.projectChecks);
      setPlayTurns(3);
      setCompletedIds((prev) => new Set(prev).add(id));
      setLastFeedbackSuccess(true);
      setLastFeedback(graded.feedback);
      setTerminalOutput(
        formatPythonTerminal(`✓ [TEMP] Auto-passed ${activeExercise.title}`, terminalPrompt)
      );
      if (graded.lessonComplete) {
        setLessonComplete(true);
        trackProgress("lesson_success", { exerciseId: id, kind: "temp-pass" });
      } else {
        goToNextExercise();
      }
    })();
  };

  /** TEMP testing helper — remove before shipping. */
  const tempPassAllRemaining = () => {
    if (lessonComplete) return;
    void (async () => {
      const nextCompleted = new Set(completedIds);
      for (const ex of lesson.exercises) {
        const dry = runMiniPython(codeByExercise[ex.id] ?? ex.starterCode, {});
        const graded = await postPythonCheck(lesson.id, {
          exerciseId: ex.id,
          code: codeByExercise[ex.id] ?? ex.starterCode,
          run: { stdout: dry.stdout, error: dry.error ?? null },
          prediction: "ok",
          playTurns: 3,
          tempPass: true,
        });
        if (!graded?.ok) {
          setLastFeedbackSuccess(false);
          setLastFeedback("Temp pass is only available in development.");
          return;
        }
        nextCompleted.add(ex.id);
        if (graded.projectChecks) setProjectChecks(graded.projectChecks);
      }
      setCompletedIds(nextCompleted);
      setActiveIndex(Math.max(0, lesson.exercises.length - 1));
      setLessonComplete(true);
      setPlayTurns(3);
      setLastFeedbackSuccess(true);
      setLastFeedback("[TEMP] All exercises auto-passed.");
      trackProgress("lesson_success", { kind: "temp-pass-all" });
    })();
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

  React.useEffect(() => {
    if (lessonComplete) return;
    const t = window.setTimeout(() => {
      const el = document.querySelector<HTMLTextAreaElement>(
        `[aria-label="Python exercise ${activeIndex + 1}"]`
      );
      if (el) {
        el.focus();
        const sel = selectionForIncompleteCode(el.value, activeExercise?.starterCode);
        el.setSelectionRange(sel.start, sel.end);
      }
    }, 150);
    return () => window.clearTimeout(t);
  }, [activeIndex, lessonComplete, activeExercise?.starterCode]);

  const exitHref = dashboardHrefForLesson(lesson.id);
  const exitLabel =
    exitHref === "/welcome" || exitHref === "/demo" || exitHref === "/demo/complete"
      ? "Exit demo"
      : "Dashboard";

  return (
    <LessonAccessGate lessonId={lesson.id}>
    <WelcomeBackground>
      {lesson.guidedTour ? (
        <GuestLessonTour
          onRequestView={requestView}
          onTourActiveChange={setTourActive}
          onTourComplete={() => {
            setTourPreviewExercises(false);
            setTourActive(false);
            setView("lesson");
            setActiveIndex(0);
            try {
              const url = new URL(window.location.href);
              url.searchParams.set("view", "lesson");
              window.history.replaceState({}, "", url.toString());
            } catch {
              // ignore
            }
            // Remount immediately, then again after the mobile ghost-click window
            // so a delayed tap on Next can't leave learners on slide 2.
            setLessonModuleResetKey((k) => k + 1);
            const scrollToLessonTop = () => {
              window.scrollTo({ top: 0, left: 0, behavior: "auto" });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              document
                .querySelector('[data-tour="lesson-hero"]')
                ?.scrollIntoView({ behavior: "auto", block: "start" });
            };
            // After the tour (often mid-page on Exercises), bring them back to the
            // lesson hero / top dashboard on slide 1.
            scrollToLessonTop();
            window.requestAnimationFrame(scrollToLessonTop);
            window.setTimeout(() => {
              setView("lesson");
              setActiveIndex(0);
              setLessonModuleResetKey((k) => k + 1);
              scrollToLessonTop();
            }, 400);
            window.setTimeout(scrollToLessonTop, 480);
          }}
        />
      ) : null}
      <div
        className={cn(
          "mx-auto w-full min-w-0 max-w-[1400px] transition-all duration-300",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        <div
          data-tour="lesson-hero"
          className="kanam-lesson-hero mb-6 w-full max-w-full rounded-[22px] p-3.5 sm:mb-8 sm:rounded-[28px] sm:p-6 md:p-8"
        >
          <div className="kanam-lesson-hero-overlay" />
          <div className="relative z-10 flex min-w-0 flex-col items-center gap-4 text-center sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:text-left">
            <div className="min-w-0 w-full sm:flex-1">
              <div className="flex min-w-0 items-center justify-center gap-2.5 sm:justify-start sm:gap-3.5">
                <div className="kanam-hero-brand-tile grid h-11 w-11 shrink-0 place-items-center rounded-2xl sm:h-14 sm:w-14">
                  <Image src="/images/Logo.png" alt="Kanam Academy" width={40} height={40} className="h-7 w-7 sm:h-10 sm:w-10" />
                </div>
                <div className="min-w-0 leading-tight">
                  <p className="kanam-hero-kicker truncate text-sm font-black uppercase tracking-[0.14em] text-white sm:text-base md:text-lg">
                    Python + AI Hub
                  </p>
                  <p className="truncate text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75 sm:text-[11px] sm:tracking-[0.3em]">
                    Kanam Academy
                  </p>
                </div>
              </div>
              <h1 className="kanam-hero-title mt-3 break-words text-xl font-black tracking-tight text-white sm:mt-5 sm:text-3xl md:text-5xl">
                {lesson.title}
              </h1>
              <p className="mx-auto mt-2 max-w-3xl text-sm font-medium text-white/90 sm:mx-0 sm:mt-2.5 sm:text-base md:text-lg">
                {lesson.goal}
              </p>
            </div>
            <div className="flex min-w-0 max-w-full flex-wrap items-center justify-center gap-2 sm:justify-start" data-tour="lesson-hero-rewards">
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
          <div className="relative z-10 mt-5 min-w-0 sm:mt-6">
            <div className="mb-2 flex min-w-0 items-baseline justify-between gap-3 text-sm font-semibold text-white/90">
              <span className="min-w-0 truncate">
                {isProject
                  ? `Project checklist: ${Object.values(projectChecks).filter(Boolean).length} / ${lesson.project?.requirements.length ?? 0}`
                  : `Exercises complete: ${completedIds.size} / ${lesson.exercises.length}`}
              </span>
              <span className="shrink-0 tabular-nums">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2.5 w-full bg-white/25" indicatorClassName="bg-white" />
          </div>
        </div>

        {lesson.lessonModule ? (
          <div className="relative mb-6 w-fit max-w-full">
            <div
              data-tour="lesson-tabs"
              className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm"
            >
              <button
                type="button"
                data-tour="lesson-tab-lesson"
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
                data-tour="lesson-tab-exercises"
                onClick={() => {
                  if (!lessonUnlocked) {
                    if (tourActive) return;
                    triggerNudge();
                    return;
                  }
                  setView("exercises");
                }}
                aria-disabled={!lessonUnlocked}
                title={
                  lessonUnlocked
                    ? undefined
                    : "Finish the lesson first — then this tab unlocks"
                }
                className={cn(
                  "flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors",
                  view === "exercises" && canShowExercises
                    ? "bg-[var(--brand)] text-white shadow-sm"
                    : lessonUnlocked
                      ? "text-slate-600 hover:bg-slate-100"
                      : "text-slate-400 hover:bg-rose-50/80",
                  finishLessonTabClassName(nudgeActive && !lessonUnlocked)
                )}
              >
                <ListChecks className="h-4 w-4" />
                {isProject ? "Capstone project" : "Exercises"}
              </button>
            </div>
            <FinishLessonFirstHint
              active={nudgeActive && !lessonUnlocked}
              whatUnlocks={isProject ? "the project" : "the exercises"}
            />
          </div>
        ) : null}

        {lesson.lessonModule && (view === "lesson" || !canShowExercises) ? (
          <div data-tour="lesson-module">
            <LessonModule
              key={`lesson-module-${lessonModuleResetKey}`}
              module={lesson.lessonModule}
              onStart={openExercises}
              startLabel={isProject ? "Start the project" : "Start the exercises"}
              navigationLocked={tourActive}
            />
          </div>
        ) : (
        <div className="grid min-w-0 max-w-full gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* Desktop: sticky side panels. Mobile: Help pocket via header button. */}
          <div className="order-2 hidden min-w-0 max-w-full space-y-3 lg:order-1 lg:block lg:sticky lg:top-[calc(var(--kanam-header-height,4.75rem)+0.75rem)] lg:max-h-[calc(100dvh-var(--kanam-header-height,4.75rem)-1.5rem)] lg:overflow-y-auto lg:self-start">
            <LessonAside
              title="Coach's note"
              tone="coach"
              defaultOpen={!lesson.lessonModule}
              icon={<Sparkles className="h-4 w-4" />}
              data-tour="lesson-coach"
            >
              <CoachNoteContent text={lesson.instructorScript} />
            </LessonAside>

            <LessonAside
              title="Python command guide"
              tone="brand"
              defaultOpen
              icon={<Code2 className="h-4 w-4" />}
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
                className="border-[rgb(var(--accent-rgb)/0.55)] bg-[rgb(var(--accent-rgb)/0.1)]"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--brand-2)]">
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

          <div className="order-1 min-w-0 max-w-full space-y-4 lg:order-2">
                <Card
                  ref={workspacePanelRef}
                  data-tour="lesson-exercise"
                  className="min-w-0 max-w-full scroll-mt-24 border-slate-300 shadow-lg"
                >
                  <CardHeader className="min-w-0 max-w-full p-4 pb-2 sm:p-6 sm:pb-2">
                    <CardTitle className="flex min-w-0 items-center gap-2 text-base">
                      <Code2 className="h-5 w-5 shrink-0 text-[var(--brand)]" />
                      Python workspace
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="min-w-0 max-w-full space-y-4 px-4 pb-4 sm:px-6 sm:pb-6">
                    {isProject && lesson.project ? (
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-[rgb(var(--accent-rgb)/0.45)] bg-gradient-to-br from-white via-[rgb(var(--accent-rgb)/0.14)] to-[rgb(var(--brand-rgb)/0.1)] p-4">
                          <p className="text-xs font-black uppercase tracking-wide text-[var(--brand-2)]">
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
                      <div
                        className="flex min-w-0 max-w-full flex-wrap gap-1.5"
                        data-tour="lesson-exercise-nav"
                      >
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
                                "flex min-h-11 min-w-0 max-w-full items-center gap-1.5 rounded-full border px-2.5 py-2 text-xs font-semibold transition-colors sm:min-h-0 sm:px-3.5 sm:py-1.5",
                                active
                                  ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                                  : done
                                    ? "border-[var(--brand)]/40 bg-[var(--brand)]/10 text-[var(--brand-2)]"
                                    : locked
                                      ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                              )}
                            >
                              {done ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : null}
                              <span className="min-w-0 break-words text-left">
                                {idx + 1}. {ex.focusCommand}
                              </span>
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
                        <div
                          className="min-w-0 max-w-full rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4"
                          data-tour="lesson-goal"
                        >
                          {!isProject ? (
                            <div className="flex min-w-0 max-w-full flex-col gap-2">
                              <div className="flex min-w-0 max-w-full flex-wrap items-center gap-2">
                                <Badge className="max-w-full shrink truncate bg-violet-700 text-white">
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
                              </div>
                              <p className="min-w-0 max-w-full break-words text-sm font-semibold text-slate-900">
                                {activeExercise.title}
                              </p>
                            </div>
                          ) : (
                            <p className="min-w-0 max-w-full break-words text-sm font-semibold text-slate-900">
                              {activeExercise.title}
                            </p>
                          )}
                          {!isProject ? (
                            <p className="mt-2 min-w-0 max-w-full break-words text-sm font-medium text-violet-900">
                              {activeExercise.commandExplain}
                            </p>
                          ) : null}
                          <p className="mt-2 min-w-0 max-w-full break-words text-sm text-slate-600">
                            {activeExercise.goal}
                          </p>
                          {!currentDone && !lessonComplete ? (
                            <ExerciseHint
                              exerciseKey={activeExercise.id}
                              hint={activeExercise.hint}
                              secondaryHint={
                                (activeExercise.kind ?? "fill") === "debug" &&
                                activeExercise.debugHint
                                  ? `Bug category: ${activeExercise.debugHint}`
                                  : undefined
                              }
                            />
                          ) : null}
                          {activeExercise.previewOutput ? (
                            <pre className="mt-3 max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-100">
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
                            key={`${activeExercise.id}-parsons-${exerciseResetToken}`}
                            lines={activeExercise.parsonsLines}
                            resetToken={exerciseResetToken}
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
                          <div className="min-w-0 max-w-full" data-tour="lesson-editor">
                            <PythonExerciseEditor
                              key={`${activeExercise.id}-code-${exerciseResetToken}`}
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
                            data-tour="lesson-run-button"
                            className={cn(
                              "min-h-11 w-full sm:w-auto",
                              isChecking && "kanam-data-retry-pulse"
                            )}
                            onClick={handleRunExercise}
                            disabled={lessonComplete || isChecking}
                          >
                            {isChecking ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                            {isChecking ? "Checking…" : "Run & check"}
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
                            onClick={handleResetExercise}
                            disabled={lessonComplete}
                          >
                            Reset
                          </Button>
                        </div>

                        <div ref={feedbackAnchorRef} className="min-w-0 max-w-full space-y-2">
                          {checkPulseKey > 1 && !lastFeedbackSuccess && lastFeedback ? (
                            <p
                              key={`checked-again-${checkPulseKey}`}
                              className="kanam-data-checked-again text-center text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--brand)]"
                              aria-live="polite"
                            >
                              Checked again
                            </p>
                          ) : null}

                          {lastFeedback ? (
                            lastFeedbackSuccess ? (
                              <div
                                key={`success-${activeExercise.id}-${checkPulseKey}`}
                                className="kanam-data-success-banner"
                                role="status"
                              >
                                <CheckCircle2 className="kanam-data-success-icon" aria-hidden />
                                <div>
                                  <p className="kanam-data-success-title">Success!</p>
                                  <p className="kanam-data-success-body">{lastFeedback}</p>
                                  {canAdvance ? (
                                    <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[var(--brand)]">
                                      Tap Next exercise when you&apos;re ready
                                    </p>
                                  ) : lessonComplete ? (
                                    <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[var(--brand)]">
                                      You finished the whole lesson!
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            ) : (
                              <div
                                key={`retry-${activeExercise.id}-${checkPulseKey}`}
                                className="kanam-data-retry-banner kanam-data-retry-pulse"
                                role="alert"
                                style={{
                                  // Force a fresh animation timeline every attempt (mobile Chromium is flaky with class-only remounts).
                                  animation: `kanamDataRetryPulse 0.7s cubic-bezier(0.22, 1, 0.36, 1) both`,
                                }}
                              >
                                <p className="kanam-data-retry-body">{lastFeedback}</p>
                              </div>
                            )
                          ) : null}

                          <div data-tour="lesson-terminal">
                            <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">
                              <Terminal className="h-3.5 w-3.5" />
                              Console output
                            </p>
                            <pre
                              key={`term-${activeExercise.id}-${checkPulseKey}`}
                              className={cn(
                                "kanam-hide-scrollbar min-h-[4.5rem] overflow-auto rounded-xl p-4 font-mono text-xs",
                                terminalOutput
                                  ? lastFeedbackSuccess
                                    ? "kanam-data-terminal-success text-emerald-100"
                                    : "bg-slate-900 text-emerald-100"
                                  : "bg-slate-900 text-slate-500"
                              )}
                              style={
                                terminalOutput && !lastFeedbackSuccess
                                  ? {
                                      animation: `kanamDataTerminalRerun 0.65s ease-out both`,
                                    }
                                  : undefined
                              }
                            >
                              {terminalOutput || "Press Run & check to see output here."}
                            </pre>
                          </div>
                        </div>
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
                        <PremiumBulletList
                          className="mx-auto mt-5 max-w-md"
                          title="Try next"
                          items={lesson.tryThis}
                        />
                      ) : null}
                      {lesson.nextHref ? (
                        <Button asChild className="mt-5 shadow-md" size="lg">
                          <Link href={lesson.nextHref}>
                            {lesson.nextCtaLabel ?? "Next lesson"}
                          </Link>
                        </Button>
                      ) : (
                        <Button asChild className="mt-5 shadow-md" size="lg" variant="secondary">
                          <Link href={exitHref}>Back to dashboard</Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : null}
          </div>
        </div>
        )}

        {/* Always mount so Help pocket stays in the mobile nav (including Lesson tab / tour). */}
        <MobileLessonPocket
            panels={
              [
                {
                  id: "coach",
                  label: "Coach",
                  title: "Coach's note",
                  tone: "coach",
                  icon: <Sparkles className="h-4 w-4" />,
                  content: <CoachNoteContent text={lesson.instructorScript} />,
                },
                {
                  id: "commands",
                  label: "Commands",
                  title: "Python command guide",
                  tone: "brand",
                  icon: <Code2 className="h-4 w-4" />,
                  content: (
                    <div className="space-y-3">
                      {lesson.commandReference.map((cmd) => (
                        <div
                          key={cmd.command}
                          className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-3"
                        >
                          <p className="font-mono text-sm font-bold text-violet-800">
                            {cmd.command}
                          </p>
                          <p className="mt-1 text-sm text-slate-700">{cmd.summary}</p>
                          <p className="mt-2 font-mono text-xs text-slate-500">
                            Example: {cmd.example}
                          </p>
                        </div>
                      ))}
                    </div>
                  ),
                },
                ...(lesson.kidExplain.length > 0
                  ? [
                      {
                        id: "ideas",
                        label: "Ideas",
                        title: "Key ideas",
                        icon: <Lightbulb className="h-4 w-4 text-amber-500" />,
                        content: (
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
                        ),
                      } satisfies MobileLessonPocketPanel,
                    ]
                  : []),
                ...(lesson.cfu.length > 0
                  ? [
                      {
                        id: "check",
                        label: "Check",
                        title: "Check for understanding",
                        icon: <CheckCircle2 className="h-4 w-4 text-[var(--brand)]" />,
                        content: (
                          <div className="space-y-3 text-sm text-slate-700">
                            {lesson.cfu.map((item) => (
                              <details
                                key={item.question}
                                className="rounded-lg border border-slate-200 p-3"
                              >
                                <summary className="cursor-pointer font-semibold text-slate-900">
                                  {item.question}
                                </summary>
                                <p className="mt-2 text-slate-600">{item.answer}</p>
                              </details>
                            ))}
                          </div>
                        ),
                      } satisfies MobileLessonPocketPanel,
                    ]
                  : []),
                ...(isProject && lesson.project
                  ? [
                      {
                        id: "project",
                        label: "Project",
                        title: "Project checklist",
                        icon: <Trophy className="h-4 w-4 text-[var(--accent)]" />,
                        content: (
                          <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--brand-2)]">
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
                              Work in order 1–8. Use <strong>Build</strong> + Run for items 1–7,
                              then <strong>Adventure</strong> for item 8 (3+ live chat turns).
                            </p>
                          </div>
                        ),
                      } satisfies MobileLessonPocketPanel,
                    ]
                  : []),
                {
                  id: "safety",
                  label: "Safety",
                  title: "AI safety moment",
                  icon: <Sparkles className="h-4 w-4 text-violet-500" />,
                  content: <p className="text-sm text-slate-700">{lesson.aiSafetyMoment}</p>,
                },
              ] satisfies MobileLessonPocketPanel[]
            }
          />
      </div>

      {/* Dev-only skip controls — never on guided demo / production */}
      {process.env.NODE_ENV === "development" &&
      !lesson.guidedTour &&
      view === "exercises" &&
      !lessonComplete ? (
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
