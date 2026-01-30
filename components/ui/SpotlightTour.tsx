"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";

export type SpotlightTourStep = {
  id: string;
  selector: string; // CSS selector for the element to spotlight
  title: string;
  body: string;
  emoji?: string; // e.g. "👇" "✨"
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
  // Fast checks for hidden/inert elements (common with Tabs / responsive layouts)
  if (!el.isConnected) return false;
  if ((el as any).hidden) return false;
  const style = window.getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0")
    return false;
  // If any ancestor is hidden, treat as invisible
  const hiddenAncestor = el.closest("[hidden], [aria-hidden='true']");
  if (hiddenAncestor) return false;
  // Layout box check
  const r = el.getBoundingClientRect();
  if (r.width <= 1 || r.height <= 1) return false;
  return true;
}

function findVisibleTarget(selector: string): HTMLElement | null {
  const all = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
  for (const el of all) {
    if (isActuallyVisible(el)) return el;
  }
  // fallback to first match (might be hidden, but better than null)
  return all[0] ?? null;
}

export const SpotlightTour = React.forwardRef<
  SpotlightTourHandle,
  {
    steps: SpotlightTourStep[];
    storageKey: string;
    defaultOpen?: boolean;
    remember?: boolean;
    showTooltip?: boolean;
    interactive?: boolean; // if true, don't block clicks (pure visual highlight)
    autoCloseMs?: number; // optional auto-close timer
    fadeMs?: number; // fade-out duration in ms
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
  fadeMs = 220,
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
    />
  );
});

const SpotlightTourInner = React.forwardRef<SpotlightTourHandle, {
  steps: SpotlightTourStep[];
  storageKey: string;
  defaultOpen?: boolean;
  remember?: boolean;
  showTooltip?: boolean;
  interactive?: boolean;
  autoCloseMs?: number;
  fadeMs?: number;
}>(function SpotlightTourInner(
  {
    steps,
    storageKey,
    defaultOpen = true,
    remember = true,
    showTooltip = true,
    interactive = false,
    autoCloseMs,
    fadeMs = 220,
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
    startClose();
  }, [storageKey, remember, startClose]);

  const recompute = React.useCallback(() => {
    if (!open) return;
    const el = step ? findVisibleTarget(step.selector) : null;
    if (!el) {
      setRect(null);
      return;
    }
    const pad = step.padding ?? 10;
    const r = el.getBoundingClientRect();
    setRect(safeRect(r, pad));
  }, [open, step]);

  React.useEffect(() => {
    if (!open) return;
    const el = step ? findVisibleTarget(step.selector) : null;
    if (el) {
      // Scroll it into view (works for nested scroll containers too).
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
    const t = window.setTimeout(() => recompute(), 250);
    return () => window.clearTimeout(t);
  }, [open, idx, step, recompute]);

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

  const scrim = "bg-slate-950/65 backdrop-blur-[1px]";
  const z = "z-[9999]";

  const tooltipMaxW = 360;
  const tooltipW = Math.min(tooltipMaxW, Math.max(260, Math.floor(window.innerWidth * 0.34)));

  const tooltip = (() => {
    if (!rect) {
      return {
        top: 24,
        left: 24,
        placement: "floating",
      } as const;
    }
    const margin = 12;
    const preferBelow = rect.bottom + margin + 180 < window.innerHeight;
    const top = preferBelow ? rect.bottom + margin : Math.max(margin, rect.top - margin - 180);
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
      {/* Dim regions (click-blocking) */}
      {rect ? (
        <>
          <div
            className={`fixed left-0 right-0 top-0 ${scrim}`}
            style={{ height: rect.top }}
          />
          <div
            className={`fixed left-0 ${scrim}`}
            style={{ top: rect.top, height: rect.height, width: rect.left }}
          />
          <div
            className={`fixed right-0 ${scrim}`}
            style={{
              top: rect.top,
              height: rect.height,
              width: Math.max(0, window.innerWidth - rect.right),
            }}
          />
          <div
            className={`fixed left-0 right-0 bottom-0 ${scrim}`}
            style={{ top: rect.bottom }}
          />

          {/* Spotlight outline (non-blocking) */}
          <div
            className="pointer-events-none fixed rounded-2xl border-2 border-white/70 animate-[kanamSpotlightPulse_1.1s_ease-in-out_infinite]"
            style={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            }}
          />
        </>
      ) : (
        <div className={`fixed inset-0 ${scrim}`} />
      )}

      {showTooltip ? (
        <div className="fixed" style={{ top: tooltip.top, left: tooltip.left, width: tooltipW }}>
          <div className="pointer-events-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-start gap-3 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)]/12 ring-1 ring-[var(--accent)]/20">
                <div className="text-xl animate-[kanamTourBounce_900ms_ease-in-out_infinite]">
                  {step.emoji ?? "👇"}
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-extrabold tracking-tight text-slate-900">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{step.body}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 px-4 py-3">
              <p className="text-xs font-medium text-slate-500">
                Step {idx + 1} / {steps.length}
              </p>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={markDoneAndClose}>
                  Skip
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIdx((v) => Math.max(0, v - 1))}
                  disabled={idx === 0}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  size="sm"
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

