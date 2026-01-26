 "use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson2: LessonConfig = {
  title: "2. Magic Sentences (f-strings)",
  goal: "Make Python mix words + variables using a superpower called an f-string!",
  xpReward: 60,
  badge: "String Wizard",
  starterCode: '# Write your code below\nname = "Kanam"\n',
  instructorScript:
    "In Lesson 1 you used + to join text. Now we’ll learn an even easier way: an f-string. It’s like a magic sentence where you can drop a variable right into the middle!",
  kidExplain: [
    {
      title: "What is an f-string?",
      text:
        'An **f-string** starts with the letter **f** before the quotes, like `f"Hello {name}"`. It lets you put variables inside curly braces `{ }`.',
    },
    {
      title: "What do the curly braces { } do?",
      text:
        "Curly braces tell Python: “Put the variable’s value here.” So `{name}` becomes whatever is inside the variable `name`.",
    },
    {
      title: "Why is this helpful?",
      text:
        "It’s easier to read than using +, and it helps you build messages like a pro.",
    },
    {
      title: "Remember",
      text:
        "You still need `print(...)` to show the message in the Output.",
    },
  ],
  steps: [
    'Make sure you have: `name = "Kanam"`',
    'Write an f-string print: `print(f"Hello! I am {name}")`',
    "Press Run to see it in the Output.",
    "Press Submit when you see it working.",
  ],
  cfu: [
    {
      question: 'What does the "f" do in f"Hello {name}"?',
      answer: "It turns the string into an f-string so { } will work.",
    },
    {
      question: "What do the braces { } mean?",
      answer: "They tell Python to insert a variable’s value there.",
    },
    {
      question: 'What will print(f"Hi {name}") show if name = "Kanam"?',
      answer: "It will show: Hi Kanam",
    },
    {
      question: "What happens if you forget print(...) ?",
      answer: "Nothing shows up in Output (because you didn’t tell Python to print).",
    },
  ],
  tryThis: [
    'Change the message to: print(f"Welcome, {name}!")',
    "Add an emoji: print(f\"Hello {name} 🙂\")",
    "Make a second variable: age = 10, then print(f\"I am {age} years old\")",
  ],
  aiSafetyMoment:
    "Remember: AI can sound confident even when it’s wrong. Always test your code and double-check important facts!",
  editorPlaceholder: '# Try typing:\n# print(f"Hello! I am {name}")\n',
  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/1",
  nextHref: undefined,

  getRunOutput: (code) => {
    const hasPrint = code.includes("print(");
    if (!hasPrint) return asTerminal("(no output)\nTip: add print(...) to see output.");

    const usesFString =
      /print\(\s*f["']/.test(code) && /\{\s*name\s*\}/.test(code);

    if (usesFString) {
      return asTerminal(
        "Hello! I am Kanam\n\n(MVP note: output is hardcoded, but you unlocked f-strings!)"
      );
    }

    return asTerminal(
      "Nice! I see print(...).\nNow try an f-string like: print(f\"Hello! I am {name}\")"
    );
  },

  computeProgressPercent: (code, submitted) => {
    const hasName =
      /\bname\s*=\s*["'][^"']+["']/.test(code) || /\bname\s*=/.test(code);
    const hasPrint = code.includes("print(");
    const usesFString =
      /print\(\s*f["']/.test(code) && /\{\s*name\s*\}/.test(code);

    const checks = [hasName, hasPrint, usesFString];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) =>
    /print\(\s*f["']/.test(code) && /\{\s*name\s*\}/.test(code),

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! You used an f-string with {name}. Amazing!")
      : asTerminal(
          '❌ Almost! Use an f-string like: print(f"Hello! I am {name}")'
        ),
};

export default function Lesson2Page() {
  return <LessonCanvas lesson={lesson2} />;
}

