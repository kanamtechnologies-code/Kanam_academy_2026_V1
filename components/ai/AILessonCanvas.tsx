"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  FileText,
  Lightbulb,
  ListChecks,
  PenLine,
  ShieldCheck,
  MessageSquareText,
  Sparkles,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";

import { MatchOrder, type MatchPair, type OrderItem } from "@/components/exercises/MatchOrder";
import { ScenarioTree, type ScenarioNode } from "@/components/exercises/ScenarioTree";
import { AIDebugChallenge } from "@/components/exercises/AIDebugChallenge";
import { AIParsonsChallenge } from "@/components/exercises/AIParsonsChallenge";
import { EvalLab, type EvalLabCase } from "@/components/exercises/EvalLab";
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
import { HeaderHelpPocket } from "@/components/layout/HeaderHelpPocket";
import { dashboardHrefForLesson } from "@/lib/billing/access";
import { useLessonHeartbeat } from "@/lib/progress/useLessonHeartbeat";
import { writeProgressEvent } from "@/lib/progress/writeProgress";
import { PremiumBadge } from "@/components/badges/PremiumBadge";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isGuestMode, markGuestLessonComplete } from "@/lib/guestProgress";
import {
  readLessonModuleUnlocked,
  writeLessonModuleUnlocked,
} from "@/lib/lessonModuleUnlock";
import { cn } from "@/lib/utils";

export type AIQuizQuestion = {
  id: string;
  /** The question stem. Supports **bold** and `code`. */
  question: string;
  choices: string[];
  /** Index into `choices` of the correct answer. */
  correctIndex: number;
  /** Shown after the learner answers — teaches the "why". */
  explanation: string;
};

export type AIKeyTerm = { term: string; definition: string };

export type AIMatchActivity = {
  id: string;
  kind: "match";
  title: string;
  prompt: string;
  pairs: MatchPair[];
};

export type AIOrderActivity = {
  id: string;
  kind: "order";
  title: string;
  prompt: string;
  items: OrderItem[];
  /** One teaching note per item, in correct order — shown after a successful check. */
  itemExplanations?: string[];
};

export type AIScenarioActivity = {
  id: string;
  kind: "scenario";
  title: string;
  startId: string;
  nodes: ScenarioNode[];
};

export type AIParsonsActivity = {
  id: string;
  kind: "parsons";
  title: string;
  prompt: string;
  lines: string[];
  languageLabel?: string;
  explanation: string;
  /** One teaching note per line, in correct order — shown after a successful check. */
  lineExplanations?: string[];
};

export type AIDebugActivity = {
  id: string;
  kind: "debug";
  title: string;
  prompt: string;
  buggyContent: string;
  contentLabel?: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type AIPredictActivity = {
  id: string;
  kind: "predict";
  title: string;
  prompt: string;
  scenario?: string;
  acceptedAnswers: string[];
  explanation: string;
  placeholder?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type AIEvalActivity = {
  id: string;
  kind: "eval";
  title: string;
  prompt: string;
  positiveLabel: string;
  negativeLabel: string;
  cases: EvalLabCase[];
  costNote: string;
  correctMetric: "precision" | "recall" | "accuracy" | "f1";
  metricChoices: Array<{
    id: "precision" | "recall" | "accuracy" | "f1";
    label: string;
    why: string;
  }>;
  actionPrompt: string;
  actionChoices: string[];
  correctActionIndex: number;
  explanation: string;
};

export type AIBonusActivity =
  | AIMatchActivity
  | AIOrderActivity
  | AIScenarioActivity
  | AIParsonsActivity
  | AIDebugActivity
  | AIPredictActivity
  | AIEvalActivity;

export type AILessonArtifact = {
  title: string;
  prompt: string;
  placeholder?: string;
  /** Minimum characters required to finish the lesson. Default 80. */
  minChars?: number;
  /** Student-facing self-check bullets — not auto-scored. */
  rubric?: string[];
};

export type AILessonConfig = {
  id: string;
  title: string;
  goal: string;
  xpReward: number;
  badge: string;
  lessonModule: LessonModuleData;
  /**
   * Optional facilitator / Help-pocket coach note (markdown-ish: **bold**, `code`).
   * Literacy tracks use this for Cognia Std 3 / observation-ready coaching.
   */
  instructorScript?: string;
  /** Glossary surfaced beside the knowledge check. */
  keyTerms?: AIKeyTerm[];
  /** Short "big ideas" recap bullets. */
  bigIdeas?: string[];
  /** A real-world connection callout. */
  realWorld?: string;
  quiz: AIQuizQuestion[];
  /**
   * Interactive practice after the MCQ quiz:
   * reorder (parsons), debug, eval lab, predict, match, order, or scenario.
   * If omitted, a default set from the AI exercise bank is used.
   */
  activities?: AIBonusActivity[];
  /** Optional open-ended reflection shown after the quiz. */
  reflection?: { prompt: string; placeholder?: string };
  /** Required written artifact. Blocks Finish until minChars are met. */
  artifact?: AILessonArtifact;
  prevHref?: string;
  nextHref?: string;
  dashboardHref?: string;
};

function renderCoachNote(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return (
      <p key={i} className="leading-relaxed text-slate-700">
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={j} className="font-semibold text-slate-900">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code
                key={j}
                className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm text-emerald-800"
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          return <span key={j}>{part}</span>;
        })}
      </p>
    );
  });
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, j) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={j} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={j}
          className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[13px] text-emerald-800"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={j}>{part}</React.Fragment>;
  });
}

