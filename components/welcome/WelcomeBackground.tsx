"use client";

import * as React from "react";

import { HeaderVideo } from "@/components/layout/HeaderVideo";

export function WelcomeBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh px-4 py-10 text-slate-900 md:px-6">
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

