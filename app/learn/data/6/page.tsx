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
