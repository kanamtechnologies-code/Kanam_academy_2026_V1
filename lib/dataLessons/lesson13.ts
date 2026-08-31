import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";
import { normSql, STUDY_SCORE_SEED } from "@/lib/dataLessonHelpers";

export const daLesson13: DataLessonConfig = {
  id: "da-13",
  title: "13. Relationships",
  goal: "Use a scatter plot to see whether two numbers are related — does more studying go with higher scores?",
  xpReward: 650,
  badge: "Relationship Finder",
  previewTable: "study_log",
  seedData: STUDY_SCORE_SEED,
  prevHref: "/learn/data/12",
  nextHref: "/learn/data/14",
  dashboardHref: "/dashboard",
  chartConfig: {
    type: "scatter",
    xKey: "study_minutes",
    yKey: "score",
    title: "Study time vs. quiz score",
  },
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Your charts so far have each looked at *one* number per item. Today you'll level up to the **scatter plot** — the chart that compares *two* numbers at once to reveal whether they're connected.\n\nHere's your roadmap:\n\n• **What a scatter plot answers** — do two numbers move together?\n• **How to read** dots, trends, and outliers.\n• **The golden rule**: correlation is not causation.\n• A **worked example** reading a real relationship before you build your own.\n\nThis is the chart scientists, doctors, and sports analysts reach for. Does more practice go with better free-throw percentage? Does more sleep go with faster reaction time? Today's question is the classic: *does more studying go with higher test scores?* A scatter plot can show you.`,
        image: "/images/lessons/lesson-scatter.png",
        imageAlt: "A scatter plot of study time versus test score, with dots trending upward",
        callout: {
          label: "Why it matters",
          text: "Scientists, doctors, and sports analysts use scatter plots to spot relationships — height vs. shoe size, practice vs. performance, temperature vs. ice-cream sales.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "A scatter plot shows if two things are related",
        body: `A **scatter plot** asks a powerful question: *do two numbers move together?* Every other chart so far used one number per item; a scatter plot uses **two**, placing each dot by both values at once.\n\nThink of plotting your friends by height *and* shoe size. Each friend is one dot — across for height, up for shoe size. If taller friends generally have bigger feet, the cloud of dots will tilt **up and to the right**. You're not reading any single dot; you're reading the *pattern* the whole cloud makes.\n\nThat tilt is the answer. If the dots climb up to the right, the two things tend to grow together — like study time and test scores. If they slope down, one rises as the other falls. If it's a shapeless blob, there's probably no relationship at all.`,
        callout: {
          label: "Common misconception",
          text: "Don't judge a relationship from one or two dots — read the whole cloud. A single high-scoring student who barely studied doesn't break the trend; it's just one point. The pattern of *all* the dots is what matters.",
        },
        checkIn: {
          prompt: "If the cloud of dots tilts up and to the right, what does that mean?",
          choices: [
            "As one number goes up, the other tends to go up too — a positive relationship",
            "The data must be wrong",
            "The two numbers have no relationship",
          ],
          correctIndex: 0,
          explanation: "An upward-tilting cloud means the two values tend to rise together — that's what a positive relationship looks like on a scatter plot.",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "New words for this lesson",
        body: `A few terms will make today's ideas click faster.`,
        bullets: [
          "**Scatter plot** — a chart that places one dot per record using two numbers at once.",
          "**Positive relationship** — as one number rises, the other tends to rise too (dots trend up-right).",
          "**Negative relationship** — as one number rises, the other tends to fall (dots trend down-right).",
          "**Outlier** — a dot far away from the rest of the cloud.",
          "**Correlation** — a measurable tendency for two numbers to move together.",
          "**Causation** — one thing actually *making* another thing happen (correlation alone never proves this).",
        ],
      },
      {
        id: "anatomy",
        kicker: "How to read it",
        title: "Two numbers, one dot",
        body: `Here's the scatter plot you'll build from \`study_log\`. Read it in three parts:\n\n• The **x-axis** is one number — **study_minutes** (how long they studied).\n• The **y-axis** is another number — **score** (how they did).\n• Each **dot** is one student, placed by *both* of their numbers at once.\n\nThe dots climb from bottom-left to top-right: students who studied longer tended to score higher. That upward tilt is called a **positive relationship**. Following the cloud, the story is clear before you read a single exact value.`,
        chart: {
          config: { type: "scatter", xKey: "study_minutes", yKey: "score", title: "Study time vs. quiz score" },
          result: {
            columns: ["study_minutes", "score"],
            values: [
              [20, 65], [35, 72], [50, 80], [15, 60], [60, 85], [45, 78],
              [70, 90], [30, 70], [80, 95], [25, 68], [55, 82], [40, 75],
            ],
            rowCount: 24,
          },
        },
        checkIn: {
          prompt: "On this scatter plot, what does each individual dot represent?",
          choices: [
            "One student, placed by both their study minutes and their score",
            "One minute of study time",
            "The average score of the whole class",
          ],
          correctIndex: 0,
          explanation: "A scatter plot needs two numbers per record. Each dot represents one student, positioned using both of their values at once.",
        },
      },
      {
        id: "when",
        kicker: "Choose wisely",
        title: "Reading relationships honestly",
        body: `A scatter plot is a clue-finder, not a proof machine. It points you toward relationships worth investigating — but reading it honestly takes care.`,
        bullets: [
          "**Use a scatter plot** when you have two numbers per record and want to see if they're related.",
          "Dots up to the right = **positive** relationship; down to the right = **negative**; no pattern = **no** relationship.",
          "A single far-off dot is an **outlier** — worth a closer look.",
        ],
        callout: {
          label: "Correlation is not causation",
          text: "Two things moving together does NOT prove one causes the other. More studying might raise scores — or maybe motivated students both study more AND score higher, so a hidden third thing drives both. A scatter plot shows a link, never a cause. Stay curious.",
        },
      },
      {
        id: "data",
        kicker: "Your dataset",
        title: "The data you'll use: study_log",
        body: `The **study_log** table has two numbers per student: **study_minutes** and **score** (sample rows below). There are 24 students in all.\n\nTo build the plot, you'll return **both** number columns. The first becomes the x position, the second the y position, and each student turns into one dot. No grouping or counting — the relationship is already in the raw rows.`,
        table: {
          columns: ["student_name", "study_minutes", "score"],
          values: [
            ["Alex", 20, 65],
            ["Casey", 60, 85],
            ["Quinn", 90, 97],
            ["Riley", 15, 60],
          ],
          rowCount: 4,
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Read a relationship before you build one",
        body: `Let's read a different scatter plot together — one about basketball. Imagine you tracked five players' **practice hours per week** and their **free-throw percentage**.\n\n**Step 1 — place a couple of dots:** the player with 2 hours sits low-left (55%); the player with 10 hours sits high-right (88%). **Step 2 — read the cloud:** as practice hours go up, the percentage climbs too — the dots trend up and to the right, a **positive relationship**. **Step 3 — pause on causation:** does practice *cause* better shooting? Maybe — or maybe the most talented players also choose to practice more. The plot shows a link, not a reason.\n\nTo build this chart from a query, you'd return the two number columns (hours and percent); each player becomes one dot.`,
        table: {
          columns: ["practice_hours", "free_throw_pct"],
          values: [
            [2, 55],
            [4, 64],
            [6, 72],
            [8, 80],
            [10, 88],
          ],
          rowCount: 5,
        },
        callout: {
          label: "Pro tip",
          text: "Before claiming \"X causes Y,\" ask: could a third thing cause both? Could the cause run the other way? Good analysts report what the dots *show* and stay honest about what they can't prove. To name the **extreme dot** (most study time, highest score), use `ORDER BY study_minutes DESC LIMIT 1` — same top-one recipe as a leaderboard.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "A relationship is a clue, never proof",
        body: `The single biggest trap with scatter plots is jumping from "these two things move together" to "one of them causes the other." Ice cream sales and drowning incidents both rise in the summer — they're correlated — but ice cream doesn't cause drownings. The hidden third factor is **hot weather**, which drives both.\n\nWhen you see study time and scores trending together, it's tempting to say "studying more *causes* better scores." That's *probably* true here, but a scatter plot alone can't prove it — it only shows that the two numbers tend to move together.`,
        checkIn: {
          prompt: "Ice cream sales and drowning incidents both rise in summer, and they're correlated. What's really going on?",
          choices: [
            "A third factor (hot weather) drives both, even though neither causes the other",
            "Drowning causes people to buy ice cream",
            "Ice cream causes drowning",
          ],
          correctIndex: 0,
          explanation: "This is a classic example of correlation without causation — a hidden third variable (hot weather) increases both ice cream sales and swimming (and therefore drowning risk).",
        },
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Predict the shape of the cloud",
        body: `Before the exercises, picture two students: one studied 10 minutes and scored 55; another studied 75 minutes and scored 92. If you added ten more students following the same overall pattern from today's chart, where would most of their dots land relative to those two?`,
        checkIn: {
          prompt: "Given the trend so far, where would a student who studied 65 minutes most likely land?",
          choices: [
            "Somewhere in the upper-middle area, scoring noticeably higher than 55 but maybe just under 92",
            "Exactly at 92, no matter what",
            "Close to the low-score corner, near 55",
          ],
          correctIndex: 0,
          explanation: "Since the trend is positive, a study time between the two examples (65 minutes) would likely land with a score between them too — higher than the low end, but not guaranteed to hit the very top.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Tight cloud vs. loose cloud",
        body: `Not every positive relationship looks the same. Some scatter plots show dots that hug a clean, narrow line — a **strong** relationship. Others show dots scattered loosely in a general upward direction — a **weak** relationship. Both can technically be "positive," but a tight cloud is much more convincing evidence than a loose, scattered one.\n\nWhen you read a scatter plot, don't just ask "up or down?" — also ask "how tightly do the dots hug the trend?"`,
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "Scatter plot vs. line chart",
        body: `A line chart connects points **in time order** to show a single number changing. A scatter plot places dots by **two different numbers** with no time axis at all — it's not about "when," it's about "how do these two things relate?"\n\nIf your x-axis is time, reach for a line chart. If your x-axis is a second measurement (like study minutes), reach for a scatter plot.`,
        checkIn: {
          prompt: "You have data on temperature and ice cream sales for each of 30 days. Which chart best shows if they're related?",
          choices: [
            "A scatter plot with temperature on one axis and sales on the other",
            "A line chart of temperature over time",
            "A pie chart of total sales",
          ],
          correctIndex: 0,
          explanation: "To see whether two numbers (temperature and sales) are related to each other, a scatter plot — not a time-based line chart or a whole-to-parts pie chart — is the right tool.",
        },
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "Cherry-picking dots tells a false story",
        body: `A scatter plot can suggest a relationship that isn't really there — or hide an outlier that skews the picture. It's tempting to zoom in on just the dots that support your point and ignore the rest. Responsible analysts report the *whole* cloud, including inconvenient outliers, and they never claim a relationship proves a cause.`,
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "Always ask: clue or cause?",
        body: `Make this a reflex every time you see a scatter plot, in class or in the news: identify the x-axis, the y-axis, and the tilt of the cloud — then ask out loud, "is this a clue, or is someone claiming it's a cause?" That one habit will make you a much more careful reader of data.`,
      },
      {
        id: "reflection",
        kicker: "Reflection",
        title: "What relationship would you want to test?",
        body: `Think of two numbers in your own life that might be related — hours of sleep and mood, screen time and homework grades, practice time and a skill you're learning. If you tracked both for a month, what pattern would you predict: positive, negative, or none at all?`,
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "The basketball coach's dilemma",
        body: `A basketball coach tracks each player's \`practice_minutes\` and their \`free_throw_pct\` in a table called \`player_stats\`. The coach notices a positive relationship and wants to require more practice for everyone.\n\nWhat should the coach keep in mind before concluding practice *causes* better shooting?`,
        callout: {
          label: "Apply it",
          text: "The relationship is a real clue worth acting on, but the coach should stay curious: are the players who already practice more also the most motivated or naturally skilled? A scatter plot shows the pattern — it doesn't rule out other explanations.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you dive in",
        body: `Let's confirm the relationship-reading rules are fully locked in.`,
        checkIn: {
          prompt: "A scatter plot shows a strong positive relationship between two numbers. What can you safely conclude?",
          choices: [
            "The chart type is wrong and should be a bar chart instead",
            "The two numbers tend to move together, but that alone doesn't prove causation",
            "One number definitely causes the other to change",
          ],
          correctIndex: 1,
          explanation: "A scatter plot can reveal a strong tendency for two numbers to move together, but correlation alone is never enough to prove that one causes the other.",
        },
      },
      {
        id: "scatter-walkthrough",
        kicker: "Query walkthrough",
        title: "Two numbers per row become one dot each",
        body: `A scatter plot needs exactly two numeric columns from each row. Here, \`study_minutes\` maps to the x-axis (horizontal) and \`score\` maps to the y-axis (vertical). Every student in \`study_log\` becomes one dot placed by their two values.\n\nRead the result table first: each row is a person with two numbers. That's the raw material the chart will plot — no grouping, no counting, just pairs.`,
        code: `SELECT study_minutes, score\nFROM study_log\nORDER BY study_minutes;`,
        codeCaption: "One dot per student, two coordinates each",
      },
      {
        id: "correlation-read-tilt",
        kicker: "Analyst habits",
        title: "Read the cloud's tilt, not individual dots",
        body: `Don't fixate on one student's dot. Step back and look at the **overall cloud**:\n\n• **Tilt up and to the right** → positive relationship (more study tends to go with higher scores).\n• **Tilt down and to the right** → negative relationship.\n• **No clear tilt** → weak or no relationship.\n\nThe pattern across all dots is the finding. Any single dot is just one data point.`,
        checkIn: {
          prompt: "Dots trend upward from left to right. What does that suggest?",
          choices: [
            "Studying definitely causes higher scores",
            "The chart type is wrong",
            "Students who studied more tend to score higher, but causation isn't proven",
          ],
          correctIndex: 2,
          explanation: "An upward tilt shows a positive relationship — the two numbers tend to move together. But correlation alone never proves one causes the other.",
        },
      },
      {
        id: "causation-trap",
        kicker: "Common misconception",
        title: "Ice cream and sunscreen both spike in July",
        body: `Two things can move together without one causing the other. Ice cream sales and sunscreen sales both rise in summer — not because eating ice cream makes you buy sunscreen, but because **warm weather** drives both.\n\nThe same trap applies here: students who study more may score higher, but maybe confident students both study more *and* test well for other reasons. A scatter plot shows **relationship**; proving **cause** needs a controlled experiment or much deeper evidence.`,
        bullets: [
          "Correlation = two numbers tend to move together.",
          "Causation = changing one actually changes the other.",
          "Never jump from a scatter plot tilt to a cause-and-effect claim.",
        ],
      },
      {
        id: "outlier-dot-read",
        kicker: "Go one level deeper",
        title: "One dot far from the cloud deserves a question",
        body: `Sometimes a single dot sits far from the main trend — a student who studied 90 minutes but scored 40, or someone who barely studied but aced the test. Outliers don't break the relationship, but they **complicate** it.\n\nAsk: Is this a data entry error? A student who was sick on test day? A genius who didn't need to study? Outliers are clues for follow-up questions, not reasons to throw away the chart.`,
      },
      {
        id: "top-studier-query",
        kicker: "Second example",
        title: "Finding the longest study session",
        body: `Relationship charts answer "do these move together?" Ranking queries answer "who is the extreme?" — a different but related question.\n\nTo find who studied the most, sort by \`study_minutes DESC\` and keep one row. This combines the scatter plot's x-axis variable with a name column for a concrete answer.`,
        code: `SELECT student_name, study_minutes, score\nFROM study_log\nORDER BY study_minutes DESC\nLIMIT 1;`,
        codeCaption: "Who studied the longest?",
      },
      {
        id: "capstone-preview",
        kicker: "Looking ahead",
        title: "Next up: your cafeteria briefing (from scratch)",
        body: `Lesson 14 is the track capstone — a full **cafeteria briefing** on a richer two-table week of data. You will not get half-written queries. You'll explore, join, filter, summarize, rank, debug, and chart — answering several manager questions yourself.\n\nBefore you go, sketch a plan on paper:\n\n• What will you explore first?\n• Which shared key joins the tables?\n• Which questions need COUNT vs SUM vs HAVING?\n• What one sentence will your final briefing say?`,
        callout: {
          label: "Coach tip",
          text: "Bring this plan into Lesson 14. Capstone success is less about memorizing SQL and more about running the investigation cycle without blanks filled in for you.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You now know a scatter plot reveals whether **two numbers move together**, how to read the cloud's tilt, and the most important rule in all of data: correlation is not causation.\n\nIn the exercises you'll plot the relationship, read the trend, and find who studied the most — then you'll be ready for the from-scratch cafeteria briefing.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  instructorScript: `**Coach's note**:
A scatter plot answers a brand-new kind of question: *are two numbers related?* Each dot is one student, placed by **two** values at once.

Our table \`study_log\` has two number columns per student:
- **study_minutes** → the x-axis (how long they studied)
- **score** → the y-axis (how they did)

Return **both** number columns and each student becomes a dot. If the dots trend **up and to the right**, more studying tends to go with higher scores — that's a **positive relationship** (correlation).

**Important:** a relationship is *not* proof that one thing **causes** the other. Correlation is a clue, not a conclusion.`,
  commandReference: [
    {
      command: "Return two number columns",
      summary: "A scatter plot needs two numeric columns — one for x, one for y. Each row becomes a dot.",
      example: "SELECT study_minutes, score FROM study_log",
    },
    {
      command: "Scatter = relationship",
      summary: "Use a scatter plot to compare two numbers per item and look for a pattern.",
      example: "study_minutes (x) vs score (y)",
    },
    {
      command: "Correlation ≠ causation",
      summary: "Dots trending up together show a relationship — but not proof that one causes the other.",
      example: "More study & higher score move together",
    },
  ],
  kidExplain: [
    {
      title: "Two numbers, one dot",
      text: "Every dot is one student, placed by two values: study time across, score up. The pattern of dots reveals a relationship.",
    },
    {
      title: "Up and to the right",
      text: "If dots rise from left to right, the two numbers are positively related — bigger x tends to mean bigger y.",
    },
    {
      title: "A clue, not a cause",
      text: "A relationship is evidence worth exploring, but it doesn't prove one thing causes the other. Stay curious and careful.",
    },
  ],
  steps: [
    "Plot study time against score for every student.",
    "Sort by study time to read the trend.",
    "Find the student who studied the most.",
  ],
  cfu: [
    {
      question: "What does one point on a scatter plot represent?",
      answer:
        "One record plotted with two numeric values — e.g., study minutes on one axis and score on the other.",
    },
    {
      question: "What does an upward trend on a scatter plot suggest?",
      answer:
        "A positive relationship: as one value increases, the other tends to increase too — a clue, not proof of cause.",
    },
    {
      question: "Why is “correlation is not causation” important here?",
      answer:
        "Two numbers can move together for many reasons. You need more evidence before claiming one causes the other.",
    },
  ],
  tryThis: [
    "Do the dots trend up, down, or scatter randomly? What does that say about studying?",
    "Name one other reason (besides studying) a score might be high.",
  ],
  dataEthicsMoment:
    "A scatter plot can suggest a relationship that isn't really there — or hide an outlier that skews the picture. And a relationship never proves cause. Report what the data shows, not what you hoped to find.",
  exercises: [
    {
      id: "ex-relationship",
      title: "Exercise 1 — Plot the relationship",
      focusCommand: "Two number columns",
      commandExplain:
        "Return study_minutes and score together. Each student becomes a dot on the scatter plot.",
      goal: "SELECT study_minutes, score FROM study_log;",
      starterSql: `SELECT study_minutes, score
FROM ;`,
      hint: "Type study_log after FROM, then Run & check to see the scatter plot.",
      successMessage: "There's the relationship — 24 dots, trending up and to the right.",
      failureMessage:
        "Use SELECT study_minutes, score FROM study_log. Expect 24 rows + a scatter plot.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+study_minutes\s*,\s*score\b/.test(n)) return false;
        if (!/\bfrom\s+study_log\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 24 &&
            result.columns.map((c) => c.toLowerCase()).includes("study_minutes") &&
            result.columns.map((c) => c.toLowerCase()).includes("score")
        );
      },
    },
    {
      id: "ex-sort",
      title: "Exercise 2 — Read it in order",
      focusCommand: "ORDER BY study_minutes",
      commandExplain:
        "Sort by study_minutes so you can read the dots left to right and follow the trend.",
      goal: "SELECT study_minutes, score FROM study_log ORDER BY study_minutes;",
      starterSql: `SELECT study_minutes, score
FROM study_log
ORDER BY ;`,
      hint: "Type study_minutes after ORDER BY.",
      successMessage: "Sorted by study time — the upward pattern is easy to see now.",
      failureMessage:
        "Use ORDER BY study_minutes. Expect 24 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+study_minutes\s*,\s*score\b/.test(n)) return false;
        if (!/\border\s+by\s+study_minutes\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 24);
      },
    },
    {
      id: "ex-top",
      title: "Exercise 3 — Who studied the most?",
      focusCommand: "ORDER BY ... DESC LIMIT 1",
      commandExplain:
        "Find the student with the most study minutes — the dot farthest to the right.",
      goal: "SELECT student_name, study_minutes, score FROM study_log ORDER BY study_minutes DESC LIMIT 1;",
      starterSql: `SELECT student_name, study_minutes, score
FROM study_log
ORDER BY study_minutes DESC
LIMIT ;`,
      hint: "Type 1 after LIMIT.",
      successMessage: "Quinn studied 90 minutes and scored 97 — top right of the plot. Relationship Finder!",
      failureMessage:
        "Use ORDER BY study_minutes DESC LIMIT 1. Expect exactly 1 row.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\border\s+by\s+study_minutes\s+desc\b/.test(n)) return false;
        if (!/\blimit\s+1\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 1);
      },
    },
  ],
};

