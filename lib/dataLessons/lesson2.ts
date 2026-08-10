import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";
import { hasColumns, LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

export const daLesson2: DataLessonConfig = {
  id: "da-2",
  title: "2. Your First Query",
  goal: "Write and run complete SQL queries — see every row, use LIMIT, and pick the columns you care about.",
  xpReward: 100,
  badge: "Query Starter",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  lessonModule: {
    durationLabel: "~20–25 min lesson",
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
        id: "hook",
        kicker: "Real-world hook",
        title: "Why apps never show you the whole database",
        body: `Open any sports app and tap a player's card. You see a name, a photo, and maybe three stats. You do **not** see their internal player ID, their sign-up date, or a dozen other columns the app's database actually stores.\n\nThat's not an accident — it's a deliberate query. Someone decided *exactly* which columns matter for that screen and wrote a \`SELECT\` that grabs only those. Every polished screen you've ever used hides a focused query just like the ones you're about to write.`,
        callout: {
          label: "Notice it",
          text: "Next time you open an app, ask yourself: what columns am I NOT seeing, and why might the designer have left them out?",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "New words for this lesson",
        body: `A few terms will make today's ideas click faster.`,
        bullets: [
          "**Full query** — a complete SQL statement with at least SELECT and FROM.",
          "**Sample** — a small slice of rows pulled from a bigger table, usually with LIMIT.",
          "**Column list** — the comma-separated names after SELECT.",
          "**Trailing comma** — an extra comma left at the end of a list, a common typo that breaks a query.",
        ],
      },
      {
        id: "concept-1",
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
        checkIn: {
          prompt: "You only care about student_name and price. Which SELECT is best?",
          choices: [
            "SELECT student_name, price FROM lunch_orders",
            "SELECT * FROM lunch_orders",
            "SELECT student_name price FROM lunch_orders",
          ],
          correctIndex: 0,
          explanation: "Listing the exact columns you need, separated by a comma, keeps the result focused on just student_name and price.",
        },
      },
      {
        id: "concept-2",
        kicker: "Stay tidy",
        title: "LIMIT keeps big answers short",
        body: `Real tables can have thousands — even millions — of rows. You almost never want them all dumped on screen at once. \`LIMIT\` caps how many rows come back, which is perfect for peeking at data without loading everything.\n\nThink of \`LIMIT 5\` like scrolling only the first few results instead of the entire feed. It's fast, it's tidy, and it's how analysts safely sample a giant table before running a bigger question.\n\nLeaving \`LIMIT\` off means "give me **all** the rows." Our lunch table has 8 rows, so with no \`LIMIT\` you'll get all 8. Add \`LIMIT 3\` and you'll get just the first 3.`,
        bullets: [
          "`SELECT *` → all columns. `SELECT a, b` → only those columns.",
          "Separate column names with **commas** (none after the last one).",
          "End every query with a semicolon `;`.",
          "`LIMIT 5` → at most 5 rows, even from a giant table.",
        ],
        checkIn: {
          prompt: "If a table has 8 rows and you write a query with NO LIMIT, how many rows come back?",
          choices: ["0", "Exactly 5", "All 8"],
          correctIndex: 2,
          explanation: "No LIMIT means \"give me everything.\" With 8 rows in the table, that's all 8.",
        },
      },
      {
        id: "concept-3",
        kicker: "Rows vs. columns, revisited",
        title: "LIMIT and SELECT control two different things",
        body: `It's easy to blur these two together when you're new, so let's separate them cleanly. \`SELECT\` controls **which columns** appear — the width of your result table. \`LIMIT\` controls **how many rows** appear — the height of your result table.\n\nChanging one never affects the other. Adding a third column to your \`SELECT\` list doesn't change your row count, and lowering your \`LIMIT\` doesn't remove any columns.`,
        checkIn: {
          prompt: "You want FEWER rows in your result. Which keyword should you change?",
          choices: ["LIMIT", "SELECT", "FROM"],
          correctIndex: 0,
          explanation: "LIMIT controls row count. SELECT controls which columns show, and FROM names the table — neither affects how many rows you get back.",
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
        id: "misconception",
        kicker: "Common misconception",
        title: "Trailing commas and mixed-up controls",
        body: `Two mistakes cause most of the errors beginners see this lesson.`,
        bullets: [
          "The commas go **between** column names, not after the last one. `SELECT student_name, item,` (trailing comma) is broken.",
          "`LIMIT` controls **rows** (how many records), not **columns** (how many fields). To change columns, edit your `SELECT` list instead.",
        ],
        checkIn: {
          prompt: "What's wrong with `SELECT student_name, item, FROM lunch_orders;`?",
          choices: [
            "There's a trailing comma after \"item\" with nothing after it",
            "Nothing, it will run fine",
            "FROM should come before SELECT",
          ],
          correctIndex: 0,
          explanation: "SQL expects another column name after every comma. A trailing comma with nothing after it causes an error.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Guess the row count before you run",
        body: `Before the exercises, predict the row count for this query: \`SELECT item FROM lunch_orders LIMIT 6;\` (the table has 8 rows total).\n\nThen predict this one: \`SELECT item, price FROM lunch_orders;\` with no LIMIT at all. Once you're in the workspace, run both and see if your predictions held up.`,
        callout: {
          label: "Why this helps",
          text: "Predicting first turns every query into a mini-experiment. If your prediction is wrong, you'll remember the correct rule far better than if you'd just read it.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Go one level deeper",
        title: "Column order still matters, even with fewer columns",
        body: `When you list specific columns, the order you type them in is the order they appear in the result — just like with \`SELECT *\` vs. named columns. \`SELECT price, student_name\` puts price first; \`SELECT student_name, price\` puts the name first.\n\nThis becomes a real design choice once you're picking your own columns: lead with whichever fact matters most for the question you're answering.`,
      },
      {
        id: "comparison",
        kicker: "Compare & contrast",
        title: "SELECT * vs. a focused SELECT",
        body: `Both are valid — the trick is knowing when to reach for each one.`,
        bullets: [
          "**SELECT \\*** — great for a first look at a brand-new table, when you don't yet know what matters.",
          "**SELECT a, b** — better once you know exactly what you need; faster, cleaner, and safer.",
          "Professionals rarely ship a final report with `SELECT *` — they narrow it down once they understand the data.",
        ],
        checkIn: {
          prompt: "You're exploring a brand-new table for the first time. What's the better first move?",
          choices: ["Immediately write a 10-column focused SELECT", "Skip straight to filtering with WHERE", "SELECT * LIMIT 5 — peek at everything first"],
          correctIndex: 2,
          explanation: "When a table is unfamiliar, a quick SELECT * with a small LIMIT is the standard first move — you narrow the columns down once you understand what's there.",
        },
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "Selecting less is often more responsible",
        body: `When you query real data at school or at work, only select columns you're allowed to see — not extra private fields just because they're available. If a table has a column like "home address" or "grade average" that isn't relevant to your question, leave it out of your SELECT list.\n\nThis is the same skill you just practiced — being deliberate about which columns to grab — applied to privacy instead of just tidiness.`,
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "Build the habit: name your columns on purpose",
        body: `Starting today, try to avoid reflexively typing \`SELECT *\` for every query. Pause for a second and ask: *what do I actually need to answer this question?*`,
        bullets: [
          "Ask the question first, then pick columns that answer it — not the other way around.",
          "If your result table has columns you're not using, trim your SELECT list next time.",
        ],
      },
      {
        id: "reflection",
        kicker: "Reflection",
        title: "Think about a screen you use every day",
        body: `Pick an app or website you use daily. What are 2–3 columns of data it's probably storing about you that it never actually shows you on screen? Why might the designers have chosen to hide those from view?`,
        callout: {
          label: "Journal it",
          text: "Write down your guess. There's no single right answer — the goal is practicing the habit of thinking in columns.",
        },
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "The yearbook committee's request",
        body: `The yearbook committee has a table \`students\` with columns \`student_id\`, \`student_name\`, \`grade\`, \`homeroom\`, and \`emergency_contact\`. They ask you for "a list of student names and grades for the yearbook captions" — nothing else.\n\nWhich columns should your SELECT include, and which should it deliberately leave out? Why does leaving out \`emergency_contact\` matter here, beyond just tidiness?`,
        callout: {
          label: "Apply it",
          text: "SELECT student_name, grade FROM students; — exactly what was asked for, and nothing sensitive tagging along.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you dive in",
        body: `Let's confirm the two controls are locked in: SELECT for columns, LIMIT for rows.`,
        checkIn: {
          prompt: "Which query returns exactly 2 columns and at most 3 rows from an 8-row table?",
          choices: [
            "SELECT * FROM lunch_orders LIMIT 3",
            "SELECT student_name, item FROM lunch_orders LIMIT 3",
            "SELECT student_name, item, price, order_id FROM lunch_orders",
          ],
          correctIndex: 1,
          explanation: "Listing exactly two columns controls the width, and LIMIT 3 controls the height — together they shape a small, focused result.",
        },
      },
      {
        id: "output-walkthrough",
        kicker: "Query walkthrough",
        title: "Watch row count and column count change together",
        body: `This query asks for **two columns** and **at most four rows**. After it runs, check both dimensions of the result table.\n\n**Width:** only \`student_name\` and \`price\` appear — not \`order_id\` or \`item\`.\n\n**Height:** exactly four rows come back, even though the full table has eight.\n\nChanging \`LIMIT\` affects height only. Changing the \`SELECT\` list affects width only. Keeping those two checks separate is how analysts catch mistakes fast.`,
        code: `SELECT student_name, price\nFROM lunch_orders\nLIMIT 4;`,
        codeCaption: "Two columns, four rows — check both",
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
        output: "2 columns returned · 4 rows returned",
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
      text: "No LIMIT means “give me everything.” LIMIT 3 means “just show me 3 rows.",
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
  cfu: [
    {
      question: "What does a query result table represent?",
      answer:
        "The database’s answer to your question — a new table of rows/columns that match what your SQL asked for.",
    },
    {
      question: "When would you use SELECT * versus naming specific columns?",
      answer:
        "SELECT * shows every column (good for exploring). Naming columns focuses the answer on what matters and makes results easier to read.",
    },
    {
      question: "What happens if you omit LIMIT on a large table?",
      answer:
        "The database may return every matching row, which can be hard to read and slow. LIMIT is a controlled sample while you explore.",
    },
  ],
  tryThis: [
    "After Lesson 2, try SELECT item FROM lunch_orders LIMIT 5 — one column only.",
    "Compare row counts: with LIMIT vs without LIMIT.",
  ],
  dataEthicsMoment:
    "When you query real data at work or school, only select columns you are allowed to see — not extra private fields.",
  exercises: [
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 1 — Reorder columns query",
      focusCommand: "SELECT columns",
      commandExplain: "Scrambled query that should show student_name and item for every order.",
      goal: "Reorder into a working query (8 rows, 2 columns).",
      starterSql: "",
      parsonsLines: ["SELECT student_name, item", "FROM lunch_orders;"],
      hint: "SELECT list first, then FROM.",
      successMessage: "Nice — you selected just the columns you need.",
      failureMessage: "Need SELECT student_name, item FROM lunch_orders;",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bselect\s+student_name,\s*item\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 8 && hasColumns(result, "student_name", "item"));
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 2 — Debug LIMIT",
      focusCommand: "LIMIT",
      commandExplain: "This sample query should return 3 rows, but LIMIT is wrong.",
      goal: "Fix it so exactly 3 rows come back.",
      starterSql: `SELECT *
FROM lunch_orders
LIMIT 30;`,
      debugHint: "wrong limit value",
      hint: "You only want a tiny sample — three rows.",
      successMessage: "Fixed — LIMIT 3 keeps the sample small.",
      failureMessage: "Use LIMIT 3 for a three-row sample.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bselect\s+\*/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (!/\blimit\s+3\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 3);
      },
    },
    {
      id: "ex-predict-limit",
      kind: "predict",
      title: "Exercise 3 — Predict the sample",
      focusCommand: "LIMIT",
      commandExplain: "Predict how many rows this query returns.",
      goal: "Type your prediction, then Run & check.",
      starterSql: `SELECT *
FROM lunch_orders
LIMIT 3;`,
      codeReadOnly: true,
      predictionPrompt: "How many rows will this query return?",
      acceptedPredictions: ["3", "3 rows", "three", "three rows"],
      hint: "LIMIT 3 caps the result at three rows.",
      successMessage: "Yes — LIMIT 3 means at most three rows.",
      failureMessage: "Look at the LIMIT number in the query.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bselect\s+\*/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (!/\blimit\s+3\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 3);
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 4 — Build a focused query",
      focusCommand: "from scratch",
      commandExplain: "Write a query that shows student_name and price, limited to 4 rows.",
      goal: "Write the full query yourself.",
      starterSql: `-- student_name + price, sample of 4\n`,
      hint: "SELECT student_name, price FROM lunch_orders LIMIT 4;",
      successMessage: "Analyst move — focused columns and a clean sample.",
      failureMessage: "Need student_name, price, FROM lunch_orders, LIMIT 4.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bselect\s+student_name,\s*price\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (!/\blimit\s+4\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 4 && hasColumns(result, "student_name", "price"));
      },
    },
  ],
};

