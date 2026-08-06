#!/usr/bin/env node
/**
 * Generates facilitator session guides for every catalog lesson from lib/tracks.ts
 * plus enrichment from Python/Data lesson configs when available.
 *
 * Usage: node scripts/generate-facilitator-guides.mjs
 * Skips existing python-week-1 hand-authored guides unless --force-python-w1.
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "docs/curriculum/facilitator-guides");
const FORCE_PY_W1 = process.argv.includes("--force-python-w1");

function read(p) {
  return fs.readFileSync(path.join(ROOT, p), "utf8");
}

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function write(file, body) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, body);
}

function unescapeTsString(s) {
  return s
    .replace(/\\n/g, "\n")
    .replace(/\\`/g, "`")
    .replace(/\\\$/g, "$")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
}

function parseWeekPlans(src, constName) {
  const re = new RegExp(
    `export const ${constName}: WeekPlan\\[\\] = \\[([\\s\\S]*?)\\];`
  );
  const m = src.match(re);
  if (!m) return [];
  return [...m[1].matchAll(/\{\s*week:\s*(\d+),\s*theme:\s*"([^"]*)",\s*focus:\s*"([^"]*)"\s*\}/g)].map(
    (x) => ({ week: +x[1], theme: x[2], focus: x[3] })
  );
}

function parseLessons(src, constName) {
  const re = new RegExp(`const ${constName}: LessonRow\\[\\] = \\[([\\s\\S]*?)\\];`);
  const m = src.match(re);
  if (!m) return [];
  const body = m[1];
  const lessons = [];
  const objRe = /\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
  let om;
  while ((om = objRe.exec(body))) {
    const o = om[1];
    const id = o.match(/id:\s*"([^"]+)"/)?.[1];
    const title = o.match(/title:\s*"([^"]+)"/)?.[1];
    const href = o.match(/href:\s*"([^"]+)"/)?.[1];
    const xp = +(o.match(/xp:\s*(\d+)/)?.[1] || 0);
    const badgeName = o.match(/badgeName:\s*"([^"]*)"/)?.[1] || "";
    const week = +(o.match(/week:\s*(\d+)/)?.[1] || 0);
    const session = +(o.match(/session:\s*(\d+)/)?.[1] || 0);
    const kind = o.match(/kind:\s*"([^"]+)"/)?.[1] || "lesson";
    if (!id || !title || !week) continue;
    lessons.push({ id, title, href, xp, badgeName, week, session, kind });
  }
  return lessons;
}

function enrichPython(lessonNum) {
  const file = path.join(ROOT, `lib/pythonLessons/lesson${lessonNum}.ts`);
  if (!fs.existsSync(file)) return {};
  const t = fs.readFileSync(file, "utf8");
  const goal = t.match(/goal:\s*"((?:\\.|[^"\\])*)"/)?.[1];
  let script =
    t.match(/instructorScript:\s*"((?:\\.|[^"\\])*)"/)?.[1] ||
    t.match(/instructorScript:\s*`([\s\S]*?)`/)?.[1];
  if (script) script = unescapeTsString(script).trim();
  const stepsMatch = t.match(/steps:\s*\[([\s\S]*?)\],\s*\n\s*cfu/);
  const steps = stepsMatch
    ? [...stepsMatch[1].matchAll(/"((?:\\.|[^"\\])*)"/g)].map((m) => unescapeTsString(m[1]))
    : [];
  const tryThisMatch = t.match(/tryThis:\s*\[([\s\S]*?)\],/);
  const tryThis = tryThisMatch
    ? [...tryThisMatch[1].matchAll(/"((?:\\.|[^"\\])*)"/g)].map((m) => unescapeTsString(m[1]))
    : [];
  return {
    goal: goal ? unescapeTsString(goal) : undefined,
    coach: script,
    steps,
    tryThis,
    mode: "code",
  };
}

function enrichData(lessonNum) {
  const file = path.join(ROOT, `lib/dataLessons/lesson${lessonNum}.ts`);
  if (!fs.existsSync(file)) return {};
  const t = fs.readFileSync(file, "utf8");
  const goal = t.match(/goal:\s*"((?:\\.|[^"\\])*)"/)?.[1];
  let script =
    t.match(/instructorScript:\s*"((?:\\.|[^"\\])*)"/)?.[1] ||
    t.match(/instructorScript:\s*`([\s\S]*?)`/)?.[1];
  if (script) script = unescapeTsString(script).trim();
  return {
    goal: goal ? unescapeTsString(goal) : undefined,
    coach: script,
    mode: "sql",
  };
}

/** Heuristic standards + pedagogy by track */
const TRACK_META = {
  "ai-python": {
    folder: "python",
    label: "Python & AI",
    time: "45–60 min",
    materials: "Browser devices · projector · keyboard for coding",
    standardsDefault: "CSTA 2-AP / 3A-AP (see track doc)",
    pedagogy: "code",
    imagePrefix: "python",
  },
  "data-analyst": {
    folder: "data",
    label: "Data Analyst",
    time: "45–60 min",
    materials: "Browser devices · projector · SQL workspace visible",
    standardsDefault: "CSTA 2-DA / 3A-DA · CCSS SP (see track doc)",
    pedagogy: "sql",
    imagePrefix: "data",
  },
  "ai-literacy": {
    folder: "ai-literacy",
    label: "AI Literacy",
    time: "40–55 min",
    materials: "Browser devices · projector · discussion space",
    standardsDefault: "ISTE · CSTA IC (see literacy crosswalk)",
    pedagogy: "quiz",
    imagePrefix: "ai",
  },
  "advanced-ai": {
    folder: "advanced-ai",
    label: "Advanced AI",
    time: "50–70 min",
    materials: "Browser devices · projector · note-taking for audits",
    standardsDefault: "CSTA AI specialty / IC · DA",
    pedagogy: "studio",
    imagePrefix: "aai",
  },
  "ap-csp-prep": {
    folder: "ap-csp",
    label: "AP CSP Prep",
    time: "45–60 min",
    materials: "Browser devices · projector · Create PT notes as needed",
    standardsDefault: "College Board Big Ideas (prep — not official AP)",
    pedagogy: "quiz",
    imagePrefix: "csp",
  },
  "digital-literacy": {
    folder: "digital",
    label: "Digital Literacy",
    time: "40–55 min",
    materials: "Browser devices · projector · scenario discussion",
    standardsDefault: "CSTA 3A CS / NI / IC / DA",
    pedagogy: "quiz",
    imagePrefix: "dl",
  },
  cybersecurity: {
    folder: "cyber",
    label: "Cybersecurity",
    time: "45–60 min",
    materials: "Browser devices · projector · no live-system attacks",
    standardsDefault: "CSTA 3A/3B security & IC",
    pedagogy: "quiz",
    imagePrefix: "cs",
  },
  "financial-literacy": {
    folder: "finance",
    label: "Financial Literacy",
    time: "40–55 min",
    materials: "Browser devices · projector · age-appropriate money examples",
    standardsDefault: "Jump$tart / CEE 2021",
    pedagogy: "quiz",
    imagePrefix: "fl",
  },
};

