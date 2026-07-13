import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson9: AILessonConfig = {
  id: "fl-9",
  title: "9. Saving & Compound Growth",
  goal: "Explain interest, compounding, pay-yourself-first, and the time value of money — and build teen-friendly habits that let savings grow without get-rich promises.",
  xpReward: 450,
  badge: "Growth Saver",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/8",
  nextHref: "/learn/finance/10",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Saving isn't just "putting money aside." It's giving your future self options — and understanding how **interest** and **time** can work for you. Today you'll learn how growth actually works, without hype.\n\nHere's our roadmap:\n\n• **Why saving beats hoping** — goals need cash sitting ready.\n• **Interest** — the fee for borrowing, or the reward for lending/saving.\n• **Compounding** — earning growth on your growth.\n• **Time value of money** — a dollar today vs later.\n• **Pay yourself first** — automation that beats willpower.\n• **Realistic teen tactics** — small, steady beats flashy.\n\nNo get-rich shortcuts. Just clear math and habits that scale with your income.`,
        callout: {
          label: "Why it matters",
          text: "Starting early — even with small amounts — can matter more than waiting for a 'perfect' larger amount later. Time is a tool you already have.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Saving words in plain English",
        body: `These terms show up on apps, statements, and adult conversations. Here's the teen translation:\n\n• **Interest** — money paid for the use of money (you earn it on savings; you pay it on loans).\n• **Principal** — the original amount you save or borrow, before interest.\n• **Compound interest** — interest calculated on principal *plus* interest already earned.\n• **APY / rate** — a percentage that describes how fast money grows (or how expensive a loan is).\n• **Pay yourself first** — treating savings as a non-negotiable "bill" you pay before discretionary spending.\n• **Time value of money** — money available now can be used or grown; waiting has a cost.\n\nWe'll use each idea with examples next — no memorizing first.`,
        callout: {
          label: "Pro tip",
          text: "If a word feels fuzzy, swap in the plain meaning: interest ≈ 'rent on money'; compounding ≈ 'growth on growth.'",
        },
      },
      {
        id: "interest",
        kicker: "The big idea",
        title: "Interest: earning (or paying) for the use of money",
        body: `When you keep money in a savings-style account that pays interest, the institution pays **you** a small percentage for using those deposits. When you borrow, **you** pay interest to the lender.\n\nSimple picture: save $100 at 4% for a year (simplified annual interest) → about $4 of interest, so you end near $104. Real accounts may compound more often and rates change — the point is direction, not a promise.\n\nInterest rates on savings are often modest. That's okay. The skill is building the habit so larger amounts later have a place to grow — and so you're not forced into expensive borrowing when life happens.`,
        bullets: [
          "**Earn** interest when you save/lend; **pay** interest when you borrow.",
          "Rate × time × principal drive the rough size of interest.",
          "Low rates still reward consistency — especially alongside an emergency fund.",
        ],
        callout: {
          label: "Watch out",
          text: "Ads that promise huge guaranteed returns on 'savings' are usually selling something else. Treat extreme claims as a red flag.",
        },
      },
      {
        id: "compounding",
        kicker: "Growth on growth",
        title: "Compounding: why starting early helps",
        body: `**Compounding** means interest gets added to your balance, and then future interest is calculated on that larger balance. Over years, the "interest on interest" can become a bigger share of growth.\n\nTiny illustration (rounded, educational only):\n• Save $50/month for years → the balance grows from deposits *and* any interest earned.\n• Someone who starts later may need much higher monthly deposits to catch up — because they missed years of compounding.\n\nCompounding is powerful **and** slow at first. Early balances look boring. That's normal. The edge is consistency + time, not a viral tip.`,
        callout: {
          label: "Myth check",
          text: "Compounding is not a lottery ticket. It rewards patience and regular deposits — not day trading or 'doubling in a week' schemes.",
        },
      },
      {
        id: "time-value",
        kicker: "Tradeoffs",
        title: "Time value of money — and pay yourself first",
        body: `A dollar you can use **today** is different from a dollar you only get later — because today's dollar can be spent, saved, or invested (with risk). That's the **time value of money** in everyday language.\n\n**Pay yourself first** is the habit that turns the idea into action:\n1. Get paid (job, allowance, gigs).\n2. Move a planned amount to savings *before* shopping and subscriptions.\n3. Live on what's left — adjust the plan if needed, don't skip the transfer forever.\n\nAutomation helps: scheduled transfers beat "I'll save whatever's left" (often nothing). Pair this with goals from earlier lessons so the money has a purpose.`,
        bullets: [
          "Decide the savings amount when you're calm — not mid-scroll in a store.",
          "Even 5–10% of income (when possible) builds muscle memory.",
          "Separate 'emergency' from 'goal' savings if it helps you leave the emergency pile alone.",
        ],
        callout: {
          label: "Try this week",
          text: "Name one savings target and one automatic or recurring transfer (even $5–10) that moves money before you spend.",
        },
      },
      {
        id: "teen-tactics",
        kicker: "Make it real",
        title: "Teen-ready growth habits (no hype)",
        body: `You don't need a huge paycheck to practice Growth Saver skills:\n\n• **Split windfalls** — birthday money or a tax refund: enjoy some, save some, don't invent a lifestyle on one-time cash.\n• **Raise the floor** — when income goes up, increase the automatic save a little before lifestyle expands.\n• **Protect the pile** — keep emergency money boring and accessible; don't treat it like play money.\n• **Ignore flex culture** — someone else's new sneakers aren't a financial plan.\n\nGrowth is mostly behavior: deposit regularly, avoid high-interest debt traps you already studied, and let time do quiet work.`,
        callout: {
          label: "Reality check",
          text: "If money is extremely tight, saving may be tiny or paused while you cover needs. The principle still matters: when cash flow allows, rebuild the habit.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Interest** rewards saving (and costs borrowing).\n• **Compounding** is growth on growth — strongest with time + consistency.\n• **Time value** and **pay yourself first** turn theory into a repeatable habit.\n• Small, steady deposits beat waiting for a dramatic windfall.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on a savings automation you'll actually keep.`,
      },
    ],
  },
  bigIdeas: [
    "**Interest** is the price of using money — you can earn it on savings or pay it on debt.",
    "**Compounding** grows balances by earning on prior interest; time and consistency matter more than hype.",
    "**Pay yourself first** moves savings before spending so growth has a chance to start.",
  ],
  keyTerms: [
    { term: "Interest", definition: "Money earned on savings (or paid on loans) for the use of money." },
    { term: "Principal", definition: "The original amount saved or borrowed before interest." },
    { term: "Compound interest", definition: "Interest calculated on principal plus interest already earned." },
    { term: "Pay yourself first", definition: "Saving a planned amount as soon as income arrives, before discretionary spending." },
    { term: "Time value of money", definition: "The idea that money available now can be used or grown, so timing matters." },
    { term: "APY / interest rate", definition: "A percentage describing how quickly savings grow (or how expensive borrowing is)." },
  ],
  realWorld:
    "A student who automatically moves $20 from each paycheck into savings may feel little pain week to week — but builds a balance that can cover a phone repair or bus pass without a high-interest loan.",
  quiz: [
    {
      id: "q1",
      question: "What does compound interest mean in plain language?",
      choices: [
        "Interest paid only once, then never again",
        "Interest calculated on principal plus interest already earned",
        "A guaranteed way to double money in a month",
        "A fee stores charge for using a debit card",
      ],
      correctIndex: 1,
      explanation:
        "Compounding adds earned interest to the balance so future interest can be calculated on a larger amount.",
    },
    {
      id: "q2",
      question: "What is the core idea of 'pay yourself first'?",
      choices: [
        "Spend first, then save whatever is left over",
        "Treat planned savings like a bill you pay before discretionary spending",
        "Only save after buying everything you want",
        "Never use a checking account",
      ],
      correctIndex: 1,
      explanation:
        "Pay yourself first prioritizes a planned transfer to savings when income arrives, instead of hoping leftovers appear.",
    },
    {
      id: "q3",
      question: "Why can starting to save earlier help even with small amounts?",
      choices: [
        "Because early deposits get more time for compounding to work",
        "Because banks only accept deposits from younger teens",
        "Because small amounts always earn higher rates than large amounts",
        "Because compounding only works for the first year",
      ],
      correctIndex: 0,
      explanation:
        "Time is a major ingredient in compounding. Earlier consistent deposits have more periods to grow — without promising specific returns.",
    },
    {
      id: "q4",
      question: "Which statement best reflects the time value of money?",
      choices: [
        "Money in the future is always worth more than money today",
        "A dollar available now can be used or grown; waiting can mean missing that chance",
        "Cash under a mattress always beats any savings account",
        "Interest rates never change",
      ],
      correctIndex: 1,
      explanation:
        "Money you have now can be spent, saved, or put to work. Delaying receipt or use has opportunity costs — that's the time-value idea.",
    },
    {
      id: "q5",
      question: "Which approach matches a realistic Growth Saver habit?",
      choices: [
        "Follow ads that promise huge guaranteed returns next week",
        "Automate a small recurring transfer to savings and increase it when income rises",
        "Skip an emergency fund because compounding will cover surprises",
        "Wait until you can deposit thousands at once before starting",
      ],
      correctIndex: 1,
      explanation:
        "Steady automation and gradual increases beat hype and all-or-nothing waiting.",
    },
  ],
  reflection: {
    prompt:
      "Name one savings goal and describe how you'll pay yourself first this month (amount or percent, when you'll move it, and how you'll protect that money from impulse spending).",
    placeholder:
      "Example: Goal — $150 emergency buffer. I'll transfer $15 every Friday from paycheck/allowance before weekend spending…",
  },
};
