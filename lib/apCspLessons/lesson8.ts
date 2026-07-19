import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson8: AILessonConfig = {
  id: "csp-8",
  title: "8. Lists & Traversal",
  goal: "Store collections in lists, access and modify elements by index, and traverse lists to compute results.",
  xpReward: 400,
  badge: "List Navigator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/7",
  nextHref: "/learn/ap-csp-prep/9",
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Big Idea 3",
        title: "One name for many values",
        body: `A **list** stores an ordered collection of values under a single name. Instead of \`score1, score2, ... score30\`, one list \`scores\` holds them all. Lists are required in the Create Performance Task, and combining them with the loops from Lesson 7 unlocks real data processing.

The AP exam treats lists as an abstraction (Lesson 3) — you work with "the scores" without tracking individual memory locations.`,
      },
      {
        id: "index",
        kicker: "Access",
        title: "Elements and indices",
        body: `Each value in a list has a position called its **index**. AP pseudocode lists are **1-indexed**: the first element is at index 1. **Watch out:** many real languages (Python, JavaScript) are **0-indexed**, so the first element is at index 0. Read each question's convention carefully — this is a deliberate exam trap.`,
        code: `scores <- [88, 92, 75, 60]
#  index:    1   2   3   4     <- AP pseudocode: 1-based
#  index:    0   1   2   3     <- Python/JS: 0-based

DISPLAY scores[1]   # 88 (first, AP style)
DISPLAY scores[4]   # 60 (fourth)`,
        codeCaption: "Index maps a position to a value - watch 1-based vs 0-based",
        output: `88
60`,
        checkIn: check(
          "In AP CSP pseudocode, list a ← [10, 20, 30, 40]. What is a[2]?",
          ["10", "20", "30", "index 2 does not exist"],
          1,
          "AP pseudocode is 1-indexed, so a[1]=10 and a[2]=20.",
        ),
      },
      {
        id: "modify",
        kicker: "Change",
        title: "Reading and writing elements",
        body: `You can read an element or **overwrite** it by index. Assigning to \`scores[3]\` replaces just that one element, leaving the rest unchanged. This is how programs update records — "set student 3's grade to 80."`,
        code: `scores <- [88, 92, 75, 60]
scores[3] <- 80       # change ONLY the 3rd element (75 -> 80)
DISPLAY scores

# before: [88, 92, 75, 60]
# after:  [88, 92, 80, 60]`,
        codeCaption: "Writing by index replaces one element, leaves the rest alone",
        output: "[88, 92, 80, 60]",
      },
      {
        id: "length",
        kicker: "Size",
        title: "Length and bounds",
        body: `The **length** of a list is its number of elements. Accessing an index beyond the length (or below the first valid index) causes an **out-of-bounds** error — a runtime error. When looping over a list by index, your loop must run over valid indices only — a frequent off-by-one bug is looping one past the end.`,
        code: `scores <- [88, 92, 75, 60]    # valid indices 1..4
LENGTH(scores)   # 4
scores[4]        # 60   ok
scores[5]        # ERROR: index out of bounds (no 5th)`,
        codeCaption: "Going past the last valid index is a runtime error",
        output: `4
60
ERROR: index out of bounds`,
        checkIn: check(
          "A 1-indexed list has 6 elements. Which access causes an out-of-bounds error?",
          ["list[1]", "list[6]", "list[7]", "list[3]"],
          2,
          "Valid indices are 1–6; index 7 is beyond the length and errors.",
        ),
      },
      {
        id: "traversal",
        kicker: "Traverse",
        title: "Traversing a list",
        body: `**Traversal** means visiting each element, usually with a loop. Use FOR EACH when you only need values; use index-based when you also need positions or must modify elements in place.`,
        code: `# FOR EACH - element directly (values only)
FOR EACH s IN scores:
    DISPLAY s

# Index-based - gives you the position too
FOR i FROM 1 TO LENGTH(scores):
    DISPLAY i, scores[i]`,
        codeCaption: "Two traversal styles: values-only vs with positions",
        examples: [
          {
            caption: "The same two styles in real (0-indexed) Python",
            code: `scores = [88, 92, 75, 60]
for s in scores:            # values
    print(s)
for i in range(len(scores)): # positions
    print(i, scores[i])`,
          },
        ],
      },
      {
        id: "accumulate",
        kicker: "Compute",
        title: "Summing and counting during traversal",
        body: `Combine traversal with the accumulator/counter patterns from Lesson 7 to compute results. This "sum then divide by length" is the canonical average algorithm — and dividing by \`LENGTH\` (not a hardcoded number) keeps it correct if the list size changes.`,
        code: `scores <- [88, 92, 75, 60]
total <- 0
FOR EACH s IN scores:
    total <- total + s          # 88,180,255,315
average <- total / LENGTH(scores)   # 315 / 4
DISPLAY average`,
        codeCaption: "Sum with an accumulator, then divide by LENGTH (not a hardcoded 4)",
        output: "78.75",
        checkIn: check(
          "Why divide the total by LENGTH(scores) rather than by a fixed number like 4?",
          [
            "It runs faster",
            "So the average stays correct even if the list's size changes",
            "Because LENGTH is required syntax",
            "To avoid an overflow error",
          ],
          1,
          "Using LENGTH adapts automatically to any list size, avoiding a wrong average when the count changes.",
        ),
      },
      {
        id: "add-remove",
        kicker: "Grow/shrink",
        title: "Adding and removing elements",
        body: `Lists can grow and shrink. AP pseudocode provides three operations, and the exam cares a lot about **what happens to the *positions* of the other elements** (remember: AP pseudocode is **1-indexed**):

- **APPEND value TO list** — adds \`value\` as a new *last* element. Nothing else moves; the length grows by 1.
- **INSERT value AT i** — puts \`value\` at index \`i\`, and **everything from index \`i\` onward shifts *right*** (each moves up one index) to make room. Length grows by 1.
- **REMOVE list[i]** — deletes the element at index \`i\`, and **everything after it shifts *left*** (each moves down one index) to close the gap. Length shrinks by 1.

The **shift-left after REMOVE** is the detail students miss. Take \`[10, 20, 30, 40]\` (indices 1–4) and \`REMOVE list[2]\`:

- The 20 is deleted.
- 30 was at index 3 → shifts left to index **2**.
- 40 was at index 4 → shifts left to index **3**.
- Result: \`[10, 30, 40]\`, now length 3, valid indices 1–3.

This shifting is exactly why **removing elements while traversing by index is bug-prone** — after a removal, the item that was "next" slides into the current index, so a \`for i\` loop can *skip* it. The safe pattern (next card) builds a new list of items to keep instead of removing in place.`,
        code: `list <- [10, 20, 30]
APPEND 40 TO list      # [10, 20, 30, 40]   add to end, nothing shifts
INSERT 15 AT 2         # [10, 15, 20, 30, 40]  20,30,40 shift RIGHT

# REMOVE shifts everything AFTER it to the LEFT:
list <- [10, 20, 30, 40]
#  index:   1   2   3   4
REMOVE list[2]         # delete the 20
#  30 (was idx 3) -> idx 2
#  40 (was idx 4) -> idx 3
# result: [10, 30, 40]   length 4 -> 3`,
        codeCaption: "REMOVE deletes then shifts every later element LEFT to close the gap",
        output: "[10, 30, 40]",
        checkIn: check(
          "Given a ← [5, 8, 11, 14] (1-indexed), what is the list after REMOVE a[1]?",
          ["[5, 8, 11]", "[8, 11, 14]", "[5, 11, 14]", "[0, 8, 11, 14]"],
          1,
          "Removing index 1 deletes the 5; every later element shifts left, giving [8, 11, 14].",
        ),
      },
      {
        id: "filter-build",
        kicker: "Pattern",
        title: "Filtering into a new list",
        body: `A powerful pattern: traverse one list and **build a new list** of elements that meet a condition. This "filter" pattern shows up constantly and safely avoids modifying the list you're iterating over.`,
        code: `passing <- []                 # start empty
FOR EACH s IN scores:
    IF (s >= 60):
        APPEND s TO passing   # keep only the ones that qualify
DISPLAY passing`,
        codeCaption: "Filter: build a fresh list of items that pass the test",
        output: "[88, 92, 60]",
        examples: [
          {
            caption: "Filtering never touches the list you're reading (no shift bugs)",
            code: `scores = [88, 92, 55, 60, 40]
passing = []
for s in scores:
    if s >= 60:
        passing.append(s)
print(passing)`,
            output: "[88, 92, 60]",
          },
        ],
      },
      {
        id: "search",
        kicker: "Find",
        title: "Searching a list",
        body: `To find whether a value exists, traverse and compare. A **linear search** checks elements one by one until it finds a match or reaches the end. Linear search works on any list. Faster searching (binary search) requires a sorted list and is covered in Lesson 10.`,
        code: `target <- 75
found <- false
FOR EACH s IN [88, 92, 75, 60]:
    IF (s = target):
        found <- true      # match at the 3rd element
DISPLAY found`,
        codeCaption: "Linear search: check each element until match or end (any list)",
        output: "true",
        checkIn: check(
          "A linear search looks for a target by:",
          [
            "Jumping straight to the middle element",
            "Checking elements one by one until it finds the target or reaches the end",
            "Requiring the list to be sorted first",
            "Removing elements as it goes",
          ],
          1,
          "Linear search inspects each element in turn and works on any list, sorted or not.",
        ),
      },
      {
        id: "2d-preview",
        kicker: "Structure",
        title: "Lists of lists (a preview)",
        body: `A list can contain other lists, representing grids or tables: \`grid ← [[1,2],[3,4]]\`. Traversing these uses nested loops (Lesson 7) — the outer loop picks a row, the inner loop walks its columns.

You won't be pushed deep into 2D structures on the CSP exam, but recognizing that lists nest reinforces the abstraction idea: a table is "a list of rows."`,
        checkIn: check(
          "To visit every element of grid ← [[1,2,3],[4,5,6]], you would most naturally use:",
          [
            "a single conditional",
            "nested loops (a loop over rows, and inside it a loop over columns)",
            "a truth table",
            "lossy compression",
          ],
          1,
          "Nested loops traverse a list of lists: outer over rows, inner over each row's elements.",
        ),
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Count and average in one pass",
        body: `Compute how many scores are passing and the average of *only* those, traversing once. Note the guard \`IF (count > 0)\` prevents division by zero — an edge case (Lesson 2) an empty or all-failing list would trigger.`,
        code: `sum <- 0
count <- 0
FOR EACH s IN [88, 40, 92, 55]:   # two pass, two fail
    IF (s >= 60):
        sum <- sum + s            # 88, 180
        count <- count + 1        # 1, 2
IF (count > 0):                   # guard: no divide-by-zero
    DISPLAY sum / count           # 180 / 2
ELSE:
    DISPLAY "no passing scores"`,
        codeCaption: "Count + average in one pass, guarded against an empty result",
        output: "90",
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "You navigate collections",
        body: `You can create lists, access and modify by index (minding 1- vs 0-indexing), traverse to sum/count/search, filter into new lists, and guard against out-of-bounds and empty-list edge cases.

Lists + loops + conditionals is enough to build the data engine of most Create PT programs. Next you'll package logic into reusable **procedures** with parameters — the heart of abstraction in code.`,
        callout: {
          label: "Instructor tip · Create PT",
          text: "The Create PT requires a list (or other collection) that *manages complexity* — it must let your program do something it couldn't do as cleanly with separate variables, like storing then traversing many values. A list that just holds a few fixed items you never loop over is 'decorative' and won't earn the point. Plan a list your algorithm actually traverses to compute a result.",
        },
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Design a traversal",
        body: `Describe a list your program would store and one value you'd compute by traversing it (a sum, count, max, or filtered sublist). Note one edge case (like an empty list) you'd handle.`,
      },
    ],
  },
  bigIdeas: [
    "A **list** stores an ordered collection under one name, accessed by **index** (AP pseudocode is 1-indexed; many languages are 0-indexed).",
    "**Traversal** with a loop lets you sum, count, search, or filter a list's elements.",
    "Accessing an index outside the valid range causes an out-of-bounds runtime error.",
    "Building a *new* list when filtering avoids the bugs of modifying a list while traversing it.",
  ],
  keyTerms: [
    { term: "List", definition: "An ordered collection of values stored under a single name." },
    { term: "Index", definition: "The position of an element in a list." },
    { term: "Length", definition: "The number of elements in a list." },
    { term: "Traversal", definition: "Visiting each element of a list, usually with a loop." },
    { term: "Linear search", definition: "Checking elements one by one until a match is found or the list ends." },
    { term: "Out-of-bounds error", definition: "A runtime error from accessing an index outside the list's valid range." },
  ],
  realWorld:
    "A playlist, a leaderboard, a shopping cart, and a contacts app are all lists your code traverses to display, total, search, and filter.",
  quiz: [
    {
      id: "q1",
      question: "In AP pseudocode, a ← [7, 14, 21]. What is a[1]?",
      choices: ["0", "7", "14", "21"],
      correctIndex: 1,
      explanation: "AP pseudocode is 1-indexed, so a[1] is the first element, 7.",
    },
    {
      id: "q2",
      question: "A 1-indexed list has length 5. Which index is out of bounds?",
      choices: ["1", "3", "5", "6"],
      correctIndex: 3,
      explanation: "Valid indices are 1 through 5; 6 is out of bounds.",
    },
    {
      id: "q3",
      question: "After a[2] ← 99 on a ← [1,2,3], the list becomes:",
      choices: ["[99,2,3]", "[1,99,3]", "[1,2,99]", "[99,99,99]"],
      correctIndex: 1,
      explanation: "Only element at index 2 changes (1-indexed), giving [1,99,3].",
    },
    {
      id: "q4",
      question: "Which loop style should you use when you also need each element's position?",
      choices: [
        "FOR EACH element",
        "Index-based traversal (FOR i FROM 1 TO LENGTH)",
        "A conditional only",
        "No loop is needed",
      ],
      correctIndex: 1,
      explanation: "Index-based traversal gives you the position i alongside the value.",
    },
    {
      id: "q5",
      question: "To compute an average, dividing the sum by LENGTH(list) instead of a hardcoded count:",
      choices: [
        "is always slower",
        "keeps the result correct if the list size changes",
        "causes an overflow",
        "is not allowed in pseudocode",
      ],
      correctIndex: 1,
      explanation: "LENGTH adapts to the actual size, preventing a wrong average.",
    },
    {
      id: "q6",
      question: "When filtering elements that meet a condition, the safest approach is to:",
      choices: [
        "Remove non-matching elements while looping by index",
        "Append matching elements to a new list",
        "Change the loop into a conditional",
        "Sort the list first",
      ],
      correctIndex: 1,
      explanation: "Building a new list avoids position-shift bugs from removing during traversal.",
    },
    {
      id: "q7",
      question: "A linear search over an unsorted list:",
      choices: [
        "Requires the list to be sorted",
        "Checks elements one by one until a match or the end",
        "Always finds the value in one step",
        "Only works on numbers",
      ],
      correctIndex: 1,
      explanation: "Linear search inspects each element in turn and works on any list.",
    },
    {
      id: "q8",
      question: "Computing sum/count for passing scores, why guard with IF (count > 0)?",
      choices: [
        "To make the loop faster",
        "To avoid dividing by zero when no scores pass",
        "Because count must be a string",
        "To sort the results",
      ],
      correctIndex: 1,
      explanation: "If no scores pass, count is 0 and the division would error; the guard handles that edge case.",
    },
  ],
  reflection: {
    prompt:
      "The Create PT requires a list used meaningfully. Describe the list your program would use, how you'd traverse it, and one edge case (empty list, missing value) you'd handle.",
    placeholder: "The list, its traversal, and the edge case you'd guard against…",
  },
};
