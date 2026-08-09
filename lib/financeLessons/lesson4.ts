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
  instructorScript: `**Coach's note**
Today's lesson: **Banks, Accounts & Cards**.

**Goal:** Compare checking and savings, explain debit vs. credit at a conceptual level, spot common fees, and describe FDIC (and NCUA) insurance in plain English.

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
          prompt:
            "Marcus notices that whenever his savings and spending money sit in the same account, he ends up dipping into his car-fund savings for random purchases. What's the best explanation for why a separate savings account would help?",
          choices: [
            "Because checking accounts can't legally hold money meant for savings goals",
            "Because separate accounts always pay a much higher interest rate",
            "Keeping savings separate makes it harder to spend that money on impulse",
            "Because his bank requires two accounts once his balance goes above $100",
          ],
          correctIndex: 2,
          explanation:
            "Separation reduces accidental spending of goal money. Higher interest isn't guaranteed just by having two accounts, and checking accounts can legally hold savings-style money too — it's just easier to raid.",
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
          prompt:
            "Sofia pays for lunch with her debit card, while her older brother pays for his textbooks with a credit card. What's the key difference in what's happening?",
          choices: [
            "Sofia is spending money she already has; her brother is borrowing money he'll need to repay",
            "Her brother's purchase is automatically fee-free since it's for school” belongs to a different situation than the one in the question stem",
            "Sofia's card lets her spend more than her balance with no consequence” belongs to a different situation than the one in the question stem",
            "There's no real difference — both cards work exactly the same way” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Debit pulls from money already in the account; credit borrows money that must be repaid, often with interest if a balance carries. Neither card works the way the other two options describe.",
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
          prompt:
            "Jordan's debit purchase went through even though his balance was too low, and a few days later a charge showed up on his account for letting it happen. Which type of fee is this?",
          choices: [
            "A foreign transaction fee",
            "A paper statement fee",
            "An out-of-network ATM fee",
            "An overdraft / NSF-related fee",
          ],
          correctIndex: 3,
          explanation:
            "Overdraft/NSF fees relate to payments that exceed available funds. The other fees are tied to currency conversion, statement format, or ATM network — not a low balance.",
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
            "Account A, because its fees are easier to avoid given irregular income and no guaranteed high balance",
            "Account B, because automatic overdraft coverage is always the safer choice” belongs to a different situation than the one in the question stem",
            "They're basically equivalent since both accounts can charge some fee eventually” belongs to a different situation than the one in the question stem",
            "Account B, because a higher monthly fee usually means better account features” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Account A's fees are avoidable with realistic teen habits. Automatic overdraft coverage isn't \"always safer\" — it can turn a small shortfall into an expensive surprise, and a higher fee doesn't guarantee better service.",
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
            "A rushed pass can land on it's automatically solved by opting into overdraft coverage”; careful readers reject it for this problem",
            "“It only affects people who use credit cards, never debit cards” describes a different situation than the one in the question stem",
            "Card payments can feel less painful than cash, so checking your running balance or using alerts helps replace that missing signal",
            "“It means cards always charge higher prices than the same purchase in cash” describes a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "The cashless effect describes reduced \"felt cost\" when paying by card — it applies to debit too, and it's about spending behavior, not sticker prices or overdraft settings.",
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
        id: "ask-before-sign",
        kicker: "Before you sign",
        title: "Opening an account: questions to ask (with a trusted adult)",
        body: `Banks and credit unions compete for teen accounts — marketing can sound identical. Use this checklist with a trusted adult before opening anything.

**Ask before you sign:**

• **Monthly fees** — Is there a maintenance fee? What balance or activity waives it?
• **Overdraft** — Is overdraft "protection" optional? What does each overdraft event cost?
• **ATM access** — Which ATMs are free? What's the fee for out-of-network withdrawals?
• **Debit card rules** — Daily limits? Foreign transaction fees if you travel?
• **Savings rules** — Transfer limits, minimum balance, interest rate (even if small).
• **Mobile alerts** — Can you get low-balance texts before a purchase declines?
• **Insurance** — Is the institution **FDIC** (bank) or **NCUA** (credit union) insured?

