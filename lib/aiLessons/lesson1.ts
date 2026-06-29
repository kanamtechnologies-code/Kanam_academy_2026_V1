import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson1: AILessonConfig = {
  id: "ai-1",
  title: "1. What Is AI, Really?",
  goal: "Define artificial intelligence in plain language, separate real AI from sci-fi myths, and tell the difference between narrow and general AI.",
  xpReward: 50,
  badge: "🤖 AI Explorer",
  dashboardHref: "/dashboard",
  nextHref: "/learn/ai/2",
  lessonModule: {
    durationLabel: "~6 min lesson",
    sections: [
      {
        id: "what",
        kicker: "The big idea",
        title: "AI is software that does tasks that usually need human thinking",
        body: `**Artificial intelligence (AI)** is computer software built to do things we normally think of as needing human intelligence — like recognizing a face, understanding a sentence, recommending a song, or beating you at chess.\n\nHere's the key: AI is **not magic and not alive**. It's math and code running on a computer. It looks "smart" because it has found **patterns** in huge amounts of data, not because it understands the world the way you do.`,
        image: "/images/lessons/ai-1-what-is-ai.png",
        imageAlt: "A friendly robot brain made of circuits and data",
        callout: {
          label: "Myth check",
          text: "Today's AI does not have feelings, opinions, or a will of its own. When a chatbot says \"I think\", it is predicting words that sound right — not actually thinking like a person.",
        },
      },
      {
        id: "narrow-vs-general",
        kicker: "Two kinds of AI",
        title: "Narrow AI is real today. General AI is still science fiction.",
        body: `Scientists split AI into two types:\n\n• **Narrow AI** does **one kind of task** very well — translating text, spotting spam, suggesting videos. *Every* AI that exists today is narrow AI.\n• **General AI (AGI)** would think and learn across *any* topic like a human. It **does not exist yet** — it's a goal some researchers are working toward.\n\nSo the chatbot that writes a poem can't drive your car, and the AI that drives a car can't write a poem. Each is a specialist.`,
        bullets: [
          "**Narrow AI** = a specialist tool. Real and everywhere.",
          "**General AI** = a flexible all-rounder. Not real yet.",
          "The AI you use today is *always* narrow AI.",
        ],
      },
      {
        id: "how-smart",
        kicker: "Why it seems smart",
        title: "AI learns patterns from data — it doesn't 'understand'",
        body: `An AI that recognizes cats was shown **millions** of cat pictures until it learned the patterns: pointy ears, whiskers, fur. It never learns what a cat *is* the way you know — it just gets very good at matching patterns.\n\nThat's why AI can be amazingly helpful **and** confidently wrong at the same time. It's a pattern machine, not a mind.`,
        callout: {
          label: "Remember this",
          text: "Smart-looking output ≠ understanding. Keep this in mind for every AI tool you use this course.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Why this matters for you",
        body: `You're growing up surrounded by AI. Knowing what it really is — a powerful pattern tool, not a magical brain — helps you use it wisely, question it, and stay in control.\n\nTake the knowledge check when you're ready, then jot a quick reflection.`,
      },
    ],
  },
  bigIdeas: [
    "AI is **software** that does tasks that usually need human intelligence.",
    "All AI today is **narrow AI** — a specialist at one kind of task.",
    "AI finds **patterns in data**; it does not truly understand or feel.",
  ],
  keyTerms: [
    { term: "Artificial Intelligence (AI)", definition: "Software designed to perform tasks that normally require human intelligence." },
    { term: "Narrow AI", definition: "AI that is good at one specific task (the only kind that exists today)." },
    { term: "General AI (AGI)", definition: "A hypothetical AI that could think across any topic like a human. Does not exist yet." },
    { term: "Pattern", definition: "A repeated structure in data that AI uses to make predictions." },
  ],
  realWorld:
    "The video app guessing what you'll watch next, the keyboard finishing your sentence, and the camera blurring your background are all **narrow AI** working behind the scenes.",
  quiz: [
    {
      id: "q1",
      question: "Which statement best describes what AI actually is?",
      choices: [
        "A living digital brain that thinks and feels like a human",
        "Software that does tasks that usually need human intelligence by finding patterns in data",
        "A robot body controlled by electricity",
        "A type of internet connection",
      ],
      correctIndex: 1,
      explanation:
        "AI is software that performs intelligence-like tasks by learning patterns from data. It isn't alive and doesn't truly understand or feel.",
    },
    {
      id: "q2",
      question: "Which kind of AI exists in the real world today?",
      choices: [
        "General AI (AGI) that can do any task a human can",
        "Conscious AI with its own feelings",
        "Narrow AI that specializes in one kind of task",
        "No AI exists yet — it's all fiction",
      ],
      correctIndex: 2,
      explanation:
        "Every AI today is narrow AI — a specialist. General AI that matches human flexibility doesn't exist yet.",
    },
    {
      id: "q3",
      question: "A chatbot writes you a birthday poem. Why can't that same chatbot also safely drive a car?",
      choices: [
        "It would need a faster internet connection",
        "Because each AI today is narrow — good at one task, not all tasks",
        "Because cars don't have keyboards",
        "It actually can — modern AI can do anything",
      ],
      correctIndex: 1,
      explanation:
        "Narrow AI is a specialist. A poem-writing model and a self-driving model are trained for completely different tasks.",
    },
    {
      id: "q4",
      question: "An AI image recognizer says a photo contains a cat. What does it really 'know'?",
      choices: [
        "It understands what a cat is, like you do",
        "Nothing — it guesses randomly",
        "It matched visual patterns (ears, whiskers, fur) it learned from many example images",
        "It asked another human to check",
      ],
      correctIndex: 2,
      explanation:
        "The model learned patterns from millions of labeled images. It's pattern-matching, not understanding.",
    },
  ],
  reflection: {
    prompt:
      "Name one AI tool you used in the last week. What single task is it a 'specialist' at?",
    placeholder: "Example: My phone's photo app — it's a specialist at finding faces in pictures…",
  },
};
