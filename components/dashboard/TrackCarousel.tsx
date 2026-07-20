"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Lock, Sparkles } from "lucide-react";

import { TrackIcon } from "@/components/tracks/TrackIcon";
import { cn } from "@/lib/utils";
import type { Track } from "@/lib/tracks";
import { trackProgress } from "@/lib/tracks";

const PREMIER_TRACKS = new Set(["ap-csp-prep", "advanced-ai"]);

const SHORT_LABEL: Partial<Record<Track["id"], string>> = {
  "ai-literacy": "AI Literacy",
  "advanced-ai": "Advanced AI",
  "ap-csp-prep": "AP CSP Prep",
  "digital-literacy": "Digital Literacy",
  cybersecurity: "Cybersecurity",
  "financial-literacy": "Financial Literacy",
  "ai-python": "Python Starter",
  "data-analyst": "Data Analyst",
};

export function TrackCarousel({
  tracks,
  activeId,
  onSelect,
  completedIds,
  lockedTrackIds,
}: {
  tracks: Track[];
  activeId: string;
  onSelect: (id: string) => void;
  completedIds: string[];
  lockedTrackIds?: Set<string>;
}) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);

  const updateEdges = React.useEffectEvent(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 8);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 8);
  });

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
      ro.disconnect();
    };
  }, [tracks.length]);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`[data-track-id="${activeId}"]`);
    if (!card) return;
    const elRect = el.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta =
      cardRect.left - elRect.left - (elRect.width / 2 - cardRect.width / 2);
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, [activeId]);

  const scrollByCards = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: Math.min(340, el.clientWidth * 0.8) * dir, behavior: "smooth" });
  };

  return (
    <section aria-label="Training tracks" className="space-y-3">
      <div className="flex items-end justify-between gap-3 px-0.5">
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--brand-2)]">
            Your training studio
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-600 sm:text-base">
            Swipe or tap a path — badges, XP, and a clear next lesson
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <p className="hidden text-xs font-bold uppercase tracking-[0.16em] text-slate-400 sm:block">
            {tracks.length} paths
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Scroll tracks left"
              disabled={!canLeft}
              onClick={() => scrollByCards(-1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--brand)]/30 bg-white text-[var(--brand-2)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--brand)]/55 hover:bg-[var(--brand)]/5 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll tracks right"
              disabled={!canRight}
              onClick={() => scrollByCards(1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--brand)]/30 bg-white text-[var(--brand-2)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--brand)]/55 hover:bg-[var(--brand)]/5 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--accent)]/45 bg-gradient-to-br from-white via-slate-50 to-emerald-50/80 p-3 shadow-[0_18px_44px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
        <div
          className={cn(
            "pointer-events-none absolute inset-y-3 left-0 z-10 w-10 bg-gradient-to-r from-slate-50 to-transparent transition-opacity",
            !canLeft && "opacity-0"
          )}
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-3 right-0 z-10 w-10 bg-gradient-to-l from-slate-50 to-transparent transition-opacity",
            !canRight && "opacity-0"
          )}
          aria-hidden
        />

        <div
          ref={scrollerRef}
          role="listbox"
          aria-label="Choose a training track"
          aria-orientation="horizontal"
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-2 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tracks.map((track) => {
            const progress = trackProgress(completedIds, track.lessons);
            const active = track.id === activeId;
            const locked = Boolean(lockedTrackIds?.has(track.id));
            const premier = PREMIER_TRACKS.has(track.id);
            const label = SHORT_LABEL[track.id] ?? track.title;

            return (
              <button
                key={track.id}
                type="button"
                role="option"
                data-track-id={track.id}
                aria-selected={active}
                onClick={() => onSelect(track.id)}
                className={cn(
                  "group flex w-[min(18.5rem,82vw)] shrink-0 snap-start flex-col gap-3 rounded-2xl border p-4 text-left shadow-sm transition duration-200",
                  "hover:-translate-y-1 hover:shadow-lg",
                  active
                    ? "border-[var(--brand)]/70 bg-gradient-to-br from-[var(--brand-2)] to-[var(--brand)] text-white shadow-[0_18px_34px_rgba(36,120,100,0.35)] ring-2 ring-[var(--accent)]/50"
                    : premier
                      ? "border-[var(--accent)]/70 bg-gradient-to-b from-white to-amber-50/40 shadow-[0_0_0_1px_rgba(216,192,122,0.25)]"
                      : "border-slate-200/90 bg-white",
                  locked && !active && "opacity-90"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-xl border",
                      active
                        ? "border-white/40 bg-white/15 text-white"
                        : "border-[var(--brand)]/25 bg-[#e8f6ef] text-[var(--brand-2)]"
                    )}
                  >
                    <TrackIcon trackId={track.id} className="h-5 w-5" />
                  </span>

                  {premier ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em]",
                        active
                          ? "border-white/35 bg-white/15 text-white"
                          : "border-[var(--accent)]/60 bg-[var(--accent)]/25 text-[var(--brand-2)]"
                      )}
                    >
                      <Sparkles className="h-3 w-3" />
                      Premier
                    </span>
                  ) : locked ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-extrabold",
                        active
                          ? "border-white/35 bg-white/15 text-white"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      )}
                    >
                      <Lock className="h-3 w-3" />
                      Locked
                    </span>
                  ) : (
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-extrabold tabular-nums",
                        active
                          ? "border-white/35 bg-white/15 text-white"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      )}
                    >
                      {progress.percent}%
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-[1.05rem] font-black tracking-tight",
                      active ? "text-white" : "text-slate-900"
                    )}
                  >
                    {label}
                  </p>
                  <p
                    className={cn(
                      "mt-1 line-clamp-2 text-xs font-semibold leading-snug",
                      active ? "text-white/80" : "text-slate-500"
                    )}
                  >
                    {track.subtitle}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div
                    className={cn(
                      "h-1.5 overflow-hidden rounded-full",
                      active ? "bg-white/25" : "bg-slate-200/90"
                    )}
                    aria-hidden
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        active
                          ? "bg-gradient-to-r from-white to-[var(--accent)]"
                          : "bg-gradient-to-r from-[var(--brand)] to-[var(--accent)]"
                      )}
                      style={{ width: `${Math.max(progress.percent, progress.percent > 0 ? 6 : 0)}%` }}
                    />
                  </div>
                  <p
                    className={cn(
                      "text-[10px] font-bold",
                      active ? "text-white/75" : "text-slate-500"
                    )}
                  >
                    {progress.completedCount}/{progress.totalCount} lessons
                    {locked ? " · unlock to start" : ""}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
