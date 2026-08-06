# Facilitator guide — [Track] · Week [N] · Session [S]

> Copy this file for each new session guide. Replace bracketed fields. Keep sections in this order so guides stay printable and consistent.

---

## 1. Session snapshot

| Field | Value |
| --- | --- |
| **Track / lesson id** | `[e.g. ai-python / lesson-1]` |
| **Title** | `[Lesson title]` |
| **Time** | `[e.g. 45–60 min]` |
| **Week theme** | `[from WeekPlan]` |
| **Student goal** | `[from lesson config goal]` |
| **Standards** | `[CSTA / other codes]` |
| **Materials** | Devices with browser · projector or shared screen · optional paper for warm-up |
| **XP / badge** | `[xp]` · `[badgeName]` |

**Learning objectives**

1. …
2. …

---

## 2. Pre-class setup

- [ ] Facilitator account can open the lesson URL
- [ ] Demo / projector: lesson loads; Help Pocket visible (header on mobile)
- [ ] Know whether students use self-paced or live cohort mode
- [ ] Optional: complete the scratch exercise once yourself
- [ ] Bookmark instructor progress view for end-of-class check

**Projector tips:** Zoom browser to ~110% for code; keep console visible when demoing Run & check.

---

## 3. Run of show (minute-by-minute)

| Minutes | Phase | What you do | What students do |
| ---: | --- | --- | --- |
| 0–5 | **Warm-up** | Ask the warm-up prompt | Think / pair share |
| 5–15 | **Teach** | Read or paraphrase coach’s note; open Word help as needed | Follow along; ask questions |
| 15–35 | **Practice** | Circulate; point to hints before giving answers | Guided fill → scratch |
| 35–45 | **CFU** | Ask 1–2 CFU questions aloud or in product | Answer; compare to reveal |
| 45–50 | **Close** | Exit ticket + preview next session | One-sentence reflection |

Adjust times for 30-min or 90-min blocks; keep the phase order.

---

## 4. Screenshot callouts

Place images next to the phase they support. Paths are relative to this guide’s folder.

| ID | Capture | Suggested filename |
| --- | --- | --- |
| A | Lesson hero / title + goal | `[track]-w[N]-s[S]-hero.png` |
| B | Lesson tabs (Lesson / Activity) | `[track]-w[N]-s[S]-tabs.png` |
| C | Help Pocket open (coach note) | `[track]-w[N]-s[S]-help.png` |
| D | Code editor with starter | `[track]-w[N]-s[S]-editor.png` |
| E | Run & check + success state | `[track]-w[N]-s[S]-run.png` |
| F | Console output example | `[track]-w[N]-s[S]-console.png` |

```markdown
![Lesson hero](../images/python-w1-s1-hero.png)
```

**Capture checklist (do after UI is stable):** open local or demo → complete path above → export PNGs into `facilitator-guides/images/`.

---

## 5. What “good” looks like

- **Mastery signal:** …
- **Common mistakes:** …
- **Differentiation:** Needs support → … · Ready for more → Try This …

---

## 6. Exit ticket & instructor progress

**Exit ticket (1 sentence):** …

**How to read progress:** In the instructor view, confirm lesson opened, exercise success, and (if used) CFU reveals. Incomplete Run & check usually means stuck on quotes/spaces/syntax — revisit Help Pocket, not a new lecture.

---

## Source of truth

Pull goals, coach text, CFU, and exercises from the live lesson config under `lib/…Lessons/` so guides never drift from product.
