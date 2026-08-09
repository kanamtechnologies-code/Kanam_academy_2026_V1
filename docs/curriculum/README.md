# Kanam Academy — Curriculum & Standards Alignment

This folder is the **authoritative curriculum documentation** for Kanam Academy. It is written
to support **accreditation review** and adoption by schools, districts, and pilot partners.

All tracks are structured as **8-week programs** (typically two sessions per week) designed to be completed
**self-paced or with light assistance** — no subject-matter expertise required from a supporting adult.

**Live catalog:** 8 tracks · **124** instructional lessons (+ 3 AP CSP assessments) — see [curriculum-review.md](curriculum-review.md).

### Tracks

- [Python & AI Foundations Track](python-track.md) — **8 weeks**, **14** interactive lessons (fundamentals focus)
- [Data Analyst Track](data-analyst-track.md) — **8 weeks**, 14 interactive lessons (data-visualization focus)
- AI Literacy — **8 weeks**, 16 lessons; catalog `ai-literacy`; standards in [literacy-standards-crosswalk.md](literacy-standards-crosswalk.md); guides in [facilitator-guides/ai-literacy/](facilitator-guides/ai-literacy/)
- [Advanced AI — HS specialty](advanced-ai.md) — **8 weeks**, 16 lessons; guides in [facilitator-guides/advanced-ai/](facilitator-guides/advanced-ai/)
- [AP CSP Prep](ap-csp-prep.md) — **8 weeks**, 16 lessons + 3 gated exams; guides in [facilitator-guides/ap-csp/](facilitator-guides/ap-csp/)
- [Digital Literacy](digital-literacy-csta.md) — **8 weeks**, 16 lessons; guides in [facilitator-guides/digital/](facilitator-guides/digital/)
- Cybersecurity — **8 weeks**, 16 lessons; guides in [facilitator-guides/cyber/](facilitator-guides/cyber/)
- Financial Literacy — **8 weeks**, 16 lessons; guides in [facilitator-guides/finance/](facilitator-guides/finance/)

### Accreditation & facilitation

- [Curriculum review](curriculum-review.md) — catalog sync, pedagogy audit, Cognia readiness scorecard
- [Cognia STEM evidence map](cognia-stem-evidence.md) — Provider primary + school-partner appendix
- [Master Standards Alignment Matrix](standards-alignment.md) — CSTA / ISTE / CCSS crosswalk
- [Literacy tracks standards crosswalk](literacy-standards-crosswalk.md) — Jump$tart/CEE finance + AI/Cyber/Digital literacy
- [Digital Literacy — CSTA HS map](digital-literacy-csta.md) — Level 3A for grades 9–10
- [Facilitator guides](facilitator-guides/) — **full session guides for all 8 tracks** (127 catalog rows); Python Week 1 illustrated
- [Capstone rubrics](facilitator-guides/rubrics/) — Python / Data / collaboration performance rubrics (Cognia Std 9)
- [PD hours log](facilitator-guides/pd-hours-log.md) — facilitator PD participation template (Cognia Std 3)
- [School partner MOU template](school-partner-mou-template.md) — Cognia Std 4 partnership agreement draft
- [Parent communication kit](parent-communication-kit.md) — Cognia Std 5 family / stakeholder access plan

---

## 1. Audience and grade band

Kanam Academy targets **late middle school through high school**. Python and Data tracks keep a
mixed-readiness path (plain language + 3A stretch). **Digital Literacy** and **Cybersecurity** are
written primarily for **high school Level 3A** (grades 9–10), with selected 3B Impacts stretch.

| Band | CSTA Level | Typical age | How Kanam serves it |
| --- | --- | --- | --- |
| Middle school | Level 2 (grades 6–8) | 11–14 | Core path for Python/Data; plain-language explainers |
| Early high school | Level 3A (grades 9–10) | 14–16 | Primary design target for Digital Literacy + Cybersecurity; CS capstones |
| Later high school | Level 3B (specialty) | 16–18 | Stretch evaluation in Digital (equity/IP/privacy) and Cyber elective depth |

## 2. Standards framework

Kanam Academy is aligned to recognized **national** frameworks. We map every lesson to the
standards below; the full crosswalk is in [standards-alignment.md](standards-alignment.md).

| Framework | Edition | Role in our alignment |
| --- | --- | --- |
| **CSTA K-12 Computer Science Standards** | Revised **2017** (still accreditation-relevant) | Primary alignment. Levels 2 and 3A. |
| **K-12 Computer Science Framework** (k12cs.org) | 2016 | Concepts & Practices that underpin CSTA. |
| **CSTA PK-12 Standards** | **2026** (published) | Forward-compatibility to five foundational concepts (Algorithms & Design, Programming, Data & Analysis, Systems & Security, Computing & Society). |
| **Common Core State Standards — Mathematics** | Statistics & Probability (6.SP, 7.SP, 8.SP) and High School (S-ID) | Cross-curricular alignment for the data-visualization strand. |
| **ISTE Standards for Students** | **2024** (v4.02) | Digital Citizen, Knowledge Constructor, Computational Thinker, Creative Communicator. |
| **National Standards for Personal Financial Education** | Jump$tart / CEE **2021** | Primary alignment for Financial Literacy (`fl-1`…`fl-16`). See [literacy-standards-crosswalk.md](literacy-standards-crosswalk.md). |

