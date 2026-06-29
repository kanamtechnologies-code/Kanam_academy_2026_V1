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
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `AI chatbots are amazing writers — which is exactly why they're dangerous when they're wrong. Today you'll build the single most important habit for the AI age: **don't trust, verify.**\n\nRoadmap:\n\n• Why AI sounds just as confident when it's wrong as when it's right (**hallucinations**).\n• Which tasks are safe to trust and which are risky.\n• A quick routine to fact-check anything that matters.\n\nThis protects you on homework, health questions, news, and money — places where a confident-but-fake answer can really cost you.`,
        image: "/images/lessons/ai-11-verify.png",
        imageAlt: "A student checking an AI answer against trusted sources",
        callout: {
          label: "Why it matters",
          text: "If you cite a fake fact in an essay, follow bad health advice, or share a made-up statistic, the AI doesn't pay the price — you do. Verifying keeps you in control.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "AI sounds sure even when it's wrong",
        body: `Remember how LLMs work: they predict **plausible** text, not necessarily **true** text. So they can **hallucinate** — produce confident, well-written nonsense that *looks* exactly like a correct answer.\n\nPicture a super-smooth talker who never admits "I don't know." They always have an answer, delivered with total confidence — but sometimes they're just making it up. That's an AI hallucination. The danger isn't that AI makes mistakes; it's that the mistakes wear the same polished outfit as the truth.\n\nSo the golden rule: treat AI output as a smart **first draft to check**, not a final fact.`,
        callout: {
          label: "Golden rule",
          text: "The more it matters, the more you must verify. Health, money, news, and graded facts always deserve a second source.",
        },
      },
      {
        id: "risky",
        kicker: "Know the danger zones",
        title: "Some tasks are far riskier than others",
        body: `AI is reliable for **language** tasks and risky for **facts**. Learning the difference tells you when to relax and when to double-check.\n\n• **Usually safe:** rephrasing your own text, brainstorming, summarizing something *you* provide, explaining a general concept.\n• **Verify carefully:** specific facts, statistics, dates, quotes, citations, current events, and any medical, legal, or financial advice.\n\nThe pattern: when the AI is *reshaping words you gave it*, risk is low. When it's *supplying facts from memory*, risk climbs fast.`,
        bullets: [
          "Safer: rewriting, brainstorming, summarizing text you give it.",
          "Risky: exact facts, numbers, quotes, sources, recent news.",
          "Highest stakes: health, money, legal — always double-check.",
        ],
        table: {
          columns: ["What you ask the AI to do", "Risk level"],
          values: [
            ["Rewrite my paragraph to sound clearer", "Low — language task"],
            ["Brainstorm topic ideas", "Low"],
            ["Summarize an article I pasted in", "Low"],
            ["Give an exact statistic or date", "High — verify"],
            ["Provide quotes and citations", "High — verify"],
            ["Summarize today's breaking news", "High — verify"],
          ],
          rowCount: 6,
        },
      },
      {
        id: "how",
        kicker: "How to verify",
        title: "A quick fact-checking routine",
        body: `When an AI gives you something important, run this 4-step check:\n\n1. **Source it** — find the claim on a trusted website, textbook, or official source.\n2. **Cross-check** — does a second, independent source agree?\n3. **Be suspicious of specifics** — exact numbers, named studies, and quotes are common hallucination spots.\n4. **Ask the AI to cite — then verify the citations are real.** It can invent sources that look perfect.\n\nIt takes a couple of minutes and saves you from confidently repeating something false.`,
        callout: {
          label: "Sneaky trap",
          text: "AI can produce fake citations that look 100% real — author, title, year, all invented. Always confirm sources actually exist.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Decide whether to trust an AI answer",
        body: `You ask an AI for an essay fact and it replies: *"A 2019 Harvard study found that teens who sleep 9+ hours score 27% higher on tests."* Sounds perfect. Should you use it? Walk through it.\n\n**Step 1 — Spot the risky parts.** A specific year, a named institution, and an exact percentage — that's a triple hallucination hot spot.\n\n**Step 2 — Source it.** Search for the study. Can you find the actual Harvard study with that 27% figure? If it doesn't turn up on any trusted site, that's a red flag.\n\n**Step 3 — Cross-check.** Do reputable sources (a science site, a .edu, a news outlet) report the same thing? "Sleep helps learning" may be generally true, but that *exact* stat could be invented.\n\n**Step 4 — Decide.** If you can't confirm it, don't use it. Either find a real source or drop the claim. Never cite what you couldn't verify.`,
        code: `Claim: "2019 Harvard study: 9+ hrs sleep → 27% higher scores"
   ↳ specific year? ⚠️    named source? ⚠️    exact %? ⚠️
Search for it → can't find the real study → 🚩 likely hallucinated
Verdict: do NOT cite until confirmed by a real source`,
        codeCaption: "Tracing a suspicious AI 'fact'",
        callout: {
          label: "Pro tip",
          text: "If a statistic feels oddly specific and you can't find its original source in a minute or two, assume it might be hallucinated and leave it out.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Using AI well doesn't mean believing it — it means staying the **human in the loop** who judges, checks, and decides. That habit is exactly what makes you more valuable, not less, in an AI world.\n\nNext we'll apply this to schoolwork specifically. First, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check**.`,
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
