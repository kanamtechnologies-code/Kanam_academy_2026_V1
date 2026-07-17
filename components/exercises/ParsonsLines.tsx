"use client";

import * as React from "react";
import { Reorder, useDragControls } from "framer-motion";
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

type LineItem = { id: string; line: string };

type ParsonsLinesProps = {
  /** Correct line order (including blank lines as "" if needed). */
  lines: string[];
  /** Called whenever the learner reorders; parent stores assembled source. */
  onAssembledChange: (code: string) => void;
  /** Optional: report ordered line ids (L0, L1, …) for slot-level check feedback. */
  onOrderIdsChange?: (ids: string[]) => void;
  /**
   * After Check: true = this slot is in the correct position (pulses green).
   * null/undefined = no per-slot feedback yet.
   */
  slotCorrect?: boolean[] | null;
  disabled?: boolean;
  languageLabel?: string;
  /** Overrides the default “press Run & check” hint. */
  checkHint?: string;
  /** Change this (e.g. from Reset) to force a fresh shuffle. */
  resetToken?: number | string;
};

function ParsonsRow({
  item,
  index,
  slotOk,
  disabled,
  isCorrectOrder,
  isDragging,
  onDragStart,
  onDragEnd,
}: {
  item: LineItem;
  index: number;
  slotOk: boolean;
  disabled?: boolean;
  isCorrectOrder: boolean;
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
      drag={!disabled}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileDrag={{ scale: 1.03, zIndex: 30 }}
      className={cn(
        "relative flex list-none items-stretch gap-2 rounded-xl border bg-white px-2 py-2",
        slotOk
          ? "animate-[kanamOrderCorrectPulse_1.1s_ease-in-out_infinite] border-emerald-400 bg-emerald-50"
          : disabled && isCorrectOrder
            ? "border-emerald-300"
            : "border-slate-200",
        isDragging &&
          "border-[var(--accent)] bg-[rgb(var(--accent-rgb)/0.28)] shadow-[0_10px_28px_rgba(15,23,42,0.18)] ring-2 ring-[rgb(var(--accent-rgb)/0.85)]"
      )}
      style={{ position: "relative" }}
    >
      {!disabled ? (
        <button
          type="button"
          className={cn(
            "flex touch-none items-center rounded-lg px-1.5 text-slate-400 transition-colors",
            "hover:bg-slate-100 hover:text-[var(--brand-2)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb)/0.7)]",
            isDragging && "cursor-grabbing text-[var(--accent)]"
          )}
          aria-label={`Drag to reorder line ${index + 1}`}
          onPointerDown={(event) => {
            event.preventDefault();
            controls.start(event);
          }}
          style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none" }}
        >
          <GripVertical className="h-4 w-4" aria-hidden />
        </button>
      ) : (
        <div className="flex items-center pl-1 text-slate-400">
          <GripVertical className="h-4 w-4" aria-hidden />
        </div>
      )}
      <pre
        className={cn(
          "min-w-0 flex-1 overflow-x-auto whitespace-pre-wrap rounded-lg px-3 py-2 font-mono text-xs",
          slotOk
            ? "bg-emerald-950 text-emerald-100"
            : isDragging
              ? "bg-slate-900 text-[var(--accent)]"
              : "bg-slate-900 text-emerald-100"
        )}
      >
        {item.line || " "}
      </pre>
      {slotOk || (disabled && isCorrectOrder) ? (
        <CheckCircle2
          className="m-auto h-4 w-4 text-emerald-700"
          aria-label="Correct position"
        />
      ) : null}
    </Reorder.Item>
  );
}

/** Reorder scrambled lines into a working program/query (Parsons problem). */
export function ParsonsLines({
  lines,
  onAssembledChange,
  onOrderIdsChange,
  slotCorrect = null,
  disabled,
  languageLabel = "lines",
  checkHint = "Run & check",
  resetToken = 0,
}: ParsonsLinesProps) {
  const correct = React.useMemo(
    () => lines.map((line, index) => ({ id: `L${index}`, line })),
    [lines]
  );
  const [order, setOrder] = React.useState<LineItem[]>(() => shuffle(correct));
  const [draggingId, setDraggingId] = React.useState<string | null>(null);

  const onAssembledChangeRef = React.useRef(onAssembledChange);
  onAssembledChangeRef.current = onAssembledChange;
  const onOrderIdsChangeRef = React.useRef(onOrderIdsChange);
  onOrderIdsChangeRef.current = onOrderIdsChange;

  const assemble = React.useCallback(
    (next: LineItem[]) => next.map((item) => item.line).join("\n"),
    []
  );

  React.useEffect(() => {
    onAssembledChangeRef.current(assemble(order));
    onOrderIdsChangeRef.current?.(order.map((item) => item.id));
  }, [order, assemble]);

  const linesKey = lines.join("\n");
  React.useEffect(() => {
    setOrder(shuffle(correct));
    setDraggingId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reshuffle when line set or reset changes
  }, [linesKey, resetToken]);

  const isCorrectOrder = order.every((item, i) => item.id === correct[i]?.id);
  const showSlots = Array.isArray(slotCorrect) && slotCorrect.length === order.length;

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
            onClick={() => {
              setOrder(shuffle(correct));
              setDraggingId(null);
            }}
          >
            Shuffle again
          </Button>
        ) : null}
      </div>
      <p className="text-sm text-slate-700">
        Drag the {languageLabel} into the right order, then press <strong>{checkHint}</strong>.
        {showSlots ? (
          <span className="mt-1 block text-emerald-800">
            Green-pulsing steps are already in the correct spot.
          </span>
        ) : null}
      </p>
      <Reorder.Group
        as="ol"
        axis="y"
        values={order}
        onReorder={setOrder}
        className="space-y-2"
      >
        {order.map((item, index) => {
          const slotOk = showSlots ? Boolean(slotCorrect[index]) : false;
          return (
            <ParsonsRow
              key={item.id}
              item={item}
              index={index}
              slotOk={slotOk}
              disabled={disabled}
              isCorrectOrder={isCorrectOrder}
              isDragging={draggingId === item.id}
              onDragStart={() => setDraggingId(item.id)}
              onDragEnd={() => setDraggingId(null)}
            />
          );
        })}
      </Reorder.Group>
    </div>
  );
}
