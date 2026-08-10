import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson2: AILessonConfig = {
  id: "csp-2",
  title: "2. Development Process: Testing, Debugging & Documentation",
  goal: "Run a disciplined development process — plan, test with real cases, debug systematically, and document clearly.",
  xpReward: 100,
  badge: "Process Pro",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/1",
  nextHref: "/learn/ap-csp-prep/3",
  instructorScript: `**Coach's note**
Today's lesson: **Development Process: Testing, Debugging & Documentation**.

**Goal:** Run a disciplined development process — plan, test with real cases, debug systematically, and document clearly.

**How to facilitate**
1. Warm-up: ask students what they already think about "A program is never done when it 'runs'".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Big Idea 1",
        title: "A program is never done when it 'runs'",
        body: `"It runs" and "it works" are different claims. A program that runs may still produce wrong answers on inputs you never tried. The AP CSP development process treats **testing, debugging, and documentation** as first-class work — not chores you do after the "real" coding.

This lesson turns the iterative loop from Lesson 1 into concrete engineering habits you can defend in AP written responses and use in the Create Performance Task.`,
      },
      {
        id: "types-of-errors",
        kicker: "Diagnose",
        title: "Four kinds of errors the exam names",
        body: `Knowing *which* kind of error you have tells you how to hunt it. AP CSP expects you to recognize these:

| Error type | When it appears | Example |
| --- | --- | --- |
| **Syntax** | Before/at run — breaks language rules | Missing quote or parenthesis |
| **Runtime** | While running — crashes | Divide by zero; index out of range |
| **Logic** | Runs fine but wrong output | Averaging with the wrong count |
| **Overflow** | Value exceeds what the bit width can store | 8-bit counter rolls past 255 |

**Logic errors** are the sneakiest: nothing crashes, but the result is wrong — only testing against known-correct answers catches them. **Overflow** connects to Lesson 3 (bits): fixed-width integers wrap or lose precision when the value is too large.`,
        code: `# SYNTAX  - breaks before it runs
DISPLAY("hi"        # missing )

# RUNTIME - crashes while running
scores <- []
avg <- total / LENGTH(scores)   # division by zero

# LOGIC   - runs fine, answer is WRONG
avg <- (a + b + c) / 2          # divided by 2, not 3

# OVERFLOW - value won't fit in available bits
# 8-bit unsigned max = 255; 255 + 1 wraps toward 0`,
        codeCaption: "Four failure modes: syntax, runtime, logic, overflow",
        checkIn: check(
          "A program runs without crashing but reports an average of 50 when the correct answer is 40. What kind of error is this?",
          ["Syntax error", "Runtime error", "Logic error", "Compilation error"],
          2,
          "The program runs but produces an incorrect result — that is a logic error, found only by comparing to expected output.",
        ),
      },
      {
        id: "testing-limits",
        kicker: "Exam truth",
        title: "Testing finds bugs — it cannot prove there are none",
        body: `This is a high-frequency AP trap:

- Passing tests means: *for those inputs*, the program behaved as expected.
- Passing tests does **not** prove the program is correct for *every* possible input.

There are usually infinitely many inputs. Good testers maximize the chance of catching bugs (typical, boundary, invalid cases) — but a clean test suite is evidence, not a mathematical guarantee. When an MCQ says "the program passed all tests, therefore it has no errors," that conclusion is **false**.`,
        code: `# Test suite: 5 cases all PASS
# Does that prove the program is bug-free?
# NO. It only proves those 5 inputs worked.

# Counterexample thinking:
# You never tested score = 60 (the boundary)
# -> a >= vs > bug could still be hiding`,
        codeCaption: "Tests increase confidence; they never prove total correctness",
        callout: {
          label: "On the AP exam",
          text: "Choose answers that say testing can reveal errors but cannot prove their absence. Absolute claims like 'fully verified' are almost always wrong.",
        },
        checkIn: check(
          "A program passes 40 carefully designed tests. Which statement is most accurate?",
          [
            "The program is guaranteed to have no errors",
            "The program is correct for those tested inputs, but may still fail on untested ones",
            "Testing is useless once 40 tests pass",
            "Only syntax errors could remain",
          ],
          1,
          "Tests support correctness for exercised cases; they cannot prove there are no remaining bugs.",
        ),
      },
      {
        id: "test-cases",
        kicker: "Test",
        title: "Designing test cases that actually catch bugs",
        body: `A single "happy path" test proves almost nothing. Strong test sets cover categories of input:

- **Typical case** — ordinary, expected input
- **Boundary case** — the edges (0, empty list, maximum value)
- **Invalid case** — input the program should reject or handle gracefully

Worked example — a function that reports whether a test score is passing (≥ 60):
- Typical: \`75\` → pass, \`42\` → fail
- Boundary: \`60\` → pass (is the edge inclusive?), \`59\` → fail
- Invalid: \`-5\` or \`"abc"\` → should not silently say "pass"

Boundary cases catch **off-by-one** bugs, the most common logic errors on the exam.`,
        code: `# Test set for is_passing(score) -> should be True when score >= 60
assert is_passing(75) == True    # typical pass
assert is_passing(42) == False   # typical fail
assert is_passing(60) == True    # boundary (inclusive)
assert is_passing(59) == False   # boundary just below
# invalid input should be handled, not crash silently`,
        codeCaption: "Testing typical, boundary, and invalid cases",
        examples: [
          {
            caption: "A bug report is just a repeatable test case in words",
            code: `BUG REPORT
  Input:    is_passing(60)
  Expected: True   (60 is passing)
  Actual:   False
  Steps:    call is_passing(60), read result
  Note:     off-by-one at the >= threshold?`,
          },
        ],
        checkIn: check(
          "Which single input best tests for an off-by-one bug in a function that passes scores of 60 or higher?",
          [
            "A score of 100",
            "A score of exactly 60 (the boundary)",
            "A score of 25",
            "A negative score",
          ],
          1,
          "The boundary value 60 checks whether the threshold is correctly inclusive — the classic off-by-one risk.",
        ),
      },
      {
        id: "debugging",
        kicker: "Debug",
        title: "Debugging is a search, not a guess",
        body: `Debugging means finding and fixing the cause of incorrect behavior. Effective debuggers narrow the search space instead of randomly changing code:

- **Reproduce** the bug reliably with a specific input.
- **Localize** it — add print/display statements or use a debugger to see values partway through.
- **Hypothesize** a cause, make one change, and re-test.
- **Confirm** the fix and check that nothing else broke.

Changing five things at once and hoping is the opposite of debugging — if it "works," you won't know why.`,
        code: `# Localize by DISPLAYING values partway through
total = 0
FOR EACH s IN [90, 80, 70]:
    total <- total + s
    DISPLAY "after", s, "total =", total   # spy line
avg = total / 3
DISPLAY "avg =", avg`,
        codeCaption: "Localize a bug: print values partway through, then narrow",
        output: `after 90 total = 90
after 80 total = 170
after 70 total = 240
avg = 80`,
        checkIn: check(
          "What is the most effective early step when a specific input produces a wrong result?",
          [
            "Rewrite the whole program from scratch",
            "Reproduce the bug reliably, then narrow down where values go wrong",
            "Add ten new features to distract from the bug",
            "Delete the test case that revealed the bug",
          ],
          1,
          "Reproducing and localizing the fault narrows the search so a single, checkable fix can be made.",
        ),
      },
      {
        id: "print-tracing",
        kicker: "Technique",
        title: "Tracing a program by hand",
        body: `On the AP exam you will be asked to **trace** code — predict its output by tracking variable values line by line. This is the same skill you use to localize a logic error.

Walk the card at right: \`count\` starts at 0, then becomes 3 → 3 → 4 → 4 → 5. Output: **5**. The variable \`count\` is misleadingly named; it actually tracks the maximum. Tracing reveals what code *does*, not what its names *promise*.`,
        code: `count <- 0
FOR EACH n IN [3, 1, 4, 1, 5]:
    IF n > count:
        count <- n
DISPLAY count

# hand trace of count after each n:
# 3 -> 3 | 1 -> 3 | 4 -> 4 | 1 -> 4 | 5 -> 5`,
        codeCaption: "Trace by tracking one variable line by line",
        output: "5",
      },
      {
        id: "documentation",
        kicker: "Document",
        title: "Documentation and comments",
        body: `**Documentation** is text that describes how a program works and how to use it. **Comments** are documentation written inside the code, ignored by the interpreter but read by humans.

Good comments explain *why*, not the obvious *what*:
- Weak: \`# add 1 to i\`
- Strong: \`# skip the header row before summing scores\`

The AP framework notes that documentation helps developers (including future you) and collaborators understand, use, and maintain a program — and it is expected in the Create Performance Task write-up.`,
        code: `# WEAK - restates the obvious mechanics
i <- i + 1        # add 1 to i

# STRONG - explains the WHY
start <- 1        # skip row 0 (the header) so it isn't summed as data`,
        codeCaption: "Good comments explain why, not what the code obviously does",
        checkIn: check(
          "Which comment is the most useful form of documentation?",
          [
            "# loop",
            "# set x to 0",
            "# reset the running total before each new student",
            "# this is a variable",
          ],
          2,
          "Strong comments explain intent/why; restating the obvious mechanics adds little value.",
        ),
      },
      {
        id: "program-behavior",
        kicker: "Specify",
        title: "Describing program behavior precisely",
        body: `Before testing, you must know what "correct" means. A **specification** states, for given inputs, what outputs and side effects are expected.

For a rounding function: "Given a number, return it rounded to the nearest whole number; ties round up." Now \`round(2.5)\` has a defined correct answer (3) you can test against. Without a spec, you cannot tell a bug from a feature.`,
      },
      {
        id: "edge-cases",
        kicker: "Boundaries",
        title: "Edge cases and graceful failure",
        body: `Real inputs include the empty, the huge, and the unexpected. Ask: what happens with an **empty list**, a **zero**, a **negative**, or a **very large** value?

A robust program fails *gracefully* — it shows a clear message or default rather than crashing or silently producing nonsense. On the exam, the "best" design usually handles edge cases explicitly rather than assuming perfect input.`,
        code: `PROCEDURE average(scores):
    IF LENGTH(scores) = 0:          # edge case first!
        DISPLAY "No scores yet"
        RETURN 0
    RETURN SUM(scores) / LENGTH(scores)

average([])       # empty  -> clear message, no crash
average([90, 80]) # typical -> 85`,
        codeCaption: "Handle the empty/zero edge case before the normal path",
        output: `No scores yet
85`,
        callout: {
          label: "On the AP exam",
          text: "When a question asks which input best tests a program, the answer is usually a boundary or edge case (empty, zero, maximum) — not another typical value.",
        },
      },
      {
        id: "iterate-again",
        kicker: "Process",
        title: "Testing feeds the next iteration",
        body: `Testing is not a final gate; each failed test is information for the next loop of the iterative process from Lesson 1. You log the failure, form a hypothesis, revise, and re-test.

This is why development is described as **incremental**: you grow the program in small, tested steps rather than one giant untested leap. Small steps mean when something breaks, you know roughly where it broke.`,
        code: `VERSION HISTORY  (each small, tested step)
  v3  Ava   fix off-by-one in average()      [tests pass]
  v2  Ben   add empty-list guard             [tests pass]
  v1  Ava   first working average()          [1 test fails]
# something broke at v3? compare to v2 and roll back`,
        codeCaption: "Version history = small tested steps you can roll back to",
      },
      {
        id: "collab-testing",
        kicker: "Collaboration",
        title: "Others test what you can't see",
        body: `You know how your program is "supposed" to be used, so you unconsciously avoid the paths that break it. A teammate or fresh tester will try things you never would — and find bugs you're blind to.

This connects back to Big Idea 1: collaboration improves quality precisely because different people generate different inputs and expectations.`,
      },
      {
        id: "worked-debug",
        kicker: "Worked example",
        title: "Catching an off-by-one bug",
        body: `A student's average function divides the total by the number of *scores entered so far* — but increments the counter after the last addition. On a list of 4 scores it divides by 3, reporting an average that's too high.

The syntax is fine; it runs. Only a test comparing against a hand-computed average (boundary: a known small list) reveals it. The fix is one line — moving the increment — but finding it required a good test case and a trace.`,
        examples: [
          {
            caption: "Buggy: counter lags one behind, so it divides by too few",
            code: `n <- 0
total <- 0
FOR EACH s IN [80, 90, 70, 60]:
    total <- total + s
    IF s IS last: BREAK before n <- n + 1  # bug: last not counted
# total = 300, n = 3
DISPLAY total / n`,
            output: "100   (wrong - should be 75)",
          },
          {
            caption: "Fixed: count every score, then divide",
            code: `n <- LENGTH(scores)     # count first, no off-by-one
total <- SUM(scores)    # 80+90+70+60 = 300
DISPLAY total / n`,
            output: "75   (matches the hand-computed average)",
          },
        ],
        checkIn: check(
          "A function averages 4 numbers but divides by 3, so it runs but returns a value that is too high. Which testing choice would most reliably catch this?",
          [
            "Running it once on a random large dataset and eyeballing the result",
            "Comparing its output to a hand-computed average on a small known list",
            "Checking that the program has no syntax errors",
            "Adding more comments to the code",
          ],
          1,
          "A small list with a known-correct average exposes the off-by-one logic error precisely.",
        ),
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "The habits of a Process Pro",
        body: `Plan against a specification, test typical/boundary/invalid inputs, debug by narrowing the search, and document intent. These habits are exactly what the Create Performance Task rewards, and they show up throughout the AP multiple-choice section.

Next you'll turn from *process* to *data* — how computers represent everything as bits, and how abstraction lets us build meaning on top of them.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Write one killer test case",
        body: `Pick a simple function (e.g., "is this year a leap year?"). Write one boundary test case and explain what specific bug it is designed to catch.`,
      },
    ],
  },
  bigIdeas: [
    "**Logic errors run silently** — a program can execute perfectly and still be wrong; only testing against expected results reveals them.",
    "Strong test sets cover typical, boundary, and invalid inputs — boundaries catch off-by-one bugs.",
    "Debugging is a systematic search: reproduce, localize, hypothesize one fix, and confirm.",
    "Documentation and comments explain *why* code exists, helping collaborators and future maintainers.",
  ],
  keyTerms: [
    { term: "Syntax error", definition: "Code that breaks the language's rules and won't run." },
    { term: "Logic error", definition: "Code that runs but produces incorrect results." },
    { term: "Test case", definition: "A specific input paired with the expected output, used to check correctness." },
    { term: "Boundary case", definition: "Input at the edge of valid ranges, where off-by-one bugs hide." },
    { term: "Debugging", definition: "Systematically finding and fixing the cause of incorrect behavior." },
    { term: "Documentation", definition: "Text (including comments) describing how a program works and how to use it." },
  ],
  realWorld:
    "Professional teams gate releases on automated test suites covering edge cases — the same typical/boundary/invalid thinking scaled up to thousands of checks.",
  quiz: [
    {
      id: "q1",
      question: "A program compiles and runs but consistently outputs the wrong total. This is a:",
      choices: ["syntax error", "runtime error", "logic error", "hardware error"],
      correctIndex: 2,
      explanation: "It runs but is incorrect — the defining trait of a logic error.",
    },
    {
      id: "q2",
      question: "Which set of test inputs best checks a function that passes scores of 60 or higher?",
      choices: [
            "The same value tested five times",
            "Only positive numbers above 80",
            "59, 60, and 61 (values around the boundary)",
            "Only 90 and 95",
          ],
      correctIndex: 2,
      explanation: "Testing around the boundary (59/60/61) catches off-by-one errors at the threshold.",
    },
    {
      id: "q3",
      question: "What is the best first step in debugging a reported problem?",
      choices: [
            "Reproduce the incorrect behavior with a specific input",
            "Ship it and wait for more reports",
            "Remove all comments",
            "Rewrite the program in a different language",
          ],
      correctIndex: 0,
      explanation: "Reliable reproduction lets you localize and confirm a fix.",
    },
    {
      id: "q4",
      question: "Tracing the code below, what is displayed?\n`m ← 0` then for each n in [2,7,4]: if n > m then m ← n; DISPLAY m",
      choices: ["2", "4", "7", "13"],
      correctIndex: 2,
      explanation: "m tracks the maximum: 0→2→7→7, so it displays 7.",
    },
    {
      id: "q5",
      question: "Which is the strongest comment?",
      choices: [
            "# increment i",
            "# skip the header row so it isn't counted as data",
            "# variable",
            "# loop starts here",
          ],
      correctIndex: 1,
      explanation: "Good comments explain intent (why), not obvious mechanics.",
    },
    {
      id: "q6",
      question: "Why is developing a program incrementally (small tested steps) beneficial?",
      choices: [
            "It guarantees no logic errors ever occur",
            "When something breaks, the recent small change points to the cause",
            "It removes the need for any testing",
            "It makes the final file smaller",
          ],
      correctIndex: 1,
      explanation: "Small, tested increments localize failures to the most recent change.",
    },
    {
      id: "q7",
      question: "A robust program given an empty list of scores should ideally:",
      choices: [
            "Crash with an unhandled error",
            "Display a clear message or a sensible default instead of crashing",
            "Silently report an average of 100",
            "Delete the list",
          ],
      correctIndex: 1,
      explanation: "Graceful handling of edge cases (like empty input) is the hallmark of robust design.",
    },
    {
      id: "q8",
      question: "Why does having a teammate test your program often reveal bugs you missed?",
      choices: [
        "Teammates change the programming language",
        "They try inputs and paths you unconsciously avoid",
        "They make the CPU faster",
        "Their testing removes the need for a specification",
      ],
      correctIndex: 1,
      explanation: "Fresh testers generate inputs the author is blind to, exposing hidden defects.",
    },
  ],
  reflection: {
    prompt:
      "The Create PT asks you to describe how you tested and refined your program. Describe one bug you could imagine in a program you'd build, the test case that would catch it, and how you'd confirm the fix.",
    placeholder: "The bug, the test case (typical/boundary/invalid), and your confirmation step…",
  },
};
