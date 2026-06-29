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
    durationLabel: "~9 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `AI decides which videos you're recommended, can help screen job applications, and even assists in medical and legal tools. So when AI is unfair, it affects real people's real lives. Today you'll learn how that unfairness — **AI bias** — happens, and how it can be reduced.\n\nRoadmap:\n\n• Why AI learns our patterns, *including* our biases.\n• The exact ways bias sneaks in through data.\n• What actually makes AI fairer — and why "computers are neutral" is a myth.\n\nThis is part of the big idea of **Societal Impact**: AI doesn't just answer questions, it shapes opportunities.`,
        image: "/images/lessons/ai-13-bias.png",
        imageAlt: "A scale showing balanced versus skewed training data",
        callout: {
          label: "Why it matters",
          text: "Biased AI can quietly affect who gets seen, hired, or trusted. Knowing how bias works lets you question 'objective' AI decisions instead of accepting them blindly.",
        },
      },
      {
        id: "why",
        kicker: "Big Idea: Societal Impact",
        title: "AI learns our patterns — including our biases",
        body: `Remember the golden rule of machine learning: AI learns from **data made by humans**. If that data reflects unfair patterns from the real world, the AI **learns those patterns too** — and can repeat them at massive scale, to millions of people at once.\n\nThis is **AI bias**: when a system produces systematically unfair results for certain groups of people. It usually isn't intentional — nobody types "be unfair." It gets baked in through the data and the choices behind the model.\n\nThink of AI like a mirror, not a judge. It reflects whatever we show it. Hand it a skewed picture of the world, and it gives a skewed picture back — just faster and bigger.`,
        callout: {
          label: "Key insight",
          text: "AI doesn't invent bias from nowhere — it mirrors and amplifies patterns in its training data.",
        },
      },
      {
        id: "how",
        kicker: "How bias sneaks in",
        title: "Skewed data, skewed AI",
        body: `Bias usually enters through the **training data** — the examples the AI learned from. Three common ways:\n\n• **Unrepresentative data** — a face system trained mostly on one skin tone works worse on others.\n• **Historical bias** — if past hiring favored one group, an AI trained on those records may copy that unfairness as if it were the "right" answer.\n• **Missing groups** — if some people barely appear in the data, the AI performs poorly for them.\n\nNotice the AI isn't "prejudiced" in a human sense — it's faithfully reflecting flawed data. That's why what gets *left out* of the data matters as much as what's put in.`,
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
        body: `Here's the hopeful part: bias can be reduced — but only on purpose. It never fixes itself.\n\n• Collect **diverse, representative** data that includes everyone the AI will affect.\n• **Test** the AI separately across different groups, not just its overall accuracy (a model can look "95% accurate" while failing one group badly).\n• Keep **humans in the loop** for high-stakes decisions like jobs, loans, and justice.\n• Be **transparent** about the system's limits.\n\nAs a user, your job is to stay skeptical: ask *who might this AI be unfair to?* and never assume "the computer" is automatically objective.`,
        callout: {
          label: "Myth buster",
          text: "'Computers are neutral' is false. An AI is only as fair as the data and choices behind it.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Trace where bias enters a hiring AI",
        body: `Imagine a company builds an AI to screen résumés, hoping to save time. Follow how bias creeps in, step by step.\n\n**Step 1 — The training data.** They feed it 10 years of past résumés labeled "hired" or "not hired." But over those 10 years, the company mostly hired men for tech roles.\n\n**Step 2 — The AI finds the pattern.** It notices "hired" résumés often share certain words, schools, even hobbies — and that they rarely came from women. It learns: *this pattern = good candidate.*\n\n**Step 3 — The unfair result.** Now it quietly down-ranks qualified women, not because they're less able, but because the *past data* was unfair. The AI didn't invent the bias — it inherited and amplified it.\n\n**Step 4 — The fix.** Test the tool's results by group, retrain on fairer data, and keep a human reviewing decisions. (This is a real category of problem — companies have scrapped biased hiring tools for exactly this reason.)`,
        code: `Unfair past hiring  →  training data  →  AI learns "pattern of success"
        ↳ that pattern secretly includes "mostly men"
        ↳ AI down-ranks women  →  old bias amplified at scale`,
        codeCaption: "Bias in → bias out, but faster and bigger",
        callout: {
          label: "Pro tip",
          text: "When you hear 'the algorithm decided,' ask what data it learned from. The data is usually where fairness is won or lost.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Because AI affects real decisions about real people, fairness isn't optional — it's a core part of building and using AI responsibly. Your power as a user is to question, not just accept.\n\nNext we cover privacy and deepfakes. First, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check**.`,
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
