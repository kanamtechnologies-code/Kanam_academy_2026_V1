"use client";

import * as React from "react";
import { BookOpen } from "lucide-react";

import { cn } from "@/lib/utils";

/** Pulse + short message when someone taps Exercises before finishing the lesson. */
export function useFinishLessonFirstNudge(durationMs = 4200) {
  const [active, setActive] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerNudge = React.useCallback(() => {
    setActive(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(false), durationMs);
  }, [durationMs]);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { nudgeActive: active, triggerNudge };
}

export function finishLessonTabClassName(nudgeActive: boolean) {
  return cn(
    nudgeActive &&
      "bg-rose-50 text-rose-700 ring-2 ring-rose-400/80 animate-[kanamLockedTabPulse_0.9s_ease-in-out_infinite]"
  );
}

/**
 * Floats beside the Exercises tab (slides out to the right on wider screens,
 * drops under the tabs on small screens). Absolutely positioned so the page
 * doesn't jump; stays mounted through the exit animation.
 */
export function FinishLessonFirstHint({
  active,
  whatUnlocks = "the exercises",
}: {
  active: boolean;
  /** e.g. "the exercises", "the knowledge check", "the project" */
  whatUnlocks?: string;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    if (active) {
      setMounted(true);
      const id = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setShown(true));
      });
      return () => window.cancelAnimationFrame(id);
    }

    setShown(false);
    const t = window.setTimeout(() => setMounted(false), 320);
    return () => window.clearTimeout(t);
  }, [active]);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "absolute z-30",
        // Mobile: under the tabs (still overlay — no layout push)
        "left-0 top-[calc(100%+0.55rem)] w-[min(100%,22rem)]",
        // Desktop / tablet: slide out to the right of the tab bar
        "sm:left-full sm:top-1/2 sm:ml-3 sm:w-[21rem]",
        "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "will-change-transform",
        shown
          ? "pointer-events-auto translate-x-0 opacity-100 max-sm:translate-y-0 sm:-translate-y-1/2"
          : "pointer-events-none opacity-0 max-sm:-translate-y-2 sm:translate-x-[-0.9rem] sm:-translate-y-1/2"
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-[18px] border border-rose-200/80 bg-white",
          "shadow-[0_14px_36px_rgba(190,24,93,0.12),0_2px_8px_rgba(15,23,42,0.04)]"
        )}
      >
        <div
          className="h-1 w-full bg-gradient-to-r from-rose-500 via-rose-400 to-[var(--accent)]"
          aria-hidden
        />

        <div className="flex gap-3 px-3.5 pb-3.5 pt-3">
          <span
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
              "bg-gradient-to-br from-rose-50 to-rose-100/90 text-rose-600",
              "ring-1 ring-rose-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
            )}
            aria-hidden
          >
            <BookOpen className="h-4 w-4 stroke-[2.25]" />
          </span>

          <div className="min-w-0 flex-1 border-l-2 border-rose-200/90 pl-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose-600/90">
              Not quite yet
            </p>
            <p className="mt-0.5 text-sm font-extrabold tracking-tight text-slate-900">
              Finish the lesson first
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              Hang on a sec — wrap up the slides, then{" "}
              <span className="font-semibold text-slate-800">{whatUnlocks}</span> will
              open up. You&apos;re doing great.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
