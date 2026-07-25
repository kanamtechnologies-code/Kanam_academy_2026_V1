import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";
import { firstCellNumber, normSql, QUIZ_SCORES_SEED } from "@/lib/dataLessonHelpers";

export const daLesson12: DataLessonConfig = {
  id: "da-12",
  title: "12. Distributions",
  goal: "Use a histogram to see how a set of numbers is spread out — where scores cluster, and how high and low they reach.",
  xpReward: 600,
  badge: "Distribution Detective",
  previewTable: "quiz_scores",
  seedData: QUIZ_SCORES_SEED,
  prevHref: "/learn/data/11",
  nextHref: "/learn/data/13",
  dashboardHref: "/dashboard",
  chartConfig: {
    type: "histogram",
    valueKey: "score",
    binSize: 10,
    title: "How quiz scores are spread out",
  },
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `So far your charts have compared things or tracked change. Today you'll learn the chart that reveals the *shape* of a pile of numbers — the **histogram** — and finally see the difference between it and its look-alike, the bar chart.\n\nHere's your roadmap:\n\n• **What a histogram shows** — how a set of numbers is spread out.\n• **How to read** bins and clusters.\n• **Histogram vs. bar chart** — they look identical but answer different questions.\n• A **worked example** building a histogram in your head from raw scores.\n\nEvery time a teacher posts a "grade curve," shows whether the class clustered around a B or spread all over, that's a histogram. Same idea behind the age breakdown of a population, or how long people watch a video before clicking away. It answers: *where do most of the numbers land?*`,
        image: "/images/lessons/lesson-histogram.png",
        imageAlt: "A histogram of test scores, with most students clustered in the middle ranges",
        callout: {
          label: "Why it matters",
          text: "Test-score curves, the age breakdown of a population, and how long videos get watched are all shown with histograms — anywhere you want to see the spread of one set of numbers.",
        },
      },
      {
        id: "hook",
        kicker: "Real-world hook",
        title: "The 'grade curve' everyone talks about",
        body: `After a big test, someone always asks "did the teacher curve it?" What they're really asking about is the **shape** of the score distribution — did most people cluster around a B, or was it spread evenly from F to A?\n\nA teacher answering that question honestly would sort every score into a histogram, exactly like you're about to build.`,
        callout: {
          label: "Notice it",
          text: "Next time you hear about a grade curve or a \"typical\" range for something, picture the histogram underneath that claim.",
        },
      },
      {
        id: "glossary",
        kicker: "Key vocabulary",
        title: "New words for this lesson",
        body: `A few terms will make today's ideas click faster.`,
        bullets: [
          "**Histogram** — a chart showing how one set of numbers is spread across ranges.",
          "**Bin** — an equal-width range that values get sorted into (like 70–80).",
          "**Distribution** — the overall shape of how values are spread out.",
          "**Cluster** — a range where many values land, shown as a tall bar.",
          "**Spread / range** — how far values stretch from lowest to highest.",
        ],
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "A histogram shows how numbers are spread out",
        body: `A **histogram** takes one big pile of numbers and shows their **shape** — where most values land, and how far they stretch from low to high.\n\nPicture sorting a deck of test papers into labeled trays: a 50s tray, a 60s tray, a 70s tray, and so on. After sorting, you don't even read the scores — you just look at which trays are *fullest*. The tall stacks show where the class clustered; the empty trays show ranges nobody hit. A histogram is exactly that, drawn as bars.\n\nIt looks like a bar chart, but it answers a different question: not *"compare these named categories"* but *"how is this one set of numbers distributed?"* That's a subtle but huge difference.`,
        checkIn: {
          prompt: "What question does a histogram answer?",
          choices: ["How is one set of numbers spread out, and where do they cluster?", "Which named category is biggest?", "How does a number change over time?"],
          correctIndex: 0,
          explanation: "A histogram reveals the shape of a single numeric column's distribution — where values cluster and how far they spread.",
        },
      },
      {
        id: "concept-2",
        kicker: "How to read it",
        title: "Numbers get sorted into bins",
        body: `Here's the histogram you'll build from 16 quiz scores. Read it in three parts:\n\n• The x-axis is split into equal ranges called **bins** (every 10 points: 50–60, 60–70, …).\n• Each bar's **height** is **how many** scores fall in that bin.\n• The bars **touch**, because the ranges are continuous — there's no gap between 70–80 and 80–90.\n\nThe tall bars show where scores **cluster** (here, the 70s and 80s), while the short bars at the edges show the few very low and very high scores. The whole *shape* tells you the class story at a glance.`,
        chart: {
          config: { type: "histogram", valueKey: "score", binSize: 10, title: "How quiz scores are spread out" },
          result: {
            columns: ["score"],
            values: [
              [72], [85], [90], [68], [95], [88], [76], [81],
              [100], [64], [79], [92], [58], [84], [73], [89],
            ],
            rowCount: 16,
          },
        },
        checkIn: {
          prompt: "Why do histogram bars touch, with no gaps between them?",
          choices: [
            "It's just a stylistic choice",
            "Because the bins represent continuous ranges of ONE number line, with no gaps between ranges",
            "Because there's only one bar total",
          ],
          correctIndex: 1,
          explanation: "Bins carve up a single continuous number line into adjoining ranges (like 70-80, 80-90) — there's no gap between them, so the bars touch.",
        },
      },
      {
        id: "concept-3",
        kicker: "Choose wisely",
        title: "Histogram vs. bar chart",
        body: `These two charts look like twins, so this is the part people get wrong most often. The trick is to ask what's on the x-axis: *separate names* or *ranges of one number?*`,
        bullets: [
          "**Use a histogram** for one column of numbers, to see its spread and clusters.",
          "**Use a bar chart** to compare separate, named categories.",
          "Histogram bars **touch**; bar-chart bars have **gaps** between categories.",
        ],
        checkIn: {
          prompt: "Your x-axis will show 'Pizza,' 'Salad,' and 'Burger.' Histogram or bar chart?",
          choices: ["Histogram", "Either works identically", "Bar chart"],
          correctIndex: 2,
          explanation: "Named, separate categories (not ranges of one number) call for a bar chart, not a histogram.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build a histogram in your head",
        body: `Let's bin some numbers by hand so the chart makes sense. Imagine eight quiz scores: **62, 68, 71, 74, 77, 79, 85, 93**. We'll use bins of 10.\n\n**Step 1 — make the trays:** 60–70, 70–80, 80–90, 90–100. **Step 2 — drop each score in:** 62 and 68 go in 60–70 (that's 2). 71, 74, 77, 79 all land in 70–80 (that's 4). 85 goes in 80–90 (1). 93 goes in 90–100 (1). **Step 3 — the heights are the counts**, shown in the table below.\n\nReading it: the tallest bar is 70–80, so most students clustered there. The spread runs from the 60s to the 90s. That count table *is* the histogram — each row is one bar.`,
        table: {
          columns: ["bin", "students"],
          values: [
            ["60–70", 2],
            ["70–80", 4],
            ["80–90", 1],
            ["90–100", 1],
          ],
          rowCount: 4,
        },
        callout: {
          label: "Pro tip",
          text: "A histogram's bars must add up to the total count. Here 2 + 4 + 1 + 1 = 8, the number of scores. If your bars don't sum to your row count, a value got dropped or double-counted.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "Bin size changes the whole picture",
        body: `There's no single "correct" histogram — bin size changes the whole picture. Very wide bins blur real differences together; very narrow bins make random noise look like a pattern. Always try a sensible bin width before trusting the shape.`,
        checkIn: {
          prompt: "If you used a bin size of 50 instead of 10 for the quiz scores, what would likely happen?",
          choices: ["Most scores would blur into one or two giant bins, hiding the real clustering", "The histogram would show more detail", "Nothing would change"],
          correctIndex: 0,
          explanation: "A bin size that's too wide lumps very different scores together, hiding the real shape of the distribution.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Predict where the class clustered",
        body: `Before the exercises, look at the 16 quiz scores in the concept-2 chart above. Predict which 10-point bin has the MOST scores — the 70s, 80s, or 90s? Then check your prediction once you see the actual histogram in the exercises.`,
      },
      {
        id: "deeper-skill",
        kicker: "Go one level deeper",
        title: "Just return the raw numbers — no grouping needed",
        body: `The **quiz_scores** table has one row per student with a single number, **score**. The good news: you don't group or count anything yourself. You just return the **score** column, and the chart sorts the values into bins automatically. Your job is to read the resulting shape, not to build it manually.`,
        table: {
          columns: ["student_name", "score"],
          values: [
            ["Alex", 72],
            ["Jordan", 85],
            ["Sam", 90],
            ["Quinn", 100],
          ],
          rowCount: 4,
        },
      },
      {
        id: "comparison",
        kicker: "Compare & contrast",
        title: "MIN/MAX vs. the full histogram shape",
        body: `MIN and MAX (from Lesson 6) tell you the edges of your data — the lowest and highest scores. A histogram tells you much more: not just the edges, but everything *between* them.`,
        bullets: [
          "**MIN(score), MAX(score)** — just two numbers: the low and high edges.",
          "**Histogram** — the full shape: where scores cluster, thin out, or spread evenly.",
          "Two datasets can share the same MIN and MAX but have completely different shapes.",
        ],
        checkIn: {
          prompt: "Two classes both have scores ranging from 60 to 100. Does that mean their histograms look the same?",
          choices: [
            "Yes, same min/max always means same shape",
            "No — one class could cluster tightly around 80 while the other spreads evenly across the whole range",
            "It's impossible to have the same min/max with different data",
          ],
          correctIndex: 1,
          explanation: "MIN and MAX only describe the edges. The histogram reveals the shape in between, which can look completely different even with identical edges.",
        },
      },
      {
        id: "ethics",
        kicker: "Data ethics moment",
        title: "Bin size can be chosen to tell a story",
        body: `Histogram shape depends on bin size. Very wide bins can hide real differences; very narrow ones can make noise look meaningful. Choose bins that tell the truth, not the story you want. If someone picks an unusually wide or narrow bin size, ask why — it might be hiding (or exaggerating) something.`,
      },
      {
        id: "habits",
        kicker: "Analyst habits",
        title: "Check that your bars sum to your row count",
        body: `Whenever you build or read a histogram, add up the bar heights and compare them to the total number of records. If they don't match, a value was dropped, double-counted, or landed outside your bins — investigate before trusting the shape.`,
      },
      {
        id: "reflection",
        kicker: "Reflection",
        title: "Picture the shape of your own data",
        body: `Think of a number you could collect about your friend group — heights, ages, hours of sleep, screen time. Would you expect it to cluster tightly around one value, or spread out evenly? Why?`,
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "The track team's race times",
        body: `A track coach has a table \`race_times\` with one row per runner and a column \`seconds\`. The coach wants to see whether most runners finished close together or if times were spread widely.\n\nWhat single-column query would let the coach see this shape as a histogram?`,
        callout: {
          label: "Apply it",
          text: "SELECT seconds FROM race_times; — no grouping needed. Returning the raw number column lets the histogram bin it automatically.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you dive in",
        body: `Let's confirm bins and the histogram-vs-bar distinction are locked in.`,
        checkIn: {
          prompt: "Which scenario calls for a HISTOGRAM rather than a bar chart?",
          choices: ["Comparing sales of Pizza, Salad, and Burger", "Showing a budget split into categories", "Seeing how 30 students' quiz scores are spread across the 0-100 range"],
          correctIndex: 2,
          explanation: "Seeing the spread of ONE numeric column (scores) across ranges is exactly what a histogram is built for — the other two involve named categories or a whole-split, which fit bar or pie charts instead.",
        },
      },
      {
        id: "histogram-walkthrough",
        kicker: "Query walkthrough",
        title: "One column in — spread out on the chart",
        body: `A histogram needs only one numeric column: \`score\`. Each student's score becomes a dot, and the chart bins them into ranges (0–10, 11–20, etc.) to show where scores cluster.\n\nUnlike a bar chart, you don't GROUP BY anything in SQL for a basic histogram — just return the raw numbers and let the chart handle the binning. The query is simpler; reading the result requires thinking about **spread** instead of categories.`,
        code: `SELECT score\nFROM quiz_scores;`,
        codeCaption: "Every score, one column — the histogram does the rest",
      },
      {
        id: "spread-read-clusters",
        kicker: "Analyst habits",
        title: "Look for clusters, gaps, and outliers",
        body: `When you read a histogram, scan for three things:\n\n• **Clusters** — where do most scores pile up? (Maybe most students scored 70–85.)\n• **Gaps** — are there empty bins nobody landed in?\n• **Outliers** — dots far from the main cloud (a single score of 15 when everyone else is above 60).\n\nA distribution isn't just "high" or "low" — its **shape** tells you whether the class was mostly prepared, split into two groups, or dragged down by a few stragglers.`,
      },
      {
        id: "max-min-spread",
        kicker: "Second example",
        title: "Measuring spread with MAX and MIN",
        body: `The histogram shows shape visually. \`MAX(score)\` and \`MIN(score)\` put numbers on the spread: the highest and lowest scores in the dataset.\n\nTogether they tell you the **range** — how far apart the extremes are. A range of 85–92 means a tight, high-performing group. A range of 15–98 means huge variation worth investigating.`,
        code: `SELECT MAX(score) AS top_score,\n       MIN(score) AS low_score\nFROM quiz_scores;`,
        codeCaption: "Two numbers framing the spread",
      },
      {
        id: "outlier-ethics",
        kicker: "Data ethics moment",
        title: "Outliers are people, not just dots",
        body: `That lone dot at the bottom of a histogram? That's a real student who scored far below everyone else. Before sharing a distribution chart publicly, ask whether highlighting the outlier helps or humiliates.\n\nSometimes the right move is to report the class median without naming individuals. Data about spread should inform teaching — not shame.`,
        checkIn: {
          prompt: "A histogram shows one student scored 12 while everyone else scored 70+. What's the responsible next step?",
          choices: [
            "Label the student in the chart title so everyone knows",
            "Consider whether the chart should be shared publicly at all, and focus on class-wide patterns instead",
            "Delete the outlier row from the data",
          ],
          correctIndex: 1,
          explanation: "Outliers represent real people. The responsible move is to think about privacy and purpose before sharing — not to expose or erase individuals.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You now know a histogram shows the **spread** of one set of numbers, how to read its bins and clusters, and how it differs from a bar chart. You also know the easy part: just return the number column and let the chart bin it.\n\nIn the exercises you'll return the scores to see the distribution, then measure the spread with the highest score.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  instructorScript: `**Coach's note**:
A bar chart compares named categories. A **histogram** looks similar but answers a different question: *how is one set of numbers spread out?*

A histogram takes **one number column** (here, **score**) and sorts the values into **bins** (ranges like 70–80, 80–90). The height of each bar is **how many** values fall in that range.

So you only need to return the **score** column — the chart bins them for you. Watch where the scores **cluster** (the tall bars) and how far they **spread** (lowest to highest bin).

This is the difference between *one number per category* (bar) and *the shape of many numbers* (histogram).`,
  commandReference: [
    {
      command: "Return one number column",
      summary: "A histogram needs a single numeric column (score). It bins the values automatically.",
      example: "SELECT score FROM quiz_scores",
    },
    {
      command: "Bins",
      summary: "Values are grouped into equal ranges (here every 10 points). Bar height = how many landed there.",
      example: "70–80, 80–90, 90–100",
    },
    {
      command: "MIN / MAX",
      summary: "The lowest and highest values show the full spread (the range) of the data.",
      example: "SELECT MIN(score), MAX(score) FROM quiz_scores",
    },
  ],
  kidExplain: [
    {
      title: "Bins, not categories",
      text: "A histogram chops a number line into equal ranges (bins) and counts how many values fall in each. The bars touch because the ranges are continuous.",
    },
    {
      title: "Shape tells the story",
      text: "Tall bars show where most scores cluster. A wide spread means scores vary a lot; a narrow one means they're similar.",
    },
    {
      title: "Just return the numbers",
      text: "You don't group the scores yourself — return the score column and the chart bins them for you.",
    },
  ],
  steps: [
    "Return every score to see the distribution.",
    "Count how many students there are in all.",
    "Find the spread with the highest score.",
  ],
  cfu: [],
  tryThis: [
    "Which 10-point bin has the most students? That's where scores cluster.",
    "If one student scored 100 and the rest scored near 70, how would the shape change?",
  ],
  dataEthicsMoment:
    "Histogram shape depends on bin size. Very wide bins can hide real differences; very narrow ones can make noise look meaningful. Choose bins that tell the truth, not the story you want.",
  exercises: [
    {
      id: "ex-distribution",
      title: "Exercise 1 — See the distribution",
      focusCommand: "SELECT score",
      commandExplain:
        "Return the score column for every student. The histogram bins the values and shows the shape.",
      goal: "SELECT score FROM quiz_scores;",
      starterSql: `SELECT score
FROM ;`,
      hint: "Type quiz_scores after FROM, then Run & check to see the histogram.",
      successMessage: "There's the distribution — 16 scores sorted into bins.",
      failureMessage:
        "Use SELECT score FROM quiz_scores. Expect 16 rows + a histogram.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bselect\s+score\b/.test(n)) return false;
        if (!/\bfrom\s+quiz_scores\b/.test(n)) return false;
        return Boolean(
          result &&
            result.rowCount === 16 &&
            result.columns.map((c) => c.toLowerCase()).includes("score")
        );
      },
    },
    {
      id: "ex-count",
      title: "Exercise 2 — How many students?",
      focusCommand: "COUNT(*)",
      commandExplain:
        "Count every row so you know how many scores are in the distribution.",
      goal: "SELECT COUNT(*) AS total_students FROM quiz_scores;",
      starterSql: `SELECT COUNT(*) AS total_students
FROM quiz_scores;`,
      hint: "The starter query is complete — Run & check.",
      successMessage: "16 students — every score is in the histogram.",
      failureMessage:
        "Use COUNT(*) AS total_students FROM quiz_scores. Expect 1 row showing 16.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bcount\s*\(\s*\*\s*\)\s+as\s+total_students\b/.test(n)) return false;
        if (!/\bfrom\s+quiz_scores\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 1 && firstCellNumber(result) === 16);
      },
    },
    {
      id: "ex-spread",
      title: "Exercise 3 — Find the top of the spread",
      focusCommand: "MAX",
      commandExplain:
        "Use MAX(score) to find the highest score — the far-right edge of the distribution.",
      goal: "SELECT MAX(score) AS top_score FROM quiz_scores;",
      starterSql: `SELECT MAX(score) AS top_score
FROM quiz_scores;`,
      hint: "The starter query is complete — Run & check.",
      successMessage: "Top score is 100 — that's the high end of the spread. Distribution Detective!",
      failureMessage:
        "Use MAX(score) AS top_score FROM quiz_scores. Expect 1 row showing 100.",
      validate: (sql, result) => {
        const n = normSql(sql);
        if (n.includes("____")) return false;
        if (!/\bmax\s*\(\s*score\s*\)\s+as\s+top_score\b/.test(n)) return false;
        if (!/\bfrom\s+quiz_scores\b/.test(n)) return false;
        return Boolean(result && result.rowCount === 1 && firstCellNumber(result) === 100);
      },
    },
  ],
};

