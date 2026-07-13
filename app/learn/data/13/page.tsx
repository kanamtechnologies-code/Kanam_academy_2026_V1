"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { normSql, STUDY_SCORE_SEED } from "@/lib/dataLessonHelpers";

const daLesson13: DataLessonConfig = {
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
    durationLabel: "~8 min lesson",
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
            rowCount: 12,
          },
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
        body: `The **study_log** table has two numbers per student: **study_minutes** and **score** (sample rows below). There are 12 students in all.\n\nTo build the plot, you'll return **both** number columns. The first becomes the x position, the second the y position, and each student turns into one dot. No grouping or counting — the relationship is already in the raw rows.`,
        table: {
          columns: ["student_name", "study_minutes", "score"],
          values: [
            ["Alex", 20, 65],
            ["Casey", 60, 85],
            ["Quinn", 80, 95],
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
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You now know a scatter plot reveals whether **two numbers move together**, how to read the cloud's tilt, and the most important rule in all of data: correlation is not causation.\n\nIn the exercises you'll plot the relationship, read the trend, and find who studied the most.\n\nClick **Start the exercises** when you're ready.`,
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
  cfu: [],
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
      successMessage: "There's the relationship — 12 dots, trending up and to the right.",
      failureMessage:
        "Use SELECT study_minutes, score FROM study_log. Expect 12 rows + a scatter plot.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+study_minutes\s*,\s*score\b/.test(n)) return false;
        if (!/\bfrom\s+study_log\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 12 &&
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
        "Use ORDER BY study_minutes. Expect 12 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+study_minutes\s*,\s*score\b/.test(n)) return false;
        if (!/\border\s+by\s+study_minutes\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 12);
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
      successMessage: "Quinn studied 80 minutes and scored 95 — top right of the plot. Relationship Finder!",
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

export default function DataLesson13Page() {
  return <DataLessonCanvas lesson={daLesson13} />;
}
