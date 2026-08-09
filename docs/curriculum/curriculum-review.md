# Kanam Academy — Comprehensive Curriculum Review

**Review date:** July 2026 · **Source of truth for counts:** [`lib/tracks.ts`](../../lib/tracks.ts)  
**Purpose:** Accreditation-ready audit of catalog sync, pedagogy consistency, standards coverage, and Cognia STEM readiness. Companion evidence map: [cognia-stem-evidence.md](cognia-stem-evidence.md).

---

## 1. Catalog sync audit

Live product catalog vs curriculum docs (lesson rows with `kind !== "assessment"` unless noted).

| Track (catalog id) | Lessons in code | Capstone / culminating | Assessments | Docs status (this review) |
| --- | ---: | --- | --- | --- |
| Python & AI (`ai-python`) | **14** | L13 NPC · L14 Quest Adventure Bot | — | Synced (was 13 in README / python-track header) |
| Data Analyst (`data-analyst`) | **14** | L14 Your Data Project | — | Synced |
| AI Literacy (`ai-literacy`) | **16** | L16 AI-Smart Citizen | — | Listed in README |
| Advanced AI (`advanced-ai`) | **16** | L15–16 build / demo-audit | — | Synced |
| AP CSP Prep (`ap-csp-prep`) | **16** | L15 Create PT · L16 exam readiness | **+3** practice/final exams | Synced |
| Digital Literacy (`digital-literacy`) | **16** | L16 Evaluate Impacts & Act | — | Synced |
| Cybersecurity (`cybersecurity`) | **16** | L16 Defend & Justify | — | Synced |
| Financial Literacy (`financial-literacy`) | **16** | L16 First-Year Money Plan | — | Synced |

**Totals:** **124** instructional lessons · **127** catalog rows including AP CSP assessments.

### Python pacing note (code vs narrative)

| Week | Theme (code) | Sessions in catalog |
| --- | --- | --- |
| 1 | Meet Your AI Helper | L1, L2 |
| 2 | Teaching AI to Decide | L3, L4 |
| 3 | Repeating Work | L5, L6 |
| 4 | Patterns & State | **L7 only** (W4·S2 is consolidation/planning in docs, not a separate lesson id) |
| 5 | Giving AI a Memory | L8, L9 |
| 6 | Reusable Skills | L10, L11 |
| 7 | Smart, Rule-Driven AI | **L12 only** (W7·S2 = capstone planning session in docs) |
| 8 | Capstone | L13, L14 |

XP ladder (Python): **50 → 800** (L14). Total possible XP if all Python lessons completed: **5,850**.

---

## 2. Pedagogy consistency

| Track | Coach notes (`instructorScript`) | CFU / quiz pattern | Hands-on exercises | Projects / capstones |
| --- | --- | --- | --- | --- |
| Python | Yes (all 14) | Real CFU Q&A per lesson | Fill / match / scratch + Run & check | L13–L14 |
| Data | Yes (all 14) | Real CFU Q&A per lesson (3 each) | SQL/query exercises + charts | L14 |
| AI Literacy | Yes (`instructorScript`) | Lesson quizzes | Interactive literacy activities | L16 |
| Advanced AI | Yes (`instructorScript`) | Quizzes / studio checks | Build-eval-audit activities | L15–L16 |
| AP CSP Prep | Yes (`instructorScript`) | Quizzes + gated exams | Create PT studio | L15–16 + 3 exams |
| Digital / Cyber / Finance | Yes (`instructorScript`) | Quiz-first literacy pattern | Scenario / decision tasks | Week 8 capstones |

**Callouts**

1. **Literacy tracks** rely on quizzes rather than Python-style CFUs; use [shared rubrics](facilitator-guides/rubrics/) for portfolio/showcase evidence.
2. **Coach notes** — Python, Data, and all AILessonCanvas tracks (`instructorScript` in Help pocket).
3. **Help Pocket / Lesson module** — product surfaces for guided teaching; instructor progress rollups support observation evidence.
4. **Collaboration** — Python W7–8 product tryThis/CFU + facilitator paired protocols + [collaboration rubric](facilitator-guides/rubrics/collaboration-attribution.md).

---

## 3. Standards coverage heatmap

Qualitative coverage by CSTA 2017 concept families (● strong · ◐ partial · ○ light / roadmap). Detail: [standards-alignment.md](standards-alignment.md).

