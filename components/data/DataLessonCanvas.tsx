"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Database,
  Lightbulb,
  ListChecks,
  Loader2,
  PartyPopper,
  Play,
  Sparkles,
  Table2,
  Trophy,
  Zap,
} from "lucide-react";

import { ChartPanel, type ChartConfig } from "@/components/data/ChartPanel";
import { LessonModule, type LessonModuleData } from "@/components/data/LessonModule";
import { LessonAside } from "@/components/lesson/LessonAside";
import { ResultTable } from "@/components/data/ResultTable";
import { SqlTextarea } from "@/components/data/SqlTextarea";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  createLessonDatabase,
  hasSqlPlaceholders,
  runSelectQuery,
  type QueryResult,
  type SeedTable,
  type SqlRunResult,
} from "@/lib/sqlRunner";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { prepareExerciseSql, cursorForIncompleteSql, findTypingZonesForExercise } from "@/lib/sqlStarter";
import { cn } from "@/lib/utils";
import type { Database as SqlDatabase } from "sql.js";

export type DataExplainItem = { title: string; text: string };
export type DataCfuItem = { question: string; answer: string };

export type SqlCommandReference = {
  command: string;
  summary: string;
  example: string;
};

export type DataSqlExercise = {
  id: string;
  title: string;
  focusCommand: string;
  commandExplain: string;
  goal: string;
  starterSql: string;
  hint?: string;
  successMessage: string;
  failureMessage: string;
  validate: (sql: string, result: QueryResult | null) => boolean;
};

export type DataLessonConfig = {
  id: string;
  title: string;
  goal: string;
  xpReward: number;
  badge: string;
  instructorScript: string;
  kidExplain: DataExplainItem[];
  steps: string[];
  cfu: DataCfuItem[];
  tryThis: string[];
  dataEthicsMoment: string;
  seedData: SeedTable[];
  previewTable?: string;
  lessonModule?: LessonModuleData;
  chartConfig?: ChartConfig;
  terminalPrompt?: string;
  prevHref?: string;
  nextHref?: string;
  dashboardHref?: string;
  coachNoteGateSeconds?: number;
  commandReference: SqlCommandReference[];
  exercises: DataSqlExercise[];
};

const TERMINAL_DEFAULT = "kanam-analyst@sql ~$";

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

