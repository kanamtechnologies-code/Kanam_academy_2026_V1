import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const advancedAiLesson10: AILessonConfig = {
  id: "aai-10",
  title: "10. Fine-Tuning vs Prompting vs RAG",
  goal: "Choose prompting, retrieval, or fine-tuning by locating the actual capability gap.",
  xpReward: 500,
  badge: "Stack Chooser",
  dashboardHref: "/dashboard",
  prevHref: "/learn/advanced-ai/9",
  nextHref: "/learn/advanced-ai/11",
  instructorScript: `**Coach's note**
Today's lesson: **Fine-Tuning vs Prompting vs RAG**.

**Goal:** Choose prompting, retrieval, or fine-tuning by locating the actual capability gap.

**How to facilitate**
1. Warm-up: ask students what they already think about "Diagnose the capability gap".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~40–50 min lesson",
    sections: [
      { id: "capability-gap", kicker: "Roadmap", title: "Diagnose the capability gap", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — identify what is actually missing before selecting a technique.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A campus assistant has changing policy facts, inconsistent JSON formatting, and a desired friendly tone; these are three different gaps. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-10.png", imageAlt: "Students and an instructor planning an Advanced AI 10 project around a whiteboard." },
      { id: "decision-map", kicker: "Concept", title: "Map gaps to system layers", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — distinguish instruction changes, knowledge changes, and behavior changes.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Prompts steer behavior, RAG supplies versioned external evidence, and fine-tuning can teach repeated stable input-output patterns. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "prompt-baseline", kicker: "Baseline", title: "Start with a constrained prompt baseline", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — prove what instructions, examples, schemas, and validators can already achieve.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Use a system contract, canonical examples, low-temperature output, and JSON validation before adding retrieval or training. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Handbook changes monthly and answers need citations. Best first stack?", ["Fine-tune immediately because it sounds the most advanced","Prompt-only with no document sources or retrieval step","RAG over the living handbook plus a frozen eval set","Skip evaluation until after the mobile app ships"], 2, "RAG matches freshness and citations; fine-tune later if needed.") },
      { id: "prompt-limits", kicker: "Mechanism", title: "Identify the limits of prompting", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — recognize when more prose cannot solve missing or changing facts.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A prompt cannot reliably contain every monthly handbook revision, and it cannot prove that an answer was grounded in an authoritative source. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "rag-fit", kicker: "RAG", title: "Choose RAG for attributable changing knowledge", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — match retrieval to freshness, citation, and access-control needs.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A financial-aid rule changes each term, so retrieve the effective dated policy section and display its source rather than encoding it in weights. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-10-b.png", imageAlt: "A realistic classroom lab screen showing lesson 10 notes, examples, and evidence.", checkIn: check("When is fine-tuning most justified?", ["On day one, before measuring any prompting or RAG baseline","After prompting/RAG still fail a frozen eval for a residual gap","Whenever a competitor mentions fine-tuning in a blog post","As a way to avoid writing evaluation cases entirely, which often "], 1, "Escalate complexity only after simpler stacks show a measured gap.") },
      { id: "rag-costs", kicker: "Tradeoff", title: "Account for retrieval’s operational costs", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — make chunking, indexing, authorization, and grounding first-class design work.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A RAG system can fail because the supporting chunk was never indexed, was stale, was inaccessible, or was crowded out by irrelevant context. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "tuning-fit", kicker: "Fine-tuning", title: "Identify a legitimate fine-tuning use", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — separate stable behavior learning from knowledge storage.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Hundreds of reviewed support-ticket examples may justify a stable routing taxonomy after prompt and retrieval baselines show a persistent measured gap. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("What is a capability gap in stack choice?", ["The difference between two GPU prices at checkout","A specific failure proven by eval that a stronger method must fix","Any missing emoji in the system prompt template, despite offering l","The number of slides left in the lesson deck, even though it ignore"], 1, "Stack changes should target measured failures.") },
      { id: "tuning-data", kicker: "Governance", title: "Govern fine-tuning data", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — treat training examples as sensitive operational artifacts.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Check purpose, consent, licensing, redaction, retention, label quality, and whether historical staff decisions encode an undesirable policy. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "freshness", kicker: "Operations", title: "Calculate the freshness and rollback burden", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — compare how quickly each layer can safely change.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A prompt edit may take minutes, an approved re-index may take hours, and a tuned model requires training, evaluation, deployment, and rollback planning. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-confusion.png", imageAlt: "An educational lab visualization illustrating a key lesson 10 mechanism with annotated screens." },
      { id: "stack-table", kicker: "Compare", title: "Build a stack-choice table", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — make assumptions visible instead of choosing by novelty.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Compare each option on fact volatility, citation requirement, labeled-data volume, latency, cost, privacy exposure, and maintenance owner. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Why can fine-tuned weights go stale for policy Q&A?", ["Weights cannot store any language patterns at all, despite of","Document changes may not update knowledge locked in weights","Fine-tunes always delete the original base model files","Staleness only happens if temperature is set below 0.1"], 1, "Changing handbooks favor retrieval over baking text into weights.") },
      { id: "escalation", kicker: "Experiment", title: "Run an evidence-driven escalation experiment", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — add complexity only after the prior layer has been measured.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Evaluate prompt-only on formatting and reasoning cases, add RAG for fact-dependent cases, then test tuning only against the residual stable behavior failures. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "hybrid", kicker: "Architecture", title: "Use hybrids with explicit boundaries", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — prevent components from duplicating or contradicting each other.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A tuned classifier can route intent while RAG answers policy questions, but both must expose their versions and fallback behavior. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "failure-mode", kicker: "Failure mode", title: "Study stale knowledge in weights", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — show why fine-tuning is unsafe as a frequently changing rulebook.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A model trained on last year’s deadline confidently repeats it after the handbook changes; the failure is architectural, not merely grammatical. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-10-c.png", imageAlt: "Learners reviewing a worked AI system example on a monitor with notes and evidence.", checkIn: check("Best order for growing system power?", ["Fine-tune first, then maybe write a prompt, skip eval, even thoug","Prompt baseline → measure → add RAG if needed → consider tuning","Buy the largest model, then invent metrics after launch","Ship agents with all tools before defining the user task"], 1, "Choose the smallest method that passes meaningful evaluation.") },
      { id: "validation", kicker: "Controls", title: "Validate output regardless of stack", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — keep schemas, citations, permissions, and human escalation outside model promises.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A RAG answer still needs citation checks; a tuned output still needs type validation and a route for unsupported requests. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "cost-model", kicker: "Decision", title: "Budget total lifecycle cost", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — include ingestion, labeling, observability, retraining, and incident response.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A cheap first demo can become expensive if no owner can refresh sources or investigate a changed behavior after launch. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "no-tuning", kicker: "Restraint", title: "Choose the simplest passing stack", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — defend a decision not to add a component.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: If prompt plus validation meets the quality, safety, and latency gates, extra training opacity needs a measured reason. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Prompt-only answers invent fees not in the handbook. What does that suggest?", ["Raise temperature so inventiveness becomes a feature","Add retrieval/citations or another grounding mechanism","Fine-tune on random web text without an eval set","Disable refusals so every question gets a dollar amount"], 1, "Missing source grounding is a retrieval/problem-framing issue.") },
      { id: "stack-defense", kicker: "Synthesize", title: "Defend the architecture choice", body: `Prompting, retrieval, and fine-tuning change different parts of an AI system. Stack choice starts by locating whether the gap is instructions, current evidence, or stable learned behavior.

**Teaching focus — connect the chosen layer to a named gap, evidence, owner, and rollback path.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Conclude with the next experiment that would cause you to add, remove, or constrain a component. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Which claim shows advanced stack judgment?", ["Always fine-tune because simpler methods are never serious","Pick the smallest stack that passes the frozen eval gates","Avoid measuring gaps so architecture debates stay exciting","Citations are optional if the answer sounds authoritative"], 1, "Evidence-based minimalism beats complexity theater.") }
    ],
  },
  bigIdeas: ["Choose the smallest stack that passes a meaningful evaluation.", "Fresh, changing knowledge usually wants RAG before fine-tuning.", "Fine-tune only for residual gaps prompting and retrieval cannot fix."],
  keyTerms: [{"term": "Prompting", "definition": "Steering a model with instructions and examples without changing weights."}, {"term": "Fine-tuning", "definition": "Updating model weights on task data — powerful, costly, and can go stale."}, {"term": "Capability gap", "definition": "The specific failure a stronger method must fix, proven by eval."}],
  realWorld: "Monthly handbook updates punish fine-tunes and reward retrieval with citations.",
  quiz: [
    { id: "q1", question: "Handbook changes monthly and answers need citations. Best first stack?", choices: ["Fine-tune immediately because it sounds the most advanced","Prompt-only with no document sources or retrieval step","RAG over the living handbook plus a frozen eval set","Skip evaluation until after the mobile app ships"], correctIndex: 2, explanation: "RAG matches freshness and citations; fine-tune later if needed." },
    { id: "q2", question: "When is fine-tuning most justified?", choices: ["On day one, before measuring any prompting or RAG baseline","After prompting/RAG still fail a frozen eval for a residual gap","Whenever a competitor mentions fine-tuning in a blog post","As a way to avoid writing evaluation cases entirely, which often "], correctIndex: 1, explanation: "Escalate complexity only after simpler stacks show a measured gap." },
    { id: "q3", question: "What is a capability gap in stack choice?", choices: ["The difference between two GPU prices at checkout","A specific failure proven by eval that a stronger method must fix","Any missing emoji in the system prompt template, despite offering l","The number of slides left in the lesson deck, even though it ignore"], correctIndex: 1, explanation: "Stack changes should target measured failures." },
    { id: "q4", question: "Why can fine-tuned weights go stale for policy Q&A?", choices: ["Weights cannot store any language patterns at all, despite of","Document changes may not update knowledge locked in weights","Fine-tunes always delete the original base model files","Staleness only happens if temperature is set below 0.1"], correctIndex: 1, explanation: "Changing handbooks favor retrieval over baking text into weights." },
    { id: "q5", question: "Best order for growing system power?", choices: ["Fine-tune first, then maybe write a prompt, skip eval, even thoug","Prompt baseline → measure → add RAG if needed → consider tuning","Buy the largest model, then invent metrics after launch","Ship agents with all tools before defining the user task"], correctIndex: 1, explanation: "Choose the smallest method that passes meaningful evaluation." },
    { id: "q6", question: "Prompt-only answers invent fees not in the handbook. What does that suggest?", choices: ["Raise temperature so inventiveness becomes a feature","Add retrieval/citations or another grounding mechanism","Fine-tune on random web text without an eval set","Disable refusals so every question gets a dollar amount"], correctIndex: 1, explanation: "Missing source grounding is a retrieval/problem-framing issue." },
    { id: "q7", question: "Which claim shows advanced stack judgment?", choices: ["Always fine-tune because simpler methods are never serious","Pick the smallest stack that passes the frozen eval gates","Avoid measuring gaps so architecture debates stay exciting","Citations are optional if the answer sounds authoritative"], correctIndex: 1, explanation: "Evidence-based minimalism beats complexity theater." }
  ],
  reflection: { prompt: "For a policy assistant, argue prompting vs RAG vs fine-tuning using freshness, citations, cost, and eval evidence.", placeholder: "Write your answer…" },
};
