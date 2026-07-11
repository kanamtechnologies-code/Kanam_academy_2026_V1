"use client";

import * as React from "react";
import { Lock, type LucideIcon } from "lucide-react";

import {
  badgeIconForLesson,
  lessonIdFromBadgeLabel,
} from "@/lib/badgeIcons";
import { cn } from "@/lib/utils";

type PremiumBadgeProps = {
  /** Preferred: lesson id like "lesson-14" / "ai-1". */
  lessonId?: string;
  /** Badge display name (e.g. "Quest Builder"). */
  name: string;
  /** chip = hero/header; medal = dashboard collection; seal = completion. */
  variant?: "chip" | "medal" | "seal";
  unlocked?: boolean;
  className?: string;
  statusLabel?: string;
};

function resolveIcon(lessonId: string | undefined, name: string): LucideIcon {
  const id = lessonId || lessonIdFromBadgeLabel(name) || "";
  return badgeIconForLesson(id);
}

function BadgeGlyph({
  icon: Icon,
  className,
  strokeWidth = 2,
}: {
  icon: LucideIcon;
  className?: string;
  strokeWidth?: number;
}) {
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden />;
}

/**
 * Premium Kanam badge — unique Lucide mark + refined metal/glass treatment.
 * No emoji.
 */
export function PremiumBadge({
  lessonId,
  name,
  variant = "chip",
  unlocked = true,
  className,
  statusLabel,
}: PremiumBadgeProps) {
  const icon = resolveIcon(lessonId, name);

  if (variant === "chip") {
    return (
      <span
        className={cn(
          "kanam-hero-chip inline-flex items-center gap-1.5 rounded-full text-sm",
          className
        )}
      >
        <span className="kanam-badge-mark kanam-badge-mark--chip">
          <BadgeGlyph icon={icon} className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
        <span>{name}</span>
      </span>
    );
  }

  if (variant === "seal") {
    return (
      <div className={cn("inline-flex flex-col items-center gap-2", className)}>
        <div className={cn("kanam-badge-medal", unlocked ? "is-unlocked" : "is-locked")}>
          <span className="kanam-badge-medal-ring" aria-hidden />
          <span className="kanam-badge-medal-core">
            <BadgeGlyph icon={icon} className="h-7 w-7" />
          </span>
        </div>
        <span className="rounded-full bg-[var(--brand)] px-4 py-1.5 text-sm font-bold text-white">
          {name}
        </span>
      </div>
    );
  }

  // medal — dashboard collection card face
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className={cn("kanam-badge-medal", unlocked ? "is-unlocked" : "is-locked")}>
        <span className="kanam-badge-medal-ring" aria-hidden />
        <span className="kanam-badge-medal-core">
          {unlocked ? (
            <BadgeGlyph icon={icon} className="h-6 w-6" />
          ) : (
            <Lock className="h-5 w-5 text-slate-400" strokeWidth={2} aria-hidden />
          )}
        </span>
      </div>
      <p
        className={cn(
          "mt-3 text-sm font-bold tracking-tight",
          unlocked ? "text-slate-900" : "text-slate-500"
        )}
      >
        {name}
      </p>
      {statusLabel ? (
        <p
          className={cn(
            "mt-0.5 text-[11px] font-semibold uppercase tracking-wide",
            unlocked ? "text-[var(--brand)]" : "text-slate-400"
          )}
        >
          {statusLabel}
        </p>
      ) : null}
    </div>
  );
}

/** Compact icon-only mark for inline XP rows. */
export function PremiumBadgeMark({
  lessonId,
  name,
  className,
}: {
  lessonId?: string;
  name?: string;
  className?: string;
}) {
  const icon = resolveIcon(lessonId, name ?? "");
  return (
    <span className={cn("kanam-badge-mark inline-flex", className)}>
      <BadgeGlyph icon={icon} className="h-3.5 w-3.5" strokeWidth={2.25} />
    </span>
  );
}