export function DataLessonCanvas({ lesson }: { lesson: DataLessonConfig }) {
  const terminalPrompt = lesson.terminalPrompt ?? TERMINAL_DEFAULT;
  const gateSeconds = lesson.coachNoteGateSeconds ?? 0;

  const [animateIn, setAnimateIn] = React.useState(false);
  const [view, setView] = React.useState<"lesson" | "exercises">(
    lesson.lessonModule ? "lesson" : "exercises"
  );

  React.useEffect(() => {
    if (!lesson.lessonModule) return;
    const requested = new URLSearchParams(window.location.search).get("view");
    if (requested === "exercises" || requested === "lesson") {
      setView(requested);
    }
  }, [lesson.lessonModule]);
  const [db, setDb] = React.useState<SqlDatabase | null>(null);
  const [dbLoading, setDbLoading] = React.useState(true);
  const [dbError, setDbError] = React.useState<string | null>(null);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [sqlByExercise, setSqlByExercise] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(
      lesson.exercises.map((ex) => [ex.id, prepareExerciseSql(ex.starterSql)])
    )
  );
  const [completedIds, setCompletedIds] = React.useState<Set<string>>(() => new Set());
  const [lastFeedback, setLastFeedback] = React.useState<string>("");
  const [lastFeedbackSuccess, setLastFeedbackSuccess] = React.useState(false);
  const [queryResult, setQueryResult] = React.useState<QueryResult | null>(null);
  const [terminalOutput, setTerminalOutput] = React.useState("");
  const [runError, setRunError] = React.useState<string | null>(null);
  const [lessonComplete, setLessonComplete] = React.useState(false);

  const [coachConfirmed, setCoachConfirmed] = React.useState(false);
  const [coachSecondsLeft, setCoachSecondsLeft] = React.useState(gateSeconds);

  const [deviceId, setDeviceId] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [studentDbId, setStudentDbId] = React.useState("");

  const activeExercise = lesson.exercises[activeIndex];
  const activeSql = sqlByExercise[activeExercise?.id ?? ""] ?? "";

  React.useEffect(() => {
    setAnimateIn(false);
    const t = window.setTimeout(() => setAnimateIn(true), 10);
    return () => window.clearTimeout(t);
  }, [lesson.id]);

  React.useEffect(() => {
    let cancelled = false;
    setDbLoading(true);
    setDbError(null);
    createLessonDatabase(lesson.seedData)
      .then((database) => {
        if (!cancelled) {
          setDb(database);
          setDbLoading(false);
        } else {
          database.close();
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setDbError(e instanceof Error ? e.message : String(e));
          setDbLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [lesson.id, lesson.seedData]);

  React.useEffect(() => () => db?.close(), [db]);

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

  React.useEffect(() => {
    if (gateSeconds <= 0) {
      setCoachConfirmed(true);
      return;
    }
    const coachKey = `kanam.coachRead:data:v1:${lesson.id}:${userId || deviceId || "anon"}`;
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

  const confirmCoachNote = () => {
    setCoachConfirmed(true);
    setCoachSecondsLeft(0);
    try {
      const coachKey = `kanam.coachRead:data:v1:${lesson.id}:${userId || deviceId || "anon"}`;
      window.localStorage.setItem(coachKey, "1");
    } catch {
      // ignore
    }
    trackProgress("coach_note_confirmed");
  };

  const formatTerminal = (body: string) =>
    `${terminalPrompt}\n${body}\n${terminalPrompt}`;

  const executeQuery = (sql: string): SqlRunResult => {
    if (!db) {
      return { columns: [], values: [], rowCount: 0, error: "Database still loading…" };
    }
    return runSelectQuery(db, sql);
  };

  const setActiveSql = (next: string) => {
    if (!activeExercise) return;
    setSqlByExercise((prev) => ({ ...prev, [activeExercise.id]: next }));
  };

  const handleRunExercise = () => {
    if (!activeExercise) return;
    trackProgress("run", { exerciseId: activeExercise.id });

    if (hasSqlPlaceholders(activeSql)) {
      setRunError(null);
      setQueryResult(null);
      setLastFeedbackSuccess(false);
      setLastFeedback("Fill in every ____ blank before running.");
      setTerminalOutput(formatTerminal("❌ Fill in every ____ blank first."));
      return;
    }

    const result = executeQuery(activeSql);
    if (result.error) {
      setRunError(result.error);
      setQueryResult(null);
      setLastFeedbackSuccess(false);
      setLastFeedback(activeExercise.failureMessage);
      setTerminalOutput(formatTerminal(`❌ ${result.error}`));
      return;
    }

    setRunError(null);
    setQueryResult(result);
    const preview = `${result.rowCount} row${result.rowCount === 1 ? "" : "s"}`;

    const ok = activeExercise.validate(activeSql, result);
    if (ok) {
      setLastFeedbackSuccess(true);
      setLastFeedback(activeExercise.successMessage);
      setTerminalOutput(formatTerminal(`✓ ${activeExercise.successMessage}\n(${preview})`));
      setCompletedIds((prev) => new Set(prev).add(activeExercise.id));

      const isLast = activeIndex === lesson.exercises.length - 1;
      if (isLast) {
        setLessonComplete(true);
        trackProgress("lesson_success", { exerciseId: activeExercise.id });
      }
    } else {
      setLastFeedbackSuccess(false);
      setLastFeedback(activeExercise.failureMessage);
      setTerminalOutput(
        formatTerminal(`Query ran (${preview}) but not quite right yet.\n${activeExercise.failureMessage}`)
      );
    }
  };

  const goToNextExercise = () => {
    if (activeIndex < lesson.exercises.length - 1) {
      setActiveIndex((i) => i + 1);
      setQueryResult(null);
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
    return findTypingZonesForExercise(activeSql, activeExercise.starterSql);
  }, [activeExercise, activeSql, currentDone]);

  React.useEffect(() => {
    if (dbLoading || dbError || lessonComplete) return;
    const t = window.setTimeout(() => {
      const el = document.querySelector<HTMLTextAreaElement>(
        `[aria-label="SQL exercise ${activeIndex + 1}"]`
      );
      if (el) {
        el.focus();
        const cursor = cursorForIncompleteSql(el.value);
        el.setSelectionRange(cursor, cursor);
      }
    }, 150);
    return () => window.clearTimeout(t);
  }, [activeIndex, dbLoading, dbError, lessonComplete]);

  return (
    <WelcomeBackground>
      <div
        className={cn(
          "mx-auto max-w-[1400px] transition-all duration-300",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        <div className="kanam-lesson-hero mb-8 rounded-[28px] p-6 md:p-8">
          <div className="kanam-lesson-hero-overlay" />
          <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3.5">
                <div className="kanam-hero-brand-tile grid h-14 w-14 shrink-0 place-items-center rounded-2xl">
                  <Image src="/images/Logo.png" alt="Kanam Academy" width={40} height={40} />
                </div>
                <div className="leading-tight">
                  <p className="kanam-hero-kicker text-base font-black uppercase tracking-[0.16em] text-white md:text-lg">
                    Data Analyst Hub
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75">
                    Kanam Academy
                  </p>
                </div>
              </div>
              <h1 className="kanam-hero-title mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
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
              onClick={() => setView("exercises")}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors",
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
          <div className="space-y-3 lg:sticky lg:top-6 lg:self-start">
            <LessonAside
              title="Coach's note"
              defaultOpen={!lesson.lessonModule}
              icon={<Sparkles className="h-5 w-5 text-[var(--accent)]" />}
              className="border-[rgb(var(--accent-rgb)/0.55)]"
            >
              <div className="space-y-3 text-sm">
                {renderCoachNote(lesson.instructorScript)}
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
              title="SQL command guide"
              defaultOpen
              icon={<Database className="h-5 w-5 text-[var(--brand)]" />}
              className="border-[var(--brand)]/30 bg-[var(--brand)]/5"
            >
              <div className="space-y-3">
                {lesson.commandReference.map((cmd) => (
                  <div
                    key={cmd.command}
                    className="rounded-xl border border-white/80 bg-white/90 p-3 shadow-sm"
                  >
                    <p className="font-mono text-sm font-bold text-sky-800">{cmd.command}</p>
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

            <LessonAside
              title="Data ethics moment"
              icon={<Sparkles className="h-5 w-5 text-sky-500" />}
              className="border-sky-200 bg-sky-50/50"
            >
              <p className="text-sm text-slate-700">{lesson.dataEthicsMoment}</p>
            </LessonAside>
          </div>

          <div className="space-y-4">
            {dbLoading ? (
              <Card>
                <CardContent className="flex items-center gap-3 py-8 text-slate-600">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading sample database…
                </CardContent>
              </Card>
            ) : dbError ? (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="py-6 text-red-800">{dbError}</CardContent>
              </Card>
            ) : (
              <>
                {lesson.previewTable ? (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Table2 className="h-5 w-5 text-[var(--brand)]" />
                        Sample table: {lesson.previewTable}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResultTable
                        result={
                          db
                            ? runSelectQuery(db, `SELECT * FROM ${lesson.previewTable} LIMIT 8`)
                            : null
                        }
                      />
                    </CardContent>
                  </Card>
                ) : null}

                <Card className="border-slate-300 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Database className="h-5 w-5 text-[var(--brand)]" />
                      SQL workspace
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
                            {idx + 1}. {ex.focusCommand}
                          </button>
                        );
                      })}
                    </div>

                    {activeExercise ? (
                      <>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className="bg-sky-700 text-white">
                              {activeExercise.focusCommand}
                            </Badge>
                            <p className="text-sm font-semibold text-slate-900">
                              {activeExercise.title}
                            </p>
                          </div>
                          <p className="mt-2 text-sm font-medium text-sky-900">
                            {activeExercise.commandExplain}
                          </p>
                          <p className="mt-2 text-sm text-slate-600">{activeExercise.goal}</p>
                          {activeExercise.hint ? (
                            <p className="mt-2 text-xs text-slate-500">
                              Hint: {activeExercise.hint}
                            </p>
                          ) : null}
                        </div>

                        <SqlTextarea
                          value={activeSql}
                          onChange={setActiveSql}
                          autoClearBlanks
                          typingZones={typingZones}
                          ariaLabel={`SQL exercise ${activeIndex + 1}`}
                          placeholder="Type your SQL here…"
                          minHeightPx={100}
                          maxHeightPx={200}
                          readOnly={lessonComplete}
                        />

                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            onClick={handleRunExercise}
                            disabled={lessonComplete || dbLoading}
                          >
                            <Play className="h-4 w-4" />
                            Run &amp; check
                          </Button>
                          {canAdvance ? (
                            <Button
                              key={`next-${activeExercise.id}`}
                              type="button"
                              size="lg"
                              className="kanam-data-next-exercise-btn shadow-md"
                              onClick={goToNextExercise}
                            >
                              Next exercise
                              <ChevronRight className="kanam-data-next-chevron h-4 w-4" />
                            </Button>
                          ) : null}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setActiveSql(prepareExerciseSql(activeExercise.starterSql))
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
                              className={cn(
                                "rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
                              )}
                              role="alert"
                            >
                              {lastFeedback}
                            </p>
                          )
                        ) : null}

                        {terminalOutput ? (
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
                        ) : null}

                        {runError ? <p className="text-sm text-red-600">{runError}</p> : null}

                        <div>
                          <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">
                            Query results
                          </p>
                          <ResultTable result={queryResult} />
                        </div>

                        <ChartPanel result={queryResult} config={lesson.chartConfig} />
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
                      <p className="mt-4 text-sm text-slate-600">
                        You nailed every SQL exercise — rows, columns, and queries unlocked.
                      </p>
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
  );
}
