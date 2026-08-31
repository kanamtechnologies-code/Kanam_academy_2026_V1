import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";
import { normSql, WEEKLY_ORDERS_SEED } from "@/lib/dataLessonHelpers";

export const daLesson11: DataLessonConfig = {
  id: "da-11",
  title: "11. Change Over Time",
  goal: "Use a line chart to show how a number changes over time — and read the trend, peaks, and dips across two weeks.",
  xpReward: 550,
  badge: "Trend Spotter",
  previewTable: "daily_orders",
  seedData: WEEKLY_ORDERS_SEED,
  prevHref: "/learn/data/10",
  nextHref: "/learn/data/12",
  dashboardHref: "/dashboard",
  chartConfig: {
    type: "line",
    xKey: "day_num",
    yKey: "orders",
    title: "Orders per day (two weeks)",
  },
  lessonModule: {
    durationLabel: "~20–25 min lesson",
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
        id: "hook",
        kicker: "Real-world hook",
        title: "The moment a video 'goes viral' is a line's slope",
        body: `Creators obsess over one shape: the view-count line on a new video. A slow, flat line means it's fading. A line that suddenly turns almost vertical means it's "going viral" — and that word literally describes the **slope** of a line chart, not any single number.\n\nEvery trending chart, growth graph, or "our stock is up" headline is really just someone reading the slope of a line.`,
        callout: {
          label: "Notice it",
          text: "Next time you hear \"growing fast\" or \"dropping,\" picture the line chart underneath — is the slope steep, flat, or heading down?",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "New words for this lesson",
        body: `A few terms will make today's ideas click faster.`,
        bullets: [
          "**Trend** — the general direction a line is heading: up, down, or flat.",
          "**Slope** — how steep the line is between two points; steeper means faster change.",
          "**Peak** — the highest point on a line chart.",
          "**Dip** — a lower point on a line chart, often a temporary drop.",
          "**Time-ordered** — data sorted so time runs correctly from earliest to latest.",
        ],
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "A line chart shows change over time",
        body: `A **line chart** connects dots in order to show how a number **goes up and down over time**.\n\nThe connecting line is the secret sauce. With separate bars, your eye has to hop from one to the next; with a line, the *slope* does the work — a steep upward line screams "growing fast," a downward slope says "dropping." You read direction instantly, the way you'd read a hiking trail going uphill or down.\n\nUse a line chart whenever your x-axis is **time** — days, weeks, months, years. It lets you spot the **trend**: is the number rising, falling, or bouncing around? That's a question a bar chart simply can't answer as clearly.`,
        checkIn: {
          prompt: "What makes a line chart different from a bar chart?",
          choices: [
            "Line charts don't need a y-axis",
            "Line charts can only show one data point",
            "The connecting line reveals a trend/slope across ordered time steps",
          ],
          correctIndex: 2,
          explanation: "The connecting line is what lets your eye read direction and speed of change (the slope) — something separate bars can't show as clearly.",
        },
      },
      {
        id: "concept-2",
        kicker: "How to read it",
        title: "Time runs left to right",
        body: `Here's the line you'll build — two weeks of cafeteria orders. Read it in three parts:\n\n• The **x-axis** (bottom) is **time**: day 1 → day 14, always in time order.\n• The **y-axis** shows the **number** of orders.\n• The **shape of the line** is the story: it climbs steadily to Friday of Week 2 peaks at **95 orders**, with weekend dips after each school week.\n\nFollowing the line, you instantly see the school-week build-up and the weekend slump — no number-crunching needed. That's the power of plotting time left to right.`,
        chart: {
          config: { type: "line", xKey: "day_num", yKey: "orders", title: "Orders per day (two weeks)" },
          result: {
            columns: ["day_num", "orders"],
            values: [
              [1, 42], [2, 55], [3, 48], [4, 63], [5, 80], [6, 30], [7, 25],
              [8, 51], [9, 58], [10, 54], [11, 71], [12, 95], [13, 33], [14, 28],
            ],
            rowCount: 14,
          },
        },
        checkIn: {
          prompt: "Looking at the chart, which day is the peak?",
          choices: ["Monday", "Friday", "Sunday"],
          correctIndex: 1,
          explanation: "Friday of Week 2 has the highest point (95 orders) — that's the peak of the two-week trend.",
        },
      },
      {
        id: "concept-3",
        kicker: "Choose wisely",
        title: "When to use a line chart",
        body: `The key question is simple: *is my x-axis time?* If yes, a line chart is almost always your best friend. If no, reach for something else.`,
        bullets: [
          "**Use a line** when the x-axis is time and you care about the trend.",
          "**Use a bar** instead for separate categories that aren't in time order.",
          "**Always sort by time** (`ORDER BY day_num`) so the line reads left to right.",
        ],
        checkIn: {
          prompt: "Your data is 'sales by region' (North, South, East, West). Is a line chart appropriate?",
          choices: [
            "Yes, but only if there are exactly 4 regions",
            "No — regions aren't in time order, so a bar chart compares them more honestly",
            "Yes, any numeric data works with a line",
          ],
          correctIndex: 1,
          explanation: "Regions have no natural time order, so connecting them with a line would imply a trend that doesn't exist. A bar chart is the honest choice here.",
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
        id: "misconception",
        kicker: "Common misconception",
        title: "An out-of-order line tells a false story",
        body: `People assume any line chart is trustworthy. But if the days are out of order, or the y-axis is stretched (or doesn't start at zero), a tiny change can look like a giant spike. Keep time in order and always check the scale.`,
        checkIn: {
          prompt: "If you sort daily_orders by weekday ALPHABETICALLY instead of by day_num, what happens?",
          choices: [
            "Nothing changes — the trend still reads correctly",
            "Fri would appear before Mon, scrambling the real week-long trend into nonsense",
            "The chart would refuse to render",
          ],
          correctIndex: 1,
          explanation: "Alphabetical order (Fri, Mon, Sat, Sun, Thu, Tue, Wed) has nothing to do with actual time order, so the line would zig-zag meaninglessly instead of showing the real weekly trend.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Predict the shape before you chart it",
        body: `Before the exercises, look at the two-week order numbers from the concept-2 chart above and predict: does the line rise, fall, or do both across the fortnight? Sketch the rough shape on paper, then build the real query and compare against your sketch.`,
      },
      {
        id: "deeper-skill",
        kicker: "Go one level deeper",
        title: "The hidden helper column: day_num",
        body: `The **daily_orders** table has one row per day across **two weeks**, plus a **day_num** column (1 → 14) that keeps time in the *correct* order. Sorting by day_num guarantees an honest line. The **weekday** label (Mon, Tue, …) is useful for reading a peak day, but alphabetical weekday order would scramble the trend — always sort by the number.`,
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
        id: "comparison",
        kicker: "Compare & contrast",
        title: "Line chart vs. bar chart, same numbers",
        body: `Imagine the same two-week traffic numbers shown two ways.`,
        bullets: [
          "**As a bar chart** — you can compare which day was busiest, but the week's *flow* is harder to see.",
          "**As a line chart** — the climb toward Friday and the weekend crash are immediately obvious.",
          "Same data, same numbers — the chart type changes which question gets answered clearly.",
        ],
        checkIn: {
          prompt: "Which chart type makes it easiest to see a week-long BUILD-UP toward a peak day?",
          choices: ["A pie chart", "A line chart, sorted by day_num", "A bar chart, sorted alphabetically"],
          correctIndex: 1,
          explanation: "A line chart's connected slope is specifically good at showing gradual build-ups and drop-offs across ordered time steps.",
        },
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "Uneven time steps can distort a trend",
        body: `Line charts can mislead if the time steps are uneven or the y-axis doesn't start at zero. A small rise can be made to look like a huge spike — always check the axis. If one gap on your x-axis is "1 day" and another is secretly "1 month," the slope between them is meaningless.`,
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "Sort by the real time column, never the label",
        body: `Make this a reflex: whenever you build a line chart, sort by the underlying time number (like day_num), not by the text label. This one habit prevents almost every line-chart mistake you'll ever make.`,
      },
      {
        id: "reflection",
        kicker: "Reflection",
        title: "What trend line would you want to see?",
        body: `Think of a number in your life you'd like to track over time — hours of sleep, video game high scores, minutes of exercise. If you plotted it day by day for a month, what trend would you predict: rising, falling, or bouncing around?`,
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "The school play's ticket sales",
        body: `A school play tracks ticket sales in a table \`ticket_sales\` with columns \`day_num\`, \`sale_date\`, and \`tickets_sold\`, one row per day leading up to opening night. The drama teacher wants to see the sales trend to know when to push more advertising.\n\nWhat query would produce a correctly time-ordered line chart?`,
        callout: {
          label: "Apply it",
          text: "SELECT sale_date, tickets_sold FROM ticket_sales ORDER BY day_num; — sorting by the numeric day_num guarantees the line reads in true chronological order.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you dive in",
        body: `Let's confirm the time-ordering rule is fully locked in.`,
        checkIn: {
          prompt: "Which is the correct way to build an honest weekly trend line from daily_orders?",
          choices: [
            "SELECT day_num, orders FROM daily_orders",
            "SELECT day_num, orders FROM daily_orders ORDER BY day_num",
            "SELECT day_num, orders FROM daily_orders ORDER BY weekday",
          ],
          correctIndex: 1,
          explanation: "Sorting by day_num (1→14) keeps both weeks in true chronological order so the line never zig-zags backward.",
        },
      },
      {
        id: "time-order-walkthrough",
        kicker: "Query walkthrough",
        title: "Sort by day_num, not weekday name",
        body: `Alphabetical order puts Friday before Monday — which makes a trend line look like a rollercoaster instead of a week. Sorting by \`day_num\` (1 through 14 across two weeks) keeps time flowing left to right.\n\nRead the result table: orders climb through each school week and peak at 95 on Friday of Week 2. That pattern only makes sense because the rows are in chronological order.`,
        code: `SELECT day_num, orders\nFROM daily_orders\nORDER BY day_num;`,
        codeCaption: "Chronological order for an honest trend",
        table: {
          columns: ["day_num", "orders"],
          values: [
            [1, 42],
            [2, 55],
            [3, 48],
            [4, 63],
            [5, 80],
            [12, 95],
            [14, 28],
          ],
          rowCount: 14,
        },
      },
      {
        id: "read-trend-slope",
        kicker: "Analyst habits",
        title: "Read the slope, not just the peak",
        body: `A line chart's story lives in its **slope** — the direction between points. Rising from Tuesday to Friday means weekday demand is building. The sharp drop Saturday to Sunday means weekend traffic falls off.\n\nDon't fixate on Friday's peak alone. Ask: *Is the trend going up, down, or flat overall?* Where are the steepest climbs and drops? Those answers matter more than any single number.`,
      },
      {
        id: "weekend-context-ethics",
        kicker: "Data ethics moment",
        title: "Context changes how a trend reads",
        body: `Friday's 95 orders look impressive — until you learn the cafeteria was closed Saturday and Sunday for a holiday, making the weekend dip misleading. A line chart shows *what happened* but not *why*.\n\nResponsible analysts add context in their conclusion: "Orders peaked Friday, but weekend numbers may reflect reduced hours, not lower demand." Never let a chart speak without you.`,
      },
      {
        id: "peak-day-query",
        kicker: "Second example",
        title: "Finding the busiest day with ORDER BY + LIMIT",
        body: `Once your data is sorted by time for the chart, a separate question might be: *which single day had the most orders?* That's a ranking problem — sort by the number descending and keep one row.\n\nThis is the same ORDER BY + LIMIT pattern from Lesson 5, now applied to a time-series table.`,
        code: `SELECT weekday, orders\nFROM daily_orders\nORDER BY orders DESC\nLIMIT 1;`,
        codeCaption: "Crown the busiest day",
        table: {
          columns: ["weekday", "orders"],
          values: [["Fri", 95]],
          rowCount: 1,
        },
        checkIn: {
          prompt: "Why use ORDER BY orders DESC LIMIT 1 instead of ORDER BY day_num?",
          choices: [
            "DESC + LIMIT 1 ranks by order count and keeps the top row — day_num only sorts chronologically",
            "day_num finds the busiest day automatically",
            "LIMIT 1 always returns Monday",
          ],
          correctIndex: 0,
          explanation: "Finding the peak requires sorting by the orders column descending, not by time order. day_num is for trend lines; DESC + LIMIT is for rankings.",
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
  cfu: [
    {
      question: "What does the x-axis usually represent on a line chart of change over time?",
      answer:
        "Time order (days, weeks, etc.) moving left to right so the line shows how a value evolves.",
    },
    {
      question: "What should you look for when reading a line chart?",
      answer:
        "Overall trend (up/down/flat), peaks, dips, and sudden jumps — then connect those to a real-world explanation carefully.",
    },
    {
      question: "When would you prefer a line chart over a bar chart?",
      answer:
        "When the main idea is change across an ordered sequence (especially time). Bars are better for comparing unordered categories.",
    },
  ],
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
        "Show each day_num and its order count, sorted by day_num so the line runs left to right across both weeks.",
      goal: "SELECT day_num, orders FROM daily_orders ORDER BY day_num;",
      starterSql: `SELECT day_num, orders
FROM daily_orders
ORDER BY ;`,
      hint: "Type day_num after ORDER BY, then Run & check to see the line.",
      successMessage: "There's your trend line — 14 days, left to right.",
      failureMessage:
        "Use SELECT day_num, orders ... ORDER BY day_num. Expect 14 rows + a line.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+day_num\s*,\s*orders\b/.test(n)) return false;
        if (!/\border\s+by\s+day_num\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 14 &&
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
      successMessage: "Friday (Week 2) is the peak at 95 orders — the top of the line.",
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
        "Write the whole time-series query: day_num and orders, sorted so time runs left to right.",
      goal: "Full query: day_num, orders, ordered by day_num.",
      starterSql: `-- Show the two-week order trend, in day order:
SELECT 
FROM daily_orders
ORDER BY ;`,
      hint: "SELECT day_num, orders ... ORDER BY day_num;",
      successMessage: "You built a trend line from scratch — Trend Spotter!",
      failureMessage:
        "Need SELECT day_num, orders, ORDER BY day_num. Expect 14 rows + a line.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+day_num\s*,\s*orders\b/.test(n)) return false;
        if (!/\border\s+by\s+day_num\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 14 &&
            result.columns.map((c) => c.toLowerCase()).includes("orders")
        );
      },
    },
  ],
};

