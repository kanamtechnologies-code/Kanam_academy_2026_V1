import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson1: AILessonConfig = {
  id: "csp-1",
  title: "1. Creative Development: Purpose, Collaboration & Iteration",
  goal: "Turn a fuzzy idea into a purpose-driven program built through collaboration and deliberate iteration.",
  xpReward: 50,
  badge: "Design Collaborator",
  dashboardHref: "/dashboard",
  nextHref: "/learn/ap-csp-prep/2",
  instructorScript: `**Coach's note**
Today's lesson: **Creative Development: Purpose, Collaboration & Iteration**.

**Goal:** Turn a fuzzy idea into a purpose-driven program built through collaboration and deliberate iteration.

**How to facilitate**
1. Warm-up: ask students what they already think about "Programs begin with a purpose, not a codebase".
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
        title: "Programs begin with a purpose, not a codebase",
        image: "/images/lessons/dl-6.png",
        imageAlt: "Teammates collaborating on a shared digital project",
        body: `Every strong computing artifact answers one question first: **who is this for, and what does it help them do?** On the AP exam, Big Idea 1 (Creative Development) is 10–13% of the multiple-choice section and shapes the language you must use in the Create Performance Task.

A **program** is an artifact created to fulfill a purpose. That purpose might solve a problem, express an idea, or entertain. The College Board calls the reason a program exists its **purpose**, and every design choice — inputs, outputs, screens, data — should trace back to it.

Consider a program that helps commuters decide whether to bike or take the bus. Its purpose is a *decision*, so its output should be a clear recommendation, not a wall of raw weather numbers. When you can name the purpose in one sentence, the rest of the design gets easier to defend.`,
        code: `# One sentence of purpose drives every design choice
PURPOSE = "Help a commuter decide: bike or bus?"

# Purpose is a DECISION, so the output is a recommendation...
output = "Take the bus - rain likely at 5pm"

# ...NOT a wall of raw data the user must interpret
# bad_output = "temp=54 humidity=88 wind=12 precip=0.7 ..."`,
        codeCaption: "The purpose decides what the output should be",
        output: "Take the bus - rain likely at 5pm",
        callout: {
          label: "Instructor tip · exam day",
          text: "Write your program's purpose in one sentence before you code. On Create PT written responses you will be asked for purpose — vague answers lose points.",
        },
      },
      {
        id: "purpose-vs-function",
        kicker: "Exam distinction",
        title: "Purpose vs. function — they are not the same",
        body: `College Board treats these as two different ideas:

| Term | Meaning | Example |
| --- | --- | --- |
| **Purpose** | What the program is *intended* to do | "Help a student pick a lunch option under $6" |
| **Function** | What the program *actually* does when it runs | Displays options, accepts a choice, shows remaining budget |

If there is a **logic bug**, purpose and function **diverge**: the program was meant to exclude items over $6, but it still offers a $7 sandwich. On MCQ and Create PT prompts, when they ask for purpose, answer the *goal*; when they ask how it functions, describe the real input → process → output behavior.`,
        code: `PURPOSE  = "Recommend lunches under $6"   # intention
FUNCTION = what actually runs today

# Bug: budget check uses > instead of >=
# PURPOSE says under $6, but FUNCTION offers a $6.00 item
# -> purpose and function no longer match`,
        codeCaption: "Purpose = intention; function = real behavior (bugs create a gap)",
        examples: [
          {
            caption: "On the exam: name purpose in one sentence, then describe function with I/O",
            code: `PURPOSE:  "Help a student book a 30-min tutoring slot"
FUNCTION: user picks subject + time -> program checks
          availability -> DISPLAYS confirmation or retry`,
          },
        ],
        checkIn: check(
          "A grading app is intended to drop the lowest quiz, but due to a bug it averages all quizzes. Which statement is accurate?",
          [
            "Purpose and function still match because the app runs",
            "Purpose is dropping the lowest quiz; function is averaging all — they differ because of a logic error",
            "Purpose means the programming language used",
            "Function only refers to how fast the app loads",
          ],
          1,
          "Purpose is the intended goal; function is actual behavior. A logic error makes them mismatch even when the program 'runs.'",
        ),
      },
      {
        id: "collab-value",
        kicker: "Collaboration",
        title: "Why collaboration produces better software",
        body: `The AP CSP framework explicitly values **collaboration**: developers with diverse perspectives catch blind spots a single author would miss. Different backgrounds surface edge cases, accessibility needs, and assumptions the original author never questioned.

Effective collaboration is more than "split the work." It relies on shared norms:

| Practice | What it looks like |
| --- | --- |
| Consensus building | The team discusses trade-offs and agrees on a direction |
| Clear communication | Ideas are explained so any teammate can act on them |
| Conflict resolution | Disagreements are resolved with evidence, not volume |
| Inclusive credit | Every contributor's ideas are acknowledged in writing |

On the exam you may be asked why collaboration *reduces bias* or *improves quality*. The answer is almost always: more perspectives reveal more problems earlier, when they are cheap to fix.`,
        checkIn: check(
          "According to the AP CSP framework, what is a key benefit of collaboration during development?",
          [
            "It guarantees the program will run faster at execution time",
            "Diverse perspectives surface problems and edge cases earlier",
            "It removes the need to test the program before release",
            "It lets one expert make every decision without discussion",
          ],
          1,
          "Collaboration brings varied perspectives that catch bias, edge cases, and usability issues a single developer would miss.",
        ),
      },
      {
        id: "personas",
        kicker: "Users first",
        title: "Design around real users and their context",
        body: `A purpose is only meaningful if it is tied to actual people. Before writing code, teams describe the **users**, their goals, and the constraints they operate under (device, connection, accessibility, language).

Worked example — a tutoring-signup tool:
- **User:** a 10th grader with a phone and spotty Wi‑Fi
- **Goal:** book a 30‑minute session in under a minute
- **Constraint:** may be colorblind; must not rely on color alone

That single description already rules out designs that require a fast connection or use red/green as the only status signal. Notice how naming the user *constrains* the solution in a helpful way.`,
        code: `USER       = "10th grader, phone, spotty Wi-Fi"
GOAL       = "book a session in under a minute"
CONSTRAINT = "may be colorblind - not color alone"

# Each fact rules a design IN or OUT:
#   spotty Wi-Fi   -> keep pages tiny, few requests
#   under a minute -> at most 2-3 taps to finish
#   colorblind     -> use text + icon, never color only`,
        codeCaption: "Naming the user constrains the solution (in a helpful way)",
      },
      {
        id: "iterative",
        kicker: "Process",
        title: "The development process is iterative, not linear",
        body: `AP CSP describes development as **iterative and incremental**. You do not design everything, then build everything, then test once. Instead you cycle through phases repeatedly, learning from each pass.

The named phases you should recognize on the exam:
- **Investigating & reflecting** — understand the problem and users
- **Designing** — sketch the interface, data, and behavior
- **Prototyping** — build a small working version
- **Testing** — check it against the purpose and fix issues

Each loop produces something you can react to. A prototype that "feels confusing" teaches you more than three more hours of planning on paper.`,
        code: `LOOP until the artifact meets its purpose:
    INVESTIGATE  →  understand users and requirements
    DESIGN       →  sketch UI, data, and behavior
    PROTOTYPE    →  build a small working slice
    TEST         →  compare to purpose; log what failed
    REFLECT      →  decide the next smallest change`,
        codeCaption: "Pseudocode: the iterative development cycle",
        examples: [
          {
            caption: "One pass through the loop produces something to react to",
            code: `# Pass 1
PROTOTYPE booking on one crowded screen
TEST  -> 2 of 3 testers get lost
REFLECT -> "too much on one screen"

# Pass 2  (smallest next change)
DESIGN  -> split into: pick subject, then pick time
TEST  -> 3 of 3 finish faster`,
            output: "Feedback from pass 1 -> the one change made in pass 2",
          },
        ],
        checkIn: check(
          "A team builds a rough version, watches two users struggle, then redesigns one screen and tries again. This best illustrates which idea?",
          [
            "Development should be fully planned before any code is written",
            "Iterative and incremental development driven by feedback",
            "Programs never need to be tested with real users",
            "The purpose of a program can be ignored during design",
          ],
          1,
          "Building, observing, and revising in cycles is the definition of iterative, incremental development.",
        ),
      },
      {
        id: "requirements",
        kicker: "Specify",
        title: "From purpose to program requirements",
        body: `A **program requirement** is a specific, checkable statement of what the program must do. Vague goals ("make it good") cannot be tested; requirements can.

Turn the tutoring tool's purpose into requirements:
- The user can pick a subject from a list of offered subjects.
- The user can choose an available time slot.
- The program confirms the booking with a visible message (not color alone).
- If no slots exist, the program says so and suggests a next step.

Notice each requirement maps to something you can later *demonstrate* — which is exactly what the Create Performance Task and its written responses ask you to do.`,
        code: `# Vague goal (cannot be tested)
"make the tutoring app good"

# Same goal turned into checkable REQUIREMENTS
[ ] user picks a subject from the offered list
[ ] user chooses an available time slot
[ ] app confirms with a visible message (not color alone)
[ ] if no slots exist, app says so + suggests a next step`,
        codeCaption: "A requirement is checkable; a vague goal is not",
      },
      {
        id: "inputs-outputs",
        kicker: "Behavior",
        title: "Program inputs, events, and outputs",
        body: `Programs transform **inputs** into **outputs**. Inputs can come from a user, a device/sensor, a file, or another program. Outputs can be visual, audible, textual, or a device behavior.

In event-driven programs, an **event** (a click, a key press, a sensor reading) triggers code to run. The booking button's \`onClick\` event might validate the choice, then show a confirmation.

| Element | Tutoring tool example |
| --- | --- |
| Input | Selected subject and time slot |
| Event | User taps "Book session" |
| Process | Check the slot is still available |
| Output | "Booked! See you Tuesday at 4pm." |

Being able to name each element cleanly is what lets you *explain* your program in AP written responses.`,
        code: `ON tap "Book session":          # <- EVENT
    subject <- selectedSubject   # <- INPUT
    slot    <- selectedSlot      # <- INPUT
    IF slotStillAvailable(slot): # <- PROCESS
        DISPLAY "Booked! Tue 4pm" # <- OUTPUT
    ELSE:
        DISPLAY "That slot is gone - pick another"`,
        codeCaption: "Input -> event -> process -> output, all in one handler",
        output: "Booked! Tue 4pm",
        checkIn: check(
          "In an event-driven program, what is an 'event'?",
          [
            "A permanent variable that never changes value",
            "An occurrence — like a click or sensor reading — that triggers code to run",
            "The final output printed to the screen",
            "A comment that documents the program's purpose",
          ],
          1,
          "An event is a trigger (click, key press, sensor input) that causes an associated block of code to execute.",
        ),
      },
      {
        id: "prototyping",
        kicker: "Prototype",
        title: "Prototypes make ideas testable",
        body: `A **prototype** is an early, incomplete version built to learn something specific. It can be a paper sketch, a clickable mockup, or a partial program. The goal is not polish — it is *feedback*.

Good prototypes are scoped to a question: "Can a first-time user find the booking button in under 10 seconds?" You then watch real people attempt the task instead of guessing.

A common beginner mistake is polishing colors and fonts before the core flow works. Test the risky, uncertain part first; decoration is cheap to add later.`,
        code: `# A good prototype is scoped to ONE question
QUESTION = "Can a first-timer find 'Book' in < 10s?"

# Build only what answers it:
screen = [ subject_list, time_list, BIG "Book" button ]
# skip: colors, fonts, animations (cheap to add later)

# Then watch real people try - don't guess`,
        codeCaption: "Scope a prototype to the one risky question you must answer",
      },
      {
        id: "collab-tools",
        kicker: "Coordinate",
        title: "Coordinating work: version history and shared docs",
        body: `Teams need a way to combine work without overwriting each other. Shared documents, comment threads, and **version history** let contributors see what changed, when, and by whom — and roll back mistakes.

This matters for the exam's emphasis on **acknowledging contributions**: a program's documentation should credit collaborators and outside sources of code or ideas. Using someone's code without credit is both an academic-integrity issue and, later, a legal one (covered in Lesson 14).`,
        checkIn: check(
          "Why do development teams rely on version history?",
          [
            "It makes the compiled program smaller",
            "It records what changed and lets the team recover earlier versions",
            "It replaces the need to define a program's purpose",
            "It automatically writes all of the program's code",
          ],
          1,
          "Version history tracks changes and authorship and allows a team to roll back to a working state.",
        ),
      },
      {
        id: "reflection-log",
        kicker: "Document",
        title: "Reflecting: keep a development log",
        body: `Reflection is a named phase because the exam expects you to *describe* how your program developed. A short development log — "we tried X, it confused users, so we switched to Y" — becomes the raw material for strong written responses.

On the AP exam you may be asked which activity best supports reflection. The answer emphasizes reviewing feedback and revising the plan, not simply adding more features.`,
      },
      {
        id: "worked-scenario",
        kicker: "Worked example",
        title: "One idea, two iterations",
        body: `**Iteration 1** of the tutoring tool shows every subject and every tutor on one crowded screen. Testers get lost.

**Iteration 2** splits the flow: pick a subject, *then* see only that subject's open slots. Testers finish faster. The change was driven by evidence from testing, not opinion.

The lesson: the second version is better not because it has more code, but because a feedback loop removed a real obstacle. This is the mindset AP CSP rewards.`,
        examples: [
          {
            caption: "Iteration 1 - everything on one screen (testers get lost)",
            code: `SHOW every subject AND every tutor AND every slot
# 40+ options at once -> testers scroll, hesitate, quit`,
            output: "2 of 3 testers could not finish",
          },
          {
            caption: "Iteration 2 - split the flow (evidence-driven change)",
            code: `STEP 1: pick a subject
STEP 2: show ONLY that subject's open slots
# fewer choices per screen -> faster decisions`,
            output: "3 of 3 testers finished (better, not bigger)",
          },
        ],
        callout: {
          label: "On the AP exam",
          text: "Expect questions that reward *evidence-driven* revision. The best answer usually cites user feedback or testing results as the reason a design changed.",
        },
      },
      {
        id: "misconceptions",
        kicker: "Avoid traps",
        title: "Common misconceptions to unlearn",
        body: `Three ideas the exam loves to test as distractors:

1. "More features = better program." False — features that don't serve the purpose add confusion and bugs.
2. "Design is finished before coding starts." False — design and building interleave through iteration.
3. "Collaboration slows teams down." Often the opposite — early feedback prevents expensive late rework.

Being able to spot these as wrong answers is worth real points.`,
        checkIn: check(
          "Which statement reflects sound Creative Development thinking?",
          [
            "Add as many features as possible so the program looks impressive",
            "Choose changes that serve the program's stated purpose and users",
            "Finish all design on paper before ever testing with people",
            "Avoid documenting who contributed which ideas",
          ],
          1,
          "Purpose- and user-driven decisions define good creative development; more features is not automatically better.",
        ),
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "Bringing it together",
        body: `A premier creative-development process names a **purpose**, describes real **users**, sets checkable **requirements**, and improves through **collaboration** and **iteration** backed by feedback.

You now have the vocabulary the AP exam uses to reason about how programs come to exist. In the next lesson you'll formalize the development process itself — testing strategies, documentation, and handling errors.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Defend one design decision",
        body: `Pick any app you use. State its purpose in one sentence, name one user group, and describe one change you would test to better serve that group. Explain how you would know the change worked.`,
      },
    ],
  },
  bigIdeas: [
    "**A program exists to fulfill a purpose** — solve a problem, express an idea, or entertain — and every design choice should trace back to it.",
    "Collaboration brings diverse perspectives that reduce bias and surface problems earlier, when they are cheap to fix.",
    "Development is **iterative and incremental**: investigate, design, prototype, test, reflect — repeatedly.",
    "Requirements and reflection logs turn fuzzy goals into checkable, explainable design decisions.",
  ],
  keyTerms: [
    { term: "Purpose", definition: "The reason a program is created — to solve a problem, express an idea, or entertain." },
    { term: "Program requirement", definition: "A specific, checkable statement of what a program must do." },
    { term: "Iterative development", definition: "Repeatedly cycling through design, build, and test phases, improving each pass." },
    { term: "Prototype", definition: "An early, incomplete version built to gather feedback on a specific question." },
    { term: "Event", definition: "An occurrence, such as a click or sensor reading, that triggers code to run." },
    { term: "Collaboration", definition: "Working with others using shared norms so diverse perspectives improve the artifact." },
  ],
  realWorld:
    "Product teams at real companies ship rough prototypes to a handful of users before building the full feature — the same iterative, feedback-driven loop AP CSP asks you to describe.",
  quiz: [
    {
      id: "q1",
      question: "What does the AP CSP framework mean by a program's 'purpose'?",
      choices: [
            "The programming language it is written in” belongs to a different situation than the one in the question stem",
            "The reason it is created — to solve a problem, express an idea, or entertain",
            "The number of lines of code it contains” belongs to a different situation than the one in the question stem",
            "The device it runs on” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation: "Purpose is the reason the artifact exists; every design decision should support it.",
    },
    {
      id: "q2",
      question: "A team includes members with different backgrounds and abilities. Why does the framework value this for reducing bias?",
      choices: [
            "It makes the code compile faster” belongs to a different situation than the one in the question stem",
            "It guarantees the program has no bugs” belongs to a different situation than the one in the question stem",
            "It removes the need for testing” belongs to a different situation than the one in the question stem",
            "More perspectives reveal assumptions and edge cases a single author would miss",
          ],
      correctIndex: 3,
      explanation: "Diverse perspectives expose blind spots and reduce bias early in development.",
    },
    {
      id: "q3",
      question: "Which best describes incremental and iterative development?",
      choices: [
            "Writing the entire program once, then never changing it” belongs to a different situation than the one in the question stem",
            "Building small pieces and repeatedly testing and revising based on feedback",
            "Adding as many features as possible before release” belongs to a different situation than the one in the question stem",
            "Designing on paper without ever building a prototype” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation: "Iterative development builds in small steps and revises using feedback from each pass.",
    },
    {
      id: "q4",
      question: "A program responds when a user taps a button. The tap is best described as a(n):",
      choices: ["output", "event", "requirement", "prototype"],
      correctIndex: 1,
      explanation: "A tap is an event — a trigger that causes associated code to run.",
    },
    {
      id: "q5",
      question: "Which is a well-formed program requirement?",
      choices: [
            "Make the program impressive to judges” belongs to a different situation than the one in the question stem",
            "The app should be really good and fun” belongs to a different situation than the one in the question stem",
            "The app should use the newest colors” belongs to a different situation than the one in the question stem",
            "The user can select a subject from the list of offered subjects",
          ],
      correctIndex: 3,
      explanation: "A requirement is specific and checkable; the others are vague and untestable.",
    },
    {
      id: "q6",
      question: "What is the main reason to build a prototype early?",
      choices: [
            "To guarantee the final program has no errors” belongs to a different situation than the one in the question stem",
            "To avoid ever having to talk to users” belongs to a different situation than the one in the question stem",
            "To finalize the color scheme before anything else” belongs to a different situation than the one in the question stem",
            "To gather feedback on a specific question before investing in full development",
          ],
      correctIndex: 3,
      explanation: "Prototypes exist to learn something specific through feedback, not to be polished.",
    },
    {
      id: "q7",
      question: "During development, why does a team keep a version history?",
      choices: [
            "To replace the program's documentation entirely” belongs to a different situation than the one in the question stem",
            "To make the program run without inputs” belongs to a different situation than the one in the question stem",
            "To track changes and authorship and recover earlier working versions",
            "To hide who contributed to the project” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation: "Version history records what changed, by whom, and enables rollback.",
    },
    {
      id: "q8",
      question: "A team removes a feature after testers found it confusing, even though it took effort to build. This decision is best justified by:",
      choices: [
            "Sunk-cost reasoning — keep it because it was hard to make",
            "Evidence from testing showing it did not serve the purpose or users",
            "The belief that more features always make a program better",
            "A preference for finishing all design before testing” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation: "Evidence-driven revision — removing what testing shows is unhelpful — is the AP-valued choice.",
    },
  ],
  reflection: {
    prompt:
      "On the AP exam and Create PT, you must describe how collaboration and iteration shaped your program. Describe one program idea, its purpose and users, and one change you would make after a round of testing — and how you'd know it helped.",
    placeholder: "Purpose, users, the tested change, and your evidence of success…",
  },
};
