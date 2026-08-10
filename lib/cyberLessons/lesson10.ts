import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson10: AILessonConfig = {
  id: "cs-10",
  title: "10. HTTPS, Certificates & Trust",
  goal: "Evaluate what the padlock and certificates actually prove (and their trust limits); compare HTTPS with other security measures and with physical protections; and recommend layered checks when a warning, lookalike domain, or untrusted network appears.",
  xpReward: 500,
  badge: "Trust Verifier",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/9",
  nextHref: "/learn/cyber/11",
  instructorScript: `**Coach's note**
Today's lesson: **HTTPS, Certificates & Trust**.

**Goal:** Evaluate what the padlock and certificates actually prove (and their trust limits); compare HTTPS with other security measures and with physical protections; and recommend layered checks when a warning, lookalike domain, or untrusted network appears.

**How to facilitate**
1. Warm-up: ask students what they already think about "What you'll learn today".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~25–30 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-10.png",
        imageAlt: "Browser address bar with HTTPS padlock on a school portal laptop screen",
        body: `That little padlock in your browser is one of the most important security signals online — and one of the most misunderstood. Today you'll **evaluate** what HTTPS and certificates prove, **compare** digital trust signals with physical protections, and **recommend** what to do when warnings or lookalike domains appear — not how to intercept traffic.\n\nHere's our roadmap:\n\n• **HTTP vs HTTPS** — compare unprotected vs encrypted web traffic.\n• **Certificates & CAs** — delegated trust, and its limits.\n• **Certificate lifecycle decisions** — renew vs revoke vs pause credential entry.\n• **Padlock trust limits** — encrypted channel ≠ honest site.\n• **Hostile path risk** — why network choice and warnings matter (defender habits only).\n• **Browser warnings** — evaluate which to escalate.\n• **Layered measures** — HTTPS vs MFA vs URL checks vs physical safeguards.\n\nHigh-school depth means you can justify a recommendation under pressure — not treat the padlock as a superstition.`,
        callout: {
          label: "Why it matters",
          text: "Scammers love people who think \"padlock = safe forever.\" Evaluating trust limits helps you spot fake login pages that still show HTTPS.",
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
            "Pause — avoid entering a password on an unencrypted HTTP page, especially on shared networks",
            "Log in anyway since café Wi-Fi is always trustworthy",
            "Assume the page is a virus and delete your browser",
            "Turn off your phone's Wi-Fi permanently",
          ],
          correctIndex: 0,
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
            "That the website loads quickly",
            "That the website has no bugs",
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
        body: `Certificates aren't permanent. Defenders track a lifecycle **and make decisions** at each stage:\n\n**1. Issuance** — a CA verifies the requester controls the domain, then issues a certificate with an expiration date.\n**2. Active use** — the certificate secures traffic while it remains valid and unrevoked.\n**3. Renewal** — before expiration, operators request a fresh certificate; missing this causes warnings even on a legitimate site.\n**4. Revocation** — if a private key is compromised or details change, the CA can invalidate early so browsers stop trusting it.\n\n**Lifecycle decisions to evaluate:**\n• **Expired on a familiar school portal** — recommend pause on credentials + report for renewal (often ops failure, still untrusted until fixed).\n• **Revoked / name mismatch after an unexpected link** — recommend leave immediately; treat as high impersonation risk, not a \"renew later\" ticket.\n• **Short-lived certs** — more renewal ops burden for admins, but smaller window if a key leaks — a deliberate tradeoff.\n\nThe identity/key binding is only as current as the lifecycle. Clicking through to \"just finish the form\" is how trust limits get ignored.`,
        bullets: [
          "Renewal is normal ops; skipping it breaks the trust signal even on real sites.",
          "Revocation is an early invalidation decision — usually after key compromise.",
          "Recommend: pause credentials on warnings; escalate differently for expire vs mismatch vs unexpected-link context.",
        ],
        callout: {
          label: "Watch out",
          text: "Attackers hope you'll click through expired/invalid warnings out of habit. Evaluate each warning — don't dismiss them as UI noise.",
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
            "Assume the school was hacked and tell everyone on social media",
            "Avoid entering credentials, and report the warning so IT can renew the certificate",
            "Permanently stop using that portal",
            "Enter your password anyway to save time",
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
        body: `**Evaluate the padlock's trust limits.** It roughly means:\n\n• Your connection to *this* site is encrypted.\n• The certificate is acceptable to your browser for that domain.\n\nIt does **not** mean:\n\n• The website is honest, ethical, or safe to log into.\n• The page can't be a phishing clone of a real brand.\n• The company behind the site won't leak your data later.\n• The content is accurate or malware-free.\n\n**Compare physical vs digital protections:** A deadbolt on a building proves the door can lock — not that the building is your bank, or that staff are honest. HTTPS is the digital cousin: it protects the *channel* to a named destination. You still check the address (like checking you're at the right street number) and use MFA (like needing an employee badge *and* a PIN).\n\nScammers can buy domains and get HTTPS certificates too. Recommend: treat padlock as necessary, never sufficient.`,
        bullets: [
          "Padlock ≈ encrypted connection + accepted certificate — evaluate that claim only.",
          "Still verify the **domain spelling** carefully (digital \"street address\" check).",
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
            "Some learners answer “The page is definitely legitimate”, yet that does not match the precise idea from the lesson",
            "HTTPS certificates are only given to real companies",
            "Only that the connection to that specific (possibly fake) domain is encrypted — not that the site is trustworthy",
            "Treat “The page cannot ask for your password” as a distractor: close in topic, incorrect for the required answer",
          ],
          correctIndex: 2,
          explanation:
            "Anyone can get a free HTTPS certificate for a domain they own, including scammers. The padlock never certifies honesty — only an encrypted connection to that domain.",
        },
      },
      {
        id: "mitm-awareness",
        kicker: "Path risk",
        title: "Hostile paths: why network choice still matters",
        body: `A **man-in-the-middle (MITM)** situation is when someone positions themselves between you and the real service — for example on hostile Wi-Fi — hoping to read or alter traffic. This lesson stays defensive: **not** how to stage that position.\n\n**Compare measures for a sensitive login on the road:**\n• **HTTPS on a known-good domain** — encrypts the tunnel; still fails if the domain is a lookalike.\n• **Cellular / personal hotspot** — generally more trustworthy path than open café Wi-Fi for banking-level sensitivity.\n• **Certificate warnings** — signal the identity guarantee is broken right now; recommend stop, not \"Advanced → proceed.\"\n• **Reputable VPN** — can add a layer on untrusted networks; does not replace HTTPS, URL checks, or MFA.\n\nRecommend matching network trustworthiness to data sensitivity — the same judgment you'd use before entering a PIN at an unfamiliar ATM in a crowded hallway.`,
        callout: {
          label: "Try this week",
          text: "On school or café Wi-Fi, evaluate login pages: HTTPS? exact domain? any certificate warning? Pause before typing a password.",
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
        body: `Not every warning needs a security team — but pattern-matching helps you know when to escalate:\n\n• **One-time, resolves on reload, on a site you already trust** → likely a minor glitch; keep an eye out, no need to panic.\n• **Persistent warning on a login page for something sensitive (school, bank, email)** → stop, don't log in, tell IT/a trusted adult, try again later or through a bookmarked/official link.\n• **Warning appears right after clicking a link from an unexpected text/email** → treat this as a likely phishing attempt; close the tab, don't proceed.\n• **Certificate name doesn't match the site you meant to visit at all** → strong signal something is wrong; leave immediately.\n\nBuilding this kind of judgment — instead of either ignoring every warning or panicking at every warning — is exactly the calm recognition-and-protection habit defenders practice daily.`,
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
        body: `HTTPS is necessary — not sufficient. **Compare security measures** and recommend a stack:\n\n• **URL vigilance** — \`bankofarnerica.com\` is not your bank (like checking the street address before using an ATM).\n• **Phishing skepticism** — urgent \"verify now\" links are social pressure, not proof of legitimacy.\n• **MFA** — so a stolen password alone isn't game over (digital second factor ≈ badge + PIN).\n• **Software updates** — so browsers can enforce modern TLS rules.\n• **Device hygiene** — malware can steal what you type *before* HTTPS applies.\n\n**Tradeoff:** convenience (tap the link, click through a warning, use open Wi-Fi) vs justified caution for high-sensitivity actions. Recommend reserving friction for banking, school accounts, and payments — not treating every page like a crisis.`,
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
            "Only checking for the padlock icon before typing anything",
            "Disabling all browser warnings so pages load faster",
            "HTTPS + URL vigilance + a strong unique password + MFA + updated, healthy devices",
            "HTTPS alone is always sufficient by itself",
          ],
          correctIndex: 2,
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
        id: "cert-decisions",
        kicker: "Decision checklist",
        title: "Certificate warning decisions under pressure",
        body: `Browser certificate warnings are annoying — and sometimes life-saving. Use this decision guide:

**If warning appears on a routine news site:** stop, do not click through, try later or use a known-good network.
**If warning appears during banking or school login:** stop completely — verify URL, try cellular data, contact official support through a known number.
**If warning appears only on school Wi-Fi but not cellular:** report to IT — possible captive portal or misconfigured inspection, not something to bypass casually.

**Comparison — warning types (plain language):**
• **Name mismatch** — certificate does not match the domain you typed; high risk of impersonation.
• **Expired** — server admin mistake or neglected maintenance; treat as untrusted until fixed.
• **Untrusted issuer** — browser does not recognize who vouched for the site; do not enter credentials.

Clicking "Advanced → proceed anyway" on sensitive pages is how defenders lose — not how they troubleshoot.`,
      },
      {
        id: "login-network-walkthrough",
        kicker: "Scenario walkthrough",
        title: "Choosing where to log in",
        body: `**Scenario:** Sam needs to pay a club invoice through the school's payment portal at a coffee shop. The padlock is green. Is that enough?

**Walkthrough:**
1. **Padlock check** — HTTPS is on; connection to the server is encrypted.
2. **Domain check** — URL exactly matches the known school domain, no lookalike.
3. **Network check** — public café Wi-Fi adds risk of surrounding hostile devices; cellular hotspot is safer for high-sensitivity payments if available.
4. **MFA check** — payment portal requires second factor; good.
5. **Entry path** — Sam typed the URL from a bookmark, not from a random email link.

**Decision:** proceed on HTTPS with correct domain, prefer cellular if possible, deny any unexpected MFA prompts during payment.

HTTPS is one layer. Network choice and MFA are others — the walkthrough names all three before Sam types a password.`,
        checkIn: {
          prompt: "HTTPS is active on a login page at a coffee shop. What additional factor should Sam still consider?",
          choices: [
            "Whether HTTP would be faster",
            "Whether the network environment and domain are trustworthy, plus MFA status",
            "Whether to disable browser warnings for speed",
            "Nothing — padlock means completely safe",
          ],
          correctIndex: 1,
          explanation:
            "HTTPS encrypts the connection but does not eliminate network risk or phishing domains — layered checks still matter.",
        },
      },
      {
        id: "trust-myths-extra",
        kicker: "Myth check",
        title: "HTTPS trust myths defenders retire early",
        body: `• **"Green padlock = honest company."** Phishing sites obtain certificates too; the padlock only speaks to the connection, not motives.
• **"HTTP is fine for quick logins."** Credentials sent over HTTP can be read by anyone on the path — always prefer HTTPS for logins.
• **"Certificate warnings are always broken school Wi-Fi — ignore them."** Sometimes yes, sometimes MITM or misconfiguration — report, do not habitually bypass on sensitive sites.
• **"I can check the padlock after I log in."** Check before you type secrets, not after.

Build the habit: address bar first, warnings second, network third, MFA fourth — then credentials.`,
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Evaluate** HTTPS vs HTTP: encryption + certificate checks vs open traffic.\n• **Certificates/CAs** and the **lifecycle** (issue → renew → revoke) shape what trust is current.\n• **Padlock trust limits**: encrypted channel to a domain ≠ honest site — compare to physical locks that don't prove the building is yours.\n• **Recommend** layered measures: exact URL, network choice, heed warnings, MFA — HTTPS alone is never enough.\n• Different **browser warnings** need different responses (expire vs mismatch vs unexpected link).\n\nHead to the **Knowledge check**, then justify a recommendation when the padlock alone would mislead.`,
      },
    ],
  },
  bigIdeas: [
    "**Evaluate** HTTPS/certificates: they encrypt and help verify domain identity — they do not prove honesty or safety of the destination.",
    "**Certificate lifecycle** decisions (renew vs revoke vs pause credentials) matter as much as knowing what a CA is.",
    "**Compare** measures: padlock + URL check + network choice + MFA — like physical locks plus checking the address and using a second factor — beats trusting any single signal.",
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
            "Delete phishing emails before they arrive",
            "Check that the site's cryptographic identity matches the domain (as vouched by a CA)",
            "Prove the website's owners are ethically perfect",
          ],
      correctIndex: 2,
      explanation:
        "Certificates bind a domain to a public key and are signed by CAs the browser trusts. They don't prove honesty or filter email.",
    },
    {
      id: "q3",
      question: "A lookalike banking page shows a valid padlock. What can you safely conclude, and what should you still evaluate?",
      choices: [
            "A common mix-up is to treat your password is now impossible to steal as enough, which confuses a nearby idea with the right one once the deciding rule is named clearly",
            "Some learners answer “The site cannot possibly be a scam because certificates prove honesty”, yet that does not match the precise idea from the lesson",
            "Only that the connection to that (possibly fake) domain is encrypted with an accepted cert — you must still verify the exact URL and how you arrived",
            "A common mix-up is to treat the company will never have a data breach as enough, which confuses a nearby idea with the right one once the deciding rule is named clearly",
          ],
      correctIndex: 2,
      explanation:
        "Evaluate padlock trust limits: encryption to the domain you're on, not legitimacy. URL and arrival path still matter.",
    },
    {
      id: "q4",
      question: "You must check a bank balance at an airport. Which recommendation best weighs path risk against convenience?",
      choices: [
            "Use open airport Wi-Fi because the padlock makes the network irrelevant",
            "Wait and log into a stranger's phone bank app instead",
            "Disable certificate warnings so pages load faster on any network",
            "Prefer cellular data or a personal hotspot for the sensitive login; keep HTTPS and heed any certificate warnings",
          ],
      correctIndex: 3,
      explanation:
        "Compare measures: cellular/hotspot is generally a more trustworthy path than open Wi-Fi for high-sensitivity actions; HTTPS and warnings still apply.",
    },
    {
      id: "q5",
      question: "Which comparison best matches physical vs digital protections for a login?",
      choices: [
            "Some learners answer “Physical locks and HTTPS are unrelated ideas with no useful analogy”, yet that does not match the precise idea from the lesson",
            "HTTPS is like a lockable door/channel; checking the domain is like confirming the street address; MFA is like needing a second factor beyond the key",
            "If a building has a deadbolt, you never need to check the address — same as trusting any padlock page",
            "It can seem like a padlock is like a vault that also proves the staff are honest, but that reading skips the distinction this question is testing",
          ],
      correctIndex: 1,
      explanation:
        "Digital HTTPS protects the channel; domain checks and MFA parallel checking location and using a second factor in the physical world.",
    },
    {
      id: "q6",
      question: "A certificate shows as 'expired' on a site you normally trust. What's the best first response?",
      choices: [
            "Permanently avoid the site forever with no follow-up or report",
            "Avoid entering credentials, try again later, and report it so it can be renewed",
            "Enter your password anyway since you already trust the site",
            "Assume the entire internet is broken",
          ],
      correctIndex: 1,
      explanation:
        "Pause on credential entry and report the issue. An expired certificate is often a renewal oversight, but you shouldn't gamble sensitive data on that assumption.",
    },
    {
      id: "q7",
      question: "You click an unexpected text link and get a certificate name-mismatch warning on what looks like a school login. What should you recommend?",
      choices: [
            "Enter the password quickly before the warning times out. That option sounds confident, but it leaves out the deciding constraint",
            "Close the tab and treat it as likely phishing; use a bookmark/official URL later — mismatch after an unexpected link is high risk",
            "Forward the link to classmates so they can confirm the padlock",
            "Click through Advanced → proceed — school Wi-Fi warnings are always false alarms",
          ],
      correctIndex: 1,
      explanation:
        "Lifecycle/context matters: name mismatch after an unexpected link warrants leave-and-verify, not click-through convenience.",
    },
    {
      id: "q8",
      question: "Which set of layers best defends a sensitive login, beyond HTTPS alone?",
      choices: [
            "HTTPS is always sufficient entirely on its own",
            "Only disabling browser warnings so pages load faster",
            "URL vigilance, a strong unique password, MFA, and an updated, healthy device",
            "Using the same password everywhere for consistency",
          ],
      correctIndex: 2,
      explanation:
        "HTTPS is one layer among several. Real protection layers identity checks, MFA, updates, and device hygiene on top of it.",
    },
  ],
  reflection: {
    prompt:
      "A classmate insists \"padlock means safe\" after tapping a package-delivery text that lands on a lookalike HTTPS site. Write a justified recommendation: what the padlock does and does not prove, which other measures (URL, network, MFA) you'd prioritize and why, and how you'd compare that advice to checking a physical address before using an ATM.",
    placeholder: "Example: The padlock only proves… I'd recommend… because… Compared to a physical ATM…",
  },
};
