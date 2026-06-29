# Data Analyst Track — Curriculum

**Track length:** 10 lessons · **XP range:** 50 → 500 · **Grade band:** 6–10 (CSTA Level 2 core, reaching 3A)
**Primary emphasis:** the **data investigation cycle** — ask → query → transform → summarize → **visualize → communicate** — with a deliberate focus on **data visualization**.
**Engine:** a real in-browser SQLite database (`sql.js` / WebAssembly) plus an auto-rendering chart panel (bar / line / pie via Recharts). Students run real queries against real tables — no setup, no accounts.

> Standards codes below are **CSTA 2017**. Cross-curricular (Common Core Math) and forward-compatibility
> (CSTA Draft 3.0) codes are in the [master matrix](standards-alignment.md).

---

## Datasets

| Dataset | Tables | Used in | Purpose |
| --- | --- | --- | --- |
| `lunch_orders` | 1 table, 8 rows (order_id, student_name, item, price) | L1–L6, L8, L9 | Single-table querying, aggregation, charts |
| School DB | `students` + `orders` (shared key `student_id`) | L7, L10 | Relationships, JOINs, capstone |

A relatable, school-themed dataset keeps the cognitive load on *the concept*, not the domain.

---

## Scope & sequence

### Unit 1 — What Data Is (Lessons 1–3)

#### Lesson 1 — What Is Data?
- **Goal:** Learn rows, columns, and your first SQL commands — one exercise at a time, then put them together.
- **Learning objectives:** Define rows (records) and columns (fields/attributes); read a table; write `SELECT … FROM … LIMIT`.
- **Standards:** `2-DA-07` (represent/organize data into structured formats), `1B-DA-06` (read a data presentation).
- **Evidence of mastery:** Correctly returns specified columns/rows from `lunch_orders`.
- **Vocabulary:** row/record, column/field, table, query, `SELECT`, `FROM`, `LIMIT`.

#### Lesson 2 — Your First Query
- **Goal:** Write and run complete SQL queries — see every row, use `LIMIT`, and pick the columns you care about.
- **Learning objectives:** Compose complete queries; control how many rows return; select specific columns.
- **Standards:** `2-DA-08` (use computational tools to work with data), `2-AP-11` (data types).
- **Evidence of mastery:** Runs valid queries returning the requested shape.
- **Vocabulary:** clause, statement, result set.

#### Lesson 3 — Pick the Columns You Need
- **Goal:** Choose exactly the columns you want, control their order, and use `DISTINCT` to remove duplicates.
- **Learning objectives:** Project specific columns; reorder output; de-duplicate with `DISTINCT`.
- **Standards:** `2-DA-08` (transform data to make it more useful), `3A-DA-10` (organization choices).
- **Evidence of mastery:** Returns a de-duplicated, column-projected result.
- **Vocabulary:** projection, `DISTINCT`, duplicate.

### Unit 2 — Asking Questions of Data (Lessons 4–6)

#### Lesson 4 — Find What You're Looking For
- **Goal:** Use `WHERE` to filter rows — match text, compare numbers, and combine conditions with `AND` / `OR`.
- **Learning objectives:** Filter with conditions; combine compound conditions; compare data types correctly.
- **Standards:** `2-DA-08` (transform/filter), `2-AP-12` (compound conditionals — transfers from programming).
- **Evidence of mastery:** Returns exactly the rows matching the condition(s).
- **Vocabulary:** filter, predicate, `WHERE`, `AND`, `OR`, comparison.

#### Lesson 5 — Sort and Rank
- **Goal:** Use `ORDER BY` to sort rows, flip the direction with `DESC`, and combine with `LIMIT` to find top results.
- **Learning objectives:** Sort ascending/descending; build "top-N" rankings.
- **Standards:** `2-DA-08`, `1B-DA-07` (use data to rank / highlight).
- **Evidence of mastery:** Returns a correctly sorted / top-N result.
- **Vocabulary:** sort, `ORDER BY`, `ASC`/`DESC`, ranking.

#### Lesson 6 — Count and Summarize
- **Goal:** Turn many rows into one answer with `COUNT`, `SUM`, and `AVG` — then break totals down by group with `GROUP BY`.
- **Learning objectives:** Compute aggregates; group rows; interpret a summary as a *measure of center / total*.
- **Standards:** `2-DA-08` (transform/aggregate), **Common Core `6.SP.B.5`** (summarize numerical data sets).
- **Evidence of mastery:** Returns correct aggregate values, grouped where required (float-tolerant check on SUM/AVG).
- **Vocabulary:** aggregate, `COUNT`/`SUM`/`AVG`, `GROUP BY`, measure of center.

### Unit 3 — Relationships (Lesson 7)

#### Lesson 7 — Combine Tables
- **Goal:** Use `JOIN` to connect two tables — match orders to the students who placed them with a shared key.
- **Learning objectives:** Explain primary/foreign keys; join on a shared key; reason about relationships among data.
- **Standards:** `3A-DA-12` (represent relationships among data elements), `3A-DA-10` (organization tradeoffs).
- **Evidence of mastery:** Returns correctly joined rows across `students` and `orders`.
- **Vocabulary:** `JOIN`, key, relationship, foreign key.

### Unit 4 — Sharper Questions (Lesson 8)

#### Lesson 8 — Ask Better Questions
- **Goal:** Stack clauses together — filter, group, and use `HAVING` to ask sharper questions of your data.
- **Learning objectives:** Compose multi-clause queries; filter on aggregated groups with `HAVING`; sequence a full investigation.
- **Standards:** `2-DA-08`, `2-DA-09` (refine analysis based on results), CSTA Draft 3.0 `MS-DAA-23` (sort/filter/group/aggregate).
- **Evidence of mastery:** Returns correct results from a layered `WHERE`+`GROUP BY`+`HAVING` query.
- **Vocabulary:** `HAVING`, clause order, aggregate filter.

