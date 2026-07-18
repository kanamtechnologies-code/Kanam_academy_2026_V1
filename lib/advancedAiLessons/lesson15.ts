import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const advancedAiLesson15: AILessonConfig = {
  id: "aai-15",
  title: "15. Capstone Studio: Build Your AI System",
  goal: "Build a narrow, evidence-backed AI vertical slice with an evaluation plan and risk register.",
  xpReward: 750,
  badge: "Capstone Builder",
  dashboardHref: "/dashboard",
  prevHref: "/learn/advanced-ai/14",
  nextHref: "/learn/advanced-ai/16",
  lessonModule: {
    durationLabel: "~40–50 min lesson",
    sections: [
      { id: "problem-brief", kicker: "Roadmap", title: "Write a bounded problem brief", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — name user, decision, permitted input, action, excluded use, owner, and error cost.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A citation helper may answer from approved policies and escalate gaps; it may not decide eligibility or ingest private counseling records. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-15.png", imageAlt: "Students and an instructor planning an Advanced AI 15 project around a whiteboard." },
      { id: "user-workflow", kicker: "Scope", title: "Choose one user workflow", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — select a complete path that demonstrates value without platform sprawl.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A student asks one policy question, sees a cited answer or escalation, and can correct an issue; that is a vertical slice. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "success-gates", kicker: "Evidence", title: "Set measurable success and safety gates", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — turn “helpful” into pass/fail evidence.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Require 90% grounded answers on held-out questions, zero fabricated citations, and successful escalation for every unsupported case. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Best scoped capstone for a two-week build?", ["An unscoped agent that claims to do everything AI can do","A club FAQ with RAG, citations, and a small eval set","A giant net trained from scratch with no labeled data","Demo screenshots only, with metrics postponed until later"], 1, "Finishable scope plus evidence beats theater.") },
      { id: "baseline", kicker: "Baseline", title: "Build and measure a non-AI baseline", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — show why the proposed intelligence is necessary.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Compare search plus a curated FAQ with a generated answer system on the same cases, including user effort and failure recovery. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "thin-architecture", kicker: "Architecture", title: "Draw the thinnest defensible architecture", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — choose only components required for the bounded claim.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: One input form, approved source store, retrieval or prompt layer, schema and grounding checks, eval harness, and human route can be enough. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-15-b.png", imageAlt: "A realistic classroom lab screen showing lesson 15 notes, examples, and evidence.", checkIn: check("What must a capstone README include?", ["Only screenshots and a catchy project title, even thoug","How to run, what data, metrics, and known limitations","Production secrets pasted in plaintext for graders","A promise that the system has no limitations section"], 1, "Runnable and honest documentation is part of the grade.") },
      { id: "data-source-card", kicker: "Data", title: "Create source and dataset cards", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — record authority, permissions, freshness, exclusions, and known gaps.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A policy PDF card names its owner, effective date, access scope, indexing status, and the questions it cannot answer. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "eval-first", kicker: "Evaluation", title: "Author the evaluation set before polish", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — make ordinary, edge, adversarial, unsupported, and recovery cases visible early.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Tag each case with expected behavior, evidence source, rubric, and reason it matters to the user. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Teammate wants multimodal agents, fine-tuning, and a mobile app in two weeks. Best move?", ["Keep the full scope and sleep less until everything ships","Cut to one vertical slice with eval cases and risk notes","Skip evaluation so there is more time for animations","Start three repos so each person can invent a different product"], 1, "Depth on a thin slice is the advanced studio move.") },
      { id: "risk-register", kicker: "Risk", title: "Maintain a living risk register", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — connect known harm to likelihood, impact, control, detection, and owner.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Wrong policy answer, sensitive-data paste, stale source, and prompt injection each need a specific response rather than a generic disclaimer. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "implementation", kicker: "Build", title: "Build the vertical slice in evidence order", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — implement the contract, one path, validation, and evaluation before convenience features.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Do not add calendar write access or autonomous agents until the first read-only workflow passes its defined tests. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-confusion.png", imageAlt: "An educational lab visualization illustrating a key lesson 15 mechanism with annotated screens." },
      { id: "failure-tests", kicker: "Testing", title: "Test failure and recovery deliberately", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — treat safe refusal and correction as features.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Demonstrate a missing source, malformed input, hostile retrieved text, and low-confidence result, then show exactly what the user sees next. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("When should the evaluation set be authored?", ["After the UI polish is finished and screenshots look great","Before polish, so success criteria drive the build","Never, if the demo path works once on a laptop","Only if a teacher explicitly grades the CSV file"], 1, "Eval-first keeps the slice honest.") },
      { id: "milestones", kicker: "Planning", title: "Plan milestones with artifacts", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — make each week produce a reviewable decision.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Milestone artifacts can be a brief and baseline, a working slice, an eval report, a failure fix set, and a demo audit packet. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "decision-log", kicker: "Traceability", title: "Keep a decision and version log", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — preserve why choices were made and what changed.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Record architecture rationale, prompt and source versions, test results, rejected alternatives, and the person who approved scope changes. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "red-team", kicker: "Audit", title: "Run a focused red-team session", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — ask peers to challenge authority, data handling, and edge behavior.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Give reviewers a script with unsupported requests, privacy-sensitive content, injection attempts, accessibility variations, and confusing user inputs. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-15-c.png", imageAlt: "Learners reviewing a worked AI system example on a monitor with notes and evidence.", checkIn: check("What belongs in a capstone risk register?", ["Only the names of libraries used in package.json","Failure modes, privacy notes, oversight","A statement that risks disappear after the demo day","GPU benchmarks with no link to user harm"], 1, "Risk notes show mature judgment.") },
      { id: "ownership", kicker: "Operations", title: "Assign fictional but concrete operations ownership", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — ensure a prototype still has a believable post-demo lifecycle.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Name who refreshes sources, reviews flags, pauses the feature, answers corrections, and owns an incident even if the system is not yet live. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "demo-script", kicker: "Communication", title: "Prepare an honest demonstration script", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — show normal value, hard evidence, failure, recovery, and residual risk.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A defensible demo includes the screen that says “I cannot verify this; here is the responsible contact,” not only successful answers. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "scope-cut", kicker: "Restraint", title: "Make a principled scope cut", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — remove features whose risk or evidence burden exceeds current capacity.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Document why a multi-tool agent, personalization feature, or sensitive data source is deferred rather than hiding it as unfinished work. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Which artifact best supports a “ready to demo” claim?", ["A single polished screenshot with no failure cases","Metrics on representative cases plus recovery paths","A promise that the model is smart enough in general","A hidden prompt nobody else can inspect"], 1, "Readiness needs reproducible evidence and known limits.") },
      { id: "studio-defense", kicker: "Synthesize", title: "Defend capstone readiness", body: `Capstone studio converts a broad AI idea into one narrow, complete, testable vertical slice. The central discipline is to build evidence and risk controls alongside the feature.

**Teaching focus — connect scope, vertical slice, evaluation, risks, ownership, and next milestone.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: The project is ready for review when another person can reproduce its claim, inspect its limits, and understand what happens after failure. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Why run a focused red-team session before studio day?", ["Red teams are only for companies with security staff","Abuse and hard cases reveal gaps while you can still fix them","Red-teaming replaces the need for any metric table while skippi","It guarantees the system will pass every future audit"], 1, "Find failures before the defense, not during it.") }
    ],
  },
  bigIdeas: ["Finish a narrow vertical slice excellently — depth beats theater.", "Evaluation and risk notes are part of the product.", "Cut scope until the evidence packet is honest and runnable."],
  keyTerms: [{"term": "Vertical slice", "definition": "An end-to-end thin version of the product that can be evaluated."}, {"term": "Risk register", "definition": "Documented failure modes, privacy notes, and oversight."}, {"term": "Evidence packet", "definition": "Brief, metrics, failures, and run instructions that support claims."}],
  realWorld: "Internship portfolios that show eval tables beat vague ChatGPT screenshots.",
  quiz: [
    { id: "q1", question: "Best scoped capstone for a two-week build?", choices: ["An unscoped agent that claims to do everything AI can do","A club FAQ with RAG, citations, and a small eval set","A giant net trained from scratch with no labeled data","Demo screenshots only, with metrics postponed until later"], correctIndex: 1, explanation: "Finishable scope plus evidence beats theater." },
    { id: "q2", question: "What must a capstone README include?", choices: ["Only screenshots and a catchy project title, even thoug","How to run, what data, metrics, and known limitations","Production secrets pasted in plaintext for graders","A promise that the system has no limitations section"], correctIndex: 1, explanation: "Runnable and honest documentation is part of the grade." },
    { id: "q3", question: "Teammate wants multimodal agents, fine-tuning, and a mobile app in two weeks. Best move?", choices: ["Keep the full scope and sleep less until everything ships","Cut to one vertical slice with eval cases and risk notes","Skip evaluation so there is more time for animations","Start three repos so each person can invent a different product"], correctIndex: 1, explanation: "Depth on a thin slice is the advanced studio move." },
    { id: "q4", question: "When should the evaluation set be authored?", choices: ["After the UI polish is finished and screenshots look great","Before polish, so success criteria drive the build","Never, if the demo path works once on a laptop","Only if a teacher explicitly grades the CSV file"], correctIndex: 1, explanation: "Eval-first keeps the slice honest." },
    { id: "q5", question: "What belongs in a capstone risk register?", choices: ["Only the names of libraries used in package.json","Failure modes, privacy notes, oversight","A statement that risks disappear after the demo day","GPU benchmarks with no link to user harm"], correctIndex: 1, explanation: "Risk notes show mature judgment." },
    { id: "q6", question: "Which artifact best supports a “ready to demo” claim?", choices: ["A single polished screenshot with no failure cases","Metrics on representative cases plus recovery paths","A promise that the model is smart enough in general","A hidden prompt nobody else can inspect"], correctIndex: 1, explanation: "Readiness needs reproducible evidence and known limits." },
    { id: "q7", question: "Why run a focused red-team session before studio day?", choices: ["Red teams are only for companies with security staff","Abuse and hard cases reveal gaps while you can still fix them","Red-teaming replaces the need for any metric table while skippi","It guarantees the system will pass every future audit"], correctIndex: 1, explanation: "Find failures before the defense, not during it." }
  ],
  reflection: { prompt: "Write your capstone one-pager: user, task, method, metric, risk, and demo path.", placeholder: "Write your answer…" },
};