function warmUp(trackId, title, weekTheme) {
  if (trackId === "ai-python") return `Ask: “In one sentence, what should our AI helper be able to do after today?” (tie to: ${title})`;
  if (trackId === "data-analyst") return `Ask a real-world question the data could answer today (theme: ${weekTheme}).`;
  if (trackId === "cybersecurity") return `Ask: “What’s one cyber risk you already manage every day?”`;
  if (trackId === "financial-literacy") return `Ask: “What’s one money decision teens face this month?”`;
  if (trackId === "digital-literacy") return `Ask: “Where did you evaluate something online this week?”`;
  if (trackId === "ai-literacy" || trackId === "advanced-ai")
    return `Ask: “Where did you see AI today — and was it helpful or risky?”`;
  if (trackId === "ap-csp-prep") return `Ask: “Which Big Idea does today’s lesson touch — and why does it matter on the exam / Create PT?”`;
  return `Activate prior knowledge with a 1-minute pair share about: ${title}.`;
}

function runOfShow(meta, lesson, week, enrich) {
  const pedagogy = meta.pedagogy;
  if (pedagogy === "code" || pedagogy === "sql") {
    const practiceLabel = pedagogy === "sql" ? "guided query → scratch query" : "guided fill → scratch";
    const checkLabel = pedagogy === "sql" ? "result rows / chart" : "Run & check + CFU";
    return `| Minutes | Phase | Facilitator | Students |
| ---: | --- | --- | --- |
| 0–5 | **Warm-up** | ${warmUp(lesson.trackId, lesson.title, week.theme)} | Think / pair share |
| 5–15 | **Teach** | Open Lesson tab; paraphrase coach’s note / Word help | Follow along |
| 15–40 | **Practice** | Circulate; hints before answers; celebrate first green checks | ${practiceLabel} |
| 40–50 | **Check** | ${checkLabel}; ask “what does this prove?” | Answer / show output |
| 50–60 | **Close** | Exit ticket + preview next session | One-sentence reflection |`;
  }
  if (pedagogy === "studio") {
    return `| Minutes | Phase | Facilitator | Students |
| ---: | --- | --- | --- |
| 0–5 | **Warm-up** | ${warmUp(lesson.trackId, lesson.title, week.theme)} | Quick share |
| 5–20 | **Teach** | Frame the system decision / metric / risk | Take notes; ask clarifying Qs |
| 20–50 | **Studio** | Circulate; require written rationale before “ship” claims | Build / evaluate / audit tasks |
| 50–60 | **Defend** | Cold-call one tradeoff (fairness, privacy, cost, accuracy) | 60-sec defend |
| 60–70 | **Close** | Exit ticket | Reflection |`;
  }
  // quiz / literacy
  return `| Minutes | Phase | Facilitator | Students |
| ---: | --- | --- | --- |
| 0–5 | **Warm-up** | ${warmUp(lesson.trackId, lesson.title, week.theme)} | Pair share |
| 5–20 | **Teach** | Walk Lesson slides; emphasize one big idea from: *${week.focus}* | Follow Lesson tab |
| 20–40 | **Apply** | Scenario / discussion; push for justified recommendations | Discuss + decide |
| 40–50 | **Check** | Knowledge check / quiz; review wrong answers as teaching | Complete check |
| 50–55 | **Close** | Exit ticket | One takeaway |`;
}

