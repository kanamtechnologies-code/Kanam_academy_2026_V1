# Python & AI Foundations Track — 8-Week Curriculum

**Program length:** 8 weeks · **13 interactive lessons** across 8 weeks · **XP range:** 50 → 700
**Grade band:** 6–10 (ages 11–16) · **CSTA Level 2 core, reaching Level 3A**
**Primary emphasis:** programming **fundamentals** (sequence → variables → conditionals → loops → data structures → functions → capstone)
**Through-line:** every week frames coding as *teaching an AI helper exact instructions*, building **AI literacy** alongside CS fundamentals.

> Standards codes below are **CSTA 2017**. Cross-curricular and forward-compatibility (CSTA Draft 3.0)
> codes are in the [master matrix](standards-alignment.md).

---

## How to use this program

This track is built so a motivated middle-schooler can complete it **on their own**, and so a parent,
mentor, or classroom teacher can add **light support** without prep. Every interactive lesson already
contains a coach's note, plain-language explainers, "Word help," guided fill-in-the-blank practice,
auto-graded checks, and instant feedback — so **no adult expertise is required**.

- **Self-paced (no instruction):** follow the weeks in order. Each lesson tells you exactly what to do,
  checks your work, and explains mistakes. Do the **Do-it-yourself** items at the end of each week.
- **With some assistance (recommended):** a mentor runs the **Warm-up** and **Talk-about-it** prompts,
  watches the **checkpoint**, and helps only when a learner is stuck for more than a few minutes.
- **Live class / cohort:** treat each week as one ~60–90 min live session plus one shorter session;
  the two-session rhythm below maps directly to the dashboard's "Week _ · Session _" labels.

### The weekly rhythm (every week looks the same)

A predictable structure lowers cognitive load for this age group and makes self-pacing safe:

