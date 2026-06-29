import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function hasNameVariable(code: string) {
  return /\bname\s*=\s*["'][^"']+["']/.test(code);
}

export const lesson1: PythonLessonConfig = {
  id: "lesson-1",
  title: "1. My First AI Helper",
  goal: "Write your first Python program: use a variable + print() to introduce your AI helper.",
  xpReward: 50,
  badge: "🤖 The Awakener",
  instructorScript:
    "**Coach’s note**:\nWelcome to Kanam Academy.\nToday, you’re going to teach a computer how to introduce itself.\n\nBig idea (this is also a core AI idea):\n- Computers (and AI systems) do NOT guess.\n- They follow instructions exactly.\n\nWhat you’re building:\n- A **variable** that stores text (your name).\n- A **print()** line that displays a full sentence.\n\nHere’s the program you’re aiming for:\nname = \"Alex\"\nprint(\"Hello! I am \" + name)\n\nTwo super common mistakes (and how to fix them):\n- Quotes: If you forget quotes, Python thinks you mean a variable.\n- Spaces: Python will NOT add spaces for you. Put the space inside the quotes: \"I am \"\n\nSuccess today = your scratch code runs without errors AND prints one sentence that includes your name.",
  kidExplain: [
    {
      title: "Variables = labeled containers",
      text:
        'A **variable** is a labeled box that stores information. In `name = "Alex"`, the label is `name` and the value inside is `"Alex"`.',
    },
    {
      title: "The Assignment Operator (=)",
      text:
        "In Python, `=` does not mean “equals” like in math. It means **assign** — like an arrow that puts data into your labeled box.",
    },
    {
      title: 'What are Strings (" ")?',
      text:
        "Quotes tell Python: “This is text.” In coding, text is called a **string**. Without quotes, Python thinks you are looking for a variable name and will get confused!",
    },
    {
      title: "The Glue (+)",
      text:
        'The `+` joins pieces of text together. `"Hello! I am " + name` creates one single message. Note: Python doesn’t add spaces for you — you must put the space inside the quotes!',
    },
    {
      title: "AI idea: instructions → behavior",
      text:
        "Your AI helper will only do what you tell it. If the output is wrong, it means the instructions (code) need to be clearer.",
    },
  ],
  steps: [
    'Create a variable: `name = "Alex"` (use YOUR name inside quotes).',
    'Print a sentence using +: `print("Hello! I am " + name)`',
    "Run your code and read the console output.",
    "Fix common mistakes: missing quotes, missing spaces inside strings, or Print vs print.",
  ],
  cfu: [
    {
      question: 'Why do spaces inside quotation marks matter (like "I am ")?',
      answer:
        'Python is literal. If you don’t put the space in the quotes, the output will mash words together like "I amAlex".',
    },
    {
      question:
        'What is the difference between the variable name (name) and the string "name"?',
      answer:
        "`name` is a variable that holds a value. \"name\" is just the letters n-a-m-e (text).",
    },
    {
      question: "What are valid variable naming rules in Python?",
      answer:
        "Use letters, numbers, and underscores (no spaces). It can’t start with a number. Example: my_name, name2.",
    },
  ],
  tryThis: [
    "Change the greeting (Easy): Make the message say something new (still include your name).",
    'Add a second variable (Medium): add `mood = "happy"` or `color = "blue"` and print a longer sentence.',
    "Print multiple lines (Bonus): use two print() lines to introduce your helper in 2 sentences.",
  ],
  aiSafetyMoment:
    "Responsible AI: AI tools can help explain code, but they can’t learn for you. You’re responsible for the instructions you write and what your program outputs.",
  commandReference: [
    {
      command: 'name = "..."',
      summary:
        "Creates a variable — a labeled box that stores text. The quotes tell Python this is a string.",
      example: 'name = "Alex"',
    },
    {
      command: "print(...)",
      summary: "Displays a message in the console. Python needs lowercase print, not Print.",
      example: 'print("Hello!")',
    },
    {
      command: "+",
      summary: "Joins strings together. Put spaces inside the quotes — Python won't add them for you.",
      example: '"Hello! I am " + name',
    },
    {
      command: '" " (quotes)',
      summary: "Quotes wrap text (strings). Without them, Python thinks you mean a variable name.",
      example: '"Alex"',
    },
  ],
  exercises: [
    {
      id: "ex-variable",
      title: "Exercise 1 — Create a variable",
      focusCommand: "name =",
      commandExplain:
        "A variable stores information. Type your name inside the quotes — that text becomes the value in the box labeled name.",
      goal: 'Fill in the blank so name holds your name, like name = "Alex".',
      starterCode: `# Fill in the blank 👇
name = "____"
`,
      hint: 'Put your name between the quotes, e.g. name = "Alex".',
      successMessage: "Great! You created a variable that stores your name.",
      failureMessage: 'Create name = "YourName" with quotes around your name.',
      validate: (code: string) => {
        if (rejectsUppercasePrint(code)) return false;
        return hasNameVariable(code);
      },
    },
    {
      id: "ex-print",
      title: "Exercise 2 — Practice print()",
      focusCommand: "print()",
      commandExplain:
        "print() sends a message to the console. Use lowercase print — Python won't recognize Print.",
      goal: "Add a print() line that shows the name variable.",
      starterCode: `name = "Alex"
print(____)
`,
      hint: "Type name inside the parentheses: print(name)",
      successMessage: "Nice! print() displayed your variable in the console.",
      failureMessage: "Add print(name) so the console shows your name.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!/\bprint\s*\([\s\S]*\bname\b[\s\S]*\)/.test(code)) return false;
        return run.stdout.length > 0 && run.stdout.some((line) => line.includes("Alex") || /\S/.test(line));
      },
    },
    {
      id: "ex-glue",
      title: "Exercise 3 — Join strings with +",
      focusCommand: "+",
      commandExplain:
        'The + glues text together. Include the space inside the quotes: "Hello! I am " — Python is literal about spaces.',
      goal: 'Print one sentence: "Hello! I am " + name (fill in the string part).',
      starterCode: `name = "Alex"
print("____" + name)
`,
      hint: 'Type Hello! I am  (with a space after am) inside the quotes.',
      successMessage: "Perfect! You glued strings together into one sentence.",
      failureMessage: 'Use print("Hello! I am " + name) — include the space after "am ".',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!/\bprint\s*\(/.test(code) || !code.includes("+")) return false;
        if (!/["']Hello! I am\s+["']/.test(code)) return false;
        const out = run.stdout.join("\n");
        return /Hello! I am\s+\S/.test(out);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Put it all together",
      focusCommand: "variable + print + +",
      commandExplain:
        "Build the full intro program: store your name, then print one sentence that includes it.",
      goal: "Complete the program so it prints one sentence with your name.",
      starterCode: `# Fill in the blanks 👇
name = "____"            # put your name
print("Hello! I am " + ____)  # use the variable
`,
      hint: 'name = "YourName" and print("Hello! I am " + name)',
      successMessage: "You did it! Your AI helper introduced itself correctly. 🎉",
      failureMessage:
        'Need name = "..." and print("Hello! I am " + name). Check lowercase print and the space after "am ".',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!code.includes("print(") || !code.includes("+")) return false;
        if (!/["']Hello! I am\s+["']/.test(code)) return false;
        const out = run.stdout.join("\n");
        return /Hello! I am\s+\S/.test(out);
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
        body: `Welcome to your very first program! By the end of this lesson you'll have built a tiny **AI helper** that introduces itself on screen — something like *"Hello! I am Alex."*\n\nThat may sound simple, but you'll learn the three building blocks that *every* program is made of:\n\n• **Variables** — how a program remembers information.\n• **print()** — how a program shows things to a human.\n• **+** — how a program joins pieces of text into a full message.\n\nThese same three ideas power chatbots, video games, and apps used by billions of people. You're starting at the exact same place every professional programmer once did.`,
        image: "/images/lessons/py-1-hello.png",
        imageAlt: "A friendly robot waving and saying hello",
        callout: {
          label: "Why it matters",
          text: "When you type a message to a chatbot and it greets you back, somewhere a program stored your words in a variable and used something like print() to reply. You're learning the real machinery behind the AI you use every day.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "Computers do exactly what you tell them",
        body: `Here's the most important idea in all of coding — and in AI: **computers do not guess.** They follow your instructions *exactly*, in the exact order you write them.\n\nThink of giving instructions to an extremely literal friend. If you say "make a sandwich" they're stuck — but if you say "take two slices of bread, spread peanut butter on one, jelly on the other, press them together," they can do it perfectly. A computer is that friend, times a million: precise, fast, and totally unable to fill in the blanks for you.\n\nThis is *good news*. It means when something goes wrong, the computer didn't "break" or "make a mistake" — your **instructions** just need to be clearer. Debugging is simply rereading your recipe.`,
        callout: {
          label: "Common misconception",
          text: "Beginners often think \"the computer messed up.\" Almost always, the code did exactly what it was told — it just wasn't told quite what we meant. Fixing code = fixing instructions.",
        },
      },
      {
        id: "variables",
        kicker: "Building block #1",
        title: "A variable is a labeled box",
        body: `A **variable** is a labeled box that stores a piece of information so your program can remember it and use it later.\n\nPicture a row of lockers. Each locker has a **label** (a name) and something **inside** it (a value). In the line below, the label is \`name\` and the value inside is the text \`"Alex"\`.\n\nThe \`=\` sign trips up almost everyone at first. In Python it does **not** mean "equals" like in math. It means **assign**: "put the value on the right *into* the box on the left." You can read \`name = "Alex"\` as *"let name hold Alex."*`,
        code: `name = "Alex"`,
        codeCaption: "Make a variable called name",
        bullets: [
          "**Quotes** ` \" \" ` tell Python *this is text* — programmers call text a **string**.",
          "Without quotes, Python thinks you're naming *another* variable and gets confused.",
          "Good variable names use letters, numbers, and underscores — no spaces (use `my_name`, not `my name`).",
        ],
        callout: {
          label: "Common misconception",
          text: "`name` (no quotes) is the labeled box. `\"name\"` (with quotes) is just the four letters n-a-m-e as text. They are completely different things to Python.",
        },
      },
      {
        id: "print",
        kicker: "Building block #2",
        title: "print() puts words on the screen",
        body: `A variable stores information, but it stays *invisible* inside its box until you choose to show it. \`print(...)\` is how your program *says something* out loud to the screen. Whatever you put inside the parentheses gets displayed.\n\nWhen you put a variable inside \`print()\`, Python opens the box and shows what's inside — so \`print(name)\` displays \`Alex\`, not the word "name".\n\nPython is picky about spelling: it must be lowercase \`print\`, never \`Print\` or \`PRINT\`. To a computer those are three different words, and only \`print\` is the real command.`,
        code: `name = "Alex"\nprint(name)`,
        codeCaption: "Open the box and show what's inside",
        output: `Alex`,
        callout: {
          label: "Watch out",
          text: "`print(name)` shows the value inside the box (`Alex`). `print(\"name\")` would literally show the word `name`. The quotes are the difference.",
        },
      },
      {
        id: "glue",
        kicker: "Building block #3",
        title: "Glue text together with +",
        body: `Right now your helper can only say a name. To make it say a full sentence, you join pieces of text together with the \`+\` sign. Programmers call this **concatenation** — a fancy word for "gluing strings end to end."\n\nImagine taping two strips of paper together: \`"Hello! I am "\` + \`"Alex"\` becomes one strip that reads \`Hello! I am Alex\`.\n\nThe #1 beginner trap: Python will **not** add spaces for you. It glues text *exactly*, with zero help. So the space between "am" and your name has to live *inside* the quotes.`,
        code: `name = "Alex"\nprint("Hello! I am " + name)`,
        codeCaption: "Join a greeting and the name",
        output: `Hello! I am Alex`,
        callout: {
          label: "Common misconception",
          text: "If you write `\"Hello! I am\"` with no space after `am`, you get `Hello! I amAlex` mashed together. Put the space inside the quotes: `\"Hello! I am \"`.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Let's build it together, line by line",
        body: `Watch how the three blocks combine into one working program. We'll build it the way a real programmer does — one line at a time, checking what happens.\n\n**Step 1 — Store the name.** We make a box called \`name\` and put text inside it. Nothing prints yet; we're just remembering it.\n\n**Step 2 — Glue the sentence.** Inside \`print()\`, we join the greeting \`"Hello! I am "\` with the \`name\` box using \`+\`. Notice the space living inside the quotes after "am".\n\n**Step 3 — Run it.** Python reads top to bottom: it fills the box, then builds and shows the sentence. Out comes your helper's greeting.`,
        code: `# Step 1: remember the name\nname = "Alex"\n\n# Step 2 & 3: build the sentence and show it\nprint("Hello! I am " + name)`,
        codeCaption: "The finished program, with comments explaining each part",
        output: `Hello! I am Alex`,
        callout: {
          label: "Pro tip",
          text: "Lines starting with `#` are comments — notes for humans that Python ignores. Good programmers use them to explain *why* their code does something.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've met the three building blocks of every program: a **variable** to remember, **print()** to show, and **+** to join text.\n\nIn the exercises you'll build this program one piece at a time — first the variable, then print, then the glue — and run it to watch your AI helper come to life with *your* name. If something looks off, remember: the computer did exactly what you told it, so just reread your instructions.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/",
  nextHref: "/learn/2",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
};
