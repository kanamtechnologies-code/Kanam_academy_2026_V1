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
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-13.png",
        imageAlt: "Teen with a W-2 form and a summer job pay stubs folder at a desk with a parent nearby",
        body: `Your first paycheck can feel like a plot twist: the number on the hiring poster isn't the number you take home. Today's a deep dive — as a Tax Rookie, not a CPA.\n\nHere's the roadmap:\n\n• **A true-ish story** about a first paycheck surprise.\n• **Why taxes exist**, **gross vs net pay**, **W-2 vs 1099**, and **filing basics** — three core concepts, each with a quick check.\n• A **worked example** reading a real stub, a common **myth**, and a **try-it** practice round.\n• A **deeper skill** (reading a W-4 and planning for gig income), a **W-2 vs 1099 comparison**, and a **behavioral trap** to avoid.\n• **Habits**, how this connects to national money standards, a reflection pause, a **mini-case**, and a mixed **check yourself**.\n\nThis is general education. Rules change and depend on your situation — trusted adults and official resources beat random videos.`,
        callout: {
          label: "Why it matters",
          text: "Understanding withholdings and forms helps you budget, avoid panic, and spot bad advice when you start earning.",
        },
      },
      {
        id: "hook-story",
        kicker: "True-ish story",
        title: "The paycheck plot twist",
        image: "/images/lessons/fl-13-2.png",
        imageAlt: "Teen looking surprised at a phone banking app showing a lower-than-expected direct deposit",
        body: `Malik just finished his first week at a smoothie shop: 20 hours at $15/hour. He does the math on the walk home — $300, easy. Maybe he'll finally get those new cleats.\n\nFriday night, the direct deposit hits. **$263.41.**\n\nHe texts his older cousin: *"did they shortchange me??"* His cousin laughs and sends back one word: *"withholding."*\n\nMalik isn't being scammed. Like almost every first-time worker, he just met the gap between the number on the flyer and the number in his account. By the end of this lesson, you'll be able to explain that gap to Malik better than his cousin did — and you'll see his exact numbers in a few minutes.`,
        callout: {
          label: "Keep this in mind",
          text: "We'll come back to Malik's stub, and to a second job he picks up later in the lesson. Watch how the same ideas apply both times.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Tax words without the headache",
        body: `• **Tax** — required payment to fund government services and obligations.\n• **Gross pay** — earnings before deductions.\n• **Net pay** — take-home pay after taxes and other withholdings.\n• **Withholding** — money your employer sends to tax agencies from your paycheck.\n• **Form W-4** — the form you fill out when you're hired that tells your employer how much to withhold.\n• **W-2** — a form employees typically receive summarizing wages and withholdings for the year.\n• **1099** — a family of forms often used to report certain non-employee payments (details vary).\n• **Refund** — money returned if you overpaid taxes relative to what you owe for the year.\n• **Filing** — submitting a tax return when required.\n\nWe'll keep the deep edge cases out — awareness first.`,
        callout: {
          label: "Pro tip",
          text: "When confused, separate 'what came out of my check' from 'what I might owe or get back at year-end.'",
        },
      },
      {
        id: "concept-1",
        kicker: "Concept 1",
        title: "Why taxes exist (the civic money story)",
        body: `Taxes fund things people share: roads, schools, public safety, courts, health programs, defense, and more — plus interest on public debt and other obligations. People argue about *how much* and *on what*, but the core idea is collective funding.\n\nDifferent taxes hit differently: income taxes, sales tax at checkout, payroll taxes for social programs, property taxes (often via housing costs), and more. As a first-job teen, you'll mostly notice **payroll withholdings** and **sales tax** when you buy snacks or gas.\n\nThat's also where **gross pay** and **net pay** split apart: gross is the number on the offer, net is what actually lands in your account once withholding is subtracted. Malik's $300 was gross; his $263.41 was net.\n\nPaying legally required taxes isn't optional "if you disagree." Tax Rookies learn the system so they can comply and plan.`,
        bullets: [
          "Taxes fund shared public goods and services.",
          "Gross pay is the sticker number; net pay is what actually deposits.",
          "Honesty and records beat clever shortcuts sold online.",
        ],
        callout: {
          label: "Watch out",
          text: "Anyone promising secret methods to 'never pay taxes legally' while you earn normal wages is usually selling trouble.",
        },
        checkIn: {
          prompt: "What is the difference between gross and net pay?",
          choices: [
            "They are always the same number",
            "Gross is before deductions; net is take-home after withholdings",
            "Net is always higher than gross",
            "Gross only applies to 1099 workers",
          ],
          correctIndex: 1,
          explanation:
            "Gross is the starting wage amount; net is what typically lands in your account after withholdings.",
        },
      },
      {
        id: "concept-2",
        kicker: "Concept 2",
        title: "W-2 vs 1099 — lightly, for awareness",
        body: `**W-2 employee (typical):** your employer withholds income and payroll taxes, may offer benefits, and issues a W-2. You still may need to file a return depending on income and rules.\n\n**1099 / contractor-style work (simplified):** you may receive payment with little or no tax withheld. That can feel like a bigger check — but you may owe taxes later, and you might need to plan quarterly payments as an adult. Expenses and self-employment rules get complicated fast.\n\nTax Rookie takeaway: a higher sticker rate on gig work isn't automatically "more money" until you account for taxes, expenses, and lack of benefits. Ask a trusted adult before treating all deposits as spendable.`,
        callout: {
          label: "Common misconception",
          text: "\"If no tax was withheld, I don't owe anything.\" Withholding and final tax responsibility are related but not identical.",
        },
        checkIn: {
          prompt: "Why might a 1099-style gig deposit feel larger than a W-2 paycheck for similar work?",
          choices: [
            "Because taxes never apply to gig work",
            "Because little or no tax may be withheld up front — you may still owe later",
            "Because 1099 income is illegal",
            "Because W-2 jobs never withhold anything",
          ],
          correctIndex: 1,
          explanation:
            "Less withholding can inflate the deposit. Tax responsibility may still exist — plan before you spend it all.",
        },
      },
      {
        id: "concept-3",
        kicker: "Concept 3",
        title: "Filing basics — what to actually keep track of",
        body: `**Filing awareness (not a how-to for every case):**\n• Keep pay stubs and year-end forms (W-2s, 1099s) somewhere you won't lose them.\n• Filing deadlines exist; missing them can cause penalties when you owe.\n• Free or low-cost filing help may be available depending on income — ask a counselor, librarian, or trusted adult about reputable options.\n• Identity scams spike at tax time; guard Social Security numbers and use official channels.\n• Whether you're *required* to file depends on income, filing status, and current rules — that's a question for a trusted adult or official resource, not a guess.\n\nThe skill here isn't memorizing thresholds — it's building the habit of keeping forms and asking before assuming.`,
        callout: {
          label: "Try this week",
          text: "Find (or picture) one real pay stub and circle gross pay, net pay, and each withholding line you can name.",
        },
        checkIn: {
          prompt: "What is a smart filing-basics habit for a first-year worker?",
          choices: [
            "Throw away pay stubs since employers keep the records forever",
            "Keep W-2/1099 forms and pay stubs, and ask a trusted adult about deadlines and filing help",
            "Assume filing rules are the same for everyone, always",
            "Share your Social Security number in any app that asks",
          ],
          correctIndex: 1,
          explanation:
            "Keeping records and asking a trusted source beats guessing — filing requirements depend on your specific situation.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Reading Malik's actual stub",
        body: `Let's open Malik's stub from the hook story. His shop pays weekly.\n\n**Gross pay:** 20 hours × $15.00 = **$300.00**\n\n**Withholding lines (illustrative — real amounts depend on location, forms, and current rules):**\n• Federal income tax withholding: $18.50\n• Social Security (6.2%): $18.60\n• Medicare (1.45%): $4.35\n• State income tax withholding: $5.14\n\n**Total withheld:** $46.59\n\n**Net pay:** $300.00 − $46.59 = **$253.41**\n\n(Malik's actual deposit was $263.41 — his employer's real numbers differ slightly from this simplified example, which is normal; every employer's exact combination of withholdings varies.)\n\nThe move here isn't memorizing percentages — it's the habit: **start at gross, subtract each withholding line, land on net.** That's the same three-step read for any stub you'll ever get.`,
        bullets: [
          "Start at gross pay (hours × rate, or salary).",
          "Subtract each withholding line one at a time.",
          "What's left is net pay — the number to budget with.",
        ],
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "Three tax myths worth busting now",
        body: `**Myth 1: "A refund is free bonus money."**\nReality: a refund usually means you *overpaid* during the year. It's your own money coming back — not a prize.\n\n**Myth 2: "If I'm a student or my job is small, I never have to think about taxes."**\nReality: whether you need to file depends on income, filing status, and current rules — not on being a student. Check with a trusted adult instead of assuming.\n\n**Myth 3: "Aiming for the biggest possible refund is always the smart move."**\nReality: a giant refund can mean you gave the government an interest-free loan all year through extra withholding. Some people prefer that for forced savings; others would rather have the money sooner. Preferences vary — but it's a choice, not automatically a win.`,
        callout: {
          label: "Reality check",
          text: "A balance due at year-end doesn't mean you're a financial failure, either — it usually just means withholding didn't match what you owed. Both directions are adjustable.",
        },
        checkIn: {
          prompt: "Which statement is the myth, not the reality?",
          choices: [
            "A refund usually means you overpaid during the year",
            "A tax refund is free bonus money the government gives you as a gift",
            "Whether you must file depends on income, filing status, and current rules",
            "A big refund can mean extra withholding acted like an interest-free loan to the government",
          ],
          correctIndex: 1,
          explanation:
            "A refund is a return of your own overpaid money — not a gift. The other three statements are accurate.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it",
        title: "Your turn: read a different stub",
        body: `Here's a stub for **Priya**, who worked 15 hours at $16/hour this week. Before reading the answer below, try the three-step read yourself: gross → subtract withholding lines → net.\n\n**Gross pay:** 15 × $16.00 = ?\n\n**Withholding lines (illustrative):**\n• Federal income tax: $9.80\n• Social Security (6.2%): $14.88\n• Medicare (1.45%): $3.48\n• State income tax: $3.60\n\n**Total withheld:** ?\n\n**Net pay:** ?`,
        callout: {
          label: "Check your work",
          text: "Gross = $240.00. Total withheld = $9.80 + $14.88 + $3.48 + $3.60 = $31.76. Net = $240.00 − $31.76 = $208.24. If you landed close to that, the three-step read is clicking.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Deeper skill",
        title: "Your W-4 — and planning ahead for 1099 income",
        image: "/images/lessons/fl-13-4.png",
        imageAlt: "Close-up of a Form W-4 being filled out at a kitchen table with a calculator and a parent helping",
        body: `**The W-4, decoded at a beginner level:** When you're hired for a W-2 job, you fill out a **Form W-4** (and often a state equivalent). It tells your employer roughly how much to withhold from each check. Simpler elections generally mean more predictable — sometimes higher — withholding; the exact effect depends on your full situation. Fill it out with a trusted adult if anything is unclear, and keep a copy.\n\n**Planning for 1099 / gig income:** Since little or no tax may be withheld automatically, many people who do gig or contract work build a personal habit of **setting aside a portion of each gig payment** — for example, moving a slice into a separate savings account the same day it's deposited — so a possible future tax bill doesn't surprise them. This is a general awareness habit, not a specific percentage recommendation for your situation; a trusted adult or tax professional can help you figure out what fits your case as an adult.\n\nThe deeper skill: **don't wait for a form to force good habits.** Whether it's adjusting a W-4 with help, or setting aside gig income as it arrives, the winning move is being proactive instead of reactive.`,
        bullets: [
          "W-4 elections shape withholding — fill it out with help, keep a copy.",
          "Gig income often arrives with little or no withholding.",
          "A 'set aside a portion right away' habit protects future-you from surprises.",
        ],
      },
      {
        id: "comparison",
        kicker: "Side-by-side",
        title: "W-2 vs 1099 — the comparison sheet",
        body: `Line them up on the same five questions:\n\n**Withholding** — W-2: employer typically withholds automatically. 1099: often little or none withheld.\n\n**Benefits** — W-2: may include benefits depending on the employer. 1099: usually none provided.\n\n**Tax paperwork** — W-2: employer sends a W-2. 1099: you may receive one or more 1099-type forms.\n\n**Flexibility** — W-2: set schedule, employer-directed work. 1099: often more control over hours and how the work gets done.\n\n**Your job** — W-2: budget on the net pay shown on the stub. 1099: track payments yourself and consider setting money aside.\n\nNeither path is "better" in general — they're different tradeoffs between predictability and flexibility. What matters is knowing which one you're in so you handle taxes accordingly.`,
        callout: {
          label: "Quick gut-check",
          text: "If a deposit arrived with almost nothing subtracted, ask yourself: was this W-2 or 1099-style work? The answer changes what you should do with that money next.",
        },
      },
      {
        id: "behavioral-trap",
        kicker: "Behavioral trap",
        title: "The 'refund windfall' trap",
        body: `Economists call it **mental accounting** — treating money differently depending on which "bucket" it seems to come from, even though all money is equally spendable. A tax refund often gets mentally filed under "bonus money" or "found money," which makes it feel safer to blow on something big and impulsive.\n\nBut a refund is money you already earned and already had withheld all year. It's not different from any other paycheck dollar — it just arrived in a lump.\n\nTax Rookies interrupt the trap with one question before spending a refund (or a surprisingly large gig deposit): **"If this had arrived in my normal paycheck instead, would I still make this purchase?"** If the honest answer is no, the lump-sum feeling is doing the persuading, not your actual plan.`,
        callout: {
          label: "Watch out",
          text: "Retailers know refund season is a spending spike for a reason — 'refund sale' marketing exists precisely because mental accounting works.",
        },
      },
      {
        id: "habits",
        kicker: "Make it real",
        title: "Tax Rookie habits that prevent future messes",
        image: "/images/lessons/fl-13-3.png",
        imageAlt: "Organized folder labeled Tax papers with pay stubs and a calendar marked Keep records",
        body: `• **Day one:** Complete **Form W-4** (and your state's equivalent, if your employer gives one) with a **trusted adult** if you need help — these forms **set how much tax is withheld** from each paycheck. Keep copies for your records.\n• Save digital/paper copies of W-2/1099 forms when they arrive.\n• Update your address with employers so forms don't go missing.\n• Budget on **net** pay, not the hiring-poster wage.\n• If you have multiple gigs, track payments in a simple spreadsheet and consider setting aside a portion as it arrives.\n• Never share tax documents in random DMs.\n• Ask questions early — parents, guardians, school counselors, or reputable volunteer clinics.\n\nYou're building literacy so first-job surprises become manageable.`,
        callout: {
          label: "Reality check",
          text: "This lesson is educational awareness, not personalized tax advice. Your forms and obligations depend on your facts and current law.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Why this is on the checklist",
        title: "How this connects to national money standards",
        body: `Groups like the **Jump$tart Coalition** and the **Council for Economic Education** publish national standards for personal financial education, and **Earning Income** is one of the core pillars — right alongside spending, saving, credit, investing, and risk management.\n\nWithin that pillar, the specific skills you just practiced show up directly:\n\n• Explaining **why governments collect taxes** and how that connects to your paycheck.\n• Distinguishing **gross pay from net pay**, and reading a pay stub.\n• Comparing **employee (W-2) vs contractor-style (1099) work**, including how taxes are handled differently.\n• Building **filing and recordkeeping awareness** for W-2s and 1099s.\n\nThis isn't trivia for its own sake — it's the exact "can this student handle their first paycheck responsibly" checkpoint that these standards are designed to measure.`,
        callout: {
          label: "Good to know",
          text: "If your class or state references financial literacy standards, this lesson maps to the Earning Income domain almost line for line.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Take thirty seconds before the next section. You don't need to write anything down yet — that comes at the end — but think through this:\n\n*If your next paycheck (or gig deposit) is smaller than you expected, what's the very first thing you'll check — the withholding lines, the hours logged, or something else? And who's the one trusted adult you'd ask if the numbers still don't make sense?*\n\nHolding a concrete answer to that question is the real goal of this lesson. Everything else — vocabulary, comparisons, myths — is in service of that one moment of "okay, I know what to check and who to ask."`,
      },
      {
        id: "mini-case",
        kicker: "Mini-case",
        title: "Malik's second job — mixing W-2 and 1099",
        image: "/images/lessons/fl-13-5.png",
        imageAlt: "Split scene: a smoothie shop shift schedule next to a dog-walking app payment notification on a phone",
        body: `A few months after his cleats-fund paycheck surprise, Malik picks up dog-walking gigs through an app on weekends, on top of his smoothie shop shifts.\n\n• **Smoothie shop:** W-2, $15/hour, taxes withheld automatically each week (like his stub earlier).\n• **Dog-walking app:** pays him directly after each walk, with **no tax withheld at all**. Over a month, that adds up to $180.\n\nMalik is tempted to treat all $180 as pure spending money since "nothing was taken out." Using what you've learned about W-2 vs 1099 work and the deeper-skill habit of setting money aside, what should Malik actually do with that $180?`,
        checkIn: {
          prompt: "What's the Tax Rookie move for Malik's $180 in dog-walking income?",
          choices: [
            "Spend all of it immediately since no tax was withheld, meaning none is owed",
            "Set aside a portion of it in savings and keep a simple record of the payments, since 1099-style income may create tax responsibility later",
            "Refuse to report it to anyone because it's 'cash-app money'",
            "Assume the app automatically files taxes on his behalf",
          ],
          correctIndex: 1,
          explanation:
            "1099-style payments often arrive with no withholding, but that doesn't mean no eventual tax responsibility. Setting money aside and keeping records is the proactive habit.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Mixed review: pulling it together",
        body: `One more check before the full knowledge check — this one mixes ideas from across the lesson, the way a real first-job situation would.`,
        checkIn: {
          prompt: "A friend says: 'My gig app deposit was bigger than my W-2 paycheck for the same hours, so gig work pays more.' What's the Tax Rookie response?",
          choices: [
            "Agree completely — bigger deposit always means more money",
            "Point out that the gig deposit likely had little or no tax withheld, so it may not reflect the final take-home once tax responsibility is accounted for",
            "Say taxes never apply to app-based gig work",
            "Say W-2 jobs always pay less in every case",
          ],
          correctIndex: 1,
          explanation:
            "A larger up-front deposit can be misleading if withholding differs. Comparing pay fairly means accounting for eventual tax responsibility, not just the number that lands today.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Taxes fund shared public costs; paychecks show withholdings — gross becomes net.\n• W-2 and 1099-style work handle taxes very differently; a bigger deposit isn't automatically more money.\n• Filing awareness, recordkeeping, and asking trusted adults beat guessing — and refunds aren't free bonus money.\n• Watch the mental-accounting trap with refunds or lump-sum gig payments.\n\nComplete the **Knowledge check**, then reflect on one Tax Rookie habit you'll start with your next paycheck.`,
      },
    ],
  },
  bigIdeas: [
    "Taxes fund shared public goods; **gross** pay differs from **net** take-home pay.",
    "**W-2** and **1099-style** work typically handle withholding differently — plan before you spend the whole deposit.",
    "A **refund** usually means you overpaid; it isn't a mysterious prize, and lump sums tempt impulsive 'mental accounting' spending.",
  ],
  keyTerms: [
    { term: "Gross pay", definition: "Earnings before taxes and other deductions." },
    { term: "Net pay", definition: "Take-home pay after withholdings and deductions." },
    { term: "Withholding", definition: "Money taken from a paycheck and sent toward taxes." },
    { term: "Form W-4", definition: "The form a new employee completes telling an employer how much tax to withhold." },
    { term: "W-2", definition: "Year-end form employees typically receive summarizing wages and withholdings." },
    { term: "1099", definition: "Forms often used to report certain payments outside traditional wages (details vary)." },
    { term: "Tax refund", definition: "Money returned when you paid more in taxes than you owe for the year." },
    { term: "Filing", definition: "Submitting a tax return when required by law." },
    { term: "Mental accounting", definition: "Treating money differently based on its perceived source, even though all money spends the same." },
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
      question: "What is a smart filing-basics habit for a first-year worker?",
      choices: [
        "Throw away pay stubs since employers keep records forever",
        "Keep W-2/1099 forms and pay stubs, and ask a trusted adult about deadlines and filing help",
        "Assume filing rules are identical for every person in every situation",
        "Share your Social Security number in any app that asks",
      ],
      correctIndex: 1,
      explanation:
        "Recordkeeping and asking a trusted, reputable source beats guessing about deadlines or requirements.",
    },
    {
      id: "q5",
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
      id: "q6",
      question: "What is the deeper-skill habit for handling gig/1099 income responsibly?",
      choices: [
        "Wait until year-end to think about it at all",
        "Set aside a portion of gig payments as they arrive and keep a simple record",
        "Assume the app automatically withholds and files for you",
        "Spend it all immediately since nothing was subtracted",
      ],
      correctIndex: 1,
      explanation:
        "Because 1099-style income often has no automatic withholding, proactively setting money aside protects against future surprises.",
    },
    {
      id: "q7",
      question: "What is the 'refund windfall' behavioral trap?",
      choices: [
        "Refusing to ever accept a refund",
        "Mentally treating a refund as 'found money' and spending it more impulsively than a regular paycheck dollar",
        "A rule that refunds must be saved by law",
        "A myth that refunds don't exist",
      ],
      correctIndex: 1,
      explanation:
        "Mental accounting makes lump-sum money feel different from regular paycheck money, even though it spends the same.",
    },
    {
      id: "q8",
      question: "A friend says a bigger gig-app deposit than their W-2 paycheck means gig work simply 'pays more.' What's the Tax Rookie response?",
      choices: [
        "Agree — a bigger deposit always means more take-home money",
        "Point out that the gig deposit likely had little or no withholding, so a fair comparison must account for eventual tax responsibility",
        "Say taxes never apply to app-based gig work",
        "Say W-2 jobs always pay less in every situation",
      ],
      correctIndex: 1,
      explanation:
        "Comparing pay fairly requires accounting for withholding differences, not just which number looks bigger today.",
    },
  ],
  reflection: {
    prompt:
      "Look at (or imagine) a first paycheck from a part-time job. What line items would you expect between gross and net, and what is one question you would ask a trusted adult or payroll contact?",
    placeholder:
      "Example: I'd expect federal/state withholding and other payroll lines. I'd ask how to get copies of my W-2 and whether I need to file…",
  },
};