function commonMistakes(meta) {
  if (meta.pedagogy === "code") {
    return `- Quotes / spaces / \`Print\` vs \`print\`\n- Skipping Run & check after a change\n- Hard-coding answers instead of using variables / \`input()\``;
  }
  if (meta.pedagogy === "sql") {
    return `- Forgetting \`FROM\` / wrong table name\n- Filtering after aggregating (or vice versa) without intent\n- Reading the chart without reading the query result`;
  }
  if (meta.pedagogy === "studio") {
    return `- Jumping to tools before framing the decision\n- Metrics without owners / human gates\n- Ignoring privacy or fairness tradeoffs`;
  }
  return `- Clicking through quiz without discussing why\n- Slogan answers (“just be safe”) without a concrete control or habit\n- Treating AI / policy claims as facts without a verification step`;
}

function sessionGuide({ trackId, meta, lesson, week, enrich }) {
  const goal =
    enrich.goal ||
    `Complete **${lesson.title}** and demonstrate the week focus: ${week.focus}`;
  const imgBase = `${meta.imagePrefix}-w${lesson.week}-s${lesson.session}`;
  const href = lesson.href || "#";
  const coachBlock = enrich.coach
    ? `### Coach’s note (from product — paraphrase)

${enrich.coach.split("\n").map((l) => (l.trim() ? l : "")).join("\n").slice(0, 1800)}
`
    : `### Teaching focus

Week theme: **${week.theme}**.  
Focus: ${week.focus}

Keep the session on one job: students can explain today’s idea in plain language and show evidence in the product (exercise success, quiz, or studio artifact).
`;

  const stepsBlock =
    enrich.steps?.length > 0
      ? `### Guided steps (product)

${enrich.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}
`
      : "";

  const tryBlock =
    enrich.tryThis?.length > 0
      ? `### Try This / stretch

${enrich.tryThis.map((t) => `- ${t}`).join("\n")}
`
      : "";

  const objectives =
    meta.pedagogy === "code" || meta.pedagogy === "sql"
      ? `1. State today’s goal in one sentence.\n2. Complete guided practice with feedback.\n3. Complete the scratch / unaided challenge (or equivalent).\n4. Pass the lesson check (exercise success and/or CFU).`
      : `1. Explain today’s big idea in plain language.\n2. Apply it to at least one realistic scenario.\n3. Complete the in-lesson check / quiz with justifiable answers.\n4. Name one habit or next action they’ll keep.`;

  return `# Facilitator guide — ${meta.label} · Week ${lesson.week} · Session ${lesson.session}

**Lesson id:** \`${lesson.id}\`${href ? ` · **URL:** \`${href}\`` : ""}${
    lesson.kind === "assessment" ? " · **Kind:** assessment" : ""
  }

