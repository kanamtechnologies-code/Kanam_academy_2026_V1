import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson9: AILessonConfig = {
  id: "dl-9",
  title: "9. Create & Edit Digital Content",
  goal: "Create and edit clear, well-designed digital content — documents, images, and audio/video — using simple formatting and design principles, make it accessible to everyone, and export the right formats for school, college apps, and first jobs.",
  xpReward: 450,
  badge: "Content Creator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/8",
  nextHref: "/learn/digital/10",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You already make digital content all the time — a slideshow for class, a meme, a video for friends, a flyer for the bake sale. Today you'll learn how to make that content look **clear, professional, and easy for anyone to use** — the same skills that make a scholarship essay readable, a résumé look sharp, and a club video get watched.\n\nHere's our roadmap:\n\n• **Content types and tools** — which app for documents, images, and audio/video.\n• **File types** — picking the right extension for the job, not just any download.\n• **Formatting that's actually readable** — headings, lists, and consistent styles.\n• **Image basics** — resolution, file size, and why a logo and a photo are made differently.\n• **Simple design principles** — contrast, alignment, and not overcrowding.\n• **Accessibility** — alt text and captions that include *everyone*.\n• **Exporting the right format** for school, college portals, and job apps.\n• **Senior stretch** — résumés, portfolios, and application materials that look intentional.\n\nThis isn't just about making things "pretty." Clear content gets read, gets shared, and makes *you* look like someone who knows what they're doing — in middle school now and in any internship later.`,
        image: "/images/lessons/dl-9.png",
        imageAlt: "A messy wall-of-text flyer beside a clean, well-organized version with headings, good contrast, and an image",
        callout: {
          label: "Why it matters",
          text: "People decide in seconds whether to read something or scroll past — including admissions readers and hiring managers. Content that's organized and easy to scan gets your message across; a wall of text gets ignored — even if your ideas are great.",
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
        body: `Digital content comes in a few main flavors, and each has go-to tools:\n\n• **Documents & text** — reports, essays, flyers, slideshows, résumés. Tools: Google Docs, Microsoft Word, Slides/PowerPoint, Canva.\n• **Images** — photos, logos, graphics, memes. Tools: Photos apps, Canva, Photoshop, GIMP (free).\n• **Audio** — podcasts, voiceovers, music. Tools: Audacity (free), GarageBand, Voice Memos.\n• **Video** — clips, tutorials, edits. Tools: CapCut, iMovie, Clipchamp, DaVinci Resolve.\n\nYou don't need expensive software to make great stuff — most of these have free versions, and the *principles* you'll learn today work in all of them. The tool is just the paintbrush; the skills are what matter.`,
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
        id: "file-types",
        kicker: "Pick the right one",
        title: "Matching a file type to the job",
        body: `Beyond raster vs. vector (coming up next), a handful of file types cover almost everything you'll ever save. Knowing which one to pick avoids blurry images, broken uploads, and rejected forms:\n\n• **.jpg / .jpeg** — photos. Small file size, good for real-life images, but quality drops a little each time you re-save it.\n• **.png** — graphics, logos, and screenshots. Keeps sharp edges and can have a transparent background — great for anything layered on top of other content.\n• **.pdf** — documents where the layout must stay exactly the same on any device — résumés, essays, forms. This is almost always the safest export for something you're submitting.\n• **.mp3 / .wav** — audio. \`.mp3\` is smaller and fine for most uses; \`.wav\` is bigger but higher quality, used in professional editing.\n• **.mp4** — video, the standard format nearly every site and app accepts.\n\nThe fix for "my file won't upload" is often just: wrong file type. Check what the form actually asks for before you fight with anything else.`,
        checkIn: {
          prompt: "You're uploading a one-page résumé to a scholarship portal and want the layout to look identical on any device that opens it. Which file type is the safest choice?",
          choices: [".jpg", ".png", ".pdf", ".mp3"],
          correctIndex: 2,
          explanation:
            "PDF locks in the exact layout no matter what device or software opens it — which is exactly what you want for a résumé, essay, or form.",
        },
        callout: {
          label: "Watch out",
          text: "A portal that says \"upload failed\" often just means the wrong file type, not a broken computer. Check what extension the form actually accepts before you assume something is wrong with your device.",
        },
      },
      {
        id: "formatting",
        kicker: "Make it readable",
        title: "Formatting is like organizing a store",
        body: `Imagine walking into a store where everything is just dumped in one giant pile — no aisles, no signs, no sections. You'd give up and leave. A wall of unformatted text feels exactly the same to a reader.\n\n**Formatting** is how you arrange and style content so people can find what they need fast:\n\n• **Headings** act like aisle signs — they break content into sections and let readers skim to the part they want.\n• **Lists** (bullets and numbers) turn a cramped paragraph into clear, scannable points.\n• **Consistent styles** — using the *same* look for all your headings, the same font for body text — makes everything feel professional and calm.\n• **White space** (empty room around text) gives the eyes a break so nothing feels crowded.\n\nGood formatting isn't decoration. It's the difference between content people actually read and content they bounce off of — whether that's a class handout or a scholarship personal statement.`,
        callout: {
          label: "Common misconception",
          text: "Using five different fonts and ten colors does NOT make something look exciting — it makes it look messy and hard to read. Professional design usually means *fewer*, consistent choices, not more.",
        },
      },
      {
        id: "formatting-myths",
        kicker: "Myth-busting",
        title: "Two formatting myths that trip people up",
        body: `Now that formatting basics are fresh, let's kill two myths that quietly ruin good work:\n\n**Myth 1 — "Bigger and bolder always grabs more attention."** Overusing bold, all-caps, and huge fonts actually makes a page *harder* to scan, because nothing stands out when everything is shouting. Reserve emphasis for the one or two things that truly matter.\n\n**Myth 2 — "If I center everything, it looks balanced."** Centered text is fine for a short title, but centering entire paragraphs makes the left edge ragged and genuinely harder to read line by line. Left-aligned body text with a straight left edge is easier on the eyes for anything longer than a sentence.\n\nBoth myths come from the same place: confusing "more effort" with "better design." Often the more *restrained* choice is the more professional one.`,
        checkIn: {
          prompt: "Your slide has three lines of text, and you bold, underline, AND all-caps every single line to \"make sure people read it.\" What's the likely result?",
          choices: [
            "Everything looks equally important, so nothing actually stands out",
            "It automatically becomes the most readable slide in the deck",
            "Screen readers will skip it entirely",
            "The file size gets smaller",
          ],
          correctIndex: 0,
          explanation:
            "When every line is emphasized, nothing is. Emphasis only works by contrast — save bold or all-caps for the one key phrase you actually want to jump out.",
        },
        callout: {
          label: "Pro tip",
          text: "Before turning in a flyer or slide, ask: \"If I could only bold ONE phrase, which would it be?\" Then remove emphasis from everything else. That single edit usually improves readability instantly.",
        },
      },
      {
        id: "images",
        kicker: "Image basics",
        title: "Resolution, file size, and raster vs. vector",
        body: `Images trip people up, so let's clear up the basics.\n\n**Resolution** is how many tiny dots (**pixels**) make up an image — like 1920×1080. More pixels means more detail, but also a bigger **file size** (how much storage it takes up). Huge files load slowly and eat up storage and data — and many college portals and job sites reject uploads that are too big.\n\nNow the big one — two totally different *kinds* of images:\n\n• **Raster** images are made of a fixed grid of pixels. Photos are raster (\`.jpg\`, \`.png\`). They look great at their real size, but blow them up too far and they get blurry and **pixelated** — the grid starts to show.\n• **Vector** images are made of math (points and lines), so they can scale to *any* size and stay perfectly sharp. Logos, icons, and simple graphics are usually vector (\`.svg\`).\n\nThink of it like a **recipe vs. a printed photo of a finished cake**. A recipe (vector) can be re-made at any size — tiny cupcake or giant wedding cake — and it's always crisp. A printed photo of a cake (raster) is fixed: enlarge it and it just gets blurry.`,
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
        id: "raster-vector-practice",
        kicker: "Apply it",
        title: "Quick scenario: banner, badge, or both?",
        body: `Your club needs three things for a fundraiser: a **banner** for the hallway made from a phone photo of last year's event, a **logo badge** that needs to appear tiny on a flyer and huge on a poster, and a **thank-you card image** you'll print at one fixed size.\n\nWalk through each one:\n\n• The **banner** is a real photo — it's raster no matter what, so just make sure the original photo has enough resolution before you enlarge it. Don't start from a tiny thumbnail.\n• The **logo badge** needs to work at wildly different sizes, so it should be a **vector** (\`.svg\`) if at all possible — that's exactly the scaling problem vectors solve.\n• The **thank-you card** is printed once at one size, so either format works fine — the size problem that makes vector matter simply doesn't apply here.\n\nNotice the pattern: the deciding question is never "is it fancy?" — it's **"will this need to change size a lot?"**`,
        checkIn: {
          prompt: "A logo needs to appear as a tiny app icon AND as a giant banner at a school fair, staying perfectly sharp both times. What should it be saved as?",
          choices: [
            "A .jpg photo, since photos are always highest quality",
            "A vector file like .svg, so it scales to any size without blurring",
            "A screenshot of the original file",
            "Any format — size never matters for logos",
          ],
          correctIndex: 1,
          explanation:
            "Whenever something needs to scale across very different sizes without blurring, a vector format like .svg is the right call — that's the exact problem vectors are built to solve.",
        },
        callout: {
          label: "Pro tip",
          text: "If you didn't design the logo yourself, ask whoever made it for the vector (\"source\" or \".svg\") version, not just a screenshot. A screenshot is already raster and has lost the ability to scale cleanly.",
        },
      },
      {
        id: "audio-video-design",
        kicker: "Sound, motion & design",
        title: "Audio/video editing and simple design principles",
        body: `**Audio and video** follow one golden rule for beginners: **keep it short and trim the boring parts.** The main skill is **trimming** — cutting out the dead air at the start, the "ums," and anything that drags. A tight 60-second video beats a rambling 5-minute one every time — including for a club promo, a scholarship video essay, or an internship portfolio clip. Add captions and you're set (more on that next).\n\nFor anything visual — a slide, a flyer, a thumbnail — these **design principles** instantly level up your work:\n\n• **Contrast** — make text stand out from the background. Dark text on a light background (or vice versa) is readable; light gray text on white is not.\n• **Alignment** — line things up. Edges that match look intentional and clean; random placement looks sloppy.\n• **Don't overcrowd** — give elements room to breathe. Empty space is a feature, not a waste.\n• **Limit fonts and colors** — pick about two fonts and a small color palette and stick to them.`,
        callout: {
          label: "Common misconception",
          text: "Design isn't just decoration to make things look fancy. Real design is about *clarity* — helping the viewer understand your message faster. If a design choice makes something harder to read, it's bad design, no matter how cool it looks.",
        },
      },
      {
        id: "design-checklist",
        kicker: "Before you publish",
        title: "A 60-second design check before you hit share",
        body: `Right before you post, print, or submit anything visual, run this quick checklist. It catches most rookie mistakes in under a minute:\n\n1. **Squint test** — squint at the page. Does one thing clearly stand out, or does everything blend together?\n2. **Contrast check** — could you read the text if you printed it in black and white? If text nearly disappears, boost the contrast.\n3. **Alignment scan** — do the edges of your text boxes and images line up, or is everything scattered at slightly different spots?\n4. **Breathing room** — is there empty space around your elements, or is everything crammed edge to edge?\n5. **Font and color count** — count your fonts and main colors. More than two or three of either is usually too many.\n\nThis takes less time than it took to read this list — and it catches the exact mistakes that make work look rushed.`,
        checkIn: {
          prompt: "You squint at your flyer and everything — the title, three subheadings, and the fine print — looks equally bold and colorful. What does the squint test suggest you should fix?",
          choices: [
            "Nothing — that means it's balanced",
            "Add even more colors so it's more exciting",
            "Reduce emphasis on most elements so only the most important one or two truly stand out",
            "Delete the flyer and start with a blank page forever",
          ],
          correctIndex: 2,
          explanation:
            "If everything demands attention equally, nothing effectively does. Trim emphasis down to the one or two elements that truly matter, and let the rest recede.",
        },
        callout: {
          label: "Pro tip",
          text: "Keep this checklist somewhere you'll actually see it — a sticky note, a phone notes app. A checklist you never look at doesn't help; a 15-second habit before every submission does.",
        },
      },
      {
        id: "accessibility",
        kicker: "Include everyone",
        title: "Accessibility means your content works for all people",
        body: `**Accessibility** means making your content usable by *everyone* — including people who are blind or low-vision, deaf or hard of hearing, or who have other disabilities. It's not an extra; it's part of doing the job right.\n\nThe big ones are easy to do:\n\n• **Alt text** — a short written description of an image. Screen readers (software that reads a screen aloud) speak the alt text so a blind user knows what the image shows. Example alt text: "Student smiling while presenting a science project."\n• **Captions** — the on-screen text of what's said in a video. They help deaf and hard-of-hearing viewers — *and* anyone watching with the sound off, which is most people on their phones.\n• **Readable font sizes** — text big enough to read comfortably, with good contrast.\n• **Don't rely on color alone** — about 1 in 12 men has some form of color vision deficiency (often called colorblindness). If a chart, map, or button uses only red vs. green (or blue vs. purple) to mean something, add **text labels**, **icons**, or **patterns** (stripes, dots) so the meaning survives in grayscale and for colorblind readers.\n\nAccessibility helps *everyone*, not just people with disabilities. Captions help in a noisy bus; high contrast helps in bright sunlight. Designing for the edges makes things better for all — and many schools, colleges, and workplaces expect it.`,
        callout: {
          label: "Watch out",
          text: "Accessibility is not \"optional\" or something to add later if there's time. Leaving people out isn't a small detail — and good alt text and captions take only seconds. Build them in from the start.",
        },
      },
      {
        id: "accessibility-deeper",
        kicker: "Go further",
        title: "Writing alt text that actually helps",
        body: `Not all alt text is equally useful. Compare these two descriptions of the same photo:\n\n• Weak: *"image1234.jpg"* or *"photo"* — tells a screen-reader user nothing.\n• Strong: *"Three students building a robot for the science fair, wires and a laptop on the table."* — paints the actual scene in one sentence.\n\nA few habits make alt text genuinely good:\n\n• **Describe what matters**, not every detail. Focus on the content and purpose, not every color and object.\n• **Skip "image of" or "picture of"** — screen readers already announce that it's an image, so it's redundant.\n• **If an image is purely decorative** (a background swirl with no meaning), it's fine to leave alt text empty rather than describing something meaningless.\n• **For captions**, also label *who's* speaking and important sounds (\`[phone ringing]\`), not just the words — that's what turns captions into real access, not just subtitles.\n\nGood alt text and captions are quick to write once you know the pattern — and they make your content genuinely usable by more people, not just "technically compliant."`,
        checkIn: {
          prompt: "Which of these is the strongest alt text for a photo of a bake-sale table with three labeled dessert trays?",
          choices: [
            "\"image_0472.jpg\"",
            "\"picture of a picture of food\"",
            "\"Bake-sale table with labeled trays of cookies, brownies, and cupcakes\"",
            "Leaving it blank because photos don't need alt text",
          ],
          correctIndex: 2,
          explanation:
            "Good alt text describes the actual scene and content in a short, specific sentence — skipping filler like 'image of' and giving a screen-reader user real information.",
        },
        callout: {
          label: "Pro tip",
          text: "Read your alt text out loud with your eyes closed. If you can picture the image clearly from just those words, it's doing its job. If you can't, it needs more specifics.",
        },
      },
      {
        id: "senior-exports",
        kicker: "For older teens",
        title: "Résumés, portfolios & application uploads that look intentional",
        body: `If you're heading toward college apps, scholarships, internships, or a first job, the *same* content skills suddenly matter a lot more — because strangers will judge your work in seconds.\n\n• **Résumé / activity list** — use clear headings (Education, Experience, Activities), consistent fonts, and plenty of white space. Export as a **PDF** so the layout doesn't break when someone opens it on another computer.\n• **Portfolio pieces** — a short project write-up, a clean slide deck, or a captioned video clip. Show your best work with readable formatting and sharp images — not a blurry screenshot stretched to fill the page.\n• **College / scholarship portals** — read the upload rules: file type (often PDF), max size, and page limits. A beautiful Word doc that the portal rejects is useless; a clean PDF that meets the rules wins.\n• **Professional email attachments** — name files clearly (\`Lastname_Resume.pdf\`, not \`finalFINAL2.docx\`) so a busy counselor or hiring manager can find them.\n\nYounger teens: you can practice the same habits on class projects and club flyers. The skills transfer the day you need them for something high-stakes.`,
        bullets: [
          "Export résumés and essays as **PDF** so layout stays put.",
          "Check portal rules: file type, size limit, page count.",
          "Name files clearly for counselors, colleges, and employers.",
          "Practice now on school work — the habits transfer.",
        ],
        callout: {
          label: "Pro tip",
          text: "Before you upload anything to a college portal or job site, open the PDF yourself on your phone. If you can't read it comfortably there, neither can a tired admissions reader on a small screen.",
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
          text: "Match the export format to the job: **PDF** keeps layouts fixed for printing, résumés, or sharing documents; **.jpg** is small and good for photos; **.png** keeps sharp edges and transparent backgrounds for graphics and logos; **.mp4** is the standard for video.",
        },
      },
      {
        id: "worked-2",
        kicker: "Worked example",
        title: "Prepping a portfolio headshot, step by step",
        body: `Now let's apply the same skills to a higher-stakes example: a **headshot photo** you want to use for a scholarship application website and a LinkedIn-style profile. Here's the process, step by step.\n\n**Step 1 — Start with a good original.** Use a real photo taken with decent lighting, not a tiny, blurry crop pulled from a group photo. If the source image is small or pixelated, no editing step will fix that later.\n\n**Step 2 — Crop and check contrast.** Crop to just you (shoulders-up is standard), and make sure your face isn't lost in shadow or blown out by bright background light — good contrast between you and the background matters here too.\n\n**Step 3 — Pick the right file type.** Save it as a **.jpg** — a photo, so raster is correct here, and \`.jpg\` keeps the file small enough for quick uploads without a huge quality loss.\n\n**Step 4 — Resize sensibly.** Check the site's size limit (often listed in pixels or MB) and resize down if needed — you don't need a 20 MB image for a small profile circle, and an oversized file can slow down or break an upload.\n\n**Step 5 — Add alt text if the platform allows it.** Something like *"Headshot of [name], smiling, plain background"* — simple, accurate, and done.\n\nSame five moves as the flyer — start clean, format for the audience, and export on purpose.`,
        image: "/images/lessons/dl-9-4.png",
        imageAlt: "A blurry, oddly cropped group-photo headshot beside a clean, properly cropped and resized profile headshot ready to upload",
        checkIn: {
          prompt: "You're cropping a blurry, tiny headshot pulled from a group photo for a scholarship profile. What's the real problem, and what fixes it?",
          choices: [
            "The file type is wrong — switching to .pdf will sharpen it",
            "The original image didn't have enough resolution to begin with — cropping and editing can't add detail back",
            "Adding more contrast will restore the missing detail",
            "Saving it as a vector will make it scale perfectly",
          ],
          correctIndex: 1,
          explanation:
            "A raster photo only has the pixels it started with. If the source is small or blurry, no amount of cropping or filters can add real detail back — you need to start from a higher-resolution original.",
        },
        callout: {
          label: "Pro tip",
          text: "Take (or ask for) a dedicated headshot with your phone in good light rather than cropping one out of a group photo. Five minutes now saves you from a pixelated profile picture later.",
        },
      },
      {
        id: "content-audit",
        kicker: "Take action",
        title: "Your 5-minute content audit",
        body: `Let's turn everything into one quick, doable action. Open the most recent thing you made — a slide, a flyer, a post, a document — and run this mini audit:\n\n1. **Tool check** — did I use a tool suited to this content type (document, image, audio, video)?\n2. **Formatting check** — does it have headings, lists, and consistent styles, or is it a wall of text?\n3. **Image check** — is the image sharp at the size it's shown, and is it the right raster/vector choice?\n4. **Design check** — run the squint test: does one thing clearly stand out, with good contrast and breathing room?\n5. **Accessibility check** — does it have real alt text, and captions if it's a video?\n6. **Export check** — is it saved as the file type the destination actually needs?\n\nSix quick questions, one piece of content, a few minutes — and you'll already be applying skills a lot of adults never learned on purpose.`,
        callout: {
          label: "Try this today",
          text: "Pick just ONE past project and run this audit on it. You don't need to fix every project ever made — building the habit on one real example is what makes it stick.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've leveled up from "making stuff" to "making stuff *well*." Quick recap:\n\n• Match the **tool** and **file type** to the content and the job — and export what the destination actually needs.\n• **Format** for skimmability — headings, lists, consistent styles, and white space.\n• Know your images: **resolution** and **file size**, and **raster** (photos) vs. **vector** (logos/icons).\n• Apply simple **design principles** — contrast, alignment, don't overcrowd, limit fonts and colors — and run the 60-second checklist before you publish.\n• Build in **accessibility** with real **alt text**, **captions**, and labels beyond color alone — it includes everyone.\n• **Export** the right format for the job — especially PDF for résumés and application portals.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then write a quick reflection about something you could redesign.`,
      },
    ],
  },
  bigIdeas: [
    "Good **formatting** (headings, lists, consistent styles) makes content skimmable and professional.",
    "**Raster** images (photos) are pixels and blur when enlarged; **vector** images (logos/icons) are math and scale perfectly.",
    "Simple **design** = clarity (contrast, alignment, don't overcrowd), and **accessibility** (alt text, captions) includes everyone — including for résumés and application uploads.",
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
    "When you make a slideshow, upload a résumé PDF to a college portal, or post a captioned video for a scholarship, the same skills apply: clear **formatting**, the right **image** type, strong **contrast**, and **alt text** plus **captions** so it reaches everyone — exactly what employers expect from anyone who creates content.",
  quiz: [
    {
      id: "q1",
      question: "You're writing a scholarship personal statement in Google Docs. A counselor says it looks like a \"wall of text.\" What's the best formatting fix?",
      choices: [
        "Add five different fonts and neon colors so it looks exciting",
        "Add clear headings, shorter paragraphs, and bullet lists so readers can skim",
        "Shrink the font so more words fit on one page",
        "Remove all spacing so nothing is wasted",
      ],
      correctIndex: 1,
      explanation:
        "Formatting is like aisle signs in a store — headings, lists, and consistent styles let busy readers (including scholarship reviewers) skim and find what they need quickly.",
    },
    {
      id: "q2",
      question: "You're designing a banner for a summer internship fair and only have a tiny logo file. What's the best way to keep it sharp when enlarged?",
      choices: [
        "Stretch the small image bigger — stretching keeps it sharp",
        "Use a vector (.svg) version, which scales to any size without blurring",
        "Save it as a smaller file to add detail",
        "Take a screenshot of it to increase the resolution",
      ],
      correctIndex: 1,
      explanation:
        "Vector images are made of math, so they scale to any size and stay sharp. Stretching a small raster image just spreads the same pixels out, making it blurry.",
    },
    {
      id: "q3",
      question: "A college application portal rejects your activity list because the file is \"too large.\" Which statement about image/file size is TRUE?",
      choices: [
        "A bigger file is always better quality, so always use the biggest",
        "File size doesn't affect how fast something loads or whether portals accept it",
        "Huge files take more storage and load slowly, so match the size to the need",
        "Vector and raster files are always the exact same size",
      ],
      correctIndex: 2,
      explanation:
        "Bigger isn't always better. Huge files eat storage and data, load slowly, and often get rejected by portals. Pick a resolution and file size that fits the job.",
    },
    {
      id: "q4",
      question: "You're posting a club flyer image to the school website. What is alt text, and why does it matter?",
      choices: [
        "A backup copy of an image in case the file is lost",
        "A short description of an image that screen readers speak aloud for people who can't see it",
        "An alternate-colored version of the image for dark mode",
        "Text that automatically translates the image into other languages",
      ],
      correctIndex: 1,
      explanation:
        "Alt text is a short written description of an image. Screen readers speak it aloud so blind and low-vision users know what the image shows — a key part of accessibility.",
    },
    {
      id: "q5",
      question: "You're exporting a résumé to upload for a first-job application. Which choice best reflects good, simple design and the right export?",
      choices: [
        "Use many fonts and bright colors so it looks exciting, then send a .docx",
        "Cram in as much as possible so nothing is wasted, then screenshot it",
        "Use high contrast, aligned sections, limited fonts, and export as a PDF",
        "Use faint gray text on white to look modern, then email a photo of the screen",
      ],
      correctIndex: 2,
      explanation:
        "Good design is about clarity: high contrast, aligned elements, room to breathe, and a limited palette. PDF keeps the layout fixed on any device — what employers and portals expect.",
    },
    {
      id: "q6",
      question: "A form specifically asks for a PDF, but you keep uploading a Word document and getting an error. What's actually going wrong?",
      choices: [
        "Your internet connection is broken",
        "The file type doesn't match what the form requires — you need to export as a PDF first",
        "The form is broken and you should give up",
        "PDFs and Word documents are exactly the same thing",
      ],
      correctIndex: 1,
      explanation:
        "A rejected upload is often simply a file-type mismatch. Reading and matching the required extension (here, exporting to PDF) usually solves it instantly.",
    },
    {
      id: "q7",
      question: "You run the '60-second design check' on a flyer and notice the title, three headings, and the fine print are all bold, underlined, and in caps. What should you do?",
      choices: [
        "Nothing — more emphasis always helps",
        "Add a fourth style of emphasis to be thorough",
        "Remove emphasis from most elements so only the one or two most important things stand out",
        "Delete all the text and start with only images",
      ],
      correctIndex: 2,
      explanation:
        "Emphasis only works through contrast. When everything is bold and shouting, nothing actually stands out — trimming emphasis down to what truly matters fixes it.",
    },
    {
      id: "q8",
      question: "You're cropping a tiny, blurry headshot cut from an old group photo for a scholarship profile. Editing tools don't seem to help. Why not?",
      choices: [
        "The file type is wrong and switching to .svg will fix it",
        "A raster photo only contains the pixels it started with — cropping or filters can't add detail that was never captured",
        "Headshots don't need to be sharp",
        "Adding captions will sharpen the image",
      ],
      correctIndex: 1,
      explanation:
        "Raster images are a fixed grid of pixels. If the original resolution was low, no amount of cropping, filtering, or resizing can invent detail that isn't there — you need a better original.",
    },
  ],
  reflection: {
    prompt:
      "Think of a flyer, slide, résumé draft, or post you've seen (or made) that was hard to read. Name one formatting, design, or accessibility fix that would make it better — especially if someone were judging it for school, college, or a job.",
    placeholder: "Example: My club slide had tiny faint text — I'd add a heading, bump the contrast, add alt text, and export a clean PDF…",
  },
};
