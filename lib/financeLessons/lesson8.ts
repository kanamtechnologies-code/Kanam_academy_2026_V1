import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson8: AILessonConfig = {
  id: "fl-8",
  title: "8. Interest, Loans & Debt Traps",
  goal: "Define APR and principal, explain how interest grows balances, and recognize debt traps like payday loans, risky BNPL use, and minimum-payment cycles — educational awareness only.",
  xpReward: 400,
  badge: "Debt Defender",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/7",
  nextHref: "/learn/finance/9",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Borrowing can help when used carefully — and it can become a trap when costs are unclear or payments never shrink the balance. Today you'll learn the language of **interest**, spot high-risk products, and see why **minimum payments** can keep you in debt for years.\n\nHere's our roadmap:\n\n• **Principal and interest** — what you borrowed vs. the cost of borrowing.\n• **APR** — a standardized way to talk about yearly cost.\n• **How balances grow** — simple mental math, not lender software.\n• **Debt traps** — payday loans, risky BNPL habits, fee spirals.\n• **Minimum payments** — why \"affordable today\" can be expensive tomorrow.\n\nEducational awareness only — not a recommendation to take or avoid a specific loan for your personal situation. When in doubt, ask a trusted adult and read terms slowly.`,
        callout: {
          label: "Why it matters",
          text: "Understanding interest turns scary fine print into a decision you can evaluate — before a balance owns your future cash flow.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `• **Principal** is the amount you borrow (or the remaining loan balance before interest).\n• **Interest** is the cost of borrowing money — usually expressed as a rate over time.\n• **APR (Annual Percentage Rate)** is a yearly rate that helps you compare borrowing costs more apples-to-apples (it can include certain fees depending on the product rules).\n• A **loan term** is how long you have to repay.\n• A **minimum payment** is the smallest amount a creditor requires that period — often not enough to clear the balance quickly.\n• **BNPL (Buy Now, Pay Later)** splits a purchase into installments; missed payments can mean fees and credit consequences.\n• A **payday loan** is a short-term, typically very expensive loan tied to your next paycheck — high risk for many borrowers.\n\nIf a cost is hard to understand in one minute, slow down — confusion is a warning light.`,
        callout: {
          label: "Pro tip",
          text: "Ask two questions every time: \"What is the APR / fee structure?\" and \"What happens if I'm late?\"",
        },
      },
      {
        id: "principal-interest",
        kicker: "The big idea",
        title: "Principal is the loan; interest is the rental fee on money",
        body: `When you borrow **$1,000**, that $1,000 is the starting **principal**. The lender charges **interest** for letting you use that money.\n\nRough intuition (not a full amortization lesson):\n\n• Higher rate → faster-growing cost if you carry a balance.\n• Longer time carrying a balance → more total interest paid.\n• Paying more than the minimum → usually shrinks principal faster → less interest over time.\n\nCredit cards often charge interest on revolving balances if you don't pay in full. Installment loans (like many auto loans) have scheduled payments of principal + interest over a term.\n\nDebt Defender mindset: interest is not a surprise \"gotcha\" if you read it — but it *feels* like a gotcha if you only look at the monthly payment.`,
        bullets: [
          "**Principal** = amount borrowed / owed before interest.",
          "**Interest** = cost of borrowing over time.",
          "Time + rate + unpaid balance drive total cost.",
        ],
        callout: {
          label: "Watch out",
          text: "A low monthly payment can hide a high total cost. Always ask how long until you're done and what you'll pay overall.",
        },
      },
      {
        id: "apr",
        kicker: "Compare carefully",
        title: "APR: a yearly cost signal",
        body: `**APR** helps you compare loans and cards more fairly than looking at fees alone or \"only $20 down!\" marketing.\n\nExamples of why APR literacy matters:\n\n• A store card might advertise easy approval but carry a high APR if you carry a balance.\n• Two loans with similar monthly payments can have very different APRs and total interest.\n• Short-term loans can have fees that translate into extremely high effective costs even if the dollar fee looks \"small.\"\n\nAPR isn't the only factor (can you afford payments? is the loan necessary?). But ignoring APR is how people walk into expensive debt with a smile.\n\nThis class does **not** tell you which APR is \"good\" for your personal deal — markets change, and your situation matters. Learn to **notice and compare**.`,
        callout: {
          label: "Why it matters",
          text: "APR turns \"sounds cheap\" into \"here's the yearly cost language regulators require so shoppers can compare.\"",
        },
      },
      {
        id: "traps",
        kicker: "High risk",
        title: "Debt traps to recognize early",
        body: `**Payday-style loans**\nOften marketed as quick fixes until payday. Costs can be extremely high, and many borrowers struggle to repay without reborrowing — a cycle.\n\n**BNPL (Buy Now, Pay Later)**\nCan be fine when you already had the money and just want scheduling — and you pay every installment on time. It becomes risky when you stack multiple plans, lose track of due dates, or buy things you couldn't afford in cash. Late fees and credit reporting can apply depending on the provider.\n\n**Fee spirals**\nLate fees + penalty rates + over-limit fees can make a balance balloon beyond the original purchase.\n\n**\"Easy approval\" culture**\nIf the marketing focuses on speed and lifestyle — not cost and repayment — pause. Debt Defender instinct: slow down.`,
        bullets: [
          "High cost + short fuse + reborrowing = danger pattern.",
          "BNPL is still debt — track every installment.",
          "Stacking debts multiplies due-date risk.",
        ],
        callout: {
          label: "Watch out",
          text: "If you're borrowing to cover last month's borrowing, you're in a cycle — talk to a trusted adult before taking another high-cost loan.",
        },
      },
      {
        id: "minimums",
        kicker: "The slow leak",
        title: "The minimum payment trap",
        body: `Credit cards often let you pay a **minimum** — a small percentage of the balance or a floor amount. That keeps the account \"current,\" but:\n\n• Most of a small payment may go to interest when balances and APRs are high.\n• Principal shrinks slowly.\n• You can pay for a purchase several times over in interest across years.\n\nIllustration mindset (numbers vary): carrying a revolving balance and paying only minimums is like jogging on a treadmill set slightly faster than you — you move, but you don't arrive.\n\nHealthier patterns when you use a card:\n\n• Budget so you can **pay in full** most months.\n• If you can't, stop new charges and pay **more than minimum** aggressively.\n• Avoid treating available credit as available income.\n\nMinimum payments are a safety feature for short cash crunches — not a lifestyle plan.`,
        callout: {
          label: "Pro tip",
          text: "If you can't pay a purchase in full within a short, planned window, treat that as a signal to wait — not a signal to swipe.",
        },
      },
      {
        id: "defense",
        kicker: "Defend yourself",
        title: "A Debt Defender checklist",
        body: `Before borrowing:\n\n**1. Need vs. want?** Is this necessary enough to owe money?\n**2. Total cost?** APR, fees, and estimated total payoff — not just monthly payment.\n**3. Cash-flow fit?** Can you pay as agreed without skipping needs/goals?\n**4. Exit plan?** When will principal hit zero?\n**5. Trap check?** Payday/reborrow cycle, stacked BNPL, or minimum-only forever?\n\nIf answers are fuzzy, wait. Fuzzy debt is expensive debt.\n\nRemember: this track teaches defense and literacy — not fear of all borrowing, and not get-rich schemes. Loans for education or necessary transportation can be tools when terms are clear and payments are planned.`,
        callout: {
          label: "Try this week",
          text: "Find a sample credit card or loan disclosure online (educational). Highlight APR, late fee, and minimum payment language — just to practice reading.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Principal** is what you borrow; **interest** is the cost of borrowing over time.\n• **APR** helps compare yearly borrowing costs.\n• **Payday loans**, careless **BNPL**, and fee spirals are high-risk patterns.\n• **Minimum payments** can keep you in debt far longer — and cost far more — than the sticker price.\n• Debt Defenders read terms, plan payoff, and refuse confusion marketing.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on one debt trap you'll refuse to normalize.`,
      },
    ],
  },
  bigIdeas: [
    "**Principal** is the amount borrowed; **interest** is the cost of borrowing over time.",
    "**APR** helps you compare the yearly cost of credit more clearly than marketing alone.",
    "**Minimum payments**, high-cost short-term loans, and careless **BNPL** can trap cash flow for years.",
  ],
  keyTerms: [
    { term: "Principal", definition: "The amount borrowed or the remaining loan balance before interest." },
    { term: "Interest", definition: "The cost of borrowing money, usually charged as a rate over time." },
    { term: "APR", definition: "Annual Percentage Rate — a yearly rate used to help compare borrowing costs." },
    { term: "Minimum payment", definition: "The smallest payment required for a period; often too small to clear debt quickly." },
    { term: "BNPL", definition: "Buy Now, Pay Later — splitting a purchase into installments that must be paid on time." },
    { term: "Payday loan", definition: "A short-term, typically very expensive loan often due on the next payday." },
    { term: "Loan term", definition: "The length of time scheduled to repay a loan." },
    { term: "Revolving credit", definition: "Credit you can reuse as you repay, such as many credit cards." },
  ],
  realWorld:
    "Paying only the minimum on a high-APR card after a $600 weekend can turn into years of payments. Paying in full — or not charging it — protects future paychecks.",
  quiz: [
    {
      id: "q1",
      question: "What is principal?",
      choices: [
        "Only the interest charged by a lender",
        "The amount you borrow (or the remaining balance before interest)",
        "Your credit score",
        "A type of savings account fee",
      ],
      correctIndex: 1,
      explanation:
        "Principal is the borrowed amount (or remaining balance) before interest costs.",
    },
    {
      id: "q2",
      question: "Why is APR useful?",
      choices: [
        "It guarantees you will be approved for every loan",
        "It helps compare the yearly cost of borrowing more clearly",
        "It replaces the need to repay principal",
        "It is the same as your net pay",
      ],
      correctIndex: 1,
      explanation:
        "APR is a standardized yearly cost signal that helps consumers compare credit products.",
    },
    {
      id: "q3",
      question: "What is a common danger of paying only the credit card minimum?",
      choices: [
        "It always erases the balance immediately",
        "It can keep you in debt longer and increase total interest paid",
        "It deletes your credit report",
        "It raises FDIC limits",
      ],
      correctIndex: 1,
      explanation:
        "Minimums often shrink principal slowly, so interest keeps adding cost over a long time.",
    },
    {
      id: "q4",
      question: "Which statement about BNPL is most accurate?",
      choices: [
        "BNPL is never debt",
        "BNPL splits purchases into installments — late or stacked plans can create fees and cash-flow stress",
        "BNPL always has 0% cost with no rules",
        "BNPL replaces the need for any budget",
      ],
      correctIndex: 1,
      explanation:
        "BNPL is still a repayment obligation; missing payments or stacking plans can hurt.",
    },
    {
      id: "q5",
      question: "Why are payday-style loans often considered high risk?",
      choices: [
        "Because they never have to be repaid",
        "Because they can be extremely costly and lead to reborrowing cycles",
        "Because they increase your FDIC insurance automatically",
        "Because they are the same as savings accounts",
      ],
      correctIndex: 1,
      explanation:
        "High costs and short repayment windows can push borrowers into cycles of reborrowing.",
    },
  ],
  reflection: {
    prompt:
      "Which debt trap feels most relevant to people your age (minimum payments, BNPL stacking, or high-cost short-term loans)? What personal rule will you use to avoid it?",
    placeholder: "Example: I won't stack BNPL plans — if I can't pay the full price soon from cash flow, I wait…",
  },
};
