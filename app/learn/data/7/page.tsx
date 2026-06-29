"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { hasColumns, normSql, SCHOOL_DB_SEED } from "@/lib/dataLessonHelpers";

const daLesson7: DataLessonConfig = {
  id: "da-7",
  title: "7. Combine Tables",
  goal: "Use JOIN to connect two tables — match orders to the students who placed them with a shared key.",
  xpReward: 350,
  badge: "🔗 Table Joiner",
  previewTable: "orders",
  seedData: SCHOOL_DB_SEED,
  lessonModule: {
    durationLabel: "~6 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "Connect two tables together",
        body: `Real data is usually split across **several** tables so nothing is repeated. One table lists **students**, another lists **orders**. Neither tells the whole story alone.\n\n\`JOIN\` stitches them together using a shared **key** — so you can ask "*who* ordered *what*?"`,
        image: "/images/lessons/da-7-join.png",
        imageAlt: "Two tables linked together by a connecting key",
        callout: {
          label: "Where you see it",
          text: "An online store keeps customers in one table and orders in another, then JOINs them to print \"Maria ordered a backpack.\" Almost every app works this way.",
        },
      },
      {
        id: "split",
        kicker: "Why split data?",
        title: "Two tables, one shared key",
        body: `The \`students\` table has a \`student_id\`. The \`orders\` table also has a \`student_id\` — that's the **shared key** that links a row in one table to a row in the other.\n\nStoring the name once (in students) instead of on every order keeps data tidy and avoids mistakes.`,
        table: {
          columns: ["student_id", "student_name", "grade"],
          values: [
            [1, "Alex", 6],
            [2, "Jordan", 7],
            [3, "Sam", 8],
            [4, "Riley", 6],
          ],
          rowCount: 4,
        },
      },
      {
        id: "join",
        kicker: "Stitch them",
        title: "JOIN ... ON the shared key",
        body: `\`JOIN\` the second table and tell SQL how to match rows with \`ON\`. Here we match each order to its student by their \`student_id\`. Now you can show the **name** next to the **item**.`,
        code: `SELECT students.student_name, orders.item\nFROM students\nJOIN orders\n  ON students.student_id = orders.student_id;`,
        codeCaption: "Match each order to its student",
        table: {
          columns: ["student_name", "item"],
          values: [
            ["Alex", "Pizza slice"],
            ["Jordan", "Salad"],
            ["Sam", "Chicken wrap"],
            ["Alex", "Fruit cup"],
            ["Riley", "Burger"],
          ],
          rowCount: 5,
        },
        bullets: [
          "`JOIN` brings in a second table.",
          "`ON tableA.key = tableB.key` says how rows match.",
          "Use `table.column` to be clear which table a column comes from.",
        ],
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now you try it",
        body: `In the exercises you'll join \`students\` and \`orders\` on their shared key, then choose which columns from each table to show.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/data/6",
  nextHref: "/learn/data/8",
  dashboardHref: "/dashboard",
  instructorScript: `**Coach's note**:
Real data is split across **multiple tables**. We have two:

- **students** (student_id, student_name, grade)
- **orders** (order_id, student_id, item, price)

Notice both tables share **student_id**. That shared column is the **key** that lets us connect them.

**JOIN** stitches the tables together on that key, so you can ask: *"What did each student order?"*

You'll write the JOIN, then add filters and sorting on top of it.`,
  commandReference: [
    {
      command: "JOIN",
      summary:
        "Combines rows from two tables. List the second table after JOIN.",
      example: "FROM orders JOIN students",
    },
    {
      command: "ON",
      summary:
        "Tells JOIN which columns must match — the shared key.",
      example: "ON orders.student_id = students.student_id",
    },
    {
      command: "table.column",
      summary:
        "When two tables share a column name, write table.column so SQL knows which one you mean.",
      example: "students.student_name",
    },
    {
      command: "JOIN + WHERE",
      summary:
        "After joining, you can still filter and sort the combined rows.",
      example: "... WHERE students.grade = 6",
    },
  ],
  kidExplain: [
    {
      title: "Two tables, one key",
      text: "students and orders both have student_id. That shared column links a student to their orders.",
    },
    {
      title: "JOIN = stitch together",
      text: "JOIN matches each order to its student so you can see names and items in one result.",
    },
    {
      title: "Be specific",
      text: "Use table.column (like students.student_name) when a name could come from either table.",
    },
  ],
  steps: [
    "Join orders to students on the shared key.",
    "Show just the student's name and the item.",
    "Join, then filter to grade 6 students only.",
    "Challenge: the priciest order with the student's name.",
  ],
  cfu: [],
  tryThis: [
    "Add ORDER BY students.grade to group younger students first.",
    "Try selecting students.grade, item to see who ordered what.",
  ],
  dataEthicsMoment:
    "Joining tables can reveal more about a person than either table alone. Combine data responsibly and only when you're allowed to.",
  exercises: [
    {
      id: "ex-basic-join",
      title: "Exercise 1 — Your first JOIN",
      focusCommand: "JOIN ... ON",
      commandExplain:
        "Join orders to students where the student_id matches. Every order links to exactly one student — 5 rows.",
      goal: "Join orders and students on student_id.",
      starterSql: `SELECT *
FROM orders
JOIN students ON orders.student_id = students.student_id;`,
      hint: "The starter query is complete — press Run & check to see the joined rows.",
      successMessage: "You joined two tables! Each order now carries its student.",
      failureMessage:
        "Keep the JOIN ... ON orders.student_id = students.student_id. Expect 5 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bfrom\s+orders\b/.test(n)) return false;
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bon\b/.test(n) || !/student_id\s*=\s*\w+\.student_id/.test(n))
          return false;
        return Boolean(result && result.rowCount === 5);
      },
    },
    {
      id: "ex-join-columns",
      title: "Exercise 2 — Name + item",
      focusCommand: "Select joined columns",
      commandExplain:
        "After joining you can pick columns from either table. Show the student's name and what they ordered.",
      goal: "Select student_name and item from the joined tables.",
      starterSql: `SELECT student_name, item
FROM orders
JOIN students ON orders.student_id = students.student_id;`,
      hint: "The query is ready — Run & check to see names beside items.",
      successMessage: "Clear and readable: each name next to its item.",
      failureMessage:
        "Select student_name, item from the joined tables. Expect 5 rows, 2 columns.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bstudent_name\b/.test(n) || !/\bitem\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 5 &&
            result.columns.length === 2 &&
            hasColumns(result, "student_name", "item")
        );
      },
    },
    {
      id: "ex-join-where",
      title: "Exercise 3 — Join, then filter",
      focusCommand: "JOIN + WHERE",
      commandExplain:
        "Filters work on joined rows too. Keep only orders placed by grade 6 students.",
      goal: "Add WHERE students.grade = 6 to the joined query.",
      starterSql: `SELECT student_name, item, grade
FROM orders
JOIN students ON orders.student_id = students.student_id
WHERE students.grade = ;`,
      hint: "Type 6 after students.grade =.",
      successMessage: "Nice filter! Alex (×2) and Riley are the grade 6 orders — 3 rows.",
      failureMessage:
        "Use WHERE students.grade = 6 on the joined query. Expect 3 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bwhere\s+\w*\.?grade\s*=\s*6\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 3);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Priciest order + who",
      focusCommand: "JOIN + ORDER BY + LIMIT",
      commandExplain:
        "Combine everything: join the tables, sort by price DESC, and LIMIT 1 to find the single most expensive order and who placed it.",
      goal: "Show student_name, item, price for the most expensive order.",
      starterSql: `-- Who placed the most expensive order?
SELECT student_name, item, price
FROM orders
JOIN students ON orders.student_id = students.student_id
ORDER BY 
LIMIT ;`,
      hint: "ORDER BY price DESC LIMIT 1;",
      successMessage: "Solved! Sam's Chicken wrap ($5.25) is the top order.",
      failureMessage:
        "Need the JOIN, ORDER BY price DESC, and LIMIT 1 — exactly 1 row.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\border\s+by\s+price\s+desc\b/.test(n)) return false;
        if (!/\blimit\s+1\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 1 &&
            hasColumns(result, "student_name", "item", "price")
        );
      },
    },
  ],
};

export default function DataLesson7Page() {
  return <DataLessonCanvas lesson={daLesson7} />;
}
