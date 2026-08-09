import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson9: AILessonConfig = {
  id: "cs-9",
  title: "9. Cryptography & Secure Transmission",
  goal: "Compare symmetric encryption, asymmetric encryption, and hashing; model how software protects data in secure transmission; and evaluate tradeoffs of crypto choices (speed, key distribution, integrity vs confidentiality) — without treating crypto as a complete defense.",
  xpReward: 450,
  badge: "Cipher Starter",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/8",
  nextHref: "/learn/cyber/10",
  instructorScript: `**Coach's note**
Today's lesson: **Cryptography & Secure Transmission**.

**Goal:** Compare symmetric encryption, asymmetric encryption, and hashing; model how software protects data in secure transmission; and evaluate tradeoffs of crypto choices (speed, key distribution, integrity vs confidentiality) — without treating crypto as a complete defense.

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
        image: "/images/lessons/cs-9.png",
        imageAlt: "Two locked boxes and two keys on a desk illustrating encryption concepts for students",
        body: `You've used encryption thousands of times without noticing — every time a padlock shows up in a browser, a messaging app says "end-to-end encrypted," or a password is stored as a scrambled hash. Today you'll **compare** the main crypto tools, **model** how software protects data in transit, and **evaluate tradeoffs** so you can recommend the right protection for a job — not how to break crypto.\n\nHere's our roadmap:\n\n• **What cryptography is for** — confidentiality and integrity as separate jobs.\n• **Compare** symmetric vs asymmetric vs hashing — what each solves and costs.\n• **Digital signatures** — proving authorship with key pairs.\n• **Key management tradeoffs** — rotation, usability, and who holds the secret.\n• **Secure transmission model** — trust keys → encrypt → authenticate the other party.\n• **Limits** — what crypto does *not* fix.\n\nHigh-school depth means you can justify a choice: when is a shared passphrase enough, when do you need public-key exchange, and when is a hash the right tool?`,
        callout: {
          label: "Why it matters",
          text: "\"Encrypted\" is a marketing word until you can compare *what* was protected, *with which tool*, and what still fails if a key leaks or a device is compromised.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "A plain-English crypto glossary",
        body: `These words sound intimidating. They're simpler than they look:\n\n• **Cryptography** — the science of protecting information so only the right people can read or verify it.\n• **Encryption** — scrambling readable data (**plaintext**) into unreadable data (**ciphertext**) using a **key**.\n• **Decryption** — turning ciphertext back into plaintext with the right key.\n• **Key** — a secret (or pair of secrets) that controls who can encrypt/decrypt.\n• **Hash** — a fixed-size "fingerprint" of data; you can't reverse it to get the original back.\n• **Digital signature** — a cryptographic stamp proving who created or approved a message.\n• **Integrity** — knowing data hasn't been changed in transit or at rest.\n\nWe'll use each of these in context next — no need to memorize first.`,
        callout: {
          label: "Pro tip",
          text: "If a word feels fuzzy, swap in the plain meaning: \"encrypt\" ≈ \"lock with a key\"; \"hash\" ≈ \"fingerprint you can't undo.\"",
        },
      },
      {
        id: "what-crypto-does",
        kicker: "The big idea",
        title: "Crypto protects confidentiality and helps prove integrity",
        body: `**Cryptography** helps with two goals from the CIA triad you've already met:\n\n• **Confidentiality** — encryption keeps outsiders from reading the message even if they intercept it.\n• **Integrity** — hashing (and related techniques) helps detect if data was altered.\n\nPicture a locked mailbox. Encryption is the lock: without the key, the letter looks like gibberish. A hash is more like a seal on the envelope: if someone opens and changes the letter, the seal won't match anymore — you know something's wrong even if you don't know *what* changed.\n\nCrypto does **not** automatically make you anonymous, stop phishing, or fix a weak password you reuse everywhere. It protects *data* under specific rules — people and processes still matter.`,
        bullets: [
          "**Encryption** → confidentiality (harder to read stolen data).",
          "**Hashing** → integrity checks (detect changes).",
          "Crypto is a tool — not a complete security plan by itself.",
        ],
        callout: {
          label: "Watch out",
          text: "\"We're encrypted\" on a website or app is a good sign, but it doesn't mean the company is trustworthy, bug-free, or immune to social engineering.",
        },
      },
      {
        id: "cia-example",
        kicker: "See it in action",
        title: "Same message, two different protections",
        body: `Imagine you text a friend: "Meet me at the library at 4, bring the flash drive with the project."\n\n• If the app **encrypts** that message, anyone intercepting your Wi-Fi traffic sees scrambled bytes instead of readable words — that's **confidentiality** at work.\n• If the app also uses **integrity checks**, your friend's device can tell whether that exact message arrived unmodified — no one could have quietly changed "library" to "parking lot" along the way.\n\nNotice these are two *separate* jobs. A system could theoretically encrypt without checking integrity, or check integrity on data that isn't secret at all (like verifying a public software download hasn't been tampered with). Good systems usually do both, but knowing the difference helps you evaluate security claims instead of just trusting the word "encrypted."`,
        checkIn: {
          prompt: "A messaging app claims your chats are 'encrypted.' What does that claim mainly promise?",
          choices: [
            "That the content is scrambled so outsiders intercepting it can't easily read it",
            "That the recipient is definitely a real person” belongs to a different situation than the one in the question stem",
            "That the company will never make mistakes” belongs to a different situation than the one in the question stem",
            "That the message can never be deleted” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Encryption's core promise is confidentiality in transit/storage — it says nothing about company trustworthiness or who is really on the other end.",
        },
      },
      {
        id: "symmetric",
        kicker: "One shared secret",
        title: "Symmetric encryption: same key both ways",
        image: "/images/lessons/cs-9-2.png",
        imageAlt: "Same key used to lock and unlock a padlock representing symmetric encryption",
        body: `In **symmetric encryption**, the **same key** locks and unlocks the data. You and your friend both need that shared secret.\n\nAnalogy: a house key. The same physical key locks and unlocks the door. It's fast and efficient — great for encrypting large amounts of data (like a whole file or a video call stream).\n\n**Tradeoff to evaluate:** speed and simplicity vs **key distribution** and **blast radius**. Symmetric crypto wins on performance, but every person who needs access must get the same secret safely — and if it leaks, everything encrypted with it is exposed until you rotate. For a two-person club file, a carefully shared passphrase can be feasible. For a class of thirty who join and leave mid-year, the same approach becomes an ethics-and-operations problem: old members still know the secret unless you rotate every change.\n\nDefenders don't invent ciphers — they choose when a shared secret is acceptable and when they need a better distribution story (asymmetric exchange, password manager share, or a managed vault).`,
        callout: {
          label: "Defender view",
          text: "Recommend symmetric crypto for bulk data *after* you have a plan for who gets the key, how it is shared, and when it rotates — not before.",
        },
      },
      {
        id: "symmetric-example",
        kicker: "See it in action",
        title: "Why key distribution is the hard part",
        body: `Say two club officers want to encrypt a shared budget file with a symmetric passphrase so only they can open it.\n\n**Risky approach:** one officer types the passphrase into the group chat so "everyone with access can open it." Now the "secret" key lives in chat history, screenshots, and phone backups — anyone who ever sees that message can decrypt the file forever, even after they leave the club.\n\n**Better approach:** share the passphrase out-of-band (in person, over a call, or through a password manager's secure-share feature), and **rotate** it if membership changes or a device is lost.\n\nThis is the core tension of symmetric encryption: the algorithm can be extremely strong, but if the *key* travels through weak channels, the whole protection collapses. That's why real systems often use asymmetric encryption just to solve this one problem — safely delivering a symmetric key. We'll see how next.`,
        checkIn: {
          prompt: "What is the main challenge with symmetric encryption?",
          choices: [
            "It cannot be used for text messages” belongs to a different situation than the one in the question stem",
            "It is always too slow to use for large files” belongs to a different situation than the one in the question stem",
            "Safely distributing the one shared key without it leaking",
            "It requires a certificate authority” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "Symmetric encryption is fast, but both parties need the same secret key — and getting it to them securely (key distribution) is the hard problem.",
        },
      },
      {
        id: "asymmetric",
        kicker: "Two related keys",
        title: "Asymmetric encryption: public and private keys",
        body: `**Asymmetric encryption** (also called **public-key cryptography**) uses a **key pair**:\n\n• A **public key** you can share freely — like a padlock anyone can snap shut.\n• A **private key** you keep secret — like the only key that opens that padlock.\n\nSomeone can encrypt a message *to you* with your public key; only your private key can decrypt it. This solves the key-distribution problem from the last section: you never need to secretly hand anyone your private key.\n\n**Tradeoff to evaluate:** safer key distribution and signatures vs computational cost and private-key custody. Asymmetric crypto is slower for big data, so real software often uses it briefly to *agree on* a temporary symmetric key, then switches to fast symmetric encryption for the session — modeling secure transmission as a hybrid, not a single algorithm.\n\n**Compare the three tools:**\n• **Symmetric** — confidentiality at speed; shared secret must stay secret among the right people.\n• **Asymmetric** — confidentiality + identity/auth features without sharing a private key; heavier for bulk data.\n• **Hashing** — integrity fingerprints; not reversible confidentiality.`,
        bullets: [
          "**Public key** = shareable; used to encrypt *to* you.",
          "**Private key** = secret; used to decrypt (and to sign).",
          "Losing a private key is like losing the only key to your vault — revoke/replace, don't hope.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"Public\" doesn't mean unsafe. The public key is *meant* to be public. The private key must stay private — forever.",
        },
      },
      {
        id: "signatures",
        kicker: "Proving authorship",
        title: "Digital signatures: the other use of key pairs",
        body: `Key pairs work in reverse too, creating **digital signatures**:\n\n1. You run your message through a hash function to get a fingerprint.\n2. You encrypt that fingerprint with your **private key** — this is your signature.\n3. Anyone with your **public key** can decrypt the signature and check it matches the message's fingerprint.\n\nIf it matches, two things are proven: the message came from someone holding your private key, and it wasn't altered afterward (integrity again). Software updates, some official documents, and secure email can be signed this way so recipients know they're getting the real thing from the real sender.\n\nSame two keys, opposite direction: encrypting *to* someone uses their public key; signing *as* someone uses your own private key.`,
        checkIn: {
          prompt: "In a digital signature, which key does the sender use to create the signature?",
          choices: [
            "Their own public key",
            "Their own private key",
            "The recipient's private key",
            "A shared symmetric key",
          ],
          correctIndex: 1,
          explanation:
            "Signing uses the sender's private key. Anyone can then verify it using the sender's public key — proving authorship and integrity.",
        },
      },
      {
        id: "hashing",
        kicker: "One-way fingerprints",
        title: "Hashing checks integrity (and protects stored passwords)",
        image: "/images/lessons/cs-9-3.png",
        imageAlt: "Document feeding into a blender icon becoming a short hash fingerprint for integrity",
        body: `A **hash** takes any input and produces a fixed-size output that looks random. Change one letter in the input and the hash changes completely. Importantly, hashing is designed to be **one-way**: you shouldn't be able to reverse a hash back into the original data.\n\nDefenders use hashes to:\n\n• Verify a downloaded file matches the publisher's fingerprint.\n• Detect unauthorized changes to important files.\n• Store **password hashes** instead of plain passwords (with extra protective techniques) so a stolen database doesn't instantly reveal every password.\n\nHashing is **not** encryption. Encryption is meant to be reversed with a key. Hashing is meant to *not* be reversed.`,
        callout: {
          label: "Myth check",
          text: "If a site \"hashes passwords,\" that helps — but you still need unique, strong passwords and MFA. A weak password can still be guessed even when only hashes are stored.",
        },
      },
      {
        id: "hashing-example",
        kicker: "See it in action",
        title: "Why one changed letter matters",
        body: `Hash the word \`Password1\` and you'd get some long fixed-length string of letters and numbers. Hash \`password1\` (lowercase P) and the result is **completely different** — not just slightly changed. That "avalanche effect" is intentional: it's what makes hashes useful for spotting even tiny tampering.\n\nPractical defender use: a school publishes a checksum (hash) alongside a software download. Before running the installer, you can hash the file you downloaded yourself and compare it to the published value. If they match, the file wasn't corrupted or swapped in transit. If they don't match, something changed — don't run it.\n\nFor passwords, when you type your password to log in, the site hashes what you typed and compares it to the stored hash — it never needs to know or store your actual password to check it.`,
        checkIn: {
          prompt: "Why do many sites store a hash of your password instead of the password itself?",
          choices: [
            "Hashing makes your password shorter to save storage” belongs to a different situation than the one in the question stem",
            "Hashing is required by every web browser” belongs to a different situation than the one in the question stem",
            "Hashes make it easier for the site to read your password later” belongs to a different situation than the one in the question stem",
            "So a stolen database doesn't instantly reveal plain-text passwords, since hashes are one-way",
          ],
          correctIndex: 3,
          explanation:
            "One-way hashes let the site verify your password at login without ever storing the readable version — reducing damage from a breach.",
        },
      },
      {
        id: "key-management",
        kicker: "Protect the secret",
        title: "Key management: the part that actually breaks systems",
        image: "/images/lessons/cs-9-4.png",
        imageAlt: "Illustration of a key vault icon with a rotation calendar reminder for key management",
        body: `Strong algorithms fail constantly for one boring reason: **the key wasn't protected**. Key management covers the whole lifecycle:\n\n• **Generation** — created with enough randomness that it can't be guessed.\n• **Storage** — kept somewhere access-controlled, not in plain-text files, sticky notes, or shared documents.\n• **Distribution** — shared through safe channels (see the symmetric example earlier).\n• **Rotation** — replaced periodically or immediately after a suspected leak or when someone with access leaves.\n• **Revocation** — the ability to invalidate a key/certificate quickly if it's compromised.\n\n**Key-management tradeoffs (recommend with justification):**\n• **Frequent rotation** improves recovery after leavers/leaks, but costs coordination time — clubs often under-rotate because usability wins until someone graduates with the passphrase.\n• **Shared team passphrase** is feasible for two officers; for a large roster, recommend a password-manager vault or per-person access so revocation doesn't require re-educating everyone.\n• **Convenience storage** (notes app, group chat) raises breach impact — recommend out-of-band share + vault even if it slows onboarding by a day.\n\nA weak lock with a perfectly guarded key can be safer in practice than a mathematically perfect lock with a key taped under the doormat.`,
        bullets: [
          "Generation, storage, distribution, rotation, revocation.",
          "Most real-world crypto failures are key-management failures, not math failures.",
          "Evaluate rotation frequency against membership churn — not against \"the algorithm feels strong.\"",
        ],
        callout: {
          label: "Defender view",
          text: "When you hear about a 'crypto breach' in the news, check the details — it's very often a leaked key or password, not a broken algorithm.",
        },
      },
      {
        id: "key-management-example",
        kicker: "See it in action",
        title: "A leaked key, traced to a lifecycle failure",
        body: `A robotics team encrypts its competition strategy files with a shared key. Six months later, a former member (who left on bad terms) still has the old key saved in a notes app from when they were on the team.\n\nWalking the lifecycle: **generation** was fine, **storage** was fine while they were active, but **rotation** and **revocation** never happened after they left. The "encryption" is now only protecting the team from people who were never on the team — not from the person most likely to misuse it.\n\nThe fix isn't a stronger algorithm. It's a process: whenever someone loses authorized access (graduates, quits, gets removed), rotate any shared keys/passwords they had, and note the date in a simple log. This is the same discipline as revoking building or account access — cryptography doesn't replace that housekeeping, it depends on it.`,
        checkIn: {
          prompt: "A team member with access to a shared encryption key leaves the group. What should defenders do?",
          choices: [
            "Rotate the key and update who has access, since the departed member still knows the old key",
            "Nothing — encryption keys never need to change” belongs to a different situation than the one in the question stem",
            "Switch from encryption to hashing instead” belongs to a different situation than the one in the question stem",
            "Make the key public so everyone can verify it” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Key rotation after someone loses authorized access is a core key-management practice — the algorithm staying strong doesn't help if an outdated key is still known.",
        },
      },
      {
        id: "trust-chain",
        kicker: "Bridge to HTTPS",
        title: "Trustworthy keys, integrity, and authenticating the other party",
        body: `Encryption only works when the **keys and certificates** are trustworthy. Scrambling data with a key an impostor gave you protects you from nobody — or from the wrong party.\n\n**Model secure transmission conceptually (software's job, not yours to reinvent):**\n\n**1. Obtain trustworthy keys/certificates** — Know who issued them and whether you trust that issuer (certificates deepen this next lesson).\n**2. Confidentiality** — Encrypt so outsiders cannot read intercepted traffic (often hybrid: asymmetric handshake → symmetric session).\n**3. Integrity + authentication** — Detect tampering and confirm you are talking to the real server or person, not a middle impostor.\n\nThe order matters: trust the key material first, then encrypt, then keep verifying the other party. Software (browsers, messaging apps, OS crypto libraries) automates this model so users aren't doing hand-rolled math — your job is to evaluate whether a tool's claims match this model, and to protect keys/endpoints outside it.`,
        bullets: [
          "Encryption needs **trustworthy keys/certs** — not just any random key.",
          "Pair **confidentiality** with **integrity** and **authenticating the other party**.",
          "Prefer well-tested software that implements the hybrid model — don't invent your own transmission scheme.",
        ],
        callout: {
          label: "Defender view",
          text: "Crypto goals map to confidentiality, integrity, and authentication — plus careful key handling. Missing any leg weakens the whole stool.",
        },
      },
      {
        id: "trust-chain-example",
        kicker: "See it in action",
        title: "A simplified look at how HTTPS agrees on a key",
        body: `When your browser connects to a site over HTTPS, a simplified version of what happens (no math required) is:\n\n1. The server presents a **certificate** containing its public key (more on this next lesson).\n2. Your browser checks the certificate looks legitimate for that domain.\n3. Browser and server use **asymmetric** techniques to safely agree on a temporary **symmetric** key — without ever sending that symmetric key in the clear.\n4. The rest of the session uses fast **symmetric encryption** with that temporary key, so pages load quickly while staying protected.\n5. **Integrity checks** run continuously so neither side can quietly tamper with the data mid-session.\n\nThis is exactly the "public key solves distribution, symmetric key handles speed, hashing/signatures handle integrity" pattern from this lesson — just applied at massive scale, automatically, every time you open a website.`,
        image: "/images/lessons/cs-9-5.png",
        imageAlt: "Simplified diagram of browser and server agreeing on a temporary session key over HTTPS",
        checkIn: {
          prompt: "Why do secure connections like HTTPS often use asymmetric crypto briefly, then switch to symmetric crypto?",
          choices: [
            "Asymmetric crypto safely solves key distribution; symmetric crypto is faster for the bulk of the data afterward",
            "A rushed pass can land on symmetric crypto cannot encrypt web pages”; careful readers reject it for this problem",
            "“Browsers are not allowed to use two types of encryption” describes a different situation than the one in the question stem",
            "“Asymmetric crypto is illegal to use for long sessions” describes a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "This hybrid approach gets the best of both: safe key exchange via asymmetric crypto, then fast bulk encryption via symmetric crypto.",
        },
      },
      {
        id: "myths",
        kicker: "Reality check",
        title: "Common crypto myths defenders should retire",
        body: `A few beliefs sound reasonable but lead people astray:\n\n• **"Longer passwords are the same as strong encryption."** Password strength and algorithm strength are related but different problems — a weak, guessable password can undermine even great encryption.\n• **"If I invent my own secret cipher, it's safer because attackers won't know it."** Security-through-obscurity rarely holds up; well-reviewed, public, widely-tested algorithms are safer than homemade ones nobody has stress-tested.\n• **"Encrypted means unhackable forever."** Algorithms can weaken over decades as computing power grows; that's why defenders track updated standards instead of assuming "encrypted" is permanent.\n• **"Hashing and encryption are basically the same thing."** They solve different problems — reversible vs one-way — and mixing them up leads to bad design choices.`,
        bullets: [
          "Don't invent your own crypto — use trusted, well-tested libraries and standards.",
          "Strong encryption + weak password = still a weak system overall.",
          "\"Encrypted\" is not a permanent guarantee — standards evolve.",
        ],
        callout: {
          label: "Common misconception",
          text: "A secret, custom-built algorithm is not automatically safer than a public one. Public algorithms have survived years of expert scrutiny; secret ones usually haven't been tested at all.",
        },
      },
      {
        id: "limits",
        kicker: "Reality check",
        title: "What cryptography does — and doesn't — solve",
        body: `Crypto is powerful, but it has clear boundaries:\n\n• It **does** make intercepted traffic hard to read (when implemented and configured correctly).\n• It **does** help detect tampering when hashes/signatures are checked.\n• It **doesn't** stop someone from tricking you into clicking a fake login page.\n• It **doesn't** stop malware already running on your device from reading data *before* it's encrypted.\n• It **doesn't** fix poor access control, missing updates, or leaked private keys.\n\nThink of crypto as a strong lock on a door. Locks matter — but you still need good habits, trustworthy software, and a plan when something goes wrong.`,
        bullets: [
          "Protect **keys** as carefully as the data.",
          "Prefer well-known, updated tools — don't invent your own crypto.",
          "Pair crypto with MFA, patching, and phishing awareness.",
        ],
        checkIn: {
          prompt: "A file is properly encrypted, but malware on the device reads it right before encryption happens. What does this show?",
          choices: [
            "Crypto protects data under specific conditions — it cannot fix a device that's already compromised",
            "Encryption is worthless and should never be used” belongs to a different situation than the one in the question stem",
            "“Hashing would have prevented this instead” describes a different situation than the one in the question stem",
            "The encryption algorithm must have been broken” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Crypto protects data in transit/storage under the rules it operates within. It can't defend against a compromised endpoint reading data before protection is applied — that's why patching and malware awareness still matter.",
        },
      },
      {
        id: "checklist",
        kicker: "Put it together",
        title: "A defender's crypto habits checklist",
        body: `Bring the whole lesson together into habits you can actually use:\n\n**1. Prefer HTTPS** for logins, forms, and anything personal.\n**2. Use trusted apps** for encrypted messaging — don't build your own cipher for "fun."\n**3. Protect keys and passphrases** like the data itself — no chat logs, no sticky notes.\n**4. Rotate access** when people leave a team, club, or role.\n**5. Verify integrity** when it matters — check published checksums for important downloads.\n**6. Pair crypto with MFA and updates** — it's one layer, not the whole plan.\n**7. Stay skeptical of "unbreakable forever" claims** — standards evolve; so should your tools.\n\nThat's a working crypto mindset — practical, not mathematical.`,
        callout: {
          label: "Try this week",
          text: "Notice one place you already rely on crypto (HTTPS padlock, encrypted messaging, device lock). Ask: what would still go wrong if someone phished my password, and how would MFA help?",
        },
      },
      {
        id: "crypto-decisions",
        kicker: "Decision checklist",
        title: "Choosing crypto protections in everyday tools",
        body: `When a tool says "encrypted," **compare** what job it is actually doing and **recommend** based on the data's risk:

• **In transit** — HTTPS or encrypted chat protects content on the wire.
• **At rest** — device encryption or encrypted storage protects files if the device is stolen.
• **Integrity** — hashes or signatures prove a file or update was not tampered with.
• **Authentication** — signatures prove who approved a message or update.

**Comparison — recommend with tradeoffs:**
• Browser padlock → confidentiality + integrity of the *connection* to that server (not honesty of the site).
• Encrypted messaging app → strong confidentiality between endpoints if implemented well; still fails if a phone is unlocked/stolen.
• Password hash on server → protects stored credentials at rest; does not protect a live phished session.
• File checksum published by vendor → integrity for downloads; not secrecy of the file contents.

List which questions matter for the data you handle, then pick tools that answer those — justify the tradeoff (speed vs key custody, convenience vs rotation discipline), not the marketing slogan.`,
      },
      {
        id: "key-leak-response",
        kicker: "What to do next",
        title: "If a shared key or passphrase leaks",
        body: `**Scenario:** A club officer posts the team's encryption passphrase in a public group chat by mistake.

**Immediate steps:**
1. **Rotate** — generate a new key/passphrase and re-encrypt or re-share files through a safer channel.
2. **Revoke** — remove access for anyone who should no longer have the old key.
3. **Assume compromise** — treat anything protected only by the old key as potentially readable.
4. **Notify** — tell the advisor and affected members what rotated and when.
5. **Log** — note the incident in club records (date, what leaked, what changed).

**Myth:** "We deleted the chat message, so we're fine." Screenshots, notifications, and backups may already exist.

Key leaks are process problems, not math problems. Rotation speed matters more than debating cipher strength.`,
        callout: {
          label: "Defender view",
          text: "Treat passphrases like house keys — if one copy lands in the wrong hands, you change the lock, not just hope nobody noticed.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Compare** tools: **symmetric** (fast shared secret), **asymmetric** (public/private; distribution + signatures), **hashing** (one-way integrity — not encryption).\n• **Model secure transmission**: trustworthy keys → confidentiality → integrity + authenticating the other party (often hybrid crypto in software).\n• **Evaluate tradeoffs**: speed vs key distribution; rotation discipline vs usability; shared passphrase vs managed vault as membership grows.\n• **Key management** lifecycle failures beat math failures in the real world.\n• Crypto protects data under rules — it doesn't replace MFA, patching, or phishing defense.\n\nWhen you're ready, switch to the **Knowledge check**, then justify a crypto recommendation for a real scenario.`,
      },
    ],
  },
  bigIdeas: [
    "**Compare** encryption (confidentiality) with **hashing** (one-way integrity) — they answer different questions.",
    "**Symmetric** vs **asymmetric** tradeoffs: speed and shared-secret risk vs safer distribution and signatures; real software often hybridizes both for secure transmission.",
    "Most real crypto failures are **key-management** failures — evaluate rotation, storage, and custody tradeoffs, because crypto alone can't fix phishing or a compromised device.",
  ],
  keyTerms: [
    { term: "Cryptography", definition: "Techniques for protecting information so only authorized people can read or verify it." },
    { term: "Encryption", definition: "Turning readable plaintext into unreadable ciphertext using a key." },
    { term: "Symmetric encryption", definition: "Encryption that uses the same shared secret key to encrypt and decrypt." },
    { term: "Asymmetric encryption", definition: "Encryption that uses a public key (shareable) and a private key (secret)." },
    { term: "Digital signature", definition: "A cryptographic stamp created with a private key that proves authorship and integrity." },
    { term: "Hash", definition: "A one-way fingerprint of data used to check integrity; not meant to be reversed." },
    { term: "Key management", definition: "The lifecycle of generating, storing, distributing, rotating, and revoking cryptographic keys." },
    { term: "Plaintext / Ciphertext", definition: "Plaintext is readable data; ciphertext is the encrypted form." },
    { term: "Integrity", definition: "Assurance that data has not been altered unexpectedly." },
    { term: "Certificate", definition: "A digital document that helps prove a public key belongs to a specific server or organization (preview for next lesson)." },
  ],
  realWorld:
    "When you open a banking site over **HTTPS**, your browser and the server use asymmetric crypto to safely agree on a temporary **symmetric** key, so account details travel as **ciphertext**. Separately, your password should be stored as a **hash** on the server — never as plain text.",
  quiz: [
    {
      id: "q1",
      question: "What is the main goal of encryption?",
      choices: [
            "Make websites load faster” belongs to a different situation than the one in the question stem",
            "Delete malware automatically” belongs to a different situation than the one in the question stem",
            "Prove a file was never created” belongs to a different situation than the one in the question stem",
            "Keep data confidential by scrambling it with a key",
          ],
      correctIndex: 3,
      explanation:
        "Encryption turns plaintext into ciphertext so unauthorized people can't read it without the key — that's confidentiality.",
    },
    {
      id: "q2",
      question: "A club must encrypt a large video archive for two officers only, and both can meet in person once. Which recommendation best balances the tradeoffs?",
      choices: [
            "Invent a custom cipher so outsiders won't know the algorithm” belongs to a different situation than the one in the question stem",
            "Hash the videos instead, because hashing provides confidentiality” belongs to a different situation than the one in the question stem",
            "Post the private key in the group chat so everyone can help verify it” belongs to a different situation than the one in the question stem",
            "Use strong symmetric encryption with an out-of-band shared passphrase, then rotate if membership changes",
          ],
      correctIndex: 3,
      explanation:
        "Symmetric encryption fits bulk data and a tiny trusted group; in-person/out-of-band sharing solves distribution. Hashing is not confidentiality, and homemade crypto is unsafe.",
    },
    {
      id: "q3",
      question: "Why do defenders prefer storing password hashes instead of plain passwords?",
      choices: [
            "Hashes are one-way fingerprints, so a stolen database shouldn't instantly reveal original passwords",
            "“Hashes remove the need for MFA forever” describes a different situation than the one in the question stem",
            "Hashing encrypts passwords with a public key that anyone can reverse” belongs to a different situation than the one in the question stem",
            "Hashes make passwords easier for users to remember” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "Hashes are designed to be one-way. Storing hashes (with modern protective techniques) reduces the damage of a database breach — though weak passwords can still be guessed, and MFA is still needed.",
    },
    {
      id: "q4",
      question: "You need to prove a published software download was not altered, but the file itself is not secret. Which crypto tool should you recommend, and why?",
      choices: [
            "No crypto tool applies — integrity only matters for passwords” belongs to a different situation than the one in the question stem",
            "Symmetric encryption, because secrecy and integrity are the same job” belongs to a different situation than the one in the question stem",
            "A vendor-published hash/checksum (and optionally a signature) to verify integrity without needing confidentiality",
            "Asymmetric encryption of the whole file, because hashes cannot detect changes” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Integrity for public downloads is a hashing/signature job. Encryption adds confidentiality you may not need and does not replace an integrity check.",
    },
    {
      id: "q5",
      question: "A digital signature is created using which key?",
      choices: [
        "The signer's public key",
        "A symmetric key shared by everyone",
        "The signer's private key",
        "No key is needed for signatures",
      ],
      correctIndex: 2,
      explanation:
        "Signing uses the private key; anyone can then verify the signature with the corresponding public key.",
    },
    {
      id: "q6",
      question: "Why do secure web sessions often use asymmetric crypto briefly, then switch to symmetric crypto for the rest of the traffic?",
      choices: [
            "It can seem like browsers are forbidden from using more than one crypto tool, but that reading skips the distinction this question is testing",
            "A common mix-up is to treat asymmetric crypto is illegal for long sessions as enough, which confuses a nearby idea with the right one",
            "Asymmetric crypto safely helps agree on keys; symmetric crypto is faster for bulk data afterward — a deliberate speed vs distribution tradeoff",
            "It can seem like symmetric crypto cannot encrypt web pages at all, but that reading skips the distinction this question is testing",
          ],
      correctIndex: 2,
      explanation:
        "Hybrid design models secure transmission: asymmetric techniques solve key agreement; symmetric encryption carries the session efficiently.",
    },
    {
      id: "q7",
      question: "Fifteen club members share one encryption passphrase in a chat archive. Three graduate. What is the best justified key-management recommendation?",
      choices: [
            "Switch from encryption to hashing of the files, since hashing revokes access automatically” belongs to a different situation than the one in the question stem",
            "“Publish the passphrase so remaining members can verify it” describes a different situation than the one in the question stem",
            "Rotate to a new secret via a safer channel (or move to a managed vault), because departed members still know the old key",
            "Keep the same passphrase — encryption strength does not depend on who knows it” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Membership churn makes shared secrets a lifecycle risk. Rotation (or better access control) is the justified response — hashing does not revoke access.",
    },
    {
      id: "q8",
      question: "A messaging app says chats are encrypted. Which problem can crypto alone still fail to stop, and what does that imply for recommendations?",
      choices: [
            "Someone phishing you into revealing your login code — so recommend MFA and phishing resistance alongside encryption",
            "Using a public key to encrypt a message to you — so asymmetric crypto should be banned” belongs to a different situation than the one in the question stem",
            "Turning plaintext into ciphertext — so hashing should replace encryption” belongs to a different situation than the one in the question stem",
            "Eavesdroppers reading properly encrypted traffic without the keys — so encryption is useless” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "Encryption protects data under its rules. Recommend layered controls (MFA, phishing skepticism) for threats crypto cannot cover.",
    },
  ],
  reflection: {
    prompt:
      "A robotics club wants to protect competition strategy docs shared among six officers who change each semester. Recommend a crypto approach (symmetric, asymmetric/hybrid, hashing — or a combination) and justify the tradeoffs: key distribution, rotation when members leave, and what still fails if someone's phone is stolen or they get phished.",
    placeholder: "Example: I'd recommend… because… Tradeoff: … If a phone is stolen or phishing succeeds…",
  },
};
