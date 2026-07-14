"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

const daLesson9: DataLessonConfig = {
  id: "da-9",
  title: "9. Tell the Story with Charts",
  goal: "Shape query results into a chart — a label column and a number column — and let sorting tell the story.",
  xpReward: 450,
  badge: "Chart Maker",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  prevHref: "/learn/data/8",
  nextHref: "/learn/data/10",
  dashboardHref: "/dashboard",
  chartConfig: {
    type: "bar",
    xKey: "item",
    yKey: "order_count",
    title: "Orders per item",
  },
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You can already pull numbers out of a database. Today you'll make those numbers *talk* — by turning them into a **bar chart**, the most common and most useful chart in the world.\n\nHere's your roadmap:\n\n• **Why** a chart beats a wall of numbers.\n• **How to read** a bar chart's two parts: the labels and the bars.\n• **When** a bar chart is the right pick — and when a line or pie chart wins instead.\n• A **worked example** where we read a real chart together before you build your own.\n\nPicture a video-game leaderboard, or the standings in your favorite sport. Your eye finds the longest bar or the top name *instantly* — way faster than reading a list of scores. That speed is the superpower of a good chart, and you're about to build one from a SQL query.`,
        image: "/images/lessons/lesson-bar.png",
        imageAlt: "A tablet showing a bar chart of quarterly sales, with one bar taller than the rest",
        callout: {
          label: "Why it matters",
          text: "Sports standings, app store rankings, YouTube view counts, and election results are all bar charts. Anywhere people compare amounts across categories, a bar chart is doing the work.",
        },
      },
      {
        id: "hook",
        kicker: "Real-world hook",
        title: "Why your eye jumps straight to the tallest bar",
        body: `Look at any sports standings graphic on TV — a row of bars for each team's wins. You don't read a single number; your eye is instantly drawn to the tallest bar. That's not an accident of design, it's basic human vision: we compare lengths and heights almost instantly, far faster than we compare digits in a list of numbers.\n\nThat's the entire reason bar charts exist, and why you're about to learn to build one from a SQL query.`,
        callout: {
          label: "Notice it",
          text: "Next time you glance at a bar chart, notice how quickly you find the biggest and smallest bars — often before you've even read the axis labels.",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "New words for this lesson",
        body: `A few terms will make today's ideas click faster.`,
        bullets: [
          "**x-axis** — the horizontal line along the bottom of a chart, usually showing labels/categories.",
          "**y-axis** — the vertical line, usually showing the number/value.",
          "**Chart-ready query** — a query result shaped as a label column plus a number column.",
          "**Category** — a distinct group being compared, like each lunch item.",
        ],
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "A bar chart compares things side by side",
        body: `A table full of numbers is accurate but slow to read — your brain has to compare each value to every other value, one by one. A **bar chart** does that comparison *for* you by turning each number into a bar. The tallest bar is the biggest value, no math required.\n\nThink of bars as runners lined up at a finish line. One glance tells you who's ahead, who's behind, and by how much. That's why bar charts are everywhere: they convert "compare these amounts" into "just look."\n\nUse a bar chart whenever you want to **compare separate categories** — which lunch item is most popular, which game has the most players, which month had the most rain. Each category gets its own bar.`,
        checkIn: {
          prompt: "What's the main job of a bar chart?",
          choices: [
            "To show how one number changes over time",
            "To compare amounts across separate categories at a glance",
            "To show parts of one whole",
          ],
          correctIndex: 1,
          explanation: "A bar chart's superpower is letting your eye instantly compare separate categories by the height of their bars.",
        },
      },
      {
        id: "concept-2",
        kicker: "How to read it",
        title: "Every bar chart has a label and a value",
        body: `Here's the exact chart you'll build in this lesson. Every bar chart is made of just two parts, and once you see them you can read any bar chart ever made.\n\n• The **labels** along the bottom (the **x-axis**) name each category — here, the **item**.\n• The **height** of each bar (the **y-axis**) shows the **number** — here, how many orders.\n\nTaller bar = bigger number. That's the whole idea. Notice the two tallest bars (Pizza slice and Salad) jump out immediately — that's the comparison happening automatically.`,
        chart: {
          config: { type: "bar", xKey: "item", yKey: "order_count", title: "Orders per item" },
          result: {
            columns: ["item", "order_count"],
            values: [
              ["Pizza slice", 2],
              ["Salad", 2],
              ["Burger", 1],
              ["Chicken wrap", 1],
              ["Fruit cup", 1],
              ["Yogurt parfait", 1],
            ],
            rowCount: 6,
          },
        },
        checkIn: {
          prompt: "In a bar chart, what does the HEIGHT of a bar represent?",
          choices: ["The category's name", "The number/value for that category", "The order it appears in"],
          correctIndex: 1,
          explanation: "The x-axis carries the labels (categories); the height of each bar (the y-axis) carries the number being compared.",
        },
      },
      {
        id: "concept-3",
        kicker: "Choose wisely",
        title: "When to use a bar chart (and when not to)",
        body: `Picking the right chart is half the skill of a data analyst. The wrong chart can hide the answer or even mislead people. Here's the cheat sheet:`,
        bullets: [
          "**Use a bar chart** to compare separate categories (most popular item, top scorer).",
          "**Use a line chart** instead when your x-axis is time (orders each day).",
          "**Use a pie chart** instead when you're showing parts of one whole (each item's share of all orders).",
        ],
        checkIn: {
          prompt: "You want to show 'orders per day this week.' Is a bar chart the best fit?",
          choices: [
            "Yes, always use bar charts",
            "No — since the x-axis is time in order, a line chart shows the trend better",
            "No — a pie chart is required for anything with numbers",
          ],
          correctIndex: 1,
          explanation: "When the x-axis is time, a line chart reveals the trend (rising, falling) far better than separate bars — you'll learn this chart in Lesson 11.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Read a chart before you build one",
        body: `Before you write any SQL, let's practice *reading* a finished chart — because that's the skill that makes you trustworthy with data. Imagine a different question: **"How many players are on each esports team?"**\n\nHere are the numbers behind the chart. **Step 1 — find the tallest bar:** Comets at 9 players is the biggest. **Step 2 — find the shortest:** Bolts at 4. **Step 3 — compare:** the Comets have more than double the Bolts. In one glance, the chart answers "who's biggest, who's smallest, and by how much."\n\nNow flip it around: to *build* this chart from a query, you'd need exactly these two columns — a label (team) and a number (players). That's the same shape you'll create from \`lunch_orders\`.`,
        table: {
          columns: ["team", "players"],
          values: [
            ["Comets", 9],
            ["Dragons", 7],
            ["Falcons", 6],
            ["Bolts", 4],
          ],
          rowCount: 4,
        },
        callout: {
          label: "Pro tip",
          text: "Sorting the bars from tallest to shortest turns a plain chart into a ranking. Use `ORDER BY order_count DESC` so the biggest counts come first. Add `LIMIT 3` when you only want a focused top-three chart — same recipe as a leaderboard from Lesson 5.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "A cropped axis can make a small gap look huge",
        body: `A bar chart's bars look honest, but if the y-axis doesn't start at zero, a tiny difference can look enormous. Before you trust (or share) a bar chart, always check where the bottom of the scale begins.`,
        checkIn: {
          prompt: "Two bars have values 48 and 50, but the y-axis starts at 47 instead of 0. What happens?",
          choices: [
            "The bars will look nearly identical, as they should",
            "The tiny 2-unit difference will look dramatically exaggerated",
            "SQL will refuse to run the query",
          ],
          correctIndex: 1,
          explanation: "Starting the y-axis above zero exaggerates small differences — a classic way charts can visually mislead even when the underlying numbers are correct.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Sketch the bars before you query",
        body: `Look back at the lunch_orders data from earlier lessons. Before opening the exercises, sketch (on paper or in your head) roughly how tall each item's bar should be, based on order counts you've already seen. Then build the real query and compare.`,
      },
      {
        id: "deeper-skill",
        kicker: "Go one level deeper",
        title: "Sort and limit so the chart tells a ranking",
        body: `A bar chart is clearest when the tallest bars lead. After \`GROUP BY item\` and \`COUNT(*) AS order_count\`, add \`ORDER BY order_count DESC\` so the most popular items appear first — your eye reads it like a top-10 list.\n\nSometimes you want a **focused** story instead of every category. \`LIMIT 3\` keeps only the top three rows after sorting, which is perfect for a "top 3 lunch items" chart without clutter. Remember: **sort first, then LIMIT** — otherwise you might grab three random rows, not the top three.`,
        bullets: [
          "`ORDER BY order_count DESC` — tallest bars first.",
          "`LIMIT N` after sorting — keep only the top N categories.",
          "Sort + limit changes what story the chart tells — use it on purpose.",
        ],
      },
      {
        id: "comparison",
        kicker: "Compare & contrast",
        title: "Raw table vs. chart-ready query",
        body: `The data you'll use is the **lunch_orders** table — one row per order. Raw, it's just a list; a bar chart needs it summarized first.`,
        table: {
          columns: ["student_name", "item", "price"],
          values: [
            ["Alex", "Pizza slice", 3.5],
            ["Jordan", "Salad", 4.0],
            ["Sam", "Chicken wrap", 5.25],
            ["Casey", "Pizza slice", 3.5],
          ],
          rowCount: 4,
        },
        bullets: [
          "**Raw table** — one row per order, no summary. Not chart-ready.",
          "**Chart-ready query** — `GROUP BY item` + `COUNT(*)` produces exactly a label column + a number column.",
        ],
        checkIn: {
          prompt: "Why can't you chart the raw lunch_orders table directly?",
          choices: [
            "You can — any table can be charted as-is",
            "It has one row per order, not one summarized row per category, so it needs GROUP BY + COUNT first",
            "Charts only work on tables with exactly 2 rows",
          ],
          correctIndex: 1,
          explanation: "A chart needs exactly one row per category (a label + a number). The raw table has one row per order, so it must be summarized with GROUP BY first.",
        },
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "Charts persuade — use that power honestly",
        body: `Charts persuade. Truncating an axis or cherry-picking bars can mislead — show the full, honest picture. If you only show the "top 3" bars without mentioning there were 20 categories total, you might be telling a much rosier (or scarier) story than the full data supports.`,
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "Always check where the y-axis starts",
        body: `Before trusting or sharing any bar chart — yours or someone else's — glance at the y-axis. Does it start at zero? If not, ask why, and mentally correct for the exaggeration before drawing any conclusions.`,
      },
      {
        id: "standards",
        kicker: "Standards connect",
        title: "Why this lesson counts",
        body: `Building and reading visualizations is a core data-science and math skill.`,
        bullets: [
          "**CSTA 3A-DA-11** — Create interactive data visualizations using software tools to help others understand real-world phenomena.",
          "**CSTA 2-DA-07** — Represent data using multiple encoding schemes, including charts.",
          "**Common Core Math (statistics bridge)** — Display and interpret categorical data using bar graphs.",
          "**ISTE Knowledge Constructor** — Curating information from data and presenting it meaningfully to others.",
        ],
      },
      {
        id: "reflection",
        kicker: "Reflection",
        title: "Find a bar chart and question its axis",
        body: `Find a bar chart in the wild — a news article, a school report, a game stats screen. Does the y-axis start at zero? Are the bars sorted in a way that emphasizes a particular story? Would the chart look different with an honest axis?`,
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "The talent show's vote tally",
        body: `A talent show collected audience votes in a table \`votes\` with one row per vote and a column \`act_name\`. The host wants a bar chart showing which act got the most votes, ranked highest to lowest.\n\nWhat query would produce the chart-ready result, sorted correctly?`,
        callout: {
          label: "Apply it",
          text: "SELECT act_name, COUNT(*) AS vote_count FROM votes GROUP BY act_name ORDER BY vote_count DESC; — exactly the label + number shape, sorted for a clean ranking.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you dive in",
        body: `Let's confirm the chart-ready recipe is locked in.`,
        checkIn: {
          prompt: "Which query produces a proper chart-ready result for 'orders per item'?",
          choices: [
            "SELECT * FROM lunch_orders;",
            "SELECT item, COUNT(*) AS order_count FROM lunch_orders GROUP BY item;",
            "SELECT item FROM lunch_orders ORDER BY item;",
          ],
          correctIndex: 1,
          explanation: "A chart needs a label column (item) and a number column (order_count), produced by grouping and counting — exactly this query's shape.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You now know what a bar chart is for (comparing categories), how to read it (label + height), when *not* to use it, and how to **sort with DESC** and **LIMIT** so the ranking jumps out. Best of all, you know the recipe every chart needs: **a label column + a number column**.\n\nIn the exercises you'll write the query that shapes \`lunch_orders\` into a bar chart, sort it biggest-first, optionally limit to the top 3, then watch the chart appear under your results.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  instructorScript: `**Coach's note**:
Numbers in a table are useful — but a **chart** makes the story obvious at a glance.

A chart needs two things from your query:
1. A **label** column (the categories) → here, **item**
2. A **number** column (the heights) → here, **order_count**

When your results have columns named **item** and **order_count**, a bar chart appears under your results automatically.

**Pick the right chart for the question:**
- **Bar** → compare separate categories (which item is most popular?). *This lesson.*
- **Line** → show change over time (orders each day this week).
- **Pie** → show parts of one whole (each item's share of all orders).

Watch how **sorting** changes the story the chart tells — and remember that *design choices* (sorting, cropping the axis, or showing only the top few) can make the same data tell very different stories.`,
  commandReference: [
    {
      command: "Chart shape",
      summary:
        "A chart needs one label column and one number column. Aim for exactly two columns.",
      example: "SELECT item, COUNT(*) AS order_count",
    },
    {
      command: "GROUP BY",
      summary:
        "Groups rows so each label (item) gets one bar.",
      example: "GROUP BY item",
    },
    {
      command: "AS order_count",
      summary:
        "Name the number column order_count so the chart knows what to plot.",
      example: "COUNT(*) AS order_count",
    },
    {
      command: "ORDER BY",
      summary:
        "Sorting reorders the bars — a sorted chart reads like a ranking.",
      example: "ORDER BY order_count DESC",
    },
    {
      command: "Choosing a chart",
      summary:
        "Bar = compare categories. Line = change over time. Pie = parts of one whole. Match the chart to the question.",
      example: "Bar chart → most popular item",
    },
    {
      command: "Read it honestly",
      summary:
        "Always check the axis labels and where the scale starts. Cropping the y-axis or hiding rows can make a small difference look huge.",
      example: "Y-axis should usually start at 0",
    },
  ],
  kidExplain: [
    {
      title: "Label + number",
      text: "Every chart pairs a label (item) with a number (how many orders). That's your x and y.",
    },
    {
      title: "Group to get bars",
      text: "GROUP BY item gives one row — and one bar — per item.",
    },
    {
      title: "Sorting tells a story",
      text: "Sorting the number column turns a plain chart into a clear ranking.",
    },
    {
      title: "Match the chart to the question",
      text: "Use a bar chart to compare categories, a line chart for change over time, and a pie chart for parts of one whole. The right chart makes the answer obvious.",
    },
    {
      title: "Charts can mislead",
      text: "The same numbers can tell different stories. Cropping the y-axis, sorting, or showing only the top few rows changes what people notice — so read axes and labels carefully.",
    },
  ],
  steps: [
    "Build a chartable query: item + order_count.",
    "Sort the bars from most to fewest.",
    "Show only the top 3 items.",
    "Challenge: write the full chart-ready query yourself.",
  ],
  cfu: [],
  tryThis: [
    "Change DESC to ASC and watch the bars flip.",
    "Try grouping by something else to chart a different story.",
    "Show only the top 3 with LIMIT, then remove it. How does hiding rows change the story the chart tells?",
    "Would this data be clearer as a pie chart (each item's share of all orders)? Why or why not?",
  ],
  dataEthicsMoment:
    "Charts persuade. Truncating an axis or cherry-picking bars can mislead — show the full, honest picture.",
  exercises: [
    {
      id: "ex-chartable",
      title: "Exercise 1 — Make it chartable",
      focusCommand: "GROUP BY + AS",
      commandExplain:
        "Group by item and count each group as order_count. Two columns — a label and a number — so a bar chart appears.",
      goal: "SELECT item, COUNT(*) AS order_count FROM lunch_orders GROUP BY item;",
      starterSql: `SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY ;`,
      hint: "Type item after GROUP BY, then Run & check to see the chart.",
      successMessage: "There's your chart! One bar per item.",
      failureMessage:
        "Use COUNT(*) AS order_count and GROUP BY item. Expect 6 rows + a chart.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bcount\s*\(\s*\*\s*\)\s+as\s+order_count\b/.test(n)) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 6 &&
            result.columns.map((c) => c.toLowerCase()).includes("order_count")
        );
      },
    },
    {
      id: "ex-sorted",
      title: "Exercise 2 — Sort the bars",
      focusCommand: "ORDER BY",
      commandExplain:
        "Sort by order_count DESC so the tallest bars come first — now the chart reads like a ranking.",
      goal: "Add ORDER BY order_count DESC.",
      starterSql: `SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY item
ORDER BY order_count ;`,
      hint: "Type DESC after order_count.",
      successMessage: "Now the story is clear — most popular items lead.",
      failureMessage:
        "Use ORDER BY order_count DESC. Expect 6 sorted rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\border\s+by\s+order_count\s+desc\b/.test(n)) return false;
        if (!result || result.rowCount !== 6) return false;
        const idx = result.columns
          .map((c) => c.toLowerCase())
          .indexOf("order_count");
        if (idx < 0) return false;
        return Number(result.values[0][idx]) === 2;
      },
    },
    {
      id: "ex-top3",
      title: "Exercise 3 — Top 3 only",
      focusCommand: "ORDER BY + LIMIT",
      commandExplain:
        "Sometimes a focused chart is stronger. LIMIT 3 keeps only the top three bars.",
      goal: "Add LIMIT 3 to the sorted, grouped query.",
      starterSql: `SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY item
ORDER BY order_count DESC
LIMIT ;`,
      hint: "Type 3 after LIMIT.",
      successMessage: "Crisp! A focused top-3 chart.",
      failureMessage:
        "Use LIMIT 3 on the sorted query. Expect exactly 3 bars.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\border\s+by\s+order_count\s+desc\b/.test(n)) return false;
        if (!/\blimit\s+3\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 3);
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Build it yourself",
      focusCommand: "GROUP BY + AS + ORDER BY",
      commandExplain:
        "Write the whole chart-ready query: one label, one named number, grouped and sorted high to low.",
      goal: "Full query: item, COUNT(*) AS order_count, grouped, sorted DESC.",
      starterSql: `-- Build a chart-ready query of orders per item, most popular first:
SELECT 
FROM lunch_orders
GROUP BY 
ORDER BY ;`,
      hint: "SELECT item, COUNT(*) AS order_count ... GROUP BY item ORDER BY order_count DESC;",
      successMessage: "You built a chart from scratch — label, number, sorted. That's data storytelling!",
      failureMessage:
        "Need item, COUNT(*) AS order_count, GROUP BY item, ORDER BY order_count DESC. Expect 6 rows.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+item\s*,\s*count\s*\(\s*\*\s*\)\s+as\s+order_count\b/.test(n))
          return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        if (!/\border\s+by\s+order_count\s+desc\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 6 &&
            result.columns.map((c) => c.toLowerCase()).includes("order_count")
        );
      },
    },
  ],
};

export default function DataLesson9Page() {
  return <DataLessonCanvas lesson={daLesson9} />;
}
