"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { hasColumns, LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

const daLesson3: DataLessonConfig = {
  id: "da-3",
  title: "3. Pick the Columns You Need",
  goal: "Choose exactly the columns you want, control their order, and use DISTINCT to remove duplicates.",
  xpReward: 150,
  badge: "📋 Column Picker",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  prevHref: "/learn/data/2",
  nextHref: "/learn/data/4",
  dashboardHref: "/dashboard",
  instructorScript: `**Coach's note**:
Great analysts don't grab every column — they grab the *right* columns.

Today you will practice:
1. **Naming columns** in the order you want them
2. Showing only what matters (less clutter = clearer answers)
3. Using **DISTINCT** to remove repeated values

Read the column names in the results table after each Run & check.`,
  commandReference: [
    {
      command: "SELECT a, b",
      summary:
        "List the exact columns you want, separated by commas. The result shows them in that order.",
      example: "SELECT student_name, price",
    },
    {
      command: "Column order",
      summary:
        "You decide the order. SELECT price, student_name shows price first.",
      example: "SELECT price, item",
    },
    {
      command: "DISTINCT",
      summary:
        "Removes duplicate rows so each value appears once. Great for 'what items exist?'",
      example: "SELECT DISTINCT item",
    },
  ],
  kidExplain: [
    {
      title: "Pick what matters",
      text: "If you only care about who ordered what, select student_name and item — skip the rest.",
    },
    {
      title: "Order is yours",
      text: "The order you list columns is the order they appear. You are in control.",
    },
    {
      title: "DISTINCT = no repeats",
      text: "Six different items were ordered, even though there are 8 orders. DISTINCT shows each item once.",
    },
  ],
  steps: [
    "Select two columns: student_name and item.",
    "Change the order: item first, then price.",
    "Use DISTINCT to list each item once.",
    "Challenge: list each distinct item with its price.",
  ],
  cfu: [],
  tryThis: [
    "Try SELECT DISTINCT price — how many different prices are there?",
    "Swap the column order and watch the table change.",
  ],
  dataEthicsMoment:
    "Selecting fewer columns is also safer: only pull the data you actually need, especially when columns hold private info.",
  exercises: [
    {
      id: "ex-two-columns",
      title: "Exercise 1 — Two columns",
      focusCommand: "SELECT columns",
      commandExplain:
        "Name the columns you want, separated by a comma. Here we only want who ordered and what they ordered.",
      goal: "Write SELECT student_name, item FROM lunch_orders;",
      starterSql: `SELECT 
FROM lunch_orders;`,
      hint: "Type student_name, item after SELECT.",
      successMessage: "Nice! You pulled exactly two columns.",
      failureMessage:
        "Use SELECT student_name, item FROM lunch_orders; — expect 8 rows and 2 columns.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+student_name,\s*item\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 8 &&
            result.columns.length === 2 &&
            hasColumns(result, "student_name", "item")
        );
      },
    },
    {
      id: "ex-column-order",
      title: "Exercise 2 — Choose the order",
      focusCommand: "Column order",
      commandExplain:
        "The order you list columns is the order they show. Put item first, then price.",
      goal: "Write SELECT item, price FROM lunch_orders;",
      starterSql: `SELECT 
FROM lunch_orders;`,
      hint: "Type item, price after SELECT (item first).",
      successMessage: "Perfect! item appears before price, just like you asked.",
      failureMessage:
        "Use SELECT item, price FROM lunch_orders; with item listed first.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+item,\s*price\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 8 &&
            result.columns.length === 2 &&
            result.columns[0].toLowerCase() === "item"
        );
      },
    },
    {
      id: "ex-distinct",
      title: "Exercise 3 — Remove duplicates",
      focusCommand: "DISTINCT",
      commandExplain:
        "DISTINCT keeps one of each value. There are 8 orders but only 6 different items.",
      goal: "Write SELECT DISTINCT item FROM lunch_orders;",
      starterSql: `SELECT DISTINCT 
FROM lunch_orders;`,
      hint: "Type item after DISTINCT.",
      successMessage: "Great! DISTINCT returned each item once — 6 rows.",
      failureMessage:
        "Use SELECT DISTINCT item FROM lunch_orders; — expect 6 unique items.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+distinct\s+item\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 6);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Distinct combos",
      focusCommand: "SELECT DISTINCT a, b",
      commandExplain:
        "DISTINCT works across multiple columns too — it keeps each unique combination once.",
      goal: "Write SELECT DISTINCT item, price FROM lunch_orders;",
      starterSql: `-- Write the full query (no blanks):
SELECT 
FROM lunch_orders;`,
      hint: "SELECT DISTINCT item, price FROM lunch_orders;",
      successMessage: "You did it! Each item+price combo appears exactly once.",
      failureMessage:
        "Need SELECT DISTINCT item, price FROM lunch_orders; — expect 6 rows, 2 columns.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+distinct\s+item,\s*price\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 6 &&
            hasColumns(result, "item", "price")
        );
      },
    },
  ],
};

export default function DataLesson3Page() {
  return <DataLessonCanvas lesson={daLesson3} />;
}