---

## 1. Session snapshot

| Field | Value |
| --- | --- |
| **Track / lesson id** | \`${trackId}\` / \`${lesson.id}\` |
| **Title** | ${lesson.title} |
| **Time** | ${lesson.kind === "assessment" ? "40–60 min (exam block)" : meta.time} |
| **Week theme** | ${week.theme} |
| **Student goal** | ${goal} |
| **Standards** | ${meta.standardsDefault} |
| **Materials** | ${meta.materials} |
| **XP / badge** | ${lesson.xp || "—"} · ${lesson.badgeName || "—"} |

**Learning objectives**

${objectives}

---

## 2. Pre-class setup

- [ ] Open \`${href}\` on the projector (lesson loads)
- [ ] Confirm Help / Guidance panel is reachable
- [ ] Decide self-paced vs live cohort pacing
- [ ] Optional: complete the first check yourself
${
  lesson.kind === "assessment"
    ? "- [ ] Confirm exams are unlocked only after required lessons (product gating)\n"
    : ""
}- [ ] Bookmark instructor progress for end-of-class glance

**Projector tips:** Zoom ~110%; keep feedback / console / quiz results visible when demoing.

---

## 3. Run of show

${runOfShow(meta, { ...lesson, trackId }, week, enrich)}

${coachBlock}
${stepsBlock}${tryBlock}
---

## 4. Screenshot callouts

| ID | Capture | Filename |
| --- | --- | --- |
| A | Lesson hero / title + goal | \`${imgBase}-hero.png\` |
| B | Lesson / Exercises (or Quiz) tabs | \`${imgBase}-tabs.png\` |
| C | Help / Coach guidance open | \`${imgBase}-help.png\` |
| D | Main workspace (editor, query, or quiz) | \`${imgBase}-editor.png\` |
| E | Success / check state | \`${imgBase}-run.png\` |
| F | Evidence panel (console, chart, or score) | \`${imgBase}-console.png\` |

![Hero placeholder](../../images/${imgBase}-hero.png)

**Capture checklist:** local unlock → \`${href}\` → Lesson → Practice/Quiz → success state → save under \`facilitator-guides/images/\`.

---

## 5. What “good” looks like

- **Mastery signal:** Student can restate the goal and show product evidence (green check, quiz pass, or studio artifact) without reading the answer key.
- **Common mistakes:**
${commonMistakes(meta)}
- **Differentiation:**
  - **Needs support:** Stay on guided path; re-read Help / Word help; use hints before scratch.
  - **Ready for more:** Try This / stretch scenario; teach-back to a peer in 60 seconds.

---

## 6. Exit ticket & instructor progress

**Exit ticket:** *What can you do now that you couldn’t do before this session — and how do you know?*

**Progress check:** Confirm lesson opened + check success (exercise / quiz / assessment). Incomplete usually means stuck on a single concept — return to Help, not a new lecture.
`;
}

function weekReadme(meta, trackId, week, sessions) {
  return `# ${meta.label} · Week ${week.week} — ${week.theme}

**Week focus:** ${week.focus}  
**Track:** \`${trackId}\`

## Sessions

| Session | Lesson id | Title | Guide |
| :---: | --- | --- | --- |
${sessions
  .map(
    (l) =>
      `| ${l.session} | \`${l.id}\` | ${l.title} | [session-${l.session}.md](session-${l.session}.md) |`
  )
  .join("\n")}

## Materials

${meta.materials}

## Facilitation note

Use the session guides in order. Keep one job per session. Capture screenshots into \`../../images/\` using the filenames listed in each guide.
`;
}

