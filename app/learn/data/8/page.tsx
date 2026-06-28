"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

const daLesson8: DataLessonConfig = {
  id: "da-8",
  title: "8. Ask Better Questions",
  goal: "Stack clauses together — filter, group, and use HAVING to ask sharper questions of your data.",
  xpReward: 400,
  badge: "💡 Question Asker",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  prevHref: "/learn/data/7",
  nextHref: "/learn/data/9",
  dashboardHref: "/dashboard",
  instructorScript: `**Coach's note**:
You now know SELECT, WHERE, ORDER BY, GROUP BY, and COUNT. The magic is **combining** them to answer real questions.

One new tool today: **HAVING**.

- **WHERE** filters *rows* (before grouping)
- **HAVING** filters *groups* (after aggregating)

Example question: *"Which items were ordered more than once?"* You can't answer that with WHERE — you need to group, count, then HAVING COUNT(*) > 1.

Think about the question first, then build the query clause by clause.`,
  commandReference: [
    {
      command: "Clause order",
      summary:
        "SQL runs in this order: FROM → WHERE → GROUP BY → HAVING → ORDER BY.",
      example: "FROM t WHERE ... GROUP BY ... HAVING ... ORDER BY ...",
    },
    {
      command: "WHERE",
      summary: "Filters individual rows before any grouping happens.",
      example: "WHERE price >= 4",
    },
    {
      command: "HAVING",
      summary:
        "Filters groups after GROUP BY, using an aggregate like COUNT or SUM.",
      example: "HAVING COUNT(*) > 1",
    },
    {
      command: "AS (alias)",
      summary:
        "Rename a column in the result so it's easier to read and sort by.",
      example: "COUNT(*) AS order_count",
    },
  ],
  kidExplain: [
    {
      title: "WHERE vs HAVING",
      text: "WHERE throws out rows before grouping. HAVING throws out whole groups after counting.",
    },
    {
      title: "Build it in order",
      text: "Pick the table, filter rows, group them, filter groups, then sort. One clause at a time.",
    },
    {
      title: "Name your numbers",
      text: "COUNT(*) AS order_count gives the count a friendly name you can ORDER BY.",
    },
  ],
  steps: [
    "Filter pricey items, then sort them.",
    "Count orders per item with a named column.",
    "Keep only items ordered more than once (HAVING).",
    "Challenge: most-repeated items, highest first.",
  ],
  cfu: [],
  tryThis: [
    "Change HAVING COUNT(*) > 1 to >= 1 — what changes?",
    "Ask your own question, then build the query to answer it.",
  ],
  dataEthicsMoment:
    "A sharp question can still mislead if the data is incomplete. Always ask: is anything missing from this table?",
  exercises: [
    {
      id: "ex-where-order",
      title: "Exercise 1 — Filter then sort",
      focusCommand: "WHERE + ORDER BY",
      commandExplain:
        "First keep only orders priced $4 or more, then sort them most expensive first.",
      goal: "WHERE price >= 4, then ORDER BY price DESC.",
      starterSql: `SELECT *
FROM lunch_orders
WHERE price >= 4
ORDER BY ;`,
      hint: "Type price DESC after ORDER BY.",
      successMessage: "Nice! Four orders, priciest first.",
      failureMessage:
        "Use WHERE price >= 4 and ORDER BY price DESC. Expect 4 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bwhere\s+price\s*>=\s*4\b/.test(n)) return false;
        if (!/\border\s+by\s+price\s+desc\b/.test(n)) return false;
        if (!result || result.rowCount !== 4) return false;
        const priceIdx = result.columns.findIndex(
          (c) => c.toLowerCase() === "price"
        );
        if (priceIdx < 0) return false;
        return Number(result.values[0][priceIdx]) === 5.25;
      },
    },
    {
      id: "ex-count-alias",
      title: "Exercise 2 — Count per item, named",
      focusCommand: "GROUP BY + AS",
      commandExplain:
        "Group by item and count each group, giving the count a friendly name with AS.",
      goal: "SELECT item, COUNT(*) AS order_count ... GROUP BY item.",
      starterSql: `SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY ;`,
      hint: "Type item after GROUP BY.",
      successMessage: "Great! A clean count per item — 6 rows.",
      failureMessage:
        "Use COUNT(*) AS order_count and GROUP BY item. Expect 6 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bcount\s*\(\s*\*\s*\)\s+as\s+order_count\b/.test(n)) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 6 &&
            result.columns.map((c) => c.toLowerCase()).includes("order_count")
        );
      },
    },
    {
      id: "ex-having",
      title: "Exercise 3 — Filter the groups",
      focusCommand: "HAVING",
      commandExplain:
        "HAVING filters groups after counting. Keep only items that were ordered more than once.",
      goal: "Add HAVING COUNT(*) > 1 to the grouped query.",
      starterSql: `SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY item
HAVING COUNT(*) > ;`,
      hint: "Type 1 after HAVING COUNT(*) >.",
      successMessage: "Perfect! Only Pizza slice and Salad were ordered twice.",
      failureMessage:
        "Use HAVING COUNT(*) > 1. Expect 2 rows (the repeated items).",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\bhaving\s+count\s*\(\s*\*\s*\)\s*>\s*1\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 2);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Repeated items, ranked",
      focusCommand: "GROUP BY + HAVING + ORDER BY",
      commandExplain:
        "Put it together: count per item, keep only repeats, and sort by the count so the most popular is first.",
      goal: "Items ordered more than once, highest count first.",
      starterSql: `-- Which items were ordered more than once? Most popular first.
SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY item
HAVING 
ORDER BY ;`,
      hint: "HAVING COUNT(*) > 1  ...  ORDER BY order_count DESC;",
      successMessage: "You asked a sharp question and answered it — 2 repeated items, ranked!",
      failureMessage:
        "Need GROUP BY item, HAVING COUNT(*) > 1, and ORDER BY the count DESC. Expect 2 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\bhaving\s+count\s*\(\s*\*\s*\)\s*>\s*1\b/.test(n)) return false;
        if (!/\border\s+by\s+(order_count|count\s*\(\s*\*\s*\))\s+desc\b/.test(n))
          return false;
        return Boolean(result && result.rowCount === 2);
      },
    },
  ],
};

export default function DataLesson8Page() {
  return <DataLessonCanvas lesson={daLesson8} />;
}
