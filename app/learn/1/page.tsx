 "use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson1: LessonConfig = {
  id: "lesson-1",
  title: "1. My First AI Helper",
  goal: "Write your first Python program: use a variable + print() to introduce your AI helper.",
  xpReward: 50,
  badge: "🤖 The Awakener",
  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, rebuild your program so the console prints ONE sentence that includes your name.",
  assignmentChecklist: [
    'Create a variable like: name = "Alex" (quotes included).',
    'Print using the variable: print("Hello! I am " + name)',
    'Make sure there’s a space after "am " inside the quotes.',
    "Use lowercase print (not Print).",
    "Run it and confirm your output includes your name.",
  ],
  starterCode: `# Fill in the blanks 👇
name = "____"            # put your name
print("Hello! I am " + ____)  # use the variable
`,
  instructorScript:
    "Coach’s note:\nWelcome to Kanam Academy.\nToday, you’re going to teach a computer how to introduce itself.\n\nBig idea (this is also a core AI idea):\n- Computers (and AI systems) do NOT guess.\n- They follow instructions exactly.\n\nWhat you’re building:\n- A **variable** that stores text (your name).\n- A **print()** line that displays a full sentence.\n\nHere’s the program you’re aiming for:\nname = \"Alex\"\nprint(\"Hello! I am \" + name)\n\nTwo super common mistakes (and how to fix them):\n- Quotes: If you forget quotes, Python thinks you mean a variable.\n- Spaces: Python will NOT add spaces for you. Put the space inside the quotes: \"I am \"\n\nSuccess today = your scratch code runs without errors AND prints one sentence that includes your name.",
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
  editorPlaceholder:
    '# From scratch idea:\n# name = "Alex"\n# print("Hello! I am " + name)\n',
  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/",
  nextHref: "/learn/2",

  getRunOutput: (code) => {
    if (code.includes("Print(")) {
      return asTerminal(
        "❌ Common mistake: Python needs lowercase print(...), not Print(...)."
      );
    }

    const match = code.match(/\bname\s*=\s*["']([^"']+)["']/);
    const nameValue = match?.[1] ?? "Kanam";

    if (code.includes("print(")) {
      return asTerminal(
        `Hello! I am ${nameValue}\n\nTip: If your words look squished, add spaces inside your quotes.`
      );
    }
    return asTerminal("(no output)\nTip: add print(...) to see output.");
  },

  computeProgressPercent: (code, submitted) => {
    const hasName = /\bname\s*=\s*["'][^"']+["']/.test(code);
    const hasLowerPrint = code.includes("print(") && !code.includes("Print(");
    const usesGluePlus = hasLowerPrint && code.includes("+");
    const includesHelloWithSpace =
      hasLowerPrint && /["']Hello! I am\s+["']/.test(code);

    const checks = [hasName, hasLowerPrint, usesGluePlus, includesHelloWithSpace];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) =>
    /\bname\s*=\s*["'][^"']+["']/.test(code) &&
    code.includes("print(") &&
    code.includes("+") &&
    !code.includes("Print("),

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Your AI introduced itself correctly. 🎉")
      : asTerminal(
          "❌ Almost! Make sure you have name = \"...\" and print(\"Hello! I am \" + name). Also check that print is lowercase."
        ),
};

export default function Lesson1Page() {
  return <LessonCanvas lesson={lesson1} />;
}

