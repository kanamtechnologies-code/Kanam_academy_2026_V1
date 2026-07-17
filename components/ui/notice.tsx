import * as React from "react";
import { AlertCircle, CheckCircle2, Info, Lock, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const VARIANT: Record<
  "lock" | "info" | "success" | "danger",
  {
    icon: LucideIcon;
    shell: string;
    iconWrap: string;
    iconClass: string;
  }
> = {
  lock: {
    icon: Lock,
    shell:
      "border-[rgb(var(--accent-rgb)/0.45)] bg-gradient-to-br from-white via-[rgb(var(--accent-rgb)/0.12)] to-[rgb(var(--brand-rgb)/0.08)]",
    iconWrap: "bg-[rgb(var(--brand-2-rgb)/0.12)] ring-[rgb(var(--accent-rgb)/0.55)]",
    iconClass: "text-[var(--brand-2)]",
  },
  info: {
    icon: Info,
    shell:
      "border-[rgb(var(--brand-rgb)/0.28)] bg-gradient-to-br from-white via-[rgb(var(--brand-rgb)/0.08)] to-[rgb(var(--accent-rgb)/0.1)]",
    iconWrap: "bg-[rgb(var(--brand-rgb)/0.12)] ring-[rgb(var(--brand-rgb)/0.35)]",
    iconClass: "text-[var(--brand-2)]",
  },
  success: {
    icon: CheckCircle2,
    shell:
      "border-[rgb(var(--brand-rgb)/0.4)] bg-gradient-to-br from-white via-[rgb(var(--brand-rgb)/0.12)] to-emerald-50/80",
    iconWrap: "bg-[rgb(var(--brand-rgb)/0.14)] ring-[rgb(var(--brand-rgb)/0.4)]",
    iconClass: "text-[var(--brand)]",
  },
  danger: {
    icon: AlertCircle,
    shell: "border-rose-200/90 bg-gradient-to-br from-white via-rose-50/90 to-orange-50/50",
    iconWrap: "bg-rose-100/90 ring-rose-200",
    iconClass: "text-rose-700",
  },
};

export function Notice({
  variant = "info",
  title,
  children,
  action,
  className,
  role = "status",
  compact = false,
}: {
  variant?: keyof typeof VARIANT;
  title?: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  role?: "status" | "alert";
  /** Tighter padding for inline exercise / form feedback. */
  compact?: boolean;
}) {
  const cfg = VARIANT[variant];
  const Icon = cfg.icon;

  return (
    <div
      role={role}
      className={cn(
        "relative overflow-hidden rounded-2xl border shadow-sm",
        compact ? "px-3.5 py-3 sm:px-4" : "px-4 py-3.5 sm:px-5 sm:py-4",
        cfg.shell,
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--accent)] via-[var(--brand)] to-[var(--brand-2)]"
      />
      <div className={cn("flex pl-1.5", compact ? "gap-2.5" : "gap-3 sm:gap-3.5")}>
        <div
          className={cn(
            "mt-0.5 grid shrink-0 place-items-center rounded-xl ring-1",
            compact ? "h-8 w-8" : "h-9 w-9",
            cfg.iconWrap
          )}
        >
          <Icon
            className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4", cfg.iconClass)}
            strokeWidth={2.25}
          />
        </div>
        <div className="min-w-0 flex-1">
          {title ? (
            <p
              className={cn(
                "font-black tracking-tight text-slate-900",
                compact ? "text-sm" : "text-sm sm:text-[0.95rem]"
              )}
            >
              {title}
            </p>
          ) : null}
          {children ? (
            <div
              className={cn(
                "leading-relaxed text-slate-600",
                compact ? "text-[13px]" : "text-sm",
                title ? "mt-1" : null
              )}
            >
              {children}
            </div>
          ) : null}
          {action ? (
            <div className={cn("flex flex-wrap gap-2", compact ? "mt-2.5" : "mt-3")}>
              {action}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
