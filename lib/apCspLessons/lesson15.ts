import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson15: AILessonConfig = {
  id: "csp-15",
  title: "15. Create Performance Task Studio",
  goal: "Plan a Create Performance Task program that meets every scoring requirement, then draft written responses that earn the points.",
  xpReward: 750,
  badge: "Create PT Coach",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/14",
  nextHref: "/learn/ap-csp-prep/16",
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Create PT",
        title: "The task that ties it all together",
        body: `The **Create Performance Task** is the through-course assessment where you build a program and write about it. This studio helps you plan a program that hits every scoring point and draft responses that graders can clearly credit.

Kanam Academy prepares you for the Create PT; it is **not** an official AP course and does **not** submit to the College Board Digital Portfolio. You complete and submit the actual task through your school and College Board per current rules. Always confirm requirements against the **current official** College Board CSP documentation, since details are periodically updated.`,
      },
      {
        id: "deliverables",
        kicker: "What you submit",
        title: "The deliverables",
        body: `Under the current College Board model (confirm for your exam year), you typically submit through the **AP Digital Portfolio**:
- A **program** you developed (source / project).
- A **video** (≤1 minute) showing the program running with input → output behavior.
- A **Personalized Project Reference (PPR)** — selected code segments (procedure + list) you will use on exam day.

On the **end-of-course exam**, you answer **written-response prompts** about *your* Create PT while referring to that PPR. Practice writing clear purpose, algorithm, testing, and abstraction explanations here — but submit the official artifacts only through College Board.

Because details can change year to year, treat the categories below as durable *concepts*, and verify exact wording against the official CED for your exam year.`,
        code: `CREATE PT CHECKLIST
  [ ] program you developed (source/project)
  [ ] video <= 1 min showing input -> output
  [ ] Personalized Project Reference (PPR):
        - your procedure segment
        - your list segment
  [ ] written responses on exam day (about YOUR program)
# submit official artifacts via College Board, not Kanam`,
        codeCaption: "What you submit: program, video, PPR, and exam-day responses",
      },
      {
        id: "required-elements",
        kicker: "Must-haves",
        title: "The program's required elements",
        body: `A scorable Create PT program reliably needs to demonstrate these computer-science elements:

| Element | What it means |
| --- | --- |
| List (collection) | A list used to manage complexity meaningfully |
| Student-developed procedure | Your own procedure with a parameter |
| Parameter affecting behavior | The argument changes what the procedure does |
| Sequencing, selection, iteration | Used inside that procedure's algorithm |
| Program purpose & function | A clear reason the program exists |

Every one of these you already learned: lists (L8), procedures/parameters (L9), selection (L6), iteration (L7).`,
        code: `REQUIRED ELEMENT              you learned it in
  list managing complexity  -> Lesson 8
  student procedure + param -> Lesson 9
  parameter affects behavior-> Lesson 9
  selection (IF)            -> Lesson 6
  iteration (loop)          -> Lesson 7
  clear purpose             -> Lesson 1`,
        codeCaption: "Every scored element maps to a lesson you already finished",
        checkIn: check(
          "Which combination best satisfies the Create PT's core algorithm requirement?",
          [
            "A procedure that only prints a fixed message",
            "A student-developed procedure with a parameter whose algorithm uses selection and iteration",
            "A single variable assignment",
            "A program with no procedures",
          ],
          1,
          "The rubric wants a student-developed procedure with a behavior-affecting parameter, containing selection and iteration.",
        ),
      },
      {
        id: "list-requirement",
        kicker: "Data",
        title: "Using a list meaningfully",
        body: `The list must **manage complexity** — the program would be harder or clumsier without it. Storing 20 scores in one \`scores\` list you then traverse is meaningful; a list you declare but never use is not. In your written response, name the list, describe what it stores, and explain how it manages complexity.`,
        code: `# WEAK: 20 separate variables (clumsy, can't loop)
s1 <- 88 ; s2 <- 92 ; s3 <- 75 ; ...  s20 <- 95

# STRONG: one list you traverse (manages complexity)
scores <- [88, 92, 75, 60, 95, ...]
FOR EACH s IN scores:
    ...   # "without the list I'd need 20 variables"`,
        codeCaption: "A list manages complexity when it replaces many variables + is used",
        checkIn: check(
          "Which use of a list would satisfy the Create PT's requirement that a list manage complexity?",
          [
            "Declaring a list but never using it",
            "Storing all student scores in one list you traverse, instead of many separate variables",
            "Using a single variable for one value",
            "Printing a fixed message with no data",
          ],
          1,
          "A list that meaningfully replaces many separate variables and is traversed manages complexity; an unused list does not.",
        ),
      },
      {
        id: "procedure-requirement",
        kicker: "Abstraction",
        title: "The student-developed procedure",
        body: `Your procedure must be **written by you** (not solely a built-in) and take a **parameter that changes its behavior** (Lesson 9). Its body should include the algorithmic pieces: **sequencing, selection, and iteration**. This one procedure can demonstrate the list, parameter, selection, iteration, and return all at once — a compact way to satisfy multiple requirements.`,
        code: `PROCEDURE countAbove(list, cutoff):   # your procedure + param
    count <- 0                        # sequencing
    FOR EACH v IN list:               # iteration
        IF (v >= cutoff):             # selection
            count <- count + 1
    RETURN count
# ticks 5 boxes: list, parameter, selection, iteration, return`,
        codeCaption: "One procedure satisfies list + parameter + selection + iteration",
        examples: [
          {
            caption: "The same PPR-ready procedure in real code",
            code: `def count_above(values, cutoff):
    count = 0
    for v in values:        # iteration
        if v >= cutoff:     # selection
            count += 1
    return count

print(count_above([88, 92, 75, 60, 95], 90))`,
            output: "2",
          },
        ],
        checkIn: check(
          "Why must your Create PT procedure include a parameter that affects its behavior?",
          [
            "To make the code longer",
            "To demonstrate abstraction — the same procedure produces different results for different arguments",
            "Because parameters are required by every language",
            "To avoid needing a list",
          ],
          1,
          "A behavior-affecting parameter shows genuine procedural abstraction, which the rubric rewards.",
        ),
      },
      {
        id: "written-responses",
        kicker: "Explain",
        title: "Exam-day written responses (four prompt categories)",
        body: `Under the current model (confirm for your year), you submit **program + video + Personalized Project Reference (PPR)** before the exam. On exam day you answer written prompts **about your own code** while looking at your PPR.

Practice these four categories — they map to what College Board assesses:

| Category | What to practice saying |
| --- | --- |
| **1. Program design, function, purpose** | One-sentence purpose; inputs/outputs; what the video shows |
| **2a. Algorithm development** | How your procedure uses **sequencing, selection, and iteration** |
| **2b. Errors and testing** | A bug you found / how you tested; two different calls or conditions |
| **2c. Data & procedural abstraction** | How the **list** manages complexity; how the **procedure + parameter** abstracts |

Vague answers ("it makes the program better") lose points. Name **your** list, procedure, parameters, and concrete results.`,
        code: `WEAK:  "the list makes it better"
STRONG:
  "scores stores five quiz results so I don't need
   five variables. countAbove(list, cutoff) traverses
   scores; IF v >= cutoff it increments. 
   countAbove(scores, 90) returns 2."`,
        codeCaption: "Name YOUR identifiers and results — generic praise earns 0",
        examples: [
          {
            caption: "PPR prep: capture the LIST segment and the PROCEDURE segment",
            code: `PPR should clearly show:
  [ ] the list declaration / use
  [ ] the student-developed procedure with parameter(s)
  [ ] selection + iteration inside that procedure
# On exam day you WRITE about these screenshots — practice aloud`,
          },
          {
            caption: "Category 2b practice: two calls, different results",
            code: `countAbove(scores, 90) -> 2
countAbove(scores, 60) -> 5
# Explain WHY the IF condition behaves differently`,
          },
        ],
        callout: {
          label: "Create PT rules (verify annually)",
          text: "You may collaborate on program code with partner(s); video and PPR must be completed individually. Acknowledge outside code/media/AI assistance per current College Board policy — unacknowledged reuse can invalidate the submission. Kanam does not submit for you.",
        },
      },
      {
        id: "testing-explanation",
        kicker: "Evidence",
        title: "Explaining two calls / conditions",
        body: `A commonly credited response describes **two different calls** to your procedure and the different results, showing the parameter matters. Explain *why* the results differ in terms of the algorithm's selection condition. This directly demonstrates the parameter changing behavior — an easy, concrete point to secure.`,
        code: `scores = [88, 92, 75, 60, 95]

countAbove(scores, 90)  ->  2   # only 92, 95 pass v >= 90
countAbove(scores, 60)  ->  5   # all pass v >= 60

# SAME list, DIFFERENT cutoff -> DIFFERENT result
# that's the parameter changing behavior (a guaranteed point)`,
        codeCaption: "Two calls, different arguments, different results = point secured",
        output: `2
5`,
        checkIn: check(
          "For countAbove(list, cutoff) counting values ≥ cutoff, calling it on [88,92,75,60,95] with cutoff 80 returns:",
          ["2", "3", "4", "5"],
          1,
          "Values ≥ 80 are 88, 92, and 95 → 3.",
        ),
      },
      {
        id: "planning",
        kicker: "Plan",
        title: "A planning checklist",
        body: `Before coding, sketch your plan against the requirements:

- **Purpose:** one sentence — what problem/idea/entertainment?
- **Input:** what does the user/data provide?
- **List:** what collection manages complexity?
- **Procedure:** name, parameter, and what its algorithm does (selection + iteration).
- **Output:** what the user sees, driven by the algorithm.
- **Sources:** anything you'll reuse and how you'll credit it.

Filling this in first prevents the classic failure of a program that "runs" but misses a scored element.`,
        code: `PLAN (fill in BEFORE coding)
  purpose:   ______________________ (one sentence)
  input:     ______________________
  list:      ______________________ (manages complexity)
  procedure: name(_____, _____)  <- parameter affects behavior
     algorithm: selection + iteration
  output:    ______________________
  sources:   ______________________ (how you'll credit)`,
        codeCaption: "Plan against the rubric first, then code - don't miss a scored element",
      },
      {
        id: "common-mistakes",
        kicker: "Avoid traps",
        title: "Common ways students lose points",
        body: `Frequent, avoidable mistakes:
1. A procedure with a parameter that **doesn't actually change behavior** (e.g., ignored inside).
2. A list that's declared but **never used** to manage complexity.
3. Written responses that describe the concept generically instead of **their own code**.
4. Forgetting to **acknowledge sources**, risking invalidation.
5. A video that doesn't clearly show the program's **input and resulting output**.`,
        checkIn: check(
          "Which is a common, avoidable way students lose Create PT points?",
          [
            "Explaining their own code with specific variable and procedure names",
            "Writing a procedure whose parameter is ignored and doesn't change behavior",
            "Using a list to manage complexity",
            "Acknowledging reused sources",
          ],
          1,
          "A parameter that doesn't affect the procedure's behavior fails the rubric's abstraction requirement.",
        ),
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "A complete mini-plan",
        body: `**Program:** a study-session planner.
- **Purpose:** help a student see how many topics still need review.
- **List:** \`topics\` storing each topic's status.
- **Procedure:** \`countNeedingReview(topics, threshold)\` — iterates topics, selects those below a mastery threshold, returns the count.
- **Two calls:** threshold 3 vs. threshold 5 return different counts, proving the parameter matters.
- **Output:** "You have N topics to review."
- **Sources:** a CC-licensed icon set, credited in the write-up.

Every scored element maps to something concrete — that is the goal of the studio.`,
        code: `STUDY-SESSION PLANNER  (every element mapped)
  purpose   -> see how many topics still need review
  list      -> topics[] (status per topic)
  procedure -> countNeedingReview(topics, threshold)
  two calls -> threshold 3 vs 5 -> different counts
  output    -> "You have N topics to review."
  sources   -> CC-licensed icons, credited`,
        codeCaption: "A mini-plan where every scored element maps to something concrete",
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "You're ready to build",
        body: `You can plan a Create PT program that uses a meaningful list and a student-developed procedure with a behavior-affecting parameter containing selection and iteration, and draft written responses that reference *your* code specifically — while acknowledging sources.

In the final lesson, you'll face an AP-style practice gauntlet and build an exam-day readiness plan.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Draft your procedure header",
        body: `Write a one-line purpose and a procedure header (name + parameter) for a Create PT idea. State two different arguments and the different results they'd produce.`,
      },
    ],
  },
  bigIdeas: [
    "The Create PT program needs a **meaningful list**, a **student-developed procedure with a behavior-affecting parameter**, and **selection + iteration** in its algorithm.",
    "Written responses earn points by referencing **your specific code** — named variables, procedures, and results — not generic descriptions.",
    "Describing **two calls with different arguments** and results proves the parameter changes behavior.",
    "You must **acknowledge all sources**; Kanam prepares you but you submit the real task via College Board — always check the current official CED.",
  ],
  keyTerms: [
    { term: "Create Performance Task", definition: "The AP CSP through-course assessment: build a program and explain it in writing and video." },
    { term: "Student-developed procedure", definition: "A procedure you write yourself that includes a parameter affecting behavior." },
    { term: "Manage complexity", definition: "Using a construct (like a list) to make a program simpler or more capable than without it." },
    { term: "Personalized Project Reference", definition: "Code segments from your Create PT (procedure + list) you submit and use while answering exam written responses." },
    { term: "Acknowledgment", definition: "Crediting any code, media, or ideas in your program that you did not create." },
    { term: "Selection & iteration", definition: "Decision-making (IF) and repetition (loops) required within your algorithm." },
  ],
  realWorld:
    "The Create PT mirrors real software work: scope a purpose, build a reusable procedure over a data collection, test it, document it, and credit what you reused.",
  quiz: [
    {
      id: "q1",
      question: "Which element is required in a scorable Create PT program?",
      choices: [
        "A student-developed procedure with a parameter that affects behavior",
        "At least 1,000 lines of code",
        "Use of a specific paid library",
        "A 3D graphics engine",
      ],
      correctIndex: 0,
      explanation: "The rubric centers on a student-developed procedure with a behavior-affecting parameter.",
    },
    {
      id: "q2",
      question: "For the list requirement, the list must:",
      choices: [
        "Be exactly 10 elements long",
        "Be used to manage complexity (the program is better with it than without)",
        "Contain only numbers",
        "Never be traversed",
      ],
      correctIndex: 1,
      explanation: "The list must meaningfully manage complexity, not merely exist.",
    },
    {
      id: "q3",
      question: "Your procedure's algorithm should contain:",
      choices: [
        "Only a print statement",
        "Sequencing, selection, and iteration",
        "No parameters",
        "Exactly one line",
      ],
      correctIndex: 1,
      explanation: "The algorithm should demonstrate sequencing, selection, and iteration.",
    },
    {
      id: "q4",
      question: "countAbove(list, cutoff) counts values ≥ cutoff. On [70,80,90] with cutoff 80 it returns:",
      choices: ["1", "2", "3", "0"],
      correctIndex: 1,
      explanation: "80 and 90 are ≥ 80, so it returns 2.",
    },
    {
      id: "q5",
      question: "The strongest way to show your parameter affects behavior is to:",
      choices: [
        "Describe two calls with different arguments and their different results",
        "State that parameters are important in general",
        "Make the parameter unused",
        "Add more comments only",
      ],
      correctIndex: 0,
      explanation: "Two calls yielding different results concretely demonstrate the parameter's effect.",
    },
    {
      id: "q6",
      question: "A common reason students lose Create PT points is:",
      choices: [
        "Explaining their own code too specifically",
        "A parameter that doesn't actually change the procedure's behavior",
        "Using a list to manage complexity",
        "Acknowledging their sources",
      ],
      correctIndex: 1,
      explanation: "A parameter that's ignored fails the behavior-affecting requirement.",
    },
    {
      id: "q7",
      question: "Regarding reused code or media, you must:",
      choices: [
        "Never reuse anything",
        "Acknowledge/credit anything you did not create yourself",
        "Only credit paid content",
        "Hide that you reused it",
      ],
      correctIndex: 1,
      explanation: "All borrowed code, media, and ideas must be acknowledged per policy.",
    },
    {
      id: "q8",
      question: "What is the most accurate statement about Kanam's AP CSP Prep track?",
      choices: [
        "It is the official AP course and grants college credit automatically",
        "It prepares you for the exam and Create PT; you still register and submit through College Board",
        "It submits your Create PT to the Digital Portfolio for you",
        "It replaces the AP exam",
      ],
      correctIndex: 1,
      explanation: "Kanam is exam prep; students still take the AP exam and submit the task via College Board.",
    },
  ],
  reflection: {
    prompt:
      "Draft your Create PT plan: the program's purpose, the list it uses, the student-developed procedure and its behavior-affecting parameter, and two calls with different results you'd describe in your written response.",
    placeholder: "Purpose, list, procedure + parameter, and two contrasting calls…",
  },
};
