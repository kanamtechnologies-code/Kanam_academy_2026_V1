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
}: {
  onRequestView?: (view: "lesson" | "exercises") => void;
  /** Called when the tour finishes — use to reset the lesson to slide 1. */
  onTourComplete?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const onRequestViewRef = React.useRef(onRequestView);
  const onTourCompleteRef = React.useRef(onTourComplete);

  React.useEffect(() => {
    onRequestViewRef.current = onRequestView;
  }, [onRequestView]);

  React.useEffect(() => {
    onTourCompleteRef.current = onTourComplete;
  }, [onTourComplete]);

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
      storageKey="kanam_guest_tool_tour_v8_done"
      remember={false}
      defaultOpen
      fadeMs={150}
      recomputeDelayMs={180}
      eyebrow="Quick tour"
      actionLabel="Your move"
      footerHint="Tap the gold highlight when you're ready — you've got this"
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
          title: "Welcome in — this is the real classroom",
          body: "Same screen students use in class. Up top you'll see the lesson title, the **XP** you can earn, and the **badge** waiting when you finish. Nice place to start.",
          action: "Tap the **XP** and **badge** area to continue.",
          icon: <Sparkles className="h-4 w-4" />,
          padding: 12,
        },
        {
          id: "tabs",
          selector: '[data-tour="lesson-tab-lesson"]',
          clickSelector: '[data-tour="lesson-tab-lesson"]',
          title: "Two tabs, one clear path",
          body: "**Lesson** is where ideas click. **Exercises** is where you build. Learn a little, then prove it — that's the Kanam rhythm.",
          action: "Open the **Lesson** tab.",
          icon: <Columns2 className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "teach",
          selector: '[data-tour="lesson-module-next"], [data-tour="lesson-module-start"]',
          clickSelector: '[data-tour="lesson-module-next"], [data-tour="lesson-module-start"]',
          title: "Take it one page at a time",
          body: "Use **Next** and **Back** to walk the teaching pages. A few slides ask a quick check-in before you move on — short, useful, no busywork. Last page unlocks practice.",
          action: "Press **Next** (or **Start the exercises** if you're already at the end).",
          icon: <BookOpen className="h-4 w-4" />,
          padding: 14,
        },
        {
          id: "tabs-exercises",
          selector: '[data-tour="lesson-tab-exercises"]',
          clickSelector: '[data-tour="lesson-tab-exercises"]',
          title: "Here's where the fun starts",
          body: "When the lesson slides are done, **Exercises** unlocks — editor, **Run & check**, and console. This tour peeks ahead so the workspace already feels familiar.",
          action: "Open **Exercises** for a quick preview.",
          icon: <ListChecks className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "coach",
          selector: '[data-tour="lesson-coach"] summary',
          clickSelector: '[data-tour="lesson-coach"] summary',
          title: "A coach in your corner",
          body: "Stuck? Reopen the **Coach's note**, command tips, and other side panels anytime. Help stays nearby — open it when you need it, tuck it away when you're flying.",
          action: "Open **Coach's note**.",
          icon: <MessageSquareText className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "exercise-nav",
          selector: '[data-tour="lesson-exercise-nav"] button:first-of-type',
          clickSelector: '[data-tour="lesson-exercise-nav"] button:first-of-type',
          title: "Level up one exercise at a time",
          body: "This checklist is your path. Finish **Exercise 1** to unlock the next. A green checkmark means that step is locked in.",
          action: "Tap **Exercise 1**.",
          icon: <Target className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "goal",
          selector: '[data-tour="lesson-goal"]',
          clickSelector: '[data-tour="lesson-goal"]',
          title: "Know the win before you type",
          body: "Every exercise spells out what success looks like. Labels like **Fill**, **Reorder**, **Debug**, and **Make it yours** tell you how you'll play that step.",
          action: "Tap the **goal** box.",
          icon: <Target className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "editor",
          selector: '[data-tour="lesson-editor"]',
          clickSelector: '[data-tour="lesson-editor"]',
          title: "Your coding space",
          body: "Write or fix code here. Blanks show as **____** — type and they fill in for you. If you need a nudge, a **hint** appears after a short try-first wait.",
          action: "Tap inside the **editor**.",
          icon: <Code2 className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "run",
          selector: '[data-tour="lesson-run-button"]',
          clickSelector: '[data-tour="lesson-run-button"]',
          title: "Run it. See what happens.",
          body: "**Run & check** runs your code and tells you if you hit the goal. Try as often as you like — each attempt is progress, not a penalty.",
          action: "Press **Run & check**.",
          icon: <Play className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "terminal",
          selector: '[data-tour="lesson-terminal"]',
          clickSelector: '[data-tour="lesson-terminal"]',
          title: "The console tells the story",
          body: "Output and feedback land here. When it works, you'll see what printed. When it doesn't, you'll get a clear next step — then you're ready for the real lesson.",
          action: "Tap the **console** to finish the tour.",
          icon: <Terminal className="h-4 w-4" />,
          padding: 10,
        },
      ]}
    />
  );
}
