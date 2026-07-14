import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson6: AILessonConfig = {
  id: "cs-6",
  title: "6. Access Control & Least Privilege",
  goal: "Distinguish authentication from authorization in practice, explain RBAC and least privilege, contrast admin vs user accounts, and describe risks of shared accounts.",
  xpReward: 300,
  badge: "Gatekeeper",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/5",
  nextHref: "/learn/cyber/7",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-6.png",
        imageAlt: "School portal with role badges Student Teacher Admin and a least-privilege lock icon",
        body: `Logging in is only half the story. Once you're in, **access control** decides which doors open.\n\nHere's our roadmap:\n\n• **Authentication vs. authorization** — a quick rematch with sharper examples.\n• **RBAC** — Role-Based Access Control in plain English.\n• **Least privilege** — give the minimum access needed to do the job.\n• **Access lifecycle** — temporary grants, offboarding, and periodic review.\n• **Admin vs. user accounts** — why everyday work shouldn't use "keys to the castle."\n• **A worked example, a myth, and a mini case** — so this becomes a habit, not a definition.\n• **Shared accounts** — why "one login for the whole club" creates lasting problems.\n\nThese ideas show up in school portals, cloud docs, workplace tools, and games with moderator roles.`,
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
        body: `**RBAC (Role-Based Access Control)** assigns permissions to **roles**, then assigns people to roles — instead of hand-crafting every permission for every person from scratch.\n\nExample roles in a school LMS:\n• **Student** — submit work, view own grades.\n• **Teacher** — create assignments, grade class sections.\n• **Counselor** — view certain student records needed for support.\n• **IT Admin** — manage accounts and system settings.\n\nWhen a new student joins, they get the Student role and inherit that toolbelt. When a teacher leaves, removing the Teacher role (or disabling the account) is cleaner than hunting through dozens of one-off permissions.\n\nRBAC isn't the only access model in industry, but it's the one you'll hear most in intro cyber and CompTIA-style fundamentals — and it matches how clubs, jobs, and games already think about "mod" vs "member."`,
        bullets: [
          "Permissions attach to **roles**.",
          "People are assigned **roles**.",
          "Changing someone's job → change their role.",
          "Easier to audit: \"What can Teachers do?\"",
        ],
        callout: {
          label: "Watch out",
          text: "Role creep happens when people collect old roles over time (\"just leave me as admin too\"). Periodic cleanups are part of real security hygiene.",
        },
        checkIn: {
          prompt: "If the robotics club had used RBAC with individual accounts instead of one shared login, what would have been different?",
          choices: [
            "Nothing — RBAC doesn't affect accountability",
            "Each person would have their own identity and role, so the mystery post could be traced to a specific account",
            "RBAC would have prevented all social media posts",
            "RBAC only applies to school gradebooks, not clubs",
          ],
          correctIndex: 1,
          explanation:
            "RBAC with individual logins preserves accountability — actions are tied to a specific person's role and identity, not one anonymous shared account.",
        },
      },
      {
        id: "concept-3",
        kicker: "The golden rule",
        title: "Least privilege — minimum access to do the job",
        image: "/images/lessons/cs-6-3.png",
        imageAlt: "Two accounts on a laptop: everyday user vs admin, with a sticky note Use admin only when needed",
        body: `**Least privilege** means each user, account, and program should get only the permissions required for legitimate work — not every permission available.\n\nWhy defenders love it:\n• **Mistakes do less damage.** Accidental deletes are limited.\n• **Malware / stolen sessions do less damage.** If your everyday account can't install system-wide software, some attacks stall.\n• **Insiders have less blast radius.** Curiosity clicks don't open every file in the organization.\n\nSchool/life applications:\n• Use a standard user account for browsing and homework; reserve admin for installs when needed.\n• Share cloud docs as **view** or **comment** unless someone truly needs **edit**.\n• Club social media: not every member needs the owner login.\n\nLeast privilege feels slightly inconvenient in the moment — and saves careers later.`,
        callout: {
          label: "Common misconception",
          text: "\"Make me admin so I never have to ask again\" sounds efficient. It usually means every future mistake runs with maximum power.",
        },
        checkIn: {
          prompt: "Applying least privilege to the robotics club's social media account would most likely mean:",
          choices: [
            "Giving every member the owner-level password for convenience",
            "Giving most members a limited \"contributor\" role for posting, while only one or two officers hold full owner access",
            "Removing the account's password entirely",
            "Letting former members keep access indefinitely",
          ],
          correctIndex: 1,
          explanation:
            "Least privilege means most members get only the access needed to post, while higher-impact controls stay limited to a small, accountable group.",
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
        body: `A clear side-by-side of the three account patterns from this lesson:\n\n• **Admin account** — powerful, can change system settings and manage others; best used briefly and only when needed, then set aside for daily work.\n• **Standard user account** — limited, everyday-appropriate access; the right default for most tasks, since mistakes and malware do less damage here.\n• **Shared account** — one login used by multiple people; convenient to set up, but breaks accountability (who did what?) and makes offboarding messy (whose access do we even remove?).\n\nThe pattern worth remembering: **individual identity + role-appropriate permission** beats both "give everyone admin" and "just share one login." It takes a little more setup, but it's the only option that keeps accountability and easy offboarding intact.`,
        checkIn: {
          prompt: "What is the core accountability problem with shared accounts, as shown in the robotics club story?",
          choices: [
            "Shared accounts are always technically impossible to hack",
            "Actions taken through a shared login can't be traced to a specific individual, and offboarding is unclear",
            "Shared accounts automatically enable stronger MFA",
            "There is no real problem with shared accounts",
          ],
          correctIndex: 1,
          explanation:
            "Shared identities blur who actually took an action and complicate removing access cleanly when someone leaves.",
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
        id: "standards-connect",
        kicker: "Where this fits",
        title: "How this connects to real standards",
        body: `Today's material supports recognized standards in a very direct way:\n\n• **CSTA 3A-NI-07** (Networks and the Internet) asks students to compare security measures, considering tradeoffs between usability and security — exactly the admin/standard-user/shared-account comparison you just worked through.\n• **CSTA 3A-NI-06** (Networks and the Internet) asks students to recommend security measures based on feasibility and ethical impact — the RBAC and least-privilege redesign of the robotics club account is that recommendation in practice.\n• **ISTE Computational Thinker (1.5c)** asks students to break problems into component parts and develop descriptive models — RBAC itself is a model that breaks "who can do what" into roles and permissions, a genuinely computational way of thinking about organizations.\n\nAccess control might feel like an "IT department" topic, but the underlying skill — modeling a system as roles and permissions instead of one big pile of trust — is a transferable computational thinking skill.`,
        callout: {
          label: "Why it matters",
          text: "This is one of the clearest places where cybersecurity and computer science thinking overlap directly — modeling systems, not just following rules.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and reflect",
        title: "Quick gut-check before you continue",
        body: `Before the mini case and knowledge check: think of one piece of access you personally still hold from an old role, team, or club you're no longer active in. Does anyone know you still have it? Would removing it actually cause any problem — or has it just never come up?`,
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
        body: `Quick recap:\n\n• **Access control** enforces who can do what after login.\n• **Authentication** proves identity; **authorization** grants permissions.\n• **RBAC** bundles permissions into roles.\n• **Least privilege** limits damage from mistakes and misuse.\n• Grant **temporary access** with expiry; **revoke on offboarding**; avoid blanket admin.\n• **Periodic access review:** export → confirm owners → trim roles → MFA on privileged → document exceptions.\n• Avoid everyday **admin** use and risky **shared accounts** — role creep sneaks in when removal feels awkward instead of routine.\n\nNext lessons zoom out to networks and firewalls — how traffic is allowed or denied across systems.\n\nComplete the **Knowledge check**, then reflect on a place you can apply least privilege this week.`,
      },
    ],
  },
  bigIdeas: [
    "**Authorization** decides permissions after **authentication** proves identity — together they implement **access control**.",
    "**RBAC** assigns permissions through roles; **least privilege** keeps those permissions minimal.",
    "**Admin** power and **shared accounts** increase blast radius — prefer standard users and individual identities.",
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
      question: "A student can log in but cannot delete the class gradebook. What is working?",
      choices: [
        "Only authentication failed",
        "Authentication succeeded; authorization correctly denied the action",
        "RBAC means everyone can delete everything",
        "Least privilege always grants admin rights",
      ],
      correctIndex: 1,
      explanation:
        "They proved who they were (authenticated) but their role doesn't include delete-on-gradebook (authorization).",
    },
    {
      id: "q2",
      question: "What is the main idea of least privilege?",
      choices: [
        "Give every user admin rights to save time",
        "Give only the access required for the person's job/tasks",
        "Share one password so permissions stay simple",
        "Disable authentication entirely",
      ],
      correctIndex: 1,
      explanation:
        "Least privilege minimizes access to what is necessary — reducing damage from mistakes and misuse.",
    },
    {
      id: "q3",
      question: "In RBAC, permissions are primarily assigned to:",
      choices: [
        "Random strangers on the internet",
        "Roles, which are then assigned to people",
        "Only hardware tokens",
        "Printers exclusively",
      ],
      correctIndex: 1,
      explanation:
        "RBAC attaches permissions to roles (like Teacher or Student), then people receive those roles.",
    },
    {
      id: "q4",
      question: "Why is doing everyday browsing as a full admin account risky?",
      choices: [
        "Admin accounts cannot access the internet",
        "Mistakes or malware running in that session inherit powerful permissions",
        "Admin accounts block all MFA",
        "It improves least privilege automatically",
      ],
      correctIndex: 1,
      explanation:
        "High privilege amplifies impact. Everyday tasks should use standard user rights when possible.",
    },
    {
      id: "q5",
      question: "Which is a major risk of a shared club social-media login?",
      choices: [
        "Perfect accountability for every action",
        "Easy, secure offboarding when members leave without password changes",
        "Hard to tell who did what; former members may retain access until passwords change",
        "Shared accounts enforce MFA better than individual accounts always",
      ],
      correctIndex: 2,
      explanation:
        "Shared identities blur accountability and complicate removing access when people leave.",
    },
    {
      id: "q6",
      question: "What is \"role creep\"?",
      choices: [
        "A method for assigning roles quickly and safely",
        "The gradual buildup of unnecessary access as people collect old permissions over time without removal",
        "A type of malware",
        "A required step in RBAC design",
      ],
      correctIndex: 1,
      explanation:
        "Role creep is the slow accumulation of unused or outdated access, usually because removal never felt urgent — periodic review fixes it.",
    },
    {
      id: "q7",
      question: "A club's former editor-in-chief still has full admin access a year after graduating. What process failure does this represent?",
      choices: [
        "A properly working least-privilege system",
        "A missing offboarding step / lack of periodic access review",
        "Evidence that RBAC doesn't work",
        "A required security feature",
      ],
      correctIndex: 1,
      explanation:
        "This is a classic offboarding gap — access should be revoked when a role ends, and periodic review catches what offboarding might miss.",
    },
    {
      id: "q8",
      question: "Why does CSTA's Networks and the Internet standard ask students to compare security measures like access models, rather than just define them?",
      choices: [
        "Because comparison has no practical value",
        "Because real decisions (like choosing RBAC with least privilege over shared admin accounts) require weighing usability and security tradeoffs, not just recalling terms",
        "Because all access control models are equally secure in every situation",
        "Because only IT professionals need to compare these models",
      ],
      correctIndex: 1,
      explanation:
        "Meaningful security literacy involves weighing tradeoffs for a real situation — exactly what redesigning the robotics club or yearbook account required.",
    },
  ],
  reflection: {
    prompt:
      "Describe one system you use (school portal, cloud drive, game, club tool). What role are you in, what extra privilege would be unnecessary, and how could shared-account habits create risk there?",
    placeholder: "Example: I'm a student role in the LMS — I don't need gradebook edit. Our club once shared an owner login, which was risky when seniors graduated…",
  },
};
