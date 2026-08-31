import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";
import { hasColumns, LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

export const daLesson5: DataLessonConfig = {
  id: "da-5",
  title: "5. Sort and Rank",
  goal: "Use ORDER BY to sort rows, flip the direction with DESC, and combine with LIMIT to find top results.",
  xpReward: 250,
  badge: "Rank Master",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Filtering tells you *which* rows you get. **Sorting** decides which ones come *first*. Today you'll learn \`ORDER BY\` — and unlock the ability to answer every "top" and "best" question.\n\nHere's the plan:\n\n• Sort rows with \`ORDER BY\` (smallest to largest by default).\n• Flip the direction with \`DESC\` to put the biggest on top.\n• Combine \`ORDER BY\` with \`LIMIT\` to build a "Top N" leaderboard.\n\nThis is the magic behind every leaderboard you've ever seen: the high-score table in a game, the "Top 50" chart on a music app, "trending" videos, or "sort by price: low to high" when you shop. All of it is \`ORDER BY\` quietly arranging the rows.`,
        image: "/images/lessons/da-5-sort.png",
        imageAlt: "Bars being arranged from shortest to tallest, like a ranking",
        callout: {
          label: "Why it matters",
          text: "Ranking turns raw data into a story: who's winning, what's most popular, what costs the most. Leaderboards, \"top 10\" lists, \"newest first,\" and \"best sellers\" are all ORDER BY in action.",
        },
      },
      {
        id: "hook",
        kicker: "Real-world hook",
        title: "Behind every leaderboard is a sort",
        body: `Open any video game's high-score screen. The names at the top didn't get there by luck of the alphabet — someone ran a query that sorted every player's score from highest to lowest, then kept only the top few.\n\nChange one thing — sort by "fastest time" instead of "highest score" — and the exact same table of players produces a completely different leaderboard. The data didn't change. The **sort** did.`,
        callout: {
          label: "Notice it",
          text: "Next time you see a \"Top 10\" or \"trending now\" list, ask yourself: sorted by what column, in which direction?",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "New words for this lesson",
        body: `A few terms will make today's ideas click faster.`,
        bullets: [
          "**ORDER BY** — the clause that sorts your result rows by a column.",
          "**Ascending (ASC)** — smallest to largest, or A to Z. The default direction.",
          "**Descending (DESC)** — largest to smallest, or Z to A.",
          "**Top N** — the recipe of sorting, then LIMITing, to get the best (or worst) few results.",
        ],
      },
      {
        id: "concept-1",
        kicker: "Sort it",
        title: "ORDER BY arranges the rows",
        body: `Add \`ORDER BY\` after your table (and after any \`WHERE\`), then name the column to sort on. By default SQL sorts **ascending** — smallest number first, or A-to-Z for text.\n\nThink of lining up a deck of cards from lowest to highest, or arranging your contacts alphabetically. \`ORDER BY\` does that to your rows automatically.\n\nIn the query below we sort by \`price\`, so the cheapest lunch (the Fruit cup at $2.75) floats right to the top.`,
        code: `SELECT student_name, item, price\nFROM lunch_orders\nORDER BY price;`,
        codeCaption: "Cheapest first",
        table: {
          columns: ["student_name", "item", "price"],
          values: [
            ["Riley", "Fruit cup", 2.75],
            ["Morgan", "Yogurt parfait", 3.0],
            ["Alex", "Pizza slice", 3.5],
            ["Casey", "Pizza slice", 3.5],
          ],
          rowCount: 4,
        },
        checkIn: {
          prompt: "By default, does ORDER BY sort ascending or descending?",
          choices: ["Descending (largest/Z first)", "Ascending (smallest/A first)", "It picks randomly"],
          correctIndex: 1,
          explanation: "Ascending is the default direction — smallest numbers or earliest letters come first unless you add DESC.",
        },
      },
      {
        id: "concept-2",
        kicker: "Find the top",
        title: "DESC flips the direction",
        body: `To answer "most" or "highest" questions, flip the sort with \`DESC\` (short for *descending* — largest first).\n\nIt's exactly how a game builds its high-score board: sort everyone's score from highest to lowest so the winner lands right at the top.`,
        code: `SELECT student_name, item, price\nFROM lunch_orders\nORDER BY price DESC;`,
        codeCaption: "Most expensive first",
        bullets: [
          "`ORDER BY price` → ascending (small → large).",
          "`ORDER BY price DESC` → descending (large → small).",
        ],
        checkIn: {
          prompt: "You want the most expensive order to appear FIRST. What do you add?",
          choices: ["Nothing — ascending already does this", "LIMIT 1 by itself", "DESC after the column name"],
          correctIndex: 2,
          explanation: "DESC reverses the default ascending order, so the largest value — the most expensive order — appears first.",
        },
      },
      {
        id: "concept-3",
        kicker: "Top N recipe",
        title: "ORDER BY then LIMIT builds a leaderboard",
        body: `\`ORDER BY ... DESC\` followed by \`LIMIT N\` is the classic recipe for a "Top N" list — sort everything first, then keep only the top few.\n\nBelow we sort by \`price DESC\` and \`LIMIT 3\` to crown the three most expensive orders.`,
        code: `SELECT student_name, item, price\nFROM lunch_orders\nORDER BY price DESC\nLIMIT 3;`,
        codeCaption: "The 3 most expensive orders",
        table: {
          columns: ["student_name", "item", "price"],
          values: [
            ["Sam", "Chicken wrap", 5.25],
            ["Taylor", "Burger", 4.75],
            ["Jordan", "Salad", 4.0],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "What is the correct ORDER of operations for a 'Top 3' query?",
          choices: [
            "ORDER BY first (to rank everything), then LIMIT 3 (to keep the top)",
            "LIMIT 3 first, then ORDER BY",
            "It doesn't matter which comes first",
          ],
          correctIndex: 0,
          explanation: "You must sort the full set first so the ranking is correct, THEN limit to the top rows — otherwise LIMIT might grab random rows before they're sorted.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build a Top 3 leaderboard, step by step",
        body: `Let's answer: *"What are the three most expensive lunch orders?"*\n\n**Step 1 — Pick the columns.** Show who, what, and how much: \`SELECT student_name, item, price\`.\n\n**Step 2 — Name the table.** \`FROM lunch_orders\`.\n\n**Step 3 — Sort biggest first.** Most expensive means descending: \`ORDER BY price DESC\`.\n\n**Step 4 — Keep the top few.** Cap it at three: \`LIMIT 3\`, then a semicolon.\n\nThe result is a tidy leaderboard with the priciest order ($5.25 Chicken wrap) proudly on top.`,
        code: `-- Step 1: columns -> name, item, price\n-- Step 2: table   -> lunch_orders\n-- Step 3: sort    -> price, biggest first (DESC)\n-- Step 4: keep    -> only the top 3\nSELECT student_name, item, price\nFROM lunch_orders\nORDER BY price DESC\nLIMIT 3;`,
        codeCaption: "The Top 3 priciest orders, built four steps at a time",
        table: {
          columns: ["student_name", "item", "price"],
          values: [
            ["Sam", "Chicken wrap", 5.25],
            ["Taylor", "Burger", 4.75],
            ["Jordan", "Salad", 4.0],
          ],
          rowCount: 3,
        },
        callout: {
          label: "Pro tip",
          text: "Want the single winner instead of a top 3? Keep the same `ORDER BY ... DESC` and just change `LIMIT 3` to `LIMIT 1`. Want the *cheapest* instead? Drop `DESC` so it sorts ascending.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "LIMIT alone is not a leaderboard",
        body: `The most common mistake in this lesson: assuming \`LIMIT 3\` by itself gives you the "top 3." It doesn't — it just grabs the first 3 rows in whatever order they happen to already be in, which is often arbitrary.`,
        bullets: [
          "`ORDER BY` only **rearranges** rows — it never removes any, unlike `WHERE`.",
          "`LIMIT 3` alone does **not** give you the top 3 — you need `ORDER BY` first.",
        ],
        checkIn: {
          prompt: "SELECT * FROM lunch_orders LIMIT 3; (with no ORDER BY) — what do you get?",
          choices: [
            "The 3 cheapest orders",
            "Some 3 rows, in no guaranteed meaningful order",
            "The 3 most expensive orders",
          ],
          correctIndex: 1,
          explanation: "Without ORDER BY, LIMIT just grabs the first rows it happens to encounter — not necessarily the highest, lowest, or most meaningful ones.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Predict who's on top",
        body: `Before the exercises, predict: if you sort \`lunch_orders\` by \`student_name\` (text, not price), who appears first? Remember, ascending order for text means alphabetical, A first.\n\nOnce in the workspace, try \`SELECT student_name FROM lunch_orders ORDER BY student_name;\` and check your guess.`,
      },
      {
        id: "deeper-skill",
        kicker: "Go one level deeper",
        title: "Sorting by more than one column",
        body: `You can sort by multiple columns at once: \`ORDER BY item, price DESC\` first groups rows alphabetically by item, then within each item, sorts by price from high to low. This is called a **tiebreaker** sort — the second column decides ties left over from the first.`,
        bullets: [
          "The first column listed is the main sort.",
          "Any column after it breaks ties within the first sort.",
          "Each column can have its own direction — ASC or DESC independently.",
        ],
      },
      {
        id: "comparison",
        kicker: "Compare & contrast",
        title: "ORDER BY vs. WHERE — sorting is not filtering",
        body: `These two clauses are often confused because they both change what your result looks like — but they do fundamentally different jobs.`,
        bullets: [
          "**WHERE** — removes rows that don't match a condition. Fewer rows come out than went in.",
          "**ORDER BY** — rearranges all the rows that survive; the row count never changes because of it.",
          "You can use both together: filter first with WHERE, then sort what's left with ORDER BY.",
        ],
        checkIn: {
          prompt: "If a table has 20 rows and you only add ORDER BY (no WHERE), how many rows come back?",
          choices: [
            "Exactly 1",
            "Still all 20, just rearranged",
            "Fewer than 8",
          ],
          correctIndex: 1,
          explanation: "ORDER BY never removes rows — it only changes their order. All 20 rows are still there, just rearranged.",
        },
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "Rankings feel objective, but they aren't",
        body: `A ranking looks like an indisputable fact, but it's always built on a choice: which column did you sort by? "Best" student by grade average is a very different ranking than "best" student by attendance or effort.\n\nWhenever you publish a ranking, choose the sorting column honestly and **say which one you used** — never let a "Top 10" imply more objectivity than it actually has.`,
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "Always name the sort column out loud",
        body: `Before you write ORDER BY, say the ranking rule out loud: "most expensive first" or "alphabetical by name." This tiny habit prevents the classic mistake of sorting ascending when you meant descending, or vice versa.`,
      },
      {
        id: "reflection",
        kicker: "Reflection",
        title: "What would YOUR leaderboard sort by?",
        body: `Think of something you'd like to rank in your own life — favorite songs, workout times, video game scores. What column would you sort by, and would you choose ascending or descending? Would the ranking change a lot if you picked a different column?`,
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "The talent show's judging table",
        body: `A talent show recorded scores in a table \`performances\` with columns \`act_name\` and \`judge_score\`. The host wants to announce the top 3 acts on stage, from third place up to first.\n\nWhat query would produce exactly that ranking? Careful — think about whether the host wants the winner announced first or last in your result order.`,
        callout: {
          label: "Apply it",
          text: "SELECT act_name, judge_score FROM performances ORDER BY judge_score DESC LIMIT 3; — the winner appears first in the result, so the host may want to read the list backward on stage.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you dive in",
        body: `Let's confirm ORDER BY, DESC, and the Top N recipe are all locked in.`,
        checkIn: {
          prompt: "Which query finds the SINGLE cheapest lunch order?",
          choices: [
            "SELECT * FROM lunch_orders ORDER BY price LIMIT 1",
            "SELECT * FROM lunch_orders LIMIT 1",
            "SELECT * FROM lunch_orders ORDER BY price DESC LIMIT 1",
          ],
          correctIndex: 0,
          explanation: "Sorting ascending (the default, no DESC) puts the cheapest first, and LIMIT 1 keeps just that single row.",
        },
      },
      {
        id: "top-n-walkthrough",
        kicker: "Query walkthrough",
        title: "Building a Top 3 leaderboard step by step",
        body: `A leaderboard needs three ingredients: sort by the stat that matters (\`ORDER BY price DESC\`), pick only the columns you want to display, and cap the list (\`LIMIT 3\`).\n\nRead the result like a real ranking: Sam's Chicken wrap leads at $5.25, Taylor's Burger is second at $4.75, Jordan and Jamie tie for salad at $4.00. When two rows share the same value, SQL keeps both — your "Top 3" might actually show four rows if there's a tie at the cutoff.`,
        code: `SELECT student_name, item, price\nFROM lunch_orders\nORDER BY price DESC\nLIMIT 3;`,
        codeCaption: "Top 3 most expensive orders",
        table: {
          columns: ["student_name", "item", "price"],
          values: [
            ["Sam", "Chicken wrap", 5.25],
            ["Taylor", "Burger", 4.75],
            ["Jordan", "Salad", 4.0],
          ],
          rowCount: 3,
        },
      },
      {
        id: "read-ranked-results",
        kicker: "Analyst habits",
        title: "After sorting, scan the first and last row",
        body: `Whenever you \`ORDER BY\`, make a two-second habit of checking the **top row** (did the expected winner land first?) and, if you didn't use \`LIMIT\`, the **bottom row** (does the last entry make sense?).\n\nIf Sam's wrap should be most expensive but Alex's pizza slice appears first, your sort direction is probably wrong — you may have forgotten \`DESC\`. Catching that before you share a "Top Spender" list saves real embarrassment.`,
        checkIn: {
          prompt: "You wanted the MOST expensive order first but got the cheapest. What's the most likely fix?",
          choices: [
            "Add LIMIT 1",
            "Change ORDER BY price to ORDER BY price DESC",
            "Remove the FROM clause",
          ],
          correctIndex: 1,
          explanation: "Without DESC, ORDER BY sorts ascending (lowest first). Adding DESC flips it so the highest price leads.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You can now rank your data: sort with \`ORDER BY\`, flip it with \`DESC\`, and combine with \`LIMIT\` to build a "Top N" leaderboard.\n\nIn the exercises you'll sort low-to-high, then high-to-low, grab the top 3, and finally crown the single most expensive order with its student's name — just like the worked example.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/data/4",
  nextHref: "/learn/data/6",
  dashboardHref: "/dashboard",
  instructorScript: `**Coach's note**:
"What's the most expensive lunch?" "Who's at the top?" These are **ranking** questions.

To answer them you **sort** your rows with **ORDER BY**, then often grab the top few with **LIMIT**.

Today you'll practice:
1. Sorting low → high (ascending, the default)
2. Sorting high → low with **DESC**
3. Combining **ORDER BY + LIMIT** to get a "Top N"

The order of the rows in your results matters now — read carefully!`,
  commandReference: [
    {
      command: "ORDER BY",
      summary:
        "Sorts the result by a column. By default it goes smallest to largest.",
      example: "ORDER BY price",
    },
    {
      command: "DESC",
      summary:
        "Sorts largest to smallest. Add it after the column name.",
      example: "ORDER BY price DESC",
    },
    {
      command: "ASC",
      summary:
        "Sorts smallest to largest. This is the default, so it's optional.",
      example: "ORDER BY price ASC",
    },
    {
      command: "Top N",
      summary:
        "Sort, then LIMIT to grab the top results — like a leaderboard.",
      example: "ORDER BY price DESC LIMIT 3",
    },
  ],
  kidExplain: [
    {
      title: "Sorting = lining up",
      text: "ORDER BY lines your rows up by a column, like sorting cards from low to high.",
    },
    {
      title: "DESC flips it",
      text: "DESC means descending — biggest first. Perfect for 'most expensive' questions.",
    },
    {
      title: "Top N = sort + LIMIT",
      text: "To get the 3 priciest items: sort by price DESC, then LIMIT 3.",
    },
  ],
  steps: [
    "Sort all orders by price, low to high.",
    "Sort all orders by price, high to low (DESC).",
    "Get the top 3 most expensive orders.",
    "Challenge: name + price of the single most expensive order.",
  ],
  cfu: [
    {
      question: "What does ORDER BY change about a result?",
      answer:
        "It sorts the rows by one or more columns. It does not remove rows — it only changes their order.",
    },
    {
      question: "What is the difference between ASC and DESC?",
      answer:
        "ASC sorts low-to-high (A→Z, small→large). DESC flips the direction (high-to-low).",
    },
    {
      question: "How do ORDER BY and LIMIT work together to find a “top N” answer?",
      answer:
        "Sort so the best values come first (often DESC), then LIMIT N to keep only the top rows — that is a ranking pattern.",
    },
  ],
  tryThis: [
    "Try ORDER BY student_name — it sorts text alphabetically!",
    "Change LIMIT 3 to LIMIT 1 to get only the winner.",
  ],
  dataEthicsMoment:
    "Rankings feel objective, but the column you sort by decides the 'winner.' Choose it honestly and say which column you used.",
  exercises: [
    {
      id: "ex-order-asc",
      title: "Exercise 1 — Sort low to high",
      focusCommand: "ORDER BY",
      commandExplain:
        "ORDER BY price sorts from cheapest to most expensive (ascending is the default).",
      goal: "Write SELECT * FROM lunch_orders ORDER BY price;",
      starterSql: `SELECT *
FROM lunch_orders
ORDER BY ;`,
      hint: "Type price after ORDER BY.",
      successMessage: "Nice! The cheapest order (Fruit cup) is now on top.",
      failureMessage:
        "Use ORDER BY price. The first row should be the cheapest item.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\border\s+by\s+price\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (!result || result.rowCount !== 20) return false;
        const priceIdx = result.columns.findIndex(
          (c) => c.toLowerCase() === "price"
        );
        if (priceIdx < 0) return false;
        return Number(result.values[0][priceIdx]) === 2.75;
      },
    },
    {
      id: "ex-order-desc",
      title: "Exercise 2 — Sort high to low",
      focusCommand: "ORDER BY ... DESC",
      commandExplain:
        "Add DESC to sort from largest to smallest — the most expensive order lands on top.",
      goal: "Write SELECT * FROM lunch_orders ORDER BY price DESC;",
      starterSql: `SELECT *
FROM lunch_orders
ORDER BY price ;`,
      hint: "Type DESC after price.",
      successMessage: "Correct! The Chicken wrap ($5.25) is now first.",
      failureMessage:
        "Use ORDER BY price DESC. The first row should be the priciest item.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\border\s+by\s+price\s+desc\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        if (!result || result.rowCount !== 20) return false;
        const priceIdx = result.columns.findIndex(
          (c) => c.toLowerCase() === "price"
        );
        if (priceIdx < 0) return false;
        return Number(result.values[0][priceIdx]) === 5.25;
      },
    },
    {
      id: "ex-top-n",
      title: "Exercise 3 — Top 3",
      focusCommand: "ORDER BY + LIMIT",
      commandExplain:
        "Sort high to low, then LIMIT 3 to keep only the three most expensive orders.",
      goal: "Write SELECT * FROM lunch_orders ORDER BY price DESC LIMIT 3;",
      starterSql: `SELECT *
FROM lunch_orders
ORDER BY price DESC
LIMIT ;`,
      hint: "Type 3 after LIMIT.",
      successMessage: "Great leaderboard! The 3 priciest orders only.",
      failureMessage:
        "Use ORDER BY price DESC LIMIT 3. Expect exactly 3 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\border\s+by\s+price\s+desc\b/.test(n)) return false;
        if (!/\blimit\s+3\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 3);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — The single winner",
      focusCommand: "SELECT + ORDER BY + LIMIT",
      commandExplain:
        "Combine it all: pick two columns, sort by price DESC, and LIMIT 1 to crown the most expensive order.",
      goal: "Write SELECT student_name, price FROM lunch_orders ORDER BY price DESC LIMIT 1;",
      starterSql: `-- Who placed the single most expensive order?
SELECT 
FROM lunch_orders
ORDER BY 
LIMIT ;`,
      hint: "SELECT student_name, price ... ORDER BY price DESC LIMIT 1;",
      successMessage: "You crowned the winner: Sam's Chicken wrap at $5.25!",
      failureMessage:
        "Need student_name, price, ORDER BY price DESC, LIMIT 1 — exactly 1 row.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+student_name,\s*price\b/.test(n)) return false;
        if (!/\border\s+by\s+price\s+desc\b/.test(n)) return false;
        if (!/\blimit\s+1\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 1 &&
            hasColumns(result, "student_name", "price")
        );
      },
    },
  ],
};

