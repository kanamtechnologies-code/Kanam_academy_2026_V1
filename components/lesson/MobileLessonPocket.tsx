"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export type MobileLessonPocketPanel = {
  id: string;
  /** Short dock label (1 word preferred). */
  label: string;
  title: string;
  icon: React.ReactNode;
  tone?: "coach" | "brand" | "default";
  dataTour?: string;
  /** Optional pulse / unread style on the dock orb. */
  attention?: boolean;
  content: React.ReactNode;
};

/**
 * Mobile-only lesson help: a floating "pocket" of tool orbs at the bottom.
 * Tap an orb → content rises as a sheet. Not a hamburger menu — more like
 * a toolkit you pull from your pocket while you work.
 */
export function MobileLessonPocket({
  panels,
  defaultOpenId,
}: {
  panels: MobileLessonPocketPanel[];
  defaultOpenId?: string | null;
}) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const sheetRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (defaultOpenId && panels.some((p) => p.id === defaultOpenId)) {
      setOpenId(defaultOpenId);
    }
    // Only honor the initial default once panels first appear.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = panels.find((p) => p.id === openId) ?? null;

  React.useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  // Light drag-to-dismiss on the sheet handle area.
  React.useEffect(() => {
    const el = sheetRef.current;
    if (!el || !active) return;
    let startY = 0;
    let dragging = false;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      startY = t.clientY;
      dragging = true;
    };
    const onMove = (e: TouchEvent) => {
      if (!dragging) return;
      const t = e.touches[0];
      if (!t) return;
      const dy = t.clientY - startY;
      if (dy > 0) {
        el.style.transform = `translateY(${Math.min(dy, 220)}px)`;
      }
    };
    const onEnd = (e: TouchEvent) => {
      if (!dragging) return;
      dragging = false;
      const t = e.changedTouches[0];
      const dy = t ? t.clientY - startY : 0;
      el.style.transform = "";
      if (dy > 90) setOpenId(null);
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [active]);

  if (!panels.length) return null;

  const sheet =
    mounted && active
      ? createPortal(
          <div className="lg:hidden">
            <button
              type="button"
              className="fixed inset-0 z-[70] bg-slate-950/45 backdrop-blur-[2px] animate-[kanamTourTooltipIn_160ms_ease-out]"
              aria-label="Dismiss help"
              onClick={() => setOpenId(null)}
            />
            <div
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className={cn(
                "fixed inset-x-0 bottom-0 z-[71] flex max-h-[min(82dvh,640px)] flex-col",
                "rounded-t-[28px] border border-slate-200/90 bg-white shadow-[0_-16px_50px_rgba(15,23,42,0.18)]",
                "animate-[kanamPocketSheetIn_220ms_cubic-bezier(0.22,1,0.36,1)]",
                "dark:border-slate-700 dark:bg-slate-950"
              )}
            >
              {active.tone === "coach" ? (
                <div
                  className="h-1 w-full rounded-t-[28px] bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--accent)]"
                  aria-hidden
                />
              ) : (
                <div className="flex justify-center pt-2.5" aria-hidden>
                  <span className="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600" />
                </div>
              )}

              <div className="flex items-start justify-between gap-3 px-4 pb-2 pt-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[color:var(--brand-2)]">
                    In your pocket
                  </p>
                  <p className="mt-0.5 truncate text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    {active.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Switch tools without closing the sheet */}
              <div className="flex gap-2 overflow-x-auto px-4 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {panels.map((p) => {
                  const on = p.id === active.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setOpenId(p.id)}
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition",
                        on
                          ? "bg-[var(--brand)] text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 ring-1 ring-slate-200/80 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700"
                      )}
                    >
                      <span className="grid h-4 w-4 place-items-center [&_svg]:h-3.5 [&_svg]:w-3.5">
                        {p.icon}
                      </span>
                      {p.label}
                    </button>
                  );
                })}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
                {active.content}
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 z-[60] lg:hidden",
          "pb-[max(0.65rem,env(safe-area-inset-bottom))]"
        )}
      >
        <div className="pointer-events-auto mx-auto max-w-lg px-3">
          <div
            className={cn(
              "relative overflow-hidden rounded-[28px] border border-white/50",
              "bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.16)] backdrop-blur-xl",
              "ring-1 ring-[rgb(var(--brand-rgb)/0.12)]",
              "dark:border-slate-700/80 dark:bg-slate-950/90"
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand)]/50 to-transparent"
              aria-hidden
            />
            <p className="px-4 pt-2.5 text-center text-[10px] font-extrabold uppercase tracking-[0.2em] text-[color:var(--brand-2)]">
              Help pocket
            </p>
            <div className="flex items-stretch justify-between gap-1 px-2 pb-2.5 pt-1.5">
              {panels.map((p) => {
                const on = p.id === openId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    data-tour={p.dataTour}
                    onClick={() => setOpenId((cur) => (cur === p.id ? null : p.id))}
                    className={cn(
                      "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-1.5 transition",
                      "active:scale-[0.96]",
                      on ? "bg-[rgb(var(--brand-rgb)/0.1)]" : "hover:bg-slate-50/80 dark:hover:bg-slate-900/60"
                    )}
                  >
                    <span
                      className={cn(
                        "relative grid h-11 w-11 place-items-center rounded-2xl transition",
                        "ring-1 shadow-sm",
                        p.tone === "coach" &&
                          (on
                            ? "bg-[var(--brand)] text-white ring-[var(--brand)] shadow-[0_6px_16px_rgb(var(--brand-rgb)/0.35)]"
                            : "bg-[rgb(var(--brand-rgb)/0.12)] text-[var(--brand-2)] ring-[rgb(var(--brand-rgb)/0.22)]"),
                        p.tone === "brand" &&
                          (on
                            ? "bg-[var(--brand)] text-white ring-[var(--brand)]"
                            : "bg-[rgb(var(--brand-rgb)/0.1)] text-[var(--brand)] ring-[rgb(var(--brand-rgb)/0.2)]"),
                        (!p.tone || p.tone === "default") &&
                          (on
                            ? "bg-slate-900 text-white ring-slate-900 dark:bg-slate-100 dark:text-slate-900"
                            : "bg-slate-100 text-slate-700 ring-slate-200/90 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700"),
                        p.attention && !on && "animate-[kanamTourGoldPulse_1.6s_ease-in-out_infinite]"
                      )}
                    >
                      <span className="[&_svg]:h-4 [&_svg]:w-4">{p.icon}</span>
                      {p.attention && !on ? (
                        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-2 ring-white" />
                      ) : null}
                    </span>
                    <span
                      className={cn(
                        "max-w-full truncate text-[10px] font-bold tracking-tight",
                        on ? "text-[var(--brand-2)]" : "text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {p.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Spacer so the dock doesn't cover Run / console */}
      <div className="h-[5.75rem] lg:hidden" aria-hidden />
      {sheet}
    </>
  );
}
