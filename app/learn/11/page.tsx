"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson11: LessonConfig = {
  id: "lesson-11",
  title: "11. Giving Functions Better Information (Parameters)",
  goal: "Use a parameter so one function can work with different details.",
  xpReward: 600,
  badge: "🎮 Parameter Pro",

  // Week 6 Session 1 (test only): show learners how to join the instructor on Zoom from inside the tool.
  // Set NEXT_PUBLIC_ZOOM_JOIN_URL in `.env.local` to your meeting link.
  instructorLive: {
    label: "Instructor (Zoom)",
    mode: "zoom_sdk_pip_preview",
    corner: "bottom-left",
    joinUrl: process.env.NEXT_PUBLIC_ZOOM_JOIN_URL ?? "",
    note:
      "Click Join Zoom to watch the instructor. (Zoom video usually can’t be embedded directly inside the page.)",
  },

  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, define a function with one parameter, then call it with different values.",
  assignmentChecklist: [
    "Define a function using `def`.",
    "Add one parameter inside the parentheses (example: enemy).",
    "Inside the function, print a message that uses the parameter.",
    "Call the function at least twice with different values.",
  ],

  starterCode: `# Fill in the blanks 👇
# Tip: the value you pass in goes into the parameter.

def attack(enemy):
    print("You attack the " + enemy + "!")

attack("____")
attack("____")
attack("____")
`,

  instructorScript:
    "**Coach’s note**\nRead this first — it explains the goal + how to think about the code.\n**Coach’s note**:\nThink about a video game controller.\n\nYou might have one attack button, but you don’t build a new button for every enemy.\nYou press the same button and tell the game who to attack.\n\nThat’s how ==parameters== work.\n\nA parameter is extra information you give to a function so it knows what to do this time.\n\nHere’s what that looks like in code:\n```\ndef attack(enemy):\n    print(\"You attack the \" + enemy + \"!\")\n```\n\nThis creates an attack skill — but it doesn’t run yet.\nTo use the skill, you call the function and give it information:\n```\nattack(\"goblin\")\nattack(\"dragon\")\nattack(\"boss\")\n```\n\nSame skill.\nDifferent information.\nDifferent output.\n\nThat’s how AI systems appear flexible — humans give better details.\n\n**Mini goal**:\nCreate a function that changes what your bot does based on the information you give it.\nRead the steps, follow them in order, then press [[Run]].",

  kidExplain: [
    {
      title: "What is a Parameter?",
      text:
        "A parameter is a blank spot inside a function. The function waits for you to give it the value when you call it.",
    },
    {
      title: "Same skill, new details",
      text:
        "You can call the same function with different values. The function doesn’t ‘decide’ the value — you provide it.",
    },
  ],

  steps: [
    "Define a function that uses one parameter.",
    "Inside the function, print a message that includes the parameter.",
    "Call the function with one value.",
    "Call the same function with a different value.",
    "Observe how the output changes.",
    "Common mistake: If the output doesn’t change, check that you passed different values into the function.",
  ],

  cfu: [
    {
      question: "What is a parameter in your own words?",
      answer: "A placeholder in a function that gets a real value when you call the function.",
    },
    {
      question: "Why is one function with parameters better than many similar functions?",
      answer:
        "Because you write the skill once, then reuse it with different details instead of copying lots of near-identical code.",
    },
    {
      question: "Does the function decide what information to use, or do you?",
      answer: "You do — you choose what value to pass in when you call the function.",
    },
  ],

  tryThis: [
    "Change the enemy name and run again.",
    "Add a second parameter (like weapon or power).",
    "Challenge: Explain how parameters help humans control AI behavior.",
  ],

  aiSafetyMoment:
    "AI safety: AI systems respond to the information they are given. If details are missing or unclear, output can be wrong. Responsible AI means giving clear information, checking results, and remembering AI does not guess your intent.",

  editorPlaceholder:
    '# Try it from scratch 👇\n# def attack(enemy):\n#     print("You attack the " + enemy + "!")\n#\n# attack("goblin")\n# attack("dragon")\n',

  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/10",
  nextHref: "/learn/12",

  getRunOutput: () => asTerminal("Press Run to execute your function calls with different values."),

  computeProgressPercent: (code, submitted) => {
    const defMatch = code.match(/\bdef\s+([A-Za-z_]\w*)\s*\(\s*([A-Za-z_]\w*)\s*\)\s*:\s*/);
    const fn = defMatch?.[1];
    const param = defMatch?.[2];
    const hasDefWithParam = Boolean(fn && param);

    const hasIndentedPrintUsingParam =
      Boolean(fn && param) &&
      new RegExp(
        `\\bdef\\s+${fn}\\s*\\(\\s*${param}\\s*\\)\\s*:[^\\n]*\\n[ \\t]+print\\([\\s\\S]*?\\b${param}\\b`
      ).test(code);

    const callRe = fn ? new RegExp(`^[ \\t]*${fn}\\s*\\(\\s*(["'])(.*?)\\1\\s*\\)\\s*$`, "gm") : null;
    const callArgs = callRe ? Array.from(code.matchAll(callRe)).map((m) => m[2]) : [];
    const uniqueArgs = new Set(callArgs.map((s) => s.trim()));
    const hasTwoDifferentCalls = uniqueArgs.size >= 2;

    const checks = [hasDefWithParam, hasIndentedPrintUsingParam, hasTwoDifferentCalls];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) => {
    const defMatch = code.match(/\bdef\s+([A-Za-z_]\w*)\s*\(\s*([A-Za-z_]\w*)\s*\)\s*:/);
    const fn = defMatch?.[1];
    const param = defMatch?.[2];
    if (!fn || !param) return false;

    const hasIndentedPrintUsingParam = new RegExp(
      `\\bdef\\s+${fn}\\s*\\(\\s*${param}\\s*\\)\\s*:[^\\n]*\\n[ \\t]+print\\([\\s\\S]*?\\b${param}\\b`
    ).test(code);

    const callRe = new RegExp(`^[ \\t]*${fn}\\s*\\(\\s*(["'])(.*?)\\1\\s*\\)\\s*$`, "gm");
    const args = Array.from(code.matchAll(callRe)).map((m) => m[2].trim());
    const uniqueArgs = new Set(args);

    return hasIndentedPrintUsingParam && uniqueArgs.size >= 2 && !code.includes("Print(");
  },

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! You reused one skill with different details using a parameter. 🎯")
      : asTerminal(
          "❌ Almost! Make sure you defined a function with one parameter, used the parameter inside your print, and called the function at least twice with different values."
        ),
};

export default function Lesson11Page() {
  return <LessonCanvas lesson={lesson11} />;
}

