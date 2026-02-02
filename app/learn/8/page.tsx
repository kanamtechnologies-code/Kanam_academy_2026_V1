"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson8: LessonConfig = {
  id: "lesson-8",
  title: "8. AI Remembers Choices",
  goal: "Use a list to remember multiple choices over time.",
  xpReward: 450,
  badge: "🧺 Memory Builder",

  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, build a program that stores answers in a list, then removes one item and prints the list again.",
  assignmentChecklist: [
    "Create an empty list (choices = []).",
    "Ask the user a question using input().",
    "Add the answer to the list using choices.append(...).",
    "Print the list to see what the bot remembers.",
    "Remove one item from the list (choices.remove(...)).",
    "Print the list again to see how memory changed.",
  ],

  starterCode: `# Fill in the blanks 👇
choices = []

choice = input("Tell me one thing you like: ")
choices.append(____)
print(choices)

# remove the same item you added
choices.remove(____)
print(choices)
`,

  instructorScript:
    "Coach’s note:\nSo far, your bot has been able to remember one thing at a time.\n\nThat’s because we’ve been using ==variables==.\n\nA variable is like one labeled box.\nIt can only hold one value.\n\nToday, you’re going to help your bot remember more than one thing.\nThat’s where ==lists== come in.\n\nA list is like a row of boxes instead of just one.\nEach box can hold a piece of information.\n\nHere’s what list memory can look like:\n`choices = []`\n`choices.append(\"pizza\")`\n`choices.append(\"soccer\")`\n`print(choices)`\n`choices.remove(\"pizza\")`\n`print(choices)`\n\nHere’s how to think like a coder today:\n- A ==variable== remembers one thing\n- A ==list== remembers many things\n- You decide what gets added and what gets removed\n\nNothing is automatic.\nYour bot only remembers what you tell it to remember.\n\nMini goal:\nMake your bot remember multiple choices by saving them in a list.\n\nRead the steps, follow them in order, then press [[Run]].",

  kidExplain: [
    {
      title: "What is a List?",
      text:
        "A list is a place to store more than one value. Instead of remembering just one thing, your bot can now remember many things together.",
    },
    {
      title: "Variable vs List",
      text:
        "A variable is one labeled box. A list is like a row of boxes. Lists are how programs can remember multiple pieces of information.",
    },
    {
      title: "Memory changes behavior",
      text:
        "What a bot remembers affects what it can do later. Humans decide what gets saved and what gets forgotten.",
    },
  ],

  steps: [
    "Create an empty list to store choices.",
    "Ask the user a question using input().",
    "Add the user’s answer to the list.",
    "Print the list to see what the bot remembers.",
    "Remove one item from the list.",
    "Print the list again to see how memory changed.",
    "Common mistake: If the list never changes, make sure you actually added or removed an item.",
  ],

  cfu: [
    {
      question: "How is a list different from a variable?",
      answer: "A variable holds one value. A list can hold many values together.",
    },
    {
      question: "Why might a bot need to remember more than one thing?",
      answer: "So it can keep track of past choices and use them later.",
    },
    {
      question: "What happens when you remove an item from a list?",
      answer: "That item is deleted from the list, so the memory changes.",
    },
  ],

  tryThis: [
    "Add more than one answer to the list (ask two questions).",
    "Remove a different item.",
    "Challenge: Explain why remembering everything could be a problem.",
  ],

  aiSafetyMoment:
    "AI safety: Memory is powerful — and that means it comes with responsibility. Humans must decide what is okay to remember, what should be forgotten, and what should never be saved.",

  editorPlaceholder:
    '# From scratch idea:\n# choices = []\n# choice = input("Tell me one thing you like: ")\n# choices.append(choice)\n# print(choices)\n# choices.remove(choice)\n# print(choices)\n',

  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/7",
  nextHref: "/learn/9",

  runtimeInputs: [
    {
      key: "choice",
      label: 'Pretend you typed for: input("Tell me one thing you like: ")',
      placeholder: "pizza",
      defaultValue: "pizza",
    },
  ],

  getRunOutput: () => asTerminal("Press Run to see your list memory change."),

  computeProgressPercent: (code, submitted) => {
    const hasListInit = /^\s*choices\s*=\s*\[\]\s*$/m.test(code);
    const hasInput = /\bchoice\s*=\s*input\(/.test(code) || /\binput\(/.test(code);
    const hasAppend = /\bchoices\.append\(/.test(code);
    const hasPrint1 = /\bprint\s*\(\s*choices\s*\)/.test(code);
    const hasRemove = /\bchoices\.(remove|pop)\(/.test(code);
    const hasPrint2 = (code.match(/\bprint\s*\(\s*choices\s*\)/g) ?? []).length >= 2;
    const checks = [hasListInit, hasInput, hasAppend, hasPrint1, hasRemove, hasPrint2];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) =>
    /^\s*choices\s*=\s*\[\]\s*$/m.test(code) &&
    /\bchoices\.append\(/.test(code) &&
    /\bprint\s*\(\s*choices\s*\)/.test(code) &&
    /\bchoices\.(remove|pop)\(/.test(code) &&
    (code.match(/\bprint\s*\(\s*choices\s*\)/g) ?? []).length >= 2 &&
    !code.includes("Print("),

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Your AI stored and updated memory using a list. 🧠")
      : asTerminal(
          "❌ Almost! Make sure you created choices = [], added an item with choices.append(...), printed the list, removed an item, and printed the list again. Also check print is lowercase."
        ),
};

export default function Lesson8Page() {
  return <LessonCanvas lesson={lesson8} />;
}

