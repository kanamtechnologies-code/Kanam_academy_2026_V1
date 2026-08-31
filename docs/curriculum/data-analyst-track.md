# Data Analyst Track — 8-Week Curriculum

**Program length:** 8 weeks · **14 interactive lessons** across 8 weeks · **XP range:** 50 → 700
**Grade band:** 6–10 (ages 11–16) · **CSTA Level 2 core, reaching Level 3A**
**Primary emphasis:** the **data investigation cycle** — ask → query → transform → summarize → **visualize → communicate** — with a deliberate, multi-week focus on **data visualization**.
**Engine:** a real in-browser SQLite database (`sql.js` / WebAssembly) plus an auto-rendering chart panel supporting **bar, pie, line, histogram, and scatter** (Recharts). Students run real queries against real tables — no setup, no accounts.

> Standards codes below are **CSTA 2017**. Cross-curricular (Common Core Math) and forward-compatibility
> (CSTA Draft 3.0) codes are in the [master matrix](standards-alignment.md).

---

## How to use this program

This track is designed to be completed **on your own**, or with **light support** from a parent,
mentor, or teacher — no SQL expertise required from the adult. Every lesson includes a coach's note,
plain-language explainers, a "SQL command guide," guided fill-in-the-blank queries, auto-graded checks
against a real database, instant feedback, and an auto-rendering chart.

- **Self-paced (no instruction):** work the weeks in order. Each lesson states the goal, gives a
  starter query, checks your result row-by-row, and explains what to fix. Do the **Do-it-yourself**
  items at the end of each week.
- **With some assistance (recommended):** a mentor runs the **Warm-up question** and the
  **Talk-about-it** prompt, watches each **checkpoint**, and steps in only when a learner is stuck.
- **Live class / cohort:** each week is one longer session + one shorter session, matching the
  dashboard's "Week _ · Session _" labels.

### The weekly rhythm (every week looks the same)

