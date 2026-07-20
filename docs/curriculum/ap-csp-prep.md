# AP Computer Science Principles Prep — Kanam Track

**Product positioning:** Exam **prep** for the College Board AP CSP assessment — **not** an official AP course and **not** automatic college credit. Students still register for and take the AP exam through their school / College Board.

**Track ID:** `ap-csp-prep`  
**Routes:** `/learn/ap-csp-prep/1` … `/learn/ap-csp-prep/16`  
**Lessons:** 16 across 8 weeks (`csp-1` … `csp-16`)  
**Audience:** High school students preparing for AP CSP (self-paced or cohort)

Aligned to the AP CSP Course and Exam Description **Big Ideas** and computational thinking practices. Content emphasizes AP-style reasoning, Create Performance Task readiness, Personalized Project Reference (PPR) practice, and challenging interactives — not a watered-down survey.

## Exam shape (verify annually)

| Component | Weight | What students do |
| --- | --- | --- |
| End-of-course MCQ | ~70% | ~70 multiple-choice in Bluebook (College Board pseudocode; includes multi-select items) |
| Create PT + written response | ~30% | Program + video + PPR via Digital Portfolio; written responses on exam day about *their* code |

**2026 reference dates (confirm locally):** Create PT due ~Apr 30; end-of-course exam ~May 14. Always use the student’s AP Classroom / Digital Portfolio deadlines.

## Instructor sequencing (why this order)

We teach like a strong AP classroom: process → representation → programming fluency → systems → impact → performance task → mixed review.

1. **Creative Development first** so students learn purpose/function, collaboration, and testing *before* they drown in syntax.  
2. **Data next** so binary/abstraction language is ready when lists and bits appear in programs.  
3. **Programming is the longest arc (L5–L10)** because BI 3 is 30–35% of MCQ **and** the Create PT.  
4. **Create PT foreshadowing** appears inside L7–L9 (iteration, lists, procedures) so L15 is practice, not first exposure.  
5. **Systems → Impact → Create studio → gauntlet** mirrors exam weight and the through-course assessment calendar.

## Big Idea → weeks

| Big Idea | Exam weight (MCQ) | Weeks / lessons |
| --- | --- | --- |
| 1 Creative Development | 10–13% | W1 · L1–L2 |
| 2 Data | 17–22% | W2 · L3–L4 |
| 3 Algorithms & Programming | 30–35% | W3–W5 · L5–L10 |
| 4 Computing Systems & Networks | 11–15% | W6 · L11–L12 |
| 5 Impact of Computing | 21–26% | W7 · L13–L14 |
| Create PT + full exam readiness | — | W8 · L15–L16 |

## High-yield must-knows (instructor checklist)

Use this when reviewing whether a student is exam-ready:

- [ ] Purpose vs function; collaboration value; iterative process; testing ≠ proof of correctness  
- [ ] Binary ↔ decimal; overflow vs roundoff; lossless vs lossy; metadata; correlation ≠ causation; bias  
- [ ] AP Reference Sheet: `←`, `DISPLAY`, `INPUT`, `MOD`, `RANDOM(a,b)` inclusive, real division  
- [ ] 1-based list/string indexing on the reference sheet  
- [ ] Conditionals + Boolean + nested IF traces  
- [ ] `REPEAT n TIMES` / `REPEAT UNTIL` / `FOR EACH` + off-by-one + infinite loops  
- [ ] Lists: APPEND/INSERT/REMOVE (shift), traversal, filter/accumulate  
- [ ] Procedures: parameter changes behavior; RETURN; procedural vs data abstraction  
- [ ] Linear vs binary search; reasonable vs unreasonable time; heuristics; undecidable / halting  
- [ ] RANDOM + simulations (abstraction tradeoffs)  
- [ ] Parallel vs distributed; speedup; sequential bottleneck; redundancy / fault tolerance  
- [ ] Packets, IP/TCP, DNS, HTTP vs HTTPS + Certificate Authorities; bandwidth vs latency  
- [ ] Digital divide (access + literacy + bandwidth); bias; crowdsourcing limits; IP / CC / open source  
- [ ] PII, encryption (symmetric/asymmetric), MFA, phishing, malware, keylogging, rogue AP  
- [ ] Create PT: list + procedure(parameter) + selection + iteration; video I/O; PPR; four WR categories  

## Create Performance Task (L15)

Students practice planning a program that demonstrates:

- a **list** used meaningfully to manage complexity  
- a **student-developed procedure** with parameter(s) that affect behavior  
- **selection** and **iteration** inside that algorithm  
- clear **purpose** / function, testing story, and PPR-ready code segments  
- written practice for: design/purpose · algorithm · errors/testing · data & procedural abstraction  

Kanam does **not** submit to the Digital Portfolio. Students prepare here, then submit via College Board processes.

## Assessment design

- In-lesson check-ins (AP distractor style)  
- End-of-lesson quizzes (8 hard items)  
- Interactive labs: Parsons, debug traps, scenario trees, match/order (3 per lesson)  
- Capstone practice gauntlet in L16  
- **Gated exams** (Week 8 assessments — unlock after all 16 lessons + exercises):
  - Practice Test 1 — 30 MCQ (~50 min suggested) · `/learn/ap-csp-prep/exam/practice-1`
  - Practice Test 2 — 30 MCQ (~50 min suggested) · `/learn/ap-csp-prep/exam/practice-2`
  - Final Exam — 40 MCQ (~70 min suggested) · `/learn/ap-csp-prep/exam/final` (unlocks after both practice tests)
  - Includes AP-style **select-two** items, Big Idea score breakdown, and review explanations  
  - Prep simulations only — not official College Board exams or scores  

## Billing / access

- Family subscription unlocks all `TRACKS`, including this one.  
- Individual checkout: **$250** one-time (`price_1TvMf6DPeYE3b2sPlO9Qh5V9` on product `prod_UvD5DDGrYnmTXX`). Wired in `lib/billing/stripe-catalog.ts`; Buy enabled on `/billing`.  
- Advanced AI companion track: **$200** one-time (`price_1TvMcVDPeYE3b2sPNKv9FYaO` on `prod_UvD2BcdpysyPLt`).  
- Apply `supabase/migrations/20260719_ap_csp_prep_track_slug.sql` so `track_entitlements` accepts the slug (if not already applied).

## Standards note

This track is **College Board AP CSP–aligned for prep**. It complements Kanam CSTA tracks (Digital Literacy, Python, Data, Cyber) but is paced and marketed as a dedicated exam-prep product.
