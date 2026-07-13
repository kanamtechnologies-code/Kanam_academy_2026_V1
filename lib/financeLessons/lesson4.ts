import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson4: AILessonConfig = {
  id: "fl-4",
  title: "4. Banks, Accounts & Cards",
  goal: "Compare checking and savings, explain debit vs. credit at a conceptual level, spot common fees, and describe FDIC insurance in plain English.",
  xpReward: 200,
  badge: "Banking Basics",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/3",
  nextHref: "/learn/finance/5",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-4.png",
        imageAlt: "Teen at a bank branch counter with a debit card and new account brochure, daytime realistic photo",
        body: `When you get your first paycheck, you need somewhere to put it. A bank (or credit union) is where most people park everyday money, pay bills, and save. Today you'll learn the account types teens meet first, how debit and credit differ, what fees to watch for, and what \"FDIC insured\" roughly means — without endorsing any brand.\n\nHere's our roadmap:\n\n• **Checking vs. savings** — spend vs. set aside.\n• **Debit vs. credit** — your money now vs. borrowed money.\n• **Fees and gotchas** — overdraft, ATM, minimum balance.\n• **FDIC (and similar protection)** — what happens if an insured bank fails.\n• **Safe habits** — PINs, statements, and not sharing login info.\n\nEducational only: choose institutions with a trusted adult using your own needs (fees, access, requirements).`,
        callout: {
          label: "Why it matters",
          text: "The wrong account habits can quietly drain money through fees. The right basics keep your paycheck usable and your savings separate.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `• A **checking account** is for everyday deposits and spending (debit card, transfers, bills).\n• A **savings account** is for money you want to keep more separate and grow a little with interest (rules may limit some transfers).\n• A **debit card** spends money that is already in your checking account.\n• A **credit card** borrows money from the card issuer up to a limit; you must pay it back, often with interest if you carry a balance.\n• A **fee** is a charge the institution takes for a service or a mistake (like overdraft).\n• **FDIC insurance** protects eligible deposits at insured banks up to legal limits if the bank fails (credit unions have a similar federal insurance system).\n\nWe'll stay brand-neutral: \"a checking account,\" not a specific bank name.`,
        callout: {
          label: "Pro tip",
          text: "Read the fee schedule before you open an account. Ten minutes of reading can save months of surprise charges.",
        },
      },
      {
        id: "checking-savings",
        kicker: "The big idea",
        title: "Checking moves money; savings holds it",
        image: "/images/lessons/fl-4-2.png",
        imageAlt: "Infographic of two account jars: Checking for spending and Savings for goals, with arrows",
        body: `**Checking** is your transaction hub: paycheck deposits, debit purchases, Venmo, and bill pay. Keep enough here for planned spending plus a small buffer if you can.\n\n**Savings** is for goals and cushions. Separating savings from checking makes it less tempting to spend \"future you\" money on impulse.\n\nMany people use both: checking for monthly cash flow, savings for emergency starters and named goals. Some accounts pay **interest** (the bank pays you a small percentage for keeping money there). Rates change; chase understanding, not hype.\n\nCredit unions are member-owned financial institutions that often offer similar account types. Functionally, you still need to compare fees, access (ATMs/apps), and requirements.`,
        bullets: [
          "**Checking** ≈ everyday spending account.",
          "**Savings** ≈ separated money for later.",
          "Interest is a bonus — habits matter more for beginners.",
        ],
        callout: {
          label: "Watch out",
          text: "If all your money sits in checking with a debit card attached, it's easy to spend savings-by-accident. Separation is a feature, not a hassle.",
        },
      },
      {
        id: "debit-credit",
        kicker: "Cards",
        title: "Debit spends yours; credit borrows",
        image: "/images/lessons/fl-4-3.png",
        imageAlt: "Side-by-side photo of a debit card and credit card on a desk with sticky notes Your money now vs Borrowed money",
        body: `**Debit card**\n• Pulls from your checking balance.\n• If the money isn't there, the purchase may decline — or trigger overdraft fees if you opted into overdraft coverage.\n• Good for spending money you already have.\n\n**Credit card**\n• Borrows from the issuer up to a **credit limit**.\n• You get a bill; paying in full by the due date helps you avoid interest.\n• Carrying a balance can get expensive because of **interest**.\n• Builds a payment history when used responsibly (more in later lessons on credit).\n\nNeither card is \"evil.\" Debit is simpler for many teens. Credit is a powerful tool that becomes a trap if you treat the limit like free money.`,
        callout: {
          label: "Why it matters",
          text: "Confusing debit and credit leads to surprise debt. If it isn't your money in the account yet, you're borrowing.",
        },
      },
      {
        id: "fees",
        kicker: "Protect your balance",
        title: "Common fees to watch",
        body: `Fee names vary, but watch for:\n\n• **Monthly maintenance fees** — sometimes waived with direct deposit or a minimum balance.\n• **Out-of-network ATM fees** — your bank and the ATM owner may both charge.\n• **Overdraft / NSF fees** — spending more than your available balance.\n• **Foreign transaction fees** — some cards charge for purchases abroad or in other currencies.\n• **Inactivity or paper-statement fees** — less common, but read the fine print.\n\nHabits that help: turn on low-balance alerts, track pending debit charges, and keep a small buffer in checking. If a fee hits, ask whether it can be waived as a courtesy — sometimes yes, especially once.`,
        bullets: [
          "Alerts beat surprises.",
          "Pending transactions still count against available money.",
          "Fee schedules are part of the product — read them.",
        ],
        callout: {
          label: "Watch out",
          text: "Overdraft \"protection\" can sound helpful but may mean expensive fees for covering a shortfall. Know what you opted into.",
        },
      },
      {
        id: "fdic",
        kicker: "Safety net",
        title: "FDIC insurance — plain English",
        body: `If an **FDIC-insured bank** fails, eligible deposits are protected up to the legal limit per depositor, per insured bank, for each ownership category (the widely known standard limit is $250,000 — confirm current rules from official sources when you need exact details).\n\nWhat that means for you as a student:\n\n• Everyday checking/savings balances for most teens are typically well within insured limits.\n• Insurance protects against **bank failure**, not against you spending the money, sharing your PIN, or getting scammed.\n• Credit unions have a parallel federal insurance system for eligible shares/deposits.\n\nFDIC does **not** mean every financial product is risk-free. Investments can lose value; this lesson is about deposit accounts.`,
        callout: {
          label: "Pro tip",
          text: "Look for deposit-insurance disclosures when opening an account. If something promises huge guaranteed returns with \"no risk,\" be skeptical — that's a red flag lesson for later.",
        },
      },
      {
        id: "habits",
        kicker: "Stay safe",
        title: "Account habits that prevent headaches",
        body: `• **Never share** your PIN, password, or one-time codes — not even with friends.\n• **Review transactions** weekly in the app or on statements.\n• **Report** lost cards and unauthorized charges quickly.\n• **Use strong, unique passwords** and bank-app security features when available.\n• **Beware** \"verify your account\" texts/links; go directly through the official app or site you already trust.\n\n**Opening an account as a teen:** Many teen or student accounts require a **parent or guardian as co-signer or joint owner** — that's normal. Bring required **ID** (and whatever the bank asks for) when you open it with a trusted adult.\n\n**Compare before you sign:** Teen and student products differ on **fees, minimum balances, and rules**. Read the fee schedule side by side before choosing — ten minutes of comparison beats months of surprise charges.\n\n**Turn on security from day one:** Enable **multi-factor authentication (MFA)** — also called **two-factor authentication (2FA)** — plus **balance and transaction alerts** when you open the account. Alerts catch mistakes and fraud early; MFA makes it harder for someone else to log in even if they guess your password.\n\nBanking literacy is half product knowledge, half security habits. You'll go deeper on scams in a later finance lesson.`,
        callout: {
          label: "Try this week",
          text: "With a trusted adult, list the fees on your account (or a sample fee schedule online) and circle any that could hit a teen paycheck.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Checking** for everyday spending; **savings** for separated goals.\n• **Debit** uses your money; **credit** borrows and must be repaid.\n• **Fees** (overdraft, ATM, monthly) can quietly drain balances — read the schedule.\n• **FDIC** (and similar credit-union insurance) protects eligible deposits if an insured institution fails — not against spending mistakes or scams.\n• Protect logins, PINs, and review transactions.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on how you'd set up checking vs. savings.`,
      },
    ],
  },
  bigIdeas: [
    "**Checking** handles everyday transactions; **savings** keeps goal and cushion money more separate.",
    "**Debit** spends money you already have; **credit** borrows money you must repay.",
    "**FDIC insurance** protects eligible bank deposits if an insured bank fails — not against fees, spending, or scams.",
  ],
  keyTerms: [
    { term: "Checking account", definition: "An account designed for everyday deposits, spending, and bill payments." },
    { term: "Savings account", definition: "An account for money you want to set aside, often earning some interest." },
    { term: "Debit card", definition: "A card that spends money from your checking account." },
    { term: "Credit card", definition: "A card that borrows from an issuer up to a limit; balances must be repaid." },
    { term: "Overdraft", definition: "Spending more than your available balance, which may trigger fees if covered." },
    { term: "FDIC insurance", definition: "Federal protection for eligible deposits at insured banks up to legal limits if the bank fails." },
    { term: "Interest (on savings)", definition: "Money a financial institution pays you for keeping funds in an account." },
    { term: "Fee schedule", definition: "A list of charges an institution may apply for services or account events." },
  ],
  realWorld:
    "A $35 overdraft fee on a $5 mistaken debit can cost more than the purchase. Low-balance alerts and a small checking buffer are cheaper than repeated fees.",
  quiz: [
    {
      id: "q1",
      question: "What is the main everyday job of a checking account?",
      choices: [
        "Guaranteeing investment profits",
        "Handling deposits and day-to-day spending/transactions",
        "Eliminating all fees forever",
        "Replacing the need for any budget",
      ],
      correctIndex: 1,
      explanation:
        "Checking accounts are built for transactions — paychecks in, spending and bills out.",
    },
    {
      id: "q2",
      question: "How does a debit card differ from a credit card?",
      choices: [
        "Debit always earns unlimited cash back with no rules",
        "Debit spends your account money; credit borrows money you must repay",
        "They are identical in every way",
        "Credit cards cannot create debt",
      ],
      correctIndex: 1,
      explanation:
        "Debit uses your balance; credit is borrowed money with repayment (and possible interest).",
    },
    {
      id: "q3",
      question: "Which fee is most closely tied to spending more than your available balance?",
      choices: [
        "Paper statement fee only",
        "Overdraft / NSF-related fees",
        "Safe deposit box rental",
        "College application fee",
      ],
      correctIndex: 1,
      explanation:
        "Overdraft or NSF fees relate to payments that exceed available funds.",
    },
    {
      id: "q4",
      question: "What does FDIC insurance primarily protect against?",
      choices: [
        "You losing money in the stock market",
        "An insured bank failing, for eligible deposits up to legal limits",
        "Every scam text message",
        "Credit card interest rates",
      ],
      correctIndex: 1,
      explanation:
        "FDIC insurance covers eligible deposits if an insured bank fails — not market losses or all fraud types.",
    },
    {
      id: "q5",
      question: "Why might someone keep savings in a separate savings account?",
      choices: [
        "To make impulse spending from that money harder",
        "Because savings accounts cannot hold U.S. dollars",
        "Because checking accounts are illegal for teens",
        "Because FDIC only covers savings, never checking",
      ],
      correctIndex: 0,
      explanation:
        "Separation reduces accidental spending of goal/emergency money. (FDIC can cover eligible checking too.)",
    },
  ],
  reflection: {
    prompt:
      "If you opened (or already have) accounts, how would you split money between checking and savings — and which fee would you watch most carefully?",
    placeholder: "Example: Paycheck to checking for bills/gas; auto-move $25 to savings; watch ATM and overdraft fees…",
  },
};
