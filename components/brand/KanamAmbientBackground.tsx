"use client";

import * as React from "react";

import { HeaderVideo } from "@/components/layout/HeaderVideo";
import { cn } from "@/lib/utils";

/** Shared ambient video used on welcome + dashboard — video only, no overlays. */
export const KANAM_AMBIENT_VIDEO = "/video/8733062-uhd_3840_2160_30fps.mp4";

export function KanamAmbientBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.add("kanam-has-ambient-video");
    return () => root.classList.remove("kanam-has-ambient-video");
  }, []);

  return (
    <div
      className={cn(
        "relative min-h-dvh w-full min-w-0 max-w-[100vw] overflow-x-clip bg-transparent text-slate-900 dark:text-slate-100",
        className
      )}
    >
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <HeaderVideo
          src={KANAM_AMBIENT_VIDEO}
          playbackRate={0.35}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative z-10 w-full min-w-0 max-w-full bg-transparent">
        {children}
      </div>
    </div>
  );
}
