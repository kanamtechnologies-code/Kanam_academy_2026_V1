import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson3: AILessonConfig = {
  id: "fl-3",
  title: "3. Paychecks, Income & Taxes",
  goal: "Distinguish gross pay from net pay, recognize common paycheck deductions at a teen level, and understand what a W-4 is for — without filing taxes for you.",
  xpReward: 150,
  badge: "Paycheck Pro",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/2",
  nextHref: "/learn/finance/4",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-3.png",
        imageAlt: "Teen looking at a first paper paycheck and pay stub at a cafe table after a shift",
        body: `Your first job (or next job) comes with a moment every worker remembers: looking at a paycheck and thinking, \"Wait — where's the rest?\" Today you'll learn why the number you earn and the number you take home are different — and what those missing pieces usually are.\n\nHere's our roadmap:\n\n• **Gross vs. net pay** — earned vs. take-home.\n• **Common deductions** — taxes and other withholdings at a teen-friendly level.\n• **Hourly vs. salary basics** — how pay is calculated in simple terms.\n• **W-4 awareness** — the form that guides withholding (overview only).\n• **Reading a pay stub** — what to check so surprises don't wreck your budget.\n\nThis is educational. We won't give tax-filing advice for your personal return — just the concepts you need to understand a typical paycheck.`,
        callout: {
          label: "Why it matters",
          text: "Budgets based on gross pay overestimate what you can spend. Planning with net pay keeps you honest and reduces end-of-month panic.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `• **Gross pay** is the total you earned before deductions.\n• **Net pay** (take-home pay) is what you actually receive after deductions.\n• A **deduction** / **withholding** is money taken from your paycheck for taxes or other items.\n• A **pay stub** (earnings statement) shows hours, gross pay, deductions, and net pay.\n• A **W-4** is a form you give your employer so they know how to withhold federal income tax.\n• **Income tax** is money owed to government based on taxable income (rules are set by law; details change).\n\nYou'll see state and federal pieces depending on where you work. The big idea is the same: part of gross pay is set aside before you get paid.`,
        callout: {
          label: "Pro tip",
          text: "Always budget from **net** pay — the amount that actually hits your account or paycheck.",
        },
      },
      {
        id: "gross-net",
        kicker: "The big idea",
        title: "Gross is earned; net is what you can spend",
        image: "/images/lessons/fl-3-2.png",
        imageAlt: "Clear educational diagram showing Gross pay bar shrinking to Net pay after labeled tax deductions",
        body: `Imagine you work 20 hours at $12/hour at a local shop.\n\n• **Gross pay** ≈ 20 × $12 = **$240**.\n• After taxes and other withholdings, **net pay** might be noticeably less — for example, something in the ballpark of the low-to-mid $200s depending on your situation. (Exact amounts vary; this is only an illustration.)\n\nIf you plan to spend the full $240 on weekend plans, you'll come up short. That's why \"Paycheck Pro\" thinking starts with: **What actually lands?**\n\nHourly jobs multiply hours × rate (plus overtime rules when they apply). Some jobs pay a **salary** (a set amount per year divided across pay periods). Either way, deductions still reduce take-home pay.`,
        bullets: [
          "**Gross** = before deductions.",
          "**Net** = after deductions (take-home).",
          "Plan spending and saving from **net**.",
        ],
        callout: {
          label: "Watch out",
          text: "Apps that show \"you earned $X this week\" may display gross. Confirm what hits your bank before you spend like it's all available.",
        },
      },
      {
        id: "deductions",
        kicker: "Where it goes",
        title: "Common paycheck deductions (teen level)",
        body: `Exact lines vary by job and state, but many teen pay stubs show some of these:\n\n• **Federal income tax withholding** — an estimate of income tax sent to the IRS during the year.\n• **State income tax withholding** — similar idea for state tax where it applies (Georgia has a state income tax).\n• **Social Security and Medicare (FICA)** — payroll taxes that fund those federal programs; employees typically see these withheld.\n• Other possible items — things like benefit premiums if you have coverage through work (less common for many teen jobs), or uniform/tool deductions if your employer uses them (read policies carefully).\n\nYou may also see **YTD** (year-to-date) totals — running totals for the year so far.\n\nYou don't need to memorize tax brackets today. You do need to expect that **net < gross** and know which categories appear on your stub.`,
        callout: {
          label: "Why it matters",
          text: "Understanding withholdings stops the \"they stole my money\" feeling and replaces it with \"I can read my stub and plan.\"",
        },
      },
      {
        id: "w4",
        kicker: "Light touch",
        title: "W-4 awareness (not a filing guide)",
        body: `When you start a job, you often complete a **Form W-4**. It helps your employer estimate how much **federal income tax** to withhold from each paycheck.\n\nBig-picture points only:\n\n• Withholding is an estimate during the year — not the final tax bill by itself.\n• If too little is withheld, you might owe money at tax time; if too much, you might get a refund. Neither outcome is \"winning\" by default — it's cash-flow timing.\n• Life changes (second job, big income shift) can mean you should review your W-4 with a trusted adult or tax resource.\n\nThis class does **not** tell you exactly how to fill every W-4 checkbox for your personal situation. When unsure, ask a parent/guardian, school counselor resource, or a reputable tax guidance source — and keep copies of forms you sign.`,
        callout: {
          label: "Watch out",
          text: "Friends' W-4 choices are not a template. Their income, dependents, and other jobs may differ from yours.",
        },
      },
      {
        id: "paystub",
        kicker: "Read it",
        title: "How to skim a pay stub in 60 seconds",
        image: "/images/lessons/fl-3-3.png",
        imageAlt: "Realistic close-up of a pay stub on a laptop screen with hours, gross, deductions, and net highlighted",
        body: `Every pay period, check:\n\n**1. Hours / pay rate** — Do hours match your timesheet?\n**2. Gross pay** — Does the math look right?\n**3. Deduction list** — Any surprise line items?\n**4. Net pay** — Does it match what hit your account?\n**5. YTD** — Useful for seeing how much you've earned and withheld so far.\n\nIf something looks wrong (missing hours, unexpected deduction), ask your manager or payroll contact politely and promptly — bring the stub. Mistakes happen; catching them early matters.\n\nAlso note your **pay schedule** (weekly, biweekly, monthly). Budgets are easier when you know when money arrives.`,
        bullets: [
          "Match hours → gross → deductions → net → bank deposit.",
          "Save or download stubs when possible.",
          "Ask early if numbers look off.",
        ],
        callout: {
          label: "Pro tip",
          text: "Screenshot or save digital stubs in a folder labeled by year. You'll thank yourself for job applications, taxes, or proving income later.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Gross pay** is before deductions; **net pay** is take-home.\n• Common withholdings include federal/state income tax and FICA (Social Security & Medicare).\n• A **W-4** guides federal withholding — overview only; get help for your personal form.\n• Read each **pay stub**: hours, gross, deductions, net, YTD.\n• Budget from **net**, not gross.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on how net pay changes your spending plan.`,
      },
    ],
  },
  bigIdeas: [
    "**Gross pay** is what you earn before deductions; **net pay** is what you take home.",
    "Paychecks often withhold **income taxes** and **FICA** (Social Security and Medicare) before you get paid.",
    "A **W-4** helps your employer estimate federal withholding — review it thoughtfully when life or jobs change.",
  ],
  keyTerms: [
    { term: "Gross pay", definition: "Total earnings before taxes and other deductions." },
    { term: "Net pay", definition: "Take-home pay after deductions — what you actually receive." },
    { term: "Deduction / withholding", definition: "Money taken from a paycheck for taxes or other items." },
    { term: "Pay stub", definition: "A statement showing hours, gross pay, deductions, and net pay." },
    { term: "W-4", definition: "A form that helps your employer estimate federal income tax withholding." },
    { term: "FICA", definition: "Payroll taxes for Social Security and Medicare commonly withheld from paychecks." },
    { term: "Year-to-date (YTD)", definition: "Running totals of earnings and withholdings for the year so far." },
  ],
  realWorld:
    "A teen budgeting $240 of gross pay for a weekend trip may bounce a payment when only ~$210 net hits the account. Planning from net pay prevents that mismatch.",
  quiz: [
    {
      id: "q1",
      question: "What is net pay?",
      choices: [
        "Pay before any taxes or deductions",
        "Take-home pay after deductions",
        "Only overtime earnings",
        "Your hourly wage times 52 weeks",
      ],
      correctIndex: 1,
      explanation:
        "Net pay is what you actually receive after withholdings — take-home pay.",
    },
    {
      id: "q2",
      question: "You get paid $240 gross but only $186 hits your account. Why can budgeting from gross cause problems?",
      choices: [
        "Gross pay is illegal to look at",
        "Gross pay overestimates spendable money because deductions reduce take-home pay",
        "Gross pay is always lower than net pay",
        "Employers never show gross pay",
      ],
      correctIndex: 1,
      explanation:
        "Deductions mean net < gross. Spending as if you had the full gross amount leads to shortfalls.",
    },
    {
      id: "q3",
      question: "Which pair is commonly part of FICA withholdings?",
      choices: [
        "Streaming and gaming fees",
        "Social Security and Medicare",
        "Only state sales tax",
        "Credit card interest",
      ],
      correctIndex: 1,
      explanation:
        "FICA typically refers to Social Security and Medicare payroll taxes withheld from many paychecks.",
    },
    {
      id: "q4",
      question: "What is a W-4 mainly used for?",
      choices: [
        "Applying for a driver's license",
        "Helping your employer estimate federal income tax withholding",
        "Opening a savings account",
        "Calculating your GPA",
      ],
      correctIndex: 1,
      explanation:
        "The W-4 guides how much federal income tax an employer withholds from your pay.",
    },
    {
      id: "q5",
      question: "Your first paycheck deposit looks way smaller than you expected. What should you do first?",
      choices: [
        "Ignore it until next year",
        "Compare hours, gross pay, deductions, and net pay on the pay stub to your timesheet and bank deposit",
        "Fill out a new W-4 every day",
        "Assume all deductions are always wrong",
      ],
      correctIndex: 1,
      explanation:
        "A careful stub check — hours through net vs. deposit — is the right first step before escalating a payroll question.",
    },
  ],
  reflection: {
    prompt:
      "If you have a job (or imagine one), how would using net pay instead of gross pay change a weekly spending plan?",
    placeholder: "Example: I'd stop planning activities off the $240 gross and use the real deposit amount instead…",
  },
};
