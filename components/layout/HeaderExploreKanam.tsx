"use client";

import { ArrowUpRight } from "lucide-react";

import { getMarketingSiteUrl } from "@/lib/marketingSite";
import { cn } from "@/lib/utils";

/**
 * Desktop-only secondary link to the public Kanam site.
 * Phones/tablets use HeaderBrand (“Site” / “Main site”) so the header stays uncrowded.
 */
export function HeaderExploreKanam({ className }: { className?: string }) {
  const href = getMarketingSiteUrl();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Explore Kanam Academy on our main website"
      title="Explore Kanam Academy"
      className={cn(
        "group hidden h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[rgb(var(--accent-rgb)/0.95)] bg-[rgb(var(--accent-rgb)/0.96)] px-3.5 text-xs font-extrabold tracking-tight text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.22),0_4px_12px_rgba(216,192,122,0.45)] lg:inline-flex",
        "transform-gpu transition-all duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-y-[1px] hover:brightness-[1.04] hover:shadow-[0_14px_28px_rgba(15,23,42,0.28),0_6px_16px_rgba(216,192,122,0.55)]",
        "active:translate-y-0 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--accent-rgb)/0.35)]",
        className
      )}
    >
      <span>Explore Kanam</span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-80 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
