import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";
import {
  approxEquals,
  CAPSTONE_CAFETERIA_SEED,
  firstCellNumber,
  hasColumns,
  normSql,
} from "@/lib/dataLessonHelpers";
import type { QueryResult } from "@/lib/sqlRunner";

function cellString(result: QueryResult, row: number, col: string): string {
  const idx = result.columns.map((c) => c.toLowerCase()).indexOf(col.toLowerCase());
  if (idx < 0) return "";
  return String(result.values[row][idx] ?? "");
}

function cellNumber(result: QueryResult, row: number, col: string): number | null {
  const idx = result.columns.map((c) => c.toLowerCase()).indexOf(col.toLowerCase());
  if (idx < 0) return null;
  const n = Number(result.values[row][idx]);
  return Number.isNaN(n) ? null : n;
}

export const daLesson14: DataLessonConfig = {
  id: "da-14",
  title: "14. Capstone: Cafeteria Briefing",
  goal: "Run a full cafeteria investigation from scratch — explore, join, filter, summarize, rank, chart, and brief the kitchen with evidence.",
  xpReward: 700,
  badge: "Data Analyst",
  previewTable: "orders",
  seedData: CAPSTONE_CAFETERIA_SEED,
  lessonModule: {
    durationLabel: "~35–45 min project",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "Your briefing for the cafeteria manager",
        body: `This is the finale of the Data Analyst track. You are no longer practicing one command at a time — you are the analyst on call.\n\nThe cafeteria manager just dropped a messy week of lunch data on your desk and asked for a **briefing**, not a single number. They need answers to several questions, charts they can trust, and one clear recommendation.\n\nHere's the mission:\n\n• **Explore** a real two-table week of cafeteria data (no peeking at answers).\n• **Join, filter, summarize, and rank** — writing almost every query yourself.\n• **Answer multiple briefing questions** the way a real analyst would.\n• **Visualize** total spend and finish with an evidence-based conclusion.\n\nDifferent workplace, same job: sports teams ask "who's the MVP?", game studios ask "which level makes players quit?", stores ask "what should we restock?" You will answer *this* week's cafeteria questions from scratch.`,
        image: "/images/lessons/da-14-project.png",
        imageAlt: "An analyst reviewing a dashboard with a chart and a clear conclusion",
        callout: {
          label: "Why it matters",
          text: "Capstone work is not about memorizing one mega-query. It is about running a full investigation cycle — ask, explore, transform, summarize, visualize, communicate — when nobody fills in the blanks for you.",
        },
      },
      {
        id: "hook",
        kicker: "Real-world hook",
        title: "Briefings are bundles of questions",
        body: `A real stakeholder almost never asks one tidy SQL question. They ask a *bundle*:\n\n• Who spent the most?\n• What item sells most?\n• Who orders the most often?\n• Which students are big spenders we should watch for allergies / refunds / loyalty?\n\nYour job is to turn that fuzzy ask into a sequence of precise queries. Today you will build that sequence yourself.`,
        callout: {
          label: "Notice it",
          text: "Pros keep a short checklist: explore → join → measure → rank → chart → conclude. If a result looks weird, they go back one step — they don't rewrite everything at once.",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "The investigation toolkit (all of it)",
        body: `You'll combine every major skill from the track.`,
        bullets: [
          "**Explore** — SELECT * (and COUNT) so you know the raw material.",
          "**JOIN** — attach names from `students` to prices in `orders` on `student_id`.",
          "**WHERE** — filter rows before you summarize.",
          "**GROUP BY + COUNT/SUM/AVG** — turn many rows into measures.",
          "**HAVING** — filter groups after summarizing.",
          "**ORDER BY + LIMIT** — rank and crown a winner.",
          "**Briefing** — a short, honest conclusion backed by the chart and numbers.",
        ],
      },
      {
        id: "concept-1",
        kicker: "The capstone",
        title: "You own the whole pipeline",
        body: `Earlier lessons handed you one tool and a half-written query. Capstone work flips that: you get a dataset, a stakeholder ask, and a blank editor.\n\nThink like a detective running a case file:\n\n1. Survey the evidence (explore both tables).\n2. Connect the pieces (JOIN on the shared key).\n3. Measure what matters (COUNT, SUM, AVG).\n4. Rank and compare (ORDER BY, LIMIT, HAVING).\n5. Deliver the briefing (chart + one clear sentence + one limitation).\n\nThe SQL is how you carry the plan out. The *plan* is the real skill.`,
        callout: {
          label: "Common misconception",
          text: "Beginners try to invent one giant query that answers every question at once. Pros run a series of focused queries — then pick the charts and sentences that belong in the briefing.",
        },
        checkIn: {
          prompt: "What makes a capstone investigation different from a regular lesson exercise?",
          choices: [
            "Capstones never use JOIN or GROUP BY",
            "You decide which tools to combine, write most queries from scratch, and answer more than one question",
            "Capstones only use SELECT *",
          ],
          correctIndex: 1,
          explanation: "Capstones expect you to plan, write full queries, and communicate multiple findings — not fill one blank in a starter.",
        },
      },
      {
        id: "concept-2",
        kicker: "Your dataset",
        title: "Meet this week's cafeteria tables",
        body: `You'll work with two related tables for a full school week:\n\n• **students** — who they are (\`student_id\`, \`student_name\`, \`grade\`)\n• **orders** — what they bought (\`order_id\`, \`student_id\`, \`item\`, \`price\`, \`weekday\`)\n\nNames live in one table. Prices live in the other. The shared key is \`student_id\`. If you skip exploring first, you will guess wrong about row counts and miss columns like \`weekday\`.`,
        bullets: [
          "Always explore each table alone before joining.",
          "Count rows so you know when a JOIN accidentally multiplies them.",
          "Spot the shared key before you write ON.",
        ],
        checkIn: {
          prompt: "Why can't \"who spent the most?\" be answered from orders alone?",
          choices: [
            "orders has no price column",
            "orders only stores student_id, not the readable student name",
            "SQL cannot add prices",
          ],
          correctIndex: 1,
          explanation: "Orders track spending by student_id. The human-readable name lives in students, so you JOIN first.",
        },
      },
      {
        id: "briefing-questions",
        kicker: "Mission brief",
        title: "Questions the manager wants answered",
        body: `Keep this list open while you work. Your exercises walk each one — almost every query is blank on purpose.\n\n1. How many students and orders are in this week of data?\n2. What does a joined "receipt" look like (name + item + price)?\n3. Which orders cost $4 or more?\n4. How many orders did each student place?\n5. How much did each student spend in total?\n6. Who is the top spender?\n7. Which lunch item was most popular?\n8. Who counts as a "big spender" (total over $20)?\n9. What one-sentence briefing will you give the manager — and what's one limitation of the data?`,
        callout: {
          label: "Pro tip",
          text: "Build incrementally. If the JOIN is wrong, every later summary will be wrong. Check row counts after each stage.",
        },
      },
      {
        id: "worked-example",
        kicker: "Mini worked example",
        title: "Pipeline reminder (tiny toy data)",
        body: `Here is the recipe on a *tiny* example — not today's cafeteria week — so you remember the clause order without copying the final answers.\n\nToy orders: Alex buys $3 and $2; Jordan buys $4.\n\n1. JOIN names onto orders.\n2. GROUP BY student_name + SUM(price) → Alex 5, Jordan 4.\n3. ORDER BY total DESC LIMIT 1 → Alex.\n\nSame recipe, bigger data, in the exercises.`,
        code: `SELECT students.student_name,\n       SUM(orders.price) AS total_spent\nFROM orders\nJOIN students\n  ON orders.student_id = students.student_id\nGROUP BY students.student_name\nORDER BY total_spent DESC\nLIMIT 1;`,
        codeCaption: "Pattern only — your cafeteria numbers will be different",
        checkIn: {
          prompt: "In a spending investigation, what must happen before GROUP BY student_name?",
          choices: [
            "ORDER BY and LIMIT",
            "JOIN so each order has a student_name to group on",
            "HAVING to remove cheap items",
          ],
          correctIndex: 1,
          explanation: "Before the JOIN, an order row only has student_id — there is no name to group by yet.",
        },
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "How to survive a from-scratch project",
        body: `Three habits will carry you through every activity today:\n\n1. **Explore first** — SELECT * and COUNT(*) on each table.\n2. **One clause at a time** — JOIN → check → GROUP → check → ORDER → check.\n3. **End with a sentence** — data without a conclusion is just a table.`,
        bullets: [
          "Wrong row count after JOIN? Fix ON before summarizing.",
          "Totals look off? Recheck SUM and the group key.",
          "Wrong winner? The bug is usually upstream of LIMIT.",
        ],
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "You are ranking real people by spending",
        body: `A cafeteria briefing with named totals can embarrass students or invite unfair comparisons. Before you share:\n\n• **Permission** — who is allowed to see named spending?\n• **Purpose** — does this help the kitchen, or just create a leaderboard?\n• **Alternatives** — would anonymized IDs tell the same operational story?\n\nGreat analysts deliver the right answer *and* protect people.`,
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Open the workspace — almost every query is blank",
        body: `The teaching part ends here on purpose. In the exercises you will explore the week of data, write JOINs and summaries yourself, answer the briefing questions one by one, build the spend chart, and earn your **Data Analyst** badge.\n\nClick **Start the exercises** and treat it like a real project desk: read the goal, write the SQL, check the result, move on.`,
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
This is the track capstone — a multi-question cafeteria briefing on a richer two-table dataset.

Students should write most queries **from scratch**. Stay in coach mode:
- Ask what they expect the row count to be *before* they run.
- If stuck, point them to the command reference — don't paste the full answer.
- Celebrate the briefing sentence at the end as much as the SQL.

Mission questions: explore → join → filter $4+ → orders per student → total spend → top spender → popular item → big spenders (HAVING) → conclusion.`,
  commandReference: [
    {
      command: "Explore",
      summary: "SELECT * and COUNT(*) so you know columns and row counts before joining.",
      example: "SELECT COUNT(*) AS n FROM orders;",
    },
    {
      command: "JOIN",
      summary: "Attach student names to orders on the shared student_id key.",
      example: "JOIN students ON orders.student_id = students.student_id",
    },
    {
      command: "WHERE",
      summary: "Filter individual rows before you summarize.",
      example: "WHERE price >= 4",
    },
    {
      command: "GROUP BY + COUNT/SUM",
      summary: "Count orders or total spend per student / item.",
      example: "GROUP BY student_name ... SUM(price) AS total_spent",
    },
    {
      command: "HAVING",
      summary: "Filter groups after aggregating (e.g. totals over $20).",
      example: "HAVING SUM(price) > 20",
    },
    {
      command: "ORDER BY + LIMIT",
      summary: "Rank results and keep the top answer.",
      example: "ORDER BY total_spent DESC LIMIT 1",
    },
  ],
  kidExplain: [
    {
      title: "It's a briefing, not one quiz question",
      text: "You'll answer several cafeteria questions with separate queries you write yourself.",
    },
    {
      title: "Explore → join → measure → rank",
      text: "Check the tables, connect them, summarize, then sort to find winners.",
    },
    {
      title: "Finish with a clear sentence",
      text: "A chart plus one honest conclusion is what stakeholders actually need.",
    },
  ],
  steps: [
    "Explore both tables and count the rows.",
    "Join orders to students from scratch.",
    "Filter, count, and total spend per student.",
    "Rank the top spender and most popular item.",
    "Find big spenders with HAVING and write your briefing.",
  ],
  cfu: [
    {
      question: "What are the main steps of a complete data investigation in this capstone?",
      answer:
        "Explore → join → filter (as needed) → summarize/aggregate → rank → visualize → conclude with evidence and limitations.",
    },
    {
      question: "Why run several focused queries instead of one giant query for a briefing?",
      answer:
        "Each stakeholder question is clearer on its own, mistakes are easier to catch stage by stage, and you can choose which findings belong in the final briefing.",
    },
    {
      question: "Name one privacy/ethics concern when analyzing spending by person.",
      answer:
        "Named spending can be sensitive. In real life you’d need permission, minimize identifiers, and protect who can see the results.",
    },
  ],
  tryThis: [
    "Average price per student (AVG) — does the top spender also have the highest average order?",
    "Count orders by weekday — which day was busiest?",
    "Total spend for grade 6 only (JOIN + WHERE grade = 6 + SUM).",
  ],
  dataEthicsMoment:
    "You just profiled spending by person. In the real world, that's sensitive — analyze responsibly, anonymize when you can, and respect privacy.",
  exercises: [
    {
      id: "ex-explore-students",
      kind: "scratch",
      title: "Activity 1 — Explore the students table",
      focusCommand: "from scratch",
      commandExplain:
        "Start every project by surveying the people table. Write a full query that returns every student.",
      goal: "SELECT * FROM students; — expect 10 students.",
      starterSql: `-- Activity 1: list every student in the cafeteria week
`,
      hint: "SELECT * FROM students;",
      successMessage: "10 students on file. Note student_id — that's your join key.",
      failureMessage: "Need SELECT * FROM students with exactly 10 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bselect\s+\*/.test(n)) return false;
        if (!/\bfrom\s+students\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 10 && hasColumns(result, "student_id", "student_name", "grade"));
      },
    },
    {
      id: "ex-explore-orders",
      kind: "scratch",
      title: "Activity 2 — Explore the orders table",
      focusCommand: "from scratch",
      commandExplain:
        "Now survey the receipts. Return every order so you can see item, price, weekday, and student_id.",
      goal: "SELECT * FROM orders; — expect 41 orders.",
      starterSql: `-- Activity 2: list every lunch order from the week
`,
      hint: "SELECT * FROM orders;",
      successMessage: "41 orders — a real week of cafeteria traffic. Spot student_id and weekday.",
      failureMessage: "Need SELECT * FROM orders with exactly 41 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bselect\s+\*/.test(n)) return false;
        if (!/\bfrom\s+orders\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 41 &&
            hasColumns(result, "student_id", "item", "price", "weekday")
        );
      },
    },
    {
      id: "ex-count-orders",
      kind: "scratch",
      title: "Activity 3 — Confirm the order count",
      focusCommand: "from scratch",
      commandExplain:
        "Analysts don't just eyeball — they COUNT. Write a query that returns how many orders are in the week.",
      goal: "SELECT COUNT(*) AS order_count FROM orders;",
      starterSql: `-- Activity 3: how many orders this week?
`,
      hint: "SELECT COUNT(*) AS order_count FROM orders;",
      successMessage: "Confirmed: 41 orders. You'll use this number to check JOINs later.",
      failureMessage: "Need COUNT(*) AS order_count FROM orders returning 41.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bcount\s*\(\s*\*\s*\)\s+as\s+order_count\b/.test(n)) return false;
        if (!/\bfrom\s+orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 1 && firstCellNumber(result) === 41);
      },
    },
    {
      id: "ex-predict-join-rows",
      kind: "predict",
      title: "Activity 4 — Predict the JOIN row count",
      focusCommand: "plan",
      commandExplain:
        "Before you run it: if students has 10 rows and orders has 41 rows, how many rows should a correct JOIN on student_id return? Predict, then Run & check.",
      goal: "Predict the joined row count, then verify.",
      starterSql: `SELECT student_name, item, price
FROM orders
JOIN students ON orders.student_id = students.student_id;`,
      codeReadOnly: true,
      predictionPrompt: "How many rows should this JOIN return?",
      acceptedPredictions: ["41", "41 rows", "forty-one", "forty one"],
      hint: "A correct JOIN keeps one row per order — same count as orders.",
      successMessage: "Yes — 41 joined rows (one per order). If you ever see way more, the ON key is wrong.",
      failureMessage: "A proper student_id JOIN returns 41 rows — one per order.",
      validate: (_sql, result) => Boolean(result && result.rowCount === 41),
    },
    {
      id: "ex-join-scratch",
      kind: "scratch",
      title: "Activity 5 — Build the joined receipt",
      focusCommand: "from scratch",
      commandExplain:
        "Write a JOIN from scratch that shows student_name, item, and price for every order.",
      goal: "Join orders to students on student_id; return 41 receipt rows.",
      starterSql: `-- Activity 5: name + item + price for every order (JOIN from scratch)
`,
      hint: "FROM orders JOIN students ON orders.student_id = students.student_id",
      successMessage: "41 named receipts — the JOIN held (same count as orders).",
      failureMessage:
        "JOIN students on student_id and select student_name, item, price. Expect 41 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bon\b/.test(n) || !/\bstudent_id\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 41 &&
            hasColumns(result, "student_name", "item", "price")
        );
      },
    },
    {
      id: "ex-filter-scratch",
      kind: "scratch",
      title: "Activity 6 — Filter pricey orders",
      focusCommand: "from scratch",
      commandExplain:
        "The manager wants every order that cost $4.00 or more, with names attached. Filter the joined rows.",
      goal: "JOIN + WHERE price >= 4 — expect 21 rows.",
      starterSql: `-- Activity 6: named orders that cost $4 or more
`,
      hint: "JOIN students, then WHERE price >= 4 (or orders.price >= 4).",
      successMessage: "21 pricey orders — WHERE filtered rows before any summarizing.",
      failureMessage: "Need JOIN + WHERE price >= 4 with exactly 21 rows (name, item, price).",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bwhere\b/.test(n) || !/price\s*>=\s*4/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 21 &&
            hasColumns(result, "student_name", "item", "price")
        );
      },
    },
    {
      id: "ex-count-per-student",
      kind: "scratch",
      title: "Activity 7 — Orders per student",
      focusCommand: "from scratch",
      commandExplain:
        "Who visits the lunch line most? Count orders per student_name after joining.",
      goal: "GROUP BY student_name with COUNT(*) AS order_count — 10 rows.",
      starterSql: `-- Activity 7: how many orders did each student place?
`,
      hint: "SELECT student_name, COUNT(*) AS order_count ... JOIN ... GROUP BY student_name",
      successMessage: "One count per student. Alex leads with 7 orders.",
      failureMessage:
        "Need JOIN, COUNT(*) AS order_count, GROUP BY student_name. Expect 10 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bcount\s*\(\s*\*\s*\)\s+as\s+order_count\b/.test(n)) return false;
        if (!/\bgroup\s+by\s+(?:students\.)?student_name\b/.test(n)) return false;
        if (!result || result.rowCount !== 10) return false;
        if (!hasColumns(result, "student_name", "order_count")) return false;
        // Alex should have 7 orders
        for (let i = 0; i < result.rowCount; i++) {
          if (cellString(result, i, "student_name").toLowerCase() === "alex") {
            return cellNumber(result, i, "order_count") === 7;
          }
        }
        return false;
      },
    },
    {
      id: "ex-totals-scratch",
      kind: "scratch",
      title: "Activity 8 — Total spend per student",
      focusCommand: "from scratch",
      commandExplain:
        "Now money: join, group by student, and SUM(price) AS total_spent. The bar chart should appear.",
      goal: "Build total_spent for each of the 10 students.",
      starterSql: `-- Activity 8: total dollars spent by each student
`,
      hint: "SUM(price) AS total_spent ... GROUP BY student_name",
      successMessage: "Ten totals — and a spend chart. Read who looks highest before you rank.",
      failureMessage:
        "Need JOIN, SUM(price) AS total_spent, GROUP BY student_name. Expect 10 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bsum\s*\(\s*(?:orders\.)?price\s*\)\s+as\s+total_spent\b/.test(n)) return false;
        if (!/\bgroup\s+by\s+(?:students\.)?student_name\b/.test(n)) return false;
        if (!result || result.rowCount !== 10) return false;
        if (!hasColumns(result, "student_name", "total_spent")) return false;
        for (let i = 0; i < result.rowCount; i++) {
          if (cellString(result, i, "student_name").toLowerCase() === "casey") {
            return approxEquals(cellNumber(result, i, "total_spent"), 28.75);
          }
        }
        return false;
      },
    },
    {
      id: "ex-rank-scratch",
      kind: "scratch",
      title: "Activity 9 — Rank every spender",
      focusCommand: "from scratch",
      commandExplain:
        "Sort the totals high to low so the chart reads like a leaderboard. Keep all 10 students.",
      goal: "Same totals query + ORDER BY total_spent DESC.",
      starterSql: `-- Activity 9: full spending leaderboard (all students)
`,
      hint: "Add ORDER BY total_spent DESC to your totals query.",
      successMessage: "Leaderboard locked — Casey should be on top at $28.75.",
      failureMessage: "Need totals + ORDER BY total_spent DESC with 10 rows, Casey first.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bsum\s*\(\s*(?:orders\.)?price\s*\)\s+as\s+total_spent\b/.test(n)) return false;
        if (!/\bgroup\s+by\s+(?:students\.)?student_name\b/.test(n)) return false;
        if (!/\border\s+by\s+total_spent\s+desc\b/.test(n)) return false;
        if (!result || result.rowCount !== 10) return false;
        return (
          cellString(result, 0, "student_name").toLowerCase() === "casey" &&
          approxEquals(cellNumber(result, 0, "total_spent"), 28.75)
        );
      },
    },
    {
      id: "ex-top-spender",
      kind: "scratch",
      title: "Activity 10 — Crown the top spender",
      focusCommand: "from scratch",
      commandExplain:
        "The manager wants a single name. Trim the ranked list with LIMIT 1.",
      goal: "Top spender only — one row.",
      starterSql: `-- Activity 10: who spent the most this week?
`,
      hint: "ORDER BY total_spent DESC LIMIT 1",
      successMessage: "Casey is the top spender at $28.75. Put that in your briefing notes.",
      failureMessage: "Need JOIN + SUM + GROUP BY + ORDER BY total_spent DESC LIMIT 1 → Casey.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bgroup\s+by\s+(?:students\.)?student_name\b/.test(n)) return false;
        if (!/\border\s+by\s+total_spent\s+desc\b/.test(n)) return false;
        if (!/\blimit\s+1\b/.test(n)) return false;
        if (!result || result.rowCount !== 1) return false;
        return (
          cellString(result, 0, "student_name").toLowerCase() === "casey" &&
          approxEquals(cellNumber(result, 0, "total_spent"), 28.75)
        );
      },
    },
    {
      id: "ex-popular-item",
      kind: "scratch",
      title: "Activity 11 — Most popular menu item",
      focusCommand: "from scratch",
      commandExplain:
        "Different briefing question: which item was ordered most often? Count by item and keep the top row.",
      goal: "GROUP BY item, ORDER BY count DESC, LIMIT 1 → Pizza slice (10).",
      starterSql: `-- Activity 11: which lunch item sold the most?
`,
      hint: "SELECT item, COUNT(*) AS order_count FROM orders GROUP BY item ORDER BY order_count DESC LIMIT 1;",
      successMessage: "Pizza slice leads with 10 orders — restock note for the kitchen!",
      failureMessage: "Need item counts sorted DESC LIMIT 1. Winner should be Pizza slice (10).",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bfrom\s+orders\b/.test(n)) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\blimit\s+1\b/.test(n)) return false;
        const ordered =
          /\border\s+by\s+order_count\s+desc\b/.test(n) ||
          /\border\s+by\s+count\s*\(\s*\*\s*\)\s+desc\b/.test(n);
        if (!ordered) return false;
        if (!result || result.rowCount !== 1) return false;
        if (!hasColumns(result, "item")) return false;
        const item = cellString(result, 0, "item").toLowerCase();
        if (!item.includes("pizza")) return false;
        const countCol = result.columns
          .map((c) => c.toLowerCase())
          .find((c) => c.includes("count"));
        if (!countCol) return false;
        return cellNumber(result, 0, countCol) === 10;
      },
    },
    {
      id: "ex-having-scratch",
      kind: "scratch",
      title: "Activity 12 — Big spenders only (HAVING)",
      focusCommand: "from scratch",
      commandExplain:
        "Keep only students whose total spend is over $20. That's a group filter — use HAVING, not WHERE.",
      goal: "JOIN + SUM + GROUP BY + HAVING SUM(price) > 20 — expect Alex and Casey.",
      starterSql: `-- Activity 12: students whose total spend is over $20
`,
      hint: "HAVING SUM(price) > 20 after GROUP BY student_name",
      successMessage: "Two big spenders: Alex ($25) and Casey ($28.75). HAVING filtered groups, not raw rows.",
      failureMessage: "Need HAVING SUM(price) > 20 with exactly 2 students (Alex & Casey).",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bgroup\s+by\s+(?:students\.)?student_name\b/.test(n)) return false;
        if (!/\bhaving\b/.test(n) || !/\bsum\s*\(\s*(?:orders\.)?price\s*\)\s*>\s*20\b/.test(n))
          return false;
        if (!result || result.rowCount !== 2) return false;
        const names = new Set(
          result.values.map((_, i) => cellString(result, i, "student_name").toLowerCase())
        );
        return names.has("alex") && names.has("casey");
      },
    },
    {
      id: "ex-debug-join",
      kind: "debug",
      title: "Activity 13 — Debug a broken JOIN",
      focusCommand: "debug",
      commandExplain:
        "A classmate tried to build the spend chart but the JOIN key is wrong. Fix the query so totals come back (10 rows).",
      goal: "Repair the ON clause so names match orders correctly.",
      starterSql: `SELECT student_name, SUM(price) AS total_spent
FROM orders
JOIN students ON orders.order_id = students.student_id
GROUP BY student_name
ORDER BY total_spent DESC;`,
      debugHint: "order_id is not the shared key — match student_id to student_id.",
      hint: "Change the ON clause to orders.student_id = students.student_id",
      successMessage: "Fixed — joining on student_id restores the real totals.",
      failureMessage: "ON must use student_id = student_id. Expect 10 ranked total_spent rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bon\s+orders\.student_id\s*=\s*students\.student_id\b/.test(n) &&
            !/\bon\s+students\.student_id\s*=\s*orders\.student_id\b/.test(n)) {
          return false;
        }
        if (!/\bgroup\s+by\s+(?:students\.)?student_name\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 10 && hasColumns(result, "student_name", "total_spent"));
      },
    },
    {
      id: "ex-final-briefing",
      kind: "scratch",
      title: "Activity 14 — Final briefing chart",
      focusCommand: "from scratch",
      commandExplain:
        "Deliverable time: rebuild the full spending leaderboard from scratch (all students, highest first) so the bar chart is briefing-ready.",
      goal: "Complete ranked total_spent chart — Casey on top at $28.75.",
      starterSql: `-- Activity 14: final briefing chart — total spent per student, highest first
`,
      hint: "JOIN + SUM(price) AS total_spent + GROUP BY student_name + ORDER BY total_spent DESC",
      successMessage:
        "Briefing ready! Casey leads at $28.75; Pizza slice was most popular (10). You're a Data Analyst.",
      failureMessage:
        "Rebuild JOIN + SUM AS total_spent + GROUP BY + ORDER BY total_spent DESC. Casey first of 10.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (!/\bjoin\s+students\b/.test(n)) return false;
        if (!/\bsum\s*\(\s*(?:orders\.)?price\s*\)\s+as\s+total_spent\b/.test(n)) return false;
        if (!/\bgroup\s+by\s+(?:students\.)?student_name\b/.test(n)) return false;
        if (!/\border\s+by\s+total_spent\s+desc\b/.test(n)) return false;
        if (!result || result.rowCount !== 10) return false;
        return (
          cellString(result, 0, "student_name").toLowerCase() === "casey" &&
          approxEquals(cellNumber(result, 0, "total_spent"), 28.75)
        );
      },
    },
  ],
};
