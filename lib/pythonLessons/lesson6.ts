import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

const FOR_RANGE5 = /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/;
const IF_INSIDE_FOR =
  /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:[\s\S]*?\n[ \t]+if\s+.+:\s*/;
const ELSE_INSIDE_FOR = /\bfor[\s\S]*?\n[ \t]+else\s*:\s*/;
const PRINT_IN_IF =
  /\bfor[\s\S]*?\n[ \t]+if[\s\S]*?\n[ \t]+[ \t]+print\(/;
const PRINT_IN_ELSE =
  /\bfor[\s\S]*?\n[ \t]+else\s*:\s*\n[ \t]+[ \t]+print\(/;

function noRunError(run: MiniRunResult): boolean {
  return !run.error;
}

export const lesson6: PythonLessonConfig = {
  id: "lesson-6",
  title: "6. Patterns and Predictions",
  goal: "Combine a loop + a rule to create a predictable pattern.",
  xpReward: 350,
  badge: "Pattern Finder",
  instructorScript:
    "**Coach’s note**:\nYour bot can already repeat actions using a ==loop==.\nNow we’re adding ==rules== inside the loop.\nThis is how ==patterns== are created.\n\nA pattern is what happens when the same rule is checked again and again.\n\nHere’s how to think like a coder today:\nThe ==loop== controls how many times something happens.\nThe ==rule== controls what happens each time.\nTogether, they create a ==pattern==.\n\nTwo super common mistakes (and how to fix them):\nRule placement: If the rule is outside the loop, it only runs once.\nPrediction: Always try to ==predict== what will print before pressing [[Run]].\n\n**Mini goal**:\nMake your bot print different messages by checking a rule inside a loop.\nRead the steps, fill the blanks, then press [[Run]].",
  kidExplain: [
    {
      title: "What is a Pattern?",
      text:
        "A **pattern** is something that repeats in a predictable way. In code, patterns come from repeating rules inside loops.",
    },
    {
      title: "Loops + Rules",
      text:
        "When you put an `if` statement inside a loop, the rule is checked every time the loop runs. This is how programs create patterns.",
    },
    {
      title: "Prediction",
      text:
        "Good coders don’t just run code — they **predict** what will happen first, then compare the output to their prediction.",
    },
  ],
  steps: [
    "Start a for loop that runs 5 times using `range(5)`.",
    "Inside the loop, use an if statement to check a condition.",
    "Print one message if the condition is true and a different message if it is false.",
    "Press [[Run]] and read the console carefully.",
    "Common mistake: If your output doesn’t change, make sure your rule is inside the loop.",
  ],
  cfu: [
    {
      question: "What creates a pattern in this program — the loop, the rule, or both?",
      answer:
        "Both. The loop repeats, and the rule decides what happens each time. Together they create the pattern.",
    },
    {
      question: "Why is it helpful to predict the output before pressing Run?",
      answer:
        "Because it helps you understand the logic. You learn faster when you compare your prediction to the real output.",
    },
    {
      question: "What happens if the rule is placed outside the loop?",
      answer: "It only runs once, so the output won’t form a repeating pattern.",
    },
  ],
  tryThis: [
    "Change the rule so the message changes every other loop run.",
    "Print the loop number along with the message (use the loop variable).",
    "Create your own pattern using a different rule (different words or a different condition).",
  ],
  aiSafetyMoment:
    "AI safety: AI systems often use patterns to make predictions. If the pattern is biased or incomplete, the AI’s output will also be biased or incorrect. Humans must think carefully about the patterns they create.",
  commandReference: [
    {
      command: "for ... in range(5):",
      summary: "Repeats the indented block 5 times — the engine that drives a pattern.",
      example: "for i in range(5):",
    },
    {
      command: "if ... : / else:",
      summary:
        "Checks a rule each loop turn. True runs the if block; False runs the else block.",
      example: 'if message == "ping":',
    },
    {
      command: "==",
      summary: "Compares two values for equality. Use == inside if, not = (which assigns).",
      example: 'message == "ping"',
    },
    {
      command: "Variable update",
      summary:
        "Changing a variable inside the loop makes the next iteration behave differently.",
      example: 'message = "pong"',
    },
  ],
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You've already learned two big skills separately: how to **repeat** with a loop (Lesson 5) and how to **decide** with a rule (Lessons 3–4). Today you combine them — and that combo is where **patterns** are born.\n\nHere's the plan:\n\n• **Nesting** — putting an \`if\` *inside* a \`for\` loop so the rule runs every turn.\n• **Double indentation** — how Python knows what's inside the loop *and* inside the rule.\n• **Predicting output** — thinking like a coder by guessing the result before you run it.\n\nPatterns are everywhere you look: the alternating colors of table rows, "every 3rd person wins a prize," the stripes on a game board. And it's deeper than decoration — finding and repeating patterns is the core of how AI learns from data.`,
        image: "/images/lessons/py-6-pattern.png",
        imageAlt: "A repeating pattern of alternating shapes",
        callout: {
          label: "Why it matters",
          text: "Striped table rows, \"every 3rd customer wins,\" and fizz-buzz style games are all loop-plus-rule patterns. AI itself works by finding patterns in data and repeating them.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "Loop + rule = a pattern",
        body: `On their own, a loop and a rule are useful but limited. A loop alone repeats the *exact same thing* every time — boring. A rule alone makes *one* decision and stops. The magic happens when you put them together.\n\nThink of a DJ on a dance floor: the **loop** is the steady beat that keeps repeating, and the **rule** is the DJ deciding "on every fourth beat, drop the bass." Repetition plus a decision equals a groove — a pattern.\n\nIn code: the loop controls *how many times* something happens, and the rule controls *what* happens each time. Put a rule **inside** a loop, and out comes a repeating, predictable pattern.`,
        callout: {
          label: "Common misconception",
          text: "A pattern doesn't need brand-new code each turn. It comes from the *same* rule being re-checked over and over inside a loop — the repetition is what makes it a pattern.",
        },
      },
      {
        id: "nest",
        kicker: "Building block #1",
        title: "Put an if inside a for",
        body: `When an \`if\` lives **inside** a loop, the rule gets checked **every single turn** of the loop. So instead of deciding once, your program decides again and again — and that's exactly how the pattern forms.\n\nThe tricky part is the indentation, which now has **two levels**. Picture nested boxes: the \`for\` is the big outer box, the \`if\` sits indented inside it, and the \`print\` sits indented *again* inside the \`if\`. Each level of indentation says "I belong to the thing above me."\n\nRead the example carefully: the loop runs 5 times, and on each turn the rule checks "is the counter equal to 2?" Only turn number 2 gets the special message; the rest fall to the \`else\`.`,
        code: `for i in range(5):\n    if i == 2:\n        print("Special turn!")\n    else:\n        print("Turn " + str(i))`,
        codeCaption: "A rule that runs every loop turn",
        output: `Turn 0\nTurn 1\nSpecial turn!\nTurn 3\nTurn 4`,
        callout: {
          label: "Watch out",
          text: "Code inside an `if` that's inside a `for` needs to be indented **twice** (about 8 spaces). One level puts it in the loop; the second level puts it in the rule.",
        },
      },
      {
        id: "inside-outside",
        kicker: "The key idea",
        title: "Inside the loop vs. outside the loop",
        body: `Where you place the rule changes everything. A rule **inside** the loop is checked on every turn, so it can produce a different result each time — a pattern. A rule placed **outside** (not indented under the \`for\`) runs only **once**, before or after the loop, so there's no pattern at all.\n\nIt's the difference between a referee who checks the rules on every single play versus one who checks them once at the start of the game and then walks away. The first creates a fair, repeating structure; the second misses everything that happens later.\n\nSo if your output isn't forming a repeating pattern, the very first thing to check is: *is my rule actually indented inside the loop?*`,
        bullets: [
          "Rule **inside** the loop → it repeats and forms a pattern.",
          "Rule **outside** the loop → it only runs once (no pattern).",
          "Indent twice for code inside an `if` that's inside a `for`.",
        ],
        callout: {
          label: "Common misconception",
          text: "If your output never changes, the rule is probably *outside* the loop. A rule must be indented under the `for` to run every turn.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Let's predict, then build",
        body: `Strong programmers don't just hit Run and hope — they **predict** the output first, then compare. It's the fastest way to truly understand your code. Let's do that together.\n\n**Step 1 — Count the turns.** \`range(5)\` means 5 turns, with \`i\` going 0, 1, 2, 3, 4.\n\n**Step 2 — Find the special turn.** The rule \`if i == 2:\` is true on exactly one turn.\n\n**Step 3 — Predict each line.** Turns 0, 1, 3, 4 print "Turn " plus the number; turn 2 prints "Special turn!"\n\n**Step 4 — Run and check.** Compare the real output to your prediction. Match? You understand the pattern.`,
        code: `# 5 turns; the rule is checked every single turn\nfor i in range(5):\n    if i == 2:\n        print("Special turn!")\n    else:\n        print("Turn " + str(i))`,
        codeCaption: "Predict the 5 lines before you run",
        output: `Turn 0\nTurn 1\nSpecial turn!\nTurn 3\nTurn 4`,
        callout: {
          label: "AI connection",
          text: "AI makes predictions by finding patterns in data. If the pattern it learns is biased or incomplete, its predictions will be too — so humans must choose patterns carefully.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've connected your two superpowers: a **loop** to repeat and a **rule** *inside* it to decide each turn, with **double indentation** keeping everything in the right place.\n\nIn the exercises you'll place a rule inside a loop and create a pattern of changing messages. Try to predict each line of output before you run it — then check if you were right.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/5",
  nextHref: "/learn/7",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill the ping/pong blanks",
      focusCommand: "for + if/else",
      commandExplain:
        "A loop plus a rule creates a pattern. Fill every ____ so ping and pong alternate for 5 turns.",
      goal: "Fill the blanks to print a 5-line ping/pong pattern.",
      starterCode: `message = "____"

for i in range(5):
    if message == "____":
        print("____")
        message = "____"
    else:
        print("____")
        message = "____"`,
      solutionCode: `message = "ping"

for i in range(5):
    if message == "ping":
        print("ping")
        message = "pong"
    else:
        print("pong")
        message = "ping"`,
      hint: 'Start with message = "ping", then flip between ping and pong each turn.',
      previewOutput: "ping\npong\nping\npong\nping",
      successMessage: "You filled in a working ping/pong pattern.",
      failureMessage:
        "Need for range(5), if/else inside the loop, indented prints, and 5 ping/pong lines.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        FOR_RANGE5.test(code) &&
        IF_INSIDE_FOR.test(code) &&
        ELSE_INSIDE_FOR.test(code) &&
        PRINT_IN_IF.test(code) &&
        PRINT_IN_ELSE.test(code) &&
        run.stdout.length === 5 &&
        run.stdout.filter((line) => line === "ping" || line === "pong").length === 5,
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the pattern",
      focusCommand: "for + if/else",
      commandExplain:
        "These lines build a ping/pong pattern, but they're scrambled. Put them in working order.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      parsonsLines: [
        'message = "ping"',
        "for i in range(5):",
        '    if message == "ping":',
        '        print("ping")',
        '        message = "pong"',
        "    else:",
        '        print("pong")',
        '        message = "ping"',
      ],
      solutionCode: `message = "ping"
for i in range(5):
    if message == "ping":
        print("ping")
        message = "pong"
    else:
        print("pong")
        message = "ping"`,
      hint: "Starting value first, then for, then if/else with indented prints and flips.",
      successMessage: "Order is right — the pattern can run.",
      failureMessage:
        "Need message before the loop, for range(5), and if/else with indented prints inside.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        FOR_RANGE5.test(code) &&
        IF_INSIDE_FOR.test(code) &&
        ELSE_INSIDE_FOR.test(code) &&
        PRINT_IN_IF.test(code) &&
        PRINT_IN_ELSE.test(code) &&
        run.stdout.length === 5 &&
        run.stdout.filter((line) => line === "ping" || line === "pong").length === 5,
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Debug the pattern",
      focusCommand: "indentation",
      commandExplain:
        "This ping/pong loop should alternate, but the else print isn't indented under else.",
      goal: "Fix indentation so both paths print correctly.",
      starterCode: `message = "ping"

for i in range(5):
    if message == "ping":
        print("ping")
        message = "pong"
    else:
    print("pong")
        message = "ping"
`,
      solutionCode: `message = "ping"

for i in range(5):
    if message == "ping":
        print("ping")
        message = "pong"
    else:
        print("pong")
        message = "ping"
`,
      debugHint: "indentation",
      hint: "Code under else must be indented one more level than else itself.",
      successMessage: "Indentation fixed — both paths run inside the loop.",
      failureMessage: "Indent print(...) and the message update under the else block.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        FOR_RANGE5.test(code) &&
        IF_INSIDE_FOR.test(code) &&
        ELSE_INSIDE_FOR.test(code) &&
        PRINT_IN_IF.test(code) &&
        PRINT_IN_ELSE.test(code) &&
        run.stdout.length === 5 &&
        run.stdout.filter((line) => line === "ping" || line === "pong").length === 5,
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the pattern",
      focusCommand: "trace if/else",
      commandExplain:
        "Read this finished program. Predict the five output lines before you see them.",
      goal: "Type your prediction, then Run & check.",
      starterCode: `message = "ping"

for i in range(5):
    if message == "ping":
        print("ping")
        message = "pong"
    else:
        print("pong")
        message = "ping"
`,
      solutionCode: `message = "ping"

for i in range(5):
    if message == "ping":
        print("ping")
        message = "pong"
    else:
        print("pong")
        message = "ping"
`,
      codeReadOnly: true,
      predictionPrompt: "What five lines print? (one per line)",
      acceptedPredictions: [
        "ping\npong\nping\npong\nping",
        "ping pong ping pong ping",
        "Ping\nPong\nPing\nPong\nPing",
      ],
      hint: "Trace each turn: print the current message, then flip it for the next turn.",
      successMessage: "You predicted the ping/pong pattern correctly.",
      failureMessage: "Trace each loop turn carefully — print first, then flip the message.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        run.stdout.length === 5 &&
        run.stdout[0] === "ping" &&
        run.stdout[1] === "pong" &&
        run.stdout[2] === "ping" &&
        run.stdout[3] === "pong" &&
        run.stdout[4] === "ping",
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build the pattern",
      focusCommand: "from scratch",
      commandExplain:
        "Write a for loop with if/else that prints a ping/pong pattern for 5 turns.",
      goal: "Build the full ping/pong program yourself.",
      starterCode: `# Ping/pong pattern: loop + if/else\n`,
      solutionCode: `message = "ping"

for i in range(5):
    if message == "ping":
        print("ping")
        message = "pong"
    else:
        print("pong")
        message = "ping"
`,
      hint: 'Set message = "ping" before the loop, then if/else inside for i in range(5):',
      successMessage: "You built a loop + rule pattern from scratch. 🌟",
      failureMessage:
        "Need for range(5), if/else inside the loop, indented prints, and 5 ping/pong lines.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        FOR_RANGE5.test(code) &&
        IF_INSIDE_FOR.test(code) &&
        ELSE_INSIDE_FOR.test(code) &&
        PRINT_IN_IF.test(code) &&
        PRINT_IN_ELSE.test(code) &&
        run.stdout.length === 5 &&
        run.stdout.filter((line) => line === "ping" || line === "pong").length === 5,
    },
  ],
};
