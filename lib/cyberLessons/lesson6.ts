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
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-6.png",
        imageAlt: "School portal with role badges Student Teacher Admin and a least-privilege lock icon",
        body: `Logging in is only half the story. Once you're in, **access control** decides which doors open.\n\nHere's our roadmap:\n\n• **Authentication vs. authorization** — a quick rematch with sharper examples.\n• **RBAC** — Role-Based Access Control in plain English.\n• **Least privilege** — give the minimum access needed to do the job.\n• **Admin vs. user accounts** — why everyday work shouldn't use \"keys to the castle.\"\n• **Shared accounts** — why \"one login for the whole club\" creates lasting problems.\n\nThese ideas show up in school portals, cloud docs, workplace tools, and games with moderator roles.`,
        callout: {
          label: "Why it matters",
          text: "Many breaches aren't genius break-ins — they're ordinary accounts that had far more power than they needed.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "Access control vocabulary",
        body: `• **Access control** — rules and technical checks that decide who can view or change resources.\n• **Authentication** — proving identity.\n• **Authorization** — granting permissions to an identity.\n• **Permission / privilege** — a specific allowed action (read, edit, delete, admin).\n• **Role** — a named job hat with a bundle of permissions (Student, Teacher, Club Officer).\n• **Least privilege** — only the access required to complete assigned tasks — nothing extra \"just in case.\"\n• **Admin (administrator) account** — a powerful account that can change system settings, install software, or manage other users.\n\nAccess control is how organizations turn \"trust\" into enforceable rules.`,
        callout: {
          label: "Pro tip",
          text: "When something fails with \"Access denied,\" that's often authorization working correctly — not the computer being mean.",
        },
      },
      {
        id: "auth-again",
        kicker: "Rematch",
        title: "Authentication opens the building; authorization opens rooms",
        body: `Picture a school:\n\n• **Authentication** is the ID badge scan at the front door — proving you're a real student or staff member.\n• **Authorization** is which rooms your badge opens — classrooms you're enrolled in, not the nurse's medication cabinet or the grade vault.\n\nDigital examples:\n• You authenticate to Google/Microsoft with MFA.\n• You're authorized to edit *your* essay doc, comment on a shared project, but not delete the teacher's master rubric.\n\nBoth layers matter. Perfect authorization with weak authentication fails when someone steals a login. Perfect authentication with \"everyone is admin\" fails when one mistake — or one malicious insider — can change everything.`,
        callout: {
          label: "Why it matters",
          text: "When troubleshooting \"I can't open this file,\" ask: Is the person logged in as themselves (authn), and do they have the right role/permission (authz)?",
        },
      },
      {
        id: "rbac",
        kicker: "Roles as toolbelts",
        title: "RBAC — Role-Based Access Control",
        image: "/images/lessons/cs-6-2.png",
        imageAlt: "Access control board mapping roles to permissions with colored badges",
        body: `**RBAC (Role-Based Access Control)** assigns permissions to **roles**, then assigns people to roles — instead of hand-crafting every permission for every person from scratch.\n\nExample roles in a school LMS:\n• **Student** — submit work, view own grades.\n• **Teacher** — create assignments, grade class sections.\n• **Counselor** — view certain student records needed for support.\n• **IT Admin** — manage accounts and system settings.\n\nWhen a new student joins, they get the Student role and inherit that toolbelt. When a teacher leaves, removing the Teacher role (or disabling the account) is cleaner than hunting through dozens of one-off permissions.\n\nRBAC isn't the only access model in industry, but it's the one you'll hear most in intro cyber and CompTIA-style fundamentals — and it matches how clubs, jobs, and games already think about \"mod\" vs \"member.\"`,
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
      },
      {
        id: "least-privilege",
        kicker: "The golden rule",
        title: "Least privilege — minimum access to do the job",
        image: "/images/lessons/cs-6-3.png",
        imageAlt: "Two accounts on a laptop: everyday user vs admin, with a sticky note Use admin only when needed",
        body: `**Least privilege** means each user, account, and program should get only the permissions required for legitimate work — not every permission available.\n\nWhy defenders love it:\n• **Mistakes do less damage.** Accidental deletes are limited.\n• **Malware / stolen sessions do less damage.** If your everyday account can't install system-wide software, some attacks stall.\n• **Insiders have less blast radius.** Curiosity clicks don't open every file in the organization.\n\nSchool/life applications:\n• Use a standard user account for browsing and homework; reserve admin for installs when needed.\n• Share cloud docs as **view** or **comment** unless someone truly needs **edit**.\n• Club social media: not every member needs the owner login.\n\nLeast privilege feels slightly inconvenient in the moment — and saves careers later.`,
        callout: {
          label: "Common misconception",
          text: "\"Make me admin so I never have to ask again\" sounds efficient. It usually means every future mistake runs with maximum power.",
        },
      },
      {
        id: "admin-shared",
        kicker: "Everyday choices",
        title: "Admin vs user accounts — and the shared-account trap",
        body: `**Admin vs. standard user:**\n• A **standard user** account can do daily work with limits.\n• An **admin** account can change system settings, install software, and manage other accounts.\nDefender habit: do homework and browsing as a standard user. Elevate only when installing trusted software — then return to normal.\n\n**Shared accounts risks:**\n• **No accountability** — if something bad happens, logs show \"clubaccount,\" not which person.\n• **Password sprawl** — everyone knows the secret; nobody knows who else wrote it down.\n• **Offboarding fails** — when one member leaves, you must change the password for everyone or leave a former member inside.\n• **MFA becomes awkward** — codes go to one phone, or people disable MFA \"for convenience.\"\n• **Permission leftovers** — shared owner accounts often have far more privilege than any one task needs.\n\nBetter pattern: individual logins + roles/permissions + shared *spaces* (channels, drives) instead of shared *identities*.`,
        bullets: [
          "Daily work → standard user when possible.",
          "Admin power → only when required, then drop back.",
          "Shared logins → weak accountability and messy offboarding.",
          "Prefer personal accounts with proper roles.",
        ],
        callout: {
          label: "Try this week",
          text: "Audit one shared doc or club tool you use. Who has edit vs view? Remove \"anyone with the link can edit\" if it isn't necessary.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Access control** enforces who can do what after login.\n• **Authentication** proves identity; **authorization** grants permissions.\n• **RBAC** bundles permissions into roles.\n• **Least privilege** limits damage from mistakes and misuse.\n• Avoid everyday **admin** use and risky **shared accounts**.\n\nNext lessons zoom out to networks and firewalls — how traffic is allowed or denied across systems.\n\nComplete the **Knowledge check**, then reflect on a place you can apply least privilege this week.`,
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
  ],
  reflection: {
    prompt:
      "Describe one system you use (school portal, cloud drive, game, club tool). What role are you in, what extra privilege would be unnecessary, and how could shared-account habits create risk there?",
    placeholder: "Example: I'm a student role in the LMS — I don't need gradebook edit. Our club once shared an owner login, which was risky when seniors graduated…",
  },
};
