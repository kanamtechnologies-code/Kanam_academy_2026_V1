import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const advancedAiLesson13: AILessonConfig = {
  id: "aai-13",
  title: "13. MLOps Lite: Deploy, Monitor, Drift",
  goal: "Release a model with versions, operational metrics, drift monitoring, rollback, and clear ownership.",
  xpReward: 650,
  badge: "Ship Watcher",
  dashboardHref: "/dashboard",
  prevHref: "/learn/advanced-ai/12",
  nextHref: "/learn/advanced-ai/14",
  instructorScript: `**Coach's note**
Today's lesson: **MLOps Lite: Deploy, Monitor, Drift**.

**Goal:** Release a model with versions, operational metrics, drift monitoring, rollback, and clear ownership.

**How to facilitate**
1. Warm-up: ask students what they already think about "Write the production operating contract".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~40–50 min lesson",
    sections: [
      { id: "operating-contract", kicker: "Roadmap", title: "Write the production operating contract", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — define what is deployed, who owns it, and what safe service means.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A classifier contract names inputs, threshold, intended action, review band, uptime expectation, quality target, and pause authority. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-13.png", imageAlt: "Students and an instructor planning an Advanced AI 13 project around a whiteboard." },
      { id: "full-version", kicker: "Versioning", title: "Version the full system", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — record code, feature schema, data snapshot, artifact, prompt, threshold, environment, and dependencies.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: “Model v2” cannot reproduce a decision if the form fields, embedding index, or post-processing rule also changed. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "deploy-criteria", kicker: "Release", title: "Set promotion criteria", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — require offline quality, safety, compatibility, and operational checks before traffic.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A candidate needs passing regression tests, schema compatibility, subgroup review, latency budget, rollback readiness, and named approver. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Live precision collapses after a form redesign. First move?", ["Assume launch quality lasts forever and ignore dashboards","Treat it as drift: investigate, consider rollback, then retrain","Delete monitoring so the incident cannot be measured, even though","Retrain only when marketing requests a new press quote"], 1, "Shipping starts measurement; environment changes break models.") },
      { id: "canary", kicker: "Deployment", title: "Use a canary and staged rollout", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — limit exposure while comparing a candidate with the known version.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Route five percent of eligible traffic to the new classifier, sample decisions, and stop expansion when quality or safety gates fail. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "observability", kicker: "Metrics", title: "Monitor operational, data, quality, and outcome signals", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — avoid treating uptime as proof of useful behavior.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Track p95 latency and errors, missing fields and feature distributions, reviewed precision/recall, queue time, appeal rate, and user corrections. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-13-b.png", imageAlt: "A realistic classroom lab screen showing lesson 13 notes, examples, and evidence.", checkIn: check("What should be versioned together for a release?", ["Only the UI color palette used in screenshots","Dataset, model, config, and preprocessing artifacts","Personal passwords stored beside the model checkpoint","Whatever files happen to be open in the editor"], 1, "Releases are reproducible bundles, not lone weight files.") },
      { id: "drift-types", kicker: "Concept", title: "Differentiate drift types", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — separate changed inputs, changed outcomes, and changed relationships.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A new password portal shifts ticket vocabulary, changes issue prevalence, and may invalidate old relationships between phrases and routing labels. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "data-quality", kicker: "Data", title: "Detect schema and data-quality regressions", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — treat blank, malformed, or reordered fields as production incidents.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: After an intake-form update, a missing-field spike can silently route cases incorrectly even while API uptime remains perfect. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Error budget is burned and urgent routing is harmed. Best action?", ["Leave the bad version up so the launch announcement stays true","Roll back to the last good version, page the owner, write notes","Silence alerts until the week’s demo schedule ends, which often h","Retrain on production labels without any incident review"], 1, "Rollback plus ownership is mature MLOps.") },
      { id: "quality-labels", kicker: "Evidence", title: "Design delayed-label quality monitoring", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — sample production cases with privacy-reviewed human labels.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Without post-launch labels, a dashboard can show fast successful requests while the model steadily makes harmful classification errors. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "alerting", kicker: "Operations", title: "Attach owners and actions to alerts", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — make an alert a decision trigger rather than a decorative chart.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: For each threshold specify who receives it, how quickly they investigate, what evidence they gather, and when automation is paused. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-mlops.png", imageAlt: "An educational lab visualization illustrating a key lesson 13 mechanism with annotated screens." },
      { id: "incident-runbook", kicker: "Recovery", title: "Practice an incident runbook", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — contain harm, preserve evidence, communicate, and choose rollback or repair.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: When recall drops below its gate, pause automation, preserve versions and samples, measure affected users, then roll back before retraining. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Which signals help detect drift before labels arrive?", ["Only the CEO’s opinion of the product homepage","Input distributions, confidence shifts","The number of likes on the announcement post","Whether the model file name includes the word final"], 1, "Operational and data monitors can flag change early.") },
      { id: "rollback", kicker: "Control", title: "Test rollback before the incident", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — verify that recovery restores the prior artifact, configuration, threshold, and routes.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A button that only changes a model file is insufficient if the old feature schema or retrieval index is unavailable. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "retraining", kicker: "Lifecycle", title: "Control retraining as a release", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — treat new data as a candidate artifact rather than automatic improvement.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Revalidate labels, leakage, subgroup outcomes, compatibility, and the complete eval suite before promoting a retrained model. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "ownership", kicker: "People", title: "Assign operational ownership", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — separate product, model, data, security, and on-call responsibilities.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A dashboard without a person empowered to pause the system is observation without accountability. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-13-c.png", imageAlt: "Learners reviewing a worked AI system example on a monitor with notes and evidence.", checkIn: check("Why assign an operational owner for a deployed model?", ["Owners make accuracy automatically rise each week","Someone must respond to alerts, rollbacks","Ownership removes the need for any offline evaluation","Owners exist only to approve marketing screenshots"], 1, "Production systems need accountable operators.") },
      { id: "change-management", kicker: "Governance", title: "Manage upstream and downstream changes", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — notice that form edits, policy changes, and staff workflows can alter model behavior.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Require change notices and compatibility tests when a source system changes a field, taxonomy, or access rule. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "postmortem", kicker: "Learning", title: "Run a blameless technical postmortem", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — turn an incident into a durable control and regression case.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Document timeline, contributing mechanisms, affected groups, containment, missing signals, and the test that should prevent recurrence. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "limited-release", kicker: "Decision", title: "Choose a limited release when evidence is narrow", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — bound traffic, authority, time, and monitoring while learning safely.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A pilot can restrict a model to one queue with mandatory review and daily quality sampling instead of a global automated decision. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("What is a limited release good for?", ["Hiding known failures from every stakeholder forever","Learning under bounded risk when evidence is still narrow","Skipping monitoring because fewer users means zero risk","Avoiding version control until the model is perfect, which "], 1, "Canary/limited release is a risk control, not a PR trick.") },
      { id: "mlops-defense", kicker: "Synthesize", title: "Defend an operated release", body: `MLOps turns a model into an operated system: versions make behavior traceable, monitoring makes change visible, and rollback keeps a bad release from becoming prolonged harm.

**Teaching focus — show versions, gates, monitoring, rollback evidence, residual risk, and named owners.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A release is defensible only when the team can explain what changed, detect degradation, and reverse it under pressure. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Which claim matches MLOps lite?", ["Launch ends the need for measurement and ownership","Version, monitor, alert","Dashboards are optional if the training loss was low","Drift only happens to models trained without GPUs"], 1, "Operation is part of the system, not an afterthought.") }
    ],
  },
  bigIdeas: ["Shipping starts measurement — version artifacts and watch drift.", "Error budgets and owners make alerts actionable.", "Rollback is a feature, not a failure of nerve."],
  keyTerms: [{"term": "Drift", "definition": "A change in input or performance distributions after deploy."}, {"term": "Rollback", "definition": "Restoring a previous known-good model/config version."}, {"term": "Error budget", "definition": "Allowed failure rate before an incident response is required."}, {"term": "Model versioning", "definition": "Tracking dataset, config, and model artifacts as a release unit."}],
  realWorld: "Help-desk classifiers break when forms change — teams without monitoring discover it from angry users.",
  quiz: [
    { id: "q1", question: "Live precision collapses after a form redesign. First move?", choices: ["Assume launch quality lasts forever and ignore dashboards","Treat it as drift: investigate, consider rollback, then retrain","Delete monitoring so the incident cannot be measured, even though","Retrain only when marketing requests a new press quote"], correctIndex: 1, explanation: "Shipping starts measurement; environment changes break models." },
    { id: "q2", question: "What should be versioned together for a release?", choices: ["Only the UI color palette used in screenshots","Dataset, model, config, and preprocessing artifacts","Personal passwords stored beside the model checkpoint","Whatever files happen to be open in the editor"], correctIndex: 1, explanation: "Releases are reproducible bundles, not lone weight files." },
    { id: "q3", question: "Error budget is burned and urgent routing is harmed. Best action?", choices: ["Leave the bad version up so the launch announcement stays true","Roll back to the last good version, page the owner, write notes","Silence alerts until the week’s demo schedule ends, which often h","Retrain on production labels without any incident review"], correctIndex: 1, explanation: "Rollback plus ownership is mature MLOps." },
    { id: "q4", question: "Which signals help detect drift before labels arrive?", choices: ["Only the CEO’s opinion of the product homepage","Input distributions, confidence shifts","The number of likes on the announcement post","Whether the model file name includes the word final"], correctIndex: 1, explanation: "Operational and data monitors can flag change early." },
    { id: "q5", question: "Why assign an operational owner for a deployed model?", choices: ["Owners make accuracy automatically rise each week","Someone must respond to alerts, rollbacks","Ownership removes the need for any offline evaluation","Owners exist only to approve marketing screenshots"], correctIndex: 1, explanation: "Production systems need accountable operators." },
    { id: "q6", question: "What is a limited release good for?", choices: ["Hiding known failures from every stakeholder forever","Learning under bounded risk when evidence is still narrow","Skipping monitoring because fewer users means zero risk","Avoiding version control until the model is perfect, which "], correctIndex: 1, explanation: "Canary/limited release is a risk control, not a PR trick." },
    { id: "q7", question: "Which claim matches MLOps lite?", choices: ["Launch ends the need for measurement and ownership","Version, monitor, alert","Dashboards are optional if the training loss was low","Drift only happens to models trained without GPUs"], correctIndex: 1, explanation: "Operation is part of the system, not an afterthought." }
  ],
  reflection: { prompt: "Write a mini runbook: metric to watch, alert threshold, owner, and rollback step for a ticket router.", placeholder: "Write your answer…" },
};
