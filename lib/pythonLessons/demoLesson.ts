import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import { KANAM_BOT } from "@/lib/brand/kanamBot";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function hasNameVariable(code: string) {
  return /\bname\s*=\s*["'][^"']+["']/.test(code);
}

/**
 * Guided demo — a shorter, faithful slice of Lesson 1.
 * Same pedagogy and exercise kinds; sized for a product walkthrough.
 * Tone: high school CS / intro to programming.
 */
/** Public demo lesson id — guest mode may only unlock this lesson. */
export const DEMO_LESSON_ID = "demo-lesson-1";

export const demoLesson: PythonLessonConfig = {
  id: DEMO_LESSON_ID,
  title: "Demo: Your First Python Program",
  goal: "By the end of this demo you can store a value, print output, concatenate strings, and debug a common capitalization error — the same core skills students use in Week 1.",
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
High school students starting Python (and AI literacy) — plus parents or educators previewing the real classroom screen.

**Learning goal (today)**
Write a short program that stores a name and prints a complete greeting.

**Big idea**
Computers and AI systems do **not** infer intent. They execute your instructions exactly, in order. When output is wrong, the instructions need to be clearer — that is debugging.

**What you will build**
1. A **variable** that stores a name
2. A **print()** call that displays a full greeting
3. String **concatenation** with \`+\` to join text into one sentence

**Target program**
name = "Alex"
print("Hello! I am " + name)

**Success looks like**
The console prints one line that includes the name, with a space after "am".

Click **Got it, let's go!** when you're ready.`,
  kidExplain: [
    {
      title: "Variables store values under a name",
      text: 'A **variable** is a named place in memory. In `name = "Alex"`, the identifier is `name` and the stored value is `"Alex"`.',
    },
    {
      title: "The assignment operator (=)",
      text: "In Python, `=` is not mathematical equality. It **assigns** — it stores the value on the right in the variable on the left.",
    },
    {
      title: 'Strings (" ")',
      text: "Quotes mark a **string** (text). Without quotes, Python treats the word as an identifier — another variable name — not literal text.",
    },
    {
      title: "Concatenation (+)",
      text: 'The `+` operator joins strings. `"Hello! I am " + name` builds one message. Python does not insert spaces automatically — include them in the string literals.',
    },
    {
      title: "AI literacy: instructions → behavior",
      text: "An AI system behaves according to the instructions and data it receives. If the output is wrong, clarify the instructions (your code) — don't assume the machine “understood.”",
    },
  ],
  steps: [
    "Work through the lesson pages (concepts → worked example → ready).",
    "Practice 1: fill in the blank so the name is stored.",
    "Practice 2: reorder the two lines so assignment comes before output.",
    "Practice 3: fix the capitalization bug (`Print` → `print`).",
    "Practice 4: customize the greeting with your own name and wording.",
    "Read the console after every Run & check — feedback is part of the learning loop.",
  ],
  cfu: [
    {
      question: 'Why does the space inside "Hello! I am " matter?',
      answer:
        'Python is literal. Without the space after "am", the words mash together: "Hello! I amAlex". Precise output requires precise string literals.',
    },
    {
      question: 'What is the difference between name and "name"?',
      answer:
        "`name` (no quotes) is a variable — a named storage location. \"name\" (with quotes) is the literal characters n-a-m-e. Python treats them as completely different things.",
    },
    {
      question: "If the output is wrong, did the computer fail?",
      answer:
        "Almost never. The computer executed exactly what it was told. Debugging means rereading your instructions and making them match your intent.",
    },
  ],
  tryThis: [
    "Change the greeting wording — keep your name in the sentence.",
    'Use your own name: name = "YourName"',
    'Challenge: add mood = "focused" and print a longer sentence with +.',
  ],
  aiSafetyMoment:
    "Responsible AI: you control the instructions. Clear, intentional code keeps systems under your direction. When something looks wrong, revise the instructions — don't assume the model “meant” something else.",
  commandReference: [
    {
      command: 'name = "..."',
      summary:
        "Creates a variable — a named place that stores text. Quotes mark a string (text value).",
      example: 'name = "Alex"',
    },
    {
      command: "print(...)",
      summary:
        "Writes a message to the console. Must be lowercase print — Python identifiers are case-sensitive.",
      example: 'print("Hello!")',
    },
    {
      command: "+",
      summary:
        "Concatenates strings. Include any spaces you want inside the quotes yourself.",
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
        "A variable stores a value under a name. Fill in the blank so name holds a name, then the print line will include it in the greeting.",
      goal: 'Replace ____ with a name (keep the quotes), like Alex.',
      starterCode: `# Fill in the blank
name = "____"
print("Hello! I am " + name)
`,
      solutionCode: `name = "Alex"
print("Hello! I am " + name)
`,
      hint: 'Put a name between the quotes, e.g. name = "Alex". Keep the space after "am ".',
      successMessage: "Solid — you assigned a value and printed a greeting.",
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
      title: "Exercise 2 — Reorder the program",
      focusCommand: "name = + print()",
      commandExplain:
        "These lines introduce a name and print a greeting — but they're out of order. Put them in the correct sequence.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      solutionCode: `name = "Alex"
print("Hello! I am " + name)`,
      parsonsLines: ['name = "Alex"', 'print("Hello! I am " + name)'],
      hint: "Assign the variable first, then print using it.",
      successMessage: "Correct order — assignment before output.",
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
        "This program should print a greeting with the name, but something is wrong. Find and fix the bug.",
      goal: "Repair the bug so it prints a greeting that includes Alex.",
      starterCode: `name = "Alex"
Print("Hello! I am " + name)
`,
      solutionCode: `name = "Alex"
print("Hello! I am " + name)
`,
      debugHint: "capitalization",
      hint: "Python built-ins are lowercase — print, not Print.",
      successMessage: "Bug fixed — lowercase print() is required.",
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
        "Write the program from scratch. Use your own name (or a classmate's) and change the greeting wording — keep the same pattern: assign a name, then print with +.",
      goal: "From an empty editor: name = \"...\" and print(\"… \" + name) with a space before the name.",
      starterCode: `# Your turn — write both lines from scratch.
# Use your name and change the greeting if you want.
# Pattern:
# name = "..."
# print("Hi! I am " + name)

`,
      solutionCode: `name = "Jordan"
print("Hi! I am " + name)
`,
      hint: 'Keep name = "YourName" and a print(... + name) line. Put a space at the end of the greeting string so the name doesn\'t mash into the last word.',
      successMessage: "Custom greeting working — that's real programming.",
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
        body: `This is the **same lesson canvas** students use in class — a real learning environment, not a mockup.\n\nBy the end of this demo you'll write a short Python program that stores a name and prints a complete greeting — something like *"Hello! I am Alex."*\n\nYou'll use three fundamentals every program relies on:\n\n• **Variables** — how a program stores information\n• **print()** — how a program displays output\n• **+** — how a program concatenates strings into one message\n\nThen you'll practice with the same exercise types used in Week 1: **fill in the blank**, **reorder**, **debug**, and **make it yours**.`,
        image: KANAM_BOT.intro,
        imageAlt: "Kanam AI helper bot beside a Python name variable",
        callout: {
          label: "Who this is for",
          text: "High school students new to coding, plus parents and educators previewing the product. Progress saves on this device — no account required for the demo.",
        },
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Terms you'll use today",
        body: `A few terms will show up throughout the lesson. Keep them in mind — you'll see them again across the Python track.`,
        bullets: [
          "**Variable** — a named place in memory that stores a value, like `name`.",
          "**String** — text wrapped in quotes, like `\"Alex\"`.",
          "**Assign (`=`)** — store a value in a variable. `name = \"Alex\"` puts `\"Alex\"` in `name`.",
          "**print()** — the function that writes output to the console.",
          "**+** — concatenates two strings into one message.",
        ],
        callout: {
          label: "Tip",
          text: "You don't need to memorize these yet — notice them as they appear. By the end they'll feel familiar.",
        },
      },
      {
        id: "concept-1",
        kicker: "Building block #1",
        title: "A variable stores a value under a name",
        body: `A **variable** holds a piece of information so your program can reuse it later.\n\nIn the line below, \`name\` is the identifier and \`"Alex"\` is the value stored in that variable.\n\nThe \`=\` operator trips people up at first. In Python it does **not** mean "equals" like in math. It means **assign**: put the value on the right into the variable on the left.`,
        image: KANAM_BOT.variable,
        imageAlt: "Kanam AI helper bot pointing to a named memory slot for name",
        code: `name = "Alex"`,
        codeCaption: "Assign a string to the variable name",
        bullets: [
          '**Quotes** `" "` tell Python *this is text* — a **string**.',
          "Without quotes, Python treats the word as another identifier and raises an error if it isn't defined.",
          "Valid names use letters, numbers, and underscores — no spaces (`my_name`, not `my name`).",
        ],
        callout: {
          label: "Common misconception",
          text: '`name` (no quotes) is the variable. `"name"` (with quotes) is just the characters n-a-m-e as text. They are completely different to Python.',
        },
        checkIn: {
          prompt: 'What does `name = "Alex"` do?',
          choices: [
            "Checks whether name equals Alex” belongs to a different situation than the one in the question stem",
            "Stores the text Alex in a variable called name",
            "Prints the word Alex to the screen",
          ],
          correctIndex: 1,
          explanation:
            "= assigns — it stores the value on the right in the variable on the left. Nothing is printed or compared yet.",
        },
      },
      {
        id: "concept-2",
        kicker: "Building block #2",
        title: "print() writes output to the console",
        body: `A variable stores information, but nothing appears until you display it. \`print(...)\` is how your program writes to the console.\n\nWhen you pass a variable to \`print()\`, Python reads the stored value — so \`print(name)\` displays \`Alex\`, not the word "name".\n\nPython is case-sensitive: it must be lowercase \`print\`, never \`Print\` or \`PRINT\`. To the interpreter those are three different names.`,
        image: KANAM_BOT.print,
        imageAlt: "Kanam AI helper bot showing print(name) output in the console",
        code: `name = "Alex"\nprint(name)`,
        codeCaption: "Read the variable and display its value",
        output: `Alex`,
        callout: {
          label: "Watch out",
          text: '`print(name)` shows the value stored in the variable (`Alex`). `print("name")` literally shows the word `name`. The quotes make the difference.',
        },
        checkIn: {
          prompt: 'If `name = "Alex"`, what does `print(name)` show?',
          choices: ["name", "Alex", '"name"'],
          correctIndex: 1,
          explanation:
            "print(name) with no quotes around name reads the variable and displays its value — Alex, not the word name.",
        },
      },
      {
        id: "concept-3",
        kicker: "Building block #3",
        title: "Concatenate strings with +",
        body: `Right now the program can only print a name. To build a full sentence, join string pieces with \`+\`.\n\n\`"Hello! I am "\` + \`"Alex"\` becomes one string: \`Hello! I am Alex\`.\n\nThe #1 beginner trap: Python will **not** insert spaces for you. The space between "am" and the name must live *inside* the quotes.`,
        image: KANAM_BOT.concat,
        imageAlt: "Kanam AI helper bot watching two text pieces join into one greeting",
        code: `name = "Alex"\nprint("Hello! I am " + name)`,
        codeCaption: "Join a greeting string with the name variable",
        output: `Hello! I am Alex`,
        callout: {
          label: "Common misconception",
          text: 'If you write `"Hello! I am"` with no space after `am`, you get `Hello! I amAlex`. Put the space inside the quotes: `"Hello! I am "`.',
        },
        checkIn: {
          prompt: 'Why does `"Hello! I am" + name` print `Hello! I amAlex` (no space)?',
          choices: [
            "+ never adds spaces — the space must be typed inside the quotes",
            "The variable name is spelled wrong” belongs to a different situation than the one in the question stem",
            "Python is broken” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Python concatenates text exactly as written. If you want a space, include it in the string literal.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Build it line by line",
        body: `Watch how the three pieces combine into one working program.\n\n**Step 1 — Store the name.** Assign text to \`name\`. Nothing prints yet; you're only storing the value.\n\n**Step 2 — Build the sentence.** Inside \`print()\`, concatenate \`"Hello! I am "\` with \`name\` using \`+\`. Notice the space inside the quotes after "am".\n\n**Step 3 — Run it.** Python executes top to bottom: it assigns the variable, then builds and displays the sentence.`,
        image: KANAM_BOT.steps,
        imageAlt: "Kanam AI helper bot following store, join, and print steps",
        code: `# Step 1: store the name\nname = "Alex"\n\n# Step 2 & 3: build the sentence and print it\nprint("Hello! I am " + name)`,
        codeCaption: "The finished program, with comments explaining each part",
        output: `Hello! I am Alex`,
        callout: {
          label: "Pro tip",
          text: "Lines starting with `#` are comments — notes for humans that Python ignores. Use them to explain intent, not just restate the code.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: '"The computer messed up" — or did it?',
        body: `Here's a core idea in programming — and in AI: **computers do not guess.** They follow your instructions *exactly*, in the order you write them.\n\nThink of an extremely literal executor. Vague instructions fail; precise steps succeed. A computer is that executor at machine speed: fast, consistent, and unable to fill in gaps for you.\n\nThat is useful. When something goes wrong, the machine usually didn't "break" — your **instructions** need to match your intent. Debugging is rereading and clarifying the code.`,
        callout: {
          label: "Common misconception",
          text: 'Beginners often assume "the computer messed up." Almost always, the code did exactly what it was told — it just wasn\'t told quite what we meant. Fixing code = fixing instructions.',
        },
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Predict before you run",
        body: `Strong programmers read code *before* they run it and anticipate the result. Look at this snippet: \`name\` holds \`"Maya"\`, then the greeting is concatenated with \`+\`.\n\nTrace it mentally: what value is in \`name\`? What exact line prints once the two pieces join?`,
        image: KANAM_BOT.predict,
        imageAlt: "Kanam AI helper bot thinking through a prediction",
        code: `name = "Maya"\nprint("Hello! I am " + name)`,
        codeCaption: "What will this print?",
        checkIn: {
          prompt: "What exact line will this program print?",
          choices: ["Hello! I am Maya", "Hello! I am name", "Maya Hello! I am"],
          correctIndex: 0,
          explanation:
            'name holds "Maya", so "Hello! I am " + name produces Hello! I am Maya.',
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Habits that transfer to every lesson",
        body: `A few practices will help across the rest of the course:\n\n• **Name variables clearly.** \`name\` beats \`x\` — readers (including future you) know what it holds.\n• **Test after every small change.** Write a line or two, run, confirm, then continue.\n• **Predict before you run.** Anticipating output helps you catch mistakes earlier.`,
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
        body: `You've covered the three fundamentals: a **variable** to store, **print()** to display, and **+** to concatenate.\n\nIn the exercises you'll **fill in a blank**, reorder lines, fix a bug, then customize the greeting — then run it and read the console.\n\nIf something looks off, remember: the computer did exactly what you told it. Reread your instructions.\n\nClick **Start the exercises** when you're ready.`,
        image: KANAM_BOT.ready,
        imageAlt: "Kanam AI helper bot welcoming you with open hands to start the exercises",
      },
    ],
  },
};
