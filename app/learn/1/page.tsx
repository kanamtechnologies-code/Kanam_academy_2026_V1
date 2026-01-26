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
  badge: "First Spark",
  starterCode: '# Write your code below\nname = "Kanam"\n',
  instructorScript:
    "Think of a variable like a labeled box. We're putting a name inside so our AI remembers who it’s talking to.",
  kidExplain: [
    {
      title: "What is a variable?",
      text:
        'A **variable** is like a labeled box that holds something. The label is the variable name (like `name`). Inside the box is the value (like `"Kanam"`).',
    },
    {
      title: 'What do quotes "" mean?',
      text:
        'Quotes tell Python: “This is **text**.” Text is also called a **string**. So `"Kanam"` is a string.',
    },
    {
      title: "What does print(...) do?",
      text:
        "`print(...)` tells Python to show something on the screen (in the Output panel). It’s like your computer speaking out loud!",
    },
    {
      title: "Why do we use + here?",
      text:
        'The `+` joins (connects) pieces of text together. So `"Hello! I am " + name` becomes one message.',
    },
  ],
  steps: [
    'Create a variable: `name = "Kanam"`',
    'Print a message: `print("Hello! I am " + name)`',
    "Press Run to see what happens.",
  ],
  cfu: [
    {
      question: 'What do quotes "" tell Python?',
      answer: "It’s text (a string).",
    },
    {
      question: "What happens if you remove the + sign?",
      answer: "You get an error (Python can’t combine them like that).",
    },
    {
      question: 'What does this do?  name = "Kanam"',
      answer: 'It puts the text "Kanam" inside a variable (a labeled box) called name.',
    },
    {
      question: "What does print(...) do?",
      answer: "It shows words on the screen (in the Output).",
    },
  ],
  tryThis: [
    'Change "Kanam" to your name.',
    'Try printing: "Hello!" on one line and your name on the next line.',
    'Try: print("Nice to meet you, " + name)',
  ],
  aiSafetyMoment:
    "Remember: AI doesn't have feelings, it's just very good at following patterns!",
  editorPlaceholder: '# Try typing:\n# print("Hello! I am " + name)\n',
  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/",
  nextHref: "/learn/2",

  getRunOutput: (code) => {
    if (code.includes("print(")) {
      return asTerminal(
        'Hello! I am Kanam\n\n(MVP note: output is hardcoded when your code contains print().)'
      );
    }
    return asTerminal("(no output)\nTip: add print(...) to see output.");
  },

  computeProgressPercent: (code, submitted) => {
    const hasName =
      /\bname\s*=\s*["'][^"']+["']/.test(code) || /\bname\s*=/.test(code);
    const hasPrint = code.includes("print(");
    const hasHelloMessage =
      /print\(\s*["'].*hello/i.test(code) &&
      (code.includes("+") || code.includes("name"));

    const checks = [hasName, hasPrint, hasHelloMessage];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) => code.includes("print("),
  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Nice work — you used print().")
      : asTerminal("❌ Not quite — add a print(...) and try Submit again."),
};

export default function Lesson1Page() {
  return <LessonCanvas lesson={lesson1} />;
}

