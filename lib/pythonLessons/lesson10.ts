import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function getDefFn(code: string): string | undefined {
  return code.match(/\bdef\s+([A-Za-z_]\w*)\s*\(\s*\)\s*:/)?.[1];
}

function fnCallCount(code: string, fn: string): number {
  return (code.match(new RegExp(`^[ \\t]*${fn}\\s*\\(\\s*\\)\\s*$`, "gm")) ?? []).length;
}

export const lesson10: PythonLessonConfig = {
  id: "lesson-10",
  title: "10. Teaching the Bot Skills (Functions)",
  goal: "Use functions to package a skill and reuse it without rewriting code.",
  xpReward: 550,
  badge: "🧩 Skill Builder",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  prevHref: "/learn/9",
  nextHref: "/learn/11",
  instructorScript:
    "**Coach's note**\nRead this first — it explains the goal + how to think about the code.\n**Coach's note**:\nThink about a video game controller.\nWhen you press the jump button, the character jumps.\nYou don't rebuild the jump button every time — it already exists.\nThat button is like a function.\nA function is a named action in your program.\nInstead of rewriting the same instructions over and over, you:\n- teach the computer the action once\n- use it whenever you want\n\nHere's what that looks like in code:\n```\ndef greet():\n    print(\"Hi! Nice to meet you!\")\n```\n\nThis creates a skill, but it doesn't run yet.\nTo use the skill, you call it:\n```\ngreet()\n```\n\nNow the bot speaks.\nIf you call it again, the bot speaks again — without rewriting the message.\nThat's how real AI systems reuse behavior.\n**Mini goal**:\nCreate a function that makes your bot speak, then use it more than once.\nRead the steps, follow them in order, then press [[Run]].",
  commandReference: [
    {
      command: "def greet():",
      summary: "Defines a reusable skill. The colon (:) starts the function body.",
      example: "def greet():",
    },
    {
      command: "    print(...)",
      summary: "Indented lines belong inside the function — they run when you call it.",
      example: '    print("Hi! Nice to meet you!")',
    },
    {
      command: "greet()",
      summary: "Calls (runs) the function. Define once, call as many times as you want.",
      example: "greet()",
    },
  ],
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
  exercises: [
    {
      id: "ex-define",
      title: "Exercise 1 — Define a function",
      focusCommand: "def greet():",
      commandExplain:
        "def creates a named skill. The indented print line is what the skill does when it runs.",
      goal: "Define a function with def and an indented print inside.",
      starterCode: `# Fill in the blanks 👇
def greet():
    print("Hi! ____")
`,
      hint: "Finish the message inside quotes, and make sure print is indented with 4 spaces.",
      successMessage: "Skill defined! Your function packages the bot message.",
      failureMessage: "Need def greet(): with an indented print(...) line inside.",
      validate: (code: string) => {
        if (rejectsUppercasePrint(code)) return false;
        const fn = getDefFn(code);
        if (!fn) return false;
        return new RegExp(
          `\\bdef\\s+${fn}\\s*\\(\\s*\\)\\s*:[^\\n]*\\n[ \\t]+print\\(`
        ).test(code);
      },
    },
    {
      id: "ex-call-once",
      title: "Exercise 2 — Call the function",
      focusCommand: "greet()",
      commandExplain:
        "Defining a function doesn't run it. You must call it — greet() — to make the bot speak.",
      goal: "Define greet() and call it once so you see output.",
      starterCode: `# Fill in the blank 👇
def greet():
    print("Hi! Nice to meet you!")

____
`,
      hint: "Type greet() on its own line (no indentation).",
      successMessage: "It ran! Calling the function executes the skill.",
      failureMessage: "Define greet() with print inside, then call greet() once.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        const fn = getDefFn(code);
        if (!fn) return false;
        const hasIndentedPrint = new RegExp(
          `\\bdef\\s+${fn}\\s*\\(\\s*\\)\\s*:[^\\n]*\\n[ \\t]+print\\(`
        ).test(code);
        return hasIndentedPrint && fnCallCount(code, fn) >= 1 && run.stdout.length >= 1;
      },
    },
    {
      id: "ex-call-twice",
      title: "Exercise 3 — Reuse the skill",
      focusCommand: "greet() × 2",
      commandExplain:
        "Call the same function twice — same skill, no copied code. That's reuse.",
      goal: "Call your function at least twice.",
      starterCode: `# Fill in the blank 👇
def greet():
    print("Hi! Nice to meet you!")

greet()
____
`,
      hint: "Add a second greet() line.",
      successMessage: "Reused! The bot spoke twice from one function definition.",
      failureMessage: "Call greet() at least twice (two separate greet() lines).",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        const fn = getDefFn(code);
        if (!fn) return false;
        return fnCallCount(code, fn) >= 2 && run.stdout.length >= 2;
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Skill builder challenge",
      focusCommand: "def + print + calls",
      commandExplain:
        "Build your own function from scratch: define it, print inside, call it twice.",
      goal: "Define any function with print inside and call it at least twice.",
      starterCode: `# Fill in the blanks 👇
def ____():
    print("____")

____
____
`,
      hint: "Pick a name like greet or speak, then call it twice on separate lines.",
      successMessage: "Submitted! You packaged and reused a skill with a function. 🎯",
      failureMessage:
        "Define a function with def, print inside (indented), and call it at least twice.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        const fn = getDefFn(code);
        if (!fn) return false;
        const hasIndentedPrint = new RegExp(
          `\\bdef\\s+${fn}\\s*\\(\\s*\\)\\s*:[^\\n]*\\n[ \\t]+print\\(`
        ).test(code);
        return hasIndentedPrint && fnCallCount(code, fn) >= 2 && run.stdout.length >= 2;
      },
    },
  ],
};