No brand endorsements here — the skill is comparing real costs, not picking the coolest card design.`,
        callout: {
          label: "Watch out",
          text: "\"Free student checking\" sometimes means free only if you meet direct-deposit or balance rules. Read the fee schedule, not just the brochure headline.",
        },
      },
      {
        id: "second-scenario",
        kicker: "Do the math",
        title: "Two accounts, one year of fees — worked comparison",
        body: `**Account A (fee-light):** $0 monthly fee with $300 average balance, 2 free out-of-network ATM uses/month, $0 overdraft if you opt out.

**Account B (fee-heavy):** $12/month maintenance unless $1,500 minimum daily balance, $3 per out-of-network ATM, $35 overdraft per covered transaction.

**Scenario:** You keep about $400 average, use out-of-network ATMs 4 times/month (campus + home), and overdraft once in a messy month.

**Account A year-one estimate:**
• Maintenance: $0
• Extra ATM (2 over free): maybe $5–$10 total if $2.50 each
• Overdraft: $0 (opted out — card declines instead)
• **Rough total: under $15**

**Account B year-one estimate:**
• Maintenance: $0 (you stay above minimum some months) OR $144 if you dip below often
• ATM: 4 × $3 × 12 = **$144**
• One overdraft: **$35**
• **Rough total: $179–$323**

