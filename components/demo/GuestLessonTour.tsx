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
      storageKey="kanam_guest_tool_tour_v6_done"
      remember={false}
      defaultOpen
      fadeMs={150}
      recomputeDelayMs={180}
      onStepChange={handleStepChange}
      onDone={() => {
        setOpen(false);
        onRequestViewRef.current?.("exercises");
      }}
      steps={[
        {
          id: "hero",
          selector: '[data-tour="lesson-hero-rewards"]',
          clickSelector: '[data-tour="lesson-hero-rewards"]',
          title: "You are in a real lesson canvas",
          body: "This header shows the lesson title, XP you can earn, and the badge you unlock when you finish. Students see this same screen in class — you are not in a fake preview.",
          action: "Follow the gold arrow and click the XP and badge area.",
          icon: <Sparkles className="h-4 w-4" />,
          padding: 12,
        },
        {
          id: "tabs",
          selector: '[data-tour="lesson-tab-lesson"]',
          clickSelector: '[data-tour="lesson-tab-lesson"]',
          title: "Two modes: Lesson, then Exercises",
          body: "Every Kanam lesson has two tabs. Lesson is for reading and understanding. Exercises is where you type code and get checked.",
          action: "Follow the gold arrow and click the Lesson tab.",
          icon: <Columns2 className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "teach",
          selector: '[data-tour="lesson-module-next"], [data-tour="lesson-module-start"]',
          clickSelector: '[data-tour="lesson-module-next"], [data-tour="lesson-module-start"]',
          title: "Move through the lesson pages",
          body: "Teaching pages use Next / Back at the bottom. Each page has an explanation and often an example. When you reach the last page, Start the exercises appears.",
          action: "Follow the gold arrow and click Next (or Start the exercises on the last page).",
          icon: <BookOpen className="h-4 w-4" />,
          padding: 14,
        },
        {
          id: "tabs-exercises",
          selector: '[data-tour="lesson-tab-exercises"]',
          clickSelector: '[data-tour="lesson-tab-exercises"]',
          title: "Open Exercises to practice",
          body: "When you are ready to code, open Exercises. That is where the editor, Run & check, and console live.",
          action: "Follow the gold arrow and click the Exercises tab.",
          icon: <ListChecks className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "coach",
          selector: '[data-tour="lesson-coach"] summary',
          clickSelector: '[data-tour="lesson-coach"] summary',
          title: "Coach’s note stays beside you",
          body: "While you code, reference panels stay available: coach note, command guide, and tips. You can open or close them.",
          action: "Follow the gold arrow and open Coach’s note.",
          icon: <MessageSquareText className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "exercise-nav",
          selector: '[data-tour="lesson-exercise-nav"] button:first-of-type',
          clickSelector: '[data-tour="lesson-exercise-nav"] button:first-of-type',
          title: "Exercises unlock in order",
          body: "These buttons are your exercise checklist. Finish exercise 1 to unlock 2, and so on. Green checkmarks mean done.",
          action: "Follow the gold arrow and click Exercise 1.",
          icon: <Target className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "goal",
          selector: '[data-tour="lesson-goal"]',
          clickSelector: '[data-tour="lesson-goal"]',
          title: "Read the goal before you type",
          body: "Every exercise states what success looks like and explains the command. Kind labels (Fill, Reorder, Debug) tell you how you will interact.",
          action: "Follow the gold arrow and click the goal box.",
          icon: <Target className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "editor",
          selector: '[data-tour="lesson-editor"]',
          clickSelector: '[data-tour="lesson-editor"]',
          title: "Type in the Python editor",
          body: "This is where you write or fix code. Blanks like ____ are meant to be replaced. Line numbers help you match feedback.",
          action: "Follow the gold arrow and click inside the editor.",
          icon: <Code2 className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "run",
          selector: '[data-tour="lesson-run-button"]',
          clickSelector: '[data-tour="lesson-run-button"]',
          title: "Press Run & check",
          body: "This runs your code and checks it. If something is wrong, Kanam tells you what to fix. You can run as many times as you need.",
          action: "Follow the gold arrow and click Run & check.",
          icon: <Play className="h-4 w-4" />,
          padding: 10,
        },
        {
          id: "terminal",
          selector: '[data-tour="lesson-terminal"]',
          clickSelector: '[data-tour="lesson-terminal"]',
          title: "Read the console every time",
          body: "Output and feedback appear here. Successful runs show what printed. Failures show a clear message. Always look here before changing more code.",
          action: "Follow the gold arrow and click the console to finish the tour.",
          icon: <Terminal className="h-4 w-4" />,
          padding: 10,
        },
      ]}
    />
  );
}
