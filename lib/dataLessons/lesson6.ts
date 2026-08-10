import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";
import {
  approxEquals,
  firstCellNumber,
  LUNCH_ORDERS_SEED,
  normSql,
} from "@/lib/dataLessonHelpers";

export const daLesson6: DataLessonConfig = {
  id: "da-6",
  title: "6. Count and Summarize",
  goal: "Turn many rows into one answer with COUNT, SUM, and AVG — then break totals down by group with GROUP BY.",
  xpReward: 300,
  badge: "Summary Pro",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Until now every query handed you back **rows**. But often you don't want the rows — you want the **summary**. "How many orders?" "How much money total?" "What's the average price?" Today you'll teach SQL to do the math for you.\n\nHere's the plan:\n\n• Count rows with \`COUNT(*)\`.\n• Add up a column with \`SUM\`, and average one with \`AVG\`.\n• Use \`GROUP BY\` to get those numbers **per category** instead of for the whole table.\n\nThis is how every stats screen you've ever seen gets built: "1,204 total sales," "average rating 4.6," "posts per user," your overall grade average, a player's points-per-game. Each of those is a pile of rows squeezed down into one meaningful number.`,
        image: "/images/lessons/da-6-count.png",
        imageAlt: "Many rows collapsing into a single summary number",
        callout: {
          label: "Why it matters",
          text: "Summaries turn raw data into headlines. Nobody scrolls a million sales records — they read \"$2.3M in sales this month.\" Aggregates like COUNT, SUM, and AVG are how dashboards, report cards, and sports stats get made.",
        },
      },
      {
        id: "hook",
        kicker: "Real-world hook",
        title: "The headline hiding behind a million rows",
        body: `A news app doesn't show you a million individual purchase records to say a company had a good quarter — it shows you one headline: "$2.3M in sales this month." That single number is the result of an aggregate query squeezing an enormous table down to one meaningful summary.\n\nEvery "average rating," "total downloads," or "points per game" you've ever read started life as thousands of individual rows before someone ran COUNT, SUM, or AVG on them.`,
        callout: {
          label: "Spot it",
          text: "Next time you see a big summary number in the news or an app, think about the pile of raw rows it must have been squeezed down from.",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "New words for this lesson",
        body: `A few terms will make today's ideas click faster.`,
        bullets: [
          "**Aggregate function** — a function that combines many rows into one summary number (COUNT, SUM, AVG).",
          "**COUNT(*)** — counts how many rows match.",
          "**SUM** — adds up every value in a number column.",
          "**AVG** — calculates the average (mean) of a number column.",
          "**GROUP BY** — splits rows into groups, then runs the aggregate separately on each group.",
          "**Alias (AS)** — a friendly name given to a result column.",
        ],
      },
      {
        id: "concept-1",
        kicker: "The summary functions",
        title: "COUNT, SUM, and AVG",
        body: `These are called **aggregate functions** — "aggregate" just means "combine many things into one." Each one takes a whole column and squeezes it down to a **single** number for the entire table.\n\nThe three workhorses:\n\n• \`COUNT(*)\` — *how many* rows there are.\n• \`SUM(price)\` — *add up* every value in a number column.\n• \`AVG(price)\` — the *average* (mean) of a number column.\n\nThink of a teacher with a stack of quizzes: \`COUNT\` is "how many students turned one in," \`SUM\` is "all the points added together," and \`AVG\` is "the class average." The \`AS\` keyword renames each result so the answer reads nicely.`,
        code: `SELECT COUNT(*) AS orders,\n       SUM(price) AS total,\n       AVG(price) AS avg_price\nFROM lunch_orders;`,
        codeCaption: "Summarize the whole table",
        table: {
          columns: ["orders", "total", "avg_price"],
          values: [[8, 30.75, 3.84]],
          rowCount: 1,
        },
        checkIn: {
          prompt: "What does COUNT(*) tell you about a table?",
          choices: ["The total price of everything", "How many rows there are", "The average value in a column"],
          correctIndex: 1,
          explanation: "COUNT(*) simply counts rows — it doesn't look at any particular column's values, unlike SUM or AVG.",
        },
      },
      {
        id: "concept-2",
        kicker: "COUNT vs SUM",
        title: "Counting records vs. totaling values",
        body: `\`COUNT\` and \`SUM\` are not the same, even though they can produce similarly-sized numbers. \`COUNT(*)\` tells you **how many rows** (8 orders), while \`SUM(price)\` **adds up the values** inside a column ($30.75). One counts records, the other totals dollars.`,
        checkIn: {
          prompt: "A table has 8 orders totaling $30.75. What would SUM(price) return?",
          choices: ["8", "3.84", "30.75"],
          correctIndex: 2,
          explanation: "SUM adds up every value in the price column — the total dollar amount, not the number of rows.",
        },
      },
      {
        id: "concept-3",
        kicker: "Break it down",
        title: "GROUP BY summarizes per category",
        body: `A single grand total is useful, but the real power comes from breaking it down **per category**. \`GROUP BY\` splits the rows into groups that share a value, then runs your aggregate on **each group** separately.\n\nImagine sorting a pile of orders into labeled bins — one bin per menu item — then counting how many are in each bin. \`GROUP BY item\` with \`COUNT(*)\` does exactly that, telling you how popular each item is.\n\nThe result has a **label column** (the category) and a **number column** (the summary) — the perfect shape for a bar chart later. Below is a preview; the full result has one row per unique item.`,
        code: `SELECT item, COUNT(*) AS order_count\nFROM lunch_orders\nGROUP BY item;`,
        codeCaption: "Orders per item (preview of the groups)",
        table: {
          columns: ["item", "order_count"],
          values: [
            ["Pizza slice", 2],
            ["Salad", 2],
            ["Chicken wrap", 1],
            ["Burger", 1],
          ],
          rowCount: 4,
        },
        bullets: [
          "`COUNT(*)` counts rows; `SUM`/`AVG` work on number columns.",
          "`AS` renames the result column so it's readable.",
          "`GROUP BY x` → one summary row per value of `x`.",
        ],
        checkIn: {
          prompt: "SELECT item, COUNT(*) FROM lunch_orders GROUP BY item; — what does each result row represent?",
          choices: [
            "One unique item, with the count of orders for it",
            "One single lunch order",
            "The whole table at once",
          ],
          correctIndex: 0,
          explanation: "GROUP BY item bundles all orders of the same item into one row, and COUNT(*) reports how many orders landed in each bundle.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Rank the menu, step by step",
        body: `Let's answer: *"Which lunch items are most popular?"* — counting orders per item and putting the favorite on top.\n\n**Step 1 — Pick the label + the summary.** \`SELECT item, COUNT(*) AS order_count\`.\n\n**Step 2 — Name the table.** \`FROM lunch_orders\`.\n\n**Step 3 — Make the groups.** One bin per item: \`GROUP BY item\`.\n\n**Step 4 — Rank them.** Most popular first: \`ORDER BY order_count DESC\`, then a semicolon.\n\nThe 8 orders collapse into 6 item groups, sorted so Pizza slice and Salad (2 orders each) lead the menu.`,
        code: `-- Step 1: label + summary -> item, COUNT(*)\n-- Step 2: table           -> lunch_orders\n-- Step 3: one bin per item -> GROUP BY item\n-- Step 4: most popular top -> ORDER BY ... DESC\nSELECT item, COUNT(*) AS order_count\nFROM lunch_orders\nGROUP BY item\nORDER BY order_count DESC;`,
        codeCaption: "Orders per item, most popular first",
        table: {
          columns: ["item", "order_count"],
          values: [
            ["Pizza slice", 2],
            ["Salad", 2],
            ["Chicken wrap", 1],
            ["Fruit cup", 1],
            ["Yogurt parfait", 1],
            ["Burger", 1],
          ],
          rowCount: 6,
        },
        callout: {
          label: "Pro tip",
          text: "You can `ORDER BY` the renamed aggregate column (`order_count`) just like any other column. Combining `GROUP BY` with `ORDER BY ... DESC` is the standard recipe for \"most popular,\" \"top sellers,\" and \"busiest day.\"",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "Forgetting GROUP BY is the #1 mistake",
        body: `When you mix a normal column with an aggregate — like \`SELECT item, COUNT(*)\` — that normal column has to appear in \`GROUP BY\`. Forgetting \`GROUP BY item\` is the #1 beginner mistake here, and SQL will complain or give a confusing answer.`,
        checkIn: {
          prompt: "SELECT item, COUNT(*) FROM lunch_orders; (with NO GROUP BY) — what's the problem?",
          choices: [
            "COUNT(*) can only be used with WHERE. That option sounds confident, but it leaves out the deciding constraint",
            "Nothing, it works exactly like GROUP BY item",
            "SQL doesn't know how to pair one item label with a count of ALL rows — it needs GROUP BY to define the groups",
          ],
          correctIndex: 2,
          explanation: "Mixing a plain column with an aggregate requires GROUP BY to define what each summary row represents — without it, the query is ambiguous or errors out.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Predict the average",
        body: `Before the exercises, predict: is the average lunch price closer to $3, $4, or $5? Look at the sample prices you've seen in past lessons (2.75, 3.00, 3.50, 4.00, 4.75, 5.25...) and make a rough guess.\n\nOnce you're in the workspace, try \`SELECT AVG(price) FROM lunch_orders;\` and see how close your estimate was.`,
      },
      {
        id: "deeper-skill",
        kicker: "Go one level deeper",
        title: "MIN and MAX round out your toolkit",
        body: `Beyond COUNT, SUM, and AVG, SQL also has \`MIN\` (the smallest value) and \`MAX\` (the largest value) in a column. \`SELECT MIN(price), MAX(price) FROM lunch_orders;\` instantly tells you the cheapest and priciest orders — no ORDER BY or LIMIT needed.`,
        bullets: [
          "`MIN(price)` — the lowest value in the price column.",
          "`MAX(price)` — the highest value in the price column.",
          "Together, MIN and MAX describe the full **range** of your data.",
        ],
      },
      {
        id: "comparison",
        kicker: "Compare & contrast",
        title: "Aggregate without GROUP BY vs. with GROUP BY",
        body: `The same aggregate function behaves very differently depending on whether GROUP BY is present.`,
        bullets: [
          "**No GROUP BY** — the aggregate runs once, over the WHOLE table, producing a single summary row.",
          "**With GROUP BY** — the aggregate runs once PER GROUP, producing one summary row per unique value.",
        ],
        checkIn: {
          prompt: "SELECT COUNT(*) FROM lunch_orders; (no GROUP BY) — how many rows does this return?",
          choices: ["8 rows — one per order", "6 rows — one per item", "1 row — a single grand total"],
          correctIndex: 2,
          explanation: "Without GROUP BY, the aggregate summarizes the entire table into exactly one row.",
        },
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "Averages can hide outliers",
        body: `Averages can hide outliers. One very expensive order can pull the average up — always look at counts and totals too, not just the average alone.\n\nA class with an average grade of 80% could mean everyone scored close to 80, or it could mean half the class scored 100 and half scored 60. The average alone doesn't tell you which.`,
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "Always report more than one summary number",
        body: `Whenever you share an average, try to also share the count and the total (or the range with MIN/MAX). "Average price $3.84, based on 8 orders ranging from $2.75 to $5.25" tells a far more honest story than "average price $3.84" alone.`,
      },
      {
        id: "reflection",
        kicker: "Reflection",
        title: "What's a number you already trust blindly?",
        body: `Think of a summary statistic you see regularly — your GPA, a batting average, a follower count. Do you know how many individual records go into calculating it? Could an outlier be skewing it without your knowledge?`,
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "The bake sale's profit report",
        body: `A bake sale table \`sales\` has columns \`item_name\` and \`amount\`. The organizer wants to know: total money raised, the number of items sold, and which item sold most often.\n\nWhich three queries (or one combined query) would answer all three parts of that request?`,
        callout: {
          label: "Apply it",
          text: "SELECT SUM(amount) AS total_raised, COUNT(*) AS items_sold FROM sales; for the totals, then SELECT item_name, COUNT(*) AS sold FROM sales GROUP BY item_name ORDER BY sold DESC LIMIT 1; for the top seller.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you dive in",
        body: `Let's confirm COUNT, SUM, and GROUP BY are all locked in.`,
        checkIn: {
          prompt: "Which query gives the total number of orders PER ITEM, most popular first?",
          choices: [
            "SELECT SUM(price) FROM lunch_orders GROUP BY item",
            "SELECT item, COUNT(*) FROM lunch_orders",
            "SELECT item, COUNT(*) AS order_count FROM lunch_orders GROUP BY item ORDER BY order_count DESC",
          ],
          correctIndex: 2,
          explanation: "This groups orders by item, counts each group, names the count, and sorts so the most popular item leads — exactly the recipe for a popularity ranking.",
        },
      },
      {
        id: "avg-walkthrough",
        kicker: "Query walkthrough",
        title: "AVG turns many prices into one number",
        body: `\`SUM(price)\` adds every order together. \`AVG(price)\` divides that total by how many orders there were — giving you the typical lunch price.\n\nOn \`lunch_orders\`, eight orders sum to about $31.75, so the average is roughly $3.97. One query, one row, one answer. That's the power of aggregate functions: many rows in, one summary number out.`,
        code: `SELECT AVG(price) AS avg_price\nFROM lunch_orders;`,
        codeCaption: "One number summarizing all eight orders",
        table: {
          columns: ["avg_price"],
          values: [[3.96875]],
          rowCount: 1,
        },
        output: "1 row returned · 1 column · avg_price ≈ 3.97",
      },
      {
        id: "group-by-mistake",
        kicker: "Common SQL mistake",
        title: "Mixing grouped and ungrouped columns",
        body: `When you use \`GROUP BY item\`, every column in your \`SELECT\` list must either be **in the GROUP BY** or wrapped in an **aggregate** like \`COUNT(*)\` or \`SUM(price)\`.\n\nWriting \`SELECT student_name, item, COUNT(*) FROM lunch_orders GROUP BY item\` breaks because \`student_name\` isn't grouped — SQL doesn't know which student to show when Pizza slice appears twice. Fix it by grouping only what you need, or dropping columns that vary within a group.`,
        bullets: [
          "Safe: `SELECT item, COUNT(*) ... GROUP BY item` — item is the group key.",
          "Broken: `SELECT student_name, item, COUNT(*) ... GROUP BY item` — student_name varies inside a group.",
          "Rule of thumb: if it's not in GROUP BY, wrap it in COUNT/SUM/AVG/MAX/MIN.",
        ],
        checkIn: {
          prompt: "Which SELECT list is valid with GROUP BY item?",
          choices: ["SELECT item, student_name, COUNT(*)", "SELECT item, COUNT(*) AS order_count", "SELECT student_name, COUNT(*)"],
          correctIndex: 1,
          explanation: "item is in the GROUP BY, and COUNT(*) is an aggregate — both are allowed. student_name without grouping would break the query.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You can now summarize data instead of just listing it: count rows with \`COUNT(*)\`, total a column with \`SUM\`, average one with \`AVG\`, and break any of them down **per category** with \`GROUP BY\`.\n\nIn the exercises you'll count all the orders, add up the total spent, count orders per item, and finally rank the menu from most to fewest — just like the worked example.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/data/5",
  nextHref: "/learn/data/7",
  dashboardHref: "/dashboard",
  instructorScript: `**Coach's note**:
Sometimes you don't want the rows — you want the *summary*. "How many orders?" "What's the total?" "What's the average price?"

These are **aggregate** questions, and SQL has special functions for them:

1. **COUNT(*)** — how many rows
2. **SUM(price)** — add a column up
3. **AVG(price)** — the average
4. **GROUP BY** — calculate the summary *per group* (e.g., per item)

One number can answer a big question. Let's go.`,
  commandReference: [
    {
      command: "COUNT(*)",
      summary:
        "Counts how many rows match. COUNT(*) on the whole table tells you the total number of orders.",
      example: "SELECT COUNT(*) FROM lunch_orders",
    },
    {
      command: "SUM(col)",
      summary: "Adds up all the values in a number column.",
      example: "SELECT SUM(price) FROM lunch_orders",
    },
    {
      command: "AVG(col)",
      summary: "Calculates the average (mean) of a number column.",
      example: "SELECT AVG(price) FROM lunch_orders",
    },
    {
      command: "GROUP BY",
      summary:
        "Splits rows into groups, then runs the aggregate for each group.",
      example: "SELECT item, COUNT(*) FROM lunch_orders GROUP BY item",
    },
  ],
  kidExplain: [
    {
      title: "Aggregate = one answer",
      text: "Aggregates squeeze many rows into a single summary number, like a total or an average.",
    },
    {
      title: "COUNT vs SUM",
      text: "COUNT tells you HOW MANY rows. SUM adds up the VALUES inside a column.",
    },
    {
      title: "GROUP BY = per category",
      text: "GROUP BY item gives you one summary row per item — like 'how many of each lunch.'",
    },
  ],
  steps: [
    "Count how many orders there are.",
    "Add up the total of all prices.",
    "Count orders per item with GROUP BY.",
    "Challenge: rank items by how often they were ordered.",
  ],
  cfu: [
    {
      question: "What is an aggregate function, in plain language?",
      answer:
        "It turns many rows into one summary number — like COUNT of orders, SUM of prices, or AVG score.",
    },
    {
      question: "How is COUNT different from SUM?",
      answer:
        "COUNT tallies how many rows (or non-null values) exist. SUM adds numeric values together.",
    },
    {
      question: "What does GROUP BY enable that a plain COUNT cannot?",
      answer:
        "GROUP BY breaks the summary into categories (e.g., count per item) instead of one total for the whole table.",
    },
  ],
  tryThis: [
    "Try SELECT AVG(price) FROM lunch_orders — what's the average lunch cost?",
    "Try SELECT MIN(price), MAX(price) FROM lunch_orders.",
  ],
  dataEthicsMoment:
    "Averages can hide outliers. One very expensive order can pull the average up — always look at counts and totals too.",
  exercises: [
    {
      id: "ex-count",
      title: "Exercise 1 — Count the rows",
      focusCommand: "COUNT(*)",
      commandExplain:
        "COUNT(*) returns a single number: how many rows are in the table. No GROUP BY needed.",
      goal: "Write SELECT COUNT(*) FROM lunch_orders;",
      starterSql: `SELECT 
FROM lunch_orders;`,
      hint: "Type COUNT(*) after SELECT.",
      successMessage: "Correct! There are 8 orders in the table.",
      failureMessage: "Use SELECT COUNT(*) FROM lunch_orders; — the answer is 8.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+count\s*\(\s*\*\s*\)/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 1 && firstCellNumber(result) === 8);
      },
    },
    {
      id: "ex-sum",
      title: "Exercise 2 — Add up the total",
      focusCommand: "SUM()",
      commandExplain:
        "SUM(price) adds every price together. Great for 'how much money in total?'",
      goal: "Write SELECT SUM(price) FROM lunch_orders;",
      starterSql: `SELECT 
FROM lunch_orders;`,
      hint: "Type SUM(price) after SELECT.",
      successMessage: "Nice! The lunch orders total $30.75.",
      failureMessage:
        "Use SELECT SUM(price) FROM lunch_orders; — the total is 30.75.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+sum\s*\(\s*price\s*\)/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(
          result && result.rowCount === 1 && approxEquals(firstCellNumber(result), 30.75)
        );
      },
    },
    {
      id: "ex-group-by",
      title: "Exercise 3 — Count per item",
      focusCommand: "GROUP BY",
      commandExplain:
        "GROUP BY item makes one group per item, then COUNT(*) counts the orders in each group.",
      goal: "Write SELECT item, COUNT(*) FROM lunch_orders GROUP BY item;",
      starterSql: `SELECT item, COUNT(*)
FROM lunch_orders
GROUP BY ;`,
      hint: "Type item after GROUP BY.",
      successMessage: "Great! One row per item — 6 groups in all.",
      failureMessage:
        "Use SELECT item, COUNT(*) FROM lunch_orders GROUP BY item; — expect 6 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+item\s*,\s*count\s*\(\s*\*\s*\)/.test(n)) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 6);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Most popular items",
      focusCommand: "GROUP BY + ORDER BY",
      commandExplain:
        "Count per item, then sort by the count so the most popular item is on top.",
      goal: "Count orders per item and sort from most to fewest.",
      starterSql: `-- Most popular items first:
SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY item
ORDER BY ;`,
      hint: "ORDER BY order_count DESC (or ORDER BY COUNT(*) DESC).",
      successMessage: "You ranked the menu! Pizza slice and Salad lead with 2 each.",
      failureMessage:
        "Need GROUP BY item and ORDER BY the count DESC — expect 6 rows, highest first.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\border\s+by\s+(order_count|count\s*\(\s*\*\s*\))\s+desc\b/.test(n))
          return false;
        if (!result || result.rowCount !== 6) return false;
        const countIdx = result.columns.findIndex((c) =>
          c.toLowerCase().includes("count") || c.toLowerCase() === "order_count"
        );
        if (countIdx < 0) return false;
        return Number(result.values[0][countIdx]) === 2;
      },
    },
  ],
};

