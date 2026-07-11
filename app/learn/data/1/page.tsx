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
  badge: "Data Spotter",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Welcome to the **Data Analyst Track**! Today you'll meet the building blocks of *every* data question and write your very first lines of **SQL** — the language that powers almost every app you use.\n\nHere's the plan:\n\n• What **data** really is, and why it's stored in **tables**.\n• How to read a table by its **rows** and **columns**.\n• Your first three SQL words — \`SELECT\`, \`FROM\`, and \`LIMIT\` — and how to combine them into a real query.\n\nThink about your favorite video game's leaderboard, the "Top 50" playlist on a music app, or your school's grade portal. Behind every one of those screens is a giant table of data, and someone wrote a query to pull out exactly what you see. By the end of this lesson, *you* will be that someone.`,
        image: "/images/lessons/da-1-table.png",
        imageAlt: "A clean spreadsheet-style table of rows and columns",
        callout: {
          label: "Why it matters",
          text: "When a sports app shows \"points per game\" or your phone suggests the next song, a program asked a data table a question and got an answer back. Learning SQL means learning to ask those questions yourself — a skill used by scientists, game studios, hospitals, and every big company on earth.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "Data is just organized information",
        body: `A **data analyst's** job is to **ask questions** of information and find real, trustworthy answers. The first step is realizing that almost all useful information is stored in a tidy, organized way.\n\nMost data lives in **tables** — neat grids of **rows** and **columns**, just like a spreadsheet. Think of a table like the stats screen for a sports team: every player gets one line, and every line has the same boxes (games played, points, assists).\n\nToday's table is a list of school **lunch orders**. It's small enough to read at a glance, but it works *exactly* the same way as a table with ten million rows. The skills you learn on this tiny table scale up to the biggest databases in the world.`,
        callout: {
          label: "Where you see it",
          text: "A class roster, an NBA stats sheet, an online store's order history, your music library — all of these are tables of data just waiting to be questioned.",
        },
      },
      {
        id: "anatomy",
        kicker: "How to read a table",
        title: "Rows are records, columns are fields",
        body: `Here's our \`lunch_orders\` table. Every table is built the same two ways, and once you see the pattern you'll spot it everywhere.\n\n• Each **row** is one **record** — a single lunch order placed by one student.\n• Each **column** is one **field** — \`order_id\`, \`student_name\`, \`item\`, and \`price\`.\n• Every row has the **same** columns, which is exactly what makes a table tidy, predictable, and searchable.\n\nA handy way to remember it: rows go **across** (one thing each), columns go **down** (one fact about every thing). In a video game leaderboard, each *row* is a player and each *column* is a stat like rank, score, or username.`,
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
        callout: {
          label: "Common misconception",
          text: "Rows and columns are easy to mix up. Remember: a **row** is one whole record (one order), while a **column** is a single field shared by every record (every order has a price). Rows = things, columns = facts about those things.",
        },
      },
      {
        id: "sql",
        kicker: "The tool",
        title: "SQL is how you ask the table questions",
        body: `**SQL** (most people say it like the word "sequel") stands for *Structured Query Language*. It's the language you use to talk to data tables: you write a short, clear question, and the database answers with a brand-new table of results.\n\nImagine texting a super-organized librarian: "Show me the first three orders." That sentence has three parts — *what* you want, *where* to look, and *how much*. SQL works the same way with three starter words:\n\n• \`SELECT\` — *which columns* you want (use \`*\` to mean "all of them").\n• \`FROM\` — *which table* to read.\n• \`LIMIT\` — *how many rows* to return.\n\nNotice the query ends with a semicolon \`;\` — that's how you tell SQL "I'm done, go run it."`,
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
        callout: {
          label: "Common misconception",
          text: "The `*` in `SELECT *` is a shortcut for \"every column,\" not a typo. It's like saying \"give me the whole row.\" Later you'll often list just the columns you care about instead.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Let's build a query step by step",
        body: `Watch how the three words snap together into one working question. We'll build it the way a real analyst does — one piece at a time.\n\n**Step 1 — Pick the columns.** We want everything, so we start with \`SELECT *\`.\n\n**Step 2 — Name the table.** The data lives in \`lunch_orders\`, so we add \`FROM lunch_orders\`.\n\n**Step 3 — Limit the rows.** We only want a quick peek, so we cap it with \`LIMIT 2\` and finish with a semicolon.\n\nSQL reads these from top to bottom and hands back a small result table — just the first two orders, every column included.`,
        code: `-- Step 1: which columns?  ->  all of them\n-- Step 2: which table?    ->  lunch_orders\n-- Step 3: how many rows?   ->  just 2\nSELECT *\nFROM lunch_orders\nLIMIT 2;`,
        codeCaption: "The finished query, built three steps at a time",
        table: {
          columns: ["order_id", "student_name", "item", "price"],
          values: [
            [1, "Alex", "Pizza slice", 3.5],
            [2, "Jordan", "Salad", 4.0],
          ],
          rowCount: 2,
        },
        callout: {
          label: "Pro tip",
          text: "Lines that start with `--` are SQL **comments** — notes for humans that the database skips. Pros use them to explain *why* a query does something.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've met the three words behind every basic data question: \`SELECT\` (which columns), \`FROM\` (which table), and \`LIMIT\` (how many rows).\n\nIn the exercises you'll practice each one on its own, then combine all three into your very first complete query — exactly like the worked example above. Take it one blank at a time and read the results table after each run.\n\nClick **Start the exercises** when you're ready.`,
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
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 1 — Reorder the query",
      focusCommand: "SELECT + FROM + LIMIT",
      commandExplain: "These SQL lines are scrambled. Put them in a working order.",
      goal: "Reorder into a valid query that returns 3 rows.",
      starterSql: "",
      parsonsLines: ["SELECT *", "FROM lunch_orders", "LIMIT 3;"],
      hint: "SELECT → FROM → LIMIT.",
      successMessage: "Order is right — you built a real query.",
      failureMessage: "Need SELECT * FROM lunch_orders LIMIT 3;",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bselect\s+\*/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (!/\blimit\s+3\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 3);
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 2 — Debug the query",
      focusCommand: "FROM",
      commandExplain: "This query is almost right, but the table name is wrong.",
      goal: "Fix the bug so it reads lunch_orders and returns 5 rows.",
      starterSql: `SELECT *
FROM lunch_order
LIMIT 5;`,
      debugHint: "table name / spelling",
      hint: "The table is lunch_orders (with an s).",
      successMessage: "Fixed — table names must match exactly.",
      failureMessage: "Use FROM lunch_orders (plural) and LIMIT 5.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bselect\s+\*/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (/\blunch_order\b/.test(n) && !/\blunch_orders\b/.test(n)) return false;
        if (!/\blimit\s+5\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 5);
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 3 — Predict the rows",
      focusCommand: "LIMIT",
      commandExplain: "This query is finished. Predict how many rows it returns.",
      goal: "Type a number prediction, then Run & check.",
      starterSql: `SELECT *
FROM lunch_orders
LIMIT 2;`,
      codeReadOnly: true,
      predictionPrompt: "How many rows will come back?",
      acceptedPredictions: ["2", "2 rows", "two", "two rows"],
      hint: "Look at the LIMIT number.",
      successMessage: "Yes — LIMIT 2 means at most two rows.",
      failureMessage: "Read the LIMIT carefully.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\blimit\s+2\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 2);
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 4 — Write it yourself",
      focusCommand: "from scratch",
      commandExplain: "No blanks. Write a full query: all columns from lunch_orders, limited to 5 rows.",
      goal: "Type the complete query in the editor.",
      starterSql: `-- Write your full query below\n`,
      hint: "SELECT * FROM lunch_orders LIMIT 5;",
      successMessage: "You wrote a real SQL query from scratch.",
      failureMessage: "Need SELECT * FROM lunch_orders LIMIT 5 with exactly 5 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
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
