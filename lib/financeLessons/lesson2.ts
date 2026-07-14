import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson2: AILessonConfig = {
  id: "fl-2",
  title: "2. Needs, Wants & Tradeoffs",
  goal: "Tell needs from wants in everyday teen decisions, explain opportunity cost, spot advertising's influence, and practice delayed gratification without pretending wants are \"bad.\"",
  xpReward: 100,
  badge: "Tradeoff Thinker",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/1",
  nextHref: "/learn/finance/3",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-2.png",
        imageAlt: "Teen comparing a grocery receipt and a takeout bag on a kitchen counter, deciding what to buy",
        body: `Every dollar you spend is a choice — even when it feels automatic. Today you'll practice seeing those choices clearly: what's a **need**, what's a **want**, what you give up when you pick one option (**opportunity cost**), and how advertising quietly nudges which one feels more urgent.\n\nHere's our roadmap:\n\n• **Needs vs. wants** — and why the line can blur.\n• **Tradeoffs** — you rarely get everything at once.\n• **Opportunity cost** — the real price of \"yes.\"\n• **A worked example** — putting a number on what you gave up.\n• **A common myth** — busted, about sales and \"free\" savings.\n• **Advertising's influence** — how marketing rebrands wants as needs.\n• **A full case study** — practice deciding like a real person.\n\nThis is not about shaming fun. It's about making tradeoffs visible so you stay in control.`,
        callout: {
          label: "Why it matters",
          text: "People who can name the tradeoff before they spend are less likely to feel regret later — and more likely to fund the goals they said mattered.",
        },
      },
      {
        id: "hook",
        kicker: "Real talk",
        title: "The sneaker drop at 11:58 p.m.",
        body: `Two minutes before a limited sneaker drop, Marcus is staring at his phone. The countdown timer is red. A push notification says **\"Only a few pairs left — don't miss out.\"** His stomach tightens a little, even though thirty minutes ago he wasn't thinking about sneakers at all.\n\nHe has $85. Rent for his car insurance payment (his parents split it with him) is due in four days and costs $60. The sneakers are $80.\n\nNothing about the countdown timer knows anything about Marcus's insurance payment. It's not designed to. It's designed to make "later" feel like "too late." That gap — between what a timer wants you to feel and what your actual situation requires — is exactly what this lesson is about.`,
        callout: {
          label: "Keep this in mind",
          text: "We'll come back to timers, drops, and \"limited stock\" messaging later in this lesson — with a name for what they're doing to your brain.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `Core words for this lesson:\n\n• A **need** is something required for health, safety, or basic functioning in your situation (food, shelter, required school fees, gas to get to work).\n• A **want** is something you'd like but could live without for now (newest sneakers, extra streaming, upgrade snacks).\n• A **tradeoff** is giving up one option to get another.\n• **Opportunity cost** is the next-best thing you give up when you choose.\n• **Delayed gratification** means waiting for a better or more important result instead of grabbing the immediate reward.\n• **Advertising influence** is the effect marketing has on making a want feel urgent or necessary.\n• **Scarcity marketing** is a tactic that uses limited time or limited stock to pressure a fast decision.\n\nNeeds and wants can shift with context — that's normal. The skill is noticing which is which *for this decision*.`,
        callout: {
          label: "Pro tip",
          text: "Ask: \"What happens if I wait two weeks?\" If life still works, it was probably closer to a want than a need.",
        },
      },
      {
        id: "needs-wants",
        kicker: "The big idea",
        title: "Needs keep you going; wants make life nicer",
        image: "/images/lessons/fl-2-2.png",
        imageAlt: "Clean infographic split: Needs (food, transit, phone) vs Wants (games, snacks, concert) for high school life",
        body: `In personal finance, **needs** usually include basics like food, housing-related costs, essential clothing, and getting to school or work safely. **Wants** include nicer versions of those things and extras that add enjoyment.\n\nGray areas are real:\n\n• A phone plan might be a **need** for work and safety — but the newest flagship phone is often a **want**.\n• Eating is a **need** — DoorDash every night is usually a **want**.\n• School supplies for class are closer to a **need** — branded limited-edition gear may be a **want**.\n\nLabeling something a want does not make it \"bad.\" It means you should fund it *after* (or alongside) priorities you already named — and be honest about the tradeoff.`,
        bullets: [
          "**Need** ≈ required for functioning in your real life.",
          "**Want** ≈ desirable, optional, or upgrade.",
          "Gray areas exist — name them out loud instead of pretending.",
        ],
        callout: {
          label: "Watch out",
          text: "Marketing loves to rebrand wants as needs (\"You deserve this\"). Pause and ask whether skipping it actually harms health, safety, or required responsibilities.",
        },
        checkIn: {
          prompt:
            "Malik's job requires him to be reachable by text for shift changes, but he's also eyeing the newest flagship phone instead of just keeping his current plan active. How does this lesson frame the two?",
          choices: [
            "The flagship upgrade counts as a need too, since his job depends on having a phone at all",
            "Keeping a working phone plan active is the need; the flagship upgrade is the want",
            "Neither counts as a need, since paying for a plan is his parents' responsibility, not his",
            "Only wants apply here, since a job requiring a phone doesn't make the phone itself a need",
          ],
          correctIndex: 1,
          explanation:
            "A working plan supports basic functioning for his job — that's the need. Wanting the newest model is a want; needing a phone for work doesn't automatically stretch to needing the latest one.",
        },
      },
      {
        id: "tradeoffs",
        kicker: "Reality check",
        title: "Tradeoffs are normal — you can't buy everything",
        body: `You have limited money, time, and energy. That means **tradeoffs** are built into life — not a personal failure.\n\nExamples from a typical week:\n\n• Buy concert tickets → less left for gas this month.\n• Pick up an extra shift → more income, less free time.\n• Upgrade your phone early → delay the car fund.\n\nWhen money is tight, **total what your needs cost and compare that to cash you actually have** before you rank wants — the number tells you how much room (if any) wants get.\n\nA healthy money mindset does not pretend tradeoffs disappear. It makes them **conscious**. Unconscious tradeoffs feel like \"Where did my money go?\" Conscious tradeoffs feel like \"I chose this, so I won't also expect that.\"`,
        callout: {
          label: "Why it matters",
          text: "Learning the tradeoff habit now prepares you for bigger decisions later — a used car, college, your first apartment.",
        },
        checkIn: {
          prompt:
            "Devon picks up an extra shift this week, which means missing his friend's game night. What does this situation show, according to this lesson?",
          choices: [
            "That Devon is bad at managing his schedule",
            "That extra shifts are only worth it if there's zero cost involved",
            "That missing game night doesn't really count since he's getting paid",
            "A tradeoff — giving up one option to get another because time and money are limited",
          ],
          correctIndex: 3,
          explanation:
            "This is a normal tradeoff, not a scheduling failure. Getting paid doesn't erase the real cost of missing game night — it's still something he gave up.",
        },
      },
      {
        id: "opportunity-cost",
        kicker: "The real price",
        title: "Opportunity cost: what you give up",
        image: "/images/lessons/fl-2-3.png",
        imageAlt: "Photorealistic teen holding a wallet while friends invite them out; thought bubble style choice of save vs spend",
        body: `**Opportunity cost** is the value of the next-best alternative you did *not* choose. The sticker price of a purchase is only part of the story.\n\nIf you spend $60 on a new game:\n\n• You give up $60 that could have gone toward sneakers, gas, or savings.\n• You also give up whatever that $60 would have bought instead — that's the opportunity cost.\n\nOpportunity cost is not always money. Choosing three hours of scrolling might cost practice time, sleep, or a shift you could have worked.\n\nYou don't need a spreadsheet for every snack. Use the idea for decisions that are big *for you* — anything that would delay a goal you care about.`,
        bullets: [
          "Price tag ≠ full cost.",
          "Opportunity cost = the best option you skipped.",
          "Use it most on purchases that compete with your named goals.",
        ],
        callout: {
          label: "Pro tip",
          text: "Say the tradeoff in one sentence before you buy: \"If I get this, I'm choosing it instead of ___.\" If that sentence stings, reconsider.",
        },
        checkIn: {
          prompt:
            "Instead of adding $50 to her savings this week, Zoe spends it on a new game. What is the opportunity cost of that purchase?",
          choices: [
            "Only the enjoyment she gets from playing the new game",
            "Nothing, since the money was hers to spend either way",
            "The $50 of car-fund progress she gave up by not saving it",
            "Whatever her friends happened to spend that same week",
          ],
          correctIndex: 2,
          explanation:
            "Opportunity cost is the next-best thing you give up, not the enjoyment you gain. Saying \"the money was hers either way\" is true but misses that spending it still costs her the alternative use of it.",
        },
      },
      {
        id: "worked-example",
        kicker: "Do the math",
        title: "Putting a number on \"what I gave up\"",
        body: `Opportunity cost is easier to feel once you actually calculate it. Try this with a real decision.\n\n**The choice:** Spend **$45** on a concert ticket this weekend, or add it to a car fund that needs **$450** more.\n\n**Step 1 — Frame the alternative.** $45 toward the car fund would be **10%** of what's still needed ($45 ÷ $450).\n\n**Step 2 — Convert to time.** If you save about $60 a month toward the car fund, $45 is roughly **3 weeks** of progress.\n\n**Step 3 — Name it plainly.** \"Buying this ticket costs me about three weeks of car-fund progress.\"\n\n**Step 4 — Decide with the real number in front of you.** Maybe three weeks is worth it for this specific concert. Maybe it isn't. Either answer can be correct — the point is that you're deciding with the actual cost visible, not guessing.\n\nThis is the same math you'll use for bigger decisions later: rent versus roommates, a car payment versus a bus pass, a semester of full-time work versus part-time plus classes.`,
        callout: {
          label: "Try this",
          text: "Next time you're deciding on a $20+ purchase, convert it into \"weeks of progress\" on a goal you're funding. The number often changes the decision.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth, busted",
        title: "\"It's on sale, so it's basically free money saved\"",
        body: `A common myth: if something is 40% off, buying it \"saves\" you money. But you only save money compared to *not buying it at all* if you were already planning to buy it at full price. If you weren't planning to buy it, a sale doesn't save you anything — it just moves money out of your account that would have stayed there.\n\nA $50 item at 40% off costs $30. That's real money leaving your account — not $20 magically appearing in your savings. The opportunity cost of that $30 is exactly the same as any other $30 purchase: whatever else that $30 could have funded.\n\nSales can be genuinely useful when they're for something you already needed. The myth breaks when \"it's a good deal\" becomes the *reason* to buy something you weren't planning to buy.`,
        callout: {
          label: "Watch out",
          text: "\"You saved $20!\" messaging is designed to make spending feel like winning. Ask: would I have bought this anyway, at any price? If not, there's no savings — just spending.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it",
        title: "Practice: label it and name the cost",
        body: `Priya has $70. A limited-time flash sale email just landed for a $65 jacket she's never mentioned wanting before. She also has a $40 field trip fee due in two weeks that her family expects her to help cover.\n\nWork through it in your head: Is the jacket closer to a need or a want? What's the opportunity cost if she buys it? What happens to the field trip fee?`,
        checkIn: {
          prompt: "What's the strongest read of Priya's situation?",
          choices: [
            "The jacket is a want, and buying it risks not having enough for the required field trip fee — that's the opportunity cost",
            "The jacket becomes a need once it's marked down enough",
            "There's no real tradeoff, since $65 and $40 are both small amounts on their own",
            "The field trip fee can wait since it's not due for two weeks",
          ],
          correctIndex: 0,
          explanation:
            "A discount doesn't turn a want into a need. And even though the fee isn't due immediately, spending on an unplanned want now still risks leaving less for a fee she already knows is required.",
        },
      },
      {
        id: "advertising",
        kicker: "Spot the nudge",
        title: "How advertising turns wants into \"needs\"",
        image: "/images/lessons/fl-2-4.png",
        imageAlt: "Phone screen showing a flash-sale countdown timer and limited stock warning next to a shopping cart",
        body: `Advertising's job is to make a want feel urgent, necessary, or identity-defining. That's not automatically evil — it's how the ad is designed to work. Recognizing the tactic doesn't mean you can never enjoy a product; it means you get to decide with clear eyes instead of on autopilot.\n\nCommon tactics to recognize:\n\n• **Scarcity** — \"only 3 left,\" countdown timers, \"drops tonight only.\" Designed to create urgency that skips your normal decision process.\n• **Social proof** — \"everyone's wearing this,\" influencer hauls. Designed to make a want feel like a requirement to fit in.\n• **\"You deserve this\" framing** — reframes a want as something you're owed, especially after a hard week.\n• **Anchoring** — showing a crossed-out \"original price\" to make the sale price feel like a steal, even if the original price was inflated.\n\nThe fix isn't cynicism about every ad. It's a pause: \"Would I want this if there were no timer, no influencer, and no crossed-out price?\"`,
        callout: {
          label: "Pro tip",
          text: "If an ad is working on you, you'll feel a small urgency spike. That feeling is useful information — it means it's a good moment to slow down, not speed up.",
        },
      },
      {
        id: "comparison",
        kicker: "Compare",
        title: "Two responses to a flash sale",
        body: `Same flash sale, two different responses — and very different results over a year.\n\n**Response A — Buy in the moment.** You act while the countdown timer is running. You avoid the discomfort of missing out, but you also skip checking your actual budget, goals, or whether you wanted this an hour ago. Over a year, moments like this add up quietly.\n\n**Response B — Screenshot and wait 24 hours.** You save the item or add it to a cart, then walk away. If you still want it tomorrow with the same enthusiasm, and it fits your plan, you buy it then (many sales tactics create fake time pressure that doesn't actually expire the way the timer claims). If the pull faded, you just kept the money.\n\nResponse B doesn't ban buying things. It just moves the decision outside the artificial pressure the ad created.`,
        callout: {
          label: "Try this week",
          text: "Set yourself a personal rule: any non-essential purchase over an amount you choose gets a 24-hour wait, no exceptions for \"but it's ending soon.\"",
        },
      },
      {
        id: "delayed",
        kicker: "Timing",
        title: "Delayed gratification (without misery)",
        body: `**Delayed gratification** means choosing a later, better-aligned reward over an immediate one. It is a muscle, not a personality trait you either have or don't.\n\nHelpful versions:\n\n• Wait 24–48 hours on non-urgent online carts.\n• Save for the quality item you actually want instead of buying three cheap impulse versions.\n• Fund the goal first, then spend guilt-free on a planned want.\n\nUnhelpful versions:\n\n• Never allowing any fun (burnout leads to blowups).\n• Waiting forever with no plan (that's avoidance, not discipline).\n\nA balanced approach: protect needs and goals, then schedule some wants on purpose. Planned fun is part of a sustainable money life.`,
        callout: {
          label: "Watch out",
          text: "\"I'll start saving after I treat myself\" often becomes never. Flip it: small goal contribution first, then the treat if it still fits.",
        },
        checkIn: {
          prompt:
            "Nina wants to enjoy a $20 snack run with friends this weekend, but she also has a savings goal running. Which approach best matches healthy delayed gratification from this lesson?",
          choices: [
            "She skips the goal transfer for the week since one snack run won't matter much",
            "She funds her goal transfer first, then enjoys the snack run guilt-free if it still fits",
            "She avoids the snack run entirely, since any fun spending works against a goal",
            "She spends on the snack run first, then adds whatever's left over to her goal",
          ],
          correctIndex: 1,
          explanation:
            "Funding the goal first, then enjoying a planned want, is balanced delayed gratification. \"Spend first, save the leftover\" is exactly the approach this lesson warns tends to leave goals underfunded.",
        },
      },
      {
        id: "habits",
        kicker: "Make it automatic",
        title: "Habits that keep tradeoffs conscious",
        body: `Use this checklist when you're unsure about a purchase:\n\n• **Label it** — need, want, or gray area?\n• **Check goals** — does this help, hurt, or ignore a goal you named?\n• **Name the opportunity cost** — what else could this money or time do?\n• **Spot the nudge** — is a countdown, \"limited stock,\" or influencer post creating fake urgency?\n• **Choose timing** — buy now, wait 24 hours, or scale down?\n• **Decide and own it** — if you buy the want, enjoy it without rewriting history. If you skip it, credit yourself for funding the goal.\n\nRepeating this five-second mental checklist is what turns \"Tradeoff Thinker\" from a badge into an actual habit.`,
        callout: {
          label: "Try this week",
          text: "Before one non-essential purchase, write the opportunity cost in your notes app. That 10-second habit builds Tradeoff Thinker instincts.",
        },
      },
      {
        id: "reflect",
        kicker: "Pause",
        title: "Before you move on — think",
        body: `Take 30 seconds before continuing. You don't need to write anything yet — just think it through.\n\nRecall the last purchase over $20 you made that you didn't fully plan. Was it a need, a want, or a gray area? Was any part of the decision nudged by a sale, a timer, or seeing someone else buy something similar? What would you do differently if you replayed that exact moment with today's tools?\n\nThere's no grade on this one. The goal is noticing your own patterns, because patterns are what you can actually change.`,
        callout: {
          label: "Try this",
          text: "If a pattern came to mind (like flash sales getting you every time), write yourself one rule to test next time it happens.",
        },
      },
      {
        id: "mini-case",
        kicker: "Full scenario",
        title: "Tyler's game night dilemma",
        image: "/images/lessons/fl-2-5.png",
        imageAlt: "Teen looking at a laptop showing a video game storefront sale banner next to a jar labeled car fund",
        body: `Tyler has $95 in checking. Here's what's happening at once:\n\n• A video game he's wanted for months just dropped to **$35** for a "48-hour sale only" — real interest, but not urgent; the game isn't going anywhere permanently.\n• His car fund needs **$400** more, and he's been adding $50 every two weeks (about 8 more paychecks to go).\n• A friend is hosting a game night this weekend and asked everyone to chip in **$10** for snacks — a small, social, low-cost want.\n• Tyler's phone bill of **$25** auto-drafts in 3 days — a required need.\n\nWalk through it: which item is the true need? Which want has real, sustained interest versus manufactured urgency from the "48-hour" framing? What happens to the car fund pace if Tyler buys the game this week versus waiting for a future sale (which are common for games and rarely truly "only 48 hours")?\n\nA reasonable sequence: cover the phone bill (need) and the game night contribution (small, social, easily affordable want) without disrupting the car fund pace, then decide on the game with a 24–48 hour pause — since the "sale ends" urgency is mostly manufactured and similar sales tend to recur. If Tyler still wants it after the pause and it doesn't touch the car fund, that's a values-aligned yes.`,
        callout: {
          label: "Why it matters",
          text: "Recognizing which \"urgent\" deadline is real (a phone bill) versus manufactured (a recurring type of game sale) is the core skill of resisting advertising influence.",
        },
      },
      {
        id: "behavioral-trap",
        kicker: "Watch your brain",
        title: "Scarcity marketing: when \"almost gone\" hijacks tradeoffs",
        body: `**Scarcity marketing** uses limited time, limited stock, or countdown timers to make a want feel like a need-right-now. Marcus's sneaker drop is a textbook setup: red timer, "only a few left," and a price that barely fits his real obligations.

How it tricks tradeoff thinking:

• **Fake urgency** — "20 minutes left" replaces "do I actually need this?"
• **Social proof** — "everyone's buying" makes skipping feel like losing status.
• **Price anchoring** — the listed price becomes the only number you see, not the $60 insurance payment four days away.

You can't delete scarcity pressure, but you can slow it: name the **opportunity cost** out loud, check whether the timer is real (refresh the page — many "limited" drops restock), and use a 24-hour rule for non-essential buys over an amount you pick.`,
        callout: {
          label: "Watch out",
          text: "A countdown timer is a sales tool, not a calendar of your actual priorities. If it disappeared, would you still want the purchase tomorrow?",
        },
        checkIn: {
          prompt: "Marcus has $85, needs $60 for a shared car-insurance payment in four days, and sees a $80 sneaker drop ending in 20 minutes. What's the strongest tradeoff-aware response?",
          choices: [
            "Buy now — missing the drop costs more than missing the insurance payment",
            "Pause, name what he'd give up (insurance cushion + opportunity cost), and decide if sneakers beat that",
            "Assume the timer means the shoes are an investment that will rise in value",
            "Buy on credit so cash stays available for insurance",
          ],
          correctIndex: 1,
          explanation:
            "Tradeoff thinking names what you give up. Timers create urgency; they don't change whether a want outranks a near-term obligation.",
        },
      },
      {
        id: "recap",
        kicker: "Check yourself",
        title: "Quick recap — could you explain this?",
        body: `Before the Knowledge check, see if you can explain each of these in your own words:\n\n• **Needs** support basic functioning; **wants** add enjoyment or upgrades — and gray areas are normal.\n• **Opportunity cost** is the next-best thing you give up when you choose.\n• A **sale** only "saves" money if you were already planning that purchase at full price.\n• **Advertising tactics** like scarcity and social proof are designed to create urgency — noticing them is the skill.\n• **Delayed gratification** means waiting on purpose, with a plan — not forever, and not never having fun.\n\nIf any of those feel shaky, scroll back to that section before continuing.`,
        checkIn: {
          prompt: "A flash sale banner says \"Only 2 left — ends in 10 minutes!\" What's the smartest response from this lesson?",
          choices: [
            "Buy right away, since a countdown like that usually signals a genuinely rare deal",
            "Wait exactly 10 minutes to see if the timer is real before deciding",
            "Recognize the scarcity tactic, and ask whether you'd still want this without the timer",
            "Skip checking your budget since the item is probably cheap anyway",
          ],
          correctIndex: 2,
          explanation:
            "Scarcity messaging is designed to rush a decision, not to signal a rare deal. Watching the countdown play out still keeps you inside the manufactured urgency instead of stepping outside it.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Needs** support basic functioning; **wants** add enjoyment or upgrades.\n• **Tradeoffs** are normal because money and time are limited.\n• **Opportunity cost** is the next-best option you give up.\n• **Advertising** uses scarcity, social proof, and framing to make wants feel urgent — spotting it restores your choice.\n• **Delayed gratification** is waiting on purpose — with a plan, not forever.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on a recent tradeoff you made.`,
      },
    ],
  },
  bigIdeas: [
    "**Needs** support basic functioning; **wants** are optional or upgrades — and gray areas are normal.",
    "**Opportunity cost** is the next-best thing you give up when you choose.",
    "A sale only \"saves\" money if you were already planning that purchase at full price.",
    "**Advertising tactics** like scarcity and social proof are designed to make wants feel urgent — noticing them restores your choice.",
    "**Delayed gratification** means waiting on purpose so your spending matches your goals.",
  ],
  keyTerms: [
    { term: "Need", definition: "Something required for health, safety, or basic functioning in your situation." },
    { term: "Want", definition: "Something desirable that you could live without for now." },
    { term: "Tradeoff", definition: "Giving up one option in order to get another." },
    { term: "Opportunity cost", definition: "The value of the next-best alternative you did not choose." },
    { term: "Delayed gratification", definition: "Waiting for a later, better-aligned reward instead of taking the immediate one." },
    { term: "Scarcity marketing", definition: "Advertising that uses limited time or limited stock to pressure a fast decision." },
    { term: "Social proof", definition: "A persuasion tactic that uses \"everyone else has this\" to make a want feel necessary." },
    { term: "Anchoring", definition: "Showing an inflated \"original price\" so a sale price feels like a bigger deal than it is." },
    { term: "Scarcity (economics)", definition: "The reality that money, time, and resources are limited." },
    { term: "Impulse buy", definition: "A purchase made quickly without checking goals or opportunity cost." },
  ],
  realWorld:
    "Choosing $40 rideshares every weekend may feel small each time — but the opportunity cost might be a month of gas money or a chunk of a phone-repair fund. Naming that tradeoff changes the decision.",
  quiz: [
    {
      id: "q1",
      question:
        "Bailey works evenings and closes at 9pm. Which of these is closest to a need for getting home safely and to school on time?",
      choices: [
        "A reliable way to get to and from work and school, like gas money or a bus pass",
        "The newest phone model so she can film her commute",
        "A streaming subscription to pass time while waiting for rides",
        "Limited-edition sneakers she's been eyeing",
      ],
      correctIndex: 0,
      explanation:
        "Reliable transportation supports her safety, schooling, and income — that's the need. The other options are upgrades or entertainment, which are wants even though they feel appealing.",
    },
    {
      id: "q2",
      question:
        "Marco spends $55 on concert tickets instead of adding it to his car fund. What is the opportunity cost of that choice?",
      choices: [
        "Only the fun he has at the concert",
        "Zero, since the tickets were nonrefundable anyway",
        "Whatever his friends spent going to the same concert",
        "The $55 of car-fund progress he gave up",
      ],
      correctIndex: 3,
      explanation:
        "Opportunity cost is the next-best alternative given up, not the enjoyment gained. \"Nonrefundable\" describes the ticket policy, not whether the $55 could have gone toward his goal instead.",
    },
    {
      id: "q3",
      question:
        "A $60 jacket is on sale for $30. Jasmine wasn't planning to buy a jacket this month. What's the most accurate way to think about this purchase?",
      choices: [
        "She's saving $30 compared to doing nothing, so it's basically free money",
        "She's spending $30 she wasn't planning to spend — that's new spending, not a savings",
        "Since it's discounted, the jacket no longer counts as a want",
        "The discount cancels out any opportunity cost of buying it",
      ],
      correctIndex: 1,
      explanation:
        "A discount only \"saves\" money compared to buying at full price when you were already planning the purchase. Since Jasmine wasn't, the $30 is new spending with a real opportunity cost.",
    },
    {
      id: "q4",
      question: "Which of these is the clearest example of scarcity marketing?",
      choices: [
        "A store's everyday listed price with no time limit",
        "An ad that compares prices at three different stores",
        "A countdown timer with \"only 2 left\" messaging designed to rush your decision",
        "A return policy printed in plain, simple language",
      ],
      correctIndex: 2,
      explanation:
        "Scarcity marketing uses limited time or limited stock framing to create urgency and skip your normal decision process — that's the countdown timer, not a plain price or policy.",
    },
    {
      id: "q5",
      question:
        "Sam wants to buy a new game but decides to fund his savings goal first, then buy the game later if it still fits his budget. What does this show about delayed gratification?",
      choices: [
        "Waiting on purpose for a goal-aligned result instead of grabbing the immediate reward",
        "Putting every purchase on hold until the price drops further",
        "Letting someone else decide when he's allowed to buy things",
        "Skipping wants entirely until every medium-term goal is fully funded",
      ],
      correctIndex: 0,
      explanation:
        "Delayed gratification is purposeful waiting tied to a goal — not price-hunting forever, outsourcing the choice, or freezing every want until all other goals are done.",
    },
    {
      id: "q6",
      question: "Why can something like a phone plan be a gray area between a need and a want?",
      choices: [
        "Because the words \"need\" and \"want\" don't really apply to purchases under $50",
        "Because opportunity cost only applies to expensive items",
        "Because a phone is automatically a full need once you have a job",
        "Context matters — a basic plan may be a need for safety or work, while the newest model is usually a want",
      ],
      correctIndex: 3,
      explanation:
        "The same category can include both a functional need and a luxury upgrade want — it depends on context, not on price size or simply having a job.",
    },
    {
      id: "q7",
      question:
        "Devante sees a \"48-hour flash sale\" for something he never mentioned wanting before, while a required school fee is due soon. What's the strongest move?",
      choices: [
        "Buy the sale item immediately since the 48-hour deadline is real and non-negotiable",
        "Pause, recognize the sale's urgency is likely manufactured, and protect money for the required fee first",
        "Treat the sale item as a need now that it's discounted",
        "Split the money evenly between both, regardless of which one is required",
      ],
      correctIndex: 1,
      explanation:
        "A required fee with a real deadline should generally be protected before an unplanned want — flash-sale countdowns are typically manufactured urgency, not a truly one-time deadline.",
    },
    {
      id: "q8",
      question: "Which approach best shows conscious tradeoff thinking, according to this lesson?",
      choices: [
        "Buying first and figuring out your goals afterward",
        "Assuming a sale price erases any opportunity cost",
        "Naming out loud what you're choosing instead of, before you decide",
        "Copying whatever your friends decide to buy",
      ],
      correctIndex: 2,
      explanation:
        "Naming what you give up makes the tradeoff conscious — the core skill of this lesson. A sale price doesn't erase what you're giving up by spending.",
    },
  ],
  reflection: {
    prompt:
      "Describe a recent purchase (or almost-purchase). Was it a need, want, or gray area? What was the opportunity cost, and was any part of the decision nudged by advertising?",
    placeholder: "Example: I almost bought a $70 hoodie during a flash sale. It was a want. Opportunity cost was two weeks of gas money…",
  },
};
