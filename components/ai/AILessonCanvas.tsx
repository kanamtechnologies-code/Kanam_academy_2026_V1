"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  ListChecks,
  PenLine,
  ShieldCheck,
  Sparkles,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";

import { MatchOrder, type MatchPair, type OrderItem } from "@/components/exercises/MatchOrder";
import { ScenarioTree, type ScenarioNode } from "@/components/exercises/ScenarioTree";
import { AIDebugChallenge } from "@/components/exercises/AIDebugChallenge";
import { AIParsonsChallenge } from "@/components/exercises/AIParsonsChallenge";
import { AIPredictChallenge } from "@/components/exercises/AIPredictChallenge";
import { LessonModule, type LessonModuleData } from "@/components/data/LessonModule";
import { LessonAside } from "@/components/lesson/LessonAside";
import { LessonAccessGate } from "@/components/lesson/LessonAccessGate";
import { PremiumBadge } from "@/components/badges/PremiumBadge";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AI_INTERACTIVE_BY_LESSON } from "@/lib/aiLessons/interactiveExercises";
import { DIGITAL_INTERACTIVE_BY_LESSON } from "@/lib/digitalLessons/interactiveExercises";
import { CYBER_INTERACTIVE_BY_LESSON } from "@/lib/cyberLessons/interactiveExercises";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isGuestMode, markGuestLessonComplete } from "@/lib/guestProgress";
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

export type AIBonusActivity =
  | AIMatchActivity
  | AIOrderActivity
  | AIScenarioActivity
  | AIParsonsActivity
  | AIDebugActivity
  | AIPredictActivity;

