 "use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson2: LessonConfig = {
  id: "lesson-2",
  title: "2. My AI Helper Listens",
  goal: "Use input() to collect information and respond using the user’s input.",
  xpReward: 100,
  badge: "👂 Listener",
  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, build an AI helper that asks for a name and then responds using that name.",
  assignmentChecklist: [
    'Use input(): name = input("What is your name? ")',
    "Store the answer in a variable called name.",
    'Print a response using +: print("Nice to meet you, " + name)',
    "Test it with different names and confirm the output changes.",
  ],
  starterCode: `# Fill in the blanks 👇
name = input("What is your name? ")
print("Nice to meet you, " + ____)
`,
  instructorScript:
    "Coach’s note:\nLast time, our AI helper could talk.\nToday, we’re going to teach it how to **listen**.\n\nWe do that with input(). Think of input() like a pause button:\n- Your program stops.\n- The user types something.\n- When they press Enter, that answer becomes a value.\n\nImportant AI idea:\n- AI systems respond to input, but they do NOT think or choose answers on their own.\n- Different input can create different output, but the behavior still follows rules written by humans.\n\nKey reminder:\n- input() always returns text (a string).\n- If you want to use the input later, store it in a variable.\n\nHow to test like a pro:\nRun it with two different names and watch how the output changes.",
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
  editorPlaceholder:
    '# From scratch idea:\n# name = input("What is your name? ")\n# print("Nice to meet you, " + name)\n',
  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/1",
  nextHref: "/learn/3",
  runtimeInputs: [
    {
      key: "name",
      label: 'Pretend you typed for: input("What is your name? ")',
      placeholder: "Alex",
      defaultValue: "Alex",
    },
  ],

  getRunOutput: (code, runtime) => {
    if (code.includes("Print(")) {
      return asTerminal("❌ Common mistake: Python needs lowercase print(...), not Print(...).");
    }

    const nameRaw = (runtime?.name ?? "").trim();
    if (!nameRaw) {
      return asTerminal('Type a name (like "Alex") in the input box, then press Run.');
    }

    const hasInput = /\bname\s*=\s*input\(/.test(code);
    const hasPrint = /\bprint\s*\(/.test(code);
    const printsWithName = /\bprint\s*\([\s\S]*\bname\b[\s\S]*\)\s*/.test(code);

    if (!hasInput) return asTerminal('Add: name = input("What is your name? ")');
    if (!hasPrint) return asTerminal("Add a print(...) line so your helper can respond.");
    if (!printsWithName) return asTerminal('Make sure your print uses the name variable (example: print("Nice to meet you, " + name)).');

    return asTerminal(`What is your name? ${nameRaw}\nNice to meet you, ${nameRaw}`);
  },

  computeProgressPercent: (code, submitted) => {
    const hasInput = /\bname\s*=\s*input\(/.test(code);
    const hasPrint = /\bprint\s*\(/.test(code);
    const usesName = /\bname\b/.test(code);
    const usesGluePlus = code.includes("+");

    const checks = [hasInput, hasPrint, usesName, usesGluePlus];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) =>
    /\bname\s*=\s*input\(/.test(code) &&
    /\bprint\s*\(\s*["'][^"']*["']\s*\+\s*name\s*\)/.test(code) &&
    !code.includes("Print("),

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Your AI helper listened and responded. 🎉")
      : asTerminal(
          "❌ Almost! Make sure you have name = input(...), then print(\"Nice to meet you, \" + name). Also check print is lowercase."
        ),
};

export default function Lesson2Page() {
  return <LessonCanvas lesson={lesson2} />;
}

