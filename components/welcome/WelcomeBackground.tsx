"use client";

import * as React from "react";

import { HeaderVideo } from "@/components/layout/HeaderVideo";

export function WelcomeBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh px-3 py-5 text-slate-900 sm:px-4 sm:py-8 md:px-6 md:py-10">
      {/* Full-screen video background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <HeaderVideo
          src="/video/8733062-uhd_3840_2160_30fps.mp4"
          playbackRate={0.35}
          className="h-full w-full object-cover opacity-45"
        />
        {/* light readability gradient (no black) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/70" />
      </div>
      {children}
    </div>
  );
}

