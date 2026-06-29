import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

const RUNTIME_NAME_INPUT = {
  key: "name",
  label: 'Pretend you typed for: input("What is your name? ")',
  placeholder: "Alex",
  defaultValue: "Alex",
};

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
  badge: "🧠 Rule Builder",
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
      id: "ex-if",
      title: "Exercise 1 — First rule (if)",
      focusCommand: "if",
      commandExplain:
        'Start with the top rule: if name == "Alex": with an indented print underneath.',
      goal: 'Add if name == "Alex": with a special welcome message.',
      starterCode: `name = input("What is your name? ")

if name == "____":
    print("____")
`,
      hint: 'Type Alex and a message like "Welcome back, Alex!"',
      successMessage: "Great! You wrote the first rule in your rule chain.",
      failureMessage: 'Use if name == "Alex": with an indented print() and a colon.',
      runtimeInputs: [RUNTIME_NAME_INPUT],
      validate: (code: string, run: MiniRunResult, runtime?: Record<string, string>) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasIfAlex(code)) return false;
        if (!hasIndentedPrintIf(code)) return false;
        const nameRaw = (runtime?.name ?? "").trim();
        if (!nameRaw) return false;
        return run.stdout.length >= 1;
      },
    },
    {
      id: "ex-elif",
      title: "Exercise 2 — Second rule (elif)",
      focusCommand: "elif",
      commandExplain:
        'elif adds another rule checked only if the if rule was False. Use elif, not a second if.',
      goal: 'Add elif name == "Jordan": with its own indented print.',
      starterCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
elif name == "____":
    print("____")
`,
      hint: 'Type Jordan and a message like "Hey Jordan, good to see you!"',
      successMessage: "Nice! You added a second rule with elif.",
      failureMessage: 'Add elif name == "Jordan": with an indented print() underneath.',
      runtimeInputs: [RUNTIME_NAME_INPUT],
      validate: (code: string, run: MiniRunResult, runtime?: Record<string, string>) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasIfAlex(code)) return false;
        if (!hasElifJordan(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElif(code)) return false;
        const nameRaw = (runtime?.name ?? "").trim();
        if (!nameRaw) return false;
        return run.stdout.length >= 2;
      },
    },
    {
      id: "ex-else",
      title: "Exercise 3 — Catch-all (else)",
      focusCommand: "else",
      commandExplain:
        "else is the fallback — it runs when neither the if nor elif rule matched.",
      goal: "Add else: with an indented print for everyone else.",
      starterCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("____")
`,
      hint: 'Try print("Hello there!") for all other names.',
      successMessage: "Perfect! Your helper now has three paths to choose from.",
      failureMessage: "Add else: with an indented print() for names that aren't Alex or Jordan.",
      runtimeInputs: [RUNTIME_NAME_INPUT],
      validate: (code: string, run: MiniRunResult, runtime?: Record<string, string>) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasIfAlex(code)) return false;
        if (!hasElifJordan(code)) return false;
        if (!hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElif(code) || !hasIndentedPrintElse(code))
          return false;
        const nameRaw = (runtime?.name ?? "").trim();
        if (!nameRaw) return false;
        return run.stdout.length >= 2;
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Put it all together",
      focusCommand: "if + elif + else",
      commandExplain:
        "Build the full rule chain: special messages for Alex and Jordan, and a fallback for everyone else.",
      goal: "Complete the if/elif/else program with all three rules and indented prints.",
      starterCode: `# Fill in the blanks 👇
name = input("What is your name? ")

if name == "____":
    print("____")
elif name == "____":
    print("____")
else:
    print("____")
`,
      hint: "Alex → special welcome, Jordan → different greeting, else → friendly hello.",
      successMessage: "You did it! Your AI follows smarter rules in order. 🎯",
      failureMessage:
        'Need name = input(...), if/elif/else rules (with colons), and indented print() lines. Check lowercase print.',
      runtimeInputs: [RUNTIME_NAME_INPUT],
      validate: (code: string, run: MiniRunResult, runtime?: Record<string, string>) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasIfAlex(code)) return false;
        if (!hasElifJordan(code)) return false;
        if (!hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElif(code) || !hasIndentedPrintElse(code))
          return false;
        const ifCount = (code.match(/\bif\s+name\s*==/g) ?? []).length;
        const hasElif = /\belif\b/.test(code);
        if (ifCount >= 2 && !hasElif) return false;
        const nameRaw = (runtime?.name ?? "").trim();
        if (!nameRaw) return false;
        return run.stdout.length >= 2;
      },
    },
  ],
  lessonModule: {
    durationLabel: "~5 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "More rules, smarter helper",
        body: `Last lesson your helper chose between **two** paths with \`if\`/\`else\`. But real situations have more than two options.\n\nToday you'll add \`elif\` (short for "else if") so your helper can follow **a whole list of rules** and pick the right one. More rules can make an AI *look* smarter — but remember, it's still following logic a human wrote.`,
        image: "/images/lessons/py-4-rules.png",
        imageAlt: "A robot following a numbered checklist of rules from top to bottom",
        callout: {
          label: "Where you see it",
          text: "Grading (A / B / C / F), game difficulty (easy / medium / hard), and \"choose your character\" menus all use if / elif / else chains.",
        },
      },
      {
        id: "elif",
        kicker: "Building block",
        title: "elif adds more choices",
        body: `\`elif\` sits between \`if\` and \`else\`. You can have as many \`elif\` rules as you want. Each one is only checked if the rules **above** it were False.`,
        code: `if name == "Alex":\n    print("Welcome back, Alex!")\nelif name == "Jordan":\n    print("Hey Jordan!")\nelse:\n    print("Hello there!")`,
        codeCaption: "Three paths instead of two",
        output: `What is your name? Jordan\nHey Jordan!`,
      },
      {
        id: "order",
        kicker: "The key idea",
        title: "Python checks rules top to bottom",
        body: `This is the most important part of the lesson. Python reads your rules **in order, from the top**. The **first** rule that's True runs — and then Python **stops checking** the rest.\n\nThat means the *order* of your rules changes how your program behaves.`,
        bullets: [
          "Put the most **specific** rules first, general ones later.",
          "Use `elif`, not a second `if` — a separate `if` gets checked even after a match.",
          "Every `if` / `elif` / `else` line ends with a colon `:` and has indented code under it.",
        ],
        callout: {
          label: "Order matters",
          text: "If a rule that matches *everyone* is placed first, none of the rules below it will ever run. Careful ordering is what keeps an AI's behavior correct.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Test every branch",
        body: `In the exercises you'll build an if → elif → else chain, then test it with **three** different names to confirm you get three different messages.\n\nClick **Start the exercises** when you're ready.`,
        output: `What is your name? Riley\nHello there!`,
      },
    ],
  },
  prevHref: "/learn/3",
  nextHref: "/learn/5",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
};
