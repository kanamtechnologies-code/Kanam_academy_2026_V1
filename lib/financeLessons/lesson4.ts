import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson4: AILessonConfig = {
  id: "fl-4",
  title: "4. Banks, Accounts & Cards",
  goal: "Compare checking and savings, explain debit vs. credit at a conceptual level, spot common fees, and describe FDIC (and NCUA) insurance in plain English.",
  xpReward: 200,
  badge: "Banking Basics",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/3",
  nextHref: "/learn/finance/5",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-4.png",
        imageAlt: "Teen at a bank branch counter with a debit card and new account brochure, daytime realistic photo",
        body: `When you get your first paycheck, you need somewhere to put it. A bank (or credit union) is where most people park everyday money, pay bills, and save. Today you'll learn the account types teens meet first, how debit and credit differ, what fees to watch for, and what \"FDIC insured\" roughly means — without endorsing any brand.\n\nHere's our roadmap:\n\n• **Checking vs. savings** — spend vs. set aside.\n• **Debit vs. credit** — your money now vs. borrowed money.\n• **Fees and gotchas** — overdraft, ATM, minimum balance.\n• **A worked example** — what one avoidable fee actually costs over a year.\n• **A common myth** — busted, about "free" overdraft coverage.\n• **FDIC and NCUA insurance** — what happens if an insured institution fails.\n• **A full case study** — choosing between two real-looking account offers.\n\nEducational only: choose institutions with a trusted adult using your own needs (fees, access, requirements).`,
        callout: {
          label: "Why it matters",
          text: "The wrong account habits can quietly drain money through fees. The right basics keep your paycheck usable and your savings separate.",
        },
      },
      {
        id: "hook",
        kicker: "Real talk",
        title: "The $35 candy bar",
        body: `Elena's debit card was swiped for a $4.75 snack at a gas station. Her checking account had $3.10 in it at the time. She didn't get a decline message — the purchase went through. Three days later, she saw a **$35 overdraft fee** attached to that same $4.75 purchase.\n\nElena hadn't done anything reckless. She'd opted into "overdraft coverage" months earlier without fully reading what it meant, assuming it was just a safety net. It is a safety net — one that can cost 700% more than the thing it covered.\n\nThis lesson exists so a $4.75 snack never quietly becomes a $39.75 lesson in fine print.`,
        callout: {
          label: "Keep this in mind",
          text: "We'll come back to overdraft coverage later in this lesson — including what it actually is and isn't.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `• A **checking account** is for everyday deposits and spending (debit card, transfers, bills).\n• A **savings account** is for money you want to keep more separate and grow a little with interest (rules may limit some transfers).\n• A **debit card** spends money that is already in your checking account.\n• A **credit card** borrows money from the card issuer up to a limit; you must pay it back, often with interest if you carry a balance.\n• A **fee** is a charge the institution takes for a service or a mistake (like overdraft).\n• **FDIC insurance** protects eligible deposits at insured banks up to legal limits if the bank fails (credit unions have a similar federal insurance system called **NCUA** share insurance).\n\nWe'll stay brand-neutral: \"a checking account,\" not a specific bank name.`,
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
        checkIn: {
          prompt: "Why might someone keep savings in a separate savings account?",
          choices: [
            "To make impulse spending from goal money harder",
            "Because savings accounts cannot hold U.S. dollars",
            "Because checking accounts are illegal for teens",
            "Because only savings accounts earn any interest ever",
          ],
          correctIndex: 0,
          explanation:
            "Separating savings from checking reduces accidental spending of money you set aside for goals.",
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
        checkIn: {
          prompt: "How does a debit card differ from a credit card?",
          choices: [
            "Debit always earns unlimited cash back with no rules",
            "Debit spends your account money; credit borrows money you must repay",
            "They are identical in every way",
            "Credit cards cannot create debt",
          ],
          correctIndex: 1,
          explanation:
            "Debit pulls from money you already have; credit is borrowed money with repayment (and possible interest).",
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
        checkIn: {
          prompt: "Which fee is most closely tied to spending more than your available balance?",
          choices: [
            "Paper statement fee only",
            "Overdraft / NSF-related fees",
            "Safe deposit box rental",
            "College application fee",
          ],
          correctIndex: 1,
          explanation: "Overdraft or NSF fees relate to payments that exceed available funds.",
        },
      },
      {
        id: "worked-example",
        kicker: "Do the math",
        title: "What one avoidable fee really costs",
        body: `Let's put a number on fees, using Elena's $4.75 snack that triggered a $35 overdraft fee.\n\n**Step 1 — Total the real cost.** $4.75 (snack) + $35 (fee) = **$39.75** — a 737% markup over the snack's actual price.\n\n**Step 2 — Scale it up.** If a similar overdraft happens just **once a month** for a year, that's 12 × $35 = **$420** in fees alone — separate from whatever was purchased.\n\n**Step 3 — Compare to the alternative.** A $20–$30 buffer kept in checking, plus a low-balance alert, would have prevented every one of those fees for free.\n\n**Step 4 — Decide.** The "cost" of maintaining a small buffer is opportunity cost on $20–$30 sitting in checking instead of savings — tiny compared to $420/year in avoidable fees.\n\nThis is the same math that makes reading a fee schedule worth ten minutes: small percentages on small transactions can add up to real money over a year.`,
        callout: {
          label: "Try this",
          text: "Check whether your (or a family member's) account has low-balance alerts turned on. If not, that's a two-minute fix with a real payoff.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth, busted",
        title: "\"Overdraft coverage means the bank is helping me for free\"",
        body: `A common myth: opting into overdraft coverage is a free convenience that just \"lets\" a purchase go through. In reality, overdraft coverage usually means the bank pays the shortfall *and then charges a fee* — often a flat fee like $35, regardless of whether the shortfall was $2 or $200.\n\nWithout that coverage opted in, many debit purchases that would overdraw the account simply **decline** at checkout — no fee, just an inconvenient moment. With coverage, the purchase silently succeeds and the fee arrives a day or two later, disconnected from the moment you'd notice it.\n\nCoverage isn't automatically a bad choice — some people prefer it for rare true emergencies. The myth is thinking it's free. It's optional insurance you're paying for through fees, not a favor.`,
        callout: {
          label: "Watch out",
          text: "Check your account settings for overdraft coverage (sometimes called \"overdraft protection\") and understand exactly what happens — and what it costs — before a purchase.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it",
        title: "Practice: read the fee schedule",
        body: `Two account offers land in front of you:\n\n**Account A** — $0 monthly fee if you have any direct deposit, free in-network ATMs, $35 overdraft fee if enrolled in coverage (opt-in, off by default).\n\n**Account B** — $12 monthly fee waived only with a $1,500 minimum balance, $3 fee for any out-of-network ATM, overdraft coverage automatically enabled.\n\nYou're a student with irregular part-time hours and no way to guarantee a $1,500 balance.`,
        checkIn: {
          prompt: "Which account fits this situation better, and why?",
          choices: [
            "Account B, because automatic overdraft coverage is always safer",
            "Account A, because its fees are easier to avoid given irregular income and no guaranteed high balance",
            "They're equivalent since both eventually charge some fee",
            "Account B, because a higher monthly fee always means better service",
          ],
          correctIndex: 1,
          explanation:
            "Account A's fees are avoidable with realistic teen habits (any direct deposit, opt-in overdraft). Account B assumes a $1,500 balance that's unrealistic here and defaults into overdraft coverage.",
        },
      },
      {
        id: "fdic",
        kicker: "Safety net",
        title: "FDIC (and NCUA) insurance — plain English",
        image: "/images/lessons/fl-4-4.png",
        imageAlt: "Illustrated shield icon over a bank building labeled FDIC insured, with a simple plain-English caption",
        body: `If an **FDIC-insured bank** fails, eligible deposits are protected up to the legal limit per depositor, per insured bank, for each ownership category (the widely known standard limit is $250,000 — confirm current rules from official sources when you need exact details). Credit unions have a parallel system called **NCUA share insurance**, generally covering eligible accounts at the same standard limit.\n\nWhat that means for you as a student:\n\n• Everyday checking/savings balances for most teens are typically well within insured limits.\n• Insurance protects against **institution failure**, not against you spending the money, sharing your PIN, or getting scammed.\n• Look for an FDIC or NCUA logo/disclosure when opening an account — it signals the deposit protection applies.\n\nFDIC and NCUA insurance do **not** mean every financial product is risk-free. Investments can lose value; this lesson is about deposit accounts specifically.`,
        callout: {
          label: "Pro tip",
          text: "If something promises huge guaranteed returns with \"no risk,\" be skeptical — deposit insurance covers bank failure, not investment risk. That's a red flag lesson for later.",
        },
      },
      {
        id: "comparison",
        kicker: "Compare",
        title: "Fee-light vs. fee-heavy accounts, side by side",
        body: `When comparing two account offers, line them up on the same few factors instead of judging by first impression:\n\n**Monthly fee.** Is it $0, or does it require a minimum balance you can realistically maintain on teen income?\n\n**ATM access.** Free in-network ATMs nearby, or fees every time you need cash?\n\n**Overdraft default.** Opt-in (off unless you choose it) or automatically enabled?\n\n**Insurance.** FDIC-insured bank or NCUA-insured credit union — either works; absence of either is a red flag.\n\n**App and alerts.** Can you turn on low-balance and transaction alerts easily?\n\nA \"free\" account with automatic overdraft coverage and no alerts can cost more in a bad month than a account with a small, easily-waived monthly fee. Compare the realistic total cost, not just the label.`,
        callout: {
          label: "Try this week",
          text: "If you or a family member already has an account, pull up its fee schedule and check it against these five factors right now.",
        },
      },
      {
        id: "behavioral-trap",
        kicker: "Watch your brain",
        title: "Why cards make spending feel smaller",
        body: `Research on spending behavior points to something called the **cashless effect**: paying with a card (debit or credit) tends to feel less "painful" than handing over physical cash, even for the exact same amount. Less felt pain tends to mean less resistance to spending — which is part of why totals can creep up without anyone deciding to spend more on purpose.\n\nThis isn't a reason to avoid cards — most teen life runs on them. It's a reason to build a substitute for the "ouch" feeling cash used to provide:\n\n• Check your **running balance or app total** before tapping, not after.\n• Set a personal weekly spending number and glance at it, since a card alone won't remind you.\n• Use alerts (from the habits list) so a notification recreates some of that missing "felt cost."\n\nKnowing the bias exists is most of the fix — it turns invisible creep into something you can watch for.`,
        checkIn: {
          prompt: "What is the \"cashless effect,\" and what's a practical way to counter it?",
          choices: [
            "It means cards always charge higher prices than cash, so avoid them entirely",
            "Card payments can feel less painful than cash, so checking your running balance or using alerts helps replace that missing signal",
            "It only affects people who use credit cards, never debit cards",
            "It is solved automatically by opting into overdraft coverage",
          ],
          correctIndex: 1,
          explanation:
            "The cashless effect describes reduced \"felt cost\" when paying by card. Actively checking balances or using alerts helps counter the automatic spending creep it can cause.",
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
        id: "standards-connect",
        kicker: "Bigger picture",
        title: "Why schools teach this",
        body: `National personal finance standards group this under "Saving" — using insured accounts, understanding debit versus credit, and recognizing fees. It's on the standards list because a bank account is one of the very first adult financial tools most people ever use, and small early habits (or fee mistakes) here tend to stick for years.`,
      },
      {
        id: "reflect",
        kicker: "Pause",
        title: "Before you move on — think",
        body: `Take 30 seconds. No need to write anything yet.\n\nIf you already have an account, do you know whether overdraft coverage is on or off? Do you know if it's FDIC or NCUA insured? If you don't have an account yet, what's the one fee from this lesson you'd ask about first when you open one?\n\nBanking questions feel awkward to ask out loud — but every one of them is a completely normal, expected question for a first-time account holder.`,
        callout: {
          label: "Try this",
          text: "Write down one specific question to ask a trusted adult or bank representative next time you're setting up (or reviewing) an account.",
        },
      },
      {
        id: "mini-case",
        kicker: "Full scenario",
        title: "Choosing Sam's first account",
        image: "/images/lessons/fl-4-5.png",
        imageAlt: "Teen and parent reviewing two bank account brochures together at a kitchen table",
        body: `Sam, 16, just got a part-time job and needs a checking account. Two nearby options, with a parent as required co-signer either way:\n\n**Bank X (Student Checking):** $0 monthly fee, no minimum balance, free ATMs at a large in-network, overdraft coverage off by default (opt-in), FDIC insured, basic app with alerts.\n\n**Credit Union Y (Teen Share Account):** $0 monthly fee, requires a $25 minimum opening deposit only (not ongoing), free ATMs at a smaller regional network plus fee reimbursement up to $10/month for out-of-network ATMs, overdraft coverage off by default, NCUA insured, app with alerts and a small amount of interest on the savings-linked share.\n\nSam works near downtown, is comfortable with apps, and doesn't have $25 sitting around today but will after the first paycheck.\n\nWalk through it: Does the $25 one-time deposit for Credit Union Y meaningfully change the decision once Sam has a paycheck? Which account's ATM network fits daily life better without more information about Sam's routine? Are both accounts equally protected if the institution fails?\n\nBoth options are reasonable — this isn't a trick with one \"wrong\" answer. The real skill is comparing the same factors (fees, ATM access, overdraft default, insurance, alerts) side by side rather than picking based on which brochure looks nicer, and confirming Sam's actual daily routine (where they'll need ATMs) before deciding.`,
        callout: {
          label: "Why it matters",
          text: "Real account decisions rarely have one obviously correct answer — they have a clear comparison process, which is exactly what this lesson built.",
        },
      },
      {
        id: "recap",
        kicker: "Check yourself",
        title: "Quick recap — could you explain this?",
        body: `Before the Knowledge check, see if you can explain each of these in your own words:\n\n• **Checking** for everyday spending; **savings** for separated goals.\n• **Debit** uses your money; **credit** borrows and must be repaid.\n• **Overdraft coverage** is optional and can cost far more than the purchase it "covers."\n• **Fees** (overdraft, ATM, monthly) can quietly drain balances — read the schedule.\n• **FDIC** and **NCUA** insurance protect eligible deposits if an insured institution fails — not against spending mistakes or scams.\n\nIf any of those feel shaky, scroll back to that section before continuing.`,
        checkIn: {
          prompt: "What is the clearest way to avoid a surprise overdraft fee like Elena's?",
          choices: [
            "Always keep overdraft coverage automatically enabled",
            "Keep a small buffer in checking and turn on low-balance alerts",
            "Never use a debit card for anything under $10",
            "Ignore your balance since the bank will always cover it for free",
          ],
          correctIndex: 1,
          explanation:
            "A small buffer plus low-balance alerts prevents the shortfall in the first place — cheaper and simpler than relying on paid overdraft coverage.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Checking** for everyday spending; **savings** for separated goals.\n• **Debit** uses your money; **credit** borrows and must be repaid.\n• **Fees** (overdraft, ATM, monthly) can quietly drain balances — read the schedule.\n• **FDIC** (and NCUA for credit unions) protects eligible deposits if an insured institution fails — not against spending mistakes or scams.\n• Protect logins, PINs, and review transactions.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on how you'd set up checking vs. savings.`,
      },
    ],
  },
  bigIdeas: [
    "**Checking** handles everyday transactions; **savings** keeps goal and cushion money more separate.",
    "**Debit** spends money you already have; **credit** borrows money you must repay.",
    "**Overdraft coverage** is optional and can turn a small shortfall into a much bigger fee than the purchase itself.",
    "**FDIC insurance** (or **NCUA** at credit unions) protects eligible deposits if an insured institution fails — not against fees, spending, or scams.",
    "Comparing accounts on the same factors (fees, ATM access, overdraft default, insurance) beats picking by brochure alone.",
  ],
  keyTerms: [
    { term: "Checking account", definition: "An account designed for everyday deposits, spending, and bill payments." },
    { term: "Savings account", definition: "An account for money you want to set aside, often earning some interest." },
    { term: "Debit card", definition: "A card that spends money from your checking account." },
    { term: "Credit card", definition: "A card that borrows from an issuer up to a limit; balances must be repaid." },
    { term: "Overdraft", definition: "Spending more than your available balance, which may trigger fees if covered." },
    { term: "Overdraft coverage", definition: "An optional service that lets a shortfall go through in exchange for a fee, instead of the purchase declining." },
    { term: "FDIC insurance", definition: "Federal protection for eligible deposits at insured banks up to legal limits if the bank fails." },
    { term: "NCUA share insurance", definition: "A federal insurance system for credit unions, similar to FDIC insurance for banks." },
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
      explanation: "Checking accounts are built for transactions — paychecks in, spending and bills out.",
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
      explanation: "Debit uses your balance; credit is borrowed money with repayment (and possible interest).",
    },
    {
      id: "q3",
      question:
        "Elena's $4.75 snack triggered a $35 overdraft fee because overdraft coverage was enabled. What would most likely have happened with coverage off?",
      choices: [
        "The exact same $35 fee would still apply",
        "The purchase likely would have simply declined, with no fee",
        "The bank would have automatically closed her account",
        "She would have earned interest instead",
      ],
      correctIndex: 1,
      explanation:
        "Without overdraft coverage, a purchase that would overdraw the account typically just declines at checkout — no fee, just an inconvenience.",
    },
    {
      id: "q4",
      question: "What does FDIC insurance (or NCUA at a credit union) primarily protect against?",
      choices: [
        "You losing money in the stock market",
        "An insured institution failing, for eligible deposits up to legal limits",
        "Every scam text message",
        "Credit card interest rates",
      ],
      correctIndex: 1,
      explanation:
        "FDIC/NCUA insurance covers eligible deposits if an insured institution fails — not market losses or all fraud types.",
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
    {
      id: "q6",
      question:
        "Account A has a $0 monthly fee with opt-in overdraft; Account B has a $12 fee waived only at a $1,500 balance and automatic overdraft coverage. For a student with irregular income and no $1,500 balance, which is the stronger fit?",
      choices: [
        "Account B, because automatic overdraft coverage is always the safer default",
        "Account A, because its fees are realistically avoidable given the student's situation",
        "Neither — both are equally risky",
        "Account B, because a higher fee always signals better service",
      ],
      correctIndex: 1,
      explanation:
        "Account A's $0 fee doesn't depend on an unrealistic balance, and opt-in overdraft avoids automatic fee exposure — a better realistic fit here.",
    },
    {
      id: "q7",
      question: "What is the clearest fix for preventing overdraft fees before they happen?",
      choices: [
        "Enable automatic overdraft coverage and stop checking your balance",
        "Keep a small buffer in checking and turn on low-balance alerts",
        "Only use credit cards and never debit cards",
        "Close the account whenever a fee occurs",
      ],
      correctIndex: 1,
      explanation:
        "A small buffer plus alerts catches a low balance before a purchase can trigger a fee — cheaper and simpler than relying on paid coverage.",
    },
    {
      id: "q8",
      question: "Which fee is most closely tied to spending more than your available balance?",
      choices: [
        "Paper statement fee only",
        "Overdraft / NSF-related fees",
        "Safe deposit box rental",
        "College application fee",
      ],
      correctIndex: 1,
      explanation: "Overdraft or NSF fees relate to payments that exceed available funds.",
    },
  ],
  reflection: {
    prompt:
      "If you opened (or already have) accounts, how would you split money between checking and savings — and which fee would you watch most carefully?",
    placeholder: "Example: Paycheck to checking for bills/gas; auto-move $25 to savings; watch ATM and overdraft fees…",
  },
};
