import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson15: AILessonConfig = {
  id: "dl-15",
  title: "15. Computing, Careers & Connected Workplaces",
  goal: "Evaluate how computing connectivity affects career opportunity and workplace practices, then apply professional presence, productivity tools, and remote-collaboration norms for high school-to-work transitions.",
  xpReward: 750,
  badge: "Workplace Ready",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/14",
  nextHref: "/learn/digital/16",
  instructorScript: `**Coach's note**
Today's lesson: **Computing, Careers & Connected Workplaces**.

**Goal:** Evaluate how computing connectivity affects career opportunity and workplace practices, then apply professional presence, productivity tools, and remote-collaboration norms for high school-to-work transitions.

**How to facilitate**
1. Warm-up: ask students what they already think about "Connected work changes opportunity and expectations".
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
        title: "Connected work changes opportunity and expectations",
        body: `Whatever you end up doing — nurse, designer, engineer, mechanic, musician, business owner — you'll use digital tools every single day. The skills in this lesson are the ones employers quietly assume you already have. Today you'll get a head start on them.\n\nHere's our roadmap:\n\n• **Why digital skills matter in *every* career** — not just "tech jobs."\n• **A positive professional online presence** — your footprint and a simple portfolio.\n• **The productivity suite** — docs, slides, and especially **spreadsheets** (with real formulas).\n• **Calendars, remote collaboration, and data literacy.**\n• **Professional email** for teachers, counselors, colleges, and employers.\n• **Using AI at work honestly** and keeping a **growth mindset** as tech changes.\n\nThink of this as a sneak peek at "adulting" in a digital workplace — especially if you're aiming for college, an internship, a first job, or a career *in tech*.`,
        image: "/images/lessons/dl-15.png",
        imageAlt: "A teen at a laptop with a spreadsheet, a video-call window, and a tidy online profile",
        callout: {
          label: "Why it matters",
          text: "Digital skills are now the 'reading and writing' of the workplace — assumed, not optional. Showing up able to handle a spreadsheet, a shared doc, a clear email, and a video call makes you instantly more hireable than people who can't.",
        },
      },
      {
        id: "glossary",
        kicker: "Quick start",
        title: "Let's break down the words first",
        body: `This lesson uses some "workplace" words you may not have met yet. Here they are in plain English so they don't slow you down.\n\n• **Productivity suite** — a bundle of work tools for writing documents, making slides (presentations), and crunching numbers. (Google Workspace and Microsoft Office are the big two.)\n• **Spreadsheet** — a grid of boxes that can do math for you, like a super-powered table. Each box is a "cell."\n• **Formula** — a typed instruction in a spreadsheet cell that calculates for you (for example, "add these numbers up").\n• **Online presence** — everything someone finds when they search your name online.\n• **Portfolio** — a small collection of things you've made (code, art, a video) that *shows* what you can do.\n• **Remote collaboration** — working with a team from different places using chat apps, video calls, and shared files.\n• **Upskilling** — regularly learning new tools and skills as technology changes.\n\nGot the gist? Good — every one of these gets a fuller, example-filled explanation below.`,
        callout: {
          label: "Tip",
          text: "If only one of these sticks today, make it **spreadsheet**. It sounds boring, but it's the single skill employers mention most — and it's genuinely quick to learn.",
        },
      },
      {
        id: "why-it-matters",
        kicker: "Real stakes",
        title: "What happens when these skills are missing",
        body: `It's easy to assume "I'll pick this up when I need it." But small gaps show up at exactly the wrong moments:\n\n• **A messy résumé or blank portfolio** can knock you out of consideration before anyone even talks to you, regardless of how capable you actually are.\n• **Fumbling a shared spreadsheet or doc** in front of a team on day one signals unpreparedness, even if you're a fast learner once shown.\n• **A confusing or overly casual email** to a professor, admissions officer, or hiring manager can get ignored or answered last, simply because it's harder to act on.\n• **Struggling with a video call or chat tool** during a remote interview or internship can cost you time and confidence exactly when you need to make a good impression.\n\nNone of these require deep expertise to fix — just the baseline comfort this lesson builds. A little preparation now removes a lot of unnecessary friction later.\n\nThe skill underneath is choosing the platforms, tools, and formats (a spreadsheet, a professional email, a shared doc) that actually fit your audience and purpose at work.`,
        callout: {
          label: "Why it matters",
          text: "Employers rarely expect you to already know their specific tools. What they do expect is comfort with the general category — documents, spreadsheets, email, and video calls — so training you takes days, not months.",
        },
      },
      {
        id: "everywhere",
        kicker: "The big idea",
        title: "Connectivity reshapes careers — unevenly",
        body: `It's tempting to think computer skills only matter if you want to be a programmer. That hasn't been true for a long time.\n\nA nurse charts patient data in software. A chef manages orders and inventory on a tablet. A farmer tracks crops in spreadsheets. A barber books clients in an app. A small-business owner does invoices, email, and social media. Almost every modern job runs on digital tools.\n\nThat's why digital skills are the new **"reading and writing" of the workplace** — a baseline everyone is assumed to have. No one lists "can read" on a résumé; soon "can use a spreadsheet and send a clear email" will feel just as basic.\n\nThe good news: you've already built a lot of this in earlier lessons (clear communication, online safety, judging information). Now we connect those to the world of work — with special focus on what it means to work **in tech**, where these skills go from "nice" to "essential."`,
        callout: {
          label: "Common misconception",
          text: "\"Digital skills only matter for programmers.\" In reality, nearly every job — healthcare, trades, retail, art, sports — now relies on digital tools. Strong digital skills make you more valuable in *any* field.",
        },
      },
      {
        id: "everywhere-practice",
        kicker: "Apply it",
        title: "Spot the digital skill in three 'non-tech' jobs",
        body: `Let's find the hidden digital skill in careers that don't sound "techy" at all:\n\n• **A veterinarian** — logs patient records digitally, schedules appointments in software, and often emails clients test results and care instructions.\n• **A construction project manager** — tracks budgets and timelines in spreadsheets, shares blueprints and schedules through cloud file storage, and coordinates crews over group chat apps.\n• **A florist running a small shop** — manages online orders, posts on social media to attract customers, and tracks inventory and expenses digitally instead of on paper.\n\nNotice the pattern: none of these are "tech jobs," yet all three fail without basic digital comfort. The specific software varies, but the underlying skills — organizing digital information, communicating clearly online, and using a spreadsheet — transfer across almost any career you can imagine.`,
        checkIn: {
          prompt: "A friend wants to become a florist and says 'I don't need any digital skills for that.' Which is the most accurate response?",
          choices: [
            "“Digital skills are only useful for careers in software engineering” describes a different situation than the one in the question stem",
            "Picking “They're right — florists never touch computers” is a common mix-up that confuses a nearby idea with the right one",
            "Even a small flower shop typically uses digital tools for orders, social media marketing, and tracking inventory or expenses",
            "You might defend “Only large companies need any digital skills at all” in casual talk, but it fails the definition used here",
          ],
          correctIndex: 2,
          explanation:
            "Nearly every modern business, including a small flower shop, relies on digital tools for orders, marketing, and basic bookkeeping — digital skills show up far beyond obvious 'tech jobs.'",
        },
        callout: {
          label: "Pro tip",
          text: "When researching any career you're curious about, search '[job title] daily tasks' — you'll almost always spot software, spreadsheets, or digital communication hiding in the description.",
        },
      },
      {
        id: "presence",
        kicker: "Concept",
        title: "Build a positive professional online presence",
        body: `Before a company interviews you — or a college reads your application — someone often searches your name. What they find is your **online presence** — and it can open doors or quietly close them.\n\nThree things to build over time:\n\n• **A clean footprint.** Old public posts can resurface. Keep public content something you'd be fine with a future boss or admissions officer seeing. You don't need to be boring — just intentional.\n• **A simple portfolio.** A portfolio is a small collection of projects that *shows* what you can do — code you wrote, art you made, a video you edited, a write-up of something you built. "Show" beats "tell" in almost every field — and it helps for scholarships and internships too.\n• **Professional profiles.** Platforms like **LinkedIn** are where adults present their work history and skills. You don't need a full profile in middle school, but by junior/senior year it's worth a clean, simple one.\n\nEmployers look because skills and *reliability* are hard to judge from a résumé alone. A clean footprint plus a portfolio is real evidence you'll show up and do good work.`,
        bullets: [
          "Keep a **clean footprint** — public posts a boss could see are fine.",
          "Build a **portfolio** that *shows* your projects.",
          "Know that **LinkedIn**-style profiles are where professional networking lives.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"My social media has nothing to do with getting hired.\" Many employers (and some colleges) search candidates online. A messy public footprint can cost you an offer — and a clean one plus a portfolio can win you one.",
        },
      },
      {
        id: "presence-practice",
        kicker: "Apply it",
        title: "Compare two portfolio 'starter' options",
        body: `You don't need a fancy website to start a portfolio. Compare two realistic starting points:\n\n• **Option A — a single organized document or slide deck** listing 3–5 things you've made (a school project, a design, code, a video), each with one sentence describing what it is and what you did.\n• **Option B — nothing, because "I don't have anything impressive enough yet."**\n\nOption A wins every time, even with modest projects, because it gives a reader concrete evidence instead of empty claims. "I'm good with design" (Option B's vibe) is forgettable. "Here's a flyer I designed for my club's fundraiser, and here's the before/after" (Option A) is memorable and specific.\n\nThe lesson: **a small, real portfolio beats an imagined perfect one that never gets started.**`,
        checkIn: {
          prompt: "You've made a few small class projects but think none are impressive enough to be worth showing anyone. What's the better move?",
          choices: [
            "It can seem like never mention any of your projects to anyone, but that reading skips the distinction this question is testing",
            "It can seem like only include projects that already won an award, but that reading skips the distinction this question is testing",
            "Put together even a simple document listing a few real projects with a sentence each — concrete evidence beats waiting for perfection",
            "“Wait until you have something truly impressive before starting a portfolio” describes a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "A modest, real portfolio gives readers concrete evidence of your skills. Waiting for a 'perfect' project means you show up with nothing — a much weaker position than a simple, honest starter portfolio.",
        },
        callout: {
          label: "Pro tip",
          text: "Start your portfolio document today, even if it only has one project in it. It's far easier to add a second project to an existing list than to build one from scratch under time pressure later.",
        },
      },
      {
        id: "pro-email",
        kicker: "For older teens",
        title: "Professional email that gets replies",
        body: `Clear email is one of the highest-ROI skills for seniors. Counselors, professors, hiring managers, and scholarship committees get dozens of messages a day — the ones that are easy to answer get answered first.\n\nUse this shape every time:\n\n• **Subject line** — specific: \`Recommendation request — Jordan Lee, due March 15\` (not \`hey\` or \`question\`).\n• **Greeting** — \`Hi Ms. Lopez,\` or \`Dear Dr. Patel,\` (not \`yo\`).\n• **Purpose** — one sentence on why you're writing.\n• **The ask** — exactly what you need, and by when.\n• **Attachments** — PDFs with clear names (\`Lee_Resume.pdf\`); mention them in the body.\n• **Sign-off** — \`Thank you,\` / \`Best,\` + your full name + school/grade if helpful.\n\nAlso: use a professional-looking address for applications, proofread before send, and don't expect instant replies — follow up politely after a few business days if needed.\n\nYounger teens: the same shape works for emailing a teacher about a missing assignment.`,
        bullets: [
          "Specific subject + clear ask + deadline.",
          "Polite greeting and sign-off with your full name.",
          "Attach PDFs with clear filenames.",
          "Proofread; follow up once, politely, if needed.",
        ],
        callout: {
          label: "Pro tip",
          text: "When asking for a recommendation letter, give teachers at least 2–3 weeks, attach your résumé/activity list, and include the deadline and submission link. Make it easy for them to say yes.",
        },
      },
      {
        id: "spreadsheets",
        kicker: "Concept",
        title: "The productivity suite — and the power of spreadsheets",
        body: `Almost every workplace runs on a **productivity suite**: a set of tools for documents (writing), slides (presentations), and **spreadsheets** (numbers and tables). Docs and slides feel familiar. The one that surprises people — and that employers love — is the spreadsheet.\n\nA **spreadsheet** is a grid of **rows** (going across), **columns** (going down), and **cells** (each box where a row and column meet). Each cell holds a number, text, or a formula.\n\nWhat is it actually *for*? Tons of real work: budgets, to-do and inventory lists, tracking grades or sales, schedules, scholarship deadlines, and simple analysis of data.\n\nHere's the magic: a spreadsheet isn't just a table — it **does the math for you**, automatically. You use **formulas** for that. Two you'll use constantly:\n\n• \`=SUM()\` adds up a range of cells. \`=SUM(B2:B5)\` totals cells B2 through B5.\n• \`=AVERAGE()\` finds the average of a range. \`=AVERAGE(B2:B5)\` averages those same cells.\n\nThe best part: if you change a number, the formula **recalculates instantly**. That's why employers value spreadsheet skills — they turn hours of manual math into a few clicks that update themselves.`,
        bullets: [
          "**Rows, columns, cells** are the building blocks.",
          "Used for budgets, lists, tracking, and simple analysis.",
          "Formulas like \`=SUM()\` and \`=AVERAGE()\` do the math for you.",
          "Change a number and everything **updates automatically**.",
        ],
        image: "/images/lessons/dl-15-2.png",
        imageAlt: "A friendly spreadsheet grid with labeled rows, columns, and a highlighted cell showing a =SUM formula adding a column of numbers",
        callout: {
          label: "Common misconception",
          text: "\"A spreadsheet is just a boring table.\" It's actually a super-powered calculator + table: it computes with formulas and updates every total the instant you change a number. That automation is exactly why it's so valued at work.",
        },
      },
      {
        id: "spreadsheets-practice",
        kicker: "Level up",
        title: "Two more formulas worth knowing: COUNT and IF",
        body: `\`=SUM()\` and \`=AVERAGE()\` cover a lot, but two more formulas come up constantly once you start using spreadsheets for real tracking:\n\n• \`=COUNT()\` — counts how many cells in a range contain a number. Useful for questions like "how many shifts did I work this month?" when each shift is logged as a row.\n• \`=IF()\` — checks a condition and returns one thing if it's true, another if it's false. For example, \`=IF(B2>=90,"Pass","Review")\` looks at cell B2 and returns "Pass" if it's 90 or more, and "Review" otherwise.\n\nThe pattern behind all spreadsheet formulas is the same: **describe what you want calculated or checked, and the cell does it for every row instantly.** Once you're comfortable with \`=SUM()\` and \`=AVERAGE()\`, \`=COUNT()\` and \`=IF()\` are a small, natural next step — and they're exactly the kind of "one level up" skill that stands out on a résumé.`,
        checkIn: {
          prompt: "You want a spreadsheet to automatically show 'Pass' for any test score of 90 or above, and 'Review' otherwise. Which formula type does that job?",
          choices: [
            "=IF(), because it checks a condition and returns different results depending on whether it's true or false",
            "A common mix-up is to treat =AVERAGE() as enough, which confuses a nearby idea with the right one",
            "A common mix-up is to treat =SUM() as enough, which confuses a nearby idea with the right one",
            "A common mix-up is to treat =COUNT() as enough, which confuses a nearby idea with the right one",
          ],
          correctIndex: 0,
          explanation:
            "=IF() is built exactly for this: check a condition (score >= 90) and return one result if true, another if false — turning a manual judgment call into something the spreadsheet does automatically.",
        },
        callout: {
          label: "Pro tip",
          text: "You don't need to memorize formula syntax perfectly. Knowing that '=IF() checks a condition' and '=COUNT() counts entries' is enough to search for the exact syntax confidently when you need it.",
        },
      },
      {
        id: "collab",
        kicker: "Concept",
        title: "Remote collaboration is a shared system",
        body: `Modern work is also about *coordinating* with people, often from different places. A few more workplace essentials:\n\n• **Calendars & scheduling.** Digital calendars hold meetings, deadlines, and reminders. Managing your own time — blocking focus time, not double-booking — is a skill bosses notice immediately. Seniors: put college deadlines, scholarship due dates, and interview times on a calendar you actually check.\n• **Remote-collaboration tools.** Teams work together using chat tools (like **Slack** or **Microsoft Teams**), video calls (like **Zoom**), and **shared files** that multiple people edit at once. Knowing these means you can join a team and contribute on day one.\n• **Staying organized.** Clear file names, sensible folders, and saving to the cloud (from earlier lessons) keep a whole team unblocked.\n• **Basic data literacy.** A lot of work involves reading a chart or a number *critically*: What does this actually show? Is the comparison fair? Could it mislead? You don't need to be a statistician — just thoughtful.\n\nThese are the everyday gears of a digital workplace. Being comfortable with them lets you focus on doing great work instead of fighting the tools.`,
        callout: {
          label: "Pro tip",
          text: "When you join any team, learn their tools and naming habits early — where files live, which chat channel is for what. Fitting into a team's system fast is a quiet superpower that makes you look reliable.",
        },
      },
      {
        id: "collab-practice",
        kicker: "Apply it",
        title: "Scenario: a remote internship's first week",
        body: `You just started a remote summer internship. Your supervisor sends a message in a chat app: *"Can you take a look at the Q3 budget draft and share your thoughts by Friday?"* Let's walk through the digital skills this one message actually requires.\n\n• **Chat literacy** — reply promptly and clearly, and acknowledge the deadline ("Got it, I'll review it by Thursday and share notes.") rather than leaving it unanswered.\n• **Shared file access** — find the budget file in whatever shared drive or tool the team uses, and confirm you have the right permissions to comment.\n• **Basic data literacy** — actually read the numbers critically: does a total look right? Is a chart comparing things fairly?\n• **Calendar awareness** — if you need a call to discuss it, propose a specific time that doesn't clash with anything else on your calendar.\n\nOne short message, four quiet digital skills — exactly the kind of moment where a little preparation from this lesson pays off immediately.`,
        checkIn: {
          prompt: "Your remote internship supervisor messages you in a chat app asking you to review a budget file by Friday. What's the best first response?",
          choices: [
            "“Forward the message to a friend to handle instead” describes a different situation than the one in the question stem",
            "Reply promptly acknowledging the task and deadline, then locate the shared file and confirm you can access it",
            "“Ignore the message until Friday and hope you remember” describes a different situation than the one in the question stem",
            "You might defend “Reply only with 'ok' and nothing else” in casual talk, but it fails the definition used here",
          ],
          correctIndex: 1,
          explanation:
            "A clear, prompt acknowledgment shows reliability, and confirming file access early avoids a last-minute scramble — both are basic but highly valued remote-collaboration habits.",
        },
        callout: {
          label: "Pro tip",
          text: "In any remote role, replying quickly with even a short acknowledgment ('Got it, will do by Thursday') builds trust fast — silence, even when you're planning to do the work, reads as unreliable.",
        },
      },
      {
        id: "level-up-vocabulary",
        kicker: "Level up",
        title: "A few more workplace words worth knowing",
        body: `A handful of terms come up once you start reading job listings or joining a real team. Quick, plain-language versions:\n\n• **Async (asynchronous) communication** — messages or updates that don't require an immediate reply, like a written status update instead of a live meeting. Being clear in writing matters more when communication is async.\n• **Version history** — a record of every past change to a shared document, letting you see or restore an earlier version if something gets deleted or messed up.\n• **Onboarding** — the process of learning a new job's tools, systems, and expectations when you first start.\n• **Soft skills** — non-technical strengths like communication, reliability, and teamwork, which employers consistently rank as highly as technical skills.\n• **Deliverable** — a specific piece of work you're expected to produce and hand off, like a finished report or a completed design.\n\nThese words show up constantly in job postings and team conversations — recognizing them means you won't have to guess what's being asked of you.`,
        checkIn: {
          prompt: "A job posting says the role relies heavily on 'async communication.' What does that suggest about how you'll need to communicate?",
          choices: [
            "Communication skills won't matter for this role — familiar wording, wrong fit for what the prompt is actually asking",
            "Picking “You'll never need to write anything down” is a common mix-up that confuses a nearby idea with the right one",
            "You'll only communicate through video calls. That option sounds confident, but it leaves out the deciding constraint",
            "You'll often need to write clear, complete updates that others can understand without an immediate live conversation",
          ],
          correctIndex: 3,
          explanation:
            "Async communication means messages and updates often need to stand on their own, clearly, since a reply might not come right away — making clear writing especially important.",
        },
        callout: {
          label: "Tip",
          text: "If a job posting or team's culture leans heavily async, practice writing short, complete status updates now — it's a skill that reads as 'professional' the moment you start.",
        },
      },
      {
        id: "ai-growth",
        kicker: "Concept",
        title: "Use AI honestly — and never stop learning",
        body: `Two final career mindsets that matter a lot, especially in tech.\n\n**Use AI tools responsibly and honestly.** AI can speed up writing, coding, and research at work — but the rules from your AI lessons still apply: verify what it produces, protect private or company data, and be honest about what you used. Passing off AI work as fully your own, or trusting it blindly on important facts, can damage your reputation fast — including with college honor codes and internship supervisors.\n\n**Keep a growth mindset (upskilling).** Tech changes constantly — the exact tools you learn today will evolve. The people who thrive aren't the ones who "finished learning"; they're the ones who keep learning. **Upskilling** means regularly picking up new tools and skills throughout your career. Treat "I don't know this yet" as a starting point, not a wall.\n\nThis is the heartbeat of working in tech: the field rewards curious people who stay adaptable. The single most valuable skill is *learning how to learn*.`,
        callout: {
          label: "Common misconception",
          text: "\"I'll just learn all this later when I get a job.\" Employers expect you to arrive with the basics and keep growing. Starting now — and building the habit of upskilling — puts you years ahead.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build a tiny budget tracker in a spreadsheet, step by step",
        body: `Let's see a spreadsheet's magic firsthand. Imagine you're tracking what you spend planning a small event, so you don't blow your budget. Here's the little table we'll build:`,
        table: {
          columns: ["A: Item", "B: Cost ($)"],
          values: [
            ["Snacks", 24],
            ["Decorations", 15],
            ["Drinks", 12],
            ["Supplies", 9],
            ["TOTAL  =SUM(B2:B5)", 60],
          ],
          rowCount: 5,
        },
      },
      {
        id: "worked-2",
        kicker: "Worked example",
        title: "How the formula does the work for you",
        body: `Now let's walk through what's happening, step by step.\n\n**Step 1 — Set up rows and columns.** Column **A** lists each item; column **B** lists each cost. Each item sits in its own **row**.\n\n**Step 2 — Enter the costs.** You type the numbers into cells B2 through B5 (Snacks = 24, Decorations = 15, and so on).\n\n**Step 3 — Add a total with a formula.** In the total cell you type \`=SUM(B2:B5)\`. Instead of adding 24 + 15 + 12 + 9 by hand, the spreadsheet does it: **60**.\n\n**Step 4 — Watch it auto-update.** This is the payoff. Change Snacks from 24 to 30, and the total *instantly* becomes 66 — you don't redo any math. Want the average cost per item? Add \`=AVERAGE(B2:B5)\`.\n\nThat automatic recalculation is the whole point. Now imagine a budget with 500 rows, updated daily — a formula handles it in a blink. That's why "knows spreadsheets" is on so many job listings.`,
        code: `B6: =SUM(B2:B5)        → 60   (adds all four costs)
B7: =AVERAGE(B2:B5)    → 15   (average cost per item)

# Change B2 from 24 to 30...
B6 instantly becomes 66    # you re-do ZERO math by hand`,
        codeCaption: "Two formulas that compute — and recompute — for you",
        image: "/images/lessons/dl-15-3.png",
        imageAlt: "A small budget spreadsheet where changing one cost value instantly updates the total, shown with a refresh arrow",
        callout: {
          label: "Pro tip",
          text: "If you only learn one work skill from this whole track, make it basic spreadsheets. \`=SUM()\` and \`=AVERAGE()\` alone will make you look capable in a huge range of jobs — and they take ten minutes to learn.",
        },
      },
      {
        id: "career-checklist",
        kicker: "Take action",
        title: "Your career-readiness quick check",
        body: `Run through these six quick questions to see where you already stand, and what's worth building next:\n\n1. **Portfolio** — do I have even one document listing real things I've made?\n2. **Footprint** — have I searched my own name recently to see what's public?\n3. **Email** — could I write a clear, professional email with a specific subject and ask right now?\n4. **Spreadsheets** — do I know what \`=SUM()\` and \`=AVERAGE()\` do, and could I build a simple tracker?\n5. **Collaboration** — am I comfortable with a shared doc, a chat tool, and a video call?\n6. **Growth mindset** — do I treat "I don't know this yet" as a starting point rather than a wall?\n\nYou don't need a "yes" on all six today. Picking just one "not-yet" and turning it into a "yes" this month is exactly what career readiness looks like in practice.`,
        checkIn: {
          prompt: "Running through this checklist, you realize you've never actually searched your own name online. What's the most useful next step?",
          choices: [
            "Wait until after you've already applied somewhere to check” belongs to a different situation than the one in the question stem",
            "Skip it — it doesn't matter what's publicly findable about you” belongs to a different situation than the one in the question stem",
            "Search your own name and any public usernames now, the way an employer or admissions reader might",
            "Delete every social media account immediately without looking first” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "A quick self-search shows you exactly what a stranger — including a future employer or admissions reader — would find, giving you the chance to fix anything before it matters, not after.",
        },
        callout: {
          label: "Try this today",
          text: "Pick just ONE item from this checklist to actually complete this week — a portfolio doc, a self-search, or learning =SUM(). Small, specific action beats a long mental to-do list.",
        },
      },
      {
        id: "email-scenario-2",
        kicker: "Mini scenario",
        title: "Second case: the recommendation-letter follow-up",
        body: `Taylor asked a teacher for a recommendation letter two weeks ago. The deadline is in five days. No reply. Taylor is tempted to send "??? did u get my email???"\n\n**Before:** vague, emotional follow-up that makes the teacher feel nagged and still doesn't say what's needed.\n\n**After:** short, professional note — subject line restates the deadline, body thanks them, mentions the portal link and the due date, offers to resend materials, signs off with full name.\n\nThe teacher replies within an hour: "Thanks for the reminder — submitting tonight."\n\nWork communication isn't about being fancy. It's about making it **easy for a busy person to say yes** and know exactly what you need.`,
        callout: {
          label: "Try this week",
          text: "Save a follow-up email template in your notes app — greeting, purpose, deadline, thanks, sign-off. Customize in thirty seconds when you need it.",
        },
        checkIn: {
          prompt: "Which subject line best fits a professional follow-up about a recommendation letter due Friday?",
          choices: [
            "URGENT READ NOW” belongs to a different situation than the one in the question stem",
            "Reminder: Recommendation letter due Friday, March 14 — Taylor Kim",
            "“hello??” describes a different situation than the one in the question stem",
            "“yo” describes a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "A clear subject with the deadline and your name helps busy readers prioritize and act — exactly what professional email habits teach.",
        },
      },
      {
        id: "spreadsheet-before-after",
        kicker: "Before & after",
        title: "Tracking applications: chaos vs. one sheet",
        body: `**Before:** deadlines in head, passwords on sticky notes, three portals with different logins, missed one essay because "I thought it was next week."\n\n**After:** one spreadsheet — columns for school/program, deadline, status, login email, documents needed, date submitted. Sorted by due date. Checked twice a week.\n\nSame student, same opportunities — wildly different stress level.\n\nYou don't need advanced formulas on day one. You need **one honest home base** that shows what's due before you're in panic mode.`,
        callout: {
          label: "Try this week",
          text: "Start a simple tracker with five rows — even if you only have five applications. Building the habit early beats building it during the busiest week.",
        },
      },
      {
        id: "work-red-flags",
        kicker: "Red flags",
        title: "Digital habits that make you look unprepared",
        body: `These show up in internships, first jobs, and even serious volunteer roles:\n\n• **No subject line** or subject lines that say "hi."\n• **Attachments named** \`document1.pdf\` — reviewers can't tell files apart.\n• **Reply-all accidents** on threads with dozens of people.\n• **Missing deadlines** because they lived only in your head, not a shared calendar or sheet.\n• **"I don't know how to share a doc"** on day three of a remote project — collaboration tools are baseline now.\n• **Public drama** on accounts linked to your real name.\n\nThe fix isn't perfection. It's noticing which red flags are yours and closing them **before** someone hiring you notices first.`,
        callout: {
          label: "Watch out",
          text: "Employers often forgive inexperience. They rarely forgive careless communication on something you had time to prepare.",
        },
      },
      {
        id: "career-try-week",
        kicker: "Try this week",
        title: "Three career habits you can start this week",
        body: `Pick one — or do all three if you're feeling ambitious:\n\n1. **Draft one professional email** — even if you don't send it yet. Recommendation request, internship inquiry, or thank-you to a mentor. Use the greeting → purpose → ask → sign-off shape.\n2. **Build a five-row tracker** — scholarships, jobs, or college tasks with deadlines and status columns.\n3. **Share one doc properly** — set permissions, use Suggesting mode, and practice finding version history on a real group assignment.\n\nNone of these require a job title. They're the habits hiring managers mean when they say "strong communicator" and "comfortable with digital tools" — and they're the same habits that make senior year less chaotic.`,
        callout: {
          label: "Pro tip",
          text: "After you send a professional email, save a anonymized version as a template. Future applications get faster every time you reuse the structure.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've leveled up for the working world: digital skills matter in **every** career, a clean **online presence** and a **portfolio** help you get hired, **professional email** gets replies from busy adults, the **productivity suite** — especially **spreadsheets** with \`=SUM()\`, \`=AVERAGE()\`, \`=COUNT()\`, and \`=IF()\` — does real work for you, and **calendars, remote tools, and data literacy** keep teams running. On top of that, use **AI honestly** and keep **upskilling**, because tech never stops changing.\n\nNone of this requires being a "computer genius." It requires being prepared and willing to learn — which, after this track, absolutely describes you.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on one career-ready skill you want to build first.`,
      },
    ],
  },
  bigIdeas: [
    "Computing connectivity changes career access, productivity, and collaboration — with benefits and equity tradeoffs worth evaluating.",
    "A professional presence, portfolio, clear communication, and fit-for-purpose productivity tools make work visible, organized, and trustworthy.",
    "Remote teams rely on explicit norms: timely acknowledgement, accessible documentation, clear ownership, and respect for availability.",
  ],
  keyTerms: [
    { term: "Productivity suite", definition: "A set of workplace tools for documents, presentations (slides), and spreadsheets." },
    { term: "Spreadsheet", definition: "A grid of rows, columns, and cells that stores data and computes with formulas — a super-powered calculator + table." },
    { term: "Formula (=SUM / =AVERAGE / =IF)", definition: "An instruction in a spreadsheet cell that calculates automatically; =SUM() adds a range, =AVERAGE() averages it, and =IF() checks a condition." },
    { term: "Professional online presence", definition: "What employers find when they search you — your footprint, portfolio, and profiles like LinkedIn." },
    { term: "Connected workplace", definition: "A workplace where networked tools connect people, information, customers, and services across locations." },
    { term: "Remote collaboration norms", definition: "Shared expectations for clear updates, ownership, documentation, accessibility, response time, and respectful use of others' time." },
    { term: "Upskilling", definition: "Regularly learning new tools and skills throughout your career as technology changes." },
  ],
  realWorld:
    "Job listings across healthcare, trades, business, and tech routinely ask for spreadsheet skills, clear communication, and comfort with collaboration tools. College apps, scholarships, and internships reward the same basics — especially a clean footprint and professional email.",
  quiz: [
    {
      id: "q1",
      question: "A friend says they don't need digital skills because they want to be a chef, not a programmer. Why are digital skills described as the 'reading and writing' of the modern workplace?",
      choices: [
            "Almost every job now assumes you can use digital tools, so they're a baseline expectation",
            "They replace the need for people skills or trade skills” belongs to a different situation than the one in the question stem",
            "They matter most in tech companies and almost nowhere else” belongs to a different situation than the one in the question stem",
            "They're optional extras once you already know the job's core craft” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "From nurses to chefs to business owners, nearly every career runs on digital tools. Like reading and writing, they're now assumed rather than optional.",
    },
    {
      id: "q2",
      question: "You're tracking internship hours in a spreadsheet. A cell contains =SUM(B2:B5). What does it do?",
      choices: [
            "Deletes cells B2 through B5” belongs to a different situation than the one in the question stem",
            "Adds up the values in cells B2 through B5 and updates automatically if they change",
            "“Turns the cells into text” describes a different situation than the one in the question stem",
            "Averages the whole spreadsheet” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "=SUM(B2:B5) totals that range of cells. The key power is that it recalculates instantly when any of those numbers change.",
    },
    {
      id: "q3",
      question: "You're applying for a summer internship. What's the best reason to keep a clean public online footprint and build a portfolio?",
      choices: [
            "It guarantees a job with no interview” belongs to a different situation than the one in the question stem",
            "Portfolios are only for artists” belongs to a different situation than the one in the question stem",
            "Social media never affects hiring” belongs to a different situation than the one in the question stem",
            "Employers often search candidates and want evidence of your skills and reliability",
          ],
      correctIndex: 3,
      explanation:
        "Many employers look you up. A clean footprint avoids red flags, and a portfolio *shows* what you can do — strong evidence a résumé alone can't provide.",
    },
    {
      id: "q4",
      question: "You need a teacher recommendation for a scholarship. Which email is closest to professional best practice?",
      choices: [
            "It can seem like aLL CAPS SUBJECT and a demand for a reply today, but that reading skips the distinction this question is testing",
            "Subject: Recommendation request — Alex Kim, due April 10 — body: greeting, purpose, clear ask + deadline, attached résumé, polite sign-off",
            "It can seem like no subject, just an attachment with no explanation, but that reading skips the distinction this question is testing",
            "It can seem like subject: hey — body: can u write me a letter thx, but that reading skips the distinction this question is testing",
          ],
      correctIndex: 1,
      explanation:
        "Professional email uses a specific subject, polite greeting, clear purpose and ask with a deadline, helpful attachments, and a courteous sign-off — making it easy for busy adults to help you.",
    },
    {
      id: "q5",
      question: "Your internship supervisor says you can use AI to draft a report. Which best captures the right way to use AI tools at work?",
      choices: [
            "Use it to help, but verify its output, protect private data, and be honest about using it",
            "Trust everything it outputs and present it as fully your own” belongs to a different situation than the one in the question stem",
            "“Never use AI for anything ever” describes a different situation than the one in the question stem",
            "Only use AI for things that don't matter” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "AI is a powerful work tool, but the rules still apply: verify, protect sensitive data, and be honest. Blind trust or dishonesty can damage your reputation fast.",
    },
    {
      id: "q6",
      question: "You want a spreadsheet to automatically display 'Pass' for a score of 90 or higher, and 'Review' otherwise. Which formula is built for that?",
      choices: [
            "It can seem like =COUNT(), but that reading skips the distinction this question is testing",
            "=IF(), because it checks a condition and returns different results based on whether it's true or false",
            "It can seem like =AVERAGE(), but that reading skips the distinction this question is testing",
            "A common mix-up is to treat =SUM() as enough, which confuses a nearby idea with the right one",
          ],
      correctIndex: 1,
      explanation:
        "=IF() evaluates a condition and returns one result if it's true and another if it's false — exactly the kind of automatic decision-making this scenario calls for.",
    },
    {
      id: "q7",
      question: "You've made a few modest class projects but think none are impressive enough for a portfolio yet. What's the better move?",
      choices: [
            "“Never show anyone any of your work” describes a different situation than the one in the question stem",
            "Only include projects that already won a formal award” belongs to a different situation than the one in the question stem",
            "Wait indefinitely for a 'perfect' project before starting anything” belongs to a different situation than the one in the question stem",
            "Put together a simple document listing the real projects you have, with a sentence describing each one",
          ],
      correctIndex: 3,
      explanation:
        "A modest, honest portfolio with real evidence beats an imagined perfect one that never gets started. Concrete examples, even small ones, are more persuasive than vague claims.",
    },
    {
      id: "q8",
      question: "Your remote internship supervisor messages you in a chat app asking you to review a file by Friday. What's the best first response?",
      choices: [
            "Forward the request to someone else without saying anything” belongs to a different situation than the one in the question stem",
            "Say nothing until Friday and hope you remember on your own” belongs to a different situation than the one in the question stem",
            "Reply promptly acknowledging the task and deadline, then confirm you can access the shared file",
            "“Reply with just 'ok' and nothing else” describes a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "A clear, prompt acknowledgment builds trust, and confirming file access early avoids a last-minute scramble — both are simple but highly valued remote-collaboration habits.",
    },
  ],
  reflection: {
    prompt:
      "Evaluate one connected-work practice you expect to use in a class, job, or internship. Name one benefit and one tradeoff (including access or equity), then write a professional norm or tool choice that makes collaboration clearer and more inclusive.",
    placeholder: "Practice: shared project chat. Benefit: … Tradeoff: … Norm/tool choice: I will … because …",
  },
};