| Concept | Python | Data | AI Lit | Adv AI | AP CSP | Digital | Cyber | Finance* |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| AP — Algorithms & Programming | ● | ◐ | ○ | ◐ | ● | ○ | ○ | ○ |
| DA — Data & Analysis | ◐ | ● | ◐ | ● | ● | ◐ | ○ | ◐ |
| IC — Impacts of Computing | ● | ● | ● | ● | ● | ● | ● | ◐ |
| CS — Computing Systems | ○ | ○ | ○ | ◐ | ● | ● | ● | ○ |
| NI — Networks & Internet | ○ | ○ | ○ | ○ | ● | ● | ● | ○ |

\*Finance primarily Jump$tart/CEE; computing concepts are secondary.

### Roadmap gaps (curriculum content, not just docs)

| Gap | Standards | Status |
| --- | --- | --- |
| Collaboration & attribution | CSTA `2-AP-16`, `3A-AP-22` | **In product** — Python L12–14 + W7–8 guides + collaboration rubric |
| Deeper HS statistics | CCSS S-ID / advanced 3A DA | Data track covers viz + basic summarize; not full HS stats sequence |
| Computing systems depth (Python/Data) | CS concept | Covered mainly in Digital + AP CSP + Cyber |
| Shared performance rubrics | Cognia Std 9 | **Published** — [facilitator-guides/rubrics/](facilitator-guides/rubrics/) |
| PD hours / facilitator certification log | Cognia Std 3 | **Published** — [pd-hours-log.md](facilitator-guides/pd-hours-log.md) |

---

## 4. Cognia STEM readiness scorecard (Provider lens)

Rough **Red / Amber / Green** against Cognia STEM Performance Standards (effective July 2022). Full citations: [cognia-stem-evidence.md](cognia-stem-evidence.md).

| Std | Focus | Score | Notes |
| --- | --- | :---: | --- |
| 1 | Integrated STEM experiences | **Green** | Python+AI ethics, Data+math viz, Cyber/Digital real-world |
| 2 | Standards-aligned curriculum | **Green** | CSTA/ISTE/CCSS/Jump$tart crosswalks published |
| 3 | STEM-specific PD | **Green** | Facilitator guides + [PD hours log](facilitator-guides/pd-hours-log.md) + checklist |
| 4 | Community partners | **Green** | [MOU template](school-partner-mou-template.md) + pilot narrative; signed MOUs local |
| 5 | Stakeholder access | **Green** | [Parent communication kit](parent-communication-kit.md) + Parent hub / instructor |
| 6 | Inquiry-based learning | **Green** | LessonModule, Try This, Run & check, hints |
| 7 | Facilitated self-direction | **Green** | Coach notes, Help Pocket, self-paced + assisted modes |
| 8 | Extended STEM opportunities | **Green** | Capstones, Adventure mode, stretch Try This |
| 9 | Performance-based assessment | **Green** | Auto-checks + CFUs (Python/Data) + [capstone rubrics](facilitator-guides/rubrics/) |
| 10 | STEM literacy / next-level readiness | **Green** | 8-track pathways, AP CSP Prep, badges/XP |

**Overall Provider readiness:** **Green** for packaging — templates and in-product coaching/collaboration evidence are in-repo. Remaining work is **site-specific** (signed MOUs, filled pilot narratives, delivered parent messages).

---

## 5. Priority backlog

Ordered for curriculum/product work after this docs ship:

1. **Docs / accreditation packaging** — Cognia map, guides, CFUs, rubrics, PD log, MOU template, parent kit, literacy coach notes, Python collab (**done**).
2. **Site operations** — collect signed MOUs; fill pilot narratives; run parent kit cadence per school.
3. **In-app instructor link** to facilitator guides (optional product hook; not blocking accreditation docs).
4. **Deeper HS statistics / systems** — content roadmap items above (not Cognia packaging blockers).

---

## 6. Related documents

| Doc | Role |
| --- | --- |
| [README.md](README.md) | Curriculum index |
| [cognia-stem-evidence.md](cognia-stem-evidence.md) | STEM Provider evidence map + school appendix |
| [standards-alignment.md](standards-alignment.md) | CSTA/ISTE/CCSS master matrix |
| [facilitator-guides/](facilitator-guides/) | Session guides + outlines |
| [python-track.md](python-track.md) · [data-analyst-track.md](data-analyst-track.md) | Full scope & sequence |
