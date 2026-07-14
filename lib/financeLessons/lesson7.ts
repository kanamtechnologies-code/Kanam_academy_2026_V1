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
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-7.png",
        imageAlt: "Teen reading a credit score education page on a laptop with a notebook titled Credit basics",
        body: `**Credit** is about borrowed money and trust: will you repay what you owe as agreed? When you eventually apply for a car loan, apartment, or student loan, lenders may look at your credit history. Today you'll learn what scores and reports are — at a high-school overview level — and how to spot myths.\n\nHere's our roadmap:\n\n• **What credit is** — borrowing with a promise to repay.\n• **Credit reports vs. scores** — the file vs. the number.\n• **FICO factors (overview)** — what tends to matter, with real numbers.\n• **Free annual reports** — your right to check.\n• **Ways to start building credit, compared** — and traps to avoid.\n• **A mini case** you'll work through before the knowledge check.\n\nEducational overview only — not personalized lending advice.`,
        callout: {
          label: "Why it matters",
          text: "Credit mistakes in your late teens and early twenties can follow you for years. Understanding the system early helps you avoid expensive first errors.",
        },
      },
      {
        id: "hook-story",
        kicker: "True-to-life",
        title: "Tyler's apartment surprise",
        body: `Tyler, 19, applied for his first apartment and got a call back: \"We ran a credit check, and unfortunately...\" He didn't even know he **had** a credit file — he'd never taken out a loan or opened a card. It turned out an old phone plan in his name had gone to collections after a missed final bill he never saw, because the notice went to an address he'd moved out of.\n\nTyler wasn't reckless with credit cards or loans. He simply didn't know that **accounts you forget about still report to your file** — and that checking your own report earlier could have caught the problem before an apartment application did.\n\nBy the end of this lesson, you'll understand exactly what's tracked, how to check it for free, and how to avoid Tyler's exact situation.`,
        callout: {
          label: "Keep this in mind",
          text: "You don't need to have a credit card to have a credit file. Phone plans, some utilities, and other accounts can report too.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `• **Credit** is the ability to borrow money or access goods/services now and pay later under agreed terms.\n• A **creditor / lender** is the party that extends credit.\n• A **credit report** is a history of your credit accounts and payment behavior compiled by credit bureaus.\n• A **credit score** is a number modeled from report data to estimate risk (FICO is one widely used type of model).\n• **Utilization** roughly means how much of your available revolving credit you're using.\n• An **authorized user** is someone allowed to use another person's account (rules and effects vary).\n• **Collections** is what happens when an unpaid debt is sent to a separate agency to try to recover the money — it can appear on your report.\n\nYou may not have a thick credit file yet as a teen — that's okay. The concepts still matter before your first card or loan.`,
        callout: {
          label: "Pro tip",
          text: "Think \"report = story\" and \"score = summary grade.\" Fixing the story is how you change the grade over time.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea #1",
        title: "Credit is borrowed trust — with a paper trail",
        image: "/images/lessons/fl-7-2.png",
        imageAlt: "Illustrated diagram: borrow now, repay later, trust builds over time — teen-friendly credit explanation",
        body: `When you use credit, someone else covers a cost now; you repay later, often with **interest** if you don't pay in full on time (details in the next lesson).\n\nCommon credit products you'll encounter:\n\n• Credit cards\n• Auto loans\n• Student loans\n• Personal loans\n• Buy-now-pay-later plans (still debt — treat carefully)\n\nYour **payment history** becomes part of your financial reputation. Paying as agreed builds trust. Missing payments damages it.\n\nCredit can be useful (spreading a necessary purchase, building history). Credit can also be harmful (high-interest balances, collections). The tool isn't magic — the habits are.`,
        bullets: [
          "Credit = borrow now, repay later.",
          "History is recorded on credit reports.",
          "Scores summarize risk from that history.",
        ],
        callout: {
          label: "Watch out",
          text: "\"Build credit\" is not a reason to buy things you can't afford. Affordability comes first; credit building is a side effect of responsible use.",
        },
        checkIn: {
          prompt: "What is credit in this lesson?",
          choices: [
            "Free money you never have to repay",
            "The ability to borrow now and repay later under agreed terms",
            "Your school GPA",
            "Only cash in a savings account",
          ],
          correctIndex: 1,
          explanation:
            "Credit is borrowing with a repayment agreement — your payment history becomes part of your financial reputation.",
        },
      },
      {
        id: "concept-2",
        kicker: "The big idea #2",
        title: "Reports vs. scores",
        body: `A **credit report** lists accounts, balances, payment history, and certain public records. U.S. consumer reports commonly involve three major bureaus (Equifax, Experian, TransUnion) — names you'll see when you're older.\n\nA **credit score** turns report data into a number using a model. Many lenders use **FICO**-style scores; other scoring models exist too. Ranges and exact formulas are proprietary and can differ by product.\n\nKey mindset:\n\n• You don't \"have one eternal score\" forever identical everywhere — versions and lender pulls can differ.\n• Focusing on healthy **behaviors** (on-time payments, low revolving balances relative to limits, not opening accounts recklessly) matters more than refreshing a score app daily.`,
        callout: {
          label: "Why it matters",
          text: "If something is wrong on a report (not your account), you can dispute errors. You can't fix what you never read.",
        },
        checkIn: {
          prompt: "How does a credit report differ from a credit score?",
          choices: [
            "They are the same document",
            "A report is the detailed history; a score is a modeled summary number",
            "Scores list every cash purchase you made",
            "Reports are illegal to read",
          ],
          correctIndex: 1,
          explanation:
            "Reports hold the detailed story; scores summarize lending risk from that data.",
        },
      },
      {
        id: "concept-3",
        kicker: "The big idea #3",
        title: "FICO factors at a high level",
        image: "/images/lessons/fl-7-3.png",
        imageAlt: "Infographic meter showing credit score ranges with labels poor to excellent, educational not branded",
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
        checkIn: {
          prompt: "Of the FICO factor categories, which two carry the most beginner-friendly weight to focus on?",
          choices: [
            "Credit mix and new credit",
            "Payment history and utilization (amounts owed)",
            "Length of history only",
            "None of the factors matter for beginners",
          ],
          correctIndex: 1,
          explanation:
            "Paying on time and keeping utilization low are the two habits that carry the most practical weight for someone just starting out.",
        },
      },
      {
        id: "worked-example",
        kicker: "Let's do the math",
        title: "Reading your own utilization",
        body: `Suppose you have a starter credit card with a **$500 limit**, and your current balance is **$150**.\n\n**Utilization = balance ÷ limit = $150 ÷ $500 = 30%.**\n\nGeneral overview guidance (not a personalized rule): many people aim to keep utilization meaningfully below 30% when possible, and lower is generally considered better for this factor. This is one input among several — not a guarantee of any specific score.\n\nNow try this one yourself: a $1,000 limit with a $600 balance.\n\n**$600 ÷ $1,000 = 60% utilization** — noticeably higher, which is generally considered a less favorable pattern for this factor if it persists across statements.\n\nThe takeaway: utilization is simple division you can calculate yourself anytime, straight from your statement.`,
        callout: {
          label: "Pro tip",
          text: "Paying down a balance *before* the statement closes (not just before the due date) can lower the utilization that gets reported that cycle.",
        },
        checkIn: {
          prompt: "A card has a $400 limit and a $200 balance. What is the utilization?",
          choices: [
            "20%",
            "50%",
            "80%",
            "200%",
          ],
          correctIndex: 1,
          explanation:
            "$200 ÷ $400 = 50% utilization — balance divided by limit.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth check",
        title: "Credit myths — cleared up",
        body: `• **Myth:** \"Checking my own report ruins my score.\" **Reality:** Using legitimate consumer report access is for your review; it's not the same as applying for new credit everywhere.\n• **Myth:** \"Carrying a credit card balance helps your score.\" **Reality:** You don't need to pay interest to build history. On-time payments matter; interest is a cost.\n• **Myth:** \"I have no credit, so I have a bad score.\" **Reality:** Thin/no file is different from a damaged history — you may simply be \"unscored\" until enough history exists.\n• **Myth:** \"Closing every card always helps.\" **Reality:** It's complicated; impulsive closures can affect utilization and history length. Don't panic-close without learning more.\n• **Myth:** \"A score is my worth as a person.\" **Reality:** It's a lender risk estimate — not a moral grade.\n• **Myth:** \"Cash advances are free weekend fun money.\" **Reality:** A **cash advance** pulls cash from your credit card with **extra fees** and often **immediate interest** — no grace period like a normal purchase. Treat it as a **last resort**, not spending money for a night out.\n\nCredit Reader skill = calm, accurate mental models.`,
        callout: {
          label: "Try this week",
          text: "Ask a trusted adult how they check their credit report — or look up the official Annual Credit Report process together (read-only research is fine).",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Practice reading a mock report line",
        body: `Imagine a line item on a mock credit report reads:\n\n**\"Account: Starter Card — Opened 14 months ago — Limit $500 — Balance $75 — Payment history: 14/14 on-time.\"**\n\nWalk through what this line is telling you:\n\n**1. Length of history:** 14 months open — a fairly young but existing account.\n**2. Utilization:** $75 ÷ $500 = 15% — on the lower, generally more favorable side.\n**3. Payment history:** 14 out of 14 on-time — a clean record so far.\n\nNothing here is scary or mysterious once you know what each number means. That's the whole point of learning to read reports calmly instead of fearfully.`,
        callout: {
          label: "Try this now",
          text: "Next time you see any account summary (even a phone bill), practice identifying what a lender might notice about it.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Go deeper",
        title: "Length of history, credit mix, and starting points for teens",
        image: "/images/lessons/fl-7-4.png",
        imageAlt: "Illustrated timeline showing a credit account opening and gradually lengthening over years, next to icons for a card, an auto loan, and a student loan representing credit mix",
        body: `Two FICO factors deserve a closer look for someone just starting out:\n\n**Length of credit history.** This factor rewards *time*, not effort — an account open for 3 years generally looks more established than one open for 3 months, even with identical payment behavior. This is exactly why some people choose to keep their oldest account open (paid responsibly) rather than closing it the moment it feels unnecessary.\n\n**Credit mix.** Having different types of credit (say, a card and an installment loan) can be a minor positive — but it is **not** a reason to open accounts you don't need. Opening a store card you'll never use, just to \"improve your mix,\" usually isn't worth the extra hard inquiry and account to manage.\n\nCommon teen starting points (educational overview, not a recommendation for your specific situation):\n\n• Becoming an **authorized user** on a trusted family member's well-managed account.\n• A **secured credit card**, which typically requires a deposit that limits risk while you build history.\n• A **student-focused starter card**, where available.\n\nEach path has different rules and trade-offs — this is exactly the kind of decision to make with a trusted adult, not from a social media ad.`,
        bullets: [
          "Time matters — your oldest account is often worth protecting.",
          "Credit mix is a minor factor, not a reason to open unnecessary accounts.",
          "Authorized user, secured card, and student cards are common starting points with different trade-offs.",
        ],
      },
      {
        id: "comparison",
        kicker: "Compare your options",
        title: "Authorized user vs. secured card vs. student card",
        image: "/images/lessons/fl-7-5.png",
        imageAlt: "Comparison graphic contrasting three teen credit-building starting points: authorized user, secured credit card, and student credit card",
        body: `**Authorized user**\n• How it works: added to someone else's existing, well-managed account.\n• Pros: no separate approval needed; benefits from an already-established account.\n• Watch for: depends entirely on the primary user's habits — their late payment can affect you too.\n\n**Secured credit card**\n• How it works: you provide a deposit (often equal to the limit), which lowers the lender's risk.\n• Pros: usually easier approval; you control your own history from day one.\n• Watch for: ties up cash as a deposit; still requires on-time payments to help, not just holding it.\n\n**Student credit card**\n• How it works: a starter card marketed to students, sometimes with easier approval criteria.\n• Pros: builds independent history; often simple terms for a first card.\n• Watch for: still real debt — a low limit doesn't mean low stakes if it's not paid in full.\n\nThere's no single \"best\" choice — the right one depends on your age, whether a trusted adult can help, and your comfort managing a first account responsibly.`,
      },
      {
        id: "behavioral-trap",
        kicker: "Watch your brain",
        title: "Credit traps to recognize early",
        body: `**\"Easy approval\" culture.** If marketing focuses on speed and lifestyle rather than cost and terms, pause. Fast approval isn't the same as a good deal.\n\n**Application stacking.** Applying for several cards in a short window (often chasing sign-up perks) can look risky on a report and isn't necessary for a first-time credit builder.\n\n**\"Build credit\" as a spending excuse.** Buying things you can't afford *in order to* build credit gets the order backwards — affordability comes first; credit history is a side effect of paying on time, not a reason to overspend.\n\n**Cash advances treated as spending money.** As covered earlier, a cash advance carries extra fees and immediate interest — treating it like a normal purchase is one of the more expensive teen credit mistakes.\n\nCredit Reader instinct: when something is marketed as fast and easy, slow down and check the actual terms.`,
        callout: {
          label: "Watch out",
          text: "If an ad's main selling point is speed rather than cost, that's a signal to read the fine print more carefully, not less.",
        },
      },
      {
        id: "habits",
        kicker: "Make it routine",
        title: "Free annual credit reports — check on a schedule",
        body: `U.S. consumers are entitled to free credit reports from the major bureaus through the official Annual Credit Report process (frequency and access details can expand beyond the old \"once per year\" pattern — check the official site for current rules when you use it).\n\nWhy check?\n\n• Catch **identity theft** or accounts you don't recognize.\n• Spot **errors** (wrong balances, accounts that aren't yours).\n• Learn what lenders see before you apply for big credit.\n\nChecking your **own** report through legitimate free channels is normal self-care — it is not the same as a lender running a hard application inquiry.\n\nIf you're a minor with little or no file, you may have limited reports — still learn the process for when you're older. Build the **habit** of checking on a schedule (once you have a file), not just when something feels wrong.`,
        callout: {
          label: "Pro tip",
          text: "Use official government-linked channels for free reports. Be skeptical of random sites that demand payment to \"unlock your score\" in a rush.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Why this counts",
        title: "How this connects to national standards",
        body: `This lesson builds skills from the **Jump$tart Coalition / CEE (Council for Economic Education) 2021 National Standards for Personal Finance Education**, specifically the **Managing Credit** domain.\n\nBy the end of this lesson, you're practicing standards-aligned skills such as:\n\n• Explaining the **purpose and content** of credit reports and credit scores.\n• Summarizing, at an overview level, the **factors that influence** a credit score.\n• Identifying **rights and free resources** (like annual credit reports) available to consumers.\n\nThese are the same reasoning skills adults use before applying for an apartment, a car loan, or their first real credit card.`,
        callout: {
          label: "Good to know",
          text: "Understanding credit calmly — instead of fearfully or carelessly — is one of the most protective financial literacy skills for young adults.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Take 30 seconds. Do you know whether you currently have a credit file at all — maybe through a phone plan, a utility, or an authorized-user account? If you're not sure, that uncertainty is exactly the gap this lesson is meant to close.\n\nThink of one specific action (checking a report, asking a trusted adult a question) you could take in the next month to reduce that uncertainty.`,
        callout: {
          label: "Why this matters",
          text: "Turning \"I don't know\" into \"here's one specific thing I could check\" is what makes financial literacy actionable instead of abstract.",
        },
      },
      {
        id: "mini-case",
        kicker: "Case study",
        title: "Sofia's first credit decision",
        body: `Sofia just turned 18. Her parent offers to add her as an **authorized user** on their credit card, which is 10 years old, has a $2,000 limit, a $150 balance, and a perfect on-time payment history. At the same time, an ad for a flashy new store card promises \"instant approval and 20% off today.\"`,
        checkIn: {
          prompt: "Based on this lesson, which option is generally the stronger starting point for Sofia, and why?",
          choices: [
            "The store card, because instant approval always means a better deal",
            "The authorized-user option, because it lets her benefit from an already long, well-managed account with low utilization and perfect payment history",
            "Neither — she should apply for five different cards to compare offers",
            "The store card, because a discount today always outweighs long-term credit factors",
          ],
          correctIndex: 1,
          explanation:
            "Becoming an authorized user on a long-standing, responsibly managed account can help with length of history and payment history — a stronger overview-level starting point than chasing a same-day discount card.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Could you explain this to a friend?",
        body: `Before the graded knowledge check, see if you can explain these out loud in one or two sentences each:\n\n• The difference between a credit report and a credit score.\n• Why utilization is just simple division.\n• One myth about credit you now know is false.\n• One free, official way to check your own report.\n\nIf any of those feel shaky, scroll back — it's faster now than during the quiz.`,
        checkIn: {
          prompt: "Which statement best captures this lesson's core idea?",
          choices: [
            "You must carry a balance and open many cards quickly to build good credit",
            "Credit is borrowed trust tracked on a report; scores summarize that history, and on-time payments plus low utilization matter most for beginners",
            "Checking your own credit report always lowers your score",
            "A credit score is a measure of your worth as a person",
          ],
          correctIndex: 1,
          explanation:
            "The throughline: credit is a recorded trust relationship, and calm, informed habits — not hacks — build it responsibly.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Credit** means borrowing with an agreement to repay; history is recorded.\n• **Reports** tell the story; **scores** summarize risk.\n• **FICO-style factors** emphasize payment history, amounts owed/utilization, history length, mix, and new credit — overview level.\n• **Utilization** is just balance ÷ limit — you can calculate it yourself.\n• Use **free official report access** to check for errors and fraud.\n• Bust myths, and watch for \"easy approval\" marketing that skips the real terms.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on one credit habit you want when you're older.`,
      },
    ],
  },
  bigIdeas: [
    "**Credit** is borrowed money with a recorded history of whether you repay as agreed.",
    "**Credit reports** hold the detailed history; **credit scores** summarize risk from that data.",
    "Strong beginner habits — **on-time payments** and careful **utilization** — matter more than score gimmicks.",
    "**Utilization** is simple division (balance ÷ limit) you can calculate from any statement.",
    "**Length of history** and **credit mix** are real factors, but they're not reasons to open accounts you don't need.",
  ],
  keyTerms: [
    { term: "Credit", definition: "The ability to borrow now and repay later under agreed terms." },
    { term: "Credit report", definition: "A record of your credit accounts and payment history from credit bureaus." },
    { term: "Credit score", definition: "A number modeled from credit report data to estimate lending risk." },
    { term: "FICO", definition: "A widely used family of credit-scoring models based on credit report information." },
    { term: "Utilization", definition: "How much of your available revolving credit you are using, calculated as balance divided by limit." },
    { term: "Payment history", definition: "Your record of paying accounts on time versus late or missed." },
    { term: "Annual Credit Report", definition: "The official process for obtaining free credit reports from major bureaus." },
    { term: "Thin file", definition: "A credit history with little or no information, common for people new to credit." },
    { term: "Authorized user", definition: "Someone allowed to use another person's credit account, subject to that account's rules." },
    { term: "Secured credit card", definition: "A card backed by a cash deposit, often used to start building credit history with lower lender risk." },
  ],
  realWorld:
    "When you eventually apply for a car loan or apartment, lenders may check your credit. Building calm, accurate habits now — and knowing how to read a report later — reduces surprise denials and scammy \"fix your credit\" pitches.",
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
      question: "You get a starter credit card with a $300 limit. Which habit is generally most foundational for healthy credit?",
      choices: [
        "Max it out every month so the bank sees activity",
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
      question: "A card has a $600 limit and a $300 balance. What is the utilization, and is it on the higher or lower side of common guidance?",
      choices: [
        "20% — on the lower side",
        "50% — on the higher side of common overview guidance",
        "300% — extremely high",
        "Utilization cannot be calculated from this information",
      ],
      correctIndex: 1,
      explanation:
        "$300 ÷ $600 = 50%, which is generally considered higher than commonly cited overview guidance for this factor.",
    },
    {
      id: "q5",
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
      id: "q6",
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
    {
      id: "q7",
      question: "Sofia is offered authorized-user status on a 10-year-old, well-managed family account, or a new store card with 'instant approval.' Based on this lesson, why might the authorized-user path be the stronger overview-level starting point?",
      choices: [
        "Because store cards are always scams",
        "Because it can benefit from an already long, low-utilization, on-time payment history rather than starting from zero",
        "Because instant approval is always a red flag",
        "Because authorized users can never be affected by the primary user's behavior",
      ],
      correctIndex: 1,
      explanation:
        "Length of history and clean payment history are real factors — piggybacking on an established, well-managed account can be a stronger starting point than a brand-new account, though outcomes still depend on the primary user's habits.",
    },
    {
      id: "q8",
      question: "An ad promises 'instant approval, no credit check, apply for 5 cards today for the best bonuses.' What's the biggest red flag here for a first-time credit builder?",
      choices: [
        "There is no red flag — more cards always means better credit",
        "The focus on speed and stacking applications, rather than cost, terms, and necessity",
        "The ad mentions credit at all",
        "Bonuses are illegal on credit cards",
      ],
      correctIndex: 1,
      explanation:
        "Marketing that emphasizes speed and stacking applications over actual terms is a classic pattern to slow down and scrutinize, especially for someone just starting to build credit.",
    },
  ],
  reflection: {
    prompt:
      "When you eventually use credit, which one habit will you protect first — and why? (Example: on-time payments, low utilization, reading statements.)",
    placeholder: "Example: I'll set calendar reminders so every card is paid on time before the due date…",
  },
};
