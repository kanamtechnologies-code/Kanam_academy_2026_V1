import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson15: AILessonConfig = {
  id: "dl-15",
  title: "15. Digital Skills for Work & Career",
  goal: "Build the digital skills employers expect in almost every modern job — professional communication and email, a positive online presence, productivity and spreadsheet basics, remote collaboration, and readiness for college apps, internships, and first jobs.",
  xpReward: 750,
  badge: "Career Ready",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/14",
  nextHref: "/learn/digital/16",
  lessonModule: {
    durationLabel: "~11–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
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
        id: "everywhere",
        kicker: "The big idea",
        title: "Digital skills aren't just for 'tech jobs'",
        body: `It's tempting to think computer skills only matter if you want to be a programmer. That hasn't been true for a long time.\n\nA nurse charts patient data in software. A chef manages orders and inventory on a tablet. A farmer tracks crops in spreadsheets. A barber books clients in an app. A small-business owner does invoices, email, and social media. Almost every modern job runs on digital tools.\n\nThat's why digital skills are the new **"reading and writing" of the workplace** — a baseline everyone is assumed to have. No one lists "can read" on a résumé; soon "can use a spreadsheet and send a clear email" will feel just as basic.\n\nThe good news: you've already built a lot of this in earlier lessons (clear communication, online safety, judging information). Now we connect those to the world of work — with special focus on what it means to work **in tech**, where these skills go from "nice" to "essential."`,
        callout: {
          label: "Common misconception",
          text: "\"Digital skills only matter for programmers.\" In reality, nearly every job — healthcare, trades, retail, art, sports — now relies on digital tools. Strong digital skills make you more valuable in *any* field.",
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
        id: "collab",
        kicker: "Concept",
        title: "Calendars, remote collaboration, and reading data",
        body: `Modern work is also about *coordinating* with people, often from different places. A few more workplace essentials:\n\n• **Calendars & scheduling.** Digital calendars hold meetings, deadlines, and reminders. Managing your own time — blocking focus time, not double-booking — is a skill bosses notice immediately. Seniors: put college deadlines, scholarship due dates, and interview times on a calendar you actually check.\n• **Remote-collaboration tools.** Teams work together using chat tools (like **Slack** or **Microsoft Teams**), video calls (like **Zoom**), and **shared files** that multiple people edit at once. Knowing these means you can join a team and contribute on day one.\n• **Staying organized.** Clear file names, sensible folders, and saving to the cloud (from earlier lessons) keep a whole team unblocked.\n• **Basic data literacy.** A lot of work involves reading a chart or a number *critically*: What does this actually show? Is the comparison fair? Could it mislead? You don't need to be a statistician — just thoughtful.\n\nThese are the everyday gears of a digital workplace. Being comfortable with them lets you focus on doing great work instead of fighting the tools.`,
        callout: {
          label: "Pro tip",
          text: "When you join any team, learn their tools and naming habits early — where files live, which chat channel is for what. Fitting into a team's system fast is a quiet superpower that makes you look reliable.",
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
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've leveled up for the working world: digital skills matter in **every** career, a clean **online presence** and a **portfolio** help you get hired, **professional email** gets replies from busy adults, the **productivity suite** — especially **spreadsheets** with \`=SUM()\` and \`=AVERAGE()\` — does real work for you, and **calendars, remote tools, and data literacy** keep teams running. On top of that, use **AI honestly** and keep **upskilling**, because tech never stops changing.\n\nNone of this requires being a "computer genius." It requires being prepared and willing to learn — which, after this track, absolutely describes you.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on one career-ready skill you want to build first.`,
      },
    ],
  },
  bigIdeas: [
    "Digital skills are the **'reading and writing' of work** — needed in nearly every career, not just tech.",
    "A clean **online presence**, a **portfolio**, and clear **professional email** help you get hired; spreadsheets with \`=SUM()\`/\`=AVERAGE()\` do real work and **auto-update**.",
    "Use **AI honestly** and keep **upskilling** — the top career skill is learning how to learn.",
  ],
  keyTerms: [
    { term: "Productivity suite", definition: "A set of workplace tools for documents, presentations (slides), and spreadsheets." },
    { term: "Spreadsheet", definition: "A grid of rows, columns, and cells that stores data and computes with formulas — a super-powered calculator + table." },
    { term: "Formula (=SUM / =AVERAGE)", definition: "An instruction in a spreadsheet cell that calculates automatically; =SUM() adds a range and =AVERAGE() averages it." },
    { term: "Professional online presence", definition: "What employers find when they search you — your footprint, portfolio, and profiles like LinkedIn." },
    { term: "Remote collaboration", definition: "Working with a team across locations using chat (Slack/Teams), video (Zoom), and shared files." },
    { term: "Upskilling", definition: "Regularly learning new tools and skills throughout your career as technology changes." },
  ],
  realWorld:
    "Job listings across healthcare, trades, business, and tech routinely ask for spreadsheet skills, clear communication, and comfort with collaboration tools. College apps, scholarships, and internships reward the same basics — especially a clean footprint and professional email.",
  quiz: [
    {
      id: "q1",
      question: "A friend says they don't need digital skills because they want to be a chef, not a programmer. Why are digital skills described as the 'reading and writing' of the modern workplace?",
      choices: [
        "They're only needed if you want to be a programmer",
        "Almost every job now assumes you can use digital tools, so they're a baseline expectation",
        "They replace the need to read and write",
        "They only matter for very old companies",
      ],
      correctIndex: 1,
      explanation:
        "From nurses to chefs to business owners, nearly every career runs on digital tools. Like reading and writing, they're now assumed rather than optional.",
    },
    {
      id: "q2",
      question: "You're tracking internship hours in a spreadsheet. A cell contains =SUM(B2:B5). What does it do?",
      choices: [
        "Deletes cells B2 through B5",
        "Adds up the values in cells B2 through B5 and updates automatically if they change",
        "Averages the whole spreadsheet",
        "Turns the cells into text",
      ],
      correctIndex: 1,
      explanation:
        "=SUM(B2:B5) totals that range of cells. The key power is that it recalculates instantly when any of those numbers change.",
    },
    {
      id: "q3",
      question: "You're applying for a summer internship. What's the best reason to keep a clean public online footprint and build a portfolio?",
      choices: [
        "Social media never affects hiring",
        "Employers often search candidates and want evidence of your skills and reliability",
        "Portfolios are only for artists",
        "It guarantees a job with no interview",
      ],
      correctIndex: 1,
      explanation:
        "Many employers look you up. A clean footprint avoids red flags, and a portfolio *shows* what you can do — strong evidence a résumé alone can't provide.",
    },
    {
      id: "q4",
      question: "You need a teacher recommendation for a scholarship. Which email is closest to professional best practice?",
      choices: [
        "Subject: hey — body: can u write me a letter thx",
        "Subject: Recommendation request — Alex Kim, due April 10 — body: greeting, purpose, clear ask + deadline, attached résumé, polite sign-off",
        "No subject, just an attachment with no explanation",
        "ALL CAPS SUBJECT and a demand for a reply today",
      ],
      correctIndex: 1,
      explanation:
        "Professional email uses a specific subject, polite greeting, clear purpose and ask with a deadline, helpful attachments, and a courteous sign-off — making it easy for busy adults to help you.",
    },
    {
      id: "q5",
      question: "Your internship supervisor says you can use AI to draft a report. Which best captures the right way to use AI tools at work?",
      choices: [
        "Trust everything it outputs and present it as fully your own",
        "Use it to help, but verify its output, protect private data, and be honest about using it",
        "Never use AI for anything ever",
        "Only use AI for things that don't matter",
      ],
      correctIndex: 1,
      explanation:
        "AI is a powerful work tool, but the rules still apply: verify, protect sensitive data, and be honest. Blind trust or dishonesty can damage your reputation fast.",
    },
  ],
  reflection: {
    prompt:
      "Which career-ready digital skill from this lesson do you most want to build first — spreadsheets, a portfolio, a clean online presence, professional email, or collaboration tools? Why that one, and what's a small first step?",
    placeholder: "Example: I'll learn =SUM() and =AVERAGE() by making a spreadsheet to track my savings, so I get comfortable before I ever need it for a job…",
  },
};
