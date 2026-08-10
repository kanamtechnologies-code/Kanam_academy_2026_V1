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
  badge: "Loop Starter",
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
    durationLabel: "~20–25 min lesson",
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
        id: "hook-story",
        kicker: "Think about it",
        title: "The chorus of a song",
        body: `Songwriters don't write the chorus out fully every single time it repeats — they write it once and mark "repeat." Musicians read that mark and play the same notes again, exactly, every time.\n\nA loop is code's version of that repeat mark. Instead of writing \`print("Hello!")\` ten separate times, you write the instruction once and tell Python exactly how many times to "play it again." Same idea, just applied to instructions instead of music.`,
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `New vocabulary for this lesson.`,
        bullets: [
          "**Loop** — an instruction that repeats code instead of writing it many times.",
          "**for loop** — a loop that repeats a specific number of times.",
          "**range(n)** — produces the numbers 0 up to (not including) n.",
          "**Iteration** — one single pass through the loop.",
          "**Counter** — a variable (often `i`) that tracks which iteration you're on.",
        ],
      },
      {
        id: "concept-1",
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
        checkIn: {
          prompt: "What tells Python which lines belong INSIDE the loop and should repeat?",
          choices: ["Indentation under the for line", "The color of the text", "The word for itself"],
          correctIndex: 0,
          explanation: "Python uses indentation to define what belongs inside the loop. Un-indented lines run only once, outside the loop.",
        },
      },
      {
        id: "concept-2",
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
        checkIn: {
          prompt: "How many times does the loop body run for `range(5)`?",
          choices: ["4 times", "5 times", "6 times"],
          correctIndex: 1,
          explanation: "range(5) produces 0,1,2,3,4 — five numbers, so the loop body runs 5 times, even though the last number is 4.",
        },
      },
      {
        id: "concept-3",
        kicker: "Use the counter",
        title: "The counter i changes every turn",
        body: `The variable after \`for\` — usually \`i\` — isn't just decoration. It genuinely holds a different number on each pass through the loop: 0 on the first turn, 1 on the second, and so on.\n\nBecause \`i\` is a number, you can't glue it directly onto text with \`+\` — Python needs it converted to text first using \`str(i)\`. This small conversion step comes up constantly whenever you want to show a counter inside a message.`,
        code: `for i in range(3):\n    print("Turn " + str(i))`,
        codeCaption: "Show the counter inside the message",
        output: `Turn 0\nTurn 1\nTurn 2`,
        checkIn: {
          prompt: 'Why do we need `str(i)` instead of just `i` inside `print("Turn " + i)`?',
          choices: [
            "str() makes the loop run faster",
            "It's just a style preference, not required",
            "+  can only join text to text — i is a number, so it must be converted first",
          ],
          correctIndex: 2,
          explanation: "+ concatenates strings. i is a number, so Python needs str(i) to convert it to text before it can be joined with other text.",
        },
      },
      {
        id: "worked-example",
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
        id: "misconception",
        kicker: "Common misconception",
        title: "Copy-pasting isn't the same as looping",
        body: `Imagine telling your helper to say "Hello!" ten times. You *could* copy and paste \`print("Hello!")\` ten times… but that's slow, clutters your code, and if you want to change the message you'd have to edit all ten lines.\n\nInstead, we use a **loop** — a single instruction that says "do this again and again." Write the action once, tell Python how many times, and it handles the rest. If you ever catch yourself copy-pasting the same line over and over, that's a signal a loop would do it better.`,
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Predict the output before you run it",
        body: `Look at this loop closely. Count carefully: how many times does the body run, and what does each line say?`,
        code: `for i in range(4):\n    print("Hi")`,
        codeCaption: "How many times, and what prints?",
        checkIn: {
          prompt: "How many lines does this loop print, and what do they say?",
          choices: ["4 lines, each saying Hi", "3 lines, each saying Hi", "5 lines, each saying Hi"],
          correctIndex: 0,
          explanation: "range(4) produces 0,1,2,3 — four iterations — so Hi prints exactly 4 times.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Loops can hold more than one line",
        body: `A loop body isn't limited to a single line — you can indent as many lines as you want underneath a \`for\`, and **all** of them repeat together, every single turn.\n\nThis is how you'll build more interesting repeated behaviors soon: printing a message *and* updating a counter *and* checking a rule, all inside the same loop turn.`,
        code: `for i in range(3):\n    print("Turn " + str(i))\n    print("---")`,
        codeCaption: "Two lines repeat together, every turn",
        output: `Turn 0\n---\nTurn 1\n---\nTurn 2\n---`,
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "A loop vs. copy-pasted lines",
        body: `Both snippets below produce identical output. But only one is easy to change later. Imagine wanting to print "Hi" 100 times instead of 3 — the copy-paste version needs 100 lines; the loop version needs to change one number.`,
        code: `# Copy-pasted — hard to change\nprint("Hi")\nprint("Hi")\nprint("Hi")\n\n# Looped — change one number to scale\nfor i in range(3):\n    print("Hi")`,
        codeCaption: "Same output, very different flexibility",
      },
      {
        id: "debug-habit",
        kicker: "Debugging habit",
        title: "Only prints once? Check indentation",
        body: `If your loop message prints only **once** instead of repeating, don't panic — this is one of the most common and easiest bugs to fix. It almost always means the line you wanted repeated isn't indented under the \`for\`.\n\nDebugging habit: count how many lines actually printed, compare it to what \`range(n)\` should produce, and if the numbers don't match, look at indentation first.`,
        checkIn: {
          prompt: 'Your `for i in range(5):` loop only prints "Hi" ONE time. Most likely cause?',
          choices: [
            "range(5) is broken",
            "You need two for loops",
            "The print line isn't indented under the for loop",
          ],
          correctIndex: 2,
          explanation: "If print isn't indented, it's not part of the loop body and only runs once, after the loop finishes (or before it, depending on placement).",
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Count your output lines",
        body: `A fast way to check a loop is correct: count how many lines of output you expect from \`range(n)\`, then count how many lines you actually got. If they don't match, something is wrong with either your \`range()\` value or your indentation.`,
        bullets: [
          "range(n) should always give you exactly n printed lines (if there's one print per turn).",
          "Mismatched counts are your first clue something is mis-indented.",
          "When in doubt, print the counter i to see exactly what the loop is doing.",
        ],
      },
      {
        id: "loop-counter",
        kicker: "Level up",
        title: "The loop counter `i` is your friend",
        body: `Every \`for i in range(n):\` loop gives you a counter variable \`i\` that counts 0, 1, 2, … up to n−1. You don't have to use it — but when you do, your output can change each turn instead of printing the same line every time.\n\nTry printing \`i\` inside the loop to see exactly which turn you're on. This one trick makes debugging loops dramatically easier.`,
        code: `for i in range(3):\n    print("Turn", i, "- Hello!")`,
        codeCaption: "Using i to label each turn",
        output: `Turn 0 - Hello!\nTurn 1 - Hello!\nTurn 2 - Hello!`,
        checkIn: {
          prompt: "In `for i in range(5):`, what values does i take?",
          choices: ["1 through 5", "0 through 4", "5 through 10"],
          correctIndex: 1,
          explanation: "range(5) produces 0, 1, 2, 3, 4 — five numbers starting at zero.",
        },
      },
      {
        id: "worked-example-2",
        kicker: "Worked example",
        title: "A loop that counts down",
        body: `Loops aren't only for repeating the same message — you can use \`i\` to make each turn different. Here's a simple countdown: the loop runs 3 times, but each line shows a different number.\n\nNotice the pattern: set up \`range()\`, indent what repeats, and optionally use \`i\` to customize each turn's output.`,
        code: `for i in range(3, 0, -1):\n    print("Launch in", i)\nprint("Go!")`,
        codeCaption: "Each turn prints a different value — then one line after the loop",
        output: `Launch in 3\nLaunch in 2\nLaunch in 1\nGo!`,
        callout: {
          label: "Preview",
          text: "You don't need to memorize range(3, 0, -1) yet — the key idea is that i can change what each turn prints.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Reflect",
        title: "Think it through",
        body: `*Think of something you do every day that's really a loop — brushing each tooth, doing sets of an exercise, watering each plant on a shelf. How many "times" does your daily loop run, and what's the one action that repeats?*`,
      },
      {
        id: "mini-case",
        kicker: "Real world",
        title: "Feeds and playlists are loops",
        body: `When an app loads your social media feed, it's running a loop: for each post in your feed, show it on screen. When a music app plays a playlist, it's running a loop: for each song in the list, play it.\n\nThe loop you built today — repeat this action *n* times — is the exact same shape, just with real posts or songs instead of the word "Hello."`,
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you build",
        body: `Let's confirm the loop pattern is locked in.`,
        checkIn: {
          prompt: "You want a message to print exactly 7 times. What should you write?",
          choices: ["for i in range(6):", "for i in range(8):", "for i in range(7):"],
          correctIndex: 2,
          explanation: "range(7) produces 0 through 6 — that's 7 numbers, so the loop body runs exactly 7 times.",
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
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in range()",
      focusCommand: "range()",
      commandExplain:
        "range(n) controls how many times the loop runs. Fill in the blank so the message prints 5 times.",
      goal: "Replace ____ with 5 so the loop repeats five times.",
      starterCode: `# Fill in the blank 👇
for i in range(____):
    print("KanamBot: Hello!")
`,
      solutionCode: `for i in range(5):
    print("KanamBot: Hello!")
`,
      hint: "range(5) means the indented print runs 5 times (0 through 4).",
      successMessage: "You set the repeat count — the loop ran 5 times!",
      failureMessage: "Use for i in range(5): with an indented print(...) — expect 5 lines.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/.test(code) &&
        INDENTED_PRINT_IN_FOR.test(code) &&
        run.stdout.length === 5,
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the loop",
      focusCommand: "for + range",
      commandExplain: "Scrambled loop lines. Put them in order so Hi prints 3 times.",
      goal: "Reorder, then Run & check.",
      starterCode: "",
      solutionCode: `for i in range(3):
    print("Hi")`,
      parsonsLines: ["for i in range(3):", '    print("Hi")'],
      hint: "for line with colon first, then an indented print.",
      successMessage: "Loop order is correct.",
      failureMessage: "Need for i in range(3): with an indented print underneath.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /\brange\s*\(\s*3\s*\)/.test(code) &&
        FOR_WITH_COLON.test(code) &&
        INDENTED_PRINT_IN_FOR.test(code) &&
        run.stdout.length === 3,
    },
    {
      id: "ex-debug-loop",
      kind: "debug",
      title: "Exercise 3 — Debug the loop",
      focusCommand: "indentation",
      commandExplain: "This loop should print 5 times, but the print isn't inside the loop.",
      goal: "Fix indentation so the message repeats 5 times.",
      starterCode: `for i in range(5):
print("KanamBot: ready!")
`,
      solutionCode: `for i in range(5):
    print("KanamBot: ready!")
`,
      debugHint: "indentation",
      hint: "Lines inside the loop must be indented under the for.",
      successMessage: "Indentation fixed — the loop body runs each time.",
      failureMessage: "Indent print(...) under the for loop.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/.test(code) &&
        INDENTED_PRINT_IN_FOR.test(code) &&
        run.stdout.length === 5,
    },
    {
      id: "ex-predict-loop",
      kind: "predict",
      title: "Exercise 4 — Predict the loop",
      focusCommand: "for + range",
      commandExplain: "Read this finished loop. Predict how many lines it prints and what they say.",
      goal: "Type your prediction, then Run & check.",
      starterCode: `for i in range(3):
    print("Hi")
`,
      solutionCode: `for i in range(3):
    print("Hi")
`,
      codeReadOnly: true,
      predictionPrompt: 'What prints? (e.g. "Hi" three times)',
      acceptedPredictions: [
        "Hi\nHi\nHi",
        "Hi Hi Hi",
        "Hi three times",
        "3 times Hi",
        "hi hi hi",
      ],
      hint: "range(3) means the indented print runs 3 times.",
      successMessage: "Nailed it — you predicted the loop correctly.",
      failureMessage: "Count how many times range(3) repeats the print.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /\brange\s*\(\s*3\s*\)/.test(code) &&
        run.stdout.length === 3 &&
        run.stdout.every((line) => line.trim() === "Hi"),
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build a loop",
      focusCommand: "from scratch",
      commandExplain: "Write a for loop that prints KanamBot: ready! exactly 5 times.",
      goal: "Write the full loop yourself.",
      starterCode: `# Repeat a bot message 5 times\n`,
      solutionCode: `for i in range(5):
    print("KanamBot: ready!")
`,
      hint: "for i in range(5): with an indented print(...)",
      successMessage: "You built a working loop from scratch.",
      failureMessage: "Need for … range(5): and an indented print that runs 5 times.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/.test(code) &&
        INDENTED_PRINT_IN_FOR.test(code) &&
        run.stdout.length === 5,
    },
  ],
};
