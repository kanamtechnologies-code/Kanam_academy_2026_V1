"use client";

import * as React from "react";
import { CheckCircle2, ListOrdered } from "lucide-react";

import { ParsonsLines } from "@/components/exercises/ParsonsLines";
import { Button } from "@/components/ui/button";

export type AIParsonsChallengeProps = {
  prompt: string;
  /** Correct line order. */
  lines: string[];
  languageLabel?: string;
  explanation: string;
  /** Teaching notes aligned to each correct line — shown after success. */
  lineExplanations?: string[];
  completed: boolean;
  onComplete: () => void;
};

/** Reorder-lines challenge with its own Check button (no code runner). */
export function AIParsonsChallenge({
  prompt,
  lines,
  languageLabel = "steps",
  explanation,
  lineExplanations,
  completed,
  onComplete,
}: AIParsonsChallengeProps) {
  const [assembled, setAssembled] = React.useState("");
  const [orderIds, setOrderIds] = React.useState<string[]>([]);
  const [slotCorrect, setSlotCorrect] = React.useState<boolean[] | null>(null);
  const [feedback, setFeedback] = React.useState<"idle" | "wrong" | "right">(
    completed ? "right" : "idle"
  );

  const correctIds = React.useMemo(
    () => lines.map((_, index) => `L${index}`),
    [lines]
  );

  React.useEffect(() => {
    if (completed) {
      setFeedback("right");
      setSlotCorrect(correctIds.map(() => true));
    }
  }, [completed, correctIds]);

  const correct = lines.join("\n");
  const showTeaching = feedback === "right" || completed;
  const hasStepWhy =
    Array.isArray(lineExplanations) && lineExplanations.length === lines.length;

  const check = () => {
    if (completed) return;
    const slots = orderIds.map((id, i) => id === correctIds[i]);
    setSlotCorrect(slots);
    if (assembled.trim() === correct.trim() || slots.every(Boolean)) {
      setFeedback("right");
      onComplete();
    } else {
      setFeedback("wrong");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <ListOrdered className="mt-0.5 h-4 w-4 shrink-0 text-indigo-700" />
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-indigo-900">Reorder lines</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{prompt}</p>
        </div>
      </div>

      <ParsonsLines
        lines={lines}
        languageLabel={languageLabel}
        disabled={completed || feedback === "right"}
        slotCorrect={slotCorrect}
        onAssembledChange={(code) => {
          setAssembled(code);
          if (feedback !== "right") {
            setFeedback("idle");
            setSlotCorrect(null);
          }
        }}
        onOrderIdsChange={setOrderIds}
        checkHint="Check order"
      />

      {feedback !== "right" && !completed ? (
        <Button type="button" className="h-11" onClick={check}>
          Check order
        </Button>
      ) : null}

      {feedback === "wrong" ? (
        <div className="kanam-data-retry-banner" role="alert">
          <div>
            <p className="kanam-data-retry-title">Order isn&apos;t fully right yet.</p>
            <p className="kanam-data-retry-body">
              Steps pulsing green are already correct — leave those and move the others, then check
              again.
            </p>
          </div>
        </div>
      ) : null}

      {showTeaching ? (
        <div className="kanam-data-success-banner" role="status">
          <CheckCircle2 className="kanam-data-success-icon" aria-hidden />
          <div className="min-w-0 space-y-3">
            <div>
              <p className="kanam-data-success-title">Order locked in!</p>
              <p className="kanam-data-success-body">{explanation}</p>
            </div>
            {hasStepWhy ? (
              <div className="rounded-xl border border-emerald-200/80 bg-white/80 p-3 sm:p-4">
                <p className="text-xs font-black uppercase tracking-wide text-emerald-900">
                  Why this order
                </p>
                <ol className="mt-3 space-y-3">
                  {lines.map((line, index) => (
                    <li key={`why-${index}`} className="text-sm text-slate-800">
                      <p className="font-semibold text-slate-900">
                        <span className="mr-1.5 text-emerald-700">{index + 1}.</span>
                        {line}
                      </p>
                      <p className="mt-1 leading-relaxed text-slate-700">
                        <span className="font-semibold text-emerald-800">Why: </span>
                        {lineExplanations[index]}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