Same student, same habits — fee structure alone can cost a concert ticket or two months of phone bill money.`,
        bullets: [
          "**ATM habits** matter as much as monthly fees.",
          "Opting **out** of overdraft coverage can save $35 surprises.",
          'A "free" account with expensive ATMs isn\'t free for your life.',
        ],
        checkIn: {
          prompt: "You average $400 in checking and use out-of-network ATMs weekly. Which factor will likely cost you more over a year?",
          choices: [
            "FDIC insurance premiums paid by the customer” belongs to a different situation than the one in the question stem",
            "A debit card with a cool design but no fee schedule listed",
            "A $12/month fee you always avoid by keeping $1,500 daily",
            "A $0 monthly fee account with $3 out-of-network ATM charges",
          ],
          correctIndex: 3,
          explanation:
            "Weekly out-of-network ATM use adds up fast ($3 × ~52 ≈ $156). FDIC insurance doesn't charge customers. A fee you always avoid isn't your real cost.",
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
            "Keep a small buffer in checking and turn on low-balance alerts",
            "Keep overdraft coverage automatically turned on at all times",
            "Avoid using a debit card for any purchase under $10",
            "Trust that the bank will always cover shortfalls for free",
          ],
          correctIndex: 0,
          explanation:
            "A small buffer plus low-balance alerts prevents the shortfall in the first place. Overdraft coverage isn't free — it's the paid service that created Elena's $35 fee in the first place.",
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
      question: "Which of these is the main everyday job of a checking account?",
      choices: [
            "Guaranteeing that your investments will grow” belongs to a different situation than the one in the question stem",
            "Replacing the need for any kind of budget” belongs to a different situation than the one in the question stem",
            "Automatically eliminating every possible fee” belongs to a different situation than the one in the question stem",
            "Handling deposits and day-to-day spending and transactions",
          ],
      correctIndex: 3,
      explanation: "Checking accounts are built for transactions — paychecks in, spending and bills out. They don't guarantee investment growth or erase every fee on their own.",
    },
    {
      id: "q2",
      question: "Which statement correctly describes the difference between a debit card and a credit card?",
      choices: [
            "They function exactly the same, just with different logos” belongs to a different situation than the one in the question stem",
            "Credit cards can never result in owing money if you're careful",
            "Debit spends money you already have; credit borrows money you must repay",
            "Debit always earns unlimited cash back with no rules” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation: "Debit uses your balance; credit is borrowed money with repayment (and possible interest). Even careful credit use still creates a real balance owed until it's paid off.",
    },
    {
      id: "q3",
      question:
        "Elena's $4.75 snack triggered a $35 overdraft fee because overdraft coverage was enabled. What would most likely have happened with coverage off?",
      choices: [
        "The exact same $35 fee would still apply either way",
        "The bank would have automatically closed her account",
        "She would have earned a small amount of interest instead",
        "The purchase likely would have simply declined, with no fee",
      ],
      correctIndex: 3,
      explanation:
        "Without overdraft coverage, a purchase that would overdraw the account typically just declines at checkout — no fee, just an inconvenience.",
    },
    {
      id: "q4",
      question: "What does FDIC insurance (or NCUA at a credit union) primarily protect against?",
      choices: [
            "Every possible scam text message you might receive” belongs to a different situation than the one in the question stem",
            "The interest rate charged on a credit card balance” belongs to a different situation than the one in the question stem",
            "You losing money because a stock investment dropped in value",
            "An insured institution failing, for eligible deposits up to legal limits",
          ],
      correctIndex: 3,
      explanation:
        "FDIC/NCUA insurance covers eligible deposits if an insured institution fails — it doesn't cover investment losses, scams, or interest rates.",
    },
    {
      id: "q5",
      question: "Why might someone choose to keep savings in a separate account from checking?",
      choices: [
        "Because savings accounts can't legally hold U.S. dollars",
        "Because FDIC insurance only ever applies to savings accounts, never checking",
        "To make it harder to spend that money on impulse",
        "Because a single account can't hold more than a few hundred dollars",
      ],
      correctIndex: 2,
      explanation:
        "Separation reduces accidental spending of goal or emergency money. FDIC coverage can apply to eligible checking balances too, and accounts aren't capped at a few hundred dollars.",
    },
    {
      id: "q6",
      question:
        "Account A has a $0 monthly fee with opt-in overdraft; Account B has a $12 fee waived only at a $1,500 balance and automatic overdraft coverage. For a student with irregular income and no $1,500 balance, which is the stronger fit?",
      choices: [
            "Account B, because a higher monthly fee always signals better service” belongs to a different situation than the one in the question stem",
            "Account A, because its fees are realistically avoidable given the student's situation",
            "Neither — both accounts are equally risky either way” belongs to a different situation than the one in the question stem",
            "Account B, because automatic overdraft coverage is always the safer default",
          ],
      correctIndex: 1,
      explanation:
        "Account A's $0 fee doesn't depend on an unrealistic balance, and opt-in overdraft avoids automatic fee exposure. A bigger fee doesn't automatically mean better service.",
    },
    {
      id: "q7",
      question: "What is the clearest fix for preventing overdraft fees before they happen?",
      choices: [
        "Enable automatic overdraft coverage and stop checking your balance",
        "Only ever use credit cards and never touch a debit card",
        "Close the account the first time any fee occurs",
        "Keep a small buffer in checking and turn on low-balance alerts",
      ],
      correctIndex: 3,
      explanation:
        "A small buffer plus alerts catches a low balance before a purchase can trigger a fee — cheaper and simpler than relying on paid overdraft coverage.",
    },
    {
      id: "q8",
      question: "Which fee is most directly triggered by spending more money than you actually have available?",
      choices: [
        "A safe deposit box rental fee",
        "An overdraft / NSF-related fee",
        "A college application fee",
        "A paper statement fee",
      ],
      correctIndex: 1,
      explanation: "Overdraft or NSF fees relate specifically to payments that exceed available funds, unlike the other listed fees.",
    },
  ],
  reflection: {
    prompt:
      "If you opened (or already have) accounts, how would you split money between checking and savings — and which fee would you watch most carefully?",
    placeholder: "Example: Paycheck to checking for bills/gas; auto-move $25 to savings; watch ATM and overdraft fees…",
  },
};
