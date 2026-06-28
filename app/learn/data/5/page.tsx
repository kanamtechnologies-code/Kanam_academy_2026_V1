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
