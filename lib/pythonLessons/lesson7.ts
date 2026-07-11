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
  badge: "Pattern Spotter",
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
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson your pattern depended on the loop *counter* (turn 0, 1, 2…). Today you'll build something cooler: a pattern that **flips back and forth on its own** — like \`ping → pong → ping → pong\` — by **changing a variable** while the loop runs.\n\nHere's the plan:\n\n• **State** — how a program remembers a value between loop turns.\n• **Updating a variable** — changing that value mid-loop so the next turn behaves differently.\n• **Tracing** — walking through the loop one turn at a time to predict the output.\n\nThis is the secret behind turn-taking in games (your move, my move, your move…), light/dark mode toggles, and a scoreboard that flips between two teams. Once a program can remember and change a value, it can keep track of "where it is" — the foundation of almost every app you use.`,
        image: "/images/lessons/py-7-pingpong.png",
        imageAlt: "A ping-pong ball bouncing back and forth between two paddles",
        callout: {
          label: "Why it matters",
          text: "Turn-taking in a game (Player 1, Player 2, Player 1…), alternating colors, and \"toggle\" switches all work by flipping a stored value each round.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "Patterns that change as they go",
        body: `In Lesson 6, the pattern came from the loop counter \`i\` — a number you could read but never change. Today the pattern comes from *you* changing a value yourself, turn by turn.\n\nThe secret is that the loop **remembers** a value between turns. Picture a light switch: it's either ON or OFF, and each time you flip it, it remembers its new position for next time. Your variable works the same way — set it, check it, flip it, and the next turn starts from the flipped value.\n\nThat "remembered, changeable value" is what turns a flat, repeating loop into a living, bouncing pattern.`,
        callout: {
          label: "Common misconception",
          text: "The variable doesn't reset to its starting value each turn. It keeps whatever you last set it to — that memory between turns is exactly what makes the pattern flip.",
        },
      },
      {
        id: "state",
        kicker: "Building block #1",
        title: "Keep a value, then change it",
        body: `The recipe has three moves. First, set a **starting value** *before* the loop begins — that's where the pattern starts. Then, inside the loop, do two things every turn: **check** the value with a rule and print the right message, then **update** the value so the next turn flips.\n\nThis stored, changing value is called the program's **state**. It's like the score in a game: it has a starting point, and it changes as play continues. Changing state over time is at the very heart of how programs — and AIs — behave.\n\nLook closely at the example: it prints the current value, *then* flips \`message\` to the opposite word, so the next turn around the loop prints the new one.`,
        code: `message = "ping"\nfor i in range(4):\n    print(message)\n    if message == "ping":\n        message = "pong"\n    else:\n        message = "ping"`,
        codeCaption: "Flip between ping and pong",
        output: `ping\npong\nping\npong`,
        callout: {
          label: "Watch out",
          text: "Set the starting value **before** the loop, not inside it. If you reset `message` at the top of every turn, it can never flip — and the pattern gets stuck on one word.",
        },
      },
      {
        id: "trace",
        kicker: "Think like a coder",
        title: "Trace one turn at a time",
        body: `Changing state can feel like juggling, so the pro move is to **trace** it slowly — pretend *you* are the computer and write down the value at each step.\n\nWalk it through: print the current value, *then* flip it, *then* loop again with the new value. Turn 1: print "ping", flip to "pong". Turn 2: print "pong", flip to "ping". Turn 3: print "ping", flip to "pong"… and so on. Tracing two or three turns by hand makes the whole pattern click.\n\nDo this *before* you press Run, and then check whether the real output matches your trace.`,
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
        id: "worked",
        kicker: "Worked example",
        title: "Let's trace a bounce together",
        body: `Let's build and trace a ping/pong bouncer step by step.\n\n**Step 1 — Set the start.** \`message = "ping"\` before the loop. The pattern begins on "ping".\n\n**Step 2 — Loop and print.** \`for i in range(5):\` repeats 5 times, and \`print(message)\` shows the current value first.\n\n**Step 3 — Flip the state.** The \`if/else\` swaps \`message\` to the opposite word, so the next turn prints the other one.\n\n**Step 4 — Trace it.** ping (flip→pong), pong (flip→ping), ping (flip→pong), pong (flip→ping), ping. Five lines, bouncing the whole way.`,
        code: `# Step 1: starting state before the loop\nmessage = "ping"\n\nfor i in range(5):\n    # Step 2: show the current value\n    print(message)\n    # Step 3: flip the state for next turn\n    if message == "ping":\n        message = "pong"\n    else:\n        message = "ping"`,
        codeCaption: "The finished bouncer, with comments",
        output: `ping\npong\nping\npong\nping`,
        callout: {
          label: "Pro tip",
          text: "Order matters: print *first*, then flip. If you flip before printing, you'll skip the starting value and your pattern will start on the wrong word.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned how programs *remember and change*: set a **starting value** before the loop, **check** it with a rule each turn, and **update** it so the pattern keeps bouncing.\n\nIn the exercises you'll set a starting value, loop, check a rule, and update the value to keep the pattern alternating. Predict the first three lines before you run — then see if your trace was right!\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/6",
  nextHref: "/learn/8",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill the starting-value pattern",
      focusCommand: "starting value + flip",
      commandExplain:
        "Set a starting value before the loop, print it, then flip it each turn. Fill every ____.",
      goal: "Fill the blanks so the pattern prints ping, then flips for 5 turns.",
      starterCode: `message = "____"

for i in range(5):
    print(message)
    if message == "____":
        message = "____"
    else:
        message = "____"`,
      solutionCode: `message = "ping"

for i in range(5):
    print(message)
    if message == "ping":
        message = "pong"
    else:
        message = "ping"`,
      hint: 'Start with "ping". Print first, then flip to "pong" (and back).',
      previewOutput: "ping\npong\nping\npong\nping",
      successMessage: "Starting value + flip — your bouncing pattern works.",
      failureMessage:
        "Need message before the loop, for range(5), print(message), and if/else flips inside.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /\bmessage\s*=\s*["'][^"']+["']/.test(code) &&
        FOR_RANGE5.test(code) &&
        IF_INSIDE_FOR.test(code) &&
        ELSE_INSIDE_FOR.test(code) &&
        /\bfor[\s\S]*?\n[ \t]+print\s*\(\s*message\s*\)/.test(code) &&
        run.stdout.length === 5 &&
        run.stdout.filter((line) => line === "ping" || line === "pong").length === 5,
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the bouncer",
      focusCommand: "state + loop",
      commandExplain:
        "Scrambled bounce pattern. Put starting value, loop, print, then flip in order.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      parsonsLines: [
        'message = "ping"',
        "for i in range(5):",
        "    print(message)",
        '    if message == "ping":',
        '        message = "pong"',
        "    else:",
        '        message = "ping"',
      ],
      solutionCode: `message = "ping"
for i in range(5):
    print(message)
    if message == "ping":
        message = "pong"
    else:
        message = "ping"`,
      hint: "Starting value first. Inside the loop: print, then if/else flip.",
      successMessage: "Order is right — print then flip each turn.",
      failureMessage:
        "Need message before the loop, for range(5), print(message), and if/else flips.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        FOR_RANGE5.test(code) &&
        IF_INSIDE_FOR.test(code) &&
        ELSE_INSIDE_FOR.test(code) &&
        /\bfor[\s\S]*?\n[ \t]+print\s*\(\s*message\s*\)/.test(code) &&
        run.stdout.length === 5 &&
        run.stdout.filter((line) => line === "ping" || line === "pong").length === 5,
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Debug the starting value",
      focusCommand: "starting value placement",
      commandExplain:
        "This pattern is stuck on ping. The starting value is reset inside the loop every turn.",
      goal: "Move the starting value so it is set only once, before the loop.",
      starterCode: `for i in range(5):
    message = "ping"
    print(message)
    if message == "ping":
        message = "pong"
    else:
        message = "ping"
`,
      solutionCode: `message = "ping"

for i in range(5):
    print(message)
    if message == "ping":
        message = "pong"
    else:
        message = "ping"
`,
      debugHint: "starting value inside loop",
      hint: "Set message = \"ping\" before the for loop, not at the top of every turn.",
      successMessage: "Fixed — the starting value lives before the loop so it can flip.",
      failureMessage:
        "Move message = \"ping\" above the for loop so it isn't reset every turn.",
      validate: (code, run) => {
        const startBeforeLoop =
          /\bmessage\s*=\s*["']ping["'][\s\S]*?\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:/.test(
            code
          );
        const resetInsideLoop =
          /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*\n[ \t]+message\s*=/.test(code);
        return (
          !rejectsUppercasePrint(code) &&
          noRunError(run) &&
          startBeforeLoop &&
          !resetInsideLoop &&
          FOR_RANGE5.test(code) &&
          IF_INSIDE_FOR.test(code) &&
          ELSE_INSIDE_FOR.test(code) &&
          run.stdout.length === 5 &&
          run.stdout[0] === "ping" &&
          run.stdout[1] === "pong" &&
          run.stdout.filter((line) => line === "ping" || line === "pong").length === 5
        );
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the bounce",
      focusCommand: "trace state",
      commandExplain:
        "Read this finished bouncer. Predict the five output lines before you see them.",
      goal: "Type your prediction, then Run & check.",
      starterCode: `message = "ping"

for i in range(5):
    print(message)
    if message == "ping":
        message = "pong"
    else:
        message = "ping"
`,
      solutionCode: `message = "ping"

for i in range(5):
    print(message)
    if message == "ping":
        message = "pong"
    else:
        message = "ping"
`,
      codeReadOnly: true,
      predictionPrompt: "What five lines print? (one per line)",
      acceptedPredictions: [
        "ping\npong\nping\npong\nping",
        "ping pong ping pong ping",
        "Ping\nPong\nPing\nPong\nPing",
      ],
      hint: "Print the current value first, then flip for the next turn.",
      successMessage: "You traced the bouncing state correctly.",
      failureMessage: "Walk through each turn: print the current message, then flip it.",
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
      title: "Exercise 5 — Build the bouncer",
      focusCommand: "from scratch",
      commandExplain:
        "Write a program that starts with a value, loops 5 times, prints, and flips each turn.",
      goal: "Build the full bounce pattern yourself.",
      starterCode: `# Starting value + loop + flip\n`,
      solutionCode: `message = "ping"

for i in range(5):
    print(message)
    if message == "ping":
        message = "pong"
    else:
        message = "ping"
`,
      hint: 'message = "ping" before the loop; print(message) then if/else flip inside.',
      successMessage: "You built a predictable bouncing pattern from scratch. 🌟",
      failureMessage:
        "Need a starting value before for range(5), print(message), and if/else flips.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /\bmessage\s*=\s*["'][^"']+["']/.test(code) &&
        FOR_RANGE5.test(code) &&
        IF_INSIDE_FOR.test(code) &&
        ELSE_INSIDE_FOR.test(code) &&
        INDENTED_PRINT_IN_FOR.test(code) &&
        run.stdout.length === 5 &&
        run.stdout.filter((line) => line === "ping" || line === "pong").length === 5,
    },
  ],
};
