import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson9: AILessonConfig = {
  id: "cs-9",
  title: "9. Cryptography Basics",
  goal: "Understand what cryptography does for confidentiality and integrity — symmetric vs asymmetric encryption, hashing, and keys — and what crypto alone cannot solve.",
  xpReward: 450,
  badge: "Cipher Starter",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/8",
  nextHref: "/learn/cyber/10",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-9.png",
        imageAlt: "Two locked boxes and two keys on a desk illustrating encryption concepts for students",
        body: `You've used encryption thousands of times without noticing — every time a padlock shows up in a browser, a messaging app says "end-to-end encrypted," or a password is stored as a scrambled hash. Today you'll learn the **ideas** behind that protection, not how to break it.\n\nHere's our roadmap:\n\n• **What cryptography is for** — protecting confidentiality and checking integrity.\n• **Symmetric encryption** — one shared secret key.\n• **Asymmetric encryption** — public and private key pairs.\n• **Hashing** — one-way fingerprints for integrity (and why passwords aren't stored as plain text).\n• **Keys** — why protecting the key matters as much as the algorithm.\n• **Limits** — what crypto does *not* fix.\n\nThis is defender knowledge: you need to know what "encrypted" really promises so you can choose tools wisely and spot marketing hype.`,
        callout: {
          label: "Why it matters",
          text: "Crypto is a core building block of modern security. Understanding it helps you trust the right systems — and question claims that sound too perfect.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "A plain-English crypto glossary",
        body: `These words sound intimidating. They're simpler than they look:\n\n• **Cryptography** — the science of protecting information so only the right people can read or verify it.\n• **Encryption** — scrambling readable data (**plaintext**) into unreadable data (**ciphertext**) using a **key**.\n• **Decryption** — turning ciphertext back into plaintext with the right key.\n• **Key** — a secret (or pair of secrets) that controls who can encrypt/decrypt.\n• **Hash** — a fixed-size "fingerprint" of data; you can't reverse it to get the original back.\n• **Integrity** — knowing data hasn't been changed in transit or at rest.\n\nWe'll use each of these in context next — no need to memorize first.`,
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
        id: "asymmetric",
        kicker: "Two related keys",
        title: "Asymmetric encryption: public and private keys",
        body: `**Asymmetric encryption** (also called **public-key cryptography**) uses a **key pair**:\n\n• A **public key** you can share freely — like a padlock anyone can snap shut.\n• A **private key** you keep secret — like the only key that opens that padlock.\n\nSomeone can encrypt a message *to you* with your public key; only your private key can decrypt it. Related ideas power **digital signatures** (proving a message came from the private-key holder) and the trust model behind HTTPS (next lesson).\n\nAsymmetric crypto is slower for big data, so real systems often use it to *safely exchange* a temporary symmetric key, then switch to fast symmetric encryption for the rest of the session.`,
        bullets: [
          "**Public key** = shareable; used to encrypt *to* you (or verify your signature).",
          "**Private key** = secret; used to decrypt (or sign).",
          "Losing a private key is like losing the only key to your vault.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"Public\" doesn't mean unsafe. The public key is *meant* to be public. The private key must stay private — forever.",
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
        id: "trust-chain",
        kicker: "Bridge to HTTPS",
        title: "Trustworthy keys, integrity, and authenticating the other party",
        body: `Encryption only works when the **keys and certificates** are trustworthy. Scrambling data with a key an impostor gave you protects you from nobody — or from the wrong party.\n\nA complete defender mental model pairs three goals:\n\n**1. Obtain trustworthy keys/certificates** — Know who issued them and whether you trust that issuer (certificates preview this in the next lesson).\n**2. Confidentiality** — Encrypt so outsiders cannot read intercepted traffic.\n**3. Integrity + authentication** — Detect tampering and confirm you are talking to the real server or person, not a middle impostor.\n\nReal systems often combine asymmetric crypto (to agree on keys safely) with symmetric crypto (for speed), plus hashes or signatures for integrity. The order matters conceptually: trust the key material first, then encrypt, then verify the other party hasn't been swapped out mid-conversation.\n\n**Store keys safely** and rotate them when policy requires. A strong algorithm with a leaked private key is just a locked door with the key under the mat.`,
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
        id: "limits",
        kicker: "Reality check",
        title: "What cryptography does — and doesn't — solve",
        body: `Crypto is powerful, but it has clear boundaries:\n\n• It **does** make intercepted traffic hard to read (when implemented and configured correctly).\n• It **does** help detect tampering when hashes/signatures are checked.\n• It **doesn't** stop someone from tricking you into clicking a fake login page.\n• It **doesn't** stop malware already running on your device from reading data *before* it's encrypted.\n• It **doesn't** fix poor access control, missing updates, or leaked private keys.\n\nThink of crypto as a strong lock on a door. Locks matter — but you still need good habits, trustworthy software, and a plan when something goes wrong.`,
        bullets: [
          "Protect **keys** as carefully as the data.",
          "Prefer well-known, updated tools — don't invent your own crypto.",
          "Pair crypto with MFA, patching, and phishing awareness.",
        ],
        callout: {
          label: "Try this week",
          text: "Notice one place you already rely on crypto (HTTPS padlock, encrypted messaging, device lock). Ask: what would still go wrong if someone phished my password?",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Cryptography** supports **confidentiality** (encryption) and **integrity** (hashing/signatures).\n• **Symmetric** = one shared key; **asymmetric** = public/private key pair.\n• **Hashes** are one-way fingerprints — not the same as encryption.\n• Encryption needs **trustworthy keys/certs**; pair confidentiality with integrity and authenticating the other party.\n• Crypto is essential, but it doesn't replace good passwords, MFA, updates, or phishing defense.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on where you already trust encryption in daily life.`,
      },
    ],
  },
  bigIdeas: [
    "**Encryption** scrambles data for confidentiality; **hashing** creates one-way fingerprints for integrity.",
    "**Symmetric** crypto uses one shared key; **asymmetric** crypto uses a public/private key pair.",
    "Crypto is powerful but incomplete — keys, phishing, malware, and poor practices can still defeat it.",
  ],
  keyTerms: [
    { term: "Cryptography", definition: "Techniques for protecting information so only authorized people can read or verify it." },
    { term: "Encryption", definition: "Turning readable plaintext into unreadable ciphertext using a key." },
    { term: "Symmetric encryption", definition: "Encryption that uses the same shared secret key to encrypt and decrypt." },
    { term: "Asymmetric encryption", definition: "Encryption that uses a public key (shareable) and a private key (secret)." },
    { term: "Hash", definition: "A one-way fingerprint of data used to check integrity; not meant to be reversed." },
    { term: "Key", definition: "A secret (or key pair) that controls who can encrypt, decrypt, or sign data." },
    { term: "Plaintext / Ciphertext", definition: "Plaintext is readable data; ciphertext is the encrypted form." },
    { term: "Integrity", definition: "Assurance that data has not been altered unexpectedly." },
    { term: "Certificate", definition: "A digital document that helps prove a public key belongs to a specific server or organization (preview for next lesson)." },
  ],
  realWorld:
    "When you open a banking site over **HTTPS**, your browser and the server negotiate encryption so account details travel as **ciphertext**. Separately, your password should be stored as a **hash** on the server — never as plain text.",
  quiz: [
    {
      id: "q1",
      question: "What is the main goal of encryption?",
      choices: [
        "Make websites load faster",
        "Keep data confidential by scrambling it with a key",
        "Delete malware automatically",
        "Prove a file was never created",
      ],
      correctIndex: 1,
      explanation:
        "Encryption turns plaintext into ciphertext so unauthorized people can't read it without the key — that's confidentiality.",
    },
    {
      id: "q2",
      question: "How is symmetric encryption different from asymmetric encryption?",
      choices: [
        "Symmetric uses one shared key; asymmetric uses a public/private key pair",
        "Symmetric is only for photos; asymmetric is only for text",
        "Asymmetric never uses keys",
        "They are different names for the exact same thing",
      ],
      correctIndex: 0,
      explanation:
        "Symmetric = same shared key both ways. Asymmetric = public key + private key working as a pair.",
    },
    {
      id: "q3",
      question: "Why do defenders prefer storing password hashes instead of plain passwords?",
      choices: [
        "Hashes make passwords easier to remember",
        "Hashes are one-way fingerprints, so a stolen database shouldn't instantly reveal original passwords",
        "Hashing encrypts passwords with a public key anyone can reverse",
        "Hashes remove the need for MFA forever",
      ],
      correctIndex: 1,
      explanation:
        "Hashes are designed to be one-way. Storing hashes (with modern protective techniques) reduces the damage of a database breach — though weak passwords can still be guessed.",
    },
    {
      id: "q4",
      question: "Which statement about hashing vs encryption is correct?",
      choices: [
        "Hashing and encryption are the same process",
        "Encryption is meant to be reversible with a key; hashing is meant to be one-way",
        "Hashing is always reversible; encryption is never reversible",
        "Only hashing provides confidentiality of messages in transit",
      ],
      correctIndex: 1,
      explanation:
        "Encryption is designed so authorized parties can decrypt. Hashing creates a fingerprint you shouldn't reverse.",
    },
    {
      id: "q5",
      question: "A messaging app says chats are encrypted. Which problem can crypto alone still fail to stop?",
      choices: [
        "Someone phishing you into revealing your login code",
        "Eavesdroppers reading properly encrypted traffic without the keys",
        "Turning plaintext into ciphertext",
        "Using a public key to encrypt a message to you",
      ],
      correctIndex: 0,
      explanation:
        "Encryption protects data in transit/storage under its rules — it doesn't stop social engineering that tricks you into handing over access.",
    },
  ],
  reflection: {
    prompt:
      "Name one place you already rely on cryptography (browser padlock, encrypted chat, device encryption, etc.). What does it protect — and what could still go wrong if someone phished your password?",
    placeholder: "Example: My school email uses HTTPS… that protects the connection, but if I reuse a weak password…",
  },
};
