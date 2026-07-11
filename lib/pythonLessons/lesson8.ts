import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function noRunError(run: MiniRunResult): boolean {
  return !run.error;
}

function listPrintLines(run: MiniRunResult): string[] {
  return run.stdout.filter((line) => line.startsWith("[") || line === "[]");
}

export const lesson8: PythonLessonConfig = {
  id: "lesson-8",
  title: "8. AI Remembers Choices",
  goal: "Use a list to remember multiple choices over time.",
  xpReward: 450,
  badge: "Memory Builder",
  instructorScript:
    "**Coach’s note**:\nSo far, your bot has been able to remember one thing at a time.\n\nThat’s because we’ve been using ==variables==.\n\nA variable is like one labeled box.\nIt can only hold one value.\n\nToday, you’re going to help your bot remember more than one thing.\nThat’s where ==lists== come in.\n\nA list is like a row of boxes instead of just one.\nEach box can hold a piece of information.\n\nHere’s what list memory can look like:\n`choices = []`\n`choices.append(\"pizza\")`\n`choices.append(\"soccer\")`\n`print(choices)`\n`choices.remove(\"pizza\")`\n`print(choices)`\n\nHere’s how to think like a coder today:\n- A ==variable== remembers one thing\n- A ==list== remembers many things\n- You decide what gets added and what gets removed\n\nNothing is automatic.\nYour bot only remembers what you tell it to remember.\n\n**Mini goal**:\nMake your bot remember multiple choices by saving them in a list.\n\nRead the steps, follow them in order, then press [[Run]].",
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
    'Store a choice in a variable (for example: choice = "pizza").',
    "Add the choice to the list with append().",
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
    "Add more than one answer to the list (append twice).",
    "Remove a different item.",
    "Challenge: Explain why remembering everything could be a problem.",
  ],
  aiSafetyMoment:
    "AI safety: Memory is powerful — and that means it comes with responsibility. Humans must decide what is okay to remember, what should be forgotten, and what should never be saved.",
  commandReference: [
    {
      command: "choices = []",
      summary: "Creates an empty list — a row of memory boxes with nothing in them yet.",
      example: "choices = []",
    },
    {
      command: 'choice = "pizza"',
      summary: "Stores one value in a variable so you can append or remove it by name.",
      example: 'choice = "pizza"',
    },
    {
      command: "choices.append(...)",
      summary: "Adds one item to the end of the list — the bot remembers it.",
      example: "choices.append(choice)",
    },
    {
      command: "choices.remove(...)",
      summary: "Deletes a matching item from the list — memory changes.",
      example: "choices.remove(choice)",
    },
  ],
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Right now your AI helper can only remember **one** thing at a time. Today you'll teach it to remember a whole bunch of things at once — and that single upgrade is what powers almost every app you use.\n\nHere's your roadmap for this lesson:\n\n• **Lists** — how a program remembers *many* values in one place.\n• \`.append()\` — how to add a new item to the memory.\n• \`.remove()\` — how to forget an item.\n• Putting it together to build a little **memory bot**.\n\nYou already know variables (one labeled box). A list is the next level up: a whole row of boxes that grows and shrinks as your program runs.`,
        image: "/images/lessons/py-8-list.png",
        imageAlt: "A row of labeled boxes holding different items, like a shelf",
        callout: {
          label: "Why it matters",
          text: "Your music playlist, the items in a game inventory, your group chat's message history, and an online shopping cart are all lists — many values remembered together and updated as you go.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "One box vs. a whole row of boxes",
        body: `A **variable** is a single labeled box. It's perfect for one piece of info — your name, your score, today's date. But the moment you need to remember *more than one* of something, one box isn't enough.\n\nA **list** is like a row of boxes lined up on a shelf, all under one label. Instead of juggling \`choice1\`, \`choice2\`, and \`choice3\` (messy!), you keep everything together in one list called \`choices\`.\n\nThe items stay **in order**, and the list can grow or shrink while your program runs. That flexibility is exactly what makes lists so powerful.`,
        callout: {
          label: "Common misconception",
          text: "A list isn't a different *kind* of value like a number or a piece of text — it's a **container** that holds other values. One list can hold many strings, numbers, or even both.",
        },
      },
      {
        id: "list",
        kicker: "Building block #1",
        title: "A list holds many values",
        body: `You make an **empty list** with a pair of square brackets: \`[]\`. Empty just means "no items yet" — like a fresh shelf waiting to be filled.\n\nTo add an item, you use \`.append(...)\`. Think of *append* as "tack this on to the end." Each time you append, the new item lines up at the back of the row.\n\nNotice how the items keep the exact order you added them — \`pizza\` first, then \`soccer\`. In a list, order matters.`,
        code: `choices = []\nchoices.append("pizza")\nchoices.append("soccer")\nprint(choices)`,
        codeCaption: "Start empty, then remember two things",
        output: `['pizza', 'soccer']`,
        callout: {
          label: "Watch out",
          text: "Don't forget the square brackets when you create the list. `choices = []` makes an empty list, but `choices = \"\"` makes empty *text* — a completely different thing.",
        },
      },
      {
        id: "ask",
        kicker: "Building block #2",
        title: "Store a choice, then remember it",
        body: `A memory bot gets more interesting when you save a value in a variable first, then \`.append()\` that variable onto your list. That way you can reuse the same value later — for example when you \`.remove()\` it.\n\nIn this lesson we set the choice in code (like \`choice = "pizza"\`) so you can focus on how the list grows and shrinks.`,
        code: `choices = []\nchoice = "pizza"\nchoices.append(choice)\nprint(choices)`,
        codeCaption: "Store pizza, then remember it in the list",
        output: `['pizza']`,
        callout: {
          label: "Common misconception",
          text: "Appending the variable `choice` is the same as appending `\"pizza\"` when `choice` holds that text — but using the variable makes remove/append easier to keep in sync.",
        },
      },
      {
        id: "change",
        kicker: "Building block #3",
        title: "Add and remove to change memory",
        body: `Memory shouldn't be frozen — your bot needs to *update* what it knows. That's where adding and removing come in.\n\n\`.append(x)\` adds an item to the end. \`.remove(x)\` finds the **first** item that matches \`x\` and deletes it. Nothing happens automatically: your bot only changes its memory when *you* tell it to.\n\nThink of it like a whiteboard — you can write new notes and erase old ones whenever you choose.`,
        code: `choices.remove("pizza")\nprint(choices)`,
        codeCaption: "Forget one item",
        output: `['soccer']`,
        bullets: [
          "`[]` makes an empty list.",
          "`.append(item)` adds to the **end**.",
          "`.remove(item)` deletes the **first matching** item.",
        ],
        callout: {
          label: "Watch out",
          text: "`.remove(\"pizza\")` only works if pizza is actually in the list. If you try to remove something that isn't there, Python raises an error — so make sure the item exists first.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Let's build a memory bot, step by step",
        body: `Let's build a tiny memory bot from start to finish, the way a real coder does — one line at a time.\n\n**Step 1 — Start empty.** Make a fresh list called \`choices\` with \`[]\`. The bot remembers nothing yet.\n\n**Step 2 — Add two memories.** Use \`.append()\` twice to store two favorites. They line up in order.\n\n**Step 3 — Show the memory.** \`print(choices)\` displays the whole list so you can see what the bot remembers.\n\n**Step 4 — Forget one.** Use \`.remove()\` to delete an item, then print again to watch the memory change.`,
        code: `# Step 1: start with empty memory\nchoices = []\n\n# Step 2: remember two things\nchoices.append("pizza")\nchoices.append("soccer")\nprint(choices)\n\n# Step 4: forget one, then look again\nchoices.remove("pizza")\nprint(choices)`,
        codeCaption: "The full memory bot, with comments explaining each step",
        output: `['pizza', 'soccer']\n['soccer']`,
        callout: {
          label: "Pro tip",
          text: "Printing your list *before and after* a change is the best way to check your code does what you expect. Coders call this \"debugging by printing.\"",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've leveled up your bot's memory with three moves: \`[]\` to start a list, \`.append()\` to remember, and \`.remove()\` to forget.\n\nIn the exercises you'll create a list, store a choice, append it, print the memory, then remove an item and print again to watch the memory change.\n\nClick **Start the exercises** when you're ready.`,
        callout: {
          label: "Responsible AI",
          text: "Memory is powerful. Humans must decide what is okay to remember, what should be forgotten, and what should never be saved at all.",
        },
      },
    ],
  },
  prevHref: "/learn/7",
  nextHref: "/learn/9",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill the list blanks",
      focusCommand: "append / remove",
      commandExplain:
        "Store a choice, append it to a list, print, remove it, and print again. Fill every ____.",
      goal: 'Use choice = "pizza" with append and remove — no input() needed.',
      starterCode: `choices = []

choice = "pizza"
choices.append(____)
print(choices)

choices.remove(____)
print(choices)`,
      solutionCode: `choices = []

choice = "pizza"
choices.append(choice)
print(choices)

choices.remove(choice)
print(choices)`,
      hint: "Use the choice variable in both append(...) and remove(...).",
      successMessage: "List memory grew and shrank — append then remove.",
      failureMessage:
        "Need choices = [], choice = \"pizza\", append(choice), remove(choice), and two print(choices).",
      validate: (code, run) => {
        const prints = listPrintLines(run);
        return (
          !rejectsUppercasePrint(code) &&
          noRunError(run) &&
          /^\s*choices\s*=\s*\[\]\s*$/m.test(code) &&
          /\bchoice\s*=\s*["']pizza["']/.test(code) &&
          /\bchoices\.append\(/.test(code) &&
          /\bchoices\.(remove|pop)\(/.test(code) &&
          (code.match(/\bprint\s*\(\s*choices\s*\)/g) ?? []).length >= 2 &&
          prints.length >= 2 &&
          prints[0] === '["pizza"]' &&
          prints[prints.length - 1] === "[]"
        );
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder list memory",
      focusCommand: "[] + append + remove",
      commandExplain:
        "Scrambled memory bot. Put empty list, choice, append, print, remove, print in order.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      parsonsLines: [
        "choices = []",
        'choice = "pizza"',
        "choices.append(choice)",
        "print(choices)",
        "choices.remove(choice)",
        "print(choices)",
      ],
      solutionCode: `choices = []
choice = "pizza"
choices.append(choice)
print(choices)
choices.remove(choice)
print(choices)`,
      hint: "Empty list first, then choice, append, print, remove, print again.",
      successMessage: "Order is right — memory updates in sequence.",
      failureMessage:
        "Need choices = [], choice = \"pizza\", append, print, remove, and a second print.",
      validate: (code, run) => {
        const prints = listPrintLines(run);
        return (
          !rejectsUppercasePrint(code) &&
          noRunError(run) &&
          /^\s*choices\s*=\s*\[\]\s*$/m.test(code) &&
          /\bchoices\.append\(/.test(code) &&
          /\bchoices\.(remove|pop)\(/.test(code) &&
          (code.match(/\bprint\s*\(\s*choices\s*\)/g) ?? []).length >= 2 &&
          prints.length >= 2 &&
          prints[0] === '["pizza"]' &&
          prints[prints.length - 1] === "[]"
        );
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Debug the list",
      focusCommand: "append()",
      commandExplain:
        "This memory bot should save pizza, but append is missing parentheses / the choice.",
      goal: "Fix append so pizza is added to the list.",
      starterCode: `choices = []

choice = "pizza"
choices.append
print(choices)

choices.remove(choice)
print(choices)
`,
      solutionCode: `choices = []

choice = "pizza"
choices.append(choice)
print(choices)

choices.remove(choice)
print(choices)
`,
      debugHint: "method call",
      hint: "append needs parentheses and the item: choices.append(choice)",
      successMessage: "Fixed — append(choice) adds pizza to the list.",
      failureMessage: "Use choices.append(choice) with parentheses and the choice variable.",
      validate: (code, run) => {
        const prints = listPrintLines(run);
        return (
          !rejectsUppercasePrint(code) &&
          noRunError(run) &&
          /\bchoices\.append\s*\(/.test(code) &&
          /\bchoices\.(remove|pop)\(/.test(code) &&
          (code.match(/\bprint\s*\(\s*choices\s*\)/g) ?? []).length >= 2 &&
          prints.length >= 2 &&
          prints[0] === '["pizza"]' &&
          prints[prints.length - 1] === "[]"
        );
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the memory",
      focusCommand: "trace append / remove",
      commandExplain:
        "Read this finished memory bot. Predict both printed lines before you see them.",
      goal: "Type your prediction, then Run & check.",
      starterCode: `choices = []
choice = "pizza"
choices.append(choice)
print(choices)
choices.remove(choice)
print(choices)
`,
      solutionCode: `choices = []
choice = "pizza"
choices.append(choice)
print(choices)
choices.remove(choice)
print(choices)
`,
      codeReadOnly: true,
      predictionPrompt: "What two lines print? (list after append, then after remove)",
      acceptedPredictions: [
        '["pizza"]\n[]',
        "['pizza']\n[]",
        '["pizza"] []',
        "['pizza'] []",
        '["pizza"] then []',
      ],
      hint: "First print shows the list with pizza; after remove it is empty.",
      successMessage: "You predicted how list memory changes.",
      failureMessage: "Think about what the list holds after append, then after remove.",
      validate: (code, run) => {
        const prints = listPrintLines(run);
        return (
          !rejectsUppercasePrint(code) &&
          noRunError(run) &&
          prints.length >= 2 &&
          prints[0] === '["pizza"]' &&
          prints[prints.length - 1] === "[]"
        );
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build list memory",
      focusCommand: "from scratch",
      commandExplain:
        'Write a program that uses choice = "pizza", appends it, prints, removes it, and prints again.',
      goal: "Build the full list memory program yourself.",
      starterCode: `# List memory: append, then remove\n`,
      solutionCode: `choices = []
choice = "pizza"
choices.append(choice)
print(choices)
choices.remove(choice)
print(choices)
`,
      hint: 'choices = [], choice = "pizza", append(choice), print, remove(choice), print.',
      successMessage: "You built list memory from scratch. 🧺",
      failureMessage:
        "Need choices = [], choice = \"pizza\", append, remove, and two print(choices).",
      validate: (code, run) => {
        const prints = listPrintLines(run);
        return (
          !rejectsUppercasePrint(code) &&
          noRunError(run) &&
          /^\s*choices\s*=\s*\[\]\s*$/m.test(code) &&
          /\bchoice\s*=\s*["']pizza["']/.test(code) &&
          /\bchoices\.append\(/.test(code) &&
          /\bchoices\.(remove|pop)\(/.test(code) &&
          (code.match(/\bprint\s*\(\s*choices\s*\)/g) ?? []).length >= 2 &&
          prints.length >= 2 &&
          prints[0] === '["pizza"]' &&
          prints[prints.length - 1] === "[]"
        );
      },
    },
  ],
};
