"use client";

import * as React from "react";
import { CheckCircle2, GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type MatchPair = { id: string; left: string; right: string };

export type OrderItem = { id: string; label: string };

type MatchActivityProps = {
  mode: "match";
  prompt: string;
  pairs: MatchPair[];
  /** Shuffled rights are derived client-side; pass stable pair ids. */
  completed: boolean;
  onComplete: () => void;
};

type OrderActivityProps = {
  mode: "order";
  prompt: string;
  /** Items in the correct order. */
  items: OrderItem[];
  completed: boolean;
  onComplete: () => void;
};

export type MatchOrderProps = MatchActivityProps | OrderActivityProps;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Click-to-match pairs or reorder a sequence (mobile-friendly, no drag required). */
export function MatchOrder(props: MatchOrderProps) {
  if (props.mode === "match") {
    return <MatchPanel {...props} />;
  }
  return <OrderPanel {...props} />;
}

function MatchPanel({ prompt, pairs, completed, onComplete }: MatchActivityProps) {
  const lefts = React.useMemo(() => pairs.map((p) => ({ id: p.id, label: p.left })), [pairs]);
  const [rights, setRights] = React.useState(() =>
    shuffle(pairs.map((p) => ({ id: p.id, label: p.right })))
  );
  const [selectedLeft, setSelectedLeft] = React.useState<string | null>(null);
  const [matched, setMatched] = React.useState<Set<string>>(() => new Set());
  const [feedback, setFeedback] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (completed) setMatched(new Set(pairs.map((p) => p.id)));
  }, [completed, pairs]);

  const tryMatch = (rightId: string) => {
    if (completed || matched.has(rightId)) return;
    if (!selectedLeft) {
      setFeedback("Pick an item on the left first, then match it on the right.");
      return;
    }
    if (selectedLeft === rightId) {
      const next = new Set(matched).add(rightId);
      setMatched(next);
      setSelectedLeft(null);
      setFeedback("Nice match!");
      if (next.size === pairs.length) onComplete();
    } else {
      setFeedback("Not a match — try another pair.");
      setSelectedLeft(null);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-slate-900">{prompt}</p>
      {feedback ? (
        <p className="text-sm font-medium text-slate-700" role="status">
          {feedback}
        </p>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Terms</p>
          {lefts.map((item) => {
            const done = matched.has(item.id);
            return (
              <button
                key={item.id}
                type="button"
                disabled={done || completed}
                onClick={() => {
                  setFeedback(null);
                  setSelectedLeft(item.id);
                }}
                className={cn(
                  "flex min-h-11 w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                  done
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : selectedLeft === item.id
                      ? "border-[var(--brand)] bg-[var(--brand)]/10 text-[var(--brand-2)]"
                      : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
                )}
              >
                {done ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : null}
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Definitions</p>
            {!completed ? (
              <button
                type="button"
                className="text-xs font-semibold text-slate-500 underline"
                onClick={() => setRights(shuffle(pairs.map((p) => ({ id: p.id, label: p.right }))))}
              >
                Shuffle
              </button>
            ) : null}
          </div>
          {rights.map((item) => {
            const done = matched.has(item.id);
            return (
              <button
                key={item.id}
                type="button"
                disabled={done || completed}
                onClick={() => tryMatch(item.id)}
                className={cn(
                  "flex min-h-11 w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors",
                  done
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
                )}
              >
                {done ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : null}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OrderPanel({ prompt, items, completed, onComplete }: OrderActivityProps) {
  const correctIds = React.useMemo(() => items.map((i) => i.id), [items]);
  const [order, setOrder] = React.useState(() => shuffle(items));
  const [feedback, setFeedback] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (completed) setOrder(items);
  }, [completed, items]);

  const move = (index: number, dir: -1 | 1) => {
    if (completed) return;
    const nextIndex = index + dir;
    if (nextIndex < 0 || nextIndex >= order.length) return;
    const next = [...order];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    setOrder(next);
    setFeedback(null);
  };

  const check = () => {
    const ok = order.every((item, i) => item.id === correctIds[i]);
    if (ok) {
      setFeedback("Correct order!");
      onComplete();
    } else {
      const firstWrong = order.findIndex((item, i) => item.id !== correctIds[i]);
      setFeedback(
        firstWrong === 0
          ? "Not quite — start by placing the first step correctly."
          : `Close — check step ${firstWrong + 1} and the ones after it.`
      );
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-slate-900">{prompt}</p>
      {feedback ? (
        <p className="text-sm font-medium text-slate-700" role="status">
          {feedback}
        </p>
      ) : null}
      <ol className="space-y-2">
        {order.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2",
              completed && "border-emerald-300 bg-emerald-50"
            )}
          >
            <GripVertical className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            <span className="min-w-0 flex-1 text-sm font-semibold text-slate-900">
              <span className="mr-2 text-slate-400">{index + 1}.</span>
              {item.label}
            </span>
            {!completed ? (
              <div className="flex shrink-0 gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 px-2"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  aria-label={`Move ${item.label} up`}
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 px-2"
                  disabled={index === order.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label={`Move ${item.label} down`}
                >
                  ↓
                </Button>
              </div>
            ) : (
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
            )}
          </li>
        ))}
      </ol>
      {!completed ? (
        <Button type="button" className="h-11" onClick={check}>
          Check order
        </Button>
      ) : null}
    </div>
  );
}
