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
  badge: "Column Picker",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You can already pull columns and rows. Today you'll get **picky** — choosing exactly which columns to show, in exactly the order you want, and stripping out repeats so a list shows each value just once.\n\nHere's the plan:\n\n• List the columns that matter and skip the rest.\n• **Reorder** columns so the most important one comes first.\n• Use \`DISTINCT\` to collapse duplicates into a clean list of **unique** values.\n\nThink about a streaming app building a "Genres" menu. The raw data has thousands of shows, many tagged "Comedy." Nobody wants "Comedy" listed 400 times — they want each genre **once**. That's exactly what \`DISTINCT\` does, and it's how playlists, filters, and dropdown menus get built.`,
        image: "/images/lessons/da-3-columns.png",
        imageAlt: "A table with two columns highlighted and the rest faded",
        callout: {
          label: "Why it matters",
          text: "Choosing the right columns in the right order is how analysts turn a messy spreadsheet into a clear answer. A \"list of unique countries our customers come from\" or \"the different products we sell\" both rely on DISTINCT to remove repeats.",
        },
      },
      {
        id: "hook",
        kicker: "Real-world hook",
        title: "Why the dropdown menu isn't 400 items long",
        body: `Open any shopping app's filter menu — "Size," "Color," "Brand." Behind the scenes, there might be 50,000 products, but the Color dropdown only lists each color **once**: Red, Blue, Green, not "Red" repeated a thousand times.\n\nSomeone wrote a query with \`DISTINCT\` to build that clean list. Without it, every dropdown, every filter, and every autocomplete suggestion on the internet would be a scrolling nightmare of duplicates.`,
        callout: {
          label: "Spot it",
          text: "Next time you see a clean dropdown list, remember: a raw table almost never has each value exactly once — DISTINCT made it that way.",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "New words for this lesson",
        body: `A few terms will make today's ideas click faster.`,
        bullets: [
          "**DISTINCT** — a keyword that removes duplicate rows from a result.",
          "**Unique value** — a value that appears only once in a list, after duplicates are removed.",
          "**Column order** — the left-to-right sequence of columns you list after SELECT.",
          "**Combination (combo)** — a pairing of values across multiple columns, like item + price together.",
        ],
      },
      {
        id: "concept-1",
        kicker: "You're in control",
        title: "Column order is up to you",
        body: `The order you list columns in \`SELECT\` is the exact order they appear in the result table. SQL doesn't care what order the columns are stored in — *you* decide how the answer reads.\n\nThink of it like arranging photos in a collage: the same pictures look different depending on what you put first. \`SELECT item, student_name\` leads with the food; \`SELECT student_name, item\` leads with the person. Same data, different emphasis.\n\nGood analysts put the **most important column first**, because people read left to right and notice the leading column most.`,
        code: `SELECT item, student_name\nFROM lunch_orders\nLIMIT 3;`,
        codeCaption: "item first, name second",
        table: {
          columns: ["item", "student_name"],
          values: [
            ["Pizza slice", "Alex"],
            ["Salad", "Jordan"],
            ["Chicken wrap", "Sam"],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "SELECT price, item FROM lunch_orders; — which column appears FIRST in the result?",
          choices: ["item", "price", "Whichever is stored first in the database"],
          correctIndex: 1,
          explanation: "SQL shows columns in the exact order you list them after SELECT — here, price comes first because it's listed first.",
        },
      },
      {
        id: "concept-2",
        kicker: "Remove duplicates",
        title: "DISTINCT shows each value once",
        body: `Our table has 8 orders, but some items repeat — two students ordered "Pizza slice" and two ordered "Salad." If you just \`SELECT item\`, you'd see those repeats. \`SELECT DISTINCT item\` collapses them so each item appears **only once** — basically a clean menu of what was ordered.\n\nPicture writing down every snack people bring to a party. \`DISTINCT\` is like crossing out duplicates so your shopping list shows each snack a single time, no matter how many people brought it.\n\nThat's why our 8 orders shrink to just **6** unique items below.`,
        code: `SELECT DISTINCT item\nFROM lunch_orders;`,
        codeCaption: "Unique items only",
        table: {
          columns: ["item"],
          values: [
            ["Pizza slice"],
            ["Salad"],
            ["Chicken wrap"],
            ["Fruit cup"],
            ["Yogurt parfait"],
            ["Burger"],
          ],
          rowCount: 6,
        },
        checkIn: {
          prompt: "8 orders include 2 Pizza slices and 2 Salads. How many rows does SELECT DISTINCT item return?",
          choices: ["8", "4", "6"],
          correctIndex: 2,
          explanation: "DISTINCT collapses the duplicate 'Pizza slice' and 'Salad' rows down to one each, so 8 orders become 6 unique items.",
        },
      },
      {
        id: "concept-3",
        kicker: "DISTINCT with multiple columns",
        title: "DISTINCT looks at the whole row you selected",
        body: `Here's the twist that surprises most beginners: \`DISTINCT\` doesn't just look at one column — it looks at the **combination** of every column you selected. \`SELECT DISTINCT item\` finds unique items, but \`SELECT DISTINCT item, price\` finds unique **item-and-price pairs**.\n\nThat means a value like "Pizza slice" could still appear twice in a multi-column DISTINCT query, *if* it had two different prices attached to it. DISTINCT is checking whether the whole row is a repeat, not just one piece of it.`,
        checkIn: {
          prompt: "If two students both ordered a Pizza slice at the SAME price, how many rows does SELECT DISTINCT item, price show for it?",
          choices: ["1 row — the combo is identical", "2 rows — one per student", "0 rows"],
          correctIndex: 0,
          explanation: "DISTINCT checks the full combination of selected columns. If item AND price match exactly, it's treated as one repeated combo and shown once.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build a unique-combos query, step by step",
        body: `Let's answer: *"What's on the menu, and what does each item cost?"* We want one clean line per item-price pair — no repeats.\n\n**Step 1 — Pick the columns.** We care about \`item\` and \`price\`, in that order: \`SELECT item, price\`.\n\n**Step 2 — Remove repeats.** Two "Pizza slice" orders would show twice, so we add \`DISTINCT\` right after \`SELECT\`.\n\n**Step 3 — Name the table.** \`FROM lunch_orders\`, then a semicolon.\n\nThe 8 orders collapse into 6 unique item-price rows — a tidy little price list.`,
        code: `-- Step 1: columns -> item, price\n-- Step 2: no repeats -> add DISTINCT\n-- Step 3: table -> lunch_orders\nSELECT DISTINCT item, price\nFROM lunch_orders;`,
        codeCaption: "Each item + price combo, exactly once",
        table: {
          columns: ["item", "price"],
          values: [
            ["Pizza slice", 3.5],
            ["Salad", 4.0],
            ["Chicken wrap", 5.25],
            ["Fruit cup", 2.75],
            ["Yogurt parfait", 3.0],
            ["Burger", 4.75],
          ],
          rowCount: 6,
        },
        callout: {
          label: "Pro tip",
          text: "`DISTINCT` always comes right after `SELECT`, never in the middle of your column list. Write `SELECT DISTINCT item, price`, not `SELECT item, DISTINCT price`.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "DISTINCT isn't a per-column filter",
        body: `The biggest trap in this lesson: thinking \`DISTINCT\` applies separately to each column you list. It doesn't — it applies to the **entire combination** at once.`,
        checkIn: {
          prompt: "Where must DISTINCT be placed in a query?",
          choices: ["Right before FROM", "Right after SELECT, before the column list", "In front of any single column, anywhere in the list"],
          correctIndex: 1,
          explanation: "DISTINCT always goes immediately after SELECT and applies to the whole row of selected columns — not in front of an individual column name.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Predict the unique count",
        body: `Before the exercises, predict: how many unique prices are there across the 8 lunch orders? (Hint: some items share the same price, like the two $4.00 salads.)\n\nWrite your guess, then once you're in the workspace try \`SELECT DISTINCT price FROM lunch_orders;\` and check your prediction.`,
      },
      {
        id: "deeper-skill",
        kicker: "Go one level deeper",
        title: "Combine DISTINCT with ORDER BY",
        body: `You'll meet \`ORDER BY\` properly in the next lesson, but here's a preview: \`DISTINCT\` and sorting play nicely together. \`SELECT DISTINCT item FROM lunch_orders ORDER BY item;\` gives you a clean, unique, **alphabetized** menu — exactly the shape a dropdown or filter list wants.`,
        bullets: [
          "DISTINCT removes duplicates first.",
          "Any sorting you add happens on the already-shrunk list.",
          "This combo is the standard recipe behind almost every filter menu you've ever used.",
        ],
      },
      {
        id: "comparison",
        kicker: "Compare & contrast",
        title: "DISTINCT vs. GROUP BY (a sneak peek)",
        body: `You'll learn \`GROUP BY\` in a later lesson, but it's worth knowing DISTINCT has a cousin. Both can produce a list of unique values — but GROUP BY also lets you calculate something *about* each group (like a count), while DISTINCT only removes duplicates.`,
        bullets: [
          "**DISTINCT** — just removes duplicate rows. No extra math.",
          "**GROUP BY** (coming soon) — bundles rows into groups AND lets you count, sum, or average within each group.",
        ],
        checkIn: {
          prompt: "You just want a plain list of every unique item — no counts needed. What's the simplest tool?",
          choices: ["GROUP BY with COUNT", "ORDER BY alone", "DISTINCT"],
          correctIndex: 2,
          explanation: "When you only need unique values with no extra calculation, DISTINCT is the simplest, most direct tool for the job.",
        },
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "Fewer columns is often safer, too",
        body: `Selecting fewer columns isn't just about tidiness — it's also about privacy. Only pull the data you actually need, especially when a table's columns hold private information like addresses, grades, or contact details.\n\nA \`DISTINCT\` list of, say, unique cities customers live in can be genuinely useful for planning — but a full list of every customer's exact home address is a very different, much riskier thing to pull.`,
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "Sanity-check your DISTINCT results",
        body: `When you run a DISTINCT query, always compare the result count to the total row count. If DISTINCT barely shrinks the numbers, that column probably has few repeats. If it shrinks a lot, you've found a genuinely repetitive column — useful to know before you build charts or summaries from it later.`,
      },
      {
        id: "standards",
        kicker: "Standards connect",
        title: "Why this lesson counts",
        body: `Cleaning duplicate values is a core step in preparing data for analysis.`,
        bullets: [
          "**CSTA 2-DA-08** — Transform data (removing duplicates) to make it more useful and reliable.",
          "**CSTA 3A-DA-10** — Use data analysis techniques like DISTINCT to identify the true set of values in a system.",
          "**ISTE Computational Thinker** — Breaking down a dataset to find its essential, non-repeating structure.",
        ],
      },
      {
        id: "reflection",
        kicker: "Reflection",
        title: "Where have you seen a 'clean list'?",
        body: `Think of a dropdown, autocomplete list, or filter menu you've used recently — course names in a school portal, genres in a music app, sizes in a shopping app. That list almost certainly came from a DISTINCT (or similar) query on a much bigger, messier table underneath.`,
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "The club fair sign-up sheet",
        body: `A club fair collected sign-ups in a table \`signups\` with columns \`student_name\` and \`club_name\`. Many students signed up for multiple clubs, so the table has far more rows than there are actual clubs.\n\nThe fair organizer asks: "Can you get me a simple list of every club that had at least one sign-up, with no repeats?" Which single keyword solves this in one line?`,
        callout: {
          label: "Apply it",
          text: "SELECT DISTINCT club_name FROM signups; — a clean, repeat-free list of every club, no matter how many students signed up for each one.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you dive in",
        body: `Let's make sure column order and DISTINCT are both locked in.`,
        checkIn: {
          prompt: "Which query lists each unique item ALONGSIDE its price, with item shown first?",
          choices: ["SELECT DISTINCT item, price FROM lunch_orders;", "SELECT DISTINCT price, item FROM lunch_orders;", "SELECT item, DISTINCT price FROM lunch_orders;"],
          correctIndex: 0,
          explanation: "DISTINCT sits right after SELECT, and listing item before price puts item first in the result — exactly what's needed here.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned to show **only what matters**: pick your columns, control their **order**, and use \`DISTINCT\` to find the **unique** values.\n\nIn the exercises you'll select two columns, swap their order, list each item once with \`DISTINCT\`, and finally find every unique item-price combo — just like the worked example.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
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
