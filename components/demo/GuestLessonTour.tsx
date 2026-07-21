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
  const onRequestViewRef = React.useRef(onRequestView);
  const onTourCompleteRef = React.useRef(onTourComplete);
  const onTourActiveChangeRef = React.useRef(onTourActiveChange);

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

  const handleStepChange = React.useCallback((step: { id: string }) => {
    onRequestViewRef.current?.(EXERCISE_STEP_IDS.has(step.id) ? "exercises" : "lesson");
  }, []);

  if (!open) return null;

  return (
    <SpotlightTour
      storageKey="kanam_guest_tool_tour_v9_done"
      remember={false}
      defaultOpen
      fadeMs={150}
      recomputeDelayMs={180}
      eyebrow="A quick look around"
      actionLabel="Go ahead"
      footerHint="Tap the gold highlight when you're ready"
      onStepChange={handleStepChange}
      onDone={() => {
        setOpen(false);
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
          body: "Not a slideshow — the same lesson view families and schools get in class. Up top: the title, the **XP** students earn, and the **badge** they unlock when they finish. That's progress parents can actually see.",
          action: "Tap the **XP** and **badge** area.",
          icon: <Sparkles className="h-4 w-4" />,
          padding: 12,
        },
        {
          id: "tabs",
          selector: '[data-tour="lesson-tab-lesson"]',
          clickSelector: '[data-tour="lesson-tab-lesson"]',
          title: "Learn first. Then try it.",
          body: "Every Kanam lesson has two sides. **Lesson** teaches the idea clearly. **Exercises** is where students practice and get checked. Simple structure — easy for kids, easy for teachers to trust.",
          action: "Open the **Lesson** tab.",
          icon: <Columns2 className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "teach",
          selector: '[data-tour="lesson-module-next"], [data-tour="lesson-module-start"]',
          clickSelector: '[data-tour="lesson-module-next"], [data-tour="lesson-module-start"]',
          title: "Short pages. Real understanding.",
          body: "**Next** and **Back** move through the teaching pages. A few ask a quick check-in before continuing — just enough to keep attention, nothing that feels like busywork. The last page opens practice.",
          action: "Press **Next** (or **Start the exercises** if you're already there).",
          icon: <BookOpen className="h-4 w-4" />,
          padding: 14,
        },
        {
          id: "tabs-exercises",
          selector: '[data-tour="lesson-tab-exercises"]',
          clickSelector: '[data-tour="lesson-tab-exercises"]',
          title: "Practice is built into the product",
          body: "Once the lesson pages are done, **Exercises** unlocks — the editor, **Run & check**, and console. We're peeking ahead so you can see what independent practice looks like before students dive in.",
          action: "Open **Exercises**.",
          icon: <ListChecks className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "coach",
          selector: '[data-tour="lesson-coach"] summary',
          clickSelector: '[data-tour="lesson-coach"] summary',
          title: "Support without hovering",
          body: "The **Coach's note** and tip panels stay right here — open when a student needs a nudge, closed when they're in flow. Helpful for class, calming for parents watching at home.",
          action: "Open **Coach's note**.",
          icon: <MessageSquareText className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "exercise-nav",
          selector: '[data-tour="lesson-exercise-nav"] button:first-of-type',
          clickSelector: '[data-tour="lesson-exercise-nav"] button:first-of-type',
          title: "One clear step at a time",
          body: "Students don't get dumped into a blank page. They finish **Exercise 1**, then the next unlocks. A green checkmark means that step is done — clean progress, no guessing.",
          action: "Tap **Exercise 1**.",
          icon: <Target className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "goal",
          selector: '[data-tour="lesson-goal"]',
          clickSelector: '[data-tour="lesson-goal"]',
          title: 'They always know what "done" looks like',
          body: "Before anyone types, the goal is right here. Labels like **Fill**, **Reorder**, **Debug**, and **Make it yours** set the expectation — so students (and adults looking over a shoulder) aren't lost.",
          action: "Tap the **goal** box.",
          icon: <Target className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "editor",
          selector: '[data-tour="lesson-editor"]',
          clickSelector: '[data-tour="lesson-editor"]',
          title: "A real editor, designed for first-timers",
          body: "This is where the work happens. Blanks show as **____** — type and they fill in. Need a nudge? A **hint** appears after a short try-first wait, so kids learn to think before they copy.",
          action: "Tap inside the **editor**.",
          icon: <Code2 className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "run",
          selector: '[data-tour="lesson-run-button"]',
          clickSelector: '[data-tour="lesson-run-button"]',
          title: "Instant feedback — the kind that teaches",
          body: "**Run & check** runs the code and shows whether the goal was met. Students can try again as many times as they need. Mistakes aren't punished; they're part of how the skill sticks.",
          action: "Press **Run & check**.",
          icon: <Play className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "terminal",
          selector: '[data-tour="lesson-terminal"]',
          clickSelector: '[data-tour="lesson-terminal"]',
          title: "And here's the proof",
          body: "The console shows what the program printed — and what to fix if it didn't work. That's the loop schools want: try, see, improve. You're ready for the real lesson now.",
          action: "Tap the **console** to finish.",
          icon: <Terminal className="h-4 w-4" />,
          padding: 10,
        },
      ]}
    />
  );
}
