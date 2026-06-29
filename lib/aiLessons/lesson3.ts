import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson3: AILessonConfig = {
  id: "ai-3",
  title: "3. How Computers See and Hear",
  goal: "Understand how AI 'perceives' the world — turning pixels and sound waves into numbers it can analyze (the Big Idea of Perception).",
  xpReward: 150,
  badge: "📷 Sense Maker",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/2",
  nextHref: "/learn/ai/4",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "perception",
        kicker: "Big Idea: Perception",
        title: "Computers sense the world through numbers",
        body: `Humans perceive the world with eyes and ears. Computers don't have those — so AI **perception** means turning what a sensor captures into **numbers** the computer can work with.\n\nA camera turns light into a grid of colored dots. A microphone turns sound into a wiggly line of values. To a computer, a photo of your dog and a song are both just **big lists of numbers**.`,
        image: "/images/lessons/ai-3-see-hear.png",
        imageAlt: "A photo turning into a grid of numbered pixels",
        callout: {
          label: "Key insight",
          text: "AI never 'sees' a picture the way you do. It sees a spreadsheet of numbers and looks for patterns in those numbers.",
        },
      },
      {
        id: "pixels",
        kicker: "Seeing",
        title: "A picture is a grid of pixels (and each pixel is numbers)",
        body: `Zoom way into any digital photo and you'll find tiny squares called **pixels**. Each pixel stores how much **red, green, and blue** it has, usually as three numbers from 0 to 255.\n\nA small 1000×1000 photo is **a million pixels** — three million numbers! AI looks for patterns in those numbers: edges, shapes, textures, and eventually whole objects like "eye", "wheel", or "face".`,
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
        body: `A microphone measures air pressure thousands of times per second, storing each measurement as a number. String them together and you get a **waveform** — the same numbers that let a voice assistant detect "Hey, that's a wake word."\n\nSpeech recognition then matches patterns in that waveform to likely words. Same trick as images: real-world signal → numbers → pattern matching.`,
        callout: {
          label: "Same recipe",
          text: "Images, sound, even temperature from a sensor — perception always means converting a real-world signal into numbers an AI can analyze.",
        },
      },
      {
        id: "limits",
        kicker: "Why it goes wrong",
        title: "Bad input = bad perception",
        body: `Because AI only sees numbers, anything that changes those numbers can fool it. A blurry photo, weird lighting, or a noisy room can make perception fail.\n\nThat's why face unlock struggles in the dark, and voice assistants mishear you at a loud party. The AI isn't being dumb — its **input numbers** got messy.`,
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
