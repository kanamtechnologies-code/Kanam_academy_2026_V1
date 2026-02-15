"use client";

import Image from "next/image";
import Link from "next/link";

export function HeaderBrand() {
  // Always return to the welcome flow when clicking the brand.
  // (Keeps behavior predictable: "Kanam Academy" = onboarding/home base.)
  const href = "/welcome";
  const slogan = process.env.NEXT_PUBLIC_KANAM_SLOGAN || "Move forward";

  return (
    <Link
      href={href}
      className={[
        "group flex min-w-0 items-center gap-2 rounded-2xl border border-[rgb(var(--accent-rgb)/0.95)] bg-white/95 px-3 py-2",
        "shadow-lg shadow-slate-950/10",
        "transform-gpu transition-all duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-y-[1px] hover:shadow-xl hover:shadow-slate-950/15 hover:bg-white",
        "active:translate-y-0 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.25)]",
      ].join(" ")}
    >
      <Image
        src="/images/Logo.png"
        alt="Kanam Academy logo"
        width={44}
        height={44}
        className="relative -top-0.5 drop-shadow-[0_10px_14px_rgba(0,0,0,0.12)]"
        priority
      />
      <span className="flex min-w-0 flex-col leading-[1.05]">
        <span className="text-base font-semibold tracking-tight sm:text-lg">
          <span className="sr-only">Kanam Academy</span>
          <span
            aria-hidden
            className="text-[color:var(--brand-2)] decoration-[rgb(var(--accent-rgb)/0.85)] decoration-2 underline-offset-4 group-hover:underline"
          >
            anam
          </span>{" "}
          <span className="text-[color:var(--brand-2)] decoration-[rgb(var(--accent-rgb)/0.85)] decoration-2 underline-offset-4 group-hover:underline">
            Academy
          </span>
        </span>
        <span
          className={[
            "mt-0.5",
            "text-[10px] sm:text-[11px]",
            "font-extrabold uppercase",
            "tracking-[0.26em]",
            "text-[rgb(var(--accent-rgb)/0.95)]",
            "kanam-text-pop",
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

