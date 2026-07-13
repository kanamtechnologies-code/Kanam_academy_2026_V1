import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson1: AILessonConfig = {
  id: "fl-1",
  title: "1. Money, Goals & You",
  goal: "Explain money as a tool (not an identity), tell short-, medium-, and long-term goals apart, and write SMART-ish money goals that fit a high school life.",
  xpReward: 50,
  badge: "Money Starter",
  dashboardHref: "/dashboard",
  nextHref: "/learn/finance/2",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Money shows up everywhere — a paycheck from a first job, money for gas, saving for a car, splitting a group gift, or planning for college. This lesson starts at the foundation: what money *is*, what you want it to *do*, and how to turn fuzzy wishes into clear goals.\n\nHere's our roadmap:\n\n• **Money as a tool** — it buys choices; it doesn't define your worth.\n• **Goal horizons** — short, medium, and long term.\n• **SMART-ish goals** — clear enough to act on, flexible enough for real teen life.\n• **Values → goals** — why two people with the same income can choose totally different plans.\n• **Your starter plan** — one goal you can name and track this month.\n\nNo prior finance class needed. Every new word gets explained when it appears. This track is **educational** — habits and decision skills, not get-rich-quick tips.`,
        callout: {
          label: "Why it matters",
          text: "Clear money goals reduce stress and impulse spending. When you know what you're aiming for, it's easier to say yes to what matters and no to what doesn't.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `Before we dive in, here are the core words for this lesson — explained simply.\n\n• **Money** is a tool you use to trade for goods and services — and to save for later.\n• A **goal** is a specific result you want, with a rough timeline.\n• **Income** is money you receive (job, allowance, gifts, side work).\n• **Spending** is money you use now; **saving** is money you set aside for later.\n• A **priority** is something you rank as more important than other options.\n\nKeep these in mind. Everything else in the lesson builds on them.`,
        callout: {
          label: "Pro tip",
          text: "When a money word feels fancy, swap in the plain meaning. \"Allocate income toward a goal\" just means \"decide where this money goes.\"",
        },
      },
      {
        id: "money-tool",
        kicker: "The big idea",
        title: "Money is a tool — not a personality",
        body: `**Money** is a medium of exchange: it lets you trade your time and skills for things and experiences. It can buy food, a bus pass, a phone plan, concert tickets, or breathing room when something breaks.\n\nWhat money is *not*:\n\n• A measure of how good a person you are.\n• Proof that someone is smarter than someone else.\n• A guarantee of happiness.\n\nTwo students can earn the same amount and feel totally different about money — because they value different things. One might save hard for a used car; another might spend more on shared experiences with friends. Neither is automatically \"right.\" The skill is matching your money choices to **your** priorities — and adjusting when life changes.\n\nThink of money like a backpack: useful for carrying what you need for the trip. The trip matters more than the pack.`,
        bullets: [
          "**Money** = a tool for choices over time.",
          "Your **values** shape what \"enough\" and \"worth it\" mean.",
          "Comparing yourself to others' spending usually creates noise, not a plan.",
        ],
        callout: {
          label: "Watch out",
          text: "Social media shows highlight reels of spending. Treat those as entertainment, not a budget. Your real life has different constraints — and that's normal.",
        },
      },
      {
        id: "horizons",
        kicker: "Time frames",
        title: "Short, medium, and long-term goals",
        body: `Money goals get clearer when you name the **time horizon** — how soon you want the result.\n\n• **Short-term** — roughly days to a few months. Examples: concert ticket next month, sports gear this season, holiday gifts.\n• **Medium-term** — roughly several months to a couple of years. Examples: a used car down payment, a laptop for college, a senior trip fund.\n• **Long-term** — years ahead. Examples: college costs, first apartment deposits, building emergency savings as an adult.\n\nYou can work on more than one horizon at once — but not by dumping every dollar into the farthest goal and ignoring next week's needs. A healthy plan usually protects a little for *now*, a little for *soon*, and a little for *later*.\n\nIf everything feels equally urgent, list goals and circle the one that would reduce the most stress if you made progress this month.`,
        callout: {
          label: "Why it matters",
          text: "Without horizons, \"I should save\" stays vague. Naming *when* turns a wish into something you can schedule and measure.",
        },
      },
      {
        id: "smart",
        kicker: "Make it doable",
        title: "SMART-ish goals for teens",
        body: `Adults often teach **SMART** goals: Specific, Measurable, Achievable, Relevant, Time-bound. For high school, use a lighter version — **SMART-ish** — so goals stay clear without feeling like a corporate memo.\n\nAsk:\n\n• **Specific** — What exactly? (\"Save for a used car\" beats \"be better with money.\")\n• **Measurable** — How will you know progress? (A dollar amount or a checklist.)\n• **Achievable** — Given your real income and expenses, is this realistic?\n• **Relevant** — Does this match what you care about right now?\n• **Time-bound** — By when?\n\nWeak: \"Save more.\"\nSMART-ish: \"Save $150 for new cleats by October 15 by putting $25 from each paycheck into a labeled savings envelope or account.\"\n\nYou can revise a goal when income changes or a new priority appears. Revising is planning — not failing.`,
        bullets: [
          "Vague goals are hard to start; clear goals are easier to track.",
          "If the math doesn't fit your income, shrink the goal or extend the deadline.",
          "Write the goal where you'll see it when you get paid.",
        ],
        callout: {
          label: "Pro tip",
          text: "Attach a goal to a paycheck habit: \"When money hits, move the goal amount first.\" Paying yourself first beats hoping leftovers appear.",
        },
      },
      {
        id: "values",
        kicker: "Your filter",
        title: "Values turn goals into decisions",
        body: `A **value** is what you treat as important — independence, family, creativity, safety, fun, faith, learning. Values aren't right or wrong in the abstract; they help you choose when money is limited (which it always is).\n\nExample: You have $40 left this week.\n\n• If you value **reliability**, you might put gas in the car so you can get to work.\n• If you value **connection**, you might chip in for a friend's birthday.\n• If you value **future options**, you might add to a college or car fund.\n\nNone of those choices is automatically selfish or smart. The question is: Did you choose on purpose, or on autopilot?\n\nTry a 60-second check before a non-essential purchase: \"Does this help a goal I named, or am I just filling boredom / matching someone else's feed?\" That pause is financial literacy in action.`,
        callout: {
          label: "Watch out",
          text: "Saying you value \"saving for college\" while spending every extra dollar on impulse buys is a mismatch. Aligning spending with stated values is the real skill.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Money** is a **tool** for choices — not a scoreboard for your worth.\n• Goals have **horizons**: short, medium, and long term.\n• **SMART-ish** goals are specific, measurable, realistic, relevant, and timed.\n• Your **values** help you choose when you can't fund everything.\n• One clear goal you track beats ten vague wishes.\n\nWhen you're ready, switch to the **Knowledge check**, then write a short reflection about one money goal that matters to you.`,
      },
    ],
  },
  bigIdeas: [
    "**Money** is a tool for making choices over time — not a measure of personal worth.",
    "Naming **short-**, **medium-**, and **long-term** horizons makes goals easier to plan.",
    "**SMART-ish** goals (specific, measurable, realistic, relevant, timed) turn wishes into actions.",
  ],
  keyTerms: [
    { term: "Money", definition: "A tool used to trade for goods and services and to save for future needs." },
    { term: "Goal", definition: "A specific result you want, ideally with a timeline and a way to measure progress." },
    { term: "Income", definition: "Money you receive from a job, allowance, gifts, or other sources." },
    { term: "Saving", definition: "Setting money aside for future use instead of spending it now." },
    { term: "Priority", definition: "Something you rank as more important than competing options." },
    { term: "Values", definition: "What you treat as important, which guides tradeoffs when money is limited." },
    { term: "SMART goal", definition: "A goal that is Specific, Measurable, Achievable, Relevant, and Time-bound." },
    { term: "Time horizon", definition: "How soon you want a goal — short, medium, or long term." },
  ],
  realWorld:
    "A student who writes \"Save $200 for a phone repair fund by winter break\" (SMART-ish) is less likely to raid that money for random weekend spending than someone who only says \"I should save.\"",
  quiz: [
    {
      id: "q1",
      question: "Which statement best describes money in this lesson?",
      choices: [
        "A score of how successful someone is as a person",
        "A tool for making choices and trading for goods and services",
        "A guarantee that you will never feel stressed",
        "Something only adults need to think about",
      ],
      correctIndex: 1,
      explanation:
        "Money is a tool for exchange and planning. It is not a measure of personal worth or a guarantee of happiness.",
    },
    {
      id: "q2",
      question: "Saving for a used car over the next 18 months is best classified as which kind of goal?",
      choices: [
        "Short-term only",
        "Medium-term",
        "Impossible for a teen",
        "Not a money goal",
      ],
      correctIndex: 1,
      explanation:
        "Medium-term goals typically span several months to a couple of years — like saving toward a car over 18 months.",
    },
    {
      id: "q3",
      question: "Which goal is the most SMART-ish?",
      choices: [
        "Be better with money",
        "Save somehow",
        "Save $120 for prom shoes by April 1 by setting aside $30 from each biweekly paycheck",
        "Get rich someday",
      ],
      correctIndex: 2,
      explanation:
        "The third option is specific, measurable, realistic for many teens, relevant, and time-bound — SMART-ish.",
    },
    {
      id: "q4",
      question: "Why do values matter in money decisions?",
      choices: [
        "They replace the need for any plan",
        "They help you choose when you cannot fund everything at once",
        "They guarantee you will earn more income",
        "They only matter for millionaires",
      ],
      correctIndex: 1,
      explanation:
        "Values act as a filter for tradeoffs. When money is limited, knowing what matters helps you choose on purpose.",
    },
    {
      id: "q5",
      question: "What is a practical habit for making progress on a savings goal?",
      choices: [
        "Wait until the end of the month and hope money is left",
        "Move the goal amount when you get paid (pay yourself first)",
        "Never write the goal down so it stays flexible",
        "Compare every purchase to what influencers buy",
      ],
      correctIndex: 1,
      explanation:
        "Moving money toward the goal when income arrives beats hoping leftovers appear — a core \"pay yourself first\" habit.",
    },
  ],
  reflection: {
    prompt:
      "Write one SMART-ish money goal for the next 1–3 months. Include the amount (or clear result), the deadline, and one habit that will fund it.",
    placeholder: "Example: Save $100 for homecoming by Oct 10 by putting $20 from each Friday paycheck into savings…",
  },
};
