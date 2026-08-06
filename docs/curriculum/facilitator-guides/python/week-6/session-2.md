# Facilitator guide — Python & AI · Week 6 · Session 2

**Lesson id:** `lesson-11` · **URL:** `/learn/11`

---

## 1. Session snapshot

| Field | Value |
| --- | --- |
| **Track / lesson id** | `ai-python` / `lesson-11` |
| **Title** | Giving Functions Better Information (Parameters) |
| **Time** | 45–60 min |
| **Week theme** | Reusable Skills |
| **Student goal** | Use a parameter so one function can work with different details. |
| **Standards** | CSTA 2-AP / 3A-AP (see track doc) |
| **Materials** | Browser devices · projector · keyboard for coding |
| **XP / badge** | 600 · Parameter Pro |

**Learning objectives**

1. State today’s goal in one sentence.
2. Complete guided practice with feedback.
3. Complete the scratch / unaided challenge (or equivalent).
4. Pass the lesson check (exercise success and/or CFU).

---

## 2. Pre-class setup

- [ ] Open `/learn/11` on the projector (lesson loads)
- [ ] Confirm Help / Guidance panel is reachable
- [ ] Decide self-paced vs live cohort pacing
- [ ] Optional: complete the first check yourself
- [ ] Bookmark instructor progress for end-of-class glance

**Projector tips:** Zoom ~110%; keep feedback / console / quiz results visible when demoing.

---

## 3. Run of show

| Minutes | Phase | Facilitator | Students |
| ---: | --- | --- | --- |
| 0–5 | **Warm-up** | Ask: “In one sentence, what should our AI helper be able to do after today?” (tie to: Giving Functions Better Information (Parameters)) | Think / pair share |
| 5–15 | **Teach** | Open Lesson tab; paraphrase coach’s note / Word help | Follow along |
| 15–40 | **Practice** | Circulate; hints before answers; celebrate first green checks | guided fill → scratch |
| 40–50 | **Check** | Run & check + CFU; ask “what does this prove?” | Answer / show output |
| 50–60 | **Close** | Exit ticket + preview next session | One-sentence reflection |

### Coach’s note (from product — paraphrase)

**Coach's note**
Read this first — it explains the goal + how to think about the code.
**Coach's note**:
Think about a video game controller.

You might have one attack button, but you don't build a new button for every enemy.
You press the same button and tell the game who to attack.

That's how ==parameters== work.

A parameter is extra information you give to a function so it knows what to do this time.

Here's what that looks like in code:
```
def attack(enemy):
    print("You attack the " + enemy + "!")
```

This creates an attack skill — but it doesn't run yet.
To use the skill, you call the function and give it information:
```
attack("goblin")
attack("dragon")
attack("boss")
```

Same skill.
Different information.
Different output.

That's how AI systems appear flexible — humans give better details.

**Mini goal**:
Create a function that changes what your bot does based on the information you give it.
Read the steps, follow them in order, then press [[Run]].

### Guided steps (product)

1. Define a function that uses one parameter.
2. Inside the function, print a message that includes the parameter.
3. Call the function with one value.
4. Call the same function with a different value.
5. Observe how the output changes.
6. Common mistake: If the output doesn't change, check that you passed different values into the function.
### Try This / stretch

- Change the enemy name and run again.
- Add a second parameter (like weapon or power).
- Challenge: Explain how parameters help humans control AI behavior.

---

## 4. Screenshot callouts

| ID | Capture | Filename |
| --- | --- | --- |
| A | Lesson hero / title + goal | `python-w6-s2-hero.png` |
| B | Lesson / Exercises (or Quiz) tabs | `python-w6-s2-tabs.png` |
| C | Help / Coach guidance open | `python-w6-s2-help.png` |
| D | Main workspace (editor, query, or quiz) | `python-w6-s2-editor.png` |
| E | Success / check state | `python-w6-s2-run.png` |
| F | Evidence panel (console, chart, or score) | `python-w6-s2-console.png` |

![Hero placeholder](../../images/python-w6-s2-hero.png)

**Capture checklist:** local unlock → `/learn/11` → Lesson → Practice/Quiz → success state → save under `facilitator-guides/images/`.

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
