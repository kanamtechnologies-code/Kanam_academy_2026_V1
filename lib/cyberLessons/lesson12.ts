import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson12: AILessonConfig = {
  id: "cs-12",
  title: "12. Logging, Monitoring & Incidents",
  goal: "Recommend detection and incident-response measures for realistic scenarios by efficiency and feasibility; design a simple IR playbook with clear roles; and justify what to log, preserve, escalate, and practice before a real incident.",
  xpReward: 600,
  badge: "Incident Ready",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/11",
  nextHref: "/learn/cyber/13",
  instructorScript: `**Coach's note**
Today's lesson: **Logging, Monitoring & Incidents**.

**Goal:** Recommend detection and incident-response measures for realistic scenarios by efficiency and feasibility; design a simple IR playbook with clear roles; and justify what to log, preserve, escalate, and practice before a real incident.

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
        image: "/images/lessons/cs-12.png",
        imageAlt: "SOC-style monitors with calm alert banners and a runbook binder labeled Incident Response",
        body: `Prevention is great — until something slips through. Then you need **detection**, **logs**, and a calm **incident response** plan. Today you'll **recommend** what to monitor and how to respond by **efficiency and feasibility**, and design a playbook with **roles** — not how to attack systems.\n\nHere's our roadmap:\n\n• **Why logs matter** — timelines over guesswork.\n• **What to log (feasibly)** — prioritize high-value signals; protect retention.\n• **Detection vs prevention** — recommend both layers for scenarios.\n• **IR playbook with roles** — identify → contain → eradicate → recover → lessons.\n• **Evidence preservation** — why panic-wiping makes things worse.\n• **Escalation** — who to tell, with efficient reports.\n• **Tabletop drills** — find gaps before adrenaline arrives.\n\nPairs with Lesson 11 hardening: prevent first, then detect and respond when something slips through.`,
        callout: {
          label: "Why it matters",
          text: "Many teams fail not because they never get hit, but because nobody owns the next step — or they destroy evidence while panicking.",
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
            "They mainly matter after you've already recovered the account” belongs to a different situation than the one in the question stem",
            "They provide a timeline of who did what and when, turning guesswork into evidence",
            "They replace the need for strong passwords and MFA” belongs to a different situation than the one in the question stem",
            "They automatically fix any problem they detect” belongs to a different situation than the one in the question stem",
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
        body: `**Prevention** tries to stop attacks: patching, MFA, phishing training, least privilege, hardening.\n\n**Detection** assumes something may still happen: monitoring failed logins, odd file sharing, antivirus alerts, \"new login from nowhere\" notices.\n\n**Recommend for scenarios (efficiency first):**\n• **Credential stuffing pattern** — many failed logins then one success → contain (reset/revoke/MFA) before deep forensics.\n• **Impossible travel** — successful logins from far-away places minutes apart → investigate MFA status and post-login changes (forwarding rules, recovery email).\n• **Feasible club detection** — enable login alerts + five-minute weekly auth review; skip building custom SIEM rules nobody will maintain.\n\nA locked door (prevention) plus an alarm (detection) beats either alone. Recommend both, sized to the team.`,
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
            "Assume it's fine because the password worked both times” belongs to a different situation than the one in the question stem",
            "Treat it as likely account compromise, check MFA status and recent changes, and respond quickly",
            "Immediately delete the account permanently” belongs to a different situation than the one in the question stem",
            "Ignore it — location data on logins is always wrong” belongs to a different situation than the one in the question stem",
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
        body: `Not everything needs logging, and not every log needs to be kept forever. **Recommend by efficiency and feasibility** — clubs and families rarely have a SOC, so pick high-signal, low-effort sources:\n\n• **Authentication logs** — who signed in, when, from where, MFA used? (usually the highest ROI first check)\n• **Access / sharing logs** — who opened, downloaded, or shared sensitive files.\n• **Change logs** — settings, permissions, admin roles, forwarding rules.\n• **Alert logs** — antivirus, \"new device,\" \"new login\" notices.\n\n**Efficiency tradeoffs:** Logging *everything* forever is rarely feasible (storage, privacy, noise). Recommend focusing retention on auth + sharing/change history (e.g., 30–90 days where the platform allows) rather than dumping every click. Prefer platforms whose activity history an attacker can't freely erase.\n\nIf you can only check one thing after a suspicious event, recommend login/auth history first — most signal per minute.`,
        bullets: [
          "Prioritize authentication, access, and change logs for feasibility.",
          "Retention long enough to investigate delayed discoveries — not infinite.",
          "Logs an attacker can freely delete are much less useful.",
        ],
        callout: {
          label: "Defender view",
          text: "Efficient detection is the five-minute weekly login review — not building a dashboard nobody will watch.",
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
            "It doesn't matter — all incidents are noticed within a day” belongs to a different situation than the one in the question stem",
            "Longer retention means you can still investigate issues discovered weeks or months after they happened",
            "Retention only matters for video files, not text logs” belongs to a different situation than the one in the question stem",
            "Shorter retention always makes systems more secure” belongs to a different situation than the one in the question stem",
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
        body: `Here's a simple IR loop used widely (wording varies, idea is stable):\n\n**1. Identify** — Confirm something real is wrong. Gather symptoms: alert text, weird charges, ransomware note, locked account.\n**2. Contain** — Stop the bleeding. Disconnect a compromised device from Wi-Fi if appropriate, revoke sessions, reset passwords, pause risky sharing — without destroying needed evidence when you can help it.\n**3. Eradicate** — Remove the cause: malware cleanup with proper tools/IT help, close the exposed setting, remove the malicious OAuth app.\n**4. Recover** — Restore from clean backups, re-enable services carefully, verify systems work.\n**5. Lessons learned** — What failed? What will you change (MFA, training, patching, logging)?\n\n**Playbook design with roles (recommend names, not vibes):**\n• **Reporter** — first person who notices; captures screenshots/time; does not wipe yet.\n• **Account owner / tech lead** — runs contain steps (password, sessions, MFA, sharing).\n• **Sponsor / IT escalatee** — notified early for school-managed or money-impacting incidents.\n• **Communicator** — one person approved to tell members/followers what is safe to say.\n\nFeasible club playbooks fit on one page. Knowing the order — and who owns each step — beats \"reinstall everything\" panic.`,
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
            "Immediately delete the account permanently” belongs to a different situation than the one in the question stem",
            "Contain: change the password, revoke sessions, and confirm MFA before further cleanup",
            "Post about it publicly right away” belongs to a different situation than the one in the question stem",
            "Wait a few weeks to see if it resolves on its own” belongs to a different situation than the one in the question stem",
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
            "Screenshot the odd behavior, note the timeline, and check with IT/a trusted adult about what to preserve first",
            "“Nothing — reset immediately without any documentation” describes a different situation than the one in the question stem",
            "Wait several weeks before doing anything — familiar wording, wrong fit for what the prompt is actually asking",
            "Post photos of it on social media for advice from strangers” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
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
            "Including when it happened, what you observed, what you already did, and any evidence (like a screenshot)",
            "Sending it to as many unrelated people as possible instead of the right contact” belongs to a different situation than the one in the question stem",
            "Waiting a month before mentioning it — familiar wording, wrong fit for what the prompt is actually asking",
            "Being as vague as possible so it seems less serious” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Specific, timely, evidence-backed reports help responders act quickly and accurately — vague or delayed reports slow everything down.",
        },
      },
      {
        id: "mini-playbook",
        kicker: "School & club ready",
        title: "A mini playbook you can actually use",
        body: `Example: club social account starts posting spam. **Recommend measures by efficiency:**\n\n• **Identify (Reporter)** — Confirm posts aren't from a teammate; check login/session history (fastest signal).\n• **Contain (Account owner)** — Revoke sessions, change password, enable MFA, remove unknown apps — before rewriting the bio.\n• **Eradicate** — Delete malicious posts; check bio/links/forwarding-like settings.\n• **Recover (Communicator + sponsor)** — Restore branding; brief approved notice if followers were at risk.\n• **Lessons** — Unique password + MFA + fewer admins; add a monthly login review (feasible five-minute detection).\n\nSame skeleton works for shared drives, Discord, and school email — adjust roles and who you escalate to. Efficiency means contain access first; cosmetic cleanup second.`,
        callout: {
          label: "Myth check",
          text: "Incident response isn't only for Fortune 500 SOCs. Student clubs and families need simple playbooks with named roles too.",
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
            "You might defend “A type of malware used by professional red teams” in casual talk, but it fails the definition used here",
            "A rushed pass can land on actually attacking a live system to test defenses”; careful readers reject it for this problem",
            "You might defend “A physical tabletop game with no security purpose” in casual talk, but it fails the definition used here",
            "A discussion-based walkthrough of a hypothetical incident to find gaps in a response plan, before a real incident happens",
          ],
          correctIndex: 3,
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
        id: "incident-decisions",
        kicker: "Decision checklist",
        title: "First-hour incident decisions",
        body: `When something goes wrong, the first hour sets the tone. Work this order **with roles**:

**1. Identify (Reporter)** — What account, device, or service is affected? What symptoms?
**2. Contain (Account owner)** — Sign out sessions, disconnect if needed, revoke suspicious apps — stop spread before deep investigation.
**3. Preserve (Reporter + owner)** — Screenshot timestamps; do not wipe yet.
**4. Escalate (Sponsor/IT path)** — facts, not accusations.
**5. Communicate (one Communicator)** — need-to-know updates only.

**Comparison — panic vs procedure:**
• Panic: wipe everything, blast social posts, blame classmates, skip containment.
• Procedure: contain → preserve → escalate → recover → lessons — efficient use of the first hour.

Calm is a skill. Tabletop drills exist so roles and order are practiced before adrenaline arrives.`,
      },
      {
        id: "log-review-habits",
        kicker: "Defender habits",
        title: "Reading logs you actually have access to",
        body: `You may not have a SOC dashboard — but many services show useful history:

• **Email** — recent sign-ins, forwarding rules, connected apps.
• **Cloud drives** — sharing changes, anonymous viewers, edit history.
• **Social platforms** — login locations, authorized third-party apps.
• **School portals** — grade or schedule access logs if exposed to students.

**Weekly habit (five minutes):** scan login activity on primary email; remove unknown connected apps; confirm sharing links still match intent.

**After an incident:** export or screenshot logs before attackers remove them; note timezone and device names.

Logs tell stories backward. The habit is looking before you need them urgently at midnight.`,
        callout: {
          label: "Watch out",
          text: "Attackers often add email forwarding rules or recovery emails first — check those before assuming \"nothing looks wrong.\"",
        },
      },
      {
        id: "post-incident-reporting",
        kicker: "What to do next",
        title: "Writing a useful post-incident summary",
        body: `**Template defenders appreciate:**

• **What happened** — one plain sentence.
• **When noticed** — date/time/timezone.
• **Scope** — which accounts, devices, data types.
• **Containment steps taken** — password changes, sessions revoked, device isolated.
• **Evidence saved** — screenshots, headers, log exports.
• **Open questions** — what still unknown.
• **Lessons learned** — one control to add (MFA, sharing audit, backup test).

**Scenario:** Club Instagram posted spam links for an hour. Summary: unauthorized login from new city at 2:14 a.m.; president revoked sessions at 7:30 a.m.; MFA enabled; sponsors notified with plain-language explanation; monthly login review added to officer checklist.

Good summaries help the next officer avoid repeating the same Tuesday.`,
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Recommend** high-ROI logs (auth, sharing/change) with feasible retention — not \"log everything.\"\n• **Prevention + detection** together; size detection to efficiency (alerts + short reviews).\n• **IR playbook with roles**: identify → contain → eradicate → recover → lessons (Reporter, owner, escalatee, Communicator).\n• **Preserve evidence** before panic-wiping; escalate with facts.\n• **Tabletop drills** find ownership gaps before a real incident.\n\nTake the **Knowledge check**, then justify an IR recommendation for a scenario.`,
      },
    ],
  },
  bigIdeas: [
    "**Recommend** what to log and monitor by efficiency — auth and change/sharing history beat unwatched dashboards.",
    "**Prevention** reduces hits; **detection** and **IR** handle what slips through, with **evidence preservation** protecting investigation.",
    "A feasible IR playbook names **roles** and the order identify → contain → eradicate → recover → lessons — rehearsed in **tabletop drills**.",
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
      question: "A club can spend five minutes a week on detection. Which recommendation is most efficient and feasible?",
      choices: [
            "“Only monitor after a breach is already confirmed on social media” describes a different situation than the one in the question stem",
            "Some learners answer “Build a full custom SIEM and log every click forever”, yet that does not match the precise idea from the lesson",
            "You might defend “Turn logging off to save space — prevention alone is enough” in casual talk, but it fails the definition used here",
            "Enable login alerts and review authentication/sharing-change history weekly; keep retention long enough to investigate delayed finds",
          ],
      correctIndex: 3,
      explanation:
        "Recommend high-ROI signals sized to the team. Unwatched mega-logging is inefficient; no logging is worse.",
    },
    {
      id: "q2",
      question: "How do prevention and detection differ?",
      choices: [
            "Detection only works when a device is offline” belongs to a different situation than the one in the question stem",
            "They are unrelated concepts in cybersecurity” belongs to a different situation than the one in the question stem",
            "Prevention notices attacks; detection stops them beforehand",
            "Prevention tries to stop attacks; detection notices what still happens",
          ],
      correctIndex: 3,
      explanation:
        "Prevention reduces successful attacks; detection catches suspicious activity that slips through.",
    },
    {
      id: "q3",
      question: "Club Instagram starts posting spam. Which first-hour recommendation best matches IR order and roles?",
      choices: [
            "Reporter screenshots posts/times; account owner contains (revoke sessions, reset password, MFA, remove unknown apps); escalate to sponsor — cleanup of posts after access is cut",
            "A common mix-up is to treat factory-reset the president's phone immediately, then check login history later as enough, which confuses a nearby idea with the right one",
            "It can seem like communicator posts a long public thread naming suspected classmates before containment, but that reading skips the distinction this question is testing",
            "A common mix-up is to treat skip contain and jump to lessons learned over pizza as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
      correctIndex: 0,
      explanation:
        "Efficient IR: preserve briefly, contain access with a clear owner, escalate — cosmetic cleanup after the bleeding stops.",
    },
    {
      id: "q4",
      question: "A school club Discord is compromised. Who should you typically notify first?",
      choices: [
            "The adult sponsor / account owners and follow school rules for IT escalation if needed",
            "“Nobody — silence is safer” describes a different situation than the one in the question stem",
            "The attacker, to negotiate publicly” belongs to a different situation than the one in the question stem",
            "Only strangers on the internet for advice” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "Escalate to responsible adults/owners (and IT when appropriate). Don't handle serious account takeovers alone in secret.",
    },
    {
      id: "q5",
      question: "What belongs in the \"lessons learned\" step?",
      choices: [
            "Disabling all logging forever” belongs to a different situation than the one in the question stem",
            "Identifying what failed and which controls/habits to improve next time",
            "Sharing private passwords with the whole grade” belongs to a different situation than the one in the question stem",
            "Pretending nothing happened” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Lessons learned turn pain into better prevention, detection, and playbooks.",
    },
    {
      id: "q6",
      question: "A shared laptop looks infected. Why recommend screenshots/timeline before a factory reset when IT may investigate?",
      choices: [
            "Resetting immediately is always best — evidence never matters for clubs” belongs to a different situation than the one in the question stem",
            "“It replaces the need to tell anyone about the incident” describes a different situation than the one in the question stem",
            "Preservation keeps scope/cause reconstructable; wiping first can destroy the only clues about what was accessed",
            "“Screenshots guarantee the attacker will be arrested” describes a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Panic-wiping can erase evidence needed to determine impact. Ask IT what to preserve when feasible.",
    },
    {
      id: "q7",
      question: "What is the main purpose of a tabletop exercise?",
      choices: [
            "To discuss a hypothetical incident scenario and find gaps in the response plan, calmly and in advance",
            "“To practice actually attacking a live system” describes a different situation than the one in the question stem",
            "“To publicly announce security weaknesses” describes a different situation than the one in the question stem",
            "To replace the need for backups — familiar wording, wrong fit for what the prompt is actually asking",
          ],
      correctIndex: 0,
      explanation:
        "Tabletop exercises are discussion-only rehearsals that reveal readiness gaps — like unclear ownership or missing contacts — before a real incident.",
    },
    {
      id: "q8",
      question: "Two logins eight minutes apart from distant cities appear on school email. Which response recommendation is best justified?",
      choices: [
            "A common mix-up is to treat ignore it — location data is always wrong as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Treat as likely impossible-travel compromise: contain (sessions/password/MFA), check forwarding rules and recent changes, notify IT for a school account",
            "A common mix-up is to treat wait two weeks to see if more alerts arrive as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat delete the account permanently as step one as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
      correctIndex: 1,
      explanation:
        "Impossible travel is a strong detection signal. Recommend rapid contain + scoped checks + escalation for managed accounts.",
    },
  ],
  reflection: {
    prompt:
      "Design a one-page IR playbook for your club or family for this scenario: shared cloud drive suddenly shared publicly, noticed three days later. Recommend (1) what to log/monitor going forward for efficiency, (2) first-hour steps in order with named roles, (3) what to preserve before cleanup, and (4) one detection habit that is feasible to keep monthly. Justify why your plan is efficient enough that people will actually follow it.",
    placeholder: "Example: Roles — Reporter… Owner… Sponsor… First hour: … Logging going forward: … Monthly habit: … Justification: …",
  },
};
