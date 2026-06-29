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
  badge: "🔬 Relationship Finder",
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
    durationLabel: "~4 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "A scatter plot shows if two things are related",
        body: `A **scatter plot** asks a powerful question: *do two numbers move together?* Each dot is one record, placed by **two** values at once.\n\nIf the dots trend **up and to the right**, the two things tend to grow together — like study time and test scores.`,
        image: "/images/lessons/lesson-scatter.png",
        imageAlt: "A scatter plot of study time versus test score, with dots trending upward",
        callout: {
          label: "Where you see it",
          text: "Scientists, doctors, and sports analysts use scatter plots to spot relationships — height vs. shoe size, practice vs. performance, temperature vs. ice-cream sales.",
        },
      },
      {
        id: "anatomy",
        kicker: "How to read it",
        title: "Two numbers, one dot",
        body: `Here's the scatter plot you'll build. Notice:\n\n• The **x-axis** is one number — **study_minutes**.\n• The **y-axis** is another number — **score**.\n• Each **dot** is one student, placed by *both* of their numbers.\n\nThe dots climb from bottom-left to top-right: more studying tends to go with higher scores.`,
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
        body: `A scatter plot is a clue-finder, not a proof machine.`,
        bullets: [
          "**Use a scatter plot** when you have two numbers per record and want to see if they're related.",
          "Dots up to the right = **positive** relationship; down to the right = **negative**; no pattern = **no** relationship.",
          "A single far-off dot is an **outlier** — worth a closer look.",
        ],
        callout: {
          label: "Correlation is not causation",
          text: "Two things moving together doesn't prove one causes the other. More studying might raise scores — or maybe motivated students both study more and score higher. Stay curious.",
        },
      },
      {
        id: "data",
        kicker: "Your dataset",
        title: "The data you'll use: study_log",
        body: `The **study_log** table has two numbers per student: **study_minutes** and **score**. You'll return **both** number columns, and each student becomes a dot on the plot.`,
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
        id: "ready",
        kicker: "Ready",
        title: "Now you try it",
        body: `In the exercises you'll plot the relationship, read the trend, and find who studied the most.\n\nClick **Start the exercises** when you're ready.`,
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
