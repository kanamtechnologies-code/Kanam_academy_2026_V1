import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson15: AILessonConfig = {
  id: "cs-15",
  title: "15. Risk Assessment & Controls",
  goal: "Use a simple risk model — assets, threats, vulnerabilities, likelihood vs impact — and choose controls (preventive, detective, corrective) plus risk responses: accept, mitigate, transfer, or avoid.",
  xpReward: 750,
  badge: "Risk Analyst",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/14",
  nextHref: "/learn/cyber/16",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-15.png",
        imageAlt: "Risk matrix sticky notes Likelihood vs Impact on a whiteboard in a classroom",
        body: `You can't eliminate every cyber risk — and you don't need to treat every risk the same. **Risk assessment** helps you decide what matters most and which **controls** are worth the effort.\n\nHere's our roadmap:\n\n• **Asset / threat / vulnerability / risk** — the core vocab.\n• **Likelihood vs impact** — why "scary" isn't the same as "priority."\n• **Control types** — preventive, detective, corrective, and administrative.\n• **Risk responses** — accept, mitigate, transfer, avoid.\n• **Residual risk** — what's left over after controls are applied, and why it's never zero.\n• A **worked mini-assessment** for a school club.\n• **Building a simple risk register** you can actually maintain.\n• How this prepares you for the capstone.\n\nThis is decision-making skill — the heart of real cybersecurity work.`,
        callout: {
          label: "Why it matters",
          text: "Teams with limited time waste energy on low-impact fears while ignoring high-impact basics like MFA and backups. Risk thinking fixes that.",
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
        body: `Plot risks roughly on two axes:\n\n• **High likelihood / high impact** — fix first (e.g., no MFA on email that resets everything else).\n• **Low likelihood / high impact** — still plan (backups for ransomware-class events).\n• **High likelihood / low impact** — maybe simple habits are enough.\n• **Low / low** — accept or monitor lightly.\n\nYou don't need fancy math. A 3×3 mental grid (low/medium/high) already beats random panic.\n\nExample: a meteor destroying the school server is high impact, tiny likelihood. Phishing without MFA is medium-high likelihood and high impact for a club — prioritize that.`,
        callout: {
          label: "Watch out",
          text: "Movie-plot threats steal attention. Everyday credential theft and missing backups usually deserve the first budget of effort.",
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
        body: `After you assess a risk, choose a response:\n\n• **Mitigate** — reduce it with controls (most common: turn on MFA, patch, train).\n• **Avoid** — stop the risky activity (don't store SSNs in a shared club sheet at all).\n• **Transfer** — shift some impact (insurance for a business; using a reputable vendor's secure platform instead of a DIY server).\n• **Accept** — consciously live with low leftover risk because further controls aren't worth it — and document that choice.\n\nAccepting is not ignoring. Ignoring is skipping the assessment. Acceptance means you looked, ranked, and chose.`,
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
        body: `Bring the whole lesson together into habits you can actually use:\n\n**1. Name the asset, threat, and vulnerability** explicitly before deciding anything.\n**2. Rank by likelihood and impact together** — resist chasing the scariest-sounding scenario alone.\n**3. Layer control types** — preventive, detective, corrective, and administrative — rather than relying on just one.\n**4. Choose a deliberate response** for each risk: mitigate, avoid, transfer, or accept.\n**5. Expect residual risk** and document it consciously rather than assuming zero.\n**6. Maintain a risk register** with owners and review dates so the work doesn't go stale.\n\nThat's a working risk assessment mindset — practical, prioritized, and revisited over time.`,
        callout: {
          label: "Try this week",
          text: "Pick one account or system you care about and walk it through this checklist end to end, even informally.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Risk** ties **assets**, **threats**, and **vulnerabilities** to likelihood and impact.\n• Prioritize with a simple likelihood×impact view — don't chase movie-plot threats over everyday ones.\n• Layer **preventive / detective / corrective** controls plus **administrative** (policies, procedures, approvals, owners).\n• Choose **mitigate, avoid, transfer, or accept** on purpose.\n• **Residual risk** always remains — the goal is a conscious, documented level, not zero.\n• A **risk register** turns assessment into an ongoing, maintainable habit.\n\nAce the **Knowledge check**, then reflect with a tiny risk register of your own — you'll need this thinking in the capstone.`,
      },
    ],
  },
  bigIdeas: [
    "**Risk** is the chance a **threat** exploits a **vulnerability** to harm an **asset** — judged by likelihood and impact.",
    "Controls are **preventive** (stop), **detective** (notice), **corrective** (fix/recover), and **administrative** (policies, procedures, approvals, owners) — and some **residual risk** always remains.",
    "After assessing, choose a response: **mitigate**, **avoid**, **transfer**, or consciously **accept** residual risk, and track it in a simple **risk register**.",
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
        "Avoiding the risk by not keeping that sensitive data there",
      ],
      correctIndex: 3,
      explanation:
        "Avoidance means not doing the risky thing — here, not holding highly sensitive data you don't need.",
    },
    {
      id: "q5",
      question: "When is \"accept the risk\" appropriate?",
      choices: [
        "When remaining risk is low after reasonable controls and you consciously decide further effort isn't worth it",
        "Whenever fixing something feels mildly inconvenient, even for admin email without MFA",
        "Only when you haven't assessed anything",
        "Never — all risks must be reduced to exactly zero",
      ],
      correctIndex: 0,
      explanation:
        "Acceptance is a deliberate choice about residual low risk — not an excuse to skip basic high-impact controls.",
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
  ],
  reflection: {
    prompt:
      "Create a tiny risk register with one asset you care about. List one threat, one vulnerability, likelihood/impact (low/med/high), one control, your response (mitigate/avoid/transfer/accept), an owner, and a review date.",
    placeholder: "Example: Asset = school email; Threat = phishing; Vulnerability = reused password; Likelihood high / Impact high; Control = password manager + MFA; Response = mitigate; Owner = me; Review = next semester…",
  },
};
