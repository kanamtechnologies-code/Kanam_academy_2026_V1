import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const digitalLesson3: AILessonConfig = {
  id: "dl-3",
  title: "3. How a Search Gets to You",
  goal: "See how a search travels (your device, Wi-Fi, routers, a server) — then pick a result you can actually trust.",
  xpReward: 150,
  badge: "Search Smart",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/2",
  nextHref: "/learn/digital/4",
  instructorScript: `**Coach's note**
Today's lesson: **How a Search Gets to You**.

**Goal:** See how a search travels (your device, Wi-Fi, routers, a server) — then pick a result you can actually trust.

**How to facilitate**
1. Warm-up: ask "You type a search for a summer internship and tap Go. What machines do you think that request touches before results show up?" Keep it concrete. Do not start with a map of the internet.
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway — the search has a route; the top result is not automatically true.

**Watch for:** calling everything "the Wi-Fi" or treating the first result as the official answer. Push students to say client, router, server, domain, or a source they can open.`,
  lessonModule: {
    durationLabel: "~25 min lesson",
    sections: [
      {
        id: "start",
        kicker: "Start here",
        title: "A search has a route — then you have a choice",
        body: `You type a search for a summer internship and tap Go. It feels instant.\n\nIt is not magic. Your **device** sends a request. It hops across **Wi-Fi** and **routers** to a **server**. Results come back ranked. Then you still have to pick one you can trust.\n\nToday you follow that path — and you learn how to search so the useful page is easier to find.`,
        image: "/images/lessons/dl-3.png",
        imageAlt: "Browser search connected through a network",
        callout: { label: "Two jobs", text: "The network delivers the page. You decide if the page is worth using." },
      },
      {
        id: "network",
        kicker: "The path",
        title: "Your device asks. A server answers.",
        body: `A **network** connects devices so they can send data back and forth.\n\nYour Chromebook is usually the **client**. It asks for a page or a file. A **server** is a computer (or a service) that answers. The data travels in small packets — not as one invisible blob.\n\nThe **internet** is a network of networks. The **web** is one thing that runs on it.`,
      },
      {
        id: "router",
        kicker: "Routers",
        title: "A router just forwards the next hop",
        body: `A **router** sends packets toward where they are going. School Wi-Fi hits a local router first. That router is not "the internet." Other routers pick up the packets after that.\n\nThe router does not read your scholarship essay. It only needs an address — enough to hand the packet to the next useful machine.`,
        checkIn: check(
          "What does a router mainly do?",
          [
            "Rank search results",
            "Write your document",
            "Forward data toward where it is going",
            "Store every web page",
          ],
          2,
          "Routers move packets. Apps and servers handle the content.",
        ),
      },
      {
        id: "address",
        kicker: "Names and addresses",
        title: "A domain is a name. A URL is a full address.",
        body: `A **domain** is a name people can read, like \`studentaid.gov\`. Behind the scenes, that name gets turned into numbers so devices can find the machine.\n\nA **URL** is the full web address — the domain plus the path to a specific page.\n\nA logo, an ad, or a screenshot can fake a familiar name. For a college app or aid form, look at the domain in the address bar. Do not trust the picture of the site.`,
        image: "/images/lessons/dl-3-2.png",
        imageAlt: "Browser address bar showing a domain and path",
      },
      {
        id: "server",
        kicker: "Servers",
        title: "The page loaded. That is not the same as true.",
        body: `A server can send you a university page, a news story, a social post, or an ad. If it loads, the network did its job.\n\nThat does not mean the claim is right. A polished page can still be old, one-sided, or a scam.\n\n"Did it arrive?" and "Can I trust it?" are two different questions.`,
      },
      {
        id: "diagnose",
        kicker: "When it fails",
        title: "Use what still works to find the break",
        body: `One site fails, other sites load? Check that site or that browser before you blame Wi-Fi.\nEvery device on this Wi-Fi is down, but phones on cellular work? Check the local network or its connection out.\nOnly your device fails? Check your settings.\n\nCompare what works. Then change one thing.`,
        checkIn: check(
          "Every device on school Wi-Fi cannot load sites. Phones on cellular data can. What should you check first?",
          [
            "One student's browser",
            "The school's Wi-Fi or its connection out to the internet",
            "The keyboard",
            "Every server on the internet",
          ],
          1,
          "If everyone on the same Wi-Fi is stuck, start with that network — not the whole internet.",
        ),
      },
      {
        id: "search",
        kicker: "Search",
        title: "Turn the task into a better query",
        body: `Search engines already crawled and ranked pages before you typed. Your job is to give them a sharper ask.\n\n\`high school summer internship Chicago 2026\` beats "good jobs for teens." Add the place, the year, and the kind of role.\n\nSearch is a loop. Try a query. Look at what came back. Change the words if the results are noisy or stale.`,
      },
      {
        id: "operators",
        kicker: "Sharper search",
        title: "Quotes, site:, and filters have a job",
        body: `Quotes hunt an exact phrase. \`site:\` stays on one domain. \`filetype:pdf\` finds documents. A date filter drops last year's deadline.\n\nThese tools help you land on the right page. They do not prove the page is honest.\n\nFor aid rules, \`site:studentaid.gov\` has a reason. For a college's deadline, use that college's own domain.`,
        image: "/images/lessons/dl-3-3.png",
        imageAlt: "Search query using site and date filters",
        checkIn: check(
          "You need this year's application deadline from one college. Which search fits best?",
          [
            "college deadline -college",
            "free scholarship now",
            "college deadline",
            "\"application deadline\" site:college.edu",
          ],
          3,
          "An exact phrase plus the college's domain aims at the page that actually sets the date.",
        ),
      },
      {
        id: "ranking",
        kicker: "Results",
        title: "First place is not a trust score",
        body: `Results can be ads, official pages, old posts, personal blogs, or an AI summary. Top of the list can mean someone paid, the page is popular, or the words match — not that it is true.\n\nBefore you use a result, ask: who published this? When was it updated? What proof do they give? Does it even answer your question?`,
      },
      {
        id: "ai-overview",
        kicker: "AI in search",
        title: "Treat an AI overview as a draft",
        body: `Many search pages now put an **AI overview** above the links. It can restate the question and sound finished. It is still a generated summary. It may skip the date, invent a citation, mix up two schools, or miss the official page you need.\n\nUse it like a classmate's recap: notice the claim, then open a named source. For a deadline, an aid rule, or an internship, click through to the college, the employer, or a government domain. If the overview gives you nothing you can open, treat the answer as unverified.\n\nHow models work lives in the AI Literacy track. Here the skill is simpler: **an AI answer is a source with no default citations.**`,
        checkIn: check(
          "A search AI overview lists a scholarship deadline but shows no official link. What should you do next?",
          [
            "Copy the date into your application because the overview sounds complete",
            "Open an official aid or college site and confirm the date there",
            "Ask the chatbot to rewrite the answer in a more confident tone",
            "Assume AI overviews are checked before they appear",
          ],
          1,
          "A fluent summary is not a citation. Dates that matter need an official page you can open.",
        ),
      },
      {
        id: "lateral",
        kicker: "Check it",
        title: "Do not stop at the first result",
        body: `For a scholarship claim, search the claim and the organization in two tabs. For an internship, open the employer's own careers page and compare it with the listing. For research, look for someone who actually knows the topic, then follow a key claim to a source you can open.\n\nYou are not collecting links. You are picking what to verify.`,
        checkIn: check(
          "A sponsored result promises a guaranteed scholarship if you pay a fee up front. What should you do?",
          [
            "Share it right away so friends do not miss it",
            "Assume every ad is run by the government",
            "Pay because it ranks first",
            "Treat it as a claim — check official aid sites and whether the group is real",
          ],
          3,
          "Sponsored means someone paid to be there. Money claims need a source you can check.",
        ),
      },
      {
        id: "case",
        kicker: "Case study",
        title: "Find an internship you can actually apply to",
        body: `Start with a specific query and a recent date filter. Look for an employer, a school, a government page, or a known nonprofit. Open that group's own careers page. Check who can apply, the deadline, and the contact info.\n\nSlower than tapping an ad. A lot less likely to chase a listing that expired — or was never real.`,
        image: "/images/lessons/dl-3-4.png",
        imageAlt: "Search results evaluated for source and date",
      },
      {
        id: "privacy",
        kicker: "On the network",
        title: "The path also leaves a trail",
        body: `Networks make search, forms, and group docs possible. They also record requests, accounts, and what you share.\n\nUse official domains for anything with your name, your Social Security number, or a password. Do not type personal information into a random link. A lock icon means the connection is encrypted. It does not prove the site is the real college.`,
      },
      {
        id: "routine",
        kicker: "The routine",
        title: "Path, query, then check",
        body: `First, know the path: device, local network, routers, server.\nThen search on purpose: better words, a domain or a date when it helps, then look at who published the result.\n\nIf the result is about college, money, health, or a job — raise the bar. Open the official page.`,
      },
      {
        id: "ready",
        kicker: "Remember this",
        title: "The network delivers. You pick the source.",
        body: `Your device asks. **Routers** forward packets. A **server** answers. A **domain** and a **URL** help the request land in the right place.\n\nDelivery is not trust. Use a sharper query, then open a page you can actually check.`,
        checkIn: check(
          "What makes a search more than just typing a few words?",
          [
            "You always use the longest query",
            "You only search one site, every time",
            "You add useful limits, check who published it, and confirm it if the stakes are high",
            "You trust the top result",
          ],
          2,
          "Better words get you closer. A source you can open is what you use.",
        ),
      },
    ],
  },
  bigIdeas: [
    "Your device (**client**) asks. **Routers** forward packets. A **server** answers.",
    "A **domain** and a **URL** help the request land — but a loaded page is not automatically true.",
    "Use precise queries, operators, and filters to get closer to the right page.",
    "First place can be an ad or a popular page. Check who published it, the date, and a source you can open.",
    "An **AI overview** is a generated draft — confirm dates and rules on an official page.",
  ],
  keyTerms: [
    { term: "Router", definition: "A device that forwards packets toward where they are going." },
    { term: "Server", definition: "A computer or service that answers requests from other devices." },
    { term: "Domain", definition: "A name people can read, like a school or organization's web address." },
    { term: "URL", definition: "The full web address — usually a domain plus a path to a page." },
    { term: "Search operator", definition: "A tool like site: or quotes that narrows results." },
    { term: "Sponsored result", definition: "A paid spot in the results. Paid is not the same as official or true." },
    { term: "AI overview", definition: "A generated search summary. Useful as a draft. Not proof." },
  ],
  realWorld: "A college deadline search has two parts: the request has to reach the right site, and you have to confirm the date on that college's own page.",
  quiz: [
    {
      id: "q1",
      question: "What is a router's main job?",
      choices: [
        "Rank every webpage",
        "Write documents",
        "Create scholarship rules",
        "Forward packets toward where they are going",
      ],
      correctIndex: 3,
      explanation: "Routers move packets using addressing. They do not rank or write the page.",
    },
    {
      id: "q2",
      question: "Why look at the domain on a college application page?",
      choices: [
        "The domain sets the screen size",
        "A matching domain means every claim is true",
        "It helps you see which organization runs the site",
        "It replaces a password",
      ],
      correctIndex: 2,
      explanation: "The domain tells you who owns the site. You still have to read the page.",
    },
    {
      id: "q3",
      question: "All school Wi-Fi devices fail. Phones on cellular work. What should you check?",
      choices: [
        "Every internet server",
        "The student's keyboard",
        "One app only",
        "The local network or its connection out",
      ],
      correctIndex: 3,
      explanation: "Everyone on the same Wi-Fi is stuck. Start there.",
    },
    {
      id: "q4",
      question: "Which search is best for a college's current deadline?",
      choices: [
        "college deadline -college",
        "college deadline",
        "deadline free money",
        "\"application deadline\" site:college.edu",
      ],
      correctIndex: 3,
      explanation: "An exact phrase plus the college's domain aims at the official page.",
    },
    {
      id: "q5",
      question: "A result is first and labeled Sponsored. What can you conclude?",
      choices: [
        "Someone paid for that spot — you still have to check the claim",
        "It is an official source",
        "It is false",
        "It was fact-checked",
      ],
      correctIndex: 0,
      explanation: "Sponsored means paid placement. It does not prove or disprove the claim.",
    },
    {
      id: "q6",
      question: "You find a promising internship listing. What should you do next?",
      choices: [
        "Confirm the details on the employer's official site and compare sources",
        "Ignore the dates",
        "Submit personal information right away",
        "Trust the snippet under the link",
      ],
      correctIndex: 0,
      explanation: "Open the employer's own page. Listings go stale — and some were never real.",
    },
    {
      id: "q7",
      question: "A search AI overview states a college deadline with no official link. What should you do next?",
      choices: [
        "Use the date because the overview is at the top of the page",
        "Ask the overview to sound more certain",
        "Open the college's own site and confirm the dated announcement",
        "Assume the college reviewed the generated summary",
      ],
      correctIndex: 2,
      explanation: "An AI overview is a draft. Deadlines need an official page you can inspect.",
    },
  ],
};
