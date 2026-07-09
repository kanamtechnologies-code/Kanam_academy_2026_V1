"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Flame, LayoutDashboard, Trophy } from "lucide-react";

import { SpotlightTour } from "@/components/ui/SpotlightTour";
import { isGuestMode } from "@/lib/guestProgress";

const DEMO_TOUR_FLAG = "kanam.demo.tourPending";

export function GuestDashboardTour() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isGuestMode()) return;
    try {
      if (window.localStorage.getItem(DEMO_TOUR_FLAG) === "1") {
        window.localStorage.removeItem(DEMO_TOUR_FLAG);
        setOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  if (!open) return null;

  return (
    <SpotlightTour
      storageKey="kanam_guest_dashboard_tour_v2_done"
      remember={false}
      defaultOpen
      fadeMs={380}
      moveMs={700}
      recomputeDelayMs={500}
      onDone={() => {
        setOpen(false);
        router.push("/learn/demo?view=lesson");
      }}
      steps={[
        {
          id: "hero",
          selector: '[data-tour="dash-hero"]',
          title: "Your learning hub",
          body: "This is the real student dashboard — XP, progress, and your next lesson live here.",
          icon: <LayoutDashboard className="h-4 w-4" />,
          padding: 12,
        },
        {
          id: "stats",
          selector: '[data-tour="dash-stats"]',
          title: "XP & progress",
          body: "Finish lessons to earn XP. Stats update on this device while you're in demo mode.",
          icon: <Trophy className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "tracks",
          selector: '[data-tour="dash-tracks"]',
          title: "Four learning tracks",
          body: "AI Literacy, Digital Literacy, Python, and Data Analyst — switch tabs to explore each roadmap.",
          icon: <BookOpen className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "try",
          selector: '[data-tour="dash-try-lesson"]',
          title: "Try a real lesson",
          body: "Next we'll open the lesson canvas — coach note, exercises, and Run & check.",
          icon: <Flame className="h-4 w-4" />,
          padding: 12,
        },
      ]}
    />
  );
}
