"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { hasColumns, LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

const daLesson1: DataLessonConfig = {
  id: "da-1",
  title: "1. What Is Data?",
  goal: "Learn rows, columns, and your first SQL commands — one exercise at a time, then put them together.",
  xpReward: 50,
  badge: "📊 Data Spotter",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  lessonModule: {
    durationLabel: "~5 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "Data is organized information",
        body: `Welcome to the Data Analyst Track! A data analyst's job is to **ask questions** of information and find real answers.\n\nMost data lives in **tables** — neat grids of **rows** and **columns**, just like a spreadsheet. Today's table is a list of school lunch orders.`,
        image: "/images/lessons/da-1-table.png",
        imageAlt: "A clean spreadsheet-style table of rows and columns",
        callout: {
          label: "Where you see it",
          text: "A class roster, a sports stats sheet, an online store's order history, your music library — all of these are tables of data waiting to be questioned.",
        },
      },
      {
        id: "anatomy",
        kicker: "How to read a table",
        title: "Rows are records, columns are fields",
        body: `Here's our \`lunch_orders\` table. Look at how it's built:\n\n• Each **row** is one record — a single lunch order.\n• Each **column** is one field — \`order_id\`, \`student_name\`, \`item\`, \`price\`.\n• Every row has the **same** columns, which is what makes a table tidy and searchable.`,
        table: {
          columns: ["order_id", "student_name", "item", "price"],
          values: [
            [1, "Alex", "Pizza slice", 3.5],
            [2, "Jordan", "Salad", 4.0],
            [3, "Sam", "Chicken wrap", 5.25],
            [4, "Riley", "Fruit cup", 2.75],
          ],
          rowCount: 4,
        },
      },
      {
        id: "sql",
        kicker: "The tool",
        title: "SQL is how you ask the table questions",
        body: `**SQL** (say it "sequel") is the language for talking to data tables. You write a short question and the database answers with a table of results. Your first three words:\n\n• \`SELECT\` — *which columns* you want.\n• \`FROM\` — *which table* to read.\n• \`LIMIT\` — *how many rows* to return.`,
        code: `SELECT *\nFROM lunch_orders\nLIMIT 3;`,
        codeCaption: "Ask for the first 3 rows, all columns",
        table: {
          columns: ["order_id", "student_name", "item", "price"],
          values: [
            [1, "Alex", "Pizza slice", 3.5],
            [2, "Jordan", "Salad", 4.0],
            [3, "Sam", "Chicken wrap", 5.25],
          ],
          rowCount: 3,
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now you try it",
        body: `In the exercises you'll practice \`SELECT\`, \`FROM\`, and \`LIMIT\` one at a time, then combine them into your very first complete query.\n\nClick **Start the exercises** when you're ready.`,
        callout: {
          label: "Data ethics",
          text: "These student names are fake. Never put real people's private information in a dataset unless you have permission.",
        },
      },
    ],
  },
  instructorScript: `**Coach's note**:
Welcome to the Data Analyst Track!

Today you will work with a **table** of school lunch orders. Each **row** is one order. Each **column** is one field (name, item, price).

You will practice **three SQL commands** — one at a time — then combine them in a final challenge:

1. **SELECT** — what columns to show
2. **FROM** — which table to read
3. **LIMIT** — how many rows to return

Work through each exercise in the SQL workspace. Click **Run & check** after each query. The last exercise puts everything together.`,
  commandReference: [
    {
      command: "SELECT",
      summary:
        "Tells the database WHICH columns you want to see. Use * (star) as a shortcut for every column.",
      example: "SELECT student_name, item",
    },
    {
      command: "FROM",
      summary:
        "Tells the database WHICH table to read from. The table name must match exactly.",
      example: "FROM lunch_orders",
    },
    {
      command: "LIMIT",
      summary:
        "Caps how many rows come back. Great for peeking at big tables without loading everything.",
      example: "LIMIT 5",
    },
    {
      command: "* (star)",
      summary:
        "A shortcut meaning all columns. SELECT * shows every column in the table.",
      example: "SELECT *",
    },
  ],
  kidExplain: [
    {
      title: "Rows = records",
      text: "Each row is one lunch order — one student, one item, one price.",
    },
    {
      title: "Columns = fields",
      text: "Columns are the labels: order_id, student_name, item, price. Every row has the same columns.",
    },
    {
      title: "SQL = questions",
      text: "You write SQL to ask the database a question. It answers with a table of results.",
    },
  ],
  steps: [
    "Study the sample lunch_orders table.",
    "Complete Exercise 1 — SELECT (pick columns).",
    "Complete Exercise 2 — FROM (name the table).",
    "Complete Exercise 3 — LIMIT (control row count).",
    "Complete Exercise 4 — combine all three commands.",
  ],
  cfu: [],
  tryThis: [
    "After finishing, change LIMIT 5 to LIMIT 3 in the final query and run again.",
    "Try SELECT item, price only — what columns appear?",
  ],
  dataEthicsMoment:
    "This table uses fake student names. Never share real people's private info in a dataset unless you have permission.",
  dashboardHref: "/dashboard",
  nextHref: "/learn/data/2",
  exercises: [
    {
      id: "ex-select",
      title: "Exercise 1 — Practice SELECT",
      focusCommand: "SELECT",
      commandExplain:
        "SELECT lists the columns you want back. The star (*) means all columns — order_id, student_name, item, and price.",
      goal: "Type * right after SELECT to ask for every column.",
      starterSql: `SELECT 
FROM lunch_orders
LIMIT 3;`,
      hint: "Click the editor and type * after SELECT (means all columns).",
      successMessage: "Nice! SELECT * asks for every column.",
      failureMessage: "Use SELECT * to grab all columns — type * right after SELECT.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+\*/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 3 && hasColumns(result, "student_name", "item"));
      },
    },
    {
      id: "ex-from",
      title: "Exercise 2 — Practice FROM",
      focusCommand: "FROM",
      commandExplain:
        "FROM points to the table you are reading. Here our table is called lunch_orders — spelling matters!",
      goal: "Type the table name lunch_orders after FROM.",
      starterSql: `SELECT student_name, item
FROM 
LIMIT 3;`,
      hint: "The table is called lunch_orders (lowercase, with an underscore).",
      successMessage: "Correct! FROM lunch_orders tells SQL where the data lives.",
      failureMessage: "Type the table name lunch_orders after FROM.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+student_name,\s*item\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 3 && result.columns.length === 2);
      },
    },
    {
      id: "ex-limit",
      title: "Exercise 3 — Practice LIMIT",
      focusCommand: "LIMIT",
      commandExplain:
        "LIMIT stops the result after N rows. LIMIT 5 returns at most five rows — even if the table has hundreds.",
      goal: "Type 5 after LIMIT so only five rows come back.",
      starterSql: `SELECT *
FROM lunch_orders
LIMIT ;`,
      hint: "Type the number 5 after LIMIT.",
      successMessage: "Perfect! LIMIT 5 keeps the result short and readable.",
      failureMessage: "Set LIMIT to 5 and make sure exactly 5 rows appear.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\blimit\s+5\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 5);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Put it all together",
      focusCommand: "SELECT + FROM + LIMIT",
      commandExplain:
        "Real analysts combine commands in one query. You write the full statement yourself — no blanks!",
      goal: "Write a complete query: all columns, from lunch_orders, limited to 5 rows.",
      starterSql: `-- Write the full query below (no blanks):
SELECT 
FROM 
LIMIT ;`,
      hint: "SELECT * FROM lunch_orders LIMIT 5;",
      successMessage: "You did it! You wrote a real SQL query from scratch.",
      failureMessage:
        "Need: SELECT *, FROM lunch_orders, LIMIT 5, and exactly 5 rows in the results.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+\*/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (!/\blimit\s+5\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 5 && hasColumns(result, "student_name", "price"));
      },
    },
  ],
};

export default function DataLesson1Page() {
  return <DataLessonCanvas lesson={daLesson1} />;
}
