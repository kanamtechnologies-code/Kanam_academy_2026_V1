import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson16: AILessonConfig = {
  id: "cs-16",
  title: "16. Capstone: Defend the Scenario",
  goal: "Synthesize the cybersecurity track by defending a school club / small-org scenario — applying CIA, phishing defense, MFA, hardening, incident response, and risk priorities into a short security plan.",
  xpReward: 800,
  badge: "Cyber Defender",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/15",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-16.png",
        imageAlt: "Capstone planning desk: school club scenario folder, security checklist, and laptop",
        body: `This is your **Cybersecurity capstone**. You'll step into the role of defender for a realistic school club and pull the whole track together — not as isolated facts, but as one coherent plan.\n\nHere's the plan:\n\n• Meet the **scenario** and what's at stake.\n• Fast **track recap** of the tools in your kit.\n• Apply **CIA + identity defenses** (phishing, MFA, least privilege).\n• Apply **hardening, crypto/HTTPS awareness, and privacy**.\n• Apply **network and access-control thinking** to the club's setup.\n• Draft **detection, IR, and risk priorities**.\n• Build a short **security plan** you could actually hand a club sponsor.\n• **Present and defend your reasoning**, the way a real defender would.\n\nBy the end, you should sound like a Cyber Defender — calm, ethical, and practical.`,
        callout: {
          label: "Why it matters",
          text: "Real security work is synthesis: choosing a few high-impact controls and knowing what to do when something fails — not memorizing every buzzword.",
        },
      },
      {
        id: "scenario",
        kicker: "Your mission",
        title: "Scenario: Greenwood Media Club",
        image: "/images/lessons/cs-16-2.png",
        imageAlt: "After-school club room with shared laptop Wi-Fi and a Defend This Space poster",
        body: `You're advising the **Greenwood High Media Club** (about 25 members). They have:\n\n• A shared **club Gmail** used for sponsor emails and contest logins.\n• A **Google Drive** with photo/video projects and a budget spreadsheet.\n• Two **shared laptops** for editing (sometimes left in the classroom).\n• An **Instagram** account that promotes events.\n• A simple **club website** on a free host for meeting times.\n• A basic **home-style router** in the club room providing Wi-Fi for the shared laptops and members' phones.\n\nRecent headaches: a near-miss phishing email asking for "Drive access," a laptop that hasn't updated in months, public Instagram posts showing student ID badges in the background, and nobody is sure who still has the Gmail password after seniors graduated.\n\nYour job: defend this small org with the skills from Lessons 1–15.`,
        callout: {
          label: "Constraints",
          text: "No big budget, no full-time IT staff on the club — prioritize free/high-impact habits and clear ownership.",
        },
      },
      {
        id: "recap",
        kicker: "Capstone",
        title: "Your defender toolkit — quick recap",
        body: `You've built a full kit across the track. Today's job is to *use* it:\n\n• **Foundations:** ethics, CIA triad, authentication.\n• **Human layer:** malware awareness, phishing/social engineering defense.\n• **Identity:** strong unique passwords, hashing concept, **MFA**, password managers, prompt-bombing awareness.\n• **Access control:** authentication vs. authorization, RBAC, **least privilege**, separation of duties, access lifecycle/review.\n• **Network & config:** defender networking basics (IP/DNS/ports/packets), firewalls, host vs. network filtering, secure config, segmentation.\n• **Crypto & trust:** encryption/hashing ideas, HTTPS/certificates/padlock limits.\n• **Operations:** hardening/patching/backups/inventory; logging/monitoring/IR.\n• **Analysis:** attack patterns (defender view), OSINT/privacy awareness, risk & controls, risk registers.\n\nYou don't need every control at once. You need the *right few* for Greenwood's risks.`,
        callout: {
          label: "You can now",
          text: "Explain risks in plain English, pick layered controls, and outline an incident response — the core of entry-level cyber readiness.",
        },
      },
      {
        id: "identity-cia",
        kicker: "Apply it",
        title: "Protect CIA with identity-first defenses",
        body: `For Greenwood, start where impact is highest: **identity and access**.\n\n• **Confidentiality:** Drive files and sponsor contacts shouldn't be world-readable; review sharing links.\n• **Integrity:** Budget sheet edits should be limited to treasurer + sponsor.\n• **Availability:** If Gmail is locked by an attacker, contests and sponsors stall — plan recovery.\n\nConcrete moves:\n\n1. Unique password in a password manager for club Gmail + **MFA** (sponsor holds backup codes).\n2. Remove graduated seniors; apply **least privilege** on Drive (editors vs viewers).\n3. Phishing drill: never approve unexpected Drive access; verify via known channels.\n4. Instagram: fewer admins; MFA on; no password sharing in group chats.\n\nThese steps alone crush the most likely high-impact failures.`,
        bullets: [
          "MFA + unique passwords on shared accounts.",
          "Least privilege on Drive roles.",
          "Phishing skepticism as club policy.",
        ],
        callout: {
          label: "Common failure",
          text: "Shared passwords in a Notes file with no MFA — convenient until one device is stolen or one member is phished.",
        },
      },
      {
        id: "identity-cia-example",
        kicker: "See it in action",
        title: "Walking a real Drive-access phishing attempt",
        body: `Following the timeline of Greenwood's actual near-miss: a club officer receives an email that looks like a Google notification, saying a "collaborator" needs **Drive access approval** to view the sponsor list, with an urgent-sounding subject line.\n\nApplying the identity-first playbook the club just built:\n\n1. **Pause on the urgency** — the phishing-awareness habit from earlier lessons kicks in: legitimate access requests rarely need to be approved within minutes.\n2. **Verify out-of-band** — the officer messages the club's actual known contacts (not by replying to the email) to ask if anyone requested Drive access recently. Nobody did.\n3. **Deny and report** — the request is declined, and the officer flags it to the club advisor and other officers so everyone is aware a phishing attempt occurred.\n4. **Check nothing else happened** — since MFA is already enabled on the shared account, even if someone had clicked further, the account itself would have an extra layer of protection.\n\nThis single incident — handled calmly using habits from Lessons 2–5 — is exactly the kind of "near miss" that separates a well-prepared club from one that discovers its identity gaps the hard way.`,
        checkIn: {
          prompt: "A club officer receives an urgent-looking email asking for Drive access approval to the sponsor list. What is the correct first step?",
          choices: [
            "Approve immediately since it references a real, familiar file",
            "Pause, verify through a known channel (not by replying to the email), and only proceed if confirmed legitimate",
            "Forward the email to the entire club to get more opinions",
            "Ignore MFA since the email itself seems convincing",
          ],
          correctIndex: 1,
          explanation:
            "Urgency and a familiar-sounding request aren't proof of legitimacy. Verifying out-of-band before approving any access request is the core phishing-defense habit from earlier lessons.",
        },
      },
      {
        id: "network-access-review",
        kicker: "Apply it",
        title: "Applying network and access-control thinking",
        body: `Greenwood's club room has a basic router providing Wi-Fi, and several people touch club accounts. Applying lessons on networking and access control:\n\n**Network:**\n• Confirm the club room's Wi-Fi requires a password (not open) — a quick win from the networking lesson.\n• If the router offers a **guest network**, put personal phones/visitor devices there, keeping the shared laptops on a separate, more controlled network segment.\n• Check whether the router still uses its **default admin password** — if so, change it (a hardening basics habit).\n\n**Access control:**\n• Apply **RBAC** thinking to Drive: Officer role (edit), Member role (comment/view), rather than one flat "everyone can edit everything" setup.\n• Check for **role creep** — does anyone still have Editor access from a task that ended months ago?\n• Add lightweight **separation of duties** for money: the treasurer can submit a reimbursement request, but the advisor must approve it before anything is paid.\n\nNone of this requires a dedicated IT budget — just applying the mental models from Lessons 6–8 to Greenwood's actual small setup.`,
        bullets: [
          "Confirm Wi-Fi requires a password; segment guest devices if possible.",
          "Change the router's default admin password.",
          "Apply RBAC + least privilege to Drive roles; add separation of duties for payments.",
        ],
        callout: {
          label: "Defender view",
          text: "A club doesn't need enterprise network gear — it needs the same mental models (segmentation, least privilege, default hardening) applied at a smaller scale.",
        },
      },
      {
        id: "network-access-review-example",
        kicker: "See it in action",
        title: "Catching role creep before it becomes a problem",
        body: `While auditing Drive access as part of the network/access-control review, the club president finds something unexpected: a graduated senior from two years ago still has **Editor** access to the budget spreadsheet, and a current member who briefly helped with sponsor outreach last fall still has **Editor** access to the entire Drive, even though that task ended months ago.\n\nApplying access-lifecycle thinking from Lesson 6:\n\n1. **Confirm** neither person currently needs this access — the graduated senior isn't in the club anymore at all, and the current member's outreach task is long finished.\n2. **Remove** the graduated senior's access entirely, and **downgrade** the current member from Editor to Viewer on the parts of the Drive they don't actively need.\n3. **Document** the change with a date, so if anyone asks "wait, why did my access change?" there's a clear record of why.\n4. **Schedule** the next review for the following semester, rather than treating this as a one-time cleanup.\n\nThis is role creep, caught in the act — exactly the kind of accumulated, forgotten access that periodic review exists to catch before it becomes an actual incident.`,
        checkIn: {
          prompt: "During a Drive access review, the club finds a graduated member and a former task volunteer both still have Editor access they no longer need. What is the correct response?",
          choices: [
            "Leave it alone since removing access might seem unfriendly",
            "Remove or downgrade the unnecessary access, document the change, and schedule the next review",
            "Grant everyone Editor access instead to avoid future confusion",
            "Delete the entire Drive folder to start fresh",
          ],
          correctIndex: 1,
          explanation:
            "This is role creep — access that outlived its purpose. Removing/downgrading it, documenting the change, and scheduling future reviews is the correct access-lifecycle response.",
        },
      },
      {
        id: "harden-privacy",
        kicker: "Apply it",
        title: "Harden devices and shrink public exposure",
        body: `Next layer: systems and privacy.\n\n**Hardening & patching**\n• Inventory both laptops + who administers them.\n• Turn on OS/browser auto-updates; set screen locks.\n• Remove unused apps; disable leftover guest accounts.\n• Back up project files to Drive *and* export critical finals elsewhere periodically.\n\n**Crypto / HTTPS awareness**\n• Use HTTPS admin/login pages only; heed certificate warnings.\n• Remember: padlock ≠ "this DM is safe."\n\n**OSINT / privacy**\n• Stop posting badge photos; blur IDs.\n• Post event travel after returning when possible.\n• Review Instagram privacy/tag settings, and check photo **metadata** before emailing raw files to sponsors.\n\nYou're reducing attack surface and the raw material for spear phishing.`,
        callout: {
          label: "Defender view",
          text: "A patched, inventoried laptop with backups beats an expensive gadget the club won't maintain.",
        },
      },
      {
        id: "harden-privacy-example",
        kicker: "See it in action",
        title: "Fixing the badge-photo problem end to end",
        body: `Greenwood's Instagram has several photos where student ID badges are clearly readable in the background — exactly the oversharing pattern flagged in the privacy lesson.\n\nA full defender response, not just "delete the photos":\n\n1. **Immediate fix:** the current officer reviews recent posts and either removes or blurs the ones showing readable badges.\n2. **Policy fix:** the club adopts a simple rule — before posting any event photo, glance for visible badges, tickets, or ID numbers in the frame, and crop or blur if needed.\n3. **Process fix:** one officer is designated to do a quick review pass before event photos go live, rather than whoever took the photo posting it immediately.\n4. **Awareness fix:** the club briefly discusses *why* this matters — badge details plus other public info (school, schedule, names) could plausibly fuel impersonation attempts, tying back to the OSINT-awareness lesson.\n\nThis is the capstone habit in miniature: don't just patch the symptom (delete a few photos) — build a small process so the same mistake doesn't quietly recur next semester with a new set of officers who never heard about the original incident.`,
        checkIn: {
          prompt: "Greenwood fixes its badge-photo problem by removing current photos, adopting a review policy, and assigning someone to check future posts. Why does this full response matter more than just deleting a few photos?",
          choices: [
            "It doesn't matter — deleting the photos alone fully solves the problem forever",
            "A policy and assigned reviewer prevent the same mistake from recurring with future officers who weren't around for the original incident",
            "Blurring photos is illegal, so a policy is required instead",
            "Only technical fixes matter; process and policy are irrelevant",
          ],
          correctIndex: 1,
          explanation:
            "A one-time fix doesn't survive officer turnover. Building a lightweight policy and assigning ownership makes the fix durable, which is the essence of good security process.",
        },
      },
      {
        id: "ir-risk",
        kicker: "Apply it",
        title: "Risk priorities, monitoring, and an IR mini-plan",
        body: `**Risk snapshot (prioritized):**\n1. Club Gmail takeover (high likelihood/impact) → mitigate with MFA, unique creds, fewer custodians.\n2. Drive data leak via public link (medium/high) → mitigate with link audits + least privilege.\n3. Laptop loss / malware on outdated OS (medium/high) → mitigate with patching, locks, encryption if available, backups.\n4. Instagram impersonation/spam (medium/medium) → mitigate with MFA + admin hygiene.\n\n**Detection:** enable login alerts; check Drive sharing monthly; notice weird Instagram posts.\n\n**IR mini-plan (identify → contain → eradicate → recover → lessons):**\n• Suspected Gmail compromise → revoke sessions, change password, confirm MFA, check forwarding rules/filters, tell sponsor/IT as required, review Drive activity, write lessons (who had access?).\n\nDocument owners: *who* resets passwords, *who* talks to sponsors, *who* holds backup codes.`,
        callout: {
          label: "Try in the reflection",
          text: "Your written security plan should name top risks, controls, owners, and what to do in the first hour of an account incident.",
        },
      },
      {
        id: "ir-risk-example",
        kicker: "See it in action",
        title: "Running the IR mini-plan on a real scenario",
        body: `One morning, an officer notices the club Gmail sent several strange emails to sponsors overnight that nobody in the club actually wrote. Walking the IR order:\n\n1. **Identify:** confirm this is real by checking sent mail — yes, several unfamiliar emails went out overnight, and a new, unrecognized device shows in recent login activity.\n2. **Contain:** immediately revoke all active sessions on the account and change the password from a trusted device.\n3. **Eradicate:** check for and remove any suspicious mail forwarding rules or filters the attacker may have set up to spy on future emails or hide their tracks — a step that's easy to forget but critical, since a forwarding rule can persist even after a password change.\n4. **Recover:** confirm MFA is properly re-enabled, notify sponsors that any strange overnight emails should be disregarded, and check Drive sharing for any new, unexpected grants.\n5. **Lessons learned:** the club discusses how this happened (a reused password, it turns out) and documents the fix (switching to a password manager + MFA) so future officers know why the policy exists.\n\nNotice step 3 — checking for forwarding rules — is a detail that's easy to skip if you only think "change the password" without following the full identify → contain → eradicate → recover → lessons sequence.`,
        checkIn: {
          prompt: "After containing a compromised club Gmail account (revoking sessions, changing the password), what important eradication step is easy to forget but critical to check?",
          choices: [
            "Immediately deleting the entire email account",
            "Checking for and removing any malicious forwarding rules or filters the attacker may have set up",
            "Posting publicly that the account was compromised",
            "Nothing further is needed once the password is changed",
          ],
          correctIndex: 1,
          explanation:
            "Attackers sometimes set up mail forwarding rules or filters that persist even after a password change — checking for and removing these is a key eradication step.",
        },
      },
      {
        id: "plan-template",
        kicker: "Deliverable",
        title: "Security plan template (keep it one page)",
        image: "/images/lessons/cs-16-3.png",
        imageAlt: "Filled security plan worksheet covering MFA phishing hardening and incident contacts",
        body: `Hand this structure to a club sponsor:\n\n**1. Scope** — accounts, devices, data we protect.\n**2. Top 3 risks** — likelihood/impact in plain words.\n**3. Controls this month** — MFA, password manager, sharing audit, updates, privacy cleanup.\n**4. Roles** — sponsor, student lead, treasurer (least privilege, separation of duties on payments).\n**5. Monitoring** — alerts we watch; monthly 15-minute review.\n**6. Incident contacts & first steps** — contain checklist.\n**7. Backups** — where finals live; who verifies restore.\n**8. Review date** — next semester checkup.\n\nShort beats perfect. A one-page plan that people follow outperforms a 40-page binder nobody reads.`,
        bullets: [
          "Prioritize identity + backups + patching.",
          "Name humans for each critical task.",
          "Schedule a review so the plan doesn't rot.",
        ],
        callout: {
          label: "Ethics",
          text: "Everything in your plan should be defensive and authorized. No \"testing\" phishing classmates or scanning networks without permission.",
        },
      },
      {
        id: "plan-template-example",
        kicker: "See it in action",
        title: "A filled-in one-pager for Greenwood",
        body: `Here's what the template looks like actually filled out, condensed:\n\n**Scope:** Club Gmail, Drive, two laptops, Instagram, club website, club-room Wi-Fi.\n\n**Top 3 risks:** (1) Gmail takeover via phishing/reuse — high/high. (2) Public Drive link exposing budget/sponsor data — medium/high. (3) Outdated laptop with no backup — medium/high.\n\n**Controls this month:** Enable MFA + unique passwords (Gmail, Instagram); audit all Drive sharing links; turn on laptop auto-updates; change router's default admin password.\n\n**Roles:** Sponsor (advisor) holds backup codes and approves payments; student president manages day-to-day access; treasurer submits (but doesn't approve) reimbursements.\n\n**Monitoring:** Login alerts on Gmail; monthly 15-minute Drive-sharing check by the president.\n\n**Incident contacts & first steps:** Advisor + IT contact listed; first steps = revoke sessions, change password, check forwarding rules.\n\n**Backups:** Final videos backed up to Drive and one officer's personal cloud storage; treasurer periodically test-opens a backup to confirm it actually works.\n\n**Review date:** End of fall semester.\n\nThis fits on one page, names real owners, and directly addresses the risks identified earlier in the lesson — nothing generic or copy-pasted from a template with no connection to Greenwood's actual situation.`,
        checkIn: {
          prompt: "A club's one-page security plan lists specific owners (advisor, president, treasurer) for specific tasks (backup codes, sharing audits, reimbursement submission) rather than just generic advice. Why does this matter?",
          choices: [
            "It doesn't matter — generic advice works just as well",
            "Naming specific owners for specific tasks makes the plan something people can actually follow, rather than a vague document nobody acts on",
            "Only large organizations need named owners",
            "Plans without owners are more secure because they're simpler",
          ],
          correctIndex: 1,
          explanation:
            "A plan with named owners for specific tasks is far more likely to actually be followed than generic, unowned advice — this is a key theme from the access-control and risk lessons.",
        },
      },
      {
        id: "present-defend",
        kicker: "The real test",
        title: "Presenting and defending your reasoning",
        body: `A capstone isn't just about producing a plan — it's about being able to **explain and defend your choices** when someone (a sponsor, a skeptical classmate, a future officer) pushes back. Real defenders constantly have to justify tradeoffs to people who aren't security experts.\n\nPractice defending choices like these, in plain language:\n\n• **"Why MFA on Instagram? It's just a club account, not a bank."** Because it's often the *identity* attackers target first — a compromised social account can be used to scam followers or sponsors, and email/social accounts are frequently the recovery path for other things.\n• **"Why does the treasurer need advisor approval for payments? Don't you trust them?"** It's not about trust — separation of duties protects everyone, including the treasurer, if their account is ever compromised without their knowledge.\n• **"Isn't a risk register overkill for a school club?"** A simple five-row table takes fifteen minutes and prevents the club from re-learning the same lessons every time officers change.\n\nBeing able to explain *why*, not just *what*, is what separates someone who memorized a checklist from someone who actually understands defense.`,
        bullets: [
          "Expect pushback — plan to explain the *why*, not just the *what*.",
          "Frame controls in terms of real impact, not just \"best practice.\"",
          "Separation of duties protects everyone, including the person being \"checked.\"",
        ],
        callout: {
          label: "Why it matters",
          text: "A security plan nobody understands or agrees with gets ignored. Being able to explain your reasoning in plain language is what makes a plan actually survive contact with a real club.",
        },
      },
      {
        id: "present-defend-example",
        kicker: "See it in action",
        title: "Defending the plan in front of the club",
        body: `At the next club meeting, the president presents the security plan. A skeptical member pushes back: "This feels like a lot of extra steps for a media club. Can't we just keep doing what we've been doing?"\n\nA strong defender-style response doesn't get defensive — it explains impact in terms the room cares about:\n\n"Last semester we had a phishing email nearly trick us into giving away Drive access to our sponsor list. If that had worked, we could have lost sponsor trust and had to explain a data leak to the school. The changes we're proposing — MFA, unique passwords, a sharing audit — take maybe twenty minutes total to set up, and they directly address exactly what almost went wrong. We're not trying to become a security company; we're just fixing the two or three things most likely to actually hurt us."\n\nNotice the response: it references a **real, specific incident** the club already experienced, ties each control to **that specific risk**, and frames the cost (twenty minutes) against the impact (sponsor trust, potential data leak) — rather than citing abstract "best practices" nobody in the room has a reason to care about.`,
        checkIn: {
          prompt: "A club member pushes back on new security measures as \"too much extra work.\" What makes for the strongest defense of the plan?",
          choices: [
            "Citing abstract best practices and industry standards with no connection to the club's actual experience",
            "Referencing the club's real near-miss incident and tying each proposed control directly to that specific risk and its low cost of implementation",
            "Insisting the plan must be followed without any explanation",
            "Agreeing to drop the security measures to avoid conflict",
          ],
          correctIndex: 1,
          explanation:
            "The most convincing defense ties controls to real, specific incidents and impact the audience already understands and cares about — not generic best-practice language.",
        },
      },
      {
        id: "checklist",
        kicker: "Put it together",
        title: "The capstone defender checklist",
        body: `One last synthesis before the knowledge check — the full arc of the track, condensed into a single working checklist:\n\n**1. Identity first** — unique passwords/passphrases, password managers, MFA everywhere it's offered, watch for prompt bombing.\n**2. Access control** — least privilege, RBAC, separation of duties on sensitive actions, periodic access review.\n**3. Network & config basics** — password-protected Wi-Fi, changed defaults, sensible firewall/segmentation habits.\n**4. Crypto & trust awareness** — HTTPS, certificate warnings, padlock ≠ honesty.\n**5. Hardening & recovery** — patching, backups that are actually tested, device inventory.\n**6. Privacy discipline** — minimize oversharing, watch for metadata, verify urgent requests out-of-band.\n**7. Risk-driven prioritization** — rank by likelihood × impact, choose mitigate/avoid/transfer/accept deliberately, track it in a living register.\n**8. Incident response** — identify → contain → eradicate → recover → lessons learned, with named owners.\n**9. Communicate and defend** — explain the *why* in terms your actual audience cares about.\n\nThat's the whole track, in one page — the same structure your Greenwood plan should reflect.`,
        callout: {
          label: "Try this",
          text: "Before the knowledge check, see if you can recall one concrete example from this course for each of the nine checklist items above.",
        },
      },
      {
        id: "myths",
        kicker: "Reality check",
        title: "Capstone myths worth retiring",
        body: `Pulling together threads from across the whole track:\n\n• **"Security is mostly about buying the right tools."** Greenwood's plan barely mentions purchases — it's mostly about habits, ownership, and default settings.\n• **"A small club/team isn't a realistic target."** Small organizations are common targets precisely because they often have weaker defenses than they realize.\n• **"Once the plan is written, the work is done."** The review date and monitoring steps exist because plans decay as people, tools, and threats change.\n• **"Perfect security is the goal."** The goal is a small number of high-impact controls, consciously chosen, with acknowledged residual risk — not an impossible zero-risk state.`,
        bullets: [
          "Habits and ownership usually matter more than purchased tools.",
          "Small organizations are realistic, common targets.",
          "A plan needs review dates — it decays without maintenance.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"We're too small/unimportant to be targeted.\" Attackers often prefer easy, under-defended targets over hardened, high-profile ones.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn — defend Greenwood",
        body: `You've walked the full defender path. Capstone recap:\n\n• Synthesize **CIA**, **phishing defense**, **MFA/least privilege/separation of duties**, **network and hardening basics**, **HTTPS awareness**, **privacy**, **IR**, and **risk prioritization**.\n• Favor a few high-impact controls with clear owners.\n• Write a short plan you could actually run — and be ready to **explain and defend** it in plain language.\n\nComplete the **Knowledge check** (it mixes ideas across the track), then write your **security plan** in the reflection. You've earned the **Cyber Defender** finish line — go show the synthesis.`,
      },
    ],
  },
  bigIdeas: [
    "Capstone security work is **synthesis**: prioritize a few high-impact controls for a real scenario, not every possible tool.",
    "For a school club, start with **identity** (MFA, unique passwords, least privilege, separation of duties), then **network/hardening/backups**, **privacy**, and a simple **IR** plan.",
    "A one-page plan with named owners, top risks, review dates, and first-hour incident steps beats an unused binder of policies — and you should be able to explain and defend every choice in it.",
  ],
  keyTerms: [
    { term: "CIA triad", definition: "Confidentiality, Integrity, Availability — the core security goals." },
    { term: "MFA", definition: "Multi-factor authentication — requiring more than a password to sign in." },
    { term: "Least privilege", definition: "Giving people only the access they need for their role." },
    { term: "Separation of duties", definition: "Splitting a sensitive process (like approving payments) across more than one person." },
    { term: "Hardening", definition: "Reducing weaknesses via patching, secure defaults, and removing unused exposure." },
    { term: "Incident response", definition: "Identify, contain, eradicate, recover, and learn from security events." },
    { term: "Risk prioritization", definition: "Ranking what to fix first using likelihood and impact." },
    { term: "Security plan", definition: "A short, owned list of risks, controls, monitoring, and incident steps." },
  ],
  realWorld:
    "Student clubs lose access when seniors graduate with the only passwords, or get burned by a single phish on a shared inbox. A lightweight plan — MFA, inventory, least privilege, backups, IR contacts — prevents most of that drama.",
  quiz: [
    {
      id: "q1",
      question: "Greenwood's club Gmail has no MFA and a password shared in a group chat. What is the best first mitigation?",
      choices: [
        "Buy an expensive firewall before changing anything else",
        "Move to a unique strong password, enable MFA, and stop sharing the password in chat — store access with clear owners",
        "Make the Instagram public to confuse attackers",
        "Turn off all login alerts so members aren't annoyed",
      ],
      correctIndex: 1,
      explanation:
        "Identity risk is top priority. Unique credentials + MFA + ownership beat random hardware purchases.",
    },
    {
      id: "q2",
      question: "A Drive folder with the budget sheet is set to \"anyone with the link.\" Which CIA goal is most directly threatened?",
      choices: [
        "Only availability",
        "Confidentiality (and possibly integrity if editing is allowed)",
        "Nothing — public links are always safe",
        "Only physical laptop theft",
      ],
      correctIndex: 1,
      explanation:
        "Public links expose data (confidentiality) and may allow unwanted changes (integrity) depending on permissions.",
    },
    {
      id: "q3",
      question: "The club website uses HTTPS. A phishing page also shows a padlock. What should members remember?",
      choices: [
        "Padlock means any site is trustworthy",
        "HTTPS encrypts the connection to that domain — they must still verify the URL and avoid fake login pages",
        "HTTPS replaces MFA forever",
        "Certificate warnings should always be ignored",
      ],
      correctIndex: 1,
      explanation:
        "Capstone synthesis from the HTTPS lesson: padlock ≠ honesty. Check domains; keep MFA.",
    },
    {
      id: "q4",
      question: "A shared laptop is months behind on updates and has no backup of final video projects. Which pair best matches preventive + corrective thinking?",
      choices: [
        "Ignore updates; delete logs if malware appears",
        "Enable patching/auto-updates now (preventive) and set up restore-tested backups (corrective readiness)",
        "Only post more frequently on Instagram",
        "Accept total data loss as unavoidable with no controls",
      ],
      correctIndex: 1,
      explanation:
        "Patching reduces vulnerability; backups enable recovery — classic preventive + corrective pairing.",
    },
    {
      id: "q5",
      question: "Instagram starts posting spam. Using IR order, what is the best immediate containment move after confirming it's unauthorized?",
      choices: [
        "Write lessons learned before changing anything",
        "Revoke other sessions, change the password, confirm MFA, and remove unknown connected apps — then clean posts and notify the sponsor",
        "Publicly accuse a classmate with no evidence",
        "Share the password with all 25 members to \"help investigate\"",
      ],
      correctIndex: 1,
      explanation:
        "Contain access first (sessions/password/MFA/apps), then clean up and escalate — don't widen access during an incident.",
    },
    {
      id: "q6",
      question: "The treasurer can submit reimbursement requests, but the advisor must approve them before money moves. What principle does this reflect?",
      choices: [
        "Least privilege only",
        "Separation of duties — no single account can complete the sensitive process alone",
        "Network segmentation",
        "Certificate revocation",
      ],
      correctIndex: 1,
      explanation:
        "Splitting a sensitive process (approving payments) across two roles is separation of duties, protecting against a single compromised or careless account.",
    },
    {
      id: "q7",
      question: "After containing a compromised club Gmail account, what eradication step is important to check before considering the incident resolved?",
      choices: [
        "Nothing else is needed once the password is changed",
        "Check for and remove any malicious forwarding rules or filters the attacker may have added",
        "Immediately delete the account permanently",
        "Post the incident details publicly on social media",
      ],
      correctIndex: 1,
      explanation:
        "Attackers sometimes leave forwarding rules or filters that persist after a password change — checking for these is a key eradication step in the IR order.",
    },
    {
      id: "q8",
      question: "A sponsor asks why the club bothers with a risk register and named owners instead of just \"being careful.\" What's the best defense of this approach?",
      choices: [
        "It's not worth defending — being careful is sufficient on its own",
        "A written register with owners and review dates keeps knowledge from living only in one person's head and prevents plans from decaying as officers change",
        "Risk registers are only required for large corporations",
        "Named owners are unnecessary if the club trusts each other",
      ],
      correctIndex: 1,
      explanation:
        "Written, owned, and scheduled processes survive officer turnover and changing circumstances far better than an informal \"just be careful\" approach.",
    },
  ],
  reflection: {
    prompt:
      "Write a short security plan for Greenwood Media Club (or a club you know). Include: top 3 risks, controls for this month, who owns what, how you'll monitor, first steps if the shared email is compromised, and one point you'd need to defend if a sponsor pushed back on it.",
    placeholder:
      "Example: Top risks — Gmail takeover, public Drive link, outdated laptops. This month — MFA on Gmail/IG, sharing audit, auto-updates + backup check. Owners — sponsor holds backup codes; treasurer controls budget access but advisor approves payments. If Gmail is compromised — revoke sessions, reset password, check forwarding rules, tell sponsor. If pushed back on MFA for Instagram — I'd explain it's often the first identity attackers target…",
  },
};
