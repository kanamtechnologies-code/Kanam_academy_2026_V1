"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";

import { getMarketingSiteUrl } from "@/lib/marketingSite";
import { cn } from "@/lib/utils";

/**
 * Header control to the public Kanam site — programs, pricing, and story.
 * Styled as a warm gold CTA so it feels intentional, not like a raw external URL.
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
        "group inline-flex h-10 w-10 shrink-0 items-center justify-center gap-1.5 rounded-full border border-[rgb(var(--accent-rgb)/0.95)] bg-[rgb(var(--accent-rgb)/0.96)] px-0 text-xs font-extrabold tracking-tight text-slate-950 shadow-[0_6px_16px_rgba(216,192,122,0.35)]",
        "transform-gpu transition-all duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-y-[1px] hover:brightness-[1.04] hover:shadow-[0_10px_22px_rgba(216,192,122,0.45)]",
        "active:translate-y-0 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--accent-rgb)/0.35)]",
        "sm:h-11 sm:w-auto sm:rounded-xl sm:px-3.5",
        className
      )}
    >
      <Sparkles className="h-4 w-4 shrink-0 text-[var(--brand-2)] transition-transform duration-200 group-hover:rotate-12" />
      <span className="hidden sm:inline">Explore Kanam</span>
      <ArrowUpRight className="hidden h-3.5 w-3.5 shrink-0 opacity-80 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:inline" />
    </a>
  );
}
