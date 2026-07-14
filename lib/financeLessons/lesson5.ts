import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson5: AILessonConfig = {
  id: "fl-5",
  title: "5. Build a Budget That Works",
  goal: "Build a simple budget with clear categories, try 50/30/20 as one model (not the only one), and understand zero-based budgeting in plain English.",
  xpReward: 250,
  badge: "Budget Builder",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/4",
  nextHref: "/learn/finance/6",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-5.png",
        imageAlt: "High school student budgeting on a laptop spreadsheet with a phone calculator and receipts nearby",
        body: `A **budget** is not a punishment spreadsheet. It's a plan for your money that matches your income to your priorities — needs, goals, and some wants — before the month (or pay period) spends itself.\n\nHere's our roadmap:\n\n• **What a budget is** — a plan, not a personality test.\n• **Categories that fit teen life** — income, needs, wants, goals.\n• **50/30/20** — one popular model, not a law of nature.\n• **Zero-based budgeting** — give every dollar a job, worked in real numbers.\n• **Myths, traps, and habits** — what breaks budgets and how pros recover.\n• **A mini case study** you'll solve yourself before the knowledge check.\n\nYou'll leave with a structure you can actually use with irregular teen income.`,
        callout: {
          label: "Why it matters",
          text: "Without a plan, money leaks into whatever is loudest (apps, friends, sales). A budget makes your goals loud enough to compete.",
        },
      },
      {
        id: "hook-story",
        kicker: "True-to-life",
        title: "Jordan's $60 mystery",
        body: `Jordan works weekends at a smoothie shop and brings home about **$240** every two weeks. Two weeks ago, Jordan swore they'd save $50 toward a car. Payday came again — and the savings account had **$0** in it.\n\nJordan wasn't reckless. There was gas, a couple of fast-food runs with friends, a phone case that cracked, and a last-minute concert ticket. Nothing felt like a big purchase in the moment. Added up, it was everything.\n\nHere's the part that matters: Jordan didn't have a *spending problem* so much as a **planning gap**. Every dollar had somewhere to go — it just wasn't Jordan who decided where.\n\nBy the end of this lesson, you'll build the tool Jordan was missing: a plan that decides where money goes **before** payday, not after.`,
        callout: {
          label: "Keep this in mind",
          text: "Almost nobody plans to overspend. Budgets fail quietly, one \"it's just $6\" decision at a time — which is exactly why a plan beats vibes.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `• A **budget** is a plan for how you will use income over a period of time.\n• A **category** is a bucket for similar spending (food, transport, fun, saving).\n• **Fixed expenses** stay about the same each period (phone plan).\n• **Variable expenses** change (gas, eating out with friends).\n• **Net income** is what actually lands in your account after taxes/deductions — the number budgets should start from.\n• **Irregular income** doesn't arrive in equal amounts each period (tips, seasonal hours, gig work).\n• The **50/30/20 rule** is a guideline that suggests roughly 50% needs, 30% wants, 20% saving/debt goals — one model among many.\n• **Zero-based budgeting** means giving every dollar of income a job so income minus planned uses equals zero.\n\nBudgets can be weekly if you get paid weekly — match the plan to your pay rhythm.`,
        callout: {
          label: "Pro tip",
          text: "Start ugly and simple. A rough budget you use beats a perfect template you abandon.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea #1",
        title: "A budget tells your money where to go",
        image: "/images/lessons/fl-5-2.png",
        imageAlt: "Notebook open to a simple monthly teen budget with Save, Needs, and Wants categories — no religious labels",
        body: `Think of a budget as a game plan for your paycheck. You still play the game (life happens), but you're not improvising every purchase.\n\nBasic flow:\n\n**1. List net income** for the period (use take-home pay).\n**2. List needs** you must cover.\n**3. Set goal contributions** (savings, sinking funds — next lesson).\n**4. Plan wants** with what's left.\n**5. Track and adjust** when reality disagrees.\n\nIf income is irregular (babysitting, seasonal hours), budget from a **conservative estimate** or average of recent pay — not your best week ever.`,
        bullets: [
          "Budget from **net** income.",
          "Needs and goals before unlimited wants.",
          "Adjust — don't abandon — when weeks differ.",
        ],
        callout: {
          label: "Watch out",
          text: "A budget that allows $0 for any fun often fails. Include small planned wants so the plan survives real life.",
        },
        checkIn: {
          prompt: "Which income number should most budgets start from?",
          choices: [
            "Gross pay before deductions",
            "Net (take-home) pay",
            "Your friend's income",
            "The largest paycheck you hope to get someday",
          ],
          correctIndex: 1,
          explanation:
            "Net pay is what you can actually use. Gross overestimates spendable money.",
        },
      },
      {
        id: "concept-2",
        kicker: "The big idea #2",
        title: "Categories that fit high school life",
        body: `You don't need 40 categories. Try a starter set:\n\n• **Income** — jobs, allowance, gifts (note which are one-time).\n• **Needs / must-pays** — gas, required phone, work clothes, sports fees you cover.\n• **Food** — lunches, groceries you buy (split need vs. want extras if helpful).\n• **Goals / saving** — car, prom, emergency starter, college fund.\n• **Fun / wants** — movies, gaming, non-essential shopping.\n• **Giving** — optional but meaningful for some students.\n\nWrite estimated amounts for one pay period. If a category always blows up, that's data — raise the estimate or change the habit, don't pretend.`,
        callout: {
          label: "Why it matters",
          text: "Categories turn \"I have no idea where it went\" into \"fun ran $40 over — next period I'll trim or earn more.\"",
        },
        checkIn: {
          prompt: "A concert ticket you bought purely for fun belongs in which category?",
          choices: [
            "Needs / must-pays",
            "Fun / wants",
            "Goals / saving",
            "It shouldn't be categorized at all",
          ],
          correctIndex: 1,
          explanation:
            "Concert tickets are enjoyable but not required — they belong in wants, planned with money left after needs and goals.",
        },
      },
      {
        id: "concept-3",
        kicker: "The big idea #3",
        title: "50/30/20 — useful, not sacred",
        image: "/images/lessons/fl-5-3.png",
        imageAlt: "Bright pie chart infographic labeled 50 needs, 30 wants, 20 save for a teen budget",
        body: `The **50/30/20** guideline suggests (after tax / from take-home):\n\n• ~**50% needs**\n• ~**30% wants**\n• ~**20% savings and debt payoff**\n\nFor teens, the percentages may not fit — you might have fewer bills (so \"needs\" % looks low) or be saving hard for a car (so \"saving\" % looks high). **That is okay.**\n\nUse 50/30/20 as a conversation starter:\n\n• Am I accidentally spending wants-level money before needs and goals?\n• Is my saving % basically zero every month?\n\nOther valid models: \"pay yourself first\" (save a set amount immediately), priority-based lists, or envelope-style cash/app buckets. The winning budget is the one you'll follow.`,
        bullets: [
          "50/30/20 = one framework, not the only framework.",
          "Teen life may need different percentages.",
          "Direction matters more than perfect ratios.",
        ],
        callout: {
          label: "Watch out",
          text: "Don't shame yourself for not matching a viral percentage chart. Adapt the tool to your income and responsibilities.",
        },
        checkIn: {
          prompt: "A student has almost no bills but saves 60% of every paycheck for a car. What does this suggest?",
          choices: [
            "They are budgeting incorrectly and must switch to exactly 50/30/20",
            "Their situation has different needs than the guideline assumes, so a different split can still be healthy",
            "Saving is bad and should be reduced to 20%",
            "50/30/20 is illegal for minors",
          ],
          correctIndex: 1,
          explanation:
            "50/30/20 is a starting guideline. Lower bills and an aggressive goal can justify a very different — still healthy — split.",
        },
      },
      {
        id: "worked-example",
        kicker: "Let's do the math",
        title: "Zero-based budgeting — a worked example",
        body: `**Zero-based** does not mean you end with $0 in the bank. It means on paper:\n\n**Income − (all planned categories) = 0**\n\nEvery dollar gets a job: gas, food, saving, fun, buffer. Money left \"unassigned\" tends to disappear. Giving it a job on purpose — even to \"misc buffer\" — is the skill.\n\nExample with $200 net from a part-time job:\n• $60 gas/transport\n• $40 food\n• $50 car fund\n• $30 fun\n• $20 buffer\n= $200 → zero left unassigned.\n\nIf a surprise expense hits, you move money between jobs (usually from buffer or fun), not pretend math doesn't matter.`,
        callout: {
          label: "Pro tip",
          text: "A \"buffer\" category is allowed and smart. Zero-based planning can include intentional flexibility.",
        },
        checkIn: {
          prompt: "In zero-based budgeting, what does \"every dollar gets a job\" mean?",
          choices: [
            "You must end the month with literally $0 in every account",
            "On paper, you assign all income to categories until nothing is left unplanned",
            "You can never have a buffer category",
            "You only use cash envelopes forever",
          ],
          correctIndex: 1,
          explanation:
            "Zero-based means planned assignments equal income. A buffer can be one of those jobs; bank balances can remain.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth check",
        title: "Budgeting myths — cleared up",
        body: `• **Myth:** \"Budgeting means no fun, ever.\" **Reality:** A good budget *plans* fun money — it just decides the amount on purpose instead of by accident.\n• **Myth:** \"If I go over in one category, the whole budget failed.\" **Reality:** One category running hot is feedback, not failure. Adjust and keep going.\n• **Myth:** \"I need a fancy app or spreadsheet to budget.\" **Reality:** Paper, notes app, or the back of a receipt works. The habit matters more than the tool.\n• **Myth:** \"Budgeting is only for people who don't have enough money.\" **Reality:** People at every income level use budgets — it's how many stay ahead instead of catching up.\n• **Myth:** \"50/30/20 is a rule I must hit exactly.\" **Reality:** It's a guideline. Your categories and percentages can differ and still be a strong budget.\n\nBudget Builders separate the *idea* of budgeting from a viral chart that doesn't fit their life.`,
        callout: {
          label: "Watch out",
          text: "The biggest myth of all: \"I'll start budgeting once I have more money.\" Budgets help most precisely when money is tight.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Build a one-period budget right now",
        body: `Grab a notes app, paper, or the back of a receipt. Walk through it:\n\n**1. Write your net income** for the next pay period (or estimate it if pay varies).\n**2. List 2–3 needs** and their amounts.\n**3. List 1–2 goals** (savings, sinking fund) and amounts.\n**4. List 1–2 wants** and amounts.\n**5. Add it all up.** Does it match your income? If not, adjust a category — don't just hope.\n\nThis rough draft is your **first real budget**. It doesn't need to be perfect; it needs to exist.`,
        callout: {
          label: "Try this now",
          text: "Actually write the five numbers down before you continue. A budget in your head isn't a budget — it's a guess.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Go deeper",
        title: "Leveling up: buffers, true expenses, and rollover",
        image: "/images/lessons/fl-5-4.png",
        imageAlt: "Close-up of a handwritten zero-based budget ledger showing every dollar of income assigned to a labeled category, ending at zero unassigned",
        body: `Once basic zero-based budgeting feels normal, three upgrades make it sturdier:\n\n**Buffers with a purpose.** Instead of one vague \"misc\" bucket, try a small **true buffer** (unexpected small costs) separate from your fun money, so a flat tire doesn't quietly eat your movie budget.\n\n**True expenses.** Some costs aren't monthly but are 100% predictable — car registration, a yearly club fee, holiday gifts. A \"true expense\" is money you set aside *before* the bill shows up, even though the bill itself is once a year. (You'll go deeper on this with sinking funds next lesson.)\n\n**Rollover, on purpose.** If a category has money left at period's end, decide on purpose: roll it to the same category next period, or move it to a goal. Silent rollover into \"whatever\" is how buffers quietly disappear.\n\nThese upgrades turn a one-time budget into a **system** that survives months, not just one paycheck.`,
        bullets: [
          "Separate true buffers from fun money.",
          "Pre-fund predictable-but-infrequent costs.",
          "Decide where leftover money goes — don't let it vanish.",
        ],
        callout: {
          label: "Pro tip",
          text: "If the same \"surprise\" keeps happening every few months, it's not a surprise anymore — turn it into a true expense.",
        },
      },
      {
        id: "comparison",
        kicker: "Compare your options",
        title: "50/30/20 vs. zero-based vs. pay-yourself-first",
        image: "/images/lessons/fl-5-5.png",
        imageAlt: "Side-by-side comparison graphic of three teen budgeting methods labeled 50/30/20, zero-based, and pay-yourself-first",
        body: `No single method wins for everyone. Compare them honestly:\n\n**50/30/20**\n• Best for: quick structure with minimal setup.\n• Watch for: percentages that don't fit low-bill teen life.\n\n**Zero-based**\n• Best for: tight or irregular income where every dollar needs a plan.\n• Watch for: more setup time each period; easy to abandon if too detailed.\n\n**Pay-yourself-first**\n• Best for: people whose top goal (car, college) needs protecting from daily spending.\n• Watch for: needs must still get covered — saving first doesn't mean ignoring must-pays.\n\nMany people **blend** methods: pay yourself first for one goal, then rough 50/30/20 thinking for the rest, tracked zero-based when money is especially tight.`,
        bullets: [
          "Pick the method you'll actually repeat, not the \"best\" one on paper.",
          "You can mix methods across categories.",
          "Revisit your choice if your income or goals change.",
        ],
      },
      {
        id: "behavioral-trap",
        kicker: "Watch your brain",
        title: "Lifestyle creep and the \"I deserve it\" trap",
        body: `**Lifestyle creep** is when spending quietly rises to match a raise or extra shift — so more income never turns into more saving. A $2/hour raise can vanish into slightly nicer everyday choices without you ever deciding that on purpose.\n\nMarketing often supplies the trigger: \"treat yourself,\" \"you deserve this,\" limited-time framing designed to make a want feel urgent and earned. None of that is evil — but it's designed to bypass your budget, not respect it.\n\nCounter-moves:\n\n• When income rises, **decide on purpose** how much goes to goals before lifestyle absorbs it.\n• Notice \"I deserve it\" language and ask: *did I plan this, or did an ad plan it for me?*\n• A planned treat inside your wants category is totally fine — it's the **unplanned, guilt-driven** version that quietly wrecks a budget.`,
        callout: {
          label: "Watch out",
          text: "\"I deserve it\" isn't the problem — deciding it *without a plan*, every time, is.",
        },
      },
      {
        id: "habits",
        kicker: "Make it routine",
        title: "The weekly money check-in habit",
        body: `Budgets fail for normal reasons: hours got cut, a tire went flat, a birthday week happened. Failure is feedback.\n\nRepair steps:\n\n**1. Don't quit** — update the plan mid-period.\n**2. Protect must-pays and minimum goal deposits if you can.**\n**3. Cut or pause wants temporarily.**\n**4. Note the surprise** — should it become a true expense or sinking fund next lesson?\n**5. Recalculate next period** with better estimates.\n\n**Stay on track between paydays:** Do a quick **weekly check-in** — did spending match the plan? Track **due dates on must-pays** (phone bill, car insurance, club fees) so nothing sneaks up mid-month.\n\nProgress is \"closer than last month,\" not \"perfect every week.\"`,
        callout: {
          label: "Try this week",
          text: "Set a 5-minute recurring reminder on payday: check your budget, note one leak, adjust one number.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Why this counts",
        title: "How this connects to national standards",
        body: `This lesson builds skills from the **Jump$tart Coalition / CEE (Council for Economic Education) 2021 National Standards for Personal Finance Education**, specifically the **Spending** domain.\n\nBy the end of this lesson, you're practicing standards-aligned skills such as:\n\n• Creating a **spending plan** that reflects income, needs, wants, and goals.\n• Comparing **budgeting strategies** (like 50/30/20 versus zero-based) and evaluating trade-offs.\n• Explaining how a plan must **adapt** when income or expenses change.\n\nThese aren't just classroom checkboxes — they're the exact reasoning skills adults use when they build household budgets, apply for loans, or plan for a big purchase. You're getting the practice now.`,
        callout: {
          label: "Good to know",
          text: "Standards-aligned doesn't mean stiff. The goal is the same real-world skill your teacher and this app are both aiming at: a plan you'll actually use.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Take 30 seconds — you don't have to write anything down yet (you'll get a chance at the end of the lesson).\n\nThink about the **last time** you spent money without really deciding to. What category would that purchase have landed in if you'd had a budget running? Needs? Wants? Would a buffer have caught it — or was it something bigger?\n\nHolding a real memory in mind (instead of a hypothetical) makes the categories from this lesson stick a lot better than theory alone.`,
        callout: {
          label: "Why this matters",
          text: "Connecting new ideas to a real memory is one of the most effective ways to actually remember them later.",
        },
      },
      {
        id: "mini-case",
        kicker: "Case study",
        title: "Deja's paycheck decision",
        body: `Deja just got a **$260** paycheck from her part-time retail job. She has these plans already in mind:\n\n• Phone bill (need): **$45**\n• Gas to get to work (need): **$50**\n• Saving for a laptop (goal): **$60**\n• Movies and food with friends (want): **$70**\n• Left unassigned so far: **$35**\n\nA friend texts about a spontaneous weekend trip that would cost about **$60** more than Deja planned to spend on fun this period.`,
        checkIn: {
          prompt: "Using zero-based thinking, what's Deja's smartest first move with that unassigned $35 and the trip request?",
          choices: [
            "Ignore the $35 and put the full $60 trip cost on a BNPL plan without checking anything else",
            "Assign the $35 a job first (e.g., add to the trip or the laptop goal), then decide if the remaining trip gap fits without cutting needs or the full goal amount",
            "Take the $60 goal contribution and spend all of it on the trip instead",
            "Skip the phone bill this period to fund the trip",
          ],
          correctIndex: 1,
          explanation:
            "Zero-based thinking means giving every dollar — including the unassigned $35 — a job on purpose, then checking whether a want fits without abandoning needs or shrinking a goal to zero.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Could you explain this to a friend?",
        body: `Before the graded knowledge check, see if you can explain these out loud (to yourself, a friend, or a notes app) in one or two sentences each:\n\n• What a budget actually is, in your own words.\n• Why 50/30/20 is a guideline and not a law.\n• What \"every dollar gets a job\" means in zero-based budgeting.\n• One myth about budgeting you now know is false.\n\nIf any of those feel shaky, scroll back to that section — it's faster now than during the quiz.`,
        checkIn: {
          prompt: "Which statement best summarizes this whole lesson's core idea?",
          choices: [
            "There is exactly one correct budgeting percentage split for every person",
            "A budget is a flexible plan that assigns income on purpose, using a model that fits your real life, then adjusts when life changes",
            "Budgets are only useful once you have a high income",
            "Zero-based budgeting means never having any money left in your bank account",
          ],
          correctIndex: 1,
          explanation:
            "The throughline of this lesson: plan on purpose, pick a model that fits you, and adjust instead of abandoning the plan.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• A **budget** is a plan for income across categories — needs, goals, wants.\n• **50/30/20** is one helpful model, not the only correct split.\n• **Zero-based** means every dollar gets a job on paper — including buffers and true expenses.\n• Match your budget to **net pay** and your pay schedule.\n• Watch for **lifestyle creep** and unplanned \"I deserve it\" spending.\n• When life breaks the plan, adjust — don't abandon.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on a budget split you'd actually try.`,
      },
    ],
  },
  bigIdeas: [
    "A **budget** is a plan that assigns income to categories before money disappears.",
    "**50/30/20** is one useful model for needs/wants/saving — not the only valid approach.",
    "**Zero-based** budgeting gives every dollar a job so income minus plans equals zero on paper.",
    "**Buffers and true expenses** make a budget sturdy enough to survive surprises without falling apart.",
    "**Lifestyle creep** quietly absorbs raises into spending unless you decide on purpose where new income goes.",
  ],
  keyTerms: [
    { term: "Budget", definition: "A plan for how you will use income over a set period of time." },
    { term: "Category", definition: "A spending or saving bucket, such as transport, food, fun, or goals." },
    { term: "Fixed expense", definition: "A cost that stays about the same each period." },
    { term: "Variable expense", definition: "A cost that changes from period to period." },
    { term: "Net income", definition: "The take-home amount left after taxes and deductions — the number budgets should start from." },
    { term: "Irregular income", definition: "Income that doesn't arrive in equal amounts each period, such as tips or gig work." },
    { term: "50/30/20 rule", definition: "A guideline suggesting about 50% needs, 30% wants, and 20% saving/debt goals." },
    { term: "Zero-based budgeting", definition: "Assigning every dollar of income a job until planned uses equal income." },
    { term: "Buffer", definition: "Money set aside for small surprises inside your budget plan." },
    { term: "True expense", definition: "A predictable but infrequent cost, like yearly registration fees, funded gradually ahead of time." },
    { term: "Lifestyle creep", definition: "Spending that quietly rises to match a raise or extra income, absorbing money that could have gone to goals." },
  ],
  realWorld:
    "A student with $180 net who \"wings it\" may fund fun first and scramble for gas. A simple plan that assigns gas and a $20 savings job first still leaves room for planned fun — with less stress.",
  quiz: [
    {
      id: "q1",
      question: "What is a budget?",
      choices: [
        "A rule that bans all spending on wants",
        "A plan for how you will use income over a period of time",
        "A loan from a bank",
        "Your credit score",
      ],
      correctIndex: 1,
      explanation:
        "A budget is a spending-and-saving plan tied to a time period and your income.",
    },
    {
      id: "q2",
      question: "Malik has few bills but is saving hard for a car, so his 'saving' percentage is much higher than 20%. Is his budget wrong?",
      choices: [
        "Yes, he must match 50/30/20 exactly or the budget doesn't count",
        "No — 50/30/20 is a guideline, and his situation and goals justify a different, still healthy split",
        "Yes, because saving more than 20% is never allowed",
        "No, but only if he stops paying for needs entirely",
      ],
      correctIndex: 1,
      explanation:
        "50/30/20 is one framework. Real situations, like fewer bills and an aggressive savings goal, often need different splits.",
    },
    {
      id: "q3",
      question: "In zero-based budgeting, what does \"every dollar gets a job\" mean?",
      choices: [
        "You must end the month with literally $0 in every account",
        "On paper, you assign all income to categories until nothing is left unplanned",
        "You can never have a buffer",
        "You only use cash envelopes forever",
      ],
      correctIndex: 1,
      explanation:
        "Zero-based means planned assignments equal income. A buffer can be one of those jobs; bank balances can remain.",
    },
    {
      id: "q4",
      question: "Priya's paycheck stub shows $310 in gross pay and $265 after taxes. Which number should her budget start from?",
      choices: [
        "$310, the gross pay",
        "$265, the net (take-home) pay",
        "Whichever number is larger",
        "Neither — budgets shouldn't use paycheck numbers",
      ],
      correctIndex: 1,
      explanation:
        "Net pay is what she can actually spend. Starting from gross pay overestimates spendable money.",
    },
    {
      id: "q5",
      question: "Your hours got cut and your budget no longer works. What is a healthy response?",
      choices: [
        "Delete the budget forever",
        "Adjust categories, protect must-pays when possible, and revise next period",
        "Ignore the numbers and hope",
        "Only use 50/30/20 forever with no changes",
      ],
      correctIndex: 1,
      explanation:
        "Budgets are living plans. Adjusting beats abandoning.",
    },
    {
      id: "q6",
      question: "A student gets a $1.50/hour raise but, six months later, has nothing extra saved and can't explain why. What most likely happened?",
      choices: [
        "The raise was too small to matter at all",
        "Lifestyle creep — spending quietly rose to absorb the extra income before it was assigned a goal",
        "50/30/20 caused the problem",
        "Zero-based budgeting always causes this",
      ],
      correctIndex: 1,
      explanation:
        "Without deciding on purpose, extra income often gets absorbed into slightly higher everyday spending — that's lifestyle creep.",
    },
    {
      id: "q7",
      question: "Which statement about budgeting myths is most accurate?",
      choices: [
        "A budget that allows zero dollars for fun is the healthiest kind",
        "Overspending in one category one time means the whole budget has failed permanently",
        "A budget can include a planned amount for fun — that's a feature, not a flaw",
        "You must use an expensive app for a budget to count",
      ],
      correctIndex: 2,
      explanation:
        "Good budgets plan for some wants on purpose. Tools don't matter as much as the habit, and one rough category isn't total failure.",
    },
    {
      id: "q8",
      question: "Deja has $35 left unassigned this period. Following zero-based thinking, what should she do?",
      choices: [
        "Leave it unassigned — it will sort itself out",
        "Give it a specific job, such as adding it to a goal or a buffer, so it doesn't quietly disappear",
        "Automatically spend it on the first want she sees",
        "Only assign leftover money if it's more than $100",
      ],
      correctIndex: 1,
      explanation:
        "Unassigned money tends to vanish. Zero-based budgeting means giving even small leftover amounts an intentional job.",
    },
  ],
  reflection: {
    prompt:
      "Draft a simple one-period budget: your estimated net income and 4–6 categories with dollar amounts that add up. Which category is hardest to estimate?",
    placeholder: "Example: $200 net — $50 gas, $40 food, $40 savings, $40 fun, $30 buffer. Food is hardest…",
  },
};
