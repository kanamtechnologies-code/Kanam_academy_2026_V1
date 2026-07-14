import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function hasNameVariable(code: string) {
  return /\bname\s*=\s*["'][^"']+["']/.test(code);
}

/**
 * Guided demo — thorough instructional slice of Lesson 1.
 * Audience: middle/high school learners + parents/educators previewing.
 * Pedagogy: objective → mental model → worked example → practice.
 */
export const demoLesson: PythonLessonConfig = {
  id: "lesson-1",
  title: "Quickstart: Meet Your AI Helper",
  goal: "By the end of this demo you can store a name in a variable, print a full sentence with +, and fix a common beginner bug — the same first skills students use in Week 1.",
  xpReward: 50,
  badge: "The Awakener",
  dashboardHref: "/welcome",
  nextHref: "/demo/complete",
  nextCtaLabel: "See your results",
  coachNoteGateSeconds: 5,
  guidedTour: true,
  instructorScript: `**Coach's note — read this first**

Welcome to Kanam Academy.

**Who this is for**
Students learning AI + Python for the first time — and parents or educators who want to see the real classroom canvas.

**Learning goal (today)**
Teach a computer to introduce itself in one clear sentence.

**Big idea (also a core AI idea)**
Computers and AI systems do **not** guess. They follow your instructions exactly, in order. If the output is wrong, the instructions need to be clearer — that is debugging.

**What you will build**
1. A **variable** that stores a name (memory)
2. A **print()** line that shows a full greeting (output)
3. The **+** operator that joins text into one sentence

**Target program**
name = "Alex"
print("Hello! I am " + name)

**Success looks like**
The console prints one line that includes the name, with a space after "am".

Click **Got it, let's go!** when you're ready to learn, then practice.`,
  kidExplain: [
    {
      title: "Learning objective",
      text: "Store text in a **variable**, show it with **print()**, and join pieces with **+** so your helper says a full sentence.",
    },
    {
      title: "Mental model: labeled boxes",
      text: 'A **variable** is a labeled box. In `name = "Alex"`, the label is `name` and the value inside is `"Alex"`. The `=` means **assign** (put this value in the box) — not “equals” like in math.',
    },
    {
      title: "Strings need quotes",
      text: 'Quotes tell Python “this is text.” Programmers call text a **string**. Without quotes, Python thinks you mean another variable name and gets confused.',
    },
    {
      title: "print() is the voice",
      text: "A variable stays invisible until you show it. `print(...)` is how the program speaks to the screen. It must be lowercase `print` — `Print` is a different word to Python.",
    },
    {
      title: "Glue with + (and put spaces yourself)",
      text: '`"Hello! I am " + name` tapes two strips of text together. Python will **not** add spaces for you. The space after `am` must live inside the quotes.',
    },
    {
      title: "AI connection",
      text: "Chatbots and game NPCs also store information and follow rules. You’re learning the same building blocks — just smaller and clearer.",
    },
  ],
  steps: [
    "Read the lesson sections (objective → idea → building blocks → worked example).",
    'Practice 1: fill in `name = "____"` and keep the print line.',
    "Practice 2: reorder the two lines so memory comes before output.",
    "Practice 3: fix the capitalization bug (`Print` → `print`).",
    "Read the console after every Run & check — that feedback is part of learning.",
  ],
  cfu: [
    {
      question: 'Why does the space inside "Hello! I am " matter?',
      answer:
        'Python is literal. Without the space after "am", words mash together: "Hello! I amAlex". Good instructions include the spaces you want in the output.',
    },
    {
      question: 'What is the difference between name and "name"?',
      answer:
        "`name` (no quotes) is the labeled box (a variable). \"name\" (with quotes) is just the letters n-a-m-e as text. They are completely different to Python.",
    },
    {
      question: "If the output is wrong, did the computer 'mess up'?",
      answer:
        "Almost never. The computer did exactly what it was told. Debugging means rereading your instructions and making them clearer — the same habit used in real AI and software work.",
    },
  ],
  tryThis: [
    "Change the greeting words — keep your name in the sentence.",
    'Use your real name: name = "YourName"',
    'Stretch: add mood = "curious" and print a longer sentence with +.',
  ],
  aiSafetyMoment:
    "Responsible AI: you are in charge of the instructions. Clear, honest code keeps the helper under your control. If something looks wrong, fix the instructions — don’t blame the machine.",
  commandReference: [
    {
      command: 'name = "..."',
      summary:
        "Creates a variable — a labeled box that stores text. Quotes mark a string (text value).",
      example: 'name = "Alex"',
    },
    {
      command: "print(...)",
      summary:
        "Displays a message in the console. Must be lowercase print — capitalization matters.",
      example: 'print("Hello!")',
    },
    {
      command: "+",
      summary:
        "Joins (concatenates) strings. Put any spaces you want inside the quotes yourself.",
      example: '"Hello! I am " + name',
    },
    {
      command: '" " (quotes)',
      summary: "Wrap text so Python treats it as a string, not a variable name.",
      example: '"Alex"',
    },
  ],
  exercises: [
    {
      id: "demo-ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in the name",
      focusCommand: "name =",
      commandExplain:
        "First you give the program a memory. Fill the blank so the box labeled name holds a real name in quotes. The print line is already written — it will use whatever you store.",
      goal: "Replace ____ with a name (keep the quotes), like Alex. Keep the print line as-is.",
      starterCode: `# Step 1: store a name in a labeled box (variable)
name = "____"

# Step 2: show a full sentence using that name
print("Hello! I am " + name)
`,
      solutionCode: `name = "Alex"
print("Hello! I am " + name)
`,
      hint: 'Put letters between the quotes, like name = "Alex". Leave the space after "am " alone — that space is intentional.',
      successMessage:
        "Excellent — you gave the program memory and it spoke a full sentence. That is how helpers introduce themselves.",
      failureMessage:
        'Need name = "YourName" (with quotes) and print("Hello! I am " + name) with a space after "am ".',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!/\bprint\s*\(/.test(code) || !code.includes("+")) return false;
        if (!/["']Hello! I am\s+["']/.test(code)) return false;
        return /Hello! I am\s+\S/.test(run.stdout.join("\n"));
      },
    },
    {
      id: "demo-ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the intro",
      focusCommand: "order of instructions",
      commandExplain:
        "Programs run top to bottom. If you print before you store the name, the box is empty (or missing). Drag the lines into the order a careful instructor would write them.",
      goal: "Put memory first, then output. Press Run & check.",
      starterCode: "",
      solutionCode: `name = "Alex"
print("Hello! I am " + name)`,
      parsonsLines: ['name = "Alex"', 'print("Hello! I am " + name)'],
      hint: "Ask: what must exist before print can use it? Create the variable first.",
      successMessage:
        "Strong sequencing — you stored information before you used it. That habit scales to every longer program.",
      failureMessage: "Variable first (memory), then print (output).",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!/\bprint\s*\(/.test(code) || !code.includes("+")) return false;
        return /Hello! I am\s+\S/.test(run.stdout.join("\n"));
      },
    },
    {
      id: "demo-ex-debug",
      kind: "debug",
      title: "Exercise 3 — Fix the greeting bug",
      focusCommand: "print() capitalization",
      commandExplain:
        "This almost works — but Python is picky about spelling. Professionals debug by reading the error, finding the exact mismatch, and fixing one small thing. Your job: make the greeting print correctly for Alex.",
      goal: "Repair the bug so the console shows Hello! I am Alex",
      starterCode: `# Almost right — find the capitalization mistake
name = "Alex"
Print("Hello! I am " + name)
`,
      solutionCode: `name = "Alex"
print("Hello! I am " + name)
`,
      debugHint: "capitalization",
      hint: "Python commands are lowercase. Compare Print with print carefully.",
      successMessage:
        "Bug fixed. You practiced a real skill: noticing that Print and print are not the same to a computer.",
      failureMessage: "Change Print(...) to lowercase print(...).",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!/\bprint\s*\(/.test(code)) return false;
        return /Hello! I am\s+Alex/.test(run.stdout.join("\n"));
      },
    },
  ],
  lessonModule: {
    durationLabel: "~5–7 min guided demo",
    sections: [
      {
        id: "objectives",
        kicker: "Start here",
        title: "What you will learn in this demo",
        body: `This is the **same lesson canvas** students use in Kanam’s AI + Python track — not a toy slideshow.\n\n**By the end you will be able to:**\n\n• Explain what a **variable** is (a labeled place to store information)\n• Use **print()** to show a message on the screen\n• Join text with **+** so a helper can say a full sentence\n• Fix one common beginner bug (capitalization)\n\nYou’ll learn first, then practice in three short exercise types used in class: **fill**, **reorder**, and **debug**.`,
        image: "/images/lessons/py-1-hello.png",
        imageAlt: "A friendly robot waving — your first AI helper",
        callout: {
          label: "Who this is for",
          text: "Students new to coding, plus parents and educators evaluating the product. Progress saves on this device — no account required for the demo.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "Computers (and AI) follow instructions exactly",
        body: `Here’s the most important idea in coding — and in AI: **computers do not guess.** They follow your instructions *exactly*, in the order you write them.\n\nThink of giving directions to an extremely literal friend. “Make a sandwich” is too vague. “Take two slices of bread, spread peanut butter on one…” works. A computer is that friend, times a million: precise, fast, and unable to fill in blanks for you.\n\nThat is *good news*. When something goes wrong, the computer didn’t randomly break — your **instructions** need to be clearer. Debugging is rereading the recipe.`,
        callout: {
          label: "Common misconception",
          text: 'Beginners often think “the computer messed up.” Almost always, the code did exactly what it was told — it just wasn’t told quite what we meant.',
        },
      },
      {
        id: "variables",
        kicker: "Building block #1",
        title: "A variable is a labeled box",
        body: `A **variable** stores a piece of information so your program can remember it and use it later.\n\nPicture lockers: each has a **label** (name) and something **inside** (value). In the line below, the label is \`name\` and the value is the text \`"Alex"\`.\n\nThe \`=\` sign trips people up. In Python it does **not** mean “equals” like in math. It means **assign**: put the value on the right into the box on the left.`,
        code: `name = "Alex"`,
        codeCaption: "Create a variable called name",
        bullets: [
          '**Quotes** `" "` tell Python *this is text* — called a **string**.',
          "Without quotes, Python thinks you’re naming another variable.",
          "Good names use letters, numbers, and underscores — no spaces (`my_name`, not `my name`).",
        ],
        callout: {
          label: "Check yourself",
          text: '`name` (no quotes) is the box. `"name"` (with quotes) is just the letters n-a-m-e. Totally different to Python.',
        },
      },
      {
        id: "print",
        kicker: "Building block #2",
        title: "print() puts words on the screen",
        body: `A variable stores information, but it stays *invisible* until you choose to show it. \`print(...)\` is how your program *says something* to the screen.\n\nWhen you put a variable inside \`print()\`, Python opens the box and shows what’s inside — so \`print(name)\` displays \`Alex\`, not the word “name”.\n\nPython is picky about spelling: it must be lowercase \`print\`, never \`Print\` or \`PRINT\`. To a computer those are three different words.`,
        code: `name = "Alex"\nprint(name)`,
        codeCaption: "Open the box and show what’s inside",
        output: `Alex`,
        callout: {
          label: "Watch out",
          text: '`print(name)` shows the value (`Alex`). `print("name")` would show the word name. Quotes change the meaning.',
        },
      },
      {
        id: "glue",
        kicker: "Building block #3",
        title: "Glue text together with +",
        body: `Right now your helper can only say a name. To say a full sentence, join pieces of text with \`+\`. Programmers call this **concatenation** — gluing strings end to end.\n\nImagine taping two strips of paper: \`"Hello! I am "\` + \`"Alex"\` becomes \`Hello! I am Alex\`.\n\nThe #1 beginner trap: Python will **not** add spaces for you. The space between “am” and the name must live *inside* the quotes.`,
        code: `name = "Alex"\nprint("Hello! I am " + name)`,
        codeCaption: "Join a greeting and the name",
        output: `Hello! I am Alex`,
        callout: {
          label: "Common mistake",
          text: 'If you write `"Hello! I am"` with no space after `am`, you get `Hello! I amAlex`. Put the space inside the quotes: `"Hello! I am "`.',
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build it line by line (then practice)",
        body: `Professionals don’t write perfect programs on the first try — they build in small steps and check the result.\n\n**Step 1 — Store the name.** Make a box called \`name\`. Nothing prints yet; you’re just remembering.\n\n**Step 2 — Glue the sentence.** Inside \`print()\`, join \`"Hello! I am "\` with \`name\` using \`+\`.\n\n**Step 3 — Run it.** Python reads top to bottom: fill the box, then build and show the sentence.`,
        code: `# Step 1: remember the name\nname = "Alex"\n\n# Step 2 & 3: build the sentence and show it\nprint("Hello! I am " + name)`,
        codeCaption: "Finished program with comments",
        output: `Hello! I am Alex`,
        callout: {
          label: "How class works",
          text: "Next you’ll practice three ways: fill a blank, reorder lines, and fix a bug — the same exercise kinds used in Week 1. Tap Start the exercises when you’re ready.",
        },
      },
    ],
  },
};
