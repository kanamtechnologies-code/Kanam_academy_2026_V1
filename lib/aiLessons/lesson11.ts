import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson11: AILessonConfig = {
  id: "ai-11",
  title: "11. Don't Trust — Verify",
  goal: "Build the habit of fact-checking AI output, recognizing hallucinations, and knowing which tasks are risky to trust.",
  xpReward: 550,
  badge: "🔍 Fact Checker",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/10",
  nextHref: "/learn/ai/12",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "AI sounds sure even when it's wrong",
        body: `You learned that LLMs predict **plausible** text, not **true** text — so they can **hallucinate** confident, well-written nonsense. The danger isn't that AI makes mistakes; it's that the mistakes look exactly like correct answers.\n\nSo the golden rule for the AI age: **don't trust, verify.** Treat AI output as a smart first draft to check, not a final fact.`,
        image: "/images/lessons/ai-11-verify.png",
        imageAlt: "A student checking an AI answer against trusted sources",
        callout: {
          label: "Golden rule",
          text: "The more it matters, the more you must verify. Health, money, news, and homework facts always deserve a second source.",
        },
      },
      {
        id: "risky",
        kicker: "Know the danger zones",
        title: "Some tasks are far riskier than others",
        body: `AI is reliable for language tasks and risky for facts. Learn the difference:\n\n• **Usually safe:** rephrasing your text, brainstorming, summarizing something *you* provide, explaining a general concept.\n• **Verify carefully:** specific facts, statistics, dates, quotes, citations, current events, medical/legal/financial advice, and anything you'll be graded or judged on.`,
        bullets: [
          "Safer: rewriting, brainstorming, summarizing text you give it.",
          "Risky: exact facts, numbers, quotes, sources, recent news.",
          "Highest stakes: health, money, legal — always double-check.",
        ],
      },
      {
        id: "how",
        kicker: "How to verify",
        title: "A quick fact-checking routine",
        body: `When an AI gives you something important, run this check:\n\n1. **Source it** — find the claim on a trusted website or textbook.\n2. **Cross-check** — does a second independent source agree?\n3. **Be suspicious of specifics** — exact stats, named studies, and quotes are common hallucination spots.\n4. **Ask the AI to cite** — then verify those citations are real (it may invent them!).`,
        callout: {
          label: "Sneaky trap",
          text: "AI can produce fake citations that look 100% real — author, title, year, all invented. Always confirm sources actually exist.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Be the human in the loop",
        body: `Using AI well doesn't mean believing it — it means staying the **human in the loop** who judges, checks, and decides. That's exactly the skill that makes you more valuable, not less, in an AI world.\n\nNext we'll apply this to schoolwork specifically. Take the knowledge check first.`,
      },
    ],
  },
  bigIdeas: [
    "AI states wrong answers as confidently as right ones — so **verify**.",
    "Language tasks are safer; **facts, numbers, quotes, and news** are risky.",
    "Always confirm **citations and sources actually exist** — AI invents them.",
  ],
  keyTerms: [
    { term: "Verify", definition: "To confirm a claim is true using trusted, independent sources." },
    { term: "Hallucination", definition: "Confident, false AI output that sounds correct." },
    { term: "Human in the loop", definition: "A person who reviews and approves AI output before it's trusted or used." },
    { term: "Cross-check", definition: "Confirming a fact with more than one independent source." },
  ],
  realWorld:
    "Lawyers have been penalized for filing AI-written briefs that cited court cases which never existed. The AI invented them, and no human verified — a costly 'don't trust, verify' lesson.",
  quiz: [
    {
      id: "q1",
      question: "What's the biggest danger of AI hallucinations?",
      choices: [
        "They are written in a strange language",
        "Wrong answers look just as confident and polished as correct ones",
        "They take too long to generate",
        "They always admit when they're unsure",
      ],
      correctIndex: 1,
      explanation:
        "Hallucinations are dangerous precisely because they're fluent and confident, making errors hard to spot.",
    },
    {
      id: "q2",
      question: "Which task is SAFEST to trust with minimal checking?",
      choices: [
        "Getting the exact population of a city in 2024",
        "Listing real scientific studies with page numbers",
        "Rewriting a paragraph you wrote to sound clearer",
        "Summarizing today's breaking news",
      ],
      correctIndex: 2,
      explanation:
        "Rephrasing your own text is a language task and low-risk. Exact facts, citations, and current news are hallucination hot spots.",
    },
    {
      id: "q3",
      question: "An AI gives you three perfect-looking sources for your essay. What should you do?",
      choices: [
        "Cite them immediately — they look real",
        "Check that each source actually exists before trusting or citing it",
        "Assume they're fake and ignore the whole answer",
        "Ask the AI if it's sure, then trust whatever it says",
      ],
      correctIndex: 1,
      explanation:
        "AI can fabricate convincing citations. Always confirm sources are real before using them.",
    },
    {
      id: "q4",
      question: "What does being the 'human in the loop' mean?",
      choices: [
        "Letting the AI make all final decisions",
        "Reviewing, checking, and deciding before AI output is trusted or used",
        "Never using AI at all",
        "Only using AI on weekends",
      ],
      correctIndex: 1,
      explanation:
        "The human in the loop judges and verifies AI output — the key skill for using AI responsibly.",
    },
  ],
  reflection: {
    prompt:
      "Think of one way you might use AI for school. Write a mini fact-check plan: what specifically would you double-check, and where?",
    placeholder: "If I use AI to study history, I'd verify the dates and names by…",
  },
};
