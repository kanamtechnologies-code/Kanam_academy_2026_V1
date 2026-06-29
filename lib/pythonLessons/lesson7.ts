import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

const FOR_RANGE5 = /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/;
const IF_INSIDE_FOR = /\bfor[\s\S]*?\n[ \t]+if\s+.+:\s*/;
const ELSE_INSIDE_FOR = /\bfor[\s\S]*?\n[ \t]+else\s*:\s*/;
const INDENTED_PRINT_IN_FOR = /\bfor[\s\S]*?\n[ \t]+[ \t]+print\(/;

function noRunError(run: MiniRunResult): boolean {
  return !run.error;
}

export const lesson7: PythonLessonConfig = {
  id: "lesson-7",
  title: "7. AI Notices Patterns",
  goal: "Use a loop + a changing value to create a pattern you can predict.",
  xpReward: 400,
  badge: "🧠 Pattern Spotter",
  instructorScript:
    "**Coach’s note**:\nPatterns happen when you repeat a ==rule== inside a ==loop==.\nToday your job is to make a pattern you can ==predict== before pressing [[Run]].\n\nBig idea:\n- The ==loop== controls how many times we repeat.\n- The ==rule== controls what happens each time.\n\n**Mini goal**:\nMake the output switch back and forth (like ping → pong → ping → pong…).",
  kidExplain: [
    {
      title: "Pattern",
      text: "A pattern is something that repeats in a predictable way.",
    },
    {
      title: "Prediction",
      text: "Predicting output helps you understand the logic before you run the program.",
    },
    {
      title: "Loop + Rule",
      text: "When an `if` is inside a `for` loop, the rule is checked every iteration.",
    },
  ],
  steps: [
    "Set a starting value (like message = \"ping\").",
    "Start a for loop with `range(5)`.",
    "Inside the loop, check a condition using if/else.",
    "Print one message for True and a different message for False.",
    "Update the value so the next loop run behaves differently.",
  ],
  cfu: [
    {
      question: "What makes the pattern happen in this program?",
      answer:
        "The loop repeats and the rule changes what happens each time — together they create the pattern.",
    },
    {
      question: "What is one iteration?",
      answer: "One single run through the loop (one turn).",
    },
    {
      question: "Why should you predict output before pressing Run?",
      answer: "It helps you learn the logic instead of guessing.",
    },
  ],
  tryThis: [
    "Print the loop number too (use i).",
    "Change ping/pong into two different words.",
    "Make a 3-step pattern by adding an elif rule.",
  ],
  aiSafetyMoment:
    "AI safety: pattern-based systems can look smart, but they only repeat patterns they were taught. If the pattern is wrong or biased, the output will be wrong too.",
  commandReference: [
    {
      command: "Starting value",
      summary:
        "Set a variable before the loop so the first iteration knows what to check.",
      example: 'message = "ping"',
    },
    {
      command: "for ... in range(5):",
      summary: "Runs the loop body 5 times — one iteration per count.",
      example: "for i in range(5):",
    },
    {
      command: "if / else inside loop",
      summary:
        "The rule is re-checked every iteration. Update the variable to flip the pattern.",
      example: 'if message == "ping": ... else: ...',
    },
    {
      command: "Predict before Run",
      summary:
        "Trace the first 2–3 iterations on paper, then compare to console output.",
      example: "ping → pong → ping → ...",
    },
  ],
  lessonModule: {
    durationLabel: "~5 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "Patterns that change as they go",
        body: `Last lesson your pattern depended on the loop counter. Today you'll build a pattern that **flips back and forth** — like \`ping → pong → ping → pong\` — by **changing a variable** while the loop runs.\n\nThe secret: the loop remembers a value between turns. Update that value each turn, and the next turn behaves differently.`,
        image: "/images/lessons/py-7-pingpong.png",
        imageAlt: "A ping-pong ball bouncing back and forth between two paddles",
        callout: {
          label: "Where you see it",
          text: "Turn-taking in a game (Player 1, Player 2, Player 1…), alternating colors, and \"toggle\" switches all work by flipping a stored value each round.",
        },
      },
      {
        id: "state",
        kicker: "Building block",
        title: "Keep a value, then change it",
        body: `Set a **starting value** *before* the loop. Inside the loop, check it with a rule, print the right message, then **update** the value so the next turn flips.\n\nThis stored value is called the program's **state** — and changing state over time is at the heart of how programs (and AIs) behave.`,
        code: `message = "ping"\nfor i in range(4):\n    print(message)\n    if message == "ping":\n        message = "pong"\n    else:\n        message = "ping"`,
        codeCaption: "Flip between ping and pong",
        output: `ping\npong\nping\npong`,
      },
      {
        id: "trace",
        kicker: "Think like a coder",
        title: "Trace one turn at a time",
        body: `To understand changing state, walk through it slowly: print the current value, *then* flip it, *then* loop again with the new value.`,
        bullets: [
          "**One iteration** = one full turn through the loop.",
          "Set the starting value **before** the loop, not inside it.",
          "Update the variable **inside** the loop so each turn can differ.",
        ],
        callout: {
          label: "AI connection",
          text: "Pattern-based systems can look clever, but they only repeat patterns they were given. A wrong or biased pattern produces wrong output — perfectly, every time.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Make it bounce",
        body: `In the exercises you'll set a starting value, loop, check a rule, and update the value to keep the pattern bouncing. Predict the first three lines before you run!\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/6",
  nextHref: "/learn/8",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  exercises: [
    {
      id: "ex-start-value",
      title: "Exercise 1 — Set a starting value",
      focusCommand: "Variable",
      commandExplain:
        "A variable before the loop holds the starting state — like message = \"ping\".",
      goal: "Fill in the starting message and print it once to confirm the value.",
      starterCode: `message = "____"
print(message)`,
      hint: 'Try "ping" as your starting word',
      successMessage: "Starting value set — you know where the pattern begins.",
      failureMessage: 'Fill in the blank with a word in quotes, like "ping".',
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /\bmessage\s*=\s*["'][^"']+["']/.test(code) &&
        /\bprint\s*\(\s*message\s*\)/.test(code) &&
        run.stdout.length === 1 &&
        run.stdout[0].length > 0,
    },
    {
      id: "ex-loop-five",
      title: "Exercise 2 — Loop 5 times",
      focusCommand: "for",
      commandExplain: "range(5) repeats the indented block exactly 5 times.",
      goal: "Add a for loop with range(5) that prints the message each iteration.",
      starterCode: `message = "ping"

for i in range(____):
    print(message)`,
      hint: "Type 5 in range(...)",
      successMessage: "Five iterations — the loop is driving your pattern.",
      failureMessage: "Use for i in range(5): with an indented print(message). Expect 5 lines.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        FOR_RANGE5.test(code) &&
        /\bfor[\s\S]*?\n[ \t]+print\(/.test(code) &&
        run.stdout.length === 5,
    },
    {
      id: "ex-if-else-loop",
      title: "Exercise 3 — Rule inside the loop",
      focusCommand: "if / else",
      commandExplain:
        "Put if/else inside the for loop and update message so each turn can differ.",
      goal: "Build if/else inside the loop that alternates ping and pong.",
      starterCode: `message = "ping"

for i in range(5):
    if message == "ping":
        print("ping")
        message = "pong"
    else:
        print("____")
        message = "ping"`,
      hint: 'Print "pong" in the else block',
      successMessage: "Rule checked every iteration — the pattern alternates!",
      failureMessage:
        "Need if/else inside the for loop with indented print lines under each path.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        FOR_RANGE5.test(code) &&
        IF_INSIDE_FOR.test(code) &&
        ELSE_INSIDE_FOR.test(code) &&
        INDENTED_PRINT_IN_FOR.test(code) &&
        run.stdout.length === 5,
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Predictable ping/pong pattern",
      focusCommand: "Loop + rule",
      commandExplain:
        "Combine starting value, for loop, if/else, and variable updates into one predictable pattern.",
      goal: "Fill in all blanks to create a ping/pong pattern across 5 loop iterations.",
      starterCode: `# Fill in the blanks 👇
message = "____"

for i in range(5):
    if message == "____":
        print("____")
        message = "____"
    else:
        print("____")
        message = "____"`,
      hint: "Start with ping, alternate to pong, and flip message back each turn.",
      previewOutput: "ping\npong\nping\npong\nping",
      successMessage: "You built a predictable pattern with loops + rules. 🌟",
      failureMessage:
        "Need for range(5), if/else inside the loop, indented print() lines, and 5 output lines.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        FOR_RANGE5.test(code) &&
        IF_INSIDE_FOR.test(code) &&
        ELSE_INSIDE_FOR.test(code) &&
        INDENTED_PRINT_IN_FOR.test(code) &&
        /\b=\s*["'][^"']+["']/.test(code) &&
        run.stdout.length === 5 &&
        run.stdout.filter((line) => line === "ping" || line === "pong").length === 5,
    },
  ],
};
