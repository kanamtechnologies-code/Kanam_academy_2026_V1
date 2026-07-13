"use client";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import { normSql, WEEKLY_ORDERS_SEED } from "@/lib/dataLessonHelpers";

const daLesson11: DataLessonConfig = {
  id: "da-11",
  title: "11. Change Over Time",
  goal: "Use a line chart to show how a number changes over time — and read the trend, peaks, and dips across a week.",
  xpReward: 550,
  badge: "Trend Spotter",
  previewTable: "daily_orders",
  seedData: WEEKLY_ORDERS_SEED,
  prevHref: "/learn/data/10",
  nextHref: "/learn/data/12",
  dashboardHref: "/dashboard",
  chartConfig: {
    type: "line",
    xKey: "weekday",
    yKey: "orders",
    title: "Orders per day this week",
  },
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Bar charts compare categories. Pie charts split a whole. Today you'll master the chart that shows **change** — the **line chart** — and learn to read a story that moves through time.\n\nHere's your roadmap:\n\n• **What a line chart shows** — a number rising and falling over time.\n• **How to read** trends, peaks, and dips by following the line.\n• **When** a line is the right choice (hint: it's all about the x-axis).\n• A **worked example** reading a real weekly trend before you build your own.\n\nThink of the graph in a weather app showing this week's temperatures, or your fitness tracker's daily-steps line, or the view count climbing on a video that's going viral. All of those are line charts, and they all answer the same question: *which way is this heading?*`,
        image: "/images/lessons/lesson-line.png",
        imageAlt: "A tablet showing a line chart of sales rising then dipping across four quarters",
        callout: {
          label: "Why it matters",
          text: "Weather apps (temperature this week), fitness trackers (steps per day), and stock and video-view graphs are all line charts — anywhere you track how something changes over time.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "A line chart shows change over time",
        body: `A **line chart** connects dots in order to show how a number **goes up and down over time**.\n\nThe connecting line is the secret sauce. With separate bars, your eye has to hop from one to the next; with a line, the *slope* does the work — a steep upward line screams "growing fast," a downward slope says "dropping." You read direction instantly, the way you'd read a hiking trail going uphill or down.\n\nUse a line chart whenever your x-axis is **time** — days, weeks, months, years. It lets you spot the **trend**: is the number rising, falling, or bouncing around? That's a question a bar chart simply can't answer as clearly.`,
        callout: {
          label: "Common misconception",
          text: "A line chart is only honest when the x-axis is *ordered* — usually time. Don't connect dots across unordered categories like \"pizza, salad, burger\"; the rising-and-falling line would imply a trend that doesn't exist. For unordered categories, use a bar chart.",
        },
      },
      {
        id: "anatomy",
        kicker: "How to read it",
        title: "Time runs left to right",
        body: `Here's the line you'll build — one week of cafeteria orders. Read it in three parts:\n\n• The **x-axis** (bottom) is **time**: Monday → Sunday, always in order.\n• The **y-axis** shows the **number** of orders.\n• The **shape of the line** is the story: it climbs steadily to Friday's **peak** (80 orders), then **drops** hard over the weekend.\n\nFollowing the line, you instantly see the school-week build-up and the weekend slump — no number-crunching needed. That's the power of plotting time left to right.`,
        chart: {
          config: { type: "line", xKey: "weekday", yKey: "orders", title: "Orders per day this week" },
          result: {
            columns: ["weekday", "orders"],
            values: [
              ["Mon", 42],
              ["Tue", 55],
              ["Wed", 48],
              ["Thu", 63],
              ["Fri", 80],
              ["Sat", 30],
              ["Sun", 25],
            ],
            rowCount: 7,
          },
        },
      },
      {
        id: "when",
        kicker: "Choose wisely",
        title: "When to use a line chart",
        body: `The key question is simple: *is my x-axis time?* If yes, a line chart is almost always your best friend. If no, reach for something else.`,
        bullets: [
          "**Use a line** when the x-axis is time and you care about the trend.",
          "**Use a bar** instead for separate categories that aren't in time order.",
          "**Always sort by time** (`ORDER BY day_num`) so the line reads left to right.",
        ],
        callout: {
          label: "Common misconception",
          text: "People assume any line chart is trustworthy. But if the days are out of order, or the y-axis is stretched (or doesn't start at zero), a tiny change can look like a giant spike. Keep time in order and always check the scale.",
        },
      },
      {
        id: "data",
        kicker: "Your dataset",
        title: "The data you'll use: daily_orders",
        body: `The **daily_orders** table has one row per day (sample rows below). Three columns matter:\n\n• **day_num** — a number (Mon = 1 … Sun = 7) that keeps the days in the *correct* order. This is the unsung hero: sorting by it guarantees an honest line.\n• **weekday** — the label shown on the x-axis.\n• **orders** — the number the line follows up and down.`,
        table: {
          columns: ["day_num", "weekday", "orders"],
          values: [
            [1, "Mon", 42],
            [2, "Tue", 55],
            [3, "Wed", 48],
            [4, "Thu", 63],
          ],
          rowCount: 4,
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Read a trend before you build one",
        body: `Let's read a real line together. Imagine you tracked the **daily views** on a video you posted, for five days after it went live.\n\n**Step 1 — read left to right (in time order):** views climb 120 → 340 → 900, then keep rising. **Step 2 — spot the trend:** the line goes up every single day — this video is *gaining momentum*. **Step 3 — find the steepest jump:** from Day 2 to Day 3 (340 → 900) is the biggest leap, the moment it started catching on.\n\nNotice how the *slope* told the story instantly. To build this chart from a query, you'd return a time label (day) and a number (views), sorted by day so the line never zig-zags backward.`,
        table: {
          columns: ["day", "views"],
          values: [
            ["Day 1", 120],
            ["Day 2", 340],
            ["Day 3", 900],
            ["Day 4", 1500],
            ["Day 5", 2100],
          ],
          rowCount: 5,
        },
        callout: {
          label: "Pro tip",
          text: "Always sort by the time column, not the label's alphabet. Sorting weekdays alphabetically would put Fri before Mon and scramble the trend into nonsense — `ORDER BY day_num` keeps time honest. To find the **busiest single day**, sort by the number instead: `ORDER BY orders DESC LIMIT 1`.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You now know a line chart shows **change over time**, how to read its slope for the trend, and the golden rule: keep time in order. The line is only as honest as its sorting.\n\nIn the exercises you'll order the days by time to draw an accurate trend line, then find the busiest day.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  instructorScript: `**Coach's note**:
A **line chart** is the right choice when your x-axis is **time** — days, weeks, months. The line connects the dots so you can see the **trend**: is it going up, down, or bouncing around?

Our table \`daily_orders\` has one row per day:
- **day_num** → puts the days in the right order (Mon = 1 … Sun = 7)
- **weekday** → the label on the x-axis
- **orders** → the number the line follows

**The key move:** always \`ORDER BY day_num\` so time runs left-to-right. A line chart with shuffled days tells a false story.`,
  commandReference: [
    {
      command: "ORDER BY day_num",
      summary: "Sort by time so the line reads left-to-right. This is what makes it a trend.",
      example: "ORDER BY day_num",
    },
    {
      command: "Line = change over time",
      summary: "Use a line when the x-axis is time. Use a bar when the x-axis is separate categories.",
      example: "weekday (time) → line chart",
    },
    {
      command: "Peak & dip",
      summary: "ORDER BY orders DESC LIMIT 1 finds the busiest day; the line shows it as the highest point.",
      example: "ORDER BY orders DESC LIMIT 1",
    },
  ],
  kidExplain: [
    {
      title: "Time goes left to right",
      text: "On a line chart the x-axis is time. Sorting by day_num keeps Monday→Sunday in order so the trend is honest.",
    },
    {
      title: "The line shows the trend",
      text: "Connecting the dots makes it easy to see growth, decline, and the busy spike on Friday.",
    },
    {
      title: "Line vs. bar",
      text: "Line = how something changes over time. Bar = comparing separate categories. Pick the chart that matches the question.",
    },
  ],
  steps: [
    "List each day with its orders, in time order.",
    "Find the busiest day.",
    "Build the time-ordered query yourself.",
  ],
  cfu: [],
  tryThis: [
    "What happens to the line if you ORDER BY weekday (alphabetical) instead of day_num?",
    "Which two days would you staff up for, based on the trend?",
  ],
  dataEthicsMoment:
    "Line charts can mislead if the time steps are uneven or the y-axis doesn't start at zero. A small rise can be made to look like a huge spike — always check the axis.",
  exercises: [
    {
      id: "ex-overtime",
      title: "Exercise 1 — Orders in time order",
      focusCommand: "ORDER BY day_num",
      commandExplain:
        "Show each weekday and its order count, sorted by day_num so the line runs Monday to Sunday.",
      goal: "SELECT weekday, orders FROM daily_orders ORDER BY day_num;",
      starterSql: `SELECT weekday, orders
FROM daily_orders
ORDER BY ;`,
      hint: "Type day_num after ORDER BY, then Run & check to see the line.",
      successMessage: "There's your trend line — 7 days, left to right.",
      failureMessage:
        "Use SELECT weekday, orders ... ORDER BY day_num. Expect 7 rows + a line.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+weekday\s*,\s*orders\b/.test(n)) return false;
        if (!/\border\s+by\s+day_num\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 7 &&
            result.columns.map((c) => c.toLowerCase()).includes("orders")
        );
      },
    },
    {
      id: "ex-peak",
      title: "Exercise 2 — Find the busiest day",
      focusCommand: "ORDER BY ... DESC LIMIT 1",
      commandExplain:
        "Sort by orders from high to low and keep just the top row to find the single busiest day.",
      goal: "SELECT weekday, orders FROM daily_orders ORDER BY orders DESC LIMIT 1;",
      starterSql: `SELECT weekday, orders
FROM daily_orders
ORDER BY orders DESC
LIMIT ;`,
      hint: "Type 1 after LIMIT.",
      successMessage: "Friday is the peak at 80 orders — the top of the line.",
      failureMessage:
        "Use ORDER BY orders DESC LIMIT 1. Expect exactly 1 row.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\border\s+by\s+orders\s+desc\b/.test(n)) return false;
        if (!/\blimit\s+1\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 1);
      },
    },
    {
      id: "ex-build",
      title: "Exercise 3 — Build the trend yourself",
      focusCommand: "SELECT + ORDER BY",
      commandExplain:
        "Write the whole time-series query: weekday and orders, sorted by day_num so time runs left to right.",
      goal: "Full query: weekday, orders, ordered by day_num.",
      starterSql: `-- Show the week's order trend, in day order:
SELECT 
FROM daily_orders
ORDER BY ;`,
      hint: "SELECT weekday, orders ... ORDER BY day_num;",
      successMessage: "You built a trend line from scratch — Trend Spotter!",
      failureMessage:
        "Need SELECT weekday, orders, ORDER BY day_num. Expect 7 rows + a line.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+weekday\s*,\s*orders\b/.test(n)) return false;
        if (!/\border\s+by\s+day_num\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 7 &&
            result.columns.map((c) => c.toLowerCase()).includes("orders")
        );
      },
    },
  ],
};

export default function DataLesson11Page() {
  return <DataLessonCanvas lesson={daLesson11} />;
}
