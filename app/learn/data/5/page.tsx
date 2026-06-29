"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { hasColumns, LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

const daLesson5: DataLessonConfig = {
  id: "da-5",
  title: "5. Sort and Rank",
  goal: "Use ORDER BY to sort rows, flip the direction with DESC, and combine with LIMIT to find top results.",
  xpReward: 250,
  badge: "🏆 Rank Master",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Filtering tells you *which* rows you get. **Sorting** decides which ones come *first*. Today you'll learn \`ORDER BY\` — and unlock the ability to answer every "top" and "best" question.\n\nHere's the plan:\n\n• Sort rows with \`ORDER BY\` (smallest to largest by default).\n• Flip the direction with \`DESC\` to put the biggest on top.\n• Combine \`ORDER BY\` with \`LIMIT\` to build a "Top N" leaderboard.\n\nThis is the magic behind every leaderboard you've ever seen: the high-score table in a game, the "Top 50" chart on a music app, "trending" videos, or "sort by price: low to high" when you shop. All of it is \`ORDER BY\` quietly arranging the rows.`,
        image: "/images/lessons/da-5-sort.png",
        imageAlt: "Bars being arranged from shortest to tallest, like a ranking",
        callout: {
          label: "Why it matters",
          text: "Ranking turns raw data into a story: who's winning, what's most popular, what costs the most. Leaderboards, \"top 10\" lists, \"newest first,\" and \"best sellers\" are all ORDER BY in action.",
        },
      },
      {
        id: "orderby",
        kicker: "Sort it",
        title: "ORDER BY arranges the rows",
        body: `Add \`ORDER BY\` after your table (and after any \`WHERE\`), then name the column to sort on. By default SQL sorts **ascending** — smallest number first, or A-to-Z for text.\n\nThink of lining up a deck of cards from lowest to highest, or arranging your contacts alphabetically. \`ORDER BY\` does that to your rows automatically.\n\nIn the query below we sort by \`price\`, so the cheapest lunch (the Fruit cup at $2.75) floats right to the top.`,
        code: `SELECT student_name, item, price\nFROM lunch_orders\nORDER BY price;`,
        codeCaption: "Cheapest first",
        table: {
          columns: ["student_name", "item", "price"],
          values: [
            ["Riley", "Fruit cup", 2.75],
            ["Morgan", "Yogurt parfait", 3.0],
            ["Alex", "Pizza slice", 3.5],
            ["Casey", "Pizza slice", 3.5],
          ],
          rowCount: 4,
        },
        callout: {
          label: "Common misconception",
          text: "`ORDER BY` only **rearranges** rows — it never removes any. That's different from `WHERE`, which filters rows out. Sorting keeps all 8 orders; it just changes the order they're listed in.",
        },
      },
      {
        id: "desc",
        kicker: "Find the top",
        title: "DESC + LIMIT = top results",
        body: `To answer "most" or "highest" questions, flip the sort with \`DESC\` (short for *descending* — largest first). Then add \`LIMIT\` to keep just the top few. \`ORDER BY ... DESC\` followed by \`LIMIT N\` is the classic recipe for a "Top N" list.\n\nIt's exactly how a game builds its high-score board: sort everyone's score from highest to lowest, then show only the top 3 (or 10, or 100).\n\nBelow we sort by \`price DESC\` and \`LIMIT 3\` to crown the three most expensive orders.`,
        code: `SELECT student_name, item, price\nFROM lunch_orders\nORDER BY price DESC\nLIMIT 3;`,
        codeCaption: "The 3 most expensive orders",
        table: {
          columns: ["student_name", "item", "price"],
          values: [
            ["Sam", "Chicken wrap", 5.25],
            ["Taylor", "Burger", 4.75],
            ["Jordan", "Salad", 4.0],
          ],
          rowCount: 3,
        },
        bullets: [
          "`ORDER BY price` → ascending (small → large).",
          "`ORDER BY price DESC` → descending (large → small).",
          "`ORDER BY` then `LIMIT` → the top (or bottom) N.",
        ],
        callout: {
          label: "Common misconception",
          text: "`LIMIT 3` alone does **not** give you the \"top 3\" — it just grabs the first 3 rows in whatever order they happen to be. You only get a real Top 3 when you `ORDER BY` *first*, then `LIMIT`.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build a Top 3 leaderboard, step by step",
        body: `Let's answer: *"What are the three most expensive lunch orders?"*\n\n**Step 1 — Pick the columns.** Show who, what, and how much: \`SELECT student_name, item, price\`.\n\n**Step 2 — Name the table.** \`FROM lunch_orders\`.\n\n**Step 3 — Sort biggest first.** Most expensive means descending: \`ORDER BY price DESC\`.\n\n**Step 4 — Keep the top few.** Cap it at three: \`LIMIT 3\`, then a semicolon.\n\nThe result is a tidy leaderboard with the priciest order ($5.25 Chicken wrap) proudly on top.`,
        code: `-- Step 1: columns -> name, item, price\n-- Step 2: table   -> lunch_orders\n-- Step 3: sort    -> price, biggest first (DESC)\n-- Step 4: keep    -> only the top 3\nSELECT student_name, item, price\nFROM lunch_orders\nORDER BY price DESC\nLIMIT 3;`,
        codeCaption: "The Top 3 priciest orders, built four steps at a time",
        table: {
          columns: ["student_name", "item", "price"],
          values: [
            ["Sam", "Chicken wrap", 5.25],
            ["Taylor", "Burger", 4.75],
            ["Jordan", "Salad", 4.0],
          ],
          rowCount: 3,
        },
        callout: {
          label: "Pro tip",
          text: "Want the single winner instead of a top 3? Keep the same `ORDER BY ... DESC` and just change `LIMIT 3` to `LIMIT 1`. Want the *cheapest* instead? Drop `DESC` so it sorts ascending.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You can now rank your data: sort with \`ORDER BY\`, flip it with \`DESC\`, and combine with \`LIMIT\` to build a "Top N" leaderboard.\n\nIn the exercises you'll sort low-to-high, then high-to-low, grab the top 3, and finally crown the single most expensive order with its student's name — just like the worked example.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/data/4",
  nextHref: "/learn/data/6",
  dashboardHref: "/dashboard",
  instructorScript: `**Coach's note**:
"What's the most expensive lunch?" "Who's at the top?" These are **ranking** questions.

To answer them you **sort** your rows with **ORDER BY**, then often grab the top few with **LIMIT**.

Today you'll practice:
1. Sorting low → high (ascending, the default)
2. Sorting high → low with **DESC**
3. Combining **ORDER BY + LIMIT** to get a "Top N"

The order of the rows in your results matters now — read carefully!`,
  commandReference: [
    {
      command: "ORDER BY",
      summary:
        "Sorts the result by a column. By default it goes smallest to largest.",
      example: "ORDER BY price",
    },
    {
      command: "DESC",
      summary:
        "Sorts largest to smallest. Add it after the column name.",
      example: "ORDER BY price DESC",
    },
    {
      command: "ASC",
      summary:
        "Sorts smallest to largest. This is the default, so it's optional.",
      example: "ORDER BY price ASC",
    },
    {
      command: "Top N",
      summary:
        "Sort, then LIMIT to grab the top results — like a leaderboard.",
      example: "ORDER BY price DESC LIMIT 3",
    },
  ],
  kidExplain: [
    {
      title: "Sorting = lining up",
      text: "ORDER BY lines your rows up by a column, like sorting cards from low to high.",
    },
    {
      title: "DESC flips it",
      text: "DESC means descending — biggest first. Perfect for 'most expensive' questions.",
    },
    {
      title: "Top N = sort + LIMIT",
      text: "To get the 3 priciest items: sort by price DESC, then LIMIT 3.",
    },
  ],
  steps: [
    "Sort all orders by price, low to high.",
    "Sort all orders by price, high to low (DESC).",
    "Get the top 3 most expensive orders.",
    "Challenge: name + price of the single most expensive order.",
  ],
  cfu: [],
  tryThis: [
    "Try ORDER BY student_name — it sorts text alphabetically!",
    "Change LIMIT 3 to LIMIT 1 to get only the winner.",
  ],
  dataEthicsMoment:
    "Rankings feel objective, but the column you sort by decides the 'winner.' Choose it honestly and say which column you used.",
  exercises: [
    {
      id: "ex-order-asc",
      title: "Exercise 1 — Sort low to high",
      focusCommand: "ORDER BY",
      commandExplain:
        "ORDER BY price sorts from cheapest to most expensive (ascending is the default).",
      goal: "Write SELECT * FROM lunch_orders ORDER BY price;",
      starterSql: `SELECT *
FROM lunch_orders
ORDER BY ;`,
      hint: "Type price after ORDER BY.",
      successMessage: "Nice! The cheapest order (Fruit cup) is now on top.",
      failureMessage:
        "Use ORDER BY price. The first row should be the cheapest item.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\border\s+by\s+price\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (!result || result.rowCount !== 8) return false;
        const priceIdx = result.columns.findIndex(
          (c) => c.toLowerCase() === "price"
        );
        if (priceIdx < 0) return false;
        return Number(result.values[0][priceIdx]) === 2.75;
      },
    },
    {
      id: "ex-order-desc",
      title: "Exercise 2 — Sort high to low",
      focusCommand: "ORDER BY ... DESC",
      commandExplain:
        "Add DESC to sort from largest to smallest — the most expensive order lands on top.",
      goal: "Write SELECT * FROM lunch_orders ORDER BY price DESC;",
      starterSql: `SELECT *
FROM lunch_orders
ORDER BY price ;`,
      hint: "Type DESC after price.",
      successMessage: "Correct! The Chicken wrap ($5.25) is now first.",
      failureMessage:
        "Use ORDER BY price DESC. The first row should be the priciest item.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\border\s+by\s+price\s+desc\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (!result || result.rowCount !== 8) return false;
        const priceIdx = result.columns.findIndex(
          (c) => c.toLowerCase() === "price"
        );
        if (priceIdx < 0) return false;
        return Number(result.values[0][priceIdx]) === 5.25;
      },
    },
    {
      id: "ex-top-n",
      title: "Exercise 3 — Top 3",
      focusCommand: "ORDER BY + LIMIT",
      commandExplain:
        "Sort high to low, then LIMIT 3 to keep only the three most expensive orders.",
      goal: "Write SELECT * FROM lunch_orders ORDER BY price DESC LIMIT 3;",
      starterSql: `SELECT *
FROM lunch_orders
ORDER BY price DESC
LIMIT ;`,
      hint: "Type 3 after LIMIT.",
      successMessage: "Great leaderboard! The 3 priciest orders only.",
      failureMessage:
        "Use ORDER BY price DESC LIMIT 3. Expect exactly 3 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\border\s+by\s+price\s+desc\b/.test(n)) return false;
        if (!/\blimit\s+3\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 3);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — The single winner",
      focusCommand: "SELECT + ORDER BY + LIMIT",
      commandExplain:
        "Combine it all: pick two columns, sort by price DESC, and LIMIT 1 to crown the most expensive order.",
      goal: "Write SELECT student_name, price FROM lunch_orders ORDER BY price DESC LIMIT 1;",
      starterSql: `-- Who placed the single most expensive order?
SELECT 
FROM lunch_orders
ORDER BY 
LIMIT ;`,
      hint: "SELECT student_name, price ... ORDER BY price DESC LIMIT 1;",
      successMessage: "You crowned the winner: Sam's Chicken wrap at $5.25!",
      failureMessage:
        "Need student_name, price, ORDER BY price DESC, LIMIT 1 — exactly 1 row.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+student_name,\s*price\b/.test(n)) return false;
        if (!/\border\s+by\s+price\s+desc\b/.test(n)) return false;
        if (!/\blimit\s+1\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 1 &&
            hasColumns(result, "student_name", "price")
        );
      },
    },
  ],
};

export default function DataLesson5Page() {
  return <DataLessonCanvas lesson={daLesson5} />;
}
