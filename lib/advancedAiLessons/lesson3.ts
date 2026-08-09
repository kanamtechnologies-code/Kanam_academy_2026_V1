import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const advancedAiLesson3: AILessonConfig = {
  id: "aai-3",
  title: "3. Train Your First Classifier",
  goal: "Train and evaluate a binary classifier using a confusion matrix, precision, recall, and threshold choices.",
  xpReward: 150,
  badge: "Model Trainer",
  dashboardHref: "/dashboard",
  prevHref: "/learn/advanced-ai/2",
  nextHref: "/learn/advanced-ai/4",
  instructorScript: `**Coach's note**
Today's lesson: **Train Your First Classifier**.

**Goal:** Train and evaluate a binary classifier using a confusion matrix, precision, recall, and threshold choices.

**How to facilitate**
1. Warm-up: ask students what they already think about "A classifier predicts a class score".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~40–50 min lesson",
    sections: [
      { id: "roadmap", kicker: "Roadmap", title: "A classifier predicts a class score", body: `A binary classifier maps features (x) to a score (p(y=1|x)). A threshold converts that score into an action. “Urgent” at 0.50 and “urgent” at 0.85 are different operating policies.

**Instructor lens — count errors before interpreting a score.** Put a 100-case review queue on the board. Suppose 20 messages are truly urgent. At one threshold the system flags 18 urgent messages and 12 normal messages; it misses 2 urgent ones and correctly leaves 68 normal messages alone. Students should fill all four confusion-matrix cells first, then calculate precision as 18/(18+12)=60% and recall as 18/(18+2)=90%. Explain each denominator in words: precision asks whether a flag earns reviewer attention; recall asks whether the real urgent cases were found.

**Why it matters:** a single percentage conceals which people wait, which staff members receive extra work, and whether the queue can operate. In the lab, require students to inspect at least five false positives and five false negatives. Label their pattern, score, likely cause, and proposed response. The response may be better training data, a clearer workflow, a review band, or a decision not to automate.`, image: "/images/lessons/aai-3.png", imageAlt: "Students and an instructor planning an Advanced AI 3 project around a whiteboard." },
      { id: "matrix", kicker: "Core concept", title: "Read all four cells of a confusion matrix", body: `| Reality / prediction | Urgent | Normal |
| --- | ---:| ---: |
| Urgent | TP | FN |
| Normal | FP | TN |

TP means a real urgent message was flagged. FN means the system missed one; in student support, that can be the most costly cell.

**Threshold worked example.** Keep the same model scores but compare two policies. At threshold 0.80, the queue catches 12 of 20 urgent messages and sends 3 normal messages for review. At 0.35, it catches 19 of 20 but sends 28 normal messages. Neither is universally “more accurate”; the lower threshold exchanges reviewer capacity for fewer missed urgent cases. Have students compute the workload and state which policy they would choose if two counselors can review 25 cases per day.

**Lab move:** compare the model against a transparent baseline, such as a keyword rule or a human triage rubric, on the identical held-out cases. Preserve the error lists. A learned classifier must show a specific improvement over the baseline, not merely produce probabilities. If it cannot explain a score’s practical meaning, use calibration checks before treating 0.80 as an 80% chance.`, checkIn: check("In an urgent-message classifier, what is a false positive?", ["An urgent message predicted as normal traffic","A normal message predicted as urgent for review","An urgent message correctly predicted as urgent","A normal message correctly left in the normal queue"], 1, "FP spends review attention on a case that is actually normal.") },
      { id: "worked", kicker: "Worked numbers", title: "Compute metrics from 200 tickets", body: `Suppose TP=32, FP=8, TN=145, FN=15. Accuracy=(TP+TN)/200=177/200=88.5%. Precision=TP/(TP+FP)=32/40=80%. Recall=TP/(TP+FN)=32/47=68.1%. Accuracy sounds strong while 15 urgent tickets were missed.

**Misconception to interrupt:** precision and recall are model personality traits. They are properties of a model, data slice, and chosen threshold together. Change the threshold, population, language mix, or labeling rule and the counts can change. Demonstrate a calibration bin: of 40 cases scored between 0.70 and 0.79, perhaps only 22 are truly positive. That score range is overconfident; staff should not interpret it as a literal probability without evidence.

**In the lab:** create a three-way policy: low scores receive routine handling, middle scores go to human review, and high scores trigger a time-sensitive alert. Define the exact ranges only after graphing validation results and estimating capacity. Then evaluate the confusion matrix by relevant slices, such as message length or language, because a globally acceptable recall can hide a systematically missed group.`, checkIn: check("Which metric answers: of truly urgent tickets, how many did we catch?", ["Accuracy across all tickets in the held-out month","Precision among messages the model flagged urgent","Recall of the urgent class on the evaluation set","Specificity among clearly routine locker questions"], 2, "Recall is TP / (TP + FN).") },
      { id: "threshold", kicker: "Mechanism", title: "Move the threshold, move the work", body: `Lowering a threshold from 0.70 to 0.40 catches more urgent cases (higher recall) but creates more false alarms (lower precision). Choose it using the real review capacity, not habit.

**Instructor protocol:** run a release meeting in which one student presents accuracy only and another asks the missing questions: How many positives existed? How many did we miss? How many normal cases were sent to people? Which threshold produced these numbers? What happens when the score falls in the uncertain range? The presenter should answer from a frozen validation or test set, not a demo.

**Evidence to save:** the threshold, matrix counts, formulas and arithmetic, baseline results, calibration sample, reviewer-capacity assumption, and a small error gallery. These artifacts make a classifier claim auditable. They also prevent a team from quietly changing the threshold after seeing the test result and then calling the same test an unbiased evaluation.` },
      { id: "baseline", kicker: "Baseline", title: "Beat a rule before trusting a model", body: `Compare against a keyword rule such as \`contains("self-harm")\`. The rule is transparent but brittle; a learned model may catch “I do not feel safe tonight.” Keep both error lists, not only their summary scores.

**Instructor lens — count errors before interpreting a score.** Put a 100-case review queue on the board. Suppose 20 messages are truly urgent. At one threshold the system flags 18 urgent messages and 12 normal messages; it misses 2 urgent ones and correctly leaves 68 normal messages alone. Students should fill all four confusion-matrix cells first, then calculate precision as 18/(18+12)=60% and recall as 18/(18+2)=90%. Explain each denominator in words: precision asks whether a flag earns reviewer attention; recall asks whether the real urgent cases were found.

**Why it matters:** a single percentage conceals which people wait, which staff members receive extra work, and whether the queue can operate. In the lab, require students to inspect at least five false positives and five false negatives. Label their pattern, score, likely cause, and proposed response. The response may be better training data, a clearer workflow, a review band, or a decision not to automate.`, image: "/images/lessons/aai-3-b.png", imageAlt: "A realistic classroom lab screen showing lesson 3 notes, examples, and evidence.", checkIn: check("At a lower decision threshold, what tradeoff commonly occurs?", ["Recall may rise while precision falls under heavier review load","Precision and recall must both rise at every operating point","All score bins become perfectly calibrated overnight, even though","The test set quietly becomes part of the training data"], 0, "More predicted positives catch more true positives and more false alarms.") },
      { id: "code", kicker: "Build", title: "Train and inspect probabilities", body: `\`\`\`python
model.fit(X_train, y_train)
p = model.predict_proba(X_test)[:, 1]
y_hat = p >= 0.40
# inspect false negatives, then adjust policy
\`\`\`
Probability-like scores must be checked for calibration; 0.8 should mean roughly 80% of similar cases are positive.

**Threshold worked example.** Keep the same model scores but compare two policies. At threshold 0.80, the queue catches 12 of 20 urgent messages and sends 3 normal messages for review. At 0.35, it catches 19 of 20 but sends 28 normal messages. Neither is universally “more accurate”; the lower threshold exchanges reviewer capacity for fewer missed urgent cases. Have students compute the workload and state which policy they would choose if two counselors can review 25 cases per day.

**Lab move:** compare the model against a transparent baseline, such as a keyword rule or a human triage rubric, on the identical held-out cases. Preserve the error lists. A learned classifier must show a specific improvement over the baseline, not merely produce probabilities. If it cannot explain a score’s practical meaning, use calibration checks before treating 0.80 as an 80% chance.` },
      { id: "table", kicker: "Decision table", title: "Choose metrics by consequence", body: `| Use case | Costlier error | Primary measure |
| --- | --- | --- |
| Safety escalation | False negative | Recall + review time |
| Spam quarantine | False positive | Precision |
| Balanced routing | Both similar | F1 plus confusion matrix |

**Misconception to interrupt:** precision and recall are model personality traits. They are properties of a model, data slice, and chosen threshold together. Change the threshold, population, language mix, or labeling rule and the counts can change. Demonstrate a calibration bin: of 40 cases scored between 0.70 and 0.79, perhaps only 22 are truly positive. That score range is overconfident; staff should not interpret it as a literal probability without evidence.

**In the lab:** create a three-way policy: low scores receive routine handling, middle scores go to human review, and high scores trigger a time-sensitive alert. Define the exact ranges only after graphing validation results and estimating capacity. Then evaluate the confusion matrix by relevant slices, such as message length or language, because a globally acceptable recall can hide a systematically missed group.` },
      { id: "split", kicker: "Evidence", title: "Evaluate on held-out messages", body: `Freeze a test set of messages from a later month. Do not repeatedly tune its threshold; use validation data for that. Then report a confidence interval or at least counts, because 3 errors out of 10 tells little.

**Instructor protocol:** run a release meeting in which one student presents accuracy only and another asks the missing questions: How many positives existed? How many did we miss? How many normal cases were sent to people? Which threshold produced these numbers? What happens when the score falls in the uncertain range? The presenter should answer from a frozen validation or test set, not a demo.

**Evidence to save:** the threshold, matrix counts, formulas and arithmetic, baseline results, calibration sample, reviewer-capacity assumption, and a small error gallery. These artifacts make a classifier claim auditable. They also prevent a team from quietly changing the threshold after seeing the test result and then calling the same test an unbiased evaluation.` },
      { id: "failure", kicker: "Failure mode", title: "High accuracy, unsafe queue", body: `A school reports 97% accuracy because only 3% of messages are urgent. The model predicts normal for almost everything and misses crisis language. Class imbalance made accuracy a misleading headline.

**Instructor lens — count errors before interpreting a score.** Put a 100-case review queue on the board. Suppose 20 messages are truly urgent. At one threshold the system flags 18 urgent messages and 12 normal messages; it misses 2 urgent ones and correctly leaves 68 normal messages alone. Students should fill all four confusion-matrix cells first, then calculate precision as 18/(18+12)=60% and recall as 18/(18+2)=90%. Explain each denominator in words: precision asks whether a flag earns reviewer attention; recall asks whether the real urgent cases were found.

**Why it matters:** a single percentage conceals which people wait, which staff members receive extra work, and whether the queue can operate. In the lab, require students to inspect at least five false positives and five false negatives. Label their pattern, score, likely cause, and proposed response. The response may be better training data, a clearer workflow, a review band, or a decision not to automate.`, image: "/images/lessons/aai-confusion.png", imageAlt: "An educational lab visualization illustrating a key lesson 3 mechanism with annotated screens.", checkIn: check("Why compare a classifier to a keyword baseline?", ["Baselines prove deep networks are never worth trying, which sou","They show whether learned scores beat a simple auditable rule","Baselines remove the need to inspect false negatives","Keyword rules always outperform models on rare classes"], 1, "A model must earn its complexity with a measured gain.") },
      { id: "errors", kicker: "Lab", title: "Annotate error patterns", body: `Make a table for each FN: message text pattern, score, reviewer label, and proposed fix. You may find multilingual messages, sarcasm, or very short texts. A model change may not be the right fix; staff training or routing may be.

**Threshold worked example.** Keep the same model scores but compare two policies. At threshold 0.80, the queue catches 12 of 20 urgent messages and sends 3 normal messages for review. At 0.35, it catches 19 of 20 but sends 28 normal messages. Neither is universally “more accurate”; the lower threshold exchanges reviewer capacity for fewer missed urgent cases. Have students compute the workload and state which policy they would choose if two counselors can review 25 cases per day.

**Lab move:** compare the model against a transparent baseline, such as a keyword rule or a human triage rubric, on the identical held-out cases. Preserve the error lists. A learned classifier must show a specific improvement over the baseline, not merely produce probabilities. If it cannot explain a score’s practical meaning, use calibration checks before treating 0.80 as an 80% chance.` },
      { id: "calibration", kicker: "Mechanism", title: "Scores are not automatically probabilities", body: `Among 50 messages scored 0.8–0.9, if only 20 are truly urgent, that bin is overconfident. Calibration curves compare predicted probability bins to observed frequencies.

**Misconception to interrupt:** precision and recall are model personality traits. They are properties of a model, data slice, and chosen threshold together. Change the threshold, population, language mix, or labeling rule and the counts can change. Demonstrate a calibration bin: of 40 cases scored between 0.70 and 0.79, perhaps only 22 are truly positive. That score range is overconfident; staff should not interpret it as a literal probability without evidence.

**In the lab:** create a three-way policy: low scores receive routine handling, middle scores go to human review, and high scores trigger a time-sensitive alert. Define the exact ranges only after graphing validation results and estimating capacity. Then evaluate the confusion matrix by relevant slices, such as message length or language, because a globally acceptable recall can hide a systematically missed group.`, checkIn: check("Why is high accuracy misleading when only 3% of messages are urgent?", ["Accuracy formulas cannot run when classes are rare, even though i","Always predicting normal can look accurate while missing crises","Precision becomes undefined whenever accuracy is above 90%","Thresholds cannot be set unless classes are perfectly balanced"], 1, "Imbalance hides costly false negatives behind a strong average.") },
      { id: "abstain", kicker: "Control", title: "Use a review band", body: `Instead of two actions, use three: score <0.25 normal; 0.25–0.75 human review; >0.75 urgent alert. The review band spends people’s attention where the model is least certain.

**Instructor protocol:** run a release meeting in which one student presents accuracy only and another asks the missing questions: How many positives existed? How many did we miss? How many normal cases were sent to people? Which threshold produced these numbers? What happens when the score falls in the uncertain range? The presenter should answer from a frozen validation or test set, not a demo.

**Evidence to save:** the threshold, matrix counts, formulas and arithmetic, baseline results, calibration sample, reviewer-capacity assumption, and a small error gallery. These artifacts make a classifier claim auditable. They also prevent a team from quietly changing the threshold after seeing the test result and then calling the same test an unbiased evaluation.` },
      { id: "case", kicker: "Case study", title: "A threshold is a resource allocation choice", body: `If counselors can review 25 messages/day, select the threshold that yields about that workload and verify recall at the chosen point. Do not promise “real-time triage” without staffing the escalations.

**Instructor lens — count errors before interpreting a score.** Put a 100-case review queue on the board. Suppose 20 messages are truly urgent. At one threshold the system flags 18 urgent messages and 12 normal messages; it misses 2 urgent ones and correctly leaves 68 normal messages alone. Students should fill all four confusion-matrix cells first, then calculate precision as 18/(18+12)=60% and recall as 18/(18+2)=90%. Explain each denominator in words: precision asks whether a flag earns reviewer attention; recall asks whether the real urgent cases were found.

**Why it matters:** a single percentage conceals which people wait, which staff members receive extra work, and whether the queue can operate. In the lab, require students to inspect at least five false positives and five false negatives. Label their pattern, score, likely cause, and proposed response. The response may be better training data, a clearer workflow, a review band, or a decision not to automate.`, image: "/images/lessons/aai-3-c.png", imageAlt: "Learners reviewing a worked AI system example on a monitor with notes and evidence." },
      { id: "check", kicker: "Check-in", title: "Diagnose precision versus recall", body: `A change catches 45 of 50 urgent cases but flags 80 normal cases too. Recall rose; precision likely fell. Whether it is better depends on the harm of delay and reviewer capacity.

**Threshold worked example.** Keep the same model scores but compare two policies. At threshold 0.80, the queue catches 12 of 20 urgent messages and sends 3 normal messages for review. At 0.35, it catches 19 of 20 but sends 28 normal messages. Neither is universally “more accurate”; the lower threshold exchanges reviewer capacity for fewer missed urgent cases. Have students compute the workload and state which policy they would choose if two counselors can review 25 cases per day.

**Lab move:** compare the model against a transparent baseline, such as a keyword rule or a human triage rubric, on the identical held-out cases. Preserve the error lists. A learned classifier must show a specific improvement over the baseline, not merely produce probabilities. If it cannot explain a score’s practical meaning, use calibration checks before treating 0.80 as an 80% chance.`, checkIn: check("What does a middle “review band” between auto-normal and auto-urgent provide?", ["A place to spend human attention where the model is least certain","A way to delete hard cases from the evaluation set forever","A guarantee that precision and recall both equal 100% without check","A replacement for logging false positives and false negatives"], 0, "Abstention/review routes uncertain scores to people.") },
      { id: "fairness", kicker: "Audit", title: "Slice the matrix", body: `Calculate TP, FP, TN, and FN by message language, campus, and message length where appropriate and safe. A global threshold can produce uneven missed-case rates.

**Misconception to interrupt:** precision and recall are model personality traits. They are properties of a model, data slice, and chosen threshold together. Change the threshold, population, language mix, or labeling rule and the counts can change. Demonstrate a calibration bin: of 40 cases scored between 0.70 and 0.79, perhaps only 22 are truly positive. That score range is overconfident; staff should not interpret it as a literal probability without evidence.

**In the lab:** create a three-way policy: low scores receive routine handling, middle scores go to human review, and high scores trigger a time-sensitive alert. Define the exact ranges only after graphing validation results and estimating capacity. Then evaluate the confusion matrix by relevant slices, such as message length or language, because a globally acceptable recall can hide a systematically missed group.` },
      { id: "synthesis", kicker: "Synthesize", title: "Every classifier needs error accounting", body: `A class label is the final step of a score plus a threshold. Defend it with all four confusion-matrix cells and a documented escalation policy.

**Instructor protocol:** run a release meeting in which one student presents accuracy only and another asks the missing questions: How many positives existed? How many did we miss? How many normal cases were sent to people? Which threshold produced these numbers? What happens when the score falls in the uncertain range? The presenter should answer from a frozen validation or test set, not a demo.

**Evidence to save:** the threshold, matrix counts, formulas and arithmetic, baseline results, calibration sample, reviewer-capacity assumption, and a small error gallery. These artifacts make a classifier claim auditable. They also prevent a team from quietly changing the threshold after seeing the test result and then calling the same test an unbiased evaluation.` },
      { id: "ready", kicker: "Ready", title: "Exit ticket: make the tradeoff", body: `Given 10 missed urgent messages and 3 false alarms, say whether you would lower the threshold and what evidence you need about reviewer capacity.

**Instructor lens — count errors before interpreting a score.** Put a 100-case review queue on the board. Suppose 20 messages are truly urgent. At one threshold the system flags 18 urgent messages and 12 normal messages; it misses 2 urgent ones and correctly leaves 68 normal messages alone. Students should fill all four confusion-matrix cells first, then calculate precision as 18/(18+12)=60% and recall as 18/(18+2)=90%. Explain each denominator in words: precision asks whether a flag earns reviewer attention; recall asks whether the real urgent cases were found.

**Why it matters:** a single percentage conceals which people wait, which staff members receive extra work, and whether the queue can operate. In the lab, require students to inspect at least five false positives and five false negatives. Label their pattern, score, likely cause, and proposed response. The response may be better training data, a clearer workflow, a review band, or a decision not to automate.`, checkIn: check("Which report is most trustworthy after training a classifier?", ["A single screenshot of the demo working on an easy example","Baseline, held-out matrix, precision/recall","Train accuracy alone with no mention of the test split","A claim that the team used AI, so metrics are unnecessary"], 1, "Numbers plus baseline plus failures beat slogans.") }
    ],
  },
  bigIdeas: ["Read all four confusion-matrix cells before trusting a single accuracy number.", "Precision and recall are chosen from the cost of errors and review capacity.", "A threshold is a policy — change it and you change who waits and who gets reviewed."],
  keyTerms: [{"term": "Confusion matrix", "definition": "A table of TP, FP, TN, and FN counts for a classifier."}, {"term": "Precision", "definition": "Of predicted positives, the share that are truly positive."}, {"term": "Recall", "definition": "Of actual positives, the share that were found."}, {"term": "Threshold", "definition": "The score cutoff that turns a model score into an action."}, {"term": "Baseline", "definition": "A simple rule or majority predictor used to keep models honest."}],
  realWorld: "Safety and moderation teams live in precision/recall tradeoffs every week — accuracy alone can hide missed crises.",
  quiz: [
    { id: "q1", question: "In an urgent-message classifier, what is a false positive?", choices: ["An urgent message predicted as normal traffic","A normal message predicted as urgent for review","An urgent message correctly predicted as urgent","A normal message correctly left in the normal queue"], correctIndex: 1, explanation: "FP spends review attention on a case that is actually normal." },
    { id: "q2", question: "Which metric answers: of truly urgent tickets, how many did we catch?", choices: ["Accuracy across all tickets in the held-out month","Precision among messages the model flagged urgent","Recall of the urgent class on the evaluation set","Specificity among clearly routine locker questions"], correctIndex: 2, explanation: "Recall is TP / (TP + FN)." },
    { id: "q3", question: "At a lower decision threshold, what tradeoff commonly occurs?", choices: ["Recall may rise while precision falls under heavier review load","Precision and recall must both rise at every operating point","All score bins become perfectly calibrated overnight, even though","The test set quietly becomes part of the training data"], correctIndex: 0, explanation: "More predicted positives catch more true positives and more false alarms." },
    { id: "q4", question: "Why compare a classifier to a keyword baseline?", choices: ["Baselines prove deep networks are never worth trying, which sou","They show whether learned scores beat a simple auditable rule","Baselines remove the need to inspect false negatives","Keyword rules always outperform models on rare classes"], correctIndex: 1, explanation: "A model must earn its complexity with a measured gain." },
    { id: "q5", question: "Why is high accuracy misleading when only 3% of messages are urgent?", choices: ["Accuracy formulas cannot run when classes are rare, even though i","Always predicting normal can look accurate while missing crises","Precision becomes undefined whenever accuracy is above 90%","Thresholds cannot be set unless classes are perfectly balanced"], correctIndex: 1, explanation: "Imbalance hides costly false negatives behind a strong average." },
    { id: "q6", question: "What does a middle “review band” between auto-normal and auto-urgent provide?", choices: ["A place to spend human attention where the model is least certain","A way to delete hard cases from the evaluation set forever","A guarantee that precision and recall both equal 100% without check","A replacement for logging false positives and false negatives"], correctIndex: 0, explanation: "Abstention/review routes uncertain scores to people." },
    { id: "q7", question: "Which report is most trustworthy after training a classifier?", choices: ["A single screenshot of the demo working on an easy example","Baseline, held-out matrix, precision/recall","Train accuracy alone with no mention of the test split","A claim that the team used AI, so metrics are unnecessary"], correctIndex: 1, explanation: "Numbers plus baseline plus failures beat slogans." }
  ],
  reflection: { prompt: "For a spam or urgent-message classifier, say whether you prioritize precision or recall, and justify with a concrete harm and reviewer capacity.", placeholder: "Write your answer…" },
};
