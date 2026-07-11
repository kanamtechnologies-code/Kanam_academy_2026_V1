"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { hasColumns, LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

const daLesson4: DataLessonConfig = {
  id: "da-4",
  title: "4. Find What You're Looking For",
  goal: "Use WHERE to filter rows — match text, compare numbers, and combine conditions with AND / OR.",
  xpReward: 200,
  badge: "Filter Finder",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `So far you've controlled **columns** (which fields to show). Today you take control of **rows** with \`WHERE\` — keeping only the records that match a condition. This is the single most-used tool in all of data analysis.\n\nHere's the plan:\n\n• Match **text** exactly with \`WHERE column = 'value'\`.\n• Compare **numbers** with \`>\`, \`<\`, \`>=\`, and \`<=\`.\n• Combine conditions with \`AND\` (both true) and \`OR\` (either true).\n\nEvery time you tap a filter — "show me games under $20," "4-star-and-up reviews," "players on my team" — an app is running a \`WHERE\` clause behind the scenes. Filtering turns a giant pile of data into the exact slice you actually care about.`,
        image: "/images/lessons/da-4-filter.png",
        imageAlt: "A funnel filtering many rows down to a few matching ones",
        callout: {
          label: "Why it matters",
          text: "Filtering is the heart of asking good questions: \"only the salads,\" \"only orders over $4,\" \"only 8th graders.\" Every search bar and filter button — flights under $300, in-stock items, your friends' posts — is a WHERE clause doing the work.",
        },
      },
      {
        id: "match",
        kicker: "Match text",
        title: "WHERE keeps only matching rows",
        body: `Add \`WHERE\` right after the table name, then a **condition** — a true-or-false test SQL runs on every row. Rows that pass the test stay; the rest are filtered out. Think of \`WHERE\` like a bouncer checking each row against a rule.\n\nTo match **text**, wrap the value in **single quotes** and use a single \`=\`. The quotes tell SQL "this is a text value to match," not the name of a column.\n\nThe query below keeps only the rows where \`item\` is exactly "Salad" — and out of 8 orders, just 2 make it through.`,
        code: `SELECT *\nFROM lunch_orders\nWHERE item = 'Salad';`,
        codeCaption: "Only the salad orders",
        table: {
          columns: ["order_id", "student_name", "item", "price"],
          values: [
            [2, "Jordan", "Salad", 4.0],
            [8, "Jamie", "Salad", 4.0],
          ],
          rowCount: 2,
        },
        callout: {
          label: "Common misconception",
          text: "In SQL, you test for a match with a **single** `=`, not the double `==` used in many programming languages. And text always needs single quotes: `WHERE item = 'Salad'` works, but `WHERE item = Salad` makes SQL look for a *column* named Salad and fail.",
        },
      },
      {
        id: "compare",
        kicker: "Compare & combine",
        title: "Numbers, AND, and OR",
        body: `For **numbers**, you skip the quotes and can compare with \`>\` (greater than), \`<\` (less than), \`>=\` (greater than or equal), and \`<=\` (less than or equal). So \`WHERE price > 4\` keeps only the pricier orders.\n\nWhen one rule isn't enough, **combine** conditions. \`AND\` means *both* must be true (it narrows your results). \`OR\` means *at least one* must be true (it widens them). It's like filters on a shopping site: checking more "AND" boxes shows fewer items; "OR" between options shows more.\n\nThe example below finds orders that cost more than $4 — exactly 2 of them.`,
        code: `SELECT *\nFROM lunch_orders\nWHERE price > 4;`,
        codeCaption: "Orders more expensive than $4",
        table: {
          columns: ["order_id", "student_name", "item", "price"],
          values: [
            [3, "Sam", "Chicken wrap", 5.25],
            [7, "Taylor", "Burger", 4.75],
          ],
          rowCount: 2,
        },
        bullets: [
          "**Text** needs single quotes: `WHERE item = 'Salad'`.",
          "**Numbers** don't: `WHERE price > 4`.",
          "`AND` = both true (narrower); `OR` = at least one true (wider).",
        ],
        callout: {
          label: "Common misconception",
          text: "`>` and `>=` are different at the boundary. `WHERE price > 4` skips the $4.00 salads, but `WHERE price >= 4` includes them. When a result count surprises you, check whether your comparison should include the edge value.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build a filter, step by step",
        body: `Let's answer: *"Which orders cost $4.00 or more?"* — including the orders that land exactly on $4.\n\n**Step 1 — Pick the columns.** We'll keep everything: \`SELECT *\`.\n\n**Step 2 — Name the table.** \`FROM lunch_orders\`.\n\n**Step 3 — Filter the rows.** Since "$4.00 or more" includes 4 itself, we use \`>=\`, not \`>\`: \`WHERE price >= 4\`, then a semicolon.\n\nThis time the two $4.00 salads count too, so we get **4** rows instead of 2 — a great reminder that \`>=\` includes the boundary.`,
        code: `-- Step 1: columns -> all of them\n-- Step 2: table   -> lunch_orders\n-- Step 3: filter  -> price 4 or more (use >=)\nSELECT *\nFROM lunch_orders\nWHERE price >= 4;`,
        codeCaption: "Every order priced $4.00 or higher",
        table: {
          columns: ["order_id", "student_name", "item", "price"],
          values: [
            [2, "Jordan", "Salad", 4.0],
            [3, "Sam", "Chicken wrap", 5.25],
            [7, "Taylor", "Burger", 4.75],
            [8, "Jamie", "Salad", 4.0],
          ],
          rowCount: 4,
        },
        callout: {
          label: "Pro tip",
          text: "When you filter, predict the row count *before* you run it (\"I expect about 4 orders\"). If the real result is wildly different, your condition probably isn't saying what you meant.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned to filter rows with \`WHERE\`: match **text** with quotes and \`=\`, compare **numbers** with \`>\` and \`>=\`, and combine rules with \`AND\` / \`OR\`.\n\nIn the exercises you'll filter to just the salads, then to pricier orders, then include the boundary with \`>=\`, and finally widen your search with \`OR\` — watching the row count change each time.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/data/3",
  nextHref: "/learn/data/5",
  dashboardHref: "/dashboard",
  instructorScript: `**Coach's note**:
So far you've pulled whole tables. Real questions sound like *"show me only the salads"* or *"only orders over $4."*

That's what **WHERE** does — it keeps only the rows that match a condition.

Today you'll practice:
1. Matching text with **=** (remember the quotes!)
2. Comparing numbers with **>**, **>=**
3. Combining conditions with **OR**

Watch the row count drop as your filter gets more specific.`,
  commandReference: [
    {
      command: "WHERE",
      summary:
        "Keeps only rows that match a condition. It comes after FROM.",
      example: "WHERE item = 'Salad'",
    },
    {
      command: "= (text)",
      summary:
        "Match text exactly. Text values must be wrapped in 'single quotes'.",
      example: "WHERE item = 'Burger'",
    },
    {
      command: "> and >=",
      summary:
        "Compare numbers. > means greater than, >= means greater than or equal.",
      example: "WHERE price > 4",
    },
    {
      command: "OR / AND",
      summary:
        "Combine conditions. OR = either is true. AND = both must be true.",
      example: "WHERE item = 'Salad' OR item = 'Burger'",
    },
  ],
  kidExplain: [
    {
      title: "WHERE = a filter",
      text: "Think of a coffee filter: only the rows that match your condition get through.",
    },
    {
      title: "Quotes for text",
      text: "Text needs quotes: item = 'Salad'. Numbers don't: price > 4.",
    },
    {
      title: "Combine conditions",
      text: "OR widens your search (either condition). AND narrows it (both must be true).",
    },
  ],
  steps: [
    "Filter to only Salad orders.",
    "Filter to orders priced over $4.",
    "Filter to orders priced $4 or more.",
    "Challenge: show only Salad OR Burger orders.",
  ],
  cfu: [],
  tryThis: [
    "Try WHERE price < 3 — which cheap items show up?",
    "Try WHERE student_name = 'Alex'.",
  ],
  dataEthicsMoment:
    "Filters decide what you see. A biased filter can hide important rows — always ask what your WHERE clause leaves out.",
  exercises: [
    {
      id: "ex-where-text",
      title: "Exercise 1 — Match text",
      focusCommand: "WHERE =",
      commandExplain:
        "Use WHERE with = to match text exactly. Text must be in single quotes: 'Salad'.",
      goal: "Write SELECT * FROM lunch_orders WHERE item = 'Salad';",
      starterSql: `SELECT *
FROM lunch_orders
WHERE item = ;`,
      hint: "Type 'Salad' (with single quotes) after the = sign.",
      successMessage: "Nice! Two students ordered a Salad.",
      failureMessage:
        "Use WHERE item = 'Salad' (quotes matter). Expect 2 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bwhere\s+item\s*=\s*'salad'/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 2);
      },
    },
    {
      id: "ex-where-number",
      title: "Exercise 2 — Compare numbers",
      focusCommand: "WHERE >",
      commandExplain:
        "Numbers don't need quotes. price > 4 keeps only rows where the price is greater than 4.",
      goal: "Write SELECT * FROM lunch_orders WHERE price > 4;",
      starterSql: `SELECT *
FROM lunch_orders
WHERE price > ;`,
      hint: "Type the number 4 after the > sign.",
      successMessage: "Correct! Only the pricier items (over $4) came back.",
      failureMessage: "Use WHERE price > 4. Expect 2 rows (5.25 and 4.75).",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bwhere\s+price\s*>\s*4\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 2);
      },
    },
    {
      id: "ex-where-gte",
      title: "Exercise 3 — Greater or equal",
      focusCommand: "WHERE >=",
      commandExplain:
        ">= includes the boundary. price >= 4 keeps 4.00 as well as anything higher.",
      goal: "Write SELECT * FROM lunch_orders WHERE price >= 4;",
      starterSql: `SELECT *
FROM lunch_orders
WHERE price >= ;`,
      hint: "Type 4 after >=. This time the $4.00 salads count too.",
      successMessage: "Great! >= included the $4.00 orders — 4 rows.",
      failureMessage: "Use WHERE price >= 4. Expect 4 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bwhere\s+price\s*>=\s*4\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 4);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Combine with OR",
      focusCommand: "WHERE ... OR ...",
      commandExplain:
        "OR lets a row pass if either condition is true. Here: salads OR burgers.",
      goal: "Write a query for item = 'Salad' OR item = 'Burger'.",
      starterSql: `-- Show only Salad or Burger orders:
SELECT *
FROM lunch_orders
WHERE ;`,
      hint: "WHERE item = 'Salad' OR item = 'Burger';",
      successMessage: "You did it! Two salads and one burger = 3 rows.",
      failureMessage:
        "Need WHERE item = 'Salad' OR item = 'Burger'. Expect 3 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bwhere\b/.test(n)) return false;
        if (!/'salad'/.test(n) || !/'burger'/.test(n)) return false;
        if (!/\bor\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(
          result && result.rowCount === 3 && hasColumns(result, "item")
        );
      },
    },
  ],
};

export default function DataLesson4Page() {
  return <DataLessonCanvas lesson={daLesson4} />;
}
