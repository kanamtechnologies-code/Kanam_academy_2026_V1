import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const advancedAiLesson14: AILessonConfig = {
  id: "aai-14",
  title: "14. Multimodal & Tool-Using Systems",
  goal: "Join vision, language, and APIs with typed handoffs and end-to-end validation.",
  xpReward: 700,
  badge: "Systems Integrator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/advanced-ai/13",
  nextHref: "/learn/advanced-ai/15",
  lessonModule: {
    durationLabel: "~40–50 min lesson",
    sections: [
      { id: "workflow-map", kicker: "Roadmap", title: "Map the end-to-end workflow", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — identify every modality, state transition, tool, and human gate.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A repair form flows from photo to OCR, schema validation, text reasoning, maintenance draft, approval, and ticket status. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-14.png", imageAlt: "Students and an instructor planning an Advanced AI 14 project around a whiteboard." },
      { id: "contracts", kicker: "Schemas", title: "Define typed contracts at each seam", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — make data shape, allowed values, provenance, and errors explicit.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A structured record contains room ID, issue category, confidence scoped to extraction, photo reference, and an \`unknown\` value rather than a guess. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "modality-fit", kicker: "Concept", title: "Match modality to its evidence", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — teach what images, text, and tools can and cannot establish.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: An image can show visible damage, text can add context, and an API can show current ticket state; none alone proves a hidden cause. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Photo → raw OCR text → create_ticket with no checks. What’s wrong?", ["Photos can never be used as inputs to software systems","Unvalidated raw text should not trigger real-world side effects","Tickets cannot be digital in modern maintenance workflows","Vision models legally forbid any schema definitions without check"], 1, "Validate at seams before actions that change work queues.") },
      { id: "ocr-validation", kicker: "Validation", title: "Validate extraction before reasoning", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — catch plausible transcription errors at the boundary.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: OCR may read \`B-204\` as \`8-204\`; validate against allowed rooms and show the extracted value for correction before any work order exists. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "uncertainty", kicker: "Mechanism", title: "Preserve local uncertainty", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — prevent one component’s confidence from becoming a universal trust score.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A high OCR score means the characters were likely read correctly; it does not prove safety urgency, repair priority, or user intent. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-14-b.png", imageAlt: "A realistic classroom lab screen showing lesson 14 notes, examples, and evidence.", checkIn: check("Where do multimodal systems usually fail?", ["Only inside undocumented GPU microcode while skipping the ac","At seams where unvalidated outputs pass between components","Only when the UI uses a serif font in captions","Never, if the product homepage looks polished, which often h"], 1, "Interface contracts between components are the weak points.") },
      { id: "seam-hallucination", kicker: "Failure mode", title: "Detect seam hallucination", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — show how an uncertain observation becomes an overconfident downstream claim.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A vision model says “possible smoke,” then text reasoning says “confirmed fire”; preserve the qualifier and follow the emergency protocol. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "tool-schema", kicker: "Tools", title: "Constrain tool calls with schemas", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — require validated parameters, allowlists, idempotency keys, and predictable errors.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: The maintenance API accepts a known room, approved category, and request ID; it rejects an invented room or duplicate submission. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Why preserve local uncertainty from a vision extractor?", ["Uncertainty always means the entire pipeline must crash","Downstream steps should know when a field is unreliable","Uncertainty scores replace the need for human confirmation","Logging uncertainty violates every privacy policy"], 1, "Hiding uncertainty causes false confidence later in the chain.") },
      { id: "idempotency", kicker: "Operations", title: "Design for retries and asynchronous state", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — avoid duplicate external effects when tools time out.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A retry must return the original ticket for the same client request ID, while state records pending, validated, approved, sent, or failed. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "privacy-flow", kicker: "Privacy", title: "Minimize data across modality boundaries", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — pass only the needed derivative data to each component.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Crop irrelevant faces, strip metadata when unnecessary, retain photo access by purpose, and send a room ID—not the raw image—to the ticket tool. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-confusion.png", imageAlt: "An educational lab visualization illustrating a key lesson 14 mechanism with annotated screens." },
      { id: "e2e-suite", kicker: "Testing", title: "Build an end-to-end adversarial suite", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — test complete workflows, not isolated component accuracy.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Include a blurry photo, missing room, duplicate report, non-maintenance image, person in frame, tool timeout, and hostile text embedded in a label. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Best order for a safe photo-to-ticket workflow?", ["Create the ticket first, then invent missing fields with an LLM","Capture → extract → validate schema → draft → human confirm","Skip validation if the photo resolution looks high enough","Email contractors automatically from untrusted OCR text"], 1, "Validation and confirmation come before side effects.") },
      { id: "provenance", kicker: "Traceability", title: "Capture provenance for every action", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — make later diagnosis locate the exact failing seam.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Record source asset ID, extraction version, validation result, reasoning decision, tool request ID, approval, and final status. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "human-gates", kicker: "Authority", title: "Place humans at consequential seams", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — separate drafting, validation, and irreversible execution.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A model can prepare a maintenance request, while an authorized coordinator confirms safety classification and releases the actual work order. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "error-routing", kicker: "Recovery", title: "Route failures to usable recovery paths", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — design corrections instead of quietly dropping ambiguous inputs.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: When room validation fails, ask the submitter to choose from a list; when the tool fails, preserve the draft and show status rather than claiming completion. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, image: "/images/lessons/aai-14-c.png", imageAlt: "Learners reviewing a worked AI system example on a monitor with notes and evidence.", checkIn: check("What should an end-to-end adversarial suite include?", ["Only sunny, perfectly cropped forms from the training set","Corrupt files, missing fields","A single happy-path screenshot for the portfolio","Random internet images with no expected safe behavior"], 1, "Adversarial cases prove recovery paths exist.") },
      { id: "integration-audit", kicker: "Audit", title: "Audit seam-specific access and consent", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — review how each service receives, stores, and reuses multimodal data.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A photo may contain names or faces, so notice, retention, deletion, vendor access, and staff viewing rights must be defined. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "observability", kicker: "Monitoring", title: "Observe workflow health by stage", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — measure where latency, failure, and correction concentrate.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Track extraction rejection rate, validation failures, approval delays, duplicate prevention, API errors, and user corrections rather than one generic success rate. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.` },
      { id: "vertical-demo", kicker: "Lab", title: "Demonstrate a vertical slice honestly", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — show one normal case, one seam failure, and the recovery.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: Narrate the typed state at each boundary so reviewers can see why the system stopped or progressed. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("When should a human confirm a maintenance ticket?", ["Never, if the model’s confidence number looks high","Before create/update actions that change real work orders","Only after the ticket has already paged contractors","Only when the photo contains a recognizable face, even thou"], 1, "Side effects that change the world need confirmation gates.") },
      { id: "systems-defense", kicker: "Synthesize", title: "Defend the integrated system", body: `Multimodal and tool-using systems are workflows of seams: images, text, structured state, and APIs cross boundaries where uncertainty must be preserved and validated.

**Teaching focus — connect contracts, validations, authority, provenance, and end-to-end evidence.** Start by having learners name the decision this part of the system supports, the evidence it may use, and the person who remains accountable. Then make the mechanism concrete: A reliable multimodal workflow is not a single model claim; it is a chain whose weakest unvalidated handoff sets the safety limit. Ask students to distinguish an observation from an interpretation and an interpretation from a release decision. This prevents a metric, model score, or dashboard color from quietly becoming an authorization to act.

| Instructor prompt | Evidence to collect | Safe response when evidence is weak |
| --- | --- | --- |
| What changed or is being tested? | Versioned inputs, configuration, and timestamp | Hold the change; preserve the trace |
| Which users or cases could differ? | Tagged cases, subgroup/slice counts, error examples | Route to review; expand the test set |
| What action follows this result? | Named owner, threshold, and documented rationale | Escalate rather than infer or retry blindly |

**Procedure.** (1) Freeze a small, representative set of cases before inspecting results. (2) Run the system with a recorded configuration and save raw outputs, not only summaries. (3) Score against an explicit rubric or contract. (4) Slice the result by the condition most likely to hide a failure. (5) Read the failures aloud: explain what the system did, why that matters to a user, and whether the fix belongs in data, policy, interface, permissions, or operations. (6) Write a pass, limited-pilot, redesign, or do-not-deploy decision with an owner and next review date.

**Worked reasoning.** A team can report a strong average and still have an unsafe system if its hard cases are missing, its inputs changed, or its recovery path is undefined. Treat the result as a claim with scope: “under this version, on these cases, using this rubric, this behavior was observed.” That wording makes the claim reproducible and challengeable. It also makes room for a responsible non-release when residual harm, uncertainty, or operational capacity exceeds the benefit.

**Instructor move.** Have pairs swap evidence packets and try to invalidate one another’s conclusion. They should ask for the exact case ID, source or data version, threshold, failure example, and accountable owner. If the team cannot answer one of those questions, the missing artifact—not a more impressive model—is the next engineering task.`, checkIn: check("Which statement shows systems-integrator judgment?", ["Trust every component output because each model is modern","Typed handoffs, validation","Skip end-to-end tests if unit tests of the LLM prompt pass","Multimodal means privacy rules no longer apply to images"], 1, "Integration quality is designed, not assumed.") }
    ],
  },
  bigIdeas: ["Most multimodal failures happen at seams between components.", "Validate schemas before side effects.", "Human confirm for actions that change the real world."],
  keyTerms: [{"term": "Schema validation", "definition": "Checking extracted fields against required types and rules before acting."}, {"term": "Typed handoff", "definition": "Passing structured data between components with explicit contracts."}, {"term": "End-to-end test", "definition": "A test from raw input through final action, not only one model in isolation."}],
  realWorld: "Photo-to-ticket systems create chaos when OCR garbage becomes work orders with no validation gate.",
  quiz: [
    { id: "q1", question: "Photo → raw OCR text → create_ticket with no checks. What’s wrong?", choices: ["Photos can never be used as inputs to software systems","Unvalidated raw text should not trigger real-world side effects","Tickets cannot be digital in modern maintenance workflows","Vision models legally forbid any schema definitions without check"], correctIndex: 1, explanation: "Validate at seams before actions that change work queues." },
    { id: "q2", question: "Where do multimodal systems usually fail?", choices: ["Only inside undocumented GPU microcode while skipping the ac","At seams where unvalidated outputs pass between components","Only when the UI uses a serif font in captions","Never, if the product homepage looks polished, which often h"], correctIndex: 1, explanation: "Interface contracts between components are the weak points." },
    { id: "q3", question: "Why preserve local uncertainty from a vision extractor?", choices: ["Uncertainty always means the entire pipeline must crash","Downstream steps should know when a field is unreliable","Uncertainty scores replace the need for human confirmation","Logging uncertainty violates every privacy policy"], correctIndex: 1, explanation: "Hiding uncertainty causes false confidence later in the chain." },
    { id: "q4", question: "Best order for a safe photo-to-ticket workflow?", choices: ["Create the ticket first, then invent missing fields with an LLM","Capture → extract → validate schema → draft → human confirm","Skip validation if the photo resolution looks high enough","Email contractors automatically from untrusted OCR text"], correctIndex: 1, explanation: "Validation and confirmation come before side effects." },
    { id: "q5", question: "What should an end-to-end adversarial suite include?", choices: ["Only sunny, perfectly cropped forms from the training set","Corrupt files, missing fields","A single happy-path screenshot for the portfolio","Random internet images with no expected safe behavior"], correctIndex: 1, explanation: "Adversarial cases prove recovery paths exist." },
    { id: "q6", question: "When should a human confirm a maintenance ticket?", choices: ["Never, if the model’s confidence number looks high","Before create/update actions that change real work orders","Only after the ticket has already paged contractors","Only when the photo contains a recognizable face, even thou"], correctIndex: 1, explanation: "Side effects that change the world need confirmation gates." },
    { id: "q7", question: "Which statement shows systems-integrator judgment?", choices: ["Trust every component output because each model is modern","Typed handoffs, validation","Skip end-to-end tests if unit tests of the LLM prompt pass","Multimodal means privacy rules no longer apply to images"], correctIndex: 1, explanation: "Integration quality is designed, not assumed." }
  ],
  reflection: { prompt: "Design a photo→ticket flow with one schema check, one human gate, and one failure recovery message.", placeholder: "Write your answer…" },
};
