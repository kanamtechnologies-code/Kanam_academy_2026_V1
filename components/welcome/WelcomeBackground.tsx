"use client";

import * as React from "react";

import { HeaderVideo } from "@/components/layout/HeaderVideo";

export function WelcomeBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh w-full min-w-0 max-w-[100vw] overflow-x-clip px-2.5 py-4 text-slate-900 sm:px-4 sm:py-8 md:px-6 md:py-10 dark:text-slate-100">
      {/* Full-screen video background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <HeaderVideo
          src="/video/8733062-uhd_3840_2160_30fps.mp4"
          playbackRate={0.35}
          className="h-full w-full object-cover opacity-45 dark:opacity-30"
        />
        {/* Readability wash — light in light mode, deep slate in dark mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/70 dark:from-slate-950/92 dark:via-slate-950/82 dark:to-slate-950/92" />
      </div>
      {/* min-w-0 keeps grid/flex children from blowing past Fold cover widths */}
      <div className="relative w-full min-w-0 max-w-full">{children}</div>
    </div>
  );
}

