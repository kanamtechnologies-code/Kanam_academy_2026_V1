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
  badge: "Table Joiner",
  previewTable: "orders",
  seedData: SCHOOL_DB_SEED,
  lessonModule: {
    durationLabel: "~9 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Here's a secret about real data: it's almost never stored in one giant table. It's split across **several** smaller tables so nothing has to be repeated. Today you'll learn \`JOIN\` — the command that stitches those tables back together. This is the skill that makes you feel like a real data analyst.\n\nHere's the plan:\n\n• Understand **why** data is split into separate tables.\n• Find the **shared key** that links two tables.\n• Use \`JOIN ... ON\` to combine them, then pick columns from each.\n\nThink of a video game: one table holds **players** (username, level, country) and another holds **matches** (who played, score, date). To show "DragonSlayer scored 4,200 in Tokyo," the game has to \`JOIN\` those two tables on the player. Social apps, online stores, and streaming services all work exactly this way.`,
        image: "/images/lessons/da-7-join.png",
        imageAlt: "Two tables linked together by a connecting key",
        callout: {
          label: "Why it matters",
          text: "An online store keeps customers in one table and orders in another, then JOINs them to say \"Maria ordered a backpack.\" Without JOIN, you'd be stuck staring at ID numbers with no idea who or what they mean. JOIN is how separate facts become a full story.",
        },
      },
      {
        id: "split",
        kicker: "Why split data?",
        title: "Two tables, one shared key",
        body: `Our data lives in two tables. The \`students\` table (below) holds each student's \`student_id\`, \`student_name\`, and \`grade\`. The \`orders\` table holds each order's \`order_id\`, \`item\`, \`price\`, and — crucially — a \`student_id\` too.\n\nThat repeated \`student_id\` is the **shared key**: a column both tables have in common that links a row in one to a row in the other. It's like the player ID printed on a game match record that points back to the player's profile.\n\nWhy split it up? So each fact is stored **once**. If Alex changes their name, you fix it in a single place instead of on every order. Tidy data means fewer mistakes — a habit pros call "don't repeat yourself."`,
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
        callout: {
          label: "Common misconception",
          text: "The shared key isn't magic — it's just a column with the **same meaning** in both tables. `students.student_id` and `orders.student_id` both refer to the same person, which is exactly why we can match rows on them.",
        },
      },
      {
        id: "join",
        kicker: "Stitch them",
        title: "JOIN ... ON the shared key",
        body: `To combine the tables, name the second one after \`JOIN\`, then tell SQL **how** to match rows using \`ON\`. The \`ON\` part is the matching rule: "line up rows where the student_ids are equal."\n\nBecause both tables have a \`student_id\` column, you write \`table.column\` (like \`students.student_id\`) so SQL knows exactly which one you mean. It's like saying "Alex from Room 1" when there might be two Alexes.\n\nThe query below matches each order to the student who placed it, so you can finally show the **name** right next to the **item** — all 5 orders, now with real names attached.`,
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
        callout: {
          label: "Common misconception",
          text: "Never forget the `ON` part! A `JOIN` *without* `ON` doesn't link the tables — it pairs **every** student with **every** order, creating a giant, meaningless mess. The `ON` rule is what keeps each order matched to its *correct* student.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Join then filter, step by step",
        body: `Let's answer: *"What did the grade 6 students order?"* This needs both tables — the grade lives in \`students\`, the item lives in \`orders\`.\n\n**Step 1 — Pick the columns.** Name, item, and grade: \`SELECT student_name, item, grade\`.\n\n**Step 2 — Join the tables.** Start \`FROM orders\`, then \`JOIN students ON orders.student_id = students.student_id\`.\n\n**Step 3 — Filter the combined rows.** A \`WHERE\` works on the joined result too: \`WHERE students.grade = 6\`, then a semicolon.\n\nOnly Alex (grade 6) and Riley (grade 6) qualify. Alex placed two orders and Riley placed one, so we get **3** rows.`,
        code: `-- Step 1: columns -> name, item, grade\n-- Step 2: join    -> orders to students on the shared key\n-- Step 3: filter  -> keep only grade 6\nSELECT student_name, item, grade\nFROM orders\nJOIN students ON orders.student_id = students.student_id\nWHERE students.grade = 6;`,
        codeCaption: "Grade 6 students and what they ordered",
        table: {
          columns: ["student_name", "item", "grade"],
          values: [
            ["Alex", "Pizza slice", 6],
            ["Alex", "Fruit cup", 6],
            ["Riley", "Burger", 6],
          ],
          rowCount: 3,
        },
        callout: {
          label: "Pro tip",
          text: "Everything you've already learned still works *after* a JOIN. You can add `WHERE` to filter, `ORDER BY` to sort, and `LIMIT` to take the top few — all on the combined rows. JOIN just gives you a bigger, richer table to ask questions about.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've reached the analyst's superpower: combining tables. You can spot a **shared key**, \`JOIN ... ON\` to stitch two tables together, use \`table.column\` to stay clear, and then filter and sort the result.\n\nIn the exercises you'll run your first JOIN, choose name + item from the combined tables, filter to grade 6 students, and finally find the priciest order *with* the student's name — just like the worked example.\n\nClick **Start the exercises** when you're ready.`,
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
      id: "ex-debug-join",
      kind: "debug",
      title: "Exercise 2 — Debug the JOIN",
      focusCommand: "JOIN … ON",
      commandExplain:
        "This JOIN is trying to show each order with the student's name, but the ON clause is wrong. Fix the match key.",
      goal: "Repair the JOIN so names line up with items (5 rows, 2 columns).",
      starterSql: `SELECT student_name, item
FROM orders
JOIN students ON orders.student_id = students.item;`,
      debugHint: "wrong join key",
      hint: "Both sides of ON should use student_id.",
      successMessage: "Fixed! Matching on student_id connects the right rows.",
      failureMessage:
        "Use ON orders.student_id = students.student_id. Expect 5 rows with student_name and item.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bon\s+orders\.student_id\s*=\s*students\.student_id\b/.test(n)) return false;
        if (/\bstudents\.item\b/.test(n)) return false;
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
