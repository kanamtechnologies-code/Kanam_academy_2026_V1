"use client";

import * as React from "react";
import { Reorder, useDragControls } from "framer-motion";
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
  /** Teaching notes aligned to each correct item — shown after success. */
  itemExplanations?: string[];
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

/** Click-to-match pairs or drag-to-reorder a sequence (touch + mouse). */
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
      {/* Fixed-height status so feedback never shifts the page */}
      <p
        className={cn(
          "min-h-10 text-sm font-medium leading-5",
          feedback ? "text-slate-700" : "text-transparent"
        )}
        role="status"
        aria-live="polite"
      >
        {feedback ?? "\u00a0"}
      </p>
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
                <CheckCircle2
                  className={cn(
                    "h-4 w-4 shrink-0",
                    done ? "text-emerald-700" : "invisible"
                  )}
                  aria-hidden={!done}
                />
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          <div className="flex min-h-5 items-center justify-between">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Definitions</p>
            <button
              type="button"
              className={cn(
                "text-xs font-semibold text-slate-500 underline",
                completed && "invisible pointer-events-none"
              )}
              tabIndex={completed ? -1 : undefined}
              aria-hidden={completed}
              onClick={() => setRights(shuffle(pairs.map((p) => ({ id: p.id, label: p.right }))))}
            >
              Shuffle
            </button>
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
                <CheckCircle2
                  className={cn(
                    "h-4 w-4 shrink-0",
                    done ? "text-emerald-700" : "invisible"
                  )}
                  aria-hidden={!done}
                />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OrderRow({
  item,
  index,
  slotOk,
  locked,
  isDragging,
  onDragStart,
  onDragEnd,
}: {
  item: OrderItem;
  index: number;
  slotOk: boolean;
  locked: boolean;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      as="li"
      dragListener={false}
      dragControls={controls}
      drag={!locked}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileDrag={{ scale: 1.03, zIndex: 30 }}
      className={cn(
        "relative flex list-none items-center gap-2 rounded-xl border bg-white px-3 py-2",
        slotOk
          ? "animate-[kanamOrderCorrectPulse_1.1s_ease-in-out_infinite] border-emerald-400 bg-emerald-50"
          : locked
            ? "border-emerald-300 bg-emerald-50"
            : "border-slate-200",
        isDragging &&
          "border-[var(--accent)] bg-[rgb(var(--accent-rgb)/0.28)] shadow-[0_10px_28px_rgba(15,23,42,0.18)] ring-2 ring-[rgb(var(--accent-rgb)/0.85)]"
      )}
      style={{ position: "relative" }}
    >
      {!locked ? (
        <button
          type="button"
          className={cn(
            "flex shrink-0 touch-none items-center rounded-lg p-1 text-slate-400 transition-colors",
            "hover:bg-slate-100 hover:text-[var(--brand-2)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb)/0.7)]",
            isDragging && "cursor-grabbing text-[var(--accent)]"
          )}
          aria-label={`Drag to reorder: ${item.label}`}
          onPointerDown={(event) => {
            event.preventDefault();
            controls.start(event);
          }}
          style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none" }}
        >
          <GripVertical className="h-4 w-4" aria-hidden />
        </button>
      ) : (
        <GripVertical className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
      )}
      <span
        className={cn(
          "min-w-0 flex-1 text-sm font-semibold",
          isDragging ? "text-[var(--brand-2)]" : "text-slate-900"
        )}
      >
        <span className={cn("mr-2", isDragging ? "text-[var(--accent)]" : "text-slate-400")}>
          {index + 1}.
        </span>
        {item.label}
      </span>
      {slotOk || locked ? (
        <CheckCircle2
          className="h-4 w-4 shrink-0 text-emerald-700"
          aria-label={slotOk ? "Correct position" : undefined}
        />
      ) : null}
    </Reorder.Item>
  );
}

function OrderPanel({
  prompt,
  items,
  itemExplanations,
  completed,
  onComplete,
}: OrderActivityProps) {
  const correctIds = React.useMemo(() => items.map((i) => i.id), [items]);
  const [order, setOrder] = React.useState(() => shuffle(items));
  const [feedback, setFeedback] = React.useState<string | null>(null);
  const [slotCorrect, setSlotCorrect] = React.useState<boolean[] | null>(null);
  const [checked, setChecked] = React.useState(completed);
  const [draggingId, setDraggingId] = React.useState<string | null>(null);
  const hasStepWhy =
    Array.isArray(itemExplanations) && itemExplanations.length === items.length;

  React.useEffect(() => {
    if (completed) {
      setOrder(items);
      setChecked(true);
      setSlotCorrect(items.map(() => true));
      setDraggingId(null);
    }
  }, [completed, items]);

  const locked = completed || checked;

  const check = () => {
    const slots = order.map((item, i) => item.id === correctIds[i]);
    setSlotCorrect(slots);
    const ok = slots.every(Boolean);
    if (ok) {
      setFeedback("Correct order!");
      setChecked(true);
      onComplete();
    } else {
      const correctCount = slots.filter(Boolean).length;
      setFeedback(
        correctCount === 0
          ? "Not quite — none of the steps are in the right spot yet. Green will light up when a step is correct."
          : `${correctCount} step${correctCount === 1 ? "" : "s"} pulsing green ${
              correctCount === 1 ? "is" : "are"
            } already correct — keep those and move the others.`
      );
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-slate-900">{prompt}</p>
      {!locked ? (
        <p className="text-sm text-slate-600">Drag the steps into order, then check.</p>
      ) : null}
      {feedback && !checked ? (
        <p className="text-sm font-medium text-slate-700" role="status">
          {feedback}
        </p>
      ) : null}
      <Reorder.Group
        as="ol"
        axis="y"
        values={order}
        onReorder={(next) => {
          setOrder(next);
          setFeedback(null);
          setSlotCorrect(null);
        }}
        className="space-y-2"
      >
        {order.map((item, index) => {
          const slotOk = Boolean(slotCorrect?.[index]);
          return (
            <OrderRow
              key={item.id}
              item={item}
              index={index}
              slotOk={slotOk}
              locked={locked}
              isDragging={draggingId === item.id}
              onDragStart={() => setDraggingId(item.id)}
              onDragEnd={() => setDraggingId(null)}
            />
          );
        })}
      </Reorder.Group>
      {!completed && !checked ? (
        <Button type="button" className="h-11" onClick={check}>
          Check order
        </Button>
      ) : null}
      {checked || completed ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
          <p className="font-semibold text-emerald-900">Correct order!</p>
          {hasStepWhy ? (
            <div className="mt-3 rounded-xl border border-emerald-200/80 bg-white/80 p-3 sm:p-4">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-900">
                Why this order
              </p>
              <ol className="mt-3 space-y-3">
                {items.map((item, index) => (
                  <li key={`why-${item.id}`} className="text-sm text-slate-800">
                    <p className="font-semibold text-slate-900">
                      <span className="mr-1.5 text-emerald-700">{index + 1}.</span>
                      {item.label}
                    </p>
                    <p className="mt-1 leading-relaxed text-slate-700">
                      <span className="font-semibold text-emerald-800">Why: </span>
                      {itemExplanations[index]}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
