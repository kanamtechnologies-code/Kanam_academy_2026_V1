"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Lock, Sparkles } from "lucide-react";

import { TrackIconArt } from "@/components/tracks/TrackIcon";
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

export function ExploreAcademyDrawer({
  tracks,
  activeId,
  onSelect,
  completedIds,
  lockedTrackIds,
  openLessonIds,
  classRestricted,
}: {
  tracks: Track[];
  activeId: string;
  onSelect: (id: string) => void;
  completedIds: string[];
  lockedTrackIds?: Set<string>;
  openLessonIds?: Set<string> | null;
  classRestricted?: boolean;
}) {
  const [browseOpen, setBrowseOpen] = React.useState(false);
  const otherTracks = tracks.filter((t) => t.id !== activeId);
  if (otherTracks.length === 0) return null;

  return (
    <div
      className={cn(
        "kanam-lift overflow-hidden rounded-[1.35rem] border",
        "border-[var(--accent)]/50 bg-gradient-to-br from-white via-slate-50 to-emerald-50/70",
        "ring-1 ring-black/5"
      )}
    >
      <button
        type="button"
        aria-expanded={browseOpen}
        onClick={() => setBrowseOpen((o) => !o)}
        className={cn(
          "group relative flex w-full items-center justify-between gap-3 overflow-hidden px-4 py-3 text-left sm:px-5 sm:py-3.5",
          "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)] text-white",
          "transition hover:brightness-[1.03]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
        <span className="relative z-10 min-w-0">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
              Explore the academy
            </span>
            <span className="rounded-full border border-white/30 bg-white/15 px-2 py-0.5 text-[10px] font-extrabold tabular-nums text-white">
              {otherTracks.length} path{otherTracks.length === 1 ? "" : "s"}
            </span>
          </span>
          <span className="mt-1 block text-sm font-semibold text-white/90">
            {browseOpen
              ? "Pick a path to open — or unlock one you want next"
              : "Browse Premier tracks, unlocks, and the rest of the catalog"}
          </span>
        </span>
        <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/35 bg-white/15 transition group-hover:bg-white/25">
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              browseOpen && "rotate-180"
            )}
          />
        </span>
      </button>

      {browseOpen ? (
        <div
          role="listbox"
          aria-label="Other training tracks"
          className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4"
        >
          {otherTracks.map((track) => {
            const p = trackProgress(completedIds, track.lessons, {
              openLessonIds: openLessonIds ?? null,
            });
            const locked = Boolean(lockedTrackIds?.has(track.id));
            const premier = PREMIER_TRACKS.has(track.id);
            const short = SHORT_LABEL[track.id] ?? track.title;
            const unlockHref = `/billing?track=${encodeURIComponent(track.id)}`;

            return (
              <article
                key={track.id}
                role="option"
                aria-selected={false}
                className={cn(
                  "group/card relative flex flex-col overflow-hidden rounded-2xl border p-4 transition duration-200",
                  "kanam-lift-sm hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(15,23,42,0.18)]",
                  premier
                    ? "border-[var(--accent)]/70 bg-gradient-to-b from-white via-white to-amber-50/50"
                    : "border-slate-200/90 bg-white",
                  locked && "bg-slate-50/80"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <TrackIconArt
                    trackId={track.id}
                    className="h-24 w-24 rounded-[1.35rem] shadow-[0_12px_28px_rgba(15,23,42,0.12)] ring-1 ring-black/5 transition duration-200 group-hover/card:-translate-y-0.5 group-hover/card:shadow-[0_16px_32px_rgba(15,23,42,0.16)] sm:h-[6.5rem] sm:w-[6.5rem]"
                    alt=""
                  />

                  {premier ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--accent)]/60 bg-[var(--accent)]/25 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-[var(--brand-2)]">
                      <Sparkles className="h-3 w-3" />
                      Premier
                    </span>
                  ) : locked ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-extrabold text-slate-600">
                      <Lock className="h-3 w-3" />
                      {classRestricted ? "Not assigned" : "Locked"}
                    </span>
                  ) : (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">
                      Unlocked
                    </span>
                  )}
                </div>

                <div className="mt-4 min-w-0 flex-1">
                  <h3 className="text-lg font-black tracking-tight text-slate-900">
                    {short}
                  </h3>
                  <p className="mt-1.5 text-sm font-bold leading-snug text-[var(--brand-2)] sm:text-[0.95rem]">
                    {track.outcome}
                  </p>
                </div>

                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-slate-500">
                    <span>{p.totalCount} lessons · ~8 weeks</span>
                    <span className="tabular-nums">{locked ? "—" : `${p.percent}%`}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-200/90" aria-hidden>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--accent)] transition-all"
                      style={{
                        width: locked
                          ? "0%"
                          : `${Math.max(p.percent, p.percent > 0 ? 6 : 0)}%`,
                      }}
                    />
                  </div>
                  {!locked ? (
                    <p className="text-[10px] font-semibold text-slate-500">
                      {p.completedCount}/{p.totalCount} complete
                    </p>
                  ) : (
                    <p className="text-[10px] font-semibold text-slate-500">
                      {classRestricted
                        ? "Ask your instructor — or unlock on your own"
                        : "Buy this path or subscribe to open lessons"}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  {locked ? (
                    <Link
                      href={unlockHref}
                      className={cn(
                        "inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl px-3 text-sm font-extrabold transition",
                        "border border-[var(--accent)]/70 bg-gradient-to-r from-[var(--accent)] to-[#c9a84e] text-slate-950",
                        "shadow-[0_8px_18px_rgba(216,192,122,0.35)] hover:brightness-[1.03]"
                      )}
                    >
                      <Lock className="h-3.5 w-3.5" />
                      Unlock path
                      <ChevronRight className="h-4 w-4 opacity-80" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(track.id);
                        setBrowseOpen(false);
                      }}
                      className={cn(
                        "inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl px-3 text-sm font-extrabold transition",
                        "bg-gradient-to-br from-[var(--brand-2)] to-[var(--brand)] text-white",
                        "shadow-[0_10px_22px_rgba(36,120,100,0.28)] hover:brightness-110"
                      )}
                    >
                      Open path
                      <ChevronRight className="h-4 w-4 opacity-90" />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
