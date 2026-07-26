"use client";

import { PocketKnife } from "lucide-react";

import { useLessonHelpPocketOptional } from "@/components/lesson/LessonHelpPocketContext";
import { cn } from "@/lib/utils";

/**
 * Mobile-only header control that opens/closes the lesson Help Pocket sheet.
 * Replaces Instructor in the nav on small screens while a lesson is active.
 */
export function HeaderHelpPocket() {
  const pocket = useLessonHelpPocketOptional();
  if (!pocket?.available) return null;

  return (
    <button
      type="button"
      data-tour="lesson-help-pocket"
      aria-label={pocket.open ? "Close help pocket" : "Open help pocket"}
      aria-pressed={pocket.open}
      title="Help pocket"
      onClick={() => pocket.toggle()}
      className={cn(
        "relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full lg:hidden",
        "border border-white/25 bg-white/10 text-white",
        "transition-all duration-200 ease-out",
        "hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25",
        "active:scale-[0.96]",
        pocket.open &&
          "bg-white text-[color:var(--brand-2)] shadow-md ring-2 ring-white/40 hover:bg-white"
      )}
    >
      <PocketKnife
        className={cn(
          "h-4 w-4 transition-transform duration-300 ease-out",
          pocket.open && "rotate-[-12deg] scale-110"
        )}
      />
      {pocket.attention && !pocket.open ? (
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-2 ring-[rgb(var(--brand-2-rgb)/0.9)]" />
      ) : null}
    </button>
  );
}
