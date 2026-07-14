import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function getDefFn(code: string): string | undefined {
  return code.match(/\bdef\s+([A-Za-z_]\w*)\s*\(\s*\)\s*:/)?.[1];
}

function fnCallCount(code: string, fn: string): number {
  return (code.match(new RegExp(`^[ \\t]*${fn}\\s*\\(\\s*\\)\\s*$`, "gm")) ?? []).length;
}

function noRunError(run: MiniRunResult): boolean {
  return !run.error;
}

function hasIndentedPrintInDef(code: string, fn: string): boolean {
  return new RegExp(
    `\\bdef\\s+${fn}\\s*\\(\\s*\\)\\s*:[^\\n]*\\n[ \\t]+print\\(`
  ).test(code);
}

export const lesson10: PythonLessonConfig = {
  id: "lesson-10",
  title: "10. Teaching the Bot Skills (Functions)",
  goal: "Use functions to package a skill and reuse it without rewriting code.",
  xpReward: 550,
  badge: "Skill Builder",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  prevHref: "/learn/9",
  nextHref: "/learn/11",
  instructorScript:
    "**Coach's note**\nRead this first — it explains the goal + how to think about the code.\n**Coach's note**:\nThink about a video game controller.\nWhen you press the jump button, the character jumps.\nYou don't rebuild the jump button every time — it already exists.\nThat button is like a function.\nA function is a named action in your program.\nInstead of rewriting the same instructions over and over, you:\n- teach the computer the action once\n- use it whenever you want\n\nHere's what that looks like in code:\n```\ndef greet():\n    print(\"Hi! Nice to meet you!\")\n```\n\nThis creates a skill, but it doesn't run yet.\nTo use the skill, you call it:\n```\ngreet()\n```\n\nNow the bot speaks.\nIf you call it again, the bot speaks again — without rewriting the message.\nThat's how real AI systems reuse behavior.\n**Mini goal**:\nCreate a function that makes your bot speak, then use it more than once.\nRead the steps, follow them in order, then press [[Run]].",
  commandReference: [
    {
      command: "def greet():",
      summary: "Defines a reusable skill. The colon (:) starts the function body.",
      example: "def greet():",
    },
    {
      command: "    print(...)",
      summary: "Indented lines belong inside the function — they run when you call it.",
      example: '    print("Hi! Nice to meet you!")',
    },
    {
      command: "greet()",
      summary: "Calls (runs) the function. Define once, call as many times as you want.",
      example: "greet()",
    },
  ],
  kidExplain: [
    {
      title: "What is a Function?",
      text:
        "A function is a reusable action. You define it once, then call it whenever you need it.",
    },
    {
      title: "Why functions matter for AI",
      text:
        "Functions help AI behavior stay organized and predictable. Humans define the skill and decide when it runs.",
    },
  ],
  steps: [
    "Define a function that prints a message from your bot.",
    "Give the function a clear name.",
    "Call the function so it runs.",
    "Call the function again without rewriting the code.",
    "Change the message inside the function and run it again.",
    "Common mistake: If nothing happens, you may have defined the function but forgot to call it.",
  ],
  cfu: [
    {
      question: "What is a function in your own words?",
      answer: "A named set of instructions you can run (call) whenever you want.",
    },
    {
      question: "Why is a function better than copying code?",
      answer:
        "Because you write the behavior once and reuse it. If you need to change it, you change it in one place.",
    },
    {
      question: "What happens if you define a function but never call it?",
      answer: "Nothing happens — defining creates the skill, calling runs it.",
    },
  ],
  tryThis: [
    "Create a second function with a different message.",
    "Call the same function three times in a row.",
    "Challenge: Explain how functions help humans control AI behavior.",
  ],
  aiSafetyMoment:
    "AI safety: Functions help prevent mistakes. If behavior is copied everywhere, errors are harder to fix. Responsible AI uses clear, reusable actions with human-controlled execution.",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `So far you've written instructions that run once, top to bottom. Today you'll learn to package instructions into a **reusable skill** you can trigger again and again — the single most important habit in all of coding.\n\nHere's your roadmap for this lesson:\n\n• **Functions** — how to bundle instructions into a named skill.\n• \`def\` — how to *define* (create) a skill.\n• Calling — how to *run* that skill, as many times as you want.\n• Why reusing a skill beats copying and pasting code.\n\nThese are the same building blocks behind every button and feature in the apps you use.`,
        image: "/images/lessons/py-10-function.png",
        imageAlt: "A machine labeled with a button that performs an action when pressed",
        callout: {
          label: "Why it matters",
          text: "Every button in your favorite app — Like, Share, Send, Jump — runs a packaged skill. Tap it a hundred times and it works the same way every time, because the action was written once as a function.",
        },
      },
      {
        id: "hook-story",
        kicker: "Think about it",
        title: "The jump button never gets rebuilt",
        body: `Think about a video game controller. Every time you press the jump button, your character jumps — the exact same way, every single time. The game's programmers didn't write brand-new jump code each time you press the button; they wrote it **once** and the button *calls* it whenever needed.\n\nThat's exactly what you're about to build: a named skill you write once and trigger on demand.`,
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `New vocabulary for this lesson.`,
        bullets: [
          "**Function** — a named, reusable block of instructions.",
          "**def** — the keyword that *defines* (creates) a function.",
          "**Call** — running a function by writing its name followed by `()`.",
          "**DRY** — \"Don't Repeat Yourself,\" the principle that functions help you follow.",
        ],
      },
      {
        id: "concept-1",
        kicker: "Building block #1",
        title: "def creates the skill",
        body: `\`def\` is short for **define** — it's how you create a new skill. You give the function a clear name, end the line with a colon \`:\`, and then **indent** the lines that belong inside it.\n\nIndentation is how Python knows which lines are *part of* the function. Everything indented under \`def greet():\` is the skill's instructions.\n\nDefining a function does **not** run it — think of it like writing down a recipe. The cooking happens later.`,
        code: `def greet():\n    print("Hi! Nice to meet you!")`,
        codeCaption: "Define a skill called greet",
        callout: {
          label: "Watch out",
          text: "Forgetting the colon `:` at the end of `def greet():`, or forgetting to indent the lines inside, are the two most common errors when defining a function.",
        },
        checkIn: {
          prompt: "After writing `def greet():` with an indented print inside, but never calling `greet()`, what happens when you run the program?",
          choices: ["Nothing prints", "The greeting prints once", "Python raises an error"],
          correctIndex: 0,
          explanation: "Defining a function only teaches it to Python. Nothing runs until the function is called.",
        },
      },
      {
        id: "concept-2",
        kicker: "Building block #2",
        title: "Call the skill to run it",
        body: `To actually *run* your skill, you **call** it: write its name followed by parentheses, like \`greet()\`. That's the moment Python jumps into the function and runs every indented line inside.\n\nThe magic of functions is reuse: once defined, you can call \`greet()\` as many times as you want, and you'll get the same behavior each time — no copy-pasting.`,
        code: `def greet():\n    print("Hi! Nice to meet you!")\n\ngreet()\ngreet()`,
        codeCaption: "Define once, call twice",
        output: `Hi! Nice to meet you!\nHi! Nice to meet you!`,
        bullets: [
          "`def name():` defines the skill (with indented code).",
          "`name()` calls (runs) the skill.",
          "If nothing prints, you probably **defined** it but forgot to **call** it.",
        ],
        callout: {
          label: "Common misconception",
          text: "If you run your code and *nothing* prints, you most likely defined the function but forgot to call it. Add a line like `greet()` with no indentation.",
        },
        checkIn: {
          prompt: "If `greet()` is called three times in a row, how many times does the print inside run?",
          choices: ["Once", "Three times", "Twice"],
          correctIndex: 1,
          explanation: "Each call to greet() runs the function's body once — three calls means the print runs three times.",
        },
      },
      {
        id: "concept-3",
        kicker: "Building block #3",
        title: "Why functions beat copy-paste",
        body: `Why not just copy-paste the same \`print\` lines wherever you need them? Because copies cause problems.\n\nImagine you copied a greeting into 20 places, then decided to change the wording. You'd have to find and fix all 20 — and you'd probably miss a few. With a function, you change the message in **one place** and every call updates automatically.\n\nProgrammers have a motto for this: **DRY** — *Don't Repeat Yourself*. Functions are the main tool for keeping code DRY, organized, and easy to fix.`,
        callout: {
          label: "Pro tip",
          text: "Give functions clear, action-style names like `greet`, `save_score`, or `show_menu`. A good name tells you what the skill does without reading the code inside.",
        },
        checkIn: {
          prompt: "You copy-pasted the same greeting print into 10 places in your code, then need to change the wording. What's the downside vs. using a function?",
          choices: ["No downside — copies are just as easy to update", "Copies run faster than functions", "You'd have to find and edit all 10 copies, and might miss some"],
          correctIndex: 2,
          explanation: "With copy-pasted code, every copy must be updated by hand. A function centralizes the logic so you only change it once.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Build and reuse a skill, step by step",
        body: `Let's build and reuse a skill from scratch.\n\n**Step 1 — Define the skill.** Use \`def\` to create \`greet\`, with an indented \`print\` inside that holds the message.\n\n**Step 2 — Call it.** Write \`greet()\` to run the skill once.\n\n**Step 3 — Reuse it.** Call \`greet()\` again. Same definition, second run — no copied code.`,
        code: `# Step 1: define the skill once\ndef greet():\n    print("Hi! Nice to meet you!")\n\n# Steps 2 & 3: run it as many times as you like\ngreet()\ngreet()`,
        codeCaption: "The full program, with comments explaining each step",
        output: `Hi! Nice to meet you!\nHi! Nice to meet you!`,
        callout: {
          label: "Pro tip",
          text: "Lines starting with `#` are comments — notes for humans that Python ignores. They're great for labeling what each part of your function does.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "A function isn't a button in itself",
        body: `Think about a game controller again. You don't *rebuild* the jump button every time you want to jump — it already exists, ready to use. A **function** is that button: a named action you teach the computer **once**, then trigger whenever you want by calling its name.\n\nBut a common misconception is thinking the function *is* the action happening. It's not — it's the **instructions for** the action. The action only happens the moment you call it.`,
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Predict the output",
        body: `Trace this program carefully. Notice how many times \`cheer\` is defined versus how many times it's called.`,
        code: `def cheer():\n    print("Go team!")\n\ncheer()\ncheer()\ncheer()`,
        codeCaption: "How many lines print, and what do they say?",
        checkIn: {
          prompt: "What does this program print?",
          choices: ["\"Go team!\" three times, one per line", "\"Go team!\" once", "Nothing, because cheer() was never defined"],
          correctIndex: 0,
          explanation: "cheer is defined once, then called three times — each call runs the print, producing three lines of \"Go team!\".",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Functions can take parameters",
        body: `A function becomes even more powerful when it can accept **input**. A parameter is a placeholder name inside the parentheses that lets you pass in different information each time you call it: \`def greet(name):\` lets you call \`greet("Alex")\` or \`greet("Sam")\` and get a personalized message each time — one function, many results.`,
        code: `def greet(name):\n    print("Hi, " + name + "!")\n\ngreet("Alex")\ngreet("Sam")`,
        codeCaption: "One function, two different greetings",
        output: `Hi, Alex!\nHi, Sam!`,
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "Copy-paste vs. a function",
        body: `Compare printing the same greeting three times by copy-pasting versus defining it once as a function. The function version is shorter, and if you ever need to change the message, you only edit it in one place.`,
        code: `# Copy-paste — repeats the same line three times\nprint("Hi! Nice to meet you!")\nprint("Hi! Nice to meet you!")\nprint("Hi! Nice to meet you!")\n\n# Function — write once, call three times\ndef greet():\n    print("Hi! Nice to meet you!")\ngreet()\ngreet()\ngreet()`,
        codeCaption: "Same output, but the function version is easier to maintain",
      },
      {
        id: "debug-habit",
        kicker: "Debugging habit",
        title: "If nothing prints, check for a missing call",
        body: `The single most common function bug for beginners: writing a perfectly good \`def\`, but forgetting to actually call it. If your program runs with no errors but also no output, scroll up and check — did you call the function by name with \`()\`?`,
        checkIn: {
          prompt: "Your program runs with no errors, but nothing prints. You have a `def greet():` with a print inside. What's the most likely cause?",
          choices: [
            "Python is broken",
            "You forgot to call greet() after defining it",
            "The print statement is wrong",
          ],
          correctIndex: 1,
          explanation: "Defining a function without calling it produces no output at all — this is the most common function bug for beginners.",
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Name functions after the action they perform",
        body: `Good function names read like verbs: \`greet\`, \`save_score\`, \`show_menu\`, \`check_answer\`. A clear name tells anyone reading your code exactly what will happen when it's called — without needing to read the code inside.`,
        bullets: [
          "Name functions with action verbs that describe what they do.",
          "Define once, call as many times as needed — never copy-paste the same logic.",
          "If nothing prints, check whether you forgot to call the function.",
        ],
      },
      {
        id: "standards-connect",
        kicker: "Why this counts",
        title: "This lesson meets a real CS standard",
        body: `**CSTA 3A-AP-17**: *Decompose problems into smaller components through systematic analysis, using constructs such as procedures, modules, and/or objects.*\n\nA function is exactly this kind of "procedure" — a smaller component you can build, test, and reuse independently instead of writing one giant block of code.`,
        callout: {
          label: "Standard",
          text: "CSTA 2017, Algorithms & Programming, Level 3A (grades 9–10): 3A-AP-17 — decompose problems using procedures.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Reflect",
        title: "Think it through",
        body: `*Think of an action you repeat often in daily life — brushing your teeth, tying your shoes. If you had to write brand-new instructions every single time instead of relying on a habit you've already learned, how much slower would your day be? That's the problem functions solve for code.*`,
      },
      {
        id: "mini-case",
        kicker: "Real world",
        title: "Every app button is a function call",
        body: `When you tap "Like" on a post, the app calls a function — maybe named something like \`like_post()\` — that was written once by a developer and gets called every single time any user anywhere taps that button. One definition, millions of calls.`,
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you build",
        body: `Let's confirm the function pattern is locked in.`,
        checkIn: {
          prompt: "What are the two separate steps every function needs?",
          choices: ["Naming it, then printing it", "Calling it, then defining it", "Defining it with `def`, then calling it with `name()`"],
          correctIndex: 2,
          explanation: "A function must first be defined with def (teaching the skill) and then called with name() (running the skill) — definition always comes before the call.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned the two halves of every function: **\`def\`** to define a skill, and **\`name()\`** to call (run) it — over and over without rewriting a thing.\n\nIn the exercises you'll define a function that makes your bot speak, then call it more than once — the same way real AI systems reuse behavior.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in the skill",
      focusCommand: "def + greet()",
      commandExplain:
        "Finish the message inside the function, then call greet() twice so the bot speaks twice.",
      goal: "Fill the blanks so greet prints a message and runs twice.",
      starterCode: `# Fill in the blanks 👇
def greet():
    print("Hi! ____")

greet()
____
`,
      hint: 'Finish the message (e.g. Nice to meet you!), then add a second greet() call.',
      successMessage: "Skill defined and reused — the bot spoke twice!",
      failureMessage: "Need def greet(): with an indented print, plus greet() called at least twice.",
      solutionCode: `def greet():
    print("Hi! Nice to meet you!")

greet()
greet()
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        const fn = getDefFn(code);
        if (!fn) return false;
        return hasIndentedPrintInDef(code, fn) && fnCallCount(code, fn) >= 2 && run.stdout.length >= 2;
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the skill",
      focusCommand: "def + call",
      commandExplain: "These lines define and call a function — but they're scrambled. Put them in order.",
      goal: "Reorder so greet is defined, then called twice.",
      starterCode: "",
      parsonsLines: [
        "def greet():",
        '    print("Hi! Nice to meet you!")',
        "greet()",
        "greet()",
      ],
      hint: "def first, indented print next, then two greet() calls with no indent.",
      successMessage: "Order is right — define once, call twice.",
      failureMessage: "Need def greet():, an indented print, and greet() twice.",
      solutionCode: `def greet():
    print("Hi! Nice to meet you!")
greet()
greet()`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        const fn = getDefFn(code);
        if (!fn) return false;
        return hasIndentedPrintInDef(code, fn) && fnCallCount(code, fn) >= 2 && run.stdout.length >= 2;
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Debug the skill",
      focusCommand: "indentation",
      commandExplain:
        "This function should greet when called, but the print isn't inside the function.",
      goal: "Fix indentation so print belongs inside greet, then call it.",
      starterCode: `def greet():
print("Hi! Nice to meet you!")

greet()
`,
      debugHint: "indentation",
      hint: "Indent the print line under def greet(): with 4 spaces.",
      successMessage: "Fixed — the print now runs when you call greet().",
      failureMessage: "Indent print(...) under def greet(): and call greet() at least once.",
      solutionCode: `def greet():
    print("Hi! Nice to meet you!")

greet()
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        const fn = getDefFn(code);
        if (!fn) return false;
        return hasIndentedPrintInDef(code, fn) && fnCallCount(code, fn) >= 1 && run.stdout.length >= 1;
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the calls",
      focusCommand: "trace greet()",
      commandExplain: "Read this finished program. Predict exactly what prints when greet() runs twice.",
      goal: "Type your prediction, then Run & check.",
      starterCode: `def greet():
    print("Hi!")

greet()
greet()
`,
      codeReadOnly: true,
      predictionPrompt: "What exact output prints? (two lines)",
      acceptedPredictions: ["Hi!\nHi!", "Hi! Hi!", "Hi!\nHi!\n", "hi!\nhi!"],
      hint: "Each greet() call runs the print once — two calls means two lines.",
      successMessage: "Nailed it — you predicted both calls.",
      failureMessage: "Count how many times greet() is called.",
      solutionCode: `def greet():
    print("Hi!")

greet()
greet()
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        return (
          run.stdout.length === 2 && run.stdout.every((line) => line.trim() === "Hi!")
        );
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build a skill",
      focusCommand: "from scratch",
      commandExplain:
        "Write a function with no parameters that prints a bot message, then call it at least twice.",
      goal: "Define any no-parameter function with print inside and call it twice.",
      starterCode: `# Define a skill, then call it twice\n`,
      hint: "def name(): with an indented print(...), then name() on two separate lines.",
      successMessage: "You packaged and reused a skill from scratch.",
      failureMessage:
        "Need def name(): with indented print, and call the function at least twice.",
      solutionCode: `def greet():
    print("Hi! Nice to meet you!")

greet()
greet()
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        const fn = getDefFn(code);
        if (!fn) return false;
        return hasIndentedPrintInDef(code, fn) && fnCallCount(code, fn) >= 2 && run.stdout.length >= 2;
      },
    },
  ],
};
