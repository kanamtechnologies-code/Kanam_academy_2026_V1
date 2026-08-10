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
      lineExplanations: [
        "Labeled examples come first because a classifier needs known answers to learn from. Without photos already tagged cat or dog, later steps have no ground truth to connect patterns to labels.",
        "Pattern extraction comes next so the system turns raw pixels into useful signals like ear shape or fur texture. If you skip this, the model has only messy numbers and no shared features to compare across photos.",
        "Training must follow features because that is when the model learns which patterns predict which label. Predicting before training would be guessing with no learned mapping from examples.",
        "Prediction on a new photo comes after training so the model can apply what it learned to an unseen input. Testing on the same labeled training set alone would not show whether it works on real new photos.",
        "Checking mistakes last closes the loop: errors reveal missing examples or weak patterns. Improving without measuring failures would leave the same blind spots in place.",
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
      lineExplanations: [
        "Logging comes first because recommendations need a trail of what you actually did. Without watch, like, skip, and search signals, the system has no personal history to learn from.",
        "Pattern-finding comes next so the app turns that trail into habits — genres you finish, creators you skip. Scoring videos before you know those patterns would rank content with no link to your tastes.",
        "Scoring predicted interest happens after patterns exist so each new video gets a number for how likely you are to watch. Ranking without scores would leave the feed unordered guesswork.",
        "Ranking and showing top picks last turns those scores into what you see. If the app showed everything before ranking, the feed would bury the best matches under noise.",
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
            "Sharing contacts always makes AI less accurate",
            "Personalization never uses your data, so the tip is fine",
            "More personal data can improve predictions, but you trade privacy and control",
            "Location data is illegal for every app to collect",
          ],
      correctIndex: 2,
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
      lineExplanations: [
        "Capture comes first because the device only works on numbers, not 'sound' as you experience it. Without a waveform, later detectors have nothing to scan for a wake phrase.",
        "The wake-word check comes next so the speaker stays mostly idle until the trigger pattern appears. Recording every full request without this filter would waste power and privacy on constant listening.",
        "Full recording starts only after a match so the system spends effort on real requests. Converting speech before the wake succeeds would process background chatter you never meant as a command.",
        "Speech-to-text or command features follow recording because the model needs the full utterance to interpret. Acting on raw waveforms without this step leaves the device with noise, not meaning.",
        "Running the command or speaking a reply is last because action depends on a parsed request. Doing this earlier would fire random actions before the system knows what you asked.",
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
            "Higher megapixels always fix darkness with no other changes",
            "Garbage-in: dark, blurry, blocked pixels wreck recognition before the model can help",
            "Wake words control cameras, so the mic setting is the only problem",
            "AI vision never needs light because it uses sound instead",
          ],
      correctIndex: 1,
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
      lineExplanations: [
        "Raw text comes first because that is the real-world input you care about. You cannot choose tokens or features until you have the essay itself to represent.",
        "Tokenizing next breaks continuous writing into pieces a computer can count and compare. Feature choice before tokens would skip the units models actually operate on.",
        "Choosing features after tokens decides which signals — word counts, lengths, topics — enter the model. Feeding everything unfiltered often includes noise; choosing nothing leaves the model empty.",
        "Acknowledging loss belongs here so you remember representation is a map, not the territory. If you pretend numbers keep every nuance, you will overtrust later predictions built on a thin slice of meaning.",
        "Feeding the vector last is when learning or prediction actually runs. Sending data earlier, before tokens and features exist, would give the model no usable input.",
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
            "Tokens only exist for images, never for audio or text",
            "AI always invents missing features, so one number is fine",
            "BPM is illegal to measure, so the pipeline can't run",
            "BPM alone drops lyrics, instruments, and tone — too much representation loss for mood",
          ],
      correctIndex: 3,
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
      lineExplanations: [
        "Labeled emails come first because supervised learning needs known answers. Without spam vs not-spam tags, training cannot learn which side of the line a message belongs on.",
        "Feature extraction next turns each email into signals like suspicious links or sender patterns. Training on raw blobs without features makes it harder to spot the patterns that separate spam from real mail.",
        "Training follows features so the model learns which signals predict the label. Testing or deploying before this step would ship a filter that has not learned anything yet.",
        "Held-out testing comes after training to measure real performance on unseen mail. Judging only on training emails can hide overfitting — memorizing old examples instead of generalizing.",
        "Deploy-and-monitor last because spammers change tactics after you ship. A filter that never updates will slowly miss new tricks that were not in the original training set.",
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
            "Spam filters can't use word features at all",
            "Twenty not-spam examples are plenty if spam has 5,000",
            "You must train only on images, never on email text",
            "Severely skewed examples teach the model 'almost everything is spam'",
          ],
      correctIndex: 3,
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
      lineExplanations: [
        "Splitting first protects an honesty check: some examples stay untouched for later. If you train on everything immediately, you have no fair test left to measure real learning.",
        "Training only on the train set comes next so the model never sees the held-out cases during learning. Mixing test examples into training leaks answers and inflates later scores.",
        "Scoring on the untouched test set follows training because that is the fair measure of generalization. Reporting only train accuracy can hide a model that merely memorized.",
        "Watching for overfitting comes after both scores exist so you can compare strong train results with weak test results. Without that contrast, memorization looks like success.",
        "Adjusting carefully last keeps the test set honest: tweak using train/validation ideas, then re-check. Peeking at test labels early turns the test into another training set and breaks the evaluation.",
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
            "99% always proves a model is fair and safe",
            "Accuracy is misleading here — the model never catches the rare attacks",
            "Test sets are illegal, so accuracy can't be measured",
            "Overfitting only happens with images, not login data",
          ],
      correctIndex: 1,
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
      lineExplanations: [
        "A clear task comes first so the model knows what to create, not just that you want 'something.' Without a goal, later context and format still aim at an undefined target.",
        "Context next narrows audience, topic, and constraints so the output fits your situation. Format alone cannot fix a reply aimed at the wrong reader or topic.",
        "Format instructions follow so length, structure, and tone are explicit. Leaving shape undefined often produces walls of text that ignore how you plan to use the answer.",
        "A short style example after the rules shows the pattern you want in concrete form. Models copy examples strongly — placing one here steers tone better than vague adjectives alone.",
        "Generate-then-critique last because prompting is a loop: read what you got, tighten the ask, try again. Stopping at the first draft skips the improvement that strong prompting depends on.",
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
            "Generative AI can only classify, never create, so any prompt fails",
            "Too vague — no task detail, audience, length, or format for the model to follow",
            "You must only use images; text prompts never work",
            "The word 'school' is banned in all models",
          ],
      correctIndex: 1,
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
      lineExplanations: [
        "Tokenizing the prompt first loads your words into the finite context the model can see. Prediction cannot start until the input exists as tokens inside that window.",
        "Next-token prediction follows because that is how the reply is built — one likely piece after another. Treating the model as a database lookup at this stage misunderstands the mechanism.",
        "Context limits sit in the middle of the process: only so much prompt-plus-reply fits at once. Ignoring the window explains why long chats drop earlier details or lose track.",
        "Fluent output comes next as a side effect of good next-token guesses, not of guaranteed truth. Sounding smooth can happen even when a claim is invented.",
        "Human verification last is required because hallucinations look confident. If you skip fact-checking, plausible wrong text can enter essays and decisions unchecked.",
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
            "If the grammar is perfect, the facts must be perfect",
            "Next-token prediction guarantees historical accuracy",
            "It hallucinated a confident fake fact and citation because LLMs predict plausible text",
            "Context windows make every local school fact automatically true",
          ],
      correctIndex: 2,
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
      lineExplanations: [
        "Role comes first so the model adopts a patient tutor stance for eighth graders before it writes. Without a role, tone and difficulty default to generic adult explanations that miss the audience.",
        "Task next states exactly what to create — explain photosynthesis in plain language. Role without a clear task still leaves the model guessing which science job to do.",
        "Context after the task tells the model what the student already knows so it can build on chloroplasts instead of restarting from zero. Skipping context often yields redundant or poorly leveled explanations.",
        "Format last shapes delivery into five bullets plus a phone/battery analogy so the answer is usable in class. Without format, even a correct explanation may arrive as an unusable wall of text.",
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
            "Format instructions make AI refuse to answer",
            "Roles are only for image models, never chat",
            "Prompts must be exactly one emoji long",
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
      lineExplanations: [
        "A clear first attempt comes first so you have something concrete to judge. You cannot improve a prompt you have never run.",
        "Reading and marking problems next turns vague disappointment into specific fixes — too long, off-topic, wrong tone. Adding examples before you know what failed wastes those examples on the wrong gaps.",
        "Few-shot or step-by-step upgrades follow diagnosis because they teach the pattern you just found missing. Regenerating without new instructions usually repeats the same flaws.",
        "Regenerating with the tighter prompt applies those upgrades to a fresh draft. Stopping after editing the prompt but never re-running leaves you with an untested improvement.",
        "Repeating until usable last treats prompting as iteration, not a single shot. One pass rarely nails school-ready work; each cycle adds constraints until the draft is good enough.",
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
            "Step-by-step instructions ban examples forever",
            "The examples show the opposite tone of the instructions — few-shots must match the goal",
            "You can never include more than one example",
            "Few-shot prompting is impossible with text models",
          ],
      correctIndex: 1,
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
      lineExplanations: [
        "Spotting risky specifics first focuses your energy on stats, dates, quotes, and studies — the claims most likely to be invented. Checking every adjective equally would waste time while the dangerous parts slip through.",
        "A trusted-source search next asks whether the claim appears outside the chat. Skipping this step leaves you trusting fluent text with no external anchor.",
        "A second independent source after the first reduces the chance one site copied an error. One matching page can still be wrong; agreement across unrelated sources raises confidence.",
        "Citation checks follow because models invent realistic-looking references. If the paper or journal does not exist, the claim should not enter your essay even if the sentence sounds academic.",
        "Use-or-drop last enforces the rule: confirmed claims can stay; unconfirmed ones go. Keeping 'probably fine' AI facts undoes the whole verification routine.",
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
            "Journal names prove peer review happened in real life",
            "Any percentage with a decimal is automatically true",
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
      lineExplanations: [
        "Rules come first because allowed help differs by class. Using AI before you know the policy risks accidental cheating even if your intent was honest.",
        "Brainstorming, outlining, or feedback next keeps AI in a helper role instead of a ghostwriter. Asking for a secret full essay here would outsource the learning the assignment is meant to build.",
        "Writing the final work yourself follows so authorship and understanding stay yours. Pasting a generated draft as the finished product skips the thinking you are graded on.",
        "Disclosure when required comes after you used help so teachers can see the process honestly. Hiding required AI use turns an allowed tool into an integrity violation.",
        "Being able to explain without the chat last proves the learning stuck. If you cannot discuss your choices offline, the work was not really yours in the way school expects.",
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
            "Asking AI to explain a confusing paragraph is the same as submitting its essay",
            "Disclosure is never needed if the grammar looks human",
            "Brainstorming discussion questions with AI is always cheating",
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
      lineExplanations: [
        "Defining fairness first sets the standard you will measure against — equal opportunity, equal error rates, or another agreed goal. Without that definition, later audits have no target and 'looks fine' stays vague.",
        "Inspecting who is in the training data next reveals whose past outcomes the model will copy. Measuring results before you know the data makeup makes it hard to explain why gaps appear.",
        "Measuring outcomes across groups follows so you can see who gets hired or rejected in practice. Skipping measurement lets bias hide behind claims that the math is 'objective.'",
        "Finding skewed patterns after measurement links unfair results to data or labels — not mystery. Fixing randomly without this diagnosis often misses the real cause.",
        "Fixing and re-testing last closes the loop before anyone trusts the tool. Shipping without a re-check can leave the same unfair pattern live under a new coat of paint.",
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
            "Zip codes are never correlated with anything sensitive",
            "Skewed historical hires + proxy features can bake past unfairness into the model",
            "Bias only happens in image filters, never hiring tools",
            "Math formulas erase all human bias automatically",
          ],
      correctIndex: 1,
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
      lineExplanations: [
        "Pausing first breaks the urgency trap scammers design. If you send codes or money while panicked, the attacker already won before you evaluate the call.",
        "Refusing to paste secrets next keeps passwords, IDs, and 2FA codes out of chats and random tools. Sharing those 'just to verify' hands attackers the keys they need.",
        "Contacting the real person on a known-good channel follows so you verify identity outside the suspicious thread. Staying only inside the weird call keeps you inside the attacker's story.",
        "Checking for deepfake media after you have slowed down asks whether voice or video could be synthetic. Believing the face alone skips a common modern scam pattern.",
        "Reporting and deleting last helps others and removes the lure from your devices. Ignoring the message after you escape still leaves classmates exposed to the same bait.",
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
            "Addresses are fine to share if you ask politely",
            "Chatbots are banks, so sharing codes is required",
            "Deepfakes only affect celebrities, never students",
            "Never paste secrets, IDs, or codes into AI tools — that data can leak or be misused",
          ],
      correctIndex: 3,
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
      lineExplanations: [
        "Clarifying the human goal first sets what success means and what limits apply. Letting AI draft before you know the goal produces busywork aimed at the wrong target.",
        "AI drafting next accelerates options and routine work once the goal is clear. Skipping AI entirely here is fine for some tasks, but in this workflow the tool's job is speed — not final judgment.",
        "Human judgment, ethics, and domain skill follow because drafts are not decisions. Accepting the first AI option without this step can ship unethical or impractical plans.",
        "Verification and fixes come after judgment so errors, gaps, and hallucinations get caught. Communicating an unchecked draft to others spreads mistakes with a confident tone.",
        "Communicating the final call last is the human job AI cannot own for you. Stakeholders need a person who can explain and stand behind the decision.",
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
            "Teamwork is useless when tools exist",
            "AI already replaced all jobs worldwide last year",
            "Only coding matters; writing skills never transfer",
            "Humans still need judgment, communication, and problem-solving to direct and check AI",
          ],
      correctIndex: 3,
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
      lineExplanations: [
        "Defining the job first stops shiny-tool shopping without a purpose. If you skip this, demos impress you for tasks your class never needed.",
        "Testing on real school examples next checks performance on your actual work, not vendor highlight reels. Demo-only evidence often hides failures on messy classroom inputs.",
        "Accuracy, bias, and privacy checks follow successful-looking tests so you catch wrong answers, unfair gaps, and data leaks. Adopting before this review treats marketing claims as proof.",
        "Human review and disclosure rules come next so people stay in the loop and use stays honest. A tool without oversight or policy can quietly replace judgment and hide AI help.",
        "Decide last — adopt, limit, or reject — using everything you learned. Choosing earlier based on hype alone skips the evaluation the checklist exists to force.",
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
            "If a vendor says 100% accurate, testing is unnecessary",
            "Futuristic logos guarantee safety",
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
