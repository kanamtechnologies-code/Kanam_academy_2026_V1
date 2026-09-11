"use client";

import { Compass } from "lucide-react";

import { useLessonHelpPocketOptional } from "@/components/lesson/LessonHelpPocketContext";
import { cn } from "@/lib/utils";

/**
 * Mobile-only Help control — sits on the same row as Lesson / Exercises and
 * opens the help pocket sheet (Coach, Commands, etc.). Not shown in the nav bar.
 */
export function HeaderHelpPocket() {
  const pocket = useLessonHelpPocketOptional();
  if (!pocket?.available) return null;

  return (
    <button
      type="button"
      data-tour="lesson-help-pocket"
      aria-label={pocket.open ? "Close help" : "Open help"}
      aria-pressed={pocket.open}
      title="Help"
      onClick={() => pocket.toggle()}
      className={cn(
        "relative flex min-h-11 w-11 shrink-0 items-center justify-center rounded-xl py-2.5 text-sm font-bold transition-colors sm:w-auto sm:gap-1.5 sm:px-3 lg:hidden",
        pocket.open
          ? "bg-[var(--brand)] text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100"
      )}
    >
      <Compass
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-300 ease-out",
          pocket.open && "rotate-45 scale-110"
        )}
      />
      <span className="hidden sm:inline">Help</span>
      {pocket.attention && !pocket.open ? (
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--accent)] ring-2 ring-white" />
      ) : null}
    </button>
  );
}
