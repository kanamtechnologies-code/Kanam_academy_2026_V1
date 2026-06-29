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
  badge: "📈 Chart Maker",
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
