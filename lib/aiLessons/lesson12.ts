import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson12: AILessonConfig = {
  id: "ai-12",
  title: "12. AI at School: Help vs. Cheating",
  goal: "Draw a clear line between using AI to learn and using it to cheat, and build personal rules for honest, effective AI use in school.",
  xpReward: 600,
  badge: "Honest Scholar",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/11",
  nextHref: "/learn/ai/13",
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `AI can be the best study buddy you've ever had — or a shortcut that quietly robs you of actually learning. This lesson helps you draw a clear, confident line between the two.\n\nRoadmap:\n\n• The honest test for any AI use at school.\n• A side-by-side of what's usually **help** vs. usually **cheating**.\n• Three simple rules that keep you on the right side of the line.\n\nThis is real and immediate: you'll face these choices on homework, essays, and projects this year.`,
        image: "/images/lessons/ai-12-school.png",
        imageAlt: "A balance scale weighing 'learning with AI' against 'cheating'",
        callout: {
          label: "Why it matters",
          text: "Using AI honestly makes you learn faster and look great doing it. Using it to skip the work leaves you stuck when the test (or real life) shows up — and AI misuse is increasingly easy to detect.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "AI can supercharge learning — or short-circuit it",
        body: `AI can act like a tireless tutor available 24/7: it explains, quizzes you, and gives feedback whenever you need it. The very same tool can also do your assignment *for* you — and skip the learning entirely.\n\nHere's the key: the tool isn't good or bad. The **how** is. Lifting weights builds muscle; getting a robot to lift them for you builds nothing. AI is the same — it only makes you stronger if *you* do the mental reps.\n\nThe honest test: *Does this use help me understand and do the work, or does it replace my thinking and pass someone else's work off as mine?*`,
        callout: {
          label: "The honest test",
          text: "Am I using AI to learn the material, or to avoid learning it? Your honest answer usually tells you which side of the line you're on.",
        },
      },
      {
        id: "line",
        kicker: "Where's the line?",
        title: "Help vs. cheating, side by side",
        body: `Schools' rules vary, but most agree on the spirit. The dividing question is simple: *who is doing the thinking and the work?*\n\nIf AI helps *you* learn, or improves work *you* created, that's usually fine. If AI does the work that was meant to measure *your* skills, that's usually cheating.`,
        bullets: [
          "OK: explanations, practice quizzes, feedback on your own work.",
          "OK: brainstorming and outlining ideas you then develop yourself.",
          "Cheating: turning in AI-written work as if you wrote it.",
          "Cheating: using AI where your teacher has forbidden it.",
        ],
        table: {
          columns: ["What you do", "Usually..."],
          values: [
            ["Ask AI to explain a concept", "Help ✅"],
            ["Have AI quiz you or react to your own draft", "Help ✅"],
            ["Brainstorm ideas you then develop yourself", "Help ✅"],
            ["Submit AI-written text as your own", "Cheating ❌"],
            ["Have AI do a graded assignment for you", "Cheating ❌"],
            ["Use AI where the teacher banned it", "Cheating ❌"],
          ],
          rowCount: 6,
        },
      },
      {
        id: "rules",
        kicker: "Your move",
        title: "Three rules that keep you honest",
        body: `When you're unsure, these three keep you safe and still learning:\n\n1. **Ask first** — every teacher and class has different rules. When in doubt, ask what's allowed *before* you use AI.\n2. **Be transparent** — if you used AI, be ready to say how. Some teachers want it cited, like any other source.\n3. **Do the thinking** — use AI to learn *with* you, never *for* you. The gut-check: if you couldn't redo it on your own, you didn't actually learn it.`,
        callout: {
          label: "Why it matters",
          text: "Cheating with AI mostly cheats yourself — you skip the learning, then can't perform when it counts (and AI misuse is increasingly easy to detect).",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Same assignment, two very different choices",
        body: `You have an essay due on a book you read. Two students both open an AI chatbot. Watch where the line falls.\n\n**Maya (learning):** asks the AI to "quiz me on the main themes," then writes her own draft, then asks "give me feedback on my thesis — don't rewrite it." She does every bit of the writing herself. The AI made her *better*.\n\n**Theo (cheating):** types "write me a 5-paragraph essay on this book" and turns it in as his own. The AI did the assignment that was supposed to measure *his* skills.\n\n**Same tool, opposite outcomes.** Maya learned the material and can defend her work; Theo skipped the learning and risks getting caught. The difference was never the AI — it was the choice.`,
        code: `Maya: "quiz me" → I write the draft → "feedback on MY draft"   →  ✅ learning
Theo: "write my essay" → submit it as mine                     →  ❌ cheating`,
        codeCaption: "The line is about who does the thinking",
        callout: {
          label: "Pro tip",
          text: "A quick self-check before submitting: could you explain or redo this without the AI? If yes, you learned it. If no, you leaned on it too hard.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Students who use AI honestly — to understand faster and get feedback — pull ahead. Students who use it to skip the learning fall behind the moment AI isn't allowed.\n\nNext we'll dig into how AI picks up bias from data. First, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict).`,
      },
    ],
  },
  bigIdeas: [
    "The same AI can **help you learn** or **help you cheat** — it's about how you use it.",
    "Using AI for explanations, practice, and feedback is usually fine; **submitting AI work as your own** is cheating.",
    "**Ask first, be transparent, and do the thinking** yourself.",
  ],
  keyTerms: [
    { term: "Academic integrity", definition: "Being honest in schoolwork — doing and crediting your own work." },
    { term: "Plagiarism", definition: "Passing off someone (or something) else's work as your own." },
    { term: "Transparency", definition: "Being open about whether and how you used AI on an assignment." },
    { term: "AI as tutor", definition: "Using AI to explain, quiz, and give feedback so you learn — not to replace your work." },
  ],
  realWorld:
    "A student who has AI explain each wrong answer on a practice quiz learns more than a classmate who has AI write the whole essay — and is ready when the closed-book test arrives.",
  quiz: [
    {
      id: "q1",
      question: "What's the honest test for using AI on schoolwork?",
      choices: [
        "Will I get caught?",
        "Does this help me learn and do the work, or replace my thinking and pass off AI work as mine?",
        "Is the AI free?",
        "Is it faster than doing it myself?",
      ],
      correctIndex: 1,
      explanation:
        "Integrity is about whether you're learning and doing your own work — not just about getting caught.",
    },
    {
      id: "q2",
      question: "Which of these is generally an OK, learning-focused use of AI?",
      choices: [
        "Submitting an AI-written essay as your own",
        "Having AI take an online quiz for you",
        "Asking AI to explain a concept and quiz you on it",
        "Using AI on a test where it's banned",
      ],
      correctIndex: 2,
      explanation:
        "Using AI to explain and quiz you helps you learn. The others replace your work or break the rules.",
    },
    {
      id: "q3",
      question: "You're not sure if AI is allowed on an assignment. What's the best move?",
      choices: [
        "Use it anyway and hope it's fine",
        "Ask your teacher what's allowed before using it",
        "Never use AI for anything ever",
        "Use it but delete your history",
      ],
      correctIndex: 1,
      explanation:
        "Rules vary by class and teacher. Asking first keeps you honest and avoids accidental cheating.",
    },
    {
      id: "q4",
      question: "Why does cheating with AI mostly hurt YOU?",
      choices: [
        "It doesn't hurt anyone",
        "You skip the learning, so you can't perform when AI isn't allowed (and misuse is detectable)",
        "It uses up your phone battery",
        "It makes the AI angry",
      ],
      correctIndex: 1,
      explanation:
        "Skipping the learning means you can't do it on your own later — and AI misuse is increasingly easy to detect.",
    },
  ],
  reflection: {
    prompt:
      "Write 3 personal rules for using AI on schoolwork that you'd actually follow. Make them specific.",
    placeholder: "1) I'll use AI to explain, not to write. 2) I'll ask my teacher when… 3) …",
  },
};
