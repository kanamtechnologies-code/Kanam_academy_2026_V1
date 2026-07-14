import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson3: AILessonConfig = {
  id: "fl-3",
  title: "3. Paychecks, Income & Taxes",
  goal: "Distinguish gross pay from net pay, recognize common paycheck deductions at a teen level, understand what a W-4 is for, and see how your human capital shapes future income — without filing taxes for you.",
  xpReward: 150,
  badge: "Paycheck Pro",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/2",
  nextHref: "/learn/finance/4",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-3.png",
        imageAlt: "Teen looking at a first paper paycheck and pay stub at a cafe table after a shift",
        body: `Your first job (or next job) comes with a moment every worker remembers: looking at a paycheck and thinking, \"Wait — where's the rest?\" Today you'll learn why the number you earn and the number you take home are different — and what those missing pieces usually are.\n\nHere's our roadmap:\n\n• **Gross vs. net pay** — earned vs. take-home.\n• **Common deductions** — taxes and other withholdings at a teen-friendly level.\n• **W-4 awareness** — the form that guides withholding (overview only).\n• **A worked example** — calculating net pay from a real shift.\n• **A common myth** — busted, about who \"keeps\" your withheld money.\n• **Human capital** — how your skills and education move your income over time.\n• **A full case study** — practice reading a real-looking pay stub.\n\nThis is educational. We won't give tax-filing advice for your personal return — just the concepts you need to understand a typical paycheck.`,
        callout: {
          label: "Why it matters",
          text: "Budgets based on gross pay overestimate what you can spend. Planning with net pay keeps you honest and reduces end-of-month panic.",
        },
      },
      {
        id: "hook",
        kicker: "Real talk",
        title: "The $54 surprise",
        body: `Kayla worked her first two weeks at a grocery store: 22 hours at $14/hour. Quick math in her head: 22 × $14 = **$308**. She'd already mentally spent it — $150 toward a phone upgrade, the rest on \"whatever.\"\n\nThe direct deposit landed at **$254**. Not a mistake, not a scam — just gross pay minus withholdings she hadn't thought about yet. Kayla wasn't wrong about the math. She was missing a step most first-time workers miss too: **gross pay isn't the number you get to spend.**\n\nThis lesson exists so that $54 gap never surprises you the way it surprised Kayla.`,
        callout: {
          label: "Keep this in mind",
          text: "We'll calculate exactly where Kayla's $54 went a little later in this lesson.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `• **Gross pay** is the total you earned before deductions.\n• **Net pay** (take-home pay) is what you actually receive after deductions.\n• A **deduction** / **withholding** is money taken from your paycheck for taxes or other items.\n• A **pay stub** (earnings statement) shows hours, gross pay, deductions, and net pay.\n• A **W-4** is a form you give your employer so they know how to withhold federal income tax.\n• **Income tax** is money owed to government based on taxable income (rules are set by law; details change).\n• **Human capital** is the value of your skills, education, and experience — the thing that actually drives your income over time.\n\nYou'll see state and federal pieces depending on where you work. The big idea is the same: part of gross pay is set aside before you get paid.`,
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
        checkIn: {
          prompt: "You earned $240 gross but only about $210 hits your account. Which number should you budget from?",
          choices: [
            "Gross pay — it's what you earned",
            "Net pay — take-home after deductions",
            "The larger of the two numbers",
            "Your friend's paycheck amount",
          ],
          correctIndex: 1,
          explanation:
            "Net pay is what actually lands in your account. Budgeting from gross overestimates what you can spend.",
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
        checkIn: {
          prompt: "Which pair is commonly part of FICA withholdings?",
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
      },
      {
        id: "w4",
        kicker: "Light touch",
        title: "W-4 awareness (not a filing guide)",
        image: "/images/lessons/fl-3-3.png",
        imageAlt: "Realistic close-up of a pay stub on a laptop screen with hours, gross, deductions, and net highlighted",
        body: `When you start a job, you often complete a **Form W-4**. It helps your employer estimate how much **federal income tax** to withhold from each paycheck.\n\nBig-picture points only:\n\n• Withholding is an estimate during the year — not the final tax bill by itself.\n• If too little is withheld, you might owe money at tax time; if too much, you might get a refund. Neither outcome is \"winning\" by default — it's cash-flow timing.\n• Life changes (second job, big income shift) can mean you should review your W-4 with a trusted adult or tax resource.\n\nThis class does **not** tell you exactly how to fill every W-4 checkbox for your personal situation. When unsure, ask a parent/guardian, school counselor resource, or a reputable tax guidance source — and keep copies of forms you sign.`,
        callout: {
          label: "Watch out",
          text: "Friends' W-4 choices are not a template. Their income, dependents, and other jobs may differ from yours.",
        },
        checkIn: {
          prompt: "What is a W-4 mainly used for?",
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
      },
      {
        id: "worked-example",
        kicker: "Do the math",
        title: "Solving Kayla's $54 gap",
        body: `Let's go back to Kayla: 22 hours at $14/hour, gross pay $308, net deposit $254.\n\n**Step 1 — Confirm gross.** 22 × $14 = **$308**. Correct.\n\n**Step 2 — Find the gap.** $308 − $254 = **$54** withheld.\n\n**Step 3 — Estimate where it likely went.** On a typical teen paycheck, that $54 is usually split across federal income tax withholding, Social Security and Medicare (FICA), and possibly state income tax withholding if the state has one. The exact split depends on the state, the W-4 on file, and current tax rules — Kayla can see the exact breakdown on her actual pay stub.\n\n**Step 4 — Recalculate her plan.** $254 net, not $308. If she still wants $150 toward the phone upgrade, she has $104 left for everything else — not $158 like her gross-based math assumed.\n\nThe lesson isn't "taxes are unfair." It's that **planning from net pay from day one** avoids a $54 (or bigger) surprise every single paycheck.`,
        callout: {
          label: "Try this",
          text: "Next time you get paid, do this same four-step check: gross, gap, likely categories, revised plan. It takes under two minutes once you know your stub.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth, busted",
        title: "\"My employer keeps the money that gets withheld\"",
        body: `A common myth: the money taken out of your paycheck disappears into your employer's pocket. It doesn't. Your employer is required to send federal and state income tax withholding to the government on your behalf, and FICA withholding funds Social Security and Medicare specifically. Your employer is a middleman for that transfer, not the destination.\n\nA related myth: \"getting a big refund means you did great with your taxes.\" A refund actually means you had **too much** withheld during the year — you gave the government an interest-free loan and got it back later. It's not free bonus money; it was already yours. Neither a refund nor owing a small amount is automatically good or bad — they're both about how closely withholding matched your actual tax situation.`,
        callout: {
          label: "Watch out",
          text: "\"Where did my tax money go\" has a real, traceable answer — it goes toward specific government programs and obligations, not into a mystery fund your employer keeps.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it",
        title: "Practice: read the numbers, not just the deposit",
        body: `DeShawn's pay stub shows: hours 18, rate $13.50/hour, gross pay $243, total deductions $31, net pay $212. His bank shows a deposit of $212.\n\nDoes anything need his attention here, or does everything check out?`,
        checkIn: {
          prompt: "What should DeShawn conclude from these numbers?",
          choices: [
            "Something is wrong because $243 minus $31 doesn't equal $212",
            "Everything checks out — gross minus deductions equals net, and net matches the deposit",
            "He should immediately fill out a new W-4 because deductions exist",
            "The deduction total is illegally high with no way to know for sure",
          ],
          correctIndex: 1,
          explanation:
            "$243 − $31 = $212, which matches both the stated net pay and the bank deposit. That's exactly what a clean, correct pay stub should show.",
        },
      },
      {
        id: "human-capital",
        kicker: "Look ahead",
        title: "Human capital: the real engine behind your income",
        image: "/images/lessons/fl-3-4.png",
        imageAlt: "Illustrated growth chart showing skills, certifications, and experience icons rising alongside an income line",
        body: `**Human capital** is the economics term for the value of your skills, knowledge, certifications, and experience. It's not a number on a pay stub — but it's the biggest long-term lever on your gross pay, bigger than any single paycheck decision.\n\nWays teens build human capital right now, often without realizing it:\n\n• Learning to communicate clearly and show up reliably at a part-time job.\n• Picking up a technical skill (software, a trade, a language) in or out of school.\n• Certifications, coursework, or apprenticeships tied to a field you're curious about.\n• Even soft skills like problem-solving under pressure count — employers pay more for people who can handle harder situations.\n\nRaises and better-paying jobs usually follow growth in human capital, not just seniority. A worker with more in-demand skills has more negotiating room on gross pay — which is a bigger win, long-term, than optimizing any single withholding choice.`,
        callout: {
          label: "Why it matters",
          text: "You can manage net pay carefully forever and still be capped by a low gross pay. Investing in skills raises the ceiling, not just the floor.",
        },
      },
      {
        id: "comparison",
        kicker: "Compare",
        title: "Hourly pay vs. salary pay",
        body: `Two common pay structures, and what each means for you:\n\n**Hourly pay.** You're paid a set rate for each hour worked; gross pay = hours × rate (plus overtime rules where they apply). Your gross pay changes with your schedule — more hours, more gross pay; fewer hours, less. Many teen and part-time jobs use this structure.\n\n**Salary pay.** You're paid a fixed amount for the year, divided across pay periods, regardless of small week-to-week schedule changes. Gross pay per check is predictable; it doesn't shrink because one week was slower, though it also doesn't grow just from working extra hours the way overtime might.\n\nBoth structures still have deductions — net pay is always less than gross for the reasons covered in this lesson. The structure just changes how predictable your gross pay is from period to period.`,
        callout: {
          label: "Pro tip",
          text: "If your hours vary a lot, budget using a conservative recent average of your hourly paychecks — not your best week ever.",
        },
      },
      {
        id: "behavioral-trap",
        kicker: "Watch your brain",
        title: "The \"first paycheck\" lifestyle creep trap",
        body: `A very common pattern: your first paycheck (or a raise) arrives, and spending quietly rises to match — sometimes even a little past — the new gross number, before you've adjusted for what net pay and new expenses actually leave you. This is called **lifestyle creep**, and it's sneaky because each individual purchase feels reasonable in the moment.\n\nThe fix isn't to freeze your spending forever. It's to build a short pause into raises and new jobs: before your spending habits adjust upward, decide on purpose how much of the *increase* goes toward goals versus lifestyle. Even directing half of a raise toward savings while enjoying the other half avoids the trap of your spending silently absorbing 100% of every future increase.`,
        checkIn: {
          prompt: "What is lifestyle creep, and how can you guard against it?",
          choices: [
            "It only affects people who get a pay cut, and there's no way to prevent it",
            "Spending quietly rising to match new income; guarding against it means directing part of any increase toward goals on purpose",
            "A type of bank fee charged when your balance grows too fast",
            "A rule that says you should never spend more even after a raise",
          ],
          correctIndex: 1,
          explanation:
            "Lifestyle creep is spending rising to match income increases by default. Deciding in advance where part of a raise goes protects your goals from being silently absorbed.",
        },
      },
      {
        id: "habits",
        kicker: "Read it",
        title: "How to skim a pay stub in 60 seconds",
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
        id: "standards-connect",
        kicker: "Bigger picture",
        title: "Why schools teach this",
        body: `National personal finance standards group this under "Earning Income" — gross versus net pay, payroll withholding, and understanding how your skills affect what you can earn. Schools teach it because your first confusing pay stub shouldn't be the first time anyone explains it to you, and because your income potential is something you can actually grow, not just something that happens to you.`,
      },
      {
        id: "reflect",
        kicker: "Pause",
        title: "Before you move on — think",
        body: `Take 30 seconds. No need to write anything yet.\n\nIf you have a job, pull up your last pay stub in your head (or actually, if you have it handy). Do you know what each deduction line represents? If you don't have a job yet, imagine your first one: what skill or experience could you start building now that would raise your human capital before you even apply?\n\nEither way, name one specific action — reading your next stub carefully, or starting one skill this month.`,
        callout: {
          label: "Try this",
          text: "If you have access to a real or sample pay stub, walk through the 60-second skim checklist from this lesson on it right now.",
        },
      },
      {
        id: "mini-case",
        kicker: "Full scenario",
        title: "Omar's raise decision",
        image: "/images/lessons/fl-3-5.png",
        imageAlt: "Teen employee receiving a schedule update from a manager at a retail counter, realistic daytime photo",
        body: `Omar has worked at a hardware store for eight months, starting at $13/hour. His manager just offered him a role leading weekend inventory checks — a real responsibility bump — for **$15.50/hour**, plus he'd need to finish a short online certification course (unpaid, about 6 hours total) first.\n\nOmar currently works 15 hours/week. At $13/hour, that's roughly $195/week gross; net after typical withholding might land somewhere in the $170s. At $15.50/hour for the same 15 hours, gross rises to about $232.50/week — a meaningful jump, though net will still be less than gross for the same withholding reasons covered earlier.\n\nThink through it: Is the unpaid 6-hour certification a reasonable investment in human capital given the raise? How should Omar think about the *increase* in pay — should all of it go to lifestyle, or should some go toward a goal, given what you learned about lifestyle creep? What would you tell Omar about budgeting from his new net pay instead of assuming the full gross increase is spendable?\n\nA reasonable take: the 6-hour unpaid course is a small, one-time human capital investment for a recurring $2.50/hour gain — likely worth it if Omar's schedule allows. Directing at least part of the raise (say, half) toward a goal while still enjoying some of the increase avoids full lifestyle creep. And Omar should recheck his actual net pay once the raise starts, rather than assuming the gross jump is what lands in his account.`,
        callout: {
          label: "Why it matters",
          text: "Real income decisions combine human capital, gross-vs-net thinking, and lifestyle-creep awareness all at once — exactly like this lesson's tools are designed for.",
        },
      },
      {
        id: "recap",
        kicker: "Check yourself",
        title: "Quick recap — could you explain this?",
        body: `Before the Knowledge check, see if you can explain each of these in your own words:\n\n• **Gross pay** is before deductions; **net pay** is take-home.\n• Common withholdings include federal/state income tax and **FICA** (Social Security & Medicare).\n• A **W-4** guides federal withholding — overview only; get help for your personal form.\n• **Human capital** (your skills and experience) is the long-term driver of gross pay.\n• **Lifestyle creep** is spending quietly rising to absorb a raise — guard against it on purpose.\n• Budget from **net**, not gross, and read each **pay stub**.\n\nIf any of those feel shaky, scroll back to that section before continuing.`,
        checkIn: {
          prompt: "What best explains why building human capital matters for your income?",
          choices: [
            "It has no real effect on pay — only hours worked matters",
            "Growing your skills, certifications, and experience is the main long-term driver of higher gross pay",
            "It only matters after you turn 30",
            "It replaces the need to ever read a pay stub",
          ],
          correctIndex: 1,
          explanation:
            "Human capital — skills, education, and experience — is what typically drives access to higher gross pay over time, more than any single paycheck decision.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Gross pay** is before deductions; **net pay** is take-home.\n• Common withholdings include federal/state income tax and FICA (Social Security & Medicare).\n• A **W-4** guides federal withholding — overview only; get help for your personal form.\n• **Human capital** — your skills and experience — drives your income over time.\n• Read each **pay stub**: hours, gross, deductions, net, YTD.\n• Budget from **net**, not gross.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on how net pay changes your spending plan.`,
      },
    ],
  },
  bigIdeas: [
    "**Gross pay** is what you earn before deductions; **net pay** is what you take home.",
    "Paychecks often withhold **income taxes** and **FICA** (Social Security and Medicare) before you get paid.",
    "A **W-4** helps your employer estimate federal withholding — review it thoughtfully when life or jobs change.",
    "**Human capital** — your skills, education, and experience — is the biggest long-term driver of your gross pay.",
    "**Lifestyle creep** lets spending quietly absorb a raise unless you direct part of any increase toward goals on purpose.",
  ],
  keyTerms: [
    { term: "Gross pay", definition: "Total earnings before taxes and other deductions." },
    { term: "Net pay", definition: "Take-home pay after deductions — what you actually receive." },
    { term: "Deduction / withholding", definition: "Money taken from a paycheck for taxes or other items." },
    { term: "Pay stub", definition: "A statement showing hours, gross pay, deductions, and net pay." },
    { term: "W-4", definition: "A form that helps your employer estimate federal income tax withholding." },
    { term: "FICA", definition: "Payroll taxes for Social Security and Medicare commonly withheld from paychecks." },
    { term: "Year-to-date (YTD)", definition: "Running totals of earnings and withholdings for the year so far." },
    { term: "Human capital", definition: "The value of your skills, education, and experience — the long-term driver of income." },
    { term: "Lifestyle creep", definition: "Spending that quietly rises to match a new, higher income unless directed on purpose." },
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
      explanation: "Net pay is what you actually receive after withholdings — take-home pay.",
    },
    {
      id: "q2",
      question:
        "Kayla worked 22 hours at $14/hour and received a $254 deposit. What was withheld from her paycheck?",
      choices: ["$308", "$254", "$54", "$14"],
      correctIndex: 2,
      explanation:
        "Gross pay was 22 × $14 = $308. $308 − $254 (net/deposit) = $54 withheld.",
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
      explanation: "FICA typically refers to Social Security and Medicare payroll taxes withheld from many paychecks.",
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
      explanation: "The W-4 guides how much federal income tax an employer withholds from your pay.",
    },
    {
      id: "q5",
      question: "What does a larger-than-expected tax refund actually mean?",
      choices: [
        "The government gave you free bonus money",
        "You had more withheld during the year than you owed, and are getting your own money back",
        "You did something wrong on your W-4 that must be fixed immediately",
        "Your employer kept some of your pay illegally",
      ],
      correctIndex: 1,
      explanation:
        "A refund means withholding was higher than what you actually owed — it's a return of your own money, not extra income.",
    },
    {
      id: "q6",
      question: "Why does human capital matter for your long-term income?",
      choices: [
        "It has no measurable effect on pay",
        "Growing your skills, certifications, and experience is the main long-term driver of higher gross pay",
        "It only affects people with college degrees",
        "It replaces the need to ever check a pay stub",
      ],
      correctIndex: 1,
      explanation:
        "Human capital — your skills, education, and experience — typically drives access to higher-paying roles over time.",
    },
    {
      id: "q7",
      question:
        "Omar's hourly rate rises from $13 to $15.50 for the same hours. What is the smartest first step, according to this lesson?",
      choices: [
        "Immediately increase spending to match the full gross increase",
        "Check the new net pay once the raise starts, and direct part of the increase toward a goal instead of letting it all become new spending",
        "Assume net pay will rise by the exact same dollar amount as gross pay",
        "Ignore the raise since gross pay doesn't matter",
      ],
      correctIndex: 1,
      explanation:
        "Confirming actual net pay and directing part of a raise toward goals guards against lifestyle creep — spending that quietly absorbs the entire increase.",
    },
    {
      id: "q8",
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
      "If you have a job (or imagine one), how would using net pay instead of gross pay change a weekly spending plan? What is one skill you could build to raise your future gross pay?",
    placeholder: "Example: I'd stop planning activities off the $240 gross and use the real deposit amount instead. I could learn basic spreadsheet skills…",
  },
};
