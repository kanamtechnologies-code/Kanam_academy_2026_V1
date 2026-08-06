#!/usr/bin/env node
/** Replace empty cfu: [] in lib/dataLessons/lesson*.ts with lesson-specific CFUs. */
import fs from "fs";
import path from "path";

const CFUS = {
  1: [
    {
      question: "What is the difference between a row and a column in a data table?",
      answer:
        "A row is one record (one lunch order). A column is one field/label that every row shares (like student_name or price).",
    },
    {
      question: "What do SELECT, FROM, and LIMIT each control in a query?",
      answer:
        "SELECT chooses which columns to show, FROM names the table to read, and LIMIT caps how many rows come back.",
    },
    {
      question: "Why is LIMIT useful when exploring a new table?",
      answer:
        "It lets you peek at a sample of rows without loading the whole table — safer and easier to read while you learn the shape of the data.",
    },
  ],
  2: [
    {
      question: "What does a query result table represent?",
      answer:
        "The database’s answer to your question — a new table of rows/columns that match what your SQL asked for.",
    },
    {
      question: "When would you use SELECT * versus naming specific columns?",
      answer:
        "SELECT * shows every column (good for exploring). Naming columns focuses the answer on what matters and makes results easier to read.",
    },
    {
      question: "What happens if you omit LIMIT on a large table?",
      answer:
        "The database may return every matching row, which can be hard to read and slow. LIMIT is a controlled sample while you explore.",
    },
  ],
  3: [
    {
      question: "Why does column order in SELECT matter?",
      answer:
        "The result table shows columns in the order you list them — you control the presentation, not the original table layout.",
    },
    {
      question: "What problem does DISTINCT solve?",
      answer:
        "It removes duplicate values so each unique item appears once — useful when counting categories or listing unique names.",
    },
    {
      question: "How is “picking columns” different from filtering rows?",
      answer:
        "Picking columns chooses which fields to show. Filtering rows (WHERE) chooses which records to keep. You often need both.",
    },
  ],
  4: [
    {
      question: "What does a WHERE clause do?",
      answer:
        "It filters rows so only records that match a condition are returned — like a bouncer checking a rule at the door.",
    },
    {
      question: "Why do text values in WHERE usually need quotes?",
      answer:
        "Quotes mark a string (text). Without quotes, SQL may treat the word as a column name or invalid syntax.",
    },
    {
      question: "When would you use AND versus OR in a filter?",
      answer:
        "AND requires every condition to be true (narrower). OR allows either condition to be true (broader).",
    },
  ],
  5: [
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
  6: [
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
  7: [
    {
      question: "Why do we JOIN tables instead of copying the same facts into one giant table?",
      answer:
        "Joining keeps data organized and avoids duplication — each table stores one kind of fact, and a shared key connects them when needed.",
    },
    {
      question: "What is a shared key in a JOIN?",
      answer:
        "A column that appears in both tables (like student_id) used to match related rows — the “stitch” between tables.",
    },
    {
      question: "What goes wrong if you JOIN on the wrong key?",
      answer:
        "Rows may not match, or you may create nonsense combinations. Always join on the intended relationship key.",
    },
  ],
  8: [
    {
      question: "What is the difference between WHERE and HAVING?",
      answer:
        "WHERE filters individual rows before grouping. HAVING filters groups after aggregation (e.g., only groups with COUNT > 2).",
    },
    {
      question: "Why does clause order matter when stacking filters, groups, and sorts?",
      answer:
        "SQL builds the answer in stages. Filtering too late/early or grouping before selecting the right columns can change or break the result.",
    },
    {
      question: "What makes a data question “sharper”?",
      answer:
        "It names who/what you care about, how you’ll measure it, and any limits (filters) — so the query has a clear, checkable answer.",
    },
  ],
  9: [
    {
      question: "What two kinds of columns does a basic bar chart need from a query?",
      answer:
        "A label/category column and a number column — then each bar can represent one category’s value.",
    },
    {
      question: "How can sorting change the story a chart tells?",
      answer:
        "Sorting high-to-low (or by time) highlights ranking or trends. A random order can hide the pattern even with the same numbers.",
    },
    {
      question: "Why should the chart type match the question?",
      answer:
        "The wrong chart can mislead — bars compare categories well; lines show change over time; pies show parts of one whole.",
    },
  ],
  10: [
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
  11: [
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
  12: [
    {
      question: "What is a histogram showing that a bar chart of categories is not?",
      answer:
        "How a numeric variable is spread across bins/ranges — the shape of the distribution, not named categories.",
    },
    {
      question: "What does the “shape” of a distribution tell you?",
      answer:
        "Where values cluster, how wide the spread is, and whether there are outliers or unusual gaps.",
    },
    {
      question: "Why might two classes with the same average score look different on a histogram?",
      answer:
        "One may be tightly clustered; the other may be spread out or bimodal. The average alone hides that shape.",
    },
  ],
  13: [
    {
      question: "What does one point on a scatter plot represent?",
      answer:
        "One record plotted with two numeric values — e.g., study minutes on one axis and score on the other.",
    },
    {
      question: "What does an upward trend on a scatter plot suggest?",
      answer:
        "A positive relationship: as one value increases, the other tends to increase too — a clue, not proof of cause.",
    },
    {
      question: "Why is “correlation is not causation” important here?",
      answer:
        "Two numbers can move together for many reasons. You need more evidence before claiming one causes the other.",
    },
  ],
  14: [
    {
      question: "What are the main steps of a complete data investigation in this capstone?",
      answer:
        "Explore → join (if needed) → summarize/aggregate → rank → visualize → conclude with evidence and limitations.",
    },
    {
      question: "What makes a conclusion “evidence-based”?",
      answer:
        "It answers the question using the query/chart result and states what the data can and cannot prove (limitations).",
    },
    {
      question: "Name one privacy/ethics concern when analyzing spending by person.",
      answer:
        "Individual spending can be sensitive. In real life you’d need permission, minimize identifiers, and protect who can see the results.",
    },
  ],
};

function formatCfu(items) {
  const body = items
    .map(
      (it) => `    {
      question: ${JSON.stringify(it.question)},
      answer:
        ${JSON.stringify(it.answer)},
    }`
    )
    .join(",\n");
  return `  cfu: [\n${body},\n  ],`;
}

const root = path.join(process.cwd(), "lib/dataLessons");
let updated = 0;
for (let i = 1; i <= 14; i++) {
  const file = path.join(root, `lesson${i}.ts`);
  let src = fs.readFileSync(file, "utf8");
  if (!src.includes("cfu: []")) {
    console.log(`skip lesson${i}: cfu not empty`);
    continue;
  }
  const items = CFUS[i];
  if (!items) throw new Error(`Missing CFUs for lesson ${i}`);
  src = src.replace(/  cfu: \[\],/, formatCfu(items));
  fs.writeFileSync(file, src);
  updated++;
  console.log(`updated lesson${i}`);
}
console.log(JSON.stringify({ updated }, null, 2));
