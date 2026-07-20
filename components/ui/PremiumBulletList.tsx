import * as React from "react";

import { cn } from "@/lib/utils";

type PremiumBulletListProps = {
  items: React.ReactNode[];
  /** Optional label above the list (e.g. “Try next”). */
  title?: string;
  className?: string;
  itemClassName?: string;
  /** `panel` = soft cards (lesson complete / Try This). `inline` = lighter rows inside existing panels. `compact` = denser tips. */
  variant?: "panel" | "inline" | "compact";
};

/**
 * Shared premium bullet styling — replaces plain `•` / list-disc lists
 * without feeling loud or gamey.
 */
export function PremiumBulletList({
  items,
  title,
  className,
  itemClassName,
  variant = "panel",
}: PremiumBulletListProps) {
  if (!items.length) return null;

  return (
    <div className={cn(variant === "panel" ? "text-left" : undefined, className)}>
      {title ? (
        <p className="mb-2.5 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--brand-2)]">
          {title}
        </p>
      ) : null}
      <ul className={cn(variant === "compact" ? "space-y-1.5" : "space-y-2")}>
        {items.map((item, i) => (
          <li
            key={typeof item === "string" ? item : i}
            className={cn(
              "flex items-start gap-3 text-left",
              variant === "panel" &&
                "rounded-xl border border-[rgb(var(--brand-rgb)/0.12)] bg-gradient-to-r from-white via-white to-[rgb(var(--brand-rgb)/0.04)] px-3.5 py-2.5 shadow-[0_1px_2px_rgb(15_23_42/0.04)]",
              variant === "inline" &&
                "rounded-lg border border-slate-200/80 bg-white/70 px-3 py-2",
              variant === "compact" && "rounded-lg bg-slate-50/80 px-2.5 py-1.5"
            )}
          >
            <span
              className={cn(
                "mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md",
                variant === "compact"
                  ? "mt-1 h-3.5 w-3.5 bg-[var(--brand)]/10"
                  : "bg-[var(--brand)]/10"
              )}
              aria-hidden
            >
              <span
                className={cn(
                  "rounded-full bg-[var(--brand)]",
                  variant === "compact" ? "h-1 w-1" : "h-1.5 w-1.5"
                )}
              />
            </span>
            <span
              className={cn(
                "min-w-0 flex-1 leading-relaxed text-slate-700",
                variant === "compact" ? "text-xs" : "text-sm",
                itemClassName
              )}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
