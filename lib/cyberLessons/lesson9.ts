import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson9: AILessonConfig = {
  id: "cs-9",
  title: "9. Cryptography Basics",
  goal: "Understand what cryptography does for confidentiality and integrity — symmetric vs asymmetric encryption, hashing, keys, and digital signatures — and what crypto alone cannot solve.",
  xpReward: 450,
  badge: "Cipher Starter",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/8",
  nextHref: "/learn/cyber/10",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-9.png",
        imageAlt: "Two locked boxes and two keys on a desk illustrating encryption concepts for students",
        body: `You've used encryption thousands of times without noticing — every time a padlock shows up in a browser, a messaging app says "end-to-end encrypted," or a password is stored as a scrambled hash. Today you'll learn the **ideas** behind that protection, not how to break it.\n\nHere's our roadmap:\n\n• **What cryptography is for** — protecting confidentiality and checking integrity.\n• **Symmetric encryption** — one shared secret key.\n• **Asymmetric encryption** — public and private key pairs, plus digital signatures.\n• **Hashing** — one-way fingerprints for integrity (and why passwords aren't stored as plain text).\n• **Key management** — why protecting the key matters as much as the algorithm.\n• **Trust chains** — how encryption connects to certificates (bridge to next lesson).\n• **Limits** — what crypto does *not* fix.\n\nThis is defender knowledge: you need to know what "encrypted" really promises so you can choose tools wisely and spot marketing hype. NIST's cybersecurity awareness framing calls this a **Protect**-category skill — safeguarding data through cryptographic controls.`,
        callout: {
          label: "Why it matters",
          text: "Crypto is a core building block of modern security. Understanding it helps you trust the right systems — and question claims that sound too perfect.",
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
            "That the company will never make mistakes",
            "That the content is scrambled so outsiders intercepting it can't easily read it",
            "That the message can never be deleted",
            "That the recipient is definitely a real person",
          ],
          correctIndex: 1,
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
        body: `In **symmetric encryption**, the **same key** locks and unlocks the data. You and your friend both need that shared secret.\n\nAnalogy: a house key. The same physical key locks and unlocks the door. It's fast and efficient — great for encrypting large amounts of data (like a whole file or a video call stream).\n\nThe hard part is **key distribution**: how do you safely give someone the shared key without an eavesdropper grabbing it? If the key leaks, an attacker can decrypt everything that used it. Defenders care a lot about storing and rotating those keys carefully.`,
        callout: {
          label: "Defender view",
          text: "Symmetric crypto is everywhere under the hood. Your job isn't to invent ciphers — it's to use trusted apps and keep keys/passphrases out of chat logs, sticky notes, and shared folders.",
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
            "It is always too slow to use for large files",
            "Safely distributing the one shared key without it leaking",
            "It cannot be used for text messages",
            "It requires a certificate authority",
          ],
          correctIndex: 1,
          explanation:
            "Symmetric encryption is fast, but both parties need the same secret key — and getting it to them securely (key distribution) is the hard problem.",
        },
      },
      {
        id: "asymmetric",
        kicker: "Two related keys",
        title: "Asymmetric encryption: public and private keys",
        body: `**Asymmetric encryption** (also called **public-key cryptography**) uses a **key pair**:\n\n• A **public key** you can share freely — like a padlock anyone can snap shut.\n• A **private key** you keep secret — like the only key that opens that padlock.\n\nSomeone can encrypt a message *to you* with your public key; only your private key can decrypt it. This solves the key-distribution problem from the last section: you never need to secretly hand anyone your private key.\n\nAsymmetric crypto is slower for big data, so real systems often use it to *safely exchange* a temporary symmetric key, then switch to fast symmetric encryption for the rest of the session — the best of both worlds.`,
        bullets: [
          "**Public key** = shareable; used to encrypt *to* you.",
          "**Private key** = secret; used to decrypt.",
          "Losing a private key is like losing the only key to your vault.",
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
            "Hashes make it easier for the site to read your password later",
            "So a stolen database doesn't instantly reveal plain-text passwords, since hashes are one-way",
            "Hashing is required by every web browser",
            "Hashing makes your password shorter to save storage",
          ],
          correctIndex: 1,
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
        body: `Strong algorithms fail constantly for one boring reason: **the key wasn't protected**. Key management covers the whole lifecycle:\n\n• **Generation** — created with enough randomness that it can't be guessed.\n• **Storage** — kept somewhere access-controlled, not in plain-text files, sticky notes, or shared documents.\n• **Distribution** — shared through safe channels (see the symmetric example earlier).\n• **Rotation** — replaced periodically or immediately after a suspected leak or when someone with access leaves.\n• **Revocation** — the ability to invalidate a key/certificate quickly if it's compromised.\n\nA weak lock with a perfectly guarded key can be safer in practice than a mathematically perfect lock with a key taped under the doormat. Defenders spend real effort on the boring lifecycle work — not just picking a fancy algorithm.`,
        bullets: [
          "Generation, storage, distribution, rotation, revocation.",
          "Most real-world crypto failures are key-management failures, not math failures.",
          "Rotate keys/passwords when people leave or a leak is suspected.",
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
            "Nothing — encryption keys never need to change",
            "Rotate the key and update who has access, since the departed member still knows the old key",
            "Make the key public so everyone can verify it",
            "Switch from encryption to hashing instead",
          ],
          correctIndex: 1,
          explanation:
            "Key rotation after someone loses authorized access is a core key-management practice — the algorithm staying strong doesn't help if an outdated key is still known.",
        },
      },
      {
        id: "trust-chain",
        kicker: "Bridge to HTTPS",
        title: "Trustworthy keys, integrity, and authenticating the other party",
        body: `Encryption only works when the **keys and certificates** are trustworthy. Scrambling data with a key an impostor gave you protects you from nobody — or from the wrong party.\n\nA complete defender mental model pairs three goals:\n\n**1. Obtain trustworthy keys/certificates** — Know who issued them and whether you trust that issuer (certificates preview this in the next lesson).\n**2. Confidentiality** — Encrypt so outsiders cannot read intercepted traffic.\n**3. Integrity + authentication** — Detect tampering and confirm you are talking to the real server or person, not a middle impostor.\n\nReal systems often combine asymmetric crypto (to agree on keys safely) with symmetric crypto (for speed), plus hashes or signatures for integrity. The order matters conceptually: trust the key material first, then encrypt, then verify the other party hasn't been swapped out mid-conversation.`,
        bullets: [
          "Encryption needs **trustworthy keys/certs** — not just any random key.",
          "Pair **confidentiality** with **integrity** and **authenticating the other party**.",
          "Certificates (next lesson) help browsers decide which servers to trust.",
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
            "Asymmetric crypto is illegal to use for long sessions",
            "Asymmetric crypto safely solves key distribution; symmetric crypto is faster for the bulk of the data afterward",
            "Symmetric crypto cannot encrypt web pages",
            "Browsers are not allowed to use two types of encryption",
          ],
          correctIndex: 1,
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
            "Encryption is worthless and should never be used",
            "Crypto protects data under specific conditions — it cannot fix a device that's already compromised",
            "The encryption algorithm must have been broken",
            "Hashing would have prevented this instead",
          ],
          correctIndex: 1,
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
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Cryptography** supports **confidentiality** (encryption) and **integrity** (hashing/signatures).\n• **Symmetric** = one shared key (fast, but distribution is hard); **asymmetric** = public/private key pair (solves distribution, enables signatures).\n• **Hashes** are one-way fingerprints — not the same as encryption.\n• **Key management** — generation, storage, distribution, rotation, revocation — is where most real failures happen.\n• Encryption needs **trustworthy keys/certs**; pair confidentiality with integrity and authenticating the other party.\n• Crypto is essential, but it doesn't replace good passwords, MFA, updates, or phishing defense.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on where you already trust encryption in daily life.`,
      },
    ],
  },
  bigIdeas: [
    "**Encryption** scrambles data for confidentiality; **hashing** creates one-way fingerprints for integrity.",
    "**Symmetric** crypto uses one shared key; **asymmetric** crypto uses a public/private key pair and enables digital signatures.",
    "Most real crypto failures come from **key management** mistakes, not broken math — and crypto alone can't fix phishing or a compromised device.",
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
        "Keep data confidential by scrambling it with a key",
        "Make websites load faster",
        "Delete malware automatically",
        "Prove a file was never created",
      ],
      correctIndex: 0,
      explanation:
        "Encryption turns plaintext into ciphertext so unauthorized people can't read it without the key — that's confidentiality.",
    },
    {
      id: "q2",
      question: "How is symmetric encryption different from asymmetric encryption?",
      choices: [
        "Symmetric encryption uses a public key that anyone can share freely",
        "Symmetric uses one shared key; asymmetric uses a public/private key pair",
        "Asymmetric encryption is really just another name for hashing",
        "They are different names for the exact same underlying process",
      ],
      correctIndex: 1,
      explanation:
        "Symmetric = same shared key both ways. Asymmetric = public key + private key working as a pair. Neither is the same as hashing.",
    },
    {
      id: "q3",
      question: "Why do defenders prefer storing password hashes instead of plain passwords?",
      choices: [
        "Hashes make passwords easier for users to remember",
        "Hashing encrypts passwords with a public key that anyone can reverse",
        "Hashes are one-way fingerprints, so a stolen database shouldn't instantly reveal original passwords",
        "Hashes remove the need for MFA forever",
      ],
      correctIndex: 2,
      explanation:
        "Hashes are designed to be one-way. Storing hashes (with modern protective techniques) reduces the damage of a database breach — though weak passwords can still be guessed, and MFA is still needed.",
    },
    {
      id: "q4",
      question: "Which statement about hashing vs encryption is correct?",
      choices: [
        "Hashing and encryption are the same process, just with different names",
        "Hashing is always reversible; encryption is never reversible",
        "Only hashing provides confidentiality of messages in transit",
        "Encryption is meant to be reversible with a key; hashing is meant to be one-way",
      ],
      correctIndex: 3,
      explanation:
        "Encryption is designed so authorized parties can decrypt. Hashing creates a fingerprint you shouldn't reverse.",
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
      question: "What is the biggest real-world risk in symmetric encryption?",
      choices: [
        "Safely distributing the shared key without it leaking",
        "The algorithm is always too weak to use in practice",
        "It cannot be used to encrypt data on phones",
        "It requires a certificate authority to function",
      ],
      correctIndex: 0,
      explanation:
        "Symmetric encryption's core challenge is getting the one shared key to the right people without it being intercepted.",
    },
    {
      id: "q7",
      question: "A team member with access to a shared encryption key leaves the group. What is the correct key-management response?",
      choices: [
        "Nothing — keys never need to change once they're created",
        "Publish the old key publicly so everyone can verify it",
        "Switch immediately from encryption to hashing instead",
        "Rotate the key and update access, since the departed member still knows the old one",
      ],
      correctIndex: 3,
      explanation:
        "Key rotation after someone loses authorized access is core key-management hygiene — most crypto failures are lifecycle failures, not math failures.",
    },
    {
      id: "q8",
      question: "A messaging app says chats are encrypted. Which problem can crypto alone still fail to stop?",
      choices: [
        "Eavesdroppers reading properly encrypted traffic without the keys",
        "Someone phishing you into revealing your login code",
        "Turning plaintext into ciphertext",
        "Using a public key to encrypt a message to you",
      ],
      correctIndex: 1,
      explanation:
        "Encryption protects data in transit/storage under its rules — it doesn't stop social engineering that tricks you into handing over access.",
    },
  ],
  reflection: {
    prompt:
      "Name one place you already rely on cryptography (browser padlock, encrypted chat, device encryption, etc.). What does it protect — and what could still go wrong if someone phished your password or a shared key leaked?",
    placeholder: "Example: My school email uses HTTPS… that protects the connection, but if I reuse a weak password…",
  },
};
