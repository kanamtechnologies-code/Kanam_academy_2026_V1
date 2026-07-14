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
  badge: "Memory Organizer",
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
    durationLabel: "~20–25 min lesson",
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
        id: "hook-story",
        kicker: "Think about it",
        title: "A contact card, not a pile of sticky notes",
        body: `Imagine your phone's contact card for a friend: Name, Phone, Birthday, each clearly labeled. Now imagine instead you had a pile of sticky notes with just "555-1234" and "June 3" and no labels — you'd have to guess which note means what.\n\nA list is the pile of sticky notes. A dictionary is the labeled contact card. Today you'll learn to build the second kind of memory.`,
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `New vocabulary for this lesson.`,
        bullets: [
          "**Dictionary** — a container that stores information as key–value pairs, using curly braces `{}`.",
          "**Key** — the label used to store and find a value.",
          "**Value** — the actual piece of information stored under a key.",
          "**KeyError** — the error Python raises when you ask for a key that doesn't exist.",
        ],
      },
      {
        id: "concept-1",
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
        checkIn: {
          prompt: "Which symbol creates an empty dictionary?",
          choices: ["`{}`", "`[]`", "`()`"],
          correctIndex: 0,
          explanation: "Curly braces {} create a dictionary. Square brackets [] create a list.",
        },
      },
      {
        id: "concept-2",
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
        checkIn: {
          prompt: "After `profile[\"name\"] = \"Alex\"`, does `profile[\"name\"]` remove the value once read?",
          choices: ["Yes, it deletes it after reading", "No, it stays in the dictionary for reuse"],
          correctIndex: 1,
          explanation: "Reading a dictionary value doesn't remove it — you can read the same key as many times as you like.",
        },
      },
      {
        id: "concept-3",
        kicker: "Building block #3",
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
        checkIn: {
          prompt: 'If you stored `profile["Name"] = "Alex"`, what happens when you read `profile["name"]`?',
          choices: ["It works fine — Python ignores capitalization", "It returns an empty string", "It raises a KeyError, because \"Name\" and \"name\" are different keys"],
          correctIndex: 2,
          explanation: "Python keys are case-sensitive. \"Name\" and \"name\" are two different keys, so asking for the wrong one raises a KeyError.",
        },
      },
      {
        id: "worked-example",
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
        id: "misconception",
        kicker: "Common misconception",
        title: "Dictionaries aren't ordered by position",
        body: `A list remembers many things, but it remembers them by **position** — item 0, item 1, item 2. A common misconception is that dictionaries work the same way. They don't.\n\nA **dictionary** gives every value a **label**, not a position. Instead of "the thing in position 2," you ask for \`profile["email"]\`. You never count — you just read the label and open the right drawer.`,
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Predict the printed line",
        body: `Trace this snippet carefully. Pay attention to exactly which key gets read in the final print.`,
        code: `pet = {}\npet["name"] = "Rex"\npet["type"] = "dog"\nprint(pet["type"] + " named " + pet["name"])`,
        codeCaption: "What does the print statement output?",
        checkIn: {
          prompt: "What does this program print?",
          choices: ["dog named Rex", "Rex named dog", "type named name"],
          correctIndex: 0,
          explanation: 'pet["type"] is "dog" and pet["name"] is "Rex", so the print joins them as "dog named Rex".',
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "You can check if a key exists",
        body: `Before reading a key that might not exist, you can check first with \`in\`: \`if "email" in profile:\` runs the code inside only if that key is actually present. This avoids a \`KeyError\` crash and lets your program handle missing information gracefully.`,
        code: `profile = {}\nprofile["name"] = "Alex"\nif "email" in profile:\n    print(profile["email"])\nelse:\n    print("No email on file")`,
        codeCaption: "Check before you read",
        output: `No email on file`,
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "List vs. dictionary for the same data",
        body: `Compare storing a name and color in a list versus a dictionary. With a list, you must remember that position 0 is the name and position 1 is the color — easy to mix up. With a dictionary, the label tells you directly.`,
        code: `# List — must remember position 0 = name, 1 = color\ninfo = ["Alex", "blue"]\nprint(info[0])\n\n# Dictionary — the label says what it is\nprofile = {}\nprofile["name"] = "Alex"\nprofile["favorite_color"] = "blue"\nprint(profile["name"])`,
        codeCaption: "Dictionaries make intent explicit",
      },
      {
        id: "debug-habit",
        kicker: "Debugging habit",
        title: "Read the KeyError message carefully",
        body: `When Python raises a \`KeyError\`, it tells you exactly which key was missing. Read that message first — it usually points straight at a typo or a capitalization mismatch, saving you from guessing where the bug is.`,
        checkIn: {
          prompt: 'Your code crashes with `KeyError: \'Name\'` but you stored `profile["name"]`. What\'s the likely bug?',
          choices: [
            "The dictionary is broken and needs to be recreated",
            "A capitalization mismatch — you're reading \"Name\" but stored \"name\"",
            "Dictionaries can only hold one key",
          ],
          correctIndex: 1,
          explanation: "The KeyError message tells you exactly which key was missing — here it's a capitalization mismatch between \"Name\" and \"name\".",
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Keep key names short and consistent",
        body: `Use short, lowercase, consistent key names like \`"name"\`, \`"age"\`, \`"email"\` throughout your program. Consistent naming means you never have to stop and wonder whether you used \`"Name"\` or \`"name"\` somewhere else in your code.`,
        bullets: [
          "Use lowercase, consistent key names throughout a program.",
          "Check `\"key\" in dictionary` before reading a key that might be missing.",
          "Read KeyError messages carefully — they name the missing key directly.",
        ],
      },
      {
        id: "dict-update",
        kicker: "Level up",
        title: "Dictionaries can change after you create them",
        body: `A dictionary isn't frozen — you can **add** new keys and **update** existing values anytime using the same bracket syntax.\n\nThis is how a profile gets richer over time: start with a name, then add an age, then update the score after a game round.`,
        code: `profile = {"name": "Alex"}\nprofile["age"] = 14        # add a new key\nprofile["name"] = "Jordan" # update an existing key\nprint(profile)`,
        codeCaption: "Same syntax for adding and updating",
        output: `{'name': 'Jordan', 'age': 14}`,
        checkIn: {
          prompt: "What does `profile[\"score\"] = 100` do if `score` isn't in the dictionary yet?",
          choices: ["Crashes with an error", "Adds a new key called score with value 100", "Does nothing"],
          correctIndex: 1,
          explanation: "Assigning to a new key creates it. Dictionaries grow as you add labeled fields.",
        },
      },
      {
        id: "bug-walkthrough-key",
        kicker: "Bug walkthrough",
        title: "When a key typo causes a KeyError",
        body: `Dictionaries are strict about key names. \`profile["Name"]\` and \`profile["name"]\` are **two different keys** to Python — capitalization matters.\n\nWhen you get a \`KeyError\`, read the message carefully: it tells you exactly which key Python couldn't find. Nine times out of ten, it's a typo or capitalization mismatch.`,
        code: `profile = {"name": "Alex", "age": 14}\n\n# Safe read — check before accessing\nif "email" in profile:\n    print(profile["email"])\nelse:\n    print("No email on file yet")`,
        codeCaption: "Use `in` to check before reading an optional key",
        callout: {
          label: "Habit",
          text: "Pick one style (lowercase keys) and stick to it for the whole program — consistency prevents most KeyError bugs.",
        },
      },
      {
        id: "transfer-real-apps",
        kicker: "Transfer",
        title: "JSON configs are dictionaries in disguise",
        body: `When apps save settings — dark mode on/off, username, notification preferences — they often store them as a **dictionary** (or its close cousin, JSON).\n\nThe structure is identical to what you built:\n\`{"theme": "dark", "notifications": true, "username": "alex99"}\`\n\nEvery labeled field in a settings screen maps to one key in a dictionary. You're already reading the format real apps use.`,
      },
      {
        id: "reflection-prompt",
        kicker: "Reflect",
        title: "Think it through",
        body: `*Think about your phone's contact list. What labels (keys) does each contact have? Why would it be confusing if contacts were just stored as an unlabeled list of numbers and names?*`,
      },
      {
        id: "mini-case",
        kicker: "Real world",
        title: "Every app profile is a dictionary",
        body: `Your social media bio, a video game character sheet, and a shopping site's account settings are all dictionaries under the hood: labeled fields like \`"username"\`, \`"level"\`, or \`"shipping_address"\`, each holding a specific value the app can look up instantly by name.`,
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you build",
        body: `Let's confirm the dictionary pattern is locked in.`,
        checkIn: {
          prompt: "What's the key difference between a list and a dictionary?",
          choices: ["Lists use `{}`, dictionaries use `[]`", "There is no real difference", "Lists look up items by position; dictionaries look up items by a labeled key"],
          correctIndex: 2,
          explanation: "Lists are ordered and accessed by numeric position; dictionaries are accessed by a named key that describes what the value means.",
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
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill the dictionary blanks",
      focusCommand: "{} + keys",
      commandExplain:
        "Create a profile dictionary, store two labeled values, and print a sentence using one key. Fill every ____.",
      goal: "Fill the blanks to build organized memory and print a Name: line.",
      starterCode: `profile = ____

profile["____"] = "____"
profile["____"] = "____"

print("Name: " + profile["____"])`,
      solutionCode: `profile = {}

profile["name"] = "Alex"
profile["favorite_color"] = "blue"

print("Name: " + profile["name"])`,
      hint: 'Use {} for the dict, keys like "name" and "favorite_color", and match the print key.',
      successMessage: "You filled in labeled memory and used a key in a sentence.",
      failureMessage:
        'Need profile = {}, two key–value pairs, and print("Name: " + profile["..."]).',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return (
          /^\s*profile\s*=\s*\{\}\s*$/m.test(code) &&
          profileSets(code) >= 2 &&
          /\bprint\s*\([\s\S]*profile\[\s*["'][^"']+["']\s*\][\s\S]*\)/.test(code) &&
          code.includes("+") &&
          run.stdout.length >= 1 &&
          !run.error
        );
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the profile",
      focusCommand: "dictionary order",
      commandExplain:
        "Scrambled profile. Put empty dict, key–value pairs, then the print sentence in order.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      parsonsLines: [
        "profile = {}",
        'profile["name"] = "Alex"',
        'profile["favorite_color"] = "blue"',
        'print("Name: " + profile["name"])',
      ],
      solutionCode: `profile = {}
profile["name"] = "Alex"
profile["favorite_color"] = "blue"
print("Name: " + profile["name"])`,
      hint: "Empty {} first, then store keys, then print using a key.",
      successMessage: "Order is right — labeled memory is ready to use.",
      failureMessage:
        "Need profile = {}, at least two key–value pairs, and a print that uses a key.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return (
          /^\s*profile\s*=\s*\{\}\s*$/m.test(code) &&
          profileSets(code) >= 2 &&
          /\bprint\s*\([\s\S]*profile\[\s*["'][^"']+["']\s*\][\s\S]*\)/.test(code) &&
          run.stdout.length >= 1 &&
          !run.error
        );
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Debug the dictionary",
      focusCommand: "{}",
      commandExplain:
        "This profile should use a dictionary, but it was created with list brackets instead.",
      goal: "Fix the empty container so it is a dictionary, not a list.",
      starterCode: `profile = []

profile["name"] = "Alex"
profile["favorite_color"] = "blue"

print("Name: " + profile["name"])
`,
      solutionCode: `profile = {}

profile["name"] = "Alex"
profile["favorite_color"] = "blue"

print("Name: " + profile["name"])
`,
      debugHint: "list vs dictionary",
      hint: "Dictionaries use curly braces {}. Square brackets [] make a list.",
      successMessage: "Fixed — profile = {} creates labeled memory.",
      failureMessage: "Change profile = [] to profile = {}.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return (
          /^\s*profile\s*=\s*\{\}\s*$/m.test(code) &&
          !/^\s*profile\s*=\s*\[\]\s*$/m.test(code) &&
          profileSets(code) >= 2 &&
          /\bprint\s*\([\s\S]*profile\[\s*["'][^"']+["']\s*\][\s\S]*\)/.test(code) &&
          run.stdout.length >= 1 &&
          !run.error
        );
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the profile line",
      focusCommand: "trace key → value",
      commandExplain:
        "Read this finished profile. Predict the exact printed line before you see it.",
      goal: "Type your prediction, then Run & check.",
      starterCode: `profile = {}
profile["name"] = "Alex"
profile["favorite_color"] = "blue"
print("Name: " + profile["name"])
`,
      solutionCode: `profile = {}
profile["name"] = "Alex"
profile["favorite_color"] = "blue"
print("Name: " + profile["name"])
`,
      codeReadOnly: true,
      predictionPrompt: "What exact line prints?",
      acceptedPredictions: ["Name: Alex", "name: alex", "Name:Alex"],
      hint: "The print joins \"Name: \" with whatever is stored under the name key.",
      successMessage: "You traced the key to the printed value.",
      failureMessage: "Look at the print string and which key it reads from the profile.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return !run.error && run.stdout.join("\n").includes("Name: Alex");
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build a profile",
      focusCommand: "from scratch",
      commandExplain:
        "Write a dictionary profile with at least two key–value pairs and print a sentence using one value.",
      goal: "Build organized memory yourself.",
      starterCode: `# Organized memory with a dictionary\n`,
      solutionCode: `profile = {}
profile["name"] = "Alex"
profile["favorite_color"] = "blue"
print("Name: " + profile["name"])
`,
      hint: 'profile = {}, then profile["key"] = "value", then print with + and a key.',
      successMessage: "You built a dictionary profile from scratch. 🗂️",
      failureMessage:
        'Need profile = {}, two key–value pairs, and print("... " + profile["..."]).',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return (
          /^\s*profile\s*=\s*\{\}\s*$/m.test(code) &&
          profileSets(code) >= 2 &&
          /\bprint\s*\([\s\S]*profile\[\s*["'][^"']+["']\s*\][\s\S]*\)/.test(code) &&
          code.includes("+") &&
          run.stdout.length >= 1 &&
          !run.error
        );
      },
    },
  ],
};
