"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

function normalizeIfLowerUsed(code: string, s: string) {
  // Bonus: if they used .lower() on the mood input line, we simulate that behavior.
  const usesLower = /mood\s*=\s*input\([^)]*\)\.lower\(\)/.test(code);
  return usesLower ? s.toLowerCase() : s;
}

const lesson3: LessonConfig = {
  id: "lesson-3",
  title: "3. Mood Coach Bot",
  goal: "Use if / elif / else to build an AI that reacts to 3 different emotions.",
  xpReward: 600,
  badge: "🧠 Empathy Engineer",
  starterCode: `# Step 1: Greeting
name = input("Hi! I'm Kanam Mood Coach. What's your name? ")
print("Great to see you, " + name + "!")

# Step 2: The Mood Input
mood = input("Tell me, are you feeling happy, sad, or tired? ")

# Step 3: The Emotional Brain
if mood == "happy":
    print("That's what I like to hear! Go share that smile with someone.")
elif mood == "sad":
    print("It's okay to feel down sometimes. Maybe a quick walk outside would help?")
elif mood == "tired":
    print("Your brain needs a break! Try closing your eyes for 5 minutes.")
else:
    print("I don't know that feeling yet, but I'm here for you anyway!")
`,
  instructorScript:
    "Welcome back, AI Architects! Last time, we gave our bots a basic 'Yes/No' brain. But humans aren't just 'Yes' or 'No'—we have tons of feelings! Today, we’re upgrading your bot’s EQ (Emotional Intelligence). We’re building a Mood Coach. Instead of just two paths, we’re using a new tool called elif. Think of it like a multi-way fork in the road. If the user is sad, go left; if they’re tired, go right; if they’re happy, go straight! By the end of this, you’ll have a bot that can actually 'listen' and offer advice based on how a person is feeling. Let's get coding!",
  kidExplain: [
    {
      title: "AI Superpower: Sentiment Analysis",
      text:
        'AI can scan your words for **keywords** (like "happy" or "sad") to guess your mood. That’s called **Sentiment Analysis**. Today, we’re building the bot’s “emotional brain” using if/elif/else.',
    },
    {
      title: "What is elif?",
      text:
        '`elif` is short for **"else if"**. It lets your code check **more than two choices**. Python reads top-to-bottom and stops at the first match.',
    },
    {
      title: "String matching",
      text:
        'We compare what the user typed to a word like `"happy"`. Matching is picky: `"Happy"` and `"happy"` are different unless you use `.lower()`.',
    },
    {
      title: "Logical flow",
      text:
        "Python checks your if first. If it’s True, it runs that block and skips the rest. If not, it tries elif, elif, and finally else.",
    },
  ],
  steps: [
    "Initialize the Conversation: Ask for the user’s name so the bot feels personal.",
    'Capture the Mood: Use input() to ask: "How are you feeling today?" and save it in a variable called mood.',
    'The First Check (if): If mood == "happy", print a high-energy response.',
    'Middle Checks (elif): Add elif for "sad" and elif for "tired" with coach tips.',
    "The Catch-All (else): For unknown feelings, print a kind message anyway.",
  ],
  cfu: [
    {
      question:
        'Logic: If the user types "happy," does Python even look at the "sad" or "tired" sections?',
      answer: "No. It stops after the first True match!",
    },
    {
      question: "Syntax: Why do we use == in the if line instead of just = ?",
      answer: "`=` assigns (puts in a box). `==` compares (asks a question).",
    },
    {
      question: "Structure: What happens if we forget to indent the print statements?",
      answer: "Python will throw an IndentationError because the blocks aren’t clear.",
    },
  ],
  tryThis: [
    'The "Angry" Upgrade (Easy): Add elif mood == "angry": and print advice (like "Take 3 deep breaths").',
    'The Activity Suggester (Medium): After advice, ask: input("Would you like to try that? (yes/no)")',
    'The Caps-Lock Fix (Bonus): Try mood = input("...").lower() so "HAPPY" and "happy" both work!',
  ],
  aiSafetyMoment:
    "Safety Tip: AI can guess emotions from words, but it can’t truly feel them. If someone is really struggling, talk to a trusted adult.",
  editorPlaceholder:
    '# Tip: try adding .lower()\n# mood = input("...").lower()\n',
  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/2",
  nextHref: undefined,
  runtimeInputs: [
    { key: "name", label: "Answer for input(\"What's your name?\")", placeholder: "Alex", defaultValue: "Alex" },
    { key: "mood", label: 'Answer for input("happy/sad/tired")', placeholder: "happy", defaultValue: "happy" },
  ],

  getRunOutput: (code, runtime) => {
    if (code.includes("Print(")) {
      return asTerminal("❌ Common mistake: print must be lowercase (print).");
    }

    const nameRaw = (runtime?.name ?? "").trim() || "friend";
    const moodRaw = (runtime?.mood ?? "").trim();
    if (!moodRaw) {
      return asTerminal('Type a mood (happy/sad/tired) in the input box, then press Run.');
    }

    const mood = normalizeIfLowerUsed(code, moodRaw);

    const hasNameInput = /\bname\s*=\s*input\(/.test(code);
    const hasMoodInput = /\bmood\s*=\s*input\(/.test(code);
    const hasIfHappy = /\bif\s+mood\s*==\s*["']happy["']\s*:/.test(code);
    const hasElifSad = /\belif\s+mood\s*==\s*["']sad["']\s*:/.test(code);
    const hasElifTired = /\belif\s+mood\s*==\s*["']tired["']\s*:/.test(code);
    const hasElse = /\nelse\s*:/.test(code);

    if (!hasNameInput) return asTerminal("Add Step 1: name = input(...)");
    if (!hasMoodInput) return asTerminal("Add Step 2: mood = input(...)");
    if (!hasIfHappy) return asTerminal('Add: if mood == "happy":  (don’t forget the colon!)');
    if (!hasElifSad) return asTerminal('Add: elif mood == "sad":');
    if (!hasElifTired) return asTerminal('Add: elif mood == "tired":');
    if (!hasElse) return asTerminal("Add an else: for any other feeling.");

    // Simulated conversation output
    const lines: string[] = [];
    lines.push(`Hi! I'm Kanam Mood Coach. What's your name? ${nameRaw}`);
    lines.push(`Great to see you, ${nameRaw}!`);
    lines.push(`Tell me, are you feeling happy, sad, or tired? ${moodRaw}`);

    if (mood === "happy") {
      lines.push("That's what I like to hear! Go share that smile with someone.");
    } else if (mood === "sad") {
      lines.push("It's okay to feel down sometimes. Maybe a quick walk outside would help?");
    } else if (mood === "tired") {
      lines.push("Your brain needs a break! Try closing your eyes for 5 minutes.");
    } else {
      lines.push("I don't know that feeling yet, but I'm here for you anyway!");
    }

    if (!/\.lower\(\)/.test(code) && moodRaw !== moodRaw.toLowerCase()) {
      lines.push(
        "\nTip: Your code is case-sensitive. Try mood = input(...).lower() to handle HAPPY / Happy / happy."
      );
    }

    return asTerminal(lines.join("\n"));
  },

  computeProgressPercent: (code, submitted) => {
    const hasNameInput = /\bname\s*=\s*input\(/.test(code);
    const hasMoodInput = /\bmood\s*=\s*input\(/.test(code);
    const usesIf = /\bif\s+mood\s*==/.test(code);
    const hasIfHappy = /\bif\s+mood\s*==\s*["']happy["']\s*:/.test(code);
    const hasElifSad = /\belif\s+mood\s*==\s*["']sad["']\s*:/.test(code);
    const hasElifTired = /\belif\s+mood\s*==\s*["']tired["']\s*:/.test(code);
    const hasElse = /\nelse\s*:/.test(code);
    const hasIndentedPrints =
      /\bif\s+mood\s*==[\s\S]*?\n[ \t]+print\(/.test(code) &&
      /\belif\s+mood\s*==[\s\S]*?\n[ \t]+print\(/.test(code) &&
      /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code);

    const checks = [
      hasNameInput,
      hasMoodInput,
      usesIf,
      hasIfHappy,
      hasElifSad,
      hasElifTired,
      hasElse,
      hasIndentedPrints,
    ];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) =>
    /\bname\s*=\s*input\(/.test(code) &&
    /\bmood\s*=\s*input\(/.test(code) &&
    /\bif\s+mood\s*==\s*["']happy["']\s*:/.test(code) &&
    /\belif\s+mood\s*==\s*["']sad["']\s*:/.test(code) &&
    /\belif\s+mood\s*==\s*["']tired["']\s*:/.test(code) &&
    /\nelse\s*:/.test(code) &&
    /\bif\s+mood\s*==[\s\S]*?\n[ \t]+print\(/.test(code) &&
    /\belif\s+mood\s*==[\s\S]*?\n[ \t]+print\(/.test(code) &&
    /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code) &&
    !code.includes("Print("),

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Your Mood Coach can handle multiple feelings. 🌟")
      : asTerminal(
          "❌ Almost! Make sure you have name input(), mood input(), if/elif/elif/else with colons, and indented print() lines. Also check print is lowercase."
        ),
};

export default function Lesson3Page() {
  return <LessonCanvas lesson={lesson3} />;
}

