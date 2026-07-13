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
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-5.png",
        imageAlt: "High school student budgeting on a laptop spreadsheet with a phone calculator and receipts nearby",
        body: `A **budget** is not a punishment spreadsheet. It's a plan for your money that matches your income to your priorities — needs, goals, and some wants — before the month (or pay period) spends itself.\n\nHere's our roadmap:\n\n• **What a budget is** — a plan, not a personality test.\n• **Categories that fit teen life** — income, needs, wants, goals.\n• **50/30/20** — one popular model, not a law of nature.\n• **Zero-based idea** — give every dollar a job.\n• **When budgets break** — and how to adjust without quitting.\n\nYou'll leave with a structure you can actually use with irregular teen income.`,
        callout: {
          label: "Why it matters",
          text: "Without a plan, money leaks into whatever is loudest (apps, friends, sales). A budget makes your goals loud enough to compete.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `• A **budget** is a plan for how you will use income over a period of time.\n• A **category** is a bucket for similar spending (food, transport, fun, saving).\n• **Fixed expenses** stay about the same each period (phone plan).\n• **Variable expenses** change (gas, eating out with friends).\n• The **50/30/20 rule** is a guideline that suggests roughly 50% needs, 30% wants, 20% saving/debt goals — one model among many.\n• **Zero-based budgeting** means giving every dollar of income a job so income minus planned uses equals zero.\n\nBudgets can be weekly if you get paid weekly — match the plan to your pay rhythm.`,
        callout: {
          label: "Pro tip",
          text: "Start ugly and simple. A rough budget you use beats a perfect template you abandon.",
        },
      },
      {
        id: "budget-defined",
        kicker: "The big idea",
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
      },
      {
        id: "categories",
        kicker: "Buckets",
        title: "Categories that fit high school life",
        body: `You don't need 40 categories. Try a starter set:\n\n• **Income** — jobs, allowance, gifts (note which are one-time).\n• **Needs / must-pays** — gas, required phone, work clothes, sports fees you cover.\n• **Food** — lunches, groceries you buy (split need vs. want extras if helpful).\n• **Goals / saving** — car, prom, emergency starter, college fund.\n• **Fun / wants** — movies, gaming, non-essential shopping.\n• **Giving** — optional but meaningful for some students.\n\nWrite estimated amounts for one pay period. If a category always blows up, that's data — raise the estimate or change the habit, don't pretend.`,
        callout: {
          label: "Why it matters",
          text: "Categories turn \"I have no idea where it went\" into \"fun ran $40 over — next period I'll trim or earn more.\"",
        },
      },
      {
        id: "fifty-thirty-twenty",
        kicker: "One model",
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
      },
      {
        id: "zero-based",
        kicker: "Every dollar works",
        title: "Zero-based budgeting — simply",
        body: `**Zero-based** does not mean you end with $0 in the bank. It means on paper:\n\n**Income − (all planned categories) = 0**\n\nEvery dollar gets a job: gas, food, saving, fun, buffer. Money left \"unassigned\" tends to disappear. Giving it a job on purpose — even to \"misc buffer\" — is the skill.\n\nExample with $200 net from a part-time job:\n• $60 gas/transport\n• $40 food\n• $50 car fund\n• $30 fun\n• $20 buffer\n= $200 → zero left unassigned.\n\nIf a surprise expense hits, you move money between jobs (usually from buffer or fun), not pretend math doesn't matter.`,
        callout: {
          label: "Pro tip",
          text: "A \"buffer\" category is allowed and smart. Zero-based planning can include intentional flexibility.",
        },
      },
      {
        id: "adjust",
        kicker: "Keep going",
        title: "When the budget breaks (it will)",
        body: `Budgets fail for normal reasons: hours got cut, a tire went flat, a birthday week happened. Failure is feedback.\n\nRepair steps:\n\n**1. Don't quit** — update the plan mid-period.\n**2. Protect must-pays and minimum goal deposits if you can.**\n**3. Cut or pause wants temporarily.**\n**4. Note the surprise** — should it become a sinking fund next lesson?\n**5. Recalculate next period** with better estimates.\n\n**Stay on track between paydays:** Do a quick **weekly check-in** — did spending match the plan? Track **due dates on must-pays** (phone bill, car insurance, club fees) so nothing sneaks up mid-month.\n\nProgress is \"closer than last month,\" not \"perfect every week.\"`,
        callout: {
          label: "Try this week",
          text: "Write a one-period budget on paper or notes: net income, 5 categories, amounts that add up. Use it once — then revise.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• A **budget** is a plan for income across categories — needs, goals, wants.\n• **50/30/20** is one helpful model, not the only correct split.\n• **Zero-based** means every dollar gets a job on paper.\n• Match your budget to **net pay** and your pay schedule.\n• When life breaks the plan, adjust — don't abandon.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on a budget split you'd actually try.`,
      },
    ],
  },
  bigIdeas: [
    "A **budget** is a plan that assigns income to categories before money disappears.",
    "**50/30/20** is one useful model for needs/wants/saving — not the only valid approach.",
    "**Zero-based** budgeting gives every dollar a job so income minus plans equals zero on paper.",
  ],
  keyTerms: [
    { term: "Budget", definition: "A plan for how you will use income over a set period of time." },
    { term: "Category", definition: "A spending or saving bucket, such as transport, food, fun, or goals." },
    { term: "Fixed expense", definition: "A cost that stays about the same each period." },
    { term: "Variable expense", definition: "A cost that changes from period to period." },
    { term: "50/30/20 rule", definition: "A guideline suggesting about 50% needs, 30% wants, and 20% saving/debt goals." },
    { term: "Zero-based budgeting", definition: "Assigning every dollar of income a job until planned uses equal income." },
    { term: "Buffer", definition: "Money set aside for small surprises inside your budget plan." },
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
      question: "Why might a teen's percentages not match classic 50/30/20?",
      choices: [
        "Because teens are not allowed to budget",
        "Because responsibilities and income differ — the model is a guide, not a law",
        "Because 50/30/20 is illegal in Georgia",
        "Because net pay never matters",
      ],
      correctIndex: 1,
      explanation:
        "50/30/20 is one framework. Real teen situations often need different splits.",
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
      question: "Which income number should most budgets start from?",
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
  ],
  reflection: {
    prompt:
      "Draft a simple one-period budget: your estimated net income and 4–6 categories with dollar amounts that add up. Which category is hardest to estimate?",
    placeholder: "Example: $200 net — $50 gas, $40 food, $40 savings, $40 fun, $30 buffer. Food is hardest…",
  },
};