function trackReadme(meta, trackId, weeks, lessons) {
  const byWeek = new Map();
  for (const l of lessons) {
    if (!byWeek.has(l.week)) byWeek.set(l.week, []);
    byWeek.get(l.week).push(l);
  }
  const rows = [...byWeek.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([w, ls]) => {
      const theme = weeks.find((x) => x.week === w)?.theme || `Week ${w}`;
      return `| ${w} | ${theme} | ${ls.length} | [week-${w}/](week-${w}/) |`;
    })
    .join("\n");

  return `# ${meta.label} — Facilitator guides

**Guide status:** full session guides  
**Catalog track id:** \`${trackId}\`  
**Lessons:** ${lessons.filter((l) => l.kind !== "assessment").length} instructional${
    lessons.some((l) => l.kind === "assessment")
      ? ` + ${lessons.filter((l) => l.kind === "assessment").length} assessments`
      : ""
  }

## Weeks

| Week | Theme | Sessions | Folder |
| ---: | --- | ---: | --- |
${rows}

## How to run

1. Open the week folder → session guide.
2. Complete pre-class setup.
3. Follow the run of show.
4. Close with exit ticket; check instructor progress.

Template: [\`../_template.md\`](../_template.md) · Images: [\`../images/\`](../images/)
`;
}

// --- main ---
const tracksSrc = read("lib/tracks.ts");

const TRACKS = [
  {
    id: "ai-python",
    lessonsConst: "PYTHON_LESSONS",
    weeksConst: "PYTHON_WEEKS",
    enrich: (l) => {
      const n = l.id.match(/^lesson-(\d+)$/)?.[1];
      return n ? enrichPython(n) : {};
    },
  },
  {
    id: "data-analyst",
    lessonsConst: "DATA_ANALYST_LESSONS",
    weeksConst: "DATA_ANALYST_WEEKS",
    enrich: (l) => {
      const n = l.id.match(/^da-(\d+)$/)?.[1];
      return n ? enrichData(n) : {};
    },
  },
  {
    id: "ai-literacy",
    lessonsConst: "AI_LITERACY_LESSONS",
    weeksConst: "AI_LITERACY_WEEKS",
    enrich: () => ({}),
  },
  {
    id: "advanced-ai",
    lessonsConst: "ADVANCED_AI_LESSONS",
    weeksConst: "ADVANCED_AI_WEEKS",
    enrich: () => ({}),
  },
  {
    id: "ap-csp-prep",
    lessonsConst: "AP_CSP_PREP_LESSONS",
    weeksConst: "AP_CSP_PREP_WEEKS",
    enrich: () => ({}),
  },
  {
    id: "digital-literacy",
    lessonsConst: "DIGITAL_LITERACY_LESSONS",
    weeksConst: "DIGITAL_LITERACY_WEEKS",
    enrich: () => ({}),
  },
  {
    id: "cybersecurity",
    lessonsConst: "CYBERSECURITY_LESSONS",
    weeksConst: "CYBERSECURITY_WEEKS",
    enrich: () => ({}),
  },
  {
    id: "financial-literacy",
    lessonsConst: "FINANCIAL_LITERACY_LESSONS",
    weeksConst: "FINANCIAL_LITERACY_WEEKS",
    enrich: () => ({}),
  },
];

let written = 0;
let skipped = 0;

