# Facilitator guide — Data Analyst · Week 6 · Session 2

**Lesson id:** `da-12` · **URL:** `/learn/data/12`

---

## 1. Session snapshot

| Field | Value |
| --- | --- |
| **Track / lesson id** | `data-analyst` / `da-12` |
| **Title** | Distributions |
| **Time** | 45–60 min |
| **Week theme** | Trends & Spread |
| **Student goal** | Use a histogram to see how a set of numbers is spread out — where scores cluster, and how high and low they reach. |
| **Standards** | CSTA 2-DA / 3A-DA · CCSS SP (see track doc) |
| **Materials** | Browser devices · projector · SQL workspace visible |
| **XP / badge** | 600 · Distribution Detective |

**Learning objectives**

1. State today’s goal in one sentence.
2. Complete guided practice with feedback.
3. Complete the scratch / unaided challenge (or equivalent).
4. Pass the lesson check (exercise success and/or CFU).

---

## 2. Pre-class setup

- [ ] Open `/learn/data/12` on the projector (lesson loads)
- [ ] Confirm Help / Guidance panel is reachable
- [ ] Decide self-paced vs live cohort pacing
- [ ] Optional: complete the first check yourself
- [ ] Bookmark instructor progress for end-of-class glance

**Projector tips:** Zoom ~110%; keep feedback / console / quiz results visible when demoing.

---

## 3. Run of show

| Minutes | Phase | Facilitator | Students |
| ---: | --- | --- | --- |
| 0–5 | **Warm-up** | Ask a real-world question the data could answer today (theme: Trends & Spread). | Think / pair share |
| 5–15 | **Teach** | Open Lesson tab; paraphrase coach’s note / Word help | Follow along |
| 15–40 | **Practice** | Circulate; hints before answers; celebrate first green checks | guided query → scratch query |
| 40–50 | **Check** | result rows / chart; ask “what does this prove?” | Answer / show output |
| 50–60 | **Close** | Exit ticket + preview next session | One-sentence reflection |

### Coach’s note (from product — paraphrase)

**Coach's note**:
A bar chart compares named categories. A **histogram** looks similar but answers a different question: *how is one set of numbers spread out?*

A histogram takes **one number column** (here, **score**) and sorts the values into **bins** (ranges like 70–80, 80–90). The height of each bar is **how many** values fall in that range.

So you only need to return the **score** column — the chart bins them for you. Watch where the scores **cluster** (the tall bars) and how far they **spread** (lowest to highest bin).

This is the difference between *one number per category* (bar) and *the shape of many numbers* (histogram).


---

## 4. Screenshot callouts

| ID | Capture | Filename |
| --- | --- | --- |
| A | Lesson hero / title + goal | `data-w6-s2-hero.png` |
| B | Lesson / Exercises (or Quiz) tabs | `data-w6-s2-tabs.png` |
| C | Help / Coach guidance open | `data-w6-s2-help.png` |
| D | Main workspace (editor, query, or quiz) | `data-w6-s2-editor.png` |
| E | Success / check state | `data-w6-s2-run.png` |
| F | Evidence panel (console, chart, or score) | `data-w6-s2-console.png` |

![Hero placeholder](../../images/data-w6-s2-hero.png)

**Capture checklist:** local unlock → `/learn/data/12` → Lesson → Practice/Quiz → success state → save under `facilitator-guides/images/`.

---

## 5. What “good” looks like

- **Mastery signal:** Student can restate the goal and show product evidence (green check, quiz pass, or studio artifact) without reading the answer key.
- **Common mistakes:**
- Forgetting `FROM` / wrong table name
- Filtering after aggregating (or vice versa) without intent
- Reading the chart without reading the query result
- **Differentiation:**
  - **Needs support:** Stay on guided path; re-read Help / Word help; use hints before scratch.
  - **Ready for more:** Try This / stretch scenario; teach-back to a peer in 60 seconds.

---

## 6. Exit ticket & instructor progress

**Exit ticket:** *What can you do now that you couldn’t do before this session — and how do you know?*

**Progress check:** Confirm lesson opened + check success (exercise / quiz / assessment). Incomplete usually means stuck on a single concept — return to Help, not a new lecture.
