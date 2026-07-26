import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";
import { hasColumns, LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

export const daLesson4: DataLessonConfig = {
  id: "da-4",
  title: "4. Find What You're Looking For",
  goal: "Use WHERE to filter rows — match text, compare numbers, and combine conditions with AND / OR.",
  xpReward: 200,
  badge: "Filter Finder",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `So far you've controlled **columns** (which fields to show). Today you take control of **rows** with \`WHERE\` — keeping only the records that match a condition. This is the single most-used tool in all of data analysis.\n\nHere's the plan:\n\n• Match **text** exactly with \`WHERE column = 'value'\`.\n• Compare **numbers** with \`>\`, \`<\`, \`>=\`, and \`<=\`.\n• Combine conditions with \`AND\` (both true) and \`OR\` (either true).\n\nEvery time you tap a filter — "show me games under $20," "4-star-and-up reviews," "players on my team" — an app is running a \`WHERE\` clause behind the scenes. Filtering turns a giant pile of data into the exact slice you actually care about.`,
        image: "/images/lessons/da-4-filter.png",
        imageAlt: "A funnel filtering many rows down to a few matching ones",
        callout: {
          label: "Why it matters",
          text: "Filtering is the heart of asking good questions: \"only the salads,\" \"only orders over $4,\" \"only 8th graders.\" Every search bar and filter button — flights under $300, in-stock items, your friends' posts — is a WHERE clause doing the work.",
        },
      },
      {
        id: "hook",
        kicker: "Real-world hook",
        title: "The filter button you tap without thinking",
        body: `Shopping for shoes online, you tap "Under $50" and "Size 9" without a second thought. Instantly the page shrinks from 4,000 products to 12. That felt instant — but underneath, the store's database just ran a \`WHERE\` clause with two conditions combined.\n\nEvery filter chip, every "in stock only" toggle, every "4 stars and up" checkbox you've ever tapped is exactly the skill you're about to learn today.`,
        callout: {
          label: "Notice it",
          text: "Next time you filter a shopping or streaming app, try to guess what the WHERE clause behind it might look like in plain English.",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "New words for this lesson",
        body: `A few terms will make today's ideas click faster.`,
        bullets: [
          "**Condition** — a true-or-false test SQL checks on every row, like `price > 4`.",
          "**WHERE clause** — the part of a query that keeps only rows passing a condition.",
          "**Comparison operator** — a symbol like `=`, `>`, `<`, `>=` that compares values.",
          "**Boundary value** — the exact edge number in a comparison, like the `4` in `price >= 4`.",
          "**AND / OR** — words that combine two or more conditions into one rule.",
        ],
      },
      {
        id: "concept-1",
        kicker: "Match text",
        title: "WHERE keeps only matching rows",
        body: `Add \`WHERE\` right after the table name, then a **condition** — a true-or-false test SQL runs on every row. Rows that pass the test stay; the rest are filtered out. Think of \`WHERE\` like a bouncer checking each row against a rule.\n\nTo match **text**, wrap the value in **single quotes** and use a single \`=\`. The quotes tell SQL "this is a text value to match," not the name of a column.\n\nThe query below keeps only the rows where \`item\` is exactly "Salad" — and out of 8 orders, just 2 make it through.`,
        code: `SELECT *\nFROM lunch_orders\nWHERE item = 'Salad';`,
        codeCaption: "Only the salad orders",
        table: {
          columns: ["order_id", "student_name", "item", "price"],
          values: [
            [2, "Jordan", "Salad", 4.0],
            [8, "Jamie", "Salad", 4.0],
          ],
          rowCount: 2,
        },
        checkIn: {
          prompt: "Which is the correct way to filter for text matching 'Burger'?",
          choices: ["WHERE item = Burger", "WHERE item = 'Burger'", "WHERE item == \"Burger\""],
          correctIndex: 1,
          explanation: "Text values in SQL need single quotes and a single equals sign — WHERE item = 'Burger' is correct.",
        },
      },
      {
        id: "concept-2",
        kicker: "Compare numbers",
        title: "Comparing numbers with > and >=",
        body: `For **numbers**, you skip the quotes and can compare with \`>\` (greater than), \`<\` (less than), \`>=\` (greater than or equal), and \`<=\` (less than or equal). So \`WHERE price > 4\` keeps only the pricier orders.\n\nThe example below finds orders that cost more than $4 — exactly 2 of them.`,
        code: `SELECT *\nFROM lunch_orders\nWHERE price > 4;`,
        codeCaption: "Orders more expensive than $4",
        table: {
          columns: ["order_id", "student_name", "item", "price"],
          values: [
            [3, "Sam", "Chicken wrap", 5.25],
            [7, "Taylor", "Burger", 4.75],
          ],
          rowCount: 2,
        },
        checkIn: {
          prompt: "Two orders are priced exactly $4.00. Does WHERE price > 4 include them?",
          choices: [
            "Yes, > includes the boundary” belongs to a different situation than the one in the question stem",
            "No, > is strictly greater, so exactly 4 is excluded",
            "Only one of them” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation: "The `>` operator means strictly greater than — a value exactly equal to 4 does not pass. Use `>=` to include the boundary.",
        },
      },
      {
        id: "concept-3",
        kicker: "Combine conditions",
        title: "AND narrows, OR widens",
        body: `When one rule isn't enough, **combine** conditions. \`AND\` means *both* must be true (it narrows your results). \`OR\` means *at least one* must be true (it widens them). It's like filters on a shopping site: checking more "AND" boxes shows fewer items; "OR" between options shows more.`,
        bullets: [
          "**Text** needs single quotes: `WHERE item = 'Salad'`.",
          "**Numbers** don't: `WHERE price > 4`.",
          "`AND` = both true (narrower); `OR` = at least one true (wider).",
        ],
        checkIn: {
          prompt: "WHERE item = 'Salad' OR item = 'Burger' — what does this return?",
          choices: ["Every row that is either a Salad or a Burger order", "Only rows where BOTH item = 'Salad' AND item = 'Burger' are true (impossible, so 0 rows)", "Every row except Salads and Burgers"],
          correctIndex: 0,
          explanation: "OR widens the filter: a row passes if at least one condition is true, so both Salad and Burger orders come through.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build a filter, step by step",
        body: `Let's answer: *"Which orders cost $4.00 or more?"* — including the orders that land exactly on $4.\n\n**Step 1 — Pick the columns.** We'll keep everything: \`SELECT *\`.\n\n**Step 2 — Name the table.** \`FROM lunch_orders\`.\n\n**Step 3 — Filter the rows.** Since "$4.00 or more" includes 4 itself, we use \`>=\`, not \`>\`: \`WHERE price >= 4\`, then a semicolon.\n\nThis time the two $4.00 salads count too, so we get **4** rows instead of 2 — a great reminder that \`>=\` includes the boundary.`,
        code: `-- Step 1: columns -> all of them\n-- Step 2: table   -> lunch_orders\n-- Step 3: filter  -> price 4 or more (use >=)\nSELECT *\nFROM lunch_orders\nWHERE price >= 4;`,
        codeCaption: "Every order priced $4.00 or higher",
        table: {
          columns: ["order_id", "student_name", "item", "price"],
          values: [
            [2, "Jordan", "Salad", 4.0],
            [3, "Sam", "Chicken wrap", 5.25],
            [7, "Taylor", "Burger", 4.75],
            [8, "Jamie", "Salad", 4.0],
          ],
          rowCount: 4,
        },
        callout: {
          label: "Pro tip",
          text: "When you filter, predict the row count *before* you run it (\"I expect about 4 orders\"). If the real result is wildly different, your condition probably isn't saying what you meant.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "Quotes, single equals, and boundary traps",
        body: `Three small mistakes cause almost every WHERE error beginners hit.`,
        bullets: [
          "Use a **single** `=` to test for a match, not the double `==` from other programming languages.",
          "Text always needs single quotes: `WHERE item = 'Salad'`, never `WHERE item = Salad`.",
          "`>` and `>=` behave differently right at the boundary value — always double-check which one your question needs.",
        ],
        checkIn: {
          prompt: "What's wrong with `WHERE item = Salad` (no quotes)?",
          choices: [
            "SQL will think Salad is a column name, not a text value, and it will fail",
            "It should use == instead of =” belongs to a different situation than the one in the question stem",
            "Nothing, it works fine” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation: "Without quotes, SQL treats \"Salad\" as if it were a column name rather than a text value — the query breaks.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Predict, then flip >= to >",
        body: `Before the exercises, predict: how many rows will \`WHERE price >= 4\` return versus \`WHERE price > 4\`? You already saw the answer in the worked example — but try predicting it again from scratch, then verify once you're in the workspace.\n\nAs a bonus challenge, predict what \`WHERE price <= 3\` would return before you try it.`,
      },
      {
        id: "deeper-skill",
        kicker: "Go one level deeper",
        title: "Not equal, and stacking three conditions",
        body: `SQL also has \`!=\` (or sometimes \`<>\`), meaning "not equal to." \`WHERE item != 'Salad'\` keeps every order *except* salads.\n\nYou can also stack more than two conditions: \`WHERE price > 3 AND price < 5 AND item != 'Burger'\` reads naturally, left to right, as three rules that must ALL be true at once.`,
        bullets: [
          "`!=` means \"not equal to\" — the opposite of `=`.",
          "You can chain multiple `AND`s to narrow a filter step by step.",
          "Mixing `AND` and `OR` in one line gets tricky fast — for now, keep each WHERE to one type of combination.",
        ],
      },
      {
        id: "comparison",
        kicker: "Compare & contrast",
        title: "WHERE vs. LIMIT — two very different filters",
        body: `It's tempting to think LIMIT and WHERE do similar jobs since both shrink your results — but they work in completely different ways.`,
        bullets: [
          "**LIMIT** — blindly grabs the first N rows in whatever order they come, with no regard for their content.",
          "**WHERE** — checks the actual content of every row and keeps only the ones matching a real condition.",
          "LIMIT 3 might miss the exact rows you care about; WHERE always finds them, no matter where they sit in the table.",
        ],
        checkIn: {
          prompt: "You want ALL the salad orders, no matter how many there are. Should you use LIMIT or WHERE?",
          choices: ["LIMIT", "Either one works the same", "WHERE"],
          correctIndex: 2,
          explanation: "WHERE checks content and returns every row that matches, however many there are. LIMIT would just grab the first few rows regardless of what's in them.",
        },
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "What does your filter leave out?",
        body: `Filters decide what you see — and just as importantly, what you *don't* see. A biased or careless filter can hide important rows without anyone noticing.\n\nBefore you trust a filtered result, always ask: *what does this WHERE clause leave out, and could that change the conclusion?* A report on "average grade" that quietly filters out failing students, for example, tells a misleadingly rosy story.`,
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "State your filter in plain English first",
        body: `Before writing a WHERE clause, say the rule out loud in plain English: "orders that cost $4 or more." Then translate it directly into SQL. This habit prevents the classic mix-up between \`>\` and \`>=\`, and between \`AND\` and \`OR\`.`,
      },
      {
        id: "reflection",
        kicker: "Reflection",
        title: "Think of a filter you'd design",
        body: `If you ran the school store's database, what's one WHERE clause you'd write to help the manager make a decision — "items priced under $2 that are running low," for example? Write your condition in plain English first, then try converting it to SQL syntax.`,
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "The library's overdue books",
        body: `The school library has a table \`checkouts\` with columns \`book_title\`, \`student_name\`, and \`days_overdue\`. The librarian wants to know: *"Which checkouts are more than 7 days overdue?"*\n\nWrite the condition (in plain English or SQL) that answers this. What's the difference between using \`>\` 7 and \`>=\` 7 here — and which one actually matches "more than 7 days"?`,
        callout: {
          label: "Apply it",
          text: "SELECT * FROM checkouts WHERE days_overdue > 7; — \"more than 7\" means the boundary value itself (exactly 7) should NOT be included.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you dive in",
        body: `Let's confirm text matching, number comparisons, and AND/OR are all locked in.`,
        checkIn: {
          prompt: "Which condition finds orders that are BOTH priced over $3 AND are salads?",
          choices: ["WHERE price > 3 AND item = 'Salad'", "WHERE price > 3 OR item = 'Salad'", "WHERE price = 3 AND item = Salad"],
          correctIndex: 0,
          explanation: "AND requires both conditions to be true at once, narrowing the results to only salads priced above $3 — with the text value properly quoted.",
        },
      },
      {
        id: "where-walkthrough",
        kicker: "Query walkthrough",
        title: "Narrowing lunch_orders with AND",
        body: `The cafeteria manager asks: "Show me orders that cost **at least** $4 **and** are **not** burgers." That needs two conditions chained with \`AND\` — both must be true for a row to stay.\n\nWatch the row count shrink as each condition applies. The table below shows only rows where \`price >= 4\` AND \`item\` is not 'Burger'. Read the result: how many rows survived? Do the prices all meet the threshold?`,
        code: `SELECT student_name, item, price\nFROM lunch_orders\nWHERE price >= 4\n  AND item != 'Burger';`,
        codeCaption: "Two conditions, both must pass",
        table: {
          columns: ["student_name", "item", "price"],
          values: [
            ["Jordan", "Salad", 4.0],
            ["Sam", "Chicken wrap", 5.25],
            ["Jamie", "Salad", 4.0],
          ],
          rowCount: 3,
        },
      },
      {
        id: "mistake-quotes",
        kicker: "Common SQL mistake",
        title: "Forgetting quotes around text values",
        body: `Text values in \`WHERE\` must be wrapped in **single quotes**. Writing \`WHERE item = Salad\` makes SQL think \`Salad\` is a column name, not the word "Salad" — and the query breaks.\n\nNumbers don't need quotes: \`WHERE price > 4\` is fine. Text always does: \`WHERE item = 'Salad'\`. Mixing these up is one of the most common beginner errors in every SQL lesson from here on.`,
        bullets: [
          "Correct: `WHERE item = 'Salad'` — text in single quotes.",
          "Wrong: `WHERE item = Salad` — SQL looks for a column named Salad.",
          "Numbers stay bare: `WHERE price >= 4` — no quotes needed.",
        ],
        checkIn: {
          prompt: "Which WHERE clause correctly finds orders for 'Pizza slice'?",
          choices: ["WHERE item = Pizza slice", "WHERE item = 'Pizza slice'", "WHERE 'item' = Pizza slice"],
          correctIndex: 1,
          explanation: "Text values need single quotes around the whole value: 'Pizza slice'. Without them, SQL treats the words as column names.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned to filter rows with \`WHERE\`: match **text** with quotes and \`=\`, compare **numbers** with \`>\` and \`>=\`, and combine rules with \`AND\` / \`OR\`.\n\nIn the exercises you'll filter to just the salads, then to pricier orders, then include the boundary with \`>=\`, and finally widen your search with \`OR\` — watching the row count change each time.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
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

