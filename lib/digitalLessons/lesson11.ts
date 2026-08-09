import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson11: AILessonConfig = {
  id: "dl-11",
  title: "11. Everyday Threats & Security Recommendations",
  goal: "Explain how malware and phishing can affect sensitive data, then recommend security measures by weighing efficiency, feasibility, and ethics. This is awareness depth; the Cybersecurity track goes deeper.",
  xpReward: 550,
  badge: "Security Recommender",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/10",
  nextHref: "/learn/digital/12",
  instructorScript: `**Coach's note**
Today's lesson: **Everyday Threats & Security Recommendations**.

**Goal:** Explain how malware and phishing can affect sensitive data, then recommend security measures by weighing efficiency, feasibility, and ethics. This is awareness depth; the Cybersecurity track goes deeper.

**How to facilitate**
1. Warm-up: ask students what they already think about "Security is a recommendation problem".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~25 min lesson",
    sections: [
      { id: "intro", kicker: "Start here", title: "Security is a recommendation problem", body: `Everyday threats rarely look dramatic at first. A convincing message, unsafe download, reused password, or shared-device session can expose sensitive data. Your task is to recognize likely harm and recommend a practical, ethical response—not to learn how to attack systems.`, image: "/images/lessons/dl-11.png", imageAlt: "A suspicious message beside a shield protecting account data", callout: { label: "Boundary", text: "This lesson builds awareness and decision-making. The Cybersecurity track covers technical defense, incident response, and deeper network security." } },
      { id: "data", kicker: "What is at stake?", title: "Sensitive data has real consequences", body: `Sensitive data can include passwords, recovery codes, private messages, financial-aid records, health information, location, school records, and contact lists. Exposure can lead to account takeover, fraud, embarrassment, discrimination, lost time, or harm to people connected to the account.\n\nSecurity recommendations should protect people, not just devices.` },
      { id: "malware", kicker: "Threat awareness", title: "Malware can disrupt, spy, or lock data", body: `Malware is harmful software. It may damage files, collect information, display unwanted ads, or lock people out of data. It can arrive through unexpected attachments, deceptive downloads, compromised websites, or unofficial software sources.\n\nThe important question is impact: if a device holds saved passwords, school work, family photos, or private information, malware can affect more than one file.`, image: "/images/lessons/dl-11-2.png", imageAlt: "A device protected from a harmful download" },
      { id: "phishing", kicker: "Threat awareness", title: "Phishing manipulates people", body: `Phishing messages impersonate a trusted organization or person to pressure someone into sharing data or opening a harmful link. Common signals include urgency, mismatched sender addresses, unusual payment requests, and requests for passwords or verification codes.\n\nA message can look polished and still be unsafe. Verify through an official app, saved bookmark, or independently found phone number—not through the message's link.` },
      { id: "compare", kicker: "Explain", title: "Malware and phishing affect data differently", body: `Phishing relies on a person being persuaded to reveal information or approve an action. Malware relies on harmful software running on a device. They can combine: a deceptive message may lead to an unsafe download. Both can expose sensitive data, but the immediate response may differ.\n\nAvoid blaming a target. Deception is designed to work under stress; systems and habits should make safe choices easier.`, checkIn: { prompt: "A student receives a fake financial-aid email that asks them to sign in through an unfamiliar link. What is the main risk?", choices: [
            "The school automatically deletes the account” belongs to a different situation than the one in the question stem",
            "The device immediately gains storage” belongs to a different situation than the one in the question stem",
            "The email proves the aid is approved” belongs to a different situation than the one in the question stem",
            "The message may persuade them to give credentials to an impersonator",
          ], correctIndex: 3, explanation: "Phishing attempts to collect data by pretending to be a trusted source." } },
      { id: "basics", kicker: "Measures", title: "Choose layered, proportionate measures", body: `Useful measures include unique passwords stored in a password manager, multi-factor authentication, software updates, backups, careful permission choices, official download sources, and independent verification of unexpected requests. No single control is perfect; layers reduce the chance that one mistake becomes a major loss.\n\nThe best measure depends on the asset, risk, and people affected.` },
      { id: "efficiency", kicker: "Tradeoffs", title: "Efficiency matters—but not alone", body: `A security step can cost time, attention, money, or accessibility. Requiring MFA for a school portal may add a few seconds but greatly reduces account takeover risk. Asking every student to use a complicated tool they cannot access may create a different barrier.\n\nRecommend the measure that meaningfully reduces risk with a manageable burden, and plan support for people who need it.`, checkIn: { prompt: "Which recommendation best balances efficiency and account security for a scholarship portal?", choices: [
            "Eliminate all login checks” belongs to a different situation than the one in the question stem",
            "Use the same short password for easy recall” belongs to a different situation than the one in the question stem",
            "Require unique passwords and offer MFA plus recovery support",
            "Require students to share passwords with teammates",
          ], correctIndex: 2, explanation: "The recommendation reduces takeover risk while recognizing the need for usable recovery support." } },
      { id: "feasibility", kicker: "Tradeoffs", title: "Feasibility is part of a good recommendation", body: `A recommendation must work in the real setting. Consider device access, reliable phone service, language, disability accommodations, staff time, cost, and whether a student uses a shared computer. For example, an authenticator app may be strong, but a school should provide an accessible backup path rather than lock out people without a compatible phone.` },
      { id: "ethics", kicker: "Tradeoffs", title: "Security measures should respect people", body: `Ethical security protects confidentiality and autonomy. Monitoring every student's private messages or collecting more biometric data may reduce one risk while creating surveillance, consent, and equity concerns. Use the least intrusive effective measure, explain why data is collected, limit who can access it, and provide a way to question or appeal a decision.` },
      { id: "case", kicker: "Evaluate", title: "Case: a shared laptop and a suspicious attachment", body: `A family shares a laptop used for school, work, and health forms. An unexpected “invoice” attachment appears in email. A strong recommendation is to avoid opening it, verify the sender through another channel, keep the device updated, use separate accounts where possible, and keep backed-up copies of important work.\n\nThis response is efficient because it begins with a low-cost pause; feasible because it uses ordinary settings; and ethical because it protects everyone who uses the device.`, image: "/images/lessons/dl-11-3.png", imageAlt: "A shared laptop user independently verifying a suspicious attachment" },
      { id: "report", kicker: "Respond", title: "Respond without escalating harm", body: `If something seems suspicious, pause, preserve the message if reporting requires it, use an official report channel, and ask a trusted adult, teacher, or organization for help. Do not forward questionable links, publicly shame someone who clicked, or try to investigate technical details yourself.\n\nIf an account may be compromised, use official recovery processes and notify the responsible service. Deeper incident-response work belongs in the Cybersecurity track or with qualified support.` },
      { id: "recommend", kicker: "Recommend", title: "Write a defensible recommendation", body: `A complete recommendation names the threat, the data at risk, the proposed measure, expected benefit, burden, feasibility support, and ethical safeguard. Example: “For school email, enable MFA and provide recovery codes plus a staffed help path. This reduces takeover risk while avoiding exclusion of students without constant phone access.”`, checkIn: { prompt: "Which recommendation includes security, feasibility, and ethics?", choices: [
            "Picking “Tell people to be more careful” is a common mix-up that confuses a nearby idea with the right one",
            "Some learners answer “Ban all online school work”, yet that does not match the precise idea from the lesson",
            "“Track every student's screen continuously” describes a different situation than the one in the question stem",
            "Use MFA for high-stakes accounts, offer accessible recovery options, and limit collected verification data",
          ], correctIndex: 3, explanation: "It reduces risk while addressing access and limiting intrusive collection." } },
      { id: "prioritize", kicker: "Prioritize", title: "Protect high-impact accounts first", body: `Start with email, financial, school, and recovery accounts because compromise there can unlock other services. This prioritization improves efficiency: limited time goes first to controls that prevent the largest chain of harm.` },
      { id: "support", kicker: "Support people", title: "Build a culture that reports early", body: `People report suspicious activity earlier when help is nonjudgmental. Clear reporting routes and calm guidance reduce shame, preserve evidence, and help an organization respond without turning a mistake into a bigger incident.` },
      { id: "ready", kicker: "Ready", title: "Recognize, weigh, recommend", body: `Malware and phishing can put sensitive data at risk, but strong recommendations do more than list controls. They weigh how well a measure works, whether people can actually use it, and whether it respects privacy and equity. For technical security depth, continue in the Cybersecurity track.` },
    ],
  },
  bigIdeas: ["Malware and phishing can expose or disrupt sensitive data through different pathways.", "Security recommendations should layer practical measures such as updates, MFA, backups, and independent verification.", "A responsible recommendation weighs effectiveness with efficiency, feasibility, ethics, and equitable access."],
  keyTerms: [{ term: "Malware", definition: "Harmful software that can disrupt devices, lock files, or collect data." }, { term: "Phishing", definition: "Deceptive communication that impersonates a trusted source to obtain information or prompt an unsafe action." }, { term: "Sensitive data", definition: "Information whose exposure could harm a person or organization, such as credentials, location, health, or financial records." }, { term: "Multi-factor authentication", definition: "A login process requiring more than one form of proof." }, { term: "Feasibility", definition: "Whether a measure can realistically be used and supported in its setting." }, { term: "Least intrusive measure", definition: "The effective security option that collects or restricts no more than necessary." }],
  realWorld: "Schools, employers, and families all make security choices. The strongest proposals protect data while remaining usable, affordable, accessible, and respectful of privacy.",
  quiz: [
    { id: "q1", question: "What is a likely effect of malware on sensitive data?", choices: [
            "It only changes wallpaper” belongs to a different situation than the one in the question stem",
            "It improves privacy settings” belongs to a different situation than the one in the question stem",
            "It can lock, damage, or collect data from a device",
            "It guarantees a backup” belongs to a different situation than the one in the question stem",
          ], correctIndex: 2, explanation: "Malware can harm availability and confidentiality of data." },
    { id: "q2", question: "How does phishing commonly threaten data?", choices: [
            "By improving encryption” belongs to a different situation than the one in the question stem",
            "By repairing software” belongs to a different situation than the one in the question stem",
            "By deleting all advertisements” belongs to a different situation than the one in the question stem",
            "By pressuring a person to reveal credentials or approve an unsafe action",
          ], correctIndex: 3, explanation: "Phishing relies on impersonation and social pressure." },
    { id: "q3", question: "Why use unique passwords and MFA together?", choices: [
            "They add layers so a stolen password alone is less likely to cause takeover",
            "They remove the need for recovery” belongs to a different situation than the one in the question stem",
            "They replace software updates” belongs to a different situation than the one in the question stem",
            "They make phishing harmless” belongs to a different situation than the one in the question stem",
          ], correctIndex: 0, explanation: "Layered controls reduce reliance on one defense." },
    { id: "q4", question: "What feasibility concern should a school address before requiring an authenticator app?", choices: [
            "Whether passwords can be shared” belongs to a different situation than the one in the question stem",
            "Whether the school can avoid all security” belongs to a different situation than the one in the question stem",
            "Whether students have compatible devices and an accessible backup method",
            "Whether every student likes the app logo” belongs to a different situation than the one in the question stem",
          ], correctIndex: 2, explanation: "A policy must accommodate real access constraints." },
    { id: "q5", question: "Which is an ethical concern about continuous student device monitoring?", choices: [
            "It is always free” belongs to a different situation than the one in the question stem",
            "It prevents every scam” belongs to a different situation than the one in the question stem",
            "It may create surveillance and privacy harms beyond what is necessary",
            "It makes passwords shorter” belongs to a different situation than the one in the question stem",
          ], correctIndex: 2, explanation: "Security must be proportional and protect autonomy." },
    { id: "q6", question: "What is a safe response to an unexpected attachment?", choices: [
            "Verify independently and use an official report path if suspicious",
            "Open it in case it is urgent” belongs to a different situation than the one in the question stem",
            "Forward it widely” belongs to a different situation than the one in the question stem",
            "Try to reverse-engineer it” belongs to a different situation than the one in the question stem",
          ], correctIndex: 0, explanation: "Independent verification and reporting avoid spreading or escalating potential harm." },
  ],
  reflection: { prompt: "Choose one high-stakes account or shared device. What threat is most relevant, and what security measure would you recommend after weighing effectiveness, feasibility, and ethics?", placeholder: "Example: For a shared laptop, I would recommend separate accounts, updates, backups, and a clear reporting path..." },
};
