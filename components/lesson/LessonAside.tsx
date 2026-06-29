"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Collapsible reference panel used in the exercises view of a lesson.
 * Keeps the supporting "aside" column compact so it stays balanced with
 * the workspace instead of stretching into a long single column.
 */
export function LessonAside({
  title,
  icon,
  defaultOpen = false,
  className,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className={cn(
        "group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
        className
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-base font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-4 pt-0">{children}</div>
    </details>
  );
}
