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
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `So far your bot can talk, listen, and make choices. Today you'll give it a true superpower: **repetition** — doing the same task over and over without getting tired or bored.\n\nHere's the plan:\n\n• **Loops** — why repeating one instruction beats copy-pasting it ten times.\n• **The \`for\` loop** — how to repeat code a set number of times.\n• **\`range(n)\`** — how to control exactly how many times the loop runs.\n• **Indentation** — how Python knows which lines should repeat.\n\nEvery app you use leans on loops constantly: your feed loads post after post, a game deals card after card, a music app plays track after track. Humans get tired doing repetitive things; computers never do. That's what makes this one of programming's most powerful ideas.`,
        image: "/images/lessons/py-5-loop.png",
        imageAlt: "A robot repeating an action shown as a circular arrow cycle",
        callout: {
          label: "Why it matters",
          text: "Loading 50 posts in a feed, dealing cards in a game, sending a daily reminder — anything that happens \"over and over\" is a loop. Repeating perfectly and tirelessly is also a core idea behind how AI is trained.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "Let your AI repeat tasks",
        body: `Imagine telling your helper to say "Hello!" ten times. You *could* copy and paste \`print("Hello!")\` ten times… but that's slow, clutters your code, and if you want to change the message you'd have to edit all ten lines.\n\nInstead, we use a **loop** — a single instruction that says "do this again and again." It's like a chorus in a song: you don't write the words ten times, you just mark "repeat." Write the action once, tell Python how many times, and it handles the rest.\n\nThis is one of a computer's greatest strengths. A human reading aloud gets tired and makes mistakes by the hundredth time; a loop runs the hundredth time exactly like the first.`,
        callout: {
          label: "Why it matters",
          text: "If you ever catch yourself copy-pasting the same line over and over, that's a signal a loop would do it better. Loops keep code short, and short code is easier to fix.",
        },
      },
      {
        id: "for",
        kicker: "Building block #1",
        title: "A for loop repeats a set number of times",
        body: `A \`for\` loop repeats the indented code below it. Reach for it when you **know how many times** you want to repeat — like "do this 5 times."\n\nThink of stamping a row of identical shapes: you load the stamp once (write the code once) and press it down again and again. The loop is the pressing; the indented line is the stamp.\n\nTwo things to get right: the \`for\` line ends with a colon \`:\`, and the work you want repeated is **indented** underneath it. The indentation is how Python knows that line belongs *inside* the loop.`,
        code: `for i in range(3):\n    print("KanamBot: Hello!")`,
        codeCaption: "Say hello three times",
        output: `KanamBot: Hello!\nKanamBot: Hello!\nKanamBot: Hello!`,
        callout: {
          label: "Watch out",
          text: "If your message prints only **once** instead of repeating, the `print` line probably isn't indented under the `for`. Indentation is what puts a line inside the loop.",
        },
      },
      {
        id: "range",
        kicker: "Building block #2",
        title: "range(n) controls how many times",
        body: `\`range(n)\` is the dial that sets how many times your loop runs. Here's the part that surprises beginners: it counts from **0** up to — but **not including** — \`n\`.\n\nSo \`range(5)\` produces 0, 1, 2, 3, 4. That's five numbers, so the loop runs **5** times. Counting from 0 feels odd at first, but it's standard in almost every programming language, so it's worth getting used to early.\n\nThe loop also gives you a counter, usually named \`i\`, that holds the current number each time around. You can even print \`i\` to watch the loop count — handy for seeing exactly what's happening.`,
        bullets: [
          "`range(3)` → loop runs **3** times (0, 1, 2).",
          "The indented line is what repeats — indentation is everything here.",
          "If your message only prints **once**, the print line isn't indented under the loop.",
        ],
        callout: {
          label: "Common misconception",
          text: "`range(5)` does **not** include 5 — it stops at 4. But it still runs 5 times, because it started counting at 0. Count the numbers, not the last value.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Let's build a loop together",
        body: `Let's build a loop step by step and even use the counter.\n\n**Step 1 — Set the count.** \`range(5)\` tells Python to repeat 5 times (counting 0 through 4).\n\n**Step 2 — Start the loop.** \`for i in range(5):\` ends with a colon. The \`i\` is the counter that updates each turn.\n\n**Step 3 — Indent the work.** The \`print()\` line is indented, so it runs every turn. We glue \`"Turn "\` to the counter using \`str(i)\`, which turns the number into text so \`+\` can join it.\n\n**Step 4 — Run it.** Watch the counter climb from 0 to 4 — five lines, one per turn.`,
        code: `# Step 1-2: repeat 5 times, i counts each turn\nfor i in range(5):\n    # Step 3: this indented line repeats every turn\n    print("Turn " + str(i))`,
        codeCaption: "Using the counter i, with comments",
        output: `Turn 0\nTurn 1\nTurn 2\nTurn 3\nTurn 4`,
        callout: {
          label: "Pro tip",
          text: "`str(i)` converts the number `i` into text so you can join it to other text with `+`. Without `str()`, Python won't let you glue a number directly onto a string.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've added repetition to your toolkit: a **\`for\` loop** to repeat code, **\`range(n)\`** to set how many times, and **indentation** to mark exactly what repeats.\n\nIn the exercises you'll set the repeat count with \`range()\`, add an indented \`print()\`, and watch your bot's message run again and again. If it only prints once, check your indentation!\n\nClick **Start the exercises** when you're ready.`,
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
