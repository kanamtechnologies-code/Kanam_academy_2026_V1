import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const advancedAiLesson4: AILessonConfig = {
  id: "aai-4",
  title: "4. Neural Networks: From Neurons to Overfitting",
  goal: "Explain forward/back propagation and use validation evidence to distinguish learning from memorization.",
  xpReward: 200,
  badge: "Net Navigator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/advanced-ai/3",
  nextHref: "/learn/advanced-ai/5",
  instructorScript: `**Coach's note**
Today's lesson: **Neural Networks: From Neurons to Overfitting**.

**Goal:** Explain forward/back propagation and use validation evidence to distinguish learning from memorization.

**How to facilitate**
1. Warm-up: ask students what they already think about "Neural networks learn layered transformations".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~40–50 min lesson",
    sections: [
      { id: "roadmap", kicker: "Roadmap", title: "Neural networks learn layered transformations", body: `A neuron computes (z=w·x+b), then applies an activation such as ReLU: \`max(0,z)\`. Layers compose simple transformations into features useful for a final prediction.

**Instructor lens — trace numbers through the network.** Start with a two-input neuron: x=[3, 2], w=[0.2, -0.4], b=0.5. The weighted sum is 3(0.2)+2(-0.4)+0.5=0.3; ReLU keeps 0.3 because it is positive. If the sum were -0.1, ReLU would output 0. This small calculation corrects the idea that neurons are tiny brains: they are repeated numerical functions whose weights are adjusted from data. A later output layer converts learned representations into scores for the task.

**In the lab:** change one input or one weight and predict the direction of the output before running code. Then identify where an activation can discard a negative signal. The purpose is not hand-calculating a large model; it is being able to explain what a forward pass claims and what it does not claim about understanding.`, image: "/images/lessons/aai-4.png", imageAlt: "Students and an instructor planning an Advanced AI 4 project around a whiteboard." },
      { id: "forward", kicker: "Mechanism", title: "Follow one forward pass", body: `For x=[2,1], w=[0.4,-0.2], b=0.1: z=0.4(2)-0.2(1)+0.1=0.7; ReLU(z)=0.7. The output is not a rule written by a programmer; it is a learned weighted response.

**Worked learning signal.** Suppose the correct class should receive probability 0.90 but the network assigns 0.20. The loss is large because the prediction conflicts with the label. Backpropagation applies the chain rule to calculate each weight’s contribution to that loss, and gradient descent makes a small update in the direction that reduces loss on the training batch. Emphasize that the update is not magic feedback from one image: it is an estimate that can be noisy, biased by labels, or too large when the learning rate is poorly chosen.

**Lab move:** log training and validation loss every epoch. Ask students to narrate the curves rather than celebrate the final training score. If both losses remain high, investigate capacity, features, labels, or optimization. If training loss drops while validation loss rises, stop treating more epochs as progress; the model is increasingly specialized to the training set.`, checkIn: check("Why do stacked linear layers need nonlinear activations?", ["Without them, stacked layers collapse to one linear map","Activations make GPUs ignore batch size during training","Nonlinearities delete features so overfitting cannot occur","They guarantee fairness across every student subgroup"], 0, "Linear maps compose into a single linear transform.") },
      { id: "loss", kicker: "Mechanism", title: "Loss supplies the learning signal", body: `For a digit image labeled 3, cross-entropy penalizes probability placed on the wrong digits. Backpropagation uses the chain rule to compute how each weight affected loss; gradient descent nudges weights opposite that gradient.

**Misconception to interrupt:** a bigger network automatically generalizes. Extra parameters can represent useful structure, but they can also memorize mislabeled images, repeated samples, or background cues. Work a practical ablation: train the same small image model twice, once with realistic brightness and two-pixel-shift augmentation and once without. Hold architecture, split, and seed as steady as possible; compare validation loss and an error gallery of shifted images. One controlled change makes a conclusion more credible than many simultaneous tweaks.

**Why it matters:** regularization is a collection of evidence-based controls. Weight decay discourages extreme weights, dropout discourages reliance on a single path, augmentation teaches relevant variation, and early stopping selects the checkpoint with the best validation evidence. None substitutes for representative data.` },
      { id: "example", kicker: "Worked example", title: "Read a training curve", body: `Epoch 1: train loss 1.8, validation loss 1.9. Epoch 12: 0.32, 0.38. Epoch 40: 0.05, 0.91. The late rise in validation loss is overfitting: training keeps improving while unseen performance worsens.

**Instructor protocol:** make students choose an intervention from curves. Scenario A: training and validation loss are both 1.1 after many epochs—possible underfitting, weak inputs, or a broken label pipeline. Scenario B: training loss is 0.03 while validation loss climbs from 0.4 to 1.0—overfitting or a distribution mismatch. Require a data-side hypothesis and a model-side hypothesis for each, followed by one minimal next experiment. “Add more layers” without diagnosis is not an experiment.

**Evidence to save:** a split description, curve plot, best validation checkpoint, hyperparameters, regularization choices, and errors from realistic conditions. Run the test set once after selection. A network earns trust through stable held-out behavior under the variation it will encounter, not through a parameter count, a dramatic diagram, or 100% training accuracy.`, checkIn: check("Train loss falls while validation loss rises for several epochs. What does that suggest?", ["Perfect generalization on every future deployment site","Overfitting: the network is fitting train-specific noise","Underfitting only, so you should always add more layers","No need for a held-out test set after this point, despite "], 1, "A growing train–val gap is the classic overfitting signal.") },
      { id: "capacity", kicker: "Concept", title: "Capacity can memorize noise", body: `More layers and parameters can represent richer patterns, but also memorize mislabeled images or backgrounds. A network that recognizes “blue classroom wall” instead of a digit has learned a shortcut.

**Instructor lens — trace numbers through the network.** Start with a two-input neuron: x=[3, 2], w=[0.2, -0.4], b=0.5. The weighted sum is 3(0.2)+2(-0.4)+0.5=0.3; ReLU keeps 0.3 because it is positive. If the sum were -0.1, ReLU would output 0. This small calculation corrects the idea that neurons are tiny brains: they are repeated numerical functions whose weights are adjusted from data. A later output layer converts learned representations into scores for the task.

**In the lab:** change one input or one weight and predict the direction of the output before running code. Then identify where an activation can discard a negative signal. The purpose is not hand-calculating a large model; it is being able to explain what a forward pass claims and what it does not claim about understanding.`, image: "/images/lessons/aai-4-b.png", imageAlt: "A realistic classroom lab screen showing lesson 4 notes, examples, and evidence." },
      { id: "table", kicker: "Toolbox", title: "Match regularization to failure", body: `| Control | What it does |
| --- | --- |
| Data augmentation | Varies crops/lighting to teach invariance |
| Weight decay | Discourages extreme weights |
| Dropout | Prevents reliance on one activation |
| Early stopping | Selects before validation degrades |

**Worked learning signal.** Suppose the correct class should receive probability 0.90 but the network assigns 0.20. The loss is large because the prediction conflicts with the label. Backpropagation applies the chain rule to calculate each weight’s contribution to that loss, and gradient descent makes a small update in the direction that reduces loss on the training batch. Emphasize that the update is not magic feedback from one image: it is an estimate that can be noisy, biased by labels, or too large when the learning rate is poorly chosen.

**Lab move:** log training and validation loss every epoch. Ask students to narrate the curves rather than celebrate the final training score. If both losses remain high, investigate capacity, features, labels, or optimization. If training loss drops while validation loss rises, stop treating more epochs as progress; the model is increasingly specialized to the training set.`, checkIn: check("What is early stopping?", ["Deleting the validation set once training begins while skipping","Halting when validation stops improving to limit memorization","Raising the learning rate until training loss becomes zero","Stopping data collection so the dataset stays tiny forever"], 1, "Early stopping uses validation as a generalization brake.") },
      { id: "lab", kicker: "Lab", title: "Run a small ablation", body: `Train the same digit model with and without random 2-pixel shifts. Compare validation accuracy and errors on shifted digits. Change one control at a time so you know what improved robustness.

**Misconception to interrupt:** a bigger network automatically generalizes. Extra parameters can represent useful structure, but they can also memorize mislabeled images, repeated samples, or background cues. Work a practical ablation: train the same small image model twice, once with realistic brightness and two-pixel-shift augmentation and once without. Hold architecture, split, and seed as steady as possible; compare validation loss and an error gallery of shifted images. One controlled change makes a conclusion more credible than many simultaneous tweaks.

**Why it matters:** regularization is a collection of evidence-based controls. Weight decay discourages extreme weights, dropout discourages reliance on a single path, augmentation teaches relevant variation, and early stopping selects the checkpoint with the best validation evidence. None substitutes for representative data.` },
      { id: "gradient", kicker: "Code", title: "See the update rule", body: `\`\`\`python
for x, y in batches:
    loss = cross_entropy(net(x), y)
    loss.backward()       # gradients d(loss)/d(weight)
    optimizer.step()
    optimizer.zero_grad()
\`\`\`
Learning rate that is too large can skip the minimum; too small can make progress impractically slow.

**Instructor protocol:** make students choose an intervention from curves. Scenario A: training and validation loss are both 1.1 after many epochs—possible underfitting, weak inputs, or a broken label pipeline. Scenario B: training loss is 0.03 while validation loss climbs from 0.4 to 1.0—overfitting or a distribution mismatch. Require a data-side hypothesis and a model-side hypothesis for each, followed by one minimal next experiment. “Add more layers” without diagnosis is not an experiment.

**Evidence to save:** a split description, curve plot, best validation checkpoint, hyperparameters, regularization choices, and errors from realistic conditions. Run the test set once after selection. A network earns trust through stable held-out behavior under the variation it will encounter, not through a parameter count, a dramatic diagram, or 100% training accuracy.` },
      { id: "failure", kicker: "Failure mode", title: "The perfect training score", body: `A student trains on 800 photos and reports 100% training accuracy. Test accuracy is 61% because the same photos were repeated and labels include errors. More epochs would deepen memorization, not solve data quality.

**Instructor lens — trace numbers through the network.** Start with a two-input neuron: x=[3, 2], w=[0.2, -0.4], b=0.5. The weighted sum is 3(0.2)+2(-0.4)+0.5=0.3; ReLU keeps 0.3 because it is positive. If the sum were -0.1, ReLU would output 0. This small calculation corrects the idea that neurons are tiny brains: they are repeated numerical functions whose weights are adjusted from data. A later output layer converts learned representations into scores for the task.

**In the lab:** change one input or one weight and predict the direction of the output before running code. Then identify where an activation can discard a negative signal. The purpose is not hand-calculating a large model; it is being able to explain what a forward pass claims and what it does not claim about understanding.`, image: "/images/lessons/aai-neural.png", imageAlt: "An educational lab visualization illustrating a key lesson 4 mechanism with annotated screens." },
      { id: "diagnose", kicker: "Diagnosis", title: "Use curves before changing architecture", body: `Train and validation both poor: underfit, data issue, or weak features. Train strong/validation weak: overfit or distribution shift. Start with this diagnosis; do not blindly add layers.

**Worked learning signal.** Suppose the correct class should receive probability 0.90 but the network assigns 0.20. The loss is large because the prediction conflicts with the label. Backpropagation applies the chain rule to calculate each weight’s contribution to that loss, and gradient descent makes a small update in the direction that reduces loss on the training batch. Emphasize that the update is not magic feedback from one image: it is an estimate that can be noisy, biased by labels, or too large when the learning rate is poorly chosen.

**Lab move:** log training and validation loss every epoch. Ask students to narrate the curves rather than celebrate the final training score. If both losses remain high, investigate capacity, features, labels, or optimization. If training loss drops while validation loss rises, stop treating more epochs as progress; the model is increasingly specialized to the training set.`, checkIn: check("Which practice is most scientific when tuning a network?", ["Change depth, learning rate, and dropout all at once","Change one hyperparameter at a time and record evidence","Only watch training accuracy and ignore validation curves","Pick the run with the flashiest demo, not the metrics"], 1, "Controlled comparisons identify what caused a change.") },
      { id: "features", kicker: "Concept", title: "Hidden layers learn representations", body: `Early vision layers often respond to edges; later layers combine them into shapes. This is an interpretation aid, not proof that a model “sees” like a person.

**Misconception to interrupt:** a bigger network automatically generalizes. Extra parameters can represent useful structure, but they can also memorize mislabeled images, repeated samples, or background cues. Work a practical ablation: train the same small image model twice, once with realistic brightness and two-pixel-shift augmentation and once without. Hold architecture, split, and seed as steady as possible; compare validation loss and an error gallery of shifted images. One controlled change makes a conclusion more credible than many simultaneous tweaks.

**Why it matters:** regularization is a collection of evidence-based controls. Weight decay discourages extreme weights, dropout discourages reliance on a single path, augmentation teaches relevant variation, and early stopping selects the checkpoint with the best validation evidence. None substitutes for representative data.` },
      { id: "audit", kicker: "Audit", title: "Check who is absent from images", body: `A handwriting model trained mostly on neat adult digits may fail on younger writers or adaptive grips. Representation quality is a data question before it is an architecture question.

**Instructor protocol:** make students choose an intervention from curves. Scenario A: training and validation loss are both 1.1 after many epochs—possible underfitting, weak inputs, or a broken label pipeline. Scenario B: training loss is 0.03 while validation loss climbs from 0.4 to 1.0—overfitting or a distribution mismatch. Require a data-side hypothesis and a model-side hypothesis for each, followed by one minimal next experiment. “Add more layers” without diagnosis is not an experiment.

**Evidence to save:** a split description, curve plot, best validation checkpoint, hyperparameters, regularization choices, and errors from realistic conditions. Run the test set once after selection. A network earns trust through stable held-out behavior under the variation it will encounter, not through a parameter count, a dramatic diagram, or 100% training accuracy.` },
      { id: "case", kicker: "Case study", title: "A validation set is a selection instrument", body: `Save the checkpoint with the best validation loss, then run the test set once. If you choose architecture based on test results, the test set has become validation data.

**Instructor lens — trace numbers through the network.** Start with a two-input neuron: x=[3, 2], w=[0.2, -0.4], b=0.5. The weighted sum is 3(0.2)+2(-0.4)+0.5=0.3; ReLU keeps 0.3 because it is positive. If the sum were -0.1, ReLU would output 0. This small calculation corrects the idea that neurons are tiny brains: they are repeated numerical functions whose weights are adjusted from data. A later output layer converts learned representations into scores for the task.

**In the lab:** change one input or one weight and predict the direction of the output before running code. Then identify where an activation can discard a negative signal. The purpose is not hand-calculating a large model; it is being able to explain what a forward pass claims and what it does not claim about understanding.`, image: "/images/lessons/aai-4-c.png", imageAlt: "Learners reviewing a worked AI system example on a monitor with notes and evidence.", checkIn: check("What does regularization generally try to do?", ["Increase training loss until the model refuses to fit anything","Reduce overfitting so new examples generalize better","Remove the need for any labeled validation data","Force every weight to equal one after each update"], 1, "Regularization trades some train fit for better generalization.") },
      { id: "check", kicker: "Check-in", title: "Choose the responsible next experiment", body: `Validation loss rises for five epochs while training loss falls. Stop at the earlier checkpoint, inspect data and regularization, then retry—not “train longer.”

**Worked learning signal.** Suppose the correct class should receive probability 0.90 but the network assigns 0.20. The loss is large because the prediction conflicts with the label. Backpropagation applies the chain rule to calculate each weight’s contribution to that loss, and gradient descent makes a small update in the direction that reduces loss on the training batch. Emphasize that the update is not magic feedback from one image: it is an estimate that can be noisy, biased by labels, or too large when the learning rate is poorly chosen.

**Lab move:** log training and validation loss every epoch. Ask students to narrate the curves rather than celebrate the final training score. If both losses remain high, investigate capacity, features, labels, or optimization. If training loss drops while validation loss rises, stop treating more epochs as progress; the model is increasingly specialized to the training set.`, checkIn: check("Why keep a frozen validation set during architecture search?", ["So you can tune forever on the final test numbers, even tho","So model choices are compared on the same unseen examples","So labels can be edited until every architecture ties","So training loss becomes the only release criterion"], 1, "Shared validation evidence keeps comparisons fair.") },
      { id: "synthesis", kicker: "Synthesize", title: "Generalization beats memorization", body: `A neural network earns trust through held-out behavior under realistic variation, not through its parameter count or a dramatic training curve.

**Misconception to interrupt:** a bigger network automatically generalizes. Extra parameters can represent useful structure, but they can also memorize mislabeled images, repeated samples, or background cues. Work a practical ablation: train the same small image model twice, once with realistic brightness and two-pixel-shift augmentation and once without. Hold architecture, split, and seed as steady as possible; compare validation loss and an error gallery of shifted images. One controlled change makes a conclusion more credible than many simultaneous tweaks.

**Why it matters:** regularization is a collection of evidence-based controls. Weight decay discourages extreme weights, dropout discourages reliance on a single path, augmentation teaches relevant variation, and early stopping selects the checkpoint with the best validation evidence. None substitutes for representative data.` },
      { id: "ready", kicker: "Ready", title: "Exit ticket: explain a curve", body: `Describe what you would do for train accuracy 99% and validation accuracy 72%. Name one data-side and one model-side intervention.

**Instructor protocol:** make students choose an intervention from curves. Scenario A: training and validation loss are both 1.1 after many epochs—possible underfitting, weak inputs, or a broken label pipeline. Scenario B: training loss is 0.03 while validation loss climbs from 0.4 to 1.0—overfitting or a distribution mismatch. Require a data-side hypothesis and a model-side hypothesis for each, followed by one minimal next experiment. “Add more layers” without diagnosis is not an experiment.

**Evidence to save:** a split description, curve plot, best validation checkpoint, hyperparameters, regularization choices, and errors from realistic conditions. Run the test set once after selection. A network earns trust through stable held-out behavior under the variation it will encounter, not through a parameter count, a dramatic diagram, or 100% training accuracy.`, checkIn: check("Which statement about network capacity is most accurate?", ["Deeper is always better for every school dataset size","Capacity helps complex patterns but needs validation checks","Loss is optional once the architecture looks impressive","Weights never change after the first training epoch while ski"], 1, "Capacity is a tradeoff, not a trophy.") }
    ],
  },
  bigIdeas: ["Networks learn by reducing loss — capacity without validation memorizes noise.", "Watch train vs validation curves; early stopping is a first-line defense.", "Change one hyperparameter at a time and keep evidence."],
  keyTerms: [{"term": "Activation", "definition": "Nonlinear function applied after a weighted sum in a neuron."}, {"term": "Loss", "definition": "A score of how wrong predictions are during training."}, {"term": "Overfitting", "definition": "Fitting training noise so new data suffers."}, {"term": "Regularization", "definition": "Techniques that reduce overfitting (e.g., dropout, weight decay)."}, {"term": "Early stopping", "definition": "Halting training when validation performance stops improving."}],
  realWorld: "Production ML teams watch validation metrics the way pilots watch instruments — train loss alone is not a flight plan.",
  quiz: [
    { id: "q1", question: "Why do stacked linear layers need nonlinear activations?", choices: ["Without them, stacked layers collapse to one linear map","Activations make GPUs ignore batch size during training","Nonlinearities delete features so overfitting cannot occur","They guarantee fairness across every student subgroup"], correctIndex: 0, explanation: "Linear maps compose into a single linear transform." },
    { id: "q2", question: "Train loss falls while validation loss rises for several epochs. What does that suggest?", choices: ["Perfect generalization on every future deployment site","Overfitting: the network is fitting train-specific noise","Underfitting only, so you should always add more layers","No need for a held-out test set after this point, despite "], correctIndex: 1, explanation: "A growing train–val gap is the classic overfitting signal." },
    { id: "q3", question: "What is early stopping?", choices: ["Deleting the validation set once training begins while skipping","Halting when validation stops improving to limit memorization","Raising the learning rate until training loss becomes zero","Stopping data collection so the dataset stays tiny forever"], correctIndex: 1, explanation: "Early stopping uses validation as a generalization brake." },
    { id: "q4", question: "Which practice is most scientific when tuning a network?", choices: ["Change depth, learning rate, and dropout all at once","Change one hyperparameter at a time and record evidence","Only watch training accuracy and ignore validation curves","Pick the run with the flashiest demo, not the metrics"], correctIndex: 1, explanation: "Controlled comparisons identify what caused a change." },
    { id: "q5", question: "What does regularization generally try to do?", choices: ["Increase training loss until the model refuses to fit anything","Reduce overfitting so new examples generalize better","Remove the need for any labeled validation data","Force every weight to equal one after each update"], correctIndex: 1, explanation: "Regularization trades some train fit for better generalization." },
    { id: "q6", question: "Why keep a frozen validation set during architecture search?", choices: ["So you can tune forever on the final test numbers, even tho","So model choices are compared on the same unseen examples","So labels can be edited until every architecture ties","So training loss becomes the only release criterion"], correctIndex: 1, explanation: "Shared validation evidence keeps comparisons fair." },
    { id: "q7", question: "Which statement about network capacity is most accurate?", choices: ["Deeper is always better for every school dataset size","Capacity helps complex patterns but needs validation checks","Loss is optional once the architecture looks impressive","Weights never change after the first training epoch while ski"], correctIndex: 1, explanation: "Capacity is a tradeoff, not a trophy." }
  ],
  reflection: { prompt: "Describe an overfitting pattern on a train/validation plot and the first fix you would try.", placeholder: "Write your answer…" },
};
