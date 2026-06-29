import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

const FOR_WITH_COLON = /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\([^)]*\)\s*:\s*/;
const INDENTED_PRINT_IN_FOR =
  /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\([^)]*\)\s*:[^\n]*\n[ \t]+print\(/;

function noRunError(run: MiniRunResult): boolean {
  return !run.error;
}

export const lesson5: PythonLessonConfig = {
  id: "lesson-5",
  title: "5. AI Repeats Tasks",
  goal: "Use a for loop to repeat instructions a specific number of times.",
  xpReward: 300,
  badge: "🔁 Loop Starter",
  instructorScript:
    "**Coach’s note**:\nSo far, your bot can talk, listen, and make choices.\n\nToday, you’re giving it a new superpower: **repetition**.\n\nComputers and AI systems are great at doing the same thing again and again without getting tired.\nWhen we tell a program to repeat something, we use a ==loop==.\n\nA loop is like saying:\n\n“Do this exact action…\nthen do it again…\nand again…\na specific number of times.”\n\nIn this lesson, you’ll use a `for` loop to control repetition.\n\nHere’s how to think like a coder today:\n\nFirst, tell Python how many times you want something to repeat.\n\nThen, tell Python what action should repeat.\n\nPython will handle the counting for you.\n\nImportant things to remember:\n\nA `for` loop line must end with a ==colon (:)==.\n\nAnything that should repeat must be ==indented== underneath the loop.\n\nIf a line is not indented, it only runs one time.\n\nTwo super common mistakes (and how to fix them):\n\nMissing the ==colon (:)== → Python doesn’t know where the loop starts.\n\nForgetting ==indentation== → Your message prints only once.\n\n**Mini goal**:\nMake your bot say the same message multiple times using a ==loop==.\n\nRead the steps, fill in the blanks, then press [[Run]].",
  kidExplain: [
    {
      title: "What is a Loop?",
      text:
        "A loop tells Python to repeat instructions. Instead of writing the same line again and again, you write it once and let the loop repeat it.",
    },
    {
      title: "The for Loop",
      text:
        "A `for` loop repeats code a specific number of times. It’s perfect when you know how many repeats you want.",
    },
    {
      title: "range()",
      text:
        "range(5) means “count from 0 up to (but not including) 5.” That means the loop runs 5 times.",
    },
    {
      title: "Indentation",
      text:
        "Anything indented under the loop runs again and again. If it’s not indented, it only runs once.",
    },
  ],
  steps: [
    "Start a for loop that runs 5 times using range(5).",
    "Inside the loop, use print() to show a message from your bot.",
    "Make sure the print line is indented.",
    "Press Run and read the console carefully.",
    "Common mistake: If your message only prints once, your indentation is wrong.",
  ],
  cfu: [
    {
      question: "Why do we use a loop instead of writing the same print line over and over?",
      answer:
        "Because loops repeat code for us. It saves time and prevents mistakes from copying the same line many times.",
    },
    {
      question: "What does range(5) tell Python to do?",
      answer: "It tells Python to run the loop 5 times (counting 0,1,2,3,4).",
    },
    {
      question: "What happens if the print line is not indented under the loop?",
      answer: "It will only run once, because it’s not inside the loop.",
    },
  ],
  tryThis: [
    "Change the count: make the loop run 3 times, then 10 times.",
    "Personal loop: include your name in the message.",
    "Challenge: store the message in a variable and print it inside the loop.",
  ],
  aiSafetyMoment:
    "AI safety: AI repeats patterns very well — that’s its strength. But if instructions are wrong, it will repeat the wrong thing perfectly. Humans are responsible for writing clear instructions.",
  commandReference: [
    {
      command: "for ... in range(n):",
      summary:
        "Starts a loop that repeats the indented block n times. The line must end with a colon (:).",
      example: "for i in range(5):",
    },
    {
      command: "range(n)",
      summary:
        "Counts from 0 up to (but not including) n. range(5) means the loop body runs 5 times.",
      example: "range(5)",
    },
    {
      command: "print(...)",
      summary:
        "Shows a message in the console. When inside a loop, it runs once per loop turn.",
      example: 'print("KanamBot: Hello!")',
    },
    {
      command: "Indentation",
      summary:
        "Lines indented under the for loop belong inside the loop. Without indentation, code only runs once.",
      example: "    print(\"Hi\")  # four spaces before print",
    },
  ],
  lessonModule: {
    durationLabel: "~5 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "Let your AI repeat tasks",
        body: `Imagine telling your helper to say "Hello!" ten times. You *could* write \`print\` ten times… but that's slow and easy to get wrong.\n\nInstead, we use a **loop** — one instruction that repeats. Repeating patterns quickly and perfectly is one of a computer's greatest strengths (and a core idea in AI training).`,
        image: "/images/lessons/py-5-loop.png",
        imageAlt: "A robot repeating an action shown as a circular arrow cycle",
        callout: {
          label: "Where you see it",
          text: "Loading 50 posts in a feed, dealing cards in a game, sending a reminder every day — anything that happens \"over and over\" is a loop.",
        },
      },
      {
        id: "for",
        kicker: "Building block",
        title: "A for loop repeats a set number of times",
        body: `A \`for\` loop repeats the indented code below it. Use it when you **know how many times** you want to repeat. The line ends with a colon \`:\`, and the repeated work is **indented** underneath.`,
        code: `for i in range(3):\n    print("KanamBot: Hello!")`,
        codeCaption: "Say hello three times",
        output: `KanamBot: Hello!\nKanamBot: Hello!\nKanamBot: Hello!`,
      },
      {
        id: "range",
        kicker: "Counting",
        title: "range(n) controls how many times",
        body: `\`range(n)\` counts from **0** up to — but **not including** — \`n\`. So \`range(5)\` produces 0, 1, 2, 3, 4 → that's **5** turns of the loop.\n\nThe variable \`i\` holds the current count each time around, which you can even print.`,
        bullets: [
          "`range(3)` → loop runs **3** times.",
          "The indented line is what repeats — indentation is everything here.",
          "If your message only prints **once**, the print line isn't indented under the loop.",
        ],
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Watch the pattern repeat",
        body: `In the exercises you'll set the repeat count with \`range()\`, then add an indented \`print()\` and watch it run again and again.\n\nClick **Start the exercises** when you're ready.`,
        code: `for i in range(5):\n    print("Turn " + str(i))`,
        codeCaption: "Using the counter i",
        output: `Turn 0\nTurn 1\nTurn 2\nTurn 3\nTurn 4`,
      },
    ],
  },
  prevHref: "/learn/4",
  nextHref: "/learn/6",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  exercises: [
    {
      id: "ex-range",
      title: "Exercise 1 — Practice range()",
      focusCommand: "range()",
      commandExplain:
        "range(n) tells Python how many times to repeat. range(3) runs the loop 3 times.",
      goal: "Fill in range(3) so the message prints exactly 3 times.",
      starterCode: `for i in range(____):
    print("Hi")`,
      hint: "Type 3 inside the parentheses: range(3)",
      successMessage: "Nice! range(3) made the loop run 3 times.",
      failureMessage:
        "Use range(3) with an indented print(...) line. You should see 3 lines of output.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /\brange\s*\(\s*3\s*\)/.test(code) &&
        FOR_WITH_COLON.test(code) &&
        INDENTED_PRINT_IN_FOR.test(code) &&
        run.stdout.length === 3,
    },
    {
      id: "ex-for",
      title: "Exercise 2 — Practice for",
      focusCommand: "for",
      commandExplain:
        "A for loop line ends with a colon. Everything indented underneath repeats.",
      goal: "Use range(5) in a for loop so your bot message prints 5 times.",
      starterCode: `for i in range(____):
    print("KanamBot: ready!")`,
      hint: "Type 5 for five repeats: range(5)",
      successMessage: "Great! Your for loop repeated 5 times.",
      failureMessage:
        "Need for i in range(5): with an indented print(...) — expect 5 output lines.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/.test(code) &&
        INDENTED_PRINT_IN_FOR.test(code) &&
        run.stdout.length === 5,
    },
    {
      id: "ex-indent",
      title: "Exercise 3 — Indentation inside the loop",
      focusCommand: "Indentation",
      commandExplain:
        "Only indented lines run inside the loop. If print is not indented, it runs once.",
      goal: "Fill in a bot message so it prints 5 times inside the loop.",
      starterCode: `for i in range(5):
    print("KanamBot: ____")`,
      hint: 'Type any short message inside the quotes, like "Hello!"',
      successMessage: "Perfect indentation — your message repeated every loop turn.",
      failureMessage:
        "Keep print(...) indented under the for loop and fill in the message blank.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/.test(code) &&
        INDENTED_PRINT_IN_FOR.test(code) &&
        run.stdout.length === 5 &&
        run.stdout.every((line) => line.includes("KanamBot:")),
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Put it all together",
      focusCommand: "for + range + print",
      commandExplain:
        "Combine a for loop, range(5), and an indented print to repeat a bot message.",
      goal: "Build the full loop: range(5) and a KanamBot message that prints 5 times.",
      starterCode: `# Fill in the blanks 👇
for i in range(____):
    print("KanamBot: ____")`,
      hint: "range(5) and any message you like inside print(...)",
      successMessage: "You did it! Your AI repeated a task using a for loop. 🏁",
      failureMessage:
        "Need for i in range(5):, a colon, an indented print(...), and 5 lines of output. Check print is lowercase.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/.test(code) &&
        INDENTED_PRINT_IN_FOR.test(code) &&
        run.stdout.length === 5,
    },
  ],
};
