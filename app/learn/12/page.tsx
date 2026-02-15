"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson12: LessonConfig = {
  id: "lesson-12",
  title: "12. Guiding AI with Rules",
  goal: "Use if/else rules inside a function to control behavior based on the parameter.",
  xpReward: 650,
  badge: "🛡️ Rule Guide",

  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, write a function with one parameter, add if/else rules inside it, then call it with different values to prove the rules work.",
  assignmentChecklist: [
    "Define a function with one parameter.",
    "Put an `if` rule *inside* the function.",
    "Add an `else` for all other cases (or `elif` as an upgrade).",
    "Call the function with different values and predict the output before running.",
  ],

  starterCode: `# Fill in the blanks 👇
# Tip: rules inside a function control what happens.

def attack(enemy):
    if enemy == "____":
        print("This enemy is too strong! Run!")
    else:
        print("You attack the " + enemy + "!")

attack("dragon")
attack("goblin")
`,

  instructorScript:
    "**Coach’s note**\nRead this first — it explains the goal + how to think about the code.\n**Coach’s note**:\nThink about a video game enemy.\n\nA good game doesn’t let enemies attack all the time.\nInstead, the game follows rules like:\n\n- If the player is close → attack\n- Else → wait\n\nThat’s exactly how AI rules work.\n\nWe already know how to make a function and pass information into it.\nNow we’re adding rules **inside the function** to control behavior.\n\nHere’s a simple example:\n```\ndef attack(enemy):\n    if enemy == \"dragon\":\n        print(\"This enemy is too strong! Run!\")\n    else:\n        print(\"You attack the \" + enemy + \"!\")\n```\n\nSame function.\nSame parameter.\nDifferent behavior — because of rules.\n\nHere’s how to think like a coder today:\n\n- Parameters give information\n- Rules decide what to do with that information\n- The function follows rules exactly — no guessing\n\n**Mini goal**:\nCreate a function that responds differently based on rules you define.\nRead the steps, follow them in order, then press [[Run]].",

  kidExplain: [
    {
      title: "What is a Rule?",
      text:
        "A rule checks if something is true or false. In Python, rules are written using `if` and `else`.",
    },
    {
      title: "Rules guide AI behavior",
      text:
        "AI doesn’t decide what’s right or wrong. Humans write rules that limit and guide behavior.",
    },
    {
      title: "Predict first",
      text:
        "Before you press Run, try to predict which rule will run. That’s how coders think.",
    },
  ],

  aiSafetyMoment:
    "AI safety: AI systems can act fast — but only based on their rules. If rules are missing or poorly written, AI can behave incorrectly or cause harm. Responsible AI means setting clear limits, thinking about consequences, and testing rules carefully.",

  steps: [
    "Create a function with one parameter.",
    "Add an `if` statement that checks the parameter.",
    "Print one message if the condition is true.",
    "Add an `else` message for all other cases.",
    "Call the function with different values.",
    "Predict the output before pressing Run.",
    "Common mistake: If the same message prints every time, check your condition.",
  ],

  cfu: [
    {
      question: "Why does the function behave differently for different inputs?",
      answer:
        "Because the `if/else` rules check the parameter value, and different values can match different rules.",
    },
    {
      question: "Who decides the rules — the program or the human?",
      answer: "The human. The program follows the rules exactly as written.",
    },
    {
      question: "What could go wrong if rules are missing or unclear?",
      answer:
        "The system might do the wrong action, act at the wrong time, or behave in unsafe/unhelpful ways because it has no clear limits.",
    },
  ],

  tryThis: [
    "Add a second rule using `elif` (example: a special message for `\"boss\"`).",
    "Rewrite one message to sound more helpful and safe.",
    "Challenge: Explain how rules protect users from bad behavior.",
  ],

  editorPlaceholder:
    '# Try it from scratch 👇\n# def attack(enemy):\n#     if enemy == "dragon":\n#         print("This enemy is too strong! Run!")\n#     else:\n#         print("You attack the " + enemy + "!")\n#\n# attack("dragon")\n# attack("goblin")\n',

  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/11",
  nextHref: "/learn/13",

  getRunOutput: () =>
    asTerminal(
      "Press Run to test your rules. Try calling your function with different enemies and predict which message will print."
    ),

  computeProgressPercent: (code, submitted) => {
    const defMatch = code.match(/\bdef\s+([A-Za-z_]\w*)\s*\(\s*([A-Za-z_]\w*)\s*\)\s*:\s*/);
    const fn = defMatch?.[1];
    const param = defMatch?.[2];

    const hasDefWithParam = Boolean(fn && param);
    const hasIfInsideDef =
      Boolean(fn && param) &&
      new RegExp(
        `\\bdef\\s+${fn}\\s*\\(\\s*${param}\\s*\\)\\s*:[\\s\\S]*?\\n[ \\t]+if\\s+\\b${param}\\b\\s*==\\s*["'][^"']+["']\\s*:\\s*`
      ).test(code);
    const hasElseInsideDef =
      Boolean(fn) &&
      new RegExp(`\\bdef\\s+${fn}\\b[\\s\\S]*?\\n[ \\t]+else\\s*:\\s*`).test(code);

    const callRe = fn ? new RegExp(`^[ \\t]*${fn}\\s*\\(\\s*(["'])(.*?)\\1\\s*\\)\\s*$`, "gm") : null;
    const callArgs = callRe ? Array.from(code.matchAll(callRe)).map((m) => m[2]) : [];
    const uniqueArgs = new Set(callArgs.map((s) => s.trim()));
    const hasTwoDifferentCalls = uniqueArgs.size >= 2;

    const checks = [hasDefWithParam, hasIfInsideDef, hasElseInsideDef, hasTwoDifferentCalls];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) => {
    const defMatch = code.match(/\bdef\s+([A-Za-z_]\w*)\s*\(\s*([A-Za-z_]\w*)\s*\)\s*:/);
    const fn = defMatch?.[1];
    const param = defMatch?.[2];
    if (!fn || !param) return false;

    // Require if/else inside the function and at least one print in each branch.
    const hasIfBranch = new RegExp(
      `\\bdef\\s+${fn}\\s*\\(\\s*${param}\\s*\\)\\s*:[\\s\\S]*?\\n[ \\t]+if\\s+\\b${param}\\b\\s*==\\s*["'][^"']+["']\\s*:\\s*\\n[ \\t]+print\\(`
    ).test(code);
    const hasElseBranch = new RegExp(
      `\\bdef\\s+${fn}\\b[\\s\\S]*?\\n[ \\t]+else\\s*:\\s*\\n[ \\t]+print\\(`
    ).test(code);

    const callRe = new RegExp(`^[ \\t]*${fn}\\s*\\(\\s*(["'])(.*?)\\1\\s*\\)\\s*$`, "gm");
    const args = Array.from(code.matchAll(callRe)).map((m) => m[2].trim());
    const uniqueArgs = new Set(args);

    // Encourage proving both branches by calling with the special value used in the if-condition.
    const ifValueMatch = code.match(new RegExp(`if\\s+${param}\\s*==\\s*(["'])([^"']+)\\1\\s*:`));
    const special = ifValueMatch?.[2];
    const hasSpecialCall = special ? uniqueArgs.has(special) : true;

    return (
      hasIfBranch &&
      hasElseBranch &&
      uniqueArgs.size >= 2 &&
      hasSpecialCall &&
      !code.includes("Print(")
    );
  },

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Your function follows human-written rules to decide what to do. 🛡️")
      : asTerminal(
          "❌ Almost! Make sure you defined a function with one parameter, added an if/else rule inside the function, and called it with different values (including the special value your rule checks)."
        ),
};

export default function Lesson12Page() {
  return <LessonCanvas lesson={lesson12} />;
}

