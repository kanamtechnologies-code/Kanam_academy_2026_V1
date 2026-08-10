import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson5: AILessonConfig = {
  id: "csp-5",
  title: "5. Variables, Expressions & Strings",
  goal: "Use variables, assignment, arithmetic and string operations fluently in AP CSP pseudocode and real code.",
  xpReward: 250,
  badge: "Code Starter",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/4",
  nextHref: "/learn/ap-csp-prep/6",
  instructorScript: `**Coach's note**
Today's lesson: **Variables, Expressions & Strings**.

**Goal:** Use variables, assignment, arithmetic and string operations fluently in AP CSP pseudocode and real code.

**How to facilitate**
1. Warm-up: ask students what they already think about "The largest slice of the exam starts here".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Big Idea 3",
        title: "The largest slice of the exam starts here",
        body: `Big Idea 3, Algorithms & Programming, is **30–35%** of the AP multiple-choice exam — bigger than any other. It also underlies the Create Performance Task. This lesson builds the foundation: variables, expressions, and strings.

The AP exam uses two forms of code: **text-based pseudocode** and a **block-based** form. Both use the same ideas. Master the **Exam Reference Sheet** notation below — every tracing question speaks this language, not Python alone.`,
        callout: {
          label: "Instructor tip",
          text: "Print or keep open the College Board Exam Reference Sheet while you study. Fluency with ←, DISPLAY, INPUT, MOD, and RANDOM is free points on MCQ day.",
        },
      },
      {
        id: "ap-toolkit",
        kicker: "Reference sheet",
        title: "AP pseudocode toolkit you must recognize",
        body: `Treat this as your exam dictionary. You do **not** need Java or Python syntax on MCQ day — you need these moves:

| Notation | Meaning |
| --- | --- |
| \`a ← expression\` | Assign: evaluate right side, store in \`a\` |
| \`DISPLAY(expression)\` | Show a value (output) |
| \`INPUT()\` | Read a value from the user |
| \`RANDOM(a, b)\` | Random integer from **a to b inclusive** |
| \`a MOD b\` | Remainder when a is divided by b |
| \`a / b\` | Division — in CSP pseudocode this can produce a **decimal** (e.g. \`7 / 2\` → \`3.5\`) |

Lists and strings on the exam are **1-indexed** (first position is 1). That differs from Python's 0-index — a deliberate trap.`,
        code: `score <- 10
score <- score + RANDOM(1, 6)   # add a die roll (1..6 inclusive)
DISPLAY(score)

# RANDOM(1, 6) possible values: 1, 2, 3, 4, 5, 6  (both ends count!)
# 17 MOD 5 -> 2
# 7 / 2    -> 3.5   (not integer truncation)`,
        codeCaption: "Memorize: ← assign, DISPLAY/INPUT, RANDOM inclusive, MOD remainder",
        examples: [
          {
            caption: "Trace like the exam: update one line at a time",
            code: `x <- 4
x <- x + 3          # x is now 7
x <- x * 2          # x is now 14
DISPLAY(x)`,
            output: "14",
          },
        ],
        checkIn: check(
          "Which statement about RANDOM(1, 6) is correct on the AP exam?",
          [
            "It can return 1 through 5 only",
            "It can return any integer from 1 through 6, including both endpoints",
            "It always returns 3.5",
            "It returns a boolean",
          ],
          1,
          "RANDOM(a, b) is inclusive on both ends — a die roll needs 1 and 6.",
        ),
      },
      {
        id: "variables",
        kicker: "Store",
        title: "Variables and assignment",
        body: `A **variable** is a named location that stores a value. The AP pseudocode assignment operator is a left arrow: \`a ← 5\` means "store 5 in a." (In Python this is \`a = 5\`.)

A variable holds one value at a time; assigning again **replaces** the old value. The line \`score ← score + 5\` confuses beginners: the right side is computed *first* using the current value, then the result is stored back.`,
        code: `score <- 10
score <- score + 5   # right side first: 10 + 5 = 15, then store
DISPLAY score

# box "score" over time:
# [10]  ->  [15]`,
        codeCaption: "Assignment evaluates the right side first, then stores it",
        output: "15",
        checkIn: check(
          "After running: x ← 4, then x ← x + 3, then x ← x * 2, what is x?",
          ["7", "11", "14", "24"],
          2,
          "x = 4 → 4+3 = 7 → 7*2 = 14.",
        ),
      },
      {
        id: "datatypes",
        kicker: "Kinds of values",
        title: "Data types: numbers, strings, booleans",
        body: `Values have **types** that determine what operations make sense:

| Type | Example | Typical operations |
| --- | --- | --- |
| Number | \`42\`, \`3.5\` | + − × ÷ |
| String (text) | \`"hello"\` | concatenation, length |
| Boolean | \`true\`, \`false\` | AND, OR, NOT |

Mixing types carelessly causes bugs — \`"5" + 3\` may mean text-joining in one language and be an error in another. Knowing a value's type tells you what you can do with it.`,
        code: `NUMBER   42        ->  42 + 8   = 50      (math)
STRING   "hi"      ->  "hi"+"!" = "hi!"   (concatenate)
BOOLEAN  true      ->  true AND false = false

# Type mismatch is a classic bug:
"5" + 3    # text-join "53"? or error? depends on language`,
        codeCaption: "A value's type decides which operations even make sense",
      },
      {
        id: "arithmetic",
        kicker: "Compute",
        title: "Arithmetic expressions and operator order",
        body: `An **expression** combines values and operators to produce a new value. Standard math precedence applies: multiplication and division before addition and subtraction; parentheses first.

Know these exam operators cold:
- \`*\` \`/\` \`+\` \`-\` with normal precedence (parentheses first).
- \`MOD\` — remainder. \`17 MOD 5\` is \`2\`. Classic uses: even/odd (\`n MOD 2 = 0\`), wrap-around clocks (\`hour MOD 12\`), cycling indices.
- In AP CSP pseudocode, \`/\` can produce a **real/decimal** result (\`7 / 2\` → \`3.5\`). Do not assume integer truncation like some languages.`,
        code: `2 + 3 * 4       # 14, not 20   (* before +)
(2 + 3) * 4     # 20           (parens first)
17 MOD 5        # 2            (remainder)
20 MOD 2        # 0            (even -> remainder 0)
7 / 2           # 3.5          (decimal OK in CSP pseudocode)`,
        codeCaption: "Operator order + MOD remainder + real division",
        output: `14
20
2
0
3.5`,
        examples: [
          {
            caption: "MOD even/odd test (exam favorite)",
            code: `n <- 18
IF (n MOD 2 = 0):
    DISPLAY("even")
ELSE:
    DISPLAY("odd")`,
            output: "even",
          },
          {
            caption: "MOD wrap-around: keep a value in range 0..n-1",
            code: `index <- 14
slot  <- index MOD 5    # 14 = 2*5 + 4
DISPLAY(slot)           # 4`,
            output: "4",
          },
        ],
        checkIn: check(
          "What is the value of 23 MOD 4?",
          ["3", "4", "5", "5.75"],
          0,
          "23 ÷ 4 is 5 remainder 3, so 23 MOD 4 = 3.",
        ),
      },
      {
        id: "boolean-values",
        kicker: "True/false",
        title: "Boolean values from comparisons",
        body: `Comparisons produce **Boolean** values (\`true\`/\`false\`): \`=\` (equals), \`≠\`, \`<\`, \`>\`, \`≤\`, \`≥\`. These Boolean results are what conditionals (Lesson 6) act on. Note \`=\` here means "is equal to" for comparison, distinct from the assignment arrow \`←\`.`,
        code: `age <- 16
age >= 16     # true
age =  18     # false   (= means "equals", not assign)
age <> 18     # true    (<> / != means "not equal")`,
        codeCaption: "Comparisons produce booleans that conditionals will act on",
        output: `true
false
true`,
      },
      {
        id: "strings",
        kicker: "Text",
        title: "Strings and concatenation",
        body: `A **string** is a sequence of characters. Joining strings end-to-end is **concatenation**. The length of a string is the number of characters it contains; \`"Ada"\` has length 3. On the exam, watch spaces — they are characters too, so \`"a b"\` has length 3.

**Indexing:** AP pseudocode treats the first character as position **1** (same 1-based rule as lists). If a question shows Python-style code, follow *that* language's rule — but the official reference sheet is 1-based.`,
        code: `first <- "Ada"
last  <- "Lovelace"
full  <- first + " " + last   # you add the space yourself
DISPLAY full`,
        codeCaption: "Concatenation joins strings - it never adds spaces for you",
        output: "Ada Lovelace",
        examples: [
          {
            caption: "Spaces are characters too, so they count in length",
            code: `LENGTH("Ada")    # 3
LENGTH("a b")    # 3  (the space counts!)
LENGTH("")       # 0  (empty string)`,
            output: `3
3
0`,
          },
        ],
        checkIn: check(
          'If greeting ← "Hi" + "!" and then greeting ← greeting + greeting, what is the final value?',
          ['"Hi!"', '"Hi!Hi!"', '"HiHi!!"', '"Hi! Hi!"'],
          1,
          'First "Hi!" (length 3), then joined with itself gives "Hi!Hi!" with no added space.',
        ),
      },
      {
        id: "substrings",
        kicker: "Text ops",
        title: "Extracting parts of strings",
        body: `Many languages let you extract a **substring** (a piece of a string) and find a character's position. The exact syntax varies, but the concept is universal: given \`"HELLO"\`, you can pull \`"ELL"\` (positions 2–4) or check whether it contains \`"LO"\`.

The AP exam usually presents these as clearly-labeled procedures like \`substring(str, start, end)\` and expects you to reason about the result, not memorize one language's syntax.`,
        code: `word = "HELLO"
#       H E L L O
# pos:  1 2 3 4 5

substring(word, 2, 4)   # "ELL"  (positions 2 through 4)
contains(word, "LO")    # true
LENGTH(word)            # 5`,
        codeCaption: "Reason about substring results - don't memorize one syntax",
        output: `ELL
true
5`,
      },
      {
        id: "input-output",
        kicker: "I/O",
        title: "Input, output, and building results",
        body: `Programs read **input** and produce **output**. In AP pseudocode, \`INPUT\` gets a value and \`DISPLAY\` shows one.

A common pattern builds a result across steps. Being able to trace how a value is *built up* through several assignments is a core skill for both multiple-choice tracing and the Create PT.`,
        code: `name    <- INPUT              # user types: Ada
message <- "Welcome, " + name + "!"
DISPLAY message

# built up piece by piece:
# "Welcome, " + "Ada" + "!" -> "Welcome, Ada!"`,
        codeCaption: "Build a result by concatenating literals with input",
        output: "Welcome, Ada!",
        checkIn: check(
          'name ← INPUT (user enters "Ada"); message ← "Welcome, " + name + "!". What is displayed?',
          ['"Welcome, name!"', '"Welcome, Ada!"', '"WelcomeAda"', '"Ada Welcome!"'],
          1,
          "The current value of name (\"Ada\") is concatenated between the two literals, giving \"Welcome, Ada!\".",
        ),
      },
      {
        id: "naming",
        kicker: "Readability",
        title: "Good variable names are documentation",
        body: `A name like \`total_price\` explains itself; \`x\` does not. Since AP written responses ask you to explain your code, meaningful names make your program easier to describe and defend.

Names should reflect the *value's meaning*, not its type or history. \`count\` that actually stores a maximum (as we saw in Lesson 2) is a trap — name things for what they truly hold.`,
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Swapping two variables",
        body: `A classic exam problem: swap the values of \`a\` and \`b\`. A naïve \`a ← b\` then \`b ← a\` fails — after the first line both hold b's value. You need a **temporary** variable. This shows why assignment order and reading-before-overwriting matter.`,
        code: `a <- 3
b <- 8
temp <- a     # save a's value (3) BEFORE overwriting
a <- b        # a becomes 8
b <- temp     # b becomes the saved 3
DISPLAY a, b`,
        codeCaption: "The classic swap needs a temp to avoid losing a value",
        output: "8 3",
        examples: [
          {
            caption: "Without a temp, the first value is destroyed",
            code: `a <- 1
b <- 2
a <- b        # a becomes 2  (the 1 is GONE)
b <- a        # b becomes 2 too - swap failed
DISPLAY a, b`,
            output: "2 2",
          },
        ],
        checkIn: check(
          "You try to swap a=1, b=2 with: a ← b then b ← a (no temp). What ends up in a and b?",
          ["a=2, b=1 (correct swap)", "a=2, b=2 (both hold b's value)", "a=1, b=1", "an error occurs"],
          1,
          "After a ← b, a is 2; then b ← a stores that 2 back, so both are 2 — the swap fails without a temp.",
        ),
      },
      {
        id: "misconceptions",
        kicker: "Avoid traps",
        title: "Common beginner misconceptions",
        body: `Traps the exam tests as distractors:

1. \`←\` (assignment) is not \`=\` (mathematical equality). \`x ← x + 1\` is not a false equation; it's "make x one bigger."
2. Reassigning a variable **replaces** its value — the old value is gone unless you saved it.
3. Concatenation does not add spaces automatically; you include them yourself.

Recognizing these prevents predictable point losses.`,
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "Your programming foundation",
        body: `You can now trace assignments, evaluate arithmetic and \`MOD\`, produce Booleans from comparisons, and manipulate strings — in AP pseudocode and real code.

Next you'll use these Boolean values to make decisions with conditionals and Boolean logic — the gateway to programs that behave differently for different inputs.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Trace a short program",
        body: `Write three lines using one variable that reassign it twice with arithmetic, then predict the final displayed value. Verify by tracing line-by-line.`,
      },
    ],
  },
  bigIdeas: [
    "**Assignment (`←`) stores a value**; the right side is evaluated first, and reassigning replaces the old value.",
    "Values have types (number, string, boolean) that determine which operations are valid.",
    "`MOD` gives a remainder and is the standard tool for divisibility and cycling.",
    "Strings are sequences of characters joined by concatenation — spaces are characters you must add yourself.",
  ],
  keyTerms: [
    { term: "Variable", definition: "A named location that stores a value which can change over time." },
    { term: "Assignment", definition: "Storing a value in a variable, written with ← in AP pseudocode." },
    { term: "Expression", definition: "A combination of values and operators that evaluates to a single value." },
    { term: "MOD", definition: "The remainder operator, e.g. 17 MOD 5 = 2." },
    { term: "String", definition: "A sequence of characters, such as \"hello\"." },
    { term: "Concatenation", definition: "Joining strings end to end to form a longer string." },
  ],
  realWorld:
    "Every form you fill out online stores your entries in variables, validates them with expressions, and concatenates them into messages — the exact operations in this lesson.",
  quiz: [
    {
      id: "q1",
      question: "After: p ← 5, p ← p * 3, p ← p - 4, what is p?",
      choices: ["4", "11", "15", "18"],
      correctIndex: 1,
      explanation: "5 → 15 → 11.",
    },
    {
      id: "q2",
      question: "What is 29 MOD 6?",
      choices: ["4", "5", "6", "23"],
      correctIndex: 1,
      explanation: "6 × 4 = 24, and 29 − 24 = 5, so 29 MOD 6 = 5.",
    },
    {
      id: "q3",
      question: "Which expression evaluates to true when n is even?",
      choices: ["n MOD 2 = 1", "n MOD 2 = 0", "n / 2 = 0", "n = 2"],
      correctIndex: 1,
      explanation: "An even number leaves remainder 0 when divided by 2.",
    },
    {
      id: "q4",
      question: "What does DISPLAY 4 + 6 * 2 show?",
      choices: ["20", "16", "14", "12"],
      correctIndex: 1,
      explanation: "Multiplication first: 6*2=12, then 4+12=16.",
    },
    {
      id: "q5",
      question: 'If s ← "cat" + "dog", what is the length of s?',
      choices: ["3", "6", "7", "2"],
      correctIndex: 1,
      explanation: '"catdog" has 6 characters.',
    },
    {
      id: "q6",
      question: "To swap the values in a and b correctly, you must:",
      choices: [
            "Do a ← b then b ← a",
            "Use a temporary variable to hold one value before overwriting",
            "It is impossible to swap two variables",
            "Add a and b together",
          ],
      correctIndex: 1,
      explanation: "A temp variable preserves the first value before it's overwritten.",
    },
    {
      id: "q7",
      question: "The AP pseudocode line x ← x + 1 means:",
      choices: [
            "x equals x plus one, a false statement",
            "Create a new constant",
            "Compare x to x + 1",
            "Store the result of (current x + 1) back into x",
          ],
      correctIndex: 3,
      explanation: "It reassigns x to one more than its current value.",
    },
    {
      id: "q8",
      question: 'greeting ← "Hi" + name. If name is "Sam", why might the output be "HiSam"?',
      choices: [
            "Because strings cannot contain spaces",
            "Because of an overflow error",
            "Because concatenation does not insert spaces automatically",
            "Because MOD removed the space",
          ],
      correctIndex: 2,
      explanation: "You must include a space yourself; concatenation just joins the pieces.",
    },
    {
      id: "q9",
      question: "In AP CSP pseudocode, what does DISPLAY(7 / 2) show?",
      choices: ["3", "3.5", "4", "1"],
      correctIndex: 1,
      explanation: "AP pseudocode division can produce a decimal, so 7 / 2 is 3.5 (not truncated to 3). Use MOD for the remainder.",
    },
  ],
  reflection: {
    prompt:
      "Meaningful names make Create PT write-ups clearer. Describe a small program idea and list three well-named variables it would use and what each stores.",
    placeholder: "Program idea and three descriptive variable names with meanings…",
  },
};
