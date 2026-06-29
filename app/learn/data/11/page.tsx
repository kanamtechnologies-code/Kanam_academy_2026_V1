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
  badge: "📉 Trend Spotter",
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
    durationLabel: "~4 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "A line chart shows change over time",
        body: `A **line chart** connects dots in order to show how a number **goes up and down over time**.\n\nUse it whenever your x-axis is **time** — days, weeks, months, years. The line lets you spot the **trend**: is it rising, falling, or bouncing around?`,
        image: "/images/lessons/lesson-line.png",
        imageAlt: "A tablet showing a line chart of sales rising then dipping across four quarters",
        callout: {
          label: "Where you see it",
          text: "Weather apps (temperature this week), fitness trackers (steps per day), and stock and video-view graphs are all line charts.",
        },
      },
      {
        id: "anatomy",
        kicker: "How to read it",
        title: "Time runs left to right",
        body: `Here's the line you'll build — one week of cafeteria orders. Notice:\n\n• The **x-axis** (bottom) is **time**: Monday → Sunday, in order.\n• The **y-axis** shows the **number** of orders.\n• The line **rises** toward Friday's **peak**, then **dips** on the weekend.\n\nFollowing the line tells the story at a glance.`,
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
        body: `The key question: *is my x-axis time?*`,
        bullets: [
          "**Use a line** when the x-axis is time and you care about the trend.",
          "**Use a bar** instead for separate categories that aren't in time order.",
          "**Always sort by time** (`ORDER BY day_num`) so the line reads left to right.",
        ],
        callout: {
          label: "Charts can mislead",
          text: "If the days are out of order, or the y-axis is stretched, a tiny change can look like a huge spike. Keep time in order and check the scale.",
        },
      },
      {
        id: "data",
        kicker: "Your dataset",
        title: "The data you'll use: daily_orders",
        body: `The **daily_orders** table has one row per day. **day_num** keeps the days in order (Mon = 1 … Sun = 7), **weekday** is the label, and **orders** is the number the line follows.`,
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
        id: "ready",
        kicker: "Ready",
        title: "Now you try it",
        body: `In the exercises you'll order the days by time to draw an honest trend line, then find the busiest day.\n\nClick **Start the exercises** when you're ready.`,
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
