import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson13: AILessonConfig = {
  id: "ai-13",
  title: "13. Bias, Fairness, and Data",
  goal: "Understand how AI picks up human bias from its data, why that leads to unfair outcomes, and how it can be reduced (the Big Idea of Societal Impact).",
  xpReward: 650,
  badge: "⚖️ Fairness Guardian",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/12",
  nextHref: "/learn/ai/14",
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "why",
        kicker: "Big Idea: Societal Impact",
        title: "AI learns our patterns — including our biases",
        body: `Remember: AI learns from data made by humans. If that data reflects unfair patterns from the real world, the AI **learns those patterns too** — and can repeat them at massive scale.\n\nThis is **AI bias**: when a system produces unfair results for certain groups of people. It usually isn't intentional. It's baked in through the data and choices behind the model.`,
        image: "/images/lessons/ai-13-bias.png",
        imageAlt: "A scale showing balanced versus skewed training data",
        callout: {
          label: "Key insight",
          text: "AI doesn't invent bias from nowhere — it mirrors and amplifies patterns in its training data.",
        },
      },
      {
        id: "how",
        kicker: "How bias sneaks in",
        title: "Skewed data, skewed AI",
        body: `Bias often enters through the **training data**:\n\n• **Unrepresentative data** — a face system trained mostly on one skin tone works worse on others.\n• **Historical bias** — if past hiring favored one group, an AI trained on it may copy that unfairness.\n• **Missing groups** — if some people barely appear in the data, the AI performs poorly for them.\n\nThe AI isn't 'prejudiced' — it's faithfully reflecting flawed data.`,
        bullets: [
          "Unrepresentative data → worse results for underrepresented groups.",
          "Historical bias in data → AI repeats past unfairness.",
          "What's left out matters as much as what's included.",
        ],
      },
      {
        id: "fix",
        kicker: "What helps",
        title: "Fairness takes deliberate effort",
        body: `Bias can be reduced, but only on purpose:\n\n• Collect **diverse, representative** data.\n• **Test** the AI separately across different groups, not just overall accuracy.\n• Keep **humans in the loop** for high-stakes decisions (jobs, loans, justice).\n• Be **transparent** about limits.\n\nAs a user, your job is to stay skeptical: ask who an AI might be unfair to, and don't assume "the computer" is automatically objective.`,
        callout: {
          label: "Myth buster",
          text: "'Computers are neutral' is false. An AI is only as fair as the data and choices behind it.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Fairness is a human responsibility",
        body: `Because AI affects real decisions about real people, fairness isn't optional — it's a core part of building and using AI responsibly.\n\nNext we cover privacy and deepfakes. Take the knowledge check, then reflect on where biased AI could do harm.`,
      },
    ],
  },
  bigIdeas: [
    "**AI bias** = unfair results for some groups, usually learned from data.",
    "Bias enters through **unrepresentative or historically unfair** training data.",
    "Fairness requires **deliberate effort** — 'computers are neutral' is a myth.",
  ],
  keyTerms: [
    { term: "AI bias", definition: "When an AI system produces systematically unfair results for certain groups." },
    { term: "Representative data", definition: "Training data that fairly reflects all the groups the AI will affect." },
    { term: "Historical bias", definition: "Unfair patterns from the past that get baked into data and copied by AI." },
    { term: "Fairness", definition: "Designing and using AI so it doesn't unjustly disadvantage people." },
  ],
  realWorld:
    "Early facial recognition systems were far less accurate for women and people with darker skin, because their training photos were mostly lighter-skinned men. The data shaped the unfairness.",
  quiz: [
    {
      id: "q1",
      question: "Where does AI bias usually come from?",
      choices: [
        "The AI deciding to be prejudiced on its own",
        "Patterns (often unfair ones) in the human-made training data",
        "Slow internet",
        "Using the AI too much",
      ],
      correctIndex: 1,
      explanation:
        "AI learns from human data. If that data is skewed or reflects historical unfairness, the AI absorbs it.",
    },
    {
      id: "q2",
      question: "A face-unlock AI works great for some people but poorly for others. What's the most likely cause?",
      choices: [
        "Those people are using it wrong",
        "The training photos weren't representative of everyone",
        "The AI is jealous",
        "Phones can't recognize faces at all",
      ],
      correctIndex: 1,
      explanation:
        "Unrepresentative training data leads to worse performance for underrepresented groups.",
    },
    {
      id: "q3",
      question: "Is the statement 'computers are neutral, so AI decisions are always objective' true?",
      choices: [
        "True — computers can't be biased",
        "False — an AI is only as fair as the data and design choices behind it",
        "True, but only for chatbots",
        "It depends on the brand of computer",
      ],
      correctIndex: 1,
      explanation:
        "AI reflects its data and the choices of its makers. It is not automatically objective.",
    },
    {
      id: "q4",
      question: "Which of these helps REDUCE AI bias?",
      choices: [
        "Using less diverse data to keep it simple",
        "Only checking overall accuracy and ignoring groups",
        "Collecting representative data and testing performance across different groups",
        "Removing humans from all decisions",
      ],
      correctIndex: 2,
      explanation:
        "Diverse data plus testing across groups (and human oversight on big decisions) helps make AI fairer.",
    },
  ],
  reflection: {
    prompt:
      "Name a real decision where biased AI could seriously harm people. Why would fairness matter especially there?",
    placeholder: "If AI helped decide who gets a job/loan, bias could…",
  },
};
