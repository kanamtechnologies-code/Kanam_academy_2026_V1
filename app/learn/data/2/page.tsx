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
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson you met \`SELECT\`, \`FROM\`, and \`LIMIT\` one at a time. Today you'll snap them together into **complete queries you write yourself** — no more filling in single blanks.\n\nHere's the plan:\n\n• Pull **every row** from a table (and know how many to expect).\n• Use \`LIMIT\` to grab a quick **sample** instead of everything.\n• **Choose exactly the columns** that answer your question.\n\nPicture a stats site for your favorite sport. The full database has dozens of columns per player, but the page you see shows just "Name" and "Points." That's a query that asked for *only* what mattered. A good analyst is like a smart shopper — they grab exactly what's on the list, not the whole store.`,
        image: "/images/lessons/da-2-query.png",
        imageAlt: "A magnifying glass selecting specific columns from a data table",
        callout: {
          label: "Why it matters",
          text: "Asking for less data on purpose makes answers faster to load, easier to read, and safer (you don't pull private columns you don't need). Every clean dashboard or app screen you've seen is built from focused queries like the ones you're about to write.",
        },
      },
      {
        id: "star",
        kicker: "Two ways to SELECT",
        title: "Every column, or just the ones you need",
        body: `There are two flavors of \`SELECT\`. \`SELECT *\` returns **every** column — handy when you want the full picture. But most of the time you only care about a few fields, so you list them **by name**, separated by commas.\n\nThink of ordering at a restaurant. \`SELECT *\` is like saying "bring me one of everything on the menu." Listing columns by name — \`SELECT student_name, item\` — is ordering exactly the two dishes you actually want.\n\nFewer columns means a cleaner, faster, easier-to-read answer. The query below skips \`order_id\` and \`price\` and shows just who ordered and what they got.`,
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
        callout: {
          label: "Common misconception",
          text: "The commas go **between** column names, not after the last one. `SELECT student_name, item` is correct; `SELECT student_name, item,` (with a trailing comma) will cause an error because SQL expects another column name after it.",
        },
      },
      {
        id: "limit",
        kicker: "Stay tidy",
        title: "LIMIT keeps big answers short",
        body: `Real tables can have thousands — even millions — of rows. You almost never want them all dumped on screen at once. \`LIMIT\` caps how many rows come back, which is perfect for peeking at data without loading everything.\n\nThink of \`LIMIT 5\` like scrolling only the first few results instead of the entire feed. It's fast, it's tidy, and it's how analysts safely sample a giant table before running a bigger question.\n\nLeaving \`LIMIT\` off means "give me **all** the rows." Our lunch table has 8 rows, so with no \`LIMIT\` you'll get all 8. Add \`LIMIT 3\` and you'll get just the first 3.`,
        bullets: [
          "`SELECT *` → all columns. `SELECT a, b` → only those columns.",
          "Separate column names with **commas** (none after the last one).",
          "End every query with a semicolon `;`.",
          "`LIMIT 5` → at most 5 rows, even from a giant table.",
        ],
        callout: {
          label: "Common misconception",
          text: "`LIMIT` controls **rows** (how many records), not **columns** (how many fields). To control columns, change your `SELECT` list. To control rows, change your `LIMIT` (or add a `WHERE`, which you'll meet soon).",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build a focused query, step by step",
        body: `Let's answer a real question: *"Show me who ordered and how much they paid — but just a small sample."* We'll build it one decision at a time.\n\n**Step 1 — Pick the columns.** We care about the student and the price, so: \`SELECT student_name, price\`.\n\n**Step 2 — Name the table.** The data is in \`lunch_orders\`, so: \`FROM lunch_orders\`.\n\n**Step 3 — Sample the rows.** We only want a peek, so we cap it: \`LIMIT 4\`, then finish with a semicolon.\n\nThe result is a clean two-column table with exactly four rows — focused, fast, and easy to read.`,
        code: `-- Step 1: which columns?  -> student_name, price\n-- Step 2: which table?    -> lunch_orders\n-- Step 3: how many rows?  -> just 4\nSELECT student_name, price\nFROM lunch_orders\nLIMIT 4;`,
        codeCaption: "Two chosen columns, limited to a 4-row sample",
        table: {
          columns: ["student_name", "price"],
          values: [
            ["Alex", 3.5],
            ["Jordan", 4.0],
            ["Sam", 5.25],
            ["Riley", 2.75],
          ],
          rowCount: 4,
        },
        callout: {
          label: "Pro tip",
          text: "Read your result table like a checklist: does the **row count** match what you expected, and are the **column names** the ones you asked for? Those two checks catch most mistakes instantly.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've leveled up from filling blanks to writing **whole queries**. You can pull every row, take a quick sample with \`LIMIT\`, and select just the columns you care about.\n\nIn the exercises you'll run a full table, grab a sample, pick specific columns, and finally combine columns + \`LIMIT\` into one focused analyst query — just like the worked example.\n\nClick **Start the exercises** when you're ready.`,
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
