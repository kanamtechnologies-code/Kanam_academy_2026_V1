import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function hasNameInput(code: string) {
  return /\bname\s*=\s*input\(/.test(code);
}

function hasIfAlex(code: string) {
  return /\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code);
}

function hasElse(code: string) {
  return /\nelse\s*:/.test(code);
}

function hasIndentedPrintIf(code: string) {
  return /\bif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code);
}

function hasIndentedPrintElse(code: string) {
  return /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code);
}

export const lesson3: PythonLessonConfig = {
  id: "lesson-3",
  title: "3. My AI Makes Choices",
  goal: "Use if / else to make your AI respond differently based on input.",
  xpReward: 150,
  badge: "Decision Maker",
  instructorScript:
    "**Coach’s note**:\nLast week, our AI helper learned how to **listen**.\nToday, we’re going to teach it how to **make choices**.\n\nBig idea (very important):\n- The computer does NOT guess.\n- It checks your rule.\n- If the rule is True, it runs that block.\n- Otherwise, it runs the else block.\n\nThis is what many early AI systems look like:\n**rule-based decision making**.\nA human writes the rules. The program follows them exactly.\n\nTwo super common mistakes (watch for these):\n- `=` vs `==`: `=` assigns (puts a value in a box). `==` compares (asks a question).\n- Indentation: the lines under if/else MUST be indented so Python knows what belongs to each choice.\n\nHow to test like a teacher:\nRun it once with Alex (you should get the special message), then run it again with a different name (you should get the other message).",
  kidExplain: [
    {
      title: "AI Concept: Rules control behavior",
      text:
        "Many AI systems start as **rule-based systems**. That means a human writes rules, and the computer follows those rules exactly. Today your AI helper will follow one simple rule to decide what to say.",
    },
    {
      title: "What is an if statement?",
      text:
        "An `if` statement checks a condition. If the condition is True, Python runs the indented code under it.",
    },
    {
      title: "else = the other path",
      text:
        "An `else` block runs when the if condition is False. It’s your “plan B” so your program always has something to do.",
    },
    {
      title: "Compare vs assign (== vs =)",
      text:
        "`=` assigns (stores a value). `==` compares (checks if two values are equal). Inside an if, you almost always want `==`.",
    },
    {
      title: "Indentation matters",
      text:
        "Indentation (spaces) tells Python which lines belong inside the if or else. If it’s not indented, Python can’t tell what you meant.",
    },
  ],
  steps: [
    "Ask for the user’s name using input().",
    'Write the rule: if name == "Alex":',
    "Inside the if block, print a special message for Alex.",
    "Add else: for everyone else.",
    "Inside else, print a friendly message for any other name.",
  ],
  cfu: [
    {
      question: "Symbols: What is the difference between = and == in Python?",
      answer: "`=` assigns (stores a value). `==` compares (checks if two values are equal).",
    },
    {
      question: "Structure: Why do the print lines need to be indented under if and else?",
      answer:
        "Because indentation tells Python which lines belong to each block. Without it, Python can’t tell what should run for each choice.",
    },
    {
      question:
        "Logic: If the name is Alex and the if condition is True, does Python run the else too?",
      answer: "No. Only one path runs: if runs when True, else runs when False.",
    },
  ],
  tryThis: [
    "Swap the special name (Easy): Change Alex to your own name.",
    'Reverse it (Medium): Make the special message happen when the name is NOT Alex.',
    'Add a second rule (Bonus): Add another if to check for a second special name (like "Sam").',
  ],
  aiSafetyMoment:
    "Responsible AI: Your AI helper is only following rules you wrote. If it behaves badly, the responsibility belongs to the human who wrote the rules.",
  commandReference: [
    {
      command: 'if name == "Alex":',
      summary: "Checks a condition. Use == to compare (not =). Don't forget the colon!",
      example: 'if name == "Alex":',
    },
    {
      command: "else:",
      summary: "Runs when the if condition is False — your fallback path.",
      example: "else:\n    print(\"Hello there!\")",
    },
    {
      command: "==",
      summary: "Compares two values for equality. Different from = which assigns.",
      example: 'name == "Alex"',
    },
    {
      command: "indentation",
      summary: "Lines under if/else must be indented (4 spaces) so Python knows they belong inside.",
      example: "    print(\"Welcome back, Alex!\")",
    },
  ],
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in the comparison",
      focusCommand: "==",
      commandExplain:
        "Inside an if, you compare with == (two equals). Fill in the blank so the rule checks whether name is Alex.",
      goal: 'Replace ____ with == so the if compares name to "Alex".',
      starterCode: `# Fill in the blank 👇
name = input("What is your name? ")

if name ____ "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      solutionCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      hint: "One = assigns. Two == compares. You want to ask a question here.",
      successMessage: "You used == to compare — the decision rule works!",
      failureMessage: 'Need if name == "Alex": with indented prints under if and else.',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the decision",
      focusCommand: "if / else",
      commandExplain: "Scrambled if/else helper. Put the lines in a working order.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      solutionCode: `name = input("What is your name? ")
if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")`,
      parsonsLines: [
        'name = input("What is your name? ")',
        'if name == "Alex":',
        '    print("Welcome back, Alex!")',
        "else:",
        '    print("Hello there!")',
      ],
      hint: "input → if → indented print → else → indented print.",
      successMessage: "Order works — your helper can choose a path.",
      failureMessage: "Check indentation under if/else and the == comparison.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
    {
      id: "ex-debug-if",
      kind: "debug",
      title: "Exercise 3 — Debug the decision",
      focusCommand: "if / else",
      commandExplain:
        "This helper is almost right, but the if rule has a bug. Fix it so Alex gets the special welcome.",
      goal: "Find and fix the bug, then Run & check.",
      starterCode: `name = input("What is your name? ")

if name = "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      solutionCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      debugHint: "comparison vs assignment",
      hint: "Remember: == compares. A single = assigns.",
      successMessage: "Bug squashed! You used == for the comparison.",
      failureMessage: "The if line should compare with ==, not assign with =.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasIfAlex(code)) return false;
        if (!hasElse(code)) return false;
        if (
          /\bif\s+name\s*=\s*["']Alex["']\s*:/.test(code) &&
          !/\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code)
        ) {
          return false;
        }
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the branch",
      focusCommand: "trace if/else",
      commandExplain: "If name is Riley (not Alex), what will print?",
      goal: "Predict the exact output for Riley.",
      starterCode: `name = "Riley"
if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      solutionCode: `name = "Riley"
if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      codeReadOnly: true,
      predictionPrompt: "What exact line prints?",
      acceptedPredictions: ["Hello there!", "hello there!"],
      hint: "Riley is not Alex, so the else path runs.",
      successMessage: "You predicted the else branch correctly.",
      failureMessage: "Non-Alex names take the else path.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return run.stdout.join("\n").includes("Hello there!");
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build if/else yourself",
      focusCommand: "from scratch",
      commandExplain:
        "Write a full program: ask for a name; special welcome for Alex; friendly hello for everyone else.",
      goal: "Write the full if/else program.",
      starterCode: `# Decision helper from scratch\n`,
      solutionCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      hint: 'if name == "Alex": … else: … with indented prints',
      successMessage: "You built a rule-based helper from scratch.",
      failureMessage: 'Need input, if name == "Alex":, else:, and indented prints.',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElse(code)) return false;
        // Silent default name is Alex → if branch should run.
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
        body: `Your helper can already **talk** (Lesson 1) and **listen** (Lesson 2). Today it learns the skill that makes a program feel alive: how to **make choices**.\n\nHere's what you'll pick up:\n\n• **\`if\`** — how to check a condition and run code only when it's true.\n• **\`==\` vs \`=\`** — the difference between *comparing* and *assigning* (the #1 beginner mix-up).\n• **\`else\`** — your "plan B" for everything the \`if\` didn't catch.\n\nThink about a video game that greets you with "Welcome back!" but shows a stranger a "Sign up" button, or a phone that unlocks for *your* face but nobody else's. Every one of those is a computer making a choice. Today you write your first one.`,
        image: "/images/lessons/py-3-choice.png",
        imageAlt: "A robot at a forked path choosing between two directions",
        callout: {
          label: "Why it matters",
          text: "Decisions are everywhere: \"if the password is correct, log in — otherwise show an error.\" Games, apps, spam filters, and parental controls are all built from these if/else rules.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "Teach your AI to make a choice",
        body: `Up to now your program ran the same lines every time, top to bottom, no matter what. But the real world isn't like that — what you should do *depends* on the situation. If it's raining, grab an umbrella; if not, leave it home.\n\nGiving code this power is called **rule-based decision making**, and it's exactly how many early AI systems worked: a human writes the rules, and the computer follows them *exactly*. The computer never guesses or has a hunch — it checks your rule and picks a path.\n\nThat's actually reassuring. If your helper ever makes a "wrong" choice, it didn't malfunction — your rule just needs to be clearer.`,
        callout: {
          label: "Common misconception",
          text: "An \"AI making choices\" sounds like it's thinking for itself. It isn't — it's following rules a human wrote, one comparison at a time. Smart-looking behavior is just well-organized rules.",
        },
      },
      {
        id: "if",
        kicker: "Building block #1",
        title: "if checks a condition",
        body: `An \`if\` statement asks a simple yes/no question. If the answer is **True**, Python runs the indented lines underneath. If it's **False**, Python skips them entirely.\n\nThink of a bouncer at a school dance checking the guest list: "Is your name on the list? Yes → come in. No → step aside." The \`if\` line is the question; the indented code is what happens when the answer is yes.\n\nTwo things beginners forget: the **colon** \`:\` at the end of the \`if\` line, and **indenting** the code underneath so Python knows it belongs to the \`if\`.`,
        code: `if name == "Alex":\n    print("Welcome back, Alex!")`,
        codeCaption: "Run this only when name is Alex",
        callout: {
          label: "Watch out",
          text: "Forgetting the colon `:` at the end of the `if` line is the most common error here. Python will stop and complain until you add it.",
        },
      },
      {
        id: "equals",
        kicker: "The #1 mistake",
        title: "== compares, = assigns",
        body: `This one trips up *everyone*, so let's burn it in right now. In Python, one equals sign and two equals signs are completely different tools.\n\n• \`=\` (one equals) means **assign** — put a value into a box: \`name = "Alex"\`. Think of it as an arrow pointing left.\n• \`==\` (two equals) means **compare** — ask "are these two things the same?": \`name == "Alex"\`. This gives back \`True\` or \`False\`.\n\nA good way to remember: one \`=\` *does* something (stores a value), two \`==\` *asks* something (a question). Inside an \`if\`, you're always asking a question, so you almost always want \`==\`.`,
        bullets: [
          "`name = \"Alex\"` → **stores** Alex in the box (an action).",
          "`name == \"Alex\"` → **asks** *is the box equal to Alex?* (True or False).",
          "Lines under `if` must be **indented** (4 spaces) so Python knows they belong to it.",
        ],
        callout: {
          label: "Common misconception",
          text: "Writing `if name = \"Alex\":` (one equals) is a classic bug. You meant to *ask* a question but accidentally told Python to *store* a value. Use `==` inside an `if`.",
        },
      },
      {
        id: "else",
        kicker: "Building block #2",
        title: "else handles everyone else",
        body: `An \`if\` on its own only acts when the answer is yes — when it's no, nothing happens at all. But usually you want *something* to happen either way. That's what \`else\` is for.\n\n\`else\` is the **fallback** — your "plan B." It runs whenever the \`if\` condition is **False**, so your program always has something to do. Back to the bouncer: name on the list → "Welcome back!"; name *not* on the list → "Hello there, welcome!" Nobody gets ignored.\n\nThe key rule: only **one** path ever runs. If the \`if\` is true, the \`else\` is skipped. If the \`if\` is false, only the \`else\` runs. Never both.`,
        code: `if name == "Alex":\n    print("Welcome back, Alex!")\nelse:\n    print("Hello there!")`,
        codeCaption: "Two paths, one choice",
        output: `What is your name? Sam\nHello there!`,
        callout: {
          label: "Common misconception",
          text: "Python does **not** run both blocks. It picks exactly one — the `if` block when the condition is true, the `else` block when it's false.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Let's build a decision together",
        body: `Let's put the pieces together into one decision-making helper, step by step.\n\n**Step 1 — Listen.** Use \`input()\` to ask for a name and store it in the \`name\` box, just like Lesson 2.\n\n**Step 2 — Ask the question.** Write \`if name == "Alex":\` (two equals, with a colon) and indent a special welcome underneath.\n\n**Step 3 — Add plan B.** Write \`else:\` and indent a friendly message for everyone who isn't Alex.\n\n**Step 4 — Run it twice.** Type "Alex" and you'll get the special welcome; type any other name and you'll get the fallback. One program, two different behaviors.`,
        code: `# Step 1: listen for a name\nname = input("What is your name? ")\n\n# Step 2: special path for Alex\nif name == "Alex":\n    print("Welcome back, Alex!")\n# Step 3: plan B for everyone else\nelse:\n    print("Hello there!")`,
        codeCaption: "The finished decision helper, with comments",
        output: `What is your name? Alex\nWelcome back, Alex!`,
        callout: {
          label: "Pro tip",
          text: "When testing a choice, always try *both* answers — one that makes the `if` true and one that makes it false. That's how you prove both paths work.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've unlocked decision-making: \`if\` to **ask** a yes/no question, \`==\` to **compare** (not \`=\`, which assigns), and \`else\` for the **fallback** path.\n\nIn the exercises you'll build a choosing helper one piece at a time, then test it twice — once with \`Alex\` for the special welcome, and once with a different name for the other message.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/2",
  nextHref: "/learn/4",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
};
