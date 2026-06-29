import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson3: AILessonConfig = {
  id: "dl-3",
  title: "3. Search Like a Pro",
  goal: "Find reliable information quickly using strong keywords, search operators, and filters — and know why the top result isn't always the best.",
  xpReward: 150,
  badge: "🔎 Search Sleuth",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/2",
  nextHref: "/learn/digital/4",
  lessonModule: {
    durationLabel: "~9 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Everyone can type words into a search box. But there's a huge gap between *searching* and *searching like a pro* — the difference between scrolling through junk for ten minutes and finding the exact answer in ten seconds.\n\nHere's our roadmap:\n\n• **How search engines actually work** — crawl, index, rank, in plain English.\n• **Choosing powerful keywords** — why fewer, sharper words beat long sentences.\n• **Search operators** — secret commands like quotes, \`-\`, \`site:\`, and \`filetype:\`.\n• **Filters and trust** — spotting ads, judging results, and not believing the #1 link automatically.\n\nThis skill pays off everywhere: research projects, debugging code, finding a part-time job, or just settling an argument with facts.`,
        image: "/images/lessons/dl-3.png",
        imageAlt: "A magnifying glass over a search bar with filtered, sorted results behind it",
        callout: {
          label: "Why it matters",
          text: "In school and at work, the people who find good answers fast look brilliant — not because they know more, but because they search smarter. It's a learnable superpower.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "The search vocabulary, made simple",
        body: `A few words come up again and again when we talk about searching. Here they are in plain English so nothing trips you up later.\n\n• A **search engine** is the tool that finds web pages for you — Google, Bing, and DuckDuckGo are all search engines.\n• A **keyword** is one of the important words you type to describe what you want (like \`tornado\` or \`overheating\`).\n• A **query** is the whole thing you type into the box — all your keywords and any special commands together.\n• A **result** is one of the links the search engine shows you back. The list of them is your "search results."\n\nThat's the whole vocabulary. Now let's see what happens behind the scenes when you hit Enter.`,
        callout: {
          label: "Pro tip",
          text: "There's no \"wrong\" search — if your first try misses, just tweak the words and try again. Good searchers rarely nail it on attempt one; they adjust quickly. Searching is a back-and-forth, not a single guess.",
        },
      },
      {
        id: "how-search-works",
        kicker: "Behind the box",
        title: "How a search engine finds anything in a split second",
        body: `When you search, the engine isn't scanning the whole internet right then — that would take forever. It already did the hard work ahead of time, in three steps:\n\n• **Crawl** — Automated programs (often called "spiders" or "bots" — software that runs by itself) roam the web, following links from page to page and reading what's there.\n• **Index** — The engine stores what it found in a giant, organized catalog called the **index**. Think of the index at the back of a textbook that lists which page every topic is on — same idea, just enormous.\n• **Rank** — When you type a **query** (your search words), the engine instantly looks in its index and **ranks** the matching pages, meaning it puts them in order, trying to show the most relevant and trustworthy ones first.\n\nSo a search isn't a live trip across the internet — it's a lightning-fast lookup in a pre-built catalog. That's why results appear the instant you hit enter.`,
        callout: {
          label: "Pro tip",
          text: "Because results come from an index that was built earlier, brand-new pages can take time to show up. If you need the very latest news, use the engine's \"News\" tab or a date filter instead of a plain search.",
        },
      },
      {
        id: "keywords",
        kicker: "The big skill",
        title: "Pick sharp keywords, not full sentences",
        body: `A **keyword** is a word or short phrase you give the search engine to describe what you want. The single biggest upgrade to your searching is choosing keywords carefully.\n\nThink of it like giving clues to a **librarian**. You wouldn't say "Hi, I'm wondering if you could possibly help me find something about, you know, the weather and how it sometimes makes those big spinning storms." You'd say "tornado formation." Clear nouns and specifics get you to the right shelf instantly.\n\nCompare these two searches for the same goal:\n\n• Weak: \`why does my phone get hot when I play games for a long time is that bad\`\n• Strong: \`phone overheating gaming causes\`\n\nThe strong version keeps the *important* words (the nouns and specifics) and drops the filler ("why does my," "is that bad"). If your first results are off, **refine** them — that just means tweak your search: add a more specific word, swap a vague word for a precise one, or remove a word that's pulling in the wrong stuff.`,
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
      },
      {
        id: "operators",
        kicker: "Power commands",
        title: "Search operators: tiny symbols, huge control",
        body: `**Search operators** are special commands you add to a query to control your results precisely. They're like the **filters on a shopping site** that let you narrow down to exactly the size, color, and price you want. Here are the most useful ones — try them out, they really work:\n\n• **Quotes** \`"exact phrase"\` — find that phrase exactly, in that order. Searching \`"to be or not to be"\` finds that exact line, not pages with those words scattered around.\n• **Minus** \`-word\` — *exclude* a word (leave it out). \`jaguar -car\` finds the animal, not the vehicle.\n• **site:** \`site:domain\` — search within one website only. (A *domain* is a site's address, like \`nasa.gov\`.) \`climate change site:nasa.gov\` searches only NASA's site.\n• **filetype:** \`filetype:pdf\` — find a specific file type. \`study guide filetype:pdf\` finds downloadable PDFs.\n\nYou can even combine them. \`"photosynthesis" site:edu filetype:pdf\` hunts for PDFs about that exact term on educational sites (\`.edu\` sites are usually schools and universities). That's the kind of search that makes a research project feel easy.`,
        image: "/images/lessons/dl-3-2.png",
        imageAlt: "Search operator commands shown as control panel toggles: quotation marks, a minus sign, a site filter, and a filetype filter narrowing a list of results",
        table: {
          columns: ["Operator", "What it does", "Example"],
          values: [
            ["\"exact phrase\"", "Matches the words exactly, in order", "\"first day of school\""],
            ["-word", "Excludes results with that word", "apple -fruit"],
            ["site:", "Searches only one website", "essay tips site:bbc.co.uk"],
            ["filetype:", "Finds a specific file type", "resume template filetype:pdf"],
          ],
          rowCount: 4,
        },
        callout: {
          label: "Pro tip",
          text: "Use site: to search a website that has a weak built-in search bar. Many sites are far easier to search through a search engine than with their own search box.",
        },
      },
      {
        id: "filters-trust",
        kicker: "Read results wisely",
        title: "Filters, ads, and why the top result isn't gospel",
        body: `Beyond operators, most engines offer **filters** — quick buttons to narrow by **date** (last year, last week), or to switch to **Images**, **News**, **Videos**, or **Maps**. A date filter is gold when you need current info and want to skip outdated pages.\n\nNow, the part most people get wrong: **the results are not all equal, and the top one isn't automatically the best.** Two big things to watch for:\n\n• **Sponsored results (ads)** — Companies *pay* to appear at the top. They're marked with a small label like "Sponsored" or "Ad." These are advertising, not the most relevant or trustworthy answers. The unpaid results ranked purely by relevance are called **organic results**.\n• **Ranking ≠ truth** — A page can rank #1 because it's popular or cleverly built to please search engines, not because it's correct. Popular is not the same as accurate.\n\nAnd be careful with **AI answer boxes** — the auto-written summaries some engines show at the very top. They're handy, but they can be wrong or out of date — always verify anything important by clicking through to a real, trustworthy source.`,
        callout: {
          label: "Myth check",
          text: "The #1 search result is NOT automatically the truest or best. It may be an ad, or simply a popular page. Always glance at WHO published it before trusting it.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Turning a vague question into a sharp query",
        body: `Say you're writing a report and wonder: *"Is it true that we only use 10% of our brains?"* Here's how a pro turns that into a precise, trustworthy search, step by step.\n\n**Step 1 — Strip it to keywords.** Drop the filler. The core idea is the "10% of the brain" myth. Start with: \`10 percent brain myth\`.\n\n**Step 2 — Lock the exact phrase.** To make sure results are about this specific claim, add quotes: \`"10 percent of our brain" myth\`.\n\n**Step 3 — Aim at trustworthy sources.** Add an operator to favor educational or science sites: \`"10 percent of our brain" myth site:edu\`. Now you're searching universities, not random blogs.\n\n**Step 4 — Check who's talking and cross-check.** Open a couple of the organic (non-ad) results, notice they're from neuroscience departments, and confirm they agree. Conclusion: it's a myth — and you found solid sources fast. (You'll go deeper on judging sources in the next lesson.)`,
        image: "/images/lessons/dl-3-3.png",
        imageAlt: "A vague chatty question being trimmed step by step into a short keyword query with quotes and a site filter, pointing to trustworthy results",
        callout: {
          label: "Pro tip",
          text: "Build your search in layers: start broad, see what comes back, then add one operator or specific word at a time. Each tweak sharpens your aim instead of starting over.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've gone from "type and hope" to "search with intent." Quick recap:\n\n• Search engines **crawl**, **index**, and **rank** pages ahead of time, so your **query** is a fast lookup in a catalog.\n• Strong **keywords** beat long sentences — keep the specifics, drop the filler, and **refine**.\n• **Operators** like \`"exact phrase"\`, \`-word\`, \`site:\`, and \`filetype:\` give you precise control.\n• Spot **sponsored** (ad) results, remember the top link isn't automatically true, and verify AI answer boxes.\n\nWhen you're ready, switch to the **Knowledge check**, then try crafting a sharp query of your own.`,
      },
    ],
  },
  bigIdeas: [
    "Search engines **crawl**, **index**, and **rank** pages so your **query** is a fast catalog lookup.",
    "Sharp **keywords** and **operators** (\`\"\"\`, \`-\`, \`site:\`, \`filetype:\`) beat long, chatty searches.",
    "The top result isn't automatically true — watch for **sponsored** ads and check who published it.",
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
    "Researching a project, troubleshooting why an app crashes, or finding a downloadable application form all get faster with the same moves: precise keywords plus an operator like \`site:\` or \`filetype:pdf\`.",
  quiz: [
    {
      id: "q1",
      question: "What are the three main steps a search engine does to answer your searches so quickly?",
      choices: [
        "Download, install, and update",
        "Crawl, index, and rank",
        "Save, sync, and back up",
        "Type, click, and scroll",
      ],
      correctIndex: 1,
      explanation:
        "Search engines crawl the web with bots, store what they find in an index, and then rank matching pages when you search. The index is built ahead of time, which is why results appear instantly.",
    },
    {
      id: "q2",
      question: "Which search is most likely to give you the best results?",
      choices: [
        "why does my phone get so hot when I play games for hours is that bad for it",
        "phone overheating gaming causes",
        "phone",
        "please help me my phone is hot",
      ],
      correctIndex: 1,
      explanation:
        "Strong keywords keep the important nouns and specifics and drop the filler. The long chatty sentence buries the real keywords, and a single vague word like 'phone' is too broad.",
    },
    {
      id: "q3",
      question: "You want results ONLY from NASA's website about climate change. Which operator do you use?",
      choices: [
        "\"climate change\"",
        "climate change -nasa",
        "climate change site:nasa.gov",
        "climate change filetype:pdf",
      ],
      correctIndex: 2,
      explanation:
        "The site: operator restricts results to one website. site:nasa.gov searches only NASA's pages. Quotes match an exact phrase, -word excludes, and filetype: finds a file type.",
    },
    {
      id: "q4",
      question: "A result at the very top is labeled 'Sponsored.' What does that tell you?",
      choices: [
        "It is the most trustworthy and accurate result",
        "It is an ad — a company paid to put it there, so it's advertising rather than a ranked-for-relevance answer",
        "It is the official government result",
        "It was fact-checked by the search engine",
      ],
      correctIndex: 1,
      explanation:
        "Sponsored results are paid ads, not results ranked purely by relevance or trustworthiness. The unpaid, relevance-ranked results are called organic results.",
    },
    {
      id: "q5",
      question: "Which statement is true about the #1 (top) organic search result?",
      choices: [
        "It is always the most accurate and correct answer",
        "It can be popular or well-optimized without being the most accurate, so you should check who published it",
        "It is guaranteed to be from a government source",
        "It is always older than the other results",
      ],
      correctIndex: 1,
      explanation:
        "Ranking high doesn't guarantee truth — a page can rank well by being popular or well-optimized. Popular is not the same as accurate, so always check who published it.",
    },
  ],
  reflection: {
    prompt:
      "Take a question you searched recently. Rewrite it as sharp keywords plus one search operator that would have gotten you a better, more trustworthy result.",
    placeholder: "Example: Instead of 'good books for teens about space', try 'space novels teens site:goodreads.com'…",
  },
};
