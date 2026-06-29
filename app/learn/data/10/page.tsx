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
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson you compared categories with a bar chart. Today you'll answer a *different* kind of question with a **pie chart**: not "which is biggest?" but **"how is the whole thing split up?"**\n\nHere's your roadmap:\n\n• **What a pie chart really shows** — parts of one whole.\n• **How to read** slices as shares of 100%.\n• **When a pie helps** and the surprisingly common cases where it lies.\n• A **worked example** reading a real pie before you build your own.\n\nThink about your phone's screen-time report: it slices your day into TikTok, games, messages, and more. You're not asking "which app has the most minutes in the universe?" — you're asking "what share of *my* day went where?" That's the pie chart's exact job.`,
        image: "/images/lessons/lesson-pie.png",
        imageAlt: "A laptop showing a pie chart of quarterly sales contribution split into four slices",
        callout: {
          label: "Why it matters",
          text: "Budgets (where your money goes), phone screen-time breakdowns, battery usage, and election seat shares are all pie charts — anywhere one whole gets divided into shares.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "A pie chart shows parts of one whole",
        body: `A **pie chart** is a circle cut into slices. The whole circle is **100%** of something, and each slice is one part's **share** of that whole.\n\nThe perfect mental picture is an actual pizza. The whole pizza is everything; each slice is a fraction of it; and all the slices together always add back up to one complete pizza. If your data doesn't work like that — if the parts don't sum to a meaningful whole — a pie is the wrong tool.\n\nUse a pie when you want to answer: *"Out of everything, how much is each piece?"* Examples: how a budget is split, or what share of all lunch orders each item makes up. The question is about **proportion**, not raw comparison.`,
        callout: {
          label: "Common misconception",
          text: "A pie chart is *not* just a round bar chart. It only makes sense when every slice is part of the same whole. If your numbers don't add up to one total (like temperatures or test scores), a pie will mislead — use a bar chart.",
        },
      },
      {
        id: "anatomy",
        kicker: "How to read it",
        title: "Slices add up to the whole",
        body: `This is the pie you'll build from \`lunch_orders\`. Read it in three parts:\n\n• Each **slice** is one **item** (the label).\n• The **size** of the slice is that item's **count** (the number).\n• All the slices together make **one whole** — every order appears in exactly one slice.\n\nA bigger slice means a bigger share. Here Pizza slice and Salad each take a wider wedge (2 orders out of 8 = 25% each), while the single-order items take thin slices. Your eye reads "share of the total" automatically.`,
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
        body: `Pie charts are the most *misused* chart there is, so use them carefully. The trouble is that human eyes are bad at comparing the sizes of wedges — we're much better at comparing bar heights.`,
        bullets: [
          "**Use a pie** for 2–6 parts that add up to one whole (shares of a total).",
          "**Avoid a pie** when slices don't add up to a whole — use a bar chart to compare instead.",
          "**Avoid a pie** with many tiny slices — they're impossible to compare by eye.",
        ],
        callout: {
          label: "Common misconception",
          text: "More slices does *not* mean a better pie. With 8+ near-equal wedges, nobody can tell which is biggest — a sorted bar chart would be clearer. And a 3-D tilt that puffs up the front slice is a classic way charts fool people. Keep pies flat, simple, and few.",
        },
      },
      {
        id: "data",
        kicker: "Your dataset",
        title: "The data you'll use: lunch_orders",
        body: `You'll use the same **lunch_orders** table (sample rows below). The pie-ready query is the same shape as a bar query: **COUNT** orders **GROUP BY item**, giving a label + a number.\n\nThe extra move for a pie is checking the **whole** with one more count of every order. Knowing the total (8 orders) lets you read each slice as a real share — 2 out of 8 is one quarter of the pie.`,
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
        id: "worked",
        kicker: "Worked example",
        title: "Read a pie before you build one",
        body: `Let's read a finished pie together. Imagine you tracked how you spent one **24-hour day**, and the counts below are hours. Because the parts add up to a whole day, a pie is the right call.\n\n**Step 1 — confirm it's a whole:** 8 + 7 + 4 + 3 + 2 = 24 hours. Good, the slices sum to the full day. **Step 2 — find the biggest share:** Sleep at 8 hours is the largest wedge — exactly one-third of the circle. **Step 3 — read a small share:** Gaming at 2 hours is a thin slice, about 8% of the day.\n\nThat's the whole skill: a slice's size *is* its share of the total. To build this pie from a query, you'd produce the same two columns — a label (activity) and a number (hours).`,
        table: {
          columns: ["activity", "hours"],
          values: [
            ["Sleep", 8],
            ["School", 7],
            ["Free time", 4],
            ["Homework", 3],
            ["Gaming", 2],
          ],
          rowCount: 5,
        },
        callout: {
          label: "Pro tip",
          text: "Before choosing a pie, add up your numbers. If the total is a meaningful whole (a full day, all orders, the entire budget), a pie fits. If not, reach for a bar chart.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You now know a pie shows **parts of one whole**, how to read slices as shares, and the traps that make pies mislead. You also know the query shape: a label + a number, plus a check on the total.\n\nIn the exercises you'll build the pie-ready query, find the whole, and decide when a pie is the honest choice.\n\nClick **Start the exercises** when you're ready.`,
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
