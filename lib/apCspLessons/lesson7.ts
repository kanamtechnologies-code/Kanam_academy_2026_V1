import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson7: AILessonConfig = {
  id: "csp-7",
  title: "7. Iteration & Loops",
  goal: "Use definite and conditional loops correctly, trace iterations, and avoid off-by-one and infinite-loop bugs.",
  xpReward: 350,
  badge: "Loop Master",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/6",
  nextHref: "/learn/ap-csp-prep/8",
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Big Idea 3",
        title: "Do it many times without writing it many times",
        body: `**Iteration** repeats a block of code. Instead of copying the same three lines fifty times, you write them once inside a loop. Iteration is required in the Create Performance Task and is one of the most tested programming concepts on the exam.

There are two flavors you must know: **repeat a fixed number of times** and **repeat while a condition holds**.`,
      },
      {
        id: "repeat-n",
        kicker: "Definite loop",
        title: "REPEAT n TIMES",
        body: `A **definite loop** runs a known number of times. Count the repetitions carefully — the number of times a loop runs is a favorite exam question.`,
        code: `total <- 0
REPEAT 5 TIMES:
    total <- total + 2
DISPLAY total

# total after each pass:
# 2 -> 4 -> 6 -> 8 -> 10   (5 passes)`,
        codeCaption: "A definite loop runs a fixed, countable number of times",
        output: "10",
        checkIn: check(
          "sum ← 0; REPEAT 4 TIMES: sum ← sum + 3. What is sum afterward?",
          ["3", "7", "12", "4"],
          2,
          "The body runs 4 times adding 3 each time: 4 × 3 = 12.",
        ),
      },
      {
        id: "while",
        kicker: "Conditional loop",
        title: "REPEAT UNTIL / WHILE",
        body: `A **conditional loop** repeats based on a Boolean condition, so the number of iterations may not be known in advance. The exact semantics trip students up, so nail them down:

**REPEAT UNTIL (condition)** means "keep looping *until* the condition becomes true." So it:
1. **Checks the condition first**, before each pass.
2. If the condition is **false**, it **runs the body** once, then goes back to step 1.
3. If the condition is **true**, it **stops** and skips the body.

In other words, REPEAT UNTIL keeps going *while the condition is still false*, and exits the moment it turns true. (A WHILE loop is the mirror image: it runs *while* its condition is true and stops when it turns false.)

Trace \`n\` carefully. Watch how it **overshoots to 16, not 8** — because after \`n\` becomes 8, the condition \`n > 8\` is still false (8 is not > 8), so the body runs *one more time* and doubles 8 to 16. Only then does \`16 > 8\` become true and the loop stops.`,
        code: `n <- 1
REPEAT UNTIL (n > 8):     # check BEFORE each pass
    n <- n * 2
DISPLAY n

# careful trace (check condition, THEN maybe run body):
#  n=1   1 > 8? false -> run body -> n = 2
#  n=2   2 > 8? false -> run body -> n = 4
#  n=4   4 > 8? false -> run body -> n = 8
#  n=8   8 > 8? false -> run body -> n = 16   (overshoot!)
#  n=16  16 > 8? TRUE  -> stop, skip body
# DISPLAY 16`,
        codeCaption: "REPEAT UNTIL checks first, runs while false; note it overshoots 8 to 16",
        output: "16",
        examples: [
          {
            caption: "Same loop in real code (WHILE keeps going while condition holds)",
            code: `n = 1
while not (n > 8):
    n = n * 2
print(n)`,
            output: "16",
          },
        ],
        checkIn: check(
          "x ← 10; REPEAT UNTIL (x < 3): x ← x - 4. What is the final value of x?",
          ["6", "2", "-2", "10"],
          1,
          "Check-then-run: 10 (10<3 false) → 6 (6<3 false) → 2 (2<3 true, stop). Final x = 2.",
        ),
      },
      {
        id: "for-each",
        kicker: "Traversal",
        title: "Looping over a collection",
        body: `A **FOR EACH** loop visits every element of a list in turn. You'll use this constantly once lists arrive in Lesson 8. FOR EACH is a definite loop in disguise — it runs once per element, so its count equals the list's length.`,
        code: `FOR EACH item IN [4, 9, 2]:
    DISPLAY item

# item takes each value in order:
# pass 1: 4 | pass 2: 9 | pass 3: 2`,
        codeCaption: "FOR EACH visits every element once - count = list length",
        output: `4
9
2`,
      },
      {
        id: "counters-accumulators",
        kicker: "Patterns",
        title: "Counters and accumulators",
        body: `Two loop patterns appear everywhere:

- **Accumulator** — a variable that builds up a total or string across iterations.
- **Counter** — a variable that counts how many times something happened.

Initializing the accumulator/counter *before* the loop is essential; putting it inside resets it every pass — a classic bug.`,
        code: `count <- 0                    # init BEFORE the loop
FOR EACH score IN [50, 72, 88, 40, 91]:
    IF (score >= 60):
        count <- count + 1    # counts passes
DISPLAY count

# count grows: 0,0,1,2,2,3
`,
        codeCaption: "A counter tallies matches; init it before the loop",
        output: "3",
        checkIn: check(
          "Where should you initialize an accumulator variable used to sum a list?",
          [
            "Inside the loop body, so it resets each time",
            "Before the loop, so it accumulates across all iterations",
            "After the loop, once summing is done",
            "It does not need initialization",
          ],
          1,
          "Initialize before the loop; initializing inside would reset the total every iteration.",
        ),
      },
      {
        id: "off-by-one",
        kicker: "Bugs",
        title: "Off-by-one errors",
        body: `The most common loop bug runs one time too many or too few. Ask precisely: does the loop include the endpoint or stop just before it?

A loop meant to process items 1 through 10 that actually runs 0 through 10 does 11 iterations. When tracing on the exam, literally count the passes — write the value of the loop variable each time rather than estimating.`,
        code: `# Want 10 items, but this runs 11 times (0..10)
i <- 0
REPEAT UNTIL (i > 10):    # off by one!
    process(item[i])
    i <- i + 1

# Fix: stop at 9 for 10 items (0..9)
REPEAT UNTIL (i > 9):`,
        codeCaption: "Off-by-one: 0..10 is 11 passes, not 10",
      },
      {
        id: "infinite",
        kicker: "Bugs",
        title: "Infinite loops",
        body: `A conditional loop whose stopping condition **never becomes true** runs forever. It always comes down to the same root cause: **the loop body never makes progress toward the exit condition.** The exam tests several specific ways this happens:

1. **The loop variable isn't updated.** If you forget to change the variable the condition tests, it stays the same value forever (e.g., \`REPEAT UNTIL (n > 5)\` but you never change \`n\`).
2. **Updating in the wrong direction.** The condition needs \`n\` to grow, but the body shrinks it (or vice versa), so it moves *away* from stopping.
3. **Overshooting an exact-equality test.** \`REPEAT UNTIL (n = 10)\` with \`n\` going 1, 3, 5, 7, 9, **11**… skips 10 entirely, so \`n = 10\` is never true.
4. **The condition depends on something that never changes** — e.g., waiting for a flag or input that the loop body has no way to alter.

The fixes: make sure every path through the body moves the variable *toward* the exit, and prefer \`≥\` / \`≤\` over \`=\` so that overshooting the target still stops the loop.`,
        code: `# CAUSE 1: variable never updated -> runs forever
n <- 1
REPEAT UNTIL (n > 5):
    DISPLAY n            # n never changes -> infinite

# CAUSE 2: moving the wrong direction
n <- 1
REPEAT UNTIL (n > 5):
    n <- n - 1           # n shrinks, never exceeds 5

# CAUSE 3: exact-equality overshoot
n <- 1
REPEAT UNTIL (n = 10):   # DANGER: exact test
    n <- n + 2           # 1,3,5,7,9,11,... skips 10!

# SAFER: use >= so overshooting still stops
REPEAT UNTIL (n >= 10):`,
        codeCaption: "Infinite loops = no progress to the exit; use >= not = to survive overshoot",
        callout: {
          label: "On the AP exam",
          text: "If a loop's variable can skip past the exact stopping value, suspect an infinite loop. Conditions using ≥ or ≤ are more robust than testing for exact equality.",
        },
        checkIn: check(
          "Why might 'REPEAT UNTIL (n = 10)' with n increasing by 2 from 1 loop forever?",
          [
            "Because REPEAT UNTIL is invalid syntax",
            "Because n takes odd values and never equals exactly 10",
            "Because the body has no statements",
            "Because n is a string",
          ],
          1,
          "Starting at 1 and adding 2 gives odd numbers, so n never equals 10 and the loop never stops.",
        ),
      },
      {
        id: "nested-loops",
        kicker: "Structure",
        title: "Nested loops",
        body: `A loop inside a loop runs the inner loop fully for each pass of the outer loop. If the outer runs 3 times and the inner runs 4 times, the inner body executes 3 × 4 = **12** times. Nested loops power grids, tables, and comparisons — and their multiplied iteration count matters for efficiency (Lesson 10).`,
        code: `FOR EACH row IN [1, 2]:
    FOR EACH col IN [1, 2, 3]:
        DISPLAY row, col
# outer 2 x inner 3 = 6 total runs`,
        codeCaption: "Nested loops multiply: outer x inner total runs",
        output: `1 1
1 2
1 3
2 1
2 2
2 3`,
        checkIn: check(
          "An outer loop runs 3 times; inside it, an inner loop runs 5 times. How many times does the inner body execute in total?",
          ["8", "15", "5", "3"],
          1,
          "Nested loops multiply: 3 × 5 = 15 total executions of the inner body.",
        ),
      },
      {
        id: "loops-vs-selection",
        kicker: "Combine",
        title: "Loops plus conditionals",
        body: `Real programs combine iteration with selection: loop over data, and inside the loop decide what to do with each item. The passing-score counter above is exactly this pattern.

Being fluent at reading "for each item, if condition, do something" prepares you for the list-processing tasks in Lesson 8 and the Create PT algorithm.`,
        callout: {
          label: "Instructor tip · Create PT",
          text: "Your Create Performance Task procedure will need iteration. Beyond writing the loop, the written responses ask you to *explain it in words* — practice now: say out loud what your loop repeats, what makes it stop, and what it builds up (its counter or accumulator). If you can narrate the loop clearly, you can earn the point.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Find the largest value with a loop",
        body: `To find the maximum of a list without a built-in, track a running best. Initializing \`largest\` to the first element (not 0) avoids a bug when all values are negative.`,
        code: `largest <- first element of list
FOR EACH v IN [3, 9, 5, 12, 7]:
    IF (v > largest):
        largest <- v
DISPLAY largest

# largest each pass: 3 -> 9 -> 9 -> 12 -> 12`,
        codeCaption: "Loop + conditional: keep a running 'best so far'",
        output: "12",
        examples: [
          {
            caption: "Start at the first element so all-negative lists still work",
            code: `def maximum(values):
    largest = values[0]     # NOT 0
    for v in values:
        if v > largest:
            largest = v
    return largest

print(maximum([-8, -2, -20]))`,
            output: "-2",
          },
        ],
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "You command repetition",
        body: `You can write definite and conditional loops, trace iteration counts, combine loops with conditionals, and dodge off-by-one and infinite-loop bugs. Loops are the engine that lets small programs process large amounts of data.

Next you'll pair loops with **lists**, the collections you'll traverse to build almost any data-driven program.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Predict a loop's count",
        body: `Write a loop that runs a specific number of times, state exactly how many iterations it performs, and name one change that would introduce an off-by-one error.`,
      },
    ],
  },
  bigIdeas: [
    "**Definite loops** run a known number of times; **conditional loops** run while/until a Boolean condition holds.",
    "Initialize counters and accumulators *before* the loop so they build across iterations.",
    "Off-by-one and infinite loops are the top loop bugs — trace by counting each pass.",
    "Nested loops multiply iterations (outer × inner), which matters for correctness and efficiency.",
  ],
  keyTerms: [
    { term: "Iteration", definition: "Repeating a block of code, either a fixed number of times or while a condition holds." },
    { term: "Definite loop", definition: "A loop that runs a known, fixed number of times (REPEAT n TIMES)." },
    { term: "Conditional loop", definition: "A loop that repeats based on a Boolean condition (REPEAT UNTIL / WHILE)." },
    { term: "Accumulator", definition: "A variable that builds a running total or string across iterations." },
    { term: "Off-by-one error", definition: "A loop that runs one time too many or too few." },
    { term: "Infinite loop", definition: "A loop whose stopping condition is never met, so it never ends." },
  ],
  realWorld:
    "Every progress bar, leaderboard tally, and 'load more' feed is a loop processing items one at a time — often thousands per second.",
  quiz: [
    {
      id: "q1",
      question: "total ← 0; REPEAT 6 TIMES: total ← total + 5. What is total?",
      choices: ["5", "11", "30", "6"],
      correctIndex: 2,
      explanation: "6 iterations × 5 = 30.",
    },
    {
      id: "q2",
      question: "n ← 2; REPEAT UNTIL (n > 20): n ← n * 3. Final n?",
      choices: ["18", "20", "54", "6"],
      correctIndex: 2,
      explanation: "2 → 6 → 18 → 54; at 54, 54>20 is true so it stops.",
    },
    {
      id: "q3",
      question: "A FOR EACH loop over a list of 7 items runs its body how many times?",
      choices: ["6", "7", "8", "depends on the values"],
      correctIndex: 1,
      explanation: "FOR EACH runs once per element: 7 items → 7 iterations.",
    },
    {
      id: "q4",
      question: "Why initialize a counter before a loop rather than inside it?",
      choices: [
        "To make the loop run faster",
        "So it isn't reset to its starting value every iteration",
        "Because counters must be strings",
        "To create an infinite loop",
      ],
      correctIndex: 1,
      explanation: "Initializing inside resets the counter each pass, losing the running count.",
    },
    {
      id: "q5",
      question: "An outer loop runs 5 times and an inner loop runs 3 times each pass. The inner body executes:",
      choices: ["8 times", "15 times", "5 times", "3 times"],
      correctIndex: 1,
      explanation: "Nested loops multiply: 5 × 3 = 15.",
    },
    {
      id: "q6",
      question: "Which loop is most at risk of running forever?",
      choices: [
        "REPEAT 10 TIMES",
        "REPEAT UNTIL (n = 7) where n increases by 2 from 0",
        "FOR EACH item IN list",
        "REPEAT 1 TIMES",
      ],
      correctIndex: 1,
      explanation: "Starting even and stepping by 2 never hits the odd value 7, so it loops forever.",
    },
    {
      id: "q7",
      question: "To find a maximum by looping, why initialize 'largest' to the first element rather than 0?",
      choices: [
        "It runs faster",
        "So it works correctly even when all values are negative",
        "Because 0 is not a number",
        "To avoid a syntax error",
      ],
      correctIndex: 1,
      explanation: "Starting at 0 would wrongly beat all-negative data; the first element is a valid starting max.",
    },
    {
      id: "q8",
      question: "count ← 0; FOR EACH s IN [50,60,70,55]: IF s ≥ 60: count ← count + 1. What is count?",
      choices: ["1", "2", "3", "4"],
      correctIndex: 1,
      explanation: "Only 60 and 70 are ≥ 60, so count = 2.",
    },
  ],
  reflection: {
    prompt:
      "The Create PT algorithm must include iteration. Describe a task in your program that repeats over data, whether it's a definite or conditional loop, and what accumulator or counter it uses.",
    placeholder: "The repeated task, loop type, and the variable it builds…",
  },
};
