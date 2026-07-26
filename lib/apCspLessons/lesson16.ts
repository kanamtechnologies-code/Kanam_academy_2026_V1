import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson16: AILessonConfig = {
  id: "csp-16",
  title: "16. AP-Style Practice Gauntlet & Exam Readiness",
  goal: "Consolidate all five Big Ideas, practice mixed AP-style questions (including RANDOM and Create PT prompts), and build a confident exam-day strategy.",
  xpReward: 800,
  badge: "CSP Exam Ready",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/15",
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Capstone",
        title: "Everything, at once",
        body: `The AP exam mixes all **five** Big Ideas across the multiple-choice section, plus Create PT written-response prompts about *your* program. This capstone reviews the highest-yield ideas, drills mixed AP-style reasoning, and gives you a concrete exam-day plan. Kanam prepares you; the real exam is administered by the College Board.

Treat every check-in and quiz item here as timed practice: read carefully, eliminate distractors, and justify your answer in one sentence before selecting.`,
      },
      {
        id: "exam-format",
        kicker: "Know the test",
        title: "The exam structure",
        body: `The AP CSP score combines two weighted parts (confirm for your exam year):
- **Section I — Multiple choice (~70%):** about 70 questions in ~2 hours (Bluebook), covering all five Big Ideas. College Board **pseudocode** appears — not Python alone.
- **Section II — Create PT + written response (~30%):** you submit program code, a video, and a **Personalized Project Reference** before the exam; on exam day you answer written prompts about *your* code while using that PPR.

Some MCQ items are **single-select** and a few are **multiple-select** (choose two). Multiple-select items say how many to pick — read that instruction carefully.`,
        code: `AP CSP SCORE (confirm for your year)
  Section I  Multiple choice   ~70%  (~70 Qs, ~2 hrs)
             all 5 Big Ideas; uses College Board pseudocode
  Section II Create PT         ~30%  (program+video+PPR,
             submitted before exam; written responses on exam day)`,
        codeCaption: "Exam = ~70% multiple choice + ~30% Create PT",
        checkIn: check(
          "On a multiple-select AP CSP question that says 'Select two answers,' the best strategy is to:",
          [
            "Pick only the single best answer",
            "Read the instruction and select exactly the number requested",
            "Always select all options",
            "Skip it automatically",
          ],
          1,
          "Multiple-select items require exactly the stated number of correct choices — follow the instruction.",
        ),
      },
      {
        id: "review-map",
        kicker: "Quick map",
        title: "Big Idea weightings recap",
        body: `Spend study time roughly in proportion to exam weight:

| Big Idea | Approx. MCQ weight |
| --- | --- |
| 1 Creative Development | 10–13% |
| 2 Data | 17–22% |
| 3 Algorithms & Programming | 30–35% |
| 4 Computing Systems & Networks | 11–15% |
| 5 Impact of Computing | 21–26% |

Big Ideas 3 and 5 together are over half the exam — prioritize programming logic and balanced impact analysis.`,
        code: `MCQ weight (study in proportion)
  BI 3 Algorithms/Programming  ####### 30-35%
  BI 5 Impact                  ##### 21-26%
  BI 2 Data                    #### 17-22%
  BI 4 Systems/Networks        ### 11-15%
  BI 1 Creative Development    ## 10-13%
# BI 3 + BI 5 = over HALF the exam`,
        codeCaption: "Study by weight: BI 3 and BI 5 dominate the exam",
      },
      {
        id: "drill-crd",
        kicker: "Drill · BI 1",
        title: "Creative Development under pressure",
        body: `Quick hits that show up every year:

- **Collaboration** improves quality / reduces bias via diverse perspectives — not because it makes code run faster.
- **Purpose ≠ function** when bugs exist.
- **Iterative development** finds problems earlier than a single big-bang build.
- **Testing** can find errors; it cannot prove there are none.`,
        code: `TRAP: "They collaborated, so the program is guaranteed correct."
FIX:  Collaboration helps catch issues earlier — it does not guarantee correctness.

TRAP: "40 tests passed, so zero bugs remain."
FIX:  Tests raise confidence for tested cases only.`,
        codeCaption: "BI 1 traps: collaboration ≠ correctness; tests ≠ proof",
        examples: [
          {
            caption: "Purpose vs function in one line",
            code: `PURPOSE: drop lowest quiz before averaging
FUNCTION (buggy): averages all quizzes
-> intention and behavior diverge`,
          },
        ],
      },
      {
        id: "drill-programming",
        kicker: "Drill · BI 3",
        title: "Programming reasoning under pressure",
        body: `Trace carefully — don't eyeball. For loops, count iterations; for conditionals, find the first true branch; for lists, mind 1- vs 0-indexing.`,
        code: `a <- [4, 8, 15, 16, 23]
total <- 0
FOR EACH x IN a:
    IF (x MOD 2 = 0):        # even?
        total <- total + x
DISPLAY total

# add only evens: 4 + 8 + 16 = 28 (skip 15, 23)`,
        codeCaption: "Trace by writing the running total each pass, don't eyeball",
        output: "28",
        examples: [
          {
            caption: "The same trace in real code",
            code: `a = [4, 8, 15, 16, 23]
total = 0
for x in a:
    if x % 2 == 0:
        total += x
print(total)`,
            output: "28",
          },
        ],
        checkIn: check(
          "Using the code above but summing ODD values instead of even, what would DISPLAY show?",
          ["28", "38", "43", "66"],
          1,
          "Odd values are 15 and 23 → 15 + 23 = 38.",
        ),
      },
      {
        id: "drill-data",
        kicker: "Drill · BI 2",
        title: "Data and representation",
        body: `Blend bits, compression, and bias reasoning:
- \`n\` bits → 2ⁿ values (smallest power of two that fits).
- Lossless for exactness (text/code); lossy for smaller media.
- Correlation ≠ causation; check for sampling bias.

Quick self-test: how many bits for 1,000 unique values? 2⁹ = 512 (too few), 2¹⁰ = 1024 → **10 bits**.`,
        code: `BITS      2^n = values  (smallest that fits the count)
LOSSLESS  exact -> text, code
LOSSY     smaller -> photos, streaming
BIAS      correlation != causation; check the sample

# 1000 values? 2^9=512 too few, 2^10=1024 -> 10 bits`,
        codeCaption: "BI 2 rapid recall: bits, lossless/lossy, bias",
        output: "1000 values -> 10 bits",
        checkIn: check(
          "A system needs unique binary codes for 300 items. Minimum bits?",
          ["8", "9", "10", "16"],
          1,
          "2⁸ = 256 (too few), 2⁹ = 512 (≥ 300) → 9 bits.",
        ),
      },
      {
        id: "drill-networks",
        kicker: "Drill · BI 4",
        title: "Systems and networks",
        body: `Fast recall targets:
- **Packets** route independently → fault tolerance; **redundancy** removes single points of failure.
- **DNS** = name→IP; **TCP** = reliable/ordered; **IP** = addressing; **HTTPS** = HTTP + encryption.
- **Bandwidth** = capacity; **latency** = delay. Parallel **speedup** = sequential ÷ parallel.

If a scenario mentions rerouting around a failure, the concept is fault tolerance via redundant paths.`,
        code: `DNS    name -> IP
TCP    reliable, in order (resend losses)
IP     addressing / routing
HTTPS  HTTP + encryption
bandwidth = capacity   latency = delay
speedup = sequential_time / parallel_time`,
        codeCaption: "BI 4 rapid recall: protocols, bandwidth vs latency, speedup",
      },
      {
        id: "drill-impact",
        kicker: "Drill · BI 5",
        title: "Impact and ethics reasoning",
        body: `The exam rewards **balance and specificity**:
- Name a **benefit** and a **harm** (often unintended) of an innovation.
- Recognize the **digital divide** (unequal access) and **algorithmic bias** (biased data/design).
- Apply IP/licensing (assume copyrighted; credit CC/open-source) and privacy (PII, digital footprint) rules.

Distractors here are usually one-sided ("purely good"/"purely bad") — the balanced option is typically correct.`,
        code: `impact question -> pick the BALANCED answer
  "purely good"   <- distractor
  "purely bad"    <- distractor
  "benefit AND harm / unintended effects"  <- usually right
# name a benefit, a harm, and who is affected`,
        codeCaption: "BI 5: the balanced 'benefit + harm' option usually wins",
        callout: {
          label: "On the AP exam",
          text: "For impact questions, prefer the answer that names both a benefit and a harm, or that acknowledges unintended effects — extreme one-sided options are usually distractors.",
        },
        checkIn: check(
          "An AI tutoring app helps many students but performs worse for those speaking less-common languages. The best exam answer is that it:",
          [
            "Is purely beneficial",
            "Has a clear benefit but also risks inequity/bias, so effects are mixed",
            "Should be banned entirely",
            "Only affects bandwidth",
          ],
          1,
          "Balanced, specific analysis naming both benefit and harm (bias/equity) is the AP-preferred response.",
        ),
      },
      {
        id: "strategy",
        kicker: "Exam strategy",
        title: "Test-taking tactics",
        body: `Points-earning habits under time pressure:
- **Read the full question and all choices** before answering — CSP distractors are close.
- **Eliminate** obviously wrong options to improve odds.
- For code, **trace with pencil**, tracking each variable.
- **Watch qualifiers**: "always," "never," "best," "most likely."
- **Flag and move on** if stuck; there's no penalty for guessing, so **answer every question**.
- For multiple-select, confirm you chose the **stated number**.`,
        code: `EXAM TACTICS
  [ ] read the whole stem + all choices first
  [ ] eliminate obvious wrong answers
  [ ] trace code with pencil, track each variable
  [ ] watch qualifiers: always / never / best / most likely
  [ ] no guessing penalty -> answer EVERY question
  [ ] multiple-select? pick exactly the number asked`,
        codeCaption: "Test-day tactics checklist to bank easy points",
        checkIn: check(
          "You're unsure of a question with 30 seconds left and no penalty for guessing. You should:",
          [
            "Leave it blank",
            "Eliminate what you can and select an answer — never leave blanks when guessing is free",
            "Change all your other answers",
            "Select two answers on a single-select item",
          ],
          1,
          "With no guessing penalty, always answer; eliminate distractors to raise your odds.",
        ),
      },
      {
        id: "readiness-plan",
        kicker: "Plan",
        title: "Your final readiness checklist",
        body: `Before exam day:
- **Create PT** program, video, and **PPR** submitted through College Board / Digital Portfolio deadlines (Lesson 15).
- Practiced **written responses** that cite your own procedure and list clearly.
- Comfortable **tracing** loops, conditionals, and list operations.
- Fluent with **AP pseudocode** (and block references if used in prep materials).
- Can classify **efficiency** and pick search strategies (L10).
- Can give **balanced impact** analyses and apply IP/privacy/security rules.
- Logistics ready: know your exam date, Bluebook setup, and allowed materials.

Confirm all requirements against the **current official College Board CSP documentation**, which is updated periodically.`,
        code: `EXAM-DAY READINESS
  [ ] Create PT + video + PPR submitted (deadlines!)
  [ ] can trace loops, conditionals, list ops
  [ ] fluent in AP pseudocode
  [ ] can classify efficiency + pick search strategy
  [ ] balanced impact + IP/privacy/security rules
  [ ] logistics: date, Bluebook, allowed materials`,
        codeCaption: "Final readiness checklist - tick every box before exam day",
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "A mixed question, dissected",
        body: `*"A company splits a 60-second video task across 4 processors and it finishes in 20 seconds. Which statements are supported?"*

Reason: speedup = 60 ÷ 20 = **3** (not 4 — overhead/sequential parts). So "the speedup is 3" is supported; "parallelism gave a perfect 4× speedup" is **not**. This blends BI 4 (parallelism) with careful arithmetic — exactly the multi-concept style to expect.`,
        code: `sequential = 60s   parallel = 20s   processors = 4
speedup = sequential / parallel = 60 / 20 = 3

SUPPORTED:     "speedup is 3"
NOT SUPPORTED: "perfect 4x speedup"  (overhead/sequential parts)`,
        codeCaption: "Speedup = seq / parallel - it rarely equals the processor count",
        output: "speedup = 3 (not 4)",
      },
      {
        id: "synthesis",
        kicker: "You're ready",
        title: "Go earn it",
        body: `You've built the full toolkit: create and analyze programs, reason about data and efficiency, trace networks and systems, and evaluate computing's impact ethically. You know the exam's structure, weightings, and tactics.

Kanam Academy has prepared you — now register, review your weak spots one more time, and walk in confident. You've got this.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Name your last review targets",
        body: `List the two Big Ideas or skills you feel least confident about and one specific action (trace 5 loops, review binary conversion, practice impact paragraphs) you'll take for each before exam day.`,
      },
    ],
  },
  bigIdeas: [
    "The AP score combines **Create PT + written response (~30%)** and a **multiple-choice exam (~70%)** covering all five Big Ideas.",
    "Big Ideas **3 (Algorithms/Programming)** and **5 (Impact)** are over half the exam — prioritize them.",
    "Trace code deliberately, mind indexing and iteration counts, and watch for multiple-select instructions.",
    "There's no penalty for guessing — eliminate distractors and **answer every question**.",
  ],
  keyTerms: [
    { term: "Multiple-select item", definition: "A question requiring you to choose a specified number of correct answers." },
    { term: "Big Idea weighting", definition: "The approximate share of the MCQ exam devoted to each Big Idea." },
    { term: "Tracing", definition: "Predicting a program's output by tracking variable values step by step." },
    { term: "Speedup", definition: "Sequential run time divided by parallel run time." },
    { term: "Distractor", definition: "An incorrect answer choice designed to look plausible." },
    { term: "Exam readiness", definition: "Being prepared in content, skills, and logistics for the AP exam." },
  ],
  realWorld:
    "The mixed reasoning here mirrors real technical work: you rarely use one idea at a time — you combine data, algorithms, systems, and ethics to make a sound decision.",
  quiz: [
    {
      id: "q1",
      question: "The AP CSP end-of-course exam is worth roughly what share of the total score?",
      choices: ["30%", "50%", "70%", "100%"],
      correctIndex: 2,
      explanation: "The multiple-choice exam is about 70%; the Create PT is about 30%.",
    },
    {
      id: "q2",
      question: "a ← [3,6,9,12]; total ← 0; FOR EACH x IN a: IF x MOD 3 = 0: total ← total + 1. What is total?",
      choices: ["1", "2", "3", "4"],
      correctIndex: 3,
      explanation: "All four values are divisible by 3, so total counts to 4.",
    },
    {
      id: "q3",
      question: "A task runs in 48 seconds sequentially and 12 seconds in parallel. The speedup is:",
      choices: ["3", "4", "6", "12"],
      correctIndex: 1,
      explanation: "48 ÷ 12 = 4.",
    },
    {
      id: "q4",
      question: "Minimum bits to give unique codes to 1,000 items:",
      choices: ["8", "9", "10", "16"],
      correctIndex: 2,
      explanation: "2⁹ = 512 (too few), 2¹⁰ = 1024 (≥ 1000) → 10 bits.",
    },
    {
      id: "q5",
      question: "Which protocol adds encryption to protect web data in transit?",
      choices: ["HTTP", "HTTPS", "DNS", "IP"],
      correctIndex: 1,
      explanation: "HTTPS is HTTP plus encryption.",
    },
    {
      id: "q6",
      question: "For an impact question, the answer most likely to be correct:",
      choices: [
            "Names both a benefit and a harm, acknowledging mixed/unintended effects",
            "Ignores who is affected” belongs to a different situation than the one in the question stem",
            "Says it is purely bad” belongs to a different situation than the one in the question stem",
            "Says the innovation is purely good” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation: "Balanced, specific analysis is the AP-preferred choice; one-sided options are distractors.",
    },
    {
      id: "q7",
      question: "Binary search of 1,024 sorted items takes at most about how many steps?",
      choices: ["1024", "512", "10", "2"],
      correctIndex: 2,
      explanation: "log₂(1024) = 10, so about 10 comparisons.",
    },
    {
      id: "q8",
      question: "With 20 seconds left, unsure, and no penalty for guessing, you should:",
      choices: [
            "Leave the question blank” belongs to a different situation than the one in the question stem",
            "Erase previous answers” belongs to a different situation than the one in the question stem",
            "Select every option” belongs to a different situation than the one in the question stem",
            "Eliminate distractors and select an answer",
          ],
      correctIndex: 3,
      explanation: "Always answer when guessing is free; elimination improves your odds.",
    },
    {
      id: "q9",
      question: "On the AP Reference Sheet, how many distinct integer values can RANDOM(3, 8) return?",
      choices: ["5", "6", "8", "3"],
      correctIndex: 1,
      explanation: "RANDOM(a, b) is inclusive of both ends: 3,4,5,6,7,8 is 6 values (8 − 3 + 1).",
    },
    {
      id: "q10",
      question: "A Create PT student-developed procedure earns the most credit when it:",
      choices: [
            "Is as short as possible with no parameters” belongs to a different situation than the one in the question stem",
            "Only displays a fixed message” belongs to a different situation than the one in the question stem",
            "“Avoids using any list” describes a different situation than the one in the question stem",
            "Has a parameter that affects its behavior and includes both selection and iteration",
          ],
      correctIndex: 3,
      explanation: "The rubric rewards a procedure whose parameter changes behavior and that contains selection and iteration.",
    },
  ],
  reflection: {
    prompt:
      "Build your exam-day plan: name your two weakest Big Ideas, the specific practice you'll do for each, and one test-taking tactic (tracing, elimination, guessing) you'll rely on. Remember you still register for and take the official College Board exam.",
    placeholder: "Weak areas, targeted practice, and your go-to exam tactic…",
  },
};
