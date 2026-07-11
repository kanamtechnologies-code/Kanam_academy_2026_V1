import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

/** Runner fills empty input() with this silent default. */
const DEFAULT_NAME = "Alex";

function hasNameInput(code: string) {
  return /\bname\s*=\s*input\(/.test(code);
}

function hasNiceToMeetPrint(code: string) {
  return /\bprint\s*\(\s*["'][^"']*["']\s*\+\s*name\s*\)/.test(code);
}

export const lesson2: PythonLessonConfig = {
  id: "lesson-2",
  title: "2. My AI Helper Listens",
  goal: "Use input() to collect information and respond using the user’s input.",
  xpReward: 100,
  badge: "Listener",
  instructorScript:
    "**Coach’s note**:\nLast time, our AI helper could talk.\nToday, we’re going to teach it how to **listen**.\n\nWe do that with input(). Think of input() like a pause button:\n- Your program stops.\n- The user types something.\n- When they press Enter, that answer becomes a value.\n\nImportant AI idea:\n- AI systems respond to input, but they do NOT think or choose answers on their own.\n- Different input can create different output, but the behavior still follows rules written by humans.\n\nKey reminder:\n- input() always returns text (a string).\n- If you want to use the input later, store it in a variable.\n\nHow to test like a pro:\nRun it with two different names and watch how the output changes.",
  kidExplain: [
    {
      title: "What is input()?",
      text:
        "This command pauses the program and waits for the user to type something. Whatever they type gets saved into a variable (your bot’s “memory box”).",
    },
    {
      title: "Input is always text",
      text:
        "Even if you type numbers, input() gives your program text (a string). That’s why we often store it in a variable first.",
    },
    {
      title: "Store input in a variable",
      text:
        "We save the user’s answer in a variable like name so we can reuse it later in our print() message.",
    },
    {
      title: "Output uses the input",
      text:
        "When you print using the variable, the program’s output changes based on what the user typed.",
    },
  ],
  steps: [
    'Ask the question: `name = input("What is your name? ")`',
    "Store the input in a variable called name.",
    'Print a response that uses the variable: `print("Nice to meet you, " + name)`',
    "Run it with different inputs to confirm different names produce different output.",
  ],
  cfu: [
    {
      question: "Why does input() always return text?",
      answer:
        "Because input() reads what the user typed as characters. In Python, that’s a string (text).",
    },
    {
      question: "What happens if you use input() but don’t store it in a variable?",
      answer:
        "You can’t reuse the answer later. The program will read it once, but you won’t have a named box to refer to.",
    },
    {
      question: "How does changing the input change the output in this program?",
      answer:
        "The variable (like name) holds whatever the user typed, so the printed message changes when the input changes.",
    },
  ],
  tryThis: [
    "Ask two questions (Easy): Ask for a name AND a favorite color.",
    "Change the response (Medium): Make your helper say something new using the name.",
    "Use two inputs together (Bonus): Print one sentence that includes both answers.",
  ],
  aiSafetyMoment:
    "Responsible AI: AI can respond to input, but it doesn’t understand like a human. Humans write the rules and are responsible for the outcomes.",
  commandReference: [
    {
      command: 'input("...")',
      summary: "Pauses the program and waits for the user to type. Always returns text (a string).",
      example: 'name = input("What is your name? ")',
    },
    {
      command: "print(...)",
      summary: "Displays a response in the console after reading input.",
      example: 'print("Nice to meet you, " + name)',
    },
    {
      command: "+",
      summary: "Joins the greeting text with the variable holding the user's answer.",
      example: '"Nice to meet you, " + name',
    },
    {
      command: "variable =",
      summary: "Store input() in a variable so you can reuse the answer later.",
      example: 'name = input("What is your name? ")',
    },
  ],
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in input()",
      focusCommand: "input()",
      commandExplain:
        "input() pauses and waits for the user to type. Fill in the blank so the answer is stored in name.",
      goal: 'Replace ____ with input so the program asks for a name.',
      starterCode: `# Fill in the blank 👇
name = ____("What is your name? ")
print("Nice to meet you, " + name)
`,
      solutionCode: `name = input("What is your name? ")
print("Nice to meet you, " + name)
`,
      hint: "The command that listens is input — type it in the blank.",
      successMessage: "You taught your helper to listen with input()!",
      failureMessage: 'Need name = input("...") and print("Nice to meet you, " + name).',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasNiceToMeetPrint(code)) return false;
        return run.stdout.join("\n").includes(`Nice to meet you, ${DEFAULT_NAME}`);
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the listener",
      focusCommand: "input() + print()",
      commandExplain: "Scrambled lines: ask for a name, then greet them. Put the lines in order.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      solutionCode: `name = input("What is your name? ")
print("Nice to meet you, " + name)`,
      parsonsLines: [
        'name = input("What is your name? ")',
        'print("Nice to meet you, " + name)',
      ],
      hint: "Listen (input) first, then respond (print).",
      successMessage: "Order is right — your helper listened and replied.",
      failureMessage: "Need input into name, then print a greeting with + name.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasNiceToMeetPrint(code)) return false;
        return run.stdout.join("\n").includes(`Nice to meet you, ${DEFAULT_NAME}`);
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Debug the listener",
      focusCommand: "input()",
      commandExplain: "This program should ask for a name and greet them, but it's broken.",
      goal: "Fix the bug so it listens and responds.",
      starterCode: `name = input(What is your name? )
print("Nice to meet you, " + name)
`,
      solutionCode: `name = input("What is your name? ")
print("Nice to meet you, " + name)
`,
      debugHint: "quotes / string",
      hint: "The question inside input() needs quotes around it.",
      successMessage: "Fixed — input() needs a quoted prompt string.",
      failureMessage: 'Use input("What is your name? ") with quotes around the question.',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasNiceToMeetPrint(code)) return false;
        return run.stdout.join("\n").includes(`Nice to meet you, ${DEFAULT_NAME}`);
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the greeting",
      focusCommand: "trace variable → output",
      commandExplain: "If name is Jordan, what will this program print?",
      goal: "Predict the exact output, then Run & check.",
      starterCode: `name = "Jordan"
print("Nice to meet you, " + name)
`,
      solutionCode: `name = "Jordan"
print("Nice to meet you, " + name)
`,
      codeReadOnly: true,
      predictionPrompt: "What exact line prints?",
      acceptedPredictions: ["Nice to meet you, Jordan", "nice to meet you, jordan"],
      hint: "The name variable is Jordan, so that word appears in the greeting.",
      successMessage: "You traced the variable to the output correctly.",
      failureMessage: "Use the name Jordan inside the greeting sentence.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return run.stdout.join("\n").includes("Nice to meet you, Jordan");
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build a listener",
      focusCommand: "from scratch",
      commandExplain: "Write a program that asks for a name and prints Nice to meet you, … using that name.",
      goal: "Write the full program yourself.",
      starterCode: `# Ask for a name, then greet them\n`,
      solutionCode: `name = input("What is your name? ")
print("Nice to meet you, " + name)
`,
      hint: 'name = input("...") then print("Nice to meet you, " + name)',
      successMessage: "You built a listening helper from scratch.",
      failureMessage: 'Need input into name and print("Nice to meet you, " + name).',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasNiceToMeetPrint(code)) return false;
        return run.stdout.join("\n").includes(`Nice to meet you, ${DEFAULT_NAME}`);
      },
    },
  ],
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `In Lesson 1 your AI helper could *talk*. Today you'll give it a brand-new sense: the ability to **listen**. By the end, your helper will ask a question, wait for an answer, and reply using whatever the person typed.\n\nHere's the plan:\n\n• **\`input()\`** — how your program pauses and waits for someone to type.\n• **Storing the answer** — catching what they typed in a variable so you can reuse it.\n• **Responding** — gluing the answer into a personalized reply with \`+\`.\n\nThink about every app you use: when you search YouTube, log into a game, or message a chatbot, the very first thing it does is *listen* to you. That two-way conversation — you type, it responds — starts with this one command.`,
        image: "/images/lessons/py-2-listen.png",
        imageAlt: "A friendly robot cupping its ear to listen",
        callout: {
          label: "Why it matters",
          text: "Every chatbot, search bar, and sign-up form has to listen before it can help you. Once your program can take input, it stops being a fixed script and starts having a real conversation with whoever is using it.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "Teach your helper to listen",
        body: `So far your code has done all the talking. But a program that only talks is like a TV — it plays the same thing no matter who's watching. To be *useful*, your helper needs to react to **you**.\n\nThe magic word is \`input()\`. Think of it as a **pause button** on your program. When Python reaches \`input()\`, it freezes, shows your question, and waits patiently. The instant the user presses Enter, their answer becomes a value your program can grab and use.\n\nThis is the moment your code changes from a one-way announcement into a two-way conversation.`,
        callout: {
          label: "Why it matters",
          text: "Different people type different answers, so the same program can greet thousands of users by name. That's the difference between a poster on a wall and a helper that actually talks with you.",
        },
      },
      {
        id: "ask",
        kicker: "Building block #1",
        title: "input() asks a question and waits",
        body: `Whatever text you put inside \`input("...")\` becomes the question the user sees on screen. Picture a cashier asking "What can I get you?" and then standing there, patiently, until you answer. Your program does the same thing — it will not move to the next line until the user types something and hits Enter.\n\nBut here's the catch: the answer doesn't stick around on its own. If you don't *catch* it, it vanishes. So you store it in a **variable** — the same labeled box from Lesson 1. The line \`name = input("What is your name? ")\` says: "ask the question, then put their answer in the box called \`name\`."`,
        code: `name = input("What is your name? ")`,
        codeCaption: "Ask, then store the answer in name",
        callout: {
          label: "Common misconception",
          text: "Writing `input(\"What is your name? \")` on its own *does* ask the question — but without `name =` in front, the answer isn't saved anywhere, so you can't use it later. Always store input in a variable.",
        },
      },
      {
        id: "text",
        kicker: "Watch out",
        title: "input() always gives back text",
        body: `Here's a surprise that trips up almost every beginner: \`input()\` **always** hands your program **text**, even when the user types numbers.\n\nIf someone types \`12\`, your program receives the *text* \`"12"\` — the two characters one and two — not the *number* 12. Programmers call text a **string**. It's like the difference between the photo of a sandwich and the actual sandwich: \`"12"\` looks like a number but you can't do math with it yet.\n\nFor this lesson we're collecting **names**, so text is exactly what we want. (In a later lesson you'll learn how to convert text into real numbers when you need to do math.)`,
        bullets: [
          "Always **store** the answer: `name = input(...)`.",
          "The value is **text** (a string) until you convert it on purpose.",
          "Change the input → change the output. That's the whole point of listening.",
        ],
        callout: {
          label: "Common misconception",
          text: "`\"12\"` (text) and `12` (a number) are different to Python. Trying to do math on input straight from `input()` will surprise you until you convert it — but for names, text is perfect.",
        },
      },
      {
        id: "respond",
        kicker: "Building block #2",
        title: "Respond using what they typed",
        body: `A helper that listens but never replies isn't much fun. Now you'll make it *respond* by gluing your greeting to the stored answer with \`+\`, exactly like you did in Lesson 1.\n\nBecause the message uses the **variable** instead of a fixed name, the very same line of code greets *every* person by *their own* name. Type "Alex" and it says "Nice to meet you, Alex." Type "Maria" and it says "Nice to meet you, Maria." One line, infinite personalized replies.`,
        code: `name = input("What is your name? ")\nprint("Nice to meet you, " + name)`,
        codeCaption: "Listen, then respond",
        output: `What is your name? Alex\nNice to meet you, Alex`,
        callout: {
          label: "Watch out",
          text: "Remember the space! `\"Nice to meet you, \"` keeps the comma and space inside the quotes so the name doesn't get mashed against the greeting.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Let's build a listener together",
        body: `Let's combine the pieces into one working conversation, the way a real programmer does — one line at a time.\n\n**Step 1 — Ask and store.** We write \`input()\` with our question and put \`name =\` in front so the answer lands in the \`name\` box. Python pauses here and waits.\n\n**Step 2 — Build the reply.** Inside \`print()\`, we glue the greeting \`"Nice to meet you, "\` to the \`name\` box with \`+\`.\n\n**Step 3 — Run it twice.** Run it once and type "Alex"; run it again and type "Maria". Same code, different output — proof your helper is really listening.`,
        code: `# Step 1: ask a question and remember the answer\nname = input("What is your name? ")\n\n# Step 2 & 3: reply using whatever they typed\nprint("Nice to meet you, " + name)`,
        codeCaption: "The finished listening helper, with comments",
        output: `What is your name? Maria\nNice to meet you, Maria`,
        callout: {
          label: "Pro tip",
          text: "Real developers always test with *more than one* input. If your program works for \"Alex\" but you never try another name, you don't actually know it works for everyone.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've added a powerful new skill: your helper can **ask** with \`input()\`, **remember** the answer in a variable, and **respond** by joining text with \`+\`.\n\nIn the exercises you'll build this listening helper one step at a time — first the question, then the reply, then the personalized greeting.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/1",
  nextHref: "/learn/3",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
};
