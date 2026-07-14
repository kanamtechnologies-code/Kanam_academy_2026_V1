import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson3: AILessonConfig = {
  id: "dl-3",
  title: "3. Search Like a Pro",
  goal: "Find reliable information quickly using strong keywords, search operators, and filters — and know why the top result isn't always the best.",
  xpReward: 150,
  badge: "Search Sleuth",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/2",
  nextHref: "/learn/digital/4",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Everyone can type words into a search box. But there's a huge gap between *searching* and *searching like a pro* — the difference between scrolling through junk for ten minutes and finding the exact answer in ten seconds.\n\nHere's our roadmap:\n\n• **How search engines actually work** — crawl, index, rank, in plain English.\n• **Choosing powerful keywords** — why fewer, sharper words beat long sentences.\n• **Search operators** — secret commands like quotes, \`-\`, \`site:\`, and \`filetype:\`.\n• **Filters, ads, and trust** — spotting sponsored results and not believing the #1 link automatically.\n• **A refine-until-it-works loop** — for homework, scholarships, jobs, and troubleshooting.\n\nThis skill pays off everywhere: research projects, debugging a frozen app, finding a part-time job posting, hunting scholarship PDFs, or settling an argument with facts.`,
        image: "/images/lessons/dl-3.png",
        imageAlt: "Laptop browser with a search bar and results list; smartphone showing the same search on a smaller screen",
        callout: {
          label: "Why it matters",
          text: "In school and at work, the people who find good answers fast look brilliant — not because they know more, but because they search smarter. It's a learnable superpower.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "Twenty minutes, zero useful results",
        body: `Devon needs a source for a science report on why phones overheat during gaming. Devon types: *"why does my phone get so hot when I play games for a long time is that bad for it should I be worried."* Twenty minutes and four scrolls later: gaming forums arguing, an ad for phone cases, and a five-year-old thread that doesn't match Devon's phone at all.\n\nSitting next to Devon, a classmate types five words — \`phone overheating gaming causes site:edu\` — and finds a clear, sourced explanation in under thirty seconds.\n\nSame question. Same search engine. Wildly different results. The gap wasn't luck; it was a *skill* — sharp keywords and one small command. That's exactly what the next fifteen minutes will teach you.`,
        callout: {
          label: "Keep this in mind",
          text: "A weak search isn't a sign you don't know enough. It's almost always a sign the search itself needs sharpening — and that's completely fixable.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "The search vocabulary, made simple",
        body: `A few words come up again and again when we talk about searching. Here they are in plain English so nothing trips you up later.\n\n• A **search engine** is the tool that finds web pages for you — Google, Bing, and DuckDuckGo are all search engines.\n• A **keyword** is one of the important words you type to describe what you want (like \`tornado\` or \`overheating\`).\n• A **query** is the whole thing you type into the box — all your keywords and any special commands together.\n• A **result** is one of the links the search engine shows you back. The list of them is your "search results."\n\nThat's the whole vocabulary. Now let's see what happens behind the scenes when you hit Enter.`,
        callout: {
          label: "Pro tip",
          text: "There's no \"wrong\" search — if your first try misses, just tweak the words and try again. Good searchers rarely nail it on attempt one; they adjust quickly. Searching is a back-and-forth, not a single guess.",
        },
      },
      {
        id: "concept-1",
        kicker: "Behind the box",
        title: "How a search engine finds anything in a split second",
        body: `When you search, the engine isn't scanning the whole internet right then — that would take forever. It already did the hard work ahead of time, in three steps:\n\n• **Crawl** — Automated programs (often called "spiders" or "bots") roam the web, following links from page to page and reading what's there.\n• **Index** — The engine stores what it found in a giant, organized catalog called the **index**. Think of the index at the back of a textbook that lists which page every topic is on — same idea, just enormous.\n• **Rank** — When you type a **query** (your search words), the engine instantly looks in its index and **ranks** the matching pages, meaning it puts them in order, trying to show the most relevant and trustworthy ones first.\n\nSo a search isn't a live trip across the internet — it's a lightning-fast lookup in a pre-built catalog. That's why results appear the instant you hit enter.`,
        callout: {
          label: "Pro tip",
          text: "Because results come from an index that was built earlier, brand-new pages can take time to show up. If you need the very latest news, use the engine's \"News\" tab or a date filter instead of a plain search.",
        },
        checkIn: {
          prompt: "Why do search results appear almost instantly when you hit enter?",
          choices: [
            "Results are always pre-written by humans",
            "Search engines guess randomly",
            "The engine already crawled and indexed pages ahead of time, so your search is just a fast lookup in that catalog",
            "The engine searches the entire live internet in that instant",
          ],
          correctIndex: 2,
          explanation:
            "Search engines crawl the web and build a giant index ahead of time. Your query just triggers a fast lookup and ranking within that pre-built catalog.",
        },
      },
      {
        id: "concept-2",
        kicker: "The big skill",
        title: "Pick sharp keywords, not full sentences",
        body: `A **keyword** is a word or short phrase you give the search engine to describe what you want. The single biggest upgrade to your searching is choosing keywords carefully.\n\nThink of it like giving clues to a **librarian**. You wouldn't say "Hi, I'm wondering if you could possibly help me find something about, you know, the weather and how it sometimes makes those big spinning storms." You'd say "tornado formation." Clear nouns and specifics get you to the right shelf instantly.\n\nCompare these two searches for the same goal:\n\n• Weak: \`why does my phone get hot when I play games for a long time is that bad\`\n• Strong: \`phone overheating gaming causes\`\n\nThe strong version keeps the *important* words (the nouns and specifics) and drops the filler ("why does my," "is that bad"). If your first results are off, **refine** them — add a more specific word, swap a vague word for a precise one, or remove a word that's pulling in the wrong stuff.`,
        bullets: [
          "Keep the **important nouns and specifics**; drop filler words.",
          "Be precise: \`tornado formation\` beats \`big spinning storms\`.",
          "If results are off, **refine** — add, swap, or remove a word.",
          "Add context words like a brand, year, or place to narrow results.",
        ],
        callout: {
          label: "Common misconception",
          text: "More words does NOT mean a better search. Typing a long, chatty sentence often buries your real keywords and gives worse results. Short and specific usually wins.",
        },
        checkIn: {
          prompt: "Which search is most likely to give the best results for phone overheating?",
          choices: [
            "why does my phone get so hot when I play games for hours is that bad for it",
            "phone",
            "please help me my phone is hot",
            "phone overheating gaming causes",
          ],
          correctIndex: 3,
          explanation:
            "Strong keywords keep the important nouns and specifics and drop the filler. The chatty sentence buries the real keywords, and a single vague word like 'phone' is too broad.",
        },
      },
      {
        id: "concept-3",
        kicker: "Power commands",
        title: "Search operators: tiny symbols, huge control",
        body: `**Search operators** are special commands you add to a query to control your results precisely. They're like the **filters on a shopping site** that let you narrow down to exactly the size, color, and price you want. Here are the most useful ones:\n\n• **Quotes** \`"exact phrase"\` — find that phrase exactly, in that order.\n• **Minus** \`-word\` — *exclude* a word. \`jaguar -car\` finds the animal, not the vehicle.\n• **site:** \`site:domain\` — search within one website only. \`climate change site:nasa.gov\` searches only NASA's site.\n• **filetype:** \`filetype:pdf\` — find a specific file type. \`study guide filetype:pdf\` finds downloadable PDFs.\n• **Date operators** \`after:YYYY\` and \`before:YYYY\` — keep results from a certain year range.\n\nYou can combine them. \`"photosynthesis" site:edu filetype:pdf\` hunts for PDFs about that exact term on educational sites. That's the kind of search that makes a research project feel easy.`,
        image: "/images/lessons/dl-3-2.png",
        imageAlt: "Browser search box on a laptop showing operators like quotes, minus, site:, and filetype: with filtered results below",
        table: {
          columns: ["Operator", "What it does", "Example"],
          values: [
            ["\"exact phrase\"", "Matches the words exactly, in order", "\"first day of school\""],
            ["-word", "Excludes results with that word", "apple -fruit"],
            ["site:", "Searches only one website", "essay tips site:bbc.co.uk"],
            ["filetype:", "Finds a specific file type", "resume template filetype:pdf"],
            ["after: / before:", "Limits results to a date range", "teen volunteer after:2026"],
          ],
          rowCount: 5,
        },
        callout: {
          label: "Pro tip",
          text: "Use site: to search a website that has a weak built-in search bar. Many sites are far easier to search through a search engine than with their own search box.",
        },
        checkIn: {
          prompt: "You need climate-change info ONLY from NASA's website for a science report. Which operator do you use?",
          choices: [
            "\"climate change\"",
            "climate change site:nasa.gov",
            "climate change filetype:pdf",
            "climate change -nasa",
          ],
          correctIndex: 1,
          explanation:
            "The site: operator restricts results to one website. site:nasa.gov searches only NASA's pages.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Turning a vague question into a sharp query",
        body: `Say you're writing a report and wonder: *"Is it true that we only use 10% of our brains?"* Here's how a pro turns that into a precise, trustworthy search, step by step.\n\n**Step 1 — Strip it to keywords.** Drop the filler. Start with: \`10 percent brain myth\`.\n\n**Step 2 — Lock the exact phrase.** Add quotes: \`"10 percent of our brain" myth\`.\n\n**Step 3 — Aim at trustworthy sources.** Add an operator to favor educational sites: \`"10 percent of our brain" myth site:edu\`.\n\n**Step 4 — Credibility scan and cross-check.** Open two or three organic (non-ad) results. For each, note the author or organization, the date, and whether real evidence backs the claim. Here they're from neuroscience departments and agree — conclusion: it's a myth, with solid sources fast.`,
        image: "/images/lessons/dl-3-3.png",
        imageAlt: "Laptop screen showing a vague question rewritten into a short keyword query with quotes and site:edu in the browser search bar",
        callout: {
          label: "Pro tip",
          text: "Build your search in layers: start broad, see what comes back, then add one operator or specific word at a time. Each tweak sharpens your aim instead of starting over.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "The top result is not automatically the truth",
        body: `Here's the part most people get wrong: **results are not all equal, and the #1 result isn't automatically the best.**\n\n• **Sponsored results (ads)** — Companies *pay* to appear at the top, marked "Sponsored" or "Ad." These are advertising, not the most relevant or trustworthy answers. The unpaid results ranked by relevance are called **organic results**.\n• **Ranking ≠ truth** — A page can rank #1 because it's popular or cleverly built to please search engines, not because it's correct. Popular is not the same as accurate.\n• **AI answer boxes** — auto-written summaries some engines show at the top. They're handy, but they can be wrong or out of date — always verify anything important by clicking through to a real, trustworthy source.\n\nBefore you cite anything important, run a quick **credibility scan**: who published it, when was it posted or updated, and does it show real evidence — not just a confident headline.`,
        callout: {
          label: "Myth check",
          text: "The #1 search result is NOT automatically the truest or best. It may be an ad, or simply a popular page. Always glance at WHO published it before trusting it.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Spot the sponsored result",
        body: `Practice the skill from the misconception above. Imagine you search \`part-time job application\` and see five results. The top one has a small green label reading "Ad" next to the URL. The next four don't have that label.\n\n• The labeled result is a **sponsored result** — a company paid for that placement.\n• The next four are **organic results** — ranked by the engine's own relevance system, not payment.\n\nThat doesn't automatically make the ad useless — but it does mean you should treat it the same as you'd treat a billboard: informative, but not automatically the most trustworthy or relevant answer to your question. Always glance for that tiny label before clicking the very first link.`,
        checkIn: {
          prompt: "While searching for summer internships, the top result is labeled 'Sponsored.' What does that tell you?",
          choices: [
            "It is an ad — a company paid to put it there, so it's advertising rather than a ranked-for-relevance answer",
            "It is the most trustworthy and accurate result",
            "It was fact-checked by the search engine",
            "It is the official government result",
          ],
          correctIndex: 0,
          explanation:
            "Sponsored results are paid ads, not results ranked purely by relevance or trustworthiness. The unpaid, relevance-ranked results are called organic results.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Deeper skill",
        title: "Filters, credibility scans, and reading a result before you click",
        body: `Beyond operators typed into the search box, most engines offer **filters** — quick buttons to narrow by **date** (last year, last week), or to switch to **Images**, **News**, **Videos**, or **Maps**. A date filter is gold when you need current info and want to skip outdated pages.\n\n**Teen example:** hunting a part-time job? Try \`"first job" retail [your city] after:2026\`, then tap the engine's **Past year** or **Past month** filter if results still look stale.\n\nBefore you even click, you can often size up a result from the snippet alone: look at the **domain** in the URL preview (a \`.edu\` or \`.gov\` site is a different kind of source than a random blog), check if there's a visible **date**, and glance for signs of an ad label. This "pre-click scan" saves you from wasting time on weak sources — you're gathering evidence before you even commit to opening the page.`,
        image: "/images/lessons/dl-3-4.png",
        imageAlt: "Close-up of a search results page with a domain name, publish date, and a small green Ad label highlighted for comparison",
        callout: {
          label: "Pro tip",
          text: "Scholarship deadlines work the same way as job hunts: date operators plus UI filters beat scrolling through expired links.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Organic results vs. sponsored results vs. AI answer boxes",
        body: `Three things can appear on a results page, and they are not interchangeable.`,
        table: {
          columns: ["", "Organic result", "Sponsored result", "AI answer box"],
          values: [
            ["How it got there", "Ranked by relevance/trust", "A company paid for placement", "Auto-generated summary"],
            ["Reliability", "Varies — still verify", "Advertising, not vetted for accuracy", "Can be wrong or outdated"],
            ["What to do", "Credibility-scan before trusting", "Treat like an ad, not an answer", "Click through to verify"],
          ],
          rowCount: 3,
        },
        callout: {
          label: "Why it matters",
          text: "Treating all three the same is exactly how misleading claims and scams sneak past careful people — you'll dig deeper into spotting false claims in the very next lesson.",
        },
      },
      {
        id: "real-world-trap",
        kicker: "Real-world trap",
        title: "The 'guaranteed scholarship finder' trap",
        body: `A search for \`scholarships for high schoolers\` turns up a slick sponsored ad: "Get matched with $10,000 in scholarships — guaranteed! Just enter your card to unlock results." It looks official and appears right at the top.\n\nThis is a classic trap that costs real students real money: a paid ad that *looks* like a helpful tool but is actually selling something (or worse, phishing for payment info) using the trust people place in top results. Legitimate scholarship searches — through your school counselor, \`.gov\` financial aid sites, or well-known nonprofit databases — never require payment to "unlock" results.\n\n**The fix:** treat any top result asking for money, urgent action, or personal info with extra suspicion, especially if it's labeled "Ad." Scroll to the organic results and cross-check with a \`site:.gov\` or \`site:.edu\` search instead.`,
        callout: {
          label: "Watch out",
          text: "Real financial aid and scholarships almost never require an upfront payment. If a top search result asks you to pay to \"unlock\" opportunities, that's a strong warning sign.",
        },
      },
      {
        id: "habits",
        kicker: "Decision framework",
        title: "The refine loop: homework, scholarships, and jobs",
        body: `Pros don't search once — they run a short loop until the results get useful:\n\n**1. Start with sharp keywords** (nouns + specifics).\n**2. Scan the first page** — who published each result? Skip obvious ads.\n**3. Add one upgrade** — a quote, a \`site:\`, a \`filetype:\`, a year, or a place.\n**4. Repeat** until you have 2–3 solid sources (or the exact form/PDF you need).\n\n**Real scenarios:**\n\n• **Group project research:** \`"civil rights act 1964" site:edu\` beats a vague paragraph of questions.\n• **Scholarship hunt:** \`\"first-generation\" scholarship 2026 filetype:pdf\` or \`site:yourstate.gov scholarship\`.\n• **Internship / first job:** \`\"high school" internship [your city] 2026\` plus a date filter for recent posts.\n\n**Decision shortcut:** If the first page is spammy or off-topic, don't scroll forever — change the query. Scrolling is not refining.`,
        bullets: [
          "Loop: keywords → scan → add one operator/filter → repeat.",
          "Prefer .edu / .gov / known orgs for school and money decisions.",
          "Use filetype:pdf when you need forms, guides, or applications.",
        ],
        callout: {
          label: "Try this week",
          text: "Take one real task (homework question, scholarship, or troubleshooting) and run the refine loop twice — start broad, then add one operator.",
        },
        checkIn: {
          prompt: "Your first search returns spammy, off-topic pages. What should you do, according to the refine loop?",
          choices: [
            "Keep scrolling for another 20 minutes",
            "Give up on the search entirely",
            "Change the query — add or swap a keyword, or add an operator, and search again",
            "Trust the AI answer box instead",
          ],
          correctIndex: 2,
          explanation:
            "Scrolling through bad results is not refining. The loop is: adjust the query with a better keyword or operator, then search again.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on — a quick gut-check",
        body: `Think of the last thing you searched for that took longer than it should have.\n\n• Were your keywords sharp, or closer to a full sentence?\n• Did you notice whether the top result was sponsored or organic?\n\nThere's a full reflection question at the end of this lesson. For now, just notice: the gap between Devon's twenty-minute search and the classmate's thirty-second search was never about intelligence — it was five extra words and one operator.`,
        callout: {
          label: "Reflect",
          text: "The very next time you search something, try adding just one operator on your first attempt. Notice how much that one small habit changes your results.",
        },
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "Case study: finding a legitimate summer internship fast",
        body: `A junior named Alex wants a summer internship but keeps finding outdated postings and sketchy "opportunities" that ask for money upfront. Here's how Alex fixed the search using this lesson's tools:\n\n**1. Sharpen keywords:** Instead of \`jobs for teens near me summer\`, Alex tries \`"high school" summer internship [city name] 2026\`.\n\n**2. Add a date filter:** Alex clicks "Past month" so only recent postings show up — no more expired listings from two years ago.\n\n**3. Scan for sponsored labels:** Two "Ad" results promise "$500/day, no experience, just pay a $20 registration fee." Alex recognizes the real-world trap from this lesson and skips them entirely.\n\n**4. Trust site: for known institutions:** Alex adds \`site:linkedin.com\` and separately checks the Chamber of Commerce's \`.org\` site for a local verified listing board.\n\n**Result:** In under five minutes, Alex has three legitimate leads and zero scams — using nothing but sharper keywords, one date filter, and a quick sponsored-result scan.`,
        callout: {
          label: "Pro tip",
          text: "Any \"opportunity\" that asks you to pay money before you're even hired is a scam, no matter how official the ad looks or how high it ranks.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before the full knowledge check",
        body: `Quick self-test before the graded questions — can you explain, in one sentence each?\n\n• The three steps a search engine already did before you even typed (crawl, index, rank)?\n• Why short, sharp keywords beat long sentences?\n• At least two search operators and what each one does?\n• Why the #1 result isn't automatically the most trustworthy?\n\nIf all four feel solid, you're ready for the graded Knowledge Check.`,
        checkIn: {
          prompt: "What is the single biggest upgrade you can make to almost any search?",
          choices: [
            "Always clicking the very first result",
            "Avoiding search engines entirely",
            "Typing your question as a full, polite sentence",
            "Using sharp, specific keywords — and refining with an operator if the first try misses",
          ],
          correctIndex: 3,
          explanation:
            "Sharp keywords, refined with an operator when needed, is the single highest-leverage search skill — it's the difference between Devon's 20-minute search and a 30-second one.",
        },
      },
      {
        id: "search-red-flags",
        kicker: "Red flags",
        title: "Search results that should make you pause",
        body: `Even a great search can surface results that look helpful but aren't. Watch for these red flags before you click or cite:\n\n• **No date on a time-sensitive topic** — scholarship rules, health advice, and tech tutorials go stale fast. Undated pages are a gamble.\n• **The URL doesn't match the claim** — a site called \`official-scholarship-win.xyz\` is not the same as the real organization's domain.\n• **Every result says the exact same shocking thing** — that can mean a rumor is echoing, not that it's verified.\n• **Only one obscure blog has the answer** — if nobody else credible mentions it, treat it as unconfirmed until you check elsewhere.\n\nWhen you spot a red flag, don't throw away the whole search — refine it. Add a site: operator, try a more official keyword, or open a second tab and **read laterally** (check what other sources say about the same claim).`,
        callout: {
          label: "Try this week",
          text: "Next time a result feels 'too perfect,' open one more tab and search the claim itself — not just the headline. Thirty extra seconds is cheap insurance.",
        },
        checkIn: {
          prompt: "You search 'free laptop for every high school senior 2026' and every top result is a blog you've never heard of, with no links to an official program. What should you do?",
          choices: [
            "Share it immediately — if it's trending, it must be real",
            "Assume search engines only show true results",
            "Treat it as unverified and look for an official source (school, government, or the actual company) before believing or sharing",
            "Stop using search engines entirely",
          ],
          correctIndex: 2,
          explanation:
            "Echoing blogs without official sources is a classic misinformation pattern. The smart move is to verify with a credible, official source before you believe or pass it on.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've gone from "type and hope" to "search with intent." Quick recap:\n\n• Search engines **crawl**, **index**, and **rank** pages ahead of time, so your **query** is a fast lookup in a catalog.\n• Strong **keywords** beat long sentences — keep the specifics, drop the filler, and **refine**.\n• **Operators** like \`"exact phrase"\`, \`-word\`, \`site:\`, \`filetype:\`, and \`after:\`/\`before:\` give you precise control.\n• Spot **sponsored** (ad) results, scan top links for author/date/evidence, and verify AI answer boxes.\n• Use the **refine loop** for school, scholarships, jobs, and troubleshooting — and never pay to "unlock" a scholarship or job lead.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then try crafting a sharp query of your own.`,
      },
    ],
  },
  bigIdeas: [
    "Search engines **crawl**, **index**, and **rank** pages so your **query** is a fast catalog lookup.",
    "Sharp **keywords** and **operators** (\`\"\"\`, \`-\`, \`site:\`, \`filetype:\`) beat long, chatty searches.",
    "The top result isn't automatically true — watch for **sponsored** ads and check who published it.",
    "Run the **refine loop** and never pay upfront for a scholarship, job, or opportunity you found via a search ad.",
  ],
  keyTerms: [
    { term: "Search engine", definition: "A tool (like Google or Bing) that finds web pages matching your search words." },
    { term: "Keyword", definition: "A word or short phrase you give a search engine to describe what you're looking for." },
    { term: "Query", definition: "The full set of words and operators you type into the search box." },
    { term: "Search operator", definition: "A special command (like quotes, -word, site:, or filetype:) that controls and narrows your results." },
    { term: "Index", definition: "The giant organized catalog a search engine builds from crawling the web, used to answer searches fast." },
    { term: "Sponsored result", definition: "A paid ad shown at the top of results, marked 'Ad' or 'Sponsored' — not ranked purely by relevance." },
  ],
  realWorld:
    "Researching a project, troubleshooting why an app crashes, finding a scholarship PDF, or locating a college portal help page all get faster with the same moves: precise keywords plus an operator like \`site:\` or \`filetype:pdf\`.",
  quiz: [
    {
      id: "q1",
      question: "You're researching for a group project and need answers fast. What are the three main steps a search engine already did so results appear instantly?",
      choices: [
        "Save, sync, and back up",
        "Crawl, index, and rank",
        "Type, click, and scroll",
        "Download, install, and update",
      ],
      correctIndex: 1,
      explanation:
        "Search engines crawl the web with bots, store what they find in an index, and then rank matching pages when you search. The index is built ahead of time, which is why results appear instantly.",
    },
    {
      id: "q2",
      question: "Your phone overheats during a long gaming session and you want causes — not a chatty rant. Which search is most likely to give the best results?",
      choices: [
        "phone overheating gaming causes",
        "why does my phone get so hot when I play games for hours is that bad for it",
        "please help me my phone is hot",
        "phone",
      ],
      correctIndex: 0,
      explanation:
        "Strong keywords keep the important nouns and specifics and drop the filler. The long chatty sentence buries the real keywords, and a single vague word like 'phone' is too broad.",
    },
    {
      id: "q3",
      question: "You need climate-change info ONLY from NASA's website for a science report. Which operator do you use?",
      choices: [
        "\"climate change\"",
        "climate change site:nasa.gov",
        "climate change filetype:pdf",
        "climate change -nasa",
      ],
      correctIndex: 1,
      explanation:
        "The site: operator restricts results to one website. site:nasa.gov searches only NASA's pages. Quotes match an exact phrase, -word excludes, and filetype: finds a file type.",
    },
    {
      id: "q4",
      question: "While searching for summer internships, a result at the very top is labeled 'Sponsored.' What does that tell you?",
      choices: [
        "It is the official government result",
        "It was fact-checked by the search engine",
        "It is the most trustworthy and accurate result",
        "It is an ad — a company paid to put it there, so it's advertising rather than a ranked-for-relevance answer",
      ],
      correctIndex: 3,
      explanation:
        "Sponsored results are paid ads, not results ranked purely by relevance or trustworthiness. The unpaid, relevance-ranked results are called organic results.",
    },
    {
      id: "q5",
      question: "A scholarship search shows a #1 organic result from a site you've never heard of. Which statement is true?",
      choices: [
        "It is always the most accurate and correct answer",
        "It is guaranteed to be from a government source",
        "It can be popular or well-optimized without being the most accurate, so you should check who published it",
        "It is always older than the other results",
      ],
      correctIndex: 2,
      explanation:
        "Ranking high doesn't guarantee truth — a page can rank well by being popular or well-optimized. Popular is not the same as accurate, so always check who published it.",
    },
    {
      id: "q6",
      question: "A sponsored ad promises 'guaranteed $10,000 in scholarships' if you enter a card number to 'unlock results.' What should you do?",
      choices: [
        "Treat it as a major red flag — legitimate financial aid almost never requires upfront payment",
        "Enter the card info immediately since it's at the top of the results",
        "Trust it because it looks official",
        "Assume all sponsored results are scams and never click any ad",
      ],
      correctIndex: 0,
      explanation:
        "Real scholarships and financial aid don't charge you to 'unlock' opportunities. A paid ad demanding money upfront is a classic scam pattern.",
    },
    {
      id: "q7",
      question: "Your first search returns spammy, off-topic pages. According to the refine loop, what should you do?",
      choices: [
        "Adjust the query — swap or add a keyword, or add an operator — then search again",
        "Keep scrolling through many pages of results",
        "Only trust the AI-generated answer box",
        "Give up and assume there's no good answer",
      ],
      correctIndex: 0,
      explanation:
        "Scrolling endlessly is not the same as refining. The refine loop means adjusting your keywords or adding an operator and trying again.",
    },
    {
      id: "q8",
      question: "In the internship case study, which combination of habits helped Alex find legitimate leads fast?",
      choices: [
        "Only ever clicking the very first search result",
        "Using a vague search and paying a registration fee for a promising ad",
        "Searching once and accepting whatever appeared first",
        "Sharper keywords, a recent-date filter, skipping sponsored 'pay-to-start' ads, and using site: for trusted platforms",
      ],
      correctIndex: 3,
      explanation:
        "Alex combined sharp keywords, a date filter for recent postings, a scan for sponsored scam ads, and the site: operator to focus on trustworthy platforms.",
    },
  ],
  reflection: {
    prompt:
      "Take a question you searched recently. Rewrite it as sharp keywords plus one search operator that would have gotten you a better, more trustworthy result.",
    placeholder: "Example: Instead of 'good books for teens about space', try 'space novels teens site:goodreads.com'…",
  },
};
