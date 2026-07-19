"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Flag,
  Lock,
  Trophy,
} from "lucide-react";

import { LessonAccessGate } from "@/components/lesson/LessonAccessGate";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import {
  apCspExamLockReason,
  isApCspExamUnlocked,
} from "@/lib/apCspExams/access";
import {
  isMultiSelect,
  scoreExam,
  type ApCspExamConfig,
} from "@/lib/apCspExams/types";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import {
  getGuestCompletedIds,
  isGuestMode,
  markGuestLessonComplete,
} from "@/lib/guestProgress";
import { cn } from "@/lib/utils";

const BIG_IDEA_LABEL: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "Creative Development",
  2: "Data",
  3: "Algorithms & Programming",
  4: "Systems & Networks",
  5: "Impact of Computing",
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

async function fetchCompletedIds(): Promise<string[]> {
  if (isGuestMode()) return getGuestCompletedIds();
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return [];
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return [];
  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("user_id", uid)
    .maybeSingle();
  if (!student?.id) return [];
  const { data: rows } = await supabase
    .from("lesson_progress")
    .select("lesson_id, success")
    .eq("student_id", student.id);
  return (rows ?? [])
    .filter((r) => Boolean(r?.success))
    .map((r) => String(r.lesson_id));
}

export function ApCspExamCanvas({ exam }: { exam: ApCspExamConfig }) {
  return (
    <LessonAccessGate lessonId={exam.id}>
      <ApCspExamInner exam={exam} />
    </LessonAccessGate>
  );
}

