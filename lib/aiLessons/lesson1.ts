import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson1: AILessonConfig = {
  id: "ai-1",
  title: "1. What Is AI, Really?",
  goal: "Define artificial intelligence in plain language, separate real AI from sci-fi myths, and tell the difference between narrow and general AI.",
  xpReward: 50,
  badge: "AI Explorer",
  dashboardHref: "/dashboard",
  nextHref: "/learn/ai/2",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `The word "AI" is everywhere — on your phone, in the news, maybe even in arguments at the dinner table. By the end of this lesson you'll actually know what it means, and you'll be able to tell the real thing apart from the movie version.\n\nHere's our roadmap:\n\n• **What AI really is** — in plain language, no hype.\n• **Narrow vs. general AI** — why the AI we have today is a specialist, not a robot genius.\n• **Why it *seems* so smart** — the pattern-matching trick behind the curtain.\n\nThis isn't just trivia. The same AI you'll learn about is choosing the next video in your feed, finishing your sentences when you text, helping with homework, and powering the face-unlock on your phone. Understanding it puts *you* in charge of it.`,
        image: "/images/lessons/ai-1-what-is-ai.png",
        imageAlt: "A friendly robot brain made of circuits and data",
        callout: {
          label: "Why it matters",
          text: "You make dozens of decisions every day with help from AI — what to watch, what to buy, which route to take. Knowing how it actually works helps you trust it when you should and question it when you shouldn't.",
        },
      },
      {
        id: "what",
        kicker: "The big idea",
        title: "AI is software that does tasks that usually need human thinking",
        body: `**Artificial intelligence (AI)** is computer software built to do things we normally think of as needing human intelligence — like recognizing a face in a photo, understanding a sentence, recommending a song, or beating a world champion at chess.\n\nHere's a way to picture it. Imagine a brand-new employee who can't think for themselves but has read a *mountain* of examples. Ask them something similar to what they've seen and they'll respond impressively. Ask something totally new and they'll guess based on patterns — sometimes brilliantly, sometimes hilariously wrong. That's today's AI.\n\nThe key thing to hold onto: AI is **not magic and not alive**. It's math and code running on a computer. It looks "smart" because it has found **patterns** in huge amounts of data — not because it understands the world the way you do.`,
        callout: {
          label: "Myth check",
          text: "Today's AI does not have feelings, opinions, or a will of its own. When a chatbot says \"I think\" or \"I'm happy to help,\" it is predicting words that sound right for the situation — not actually thinking or feeling like a person.",
        },
      },
      {
        id: "narrow-vs-general",
        kicker: "Two kinds of AI",
        title: "Narrow AI is real today. General AI is still science fiction.",
        body: `Scientists split AI into two types, and the difference matters a lot:\n\n• **Narrow AI** does **one kind of task** very well — translating text, spotting spam, suggesting videos, recognizing faces. *Every* AI that exists today is narrow AI.\n• **General AI (AGI)** would think, learn, and adapt across *any* topic the way a human can. It **does not exist yet** — it's a long-term goal some researchers are working toward.\n\nThink of narrow AI like the specialists in a hospital. A heart surgeon is incredible at heart surgery but you wouldn't ask them to fix your teeth. In the same way, the chatbot that writes a poem can't drive your car, and the AI that drives a car can't write a poem. Each is a specialist trained for one job.\n\nMovies love to show one super-AI that can do everything and decides to take over the world. That's general AI, and it's fiction for now. The real AI in your life is a collection of narrow specialists, each quietly doing its one task.`,
        bullets: [
          "**Narrow AI** = a specialist tool. Real and everywhere.",
          "**General AI** = a flexible all-rounder, like a human mind. Not real yet.",
          "The AI you use today is *always* narrow AI.",
        ],
        callout: {
          label: "Common misconception",
          text: "When an AI is amazing at one task — say, writing essays — it's tempting to assume it's amazing at everything. It isn't. Skill at one job tells you almost nothing about its skill at a different one.",
        },
      },
      {
        id: "how-smart",
        kicker: "Why it seems smart",
        title: "AI learns patterns from data — it doesn't 'understand'",
        body: `So how does AI get good at its one job? By studying mountains of examples. An AI that recognizes cats was shown **millions** of cat pictures until it learned the patterns that usually show up: pointy ears, whiskers, fur, a certain face shape.\n\nBut here's the subtle part — it never learns what a cat *is* the way you know. You know a cat is a warm, living animal that purrs and chases string. The AI just knows "these number patterns usually get labeled 'cat'." It's matching patterns, not understanding meaning.\n\nThat's exactly why AI can be amazingly helpful **and** confidently wrong at the same time. Show the cat-recognizer a fluffy dog from a weird angle and it might shout "cat!" with total confidence. It's a pattern machine, not a mind — and that gap is one of the most important things to remember all course long.`,
        callout: {
          label: "Common misconception",
          text: "Smart-looking output does not equal real understanding. An answer that sounds confident and polished can still be completely wrong — the AI is matching patterns, not checking facts.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "How an AI decides 'cat or dog', step by step",
        body: `Let's walk through what really happens when a photo app sorts your pictures into "cats" and "dogs." Follow all five steps and you'll see there's no magic — just pattern-matching that gets better over time.\n\n**Step 1 — Collect labeled examples.** Before you ever use it, the AI is shown millions of photos already tagged "cat" or "dog" by humans. Those labels are the answer key it learns from.\n\n**Step 2 — Extract visual patterns.** The AI turns each photo's pixel numbers into useful signals — pointy ears, fur texture, snout shape. This **feature extraction** step pulls out the clues that actually matter for telling pets apart.\n\n**Step 3 — Train the model.** Using those patterns and labels, the AI tunes itself to connect "these features usually mean cat" or "these mean dog." Nobody writes the rules by hand — the model learns them from the examples.\n\n**Step 4 — Predict on a new photo.** You snap a picture of your friend's kitten. The AI extracts the same features, compares them to what it learned, and outputs something like "92% cat, 8% dog." It doesn't *know* it's a cat — it's reporting how strongly the patterns match.\n\n**Step 5 — Check mistakes and improve.** When it mislabels a hairless Sphynx cat as a dog, that's a signal: the training set probably lacked enough unusual examples. Add more varied photos, retrain, and the classifier gets smarter. Good AI teams always loop back like this.`,
        callout: {
          label: "Pro tip",
          text: "Whenever an AI gives you an answer, picture that hidden confidence score behind it. \"92% sure\" means there's still room to be wrong — a healthy reason to double-check anything important.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've got the big picture: AI is **software** that does brain-like tasks by finding **patterns in data**. All of today's AI is **narrow AI** — a specialist at one job. And no matter how smart it sounds, it's matching patterns, not truly understanding.\n\nKnowing this — that it's a powerful pattern tool, not a magical brain — helps you use AI wisely, question it, and stay in control instead of being fooled by it.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then jot a quick reflection about an AI you used this week.`,
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
