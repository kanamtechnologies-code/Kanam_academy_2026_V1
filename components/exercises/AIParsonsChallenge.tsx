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
  completed: boolean;
  onComplete: () => void;
};

/** Reorder-lines challenge with its own Check button (no code runner). */
export function AIParsonsChallenge({
  prompt,
  lines,
  languageLabel = "steps",
  explanation,
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
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950" role="alert">
          <p className="font-semibold">Order isn&apos;t fully right yet.</p>
          <p className="mt-1">
            Steps pulsing green are already correct — leave those and move the others, then check
            again.
          </p>
        </div>
      ) : null}

      {feedback === "right" ? (
        <div className="kanam-data-success-banner" role="status">
          <CheckCircle2 className="kanam-data-success-icon" aria-hidden />
          <div>
            <p className="kanam-data-success-title">Order locked in!</p>
            <p className="kanam-data-success-body">{explanation}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