function ApCspExamInner({ exam }: { exam: ApCspExamConfig }) {
  const [phase, setPhase] = React.useState<"loading" | "locked" | "intro" | "exam" | "results">(
    "loading"
  );
  const [lockReason, setLockReason] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, number[]>>({});
  const [flagged, setFlagged] = React.useState<Set<string>>(new Set());
  const [studentDbId, setStudentDbId] = React.useState<string | null>(null);
  const [deviceId, setDeviceId] = React.useState<string>("");
  const [userId, setUserId] = React.useState<string>("");

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const completed = await fetchCompletedIds();
        if (cancelled) return;
        if (!isApCspExamUnlocked(exam.id, completed)) {
          setLockReason(apCspExamLockReason(exam.id, completed));
          setPhase("locked");
          return;
        }
        setPhase("intro");
      } catch {
        if (!cancelled) {
          setLockReason("Could not verify unlock status. Try again from the dashboard.");
          setPhase("locked");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [exam.id]);

  React.useEffect(() => {
    try {
      const key = "kanam.deviceId";
      let id = window.localStorage.getItem(key);
      if (!id) {
        id = crypto.randomUUID();
        window.localStorage.setItem(key, id);
      }
      setDeviceId(id);
    } catch {
      setDeviceId("unknown");
    }
    (async () => {
      if (isGuestMode()) {
        setUserId("guest");
        return;
      }
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
    })();
  }, []);

  const question = exam.questions[index];
  const answeredCount = exam.questions.filter((q) => (answers[q.id] ?? []).length > 0).length;
  const multi = question ? isMultiSelect(question) : false;
  const selected = question ? answers[question.id] ?? [] : [];

  const toggleChoice = (choiceIndex: number) => {
    if (!question || phase !== "exam") return;
    setAnswers((prev) => {
      const cur = prev[question.id] ?? [];
      if (multi) {
        const has = cur.includes(choiceIndex);
        let next = has ? cur.filter((i) => i !== choiceIndex) : [...cur, choiceIndex];
        if (next.length > 2) next = next.slice(-2);
        return { ...prev, [question.id]: next };
      }
      return { ...prev, [question.id]: [choiceIndex] };
    });
  };

  const toggleFlag = () => {
    if (!question) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(question.id)) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
  };

  const markComplete = React.useCallback(
    async (payload: Record<string, unknown>) => {
      if (isGuestMode()) {
        markGuestLessonComplete(exam.id);
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
          lesson_id: exam.id,
          event_type: "lesson_success",
          payload,
        });
        await supabase.from("lesson_progress").upsert(
          {
            student_id: studentDbId,
            lesson_id: exam.id,
            success: true,
            success_at: now,
            last_event_at: now,
            has_run: true,
          } as never,
          { onConflict: "student_id,lesson_id" }
        );
      } catch {
        // ignore
      }
    },
    [deviceId, exam.id, studentDbId, userId]
  );

  const submit = async () => {
    const scored = scoreExam(exam, answers);
    setPhase("results");
    await markComplete({
      kind: "ap_csp_exam",
      slug: exam.slug,
      correct: scored.correct,
      total: scored.total,
      percent: scored.percent,
    });
  };

  if (phase === "loading") {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <p className="text-sm font-semibold text-slate-600">Checking exam unlock…</p>
      </div>
    );
  }

  if (phase === "locked") {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-10">
        <Notice variant="lock" title="Assessment locked">
          {lockReason}
        </Notice>
        <Button asChild variant="secondary">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
        </Button>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
        <div className="space-y-2">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-2)]">
            AP CSP Prep · Assessment
          </p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">{exam.title}</h1>
          <p className="text-base text-slate-600">{exam.subtitle}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="flex items-center gap-2 text-sm font-black text-slate-900">
            <ClipboardList className="h-4 w-4 text-[var(--brand)]" />
            How this mirrors the real exam
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
            <li>
              <strong>{exam.questions.length} multiple-choice</strong> items across all five Big
              Ideas (weighted toward Algorithms & Programming and Impact).
            </li>
            <li>
              Uses <strong>College Board–style pseudocode</strong> (`←`, `DISPLAY`, `MOD`,
              `RANDOM`, 1-based lists).
            </li>
            <li>
              Includes <strong>select-two</strong> items like the end of the Bluebook MCQ section —
              both answers must be right for credit.
            </li>
            <li>
              Suggested time: <strong>~{exam.suggestedMinutes} minutes</strong> (timer not enforced —
              practice pacing yourself).
            </li>
            <li>
              No guessing penalty — answer every question. Kanam prep only; not an official AP exam
              or score report.
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="font-bold" onClick={() => setPhase("exam")}>
            Begin {exam.slug === "final" ? "final exam" : "practice test"}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/dashboard">Cancel</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const scored = scoreExam(exam, answers);
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/5 p-6">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--brand-2)]">
            <Trophy className="h-4 w-4" />
            Results · +{exam.xpReward} XP · {exam.badge}
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-900">
            {scored.correct} / {scored.total}{" "}
            <span className="text-[var(--brand)]">({scored.percent}%)</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            This is Kanam practice feedback — not an official AP score. Use the Big Idea breakdown
            to target review before exam day.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {([1, 2, 3, 4, 5] as const).map((bi) => {
            const row = scored.byBigIdea[bi];
            const pct = row.total ? Math.round((row.correct / row.total) * 100) : 0;
            return (
              <div
                key={bi}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
              >
                <p className="font-bold text-slate-900">
                  BI {bi} · {BIG_IDEA_LABEL[bi]}
                </p>
                <p className="mt-1 text-slate-600">
                  {row.correct}/{row.total} ({pct}%)
                </p>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900">Review</h3>
          {scored.results.map((r, i) => (
            <div
              key={r.question.id}
              className={cn(
                "rounded-xl border p-4",
                r.isCorrect
                  ? "border-emerald-200 bg-emerald-50/50"
                  : "border-rose-200 bg-rose-50/40"
              )}
            >
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Q{i + 1} · BI {r.question.bigIdea} · {r.question.topic}{" "}
                {r.isCorrect ? "· Correct" : "· Incorrect"}
              </p>
              <p className="mt-2 text-[15px] font-semibold leading-snug text-slate-900">
                {renderInline(r.question.stem)}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {r.question.choices.map((c, ci) => {
                  const wasSelected = r.selected.includes(ci);
                  const isRight = r.question.correctIndexes.includes(ci);
                  return (
                    <li
                      key={ci}
                      className={cn(
                        "rounded-lg px-2 py-1",
                        isRight && "bg-emerald-100 font-semibold text-emerald-950",
                        wasSelected && !isRight && "bg-rose-100 text-rose-950"
                      )}
                    >
                      {String.fromCharCode(65 + ci)}. {renderInline(c)}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {renderInline(r.question.explanation)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="font-bold">
            <Link href="/dashboard">
              <CheckCircle2 className="h-4 w-4" />
              Back to dashboard
            </Link>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              setAnswers({});
              setFlagged(new Set());
              setIndex(0);
              setPhase("intro");
            }}
          >
            Retake (review only — completion already saved)
          </Button>
        </div>
      </div>
    );
  }

  // exam phase
  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--brand-2)]">
            {exam.title}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            Question {index + 1} of {exam.questions.length} · answered {answeredCount}/
            {exam.questions.length}
          </p>
        </div>
        <Button type="button" size="sm" variant="outline" onClick={toggleFlag}>
          <Flag
            className={cn(
              "h-3.5 w-3.5",
              question && flagged.has(question.id) ? "text-amber-600" : "text-slate-500"
            )}
          />
          {question && flagged.has(question.id) ? "Flagged" : "Flag"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {exam.questions.map((q, i) => {
          const done = (answers[q.id] ?? []).length > 0;
          const isFlag = flagged.has(q.id);
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold",
                i === index
                  ? "bg-[var(--brand)] text-white"
                  : done
                    ? "bg-[var(--brand)]/15 text-[var(--brand-2)]"
                    : "bg-slate-100 text-slate-600",
                isFlag && "ring-2 ring-amber-400"
              )}
              aria-label={`Go to question ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {question ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Big Idea {question.bigIdea} · {BIG_IDEA_LABEL[question.bigIdea]} · {question.topic}
            {multi ? " · Select TWO answers" : ""}
          </p>
          <p className="mt-3 text-[17px] font-semibold leading-snug text-slate-900 sm:text-lg">
            {renderInline(question.stem)}
          </p>
          {multi ? (
            <p className="mt-2 text-sm font-medium text-amber-800">
              Select exactly two options. Both must be correct for credit (AP multi-select style).
            </p>
          ) : null}
          <div className="mt-4 grid gap-2">
            {question.choices.map((choice, ci) => {
              const on = selected.includes(ci);
              return (
                <button
                  key={ci}
                  type="button"
                  onClick={() => toggleChoice(ci)}
                  className={cn(
                    "min-h-12 rounded-xl border px-4 py-3 text-left text-[15px] font-medium transition-colors",
                    on
                      ? "border-[var(--brand)] bg-[var(--brand)]/10 text-slate-900"
                      : "border-slate-200 bg-white text-slate-800 hover:border-[var(--brand)]/40"
                  )}
                >
                  <span className="mr-2 font-black text-slate-500">
                    {String.fromCharCode(65 + ci)}.
                  </span>
                  {renderInline(choice)}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        {index < exam.questions.length - 1 ? (
          <Button type="button" onClick={() => setIndex((i) => i + 1)}>
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            className="font-bold"
            onClick={() => {
              if (answeredCount < exam.questions.length) {
                const ok = window.confirm(
                  `You have answered ${answeredCount} of ${exam.questions.length}. Unanswered questions count as incorrect. Submit anyway?`
                );
                if (!ok) return;
              }
              void submit();
            }}
          >
            Submit exam
          </Button>
        )}
      </div>

      <p className="flex items-center gap-1.5 text-xs text-slate-500">
        <Lock className="h-3.5 w-3.5" />
        Answers lock only when you submit. You can change selections until then.
      </p>
    </div>
  );
}
