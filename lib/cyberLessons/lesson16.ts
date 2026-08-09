import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson16: AILessonConfig = {
  id: "cs-16",
  title: "16. Capstone: Defend & Justify",
  goal: "Synthesize the cybersecurity track into a justified security plan for a school club — recommend prioritized controls, compare alternatives, and justify each choice with feasibility, usability, and ethics tradeoffs, not just a control checklist.",
  xpReward: 800,
  badge: "Cyber Defender",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/15",
  instructorScript: `**Coach's note**
Today's lesson: **Capstone: Defend & Justify**.

**Goal:** Synthesize the cybersecurity track into a justified security plan for a school club — recommend prioritized controls, compare alternatives, and justify each choice with feasibility, usability, and ethics tradeoffs, not just a control checklist.

**How to facilitate**
1. Warm-up: ask students what they already think about "What you'll learn today".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~30–35 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-16.png",
        imageAlt: "Capstone planning desk: school club scenario folder, security checklist, and laptop",
        body: `This is your **Cybersecurity capstone**. You'll defend a realistic school club by synthesizing the whole track — then **justify** every recommendation with feasibility, usability, and ethics tradeoffs, not a bare checklist.\n\nHere's the plan:\n\n• Meet the **Greenwood scenario** and the demand for *justified* control selection.\n• Fast **track toolkit** recap (evaluate → recommend → justify).\n• Apply **CIA + identity defenses** (phishing, MFA, least privilege).\n• Apply **hardening, crypto/HTTPS, and privacy** with tradeoffs named.\n• Apply **network and access-control thinking** to the club's setup.\n• Draft **detection, IR, and risk priorities** — compare alternatives.\n• Build a short **security plan** that defends *why* each control won.\n• **Present and justify** your reasoning under pushback.\n\nBy the end, you should sound like a Cyber Defender — calm, ethical, and able to justify tradeoffs.`,
        callout: {
          label: "Why it matters",
          text: "Real security work is synthesis plus justification: recommending a few high-impact controls, explaining what you deferred and why, and knowing what to do when something fails.",
        },
      },
      {
        id: "scenario",
        kicker: "Your mission",
        title: "Scenario: Greenwood Media Club",
        image: "/images/lessons/cs-16-2.png",
        imageAlt: "After-school club room with shared laptop Wi-Fi and a Defend This Space poster",
        body: `You're advising the **Greenwood High Media Club** (about 25 members). They have:\n\n• A shared **club Gmail** used for sponsor emails and contest logins.\n• A **Google Drive** with photo/video projects and a budget spreadsheet.\n• Two **shared laptops** for editing (sometimes left in the classroom).\n• An **Instagram** account that promotes events.\n• A simple **club website** on a free host for meeting times.\n• A basic **home-style router** in the club room providing Wi-Fi for the shared laptops and members' phones.\n\nRecent headaches: a near-miss phishing email asking for "Drive access," a laptop that hasn't updated in months, public Instagram posts showing student ID badges in the background, and nobody is sure who still has the Gmail password after seniors graduated.\n\n**Your job is not a shopping list.** For Greenwood, **recommend prioritized controls and justify each selection**: why this control over an alternative, what feasibility/usability/ethics tradeoff you accepted, and what residual risk remains. Use Lessons 1–15 as evidence.`,
        callout: {
          label: "Constraints",
          text: "No big budget, no full-time IT staff — justify free/high-impact habits and clear ownership over flashy tools the club cannot sustain.",
        },
      },
      {
        id: "recap",
        kicker: "Capstone",
        title: "Your defender toolkit — evaluate, recommend, justify",
        body: `You've built a full kit across the track. Today's job is to *use* it and **justify** choices:\n\n• **Foundations:** ethics, CIA triad, authentication — evaluate impact first.\n• **Human layer:** phishing/social engineering defense — recommend habits, not stunts.\n• **Identity:** unique passwords, **MFA**, password managers — justify vs convenience.\n• **Access control:** RBAC, **least privilege**, separation of duties, access review.\n• **Network & config:** secure Wi-Fi/defaults, segmentation thinking.\n• **Crypto & trust:** HTTPS/certificates/padlock limits.\n• **Operations:** hardening/patching/backups; logging/monitoring/IR.\n• **Analysis:** attack patterns & program security, OSINT/privacy ethics, risk analysis & control selection by efficiency/feasibility/ethics.\n\nYou don't need every control at once. You need the *right few* for Greenwood — with tradeoffs explained.`,
        callout: {
          label: "You can now",
          text: "Evaluate risks, recommend layered controls, justify tradeoffs in plain English, and outline incident response — entry-level cyber readiness.",
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
            "Pause, verify through a known channel (not by replying to the email), and only proceed if confirmed legitimate",
            "Approve immediately since it references a real, familiar file” belongs to a different situation than the one in the question stem",
            "Forward the email to the entire club to get more opinions” belongs to a different situation than the one in the question stem",
            "“Ignore MFA since the email itself seems convincing” describes a different situation than the one in the question stem",
          ],
          correctIndex: 0,
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
            "Leave it alone since removing access might seem unfriendly” belongs to a different situation than the one in the question stem",
            "Grant everyone Editor access instead to avoid future confusion” belongs to a different situation than the one in the question stem",
            "Delete the entire Drive folder to start fresh” belongs to a different situation than the one in the question stem",
            "Remove or downgrade the unnecessary access, document the change, and schedule the next review",
          ],
          correctIndex: 3,
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
            "A policy and assigned reviewer prevent the same mistake from recurring with future officers who weren't around for the original incident",
            "“It doesn't matter — deleting the photos alone fully solves the problem forever” describes a different situation than the one in the question stem",
            "Picking “Blurring photos is illegal, so a policy is required instead” is a common mix-up that confuses a nearby idea with the right one",
            "Treat “Only technical fixes matter; process and policy are irrelevant” as a distractor: close in topic, incorrect for the required answer",
          ],
          correctIndex: 0,
          explanation:
            "A one-time fix doesn't survive officer turnover. Building a lightweight policy and assigning ownership makes the fix durable, which is the essence of good security process.",
        },
      },
      {
        id: "ir-risk",
        kicker: "Apply it",
        title: "Risk priorities, monitoring, and an IR mini-plan",
        body: `**Risk snapshot (prioritized) — with justification hints:**\n1. Club Gmail takeover (high likelihood/impact) → **mitigate** with MFA, unique creds, fewer custodians. *Why first:* highest efficiency; free; officers can run it. *Deferred:* paid SOC tools (not feasible).\n2. Drive data leak via public link (medium/high) → mitigate with link audits + least privilege. *Tradeoff:* slightly slower sharing vs sponsor-data confidentiality.\n3. Laptop loss / malware on outdated OS (medium/high) → patching, locks, encryption if available, backups. *Compare:* new laptop purchase vs patching+backup — justify the cheaper path first.\n4. Instagram impersonation/spam (medium/medium) → MFA + admin hygiene. *Ethics:* protect the public channel without monitoring members' personal accounts.\n\n**Detection:** login alerts; monthly Drive sharing check; notice weird Instagram posts.\n\n**IR mini-plan (identify → contain → eradicate → recover → lessons):**\n• Suspected Gmail compromise → revoke sessions, change password, confirm MFA, check forwarding rules/filters, tell sponsor/IT as required, review Drive activity, write lessons (who had access?).\n\nDocument owners *and* the residual risk you still accept after these controls.`,
        callout: {
          label: "Try in the reflection",
          text: "Your plan must prioritize three controls with WHY — including feasibility, usability, or ethics tradeoffs — not just a list.",
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
            "Checking for and removing any malicious forwarding rules or filters the attacker may have set up",
            "Immediately deleting the entire email account” belongs to a different situation than the one in the question stem",
            "Posting publicly that the account was compromised” belongs to a different situation than the one in the question stem",
            "Nothing further is needed once the password is changed” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
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
        body: `Hand this structure to a club sponsor — every control row needs a **justification**:\n\n**1. Scope** — accounts, devices, data we protect.\n**2. Top 3 risks** — likelihood/impact in plain words.\n**3. Prioritized controls this month** — for each: what you chose, what you compared it to, and WHY (feasibility / usability / ethics).\n**4. Roles** — sponsor, student lead, treasurer (least privilege, separation of duties on payments).\n**5. Monitoring** — alerts we watch; monthly 15-minute review.\n**6. Incident contacts & first steps** — contain checklist.\n**7. Backups** — where finals live; who verifies restore.\n**8. Residual risk & review date** — what you still accept; next semester checkup.\n\nShort beats perfect — but short without justification is just a wishlist. A one-page plan people can defend outperforms a 40-page binder nobody reads.`,
        bullets: [
          "Prioritize identity + backups + patching — and justify each over alternatives.",
          "Name humans for each critical task.",
          "Document residual risk and a review date so the plan doesn't rot.",
        ],
        callout: {
          label: "Ethics",
          text: "Everything in your plan should be defensive and authorized. No \"testing\" phishing classmates or scanning networks without permission.",
        },
      },
      {
        id: "plan-template-example",
        kicker: "See it in action",
        title: "A filled-in one-pager for Greenwood (with justifications)",
        body: `Here's what the template looks like actually filled out — notice each control includes a tradeoff justification:\n\n**Scope:** Club Gmail, Drive, two laptops, Instagram, club website, club-room Wi-Fi.\n\n**Top 3 risks:** (1) Gmail takeover via phishing/reuse — high/high. (2) Public Drive link exposing budget/sponsor data — medium/high. (3) Outdated laptop with no backup — medium/high.\n\n**Controls this month (justified):**\n• MFA + unique passwords on Gmail/IG — *vs* buying a hardware firewall first: MFA is free, high impact, officers can finish in one meeting.\n• Drive sharing audit + named links — *vs* deleting Drive: keeps collaboration usable while fixing confidentiality.\n• Auto-updates + tested backup — *vs* new laptops: restores availability without a budget ask.\n• Change router default admin password — low effort, removes a common misconfiguration.\n\n**Roles:** Sponsor holds backup codes and approves payments; president manages access; treasurer submits (doesn't approve) reimbursements.\n\n**Monitoring / IR / Backups / Review:** login alerts; monthly sharing check; revoke-sessions playbook; restore test date; end-of-semester review.\n\n**Residual risk accepted:** prompt-bombing and compromised personal devices remain possible — documented for revisit if the club handles more money next year.\n\nThis is synthesis: risks, owners, *and* justified tradeoffs tied to Greenwood — not a generic checklist.`,
        checkIn: {
          prompt: "What makes a Greenwood security plan meet the \"defend & justify\" bar?",
          choices: [
            "A common mix-up is to treat only large organizations need justifications as enough, which confuses a nearby idea with the right one",
            "It can seem like listing as many tools as possible without owners or tradeoffs, but that reading skips the distinction this question is testing",
            "Prioritizing a few controls with named owners and explaining why each beat an alternative on feasibility, usability, or ethics — plus residual risk",
            "It can seem like plans without owners are more secure because they're simpler, but that reading skips the distinction this question is testing",
          ],
          correctIndex: 2,
          explanation:
            "Capstone standard: recommend, compare, justify tradeoffs, name owners, and acknowledge residual risk — not an unowned shopping list.",
        },
      },
      {
        id: "present-defend",
        kicker: "The real test",
        title: "Presenting and defending your reasoning",
        body: `A capstone isn't just about producing a plan — it's about **justifying tradeoffs** when someone (a sponsor, a skeptical classmate, a future officer) pushes back. Real defenders constantly compare alternatives for people who aren't security experts.\n\nPractice justifying choices like these, in plain language:\n\n• **"Why MFA on Instagram? It's just a club account, not a bank."** Identity is the high-likelihood path; a compromised social account can scam followers/sponsors. Tradeoff: ~2 minutes per login vs sponsor trust — feasibility wins over "we'll be careful."\n• **"Why not buy monitoring software instead?"** Efficiency/feasibility: MFA + login alerts reduce the same risk officers can actually run; shelfware with no owner fails Lesson 15's control-selection test.\n• **"Why does the treasurer need advisor approval? Don't you trust them?"** Separation of duties is ethics + integrity: it protects everyone if an account is compromised — not a trust insult.\n• **"Isn't a risk register overkill?"** Fifteen minutes prevents re-learning the same lessons every officer turnover — compare that cost to one lost sponsor list.\n\nExplain *why this beat that*, including what residual risk you still accept.`,
        bullets: [
          "Expect pushback — justify with feasibility, usability, and ethics, not slogans.",
          "Compare alternatives: name what you deferred and why.",
          "Separation of duties protects everyone, including the person being \"checked.\"",
        ],
        callout: {
          label: "Why it matters",
          text: "A plan nobody can justify gets ignored. Plain-language tradeoffs are what make Greenwood's plan survive contact with a real club.",
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
            "Citing abstract best practices and industry standards with no connection to the club's actual experience” belongs to a different situation than the one in the question stem",
            "It can seem like insisting the plan must be followed without any explanation, but that reading skips the distinction this question is testing",
            "Referencing the club's real near-miss incident and tying each proposed control directly to that specific risk and its low cost of implementation",
            "It can seem like agreeing to drop the security measures to avoid conflict, but that reading skips the distinction this question is testing",
          ],
          correctIndex: 2,
          explanation:
            "The most convincing defense ties controls to real, specific incidents and impact the audience already understands and cares about — not generic best-practice language.",
        },
      },
      {
        id: "checklist",
        kicker: "Put it together",
        title: "The capstone defender checklist",
        body: `One last synthesis before the knowledge check — the full arc of the track, condensed into a single working checklist:\n\n**1. Identity first** — unique passwords/passphrases, password managers, MFA everywhere it's offered, watch for prompt bombing.\n**2. Access control** — least privilege, RBAC, separation of duties on sensitive actions, periodic access review.\n**3. Network & config basics** — password-protected Wi-Fi, changed defaults, sensible firewall/segmentation habits.\n**4. Crypto & trust** — HTTPS, certificate warnings, padlock ≠ honesty.\n**5. Hardening & recovery** — patching, backups that are actually tested, device inventory.\n**6. Privacy ethics** — minimize oversharing, evaluate nonevident collection, justify privacy–safety balances.\n**7. Risk-driven selection** — rank by likelihood × impact; recommend controls by efficiency/feasibility/ethics; track residual risk in a living register.\n**8. Incident response** — identify → contain → eradicate → recover → lessons learned, with named owners.\n**9. Justify under pushback** — compare alternatives; explain feasibility, usability, and ethics tradeoffs in audience language.\n\nThat's the whole track — the same structure your Greenwood plan should reflect, with justifications included.`,
        callout: {
          label: "Try this",
          text: "Before the knowledge check, pick three checklist items and practice justifying why you'd prioritize them for Greenwood over a flashier alternative.",
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
        id: "greenwood-phish-drill",
        kicker: "Scenario walkthrough",
        title: "Greenwood drill: the sponsor-list phish",
        body: `**Injected scenario:** A DM to the Greenwood president: "Urgent — sponsor PDF needed for audit tonight. Use this link." Domain is one character off the real sponsor portal.

**Walkthrough using your toolkit:**
1. **Pause** — urgency + unexpected link.
2. **Verify** — call/text sponsor using saved contact, not DM.
3. **Contain** — do not enter credentials; warn officers not to click.
4. **Report** — advisor + IT if school email involved.
5. **Recover** — if anyone clicked, revoke sessions, rotate passwords, audit Drive sharing.

**Plan tie-in:** Your one-pager should already list incident contacts and "verify financial requests out-of-band" — this drill tests whether those lines are real or decoration.`,
      },
      {
        id: "greenwood-sharing-audit",
        kicker: "Decision checklist",
        title: "Greenwood: 15-minute sharing audit script",
        body: `Officers run this monthly:

**Drive / cloud:**
• List shared links; downgrade "anyone with link" to named people.
• Check anonymous viewers on budget and sponsor folders.
• Confirm graduated members removed.

**Email:**
• Review forwarding rules and connected apps.
• Confirm MFA on club Gmail.

**Social:**
• Review admin roles; remove unused apps with post access.

**Log results** in the risk register row for public exposure — note date and finder initials.

Short, scheduled audits beat heroic all-nighters before sponsors notice a leak.`,
        bullets: [
          "Named sharing only for sponsor data.",
          "Remove graduated officers same week.",
          "Log each audit date in the register.",
        ],
      },
      {
        id: "greenwood-backup-test",
        kicker: "See it in action",
        title: "Greenwood: proving backups work",
        body: `**Scenario:** Final video project due Friday. Club relies on cloud sync. Capstone task: actually restore one file to a different device this week.

**Steps:**
1. Pick a non-critical file; download or restore copy to officer laptop.
2. Note how long it took and who had access.
3. If restore fails, fix sync or add second copy before finals crunch.
4. Document in plan: backup owner, frequency, last successful test date.

Capstone points are not for writing "we back up" — they are for showing a tested restore timestamp.`,
        checkIn: {
          prompt: "Why is a tested restore stronger evidence than saying \"we use cloud sync\"?",
          choices: [
            "Cloud sync never fails” is close in topic, but it is the wrong fit for what the prompt asks",
            "“Backups matter only for ransomware” describes a different situation than the one in the question stem",
            "A tested restore proves recovery works before a crisis, not just that uploads usually happen",
            "“Restores are only for IT staff” describes a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "Testing proves the recovery path works — sync errors and ransomware targeting synced folders happen without warning.",
        },
      },
      {
        id: "greenwood-ir-tabletop",
        kicker: "Scenario walkthrough",
        title: "Greenwood tabletop: Instagram takeover at midnight",
        body: `**Tabletop prompt:** At 12:30 a.m., club Instagram posts scam links. President wakes up to DMs from followers.

**Round 1 — Identify:** unauthorized login from new city; president still has email access.
**Round 2 — Contain:** revoke sessions, change password, enable MFA, post brief "we were compromised, ignore prior posts" once account secured.
**Round 3 — Eradicate/recover:** remove malicious posts, check connected apps, scan officer devices for malware if phishing link was clicked.
**Round 4 — Lessons learned:** add login review to monthly audit; document in register.

Run tabletops aloud with your team — capstone plans survive contact with reality when officers have rehearsed calm steps.`,
      },
      {
        id: "handoff-plan",
        kicker: "What to do next",
        title: "Handing the plan to next year's officers",
        body: `Security plans fail at officer turnover unless handoff is explicit:

• **Pass the one-pager** plus risk register with review dates.
• **Transfer recovery codes** through advisor-supervised session — never group chat.
• **15-minute walkthrough** — MFA locations, backup owner, incident contacts.
• **First-month task** — new president runs sharing audit on week two.

**Comparison — decay vs continuity:**
• Decay: new officers inherit passwords in DMs and no written plan.
• Continuity: dated doc, named owners, scheduled first audit.

Your capstone is not only Greenwood's present — it is Greenwood's memory.`,
        callout: {
          label: "Defender view",
          text: "Write the plan so a stranger officer next year can follow it without you in the room.",
        },
      },
      {
        id: "capstone-myths-extra",
        kicker: "Myth check",
        title: "Last myths before you present Greenwood",
        body: `• **"More tools = better capstone."** Habits, owners, and review dates beat a shopping list.
• **"We are too small for IR steps."** Midnight Instagram takeover is small-scale but real — contain and document anyway.
• **"Perfect plan or don't present."** Acknowledge residual risk with dated next steps — sponsors respect honesty.
• **"Security ends after this assignment."** Greenwood's register review date is what keeps it alive.

Present like a defender: specific risks, specific controls, specific owners, specific dates.`,
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn — defend Greenwood",
        body: `You've walked the full defender path. Capstone recap:\n\n• **Synthesize** CIA, phishing defense, MFA/least privilege/separation of duties, network/hardening, HTTPS limits, privacy ethics, IR, program security, and risk analysis.\n• **Recommend** a few high-impact controls with clear owners.\n• **Justify** each choice with feasibility, usability, and ethics tradeoffs — name alternatives you deferred and residual risk you accept.\n• Write a short plan you could actually run — and defend under pushback.\n\nComplete the **Knowledge check** (cross-track synthesis + tradeoff justification), then prioritize **three controls with WHY** in the reflection. You've earned the **Cyber Defender** finish line.`,
      },
    ],
  },
  bigIdeas: [
    "Capstone security work is **synthesis plus justification**: recommend a few high-impact controls for a real scenario and explain tradeoffs — not every possible tool.",
    "For a school club, start with **identity**, then **network/hardening/backups**, **privacy**, and **IR** — each choice should survive a feasibility/usability/ethics challenge.",
    "A one-page plan with named owners, justified priorities, residual risk, review dates, and first-hour incident steps beats an unused binder — defend every choice in plain language.",
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
      question: "Greenwood has no MFA on Gmail (password in chat) and a sponsor offers to buy an unused enterprise firewall. Which justified recommendation is strongest?",
      choices: [
            "A common mix-up is to treat turn off login alerts so members aren't annoyed as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "“Buy the firewall before changing credentials because hardware always beats identity controls” describes a different situation than the one in the question stem",
            "A common mix-up is to treat make Instagram fully public to confuse attackers as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Prioritize unique password + MFA + clear owners first — higher efficiency and feasibility than shelfware nobody will manage; document residual risk afterward",
          ],
      correctIndex: 3,
      explanation:
        "Cross-track synthesis (identity + risk selection): justify MFA/ownership over infeasible tools using efficiency and feasibility.",
    },
    {
      id: "q2",
      question: "A Drive folder with the budget sheet is \"anyone with the link.\" Which analysis best combines CIA impact with a justified control?",
      choices: [
            "A common mix-up is to treat only physical laptop theft matters here as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat only availability is at risk; delete Drive entirely as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat nothing — public links are always safe as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Confidentiality (and possibly integrity) is threatened — recommend named sharing + least privilege rather than ending collaboration, accepting a small usability tradeoff",
          ],
      correctIndex: 3,
      explanation:
        "Synthesize CIA + access control + tradeoffs: fix confidentiality without killing the club's workflow.",
    },
    {
      id: "q3",
      question: "The club website uses HTTPS. A phishing page also shows a padlock. What should members remember?",
      choices: [
            "Picking “Padlock means any site is trustworthy” is a common mix-up that confuses a nearby idea with the right one",
            "HTTPS encrypts the connection to that domain — they must still verify the URL and avoid fake login pages; keep MFA",
            "It can seem like hTTPS replaces MFA forever, but that reading skips the distinction this question is testing",
            "Certificate warnings should always be ignored — familiar wording, wrong fit for what the prompt is actually asking",
          ],
      correctIndex: 1,
      explanation:
        "Capstone synthesis from the HTTPS lesson: padlock ≠ honesty. Check domains; keep MFA.",
    },
    {
      id: "q4",
      question: "Laptops are unpatched with no tested backups. Officers debate buying new machines vs patching + restore tests. Which tradeoff justification is best?",
      choices: [
            "A common mix-up is to treat accept total data loss as unavoidable with no controls as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Recommend patching + restore-tested backups first (preventive + corrective) — higher feasibility/efficiency than new hardware; revisit purchases if hardware is failing",
            "A common mix-up is to treat ignore updates; delete logs if malware appears as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat only post more frequently on Instagram as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
      correctIndex: 1,
      explanation:
        "Justify operations controls with risk-selection thinking: preventive patching + corrective backups before budget asks.",
    },
    {
      id: "q5",
      question: "Instagram starts posting spam. Using IR order, what is the best immediate containment move after confirming it's unauthorized?",
      choices: [
            "Revoke other sessions, change the password, confirm MFA, and remove unknown connected apps — then clean posts and notify the sponsor",
            "You might defend “Share the password with all 25 members to \"help investigate\"” in casual talk, but it fails the definition used here",
            "It can seem like publicly accuse a classmate with no evidence, but that reading skips the distinction this question is testing",
            "It can seem like write lessons learned before changing anything, but that reading skips the distinction this question is testing",
          ],
      correctIndex: 0,
      explanation:
        "Contain access first (sessions/password/MFA/apps), then clean up and escalate — don't widen access during an incident.",
    },
    {
      id: "q6",
      question: "A sponsor says separation of duties for reimbursements \"means we don't trust the treasurer.\" Which justification synthesizes access control + ethics?",
      choices: [
            "A common mix-up is to treat certificate revocation replaces approval workflows as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat network segmentation alone solves payment fraud as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Explain that splitting submit vs approve protects integrity if any one account is compromised — ethics of shared responsibility, not personal distrust; usability cost is one extra approval",
            "A common mix-up is to treat agree and give the treasurer sole approval to avoid hurt feelings as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
      correctIndex: 2,
      explanation:
        "Capstone justification: separation of duties is an integrity/ethics control with a small usability tradeoff — not a trust insult.",
    },
    {
      id: "q7",
      question: "After containing a compromised club Gmail account, what eradication step is important to check before considering the incident resolved?",
      choices: [
            "Check for and remove any malicious forwarding rules or filters the attacker may have added",
            "Immediately delete the account permanently” belongs to a different situation than the one in the question stem",
            "Nothing else is needed once the password is changed” belongs to a different situation than the one in the question stem",
            "Post the incident details publicly on social media” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "Attackers sometimes leave forwarding rules or filters that persist after a password change — checking for these is a key eradication step in the IR order.",
    },
    {
      id: "q8",
      question: "Greenwood must choose among (A) MFA on Gmail, (B) live public location sharing \"for safety\" on every trip, and (C) a risk register with owners. Which cross-track justification is strongest?",
      choices: [
            "A common mix-up is to treat buy tools for all three with no owners or residual-risk notes as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Prioritize A for high-likelihood identity risk; use time-boxed private check-ins instead of B (privacy vs safety ethics); keep C so justifications survive officer turnover",
            "A common mix-up is to treat do B only — privacy never matters when someone says safety as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat skip A and C because \"being careful\" is enough as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
      correctIndex: 1,
      explanation:
        "Synthesis across identity, privacy/ethics, and risk lessons: recommend high-efficiency MFA, proportionate safety habits, and owned documentation — with tradeoffs named.",
    },
  ],
  reflection: {
    prompt:
      "Write a short Greenwood (or similar club) security plan. Prioritize exactly THREE controls for this month. For EACH: state the risk it addresses, what alternative you compared it to, and WHY you chose it (include feasibility, usability, and/or ethics tradeoffs). Also name owners, residual risk you accept, monitoring, and first-hour steps if shared email is compromised.",
    placeholder:
      "Example: (1) MFA on Gmail vs buying a firewall — chose MFA because… (2) Named Drive sharing vs deleting Drive — chose named sharing because… (3) Tested backups vs new laptops — chose backups because… Owners… Residual risk… If compromised — revoke sessions, reset password, check forwarding rules…",
  },
};
