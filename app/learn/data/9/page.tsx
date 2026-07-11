"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

const daLesson9: DataLessonConfig = {
  id: "da-9",
  title: "9. Tell the Story with Charts",
  goal: "Shape query results into a chart — a label column and a number column — and let sorting tell the story.",
  xpReward: 450,
  badge: "Chart Maker",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  prevHref: "/learn/data/8",
  nextHref: "/learn/data/10",
  dashboardHref: "/dashboard",
  chartConfig: {
    type: "bar",
    xKey: "item",
    yKey: "order_count",
    title: "Orders per item",
  },
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You can already pull numbers out of a database. Today you'll make those numbers *talk* — by turning them into a **bar chart**, the most common and most useful chart in the world.\n\nHere's your roadmap:\n\n• **Why** a chart beats a wall of numbers.\n• **How to read** a bar chart's two parts: the labels and the bars.\n• **When** a bar chart is the right pick — and when a line or pie chart wins instead.\n• A **worked example** where we read a real chart together before you build your own.\n\nPicture a video-game leaderboard, or the standings in your favorite sport. Your eye finds the longest bar or the top name *instantly* — way faster than reading a list of scores. That speed is the superpower of a good chart, and you're about to build one from a SQL query.`,
        image: "/images/lessons/lesson-bar.png",
        imageAlt: "A tablet showing a bar chart of quarterly sales, with one bar taller than the rest",
        callout: {
          label: "Why it matters",
          text: "Sports standings, app store rankings, YouTube view counts, and election results are all bar charts. Anywhere people compare amounts across categories, a bar chart is doing the work.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "A bar chart compares things side by side",
        body: `A table full of numbers is accurate but slow to read — your brain has to compare each value to every other value, one by one. A **bar chart** does that comparison *for* you by turning each number into a bar. The tallest bar is the biggest value, no math required.\n\nThink of bars as runners lined up at a finish line. One glance tells you who's ahead, who's behind, and by how much. That's why bar charts are everywhere: they convert "compare these amounts" into "just look."\n\nUse a bar chart whenever you want to **compare separate categories** — which lunch item is most popular, which game has the most players, which month had the most rain. Each category gets its own bar.`,
        callout: {
          label: "Common misconception",
          text: "A bar chart compares *separate categories*, not steps in time. If your x-axis is days or months in order, you usually want a line chart instead — bars side by side hide the up-and-down trend.",
        },
      },
      {
        id: "anatomy",
        kicker: "How to read it",
        title: "Every bar chart has a label and a value",
        body: `Here's the exact chart you'll build in this lesson. Every bar chart is made of just two parts, and once you see them you can read any bar chart ever made.\n\n• The **labels** along the bottom (the **x-axis**) name each category — here, the **item**.\n• The **height** of each bar (the **y-axis**) shows the **number** — here, how many orders.\n\nTaller bar = bigger number. That's the whole idea. Notice the two tallest bars (Pizza slice and Salad) jump out immediately — that's the comparison happening automatically.`,
        chart: {
          config: { type: "bar", xKey: "item", yKey: "order_count", title: "Orders per item" },
          result: {
            columns: ["item", "order_count"],
            values: [
              ["Pizza slice", 2],
              ["Salad", 2],
              ["Burger", 1],
              ["Chicken wrap", 1],
              ["Fruit cup", 1],
              ["Yogurt parfait", 1],
            ],
            rowCount: 6,
          },
        },
      },
      {
        id: "when",
        kicker: "Choose wisely",
        title: "When to use a bar chart (and when not to)",
        body: `Picking the right chart is half the skill of a data analyst. The wrong chart can hide the answer or even mislead people. Here's the cheat sheet:`,
        bullets: [
          "**Use a bar chart** to compare separate categories (most popular item, top scorer).",
          "**Use a line chart** instead when your x-axis is time (orders each day).",
          "**Use a pie chart** instead when you're showing parts of one whole (each item's share of all orders).",
        ],
        callout: {
          label: "Common misconception",
          text: "A bar chart's bars look honest, but if the y-axis doesn't start at zero, a tiny difference can look enormous. Before you trust (or share) a bar chart, always check where the bottom of the scale begins.",
        },
      },
      {
        id: "data",
        kicker: "Your dataset",
        title: "The data you'll use: lunch_orders",
        body: `You'll work with the **lunch_orders** table — one row per order, like the four sample rows below. Raw, it's just a list; a bar chart needs it summarized.\n\nTo get there, you'll **GROUP BY item** and **COUNT** the orders. That produces exactly two columns: a **label** column (item) and a **number** column (order_count) — the recipe every chart needs.`,
        table: {
          columns: ["student_name", "item", "price"],
          values: [
            ["Alex", "Pizza slice", 3.5],
            ["Jordan", "Salad", 4.0],
            ["Sam", "Chicken wrap", 5.25],
            ["Casey", "Pizza slice", 3.5],
          ],
          rowCount: 4,
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Read a chart before you build one",
        body: `Before you write any SQL, let's practice *reading* a finished chart — because that's the skill that makes you trustworthy with data. Imagine a different question: **"How many players are on each esports team?"**\n\nHere are the numbers behind the chart. **Step 1 — find the tallest bar:** Comets at 9 players is the biggest. **Step 2 — find the shortest:** Bolts at 4. **Step 3 — compare:** the Comets have more than double the Bolts. In one glance, the chart answers "who's biggest, who's smallest, and by how much."\n\nNow flip it around: to *build* this chart from a query, you'd need exactly these two columns — a label (team) and a number (players). That's the same shape you'll create from \`lunch_orders\`.`,
        table: {
          columns: ["team", "players"],
          values: [
            ["Comets", 9],
            ["Dragons", 7],
            ["Falcons", 6],
            ["Bolts", 4],
          ],
          rowCount: 4,
        },
        callout: {
          label: "Pro tip",
          text: "Sorting the bars from tallest to shortest turns a plain chart into a ranking. A sorted bar chart reads like a top-10 list — the story jumps right out.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You now know what a bar chart is for (comparing categories), how to read it (label + height), and when *not* to use it. Best of all, you know the recipe every chart needs: **a label column + a number column**.\n\nIn the exercises you'll write the query that shapes \`lunch_orders\` into a bar chart, then watch the chart appear under your results.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  instructorScript: `**Coach's note**:
Numbers in a table are useful — but a **chart** makes the story obvious at a glance.

A chart needs two things from your query:
1. A **label** column (the categories) → here, **item**
2. A **number** column (the heights) → here, **order_count**

When your results have columns named **item** and **order_count**, a bar chart appears under your results automatically.

**Pick the right chart for the question:**
- **Bar** → compare separate categories (which item is most popular?). *This lesson.*
- **Line** → show change over time (orders each day this week).
- **Pie** → show parts of one whole (each item's share of all orders).

Watch how **sorting** changes the story the chart tells — and remember that *design choices* (sorting, cropping the axis, or showing only the top few) can make the same data tell very different stories.`,
  commandReference: [
    {
      command: "Chart shape",
      summary:
        "A chart needs one label column and one number column. Aim for exactly two columns.",
      example: "SELECT item, COUNT(*) AS order_count",
    },
    {
      command: "GROUP BY",
      summary:
        "Groups rows so each label (item) gets one bar.",
      example: "GROUP BY item",
    },
    {
      command: "AS order_count",
      summary:
        "Name the number column order_count so the chart knows what to plot.",
      example: "COUNT(*) AS order_count",
    },
    {
      command: "ORDER BY",
      summary:
        "Sorting reorders the bars — a sorted chart reads like a ranking.",
      example: "ORDER BY order_count DESC",
    },
    {
      command: "Choosing a chart",
      summary:
        "Bar = compare categories. Line = change over time. Pie = parts of one whole. Match the chart to the question.",
      example: "Bar chart → most popular item",
    },
    {
      command: "Read it honestly",
      summary:
        "Always check the axis labels and where the scale starts. Cropping the y-axis or hiding rows can make a small difference look huge.",
      example: "Y-axis should usually start at 0",
    },
  ],
  kidExplain: [
    {
      title: "Label + number",
      text: "Every chart pairs a label (item) with a number (how many orders). That's your x and y.",
    },
    {
      title: "Group to get bars",
      text: "GROUP BY item gives one row — and one bar — per item.",
    },
    {
      title: "Sorting tells a story",
      text: "Sorting the number column turns a plain chart into a clear ranking.",
    },
    {
      title: "Match the chart to the question",
      text: "Use a bar chart to compare categories, a line chart for change over time, and a pie chart for parts of one whole. The right chart makes the answer obvious.",
    },
    {
      title: "Charts can mislead",
      text: "The same numbers can tell different stories. Cropping the y-axis, sorting, or showing only the top few rows changes what people notice — so read axes and labels carefully.",
    },
  ],
  steps: [
    "Build a chartable query: item + order_count.",
    "Sort the bars from most to fewest.",
    "Show only the top 3 items.",
    "Challenge: write the full chart-ready query yourself.",
  ],
  cfu: [],
  tryThis: [
    "Change DESC to ASC and watch the bars flip.",
    "Try grouping by something else to chart a different story.",
    "Show only the top 3 with LIMIT, then remove it. How does hiding rows change the story the chart tells?",
    "Would this data be clearer as a pie chart (each item's share of all orders)? Why or why not?",
  ],
  dataEthicsMoment:
    "Charts persuade. Truncating an axis or cherry-picking bars can mislead — show the full, honest picture.",
  exercises: [
    {
      id: "ex-chartable",
      title: "Exercise 1 — Make it chartable",
      focusCommand: "GROUP BY + AS",
      commandExplain:
        "Group by item and count each group as order_count. Two columns — a label and a number — so a bar chart appears.",
      goal: "SELECT item, COUNT(*) AS order_count FROM lunch_orders GROUP BY item;",
      starterSql: `SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY ;`,
      hint: "Type item after GROUP BY, then Run & check to see the chart.",
      successMessage: "There's your chart! One bar per item.",
      failureMessage:
        "Use COUNT(*) AS order_count and GROUP BY item. Expect 6 rows + a chart.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bcount\s*\(\s*\*\s*\)\s+as\s+order_count\b/.test(n)) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 6 &&
            result.columns.map((c) => c.toLowerCase()).includes("order_count")
        );
      },
    },
    {
      id: "ex-sorted",
      title: "Exercise 2 — Sort the bars",
      focusCommand: "ORDER BY",
      commandExplain:
        "Sort by order_count DESC so the tallest bars come first — now the chart reads like a ranking.",
      goal: "Add ORDER BY order_count DESC.",
      starterSql: `SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY item
ORDER BY order_count ;`,
      hint: "Type DESC after order_count.",
      successMessage: "Now the story is clear — most popular items lead.",
      failureMessage:
        "Use ORDER BY order_count DESC. Expect 6 sorted rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\border\s+by\s+order_count\s+desc\b/.test(n)) return false;
        if (!result || result.rowCount !== 6) return false;
        const idx = result.columns
          .map((c) => c.toLowerCase())
          .indexOf("order_count");
        if (idx < 0) return false;
        return Number(result.values[0][idx]) === 2;
      },
    },
    {
      id: "ex-top3",
      title: "Exercise 3 — Top 3 only",
      focusCommand: "ORDER BY + LIMIT",
      commandExplain:
        "Sometimes a focused chart is stronger. LIMIT 3 keeps only the top three bars.",
      goal: "Add LIMIT 3 to the sorted, grouped query.",
      starterSql: `SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY item
ORDER BY order_count DESC
LIMIT ;`,
      hint: "Type 3 after LIMIT.",
      successMessage: "Crisp! A focused top-3 chart.",
      failureMessage:
        "Use LIMIT 3 on the sorted query. Expect exactly 3 bars.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\border\s+by\s+order_count\s+desc\b/.test(n)) return false;
        if (!/\blimit\s+3\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 3);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Build it yourself",
      focusCommand: "GROUP BY + AS + ORDER BY",
      commandExplain:
        "Write the whole chart-ready query: one label, one named number, grouped and sorted high to low.",
      goal: "Full query: item, COUNT(*) AS order_count, grouped, sorted DESC.",
      starterSql: `-- Build a chart-ready query of orders per item, most popular first:
SELECT 
FROM lunch_orders
GROUP BY 
ORDER BY ;`,
      hint: "SELECT item, COUNT(*) AS order_count ... GROUP BY item ORDER BY order_count DESC;",
      successMessage: "You built a chart from scratch — label, number, sorted. That's data storytelling!",
      failureMessage:
        "Need item, COUNT(*) AS order_count, GROUP BY item, ORDER BY order_count DESC. Expect 6 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+item\s*,\s*count\s*\(\s*\*\s*\)\s+as\s+order_count\b/.test(n))
          return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\border\s+by\s+order_count\s+desc\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 6 &&
            result.columns.map((c) => c.toLowerCase()).includes("order_count")
        );
      },
    },
  ],
};

export default function DataLesson9Page() {
  return <DataLessonCanvas lesson={daLesson9} />;
}
