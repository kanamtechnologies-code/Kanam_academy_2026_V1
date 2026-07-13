"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { hasColumns, normSql, SCHOOL_DB_SEED } from "@/lib/dataLessonHelpers";

const daLesson14: DataLessonConfig = {
  id: "da-14",
  title: "14. Your Data Project",
  goal: "Put it all together — explore, join, summarize, and rank to answer a real question: who spent the most?",
  xpReward: 700,
  badge: "Data Analyst",
  previewTable: "orders",
  seedData: SCHOOL_DB_SEED,
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `This is the finale of the whole Data Analyst track. Today you stop learning commands one at a time and start using them *together*, the way a real analyst does — to answer a genuine question from start to finish.\n\nHere's your roadmap:\n\n• **Plan** an investigation before touching the keyboard.\n• **Join** two tables so the data makes sense.\n• **Summarize and rank** to pull the answer out.\n• **Visualize** the result and state a clear conclusion.\n\nThe question we'll crack: **Which student spent the most on lunch?** This is exactly the kind of thing analysts get paid to figure out — on a sports team it might be "which player scores most per minute?", at a game studio "which level makes players quit?" Different data, same detective work.`,
        image: "/images/lessons/da-14-project.png",
        imageAlt: "An analyst reviewing a dashboard with a chart and a clear conclusion",
        callout: {
          label: "Why it matters",
          text: "This is what analysts do at sports teams, hospitals, game studios, and stores every day: take a real question, dig through tables, and report a clear, honest answer. Today you do the whole job.",
        },
      },
      {
        id: "why",
        kicker: "The capstone",
        title: "Run a real investigation",
        body: `Up to now, each lesson handed you one tool. Real analysis is different: nobody tells you which tool to use, so you have to *think*. You take a fuzzy question and break it into steps, then pick the right command for each step.\n\nThink of it like being a detective. You don't solve a case with one clue — you gather evidence (explore the data), connect the pieces (join the tables), add it all up (summarize), and name the suspect (rank). Each skill from this track is one move in that bigger investigation.\n\nOur case: **Which student spent the most on lunch?** It sounds simple, but the answer is hiding across two separate tables. Let's plan how to dig it out.`,
        callout: {
          label: "Common misconception",
          text: "Beginners often jump straight to typing one giant query. Pros do the opposite: they plan the steps first, then build the query one clause at a time, checking each result. Planning is the real skill — the SQL is just how you carry it out.",
        },
      },
      {
        id: "plan",
        kicker: "Think first",
        title: "Plan your investigation",
        body: `Great analysts plan before they type. Our data is split across two tables: \`students\` (who they are) and \`orders\` (what they bought). The price lives in \`orders\`, but the name lives in \`students\` — so we'll need to connect them. Here's the plan:\n\n1. **Join** orders to students on \`student_id\` (to attach names to prices).\n2. **Group** by student and **SUM** their prices (one total per person).\n3. **Sort** highest-first to crown the top spender.\n4. **Visualize** it as a bar chart and write a one-sentence conclusion.`,
        bullets: [
          "Explore the tables first so you know what's there.",
          "Join → Group → Summarize → Sort: the analyst's recipe.",
          "End with a clear, honest sentence that answers the question.",
        ],
        callout: {
          label: "Pro tip",
          text: "A JOIN needs a shared key — a column both tables have in common. Here it's `student_id`. Find the matching key first, and the join almost writes itself.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Watch the pipeline come together",
        body: `Let's walk the recipe one stage at a time so you can see the data transform.\n\n**Step 1 — Join.** Orders only store a \`student_id\`, not a name. Joining on \`student_id\` attaches each order to the right person. Now every order row shows *who* bought it (5 rows, below left).\n\n**Step 2 — Group + SUM.** Bundle those joined rows by student and add up their prices. Alex ordered twice (3.50 + 2.75 = 6.25), so the five order rows collapse into four student totals.\n\n**Step 3 — Sort.** Order the totals high to low, and the top row is your answer. Reading the result: **Alex spent the most, at \\$6.25.**`,
        code: `-- Step 1: join orders to students to get names\nSELECT students.student_name, orders.item, orders.price\nFROM students\nJOIN orders ON students.student_id = orders.student_id;`,
        codeCaption: "Step 1 — the joined rows (5 orders, now with names)",
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
        callout: {
          label: "Pro tip",
          text: "Build it incrementally: run the JOIN alone first and eyeball the names, THEN add GROUP BY and SUM, THEN ORDER BY. If a step looks wrong, you know exactly which clause to fix.",
        },
      },
      {
        id: "query",
        kicker: "The payoff",
        title: "One query, a full answer",
        body: `Stacking all three steps into one query gives the finished investigation. It joins both tables, totals each student's spending, and ranks them — turning raw rows into a real answer. The grouped, sorted result is below.\n\nTo crown **one** winner in the exercises, keep the same \`ORDER BY total_spent DESC\` and add \`LIMIT 1\` — that returns only the top row instead of the full ranked list.`,
        code: `SELECT students.student_name,\n       SUM(orders.price) AS total_spent\nFROM students\nJOIN orders\n  ON students.student_id = orders.student_id\nGROUP BY students.student_name\nORDER BY total_spent DESC\nLIMIT 1;`,
        codeCaption: "Who spent the most? (top row only)",
        table: {
          columns: ["student_name", "total_spent"],
          values: [
            ["Alex", 6.25],
          ],
          rowCount: 1,
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn — become a Data Analyst",
        body: `You've seen the whole detective process: plan, join, summarize, rank, and conclude. That's not just a SQL trick — it's how real investigations work.\n\nIn the exercises you'll build this investigation step by step, see it as a chart, and earn your **Data Analyst** badge. This is everything you've learned across the track, working together.\n\nClick **Start the exercises** to begin your project.`,
      },
    ],
  },
  prevHref: "/learn/data/13",
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

Take your time and read each result. You've earned this.`,
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
        "Project complete! Alex is the top spender at $6.25. You're a Data Analyst!",
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

export default function DataLesson14Page() {
  return <DataLessonCanvas lesson={daLesson14} />;
}
