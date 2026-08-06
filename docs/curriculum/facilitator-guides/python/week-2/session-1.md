# Facilitator guide — Python & AI · Week 2 · Session 1

**Lesson id:** `lesson-3` · **URL:** `/learn/3`

---

## 1. Session snapshot

| Field | Value |
| --- | --- |
| **Track / lesson id** | `ai-python` / `lesson-3` |
| **Title** | My AI Makes Choices |
| **Time** | 45–60 min |
| **Week theme** | Teaching AI to Decide |
| **Student goal** | Use if / else to make your AI respond differently based on input. |
| **Standards** | CSTA 2-AP / 3A-AP (see track doc) |
| **Materials** | Browser devices · projector · keyboard for coding |
| **XP / badge** | 150 · Decision Maker |

**Learning objectives**

1. State today’s goal in one sentence.
2. Complete guided practice with feedback.
3. Complete the scratch / unaided challenge (or equivalent).
4. Pass the lesson check (exercise success and/or CFU).

---

## 2. Pre-class setup

- [ ] Open `/learn/3` on the projector (lesson loads)
- [ ] Confirm Help / Guidance panel is reachable
- [ ] Decide self-paced vs live cohort pacing
- [ ] Optional: complete the first check yourself
- [ ] Bookmark instructor progress for end-of-class glance

**Projector tips:** Zoom ~110%; keep feedback / console / quiz results visible when demoing.

---

## 3. Run of show

| Minutes | Phase | Facilitator | Students |
| ---: | --- | --- | --- |
| 0–5 | **Warm-up** | Ask: “In one sentence, what should our AI helper be able to do after today?” (tie to: My AI Makes Choices) | Think / pair share |
| 5–15 | **Teach** | Open Lesson tab; paraphrase coach’s note / Word help | Follow along |
| 15–40 | **Practice** | Circulate; hints before answers; celebrate first green checks | guided fill → scratch |
| 40–50 | **Check** | Run & check + CFU; ask “what does this prove?” | Answer / show output |
| 50–60 | **Close** | Exit ticket + preview next session | One-sentence reflection |

### Coach’s note (from product — paraphrase)

**Coach’s note**:
Last week, our AI helper learned how to **listen**.
Today, we’re going to teach it how to **make choices**.

Big idea (very important):
- The computer does NOT guess.
- It checks your rule.
- If the rule is True, it runs that block.
- Otherwise, it runs the else block.

This is what many early AI systems look like:
**rule-based decision making**.
A human writes the rules. The program follows them exactly.

Two super common mistakes (watch for these):
- `=` vs `==`: `=` assigns (puts a value in a box). `==` compares (asks a question).
- Indentation: the lines under if/else MUST be indented so Python knows what belongs to each choice.

How to test like a teacher:
Run it once with Alex (you should get the special message), then run it again with a different name (you should get the other message).

### Guided steps (product)

1. Ask for the user’s name using input().
2. Alex
3. Inside the if block, print a special message for Alex.
4. Add else: for everyone else.
5. Inside else, print a friendly message for any other name.
### Try This / stretch

- Swap the special name (Easy): Change Alex to your own name.
- Sam

---

## 4. Screenshot callouts

| ID | Capture | Filename |
| --- | --- | --- |
| A | Lesson hero / title + goal | `python-w2-s1-hero.png` |
| B | Lesson / Exercises (or Quiz) tabs | `python-w2-s1-tabs.png` |
| C | Help / Coach guidance open | `python-w2-s1-help.png` |
| D | Main workspace (editor, query, or quiz) | `python-w2-s1-editor.png` |
| E | Success / check state | `python-w2-s1-run.png` |
| F | Evidence panel (console, chart, or score) | `python-w2-s1-console.png` |

![Hero placeholder](../../images/python-w2-s1-hero.png)

**Capture checklist:** local unlock → `/learn/3` → Lesson → Practice/Quiz → success state → save under `facilitator-guides/images/`.

---

## 5. What “good” looks like

- **Mastery signal:** Student can restate the goal and show product evidence (green check, quiz pass, or studio artifact) without reading the answer key.
- **Common mistakes:**
- Quotes / spaces / `Print` vs `print`
- Skipping Run & check after a change
- Hard-coding answers instead of using variables / `input()`
- **Differentiation:**
  - **Needs support:** Stay on guided path; re-read Help / Word help; use hints before scratch.
  - **Ready for more:** Try This / stretch scenario; teach-back to a peer in 60 seconds.

---

## 6. Exit ticket & instructor progress

**Exit ticket:** *What can you do now that you couldn’t do before this session — and how do you know?*

**Progress check:** Confirm lesson opened + check success (exercise / quiz / assessment). Incomplete usually means stuck on a single concept — return to Help, not a new lecture.
