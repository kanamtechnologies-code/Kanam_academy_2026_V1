"use client";

import * as React from "react";
import { Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";

const DEFAULT_UNLOCK_MS = 2 * 60 * 1000;

function formatCountdown(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Hints stay locked for a short try-first window, then appear only if the
 * learner presses "Get a hint".
 */
export function ExerciseHint({
  exerciseKey,
  hint,
  secondaryHint,
  unlockAfterMs = DEFAULT_UNLOCK_MS,
}: {
  /** Change this when the active exercise changes so the timer resets. */
  exerciseKey: string;
  hint?: string;
  /** Optional second line (e.g. debug category). */
  secondaryHint?: string;
  unlockAfterMs?: number;
}) {
  const [unlocked, setUnlocked] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(() =>
    Math.ceil(unlockAfterMs / 1000)
  );

  React.useEffect(() => {
    setUnlocked(false);
    setRevealed(false);
    setSecondsLeft(Math.ceil(unlockAfterMs / 1000));
    const started = Date.now();
    const id = window.setInterval(() => {
      const leftMs = Math.max(0, unlockAfterMs - (Date.now() - started));
      setSecondsLeft(Math.ceil(leftMs / 1000));
      if (leftMs <= 0) {
        setUnlocked(true);
        window.clearInterval(id);
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [exerciseKey, unlockAfterMs]);

  const body = [hint?.trim(), secondaryHint?.trim()].filter(Boolean).join("\n\n");
  if (!body) return null;

  return (
    <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5">
      {!unlocked ? (
        <p className="text-xs font-medium text-slate-500">
          Hint unlocks in {formatCountdown(secondsLeft)} — try it yourself first.
        </p>
      ) : !revealed ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 gap-1.5"
          onClick={() => setRevealed(true)}
        >
          <Lightbulb className="h-3.5 w-3.5" />
          Get a hint
        </Button>
      ) : (
        <div className="space-y-1 text-xs leading-relaxed text-slate-700">
          <p className="flex items-center gap-1.5 font-bold uppercase tracking-wide text-amber-800">
            <Lightbulb className="h-3.5 w-3.5" />
            Hint
          </p>
          {body.split("\n\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}
