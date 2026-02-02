"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson9: LessonConfig = {
  id: "lesson-9",
  title: "9. Organizing Memory",
  goal: "Use a dictionary (key → value) to store information with meaning.",
  xpReward: 500,
  badge: "🗂️ Memory Organizer",

  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, create an empty dictionary, store at least two labeled pieces of info, then print a sentence using one value accessed by its key.",
  assignmentChecklist: [
    "Create an empty dictionary: profile = {}",
    "Add at least two key–value pairs (labels and values).",
    'Print one value by accessing it with a key (example: profile["name"]).',
    "Use that value inside a sentence your bot prints.",
    "Common mistake: if Python says a key doesn’t exist, check spelling + quotation marks.",
  ],

  starterCode: `# Fill in the blanks 👇
# A dictionary looks like this (labels → values):
# example = {
#   "name": "Alex",
#   "favorite_color": "blue",
# }

profile = {}

profile["____"] = "____"
profile["____"] = "____"

print("Name: " + profile["____"])
`,

  instructorScript:
    "Coach’s note:\nYour bot can remember multiple things now.\n\nBut there’s a problem.\nIf information is just a ==list==, the bot doesn’t know what each item means.\nIt’s like having a backpack full of stuff with no labels.\n\nToday, we fix that.\nA ==dictionary== lets your bot store information with labels.\n\nThink of a dictionary like a set of labeled drawers:\n- One drawer is labeled `\"name\"`\n- Another is labeled `\"age\"`\n- Another might be `\"favorite_color\"`\n\nEach label points to the right information.\n\nHere’s what a dictionary can look like:\n```\nprofile = {}\nprofile[\"name\"] = \"Alex\"\nprofile[\"favorite_color\"] = \"blue\"\nprint(\"Name: \" + profile[\"name\"])\n```\n\nHere’s how to think like a coder today:\n- The ==key== is the label\n- The ==value== is the information\n- Together, they make ==organized memory== useful\n\nImportant things to remember:\n- Dictionaries use curly braces: `{}`\n- Keys must be written exactly the same every time (Python is ==literal==)\n- Python will not guess what you meant\n\nMini goal:\nCreate organized memory and use it to make your bot respond clearly.\n\nRead the steps, follow the order, then press [[Run]].",

  kidExplain: [
    {
      title: "What is a Dictionary?",
      text:
        "A **dictionary** stores information using labels. Each piece of information has a **key** (label) and a **value** (data).",
    },
    {
      title: "Why organized memory matters",
      text:
        "Organized memory helps AI systems give clear answers, avoid confusion, and respond more accurately.",
    },
  ],

  steps: [
    "Create an empty dictionary to store organized memory: `profile = {}`",
    "Add at least two pieces of information using key–value pairs.",
    "Print one value by accessing it with its key.",
    "Use that value inside a sentence your bot prints.",
    "Press [[Run]] and read the console carefully.",
  ],

  cfu: [
    {
      question: "Why is a dictionary better than a list for organized memory?",
      answer:
        "Because keys label what each value means. With a list, you just have items with no labels, which can be confusing.",
    },
    {
      question: "What is the difference between a key and a value?",
      answer: "A key is the label. A value is the information stored under that label.",
    },
    {
      question: "What happens if you try to use a key that doesn’t exist?",
      answer:
        "Python throws an error (a KeyError). That usually means your key is misspelled or missing quotes.",
    },
  ],

  tryThis: [
    "Add another key–value pair.",
    "Change a value and re-run the program.",
    "Print a sentence using two values from the dictionary.",
  ],

  aiSafetyMoment:
    "AI safety: Organized memory makes AI systems more powerful. Mistakes in labels or data can cause problems. Responsible AI means choosing labels carefully, checking stored information, and not saving things that shouldn’t be saved.",

  editorPlaceholder:
    '# From scratch idea:\n# profile = {}\n# profile["name"] = "Alex"\n# profile["favorite_color"] = "blue"\n# print("Hello, " + profile["name"])\n',

  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/8",
  nextHref: "/learn/10",

  getRunOutput: () => asTerminal("Press Run to see your organized memory (dictionary) in action."),

  computeProgressPercent: (code, submitted) => {
    const hasDictInit = /^\s*profile\s*=\s*\{\}\s*$/m.test(code);
    const sets = (code.match(/\bprofile\[\s*["'][^"']+["']\s*\]\s*=\s*/g) ?? []).length;
    const hasTwoSets = sets >= 2;
    const hasGet = /\bprofile\[\s*["'][^"']+["']\s*\]/.test(code);
    const hasPrint = /\bprint\s*\(/.test(code);
    const usesPlus = code.includes("+");
    const checks = [hasDictInit, hasTwoSets, hasGet, hasPrint, usesPlus];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) =>
    /^\s*profile\s*=\s*\{\}\s*$/m.test(code) &&
    (code.match(/\bprofile\[\s*["'][^"']+["']\s*\]\s*=\s*/g) ?? []).length >= 2 &&
    /\bprint\s*\([\s\S]*profile\[\s*["'][^"']+["']\s*\][\s\S]*\)/.test(code) &&
    !code.includes("Print("),

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! You organized memory using a dictionary. 🗂️")
      : asTerminal(
          "❌ Almost! Make sure you have profile = {}, at least two key–value pairs, and a print(...) that uses profile[\"...\"] inside a sentence. Also check print is lowercase."
        ),
};

export default function Lesson9Page() {
  return <LessonCanvas lesson={lesson9} />;
}

