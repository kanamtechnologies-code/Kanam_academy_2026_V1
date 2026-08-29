"use client";

import * as React from "react";

import { KanamAmbientBackground } from "@/components/brand/KanamAmbientBackground";

export function WelcomeBackground({ children }: { children: React.ReactNode }) {
  return (
    <KanamAmbientBackground className="px-2.5 py-4 sm:px-4 sm:py-8 md:px-6 md:py-10">
      {children}
    </KanamAmbientBackground>
  );
}
