import type { AIBonusActivity } from "@/components/ai/AILessonCanvas";

export const CYBER_INTERACTIVE_BY_LESSON: Record<string, AIBonusActivity[]> = {
  "cs-1": [
    {
      id: "cs1-parsons",
      kind: "parsons",
      title: "Ethical cyber path",
      prompt:
        "A teammate found a possible school-account weakness. Reorder a responsible response.",
      languageLabel: "process",
      lines: [
        "Stop and confirm you have permission to investigate further",
        "Document what you noticed without trying to exploit it",
        "Report through the official channel (IT, teacher, or help desk)",
        "Wait for authorized staff to validate and fix the issue",
        "Follow up only if asked — don't keep probing on your own",
      ],
      lineExplanations: [
        "This comes first because permission draws the line between helpful noticing and unauthorized testing. If you skip it, even a \"good\" probe can violate school rules or law before you've helped anyone.",
        "Document next so you have a clear, non-destructive record of what you saw. Trying to exploit first can damage systems, destroy evidence, and turn a report into an incident you caused.",
        "Reporting through the official channel comes after notes exist so staff get facts, not rumors. Side-channel chats skip accountability and can delay the people who are allowed to fix it.",
        "Waiting for authorized staff matters because validation and remediation need tools and access you may not have. Continuing alone can lock accounts, corrupt data, or tip off an attacker if one is already present.",
        "Following up only when asked closes the loop without turning curiosity into ongoing unauthorized access. If you keep probing, you recreate the same ethical and safety risk you just avoided.",
      ],
      explanation:
        "Cybersecurity includes ethics: notice, document, report. Unauthorized testing — even with good intent — can harm systems and break rules.",
    },
    {
      id: "cs1-debug",
      kind: "debug",
      title: "Ethics mix-up",
      prompt: "This club policy sounds helpful but has a serious flaw. Spot it.",
      contentLabel: "Buggy policy",
      buggyContent:
        '"If you think a system is insecure, prove it by logging in as someone else or bypassing the login. Then post the steps publicly so everyone learns. Permission is optional if your goal is education."',
      choices: [
            "Logging in as someone else is fine if you change the password back later",
            "Education goals automatically grant permission to test any system",
            "Unauthorized access and public attack steps are unethical and often illegal — report privately with permission",
            "Public posts are always safer than telling IT",
          ],
      correctIndex: 2,
      hint: "Who authorized the test — and who gets hurt if it goes wrong?",
      explanation:
        "Defenders practice with permission, in scope, and report privately. \"I meant well\" does not authorize access or publishing how to break controls.",
    },
    {
      id: "cs1-scenario",
      kind: "scenario",
      title: "Ethics decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Jordan wants a cybersecurity career and found a possible bug on a local business site with no bug-bounty program. They have never contacted the owner. What first?",
          choices: [
            {
              id: "report",
              label: "Stop probing and contact the owner or leave it alone",
              nextId: "report-ok",
              tone: "best",
              feedback: "No authorization means no further testing — report or walk away.",
            },
            {
              id: "prove",
              label: "Keep probing to \"prove\" the bug before telling anyone",
              nextId: "prove-end",
              tone: "risky",
              feedback: "Proving access without permission can be unethical and illegal.",
            },
            {
              id: "public",
              label: "Post exploit steps publicly so others can learn",
              nextId: "public-end",
              tone: "risky",
              feedback: "Public attack details can harm the business and others.",
            },
          ],
        },
        {
          id: "report-ok",
          prompt: "Owner replies asking how to fix it safely. Best next step?",
          choices: [
            {
              id: "private",
              label: "Share high-level findings privately and suggest they hire authorized help",
              nextId: "success",
              tone: "best",
              feedback: "Responsible disclosure stays private and in-scope.",
            },
            {
              id: "demo",
              label: "Break in further to show a full demo without written permission",
              nextId: "demo-end",
              tone: "risky",
              feedback: "Even helpful intent needs clear authorization before deeper access.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Career-aligned ethics",
            body: "You avoided unauthorized testing, used private channels, and stayed inside permission. That's how defenders build trust.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "prove-end",
          ending: {
            title: "Unauthorized testing",
            body: "Without permission, further probing is off-limits. Contact the owner through proper channels — or leave it alone.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "public-end",
          ending: {
            title: "Harmful disclosure",
            body: "Publishing how to break a live system can cause real damage. Report privately with authorization.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "demo-end",
          ending: {
            title: "Scope exceeded",
            body: "Deeper access still needs written permission. Offer guidance; don't expand the test on your own.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "cs-2": [
    {
      id: "cs2-parsons",
      kind: "parsons",
      title: "Login check chain",
      prompt:
        "Reorder how a healthy authentication check usually works when you sign in.",
      languageLabel: "process",
      lines: [
        "User presents an identity claim (username or account id)",
        "System requests proof (password, MFA code, passkey, etc.)",
        "System verifies the proof against stored credentials",
        "On success, the session is created with limited permissions",
        "Failed attempts are logged and rate-limited if needed",
      ],
      lineExplanations: [
        "Authentication starts with a claim of identity — username or account id — so the system knows which credential record to check. Without a claim first, there is nothing specific to verify.",
        "Proof comes next because a name alone is not authentication. If you skip requesting a password, MFA code, or passkey, anyone who knows a username could pretend to be that person.",
        "Verification against stored credentials must happen before trust is granted. Creating a session without this check would let forged or guessed proofs through unchecked.",
        "A successful check then creates a session with limited permissions so the user can work without getting blanket admin rights. Authorization (what you may do) only makes sense after authentication succeeds.",
        "Failed attempts are logged and rate-limited so defenders can spot stuffing and slow brute force. If you only celebrate success and ignore failures, attackers get unlimited free guesses.",
      ],
      explanation:
        "Authentication answers \"who are you?\" with proof. Authorization (what you may do) comes after a successful, logged, rate-limited check.",
    },
    {
      id: "cs2-debug",
      kind: "debug",
      title: "CIA confusion",
      prompt: "A study note mixes up the CIA triad. Find the real error.",
      contentLabel: "Buggy note",
      buggyContent:
        '"Confidentiality = anyone can read the data so collaboration is easy. Integrity = the system stays online 24/7. Availability = nobody can change records. Authentication proves what you are allowed to do."',
      choices: [
            "Authentication and authorization are the same word",
            "C = keep data private; I = data stays accurate/unchanged; A = systems usable when needed; auth ≠ authorization",
            "Integrity only means antivirus is installed",
            "Availability means encrypting every file twice",
          ],
      correctIndex: 1,
      hint: "Match each letter to private, trustworthy, or usable.",
      explanation:
        "Confidentiality protects secrecy, integrity protects correctness, availability protects access when needed. Authentication verifies identity; authorization decides permissions.",
    },
    {
      id: "cs2-match",
      kind: "match",
      title: "Triad + auth match",
      prompt: "Match each security idea to the best short definition.",
      pairs: [
        {
          id: "c",
          left: "Confidentiality",
          right: "Only authorized people can read sensitive data",
        },
        {
          id: "i",
          left: "Integrity",
          right: "Data and systems stay accurate and untampered",
        },
        {
          id: "a",
          left: "Availability",
          right: "Services and data are usable when needed",
        },
        {
          id: "authn",
          left: "Authentication",
          right: "Proving you are who you claim to be",
        },
      ],
    },
  ],

  "cs-3": [
    {
      id: "cs3-parsons",
      kind: "parsons",
      title: "Suspected malware response",
      prompt:
        "Your laptop suddenly pops ads and runs hot. Put a safe first-response order together.",
      languageLabel: "process",
      lines: [
        "Disconnect from the network if safe to do so",
        "Note what changed (new apps, pop-ups, slowdowns)",
        "Run trusted security tools / ask IT for a scan",
        "Change important passwords from a clean device",
        "Restore from a known-good backup if needed after cleanup",
      ],
      lineExplanations: [
        "Containment comes first: disconnecting (when safe) limits malware from spreading or exfiltrating data while you still have a chance to stop the bleed. If you keep chatting and browsing first, the infection may reach more accounts and systems.",
        "Next, note symptoms so you and IT know what changed — new apps, pop-ups, heat, slowness. Skipping observation makes later scans and cleanup guesswork, and you may miss clues about what was installed.",
        "Trusted tools or IT scans come after you have contained and observed, so cleanup uses known-good software rather than random \"fixers\" from scareware. Untrusted cleaners can make the problem worse.",
        "Password changes happen from a clean device because a still-infected machine can steal the new secrets as you type them. Resetting on the compromised laptop often hands attackers fresh credentials.",
        "Restore from a known-good backup only after cleanup so you do not reintroduce malware from a dirty image. Declaring victory before a verified restore leaves you with a fragile or reinfected system.",
      ],
      explanation:
        "Contain first, then investigate with trusted tools. Reset credentials from a clean device so malware can't capture new passwords.",
    },
    {
      id: "cs3-debug",
      kind: "debug",
      title: "Malware myth",
      prompt: "This tip sheet has one dangerous wrong claim. Spot it.",
      contentLabel: "Buggy tip",
      buggyContent:
        '"Ransomware only hits big companies. Macs never get malware. If a pop-up says your PC is infected, click the link immediately and download their cleaner. Sharing infected USB sticks is fine if you trust your friends."',
      choices: [
            "Anyone can be targeted; don't trust scareware pop-ups; USBs can spread malware across platforms",
            "USB sticks automatically remove viruses on insert",
            "Scareware links are always from your school IT",
            "Only Windows needs updates forever",
          ],
      correctIndex: 0,
      hint: "Who benefits from a sudden \"download now\" scare?",
      explanation:
        "Malware affects many devices and people. Fake \"cleaner\" pop-ups are a common social trick. Removable media can carry unwanted software between machines.",
    },
    {
      id: "cs3-scenario",
      kind: "scenario",
      title: "Malware response tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Shared-drive files have odd extensions, a note demands payment to \"unlock\" documents, and online backups look encrypted too. First move?",
          choices: [
            {
              id: "isolate",
              label: "Isolate affected systems and stop spreading — then call IT",
              nextId: "isolate-ok",
              tone: "best",
              feedback: "Contain ransomware risk before chasing payment options.",
            },
            {
              id: "pay",
              label: "Pay the ransom immediately so classwork isn't delayed",
              nextId: "pay-end",
              tone: "risky",
              feedback: "Payment isn't a recovery plan and may not restore files.",
            },
            {
              id: "click-note",
              label: "Open every link in the ransom note on the infected PC",
              nextId: "click-end",
              tone: "risky",
              feedback: "Attacker links can worsen the compromise.",
            },
          ],
        },
        {
          id: "isolate-ok",
          prompt: "IT asks how you'll recover data after cleanup. Best answer?",
          choices: [
            {
              id: "offline",
              label: "Restore from offline/immutable backups that weren't reachable",
              nextId: "success",
              tone: "best",
              feedback: "Backups that ransomware couldn't touch are the real recovery path.",
            },
            {
              id: "hope",
              label: "Skip backups and hope the attacker sends a free decryptor",
              nextId: "hope-end",
              tone: "risky",
              feedback: "Hope is not a backup strategy.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Ransomware instincts",
            body: "You contained spread, involved IT, and planned recovery from protected backups — not payment.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "pay-end",
          ending: {
            title: "Wrong plan A",
            body: "Paying doesn't guarantee recovery and funds crime. Isolate, involve IT, and restore from good backups.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "click-end",
          ending: {
            title: "Deeper compromise",
            body: "Don't follow attacker instructions on an infected host. Contain and use trusted cleanup paths.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "hope-end",
          ending: {
            title: "No recovery plan",
            body: "Offline or immutable backups are how defenders survive ransomware. Build that before you need it.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "cs-4": [
    {
      id: "cs4-parsons",
      kind: "parsons",
      title: "Phish triage steps",
      prompt:
        "You get a urgent \"reset your school password\" email. Reorder a safe triage.",
      languageLabel: "process",
      lines: [
        "Pause — don't click links or open unexpected attachments",
        "Check sender address, urgency pressure, and grammar anomalies",
        "Hover or inspect the real destination without clicking through",
        "Verify via a known-good channel (official portal or IT)",
        "Report the message with the school's phishing report tool",
      ],
      lineExplanations: [
        "Pausing comes first because one click can load malware or send you to a credential trap. If you act on urgency before thinking, the attacker already won the race they designed.",
        "Inspecting sender, pressure, and odd language next builds suspicion without interacting with payloads. You need those red flags before you decide whether the message deserves deeper checking.",
        "Hovering or inspecting the real URL (without clicking through) reveals lookalike domains safely. Jumping straight to the link skips this check and may land you on the attacker's site.",
        "Out-of-band verification via the official portal or IT confirms whether the request is real. Relying only on the email's own links keeps you inside the attacker's story.",
        "Reporting last shares the sample so defenders can block and warn others. Deleting quietly without reporting leaves classmates exposed to the same lure.",
      ],
      explanation:
        "Slow down, inspect, verify out-of-band, then report. Attackers count on panic clicks.",
    },
    {
      id: "cs4-debug",
      kind: "debug",
      title: "SE red flags",
      prompt: "This reply plan misses the real social-engineering risk. Fix it.",
      contentLabel: "Buggy reply plan",
      buggyContent:
        'Message: "Principal needs gift cards NOW — reply with codes. Don\'t tell anyone or the surprise is ruined."\nPlan: Buy cards, text codes to the number in the email, delete the thread so IT isn\'t bothered.',
      choices: [
            "Deleting threads always improves security",
            "Any email that mentions the principal is automatically real",
            "Gift cards are the most secure way to pay schools",
            "Urgency + secrecy + payment request = classic SE; verify in person/known channel and report",
          ],
      correctIndex: 3,
      hint: "Why would a real leader demand secrecy and gift-card codes?",
      explanation:
        "Social engineering uses authority, urgency, and secrecy. Real requests go through known processes — never gift-card codes over email or text.",
    },
    {
      id: "cs4-scenario",
      kind: "scenario",
      title: "Phishing decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Inbox: \"Your package is held — pay $1.99.\" You didn't order anything. The link domain isn't your carrier. What do you do?",
          choices: [
            {
              id: "report",
              label: "Don't click — report as phishing and delete",
              nextId: "report-ok",
              tone: "best",
              feedback: "Unexpected payment + lookalike domain = classic phish.",
            },
            {
              id: "click",
              label: "Click through to \"check\" if the page looks real",
              nextId: "click-end",
              tone: "risky",
              feedback: "Verifying on the attacker's page still risks credentials and malware.",
            },
            {
              id: "forward",
              label: "Forward the live link to friends so they can \"vote\"",
              nextId: "forward-end",
              tone: "risky",
              feedback: "Spreading the lure multiplies the chance someone clicks.",
            },
          ],
        },
        {
          id: "report-ok",
          prompt: "A classmate asks how to confirm a real package hold next time. Best advice?",
          choices: [
            {
              id: "official",
              label: "Use the carrier's official app or typed URL — never the email link",
              nextId: "success",
              tone: "best",
              feedback: "Out-of-band verification beats urgency links.",
            },
            {
              id: "reply",
              label: "Reply to the email with your card so support can \"verify\"",
              nextId: "reply-end",
              tone: "risky",
              feedback: "Never send payment details to an unexpected message.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Phish stopped",
            body: "You skipped the lure, reported it, and verified through known-good channels. That's solid inbox defense.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "click-end",
          ending: {
            title: "Walked into the lure",
            body: "Don't \"test\" suspicious payment pages. Report and use official portals instead.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "forward-end",
          ending: {
            title: "Spread the bait",
            body: "Report phishing to IT — don't recirculate live attack links.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "reply-end",
          ending: {
            title: "Credential / card risk",
            body: "Unexpected emails never need your card details. Use official carrier tools only.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "cs-5": [
    {
      id: "cs5-parsons",
      kind: "parsons",
      title: "Strong account setup",
      prompt:
        "Reorder a solid personal account hardening sequence for a new school portal login.",
      languageLabel: "process",
      lines: [
        "Create a long unique password (or passphrase) in a password manager",
        "Store it only in the manager — don't reuse it elsewhere",
        "Turn on MFA with an authenticator app or hardware key when available",
        "Save a backup MFA method in a secure place",
        "Review recovery email/phone so account recovery stays under your control",
      ],
      lineExplanations: [
        "Creating a long unique secret in a manager comes first so the account starts with a strong, memorable-enough credential you do not have to invent under pressure. Weak or reused passwords from day one invite stuffing later.",
        "Storing it only in the manager (no reuse elsewhere) preserves uniqueness. If you copy that password to other sites, one breach elsewhere unlocks this school account too.",
        "MFA is next because a stolen or phished password alone should not be enough. Enabling it after the password exists layers a second factor attackers often cannot easily steal.",
        "A backup MFA method comes after primary MFA so a lost phone does not lock you out permanently. Skipping backups tempts people to disable MFA later \"just to get back in.\"",
        "Recovery email and phone must be reviewed last in this setup so account recovery stays yours, not an old unused inbox attackers can hijack. Weak recovery paths bypass even strong passwords and MFA.",
      ],
      explanation:
        "Unique secrets + MFA beat clever short passwords. Recovery paths matter as much as the login itself.",
    },
    {
      id: "cs5-debug",
      kind: "debug",
      title: "Hashing myth",
      prompt: "A classmate explains password storage. Spot the bug.",
      contentLabel: "Buggy explanation",
      buggyContent:
        '"Sites should store your real password in plain text so support can email it back. Hashing is the same as encryption and can always be reversed by the website. MFA is optional if the password is \"P@ssw0rd1\". "',
      choices: [
            "Plaintext storage helps users remember passwords better",
            "MFA only works on gaming accounts",
            "Store salted hashes, not plaintext; hashing is one-way; MFA still matters for strong passwords",
            "Encryption and hashing are identical and always reversible",
          ],
      correctIndex: 2,
      hint: "Can the site \"look up\" your password — and should it?",
      explanation:
        "Good systems store salted hashes they cannot reverse into your password. Encryption is different and reversible with a key. MFA adds a second factor even when passwords leak.",
    },
    {
      id: "cs5-scenario",
      kind: "scenario",
      title: "Password & MFA tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "A service announces a password breach. You reused that password on email and two school sites. MFA is off on email. First priority?",
          choices: [
            {
              id: "reset",
              label: "Change the reused password everywhere — start with email — and turn on MFA",
              nextId: "reset-ok",
              tone: "best",
              feedback: "Reuse turns one leak into many account takeovers.",
            },
            {
              id: "wait",
              label: "Wait a week — maybe the breach didn't include your account",
              nextId: "wait-end",
              tone: "risky",
              feedback: "Delay leaves email and school accounts open to stuffing.",
            },
            {
              id: "same",
              label: "Change only the breached site and keep the same password elsewhere",
              nextId: "same-end",
              tone: "risky",
              feedback: "Attackers try the leaked password on other popular sites.",
            },
          ],
        },
        {
          id: "reset-ok",
          prompt: "Email password is unique now. Next hardening step?",
          choices: [
            {
              id: "mfa",
              label: "Enable MFA (authenticator or hardware key) and save backup codes securely",
              nextId: "success",
              tone: "best",
              feedback: "MFA blocks many follow-on logins even if a password leaks again.",
            },
            {
              id: "sms-only",
              label: "Skip MFA — a long password is enough forever",
              nextId: "skip-end",
              tone: "risky",
              feedback: "Passwords still get phished and reused; MFA adds a second factor.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Breach contained",
            body: "You killed reuse, prioritized email, and added MFA. That's how defenders close the door after a leak.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "wait-end",
          ending: {
            title: "Open window",
            body: "Assume the password is burned. Change it everywhere and enable MFA now.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "same-end",
          ending: {
            title: "Reuse still hurts",
            body: "One breached password must not unlock email or school sites. Make each secret unique.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "skip-end",
          ending: {
            title: "Missing second factor",
            body: "Unique passwords help; MFA still matters when secrets leak or get phished.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "cs-6": [
    {
      id: "cs6-parsons",
      kind: "parsons",
      title: "Least privilege setup",
      prompt:
        "A new club volunteer needs access to one shared folder. Order a least-privilege grant.",
      languageLabel: "process",
      lines: [
        "Identify the minimum task they must complete",
        "Choose the smallest role or share permission that fits",
        "Grant access only to that folder/resource — not the whole drive",
        "Set an expiry or review date for the permission",
        "Remove or reduce access when the volunteer work ends",
      ],
      lineExplanations: [
        "Start by defining the minimum task so access decisions map to real work, not vague \"they might need stuff.\" If you skip this, you invent privileges before you know what is required.",
        "Choosing the smallest fitting role comes next so you translate the task into concrete permissions. Jumping to admin \"for convenience\" expands blast radius before the volunteer ever logs in.",
        "Scoping to one folder or resource — not the whole drive — limits what a mistake or stolen account can touch. Broad grants turn a small volunteer job into access to unrelated sensitive data.",
        "An expiry or review date prevents temporary help from becoming permanent privilege. Without a calendar reminder, forgotten access silently accumulates.",
        "Removal when the work ends closes the least-privilege loop. Leaving access \"just in case\" is how former helpers still reach systems long after they should.",
      ],
      explanation:
        "Least privilege means just enough, just in time, and removed when done — not \"admin forever for convenience.\"",
    },
    {
      id: "cs6-debug",
      kind: "debug",
      title: "Access control fail",
      prompt: "This admin habit keeps creating risk. What's wrong?",
      contentLabel: "Buggy habit",
      buggyContent:
        '"Everyone gets Domain Admin so tickets close faster. Shared \"god mode\" accounts are fine. Former students keep VPN access \"just in case.\" Guest Wi-Fi uses the same password as the staff file server."',
      choices: [
            "If the goal were something else, “Domain Admin for everyone improves audit trails” might work; for this check, it does not",
            "Former users should keep access indefinitely for nostalgia",
            "Over-privileged shared accounts and leftover access expand blast radius — use unique least privilege and timely revocation",
            "Guest and staff systems should always share one password",
          ],
      correctIndex: 2,
      hint: "If one account is stolen, how much can an attacker reach?",
      explanation:
        "Broad admin rights, shared credentials, and stale access turn small compromises into large incidents. Separate duties and revoke promptly.",
    },
    {
      id: "cs6-order",
      kind: "order",
      title: "Permission review order",
      prompt:
        "Put these access-review actions in a sensible quarterly order.",
      items: [
        { id: "export", label: "Export who has access to sensitive apps" },
        { id: "owners", label: "Confirm each access still has a business owner" },
        { id: "trim", label: "Remove unused and overly broad roles" },
        { id: "mfa", label: "Require MFA on remaining privileged accounts" },
        { id: "document", label: "Document exceptions and next review date" },
      ],
      itemExplanations: [
        "Exporting access first gives you a factual inventory of who can reach sensitive apps. If you trim or enforce MFA without a list, you are guessing and will miss stale or hidden privileges.",
        "Confirming a business owner next makes someone responsible for each access remaining. Without owners, \"needed\" access becomes folklore and you cannot safely decide what to keep.",
        "Trimming unused and overly broad roles comes after ownership checks so you remove what nobody still needs. Cutting first without owners can delete legitimate access — or leave orphans you never question.",
        "Requiring MFA on remaining privileged accounts hardens what you intentionally kept. Doing MFA before trimming wastes effort on accounts you were about to remove, and skips protecting the survivors.",
        "Documenting exceptions and the next review date last creates accountability and a schedule. Skipping this means the cleaned access slowly drifts back into chaos before the next quarter.",
      ],
    },
  ],

  "cs-7": [
    {
      id: "cs7-parsons",
      kind: "parsons",
      title: "Evaluate a reliability redesign",
      prompt:
        "A school LAN keeps failing when one core switch dies. Reorder a defender's evaluation of reliability and scalability.",
      languageLabel: "process",
      lines: [
        "Map current topology (devices, switches, routers, servers, addressing)",
        "Identify single points of failure and bandwidth/load bottlenecks",
        "Compare redesign options (e.g., redundant star paths vs one long chain)",
        "Recommend a change that improves reliability without unnecessary cost",
        "Document addressing, owners, and how you'll verify after the change",
      ],
      lineExplanations: [
        "Mapping topology and addressing first establishes what actually exists — routers, switches, servers, and how devices are identified. Without that map, reliability advice is guesswork.",
        "Finding single points of failure and bandwidth/load bottlenecks comes next because CSTA-style evaluation asks where delay and outages concentrate. Skipping this step leads to buying gear that doesn't fix the real choke point.",
        "Comparing redesign options (redundant star paths vs a fragile chain) forces tradeoff thinking: cost, complexity, and fault tolerance. Jumping straight to \"buy more\" skips the compare step.",
        "Recommending one feasible change balances reliability gains against budget and manageability. Perfect lab diagrams that nobody can operate are not a high-school defender recommendation.",
        "Documenting addressing, owners, and verification closes the loop so the next outage is diagnosable. Unowned redesigns quietly become the next single point of failure.",
      ],
      explanation:
        "CSTA 3A-NI-04/3B-NI-03: evaluate routers, switches, topology, and addressing for scalability and reliability — then recommend a feasible fix.",
    },
    {
      id: "cs7-debug",
      kind: "debug",
      title: "Architecture misconception",
      prompt: "Spot the incorrect claim in this architecture study card.",
      contentLabel: "Buggy card",
      buggyContent:
        '"Switches and routers do the same job. MAC addresses route packets across the public internet. Star topology always fails harder than a single long chain. Bandwidth problems are identical to DNS failures. Private IPs like 192.168.x.x are globally unique."',
      choices: [
            "A common mix-up is to treat mAC addresses replace DNS worldwide as enough, which confuses a nearby idea with the right one",
            "Switches forward locally (often by MAC); routers connect networks by IP; topology and bandwidth differ from DNS; private IPs stay local",
            "A common mix-up is to treat routers never use IP addresses as enough, which confuses a nearby idea with the right one",
            "A rushed pass can land on bandwidth bottlenecks are always fixed by changing DNS resolvers”; careful readers reject it for this problem",
          ],
      correctIndex: 1,
      hint: "Which device connects networks vs which forwards inside a LAN — and what stays non-routable?",
      explanation:
        "Switches keep local traffic moving; routers choose paths between networks using IP. Topology and bandwidth/load affect reliability differently than DNS. Private IPs are not globally unique.",
    },
    {
      id: "cs7-scenario",
      kind: "scenario",
      title: "Topology & triage tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Club room redesign: one cheap switch feeds all devices; if it dies, everything fails. Users also report \"IP works, names fail.\" Which analysis comes first for the outage symptom?",
          choices: [
            {
              id: "dns",
              label: "Treat name-vs-IP symptom as DNS/resolver triage first",
              nextId: "dns-ok",
              tone: "best",
              feedback: "IP works, names fail → classic DNS — separate from the topology SPOF project.",
            },
            {
              id: "open-all",
              label: "Open every firewall port and ignore both DNS and topology",
              nextId: "open-end",
              tone: "risky",
              feedback: "Broad allows don't fix name lookup or single points of failure.",
            },
            {
              id: "ignore",
              label: "Tell users to live on raw IPs and keep the single-switch design forever",
              nextId: "ignore-end",
              tone: "risky",
              feedback: "Workarounds hide both DNS and reliability problems.",
            },
          ],
        },
        {
          id: "dns-ok",
          prompt: "DNS is fixed. Now recommend a topology change for the single-switch SPOF.",
          choices: [
            {
              id: "verify",
              label: "Recommend a redundant path / spare uplink where feasible; document and test failover",
              nextId: "success",
              tone: "best",
              feedback: "Compare options, pick a feasible reliability win, then verify.",
            },
            {
              id: "reboot",
              label: "Add random gear with no map, no owner, and no failover test",
              nextId: "reboot-end",
              tone: "risky",
              feedback: "Unevaluated purchases don't meet the recommend/justify standard.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Architecture + triage",
            body: "You separated DNS triage from topology reliability, then recommended a feasible redesign with verification. That's CSTA-level network evaluation.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "open-end",
          ending: {
            title: "Wrong levers",
            body: "Firewall sprawl fixes neither DNS nor a single point of failure. Diagnose the symptom, then redesign topology deliberately.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "ignore-end",
          ending: {
            title: "Two problems ignored",
            body: "Users need working DNS, and the club needs a topology that survives one device failure.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "reboot-end",
          ending: {
            title: "No evaluation",
            body: "Map, compare, recommend, document, verify — don't throw hardware at an unanalyzed design.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "cs-8": [
    {
      id: "cs8-parsons",
      kind: "parsons",
      title: "Firewall change checklist",
      prompt:
        "IT must open a service for a new classroom app. Order a careful firewall change.",
      languageLabel: "process",
      lines: [
        "Confirm business need and exact destination ports/protocols",
        "Draft a least-privilege rule (source, destination, port, time window)",
        "Test in a change window and watch allow/deny logs",
        "Document the rule owner and review date",
        "Remove or tighten the rule when the need ends",
      ],
      lineExplanations: [
        "Confirming need and exact ports/protocols first stops \"open whatever\" changes. If you draft a rule before you know the real requirement, you invent unnecessary attack surface.",
        "A least-privilege draft (source, destination, port, time) comes next so the change is specific. Broad allows are hard to walk back once something depends on them.",
        "Testing in a change window with log watch verifies the app works and shows unexpected allows or denies. Shipping untested rules can break class apps or silently open more than you intended.",
        "Documenting owner and review date assigns responsibility so the rule does not become orphaned. Unowned firewall holes are classic long-term exposure.",
        "Removing or tightening when the need ends completes the lifecycle. Leaving temporary opens forever turns a classroom exception into permanent internet risk.",
      ],
      explanation:
        "Firewall rules should be specific, logged, owned, and temporary when possible — not \"allow any any.\"",
    },
    {
      id: "cs8-debug",
      kind: "debug",
      title: "Port config bug",
      prompt: "This proposed rule set is unsafe. What's the core mistake?",
      contentLabel: "Buggy rules",
      buggyContent:
        "ALLOW any source → any destination on ports 1–65535\nDENY nothing\nComment: \"We'll lock it down later if something breaks.\"\nAdmin remote desktop exposed directly to the whole internet \"for convenience.\"",
      choices: [
            "A rushed pass can land on opening every port improves performance for learning”; careful readers reject it for this problem",
            "A common mix-up is to treat deny rules are never useful as enough, which confuses a nearby idea with the right one",
            "Overly broad allows and internet-exposed admin services create huge attack surface — restrict sources and close unused ports",
            "Remote admin should always be public without MFA or VPN — familiar wording, wrong fit for what the prompt is actually asking",
          ],
      correctIndex: 2,
      hint: "What would an outsider be able to reach?",
      explanation:
        "Default-deny and narrow allows protect better. Management interfaces belong behind VPN, MFA, and tight source limits — not the open internet.",
    },
    {
      id: "cs8-scenario",
      kind: "scenario",
      title: "Firewall posture tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "A server has no app that needs port 445 from the internet. A temporary test finished last month. Nobody owns the old allow rule. Default action?",
          choices: [
            {
              id: "deny",
              label: "Remove the allow — default deny for unused exposure",
              nextId: "deny-ok",
              tone: "best",
              feedback: "Unowned, unused internet allows should go.",
            },
            {
              id: "keep",
              label: "Leave it open forever in case someone needs it someday",
              nextId: "keep-end",
              tone: "risky",
              feedback: "\"Someday\" rules become permanent attack surface.",
            },
            {
              id: "any-any",
              label: "Replace it with allow any→any on all ports",
              nextId: "any-end",
              tone: "risky",
              feedback: "Broadening exposure is the opposite of hardening.",
            },
          ],
        },
        {
          id: "deny-ok",
          prompt: "Leadership asks how future temporary opens should work. Best policy?",
          choices: [
            {
              id: "owner",
              label: "Least-privilege rule with owner, expiry, and log review",
              nextId: "success",
              tone: "best",
              feedback: "Specific, owned, temporary rules stay under control.",
            },
            {
              id: "later",
              label: "Open wide now and \"lock it down later if something breaks\"",
              nextId: "later-end",
              tone: "risky",
              feedback: "Later rarely comes — start narrow.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Default deny wins",
            body: "You closed unused exposure and set owned, time-bound rules for the future. That's firewall hygiene.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "keep-end",
          ending: {
            title: "Stale allow",
            body: "Unused and unowned allows should be removed. Default deny is the safer posture.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "any-end",
          ending: {
            title: "Attack surface explosion",
            body: "Never \"fix\" a stale rule by opening everything. Close what you don't need.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "later-end",
          ending: {
            title: "Hope is not a control",
            body: "Write least-privilege rules with owners and expiry from day one.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "cs-9": [
    {
      id: "cs9-parsons",
      kind: "parsons",
      title: "Protect a secret in transit",
      prompt:
        "Reorder a simple mental model for protecting a message with modern crypto ideas.",
      languageLabel: "process",
      lines: [
        "Agree on or obtain trustworthy keys/certificates",
        "Encrypt the message so outsiders cannot read it",
        "Protect integrity so tampering is detectable",
        "Authenticate the other party so you know who you're talking to",
        "Store keys safely and rotate them when policy requires",
      ],
      lineExplanations: [
        "Trustworthy keys or certificates come first because encryption without trusted key material can protect you from nobody — or from the wrong party. If keys are fake or shared carelessly, later crypto steps fail open.",
        "Encrypting next provides confidentiality so eavesdroppers cannot read content in transit or at rest. Doing this before you have keys is impossible; doing it without integrity still leaves messages malleable.",
        "Integrity protection detects tampering so an altered ciphertext or plaintext cannot pass as authentic. Confidentiality alone does not stop an attacker from flipping bits or inserting data.",
        "Authenticating the other party confirms you are not encrypting to an impostor. Skipping this lets a middleperson present their own keys and read or alter what you thought was private.",
        "Safe storage and rotation keep long-term secrecy alive. Strong algorithms fail if yesterday's private key sits in chat history or never gets replaced after exposure.",
      ],
      explanation:
        "Crypto goals map to confidentiality, integrity, and authentication — plus careful key handling.",
    },
    {
      id: "cs9-debug",
      kind: "debug",
      title: "Crypto mix-up",
      prompt: "Find the false statement in this flashcard set.",
      contentLabel: "Buggy flashcards",
      buggyContent:
        '"Encryption hides content; hashing verifies unchanged data and is meant to be reversed with a public key. Sharing your private key in chat is fine. \"Crypto\" means you should invent your own algorithm for class projects in production."',
      choices: [
            "Hashes are one-way; never share private keys; use vetted algorithms — don't invent production crypto",
            "Encryption never hides content — familiar wording, wrong fit for what the prompt is actually asking",
            "Homemade ciphers are required by law",
            "Private keys should be posted publicly for transparency",
          ],
      correctIndex: 0,
      hint: "Which operations are one-way, and what must stay secret?",
      explanation:
        "Hashing is one-way. Private keys stay private. Real systems use well-reviewed cryptography, not DIY ciphers.",
    },
    {
      id: "cs9-scenario",
      kind: "scenario",
      title: "Crypto choice tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Goal: store a password verifier so the server cannot read the original password. Recovery of the plaintext is not needed. Which tool fits?",
          choices: [
            {
              id: "hash",
              label: "Use a slow salted password hash (one-way)",
              nextId: "hash-ok",
              tone: "best",
              feedback: "Password storage needs one-way hashing, not reversible encryption of the secret.",
            },
            {
              id: "encrypt",
              label: "Encrypt passwords so support can email them back in plaintext",
              nextId: "encrypt-end",
              tone: "risky",
              feedback: "Reversible storage means a key leak exposes every password.",
            },
            {
              id: "diy",
              label: "Invent a homemade cipher for class and ship it to production",
              nextId: "diy-end",
              tone: "risky",
              feedback: "Use vetted algorithms — don't invent production crypto.",
            },
          ],
        },
        {
          id: "hash-ok",
          prompt: "A teammate asks about keys. Best practice?",
          choices: [
            {
              id: "private",
              label: "Keep private keys private; rotate per policy; never paste them in chat",
              nextId: "success",
              tone: "best",
              feedback: "Key handling is as important as the algorithm.",
            },
            {
              id: "share",
              label: "Share the private key in group chat for \"transparency\"",
              nextId: "share-end",
              tone: "risky",
              feedback: "Private keys stay private — transparency doesn't mean leaking secrets.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Crypto fundamentals",
            body: "You picked salted hashing for passwords and protected keys. That's defender-grade crypto thinking.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "encrypt-end",
          ending: {
            title: "Wrong construction",
            body: "Password verifiers should be one-way. Support should reset — never email stored secrets.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "diy-end",
          ending: {
            title: "Homemade hazard",
            body: "Real systems use well-reviewed cryptography, not DIY ciphers.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "share-end",
          ending: {
            title: "Key compromise",
            body: "Anyone with the private key can impersonate you. Store and rotate keys safely.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "cs-10": [
    {
      id: "cs10-parsons",
      kind: "parsons",
      title: "HTTPS trust path",
      prompt:
        "Reorder how a browser roughly builds trust for an HTTPS site.",
      languageLabel: "process",
      lines: [
        "Browser connects and requests the site's certificate",
        "Certificate is checked against trusted certificate authorities",
        "Name on the certificate is matched to the site you requested",
        "Encrypted session keys are established for the connection",
        "Padlock/HTTPS indicates transport protection — not page honesty",
      ],
      lineExplanations: [
        "The browser must first request the site's certificate so it has identity material to evaluate. Without that step, there is nothing to validate about who claims to run the server.",
        "Checking against trusted CAs next answers whether a known authority vouched for that certificate. Skipping trust validation accepts self-signed or untrusted certs as if they were bank-grade.",
        "Name matching ensures the certificate belongs to the hostname you typed or clicked — not a lookalike. A trusted cert for the wrong name is still a mismatch you must stop on.",
        "Only after identity checks succeed do encrypted session keys protect the pipe. Encrypting to an unverified server would hide traffic from some eavesdroppers while still talking to the wrong host.",
        "Remembering that the padlock means transport protection — not honest content — prevents overtrust. Phishing sites can use valid HTTPS; domain and behavior still matter after the lock appears.",
      ],
      explanation:
        "HTTPS protects the pipe and helps verify the server identity via certificates — it does not mean the website content is truthful or safe.",
    },
    {
      id: "cs10-debug",
      kind: "debug",
      title: "Certificate myth",
      prompt: "This security tip is wrong. Spot the mistake.",
      contentLabel: "Buggy tip",
      buggyContent:
        '"If you see a padlock, the site cannot be phishing. Ignoring certificate warnings is smart when you\'re in a hurry. Self-signed certs on public banking sites are totally normal. HTTPS encrypts the URL so DNS and phishing domains no longer matter."',
      choices: [
            "Padlock ≠ honest site; heed cert warnings; public banks use proper CA certs; phishing domains can still use HTTPS",
            "It can seem like phishing is impossible on HTTPS, but that reading skips the distinction this question is testing",
            "Certificate warnings should always be ignored",
            "Picking “DNS no longer exists when HTTPS is on” is a common mix-up that confuses a nearby idea with the right one",
          ],
      correctIndex: 0,
      hint: "Can a lookalike domain also buy a certificate?",
      explanation:
        "Attackers can obtain certificates for domains they control. Warnings matter. Always check the real domain and never assume padlock = safe content.",
    },
    {
      id: "cs10-scenario",
      kind: "scenario",
      title: "HTTPS warning tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "You visit what you think is your bank. The browser warns about a certificate name mismatch. The URL shows a misspelled domain. What now?",
          choices: [
            {
              id: "stop",
              label: "Stop — don't continue; use a bookmark or typed official URL",
              nextId: "stop-ok",
              tone: "best",
              feedback: "Name mismatch + lookalike domain is a hard stop.",
            },
            {
              id: "click-through",
              label: "Click through the warning because you're in a hurry",
              nextId: "click-end",
              tone: "risky",
              feedback: "Certificate warnings protect you from wrong or untrusted sites.",
            },
            {
              id: "padlock",
              label: "Ignore the URL — any padlock means it can't be phishing",
              nextId: "padlock-end",
              tone: "risky",
              feedback: "Attackers can get certificates for domains they control.",
            },
          ],
        },
        {
          id: "stop-ok",
          prompt: "You're on the real bank site via bookmark. Friend asks what the padlock means. Best answer?",
          choices: [
            {
              id: "transport",
              label: "HTTPS protects the connection and helps verify server identity — not page honesty",
              nextId: "success",
              tone: "best",
              feedback: "Transport security ≠ trustworthy content.",
            },
            {
              id: "safe-content",
              label: "Padlock means every page is guaranteed truthful and safe to trust forever",
              nextId: "safe-end",
              tone: "risky",
              feedback: "Phishing sites can also use HTTPS.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Certificate sense",
            body: "You heeded the warning, avoided the lookalike, and understood what HTTPS does — and doesn't — guarantee.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "click-end",
          ending: {
            title: "Warning ignored",
            body: "Don't click through cert mismatches on banking sites. Go via a known-good URL.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "padlock-end",
          ending: {
            title: "Padlock myth",
            body: "Lookalike domains can still use HTTPS. Check the real name — warnings matter.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "safe-end",
          ending: {
            title: "Overtrust",
            body: "HTTPS secures the pipe. Always verify the domain and treat unexpected requests with caution.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "cs-11": [
    {
      id: "cs11-parsons",
      kind: "parsons",
      title: "Hardening routine",
      prompt:
        "Reorder a practical monthly hardening habit for a shared lab PC.",
      languageLabel: "process",
      lines: [
        "Inventory installed software and enabled services",
        "Apply OS and app patches from trusted update channels",
        "Disable or uninstall what isn't needed",
        "Confirm local firewall and secure configuration baselines",
        "Verify backups still restore before declaring the job done",
      ],
      lineExplanations: [
        "Inventory comes first so you know what is actually running on the lab PC. Patching or disabling blindly misses forgotten apps and leaves unknown services exposed.",
        "Patches from trusted channels next close known vulnerabilities on what you found. Delaying updates while you still have a clear inventory lets scanners hit public flaws you already could have fixed.",
        "Disabling or uninstalling unused software shrinks attack surface after systems are current. Removing first without inventory risks breaking needed tools; leaving everything after patching keeps extra doors open.",
        "Confirming firewall and secure baselines locks in defensive defaults once the software set is lean. Config drift undoes patching benefits if remote services or weak settings remain.",
        "Verifying restore proves recovery works before you call hardening complete. Untested backups fail during real incidents — the worst time to discover they do not restore.",
      ],
      explanation:
        "Know what's running, patch it, shrink the surface, confirm configs, and prove recovery works.",
    },
    {
      id: "cs11-debug",
      kind: "debug",
      title: "Patch delay excuse",
      prompt: "This ops note creates unnecessary risk. What's the bug?",
      contentLabel: "Buggy note",
      buggyContent:
        '"Critical security patches can wait six months so nothing breaks. Test environments are optional. Default admin passwords are fine on printers. Unused remote services should stay enabled \"for emergencies.\""',
      choices: [
            "Unused services improve security by distraction",
            "Prioritize timely testing and patching; change defaults; disable unused remote services",
            "Six-month delays are required for all critical fixes",
            "Printers never need passwords",
          ],
      correctIndex: 1,
      hint: "What do attackers automate against unpatched and default systems?",
      explanation:
        "Known vulnerabilities and default credentials are routinely scanned. Patch with a tested process, harden defaults, and turn off what you don't need.",
    },
    {
      id: "cs11-scenario",
      kind: "scenario",
      title: "Hardening decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "A new network camera arrives with a published default password. It will face the school VLAN. Vendor already released a security firmware update. First action?",
          choices: [
            {
              id: "harden",
              label: "Change the default password and apply the security firmware before broad exposure",
              nextId: "harden-ok",
              tone: "best",
              feedback: "Defaults are public knowledge — patch and repassword first.",
            },
            {
              id: "plug",
              label: "Plug it in on the VLAN immediately with factory defaults",
              nextId: "plug-end",
              tone: "risky",
              feedback: "Default credentials are routinely scanned and abused.",
            },
            {
              id: "delay",
              label: "Skip the firmware update for six months so \"nothing breaks\"",
              nextId: "delay-end",
              tone: "risky",
              feedback: "Known security fixes shouldn't wait half a year untested forever.",
            },
          ],
        },
        {
          id: "harden-ok",
          prompt: "Camera is updated with a unique password. Next hardening habit?",
          choices: [
            {
              id: "surface",
              label: "Disable unused remote services and confirm firewall/baseline settings",
              nextId: "success",
              tone: "best",
              feedback: "Shrink the attack surface after fixing defaults and patches.",
            },
            {
              id: "leave-remote",
              label: "Leave every remote service on \"for emergencies\" with no review",
              nextId: "remote-end",
              tone: "risky",
              feedback: "Unused remote services are free scanning targets.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Hardened before expose",
            body: "You fixed defaults, patched, and reduced unused services before trusting the device on the network.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "plug-end",
          ending: {
            title: "Default danger",
            body: "Change published defaults and apply vendor security updates before broad network exposure.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "delay-end",
          ending: {
            title: "Patch debt",
            body: "Test and apply critical security firmware promptly — attackers automate known flaws.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "remote-end",
          ending: {
            title: "Extra doors",
            body: "Turn off what you don't need. Emergencies get planned access — not forever-open services.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "cs-12": [
    {
      id: "cs12-parsons",
      kind: "parsons",
      title: "Incident response outline",
      prompt:
        "Reorder a high-level defender incident response flow.",
      languageLabel: "process",
      lines: [
        "Detect and triage the alert with available logs",
        "Contain the issue to limit spread (isolate host/account)",
        "Eradicate the cause with approved cleanup steps",
        "Recover systems and verify normal operations",
        "Document lessons learned and improve detections",
      ],
      lineExplanations: [
        "Detect and triage first so you understand whether the alert is real and how serious it is. Jumping to wipe or restore without triage can destroy evidence and miss the actual scope.",
        "Containment next limits blast radius — isolate a host or disable an account before deep cleanup. If you eradicate without containing, malware or attackers may keep spreading while you work.",
        "Eradication with approved steps removes the cause after spread is limited. Cleaning too early without containment, or too late without a plan, either fails to stop the threat or breaks systems randomly.",
        "Recovery restores service and verifies normal operations only after the cause is gone. Bringing systems back while the foothold remains invites immediate reinfection.",
        "Lessons learned and better detections last so the same alert pattern is caught faster next time. Skipping this turns every incident into a one-off fire drill with no lasting improvement.",
      ],
      explanation:
        "Classic IR rhythm: detect → contain → eradicate → recover → learn. Skipping containment often makes recovery harder.",
    },
    {
      id: "cs12-debug",
      kind: "debug",
      title: "Logging gap",
      prompt: "This monitoring plan will fail when needed. Spot why.",
      contentLabel: "Buggy plan",
      buggyContent:
        '"Turn logging off to save disk. Never sync clocks. Alerts go to a shared inbox nobody checks. After an incident, wipe evidence immediately so audits stay clean. Playbooks are unnecessary if you \"wing it.\""',
      choices: [
            "Keep useful logs, sync time, alert humans on-call, preserve evidence, follow playbooks",
            "Wiping evidence first always helps investigations",
            "Unsynchronized clocks improve correlation",
            "Empty alert inboxes reduce noise perfectly",
          ],
      correctIndex: 0,
      hint: "What do investigators need hours or days later?",
      explanation:
        "Logs with correct timestamps, watched alerts, evidence preservation, and playbooks turn chaos into a manageable response.",
    },
    {
      id: "cs12-scenario",
      kind: "scenario",
      title: "Alert decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Night alert: a student laptop shows many failed logins then one success from an unusual city. What first?",
          choices: [
            {
              id: "contain",
              label: "Disable/reset the account and notify the student via a known channel",
              nextId: "contain-ok",
              tone: "best",
              feedback: "Contain credential risk quickly, then investigate.",
            },
            {
              id: "ignore",
              label: "Ignore — failed logins are always harmless",
              nextId: "ignore-end",
              tone: "risky",
              feedback: "A success after failures can mean credential stuffing succeeded.",
            },
            {
              id: "tweet",
              label: "Post details publicly for \"transparency\"",
              nextId: "tweet-end",
              tone: "risky",
              feedback: "Don't broadcast account details; use internal IR channels.",
            },
          ],
        },
        {
          id: "contain-ok",
          prompt: "Account locked. Next best logging step?",
          choices: [
            {
              id: "review",
              label: "Review login, VPN, and MFA logs around the success time",
              nextId: "success",
              tone: "best",
              feedback: "Correlate time, source, and factors to confirm scope.",
            },
            {
              id: "wipe-logs",
              label: "Delete logs so the ticket looks smaller",
              nextId: "wipe-end",
              tone: "risky",
              feedback: "Preserving logs is required for learning and accountability.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Solid IR instincts",
            body: "You contained access, used known-good contact channels, and preserved logs for follow-up. That's defender-first incident handling.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "ignore-end",
          ending: {
            title: "Missed containment",
            body: "Unusual success after failures deserves triage. Start with account containment and log review.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "tweet-end",
          ending: {
            title: "Wrong channel",
            body: "Public posts can tip off attackers and leak personal data. Use official incident processes.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "wipe-end",
          ending: {
            title: "Evidence destroyed",
            body: "Without logs you can't scope impact or improve detections. Preserve first, clean up later under policy.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "cs-13": [
    {
      id: "cs13-parsons",
      kind: "parsons",
      title: "Secure a club web form (defender hygiene)",
      prompt:
        "A club site takes uploads and stores an API key in the front-end code. Reorder a defensive hardening sequence (no exploitation).",
      languageLabel: "process",
      lines: [
        "Inventory inputs, secrets, dependencies, and config exposure",
        "Validate and limit untrusted input; reject unexpected file types/sizes",
        "Move secrets server-side / into a vault — never ship them in client code",
        "Update dependencies and lock down misconfigured admin/debug defaults",
        "Add logging/alerts for abuse patterns and document owners for review",
      ],
      lineExplanations: [
        "Inventory first so you know which inputs, secrets, libraries, and configs can compromise the program (CSTA 3B-AP-18). Fixing blindly misses the real exposure.",
        "Validating untrusted input next reduces injection and malicious-upload risk before those requests become stored data or code paths.",
        "Moving secrets out of client code prevents anyone who views the page from stealing keys. Client-side \"hiding\" is not protection.",
        "Updating dependencies and closing debug/admin defaults removes known weak doors attackers already automate against.",
        "Logging, alerts, and owners make the fix durable — otherwise the next officer reintroduces the same program-security gaps.",
      ],
      explanation:
        "Program security for defenders: validate input, protect secrets, patch dependencies, fix misconfig — without teaching how to exploit.",
    },
    {
      id: "cs13-debug",
      kind: "debug",
      title: "Program-security fail",
      prompt: "This club app design has multiple security issues. What's the core fix?",
      contentLabel: "Buggy design notes",
      buggyContent:
        '"Ship the database password in the public JavaScript bundle. Accept any file upload with no size/type checks. Never update npm packages. Leave debug mode on in production so \"fixes are faster.\" To learn more, break into random sites and share exploit steps."',
      choices: [
            "A rushed pass can land on debug mode in production improves confidentiality”; careful readers reject it for this problem",
            "Client-side passwords are safer than server storage",
            "Picking “Unauthorized intrusion is required homework” is a common mix-up that confuses a nearby idea with the right one",
            "Protect secrets server-side, validate uploads, patch dependencies, disable prod debug; practice only in authorized labs",
          ],
      correctIndex: 3,
      hint: "Which issues let programs get compromised — and where are you allowed to practice?",
      explanation:
        "Insecure secret storage, missing input validation, stale dependencies, and prod misconfig are classic program-security failures. Learning stays in authorized labs.",
    },
    {
      id: "cs13-scenario",
      kind: "scenario",
      title: "Attack pattern + program control tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Incidents show reused VPN passwords AND a club app that embeds an API key in the browser. Logs also show impossible-travel logins after phishing. What should you prioritize first?",
          choices: [
            {
              id: "mfa",
              label: "Require MFA + unique passwords AND move the API key server-side / rotate it",
              nextId: "mfa-ok",
              tone: "best",
              feedback: "Identity controls blunt stuffing/phish; removing client secrets closes a program-security hole.",
            },
            {
              id: "offense",
              label: "Skip defense — practice breaking into random sites instead",
              nextId: "offense-end",
              tone: "risky",
              feedback: "Unauthorized probing is unethical; careers need strong defense and secure coding hygiene.",
            },
            {
              id: "ignore-logs",
              label: "Ignore travel anomalies and leave the key in JavaScript \"for convenience\"",
              nextId: "ignore-end",
              tone: "risky",
              feedback: "Both credential abuse and exposed secrets are high-impact, feasible fixes.",
            },
          ],
        },
        {
          id: "mfa-ok",
          prompt: "Controls are rolling out. How should students deepen related skills?",
          choices: [
            {
              id: "labs",
              label: "Authorized labs only — practice detection, secure config, and IR — not live exploitation",
              nextId: "success",
              tone: "best",
              feedback: "Study attack patterns to place controls; practice offense only in scoped labs.",
            },
            {
              id: "neighbor",
              label: "Scan a neighbor's router until you get a shell for \"homework\"",
              nextId: "neighbor-end",
              tone: "risky",
              feedback: "No permission = no testing. Stay in authorized ranges.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Patterns + program hygiene",
            body: "You tied credential abuse and insecure program design to concrete controls, and kept practice authorized. That's CSTA-aligned attack & program security.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "offense-end",
          ending: {
            title: "Wrong classroom",
            body: "Unauthorized intrusion isn't a study plan. Prioritize MFA, secret hygiene, monitoring, and permitted labs.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "ignore-end",
          ending: {
            title: "Two open doors",
            body: "Impossible travel after phishing and client-side secrets both deserve immediate, justified controls.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "neighbor-end",
          ending: {
            title: "Unauthorized access",
            body: "Practice only where you have permission. Defense and secure design are the career foundation.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "cs-14": [
    {
      id: "cs14-parsons",
      kind: "parsons",
      title: "Privacy-aware OSINT habit",
      prompt:
        "Reorder a responsible personal OSINT/privacy awareness checklist.",
      languageLabel: "process",
      lines: [
        "List what personal data you intentionally publish",
        "Search your name/handles on major public surfaces",
        "Tighten privacy settings and remove old sensitive posts",
        "Separate school, work, and personal identities where practical",
        "Think before posting locations, schedules, or IDs in the future",
      ],
      lineExplanations: [
        "Listing what you intentionally publish first builds awareness of your known footprint. Without that inventory, privacy cleanup is random and you miss accounts you still control.",
        "Searching your name and handles next reveals what others can already find — including forgotten profiles. If you only tighten settings on one app, leaked copies elsewhere still expose you.",
        "Tightening settings and removing sensitive posts comes after discovery so you fix what the search showed. Acting before you search leaves unknown public posts untouched.",
        "Separating school, work, and personal identities reduces cross-linking if one account is breached or doxxed. Mixing everything into one public persona makes each leak more damaging.",
        "Future posting habits last because ongoing oversharing undoes cleanup. Delaying location tags and stripping IDs keeps the reduced footprint from growing back.",
      ],
      explanation:
        "OSINT awareness for learners means reducing your own exposure — not stalking others or doxxing.",
    },
    {
      id: "cs14-debug",
      kind: "debug",
      title: "Privacy fail",
      prompt: "This social post plan leaks too much. Spot the core issue.",
      contentLabel: "Buggy post plan",
      buggyContent:
        '"Live-stream your house number, school ID, vacation dates while away, and badge barcodes. Accept every friend request. Reuse the same username/password everywhere so people \"know it\'s you.\""',
      choices: [
            "It can seem like badge barcodes are decorative only, but that reading skips the distinction this question is testing",
            "Vacation dates while away improve home security — familiar wording, wrong fit for what the prompt is actually asking",
            "If the goal were something else, “One password for all sites reduces phishing” might work; for this check, it does not",
            "Oversharing identity, location, and credentials enables stalking and account takeover — minimize and compartmentalize",
          ],
      correctIndex: 3,
      hint: "What could a stranger do with your address, schedule, and IDs?",
      explanation:
        "Public details become building blocks for social engineering and physical risk. Share less, use unique credentials, and vet connections.",
    },
    {
      id: "cs14-scenario",
      kind: "scenario",
      title: "Privacy decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "A student posts daily \"leaving practice now\" with live location tags. Their jersey shows a full name. Their bio lists homeroom and bus number. Biggest issue?",
          choices: [
            {
              id: "overshare",
              label: "Real-time location plus identifiers = oversharing / physical safety risk",
              nextId: "overshare-ok",
              tone: "best",
              feedback: "Public schedules and IDs become building blocks for targeting.",
            },
            {
              id: "more",
              label: "Add house number and vacation dates while away for \"engagement\"",
              nextId: "more-end",
              tone: "risky",
              feedback: "That multiplies stalking and burglary risk.",
            },
            {
              id: "dox",
              label: "Research classmates' home addresses and post a \"finder guide\"",
              nextId: "dox-end",
              tone: "risky",
              feedback: "OSINT for learners means reducing your own exposure — never doxxing others.",
            },
          ],
        },
        {
          id: "overshare-ok",
          prompt: "They want to stay social without leaking so much. Best habit?",
          choices: [
            {
              id: "delay",
              label: "Delay location posts, strip unnecessary IDs, tighten privacy settings",
              nextId: "success",
              tone: "best",
              feedback: "Share less, later, and with tighter audiences.",
            },
            {
              id: "reuse",
              label: "Reuse one username/password everywhere so people \"know it's you\"",
              nextId: "reuse-end",
              tone: "risky",
              feedback: "Credential reuse turns a social leak into account takeover.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Privacy-aware posting",
            body: "You spotted oversharing risk and chose delayed, minimized posts with stronger settings. That's responsible OSINT awareness.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "more-end",
          ending: {
            title: "Exposure increased",
            body: "Don't broadcast address and empty-home schedules. Minimize identifiers and live location.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "dox-end",
          ending: {
            title: "Harmful OSINT",
            body: "Looking up and publishing others' private details is unethical and unsafe. Focus on your own footprint.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "reuse-end",
          ending: {
            title: "Account risk stacked",
            body: "Unique passwords and careful posting both matter. Don't trade privacy wins for credential reuse.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "cs-15": [
    {
      id: "cs15-parsons",
      kind: "parsons",
      title: "Justify a control selection",
      prompt:
        "Reorder how you recommend and justify controls for a school club website (CSTA 3A-NI-06/08).",
      languageLabel: "process",
      lines: [
        "Identify assets (site, member data, admin accounts)",
        "List threats and vulnerabilities that could affect them",
        "Estimate likelihood and impact for top scenarios",
        "Compare control options by efficiency, feasibility, usability, and ethics",
        "Recommend top controls, assign owners, and schedule residual-risk review",
      ],
      lineExplanations: [
        "Identifying assets first answers what you are protecting — the site, member data, admin accounts. Threat lists without assets become abstract fear instead of focused defense.",
        "Listing threats and vulnerabilities next connects those assets to realistic ways they can be harmed. Skipping this jumps straight to random controls that may not match your actual weak points.",
        "Estimating likelihood and impact ranks which scenarios hurt most if they happen. Without prioritization, you either freeze or spend on low-value fixes while high-impact risks wait.",
        "Comparing options by efficiency, feasibility, usability, and ethics is the CSTA recommend/tradeoff step — not every strong control is operable for a club.",
        "Recommending with owners and a residual-risk review makes acceptance or leftover risk explicit and revisitable.",
      ],
      explanation:
        "Risk work is prioritize, compare tradeoffs, recommend, and revisit — not \"eliminate every theoretical danger forever.\"",
    },
    {
      id: "cs15-debug",
      kind: "debug",
      title: "Control selection bug",
      prompt: "This risk plan fails the recommend/justify standard. What's wrong?",
      contentLabel: "Buggy plan",
      buggyContent:
        '"Ignore high-impact risks because they\'re unlikely this week. Spend the whole budget on stickers instead of MFA for admins. Pick the \"most secure\" lockdown even if advisors can\'t run meetings. Accept residual risk silently with no owner. Never explain usability or ethics tradeoffs."',
      choices: [
            "Prioritize high impact, fund feasible controls, justify usability/ethics tradeoffs, assign owners, review residual risk",
            "Some learners answer “Risk acceptance needs no documentation”, yet that does not match the precise idea from the lesson",
            "Stickers are a primary technical control for admin accounts",
            "Maximum lockdown with no usability analysis is always best",
          ],
      correctIndex: 0,
      hint: "CSTA asks you to recommend measures and explain tradeoffs — not just pick the strictest option.",
      explanation:
        "Good risk management balances likelihood and impact, compares feasible controls, records acceptance, and rechecks residual risk with clear owners.",
    },
    {
      id: "cs15-match",
      kind: "match",
      title: "Control types",
      prompt: "Match each control example to its usual category.",
      pairs: [
        {
          id: "prevent",
          left: "Preventive",
          right: "MFA required before admin login succeeds",
        },
        {
          id: "detect",
          left: "Detective",
          right: "Alert when a new admin account is created",
        },
        {
          id: "correct",
          left: "Corrective",
          right: "Isolate a host and restore from backup after malware",
        },
        {
          id: "admin",
          left: "Administrative",
          right: "Written policy for who may approve access requests",
        },
      ],
    },
  ],

  "cs-16": [
    {
      id: "cs16-parsons",
      kind: "parsons",
      title: "Defend & justify sequence",
      prompt:
        "Capstone: reorder a defense plan you could justify to a club sponsor (tradeoffs included).",
      languageLabel: "process",
      lines: [
        "Define assets, users, worst-case impacts, and constraints (budget/people)",
        "Recommend identity controls first (unique creds, MFA, least privilege) and justify why",
        "Harden exposure (patch, firewall defaults) noting usability/availability tradeoffs",
        "Enable logging/alerts and draft a short IR playbook with roles",
        "Test backups/restore, record residual risk, and schedule a review date",
      ],
      lineExplanations: [
        "Constraints belong with assets because CSTA recommendations must be feasible — a perfect plan nobody can run fails the justify step.",
        "Identity-first recommendations usually win high impact × likelihood for small orgs; stating that rationale is the justification sponsors need.",
        "Hardening exposure comes next, with honest tradeoffs (e.g., locking a feature vs keeping a meeting tool available).",
        "Detection and IR roles turn prevention failures into managed events instead of midnight improvisation.",
        "Tested recovery plus residual-risk review shows you know what remains accepted — not a pretend zero-risk claim.",
      ],
      explanation:
        "Capstone quality = recommend a few high-impact controls and justify them with feasibility, usability, and ethics tradeoffs.",
    },
    {
      id: "cs16-debug",
      kind: "debug",
      title: "Capstone plan review",
      prompt: "This defense plan looks busy but cannot be justified. Spot the flaw.",
      contentLabel: "Buggy plan",
      buggyContent:
        '"Skip backups to save money. No MFA — passwords are enough. Open all ports for \"flexibility.\" No logging. Never explain tradeoffs to the sponsor. If breached, pay any ransom immediately and keep it secret from IT leadership."',
      choices: [
            "It can seem like leadership should never hear about incidents, but that reading skips the distinction this question is testing",
            "Include MFA, least exposure, logging, tested backups, transparent IR — and justify tradeoffs; never treat silent ransom as strategy",
            "It can seem like open ports are a substitute for patching, but that reading skips the distinction this question is testing",
            "Skipping justification is fine if the list of controls is long — familiar wording, wrong fit for what the prompt is actually asking",
          ],
      correctIndex: 1,
      hint: "Can you defend each choice with impact, feasibility, and ethics — not just list tools?",
      explanation:
        "Capstone-quality defense prioritizes MFA, least privilege, patching, logging, tested backups, honest escalation — and explains the tradeoffs.",
    },
    {
      id: "cs16-scenario",
      kind: "scenario",
      title: "Capstone justify tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Club site stores member emails. Admin login is a shared password with no MFA. Backups restore OK, firewall is default-deny, logging is on. The sponsor asks what to fix first and why.",
          choices: [
            {
              id: "identity",
              label: "Unique admin accounts + MFA — highest impact, feasible, small usability cost",
              nextId: "identity-ok",
              tone: "best",
              feedback: "You prioritized and justified: identity gaps beat healthy backups when admins are shared and MFA-free.",
            },
            {
              id: "ports",
              label: "Open all firewall ports for \"flexibility\" since other basics look fine",
              nextId: "ports-end",
              tone: "risky",
              feedback: "That undoes least exposure without justifying a real need.",
            },
            {
              id: "ransom",
              label: "Skip MFA and plan to pay any ransom secretly if breached",
              nextId: "ransom-end",
              tone: "risky",
              feedback: "Ransom secrecy isn't a defensible strategy — harden access and escalate incidents.",
            },
          ],
        },
        {
          id: "identity-ok",
          prompt: "Sponsor asks what residual risk remains after MFA. Best answer?",
          choices: [
            {
              id: "review",
              label: "Keep tested backups + watched logs; accept some residual risk with a review date",
              nextId: "success",
              tone: "best",
              feedback: "Honest residual risk + recovery/detection keeps the plan complete.",
            },
            {
              id: "cut-backup",
              label: "Claim zero residual risk and drop backups to save money",
              nextId: "backup-end",
              tone: "risky",
              feedback: "MFA reduces risk; zero-risk claims and dropped backups fail the justify test.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Justified capstone",
            body: "You recommended identity first with a clear why, kept recovery/detection, and owned residual risk. That's Defend & Justify.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "ports-end",
          ending: {
            title: "Wrong trade-off",
            body: "Shared MFA-free admin is the critical gap. Keep default-deny and harden identity — then justify the choice.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "ransom-end",
          ending: {
            title: "Plan A failed",
            body: "Don't rely on silent ransom payment. Unique admin accounts, MFA, logging, and honest IR come first.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "backup-end",
          ending: {
            title: "Recovery gap",
            body: "Identity hardening and tested backups work together. Keep both and state residual risk honestly.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],
};
