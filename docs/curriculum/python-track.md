# Python & AI Foundations Track — Curriculum

**Track length:** 13 lessons · **XP range:** 50 → 700 · **Grade band:** 6–10 (CSTA Level 2 core, reaching 3A)
**Primary emphasis:** programming **fundamentals** (sequence → variables → conditionals → loops → data structures → functions → capstone)
**Through-line:** every lesson frames coding as *teaching an AI helper exact instructions*, building **AI literacy** alongside CS fundamentals.

> Standards codes below are **CSTA 2017**. Cross-curricular and forward-compatibility (CSTA Draft 3.0)
> codes are in the [master matrix](standards-alignment.md).

---

## Scope & sequence

### Unit 1 — Sequencing & Output (Lessons 1–2)

#### Lesson 1 — My First AI Helper
- **Goal:** Write your first Python program: use a variable + `print()` to introduce your AI helper.
- **Learning objectives:** Students will (1) declare a clearly named string variable, (2) use the assignment operator correctly, (3) build output with string concatenation, and (4) debug the two most common literal-string errors (missing quotes, missing spaces).
- **Standards:** `2-AP-11` (clearly named variables / data types), `2-AP-19` (documenting/reading code), `2-IC-20` (computers follow instructions exactly — AI framing).
- **Evidence of mastery:** Scratch program runs without errors and prints one sentence containing a variable value.
- **Vocabulary:** variable, assignment (`=`), string, concatenation, output.

#### Lesson 2 — My AI Helper Listens
- **Goal:** Use `input()` to collect information and respond using the user's input.
- **Learning objectives:** Capture user input into a variable and incorporate it into a response; reason about program *state* changing at runtime.
- **Standards:** `2-AP-11`, `2-AP-17` (test with a range of inputs), `2-IC-22` (collecting input from people).
- **Evidence of mastery:** Program reads input and echoes a personalized response.
- **Vocabulary:** input, prompt, runtime, user.

### Unit 2 — Decisions & Logic (Lessons 3–4)

#### Lesson 3 — My AI Makes Choices
- **Goal:** Use `if` / `else` to make your AI respond differently based on input.
- **Learning objectives:** Write a Boolean condition; branch program flow with `if/else`.
- **Standards:** `2-AP-12` (control structures), `2-AP-11`.
- **Evidence of mastery:** Program produces two distinct outputs depending on a condition.
- **Vocabulary:** condition, Boolean, branch, comparison operator.

#### Lesson 4 — Smarter AI Rules
- **Goal:** Use `if` / `elif` / `else` to make your AI follow multiple rules in order.
- **Learning objectives:** Order multiple mutually-exclusive rules; understand evaluation order; build compound conditions.
- **Standards:** `2-AP-12` (compound conditionals), `2-AP-13` (decompose a rule set).
- **Evidence of mastery:** A 3+ branch decision runs correctly across multiple inputs.
- **Vocabulary:** `elif`, rule order, compound condition, AND/OR.

### Unit 3 — Repetition & Patterns (Lessons 5–7)

#### Lesson 5 — AI Repeats Tasks
- **Goal:** Use a `for` loop to repeat instructions a specific number of times.
- **Learning objectives:** Construct a counted loop; trace iterations.
- **Standards:** `2-AP-12` (iteration), `2-AP-10` (express repetition as an algorithm).
- **Evidence of mastery:** A loop produces the correct number of repeated outputs.
- **Vocabulary:** loop, iteration, `range()`, loop variable.

#### Lesson 6 — Patterns and Predictions
- **Goal:** Combine a loop + a rule to create a predictable pattern.
- **Learning objectives:** Nest a conditional inside a loop; predict output before running.
- **Standards:** `2-AP-12` (nested control structures), `2-AP-17` (predict & verify).
- **Evidence of mastery:** Loop+rule generates the predicted pattern.
- **Vocabulary:** nested structure, pattern, prediction.

#### Lesson 7 — AI Notices Patterns
- **Goal:** Use a loop + a changing value to create a pattern you can predict.
- **Learning objectives:** Accumulate / update a value across iterations (counters, accumulators).
- **Standards:** `2-AP-12`, `2-AP-10`.
- **Evidence of mastery:** A value correctly evolves across loop iterations.
- **Vocabulary:** accumulator, counter, state.

### Unit 4 — Data Structures (Lessons 8–9)

#### Lesson 8 — AI Remembers Choices
- **Goal:** Use a list to remember multiple choices over time.
- **Learning objectives:** Create a list, append items, and iterate over it — using a list instead of many single variables.
- **Standards:** `3A-AP-14` (use lists to simplify/generalize solutions), `2-AP-12`.
- **Evidence of mastery:** Program stores multiple values in a list and reads them back.
- **Vocabulary:** list, index, append, element.

#### Lesson 9 — Organizing Memory
- **Goal:** Use a dictionary (key → value) to store information with meaning.
- **Learning objectives:** Model named attributes with key/value pairs; read and update by key.
- **Standards:** `3A-AP-14`, `2-DA-07` (organize data into structured formats).
- **Evidence of mastery:** Program stores and retrieves values by key.
- **Vocabulary:** dictionary, key, value, lookup.

