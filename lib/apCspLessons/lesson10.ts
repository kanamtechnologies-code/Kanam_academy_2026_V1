import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson10: AILessonConfig = {
  id: "csp-10",
  title: "10. Algorithms, Efficiency & Searching/Sorting",
  goal: "Compare algorithms for correctness and efficiency, and reason about searching, sorting, and undecidable problems.",
  xpReward: 500,
  badge: "Algorithm Analyst",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/9",
  nextHref: "/learn/ap-csp-prep/11",
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Big Idea 3",
        title: "Many algorithms, not all equal",
        body: `An **algorithm** is a finite, well-defined sequence of steps that solves a problem. For most problems there are many correct algorithms — but they can differ enormously in **efficiency** (how much time or work they need). This lesson gives you the reasoning tools the AP exam expects: comparing efficiency, understanding search and sort strategies, and recognizing the limits of computation.`,
      },
      {
        id: "correct-vs-efficient",
        kicker: "Two questions",
        title: "Correct and efficient are different",
        body: `Always ask two questions about an algorithm:
1. **Is it correct?** Does it produce the right output for all valid inputs, including edge cases?
2. **Is it efficient?** How does the work grow as the input gets larger?

A correct algorithm that takes a year to run may be useless. An efficient algorithm that gives wrong answers is worse. The exam frequently asks you to compare two correct algorithms on efficiency.`,
      },
      {
        id: "growth",
        kicker: "Efficiency",
        title: "Reasonable vs. unreasonable growth",
        body: `AP CSP describes efficiency informally by how the number of steps grows with input size n:

| Growth | Example | Verdict |
| --- | --- | --- |
| Constant / linear (n) | Scan a list once | Reasonable |
| n² (n squared) | Compare every pair | Reasonable (polynomial) |
| 2ⁿ (doubles each +1) | Try every subset | Unreasonable |

Algorithms whose steps grow like a **polynomial** (n, n², n³…) are considered **reasonable**. Those that grow **exponentially** (2ⁿ) become impractical fast — for n = 60, 2ⁿ exceeds a quintillion.`,
        code: `# Steps when n grows 10 -> 20 -> 40
n      steps (n)   steps (n^2)   steps (2^n)
10          10          100         1,024
20          20          400     1,000,000+
40          40        1,600     1,000,000,000,000+
#   REASONABLE ^^^^^^^^^^^^^^^^   UNREASONABLE ^^^^`,
        codeCaption: "Polynomial (n, n^2) stays reasonable; 2^n explodes",
        checkIn: check(
          "An algorithm's steps grow proportionally to n² as input size n increases. On the AP exam this is classified as:",
          [
            "unreasonable (exponential) time",
            "a reasonable (polynomial) running time",
            "constant time",
            "an undecidable problem",
          ],
          1,
          "n² is polynomial, which AP CSP classifies as reasonable; exponential (2ⁿ) is unreasonable.",
        ),
      },
      {
        id: "nested-cost",
        kicker: "Connect",
        title: "Why nested loops cost more",
        body: `Recall from Lesson 7 that nested loops multiply iterations. A single loop over n items does ~n steps (linear). A loop inside a loop, each over n items, does ~n × n = **n² steps**.

So comparing every pair of items in a list of 1,000 is about 1,000,000 operations. Recognizing that nesting drives n² behavior is often how the exam expects you to judge efficiency.`,
        code: `# Linear: ~n steps
for x in items:
    process(x)

# Quadratic: ~n*n steps (every pair)
for x in items:
    for y in items:
        compare(x, y)`,
        codeCaption: "One loop ≈ n steps; a nested loop ≈ n² steps",
        checkIn: check(
          "An algorithm loops over n items, and for each one loops over all n items again. About how many steps does it take?",
          ["n steps", "n² steps", "2n steps", "log₂(n) steps"],
          1,
          "Nested loops over n items each perform about n × n = n² steps.",
        ),
      },
      {
        id: "linear-search",
        kicker: "Searching",
        title: "Linear search",
        body: `**Linear search** checks elements one at a time until it finds the target or reaches the end. It works on **any** list, sorted or not.

For a list of n items, the worst case (target absent or last) takes about n comparisons — linear time. Simple and universal, but not the fastest when data is sorted.`,
        code: `target <- 9
list <- [4, 2, 9, 1, 7]     # unsorted is fine
# check each in order:
# 4? no | 2? no | 9? YES -> stop
`,
        codeCaption: "Linear search: check one by one; worst case ~n checks",
        output: "found at position 3 (3 checks)",
      },
      {
        id: "binary-search",
        kicker: "Searching",
        title: "Binary search",
        body: `**Binary search** is much faster but **requires a sorted list**. It repeatedly checks the middle element and discards half the remaining items. Each step halves the search space, so n items take about log₂(n) steps — 1,000,000 items in ~20 comparisons. The catch: the list **must be sorted first**.`,
        code: `target <- 3
list <- [1, 3, 5, 7, 9, 11, 13]   # MUST be sorted
# middle = 7  -> too big -> keep left  [1, 3, 5]
# middle = 3  -> found!
`,
        codeCaption: "Binary search halves the space each step (sorted list only)",
        output: "found (2 checks, not 7)",
        examples: [
          {
            caption: "Each halving cuts the pile - that's why it's ~log2(n)",
            code: `1,000,000 items
-> 500,000 -> 250,000 -> ... -> 1
# about 20 halvings total`,
            output: "~20 checks for a million items",
          },
        ],
        checkIn: check(
          "What must be true about a list before binary search can be used?",
          [
            "It must contain only numbers",
            "It must be sorted",
            "It must have an even length",
            "It must be stored as metadata",
          ],
          1,
          "Binary search relies on order to discard half each step, so the list must be sorted.",
        ),
      },
      {
        id: "search-compare",
        kicker: "Compare",
        title: "Linear vs. binary at a glance",
        body: `| | Linear search | Binary search |
| --- | --- | --- |
| Needs sorted data? | No | Yes |
| Steps for n items (worst) | ~n | ~log₂(n) |
| 1,000,000 items | ~1,000,000 | ~20 |

Binary search is dramatically faster, but only pays off if the data is already sorted (or is searched often enough to justify sorting once).`,
        code: `                LINEAR        BINARY
sorted needed?    no            YES
steps (n items)   ~n            ~log2(n)
10 items          ~10           ~4
1,000,000 items   ~1,000,000    ~20`,
        codeCaption: "Binary is far fewer steps - but only on sorted data",
      },
      {
        id: "sorting",
        kicker: "Sorting",
        title: "Sorting: the concept",
        body: `**Sorting** arranges elements in order. You should understand *what* sorting accomplishes and that it enables faster searching, even if you don't memorize a specific algorithm's code.

Simple sorts (comparing and swapping adjacent pairs) tend toward n² work; more advanced sorts do better. For the CSP exam, the key ideas are: sorting has a cost, and once paid, it unlocks efficient binary search.`,
        code: `unsorted:  [5, 2, 9, 1, 7]
              |  sort ONCE (a one-time cost)
              v
sorted:    [1, 2, 5, 7, 9]
# now EVERY future lookup can use fast binary search`,
        codeCaption: "Pay to sort once, then every later search is fast (binary)",
        checkIn: check(
          "Why might a program sort a list before searching it many times?",
          [
            "Sorting makes linear search impossible",
            "Paying the one-time cost to sort enables fast binary search on every later lookup",
            "Sorted lists use fewer bits",
            "Binary search works only on unsorted lists",
          ],
          1,
          "Sorting once lets you use binary search (≈log₂ n) for all subsequent lookups, worth it when searching often.",
        ),
      },
      {
        id: "heuristics",
        kicker: "Hard problems",
        title: "When exact answers cost too much: heuristics",
        body: `Some problems have no known efficient (reasonable-time) exact solution — as input grows, exact methods become impractical. For these, we use a **heuristic**: an approach that finds a *good enough* answer quickly, without guaranteeing the best one.

Example: planning the shortest route visiting many cities. Checking every possible route is exponential; a heuristic ("always go to the nearest unvisited city") is fast and usually good, though not always optimal.`,
        code: `# EXACT: try every route  (guaranteed best)
routes for 15 cities = 15!  = 1,000,000,000,000+  # too slow

# HEURISTIC: "go to nearest unvisited city" (fast)
at A -> nearest is B -> nearest is D -> ...
# good enough, quickly - not always the very best`,
        codeCaption: "Heuristic: trade guaranteed-best for fast-and-good-enough",
        callout: {
          label: "On the AP exam",
          text: "If a problem's exact solution grows exponentially, the practical strategy is a heuristic — an efficient method that yields an approximate, 'good enough' answer.",
        },
        checkIn: check(
          "A delivery app can't check every possible route in reasonable time, so it uses a rule that gives a good-but-not-guaranteed-best route quickly. This is a:",
          ["binary search", "heuristic", "logic error", "lossless algorithm"],
          1,
          "A heuristic trades guaranteed optimality for speed, producing a good-enough solution.",
        ),
      },
      {
        id: "undecidable",
        kicker: "Limits",
        title: "Undecidable problems and the halting problem",
        body: `An **undecidable problem** is one for which **no algorithm** can always give a correct yes/no answer for **every** possible input. This is stronger than "hard" or "slow" — it is a theoretical limit.

The classic example is the **halting problem**: *Will this program eventually stop, or will it loop forever?* You can answer for *some* programs by inspection, but there is no general algorithm that correctly decides halt/loop for *all* programs.

Exam takeaways:
1. Undecidable ≠ "we haven't found the answer yet." It means no general algorithm exists.
2. Separate this from **unreasonable time** (exponential but still decidable) — those problems *have* algorithms; they just don't scale.`,
        code: `# DECIDABLE but UNREASONABLE time:
#   try every password of length n  ->  2^n checks
#   algorithm EXISTS, but impractical for large n

# UNDECIDABLE:
#   "Does program P halt on input x for EVERY P,x?"
#   NO general algorithm can always answer correctly`,
        codeCaption: "Unreasonable time ≠ undecidable — different limits",
        examples: [
          {
            caption: "You can solve SOME instances; that does not make the problem decidable",
            code: `P1:  DISPLAY("hi")           -> clearly halts
P2:  REPEAT UNTIL (false):   -> clearly loops
# Hand-checking P1/P2 is fine.
# A universal "halting detector" for all programs? Impossible.`,
          },
        ],
        callout: {
          label: "On the AP exam",
          text: "If a choice says an undecidable problem can be solved for every input by some algorithm, reject it. Specific instances can still be answered by humans or special-case reasoning.",
        },
        checkIn: check(
          "Which statement about undecidable problems is correct?",
          [
            "They are just problems that take exponential time",
            "No algorithm can correctly solve every instance for all inputs",
            "They can never be answered for any specific example",
            "They only appear in quantum computers",
          ],
          1,
          "Undecidable means no general algorithm works for all inputs; individual cases may still be reason-able by hand.",
        ),
      },
      {
        id: "random-sim",
        kicker: "Models",
        title: "RANDOM values and simulations",
        body: `**\`RANDOM(a, b)\`** returns a random integer from a to b **inclusive**. Same program, different runs → different results. That is expected, not a bug.

A **simulation** uses a program (often with randomness) to model a real-world process that would be too costly, dangerous, slow, or impractical to test live — weather, traffic, epidemics, games of chance.

Simulations **abstract**: they omit details on purpose. Trade-off: simpler/faster model vs. fidelity to reality. A simulation can suggest likely outcomes; it cannot guarantee the real world will match.`,
        code: `# Simulate one fair six-sided die
roll <- RANDOM(1, 6)     # 1,2,3,4,5, or 6
DISPLAY(roll)

# Simulate 3 coin flips (1=heads, 2=tails)
FOR EACH i IN [1,2,3]:
    DISPLAY(RANDOM(1, 2))`,
        codeCaption: "RANDOM inclusive endpoints — simulations use chance + abstraction",
        examples: [
          {
            caption: "What a simulation can and cannot claim",
            code: `CAN:    "In 10,000 runs, about 50% came up heads"
CANNOT: "Therefore the real coin will be heads next"
# Model suggests likelihood; reality can still surprise you.`,
          },
          {
            caption: "Exam trap: possible outputs of RANDOM(2, 4)",
            code: `RANDOM(2, 4) possible values: 2, 3, 4
# NOT just 2 and 4 — the middle counts
# NOT 1 or 5 — outside the range`,
            output: "2, 3, or 4",
          },
        ],
        checkIn: check(
          "A traffic app simulates afternoon congestion with simplified road rules and random arrival times. Which claim is fairest?",
          [
            "The simulation proves exact travel times for every real driver tomorrow",
            "The simulation can estimate patterns but makes simplifying assumptions, so real results may differ",
            "Simulations never use randomness",
            "If the simulation runs once, it has tested every possible traffic state",
          ],
          1,
          "Simulations abstract and often use randomness; they inform, they do not guarantee real-world outcomes.",
        ),
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Choosing a search strategy",
        body: `You have a phone contact list of 5,000 names to search by name, hundreds of times a day.

- If the list is unsorted and searched rarely: linear search is fine.
- Searched constantly: **sort it once** (pay n-log-n or n² once), then use **binary search** (~13 steps each) for every lookup after.

The best answer depends on how often you search versus how often the data changes — exactly the trade-off reasoning AP efficiency questions reward.`,
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "You reason about efficiency",
        body: `You can now separate correctness from efficiency, classify growth as reasonable (polynomial) or unreasonable (exponential), compare linear and binary search, explain sorting's role, and recognize heuristics and undecidable problems.

This completes the core of Big Idea 3. Next you'll zoom out to the machines and networks that run these algorithms — computing systems and the Internet.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Pick and justify an algorithm",
        body: `Describe a searching task in a program you'd build. Say whether you'd use linear or binary search and justify it based on whether the data is sorted and how often you search.`,
      },
    ],
  },
  bigIdeas: [
    "Algorithms can be **correct** yet differ hugely in **efficiency** — always evaluate both.",
    "Polynomial growth (n, n²) is **reasonable**; exponential growth (2ⁿ) is **unreasonable** and quickly impractical.",
    "**Linear search** works on any list (~n steps); **binary search** needs sorted data but is ~log₂(n) steps.",
    "When exact solutions are too costly, **heuristics** give good-enough answers; some problems are **undecidable** entirely.",
  ],
  keyTerms: [
    { term: "Algorithm", definition: "A finite sequence of well-defined steps that solves a problem." },
    { term: "Efficiency", definition: "How the amount of work an algorithm does grows with input size." },
    { term: "Linear search", definition: "Checking elements one by one; works on any list, ~n steps." },
    { term: "Binary search", definition: "Repeatedly halving a sorted list to find a target, ~log₂(n) steps." },
    { term: "Heuristic", definition: "A technique that finds a good-enough solution quickly without guaranteeing the best." },
    { term: "Undecidable problem", definition: "A problem no algorithm can always solve correctly for every input." },
  ],
  realWorld:
    "Search engines, GPS routing, and databases live or die on efficiency — the same linear-vs-binary and heuristic trade-offs, scaled to billions of items.",
  quiz: [
    {
      id: "q1",
      question: "Two algorithms both sort a list correctly but one is far faster on large inputs. This shows they differ in:",
      choices: ["correctness", "efficiency", "syntax", "purpose"],
      correctIndex: 1,
      explanation: "Both are correct; the difference is efficiency (how work grows with size).",
    },
    {
      id: "q2",
      question: "Which running time is considered 'unreasonable' on the AP exam?",
      choices: ["Linear (n)", "Quadratic (n²)", "Exponential (2ⁿ)", "Constant"],
      correctIndex: 2,
      explanation: "Exponential growth is unreasonable; polynomial times (n, n²) are reasonable.",
    },
    {
      id: "q3",
      question: "Comparing every pair of items in a list of n elements takes about:",
      choices: ["n steps", "n² steps", "log₂(n) steps", "2 steps"],
      correctIndex: 1,
      explanation: "A nested loop over n items does ~n × n = n² comparisons.",
    },
    {
      id: "q4",
      question: "Binary search on 1,000,000 sorted items takes roughly how many comparisons in the worst case?",
      choices: ["1,000,000", "500,000", "About 20", "1"],
      correctIndex: 2,
      explanation: "Each step halves the space: log₂(1,000,000) ≈ 20.",
    },
    {
      id: "q5",
      question: "Which is required to use binary search?",
      choices: [
        "The list must be sorted",
        "The list must contain metadata",
        "The list must be exactly 100 items",
        "The list must be unsorted",
      ],
      correctIndex: 0,
      explanation: "Binary search discards half based on order, so the data must be sorted.",
    },
    {
      id: "q6",
      question: "For a routing problem where checking all routes is exponential, a practical approach is to:",
      choices: [
            "Declare the problem undecidable” belongs to a different situation than the one in the question stem",
            "Use a heuristic that gives a good-enough answer quickly",
            "Use lossy compression” belongs to a different situation than the one in the question stem",
            "Use binary search” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation: "Heuristics trade guaranteed optimality for speed on hard problems.",
    },
    {
      id: "q7",
      question: "An undecidable problem is one that:",
      choices: [
            "Takes exponential time but is solvable” belongs to a different situation than the one in the question stem",
            "Only occurs in networks” belongs to a different situation than the one in the question stem",
            "No algorithm can always solve correctly for every input",
            "Requires binary search” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation: "Undecidable means no correct general algorithm can exist for it.",
    },
    {
      id: "q8",
      question: "You search an unsorted 5,000-item list just once. The most sensible choice is:",
      choices: [
            "Sort it, then binary search” belongs to a different situation than the one in the question stem",
            "Linear search — sorting first would cost more than a single scan",
            "Use a heuristic” belongs to a different situation than the one in the question stem",
            "Declare it undecidable” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation: "For a single search, one linear scan is cheaper than paying to sort first.",
    },
    {
      id: "q9",
      question: "A weather model uses RANDOM values and simplified rules to estimate tomorrow's rain chance. Which statement is most accurate?",
      choices: [
            "The simulation guarantees exactly what the weather will do” belongs to a different situation than the one in the question stem",
            "Running it once tests every possible outcome” belongs to a different situation than the one in the question stem",
            "“Simulations cannot use randomness” describes a different situation than the one in the question stem",
            "The simulation abstracts reality and can estimate likely outcomes, but real results may differ",
          ],
      correctIndex: 3,
      explanation: "Simulations deliberately abstract away detail and often use randomness; they inform likely outcomes rather than guaranteeing them.",
    },
  ],
  reflection: {
    prompt:
      "AP efficiency questions reward trade-off reasoning. Describe a search or sort in a program you'd build, estimate whether it's reasonable or unreasonable in cost, and justify your algorithm choice.",
    placeholder: "The task, its rough efficiency, and why you'd choose that algorithm…",
  },
};
