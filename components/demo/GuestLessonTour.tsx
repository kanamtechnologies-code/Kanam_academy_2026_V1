"use client";

import * as React from "react";
import { BookOpen, ListChecks, Play, Sparkles, Terminal } from "lucide-react";

import { SpotlightTour } from "@/components/ui/SpotlightTour";
import { isGuestMode } from "@/lib/guestProgress";

export const DEMO_LESSON_TOUR_FLAG = "kanam.demo.lessonTourPending";

const EXERCISE_STEP_IDS = new Set(["workspace", "run", "terminal"]);

export function GuestLessonTour({
  onRequestView,
}: {
  onRequestView?: (view: "lesson" | "exercises") => void;
}) {
  const [open, setOpen] = React.useState(false);
  const onRequestViewRef = React.useRef(onRequestView);

  React.useEffect(() => {
    onRequestViewRef.current = onRequestView;
  }, [onRequestView]);

  React.useEffect(() => {
    if (!isGuestMode()) return;
    try {
      if (window.localStorage.getItem(DEMO_LESSON_TOUR_FLAG) === "1") {
        window.localStorage.removeItem(DEMO_LESSON_TOUR_FLAG);
        setOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleStepChange = React.useCallback((step: { id: string }) => {
    onRequestViewRef.current?.(EXERCISE_STEP_IDS.has(step.id) ? "exercises" : "lesson");
  }, []);

  if (!open) return null;

  return (
    <SpotlightTour
      storageKey="kanam_guest_lesson_tour_v2_done"
      remember={false}
      defaultOpen
      fadeMs={160}
      recomputeDelayMs={140}
      onStepChange={handleStepChange}
      onDone={() => {
        setOpen(false);
        onRequestViewRef.current?.("exercises");
      }}
      steps={[
        {
          id: "hero",
          selector: '[data-tour="lesson-hero"]',
          title: "This is a real lesson",
          body: "Same canvas students use in class — goal, XP, and progress live up here.",
          icon: <Sparkles className="h-4 w-4" />,
          padding: 8,
        },
        {
          id: "teach",
          selector: '[data-tour="lesson-module"]',
          title: "Read the short lesson",
          body: "Skim the pictures and tips. When you're ready, tap Start the exercises.",
          icon: <BookOpen className="h-4 w-4" />,
          padding: 8,
        },
        {
          id: "workspace",
          selector: '[data-tour="lesson-exercise"]',
          title: "Your Python workspace",
          body: "Fill in the blanks for each exercise. Tiny typos matter — quotes, spaces, lowercase print().",
          icon: <ListChecks className="h-4 w-4" />,
          padding: 8,
        },
        {
          id: "run",
          selector: '[data-tour="lesson-run"]',
          title: "Run & check",
          body: "Press this to run your code. Kanam checks it and tells you what to fix.",
          icon: <Play className="h-4 w-4" />,
          padding: 8,
        },
        {
          id: "terminal",
          selector: '[data-tour="lesson-terminal"]',
          title: "Read the console",
          body: "Output and feedback show here. Finish both exercises to earn XP.",
          icon: <Terminal className="h-4 w-4" />,
          padding: 8,
        },
      ]}
    />
  );
}
