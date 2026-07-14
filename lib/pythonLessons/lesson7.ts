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
    durationLabel: "~20–25 min lesson",
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
        id: "hook-story",
        kicker: "Think about it",
        title: "A light switch remembers its position",
        body: `A light switch doesn't reset to OFF every time you look away. It **remembers** its position: ON stays ON until something flips it, and OFF stays OFF the same way. Whoever flips it next starts from wherever it was left, not from some fixed starting point.\n\nYour \`message\` variable is about to work exactly like that switch — except instead of ON/OFF, it flips between "ping" and "pong," carrying its value from one loop turn into the next.`,
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `New vocabulary for this lesson.`,
        bullets: [
          "**State** — a value a program remembers and can change over time.",
          "**Update** — changing a variable's value while the program runs.",
          "**Trace** — manually walking through code, step by step, to predict what it does.",
          "**Iteration** — one full pass through a loop.",
        ],
      },
      {
        id: "concept-1",
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
        checkIn: {
          prompt: 'What is `message` right after the line `message = "pong"` runs, if it was previously "ping"?',
          choices: ["\"pong\"", "Still \"ping\"", "Empty"],
          correctIndex: 0,
          explanation: "Assignment overwrites the old value. Once message = \"pong\" runs, the box holds \"pong\" until something changes it again.",
        },
      },
      {
        id: "concept-2",
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
        checkIn: {
          prompt: "When tracing state by hand, what should you write down at each step?",
          choices: [
            "Only the final answer",
            "The value before the turn, what prints, and the value after the flip",
            "Just the loop counter i",
          ],
          correctIndex: 1,
          explanation: "A full trace tracks the value entering the turn, what gets printed, and the value leaving the turn (after any updates) — that's what lets you predict correctly.",
        },
      },
      {
        id: "concept-3",
        kicker: "Order matters",
        title: "Print first, then flip",
        body: `The order of operations inside the loop matters enormously. If you print *first* and flip *second*, the first thing shown is your true starting value. If you accidentally flip *before* printing, you'll skip showing the starting value entirely and the whole pattern shifts by one.\n\nThis is a subtle but very common bug — always double-check which happens first: showing the current state, or changing it.`,
        code: `message = "ping"\n\n# Correct order: show, then change\nprint(message)\nif message == "ping":\n    message = "pong"`,
        codeCaption: "Print BEFORE updating the state",
        checkIn: {
          prompt: "What goes wrong if you flip message to \"pong\" BEFORE printing it, on the very first turn?",
          choices: ["Nothing changes", "Python throws an error", "The starting value \"ping\" never gets shown — the output starts one step late"],
          correctIndex: 2,
          explanation: "If you flip before printing, the printed value is always the flipped one, so the true starting value is skipped entirely.",
        },
      },
      {
        id: "worked-example",
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
        id: "misconception",
        kicker: "Common misconception",
        title: "Variables don't reset between turns",
        body: `In Lesson 6, the pattern came from the loop counter \`i\` — a number you could read but never change. Today the pattern comes from *you* changing a value yourself, turn by turn.\n\nA common misconception: some beginners assume the variable resets to its starting value each turn. It doesn't. It keeps whatever you last set it to — that memory between turns is exactly what makes the pattern flip.`,
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Trace three turns before you run",
        body: `Here's a similar bouncer, but starting on \`"pong"\` and running for only 3 turns. Trace it carefully.`,
        code: `message = "pong"\nfor i in range(3):\n    print(message)\n    if message == "ping":\n        message = "pong"\n    else:\n        message = "ping"`,
        codeCaption: "What three lines print?",
        checkIn: {
          prompt: "What are the three lines this prints, in order?",
          choices: ["pong, ping, pong", "ping, pong, ping", "pong, pong, pong"],
          correctIndex: 0,
          explanation: "Starting at \"pong\": turn 1 prints pong (flips to ping), turn 2 prints ping (flips to pong), turn 3 prints pong.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "State can be more than two values",
        body: `Today's state flips between just two values — ping and pong. But state can track anything that changes over time: a score that goes up, a health bar that goes down, a counter of how many special turns have happened.\n\nThe pattern is always the same: a variable holds the current situation, a rule checks and possibly updates it, and the loop repeats that check-and-update over and over. This exact shape (called an **accumulator pattern**) will come back again and again in future lessons.`,
        code: `score = 0\nfor i in range(3):\n    score = score + 10\n    print(score)`,
        codeCaption: "State that grows instead of flipping",
        output: `10\n20\n30`,
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "Flipping a flag vs. counting turns",
        body: `Compare flipping a flag variable (ping/pong) to just checking whether the turn number \`i\` is even or odd using \`i % 2\`. Both can create the exact same alternating pattern — but the flag version doesn't need any math, while the modulo version doesn't need a separate variable to update.\n\nThere's often more than one valid way to build the same pattern. Part of growing as a coder is learning to recognize multiple approaches and pick the one that's clearest for the situation.`,
        code: `# Flag version\nmessage = "ping"\nfor i in range(4):\n    print(message)\n    if message == "ping":\n        message = "pong"\n    else:\n        message = "ping"\n\n# Modulo version (uses math, no flag needed)\nfor i in range(4):\n    if i % 2 == 0:\n        print("ping")\n    else:\n        print("pong")`,
        codeCaption: "Two different ways to alternate",
      },
      {
        id: "debug-habit",
        kicker: "Debugging habit",
        title: "When output is one step off, check your order",
        body: `If your bouncing pattern seems shifted by exactly one position — starting on the wrong word — the most likely cause is that the flip happens *before* the print instead of *after*.\n\nDebugging habit: whenever output looks "almost right, but shifted," check the **order of operations** inside your loop before assuming the logic itself is wrong.`,
        checkIn: {
          prompt: 'Your loop should start by printing "ping" but instead starts with "pong". Most likely cause?',
          choices: [
            "range() has the wrong number",
            "The if/else flip runs before the print, so the starting value never actually gets shown",
            "print() is broken",
          ],
          correctIndex: 1,
          explanation: "If the flip happens before the print, the printed value is always the already-flipped one, shifting the whole pattern by one step.",
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Trace before you trust",
        body: `Whenever a program involves state that changes over time, trace it by hand for at least a few turns before you fully trust your code. This habit catches off-by-one errors, wrong initial values, and flipped logic long before you'd notice them just by staring at the code.`,
        bullets: [
          "Trace 2–3 turns minimum before running state-based code.",
          "Write down: value before, what prints, value after.",
          "If real output doesn't match your trace, your mental model — not just your code — needs fixing.",
        ],
      },
      {
        id: "standards-connect",
        kicker: "Why this counts",
        title: "This lesson meets a real CS standard",
        body: `**CSTA 2-AP-17**: *Systematically test and refine programs using a range of test cases.*\n\nTracing your code by hand *before* running it, then comparing your prediction to the real output, is a form of systematic testing — you're proactively checking your program's behavior instead of just hoping it works.`,
        callout: {
          label: "Standard",
          text: "CSTA 2017, Algorithms & Programming, Level 2: 2-AP-17 — systematically test and refine programs.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Reflect",
        title: "Think it through",
        body: `*Think about turn-based games (checkers, tic-tac-toe, board games). What "state" does the game need to remember between turns — whose turn it is, the score, positions on the board? How is that similar to the message variable you flipped today?*`,
      },
      {
        id: "mini-case",
        kicker: "Real world",
        title: "Turn-based games run on flipped state",
        body: `Every turn-based game — chess, tic-tac-toe, checkers — keeps track of "whose turn is it?" using state exactly like your \`message\` variable. After each move, the game flips that value from Player 1 to Player 2, and the next move is checked against the new value.\n\nWithout remembered, changing state, a game could never keep track of turns at all.`,
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you build",
        body: `Let's confirm the state-tracing pattern is locked in.`,
        checkIn: {
          prompt: 'A loop runs 4 times, starting with `message = "ping"`, printing then flipping each turn. What is the 4th (last) line printed?',
          choices: ["ping", "Nothing prints", "pong"],
          correctIndex: 2,
          explanation: "Turn 1: ping. Turn 2: pong. Turn 3: ping. Turn 4: pong. The pattern alternates, so the 4th line is pong.",
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
