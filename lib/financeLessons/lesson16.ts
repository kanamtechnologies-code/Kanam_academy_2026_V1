import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson16: AILessonConfig = {
  id: "fl-16",
  title: "16. Capstone: Your First-Year Money Plan",
  goal: "Synthesize the Financial Literacy track into a practical 12-month plan for your first year after high school — college, work, or a mix — without get-rich promises.",
  xpReward: 800,
  badge: "Money Planner",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/15",
  lessonModule: {
    durationLabel: "~12–15 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-16.png",
        imageAlt: "Capstone desk: calendar for first year after high school, budget notebook, and a checklist titled Money plan",
        body: `This is your **Financial Literacy capstone**. You'll turn the whole track into one usable plan for your **first year after high school** — not a 30-year retirement fantasy, but a Money Planner blueprint you could actually run.\n\nHere's the plan:\n\n• Meet a **first-year scenario** you can adapt to your life.\n• Fast **track recap** of tools you already built.\n• Lock **goals + budget + emergency fund**.\n• Set **credit, saving/investing awareness, and protection** habits.\n• Add **scam defense + big-decision rules**.\n• Write a **12-month money plan** for college-or-work year one.\n\nBy the end, you should sound like someone who owns their next year of money decisions.`,
        callout: {
          label: "Why it matters",
          text: "Knowledge without a plan fades. A one-page plan with dates and amounts becomes a habit system — especially when life gets busier after graduation.",
        },
      },
      {
        id: "scenario",
        kicker: "Your mission",
        title: "Scenario: Jordan's first year after high school",
        body: `Meet **Jordan**, 18, in their first year of more independence — either starting college or working full-time:\n\n• Part-time job or campus work (~$200–$400 take-home some weeks; uneven hours).\n• Phone plan on family account for now; wants upgrades.\n• Thinking about a used car *or* sticking with transit.\n• Has a small savings balance but dips into it for impulse buys.\n• Curious about credit but hasn't built habits yet.\n• If in college: aid letters that mix grants and loans; scholarship apps still open.\n• If working: first apartment with roommates is on the horizon.\n• Family is helpful but wants Jordan to show a plan.\n\nYour job: build Jordan a **12-month money plan** using Lessons 1–15. Then adapt the same structure to *you*.`,
        callout: {
          label: "Constraints",
          text: "No viral side-hustle miracles. Use realistic income, clear priorities, and defenses against scams and lifestyle creep.",
        },
      },
      {
        id: "recap",
        kicker: "Capstone",
        title: "Your money toolkit — quick recap",
        body: `You've built a full kit across the track. Today's job is to *use* it:\n\n• **Foundations:** goals, needs/wants, tradeoffs, paychecks, accounts/cards.\n• **Cash flow:** budgets, tracking, emergency funds.\n• **Credit & debt:** scores/reports awareness, interest, loan traps.\n• **Growth:** saving, compounding, investing basics & risk (long horizon).\n• **Protection:** insurance concepts, scam/fraud/consumer rights.\n• **Bigger stage:** taxes & first job, college aid navigation, big money decisions.\n\nYou don't need every tactic every month. You need the *right few* with owners and dates.`,
        callout: {
          label: "You can now",
          text: "Explain tradeoffs in plain English, build a budget, spot scam pressure, and compare aid or purchase options — core financial literacy.",
        },
      },
      {
        id: "core-plan",
        kicker: "Apply it",
        title: "Goals, budget, and emergency fund first",
        image: "/images/lessons/fl-16-2.png",
        imageAlt: "Infographic first-year money plan pillars: Income, Budget, Emergency cushion, Goals",
        body: `For Jordan (and you), start where stability lives:\n\n1. **Goals** — one near-term (3 months), one medium (12 months). Make them specific amounts.\n2. **Budget** — net income → needs → savings transfer → wants. Pay yourself first even if small.\n3. **Emergency fund** — a starter target (even $200–$500) in a separate place before upgrade sprees.\n4. **Tracking** — weekly 10-minute check: what came in, what went out, what to adjust.\n\nIf income is uneven, budget with a **low-week baseline** and treat extra hours as bonus toward goals — not instant lifestyle.`,
        bullets: [
          "Write goals with dollar amounts and dates.",
          "Automate savings when possible.",
          "Don't call impulse cash an emergency.",
        ],
        callout: {
          label: "Common failure",
          text: "A perfect spreadsheet you never open. A simple plan you review weekly wins.",
        },
      },
      {
        id: "credit-protect-grow",
        kicker: "Apply it",
        title: "Credit habits, growth awareness, and protection",
        body: `**Credit habits (responsible, not flashy):**\n• If using a card (with family rules): spend only what you can pay — ideally in full — on time.\n• Keep utilization modest; never ignore statements.\n• Check for errors/fraud alerts with adult help when appropriate.\n\n**Saving & investing awareness:**\n• Keep short-term money safe and accessible.\n• Treat investing as long-horizon education — not day trading with rent money.\n• Let compounding work through consistency, not hype.\n\n**Insurance & consumer defense:**\n• Know what coverage you're on; ask deductible questions before claims.\n• Pause on urgency scams; compare before big buys; document complaints.\n\n**Taxes & aid:**\n• Budget on net pay; keep forms.\n• Compare college/program offers by net price and loan totals.`,
        callout: {
          label: "Defender view",
          text: "Protection (scams, insurance awareness, emergency cash) keeps one bad week from erasing months of progress.",
        },
      },
      {
        id: "twelve-month",
        kicker: "Deliverable",
        title: "12-month money plan template",
        image: "/images/lessons/fl-16-3.png",
        imageAlt: "12-month roadmap poster on a wall with quarterly money goals for a recent high school graduate",
        body: `Hand this structure to yourself (or a parent/sponsor):\n\n**1. Income reality** — typical monthly net; low-week plan.\n**2. Top 3 goals** — amounts + months.\n**3. Budget rules** — needs %, auto-save amount, wants cap.\n**4. Emergency fund milestones** — 3-month and 12-month targets.\n**5. Credit rules** — if any card/loan: pay-on-time covenant.\n**6. Big decisions gate** — phone/car/housing must pass total-cost + 72-hour wait.\n**7. Scam protocol** — no gift cards/codes under pressure; verify officially.\n**8. Learning calendar** — quarterly checkup: budget, goals, aid/tax deadlines if relevant.\n**9. Review dates** — first Sunday each month.\n\nShort beats perfect. A plan you follow beats a novel you ignore.`,
        bullets: [
          "Name dollar amounts, not vibes.",
          "Schedule reviews so the plan doesn't rot.",
          "Update when income or goals change.",
        ],
        callout: {
          label: "Ethics",
          text: "Your plan should be honest about income and obligations — no fake flex numbers.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn — build the year",
        body: `You've walked the full money path. Capstone recap:\n\n• Synthesize **goals, budget, emergency fund, credit habits, saving/investing awareness, insurance, scam defense, taxes/aid literacy, and decision frameworks**.\n• Favor a few high-impact rules with review dates.\n• Write a 12-month plan for your first year after high school.\n\nComplete the **Knowledge check** (it mixes ideas across the track), then write your **first-year money plan** in the reflection. You've earned the **Money Planner** finish line — go show the synthesis.`,
      },
    ],
  },
  bigIdeas: [
    "Capstone money skill is **synthesis**: a short 12-month plan with goals, budget rules, and review dates.",
    "Stability stack first — **emergency fund + budget + scam defense** — then growth and bigger purchases.",
    "Credit, investing, insurance, taxes, and aid literacy all support the same aim: options and resilience, not get-rich hype.",
  ],
  keyTerms: [
    { term: "Money plan", definition: "A short, dated set of goals, budget rules, protections, and review habits." },
    { term: "Emergency fund", definition: "Savings set aside for unexpected necessary expenses." },
    { term: "Pay yourself first", definition: "Saving a planned amount before discretionary spending." },
    { term: "Net price", definition: "College/program cost after gift aid — used when comparing offers." },
    { term: "Total cost of ownership", definition: "Purchase price plus ongoing costs for big items like phones, cars, housing." },
    { term: "Risk transfer", definition: "Using insurance to share certain large financial risks for a premium." },
    { term: "Diversification", definition: "Spreading investments to reduce single-asset risk (does not remove all risk)." },
  ],
  realWorld:
    "Students who write a simple monthly review — income, savings transfer, scam red flags, and one goal check — rarely 'get rich quick,' but they also rarely get wiped out by one impulsive upgrade or phishing text.",
  quiz: [
    {
      id: "q1",
      question: "Jordan has uneven job hours and wants a phone upgrade and an emergency fund. What should come first in a Money Planner approach?",
      choices: [
        "Finance the most expensive phone immediately to build confidence",
        "Set a realistic budget on low-week income, automate a small save toward an emergency target, then revisit the upgrade",
        "Day trade leftover cash to fund both faster",
        "Skip budgeting because motivation is enough",
      ],
      correctIndex: 1,
      explanation:
        "Capstone synthesis: stabilize cash flow and emergency savings before lifestyle upgrades.",
    },
    {
      id: "q2",
      question: "An aid letter shows a large 'award' that is mostly loans. What is the Aid Navigator reading?",
      choices: [
        "Loans are the same as grants",
        "Gift aid reduces net price; loans are debt that must be repaid under their terms",
        "Sticker price no longer matters for any reason",
        "FAFSA is irrelevant once any award appears",
      ],
      correctIndex: 1,
      explanation:
        "Track integration from college-costs lesson: separate gift aid from borrowing.",
    },
    {
      id: "q3",
      question: "A text says Jordan must pay a fine with gift cards to keep an account open. What scam-defense move fits the track?",
      choices: [
        "Buy gift cards quickly to be safe",
        "Treat urgency + gift cards as a red flag; verify on an official channel and tell a trusted adult",
        "Share a one-time code from the text",
        "Ignore consumer rights because teens aren't targets",
      ],
      correctIndex: 1,
      explanation:
        "Consumer Guardian skills from earlier lessons: pause, verify, don't pay under panic scripts.",
    },
    {
      id: "q4",
      question: "Jordan considers a car with a manageable monthly payment but hasn't totaled insurance and maintenance. Which Decision Pro idea applies?",
      choices: [
        "Monthly payment alone defines affordability",
        "Use total cost of ownership and opportunity cost — including insurance, fuel/maintenance, and what savings would be skipped",
        "Depreciation never matters for used cars",
        "Cooling-off periods are only for phones",
      ],
      correctIndex: 1,
      explanation:
        "Big-money decisions require full cost and tradeoff analysis, not payment headlines.",
    },
    {
      id: "q5",
      question: "Which 12-month plan element best shows track-wide synthesis?",
      choices: [
        "Only listing a dream income with no actions",
        "Goals with amounts, budget/auto-save rules, emergency milestones, credit/scam/decision gates, and monthly review dates",
        "A promise to get rich by next summer with no risk",
        "Skipping taxes/aid awareness because those are 'adult only'",
      ],
      correctIndex: 1,
      explanation:
        "A Money Planner capstone ties goals, cash flow, protection, and scheduled reviews into one living document.",
    },
  ],
  reflection: {
    prompt:
      "Write your first-year-after-high-school money plan (or Jordan's). Include: top goals with amounts, budget/auto-save rules, emergency fund milestones, credit/scam/decision rules, and when you'll review each month.",
    placeholder:
      "Example: Goals — $400 emergency by December; $150 activity fund by June. Auto-save $20 on each payday. Scam rule — no codes/gift cards under pressure. Car/phone — 72-hour wait + total cost sheet. Review — first Sunday…",
  },
};
