"use client";

import { LessonHelpPocketProvider } from "@/components/lesson/LessonHelpPocketContext";
import { AuthActions } from "@/components/layout/AuthActions";
import { HeaderBrand } from "@/components/layout/HeaderBrand";
import { HeaderExploreKanam } from "@/components/layout/HeaderExploreKanam";
import { HeaderHelp } from "@/components/layout/HeaderHelp";
import { HeaderHelpPocket } from "@/components/layout/HeaderHelpPocket";
import { HeaderInstructor } from "@/components/layout/HeaderInstructor";
import { HeaderVideo } from "@/components/layout/HeaderVideo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function AppChrome({ children }: { children: React.ReactNode }) {
  return (
    <LessonHelpPocketProvider>
      <header
        className="sticky top-0 z-[80] max-w-[100vw] overflow-x-clip border-b-2 border-[rgb(var(--accent-rgb)/0.98)] bg-gradient-to-r from-[rgb(var(--brand-2-rgb)/0.98)] via-[rgb(var(--brand-rgb)/0.92)] to-[rgb(var(--accent-rgb)/0.86)] shadow-xl"
        style={{ ["--kanam-header-height" as string]: "4.75rem" }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[rgb(var(--accent-rgb)/0.92)] via-[rgb(var(--brand-rgb)/0.92)] to-[rgb(var(--accent-rgb)/0.92)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <HeaderVideo
            className="h-full w-full object-cover opacity-[0.06] saturate-0"
            src="/video/8733062-uhd_3840_2160_30fps.mp4"
            playbackRate={0.35}
          />
        </div>

        <div className="relative flex w-full min-w-0 max-w-full items-center justify-between gap-2 px-2 py-2 sm:gap-3 sm:px-4 sm:py-3 md:px-10">
          <HeaderBrand />
          <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
            <HeaderExploreKanam />
            <HeaderHelpPocket />
            <HeaderInstructor />
            <AuthActions />
            <ThemeToggle />
            <HeaderHelp />
          </div>
        </div>
      </header>
      {children}
    </LessonHelpPocketProvider>
  );
}
