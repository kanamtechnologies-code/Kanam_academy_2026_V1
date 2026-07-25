import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";
import { hasColumns, normSql, SCHOOL_DB_SEED } from "@/lib/dataLessonHelpers";

export const daLesson14: DataLessonConfig = {
  id: "da-14",
  title: "14. Your Data Project",
  goal: "Put it all together — explore, join, summarize, and rank to answer a real question: who spent the most?",
  xpReward: 700,
  badge: "Data Analyst",
  previewTable: "orders",
  seedData: SCHOOL_DB_SEED,
  lessonModule: {
    durationLabel: "~20–25 min lesson",
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
        id: "hook",
        kicker: "Real-world hook",
        title: "Every dashboard you've ever seen started as a question",
        body: `Behind every "Top 10" list, every "Most Popular" badge, and every leaderboard you've ever scrolled past, someone asked a fuzzy question — *"who's winning?"* — and then ran exactly the kind of investigation you're about to run: explore, join, summarize, rank, conclude.\n\nToday's question is small (who spent the most on lunch?), but the *process* is identical to how a sports analytics team finds the MVP or a streaming service finds its most-binged show.`,
        callout: {
          label: "Notice it",
          text: "Next time you see a leaderboard or a \"most popular\" badge, ask yourself: what tables were joined, grouped, and sorted to produce this single answer?",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "New words for this lesson",
        body: `A quick refresher on the vocabulary you'll combine today.`,
        bullets: [
          "**Pipeline** — a sequence of steps (explore → join → group → sort) that turns raw data into an answer.",
          "**JOIN** — combining rows from two tables using a shared key column.",
          "**GROUP BY** — bundling rows that share a value so you can summarize each bundle.",
          "**Aggregate function** — a function like SUM() or AVG() that turns many rows into one number per group.",
          "**Rank** — sorting summarized results to find the top (or bottom) result.",
        ],
      },
      {
        id: "concept-1",
        kicker: "The capstone",
        title: "Run a real investigation",
        body: `Up to now, each lesson handed you one tool. Real analysis is different: nobody tells you which tool to use, so you have to *think*. You take a fuzzy question and break it into steps, then pick the right command for each step.\n\nThink of it like being a detective. You don't solve a case with one clue — you gather evidence (explore the data), connect the pieces (join the tables), add it all up (summarize), and name the suspect (rank). Each skill from this track is one move in that bigger investigation.\n\nOur case: **Which student spent the most on lunch?** It sounds simple, but the answer is hiding across two separate tables. Let's plan how to dig it out.`,
        callout: {
          label: "Common misconception",
          text: "Beginners often jump straight to typing one giant query. Pros do the opposite: they plan the steps first, then build the query one clause at a time, checking each result. Planning is the real skill — the SQL is just how you carry it out.",
        },
        checkIn: {
          prompt: "What's the biggest difference between following a single-tool lesson and running a real investigation?",
          choices: ["A real investigation requires deciding which tools to combine and in what order", "Real investigations never use SQL", "There is no difference"],
          correctIndex: 0,
          explanation: "Earlier lessons handed you one command at a time. A real investigation requires you to plan which combination of tools (join, group, sort) will answer the question.",
        },
      },
      {
        id: "concept-2",
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
        checkIn: {
          prompt: "Why can't you answer \"who spent the most?\" using the orders table alone?",
          choices: [
            "orders doesn't have a price column",
            "orders only has student_id, not the student's actual name — that lives in the students table",
            "You can answer it just fine with orders alone",
          ],
          correctIndex: 1,
          explanation: "The orders table tracks prices by student_id, but the readable name lives in the students table — a JOIN is needed to connect the two.",
        },
      },
      {
        id: "concept-3",
        kicker: "Pipeline order",
        title: "The clauses run in a specific order",
        body: `Every step in the pipeline has to happen in the right order, or the next step has nothing to work with. You **JOIN** first (so every row has a name attached), *then* **GROUP BY** (so rows collapse into one per student), *then* **ORDER BY** and **LIMIT** (so you can rank the finished totals).\n\nTry it backwards and it breaks: you can't sort totals that don't exist yet, and you can't group rows that haven't been connected to a name. Build in order, and each step's output becomes the next step's input.`,
        checkIn: {
          prompt: "Why must JOIN happen before GROUP BY in this investigation?",
          choices: ["It doesn't matter — SQL runs clauses in any order", "GROUP BY is faster if it runs first", "GROUP BY needs to bundle rows by student_name, which only exists after the JOIN attaches it"],
          correctIndex: 2,
          explanation: "Before the JOIN, an order row only has a student_id — there's no student_name to group by yet. The JOIN has to attach the name first.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Watch the pipeline come together",
        body: `Let's walk the recipe one stage at a time so you can see the data transform.\n\n**Step 1 — Join.** Orders only store a \`student_id\`, not a name. Joining on \`student_id\` attaches each order to the right person: Alex/Pizza slice $3.50, Jordan/Salad $4.00, Sam/Chicken wrap $5.25, Alex/Fruit cup $2.75, Riley/Burger $4.75 — 5 rows, each order now with a name.\n\n**Step 2 — Group + SUM.** Bundle those joined rows by student and add up their prices. Alex ordered twice (3.50 + 2.75 = 6.25), so the five order rows collapse into four student totals.\n\n**Step 3 — Sort + Limit.** Order the totals high to low and keep just the top row. Stacking all three steps into one query gives the finished investigation below. Reading the result: **Alex spent the most, at \\$6.25.**`,
        code: `SELECT students.student_name,\n       SUM(orders.price) AS total_spent\nFROM students\nJOIN orders\n  ON students.student_id = orders.student_id\nGROUP BY students.student_name\nORDER BY total_spent DESC\nLIMIT 1;`,
        codeCaption: "Who spent the most? (top row only)",
        table: {
          columns: ["student_name", "total_spent"],
          values: [
            ["Alex", 6.25],
          ],
          rowCount: 1,
        },
        callout: {
          label: "Pro tip",
          text: "Build it incrementally: run the JOIN alone first and eyeball the names, THEN add GROUP BY and SUM, THEN ORDER BY and LIMIT. If a step looks wrong, you know exactly which clause to fix.",
        },
        checkIn: {
          prompt: "In the final query, what does LIMIT 1 do that GROUP BY + ORDER BY alone don't?",
          choices: ["It keeps only the single top row instead of returning the full ranked list", "It changes the sort order", "It removes duplicate students"],
          correctIndex: 0,
          explanation: "GROUP BY and ORDER BY produce a full ranked list of totals. LIMIT 1 trims that list down to just the winner.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "The order of steps in your HEAD isn't the order in your QUERY",
        body: `You plan an investigation as: explore → join → group → sort. But when you actually write SQL, the clauses appear in a fixed order: \`SELECT ... FROM ... JOIN ... GROUP BY ... ORDER BY ... LIMIT\`. Beginners sometimes think they need to write separate queries for each planning step. In reality, one well-structured query can carry out the whole plan — the planning happens in your head (or on paper) *before* you write the single final query.`,
        checkIn: {
          prompt: "Do JOIN, GROUP BY, and ORDER BY need to be four separate queries?",
          choices: [
            "Yes, SQL can only do one thing per query",
            "No — a single query can combine JOIN, GROUP BY, and ORDER BY together",
            "Only GROUP BY and ORDER BY can be combined",
          ],
          correctIndex: 1,
          explanation: "SQL clauses stack together in one query. You plan the steps mentally, then write them all into a single, structured SELECT statement.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Predict what changes if you swap SUM for AVG",
        body: `Look back at Alex's two orders: Pizza slice ($3.50) and Fruit cup ($2.75). If you replaced \`SUM(price)\` with \`AVG(price)\` in the grouped query, what would Alex's row show instead of $6.25?`,
        checkIn: {
          prompt: "What would AVG(price) show for Alex instead of SUM(price)?",
          choices: ["Still 6.25, the totals don't change", "2 — the number of orders Alex placed", "3.125 — the average of 3.50 and 2.75"],
          correctIndex: 2,
          explanation: "AVG(price) adds up the prices and divides by how many orders there are: (3.50 + 2.75) / 2 = 3.125, a very different number from the $6.25 total.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "HAVING filters groups, not rows",
        body: `\`WHERE\` filters individual rows *before* grouping. \`HAVING\` filters *groups* *after* they've been summarized — for example, \`HAVING SUM(price) > 5\` keeps only the students whose total spending topped \$5. This distinction — filtering rows vs. filtering groups — is one of the most useful ideas you'll carry into any future data work.`,
        code: `SELECT student_name, SUM(price) AS total_spent\nFROM orders\nJOIN students ON orders.student_id = students.student_id\nGROUP BY student_name\nHAVING SUM(price) > 5;`,
        codeCaption: "Only keep students whose total spending is above $5",
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "One big query vs. building it in stages",
        body: `You could type the entire four-clause query in one shot — or you could build it exactly the way this lesson did: run the JOIN alone, check it, add GROUP BY + SUM, check it, then add ORDER BY + LIMIT. Both eventually produce the same final query, but building in stages catches mistakes early, one clause at a time, instead of leaving you guessing which of four new clauses broke something.`,
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "You just profiled spending by person",
        body: `You just built a query that ranks real people by how much money they spend. In the real world, that's sensitive information. Responsible analysts ask: who should see this ranking? Could it embarrass or pressure someone? Would anonymizing names (Student A, Student B) tell the same story just as well? Analyze responsibly, and respect privacy — even when the data is "just" lunch orders.`,
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "Explore, then build one clause at a time",
        body: `Two habits will serve you in every future project: (1) always run \`SELECT *\` first to see what you're working with, and (2) build complex queries one clause at a time, checking results after each addition. Together, these habits turn an intimidating four-clause query into four small, checkable steps.`,
      },
      {
        id: "reflection",
        kicker: "Reflection",
        title: "What would you investigate next?",
        body: `You just answered "who spent the most?" Think of another fuzzy question you could investigate with a similar pipeline — join, group, sort — using data you care about (favorite games, sports stats, streaming habits). What two tables would you need, and what would the shared key be?`,
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "The school store's restocking question",
        body: `The school store tracks \`sales\` (sale_id, item_id, quantity) and \`items\` (item_id, item_name, cost) in two separate tables. The manager wants to know which item brings in the most total revenue so they know what to restock first.\n\nWhat's the pipeline — in order — to answer this?`,
        callout: {
          label: "Apply it",
          text: "JOIN sales to items on item_id → GROUP BY item_name → SUM(quantity * cost) AS revenue → ORDER BY revenue DESC LIMIT 1. Same four-step recipe, brand-new question.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you dive in",
        body: `Let's confirm the full pipeline is locked in before you build it yourself.`,
        checkIn: {
          prompt: "Put these in the correct SQL clause order: GROUP BY, SELECT, ORDER BY, JOIN, LIMIT.",
          choices: [
            "SELECT, JOIN, GROUP BY, ORDER BY, LIMIT",
            "JOIN, SELECT, LIMIT, GROUP BY, ORDER BY",
            "GROUP BY, SELECT, JOIN, LIMIT, ORDER BY",
          ],
          correctIndex: 0,
          explanation: "SQL clauses follow a fixed order: SELECT the columns, FROM/JOIN the tables, GROUP BY to bundle rows, ORDER BY to sort the summary, and LIMIT to trim the result.",
        },
      },
      {
        id: "explore-first",
        kicker: "Analyst habits",
        title: "Step 0: explore before you build",
        body: `Every capstone investigation starts the same way: \`SELECT *\` on each table, separately. You need to know what columns exist, how many rows you're working with, and where the shared key lives.\n\nRun these two queries before writing a single JOIN. Count the rows. Spot \`student_id\` in both tables. Only then start building.`,
        code: `SELECT * FROM students;\nSELECT * FROM orders;`,
        codeCaption: "Know your raw material first",
        output: "students: 4 rows · orders: 5 rows · shared key: student_id",
      },
      {
        id: "stage-1-join-alone",
        kicker: "Query walkthrough",
        title: "Stage 1 — run the JOIN by itself",
        body: `Build incrementally. First, join orders to students and **stop**. Read the five-row result: every order should now have a \`student_name\` attached.\n\nIf you see 20 rows instead of 5, your \`ON\` clause is wrong. If names are missing, the key didn't match. Fix this stage before adding GROUP BY — each later clause depends on this join being correct.`,
        code: `SELECT students.student_name,\n       orders.item,\n       orders.price\nFROM orders\nJOIN students\n  ON orders.student_id = students.student_id;`,
        codeCaption: "Stage 1 only — names attached to orders",
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
        id: "stage-2-group-sum",
        kicker: "Query walkthrough",
        title: "Stage 2 — add GROUP BY and SUM",
        body: `Now collapse the five order rows into one row per student. \`GROUP BY student_name\` bundles Alex's two orders together, then \`SUM(price)\` adds them: 3.50 + 2.75 = 6.25.\n\nRead the four-row result: each student appears once with a total. If Alex still shows up twice, GROUP BY isn't working yet.`,
        code: `SELECT students.student_name,\n       SUM(orders.price) AS total_spent\nFROM orders\nJOIN students\n  ON orders.student_id = students.student_id\nGROUP BY students.student_name;`,
        codeCaption: "Stage 2 — one total per student",
        table: {
          columns: ["student_name", "total_spent"],
          values: [
            ["Alex", 6.25],
            ["Jordan", 4.0],
            ["Sam", 5.25],
            ["Riley", 4.75],
          ],
          rowCount: 4,
        },
      },
      {
        id: "stage-3-rank-winner",
        kicker: "Query walkthrough",
        title: "Stage 3 — sort and crown the winner",
        body: `The final stage adds \`ORDER BY total_spent DESC\` and \`LIMIT 1\` to the grouped query. Alex's $6.25 leads, so one row comes back: the top spender.\n\nThis is the complete pipeline in one query — but you built it by checking each stage's output along the way. That's how pros avoid debugging four clauses at once.`,
        code: `SELECT students.student_name,\n       SUM(orders.price) AS total_spent\nFROM orders\nJOIN students\n  ON orders.student_id = students.student_id\nGROUP BY students.student_name\nORDER BY total_spent DESC\nLIMIT 1;`,
        codeCaption: "Stage 3 — the finished investigation",
        table: {
          columns: ["student_name", "total_spent"],
          values: [["Alex", 6.25]],
          rowCount: 1,
        },
        checkIn: {
          prompt: "Alex ordered twice. Why does the final result show Alex once with $6.25?",
          choices: [
            "LIMIT 1 merged Alex's rows automatically",
            "GROUP BY bundled Alex's orders and SUM added the two prices together",
            "JOIN removed duplicate students",
          ],
          correctIndex: 1,
          explanation: "GROUP BY collapsed Alex's two order rows into one group, and SUM(price) added 3.50 + 2.75 = 6.25 — one row, one total.",
        },
      },
      {
        id: "pipeline-mistake-skip-stages",
        kicker: "Common SQL mistake",
        title: "Skipping stages makes debugging impossible",
        body: `Beginners often paste a four-clause query, get a wrong answer, and have no idea which clause broke. The fix: **run each stage separately**.\n\nJOIN alone → check row count. Add GROUP BY → check totals make sense. Add ORDER BY + LIMIT → check the winner. If stage 2 is wrong, stage 3 will never be right no matter how many times you tweak the LIMIT.`,
        bullets: [
          "Wrong row count after JOIN? Fix ON before grouping.",
          "Totals look off after GROUP BY? Check SUM and the group key.",
          "Wrong winner after ORDER BY? Trace back — the bug is usually upstream.",
        ],
      },
      {
        id: "conclusion-writing",
        kicker: "Analyst habits",
        title: "End every investigation with one clear sentence",
        body: `Data without a conclusion is just a table. After your query runs, write one sentence a non-analyst could understand:\n\n*"Alex spent the most on lunch at $6.25 across two orders."*\n\nThat sentence names the finding, the number, and enough context to trust it. Every chart, query, and dashboard in the real world eventually needs a sentence like this attached to it.`,
        callout: {
          label: "Your turn",
          text: "After the exercises, practice writing your conclusion in one sentence before looking at the chart.",
        },
      },
      {
        id: "capstone-ethics-review",
        kicker: "Data ethics moment",
        title: "Capstone check: who sees this ranking?",
        body: `You just built a spending leaderboard with real names attached. Before sharing it, run through three questions:\n\n• **Permission** — am I allowed to rank people by spending?\n• **Purpose** — does this answer help someone, or just embarrass?\n• **Alternatives** — would anonymized totals (Student A, Student B) tell the same story?\n\nThe best capstone analysts don't just get the right SQL answer — they deliver it responsibly.`,
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