1. **Warm-up (5 min)** — a real-world question ("Which lunch item is most popular?") to set purpose.
2. **Learn** — one new SQL idea, in kid-friendly language, with the command guide.
3. **Guided practice** — fill-in-the-blank queries with row-exact feedback.
4. **Build from scratch** — write the full query unaided.
5. **Read the result / chart** — interpret what the data says (not just run it).
6. **Check for understanding (CFU)** — short "what does this answer?" prompts.
7. **Reflect & log** — one sentence: *what did the data tell me?* (earns the week's badge/XP).

### Pacing & differentiation

| Learner | Suggested pace | Support |
| --- | --- | --- |
| Needs more time | 1 session/week; reuse the starter query | Re-read the command guide; use hints first |
| On track | 2 sessions/week (default) | Warm-up + checkpoint with a mentor |
| Ready for more | 2 sessions + all "Try This" | Critique a misleading chart; attempt a 2nd question on the data |

---

## Datasets

| Dataset | Tables | Used in | Purpose |
| --- | --- | --- | --- |
| `lunch_orders` | 1 table, 20 rows (order_id, student_name, item, price, weekday) | W1–W3, W4 (L8), W5 | Single-table querying, aggregation, bar & pie charts |
| School DB | `students` (8) + `orders` (24, with `weekday`) | W4 (L7) | Relationships / JOINs |
| Capstone cafeteria DB | `students` (10) + `orders` (41, with `weekday`) | W8 (L14) | Multi-question from-scratch briefing |
| `daily_orders` | 1 table, 14 rows (two weeks + week_label) | W6 (L11) | Time-series / line charts |
| `quiz_scores` | 1 table, 32 rows (student_name, score, class_period) | W6 (L12) | Distributions / histograms |
| `study_log` | 1 table, 24 rows (student_name, study_minutes, score, subject) | W7 (L13) | Bivariate relationships / scatter plots |

Relatable, school-themed datasets keep the cognitive load on *the concept*, not the domain.

---

## 8-week scope & sequence

> **Map at a glance:** W1 what data is · W2 choose & filter · W3 sort & summarize · W4 join & sharpen ·
> W5 bar & pie · W6 line & histogram · W7 scatter + plan · W8 cafeteria briefing capstone (from scratch).

### Week 1 — What Data Is
**Week goal:** Read a table (rows & columns) and write your first real queries.
**Big idea:** *Data is organized information; SQL is how we ask it questions.*

#### Session 1 · Lesson 1 — What Is Data?
- **Goal:** Learn rows, columns, and your first SQL commands — one exercise at a time, then put them together.
- **Learning objectives:** Define rows (records) and columns (fields/attributes); read a table; write `SELECT … FROM … LIMIT`.
- **Standards:** `2-DA-07` (represent/organize data into structured formats), `1B-DA-06` (read a data presentation).
- **Evidence of mastery:** Correctly returns specified columns/rows from `lunch_orders`.
- **Vocabulary:** row/record, column/field, table, query, `SELECT`, `FROM`, `LIMIT`.

#### Session 2 · Lesson 2 — Your First Query
- **Goal:** Write and run complete SQL queries — see every row, use `LIMIT`, and pick the columns you care about.
- **Learning objectives:** Compose complete queries; control how many rows return; select specific columns.
- **Standards:** `2-DA-08` (use computational tools to work with data), `2-AP-11` (data types).
- **Evidence of mastery:** Runs valid queries returning the requested shape.
- **Vocabulary:** clause, statement, result set.

- **Do-it-yourself (self-paced):** Return just the `student_name` and `item` columns for the first 3 orders.
- **With some help:** A mentor asks, *"What's the difference between a row and a column here?"*
- **Talk-about-it / ethics:** Whose information is in this table? Who should be allowed to see it?

### Week 2 — Choosing & Filtering
**Week goal:** Get *exactly* the data you want — the right columns and only the rows that matter.
**Big idea:** *Good analysis starts with asking a precise question.*

#### Session 1 · Lesson 3 — Pick the Columns You Need
- **Goal:** Choose exactly the columns you want, control their order, and use `DISTINCT` to remove duplicates.
- **Learning objectives:** Project specific columns; reorder output; de-duplicate with `DISTINCT`.
- **Standards:** `2-DA-08` (transform data to make it more useful), `3A-DA-10` (organization choices).
- **Evidence of mastery:** Returns a de-duplicated, column-projected result.
- **Vocabulary:** projection, `DISTINCT`, duplicate.

#### Session 2 · Lesson 4 — Find What You're Looking For
- **Goal:** Use `WHERE` to filter rows — match text, compare numbers, and combine conditions with `AND` / `OR`.
- **Learning objectives:** Filter with conditions; combine compound conditions; compare data types correctly.
- **Standards:** `2-DA-08` (transform/filter), `2-AP-12` (compound conditionals — transfers from the Python track).
- **Evidence of mastery:** Returns exactly the rows matching the condition(s).
- **Vocabulary:** filter, predicate, `WHERE`, `AND`, `OR`, comparison.

- **Do-it-yourself (self-paced):** Find every order that cost more than $4.00.
- **With some help:** Predict how many rows your `WHERE` will return *before* running it.
- **Talk-about-it:** How could a filter accidentally hide important data?

### Week 3 — Sorting & Summarizing
**Week goal:** Rank data and turn many rows into one meaningful number.
**Big idea:** *Summaries (counts, totals, averages) answer "how many / how much" questions.*

#### Session 1 · Lesson 5 — Sort and Rank
- **Goal:** Use `ORDER BY` to sort rows, flip the direction with `DESC`, and combine with `LIMIT` to find top results.
- **Learning objectives:** Sort ascending/descending; build "top-N" rankings.
- **Standards:** `2-DA-08`, `1B-DA-07` (use data to rank / highlight).
- **Evidence of mastery:** Returns a correctly sorted / top-N result.
- **Vocabulary:** sort, `ORDER BY`, `ASC`/`DESC`, ranking.

#### Session 2 · Lesson 6 — Count and Summarize
- **Goal:** Turn many rows into one answer with `COUNT`, `SUM`, and `AVG` — then break totals down by group with `GROUP BY`.
- **Learning objectives:** Compute aggregates; group rows; interpret a summary as a *measure of center / total*.
- **Standards:** `2-DA-08` (transform/aggregate), **Common Core `6.SP.B.5`** (summarize numerical data sets).
- **Evidence of mastery:** Returns correct aggregate values, grouped where required (float-tolerant check on SUM/AVG).
- **Vocabulary:** aggregate, `COUNT`/`SUM`/`AVG`, `GROUP BY`, measure of center.

- **Do-it-yourself (self-paced):** Find the average price of all lunch orders, then the count of orders per item.
- **With some help:** Explain in words what `GROUP BY item` does to the rows.
- **Talk-about-it:** Why can an average be misleading if one value is very large or small?

### Week 4 — Connecting & Sharpening (Mid-Program Checkpoint)
**Week goal:** Combine two tables and stack clauses for sharper questions — then check Weeks 1–4.
**Big idea:** *Real questions span multiple tables and multiple steps.*

#### Session 1 · Lesson 7 — Combine Tables
- **Goal:** Use `JOIN` to connect two tables — match orders to the students who placed them with a shared key.
- **Learning objectives:** Explain primary/foreign keys; join on a shared key; reason about relationships among data.
- **Standards:** `3A-DA-12` (represent relationships among data elements), `3A-DA-10` (organization tradeoffs).
- **Evidence of mastery:** Returns correctly joined rows across `students` and `orders`.
- **Vocabulary:** `JOIN`, key, relationship, foreign key.

#### Session 2 · Lesson 8 — Ask Better Questions
- **Goal:** Stack clauses together — filter, group, and use `HAVING` to ask sharper questions of your data.
- **Learning objectives:** Compose multi-clause queries; filter on aggregated groups with `HAVING`; sequence a full investigation.
- **Standards:** `2-DA-08`, `2-DA-09` (refine analysis based on results), CSTA Draft 3.0 `MS-DAA-23` (sort/filter/group/aggregate).
- **Evidence of mastery:** Returns correct results from a layered `WHERE`+`GROUP BY`+`HAVING` query.
- **Vocabulary:** `HAVING`, clause order, aggregate filter.

- **Checkpoint (no new lesson):** This is the natural midpoint. Re-do any Week 1–4 scratch query that
  felt shaky **before** starting the charts strand — the visualization weeks assume you can comfortably
  `SELECT`, `WHERE`, `ORDER BY`, `GROUP BY`, and `JOIN`.
- **Talk-about-it / ethics:** Joining tables links data about *people*. What privacy responsibilities come with that?

### Week 5 — Comparing with Charts ⭐ visualization strand begins
**Week goal:** Turn query results into your first two chart types and choose the right one.
**Big idea:** *A chart is an argument — pick the type that fits the question.*

#### Session 1 · Lesson 9 — Tell the Story with Charts (bar)
- **Goal:** Shape query results into a chart — a label column and a number column — and let sorting tell the story.
- **Learning objectives:** (1) shape a query into a chartable **label + value** pair, (2) **choose an appropriate chart type** (bar = compare categories; line = change/trend; pie = parts of one whole), (3) read axes, labels, and scale, (4) explain how **design choices** (sorting, truncating, top-N) change the story.
- **Standards:** `3A-DA-11` (**create data visualizations**), `2-DA-08`, `1B-DA-06`, **Common Core `6.SP.B.4`**, CSTA Draft 3.0 `MS-DAA-26`.
- **Evidence of mastery:** Produces a chart-ready, grouped, sorted query; the chart renders; student explains a chart-type choice and one way a chart can mislead.
- **Vocabulary:** chart type, axis, label vs. value, scale, ranking, misleading axis.

#### Session 2 · Lesson 10 — Parts of a Whole (pie)
- **Goal:** Use a pie chart to show each item's share of all the orders — and learn when a pie helps and when it misleads.
- **Learning objectives:** Build a label + count query; understand a pie as **parts that sum to one whole**; judge **when a pie is appropriate** (2–6 mutually-exclusive parts) **and when it misleads** (too many slices, parts that don't sum to a whole, 3-D tilt).
- **Standards:** `3A-DA-11`, `2-DA-08`, **Common Core `6.SP.B.4`**, CSTA Draft 3.0 `MS-DAA-26`.
- **Evidence of mastery:** Returns `item, COUNT(*) AS order_count GROUP BY item` (6 slices); identifies the whole; explains one case where a pie misleads.
- **Vocabulary:** part/whole, share, slice, mutually exclusive, when-not-to-use-a-pie.

- **Do-it-yourself (self-paced):** Make a bar chart of orders per item, then the same data as a pie. Which is easier to read?
- **With some help:** Decide together: is "most popular item" better shown as a bar or a pie? Why?
- **Talk-about-it / ethics:** How can sorting or cropping a bar chart change the story it tells?

### Week 6 — Trends & Spread
**Week goal:** Show change over time, and show how a set of numbers is distributed.
**Big idea:** *Different questions need different pictures — time vs. spread.*

#### Session 1 · Lesson 11 — Change Over Time (line)
- **Goal:** Use a line chart to show how a number changes over time — and read the trend, peaks, and dips across a week.
- **Learning objectives:** Recognize **time** as the x-axis; `ORDER BY` a time key so the trend is honest; distinguish **line (change over time)** from **bar (separate categories)**; read trend, peak, and dip.
- **Standards:** `3A-DA-11`, `2-DA-08`, **Common Core `8.SP.A.1`**, CSTA Draft 3.0 `MS-DAA-26`.
- **Evidence of mastery:** Returns `weekday, orders ... ORDER BY day_num` (7 points) so the line reads left-to-right; finds the peak day; explains why shuffled time tells a false story.
- **Vocabulary:** time series, trend, x-axis = time, peak/dip, continuous vs. categorical.

#### Session 2 · Lesson 12 — Distributions (histogram)
- **Goal:** Use a histogram to see how a set of numbers is spread out — where scores cluster, and how high and low they reach.
- **Learning objectives:** Return **one numeric column** and read its **distribution** (bins); distinguish a histogram (shape of many numbers) from a bar chart (one number per category); reason about **spread** (range) and **clustering**; understand that **bin size changes the shape**.
- **Standards:** `2-DA-08`, **Common Core `6.SP.B.4`**, **`6.SP.B.5` / HS `S-ID.A.1`**, `3A-DA-11`, CSTA Draft 3.0 `MS-DAA-26`.
- **Evidence of mastery:** Returns the `score` column so the histogram renders; reports the count and the MAX (top of the spread); names the modal bin.
- **Vocabulary:** distribution, bin, frequency, spread/range, cluster, bin-size effect.

- **Do-it-yourself (self-paced):** Find the busiest day of the week; then describe the shape of the quiz-score histogram in one sentence.
- **With some help:** Why would a line chart be wrong for the quiz scores? Why is a histogram right?
- **Talk-about-it / ethics:** How can choosing wide vs. narrow bins change what a distribution "looks like"?

### Week 7 — Relationships & Planning
**Week goal:** Explore whether two numbers move together, then plan your capstone cafeteria briefing.
**Big idea:** *A relationship in data is a clue — not proof of cause.*

#### Session 1 · Lesson 13 — Relationships (scatter)
- **Goal:** Use a scatter plot to see whether two numbers are related — does more studying go with higher scores?
- **Learning objectives:** Return **two numeric columns** to plot one dot per record; identify a **positive/negative/no relationship**; articulate that **correlation is not causation**.
- **Standards:** `3A-DA-12`, `3A-DA-11`, **Common Core `8.SP.A.1` / HS `S-ID.B.6`**, CSTA Draft 3.0 `MS-DAA-26`.
- **Evidence of mastery:** Returns `study_minutes, score` (12 dots); reads the upward trend; states correlation ≠ causation and one alternative explanation.
- **Vocabulary:** scatter plot, bivariate, positive/negative relationship, correlation, causation, outlier.

#### Session 2 · Capstone Planning (design session — no new lesson)
A planning session so Week 8 isn't a cliff.
- **Plan your cafeteria briefing:** List the manager questions (explore counts, join receipts, filter, orders per student, total spend, top spender, popular item, big spenders via HAVING), the shared key, and which chart communicates spend.
- **Standards:** `2-DA-09` (plan/refine analysis), CSTA Draft 3.0 `MS-DAA-27` (plan an investigation).
- **Evidence of mastery:** A short plan: questions, steps, chart type, and one ethics note.

- **Self-paced note:** Keep your plan open next week — you'll execute it step-by-step from scratch in the capstone.

### Week 8 — Capstone: Cafeteria Briefing
**Week goal:** Run a complete multi-question investigation end-to-end and communicate answers with evidence.
**Big idea:** *You can now ask real questions, query for the answers from scratch, and brief a stakeholder honestly.*

#### Session 1 · Lesson 14 — Capstone: Cafeteria Briefing
- **Goal:** Complete a from-scratch cafeteria briefing on a richer two-table week (6 students, 21 orders): explore, join, filter, count, total, rank, popular item, HAVING, debug, and deliver a ranked spend chart.
- **Learning objectives:** Run a complete data investigation cycle across **multiple stakeholder questions**; write most queries without starters; communicate an evidence-based briefing with limitations.
- **Standards:** `3A-DA-11`, `3A-DA-12`, `2-DA-09`, CSTA Draft 3.0 `MS-DAA-27` (summarize the investigation: question, methods, limitations, evidence).
- **Evidence of mastery:** Completes the activity sequence (explore → join → filter → aggregates → ranks → HAVING → debug → final chart); identifies Casey as top spender ($18.75) and Pizza slice as most popular (5).
- **Vocabulary:** data investigation, briefing, evidence, conclusion, HAVING.

#### Session 2 · Showcase & Reflect (celebration — no new lesson)
- **Present:** Share your spend chart and state 2–3 briefing findings backed by the data.
- **Reflect (`MS-DAA-27`):** Write 2–3 sentences: your questions, how you found the answers, and one limitation of the data.
- **Ethics check (`3A-IC-29/30`):** You analyzed spending by person — how would you protect that data in the real world?

---

## Data-visualization coverage map

| Standard | Description | Where met | Depth |
| --- | --- | --- | --- |
| 1B-DA-06 | Present data visually to support a claim | W1 (read), W5 | ● |
| 2-DA-08 | Transform data to make it useful (incl. for presentation) | W2–W6 | ● |
| 3A-DA-11 | Create data visualizations with software tools | W5–W8 | ● |
| 3A-DA-12 | Represent relationships among data | W4 (L7), W7 (L13), W8 | ● |
| CCSS 6.SP.B.4 | Display numerical data in plots (incl. histograms) | W5, W6 (L12) | ● |
| CCSS 6.SP.B.5 / HS S-ID.A.1 | Summarize / describe spread & shape | W3 (L6), W6 (L12) | ● |
| CCSS 8.SP.A.1 | Scatter plots / bivariate association | W6 (L11), W7 (L13) | ● |
| Draft 3.0 MS-DAA-26 | Design choices change interpretation | W5–W7 | ● |

● strong  ◐ partial  ○ not yet

## Visualization strand — chart-type coverage

| Chart | Week / Lesson | Question it answers | Dataset |
| --- | --- | --- | --- |
| Bar | W5 / L9 | Compare separate categories | `lunch_orders` |
| Pie | W5 / L10 | Each part's share of one whole | `lunch_orders` |
| Line | W6 / L11 | How a number changes over time | `daily_orders` |
| Histogram | W6 / L12 | How one set of numbers is spread out | `quiz_scores` |
| Scatter | W7 / L13 | Whether two numbers are related | `study_log` |

Every visualization lesson also teaches **chart-type selection** and **how design choices mislead**
(`MS-DAA-26`), so students leave able to *choose* and *critique* charts, not just produce them.

## No-gaps design notes

The 8-week structure closes the spots where self-paced data learners most often stall:

1. **Precise questions first (W1–W2)** before any aggregation, so filtering isn't confused with summarizing.
2. **A mid-program checkpoint (W4)** ensures core querying (`SELECT/WHERE/ORDER BY/GROUP BY/JOIN`) is solid *before* the chart weeks depend on it.
3. **One chart idea at a time (W5–W7)** — comparison, then time, then spread, then relationship — instead of dumping all chart types at once.
4. **A capstone planning session (W7)** removes the Week-8 cliff so every learner arrives with a question and a plan.
5. **Reflection + data ethics/privacy (W8)** are built in, not optional.

## Optional future enhancements (not required for accreditation)

1. **Box plots / five-number summary** — extend distributions (W6) toward HS `S-ID.A.2`. *Needs a box-plot renderer.*
2. **Trend line / line of best fit on the scatter** — quantify the relationship (W7) toward HS `S-ID.B.6`. *Needs a regression overlay.*
3. **"Compare the same data" critique activity** — a side-by-side misleading-vs-honest chart exercise to deepen `MS-DAA-26`. *Text/UI only.*

---

## CHANGELOG

- **2026-08:** Expanded every Data Analyst workbook into scrollable spreadsheet-scale sample data:
  `lunch_orders` (20), School DB (8×24), Capstone (10×41), `daily_orders` (14 / two weeks),
  `quiz_scores` (32), `study_log` (24). Rebuilt **Lesson 14** as **Capstone: Cafeteria Briefing** with
  **14 from-scratch / predict / debug activities**. Week 7 planning targets a multi-question briefing.
- **2026-06 (c):** Reformatted into an **8-week program** (two sessions/week) with explicit week themes,
  self-paced **Do-it-yourself** tasks, **With-some-help** prompts, a **mid-program checkpoint** (W4),
  a **capstone planning** session (W7), and a **showcase/reflect** session (W8). Lesson content and
  standards unchanged; structure now supports independent or lightly-assisted learning.
- **2026-06 (b):** Added a full **five-chart visualization strand**. New lessons: **L10 Parts of a Whole
  (pie)**, **L11 Change Over Time (line)**, **L12 Distributions (histogram)**, **L13 Relationships
  (scatter)**. The chart engine gained **histogram** and **scatter** renderers; three new seed tables
  were added (`daily_orders`, `quiz_scores`, `study_log`). The capstone moved to **L14**. Track grew
  from 10 → 14 lessons (50 → 700 XP).
- **2026-06 (a):** Lesson 9 teaching content enriched to explicitly cover **chart-type selection**
  (bar vs. line vs. pie) and **how design choices change interpretation** ("how charts lie").
