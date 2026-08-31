import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";
import { firstCellNumber, LUNCH_ORDERS_SEED, normSql } from "@/lib/dataLessonHelpers";

export const daLesson10: DataLessonConfig = {
  id: "da-10",
  title: "10. Parts of a Whole",
  goal: "Use a pie chart to show how each item is a slice of all the orders — and learn when a pie helps and when it misleads.",
  xpReward: 500,
  badge: "Slice Master",
  previewTable: "lunch_orders",
  seedData: LUNCH_ORDERS_SEED,
  prevHref: "/learn/data/9",
  nextHref: "/learn/data/11",
  dashboardHref: "/dashboard",
  chartConfig: {
    type: "pie",
    xKey: "item",
    yKey: "order_count",
    title: "Each item's share of all orders",
  },
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson you compared categories with a bar chart. Today you'll answer a *different* kind of question with a **pie chart**: not "which is biggest?" but **"how is the whole thing split up?"**\n\nHere's your roadmap:\n\n• **What a pie chart really shows** — parts of one whole.\n• **How to read** slices as shares of 100%.\n• **When a pie helps** and the surprisingly common cases where it lies.\n• A **worked example** reading a real pie before you build your own.\n\nThink about your phone's screen-time report: it slices your day into TikTok, games, messages, and more. You're not asking "which app has the most minutes in the universe?" — you're asking "what share of *my* day went where?" That's the pie chart's exact job.`,
        image: "/images/lessons/lesson-pie.png",
        imageAlt: "A laptop showing a pie chart of quarterly sales contribution split into four slices",
        callout: {
          label: "Why it matters",
          text: "Budgets (where your money goes), phone screen-time breakdowns, battery usage, and election seat shares are all pie charts — anywhere one whole gets divided into shares.",
        },
      },
      {
        id: "hook",
        kicker: "Real-world hook",
        title: "Your phone already shows you a pie chart weekly",
        body: `Check your phone's screen-time report. It doesn't tell you "you used Messages 45 minutes" as a lonely fact — it shows that 45 minutes as a **slice** of your entire day, next to slices for games, social media, and everything else.\n\nThat's a pie chart doing its exact job: not comparing apps to some external benchmark, but showing how *your one day* got divided up.`,
        callout: {
          label: "Notice it",
          text: "Next time you see a budget breakdown or screen-time report, check: do the slices actually add up to one meaningful whole (a full day, a full budget)?",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "New words for this lesson",
        body: `A few terms will make today's ideas click faster.`,
        bullets: [
          "**Slice / wedge** — one piece of a pie chart, representing one category's share.",
          "**Whole** — the total that all slices must add up to (100%).",
          "**Share / proportion** — a part's size relative to the whole.",
          "**3-D tilt** — a visual trick that distorts slice sizes and should generally be avoided.",
        ],
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "A pie chart shows parts of one whole",
        body: `A **pie chart** is a circle cut into slices. The whole circle is **100%** of something, and each slice is one part's **share** of that whole.\n\nThe perfect mental picture is an actual pizza. The whole pizza is everything; each slice is a fraction of it; and all the slices together always add back up to one complete pizza. If your data doesn't work like that — if the parts don't sum to a meaningful whole — a pie is the wrong tool.\n\nUse a pie when you want to answer: *"Out of everything, how much is each piece?"* Examples: how a budget is split, or what share of all lunch orders each item makes up. The question is about **proportion**, not raw comparison.`,
        checkIn: {
          prompt: "What must be true for a pie chart to make sense?",
          choices: [
            "The slices must all be the same size",
            "There must be at least 10 slices",
            "The slices must add up to one meaningful whole",
          ],
          correctIndex: 2,
          explanation: "A pie chart only makes sense when every slice is a genuine part of the same total — otherwise the \"100%\" framing is meaningless.",
        },
      },
      {
        id: "concept-2",
        kicker: "How to read it",
        title: "Slices add up to the whole",
        body: `This is the pie you'll build from \`lunch_orders\`. Read it in three parts:\n\n• Each **slice** is one **item** (the label).\n• The **size** of the slice is that item's **count** (the number).\n• All the slices together make **one whole** — every order appears in exactly one slice.\n\nA bigger slice means a bigger share. Here Pizza slice takes the widest wedge (5 of 20 = 25%), Salad is next (4 of 20 = 20%), and smaller items take thinner slices. Your eye reads "share of the total" automatically.`,
        chart: {
          config: { type: "pie", xKey: "item", yKey: "order_count", title: "Each item's share of all orders" },
          result: {
            columns: ["item", "order_count"],
            values: [
              ["Pizza slice", 5],
              ["Salad", 4],
              ["Chicken wrap", 3],
              ["Burger", 3],
              ["Fruit cup", 3],
              ["Yogurt parfait", 2],
            ],
            rowCount: 6,
          },
        },
        checkIn: {
          prompt: "In the chart above, Pizza slice has 5 orders out of 20 total. What share is that?",
          choices: ["10% each", "25% each", "50% each"],
          correctIndex: 1,
          explanation: "5 out of 20 orders is one-quarter of the total, which is 25% — that's why the Pizza slice is the widest wedge.",
        },
      },
      {
        id: "concept-3",
        kicker: "Choose wisely",
        title: "When a pie works — and when it lies",
        body: `Pie charts are the most *misused* chart there is, so use them carefully. The trouble is that human eyes are bad at comparing the sizes of wedges — we're much better at comparing bar heights.`,
        bullets: [
          "**Use a pie** for 2–6 parts that add up to one whole (shares of a total).",
          "**Avoid a pie** when slices don't add up to a whole — use a bar chart to compare instead.",
          "**Avoid a pie** with many tiny slices — they're impossible to compare by eye.",
        ],
        checkIn: {
          prompt: "You have 15 nearly-equal categories to show. Is a pie chart a good choice?",
          choices: [
            "Yes, but only if it's 3-D",
            "Yes, more slices always means more detail",
            "No — with that many similar-sized slices, a sorted bar chart is much easier to read",
          ],
          correctIndex: 2,
          explanation: "Human eyes struggle to compare many similarly-sized wedges. A sorted bar chart makes the ranking obvious where a crowded pie would not.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Read a pie before you build one",
        body: `Let's read a finished pie together. Imagine you tracked how you spent one **24-hour day**, and the counts below are hours. Because the parts add up to a whole day, a pie is the right call.\n\n**Step 1 — confirm it's a whole:** 8 + 7 + 4 + 3 + 2 = 24 hours. Good, the slices sum to the full day. **Step 2 — find the biggest share:** Sleep at 8 hours is the largest wedge — exactly one-third of the circle. **Step 3 — read a small share:** Gaming at 2 hours is a thin slice, about 8% of the day.\n\nThat's the whole skill: a slice's size *is* its share of the total. To build this pie from a query, you'd produce the same two columns — a label (activity) and a number (hours).`,
        table: {
          columns: ["activity", "hours"],
          values: [
            ["Sleep", 8],
            ["School", 7],
            ["Free time", 4],
            ["Homework", 3],
            ["Gaming", 2],
          ],
          rowCount: 5,
        },
        callout: {
          label: "Pro tip",
          text: "Before choosing a pie, add up your numbers. If the total is a meaningful whole (a full day, all orders, the entire budget), a pie fits. If not, reach for a bar chart.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "More slices ≠ a better pie",
        body: `More slices does *not* mean a better pie. With 8+ near-equal wedges, nobody can tell which is biggest — a sorted bar chart would be clearer. And a 3-D tilt that puffs up the front slice is a classic way charts fool people. Keep pies flat, simple, and few.`,
        checkIn: {
          prompt: "Why should you generally avoid 3-D pie charts?",
          choices: [
            "They can only show 2 slices — familiar wording, wrong fit for what the prompt is actually asking",
            "The tilt visually distorts slice sizes, making some look bigger or smaller than their real share",
            "A rushed pass can land on they take longer to load”; careful readers reject it for this problem",
          ],
          correctIndex: 1,
          explanation: "The 3-D perspective exaggerates the front slices and shrinks the back ones visually, even though the underlying numbers haven't changed — a classic misleading chart trick.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Check the whole before you trust the pie",
        body: `Before the exercises, practice the habit: for any pie you're about to build, add up the numbers first and ask "does this total mean something real?" For \`lunch_orders\`, the total is every order placed — a meaningful whole. Predict what that total will be before you query \`COUNT(*)\`.`,
      },
      {
        id: "deeper-skill",
        kicker: "Go one level deeper",
        title: "The same query powers a bar OR a pie",
        body: `Notice something powerful: the exact same SQL query — \`SELECT item, COUNT(*) AS order_count FROM lunch_orders GROUP BY item;\` — can feed either a bar chart or a pie chart. The data doesn't decide the chart type; **you** do, based on the question you're asking (compare amounts vs. show shares of a whole).`,
      },
      {
        id: "comparison",
        kicker: "Compare & contrast",
        title: "Bar chart vs. pie chart, side by side",
        body: `You'll use the same lunch_orders data both lessons — but the question changes the right chart.`,
        bullets: [
          "**Bar chart (Lesson 9)** — \"Which item is most popular?\" A comparison question.",
          "**Pie chart (this lesson)** — \"What share of all orders does each item represent?\" A proportion question.",
          "Same query shape (label + number), different question, different chart.",
        ],
        checkIn: {
          prompt: "Your question is 'What percentage of our budget goes to snacks?' Which chart fits best?",
          choices: ["Bar chart", "Pie chart", "Neither — this can't be charted"],
          correctIndex: 1,
          explanation: "\"Percentage of budget\" is explicitly a share-of-a-whole question — exactly what a pie chart is built to show.",
        },
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "A tilted pie can tilt the truth",
        body: `Pie charts can mislead when slices don't add up to one whole, or when a 3-D tilt makes the front slice look bigger. Keep it flat and make sure the parts sum to 100%. When you present a pie, double-check both the math (do the parts sum correctly?) and the visual honesty (is anything distorted?).`,
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "Add up the numbers before you chart them",
        body: `Before building any pie chart, manually add up your category totals. If they don't sum to something meaningful, stop — a pie chart is the wrong tool, and reaching for a bar chart instead will serve your audience better.`,
      },
      {
        id: "reflection",
        kicker: "Reflection",
        title: "Would your own data make a good pie?",
        body: `Think of a set of numbers from your own life — allowance spending categories, hours in your week, points scored per teammate. Do they add up to a meaningful whole? Would a pie chart actually help someone understand them, or would a bar chart tell the story better?`,
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "The class fundraiser's expense report",
        body: `A class fundraiser tracked expenses in a table \`expenses\` with columns \`category\` and \`amount\`. The treasurer wants to show parents "where the money went" — decorations, snacks, prizes, supplies.\n\nIs a pie chart appropriate here? What would you check first before building it?`,
        callout: {
          label: "Apply it",
          text: "SELECT category, SUM(amount) AS total FROM expenses GROUP BY category; — then confirm the totals sum to the whole fundraiser budget before charting as a pie.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you dive in",
        body: `Let's confirm the whole-vs-share concept is locked in.`,
        checkIn: {
          prompt: "Your data is 'average temperature in 5 cities.' Is a pie chart appropriate?",
          choices: [
            "Yes, but only if all 5 cities have the same temperature",
            "No — temperatures don't add up to a meaningful whole, so a bar chart fits better",
            "Yes, any 5 numbers can be a pie",
          ],
          correctIndex: 1,
          explanation: "Temperatures are independent measurements, not parts of one total — summing them wouldn't mean anything. A bar chart compares them honestly instead.",
        },
      },
      {
        id: "pie-query-walkthrough",
        kicker: "Query walkthrough",
        title: "From raw orders to pie-ready slices",
        body: `A pie chart needs counts that represent **parts of one whole**. This query groups all twenty lunch orders by item and counts each — the numbers should sum to 20 (the total orders), and each slice is one item's share.\n\nBefore charting, verify: do the counts add up? 5 + 4 + 3 + 3 + 3 + 2 = 20. If your counts don't match the whole, the pie slices won't either.`,
        code: `SELECT item,\n       COUNT(*) AS order_count\nFROM lunch_orders\nGROUP BY item;`,
        codeCaption: "Six slices, twenty orders total",
        table: {
          columns: ["item", "order_count"],
          values: [
            ["Pizza slice", 5],
            ["Salad", 4],
            ["Chicken wrap", 3],
            ["Burger", 3],
            ["Fruit cup", 3],
            ["Yogurt parfait", 2],
          ],
          rowCount: 6,
        },
      },
      {
        id: "whole-check",
        kicker: "Analyst habits",
        title: "Always verify the total before charting a pie",
        body: `Run \`SELECT COUNT(*) AS total_orders FROM lunch_orders;\` alongside your grouped query. If the grouped counts sum to that total, your pie represents the full whole. If they don't — maybe you filtered with \`WHERE\` first — your pie shows only a partial picture and needs a label saying so.\n\nA pie that silently omits 40% of the data is one of the fastest ways to mislead an audience.`,
        code: `SELECT COUNT(*) AS total_orders\nFROM lunch_orders;`,
        codeCaption: "The whole you're dividing into slices",
        table: {
          columns: ["total_orders"],
          values: [[20]],
          rowCount: 1,
        },
      },
      {
        id: "pie-mistake-too-many-slices",
        kicker: "Common SQL mistake",
        title: "Too many slices make pies unreadable",
        body: `If \`GROUP BY item\` returns 15 different items, a pie chart becomes a rainbow of tiny, indistinguishable slivers. The fix isn't a fancier chart — it's a different chart type.\n\nWhen you have more than about six categories, switch to a **bar chart** sorted by count. Bars handle many categories gracefully; pies do not. Choosing the wrong chart type is an analyst mistake, not a SQL bug.`,
        checkIn: {
          prompt: "Your GROUP BY returns 12 categories. What's the honest choice?",
          choices: ["Use a pie anyway — more slices look impressive", "Use a sorted bar chart instead", "Combine all 12 into one slice called 'Other' without explaining"],
          correctIndex: 1,
          explanation: "Twelve pie slices are nearly impossible to compare by eye. A bar chart sorted by value lets readers compare all twelve categories clearly.",
        },
      },
      {
        id: "lunch-pie-second-example",
        kicker: "Second example",
        title: "Reading slice shares on lunch_orders",
        body: `With 20 total orders, Pizza slice's 5 orders = 25% of the whole. Salad is 20%. The remaining items share the rest.\n\nWhen you read a pie, translate slices into **percentages of the total**, not just "big" or "small." Equal slices mean equal share — even if one label is longer than the other.`,
        bullets: [
          "Pizza slice: 5/20 = 25%",
          "Salad: 4/20 = 20%",
          "Smaller items: 3/20 or 2/20 each",
        ],
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You now know a pie shows **parts of one whole**, how to read slices as shares, and the traps that make pies mislead. You also know the query shape: a label + a number, plus a check on the total.\n\nIn the exercises you'll build the pie-ready query, find the whole, and decide when a pie is the honest choice.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  instructorScript: `**Coach's note**:
A bar chart compares categories. A **pie chart** answers a different question: *what share of the whole is each part?*

A pie needs the same two columns as a bar chart:
1. A **label** column (the slices) → **item**
2. A **number** column (the slice sizes) → **order_count**

Because every slice is a piece of one whole, the numbers should **add up to a meaningful total** (here, all the orders).

**When a pie works:** a few parts (2–6) that together make 100%.
**When a pie misleads:** too many tiny slices, or parts that don't add up to one whole. Then a bar chart is clearer.`,
  commandReference: [
    {
      command: "GROUP BY + COUNT",
      summary: "Count the orders for each item so every slice gets a size.",
      example: "SELECT item, COUNT(*) AS order_count ... GROUP BY item",
    },
    {
      command: "Pie = parts of a whole",
      summary: "Use a pie only when the slices add up to one meaningful total (all orders).",
      example: "Each item's share of every order",
    },
    {
      command: "The whole",
      summary: "The total of all slices. Knowing the whole lets you read each slice as a share.",
      example: "SELECT COUNT(*) AS total_orders FROM lunch_orders",
    },
    {
      command: "Bar vs. pie",
      summary: "Comparing sizes? Use a bar. Showing shares of one whole? Use a pie.",
      example: "6+ slices → switch to a bar chart",
    },
  ],
  kidExplain: [
    {
      title: "A pie is one whole",
      text: "The full circle is 100% of the orders. Each slice is one item's share of that whole.",
    },
    {
      title: "Same shape as a bar query",
      text: "A pie needs a label (item) and a number (order_count) — exactly like a bar chart. Only the picture changes.",
    },
    {
      title: "When NOT to use a pie",
      text: "Too many slices or parts that don't sum to one whole make a pie hard to read. Then a bar chart tells the story better.",
    },
  ],
  steps: [
    "Count orders per item so each slice has a size.",
    "Check the whole — how many orders are there in total?",
    "Build the pie-ready query yourself.",
  ],
  cfu: [
    {
      question: "What does a pie chart claim about the data?",
      answer:
        "That the slices add up to one whole (100%) — each slice is a part of that total.",
    },
    {
      question: "When is a pie chart a bad choice?",
      answer:
        "When there are many tiny slices, when categories don’t form one whole, or when you need precise comparisons — a bar chart is often clearer.",
    },
    {
      question: "How can a pie chart mislead even with correct numbers?",
      answer:
        "Design choices (3D effects, too many slices, unclear labels) make sizes hard to compare, so readers can misread the story.",
    },
  ],
  tryThis: [
    "Imagine 20 different items. Would a pie still be readable? Why might a bar chart win?",
    "Which two items together make up the biggest share of the pie?",
  ],
  dataEthicsMoment:
    "Pie charts can mislead when slices don't add up to one whole, or when a 3-D tilt makes the front slice look bigger. Keep it flat and make sure the parts sum to 100%.",
  exercises: [
    {
      id: "ex-slices",
      title: "Exercise 1 — Give each slice a size",
      focusCommand: "GROUP BY + COUNT",
      commandExplain:
        "Count the orders for each item. Two columns — item and order_count — and a pie chart appears.",
      goal: "SELECT item, COUNT(*) AS order_count FROM lunch_orders GROUP BY item;",
      starterSql: `SELECT item, COUNT(*) AS order_count
FROM lunch_orders
GROUP BY ;`,
      hint: "Type item after GROUP BY, then Run & check to see the pie.",
      successMessage: "There's your pie! Each item is a slice of all the orders.",
      failureMessage:
        "Use COUNT(*) AS order_count and GROUP BY item. Expect 6 rows + a pie.",
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
      id: "ex-whole",
      title: "Exercise 2 — Find the whole",
      focusCommand: "COUNT(*)",
      commandExplain:
        "A pie only makes sense if you know the whole. Count every order — that total is the full circle.",
      goal: "SELECT COUNT(*) AS total_orders FROM lunch_orders;",
      starterSql: `SELECT COUNT(*) AS total_orders
FROM ;`,
      hint: "Type lunch_orders after FROM.",
      successMessage: "20 orders in total — that's the whole pie.",
      failureMessage: "Use COUNT(*) AS total_orders FROM lunch_orders. Expect 1 row showing 20.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bcount\s*\(\s*\*\s*\)\s+as\s+total_orders\b/.test(n)) return false;
        if (!/\bfrom\s+lunch_orders\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 1 && firstCellNumber(result) === 20);
      },
    },
    {
      id: "ex-build",
      title: "Exercise 3 — Build the pie yourself",
      focusCommand: "GROUP BY + AS",
      commandExplain:
        "Write the whole pie-ready query: a label (item) and a named number (order_count), grouped per item.",
      goal: "Full query: item, COUNT(*) AS order_count, grouped by item.",
      starterSql: `-- Build a pie-ready query of each item's share of all orders:
SELECT 
FROM lunch_orders
GROUP BY ;`,
      hint: "SELECT item, COUNT(*) AS order_count ... GROUP BY item;",
      successMessage: "You built a pie from scratch — label, number, one whole. Slice Master!",
      failureMessage:
        "Need item, COUNT(*) AS order_count, GROUP BY item. Expect 6 rows + a pie.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+item\s*,\s*count\s*\(\s*\*\s*\)\s+as\s+order_count\b/.test(n))
          return false;
        if (!/\bgroup\s+by\s+item\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 6 &&
            result.columns.map((c) => c.toLowerCase()).includes("order_count")
        );
      },
    },
  ],
};

