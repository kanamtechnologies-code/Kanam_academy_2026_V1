import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function hasNameInput(code: string) {
  return /\bname\s*=\s*input\(/.test(code);
}

function hasIfAlex(code: string) {
  return /\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code);
}

function hasElifJordan(code: string) {
  return /\belif\s+name\s*==\s*["']Jordan["']\s*:/.test(code);
}

function hasElse(code: string) {
  return /\nelse\s*:/.test(code);
}

function hasIndentedPrintIf(code: string) {
  return /\bif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code);
}

function hasIndentedPrintElif(code: string) {
  return /\belif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code);
}

function hasIndentedPrintElse(code: string) {
  return /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code);
}

export const lesson4: PythonLessonConfig = {
  id: "lesson-4",
  title: "4. Smarter AI Rules",
  goal: "Use if / elif / else to make your AI follow multiple rules in order.",
  xpReward: 250,
  badge: "Rule Builder",
  instructorScript:
    "**Coach’s note**:\nLast session, our AI helper could make a simple choice (if/else).\nToday, we’re going to teach it how to make **better choices** with more rules.\n\nNew tool: `elif` (else if)\n- Python checks rules from **top to bottom**.\n- The **first** rule that matches is the one that runs.\n- After a match happens, Python stops checking the rest.\n\nAI idea:\nAdding more rules can make an AI look “smarter”…\n…but it still follows human-defined logic.\nIf your rules are unclear or in the wrong order, the behavior can look wrong.\n\nCommon mistakes to watch for:\n- Missing colons (:) after if/elif/else\n- Indentation errors (print must be indented under each rule)\n- Using multiple if statements instead of elif (that can cause confusing behavior)\n\nHow to test like a teacher:\nRun it with Alex, Jordan, and one other name and confirm you get 3 different outputs.",
  kidExplain: [
    {
      title: "AI Concept: More rules can look smarter",
      text:
        "When you add more rules, your AI helper can handle more situations. That can make it feel smarter — but it’s still just following rules written by a human.",
    },
    {
      title: "elif = else if",
      text:
        "`elif` lets your program check more than two choices. It means: “if the first rule wasn’t true, try this next rule.”",
    },
    {
      title: "Rule order matters",
      text:
        "Python checks from top to bottom. The first rule that matches is the one that runs — so if you put a too-general rule first, it can block the rest.",
    },
    {
      title: "First matching rule runs",
      text:
        "If multiple rules *could* match, Python still runs only the first match. That’s why we design rules carefully.",
    },
  ],
  steps: [
    'Ask for a name: name = input("What is your name? ")',
    'Rule 1 (if): if name == "Alex": print a special message.',
    'Rule 2 (elif): elif name == "Jordan": print a different message.',
    "Catch-all (else): print a message for everyone else.",
    "Test multiple names and observe how rule order affects which message runs.",
  ],
  cfu: [
    {
      question: "What is the difference between if, elif, and else?",
      answer:
        "`if` is the first rule, `elif` are extra rules checked only if the earlier ones were False, and `else` is the fallback when none match.",
    },
    {
      question: "Why does rule order matter?",
      answer:
        "Because Python checks from top to bottom. The first matching rule runs and Python stops checking the rest.",
    },
    {
      question: "What happens if two rules could apply to the same input?",
      answer: "Python runs the first rule that matches and ignores the rest.",
    },
  ],
  tryThis: [
    "VIP rule (Easy): Add a VIP name that MUST appear first (top rule).",
    "Name length (Medium): Add a rule for short names (like 3 letters) vs long names.",
    "New input (Bonus): Instead of names, ask for a mood or favorite subject and build rules for it.",
  ],
  aiSafetyMoment:
    "Responsible AI: More rules can make an AI look smarter, but it still follows human logic. Poorly ordered or unclear rules can cause unintended behavior — the human is responsible.",
  commandReference: [
    {
      command: 'if name == "Alex":',
      summary: "First rule — checked first. Use == to compare and don't forget the colon.",
      example: 'if name == "Alex":',
    },
    {
      command: 'elif name == "Jordan":',
      summary: "Extra rule — checked only if the if rule was False. elif, not a second if.",
      example: 'elif name == "Jordan":',
    },
    {
      command: "else:",
      summary: "Fallback when no if/elif rule matched. Always runs last.",
      example: "else:\n    print(\"Hello there!\")",
    },
    {
      command: "rule order",
      summary: "Python checks top to bottom. First match wins — order your rules carefully.",
      example: "if → elif → else",
    },
  ],
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in elif",
      focusCommand: "elif",
      commandExplain:
        "elif means “else if” — an extra rule checked only if the if above was False. Fill in the blank to add Jordan’s rule.",
      goal: "Replace ____ with elif so the second rule continues the same chain.",
      starterCode: `# Fill in the blank 👇
name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
____ name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      solutionCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      hint: "Type elif (one word) — not a second if.",
      successMessage: "You added elif — three paths in one chain!",
      failureMessage: 'Need if Alex, elif Jordan, else — each with indented prints.',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElifJordan(code) || !hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElif(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the rule chain",
      focusCommand: "if / elif / else",
      commandExplain: "Scrambled smarter rules. Put if → elif → else in working order.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      solutionCode: `name = input("What is your name? ")
if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")`,
      parsonsLines: [
        'name = input("What is your name? ")',
        'if name == "Alex":',
        '    print("Welcome back, Alex!")',
        'elif name == "Jordan":',
        '    print("Hey Jordan, good to see you!")',
        "else:",
        '    print("Hello there!")',
      ],
      hint: "Top rule first, then elif, then else — with indented prints.",
      successMessage: "Rule chain order is correct.",
      failureMessage: "Need if Alex, elif Jordan, else — each with indented prints.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElifJordan(code) || !hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElif(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Debug elif order",
      focusCommand: "elif",
      commandExplain: "Jordan never gets their special message. The second rule uses if instead of elif — fix it.",
      goal: "Change the second rule so it is elif (not a second if).",
      starterCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
if name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      solutionCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      debugHint: "elif vs second if",
      hint: "A second if starts a new chain. Use elif to continue the first chain.",
      successMessage: "Fixed — elif continues the same decision chain.",
      failureMessage: 'Second rule should be elif name == "Jordan":',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElifJordan(code) || !hasElse(code)) return false;
        if ((code.match(/\bif\s+name\s*==/g) ?? []).length > 1) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElif(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the path",
      focusCommand: "trace elif",
      commandExplain: "If name is Jordan, which message prints?",
      goal: "Predict the exact output for Jordan.",
      starterCode: `name = "Jordan"
if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      solutionCode: `name = "Jordan"
if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      codeReadOnly: true,
      predictionPrompt: "What exact line prints?",
      acceptedPredictions: [
        "Hey Jordan, good to see you!",
        "hey jordan, good to see you!",
      ],
      hint: "Alex rule fails, then elif Jordan matches.",
      successMessage: "You traced the elif path correctly.",
      failureMessage: "Jordan should hit the elif message.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return run.stdout.join("\n").includes("Hey Jordan, good to see you!");
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build if/elif/else",
      focusCommand: "from scratch",
      commandExplain: "Write the full three-path helper yourself.",
      goal: "Special messages for Alex and Jordan; fallback for everyone else.",
      starterCode: `# Smarter rules from scratch\n`,
      solutionCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      hint: "if → elif → else with indented prints",
      successMessage: "You built a three-path helper from scratch.",
      failureMessage: "Need if Alex, elif Jordan, else, and indented prints.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElifJordan(code) || !hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElif(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
  ],

  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson your helper chose between **two** paths with \`if\`/\`else\`. But real life rarely has just two options — think of all the choices in a single video game menu.\n\nToday you'll level up your decision-making:\n\n• **\`elif\`** — short for "else if," it lets you check *many* rules, not just one.\n• **Rule order** — why Python reads your rules top to bottom, and why that order changes everything.\n• **First match wins** — how Python stops at the first true rule and ignores the rest.\n\nWhen a game sorts players into Bronze, Silver, Gold, or Diamond, or a quiz gives you an A, B, C, or F, it's running a chain of rules like the one you're about to build. More rules can make an AI *look* smarter — but it's still following logic a human wrote.`,
        image: "/images/lessons/py-4-rules.png",
        imageAlt: "A robot following a numbered checklist of rules from top to bottom",
        callout: {
          label: "Why it matters",
          text: "Grading (A / B / C / F), game difficulty (easy / medium / hard), and \"choose your character\" menus all use if / elif / else chains. Anything with more than two outcomes needs this.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "More rules, smarter helper",
        body: `An \`if\`/\`else\` is a fork in the road — two directions. But what if there are *five* directions? You can't capture that with a single yes/no question.\n\nThat's where \`elif\` comes in. It lets your helper follow **a whole list of rules**, checking them one after another until it finds the one that fits. Imagine a flowchart with several diamond-shaped decision points stacked in a row: "Is it this? No. Is it that? No. Is it the other thing? Yes!" — and it acts on the first match.\n\nAdding more rules can make an AI *seem* clever, but never forget: every rule, and the order they're in, was decided by a human.`,
        callout: {
          label: "Common misconception",
          text: "Adding lots of rules doesn't make a program \"think.\" It just handles more situations. The intelligence is in *how carefully a human designed and ordered the rules*.",
        },
      },
      {
        id: "elif",
        kicker: "Building block #1",
        title: "elif adds more choices",
        body: `\`elif\` (say it "ell-if") sits **between** \`if\` and \`else\`. You can stack as many \`elif\` rules as you want, one after another.\n\nHere's the key: each \`elif\` is only checked if **all the rules above it were False**. It's like a series of doors in a hallway — you only try the next door if the previous one was locked. The moment a door opens (a rule is True), you walk through it and stop trying the rest.\n\nNotice that \`elif\` is one word, and like \`if\` and \`else\`, its line ends with a colon \`:\` and has indented code underneath.`,
        code: `if name == "Alex":\n    print("Welcome back, Alex!")\nelif name == "Jordan":\n    print("Hey Jordan!")\nelse:\n    print("Hello there!")`,
        codeCaption: "Three paths instead of two",
        output: `What is your name? Jordan\nHey Jordan!`,
        callout: {
          label: "Watch out",
          text: "Use `elif`, not a second separate `if`. Two separate `if` statements both get checked, which can run *two* messages by accident. `elif` guarantees only one path runs.",
        },
      },
      {
        id: "order",
        kicker: "The key idea",
        title: "Python checks rules top to bottom",
        body: `This is the most important part of the whole lesson. Python reads your rules **in order, from the top down**. The **first** rule that turns out True runs — and then Python **stops checking** everything below it.\n\nThink of airport security lines with signs: "First class here, then priority, then everyone else." You join the *first* line you qualify for and never look at the others. Your rules work the same way.\n\nThis means the *order* of your rules changes how your program behaves. A rule placed too early can "grab" inputs that were meant for a rule lower down — and that lower rule will never get a turn.`,
        bullets: [
          "Put the most **specific** rules first, general ones later.",
          "Use `elif`, not a second `if` — a separate `if` gets checked even after a match.",
          "Every `if` / `elif` / `else` line ends with a colon `:` and has indented code under it.",
        ],
        callout: {
          label: "Common misconception",
          text: "If a rule that matches *everyone* is placed first, none of the rules below it will ever run — even if they're written perfectly. Careful ordering is what keeps an AI's behavior correct.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Let's build a rule chain together",
        body: `Let's assemble a three-way helper step by step and watch how order matters.\n\n**Step 1 — Listen.** Ask for a name with \`input()\` and store it in \`name\`.\n\n**Step 2 — First rule.** \`if name == "Alex":\` runs only for Alex.\n\n**Step 3 — Second rule.** \`elif name == "Jordan":\` is checked *only if* the name wasn't Alex.\n\n**Step 4 — Catch-all.** \`else:\` handles every other name, so nobody is left without a reply.\n\nRun it three times — "Alex", "Jordan", and "Riley" — and you'll see three different messages, each from a different branch of the chain.`,
        code: `# Step 1: listen for a name\nname = input("What is your name? ")\n\n# Step 2-4: check rules top to bottom, first match wins\nif name == "Alex":\n    print("Welcome back, Alex!")\nelif name == "Jordan":\n    print("Hey Jordan, good to see you!")\nelse:\n    print("Hello there!")`,
        codeCaption: "The finished rule chain, with comments",
        output: `What is your name? Riley\nHello there!`,
        callout: {
          label: "Pro tip",
          text: "To really test a rule chain, feed it one input for *each* branch. If you have three paths, try three inputs and confirm you get three different results.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've upgraded from two choices to many: \`if\` starts the chain, \`elif\` adds extra rules checked in order, and \`else\` catches everyone else — with the **first matching rule** always winning.\n\nIn the exercises you'll build an \`if → elif → else\` chain, then test it with **three** different names to confirm you get three different messages.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/3",
  nextHref: "/learn/5",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
};
