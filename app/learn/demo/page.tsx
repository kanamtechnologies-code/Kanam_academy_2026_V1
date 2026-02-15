"use client";

import * as React from "react";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-demo@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const DEFAULT_GUIDED = `# Fill in the blanks 👇
# Goal: make a tiny “game AI” that follows rules.

player_name = "____"
player_text = "____"

def npc(player_input):
    # Rule 1
    if "hello" in player_input.lower():
        print("Hey traveler " + player_name + "!")
    # Rule 2
    elif "quest" in player_input.lower():
        print("A quest! Tell me your mission.")
    # Fallback rule
    else:
        print("I don't understand yet. Tell me more.")

npc(player_text)
`;

const DEFAULT_SCRATCH_TEMPLATE = `# Try it from scratch (no hints) 👇
# Tip: write your rules inside a function, then call it.

`;

export default function DemoPage() {
  const lesson: LessonConfig = React.useMemo(() => {
    return {
      id: "demo-lesson",
      title: "Demo Lesson: Build a Rule-Based NPC",
      goal: "Try the Kanam canvas: rules + code + console + submit.",
      xpReward: 0,
      badge: "✨ Demo",

      assignmentTitle: "Your mission",
      assignmentBody:
        "In the scratch box, write your own `npc(...)` function with at least 2 rules (if/elif) plus a fallback `else`, then call it.",
      assignmentChecklist: [
        "Define `def npc(player_input):`",
        "Use `if` and `elif` rules (at least 2).",
        "Add a fallback `else` message.",
        "Call `npc(...)` at least once.",
      ],

      starterCode: DEFAULT_GUIDED,
      scratchTemplateCode: DEFAULT_SCRATCH_TEMPLATE,

      instructorScript:
        "**Coach’s note**:\nThis is the **demo**. Your goal is to see how the canvas works end-to-end.\n\nBig idea: the computer does not guess. It checks your rules top-to-bottom.\n\nWhen you click **Start Demo**, you’ll get:\n- a Fill-in-the-blanks editor\n- a Scratch editor\n- a Run button + console\n- a Zoom preview (PiP)\n- a step-by-step tutorial\n",
      kidExplain: [
        { title: "Rules → behavior", text: "Your NPC will only do what your rules tell it to do." },
        { title: "Fallback", text: "A good NPC always has something to say (that’s the `else`)." },
      ],
      steps: [
        "Start in the guided box and fill in the ____ blanks.",
        "Press Run and read the console output.",
        "Try rewriting it from scratch (no hints).",
        "Submit when your scratch version works.",
      ],
      cfu: [],
      tryThis: [
        'Add a new rule for "my name is ...".',
        "Make the fallback message more helpful.",
      ],
      aiSafetyMoment:
        "AI safety: predictable behavior comes from clear rules. Missing rules can cause confusing outputs.",

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
      tourFadeMs: 420,
      tourMoveMs: 760,
      tourRecomputeDelayMs: 650,

      getRunOutput: () => asTerminal("Demo ready. Press Run to execute your scratch code."),
      computeProgressPercent: (code, submitted) => {
        if (submitted) return 100;
        const checks = [
          /\bdef\s+npc\s*\(\s*player_input\s*\)\s*:/.test(code),
          /\bif\b/.test(code) && /\belif\b/.test(code),
          /\belse\s*:/.test(code),
          /\bnpc\s*\(/.test(code),
        ];
        const done = checks.filter(Boolean).length;
        return Math.round((done / checks.length) * 100);
      },
      isSubmissionValid: (code) => {
        return (
          /\bdef\s+npc\s*\(\s*player_input\s*\)\s*:/.test(code) &&
          /\bif\b/.test(code) &&
          /\belif\b/.test(code) &&
          /\belse\s*:/.test(code) &&
          /\bnpc\s*\(/.test(code)
        );
      },
      getSubmitOutput: (ok) =>
        ok
          ? asTerminal("✅ Demo complete! You built a rule-based NPC and submitted from scratch.")
          : asTerminal(
              "❌ Almost! Make sure your scratch code has `def npc(player_input):`, at least one `elif`, a fallback `else`, and a call to `npc(...)`."
            ),
    };
  }, []);

  return <LessonCanvas lesson={lesson} />;
}

