import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

const CHOICE_INPUT = {
  key: "choice",
  label: 'Pretend you typed for: input("Tell me one thing you like: ")',
  placeholder: "pizza",
  defaultValue: "pizza",
};

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
  badge: "🧺 Memory Builder",
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
  commandReference: [
    {
      command: "choices = []",
      summary: "Creates an empty list — a row of memory boxes with nothing in them yet.",
      example: "choices = []",
    },
    {
      command: "input(...)",
      summary: "Pauses and waits for the user to type an answer (stored as text).",
      example: 'choice = input("Tell me one thing you like: ")',
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
    durationLabel: "~5 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "Give your AI a memory for many things",
        body: `Until now your helper could remember exactly **one** thing at a time, because a variable is a single labeled box.\n\nToday it learns to remember **many** things using a **list** — a whole row of boxes. This is how programs keep track of a shopping cart, a high-score table, or a chat history.`,
        image: "/images/lessons/py-8-list.png",
        imageAlt: "A row of labeled boxes holding different items, like a shelf",
        callout: {
          label: "Where you see it",
          text: "Your playlist, a to-do app, the items in a game inventory, and a browser's history are all lists — many values remembered together.",
        },
      },
      {
        id: "list",
        kicker: "Building block",
        title: "A list holds many values",
        body: `Make an **empty list** with \`[]\`. Then **add** items to it with \`.append(...)\`. Each item keeps its place in order.`,
        code: `choices = []\nchoices.append("pizza")\nchoices.append("soccer")\nprint(choices)`,
        codeCaption: "Start empty, then remember two things",
        output: `['pizza', 'soccer']`,
      },
      {
        id: "change",
        kicker: "Memory changes",
        title: "Add and remove to change memory",
        body: `Memory isn't permanent — you control it. \`.append(x)\` adds an item; \`.remove(x)\` deletes a matching one. Nothing happens automatically: your bot only remembers what you tell it to.`,
        code: `choices.remove("pizza")\nprint(choices)`,
        codeCaption: "Forget one item",
        output: `['soccer']`,
        bullets: [
          "`[]` makes an empty list.",
          "`.append(item)` adds to the **end**.",
          "`.remove(item)` deletes the **first matching** item.",
        ],
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Build a memory bot",
        body: `In the exercises you'll create a list, ask the user for a choice, append it, print the memory, then remove an item and print again to see the memory change.\n\nClick **Start the exercises** when you're ready.`,
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
      id: "ex-empty-list",
      title: "Exercise 1 — Create an empty list",
      focusCommand: "[]",
      commandExplain:
        "An empty list starts with no items. print(choices) shows what the bot remembers.",
      goal: "Create choices = [] and print the empty list.",
      starterCode: `choices = ____
print(choices)`,
      hint: "Type [] after the equals sign",
      successMessage: "Empty list created — ready to store memories!",
      failureMessage: "Use choices = [] then print(choices). Output should be [].",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        /^\s*choices\s*=\s*\[\]\s*$/m.test(code) &&
        /\bprint\s*\(\s*choices\s*\)/.test(code) &&
        run.stdout.length === 1 &&
        run.stdout[0] === "[]",
    },
    {
      id: "ex-input-append",
      title: "Exercise 2 — Ask and remember",
      focusCommand: "input() + append()",
      commandExplain:
        "input() collects an answer. append() adds it to the list so the bot remembers.",
      goal: "Ask a question with input(), append the answer, and print the list.",
      starterCode: `choices = []

choice = input("Tell me one thing you like: ")
choices.append(____)
print(choices)`,
      hint: "Append the choice variable: choices.append(choice)",
      runtimeInputs: [CHOICE_INPUT],
      successMessage: "Your bot listened and saved the answer in memory!",
      failureMessage:
        "Need choices = [], choice = input(...), choices.append(choice), and print(choices).",
      validate: (code, run, runtime) => {
        const answer = (runtime?.choice ?? "pizza").trim();
        return (
          !rejectsUppercasePrint(code) &&
          noRunError(run) &&
          /^\s*choices\s*=\s*\[\]\s*$/m.test(code) &&
          /\bchoice\s*=\s*input\(/.test(code) &&
          /\bchoices\.append\(/.test(code) &&
          /\bprint\s*\(\s*choices\s*\)/.test(code) &&
          run.stdout.some((line) => line.includes(`["${answer}"]`) || line === `["${answer}"]`)
        );
      },
    },
    {
      id: "ex-remove",
      title: "Exercise 3 — Remove from memory",
      focusCommand: "remove()",
      commandExplain:
        "remove() deletes an item from the list. Print before and after to see memory change.",
      goal: "Append an answer, print the list, remove it, and print again.",
      starterCode: `choices = []

choice = input("Tell me one thing you like: ")
choices.append(choice)
print(choices)

choices.remove(____)
print(choices)`,
      hint: "Remove the same variable you appended: choices.remove(choice)",
      runtimeInputs: [CHOICE_INPUT],
      successMessage: "Memory changed — you added and then removed an item!",
      failureMessage:
        "Need append, print, remove, and a second print(choices). Final output should be [].",
      validate: (code, run, runtime) => {
        const answer = (runtime?.choice ?? "pizza").trim();
        const prints = listPrintLines(run);
        return (
          !rejectsUppercasePrint(code) &&
          noRunError(run) &&
          /\bchoices\.append\(/.test(code) &&
          /\bchoices\.(remove|pop)\(/.test(code) &&
          (code.match(/\bprint\s*\(\s*choices\s*\)/g) ?? []).length >= 2 &&
          prints.length >= 2 &&
          prints[0] === `["${answer}"]` &&
          prints[prints.length - 1] === "[]"
        );
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Full list memory challenge",
      focusCommand: "List memory",
      commandExplain:
        "Put it all together: empty list, input, append, print, remove, print again.",
      goal: "Build the complete program that stores, shows, removes, and shows memory again.",
      starterCode: `# Fill in the blanks 👇
choices = []

choice = input("Tell me one thing you like: ")
choices.append(____)
print(choices)

# remove the same item you added
choices.remove(____)
print(choices)`,
      hint: "Use choice in both append(...) and remove(...)",
      runtimeInputs: [CHOICE_INPUT],
      successMessage: "Your AI stored and updated memory using a list. 🧠",
      failureMessage:
        "Need choices = [], append(...), two print(choices), and remove(...). Check print is lowercase.",
      validate: (code, run, runtime) => {
        const answer = (runtime?.choice ?? "pizza").trim();
        const prints = listPrintLines(run);
        return (
          !rejectsUppercasePrint(code) &&
          noRunError(run) &&
          /^\s*choices\s*=\s*\[\]\s*$/m.test(code) &&
          /\bchoices\.append\(/.test(code) &&
          /\bprint\s*\(\s*choices\s*\)/.test(code) &&
          /\bchoices\.(remove|pop)\(/.test(code) &&
          (code.match(/\bprint\s*\(\s*choices\s*\)/g) ?? []).length >= 2 &&
          prints.length >= 2 &&
          prints[0] === `["${answer}"]` &&
          prints[prints.length - 1] === "[]"
        );
      },
    },
  ],
};
