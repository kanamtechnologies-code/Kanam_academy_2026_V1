"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { getMarketingSiteUrl } from "@/lib/marketingSite";

/**
 * Upper-left brand control. Opens the public Kanam site (not the learn app).
 * On mobile, a visible “Main site” chip makes the destination obvious.
 */
export function HeaderBrand() {
  const href = getMarketingSiteUrl();

  return (
    <a
      href={href}
      aria-label="Kanam Academy — go to the main website"
      title="Go to kanamacademy.com"
      className={[
        "group inline-flex min-w-0 max-w-[min(100%,18rem)] shrink items-center gap-1.5 rounded-xl border border-[rgb(var(--accent-rgb)/0.95)] bg-white px-1.5 py-1 sm:max-w-none sm:gap-2.5 sm:rounded-2xl sm:px-3.5 sm:py-2.5",
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
        className="h-6 w-auto max-w-[7.25rem] object-contain object-left sm:h-9 sm:max-w-none"
        priority
        unoptimized
      />
      <span
        className={[
          "inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-[rgb(var(--brand-2-rgb)/0.2)]",
          "bg-gradient-to-br from-[rgb(var(--accent-rgb)/0.95)] to-[#c9a84e] px-1.5 py-1",
          "text-[10px] font-black uppercase tracking-[0.06em] text-slate-950",
          "shadow-sm sm:px-2 sm:py-1 sm:text-[11px] sm:tracking-[0.08em]",
        ].join(" ")}
      >
        Main site
        <ArrowUpRight className="h-3 w-3 shrink-0 opacity-90 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
      </span>
      <span className="sr-only">Kanam Academy — opens the main website</span>
    </a>
  );
}
