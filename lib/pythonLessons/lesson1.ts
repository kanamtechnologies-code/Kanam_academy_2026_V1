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
    durationLabel: "~5 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "Computers do exactly what you tell them",
        body: `Today you'll write your very first program: an AI helper that introduces itself.\n\nHere's the most important idea in all of coding — and in AI: **computers do not guess.** They follow your instructions *exactly*, in order. If the output looks wrong, it almost always means the **instructions** need to be clearer, not that the computer "made a mistake."`,
        image: "/images/lessons/py-1-hello.png",
        imageAlt: "A friendly robot waving and saying hello",
        callout: {
          label: "Where you see it",
          text: "Every chatbot's first \"Hi, how can I help?\", every game character's greeting, and Siri or Alexa saying hello — all of it starts with a line of code like the one you're about to write.",
        },
      },
      {
        id: "variables",
        kicker: "Building block #1",
        title: "A variable is a labeled box",
        body: `A **variable** is a labeled box that stores a piece of information so you can use it later.\n\nIn the line below, the **label** is \`name\` and the **value** inside the box is \`"Alex"\`. The \`=\` sign doesn't mean "equals" like in math — it means **assign**: "put this value into this box."`,
        code: `name = "Alex"`,
        codeCaption: "Make a variable called name",
        bullets: [
          "**Quotes** ` \" \" ` tell Python *this is text* (called a **string**).",
          "Without quotes, Python thinks you're naming another variable and gets confused.",
          "Good variable names use letters, numbers, and underscores — no spaces.",
        ],
      },
      {
        id: "print",
        kicker: "Building block #2",
        title: "print() puts words on the screen",
        body: `\`print(...)\` is how your program *says something* to the screen. Whatever you put inside the parentheses gets displayed.\n\nPython is picky: it must be lowercase \`print\`, never \`Print\`.`,
        code: `name = "Alex"\nprint(name)`,
        codeCaption: "Show what's inside the box",
        output: `Alex`,
      },
      {
        id: "glue",
        kicker: "Building block #3",
        title: "Glue text together with +",
        body: `The \`+\` sign joins (glues) pieces of text into one message. This lets your helper say a full sentence instead of just a name.\n\nBe careful — Python will **not** add spaces for you. The space has to live *inside* the quotes.`,
        code: `name = "Alex"\nprint("Hello! I am " + name)`,
        codeCaption: "Join a greeting and the name",
        output: `Hello! I am Alex`,
        callout: {
          label: "Watch out",
          text: "If you write `\"Hello! I am\"` with no space after `am`, you'll get `Hello! I amAlex`. The space goes inside the quotes: `\"Hello! I am \"`.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Put it all together",
        body: `Here's the full program you're aiming for. Three building blocks: a **variable**, a **print()**, and the **+** glue.\n\nIn the exercises you'll build this one piece at a time, then run it to watch your AI helper come to life. Click **Start the exercises** when you're ready.`,
        code: `name = "Alex"\nprint("Hello! I am " + name)`,
        codeCaption: "Your first program",
        output: `Hello! I am Alex`,
      },
    ],
  },
  prevHref: "/",
  nextHref: "/learn/2",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
};
