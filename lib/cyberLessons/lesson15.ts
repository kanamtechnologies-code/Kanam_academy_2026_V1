import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson15: AILessonConfig = {
  id: "cs-15",
  title: "15. Risk Analysis & Control Selection",
  goal: "Analyze risk with assets, threats, vulnerabilities, likelihood, and impact; recommend controls by efficiency, feasibility, and ethics; compare alternative measures; and explain tradeoffs among mitigate, avoid, transfer, and accept — including residual risk.",
  xpReward: 750,
  badge: "Risk Analyst",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/14",
  nextHref: "/learn/cyber/16",
  lessonModule: {
    durationLabel: "~25–30 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-15.png",
        imageAlt: "Risk matrix sticky notes Likelihood vs Impact on a whiteboard in a classroom",
        body: `You can't eliminate every cyber risk — and you don't need to treat every risk the same. **Risk analysis** helps you decide what matters most, then **recommend controls** by efficiency, feasibility, and ethics — and **compare** alternatives with clear tradeoffs.\n\nHere's our roadmap:\n\n• **Asset / threat / vulnerability / risk** — the core vocab.\n• **Likelihood vs impact** — why "scary" isn't the same as "priority."\n• **Control types** — preventive, detective, corrective, and administrative.\n• **Control selection** — recommend by efficiency, feasibility, and ethics; compare measures.\n• **Risk responses** — accept, mitigate, transfer, avoid — with tradeoffs explained.\n• **Residual risk** — what's left after controls, and why it's never zero.\n• A **worked mini-assessment** for a school club.\n• **Building a simple risk register** you can actually maintain.\n• How this prepares you for the capstone.\n\nThis is analytical decision-making — the heart of real cybersecurity work.`,
        callout: {
          label: "Why it matters",
          text: "Teams with limited time waste energy on low-impact fears while ignoring high-impact basics like MFA and backups. Recommending controls with tradeoffs fixes that.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Risk vocabulary in plain English",
        body: `• **Asset** — something valuable to protect (data, devices, accounts, reputation, people).\n• **Threat** — anything that could harm an asset (phishing, ransomware, device theft, insider mistakes).\n• **Vulnerability** — a weakness that makes harm more likely or worse (no MFA, missing patches, public posts).\n• **Risk** — the chance that a threat exploits a vulnerability and causes impact to an asset.\n• **Likelihood** — how probable the bad event seems.\n• **Impact** — how bad it would be if it happened.\n• **Control** — a safeguard that reduces risk.\n• **Residual risk** — the risk that remains after controls have been applied.\n\nSimple formula to remember: **Risk ≈ Threat + Vulnerability affecting an Asset**, judged by likelihood and impact.`,
        callout: {
          label: "Pro tip",
          text: "If you can name the asset and the impact clearly, prioritizing gets much easier.",
        },
      },
      {
        id: "atrv",
        kicker: "The big idea",
        title: "Assets, threats, vulnerabilities, risk",
        image: "/images/lessons/cs-15-2.png",
        imageAlt: "Cards labeled Asset Threat Vulnerability Risk arranged in a teaching layout",
        body: `Walk an example:\n\n• **Asset:** club treasurer Google account (holds budget sheets).\n• **Threat:** phishing that steals the password.\n• **Vulnerability:** no MFA; password reused from another site.\n• **Risk:** attacker empties the payment info sheet, scams sponsors, damages trust.\n\nChange any piece and the risk changes. Add MFA (shrink vulnerability) and residual risk drops even though phishing still exists as a threat.\n\nDefenders don't only ask "is this scary?" They ask "scary *to what*, through *what weakness*?"`,
        bullets: [
          "Name the **asset** first.",
          "Name realistic **threats**.",
          "Find the **vulnerabilities** you can actually fix.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"We deleted the threat\" is rarely true. You usually reduce vulnerability or impact instead.",
        },
      },
      {
        id: "atrv-example",
        kicker: "See it in action",
        title: "Same threat, two very different risk levels",
        body: `Compare two clubs, both facing the exact same **threat**: phishing emails targeting their shared Google account.\n\n**Club A:** No MFA, password reused from a gaming site, and the password is written on a sticky note visible in a photo posted to social media last year. Multiple **vulnerabilities** stack up — reuse, no second factor, and an accidentally exposed credential.\n\n**Club B:** MFA enabled, a unique password from a manager, and no credentials ever shared in writing anywhere public. Same phishing threat exists, but far fewer vulnerabilities exist for it to exploit.\n\nBoth clubs face an identical **threat**. But Club A's **risk** is dramatically higher because of how many vulnerabilities are available for that threat to exploit. This is the key insight: threats are often largely outside your control (phishing will keep happening to everyone), but **vulnerabilities are usually within your control** — and reducing them is where real risk reduction happens.`,
        checkIn: {
          prompt: "Two clubs face the identical phishing threat, but Club A has no MFA and a reused, once-publicly-exposed password while Club B has MFA and a unique password. Why does Club A face higher risk?",
          choices: [
            "It doesn't — risk is identical since the threat is the same",
            "Club A has more exploitable vulnerabilities, so the same threat is more likely to succeed and cause harm",
            "Threats matter more than vulnerabilities in every case",
            "Club B's risk is actually higher because they use MFA",
          ],
          correctIndex: 1,
          explanation:
            "Risk depends on both threat and vulnerability. With an identical threat, more vulnerabilities (reuse, no MFA, exposed credentials) mean significantly higher risk.",
        },
      },
      {
        id: "likelihood-impact",
        kicker: "Prioritize",
        title: "Likelihood vs impact: rank what matters",
        body: `Plot risks roughly on two axes, then **recommend** where effort goes:\n\n• **High likelihood / high impact** — fix first (e.g., no MFA on email that resets everything else).\n• **Low likelihood / high impact** — still plan (backups for ransomware-class events).\n• **High likelihood / low impact** — maybe simple habits are enough.\n• **Low / low** — accept or monitor lightly.\n\nYou don't need fancy math. A 3×3 mental grid (low/medium/high) already beats random panic. **Compare** two high-impact risks by likelihood *and* by how efficiently you can reduce them: phishing without MFA often beats "nation-state targets our club" for near-term investment.\n\nExample: a meteor destroying the school server is high impact, tiny likelihood. Phishing without MFA is medium-high likelihood and high impact for a club — prioritize that, and be ready to **explain the tradeoff** if someone wants flashy tools instead.`,
        callout: {
          label: "Watch out",
          text: "Movie-plot threats steal attention. Everyday credential theft and missing backups usually deserve the first budget of effort — justify that ranking with likelihood × impact × feasibility.",
        },
      },
      {
        id: "likelihood-impact-example",
        kicker: "See it in action",
        title: "Ranking a club's actual risk list",
        body: `A robotics club brainstorms every bad thing they can imagine, then plots each on the likelihood/impact grid instead of just reacting to whichever one sounds scariest:\n\n• **"A hacker group specifically targets our club"** — low likelihood (clubs rarely attract dedicated skilled attackers), but the impact if it happened would be high. Worth some baseline preparation, not obsessive focus.\n• **"Someone falls for a phishing email on the shared account"** — medium-to-high likelihood (phishing is common and constant), high impact (email resets everything else). This ranks as the clear top priority.\n• **"A laptop is left somewhere and lost"** — medium likelihood, medium impact if backups exist (files aren't lost, just the device) but higher impact if they don't.\n• **"A member's phone battery dies during a meeting"** — high likelihood, but trivially low impact.\n\nNotice how the dramatic-sounding scenario (a "hacker group targeting us") isn't actually the top priority once likelihood is honestly considered — while boring, everyday phishing risk clearly deserves the first real investment of effort.`,
        checkIn: {
          prompt: "A club ranks \"a dedicated hacker group targets us specifically\" as low likelihood but high impact, while \"someone falls for phishing on the shared account\" is medium-high likelihood and high impact. Which should get priority attention first?",
          choices: [
            "The dedicated hacker group scenario, since it sounds more serious",
            "The phishing risk, since it combines meaningfully high likelihood with high impact",
            "Neither deserves attention since both are described as having some impact",
            "Whichever scenario is easiest to imagine in detail",
          ],
          correctIndex: 1,
          explanation:
            "Prioritization should weigh both likelihood and impact together. A dramatic but low-likelihood scenario usually ranks below a mundane, high-likelihood, high-impact one like phishing.",
        },
      },
      {
        id: "control-types",
        kicker: "Safeguards",
        title: "Preventive, detective, and corrective controls",
        body: `Controls come in flavors:\n\n• **Preventive** — stop the bad thing: MFA, patching, least privilege, phishing training, privacy minimization.\n• **Detective** — notice it: login alerts, logs/monitoring, antivirus detections, odd spending notices.\n• **Corrective** — fix and recover: isolate a device, reset credentials, restore backups, remove malicious posts, IR playbooks.\n• **Administrative** — govern people and process: **policies**, **procedures**, **approval processes**, and **assigned owners** who decide what is allowed, who may grant access, and how exceptions are documented.\n\nStrong programs layer all three technical types **plus** administrative controls. A firewall rule without an owner who reviews it drifts into "open forever." Prevention reduces hits; detection catches misses; corrective limits damage; administrative controls keep humans aligned.`,
        bullets: [
          "Preventive ≈ lock on the door.",
          "Detective ≈ alarm.",
          "Corrective ≈ repair + cleaner process afterward.",
          "Administrative ≈ written policy, approvals, and named owners.",
        ],
        callout: {
          label: "Defender view",
          text: "If you only prevent and never detect/recover, the first successful phishing email becomes a catastrophe.",
        },
      },
      {
        id: "control-types-example",
        kicker: "See it in action",
        title: "All four control types, working together on one asset",
        body: `Consider a club treasurer's Google account, and how each control type contributes to protecting it:\n\n• **Preventive:** MFA enabled, unique password, phishing-awareness training for the treasurer — reduces the chance an attack succeeds in the first place.\n• **Detective:** a login-alert email is configured to fire on any sign-in from an unfamiliar device or location — catches a break-in attempt quickly if prevention fails.\n• **Corrective:** a written mini-playbook exists ("if you get a suspicious login alert: change password immediately, check Drive sharing, notify the advisor") — limits damage and speeds recovery if detection catches something.\n• **Administrative:** a simple club policy states the treasurer role always requires MFA, and the advisor must approve any new person granted that role — keeps the whole system aligned over time, even as officers change year to year.\n\nNotice that if any one layer were missing — say, no detective alert — a successful break-in might go unnoticed far longer, letting more damage accumulate before anyone reacts. Layering all four types is what makes a security setup resilient rather than fragile.`,
        checkIn: {
          prompt: "A club sets up MFA (preventive), login alerts (detective), a response playbook (corrective), and a policy requiring advisor approval for the treasurer role (administrative). What does layering all four accomplish?",
          choices: [
            "It's redundant — only one control type is ever necessary",
            "Each layer covers a different stage (stopping, noticing, recovering, and governing), so a gap in one is less likely to become a full incident",
            "Administrative controls are unnecessary if technical controls exist",
            "Preventive controls alone are always sufficient",
          ],
          correctIndex: 1,
          explanation:
            "Layering preventive, detective, corrective, and administrative controls means a failure in one layer (like prevention) is more likely to be caught or contained by another layer.",
        },
      },
      {
        id: "responses",
        kicker: "Decide",
        title: "Accept, mitigate, transfer, avoid",
        body: `After you assess a risk, choose a response — and **explain the tradeoff**:\n\n• **Mitigate** — reduce it with controls (most common: turn on MFA, patch, train). Tradeoff: time/usability cost vs lower likelihood or impact.\n• **Avoid** — stop the risky activity (don't store SSNs in a shared club sheet at all). Tradeoff: may lose a convenience or feature.\n• **Transfer** — shift some impact (insurance for a business; using a reputable vendor's secure platform instead of a DIY server). Tradeoff: cost/dependency on the vendor; residual responsibility remains.\n• **Accept** — consciously live with low leftover risk because further controls aren't worth it — and document that choice. Tradeoff: you keep residual exposure on purpose.\n\n**Compare before choosing:** avoiding sponsor emails entirely "avoids" phishing risk but kills the mission; mitigating with MFA usually wins on ethics and feasibility. Accepting is not ignoring. Ignoring is skipping the assessment.`,
        callout: {
          label: "Myth check",
          text: "\"Accept the risk\" is not an excuse to leave admin accounts without MFA. Acceptance fits residual low risks after reasonable controls — not negligence.",
        },
      },
      {
        id: "responses-example",
        kicker: "See it in action",
        title: "Four risks, four different responses",
        body: `A student media club works through four identified risks and picks a distinct response for each, showing the responses aren't interchangeable:\n\n• **Risk: sponsor list stored with full home addresses.** They realize they don't actually need home addresses for anything — just names and emails. Response: **avoid** — they delete the unnecessary field entirely, removing the risk instead of managing it.\n• **Risk: shared email account, no MFA.** Response: **mitigate** — they turn on MFA and set a unique password, directly reducing the vulnerability.\n• **Risk: club laptop used for financial transactions.** Response: **transfer** — instead of building their own payment system, they switch to a reputable, well-secured third-party platform that assumes much of that operational risk.\n• **Risk: a member occasionally posts slightly-too-detailed event photos.** After discussion, the risk is judged genuinely low impact for this club's context. Response: **accept** — they document that they considered it and chose not to add a formal review process, revisiting the decision if anything changes.\n\nFour different risks, four different appropriate responses — no single response is "the right one" universally.`,
        checkIn: {
          prompt: "A club decides they don't actually need to store sponsors' home addresses at all, and deletes that field entirely rather than trying to secure it. What risk response does this represent?",
          choices: [
            "Mitigate",
            "Avoid — removing the risky activity/data entirely instead of managing it",
            "Transfer",
            "Accept",
          ],
          correctIndex: 1,
          explanation:
            "Avoidance means eliminating the risky activity or data altogether, rather than reducing (mitigate), shifting (transfer), or consciously tolerating (accept) the risk.",
        },
      },
      {
        id: "residual-risk",
        kicker: "It's never zero",
        title: "Residual risk: what's left after controls",
        body: `No combination of controls reduces risk to exactly zero. **Residual risk** is what remains after you've applied preventive, detective, corrective, and administrative controls — and it's a normal, expected part of any real security posture, not a failure.\n\nWhy residual risk always exists:\n• Controls reduce likelihood or impact — they rarely eliminate a threat completely (phishing attempts will keep arriving no matter how good your training is).\n• New vulnerabilities emerge over time (software updates, new features, staff turnover) faster than any team can perfectly track.\n• Some controls trade off against usability, so organizations deliberately stop short of maximum restriction.\n\nThe goal isn't zero risk — it's **residual risk that's been consciously evaluated and judged acceptable**, rather than residual risk nobody ever looked at. This is why documenting your reasoning (why you accepted what's left) matters as much as the controls themselves.`,
        bullets: [
          "Residual risk is the risk remaining after controls — it's never zero.",
          "The goal is a *conscious*, documented level of residual risk, not an accidental one.",
          "New vulnerabilities and threats mean residual risk should be revisited periodically.",
        ],
        callout: {
          label: "Why it matters",
          text: "\"We have MFA, so we're fully protected\" ignores residual risk. MFA reduces risk significantly — it doesn't erase every possible attack path.",
        },
      },
      {
        id: "residual-risk-example",
        kicker: "See it in action",
        title: "Recognizing residual risk instead of assuming zero",
        body: `A club implements strong controls on their shared email: MFA, a unique password from a manager, login alerts, and a documented incident playbook. It's genuinely a strong setup.\n\nDoes this mean the account is now risk-free? No — **residual risk** remains:\n\n• A sophisticated phishing attempt could still theoretically trick someone into approving an MFA prompt (recall prompt bombing from an earlier lesson).\n• A member's personal device, if compromised by malware, could expose session tokens even with MFA in place.\n• The password manager itself, while well-protected, is a single point that — if somehow compromised — would expose the unique password anyway.\n\nA mature response isn't to panic about these remaining possibilities, nor to falsely claim "we're totally secure now." It's to **acknowledge the residual risk explicitly**, decide it's acceptable given the effort already invested, and note it for a future review — especially if the club's situation changes (handling significantly more money, for example, might justify additional controls later).`,
        checkIn: {
          prompt: "After implementing MFA, unique passwords, login alerts, and an incident playbook, a club treasurer's account still carries some residual risk. What is the mature response to this fact?",
          choices: [
            "Panic and add controls until risk theoretically reaches exactly zero",
            "Acknowledge and document the remaining residual risk as consciously accepted, revisiting it if circumstances change",
            "Conclude the controls were pointless since risk isn't zero",
            "Claim the account is now completely risk-free",
          ],
          correctIndex: 1,
          explanation:
            "Residual risk is expected even after strong controls. The mature response is to consciously acknowledge, document, and periodically revisit it — not to expect zero risk or dismiss the controls as pointless.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Mini risk assessment: school robotics club",
        image: "/images/lessons/cs-15-3.png",
        imageAlt: "Club laptop scenario with controls listed: MFA backups training monitoring",
        body: `**Assets:** team email, sponsor list, robot design files, shared laptop.\n\n**Top risks (ranked):**\n1. Email takeover via phishing (high likelihood/impact) → **Mitigate** with MFA + unique password + training; **detective** login alerts; **corrective** session revoke playbook.\n2. Laptop loss without encryption (medium/high) → **Mitigate** with disk encryption + inventory; **avoid** storing sole copies of designs only on that laptop.\n3. Public oversharing of competition travel (medium/medium) → **Mitigate** with posting guidelines.\n\nNotice how risk language drives a short, sensible plan instead of a random tool-shopping spree.`,
        callout: {
          label: "Try this week",
          text: "Pick one personal asset (school email). Name one threat, one vulnerability, and one control for each type: preventive, detective, corrective.",
        },
      },
      {
        id: "risk-register",
        kicker: "Make it maintainable",
        title: "Building a simple risk register",
        body: `A **risk register** is just a running list that turns risk assessment from a one-time exercise into an ongoing habit. It doesn't need to be fancy — a simple table works:\n\n| Asset | Threat | Vulnerability | Likelihood | Impact | Response | Owner | Review date |\n\nFor each row, fill in: what's being protected, what could harm it, what weakness makes that realistic, a rough likelihood/impact rating, the chosen response (mitigate/avoid/transfer/accept), who's responsible for it, and when it should be revisited.\n\nWhy this matters more than a one-time assessment:\n• Risks and vulnerabilities **change** — new tools, new members, new threats in the news.\n• A written register means knowledge doesn't live only in one person's head (who might graduate or leave).\n• Review dates turn "we should really check on that sometime" into an actual scheduled task.\n\nEven a five-row spreadsheet for a school club is dramatically better than no register at all — it's the difference between reacting to whatever incident happens to make headlines and deliberately tracking what actually matters to your specific situation.`,
        bullets: [
          "A risk register is a simple, living table — not a one-time report.",
          "Include owner and review date for every entry, not just the risk itself.",
          "Even a small register beats no tracking system at all.",
        ],
        callout: {
          label: "Defender view",
          text: "The value of a risk register isn't the initial writing — it's forcing a periodic re-look, since risks that were low last year can become high this year.",
        },
      },
      {
        id: "risk-register-example",
        kicker: "See it in action",
        title: "A club's first risk register, five rows",
        body: `A debate club builds their very first risk register after this lesson. It's short, but real:\n\n1. **Asset:** Shared email | **Threat:** Phishing | **Vulnerability:** No MFA | **Likelihood/Impact:** High/High | **Response:** Mitigate (MFA + unique password) | **Owner:** Club president | **Review:** Next semester.\n2. **Asset:** Tournament travel roster (names, allergies, emergency contacts) | **Threat:** Accidental public sharing | **Vulnerability:** Doc link set to "anyone with the link" | **Likelihood/Impact:** Medium/High | **Response:** Mitigate (restrict sharing to specific members) | **Owner:** Team captain | **Review:** Before next tournament.\n3. **Asset:** Club laptop | **Threat:** Loss/theft | **Vulnerability:** No backup of debate case files | **Likelihood/Impact:** Medium/Medium | **Response:** Mitigate (cloud backup) | **Owner:** Treasurer | **Review:** Next semester.\n\nSix months later, when a new officer takes over, they don't have to rebuild this understanding from scratch or guess what matters — they inherit a document that already explains what's being watched, why, and when to check on it again. That continuity is the entire point of maintaining a register instead of just doing a one-time assessment.`,
        checkIn: {
          prompt: "A club writes a risk register with an owner and review date for each entry, rather than just a one-time list of risks. What is the main benefit of including owner and review date?",
          choices: [
            "It makes the document longer, which looks more thorough",
            "It turns risk management into an ongoing, assigned, scheduled habit instead of a one-time exercise that gets forgotten",
            "Owners and review dates are required by law for all documents",
            "It has no real benefit over a simple one-time list",
          ],
          correctIndex: 1,
          explanation:
            "Assigning an owner and review date converts a static one-time list into a living process that gets revisited and maintained as circumstances change.",
        },
      },
      {
        id: "myths",
        kicker: "Reality check",
        title: "Risk assessment myths worth retiring",
        body: `A few beliefs sound reasonable but lead to poor decisions:\n\n• **"The scariest-sounding threat deserves the most resources."** Likelihood matters as much as impact — a rare, dramatic scenario can rank below a mundane, frequent one.\n• **"More controls are always better."** Controls have real costs (time, money, usability). The goal is appropriately matched controls, not maximum controls everywhere.\n• **"Accepting a risk means doing nothing."** Acceptance is a documented, deliberate choice made after assessment — very different from never having looked at the risk at all.\n• **"Once we secure something, the risk is gone forever."** Threats, vulnerabilities, and assets all change over time — yesterday's acceptable risk can become today's priority.`,
        bullets: [
          "Likelihood matters as much as impact when prioritizing.",
          "Controls carry real costs — match effort to actual risk.",
          "Risk assessment is ongoing, not a one-time event.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"We did a risk assessment once, so we're covered.\" Risk changes as people, tools, and threats change — revisit your assessment, don't just file it away.",
        },
      },
      {
        id: "checklist",
        kicker: "Put it together",
        title: "A defender's risk assessment checklist",
        body: `Bring the whole lesson together into habits you can actually use:\n\n**1. Name the asset, threat, and vulnerability** explicitly before deciding anything.\n**2. Rank by likelihood and impact together** — resist chasing the scariest-sounding scenario alone.\n**3. Layer control types** — preventive, detective, corrective, and administrative — rather than relying on just one.\n**4. Recommend controls** by efficiency, feasibility, and ethics — compare alternatives and explain tradeoffs.\n**5. Choose a deliberate response** for each risk: mitigate, avoid, transfer, or accept.\n**6. Expect residual risk** and document it consciously rather than assuming zero.\n**7. Maintain a risk register** with owners and review dates so the work doesn't go stale.\n\nThat's a working risk-analysis mindset — analytical, prioritized, and revisited over time.`,
        callout: {
          label: "Try this week",
          text: "Pick one account or system you care about, recommend two alternative controls, and justify which wins on efficiency, feasibility, and ethics.",
        },
      },
      {
        id: "control-selection",
        kicker: "Decision checklist",
        title: "Recommend controls by efficiency, feasibility, and ethics",
        body: `Risk analysis ends in recommendations. Use this filter when you cannot do everything:

**1. Match control type to gap:**
• Missing prevention → MFA, patching, least privilege.
• Missing detection → login alerts, sharing audits, log review.
• Missing correction → backups, IR playbook, recovery contacts.
• Missing governance → written owners, review dates.

**2. Efficiency** — how much risk reduction per unit of time/money? A 20-minute MFA setup that blunts high-impact account takeover beats a week researching niche gadgets.

**3. Feasibility** — can this club actually run it with free tools and rotating student officers? A "perfect" enterprise SIEM nobody will monitor fails the feasibility test.

**4. Ethics** — does the control respect privacy and consent (e.g., monitoring personal phones vs club accounts)? Does it create unfair burden or surveillance creep? Prefer proportionate measures.

**5. Name an owner** — "someone should" is not a control.

**Compare measures (same risk — Gmail takeover):**
• **Weak / low efficiency:** verbal "be careful" — cheap, low impact reduction.
• **Medium:** quarterly sharing audit + calendar invite — feasible, moderate reduction.
• **Strong / high efficiency:** MFA + unique passwords + login alerts + named owner — still feasible for a club; ethical (protects shared org accounts without spying on members' private devices).
• **Avoid extreme:** delete Gmail entirely — eliminates risk but may kill the club's work (usability/mission tradeoff).

**Explain the tradeoff:** stronger controls often cost time or convenience; weaker ones leave residual risk. Recommend the option that clears the efficiency × feasibility × ethics bar, then document residual risk.`,
        checkIn: {
          prompt: "A club's top risk is Gmail takeover via phishing. Which recommendation best applies efficiency, feasibility, and ethics?",
          choices: [
            "Hope officers stay careful — cheapest, so always best",
            "MFA, unique passwords, and login alerts with a named owner — high risk reduction, realistic for a club, and focused on the shared account rather than invasive personal surveillance",
            "Delete the Gmail account and stop emailing sponsors",
            "Install covert keyloggers on every member's phone",
          ],
          correctIndex: 1,
          explanation:
            "Recommend controls that reduce high-impact risk efficiently, that officers can actually run, and that stay ethically proportionate — not hope, mission-killing avoidance, or invasive spyware.",
        },
      },
      {
        id: "register-maintenance",
        kicker: "Defender habits",
        title: "Keeping a risk register alive",
        body: `Registers die when treated as one-time homework. Keep them useful:

• **Review quarterly** — 15 minutes on the club calendar.
• **Update on change** — new tool, new officer, new sponsor data, new incident.
• **Close or downgrade** — when controls work, note evidence (e.g., "MFA enabled 3/12").
• **Escalate new risks** — don't wait for annual review if something obvious appears.

**Scenario:** Treasurer role adds payment app. Register row added same week: asset = payment account; threat = credential theft; control = MFA + advisor approval for payouts; owner = treasurer; review next month.

Living registers beat polished posters nobody updates.`,
        callout: {
          label: "Pro tip",
          text: "Link the review meeting invite to the register doc so future officers inherit the habit, not just the file.",
        },
      },
      {
        id: "residual-scenario",
        kicker: "Scenario walkthrough",
        title: "Naming residual risk honestly",
        body: `**Scenario:** Robotics club mitigates public Drive link risk by switching to named sharing and monthly audits. Residual risk remains: an officer account could still be phished.

**Honest residual statement:** "We reduced accidental public exposure; we still face targeted phishing against officers. Residual impact: sponsor list leak. Planned next control: phishing-resistant MFA on Gmail by next quarter."

**Why honesty matters:** sponsors and advisors trust teams that admit remaining gaps and show dated plans — not teams claiming "we're 100% secure now."

**What to do next:** document residual risk in the register, assign owner for next control, set review date.

Risk management is transparency plus follow-through, not a one-time score.`,
      },
      {
        id: "risk-myths-extra",
        kicker: "Myth check",
        title: "Risk assessment myths in student organizations",
        body: `• **"Risk registers are corporate paperwork."** Five rows in a shared doc is enough for a club.
• **"Low likelihood means ignore."** Low likelihood × high impact (sponsor data leak) still ranks.
• **"Transfer means insurance only."** Transfer can mean using a school's official payment system instead of personal Venmo.
• **"Accept means do nothing."** Accept is a documented choice with approval — not neglect.

Decision quality beats document length. One honest page wins.`,
        bullets: [
          "Rank by likelihood AND impact.",
          "Every row needs an owner and date.",
          "Residual risk is normal — name it.",
        ],
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Risk** ties **assets**, **threats**, and **vulnerabilities** to likelihood and impact.\n• Prioritize with likelihood×impact — then **recommend** controls by **efficiency, feasibility, and ethics**.\n• **Compare** measures and **explain tradeoffs** (usability, cost, residual risk).\n• Layer **preventive / detective / corrective** plus **administrative** controls.\n• Choose **mitigate, avoid, transfer, or accept** on purpose.\n• **Residual risk** always remains — document a conscious level, not a fantasy of zero.\n• A **risk register** turns analysis into an ongoing habit — you'll need this in the capstone.\n\nAce the **Knowledge check**, then reflect with a justified mini risk register.`,
      },
    ],
  },
  bigIdeas: [
    "**Risk** is the chance a **threat** exploits a **vulnerability** to harm an **asset** — judged by likelihood and impact.",
    "**Recommend** controls by **efficiency, feasibility, and ethics**; **compare** alternatives and explain tradeoffs — preventive, detective, corrective, and administrative layers still matter, and **residual risk** always remains.",
    "After analyzing, choose **mitigate**, **avoid**, **transfer**, or consciously **accept**, justify why, and track it in a simple **risk register**.",
  ],
  keyTerms: [
    { term: "Asset", definition: "Something of value you need to protect — data, devices, accounts, reputation, or people." },
    { term: "Threat", definition: "A potential cause of harm to an asset." },
    { term: "Vulnerability", definition: "A weakness that increases the chance or impact of harm." },
    { term: "Risk", definition: "The potential that a threat will exploit a vulnerability and cause impact." },
    { term: "Likelihood / Impact", definition: "How probable a bad event is versus how damaging it would be." },
    { term: "Preventive control", definition: "A safeguard meant to stop an incident before it succeeds." },
    { term: "Detective control", definition: "A safeguard meant to notice suspicious or harmful activity." },
    { term: "Corrective control", definition: "A safeguard meant to contain, repair, and recover after an incident." },
    { term: "Administrative control", definition: "A policy, procedure, approval process, or assigned owner that governs how security decisions are made." },
    { term: "Residual risk", definition: "The risk that remains after controls have been applied; never fully zero." },
    { term: "Risk register", definition: "A living document tracking assets, risks, responses, owners, and review dates over time." },
  ],
  realWorld:
    "A club weighs buying fancy network gadgets vs turning on **MFA** for shared email. A quick risk view shows email takeover is high likelihood/impact — **mitigate** with MFA first, then reconsider extras.",
  quiz: [
    {
      id: "q1",
      question: "In risk terms, what is an asset?",
      choices: [
        "Something valuable you protect, like accounts, data, or devices",
        "Only malware",
        "Any software update",
        "A type of phishing email",
      ],
      correctIndex: 0,
      explanation:
        "Assets are what you care about protecting — data, systems, people, reputation, and more.",
    },
    {
      id: "q2",
      question: "A club email has no MFA. Phishing is common. Which statement is most accurate?",
      choices: [
        "There is a threat but no vulnerability at all",
        "Missing MFA is a vulnerability that raises risk of account takeover",
        "Risk only exists for large corporations",
        "Likelihood and impact are irrelevant to this situation",
      ],
      correctIndex: 1,
      explanation:
        "Phishing is a threat; no MFA is a vulnerability; together they create meaningful risk to the email asset.",
    },
    {
      id: "q3",
      question: "Which control is primarily detective?",
      choices: [
        "MFA on login",
        "Restoring files from backup after ransomware",
        "A \"new sign-in\" alert email",
        "Deleting a risky activity entirely",
      ],
      correctIndex: 2,
      explanation:
        "Alerts notice suspicious activity (detective). MFA is preventive; restores are corrective; stopping an activity can be avoidance.",
    },
    {
      id: "q4",
      question: "Choosing not to store Social Security numbers in a club spreadsheet is best described as:",
      choices: [
        "Transferring risk to malware",
        "Accepting a high risk with no thought",
        "A detective control only",
        "Avoiding the risk by not keeping that sensitive data there — a tradeoff that may reduce convenience but removes high-impact exposure",
      ],
      correctIndex: 3,
      explanation:
        "Avoidance means not doing the risky thing — here, not holding highly sensitive data you don't need. Explain the usability tradeoff when you recommend it.",
    },
    {
      id: "q5",
      question: "A club compares (A) MFA + login alerts on shared Gmail vs (B) buying unused enterprise monitoring software nobody will staff. Which recommendation is strongest?",
      choices: [
        "Choose B because more expensive tools are always better",
        "Recommend A: higher efficiency and feasibility for a student club, ethically focused on the shared account, with residual risk documented — compare before spending",
        "Accept Gmail takeover risk with no MFA because setup takes 20 minutes",
        "Never — all risks must be reduced to exactly zero before any activity continues",
      ],
      correctIndex: 1,
      explanation:
        "Control selection weighs efficiency, feasibility, and ethics. MFA + alerts beat shelfware; acceptance without MFA is not appropriate for this high-impact risk.",
    },
    {
      id: "q6",
      question: "Two clubs face the same phishing threat, but one has MFA and unique passwords while the other doesn't. Why does their risk level differ?",
      choices: [
        "It doesn't differ — identical threats always mean identical risk",
        "The club with fewer vulnerabilities (MFA, unique passwords) faces lower risk from the same threat",
        "Threats matter more than vulnerabilities in every scenario",
        "Risk is only about impact, never about likelihood",
      ],
      correctIndex: 1,
      explanation:
        "Risk depends on both threat and vulnerability. Reducing vulnerabilities lowers risk even when an identical threat remains present.",
    },
    {
      id: "q7",
      question: "What is \"residual risk\"?",
      choices: [
        "Risk that existed only before any controls were considered",
        "A type of malware that specifically targets leftover files",
        "The risk that remains after controls have been applied — it is never fully zero",
        "Risk that only applies to large organizations",
      ],
      correctIndex: 2,
      explanation:
        "Residual risk is what's left after preventive, detective, corrective, and administrative controls are applied — a normal, expected part of any real security posture.",
    },
    {
      id: "q8",
      question: "Why is a risk register more useful than a one-time risk assessment?",
      choices: [
        "It isn't more useful — a one-time list is always sufficient",
        "A risk register replaces the need for any controls",
        "Risk registers are only useful for large companies with dedicated staff",
        "It assigns owners and review dates, turning risk management into an ongoing, maintained habit as circumstances change",
      ],
      correctIndex: 3,
      explanation:
        "A risk register with owners and review dates keeps risk management current, rather than letting a one-time assessment go stale as risks and circumstances change.",
    },
    {
      id: "q9",
      question: "When recommending a control, which tradeoff analysis best matches this lesson?",
      choices: [
        "Pick the flashiest tool and skip documenting residual risk",
        "Compare options on risk reduction vs time/cost (efficiency), whether the team can sustain it (feasibility), and whether it is proportionate/respectful (ethics) — then explain what residual risk remains",
        "Ethics never matter if a control reduces risk even slightly",
        "Feasibility only matters for large corporations",
      ],
      correctIndex: 1,
      explanation:
        "CSTA control selection: recommend and compare measures using efficiency, feasibility, and ethics, and explain residual-risk tradeoffs.",
    },
  ],
  reflection: {
    prompt:
      "Create a tiny risk register for one asset. Include threat, vulnerability, likelihood/impact, TWO alternative controls you compared, which you recommend and WHY (efficiency, feasibility, ethics), your response (mitigate/avoid/transfer/accept), residual risk you'll accept, owner, and review date.",
    placeholder: "Example: Asset = school email; Threat = phishing; Vuln = no MFA; High/High. Compared: (A) MFA+alerts vs (B) delete email. Recommend A — efficient, feasible, ethical for a shared school account. Response = mitigate; Residual = MFA fatigue/prompt bombing still possible; Owner = me; Review = next semester…",
  },
};
