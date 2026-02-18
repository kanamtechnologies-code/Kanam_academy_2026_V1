"use client";

import * as React from "react";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-demo@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const DEFAULT_GUIDED = `# Welcome to Kanam 👋
# This is a quick “Day 0” demo before class starts.
# Goal: learn the canvas — edit code, press Run, read the output.

# 1) Put your name in quotes:
name = "____"

# 2) This prints a message in the console:
print("Move forward, " + name + "!")

# 3) Add ONE more print line below (no blanks needed):
print("I know how to press Run and read the output.")
`;

const DEFAULT_SCRATCH_TEMPLATE = `# Try it from scratch (no hints) 👇
# Goal: print 2 lines using a variable.
#
# name = "Alex"
# print("Move forward, " + name + "!")
# print("I can run my code.")

`;

export default function DemoPage() {
  const lesson: LessonConfig = React.useMemo(() => {
    return {
      id: "demo-lesson",
      title: "Demo: How to Use the Lesson Canvas",
      goal: "Edit code, press Run, and read the output — before your first class.",
      xpReward: 0,
      badge: "✨ Demo",
      dashboardHref: "/demo",

      assignmentTitle: "Your mission",
      assignmentBody:
        "In the scratch box, make Python print 2 lines using a variable (your name). Then press Run.",
      assignmentChecklist: [
        'Create a variable like: `name = "Alex"`',
        "Print one line that uses the variable.",
        "Print a second line.",
        "Press Run and check the console.",
      ],

      starterCode: DEFAULT_GUIDED,
      scratchTemplateCode: DEFAULT_SCRATCH_TEMPLATE,

      instructorScript:
        "**Coach's note (today's mini lesson)**\nToday is about [[how coding works]], not being perfect.\n\nBefore you start, know these 3 ideas:\n- A [[variable]] is a labeled memory box that stores information.\n- [[print()]] shows your message in the [[console output]].\n- The + symbol can join text pieces together.\n\nExample in fill-in-the-blank style (example only):\n\n```\nname = \"____\"\nprint(\"Welcome, \" + name + \"!\")\n```\n\nHow it works:\n- You replace \"____\" with your own text.\n- Python stores that text in the variable (`name`).\n- Then print() builds one message and shows it in output.\n\n**How to win this demo:**\n1. Fill in blanks carefully.\n2. Press [[Run]] and read the output.\n3. Fix small mistakes and run again.\n4. Then try writing it from scratch.\n\n**Important:** Python does exactly what you type, so tiny changes can change the result.\n",
      kidExplain: [
        {
          title: "Two boxes, one goal",
          text: "Use the guided box to practice, then try the scratch box without hints.",
        },
        {
          title: "Run → output",
          text: "When you press Run, the console shows exactly what your code printed.",
        },
      ],
      steps: [
        "Start in the guided box and fill in the ____ blank.",
        "Press Run and read the console output.",
        "Try rewriting it from scratch (no hints).",
        "Optional: press Submit when your scratch version prints two lines.",
      ],
      cfu: [],
      tryThis: [
        "Change the message to something you would want your helper to say.",
        "Make your second print line funny.",
      ],
      aiSafetyMoment:
        "AI safety: computers follow instructions exactly. Clear instructions help you stay in control of what the program does.",

      editorPlaceholder: DEFAULT_SCRATCH_TEMPLATE,
      terminalPrompt: TERMINAL_PROMPT,
      runOutputMode: "replace",
      initialOutputBody: "Click Run to test your scratch code output.",

      // Demo: show the mock Zoom PiP preview in the bottom-left.
      instructorLive: {
        label: "Zoom preview (demo)",
        mode: "zoom_sdk_pip_preview",
        corner: "bottom-left",
        joinUrl: process.env.NEXT_PUBLIC_ZOOM_JOIN_URL ?? "",
        note: "This is a preview UI. For real classes, you’ll use your actual Zoom join link.",
      },

      // Demo: make tutorial transitions slower.
      tourRemember: false,
      localStatePersistence: false,
      tourFadeMs: 420,
      tourMoveMs: 760,
      tourRecomputeDelayMs: 650,

      getRunOutput: () => asTerminal("Ready! Press Run to execute your scratch code."),
      computeProgressPercent: (code, submitted) => {
        if (submitted) return 100;
        const hasName = /\bname\s*=\s*["'][^"']+["']/.test(code);
        const printCount = (code.match(/\bprint\s*\(/g) ?? []).length;
        const checks = [hasName, printCount >= 2];
        const done = checks.filter(Boolean).length;
        return Math.round((done / checks.length) * 100);
      },
      isSubmissionValid: (code) => {
        const hasName = /\bname\s*=\s*["'][^"']+["']/.test(code);
        const printCount = (code.match(/\bprint\s*\(/g) ?? []).length;
        return hasName && printCount >= 2;
      },
      getSubmitOutput: (ok) =>
        ok
          ? asTerminal("✅ Nice! You’re ready for class. You wrote code, pressed Run, and checked output.")
          : asTerminal(
              '❌ Almost! In scratch, create `name = "..."` and write at least 2 `print(...)` lines. Then press Run.'
            ),
      completionRedirectHref: "/demo/complete",
    };
  }, []);

  return <LessonCanvas lesson={lesson} />;
}

