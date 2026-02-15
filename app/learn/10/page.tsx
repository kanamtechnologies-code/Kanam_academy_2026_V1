"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson10: LessonConfig = {
  id: "lesson-10",
  title: "10. Teaching the Bot Skills (Functions)",
  goal: "Use functions to package a skill and reuse it without rewriting code.",
  xpReward: 550,
  badge: "🧩 Skill Builder",

  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, define a function that makes your bot speak, then call it more than once.",
  assignmentChecklist: [
    "Define a function using `def`.",
    "Give the function a clear name (example: greet).",
    "Inside the function, print a bot message (indented).",
    "Call the function so it runs.",
    "Call the function again without rewriting the code.",
  ],

  starterCode: `# Fill in the blanks 👇
def greet():
    print("Hi! ____")

greet()
greet()
`,

  instructorScript:
    "**Coach’s note**\nRead this first — it explains the goal + how to think about the code.\n**Coach’s note**:\nThink about a video game controller.\nWhen you press the jump button, the character jumps.\nYou don’t rebuild the jump button every time — it already exists.\nThat button is like a function.\nA function is a named action in your program.\nInstead of rewriting the same instructions over and over, you:\n- teach the computer the action once\n- use it whenever you want\n\nHere’s what that looks like in code:\n```\ndef greet():\n    print(\"Hi! Nice to meet you!\")\n```\n\nThis creates a skill, but it doesn’t run yet.\nTo use the skill, you call it:\n```\ngreet()\n```\n\nNow the bot speaks.\nIf you call it again, the bot speaks again — without rewriting the message.\nThat’s how real AI systems reuse behavior.\n**Mini goal**:\nCreate a function that makes your bot speak, then use it more than once.\nRead the steps, follow them in order, then press [[Run]].",

  kidExplain: [
    {
      title: "What is a Function?",
      text:
        "A function is a reusable action. You define it once, then call it whenever you need it.",
    },
    {
      title: "Why functions matter for AI",
      text:
        "Functions help AI behavior stay organized and predictable. Humans define the skill and decide when it runs.",
    },
  ],

  steps: [
    "Define a function that prints a message from your bot.",
    "Give the function a clear name.",
    "Call the function so it runs.",
    "Call the function again without rewriting the code.",
    "Change the message inside the function and run it again.",
    "Common mistake: If nothing happens, you may have defined the function but forgot to call it.",
  ],

  cfu: [
    {
      question: "What is a function in your own words?",
      answer: "A named set of instructions you can run (call) whenever you want.",
    },
    {
      question: "Why is a function better than copying code?",
      answer:
        "Because you write the behavior once and reuse it. If you need to change it, you change it in one place.",
    },
    {
      question: "What happens if you define a function but never call it?",
      answer: "Nothing happens — defining creates the skill, calling runs it.",
    },
  ],

  tryThis: [
    "Create a second function with a different message.",
    "Call the same function three times in a row.",
    "Challenge: Explain how functions help humans control AI behavior.",
  ],

  aiSafetyMoment:
    "AI safety: Functions help prevent mistakes. If behavior is copied everywhere, errors are harder to fix. Responsible AI uses clear, reusable actions with human-controlled execution.",

  editorPlaceholder:
    '# Try it from scratch 👇\n# 1) Define a function\n# def greet():\n#     print("Hi! Nice to meet you!")\n#\n# 2) Call it more than once\n# greet()\n# greet()\n',

  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/9",
  nextHref: "/learn/11",

  getRunOutput: () => asTerminal("Press Run to execute your function calls."),

  computeProgressPercent: (code, submitted) => {
    const hasDef = /\bdef\s+[A-Za-z_]\w*\s*\(\s*\)\s*:\s*/.test(code);
    const hasIndentedPrint = /\bdef\s+[A-Za-z_]\w*\s*\(\s*\)\s*:[^\n]*\n[ \t]+print\(/.test(code);
    const calls = (code.match(/^[ \t]*[A-Za-z_]\w*\s*\(\s*\)\s*$/gm) ?? []).length;
    const hasTwoCalls = calls >= 2;
    const checks = [hasDef, hasIndentedPrint, hasTwoCalls];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) => {
    const defMatch = code.match(/\bdef\s+([A-Za-z_]\w*)\s*\(\s*\)\s*:/);
    const fn = defMatch?.[1];
    if (!fn) return false;
    const hasIndentedPrint = new RegExp(
      `\\bdef\\s+${fn}\\s*\\(\\s*\\)\\s*:[^\\n]*\\n[ \\t]+print\\(`
    ).test(code);
    const callCount =
      (code.match(new RegExp(`^[ \\t]*${fn}\\s*\\(\\s*\\)\\s*$`, "gm")) ?? []).length;
    return hasIndentedPrint && callCount >= 2 && !code.includes("Print(");
  },

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! You packaged and reused a skill with a function. 🎯")
      : asTerminal(
          "❌ Almost! Make sure you defined a function with def, printed inside it (indented), and called the function at least twice. Also check print is lowercase."
        ),
};

export default function Lesson10Page() {
  return <LessonCanvas lesson={lesson10} />;
}

