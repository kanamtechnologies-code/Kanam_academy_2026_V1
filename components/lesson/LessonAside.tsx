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
  tone = "default",
  "data-tour": dataTour,
}: {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
  /** `coach` gets a warmer, more editorial treatment for Coach's note. */
  tone?: "default" | "coach" | "brand";
  "data-tour"?: string;
}) {
  return (
    <details
      open={defaultOpen}
      className={cn(
        "group/aside overflow-hidden rounded-[18px] border bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
        "transition-[border-color,box-shadow] duration-200",
        "open:shadow-[0_12px_32px_rgba(15,23,42,0.08)]",
        tone === "coach" &&
          "border-[rgb(var(--brand-rgb)/0.22)] open:border-[rgb(var(--brand-rgb)/0.38)]",
        tone === "brand" &&
          "border-[rgb(var(--brand-rgb)/0.28)] bg-[rgb(var(--brand-rgb)/0.03)]",
        tone === "default" && "border-slate-200/90 open:border-slate-300",
        className
      )}
    >
      {tone === "coach" ? (
        <div
          className="h-0.5 w-full bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--accent)] opacity-90"
          aria-hidden
        />
      ) : null}
      <summary
        data-tour={dataTour}
        className={cn(
          "flex list-none items-center justify-between gap-3 px-4 py-3.5",
          "cursor-pointer select-none",
          "transition-colors duration-150",
          "hover:bg-slate-50/90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-rgb)/0.35)] focus-visible:ring-inset",
          "[&::-webkit-details-marker]:hidden",
          tone === "coach" && "hover:bg-[rgb(var(--brand-rgb)/0.04)]"
        )}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
              tone === "coach" &&
                "bg-[rgb(var(--brand-rgb)/0.1)] text-[var(--brand-2)] ring-1 ring-[rgb(var(--brand-rgb)/0.16)]",
              tone === "brand" &&
                "bg-[rgb(var(--brand-rgb)/0.12)] text-[var(--brand)] ring-1 ring-[rgb(var(--brand-rgb)/0.18)]",
              tone === "default" && "bg-slate-100 text-slate-700 ring-1 ring-slate-200/80"
            )}
          >
            {icon}
          </span>
          <span className="min-w-0">
            {tone === "coach" || tone === "brand" ? (
              <span className="block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[color:var(--brand-2)]">
                {tone === "coach" ? "Guidance" : "Reference"}
              </span>
            ) : null}
            <span
              className={cn(
                "block truncate font-bold tracking-tight text-slate-900",
                tone === "coach" || tone === "brand"
                  ? "mt-0.5 text-[15px]"
                  : "text-[15px]"
              )}
            >
              {title}
            </span>
          </span>
        </span>
        <span
          className={cn(
            "grid h-8 w-8 shrink-0 place-items-center rounded-full",
            "border border-slate-200 bg-white text-slate-500 shadow-sm",
            "transition-all duration-200",
            "group-open/aside:rotate-180 group-open/aside:border-[rgb(var(--brand-rgb)/0.35)]",
            "group-open/aside:bg-[rgb(var(--brand-rgb)/0.08)] group-open/aside:text-[var(--brand-2)]",
            "group-hover/aside:border-slate-300"
          )}
          aria-hidden
        >
          <ChevronDown className="h-4 w-4 stroke-[2.25]" />
        </span>
      </summary>
      <div
        className={cn(
          "border-t px-4 pb-4 pt-3",
          tone === "coach"
            ? "border-[rgb(var(--brand-rgb)/0.12)] bg-gradient-to-b from-[rgb(var(--brand-rgb)/0.03)] to-white"
            : "border-slate-100 bg-white"
        )}
      >
        {children}
      </div>
    </details>
  );
}
