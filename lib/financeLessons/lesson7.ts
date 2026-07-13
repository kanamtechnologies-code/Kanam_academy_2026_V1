import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson7: AILessonConfig = {
  id: "fl-7",
  title: "7. Credit Scores & Reports",
  goal: "Explain what credit is, summarize major FICO factor categories at overview level, describe free annual credit reports, and bust common credit myths.",
  xpReward: 350,
  badge: "Credit Reader",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/6",
  nextHref: "/learn/finance/8",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `**Credit** is about borrowed money and trust: will you repay what you owe as agreed? Lenders, landlords, and sometimes employers look at credit history. Today you'll learn what scores and reports are — at a high-school overview level — and how to spot myths.\n\nHere's our roadmap:\n\n• **What credit is** — borrowing with a promise to repay.\n• **Credit reports vs. scores** — the file vs. the number.\n• **FICO factors (overview)** — what tends to matter.\n• **Free annual reports** — your right to check.\n• **Myths** — what credit is *not*.\n\nEducational overview only — not personalized lending advice.`,
        callout: {
          label: "Why it matters",
          text: "Credit mistakes in early adulthood can follow you for years. Understanding the system early helps you avoid expensive first errors.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `• **Credit** is the ability to borrow money or access goods/services now and pay later under agreed terms.\n• A **creditor / lender** is the party that extends credit.\n• A **credit report** is a history of your credit accounts and payment behavior compiled by credit bureaus.\n• A **credit score** is a number modeled from report data to estimate risk (FICO is one widely used type of model).\n• **Utilization** roughly means how much of your available revolving credit you're using.\n• An **authorized user** is someone allowed to use another person's account (rules and effects vary).\n\nYou may not have a thick credit file yet as a teen — that's okay. The concepts still matter before your first card or loan.`,
        callout: {
          label: "Pro tip",
          text: "Think \"report = story\" and \"score = summary grade.\" Fixing the story is how you change the grade over time.",
        },
      },
      {
        id: "what-credit",
        kicker: "The big idea",
        title: "Credit is borrowed trust — with a paper trail",
        body: `When you use credit, someone else covers a cost now; you repay later, often with **interest** if you don't pay in full on time (details in the next lesson).\n\nCommon credit products:\n\n• Credit cards\n• Auto loans\n• Student loans\n• Personal loans\n• Buy-now-pay-later plans (still debt — treat carefully)\n\nYour **payment history** becomes part of your financial reputation. Paying as agreed builds trust. Missing payments damages it.\n\nCredit can be useful (spreading a necessary purchase, building history). Credit can also be harmful (high-interest balances, collections). The tool isn't magic — the habits are.`,
        bullets: [
          "Credit = borrow now, repay later.",
          "History is recorded on credit reports.",
          "Scores summarize risk from that history.",
        ],
        callout: {
          label: "Watch out",
          text: "\"Build credit\" is not a reason to buy things you can't afford. Affordability comes first; credit building is a side effect of responsible use.",
        },
      },
      {
        id: "report-score",
        kicker: "Two tools",
        title: "Reports vs. scores",
        body: `A **credit report** lists accounts, balances, payment history, and certain public records. U.S. consumer reports commonly involve three major bureaus (Equifax, Experian, TransUnion) — names you'll see in adult life.\n\nA **credit score** turns report data into a number using a model. Many lenders use **FICO**-style scores; other scoring models exist too. Ranges and exact formulas are proprietary and can differ by product.\n\nKey mindset:\n\n• You don't \"have one eternal score\" forever identical everywhere — versions and lender pulls can differ.\n• Focusing on healthy **behaviors** (on-time payments, low revolving balances relative to limits, not opening accounts recklessly) matters more than refreshing a score app daily.`,
        callout: {
          label: "Why it matters",
          text: "If something is wrong on a report (not your account), you can dispute errors. You can't fix what you never read.",
        },
      },
      {
        id: "fico-overview",
        kicker: "Overview only",
        title: "FICO factors at a high level",
        body: `Classic FICO models commonly emphasize categories like these (exact weights can vary by version — learn the *ideas*, not memorized trivia for a specific year):\n\n• **Payment history** — on-time vs. late/missed payments (usually the biggest theme).\n• **Amounts owed / utilization** — how much you owe, especially on revolving credit vs. limits.\n• **Length of credit history** — how long accounts have been open.\n• **Credit mix** — types of credit (overview only; don't open accounts just to \"collect types\").\n• **New credit** — recent applications/accounts can matter.\n\nFor beginners: **pay on time** and **don't max out revolving credit**. Those two habits carry enormous weight compared with hacking obscure tricks.`,
        bullets: [
          "On-time payments are foundational.",
          "High credit-card utilization can hurt scores.",
          "Avoid opening accounts just for gimmicks.",
        ],
        callout: {
          label: "Watch out",
          text: "Social media \"hacks\" that tell you to open five cards in a week are usually terrible advice for students.",
        },
      },
      {
        id: "annual-report",
        kicker: "Know your rights",
        title: "Free annual credit reports",
        body: `U.S. consumers are entitled to free credit reports from the major bureaus through the official Annual Credit Report process (frequency and access details can expand beyond the old \"once per year\" pattern — check the official site for current rules when you use it).\n\nWhy check?\n\n• Catch **identity theft** or accounts you don't recognize.\n• Spot **errors** (wrong balances, accounts that aren't yours).\n• Learn what lenders see before you apply for big credit.\n\nChecking your **own** report through legitimate free channels is normal self-care — it is not the same as a lender running a hard application inquiry.\n\nIf you're a minor with little or no file, you may have limited reports — still learn the process for young adulthood.`,
        callout: {
          label: "Pro tip",
          text: "Use official government-linked channels for free reports. Be skeptical of random sites that demand payment to \"unlock your score\" in a rush.",
        },
      },
      {
        id: "myths",
        kicker: "Myth check",
        title: "Credit myths — cleared up",
        body: `• **Myth:** \"Checking my own report ruins my score.\" **Reality:** Using legitimate consumer report access is for your review; it's not the same as applying for new credit everywhere.\n• **Myth:** \"Carrying a credit card balance helps your score.\" **Reality:** You don't need to pay interest to build history. On-time payments matter; interest is a cost.\n• **Myth:** \"I have no credit, so I have a bad score.\" **Reality:** Thin/no file is different from a damaged history — you may simply be \"unscored\" until enough history exists.\n• **Myth:** \"Closing every card always helps.\" **Reality:** It's complicated; impulsive closures can affect utilization and history length. Don't panic-close without learning more.\n• **Myth:** \"A score is my worth as a person.\" **Reality:** It's a lender risk estimate — not a moral grade.\n\nCredit Reader skill = calm, accurate mental models.`,
        callout: {
          label: "Try this week",
          text: "Ask a trusted adult how they check their credit report — or look up the official Annual Credit Report process together (read-only research is fine).",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Credit** means borrowing with an agreement to repay; history is recorded.\n• **Reports** tell the story; **scores** summarize risk.\n• **FICO-style factors** emphasize payment history, amounts owed/utilization, history length, mix, and new credit — overview level.\n• Use **free official report access** to check for errors and fraud.\n• Bust myths: you don't need to carry a balance to \"build credit,\" and your score isn't your identity.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on one credit habit you want when you're older.`,
      },
    ],
  },
  bigIdeas: [
    "**Credit** is borrowed money with a recorded history of whether you repay as agreed.",
    "**Credit reports** hold the detailed history; **credit scores** summarize risk from that data.",
    "Strong beginner habits — **on-time payments** and careful **utilization** — matter more than score gimmicks.",
  ],
  keyTerms: [
    { term: "Credit", definition: "The ability to borrow now and repay later under agreed terms." },
    { term: "Credit report", definition: "A record of your credit accounts and payment history from credit bureaus." },
    { term: "Credit score", definition: "A number modeled from credit report data to estimate lending risk." },
    { term: "FICO", definition: "A widely used family of credit-scoring models based on credit report information." },
    { term: "Utilization", definition: "How much of your available revolving credit you are using." },
    { term: "Payment history", definition: "Your record of paying accounts on time versus late or missed." },
    { term: "Annual Credit Report", definition: "The official process for obtaining free credit reports from major bureaus." },
    { term: "Thin file", definition: "A credit history with little or no information, common for people new to credit." },
  ],
  realWorld:
    "A first apartment application may involve a credit check. Building calm, accurate habits now — and knowing how to read a report later — reduces surprise denials and scammy \"fix your credit\" pitches.",
  quiz: [
    {
      id: "q1",
      question: "What is credit?",
      choices: [
        "Free money you never repay",
        "The ability to borrow now and repay later under agreed terms",
        "Your school GPA",
        "Only cash in a savings account",
      ],
      correctIndex: 1,
      explanation:
        "Credit is borrowing with a repayment agreement — not free money.",
    },
    {
      id: "q2",
      question: "How does a credit report differ from a credit score?",
      choices: [
        "They are the same document",
        "A report is the detailed history; a score is a modeled summary number",
        "Scores list every purchase you made in cash",
        "Reports are illegal to read",
      ],
      correctIndex: 1,
      explanation:
        "Reports hold the story; scores summarize risk from that story.",
    },
    {
      id: "q3",
      question: "Which habit is generally most foundational for healthy credit?",
      choices: [
        "Paying every bill late on purpose",
        "Paying on time",
        "Opening as many cards as possible in one week",
        "Carrying the maximum balance forever",
      ],
      correctIndex: 1,
      explanation:
        "Payment history is a core theme in major scoring models — on-time payments are foundational.",
    },
    {
      id: "q4",
      question: "Which statement about carrying a credit card balance is most accurate?",
      choices: [
        "You must carry a balance to build credit",
        "You do not need to pay interest to build payment history — interest is a cost",
        "Balances never affect utilization",
        "Credit cards cannot appear on reports",
      ],
      correctIndex: 1,
      explanation:
        "On-time payments build history; carrying a balance for its own sake usually just costs interest.",
    },
    {
      id: "q5",
      question: "Why check a free official credit report?",
      choices: [
        "To automatically raise your score by 100 points overnight",
        "To spot errors or accounts you don't recognize and see what lenders may see",
        "Because cash purchases appear as loans there",
        "To cancel FDIC insurance",
      ],
      correctIndex: 1,
      explanation:
        "Reports help you find errors, fraud, and understand your file — not magic overnight score boosts.",
    },
  ],
  reflection: {
    prompt:
      "When you eventually use credit, which one habit will you protect first — and why? (Example: on-time payments, low utilization, reading statements.)",
    placeholder: "Example: I'll set calendar reminders so every card is paid on time before the due date…",
  },
};
