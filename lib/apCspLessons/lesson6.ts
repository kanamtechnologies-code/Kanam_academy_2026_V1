import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson6: AILessonConfig = {
  id: "csp-6",
  title: "6. Conditionals & Boolean Logic",
  goal: "Control program flow with selection, and evaluate Boolean expressions using AND, OR, NOT and truth tables.",
  xpReward: 300,
  badge: "Logic Guard",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/5",
  nextHref: "/learn/ap-csp-prep/7",
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Big Idea 3",
        title: "Making programs decide",
        body: `So far programs run straight through. **Selection** (conditionals) lets a program choose *different* code paths based on conditions — the difference between "print the average" and "print the average, but warn if the list was empty."

Selection is required in the Create Performance Task, and Boolean-logic questions are a reliable source of multiple-choice points. This lesson makes both automatic.`,
      },
      {
        id: "if",
        kicker: "Select",
        title: "The IF statement",
        body: `An **IF** statement runs a block only when a Boolean condition is true. The condition must evaluate to a Boolean — exactly the comparisons from Lesson 5. If it's true the block runs; otherwise nothing happens.`,
        code: `score <- 72
IF (score >= 60):
    DISPLAY "Pass"      # runs only when the condition is true

# score 72 >= 60 -> true -> "Pass"
# score 40 >= 60 -> false -> (nothing happens)`,
        codeCaption: "IF runs its block only when the condition is true",
        output: "Pass",
      },
      {
        id: "if-else",
        kicker: "Two paths",
        title: "IF / ELSE and the two-way choice",
        body: `**ELSE** provides an alternative path when the condition is false. With an IF/ELSE, exactly one of the two blocks runs — this guarantees a response for every input.

**The ELSE is optional, though.** A bare \`IF\` (no ELSE) is completely valid: when the condition is true the block runs, and when it's false *nothing happens* and the program simply continues. Use a plain IF when "do nothing" is the correct behavior for the false case; add an ELSE only when the false case needs its own action.

That optionality is also a trap. A frequent bug is *needing* two outcomes but forgetting the ELSE, so some inputs silently produce no output at all. Ask yourself: "If the condition is false, does my program still need to do something?" If yes, you need an ELSE.`,
        code: `# IF with ELSE -> exactly one branch runs
IF (score >= 60):
    DISPLAY "Pass"       # taken when true
ELSE:
    DISPLAY "Try again"  # taken when false
# score = 45 -> condition false -> ELSE branch

# IF alone (ELSE is OPTIONAL) -> false just does nothing
IF (score >= 90):
    DISPLAY "Honor roll!"   # only when true; else: silent
DISPLAY "Done"             # runs either way`,
        codeCaption: "IF/ELSE runs exactly one branch; a bare IF is valid and does nothing when false",
        output: "Try again",
        checkIn: check(
          "In an IF/ELSE statement, how many of the two blocks run for a given input?",
          ["Always both", "Exactly one", "Sometimes zero", "It depends on the loop"],
          1,
          "IF/ELSE always runs exactly one branch: the IF block if the condition is true, otherwise the ELSE block.",
        ),
      },
      {
        id: "else-if",
        kicker: "Many paths",
        title: "Chained conditions for multiple cases",
        body: `To choose among more than two outcomes, chain conditions. Order matters — the first true condition wins, and the rest are skipped. Because 95 is also ≥ 80 and ≥ 70, ordering from highest to lowest is essential; reversing it would label a 95 as "C".`,
        code: `score = 95
if score >= 90:
    grade = "A"        # 95 hits here FIRST -> stop
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(grade)`,
        codeCaption: "Chained conditionals: the first true branch wins, order high to low",
        output: "A",
        examples: [
          {
            caption: "Wrong order -> broad test grabs a high score by mistake",
            code: `if score >= 70:      # 95 matches here first...
    grade = "C"      # ...and gets a C. BUG!
elif score >= 90:
    grade = "A"`,
            output: "C   (wrong - 95 should be A)",
          },
        ],
        checkIn: check(
          "Using the grade chain above (≥90 A, ≥80 B, ≥70 C, else F), what grade does a score of 82 get?",
          ["A", "B", "C", "F"],
          1,
          "82 is not ≥ 90 but is ≥ 80, so the first true branch assigns B.",
        ),
      },
      {
        id: "boolean-ops",
        kicker: "Combine",
        title: "AND, OR, NOT",
        body: `Boolean **logical operators** combine or invert conditions:

- \`AND\` — true only when **both** sides are true.
- \`OR\` — true when **at least one** side is true.
- \`NOT\` — inverts: \`NOT true\` is \`false\`.

A very common exam trap: \`AND\` is stricter than \`OR\`. "13 AND 19" both must hold; "Sat OR Sun" needs only one.`,
        code: `# AND: BOTH must be true (stricter)
(age >= 13) AND (age <= 19)   # true only for 13..19

# OR: at least ONE true (looser)
(day = "Sat") OR (day = "Sun")  # true on either day

# NOT: flips the value
NOT (loggedIn)                # true when NOT logged in`,
        codeCaption: "AND needs both; OR needs one; NOT flips",
      },
      {
        id: "truth-tables",
        kicker: "Evaluate",
        title: "Truth tables",
        body: `A **truth table** lists every combination of inputs and the resulting output. For two Booleans P and Q:

| P | Q | P AND Q | P OR Q |
| --- | --- | --- | --- |
| T | T | T | T |
| T | F | F | T |
| F | T | F | T |
| F | F | F | F |

When a question has a compound condition, build the table (or reason row by row) instead of guessing. This turns tricky logic into a mechanical check.`,
        code: ` P  |  Q  | P AND Q | P OR Q | NOT P
----+-----+---------+--------+------
 T  |  T  |    T    |   T    |   F
 T  |  F  |    F    |   T    |   F
 F  |  T  |    F    |   T    |   T
 F  |  F  |    F    |   F    |   T`,
        codeCaption: "AND is true on 1 row; OR is false on 1 row - memorize the shape",
        checkIn: check(
          "P is true and Q is false. What is the value of (P AND Q) OR (NOT Q)?",
          ["true", "false", "cannot be determined", "always toggles"],
          0,
          "P AND Q is false; NOT Q is true; false OR true is true.",
        ),
      },
      {
        id: "de-morgan",
        kicker: "Simplify",
        title: "Negating compound conditions",
        body: `Negating an AND/OR flips both the operator and the parts (De Morgan's laws), which the exam tests indirectly:

- \`NOT (A AND B)\` is the same as \`(NOT A) OR (NOT B)\`
- \`NOT (A OR B)\` is the same as \`(NOT A) AND (NOT B)\`

Example: "reject if NOT (logged in AND verified)" means "reject if not logged in OR not verified." Getting this backwards is a classic access-control bug.`,
        code: `NOT (A AND B)  ==  (NOT A) OR  (NOT B)
NOT (A OR  B)  ==  (NOT A) AND (NOT B)

# flip the operator AND negate each part
NOT (loggedIn AND verified)
  == (NOT loggedIn) OR (NOT verified)`,
        codeCaption: "De Morgan: push NOT inward - flip AND<->OR and negate each part",
        checkIn: check(
          "Which expression is equivalent to NOT (raining OR cold)?",
          [
            "(NOT raining) OR (NOT cold)",
            "(NOT raining) AND (NOT cold)",
            "raining AND cold",
            "raining OR cold",
          ],
          1,
          "By De Morgan's law, NOT (A OR B) becomes (NOT A) AND (NOT B).",
        ),
      },
      {
        id: "nested",
        kicker: "Structure",
        title: "Nested conditionals",
        body: `Conditionals can contain other conditionals. **Nesting** expresses "within this case, decide further." Trace nested logic by asking which outer branch you're in *first*, then resolving the inner choice. Indentation shows the structure — mismatched indentation is a common source of wrong answers.`,
        code: `IF (isMember):          # outer decision first
    IF (age >= 65):     # inner decision only for members
        price <- 5
    ELSE:
        price <- 8
ELSE:
    price <- 12         # non-members skip the age check

# non-member, age 70 -> outer ELSE -> price 12`,
        codeCaption: "Nested: resolve the outer branch first, then the inner one",
        output: "price = 12",
        checkIn: check(
          "Using the nested code above, what price does a non-member who is 70 pay?",
          ["5", "8", "12", "cannot tell"],
          2,
          "A non-member takes the outer ELSE branch (price 12); the age check only applies to members.",
        ),
      },
      {
        id: "nested-trace",
        kicker: "Worked trace",
        title: "Tracing a nested IF like the exam",
        body: `Exam questions love nested conditionals where you must predict **exactly what is displayed**. Trace them mechanically: resolve the **outer** condition first, then only the inner branch you actually entered. Never evaluate a branch you didn't take.

Consider this classifier and trace three inputs:

- **temp = 90:** outer \`temp > 80\` is true → enter the hot branch. Inner \`humidity > 60\`? With humidity 70, true → DISPLAY \`"Hot and humid"\`. (The \`temp < 40\` branch is never even looked at.)
- **temp = 30:** outer \`temp > 80\` false → check \`temp < 40\`, true → DISPLAY \`"Cold"\`.
- **temp = 65:** outer false, \`temp < 40\` false → outer ELSE → DISPLAY \`"Mild"\`.

Writing the branch taken at each step — instead of eyeballing it — is what prevents the classic mistake of reporting output from a branch the program skipped.`,
        code: `# temp = 90, humidity = 70
IF (temp > 80):                 # 90 > 80 -> TRUE, enter here
    IF (humidity > 60):         # 70 > 60 -> TRUE
        DISPLAY "Hot and humid" # <- printed
    ELSE:
        DISPLAY "Hot and dry"   # skipped
ELSE IF (temp < 40):            # never checked (outer was true)
    DISPLAY "Cold"
ELSE:
    DISPLAY "Mild"`,
        codeCaption: "Resolve the outer branch first, then only the inner branch you entered",
        output: `temp=90,hum=70 -> "Hot and humid"
temp=30        -> "Cold"
temp=65        -> "Mild"`,
        checkIn: check(
          "In the classifier above, what is displayed for temp = 85 and humidity = 50?",
          ['"Hot and humid"', '"Hot and dry"', '"Cold"', '"Mild"'],
          1,
          "85 > 80 enters the hot branch; humidity 50 is not > 60, so the inner ELSE runs: 'Hot and dry'.",
        ),
      },
      {
        id: "short-circuit",
        kicker: "Detail",
        title: "Condition order and short-circuit evaluation",
        body: `Conditions are evaluated **left to right**, and many languages **short-circuit** — they stop as soon as the result is certain:

- For \`A AND B\`: if \`A\` is **false**, the whole AND is already false, so \`B\` is **never evaluated**. (AND can only be true if both are true — one false is enough to decide.)
- For \`A OR B\`: if \`A\` is **true**, the whole OR is already true, so \`B\` is **never evaluated**. (OR only needs one true.)

This makes **order matter for correctness and safety**, not just style. Compare:

- \`(count > 0) AND (total / count > 50)\` — if \`count\` is 0, the first part is false, the AND short-circuits, and the risky division is *never run*. Safe.
- \`(total / count > 50) AND (count > 0)\` — the division runs *first*, so \`count = 0\` causes a divide-by-zero crash *before* the guard is ever checked. Unsafe.

The rule of thumb: **put the protective (or cheap) test first** so a dangerous or expensive test only runs when it's safe to. Even in a language that doesn't short-circuit, ordering the guard first is good defensive design — and on the exam you should be able to explain *why* the order changes the behavior.`,
        code: `# Evaluation is LEFT to RIGHT, and AND short-circuits:
IF (count > 0) AND (total / count > 50):   # SAFE
    DISPLAY "high average"
# count = 0 -> (count > 0) is false -> AND stops here
#             -> division is NEVER evaluated

# Reverse the order -> division runs first -> crash
IF (total / count > 50) AND (count > 0):   # RISKY
    ...
# count = 0 -> total / 0 evaluated FIRST -> divide-by-zero

# OR short-circuits the other way:
IF (isAdmin) OR (expensiveCheck()):
    ...      # if isAdmin is true, expensiveCheck() is skipped`,
        codeCaption: "Short-circuit: AND stops on the first false, OR stops on the first true",
        callout: {
          label: "On the AP exam",
          text: "Order conditions so a protective test comes first. With AND, a false left side skips the right side; with OR, a true left side skips the right side — that is short-circuit evaluation.",
        },
        checkIn: check(
          "In a short-circuiting language, for which value is the right side of `(x != 0) AND (100 / x > 5)` never evaluated?",
          ["x = 0", "x = 5", "x = 20", "x = 100"],
          0,
          "When x = 0 the left side (x != 0) is false, so the AND is already false and the division on the right is skipped — avoiding divide-by-zero.",
        ),
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Leap-year logic",
        body: `A year is a leap year if it's divisible by 4, **except** century years unless divisible by 400. Trace 2000: div by 4 ✔; (not div by 100? no) OR (div by 400? yes) → true. Leap. Trace 1900: div by 4 ✔; (not div by 100? no) OR (div by 400? no) → false. Not leap. This shows AND/OR working together with MOD.`,
        code: `def is_leap(year):
    return (year % 4 == 0) and (year % 100 != 0 or year % 400 == 0)

print(is_leap(2000))   # 2000: /400 -> leap
print(is_leap(1900))   # 1900: /100 not /400 -> not leap
print(is_leap(2024))   # 2024: /4 not /100 -> leap`,
        codeCaption: "Leap year: AND/OR combined with MOD",
        output: `True
False
True`,
      },
      {
        id: "misconceptions",
        kicker: "Avoid traps",
        title: "Selection pitfalls",
        body: `Watch for these on the exam:

1. Using \`AND\` where \`OR\` is meant (or vice versa) — read "either/or" as OR, "both/all" as AND.
2. Ordering a chained IF from least to most specific, so a broad condition catches values meant for a narrower one.
3. Forgetting the ELSE, leaving some inputs unhandled.
4. Mis-negating a compound condition (De Morgan).`,
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "You now control the flow",
        body: `You can write IF/ELSE and chained/nested conditionals, combine conditions with AND/OR/NOT, and verify tricky logic with truth tables. Selection plus the variables of Lesson 5 already let you build genuinely useful programs.

Next you'll add repetition — iteration and loops — so a program can do work many times without you writing it many times.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Write a compound condition",
        body: `Write one Boolean condition (using AND or OR) that decides whether a user gets free shipping (e.g., order over $50 OR member). Then state one input that makes it true and one that makes it false.`,
      },
    ],
  },
  bigIdeas: [
    "**Selection** (IF/ELSE) lets a program run different code for different inputs; exactly one branch of an IF/ELSE runs.",
    "In chained conditionals, order matters — the first true condition wins.",
    "`AND` requires all parts true; `OR` needs only one; `NOT` inverts — verify with truth tables.",
    "Negating compound conditions flips both the operator and the parts (De Morgan's laws).",
  ],
  keyTerms: [
    { term: "Selection", definition: "Choosing which code to run based on a Boolean condition." },
    { term: "Conditional (IF/ELSE)", definition: "A statement that runs one block if a condition is true and another if false." },
    { term: "Boolean expression", definition: "An expression that evaluates to true or false." },
    { term: "Logical operators", definition: "AND, OR, and NOT, which combine or invert Boolean values." },
    { term: "Truth table", definition: "A table listing all input combinations and their Boolean result." },
    { term: "Nested conditional", definition: "A conditional placed inside another conditional's block." },
  ],
  realWorld:
    "Login systems, game rules, and pricing engines are giant conditionals — 'if verified AND not locked out, grant access' is Boolean logic protecting real accounts.",
  quiz: [
    {
      id: "q1",
      question: "For an IF/ELSE, which is always true?",
      choices: [
        "Both blocks run every time",
        "Exactly one block runs",
        "Neither block runs unless there is a loop",
        "The ELSE block runs first",
      ],
      correctIndex: 1,
      explanation: "IF/ELSE runs the IF block when true, otherwise the ELSE block — exactly one.",
    },
    {
      id: "q2",
      question: "P is false, Q is true. What is (P OR Q) AND (NOT P)?",
      choices: ["true", "false", "undefined", "depends on Q only"],
      correctIndex: 0,
      explanation: "P OR Q is true; NOT P is true; true AND true is true.",
    },
    {
      id: "q3",
      question: "A chain: IF x≥70 'C' ELSE IF x≥80 'B' ELSE IF x≥90 'A'. Why is this buggy?",
      choices: [
        "It has too many branches",
        "The order is wrong — 95 matches x≥70 first and gets 'C'",
        "It uses MOD incorrectly",
        "ELSE IF is not valid",
      ],
      correctIndex: 1,
      explanation: "Broadest condition first captures higher scores; order from most to least specific.",
    },
    {
      id: "q4",
      question: "Which condition is true only for teenagers aged 13 to 19 inclusive?",
      choices: [
        "(age ≥ 13) OR (age ≤ 19)",
        "(age ≥ 13) AND (age ≤ 19)",
        "NOT (age = 13)",
        "(age > 13) AND (age < 19)",
      ],
      correctIndex: 1,
      explanation: "Both bounds must hold, so AND with inclusive comparisons is correct.",
    },
    {
      id: "q5",
      question: "NOT (A AND B) is equivalent to:",
      choices: [
        "(NOT A) AND (NOT B)",
        "(NOT A) OR (NOT B)",
        "A OR B",
        "A AND B",
      ],
      correctIndex: 1,
      explanation: "By De Morgan's law, negating an AND yields an OR of the negations.",
    },
    {
      id: "q6",
      question: "Given nested code: if member -> (if age≥65: 5 else 8) else 12. A 65-year-old member pays:",
      choices: ["5", "8", "12", "unknown"],
      correctIndex: 0,
      explanation: "Member branch, then age ≥ 65 is true, so price 5.",
    },
    {
      id: "q7",
      question: "Why check (count > 0) before (total/count > 50) in an AND?",
      choices: [
        "To make the code shorter",
        "To avoid dividing by zero when count is 0",
        "Because OR would be faster",
        "Because MOD requires it",
      ],
      correctIndex: 1,
      explanation: "A false first part can make the AND false without evaluating the risky division.",
    },
    {
      id: "q8",
      question: "A door unlocks when it is NOT (locked OR alarmed). It unlocks when:",
      choices: [
        "It is both locked and alarmed",
        "It is neither locked nor alarmed",
        "It is locked but not alarmed",
        "It is alarmed but not locked",
      ],
      correctIndex: 1,
      explanation: "NOT (locked OR alarmed) = (NOT locked) AND (NOT alarmed): neither condition holds.",
    },
  ],
  reflection: {
    prompt:
      "The Create PT requires selection that affects the program's behavior. Describe a decision in a program you'd build, write its condition using AND/OR/NOT, and name what each branch does.",
    placeholder: "The decision, the Boolean condition, and each branch's behavior…",
  },
};
