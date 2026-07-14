import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson12: AILessonConfig = {
  id: "cs-12",
  title: "12. Logging, Monitoring & Incidents",
  goal: "Explain why logs matter, what to log, contrast detection vs prevention, walk through basic incident response steps including evidence preservation, know who to notify, and practice calm response through tabletop drills.",
  xpReward: 600,
  badge: "Incident Ready",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/11",
  nextHref: "/learn/cyber/13",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-12.png",
        imageAlt: "SOC-style monitors with calm alert banners and a runbook binder labeled Incident Response",
        body: `Prevention is great — until something slips through. Then you need **detection**, **logs**, and a calm **incident response** plan. Today you'll learn how defenders notice trouble and recover without making things worse.\n\nHere's our roadmap:\n\n• **Why logs matter** — the black box recorder of systems.\n• **What to log** — and how to protect logs from tampering.\n• **Detection vs prevention** — both are needed.\n• **Basic IR steps** — identify, contain, eradicate, recover, lessons learned.\n• **Evidence preservation** — why panic-wiping makes things worse.\n• **Who to tell** — escalation without chaos.\n• **Tabletop drills** — practicing calm response before a real incident.\n• A mini playbook for school/club incidents.\n\nThis lesson builds the **Detect** and **Respond** side of the NIST NICE framework, pairing with the **Protect** habits from Lesson 11. It's about thinking clearly under pressure — a core cyber skill.`,
        callout: {
          label: "Why it matters",
          text: "Many organizations fail not because they never get attacked, but because nobody knows what to do next — or they destroy the evidence while panicking.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Incident words in plain English",
        body: `• **Log** — an automatic record of events (logins, errors, access attempts).\n• **Monitoring** — watching logs and alerts for unusual or risky activity.\n• **Detection** — noticing that something suspicious or harmful is happening (or happened).\n• **Prevention** — stopping bad things before they succeed (patches, MFA, firewalls).\n• **Incident** — a security event that threatens systems, data, or people and needs a response.\n• **Incident response (IR)** — the organized process for handling an incident.\n• **Containment** — limiting damage so the problem doesn't spread.\n• **Evidence preservation** — keeping logs and artifacts intact so what happened can actually be investigated.\n\nYou'll use these in a simple IR loop next.`,
        callout: {
          label: "Pro tip",
          text: "If you remember only one sequence: **Identify → Contain → Eradicate → Recover → Lessons learned**.",
        },
      },
      {
        id: "why-logs",
        kicker: "The big idea",
        title: "Logs are how defenders reconstruct the story",
        body: `Without **logs**, incidents turn into guessing games. Logs answer questions like:\n\n• Who signed in, from where, and when?\n• Which file was accessed or changed?\n• Did an admin setting flip unexpectedly?\n• Was there a burst of failed login attempts?\n\n**Clock sync (NTP)** matters because investigators **correlate logs across systems**. If one server's clock is an hour off, login, VPN, and firewall timelines won't line up — and you can't tell whether two events were related or minutes apart.\n\nEveryday examples: login history on email, \"recent activity\" on cloud drives, router connection logs, school LMS access records.`,
        bullets: [
          "Logs turn mysteries into timelines.",
          "Protect logs from tampering when possible.",
          "Even small teams should know where login history lives.",
        ],
        callout: {
          label: "Watch out",
          text: "Turning off logging \"to free space\" or ignoring alerts for weeks defeats the purpose. Detection requires attention.",
        },
      },
      {
        id: "why-logs-example",
        kicker: "See it in action",
        title: "Two accounts, two very different investigations",
        body: `Account A has login history enabled: it shows every sign-in with approximate location and device type going back 30 days. Account B has no accessible activity log at all.\n\nWhen something suspicious happens — a strange post, a changed setting, a "you're logged in elsewhere" feeling — Account A's owner can check: was there a login from an unfamiliar location? What time? Same day as the suspicious change? That's enough to decide whether to panic, investigate further, or relax.\n\nAccount B's owner is stuck guessing. They can change the password "just in case," but they'll never know whether there really was unauthorized access, when it happened, or whether it's still ongoing. Logs don't prevent incidents — they're what turns "I have a bad feeling" into "here's exactly what happened and when."`,
        checkIn: {
          prompt: "Why are logs valuable during a suspected security incident?",
          choices: [
            "They automatically fix any problem they detect",
            "They provide a timeline of who did what and when, turning guesswork into evidence",
            "They replace the need for strong passwords and MFA",
            "They mainly matter after you've already recovered the account",
          ],
          correctIndex: 1,
          explanation:
            "Logs let you reconstruct a timeline of events — the foundation for deciding whether something happened and what to do about it.",
        },
      },
      {
        id: "detect-vs-prevent",
        kicker: "Two layers",
        title: "Prevention reduces hits; detection catches what slips through",
        body: `**Prevention** tries to stop attacks: patching, MFA, phishing training, least privilege, hardening.\n\n**Detection** assumes something may still happen: monitoring failed logins, odd file sharing, antivirus alerts, \"new login from nowhere\" notices.\n\n**Detection example — credential stuffing / impossible travel:**\n\n• Many **failed logins** from one address, then one **success** — a pattern that can mean someone guessed or reused a stolen password list.\n• **Successful logins from far-away places minutes apart** — sometimes called **impossible travel** when the timing doesn't fit normal human movement.\n• Defenders **correlate login, VPN, and MFA logs** around the success time to confirm scope: Was MFA challenged? Did VPN connect from the same region? What changed after the success?\n\nA strong defense uses both prevention and detection. A locked door (prevention) plus an alarm (detection) beats either alone.`,
        callout: {
          label: "Common misconception",
          text: "\"We have strong passwords, so we don't need monitoring.\" Credentials still get phished. Detection catches the unusual sign-in afterward.",
        },
      },
      {
        id: "detect-vs-prevent-example",
        kicker: "See it in action",
        title: "Spotting impossible travel",
        body: `A school email account shows two successful logins eight minutes apart: one from the student's home city, and one from a country they've never visited. No human can physically travel that distance in eight minutes — this is the "impossible travel" pattern defenders watch for.\n\nA detection-minded response: don't assume it's automatically a false alarm (VPNs can sometimes cause odd-looking locations, but that's worth verifying, not assuming). Check whether MFA was challenged and passed for the second login, review what changed in the account right after (forwarding rules, new recovery email, downloaded files), and treat it as a likely account compromise until proven otherwise.\n\nThis is exactly why **prevention** (MFA) and **detection** (login alerts) work as a pair: even if a password leaked, MFA might have blocked the second login — and if it didn't, the alert is still what tips you off fast enough to contain the damage.`,
        checkIn: {
          prompt: "An account shows two successful logins from distant locations eight minutes apart. What should a defender do?",
          choices: [
            "Ignore it — location data on logins is always wrong",
            "Treat it as likely account compromise, check MFA status and recent changes, and respond quickly",
            "Immediately delete the account permanently",
            "Assume it's fine because the password worked both times",
          ],
          correctIndex: 1,
          explanation:
            "\"Impossible travel\" is a strong detection signal. The right response is rapid investigation and containment, not dismissal.",
        },
      },
      {
        id: "log-types",
        kicker: "What (and how) to log",
        title: "Choosing what to log — and protecting it from tampering",
        image: "/images/lessons/cs-12-4.png",
        imageAlt: "Simple diagram of login logs access logs and change logs feeding into one timeline",
        body: `Not everything needs logging, and not every log needs to be kept forever — but a few categories matter most for typical students, families, and clubs:\n\n• **Authentication logs** — who signed in, when, from where, and whether MFA was used.\n• **Access logs** — who opened, downloaded, or shared sensitive files.\n• **Change logs** — when settings, permissions, or admin roles were modified.\n• **Alert logs** — antivirus detections, "new device" or "new login" notices.\n\n**Retention** (how long you keep logs) matters too — logs deleted after a week can't help you investigate something noticed a month later. And **protecting logs from tampering** matters: if an attacker who compromises an account can also delete the logs of their own activity, investigators lose the evidence right when they need it most. Where possible, prefer platforms that keep activity logs the account owner can't simply erase.`,
        bullets: [
          "Prioritize authentication, access, and change logs.",
          "Longer retention helps catch slow-moving problems.",
          "Logs an attacker can freely delete are much less useful.",
        ],
        callout: {
          label: "Defender view",
          text: "If you can only check one thing after a suspicious event, check the authentication/login history first — it usually tells you the most, fastest.",
        },
      },
      {
        id: "log-types-example",
        kicker: "See it in action",
        title: "Why retention length changed the outcome",
        body: `Two clubs both had a Drive folder quietly shared with an unknown outside account. Club A's platform kept sharing/change logs for 90 days; Club B's setup only showed the last 7 days of activity.\n\nClub A noticed the leak five weeks later during a routine audit. They pulled up the change log, found the exact date the sharing setting changed, cross-referenced it with who was logged in at that time, and identified it as an accidental click rather than malice — problem solved calmly.\n\nClub B noticed a similar issue around the same timeframe but their 7-day log window had already rolled past the event. They could fix the setting going forward, but could never determine *when* or *how* it happened — leaving uncertainty about whether it was accidental or a sign of a compromised account that might still have access elsewhere.\n\nRetention isn't just a technical setting — it's the difference between closing a question and living with an open one.`,
        checkIn: {
          prompt: "Why does log retention length (how long logs are kept) matter for investigations?",
          choices: [
            "It doesn't matter — all incidents are noticed within a day",
            "Longer retention means you can still investigate issues discovered weeks or months after they happened",
            "Shorter retention always makes systems more secure",
            "Retention only matters for video files, not text logs",
          ],
          correctIndex: 1,
          explanation:
            "Problems are often noticed well after they started. Logs that expire too quickly leave investigators without the evidence they need.",
        },
      },
      {
        id: "ir-steps",
        kicker: "The playbook",
        title: "Basic incident response steps",
        image: "/images/lessons/cs-12-2.png",
        imageAlt: "Five step cards: Identify Contain Eradicate Recover Lessons on a classroom table",
        body: `Here's a simple IR loop used widely (wording varies, idea is stable):\n\n**1. Identify** — Confirm something real is wrong. Gather symptoms: alert text, weird charges, ransomware note, locked account.\n**2. Contain** — Stop the bleeding. Disconnect a compromised device from Wi-Fi if appropriate, revoke sessions, reset passwords, pause risky sharing — without destroying needed evidence when you can help it.\n**3. Eradicate** — Remove the cause: malware cleanup with proper tools/IT help, close the exposed setting, remove the malicious OAuth app.\n**4. Recover** — Restore from clean backups, re-enable services carefully, verify systems work.\n**5. Lessons learned** — What failed? What will you change (MFA, training, patching, logging)?\n\nYou may not run all steps alone — but knowing the order keeps you from skipping straight to \"reinstall everything\" in a panic.`,
        callout: {
          label: "Defender view",
          text: "Containment before cleanup matters. If you only wipe one laptop while the attacker still has your email session cookie, they may walk right back in.",
        },
      },
      {
        id: "ir-steps-example",
        kicker: "See it in action",
        title: "Following the order under pressure",
        body: `A student notices their email sent a strange message to their whole contact list. Panic mode says: "delete the account immediately!" The IR-trained response looks different:\n\n**Identify** — Confirm it wasn't a mistake (check sent folder, ask if anyone else noticed anything odd).\n**Contain** — Change the password immediately, revoke active sessions on other devices, and check/turn on MFA — *before* doing anything more drastic.\n**Eradicate** — Remove any unfamiliar forwarding rules, filters, or connected apps the attacker may have added to keep access.\n**Recover** — Confirm the account works normally, tell contacts the earlier message wasn't real if it was sent to many people.\n**Lessons learned** — Was the password reused elsewhere? Was MFA missing? Fix that root cause.\n\nNotice deleting the account was never actually necessary or even helpful — it wouldn't have removed the attacker's access to anywhere else that password was reused, and it would have destroyed the very account you'd need to investigate.`,
        checkIn: {
          prompt: "Right after identifying a likely account compromise, what should typically come next?",
          choices: [
            "Immediately delete the account permanently",
            "Contain: change the password, revoke sessions, and confirm MFA before further cleanup",
            "Post about it publicly right away",
            "Wait a few weeks to see if it resolves on its own",
          ],
          correctIndex: 1,
          explanation:
            "After identifying an incident, containment comes next — stopping ongoing access before cleanup and recovery, not skipping to drastic or delayed actions.",
        },
      },
      {
        id: "evidence-preservation",
        kicker: "Don't destroy the clues",
        title: "Evidence preservation: why panic-wiping backfires",
        body: `When something goes wrong, the instinct to "clean everything immediately" is strong — but it can destroy exactly the evidence you'd need to understand what happened.\n\nSimple evidence-preservation habits, even without professional tools:\n\n• **Don't factory-reset a device the moment something looks wrong** — screenshots, logs, and file timestamps can vanish.\n• **Take screenshots** of unusual messages, settings, or alerts before changing anything, when safe to do so.\n• **Note the time** you noticed the problem and what you observed, in your own words, as soon as possible — memory fades fast.\n• **Preserve, don't guess** — if IT or a trusted adult will investigate, ask what they need kept intact before you start "fixing" things yourself.\n\nThis mirrors how professional investigators avoid disturbing a scene before evidence is documented — same logic, much smaller scale.`,
        bullets: [
          "Screenshot suspicious activity before changing settings, when safe.",
          "Write down the timeline while it's fresh in your memory.",
          "Ask IT what to preserve before you \"fix\" something yourself.",
        ],
        callout: {
          label: "Watch out",
          text: "A factory reset feels productive, but if IT or a trusted adult needed to investigate first, you may have erased the only evidence of what happened.",
        },
      },
      {
        id: "evidence-preservation-example",
        kicker: "See it in action",
        title: "The reset that erased the answer",
        body: `A shared club laptop starts behaving strangely — pop-ups, a browser homepage that changed itself, and a new unfamiliar toolbar. A well-meaning member immediately factory-resets it "to be safe" before telling anyone.\n\nNow nobody can determine: What was actually installed? Did it come from a malicious download, a compromised extension, or something else? Did it access the club's saved passwords or files before the reset? Was any data sent out before cleanup? All of that evidence is gone.\n\nA better first move: screenshot the odd toolbar and homepage change, note when it started and what was being done right before (a download? a link?), then tell the club sponsor or IT and ask *them* whether resetting immediately is the right call for this situation — sometimes it is, but that decision should come after understanding scope, not as the very first reflex.`,
        checkIn: {
          prompt: "A shared laptop starts behaving strangely. What should happen before a full factory reset, if possible?",
          choices: [
            "Nothing — reset immediately without any documentation",
            "Screenshot the odd behavior, note the timeline, and check with IT/a trusted adult about what to preserve first",
            "Post photos of it on social media for advice from strangers",
            "Wait several weeks before doing anything",
          ],
          correctIndex: 1,
          explanation:
            "Preserving evidence (screenshots, timeline, consulting IT) before drastic cleanup steps helps determine what actually happened and whether other accounts/data were affected.",
        },
      },
      {
        id: "who-to-tell",
        kicker: "Escalate wisely",
        title: "Who to tell (and what not to do)",
        image: "/images/lessons/cs-12-3.png",
        imageAlt: "Student calling school IT while an incident report form is open on a laptop",
        body: `Incidents are team sports. Know your contacts:\n\n• **School / work** — teacher, IT help desk, administrator, or designated security contact.\n• **Club / team** — adult sponsor and account owners.\n• **Personal accounts** — platform support; for money theft, also bank/card issuer promptly.\n• **Legal/serious harm** — trusted adults; emergency services if someone is in immediate danger.\n\nAvoid:\n\n• Posting raw incident details publicly while it's unfolding.\n• Accusing classmates without evidence.\n• Paying random \"unlock\" demands without trusted adult/IT guidance.\n• Silently hoping it goes away.\n\nA short message helps: what you noticed, when, what accounts/devices, what you already tried.`,
        bullets: [
          "Tell the right responsible adults/IT early.",
          "Document time + symptoms simply.",
          "Don't destroy devices if IT needs to investigate (when practical).",
        ],
        callout: {
          label: "Try this week",
          text: "Write down who you would contact for (1) a school account lockout that looks like a takeover and (2) a personal email \"new login\" alert you didn't cause.",
        },
      },
      {
        id: "who-to-tell-example",
        kicker: "See it in action",
        title: "A well-written escalation message",
        body: `Compare two ways of reporting the same problem.\n\n**Vague:** "Something's wrong with my account, help???"\n\n**Useful:** "At around 3:15pm today I got a 'new sign-in' alert from [location] for my school email, which isn't me. I've already changed my password and enabled MFA. I haven't seen any messages sent that I didn't write, but wanted to flag it in case you see anything unusual on your end. Screenshot attached."\n\nThe second version gives IT or a trusted adult everything they need to help fast: **when**, **what**, **what you already did**, and **evidence**. It also shows you followed the contain-first instinct instead of waiting silently or destroying the account. This is the kind of report that gets a quick, calm response instead of confusion and back-and-forth.`,
        checkIn: {
          prompt: "What makes an incident report to IT or a trusted adult most useful?",
          choices: [
            "Being as vague as possible so it seems less serious",
            "Including when it happened, what you observed, what you already did, and any evidence (like a screenshot)",
            "Waiting a month before mentioning it",
            "Sending it to as many unrelated people as possible instead of the right contact",
          ],
          correctIndex: 1,
          explanation:
            "Specific, timely, evidence-backed reports help responders act quickly and accurately — vague or delayed reports slow everything down.",
        },
      },
      {
        id: "mini-playbook",
        kicker: "School & club ready",
        title: "A mini playbook you can actually use",
        body: `Example: club social account starts posting spam.\n\n• **Identify** — Confirm posts aren't from a teammate; check login/session history.\n• **Contain** — Log out other sessions, change password, enable MFA, remove unknown connected apps.\n• **Eradicate** — Delete malicious posts; check bio/links for attacker changes.\n• **Recover** — Restore branding; announce briefly if followers were put at risk (with sponsor approval).\n• **Lessons** — Unique password + MFA + fewer admins next time.\n\nSame skeleton works for shared drives, Discord servers, and school email — adjust who you notify.`,
        callout: {
          label: "Myth check",
          text: "Incident response isn't only for Fortune 500 SOCs. Student clubs and families need simple playbooks too.",
        },
      },
      {
        id: "tabletop-drills",
        kicker: "Practice before it's real",
        title: "Tabletop drills: rehearsing calm response",
        image: "/images/lessons/cs-12-5.png",
        imageAlt: "Students around a table discussing a printed incident scenario card during a tabletop drill",
        body: `Professional security teams regularly run **tabletop exercises** — a group sits down with a made-up scenario ("our shared drive was just set to public — go") and talks through the response *before* a real incident ever happens. No systems are touched; it's entirely discussion-based.\n\nA club or family can do a lightweight version in 15 minutes:\n\n1. Pick a plausible scenario (compromised email, lost laptop, ransomware note, leaked Drive link).\n2. Walk through **identify → contain → eradicate → recover → lessons** out loud, as a group.\n3. Note any gap: "wait, who actually holds our backup codes?" or "do we know IT's contact info?"\n4. Fix the gap *now*, while there's no pressure — write down the contact, store the backup codes properly, whatever surfaced.\n\nThe value isn't a perfect answer key — it's finding your blind spots in a calm moment instead of during a real, stressful incident.`,
        bullets: [
          "Tabletop drills are discussion-only — no systems touched.",
          "Great for finding gaps like missing contacts or unclear ownership.",
          "Even a 15-minute version once a semester builds real readiness.",
        ],
        checkIn: {
          prompt: "What is a tabletop exercise in incident response?",
          choices: [
            "Actually attacking a live system to test defenses",
            "A discussion-based walkthrough of a hypothetical incident to find gaps in a response plan, before a real incident happens",
            "A physical tabletop game with no security purpose",
            "A type of malware used by professional red teams",
          ],
          correctIndex: 1,
          explanation:
            "Tabletop exercises are low-cost, discussion-only rehearsals that reveal readiness gaps (like missing contacts or unclear ownership) safely and calmly.",
        },
      },
      {
        id: "checklist",
        kicker: "Put it together",
        title: "An incident-readiness checklist",
        body: `Before you ever need it, make sure your team/family/club can answer:\n\n**1.** Do we know where login/activity history lives for our main accounts?\n**2.** Is MFA on for anything important, so detection has a fighting chance alongside prevention?\n**3.** Do we know the IR order: identify → contain → eradicate → recover → lessons?\n**4.** Do we know *who* to tell for school, club, and personal-money incidents?\n**5.** Would we know to screenshot/document before resetting a device?\n**6.** Have we ever run a 15-minute tabletop drill to find gaps?\n\nIf you can check most of these boxes, you're meaningfully more incident-ready than most small teams — that's the whole goal of this lesson.`,
        callout: {
          label: "Try this week",
          text: "Run a tiny tabletop drill with a friend, family member, or club: pick one scenario and talk through the five IR steps out loud.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Logs** create timelines defenders can trust; choose what to log and protect it from tampering.\n• **Prevention** and **detection** work together — watch for **credential stuffing** and **impossible-travel** patterns.\n• IR basics: **identify → contain → eradicate → recover → lessons**.\n• **Preserve evidence** (screenshots, timeline) before drastic cleanup like a factory reset.\n• Know **who to tell** and avoid panic moves that make recovery harder.\n• **Tabletop drills** find gaps calmly, before a real incident.\n\nTake the **Knowledge check**, then reflect on an incident scenario and your first three actions.`,
      },
    ],
  },
  bigIdeas: [
    "**Logs** and **monitoring** turn security events into timelines defenders can investigate — choosing what to log and protecting it from tampering matters.",
    "**Prevention** reduces incidents; **detection** and **IR** handle what still gets through, with **evidence preservation** protecting your ability to investigate.",
    "A simple IR loop — identify, contain, eradicate, recover, lessons — plus knowing who to tell and practicing with **tabletop drills** beats panic.",
  ],
  keyTerms: [
    { term: "Log", definition: "An automatic record of system or account events used for investigation and monitoring." },
    { term: "Monitoring", definition: "Watching logs and alerts for suspicious or harmful activity." },
    { term: "Detection", definition: "Noticing that a security problem is occurring or has occurred." },
    { term: "Prevention", definition: "Controls meant to stop attacks before they succeed." },
    { term: "Incident", definition: "A security event that threatens systems, data, or people and requires response." },
    { term: "Incident response (IR)", definition: "An organized process for handling and recovering from incidents." },
    { term: "Containment", definition: "Limiting an incident's spread and damage while response continues." },
    { term: "Evidence preservation", definition: "Keeping logs, screenshots, and artifacts intact so an incident can be properly investigated." },
    { term: "Tabletop exercise", definition: "A discussion-based rehearsal of a hypothetical incident used to find readiness gaps safely." },
    { term: "Lessons learned", definition: "The post-incident review that improves defenses and playbooks." },
    { term: "NTP", definition: "Network Time Protocol — synchronizes clocks so logs from different systems can be correlated accurately." },
    { term: "Impossible travel", definition: "A detection pattern where logins from distant locations appear too close together in time to be one person traveling normally." },
  ],
  realWorld:
    "You get a \"new sign-in\" alert for school email from a city you've never visited. **Detection** gave you the signal; next you **contain** (revoke sessions, reset password, confirm MFA), **preserve evidence** with a screenshot, tell IT if it's a school account, then review **logs**/activity for what else changed.",
  quiz: [
    {
      id: "q1",
      question: "Why do logs matter during an incident?",
      choices: [
        "They help reconstruct what happened with times, accounts, and actions",
        "They automatically patch every vulnerability",
        "They replace the need for MFA",
        "They make phishing emails illegal",
      ],
      correctIndex: 0,
      explanation:
        "Logs provide the timeline and evidence defenders need to understand and respond to incidents.",
    },
    {
      id: "q2",
      question: "How do prevention and detection differ?",
      choices: [
        "Prevention notices attacks; detection stops them beforehand",
        "Prevention tries to stop attacks; detection notices what still happens",
        "They are unrelated concepts in cybersecurity",
        "Detection only works when a device is offline",
      ],
      correctIndex: 1,
      explanation:
        "Prevention reduces successful attacks; detection catches suspicious activity that slips through.",
    },
    {
      id: "q3",
      question: "In basic IR order, what should usually come right after identifying a real incident?",
      choices: [
        "Post every detail on social media",
        "Skip straight to lessons learned",
        "Contain the damage / limit spread",
        "Delete all logs immediately",
      ],
      correctIndex: 2,
      explanation:
        "After identify, contain — stop the bleeding before cleanup and recovery.",
    },
    {
      id: "q4",
      question: "A school club Discord is compromised. Who should you typically notify first?",
      choices: [
        "Only strangers on the internet for advice",
        "Nobody — silence is safer",
        "The attacker, to negotiate publicly",
        "The adult sponsor / account owners and follow school rules for IT escalation if needed",
      ],
      correctIndex: 3,
      explanation:
        "Escalate to responsible adults/owners (and IT when appropriate). Don't handle serious account takeovers alone in secret.",
    },
    {
      id: "q5",
      question: "What belongs in the \"lessons learned\" step?",
      choices: [
        "Identifying what failed and which controls/habits to improve next time",
        "Pretending nothing happened",
        "Disabling all logging forever",
        "Sharing private passwords with the whole grade",
      ],
      correctIndex: 0,
      explanation:
        "Lessons learned turn pain into better prevention, detection, and playbooks.",
    },
    {
      id: "q6",
      question: "Why is evidence preservation (like screenshots and timelines) important before a full factory reset?",
      choices: [
        "It isn't important — resetting immediately is always best",
        "It preserves the information needed to understand scope and cause before cleanup destroys it",
        "It guarantees the attacker will be caught",
        "It replaces the need to tell anyone about the incident",
      ],
      correctIndex: 1,
      explanation:
        "Panic-wiping can erase the exact evidence needed to determine what happened and whether other systems were affected.",
    },
    {
      id: "q7",
      question: "What is the main purpose of a tabletop exercise?",
      choices: [
        "To practice actually attacking a live system",
        "To replace the need for backups",
        "To discuss a hypothetical incident scenario and find gaps in the response plan, calmly and in advance",
        "To publicly announce security weaknesses",
      ],
      correctIndex: 2,
      explanation:
        "Tabletop exercises are discussion-only rehearsals that reveal readiness gaps — like unclear ownership or missing contacts — before a real incident.",
    },
    {
      id: "q8",
      question: "Two logins to the same account happen eight minutes apart from very distant locations. What pattern is this, and what should happen?",
      choices: [
        "This is normal and needs no response",
        "This means the account has too much storage",
        "This always means the internet provider made an error, so ignore it",
        "This is 'impossible travel' — treat it as likely compromise and investigate/contain quickly",
      ],
      correctIndex: 3,
      explanation:
        "Impossible travel is a strong detection signal for account compromise and should trigger rapid investigation and containment.",
    },
  ],
  reflection: {
    prompt:
      "Imagine your personal email shows a login you don't recognize. List your first three actions in order, what you would preserve as evidence, and who you might tell if it were a school-managed account instead.",
    placeholder: "Example: 1) Screenshot the alert… 2) Change password + check MFA… 3) Revoke other sessions… For school email I'd also tell…",
  },
};
