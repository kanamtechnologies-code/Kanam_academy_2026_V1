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
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson your bot learned to remember many things in a list. But a list has a problem: it doesn't know what each item *means*. Today you'll fix that with **organized memory**.\n\nHere's your roadmap for this lesson:\n\n• **Dictionaries** — memory that uses labels instead of just positions.\n• **Keys and values** — each piece of info gets a name (a \`key\`) and data (a \`value\`).\n• Reading information back by its key.\n• Building a profile your bot can drop into sentences.\n\nA dictionary is the tool every app uses to keep your information neat and instantly findable.`,
        image: "/images/lessons/py-9-dictionary.png",
        imageAlt: "A cabinet of labeled drawers, each holding a different item",
        callout: {
          label: "Why it matters",
          text: "Your social media profile (name, bio, follower count), a game character's stats (health, level, score), and a phone contact card are all dictionaries — labeled information the app can look up instantly.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "Why labels beat positions",
        body: `A list remembers many things, but it remembers them by **position** — item 0, item 1, item 2. That's fine for a simple row, but it gets confusing fast. Was the email in position 2 or position 3?\n\nA **dictionary** fixes this by giving every value a **label**. Instead of "the thing in position 2," you ask for \`profile["email"]\`. The label tells you — and anyone reading your code — exactly what the value means.\n\nPicture a cabinet of labeled drawers: one drawer \`"name"\`, one \`"age"\`, one \`"favorite_color"\`. You never count — you just read the label and open the right drawer.`,
        callout: {
          label: "Common misconception",
          text: "A dictionary doesn't keep things in number order the way a list does. You don't look things up by position (`profile[0]`) — you look them up by their **key** (`profile[\"name\"]`).",
        },
      },
      {
        id: "keyvalue",
        kicker: "Building block #1",
        title: "Keys and values",
        body: `A dictionary uses **curly braces** \`{}\` instead of square brackets. Each entry is a pair: a **key** (the label) and a **value** (the information it points to).\n\nYou store a value by writing its key in square brackets and assigning to it: \`profile["name"] = "Alex"\`. Read that as *"in the profile, set the name drawer to Alex."*\n\nLater, you get the value back by using the same key. The key is how you both **save** and **find** information.`,
        code: `profile = {}\nprofile["name"] = "Alex"\nprofile["favorite_color"] = "blue"\nprint("Name: " + profile["name"])`,
        codeCaption: "Labeled memory in action",
        output: `Name: Alex`,
        callout: {
          label: "Watch out",
          text: "Curly braces `{}` make a dictionary; square brackets `[]` make a list. Mixing them up is one of the most common beginner slip-ups.",
        },
      },
      {
        id: "read",
        kicker: "Building block #2",
        title: "Read a value back by its key",
        body: `Once a value is stored, you read it back by its key — \`profile["name"]\` hands you \`"Alex"\`. You can drop that straight into a sentence with \`+\`, just like you joined strings in earlier lessons.\n\nThis is exactly how apps personalize what you see: they look up your stored info by its label and slot it into a message like *"Welcome back, Alex!"*`,
        code: `profile = {}\nprofile["name"] = "Alex"\nprint("Welcome back, " + profile["name"] + "!")`,
        codeCaption: "Use a stored value inside a friendly message",
        output: `Welcome back, Alex!`,
        callout: {
          label: "Pro tip",
          text: "Reading a value with `profile[\"name\"]` does **not** remove it — the value stays in the dictionary so you can use it again and again.",
        },
      },
      {
        id: "exact",
        kicker: "Gotcha",
        title: "Keys must match exactly",
        body: `Python is **literal** — it matches keys *exactly*. To read a value, you must spell the key the same way you stored it: same letters, same capitalization, same quotes. \`profile["Name"]\` and \`profile["name"]\` are two completely different keys to Python.\n\nIf you ask for a key that doesn't exist, Python stops and shows a **KeyError**. That's not the computer being mean — it's telling you the label it was asked for isn't on any drawer.`,
        bullets: [
          "`{}` makes an empty dictionary.",
          "`profile[\"key\"] = value` stores a labeled value.",
          "`profile[\"key\"]` reads it back — spelling and quotes must match.",
        ],
        callout: {
          label: "Common misconception",
          text: "A `KeyError` almost always means a typo or a capitalization mismatch in your key — not that your data disappeared. Check the spelling first.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build a profile, step by step",
        body: `Let's build a character profile from scratch and use it in a sentence.\n\n**Step 1 — Start empty.** Make an empty dictionary called \`profile\` with \`{}\`.\n\n**Step 2 — Add labeled info.** Store two key–value pairs: a name and a favorite color.\n\n**Step 3 — Use it.** Read values back by their keys and join them into a friendly message with \`+\`.`,
        code: `# Step 1: empty labeled memory\nprofile = {}\n\n# Step 2: store two labeled values\nprofile["name"] = "Alex"\nprofile["favorite_color"] = "blue"\n\n# Step 3: use stored values in a sentence\nprint(profile["name"] + "'s favorite color is " + profile["favorite_color"] + ".")`,
        codeCaption: "The full profile, with comments explaining each step",
        output: `Alex's favorite color is blue.`,
        callout: {
          label: "Pro tip",
          text: "You can store as many key–value pairs as you like. Real apps keep dozens of them in a single profile dictionary.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned to build **organized memory**: a dictionary with \`{}\`, **keys** as labels, and **values** as the info they point to.\n\nIn the exercises you'll create a dictionary, store at least two labeled values, then use one inside a sentence your bot prints.\n\nClick **Start the exercises** when you're ready.`,
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
