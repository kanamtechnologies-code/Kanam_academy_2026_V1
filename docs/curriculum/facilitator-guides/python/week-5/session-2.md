# Facilitator guide — Python & AI · Week 5 · Session 2

**Lesson id:** `lesson-9` · **URL:** `/learn/9`

---

## 1. Session snapshot

| Field | Value |
| --- | --- |
| **Track / lesson id** | `ai-python` / `lesson-9` |
| **Title** | Organizing Memory |
| **Time** | 45–60 min |
| **Week theme** | Giving AI a Memory |
| **Student goal** | Use a dictionary (key → value) to store information with meaning. |
| **Standards** | CSTA 2-AP / 3A-AP (see track doc) |
| **Materials** | Browser devices · projector · keyboard for coding |
| **XP / badge** | 500 · Memory Organizer |

**Learning objectives**

1. State today’s goal in one sentence.
2. Complete guided practice with feedback.
3. Complete the scratch / unaided challenge (or equivalent).
4. Pass the lesson check (exercise success and/or CFU).

---

## 2. Pre-class setup

- [ ] Open `/learn/9` on the projector (lesson loads)
- [ ] Confirm Help / Guidance panel is reachable
- [ ] Decide self-paced vs live cohort pacing
- [ ] Optional: complete the first check yourself
- [ ] Bookmark instructor progress for end-of-class glance

**Projector tips:** Zoom ~110%; keep feedback / console / quiz results visible when demoing.

---

## 3. Run of show

| Minutes | Phase | Facilitator | Students |
| ---: | --- | --- | --- |
| 0–5 | **Warm-up** | Ask: “In one sentence, what should our AI helper be able to do after today?” (tie to: Organizing Memory) | Think / pair share |
| 5–15 | **Teach** | Open Lesson tab; paraphrase coach’s note / Word help | Follow along |
| 15–40 | **Practice** | Circulate; hints before answers; celebrate first green checks | guided fill → scratch |
| 40–50 | **Check** | Run & check + CFU; ask “what does this prove?” | Answer / show output |
| 50–60 | **Close** | Exit ticket + preview next session | One-sentence reflection |

### Coach’s note (from product — paraphrase)

**Coach's note**:
Your bot can remember multiple things now.

But there's a problem.
If information is just a ==list==, the bot doesn't know what each item means.
It's like having a backpack full of stuff with no labels.

Today, we fix that.
A ==dictionary== lets your bot store information with labels.

Think of a dictionary like a set of labeled drawers:
- One drawer is labeled `"name"`
- Another is labeled `"age"`
- Another might be `"favorite_color"`

Each label points to the right information.

Here's what a dictionary can look like:
```
profile = {}
profile["name"] = "Alex"
profile["favorite_color"] = "blue"
print("Name: " + profile["name"])
```

Here's how to think like a coder today:
- The ==key== is the label
- The ==value== is the information
- Together, they make ==organized memory== useful

Important things to remember:
- Dictionaries use curly braces: `{}`
- Keys must be written exactly the same every time (Python is ==literal==)
- Python will not guess what you meant

**Mini goal**:
Create organized memory and use it to make your bot respond clearly.

Read the steps, follow the order, then press [[Run]].

### Guided steps (product)

1. Create an empty dictionary to store organized memory: `profile = {}`
2. Add at least two pieces of information using key–value pairs.
3. Print one value by accessing it with its key.
4. Use that value inside a sentence your bot prints.
5. Press [[Run]] and read the console carefully.
### Try This / stretch

- Add another key–value pair.
- Change a value and re-run the program.
- Print a sentence using two values from the dictionary.

---

## 4. Screenshot callouts

| ID | Capture | Filename |
| --- | --- | --- |
| A | Lesson hero / title + goal | `python-w5-s2-hero.png` |
| B | Lesson / Exercises (or Quiz) tabs | `python-w5-s2-tabs.png` |
| C | Help / Coach guidance open | `python-w5-s2-help.png` |
| D | Main workspace (editor, query, or quiz) | `python-w5-s2-editor.png` |
| E | Success / check state | `python-w5-s2-run.png` |
| F | Evidence panel (console, chart, or score) | `python-w5-s2-console.png` |

![Hero placeholder](../../images/python-w5-s2-hero.png)

**Capture checklist:** local unlock → `/learn/9` → Lesson → Practice/Quiz → success state → save under `facilitator-guides/images/`.

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
