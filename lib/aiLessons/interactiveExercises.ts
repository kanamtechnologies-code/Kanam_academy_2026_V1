import type { AIBonusActivity } from "@/components/ai/AILessonCanvas";

export const AI_INTERACTIVE_BY_LESSON: Record<string, AIBonusActivity[]> = {
  "ai-1": [
    {
      id: "ai1-parsons",
      kind: "parsons",
      title: "Classifier steps",
      prompt:
        "A phone app sorts pet photos into cat or dog. Put the steps in the order a narrow AI classifier actually works.",
      languageLabel: "process",
      lines: [
        "Collect many labeled cat and dog photos",
        "Extract visual patterns (ears, fur, snout shape)",
        "Train a model that maps patterns → label",
        "Show a new photo and get a prediction",
        "Check mistakes and improve with more examples",
      ],
      explanation:
        "Narrow AI learns from labeled examples, finds patterns, predicts on new inputs, then improves — it doesn't 'understand' pets the way you do.",
    },
    {
      id: "ai1-debug",
      kind: "debug",
      title: "Myth bug",
      prompt: "A classmate claims this about AI. Spot the real mistake.",
      contentLabel: "Buggy claim",
      buggyContent:
        '"Chatbots and cat-photo apps are the same kind of AI — both are general intelligence that can do any human task."',
      choices: [
        "They're both narrow tools built for limited jobs, not general human-level AI",
        "Cat apps are AI but chatbots aren't, because chatbots only use text",
        "Both are general AI; the only difference is the screen size",
        "AI never uses pattern matching, so the claim is wrong for that reason",
      ],
      correctIndex: 0,
      hint: "Think narrow vs general — what can each system actually do?",
      explanation:
        "Today's tools are mostly narrow AI: great at one job (classify pets, predict next words). General AI that matches humans across every task doesn't exist yet.",
      imageSrc: "/images/lessons/ai-ex-narrow-vs-general.png",
      imageAlt: "Diagram contrasting narrow AI tools with general intelligence",
    },
    {
      id: "ai1-predict",
      kind: "predict",
      title: "What will it say?",
      prompt:
        "A cat/dog classifier was trained only on fluffy house cats and golden retrievers. Predict what label it will most likely give a photo of a hairless Sphynx cat.",
      scenario:
        "Training set: fluffy cats + golden retrievers only.\nNew photo: hairless Sphynx cat (no fur, big ears).\nThe model must pick cat or dog.",
      acceptedAnswers: ["dog", "dog label", "probably dog", "misclassify as dog"],
      explanation:
        "With no hairless cats in training, fur patterns dominate — the Sphynx can look 'not cat-like' to the model and get mislabeled as dog. Narrow AI only knows what it saw.",
      placeholder: "cat or dog?",
      imageSrc: "/images/lessons/ai-ex-narrow-vs-general.png",
      imageAlt: "Narrow classifier making a guess from limited training examples",
    },
  ],

  "ai-2": [
    {
      id: "ai2-parsons",
      kind: "parsons",
      title: "Feed prediction",
      prompt:
        "Your video app decides what to show next. Reorder how a recommendation system usually works.",
      languageLabel: "process",
      lines: [
        "Log what you watch, like, skip, and search",
        "Find patterns in your past behavior",
        "Score new videos by predicted interest",
        "Rank and show the top suggestions in your feed",
      ],
      explanation:
        "Everyday AI predicts what you'll want next from your data trail — then ranks content. That's useful, but it also means the app is learning a lot about you.",
    },
    {
      id: "ai2-debug",
      kind: "debug",
      title: "Tradeoff bug",
      prompt: "A friend posts this 'privacy tip.' Find the flawed decision.",
      contentLabel: "Buggy advice",
      buggyContent:
        '"I turned on every personalization feature and shared my contacts, location, and mic access so recommendations get smarter. There\'s no downside — more data always equals better AI with zero cost to me."',
      choices: [
        "More personal data can improve predictions, but you trade privacy and control",
        "Personalization never uses your data, so the tip is fine",
        "Sharing contacts always makes AI less accurate",
        "Location data is illegal for every app to collect",
      ],
      correctIndex: 0,
      hint: "Convenience and privacy often pull in opposite directions.",
      explanation:
        "AI around you thrives on data. Smarter feeds can mean better suggestions — and a bigger profile of your habits. Smart users weigh the tradeoff, not pretend it doesn't exist.",
    },
    {
      id: "ai2-predict",
      kind: "predict",
      title: "Next video?",
      prompt:
        "Predict which video type the feed will push hardest after this watch history.",
      scenario:
        "Last 20 watches: 18 skate clips, 1 cooking short, 1 news clip.\nYou liked every skate video and skipped the cooking one halfway.\nThe app ranks by predicted watch time.",
      acceptedAnswers: [
        "skate",
        "skate clips",
        "more skate videos",
        "skating videos",
      ],
      explanation:
        "Recommenders double down on strong signals. Heavy skate watching + likes → more skate content. That's prediction from patterns, not mind-reading.",
      placeholder: "What kind of video?",
    },
  ],

  "ai-3": [
    {
      id: "ai3-parsons",
      kind: "parsons",
      title: "See then hear",
      prompt:
        "A smart speaker wakes on a phrase, then listens. Put the sensing pipeline in order.",
      languageLabel: "process",
      lines: [
        "Mic captures sound as a waveform (numbers over time)",
        "Wake-word detector checks for the trigger phrase",
        "If matched, start recording the full request",
        "Convert speech features into text or commands",
        "Run the command or reply with speech",
      ],
      explanation:
        "Computers don't 'hear' like you — they turn sound into numbers, spot a wake pattern, then process the rest. Bad input (noise, mumbling) breaks the chain early.",
    },
    {
      id: "ai3-debug",
      kind: "debug",
      title: "Bad input",
      prompt: "This vision pipeline keeps failing in class demos. What's the real bug?",
      contentLabel: "Broken setup",
      buggyContent:
        "Camera feed → AI labels objects\nDemo room: lights off, phone flashlight waving, blurry 2-megapixel webcam, kids walking in front of the lens\nTeacher: \"The model is broken — it should still see everything perfectly.\"",
      choices: [
        "Garbage-in: dark, blurry, blocked pixels wreck recognition before the model can help",
        "AI vision never needs light because it uses sound instead",
        "Wake words control cameras, so the mic setting is the only problem",
        "Higher megapixels always fix darkness with no other changes",
      ],
      correctIndex: 0,
      hint: "What does a camera actually send the model — clear pixels or mush?",
      explanation:
        "See-and-hear AI depends on clean signals. Pixels and waveforms full of noise, blur, or darkness aren't 'understood' — they're just bad data.",
      imageSrc: "/images/lessons/ai-ex-pixels.png",
      imageAlt: "Pixel grid and waveform illustrating how sensors turn the world into data",
    },
    {
      id: "ai3-predict",
      kind: "predict",
      title: "Wake or not?",
      prompt:
        "Predict whether the speaker will wake and start listening.",
      scenario:
        'Wake word: "Hey Helper"\nYou say (quietly, TV blasting): "hey... uh... helper? can you—"\nMic also picks up a commercial saying "Hey, help her find deals!"',
      acceptedAnswers: [
        "no",
        "won't wake",
        "probably not",
        "fail / no wake",
      ],
      explanation:
        "Wake-word detectors need a clear match. Mumbling + loud TV + similar-sounding ads = missed or false triggers. Sensing systems are picky about input quality.",
      placeholder: "wake or not?",
      imageSrc: "/images/lessons/ai-ex-pixels.png",
      imageAlt: "Audio waveform representing a messy wake-word attempt",
    },
  ],

  "ai-4": [
    {
      id: "ai4-parsons",
      kind: "parsons",
      title: "Into features",
      prompt:
        "You turn a school essay into something a model can use. Reorder the representation steps.",
      languageLabel: "process",
      lines: [
        "Start with the raw essay text",
        "Split into tokens (words or pieces)",
        "Choose features the model will see",
        "Accept that some meaning is lost in the numbers",
        "Feed the feature vector into the model",
      ],
      explanation:
        "The world becomes data through tokens and features — useful, but lossy. What you leave out of the representation can't be recovered later.",
    },
    {
      id: "ai4-debug",
      kind: "debug",
      title: "Lossy bug",
      prompt: "This student project 'represents' song mood for an AI. Spot the flaw.",
      contentLabel: "Flawed pipeline",
      buggyContent:
        "Feature list for each song: only BPM (beats per minute)\nGoal: predict if a song feels happy, sad, angry, or chill\nStudent: \"One number is enough — the AI will magically know the lyrics and instruments too.\"",
      choices: [
        "BPM alone drops lyrics, instruments, and tone — too much representation loss for mood",
        "BPM is illegal to measure, so the pipeline can't run",
        "AI always invents missing features, so one number is fine",
        "Tokens only exist for images, never for audio or text",
      ],
      correctIndex: 0,
      hint: "What information never enters the model if you only store BPM?",
      explanation:
        "Features are a compressed map of reality. If your map is too thin, the model can't learn the task — not because it's 'dumb,' but because the data left the meaning behind.",
    },
    {
      id: "ai4-predict",
      kind: "predict",
      title: "What's lost?",
      prompt:
        "Predict the main thing this representation throws away.",
      scenario:
        "You store each classmate only as: height (cm) + favorite subject code.\nTask later: recommend who would enjoy a weekend art club meetup.",
      acceptedAnswers: [
        "interests in art",
        "art interest / hobbies",
        "personality and art skills",
        "whether they like art",
      ],
      explanation:
        "Height and subject codes don't capture art interest, skill, or social vibe. Representation loss means the model never saw the signal it needed.",
      placeholder: "What info is missing?",
    },
  ],

  "ai-5": [
    {
      id: "ai5-parsons",
      kind: "parsons",
      title: "Spam filter",
      prompt:
        "Build a spam filter the way supervised learning works. Put the steps in order.",
      languageLabel: "process",
      lines: [
        "Gather emails labeled spam or not-spam",
        "Extract features (words, links, sender patterns)",
        "Train a model on those examples",
        "Test on new emails the model hasn't seen",
        "Deploy and watch for new spam tricks",
      ],
      explanation:
        "Learning from examples means: labeled data → features → model → check on new cases. The filter only knows patterns that appeared in training.",
    },
    {
      id: "ai5-debug",
      kind: "debug",
      title: "Training bug",
      prompt: "This spam project keeps calling homework emails 'spam.' What's wrong?",
      contentLabel: "Buggy training plan",
      buggyContent:
        "Training data: 5,000 spam ads + 20 real school emails\nLabels: all ads = spam; the 20 school emails = not-spam\nStudent: \"More total emails is always better — class balance doesn't matter.\"",
      choices: [
        "Severely skewed examples teach the model 'almost everything is spam'",
        "Spam filters can't use word features at all",
        "You must train only on images, never on email text",
        "Twenty not-spam examples are plenty if spam has 5,000",
      ],
      correctIndex: 0,
      hint: "What does the model see most often during training?",
      explanation:
        "Models learn from the examples you give. If almost every training email is spam, 'not-spam' looks rare and school messages get crushed. Data quality and balance matter.",
    },
    {
      id: "ai5-predict",
      kind: "predict",
      title: "Spam or not?",
      prompt:
        "Predict the model's likely label for this new email.",
      scenario:
        "Training taught: messages with 'FREE $$$' + weird links → spam.\nNew email from your teacher: 'FREE tutoring after school — sign-up link on the portal.'\nNo other strong not-spam signals were in training for the word FREE.",
      acceptedAnswers: ["spam", "likely spam", "flagged as spam", "spam label"],
      explanation:
        "The model matches patterns, not intent. 'FREE' + link looked like spam in training, so a legit tutoring note can get mislabeled until you add better examples.",
      placeholder: "spam or not-spam?",
    },
  ],

  "ai-6": [
    {
      id: "ai6-parsons",
      kind: "parsons",
      title: "Test set flow",
      prompt:
        "You're checking whether a model really learned. Reorder a solid train/test routine.",
      languageLabel: "process",
      lines: [
        "Split data into train set and held-out test set",
        "Train the model only on the train set",
        "Score accuracy on the untouched test set",
        "Watch for overfitting (great train, weak test)",
        "Adjust and re-check without peeking at test labels early",
      ],
      explanation:
        "A test set is your honesty check. Memorizing training examples (overfitting) looks amazing until new data arrives.",
    },
    {
      id: "ai6-debug",
      kind: "debug",
      title: "Accuracy trap",
      prompt: "A team brags about 99% accuracy. Find the real bug in their claim.",
      contentLabel: "Suspicious report",
      buggyContent:
        "Dataset: 990 'normal login' + 10 'account takeover' cases\nModel always predicts: normal login\nReported accuracy: 99%\nTeam: \"Ship it — 99% means we catch hackers.\"",
      choices: [
        "Accuracy is misleading here — the model never catches the rare attacks",
        "99% always proves a model is fair and safe",
        "Test sets are illegal, so accuracy can't be measured",
        "Overfitting only happens with images, not login data",
      ],
      correctIndex: 0,
      hint: "What happens to the 10 attack cases if the model always says 'normal'?",
      explanation:
        "With imbalanced data, a lazy 'always normal' model looks accurate but fails the job. Accuracy alone can hide overfitting and rare-but-critical mistakes.",
    },
    {
      id: "ai6-predict",
      kind: "predict",
      title: "Train vs test",
      prompt:
        "Predict which score will drop if the model overfit the homework examples.",
      scenario:
        "Quiz-bot memorizes every practice question word-for-word.\nTrain accuracy: 100%.\nFriday's real quiz uses new wording on the same topics.",
      acceptedAnswers: [
        "test accuracy",
        "test score",
        "quiz / test performance",
        "held-out test accuracy",
      ],
      explanation:
        "Overfitting inflates train scores. On a true test set (new wording), performance falls — that's why we hold data out.",
      placeholder: "Which score drops?",
    },
  ],

  "ai-7": [
    {
      id: "ai7-parsons",
      kind: "parsons",
      title: "Stronger prompt",
      prompt:
        "Turn a weak generative request into a stronger one. Order the upgrade steps.",
      languageLabel: "prompt recipe",
      lines: [
        "State the task clearly (what to create)",
        "Add context (audience, topic, constraints)",
        "Specify format (length, bullets, tone)",
        "Give one short example of the style you want",
        "Generate, read critically, then iterate",
      ],
      explanation:
        "Generative AI creates new text/images by predicting likely continuations. Clear task + context + format beats a vague one-liner.",
    },
    {
      id: "ai7-debug",
      kind: "debug",
      title: "Weak prompt",
      prompt: "This generative prompt keeps producing useless blur. What's the bug?",
      contentLabel: "Buggy prompt",
      buggyContent: "write something cool about school",
      choices: [
        "Too vague — no task detail, audience, length, or format for the model to follow",
        "Generative AI can only classify, never create, so any prompt fails",
        "The word 'school' is banned in all models",
        "You must only use images; text prompts never work",
      ],
      correctIndex: 0,
      hint: "Could two different people imagine totally different outputs from this?",
      explanation:
        "Next-token generators need steering. 'Something cool' isn't a spec — strong prompts define create-what, for-whom, and in-what-shape.",
      imageSrc: "/images/lessons/ai-ex-prompt.png",
      imageAlt: "Example of upgrading a vague prompt into a clear generative request",
    },
    {
      id: "ai7-predict",
      kind: "predict",
      title: "Create or classify?",
      prompt:
        "Predict which job this prompt is asking for: create or classify.",
      scenario:
        'User prompt: "Invent a 4-panel comic about a phone that learns to silence itself during class. Give panel captions."',
      acceptedAnswers: ["create", "generative / create", "create (generate)", "generation"],
      explanation:
        "Inventing a comic is generative (create). Classifying would be labeling an existing comic as funny/not funny. Same AI family, different job.",
      placeholder: "create or classify?",
      imageSrc: "/images/lessons/ai-ex-prompt.png",
      imageAlt: "Generative prompt asking the model to invent new content",
    },
  ],

  "ai-8": [
    {
      id: "ai8-parsons",
      kind: "parsons",
      title: "Next-word path",
      prompt:
        "Trace how an LLM builds a reply. Put the inside steps in order.",
      languageLabel: "process",
      lines: [
        "Read your prompt as tokens in the context window",
        "Predict likely next tokens one after another",
        "Stay limited by how much context fits",
        "Produce fluent text that may still be wrong",
        "You must verify facts the model might hallucinate",
      ],
      explanation:
        "LLMs are next-word engines with a finite context window. Fluency ≠ truth — hallucinations happen when plausible text isn't grounded.",
    },
    {
      id: "ai8-debug",
      kind: "debug",
      title: "Hallucination",
      prompt: "This chatbot answer sounds perfect. Spot the real problem.",
      contentLabel: "Suspicious output",
      buggyContent:
        'Q: "What year did our middle school win the state robotics finals?"\nA: "Your school won in 2019 under Coach Rivera — the trophy is in the main lobby. Source: Official State Robotics Archive, Vol. 12."\n(Nobody on staff has heard of that trophy or archive.)',
      choices: [
        "It hallucinated a confident fake fact and citation because LLMs predict plausible text",
        "Context windows make every local school fact automatically true",
        "Next-token prediction guarantees historical accuracy",
        "If the grammar is perfect, the facts must be perfect",
      ],
      correctIndex: 0,
      hint: "Does sounding official mean the archive exists?",
      explanation:
        "Inside an LLM, the goal is likely next words — not a verified database lookup. Confident tone and fake citations are classic hallucination tells.",
      imageSrc: "/images/lessons/ai-ex-hallucination.png",
      imageAlt: "Confident AI answer contrasted with a missing real source",
    },
    {
      id: "ai8-predict",
      kind: "predict",
      title: "What next?",
      prompt:
        "Predict the most likely next word the model will generate.",
      scenario:
        'Context so far: "Please pass the salt and ___"\n(Common English dinner talk; model picks the highest-probability continuation.)',
      acceptedAnswers: ["pepper", "the pepper", "pepper please"],
      explanation:
        "LLMs extend patterns. After 'salt and…' in everyday English, 'pepper' is a high-probability next word — that's next-token prediction, not understanding dinner.",
      placeholder: "Next word?",
      imageSrc: "/images/lessons/ai-ex-hallucination.png",
      imageAlt: "Illustration of an LLM predicting the next word in a sentence",
    },
  ],

  "ai-9": [
    {
      id: "ai9-parsons",
      kind: "parsons",
      title: "Prompt parts",
      prompt:
        "Build a solid school prompt. Order the pieces: task, context, role, format.",
      languageLabel: "prompt recipe",
      lines: [
        "Role: You are a patient science tutor for 8th graders",
        "Task: Explain photosynthesis in plain language",
        "Context: Student already knows cells have chloroplasts",
        "Format: 5 bullet points + one analogy with phones/batteries",
      ],
      explanation:
        "Strong prompts stack role, task, context, and format so the model isn't guessing what 'help with science' means.",
    },
    {
      id: "ai9-debug",
      kind: "debug",
      title: "Missing pieces",
      prompt: "This prompt keeps missing the assignment requirements. What's broken?",
      contentLabel: "Buggy prompt",
      buggyContent:
        "Role: (none)\nTask: help\nContext: (none)\nFormat: (none)\nFull text: \"help\"",
      choices: [
        "It lacks task, context, role, and format — the model has almost nothing to aim at",
        "Prompts must be exactly one emoji long",
        "Roles are only for image models, never chat",
        "Format instructions make AI refuse to answer",
      ],
      correctIndex: 0,
      hint: "Count how many of the four prompt building blocks are present.",
      explanation:
        "Prompting is specifying the job. Without task/context/role/format, you get generic mush — not because AI 'won't help,' but because you didn't aim it.",
      imageSrc: "/images/lessons/ai-ex-prompt.png",
      imageAlt: "Prompt checklist showing task, context, role, and format",
    },
    {
      id: "ai9-predict",
      kind: "predict",
      title: "Which format?",
      prompt:
        "Predict which format the model was told to use.",
      scenario:
        "Output begins:\n1. ...\n2. ...\n3. ...\nEach item is one short sentence. No paragraphs.",
      acceptedAnswers: [
        "numbered list",
        "numbered list of 3",
        "1-2-3 list",
        "ordered list",
      ],
      explanation:
        "The shape of the answer usually mirrors the format instruction. Numbered short items → the prompt almost certainly asked for a numbered list.",
      placeholder: "What format?",
      imageSrc: "/images/lessons/ai-ex-prompt.png",
      imageAlt: "Structured prompt output in a numbered list format",
    },
  ],

  "ai-10": [
    {
      id: "ai10-parsons",
      kind: "parsons",
      title: "Iterate loop",
      prompt:
        "You're improving a weak answer. Reorder a better-prompting cycle.",
      languageLabel: "process",
      lines: [
        "Try a clear first prompt",
        "Read the output and mark what's off",
        "Add few-shot examples or step-by-step instructions",
        "Regenerate with the tighter prompt",
        "Repeat until the result is usable",
      ],
      explanation:
        "Better prompts aren't one-and-done. Few-shot examples, step-by-step asks, and iteration turn 'meh' into 'usable.'",
    },
    {
      id: "ai10-debug",
      kind: "debug",
      title: "Few-shot fail",
      prompt: "This few-shot prompt confuses the model. Find the bug.",
      contentLabel: "Broken few-shot",
      buggyContent:
        "Rewrite texts in a calm teacher tone.\nExample 1 input: \"THIS HW IS DUMB!!!\"\nExample 1 output: \"🚀🔥 YOLO submit blank lol\"\nExample 2 input: \"i cant find the rubric\"\nExample 2 output: \"idk figure it out\"\nNow rewrite: \"The due date is unclear.\"",
      choices: [
        "The examples show the opposite tone of the instructions — few-shots must match the goal",
        "Few-shot prompting is impossible with text models",
        "You can never include more than one example",
        "Step-by-step instructions ban examples forever",
      ],
      correctIndex: 0,
      hint: "Do the examples demonstrate calm teacher tone — or something else?",
      explanation:
        "Models copy patterns in your examples. If few-shots clown around while the instruction says 'calm teacher,' the examples usually win.",
      imageSrc: "/images/lessons/ai-ex-prompt.png",
      imageAlt: "Few-shot prompt examples that conflict with the written instructions",
    },
    {
      id: "ai10-predict",
      kind: "predict",
      title: "After iterate?",
      prompt:
        "Predict what a student should do after a still-messy AI draft.",
      scenario:
        "Draft 1: too long and off-topic.\nStudent adds: 'Use 4 bullets, stay on thesis, show steps.'\nDraft 2 is closer but one bullet is still vague.",
      acceptedAnswers: [
        "iterate again",
        "prompt again / revise prompt",
        "tighten the prompt and regenerate",
        "keep iterating",
      ],
      explanation:
        "Iteration is the skill: each pass adds constraints. Don't freeze on draft 1 — or draft 2 — if one more clear ask would fix it.",
      placeholder: "Next move?",
    },
  ],

  "ai-11": [
    {
      id: "ai11-parsons",
      kind: "parsons",
      title: "Verify steps",
      prompt:
        "An AI gave you a 'fact' for an essay. Order a safe fact-check routine.",
      languageLabel: "process",
      lines: [
        "Spot risky specifics (stats, dates, quotes, studies)",
        "Search a trusted source for the same claim",
        "Cross-check with a second independent source",
        "Verify any citation actually exists",
        "Use the claim only if confirmed — else drop it",
      ],
      explanation:
        "Don't trust — verify. Hallucinations wear confidence. Your job is source, cross-check, and confirm citations are real.",
    },
    {
      id: "ai11-debug",
      kind: "debug",
      title: "Fake citation",
      prompt: "A student is about to paste this into a paper. What's the bug in their plan?",
      contentLabel: "Risky decision",
      buggyContent:
        'AI says: "According to Chen & Alvarez (2018) in the Journal of Teen Sleep, students who nap 17 minutes score 41.2% higher on Friday quizzes."\nStudent plan: "Cite it. If the AI wrote a journal name, the article must exist."',
      choices: [
        "AI can invent realistic citations — you must confirm the source exists before citing",
        "Any percentage with a decimal is automatically true",
        "Journal names prove peer review happened in real life",
        "Fact-checking is only for images, not essay stats",
      ],
      correctIndex: 0,
      hint: "Can a model generate a fake author, year, and journal that look real?",
      explanation:
        "Fake citations are a hallmark hallucination. Polished references are easy to generate and dangerous to trust without a real lookup.",
      imageSrc: "/images/lessons/ai-ex-verify.png",
      imageAlt: "Student checking whether an AI citation is real",
    },
    {
      id: "ai11-predict",
      kind: "predict",
      title: "Trust level?",
      prompt:
        "Predict the risk level: low or high — for trusting this AI task without checking.",
      scenario:
        "You paste your own paragraph and ask: \"Make this clearer, same meaning, keep my ideas.\"\nNo new facts, dates, or sources requested.",
      acceptedAnswers: ["low", "low risk", "usually low", "safer / low"],
      explanation:
        "Language reshaping of text you provided is usually lower risk. Supplying new facts/stats/citations is high risk and needs verify mode.",
      placeholder: "low or high?",
      imageSrc: "/images/lessons/ai-ex-hallucination.png",
      imageAlt: "Risk meter for trusting AI on language tasks vs fact tasks",
    },
  ],

  "ai-12": [
    {
      id: "ai12-parsons",
      kind: "parsons",
      title: "Integrity path",
      prompt:
        "Use AI for school the honest way. Put the integrity steps in order.",
      languageLabel: "process",
      lines: [
        "Know your teacher's AI rules before you start",
        "Use AI for brainstorming, outlining, or feedback — not secret full answers",
        "Write the final work in your own words and understanding",
        "Cite or disclose AI help when required",
        "Be ready to explain your thinking without the chat open",
      ],
      explanation:
        "Help builds skills; cheating outsources the learning. Integrity means following rules, keeping authorship, and staying able to explain your work.",
    },
    {
      id: "ai12-debug",
      kind: "debug",
      title: "Help vs cheat",
      prompt: "Which decision crosses into cheating?",
      contentLabel: "Student plan",
      buggyContent:
        "Assignment: write a personal reflection on a book you read.\nPlan: paste the prompt into a chatbot, submit the AI's full essay as your own, and deny using AI if asked.",
      choices: [
        "Submitting AI-written work as yours and hiding it breaks authorship and honesty rules",
        "Brainstorming discussion questions with AI is always cheating",
        "Asking AI to explain a confusing paragraph is the same as submitting its essay",
        "Disclosure is never needed if the grammar looks human",
      ],
      correctIndex: 0,
      hint: "Who actually did the thinking and writing that gets graded?",
      explanation:
        "School-help AI can clarify or spark ideas when allowed. Passing off generated work — and lying about it — is cheating because the learning and authorship aren't yours.",
    },
    {
      id: "ai12-predict",
      kind: "predict",
      title: "Allowed?",
      prompt:
        "Predict whether this use is generally help or cheat (assume typical school rules).",
      scenario:
        "You wrote a draft yourself. You ask AI: \"Point out unclear sentences and ask me questions so I can revise.\" You rewrite every line yourself.",
      acceptedAnswers: [
        "help",
        "helpful / allowed help",
        "help not cheat",
        "academic help",
      ],
      explanation:
        "Feedback that keeps you writing and thinking is help. The line is crossed when AI replaces your work or you hide required disclosure.",
      placeholder: "help or cheat?",
    },
  ],

  "ai-13": [
    {
      id: "ai13-parsons",
      kind: "parsons",
      title: "Bias check",
      prompt:
        "A hiring tool seems unfair. Order a basic bias-investigation process.",
      languageLabel: "process",
      lines: [
        "Define what 'fair' means for this decision",
        "Inspect who appears in the training data",
        "Measure outcomes across groups (who gets hired/rejected)",
        "Find skewed patterns tied to the data or labels",
        "Fix data/process and re-test before trusting the tool",
      ],
      explanation:
        "Bias often starts in skewed data and labels. Fairness work means measuring impacts and fixing the pipeline — not hoping the model is 'neutral.'",
    },
    {
      id: "ai13-debug",
      kind: "debug",
      title: "Hiring skew",
      prompt: "This résumé screener keeps failing one group. What's the real bug?",
      contentLabel: "Flawed system",
      buggyContent:
        "Training data: 10 years of 'successful hires' from a company that historically hired mostly one demographic for tech roles\nFeatures include: zip code, hobbies scraped from socials, and 'culture fit' notes\nTeam: \"The AI is objective math — it can't be biased.\"",
      choices: [
        "Skewed historical hires + proxy features can bake past unfairness into the model",
        "Math formulas erase all human bias automatically",
        "Zip codes are never correlated with anything sensitive",
        "Bias only happens in image filters, never hiring tools",
      ],
      correctIndex: 0,
      hint: "If the past was unfair, what does 'learn from past hires' copy?",
      explanation:
        "Models mirror their data. Biased history plus proxies (like zip code) can recreate unfair patterns while sounding 'objective.'",
      imageSrc: "/images/lessons/ai-ex-bias.png",
      imageAlt: "Uneven training data leading to unfair model outcomes",
    },
    {
      id: "ai13-predict",
      kind: "predict",
      title: "Who gets hurt?",
      prompt:
        "Predict which applicants the model will unfairly down-rank most.",
      scenario:
        "Training: almost all 'good hire' labels came from one neighborhood's résumés.\nNew applicants from other neighborhoods use different school names and activity lists.\nModel rewards patterns that match the old 'good hire' pile.",
      acceptedAnswers: [
        "other neighborhoods",
        "applicants from other areas",
        "people outside the training neighborhood",
        "underrepresented neighborhoods",
      ],
      explanation:
        "When success labels come from a narrow slice of people, outsiders look 'unlike past successes' — even when they're qualified. That's skewed-data bias in action.",
      placeholder: "Which group?",
      imageSrc: "/images/lessons/ai-ex-bias.png",
      imageAlt: "Biased hiring model favoring patterns from skewed training data",
    },
  ],

  "ai-14": [
    {
      id: "ai14-parsons",
      kind: "parsons",
      title: "Stay private",
      prompt:
        "Someone asks you to 'verify' a weird video call. Order safe moves.",
      languageLabel: "process",
      lines: [
        "Pause — don't panic or send codes/money",
        "Refuse to paste passwords, IDs, or 2FA codes into chats/tools",
        "Contact the real person on a known-good channel",
        "Check whether the media could be a deepfake scam",
        "Report and delete suspicious messages",
      ],
      explanation:
        "Privacy and deepfake safety start with not feeding secrets to random tools — and verifying identity out-of-band when something feels off.",
    },
    {
      id: "ai14-debug",
      kind: "debug",
      title: "Secret paste",
      prompt: "Spot the dangerous AI-use decision.",
      contentLabel: "Bad habit",
      buggyContent:
        "Student pastes into a public chatbot:\n\"Here's my student ID, home address, mom's phone, and the SMS code I just got — summarize my account recovery options.\"",
      choices: [
        "Never paste secrets, IDs, or codes into AI tools — that data can leak or be misused",
        "Chatbots are banks, so sharing codes is required",
        "Deepfakes only affect celebrities, never students",
        "Addresses are fine to share if you ask politely",
      ],
      correctIndex: 0,
      hint: "Would you post that same info on a public billboard?",
      explanation:
        "AI tools aren't private vaults. Pasting secrets trains a bad habit attackers love — especially alongside deepfake scams that impersonate people you trust.",
    },
    {
      id: "ai14-predict",
      kind: "predict",
      title: "Scam or real?",
      prompt:
        "Predict the safer next action.",
      scenario:
        "A video call 'from your principal' demands gift cards to 'fix your account,' sounds slightly off, and refuses to switch to the school office line.",
      acceptedAnswers: [
        "hang up and verify",
        "call school on official number",
        "don't buy cards / verify first",
        "treat as likely deepfake scam",
      ],
      explanation:
        "Pressure + money + refusal to verify on a known channel = classic scam pattern, with or without deepfake video. Slow down and check independently.",
      placeholder: "What should you do?",
    },
  ],

  "ai-15": [
    {
      id: "ai15-parsons",
      kind: "parsons",
      title: "AI + human",
      prompt:
        "A future job uses AI as a teammate. Order a strong human+AI workflow.",
      languageLabel: "process",
      lines: [
        "Clarify the human goal and constraints",
        "Let AI draft options or speed up busywork",
        "Apply judgment, ethics, and domain skill",
        "Verify outputs and fix mistakes",
        "Communicate the final decision to people",
      ],
      explanation:
        "Durable careers pair AI speed with human judgment, verification, and communication — not blind autopilot.",
    },
    {
      id: "ai15-debug",
      kind: "debug",
      title: "Skill myth",
      prompt: "This career advice is buggy. What's wrong?",
      contentLabel: "Flawed advice",
      buggyContent:
        '"Don\'t bother learning writing, teamwork, or problem-solving. AI will do every job alone. Humans won\'t need durable skills — just click Generate forever."',
      choices: [
        "Humans still need judgment, communication, and problem-solving to direct and check AI",
        "AI already replaced all jobs worldwide last year",
        "Only coding matters; writing skills never transfer",
        "Teamwork is useless when tools exist",
      ],
      correctIndex: 0,
      hint: "Who sets goals, catches errors, and talks to clients when AI drafts something?",
      explanation:
        "The future of work is AI+human. Durable skills — clear thinking, ethics, collaboration, verification — become more valuable, not less.",
    },
    {
      id: "ai15-predict",
      kind: "predict",
      title: "Which skill?",
      prompt:
        "Predict which durable skill matters most in this scenario.",
      scenario:
        "AI drafts three budget plans for a school club.\nNumbers look neat, but one plan forgets competition fees.\nYou must choose, fix, and explain the plan to the advisor.",
      acceptedAnswers: [
        "judgment",
        "critical judgment / checking",
        "verification and judgment",
        "problem-solving / judgment",
      ],
      explanation:
        "AI can draft; humans still judge what's missing, fix it, and explain the call. That's the durable skill edge.",
      placeholder: "Name the skill",
    },
  ],

  "ai-16": [
    {
      id: "ai16-parsons",
      kind: "parsons",
      title: "Eval checklist",
      prompt:
        "Before your class adopts an AI tool, order a capstone evaluation checklist.",
      languageLabel: "process",
      lines: [
        "Define the job the tool should do",
        "Test with real school examples (not just demos)",
        "Check accuracy, bias, and privacy risks",
        "Confirm human review and disclosure rules",
        "Decide: adopt, limit use, or reject",
      ],
      explanation:
        "Capstone thinking: don't adopt hype — evaluate purpose, evidence, fairness, privacy, and human oversight, then decide.",
    },
    {
      id: "ai16-debug",
      kind: "debug",
      title: "Shiny tool",
      prompt: "The student council wants to buy this AI. Spot the evaluation bug.",
      contentLabel: "Weak decision",
      buggyContent:
        "Tool pitch: \"100% accurate, zero bias, no privacy issues — trust us.\"\nCouncil plan: skip testing, skip policy, buy today because the logo looks futuristic.",
      choices: [
        "You must test claims, check privacy/bias, and set human rules — marketing isn't evidence",
        "Futuristic logos guarantee safety",
        "If a vendor says 100% accurate, testing is unnecessary",
        "Privacy reviews are only for printers",
      ],
      correctIndex: 0,
      hint: "Which checklist items did they skip entirely?",
      explanation:
        "Evaluating a tool means verifying claims with your own tasks and risks. 'Trust us' is not a checklist.",
      imageSrc: "/images/lessons/ai-ex-verify.png",
      imageAlt: "Checklist for evaluating an AI tool before adopting it",
    },
    {
      id: "ai16-predict",
      kind: "predict",
      title: "Adopt or not?",
      prompt:
        "Predict the responsible decision: adopt, limit, or reject.",
      scenario:
        "Homework helper app:\n• Leaks pastes into vendor training by default\n• No way to turn off data sharing\n• Demo accuracy looks fine on toy problems\n• School has no disclosure policy yet",
      acceptedAnswers: [
        "reject",
        "reject for now",
        "don't adopt / reject",
        "reject until privacy fixed",
      ],
      explanation:
        "Privacy red flags + no human policy = reject (or hard limit) until risks are fixed. Capstone evaluation prioritizes people over shiny demos.",
      placeholder: "adopt, limit, or reject?",
      imageSrc: "/images/lessons/ai-ex-verify.png",
      imageAlt: "Evaluation outcome after a privacy-risk checklist fails",
    },
  ],
};
