import type { AIBonusActivity } from "@/components/ai/AILessonCanvas";

export const AP_CSP_INTERACTIVE_BY_LESSON: Record<string, AIBonusActivity[]> = {
  "csp-1": [
    {
      id: "csp1-order",
      kind: "order",
      title: "Iterative design under pressure",
      prompt:
        "An AP CSP team must ship a working prototype by Friday. Put the creative-development cycle in the order that actually reduces late rework — not the order that feels fastest.",
      items: [
        { id: "purpose", label: "Clarify purpose, users, and success criteria before coding" },
        { id: "plan", label: "Decompose features; assign roles; draft an incremental plan" },
        { id: "build", label: "Implement a thin vertical slice that proves the core behavior" },
        { id: "test", label: "Test against criteria; log failures with steps to reproduce" },
        { id: "refine", label: "Revise design/code from evidence, then repeat the next slice" },
      ],
      itemExplanations: [
        "Purpose first prevents building polished features that miss the user need — a classic Create PT / collaboration failure mode.",
        "Planning after purpose turns goals into checkable chunks and clear ownership; coding first usually creates merge chaos.",
        "A thin working slice proves the idea early; finishing UI chrome before core logic hides whether the program actually works.",
        "Testing against written criteria turns opinions into evidence; without logs, teammates cannot fix what they cannot reproduce.",
        "Revision based on evidence is the iterative loop — redesign without retesting just relocates the same bugs.",
      ],
    },
    {
      id: "csp1-debug",
      kind: "debug",
      title: "Collaboration misconception",
      prompt:
        "This study-guide claim shows up constantly in weak AP CSP free-response thinking. Spot the real error.",
      contentLabel: "Buggy claim",
      buggyContent:
        '"On a collaborative project, each person should work in isolation until the deadline, then paste everything together. Documentation is optional because the code is self-explanatory. Feedback only matters after the final version ships."',
      choices: [
        "Effective collaboration needs shared goals, early integration, ongoing feedback, and documentation of decisions — not last-minute glue",
        "Isolation is required by College Board so each student gets unique credit",
        "Documentation is banned because it counts as outside help",
        "Feedback after shipping is the only feedback College Board recognizes",
      ],
      correctIndex: 0,
      hint: "Creative Development rewards iteration and communication, not silent silos.",
      explanation:
        "AP CSP Creative Development expects purposeful collaboration: shared purpose, incremental integration, testing, and documentation. Waiting until the end to combine work is a high-risk process failure, not a best practice.",
    },
    {
      id: "csp1-scenario",
      kind: "scenario",
      title: "Scope vs. polish trap",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Your team has 90 minutes left. The program almost meets the stated purpose, but animations are unfinished and one edge-case test fails. What should you prioritize?",
          choices: [
            {
              id: "fix-core",
              label: "Fix the failing edge case that breaks the stated purpose, then cut nonessential polish",
              nextId: "fix-ok",
              tone: "best",
              feedback:
                "Purpose and correctness beat cosmetic polish on timed collaborative work and Create PT evidence.",
            },
            {
              id: "polish",
              label: "Finish all animations first so the demo 'looks AP-ready'",
              nextId: "polish-end",
              tone: "risky",
              feedback:
                "A flashy demo that still fails a core case does not prove purpose. Exam scorers and teammates care about function.",
            },
            {
              id: "rewrite",
              label: "Rewrite the whole architecture from scratch in the remaining time",
              nextId: "rewrite-end",
              tone: "risky",
              feedback:
                "A late full rewrite usually destroys working evidence. Iterate on the thin slice you already have.",
            },
          ],
        },
        {
          id: "fix-ok",
          prompt:
            "The edge case is fixed. A teammate wants to add a brand-new feature that was never in the purpose statement. Best call?",
          choices: [
            {
              id: "defer",
              label: "Defer it; document as future work; re-test the existing criteria",
              nextId: "success",
              tone: "best",
              feedback:
                "Scope control protects reliability. New features late create untested paths.",
            },
            {
              id: "add",
              label: "Add it immediately without updating tests or purpose",
              nextId: "add-end",
              tone: "risky",
              feedback:
                "Unplanned features without retesting invite regressions and muddy your purpose narrative.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Purpose-first iteration",
            body: "You protected the program's purpose, used evidence from tests, and avoided late scope creep — the Creative Development habit AP CSP rewards.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "polish-end",
          ending: {
            title: "Polish over purpose",
            body: "Looking finished is not the same as meeting purpose. On the exam and Create PT, broken core behavior is the expensive mistake.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "rewrite-end",
          ending: {
            title: "Late rewrite crash",
            body: "Full rewrites near a deadline erase working increments. Iterate, test, and document instead.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "add-end",
          ending: {
            title: "Uncontrolled scope",
            body: "New features without updating purpose and tests weaken both product quality and your written story of intentional design.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "csp-2": [
    {
      id: "csp2-parsons",
      kind: "parsons",
      title: "Test-then-document loop",
      prompt:
        "A program 'works on my machine' but fails for a peer. Order the debugging/documentation steps that produce AP-quality evidence of testing.",
      languageLabel: "process",
      lines: [
        "Reproduce the failure with exact inputs and environment notes",
        "Isolate the smallest step where expected ≠ actual output",
        "Form a hypothesis and change one likely cause",
        "Re-run the same failing case plus nearby edge cases",
        "Record what was tried, what changed, and remaining risks",
      ],
      lineExplanations: [
        "Reproduction first turns a vague complaint into a checkable bug. Without it, you are guessing.",
        "Isolating the mismatch localizes the fault; changing many things at once hides the real cause.",
        "One-change hypotheses make cause-and-effect visible — required for trustworthy debugging claims.",
        "Re-testing the original case and neighbors prevents 'fixed one path, broke another'.",
        "Documentation last captures evidence for collaboration and Create PT written responses.",
      ],
      explanation:
        "Strong AP CSP testing is reproducible, incremental, and documented. 'It worked once' is not evidence.",
    },
    {
      id: "csp2-debug",
      kind: "debug",
      title: "Purpose vs. implementation trap",
      prompt: "Find the flaw in this Create-PT-style reflection.",
      contentLabel: "Buggy reflection",
      buggyContent:
        '"My program\'s purpose is that I used nested if statements and a for loop. Those constructs prove the project is complete because College Board mainly grades syntax variety."',
      choices: [
        "Purpose is the user-facing goal/problem solved; constructs are implementation — syntax variety alone does not define purpose",
        "Purpose must always be written as a list of Python keywords",
        "Nested ifs automatically satisfy every Create PT requirement",
        "College Board only scores font choice in screenshots",
      ],
      correctIndex: 0,
      hint: "Purpose answers why the program exists for a user — not which keywords you typed.",
      explanation:
        "AP CSP separates purpose (problem/opportunity for users) from implementation details. Listing constructs without a clear user goal is a common Create PT miss.",
    },
    {
      id: "csp2-match",
      kind: "match",
      title: "Design artifact match",
      prompt:
        "Match each Creative Development artifact to the exam-prep role it actually plays.",
      pairs: [
        {
          id: "purpose",
          left: "Purpose statement",
          right: "Names the user need and what success looks like",
        },
        {
          id: "prototype",
          left: "Incremental prototype",
          right: "Proves a thin slice of behavior early for feedback",
        },
        {
          id: "testlog",
          left: "Test log",
          right: "Records inputs, expected vs actual, and outcomes",
        },
        {
          id: "changelog",
          left: "Design revision note",
          right: "Explains what changed after testing or feedback",
        },
        {
          id: "roles",
          left: "Collaboration plan",
          right: "Assigns responsibilities and integration checkpoints",
        },
      ],
    },
  ],

  "csp-3": [
    {
      id: "csp3-order",
      kind: "order",
      title: "From bits to meaning",
      prompt:
        "Put these layers in order from lowest-level representation to human-meaningful interpretation — a frequent AP Data abstraction sequence.",
      items: [
        { id: "bits", label: "Bits stored as physical states (on/off, high/low)" },
        { id: "binary", label: "Binary sequences grouped as bytes / words" },
        { id: "encoding", label: "Encoding rules map bit patterns to numbers, text, or pixels" },
        { id: "data", label: "Structured data (records, tables, files) built from encoded values" },
        { id: "insight", label: "Analysis / visualization produces insight for a decision" },
      ],
      itemExplanations: [
        "Physical bit states are the foundation — everything digital ultimately rests here.",
        "Grouping bits into bytes/words is still raw representation, not yet meaning.",
        "Encoding (ASCII/Unicode, RGB, two's complement, etc.) is the contract that gives patterns meaning.",
        "Structured collections organize encoded values so programs can process them at scale.",
        "Insight is the highest abstraction: human decisions from analyzed data, not the bits themselves.",
      ],
    },
    {
      id: "csp3-debug",
      kind: "debug",
      title: "Binary ↔ decimal trap",
      prompt:
        "This MCQ-style explanation contains a classic AP CSP arithmetic mistake. Find it.",
      contentLabel: "Buggy solution",
      buggyContent:
        '"The binary number 1011 equals 1+0+1+1 = 3 in decimal because you add the digits. Also, 8 bits can represent exactly 8 different values."',
      choices: [
        "Binary place values are powers of 2 (1011₂ = 11₁₀), and n bits represent 2ⁿ distinct values (8 bits → 256), not 'sum the digits' or 'n values'",
        "Binary digits are always added, so 1011 really is 3",
        "8 bits always means exactly 8 values because each bit is one value",
        "Decimal and binary are identical number systems, so conversion is unnecessary",
      ],
      correctIndex: 0,
      hint: "Place value, not digit-sum. Capacity is 2 to the power of bit-count.",
      explanation:
        "AP CSP hammers place value: 1011₂ = 8+0+2+1 = 11₁₀. With n bits you get 2ⁿ patterns (0 through 2ⁿ−1 for unsigned). Digit-sum and 'n bits → n values' are high-frequency distractors.",
    },
    {
      id: "csp3-predict",
      kind: "predict",
      title: "Overflow prediction",
      prompt:
        "Predict the largest unsigned integer value that can be stored in 4 bits. Answer in decimal.",
      scenario:
        "Unsigned integers only.\nBit width: 4.\nPatterns run from 0000 to 1111.\nWhat is the maximum representable value?",
      acceptedAnswers: ["15", "fifteen", "2^4 - 1", "2^4-1"],
      explanation:
        "4 bits → 2⁴ = 16 patterns (0–15). Max value is 2ⁿ − 1 = 15. A common trap is answering 16 (count of patterns) or 4 (bit count).",
      placeholder: "Largest value?",
    },
  ],

  "csp-4": [
    {
      id: "csp4-match",
      kind: "match",
      title: "Compression & data concepts",
      prompt:
        "Match each Data concept to the precise AP CSP meaning — watch for lossy/lossless and metadata traps.",
      pairs: [
        {
          id: "lossy",
          left: "Lossy compression",
          right: "Reduces size by discarding some information; original cannot be perfectly restored",
        },
        {
          id: "lossless",
          left: "Lossless compression",
          right: "Reduces size using patterns/redundancy; original can be perfectly restored",
        },
        {
          id: "meta",
          left: "Metadata",
          right: "Data about data (timestamp, author, GPS, file type) — not the primary content itself",
        },
        {
          id: "bias",
          left: "Bias in datasets",
          right: "Systematic skew from collection/labeling that can distort conclusions or models",
        },
        {
          id: "abstraction",
          left: "Data abstraction",
          right: "Hiding bit-level detail behind higher-level representations (numbers, images, tables)",
        },
      ],
    },
    {
      id: "csp4-debug",
      kind: "debug",
      title: "Lossy vs lossless myth",
      prompt: "Spot the error in this 'always true' compression tip.",
      contentLabel: "Buggy tip",
      buggyContent:
        '"JPEG is always better than PNG for every file because lossy compression keeps every original bit. Lossless compression permanently deletes data, so scientists should never use it for measurements."',
      choices: [
        "JPEG (often lossy) may discard detail; lossless (e.g., PNG/FLAC-style) preserves every bit — choose based on whether perfect restoration matters",
        "Lossy always preserves every bit by definition",
        "Lossless always deletes half the file",
        "Scientists must use JPEG for all numeric tables",
      ],
      correctIndex: 0,
      hint: "Which family can reconstruct the exact original?",
      explanation:
        "Lossy trades fidelity for size; lossless preserves exact data. Measurement logs usually need lossless (or uncompressed). Image sharing may accept lossy. The tip reverses both definitions.",
    },
    {
      id: "csp4-scenario",
      kind: "scenario",
      title: "Biased insight decision",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "A school dashboard claims 'no students struggle in STEM' after analyzing only honors-track survey responses collected during AP week. What is the strongest critique?",
          choices: [
            {
              id: "sample",
              label: "The sample is biased / unrepresentative, so the insight overgeneralizes",
              nextId: "sample-ok",
              tone: "best",
              feedback:
                "Collection choices shape conclusions. Honors-only + stressful timing skews who responds and what they report.",
            },
            {
              id: "bits",
              label: "The conclusion is invalid because the file was stored in binary",
              nextId: "bits-end",
              tone: "risky",
              feedback:
                "Binary storage is normal. The flaw is sampling and interpretation, not bit representation.",
            },
            {
              id: "meta",
              label: "Metadata always makes bias impossible, so the claim must be true",
              nextId: "meta-end",
              tone: "risky",
              feedback:
                "Metadata can even reveal bias sources — it does not erase them.",
            },
          ],
        },
        {
          id: "sample-ok",
          prompt: "Leadership wants a headline anyway. Best responsible next step?",
          choices: [
            {
              id: "qualify",
              label: "Publish with clear limitations, broader sampling plan, and uncertainty",
              nextId: "success",
              tone: "best",
              feedback:
                "AP CSP Impact/Data reasoning values limitations and ethical communication of findings.",
            },
            {
              id: "hide",
              label: "Delete the sampling notes so the chart looks cleaner",
              nextId: "hide-end",
              tone: "risky",
              feedback:
                "Hiding methodology is misleading. Clean charts without context are still weak evidence.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Honest data storytelling",
            body: "You treated bias and limitations as part of the insight — exactly the Data + Impact judgment AP CSP rewards.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "bits-end",
          ending: {
            title: "Wrong layer",
            body: "Representation format is not the bias problem. Critique sampling and generalization.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "meta-end",
          ending: {
            title: "Metadata ≠ neutrality",
            body: "Metadata describes data; it does not guarantee representative sampling.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "hide-end",
          ending: {
            title: "Misleading communication",
            body: "Removing limitations to 'sell' a finding is an ethical failure in computing impact.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "csp-5": [
    {
      id: "csp5-order",
      kind: "order",
      title: "Expression evaluation order",
      prompt:
        "For AP-style tracing, put these evaluation moves in the order a careful reader should apply when predicting an expression result.",
      items: [
        { id: "subs", label: "Substitute current variable values" },
        { id: "paren", label: "Evaluate parentheses / grouped subexpressions" },
        { id: "ops", label: "Apply operators with correct precedence and associativity" },
        { id: "types", label: "Watch type/coercion traps (string concat vs numeric add)" },
        { id: "assign", label: "Only then perform assignment to update state" },
      ],
      itemExplanations: [
        "You cannot evaluate until you know the live values of each variable.",
        "Parentheses override default precedence — do them before loose operators.",
        "Precedence mistakes (e.g., + vs *) are classic MCQ traps.",
        "AP languages may concatenate when a value is a string — a frequent distractor path.",
        "Assignment is not 'just another operator result'; it changes program state afterward.",
      ],
    },
    {
      id: "csp5-debug",
      kind: "debug",
      title: "Boolean short-circuit myth",
      prompt: "Find the misconception in this Boolean logic note.",
      contentLabel: "Buggy note",
      buggyContent:
        '"In AP CSP pseudocode, (true OR <anything>) is always false because OR means both sides must be true. Also, = and ≠ are the only relational operators you need because < and > are not used in programming."',
      choices: [
        "OR is true if either side is true (true OR x → true); relational operators include <, >, ≤, ≥, =, ≠",
        "OR really does require both sides true; that part is correct",
        "Relational comparisons are illegal in AP CSP",
        "Boolean expressions can never appear in conditionals",
      ],
      correctIndex: 0,
      hint: "OR vs AND truth conditions — and which comparisons exist.",
      explanation:
        "AND needs both; OR needs at least one. AP CSP regularly tests compound Boolean expressions and the full relational set. Confusing OR with AND is a high-yield MCQ trap.",
    },
    {
      id: "csp5-predict",
      kind: "predict",
      title: "Trace the conditional",
      prompt:
        "Predict the value printed. Answer with the exact output string.",
      scenario:
        "x ← 4\ny ← 9\nIF (x < 5) AND (y ≥ 10)\n  DISPLAY \"A\"\nELSE\n  IF (x = 4) OR (y < 3)\n    DISPLAY \"B\"\n  ELSE\n    DISPLAY \"C\"",
      acceptedAnswers: ["B", "b", "DISPLAY B", "\"B\""],
      explanation:
        "First condition: (4<5) true AND (9≥10) false → false, so ELSE. Inner: (x=4) true OR … → true → DISPLAY \"B\". Trap answers are A (forgetting AND) or C (ignoring the OR).",
      placeholder: "A, B, or C?",
    },
  ],

  "csp-6": [
    {
      id: "csp6-parsons",
      kind: "parsons",
      title: "Selection + procedure skeleton",
      prompt:
        "Reorder these Python-like lines into a Create-PT-ready procedure that uses a parameter and selection to classify a score. Indentation is implied by structure — focus on logical order.",
      languageLabel: "python",
      lines: [
        "def classify_score(score):",
        "    if score >= 90:",
        "        return \"A\"",
        "    elif score >= 80:",
        "        return \"B\"",
        "    else:",
        "        return \"C or below\"",
        "label = classify_score(87)",
      ],
      lineExplanations: [
        "Define the procedure with a parameter first — Create PT requires a student-developed procedure with parameter(s).",
        "Highest threshold check comes before lower ones so 95 is not misclassified by a weaker branch.",
        "Returning \"A\" completes the high-score path without falling through.",
        "elif continues selection for the next band after the A case fails.",
        "Returning \"B\" ends that branch cleanly.",
        "else catches remaining scores — selection must cover the residual cases.",
        "Default return finishes the procedure's contract.",
        "Calling with an argument demonstrates parameterization and produces a usable result.",
      ],
      explanation:
        "Create PT skills on display: procedure + parameter, selection with mutually exclusive bands, and a call that uses the abstraction.",
    },
    {
      id: "csp6-debug",
      kind: "debug",
      title: "Off-by-one in a range check",
      prompt: "This grading code fails an AP-style edge case. Identify the real bug.",
      contentLabel: "Buggy fragment",
      buggyContent:
        "def passed(score):\n    # Spec: pass if score is 60 through 100 inclusive\n    if score > 60 and score < 100:\n        return True\n    return False\n# Fails for score = 60 and score = 100",
      choices: [
        "Boundary operators are wrong — need score >= 60 and score <= 100 (inclusive endpoints)",
        "The function should never return False",
        "Parameters are illegal inside procedures on the AP exam",
        "Comparison operators cannot be combined with and",
      ],
      correctIndex: 0,
      hint: "Inclusive ranges need ≥ and ≤, not strict inequalities.",
      explanation:
        "Inclusive bounds are a staple MCQ/Create PT trap. `> 60` rejects 60; `< 100` rejects 100. Use `>=` and `<=` (or equivalent pseudocode) for inclusive specs.",
    },
    {
      id: "csp6-match",
      kind: "match",
      title: "Boolean & selection vocabulary",
      prompt: "Match each term to the precise AP CSP meaning.",
      pairs: [
        {
          id: "sel",
          left: "Selection",
          right: "Chooses which path runs based on a Boolean condition",
        },
        {
          id: "param",
          left: "Parameter",
          right: "Input variable listed in a procedure definition",
        },
        {
          id: "arg",
          left: "Argument",
          right: "Value supplied to a parameter at the call site",
        },
        {
          id: "bool",
          left: "Boolean expression",
          right: "Expression that evaluates to true or false",
        },
        {
          id: "abs",
          left: "Procedural abstraction",
          right: "Naming a process so callers use it without managing inner details",
        },
      ],
    },
  ],

  "csp-7": [
    {
      id: "csp7-parsons",
      kind: "parsons",
      title: "Iteration over a list",
      prompt:
        "Build a Create-PT-style fragment: traverse a list with iteration, use selection inside the loop, and accumulate a count.",
      languageLabel: "python",
      lines: [
        "scores = [72, 91, 64, 88, 95]",
        "high = 0",
        "for s in scores:",
        "    if s >= 90:",
        "        high = high + 1",
        "print(high)",
      ],
      lineExplanations: [
        "The list must exist before traversal — Create PT expects meaningful list use.",
        "Initialize the accumulator before the loop or you will reference an unbound name.",
        "Iteration visits each element; this is the traversal pattern AP CSP tests constantly.",
        "Selection inside iteration filters which elements affect the result.",
        "Update the accumulator only on matching elements.",
        "Output after the loop completes so the final count is complete.",
      ],
      explanation:
        "List + iteration + selection + accumulator is a high-frequency Create PT combination. Order mistakes (print inside loop, init after loop) change the meaning.",
    },
    {
      id: "csp7-debug",
      kind: "debug",
      title: "Infinite loop trap",
      prompt: "Find the real reason this loop never ends.",
      contentLabel: "Buggy loop",
      buggyContent:
        "i ← 1\nREPEAT UNTIL (i > 5)\n{\n  DISPLAY i\n  // forgot to change i\n}",
      choices: [
        "The loop condition never becomes true because i is never updated toward 6",
        "REPEAT UNTIL is illegal in AP CSP pseudocode",
        "DISPLAY always resets i to 0",
        "UNTIL loops run exactly once by definition",
      ],
      correctIndex: 0,
      hint: "What must change for (i > 5) to become true?",
      explanation:
        "If the state used in the terminating condition never changes, iteration is infinite. AP questions love missing increments/updates.",
    },
    {
      id: "csp7-predict",
      kind: "predict",
      title: "Loop trace challenge",
      prompt: "How many times is DISPLAY executed? Answer with a number.",
      scenario:
        "n ← 0\nREPEAT 4 TIMES\n{\n  n ← n + 2\n  DISPLAY n\n}",
      acceptedAnswers: ["4", "four"],
      explanation:
        "REPEAT 4 TIMES runs the body four times regardless of n's value. DISPLAY is inside the body → 4 outputs (2,4,6,8). Trap: answering 8 (final n) or 2 (step size).",
      placeholder: "Times DISPLAY runs?",
    },
  ],

  "csp-8": [
    {
      id: "csp8-parsons",
      kind: "parsons",
      title: "List filter procedure",
      prompt:
        "Reorder into a procedure that takes a list parameter, iterates, uses selection, and returns a new list — Create PT gold.",
      languageLabel: "python",
      lines: [
        "def evens_only(nums):",
        "    result = []",
        "    for n in nums:",
        "        if n % 2 == 0:",
        "            result.append(n)",
        "    return result",
        "print(evens_only([3, 4, 6, 7]))",
      ],
      lineExplanations: [
        "Procedure + parameter first establishes the abstraction boundary.",
        "Create an empty result list before accumulation.",
        "Traverse the input list — meaningful list use.",
        "Selection decides which elements qualify.",
        "Append builds the filtered collection.",
        "Return after the loop so the full filtered list is delivered.",
        "Call site demonstrates the procedure with a concrete list argument.",
      ],
      explanation:
        "This packs list, procedure/parameter, selection, and iteration — the Create PT checklist — into one coherent algorithm.",
    },
    {
      id: "csp8-debug",
      kind: "debug",
      title: "List index off-by-one",
      prompt: "Spot the index misconception AP CSP loves to punish.",
      contentLabel: "Buggy fragment",
      buggyContent:
        'data ← [10, 20, 30, 40]\n# Student assumes Python 0-based habits on the Exam Reference Sheet:\ni ← 0\nDISPLAY data[i]   // expects 10\n# Also claims: "last index is always LENGTH(data) - 1 in AP CSP pseudocode."',
      choices: [
        "AP CSP Exam Reference lists are 1-based: first index is 1, last is LENGTH(data); using 0 (or length−1 as if 0-based) is an off-by-one / model mix-up",
        "LENGTH always returns 0 on the AP exam",
        "Lists cannot store numbers in AP CSP",
        "Indexing is never tested on the AP CSP exam",
      ],
      correctIndex: 0,
      hint: "Exam Reference Sheet lists start at index 1 — not 0.",
      explanation:
        "On the AP CSP Exam Reference Sheet, list indices start at 1 and the last element is at LENGTH(list). Python's 0-based model is different. Mixing them produces classic off-by-one errors on MCQs and in Create PT code explanations.",
    },
    {
      id: "csp8-scenario",
      kind: "scenario",
      title: "Choose the right traversal",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "You must find whether any username in a list equals \"admin\". The list may be long. Which approach best matches AP CSP algorithmic thinking?",
          choices: [
            {
              id: "linear",
              label: "Traverse elements until a match is found (linear search pattern)",
              nextId: "linear-ok",
              tone: "best",
              feedback:
                "Unsorted equality search is a linear traversal — clear, correct, and Create-PT-friendly.",
            },
            {
              id: "sortfirst",
              label: "Always sort then binary-search even if the list is tiny and unsorted requirements forbid reordering",
              nextId: "sort-end",
              tone: "risky",
              feedback:
                "Binary search needs sorted order and may violate requirements if order must be preserved.",
            },
            {
              id: "hardcode",
              label: "Only check index 1 because admin is usually first",
              nextId: "hard-end",
              tone: "risky",
              feedback:
                "Position assumptions are not an algorithm — they fail silently.",
            },
          ],
        },
        {
          id: "linear-ok",
          prompt: "Should your procedure return as soon as it finds a match, or always scan the entire list?",
          choices: [
            {
              id: "early",
              label: "Return early on match; finish the list only if not found",
              nextId: "success",
              tone: "best",
              feedback:
                "Early exit is correct for existence checks and can improve average efficiency.",
            },
            {
              id: "always",
              label: "Keep scanning after a match for no reason, then overwrite the answer",
              nextId: "always-end",
              tone: "okay",
              feedback:
                "Still can be correct if you carefully preserve the found flag, but it wastes work and invites bugs.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Sound list algorithm",
            body: "You chose a correct traversal pattern and a clean existence check — strong Algorithms & Programming judgment.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "sort-end",
          ending: {
            title: "Wrong tool / constraint miss",
            body: "Sorting changes order and binary search has preconditions. Match the algorithm to constraints.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "hard-end",
          ending: {
            title: "Not an algorithm",
            body: "Hardcoding a lucky index does not generalize and will fail AP-style test cases.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "always-end",
          ending: {
            title: "Correctable but weak",
            body: "Full scans can work with a flag, but early return is clearer for existence. Prefer the clear algorithm.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "csp-9": [
    {
      id: "csp9-parsons",
      kind: "parsons",
      title: "Procedure abstraction with parameters",
      prompt:
        "Assemble a reusable procedure that abstracts a multi-step list process. Callers should not manage the loop details.",
      languageLabel: "python",
      lines: [
        "def average(values):",
        "    if len(values) == 0:",
        "        return None",
        "    total = 0",
        "    for v in values:",
        "        total = total + v",
        "    return total / len(values)",
        "mean = average([10, 20, 30])",
      ],
      lineExplanations: [
        "Name the abstraction and its list parameter first.",
        "Guard the empty-list edge case before division.",
        "Return a defined failure/empty signal rather than crashing.",
        "Initialize accumulator before iteration.",
        "Traverse the list to incorporate each value.",
        "Update the running total inside the loop.",
        "Return the computed result — the abstraction's output.",
        "Call site shows arguments and captures the abstracted result.",
      ],
      explanation:
        "Procedural abstraction hides traversal and arithmetic. Selection handles an edge case; iteration processes the list — Create PT alignment.",
    },
    {
      id: "csp9-debug",
      kind: "debug",
      title: "Procedure vs abstraction confusion",
      prompt: "Find the error in this 'definitions' flashcard.",
      contentLabel: "Buggy flashcard",
      buggyContent:
        '"A procedure is the same thing as abstraction: any named block automatically removes all complexity forever. Parameters are optional decorations and never change behavior. Calling a procedure always executes every line in the file."',
      choices: [
        "A procedure is a named process you can call; abstraction is the design idea of hiding detail — parameters matter, and a call runs that procedure's body, not the whole file",
        "Procedures and abstraction are identical synonyms in the CED",
        "Parameters never affect results",
        "A procedure call always runs the entire program file top to bottom",
      ],
      correctIndex: 0,
      hint: "Procedure = mechanism; abstraction = why/how we manage complexity.",
      explanation:
        "AP CSP distinguishes writing procedures (with parameters) from the broader idea of abstraction. Calls transfer control to the procedure body with arguments bound to parameters — they do not magically run unrelated file lines.",
    },
    {
      id: "csp9-match",
      kind: "match",
      title: "Abstraction levels match",
      prompt: "Match each example to the abstraction idea it best illustrates.",
      pairs: [
        {
          id: "proc",
          left: "Calling displayMenu() without reading its body",
          right: "Procedural abstraction — use a name, hide steps",
        },
        {
          id: "data",
          left: "Using a list of scores instead of 30 separate variables",
          right: "Data abstraction — manage many values as one collection",
        },
        {
          id: "param",
          left: "def area(width, height)",
          right: "Generalization via parameters for reuse",
        },
        {
          id: "lib",
          left: "Using a built-in RANDOM(a, b)",
          right: "Relying on an existing abstraction with a known interface",
        },
        {
          id: "mod",
          left: "Splitting input, process, and output into procedures",
          right: "Managing complexity through modular design",
        },
      ],
    },
  ],

  "csp-10": [
    {
      id: "csp10-parsons",
      kind: "parsons",
      title: "Compare sequential vs parallel plan",
      prompt:
        "Reorder these lines into a clear algorithm that (1) defines a list, (2) uses a procedure with a parameter, (3) iterates with selection, then (4) comments where independent work could run in parallel.",
      languageLabel: "python",
      lines: [
        "nums = [5, 12, 7, 20, 3]",
        "def count_over(threshold, values):",
        "    count = 0",
        "    for x in values:",
        "        if x > threshold:",
        "            count = count + 1",
        "    return count",
        "# Independent map steps could run in parallel; combining counts is sequential",
        "print(count_over(10, nums))",
      ],
      lineExplanations: [
        "Establish the list data first.",
        "Define the parameterized procedure that encapsulates the algorithm.",
        "Initialize before iteration.",
        "Traverse sequentially in this implementation.",
        "Selection decides which values count.",
        "Accumulate matches.",
        "Return the aggregated result (aggregation is a sequential dependency).",
        "Document parallel opportunity vs sequential combine — AP efficiency vocabulary.",
        "Invoke the abstraction with arguments.",
      ],
      explanation:
        "You still need list + procedure + selection + iteration for Create PT. The comment highlights a key exam idea: some work is parallelizable, but combining shared results imposes sequence.",
    },
    {
      id: "csp10-debug",
      kind: "debug",
      title: "Parallel vs sequential myth",
      prompt: "Spot the false efficiency claim.",
      contentLabel: "Buggy claim",
      buggyContent:
        '"If a computer has 4 cores, every algorithm becomes exactly 4× faster with zero limits. Parallel computing also removes all dependencies, so steps that need prior results can safely run at the same time. Sequential computing is never used in modern systems."',
      choices: [
        "Speedup is limited by non-parallelizable parts and dependencies; sequential steps remain necessary when later work needs earlier results",
        "4 cores always give perfect 4× speedup on every problem",
        "Dependencies never matter in parallel systems",
        "Sequential computing was abolished by College Board",
      ],
      correctIndex: 0,
      hint: "Think Amdahl-style limits and data dependencies — AP CSP language.",
      explanation:
        "AP CSP contrasts sequential and parallel: parallel can reduce time when tasks are independent, but dependent steps and overhead limit speedup. Sequential solutions remain fundamental.",
    },
    {
      id: "csp10-predict",
      kind: "predict",
      title: "Efficiency comparison",
      prompt:
        "Algorithm A visits each of n list elements once. Algorithm B compares every pair of elements. As n grows, which grows faster in operations — A or B? Answer A or B.",
      scenario:
        "A: roughly n operations (linear traversal).\nB: roughly n×(n-1)/2 comparisons (pairwise).\nQuestion: which has the steeper growth for large n?",
      acceptedAnswers: ["B", "b", "algorithm B", "Algorithm B"],
      explanation:
        "Pairwise work scales much faster than a single pass. AP CSP asks you to reason qualitatively about efficiency without heavy calculus — B's operations grow much quicker.",
      placeholder: "A or B?",
    },
  ],

  "csp-11": [
    {
      id: "csp11-order",
      kind: "order",
      title: "Fault-tolerant path",
      prompt:
        "A distributed service must stay available when one node fails. Order the fault-tolerance design moves AP CSP emphasizes.",
      items: [
        { id: "detect", label: "Detect failure via timeouts / heartbeats / error responses" },
        { id: "reroute", label: "Reroute requests to redundant components that are still healthy" },
        { id: "replicate", label: "Serve from replicas / backups so work continues" },
        { id: "recover", label: "Restore or replace the failed component when possible" },
        { id: "verify", label: "Verify consistency and monitor ongoing availability" },
      ],
      itemExplanations: [
        "You cannot tolerate what you cannot detect — failure detection comes first.",
        "Rerouting uses redundancy so users are not stuck on the dead path.",
        "Replicas/backups provide the alternate capacity fault tolerance depends on.",
        "Recovery repairs the system rather than permanently running degraded.",
        "Verification ensures the 'fix' actually restored trustworthy service.",
      ],
    },
    {
      id: "csp11-debug",
      kind: "debug",
      title: "Hardware vs software mix-up",
      prompt: "Find the incorrect statement in this systems note.",
      contentLabel: "Buggy note",
      buggyContent:
        '"Hardware is the programs you download. Software is the physical chips and wires. An operating system is optional hardware that physically stores electrons. Fault tolerance means a system has no redundancy and fails completely if any part fails."',
      choices: [
        "Hardware is physical; software is programs/instructions; OS is system software; fault tolerance relies on redundancy so failure of a part need not fail the whole",
        "Hardware really means apps from a store",
        "Fault tolerance forbids backups by definition",
        "Operating systems are made of copper only",
      ],
      correctIndex: 0,
      hint: "Physical vs instructions; redundancy vs single point of failure.",
      explanation:
        "AP CSP Computing Systems vocabulary is precise: hardware/software roles, OS as system software, and fault tolerance through redundancy — not fragility.",
    },
    {
      id: "csp11-match",
      kind: "match",
      title: "Systems vocabulary drill",
      prompt: "Match each term to the best AP CSP definition.",
      pairs: [
        {
          id: "hw",
          left: "Hardware",
          right: "Physical computing components",
        },
        {
          id: "sw",
          left: "Software",
          right: "Programs and instructions executed by hardware",
        },
        {
          id: "os",
          left: "Operating system",
          right: "System software managing hardware resources and apps",
        },
        {
          id: "ft",
          left: "Fault tolerance",
          right: "Continuing operation despite component failure via redundancy",
        },
        {
          id: "abs",
          left: "System abstraction",
          right: "Interfaces that hide lower-level implementation details",
        },
      ],
    },
  ],

  "csp-12": [
    {
      id: "csp12-order",
      kind: "order",
      title: "Packet journey",
      prompt:
        "Order the high-level steps for sending a message across the Internet — protocol-stack thinking without memorizing every RFC.",
      items: [
        { id: "split", label: "Break the message into packets with addressing metadata" },
        { id: "route", label: "Route packets hop-by-hop across interconnected networks" },
        { id: "arrive", label: "Packets may take different paths and arrive out of order" },
        { id: "reasm", label: "Reassemble packets into the original message at the destination" },
        { id: "check", label: "Use reliability mechanisms (e.g., acknowledgments/retransmission) when required" },
      ],
      itemExplanations: [
        "Packetization enables sharing links and resilient routing.",
        "Routers forward using destination information across networks.",
        "Dynamic paths mean delay variance and reordering are normal.",
        "Reassembly restores the application message.",
        "Transport reliability is optional depending on protocol needs — know the tradeoff.",
      ],
    },
    {
      id: "csp12-debug",
      kind: "debug",
      title: "Internet vs WWW trap",
      prompt: "This 'fact' is a legendary AP CSP distractor. Destroy it.",
      contentLabel: "Buggy fact",
      buggyContent:
        '"The Internet and the World Wide Web are the same thing. HTTP is the only protocol on the Internet. IP addresses are optional because URLs physically are the wires. DNS exists to make networks slower on purpose."',
      choices: [
        "The Internet is the global network of networks; the WWW is an application system of linked resources on top; many protocols exist; DNS maps names to IP addresses",
        "WWW and Internet are official synonyms in the CED",
        "HTTP is the sole Internet protocol",
        "DNS is only used to slow downloads",
      ],
      correctIndex: 0,
      hint: "Network of networks vs web of linked documents/resources.",
      explanation:
        "Internet ≠ WWW. The Web uses protocols (like HTTP/HTTPS) on the Internet; email, streaming, and more use others. DNS translates human-readable names to IP addresses for routing.",
    },
    {
      id: "csp12-scenario",
      kind: "scenario",
      title: "Protocol choice under constraints",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "You are designing a live video feature where occasional lost frames are acceptable but delay must stay tiny. Which priority matches AP CSP tradeoff reasoning?",
          choices: [
            {
              id: "speed",
              label: "Prefer lower latency / best-effort delivery over perfect retransmission of every packet",
              nextId: "speed-ok",
              tone: "best",
              feedback:
                "Real-time media often tolerates loss better than long retransmission delays.",
            },
            {
              id: "perfect",
              label: "Retransmit every lost packet no matter how late the frame becomes",
              nextId: "perfect-end",
              tone: "risky",
              feedback:
                "Perfect reliability can destroy interactivity for live streams.",
            },
            {
              id: "nodns",
              label: "Disable DNS globally so packets never need addresses",
              nextId: "dns-end",
              tone: "risky",
              feedback:
                "Hosts still need addressing; DNS is name resolution, not the enemy of video.",
            },
          ],
        },
        {
          id: "speed-ok",
          prompt: "A payment form on the same site needs the opposite property. Best call?",
          choices: [
            {
              id: "reliable",
              label: "Use reliable delivery and security appropriate for transactions",
              nextId: "success",
              tone: "best",
              feedback:
                "Different applications on the Internet choose different tradeoffs — a core AP idea.",
            },
            {
              id: "same",
              label: "Force the payment form to drop packets like live video for consistency",
              nextId: "same-end",
              tone: "risky",
              feedback:
                "Consistency of protocol choice across unrelated apps is not a virtue when requirements differ.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Right tradeoff per application",
            body: "You matched reliability vs latency to the use case — strong Networks reasoning.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "perfect-end",
          ending: {
            title: "Latency blowup",
            body: "Live media often prefers timely imperfect frames over late perfect ones.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "dns-end",
          ending: {
            title: "Addressing still required",
            body: "Turning off DNS does not remove the need for IP addressing and routing.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "same-end",
          ending: {
            title: "Wrong requirements transfer",
            body: "Payments need integrity and reliability. Copying video tradeoffs is harmful.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "csp-13": [
    {
      id: "csp13-order",
      kind: "order",
      title: "Innovation impact analysis",
      prompt:
        "Order a rigorous impact analysis for a new computing innovation — the structure strong AP Impact free-response answers follow.",
      items: [
        { id: "purpose", label: "State the innovation's purpose and intended users" },
        { id: "data", label: "Identify data collected/created and how it is used" },
        { id: "benefit", label: "Explain beneficial effects with a specific stakeholder" },
        { id: "harm", label: "Explain harmful effects / risks with a specific stakeholder" },
        { id: "equity", label: "Analyze equity: who is included, excluded, or disproportionately affected" },
      ],
      itemExplanations: [
        "Purpose anchors the rest of the analysis in a real computing innovation.",
        "Data practices often drive both benefits and harms — identify them early.",
        "Benefits must be concrete and stakeholder-specific, not vague 'it helps society'.",
        "Harms/risks must be equally concrete — AP rewards balanced analysis.",
        "Equity reasoning separates strong Impact answers from cheerleading.",
      ],
    },
    {
      id: "csp13-debug",
      kind: "debug",
      title: "Impact oversimplification",
      prompt: "Find the flaw in this Impact paragraph.",
      contentLabel: "Buggy paragraph",
      buggyContent:
        '"Facial recognition in schools is purely beneficial because technology is neutral. It cannot create bias, cannot misidentify anyone, and has the same effect on every student group. Privacy concerns are irrelevant if the vendor says the tool is accurate."',
      choices: [
        "Computing innovations have beneficial and harmful effects; systems can encode bias; effects differ across groups; vendor claims do not erase privacy/equity risks",
        "Technology is always neutral and effect-free",
        "Misidentification is impossible for digital cameras",
        "Privacy is never an AP CSP topic",
      ],
      correctIndex: 0,
      hint: "Impact answers need benefits, harms, and uneven effects — not utopia.",
      explanation:
        "AP CSP Impact of Computing expects nuanced analysis: intended benefits, unintended harms, bias, and differential impact. Neutrality myths are classic wrong answers.",
    },
    {
      id: "csp13-scenario",
      kind: "scenario",
      title: "Equity design fork",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "A district proposes an AI tutoring app that only works well with high-speed home broadband and newest phones. What is the strongest equity concern?",
          choices: [
            {
              id: "access",
              label: "Students with less device/network access may be systematically excluded from the benefit",
              nextId: "access-ok",
              tone: "best",
              feedback:
                "Digital divide effects are a core equity lens in AP CSP Impact.",
            },
            {
              id: "ignore",
              label: "Equity is irrelevant because the app uses binary data",
              nextId: "ignore-end",
              tone: "risky",
              feedback:
                "Binary representation does not cancel social impact.",
            },
            {
              id: "blame",
              label: "Any student without a new phone is simply not trying hard enough",
              nextId: "blame-end",
              tone: "risky",
              feedback:
                "Blaming individuals ignores structural access barriers.",
            },
          ],
        },
        {
          id: "access-ok",
          prompt: "Which mitigation best fits responsible computing design?",
          choices: [
            {
              id: "offline",
              label: "Add low-bandwidth/offline modes and school-device support; measure outcomes by subgroup",
              nextId: "success",
              tone: "best",
              feedback:
                "Design changes + measurement address exclusion instead of denying it.",
            },
            {
              id: "slogan",
              label: "Post a slogan about inclusion but keep the same technical requirements",
              nextId: "slogan-end",
              tone: "risky",
              feedback:
                "Messaging without access changes does not fix the equity gap.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Equity-aware innovation",
            body: "You identified unequal access and proposed design mitigations with measurement — strong Impact reasoning.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "ignore-end",
          ending: {
            title: "Category error",
            body: "Data representation facts do not answer equity questions.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "blame-end",
          ending: {
            title: "Harmful framing",
            body: "Access barriers are not moral failures of students. Analyze systems.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "slogan-end",
          ending: {
            title: "Performative inclusion",
            body: "Without changing requirements, exclusion remains. AP Impact rewards substantive mitigation.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "csp-14": [
    {
      id: "csp14-match",
      kind: "match",
      title: "Legal & ethical distinctions",
      prompt:
        "Match each legal/ethical idea to the definition AP CSP expects — especially copyright vs fair use.",
      pairs: [
        {
          id: "copyright",
          left: "Copyright",
          right: "Legal protection for original creative works; limits copying/distribution without permission",
        },
        {
          id: "fair",
          left: "Fair use (U.S. concept)",
          right: "Limited use of copyrighted material may be allowed for purposes like criticism, comment, teaching — fact-specific, not a free-for-all",
        },
        {
          id: "creative",
          left: "Creative Commons / licenses",
          right: "Creators grant predefined permissions for reuse under stated conditions",
        },
        {
          id: "privacy",
          left: "Privacy risk",
          right: "Personal data collected/shared in ways users may not expect or control",
        },
        {
          id: "pii",
          left: "Personally identifiable information",
          right: "Data that can identify a person alone or combined with other data",
        },
      ],
    },
    {
      id: "csp14-debug",
      kind: "debug",
      title: "Fair use fantasy",
      prompt: "Destroy this dangerous copyright myth.",
      contentLabel: "Buggy advice",
      buggyContent:
        '"If it\'s on the Internet, it\'s public domain. For school projects you can copy any song, logo, or full movie into your app because education automatically means unlimited fair use. Crediting the author always makes copyrighted use legal."',
      choices: [
        "Online ≠ public domain; fair use is limited and context-specific; attribution alone does not authorize unrestricted copying",
        "Everything online is free to reuse commercially",
        "School use always erases copyright",
        "Credit always equals a legal license",
      ],
      correctIndex: 0,
      hint: "Public domain, license, and fair use are different doors — not one magic key.",
      explanation:
        "AP CSP Impact items hammer intellectual property: copyright still applies online; fair use is not unlimited; attribution ≠ permission. Create PT projects must respect licensing.",
    },
    {
      id: "csp14-scenario",
      kind: "scenario",
      title: "Privacy design choice",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Your Create PT-style app can improve recommendations by silently uploading students' private messages to a vendor cloud. What first?",
          choices: [
            {
              id: "minimize",
              label: "Do not upload private messages; minimize data and use on-device processing if needed",
              nextId: "min-ok",
              tone: "best",
              feedback:
                "Data minimization and purpose limitation are responsible computing defaults.",
            },
            {
              id: "silent",
              label: "Upload everything silently — users won't notice",
              nextId: "silent-end",
              tone: "risky",
              feedback:
                "Hidden exfiltration of private content is an ethical and often legal failure.",
            },
            {
              id: "sell",
              label: "Sell the message archive to advertisers to fund the project",
              nextId: "sell-end",
              tone: "risky",
              feedback:
                "Secondary use without meaningful consent amplifies harm.",
            },
          ],
        },
        {
          id: "min-ok",
          prompt: "You still need some analytics. Best practice?",
          choices: [
            {
              id: "consent",
              label: "Collect the minimum needed, disclose clearly, and obtain appropriate consent",
              nextId: "success",
              tone: "best",
              feedback:
                "Transparency + minimization aligns with AP privacy reasoning.",
            },
            {
              id: "bury",
              label: "Hide the policy in unreadable legalese and collect maximum data",
              nextId: "bury-end",
              tone: "risky",
              feedback:
                "Dark patterns undermine informed consent.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Privacy-respecting design",
            body: "You rejected silent collection, minimized data, and centered disclosure — strong Impact ethics.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "silent-end",
          ending: {
            title: "Hidden surveillance",
            body: "Secret uploads of private messages fail ethical and often legal standards.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "sell-end",
          ending: {
            title: "Consent failure",
            body: "Selling private student messages for ads is a severe trust and ethics violation.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "bury-end",
          ending: {
            title: "Fake transparency",
            body: "Unreadable policies plus maximal collection are not meaningful consent.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "csp-15": [
    {
      id: "csp15-parsons",
      kind: "parsons",
      title: "Create PT minimum viable evidence",
      prompt:
        "Reorder this Create PT program so it clearly demonstrates list use, a student-developed procedure with a parameter, selection, and iteration.",
      languageLabel: "python",
      lines: [
        "temperatures = [68, 72, 91, 85, 77]",
        "def count_heat_days(temps, cutoff):",
        "    days = 0",
        "    for t in temps:",
        "        if t >= cutoff:",
        "            days = days + 1",
        "    return days",
        "print(count_heat_days(temperatures, 80))",
      ],
      lineExplanations: [
        "The list is meaningful input data for the program's purpose.",
        "Student-developed procedure with parameters (list + cutoff).",
        "Initialize accumulator before the loop.",
        "Iteration traverses the list.",
        "Selection applies the cutoff rule.",
        "Accumulate matching days.",
        "Return the computed result for written-response evidence.",
        "Call demonstrates arguments and produces output tied to purpose.",
      ],
      explanation:
        "College Board Create PT looks for these algorithmic components working together with a clear purpose — not disconnected syntax souvenirs.",
    },
    {
      id: "csp15-debug",
      kind: "debug",
      title: "Create PT requirements trap",
      prompt: "This submission plan would likely lose credit. Why?",
      contentLabel: "Buggy plan",
      buggyContent:
        '"I\'ll submit a program with only print statements and no list. I\'ll copy a procedure from a tutorial video word-for-word and claim it as student-developed. My written responses will describe features I meant to build but did not. Screenshots can be from a different project."',
      choices: [
        "Create PT requires your own program with required features (including list + student-developed procedure with param(s) + selection + iteration) and written responses that match the submitted program",
        "Print-only programs always earn full Create PT credit",
        "Copied tutorial procedures count as student-developed if you change variable names slightly",
        "Written responses may invent features not in the video/code",
      ],
      correctIndex: 0,
      hint: "Evidence must exist in the program you submit — and it must be yours.",
      explanation:
        "Create PT credit is evidence-based: required constructs in your authentic program, plus written responses aligned to that program. Fabrication and uncredited copying are integrity failures.",
    },
    {
      id: "csp15-scenario",
      kind: "scenario",
      title: "Written response alignment",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Your video shows a procedure filtering a list, but your written response describes a sorting algorithm you deleted yesterday. What should you do before submission?",
          choices: [
            {
              id: "align",
              label: "Rewrite the response to accurately describe the filtering procedure and list use actually in the program/video",
              nextId: "align-ok",
              tone: "best",
              feedback:
                "Responses must match the submitted program and video evidence.",
            },
            {
              id: "keep",
              label: "Keep the sorting story because it sounds more advanced",
              nextId: "keep-end",
              tone: "risky",
              feedback:
                "Misaligned claims risk earning no credit for that row — sophistication theater fails.",
            },
            {
              id: "borrow",
              label: "Paste a classmate's procedure write-up that mentions sorting",
              nextId: "borrow-end",
              tone: "risky",
              feedback:
                "Plagiarism violates academic integrity rules for the Create PT.",
            },
          ],
        },
        {
          id: "align-ok",
          prompt: "You notice your procedure has no parameter. Best fix?",
          choices: [
            {
              id: "param",
              label: "Refactor to pass the list (and any cutoff) as parameter(s), update calls, re-record evidence",
              nextId: "success",
              tone: "best",
              feedback:
                "Student-developed procedure with parameter(s) is a stated Create PT requirement.",
            },
            {
              id: "global",
              label: "Leave it using only globals and hope scorers do not notice",
              nextId: "global-end",
              tone: "risky",
              feedback:
                "Hoping scorers miss a missing requirement is not a strategy.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Submission-ready integrity",
            body: "You aligned writing to real code and repaired the parameter requirement — Create PT studio done right.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "keep-end",
          ending: {
            title: "Evidence mismatch",
            body: "Written responses that invent deleted features do not earn the row.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "borrow-end",
          ending: {
            title: "Integrity violation",
            body: "Create PT work must be your own. Copying responses is not allowed.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "global-end",
          ending: {
            title: "Missing parameter evidence",
            body: "Without a parameter, you may fail a required Create PT component. Fix it and re-capture evidence.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "csp-16": [
    {
      id: "csp16-order",
      kind: "order",
      title: "MCQ triage protocol",
      prompt:
        "Under timed AP CSP MCQ conditions, order a high-yield attack plan for a hard stimulus question.",
      items: [
        { id: "stem", label: "Read the stem and mark exactly what is asked (definition, trace, tradeoff, best explanation)" },
        { id: "stimulus", label: "Parse charts/code/stimulus; annotate values and constraints" },
        { id: "predict", label: "Predict an answer before staring at distractors" },
        { id: "eliminate", label: "Eliminate choices that reverse definitions or ignore constraints" },
        { id: "commit", label: "Choose, flag if needed, and move — protect pacing for later items" },
      ],
      itemExplanations: [
        "Misreading the task type is the most expensive timed error.",
        "Stimulus details (bit widths, loop bounds, stakeholders) decide among close options.",
        "Predicting first reduces lure from well-written distractors.",
        "AP distractors often flip lossy/lossless, Internet/WWW, parallel/sequential, inclusive bounds.",
        "Pacing beats perfectionism — a flagged item can return if time remains.",
      ],
    },
    {
      id: "csp16-debug",
      kind: "debug",
      title: "Gauntlet distractor cluster",
      prompt:
        "A single 'study key' packs five classic wrong ideas. Identify the corrected worldview.",
      contentLabel: "Buggy study key",
      buggyContent:
        '"1010₂ = 1010₁₀. Lossy compression restores every bit. Parallel always beats sequential with unlimited speedup. The WWW is the Internet. Fair use means any school project may copy any media. Create PT needs no list if your UI is pretty."',
      choices: [
        "1010₂ = 10₁₀; lossy discards info; parallel speedup is limited by dependencies; WWW ≠ Internet; fair use is limited; Create PT still needs required algorithmic components including meaningful list use",
        "All of those study-key lines are already correct AP CSP facts",
        "Binary equals decimal always when digits look the same",
        "Pretty UI replaces Create PT algorithm requirements",
      ],
      correctIndex: 0,
      hint: "Every sentence is a famous distractor family — invert each one.",
      explanation:
        "This is the exam-prep gauntlet: place value, compression fidelity, parallel limits, Internet vs WWW, IP/fair use nuance, and Create PT evidence requirements. If you can untangle this cluster, you are ready.",
    },
    {
      id: "csp16-predict",
      kind: "predict",
      title: "Final mixed trace",
      prompt:
        "Predict the value of result after this AP-style fragment. Answer with a single integer.",
      scenario:
        "nums ← [2, 5, 8, 5]\nresult ← 0\nFOR EACH n IN nums\n{\n  IF n ≥ 5\n  {\n    result ← result + 1\n  }\n}\n// What is result?",
      acceptedAnswers: ["3", "three"],
      explanation:
        "Elements ≥ 5 are 5, 8, and 5 → three increments. Traps: answering 4 (counting all), 18 (summing), or 2 (forgetting the second 5). List traversal + selection + accumulator is Create PT and MCQ core.",
      placeholder: "result = ?",
    },
  ],
};
