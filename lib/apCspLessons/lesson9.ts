import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson9: AILessonConfig = {
  id: "csp-9",
  title: "9. Procedures, Parameters, Return & Abstraction",
  goal: "Write reusable procedures with parameters and return values, and use abstraction to manage complexity.",
  xpReward: 450,
  badge: "Procedure Architect",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/8",
  nextHref: "/learn/ap-csp-prep/10",
  instructorScript: `**Coach's note**
Today's lesson: **Procedures, Parameters, Return & Abstraction**.

**Goal:** Write reusable procedures with parameters and return values, and use abstraction to manage complexity.

**How to facilitate**
1. Warm-up: ask students what they already think about "Name a behavior, reuse it everywhere".
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
        title: "Name a behavior, reuse it everywhere",
        body: `A **procedure** (also called a function or method) is a named block of code you can call by name. Procedures are the primary tool for **abstraction** in programming — and the Create Performance Task specifically requires a **student-developed procedure with at least one parameter that affects its behavior**.

Defining procedures well is the difference between a tangled script and a program a person can read, test, and extend.`,
      },
      {
        id: "define-call",
        kicker: "Basics",
        title: "Defining and calling a procedure",
        body: `You **define** a procedure once and **call** it as many times as you like. Each call runs the procedure's body. Writing the logic once and calling it repeatedly removes duplicated code — if the greeting changes, you edit one place.`,
        code: `PROCEDURE greet():        # define ONCE
    DISPLAY "Hello!"

greet()                   # call
greet()                   # call again`,
        codeCaption: "Define once, call many times - no duplicated code",
        output: `Hello!
Hello!`,
      },
      {
        id: "parameters",
        kicker: "Inputs",
        title: "Parameters make procedures flexible",
        body: `A **parameter** is a variable that receives a value (an **argument**) when the procedure is called. Parameters let one procedure handle many cases. The Create PT rubric requires a parameter that **changes the procedure's behavior** — so \`name\` below genuinely matters because the output differs per argument.

**A parameter receives a *copy of the value*.** Conceptually, when you call \`greet("Ada")\`, the parameter \`name\` is handed the value \`"Ada"\` to use *inside* the procedure. A key consequence the exam probes: for simple values (numbers, text, Booleans), **reassigning a parameter inside the procedure does *not* change the caller's variable.** In the example below, \`bump(score)\` changes its own local \`x\`, but the caller's \`score\` is untouched — the procedure worked on a copy. Think of it as the caller *telling* the procedure a value, not *lending* it the actual variable.`,
        code: `PROCEDURE greet(name):    # name = PARAMETER
    DISPLAY "Hello, " + name + "!"

greet("Ada")   # "Ada" = ARGUMENT
greet("Sam")   # different argument -> different output

# A parameter gets a COPY of the value:
PROCEDURE bump(x):
    x <- x + 100          # changes the LOCAL copy only
    DISPLAY x             # 105

score <- 5
bump(score)               # displays 105
DISPLAY score             # still 5  <- caller's variable unchanged`,
        codeCaption: "Parameter = local copy: reassigning it inside doesn't change the caller's variable",
        output: `Hello, Ada!
Hello, Sam!
105
5`,
        checkIn: check(
          "What is the difference between a parameter and an argument?",
          [
            "They are the same thing with different spellings",
            "A parameter is the variable in the definition; an argument is the value passed in a call",
            "A parameter is a return value; an argument is a loop",
            "An argument is defined first, a parameter second",
          ],
          1,
          "The parameter names the input in the definition; the argument is the actual value supplied at call time.",
        ),
      },
      {
        id: "return",
        kicker: "Outputs",
        title: "Returning a value",
        body: `A procedure can **return** a value — a result the caller can use in an expression or store in a variable. This differs from just displaying: a returned value flows back into the program. \`RETURN\` also *ends* the procedure immediately. Code after a reached RETURN does not run.`,
        code: `PROCEDURE square(n):
    RETURN n * n          # hand the value back to the caller

area <- square(5)         # 25 stored in a variable
DISPLAY square(3) + 1     # returned 9, used in an expression`,
        codeCaption: "RETURN hands a value back so the program can keep using it",
        output: "10",
        examples: [
          {
            caption: "DISPLAY only shows; RETURN feeds the value back into your code",
            code: `def square(n):
    return n * n

area = square(5)       # 25 (usable later)
print(square(3) + 1)   # 9 + 1`,
            output: "10",
          },
        ],
        checkIn: check(
          "What is the key difference between RETURN and DISPLAY?",
          [
            "There is no difference",
            "RETURN sends a value back to the caller to use; DISPLAY only shows it on screen",
            "DISPLAY ends the procedure; RETURN does not",
            "RETURN can only be used inside loops",
          ],
          1,
          "A returned value flows back into the program for further use, whereas DISPLAY just outputs to the screen.",
        ),
      },
      {
        id: "abstraction",
        kicker: "Core idea",
        title: "Procedural abstraction",
        body: `**Procedural abstraction** means you can use a procedure by knowing *what* it does without knowing *how* it does it. Once \`square(n)\` works, you call it and trust the result — the details are hidden behind the name.

This is the same abstraction idea from Lesson 3, now applied to behavior. Good names make the abstraction honest: \`square\` should square, not occasionally print or delete files.`,
        code: `# You call it by WHAT it does, not HOW
total <- sum(scores)      # trust it adds them
avg   <- average(scores)  # trust it divides by count

# the messy details stay hidden behind the name`,
        codeCaption: "Procedural abstraction: use the name, ignore the how",
      },
      {
        id: "proc-vs-data-abstraction",
        kicker: "Contrast",
        title: "Procedural vs. data abstraction",
        body: `AP CSP names **two** kinds of abstraction in programming, and the exam expects you to tell them apart. Both hide detail so you can manage complexity — they just hide *different things*.

| | Procedural abstraction | Data abstraction |
| --- | --- | --- |
| Hides… | *How* a behavior is carried out | *How* data is stored/organized |
| Tool | A **procedure** (function) called by name | A **list** or other collection under one name |
| You think about… | *What* it does — \`average(scores)\` | *The whole thing* — "the scores", not 30 variables |
| From Lesson… | this lesson | Lesson 8 |

**Procedural abstraction** lets you call \`average(scores)\` and trust the result without knowing the summing-and-dividing steps inside. **Data abstraction** lets you keep 30 grades in one \`scores\` list instead of \`s1, s2, … s30\`, reasoning about "the scores" as a single thing. A well-designed program uses both: procedures that operate on abstracted data. Notice \`average(scores)\` literally combines them — a *procedural* abstraction taking a *data* abstraction as its argument.`,
        code: `# DATA abstraction: many values, ONE name
scores <- [88, 92, 75, 60, ...]   # not s1, s2, s3, ...

# PROCEDURAL abstraction: a behavior, ONE name
avg <- average(scores)   # trust WHAT it does, ignore HOW

# good design uses BOTH together:
#   a procedure (behavior) operating on a list (data)`,
        codeCaption: "Procedural hides how a behavior works; data hides how values are organized",
        checkIn: check(
          "Storing 100 temperatures in one list called `readings` instead of 100 separate variables is an example of:",
          [
            "procedural abstraction",
            "data abstraction",
            "an infinite loop",
            "a return value",
          ],
          1,
          "Representing many values under one name (a list) is data abstraction; hiding a behavior behind a procedure name is procedural abstraction.",
        ),
      },
      {
        id: "why-abstract",
        kicker: "Benefits",
        title: "Why abstraction manages complexity",
        body: `Abstraction lets you build big programs from understandable pieces:

- **Reuse** — write once, call many times.
- **Readability** — \`average(scores)\` reads better than 6 inline lines.
- **Testability** — a small procedure can be tested in isolation.
- **Maintainability** — fix a bug in one place, not ten copies.

On the exam, the "best design" answer usually favors breaking a large task into well-named procedures over one giant block of code.`,
        checkIn: check(
          "Which is a primary benefit of using procedures (procedural abstraction)?",
          [
            "It makes the program require more memory",
            "It lets you reuse and reason about a behavior by name without re-examining its details each time",
            "It prevents the program from ever having bugs",
            "It removes the need for parameters",
          ],
          1,
          "Abstraction hides implementation details so code can be reused and understood by name.",
        ),
      },
      {
        id: "scope",
        kicker: "Detail",
        title: "Local variables and scope",
        body: `Variables created inside a procedure are usually **local** — they exist only during that call and don't clash with variables elsewhere. Two procedures can both use a variable named \`i\` without interfering.

This isolation is part of what makes procedures safe to compose: a procedure's internal work doesn't leak out and corrupt the rest of the program.`,
        code: `PROCEDURE a():
    i <- 1        # this i is LOCAL to a
PROCEDURE b():
    i <- 99       # a totally separate i, no clash

# a()'s i and b()'s i never interfere with each other`,
        codeCaption: "Local variables live only during the call - no name clashes",
      },
      {
        id: "composition",
        kicker: "Build up",
        title: "Composing procedures",
        body: `Procedures call other procedures, building layered abstractions. \`report\` relies on \`average\`, which could rely on \`sum\`. Each layer trusts the one below. This mirrors how real software and even hardware are organized into levels of abstraction.`,
        code: `PROCEDURE average(list):
    RETURN sum(list) / LENGTH(list)   # trusts sum()

PROCEDURE report(list):
    DISPLAY "Average: " + average(list)  # trusts average()

report([80, 90, 70])   # report -> average -> sum`,
        codeCaption: "Composition: each procedure trusts the layer below it",
        output: "Average: 80",
        checkIn: check(
          "A procedure report(list) calls average(list), which calls sum(list). What does this layering illustrate?",
          [
            "A syntax error from too many calls",
            "Composing procedures into layers of abstraction, each relying on the one below",
            "That procedures cannot call other procedures",
            "That parameters are unnecessary",
          ],
          1,
          "Procedures calling procedures build layered abstractions, each trusting the layer beneath it.",
        ),
      },
      {
        id: "libraries",
        kicker: "Reuse at scale",
        title: "Existing procedures and libraries",
        body: `You don't write everything from scratch. A **library** is a collection of procedures others wrote that you can call — \`RANDOM(a, b)\`, math functions, string helpers. The AP framework encourages using existing correct procedures rather than reinventing them.

Using a library is abstraction across teams: you rely on *what* a procedure guarantees without reading its source. (Crediting such code connects to Lesson 14 on intellectual property.)`,
        code: `# Call library procedures by their described behavior:
roll  <- RANDOM(1, 6)      # a random int 1..6
root  <- SQRT(81)          # 9
n     <- LENGTH("hello")   # 5

# You never read their source - you trust the contract`,
        codeCaption: "Libraries: reuse trusted procedures by their described behavior",
        callout: {
          label: "On the AP exam",
          text: "Questions may give you a procedure's description and ask what a call returns. Reason only from the described behavior — you don't need its internal code.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "A parameter that changes behavior",
        body: `A Create-PT-style procedure whose parameter genuinely alters the result. Same \`score\`, different \`cutoff\` → different result. The parameter \`cutoff\` demonstrably affects behavior, which is exactly what the rubric wants.`,
        code: `PROCEDURE isPassing(score, cutoff):
    IF (score >= cutoff):
        RETURN true
    ELSE:
        RETURN false

DISPLAY isPassing(72, 60)   # same score...
DISPLAY isPassing(72, 75)   # ...different cutoff -> different result`,
        codeCaption: "One parameter (cutoff) demonstrably changes the result",
        output: `true
false`,
        callout: {
          label: "Instructor tip · Create PT",
          text: "The rubric's student-developed procedure must do three things together: (1) take a parameter that actually affects the result, (2) contain selection (an IF), and (3) contain iteration (a loop). A one-line procedure with a parameter isn't enough — build one that loops over data and makes a decision, and whose parameter changes what happens. That single procedure can satisfy several rubric rows at once.",
        },
        examples: [
          {
            caption: "The boundary case: score exactly equals cutoff",
            code: `def is_passing(score, cutoff):
    return score >= cutoff

print(is_passing(60, 60))   # 60 >= 60`,
            output: "True",
          },
          {
            caption: "Create-PT shape: parameter + selection + iteration in ONE procedure",
            code: `def count_passing(scores, cutoff):   # parameter: cutoff
    count = 0
    for s in scores:                 # iteration
        if s >= cutoff:              # selection
            count = count + 1
    return count

print(count_passing([90, 55, 72], 60))  # cutoff 60 -> 2
print(count_passing([90, 55, 72], 80))  # cutoff 80 -> 1`,
            output: `2
1`,
          },
        ],
        checkIn: check(
          "For isPassing(score, cutoff) returning score ≥ cutoff, what does isPassing(60, 60) return?",
          ["true", "false", "60", "an error"],
          0,
          "60 ≥ 60 is true, so the procedure returns true.",
        ),
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "You design with abstraction",
        body: `You can define and call procedures, pass arguments to parameters that change behavior, return values, and compose small procedures into larger programs — the exact abstraction skills the Create PT rewards.

Next you'll analyze *how good* your algorithms are: efficiency, and the searching and sorting concepts the exam expects you to reason about.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Design a procedure",
        body: `Write a procedure header (name + parameter) for something your program needs. State what it returns and give two calls with different arguments that produce different results.`,
      },
    ],
  },
  bigIdeas: [
    "A **procedure** is a named, reusable block of code — the primary tool for procedural abstraction.",
    "**Parameters** receive **arguments** at call time, letting one procedure handle many cases; the Create PT needs a parameter that changes behavior.",
    "**RETURN** sends a value back into the program (and ends the procedure), unlike DISPLAY which only shows output.",
    "Abstraction manages complexity through reuse, readability, testability, and maintainability.",
  ],
  keyTerms: [
    { term: "Procedure", definition: "A named block of code (function/method) that can be called to run its body." },
    { term: "Parameter", definition: "A variable in a procedure's definition that receives an input value." },
    { term: "Argument", definition: "The actual value passed to a parameter when a procedure is called." },
    { term: "Return value", definition: "A result a procedure sends back to the code that called it." },
    { term: "Procedural abstraction", definition: "Using a procedure by its name and behavior without needing its internal details." },
    { term: "Library", definition: "A collection of existing procedures that programs can reuse." },
  ],
  realWorld:
    "Every app you use is thousands of procedures calling one another — 'send message', 'format date', 'check password' — each an abstraction hiding its own complexity.",
  quiz: [
    {
      id: "q1",
      question: "In PROCEDURE add(a, b), a and b are:",
      choices: ["arguments", "parameters", "return values", "libraries"],
      correctIndex: 1,
      explanation: "Variables named in the definition are parameters; the values passed in calls are arguments.",
    },
    {
      id: "q2",
      question: "square(n) returns n*n. What is the value of square(4) + square(2)?",
      choices: ["12", "16", "20", "36"],
      correctIndex: 2,
      explanation: "16 + 4 = 20.",
    },
    {
      id: "q3",
      question: "The main difference between RETURN and DISPLAY is that RETURN:",
      choices: [
            "sends a value back to the caller for further use",
            "prints text in color",
            "can only appear in loops",
            "creates a new list",
          ],
      correctIndex: 0,
      explanation: "A returned value flows back into the program; DISPLAY merely shows output.",
    },
    {
      id: "q4",
      question: "Why does the Create PT require a parameter that affects behavior?",
      choices: [
            "Because parameters are required by the language",
            "To demonstrate genuine procedural abstraction where input changes the result",
            "To avoid using lists",
            "To make the program longer",
          ],
      correctIndex: 1,
      explanation: "A behavior-affecting parameter shows real abstraction, not a trivial fixed procedure.",
    },
    {
      id: "q5",
      question: "A variable created inside a procedure that exists only during the call is:",
      choices: ["global", "local", "a parameter", "a return value"],
      correctIndex: 1,
      explanation: "Such variables are local to the procedure and don't clash with outside variables.",
    },
    {
      id: "q6",
      question: "You call an existing library procedure RANDOM(1, 6). To use it correctly you must:",
      choices: [
            "Rewrite it yourself",
            "Read its full source code first",
            "Convert it to a loop",
            "Know only what it does (its described behavior)",
          ],
      correctIndex: 3,
      explanation: "Procedural abstraction lets you rely on described behavior without internal details.",
    },
    {
      id: "q7",
      question: "isPassing(score, cutoff) returns score ≥ cutoff. isPassing(58, 60) returns:",
      choices: ["true", "false", "58", "error"],
      correctIndex: 1,
      explanation: "58 ≥ 60 is false.",
    },
    {
      id: "q8",
      question: "Which best explains why breaking a program into small procedures aids maintenance?",
      choices: [
            "A fix can be made in one place instead of many duplicated copies",
            "It guarantees zero bugs",
            "It makes the program use more memory",
            "It removes the need for testing",
          ],
      correctIndex: 0,
      explanation: "Centralizing behavior means one edit fixes all uses — the maintainability benefit of abstraction.",
    },
  ],
  reflection: {
    prompt:
      "Design the student-developed procedure your Create PT would use. Give its name and parameter, describe what it returns, and explain how the parameter changes its behavior with two example calls.",
    placeholder: "Procedure name, parameter, return, and two calls showing different behavior…",
  },
};
