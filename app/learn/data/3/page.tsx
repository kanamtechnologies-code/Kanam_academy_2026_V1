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
    durationLabel: "~8 min lesson",
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
        id: "order",
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
      },
      {
        id: "distinct",
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
        callout: {
          label: "Common misconception",
          text: "`DISTINCT` looks at the **whole row** you selected, not just one column. `SELECT DISTINCT item` finds unique items, but `SELECT DISTINCT item, price` finds unique **item-and-price combos** — so a value can appear more than once if its partner column differs.",
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
