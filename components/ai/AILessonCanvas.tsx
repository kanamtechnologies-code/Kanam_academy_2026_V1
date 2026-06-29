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
  PartyPopper,
  PenLine,
  ShieldCheck,
  Sparkles,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";

import { LessonModule, type LessonModuleData } from "@/components/data/LessonModule";
import { LessonAside } from "@/components/lesson/LessonAside";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
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

export function AILessonCanvas({ lesson }: { lesson: AILessonConfig }) {
  const [animateIn, setAnimateIn] = React.useState(false);
  const [view, setView] = React.useState<"lesson" | "quiz">("lesson");

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Record<string, number>>({});
  const [correctIds, setCorrectIds] = React.useState<Set<string>>(() => new Set());
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
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
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

  const allCorrect = lesson.quiz.every((q) => correctIds.has(q.id));
  const isLastQuestion = activeIndex === totalQuestions - 1;
  const currentCorrect = activeQuestion ? correctIds.has(activeQuestion.id) : false;
  const currentSelection = activeQuestion ? selected[activeQuestion.id] : undefined;

  const finishLesson = () => {
    setLessonComplete(true);
    try {
      if (reflection.trim()) {
        window.localStorage.setItem(`kanam.aiReflection:${lesson.id}`, reflection.trim());
      }
    } catch {
      // ignore
    }
    trackProgress("lesson_success", { reflectionLength: reflection.trim().length });
  };

  const progressPercent = lessonComplete
    ? 100
    : Math.round((correctIds.size / Math.max(1, totalQuestions)) * 100);

  return (
    <WelcomeBackground>
      <div
        className={cn(
          "mx-auto max-w-[1400px] transition-all duration-300",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        <div className="kanam-glow-card mb-6 rounded-[28px] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image src="/images/Logo.png" alt="Kanam Academy" width={30} height={30} />
              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-slate-600">
                AI Literacy Hub
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="border border-slate-200 bg-white px-3 py-1">
                <Zap className="mr-1 h-4 w-4 text-[var(--accent)]" />
                {lesson.xpReward} XP
              </Badge>
              <Badge variant={lessonComplete ? "success" : "outline"} className="px-3 py-1">
                {lesson.badge}
              </Badge>
              <Button asChild variant="outline" size="sm">
                <Link href={lesson.dashboardHref ?? "/dashboard"}>Dashboard</Link>
              </Button>
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-2 max-w-3xl text-base text-slate-600 md:text-lg">{lesson.goal}</p>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs font-medium text-slate-600">
              <span>
                Knowledge check: {correctIds.size} / {totalQuestions}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} />
          </div>
        </div>

        <div className="mb-6 inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setView("lesson")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors",
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
              "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors",
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
            <div className="space-y-3 lg:sticky lg:top-6 lg:self-start">
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
                            "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
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
                            <p className="mt-1">{activeQuestion.explanation}</p>
                          </div>
                        )
                      ) : null}

                      <div className="flex flex-wrap gap-2">
                        {currentCorrect && !isLastQuestion ? (
                          <Button
                            type="button"
                            size="lg"
                            className="kanam-data-next-exercise-btn shadow-md"
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

              {allCorrect && !lessonComplete ? (
                <Card className="border-[var(--brand)]/40 bg-[var(--brand)]/5 shadow-md">
                  <CardContent className="space-y-4 py-6">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-[var(--brand)]" />
                      <p className="text-lg font-black tracking-tight text-slate-900">
                        You aced the knowledge check!
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
    </WelcomeBackground>
  );
}
