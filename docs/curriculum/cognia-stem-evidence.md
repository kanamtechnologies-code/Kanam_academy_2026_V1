# Cognia STEM Evidence Map — Kanam Academy (Provider)

**Primary path:** Cognia **STEM Provider** certification  
**Secondary:** School-partner appendix (how a Cognia school uses Kanam as program evidence)  
**Standards reference:** Cognia STEM Performance Standards (effective July 2022), Standards 1–10  
**Related:** [curriculum-review.md](curriculum-review.md) · [standards-alignment.md](standards-alignment.md) · [facilitator-guides/](facilitator-guides/)

---

## How to use this document

For each Cognia STEM standard, Kanam lists **evidence artifacts**, an **owner**, and a **status** (Ready / In progress / Gap). Reviewers should treat product URLs and this `docs/curriculum/` tree as the living evidence binder; partner MOUs and site-specific data stay with the applying organization.

---

## Standards 1–10 (Provider lens)

### Standard 1 — Integrated STEM experiences

| Item | Detail |
| --- | --- |
| **Focus** | Learners engage in integrated science, technology, engineering, and mathematics experiences. |
| **Kanam evidence** | Python frames coding as teaching an AI helper (tech + AI literacy); Data couples SQL with chart choice and CCSS stats language; Digital/Cyber use real-world systems and security tradeoffs; Finance applies quantitative decision-making. Ethics moments weave IC across STEM contexts. |
| **Artifacts** | [python-track.md](python-track.md), [data-analyst-track.md](data-analyst-track.md), literacy crosswalks, live lesson modules |
| **Owner** | Curriculum |
| **Status** | **Ready** |

### Standard 2 — Standards-aligned curriculum

| Item | Detail |
| --- | --- |
| **Focus** | Curriculum aligns to recognized STEM / CS standards. |
| **Kanam evidence** | Published CSTA 2017 + 2026 forward map, ISTE 2024, CCSS SP, Jump$tart/CEE for finance. |
| **Artifacts** | [standards-alignment.md](standards-alignment.md), [literacy-standards-crosswalk.md](literacy-standards-crosswalk.md), [digital-literacy-csta.md](digital-literacy-csta.md) |
| **Owner** | Curriculum |
| **Status** | **Ready** |

### Standard 3 — STEM-specific professional learning

| Item | Detail |
| --- | --- |
| **Focus** | Educators receive STEM-specific PD to implement the program. |
| **Kanam evidence** | Facilitator guides (all 8 tracks); in-lesson coach notes (Python/Data); [PD hours log](facilitator-guides/pd-hours-log.md); [instructor checklist](facilitator-guides/instructor-checklist.md). |
| **Artifacts** | [facilitator-guides/](facilitator-guides/), [pd-hours-log.md](facilitator-guides/pd-hours-log.md), lesson `instructorScript` fields |
| **Owner** | Curriculum + Partnerships |
| **Status** | **Ready** — guides + hours log template; sites fill participation rows locally |

### Standard 4 — Community and STEM partners

| Item | Detail |
| --- | --- |
| **Focus** | Partnerships enrich STEM learning. |
| **Kanam evidence** | Pilot / school-partner narrative placeholders; product supports cohort and instructor roles. |
| **Artifacts** | This appendix § School-partner; partnership MOUs (external) |
| **Owner** | Partnerships |
| **Status** | **Gap** for formal MOUs in-repo · **In progress** for pilot narrative |

### Standard 5 — Stakeholder engagement and access

| Item | Detail |
| --- | --- |
| **Focus** | Families and stakeholders can access program information and learner progress appropriately. |
| **Kanam evidence** | Learner dashboard (XP, badges, week/session labels); instructor progress; public standards one-pager; curriculum docs for adopters. |
| **Artifacts** | App dashboard / instructor UI · marketing standards packet · this folder |
| **Owner** | Product + Partnerships |
| **Status** | **In progress** — product surfaces Ready; formal stakeholder communication plan TBD per site |

### Standard 6 — Inquiry and exploration

| Item | Detail |
| --- | --- |
| **Focus** | Learners investigate questions through inquiry. |
| **Kanam evidence** | Guided → scratch progression; Run & check; Try This extensions; Data “ask better questions”; Advanced AI evaluation harnesses. |
| **Artifacts** | LessonModule UX, exercise validators, track week themes |
| **Owner** | Product + Curriculum |
| **Status** | **Ready** |

### Standard 7 — Facilitated self-direction

| Item | Detail |
| --- | --- |
| **Focus** | Learners develop agency with appropriate facilitation. |
| **Kanam evidence** | Self-paced / assisted / live cohort modes documented; coach notes; Help Pocket; hints; checkpoint weeks; capstone planning session. |
| **Artifacts** | Track “How to use” sections · [facilitator-guides/python-week-1/](facilitator-guides/python-week-1/) |
| **Owner** | Curriculum |
| **Status** | **Ready** |

### Standard 8 — Extended STEM opportunities

| Item | Detail |
| --- | --- |
| **Focus** | Learners have opportunities beyond single lessons. |
| **Kanam evidence** | Capstones (Python L13–14, Data L14, literacy Week 8); Adventure/project modes; Try This stretch; multi-track pathways (AI Lit → Advanced AI → AP CSP). |
| **Artifacts** | Capstone lesson configs · track pathway narrative in README |
| **Owner** | Curriculum |
| **Status** | **Ready** |

### Standard 9 — Performance-based assessment

