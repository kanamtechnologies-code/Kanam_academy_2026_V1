import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson12: AILessonConfig = {
  id: "ai-12",
  title: "12. AI at School: Help vs. Cheating",
  goal: "Draw a clear line between using AI to learn and using it to cheat, and build personal rules for honest, effective AI use in school.",
  xpReward: 600,
  badge: "📚 Honest Scholar",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/11",
  nextHref: "/learn/ai/13",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "AI can supercharge learning — or short-circuit it",
        body: `AI can be like a tireless tutor available 24/7. It can also be a shortcut that robs you of actually learning. The same tool can do both — the difference is **how** you use it.\n\nThe honest test: *Does this use help me understand and do the work, or does it replace my thinking and pass someone else's work off as mine?*`,
        image: "/images/lessons/ai-12-school.png",
        imageAlt: "A balance scale weighing 'learning with AI' against 'cheating'",
        callout: {
          label: "The honest test",
          text: "Am I using AI to learn the material, or to avoid learning it? Your honest answer usually tells you which side of the line you're on.",
        },
      },
      {
        id: "line",
        kicker: "Where's the line?",
        title: "Help vs. cheating, side by side",
        body: `Most schools agree on the spirit, even if rules vary. Compare:\n\n**Usually OK (learning):** asking AI to explain a concept, quiz you, check your reasoning, suggest essay topics, or give feedback on a draft *you* wrote.\n\n**Usually cheating:** submitting AI text as your own, having AI do an assignment meant to test *your* skills, or using it on a test/assignment where it's banned.`,
        bullets: [
          "OK: explanations, practice quizzes, feedback on your own work.",
          "OK: brainstorming and outlining ideas you then develop yourself.",
          "Cheating: turning in AI-written work as if you wrote it.",
          "Cheating: using AI where your teacher has forbidden it.",
        ],
      },
      {
        id: "rules",
        kicker: "Your move",
        title: "Three rules that keep you honest",
        body: `When you're unsure, these keep you safe and learning:\n\n1. **Ask first** — every teacher/class has different rules. When in doubt, ask what's allowed.\n2. **Be transparent** — if you used AI, be ready to say how. Some teachers want it cited.\n3. **Do the thinking** — use AI to learn *with* you, never *for* you. If you couldn't redo it without AI, you didn't learn it.`,
        callout: {
          label: "Why it matters",
          text: "Cheating with AI mostly cheats yourself — you skip the learning, then can't perform when it counts (and AI misuse is increasingly easy to detect).",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Integrity makes AI an advantage",
        body: `Students who use AI honestly — to understand faster and get feedback — pull ahead. Students who use it to skip learning fall behind when AI isn't allowed.\n\nTake the knowledge check, then write your own AI-use rules for school.`,
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
