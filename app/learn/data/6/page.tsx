"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import {
  approxEquals,
  firstCellNumber,
  LUNCH_ORDERS_SEED,
  normSql,
} from "@/lib/dataLessonHelpers";

const daLesson6: DataLessonConfig = {
  id: "da-6",
  title: "6. Count and Summarize",
  goal: "Turn many rows into one answer with COUNT, SUM, and AVG — then break totals down by group with GROUP BY.",
  xpReward: 300,
  badge: "🧮 Summary Pro",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Until now every query handed you back **rows**. But often you don't want the rows — you want the **summary**. "How many orders?" "How much money total?" "What's the average price?" Today you'll teach SQL to do the math for you.\n\nHere's the plan:\n\n• Count rows with \`COUNT(*)\`.\n• Add up a column with \`SUM\`, and average one with \`AVG\`.\n• Use \`GROUP BY\` to get those numbers **per category** instead of for the whole table.\n\nThis is how every stats screen you've ever seen gets built: "1,204 total sales," "average rating 4.6," "posts per user," your overall grade average, a player's points-per-game. Each of those is a pile of rows squeezed down into one meaningful number.`,
        image: "/images/lessons/da-6-count.png",
        imageAlt: "Many rows collapsing into a single summary number",
        callout: {
          label: "Why it matters",
          text: "Summaries turn raw data into headlines. Nobody scrolls a million sales records — they read \"$2.3M in sales this month.\" Aggregates like COUNT, SUM, and AVG are how dashboards, report cards, and sports stats get made.",
        },
      },
      {
        id: "aggregate",
        kicker: "The summary functions",
        title: "COUNT, SUM, and AVG",
        body: `These are called **aggregate functions** — "aggregate" just means "combine many things into one." Each one takes a whole column and squeezes it down to a **single** number for the entire table.\n\nThe three workhorses:\n\n• \`COUNT(*)\` — *how many* rows there are.\n• \`SUM(price)\` — *add up* every value in a number column.\n• \`AVG(price)\` — the *average* (mean) of a number column.\n\nThink of a teacher with a stack of quizzes: \`COUNT\` is "how many students turned one in," \`SUM\` is "all the points added together," and \`AVG\` is "the class average." The \`AS\` keyword renames each result so the answer reads nicely.`,
        code: `SELECT COUNT(*) AS orders,\n       SUM(price) AS total,\n       AVG(price) AS avg_price\nFROM lunch_orders;`,
        codeCaption: "Summarize the whole table",
        table: {
          columns: ["orders", "total", "avg_price"],
          values: [[8, 30.75, 3.84]],
          rowCount: 1,
        },
        callout: {
          label: "Common misconception",
          text: "`COUNT` and `SUM` are not the same! `COUNT(*)` tells you **how many rows** (8 orders), while `SUM(price)` **adds up the values** inside a column ($30.75). One counts records, the other totals dollars.",
        },
      },
      {
        id: "groupby",
        kicker: "Break it down",
        title: "GROUP BY summarizes per category",
        body: `A single grand total is useful, but the real power comes from breaking it down **per category**. \`GROUP BY\` splits the rows into groups that share a value, then runs your aggregate on **each group** separately.\n\nImagine sorting a pile of orders into labeled bins — one bin per menu item — then counting how many are in each bin. \`GROUP BY item\` with \`COUNT(*)\` does exactly that, telling you how popular each item is.\n\nThe result has a **label column** (the category) and a **number column** (the summary) — the perfect shape for a bar chart later. Below is a preview; the full result has one row per unique item.`,
        code: `SELECT item, COUNT(*) AS order_count\nFROM lunch_orders\nGROUP BY item;`,
        codeCaption: "Orders per item (preview of the groups)",
        table: {
          columns: ["item", "order_count"],
          values: [
            ["Pizza slice", 2],
            ["Salad", 2],
            ["Chicken wrap", 1],
            ["Burger", 1],
          ],
          rowCount: 4,
        },
        bullets: [
          "`COUNT(*)` counts rows; `SUM`/`AVG` work on number columns.",
          "`AS` renames the result column so it's readable.",
          "`GROUP BY x` → one summary row per value of `x`.",
        ],
        callout: {
          label: "Common misconception",
          text: "When you mix a normal column with an aggregate — like `SELECT item, COUNT(*)` — that normal column has to appear in `GROUP BY`. Forgetting `GROUP BY item` is the #1 beginner mistake here, and SQL will complain or give a confusing answer.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Rank the menu, step by step",
        body: `Let's answer: *"Which lunch items are most popular?"* — counting orders per item and putting the favorite on top.\n\n**Step 1 — Pick the label + the summary.** \`SELECT item, COUNT(*) AS order_count\`.\n\n**Step 2 — Name the table.** \`FROM lunch_orders\`.\n\n**Step 3 — Make the groups.** One bin per item: \`GROUP BY item\`.\n\n**Step 4 — Rank them.** Most popular first: \`ORDER BY order_count DESC\`, then a semicolon.\n\nThe 8 orders collapse into 6 item groups, sorted so Pizza slice and Salad (2 orders each) lead the menu.`,
        code: `-- Step 1: label + summary -> item, COUNT(*)\n-- Step 2: table           -> lunch_orders\n-- Step 3: one bin per item -> GROUP BY item\n-- Step 4: most popular top -> ORDER BY ... DESC\nSELECT item, COUNT(*) AS order_count\nFROM lunch_orders\nGROUP BY item\nORDER BY order_count DESC;`,
        codeCaption: "Orders per item, most popular first",
        table: {
          columns: ["item", "order_count"],
          values: [
            ["Pizza slice", 2],
            ["Salad", 2],
            ["Chicken wrap", 1],
            ["Fruit cup", 1],
            ["Yogurt parfait", 1],
            ["Burger", 1],
          ],
          rowCount: 6,
        },
        callout: {
          label: "Pro tip",
          text: "You can `ORDER BY` the renamed aggregate column (`order_count`) just like any other column. Combining `GROUP BY` with `ORDER BY ... DESC` is the standard recipe for \"most popular,\" \"top sellers,\" and \"busiest day.\"",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You can now summarize data instead of just listing it: count rows with \`COUNT(*)\`, total a column with \`SUM\`, average one with \`AVG\`, and break any of them down **per category** with \`GROUP BY\`.\n\nIn the exercises you'll count all the orders, add up the total spent, count orders per item, and finally rank the menu from most to fewest — just like the worked example.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/data/5",
  nextHref: "/learn/data/7",
  dashboardHref: "/dashboard",
  instructorScript: `**Coach's note**:
Sometimes you don't want the rows — you want the *summary*. "How many orders?" "What's the total?" "What's the average price?"

These are **aggregate** questions, and SQL has special functions for them:

1. **COUNT(*)** — how many rows
2. **SUM(price)** — add a column up
3. **AVG(price)** — the average
4. **GROUP BY** — calculate the summary *per group* (e.g., per item)

One number can answer a big question. Let's go.`,
  commandReference: [
    {
      command: "COUNT(*)",
      summary:
        "Counts how many rows match. COUNT(*) on the whole table tells you the total number of orders.",
      example: "SELECT COUNT(*) FROM lunch_orders",
    },
    {
      command: "SUM(col)",
      summary: "Adds up all the values in a number column.",
      example: "SELECT SUM(price) FROM lunch_orders",
    },
    {
      command: "AVG(col)",
      summary: "Calculates the average (mean) of a number column.",
      example: "SELECT AVG(price) FROM lunch_orders",
    },
    {
      command: "GROUP BY",
      summary:
        "Splits rows into groups, then runs the aggregate for each group.",
      example: "SELECT item, COUNT(*) FROM lunch_orders GROUP BY item",
    },
  ],
  kidExplain: [
    {
      title: "Aggregate = one answer",
      text: "Aggregates squeeze many rows into a single summary number, like a total or an average.",
    },
    {
      title: "COUNT vs SUM",
      text: "COUNT tells you HOW MANY rows. SUM adds up the VALUES inside a column.",
    },
    {
      title: "GROUP BY = per category",
      text: "GROUP BY item gives you one summary row per item — like 'how many of each lunch.'",
    },
  ],
  steps: [
    "Count how many orders there are.",
    "Add up the total of all prices.",
    "Count orders per item with GROUP BY.",
    "Challenge: rank items by how often they were ordered.",
  ],
  cfu: [],
  tryThis: [
    "Try SELECT AVG(price) FROM lunch_orders — what's the average lunch cost?",
    "Try SELECT MIN(price), MAX(price) FROM lunch_orders.",
  ],
  dataEthicsMoment:
    "Averages can hide outliers. One very expensive order can pull the average up — always look at counts and totals too.",
  exercises: [
    {
      id: "ex-count",
      title: "Exercise 1 — Count the rows",
      focusCommand: "COUNT(*)",
      commandExplain:
        "COUNT(*) returns a single number: how many rows are in the table. No GROUP BY needed.",
      goal: "Write SELECT COUNT(*) FROM lunch_orders;",
      starterSql: `SELECT 
FROM lunch_orders;`,
      hint: "Type COUNT(*) after SELECT.",
      successMessage: "Correct! There are 8 orders in the table.",
      failureMessage: "Use SELECT COUNT(*) FROM lunch_orders; — the answer is 8.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+count\s*\(\s*\*\s*\)/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 1 && firstCellNumber(result) === 8);
      },
    },
    {
      id: "ex-sum",
      title: "Exercise 2 — Add up the total",
      focusCommand: "SUM()",
      commandExplain:
        "SUM(price) adds every price together. Great for 'how much money in total?'",
      goal: "Write SELECT SUM(price) FROM lunch_orders;",
      starterSql: `SELECT 
FROM lunch_orders;`,
      hint: "Type SUM(price) after SELECT.",
      successMessage: "Nice! The lunch orders total $30.75.",
      failureMessage:
        "Use SELECT SUM(price) FROM lunch_orders; — the total is 30.75.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+sum\s*\(\s*price\s*\)/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(
          result && result.rowCount === 1 && approxEquals(firstCellNumber(result), 30.75)
        );
      },
    },
    {
      id: "ex-group-by",
      title: "Exercise 3 — Count per item",
      focusCommand: "GROUP BY",
      commandExplain:
        "GROUP BY item makes one group per item, then COUNT(*) counts the orders in each group.",
      goal: "Write SELECT item, COUNT(*) FROM lunch_orders GROUP BY item;",
      starterSql: `SELECT item, COUNT(*)
FROM lunch_orders
GROUP BY ;`,
      hint: "Type item after GROUP BY.",
      successMessage: "Great! One row per item — 6 groups in all.",
      failureMessage:
        "Use SELECT item, COUNT(*) FROM lunch_orders GROUP BY item; — expect 6 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+item\s*,\s*count\s*\(\s*\*\s*\)/.test(n)) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 6);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Most popular items",
      focusCommand: "GROUP BY + ORDER BY",
      commandExplain:
        "Count per item, then sort by the count so the most popular item is on top.",
      goal: "Count orders per item and sort from most to fewest.",
      starterSql: `-- Most popular items first:
SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY item
ORDER BY ;`,
      hint: "ORDER BY order_count DESC (or ORDER BY COUNT(*) DESC).",
      successMessage: "You ranked the menu! Pizza slice and Salad lead with 2 each.",
      failureMessage:
        "Need GROUP BY item and ORDER BY the count DESC — expect 6 rows, highest first.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\border\s+by\s+(order_count|count\s*\(\s*\*\s*\))\s+desc\b/.test(n))
          return false;
        if (!result || result.rowCount !== 6) return false;
        const countIdx = result.columns.findIndex((c) =>
          c.toLowerCase().includes("count") || c.toLowerCase() === "order_count"
        );
        if (countIdx < 0) return false;
        return Number(result.values[0][countIdx]) === 2;
      },
    },
  ],
};

export default function DataLesson6Page() {
  return <DataLessonCanvas lesson={daLesson6} />;
}
