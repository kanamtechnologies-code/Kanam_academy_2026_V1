import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson13: AILessonConfig = {
  id: "fl-13",
  title: "13. Taxes & Your First Job",
  goal: "Explain why taxes exist, lightly compare W-2 vs 1099 work, build awareness of filing basics, and bust common refund myths — educational, not tax advice.",
  xpReward: 650,
  badge: "Tax Rookie",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/12",
  nextHref: "/learn/finance/14",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-13.png",
        imageAlt: "Teen with a W-2 form and a summer job pay stubs folder at a desk with a parent nearby",
        body: `Your first paycheck can feel like a plot twist: the number on the hiring poster isn't the number you take home. Today you'll learn why — as a Tax Rookie, not a CPA.\n\nHere's our roadmap:\n\n• **Why taxes exist** — shared public costs.\n• **Gross vs net** — what disappears before deposit.\n• **W-2 vs 1099 (lightly)** — employee vs contractor vibes.\n• **Filing awareness** — forms, deadlines, when help matters.\n• **Refund myths** — a refund isn't free bonus money.\n• **Teen action items** — records, questions, honesty.\n\nThis is general education. Rules change and depend on your situation — trusted adults and official resources beat random videos.`,
        callout: {
          label: "Why it matters",
          text: "Understanding withholdings and forms helps you budget, avoid panic, and spot bad advice when you start earning.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Tax words without the headache",
        body: `• **Tax** — required payment to fund government services and obligations.\n• **Gross pay** — earnings before deductions.\n• **Net pay** — take-home pay after taxes and other withholdings.\n• **Withholding** — money your employer sends to tax agencies from your paycheck.\n• **W-2** — a form employees typically receive summarizing wages and withholdings for the year.\n• **1099** — a family of forms often used to report certain non-employee payments (details vary).\n• **Refund** — money returned if you overpaid taxes relative to what you owe for the year.\n• **Filing** — submitting a tax return when required.\n\nWe'll keep the deep edge cases out — awareness first.`,
        callout: {
          label: "Pro tip",
          text: "When confused, separate 'what came out of my check' from 'what I might owe or get back at year-end.'",
        },
      },
      {
        id: "why-taxes",
        kicker: "The big idea",
        title: "Why taxes exist (the civic money story)",
        body: `Taxes fund things people share: roads, schools, public safety, courts, health programs, defense, and more — plus interest on public debt and other obligations. People argue about *how much* and *on what*, but the core idea is collective funding.\n\nDifferent taxes hit differently: income taxes, sales tax at checkout, payroll taxes for social programs, property taxes (often via housing costs), and more. As a first-job teen, you'll mostly notice **payroll withholdings** and **sales tax** when you buy snacks or gas.\n\nPaying legally required taxes isn't optional "if you disagree." Tax Rookies learn the system so they can comply and plan.`,
        bullets: [
          "Taxes fund shared public goods and services.",
          "Your paycheck may withhold several categories at once.",
          "Honesty and records beat clever shortcuts sold online.",
        ],
        callout: {
          label: "Watch out",
          text: "Anyone promising secret methods to 'never pay taxes legally' while you earn normal wages is usually selling trouble.",
        },
      },
      {
        id: "w2-1099",
        kicker: "First job lens",
        title: "W-2 vs 1099 — lightly, for awareness",
        image: "/images/lessons/fl-13-2.png",
        imageAlt: "Side-by-side educational cards: W-2 employee paycheck vs 1099 gig style income for teens",
        body: `**W-2 employee (typical):** your employer withholds income and payroll taxes, may offer benefits, and issues a W-2. You still may need to file a return depending on income and rules.\n\n**1099 / contractor-style work (simplified):** you may receive payment with little or no tax withheld. That can feel like a bigger check — but you may owe taxes later, and you might need to plan quarterly payments as an adult. Expenses and self-employment rules get complicated fast.\n\nTax Rookie takeaway: a higher sticker rate on gig work isn't automatically "more money" until you account for taxes, expenses, and lack of benefits. Ask a trusted adult before treating all deposits as spendable.`,
        callout: {
          label: "Common misconception",
          text: "\"If no tax was withheld, I don't owe anything.\" Withholding and final tax responsibility are related but not identical.",
        },
      },
      {
        id: "filing-refunds",
        kicker: "Year-end",
        title: "Filing basics awareness and refund myths",
        body: `**Filing awareness (not a how-to for every case):**\n• Keep pay stubs and year-end forms.\n• Know that filing deadlines exist; missing them can cause penalties when you owe.\n• Free or low-cost filing help may be available depending on income — ask a counselor, librarian, or trusted adult about reputable options.\n• Identity scams spike at tax time; guard SSNs and use official channels.\n\n**Refund myths:**\n• A refund means you **overpaid** during the year — it's your money coming back, not a prize from the government.\n• Aiming for a giant refund isn't automatically smart; it can mean you gave an interest-free loan via extra withholding (preferences vary).\n• A refund doesn't prove you "beat" the system — and a balance due doesn't mean you're a failure; it means planning/withholding needs a tweak.\n\nWhen in doubt, get help from reputable sources — not viral loopholes.`,
        callout: {
          label: "Try this week",
          text: "Read one real pay stub: circle gross, net, and each withholding line you can name.",
        },
      },
      {
        id: "teen-habits",
        kicker: "Make it real",
        title: "Tax Rookie habits that prevent future messes",
        image: "/images/lessons/fl-13-3.png",
        imageAlt: "Organized folder labeled Tax papers with pay stubs and a calendar marked Keep records",
        body: `• **Day one:** Complete **Form W-4** (and your state's equivalent, if your employer gives one) with a **trusted adult** if you need help — these forms **set how much tax is withheld** from each paycheck. Keep copies for your records.\n• Save digital/paper copies of W-2/1099 forms when they arrive.\n• Update your address with employers so forms don't go missing.\n• Budget on **net** pay, not the hiring-poster wage.\n• If you have multiple gigs, track payments in a simple spreadsheet.\n• Never share tax documents in random DMs.\n• Ask questions early — parents, guardians, school counselors, or reputable volunteer clinics.\n\nYou're building literacy so first-job surprises become manageable.`,
        callout: {
          label: "Reality check",
          text: "This lesson is educational awareness, not personalized tax advice. Your forms and obligations depend on your facts and current law.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Taxes fund shared public costs; paychecks show withholdings.\n• W-2 and 1099-style work handle taxes differently.\n• Filing awareness + records matter; refunds aren't free bonus money.\n• Budget on net pay and get reputable help when unsure.\n\nComplete the **Knowledge check**, then reflect on one Tax Rookie habit you'll start with your next paycheck.`,
      },
    ],
  },
  bigIdeas: [
    "Taxes fund shared public goods; **gross** pay differs from **net** take-home pay.",
    "**W-2** and **1099-style** work typically handle withholding differently — plan before you spend the whole deposit.",
    "A **refund** usually means you overpaid; it isn't a mysterious prize.",
  ],
  keyTerms: [
    { term: "Gross pay", definition: "Earnings before taxes and other deductions." },
    { term: "Net pay", definition: "Take-home pay after withholdings and deductions." },
    { term: "Withholding", definition: "Money taken from a paycheck and sent toward taxes." },
    { term: "W-2", definition: "Year-end form employees typically receive summarizing wages and withholdings." },
    { term: "1099", definition: "Forms often used to report certain payments outside traditional wages (details vary)." },
    { term: "Tax refund", definition: "Money returned when you paid more in taxes than you owe for the year." },
    { term: "Filing", definition: "Submitting a tax return when required by law." },
  ],
  realWorld:
    "The coffee shop flyer says $15/hour. After withholdings, your deposit is lower. A Tax Rookie budgets from net pay and saves the W-2 when it arrives in January — instead of being shocked at tax time.",
  quiz: [
    {
      id: "q1",
      question: "Why do governments collect taxes?",
      choices: [
        "Only to create refund prizes for students",
        "To help fund public goods, services, and obligations",
        "Because employers invent them for fun",
        "So sales tax can replace all other systems forever",
      ],
      correctIndex: 1,
      explanation:
        "Taxes finance shared public costs. Debates about amounts and fairness exist, but the funding purpose is central.",
    },
    {
      id: "q2",
      question: "What is the difference between gross and net pay?",
      choices: [
        "They are always the same number",
        "Gross is before deductions; net is take-home after withholdings/deductions",
        "Net is always higher than gross",
        "Gross only applies to 1099 workers",
      ],
      correctIndex: 1,
      explanation:
        "Gross is the starting wage amount; net is what typically lands in your account after withholdings and deductions.",
    },
    {
      id: "q3",
      question: "Why might a 1099-style gig deposit feel larger than a W-2 paycheck for similar work?",
      choices: [
        "Because taxes never apply to gig work",
        "Because little or no tax may be withheld up front — you may still owe later",
        "Because 1099 income is illegal",
        "Because W-2 jobs never withhold anything",
      ],
      correctIndex: 1,
      explanation:
        "Less withholding can inflate the deposit. Tax responsibility may still exist — awareness prevents overspending.",
    },
    {
      id: "q4",
      question: "What does a tax refund usually mean?",
      choices: [
        "The government is giving you free bonus money you never earned",
        "You overpaid relative to what you owe, so some money is returned",
        "You automatically did something wrong",
        "You will never need to file again",
      ],
      correctIndex: 1,
      explanation:
        "Refunds typically return overwithheld or overpaid amounts — not a prize detached from your taxes.",
    },
    {
      id: "q5",
      question: "Which Tax Rookie habit is wisest with a first job?",
      choices: [
        "Budget using the flyer wage and ignore withholdings",
        "Budget on net pay, keep year-end forms, and seek reputable help when unsure",
        "Share your SSN in group chats for 'fast refunds'",
        "Follow any viral loophole that promises zero taxes forever",
      ],
      correctIndex: 1,
      explanation:
        "Net-pay budgeting, records, and reputable guidance are the durable habits — not hype or oversharing.",
    },
  ],
  reflection: {
    prompt:
      "Look at (or imagine) a first paycheck from a part-time job. What line items would you expect between gross and net, and what is one question you would ask a trusted adult or payroll contact?",
    placeholder:
      "Example: I'd expect federal/state withholding and other payroll lines. I'd ask how to get copies of my W-2 and whether I need to file…",
  },
};
