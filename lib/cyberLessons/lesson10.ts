import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson10: AILessonConfig = {
  id: "cs-10",
  title: "10. HTTPS, Certificates & Trust",
  goal: "Explain HTTP vs HTTPS, what certificates and certificate authorities do in simple terms, what the padlock means (and what it doesn't), and why HTTPS alone isn't enough against every threat.",
  xpReward: 500,
  badge: "Trust Verifier",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/9",
  nextHref: "/learn/cyber/11",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `That little padlock in your browser is one of the most important security signals online — and one of the most misunderstood. Today you'll learn what **HTTPS**, **certificates**, and **trust** actually mean from a defender's point of view.\n\nHere's our roadmap:\n\n• **HTTP vs HTTPS** — plain vs protected web traffic.\n• **Certificates** — digital ID cards for websites.\n• **Certificate Authorities (CAs)** — who vouch for those IDs.\n• **What the padlock means** — and what it never promised.\n• **MITM awareness** — why attackers want to sit in the middle.\n• **When padlock isn't enough** — phishing pages can have HTTPS too.\n\nYou'll leave able to read the padlock like a defender, not like a superstition.`,
        callout: {
          label: "Why it matters",
          text: "Scammers love people who think \"padlock = safe forever.\" Knowing the real meaning helps you spot fake login pages that still show HTTPS.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Trust words in plain English",
        body: `• **HTTP** — the basic language browsers use to request web pages. By itself, it sends data in a form that can be read if intercepted.\n• **HTTPS** — HTTP plus encryption and identity checks (the \"S\" is for Secure).\n• **Certificate** — a digital file that says \"this public key belongs to this website,\" signed by a trusted party.\n• **Certificate Authority (CA)** — an organization browsers trust to vouch for website certificates.\n• **Padlock** — the browser UI hint that you're on HTTPS with a certificate the browser accepts.\n• **Man-in-the-middle (MITM)** — when someone secretly sits between you and the real site, trying to read or alter traffic.\n\nKeep these handy — the rest of the lesson is just these ideas in action.`,
        callout: {
          label: "Pro tip",
          text: "Always check the address bar URL, not just the padlock. HTTPS protects the *connection* to whatever site you're on — including a fake one.",
        },
      },
      {
        id: "http-https",
        kicker: "The big idea",
        title: "HTTP is open; HTTPS encrypts the connection",
        body: `**HTTP** is like sending a postcard: the mail carriers (and anyone peeking along the path) can read it. On public Wi-Fi, that matters a lot for logins and personal data.\n\n**HTTPS** is like putting that postcard in a sealed, locked envelope *and* checking you're mailing the right recipient. Your browser and the website set up encryption so eavesdroppers see ciphertext, not your password or form fields.\n\nModern browsers warn loudly on plain HTTP for sensitive pages because defenders treat unencrypted logins as unacceptable risk.`,
        bullets: [
          "**HTTP** = web traffic without transport encryption.",
          "**HTTPS** = encrypted web traffic + certificate-based identity checks.",
          "Prefer HTTPS for anything involving accounts, forms, or private data.",
        ],
        callout: {
          label: "Watch out",
          text: "If a site asks for a password over HTTP, treat it as a red flag — leave and use a known good URL or official app instead.",
        },
      },
      {
        id: "certs-cas",
        kicker: "Who do we trust?",
        title: "Certificates and CAs — digital ID cards",
        body: `When you visit \`https://example.com\`, the server presents a **certificate**. Think of it as a digital ID card that says:\n\n• This certificate is for *this* domain name.\n• Here is the site's **public key**.\n• A **Certificate Authority (CA)** has signed this claim.\n\nYour browser ships with a list of CAs it trusts (like a list of passport offices it believes). If the certificate matches the site name, is signed by a trusted CA, and hasn't expired or been revoked, the browser shows the padlock and continues with HTTPS.\n\nYou don't need to become a CA expert — you need to know that **trust is delegated**. Browsers automate most of the checking so you don't have to.`,
        callout: {
          label: "Defender view",
          text: "If your browser screams about an invalid certificate, don't click through casually — especially on banking, school, or email logins. That warning is doing its job.",
        },
      },
      {
        id: "padlock",
        kicker: "Reading the signal",
        title: "What the padlock actually means",
        body: `The **padlock** (or equivalent HTTPS indicator) roughly means:\n\n• Your connection to *this* site is encrypted.\n• The certificate is acceptable to your browser for that domain.\n\nIt does **not** mean:\n\n• The website is honest, ethical, or safe to log into.\n• The page can't be a phishing clone of a real brand.\n• The company behind the site won't leak your data later.\n• The content is accurate or malware-free.\n\nScammers can buy domains and get HTTPS certificates too. The padlock says \"encrypted channel to this name\" — not \"this name is your real bank.\"`,
        bullets: [
          "Padlock ≈ encrypted connection + accepted certificate.",
          "Still verify the **domain spelling** carefully.",
          "Bookmark real login pages; don't trust random links.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"It has a padlock, so it can't be a scam.\" False. Many phishing sites use HTTPS. Check the URL and how you arrived there.",
        },
      },
      {
        id: "mitm-awareness",
        kicker: "Awareness level",
        title: "MITM: why someone wants to sit in the middle",
        body: `A **man-in-the-middle (MITM)** situation is when an attacker positions themselves between you and the real service — for example on hostile Wi-Fi — hoping to read or alter traffic.\n\nFrom a **defender awareness** view (not an attack tutorial):\n\n• HTTPS exists partly to make this much harder against well-configured sites.\n• Certificate warnings matter because they can signal the connection isn't what you think.\n• Public Wi-Fi is riskier for *careless* browsing; prefer cellular data or a trusted network for sensitive logins when possible.\n\nYou don't need to recreate attacks. You need habits: heed warnings, use HTTPS sites, avoid entering secrets on shady networks, and keep devices updated.`,
        callout: {
          label: "Try this week",
          text: "On a school or café Wi-Fi, notice whether login pages are HTTPS and whether your browser shows any certificate warnings. Practice pausing before you type a password.",
        },
      },
      {
        id: "not-enough",
        kicker: "Beyond the padlock",
        title: "When HTTPS isn't enough",
        body: `HTTPS is necessary — not sufficient. Pair it with:\n\n• **URL vigilance** — \`bankofarnerica.com\` is not your bank.\n• **Phishing skepticism** — urgent emails with \"verify now\" links.\n• **MFA** — so a stolen password alone isn't game over.\n• **Software updates** — so browsers can enforce modern TLS rules.\n• **Least privilege & good device hygiene** — malware on your machine can still steal what you type.\n\nThink of HTTPS as locking the tunnel. You still must choose the right destination and protect the endpoints.`,
        callout: {
          label: "Myth check",
          text: "HTTPS protects data *in transit* to the site you're visiting. It does not magically secure your account if you reuse passwords or ignore MFA prompts.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **HTTPS** encrypts web traffic; **HTTP** does not.\n• **Certificates** + **CAs** help browsers verify site identity.\n• The **padlock** means a trusted-looking encrypted connection — not \"this site is honest.\"\n• **MITM** risk is why HTTPS and certificate warnings matter.\n• Still check URLs, use MFA, and stay phishing-aware.\n\nHead to the **Knowledge check**, then reflect on a time the padlock might have given false comfort.`,
      },
    ],
  },
  bigIdeas: [
    "**HTTPS** encrypts the connection between your browser and a website; **HTTP** does not.",
    "**Certificates** and **CAs** help browsers verify that a site's identity looks legitimate for that domain.",
    "A **padlock** is not a scam-free badge — phishing sites can use HTTPS too, so always check the URL.",
  ],
  keyTerms: [
    { term: "HTTP", definition: "The basic web request protocol without transport encryption." },
    { term: "HTTPS", definition: "HTTP with encryption and certificate-based identity checks." },
    { term: "Certificate", definition: "A digital ID for a website linking a domain to a public key, signed by a CA." },
    { term: "Certificate Authority (CA)", definition: "An organization browsers trust to vouch for website certificates." },
    { term: "Padlock", definition: "Browser indicator that you're on HTTPS with an accepted certificate." },
    { term: "Man-in-the-middle (MITM)", definition: "When someone secretly sits between you and the real service to intercept or alter traffic." },
    { term: "Domain", definition: "The website name in the URL (like school.edu) you should verify carefully." },
  ],
  realWorld:
    "You click an email \"Reset your school password\" link. The page shows a **padlock**, but the URL is a lookalike domain. HTTPS only encrypted your connection to the *fake* site — checking the address bar still saved you.",
  quiz: [
    {
      id: "q1",
      question: "What is the main difference between HTTP and HTTPS?",
      choices: [
        "HTTPS websites load without using the internet",
        "HTTPS adds encryption (and certificate checks); HTTP does not",
        "HTTP is only for mobile phones",
        "They are identical except the color of the padlock icon",
      ],
      correctIndex: 1,
      explanation:
        "The \"S\" in HTTPS stands for Secure — encrypted transport plus identity checks via certificates.",
    },
    {
      id: "q2",
      question: "What does a website certificate mainly help your browser do?",
      choices: [
        "Speed up video streaming",
        "Check that the site's cryptographic identity matches the domain (as vouched by a CA)",
        "Delete phishing emails automatically",
        "Prove the website's owners are ethically perfect",
      ],
      correctIndex: 1,
      explanation:
        "Certificates bind a domain to a public key and are signed by CAs the browser trusts. They don't prove honesty.",
    },
    {
      id: "q3",
      question: "A login page shows a padlock. What can you safely conclude?",
      choices: [
        "The site cannot be a scam",
        "Your connection to that domain is encrypted and the certificate looks acceptable to the browser",
        "Your password is impossible to steal",
        "The company will never have a data breach",
      ],
      correctIndex: 1,
      explanation:
        "Padlock ≈ encrypted connection to the domain you're on. It does not prove the site is legitimate or scam-free.",
    },
    {
      id: "q4",
      question: "Why might a defender care about MITM risk on public Wi-Fi?",
      choices: [
        "Because Wi-Fi never uses passwords",
        "Because a hostile network path increases the chance someone tries to intercept or alter traffic — HTTPS and warnings help defend against that",
        "Because public Wi-Fi disables all websites",
        "Because MITM only affects printed documents",
      ],
      correctIndex: 1,
      explanation:
        "Public networks can be less trustworthy. HTTPS and heeding certificate warnings are key defensive habits.",
    },
    {
      id: "q5",
      question: "Which habit best complements HTTPS?",
      choices: [
        "Ignoring all browser warnings so pages load faster",
        "Checking the URL carefully and using MFA on important accounts",
        "Only using HTTP for banking",
        "Sharing your private keys in group chat for convenience",
      ],
      correctIndex: 1,
      explanation:
        "HTTPS protects the tunnel; URL checks and MFA protect you when attackers trick or steal credentials.",
    },
  ],
  reflection: {
    prompt:
      "Describe a situation where a padlock might make someone feel safe even if they shouldn't. What would you check besides the padlock?",
    placeholder: "Example: A fake login page with HTTPS… I'd check the exact domain and how I got the link…",
  },
};
