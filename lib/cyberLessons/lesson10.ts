import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson10: AILessonConfig = {
  id: "cs-10",
  title: "10. HTTPS, Certificates & Trust",
  goal: "Explain HTTP vs HTTPS, what certificates and certificate authorities do in simple terms, the certificate lifecycle, what the padlock means (and what it doesn't), and why HTTPS alone isn't enough against every threat.",
  xpReward: 500,
  badge: "Trust Verifier",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/9",
  nextHref: "/learn/cyber/11",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-10.png",
        imageAlt: "Browser address bar with HTTPS padlock on a school portal laptop screen",
        body: `That little padlock in your browser is one of the most important security signals online — and one of the most misunderstood. Today you'll learn what **HTTPS**, **certificates**, and **trust** actually mean from a defender's point of view.\n\nHere's our roadmap:\n\n• **HTTP vs HTTPS** — plain vs protected web traffic.\n• **Certificates** — digital ID cards for websites.\n• **Certificate Authorities (CAs)** — who vouch for those IDs.\n• **Certificate lifecycle** — issuance, expiration, renewal, and revocation.\n• **What the padlock means** — and what it never promised.\n• **MITM awareness** — why attackers want to sit in the middle.\n• **Browser warnings** — reading them like a defender, not ignoring them.\n• **When padlock isn't enough** — phishing pages can have HTTPS too.\n\nThis maps to the **Protect** and **Identify** functions of NIST's cybersecurity framing — recognizing legitimate connections and reducing exposure to fake ones. You'll leave able to read the padlock like a defender, not like a superstition.`,
        callout: {
          label: "Why it matters",
          text: "Scammers love people who think \"padlock = safe forever.\" Knowing the real meaning helps you spot fake login pages that still show HTTPS.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Trust words in plain English",
        body: `• **HTTP** — the basic language browsers use to request web pages. By itself, it sends data in a form that can be read if intercepted.\n• **HTTPS** — HTTP plus encryption and identity checks (the \"S\" is for Secure).\n• **Certificate** — a digital file that says \"this public key belongs to this website,\" signed by a trusted party.\n• **Certificate Authority (CA)** — an organization browsers trust to vouch for website certificates.\n• **Padlock** — the browser UI hint that you're on HTTPS with a certificate the browser accepts.\n• **Man-in-the-middle (MITM)** — when someone secretly sits between you and the real site, trying to read or alter traffic.\n• **Revocation** — invalidating a certificate early, before its normal expiration, usually because it was compromised.\n\nKeep these handy — the rest of the lesson is just these ideas in action.`,
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
        id: "http-https-example",
        kicker: "See it in action",
        title: "Spotting the difference in the address bar",
        body: `Open your browser and look at the very start of the address bar:\n\n• \`http://example.com\` — plain, unencrypted. Many browsers flag this as "Not Secure."\n• \`https://example.com\` — encrypted, with a padlock or shield icon.\n\nSchool Wi-Fi, coffee shop Wi-Fi, and airport Wi-Fi are common places where **HTTP** traffic can be seen by others sharing that network. A login form on an HTTP page sends your username and password in a form that's far easier to intercept than one protected by HTTPS.\n\nTry this the next time you're on any public network: glance at the address bar before typing a password. If it says "Not Secure" or shows plain HTTP, that's your cue to pause and verify you're on a legitimate, protected page before continuing.`,
        checkIn: {
          prompt: "You're on café Wi-Fi and a login page shows 'Not Secure' with an HTTP address. What should you do?",
          choices: [
            "Log in anyway since café Wi-Fi is always trustworthy",
            "Pause — avoid entering a password on an unencrypted HTTP page, especially on shared networks",
            "Turn off your phone's Wi-Fi permanently",
            "Assume the page is a virus and delete your browser",
          ],
          correctIndex: 1,
          explanation:
            "Unencrypted HTTP pages are risky for credentials on shared networks. Look for HTTPS before entering sensitive information.",
        },
      },
      {
        id: "certs-cas",
        kicker: "Who do we trust?",
        title: "Certificates and CAs — digital ID cards",
        image: "/images/lessons/cs-10-2.png",
        imageAlt: "Certificate details panel and certificate authority concept cards on a desk",
        body: `When you visit \`https://example.com\`, the server presents a **certificate**. Think of it as a digital ID card that says:\n\n• This certificate is for *this* domain name.\n• Here is the site's **public key**.\n• A **Certificate Authority (CA)** has signed this claim.\n\nYour browser ships with a list of CAs it trusts (like a list of passport offices it believes). If the certificate matches the site name, is signed by a trusted CA, and hasn't expired or been revoked, the browser shows the padlock and continues with HTTPS.\n\nYou don't need to become a CA expert — you need to know that **trust is delegated**. Browsers automate most of the checking so you don't have to.`,
        callout: {
          label: "Defender view",
          text: "If your browser screams about an invalid certificate, don't click through casually — especially on banking, school, or email logins. That warning is doing its job.",
        },
      },
      {
        id: "certs-cas-example",
        kicker: "See it in action",
        title: "Peeking at a real certificate",
        body: `Most browsers let you click the padlock icon and view certificate details. Doing this occasionally (not obsessively) helps demystify the whole system. You'll typically see:\n\n• **Issued to** — the domain name the certificate covers.\n• **Issued by** — the CA that signed it.\n• **Valid from / valid until** — the active date range.\n\nIf you ever see a certificate issued to a completely different domain than the one in your address bar, or a CA you've never heard associated with major sites, that's a red flag worth screenshotting and reporting to IT or a trusted adult rather than continuing.\n\nThis is a good habit for a defender-in-training: browsers do the heavy verification automatically, but knowing how to look under the hood helps you recognize when something looks off.`,
        checkIn: {
          prompt: "What does a website certificate mainly prove to your browser?",
          choices: [
            "That the website's owners are honest people",
            "That a trusted CA has vouched the public key belongs to that specific domain",
            "That the website has no bugs",
            "That the website loads quickly",
          ],
          correctIndex: 1,
          explanation:
            "Certificates bind a domain to a public key, signed by a CA the browser trusts — they say nothing about the operator's honesty or code quality.",
        },
      },
      {
        id: "cert-lifecycle",
        kicker: "It's not forever",
        title: "The certificate lifecycle: issued, renewed, and sometimes revoked",
        image: "/images/lessons/cs-10-4.png",
        imageAlt: "Timeline graphic showing certificate issuance renewal and revocation stages",
        body: `Certificates aren't permanent. Defenders track a lifecycle:\n\n**1. Issuance** — a CA verifies the requester controls the domain, then issues a certificate with an expiration date.\n**2. Active use** — the certificate secures traffic while it remains valid and unrevoked.\n**3. Renewal** — before expiration, site operators request a fresh certificate; missing this causes browser warnings even on a legitimate site.\n**4. Revocation** — if a private key is compromised or details change, the CA can invalidate the certificate early, and browsers check revocation status to avoid trusting it.\n\nExpired or revoked certificates trigger warnings for a reason: the identity/key binding you're relying on is no longer considered current or safe. A warning about an expired certificate on an otherwise-familiar site is often just an operational mistake — but you still shouldn't enter sensitive data until it's fixed.`,
        bullets: [
          "Certificates expire and must be renewed — that's normal operations.",
          "Revocation happens early, usually after a key compromise.",
          "An expired-certificate warning means \"pause,\" not necessarily \"this is a scam.\"",
        ],
        callout: {
          label: "Watch out",
          text: "Attackers sometimes hope you'll click through an expired/invalid certificate warning out of habit. Treat every warning as worth a second look, not an annoyance to dismiss.",
        },
      },
      {
        id: "cert-lifecycle-example",
        kicker: "See it in action",
        title: "Reading a certificate warning correctly",
        body: `Suppose you visit your school's portal and get a warning: "Your connection is not private — certificate expired 3 days ago."\n\nA defender's response, in order:\n\n1. **Don't enter credentials** while the warning is active — the encrypted identity guarantee is broken right now.\n2. **Try again later** or from a different network — sometimes it's a temporary caching issue.\n3. **Report it** to IT/a trusted adult so they can renew the certificate — an expired cert on a real site is usually an oversight, not an attack, but you can't tell for certain just by looking.\n4. **Avoid clicking through repeatedly** "just to get it done" — that habit is exactly what attackers hope for when they present a fake warning too.\n\nThe lesson isn't "panic about every warning." It's "treat warnings as a pause button, verify through another channel if it matters, and don't make click-through-warnings a reflex."`,
        checkIn: {
          prompt: "Your school portal shows an 'expired certificate' warning. What's the best first move?",
          choices: [
            "Enter your password anyway to save time",
            "Avoid entering credentials, and report the warning so IT can renew the certificate",
            "Assume the school was hacked and tell everyone on social media",
            "Permanently stop using that portal",
          ],
          correctIndex: 1,
          explanation:
            "Pause on credential entry, verify through another channel, and report it — most expired-certificate warnings are renewal oversights, but you shouldn't gamble sensitive data on that assumption.",
        },
      },
      {
        id: "padlock",
        kicker: "Reading the signal",
        title: "What the padlock actually means",
        image: "/images/lessons/cs-10-3.png",
        imageAlt: "Close-up of browser padlock with sticky note Encryption is not the same as trust the site",
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
        id: "padlock-example",
        kicker: "See it in action",
        title: "The lookalike-domain trap",
        body: `You get a text: "Your package couldn't be delivered — confirm your address at \`usps-delivery-status.com\`." You tap it and see... a padlock! The connection is fully encrypted.\n\nHere's the catch: encryption protects your data on the way *to whatever domain you're visiting* — including a domain that has nothing to do with the real postal service. The scammer bought a cheap domain, got a free HTTPS certificate (widely and legitimately available to anyone), and now has a "secure" looking phishing page.\n\nWhat actually protects you here isn't the padlock — it's noticing the domain doesn't match the real organization's known site, resisting urgency ("couldn't be delivered!"), and typing the real organization's URL yourself instead of tapping links from texts.`,
        checkIn: {
          prompt: "A phishing page has a valid padlock/HTTPS. What does that tell you?",
          choices: [
            "The page is definitely legitimate",
            "Only that the connection to that specific (possibly fake) domain is encrypted — not that the site is trustworthy",
            "The page cannot ask for your password",
            "HTTPS certificates are only given to real companies",
          ],
          correctIndex: 1,
          explanation:
            "Anyone can get a free HTTPS certificate for a domain they own, including scammers. The padlock never certifies honesty — only an encrypted connection to that domain.",
        },
      },
      {
        id: "mitm-awareness",
        kicker: "Awareness level",
        title: "MITM: why someone wants to sit in the middle",
        body: `A **man-in-the-middle (MITM)** situation is when an attacker positions themselves between you and the real service — for example on hostile Wi-Fi — hoping to read or alter traffic.\n\nFrom a **defender awareness** view (not an attack tutorial):\n\n• HTTPS exists partly to make this much harder against well-configured sites.\n• Certificate warnings matter because they can signal the connection isn't what you think.\n• Public Wi-Fi is riskier for *careless* browsing; prefer cellular data, a trusted network, or a reputable VPN for sensitive logins when possible.\n\nYou don't need to recreate attacks. You need habits: heed warnings, use HTTPS sites, avoid entering secrets on shady networks, and keep devices updated.`,
        callout: {
          label: "Try this week",
          text: "On a school or café Wi-Fi, notice whether login pages are HTTPS and whether your browser shows any certificate warnings. Practice pausing before you type a password.",
        },
      },
      {
        id: "mitm-awareness-example",
        kicker: "See it in action",
        title: "Choosing a network before sensitive logins",
        body: `You're at the airport with a long layover and need to check your bank balance. Two networks are available: "Airport-Free-WiFi" (open, no password) and your phone's cellular data / hotspot.\n\nA defender's quick risk read:\n\n• Open, password-free public Wi-Fi networks are generally less trustworthy for sensitive logins — you don't know who else is on that network or how it's configured.\n• Cellular data (or a personal hotspot) is generally a better default for banking-level sensitivity when available.\n• If you must use public Wi-Fi for something sensitive, sticking to HTTPS sites and heeding any certificate warnings meaningfully reduces — but doesn't eliminate — risk.\n• A reputable VPN can add a layer of protection on untrusted networks, but it's a tool, not a magic fix — you still need HTTPS and good judgment underneath it.\n\nThis isn't about fearing every public network constantly. It's about matching the sensitivity of what you're doing to the trustworthiness of the network you're on.`,
        checkIn: {
          prompt: "You need to check your bank account while traveling. Which is the safer default choice?",
          choices: [
            "Open airport Wi-Fi with no password, since it's convenient",
            "Cellular data or a trusted personal hotspot over open public Wi-Fi for sensitive logins",
            "Any Wi-Fi is equally safe as long as the page loads",
            "Wait and use a friend's phone logged into their own bank account instead",
          ],
          correctIndex: 1,
          explanation:
            "Cellular data/personal hotspots are generally more trustworthy than open public Wi-Fi for sensitive activity. HTTPS still matters either way.",
        },
      },
      {
        id: "browser-warnings",
        kicker: "Read the signals",
        title: "Browser warnings: what they're actually telling you",
        image: "/images/lessons/cs-10-5.png",
        imageAlt: "Browser warning screen for an invalid certificate with clear caution iconography",
        body: `Browsers show several distinct warnings — knowing the difference helps you respond appropriately instead of clicking through everything:\n\n• **"Not Secure" (plain HTTP)** — no encryption at all on this page; avoid entering sensitive data.\n• **Invalid/expired certificate warning** — the identity/encryption guarantee is broken right now for this specific connection.\n• **Certificate name mismatch** — the certificate doesn't match the domain you're visiting, which can indicate misconfiguration or something worse.\n• **Mixed content warning** — a secure page is loading some insecure (HTTP) resources, weakening protection.\n\nThese warnings exist because browser makers, security researchers, and CAs collectively built systems (like automatic checks and, where used, features that force HTTPS) to catch exactly these problems before you notice on your own. Respecting the warning is you cooperating with a system built to protect you.`,
        bullets: [
          "\"Not Secure\" = no encryption at all right now.",
          "Certificate warnings = broken or mismatched identity guarantee.",
          "Mixed content = a secure page leaking some insecure pieces.",
        ],
        callout: {
          label: "Myth check",
          text: "\"These warnings pop up all the time, they must not matter.\" On well-run, popular sites they should be rare. Frequent warnings on a site you use often are worth reporting.",
        },
      },
      {
        id: "browser-warnings-example",
        kicker: "See it in action",
        title: "Deciding when a warning is worth escalating",
        body: `Not every warning needs a security team — but pattern-matching helps you know when to escalate:\n\n• **One-time, resolves on reload, on a site you already trust** → likely a minor glitch; keep an eye out, no need to panic.\n• **Persistent warning on a login page for something sensitive (school, bank, email)** → stop, don't log in, tell IT/a trusted adult, try again later or through a bookmarked/official link.\n• **Warning appears right after clicking a link from an unexpected text/email** → treat this as a likely phishing attempt; close the tab, don't proceed.\n• **Certificate name doesn't match the site you meant to visit at all** → strong signal something is wrong; leave immediately.\n\nBuilding this kind of judgment — instead of either ignoring every warning or panicking at every warning — is exactly the "Identify" and "Protect" mindset defenders practice daily.`,
        checkIn: {
          prompt: "You click a link from an unexpected text message and immediately get a certificate warning. What's the best response?",
          choices: [
            "Click through since the link came from a text, which feels personal and trustworthy",
            "Close the tab — treat this as a likely phishing attempt and don't proceed",
            "Screenshot it and forward it to friends to try too",
            "Ignore it because warnings are always false alarms",
          ],
          correctIndex: 1,
          explanation:
            "A certificate warning right after an unexpected link is a strong phishing signal. The safest move is to stop and not proceed.",
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
        id: "not-enough-example",
        kicker: "See it in action",
        title: "A full defensive layer, not just one padlock",
        body: `Picture the layers stacked around one login:\n\n1. **HTTPS** — encrypts the tunnel to whichever domain you're on.\n2. **URL vigilance** — you confirm you're actually on the correct domain, not a lookalike.\n3. **Strong, unique password** — from the identity lessons earlier in the track.\n4. **MFA** — so a leaked password alone doesn't grant access.\n5. **Updated browser/OS** — so known encryption weaknesses stay patched.\n6. **Healthy device** — no malware quietly logging keystrokes before HTTPS even applies.\n\nIf any single layer fails — say, you reuse a password that leaks in an unrelated breach — the other layers (especially MFA) can still stop an attacker. That's the point of layered defense: no one control, including HTTPS, is expected to carry the whole job alone.`,
        checkIn: {
          prompt: "Which combination best represents a full defensive layer around a login, beyond just HTTPS?",
          choices: [
            "HTTPS alone is always sufficient by itself",
            "HTTPS + URL vigilance + a strong unique password + MFA + updated, healthy devices",
            "Only checking for the padlock icon before typing anything",
            "Disabling all browser warnings so pages load faster",
          ],
          correctIndex: 1,
          explanation:
            "HTTPS is one important layer among several. Layered defense — identity checks, MFA, updates, and device hygiene — covers what HTTPS alone cannot.",
        },
      },
      {
        id: "checklist",
        kicker: "Put it together",
        title: "Reading the padlock like a defender: a quick checklist",
        body: `Next time you're about to log in somewhere sensitive, run through this:\n\n**1. Check the address bar** — HTTPS, and is the domain exactly right (no extra words, no misspellings)?\n**2. Heed any warnings** — don't click through certificate or mixed-content warnings on sensitive pages.\n**3. Consider the network** — public Wi-Fi vs cellular/trusted network for high-sensitivity logins.\n**4. Confirm MFA is on** — so the padlock isn't your only line of defense.\n**5. Ask "how did I get here?"** — typed URL/bookmark vs a link from a text or email you didn't expect.\n\nFive quick checks, every time it matters — that's the defender habit this lesson is really teaching.`,
        callout: {
          label: "Try this week",
          text: "The next time you log into something important, run the five-point checklist out loud in your head before you type your password.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **HTTPS** encrypts web traffic; **HTTP** does not.\n• **Certificates** + **CAs** help browsers verify site identity, and certificates move through a **lifecycle** — issued, renewed, sometimes revoked.\n• The **padlock** means a trusted-looking encrypted connection — not \"this site is honest.\"\n• **MITM** risk is why HTTPS, network choice, and certificate warnings matter.\n• Different **browser warnings** mean different things — learn to read them instead of clicking through.\n• Still check URLs, use MFA, and stay phishing-aware — HTTPS is one layer among several.\n\nHead to the **Knowledge check**, then reflect on a time the padlock might have given false comfort.`,
      },
    ],
  },
  bigIdeas: [
    "**HTTPS** encrypts the connection between your browser and a website; **HTTP** does not.",
    "**Certificates** and **CAs** help browsers verify that a site's identity looks legitimate for that domain, and certificates move through an issue/renew/revoke lifecycle.",
    "A **padlock** is not a scam-free badge — phishing sites can use HTTPS too, so always check the URL, heed warnings, and layer on MFA.",
  ],
  keyTerms: [
    { term: "HTTP", definition: "The basic web request protocol without transport encryption." },
    { term: "HTTPS", definition: "HTTP with encryption and certificate-based identity checks." },
    { term: "Certificate", definition: "A digital ID for a website linking a domain to a public key, signed by a CA." },
    { term: "Certificate Authority (CA)", definition: "An organization browsers trust to vouch for website certificates." },
    { term: "Certificate lifecycle", definition: "The stages a certificate moves through: issuance, active use, renewal, and possible revocation." },
    { term: "Revocation", definition: "Invalidating a certificate early, usually after a suspected key compromise." },
    { term: "Padlock", definition: "Browser indicator that you're on HTTPS with an accepted certificate." },
    { term: "Man-in-the-middle (MITM)", definition: "When someone secretly sits between you and the real service to intercept or alter traffic." },
    { term: "Domain", definition: "The website name in the URL (like school.edu) you should verify carefully." },
    { term: "Mixed content", definition: "When a secure (HTTPS) page loads some insecure (HTTP) resources, weakening overall protection." },
  ],
  realWorld:
    "You click an email \"Reset your school password\" link. The page shows a **padlock**, but the URL is a lookalike domain. HTTPS only encrypted your connection to the *fake* site — checking the address bar still saved you.",
  quiz: [
    {
      id: "q1",
      question: "What is the main difference between HTTP and HTTPS?",
      choices: [
        "HTTPS adds encryption (and certificate checks); HTTP does not",
        "HTTPS is only used by government and banking websites",
        "HTTP encrypts traffic too, just more slowly than HTTPS",
        "They are identical except the color of the padlock icon",
      ],
      correctIndex: 0,
      explanation:
        "The \"S\" in HTTPS stands for Secure — encrypted transport plus identity checks via certificates. Plain HTTP has no encryption at all, on any type of site.",
    },
    {
      id: "q2",
      question: "What does a website certificate mainly help your browser do?",
      choices: [
        "Speed up video streaming automatically",
        "Check that the site's cryptographic identity matches the domain (as vouched by a CA)",
        "Delete phishing emails before they arrive",
        "Prove the website's owners are ethically perfect",
      ],
      correctIndex: 1,
      explanation:
        "Certificates bind a domain to a public key and are signed by CAs the browser trusts. They don't prove honesty or filter email.",
    },
    {
      id: "q3",
      question: "A login page shows a padlock. What can you safely conclude?",
      choices: [
        "The site cannot possibly be a scam",
        "Your password is now impossible to steal",
        "Your connection to that domain is encrypted and the certificate looks acceptable to the browser",
        "The company will never have a data breach",
      ],
      correctIndex: 2,
      explanation:
        "Padlock ≈ encrypted connection to the domain you're on. It does not prove the site is legitimate, scam-free, or breach-proof.",
    },
    {
      id: "q4",
      question: "Why might a defender care about MITM risk on public Wi-Fi?",
      choices: [
        "Because Wi-Fi networks never require a password to join",
        "Because encrypting a connection means the network you're on no longer matters at all",
        "Because MITM risk only matters if you're using a very outdated browser",
        "Because a hostile network path increases the chance someone tries to intercept or alter traffic — HTTPS, network choice, and warnings help defend against that",
      ],
      correctIndex: 3,
      explanation:
        "Public networks can be less trustworthy regardless of browser version. HTTPS, choosing a trustworthy network, and heeding certificate warnings are key defensive habits.",
    },
    {
      id: "q5",
      question: "Which habit best complements HTTPS?",
      choices: [
        "Checking the URL carefully and using MFA on important accounts",
        "Ignoring all browser warnings so pages load faster",
        "Trusting any page that simply displays a padlock icon",
        "Sharing your private keys in a group chat for convenience",
      ],
      correctIndex: 0,
      explanation:
        "HTTPS protects the tunnel; URL checks and MFA protect you when attackers trick or steal credentials — the padlock alone doesn't vet the site.",
    },
    {
      id: "q6",
      question: "A certificate shows as 'expired' on a site you normally trust. What's the best first response?",
      choices: [
        "Enter your password anyway since you already trust the site",
        "Avoid entering credentials, try again later, and report it so it can be renewed",
        "Assume the entire internet is broken",
        "Permanently avoid the site forever with no follow-up or report",
      ],
      correctIndex: 1,
      explanation:
        "Pause on credential entry and report the issue. An expired certificate is often a renewal oversight, but you shouldn't gamble sensitive data on that assumption.",
    },
    {
      id: "q7",
      question: "Why doesn't a valid HTTPS padlock guarantee a page isn't phishing?",
      choices: [
        "Because HTTPS certificates are only given to well-known, real companies",
        "Because padlocks are only ever shown on mobile devices",
        "Because anyone, including scammers, can get an HTTPS certificate for a domain they control",
        "Because HTTPS automatically disables all web forms",
      ],
      correctIndex: 2,
      explanation:
        "HTTPS certificates are widely and legitimately available to any domain owner — including someone running a lookalike phishing domain.",
    },
    {
      id: "q8",
      question: "Which set of layers best defends a sensitive login, beyond HTTPS alone?",
      choices: [
        "HTTPS is always sufficient entirely on its own",
        "Using the same password everywhere for consistency",
        "Only disabling browser warnings so pages load faster",
        "URL vigilance, a strong unique password, MFA, and an updated, healthy device",
      ],
      correctIndex: 3,
      explanation:
        "HTTPS is one layer among several. Real protection layers identity checks, MFA, updates, and device hygiene on top of it.",
    },
  ],
  reflection: {
    prompt:
      "Describe a situation where a padlock might make someone feel safe even if they shouldn't. What would you check besides the padlock, and which other defensive layer (MFA, URL check, network choice) would matter most?",
    placeholder: "Example: A fake login page with HTTPS… I'd check the exact domain, how I got the link, and whether MFA was on…",
  },
};
