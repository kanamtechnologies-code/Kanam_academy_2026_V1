"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function withThemeAnimation(apply: () => void) {
  if (prefersReducedMotion()) {
    apply();
    return;
  }

  const root = document.documentElement;
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
  };

  const run = () => {
    root.classList.add("theme-animating");
    apply();
    window.setTimeout(() => {
      root.classList.remove("theme-animating");
    }, 420);
  };

  if (typeof doc.startViewTransition === "function") {
    doc.startViewTransition(run);
    return;
  }

  run();
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={() => withThemeAnimation(() => setTheme(isDark ? "light" : "dark"))}
      className={[
        // Fold cover / very narrow: compact icon. Wider phones: pill switch.
        "relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/60",
        "sm:h-11 sm:w-[4.75rem] sm:justify-start sm:rounded-full",
        "bg-white p-0.5 shadow-[0_10px_22px_rgba(15,23,42,0.28),0_2px_8px_rgba(15,23,42,0.12)] transition-all duration-300 sm:p-1",
        "hover:bg-white hover:shadow-[0_14px_28px_rgba(15,23,42,0.34)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25",
        "dark:border-white/60 dark:bg-white dark:hover:bg-white",
      ].join(" ")}
    >
      {/* Track icons — phone+ only */}
      <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 items-center justify-center sm:flex">
        <Sun
          className={[
            "h-3.5 w-3.5 transition-colors duration-300",
            isDark ? "text-slate-400" : "text-[color:var(--brand-2)]",
          ].join(" ")}
          aria-hidden
        />
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 items-center justify-center sm:flex">
        <Moon
          className={[
            "h-3.5 w-3.5 transition-colors duration-300",
            isDark ? "text-[color:var(--brand-2)]" : "text-slate-400",
          ].join(" ")}
          aria-hidden
        />
      </span>

      {/* Sliding thumb (full control on narrow; track thumb from sm up) */}
      <span
        aria-hidden
        className={[
          "relative z-[1] grid h-8 w-8 place-items-center rounded-full sm:h-9 sm:w-9",
          "bg-gradient-to-br from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
          "text-[var(--accent)] shadow-[0_6px_14px_rgba(15,110,87,0.4)]",
          "transition-transform duration-300 ease-out motion-reduce:transition-none",
          isDark ? "sm:translate-x-[1.65rem]" : "translate-x-0",
        ].join(" ")}
      >
        {isDark ? <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
      </span>
    </button>
  );
}
