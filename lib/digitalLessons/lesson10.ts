import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson10: AILessonConfig = {
  id: "dl-10",
  title: "10. Copyright, Licensing & Giving Credit",
  goal: "Use other people's content legally and ethically — understand copyright, licenses, Creative Commons, public domain, and fair use, avoid plagiarism, and give proper credit (including for AI-generated work) in school projects, scholarship videos, and portfolios.",
  xpReward: 500,
  badge: "Credit Giver",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/9",
  nextHref: "/learn/digital/11",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You're making a video, a slideshow, or a post and you want a cool song, a great photo, or a clip. Can you just grab it off the internet? Usually... no. Today you'll learn how to use other people's work the *right* way — legally and ethically — whether it's a class project, a scholarship video essay, or a portfolio for an internship.\n\nHere's our roadmap:\n\n• **Copyright** — why creators automatically own what they make.\n• **Licenses & Creative Commons** — permission with rules.\n• **Public domain and "free to use"** — and why you still read the terms.\n• **Fair use** — what it really covers (it's narrower than people think).\n• **Plagiarism vs. attribution** — and how to credit properly.\n• **Who owns AI-generated content?**\n• **Senior stretch** — media for college apps, scholarships, and job portfolios.\n\nThis matters now (that essay, that video edit) and later: getting this wrong at a job or online can mean takedowns, muted videos, failing grades, or even legal trouble. Getting it right makes you look trustworthy and professional.`,
        image: "/images/lessons/dl-10.png",
        imageAlt: "A photo, a song, and a piece of writing each tagged with a small copyright symbol, next to a checklist for giving credit",
        callout: {
          label: "Why it matters",
          text: "Creators put real time and skill into their work. Respecting copyright protects them — and one day it'll protect *you* and the things you make. It's the same rule pointed in both directions.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "The key words, in plain English",
        body: `This topic is full of official-sounding words. Here's what each one really means — keep this list in your back pocket:\n\n• **Copyright** = the rule that says whoever *makes* something automatically *owns* it. ("Copy-right" = the right to copy it belongs to them.)\n• **License** = permission to use someone's work, *with rules attached*. Like a hall pass that only works under certain conditions.\n• **Creative Commons (CC)** = a free, ready-made set of licenses creators use to say "you can use this if you follow these rules."\n• **Public domain** = work that belongs to *everyone* — free to use, no permission needed.\n• **Fair use** = a *narrow* exception that sometimes lets you use a small bit without asking (for things like a school report or a review).\n• **Plagiarism** = pretending someone else's work or ideas are your own. It's about *honesty*, not law.\n• **Attribution** = giving credit — clearly saying who made something and where you got it.\n\nNotice two of these get mixed up constantly: **copyright** is a *legal* issue (did you have permission?), while **plagiarism** is an *honesty* issue (did you say who made it?). Keep them separate and you're ahead of most adults.`,
        callout: {
          label: "Pro tip",
          text: "If you only remember one thing: \"I found it online\" is never the same as \"I'm allowed to use it.\" Permission is a separate question from whether you *can* download something.",
        },
      },
      {
        id: "why-it-matters",
        kicker: "Real stakes",
        title: "Why this actually matters — real consequences, not scare tactics",
        body: `It's easy to think "it's just a school project, who cares?" But copyright and honesty rules follow you into every part of digital life:\n\n• **Videos get muted or taken down.** Platforms scan uploads automatically for copyrighted music and clips. Use the wrong song in a class video and it might get silently muted — right when you wanted to show it off.\n• **Schools treat plagiarism seriously.** Copying text or ideas without credit can mean a failing grade, and colleges can rescind admission offers over serious academic dishonesty discovered later.\n• **Creators can send takedown requests.** If you post someone's copyrighted work without permission, they (or their platform) can have it removed — sometimes with a strike against your account.\n• **Employers and colleges notice sloppy sourcing.** A portfolio or essay with unattributed work signals carelessness, exactly what you don't want strangers judging you on.\n\nNone of this requires being scared of every project. It just means treating "whose work is this, and do I have permission?" as a normal first question — not an afterthought.`,
        callout: {
          label: "Why it matters",
          text: "The habit of asking permission and giving credit costs you seconds now. Skipping it can cost you a grade, a video, an account, or a reputation later. The math heavily favors the habit.",
        },
      },
      {
        id: "copyright",
        kicker: "The big idea",
        title: "Copyright: the creator owns it the moment they make it",
        body: `**Copyright** is a legal right that says the person who creates something **automatically owns it** — the moment they make it. They didn't have to register it or add a © symbol; it's theirs the instant it exists.\n\nCopyright covers original creative work like:\n\n• **Photos and art** • **Music and songs** • **Writing** (articles, stories, posts) • **Videos and films** • **Code and games**\n\nBecause they own it, *they* get to decide who can copy, share, or reuse it. That means you usually **can't just take it and use it** — even if it's easy to download, even if you're not making money, even if you say thanks.\n\nThink of it like a **bike sitting in someone's yard**. The fact that you *can* hop on and ride it doesn't make it yours, and "but the gate was open" isn't a defense. You need the owner's permission first.`,
        image: "/images/lessons/dl-10-2.png",
        imageAlt: "A photo, a song, and a piece of writing each glowing with a small copyright symbol, beside a bicycle in a yard with an open gate",
        callout: {
          label: "Common misconception",
          text: "\"If it's on Google Images or anywhere on the internet, it's free to use.\" False. Almost everything online was made by someone who owns the copyright. Being easy to find or download does NOT mean you have permission to reuse it.",
        },
      },
      {
        id: "copyright-myths",
        kicker: "Myth-busting",
        title: "Three more copyright myths, cleared up",
        body: `Beyond "if it's online, it's free," a few more myths cause real trouble:\n\n**Myth: "It's fine if I don't make money from it."** Copyright applies whether or not you profit. A non-commercial school video can still infringe on copyright — money isn't the deciding factor.\n\n**Myth: "Changing a few pixels or words makes it mine."** A small edit to someone else's photo, song, or paragraph doesn't erase their copyright. Courts look at how much of the *original creative expression* remains recognizable, not whether you technically altered something.\n\n**Myth: "There's no copyright symbol (©), so it's not protected."** Copyright is **automatic** the moment something original is created — no symbol, registration, or notice is required. Assume everything is protected unless you have a specific reason to think otherwise (like a stated license or public domain status).\n\nNoticing a pattern? Almost every copyright myth tries to find a shortcut around getting permission. There usually isn't one.`,
        checkIn: {
          prompt: "You use a photo for a nonprofit school fundraiser video, without permission, believing it's fine because you're not making money. Is that accurate?",
          choices: [
            "No, but only because it's a video and not a photo",
            "Yes, as long as it's for a good cause",
            "No — copyright applies whether or not money is involved; you still need permission or a license",
            "Yes — copyright only applies to commercial, for-profit use",
          ],
          correctIndex: 2,
          explanation:
            "Copyright protection doesn't depend on whether you're making money. A nonprofit or school purpose doesn't remove the need for permission or a proper license.",
        },
        callout: {
          label: "Watch out",
          text: "\"I didn't see a copyright symbol\" is not a legal shield. Copyright exists automatically the second original work is created — no © symbol required.",
        },
      },
      {
        id: "licenses-cc",
        kicker: "Permission with rules",
        title: "Licenses, Creative Commons & public domain",
        body: `So how *do* you use someone's work? You need their permission — and that usually comes as a **license**.\n\nA **license** is the creator saying "yes, you can use this — *if* you follow my rules." Back to the bike: a license is the owner saying "sure, ride it — as long as you bring it back and tell people it's mine."\n\n**Creative Commons (CC)** is a popular set of free, ready-made licenses creators use to share work with clear rules. Common conditions:\n\n• **Attribution (BY)** — you must credit the creator.\n• **NonCommercial (NC)** — you can't use it to make money.\n• **ShareAlike (SA)** — anything you build with it must use the same license.\n• **NoDerivatives (ND)** — you can't change it.\n\n**Public domain** means the work is **free for anyone to use** with no permission needed — usually because the copyright expired or the creator gave up their rights. **"Royalty-free" / "free to use"** sites (for stock photos, music, sound effects) let you use content under their own terms — which you should always actually read.`,
        bullets: [
          "**License** = permission to use something, with rules attached.",
          "**Creative Commons** = free licenses with conditions like attribution, non-commercial, or share-alike.",
          "**Public domain** = free for anyone, no permission needed.",
          "**\"Free to use\" / royalty-free** = allowed under that site's terms — read them first.",
        ],
        callout: {
          label: "Watch out",
          text: "\"Free to use\" almost never means \"no rules.\" Many free sources still require you to credit the creator, ban commercial use, or forbid editing. Always read the license before you assume what you're allowed to do.",
        },
      },
      {
        id: "licenses-practice",
        kicker: "Apply it",
        title: "Decode a license before you use it",
        body: `Creative Commons licenses stack their letters together, so you can read a combination like a short code. Let's decode a few:\n\n• **CC BY** — Attribution only. Use it for anything, even commercially, as long as you credit the creator.\n• **CC BY-NC** — Attribution + NonCommercial. Credit the creator, and don't use it to make money (so a paid product is out, but a free school project is fine).\n• **CC BY-NC-ND** — Attribution + NonCommercial + NoDerivatives. Credit the creator, no money-making use, AND you can't edit or remix it — share it exactly as-is.\n• **CC0** — "No rights reserved." The creator has waived all rights; it behaves like public domain.\n\nNotice each added letter *removes* a freedom, not adds one. The fewer letters, the more you're allowed to do.`,
        checkIn: {
          prompt: "A photo is licensed CC BY-NC-ND. Which use is allowed?",
          choices: [
            "Editing it heavily and reposting the remix",
            "Selling prints of it for profit",
            "Using it however you want since it's technically 'free'",
            "Using it unchanged in a free school presentation, with credit to the creator",
          ],
          correctIndex: 3,
          explanation:
            "NC blocks commercial use and ND blocks changing the work, but using it as-is, for free, with proper attribution, fits within a CC BY-NC-ND license.",
        },
        callout: {
          label: "Pro tip",
          text: "When you see a CC license, read it left to right: the letters after BY only ever take away freedoms (NC, SA, ND) — they never grant extra ones beyond attribution.",
        },
      },
      {
        id: "fair-use-plagiarism",
        kicker: "Two big traps",
        title: "Fair use is narrow — and credit isn't a free pass",
        body: `**Fair use** is a limited exception that *sometimes* lets you use a small piece of copyrighted work without permission — for things like commentary, criticism, news, teaching, or parody. But it is **case-by-case** and depends on things like how much you used and whether it hurts the creator's ability to sell their work.\n\nThe key word is **limited**. Fair use is NOT a blanket "it's for school, so anything goes." Copying a whole song into your project is very different from quoting one line to discuss it.\n\nSeparate but related is **plagiarism**: passing off someone else's work or ideas as your own. Plagiarism is an **honesty problem** (you're lying about who made it), while copyright is a **legal problem** (you're using it without permission). You can commit one without the other — and a lot of trouble comes from doing both at once.\n\nThe fix for plagiarism is **attribution**: clearly crediting the source. But credit alone doesn't make any use legal — you still need the right license or permission.`,
        callout: {
          label: "Common misconception",
          text: "\"Giving credit makes any use legal.\" Not true. Credit fixes *plagiarism* (the honesty issue), but you still need permission or the right license to use copyrighted work. Crediting a song you weren't allowed to use is still copyright infringement.",
        },
      },
      {
        id: "fair-use-test",
        kicker: "Go deeper",
        title: "The four questions courts actually ask about fair use",
        body: `Fair use feels vague because it genuinely is a judgment call — but it's not a total mystery. Courts weigh four factors together:\n\n1. **Purpose** — is it for commentary, criticism, teaching, or parody (favors fair use), or just to avoid paying for something (doesn't)?\n2. **Nature of the work** — using a small piece of a factual news article leans more toward fair use than copying a highly creative song or film.\n3. **Amount used** — quoting one sentence to discuss it is very different from copying an entire chapter or full song.\n4. **Effect on the market** — does your use replace the need for someone to buy the original? If people could watch your video instead of paying for the movie, that weighs heavily against fair use.\n\nA quick real-world test: reacting to 15 seconds of a song to critique its lyrics leans toward fair use. Uploading the entire song as "background music" for your video does not — you used the whole thing, for a purpose unrelated to commentary, and it doesn't need permission-based licensing that a real license would require.`,
        checkIn: {
          prompt: "You use the ENTIRE runtime of a popular song as unremarked background music in your class video, purely because you like it. Which fair-use factor most clearly weighs AGAINST you?",
          choices: [
            "You used the whole song for a purpose unrelated to commentary, and using the entire piece leans against fair use",
            "The purpose is commentary or criticism",
            "It has no effect on the market at all",
            "The song is a factual work, not creative",
          ],
          correctIndex: 0,
          explanation:
            "Using an entire creative work as plain background music — not for commentary, criticism, or parody — is exactly the kind of full, unrelated use that weighs against fair use.",
        },
        callout: {
          label: "Pro tip",
          text: "If you're not sure fair use applies, don't gamble on it — use licensed or public domain media instead. Fair use is meant as a narrow safety net, not a first-choice strategy.",
        },
      },
      {
        id: "ai-attribution",
        kicker: "Crediting properly",
        title: "How to attribute — and who owns AI-generated work?",
        body: `When you *are* allowed to use something, give a clear attribution. A good one usually names four things, sometimes remembered as **TASL**:\n\n• **Title** — what the work is called\n• **Author** — who made it (the creator)\n• **Source** — where you found it (a link)\n• **License** — what license it's under (e.g., CC BY)\n\nExample: *"Sunrise Over Hills" by Jordan Lee, from Unsplash, used under the Unsplash License.*\n\n**What about AI-generated content?** This is new and the rules are still being worked out. Some key points: in many places, work created *purely* by AI may **not** be copyrightable the way human work is, because there's no human author. Tools also have their own terms about what you can do with their output. And it's good practice — and increasingly required at school and work — to **disclose when you used AI**, just like any other source. College honor codes and internship employers often care a lot about this.`,
        checkIn: {
          prompt: "You generate an image with an AI tool for a class project. Which statement is most accurate?",
          choices: [
            "AI-generated content is automatically copyrighted exactly like human-made work, no questions asked",
            "In many places, purely AI-generated work may not get the same copyright protection as human-created work, and you should still disclose that you used AI",
            "Using AI means you never need to credit anything",
            "AI tools have no terms of service governing their output",
          ],
          correctIndex: 1,
          explanation:
            "Because there's no human author, purely AI-generated content often isn't copyrightable the same way human work is — and disclosing AI use is expected practice at school and work, just like citing any other source.",
        },
        callout: {
          label: "Pro tip",
          text: "When in doubt, over-credit and ask. A clear note like \"Image generated with [AI tool]\" or a full attribution line costs you nothing and protects you. Silence is what gets people into trouble.",
        },
      },
      {
        id: "level-up-vocabulary",
        kicker: "Level up",
        title: "A few more words worth knowing",
        body: `A handful of advanced terms show up once you start dealing with real-world copyright situations. You don't need these to follow today's lesson, but they'll make you sound (and be) informed:\n\n• **DMCA** — the **Digital Millennium Copyright Act**, a U.S. law that gives platforms a formal process for copyright complaints and removals.\n• **Takedown notice** — a formal request a copyright owner sends to a platform asking for infringing content to be removed.\n• **Derivative work** — something new created *from* an existing copyrighted work, like a remix, a translation, or a fan edit. Making one usually still needs the original creator's permission.\n• **Remix culture** — the broader trend of creators building on, sampling, and reworking existing media. It's common online, but it doesn't erase copyright — many remixers still seek permission or use licensed/public-domain source material.\n• **Royalty** — a payment made to a creator each time their licensed work is used or sold.\n\nKnowing these terms means you'll understand *why* a video got pulled, or what a "cease and desist" email is actually about, instead of just feeling confused.`,
        callout: {
          label: "Pro tip",
          text: "If you ever get a takedown notice or copyright warning, don't panic or ignore it. Read exactly what it says, remove the flagged content if you don't have a legitimate license, and ask a trusted adult or teacher if you're unsure what to do next.",
        },
      },
      {
        id: "can-i-use-it",
        kicker: "Decision framework",
        title: "\"Can I use this?\" — a simple 3-question flowchart",
        body: `Before you drop any photo, song, or clip into your project, run it through three quick questions in order:\n\n**Question 1 — Do I have explicit permission?** Is it licensed (Creative Commons, royalty-free site, public domain), or did the creator say yes directly? If yes, go to Question 2. If no, don't use it — or check if it might genuinely qualify as narrow fair use.\n\n**Question 2 — What are the rules?** Does the license require attribution? Ban commercial use? Forbid edits? Note every condition — you must follow *all* of them, not just the ones that are convenient.\n\n**Question 3 — Did I write the credit?** Even when a license doesn't strictly require it, crediting well (Title, Author, Source, License) is good practice and protects you from an honest mistake looking like plagiarism.\n\nIf you can answer all three clearly, you're in the clear. If you're stuck on Question 1, that's your answer: find something else, or ask.`,
        checkIn: {
          prompt: "You found a great photo but can't find any license information, statement of permission, or public domain status anywhere. What should you do?",
          choices: [
            "Use it anyway since it's probably fine",
            "Use it only if you change the colors slightly",
            "Use it and just avoid crediting it so no one notices",
            "Assume you don't have permission and either find a clearly licensed alternative or contact the creator to ask",
          ],
          correctIndex: 3,
          explanation:
            "No license information means you can't confirm permission — and copyright is the default assumption for anything original. When in doubt, find a clearly licensed source or ask the creator directly.",
        },
        callout: {
          label: "Watch out",
          text: "\"I couldn't find any rules, so I assumed it was fine\" is backwards. No visible license means assume full copyright protection, not the opposite.",
        },
      },
      {
        id: "senior-media",
        kicker: "For older teens",
        title: "Media for scholarships, college apps & job portfolios",
        body: `High-stakes projects have the same copyright rules as class projects — and sometimes *stricter* expectations, because your work may be posted publicly or judged by adults who notice muted audio and missing credits.\n\n• **Scholarship / college video essays** — don't rip a chart-topping song from a streaming app. Use a free music library or Creative Commons track, read the license, and put credits on the end screen or description.\n• **Portfolios for internships** — if you include photos, fonts, or code snippets you didn't make, check the license and attribute. Employers notice honesty.\n• **Group Google Docs / shared decks** — if a teammate drops in a random Google Image, pause and ask: do we have permission? Better to swap it for a licensed photo than to submit a stolen one.\n• **Your own work** — when *you* create something original, you own the copyright. That means you can put it in a portfolio — and others need *your* permission to reuse it.\n\nYounger teens: practice the habit now on school videos. Seniors: treat every public upload like a professional sample of your judgment.`,
        bullets: [
          "Scholarship videos need licensed music — not ripped hits.",
          "Portfolios should credit anything you didn't create.",
          "In group docs, question mystery images before submitting.",
          "Your original work is yours — protect it and share it wisely.",
        ],
        callout: {
          label: "Watch out",
          text: "\"It's for a scholarship / school / nonprofit\" does not automatically equal fair use for a full song or movie clip. When in doubt, use clearly licensed media and write the credit.",
        },
      },
      {
        id: "where-to-find",
        kicker: "A real example",
        title: "Where to actually find stuff you're allowed to use",
        body: `Knowing the rules is great — but where do you go to find legal photos, music, and clips? Here are real, beginner-friendly places, each with content you're *allowed* to use (just check each one's terms):\n\n• **Photos** — Unsplash, Pexels, and Pixabay offer free stock photos. Wikimedia Commons has tons of openly licensed images.\n• **Music & sound** — the YouTube Audio Library, Free Music Archive, and Incompetech have free or Creative Commons tracks.\n• **Anything, filtered** — Creative Commons Search lets you search across many sites for CC-licensed work.\n• **Already free** — work in the **public domain** (very old books, art, and music whose copyright expired).\n\nFast checklist before you use *anything*:\n\n• **Do I have permission?** (a license, public domain, or it's clearly free to use)\n• **What are the rules?** (credit required? non-commercial only? no editing?)\n• **Did I write the credit?** (Title, Author, Source, License)\n\nIf you can answer all three, you're in the clear.`,
        bullets: [
          "**Photos**: Unsplash, Pexels, Pixabay, Wikimedia Commons.",
          "**Music/sound**: YouTube Audio Library, Free Music Archive, Incompetech.",
          "**Search everything**: Creative Commons Search.",
          "Always check: permission? rules? credit written?",
        ],
        callout: {
          label: "Watch out",
          text: "Even on \"free\" sites, individual items can have different rules. One photo might need credit while another doesn't. Don't assume the whole site works one way — check the license on the specific file you grab.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Finding legal media for a class video, step by step",
        body: `You're making a class video and want **a background song and a photo**. Here's how to do it right, step by step.\n\n**Step 1 — Don't rip from streaming.** Pulling a popular song straight off a streaming app or YouTube is copyrighted — it can get your video **muted or taken down**, even for a school project. Skip it.\n\n**Step 2 — Search licensed sources.** Look on sites built for this: free music libraries, Creative Commons search, or royalty-free stock sites. Filter for content you're allowed to use.\n\n**Step 3 — Read the license.** For the song, check: does it require attribution? Is it non-commercial only? (A class project is usually fine, but read anyway.) Do the same for the photo.\n\n**Step 4 — Download and write the attribution.** Save the files and write a credit line using **TASL**: e.g., *Music: "Bright Days" by A. Rivera (Free Music Archive, CC BY 4.0). Photo: "City Park" by M. Chen (Pexels, Pexels License).*\n\n**Step 5 — Put credits where they belong.** Add the attributions to your video's end screen or description. Now your video is legal, ethical, and won't get muted.`,
        image: "/images/lessons/dl-10-3.png",
        imageAlt: "A class video editing screen with a licensed song and photo dropped in, and a credits panel listing Title, Author, Source, and License",
        callout: {
          label: "Watch out",
          text: "Music and images in videos and posts are often scanned automatically. Using a copyrighted song can get your video silently muted, demonetized, blocked in some countries, or removed — even if you credited the artist. Licensed media avoids all of that.",
        },
      },
      {
        id: "worked-2",
        kicker: "Worked example",
        title: "Using a CC-licensed photo in a scholarship essay slide, step by step",
        body: `Now a higher-stakes version: you want a photo for a scholarship application slide deck. Let's do it right, step by step.\n\n**Step 1 — Search a licensed source.** You find a striking mountain photo on a Creative Commons search site.\n\n**Step 2 — Read the exact license.** It's marked **CC BY 4.0** — attribution required, but otherwise usable, including for something as important as a scholarship submission.\n\n**Step 3 — Check resolution and fit.** You confirm the resolution is high enough not to blur when placed full-slide, and it fits your slide's theme without needing heavy edits (which could raise ND concerns on other licenses).\n\n**Step 4 — Write the TASL credit.** *"Misty Ridge" by S. Okafor, from Wikimedia Commons, licensed CC BY 4.0.* You place it in small text in the corner of the slide, or on a dedicated credits slide at the end.\n\n**Step 5 — Double-check before submitting.** You confirm the license text is visible somewhere in your final submission, not just in your notes — a credit only "counts" if the reviewer can actually see it.\n\nSame process as the class video — just with more riding on getting it right.`,
        checkIn: {
          prompt: "You use a CC BY 4.0 photo in your scholarship slide deck but only wrote the credit in your personal notes, not anywhere in the actual submitted deck. Is that sufficient attribution?",
          choices: [
            "Yes — CC BY doesn't actually require attribution",
            "No, because CC BY photos can never be used in slide decks",
            "No — the attribution needs to be visible in the actual work you submit, not just in private notes",
            "Yes — as long as you know where it came from, that's enough",
          ],
          correctIndex: 2,
          explanation:
            "Attribution has to be visible to whoever views your finished work — a credit hidden in personal notes doesn't fulfill a CC BY license or protect you from a plagiarism concern.",
        },
        callout: {
          label: "Pro tip",
          text: "Keep a simple running list of every image, song, and clip you use in a project, with its license and credit line, as you go. Writing it down later from memory is where mistakes creep in.",
        },
      },
      {
        id: "credit-checklist",
        kicker: "Take action",
        title: "Your before-you-submit credit checklist",
        body: `Turn today's whole lesson into a habit you can run in under a minute, right before you submit or post anything that isn't 100% your own:\n\n1. **Source check** — where exactly did this photo, song, or clip come from? Can you name it?\n2. **Permission check** — is it licensed, public domain, or clearly free to use? If you're not sure, treat it as copyrighted.\n3. **Rules check** — does the license require attribution, ban commercial use, or forbid edits? Follow every condition, not just the easy ones.\n4. **Credit check** — did you write a visible TASL credit (Title, Author, Source, License) somewhere the viewer can actually see it?\n5. **Honesty check** — if you used AI for any part of it, did you disclose that, the way you'd cite any other source?\n\nFive quick questions, and you've covered copyright, licensing, and plagiarism in one pass.`,
        callout: {
          label: "Try this today",
          text: "Run this checklist on the very next project you turn in — even if it's just double-checking a single photo. The habit sticks fastest when you apply it to something real.",
        },
      },
      {
        id: "can-i-use-scenario",
        kicker: "Mini scenario",
        title: "Second case: the scholarship video soundtrack",
        body: `Priya is editing a two-minute scholarship video. She finds a trending song on a random "free music" site with no license info and wants to drop it in.\n\n**Before:** downloads the track, posts the video, gets a copyright strike — or the portal mutes the audio.\n\n**After:** checks the license, finds a **Creative Commons** or platform-provided royalty-free track with clear terms, saves the attribution line in her credits slide, and exports with captions.\n\nSame video, different outcome. Copyright isn't about being paranoid — it's about making sure your hard work doesn't get silenced or disqualified because of a 30-second soundtrack choice.`,
        callout: {
          label: "Try this week",
          text: "Bookmark one legitimate free-media source (your school's library page, Creative Commons search, or a platform audio library) before your next project — not during it.",
        },
        checkIn: {
          prompt: "A site says 'free download' but shows no license, no creator name, and no terms. Can you safely use the music in a public scholarship video?",
          choices: [
            "Yes — 'free download' means free to use anywhere",
            "Yes — if you credit 'the internet' in small text",
            "No — without clear permission or license terms, you don't have the right to use it publicly",
            "Yes — nonprofit school projects are always fair use",
          ],
          correctIndex: 2,
          explanation:
            "'Free to download' is not the same as 'free to use in your video.' You need clear license terms or explicit permission before using someone else's creative work.",
        },
      },
      {
        id: "attribution-before-after",
        kicker: "Before & after",
        title: "Credit done wrong vs. credit done right",
        body: `**Before (not enough):**\n\`Image: Google\` or \`Music: unknown\` or no credit at all because "it's just for school."\n\n**After (actually useful):**\n\`Photo: "Sunset over harbor" by Jane Doe, CC BY 2.0, via Flickr — cropped and color-adjusted.\`\n\`Music: "Soft Horizon" by AudioArtist, licensed from YouTube Audio Library.\`\n\nGood attribution answers three questions: **what** did you use, **who** made it, and **where/how** did you get permission to use it?\n\nSloppy credit is how plagiarism accusations start — even when you didn't mean to steal. Precise credit is how you show you're trustworthy, in class and in portfolios.`,
        callout: {
          label: "Pro tip",
          text: "Keep a 'sources' doc while you edit — paste links and license info as you go. Hunting for credits at 11 p.m. is how 'Image: Google' happens.",
        },
      },
      {
        id: "plagiarism-red-flags",
        kicker: "Red flags",
        title: "When your project is drifting into plagiarism",
        body: `These habits feel small in the moment but cause big problems on essays, videos, and portfolios:\n\n• **Copy-paste with light rewording** — if the structure and ideas aren't yours, changing a few words doesn't fix it.\n• **AI-generated paragraphs with no disclosure** when your teacher or portal requires transparency.\n• **Stock images with watermarks** — screenshotting around a watermark isn't a workaround.\n• **"I'll add credits later"** — later often never comes, and the export ships without them.\n• **Using a classmate's slide layout verbatim** including their original wording — shared templates still need your own content and credit where required.\n\n**Fix pattern:** build from sources you can name, keep a running credit list, and when in doubt ask *before* you submit — not after you get flagged.`,
        callout: {
          label: "Watch out",
          text: "Plagiarism rules apply to images and music too, not just essays. A beautiful video with an uncredited soundtrack is the same category of problem.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You now know how to use the internet's content without stealing it. Quick recap:\n\n• **Copyright** means the creator automatically owns their work — you usually can't just reuse it, whether or not money is involved.\n• A **license** is permission with rules; **Creative Commons** offers free licenses with conditions (more letters = fewer freedoms); **public domain** is free for all.\n• **Fair use** is narrow and weighed on purpose, nature, amount, and market effect — not a blanket school excuse.\n• **Plagiarism** is claiming others' work as yours; fix it with **attribution** (Title, Author, Source, License) — but credit alone doesn't make use legal.\n• **AI-generated** content has its own evolving rules — disclose when you use it.\n• When unsure, run the **3-question flowchart**: permission? rules? credit written? For scholarships, college apps, and portfolios: use licensed media and write visible credits.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then write a quick reflection.`,
      },
    ],
  },
  bigIdeas: [
    "**Copyright** means the creator automatically owns their work — you usually need permission to reuse it, regardless of money.",
    "A **license** is permission with rules; **Creative Commons** and **public domain** make some work free to use under conditions.",
    "**Fair use** is narrow, and **credit** fixes plagiarism but doesn't make an illegal use legal — especially on scholarship videos and portfolios.",
  ],
  keyTerms: [
    { term: "Copyright", definition: "The legal right that automatically gives a creator ownership of their original work the moment it's made." },
    { term: "License", definition: "Permission from the owner to use their work, with rules you must follow." },
    { term: "Creative Commons", definition: "A set of free, ready-made licenses creators use to share work under clear conditions like attribution or non-commercial." },
    { term: "Public domain", definition: "Work that's free for anyone to use without permission, usually because copyright expired or was waived." },
    { term: "Fair use", definition: "A limited, case-by-case exception weighed on purpose, nature, amount used, and market effect — for things like commentary, news, or teaching." },
    { term: "Plagiarism", definition: "Passing off someone else's work or ideas as your own — an honesty problem fixed by giving credit." },
    { term: "Attribution", definition: "Crediting a source clearly, usually with the Title, Author, Source, and License (TASL)." },
  ],
  realWorld:
    "Whether you're posting a video, writing a report, designing for a job, or submitting a scholarship clip, the same rules apply: use **licensed** or **public domain** media, respect **copyright**, and write a clear, visible **attribution**. Skipping it gets videos muted, posts removed, and reputations damaged.",
  quiz: [
    {
      id: "q1",
      question: "You're building a slide deck for a college interview portfolio and grab a great photo from Google Images. What's the safest assumption?",
      choices: [
        "Someone owns the copyright, so you need a license or permission unless it says otherwise",
        "It's automatically public domain once it's online",
        "You can use it as long as you don't make money",
        "It's free to use because it appeared in a search",
      ],
      correctIndex: 0,
      explanation:
        "Almost everything online was made by someone who owns the copyright. Showing up in a search doesn't grant permission — you need a license, permission, or a clearly free source.",
    },
    {
      id: "q2",
      question: "A Creative Commons photo for your internship portfolio has an 'Attribution' (BY) license. What must you do?",
      choices: [
        "Pay the creator a fee before using it",
        "Credit the creator when you use the work",
        "Only use it for commercial projects",
        "Keep the work completely unchanged forever",
      ],
      correctIndex: 1,
      explanation:
        "Attribution (BY) means you must credit the creator. Other conditions like NonCommercial or ShareAlike add different rules, but BY specifically requires giving credit.",
    },
    {
      id: "q3",
      question: "A teammate says you can drop a full popular song into your scholarship video essay because \"it's for school / a nonprofit.\" Which statement about fair use is correct?",
      choices: [
        "Fair use lets you copy entire songs and movies freely",
        "Fair use is a limited, case-by-case exception for things like commentary, news, or teaching — not a blanket pass for whole songs",
        "Fair use means anything used for school or scholarships is automatically allowed",
        "Fair use only applies if you give credit",
      ],
      correctIndex: 1,
      explanation:
        "Fair use is narrow and decided case-by-case. It is NOT a blanket 'it's for school/scholarship' pass for entire songs, and credit alone doesn't create fair use.",
    },
    {
      id: "q4",
      question: "You copy a paragraph from a website into your college application essay without saying where it came from. What's the difference between plagiarism and copyright infringement?",
      choices: [
        "Plagiarism is illegal but copyright infringement is just rude",
        "Plagiarism only applies to music, infringement only to writing",
        "Plagiarism is claiming others' work as your own (honesty); infringement is using it without permission (legal)",
        "They're exactly the same thing",
      ],
      correctIndex: 2,
      explanation:
        "Plagiarism is an honesty problem — pretending someone else's work is yours. Copyright infringement is a legal problem — using protected work without permission. You can do one, the other, or both.",
    },
    {
      id: "q5",
      question: "You lightly edit a copyrighted image for a club poster, add a credit line, and post it. Is it now yours to use freely?",
      choices: [
        "Yes — as long as it's for a school project",
        "Yes — editing it makes it a new original work",
        "Yes — giving credit makes any use legal",
        "No — small changes and credit don't replace needing permission or the right license",
      ],
      correctIndex: 3,
      explanation:
        "Changing a work slightly doesn't make it yours, and credit only fixes plagiarism. You still need a license or permission to legally use copyrighted content.",
    },
    {
      id: "q6",
      question: "A photo is licensed CC BY-NC-ND. Which use fits within that license?",
      choices: [
        "Using it completely unchanged in a free class presentation, with credit given",
        "Remixing it heavily into a new collage",
        "Selling printed copies of it",
        "Using it any way you like since it's 'free'",
      ],
      correctIndex: 0,
      explanation:
        "NC blocks commercial use and ND blocks changes, but using the work as-is, for free, with attribution, fits a CC BY-NC-ND license.",
    },
    {
      id: "q7",
      question: "You use an entire copyrighted song, unedited, as background music in a video purely because you like it — no commentary or critique involved. Which fair-use factor weighs most clearly against you?",
      choices: [
        "The song is non-creative and factual",
        "You used the whole work for a purpose unrelated to commentary or criticism",
        "The purpose is commentary or parody",
        "There's no possible effect on the market for the song",
      ],
      correctIndex: 1,
      explanation:
        "Using an entire creative work as unremarked background music — with no commentary, criticism, or transformation — is exactly the kind of use that weighs against fair use.",
    },
    {
      id: "q8",
      question: "You find a photo with no visible license, statement of permission, or public domain notice anywhere. What's the safest move?",
      choices: [
        "Use it only if you convert it to a different file type",
        "Use it but skip crediting it so it's less noticeable",
        "Assume it's still under copyright and either find a clearly licensed alternative or ask the creator directly",
        "Use it and assume it's fine since you searched a bit",
      ],
      correctIndex: 2,
      explanation:
        "Copyright protection is automatic and the default assumption. No visible license means you don't have confirmed permission — find a clearly licensed source or ask first.",
    },
  ],
  reflection: {
    prompt:
      "Think about the last video, slideshow, scholarship clip, or post you made. Where did the images or music come from — and how could you check or write a proper attribution next time?",
    placeholder: "Example: I grabbed a song from YouTube — next time I'd use a free music library and write a TASL credit line…",
  },
};
