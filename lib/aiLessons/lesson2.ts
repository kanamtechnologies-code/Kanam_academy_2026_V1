import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson2: AILessonConfig = {
  id: "ai-2",
  title: "2. AI Is All Around You",
  goal: "Spot the AI hidden in everyday apps and devices, and understand the trade you make — convenience in exchange for your data.",
  xpReward: 100,
  badge: "👀 AI Spotter",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/1",
  nextHref: "/learn/ai/3",
  lessonModule: {
    durationLabel: "~6 min lesson",
    sections: [
      {
        id: "hidden",
        kicker: "The big idea",
        title: "You already use dozens of AIs every day",
        body: `You don't have to open a "robot app" to use AI. It's quietly built into tools you already love. Most of the time you never see it working.\n\nLearning to **spot AI** is the first step to thinking critically about it — because you can't question something you don't notice.`,
        image: "/images/lessons/ai-2-around-you.png",
        imageAlt: "A teen's phone surrounded by everyday apps powered by AI",
        callout: {
          label: "Where you see it",
          text: "Recommendations, face unlock, maps that re-route around traffic, spam filters, autocorrect, voice assistants, photo search, and content feeds are all powered by AI.",
        },
      },
      {
        id: "examples",
        kicker: "Spot the pattern",
        title: "Each one is a prediction",
        body: `Notice what these everyday AIs have in common — they all **predict** something:\n\n• A video feed predicts *which clip will keep you watching*.\n• Maps predict *the fastest route right now*.\n• Your keyboard predicts *the next word you'll type*.\n• A spam filter predicts *whether an email is junk*.\n\nUnder the hood it's the same idea: learn from past data, then predict the best next thing.`,
        bullets: [
          "Recommendation feeds → predict what you'll click or watch.",
          "Maps & ride apps → predict travel time and routes.",
          "Spam filters → predict junk vs. real mail.",
          "Face unlock → predicts 'is this the owner?'",
        ],
      },
      {
        id: "tradeoff",
        kicker: "The hidden deal",
        title: "Convenience is paid for with data",
        body: `These tools feel free, but you usually pay with **data** — what you watch, where you go, what you type. The AI uses that data to get better at predicting *you*.\n\nThat can be genuinely helpful. It can also be used to keep you scrolling longer or to show you ads. Neither is automatically evil — but you should know the deal you're making.`,
        callout: {
          label: "Think about it",
          text: "If an app is free and very good at keeping your attention, ask: what data is it collecting, and who benefits from me using it more?",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Become an AI spotter",
        body: `For the rest of today, try to catch AI in the act — every recommendation, autocomplete, or filter is AI making a prediction about you.\n\nTake the knowledge check, then reflect on the AI you rely on most.`,
      },
    ],
  },
  bigIdeas: [
    "AI is **embedded** in everyday apps — you rarely see it directly.",
    "Most everyday AI is doing one thing: making a **prediction**.",
    "Free, convenient tools usually run on **your data**.",
  ],
  keyTerms: [
    { term: "Recommendation system", definition: "AI that predicts what you'll like next (videos, songs, products) based on past behavior." },
    { term: "Prediction", definition: "An AI's best guess about an outcome, based on patterns in data." },
    { term: "Personal data", definition: "Information about you — clicks, location, messages — that apps collect, often to improve predictions." },
    { term: "Attention economy", definition: "Business model where apps profit by keeping your attention as long as possible." },
  ],
  realWorld:
    "When two friends open the same video app, they see **different** feeds. That's recommendation AI predicting each person separately from their own data.",
  quiz: [
    {
      id: "q1",
      question: "Which of these is powered by AI?",
      choices: [
        "Only special 'AI apps' you download on purpose",
        "Everyday features like video recommendations, spam filters, and face unlock",
        "Nothing on a normal phone uses AI",
        "Only video games",
      ],
      correctIndex: 1,
      explanation:
        "AI is built into many everyday features. You use it constantly without opening a dedicated 'AI app'.",
    },
    {
      id: "q2",
      question: "What do most everyday AIs (feeds, maps, keyboards, spam filters) have in common?",
      choices: [
        "They all make a prediction based on past data",
        "They all talk to you out loud",
        "They are all robots with arms",
        "They all cost money to use",
      ],
      correctIndex: 0,
      explanation:
        "Underneath, they're all predicting the best next thing — the next video, route, word, or spam label.",
    },
    {
      id: "q3",
      question: "Two friends open the same video app and see totally different feeds. Why?",
      choices: [
        "The app is broken",
        "Recommendation AI personalizes each feed from each person's own data",
        "One friend has a newer phone",
        "Feeds are random for everyone",
      ],
      correctIndex: 1,
      explanation:
        "Recommendation systems use each person's history to predict what will keep that specific person engaged.",
    },
    {
      id: "q4",
      question: "A popular app is free and extremely good at keeping you scrolling. What's the smartest question to ask?",
      choices: [
        "Why isn't it more fun?",
        "How can I scroll even more?",
        "What data is it collecting, and who benefits when I use it longer?",
        "Nothing — free apps have no downsides",
      ],
      correctIndex: 2,
      explanation:
        "Free, attention-grabbing apps usually run on your data and profit from your time. Knowing the trade keeps you in control.",
    },
  ],
  reflection: {
    prompt:
      "Pick the one AI-powered app you use most. What data does it likely collect about you, and what does it predict?",
    placeholder: "Example: My music app collects which songs I skip, and predicts playlists I'll like…",
  },
};
