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
    durationLabel: "~20–25 min lesson",
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
        id: "hook-story",
        kicker: "Think about it",
        title: "A DJ dropping the beat",
        body: `Picture a DJ at a party. The **beat** keeps repeating steadily — that's the loop. But the DJ also has a **rule**: "on every fourth beat, drop the bass." The beat alone is just repetition. The rule alone is just one decision. Put the rule *inside* the beat, checked every single time, and you get a groove — a pattern people can dance to.\n\nToday you're the DJ. Your loop is the beat, and the \`if\` you tuck inside it is the rule that turns plain repetition into something with structure.`,
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `New vocabulary for this lesson.`,
        bullets: [
          "**Nesting** — placing one structure (like an if) inside another (like a for loop).",
          "**Pattern** — a predictable, repeating result created by a loop + a rule.",
          "**Double indentation** — indenting twice: once for the loop, once more for the rule inside it.",
        ],
      },
      {
        id: "concept-1",
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
        checkIn: {
          prompt: "In a for loop with an if inside it, how many levels of indentation does the print inside the if need?",
          choices: ["Two levels", "One level", "Zero — no indentation needed"],
          correctIndex: 0,
          explanation: "One level of indentation puts the code inside the loop; a second level puts it inside the if that's nested within the loop.",
        },
      },
      {
        id: "concept-2",
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
        checkIn: {
          prompt: "If a rule is placed OUTSIDE the loop (not indented under for), how many times is it checked?",
          choices: ["Every turn of the loop", "Only once, total", "Twice"],
          correctIndex: 1,
          explanation: "A rule outside the loop isn't part of its repeating body, so it's checked only a single time — no pattern forms.",
        },
      },
      {
        id: "concept-3",
        kicker: "Pattern you'll build",
        title: "Flip a value to alternate ping and pong",
        body: `One of the most satisfying loop-plus-rule patterns is **alternating** — ping, pong, ping, pong. Instead of checking the loop counter \`i\`, you keep a **message** variable and flip it each turn.\n\nSet \`message = "ping"\` before the loop. Each turn: print the current message, then use \`if message == "ping":\` to swap it to \`"pong"\`, and \`else:\` to swap back. The variable **remembers** what to print next — that's what makes the pattern bounce.\n\nThis is the same shape you'll use in the exercises: a starting value, a loop, a rule inside with **double indentation**, and an update so the next turn is different.`,
        code: `message = "ping"\nfor i in range(5):\n    if message == "ping":\n        print("ping")\n        message = "pong"\n    else:\n        print("pong")\n        message = "ping"`,
        codeCaption: "Alternate ping and pong for 5 turns",
        output: `ping\npong\nping\npong\nping`,
        callout: {
          label: "Watch out",
          text: "Put `message = \"ping\"` **before** the loop, not inside it. Resetting each turn would erase the flip and stick the pattern on one word.",
        },
        checkIn: {
          prompt: 'If `message = "ping"` is placed INSIDE the loop (reset every turn), what happens to the pattern?',
          choices: ["It alternates perfectly, same as before", "It causes an error", "It gets stuck printing ping every single turn"],
          correctIndex: 2,
          explanation: "Resetting message to \"ping\" every turn erases the flip from the previous turn, so the pattern never actually alternates.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Let's predict the ping/pong pattern",
        body: `Let's build and trace the alternating pattern step by step — the same one you'll practice in the exercises.\n\n**Step 1 — Set the start.** \`message = "ping"\` before the loop.\n\n**Step 2 — Loop five times.** \`for i in range(5):\` with the rule indented inside.\n\n**Step 3 — Print, then flip.** Each turn prints the current word, then swaps \`message\` to the opposite.\n\n**Step 4 — Trace it.** ping (flip→pong), pong (flip→ping), ping, pong, ping. Five lines, alternating the whole way.`,
        code: `# Step 1: starting value before the loop\nmessage = "ping"\n\nfor i in range(5):\n    # Step 2 & 3: rule inside the loop, double-indented prints\n    if message == "ping":\n        print("ping")\n        message = "pong"\n    else:\n        print("pong")\n        message = "ping"`,
        codeCaption: "Predict the 5 lines before you run",
        output: `ping\npong\nping\npong\nping`,
        callout: {
          label: "AI connection",
          text: "AI makes predictions by finding patterns in data. If the pattern it learns is biased or incomplete, its predictions will be too — so humans must choose patterns carefully.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "A pattern doesn't need new code each turn",
        body: `On their own, a loop and a rule are useful but limited. A loop alone repeats the *exact same thing* every time — boring. A rule alone makes *one* decision and stops. The magic happens when you put them together.\n\nA pattern doesn't need brand-new code each turn. It comes from the *same* rule being re-checked over and over inside a loop — the repetition, combined with a value that changes, is what makes it a pattern.`,
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Trace turns 0–4 before you run",
        body: `Here's the same alternating pattern, but this time starting on \`"pong"\` instead of \`"ping"\`. Trace through five turns in your head before checking.`,
        code: `message = "pong"\nfor i in range(5):\n    if message == "ping":\n        print("ping")\n        message = "pong"\n    else:\n        print("pong")\n        message = "ping"`,
        codeCaption: "What five lines print, starting from pong?",
        checkIn: {
          prompt: "What are the first two lines printed, in order?",
          choices: ["pong, ping", "ping, pong", "pong, pong"],
          correctIndex: 0,
          explanation: "Since message starts as \"pong\", the else branch runs first (printing pong and flipping to ping), then the if branch runs next (printing ping).",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Patterns can use the counter AND a flag",
        body: `You've seen two different ways to build a pattern: checking the loop counter \`i\` directly (like "is this turn number 2?"), or flipping a separate \`message\` variable each turn. Real programs often combine both — using the counter for *some* rules and a flag variable for others, all inside the same loop.\n\nThe key skill is the same either way: a rule, checked every turn, that can produce a different result depending on what it finds.`,
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "Counter-based vs. flag-based patterns",
        body: `Compare checking \`i\` directly against flipping a separate variable. The counter approach is great when the pattern depends on *which turn number* it is (like "every 3rd turn"). The flag approach is great when the pattern should simply *alternate* regardless of the turn number.`,
        code: `# Counter-based: special on turn 2 only\nfor i in range(5):\n    if i == 2:\n        print("Special!")\n    else:\n        print("Turn " + str(i))\n\n# Flag-based: alternates every turn\nmessage = "ping"\nfor i in range(5):\n    if message == "ping":\n        print("ping")\n        message = "pong"\n    else:\n        print("pong")\n        message = "ping"`,
        codeCaption: "Different rules, both inside a loop",
      },
      {
        id: "debug-habit",
        kicker: "Debugging habit",
        title: "Trace turn by turn on paper",
        body: `When a loop-plus-rule pattern isn't behaving the way you expect, the best debugging tool is a pencil and paper (or just careful thinking): write down the variable's value *before* each turn, what gets printed, and its value *after* the flip.\n\nDoing this for even 2–3 turns almost always reveals exactly where your logic went wrong — usually a reset in the wrong place or a flip that's missing.`,
        checkIn: {
          prompt: "Your ping/pong pattern prints ping every single time instead of alternating. What should you check FIRST?",
          choices: [
            "Whether range() has the right number",
            "Whether the message = \"pong\" flip is actually inside the if/else and properly indented",
            "Whether print() is spelled correctly",
          ],
          correctIndex: 1,
          explanation: "If the flip line is missing, mis-indented, or outside the if/else, message never actually changes, so it prints the same value every turn.",
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Predict before you run",
        body: `Good coders don't just run code — they **predict** what will happen first, then compare the output to their prediction. This one habit turns every bug into a learning moment: if your prediction was wrong, you now know exactly where your mental model needs fixing.`,
        bullets: [
          "Trace at least 2–3 turns by hand before pressing Run.",
          "Compare your prediction to the real output — a mismatch tells you exactly where to look.",
          "Double indentation is the #1 thing to check when a nested rule misbehaves.",
        ],
      },
      {
        id: "standards-connect",
        kicker: "Why this counts",
        title: "This lesson meets a real CS standard",
        body: `**CSTA 2-AP-12**: *Design and iteratively develop programs that combine control structures, including nested loops and compound conditionals.*\n\nNesting an \`if\` inside a \`for\` loop is literally what this standard describes: combining control structures. You're not just using loops and conditionals separately anymore — you're combining them into one structure.`,
        callout: {
          label: "Standard",
          text: "CSTA 2017, Algorithms & Programming, Level 2: 2-AP-12 — combining control structures, including nested structures.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Reflect",
        title: "Think it through",
        body: `*Think of a real pattern that alternates, like walking (left foot, right foot, left foot...) or a crosswalk light (walk, don't walk, walk...). What is the "rule" being checked each time, and what "flips" after each turn?*`,
      },
      {
        id: "mini-case",
        kicker: "Real world",
        title: "Striped tables use this exact pattern",
        body: `Ever notice how spreadsheet or website tables often alternate row colors — white, gray, white, gray? That's a loop (going through each row) with a rule inside it (check if the row number is even or odd) that flips the color each time.\n\nIt's the exact same ping/pong shape you built today, just applied to colors instead of words.`,
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you build",
        body: `Let's confirm the nested pattern is locked in.`,
        checkIn: {
          prompt: "Which is required for a loop-plus-rule pattern to actually alternate output?",
          choices: ["The rule must be outside the loop", "You only need the loop — rules are optional", "The rule must be inside the loop AND update a value that changes what happens next turn"],
          correctIndex: 2,
          explanation: "The rule needs to live inside the loop (checked every turn) and also update the value it's checking, so the next turn behaves differently.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've connected your two superpowers: a **loop** to repeat and a **rule** *inside* it to decide each turn, with **double indentation** keeping everything in the right place.\n\nIn the exercises you'll build the **ping/pong alternating pattern** — set a starting \`message\`, loop five times, print, and flip inside \`if\`/\`else\`. Predict each line before you run, then check if your trace was right.\n\nClick **Start the exercises** when you're ready.`,
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
