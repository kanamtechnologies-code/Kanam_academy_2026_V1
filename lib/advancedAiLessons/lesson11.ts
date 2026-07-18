import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const advancedAiLesson11: AILessonConfig = {
  id: "aai-11",
  title: "11. Bias Audits & Fairness Metrics",
  goal: "Measure subgroup outcomes, identify harm mechanisms, and defend a fairer deployment decision.",
  xpReward: 550,
  badge: "Fairness Auditor",
  dashboardHref: "/dashboard",
  prevHref: "/learn/advanced-ai/10",
  nextHref: "/learn/advanced-ai/12",
  lessonModule: {
    durationLabel: "~40–50 min lesson",
    sections: [
      { id: "audit-scope", kicker: "Roadmap", title: "Set the audit scope and decision", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — name the affected population, benefit or burden, and authority being evaluated.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: For an application-review queue, determine whether the score changes access to timely human help, not merely whether it sorts records. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-11.png", imageAlt: "Students and an instructor planning an Advanced AI 11 project around a whiteboard." },
      { id: "governed-slices", kicker: "Governance", title: "Choose meaningful, lawful slices", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — define cohorts with privacy review and a clear harm hypothesis.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Possible slices include application channel, language preference, campus, and accessibility use; protected-trait data needs lawful collection and governance. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "subgroup-matrix", kicker: "Metrics", title: "Compute subgroup confusion matrices", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — use TP, FP, TN, and FN counts before comparing rates.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Group A has TP=45 and FN=5 while Group B has TP=18 and FN=12; the recall gap reveals unequal missed opportunities. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Average accuracy is high but Group A recall is poor. Best response?", ["Publish only the average so leadership stays confident longer","Investigate causes, report slice metrics, mitigate or delay","Remove Group A from the test set to clean the dashboard view","Assume deep learning makes fairness automatic over enough time"], 1, "Fairness work starts with slice measurement and honest reporting.") },
      { id: "metric-tradeoffs", kicker: "Concept", title: "Compare competing fairness metrics", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — teach why parity definitions can conflict in real populations.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Demographic parity asks who receives positives; equal opportunity asks who is found among true positives; FPR parity asks who is wrongly flagged; calibration asks score meaning. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "harm-pathway", kicker: "Causality", title: "Trace the harm pathway", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — connect a gap to collection, labeling, workflow, and lived consequence.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Lower recall for mobile uploads may arise from scanner access, form design, label practices, or the model; tuning a threshold alone may miss the cause. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-11-b.png", imageAlt: "A realistic classroom lab screen showing lesson 11 notes, examples, and evidence.", checkIn: check("What is a proxy feature risk?", ["ZIP code or similar fields standing in for sensitive traits","Using too many GPUs during a weekend model-training job run","Writing documentation that mentions fairness metrics clearly","Splitting data into train and test before any model fitting"], 0, "Proxies can encode protected attributes indirectly.") },
      { id: "representativeness", kicker: "Data", title: "Audit representation and missingness", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — inspect who is absent or poorly measured before modeling.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: If rural submissions have more missing fields, dropping them creates an urban-only system and can convert collection inequality into model performance. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "proxy-features", kicker: "Mechanism", title: "Find proxy pathways", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — recognize that removing a protected column does not erase social signals.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: ZIP code, device type, school attended, language pattern, and prior access can correlate with protected traits and historical disadvantage. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Why is “average-only fairness” a weak claim?", ["Averages cannot be computed on ordinary classification tasks","Strong global scores can hide uneven errors across groups","Fairness metrics forbid reporting any overall number ever","Slice metrics are only for image models, never text models"], 1, "Disparate harm hides inside averages.") },
      { id: "intervals", kicker: "Evidence", title: "Report counts and uncertainty", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — avoid strong claims from tiny subgroup samples.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A rate from seven cases needs its numerator, denominator, confidence interval or uncertainty note, and a plan to gather better evidence. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "experience", kicker: "People", title: "Measure user experience as well as outcomes", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — include delay, confusion, stigma, correction burden, and appeal access.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Two groups may receive similar scores while one group waits longer for review or has less ability to challenge an error. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-fairness.png", imageAlt: "An educational lab visualization illustrating a key lesson 11 mechanism with annotated screens." },
      { id: "average-trap", kicker: "Failure mode", title: "Reject average-only fairness claims", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — expose how a green aggregate can conceal concentrated harm.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A 92% accurate queue with 55% recall for English learners can automate an existing barrier into less access to assistance. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("When should an audit recommend do not deploy?", ["Never, if the demo impressed executives in the room","When remaining slice harms exceed agreed limits after mitigation","Only if the model file is larger than one gigabyte","Only when the team forgot to pick a badge name, even though it ign"], 1, "Responsible auditors can say no.") },
      { id: "mitigations", kicker: "Mitigation", title: "Evaluate interventions and tradeoffs", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — compare data, target, workflow, threshold, review, scope, and non-deployment responses.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A mitigation can include better collection, a changed target definition, accessible intake, human review, narrower authority, or stopping the use case. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "affected-review", kicker: "Participation", title: "Include affected people in review", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — treat users and frontline staff as evidence holders.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Students and counselors can identify harms that dashboards miss, such as humiliating error messages or an appeal process that requires unavailable documentation. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "do-not-deploy", kicker: "Governance", title: "Write a do-not-deploy criterion", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — recognize when a system cannot be responsibly repaired within its intended use.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: If errors can deny a scarce opportunity and the team cannot measure or mitigate subgroup harm, human-only handling or no deployment may be required. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-11-c.png", imageAlt: "Learners reviewing a worked AI system example on a monitor with notes and evidence.", checkIn: check("Order the core fairness audit loop.", ["Mitigate first, then invent metrics that look good while skipping","Scope harms → measure slices → investigate → mitigate → monitor","Deploy first, then audit if users complain publicly","Delete slice tables, then claim parity was achieved"], 1, "Measurement and investigation precede mitigation claims.") },
      { id: "monitoring", kicker: "Operations", title: "Monitor fairness after release", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — anticipate that policy, population, and collection changes can alter results.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Name the owner, review cadence, alert threshold, pause authority, and user-correction channel before launch. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "audit-report", kicker: "Communication", title: "Write an audit report that can be challenged", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — show methodology, slices, assumptions, exclusions, findings, and residual risk.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A reviewer should be able to trace each claim from cohort definition through counts to the proposed action. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "case-review", kicker: "Lab", title: "Run a disparity case review", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — practice moving from a measured gap to a multi-cause investigation.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Give teams a recall gap and ask them to propose data, process, interface, and governance hypotheses before suggesting a model change. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Leadership wants to ship despite unresolved slice gaps. Best engineer response?", ["Hide the slice table and celebrate the press release","Delay or narrow scope; document residual risk; keep human review","Delete the audit notes so the repo looks cleaner, even though it i","Promise fairness will appear automatically after launch"], 1, "Evidence and harm reduction beat marketing timelines.") },
      { id: "fairness-defense", kicker: "Synthesize", title: "Defend a fair or no-deploy decision", body: `A bias audit asks how a system distributes errors, burdens, and opportunities across real people and conditions. Fairness is not proved by good intent or a single overall accuracy number.

**Teaching focus — state what remains unequal, who bears it, and who owns the next review.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Finish with a bounded recommendation supported by metrics, lived-experience evidence, mitigation limits, and a clear escalation path. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("What should residual risk documentation include?", ["Only the names of the models that were not chosen","Known remaining harms, who is affected, and monitoring plans","A statement that residual risk is always zero after mitigation","Marketing quotes from the vendor’s homepage"], 1, "Honesty about leftover risk is part of advanced practice.") }
    ],
  },
  bigIdeas: ["Average metrics can hide uneven harms — measure slices.", "Proxy features can encode protected traits indirectly.", "A responsible audit can recommend do not deploy."],
  keyTerms: [{"term": "Subgroup metric", "definition": "Performance measured on a meaningful slice of people or conditions."}, {"term": "Proxy feature", "definition": "A variable that stands in for a sensitive attribute indirectly."}, {"term": "Residual risk", "definition": "Risk remaining after mitigations — must be documented."}, {"term": "Disparate impact", "definition": "Uneven harmful outcomes across groups even without explicit intent."}],
  realWorld: "High-stakes triage and lending tools have shipped unfair systems when teams celebrated global accuracy alone.",
  quiz: [
    { id: "q1", question: "Average accuracy is high but Group A recall is poor. Best response?", choices: ["Publish only the average so leadership stays confident longer","Investigate causes, report slice metrics, mitigate or delay","Remove Group A from the test set to clean the dashboard view","Assume deep learning makes fairness automatic over enough time"], correctIndex: 1, explanation: "Fairness work starts with slice measurement and honest reporting." },
    { id: "q2", question: "What is a proxy feature risk?", choices: ["ZIP code or similar fields standing in for sensitive traits","Using too many GPUs during a weekend model-training job run","Writing documentation that mentions fairness metrics clearly","Splitting data into train and test before any model fitting"], correctIndex: 0, explanation: "Proxies can encode protected attributes indirectly." },
    { id: "q3", question: "Why is “average-only fairness” a weak claim?", choices: ["Averages cannot be computed on ordinary classification tasks","Strong global scores can hide uneven errors across groups","Fairness metrics forbid reporting any overall number ever","Slice metrics are only for image models, never text models"], correctIndex: 1, explanation: "Disparate harm hides inside averages." },
    { id: "q4", question: "When should an audit recommend do not deploy?", choices: ["Never, if the demo impressed executives in the room","When remaining slice harms exceed agreed limits after mitigation","Only if the model file is larger than one gigabyte","Only when the team forgot to pick a badge name, even though it ign"], correctIndex: 1, explanation: "Responsible auditors can say no." },
    { id: "q5", question: "Order the core fairness audit loop.", choices: ["Mitigate first, then invent metrics that look good while skipping","Scope harms → measure slices → investigate → mitigate → monitor","Deploy first, then audit if users complain publicly","Delete slice tables, then claim parity was achieved"], correctIndex: 1, explanation: "Measurement and investigation precede mitigation claims." },
    { id: "q6", question: "Leadership wants to ship despite unresolved slice gaps. Best engineer response?", choices: ["Hide the slice table and celebrate the press release","Delay or narrow scope; document residual risk; keep human review","Delete the audit notes so the repo looks cleaner, even though it i","Promise fairness will appear automatically after launch"], correctIndex: 1, explanation: "Evidence and harm reduction beat marketing timelines." },
    { id: "q7", question: "What should residual risk documentation include?", choices: ["Only the names of the models that were not chosen","Known remaining harms, who is affected, and monitoring plans","A statement that residual risk is always zero after mitigation","Marketing quotes from the vendor’s homepage"], correctIndex: 1, explanation: "Honesty about leftover risk is part of advanced practice." }
  ],
  reflection: { prompt: "Describe one slice you would measure for a review-queue model and what evidence would make you delay deploy.", placeholder: "Write your answer…" },
};
