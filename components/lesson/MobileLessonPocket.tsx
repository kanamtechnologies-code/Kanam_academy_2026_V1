"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { useLessonHelpPocket } from "@/components/lesson/LessonHelpPocketContext";
import { cn } from "@/lib/utils";

export type MobileLessonPocketPanel = {
  id: string;
  /** Short chip label (1 word preferred). */
  label: string;
  title: string;
  icon: React.ReactNode;
  tone?: "coach" | "brand" | "default";
  dataTour?: string;
  /** Optional pulse / unread style on the nav badge. */
  attention?: boolean;
  content: React.ReactNode;
};

const SHEET_OUT_MS = 220;

/**
 * Mobile-only lesson help sheet. Opened from the header Help Pocket button
 * (no bottom dock) so Run / console stay clear on small screens.
 */
export function MobileLessonPocket({
  panels,
  defaultOpenId,
}: {
  panels: MobileLessonPocketPanel[];
  defaultOpenId?: string | null;
}) {
  const pocket = useLessonHelpPocket();
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [renderSheet, setRenderSheet] = React.useState(false);
  const [leaving, setLeaving] = React.useState(false);
  const [panelKey, setPanelKey] = React.useState(0);
  const sheetRef = React.useRef<HTMLDivElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const leaveTimerRef = React.useRef<number | null>(null);

  const hasAttention = panels.some((p) => p.attention);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!panels.length) return;
    const preferred =
      defaultOpenId && panels.some((p) => p.id === defaultOpenId)
        ? defaultOpenId
        : panels[0]?.id ?? null;
    pocket.register({
      defaultPanelId: preferred,
      hasAttention,
    });
    return () => {
      pocket.unregister();
    };
    // Register once when the pocket mounts for this lesson.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    pocket.setAttention(hasAttention);
  }, [hasAttention, pocket]);

  const closeSheet = React.useCallback(() => {
    pocket.setOpen(false);
  }, [pocket]);

  const selectPanel = React.useCallback(
    (id: string) => {
      if (id === openId) return;
      setOpenId(id);
      pocket.setPreferredPanelId(id);
      setPanelKey((k) => k + 1);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    },
    [openId, pocket]
  );

  // Sync context open → local panel + enter/exit animation.
  React.useEffect(() => {
    if (leaveTimerRef.current != null) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }

    if (pocket.open) {
      const preferred =
        (pocket.preferredPanelId && panels.some((p) => p.id === pocket.preferredPanelId)
          ? pocket.preferredPanelId
          : null) ??
        openId ??
        panels[0]?.id ??
        null;
      setOpenId(preferred);
      setLeaving(false);
      setRenderSheet(true);
      setPanelKey((k) => k + 1);
      return;
    }

    if (!renderSheet) return;
    setLeaving(true);
    leaveTimerRef.current = window.setTimeout(() => {
      setRenderSheet(false);
      setLeaving(false);
      setOpenId(null);
      leaveTimerRef.current = null;
    }, SHEET_OUT_MS);

    return () => {
      if (leaveTimerRef.current != null) {
        window.clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
    };
    // openId intentionally omitted — only react to context open changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pocket.open, pocket.preferredPanelId, panels]);

  const active = panels.find((p) => p.id === openId) ?? null;

  React.useEffect(() => {
    if (!renderSheet || leaving) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [renderSheet, leaving]);

  React.useEffect(() => {
    if (!renderSheet || leaving) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSheet();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [renderSheet, leaving, closeSheet]);

  // Drag-to-dismiss from the sheet chrome (handle + header).
  React.useEffect(() => {
    const el = sheetRef.current;
    if (!el || !renderSheet || leaving) return;
    let startY = 0;
    let dragging = false;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-pocket-scroll]")) {
        const scroller = contentRef.current;
        if (scroller && scroller.scrollTop > 2) return;
      }
      startY = t.clientY;
      dragging = true;
    };
    const onMove = (e: TouchEvent) => {
      if (!dragging) return;
      const t = e.touches[0];
      if (!t) return;
      const dy = t.clientY - startY;
      if (dy > 0) {
        el.style.transform = `translateY(${Math.min(dy, 240)}px)`;
        el.style.transition = "none";
      }
    };
    const onEnd = (e: TouchEvent) => {
      if (!dragging) return;
      dragging = false;
      const t = e.changedTouches[0];
      const dy = t ? t.clientY - startY : 0;
      el.style.transition = "";
      el.style.transform = "";
      if (dy > 96) closeSheet();
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [renderSheet, leaving, closeSheet]);

  if (!panels.length || !mounted || !renderSheet || !active) return null;

  // Fit typical lesson toolsets (≤5) edge-to-edge; scroll only when denser.
  const fewPanels = panels.length <= 5;

  return createPortal(
    <div className="lg:hidden">
      {/* Scrim sits under the sticky header so the nav Help toggle stays tappable. */}
      <button
        type="button"
        className={cn(
          "fixed inset-x-0 bottom-0 z-[70] bg-slate-950/50 backdrop-blur-[3px]",
          "top-[var(--kanam-header-height,4.75rem)]",
          leaving
            ? "animate-[kanamPocketScrimOut_200ms_ease-in_forwards]"
            : "animate-[kanamTourTooltipIn_160ms_ease-out]"
        )}
        aria-label="Dismiss help"
        onClick={closeSheet}
      />
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={active.title}
        className={cn(
          "fixed inset-x-0 bottom-0 z-[71] flex max-h-[min(88dvh,720px)] flex-col overflow-hidden",
          "rounded-t-[32px] border border-white/70 bg-white",
          "shadow-[0_-24px_60px_rgba(15,23,42,0.22)]",
          "dark:border-slate-700/80 dark:bg-slate-950",
          leaving
            ? "animate-[kanamPocketSheetOut_220ms_ease-in_forwards]"
            : "animate-[kanamPocketSheetIn_280ms_cubic-bezier(0.22,1,0.36,1)]"
        )}
      >
        {/* Atmosphere */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[rgb(var(--brand-rgb)/0.12)] via-[rgb(var(--accent-rgb)/0.06)] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 -top-8 h-36 w-36 rounded-full bg-[rgb(var(--accent-rgb)/0.18)] blur-3xl"
          aria-hidden
        />

        <div className="relative shrink-0 px-4 pt-3">
          <div className="flex justify-center pb-2" aria-hidden>
            <span className="h-1.5 w-12 rounded-full bg-slate-300/90 dark:bg-slate-600" />
          </div>

          <div className="flex items-start justify-between gap-3 pb-3">
            <div className="min-w-0 pt-0.5">
              <p className="text-[11px] font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                Help pocket
              </p>
              <p className="mt-0.5 truncate text-[1.35rem] font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-50">
                {active.title}
              </p>
            </div>
            <button
              type="button"
              onClick={closeSheet}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-200/90 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition active:scale-95 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Segment rail — large icon+label tiles (thumb-friendly) */}
          <div
            className={cn(
              "relative mb-1 rounded-[22px] p-1.5",
              "bg-gradient-to-b from-slate-100 to-slate-100/70 ring-1 ring-slate-200/80",
              "dark:from-slate-900 dark:to-slate-900/80 dark:ring-slate-700"
            )}
            role="tablist"
            aria-label="Help pocket sections"
          >
            <div
              className={cn(
                "flex gap-1 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                fewPanels && "justify-between"
              )}
            >
              {panels.map((p) => {
                const on = p.id === active.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    data-tour={p.dataTour}
                    onClick={() => selectPanel(p.id)}
                    className={cn(
                      "relative flex min-h-[4.75rem] shrink-0 snap-start flex-col items-center justify-center gap-1.5 rounded-[18px] px-3 py-2.5 transition-all duration-200 ease-out",
                      "active:scale-[0.96]",
                      fewPanels ? "min-w-0 flex-1 basis-0" : "min-w-[5.25rem]",
                      on
                        ? "bg-white text-[color:var(--brand-2)] shadow-[0_8px_22px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.06] dark:bg-slate-800 dark:text-emerald-200 dark:ring-white/10"
                        : "text-slate-500 hover:bg-white/70 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-200",
                      p.attention && !on && "ring-2 ring-[var(--accent)]"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-10 w-10 place-items-center rounded-2xl transition-all duration-200",
                        "[&_svg]:h-5 [&_svg]:w-5",
                        on
                          ? "bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] text-white shadow-[0_6px_14px_rgb(var(--brand-rgb)/0.35)]"
                          : "bg-white text-slate-500 shadow-sm ring-1 ring-slate-200/90 dark:bg-slate-950 dark:text-slate-400 dark:ring-slate-700"
                      )}
                    >
                      {p.icon}
                    </span>
                    <span
                      className={cn(
                        "max-w-full truncate text-[12px] font-bold tracking-tight",
                        on ? "text-[color:var(--brand-2)] dark:text-emerald-200" : "text-slate-500"
                      )}
                    >
                      {p.label}
                    </span>
                    {on ? (
                      <span
                        className="absolute inset-x-4 bottom-1 h-0.5 rounded-full bg-[var(--brand)]"
                        aria-hidden
                      />
                    ) : null}
                    {p.attention && !on ? (
                      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--accent)] ring-2 ring-slate-100 dark:ring-slate-900" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          ref={contentRef}
          data-pocket-scroll
          className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
        >
          <div
            key={`${active.id}-${panelKey}`}
            className="animate-[kanamPocketPanelIn_220ms_cubic-bezier(0.22,1,0.36,1)]"
          >
            {active.content}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
