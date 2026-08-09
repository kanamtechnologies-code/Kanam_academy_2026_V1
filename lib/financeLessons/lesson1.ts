import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson1: AILessonConfig = {
  id: "fl-1",
  title: "1. Money, Goals & You",
  goal: "Explain money as a tool (not an identity), tell short-, medium-, and long-term goals apart, and write SMART-ish money goals that fit a high school life.",
  xpReward: 50,
  badge: "Money Starter",
  dashboardHref: "/dashboard",
  nextHref: "/learn/finance/2",
  instructorScript: `**Coach's note**
Today's lesson: **Money, Goals & You**.

**Goal:** Explain money as a tool (not an identity), tell short-, medium-, and long-term goals apart, and write SMART-ish money goals that fit a high school life.

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
        image: "/images/lessons/fl-1.png",
        imageAlt: "High school student at a desk with a notebook labeled Goals, phone showing a savings balance, and a small cash jar",
        body: `Money shows up everywhere in your life — a paycheck from your part-time job, gas money, saving for a used car, splitting a group gift, or chipping in for senior trip. This lesson starts at the foundation: what money *is*, what you want it to *do*, and how to turn fuzzy wishes into clear goals.\n\nHere's our roadmap:\n\n• **Money as a tool** — it buys choices; it doesn't define your worth.\n• **Goal horizons** — short, medium, and long term.\n• **SMART-ish goals** — clear enough to act on, flexible enough for real teen life.\n• **A worked example** — turning a wish into a plan with real numbers.\n• **A common myth** — busted, with what to do instead.\n• **Values, bias, and habits** — the psychology behind sticking with a goal.\n• **A full case study** — practice deciding like a real person, not a worksheet.\n\nNo prior finance class needed. Every new word gets explained when it appears. This track is **educational** — habits and decision skills, not get-rich-quick tips.`,
        callout: {
          label: "Why it matters",
          text: "Clear money goals cut stress and impulse spending. When you know what you're aiming for, it's easier to say yes to what matters and no to what doesn't.",
        },
      },
      {
        id: "hook",
        kicker: "Real talk",
        title: "Jordan's $180 Friday",
        body: `Jordan just picked up their first paycheck from the smoothie shop: $180, direct-deposited on a Friday afternoon. By Saturday night, $140 of it was gone — a concert ticket, a new phone case, and food with friends. None of it was a bad choice on its own. The problem was that Jordan also *wanted* $200 saved for a laptop charger, a bus pass for next month, and a little cushion in case a shift got cut.\n\nBy Sunday, Jordan had $40 left and three weeks until the next paycheck. Nothing about Friday night felt irresponsible in the moment — it just wasn't **connected to anything**. There was no goal competing for that money, so nothing did.\n\nThis lesson isn't about telling Jordan (or you) to stop having fun. It's about giving your money somewhere to go *on purpose*, so spending and saving both feel like choices instead of accidents.`,
        callout: {
          label: "Keep this in mind",
          text: "Jordan's story shows up again later in this lesson with a twist — keep it in the back of your mind.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `Before we dive in, here are the core words for this lesson — explained simply.\n\n• **Money** is what you use to buy things and save for later.\n• A **goal** is something specific you want, with a rough timeline.\n• **Income** is money you receive — from a job, allowance, gifts, or side work.\n• **Spending** is money you use now; **saving** is money you set aside for later.\n• A **priority** is something you rank as more important than other options.\n• **Values** are what you treat as important — they decide which priority wins when two goals compete.\n• A **time horizon** is how soon you want a result: short, medium, or long term.\n• **Present bias** is the pull toward a smaller reward *now* over a bigger reward *later*.\n\nKeep these in mind. Everything else in the lesson builds on them.`,
        callout: {
          label: "Pro tip",
          text: "When a money word feels fancy, swap in the plain meaning. \"Assign income to a goal\" just means \"decide where this paycheck goes.\"",
        },
      },
      {
        id: "money-tool",
        kicker: "The big idea",
        title: "Money is a tool — not a personality",
        image: "/images/lessons/fl-1-2.png",
        imageAlt: "Simple illustrated diagram: money as a tool connecting a paycheck icon to choices like gas, phone, and savings",
        body: `**Money** lets you trade your time and skills for things you need and want — food, a bus pass, a phone plan, concert tickets, or breathing room when something breaks.\n\nWhat money is *not*:\n\n• A measure of how good a person you are.\n• Proof that someone is smarter than someone else.\n• A guarantee of happiness.\n\nTwo students can earn the same from a weekend job and feel totally different about money — because they value different things. One might save hard for a used car; another might spend more on hangouts with friends. Neither is automatically \"right.\" The skill is matching your money choices to **your** priorities — and adjusting when life changes.\n\nThink of money like a backpack: useful for carrying what you need for the trip. The trip matters more than the pack.`,
        bullets: [
          "**Money** = a tool for choices over time.",
          "Your **values** shape what \"enough\" and \"worth it\" mean.",
          "Comparing yourself to others' spending usually creates noise, not a plan.",
        ],
        callout: {
          label: "Watch out",
          text: "Social media shows highlight reels of spending. Treat those as entertainment, not a budget. Your real life has different constraints — and that's normal.",
        },
        checkIn: {
          prompt:
            "Two friends earn about the same from their summer jobs but spend very differently — one saves hard for a car, the other spends more on hangouts. What does this lesson say about that?",
          choices: [
            "Whoever spends less is clearly more responsible with money” belongs to a different situation than the one in the question stem",
            "Once someone has a budget, differences like this always go away” belongs to a different situation than the one in the question stem",
            "This kind of income needs a strict 50/50 split to be considered normal” belongs to a different situation than the one in the question stem",
            "Their different values shape what feels \"worth it\" to each of them — neither is automatically wrong",
          ],
          correctIndex: 3,
          explanation:
            "Values, not income, drive spending differences — spending less doesn't automatically mean someone is \"better\" with money; it just means their priorities are different.",
        },
      },
      {
        id: "horizons",
        kicker: "Time frames",
        title: "Short, medium, and long-term goals",
        body: `Money goals get clearer when you name the **time horizon** — how soon you want the result.\n\n• **Short-term** — days to a few months. Examples: concert ticket next month, new cleats this season, holiday gifts.\n• **Medium-term** — several months to a couple of years. Examples: a used car down payment, a laptop for school, a senior trip fund.\n• **Long-term** — years ahead. Examples: college costs, first apartment deposit, building savings as an adult.\n\nYou can work on more than one horizon at once — but not by dumping every dollar into the farthest goal and ignoring next week's needs. A healthy plan usually protects a little for *now*, a little for *soon*, and a little for *later*.\n\nIf everything feels equally urgent, list your goals and circle the one that would reduce the most stress if you made progress this month.`,
        callout: {
          label: "Why it matters",
          text: "Without horizons, \"I should save\" stays vague. Naming *when* turns a wish into something you can schedule and measure.",
        },
        checkIn: {
          prompt:
            "Marcus wants to save enough for winter formal tickets, which go on sale in 5 weeks. Which horizon best fits this goal?",
          choices: [
            "Medium-term, because it's more than a few weeks away",
            "Short-term — days to a few months out",
            "Long-term, since anything over a month counts as long-term",
            "Not a real goal since it's not about saving for years",
          ],
          correctIndex: 1,
          explanation:
            "Five weeks is short-term. It's easy to assume \"more than a few weeks\" pushes a goal into medium-term, but medium-term really means several months to a couple of years out.",
        },
      },
      {
        id: "smart-goals",
        kicker: "Make it doable",
        title: "SMART-ish goals for teens",
        image: "/images/lessons/fl-1-3.png",
        imageAlt: "Close-up of a teen planner with a SMART-ish goal written: Save $150 for cleats by Oct 15",
        body: `You might hear adults talk about **SMART** goals: Specific, Measurable, Achievable, Relevant, Time-bound. For high school, use a lighter version — **SMART-ish** — so goals stay clear without feeling like a boring form nobody wants to fill out.\n\nAsk:\n\n• **Specific** — What exactly? (\"Save for a used car\" beats \"be better with money.\")\n• **Measurable** — How will you know you're making progress? (A dollar amount or a checklist.)\n• **Achievable** — Given your real income and expenses, is this realistic?\n• **Relevant** — Does this match what you care about right now?\n• **Time-bound** — By when?\n\nWeak: \"Save more.\"\nSMART-ish: \"Save $150 for new cleats by October 15 by putting $25 from each paycheck into a labeled savings envelope or account.\"\n\nYou can revise a goal when hours get cut or a new priority pops up. Revising is planning — not failing.`,
        bullets: [
          "Vague goals are hard to start; clear goals are easier to track.",
          "If the math doesn't fit your income, shrink the goal or extend the deadline.",
          "Write the goal where you'll see it when you get paid.",
        ],
        callout: {
          label: "Pro tip",
          text: "Attach a goal to a paycheck habit: \"When money hits, move the goal amount first.\" Paying yourself first beats hoping leftovers appear.",
        },
        checkIn: {
          prompt:
            "Sofia writes: \"I want to get better with money this year.\" A friend suggests a rewrite. Which version is most SMART-ish?",
          choices: [
            "\"Put any extra money into savings whenever I remember.\"” belongs to a different situation than the one in the question stem",
            "\"Save $150 for cleats by October 15 by setting aside $25 from each paycheck.\"",
            "\"Stop spending on wants until I feel more responsible.\"” belongs to a different situation than the one in the question stem",
            "\"Try to spend less on stuff I don't really need.\"” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "The other options sound like effort or intention, but none has a number, a deadline, and a habit — the pieces that make a goal SMART-ish instead of just a good intention.",
        },
      },
      {
        id: "worked-example",
        kicker: "Do the math",
        title: "Turning a wish into a plan — with numbers",
        body: `Let's build a real SMART-ish goal step by step.\n\n**The wish:** Maya wants to go on her robotics team's out-of-state competition trip. It costs **$360**, and the deposit is due in **12 weeks**.\n\n**Step 1 — Name the total.** $360. Not \"a few hundred dollars.\"\n\n**Step 2 — Count the paydays.** Maya gets paid every two weeks, so she has about **6 paychecks** before the deadline.\n\n**Step 3 — Divide.** $360 ÷ 6 paychecks = **$60 per paycheck**.\n\n**Step 4 — Reality-check it.** Maya's net pay is about $150 per check. $60 is **40%** of that check — tight, but possible if she trims a few extras.\n\n**Step 5 — Decide.** Maya sets up an automatic $60 transfer to a labeled savings spot the day she's paid, before she spends on anything else.\n\nIf $60 hadn't fit her budget, the fix isn't to give up — it's to extend the deadline, look for an extra shift, or ask if a payment plan exists. The math tells you what's true; it doesn't make the decision for you.`,
        callout: {
          label: "Try this",
          text: "Pick one real goal you have right now. Do the same five steps on paper. If the number per paycheck feels impossible, adjust the deadline before you adjust your motivation.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth, busted",
        title: "\"If I want it badly enough, the money will appear\"",
        body: `You've probably seen social posts that say something like: *manifest* your goal, believe hard enough, and the universe (or your bank account) will cooperate. It's a nice feeling — and it's not how paychecks work.\n\nHere's the actual mechanism behind goals that succeed:\n\n• A **specific number** you're aiming for.\n• A **deadline** that creates urgency.\n• A **habit** (like an automatic transfer) that moves money without relying on willpower every single day.\n• **Tracking**, so you notice early if the plan is off track.\n\nWanting something intensely can fuel the *motivation* to start — that part is real. But motivation fades by week two for almost everyone. Systems (habits + tracking) are what carry a goal through week eight, when the excitement has worn off and the deadline hasn't arrived yet.\n\nThe fix for a goal that stalls isn't more hype. It's a smaller, clearer number and an automatic habit that doesn't depend on how motivated you feel that day.`,
        callout: {
          label: "Watch out",
          text: "\"Good vibes\" and \"the right mindset\" are not a savings plan. If a goal has no dollar amount and no deadline, it's a wish — not a goal yet.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it",
        title: "Practice: fix this vague goal",
        body: `Here's a real goal statement a student wrote: **\"I want to get better with money and maybe save up for something this year.\"**\n\nBefore you look at the choices below, try rewriting it yourself using the SMART-ish checklist: specific, measurable, achievable, relevant, time-bound.\n\nThen check your version against the ones below and pick the strongest rewrite.`,
        checkIn: {
          prompt:
            "A classmate's goal reads: \"I want to get better with money and maybe save up for something this year.\" Which rewrite is the strongest SMART-ish version?",
          choices: [
            "\"Save aggressively for a few different things this year.\"” belongs to a different situation than the one in the question stem",
            "\"Save $250 for a phone screen repair fund by December 1 by moving $25 from every biweekly paycheck.\"",
            "\"Put money aside for repairs whenever there's some left over.\"” belongs to a different situation than the one in the question stem",
            "“\"Really commit to saving more starting now.\"” describes a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "It has the amount, deadline, and exact habit. \"Save the leftover\" (choice 3) sounds proactive, but this lesson's whole point is that leftovers are usually small or nonexistent — not a real plan.",
        },
      },
      {
        id: "values-filter",
        kicker: "Your filter",
        title: "Values turn goals into decisions",
        image: "/images/lessons/fl-1-4.png",
        imageAlt: "Illustrated fork-in-the-road decision graphic showing a $40 branching toward gas, a gift, or a savings jar",
        body: `A **value** is what you treat as important — independence, family, creativity, safety, fun, learning. Values aren't right or wrong in the abstract; they help you choose when money is limited (which it always is).\n\nExample: You have $40 left this week.\n\n• If you value **reliability**, you might put gas in the car so you can get to work.\n• If you value **connection**, you might chip in for a friend's birthday.\n• If you value **future options**, you might add to a college or car fund.\n\nNone of those choices is automatically selfish or smart. The question is: Did you choose on purpose, or on autopilot?\n\nTry a 60-second check before a non-essential purchase: \"Does this help a goal I named, or am I just filling boredom / matching someone else's feed?\" That pause is financial literacy in action.`,
        callout: {
          label: "Watch out",
          text: "Saying you value \"saving for college\" while spending every extra dollar on impulse buys is a mismatch. Aligning spending with stated values is the real skill.",
        },
      },
      {
        id: "comparison",
        kicker: "Compare",
        title: "Two ways to fund a goal",
        body: `There are two common approaches to getting money toward a goal. Neither is a secret trick — but they produce very different results.\n\n**Approach A — Pay yourself first.** The goal amount moves out of checking the moment you're paid, before anything else touches it. What's left is what you have for needs and wants for that period. Result: the goal almost always gets funded, because it never competes with a fresh, tempting balance.\n\n**Approach B — Save the leftover.** You spend on needs and wants first, then \"save whatever's left\" at the end of the period. Result: the leftover is usually small, inconsistent, or zero — because balances rarely feel like they have \"extra\" sitting around.\n\nSame income, same goal, two very different outcomes. Pay-yourself-first isn't magic; it just removes the goal from a fair fight against every other tempting option on payday.`,
        callout: {
          label: "Pro tip",
          text: "If you only change one habit from this lesson, make it this: move the goal amount on payday, before you check your balance for anything else.",
        },
      },
      {
        id: "behavioral-trap",
        kicker: "Watch your brain",
        title: "Present bias: why \"later\" loses to \"now\"",
        body: `**Present bias** is a well-documented pull toward a smaller reward *right now* over a bigger reward *later* — even when you know the later reward is objectively better. It's not a character flaw; it's how most human brains are wired, and it gets stronger when something feels urgent, social, or time-limited (\"only 3 left,\" \"drops tonight\").\n\nHow it shows up for teens:\n\n• A "24-hour sale" countdown timer creating fake urgency.\n• Seeing a friend post a purchase and wanting to match it immediately.\n• Treating \"I'll start saving next paycheck\" as a real plan (it rarely is).\n\nYou can't delete present bias, but you can design around it: automate the goal transfer so it happens before you feel the pull, and add a short waiting period (24–48 hours) for non-urgent purchases over a set amount you pick for yourself.`,
        checkIn: {
          prompt:
            "Jayden sees a countdown timer saying a shoe drop ends in 20 minutes, and suddenly feels a strong urge to buy — even though he wasn't thinking about shoes an hour ago. What's going on?",
          choices: [
            "Proof the shoes must be a smart purchase since he wants them so badly” belongs to a different situation than the one in the question stem",
            "A sign Jayden has unusually poor self-control that most people don't struggle with",
            "Present bias — a normal pull toward an immediate reward that fake urgency can amplify",
            "A rule that means he should never buy shoes he actually wants” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "Present bias is common and normal, not a rare personal flaw — the fix is designing around it (automation, waiting periods), not just assuming some people simply lack willpower.",
        },
      },
      {
        id: "habits",
        kicker: "Make it automatic",
        title: "Habits that protect your goals",
        body: `A goal survives contact with real teen life when it's backed by habits, not just intentions. Build a short checklist you can actually repeat:\n\n• **Name it** — one sentence, one number, one date.\n• **Automate it** — set a recurring transfer or reminder the day you get paid.\n• **Separate it** — keep goal money out of your everyday spending balance.\n• **Review weekly** — two minutes checking progress beats a surprise at the deadline.\n• **Revise, don't quit** — if hours get cut, shrink the goal or extend the date instead of abandoning it.\n• **Protect it from FOMO** — a sale or a friend's plans don't get to override a goal you already named.\n\nNone of these habits require a finance degree. They require deciding once and repeating.`,
        callout: {
          label: "Try this week",
          text: "Pick one habit from this list and start it today — even if it's just moving $10 to a labeled savings spot the next time you're paid.",
        },
      },
      {
        id: "reflect",
        kicker: "Pause",
        title: "Before you move on — think",
        body: `Don't skip this one. Take 30 seconds and actually think through it before continuing — you don't need to write anything yet.\n\nPick one real thing you want in the next 1–3 months. Now answer, just in your head:\n\n• What's the actual dollar amount (or clear result)?\n• What's the realistic deadline?\n• What habit would fund it — and would it survive a bad week?\n\nIf you can't answer all three yet, that's useful information, not a failure. It means the goal needs one more round of SMART-ish thinking before it's ready to act on.`,
        callout: {
          label: "Try this",
          text: "Say your goal out loud, or text it to someone you trust. Goals that stay silent in your head are the easiest ones to quietly abandon.",
        },
      },
      {
        id: "mini-case",
        kicker: "Full scenario",
        title: "Deja's semester decision",
        image: "/images/lessons/fl-1-5.png",
        imageAlt: "Teen at a kitchen table with a phone, a calendar, and cash, weighing several upcoming expenses and goals",
        body: `Deja works 10 hours a week and nets about $130 every two weeks. Here's what's on her plate this semester:\n\n• Her phone screen is cracked — a repair costs **$90**, and she needs the phone for her work schedule (closer to a need).\n• Her friend group is planning a **$70** end-of-season outing in 6 weeks.\n• She wants to start a **$300** cushion before she gets her license and starts driving (medium-term goal).\n• Her hours might get cut during finals week — she doesn't know yet.\n\nDeja has 4 paychecks before the outing and about 10 paychecks before she expects her license.\n\nUsing what you've learned — horizons, SMART-ish goals, opportunity cost of not funding the phone repair, and pay-yourself-first — think through how Deja might sequence these three priorities. Which one is closest to a true need? Which has the most flexible deadline? What happens to her plan if hours actually get cut?\n\nThere's no single \"correct\" spreadsheet here — but a plan that funds the phone repair first, schedules a smaller weekly amount toward the outing, and starts the license cushion at a slower pace is a reasonable, SMART-ish sequence. A plan that ignores the phone repair to fund the outing sooner creates a bigger problem (unreliable phone for work) to solve a smaller one.`,
        callout: {
          label: "Why it matters",
          text: "Real financial decisions rarely involve just one goal. Sequencing priorities — instead of funding whichever one feels loudest — is the actual skill this lesson is building.",
        },
      },
      {
        id: "second-scenario",
        kicker: "Round two",
        title: "Jordan's next Friday — same paycheck, different plan",
        body: `Remember Jordan's $180 Friday from the hook? Here's the same situation with one SMART-ish goal added: save **$60** for a laptop charger before the next paycheck in three weeks.

**Without a plan (what happened):** $140 spent, $40 left, charger goal unfunded.

**With pay-yourself-first:**
• $60 moves to savings immediately → **$120** left to spend.
• Jordan still buys the concert ticket ($45) and eats out with friends ($35) → **$40** cushion remains.
• Charger goal: **on track** after one paycheck instead of zero progress.

Same income, same wants — but the goal competed on payday instead of hoping for leftovers that never showed up.`,
        bullets: [
          "**$60 first** → goal funded before wants get a head start.",
          "**$120 spending room** → fun still happens, just with a ceiling.",
          "**$40 cushion** → small surprise expenses don't wreck the week.",
        ],
        callout: {
          label: "Try this",
          text: "Pick one goal and one paycheck amount. Run both versions — plan first vs. spend first — on paper. Which ending feels less stressful?",
        },
        checkIn: {
          prompt: "Jordan nets $180 and wants $60 toward a charger in three weeks. Which move best matches pay-yourself-first from this lesson?",
          choices: [
            "Spend through the weekend, then save whatever is left Sunday night",
            "Transfer $60 to savings as soon as the deposit hits, then budget the remaining $120",
            "Skip the concert entirely because any fun spending breaks the goal",
            "Wait until the charger price drops — goals without deadlines usually fund themselves",
          ],
          correctIndex: 1,
          explanation:
            "Pay-yourself-first moves the goal amount before everyday spending competes. Skipping all fun or waiting for a price drop avoids the habit this lesson recommends.",
        },
      },
      {
        id: "recap",
        kicker: "Check yourself",
        title: "Quick recap — could you explain this?",
        body: `Before the Knowledge check, see if you can explain each of these in your own words:\n\n• **Money** is a tool for choices — not a scoreboard for your worth.\n• Goals have **horizons**: short, medium, and long term.\n• **SMART-ish** goals are specific, measurable, realistic, relevant, and timed.\n• **Pay yourself first** beats hoping leftovers appear.\n• **Present bias** pulls you toward "now" — automation and short waiting periods design around it.\n• Your **values** help you choose when you can't fund everything.\n\nIf any of those feel shaky, scroll back to that section before continuing — the quiz builds directly on this recap.`,
        checkIn: {
          prompt: "Which habit does the most to protect a savings goal from present bias?",
          choices: [
            "Waiting until you feel motivated enough to move money",
            "Checking your goal's progress once a year so it doesn't stress you out",
            "Comparing your progress to what friends post online to stay inspired",
            "Automating the transfer on payday, before spending happens",
          ],
          correctIndex: 3,
          explanation:
            "Automation removes the moment-to-moment willpower fight, moving money before present bias gets a chance to argue. Waiting for motivation feels responsible but rarely holds up week after week.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Money** is a **tool** for choices — not a scoreboard for your worth.\n• Goals have **horizons**: short, medium, and long term.\n• **SMART-ish** goals are specific, measurable, realistic, relevant, and timed.\n• Your **values** help you choose when you can't fund everything.\n• One clear goal you track beats ten vague wishes.\n\nWhen you're ready, switch to the **Knowledge check**, then write a short reflection about one money goal that matters to you.`,
      },
    ],
  },
  bigIdeas: [
    "**Money** is a tool for making choices over time — not a measure of personal worth.",
    "Naming **short-**, **medium-**, and **long-term** horizons makes goals easier to plan.",
    "**SMART-ish** goals (specific, measurable, realistic, relevant, timed) turn wishes into actions.",
    "**Pay yourself first** reliably funds goals; \"save the leftover\" usually does not.",
    "**Present bias** is normal — automation and short waiting periods design around it instead of relying on willpower.",
  ],
  keyTerms: [
    { term: "Money", definition: "What you use to buy things and save for future needs." },
    { term: "Goal", definition: "A specific result you want, ideally with a timeline and a way to measure progress." },
    { term: "Income", definition: "Money you receive from a job, allowance, gifts, or other sources." },
    { term: "Saving", definition: "Setting money aside for future use instead of spending it now." },
    { term: "Priority", definition: "Something you rank as more important than competing options." },
    { term: "Values", definition: "What you treat as important, which guides tradeoffs when money is limited." },
    { term: "SMART goal", definition: "A goal that is Specific, Measurable, Achievable, Relevant, and Time-bound." },
    { term: "Time horizon", definition: "How soon you want a goal — short, medium, or long term." },
    { term: "Pay yourself first", definition: "Moving money toward a goal the moment you're paid, before other spending happens." },
    { term: "Present bias", definition: "The common tendency to favor a smaller reward now over a bigger reward later." },
  ],
  realWorld:
    "A student who writes \"Save $200 for a phone repair fund by winter break\" (SMART-ish) is less likely to raid that money for random weekend spending than someone who only says \"I should save.\"",
  quiz: [
    {
      id: "q1",
      question:
        "Two students earn the same from a weekend job. One saves for a car; the other spends more on hangouts. What does this lesson say that difference mainly reflects?",
      choices: [
        "Proof that one student is smarter with numbers",
        "That saving is always the morally better choice",
        "Different values and priorities about what money should do",
        "That money only works as a plan once you earn more",
      ],
      correctIndex: 2,
      explanation:
        "Same income, different choices usually means different values — not a score of who's smarter. Saving isn't automatically \"more moral\"; it depends on what each person is aiming for.",
    },
    {
      id: "q2",
      question: "Saving for a used car over the next 18 months is best classified as which kind of goal?",
      choices: [
        "Medium-term — months to a couple of years",
        "Short-term — anything under two years counts as short",
        "Long-term — anything past next month is long-term",
        "Long-term — because owning a car can last many years",
      ],
      correctIndex: 0,
      explanation:
        "Horizons are about how soon you want the result, not how long you'll own the thing afterward. An 18-month save sits in the medium band — not short (under ~a few months) and not long just because cars last years.",
    },
    {
      id: "q3",
      question:
        "Amir wants $360 saved in 12 weeks and gets paid every two weeks. How much should he move per paycheck to hit the goal on time?",
      choices: ["$30", "$120", "$180", "$60"],
      correctIndex: 3,
      explanation:
        "12 weeks ÷ 2-week pay periods = 6 paychecks. $360 ÷ 6 = $60. $30 comes from dividing by weeks instead of paychecks — a common mix-up.",
    },
    {
      id: "q4",
      question: "Why does \"pay yourself first\" usually beat \"save whatever is left\"?",
      choices: [
        "It raises your hourly wage automatically",
        "The goal amount is moved before everyday spending can claim it",
        "It works best when you move whatever feels leftover right after payday",
        "Leftover saving works better for people with irregular hours",
      ],
      correctIndex: 1,
      explanation:
        "Moving a set amount first protects the goal from competing temptations. \"Whatever feels leftover after payday\" is still leftover saving — and leftover saving usually loses, even with irregular hours.",
    },
    {
      id: "q5",
      question: "Which statement about present bias is most accurate?",
      choices: [
            "It means every want you feel today is a bad purchase” belongs to a different situation than the one in the question stem",
            "It only hits people with weak willpower, so trying harder is the main fix” belongs to a different situation than the one in the question stem",
            "It's a common pull toward smaller rewards now; habits like auto-transfers reduce its pull",
            "It only matters for long-term investing, not teen goals” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Present bias is normal and common, not a character flaw limited to people with \"weak willpower.\" Designing habits (automation, short waits) works better than relying on constant willpower.",
    },
    {
      id: "q6",
      question:
        "A student says, \"I'll stay positive about my trip fund — I don't need a number or deadline.\" What's the main problem?",
      choices: [
            "Motivation helps, but without an amount, deadline, and funding habit the goal stays vague",
            "Deadlines usually hurt motivation, so skipping them is the safer plan” belongs to a different situation than the one in the question stem",
            "A clear deadline alone is enough; the dollar amount can stay flexible forever",
            "Numbers mainly matter for goals over $1,000; smaller ones can stay vague” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "Motivation helps you start, but money moves with a clear target, a deadline, and a habit. A deadline without an amount still leaves the goal fuzzy — and small goals need numbers too.",
    },
    {
      id: "q7",
      question:
        "Deja needs a $90 phone repair (she needs the phone for work) and wants a $70 friend outing in 6 weeks; her hours might get cut. Best sequencing?",
      choices: [
            "Pause both until her hours are guaranteed, then start from zero” belongs to a different situation than the one in the question stem",
            "Split every dollar 50/50 even if that delays the repair past when she needs the phone” belongs to a different situation than the one in the question stem",
            "Prioritize the phone repair that protects her income, then schedule smaller amounts toward the outing",
            "Fund the outing first because its deadline comes sooner” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Expenses that protect your ability to earn usually outrank wants when money is tight — a sooner deadline doesn't automatically outrank a bigger need. Even 50/50 splits can leave a critical need unfunded.",
    },
    {
      id: "q8",
      question: "When two goals compete for the same $40, what role should values play?",
      choices: [
            "They only matter after you've funded every want on your list” belongs to a different situation than the one in the question stem",
            "They replace any need to check the math or timeline” belongs to a different situation than the one in the question stem",
            "They prove which option will earn you more money later” belongs to a different situation than the one in the question stem",
            "They help you choose which tradeoff fits what matters most to you right now",
          ],
      correctIndex: 3,
      explanation:
        "Values don't skip the budget math — they help you pick when you can't fund everything. They aren't a promise of higher income or a reason to skip the numbers.",
    },
  ],
  reflection: {
    prompt:
      "Write one SMART-ish money goal for the next 1–3 months. Include the amount (or clear result), the deadline, and one habit that will fund it.",
    placeholder: "Example: Save $100 for homecoming by Oct 10 by putting $20 from each Friday paycheck into savings…",
  },
};
