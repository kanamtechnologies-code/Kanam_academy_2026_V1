"use client";

import * as React from "react";
import {
  BookOpen,
  Code2,
  Columns2,
  ListChecks,
  MessageSquareText,
  Play,
  Sparkles,
  Target,
  Terminal,
} from "lucide-react";

import { useLessonHelpPocketOptional } from "@/components/lesson/LessonHelpPocketContext";
import { SpotlightTour } from "@/components/ui/SpotlightTour";
import { isGuestMode } from "@/lib/guestProgress";

export const DEMO_LESSON_TOUR_FLAG = "kanam.demo.lessonTourPending";

/** Steps that live on the Exercises tab (switch view before spotlighting). */
const EXERCISE_STEP_IDS = new Set([
  "tabs-exercises",
  "coach",
  "exercise-nav",
  "goal",
  "editor",
  "run",
  "terminal",
]);

/**
 * Product walkthrough: how to use the Kanam lesson canvas.
 * Each step spotlights the exact control to click (gold highlight).
 */
export function GuestLessonTour({
  onRequestView,
  onTourComplete,
  onTourActiveChange,
}: {
  onRequestView?: (view: "lesson" | "exercises") => void;
  /** Called when the tour finishes — use to reset the lesson to slide 1. */
  onTourComplete?: () => void;
  /** True while the spotlight tour is open (lock lesson navigation). */
  onTourActiveChange?: (active: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const helpPocket = useLessonHelpPocketOptional();
  const onRequestViewRef = React.useRef(onRequestView);
  const onTourCompleteRef = React.useRef(onTourComplete);
  const onTourActiveChangeRef = React.useRef(onTourActiveChange);
  const helpPocketRef = React.useRef(helpPocket);

  React.useEffect(() => {
    onRequestViewRef.current = onRequestView;
  }, [onRequestView]);

  React.useEffect(() => {
    onTourCompleteRef.current = onTourComplete;
  }, [onTourComplete]);

  React.useEffect(() => {
    onTourActiveChangeRef.current = onTourActiveChange;
  }, [onTourActiveChange]);

  React.useEffect(() => {
    helpPocketRef.current = helpPocket;
  }, [helpPocket]);

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

  React.useEffect(() => {
    onTourActiveChangeRef.current?.(open);
    return () => onTourActiveChangeRef.current?.(false);
  }, [open]);

  // While the tour runs, never leave Help pocket open — it covers exercise
  // targets and made the gold highlight look stuck on coach-note text.
  React.useEffect(() => {
    if (!open) return;
    helpPocketRef.current?.setOpen(false);
  }, [open]);

  const handleStepChange = React.useCallback((step: { id: string }) => {
    onRequestViewRef.current?.(EXERCISE_STEP_IDS.has(step.id) ? "exercises" : "lesson");
    helpPocketRef.current?.setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <SpotlightTour
      storageKey="kanam_guest_tool_tour_v11_done"
      remember={false}
      defaultOpen
      fadeMs={150}
      recomputeDelayMs={260}
      eyebrow="A quick look around"
      actionLabel="Go ahead"
      footerHint="Tap the gold highlight to continue"
      onStepChange={handleStepChange}
      onDone={() => {
        setOpen(false);
        helpPocketRef.current?.setOpen(false);
        // Land back at the start of the Lesson tab — not the exercises.
        onRequestViewRef.current?.("lesson");
        onTourCompleteRef.current?.();
      }}
      steps={[
        {
          id: "hero",
          selector: '[data-tour="lesson-hero-rewards"]',
          clickSelector: '[data-tour="lesson-hero-rewards"]',
          title: "This is the real student screen",
          body: "Same lesson view students use in class. Up top: **XP** they earn and the **badge** they unlock — progress parents can see.",
          action: "Tap the **XP** and **badge** area.",
          icon: <Sparkles className="h-4 w-4" />,
          padding: 8,
        },
        {
          id: "tabs",
          selector: '[data-tour="lesson-tab-lesson"]',
          clickSelector: '[data-tour="lesson-tab-lesson"]',
          title: "Learn first. Then try it.",
          body: "**Lesson** teaches the idea. **Exercises** is where students practice and get checked.",
          action: "Open the **Lesson** tab.",
          icon: <Columns2 className="h-4 w-4" />,
          padding: 8,
        },
        {
          id: "teach",
          selector: '[data-tour="lesson-module-next"], [data-tour="lesson-module-start"]',
          clickSelector: '[data-tour="lesson-module-next"], [data-tour="lesson-module-start"]',
          title: "Short pages. Real understanding.",
          body: "**Next** moves through teaching pages. The last page opens practice.",
          action: "Press **Next** (or **Start the exercises**).",
          icon: <BookOpen className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "tabs-exercises",
          selector: '[data-tour="lesson-tab-exercises"]',
          clickSelector: '[data-tour="lesson-tab-exercises"]',
          title: "Practice is built in",
          body: "**Exercises** unlocks the editor, **Run & check**, and console. We're peeking ahead so you can see the flow.",
          action: "Open **Exercises**.",
          icon: <ListChecks className="h-4 w-4" />,
          padding: 8,
        },
        {
          id: "coach",
          // Mobile: header Help pocket only. Desktop: side Coach panel.
          // Do not fall back to coach content inside the sheet — that caused
          // gold highlights on words like "concatenation".
          selector: '[data-tour="lesson-help-pocket"]',
          clickSelector: '[data-tour="lesson-help-pocket"], [data-tour="lesson-coach"]',
          mobileSelector: '[data-tour="lesson-help-pocket"]',
          desktopSelector: '[data-tour="lesson-coach"]',
          title: "Help when they need it",
          body: "On a phone, **Help pocket** is in the top bar — Coach, Commands, and more. On a larger screen, use **Coach's note** beside the editor.",
          action: "Tap **Help pocket** in the top bar.",
          icon: <MessageSquareText className="h-4 w-4" />,
          padding: 6,
        },
        {
          id: "exercise-nav",
          selector: '[data-tour="lesson-exercise-nav"] button:first-of-type',
          clickSelector: '[data-tour="lesson-exercise-nav"] button:first-of-type',
          title: "One clear step at a time",
          body: "Finish **Exercise 1**, then the next unlocks. A green check means that step is done.",
          action: "Tap **Exercise 1**.",
          icon: <Target className="h-4 w-4" />,
          padding: 8,
        },
        {
          id: "goal",
          selector: '[data-tour="lesson-goal"]',
          clickSelector: '[data-tour="lesson-goal"]',
          title: 'They always know what "done" looks like',
          body: "The goal sits above the editor — labels like **Fill** and **Debug** set the expectation.",
          action: "Tap the **goal** box.",
          icon: <Target className="h-4 w-4" />,
          padding: 8,
        },
        {
          id: "editor",
          selector: '[data-tour="lesson-editor"]',
          clickSelector: '[data-tour="lesson-editor"]',
          title: "A real editor for first-timers",
          body: "Blanks show as **____**. Type to fill them in. A **hint** appears after a short try-first wait.",
          action: "Tap inside the **editor**.",
          icon: <Code2 className="h-4 w-4" />,
          padding: 6,
        },
        {
          id: "run",
          selector: '[data-tour="lesson-run-button"]',
          clickSelector: '[data-tour="lesson-run-button"]',
          title: "Instant feedback that teaches",
          body: "**Run & check** runs the code and shows whether the goal was met. Try again anytime.",
          action: "Press **Run & check**.",
          icon: <Play className="h-4 w-4" />,
          padding: 8,
        },
        {
          id: "terminal",
          selector: '[data-tour="lesson-terminal"]',
          clickSelector: '[data-tour="lesson-terminal"]',
          title: "And here's the proof",
          body: "The console shows what printed — and what to fix if it didn't work.",
          action: "Tap the **console** to finish.",
          icon: <Terminal className="h-4 w-4" />,
          padding: 8,
        },
      ]}
    />
  );
}
