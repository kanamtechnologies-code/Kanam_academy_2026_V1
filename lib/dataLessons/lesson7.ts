import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";
import { hasColumns, normSql, SCHOOL_DB_SEED } from "@/lib/dataLessonHelpers";

export const daLesson7: DataLessonConfig = {
  id: "da-7",
  title: "7. Combine Tables",
  goal: "Use JOIN to connect two tables — match orders to the students who placed them with a shared key.",
  xpReward: 350,
  badge: "Table Joiner",
  previewTable: "orders",
  seedData: SCHOOL_DB_SEED,
  lessonModule: {
    durationLabel: "~20–25 min lesson",
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
        id: "hook",
        kicker: "Real-world hook",
        title: "Why your order confirmation shows your name",
        body: `When you buy something online, the confirmation email says "Thanks, Maria!" — not "Thanks, customer_id 4471!" Somewhere behind the scenes, the store's database holds customers in one table and orders in another, connected only by an ID number.\n\nTurning that cold ID number into your actual name, on that actual order, in that actual email, is a JOIN happening in real time. Every personalized screen you've ever seen relies on this exact trick.`,
        callout: {
          label: "Notice it",
          text: "Think of an app that shows your name next to your activity (comments, orders, scores). Somewhere, two tables are being joined on your ID.",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "New words for this lesson",
        body: `A few terms will make today's ideas click faster.`,
        bullets: [
          "**Shared key** — a column present in two tables that links matching rows together.",
          "**JOIN** — the SQL clause that combines rows from two tables.",
          "**ON** — the rule that tells JOIN which rows count as a match.",
          "**table.column** — a way of naming a column with its table, to avoid ambiguity.",
          "**Don't repeat yourself (DRY)** — the principle of storing each fact in exactly one place.",
        ],
      },
      {
        id: "concept-1",
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
        checkIn: {
          prompt: "Why is student info kept in a SEPARATE table from orders, instead of repeating the student's grade on every order row?",
          choices: [
            "“SQL requires at least two tables” describes a different situation than the one in the question stem",
            "“To make the database bigger” describes a different situation than the one in the question stem",
            "So each fact (like a student's grade) is stored once, and stays consistent if it changes",
          ],
          correctIndex: 2,
          explanation: "Splitting data avoids repeating the same fact across many rows — if a student's grade changes, you update it in exactly one place.",
        },
      },
      {
        id: "concept-2",
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
        checkIn: {
          prompt: "What is the job of the ON clause in a JOIN?",
          choices: [
            "It sorts the joined result” belongs to a different situation than the one in the question stem",
            "“It renames a column” describes a different situation than the one in the question stem",
            "It defines the rule for which rows from each table should be matched together",
          ],
          correctIndex: 2,
          explanation: "ON is the matching rule — it tells SQL exactly which rows from the two tables belong together, usually by comparing a shared key.",
        },
      },
      {
        id: "concept-3",
        kicker: "Being specific",
        title: "table.column removes ambiguity",
        body: `When two tables share a column name (both have \`student_id\`), SQL needs to know which one you mean. Writing \`table.column\` — like \`students.student_id\` or \`orders.student_id\` — removes all doubt.\n\nIt's the same reason you'd say "Ms. Kim's classroom" instead of just "the classroom" when there are several classrooms in the building.`,
        checkIn: {
          prompt: "Both students and orders have a column called student_id. How do you tell SQL which one you mean?",
          choices: [
            "Prefix it with the table name, like orders.student_id",
            "You can't — SQL will guess” belongs to a different situation than the one in the question stem",
            "Rename one of the columns first, every time",
          ],
          correctIndex: 0,
          explanation: "Using table.column syntax (like orders.student_id) tells SQL exactly which table's version of that column you're referring to.",
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
          text: "Everything you've already learned still works *after* a JOIN. You can add `WHERE` to filter, `ORDER BY price DESC` to sort biggest-first, and `LIMIT 1` to grab the single top row — all on the combined rows. JOIN just gives you a bigger, richer table to ask questions about.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "A JOIN without ON is a mess",
        body: `Never forget the \`ON\` part! A \`JOIN\` *without* \`ON\` doesn't link the tables — it pairs **every** student with **every** order, creating a giant, meaningless mess (4 students × 5 orders = 20 nonsense rows). The \`ON\` rule is what keeps each order matched to its *correct* student.`,
        checkIn: {
          prompt: "What happens if you write JOIN without an ON clause?",
          choices: [
            "SQL automatically finds the shared key for you” belongs to a different situation than the one in the question stem",
            "“It behaves exactly like WHERE” describes a different situation than the one in the question stem",
            "Every row in table A gets paired with every row in table B, creating meaningless combinations",
          ],
          correctIndex: 2,
          explanation: "Without ON, SQL has no matching rule, so it pairs every row with every other row — almost always producing a much bigger, meaningless result.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Predict the joined row count",
        body: `Before the exercises, predict: the \`orders\` table has 5 rows and the \`students\` table has 4 rows. If every order's student_id correctly matches a real student, how many rows will \`orders JOIN students ON ...\` return?\n\nOnce in the workspace, run the join and check your prediction against the actual row count.`,
      },
      {
        id: "deeper-skill",
        kicker: "Go one level deeper",
        title: "A JOIN can attach columns from either table",
        body: `Once tables are joined, you can pick and choose columns from **either** side freely — a name from \`students\`, an item from \`orders\`, a price from \`orders\`, a grade from \`students\`, all in one \`SELECT\` list. The join simply glues the rows together; after that, they behave like one wide table.`,
      },
      {
        id: "comparison",
        kicker: "Compare & contrast",
        title: "One wide table vs. two linked tables",
        body: `You might wonder: why not just store everything in one giant table with student_name repeated on every order? Both designs technically work, but they have very different trade-offs.`,
        bullets: [
          "**One wide table** — easy to query with no JOIN, but repeats the student's name/grade on every single order row.",
          "**Two linked tables + JOIN** — a tiny bit more typing per query, but each fact about a student lives in exactly one place.",
          "Professional databases almost always choose the second design — it's called **normalization**.",
        ],
        checkIn: {
          prompt: "What's the main downside of one giant table that repeats student_name on every order?",
          choices: [
            "It's impossible to filter” belongs to a different situation than the one in the question stem",
            "If a student's name changes, you'd have to update it in many repeated places",
            "It requires JOIN to query” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation: "Repeating data means a single change (like a name correction) has to be applied everywhere it's repeated — a common source of real-world data errors.",
        },
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "Joining tables can reveal more than either alone",
        body: `Joining tables can reveal more about a person than either table alone. A grades table by itself is mild; an attendance table by itself is mild; but JOINed together with a health-visits table, they might reveal something sensitive nobody meant to expose.\n\nCombine data responsibly and only when you're allowed to — and always ask whether a join creates a picture more invasive than any single table intended.`,
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "Check your join's row count immediately",
        body: `Right after writing any JOIN, check the row count against what you expect. If it's way bigger than expected, you probably forgot the \`ON\` clause or mismatched the key — fix it before building anything more complex on top.`,
      },
      {
        id: "reflection",
        kicker: "Reflection",
        title: "Find a shared key in your own life",
        body: `Think of two lists you keep separately that share an ID — a class roster and a grade sheet linked by student name, or a game's friend list and a leaderboard linked by username. What "shared key" connects them?`,
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "The science fair's project table",
        body: `A science fair has two tables: \`students\` (student_id, student_name, grade) and \`projects\` (project_id, student_id, project_title, score). The judges want a list of every project title alongside the student's name and grade.\n\nWhat shared key would you join on, and which table would you pull each column from?`,
        callout: {
          label: "Apply it",
          text: "SELECT students.student_name, students.grade, projects.project_title FROM projects JOIN students ON projects.student_id = students.student_id; — the shared key is student_id.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you dive in",
        body: `Let's confirm the shared key and ON clause are locked in.`,
        checkIn: {
          prompt: "Which is the correct JOIN to connect orders to students on their shared key?",
          choices: [
            "FROM orders JOIN students” belongs to a different situation than the one in the question stem",
            "FROM orders, students WHERE student_id” belongs to a different situation than the one in the question stem",
            "FROM orders JOIN students ON orders.student_id = students.student_id",
          ],
          correctIndex: 2,
          explanation: "A proper JOIN needs an ON clause that names the shared key on both sides — here, orders.student_id = students.student_id.",
        },
      },
      {
        id: "join-preview",
        kicker: "Analyst habits",
        title: "Explore both tables before you JOIN",
        body: `Before stitching tables together, peek at each one separately. Run \`SELECT * FROM students LIMIT 3;\` and \`SELECT * FROM orders LIMIT 3;\` to see what columns exist and spot the shared key.\n\nIn this lesson, both tables carry \`student_id\` — that's your link. If you can't find a column that appears in both tables, you can't JOIN them yet. Exploring first prevents the classic mistake of joining on the wrong column.`,
        code: `-- Peek at each table first\nSELECT * FROM students;\nSELECT * FROM orders;`,
        codeCaption: "Know your tables before combining them",
      },
      {
        id: "join-walkthrough-price",
        kicker: "Query walkthrough",
        title: "A second JOIN — names attached to prices",
        body: `The orders table stores prices but only student IDs. The students table stores names but no prices. This JOIN attaches each name to its order's price so you can read a human-friendly receipt.\n\nAfter the join, scan the result: five rows (one per order), three columns (name, item, price). Alex appears twice because Alex placed two orders — that's correct, not a JOIN bug.`,
        code: `SELECT students.student_name,\n       orders.item,\n       orders.price\nFROM orders\nJOIN students\n  ON orders.student_id = students.student_id;`,
        codeCaption: "Every order with the student's real name",
        table: {
          columns: ["student_name", "item", "price"],
          values: [
            ["Alex", "Pizza slice", 3.5],
            ["Jordan", "Salad", 4.0],
            ["Sam", "Chicken wrap", 5.25],
            ["Alex", "Fruit cup", 2.75],
            ["Riley", "Burger", 4.75],
          ],
          rowCount: 5,
        },
      },
      {
        id: "join-mistake-wrong-key",
        kicker: "Common SQL mistake",
        title: "Joining on the wrong column",
        body: `A JOIN only works when the \`ON\` clause compares the **same kind of ID** on both sides. Joining \`orders.order_id\` to \`students.student_id\` would pair unrelated rows — order #101 is not student #101.\n\nAlways ask: "Does this key mean the same thing in both tables?" Here, \`student_id\` in orders points to \`student_id\` in students. That's a real link. \`order_id\` is a different kind of number entirely.`,
        checkIn: {
          prompt: "orders has order_id and student_id. Which ON clause correctly links to students?",
          choices: [
            "ON orders.order_id = students.student_id",
            "ON orders.student_id = students.student_id",
            "ON orders.item = students.student_name",
          ],
          correctIndex: 1,
          explanation: "student_id in orders references student_id in students — the same person. order_id is a different identifier and would produce nonsense matches.",
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
  cfu: [
    {
      question: "Why do we JOIN tables instead of copying the same facts into one giant table?",
      answer:
        "Joining keeps data organized and avoids duplication — each table stores one kind of fact, and a shared key connects them when needed.",
    },
    {
      question: "What is a shared key in a JOIN?",
      answer:
        "A column that appears in both tables (like student_id) used to match related rows — the “stitch” between tables.",
    },
    {
      question: "What goes wrong if you JOIN on the wrong key?",
      answer:
        "Rows may not match, or you may create nonsense combinations. Always join on the intended relationship key.",
    },
  ],
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

