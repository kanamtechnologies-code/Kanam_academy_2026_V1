 "use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson2: LessonConfig = {
  id: "lesson-2",
  title: "2. Smart Choices Bot",
  goal: "Make your bot listen, think, and choose what to say!",
  xpReward: 100,
  badge: "🧠 Logic Master",
  starterCode: `# 1. Ask the user a question and save the answer
status = input("Are you tired? (yes/no): ")

# 2. The Fork in the Road
if status == "yes":
    # This only runs if they typed 'yes'
    print("AI says: Go grab a glass of water and rest!")
else:
    # This runs for any other answer
    print("AI says: Awesome! Let's keep building.")
`,
  instructorScript:
    "An AI that only talks at you isn't very smart. To make a bot feel alive, it needs to listen! Today, we’re using the input() command to ask a question. Then, we’ll use an if statement to give our AI a 'fork in the road'—making it say different things based on your answer.",
  kidExplain: [
    {
      title: "What is input()?",
      text:
        "This command pauses the program and waits for the user to type something. Whatever they type gets saved into a variable (your bot’s “memory box”).",
    },
    {
      title: 'The "Fork in the Road" (if)',
      text:
        "An if statement checks a condition. If the condition is True, Python runs the code indented underneath it.",
    },
    {
      title: "The Double Equals (==)",
      text:
        "In Python, `=` puts something in a box, but `==` asks a question: “Is this equal to that?” Always use `==` inside an if statement!",
    },
    {
      title: "The Colon (:) and Indent",
      text:
        "The colon at the end of if and else is like a START signal. Everything pushed to the right (indented) belongs to that choice.",
    },
  ],
  steps: [
    'Ask a Question: Use `status = input("Are you tired? (yes/no): ")` to get the user’s mood.',
    'Set the If Condition: Write `if status == "yes":` (don’t forget the colon!).',
    "Add the Reaction: On the next line (indented!), use print() to give advice for being tired.",
    'The Catch-All (else): Use `else:` to tell the AI what to say if the user says anything other than "yes."',
    "Common mistake: If you get an IndentationError, make sure your print() lines are pushed to the right using the Tab key!",
  ],
  cfu: [
    {
      question: 'What happens if the user types "YES" instead of "yes"?',
      answer:
        'Python is case-sensitive! It will jump to the else section because "YES" does not equal "yes".',
    },
    {
      question: "Why do we need the : at the end of the if line?",
      answer: "It tells Python that a block of 'choice' code is about to start.",
    },
    {
      question: "What does input() do to the program?",
      answer: "It pauses the code and waits for the user to press Enter.",
    },
  ],
  tryThis: [
    'Pizza Choice: Change the question to "Do you like pizza?" and update the responses.',
    'The Middle Ground: Try adding an `elif status == "maybe":` line between the if and the else.',
    "The Secret Code: Make an if statement that only triggers if the user types a secret password!",
  ],
  aiSafetyMoment:
    "Remember: AI can sound confident even when it’s wrong. Always test your code and double-check important facts!",
  editorPlaceholder:
    '# Try typing:\n# status = input("Are you tired? (yes/no): ")\n# if status == "yes":\n#     print("...")\n',
  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/1",
  nextHref: "/learn/3",
  runtimeInputs: [
    {
      key: "status",
      label: 'Answer for input("Are you tired?")',
      placeholder: "yes or no",
      defaultValue: "yes",
    },
  ],

  getRunOutput: (code, runtime) => {
    if (code.includes("Print(")) {
      return asTerminal(
        "❌ Common mistake: Python needs lowercase print(...), not Print(...)."
      );
    }

    const answerRaw = (runtime?.status ?? "").trim();
    if (!answerRaw) {
      return asTerminal('Type "yes" or "no" in the input box, then press Run.');
    }
    const answer = answerRaw.toLowerCase();

    const hasInput = /\bstatus\s*=\s*input\(/.test(code);
    const hasIf = /\bif\s+status\s*==\s*["']yes["']\s*:/.test(code);
    const hasElse = /\nelse\s*:/.test(code);

    if (!hasInput) {
      return asTerminal('Add: status = input("Are you tired? (yes/no): ")');
    }
    if (!hasIf) {
      return asTerminal('Add: if status == "yes":   (don’t forget the colon!)');
    }
    if (!hasElse) {
      return asTerminal("Add an else: so your bot has a second path.");
    }

    if (answer === "yes") {
      return asTerminal("AI says: Go grab a glass of water and rest!");
    }
    return asTerminal("AI says: Awesome! Let's keep building.");
  },

  computeProgressPercent: (code, submitted) => {
    const hasInput = /\bstatus\s*=\s*input\(/.test(code);
    const hasIfYes = /\bif\s+status\s*==\s*["']yes["']\s*:/.test(code);
    const hasElse = /\nelse\s*:/.test(code);
    const hasIndentedPrintIf =
      /\bif\s+status\s*==\s*["']yes["']\s*:[^\n]*\n[ \t]+print\(/.test(code);
    const hasIndentedPrintElse =
      /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code);
    const usesDoubleEquals = /\bif\s+status\s*==/.test(code);

    const checks = [
      hasInput,
      usesDoubleEquals,
      hasIfYes,
      hasIndentedPrintIf,
      hasElse,
      hasIndentedPrintElse,
    ];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) =>
    /\bstatus\s*=\s*input\(/.test(code) &&
    /\bif\s+status\s*==\s*["']yes["']\s*:/.test(code) &&
    /\nelse\s*:/.test(code) &&
    /\bif\s+status\s*==\s*["']yes["']\s*:[^\n]*\n[ \t]+print\(/.test(code) &&
    /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code) &&
    !code.includes("Print("),

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Your bot can listen and make a smart choice. 🎉")
      : asTerminal(
          "❌ Almost! Make sure you have input(), an if status == \"yes\": line with a colon, an else:, and indented print() lines. Also check print is lowercase."
        ),
};

export default function Lesson2Page() {
  return <LessonCanvas lesson={lesson2} />;
}