1. **Warm-up (5 min)** — a plain-language question or 1-line prediction to activate prior knowledge.
2. **Learn (lesson coach's note + Word help)** — one new idea, in kid-friendly language.
3. **Guided practice** — fill-in-the-blank code with immediate, specific feedback.
4. **Build from scratch** — write a small program unaided (the real skill-builder).
5. **Check for understanding (CFU)** — short "why/what" prompts.
6. **Stretch ("Try This")** — optional extension toward Level 3A depth.
7. **Reflect & log** — one sentence: *what did my AI learn to do this week?* (earns the week's badge/XP).

### Pacing & differentiation

| Learner | Suggested pace | Support |
| --- | --- | --- |
| Needs more time | 1 session/week, repeat guided practice | Re-read "Word help"; use hints before scratch |
| On track | 2 sessions/week (the default) | Warm-up + checkpoint with a mentor |
| Ready for more | 2 sessions + all "Try This" | Tackle the optional **stretch project** each unit |

---

## 8-week scope & sequence

> **Map at a glance:** W1 output/input · W2 decisions · W3 loops · W4 state + checkpoint ·
> W5 memory (lists/dicts) · W6 functions · W7 rules-in-functions + plan · W8 capstone.

### Week 1 — Meet Your AI Helper
**Week goal:** Make a computer say something, store information in a variable, and react to a user.
**Big idea:** *Computers do exactly — and only — what you tell them.*

#### Session 1 · Lesson 1 — My First AI Helper
- **Goal:** Write your first Python program: use a variable + `print()` to introduce your AI helper.
- **Learning objectives:** (1) declare a clearly named string variable, (2) use the assignment operator correctly, (3) build output with string concatenation, (4) debug the two most common literal-string errors (missing quotes, missing spaces).
- **Standards:** `2-AP-11` (clearly named variables / data types), `2-AP-19` (documenting/reading code), `2-IC-20` (computers follow instructions exactly — AI framing).
- **Evidence of mastery:** Scratch program runs without errors and prints one sentence containing a variable value.
- **Vocabulary:** variable, assignment (`=`), string, concatenation, output.

#### Session 2 · Lesson 2 — My AI Helper Listens
- **Goal:** Use `input()` to collect information and respond using the user's input.
- **Learning objectives:** Capture user input into a variable and incorporate it into a response; reason about program *state* changing at runtime.
- **Standards:** `2-AP-11`, `2-AP-17` (test with a range of inputs), `2-IC-22` (collecting input from people).
- **Evidence of mastery:** Program reads input and echoes a personalized response.
- **Vocabulary:** input, prompt, runtime, user.

- **Do-it-yourself (self-paced):** Make your helper ask for the user's name *and* favorite color, then print one sentence using both.
- **With some help:** A mentor asks, *"What would happen if the user typed a number instead of a name?"* — then you test it.
- **Talk-about-it / ethics:** Computers follow instructions literally. Where could that go wrong if the instructions are unclear?

### Week 2 — Teaching AI to Decide
**Week goal:** Make your AI respond differently depending on what it's told.
**Big idea:** *Decisions are just rules: "if this, then that."*

#### Session 1 · Lesson 3 — My AI Makes Choices
- **Goal:** Use `if` / `else` to make your AI respond differently based on input.
- **Learning objectives:** Write a Boolean condition; branch program flow with `if/else`.
- **Standards:** `2-AP-12` (control structures), `2-AP-11`.
- **Evidence of mastery:** Program produces two distinct outputs depending on a condition.
- **Vocabulary:** condition, Boolean, branch, comparison operator.

#### Session 2 · Lesson 4 — Smarter AI Rules
- **Goal:** Use `if` / `elif` / `else` to make your AI follow multiple rules in order.
- **Learning objectives:** Order multiple mutually-exclusive rules; understand evaluation order; build compound conditions.
- **Standards:** `2-AP-12` (compound conditionals), `2-AP-13` (decompose a rule set).
- **Evidence of mastery:** A 3+ branch decision runs correctly across multiple inputs.
- **Vocabulary:** `elif`, rule order, compound condition, AND/OR.
- **Plan-before-you-code (`2-AP-10`):** Before coding, write your rules in plain English in order (pseudocode). This closes the common gap between *deciding logic* and *writing logic*.

- **Do-it-yourself (self-paced):** Build a 3-rule "mood bot": happy / sad / neutral based on a word the user types.
- **With some help:** Predict which branch runs for 3 sample inputs *before* running, then check.
- **Talk-about-it / ethics:** What happens to inputs you didn't plan a rule for? (Sets up the "fallback rule" idea used in the capstone.)

### Week 3 — Repeating Work
**Week goal:** Make the computer repeat tasks without copy-pasting, and combine a loop with a rule.
**Big idea:** *A loop is a way to say "do this again" precisely.*

#### Session 1 · Lesson 5 — AI Repeats Tasks
- **Goal:** Use a `for` loop to repeat instructions a specific number of times.
- **Learning objectives:** Construct a counted loop; trace iterations.
- **Standards:** `2-AP-12` (iteration), `2-AP-10` (express repetition as an algorithm).
- **Evidence of mastery:** A loop produces the correct number of repeated outputs.
- **Vocabulary:** loop, iteration, `range()`, loop variable.

#### Session 2 · Lesson 6 — Patterns and Predictions
- **Goal:** Combine a loop + a rule to create a predictable pattern.
- **Learning objectives:** Nest a conditional inside a loop; predict output before running.
- **Standards:** `2-AP-12` (nested control structures), `2-AP-17` (predict & verify).
- **Evidence of mastery:** Loop+rule generates the predicted pattern.
- **Vocabulary:** nested structure, pattern, prediction.

- **Do-it-yourself (self-paced):** Print the numbers 1–20, but say "buzz" on every multiple of 3 (loop + rule).
- **With some help:** Trace the loop on paper for the first 5 numbers before running.
- **Talk-about-it:** Where do you see loops in real apps (notifications, game frames, playlists)?

### Week 4 — Patterns & State (Checkpoint Week)
**Week goal:** Build up a value across a loop (counting/accumulating) and consolidate Weeks 1–3.
**Big idea:** *Programs remember and change values as they run — that's "state."*

#### Session 1 · Lesson 7 — AI Notices Patterns
- **Goal:** Use a loop + a changing value to create a pattern you can predict.
- **Learning objectives:** Accumulate / update a value across iterations (counters, accumulators).
- **Standards:** `2-AP-12`, `2-AP-10`.
- **Evidence of mastery:** A value correctly evolves across loop iterations.
- **Vocabulary:** accumulator, counter, state.

#### Session 2 · Checkpoint & Debugging Lab (consolidation — no new lesson)
This planned consolidation session removes the most common "hole" at this age: moving from single
concepts to combining them, and learning to debug systematically.
- **Mixed review challenge:** A short program that uses a variable, input, an `if/elif/else`, and a loop together (recombines Weeks 1–4).
- **Debugging methodology (`2-AP-17`, `2-AP-19`):** Practice the routine **Read the error → find the line → change one thing → re-run.** Use the deliberately-broken snippets in the lesson hints.
- **Evidence of mastery:** Learner fixes 3 broken snippets and explains each fix in one sentence.
- **Stretch project (optional):** "Number-guessing helper" combining loop + conditionals + a counter.

- **Self-paced note:** If any Week 1–4 check was shaky, **redo that lesson's scratch task** before Week 5. This is the safe place to slow down.

### Week 5 — Giving AI a Memory
**Week goal:** Store *many* values together and look them up — instead of dozens of single variables.
**Big idea:** *Data structures organize information so programs can scale.*

#### Session 1 · Lesson 8 — AI Remembers Choices
- **Goal:** Use a list to remember multiple choices over time.
- **Learning objectives:** Create a list, append items, and iterate over it — using a list instead of many single variables.
- **Standards:** `3A-AP-14` (use lists to simplify/generalize solutions), `2-AP-12`.
- **Evidence of mastery:** Program stores multiple values in a list and reads them back.
- **Vocabulary:** list, index, append, element.

#### Session 2 · Lesson 9 — Organizing Memory
- **Goal:** Use a dictionary (key → value) to store information with meaning.
- **Learning objectives:** Model named attributes with key/value pairs; read and update by key.
- **Standards:** `3A-AP-14`, `2-DA-07` (organize data into structured formats).
- **Evidence of mastery:** Program stores and retrieves values by key.
- **Vocabulary:** dictionary, key, value, lookup.

- **Do-it-yourself (self-paced):** Make a "profile" dictionary for your AI (name, mood, favorite topic) and print a sentence from it.
- **With some help:** Compare a list vs. a dictionary for the same data — which is easier to read? Why?
- **Talk-about-it / ethics:** What information should an AI *not* remember about a person? (privacy)

### Week 6 — Reusable Skills (Functions)
**Week goal:** Package a skill once and reuse it; make it flexible with inputs.
**Big idea:** *Functions let you name an idea and reuse it — the heart of "abstraction."*

#### Session 1 · Lesson 10 — Teaching the Bot Skills (Functions)
- **Goal:** Use functions to package a skill and reuse it without rewriting code.
- **Learning objectives:** Define and call a function; explain abstraction and reuse (DRY).
- **Standards:** `2-AP-14` (create procedures), `3A-AP-17` (decompose using procedures), `3A-AP-18`.
- **Evidence of mastery:** A defined function is called and produces correct output.
- **Vocabulary:** function, define/call, abstraction, reuse.

#### Session 2 · Lesson 11 — Giving Functions Better Information (Parameters)
- **Goal:** Use a parameter so one function can work with different details.
- **Learning objectives:** Add parameters; pass arguments; generalize a procedure. Includes one function that **returns a computed value** (not just prints), strengthening the abstraction model (`3A-AP-18`).
- **Standards:** `2-AP-14` (procedures with parameters), `3A-AP-14` (generalize).
- **Evidence of mastery:** One parameterized function returns correct results for different arguments.
- **Vocabulary:** parameter, argument, return value, generalization.

- **Do-it-yourself (self-paced):** Write `greet(name)` that returns a greeting, then call it 3 times with different names.
- **With some help:** Find repeated code in an earlier week and rewrite it as a function.
- **Talk-about-it:** Why do real teams break big programs into small named functions?

### Week 7 — Smart, Rule-Driven AI (+ Plan Your Capstone)
**Week goal:** Put rules *inside* functions, then design the project you'll build in Week 8.
**Big idea:** *Real AI behavior = data + rules + reusable functions working together.*

#### Session 1 · Lesson 12 — Guiding AI with Rules
- **Goal:** Use `if/else` rules inside a function to control behavior based on the parameter.
- **Learning objectives:** Combine functions + conditionals; justify control-flow choices.
- **Standards:** `3A-AP-15` (justify control structures), `2-AP-14`, `2-AP-13`.
- **Evidence of mastery:** A parameterized, rule-driven function behaves correctly across cases.
- **Vocabulary:** dispatch, rule, control flow.

#### Session 2 · Capstone Planning (design session — no new lesson)
A dedicated planning session so Week 8 isn't a cliff (a common drop-off point at this age).
- **Plan your NPC:** In plain English, list (a) 3 rules your NPC will follow, (b) what it will *remember* (a list or dictionary), and (c) its **fallback** for inputs it doesn't recognize.
- **Standards:** `3A-AP-13` (prototype using personal interest), `2-AP-10` (plan before coding).
- **Evidence of mastery:** A one-page plan (rules + memory + fallback) ready to build.

- **Self-paced note:** Save your plan; you'll paste pieces of it into the capstone editor next week.

### Week 8 — Capstone: Build & Ship Your AI
**Week goal:** Craft an NPC brain, then ship a full Quest Adventure Bot that combines the whole track.
**Big idea:** *You can now make a computer behave intelligently — and explain how.*

#### Session 1 · Lesson 13 — Build Your AI NPC
- **Goal:** Modify a rule-based NPC, add memory, and explain which rule ran — like a real game AI builder.
- **Learning objectives:** Integrate variables, conditionals, lists/dictionaries (memory), and functions into one artifact; test and refine; **document a design decision** (reflection).
- **Standards:** `3A-AP-13`, `3A-AP-16` (iteratively develop an artifact), `3A-AP-18`, `3A-AP-23` (document design decisions), `2-AP-17` (systematic testing), `3A-IC-25` (reduce bias / improve the fallback rule).
- **Evidence of mastery:** NPC has a new rule + memory + improved fallback, passes test messages, and the student submits a written reflection.
- **Vocabulary:** NPC, memory, fallback, reflection, iteration.

#### Session 2 · Lesson 14 — Capstone: Quest Adventure Bot
- **Goal:** Invent a story, build a rule-based adventure AI people can talk to, then **play it live** (~60 min project — not drill activities).
- **Learning objectives:** Combine dictionaries, lists+append, functions+parameters, if/elif/else, for loops, and string joining into one fun artifact; prove paths with a Build test list; ship an Adventure chat demo with 3+ live turns; explain which rule fired.
- **Standards:** `3A-AP-13`, `3A-AP-16`, `3A-AP-18`, `2-AP-17`, `3A-AP-23`, `3A-IC-25`.
- **Evidence of mastery:** Build checklist green; Adventure mode shows a multi-turn chat with a growing quest log; student can demo the bot to a peer without reading the code.
- **Vocabulary:** capstone, quest log, rule path, rule-based model, product demo.

---

## Fundamentals coverage map (CSTA Algorithms & Programming)

| Standard | Description | Weeks (lessons) |
| --- | --- | --- |
| 2-AP-10 | Flowcharts/pseudocode for algorithms | W2 (plan), W3 (L5), W4 (L7), W7 (plan) |
| 2-AP-11 | Clearly named variables, data types, operations | W1 (L1, L2), W2 (L3) |
| 2-AP-12 | Control structures incl. nested loops & compound conditionals | W2–W5 (L3–L8) |
| 2-AP-13 | Decompose problems into parts | W2 (L4), W7 (L12), W7–8 (plan/capstone) |
| 2-AP-14 | Procedures with parameters | W6 (L10, L11), W7 (L12) |
| 2-AP-15 | Seek & incorporate feedback to refine | W8 (reflection / iterate) |
| 2-AP-17 | Systematically test & refine with test cases | W1 (L2), W3 (L6), W4 (debug lab), W8 (L13, L14) |
| 2-AP-19 | Document programs to make them easier to follow | W1 (L1), W4 (debug lab), W8 (L13) |
| 3A-AP-13 | Prototype using algorithms & personal interest | W7 (plan), W8 (L13, L14) |
| 3A-AP-14 | Use lists to generalize solutions | W5 (L8, L9), W6 (L11) |
| 3A-AP-15 | Justify selection of control structures | W7 (L12) |
| 3A-AP-16 | Iteratively develop an artifact | W8 (L13, L14) |
| 3A-AP-17 | Decompose using procedures/modules | W6 (L10), W7 (L12) |
| 3A-AP-18 | Create artifacts using procedures + data (incl. return values) | W6 (L10, L11), W8 (L13, L14) |
| 3A-AP-23 | Document design decisions | W8 (L13 reflection, L14) |
| 2-IC-20 | Tradeoffs of computing technologies (AI framing) | W1–W8 (ethics moments) |
| 3A-IC-25 | Reduce bias / equity deficits | W8 (fallback fairness) |

## No-gaps design notes

The 8-week structure deliberately closes the spots where self-paced learners most often stall:

1. **Plan-before-code (`2-AP-10`)** is now explicit in Weeks 2 and 7, so logic design isn't skipped.
2. **A consolidation + debugging week (Week 4)** prevents the "I learned the parts but can't combine them" gap and makes **systematic testing** an assessed skill.
3. **Return values (`3A-AP-18`)** are introduced in Week 6, not left implicit.
4. **A capstone planning session (Week 7)** removes the Week-8 cliff so every learner arrives with a plan.
5. **Reflection & equity (`3A-AP-23`, `3A-IC-25`)** are built into Week 8, not optional.

## Optional future enhancements (not required for accreditation)

- **Collaboration & attribution (`2-AP-16`, `3A-AP-22`):** an optional paired-programming protocol and a note about crediting reused starter code — useful for classroom cohorts and some accreditation rubrics.
- **Box-and-arrow "memory diagrams"** to visualize lists/dictionaries (Week 5) for visual learners.