| Item | Detail |
| --- | --- |
| **Focus** | Assessment emphasizes authentic performance. |
| **Kanam evidence** | Auto-graded method+result checks; CFUs (Python + Data); quizzes (literacy); Create PT studio + AP-style exams; [capstone rubrics](facilitator-guides/rubrics/). |
| **Artifacts** | Exercise validators · CFU content · [rubrics/](facilitator-guides/rubrics/) · assessment rows in `lib/tracks.ts` |
| **Owner** | Curriculum + Product |
| **Status** | **Ready** for packaging — product auto-checks + published portfolio/collaboration rubrics; site scoring still local |

### Standard 10 — STEM literacy and next-level readiness

| Item | Detail |
| --- | --- |
| **Focus** | Learners build literacy and readiness for further STEM pathways. |
| **Kanam evidence** | Eight-track catalog; AP CSP Prep positioning; badges/XP; AI ethics and cyber/digital citizenship; finance for life decisions. |
| **Artifacts** | [curriculum-review.md](curriculum-review.md) catalog table · pathway copy in product |
| **Owner** | Curriculum |
| **Status** | **Ready** |

---

## Provider assurances checklist

Typical Cognia Provider asks — assign owners before application.

| Assurance | Artifact / evidence | Owner | Status |
| --- | --- | --- | :---: |
| Written STEM curriculum scope & sequence | Track docs + `lib/tracks.ts` | Curriculum | Ready |
| Standards crosswalk | standards-alignment + literacy crosswalks | Curriculum | Ready |
| Integrated STEM rationale | Std 1 above + track through-lines | Curriculum | Ready |
| Facilitator / PD materials | facilitator-guides/ | Curriculum | Ready |
| PD participation log (hours) | [pd-hours-log.md](facilitator-guides/pd-hours-log.md) | Partnerships | Ready (template) |
| Performance assessment examples | CFUs (Python/Data) / capstones / rubrics | Curriculum | Ready |
| Rubrics for projects | [rubrics/](facilitator-guides/rubrics/) | Curriculum | Ready |
| Equity / access statement | IC lessons + school appendix | Partnerships | In progress |
| Community partner agreements | MOUs | Partnerships | Gap |
| Continuous improvement process | curriculum-review backlog | Curriculum | Ready |
| Data privacy / student data practices | Product privacy policy (site) | Product / Legal | External |
| Observation-ready session plans | Python Week 1 guides | Curriculum | Ready (sample) |

---

## Explicit gap list (trackable)

| ID | Gap | Blocks | Next action |
| --- | --- | --- | --- |
| G1 | Collaboration & attribution tasks (`2-AP-16`) in product | Cognia 9, CSTA depth | Rubric shipped; add paired protocol activity to Python W7–8 |
| G2 | Portfolio / capstone rubrics | Cognia 9 | **Closed** — [rubrics/](facilitator-guides/rubrics/) |
| G3 | Data track empty `cfu: []` | Formative evidence | **Closed** — 3 CFUs per Data lesson in `lib/dataLessons/` |
| G4 | PD hours log | Cognia 3 | **Closed** — [pd-hours-log.md](facilitator-guides/pd-hours-log.md) |
| G5 | Partner MOUs | Cognia 4 | Collect from pilot schools |
| G6 | Coach notes for literacy tracks | Facilitator scale | Full guides exist; optional richer coach scripts in product |
| G7 | Formal stakeholder access plan | Cognia 5 | Per-site parent communication kit |

---

## School-partner appendix

How a **Cognia-accredited school** can use Kanam as STEM program evidence (Kanam remains the Provider curriculum; the school remains the institutional applicant for school accreditation).

### Mapping Kanam to a school STEM schedule

| School need | Suggested Kanam use |
| --- | --- |
| MS elective / club (8 weeks) | Python & AI Foundations, 2 sessions/week |
| HS CS intro | Python → Data, or AI Literacy → Python |
| HS specialty / CTE adjacent | Advanced AI or Cybersecurity |
| AP support (not official AP) | AP CSP Prep + Create PT studio |
| Advisory / life skills | Financial Literacy or Digital Literacy |

### Observation evidence a school can collect

1. **Session plan** — print [facilitator-guides/python-week-1/session-1.md](facilitator-guides/python-week-1/session-1.md) (or equivalent).
2. **Learning walk notes** — warm-up → teach → practice → CFU → close visible in product UI.
3. **Student work samples** — console success, CFU answers, capstone demo (with FERPA-appropriate consent).
4. **Progress data** — instructor view completion %, XP, badge unlocks.
5. **Standards citation** — pull codes from this folder into the school’s STEM portfolio binder.

### What schools should not claim

- That Kanam alone confers Cognia school accreditation.
- That AP CSP Prep is an official College Board AP course.
- That partner MOUs or local PD sign-offs exist without site evidence — cite the gap list (G5/G7) and fill the [PD hours log](facilitator-guides/pd-hours-log.md) / MOUs locally.

### Pilot narrative placeholder

> *[School name]* piloted Kanam Academy’s *[track]* with *[N]* learners over *[dates]*. Facilitators used Kanam coach notes / facilitator guides. Evidence collected: *[session observations, completion rates, sample artifacts, PD hours log, rubric scores]*. Next cycle improvements: *[e.g., collaboration protocol in product, partner MOU]*.

Replace bracketed fields before attaching to a Cognia school portfolio.

---

## Document control

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | July 2026 | Initial Provider map + school appendix |
