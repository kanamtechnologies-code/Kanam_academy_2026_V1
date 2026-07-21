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
    /** Small label above the step title. */
    eyebrow?: string;
    /** Prefix for the green action callout. */
    actionLabel?: string;
    /** Hint under the footer when the hole advances the tour. */
    footerHint?: string;
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
    eyebrow,
    actionLabel,
    footerHint,
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
      eyebrow={eyebrow}
      actionLabel={actionLabel}
      footerHint={footerHint}
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
    eyebrow?: string;
    actionLabel?: string;
    footerHint?: string;
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
    eyebrow = "How to use Kanam",
    actionLabel = "Try this",
    footerHint = "Follow the gold arrow — tap the highlighted area",
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
      const vh = window.innerHeight;
      const narrow = window.innerWidth < 640;
      if (narrow) {
        // Keep the card compact; phones need most of the screen for the tap target.
        const cardBand = Math.min(Math.max(cardSize.h, 160), Math.floor(vh * 0.32));
        const headerPad = 72; // fixed app header
        const r0 = el.getBoundingClientRect();
        // Only park the card on top when the control is clearly in the lower third.
        // Mid-screen targets (e.g. XP/badge under a tall hero title) must keep the card at the bottom.
        const dockTop = r0.top > vh * 0.58;
        const safeTop = dockTop ? cardBand + 10 : headerPad;
        const safeBottom = dockTop ? vh - 10 : vh - cardBand - 14;

        // Fit the whole target into the safe band (not just its center).
        let r = el.getBoundingClientRect();
        if (r.top < safeTop) {
          window.scrollBy({ top: r.top - safeTop, left: 0, behavior: "auto" });
          r = el.getBoundingClientRect();
        }
        if (r.bottom > safeBottom) {
          window.scrollBy({ top: r.bottom - safeBottom, left: 0, behavior: "auto" });
          r = el.getBoundingClientRect();
        }
        // If it still can't fit (very tall target), pin its top into the safe zone.
        if (r.top < safeTop || r.bottom > safeBottom) {
          window.scrollBy({ top: r.top - safeTop, left: 0, behavior: "auto" });
        }
      } else {
        const r = el.getBoundingClientRect();
        const nearBottom = r.top > vh * 0.55;
        el.scrollIntoView({
          behavior: "auto",
          block: nearBottom ? "end" : "center",
          inline: "nearest",
        });
      }
    }
    const t = window.setTimeout(() => recompute(), recomputeDelayMs);
    return () => window.clearTimeout(t);
  }, [open, idx, step, recompute, recomputeDelayMs, cardSize.h]);

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
  const narrow = window.innerWidth < 640;
  const edge = narrow ? 8 : 12;
  const tooltipMaxW = narrow ? window.innerWidth - edge * 2 : 360;
  const tooltipW = Math.min(
    tooltipMaxW,
    Math.max(narrow ? window.innerWidth - edge * 2 : 280, Math.floor(window.innerWidth - edge * 2))
  );
  const tooltipH = cardSize.h || (narrow ? 200 : 260);
  const holeAllowsClicks = step.advanceOnClick ?? Boolean(step.action);
  const gap = narrow ? 10 : 18;
  const clearPad = narrow ? 20 : 24; // keep tour card clear of the click target
  const arrowReserve = narrow ? 44 : 84; // leave room for the floating arrow on one side
  const arrowSize = narrow ? 44 : 72;

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

  // Prefer bottom dock on phones. Only flip to top when the target is clearly low —
  // otherwise mid-page controls (first-step XP/badge) get covered by a top-docked card.
  const dockCardTop = Boolean(
    rect && rect.top > window.innerHeight * 0.58
  );

  const tooltip = (() => {
    if (!rect) {
      return {
        top: narrow
          ? Math.max(edge, window.innerHeight - tooltipH - edge)
          : edge,
        left: edge,
      };
    }

    const maxTop = Math.max(edge, window.innerHeight - tooltipH - edge);
    const maxLeft = Math.max(edge, window.innerWidth - tooltipW - edge);

    if (narrow) {
      let top = dockCardTop ? edge : maxTop;
      // Hard guarantee: if the docked card would still cover the hole, flip sides.
      if (overlapsHole(top, edge, tooltipW, tooltipH)) {
        top = dockCardTop ? maxTop : edge;
      }
      // Still overlapping (huge target) — pin card to whichever side leaves more free space.
      if (overlapsHole(top, edge, tooltipW, tooltipH)) {
        const spaceAbove = Math.max(0, rect.top - edge);
        const spaceBelow = Math.max(0, window.innerHeight - rect.bottom - edge);
        top = spaceAbove >= spaceBelow ? edge : maxTop;
      }
      return { top, left: edge };
    }

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
        const top = clamp(c.top, edge, maxTop);
        const left = clamp(c.left, edge, maxLeft);
        // Reject candidates that only look clear before clamp — clamp can pull them onto the hole.
        const clear =
          !overlapsHole(c.top, c.left, tooltipW, tooltipH) &&
          !overlapsHole(top, left, tooltipW, tooltipH) &&
          c.top >= edge - 2 &&
          c.top <= maxTop + 2;
        const cx = left + tooltipW / 2;
        const cy = top + tooltipH / 2;
        const dist = Math.hypot(cx - holeCenter.x, cy - holeCenter.y);
        const score = (clear ? 10_000 : 0) + c.priority * 400 - Math.min(dist, 900);
        return { top, left, score, clear };
      })
      .sort((a, b) => b.score - a.score);

    const best = scored.find((c) => c.clear);
    if (best) {
      return { top: best.top, left: best.left };
    }

    // Last resort on desktop: dock opposite the hole.
    return {
      top: dockCardTop ? edge : maxTop,
      left: clamp(holeCenter.x - tooltipW / 2, edge, maxLeft),
    };
  })();

  const arrowPos = (() => {
    if (!rect) return null;
    const size = arrowSize;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const spaceLeft = rect.left;
    const spaceRight = window.innerWidth - rect.right;
    const minSide = narrow ? 44 : 80;

    // Keep the arrow out of the docked card band on mobile.
    const cardTopBand = tooltip.top;
    const cardBottomBand = tooltip.top + tooltipH;
    const inCardBand = (top: number, left: number) => {
      if (!narrow) return false;
      return !(
        left + size < edge ||
        left > window.innerWidth - edge ||
        top + size < cardTopBand - 4 ||
        top > cardBottomBand + 4
      );
    };

    const sides = [
      { side: "above" as const, room: spaceAbove, ok: spaceAbove >= minSide },
      { side: "below" as const, room: spaceBelow, ok: spaceBelow >= minSide },
      { side: "left" as const, room: spaceLeft, ok: spaceLeft >= minSide },
      { side: "right" as const, room: spaceRight, ok: spaceRight >= minSide },
    ]
      .filter((s) => s.ok)
      .sort((a, b) => b.room - a.room);

    // Prefer a side that points toward the card without covering the hole or the card.
    const order = narrow
      ? dockCardTop
        ? (["above", "left", "right", "below"] as const)
        : (["below", "left", "right", "above"] as const)
      : null;

    let pick =
      sides[0]?.side ?? (spaceAbove >= spaceBelow ? ("above" as const) : ("below" as const));
    if (order) {
      for (const side of order) {
        const candidate = sides.find((s) => s.side === side);
        if (!candidate) continue;
        const trial =
          side === "above"
            ? { top: rect.top - size - 6, left: rect.left + rect.width / 2 - size / 2 }
            : side === "below"
              ? { top: rect.bottom + 6, left: rect.left + rect.width / 2 - size / 2 }
              : side === "left"
                ? { top: rect.top + rect.height / 2 - size / 2, left: rect.left - size - 6 }
                : { top: rect.top + rect.height / 2 - size / 2, left: rect.right + 6 };
        if (!inCardBand(trial.top, trial.left)) {
          pick = side;
          break;
        }
      }
    }

    if (pick === "above") {
      return {
        top: rect.top - size - 6,
        left: rect.left + rect.width / 2 - size / 2,
        rotate: "0deg",
      };
    }
    if (pick === "below") {
      return {
        top: rect.bottom + 6,
        left: rect.left + rect.width / 2 - size / 2,
        rotate: "180deg",
      };
    }
    if (pick === "left") {
      return {
        top: rect.top + rect.height / 2 - size / 2,
        left: rect.left - size - 6,
        rotate: "-90deg",
      };
    }
    return {
      top: rect.top + rect.height / 2 - size / 2,
      left: rect.right + 6,
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
          {arrowPos &&
          !(
            narrow &&
            overlapsHole(arrowPos.top, arrowPos.left, arrowSize, arrowSize)
          ) ? (
            <div
              className="pointer-events-none fixed z-[2] grid place-items-center"
              style={{
                top: clamp(arrowPos.top, 4, window.innerHeight - arrowSize - 4),
                left: clamp(arrowPos.left, 4, window.innerWidth - arrowSize - 4),
                width: arrowSize,
                height: arrowSize,
                transform: `rotate(${arrowPos.rotate})`,
              }}
              aria-hidden
            >
              <span
                className={[
                  "grid place-items-center rounded-full bg-[var(--accent)] text-slate-950",
                  "shadow-[0_10px_28px_rgba(234,179,8,0.6)] animate-[kanamTourBounce_1.1s_ease-in-out_infinite] ring-4 ring-white/90",
                  narrow ? "h-11 w-11" : "h-[4.5rem] w-[4.5rem]",
                ].join(" ")}
              >
                <ArrowDown
                  className={narrow ? "h-6 w-6 stroke-[3.5]" : "h-10 w-10 stroke-[3.5]"}
                  aria-hidden
                />
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
              "pointer-events-auto overflow-hidden rounded-[20px]",
              "border border-slate-200/90 bg-white",
              "shadow-[0_18px_50px_rgba(15,23,42,0.18),0_2px_8px_rgba(15,23,42,0.06)]",
              "dark:border-slate-700 dark:bg-slate-950",
              "dark:shadow-[0_18px_50px_rgba(0,0,0,0.45)]",
              narrow ? "max-h-[min(32vh,260px)] overflow-y-auto overscroll-contain" : "",
            ].join(" ")}
          >
            {/* Brand accent bar — replaces the washed gold frame */}
            <div
              className="h-1 w-full bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]"
              aria-hidden
            />
            <div className={["flex items-start gap-2.5", narrow ? "p-3.5" : "p-5 sm:gap-3"].join(" ")}>
              <div
                className={[
                  "grid shrink-0 place-items-center rounded-xl bg-[rgb(var(--brand-rgb)/0.1)] text-[var(--brand-2)]",
                  narrow ? "h-9 w-9" : "h-11 w-11",
                ].join(" ")}
              >
                {step.icon ?? <MousePointerClick className="h-5 w-5" />}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[color:var(--brand-2)] dark:text-[color:var(--brand-2-ink)] sm:text-[11px]">
                  {eyebrow}
                </p>
                <p
                  className={[
                    "mt-1 font-extrabold tracking-tight text-slate-900 dark:text-slate-50",
                    narrow ? "text-[15px] leading-snug" : "text-base sm:text-[17px]",
                  ].join(" ")}
                >
                  {step.title}
                </p>
                <p
                  className={[
                    "mt-1.5 text-slate-600 dark:text-slate-300",
                    narrow ? "text-[13px] leading-snug" : "text-[15px] leading-[1.65]",
                  ].join(" ")}
                >
                  {renderTourRichText(step.body)}
                </p>
                {step.action ? (
                  <p
                    className={[
                      "mt-2.5 border-l-[3px] border-[var(--brand)] bg-[rgb(var(--brand-rgb)/0.06)] font-semibold text-slate-800 dark:bg-[rgb(var(--brand-rgb)/0.14)] dark:text-slate-100",
                      narrow ? "rounded-r-lg px-2.5 py-1.5 text-[12px] leading-snug" : "mt-3 rounded-r-xl px-3.5 py-2.5 text-sm leading-snug",
                    ].join(" ")}
                  >
                    <span className="font-extrabold text-[var(--brand-2)] dark:text-[color:var(--brand-2-ink)]">
                      {actionLabel}:{" "}
                    </span>
                    {renderTourRichText(step.action)}
                  </p>
                ) : null}
              </div>
            </div>

            <div
              className={[
                "flex border-t border-slate-100 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/60",
                narrow
                  ? "items-center justify-between gap-2 px-3.5 py-2.5"
                  : "flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between",
              ].join(" ")}
            >
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex gap-1" aria-hidden>
                  {steps.map((s, i) => (
                    <span
                      key={s.id}
                      className={[
                        "h-1.5 rounded-full transition-all",
                        i === idx
                          ? "w-5 bg-[var(--brand)]"
                          : i < idx
                            ? "w-1.5 bg-[var(--brand)]/45"
                            : "w-1.5 bg-slate-300/90 dark:bg-slate-600",
                      ].join(" ")}
                    />
                  ))}
                </div>
                <p className="truncate text-[11px] font-semibold tabular-nums text-slate-500 dark:text-slate-400 sm:text-xs">
                  {idx + 1} / {steps.length}
                </p>
              </div>
              <div className={narrow ? "flex shrink-0 gap-1.5" : "grid grid-cols-2 gap-2 sm:flex"}>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={markDoneAndClose}
                  className="min-h-10 border-slate-200/90 bg-white px-3.5 text-slate-700 shadow-none hover:bg-white hover:text-slate-900 sm:min-h-9 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                >
                  Skip
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIdx((v) => Math.max(0, v - 1))}
                  disabled={idx === 0}
                  className="min-h-10 bg-white px-3.5 text-slate-800 shadow-none ring-1 ring-slate-200/90 hover:bg-slate-50 sm:min-h-9 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700"
                >
                  Back
                </Button>
              </div>
            </div>
            {holeAllowsClicks ? (
              <p className="border-t border-slate-100 bg-white px-3.5 py-2 text-center text-[11px] font-medium text-slate-500 sm:px-5 sm:text-xs dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                {footerHint}
              </p>
            ) : (
              <div className="border-t border-slate-100 bg-white px-3.5 py-3 sm:px-5 dark:border-slate-800 dark:bg-slate-950">
                <Button type="button" size="sm" className="min-h-11 w-full" onClick={goNext}>
                  {idx >= steps.length - 1 ? "Start the lesson" : "Next"}
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
