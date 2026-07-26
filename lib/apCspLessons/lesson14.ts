import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson14: AILessonConfig = {
  id: "csp-14",
  title: "14. Legal & Ethical Computing: IP, Privacy & Security",
  goal: "Apply the rules of intellectual property, licensing, privacy, and security to real computing decisions.",
  xpReward: 700,
  badge: "Ethics Sentinel",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/13",
  nextHref: "/learn/ap-csp-prep/15",
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Big Idea 5",
        title: "The rules that govern computing",
        body: `Impact (Lesson 13) becomes concrete through **legal and ethical rules**: who owns digital work, how it may be reused, what happens to personal data, and how systems are kept secure. These topics are heavily represented in Big Idea 5 and directly relevant to the Create Performance Task's requirement to credit sources.`,
      },
      {
        id: "ip",
        kicker: "Ownership",
        title: "Intellectual property and copyright",
        body: `**Intellectual property (IP)** is a creation of the mind — code, music, images, writing. **Copyright** automatically gives the creator exclusive rights to use and distribute their work for a period of time. Using copyrighted material without permission can be illegal.

On the exam, the default assumption is: **material you find online is owned by someone** unless a license or law says otherwise. "It was on the Internet" is never permission to reuse.`,
        code: `found online, no license stated
        |
        v
ASSUME: copyrighted -> need permission
# "it was on the Internet" != permission

allowed WITHOUT asking only if:
  - a license permits it (e.g. Creative Commons), OR
  - it's public domain`,
        codeCaption: "Default = copyrighted; reuse needs a license or public domain",
        checkIn: check(
          "You find an image online with no license stated. What is the safest assumption?",
          [
            "It is free to use because it's public",
            "It is likely copyrighted, so you need permission or a license to reuse it",
            "Copyright doesn't apply to digital images",
            "You may use it if you don't sell it",
          ],
          1,
          "Absent an explicit license, assume the work is copyrighted and requires permission.",
        ),
      },
      {
        id: "licensing",
        kicker: "Permissions",
        title: "Licenses: Creative Commons and open source",
        body: `A **license** states how others may use a work. Creators can grant permissions in advance:

- **Creative Commons (CC)** licenses let creators allow reuse under conditions (e.g., **attribution** required, non-commercial only, share-alike).
- **Open-source software** licenses let anyone view, use, modify, and share source code, often requiring credit and that derivatives stay open.
- **Public domain** means rights have expired or been waived — free to use.

Licenses make sharing *lawful and clear*. Following the license terms (like giving attribution) is both legal compliance and ethical practice.`,
        code: `LICENSE            reuse?   typical condition
-----------------  -------  -------------------------
All rights (c)      no      ask permission first
Creative Commons    yes     attribution / non-commercial
Open source (MIT)   yes     keep credit + license notice
Public domain       yes     none - rights waived/expired`,
        codeCaption: "Licenses spell out what reuse is allowed and on what terms",
      },
      {
        id: "open-source",
        kicker: "Collaboration",
        title: "Why open source matters",
        body: `**Open source** enables large-scale collaboration: developers worldwide inspect, improve, and reuse shared code, accelerating innovation and letting others learn from real systems. Much of the Internet runs on open-source software.

Benefits include transparency (anyone can audit for bugs or backdoors) and reduced duplication. The trade-off is that licenses still impose obligations — most commonly, crediting the original authors and preserving the license on derivatives.`,
        checkIn: check(
          "A common requirement of open-source and Creative Commons licenses is:",
          [
            "Paying a fee every time the code runs",
            "Giving attribution (credit) to the original creator",
            "Never modifying the work",
            "Keeping the source code secret",
          ],
          1,
          "Attribution — crediting the original author — is a frequent license condition.",
        ),
      },
      {
        id: "plagiarism",
        kicker: "Integrity",
        title: "Plagiarism and citing sources",
        body: `**Plagiarism** is presenting someone else's work or ideas as your own. In computing, this includes copying code without credit — an academic-integrity violation *and*, for licensed/copyrighted code, a legal one.

For the **Create Performance Task**, you must **acknowledge** any code, ideas, or media that are not yours, including AI-generated portions per current College Board policy. Citing sources isn't just rule-following — it lets others verify and build on your work (Lesson 1's collaboration values).`,
        code: `# In your code, mark what's borrowed:
# --- from OpenChart v2, MIT License (author: J. Lee) ---
drawBar(data)
# --- end borrowed code ---

# In your write-up:
"The drawBar procedure is from OpenChart (MIT).
 The rest of the program is my own."`,
        codeCaption: "Acknowledge borrowed code in the source AND the write-up",
        callout: {
          label: "Create PT requires",
          text: "You must cite/acknowledge any portion of your program (code, media, or ideas) that you did not create yourself. Unacknowledged copying can invalidate your submission.",
        },
      },
      {
        id: "pii-privacy",
        kicker: "Privacy",
        title: "Personal data and privacy",
        body: `**Personally identifiable information (PII)** is data that can identify an individual — name, address, birth date, biometric data, or combinations (Lesson 4's aggregation risk).

Privacy concerns arise because computing makes collecting, storing, combining, and sharing personal data cheap and often invisible to the person. Ethical and legal practice includes collecting only what's needed, being transparent, obtaining consent, and letting people control their data.`,
        code: `PII (identifies a person)      NOT PII (aggregate/anon)
---------------------------    -----------------------
full name + address            # visitors to a park
date of birth                  # yesterday's temperature
biometric / face scan          # a bus schedule
ZIP + birthdate + gender       # site background color
# combos can identify even without a name (Lesson 4)`,
        codeCaption: "PII can pinpoint an individual; aggregate data usually can't",
        checkIn: check(
          "Which is an example of personally identifiable information (PII)?",
          [
            "The number of visitors to a public park",
            "A person's home address combined with their full name",
            "The average temperature yesterday",
            "The color of a website's background",
          ],
          1,
          "A name plus home address identifies a specific individual — PII.",
        ),
      },
      {
        id: "digital-footprint",
        kicker: "Traces",
        title: "Digital footprint and permanence",
        body: `Your **digital footprint** is the trail of data you leave online — posts, searches, purchases, location. Much of it is persistent and can be collected, combined, and hard to fully erase.

Metadata (Lesson 4) is part of this: a photo's hidden location tag can reveal where you live. The exam expects you to reason about how seemingly minor data accumulates into a detailed, lasting profile.`,
        code: `posts + searches + purchases + location + likes
        |  collected & combined over time
        v
   a detailed, PERSISTENT profile of you
# each piece looks harmless; together they reveal a lot
# and it's hard to fully erase`,
        codeCaption: "Digital footprint: tiny traces aggregate into a lasting profile",
        checkIn: check(
          "Why is a person's digital footprint a privacy concern even if each piece seems harmless?",
          [
            "It makes files larger",
            "Small pieces of data can be combined and persist, building a detailed, lasting profile",
            "It causes overflow errors",
            "It only affects open-source software",
          ],
          1,
          "Individually minor traces aggregate over time into a persistent, revealing profile — the aggregation risk.",
        ),
      },
      {
        id: "security",
        kicker: "Protection",
        title: "Security: protecting data and systems",
        body: `Security protects data and systems from unauthorized access. Core concepts you should know:

- **Encryption** — encoding data so only authorized parties can read it (the basis of HTTPS, Lesson 12). **Symmetric** encryption uses one shared key; **public-key (asymmetric)** uses a public key to encrypt and a private key to decrypt.
- **Authentication** — verifying identity (passwords, **multi-factor authentication** combining something you know/have/are).
- **Strong, unique passwords** and MFA sharply reduce account compromise.`,
        code: `# Public-key idea (conceptual):
#   Anyone can encrypt with your PUBLIC key.
#   Only you can decrypt with your PRIVATE key.
# This lets strangers send you secrets without sharing a key first.`,
        codeCaption: "Public-key encryption enables secure communication with strangers",
        examples: [
          {
            caption: "Symmetric = one shared key; asymmetric = a public/private pair",
            code: `SYMMETRIC   [ same key ] locks AND unlocks
            problem: how do you share the key safely?

ASYMMETRIC  public key  -> locks (anyone can)
            private key -> unlocks (only you)`,
          },
          {
            caption: "MFA layers factors so one stolen password isn't enough",
            code: `login needs 2+ of:
  something you KNOW  (password)
  something you HAVE  (phone code)
  something you ARE   (fingerprint)
# stolen password alone -> still blocked`,
          },
        ],
      },
      {
        id: "threats",
        kicker: "Attacks",
        title: "Common threats: phishing, malware, and more",
        body: `Threats the exam expects you to recognize:

| Threat | What it is | Defense idea |
| --- | --- | --- |
| **Phishing** | Fake messages that trick people into giving credentials | Slow down; verify sender; don't click odd links |
| **Malware** | Malicious software (virus, ransomware, spyware) | Updates, don't run unknown files, backups |
| **Keylogging** | Software/hardware that records keystrokes | MFA; avoid untrusted machines; antivirus |
| **Rogue access point** | Fake Wi‑Fi that intercepts traffic | Prefer known networks; use HTTPS/VPN |

Phishing exploits *people*; malware exploits *software*. Many breaches start with human deception, then escalate.`,
        code: `PHISHING red flags:
  urgent!  "verify your password NOW or lose access"
  odd link  schooI-login.co  (capital I, not L)
  unexpected sender / asks for credentials

ROGUE AP: "Free_Airport_WiFi" that isn't the real airport
# attacker can read unencrypted traffic on that network`,
        codeCaption: "Phishing targets people; rogue APs and malware target systems",
        examples: [
          {
            caption: "Keylogger captures what you type — MFA still helps",
            code: `You type password on infected cafe PC
Keylogger records: MyP@ss123
Attacker tries login elsewhere
MFA code on YOUR phone -> attacker still blocked`,
          },
        ],
        checkIn: check(
          "An email pretending to be your school asks you to 'verify' your password via a link. This is most likely:",
          ["encryption", "a phishing attack", "open-source software", "a digital footprint"],
          1,
          "Deceptive messages designed to steal credentials are phishing — an attack on the user.",
        ),
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Reusing code the right way",
        body: `You want to use a chart library in your Create PT program. The ethical/legal path:
1. Check its **license** (e.g., MIT open source — reuse allowed with attribution).
2. Follow the terms — keep the license notice, **credit** the authors.
3. In your write-up, **acknowledge** which parts you wrote versus reused.

Compare to copying a snippet from a random site with no license and claiming it as yours — that risks copyright infringement *and* plagiarism, and can invalidate a Create PT submission.`,
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "You compute responsibly",
        body: `You can apply copyright and licensing (including Creative Commons and open source), avoid plagiarism by acknowledging sources, reason about PII, privacy, and digital footprints, and explain core security ideas (encryption, authentication, phishing, malware).

This closes Big Idea 5. Next you'll put *everything* together in the Create Performance Task studio — requirements, scoring, and a plan.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Cite and secure",
        body: `Name one source (image, code, idea) you'd reuse in a project and how you'd legally/ethically credit it. Then name one security measure you'd add to protect its users' data.`,
      },
    ],
  },
  bigIdeas: [
    "Digital work is **intellectual property**; assume online material is **copyrighted** unless a license or law permits reuse.",
    "**Licenses** (Creative Commons, open source, public domain) grant reuse rights — often requiring **attribution**.",
    "Avoid **plagiarism** by acknowledging all borrowed code, media, and ideas — the Create PT requires it.",
    "Protect **privacy** (PII, digital footprint) and **security** (encryption, authentication) against threats like phishing and malware.",
  ],
  keyTerms: [
    { term: "Intellectual property", definition: "A creation of the mind, such as code, art, or writing, that can be owned." },
    { term: "Copyright", definition: "Exclusive rights automatically granted to a creator over their original work." },
    { term: "Creative Commons", definition: "Licenses that let creators permit reuse under stated conditions like attribution." },
    { term: "Open source", definition: "Software whose source code can be viewed, used, modified, and shared under a license." },
    { term: "PII", definition: "Personally identifiable information that can identify a specific individual." },
    { term: "Encryption", definition: "Encoding data so only authorized parties can read it." },
  ],
  realWorld:
    "Choosing a Creative Commons image, enabling multi-factor authentication, and spotting a phishing email are everyday applications of exactly these legal, ethical, and security rules.",
  quiz: [
    {
      id: "q1",
      question: "You find code online with no license. The safest and most ethical assumption is:",
      choices: [
            "It's likely copyrighted and needs permission or a license to reuse",
            "It's free to copy since it's public” belongs to a different situation than the one in the question stem",
            "You can use it if you change one line” belongs to a different situation than the one in the question stem",
            "Copyright never applies to code” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation: "Without an explicit license, assume it's protected and requires permission.",
    },
    {
      id: "q2",
      question: "A Creative Commons 'Attribution' license requires that you:",
      choices: [
            "Credit the original creator when you reuse the work",
            "Keep your project private” belongs to a different situation than the one in the question stem",
            "Pay a licensing fee” belongs to a different situation than the one in the question stem",
            "Never modify the work” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation: "Attribution licenses require crediting the original creator.",
    },
    {
      id: "q3",
      question: "A key benefit of open-source software is that:",
      choices: [
            "It is always free of any obligations” belongs to a different situation than the one in the question stem",
            "“Its source code is secret” describes a different situation than the one in the question stem",
            "Anyone can inspect, improve, and reuse the code, aiding collaboration and transparency",
            "“It cannot be modified” describes a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation: "Open source enables inspection, reuse, and collaboration, though licenses still impose terms.",
    },
    {
      id: "q4",
      question: "For the Create Performance Task, using someone else's code without acknowledgment is:",
      choices: [
            "Fine as long as it works” belongs to a different situation than the one in the question stem",
            "Only a problem for images” belongs to a different situation than the one in the question stem",
            "Required by College Board” belongs to a different situation than the one in the question stem",
            "Plagiarism and can invalidate the submission",
          ],
      correctIndex: 3,
      explanation: "You must acknowledge all borrowed work; failing to do so is plagiarism.",
    },
    {
      id: "q5",
      question: "Which of these is PII?",
      choices: [
            "Yesterday's weather” belongs to a different situation than the one in the question stem",
            "A student's full name together with their date of birth",
            "A public bus schedule” belongs to a different situation than the one in the question stem",
            "A city's total population” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation: "Name plus date of birth can identify a specific individual.",
    },
    {
      id: "q6",
      question: "HTTPS keeps your login safe primarily through:",
      choices: ["compression", "encryption", "crowdsourcing", "packet loss"],
      correctIndex: 1,
      explanation: "Encryption prevents others from reading data in transit.",
    },
    {
      id: "q7",
      question: "A message tricking a user into revealing their password by pretending to be a trusted service is:",
      choices: ["malware", "phishing", "open source", "a firewall"],
      correctIndex: 1,
      explanation: "Phishing deceives the user into disclosing credentials.",
    },
    {
      id: "q8",
      question: "In public-key encryption:",
      choices: [
            "One shared secret key is used by everyone” belongs to a different situation than the one in the question stem",
            "No keys are used” belongs to a different situation than the one in the question stem",
            "Data is compressed, not encrypted” belongs to a different situation than the one in the question stem",
            "A public key encrypts and a matching private key decrypts",
          ],
      correctIndex: 3,
      explanation: "Public-key (asymmetric) encryption pairs a public encryption key with a private decryption key.",
    },
  ],
  reflection: {
    prompt:
      "The Create PT requires acknowledging sources and considering privacy. Describe a program you'd build, one source you'd credit and how, and one privacy or security safeguard you'd include for users' data.",
    placeholder: "The source and citation, plus a privacy/security safeguard…",
  },
};
