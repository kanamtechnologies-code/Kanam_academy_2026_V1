import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

const RUNTIME_NAME_INPUT = {
  key: "name",
  label: 'Pretend you typed for: input("What is your name? ")',
  placeholder: "Alex",
  defaultValue: "Alex",
};

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
  badge: "👂 Listener",
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
      id: "ex-input",
      title: "Exercise 1 — Practice input()",
      focusCommand: "input()",
      commandExplain:
        "input() asks a question and waits for an answer. Store it in name so your program remembers what was typed.",
      goal: 'Fill in the blank to complete: name = input("What is your name? ")',
      starterCode: `# Fill in the blank 👇
name = input("____")
`,
      hint: 'Type the question inside the quotes: "What is your name? "',
      successMessage: "Great! Your helper can now listen for a name.",
      failureMessage: 'Use input("What is your name? ") to ask for a name.',
      runtimeInputs: [RUNTIME_NAME_INPUT],
      validate: (code: string, run: MiniRunResult, runtime?: Record<string, string>) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        const nameRaw = (runtime?.name ?? "").trim();
        if (!nameRaw) return false;
        return run.stdout.some((line) => line.includes(nameRaw));
      },
    },
    {
      id: "ex-print-response",
      title: "Exercise 2 — Print a response",
      focusCommand: "print()",
      commandExplain:
        "After listening, your helper should respond. Add a print() line that uses the name variable.",
      goal: "Add a print() line that includes the name variable.",
      starterCode: `name = input("What is your name? ")
print(____)
`,
      hint: 'Try print("Nice to meet you, " + name) or print(name)',
      successMessage: "Nice! Your helper responded using the input.",
      failureMessage: "Add print(...) that uses the name variable.",
      runtimeInputs: [RUNTIME_NAME_INPUT],
      validate: (code: string, run: MiniRunResult, runtime?: Record<string, string>) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!/\bprint\s*\([\s\S]*\bname\b[\s\S]*\)/.test(code)) return false;
        const nameRaw = (runtime?.name ?? "").trim();
        if (!nameRaw) return false;
        const out = run.stdout.join("\n");
        return out.includes(nameRaw) && run.stdout.length >= 2;
      },
    },
    {
      id: "ex-glue",
      title: "Exercise 3 — Join greeting with +",
      focusCommand: "+",
      commandExplain:
        'Glue the greeting text to the name: "Nice to meet you, " + name creates one friendly sentence.',
      goal: 'Fill in the greeting string: print("Nice to meet you, " + name)',
      starterCode: `name = input("What is your name? ")
print("____" + name)
`,
      hint: 'Type Nice to meet you,  (with comma and space) inside the quotes.',
      successMessage: "Perfect! You built a personalized greeting.",
      failureMessage: 'Use print("Nice to meet you, " + name) with the greeting in quotes.',
      runtimeInputs: [RUNTIME_NAME_INPUT],
      validate: (code: string, run: MiniRunResult, runtime?: Record<string, string>) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!/\bprint\s*\([\s\S]*\+[\s\S]*\bname\b[\s\S]*\)/.test(code)) return false;
        const nameRaw = (runtime?.name ?? "").trim();
        if (!nameRaw) return false;
        const out = run.stdout.join("\n");
        return out.includes(`Nice to meet you, ${nameRaw}`);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Put it all together",
      focusCommand: "input() + print() + +",
      commandExplain:
        "Build the full listening helper: ask for a name, then respond with a personalized greeting.",
      goal: "Complete the program so it asks and responds using the user's name.",
      starterCode: `# Fill in the blanks 👇
name = input("What is your name? ")
print("Nice to meet you, " + ____)
`,
      hint: 'Fill in name at the end: print("Nice to meet you, " + name)',
      successMessage: "You did it! Your AI helper listened and responded. 🎉",
      failureMessage:
        'Need name = input(...), then print("Nice to meet you, " + name). Check lowercase print.',
      runtimeInputs: [RUNTIME_NAME_INPUT],
      validate: (code: string, run: MiniRunResult, runtime?: Record<string, string>) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasNiceToMeetPrint(code)) return false;
        const nameRaw = (runtime?.name ?? "").trim();
        if (!nameRaw) return false;
        const out = run.stdout.join("\n");
        return out.includes(`Nice to meet you, ${nameRaw}`);
      },
    },
  ],
  lessonModule: {
    durationLabel: "~5 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "Teach your helper to listen",
        body: `Last lesson your helper could *talk*. Today it learns to **listen** and respond to whoever is using it.\n\nThe magic word is \`input()\`. Think of it as a **pause button**: your program stops, the user types an answer, and when they press Enter, that answer becomes a value your program can use.`,
        image: "/images/lessons/py-2-listen.png",
        imageAlt: "A friendly robot cupping its ear to listen",
        callout: {
          label: "Where you see it",
          text: "Search boxes, sign-up forms, and chatbots that ask \"What's your name?\" all use input. Different people type different answers — and the program responds to each one.",
        },
      },
      {
        id: "ask",
        kicker: "Building block",
        title: "input() asks a question and waits",
        body: `Whatever text you put inside \`input("...")\` becomes the question the user sees. The program freezes there until they answer.\n\nTo *use* the answer later, you must catch it in a **variable** — just like the box from Lesson 1.`,
        code: `name = input("What is your name? ")`,
        codeCaption: "Ask, then store the answer in name",
      },
      {
        id: "text",
        kicker: "Gotcha",
        title: "input() always gives back text",
        body: `Even if the user types \`12\`, \`input()\` hands your program the **text** \`"12"\`, not the number 12. That's called a **string**.\n\nFor now we're collecting names, so text is exactly what we want.`,
        bullets: [
          "Always **store** the answer: `name = input(...)`.",
          "The value is **text** until you convert it on purpose.",
          "Change the input → change the output. That's the whole point.",
        ],
      },
      {
        id: "respond",
        kicker: "Make it personal",
        title: "Respond using what they typed",
        body: `Now glue your greeting to the stored answer with \`+\`, just like Lesson 1. Because the message uses the variable, the helper greets *each* person by their own name.`,
        code: `name = input("What is your name? ")\nprint("Nice to meet you, " + name)`,
        codeCaption: "Listen, then respond",
        output: `What is your name? Alex\nNice to meet you, Alex`,
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Test it like a pro",
        body: `A real developer runs their program with **different inputs** to make sure it works for everyone. In the exercises you'll type a test answer, run, then try a different name and watch the greeting change.\n\nClick **Start the exercises** when you're ready.`,
        output: `What is your name? Maria\nNice to meet you, Maria`,
      },
    ],
  },
  prevHref: "/learn/1",
  nextHref: "/learn/3",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
};
