"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { firstCellNumber, normSql, QUIZ_SCORES_SEED } from "@/lib/dataLessonHelpers";

const daLesson12: DataLessonConfig = {
  id: "da-12",
  title: "12. Distributions",
  goal: "Use a histogram to see how a set of numbers is spread out — where scores cluster, and how high and low they reach.",
  xpReward: 600,
  badge: "📊 Distribution Detective",
  previewTable: "quiz_scores",
  seedData: QUIZ_SCORES_SEED,
  prevHref: "/learn/data/11",
  nextHref: "/learn/data/13",
  dashboardHref: "/dashboard",
  chartConfig: {
    type: "histogram",
    valueKey: "score",
    binSize: 10,
    title: "How quiz scores are spread out",
  },
  lessonModule: {
    durationLabel: "~4 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "A histogram shows how numbers are spread out",
        body: `A **histogram** takes one big pile of numbers and shows their **shape** — where most values land, and how far they spread from low to high.\n\nIt looks like a bar chart, but it answers a different question: not *"compare these categories"* but *"how are these numbers distributed?"*`,
        image: "/images/lessons/lesson-histogram.png",
        imageAlt: "A histogram of test scores, with most students clustered in the middle ranges",
        callout: {
          label: "Where you see it",
          text: "Test-score curves, the age breakdown of a population, and how long videos are watched are all shown with histograms.",
        },
      },
      {
        id: "anatomy",
        kicker: "How to read it",
        title: "Numbers get sorted into bins",
        body: `Here's the histogram you'll build from 16 quiz scores. Notice:\n\n• The x-axis is split into equal ranges called **bins** (every 10 points).\n• Each bar's **height** is **how many** scores fall in that bin.\n• The bars **touch**, because the ranges are continuous — there's no gap between 70–80 and 80–90.\n\nThe tall bars show where scores **cluster**.`,
        chart: {
          config: { type: "histogram", valueKey: "score", binSize: 10, title: "How quiz scores are spread out" },
          result: {
            columns: ["score"],
            values: [
              [72], [85], [90], [68], [95], [88], [76], [81],
              [100], [64], [79], [92], [58], [84], [73], [89],
            ],
            rowCount: 16,
          },
        },
      },
      {
        id: "when",
        kicker: "Choose wisely",
        title: "Histogram vs. bar chart",
        body: `They look alike, so this is the part people get wrong.`,
        bullets: [
          "**Use a histogram** for one column of numbers, to see its spread and clusters.",
          "**Use a bar chart** to compare separate, named categories.",
          "Histogram bars **touch**; bar-chart bars have **gaps** between categories.",
        ],
        callout: {
          label: "Charts can mislead",
          text: "Bin size changes the picture. Very wide bins hide real differences; very narrow bins make random noise look like a pattern.",
        },
      },
      {
        id: "data",
        kicker: "Your dataset",
        title: "The data you'll use: quiz_scores",
        body: `The **quiz_scores** table has one row per student with a single number, **score**. You'll just return the **score** column — the chart sorts the values into bins for you.`,
        table: {
          columns: ["student_name", "score"],
          values: [
            ["Alex", 72],
            ["Jordan", 85],
            ["Sam", 90],
            ["Quinn", 100],
          ],
          rowCount: 4,
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now you try it",
        body: `In the exercises you'll return the scores to see the distribution, then measure the spread with the highest score.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  instructorScript: `**Coach's note**:
A bar chart compares named categories. A **histogram** looks similar but answers a different question: *how is one set of numbers spread out?*

A histogram takes **one number column** (here, **score**) and sorts the values into **bins** (ranges like 70–80, 80–90). The height of each bar is **how many** values fall in that range.

So you only need to return the **score** column — the chart bins them for you. Watch where the scores **cluster** (the tall bars) and how far they **spread** (lowest to highest bin).

This is the difference between *one number per category* (bar) and *the shape of many numbers* (histogram).`,
  commandReference: [
    {
      command: "Return one number column",
      summary: "A histogram needs a single numeric column (score). It bins the values automatically.",
      example: "SELECT score FROM quiz_scores",
    },
    {
      command: "Bins",
      summary: "Values are grouped into equal ranges (here every 10 points). Bar height = how many landed there.",
      example: "70–80, 80–90, 90–100",
    },
    {
      command: "MIN / MAX",
      summary: "The lowest and highest values show the full spread (the range) of the data.",
      example: "SELECT MIN(score), MAX(score) FROM quiz_scores",
    },
  ],
  kidExplain: [
    {
      title: "Bins, not categories",
      text: "A histogram chops a number line into equal ranges (bins) and counts how many values fall in each. The bars touch because the ranges are continuous.",
    },
    {
      title: "Shape tells the story",
      text: "Tall bars show where most scores cluster. A wide spread means scores vary a lot; a narrow one means they're similar.",
    },
    {
      title: "Just return the numbers",
      text: "You don't group the scores yourself — return the score column and the chart bins them for you.",
    },
  ],
  steps: [
    "Return every score to see the distribution.",
    "Count how many students there are in all.",
    "Find the spread with the highest score.",
  ],
  cfu: [],
  tryThis: [
    "Which 10-point bin has the most students? That's where scores cluster.",
    "If one student scored 100 and the rest scored near 70, how would the shape change?",
  ],
  dataEthicsMoment:
    "Histogram shape depends on bin size. Very wide bins can hide real differences; very narrow ones can make noise look meaningful. Choose bins that tell the truth, not the story you want.",
  exercises: [
    {
      id: "ex-distribution",
      title: "Exercise 1 — See the distribution",
      focusCommand: "SELECT score",
      commandExplain:
        "Return the score column for every student. The histogram bins the values and shows the shape.",
      goal: "SELECT score FROM quiz_scores;",
      starterSql: `SELECT score
FROM ;`,
      hint: "Type quiz_scores after FROM, then Run & check to see the histogram.",
      successMessage: "There's the distribution — 16 scores sorted into bins.",
      failureMessage:
        "Use SELECT score FROM quiz_scores. Expect 16 rows + a histogram.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+score\b/.test(n)) return false;
        if (!/\bfrom\s+quiz_scores\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 16 &&
            result.columns.map((c) => c.toLowerCase()).includes("score")
        );
      },
    },
    {
      id: "ex-count",
      title: "Exercise 2 — How many students?",
      focusCommand: "COUNT(*)",
      commandExplain:
        "Count every row so you know how many scores are in the distribution.",
      goal: "SELECT COUNT(*) AS total_students FROM quiz_scores;",
      starterSql: `SELECT COUNT(*) AS total_students
FROM quiz_scores;`,
      hint: "The starter query is complete — Run & check.",
      successMessage: "16 students — every score is in the histogram.",
      failureMessage:
        "Use COUNT(*) AS total_students FROM quiz_scores. Expect 1 row showing 16.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bcount\s*\(\s*\*\s*\)\s+as\s+total_students\b/.test(n)) return false;
        if (!/\bfrom\s+quiz_scores\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 1 && firstCellNumber(result) === 16);
      },
    },
    {
      id: "ex-spread",
      title: "Exercise 3 — Find the top of the spread",
      focusCommand: "MAX",
      commandExplain:
        "Use MAX(score) to find the highest score — the far-right edge of the distribution.",
      goal: "SELECT MAX(score) AS top_score FROM quiz_scores;",
      starterSql: `SELECT MAX(score) AS top_score
FROM quiz_scores;`,
      hint: "The starter query is complete — Run & check.",
      successMessage: "Top score is 100 — that's the high end of the spread. Distribution Detective!",
      failureMessage:
        "Use MAX(score) AS top_score FROM quiz_scores. Expect 1 row showing 100.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bmax\s*\(\s*score\s*\)\s+as\s+top_score\b/.test(n)) return false;
        if (!/\bfrom\s+quiz_scores\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 1 && firstCellNumber(result) === 100);
      },
    },
  ],
};

export default function DataLesson12Page() {
  return <DataLessonCanvas lesson={daLesson12} />;
}
