"use client";

import Image from "next/image";
import Link from "next/link";

export function HeaderBrand() {
  const href = "/welcome";
  const slogan = process.env.NEXT_PUBLIC_KANAM_SLOGAN || "Move forward";

  return (
    <Link
      href={href}
      aria-label="Kanam Academy"
      className={[
        "group flex min-w-0 max-w-[min(100%,14rem)] items-center rounded-2xl border border-[rgb(var(--accent-rgb)/0.95)] bg-white/95 px-2 py-1.5 sm:max-w-none sm:px-2.5 sm:py-2",
        "shadow-lg shadow-slate-950/10",
        "transform-gpu transition-all duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-y-[1px] hover:bg-white hover:shadow-xl hover:shadow-slate-950/15",
        "active:translate-y-0 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.25)]",
      ].join(" ")}
    >
      <Image
        src="/images/Logo.png"
        alt=""
        width={44}
        height={44}
        className="relative z-10 h-9 w-9 shrink-0 drop-shadow-[0_10px_14px_rgba(0,0,0,0.12)] sm:h-11 sm:w-11"
        priority
      />
      {/* Pull wordmark into the mark’s transparent right padding so “Kanam” reads as one unit. */}
      <span className="relative z-0 flex min-w-0 -ml-5 flex-col leading-[1.05] sm:-ml-6">
        <span
          aria-hidden
          className="truncate text-sm font-semibold tracking-[-0.035em] text-[color:var(--brand-2)] sm:text-lg"
        >
          <span className="decoration-[rgb(var(--accent-rgb)/0.85)] decoration-2 underline-offset-4 group-hover:underline">
            anam
          </span>{" "}
          <span className="decoration-[rgb(var(--accent-rgb)/0.85)] decoration-2 underline-offset-4 group-hover:underline">
            Academy
          </span>
        </span>
        <span
          aria-hidden
          className={[
            "mt-0.5 hidden sm:block",
            "text-[10px] sm:text-[11px]",
            "font-extrabold uppercase",
            "tracking-[0.18em]",
            "text-[rgb(var(--accent-rgb)/0.95)]",
            "opacity-90 group-hover:opacity-100",
            "max-w-[180px] truncate whitespace-nowrap sm:max-w-none",
          ].join(" ")}
        >
          {slogan}
        </span>
      </span>
    </Link>
  );
}
