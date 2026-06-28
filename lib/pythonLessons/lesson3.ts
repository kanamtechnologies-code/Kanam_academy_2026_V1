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

function hasIfAlex(code: string) {
  return /\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code);
}

function hasElse(code: string) {
  return /\nelse\s*:/.test(code);
}

function hasIndentedPrintIf(code: string) {
  return /\bif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code);
}

function hasIndentedPrintElse(code: string) {
  return /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code);
}

export const lesson3: PythonLessonConfig = {
  id: "lesson-3",
  title: "3. My AI Makes Choices",
  goal: "Use if / else to make your AI respond differently based on input.",
  xpReward: 150,
  badge: "🧠 Decision Maker",
  instructorScript:
    "**Coach’s note**:\nLast week, our AI helper learned how to **listen**.\nToday, we’re going to teach it how to **make choices**.\n\nBig idea (very important):\n- The computer does NOT guess.\n- It checks your rule.\n- If the rule is True, it runs that block.\n- Otherwise, it runs the else block.\n\nThis is what many early AI systems look like:\n**rule-based decision making**.\nA human writes the rules. The program follows them exactly.\n\nTwo super common mistakes (watch for these):\n- `=` vs `==`: `=` assigns (puts a value in a box). `==` compares (asks a question).\n- Indentation: the lines under if/else MUST be indented so Python knows what belongs to each choice.\n\nHow to test like a teacher:\nRun it once with Alex (you should get the special message), then run it again with a different name (you should get the other message).",
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
  commandReference: [
    {
      command: 'if name == "Alex":',
      summary: "Checks a condition. Use == to compare (not =). Don't forget the colon!",
      example: 'if name == "Alex":',
    },
    {
      command: "else:",
      summary: "Runs when the if condition is False — your fallback path.",
      example: "else:\n    print(\"Hello there!\")",
    },
    {
      command: "==",
      summary: "Compares two values for equality. Different from = which assigns.",
      example: 'name == "Alex"',
    },
    {
      command: "indentation",
      summary: "Lines under if/else must be indented (4 spaces) so Python knows they belong inside.",
      example: "    print(\"Welcome back, Alex!\")",
    },
  ],
  exercises: [
    {
      id: "ex-input",
      title: "Exercise 1 — Ask for a name",
      focusCommand: "input()",
      commandExplain:
        "Start by listening — your AI needs a name before it can make a choice.",
      goal: "Add name = input(\"What is your name? \")",
      starterCode: `# Fill in the blank 👇
name = input("____")
`,
      hint: 'Type the question: "What is your name? "',
      successMessage: "Great! Your helper can collect a name to decide with.",
      failureMessage: 'Use name = input("What is your name? ").',
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
      id: "ex-if",
      title: "Exercise 2 — Write the if rule",
      focusCommand: "if",
      commandExplain:
        'Use == to compare: if name == "Alex": checks whether the input equals Alex. Remember the colon!',
      goal: 'Add if name == "Alex": with an indented print for Alex.',
      starterCode: `name = input("What is your name? ")

if name == "____":
    print("____")
`,
      hint: 'Type Alex in the comparison and a welcome message like "Welcome back, Alex!"',
      successMessage: "Nice! You wrote your first decision rule.",
      failureMessage: 'Use if name == "Alex": with an indented print() underneath.',
      runtimeInputs: [RUNTIME_NAME_INPUT],
      validate: (code: string, run: MiniRunResult, runtime?: Record<string, string>) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasIfAlex(code)) return false;
        if (!hasIndentedPrintIf(code)) return false;
        const nameRaw = (runtime?.name ?? "").trim();
        if (!nameRaw) return false;
        if (nameRaw !== "Alex") return run.stdout.length >= 1;
        return run.stdout.length >= 2;
      },
    },
    {
      id: "ex-else",
      title: "Exercise 3 — Add the else path",
      focusCommand: "else",
      commandExplain:
        "else runs when the if condition is False — so everyone who isn't Alex still gets a friendly message.",
      goal: "Add else: with an indented print for other names.",
      starterCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("____")
`,
      hint: 'Try print("Hello there!") for everyone else.',
      successMessage: "Perfect! Your helper now has two paths to choose from.",
      failureMessage: "Add else: with an indented print() for non-Alex names.",
      runtimeInputs: [RUNTIME_NAME_INPUT],
      validate: (code: string, run: MiniRunResult, runtime?: Record<string, string>) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasIfAlex(code)) return false;
        if (!hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElse(code)) return false;
        const nameRaw = (runtime?.name ?? "").trim();
        if (!nameRaw) return false;
        return run.stdout.length >= 2;
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Put it all together",
      focusCommand: "if + else",
      commandExplain:
        "Build the full rule-based helper: special message for Alex, different message for everyone else.",
      goal: "Complete the if/else program and test with Alex and another name.",
      starterCode: `# Fill in the blanks 👇
name = input("What is your name? ")

if name == "____":
    print("____")
else:
    print("____")
`,
      hint: 'Alex gets a special welcome; else prints something friendly for other names.',
      successMessage: "You did it! Your AI makes choices using rules. 🎉",
      failureMessage:
        'Need name = input(...), if name == "Alex":, else:, and indented print() lines. Check lowercase print.',
      runtimeInputs: [RUNTIME_NAME_INPUT],
      validate: (code: string, run: MiniRunResult, runtime?: Record<string, string>) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasIfAlex(code)) return false;
        if (!hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElse(code)) return false;
        const nameRaw = (runtime?.name ?? "").trim();
        if (!nameRaw) return false;
        return run.stdout.length >= 2;
      },
    },
  ],
  prevHref: "/learn/2",
  nextHref: "/learn/4",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
};
