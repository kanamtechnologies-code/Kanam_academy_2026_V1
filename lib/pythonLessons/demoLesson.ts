import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function hasNameVariable(code: string) {
  return /\bname\s*=\s*["'][^"']+["']/.test(code);
}

/**
 * Guided demo — a shorter, faithful slice of Lesson 1.
 * Same pedagogy and exercise kinds; sized for a product walkthrough.
 */
export const demoLesson: PythonLessonConfig = {
  id: "lesson-1",
  title: "Quickstart: Meet Your AI Helper",
  goal: "By the end of this demo you can fill in a blank, reorder lines, fix a common beginner bug, and customize the greeting — the same first skills students use in Week 1.",
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
Students learning AI + Python for the first time — and parents or educators who want to see the real classroom screen.

**Learning goal (today)**
Teach a computer to introduce itself in one clear sentence.

**Big idea**
Computers and AI helpers do **not** guess. They follow your instructions exactly, in order. If the output is wrong, the instructions need to be clearer — that is what debugging means.

**What you will build**
1. A **variable** that stores a name
2. A **print()** line that shows a full greeting
3. The **+** sign that joins text into one sentence

**Target program**
name = "Alex"
print("Hello! I am " + name)

**Success looks like**
The console prints one line that includes the name, with a space after "am".

Click **Got it, let's go!** when you're ready to learn, then practice.`,
  kidExplain: [
    {
      title: "Variables = labeled containers",
      text: 'A **variable** is a labeled box that stores information. In `name = "Alex"`, the label is `name` and the value inside is `"Alex"`.',
    },
    {
      title: "The assignment sign (=)",
      text: "In Python, `=` does not mean “equals” like in math. It means **assign** — put this value into the labeled box.",
    },
    {
      title: 'What are strings (" ")?',
      text: "Quotes tell Python: “This is text.” In coding, text is called a **string**. Without quotes, Python thinks you mean another variable name.",
    },
    {
      title: "The glue (+)",
      text: 'The `+` joins pieces of text. `"Hello! I am " + name` creates one message. Python does not add spaces for you — put the space inside the quotes.',
    },
    {
      title: "AI idea: instructions → behavior",
      text: "Your AI helper will only do what you tell it. If the output is wrong, the instructions (code) need to be clearer.",
    },
  ],
  steps: [
    "Read the lesson pages (words → building blocks → worked example → ready).",
    "Practice 1: fill in the blank so the name is stored.",
    "Practice 2: reorder the two lines so memory comes before output.",
    "Practice 3: fix the capitalization bug (`Print` → `print`).",
    "Practice 4: make it yours — your name and your own greeting words.",
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
        "Almost never. The computer did exactly what it was told. Debugging means rereading your instructions and making them clearer.",
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
        "Joins strings together. Put any spaces you want inside the quotes yourself.",
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
      title: "Exercise 1 — Fill in the blank",
      focusCommand: "name =",
      commandExplain:
        "A variable stores text in a labeled box. Fill in the blank so name holds a name, then the print line will greet with it.",
      goal: 'Replace ____ with a name (keep the quotes), like Alex.',
      starterCode: `# Fill in the blank 👇
name = "____"
print("Hello! I am " + name)
`,
      solutionCode: `name = "Alex"
print("Hello! I am " + name)
`,
      hint: 'Put a name between the quotes, e.g. name = "Alex". Keep the space after "am ".',
      successMessage: "Nice — you stored a name and printed a greeting!",
      failureMessage:
        'Need name = "..." and print("Hello! I am " + name) with a space after "am ".',
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
      focusCommand: "name = + print()",
      commandExplain:
        "These lines make an AI helper introduce itself — but they're scrambled. Put them in the right order.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      solutionCode: `name = "Alex"
print("Hello! I am " + name)`,
      parsonsLines: ['name = "Alex"', 'print("Hello! I am " + name)'],
      hint: "Create the variable first, then print using it.",
      successMessage: "Nice ordering — your helper introduced itself!",
      failureMessage: "Variable first, then print the greeting with + name.",
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
      focusCommand: "print()",
      commandExplain:
        "This program is supposed to say hello with the name, but something's wrong. Fix it.",
      goal: "Repair the bug so it prints a greeting that includes Alex.",
      starterCode: `name = "Alex"
Print("Hello! I am " + name)
`,
      solutionCode: `name = "Alex"
print("Hello! I am " + name)
`,
      debugHint: "capitalization",
      hint: "Python commands are lowercase.",
      successMessage: "Bug fixed — lowercase print() works.",
      failureMessage: "Use lowercase print(...), not Print(...).",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!/\bprint\s*\(/.test(code)) return false;
        return /Hello! I am\s+Alex/.test(run.stdout.join("\n"));
      },
    },
    {
      id: "demo-ex-scratch-yours",
      kind: "scratch",
      title: "Exercise 4 — Make it yours",
      focusCommand: "from scratch",
      commandExplain:
        "Write another program from scratch. Use your own name (or a friend’s) and change the greeting words — keep the same pattern: store a name, then print with +.",
      goal: "From an empty editor: name = \"...\" and print(\"… \" + name) with a space before the name.",
      starterCode: `# Your turn — write both lines from scratch.
# Use YOUR name and change the greeting words if you want.
# Example shape (don't copy blindly — type it yourself):
# name = "..."
# print("Hi! I am " + name)

`,
      solutionCode: `name = "Jordan"
print("Hi! I am " + name)
`,
      hint: 'Keep name = "YourName" and a print(... + name) line. Put a space at the end of the greeting string so the name doesn\'t mash into the last word.',
      successMessage: "Custom greeting locked in — that’s real coding.",
      failureMessage:
        "Need a name = \"...\" line and a print(... + name) line that shows a greeting with the name (and a space before it).",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!/\bprint\s*\(/.test(code) || !/\+\s*name\b/.test(code)) return false;
        // Greeting string should end with a space so the name doesn't mash in.
        if (!/["'][^"'\n]*\s["']/.test(code)) return false;
        const out = run.stdout.join("\n").trim();
        return out.split(/\s+/).length >= 2 && !/____/.test(code);
      },
    },
  ],
  lessonModule: {
    durationLabel: "~6–8 min guided demo",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `This is the **same lesson screen** students use in class — not a toy slideshow.\n\nBy the end of this demo you'll have built a tiny **AI helper** that introduces itself — something like *"Hello! I am Alex."*\n\nYou'll learn three building blocks every program uses:\n\n• **Variables** — how a program remembers information\n• **print()** — how a program shows something on screen\n• **+** — how a program joins pieces of text into one message\n\nThen you'll practice with the same exercise kinds used in Week 1: **fill in the blank**, **reorder**, **debug**, and **make it yours**.`,
        image: "/images/lessons/py-1-hello.png",
        imageAlt: "A friendly robot waving and saying hello",
        callout: {
          label: "Who this is for",
          text: "Students new to coding, plus parents and educators previewing the product. Progress saves on this device — no account required for the demo.",
        },
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `A few new words will come up often. Keep this list handy — you'll see these terms again in class.`,
        bullets: [
          "**Variable** — a labeled box that stores a piece of information, like `name`.",
          "**String** — text wrapped in quotes, like `\"Alex\"`.",
          "**Assign (`=`)** — put a value into a variable. `name = \"Alex\"` puts `\"Alex\"` in `name`.",
          "**print()** — the command that displays something on the screen.",
          "**+** — glues two pieces of text together into one message.",
        ],
        callout: {
          label: "Tip",
          text: "You don't need to memorize these yet — just notice them as they come up. By the end they'll feel natural.",
        },
      },
      {
        id: "concept-1",
        kicker: "Building block #1",
        title: "A variable is a labeled box",
        body: `A **variable** stores a piece of information so your program can remember it and use it later.\n\nPicture a row of lockers. Each locker has a **label** (a name) and something **inside** (a value). In the line below, the label is \`name\` and the value inside is the text \`"Alex"\`.\n\nThe \`=\` sign trips almost everyone up at first. In Python it does **not** mean "equals" like in math. It means **assign**: put the value on the right into the box on the left.`,
        code: `name = "Alex"`,
        codeCaption: "Make a variable called name",
        bullets: [
          '**Quotes** `" "` tell Python *this is text* — programmers call text a **string**.',
          "Without quotes, Python thinks you're naming another variable and gets confused.",
          "Good names use letters, numbers, and underscores — no spaces (`my_name`, not `my name`).",
        ],
        callout: {
          label: "Common misconception",
          text: '`name` (no quotes) is the labeled box. `"name"` (with quotes) is just the letters n-a-m-e as text. They are completely different to Python.',
        },
        checkIn: {
          prompt: 'What does `name = "Alex"` do?',
          choices: [
            "Stores the text Alex inside a box called name",
            "Checks whether name equals Alex",
            "Prints the word Alex to the screen",
          ],
          correctIndex: 0,
          explanation:
            "= assigns — it stores the value on the right inside the box on the left. Nothing is printed or compared yet.",
        },
      },
      {
        id: "concept-2",
        kicker: "Building block #2",
        title: "print() puts words on the screen",
        body: `A variable stores information, but it stays *invisible* until you choose to show it. \`print(...)\` is how your program *says something* to the screen.\n\nWhen you put a variable inside \`print()\`, Python opens the box and shows what's inside — so \`print(name)\` displays \`Alex\`, not the word "name".\n\nPython is picky about spelling: it must be lowercase \`print\`, never \`Print\` or \`PRINT\`. To a computer those are three different words.`,
        code: `name = "Alex"\nprint(name)`,
        codeCaption: "Open the box and show what's inside",
        output: `Alex`,
        callout: {
          label: "Watch out",
          text: '`print(name)` shows the value inside the box (`Alex`). `print("name")` would literally show the word `name`. The quotes are the difference.',
        },
        checkIn: {
          prompt: 'If `name = "Alex"`, what does `print(name)` show?',
          choices: ["name", "Alex", '"name"'],
          correctIndex: 1,
          explanation:
            "print(name) with no quotes opens the box and shows what's stored inside it — Alex, not the word name.",
        },
      },
      {
        id: "concept-3",
        kicker: "Building block #3",
        title: "Glue text together with +",
        body: `Right now your helper can only say a name. To make it say a full sentence, you join pieces of text with \`+\`.\n\nImagine taping two strips of paper together: \`"Hello! I am "\` + \`"Alex"\` becomes one strip that reads \`Hello! I am Alex\`.\n\nThe #1 beginner trap: Python will **not** add spaces for you. So the space between "am" and your name has to live *inside* the quotes.`,
        code: `name = "Alex"\nprint("Hello! I am " + name)`,
        codeCaption: "Join a greeting and the name",
        output: `Hello! I am Alex`,
        callout: {
          label: "Common misconception",
          text: 'If you write `"Hello! I am"` with no space after `am`, you get `Hello! I amAlex` mashed together. Put the space inside the quotes: `"Hello! I am "`.',
        },
        checkIn: {
          prompt: 'Why does `"Hello! I am" + name` print `Hello! I amAlex` (no space)?',
          choices: [
            "Python is broken",
            "The variable name is spelled wrong",
            "+ never adds spaces — the space must be typed inside the quotes",
          ],
          correctIndex: 2,
          explanation:
            "Python glues text exactly as written. If you want a space, you must put it inside the quotes yourself.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Let's build it together, line by line",
        body: `Watch how the three blocks combine into one working program.\n\n**Step 1 — Store the name.** Make a box called \`name\` and put text inside it. Nothing prints yet; you're just remembering it.\n\n**Step 2 — Glue the sentence.** Inside \`print()\`, join the greeting \`"Hello! I am "\` with the \`name\` box using \`+\`. Notice the space inside the quotes after "am".\n\n**Step 3 — Run it.** Python reads top to bottom: it fills the box, then builds and shows the sentence.`,
        code: `# Step 1: remember the name\nname = "Alex"\n\n# Step 2 & 3: build the sentence and show it\nprint("Hello! I am " + name)`,
        codeCaption: "The finished program, with comments explaining each part",
        output: `Hello! I am Alex`,
        callout: {
          label: "Pro tip",
          text: "Lines starting with `#` are comments — notes for humans that Python ignores. Good programmers use them to explain why their code does something.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: '"The computer messed up" — or did it?',
        body: `Here's the most important idea in coding — and in AI: **computers do not guess.** They follow your instructions *exactly*, in the exact order you write them.\n\nThink of giving instructions to an extremely literal friend. If you say "make a sandwich" they're stuck — but if you say "take two slices of bread, spread peanut butter on one…," they can do it. A computer is that friend, times a million: precise, fast, and unable to fill in the blanks for you.\n\nThat is *good news*. When something goes wrong, the computer didn't "break" — your **instructions** just need to be clearer. Debugging is simply rereading your recipe.`,
        callout: {
          label: "Common misconception",
          text: 'Beginners often think "the computer messed up." Almost always, the code did exactly what it was told — it just wasn\'t told quite what we meant. Fixing code = fixing instructions.',
        },
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Before you run it, predict it",
        body: `Real coders read code *before* they run it, and guess what will happen. Look at this snippet: the name box holds \`"Maya"\`, then the greeting is glued together with \`+\`.\n\nTrace it in your head: what text is inside \`name\`? What does the printed sentence look like once the two pieces are joined?`,
        code: `name = "Maya"\nprint("Hello! I am " + name)`,
        codeCaption: "What will this print?",
        checkIn: {
          prompt: "What exact line will this program print?",
          choices: ["Hello! I am Maya", "Hello! I am name", "Maya Hello! I am"],
          correctIndex: 0,
          explanation:
            'The name box holds "Maya", so joining "Hello! I am " + name produces Hello! I am Maya.',
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Habits that make every lesson easier",
        body: `A few small habits will help you in every future lesson:\n\n• **Name variables clearly.** \`name\` is better than \`x\` — anyone reading your code knows what it holds.\n• **Test after every change.** Write one or two lines, run, confirm it works, then continue.\n• **Read before you run.** Predicting the output before pressing Run helps you catch mistakes early.`,
        bullets: [
          "Clear names beat clever names.",
          "Small steps, tested often, beat big leaps.",
          "Read the console after every Run & check — that feedback is part of learning.",
        ],
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've met the three building blocks: a **variable** to remember, **print()** to show, and **+** to join text.\n\nIn the exercises you'll **fill in a blank**, reorder lines, fix a bug, then make the greeting yours — then run it to watch your AI helper come to life.\n\nIf something looks off, remember: the computer did exactly what you told it, so just reread your instructions.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
};
