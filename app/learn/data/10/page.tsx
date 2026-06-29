"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { firstCellNumber, LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

const daLesson10: DataLessonConfig = {
  id: "da-10",
  title: "10. Parts of a Whole",
  goal: "Use a pie chart to show how each item is a slice of all the orders — and learn when a pie helps and when it misleads.",
  xpReward: 500,
  badge: "🥧 Slice Master",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  prevHref: "/learn/data/9",
  nextHref: "/learn/data/11",
  dashboardHref: "/dashboard",
  chartConfig: {
    type: "pie",
    xKey: "item",
    yKey: "order_count",
    title: "Each item's share of all orders",
  },
  lessonModule: {
    durationLabel: "~4 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "A pie chart shows parts of one whole",
        body: `A **pie chart** is a circle cut into slices. The whole circle is **100%** of something, and each slice is one part's **share** of that whole.\n\nUse a pie when you want to answer: *"Out of everything, how much is each piece?"* — like how a budget is split, or what share of all lunch orders each item makes up.`,
        image: "/images/lessons/lesson-pie.png",
        imageAlt: "A laptop showing a pie chart of quarterly sales contribution split into four slices",
        callout: {
          label: "Where you see it",
          text: "Budgets (where your money goes), phone screen-time breakdowns, battery usage, and election seat shares are all pie charts.",
        },
      },
      {
        id: "anatomy",
        kicker: "How to read it",
        title: "Slices add up to the whole",
        body: `This is the pie you'll build. Notice:\n\n• Each **slice** is one **item** (the label).\n• The **size** of the slice is that item's **count** (the number).\n• All the slices together make **one whole** — every order is in there exactly once.\n\nA bigger slice means a bigger share.`,
        chart: {
          config: { type: "pie", xKey: "item", yKey: "order_count", title: "Each item's share of all orders" },
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
        title: "When a pie works — and when it lies",
        body: `Pie charts are easy to misuse. Use them carefully.`,
        bullets: [
          "**Use a pie** for 2–6 parts that add up to one whole (shares of a total).",
          "**Avoid a pie** when slices don't add up to a whole — use a bar chart to compare instead.",
          "**Avoid a pie** with many tiny slices — they're impossible to compare by eye.",
        ],
        callout: {
          label: "Charts can mislead",
          text: "Too many slices, or a 3-D tilt that makes the front slice look bigger, can fool the reader. Keep pies flat and simple.",
        },
      },
      {
        id: "data",
        kicker: "Your dataset",
        title: "The data you'll use: lunch_orders",
        body: `You'll use the same **lunch_orders** table. You'll **COUNT** orders **GROUP BY item** (a label + a number), then check the **whole** with one more count. Knowing the total lets you read each slice as a share.`,
        table: {
          columns: ["student_name", "item", "price"],
          values: [
            ["Alex", "Pizza slice", 3.5],
            ["Jordan", "Salad", 4.0],
            ["Morgan", "Yogurt parfait", 3.0],
            ["Taylor", "Burger", 4.75],
          ],
          rowCount: 4,
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now you try it",
        body: `In the exercises you'll build the pie-ready query, find the whole, and decide when a pie is the honest choice.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  instructorScript: `**Coach's note**:
A bar chart compares categories. A **pie chart** answers a different question: *what share of the whole is each part?*

A pie needs the same two columns as a bar chart:
1. A **label** column (the slices) → **item**
2. A **number** column (the slice sizes) → **order_count**

Because every slice is a piece of one whole, the numbers should **add up to a meaningful total** (here, all the orders).

**When a pie works:** a few parts (2–6) that together make 100%.
**When a pie misleads:** too many tiny slices, or parts that don't add up to one whole. Then a bar chart is clearer.`,
  commandReference: [
    {
      command: "GROUP BY + COUNT",
      summary: "Count the orders for each item so every slice gets a size.",
      example: "SELECT item, COUNT(*) AS order_count ... GROUP BY item",
    },
    {
      command: "Pie = parts of a whole",
      summary: "Use a pie only when the slices add up to one meaningful total (all orders).",
      example: "Each item's share of every order",
    },
    {
      command: "The whole",
      summary: "The total of all slices. Knowing the whole lets you read each slice as a share.",
      example: "SELECT COUNT(*) AS total_orders FROM lunch_orders",
    },
    {
      command: "Bar vs. pie",
      summary: "Comparing sizes? Use a bar. Showing shares of one whole? Use a pie.",
      example: "6+ slices → switch to a bar chart",
    },
  ],
  kidExplain: [
    {
      title: "A pie is one whole",
      text: "The full circle is 100% of the orders. Each slice is one item's share of that whole.",
    },
    {
      title: "Same shape as a bar query",
      text: "A pie needs a label (item) and a number (order_count) — exactly like a bar chart. Only the picture changes.",
    },
    {
      title: "When NOT to use a pie",
      text: "Too many slices or parts that don't sum to one whole make a pie hard to read. Then a bar chart tells the story better.",
    },
  ],
  steps: [
    "Count orders per item so each slice has a size.",
    "Check the whole — how many orders are there in total?",
    "Build the pie-ready query yourself.",
  ],
  cfu: [],
  tryThis: [
    "Imagine 20 different items. Would a pie still be readable? Why might a bar chart win?",
    "Which two items together make up the biggest share of the pie?",
  ],
  dataEthicsMoment:
    "Pie charts can mislead when slices don't add up to one whole, or when a 3-D tilt makes the front slice look bigger. Keep it flat and make sure the parts sum to 100%.",
  exercises: [
    {
      id: "ex-slices",
      title: "Exercise 1 — Give each slice a size",
      focusCommand: "GROUP BY + COUNT",
      commandExplain:
        "Count the orders for each item. Two columns — item and order_count — and a pie chart appears.",
      goal: "SELECT item, COUNT(*) AS order_count FROM lunch_orders GROUP BY item;",
      starterSql: `SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY ;`,
      hint: "Type item after GROUP BY, then Run & check to see the pie.",
      successMessage: "There's your pie! Each item is a slice of all the orders.",
      failureMessage:
        "Use COUNT(*) AS order_count and GROUP BY item. Expect 6 rows + a pie.",
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
      id: "ex-whole",
      title: "Exercise 2 — Find the whole",
      focusCommand: "COUNT(*)",
      commandExplain:
        "A pie only makes sense if you know the whole. Count every order — that total is the full circle.",
      goal: "SELECT COUNT(*) AS total_orders FROM lunch_orders;",
      starterSql: `SELECT COUNT(*) AS total_orders
FROM ;`,
      hint: "Type lunch_orders after FROM.",
      successMessage: "8 orders in total — that's the whole pie.",
      failureMessage: "Use COUNT(*) AS total_orders FROM lunch_orders. Expect 1 row showing 8.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bcount\s*\(\s*\*\s*\)\s+as\s+total_orders\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 1 && firstCellNumber(result) === 8);
      },
    },
    {
      id: "ex-build",
      title: "Exercise 3 — Build the pie yourself",
      focusCommand: "GROUP BY + AS",
      commandExplain:
        "Write the whole pie-ready query: a label (item) and a named number (order_count), grouped per item.",
      goal: "Full query: item, COUNT(*) AS order_count, grouped by item.",
      starterSql: `-- Build a pie-ready query of each item's share of all orders:
SELECT 
FROM lunch_orders
GROUP BY ;`,
      hint: "SELECT item, COUNT(*) AS order_count ... GROUP BY item;",
      successMessage: "You built a pie from scratch — label, number, one whole. Slice Master!",
      failureMessage:
        "Need item, COUNT(*) AS order_count, GROUP BY item. Expect 6 rows + a pie.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+item\s*,\s*count\s*\(\s*\*\s*\)\s+as\s+order_count\b/.test(n))
          return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 6 &&
            result.columns.map((c) => c.toLowerCase()).includes("order_count")
        );
      },
    },
  ],
};

export default function DataLesson10Page() {
  return <DataLessonCanvas lesson={daLesson10} />;
}