export type AILessonConfig = {
  id: string;
  title: string;
  goal: string;
  xpReward: number;
  badge: string;
  lessonModule: LessonModuleData;
  /** Glossary surfaced beside the knowledge check. */
  keyTerms?: AIKeyTerm[];
  /** Short "big ideas" recap bullets. */
  bigIdeas?: string[];
  /** A real-world connection callout. */
  realWorld?: string;
  quiz: AIQuizQuestion[];
  /**
   * Interactive practice after the MCQ quiz:
   * reorder (parsons), debug, predict, match, order, or scenario.
   * If omitted, a default set from the AI exercise bank is used.
   */
  activities?: AIBonusActivity[];
  /** Optional open-ended reflection shown after the quiz. */
  reflection?: { prompt: string; placeholder?: string };
  prevHref?: string;
  nextHref?: string;
  dashboardHref?: string;
};

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

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Record<string, number>>({});
  const [correctIds, setCorrectIds] = React.useState<Set<string>>(() => new Set());
  const [activityDoneIds, setActivityDoneIds] = React.useState<Set<string>>(() => new Set());
  const [activeActivityIndex, setActiveActivityIndex] = React.useState(0);
  const [reflection, setReflection] = React.useState("");
  const [lessonComplete, setLessonComplete] = React.useState(false);

  const [deviceId, setDeviceId] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [studentDbId, setStudentDbId] = React.useState("");

  const activeQuestion = lesson.quiz[activeIndex];
  const totalQuestions = lesson.quiz.length;

  React.useEffect(() => {
    setAnimateIn(false);
    const t = window.setTimeout(() => setAnimateIn(true), 10);
    return () => window.clearTimeout(t);
  }, [lesson.id]);

  React.useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("view");
    if (requested === "exercises" || requested === "quiz") setView("quiz");
    else if (requested === "lesson") setView("lesson");
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
      if (saved) setReflection(saved);
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

  const selectChoice = (choiceIndex: number) => {
    if (!activeQuestion || lessonComplete) return;
    if (correctIds.has(activeQuestion.id)) return; // already locked correct
    setSelected((prev) => ({ ...prev, [activeQuestion.id]: choiceIndex }));
    trackProgress("run", { questionId: activeQuestion.id, choiceIndex });
    if (choiceIndex === activeQuestion.correctIndex) {
      setCorrectIds((prev) => new Set(prev).add(activeQuestion.id));
    }
  };

  const goToNext = () => {
    if (activeIndex < totalQuestions - 1) setActiveIndex((i) => i + 1);
  };

  const activities = React.useMemo(() => {
    if (lesson.activities && lesson.activities.length > 0) return lesson.activities;
    return (
      AI_INTERACTIVE_BY_LESSON[lesson.id] ??
      DIGITAL_INTERACTIVE_BY_LESSON[lesson.id] ??
      CYBER_INTERACTIVE_BY_LESSON[lesson.id] ??
      []
    );
  }, [lesson.activities, lesson.id]);
  const allCorrect = lesson.quiz.every((q) => correctIds.has(q.id));
  const allActivitiesDone =
    activities.length === 0 || activities.every((a) => activityDoneIds.has(a.id));
  const canFinish = allCorrect && allActivitiesDone;
  const isLastQuestion = activeIndex === totalQuestions - 1;
  const currentCorrect = activeQuestion ? correctIds.has(activeQuestion.id) : false;
  const currentSelection = activeQuestion ? selected[activeQuestion.id] : undefined;
  const activeActivity = activities[activeActivityIndex];

  const markActivityDone = (activityId: string, payload?: Record<string, unknown>) => {
    setActivityDoneIds((prev) => new Set(prev).add(activityId));
    trackProgress("run", { activityId, kind: "bonus", ...payload });
  };

  /** TEMP testing helper — remove before shipping. */
  const tempPassCurrentStep = () => {
    if (lessonComplete) return;

    if (!allCorrect) {
      const q = lesson.quiz[activeIndex];
      if (!q) return;
      setSelected((prev) => ({ ...prev, [q.id]: q.correctIndex }));
      setCorrectIds((prev) => new Set(prev).add(q.id));
      if (activeIndex < totalQuestions - 1) {
        setActiveIndex((i) => i + 1);
      }
      return;
    }

    const act = activities[activeActivityIndex];
    if (act && !activityDoneIds.has(act.id)) {
      markActivityDone(act.id, { tempSkip: true });
      if (activeActivityIndex < activities.length - 1) {
        setActiveActivityIndex((i) => i + 1);
      }
    }
  };

  /** TEMP testing helper — remove before shipping. */
  const tempPassAllRemaining = () => {
    if (lessonComplete) return;

    const nextSelected: Record<string, number> = { ...selected };
    const nextCorrect = new Set(correctIds);
    for (const q of lesson.quiz) {
      nextSelected[q.id] = q.correctIndex;
      nextCorrect.add(q.id);
    }
    setSelected(nextSelected);
    setCorrectIds(nextCorrect);
    setActiveIndex(Math.max(0, totalQuestions - 1));

    const nextDone = new Set(activityDoneIds);
    for (const act of activities) nextDone.add(act.id);
    setActivityDoneIds(nextDone);
    if (activities.length > 0) setActiveActivityIndex(activities.length - 1);
  };

  const finishLesson = () => {
    if (!canFinish) return;
    setLessonComplete(true);
    try {
      if (reflection.trim()) {
        window.localStorage.setItem(`kanam.aiReflection:${lesson.id}`, reflection.trim());
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
      activitiesCompleted: activityDoneIds.size,
    });
  };

  const progressPercent = lessonComplete
    ? 100
    : Math.round(
        ((correctIds.size + activityDoneIds.size) /
          Math.max(1, totalQuestions + activities.length)) *
          100
      );

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
                    {hubLabel}
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
                <Link href={lesson.dashboardHref ?? "/dashboard"}>Dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="relative z-10 mt-6">
            <div className="mb-2 flex justify-between text-sm font-semibold text-white/90">
              <span>
                Knowledge check: {correctIds.size + activityDoneIds.size} /{" "}
                {totalQuestions + activities.length}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2.5 bg-white/25" indicatorClassName="bg-white" />
          </div>
        </div>

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
            onClick={() => setView("quiz")}
            className={cn(
              "flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors",
              view === "quiz"
                ? "bg-[var(--brand)] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <ListChecks className="h-4 w-4" />
            Knowledge check
          </button>
        </div>

        {view === "lesson" ? (
          <LessonModule module={lesson.lessonModule} onStart={() => setView("quiz")} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
            <div className="space-y-3 lg:sticky lg:top-[calc(var(--kanam-header-height,4.75rem)+0.75rem)] lg:max-h-[calc(100dvh-var(--kanam-header-height,4.75rem)-1.5rem)] lg:overflow-y-auto lg:self-start">
              {lesson.bigIdeas && lesson.bigIdeas.length > 0 ? (
                <LessonAside
                  title="Big ideas"
                  defaultOpen
                  icon={<Lightbulb className="h-5 w-5 text-amber-500" />}
                  className="border-amber-200 bg-amber-50/40"
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
                  className="border-[var(--brand)]/30 bg-[var(--brand)]/5"
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
                  className="border-violet-200 bg-violet-50/50"
                >
                  <p className="text-sm text-slate-700">{renderInline(lesson.realWorld)}</p>
                </LessonAside>
              ) : null}
            </div>

            <div className="space-y-4">
              <Card className="border-slate-300 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ListChecks className="h-5 w-5 text-[var(--brand)]" />
                    Knowledge check
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
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
                          Q{idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {activeQuestion ? (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-[var(--brand-2)]">
                          Question {activeIndex + 1} of {totalQuestions}
                        </p>
                        <p className="mt-2 text-base font-semibold text-slate-900">
                          {renderInline(activeQuestion.question)}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {activeQuestion.choices.map((choice, ci) => {
                          const isChosen = currentSelection === ci;
                          const isCorrectChoice = ci === activeQuestion.correctIndex;
                          const revealed = currentSelection !== undefined;
                          const showCorrect = revealed && isCorrectChoice;
                          const showWrong = revealed && isChosen && !isCorrectChoice;
                          return (
                            <button
                              key={ci}
                              type="button"
                              disabled={currentCorrect || lessonComplete}
                              onClick={() => selectChoice(ci)}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-colors",
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
                              <span>{choice}</span>
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
                          <div
                            className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                            role="alert"
                          >
                            <p className="font-semibold">Not quite — try again.</p>
                            <p className="mt-1">
                              Reread the question and pick a different answer. The full explanation
                              unlocks when you get it right.
                            </p>
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
                <Card className="border-violet-200 bg-violet-50/40 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Sparkles className="h-5 w-5 text-violet-600" />
                      Practice challenges
                    </CardTitle>
                    <p className="text-sm font-medium text-slate-600">
                      {activities
                        .map((activity) =>
                          activity.kind === "parsons"
                            ? "Reorder"
                            : activity.kind === "debug"
                              ? "Debug"
                              : activity.kind === "predict"
                                ? "Predict"
                                : activity.kind === "match"
                                  ? "Match"
                                  : activity.kind === "order"
                                    ? "Order"
                                    : activity.kind === "scenario"
                                      ? "Decision tree"
                                      : "Challenge"
                        )
                        .join(" · ")}{" "}
                      — finish each one to complete the lesson.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
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
                              : activity.kind === "predict"
                                ? "Predict"
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
                            disabled={locked && !done}
                            onClick={() => {
                              if (!locked || done) setActiveActivityIndex(idx);
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
                            <span className="opacity-80">{kindLabel}:</span> {activity.title}
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
                        {activeActivity.kind === "predict" ? (
                          <AIPredictChallenge
                            prompt={activeActivity.prompt}
                            scenario={activeActivity.scenario}
                            acceptedAnswers={activeActivity.acceptedAnswers}
                            explanation={activeActivity.explanation}
                            placeholder={activeActivity.placeholder}
                            imageSrc={activeActivity.imageSrc}
                            imageAlt={activeActivity.imageAlt}
                            completed={activityDoneIds.has(activeActivity.id)}
                            onComplete={() => markActivityDone(activeActivity.id)}
                          />
                        ) : null}

                        {activityDoneIds.has(activeActivity.id) &&
                        activeActivityIndex < activities.length - 1 ? (
                          <div className="mt-4">
                            <Button
                              type="button"
                              className="h-11"
                              onClick={() => setActiveActivityIndex((i) => i + 1)}
                            >
                              Next challenge
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              ) : null}

              {canFinish && !lessonComplete ? (
                <Card className="border-[var(--brand)]/40 bg-[var(--brand)]/5 shadow-md">
                  <CardContent className="space-y-4 py-6">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-[var(--brand)]" />
                      <p className="text-lg font-black tracking-tight text-slate-900">
                        {activities.length > 0
                          ? "Quiz + practice complete!"
                          : "You aced the knowledge check!"}
                      </p>
                    </div>
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
                    <Button type="button" size="lg" className="shadow-md" onClick={finishLesson}>
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
                        <Link href={lesson.dashboardHref ?? "/dashboard"}>Back to dashboard</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {/* Dev-only skip controls */}
      {process.env.NODE_ENV === "development" && view === "quiz" && !lessonComplete ? (
        <div className="fixed bottom-4 right-4 z-[80] flex max-w-[min(100vw-2rem,20rem)] flex-col gap-2 rounded-2xl border-2 border-dashed border-orange-400 bg-orange-50 p-3 shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-wide text-orange-800">
            Temp test controls — remove later
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-10 border-orange-300 bg-white text-orange-950 hover:bg-orange-100"
            onClick={tempPassCurrentStep}
          >
            Pass current step
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
