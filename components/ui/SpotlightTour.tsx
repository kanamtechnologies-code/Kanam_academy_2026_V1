"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ArrowDown, MousePointerClick } from "lucide-react";

import { Button } from "@/components/ui/button";

export type SpotlightTourStep = {
  id: string;
  /** Element to spotlight (can be a larger region). */
  selector: string;
  /**
   * Element the learner should click to continue.
   * Defaults to `selector` when advanceOnClick is true.
   */
  clickSelector?: string;
  title: string;
  body: string;
  /** Concrete action: what to click / do in the highlighted area. */
  action?: string;
  /**
   * When true (default if action is set), clicking the target advances the tour.
   */
  advanceOnClick?: boolean;
  icon?: React.ReactNode;
  padding?: number;
  /**
   * @deprecated Avoid emojis in UI. Kept for backwards compatibility but no longer rendered.
   */
  emoji?: string;
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

/** Render tour copy with **bold** highlights for key terms. */
function renderTourRichText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-slate-900 dark:text-emerald-200">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
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
  const advancingRef = React.useRef(false);
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const [cardSize, setCardSize] = React.useState({ w: 320, h: 260 });

  const step = steps[idx];

  React.useEffect(() => {
    if (!open || !step) return;
    onStepChange?.(step, idx);
  }, [open, idx, step, onStepChange]);

  React.useEffect(() => {
    if (!open || !showTooltip) return;
    const el = cardRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        setCardSize({ w: Math.ceil(r.width), h: Math.ceil(r.height) });
      }
    };
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, [open, showTooltip, idx, step?.id]);

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

  const goNext = React.useCallback(() => {
    if (advancingRef.current) return;
    advancingRef.current = true;
    window.setTimeout(() => {
      advancingRef.current = false;
    }, 300);
    if (idx >= steps.length - 1) {
      markDoneAndClose();
    } else {
      setIdx((v) => Math.min(steps.length - 1, v + 1));
    }
  }, [idx, steps.length, markDoneAndClose]);

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
      const r = el.getBoundingClientRect();
      // Keep bottom controls (e.g. Next) near the lower third so the tour card can sit above.
      const nearBottom = r.top > window.innerHeight * 0.55;
      el.scrollIntoView({
        behavior: "auto",
        block: nearBottom ? "end" : "center",
        inline: "nearest",
      });
    }
    const t = window.setTimeout(() => recompute(), recomputeDelayMs);
    return () => window.clearTimeout(t);
  }, [open, idx, step, recompute, recomputeDelayMs]);

  // Block real UI under the spotlight while the tour is open (clicks only advance the tour).
  React.useEffect(() => {
    if (!open) return;

    const stop = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-tour-card='true']")) return;
      if (target instanceof Element && target.closest("[data-tour-hole='true']")) return;
      // Outside the tour card / hole catcher — swallow so page controls cannot fire.
      event.preventDefault();
      event.stopPropagation();
    };

    const opts: AddEventListenerOptions = { capture: true };
    for (const type of ["pointerdown", "pointerup", "mousedown", "mouseup", "click", "touchstart", "touchend"] as const) {
      document.addEventListener(type, stop, opts);
    }
    return () => {
      for (const type of ["pointerdown", "pointerup", "mousedown", "mouseup", "click", "touchstart", "touchend"] as const) {
        document.removeEventListener(type, stop, opts);
      }
    };
  }, [open]);

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
  const tooltipH = cardSize.h || 260;
  const holeAllowsClicks = step.advanceOnClick ?? Boolean(step.action);
  const gap = 18;
  const clearPad = 24; // keep tour card clear of the click target
  const arrowReserve = 84; // leave room for the floating arrow on one side

  const overlapsHole = (top: number, left: number, w: number, h: number) => {
    if (!rect) return false;
    return !(
      left + w < rect.left - clearPad ||
      left > rect.right + clearPad ||
      top + h < rect.top - clearPad ||
      top > rect.bottom + clearPad
    );
  };

  const holeCenter = rect
    ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    : { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  const tooltip = (() => {
    if (!rect) {
      return { top: gap, left: Math.max(gap, (window.innerWidth - tooltipW) / 2) };
    }

    const maxTop = Math.max(gap, window.innerHeight - tooltipH - gap);
    const maxLeft = Math.max(gap, window.innerWidth - tooltipW - gap);
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    const preferAbove = spaceAbove >= spaceBelow;

    // Sit beside the spotlight (readable), not docked in a far corner.
    const beside: Array<{ top: number; left: number; side: string; priority: number }> = [
      {
        side: "above",
        priority: preferAbove ? 4 : 2,
        top: rect.top - gap - arrowReserve - tooltipH,
        left: rect.left + rect.width / 2 - tooltipW / 2,
      },
      {
        side: "below",
        priority: preferAbove ? 2 : 4,
        top: rect.bottom + gap + arrowReserve,
        left: rect.left + rect.width / 2 - tooltipW / 2,
      },
      {
        side: "left",
        priority: 3,
        top: rect.top + rect.height / 2 - tooltipH / 2,
        left: rect.left - gap - tooltipW,
      },
      {
        side: "right",
        priority: 3,
        top: rect.top + rect.height / 2 - tooltipH / 2,
        left: rect.right + gap,
      },
      // Slight offsets so wide targets still keep the card near the action.
      {
        side: "above-left",
        priority: 1,
        top: rect.top - gap - arrowReserve - tooltipH,
        left: rect.left,
      },
      {
        side: "above-right",
        priority: 1,
        top: rect.top - gap - arrowReserve - tooltipH,
        left: rect.right - tooltipW,
      },
    ];

    const scored = beside
      .map((c) => {
        const top = clamp(c.top, gap, maxTop);
        const left = clamp(c.left, gap, maxLeft);
        const clear = !overlapsHole(top, left, tooltipW, tooltipH);
        const cx = left + tooltipW / 2;
        const cy = top + tooltipH / 2;
        const dist = Math.hypot(cx - holeCenter.x, cy - holeCenter.y);
        // Prefer clear + near the spotlight (easy to read while following the arrow).
        const score =
          (clear ? 10_000 : 0) + c.priority * 400 - Math.min(dist, 900);
        return { top, left, score, clear };
      })
      .sort((a, b) => b.score - a.score);

    const best = scored.find((c) => c.clear);
    if (best) {
      return { top: best.top, left: best.left };
    }

    // Last resort: nudge to the freest side of the screen, still near mid-width.
    const fallbackTop =
      holeCenter.y > window.innerHeight / 2
        ? gap
        : Math.max(gap, window.innerHeight - tooltipH - gap);
    return {
      top: fallbackTop,
      left: clamp(holeCenter.x - tooltipW / 2, gap, maxLeft),
    };
  })();

  const arrowPos = (() => {
    if (!rect) return null;
    const size = 72;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const spaceLeft = rect.left;
    const spaceRight = window.innerWidth - rect.right;
    const minSide = 80;

    // Prefer the side with the most room so the arrow never sits on the button.
    const sides = [
      { side: "above" as const, room: spaceAbove, ok: spaceAbove >= minSide },
      { side: "below" as const, room: spaceBelow, ok: spaceBelow >= minSide },
      { side: "left" as const, room: spaceLeft, ok: spaceLeft >= minSide },
      { side: "right" as const, room: spaceRight, ok: spaceRight >= minSide },
    ]
      .filter((s) => s.ok)
      .sort((a, b) => b.room - a.room);

    const pick = sides[0]?.side ?? (spaceAbove >= spaceBelow ? "above" : "below");

    if (pick === "above") {
      return {
        top: rect.top - size - 8,
        left: rect.left + rect.width / 2 - size / 2,
        rotate: "0deg",
      };
    }
    if (pick === "below") {
      return {
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2 - size / 2,
        rotate: "180deg",
      };
    }
    if (pick === "left") {
      return {
        top: rect.top + rect.height / 2 - size / 2,
        left: rect.left - size - 8,
        rotate: "-90deg",
      };
    }
    return {
      top: rect.top + rect.height / 2 - size / 2,
      left: rect.right + 8,
      rotate: "90deg",
    };
  })();

  const overlay = (
    <div
      className={`fixed inset-0 ${z} transition-opacity ease-out`}
      style={{
        opacity: open && !closing ? 1 : 0,
        transitionDuration: `${fadeMs}ms`,
        pointerEvents: "none",
      }}
    >
      {rect ? (
        <>
          {/* Rounded spotlight hole (box-shadow dims outside; corners match the gold ring) */}
          <div
            className="pointer-events-none fixed"
            style={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              borderRadius: Math.min(16, Math.floor(Math.min(rect.width, rect.height) / 2)),
              boxShadow: `0 0 0 9999px ${scrimColor}`,
            }}
          />
          {/* Invisible blockers outside the hole (shadow paint does not capture clicks) */}
          <div
            className="fixed left-0 right-0 top-0"
            style={{
              height: Math.max(0, rect.top),
              pointerEvents: "auto",
            }}
          />
          <div
            className="fixed left-0 right-0"
            style={{
              top: rect.bottom,
              bottom: 0,
              pointerEvents: "auto",
            }}
          />
          <div
            className="fixed left-0"
            style={{
              top: rect.top,
              height: rect.height,
              width: Math.max(0, rect.left),
              pointerEvents: "auto",
            }}
          />
          <div
            className="fixed right-0"
            style={{
              top: rect.top,
              height: rect.height,
              width: Math.max(0, window.innerWidth - rect.right),
              pointerEvents: "auto",
            }}
          />
          <div
            className="pointer-events-none fixed border-[3px] border-[var(--accent)] animate-[kanamTourGoldPulse_1.4s_ease-in-out_infinite]"
            style={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              borderRadius: Math.min(16, Math.floor(Math.min(rect.width, rect.height) / 2)),
            }}
          />
          {arrowPos ? (
            <div
              className="pointer-events-none fixed z-[2] grid place-items-center"
              style={{
                top: clamp(arrowPos.top, 4, window.innerHeight - 76),
                left: clamp(arrowPos.left, 4, window.innerWidth - 76),
                width: 72,
                height: 72,
                transform: `rotate(${arrowPos.rotate})`,
              }}
              aria-hidden
            >
              <span className="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full bg-[var(--accent)] text-slate-950 shadow-[0_10px_28px_rgba(234,179,8,0.6)] animate-[kanamTourBounce_1.1s_ease-in-out_infinite] ring-4 ring-white/90">
                <ArrowDown className="h-10 w-10 stroke-[3.5]" aria-hidden />
              </span>
            </div>
          ) : null}
          {/* Catch clicks in the lit area — advance tour without firing the real control */}
          <div
            data-tour-hole="true"
            className="fixed cursor-pointer"
            style={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              borderRadius: Math.min(16, Math.floor(Math.min(rect.width, rect.height) / 2)),
              pointerEvents: "auto",
            }}
            onPointerUp={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (holeAllowsClicks) goNext();
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            role={holeAllowsClicks ? "button" : undefined}
            aria-label={holeAllowsClicks ? "Continue tour" : undefined}
          />
        </>
      ) : (
        <div
          className="fixed inset-0"
          style={{ background: scrimColor, pointerEvents: "auto" }}
        />
      )}

      {showTooltip ? (
        <div
          key={step.id}
          className="fixed z-[3] animate-[kanamTourTooltipIn_160ms_ease-out]"
          style={{
            top: tooltip.top,
            left: tooltip.left,
            width: tooltipW,
            pointerEvents: "auto",
          }}
        >
          <div
            ref={cardRef}
            data-tour-card="true"
            className={[
              "pointer-events-auto rounded-2xl border shadow-xl",
              "border-[rgb(var(--accent-rgb)/0.55)]",
              "ring-1 ring-[rgb(var(--accent-rgb)/0.25)]",
              "bg-gradient-to-br from-white via-white to-[rgb(var(--accent-rgb)/0.08)]",
              "dark:border-[rgb(var(--accent-rgb)/0.5)]",
              "dark:from-slate-950 dark:via-slate-950 dark:to-slate-900",
              "dark:ring-[rgb(var(--accent-rgb)/0.35)]",
            ].join(" ")}
          >
            <div className="flex items-start gap-3 p-4 sm:p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--accent)]/12 ring-1 ring-[var(--accent)]/20 dark:bg-[var(--accent)]/20">
                <div className="text-slate-900 dark:text-slate-50">
                  {step.icon ?? <MousePointerClick className="h-5 w-5" />}
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[color:var(--brand-2)] dark:text-[color:var(--brand-2-ink)]">
                  How to use Kanam
                </p>
                <p className="mt-1 text-base font-extrabold tracking-tight text-slate-900 sm:text-[17px] dark:text-slate-50">
                  {step.title}
                </p>
                <p className="mt-2 text-[15px] leading-[1.65] text-slate-700 dark:text-slate-200">
                  {renderTourRichText(step.body)}
                </p>
                {step.action ? (
                  <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold leading-snug text-emerald-950 dark:border-emerald-400/40 dark:bg-emerald-950/70 dark:text-emerald-50">
                    <span className="font-extrabold text-emerald-800 dark:text-emerald-300">
                      Try this:{" "}
                    </span>
                    {renderTourRichText(step.action)}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <div className="flex gap-1" aria-hidden>
                  {steps.map((s, i) => (
                    <span
                      key={s.id}
                      className={[
                        "h-1.5 rounded-full transition-all",
                        i === idx
                          ? "w-5 bg-[var(--brand)]"
                          : i < idx
                            ? "w-1.5 bg-[var(--brand)]/50"
                            : "w-1.5 bg-slate-200 dark:bg-slate-600",
                      ].join(" ")}
                    />
                  ))}
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-300">
                  Step {idx + 1} of {steps.length}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:flex">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={markDoneAndClose}
                  className="min-h-11 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 sm:min-h-9 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Skip tour
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
              </div>
            </div>
            {holeAllowsClicks ? (
              <p className="border-t border-slate-100 px-4 py-2 text-center text-xs font-medium text-slate-500 sm:px-5 dark:border-slate-700 dark:text-slate-300">
                Follow the gold arrow to continue
              </p>
            ) : (
              <div className="border-t border-slate-100 px-4 py-3 sm:px-5 dark:border-slate-700">
                <Button type="button" size="sm" className="min-h-11 w-full" onClick={goNext}>
                  {idx >= steps.length - 1 ? "Start practicing" : "Next"}
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );

  return createPortal(overlay, document.body);
});

SpotlightTourInner.displayName = "SpotlightTourInner";
SpotlightTour.displayName = "SpotlightTour";