> **Why two CSTA editions?** Many state adoptions and accreditation reviewers still cite **2017**.
> The **2026** PK–12 Standards are published; we map conceptually to their five foundational
> concepts so the curriculum is *defensible today* and *ready for transition*. Public packet:
> *Kanam Academy Foundations Standards Alignment* (marketing `/one-pager/standards`).

### CSTA concept coverage at a glance

| CSTA Concept | Python & AI Track | Data Analyst Track |
| --- | :---: | :---: |
| Algorithms & Programming (AP) | ● Primary | ◐ Applied |
| Data & Analysis (DA) | ◐ Applied | ● Primary |
| Impacts of Computing (IC) | ● Woven throughout (AI ethics) | ● Woven throughout (data ethics) |
| Computing Systems (CS) | ○ Light | ○ Light |
| Networks & the Internet (NI) | ○ Light | ○ Light |

● strong  ◐ partial  ○ light

## 3. Two emphasis areas (by request)

This curriculum is intentionally weighted toward two pillars:

1. **Fundamentals** — sequencing, variables & data types, conditionals, loops, lists/dictionaries,
   functions & parameters, decomposition, and systematic testing/debugging. Owned primarily by the
   **Python & AI Foundations** track and mapped to CSTA **2-AP-10 → 2-AP-19** and **3A-AP-13 → 3A-AP-23**.
2. **Data visualization** — reading and building charts, choosing the right chart for a question, and
   understanding how design choices change interpretation. Owned primarily by the **Data Analyst**
   track and mapped to CSTA **2-DA-08**, **3A-DA-11**, Common Core **6.SP.B.4 / 8.SP.A.1**, and
   CSTA Draft 3.0 **MS-DAA-26**.

## 4. Instructional model

### 8-week structure (all tracks)

Each track is paced over **8 weeks** with **typically two sessions per week** (Python has two single-session design weeks for consolidation/planning). Weeks are themed units that build
in a deliberate sequence, with **checkpoint** and **planning** sessions placed to prevent the gaps where
self-paced learners typically stall (combining concepts; the pre-capstone cliff). The dashboard mirrors
this structure with grouped **"Week _ · Session _"** labels.

Three ways to run it, no adult expertise required:

- **Self-paced** — the learner follows the weeks; every lesson explains, checks, and corrects itself.
- **With light assistance** — a mentor runs the weekly **Warm-up** and **Talk-about-it** prompts and
  watches the **checkpoint**, stepping in only when a learner is stuck.
- **Live cohort** — each week is one longer + one shorter live session.

### Lesson structure

Every interactive lesson uses the same research-based structure:

1. **Coach's note** — the goal and the "big idea," in plain language.
2. **Quick explainer + Word help** — vocabulary and concept primers (supports multilingual / mixed-readiness learners).
3. **Guided practice** — fill-in-the-blank code/queries with immediate feedback.
4. **From-scratch challenge** — the real skill-builder; students write a solution unaided.
5. **Check-for-understanding (CFU)** — short conceptual prompts.
6. **Try This** — extension tasks that push toward Level 3A depth.
7. **Ethics moment** — an AI-ethics or data-ethics reflection (CSTA Impacts of Computing).

Each week then adds **Do-it-yourself** (self-paced practice), **With-some-help** (mentor prompts), and a
one-sentence **reflection** that logs the week's badge/XP. Auto-graded exercises validate both the
**method** (the code/SQL written) and the **result**, so mastery is demonstrated, not just attempted.

## 5. Assessment & evidence of mastery

| Evidence type | Where it lives | Standard practice supported |
| --- | --- | --- |
| Formative checks (CFU) | Each lesson | Communicating about computing (P7) |
| Auto-graded guided + scratch exercises | Each lesson | Testing & refining (P6) |
| XP + badges per lesson | Dashboard | Motivation / progress tracking |
| Capstone projects | Python L13–L14 (Week 8), Data L14 (Week 8) | Creating computational artifacts (P5) |
| Progress events (opened/run/success, CFU reveals) | Supabase rollups | Teacher visibility / standards-based grading inputs |

## 6. How to read the track docs

Each track doc opens with a **"How to use this program"** guide and the **weekly rhythm**, then lays out
the **8 weeks** in order. Each week has a theme, a week goal, its 1–2 lesson sessions, and self-paced /
assisted activities. Each lesson entry lists:

- **Goal** (student-facing objective)
- **Learning objectives** (teacher-facing, measurable)
- **CSTA & cross-curricular standards** met
- **Evidence of mastery** (the auto-graded check)
- **Vocabulary**

A per-track **alignment matrix** and a **gap analysis / roadmap** close each document.
