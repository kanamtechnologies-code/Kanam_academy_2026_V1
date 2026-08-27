"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { getMarketingSiteUrl } from "@/lib/marketingSite";

/**
 * Upper-left brand control. Opens the public Kanam site (not the learn app).
 * One clear CTA — no separate Explore Kanam control on small screens.
 */
export function HeaderBrand() {
  const href = getMarketingSiteUrl();

  return (
    <a
      href={href}
      aria-label="Kanam Academy — go to the main website"
      title="Go to kanamacademy.com"
      className={[
        "group inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[rgb(var(--accent-rgb)/0.95)] bg-white px-1.5 py-1",
        "sm:gap-2 sm:rounded-2xl sm:px-3 sm:py-2",
        "transform-gpu transition-all duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-y-[1px] hover:bg-white",
        "active:translate-y-0 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.25)]",
      ].join(" ")}
    >
      <Image
        src="/images/kanam-logo-nav.png"
        alt=""
        width={348}
        height={104}
        className="h-6 w-auto max-w-[6.75rem] object-contain object-left sm:h-8 sm:max-w-[9.5rem] md:h-9 md:max-w-none"
        priority
        unoptimized
      />
      <span
        className={[
          "inline-flex shrink-0 items-center gap-0.5 rounded-lg",
          "bg-gradient-to-br from-[rgb(var(--accent-rgb)/0.95)] to-[#c9a84e]",
          "px-1.5 py-1 text-[10px] font-black uppercase tracking-[0.04em] text-slate-950",
          "shadow-sm sm:px-2 sm:text-[11px] sm:tracking-[0.06em]",
        ].join(" ")}
      >
        <span className="sm:hidden">Site</span>
        <span className="hidden sm:inline">Main site</span>
        <ArrowUpRight className="h-3 w-3 shrink-0 opacity-90 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
