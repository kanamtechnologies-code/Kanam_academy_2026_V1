"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { hasColumns, normSql, SCHOOL_DB_SEED } from "@/lib/dataLessonHelpers";

const daLesson10: DataLessonConfig = {
  id: "da-10",
  title: "10. Your Data Project",
  goal: "Put it all together — explore, join, summarize, and rank to answer a real question: who spent the most?",
  xpReward: 500,
  badge: "🎓 Data Analyst",
  previewTable: "orders",
  seedData: SCHOOL_DB_SEED,
  prevHref: "/learn/data/9",
  nextHref: undefined,
  dashboardHref: "/dashboard",
  chartConfig: {
    type: "bar",
    xKey: "student_name",
    yKey: "total_spent",
    title: "Total spent per student",
  },
  instructorScript: `**Coach's note**:
This is your capstone. No single new command — instead you'll **combine everything** like a real analyst.

Our two tables are back:
- **students** (student_id, student_name, grade)
- **orders** (order_id, student_id, item, price)

Your mission across these exercises: figure out **which student spent the most money**. You'll get there step by step — explore, join, summarize, then rank.

Take your time and read each result. You've earned this. 🎓`,
  commandReference: [
    {
      command: "Explore",
      summary: "Start by looking at the raw data with SELECT * so you know what you have.",
      example: "SELECT * FROM orders",
    },
    {
      command: "JOIN",
      summary: "Connect orders to students on the shared student_id key.",
      example: "JOIN students ON orders.student_id = students.student_id",
    },
    {
      command: "GROUP BY + SUM",
      summary: "Group by student, then SUM their prices to get total spend.",
      example: "GROUP BY student_name ... SUM(price) AS total_spent",
    },
    {
      command: "ORDER BY + LIMIT",
      summary: "Sort by total spend, LIMIT 1 to crown the top spender.",
      example: "ORDER BY total_spent DESC LIMIT 1",
    },
  ],
  kidExplain: [
    {
      title: "Think in steps",
      text: "Big questions break into small queries: explore → join → summarize → rank.",
    },
    {
      title: "Totals per person",
      text: "GROUP BY student_name with SUM(price) gives each student's total spend in one row.",
    },
    {
      title: "Rank to answer",
      text: "Sort the totals high to low and LIMIT 1 to find the single top spender.",
    },
  ],
  steps: [
    "Explore the orders table.",
    "Join orders to students to see names.",
    "Total each student's spending.",
    "Challenge: crown the top spender.",
  ],
  cfu: [],
  tryThis: [
    "Swap SUM for AVG to find who paid the highest average price.",
    "Add HAVING SUM(price) > 5 to keep only bigger spenders.",
  ],
  dataEthicsMoment:
    "You just profiled spending by person. In the real world, that's sensitive — analyze responsibly, anonymize when you can, and respect privacy.",
  exercises: [
    {
      id: "ex-explore",
      title: "Exercise 1 — Explore the data",
      focusCommand: "SELECT *",
      commandExplain:
        "Every project starts with a look at the raw data. Pull all the orders so you know what you're working with.",
      goal: "Write SELECT * FROM orders;",
      starterSql: `SELECT 
FROM orders;`,
      hint: "Type * after SELECT.",
      successMessage: "Good start — 5 orders to work with.",
      failureMessage: "Use SELECT * FROM orders; — expect 5 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+\*/.test(n)) return false;
        if (!/\bfrom\s+orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 5);
      },
    },
    {
      id: "ex-join",
      title: "Exercise 2 — Add the names",
      focusCommand: "JOIN",
      commandExplain:
        "Order rows only have student_id. Join to students so you can see who placed each order.",
      goal: "Show student_name, item, price by joining the tables.",
      starterSql: `SELECT student_name, item, price
FROM orders
JOIN students ON orders.student_id = students.student_id;`,
      hint: "The starter query is complete — Run & check to see names beside orders.",
      successMessage: "Now every order has a name attached.",
      failureMessage:
        "Keep the JOIN on student_id and select student_name, item, price. Expect 5 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bon\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 5 &&
            hasColumns(result, "student_name", "item", "price")
        );
      },
    },
    {
      id: "ex-totals",
      title: "Exercise 3 — Total per student",
      focusCommand: "GROUP BY + SUM",
      commandExplain:
        "Group the joined rows by student_name and SUM their prices to get each student's total spend.",
      goal: "Total each student's spending with SUM(price) AS total_spent.",
      starterSql: `SELECT student_name, SUM(price) AS total_spent
FROM orders
JOIN students ON orders.student_id = students.student_id
GROUP BY ;`,
      hint: "Type student_name after GROUP BY.",
      successMessage: "Excellent! One total per student — 4 rows (and a chart!).",
      failureMessage:
        "Use SUM(price) AS total_spent and GROUP BY student_name. Expect 4 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bsum\s*\(\s*price\s*\)\s+as\s+total_spent\b/.test(n)) return false;
        if (!/\bgroup\s+by\s+student_name\b/.test(n)) return false;
        if (!/\bjoin\s+students\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 4 &&
            result.columns.map((c) => c.toLowerCase()).includes("total_spent")
        );
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Crown the top spender",
      focusCommand: "Full pipeline",
      commandExplain:
        "Finish the project: join, total per student, sort by total_spent DESC, and LIMIT 1 to find the biggest spender.",
      goal: "Find the single student who spent the most.",
      starterSql: `-- Who spent the most money in total?
SELECT student_name, SUM(price) AS total_spent
FROM orders
JOIN students ON orders.student_id = students.student_id
GROUP BY student_name
ORDER BY 
LIMIT ;`,
      hint: "ORDER BY total_spent DESC LIMIT 1;",
      successMessage:
        "🎓 Project complete! Alex is the top spender at $6.25. You're a Data Analyst!",
      failureMessage:
        "Need GROUP BY student_name, ORDER BY total_spent DESC, LIMIT 1 — exactly 1 row.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bgroup\s+by\s+student_name\b/.test(n)) return false;
        if (!/\border\s+by\s+total_spent\s+desc\b/.test(n)) return false;
        if (!/\blimit\s+1\b/.test(n)) return false;
        if (!result || result.rowCount !== 1) return false;
        return hasColumns(result, "student_name", "total_spent");
      },
    },
  ],
};

export default function DataLesson10Page() {
  return <DataLessonCanvas lesson={daLesson10} />;
}
