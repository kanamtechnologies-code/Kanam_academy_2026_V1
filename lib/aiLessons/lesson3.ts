import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson3: AILessonConfig = {
  id: "ai-3",
  title: "3. How Computers See and Hear",
  goal: "Understand how AI 'perceives' the world — turning pixels and sound waves into numbers it can analyze (the Big Idea of Perception).",
  xpReward: 150,
  badge: "Sense Maker",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/2",
  nextHref: "/learn/ai/4",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `When you unlock your phone with your face or say "Hey" to a voice assistant, it can feel like the device is *looking* and *listening* like a person. It isn't — and today you'll discover the surprising trick behind the curtain.\n\nHere's the plan:\n\n• Meet the Big Idea of **Perception** — how AI takes in the world.\n• See how a **photo** becomes a grid of numbers (pixels).\n• See how **sound** becomes a wave of numbers (a waveform).\n• Learn why messy input makes AI mishear and misjudge.\n\nThis is the foundation under self-driving cars, photo search, face unlock, and voice assistants. Once you know AI only ever sees *numbers*, a lot of its strange behavior suddenly makes sense.`,
        image: "/images/lessons/ai-3-see-hear.png",
        imageAlt: "A photo turning into a grid of numbered pixels",
        callout: {
          label: "Why it matters",
          text: "Every time face unlock fails in the dark or a voice assistant mishears you in a loud room, you're watching perception break down. Understanding it explains those everyday glitches — and the limits of the AI you rely on.",
        },
      },
      {
        id: "perception",
        kicker: "Big Idea: Perception",
        title: "Computers sense the world through numbers",
        body: `Humans perceive the world with eyes and ears wired to a brain. Computers don't have any of that — so AI **perception** means turning what a sensor captures into **numbers** the computer can work with.\n\nThink of it like a translator at the border between the real world and the computer's world. The real world speaks in light, sound, and motion. The computer only speaks "numbers." Perception is the translator that converts one into the other.\n\nA camera turns light into a grid of colored dots. A microphone turns sound into a wiggly line of values. So to a computer, a photo of your dog and your favorite song are both, deep down, just **big lists of numbers**.`,
        callout: {
          label: "Myth check",
          text: "AI never 'sees' a picture or 'hears' a song the way you do — with meaning and emotion. It receives a spreadsheet of numbers and looks for patterns in them. No experience, no feeling, just math.",
        },
      },
      {
        id: "pixels",
        kicker: "Seeing",
        title: "A picture is a grid of pixels (and each pixel is numbers)",
        body: `Zoom way into any digital photo — keep zooming — and you'll eventually find tiny squares called **pixels**. A picture is really a giant grid of these colored dots, like a mosaic made of millions of little tiles.\n\nEach pixel stores how much **red, green, and blue** light it has, usually as three numbers from 0 to 255. Mix those three and you can make any color: (255, 0, 0) is pure red, (0, 0, 0) is black, (255, 255, 255) is white.\n\nA small 1000×1000 photo is **a million pixels** — that's three million numbers in one little image! AI hunts for patterns in those numbers: first edges, then shapes and textures, and eventually whole objects like "eye," "wheel," or "face." It's the same step-by-step pattern-matching you learned about in Lesson 1, just on a grid of color numbers.`,
        bullets: [
          "**Pixel** = one tiny colored dot in an image.",
          "Each pixel = 3 numbers (Red, Green, Blue), each 0–255.",
          "AI finds patterns: edges → shapes → objects.",
        ],
      },
      {
        id: "sound",
        kicker: "Hearing",
        title: "Sound becomes a wave of numbers",
        body: `Sound is really just air pressure wiggling up and down really fast. A microphone measures that pressure **thousands of times per second**, saving each measurement as a number. String all those numbers together in order and you get a **waveform** — a wiggly line of values that captures the sound.\n\nPicture taking a person's temperature, but instead of once a day you do it 16,000 times a second and write down every reading. That long list of readings *is* the sound, in number form.\n\nThose are the same numbers that let a voice assistant catch its wake word, and that speech recognition matches against patterns for likely words. Notice it's the exact same recipe as images: real-world signal → numbers → pattern matching.`,
        callout: {
          label: "Same recipe",
          text: "Images, sound, even temperature or motion from a sensor — perception always means the same move: convert a real-world signal into numbers an AI can analyze for patterns.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "How a voice assistant catches its wake word",
        body: `Let's trace the full voice pipeline — from the moment you speak to the moment the assistant answers. The wake word is just a **filter** that tells the device "someone is talking to me now." After that, the real work begins.\n\n**Step 1 — Capture sound.** The microphone is always sampling the room, turning it into a stream of numbers (the **waveform**) — thousands of values every second.\n\n**Step 2 — Wake-word check (the filter).** A small AI constantly scans recent numbers: do they match the wake phrase it was trained on? It's not understanding words yet — it's matching number patterns. If there's no match, the rest of the pipeline stays off to save power and protect privacy.\n\n**Step 3 — Record the full request.** Once the wake word matches, the device starts recording your whole command — "What's the weather tomorrow?" — not just the trigger phrase.\n\n**Step 4 — Speech-to-text.** The recorded audio gets converted into text or command features. Now the device has something it can actually interpret, not just raw sound numbers.\n\n**Step 5 — Run the command and reply.** The assistant looks up the weather (or sets a timer, or plays music) and speaks the answer back. The whole chain — capture → wake filter → record → understand → act — breaks if the input is noisy, mumbled, or drowned out by a loud TV.`,
        callout: {
          label: "Pro tip",
          text: "When an assistant mishears you, don't just repeat louder — reduce the noise. Cleaner input means cleaner numbers, and cleaner numbers mean better pattern matching.",
        },
      },
      {
        id: "limits",
        kicker: "Why it goes wrong",
        title: "Bad input = bad perception",
        body: `Because AI only ever sees numbers, anything that changes those numbers can fool it. A blurry photo, weird lighting, a smudged camera, or a noisy room all scramble the input — and scrambled input means scrambled perception.\n\nIt's like trying to recognize a friend through fogged-up glasses. Your friend hasn't changed, but the *signal* reaching your eyes did. That's exactly what happens to AI when conditions get messy.\n\nThat's why face unlock struggles in the dark and voice assistants mishear you at a loud party. The AI isn't being "dumb" or stubborn — its **input numbers** got messy, so the patterns it relies on no longer line up.`,
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Here's what to carry forward: **Perception** means turning real-world signals into numbers a computer can process. **Images** become grids of pixels (red/green/blue numbers), and **sound** becomes a waveform sampled many times per second. Voice assistants use a pipeline: capture → wake-word filter → record full request → speech-to-text → run command and reply.\n\nWhenever that input gets messy, perception suffers.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then use what you learned about pixels to explain why face unlock fails in the dark.`,
      },
    ],
  },
  bigIdeas: [
    "**Perception** = turning real-world signals into numbers a computer can process.",
    "Images are grids of **pixels**; each pixel is red/green/blue numbers.",
    "Sound becomes a **waveform** of numbers sampled many times per second.",
  ],
  keyTerms: [
    { term: "Perception", definition: "An AI's ability to capture and interpret data from the world (images, sound, sensors)." },
    { term: "Pixel", definition: "The smallest dot in a digital image, stored as red/green/blue number values." },
    { term: "Waveform", definition: "Sound represented as a series of numbers measuring air pressure over time." },
    { term: "Sensor", definition: "A device (camera, mic, thermometer) that converts something physical into data." },
  ],
  realWorld:
    "Self-driving cars combine cameras, radar, and laser sensors — all converted to numbers — to 'perceive' pedestrians, lanes, and other cars dozens of times per second.",
  quiz: [
    {
      id: "q1",
      question: "When an AI 'sees' a photo, what is it actually working with?",
      choices: [
        "A mental image like a human sees",
        "A grid of numbers describing each pixel's color",
        "The photographer's intentions",
        "A printed copy of the picture",
      ],
      correctIndex: 1,
      explanation:
        "To a computer, an image is just a grid of pixel numbers (red, green, blue values). It finds patterns in those numbers.",
    },
    {
      id: "q2",
      question: "What does the Big Idea of 'Perception' mean in AI?",
      choices: [
        "AI having feelings about what it sees",
        "Turning real-world signals (light, sound) into numbers a computer can analyze",
        "AI predicting the future",
        "Robots growing eyes and ears",
      ],
      correctIndex: 1,
      explanation:
        "Perception is converting a physical signal — light, sound, motion — into data the AI can process.",
    },
    {
      id: "q3",
      question: "A voice assistant keeps mishearing you at a loud party. Why?",
      choices: [
        "It's angry at you",
        "The noisy room messes up the input numbers (the waveform), so pattern matching fails",
        "It only works outdoors",
        "It ran out of words",
      ],
      correctIndex: 1,
      explanation:
        "AI perception depends on clean input. Background noise corrupts the waveform, making the words hard to match.",
    },
    {
      id: "q4",
      question: "What do images and sound have in common from an AI's point of view?",
      choices: [
        "Both are stored as lists of numbers the AI finds patterns in",
        "Both are understood emotionally",
        "Neither can be processed by computers",
        "Both require the internet",
      ],
      correctIndex: 0,
      explanation:
        "Perception uses the same recipe for any signal: convert it to numbers, then look for patterns.",
    },
  ],
  reflection: {
    prompt:
      "Face unlock works great in daylight but fails in a dark room. Using what you learned about pixels, explain why in one or two sentences.",
    placeholder: "In the dark, the camera's pixel numbers change so much that…",
  },
};
