import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson6: AILessonConfig = {
  id: "cs-6",
  title: "6. Access Control & Least Privilege",
  goal: "Recommend least-privilege designs with usability tradeoffs; compare RBAC approaches and admin vs standard accounts; and evaluate shared-account risks for accountability and offboarding.",
  xpReward: 300,
  badge: "Gatekeeper",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/5",
  nextHref: "/learn/cyber/7",
  lessonModule: {
    durationLabel: "~25–30 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-6.png",
        imageAlt: "School portal with role badges Student Teacher Admin and a least-privilege lock icon",
        body: `Logging in is only half the story. Once you're in, **access control** decides which doors open. Today you'll **compare** designs and **recommend** least privilege with real usability tradeoffs.\n\nHere's our roadmap:\n\n• **Authentication vs. authorization** — prove identity, then grant permissions.\n• **RBAC** — compare role-based designs vs ad-hoc / shared logins.\n• **Least privilege** — recommend minimum access; weigh convenience against blast radius.\n• **Access lifecycle** — temporary grants, offboarding, and periodic review.\n• **Admin vs. standard accounts** — when elevation is justified and when it isn't.\n• **A worked example, a myth, and a mini case** — redesigning access like a defender.\n• **Shared accounts** — why "one login for the whole club" fails accountability.\n\nThese decisions show up in school portals, cloud docs, workplace tools, and games with moderator roles.`,
        callout: {
          label: "Why it matters",
          text: "Many breaches aren't genius break-ins — they're ordinary accounts that had far more power than they needed.",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "The robotics club account nobody remembers making",
        body: `The robotics club has one shared login for its team social media account — set up two years ago by a senior who has since graduated. Nobody currently on the team remembers the original password being changed since then, and at least six former members, two former mentors, and one parent volunteer have all had it at some point "just to help post."\n\nOne day, an embarrassing off-brand post appears on the account, clearly not from anyone currently active in the club. No one can figure out who posted it, because the account shows only one generic login name — not which actual person was behind the keyboard.\n\nThe club adviser's response is telling: "We have no idea who still has this password. We have no idea who posted this. We just have to change it and hope." That sentence — "we have no idea who" — is the core problem this lesson is built to prevent.`,
        callout: {
          label: "Notice",
          text: "The technology here wasn't hacked. The account had appropriate authentication (a password). The failure was in *access control*: too many people, no way to tell who did what, and no process for removing access when people left.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Access control vocabulary",
        body: `• **Access control** — rules and technical checks that decide who can view or change resources.\n• **Authentication** — proving identity.\n• **Authorization** — granting permissions to an identity.\n• **Permission / privilege** — a specific allowed action (read, edit, delete, admin).\n• **Role** — a named job hat with a bundle of permissions (Student, Teacher, Club Officer).\n• **Least privilege** — only the access required to complete assigned tasks — nothing extra "just in case."\n• **Admin (administrator) account** — a powerful account that can change system settings, install software, or manage other users.\n\nAccess control is how organizations turn "trust" into enforceable rules.`,
        callout: {
          label: "Pro tip",
          text: "When something fails with \"Access denied,\" that's often authorization working correctly — not the computer being mean.",
        },
      },
      {
        id: "concept-1",
        kicker: "Rematch",
        title: "Authentication opens the building; authorization opens rooms",
        body: `Picture a school:\n\n• **Authentication** is the ID badge scan at the front door — proving you're a real student or staff member.\n• **Authorization** is which rooms your badge opens — classrooms you're enrolled in, not the nurse's medication cabinet or the grade vault.\n\nDigital examples:\n• You authenticate to Google/Microsoft with MFA.\n• You're authorized to edit *your* essay doc, comment on a shared project, but not delete the teacher's master rubric.\n\nBoth layers matter. Perfect authorization with weak authentication fails when someone steals a login. Perfect authentication with "everyone is admin" fails when one mistake — or one malicious insider — can change everything.`,
        callout: {
          label: "Why it matters",
          text: "When troubleshooting \"I can't open this file,\" ask: Is the person logged in as themselves (authn), and do they have the right role/permission (authz)?",
        },
        checkIn: {
          prompt: "In the school-badge analogy, which part represents authorization?",
          choices: [
            "The badge scan proving you're a real student or staff member",
            "Which specific rooms your badge is allowed to open",
            "The color of the badge",
            "How old the badge is",
          ],
          correctIndex: 1,
          explanation:
            "Authentication is proving identity (the scan). Authorization is deciding what that identity may access (which rooms open).",
        },
      },
      {
        id: "concept-2",
        kicker: "Roles as toolbelts",
        title: "RBAC — Role-Based Access Control",
        image: "/images/lessons/cs-6-2.png",
        imageAlt: "Access control board mapping roles to permissions with colored badges",
        body: `**Compare access approaches** before recommending one:\n\n| Approach | How it works | Strength | Tradeoff |\n|---|---|---|---|\n| **Ad-hoc permissions** | Hand-craft every person's access | Flexible in tiny teams | Hard to audit; errors multiply |\n| **Shared login** | One password for the group | Fast to set up | No accountability; messy offboarding |\n| **RBAC** | Permissions → **roles** → people | Scales; clear "what can Teachers do?" | Needs role design + periodic review |\n\n**RBAC example (school LMS):** Student (submit, view own grades), Teacher (create/grade), Counselor (limited records), IT Admin (accounts/settings). New student → Student role. Teacher leaves → remove role or disable account — cleaner than hunting one-off grants.\n\n**Recommendation:** prefer RBAC + individual identities for anything that outlives a single event. Accept a bit more setup; you gain auditability and clean offboarding — exactly what the robotics club lacked.`,
        bullets: [
          "Permissions attach to **roles**; people get roles.",
          "Changing someone's job → change their role.",
          "Easier to audit: \"What can Teachers do?\"",
          "Compare RBAC vs shared logins before choosing convenience.",
        ],
        callout: {
          label: "Watch out",
          text: "Role creep happens when people collect old roles over time (\"just leave me as admin too\"). Periodic cleanups are part of real security hygiene.",
        },
        checkIn: {
          prompt: "A club wants \"one shared owner password\" vs \"individual logins with Poster / Officer roles.\" Which recommendation is better justified, and why?",
          choices: [
            "Shared password — RBAC never applies outside big companies",
            "Individual accounts + RBAC — actions are attributable and you can remove one person without resetting everyone",
            "Give everyone admin so nobody waits for permissions",
            "Disable all accounts and post only from personal phones",
          ],
          correctIndex: 1,
          explanation:
            "RBAC with individual identities preserves accountability and supports least-privilege offboarding — shared owner passwords fail both.",
        },
      },
      {
        id: "concept-3",
        kicker: "The golden rule",
        title: "Least privilege — minimum access to do the job",
        image: "/images/lessons/cs-6-3.png",
        imageAlt: "Two accounts on a laptop: everyday user vs admin, with a sticky note Use admin only when needed",
        body: `**Least privilege** means each user, account, and program gets only the permissions required for legitimate work — not every permission "just in case."\n\n**Why recommend it (evaluate impact):**\n• **Mistakes do less damage** — accidental deletes stay limited.\n• **Stolen sessions / malware do less damage** — everyday accounts that can't install system-wide software stall many attacks.\n• **Insider blast radius shrinks** — curiosity doesn't open every file.\n\n**Usability tradeoff (be honest):** least privilege means occasional "please grant edit for this week" requests. That friction is the cost of not running every bad day at maximum power.\n\n**Admin vs standard account — compare:**\n• **Standard user** — default for browsing, homework, docs. Recommend for daily work.\n• **Admin** — installs, system settings, managing others. Recommend **just-in-time elevation**, then return to standard.\n\nSchool/life: share docs as **view/comment** unless edit is required; club social — contributor roles for most, owner for few. Least privilege feels slightly inconvenient — and is the design you should recommend when asked.`,
        callout: {
          label: "Common misconception",
          text: "\"Make me admin so I never have to ask again\" sounds efficient. It usually means every future mistake runs with maximum power.",
        },
        checkIn: {
          prompt: "An officer asks for permanent admin \"so we stop filing permission tickets.\" What recommendation best balances usability and risk?",
          choices: [
            "Grant permanent admin — tickets are never worth the security cost",
            "Keep standard accounts for daily work; grant temporary elevated access for defined tasks with a review/expiry date",
            "Remove the account's password entirely to reduce friction",
            "Let former members keep access indefinitely so they can help later",
          ],
          correctIndex: 1,
          explanation:
            "Just-in-time elevation preserves least privilege while still solving real work needs — permanent admin maximizes blast radius for convenience.",
        },
      },
      {
        id: "worked-example",
        kicker: "Step by step",
        title: "Redesigning the club account like a defender",
        body: `Let's use the robotics club story as a design exercise.\n\n**Step 1 — List the roles actually needed.** Something like: Content Poster (writes and schedules posts), Officer (can also review/approve posts and manage members), Adviser (oversight, final account recovery contact).\n\n**Step 2 — Assign permissions to roles, not people.** Content Posters get posting access only. Officers get posting plus member management. The Adviser holds recovery information (like the account's actual email and backup codes) but doesn't need to post daily.\n\n**Step 3 — Move from one shared login to individual identities.** Most modern platforms support multiple linked individual logins under one account, or at least individual "team member" roles — removing the need for one shared password altogether.\n\n**Step 4 — Build in the lifecycle.** When a member graduates or leaves, their individual access is removed immediately — not "eventually," and not by changing one shared password everyone has to be told about again.\n\nNotice the shift: instead of one all-or-nothing secret, the club now has traceable roles that match real responsibilities — and a clear process for when people leave.`,
        checkIn: {
          prompt: "In the redesigned system, why is it better for the Adviser to hold recovery information rather than post daily content themselves?",
          choices: [
            "Advisers are not allowed to use social media",
            "It matches least privilege — the Adviser's actual job is oversight and recovery, not daily posting, so their access should reflect that",
            "It has nothing to do with least privilege",
            "Advisers should have zero access of any kind",
          ],
          correctIndex: 1,
          explanation:
            "Least privilege means access should match the real responsibilities of the role — oversight and recovery, not routine daily tasks.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "\"Make me admin so I don't have to keep asking\"",
        body: `This request sounds efficient — fewer interruptions, fewer tickets, fewer delays. The hidden cost is that every future action taken under that account — intentional or accidental, by that person or by malware that compromises their session — now runs with maximum power instead of the minimum needed.\n\nA more accurate way to think about it: broad admin access doesn't just make *your* good days more convenient — it makes *every* bad day (a mistake, a phishing click, a stolen session) dramatically worse than it needed to be.\n\nThe better ask isn't "give me admin forever" — it's "give me exactly the specific permission I need for this task, and set a review date if it should be temporary." That's a small extra step now that prevents a much bigger cleanup problem later.`,
        callout: {
          label: "Reframe it",
          text: "Instead of \"more access is more efficient,\" try: \"the right access for the task is what's efficient — extra access is just extra risk waiting to be triggered.\"",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Try it yourself: audit one system you use",
        body: `Pick a system where you or your team share access — a school LMS, a club tool, a shared cloud drive, or a group game server with moderator roles.\n\n1. **What roles currently exist**, and does each role's access actually match what that role needs to do?\n2. **Is anyone holding more access than their current responsibilities require** — maybe a former officer, a graduated senior, or "just in case" admin rights nobody uses?\n3. **Is there a shared login anywhere** that could instead be individual accounts with roles?\n\nIf you find a gap, you don't have to fix it single-handedly today — but naming it clearly (to a club adviser, teacher, or team lead) is exactly the kind of defender behavior this lesson is building.`,
        callout: {
          label: "Keep it real",
          text: "If your answer to question 2 is \"yes, actually,\" you've just found a real least-privilege gap — which is a genuinely useful thing to notice.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Just in time",
        title: "Going deeper: temporary access, offboarding, and periodic review",
        image: "/images/lessons/cs-6-4.png",
        imageAlt: "Calendar with an access review date circled next to a checklist: export, confirm owners, trim, MFA, document",
        body: `Least privilege isn't a one-time checkbox — it's a lifecycle:\n\n• **Temporary access** should include an **expiry or review date**. A volunteer who needed edit access for one event shouldn't still have it six months later.\n• **Revoke on offboarding** — when someone leaves a club, job, or class, remove their access promptly. "Just in case" leftovers are how former members still reach systems.\n• **Avoid blanket Domain Admin** (or equivalent "god mode") for everyday work. Broad admin rights turn one stolen password into a campus-wide incident.\n• **Don't share guest Wi-Fi credentials with staff file servers** — guest networks and sensitive systems should stay separate. One password for everything collapses segmentation.\n\n**Periodic access review** (quarterly is common) keeps role creep under control:\n\n1. **Export** who has access to sensitive apps and folders.\n2. **Confirm owners** — each access should have a responsible person who can say it's still needed.\n3. **Trim roles** — remove unused and overly broad permissions.\n4. **MFA on privileged** — require MFA on remaining admin and high-power accounts.\n5. **Document exceptions** — note who still needs extra access and set the next review date.\n\nThis workflow turns "we'll clean it up someday" into a repeatable defender habit — exactly the process that would have caught the robotics club's account long before the embarrassing post.`,
        bullets: [
          "Grant **just enough, just in time** — with expiry and removal when done.",
          "Revoke promptly on offboarding; avoid shared god-mode accounts.",
          "Quarterly review: **export → owners → trim → MFA → document**.",
        ],
        callout: {
          label: "Defender view",
          text: "If one account is stolen, how much can an attacker reach? Least privilege and timely revocation shrink that blast radius.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Comparing admin, standard user, and shared accounts",
        body: `**Recommend a design** by comparing account patterns:\n\n| Pattern | When it fits | Risk if overused |\n|---|---|---|\n| **Admin account** | Brief elevation for installs/settings | Everyday use → every mistake/malware runs at max power |\n| **Standard user** | Default daily work | Slightly more "ask for permission" friction |\n| **Shared account** | Almost never for ongoing work | No who-did-what; offboarding requires password roulette |\n| **Individual + RBAC** | Clubs, LMS, cloud drives | Small setup cost; needs periodic role review |\n\n**Recommendation:** individual identity + role-appropriate permission. Accept setup friction; reject "everyone admin" and "one sticky-note login" unless the resource is truly ephemeral and low-impact — and even then, plan expiry.`,
        checkIn: {
          prompt: "Which design would you recommend for a yearbook platform used across school years, and why?",
          choices: [
            "One shared admin password passed down each spring — simplest handoff",
            "Individual accounts with Editor/Designer/Adviser roles, plus offboarding at graduation — accountability and least privilege across years",
            "Everyone gets admin so deadlines never wait on permissions",
            "No accounts at all — email files instead forever",
          ],
          correctIndex: 1,
          explanation:
            "Multi-year tools need attributable identities and role-based least privilege; shared admin passwords fail offboarding every graduating class.",
        },
      },
      {
        id: "defender-trap-or-myth",
        kicker: "Don't fall for this",
        title: "The trap: role creep — \"just leave my old access, it's easier\"",
        body: `Role creep happens gradually: someone becomes an officer, gets extra access; the next year they step down but keep the access "just in case they need to help"; the year after, nobody remembers why they still have it, and removing it feels awkward rather than routine.\n\nThe trap is that each individual step feels reasonable and low-effort — it's easier to leave access alone than to have the slightly uncomfortable conversation about removing it. But those small "easier to leave it" decisions compound over years into exactly the kind of situation the robotics club found itself in: nobody knows who has access to what anymore.\n\nThe fix is treating access removal as a normal, expected, non-personal part of any role change — the same way returning a locker key is normal when you switch classes. A scheduled periodic review (as covered in the deeper-skill section) makes this automatic instead of awkward.`,
        callout: {
          label: "Watch out",
          text: "If removing someone's old access feels like an unusual, uncomfortable event rather than routine housekeeping, that's a sign your organization doesn't have a regular review process yet.",
        },
      },
      {
        id: "habits",
        kicker: "Bring it together",
        title: "Access control habits that stick",
        body: `Bring the whole lesson into a practical checklist:\n\n• **Standard user by default** — do everyday work on non-admin accounts; elevate only when needed, then step back down.\n• **Roles, not favors** — assign permissions based on defined roles, not personal trust or convenience.\n• **Individual identities over shared logins** — even for informal club or team tools.\n• **Expiry dates on temporary access** — don't let "just for this event" quietly become permanent.\n• **Prompt offboarding** — remove access the moment someone's role ends, not "eventually."\n• **Periodic review** — a recurring calendar reminder beats hoping someone notices the buildup.\n\nApplied consistently, these habits mean the next "robotics club" story in your life ends with a quick, traceable fix — not a shrug and a password reset with no idea who did what.`,
        callout: {
          label: "Try this week",
          text: "Audit one shared doc or club tool you use. Who has edit vs view? Remove \"anyone with the link can edit\" if it isn't necessary.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and reflect",
        title: "Quick gut-check before you continue",
        body: `Before the mini case and knowledge check: justify a recommendation. A club adviser says shared owner passwords are "fine for students." What least-privilege / RBAC design would you propose instead, and what usability tradeoff would you accept to get accountability?`,
      },
      {
        id: "mini-case",
        kicker: "Case file",
        title: "Mini case: the graduated senior's admin access",
        image: "/images/lessons/cs-6-5.png",
        imageAlt: "School yearbook club dashboard showing an admin account belonging to a graduated student highlighted in red",
        body: `**The situation:** A school yearbook club uses a shared design platform. Two years ago, the then-editor-in-chief was given full admin rights to set everything up. She graduated last spring. This year's editor discovers, while reviewing account settings for an unrelated reason, that the graduated student's account is still active with full admin permissions — including the ability to delete the entire year's project files.\n\nNobody had removed it, because nobody had been assigned the task of reviewing access when she left. She hasn't logged in since graduating and almost certainly isn't trying to cause any harm — but the access itself is still a real risk: if her personal email were ever compromised, an attacker could potentially reach the yearbook platform too.\n\n**Apply what you've learned:**\n\n• **Offboarding gap:** This is a textbook missed offboarding step — access should have been revoked when her role ended, not discovered by accident a year later.\n• **Least privilege violation:** Full admin rights for a role that's fundamentally about content creation, not systems management, was likely more access than necessary even while she was active.\n• **Fix going forward:** Remove the former student's access immediately, and set up a recurring calendar reminder (a periodic access review) tied to graduation dates, so this doesn't happen again next year.\n\nThis case shows why "nobody remembered to do it" is a process failure, not a one-time mistake — which is exactly why a scheduled review matters more than good intentions alone.`,
      },
      {
        id: "offboarding-checklist",
        kicker: "Decision checklist",
        title: "Offboarding checklist when someone leaves a role",
        body: `When a club officer graduates, a teammate quits, or a contractor finishes, access should shrink the same day — not "eventually."

**Within 24 hours:**
• Remove or downgrade their account in shared tools (Drive, email aliases, social logins).
• Rotate shared passwords they knew (club Wi-Fi, shared drives, treasurer spreadsheets).
• Revoke admin rights on devices or routers they configured.
• Update the access log — who removed what, when.

**Within one week:**
• Review forwarding rules and recovery contacts on shared accounts.
• Confirm no "temporary" access was left behind as permanent.

**Comparison — reactive vs proactive offboarding:**
• Reactive: wait for an incident, then scramble — often after harm is done.
• Proactive: treat departure like returning a physical key — immediate, documented, expected.

Least privilege is not only about what people get on day one. It is about what they keep on day last.`,
        bullets: [
          "Departures are access-control events, not just social goodbyes.",
          "Rotate shared secrets when membership changes.",
          "Document who removed access and when.",
        ],
      },
      {
        id: "role-creep-scenario",
        kicker: "Scenario walkthrough",
        title: "Stopping role creep before it becomes normal",
        body: `**Scenario:** The robotics club treasurer needs Drive edit access to the budget folder. Six months later, they still have admin on the club Gmail "because it's convenient," and two new members inherited old shared passwords from a group chat.

**Defender walkthrough:**
1. **Name the drift** — temporary access became permanent; shared passwords replaced individual accounts.
2. **Map to risk** — one compromised treasurer login now controls email, Drive, and possibly payments.
3. **Reset to least privilege** — treasurer gets edit on budget only; president keeps admin; Gmail admin reserved for advisor + one officer.
4. **Individual identities** — each member gets their own login; retire the shared password.
5. **Calendar review** — quarterly 15-minute access audit on the club calendar.

Role creep feels efficient until something goes wrong. The fix is boring process — which is why it works.`,
        checkIn: {
          prompt: "Why is a shared club password considered weaker than individual accounts with role-based permissions?",
          choices: [
            "Shared passwords are easier to remember",
            "Individual accounts make it clear who did what and allow removing one person without resetting everyone",
            "Shared passwords are required by most cloud tools",
            "Role-based access is only for large companies",
          ],
          correctIndex: 1,
          explanation:
            "Individual identities improve accountability and let you offboard one person without invalidating access for the whole group.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Before you go",
        title: "Check yourself",
        body: `Quick self-check: can you explain RBAC and least privilege in your own words, using an example that isn't from this lesson? Can you list the five-step periodic access review (export → owners → trim → MFA → document)? If yes, you're ready for the knowledge check.`,
        checkIn: {
          prompt: "What is the main lesson from the graduated editor's still-active admin account?",
          choices: [
            "Admin access should never expire once granted",
            "Offboarding and periodic access review are needed to catch access that should have been removed when a role ended",
            "Yearbook platforms are inherently insecure and should be avoided",
            "The former student was likely trying to cause harm",
          ],
          correctIndex: 1,
          explanation:
            "The core failure was a missing offboarding/review process — not malicious intent. A scheduled review would have caught this automatically.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Access control** enforces who can do what after login.\n• **Authentication** proves identity; **authorization** grants permissions.\n• **Compare** RBAC vs ad-hoc vs shared logins — recommend roles + individual identities.\n• **Recommend least privilege** despite ticket friction; elevate admin only just-in-time.\n• Grant **temporary access** with expiry; **revoke on offboarding**; run periodic reviews.\n• Everyday **admin** and **shared accounts** inflate blast radius — role creep is a process failure.\n\nNext: network architecture — how routers, switches, topology, and servers shape reliability and risk.\n\nComplete the **Knowledge check**, then justify one least-privilege recommendation.`,
      },
    ],
  },
  bigIdeas: [
    "**Recommend** access designs that separate **authentication** (who) from **authorization** (what) — that is access control.",
    "**Compare RBAC** to ad-hoc and shared logins; roles scale better for audit and offboarding.",
    "**Least privilege** + standard users over everyday admin; reject shared accounts when accountability matters.",
  ],
  keyTerms: [
    { term: "Access Control", definition: "Rules and checks that determine who can view or change resources." },
    { term: "Authorization", definition: "Granting permissions to an authenticated identity." },
    { term: "RBAC", definition: "Role-Based Access Control — assigning permissions to roles, then roles to people." },
    { term: "Least Privilege", definition: "Providing only the minimum access needed to perform a task." },
    { term: "Permission", definition: "A specific allowed action, such as read, edit, or administer." },
    { term: "Admin Account", definition: "A highly privileged account that can change system settings and manage users." },
    { term: "Standard User Account", definition: "An everyday account with limited privileges for normal work." },
    { term: "Shared Account", definition: "One login used by multiple people — weak accountability and risky offboarding." },
    { term: "Access review", definition: "A periodic process to verify, trim, and document who still needs permissions." },
  ],
  realWorld:
    "A newspaper club should give reporters editor access to articles, not the owner password for the entire website hosting account. That's RBAC + least privilege in a student org.",
  quiz: [
    {
      id: "q1",
      question: "A student can log in but cannot delete the class gradebook. What is working, and why is that a good design?",
      choices: [
        "Authentication succeeded; authorization correctly denied the action — least privilege limiting blast radius",
        "Only authentication failed, which is why the delete was blocked",
        "RBAC means everyone can delete everything by default",
        "Least privilege always grants admin rights automatically",
      ],
      correctIndex: 0,
      explanation:
        "They proved who they were (authenticated) but their role doesn't include delete-on-gradebook (authorization) — intentional least privilege.",
    },
    {
      id: "q2",
      question: "A teammate wants permanent admin \"to avoid asking.\" Which recommendation best applies least privilege with a usability tradeoff?",
      choices: [
        "Give every user admin rights so they never have to ask again",
        "Keep standard accounts daily; grant temporary elevated access for specific tasks with an expiry/review date",
        "Share one password across a team so permissions stay simple",
        "Disable authentication entirely to speed up logins",
      ],
      correctIndex: 1,
      explanation:
        "Just-in-time elevation accepts occasional requests in exchange for much smaller blast radius when something goes wrong.",
    },
    {
      id: "q3",
      question: "Comparing ad-hoc permissions vs RBAC for a school LMS with hundreds of users, why recommend RBAC?",
      choices: [
        "Whichever individual account happens to need them that day is easier to audit at scale",
        "Printers and other hardware exclusively need permissions",
        "Permissions attach to roles (Teacher/Student), then people get roles — cleaner onboarding, audit, and offboarding",
        "Only accounts that already have MFA enabled can use roles",
      ],
      correctIndex: 2,
      explanation:
        "RBAC scales: change the role definition once, and everyone in that role inherits the update — unlike hunting one-off grants.",
    },
    {
      id: "q4",
      question: "Why recommend a standard user account for everyday browsing instead of full admin?",
      choices: [
        "Admin accounts cannot access the internet at all",
        "Admin accounts automatically block every form of MFA",
        "Using admin daily improves least privilege over time",
        "Mistakes or malware in that session inherit powerful permissions — admin amplifies every bad day",
      ],
      correctIndex: 3,
      explanation:
        "High privilege amplifies impact. Everyday tasks should use standard user rights when possible.",
    },
    {
      id: "q5",
      question: "Which is a major risk of a shared club social-media login?",
      choices: [
        "Hard to tell who did what; former members may retain access until the password changes",
        "It guarantees perfect accountability for every action taken",
        "It makes offboarding easy since one password change removes everyone at once",
        "Shared accounts always enforce MFA better than individual accounts",
      ],
      correctIndex: 0,
      explanation:
        "Shared identities blur accountability and complicate removing access when people leave.",
    },
    {
      id: "q6",
      question: "What is \"role creep,\" and why does it undermine a least-privilege recommendation over time?",
      choices: [
        "A required step every organization must follow when first designing RBAC",
        "Unnecessary access accumulates as old roles aren't removed — so real permissions drift far above \"minimum needed\"",
        "A type of malware that spreads through admin accounts",
        "A fast, safe method for assigning brand-new roles",
      ],
      correctIndex: 1,
      explanation:
        "Role creep silently undoes least privilege; periodic review is how you keep the recommendation honest.",
    },
    {
      id: "q7",
      question: "A club's former editor-in-chief still has full admin access a year after graduating. What process failure does this represent?",
      choices: [
        "Proof that RBAC as a model doesn't actually work",
        "A missing offboarding step / lack of periodic access review",
        "A properly functioning least-privilege system",
        "A security feature that is working exactly as intended",
      ],
      correctIndex: 1,
      explanation:
        "This is a classic offboarding gap — access should be revoked when a role ends, and periodic review catches what offboarding might miss.",
    },
    {
      id: "q8",
      question: "You must choose between shared admin, everyone-admin, or RBAC with standard users for a multi-year club drive. Which evaluation is strongest?",
      choices: [
        "All three are equally secure if passwords are long",
        "Only IT professionals may compare these models",
        "Shared admin is best because setup is fastest",
        "RBAC + least privilege beats shared/everyone-admin when you weigh accountability, offboarding, and blast radius against setup friction",
      ],
      correctIndex: 3,
      explanation:
        "Real decisions require tradeoffs — redesigning the robotics club or yearbook account is exactly that evaluation.",
    },
  ],
  reflection: {
    prompt:
      "Recommend an access design for one system you use (portal, drive, club tool, game). Compare shared login vs RBAC vs everyday-admin, justify least privilege, and name one usability tradeoff you'll accept.",
    placeholder: "Example: Club Drive should use individual Editor/Viewer roles, not a shared owner password — I'll accept slower onboarding to keep grads from retaining admin…",
  },
};
