 "use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson1: LessonConfig = {
  title: "1. My First AI Helper",
  goal: "Teach your computer to introduce itself using Python!",
  xpReward: 50,
  badge: "🤖 The Awakener",
  starterCode: `# 1. Create the 'memory box' (Variable)
name = "Kanam"

# 2. Make the AI introduce itself 
# Remember: Python needs a space ' ' inside the quotes to separate words!
print("Hello! I am " + name)
`,
  instructorScript:
    "Think of a variable like a labeled box. We're putting a name inside so our AI remembers who it’s talking to. To start, we need to give our computer its very first memory. Read the steps, write your code on the right, then press Run to see the output!",
  kidExplain: [
    {
      title: "What is a Variable?",
      text:
        'A **variable** is a labeled box that holds information. In `name = "Kanam"`, the label is `name` and the value inside is `"Kanam"`.',
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
  ],
  steps: [
    'Assign a Value: Create a variable called `name` and set it equal to your name in quotes (e.g., `name = "Alex"`).',
    'Combine and Print: Use `print()` to combine the text `"Hello! I am "` with your `name` variable using a `+`.',
    "Run: Press the Run button to see your AI speak in the console.",
    "Common mistake: `print` must be lowercase. `Print` with a capital P will cause an error!",
  ],
  cfu: [
    {
      question: 'Why do we need a space inside the quotes like "Hello! "?',
      answer:
        "Python is literal. Without the space, it would look like: Hello!Kanam",
    },
    {
      question:
        'What happens if you try to print name without quotes? What if you print "name" with quotes?',
      answer:
        "Without quotes, it prints the value inside the box. With quotes, it prints the word name.",
    },
    {
      question: 'Can a variable name have a space, like "my name"?',
      answer:
        "No. Use an underscore instead, like my_name.",
    },
  ],
  tryThis: [
    'The Swap: Change "Kanam" to your favorite superhero’s name.',
    'The Mood Bot: Create a new variable `mood = "happy"` and add a line to print it!',
    "Bonus: Try to print one sentence using TWO variables at once (like name and mood).",
  ],
  aiSafetyMoment:
    "Remember: AI doesn't have feelings, it's just very good at following patterns!",
  editorPlaceholder:
    '# Try typing:\n# name = "Alex"\n# print("Hello! I am " + name)\n',
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
        `Hello! I am ${nameValue}\n\n(MVP note: output is hardcoded, but it will reflect your name.)`
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