### Unit 5 — Functions & Abstraction (Lessons 10–12)

#### Lesson 10 — Teaching the Bot Skills (Functions)
- **Goal:** Use functions to package a skill and reuse it without rewriting code.
- **Learning objectives:** Define and call a function; explain abstraction and reuse (DRY).
- **Standards:** `2-AP-14` (create procedures), `3A-AP-17` (decompose using procedures), `3A-AP-18`.
- **Evidence of mastery:** A defined function is called and produces correct output.
- **Vocabulary:** function, define/call, abstraction, reuse.

#### Lesson 11 — Giving Functions Better Information (Parameters)
- **Goal:** Use a parameter so one function can work with different details.
- **Learning objectives:** Add parameters; pass arguments; generalize a procedure.
- **Standards:** `2-AP-14` (procedures with parameters), `3A-AP-14` (generalize).
- **Evidence of mastery:** One parameterized function returns correct results for different arguments.
- **Vocabulary:** parameter, argument, return value, generalization.

#### Lesson 12 — Guiding AI with Rules
- **Goal:** Use `if/else` rules inside a function to control behavior based on the parameter.
- **Learning objectives:** Combine functions + conditionals; justify control-flow choices.
- **Standards:** `3A-AP-15` (justify control structures), `2-AP-14`, `2-AP-13`.
- **Evidence of mastery:** A parameterized, rule-driven function behaves correctly across cases.
- **Vocabulary:** dispatch, rule, control flow.

### Unit 6 — Capstone (Lesson 13)

#### Lesson 13 — Build Your AI NPC
- **Goal:** Modify a rule-based NPC, add memory, and explain which rule ran — like a real game AI builder.
- **Learning objectives:** Integrate variables, conditionals, lists/dictionaries (memory), and functions into one artifact; test and refine; **document a design decision** (reflection).
- **Standards:** `3A-AP-13` (prototype using algorithms), `3A-AP-16` (iteratively develop an artifact), `3A-AP-18`, `3A-AP-23` (document design decisions), `2-AP-17` (systematic testing), `3A-IC-25` (reduce bias / improve the fallback rule).
- **Evidence of mastery:** NPC has a new rule + memory + improved fallback, passes test messages, and the student submits a written reflection.
- **Vocabulary:** NPC, memory, fallback, reflection, iteration.

---

## Fundamentals coverage map (CSTA Algorithms & Programming)

| Standard | Description | Lessons |
| --- | --- | --- |
| 2-AP-10 | Flowcharts/pseudocode for algorithms | 5, 7 (express repetition/accumulation as algorithms) |
| 2-AP-11 | Clearly named variables, data types, operations | 1, 2, 3 |
| 2-AP-12 | Control structures incl. nested loops & compound conditionals | 3, 4, 5, 6, 7, 8 |
| 2-AP-13 | Decompose problems into parts | 4, 12, 13 |
| 2-AP-14 | Procedures with parameters | 10, 11, 12 |
| 2-AP-15 | Seek & incorporate feedback to refine | 13 (reflection / iterate) |
| 2-AP-17 | Systematically test & refine with test cases | 2, 6, 13 |
| 2-AP-19 | Document programs to make them easier to follow | 1 (read/annotate), 13 |
| 3A-AP-13 | Prototype using algorithms & personal interest | 13 |
| 3A-AP-14 | Use lists to generalize solutions | 8, 9, 11 |
| 3A-AP-15 | Justify selection of control structures | 12 |
| 3A-AP-16 | Iteratively develop an artifact | 13 |
| 3A-AP-17 | Decompose using procedures/modules | 10, 12 |
| 3A-AP-18 | Create artifacts using procedures + data | 10, 13 |
| 3A-AP-23 | Document design decisions | 13 |
| 2-IC-20 | Tradeoffs of computing technologies (AI framing) | 1–13 (ethics moments) |
| 3A-IC-25 | Reduce bias / equity deficits | 13 |

## Gap analysis & roadmap (fundamentals)

The track gives **strong, well-sequenced coverage** of Level 2 Algorithms & Programming and reaches
several 3A objectives. To deepen rigor toward full Level 3A and to strengthen "fundamentals" further,
the following additions are recommended (proposed — pending approval):

1. **Algorithm design before code (`2-AP-10`).** Add an explicit *pseudocode / flowchart* warm-up to Lessons 4 and 12 so students plan an algorithm before implementing it. (Low effort: instructor-script + "steps" edits.)
2. **Return values & functions that compute (`3A-AP-18`).** Lessons 10–12 use functions for behavior; add one objective on a function that *returns* a computed value (not just prints), strengthening the abstraction model.
3. **Debugging methodology (`2-AP-17`, `2-AP-19`).** A short "read the error, isolate, test one change" mini-lesson or sidebar, reused across the track, to make systematic testing an explicit, assessed skill.
4. **Collaboration & attribution (`2-AP-16`, `3A-AP-22`).** Optional paired-programming protocol + an attribution note when reusing starter code, to cover the collaboration standards required for some accreditation rubrics.

These are content/text enhancements within the existing engine; none require new infrastructure.
