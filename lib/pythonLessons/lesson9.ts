import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function profileSets(code: string): number {
  return (code.match(/\bprofile\[\s*["'][^"']+["']\s*\]\s*=\s*/g) ?? []).length;
}

export const lesson9: PythonLessonConfig = {
  id: "lesson-9",
  title: "9. Organizing Memory",
  goal: "Use a dictionary (key → value) to store information with meaning.",
  xpReward: 500,
  badge: "🗂️ Memory Organizer",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  prevHref: "/learn/8",
  nextHref: "/learn/10",
  instructorScript:
    "**Coach's note**:\nYour bot can remember multiple things now.\n\nBut there's a problem.\nIf information is just a ==list==, the bot doesn't know what each item means.\nIt's like having a backpack full of stuff with no labels.\n\nToday, we fix that.\nA ==dictionary== lets your bot store information with labels.\n\nThink of a dictionary like a set of labeled drawers:\n- One drawer is labeled `\"name\"`\n- Another is labeled `\"age\"`\n- Another might be `\"favorite_color\"`\n\nEach label points to the right information.\n\nHere's what a dictionary can look like:\n```\nprofile = {}\nprofile[\"name\"] = \"Alex\"\nprofile[\"favorite_color\"] = \"blue\"\nprint(\"Name: \" + profile[\"name\"])\n```\n\nHere's how to think like a coder today:\n- The ==key== is the label\n- The ==value== is the information\n- Together, they make ==organized memory== useful\n\nImportant things to remember:\n- Dictionaries use curly braces: `{}`\n- Keys must be written exactly the same every time (Python is ==literal==)\n- Python will not guess what you meant\n\n**Mini goal**:\nCreate organized memory and use it to make your bot respond clearly.\n\nRead the steps, follow the order, then press [[Run]].",
  commandReference: [
    {
      command: "profile = {}",
      summary: "Creates an empty dictionary — labeled memory with no entries yet.",
      example: 'profile = {}',
    },
    {
      command: 'profile["key"] = value',
      summary: "Stores a labeled piece of information. The key is the label, the value is the data.",
      example: 'profile["name"] = "Alex"',
    },
    {
      command: 'profile["key"]',
      summary: "Reads a value back using its label (key). Spelling and quotes must match exactly.",
      example: 'profile["name"]',
    },
    {
      command: 'print("text " + profile["key"])',
      summary: "Use + to build a sentence that includes a dictionary value.",
      example: 'print("Name: " + profile["name"])',
    },
  ],
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
      question: "What happens if you try to use a key that doesn't exist?",
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
    "AI safety: Organized memory makes AI systems more powerful. Mistakes in labels or data can cause problems. Responsible AI means choosing labels carefully, checking stored information, and not saving things that shouldn't be saved.",
  lessonModule: {
    durationLabel: "~5 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "Organize your AI's memory with labels",
        body: `A list remembers many things — but it doesn't know what each item *means*. It's like a backpack full of stuff with no labels.\n\nToday you'll use a **dictionary**: memory with **labels**. Think of a set of labeled drawers — one drawer \`"name"\`, one \`"age"\`, one \`"favorite_color"\` — where each label points straight to the right information.`,
        image: "/images/lessons/py-9-dictionary.png",
        imageAlt: "A cabinet of labeled drawers, each holding a different item",
        callout: {
          label: "Where you see it",
          text: "A contact card (name, phone, email), a game character's stats (health, level, score), and your account profile are all dictionaries — labeled values.",
        },
      },
      {
        id: "keyvalue",
        kicker: "Building block",
        title: "Keys and values",
        body: `A dictionary uses **curly braces** \`{}\`. Each entry is a **key** (the label) paired with a **value** (the information). You store a value by its key, and read it back by the same key.`,
        code: `profile = {}\nprofile["name"] = "Alex"\nprofile["favorite_color"] = "blue"\nprint("Name: " + profile["name"])`,
        codeCaption: "Labeled memory in action",
        output: `Name: Alex`,
      },
      {
        id: "exact",
        kicker: "Gotcha",
        title: "Keys must match exactly",
        body: `Python is **literal**. To read a value you must spell the key *exactly* the same — same letters, same quotes. \`profile["Name"]\` is not the same as \`profile["name"]\`.\n\nA wrong or missing key causes a **KeyError**.`,
        bullets: [
          "`{}` makes an empty dictionary.",
          "`profile[\"key\"] = value` stores a labeled value.",
          "`profile[\"key\"]` reads it back — spelling and quotes must match.",
        ],
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Build an organized profile",
        body: `In the exercises you'll create a dictionary, store at least two labeled values, then use one inside a sentence your bot prints.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  exercises: [
    {
      id: "ex-empty-dict",
      title: "Exercise 1 — Create a dictionary",
      focusCommand: "profile = {}",
      commandExplain:
        "An empty dictionary `{}` is organized memory waiting for labels. Start every profile here.",
      goal: "Create an empty dictionary called profile.",
      starterCode: `# Fill in the blank 👇
profile = ____
`,
      hint: "Type empty curly braces: {}",
      successMessage: "Nice! profile = {} is your empty labeled memory.",
      failureMessage: "Create an empty dictionary: profile = {}",
      validate: (code: string) => {
        if (rejectsUppercasePrint(code)) return false;
        return /^\s*profile\s*=\s*\{\}\s*$/m.test(code);
      },
    },
    {
      id: "ex-set-pairs",
      title: "Exercise 2 — Add key–value pairs",
      focusCommand: 'profile["key"] = value',
      commandExplain:
        "Each key–value pair is one labeled drawer. Add at least two so your bot remembers more than one thing.",
      goal: "Add at least two key–value pairs to profile.",
      starterCode: `# Fill in the blanks 👇
profile = {}

profile["____"] = "____"
profile["____"] = "____"
`,
      hint: 'Try keys like "name" and "favorite_color" with string values in quotes.',
      successMessage: "Great! You stored two labeled pieces of information.",
      failureMessage:
        "Need profile = {} plus at least two lines like profile[\"key\"] = \"value\".",
      validate: (code: string) => {
        if (rejectsUppercasePrint(code)) return false;
        return (
          /^\s*profile\s*=\s*\{\}\s*$/m.test(code) && profileSets(code) >= 2
        );
      },
    },
    {
      id: "ex-get-value",
      title: "Exercise 3 — Read by key",
      focusCommand: 'profile["key"]',
      commandExplain:
        "Access a stored value with its key inside square brackets. Python returns exactly what you saved.",
      goal: "Print one value from profile using its key.",
      starterCode: `# Fill in the blanks 👇
profile = {}
profile["name"] = "Alex"
profile["favorite_color"] = "blue"

print(profile["____"])
`,
      hint: 'Print profile["name"] or profile["favorite_color"].',
      successMessage: "Perfect! You read organized memory by its label.",
      failureMessage:
        'Add print(profile["..."]) using a key you stored. Expect output in the console.',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!/\bprint\s*\(\s*profile\[\s*["'][^"']+["']\s*\]\s*\)/.test(code)) {
          return false;
        }
        return run.stdout.length >= 1;
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Organized memory challenge",
      focusCommand: "{} + keys + print",
      commandExplain:
        "Put it together: empty dict, two labeled values, and a sentence that uses a stored value.",
      goal: "Build a full profile dict and print a sentence using one value.",
      starterCode: `# Fill in the blanks 👇
profile = {}

profile["____"] = "____"
profile["____"] = "____"

print("Name: " + profile["____"])
`,
      hint: 'Match your print key to a key you stored, e.g. profile["name"].',
      successMessage: "Submitted! You organized memory using a dictionary. 🗂️",
      failureMessage:
        'Need profile = {}, two key–value pairs, and print("... " + profile["..."]) with output.',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return (
          /^\s*profile\s*=\s*\{\}\s*$/m.test(code) &&
          profileSets(code) >= 2 &&
          /\bprint\s*\([\s\S]*profile\[\s*["'][^"']+["']\s*\][\s\S]*\)/.test(code) &&
          code.includes("+") &&
          run.stdout.length >= 1
        );
      },
    },
  ],
};