export function AILessonCanvas({
  lesson,
  hubLabel = "AI Literacy Hub",
}: {
  lesson: AILessonConfig;
  hubLabel?: string;
}) {
  const [animateIn, setAnimateIn] = React.useState(false);
  const [view, setView] = React.useState<"lesson" | "quiz">("lesson");
  const [lessonUnlocked, setLessonUnlocked] = React.useState(false);
  const { nudgeActive, triggerNudge } = useFinishLessonFirstNudge();

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Record<string, number>>({});
  const [correctIds, setCorrectIds] = React.useState<Set<string>>(() => new Set());
  const [activityDoneIds, setActivityDoneIds] = React.useState<Set<string>>(() => new Set());
  const [activeActivityIndex, setActiveActivityIndex] = React.useState(0);
  const [reflection, setReflection] = React.useState("");
  const [artifact, setArtifact] = React.useState("");
  const [lessonComplete, setLessonComplete] = React.useState(false);
  const [slideProgress, setSlideProgress] = React.useState({ current: 1, total: 1 });

  const [deviceId, setDeviceId] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [studentDbId, setStudentDbId] = React.useState("");

  const activeQuestion = lesson.quiz[activeIndex];
  const totalQuestions = lesson.quiz.length;
  const onSlideProgress = React.useCallback((current: number, total: number) => {
    setSlideProgress({ current, total });
  }, []);

  React.useEffect(() => {
    setAnimateIn(false);
    const t = window.setTimeout(() => setAnimateIn(true), 10);
    return () => window.clearTimeout(t);
  }, [lesson.id]);

  React.useEffect(() => {
    const unlocked = readLessonModuleUnlocked(lesson.id);
    setLessonUnlocked(unlocked);
    const requested = new URLSearchParams(window.location.search).get("view");
    if ((requested === "exercises" || requested === "quiz") && unlocked) {
      setView("quiz");
    } else {
      setView("lesson");
    }
  }, [lesson.id]);

  const openQuiz = React.useCallback(() => {
    writeLessonModuleUnlocked(lesson.id);
    setLessonUnlocked(true);
    setView("quiz");
  }, [lesson.id]);

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
    try {
      const saved = window.localStorage.getItem(`kanam.aiReflection:${lesson.id}`);
      setReflection(saved ?? "");
      const savedArtifact = window.localStorage.getItem(`kanam.aiArtifact:${lesson.id}`);
      setArtifact(savedArtifact ?? "");
    } catch {
      // ignore
    }
  }, [lesson.id]);

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
        const ensureJson = (await ensureRes.json()) as {
          student?: { id?: string };
        };
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
    enabled: Boolean(deviceId && userId && studentDbId),
  });

  React.useEffect(() => {
    if (!deviceId || !userId || !studentDbId) return;
    trackProgress("lesson_opened");
  }, [deviceId, userId, studentDbId, trackProgress]);

  const challengePanelRef = React.useRef<HTMLDivElement | null>(null);
  const activityNavRef = React.useRef<HTMLDivElement | null>(null);

  const selectChoice = (choiceIndex: number) => {
    if (!activeQuestion || lessonComplete) return;
    if (correctIds.has(activeQuestion.id)) return; // already locked correct
    setSelected((prev) => ({ ...prev, [activeQuestion.id]: choiceIndex }));
    const correct = choiceIndex === activeQuestion.correctIndex;
    trackProgress("run", {
      questionId: activeQuestion.id,
      choiceIndex,
      correct,
    });
    if (correct) {
      setCorrectIds((prev) => new Set(prev).add(activeQuestion.id));
      // Learner advances with the "Next question" button (no auto-skip).
    }
  };

  const goToNext = () => {
    if (activeIndex < totalQuestions - 1) setActiveIndex((i) => i + 1);
  };

  // Activities are attached server-side via attachInteractiveActivities before render.
  const dropDebug = lesson.id.startsWith("dl-") || lesson.id.startsWith("fl-");
  const activities = (lesson.activities ?? []).filter((activity) => {
    if (activity.kind === "predict") return false;
    if (dropDebug && activity.kind === "debug") return false;
    return true;
  });
  const allCorrect = lesson.quiz.every((q) => correctIds.has(q.id));
  const allActivitiesDone =
    activities.length === 0 || activities.every((a) => activityDoneIds.has(a.id));
  const practiceReady = allCorrect && allActivitiesDone;
  const artifactMin = lesson.artifact?.minChars ?? 80;
  const artifactReady = !lesson.artifact || artifact.trim().length >= artifactMin;
  const canFinish = practiceReady && artifactReady;
  const isLastQuestion = activeIndex === totalQuestions - 1;
  const currentCorrect = activeQuestion ? correctIds.has(activeQuestion.id) : false;
  const currentSelection = activeQuestion ? selected[activeQuestion.id] : undefined;
  const activeActivity = activities[activeActivityIndex];

  const scrollActivityIntoView = React.useCallback((idx: number) => {
    requestAnimationFrame(() => {
      activityNavRef.current
        ?.querySelector(`[data-activity-idx="${idx}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      challengePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const markActivityDone = (activityId: string, payload?: Record<string, unknown>) => {
    if (activityDoneIds.has(activityId)) return;
    setActivityDoneIds((prev) => new Set(prev).add(activityId));
    trackProgress("run", { activityId, kind: "bonus", ...payload });
    // Learner advances with the "Next challenge" button (no auto-skip).
  };

  const goToNextActivity = () => {
    if (activeActivityIndex >= activities.length - 1) return;
    const next = activeActivityIndex + 1;
    setActiveActivityIndex(next);
    scrollActivityIntoView(next);
  };

  React.useEffect(() => {
    if (!allCorrect || activities.length === 0) return;
    // When practice unlocks, bring it into view.
    window.setTimeout(() => {
      challengePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  }, [allCorrect, activities.length]);

  const finishLesson = () => {
    if (!canFinish) return;
    setLessonComplete(true);
    try {
      if (reflection.trim()) {
        window.localStorage.setItem(`kanam.aiReflection:${lesson.id}`, reflection.trim());
      }
      if (lesson.artifact && artifact.trim()) {
        window.localStorage.setItem(`kanam.aiArtifact:${lesson.id}`, artifact.trim());
      }
    } catch {
      // ignore
    }
    if (isGuestMode()) {
      markGuestLessonComplete(lesson.id);
      return;
    }
    trackProgress("lesson_success", {
      reflectionLength: reflection.trim().length,
      artifactLength: artifact.trim().length,
      activitiesCompleted: activityDoneIds.size,
      activitiesTotal: activities.length,
    });
  };

  const showingSlides = view === "lesson" || !lessonUnlocked;
  const quizProgressPercent = lessonComplete
    ? 100
    : Math.round(
        ((correctIds.size + activityDoneIds.size) /
          Math.max(1, totalQuestions + activities.length)) *
          100
      );
  const slideProgressPercent = Math.round(
    (slideProgress.current / Math.max(1, slideProgress.total)) * 100
  );
  const progressPercent = showingSlides ? slideProgressPercent : quizProgressPercent;

  return (
    <LessonAccessGate lessonId={lesson.id}>
    <WelcomeBackground>
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
              <div className="min-w-0 leading-tight text-center sm:text-left">
                  <p className="kanam-hero-kicker truncate text-sm font-black uppercase tracking-[0.14em] text-white sm:text-base md:text-lg">
                    {hubLabel}
                  </p>
                  <p className="truncate text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75 sm:text-[11px] sm:tracking-[0.3em]">
                    Kanam Academy
                  </p>
                </div>
              <h1 className="kanam-hero-title mt-3 break-words text-center text-xl font-black tracking-tight text-white sm:mt-5 sm:text-left sm:text-3xl md:text-5xl">
                {lesson.title}
              </h1>
              <p className="mx-auto mt-2 max-w-3xl text-center text-sm font-medium text-white/90 sm:mx-0 sm:mt-2.5 sm:text-left sm:text-base md:text-lg">
                {lesson.goal}
              </p>
            </div>
            <div
              data-tour="lesson-hero-rewards"
              className="flex min-w-0 max-w-full flex-wrap items-center justify-center gap-2 sm:justify-start"
            >
              <Badge className="kanam-hero-chip">
                <Zap className="mr-1.5 h-4 w-4" />
                {lesson.xpReward} XP
              </Badge>
              <PremiumBadge lessonId={lesson.id} name={lesson.badge} variant="chip" />
              <Button asChild className="kanam-hero-cta" size="sm">
                <Link href={dashboardHrefForLesson(lesson.id)}>Dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="relative z-10 mt-5 min-w-0 sm:mt-6">
            <div className="mb-2 flex min-w-0 items-baseline justify-between gap-3 text-sm font-semibold text-white/90">
              <span className="min-w-0 truncate">
                {showingSlides
                  ? `Lesson slides: ${slideProgress.current} / ${slideProgress.total}`
                  : `Knowledge check: ${correctIds.size + activityDoneIds.size} / ${
                      totalQuestions + activities.length
                    }`}
              </span>
              <span className="shrink-0 tabular-nums">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2.5 w-full bg-white/25" indicatorClassName="bg-white" />
          </div>
        </div>

        <div className="relative mb-6 w-full max-w-full">
          <div className="flex w-full min-w-0 max-w-full items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:w-fit">
            <button
              type="button"
              onClick={() => setView("lesson")}
              className={cn(
                "flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-sm font-bold transition-colors sm:flex-none sm:justify-start sm:gap-2 sm:px-4",
                view === "lesson"
                  ? "bg-[var(--brand)] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              <span className="truncate">Lesson</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (!lessonUnlocked) {
                  triggerNudge();
                  return;
                }
                setView("quiz");
              }}
              aria-disabled={!lessonUnlocked}
              title={
                lessonUnlocked
                  ? "Knowledge check"
                  : "Finish the lesson first — then this tab unlocks"
              }
              className={cn(
                "flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-sm font-bold transition-colors sm:flex-none sm:justify-start sm:gap-2 sm:px-4",
                view === "quiz" && lessonUnlocked
                  ? "bg-[var(--brand)] text-white shadow-sm"
                  : lessonUnlocked
                    ? "text-slate-600 hover:bg-slate-100"
                    : "text-slate-400 hover:bg-rose-50/80",
                finishLessonTabClassName(nudgeActive && !lessonUnlocked)
              )}
            >
              <ListChecks className="h-4 w-4 shrink-0" />
              <span className="truncate sm:hidden">Check</span>
              <span className="hidden truncate sm:inline">Knowledge check</span>
            </button>
            <HeaderHelpPocket />
          </div>
          <FinishLessonFirstHint
            active={nudgeActive && !lessonUnlocked}
            whatUnlocks="the knowledge check"
          />
        </div>

        {view === "lesson" || !lessonUnlocked ? (
          <LessonModule
            module={lesson.lessonModule}
            onStart={openQuiz}
            onSlideProgress={onSlideProgress}
          />
        ) : (
          <div className="grid min-w-0 max-w-full gap-6 lg:grid-cols-[1fr_1.15fr]">
            <div className="order-2 hidden min-w-0 max-w-full space-y-3 lg:order-1 lg:block lg:sticky lg:top-[calc(var(--kanam-header-height,4.75rem)+0.75rem)] lg:max-h-[calc(100dvh-var(--kanam-header-height,4.75rem)-1.5rem)] lg:overflow-y-auto lg:self-start">
              {lesson.instructorScript ? (
                <LessonAside
                  title="Coach's note"
                  tone="coach"
                  defaultOpen
                  icon={<MessageSquareText className="h-4 w-4" />}
                >
                  {renderCoachNote(lesson.instructorScript)}
                </LessonAside>
              ) : null}

              {lesson.bigIdeas && lesson.bigIdeas.length > 0 ? (
                <LessonAside
                  title="Big ideas"
                  defaultOpen
                  icon={<Lightbulb className="h-5 w-5 text-[var(--accent)]" />}
                  className="border-[rgb(var(--accent-rgb)/0.45)] bg-white"
                >
                  <ul className="space-y-2">
                    {lesson.bigIdeas.map((idea, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                        <span>{renderInline(idea)}</span>
                      </li>
                    ))}
                  </ul>
                </LessonAside>
              ) : null}

              {lesson.keyTerms && lesson.keyTerms.length > 0 ? (
                <LessonAside
                  title="Key terms"
                  defaultOpen
                  icon={<Brain className="h-5 w-5 text-[var(--brand)]" />}
                  className="border-[var(--brand)]/30 bg-white"
                >
                  <div className="space-y-3">
                    {lesson.keyTerms.map((kt) => (
                      <div
                        key={kt.term}
                        className="rounded-xl border border-white/80 bg-white/90 p-3 shadow-sm"
                      >
                        <p className="text-sm font-bold text-[var(--brand-2)]">{kt.term}</p>
                        <p className="mt-1 text-sm text-slate-700">{renderInline(kt.definition)}</p>
                      </div>
                    ))}
                  </div>
                </LessonAside>
              ) : null}

              {lesson.realWorld ? (
                <LessonAside
                  title="Why this matters"
                  icon={<Sparkles className="h-5 w-5 text-violet-500" />}
                  className="border-violet-200 bg-white"
                >
                  <p className="text-sm text-slate-700">{renderInline(lesson.realWorld)}</p>
                </LessonAside>
              ) : null}
            </div>

            <div className="order-1 min-w-0 max-w-full space-y-4 lg:order-2">
              <Card className="min-w-0 max-w-full border-slate-300 shadow-lg">
                <CardHeader className="min-w-0 max-w-full p-4 pb-2 sm:p-6 sm:pb-2">
                  <CardTitle className="flex min-w-0 items-center gap-2 text-base">
                    <ListChecks className="h-5 w-5 shrink-0 text-[var(--brand)]" />
                    Knowledge check
                  </CardTitle>
                </CardHeader>
                <CardContent className="min-w-0 max-w-full space-y-4 px-4 pb-4 sm:px-6 sm:pb-6">
                  <div className="flex min-w-0 max-w-full flex-wrap gap-1.5">
                    {lesson.quiz.map((q, idx) => {
                      const done = correctIds.has(q.id);
                      const active = idx === activeIndex;
                      const locked =
                        idx > 0 && !correctIds.has(lesson.quiz[idx - 1].id);
                      return (
                        <button
                          key={q.id}
                          type="button"
                          disabled={locked && !done}
                          onClick={() => {
                            if (!locked || done) setActiveIndex(idx);
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
                          Q{idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {activeQuestion ? (
                    <div className="min-w-0 max-w-full space-y-4">
                      <div className="min-w-0 max-w-full rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-[var(--brand-2)]">
                          Question {activeIndex + 1} of {totalQuestions}
                        </p>
                        <p className="mt-2 min-w-0 max-w-full break-words text-base font-semibold text-slate-900">
                          {renderInline(activeQuestion.question)}
                        </p>
                      </div>

                      <div className="min-w-0 max-w-full space-y-2">
                        {activeQuestion.choices.map((choice, ci) => {
                          const isChosen = currentSelection === ci;
                          const isCorrectChoice = ci === activeQuestion.correctIndex;
                          // Only mark the correct choice after the learner picks it —
                          // never reveal the answer on a wrong attempt.
                          const showCorrect = currentCorrect && isCorrectChoice;
                          const showWrong =
                            !currentCorrect &&
                            isChosen &&
                            currentSelection !== undefined &&
                            !isCorrectChoice;
                          return (
                            <button
                              key={ci}
                              type="button"
                              disabled={currentCorrect || lessonComplete}
                              onClick={() => selectChoice(ci)}
                              className={cn(
                                "flex w-full min-w-0 max-w-full items-center gap-3 rounded-xl border-2 px-3 py-3 text-left text-sm font-medium transition-colors sm:px-4",
                                showCorrect
                                  ? "border-[var(--brand)] bg-[var(--brand)]/10 text-slate-900"
                                  : showWrong
                                    ? "border-red-300 bg-red-50 text-slate-900"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                                currentCorrect && !isCorrectChoice ? "opacity-60" : ""
                              )}
                            >
                              <span
                                className={cn(
                                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                                  showCorrect
                                    ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                                    : showWrong
                                      ? "border-red-400 bg-red-400 text-white"
                                      : "border-slate-300 text-slate-500"
                                )}
                              >
                                {showCorrect ? (
                                  <CheckCircle2 className="h-4 w-4" />
                                ) : showWrong ? (
                                  <XCircle className="h-4 w-4" />
                                ) : (
                                  String.fromCharCode(65 + ci)
                                )}
                              </span>
                              <span className="min-w-0 flex-1 break-words">{choice}</span>
                            </button>
                          );
                        })}
                      </div>

                      {currentSelection !== undefined ? (
                        currentCorrect ? (
                          <div className="kanam-data-success-banner" role="status">
                            <CheckCircle2 className="kanam-data-success-icon" aria-hidden />
                            <div>
                              <p className="kanam-data-success-title">Correct!</p>
                              <p className="kanam-data-success-body">{activeQuestion.explanation}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="kanam-data-retry-banner" role="alert">
                            <div>
                              <p className="kanam-data-retry-title">Not quite — try again.</p>
                              <p className="kanam-data-retry-body">
                                Reread the question and pick a different answer. The full
                                explanation unlocks when you get it right.
                              </p>
                            </div>
                          </div>
                        )
                      ) : null}

                      <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap">
                        {currentCorrect && !isLastQuestion ? (
                          <Button
                            type="button"
                            size="lg"
                            className="kanam-data-next-exercise-btn min-h-11 w-full shadow-md sm:w-auto"
                            onClick={goToNext}
                          >
                            Next question
                            <ChevronRight className="kanam-data-next-chevron h-4 w-4" />
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              {allCorrect && activities.length > 0 ? (
                <Card
                  ref={challengePanelRef}
                  className="min-w-0 max-w-full scroll-mt-24 border-violet-200 bg-white shadow-md"
                >
                  <CardHeader className="min-w-0 max-w-full p-4 pb-2 sm:p-6 sm:pb-2">
                    <CardTitle className="flex min-w-0 items-center gap-2 text-base">
                      <Sparkles className="h-5 w-5 shrink-0 text-violet-600" />
                      Practice challenges
                    </CardTitle>
                    <p className="min-w-0 max-w-full break-words text-sm font-medium text-slate-600">
                      {activities
                        .map((activity) =>
                          activity.kind === "parsons"
                            ? "Reorder"
                            : activity.kind === "debug"
                              ? "Debug"
                              : activity.kind === "eval"
                                ? "Eval lab"
                                : activity.kind === "match"
                                    ? "Match"
                                    : activity.kind === "order"
                                      ? "Order"
                                      : activity.kind === "scenario"
                                        ? "Decision tree"
                                        : "Challenge"
                        )
                        .join(" · ")}{" "}
                      — finish each one to complete the lesson. Use Next challenge after each success.
                    </p>
                  </CardHeader>
                  <CardContent className="min-w-0 max-w-full space-y-4 px-4 pb-4 sm:px-6 sm:pb-6">
                    <div ref={activityNavRef} className="flex min-w-0 max-w-full flex-wrap gap-1.5">
                      {activities.map((activity, idx) => {
                        const done = activityDoneIds.has(activity.id);
                        const active = idx === activeActivityIndex;
                        const locked =
                          idx > 0 && !activityDoneIds.has(activities[idx - 1].id);
                        const kindLabel =
                          activity.kind === "parsons"
                            ? "Reorder"
                            : activity.kind === "debug"
                              ? "Debug"
                              : activity.kind === "eval"
                                ? "Eval lab"
                                : activity.kind === "match"
                                    ? "Match"
                                    : activity.kind === "order"
                                      ? "Order"
                                      : activity.kind === "scenario"
                                        ? "Decision tree"
                                        : "Challenge";
                        return (
                          <button
                            key={activity.id}
                            type="button"
                            data-activity-idx={idx}
                            disabled={locked && !done}
                            onClick={() => {
                              if (!locked || done) {
                                setActiveActivityIndex(idx);
                                scrollActivityIntoView(idx);
                              }
                            }}
                            className={cn(
                              "flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors",
                              active
                                ? "border-violet-600 bg-violet-600 text-white"
                                : done
                                  ? "border-violet-300 bg-violet-100 text-violet-900"
                                  : locked
                                    ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                                    : "border-slate-200 bg-white text-slate-700"
                            )}
                          >
                            {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                            <span>
                              {idx + 1}. {kindLabel}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {activeActivity ? (
                      <div className="rounded-2xl border border-white bg-white p-4 shadow-sm">
                        {activeActivity.kind === "match" ? (
                          <MatchOrder
                            mode="match"
                            prompt={activeActivity.prompt}
                            pairs={activeActivity.pairs}
                            completed={activityDoneIds.has(activeActivity.id)}
                            onComplete={() => markActivityDone(activeActivity.id)}
                          />
                        ) : null}
                        {activeActivity.kind === "order" ? (
                          <MatchOrder
                            mode="order"
                            prompt={activeActivity.prompt}
                            items={activeActivity.items}
                            itemExplanations={activeActivity.itemExplanations}
                            completed={activityDoneIds.has(activeActivity.id)}
                            onComplete={() => markActivityDone(activeActivity.id)}
                          />
                        ) : null}
                        {activeActivity.kind === "scenario" ? (
                          <ScenarioTree
                            title={activeActivity.title}
                            startId={activeActivity.startId}
                            nodes={activeActivity.nodes}
                            completed={activityDoneIds.has(activeActivity.id)}
                            onComplete={(pathIds) =>
                              markActivityDone(activeActivity.id, { pathIds })
                            }
                          />
                        ) : null}
                        {activeActivity.kind === "parsons" ? (
                          <AIParsonsChallenge
                            prompt={activeActivity.prompt}
                            lines={activeActivity.lines}
                            languageLabel={activeActivity.languageLabel}
                            explanation={activeActivity.explanation}
                            lineExplanations={activeActivity.lineExplanations}
                            completed={activityDoneIds.has(activeActivity.id)}
                            onComplete={() => markActivityDone(activeActivity.id)}
                          />
                        ) : null}
                        {activeActivity.kind === "debug" ? (
                          <AIDebugChallenge
                            prompt={activeActivity.prompt}
                            buggyContent={activeActivity.buggyContent}
                            contentLabel={activeActivity.contentLabel}
                            choices={activeActivity.choices}
                            correctIndex={activeActivity.correctIndex}
                            explanation={activeActivity.explanation}
                            hint={activeActivity.hint}
                            imageSrc={activeActivity.imageSrc}
                            imageAlt={activeActivity.imageAlt}
                            completed={activityDoneIds.has(activeActivity.id)}
                            onComplete={() => markActivityDone(activeActivity.id)}
                          />
                        ) : null}
                        {activeActivity.kind === "eval" ? (
                          <EvalLab
                            title={activeActivity.title}
                            prompt={activeActivity.prompt}
                            positiveLabel={activeActivity.positiveLabel}
                            negativeLabel={activeActivity.negativeLabel}
                            cases={activeActivity.cases}
                            costNote={activeActivity.costNote}
                            correctMetric={activeActivity.correctMetric}
                            metricChoices={activeActivity.metricChoices}
                            actionPrompt={activeActivity.actionPrompt}
                            actionChoices={activeActivity.actionChoices}
                            correctActionIndex={activeActivity.correctActionIndex}
                            explanation={activeActivity.explanation}
                            completed={activityDoneIds.has(activeActivity.id)}
                            onComplete={() => markActivityDone(activeActivity.id)}
                          />
                        ) : null}

                        {activityDoneIds.has(activeActivity.id) &&
                        activeActivityIndex < activities.length - 1 ? (
                          <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row">
                            <Button
                              type="button"
                              size="lg"
                              className="kanam-data-next-exercise-btn min-h-11 w-full shadow-md sm:w-auto"
                              onClick={goToNextActivity}
                            >
                              Next challenge
                              <ChevronRight className="kanam-data-next-chevron h-4 w-4" />
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              ) : null}

              {practiceReady && !lessonComplete ? (
                <Card className="border-[var(--brand)]/40 bg-white shadow-md">
                  <CardContent className="space-y-4 py-6">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-[var(--brand)]" />
                      <p className="text-lg font-black tracking-tight text-slate-900">
                        {activities.length > 0
                          ? "Quiz + practice complete!"
                          : "You aced the knowledge check!"}
                      </p>
                    </div>
                    {lesson.artifact ? (
                      <div className="space-y-2">
                        <label
                          htmlFor={`artifact-${lesson.id}`}
                          className="flex items-center gap-2 text-sm font-bold text-slate-800"
                        >
                          <FileText className="h-4 w-4 text-[var(--brand)]" />
                          {lesson.artifact.title}
                        </label>
                        <p className="text-sm text-slate-600">
                          {renderInline(lesson.artifact.prompt)}
                        </p>
                        {lesson.artifact.rubric && lesson.artifact.rubric.length > 0 ? (
                          <ul className="space-y-1.5 rounded-xl border border-slate-200 bg-white/80 p-3">
                            {lesson.artifact.rubric.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                                <span>{renderInline(item)}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <textarea
                          id={`artifact-${lesson.id}`}
                          value={artifact}
                          onChange={(e) => {
                            const value = e.target.value;
                            setArtifact(value);
                            try {
                              if (value.trim()) {
                                window.localStorage.setItem(
                                  `kanam.aiArtifact:${lesson.id}`,
                                  value
                                );
                              }
                            } catch {
                              // ignore
                            }
                          }}
                          placeholder={lesson.artifact.placeholder ?? "Write your artifact…"}
                          className="min-h-[140px] w-full resize-y rounded-xl border-2 border-slate-200 bg-white p-3 text-sm text-slate-800 shadow-inner focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
                        />
                        <p className={cn("text-xs", artifactReady ? "text-slate-400" : "text-slate-600")}>
                          {artifact.trim().length} / {artifactMin} characters required.
                          Saved on this device so you can reopen it with a teacher or librarian.
                        </p>
                      </div>
                    ) : null}
                    {lesson.reflection ? (
                      <div className="space-y-2">
                        <label
                          htmlFor={`reflection-${lesson.id}`}
                          className="flex items-center gap-2 text-sm font-bold text-slate-800"
                        >
                          <PenLine className="h-4 w-4 text-[var(--brand)]" />
                          Quick reflection
                        </label>
                        <p className="text-sm text-slate-600">
                          {renderInline(lesson.reflection.prompt)}
                        </p>
                        <textarea
                          id={`reflection-${lesson.id}`}
                          value={reflection}
                          onChange={(e) => setReflection(e.target.value)}
                          placeholder={lesson.reflection.placeholder ?? "Type your thoughts…"}
                          className="min-h-[110px] w-full resize-y rounded-xl border-2 border-slate-200 bg-white p-3 text-sm text-slate-800 shadow-inner focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
                        />
                        <p className="text-xs text-slate-400">
                          Reflections are saved on this device — they help you remember, and aren&apos;t graded.
                        </p>
                      </div>
                    ) : null}
                    <Button
                      type="button"
                      size="lg"
                      className="shadow-md"
                      disabled={!canFinish}
                      onClick={finishLesson}
                    >
                      <Trophy className="h-4 w-4" />
                      Finish lesson
                    </Button>
                  </CardContent>
                </Card>
              ) : null}

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
                    {lesson.nextHref ? (
                      <Button asChild className="mt-5 shadow-md" size="lg">
                        <Link href={lesson.nextHref}>Next lesson</Link>
                      </Button>
                    ) : (
                      <Button asChild className="mt-5 shadow-md" size="lg" variant="secondary">
                        <Link href={dashboardHrefForLesson(lesson.id)}>Back to dashboard</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        )}

        <MobileLessonPocket
            panels={
              [
                ...(lesson.instructorScript
                  ? [
                      {
                        id: "coach",
                        label: "Coach",
                        title: "Coach's note",
                        tone: "coach" as const,
                        icon: <MessageSquareText className="h-4 w-4" />,
                        content: renderCoachNote(lesson.instructorScript),
                      } satisfies MobileLessonPocketPanel,
                    ]
                  : []),
                ...(lesson.bigIdeas && lesson.bigIdeas.length > 0
                  ? [
                      {
                        id: "ideas",
                        label: "Ideas",
                        title: "Big ideas",
                        tone: "brand" as const,
                        icon: <Lightbulb className="h-4 w-4 text-[var(--accent)]" />,
                        content: (
                          <ul className="space-y-2">
                            {lesson.bigIdeas.map((idea, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                                <span>{renderInline(idea)}</span>
                              </li>
                            ))}
                          </ul>
                        ),
                      } satisfies MobileLessonPocketPanel,
                    ]
                  : []),
                ...(lesson.keyTerms && lesson.keyTerms.length > 0
                  ? [
                      {
                        id: "terms",
                        label: "Terms",
                        title: "Key terms",
                        tone: "coach" as const,
                        icon: <Brain className="h-4 w-4 text-[var(--brand)]" />,
                        content: (
                          <div className="space-y-3">
                            {lesson.keyTerms.map((kt) => (
                              <div
                                key={kt.term}
                                className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-3"
                              >
                                <p className="text-sm font-bold text-[var(--brand-2)]">{kt.term}</p>
                                <p className="mt-1 text-sm text-slate-700">
                                  {renderInline(kt.definition)}
                                </p>
                              </div>
                            ))}
                          </div>
                        ),
                      } satisfies MobileLessonPocketPanel,
                    ]
                  : []),
                ...(lesson.realWorld
                  ? [
                      {
                        id: "why",
                        label: "Why",
                        title: "Why this matters",
                        icon: <Sparkles className="h-4 w-4 text-violet-500" />,
                        content: (
                          <p className="text-sm text-slate-700">{renderInline(lesson.realWorld)}</p>
                        ),
                      } satisfies MobileLessonPocketPanel,
                    ]
                  : []),
              ] satisfies MobileLessonPocketPanel[]
            }
          />
      </div>
    </WelcomeBackground>
    </LessonAccessGate>
  );
}
