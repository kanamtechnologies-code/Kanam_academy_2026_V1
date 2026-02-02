"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson3: LessonConfig = {
  id: "lesson-3",
  title: "3. My AI Makes Choices",
  goal: "Use if / else to make your AI respond differently based on input.",
  xpReward: 150,
  badge: "🧠 Decision Maker",
  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, build an AI helper that asks for a name, then says a special message for Alex and a different message for everyone else.",
  assignmentChecklist: [
    'Ask for a name using input("What is your name? ").',
    'Write an if check using == : if name == "Alex":',
    "Add an else: for everyone who isn’t Alex.",
    "Put print(...) lines INSIDE the if/else (indented).",
    'Test it twice: once with "Alex" and once with a different name.',
  ],
  starterCode: `# Fill in the blanks 👇
name = input("What is your name? ")

if name == "____":
    print("____")
else:
    print("____")
`,
  instructorScript:
    "Coach’s note:\nLast week, our AI helper learned how to **listen**.\nToday, we’re going to teach it how to **make choices**.\n\nBig idea (very important):\n- The computer does NOT guess.\n- It checks your rule.\n- If the rule is True, it runs that block.\n- Otherwise, it runs the else block.\n\nThis is what many early AI systems look like:\n**rule-based decision making**.\nA human writes the rules. The program follows them exactly.\n\nTwo super common mistakes (watch for these):\n- `=` vs `==`: `=` assigns (puts a value in a box). `==` compares (asks a question).\n- Indentation: the lines under if/else MUST be indented so Python knows what belongs to each choice.\n\nHow to test like a teacher:\nRun it once with Alex (you should get the special message), then run it again with a different name (you should get the other message).",
  kidExplain: [
    {
      title: "AI Concept: Rules control behavior",
      text:
        "Many AI systems start as **rule-based systems**. That means a human writes rules, and the computer follows those rules exactly. Today your AI helper will follow one simple rule to decide what to say.",
    },
    {
      title: "What is an if statement?",
      text:
        "An `if` statement checks a condition. If the condition is True, Python runs the indented code under it.",
    },
    {
      title: "else = the other path",
      text:
        "An `else` block runs when the if condition is False. It’s your “plan B” so your program always has something to do.",
    },
    {
      title: "Compare vs assign (== vs =)",
      text:
        "`=` assigns (stores a value). `==` compares (checks if two values are equal). Inside an if, you almost always want `==`.",
    },
    {
      title: "Indentation matters",
      text:
        "Indentation (spaces) tells Python which lines belong inside the if or else. If it’s not indented, Python can’t tell what you meant.",
    },
  ],
  steps: [
    "Ask for the user’s name using input().",
    'Write the rule: if name == "Alex":',
    "Inside the if block, print a special message for Alex.",
    "Add else: for everyone else.",
    "Inside else, print a friendly message for any other name.",
  ],
  cfu: [
    {
      question: "Symbols: What is the difference between = and == in Python?",
      answer: "`=` assigns (stores a value). `==` compares (checks if two values are equal).",
    },
    {
      question: "Structure: Why do the print lines need to be indented under if and else?",
      answer:
        "Because indentation tells Python which lines belong to each block. Without it, Python can’t tell what should run for each choice.",
    },
    {
      question:
        "Logic: If the name is Alex and the if condition is True, does Python run the else too?",
      answer: "No. Only one path runs: if runs when True, else runs when False.",
    },
  ],
  tryThis: [
    "Swap the special name (Easy): Change Alex to your own name.",
    'Reverse it (Medium): Make the special message happen when the name is NOT Alex.',
    'Add a second rule (Bonus): Add another if to check for a second special name (like "Sam").',
  ],
  aiSafetyMoment:
    "Responsible AI: Your AI helper is only following rules you wrote. If it behaves badly, the responsibility belongs to the human who wrote the rules.",
  editorPlaceholder:
    '# From scratch idea:\n# name = input("What is your name? ")\n# if name == "Alex":\n#     print("Welcome back, Alex!")\n# else:\n#     print("Hello there!")\n',
  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/2",
  nextHref: "/learn/4",
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
      return asTerminal("❌ Common mistake: print must be lowercase (print).");
    }

    const nameRaw = (runtime?.name ?? "").trim();
    if (!nameRaw) {
      return asTerminal('Type a name (like "Alex") in the input box, then press Run.');
    }

    const hasNameInput = /\bname\s*=\s*input\(/.test(code);
    const hasIfAlex = /\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code);
    const hasElse = /\nelse\s*:/.test(code);

    if (!hasNameInput) return asTerminal("Add Step 1: name = input(...)");
    if (!hasIfAlex) return asTerminal('Add: if name == "Alex":  (don’t forget the colon!)');
    if (!hasElse) return asTerminal("Add an else: for everyone who isn’t Alex.");

    const lines: string[] = [];
    lines.push(`What is your name? ${nameRaw}`);
    if (nameRaw === "Alex") lines.push("Welcome back, Alex!");
    else lines.push("Hello there!");

    return asTerminal(lines.join("\n"));
  },

  computeProgressPercent: (code, submitted) => {
    const hasNameInput = /\bname\s*=\s*input\(/.test(code);
    const usesIf = /\bif\s+name\s*==/.test(code);
    const hasIfAlex = /\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code);
    const hasElse = /\nelse\s*:/.test(code);
    const hasIndentedPrintIf = /\bif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code);
    const hasIndentedPrintElse = /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code);

    const checks = [
      hasNameInput,
      usesIf,
      hasIfAlex,
      hasElse,
      hasIndentedPrintIf,
      hasIndentedPrintElse,
    ];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) =>
    /\bname\s*=\s*input\(/.test(code) &&
    /\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code) &&
    /\nelse\s*:/.test(code) &&
    /\bif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code) &&
    /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code) &&
    !code.includes("Print("),

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Your AI makes choices using rules. 🎉")
      : asTerminal(
          '❌ Almost! Make sure you have name = input(...), an if name == "Alex": line with a colon, an else:, and indented print() lines. Also check print is lowercase.'
        ),
};

export default function Lesson3Page() {
  return <LessonCanvas lesson={lesson3} />;
}

