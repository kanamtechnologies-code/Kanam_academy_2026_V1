"use client";

import * as React from "react";
import { CheckCircle2, GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  // Avoid accidentally starting in the correct order.
  if (copy.length > 1 && copy.every((item, idx) => item === arr[idx])) {
    [copy[0], copy[1]] = [copy[1], copy[0]];
  }
  return copy;
}

type ParsonsLinesProps = {
  /** Correct line order (including blank lines as "" if needed). */
  lines: string[];
  /** Called whenever the learner reorders; parent stores assembled source. */
  onAssembledChange: (code: string) => void;
  disabled?: boolean;
  languageLabel?: string;
  /** Overrides the default “press Run & check” hint. */
  checkHint?: string;
};

/** Reorder scrambled lines into a working program/query (Parsons problem). */
export function ParsonsLines({
  lines,
  onAssembledChange,
  disabled,
  languageLabel = "lines",
  checkHint = "Run & check",
}: ParsonsLinesProps) {
  const correct = React.useMemo(
    () => lines.map((line, index) => ({ id: `L${index}`, line })),
    [lines]
  );
  const [order, setOrder] = React.useState(() => shuffle(correct));

  const onAssembledChangeRef = React.useRef(onAssembledChange);
  onAssembledChangeRef.current = onAssembledChange;

  const assemble = React.useCallback(
    (next: typeof order) => next.map((item) => item.line).join("\n"),
    []
  );

  React.useEffect(() => {
    onAssembledChangeRef.current(assemble(order));
  }, [order, assemble]);

  const linesKey = lines.join("\n");
  React.useEffect(() => {
    setOrder(shuffle(correct));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reshuffle when line set changes
  }, [linesKey]);

  const move = (index: number, dir: -1 | 1) => {
    if (disabled) return;
    const nextIndex = index + dir;
    if (nextIndex < 0 || nextIndex >= order.length) return;
    const next = [...order];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    setOrder(next);
  };

  const isCorrectOrder = order.every((item, i) => item.id === correct[i]?.id);

  return (
    <div className="space-y-3 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-black uppercase tracking-wide text-indigo-900">
          Reorder the {languageLabel}
        </p>
        {!disabled ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => setOrder(shuffle(correct))}
          >
            Shuffle again
          </Button>
        ) : null}
      </div>
      <p className="text-sm text-slate-700">
        Put the {languageLabel} in the right order, then press <strong>{checkHint}</strong>.
      </p>
      <ol className="space-y-2">
        {order.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "flex items-stretch gap-2 rounded-xl border bg-white px-2 py-2",
              disabled && isCorrectOrder
                ? "border-emerald-300"
                : "border-slate-200"
            )}
          >
            <div className="flex items-center pl-1 text-slate-400">
              <GripVertical className="h-4 w-4" aria-hidden />
            </div>
            <pre className="min-w-0 flex-1 overflow-x-auto whitespace-pre-wrap rounded-lg bg-slate-900 px-3 py-2 font-mono text-xs text-emerald-100">
              {item.line || " "}
            </pre>
            {!disabled ? (
              <div className="flex flex-col justify-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 px-2"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  aria-label="Move line up"
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 px-2"
                  disabled={index === order.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label="Move line down"
                >
                  ↓
                </Button>
              </div>
            ) : (
              <CheckCircle2 className="m-auto h-4 w-4 text-emerald-700" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
