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
  instructorScript: `**Coach's note**
Today's lesson: **Taxes & Your First Job**.

**Goal:** Explain why taxes exist, lightly compare W-2 vs 1099 work, build awareness of filing basics, and bust common refund myths — educational, not tax advice.

**How to facilitate**
1. Warm-up: ask students what they already think about "What you'll learn today".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-13.png",
        imageAlt: "Teen with a W-2 form and a summer job pay stubs folder at a desk with a parent nearby",
        body: `Your first paycheck can feel like a plot twist: the number on the hiring poster isn't the number you take home. Today's a deep dive — as a Tax Rookie, not a CPA.\n\nHere's the roadmap:\n\n• **A true-ish story** about a first paycheck surprise.\n• **Why taxes exist**, **gross vs net pay**, **W-2 vs 1099**, and **filing basics** — three core concepts, each with a quick check.\n• A **worked example** reading a real stub, a common **myth**, and a **try-it** practice round.\n• A **deeper skill** (reading a W-4 and planning for gig income), a **W-2 vs 1099 comparison**, and a **behavioral trap** to avoid.\n• **Habits**, a reflection pause, a **mini-case**, and a mixed **check yourself**.\n\nThis is general education. Rules change and depend on your situation — trusted adults and official resources beat random videos.`,
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
          prompt: "Deja works 12 hours at $18/hour and expects $216 on payday. Her stub shows $184.50 deposited. What best explains the gap?",
          choices: [
            "Her gross pay of $216 had normal payroll withholdings subtracted to produce her net pay",
            "She must have actually worked fewer hours than she logged” belongs to a different situation than the one in the question stem",
            "Her real pay rate must be lower than the $18/hour she was told” belongs to a different situation than the one in the question stem",
            "Her employer made a payroll error and owes her the difference” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Withholding is a normal, expected subtraction from gross pay — not a mistake. Assuming an 'error' skips the far more common explanation: gross became net.",
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
          prompt: "Priya babysits through an app that pays her the full amount owed, while her friend's retail paycheck already has taxes taken out. For the same hours, Priya's deposit looks bigger. Why?",
          choices: [
            "Her friend's employer must be charging a fee that gig apps don't charge” belongs to a different situation than the one in the question stem",
            "The gig deposit likely has little or no tax withheld yet, so Priya may still owe some of it later",
            "App-based gig income is never taxed, so it's simply more money overall” belongs to a different situation than the one in the question stem",
            "Retail jobs are required to pay less per hour than gig apps” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "Less withholding up front can inflate a gig deposit without meaning the work paid more — tax responsibility can still show up later, unlike the myth that gig income simply isn't taxed.",
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
          prompt: "Marcus just got his first W-2 in the mail after a year of work. What's the smart move?",
          choices: [
            "Assume he owes nothing at all since it was his first year working” belongs to a different situation than the one in the question stem",
            "File it somewhere safe with his pay stubs and ask a trusted adult about deadlines and filing help",
            "Wait until he's 18 to think about any of it, since he was a minor when he earned it” belongs to a different situation than the one in the question stem",
            "Recycle it once he's glanced at the total, since employers keep a copy anyway” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "Recordkeeping plus asking a trusted source beats guessing — being a first-time or minor worker doesn't automatically exempt you from filing rules, which depend on your specific situation.",
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
            "Whether you must file depends on income, filing status, and current tax rules",
            "A big refund can mean extra withholding acted like an interest-free loan to the government",
            "A tax refund is free bonus money that has nothing to do with what you already earned",
          ],
          correctIndex: 3,
          explanation:
            "A refund is your own overpaid money coming back, not a gift from the government — the other three statements accurately describe how refunds and filing actually work.",
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
            "“Assume the dog-walking app automatically sets aside taxes on his behalf” describes a different situation than the one in the question stem",
            "Set aside a portion of it in savings and keep a simple record of the payments, since 1099-style income may create tax responsibility later",
            "Only worry about it if his total for the year happens to cross a round number like $1,000” belongs to a different situation than the one in the question stem",
            "“Spend all of it right away since no tax was withheld from any of the payments” describes a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "1099-style payments often arrive with no withholding, but that doesn't mean no eventual tax responsibility — apps generally don't withhold for you, so setting money aside and keeping records is the proactive habit.",
        },
      },
      {
        id: "worked-numbers",
        kicker: "Do the math",
        title: "Malik's W-2 vs 1099 mix — estimated quarterly gap",
        body: `Malik earns **$9,000** from a W-2 job (taxes withheld) plus **$1,200** from freelance graphic work (1099, no withholding).

**Illustrative awareness math:** If roughly **15%** should be set aside for federal+state on the 1099 slice: 15% × $1,200 ≈ **$180** he should plan for (actual rates vary — this is educational rounding).

**Without planning:** Malik spends the full $1,200, files taxes, and owes **$180** plus possible penalties — a spring surprise.

**With sinking fund habit:** Moves **$45/month** into a "taxes" label → $180 saved in 4 months.

W-2 vs 1099 isn't just labels — it's **who holds the tax money until filing**.`,
        bullets: [
          "Withholding on W-2 ≠ taxes handled on 1099 income.",
          "Set aside a **percentage** of 1099 deposits on payday.",
          "A trusted adult or tax preparer helps the first filing year.",
        ],
      },
      {
        id: "ask-before-sign",
        kicker: "Before you file",
        title: "First tax filing — gather this before you submit",
        body: `Not a filing guide — a **gather checklist** with a trusted adult:

• **W-2** from each employer (arrives by late January).
• **1099-NEC** if freelance > $600 from a client (rules can vary).
• **1098-T** if college (tuition statement).
• **Bank interest** forms if savings earned enough.
• **ID + SSN** — never email these unencrypted to random "helpers."
• **Direct deposit info** for refunds — triple-check routing numbers.
• **Prior year return** if you filed before.

File through reputable software or a preparer. Ignore "instant refund" pop-ups that are actually high-fee loans.`,
        callout: {
          label: "Watch out",
          text: "Refund anticipation loans borrow against your own refund — with fees. Waiting for direct deposit is usually cheaper.",
        },
      },
      {
        id: "second-scenario",
        kicker: "Round two",
        title: "The paycheck plot twist — overtime week",
        body: `Malik usually nets **$240** biweekly. One busy period: extra shifts push gross up, but taxes withheld jump too — net **$310** instead of expected **$280**.

**Trap:** Treating the whole $310 as "bonus to spend."

**Plan:**
• Needs stay fixed.
• Move **$40** to tax sinking fund (1099 side gig same month).
• **$30** to emergency fund.
• Remaining bump → one named want, not lifestyle reset.

Irregular income weeks are where **budgets flex** instead of break.`,
        checkIn: {
          prompt: "Malik's net pay jumps $30 this period from extra hours. Best Tax Rookie move?",
          choices: [
            "Notice withholding changed, assign the extra on purpose (tax fund, savings, or planned want)",
            "Quit tracking because overtime makes budgets impossible” belongs to a different situation than the one in the question stem",
            "Skip W-4 updates forever — withholding fixes itself” belongs to a different situation than the one in the question stem",
            "Assume taxes are identical every check — spend the difference” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Extra income still needs a job on the budget. Withholding may change; purposeful assignment beats accidental lifestyle creep.",
        },
      },
      {
        id: "behavioral-trap-2",
        kicker: "Watch your brain",
        title: "Refund windfall — spending next year's money",
        body: `A **$800 refund** feels like free money. Often it's your own over-withholding returned — money you could have had in smaller chunks last year.

**Trap:** Blowing the refund on wants, then struggling all summer.

**Plan:** Split — **50%** goals/emergency, **30%** needs backlog, **20%** guilt-free fun (adjust with a trusted adult).

Refunds aren't failures — but they're lumpy income that needs a plan like any paycheck.`,
        callout: {
          label: "Pro tip",
          text: "If refunds are huge every year, revisit W-4 withholding with an adult — smoother cash flow beats one annual spike.",
        },
      },
      {
        id: "tradeoff-table",
        kicker: "Compare",
        title: "DIY file vs preparer — teen-relevant tradeoffs",
        body: `**DIY free file (simple W-2 only):**
• Cost: **$0–$30** software.
• Time: 1–3 hours learning.
• Risk: Errors if you rush; good for single W-2, standard deduction.

**Paid preparer:**
• Cost: **$80–$200+**.
• Time: 1 appointment.
• Benefit: Help with 1099, education credits, state quirks.

**Tradeoff:** If Malik has W-2 + 1099 + college credits, preparer cost may be less than penalty interest from mistakes. If single W-2, DIY builds literacy.

Neither choice is universal — match complexity to support.`,
        bullets: [
          "Simple return = good learning project.",
          "Mixed income = ask for help early.",
          "Never pay a preparer a % of your refund.",
        ],
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Mixed review: pulling it together",
        body: `One more check before the full knowledge check — this one mixes ideas from across the lesson, the way a real first-job situation would.`,
        checkIn: {
          prompt: "A friend says: 'My gig app deposit was bigger than my W-2 paycheck for the same hours, so gig work pays more.' What's the Tax Rookie response?",
          choices: [
            "Explain that gig apps are required to withhold more tax than traditional employers — familiar wording, wrong fit for what the prompt is actually asking",
            "Treat “Explain that W-2 jobs always end up paying less once bonuses are factored in” as a distractor: close in topic, incorrect for the required answer",
            "Some learners answer “Agree — a bigger deposit for the same hours always means better real pay”, yet that does not match the precise idea from the lesson",
            "Point out that the gig deposit likely had little or no tax withheld, so it may not reflect the final take-home once tax responsibility is accounted for",
          ],
          correctIndex: 3,
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
      question: "Malik's cousin says paying taxes is just 'the government taking your money for no reason.' What's the more accurate view?",
      choices: [
            "Taxes exist only to cover the government's own office expenses, not public services” belongs to a different situation than the one in the question stem",
            "Taxes exist because employers are required to invent extra paperwork” belongs to a different situation than the one in the question stem",
            "Taxes mainly exist to fund refund checks that get sent back every spring” belongs to a different situation than the one in the question stem",
            "Taxes fund shared public costs — like roads, schools, and public safety — that everyone benefits from",
          ],
      correctIndex: 3,
      explanation:
        "Taxes finance shared public costs everyone uses. Framing them as pointless, or as only covering government overhead, misses the actual funding purpose.",
    },
    {
      id: "q2",
      question: "Wei sees a job post advertise '$17/hour' but knows his deposit will be smaller than that number times his hours. What's the right way to think about this?",
      choices: [
            "The $17/hour must be fake advertising that won't actually be honored” belongs to a different situation than the one in the question stem",
            "His net pay will end up higher than $17/hour once a refund is added back in” belongs to a different situation than the one in the question stem",
            "The $17/hour is his gross rate; his net pay will be lower once withholdings are subtracted",
            "His employer must have made an error if take-home doesn't match $17/hour exactly",
          ],
      correctIndex: 2,
      explanation:
        "The advertised rate is gross pay; withholdings reduce it to net pay. That gap is normal and expected, not a sign of false advertising or an employer mistake.",
    },
    {
      id: "q3",
      question: "For the same number of hours, a 1099 gig deposit often looks bigger than a W-2 paycheck. Why?",
      choices: [
            "1099 income is officially tax-exempt as long as it's paid through an app",
            "Little or no tax is withheld up front, but tax responsibility may still exist later",
            "W-2 employers withhold extra pay as a new-hire penalty” belongs to a different situation than the one in the question stem",
            "Gig apps must pay a higher base rate than traditional employers” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Less withholding up front can inflate a gig deposit without meaning higher real pay — the tax responsibility is often delayed, not erased by the app.",
    },
    {
      id: "q4",
      question: "Priya wants to build good filing habits during her first year of work. Which habit fits best?",
      choices: [
            "Keep her W-2/1099 forms and pay stubs together, and ask a trusted adult about deadlines and filing help",
            "Assume the exact filing rules that applied to her older sibling apply to her the same way” belongs to a different situation than the one in the question stem",
            "Only keep pay stubs if a paycheck ever looks obviously wrong” belongs to a different situation than the one in the question stem",
            "Wait for her school to file a return on her behalf automatically” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "Recordkeeping plus asking a trusted, reputable source beats guessing — filing requirements depend on your own income and situation, not someone else's.",
    },
    {
      id: "q5",
      question: "Malik's mom gets a refund check every spring and calls it her 'bonus money.' What's the more accurate description?",
      choices: [
            "It's extra money the government adds on top of what she actually earned” belongs to a different situation than the one in the question stem",
            "It's a sign that she filled out her tax forms incorrectly” belongs to a different situation than the one in the question stem",
            "It's a reward the government pays out for filing early” belongs to a different situation than the one in the question stem",
            "It's money she overpaid during the year through withholding, now being returned to her",
          ],
      correctIndex: 3,
      explanation:
        "A refund returns money you already overpaid — it isn't a reward, a bonus, or proof of a mistake, even though it can feel like a windfall when it arrives as a lump sum.",
    },
    {
      id: "q6",
      question: "Malik wants a habit that protects him from a surprise tax bill on his gig income. What should he do?",
      choices: [
        "Wait until he files a return to think about it for the first time",
        "Trust that the gig app is quietly withholding taxes for him behind the scenes",
        "Spend the full deposit and plan to borrow money later if he ends up owing something",
        "Set aside a portion of each gig payment as it arrives and keep a simple record",
      ],
      correctIndex: 3,
      explanation:
        "Because 1099-style income often has no automatic withholding — unlike what the 'the app handles it' assumption suggests — proactively setting money aside is what protects against future surprises.",
    },
    {
      id: "q7",
      question: "Malik gets a $400 refund and immediately wants to spend it on new shoes because it feels like 'free money.' What behavioral trap is this?",
      choices: [
            "“Filing — the act of submitting a tax return for the year” describes a different situation than the one in the question stem",
            "“A W-4 election — the form that set his withholding amount” describes a different situation than the one in the question stem",
            "Withholding — the process that determined how much tax came out of his pay all year” belongs to a different situation than the one in the question stem",
            "Mental accounting — treating the refund as a different, more spendable kind of money than a regular paycheck dollar",
          ],
      correctIndex: 3,
      explanation:
        "Mental accounting makes lump-sum money feel different from regular paycheck money, even though it spends the same — the other choices are real tax terms, but they don't name this behavioral bias.",
    },
    {
      id: "q8",
      question: "A classmate insists: 'My gig app deposit was way bigger than my W-2 paycheck for the same hours, so gig work obviously pays more.' What's the best response?",
      choices: [
            "Treat “Explain that gig income isn't counted as real income at all” as a distractor: close in topic, incorrect for the required answer",
            "Explain that W-2 paychecks are required by law to be smaller than gig deposits” belongs to a different situation than the one in the question stem",
            "“Agree — a bigger deposit for the same hours always means higher real pay” describes a different situation than the one in the question stem",
            "Point out that the gig deposit likely had little or no withholding, so a fair comparison must account for eventual tax responsibility",
          ],
      correctIndex: 3,
      explanation:
        "Comparing pay fairly requires accounting for withholding differences, not just which number looks bigger today — the deposit size alone doesn't settle which job actually paid more.",
    },
  ],
  reflection: {
    prompt:
      "Look at (or imagine) a first paycheck from a part-time job. What line items would you expect between gross and net, and what is one question you would ask a trusted adult or payroll contact?",
    placeholder:
      "Example: I'd expect federal/state withholding and other payroll lines. I'd ask how to get copies of my W-2 and whether I need to file…",
  },
};
