import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson9: AILessonConfig = {
  id: "dl-9",
  title: "9. Create & Edit Digital Content",
  goal: "Create and edit clear, well-designed digital content — documents, images, and audio/video — using simple formatting and design principles, and make it accessible to everyone.",
  xpReward: 450,
  badge: "🎨 Content Creator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/8",
  nextHref: "/learn/digital/10",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You already make digital content all the time — a slideshow for class, a meme, a video for friends, a flyer for the bake sale. Today you'll learn how to make that content look **clear, professional, and easy for anyone to use**.\n\nHere's our roadmap:\n\n• **Content types and tools** — which app for documents, images, and audio/video.\n• **Formatting that's actually readable** — headings, lists, and consistent styles.\n• **Image basics** — resolution, file size, and why a logo and a photo are made differently.\n• **Simple design principles** — contrast, alignment, and not overcrowding.\n• **Accessibility** — alt text and captions that include *everyone*.\n• **Exporting the right format** for the job.\n\nThis isn't just about making things "pretty." Clear content gets read, gets shared, and makes *you* look like someone who knows what they're doing — in school now and in any job later.`,
        image: "/images/lessons/dl-9.png",
        imageAlt: "A messy wall-of-text flyer beside a clean, well-organized version with headings, good contrast, and an image",
        callout: {
          label: "Why it matters",
          text: "People decide in seconds whether to read something or scroll past. Content that's organized and easy to scan gets your message across; a wall of text gets ignored — even if your ideas are great.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Five words to know before we start",
        body: `Designers and apps throw around some words that sound fancy but are simple once explained. Here they are in plain language — we'll use them all today:\n\n• **Digital content** = anything you make on a device: a document, a photo, a song, a video, a post.\n• **Format / formatting** = how you *arrange and style* content so it's easy to read — like adding headings and bullet points (this very list is formatting!).\n• **Pixel** = one of the tiny colored dots that, side by side, make up any image on a screen. Zoom in really far on a photo and you can see them as little squares.\n• **File type** = the kind of file, shown by the letters after the dot in a file name — like \`photo.jpg\` or \`logo.png\`. Different types are good for different jobs.\n• **Accessibility** = making sure your content works for *everyone*, including people who can't see or hear well.\n\nDon't worry about memorizing these — you'll see each one in action in a moment, and that's when it'll stick.`,
        callout: {
          label: "Pro tip",
          text: "A file's type is just the part after the dot in its name (the \"extension\"). If you can't see it, that's okay — but knowing \`.jpg\`, \`.png\`, and \`.pdf\` apart will make today click into place.",
        },
      },
      {
        id: "types-tools",
        kicker: "The big idea",
        title: "Different content, different tools",
        body: `Digital content comes in a few main flavors, and each has go-to tools:\n\n• **Documents & text** — reports, essays, flyers, slideshows. Tools: Google Docs, Microsoft Word, Slides/PowerPoint, Canva.\n• **Images** — photos, logos, graphics, memes. Tools: Photos apps, Canva, Photoshop, GIMP (free).\n• **Audio** — podcasts, voiceovers, music. Tools: Audacity (free), GarageBand, Voice Memos.\n• **Video** — clips, tutorials, edits. Tools: CapCut, iMovie, Clipchamp, DaVinci Resolve.\n\nYou don't need expensive software to make great stuff — most of these have free versions, and the *principles* you'll learn today work in all of them. The tool is just the paintbrush; the skills are what matter.`,
        bullets: [
          "**Documents** = words and layout (Docs, Word, Slides, Canva).",
          "**Images** = photos and graphics (Canva, Photoshop, GIMP).",
          "**Audio** = sound (Audacity, GarageBand).",
          "**Video** = moving pictures and sound (CapCut, iMovie, Clipchamp).",
        ],
        callout: {
          label: "Pro tip",
          text: "Pick a tool you can actually access and learn it well, instead of chasing the \"best\" expensive app. A person who knows free Canva inside out will out-design someone fumbling with Photoshop.",
        },
      },
      {
        id: "formatting",
        kicker: "Make it readable",
        title: "Formatting is like organizing a store",
        body: `Imagine walking into a store where everything is just dumped in one giant pile — no aisles, no signs, no sections. You'd give up and leave. A wall of unformatted text feels exactly the same to a reader.\n\n**Formatting** is how you arrange and style content so people can find what they need fast:\n\n• **Headings** act like aisle signs — they break content into sections and let readers skim to the part they want.\n• **Lists** (bullets and numbers) turn a cramped paragraph into clear, scannable points.\n• **Consistent styles** — using the *same* look for all your headings, the same font for body text — makes everything feel professional and calm.\n• **White space** (empty room around text) gives the eyes a break so nothing feels crowded.\n\nGood formatting isn't decoration. It's the difference between content people actually read and content they bounce off of.`,
        callout: {
          label: "Common misconception",
          text: "Using five different fonts and ten colors does NOT make something look exciting — it makes it look messy and hard to read. Professional design usually means *fewer*, consistent choices, not more.",
        },
      },
      {
        id: "images",
        kicker: "Image basics",
        title: "Resolution, file size, and raster vs. vector",
        body: `Images trip people up, so let's clear up the basics.\n\n**Resolution** is how many tiny dots (**pixels**) make up an image — like 1920×1080. More pixels means more detail, but also a bigger **file size** (how much storage it takes up). Huge files load slowly and eat up storage and data.\n\nNow the big one — two totally different *kinds* of images:\n\n• **Raster** images are made of a fixed grid of pixels. Photos are raster (\`.jpg\`, \`.png\`). They look great at their real size, but blow them up too far and they get blurry and **pixelated** — the grid starts to show.\n• **Vector** images are made of math (points and lines), so they can scale to *any* size and stay perfectly sharp. Logos, icons, and simple graphics are usually vector (\`.svg\`).\n\nThink of it like a **recipe vs. a printed photo of a finished cake**. A recipe (vector) can be re-made at any size — tiny cupcake or giant wedding cake — and it's always crisp. A printed photo of a cake (raster) is fixed: enlarge it and it just gets blurry.`,
        image: "/images/lessons/dl-9-2.png",
        imageAlt: "Side by side: a photo enlarged until it looks blurry and pixelated (raster) next to a logo enlarged while staying perfectly sharp (vector)",
        bullets: [
          "**Resolution** = number of pixels = amount of detail.",
          "**File size** = how much storage the image takes; bigger isn't always better.",
          "**Raster** (.jpg/.png) = pixel grid, great for photos, blurs when enlarged.",
          "**Vector** (.svg) = math-based, scales to any size, great for logos and icons.",
        ],
        callout: {
          label: "Watch out",
          text: "Stretching a small image to make it bigger does NOT add detail — it just spreads the same pixels out, so it gets blurry. To resize, start with an image that's already big enough, or use a vector for anything that needs to scale.",
        },
      },
      {
        id: "audio-video-design",
        kicker: "Sound, motion & design",
        title: "Audio/video editing and simple design principles",
        body: `**Audio and video** follow one golden rule for beginners: **keep it short and trim the boring parts.** The main skill is **trimming** — cutting out the dead air at the start, the "ums," and anything that drags. A tight 60-second video beats a rambling 5-minute one every time. Add captions and you're set (more on that next).\n\nFor anything visual — a slide, a flyer, a thumbnail — these **design principles** instantly level up your work:\n\n• **Contrast** — make text stand out from the background. Dark text on a light background (or vice versa) is readable; light gray text on white is not.\n• **Alignment** — line things up. Edges that match look intentional and clean; random placement looks sloppy.\n• **Don't overcrowd** — give elements room to breathe. Empty space is a feature, not a waste.\n• **Limit fonts and colors** — pick about two fonts and a small color palette and stick to them.`,
        callout: {
          label: "Common misconception",
          text: "Design isn't just decoration to make things look fancy. Real design is about *clarity* — helping the viewer understand your message faster. If a design choice makes something harder to read, it's bad design, no matter how cool it looks.",
        },
      },
      {
        id: "accessibility",
        kicker: "Include everyone",
        title: "Accessibility means your content works for all people",
        body: `**Accessibility** means making your content usable by *everyone* — including people who are blind or low-vision, deaf or hard of hearing, or who have other disabilities. It's not an extra; it's part of doing the job right.\n\nThe big ones are easy to do:\n\n• **Alt text** — a short written description of an image. Screen readers (software that reads a screen aloud) speak the alt text so a blind user knows what the image shows. Example alt text: "Student smiling while presenting a science project."\n• **Captions** — the on-screen text of what's said in a video. They help deaf and hard-of-hearing viewers — *and* anyone watching with the sound off, which is most people on their phones.\n• **Readable font sizes** — text big enough to read comfortably, with good contrast.\n\nAccessibility helps *everyone*, not just people with disabilities. Captions help in a noisy bus; high contrast helps in bright sunlight. Designing for the edges makes things better for all.`,
        callout: {
          label: "Watch out",
          text: "Accessibility is not \"optional\" or something to add later if there's time. Leaving people out isn't a small detail — and good alt text and captions take only seconds. Build them in from the start.",
        },
      },
      {
        id: "everyday",
        kicker: "A real example",
        title: "Your class slideshow, leveled up",
        body: `Let's put it together with something you actually make: a **slideshow for class**. Same ideas, real situation.\n\n• **Tool** — Google Slides, PowerPoint, or Canva all work. Pick the one you can open right now; the skills matter more than the app.\n• **Formatting** — one clear **heading** per slide, and **bullet points** instead of full paragraphs. A slide is a poster, not an essay — a few words you *talk around*, not read aloud.\n• **Images** — use a **photo** (\`.jpg\`) for real-life pictures and a **logo** (\`.png\` or \`.svg\`) for graphics. Don't stretch a tiny image to fill the slide, or it'll go blurry on the projector.\n• **Design** — dark text on a light background (or the reverse) so it's readable from the back row. Two fonts, max. Lots of empty space.\n• **Accessibility** — add **alt text** to your images, and if you embed a video, turn on **captions** so everyone can follow.\n\nThat's the whole lesson, hiding inside a normal school task you've done a dozen times.`,
        callout: {
          label: "Watch out",
          text: "The #1 slideshow mistake is cramming a whole paragraph onto a slide and reading it word-for-word. Your audience can read faster than you talk — give them a few key points and explain the rest out loud.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Fixing a wall-of-text flyer, step by step",
        body: `Imagine a club made a flyer that's one giant gray paragraph crammed edge to edge, with a stretched, blurry logo and faint text. Let's fix it, step by step.\n\n**Step 1 — Add structure with headings.** Break the wall of text into sections with clear headings like "When," "Where," and "How to Join." Now people can skim straight to what they need.\n\n**Step 2 — Trim the text.** Cut it down to the essentials. A flyer should be glanceable in a few seconds, not read like an essay. Turn lists of details into **bullet points**.\n\n**Step 3 — Fix the contrast.** Swap the faint light-gray text for dark text on a light background so it's easy to read, even on a phone in bright light.\n\n**Step 4 — Replace and describe the image.** Swap the stretched, blurry logo for the original sharp version at the right size (or a vector \`.svg\` so it scales perfectly). Add **alt text** so screen-reader users know what it is.\n\n**Step 5 — Export the right format.** Export as a **PDF** so the layout stays put on any device, or a **.png** if it's going on social media. Done — same info, ten times more effective.`,
        image: "/images/lessons/dl-9-3.png",
        imageAlt: "A cluttered gray flyer transforming step by step into a clean flyer with a clear heading, bullet points, high-contrast text, and a sharp logo",
        callout: {
          label: "Pro tip",
          text: "Match the export format to the job: **PDF** keeps layouts fixed for printing or sharing documents; **.jpg** is small and good for photos; **.png** keeps sharp edges and transparent backgrounds for graphics and logos; **.mp4** is the standard for video.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've leveled up from "making stuff" to "making stuff *well*." Quick recap:\n\n• Match the **tool** to the content type, but remember the *skills* matter more than the app.\n• **Format** for skimmability — headings, lists, consistent styles, and white space.\n• Know your images: **resolution** and **file size**, and **raster** (photos) vs. **vector** (logos/icons).\n• Apply simple **design principles** — contrast, alignment, don't overcrowd, limit fonts and colors.\n• Build in **accessibility** with **alt text** and **captions** — it includes everyone.\n• **Export** the right format for the job.\n\nWhen you're ready, switch to the **Knowledge check**, then write a quick reflection about something you could redesign.`,
      },
    ],
  },
  bigIdeas: [
    "Good **formatting** (headings, lists, consistent styles) makes content skimmable and professional.",
    "**Raster** images (photos) are pixels and blur when enlarged; **vector** images (logos/icons) are math and scale perfectly.",
    "Simple **design** = clarity (contrast, alignment, don't overcrowd), and **accessibility** (alt text, captions) includes everyone.",
  ],
  keyTerms: [
    { term: "Format", definition: "How content is arranged and styled — headings, lists, fonts, and spacing — so it's easy to read and scan." },
    { term: "Resolution", definition: "How many pixels make up an image. More pixels means more detail but a larger file size." },
    { term: "Raster vs. vector", definition: "Raster images (.jpg/.png) are a fixed grid of pixels and blur when enlarged; vector images (.svg) are math-based and scale to any size." },
    { term: "Contrast", definition: "The difference between text and its background. High contrast (like dark text on light) makes content readable." },
    { term: "Accessibility", definition: "Designing content so everyone can use it, including people who are blind, low-vision, deaf, or hard of hearing." },
    { term: "Alt text", definition: "A short written description of an image that screen readers speak aloud for people who can't see it." },
    { term: "Export", definition: "Saving your content in a specific file format (PDF, .png, .mp4) chosen to fit how it will be used." },
  ],
  realWorld:
    "When you make a slideshow, post a graphic, or upload a video, the same skills apply: clear **formatting**, the right **image** type, strong **contrast**, and **alt text** plus **captions** so it reaches everyone — exactly what employers expect from anyone who creates content.",
  quiz: [
    {
      id: "q1",
      question: "Why do headings, bullet lists, and consistent styles make a document better?",
      choices: [
        "They make the file size smaller",
        "They make content easy to skim so readers find what they need fast",
        "They are required by law for all documents",
        "They automatically fix spelling mistakes",
      ],
      correctIndex: 1,
      explanation:
        "Formatting is like aisle signs in a store — headings, lists, and consistent styles let readers skim and find what they need quickly, instead of facing a wall of text.",
    },
    {
      id: "q2",
      question: "You have a small logo and need a giant version for a banner. What's the best choice to keep it sharp?",
      choices: [
        "Stretch the small image bigger — stretching keeps it sharp",
        "Use a vector (.svg) version, which scales to any size without blurring",
        "Save it as a smaller file to add detail",
        "Take a screenshot of it to increase the resolution",
      ],
      correctIndex: 1,
      explanation:
        "Vector images are made of math, so they scale to any size and stay sharp. Stretching a small raster image just spreads the same pixels out, making it blurry — it can't add detail.",
    },
    {
      id: "q3",
      question: "Which statement about image file size is TRUE?",
      choices: [
        "A bigger file is always better quality, so always use the biggest",
        "File size doesn't affect how fast something loads",
        "Huge images take more storage and load slowly, so match the size to the need",
        "Vector and raster files are always the exact same size",
      ],
      correctIndex: 2,
      explanation:
        "Bigger isn't always better. Huge files eat storage and data and load slowly. Pick a resolution and file size that fits the job rather than maxing it out for no reason.",
    },
    {
      id: "q4",
      question: "What is alt text, and why does it matter?",
      choices: [
        "A backup copy of an image in case the file is lost",
        "A short description of an image that screen readers speak aloud for people who can't see it",
        "An alternate-colored version of the image for dark mode",
        "Text that automatically translates the image into other languages",
      ],
      correctIndex: 1,
      explanation:
        "Alt text is a short written description of an image. Screen readers speak it aloud so blind and low-vision users know what the image shows. It's a key part of accessibility.",
    },
    {
      id: "q5",
      question: "Which choice best reflects good, simple design?",
      choices: [
        "Use many fonts and bright colors so it looks exciting",
        "Cram in as much as possible so nothing is wasted",
        "Use high contrast, aligned elements, and a limited set of fonts and colors",
        "Use faint gray text on white to look modern and subtle",
      ],
      correctIndex: 2,
      explanation:
        "Good design is about clarity: high contrast for readability, aligned elements that look intentional, room to breathe, and a limited palette of fonts and colors. More clutter and faint text hurt readability.",
    },
  ],
  reflection: {
    prompt:
      "Think of a flyer, slide, or post you've seen (or made) that was hard to read. Name one formatting, design, or accessibility fix that would make it better.",
    placeholder: "Example: A club slide had tiny faint text — I'd add a heading, bump the contrast, and add alt text to its image…",
  },
};
