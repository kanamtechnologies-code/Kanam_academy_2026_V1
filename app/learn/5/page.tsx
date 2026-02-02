"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson5: LessonConfig = {
  id: "lesson-5",
  title: "5. AI Repeats Tasks",
  goal: "Use a for loop to repeat instructions a specific number of times.",
  xpReward: 300,
  badge: "🔁 Loop Starter",
  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, make your AI helper print the same message 5 times using a for loop.",
  assignmentChecklist: [
    "Start a for loop that runs 5 times using range(5).",
    "Put a print(...) line inside the loop (indented).",
    "Press Run and confirm the message prints 5 times.",
    "Common mistake: if it prints once, your indentation is wrong.",
  ],
  starterCode: `# Fill in the blanks 👇
for i in range(____):
    print("KanamBot: ____")
`,
  instructorScript:
    "Coach’s note:\nSo far, your bot can talk, listen, and make choices.\n\nToday, you’re giving it a new superpower: **repetition**.\n\nComputers and AI systems are great at doing the same thing again and again without getting tired.\nWhen we tell a program to repeat something, we use a ==loop==.\n\nA loop is like saying:\n\n“Do this exact action…\nthen do it again…\nand again…\na specific number of times.”\n\nIn this lesson, you’ll use a `for` loop to control repetition.\n\nHere’s how to think like a coder today:\n\nFirst, tell Python how many times you want something to repeat.\n\nThen, tell Python what action should repeat.\n\nPython will handle the counting for you.\n\nImportant things to remember:\n\nA `for` loop line must end with a ==colon (:)==.\n\nAnything that should repeat must be ==indented== underneath the loop.\n\nIf a line is not indented, it only runs one time.\n\nTwo super common mistakes (and how to fix them):\n\nMissing the ==colon (:)== → Python doesn’t know where the loop starts.\n\nForgetting ==indentation== → Your message prints only once.\n\nMini goal:\nMake your bot say the same message multiple times using a ==loop==.\n\nRead the steps, fill in the blanks, then press [[Run]].",
  kidExplain: [
    {
      title: "What is a Loop?",
      text:
        "A loop tells Python to repeat instructions. Instead of writing the same line again and again, you write it once and let the loop repeat it.",
    },
    {
      title: "The for Loop",
      text:
        "A `for` loop repeats code a specific number of times. It’s perfect when you know how many repeats you want.",
    },
    {
      title: "range()",
      text:
        "range(5) means “count from 0 up to (but not including) 5.” That means the loop runs 5 times.",
    },
    {
      title: "Indentation",
      text:
        "Anything indented under the loop runs again and again. If it’s not indented, it only runs once.",
    },
  ],
  steps: [
    "Start a for loop that runs 5 times using range(5).",
    "Inside the loop, use print() to show a message from your bot.",
    "Make sure the print line is indented.",
    "Press Run and read the console carefully.",
    "Common mistake: If your message only prints once, your indentation is wrong.",
  ],
  cfu: [
    {
      question: "Why do we use a loop instead of writing the same print line over and over?",
      answer:
        "Because loops repeat code for us. It saves time and prevents mistakes from copying the same line many times.",
    },
    {
      question: "What does range(5) tell Python to do?",
      answer: "It tells Python to run the loop 5 times (counting 0,1,2,3,4).",
    },
    {
      question: "What happens if the print line is not indented under the loop?",
      answer: "It will only run once, because it’s not inside the loop.",
    },
  ],
  tryThis: [
    "Change the count: make the loop run 3 times, then 10 times.",
    "Personal loop: include your name in the message.",
    "Challenge: store the message in a variable and print it inside the loop.",
  ],
  aiSafetyMoment:
    "AI safety: AI repeats patterns very well — that’s its strength. But if instructions are wrong, it will repeat the wrong thing perfectly. Humans are responsible for writing clear instructions.",
  editorPlaceholder:
    '# From scratch idea:\n# for i in range(5):\n#     print("KanamBot: Hello!")\n',
  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/4",
  nextHref: "/learn/6",
  initialOutputBody: "Press Run to see output here.",

  getRunOutput: (code) => {
    // The LessonCanvas runner will execute the code; this is only used as a required field.
    // Keep it helpful in case we ever use it again.
    return asTerminal("Press Run to execute your loop and see repeated output.");
  },

  computeProgressPercent: (code, submitted) => {
    const hasFor = /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(/.test(code);
    const hasRange5 = /\brange\s*\(\s*5\s*\)/.test(code);
    const hasColon = /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\([^)]*\)\s*:\s*/.test(code);
    const hasPrint = /\bprint\s*\(/.test(code);
    const hasIndentedPrint = /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\([^)]*\)\s*:[^\n]*\n[ \t]+print\(/.test(code);

    const checks = [
      hasFor,
      hasRange5,
      hasColon,
      hasPrint,
      hasIndentedPrint,
    ];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) =>
    /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/.test(code) &&
    /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\([^)]*\)\s*:[^\n]*\n[ \t]+print\(/.test(code) &&
    !code.includes("Print("),

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Your AI repeated a task using a for loop. 🏁")
      : asTerminal(
          "❌ Almost! Make sure you have a for loop with range(5), a colon (:), and an indented print(...) line. Also check print is lowercase."
        ),
};

export default function Lesson5Page() {
  return <LessonCanvas lesson={lesson5} />;
}