### Unit 5 — Visualization & Communication (Lessons 9–10) ⭐ emphasis

#### Lesson 9 — Tell the Story with Charts
- **Goal:** Shape query results into a chart — a label column and a number column — and let sorting tell the story.
- **Learning objectives:** Students will (1) shape a query into a chartable **label + value** pair, (2) **choose an appropriate chart type** for the question (bar = compare categories; line = change/trend; pie = parts of one whole), (3) read axes, labels, and scale, and (4) explain how **design choices** (sorting, truncating, top-N selection) change the story a chart tells.
- **Standards:** `3A-DA-11` (**create data visualizations** with software tools to help others understand phenomena), `2-DA-08` (transform for presentation), `1B-DA-06` (present data visually to support a claim), **Common Core `6.SP.B.4`** (display numerical data in plots), CSTA Draft 3.0 `MS-DAA-26` (design choices impact interpretation).
- **Evidence of mastery:** Produces a chart-ready, grouped, sorted query; the chart panel renders; student explains a chart-type choice and one way a chart can mislead.
- **Vocabulary:** chart type, axis, label vs. value, scale, ranking, misleading axis.

#### Lesson 10 — Your Data Project (Capstone)
- **Goal:** Put it all together — explore, join, summarize, and rank to answer a real question: who spent the most?
- **Learning objectives:** Run a complete data investigation (explore → join → aggregate → rank → visualize → conclude) and communicate an evidence-based answer.
- **Standards:** `3A-DA-11`, `3A-DA-12`, `2-DA-09`, CSTA Draft 3.0 `MS-DAA-27` (summarize the investigation: question, methods, limitations, evidence).
- **Evidence of mastery:** Joins + aggregates to a correct ranked result and renders the "total spent per student" chart.
- **Vocabulary:** data investigation, evidence, conclusion.

---

## Data-visualization coverage map

| Standard | Description | Where met | Depth |
| --- | --- | --- | --- |
| 1B-DA-06 | Present data visually to support a claim | L1 (read), L9, L10 | ◐→● |
| 2-DA-08 | Transform data to make it useful (incl. for presentation) | L3–L9 | ● |
| 3A-DA-11 | Create data visualizations with software tools | L9, L10 | ● |
| 3A-DA-12 | Represent relationships among data | L7, L10 | ● |
| CCSS 6.SP.B.4 | Display numerical data in plots | L9 | ◐ |
| CCSS 8.SP.A.1 | Scatter plots / bivariate association | — | ○ (see roadmap) |
| Draft 3.0 MS-DAA-26 | Design choices change interpretation | L9 | ◐ |

● strong  ◐ partial  ○ not yet

## Gap analysis & roadmap — strengthening data visualization

The track delivers the **full SQL investigation cycle** and meets the core visualization standard
(`3A-DA-11`). Because visualization is a stated priority — and because the chart engine already
supports **bar, line, and pie** — the following expansion is recommended to take the strand from
"meets" to "exemplary," reaching Common Core statistics standards and CSTA Draft 3.0 depth.

**Recommended new/expanded lessons (proposed — pending approval):**

1. **"Parts of a Whole" (pie charts) — new lesson.** Share-of-total (e.g., each item's % of all orders). Teaches when a pie is appropriate **and when it misleads** (too many slices, non-mutually-exclusive parts). Standards: `3A-DA-11`, `MS-DAA-26`. *Engine-ready (pie supported).*
2. **"Change Over Time" (line charts) — new lesson + dataset.** Requires a small **time-series dataset** (e.g., daily orders for a week). Teaches trends, axes, and continuous vs. categorical data. Standards: `3A-DA-11`, CCSS `8.SP`. *Needs one new seed table.*
3. **"Distributions" (histograms / spread) — new lesson.** Introduce frequency/distribution and measures of spread (range). Standards: CCSS `6.SP.B.4`, `S-ID.A.1`. *Needs a histogram renderer (small engine add).*
4. **"How Charts Lie" — expansion of Lesson 9 (text-only, low effort).** Explicit treatment of truncated axes, cherry-picked top-N, and scale manipulation, with a compare-the-same-data activity. Standards: `MS-DAA-26`, `3A-IC-25`. **Implemented now** as enriched teaching content in Lesson 9 (see CHANGELOG below).
5. **"Relationships" (scatter plots) — new lesson + renderer.** Bivariate association (e.g., grade vs. spend). Standards: CCSS `8.SP.A.1`, `S-ID.B.6`. *Needs a scatter renderer (engine add).*

**Effort summary**

| Item | Effort | Infra change |
| --- | --- | --- |
| #4 Enrich L9 ("How charts lie", chart-type selection) | Low | None — **done** |
| #1 Pie-chart lesson | Low | None (engine supports pie) |
| #2 Line/time-series lesson | Medium | +1 seed table |
| #3 Histograms | Medium | +histogram renderer |
| #5 Scatter plots | Medium | +scatter renderer |

Building #1 grows the track to 11 lessons; #1–#3 to 13; the full set to 15, giving a complete,
standards-exemplary visualization strand. Recommend approving #1 and #2 next.

---

## CHANGELOG

- **2026-06:** Lesson 9 teaching content enriched to explicitly cover **chart-type selection**
  (bar vs. line vs. pie) and **how design choices change interpretation** ("how charts lie"),
  aligning to `3A-DA-11`, CSTA Draft 3.0 `MS-DAA-26`, and Common Core `6.SP.B.4`. No engine change.
