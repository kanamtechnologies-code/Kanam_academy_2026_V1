"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

function usesLowerOnQ1(code: string) {
  return /\bq1\s*=\s*input\([^)]*\)\.lower\(\)/.test(code);
}

function usesLowerOnQ2(code: string) {
  return /\bq2\s*=\s*input\([^)]*\)\.lower\(\)/.test(code);
}

const lesson4: LessonConfig = {
  id: "lesson-4",
  title: "4. Mini Quiz Bot",
  goal: "Make a quiz game that keeps score using math (score = score + 1).",
  xpReward: 800,
  badge: "🎓 Quiz Master",
  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, build a 2-question quiz that keeps score and prints a final score like 2/2.",
  assignmentChecklist: [
    "Start with score = 0 at the top.",
    "Ask Q1 and Q2 using input().",
    "If the answer is right, add a point: score = score + 1",
    "Print a final score using str(score).",
    "Test 2 runs: one all-correct, one with a wrong answer.",
  ],
  starterCode: `# Fill in the blanks 👇
score = ____

q1 = input("Q1) ____ ")
if q1 == "____":
    print("____")
    score = score + ____
else:
    print("____")

q2 = input("Q2) ____ ")
if q2 == "____":
    print("____")
    score = score + ____
else:
    print("____")

print("Final score: " + str(score) + "/2")
`,
  instructorScript:
    "Coach’s note:\nToday is a big level-up: your bot will **remember points** and do **math**.\n\nUp until now, your bot mostly used words.\nNow we add a number variable called score.\n\nThe key idea is this line:\nscore = score + 1\nIt looks weird at first, but here’s what it means:\n- Python calculates the RIGHT side first (old score + 1)\n- Then it stores the new number back into the score box\n\nYour checklist today:\n- Start with score = 0 at the top (before any questions)\n- Ask Q1, then if they’re right: add 1 point\n- Ask Q2, then if they’re right: add 1 point\n- At the end, print the final score\n\nTwo super common “why is this broken?” moments:\n- If you accidentally write score = 1, you erase your old score. You want score = score + 1.\n- If you see a message about mixing text + numbers, use str(score) in your final print.\n\nHow to test like a teacher:\nTry one run where you get both answers right (score should be 2), and one run where you miss one (score should be 1).",
  kidExplain: [
    {
      title: "AI Concept: Data Tracking & Scoring",
      text:
        "How does a video game know you leveled up? It keeps **data** (like points) and updates it over time. That’s **data tracking**. Your quiz bot will track points using a number called `score`.",
    },
    {
      title: "Integer variables (numbers, not words)",
      text:
        "`score = 0` creates a box that holds a number. Numbers are called **integers** (ints). They let us do math!",
    },
    {
      title: "Incrementing (updating the score)",
      text:
        "`score = score + 1` is the magic line. It means: take the old score, add 1, then store it back in score.",
    },
    {
      title: "Type conversion (str())",
      text:
        'Python can’t combine text and numbers with `+` unless you convert the number to text. `str(score)` turns 2 into `"2"` so it can join your sentence.',
    },
  ],
  steps: [
    "Initialize the Score: Add score = 0 at the very top so the bot starts counting from zero.",
    "Question 1: Use input() to ask a question and save it in q1.",
    'Score Logic: If they’re right, print "Correct!" and run score = score + 1.',
    "Feedback: Add an else so they learn the right answer if they miss it.",
    "Question 2: Repeat with q2 and another if/else.",
    'Grand Finale: Print the final score using str(score) so Python doesn’t get confused.',
  ],
  cfu: [
    {
      question:
        "Variable life: If you put score = 0 inside the if statement, what happens to your points?",
      answer:
        "It would reset to 0 when that if runs. Your points wouldn’t “carry over” through the whole quiz.",
    },
    {
      question:
        "The formula: In score = score + 1, which side does Python calculate first?",
      answer: "The right side first (score + 1), then it saves the result into score.",
    },
    {
      question:
        'Strings vs ints: Why can’t we write print("Score: " + score)?',
      answer:
        'Because score is a number. You need str(score) to turn the number into text first.',
    },
  ],
  tryThis: [
    "Expert Level (Easy): Add a 3rd question. Don’t forget to update the final score to /3!",
    'Celebration (Medium): At the end, if score == 3, print "You\'re an AI Genius! 🌟"',
    "Penalty (Bonus): Try subtracting a point for a trick question: score = score - 1.",
  ],
  aiSafetyMoment:
    "Truth Check: Sometimes AI can sound 100% sure but still be wrong. That’s called a hallucination. Always verify facts — even when a computer says them confidently!",
  editorPlaceholder:
    "# From scratch idea:\n# score = 0\n# q1 = input(\"...\")\n# if q1 == \"Python\":\n#     score = score + 1\n",
  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/3",
  nextHref: "/learn/5",
  runtimeInputs: [
    {
      key: "q1",
      label: 'Pretend you typed for Q1 (language):',
      placeholder: "Python",
      defaultValue: "Python",
    },
    {
      key: "q2",
      label: "Pretend you typed for Q2 (True/False):",
      placeholder: "False",
      defaultValue: "False",
    },
  ],

  getRunOutput: (code, runtime) => {
    if (code.includes("Print(")) {
      return asTerminal("❌ Common mistake: print must be lowercase (print).");
    }

    const q1Raw = (runtime?.q1 ?? "").trim();
    const q2Raw = (runtime?.q2 ?? "").trim();
    if (!q1Raw || !q2Raw) {
      return asTerminal("Type answers for q1 and q2 in the input boxes, then press Run.");
    }

    const needsScoreInit = /^\s*score\s*=\s*0\b/m.test(code);
    const hasQ1Input = /\bq1\s*=\s*input\(/.test(code);
    const hasQ2Input = /\bq2\s*=\s*input\(/.test(code);
    const hasIfQ1 = /\bif\s+q1\s*==\s*["']Python["']\s*:/.test(code) || /\bif\s+q1\s*==\s*["']python["']\s*:/.test(code);
    const hasIfQ2 = /\bif\s+q2\s*==\s*["']False["']\s*:/.test(code) || /\bif\s+q2\s*==\s*["']false["']\s*:/.test(code);
    const hasElse = /\nelse\s*:/.test(code);
    const hasIncrement = /\bscore\s*=\s*score\s*\+\s*1\b/.test(code);

    if (!needsScoreInit) return asTerminal("Add: score = 0 at the top (so we can count points).");
    if (!hasQ1Input) return asTerminal("Add Question 1: q1 = input(...)");
    if (!hasIfQ1) return asTerminal('Add: if q1 == "Python":   (don’t forget the colon!)');
    if (!hasIncrement) return asTerminal("Add the magic line: score = score + 1");
    if (!hasElse) return asTerminal("Add an else: so your quiz teaches the right answer too.");
    if (!hasQ2Input) return asTerminal("Add Question 2: q2 = input(...)");
    if (!hasIfQ2) return asTerminal('Add: if q2 == "False":');

    // Simulated scoring (MVP)
    const q1Answer = usesLowerOnQ1(code) ? q1Raw.toLowerCase() : q1Raw;
    const q2Answer = usesLowerOnQ2(code) ? q2Raw.toLowerCase() : q2Raw;

    const expectsQ1 = /\bif\s+q1\s*==\s*["']python["']\s*:/.test(code) ? "python" : "Python";
    const expectsQ2 = /\bif\s+q2\s*==\s*["']false["']\s*:/.test(code) ? "false" : "False";

    let score = 0;
    const lines: string[] = [];
    lines.push("Welcome to the Kanam Tech Quiz!");
    lines.push(`What is the name of the language we are learning? ${q1Raw}`);

    if (q1Answer === expectsQ1) {
      lines.push("Correct! High five!");
      score += 1;
    } else {
      lines.push("Not quite! We are learning Python.");
    }

    lines.push(`True or False: AI can think exactly like a human? ${q2Raw}`);
    if (q2Answer === expectsQ2) {
      lines.push("Nice job! You know your AI facts.");
      score += 1;
    } else {
      lines.push("Actually, that's False! AI just follows code.");
    }

    const hasStrScore = /\bstr\s*\(\s*score\s*\)/.test(code);
    if (!hasStrScore) {
      lines.push(
        "\nTip: Use str(score) in your final print so Python can join words + numbers."
      );
    }

    lines.push(`Game Over! Your final score is: ${score}/2`);

    // Friendly hint if they typed Python/False with different caps but didn’t use .lower()
    if (!usesLowerOnQ1(code) && q1Raw !== q1Raw.toLowerCase() && expectsQ1 === "python") {
      // no-op
    } else if (!usesLowerOnQ1(code) && q1Raw.toLowerCase() === "python" && q1Raw !== expectsQ1) {
      lines.push('\nHint: Your code is case-sensitive. Try q1 = input(...).lower() and compare to "python".');
    }
    if (!usesLowerOnQ2(code) && q2Raw.toLowerCase() === "false" && q2Raw !== expectsQ2) {
      lines.push('\nHint: Your code is case-sensitive. Try q2 = input(...).lower() and compare to "false".');
    }

    return asTerminal(lines.join("\n"));
  },

  computeProgressPercent: (code, submitted) => {
    const hasScoreInit = /^\s*score\s*=\s*0\b/m.test(code);
    const hasQ1Input = /\bq1\s*=\s*input\(/.test(code);
    const hasIfQ1 = /\bif\s+q1\s*==\s*["']Python["']\s*:/.test(code) || /\bif\s+q1\s*==\s*["']python["']\s*:/.test(code);
    const hasElseQ1 = /if\s+q1[\s\S]*?\nelse\s*:/m.test(code);
    const hasQ2Input = /\bq2\s*=\s*input\(/.test(code);
    const hasIfQ2 = /\bif\s+q2\s*==\s*["']False["']\s*:/.test(code) || /\bif\s+q2\s*==\s*["']false["']\s*:/.test(code);
    const hasElseQ2 = /if\s+q2[\s\S]*?\nelse\s*:/m.test(code);
    const increments = (code.match(/\bscore\s*=\s*score\s*\+\s*1\b/g) ?? []).length >= 2;
    const hasFinalPrint = /\bprint\s*\([\s\S]*str\s*\(\s*score\s*\)[\s\S]*\)/.test(code);

    const checks = [
      hasScoreInit,
      hasQ1Input,
      hasIfQ1,
      hasElseQ1,
      hasQ2Input,
      hasIfQ2,
      hasElseQ2,
      increments,
      hasFinalPrint,
    ];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) => {
    const hasScoreInit = /^\s*score\s*=\s*0\b/m.test(code);
    const hasQ1Input = /\bq1\s*=\s*input\(/.test(code);
    const hasQ2Input = /\bq2\s*=\s*input\(/.test(code);
    const hasIfQ1 =
      /\bif\s+q1\s*==\s*["']Python["']\s*:/.test(code) ||
      /\bif\s+q1\s*==\s*["']python["']\s*:/.test(code);
    const hasIfQ2 =
      /\bif\s+q2\s*==\s*["']False["']\s*:/.test(code) ||
      /\bif\s+q2\s*==\s*["']false["']\s*:/.test(code);
    const hasElseQ1 = /if\s+q1[\s\S]*?\nelse\s*:/m.test(code);
    const hasElseQ2 = /if\s+q2[\s\S]*?\nelse\s*:/m.test(code);
    const increments = (code.match(/\bscore\s*=\s*score\s*\+\s*1\b/g) ?? []).length >= 2;
    const hasStrScore = /\bstr\s*\(\s*score\s*\)/.test(code);
    const hasIndentedPrints =
      /if\s+q1[\s\S]*?\n[ \t]+print\(/.test(code) &&
      /if\s+q2[\s\S]*?\n[ \t]+print\(/.test(code);

    return (
      hasScoreInit &&
      hasQ1Input &&
      hasIfQ1 &&
      hasElseQ1 &&
      hasQ2Input &&
      hasIfQ2 &&
      hasElseQ2 &&
      increments &&
      hasStrScore &&
      hasIndentedPrints &&
      !code.includes("Print(")
    );
  },

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Your Quiz Bot can track points and do math. 🎯")
      : asTerminal(
          '❌ Almost! Make sure you have score = 0, two questions (q1/q2 input), if/else for each, score = score + 1 at least twice, and a final print using str(score). Also check print is lowercase.'
        ),
};

export default function Lesson4Page() {
  return <LessonCanvas lesson={lesson4} />;
}

