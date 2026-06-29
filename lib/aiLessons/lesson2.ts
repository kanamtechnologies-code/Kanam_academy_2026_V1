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
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Quick question: how many times have you used AI today? If you said "zero," you're probably off by a few dozen. AI isn't just chatbots — it's woven invisibly into apps you've already opened this morning.\n\nToday you'll learn to:\n\n• **Spot the hidden AI** in everyday apps and devices.\n• See the one thing almost all of them are secretly doing: making a **prediction**.\n• Understand the quiet trade behind "free" apps — convenience in exchange for your **data**.\n\nThis matters because the AI shaping your day — your video feed, your maps, your messages — works best when *you* understand the deal. You can't think critically about something you don't even notice is there.`,
        image: "/images/lessons/ai-2-around-you.png",
        imageAlt: "A teen's phone surrounded by everyday apps powered by AI",
        callout: {
          label: "Why it matters",
          text: "The apps you use most are also the ones quietly learning the most about you. Spotting the AI inside them is the first step to staying in control of your attention and your data.",
        },
      },
      {
        id: "hidden",
        kicker: "The big idea",
        title: "You already use dozens of AIs every day",
        body: `You don't have to open a "robot app" to use AI. It's quietly built into tools you already love, doing its work behind the scenes where you never see it.\n\nThink of AI like the electricity in your house. You don't see it, you rarely think about it, but it's powering almost everything — the lights, the fridge, your charging phone. AI is similar: invisible, constant, and easy to take for granted. When your maps app reroutes around a traffic jam or your camera blurs the background of a selfie, that's AI working silently.\n\nLearning to **spot AI** is the first step to thinking critically about it — because you can't question something you don't notice. Once you start looking, you'll see it everywhere.`,
        callout: {
          label: "Where you see it",
          text: "Recommendations, face unlock, maps that re-route around traffic, spam filters, autocorrect, voice assistants, photo search, and content feeds are all powered by AI.",
        },
      },
      {
        id: "examples",
        kicker: "Spot the pattern",
        title: "Each one is a prediction",
        body: `Here's the cool part. Once you look closely, all these different AIs are secretly doing the *same* thing — they **predict** something:\n\n• A video feed predicts *which clip will keep you watching*.\n• Maps predict *the fastest route right now*.\n• Your keyboard predicts *the next word you'll type*.\n• A spam filter predicts *whether an email is junk*.\n\nIt's like a weather forecaster who studies years of past weather to guess tomorrow's rain. These AIs studied tons of past data — your clicks, millions of trips, billions of emails — and then predict the best next thing. Different apps, same underlying move: learn from the past, predict the future.`,
        bullets: [
          "Recommendation feeds → predict what you'll click or watch.",
          "Maps & ride apps → predict travel time and routes.",
          "Spam filters → predict junk vs. real mail.",
          "Face unlock → predicts 'is this the owner?'",
        ],
        callout: {
          label: "Myth check",
          text: "A personalized feed isn't reading your mind or listening through your microphone. It's predicting from patterns in what you (and people like you) tapped, watched, and skipped before.",
        },
      },
      {
        id: "tradeoff",
        kicker: "The hidden deal",
        title: "Convenience is paid for with data",
        body: `These tools feel free, but you usually pay with **data** — what you watch, where you go, what you type, what you skip. The AI uses that data to get better and better at predicting *you* specifically.\n\nThink of it like a coffee shop that remembers your exact order. Super convenient! But to do that, it has to keep notes on everything you've ever bought. Apps do the same with your behavior, just on a massive scale.\n\nThat can be genuinely helpful — a feed that actually shows you things you like. It can also be used to keep you scrolling longer or to show you more ads. Neither is automatically evil, but you should know the deal you're making so *you* decide if it's worth it.`,
        callout: {
          label: "Think about it",
          text: "If an app is free and very good at keeping your attention, ask: what data is it collecting, and who benefits when I use it more — me, or the company?",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "How a video feed picks your next clip",
        body: `Ever wonder why "just one more video" turns into an hour? Let's trace exactly how a recommendation feed decides what to autoplay next.\n\n**Step 1 — Collect signals.** As you scroll, the app quietly records data: which videos you watched to the end, which you skipped in two seconds, what you liked, paused, or rewatched.\n\n**Step 2 — Find your patterns.** The AI compares your behavior to millions of other users. Maybe people who rewatch skateboarding clips also love parkour fails — so it spots that pattern.\n\n**Step 3 — Predict and rank.** For a pool of possible next videos, it predicts a "watch probability" for each one — how likely *you* are to keep watching.\n\n**Step 4 — Serve the winner.** It autoplays the clip with the highest predicted watch time. You see one perfect video; behind it, thousands were scored and ranked in a split second.\n\nNotice the AI's goal: maximize your watch time, not your happiness or your homework. Those aren't always the same thing.`,
        callout: {
          label: "Pro tip",
          text: "When a feed feels impossible to put down, that's the prediction working *as designed*. Knowing its real goal — keeping you watching — makes it much easier to decide when to close the app.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Big ideas to carry with you: AI is **embedded** in everyday apps, most of it is quietly making a **prediction**, and free, convenient tools usually run on **your data**.\n\nFor the rest of today, try to catch AI in the act — every recommendation, autocomplete, filter, or reroute is AI making a prediction about you.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on the AI you rely on most.`,
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
