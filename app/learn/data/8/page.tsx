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
  badge: "Question Asker",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `So far you've learned the four basic moves of SQL: \`SELECT\` (pick columns), \`WHERE\` (filter rows), \`GROUP BY\` (bundle rows into groups), and \`ORDER BY\` (sort). Today you snap them together into one powerful question — and you'll add the final piece, \`HAVING\`.\n\nHere's your roadmap:\n\n• **Stacking clauses** — how one query can filter, group, *and* sort all at once.\n• **WHERE vs. HAVING** — the single most important distinction in this lesson.\n• A **worked example** where we build a real question clause by clause.\n\nThink about a game leaderboard. "Show me every player" is easy. But "show me only the players who have won **more than 5 matches**, ranked by wins" — that's a *sharper* question. It needs grouping, counting, and a filter on those counts. That filter is \`HAVING\`, and by the end of this lesson it'll feel natural.`,
        image: "/images/lessons/da-8-questions.png",
        imageAlt: "Stacked query clauses forming a precise question",
        callout: {
          label: "Why it matters",
          text: "Almost every interesting question — \"which videos got over 1M views?\", \"which products sold more than 100 units?\", \"which users posted at least 5 times?\" — is a filter on a *total*, not on single rows. That's exactly what HAVING unlocks.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "Stack clauses to ask sharper questions",
        body: `A single clause answers a simple question. The real power of SQL shows up when you **combine** clauses in one query, because each one hands its result to the next.\n\nThink of an assembly line. The rows roll in, \`WHERE\` throws out the ones you don't want, \`GROUP BY\` bundles the survivors into piles, \`HAVING\` tosses out piles that are too small, and \`ORDER BY\` lines up what's left from biggest to smallest. Each station does one job and passes the result down the line.\n\nThis lesson adds the last station — \`HAVING\` — which filters **groups** after you've summarized them. Once you have it, you can ask almost any "which ones cross this threshold?" question.`,
        callout: {
          label: "Common misconception",
          text: "You might think you need separate queries for filtering, grouping, and sorting. You don't — one query runs all of them in a fixed order. Learning that order is the whole game.",
        },
      },
      {
        id: "where-vs-having",
        kicker: "The key distinction",
        title: "WHERE filters rows, HAVING filters groups",
        body: `This is the heart of the lesson, so slow down here. \`WHERE\` and \`HAVING\` both filter — but they filter at **different moments**.\n\n• \`WHERE\` runs **before** grouping — it looks at individual **rows**, one at a time.\n• \`HAVING\` runs **after** grouping — it looks at the **summary** of each group, like a count or a sum.\n\nHere's the analogy: imagine sorting your class into teams. \`WHERE\` is the rule you apply to *each student* before teams form ("only students in grade 8"). \`HAVING\` is the rule you apply to *each finished team* ("only teams with more than 5 players"). You literally cannot ask the team-size question until the teams exist.\n\nThat's why you can't put \`COUNT(*)\` in a \`WHERE\`: at that point no groups have formed yet, so the count doesn't exist. \`HAVING\` is the tool built for exactly that job.`,
        bullets: [
          "`WHERE price > 4` → keeps expensive *rows* (before grouping).",
          "`HAVING COUNT(*) > 1` → keeps *groups* that appear more than once.",
          "Clause order: `SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY`.",
        ],
        callout: {
          label: "Common misconception",
          text: "Writing `WHERE COUNT(*) > 1` is the classic trap — it errors out every time. The count doesn't exist before grouping, so a count filter must live in HAVING.",
        },
      },
      {
        id: "having",
        kicker: "Filter the groups",
        title: "Find items ordered more than once",
        body: `Let's see \`HAVING\` in action on our \`lunch_orders\` table. We want the **repeat favorites** — items that more than one person ordered.\n\nThe recipe reads almost like English: group the orders by item, count each group, then keep only the groups whose count is greater than 1. \`HAVING COUNT(*) > 1\` is the line doing the group-level filtering, and \`ORDER BY\` puts the most popular on top.`,
        code: `SELECT item, COUNT(*) AS order_count\nFROM lunch_orders\nGROUP BY item\nHAVING COUNT(*) > 1\nORDER BY order_count DESC;`,
        codeCaption: "Only items ordered more than once",
        table: {
          columns: ["item", "order_count"],
          values: [
            ["Pizza slice", 2],
            ["Salad", 2],
          ],
          rowCount: 2,
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build a sharp question, clause by clause",
        body: `Let's construct a query the way an analyst really does — one station of the assembly line at a time. Our question: **"Which lunch items were ordered more than once, most popular first?"**\n\n**Step 1 — Group and count.** Start by bundling every order by its item and counting each pile. This gives one row per item with its total.\n\n**Step 2 — Filter the groups.** Now add \`HAVING COUNT(*) > 1\` to drop the items that were only ordered once. Notice this filter looks at the *count*, so it has to come after \`GROUP BY\`.\n\n**Step 3 — Sort the survivors.** Finally, \`ORDER BY order_count DESC\` ranks the repeat favorites from most to least. Reading top to bottom, the answer is now obvious.`,
        code: `-- Step 1: count orders per item\nSELECT item, COUNT(*) AS order_count\nFROM lunch_orders\nGROUP BY item\n-- Step 2: keep only the repeats\nHAVING COUNT(*) > 1\n-- Step 3: rank them\nORDER BY order_count DESC;`,
        codeCaption: "The finished question, built in three steps",
        table: {
          columns: ["item", "order_count"],
          values: [
            ["Pizza slice", 2],
            ["Salad", 2],
          ],
          rowCount: 2,
        },
        callout: {
          label: "Pro tip",
          text: "Build big queries the same way: start with SELECT + FROM, run it, then add one clause at a time and re-run. If it breaks, you know exactly which clause caused it.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've leveled up from single clauses to **stacked** questions, and you've met \`HAVING\` — the filter that works on grouped totals.\n\nIn the exercises you'll combine \`WHERE\`, \`GROUP BY\`, \`HAVING\`, and \`ORDER BY\` to answer precise, real-world questions. Remember the order of the assembly line, and build one clause at a time.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
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
