import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson15: AILessonConfig = {
  id: "fl-15",
  title: "15. Big Money Decisions",
  goal: "Apply decision frameworks to cars, phones, and housing tradeoffs — weighing total cost, opportunity cost, and flexibility without prestige pressure.",
  xpReward: 750,
  badge: "Decision Pro",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/14",
  nextHref: "/learn/finance/16",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Big purchases aren't just "Can I afford the monthly payment?" Decision Pros ask better questions — about total cost, risk, and what else that money could do.\n\nHere's our roadmap:\n\n• **A simple decision framework** you can reuse.\n• **Phones** — sticker vs plan vs repair vs upgrade cycles.\n• **Cars** — price, insurance, fuel/maintenance, depreciation.\n• **Housing** — rent, roommates, deposits, commute tradeoffs.\n• **Opportunity cost** — what you give up.\n• **Cooling-off habits** — delay tactics against impulse.\n\nPrestige is optional. Clarity is the skill.`,
        callout: {
          label: "Why it matters",
          text: "One oversized car payment or phone plan can quietly block saving, classes, or moving for a better opportunity.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Decision words that keep you honest",
        body: `• **Total cost of ownership** — purchase price plus ongoing costs (insurance, maintenance, fees, interest).\n• **Opportunity cost** — the next-best thing you give up when you choose.\n• **Depreciation** — value lost as an asset ages (common with cars/phones).\n• **Liquidity / flexibility** — how easily you can change plans if life shifts.\n• **Needs vs wants** — must-haves for goals vs status upgrades.\n• **Sunk cost** — money already spent that shouldn't force a bad future choice.\n\nThese ideas turn vibes into a worksheet.`,
        callout: {
          label: "Pro tip",
          text: "If you can't list three ongoing costs, you don't understand the purchase yet.",
        },
      },
      {
        id: "framework",
        kicker: "The big idea",
        title: "A Decision Pro framework (use every time)",
        body: `Try this six-step loop for cars, phones, housing, or other big spends:\n\n1. **Define the job** — What problem must this solve for 1–3 years?\n2. **Set a max budget** — Including monthly *and* upfront cash.\n3. **List 2–3 options** — Including a cheaper/no-buy path.\n4. **Total the costs** — Upfront + recurring + likely repairs/fees.\n5. **Score tradeoffs** — Reliability, commute time, safety, stress, flexibility.\n6. **Sleep on it** — Especially if a salesperson is rushing you.\n\nWrite it down. Memory lies under pressure; paper doesn't.`,
        bullets: [
          "Always include a 'wait / smaller' option.",
          "Monthly payment ≠ full cost.",
          "If it wrecks your emergency fund, it's probably too big right now.",
        ],
        callout: {
          label: "Watch out",
          text: "\"Only $99/month\" can hide long terms, high interest, or required add-ons.",
        },
      },
      {
        id: "phones-cars",
        kicker: "Apply it",
        title: "Phones and cars — teen-relevant tradeoffs",
        body: `**Phones:** Compare device price, carrier plan, insurance/add-ons, and how often you upgrade. A solid mid-range phone kept longer often beats a flagship on a forever installment. Factor cases, cracked screens, and whether you need the camera for actual work/school.\n\n**Cars:** Beyond the sale price, count insurance (often high for teens), registration, fuel or charging, maintenance, parking, and depreciation. A reliable used car can beat a flashy payment. Also ask: Do I need a car, or do transit/biking/carpool cover the job cheaper?\n\nDecision Pro question: Which option protects my goals for the next two years?`,
        callout: {
          label: "Common misconception",
          text: "\"I need the nicest car/phone to be taken seriously.\" Reliability and cash left for goals usually signal maturity more than chrome.",
        },
      },
      {
        id: "housing",
        kicker: "Apply it",
        title: "Housing tradeoffs: rent, roommates, and location",
        body: `Whether it's a first apartment later or choosing a college housing plan, the same math applies:\n\n• **Rent + utilities + internet + renter-related costs**\n• **Deposits and moving costs** — cash you need *before* the first month.\n• **Commute** — time and money to school/work.\n• **Roommates** — lower rent, higher coordination risk.\n• **Lease length** — flexibility vs price.\n\nCheaper rent far away can lose if transit eats hours and fares. Expensive rent next door can lose if it kills saving. Score both money *and* time.`,
        callout: {
          label: "Try this week",
          text: "Pick one big decision ahead of you (phone upgrade, car, summer housing). Draft the six-step framework with real numbers — even rough ones.",
        },
      },
      {
        id: "opportunity-cost",
        kicker: "Tradeoffs",
        title: "Opportunity cost and cooling-off habits",
        body: `Every big yes is a no to something else: emergency fund progress, courses, travel for family, investing education money, or simply lower stress.\n\nCooling-off habits:\n• 24–72 hour rule on non-urgent upgrades.\n• Bring a budget sheet to the store/dealer.\n• Talk it through with a trusted adult who isn't selling you anything.\n• Beware sunk cost: \"I already spent on repairs\" doesn't mean keep pouring money into a lemon.\n\nDecision Pros aren't joyless — they spend on purpose.`,
        callout: {
          label: "Reality check",
          text: "Sometimes the 'best' financial choice is waiting. Boredom is cheaper than interest.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Use a written framework: job → budget → options → total cost → tradeoffs → wait.\n• Phones, cars, and housing hide recurring costs.\n• Opportunity cost and flexibility matter as much as status.\n• Cooling-off beats sales pressure.\n\nFinish the **Knowledge check**, then reflect on one big decision using the framework.`,
      },
    ],
  },
  bigIdeas: [
    "Big purchases need a **framework**: purpose, budget, options, total cost, tradeoffs, and time to think.",
    "**Total cost of ownership** and **opportunity cost** matter more than the monthly payment headline.",
    "Phones, cars, and housing all trade money for convenience — choose the fit that protects your goals.",
  ],
  keyTerms: [
    { term: "Total cost of ownership", definition: "Upfront price plus ongoing costs like insurance, maintenance, and fees." },
    { term: "Opportunity cost", definition: "The next-best alternative you give up when you choose something." },
    { term: "Depreciation", definition: "Decline in an asset's value over time." },
    { term: "Flexibility", definition: "Ability to change plans without huge penalties if life shifts." },
    { term: "Sunk cost", definition: "Past spending that should not automatically dictate future decisions." },
    { term: "Cooling-off period", definition: "A deliberate wait before finalizing a non-urgent purchase." },
  ],
  realWorld:
    "Two friends want cars. One takes a long high payment for a new model and pauses saving. The other buys a reliable used car, keeps insurance manageable, and still funds an emergency buffer — same 'car job,' different Decision Pro outcomes.",
  quiz: [
    {
      id: "q1",
      question: "What should a Decision Pro include beyond the monthly payment?",
      choices: [
        "Only the brand logo popularity",
        "Upfront costs, insurance/maintenance/fees, and opportunity cost",
        "Salesperson confidence alone",
        "Whether friends will be jealous",
      ],
      correctIndex: 1,
      explanation:
        "Total cost and tradeoffs — not just the monthly number — drive sound big-money decisions.",
    },
    {
      id: "q2",
      question: "What is opportunity cost?",
      choices: [
        "A fee charged by phone carriers only",
        "The next-best thing you give up when you make a choice",
        "A type of car insurance",
        "Money you can never spend again for any reason",
      ],
      correctIndex: 1,
      explanation:
        "Choosing one path means not using that money/time for something else — that's opportunity cost.",
    },
    {
      id: "q3",
      question: "Which phone approach often fits a careful teen budget?",
      choices: [
        "Always finance the newest flagship and upgrade yearly regardless of need",
        "Compare device + plan + add-ons and consider keeping a capable phone longer",
        "Ignore plan costs because only the phone sticker matters",
        "Buy based solely on an influencer unboxing",
      ],
      correctIndex: 1,
      explanation:
        "Total cost and upgrade frequency matter. A capable phone kept longer often beats endless flagship installments.",
    },
    {
      id: "q4",
      question: "When comparing housing options, what belongs in the analysis?",
      choices: [
        "Rent alone with no utilities or deposits",
        "Rent, utilities, deposits, commute time/money, and lease flexibility",
        "Only which building looks best on social media",
        "Roommate drama is irrelevant to cost",
      ],
      correctIndex: 1,
      explanation:
        "Housing decisions include cash needs, ongoing bills, commute, and flexibility — not rent in isolation.",
    },
    {
      id: "q5",
      question: "Why use a cooling-off period on big purchases?",
      choices: [
        "To guarantee the price never changes",
        "To reduce impulse and sales pressure so you can recheck total cost and goals",
        "Because it's illegal to buy same-day",
        "So you can ignore your budget",
      ],
      correctIndex: 1,
      explanation:
        "Waiting helps you verify numbers and opportunity cost without high-pressure vibes driving the choice.",
    },
  ],
  reflection: {
    prompt:
      "Use the six-step Decision Pro framework on a real or hypothetical phone, car, or housing choice. Include total costs and one opportunity cost you're weighing.",
    placeholder:
      "Example: Job — reliable commute to work. Budget — $X upfront / $Y monthly. Options — transit vs used car. Total costs — … Opportunity cost — delaying an emergency fund…",
  },
};
