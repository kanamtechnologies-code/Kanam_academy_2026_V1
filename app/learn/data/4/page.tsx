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
  badge: "🎯 Filter Finder",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
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
