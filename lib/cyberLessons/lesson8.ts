import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson8: AILessonConfig = {
  id: "cs-8",
  title: "8. Firewalls, Ports & Secure Config",
  goal: "Recommend firewall and secure-configuration measures; compare default-deny vs default-allow; and explain security vs usability/availability tradeoffs for ports, exposure, and segmentation.",
  xpReward: 400,
  badge: "Firewall Builder",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/7",
  nextHref: "/learn/cyber/9",
  instructorScript: `**Coach's note**
Today's lesson: **Firewalls, Ports & Secure Config**.

**Goal:** Recommend firewall and secure-configuration measures; compare default-deny vs default-allow; and explain security vs usability/availability tradeoffs for ports, exposure, and segmentation.

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
        image: "/images/lessons/cs-8.png",
        imageAlt: "Firewall icon between a home network and the internet with a default-deny gate illustration",
        body: `Last lesson evaluated network architecture. Today you **recommend** who may pass at the boundary — and weigh **security vs usability/availability**.\n\nHere's our roadmap:\n\n• **Firewalls** — rule-based gatekeepers; when to allow vs deny.\n• **Default-deny vs default-allow** — compare postures and failure directions.\n• **Risky default configurations** — exposed admin, unused services, factory passwords.\n• **Segmentation** — contain blast radius with zone tradeoffs.\n• **A worked example, a myth, and a mini case** — justify secure-config choices under deadline pressure.\n• **Secure-by-default habits** — checklist with owners and expiry dates.\n\nDefensive only: recommend controls and tradeoffs — not bypassing firewalls or scanning networks.`,
        callout: {
          label: "Why it matters",
          text: "Most exposed-service incidents aren't exotic hacks — they're services left open with default settings nobody got around to locking down.",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "The \"just for testing\" server that stayed exposed",
        body: `A school's robotics team sets up a small web server to host their project documentation, so mentors and judges can review it before a competition. To save time before the deadline, one student enables remote admin access on the server "just for this week" so the team can quickly fix bugs from home, and leaves the factory-default admin password in place — planning to change it and turn off remote access "right after the competition."\n\nThe competition ends. Nobody remembers the temporary remote-admin setting. Months later, the school's IT department runs a routine review and discovers the server has been reachable from the open internet the entire time, with the same default password still active — and unknown login attempts in the logs going back weeks.\n\nNothing catastrophic happened this time. But the sentence "we'll secure it later" is exactly the gap this lesson is built to close — because "later" quietly became "months," and the default password never changed.`,
        callout: {
          label: "Notice",
          text: "Nobody in this story did anything obviously careless in the moment. Each individual shortcut felt small and temporary — the risk came from the accumulation, not a single dramatic mistake.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Firewall and config vocabulary",
        body: `• **Firewall** — a system that filters network traffic based on rules (allow/deny by address, port, or other criteria).\n• **Default-deny** — a posture that blocks everything by default, then allows only specific, approved traffic.\n• **Default-allow** — a posture that allows everything by default, then blocks specific known-bad traffic; generally considered weaker.\n• **Default credentials** — factory-set usernames/passwords (like admin/admin) that ship with many devices and services.\n• **Segmentation** — dividing a network into smaller zones so a problem in one zone is contained.\n• **Attack surface** — the total set of points where an unauthorized user could try to interact with a system; fewer exposed services generally means a smaller surface.\n• **Secure by default** — designing or configuring systems so the safest option is what happens automatically, without extra effort.`,
        callout: {
          label: "Pro tip",
          text: "\"Attack surface\" isn't about attacking — it's a defender's way of asking \"how many doors and windows does this system actually have open?\"",
        },
      },
      {
        id: "concept-1",
        kicker: "The gatekeeper",
        title: "What a firewall actually does",
        image: "/images/lessons/cs-8-2.png",
        imageAlt: "Firewall rule table showing allow and deny entries for specific ports and addresses",
        body: `A **firewall** inspects traffic and decides, by rule, what's allowed or blocked — like a front desk with a visitor list.\n\n**Levels:**\n• **Network firewalls** — whole network (home router, school perimeter).\n• **Host-based firewalls** — one device's send/receive filter.\n\n**Rules commonly use** address, port/service, and direction (inbound vs outbound).\n\n**Recommend with tradeoffs:** every **allow** improves availability/usability for someone and grows attack surface; every **deny** shrinks surface and may break a workflow. Good recommendations name *who needs access*, *from where*, and *until when* — not "open it forever so nobody complains." Temporary allows need owners and expiry (robotics remote-admin lesson).`,
        bullets: [
          "Firewalls filter with **allow/deny rules** at network or host level.",
          "Rules consider **address, port, and direction**.",
          "**Recommend** allows narrowly; pair temporary opens with removal plans.",
        ],
        callout: {
          label: "Watch out",
          text: "A firewall isn't \"set and forget.\" Rules created for a temporary need need a matching plan to remove them later.",
        },
        checkIn: {
          prompt: "Judges need to read docs; mentors want remote admin from home. Which firewall-oriented recommendation best balances security and availability?",
          choices: [
            "It can seem like allow all inbound from the internet so nobody is blocked, but that reading skips the distinction this question is testing",
            "It can seem like block the documentation site so admins feel safer, but that reading skips the distinction this question is testing",
            "It can seem like disable the firewall entirely during competition week, but that reading skips the distinction this question is testing",
            "Allow the documentation service as needed; keep remote admin closed by default or tightly limited, with owner + expiry if temporarily required",
          ],
          correctIndex: 3,
          explanation:
            "Availability for readers doesn't require exposing admin. Narrow allows + temporary controls are the justified tradeoff.",
        },
      },
      {
        id: "concept-2",
        kicker: "Which way should the gate default?",
        title: "Default-deny vs. default-allow — compare tradeoffs",
        body: `**Compare postures** when no explicit rule exists:\n\n| Posture | Default behavior | Failure direction | Usability/availability tradeoff |\n|---|---|---|---|\n| **Default-deny** | Block unless allowed | Forgotten rules → more restriction | May need deliberate allows for legitimate work |\n| **Default-allow** | Allow unless blocked | Forgotten rules → more exposure | Feels convenient until an unknown threat appears |\n\n**Recommendation:** prefer **default-deny** — it fails safely. Accept that someone must document needed traffic (ports/services) so learning and club work still function. Default-allow fails open: gaps become exposure, especially for threats nobody listed yet.\n\nRobotics story: if remote admin **defaulted closed** unless consciously opened with a close plan, "temporary" would stay visible. Security vs convenience is the point — convenience without expiry is how availability today becomes incident tomorrow.`,
        callout: {
          label: "Common misconception",
          text: "\"We'll secure it later, it's just temporary\" quietly assumes default-allow thinking. Default-deny flips that assumption — and still requires listing what must stay available.",
        },
        checkIn: {
          prompt: "A club says default-deny \"breaks demos.\" Which recommendation best explains the real tradeoff?",
          choices: [
            "Some learners answer “Switch to default-allow forever — demos matter more than any exposure”, yet that does not match the precise idea from the lesson",
            "Keep default-deny, then explicitly allow the demo's required ports/services with owners — security fails closed; availability is designed on purpose",
            "It can seem like default-deny requires no configuration at all, so demos can't work, but that reading skips the distinction this question is testing",
            "It can seem like default-allow blocks 100% of malicious traffic automatically, but that reading skips the distinction this question is testing",
          ],
          correctIndex: 1,
          explanation:
            "Default-deny isn't \"block everything useful\" — it's \"allow what you justify.\" That is the security/usability tradeoff done correctly.",
        },
      },
      {
        id: "concept-3",
        kicker: "Shipped-in weaknesses",
        title: "Risky default configurations",
        image: "/images/lessons/cs-8-3.png",
        imageAlt: "Router admin login screen showing username admin and password admin highlighted as a risky default",
        body: `Many devices ship for **easy setup**, not security. **Recommend fixes** by comparing convenience to exposure:\n\n• **Default credentials** — factory admin/admin is documented publicly; leaving it is nearly "no secret." Tradeoff of changing it: one setup step vs open remote admin forever.\n• **Unused services left running** — remote management/file sharing enabled "just in case." Recommend disable-until-needed; availability returns when you re-enable with an owner.\n• **Overly permissive default rules** — broad inbound allows for convenience assume you'll lock down later (robotics story: you often won't).\n• **Unpatched firmware** — set-and-forget devices carry known weaknesses; updates cost a little downtime, buy a lot of risk reduction.\n\n**Pattern to recommend:** change defaults immediately, disable what you don't need, prefer locked-down starts — then deliberately open only justified, owned paths.`,
        callout: {
          label: "Why it matters",
          text: "Default credentials aren't really \"credentials\" once they're publicly documented — they're an open door with a sign on it.",
        },
        checkIn: {
          prompt: "A club wants to keep factory router admin \"so we don't forget a new password.\" What recommendation best states the tradeoff?",
          choices: [
            "A common mix-up is to treat default passwords automatically expire after one week as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat keep the default — memorability always beats exposure as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat default passwords only exist on smartphones as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Change the default immediately and store the new admin secret safely (manager/adviser vault) — one usability step prevents a well-known password from protecting the edge device",
          ],
          correctIndex: 3,
          explanation:
            "Factory credentials are public knowledge; the justified tradeoff is a managed new secret, not an internet-famous password on the gateway.",
        },
      },
      {
        id: "worked-example",
        kicker: "Step by step",
        title: "Fixing the robotics team's exposed server",
        body: `Let's use the robotics team's story as a hands-on-paper remediation exercise.\n\n**Step 1 — Confirm what's actually needed.** The real goal was hosting documentation for mentors and judges to view — that likely only requires a basic read-only web service, not remote admin access from anywhere on the internet.\n\n**Step 2 — Change the default credentials immediately.** Even before anything else, the factory-default admin password must be replaced with something unique and strong (echoing Lesson 5's password lesson).\n\n**Step 3 — Disable remote admin access from the open internet.** If team members need to make changes remotely, a safer pattern is a locked-down connection method (like requiring access from trusted addresses only), not a wide-open admin panel reachable by anyone.\n\n**Step 4 — Apply default-deny thinking going forward.** Configure the server so that new services or ports are blocked by default, and only opened deliberately, with a plan for when they'll be closed again.\n\n**Step 5 — Set a removal reminder for anything temporary.** The original plan was "turn it off after the competition" — but with no reminder or owner, that plan silently failed. A calendar reminder tied to a specific person would have caught this in days, not months.\n\nNotice how this mirrors the access-control lifecycle from Lesson 6: temporary access (or in this case, a temporary open service) needs an expiration plan, not just good intentions.`,
        checkIn: {
          prompt: "Which step in the remediation most directly addresses why the 'temporary' remote access was never removed?",
          choices: [
            "Step 5 — setting a removal reminder tied to a specific person",
            "None of the steps address this” belongs to a different situation than the one in the question stem",
            "Step 2 — changing the default credentials” belongs to a different situation than the one in the question stem",
            "Step 1 — confirming what's actually needed” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "The root cause of the months-long exposure was that nobody was responsible for remembering to close the temporary access — a reminder tied to an owner directly fixes that gap.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "\"We'll secure it later, it's just temporary\"",
        body: `This phrase shows up constantly in real incidents, and it's rarely said carelessly — it usually reflects genuine time pressure (a competition deadline, a launch date, a busy week). The problem isn't the intention; it's that "temporary" configurations have no natural expiration unless someone builds one in.\n\nOnce a "temporary" open service works and nothing bad happens right away, there's little visible pressure to go back and lock it down — it quietly becomes permanent by default, exactly like it did for the robotics team.\n\nThe more accurate mental model: **anything opened "temporarily" needs an explicit plan and owner for closing it again** — a calendar reminder, a ticket, a specific person's name attached to it — or it should be assumed to become permanent. "I'll remember" is not a plan.`,
        callout: {
          label: "Reframe it",
          text: "Instead of \"we'll secure it later,\" try: \"we're opening this temporarily, and here's exactly who is responsible for closing it, and by when.\"",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Try it yourself: a two-minute exposure audit",
        body: `Think about a device or account you or your family controls that could have default or leftover settings — a home router, a smart device, an old club/team tool, a server or app you've set up.\n\n1. **Did it come with default credentials?** Do you actually know whether they've been changed?\n2. **Is anything enabled "just in case" or "for convenience"** that you don't actually use regularly — remote access, an old service, a broad sharing setting?\n3. **Is there anything "temporary" from months ago** that never actually got closed down, the way the robotics team's remote access didn't?\n\nYou don't need to fix everything today — but naming a specific gap (even just to yourself, or to whoever manages that device) is exactly the defender instinct this lesson is building.`,
        callout: {
          label: "Keep it real",
          text: "Home routers are a great place to start: many still use factory admin passwords years after setup, without anyone ever checking.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Going deeper",
        title: "Segmentation — containing the next incident",
        image: "/images/lessons/cs-8-4.png",
        imageAlt: "Network diagram showing separate segments for guest Wi-Fi, staff devices, and servers with firewalls between them",
        body: `Even with great defaults, incidents still happen. **Segmentation** divides a network into zones so a problem in one zone doesn't automatically reach every other zone — network-level least privilege.\n\n**Patterns to recommend:**\n• Guest Wi-Fi ≠ staff file servers / admin tools.\n• Student devices ≠ gradebook / HR paths.\n• Public-facing servers ≠ internal databases.\n\n**Tradeoff (security vs usability/availability):** segmentation can mean "that printer isn't reachable from guest Wi-Fi" or "club gear can't see treasurer folders." Those friction points are often correct — availability should match trust level. A flat network maximizes convenience and blast radius together.\n\nRobotics docs server segmented from sensitive systems: exposure is still bad, but blast radius shrinks. **Recommend** zones when different trust levels share a building.`,
        bullets: [
          "Segmentation limits compromise spread — recommend it when trust levels differ.",
          "Guest / student / public zones should not freely reach sensitive internals.",
          "Accept some cross-zone friction; that is the usability tradeoff.",
          "Mirrors least privilege at the network level.",
        ],
        callout: {
          label: "Defender view",
          text: "Ask: \"if this one device were compromised right now, what else could it reach?\" Recommend making that answer as small as practical.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Comparing postures — recommend with tradeoffs",
        body: `**Default-allow vs default-deny:**\n• Allow-by-default → forgotten rules mean *more* exposure; demos feel easy until they aren't.\n• Deny-by-default → forgotten rules mean *more* restriction; you must deliberately allow needed traffic (availability by design).\n\n**Flat vs segmented:**\n• Flat → max convenience, max blast radius.\n• Segmented → contained incidents; some cross-zone workflows need explicit paths.\n\n**Recommendation rule:** prefer postures that **fail safely** (default-deny, segmentation). Justify each allow and each cross-zone path with who/what/until-when — that is how you balance security against usability and availability without pretending tradeoffs don't exist.`,
        checkIn: {
          prompt: "You must recommend either a flat club LAN (everything reaches everything) or guest/club/finance segments. Which justification is strongest?",
          choices: [
            "A common mix-up is to treat flat — security and usability never trade off as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat flat — firewalls become unnecessary forever as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Segmented — accept some friction so a compromised guest or practice device cannot reach finance folders; availability for guests doesn't require access to treasuries",
            "A common mix-up is to treat segmented only for home Wi-Fi, never schools as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
          correctIndex: 2,
          explanation:
            "Segmentation is a recommended tradeoff: slightly less convenience for much smaller blast radius when trust levels differ.",
        },
      },
      {
        id: "defender-trap-or-myth",
        kicker: "Don't fall for this",
        title: "The trap: \"just this once, for convenience\"",
        body: `A close cousin of "we'll secure it later" is the moment-by-moment decision to expose something "just this once" — opening remote admin access for a busy week, disabling a firewall rule to quickly test something, using a shared default password because setting up individual ones feels like it'll take too long right now.\n\nThe trap is that each of these decisions is individually reasonable under time pressure, and nothing bad happens immediately — which quietly teaches the wrong lesson: "that shortcut was fine." Over enough repetitions, across enough systems, some of those shortcuts inevitably get forgotten and become permanent, exactly like the robotics team's server.\n\nThe fix isn't "never take shortcuts under deadline pressure" — that's not realistic. It's building the habit from the deeper-skill section: **any shortcut that opens something up gets a specific owner and a specific closing date**, written down somewhere, not just held in someone's memory.`,
        callout: {
          label: "Watch out",
          text: "If a security shortcut doesn't have a name and a date attached to closing it, assume it will become permanent — because in practice, it usually does.",
        },
      },
      {
        id: "habits",
        kicker: "Bring it together",
        title: "Secure-by-default habits worth building",
        body: `A practical checklist from this lesson, in priority order:\n\n• **Change default credentials immediately** on any new device or service — before it ever goes live.\n• **Disable services you don't actually use** — fewer running services means a smaller attack surface.\n• **Default to closed, open deliberately** — apply default-deny thinking even to small personal projects and club tools.\n• **Attach an owner and a closing date to anything temporary** — "just for this week" needs a real plan, not just good intentions.\n• **Separate sensitive systems from public-facing or guest-accessible ones** — segmentation contains problems instead of letting them spread.\n\nNone of these require deep technical expertise — they require the discipline to treat "temporary" and "just this once" with the same seriousness as permanent decisions, because in practice, that's often exactly what they become.`,
        callout: {
          label: "Try this week",
          text: "Check one device you control (router, smart device, old club tool) for a default password that was never changed — and change it if you find one.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and reflect",
        title: "Quick gut-check before you continue",
        body: `Before the mini case and knowledge check: justify a recommendation. A teammate wants default-allow "so judges never hit a block page." What would you recommend instead, and what usability/availability tradeoff are you accepting?`,
      },
      {
        id: "mini-case",
        kicker: "Case file",
        title: "Mini case: the smart camera nobody reconfigured",
        image: "/images/lessons/cs-8-5.png",
        imageAlt: "Smart security camera app screen showing factory default login credentials still active after a year",
        body: `**The situation:** A family sets up a smart security camera to watch their front porch, following the quick-start guide that gets it working in minutes. The guide mentions changing the default password "for better security," but the family is focused on just getting the camera running before a trip, and plans to come back and update the settings "once things settle down."\n\nA year later, a relative helping set up a second camera notices the first camera is still using its factory-default login, exactly as installed — and that it's configured to allow remote viewing from anywhere on the internet, a setting that made initial setup convenient but was never revisited afterward.\n\n**Apply what you've learned:**\n\n• **Risky default:** The factory-default credentials were never changed — a well-known category of risky default from this lesson, no different in principle from the robotics team's server.\n• **Default-allow thinking:** The camera's out-of-the-box configuration favored easy remote access over safety by default — a real-world example of default-allow rather than default-deny.\n• **The "later" trap:** "Once things settle down" had no owner or date attached — exactly the pattern from the defender-trap section that turns temporary gaps into permanent ones.\n• **Fix going forward:** Change the default password immediately, review whether remote access from anywhere is actually needed, and — since this is a home network — consider whether guest devices and smart home devices should sit on a separate segment from personal computers.\n\nThis case shows that risky defaults aren't limited to servers and school systems — the exact same patterns apply to ordinary smart home devices, which is exactly why "secure by default" matters for everyone, not just IT departments.`,
      },
      {
        id: "firewall-decisions",
        kicker: "Decision checklist",
        title: "Firewall decisions without becoming a network admin",
        body: `Apply the same questions defenders use when **recommending** exposure:

**For any service on a network:**
• Who needs reachability — specific people, or the whole internet?
• What is the usability win of leaving this port open — and is it worth the surface?
• Is there a narrower allow (VPN, limited addresses, auth gate) with an expiry?

**Default-deny for personal/club gear:**
• Change default admin passwords before join.
• Disable remote admin you don't use.
• Turn off unused sharing/casting.

**Compare exposure levels:**
• **Intentional public** — hardened, monitored, patched.
• **Internal only** — not for café Wi-Fi.
• **Accidental public** — defaults left open; fix first.

Every open service is a doorway. Count them on purpose; justify each allow against availability needs.`,
        checkIn: {
          prompt: "Remote admin would save mentors 10 minutes per bugfix but opens the server to the internet. Which recommendation best states the tradeoff?",
          choices: [
            "Prefer closed-by-default; if temporarily required, narrow the allow, assign an owner/expiry, and change defaults — accept some friction to cut exposure",
            "A common mix-up is to treat firewalls only work if every port is open as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat default-allow is illegal for schools as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "It can seem like always allow remote admin from anywhere — availability always wins, but that reading skips the distinction this question is testing",
          ],
          correctIndex: 0,
          explanation:
            "Security vs usability is real — the justified move is narrow, temporary, owned allows under default-deny, not permanent internet-wide admin.",
        },
      },
      {
        id: "config-audit-walkthrough",
        kicker: "Scenario walkthrough",
        title: "A two-minute exposure audit for club gear",
        body: `**Scenario:** The robotics team sets up a practice server on a laptop in the club room. Someone enabled "share to network" so teammates could pull files quickly. Weeks later, the laptop still runs, still shares, still uses the factory admin password on the router.

**Defender walkthrough:**
1. **Inventory** — list devices that listen for inbound connections (laptop share, router admin, any IoT).
2. **Defaults** — factory passwords on router and camera? Change before use.
3. **Need check** — is continuous network sharing still required, or was it a one-day event?
4. **Segment** — can practice gear sit on a separate VLAN or guest network away from sponsor financial docs?
5. **Document** — note who owns the device and review date on the club calendar.

**What to do next:** disable sharing when the event ends, rotate router admin password, confirm firewall rules block inbound from the public internet if not required.

Most "we got lucky" incidents are really unattended exposure that nobody reviewed.`,
        callout: {
          label: "Defender view",
          text: "Convenience settings (open sharing, remote admin) are fine temporarily — with an owner and an expiry date.",
        },
      },
      {
        id: "segmentation-scenario",
        kicker: "See it in action",
        title: "When segmentation limits the blast radius",
        body: `**Scenario:** A guest presenter joins school Wi-Fi with a laptop that has outdated software. Malware on that device starts probing other machines on the same flat network.

**Without segmentation:** probes may reach student laptops, lab machines, and possibly internal file shares — one bad device, wide ripple.

**With segmentation:** guest Wi-Fi cannot route to staff file servers or admin tools; probes hit a dead end at the network boundary.

**Defender takeaway:** segmentation is the network version of least privilege — zones match trust level. You can advocate for it even as a student: "Should guest devices share the same network as sensitive club financial folders?"

**What to do next if you suspect a compromised device on shared Wi-Fi:** disconnect it, report to IT, avoid plugging unknown USB devices into your machine, and do not spread files from the suspect device.`,
      },
      {
        id: "check-yourself",
        kicker: "Before you go",
        title: "Check yourself",
        body: `Quick self-check: can you explain why default-deny is safer than default-allow in your own words? Can you name at least three risky default configurations from this lesson? If yes, you're ready for the knowledge check.`,
        checkIn: {
          prompt: "What do the robotics team's server and the family's smart camera have in common as cases in this lesson?",
          choices: [
            "You might defend “Both cases involved malware being installed intentionally” in casual talk, but it fails the definition used here",
            "Picking “Neither case had anything to do with default settings” is a common mix-up that confuses a nearby idea with the right one",
            "Both involved a risky default (credentials or open access) combined with a 'we'll fix it later' plan that had no real owner or date",
            "Some learners answer “Both were deliberately hacked by a skilled attacker”, yet that does not match the precise idea from the lesson",
          ],
          correctIndex: 2,
          explanation:
            "Both incidents trace back to unchanged risky defaults plus a vague, undated plan to fix things later — the exact pattern this lesson focuses on preventing.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Recommend** firewall allows narrowly; every open port trades security for someone's availability.\n• **Compare** default-deny vs default-allow — deny fails safely; still document needed traffic.\n• **Risky defaults** — factory credentials, unused services, permissive rules — fix immediately.\n• **Segmentation** contains compromise; accept cross-zone friction when trust levels differ.\n• **"Temporary"** opens need owner + closing date or they become permanent.\n\nTechnical core so far: threats, credentials, access control, architecture, and secure config.\n\nTake the **Knowledge check**, then justify one configuration recommendation.`,
      },
    ],
  },
  bigIdeas: [
    "**Recommend** firewall rules that balance security with usability/availability — narrow allows, owned temporary exceptions.",
    "**Compare default-deny vs default-allow** — deny fails safely; allow fails toward exposure.",
    "**Segmentation** and fixing **risky defaults** shrink blast radius the way least privilege does for accounts.",
  ],
  keyTerms: [
    { term: "Firewall", definition: "A system that filters network traffic using allow/deny rules." },
    { term: "Default-deny", definition: "A security posture that blocks everything unless explicitly allowed." },
    { term: "Default-allow", definition: "A security posture that allows everything unless explicitly blocked." },
    { term: "Default credentials", definition: "Factory-set usernames/passwords shipped with a device or service." },
    { term: "Segmentation", definition: "Dividing a network into zones so a compromise in one zone doesn't spread to others." },
    { term: "Attack surface", definition: "The total set of exposed points where an unauthorized user could try to interact with a system." },
    { term: "Secure by default", definition: "Designing systems so the safest configuration happens automatically, without extra effort." },
  ],
  realWorld:
    "A smart camera left on its factory-default password with remote access enabled is a small-scale version of the same risky-default problem that leads to real exposed-server incidents in the news.",
  quiz: [
    {
      id: "q1",
      question: "When recommending a firewall allow for club docs, which reasoning is strongest?",
      choices: [
            "It can seem like guarantees that no malicious traffic can ever get through, but that reading skips the distinction this question is testing",
            "Allow only what judges/mentors need (e.g., the docs service), and avoid internet-wide admin — every allow trades security for someone's availability",
            "It can seem like scans every file on a device for viruses before it opens, but that reading skips the distinction this question is testing",
            "A common mix-up is to treat automatically encrypts all data leaving the network as enough, which confuses a nearby idea with the right one",
          ],
      correctIndex: 1,
      explanation:
        "Firewalls filter by rule; good recommendations narrow allows to justified needs instead of equating \"available\" with \"fully exposed.\"",
    },
    {
      id: "q2",
      question: "Compare default-deny vs default-allow for a school lab under time pressure. Which evaluation is best?",
      choices: [
            "Default-deny blocks 100% of malicious traffic automatically, with no configuration needed” belongs to a different situation than the one in the question stem",
            "Default-deny fails toward restriction when rules are missing; accept documenting needed allows so demos still work without failing open",
            "Default-deny is only appropriate for home networks, never schools” is close in topic, but it is the wrong fit for what the prompt asks",
            "“Default-allow is safer because it keeps more services reachable by default” describes a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Default-deny is the safer failure direction; usability is restored by explicit, justified allows — not by failing open.",
    },
    {
      id: "q3",
      question: "Which of these is a classic risky default configuration?",
      choices: [
            "Segmenting guest Wi-Fi from internal systems” belongs to a different situation than the one in the question stem",
            "Changing factory admin credentials right after setup” belongs to a different situation than the one in the question stem",
            "Leaving factory-default admin credentials unchanged on a live device",
            "Disabling services you don't use” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Unchanged default credentials are widely documented and effectively not secret — a common real-world risk. The other options are all defender best practices, not risks.",
    },
    {
      id: "q4",
      question: "Why recommend segmentation even though it can make some printers or shares harder to reach from guest Wi-Fi?",
      choices: [
            "A common mix-up is to treat to eliminate the need for firewalls entirely as enough, which confuses a nearby idea with the right one",
            "Because containing blast radius outweighs that usability friction when trust levels differ — availability for guests shouldn't include finance systems",
            "It can seem like to make every device equally reachable from every other device, but that reading skips the distinction this question is testing",
            "It can seem like to guarantee that zero security incidents will ever occur, but that reading skips the distinction this question is testing",
          ],
      correctIndex: 1,
      explanation:
        "Segmentation is a security/usability tradeoff: some inconvenience in exchange for limiting how far a compromise spreads.",
    },
    {
      id: "q5",
      question: "In the robotics team's story, what was the deeper process failure behind the exposed server?",
      choices: [
            "The team changed their default credentials before ever going live” belongs to a different situation than the one in the question stem",
            "A 'temporary' shortcut (remote access + default password) had no owner or closing date, so it quietly became permanent",
            "The server hosted public documentation, which is inherently risky by itself” belongs to a different situation than the one in the question stem",
            "The remote access was closed immediately once the competition ended” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "The core failure was a temporary exception with no assigned owner or deadline for closing it — not the initial decision to host documentation.",
    },
    {
      id: "q6",
      question: "Why doesn't 'we'll secure it later' work well as a plan on its own?",
      choices: [
            "Because changing settings after launch usually breaks the system” belongs to a different situation than the one in the question stem",
            "Because it's technically impossible to secure a system once it's already running” belongs to a different situation than the one in the question stem",
            "Because without a specific owner and date, 'later' has no natural trigger and tends to never happen",
            "Because security only matters during initial setup, not afterward” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Vague future intentions without an owner or deadline routinely fail to happen — as shown in both mini cases in this lesson.",
    },
    {
      id: "q7",
      question: "What do default-deny and network segmentation have in common as recommendations?",
      choices: [
            "A rushed pass can land on both are unrelated concepts that happen to share this lesson”; careful readers reject it for this problem",
            "Picking “Both require turning off all firewalls to work properly” is a common mix-up that confuses a nearby idea with the right one",
            "Picking “Both guarantee that no security incident can ever occur” is a common mix-up that confuses a nearby idea with the right one",
            "Both are designed to fail safely — limiting exposure or spread when something is missed — at some cost to unconstrained convenience",
          ],
      correctIndex: 3,
      explanation:
        "Both accept mistakes and unknowns and bias outcomes toward restriction/containment — the tradeoff is deliberate design of needed access.",
    },
    {
      id: "q8",
      question: "A mentor wants internet-wide remote admin for speed; IT wants default-deny. Which tradeoff statement should you recommend?",
      choices: [
            "A common mix-up is to treat only professional engineers may discuss this as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat firewalls never affect availability, so open everything as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Keep default-deny; if remote admin is temporarily required, narrow the allow, assign owner/expiry, and prefer stronger auth — accept some friction to avoid accidental public exposure",
            "A common mix-up is to treat tradeoffs don't exist — pick whichever is louder as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
      correctIndex: 2,
      explanation:
        "CSTA-style reasoning weighs security against usability/availability with a concrete, owned exception — not permanent fail-open admin.",
    },
  ],
  reflection: {
    prompt:
      "Recommend a secure-config change for a device or club system you know. Compare default-deny vs leaving something open for convenience, justify your choice, and name the usability/availability tradeoff plus an owner and date if anything stays temporarily open.",
    placeholder: "Example: Router remote admin stays off (default-deny); guest Wi-Fi segmented — I'll accept reconfiguring the printer once so guests can't reach our NAS…",
  },
};
