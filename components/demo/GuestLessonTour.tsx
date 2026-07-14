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
      storageKey="kanam_guest_tool_tour_v7_done"
      remember={false}
      defaultOpen
      fadeMs={150}
      recomputeDelayMs={180}
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
          title: "Welcome — this is your real classroom screen",
          body: "You're looking at the same layout students use in class. Up here you'll see the lesson title, the **XP** you can earn, and the **badge** you unlock when you finish.",
          action: "Follow the gold arrow and tap the **XP** and **badge** area.",
          icon: <Sparkles className="h-4 w-4" />,
          padding: 12,
        },
        {
          id: "tabs",
          selector: '[data-tour="lesson-tab-lesson"]',
          clickSelector: '[data-tour="lesson-tab-lesson"]',
          title: "Learn first, then practice",
          body: "Every lesson has two tabs. **Lesson** is where you read and understand the idea. **Exercises** is where you try it yourself and get checked.",
          action: "Follow the gold arrow and open the **Lesson** tab.",
          icon: <Columns2 className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "teach",
          selector: '[data-tour="lesson-module-next"], [data-tour="lesson-module-start"]',
          clickSelector: '[data-tour="lesson-module-next"], [data-tour="lesson-module-start"]',
          title: "Move one page at a time",
          body: "Use **Next** and **Back** at the bottom to walk through the teaching pages. Some pages ask a quick question before you can continue. On the last page, you'll see **Start the exercises**.",
          action: "Follow the gold arrow and press **Next** (or **Start the exercises** if you're already on the last page).",
          icon: <BookOpen className="h-4 w-4" />,
          padding: 14,
        },
        {
          id: "tabs-exercises",
          selector: '[data-tour="lesson-tab-exercises"]',
          clickSelector: '[data-tour="lesson-tab-exercises"]',
          title: "When you're ready, open practice",
          body: "The **Exercises** tab is your workspace: the code editor, **Run & check**, and the console all live here.",
          action: "Follow the gold arrow and open **Exercises**.",
          icon: <ListChecks className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "coach",
          selector: '[data-tour="lesson-coach"] summary',
          clickSelector: '[data-tour="lesson-coach"] summary',
          title: "Help stays beside you while you work",
          body: "While you practice, you can reopen the **Coach's note**, command tips, and other side panels anytime — open or close them as you need.",
          action: "Follow the gold arrow and open **Coach's note**.",
          icon: <MessageSquareText className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "exercise-nav",
          selector: '[data-tour="lesson-exercise-nav"] button:first-of-type',
          clickSelector: '[data-tour="lesson-exercise-nav"] button:first-of-type',
          title: "Practice one step at a time",
          body: "These buttons are your exercise checklist. Finish **Exercise 1** to unlock the next. A green checkmark means you're done with that step.",
          action: "Follow the gold arrow and tap **Exercise 1**.",
          icon: <Target className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "goal",
          selector: '[data-tour="lesson-goal"]',
          clickSelector: '[data-tour="lesson-goal"]',
          title: "Read the goal before you type",
          body: "Every exercise tells you what success looks like. Labels like **Fill**, **Reorder**, **Debug**, and **Predict** explain how you'll interact with that step.",
          action: "Follow the gold arrow and tap the **goal** box.",
          icon: <Target className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "editor",
          selector: '[data-tour="lesson-editor"]',
          clickSelector: '[data-tour="lesson-editor"]',
          title: "Type in the editor",
          body: "This is where you write or fix code. Blanks show as **____** — just type your answer and the blank is replaced for you. If you get stuck, a **hint** unlocks after a short try-first wait.",
          action: "Follow the gold arrow and tap inside the **editor**.",
          icon: <Code2 className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "run",
          selector: '[data-tour="lesson-run-button"]',
          clickSelector: '[data-tour="lesson-run-button"]',
          title: "Check your work anytime",
          body: "Press **Run & check** to run your code and see if it meets the goal. You can try as many times as you need — mistakes are part of learning.",
          action: "Follow the gold arrow and press **Run & check**.",
          icon: <Play className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "terminal",
          selector: '[data-tour="lesson-terminal"]',
          clickSelector: '[data-tour="lesson-terminal"]',
          title: "Always read the console",
          body: "Your program's output and feedback show up here. When something works, you'll see what printed. When it doesn't, you'll get a clear next step.",
          action: "Follow the gold arrow and tap the **console** to finish the tour.",
          icon: <Terminal className="h-4 w-4" />,
          padding: 10,
        },
      ]}
    />
  );
}