for (const t of TRACKS) {
  const meta = TRACK_META[t.id];
  const lessons = parseLessons(tracksSrc, t.lessonsConst);
  const weeks = parseWeekPlans(tracksSrc, t.weeksConst);
  const trackDir = path.join(OUT, meta.folder);
  write(path.join(trackDir, "README.md"), trackReadme(meta, t.id, weeks, lessons));

  const byWeek = new Map();
  for (const l of lessons) {
    if (!byWeek.has(l.week)) byWeek.set(l.week, []);
    byWeek.get(l.week).push(l);
  }

  for (const [weekNum, sessions] of [...byWeek.entries()].sort((a, b) => a[0] - b[0])) {
    const week = weeks.find((w) => w.week === weekNum) || {
      week: weekNum,
      theme: `Week ${weekNum}`,
      focus: "",
    };
    const weekDir = path.join(trackDir, `week-${weekNum}`);
    const sorted = sessions.sort((a, b) => a.session - b.session || a.id.localeCompare(b.id));
    write(path.join(weekDir, "README.md"), weekReadme(meta, t.id, week, sorted));

    for (const lesson of sorted) {
      // Preserve hand-authored Python Week 1 guides in python-week-1/
      if (
        t.id === "ai-python" &&
        weekNum === 1 &&
        !FORCE_PY_W1
      ) {
        // Still write into python/week-1 for a unified tree, but mark pointer
        const pointer = `# Facilitator guide — Python & AI · Week 1 · Session ${lesson.session}

Hand-authored guide (with screenshots):  
→ [../../python-week-1/session-${lesson.session}.md](../../python-week-1/session-${lesson.session}.md)

Week overview: [../../python-week-1/README.md](../../python-week-1/README.md)
`;
        write(path.join(weekDir, `session-${lesson.session}.md`), pointer);
        skipped++;
        continue;
      }

      const enrich = t.enrich(lesson);
      const body = sessionGuide({
        trackId: t.id,
        meta,
        lesson,
        week,
        enrich,
      });
      // Assessments may share a week/session; use id suffix if collision
      const baseName = `session-${lesson.session}`;
      const fileName =
        lesson.kind === "assessment"
          ? `${baseName}-${lesson.id}.md`
          : sorted.filter((x) => x.session === lesson.session).length > 1 &&
              lesson.kind === "assessment"
            ? `${baseName}-${lesson.id}.md`
            : `${baseName}.md`;
      // If two lessons same session (shouldn't for normal), disambiguate
      let outFile = path.join(weekDir, fileName);
      if (fs.existsSync(outFile) && lesson.kind === "assessment") {
        outFile = path.join(weekDir, `${baseName}-${lesson.id}.md`);
      }
      write(outFile, body);
      written++;
    }
  }
}

// Root index
const index = `# Facilitator guides

Session-ready materials for every Kanam Academy track. Markdown is the source of truth.

## Tracks (full guides)

| Track | Folder | Status |
| --- | --- | --- |
| Python & AI | [python/](python/) · [python-week-1/](python-week-1/) (illustrated W1) | Full |
| Data Analyst | [data/](data/) | Full |
| AI Literacy | [ai-literacy/](ai-literacy/) | Full |
| Advanced AI | [advanced-ai/](advanced-ai/) | Full |
| AP CSP Prep | [ap-csp/](ap-csp/) | Full |
| Digital Literacy | [digital/](digital/) | Full |
| Cybersecurity | [cyber/](cyber/) | Full |
| Financial Literacy | [finance/](finance/) | Full |

## Shared

| Path | Role |
| --- | --- |
| [\`_template.md\`](_template.md) | Session guide template |
| [\`images/\`](images/) | Screenshot assets + capture checklist |
| [\`outlines/\`](outlines/) | Legacy one-pagers (superseded; kept for quick scan) |

## How to run a session

1. Open the track → week → session guide.
2. Complete **Pre-class setup**.
3. Follow the minute-by-minute run of show.
4. Use **What “good” looks like** while circulating.
5. Close with the exit ticket; check instructor progress.

## Regeneration

\`\`\`bash
node scripts/generate-facilitator-guides.mjs
\`\`\`

Python Week 1 hand-authored guides in \`python-week-1/\` are preserved (pointers from \`python/week-1/\`). Pass \`--force-python-w1\` to overwrite generated copies only.

## Cognia / PD

Supports Cognia STEM Standard 3 (STEM-specific professional learning). Pair with a site PD hours log — see [cognia-stem-evidence.md](../cognia-stem-evidence.md).
`;

write(path.join(OUT, "README.md"), index);

// Update outlines README
write(
  path.join(OUT, "outlines", "README.md"),
  `# Track facilitator outlines (legacy)

These one-pagers are **superseded** by full session guides:

| Track | Full guides |
| --- | --- |
| Data Analyst | [../data/](../data/) |
| AI Literacy | [../ai-literacy/](../ai-literacy/) |
| Advanced AI | [../advanced-ai/](../advanced-ai/) |
| AP CSP Prep | [../ap-csp/](../ap-csp/) |
| Digital Literacy | [../digital/](../digital/) |
| Cybersecurity | [../cyber/](../cyber/) |
| Financial Literacy | [../finance/](../finance/) |

Kept for a quick week-at-a-glance scan. Prefer the full session guides for live facilitation.
`
);

console.log(JSON.stringify({ written, skippedPointers: skipped }, null, 2));
