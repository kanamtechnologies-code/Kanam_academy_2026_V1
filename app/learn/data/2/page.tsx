"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { hasColumns, LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

const daLesson2: DataLessonConfig = {
  id: "da-2",
  title: "2. Your First Query",
  goal: "Write and run complete SQL queries — see every row, use LIMIT, and pick the columns you care about.",
  xpReward: 100,
  badge: "🔎 Query Starter",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  lessonModule: {
    durationLabel: "~5 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "Write a complete query yourself",
        body: `Last lesson you met \`SELECT\`, \`FROM\`, and \`LIMIT\`. Now you'll put them together into full queries and learn to **choose exactly the columns you care about**.\n\nA good analyst doesn't grab everything — they ask for *just* what answers the question.`,
        image: "/images/lessons/da-2-query.png",
        imageAlt: "A magnifying glass selecting specific columns from a data table",
        callout: {
          label: "Where you see it",
          text: "When a sports site shows just \"Player\" and \"Points\" instead of every stat, someone wrote a query that selected only those columns.",
        },
      },
      {
        id: "star",
        kicker: "Two ways to SELECT",
        title: "Every column, or just the ones you need",
        body: `\`SELECT *\` returns **every** column. But usually you only want a few — so you list them by name, separated by commas. Fewer columns means a cleaner, easier-to-read answer.`,
        code: `SELECT student_name, item\nFROM lunch_orders;`,
        codeCaption: "Pick two columns by name",
        table: {
          columns: ["student_name", "item"],
          values: [
            ["Alex", "Pizza slice"],
            ["Jordan", "Salad"],
            ["Sam", "Chicken wrap"],
            ["Riley", "Fruit cup"],
          ],
          rowCount: 4,
        },
      },
      {
        id: "limit",
        kicker: "Stay tidy",
        title: "LIMIT keeps big answers short",
        body: `Real tables can have thousands of rows. \`LIMIT\` caps how many come back, which is perfect for peeking at data without loading everything.`,
        bullets: [
          "`SELECT *` → all columns. `SELECT a, b` → only those columns.",
          "Separate column names with **commas**.",
          "End every query with a semicolon `;`.",
          "`LIMIT 5` → at most 5 rows, even from a giant table.",
        ],
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now you try it",
        body: `In the exercises you'll run full queries, control the rows with \`LIMIT\`, and select just the columns you want.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/data/1",
  nextHref: "/learn/data/3",
  dashboardHref: "/dashboard",
  instructorScript: `**Coach's note**:
Great work on Lesson 1! Now you are going to **run full queries** like a data analyst.

Today you will:
1. Pull **all rows** from a table (no LIMIT)
2. Use **LIMIT** when you only want a sample
3. Pick **specific columns** instead of always using *

Read the results table after every Run & check. Row count and column names tell you if your query worked.`,
  commandReference: [
    {
      command: "Full query",
      summary:
        "A basic query has at least SELECT and FROM. Example: SELECT * FROM lunch_orders;",
      example: "SELECT * FROM lunch_orders;",
    },
    {
      command: "SELECT columns",
      summary:
        "List column names separated by commas to see only what you need — faster to read!",
      example: "SELECT student_name, item",
    },
    {
      command: "No LIMIT",
      summary:
        "If you skip LIMIT, SQL returns every row in the table. Our lunch table has 8 rows.",
      example: "SELECT * FROM lunch_orders;",
    },
    {
      command: "LIMIT",
      summary: "Add LIMIT when you want a smaller sample from a big table.",
      example: "SELECT * FROM lunch_orders LIMIT 3;",
    },
  ],
  kidExplain: [
    {
      title: "Results = answers",
      text: "After you run a query, the results table IS your answer. Count the rows and read the columns.",
    },
    {
      title: "All rows vs sample",
      text: "No LIMIT means “give me everything.” LIMIT 3 means “just show me 3 rows.”",
    },
    {
      title: "Fewer columns = clearer",
      text: "SELECT student_name, item skips order_id and price — great when you only care about who ordered what.",
    },
  ],
  steps: [
    "Run a query that returns ALL 8 lunch orders.",
    "Run the same data with LIMIT 3.",
    "Select only student_name and item columns.",
    "Challenge: student_name + price, limited to 4 rows.",
  ],
  cfu: [],
  tryThis: [
    "After Lesson 2, try SELECT item FROM lunch_orders LIMIT 5 — one column only.",
    "Compare row counts: with LIMIT vs without LIMIT.",
  ],
  dataEthicsMoment:
    "When you query real data at work or school, only select columns you are allowed to see — not extra private fields.",
  exercises: [
    {
      id: "ex-all-rows",
      title: "Exercise 1 — See every row",
      focusCommand: "SELECT + FROM",
      commandExplain:
        "A complete query needs SELECT (what columns) and FROM (which table). No LIMIT means you get every row — all 8 orders.",
      goal: "Write SELECT * FROM lunch_orders; and confirm you see 8 rows.",
      starterSql: `SELECT 
FROM lunch_orders;`,
      hint: "Type * after SELECT. End with FROM lunch_orders;",
      successMessage: "Awesome! You pulled the full table — all 8 lunch orders.",
      failureMessage: "Use SELECT * FROM lunch_orders; with no LIMIT. Expect 8 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+\*/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (/\blimit\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 8);
      },
    },
    {
      id: "ex-limit-sample",
      title: "Exercise 2 — Take a sample",
      focusCommand: "LIMIT",
      commandExplain:
        "LIMIT keeps results short. LIMIT 3 returns only three rows even though the table has eight.",
      goal: "Write SELECT * FROM lunch_orders LIMIT 3;",
      starterSql: `SELECT *
FROM lunch_orders
LIMIT ;`,
      hint: "Type 3 after LIMIT.",
      successMessage: "Nice sample! LIMIT 3 returned exactly three rows.",
      failureMessage: "Need SELECT * FROM lunch_orders LIMIT 3; and exactly 3 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\blimit\s+3\b/.test(n)) return false;
        if (!/\bselect\s+\*/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 3);
      },
    },
    {
      id: "ex-pick-columns",
      title: "Exercise 3 — Pick columns",
      focusCommand: "SELECT columns",
      commandExplain:
        "Instead of *, name the columns you want: student_name, item. The result table will only show those two columns.",
      goal: "Write SELECT student_name, item FROM lunch_orders;",
      starterSql: `SELECT 
FROM lunch_orders;`,
      hint: "Type student_name, item after SELECT (comma between them).",
      successMessage: "Perfect! You chose exactly the columns you needed.",
      failureMessage:
        "Use SELECT student_name, item FROM lunch_orders; — expect 8 rows and 2 columns.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bselect\s+student_name,\s*item\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (/\blimit\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 8 &&
            result.columns.length === 2 &&
            hasColumns(result, "student_name", "item")
        );
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Analyst challenge",
      focusCommand: "SELECT + FROM + LIMIT",
      commandExplain:
        "Combine skills: pick two columns, limit the rows. Real analysts do this to focus on a slice of data.",
      goal: "Write SELECT student_name, price FROM lunch_orders LIMIT 4;",
      starterSql: `-- Write the full query:
SELECT 
FROM lunch_orders
LIMIT ;`,
      hint: "SELECT student_name, price FROM lunch_orders LIMIT 4;",
      successMessage: "You ran a focused analyst query — columns + limit, perfect!",
      failureMessage:
        "Need SELECT student_name, price FROM lunch_orders LIMIT 4; — 4 rows, 2 columns.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bselect\s+student_name,\s*price\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (!/\blimit\s+4\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 4 &&
            hasColumns(result, "student_name", "price")
        );
      },
    },
  ],
};

export default function DataLesson2Page() {
  return <DataLessonCanvas lesson={daLesson2} />;
}
