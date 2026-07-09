"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { MousePointerClick } from "lucide-react";

import { Button } from "@/components/ui/button";

export type SpotlightTourStep = {
  id: string;
  selector: string; // CSS selector for the element to spotlight
  title: string;
  body: string;
  /**
   * @deprecated Avoid emojis in UI. Kept for backwards compatibility but no longer rendered.
   */
  emoji?: string;
  icon?: React.ReactNode;
  padding?: number; // extra padding around the highlighted element
};

export type SpotlightTourHandle = {
  start: (opts?: { fromBeginning?: boolean }) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function safeRect(
  r: DOMRect,
  pad: number
): { top: number; left: number; width: number; height: number; right: number; bottom: number } {
  const top = Math.max(0, r.top - pad);
  const left = Math.max(0, r.left - pad);
  const right = Math.min(window.innerWidth, r.right + pad);
  const bottom = Math.min(window.innerHeight, r.bottom + pad);
  const width = Math.max(0, right - left);
  const height = Math.max(0, bottom - top);
  return { top, left, right, bottom, width, height };
}

function isActuallyVisible(el: HTMLElement) {
  if (!el.isConnected) return false;
  if (el.hidden) return false;
  const style = window.getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0")
    return false;
  const hiddenAncestor = el.closest("[hidden], [aria-hidden='true']");
  if (hiddenAncestor) return false;
  const r = el.getBoundingClientRect();
  if (r.width <= 1 || r.height <= 1) return false;
  return true;
}

function findVisibleTarget(selector: string): HTMLElement | null {
  const all = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
  for (const el of all) {
    if (isActuallyVisible(el)) return el;
  }
  return null;
}

export const SpotlightTour = React.forwardRef<
  SpotlightTourHandle,
  {
    steps: SpotlightTourStep[];
    storageKey: string;
    defaultOpen?: boolean;
    remember?: boolean;
    showTooltip?: boolean;
    interactive?: boolean;
    autoCloseMs?: number;
    fadeMs?: number;
    /** @deprecated Kept for API compatibility; spotlight no longer morphs between steps. */
    moveMs?: number;
    recomputeDelayMs?: number;
    onDone?: () => void;
    onStepChange?: (step: SpotlightTourStep, index: number) => void;
  }
>(function SpotlightTour(
  {
    steps,
    storageKey,
    defaultOpen = true,
    remember = true,
    showTooltip = true,
    interactive = false,
    autoCloseMs,
    fadeMs = 180,
    recomputeDelayMs = 120,
    onDone,
    onStepChange,
  },
  ref
) {
  return (
    <SpotlightTourInner
      ref={ref}
      steps={steps}
      storageKey={storageKey}
      defaultOpen={defaultOpen}
      remember={remember}
      showTooltip={showTooltip}
      interactive={interactive}
      autoCloseMs={autoCloseMs}
      fadeMs={fadeMs}
      recomputeDelayMs={recomputeDelayMs}
      onDone={onDone}
      onStepChange={onStepChange}
    />
  );
});

const SpotlightTourInner = React.forwardRef<
  SpotlightTourHandle,
  {
    steps: SpotlightTourStep[];
    storageKey: string;
    defaultOpen?: boolean;
    remember?: boolean;
    showTooltip?: boolean;
    interactive?: boolean;
    autoCloseMs?: number;
    fadeMs?: number;
    recomputeDelayMs?: number;
    onDone?: () => void;
    onStepChange?: (step: SpotlightTourStep, index: number) => void;
  }
>(function SpotlightTourInner(
  {
    steps,
    storageKey,
    defaultOpen = true,
    remember = true,
    showTooltip = true,
    interactive = false,
    autoCloseMs,
    fadeMs = 180,
    recomputeDelayMs = 120,
    onDone,
    onStepChange,
  },
  ref
) {
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  const [idx, setIdx] = React.useState(0);
  const [rect, setRect] = React.useState<{
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  } | null>(null);

  const step = steps[idx];

  React.useEffect(() => {
    if (!open || !step) return;
    onStepChange?.(step, idx);
  }, [open, idx, step, onStepChange]);

  const startClose = React.useCallback(() => {
    if (!fadeMs) {
      setOpen(false);
      setClosing(false);
      return;
    }
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, fadeMs);
  }, [fadeMs]);

  React.useImperativeHandle(
    ref,
    () => ({
      start: (opts) => {
        if (opts?.fromBeginning) setIdx(0);
        setClosing(false);
        setOpen(true);
      },
    }),
    []
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    if (!remember) {
      setOpen(defaultOpen);
      return;
    }
    try {
      const done = window.localStorage.getItem(storageKey) === "1";
      setOpen(!done && defaultOpen);
    } catch {
      setOpen(defaultOpen);
    }
  }, [mounted, storageKey, defaultOpen, remember]);

  React.useEffect(() => {
    if (!open) return;
    if (!autoCloseMs) return;
    const t = window.setTimeout(() => startClose(), autoCloseMs);
    return () => window.clearTimeout(t);
  }, [open, autoCloseMs, startClose]);

  const markDoneAndClose = React.useCallback(() => {
    if (remember) {
      try {
        window.localStorage.setItem(storageKey, "1");
      } catch {
        // ignore
      }
    }
    onDone?.();
    startClose();
  }, [storageKey, remember, onDone, startClose]);

  const recompute = React.useCallback(() => {
    if (!open) return;
    const el = step ? findVisibleTarget(step.selector) : null;
    if (!el) return;
    const pad = step.padding ?? 8;
    const r = el.getBoundingClientRect();
    setRect(safeRect(r, pad));
  }, [open, step]);

  React.useEffect(() => {
    if (!open) return;
    const el = step ? findVisibleTarget(step.selector) : null;
    if (el) {
      // Instant scroll — smooth scroll + remount delay felt laggy between steps.
      el.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });
    }
    const t = window.setTimeout(() => recompute(), recomputeDelayMs);
    return () => window.clearTimeout(t);
  }, [open, idx, step, recompute, recomputeDelayMs]);

  React.useEffect(() => {
    if (!open) return;
    const on = () => recompute();
    window.addEventListener("resize", on);
    window.addEventListener("scroll", on, true);
    return () => {
      window.removeEventListener("resize", on);
      window.removeEventListener("scroll", on, true);
    };
  }, [open, recompute]);

  const visible = open || closing;
  if (!mounted || !visible || !step) return null;

  const scrimColor = "rgba(2, 6, 23, 0.55)";
  const z = "z-[9999]";

  const tooltipMaxW = 360;
  const tooltipW = Math.min(tooltipMaxW, Math.max(280, Math.floor(window.innerWidth - 24)));

  const tooltip = (() => {
    if (!rect) {
      return { top: 24, left: 12, placement: "floating" } as const;
    }
    const margin = 12;
    const preferBelow = rect.bottom + margin + 200 < window.innerHeight;
    const top = preferBelow ? rect.bottom + margin : Math.max(margin, rect.top - margin - 200);
    const left = clamp(rect.left, margin, window.innerWidth - tooltipW - margin);
    return { top, left, placement: preferBelow ? "below" : "above" } as const;
  })();

  const overlay = (
    <div
      className={`fixed inset-0 ${z} transition-opacity ease-out`}
      style={{
        opacity: open && !closing ? 1 : 0,
        transitionDuration: `${fadeMs}ms`,
        pointerEvents: interactive ? "none" : open ? "auto" : "none",
      }}
    >
      {/* Static spotlight hole: dim via one box-shadow, no continuous pulse/morph. */}
      {rect ? (
        <div
          className="pointer-events-none fixed rounded-2xl border-2 border-[rgb(var(--accent-rgb)/0.95)] ring-2 ring-white/80"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            boxShadow: `0 0 0 9999px ${scrimColor}`,
          }}
        />
      ) : (
        <div className="fixed inset-0" style={{ background: scrimColor }} />
      )}

      {showTooltip ? (
        <div
          key={step.id}
          className="fixed animate-[kanamTourTooltipIn_160ms_ease-out]"
          style={{ top: tooltip.top, left: tooltip.left, width: tooltipW }}
        >
          <div
            className={[
              "pointer-events-auto rounded-2xl border bg-white shadow-xl",
              "border-[rgb(var(--accent-rgb)/0.55)]",
              "ring-1 ring-[rgb(var(--accent-rgb)/0.25)]",
              "bg-gradient-to-br from-white via-white to-[rgb(var(--accent-rgb)/0.08)]",
            ].join(" ")}
          >
            <div className="flex items-start gap-3 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)]/12 ring-1 ring-[var(--accent)]/20">
                <div className="text-slate-900">
                  {step.icon ?? <MousePointerClick className="h-5 w-5" />}
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-extrabold tracking-tight text-slate-900">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{step.body}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
              <p className="text-xs font-medium text-slate-500">
                Step {idx + 1} / {steps.length}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={markDoneAndClose}
                  className="min-h-11 border-[rgb(var(--accent-rgb)/0.55)] bg-[rgb(var(--accent-rgb)/0.22)] text-amber-950 hover:bg-[rgb(var(--accent-rgb)/0.30)] focus-visible:ring-[rgb(var(--accent-rgb)/0.35)] sm:min-h-9"
                >
                  Skip
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIdx((v) => Math.max(0, v - 1))}
                  disabled={idx === 0}
                  className="min-h-11 sm:min-h-9"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="min-h-11 sm:min-h-9"
                  onClick={() => {
                    if (idx >= steps.length - 1) {
                      markDoneAndClose();
                    } else {
                      setIdx((v) => Math.min(steps.length - 1, v + 1));
                    }
                  }}
                >
                  {idx >= steps.length - 1 ? "Done" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );

  return createPortal(overlay, document.body);
});

SpotlightTourInner.displayName = "SpotlightTourInner";

SpotlightTour.displayName = "SpotlightTour";
