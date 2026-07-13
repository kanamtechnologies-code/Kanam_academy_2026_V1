import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson6: AILessonConfig = {
  id: "fl-6",
  title: "6. Spending Tracking & Emergency Funds",
  goal: "Track spending without obsessive guilt, use sinking funds for planned irregular costs, and start a small emergency fund for true surprises.",
  xpReward: 300,
  badge: "Cash Flow Keeper",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/5",
  nextHref: "/learn/finance/7",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `A budget is a plan. **Tracking** is how you see whether reality matches the plan. Today you'll learn lightweight ways to track spending, set up **sinking funds** for predictable \"irregular\" costs, and start an **emergency fund** for true surprises.\n\nHere's our roadmap:\n\n• **Cash flow** — money in vs. money out.\n• **Tracking methods** — apps, notes, receipts — pick one you'll use.\n• **Sinking funds** — save ahead for known future costs.\n• **Emergency funds** — starter cushions for the unexpected.\n• **Patterns** — what two weeks of data can teach you.\n\nGoal: awareness and preparedness — not perfectionism.`,
        callout: {
          label: "Why it matters",
          text: "You can't improve what you never measure. Tracking turns money mysteries into solvable patterns.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `• **Cash flow** is the movement of money in (income) and out (spending/saving) over time.\n• **Tracking** means recording spending so you can see totals by category.\n• A **sinking fund** is money you save gradually for a known future expense (prom, car insurance, new phone).\n• An **emergency fund** is money reserved for unexpected necessary costs (car repair, urgent travel, lost phone you need for work).\n• A **leak** is small, repeated spending that adds up unnoticed (daily snacks, unused subscriptions).\n\nEmergencies are surprises. Sinking funds are expected — you're just paying yourself early.`,
        callout: {
          label: "Pro tip",
          text: "If you can name the expense and roughly when it hits, it's usually a sinking fund — not an \"emergency.\"",
        },
      },
      {
        id: "cash-flow",
        kicker: "The big idea",
        title: "Cash flow: in, out, and leftover",
        body: `**Positive cash flow** for a period means income exceeded spending (you have leftover to save or buffer). **Negative cash flow** means you spent more than you took in — drawing down savings or borrowing.\n\nFor teens, cash flow often swings with work hours. Tracking two or three pay periods teaches you:\n\n• Which categories spike on weekends\n• Whether \"small\" purchases are the real budget-killers\n• How much you can safely automate to savings\n\nCash flow awareness is the heart of the **Cash Flow Keeper** badge.`,
        bullets: [
          "Income − spending = leftover (or shortfall).",
          "Track long enough to see patterns, not one dramatic day.",
          "Irregular income needs a conservative plan.",
        ],
        callout: {
          label: "Watch out",
          text: "Looking only at your bank balance can mislead you when pending charges haven't posted yet. Available balance matters.",
        },
      },
      {
        id: "tracking",
        kicker: "Make it light",
        title: "Track spending in a way you'll continue",
        body: `Pick **one** method:\n\n• Notes app list with category tags\n• Simple spreadsheet\n• Bank/credit app categories (review weekly)\n• Photo receipts into an album for a week, then total\n\nRules of thumb:\n\n• Track for at least **14 days** before judging yourself.\n• Round if needed — direction beats penny-perfect stress.\n• Separate **needs, wants, and goals** when you review.\n• Look for **leaks**: subscriptions you forgot, daily habits that quietly total $50+.\n\nTracking is information. Use it to adjust the budget — not to spiral.`,
        callout: {
          label: "Why it matters",
          text: "Most people underestimate discretionary spending. Data replaces guessing.",
        },
      },
      {
        id: "sinking",
        kicker: "Plan ahead",
        title: "Sinking funds: save before the bill arrives",
        body: `A **sinking fund** turns a scary lump sum into small, scheduled saves.\n\nExample: Prom costs ~$240 in 6 months → about **$40/month** into a \"prom\" savings bucket.\n\nOther teen sinking-fund ideas:\n\n• Car maintenance / new tires\n• Holiday gifts\n• School yearbook / trip fees\n• Phone replacement on a timeline\n• Sports or club dues\n\nLabel the money (sub-account, envelope, or notes). When the expense hits, you're ready — and you don't call it an emergency.`,
        bullets: [
          "Known future cost ÷ months left ≈ monthly save.",
          "Label the fund so you don't \"borrow\" it casually.",
          "Sinking funds protect your emergency money.",
        ],
        callout: {
          label: "Pro tip",
          text: "Automate the transfer on payday when you can. Sinking funds fail most often from \"I'll move it later.\"",
        },
      },
      {
        id: "emergency",
        kicker: "Shock absorber",
        title: "Starter emergency funds for teens",
        body: `An **emergency fund** is for true surprises that are necessary — not sales, not boredom, not \"it was 20% off.\"\n\nStarter targets for many teens (adapt to your life):\n\n• **$100–$500** as a first cushion, or\n• One or two small \"oh no\" expenses you can imagine (phone screen, bus home, basic car issue)\n\nAdults often aim for months of expenses later. You don't need that number today — you need a **start** so one setback doesn't wipe out every goal.\n\nKeep emergency money separate and boring. Replenish it after you use it.`,
        callout: {
          label: "Watch out",
          text: "Raiding the emergency fund for concert tickets turns it into a fun fund. Use sinking funds for planned wants.",
        },
      },
      {
        id: "combine",
        kicker: "Put it together",
        title: "Track → sink → cushion",
        body: `A simple operating system:\n\n**1. Track** spending for two weeks.\n**2. Fix leaks** (cancel unused subs, set want limits).\n**3. Create 1–2 sinking funds** for upcoming known costs.\n**4. Start or grow a small emergency fund.**\n**5. Review cash flow** each payday for 5 minutes.\n\nYou won't do this perfectly. Cash Flow Keepers show up for the review — that's the habit that compounds.`,
        callout: {
          label: "Try this week",
          text: "Write down every purchase for 7 days. Circle one leak and one expense that deserves a sinking fund.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Cash flow** is money in vs. out over time.\n• **Tracking** reveals patterns and leaks.\n• **Sinking funds** save ahead for known costs.\n• An **emergency fund** cushions true surprises — start small.\n• Review on payday; adjust without quitting.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on a sinking fund or emergency starter you'd create.`,
      },
    ],
  },
  bigIdeas: [
    "**Tracking** spending reveals cash-flow patterns and \"leaks\" a budget alone can miss.",
    "**Sinking funds** save gradually for known future expenses so they don't feel like emergencies.",
    "A **starter emergency fund** cushions true surprises — and should stay separate from fun money.",
  ],
  keyTerms: [
    { term: "Cash flow", definition: "Money coming in and going out over a period of time." },
    { term: "Tracking", definition: "Recording spending so you can see where money actually went." },
    { term: "Sinking fund", definition: "Money saved little by little for a known future expense." },
    { term: "Emergency fund", definition: "Money reserved for unexpected necessary costs." },
    { term: "Leak", definition: "Small repeated spending that adds up without much notice." },
    { term: "Available balance", definition: "Money you can spend after accounting for pending transactions." },
    { term: "Replenish", definition: "Putting money back into a fund after you use it." },
  ],
  realWorld:
    "Holiday gifts are not an emergency — they're a calendar event. A $20/paycheck sinking fund beats putting gifts on a credit card in December.",
  quiz: [
    {
      id: "q1",
      question: "What is the main purpose of tracking spending?",
      choices: [
        "To feel guilty every day",
        "To see real patterns so you can adjust your plan",
        "To eliminate all wants forever",
        "To replace having any income",
      ],
      correctIndex: 1,
      explanation:
        "Tracking provides data so you can improve cash flow — not to punish yourself.",
    },
    {
      id: "q2",
      question: "Which expense is the best candidate for a sinking fund?",
      choices: [
        "A totally unpredictable medical emergency tomorrow",
        "Prom costs you know are coming in five months",
        "A random sale you just saw online",
        "Money you already spent last year",
      ],
      correctIndex: 1,
      explanation:
        "Sinking funds are for known future costs you can schedule toward — like prom.",
    },
    {
      id: "q3",
      question: "How is an emergency fund different from a sinking fund?",
      choices: [
        "They are identical",
        "Emergency funds cover unexpected necessary costs; sinking funds cover planned future expenses",
        "Emergency funds are only for vacations",
        "Sinking funds should be spent on anything fun",
      ],
      correctIndex: 1,
      explanation:
        "Emergencies are surprises; sinking funds are expected costs you're prepaying gradually.",
    },
    {
      id: "q4",
      question: "What is a spending \"leak\"?",
      choices: [
        "A broken debit card chip only",
        "Small repeated purchases that add up unnoticed",
        "FDIC insurance failing",
        "Your gross pay amount",
      ],
      correctIndex: 1,
      explanation:
        "Leaks are quiet, recurring spends — snacks, unused subscriptions — that drain cash flow.",
    },
    {
      id: "q5",
      question: "What is a reasonable first step for many teens building an emergency fund?",
      choices: [
        "Wait until they have six months of adult rent saved before starting",
        "Start small (such as a few hundred dollars or one \"oh no\" expense) and keep it separate",
        "Use the emergency fund for every sale",
        "Never replenish it after use",
      ],
      correctIndex: 1,
      explanation:
        "Starter emergency funds are about beginning and protecting a cushion — not hitting adult targets overnight.",
    },
  ],
  reflection: {
    prompt:
      "Name one spending leak you suspect and one upcoming expense that deserves a sinking fund. How would you fund that sinking fund each payday?",
    placeholder: "Example: Leak = daily $6 drinks. Sinking fund = $180 winter formal ÷ 3 months ≈ $60/month…",
  },
};
