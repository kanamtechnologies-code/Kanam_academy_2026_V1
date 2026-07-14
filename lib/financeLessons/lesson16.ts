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
    durationLabel: "~25–30 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-16.png",
        imageAlt: "Capstone desk: calendar for first year after high school, budget notebook, and a checklist titled Money plan",
        body: `This is your **Financial Literacy capstone**. You'll turn the whole track into one usable plan for your **first year after high school** — not a 30-year retirement fantasy, but a Money Planner blueprint you could actually run.\n\nHere's the roadmap:\n\n• **Jordan's scenario** — the first-year situation you'll build a plan around.\n• **Earning & spending**, **saving & investing**, and **credit & risk** — the six Jump$tart pillars grouped into three concepts, each with a quick check.\n• A **worked example** building Jordan's actual numbers, a common **myth**, and a **try-it** practice round.\n• A **deeper skill** (stress-testing a plan against a shock), a **college-path vs work-path comparison**, and a **behavioral trap** to avoid.\n• **Habits**, how this connects to national money standards, a reflection pause, a second **mini-case**, and a mixed **check yourself**.\n\nBy the end, you should sound like someone who owns their next year of money decisions.`,
        callout: {
          label: "Why it matters",
          text: "Knowledge without a plan fades. A one-page plan with dates and amounts becomes a habit system — especially when life gets busier after graduation.",
        },
      },
      {
        id: "hook-story",
        kicker: "True-ish story",
        title: "The spreadsheet Jordan never opened",
        body: `Jordan built a gorgeous budget spreadsheet the summer after graduation — color-coded tabs, formulas, the works. They opened it exactly twice: once to build it, once three months later to realize it was already useless because nothing matched their actual income anymore.\n\nMeanwhile, Jordan's roommate kept a plan on one sticky note stuck to the fridge: three numbers and a reminder to check it every payday. Messier-looking. Actually followed.\n\nThis lesson isn't about building the fanciest plan — it's about building one you'll actually run for twelve months. By the end, you'll help Jordan (and yourself) build that version.`,
        callout: {
          label: "Keep this in mind",
          text: "We'll build Jordan's real plan together in the worked example, and check in on how it's holding up in the mini-case near the end.",
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
        id: "concept-1",
        kicker: "Concept 1",
        title: "Pillar recap: Earning & Spending",
        body: `Two of the six Jump\$tart pillars, condensed:\n\n**Earning Income** — paychecks, gross vs net pay, W-2 vs 1099 work, taxes and filing awareness, and (for students) comparing college net price and aid.\n\n**Spending** — needs vs wants, tradeoffs, budgeting on net income, and using a decision framework (total cost, opportunity cost, cooling-off) for big purchases like phones, cars, or housing.\n\nFor Jordan, this means: know what actually lands in the bank each payday, and run every non-trivial purchase through the same framework before committing.`,
        callout: {
          label: "You can now",
          text: "Explain the gap between gross and net pay, and total up the real cost of a big purchase instead of trusting a monthly-payment headline.",
        },
        checkIn: {
          prompt: "Jordan has uneven job hours and wants a phone upgrade. What's the Earning & Spending move before signing anything?",
          choices: [
            "Finance the most expensive phone immediately based on the advertised monthly payment",
            "Budget from realistic net income and total the phone's full cost (device + plan + add-ons) before deciding",
            "Assume gross pay is what's actually available to spend",
            "Skip comparing options because motivation is enough",
          ],
          correctIndex: 1,
          explanation:
            "Earning & Spending synthesis: budget on net income, and total the real cost of a purchase rather than trusting a payment headline.",
        },
      },
      {
        id: "concept-2",
        kicker: "Concept 2",
        title: "Pillar recap: Saving, Investing & Emergency Funds",
        body: `**Saving** — goals with dollar amounts and dates, an emergency fund with a starter target (even $200–$500), and "pay yourself first" habits, ideally automated.\n\n**Investing** — treated as long-horizon education, not day trading. Compounding rewards consistency over time; short-term money stays safe and accessible, while any investing conversation is a long-game one.\n\nFor Jordan, this means: stabilize with an emergency cushion before chasing bigger goals, and keep "saving" and "investing" mentally separate — different money, different time horizons, different rules.`,
        callout: {
          label: "Common failure",
          text: "A perfect spreadsheet you never open. A simple plan you review weekly wins.",
        },
        checkIn: {
          prompt: "Jordan wants to start 'investing' with money they might need next month for rent. What's the Saving & Investing synthesis?",
          choices: [
            "Invest it all immediately since any growth is good growth",
            "Keep near-term, needed money safe and accessible; reserve investing conversations for genuinely long-horizon money after an emergency fund exists",
            "Skip an emergency fund entirely and go straight to investing",
            "Day-trade with rent money to grow it faster",
          ],
          correctIndex: 1,
          explanation:
            "Money needed soon belongs in safe, accessible savings. Investing is a long-horizon tool, and it follows a stable emergency-fund foundation.",
        },
      },
      {
        id: "concept-3",
        kicker: "Concept 3",
        title: "Pillar recap: Credit & Risk Management",
        body: `**Managing Credit** — if using a card (with family rules): spend only what you can pay, ideally in full, on time; keep utilization modest; watch statements for errors or fraud.\n\n**Risk Management** — insurance awareness (know what coverage you're on, ask deductible questions before claims), and scam/fraud defense (pause on urgency, verify on official channels, never send gift cards or one-time codes under pressure).\n\nFor Jordan, this means: credit is a tool that rewards discipline and punishes carelessness, and one bad week (a scam, an uninsured accident, a maxed card) can erase months of progress if there's no protection in place.`,
        callout: {
          label: "Defender view",
          text: "Protection (scams, insurance awareness, emergency cash) keeps one bad week from erasing months of progress.",
        },
        checkIn: {
          prompt: "A text tells Jordan to pay a fee with gift cards immediately to avoid losing an account. What's the Credit & Risk Management move?",
          choices: [
            "Buy the gift cards quickly to be safe",
            "Treat urgency + gift cards as a scam red flag, verify on an official channel, and tell a trusted adult",
            "Share a one-time verification code from the text",
            "Ignore it, since teens aren't scam targets",
          ],
          correctIndex: 1,
          explanation:
            "Urgency plus gift-card or code requests is a classic scam pattern — pause, verify independently, and involve a trusted adult.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Building Jordan's actual numbers",
        body: `Let's build a real first pass at Jordan's plan using realistic numbers.\n\n**Typical monthly net income (low-week baseline):** $650\n\n**Needs (rent share, food, transit, phone):** $420\n\n**Auto-save toward emergency fund (pay yourself first):** $50\n\n**Wants cap (social, small extras):** $130\n\n**Remaining buffer:** $650 − $420 − $50 − $130 = **$50** (a small cushion for uneven weeks)\n\n**Emergency fund milestone:** $50/month × 6 months = $300 toward the $200–$500 starter target.\n\n**Big-decision gate:** any purchase over $150 must pass the total-cost-plus-72-hour-wait test from Lesson 15 before Jordan commits.\n\nThe move here isn't memorizing Jordan's exact numbers — it's the habit: **start from realistic low-week income, assign every dollar a job, and leave a small buffer for the weeks that don't go as planned.**`,
        bullets: [
          "Start from a realistic low-week income baseline, not a best-case guess.",
          "Assign every dollar a job: needs, auto-save, wants, buffer.",
          "Set a concrete emergency fund milestone with a date attached.",
        ],
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "Three capstone myths worth busting now",
        body: `**Myth 1: "A good money plan means never spending on anything fun."**\nReality: the plan above has a real "wants" line. The goal is intentional spending with a buffer, not joyless deprivation.\n\n**Myth 2: "I need a side hustle or investing 'hack' to get ahead fast in year one."**\nReality: the track-wide synthesis — stable budget, emergency fund, careful credit, scam defense — protects and compounds slowly. There's no shortcut that replaces those fundamentals.\n\n**Myth 3: "Once I write the plan, I'm done."**\nReality: Jordan's spreadsheet from the hook story failed because it was never revisited. A plan without a review date is a document, not a system.`,
        callout: {
          label: "Ethics",
          text: "Your plan should be honest about income and obligations — no fake flex numbers, and no promises of guaranteed outcomes from any single tactic.",
        },
        checkIn: {
          prompt: "Which statement is the myth, not the reality?",
          choices: [
            "A workable money plan includes a real (even if small) 'wants' line",
            "A side hustle or investing trick can reliably replace the need for a budget and emergency fund",
            "Fundamentals like budgeting, emergency savings, and scam defense compound slowly but reliably",
            "A plan without a scheduled review date tends to be abandoned, like Jordan's spreadsheet",
          ],
          correctIndex: 1,
          explanation:
            "There's no reliable shortcut that replaces the core habits — budgeting, saving, credit discipline, and scam defense are the actual engine.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it",
        title: "Your turn: build a different first-year budget",
        body: `Here's **Alex's** situation: full-time entry job, low-week take-home of $2,100/month, needs (rent, food, transit, phone) of $1,400/month, and a goal to auto-save $150/month toward an emergency fund.\n\nBefore reading the answer below, try assigning the remaining dollars yourself: what's left for wants, and what's the buffer?`,
        callout: {
          label: "Check your work",
          text: "$2,100 − $1,400 (needs) − $150 (auto-save) = $550 remaining. Alex might set a wants cap around $400 and keep a $150 buffer — exact split is a personal call, but every dollar should have a named job, with something left over for uneven months.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Deeper skill",
        title: "Stress-testing your plan against a shock",
        image: "/images/lessons/fl-16-4.png",
        imageAlt: "Notebook labeled Plan B with a worst-case budget scenario sketched out next to a calendar",
        body: `A good plan survives contact with a bad week. Try this stress test on Jordan's numbers (or your own):\n\n**Shock 1 — Lost hours:** If take-home drops 30% for a month (uneven scheduling, illness), which line gets cut first — wants, auto-save, or needs? (Answer: wants first, then pause auto-save temporarily; needs and any emergency-fund balance already saved stay protected as long as possible.)\n\n**Shock 2 — Unexpected $200 expense:** Does the emergency fund milestone cover it, or does it wipe out months of progress? This is exactly why the milestone target exists.\n\n**Shock 3 — A scam attempt:** If a fraudulent charge or phishing attempt hits, does Jordan know the first three calls to make (bank/card issuer, a trusted adult, and possibly a police report for identity theft)?\n\nThe deeper skill: **a plan that only works in a perfect month isn't a real plan.** Building in a buffer and a "which line bends first" order turns a static budget into something resilient.`,
        bullets: [
          "Decide in advance which budget line bends first during a shock.",
          "Size your emergency fund milestone against realistic shock costs, not just a round number.",
          "Know your first three moves if a scam or fraud attempt happens.",
        ],
      },
      {
        id: "comparison",
        kicker: "Side-by-side",
        title: "College-path vs work-path first year — the comparison sheet",
        body: `Line them up on the same four questions:\n\n**Income pattern** — College path: often smaller, uneven part-time/campus income plus aid decisions. Work path: steadier full-time income, but no aid cushion.\n\n**Biggest new risk** — College path: loan decisions and comparing aid offers (Lesson 14). Work path: housing costs and lease commitments (Lesson 15).\n\n**Emergency fund pressure** — College path: often lower immediate pressure if living costs are partly covered by aid/family. Work path: often higher immediate pressure since rent and utilities are fully on you.\n\n**Shared core** — Both paths still need: a realistic budget, an emergency fund milestone, credit discipline, and scam defense. The pillars don't change — only the specific numbers and biggest risk do.\n\nWhichever path you're on (or a mix of both), the same 12-month plan structure applies — just with different line items.`,
        callout: {
          label: "Quick gut-check",
          text: "If your plan would fall apart when switched from 'college path' to 'work path,' it's too specific. The structure should flex; only the numbers should change.",
        },
      },
      {
        id: "behavioral-trap",
        kicker: "Behavioral trap",
        title: "First-year lifestyle creep",
        body: `**Lifestyle creep** is the slow habit of upgrading spending as soon as income rises or as soon as you're around new people spending more — a new streaming bundle here, a pricier lunch habit there, none of it feeling like "a big decision" in the moment. First-year independence is prime lifestyle-creep territory: new freedom, new social pressure, and no parent double-checking the bank app.\n\nMoney Planners interrupt the trap with one question every payday: **"Did any of my 'needs' or 'wants' spending quietly grow since last month — and did I decide that, or did it just happen?"** Catching creep early is far easier than reversing months of it.`,
        callout: {
          label: "Watch out",
          text: "Comparing your spending to roommates or classmates with different family support or income is a fast way to justify creep you didn't actually choose.",
        },
      },
      {
        id: "habits",
        kicker: "Deliverable",
        title: "The 12-month money plan template",
        image: "/images/lessons/fl-16-2.png",
        imageAlt: "12-month roadmap poster on a wall with quarterly money goals for a recent high school graduate",
        body: `Hand this structure to yourself (or a parent/sponsor):\n\n**1. Income reality** — typical monthly net; low-week plan.\n**2. Top 3 goals** — amounts + months.\n**3. Budget rules** — needs %, auto-save amount, wants cap.\n**4. Emergency fund milestones** — 3-month and 12-month targets, sized against a realistic shock.\n**5. Credit rules** — if any card/loan: pay-on-time covenant.\n**6. Big decisions gate** — phone/car/housing must pass total-cost + 72-hour wait.\n**7. Scam protocol** — no gift cards/codes under pressure; verify officially.\n**8. Learning calendar** — quarterly checkup: budget, goals, aid/tax deadlines if relevant.\n**9. Review dates** — first Sunday each month, checking for lifestyle creep too.\n\nShort beats perfect. A plan you follow beats a spreadsheet you never open.`,
        bullets: [
          "Name dollar amounts, not vibes.",
          "Schedule reviews so the plan doesn't rot — and use them to catch lifestyle creep.",
          "Update when income, goals, or your path (college/work) changes.",
        ],
        callout: {
          label: "Try this week",
          text: "Draft your own version of this nine-line template with real (even rough) numbers — the same structure you just used for Jordan.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Why this is on the checklist",
        title: "How this capstone connects to national money standards",
        body: `The **Jump\$tart Coalition** and **Council for Economic Education** publish six core pillars of personal financial education: **Earning Income, Spending, Saving, Managing Credit, Investing,** and **Risk Management.** This capstone is designed to touch all six at once, the way real life does — nobody's first year is neatly divided into six separate chapters.\n\nSpecifically, you just practiced:\n\n• Earning and spending together in a realistic monthly budget.\n• Saving and investing kept on separate timelines with separate rules.\n• Credit discipline and risk management as protection, not paperwork.\n• Stress-testing and comparison thinking — applying a structure across different life paths.\n\nThis is the "can this student run their own finances for a full year" checkpoint the whole track has been building toward.`,
        callout: {
          label: "Good to know",
          text: "If your class or state references financial literacy standards, this capstone is designed to map to all six Jump$tart pillars in a single applied project.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Take a minute before the next section. You don't need to write your full plan yet — that comes at the end — but think through this:\n\n*Of the six pillars (earning, spending, saving, credit, investing, risk), which one feels shakiest for you right now? What's one specific action from this track you could take in your first month of independence to strengthen it?*\n\nHolding a concrete answer to that question is the real goal of this capstone.`,
      },
      {
        id: "mini-case",
        kicker: "Mini-case",
        title: "Jordan's plan, three months in",
        image: "/images/lessons/fl-16-5.png",
        imageAlt: "Sticky note budget on a fridge next to a phone showing a banking app, three months into a plan",
        body: `Three months into running the plan from the worked example, Jordan checks in on their first Sunday review:\n\n• Emergency fund: $150 saved toward the $300 six-month milestone — on track.\n• One month had lost hours (a 30% income drop) — Jordan paused the wants cap that month instead of touching the emergency fund, exactly as the stress test suggested.\n• A friend group started a pricier weekly hangout habit, and Jordan's "wants" spending has crept up by about $40/month without a clear decision to raise it.\n• A text claiming to be from Jordan's bank asked for a one-time code "to verify a suspicious login."\n\nWhich of these four things should Jordan flag as a genuine problem to fix immediately, versus a sign the plan is actually working?`,
        checkIn: {
          prompt: "What's the Money Planner read on Jordan's three-month check-in?",
          choices: [
            "Everything is fine — no action needed on any of the four items",
            "The stress-tested response to lost income and the emergency fund progress are working well; the creeping 'wants' spending needs a conscious decision, and the bank text should be treated as a likely scam and never given a code",
            "Jordan should give the bank text the code immediately since it claims to be about security",
            "Jordan should abandon the plan since one month had a income drop",
          ],
          correctIndex: 1,
          explanation:
            "Two items show the plan working as designed; the drifting wants spending needs a deliberate check against lifestyle creep; the text matches classic scam patterns and should never get a one-time code.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Mixed review: pulling the whole track together",
        body: `One more check before the full knowledge check — this one mixes ideas from across the entire Financial Literacy track, the way a real first year would.`,
        checkIn: {
          prompt: "Which 12-month plan element best shows genuine synthesis of all six Jump$tart pillars?",
          choices: [
            "Only listing a dream income with no actions",
            "Goals with amounts, budget/auto-save rules, emergency milestones, credit/scam/decision gates, and monthly review dates that catch lifestyle creep",
            "A promise to get rich by next summer with no risk",
            "Skipping taxes/aid awareness because those are 'adult only'",
          ],
          correctIndex: 1,
          explanation:
            "A genuine capstone plan ties earning, spending, saving, credit, investing awareness, and risk management into one living, reviewed document.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn — build the year",
        body: `You've walked the full money path. Capstone recap:\n\n• Synthesize **earning, spending, saving, investing, credit, and risk management** into one plan — the same six pillars, applied to your actual first year.\n• Favor a few high-impact rules with review dates, and stress-test the plan against a bad month before you need it.\n• Watch for lifestyle creep, and treat urgency-plus-money-request texts as scams by default.\n\nComplete the **Knowledge check** (it mixes ideas across the track), then write your **first-year money plan** in the reflection. You've earned the **Money Planner** finish line — go show the synthesis.`,
      },
    ],
  },
  bigIdeas: [
    "Capstone money skill is **synthesis**: a short 12-month plan with goals, budget rules, and review dates that flexes across a college path or a work path.",
    "Stability stack first — **emergency fund + budget + scam defense** — then growth, with a stress test against a bad month before you need it.",
    "Credit, investing, insurance, taxes, and aid literacy all support the same aim: options and resilience, not get-rich hype or lifestyle creep.",
  ],
  keyTerms: [
    { term: "Money plan", definition: "A short, dated set of goals, budget rules, protections, and review habits." },
    { term: "Emergency fund", definition: "Savings set aside for unexpected necessary expenses." },
    { term: "Pay yourself first", definition: "Saving a planned amount before discretionary spending." },
    { term: "Net price", definition: "College/program cost after gift aid — used when comparing offers." },
    { term: "Total cost of ownership", definition: "Purchase price plus ongoing costs for big items like phones, cars, housing." },
    { term: "Risk transfer", definition: "Using insurance to share certain large financial risks for a premium." },
    { term: "Diversification", definition: "Spreading investments to reduce single-asset risk (does not remove all risk)." },
    { term: "Lifestyle creep", definition: "Spending that gradually rises with income or social pressure without a deliberate decision." },
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
        "Track integration from the college-costs lesson: separate gift aid from borrowing.",
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
        "Consumer-defense skills from earlier lessons: pause, verify, don't pay under panic scripts.",
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
    {
      id: "q6",
      question: "Jordan's plan loses 30% of income for one month. Per the stress-test skill, what should bend first?",
      choices: [
        "The emergency fund balance already saved, spent down to zero immediately",
        "The wants cap first, with auto-save paused temporarily if needed, while protecting needs and existing savings as long as possible",
        "Nothing — the plan should stay exactly the same regardless of income shocks",
        "Needs spending, cut before anything else",
      ],
      correctIndex: 1,
      explanation:
        "A resilient plan bends discretionary spending first and protects needs and existing emergency savings as long as possible.",
    },
    {
      id: "q7",
      question: "What is lifestyle creep?",
      choices: [
        "A required annual budget review",
        "Spending that gradually rises with income or social pressure without a deliberate decision to raise it",
        "A type of scam targeting new apartment renters",
        "A rule that says spending must never increase",
      ],
      correctIndex: 1,
      explanation:
        "Lifestyle creep is the slow, often unnoticed rise in spending — especially common in a first year of new independence and new social circles.",
    },
    {
      id: "q8",
      question: "Comparing a college-path first year to a work-path first year, what stays the same across both?",
      choices: [
        "Nothing — the two paths require completely different financial skills",
        "The core structure: a realistic budget, an emergency fund milestone, credit discipline, and scam defense — only the specific numbers and biggest risk differ",
        "Only the work path needs an emergency fund",
        "Only the college path needs to worry about scams",
      ],
      correctIndex: 1,
      explanation:
        "The six-pillar structure applies to any first-year path; the line items and biggest risks shift, but the core plan does not change.",
    },
  ],
  reflection: {
    prompt:
      "Write your first-year-after-high-school money plan (or Jordan's). Include: top goals with amounts, budget/auto-save rules, emergency fund milestones, credit/scam/decision rules, and when you'll review each month.",
    placeholder:
      "Example: Goals — $400 emergency by December; $150 activity fund by June. Auto-save $20 on each payday. Scam rule — no codes/gift cards under pressure. Car/phone — 72-hour wait + total cost sheet. Review — first Sunday…",
  },
};
