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
        "Unauthorized access and public attack steps are unethical and often illegal — report privately with permission",
        "Public posts are always safer than telling IT",
        "Logging in as someone else is fine if you change the password back later",
        "Education goals automatically grant permission to test any system",
      ],
      correctIndex: 0,
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
        "C = keep data private; I = data stays accurate/unchanged; A = systems usable when needed; auth ≠ authorization",
        "Integrity only means antivirus is installed",
        "Availability means encrypting every file twice",
        "Authentication and authorization are the same word",
      ],
      correctIndex: 0,
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
        "Only Windows needs updates forever",
        "USB sticks automatically remove viruses on insert",
        "Scareware links are always from your school IT",
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
        "Urgency + secrecy + payment request = classic SE; verify in person/known channel and report",
        "Gift cards are the most secure way to pay schools",
        "Deleting threads always improves security",
        "Any email that mentions the principal is automatically real",
      ],
      correctIndex: 0,
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
        "Store salted hashes, not plaintext; hashing is one-way; MFA still matters for strong passwords",
        "Plaintext storage helps users remember passwords better",
        "Encryption and hashing are identical and always reversible",
        "MFA only works on gaming accounts",
      ],
      correctIndex: 0,
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
        "Over-privileged shared accounts and leftover access expand blast radius — use unique least privilege and timely revocation",
        "Domain Admin for everyone improves audit trails",
        "Former users should keep access indefinitely for nostalgia",
        "Guest and staff systems should always share one password",
      ],
      correctIndex: 0,
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
      title: "Packet path for defenders",
      prompt:
        "Reorder how a defender thinks about a typical client-to-server network path.",
      languageLabel: "process",
      lines: [
        "Device sends traffic from a source IP and port",
        "Local network gear (switch/AP/router) forwards toward the destination",
        "Traffic may cross firewalls and NAT boundaries",
        "Destination host receives on a listening service port",
        "Logs and monitors may record connection metadata along the path",
      ],
      lineExplanations: [
        "Defenders start at the source: a device sending from an IP and port is the \"who started talking\" clue. Without that origin, later logs cannot be tied to a host or process that initiated contact.",
        "Local forwarding comes next because packets must leave the LAN via switch, AP, or router before they reach anywhere else. Skipping this hop in your mental model hides where local monitoring and VLAN controls sit.",
        "Firewalls and NAT boundaries sit in the middle of many paths, so they are where allow/deny and address translation happen. If you ignore them, you misread why traffic was blocked, remapped, or never arrived.",
        "The destination listening port is where the intended service actually accepts the connection. Understanding this step tells defenders which app was targeted — not just that \"the network\" was used.",
        "Logs and monitors along the path matter last in this model because evidence is captured at each hop for later triage. If you only think about send/receive and forget telemetry, investigations have nothing to correlate.",
      ],
      explanation:
        "Defenders care about who talked to whom, on which ports, and what logs captured — not how to craft attacks.",
    },
    {
      id: "cs7-debug",
      kind: "debug",
      title: "Network misconception",
      prompt: "Spot the incorrect claim in this study card.",
      contentLabel: "Buggy card",
      buggyContent:
        '"Private IPs like 192.168.x.x are globally unique on the public internet. DNS only translates emails. A VPN automatically makes every website trustworthy. Ports are only used by attackers, never by normal apps."',
      choices: [
        "Private IPs are local; DNS maps names to addresses; VPNs don't certify site honesty; ports are normal for services",
        "DNS is only for printers",
        "Private IPs replace MAC addresses worldwide",
        "Legitimate apps never use ports",
      ],
      correctIndex: 0,
      hint: "What does a home router reuse that isn't routed on the public internet?",
      explanation:
        "Private ranges stay inside local networks. DNS resolves names. VPNs protect the tunnel, not the destination's trustworthiness. Everyday services listen on ports.",
    },
    {
      id: "cs7-scenario",
      kind: "scenario",
      title: "Network triage tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Users can open websites by IP but not by name. Firewall allows web traffic. Pings to 8.8.8.8 succeed. What do you check first?",
          choices: [
            {
              id: "dns",
              label: "DNS / name resolution settings and resolver reachability",
              nextId: "dns-ok",
              tone: "best",
              feedback: "IP works, names fail → classic DNS problem.",
            },
            {
              id: "open-all",
              label: "Open every firewall port \"just in case\"",
              nextId: "open-end",
              tone: "risky",
              feedback: "Broad allows don't fix name lookup and expand attack surface.",
            },
            {
              id: "ignore",
              label: "Tell users to only use raw IPs forever",
              nextId: "ignore-end",
              tone: "risky",
              feedback: "That's a workaround, not a fix — and IPs change.",
            },
          ],
        },
        {
          id: "dns-ok",
          prompt: "Resolver was misconfigured. Next defender habit?",
          choices: [
            {
              id: "verify",
              label: "Verify names resolve, document the fix, and watch DNS logs briefly",
              nextId: "success",
              tone: "best",
              feedback: "Confirm recovery and leave a trail for the next outage.",
            },
            {
              id: "reboot",
              label: "Reboot every server randomly without documenting anything",
              nextId: "reboot-end",
              tone: "risky",
              feedback: "Undocumented thrashing hides the real root cause.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "DNS nailed",
            body: "You matched symptoms to name resolution, fixed the resolver, and verified. Solid network triage.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "open-end",
          ending: {
            title: "Wrong layer",
            body: "Connectivity by IP already worked. Chase DNS before rewriting firewall policy.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "ignore-end",
          ending: {
            title: "Band-aid only",
            body: "Users need working DNS. Fix resolvers instead of living on raw IPs.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "reboot-end",
          ending: {
            title: "No learning loop",
            body: "Document and verify so the next DNS outage is faster to solve.",
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
        "Overly broad allows and internet-exposed admin services create huge attack surface — restrict sources and close unused ports",
        "Opening every port improves performance for learning",
        "Remote admin should always be public without MFA or VPN",
        "Deny rules are never useful",
      ],
      correctIndex: 0,
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
        "Encryption never hides content",
        "Private keys should be posted publicly for transparency",
        "Homemade ciphers are required by law",
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
        "Certificate warnings should always be ignored",
        "Phishing is impossible on HTTPS",
        "DNS no longer exists when HTTPS is on",
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
        "Prioritize timely testing and patching; change defaults; disable unused remote services",
        "Printers never need passwords",
        "Unused services improve security by distraction",
        "Six-month delays are required for all critical fixes",
      ],
      correctIndex: 0,
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
      title: "Defender view of an attack chain",
      prompt:
        "Reorder how defenders typically describe stages of a compromise (high level).",
      languageLabel: "process",
      lines: [
        "Initial access attempt is observed (phish, exposed service, stolen creds)",
        "Attacker tries to establish persistence or a foothold",
        "Privilege and lateral movement expand reach inside the environment",
        "Goal actions appear (data theft, disruption, ransomware prep)",
        "Defenders detect, contain, and eradicate using controls and IR",
      ],
      lineExplanations: [
        "Initial access is the entry stage defenders watch first — phish, exposed service, or stolen creds. Controls and detections at this stage stop many incidents before anything deeper happens.",
        "Persistence or foothold comes next in the chain as the attacker tries to stay after the first login or exploit. Understanding this stage helps place monitoring on new accounts, scheduled tasks, and unusual remote tools.",
        "Privilege escalation and lateral movement expand reach only after a foothold exists. Defenders prioritize least privilege and segmentation here because skipping those controls lets one compromised account become many.",
        "Goal actions (theft, disruption, ransomware prep) appear once the attacker has enough reach. Recognizing this late stage explains why earlier containment matters — waiting until impact starts is already expensive.",
        "Detection, containment, and eradication close the defender view: controls and IR interrupt the chain at whatever stage you catch it. Studying stages without this response focus would only describe harm, not how to stop it.",
      ],
      explanation:
        "Thinking in stages helps place detections and controls — without teaching how to run the attack.",
    },
    {
      id: "cs13-debug",
      kind: "debug",
      title: "Attack advice gone wrong",
      prompt: "This \"study guide\" crosses into unsafe territory. What's the fix?",
      contentLabel: "Buggy guide",
      buggyContent:
        '"To learn cybersecurity, practice breaking into random websites and sharing working exploit steps in class chat. Defense is boring — only offense matters. If a scan finds an open port on a neighbor\'s router, keep going until you get a shell."',
      choices: [
        "Practice only in authorized labs; focus on detection and response; never probe systems without permission",
        "Neighbor routers are fair game for homework",
        "Sharing live exploit steps is required for grades",
        "Defense skills are optional for cyber careers",
      ],
      correctIndex: 0,
      hint: "Where are you allowed to practice, and what is the class goal?",
      explanation:
        "Authorized ranges and labs only. Careers need strong defense: monitoring, hardening, IR — not unauthorized intrusion.",
    },
    {
      id: "cs13-scenario",
      kind: "scenario",
      title: "Attack-control tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Many incidents start with reused VPN passwords. Logs show successful logins from far-away places minutes apart. Help desk resets spike after phishing. Best control to prioritize?",
          choices: [
            {
              id: "mfa",
              label: "Require MFA (ideally phishing-resistant) plus unique passwords",
              nextId: "mfa-ok",
              tone: "best",
              feedback: "MFA blunts stuffing and many phishing follow-ons at the access layer.",
            },
            {
              id: "offense",
              label: "Skip defense — practice breaking into random sites instead",
              nextId: "offense-end",
              tone: "risky",
              feedback: "Unauthorized probing is unethical; careers need strong defense controls.",
            },
            {
              id: "ignore-logs",
              label: "Ignore impossible travel — far-away logins are always VPN noise",
              nextId: "ignore-end",
              tone: "risky",
              feedback: "Impossible travel after phish resets deserves triage and stronger auth.",
            },
          ],
        },
        {
          id: "mfa-ok",
          prompt: "MFA is rolling out. How should students practice related skills?",
          choices: [
            {
              id: "labs",
              label: "Use authorized labs only — focus on detection, hardening, and IR",
              nextId: "success",
              tone: "best",
              feedback: "Learn offense concepts in scoped labs; apply defense on real systems.",
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
            title: "Controls over chaos",
            body: "You mapped credential abuse to MFA and kept practice inside authorized labs. That's defender-first attack awareness.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "offense-end",
          ending: {
            title: "Wrong classroom",
            body: "Unauthorized intrusion isn't a study plan. Prioritize MFA, monitoring, and permitted labs.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "ignore-end",
          ending: {
            title: "Missed signal",
            body: "Far-away successes after phishing are a pattern for stronger authentication and review.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "neighbor-end",
          ending: {
            title: "Unauthorized access",
            body: "Practice only where you have permission. Defense skills are the career foundation.",
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
        "Oversharing identity, location, and credentials enables stalking and account takeover — minimize and compartmentalize",
        "Badge barcodes are decorative only",
        "Vacation dates while away improve home security",
        "One password for all sites reduces phishing",
      ],
      correctIndex: 0,
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
      title: "Risk assessment flow",
      prompt:
        "Reorder a simple risk assessment for a school club website.",
      languageLabel: "process",
      lines: [
        "Identify assets (site, member data, admin accounts)",
        "List threats and vulnerabilities that could affect them",
        "Estimate likelihood and impact for top scenarios",
        "Choose controls that reduce the highest risks first",
        "Revisit after changes or on a regular schedule",
      ],
      lineExplanations: [
        "Identifying assets first answers what you are protecting — the site, member data, admin accounts. Threat lists without assets become abstract fear instead of focused defense.",
        "Listing threats and vulnerabilities next connects those assets to realistic ways they can be harmed. Skipping this jumps straight to random controls that may not match your actual weak points.",
        "Estimating likelihood and impact ranks which scenarios hurt most if they happen. Without prioritization, you either freeze or spend on low-value fixes while high-impact risks wait.",
        "Choosing controls for the highest risks first spends limited time and budget where they matter. Controls chosen before ranking often look busy but leave the worst scenarios untreated.",
        "Revisiting after changes or on a schedule keeps residual risk honest. A one-time assessment goes stale when the site, members, or threats change.",
      ],
      explanation:
        "Risk work is prioritize-and-treat, not \"eliminate every theoretical danger forever.\"",
    },
    {
      id: "cs15-debug",
      kind: "debug",
      title: "Control selection bug",
      prompt: "This risk plan misuses controls. What's wrong?",
      contentLabel: "Buggy plan",
      buggyContent:
        '"Ignore high-impact risks because they\'re unlikely this week. Spend the whole budget on stickers instead of MFA for admins. Accept risk silently with no owner. Never review residual risk after a control is added."',
      choices: [
        "Prioritize high impact, fund meaningful controls, assign owners, and review residual risk",
        "Stickers are a primary technical control for admin accounts",
        "Risk acceptance needs no documentation",
        "Likelihood alone should erase impact from decisions",
      ],
      correctIndex: 0,
      hint: "Which risks hurt most if they happen — and who owns the leftover risk?",
      explanation:
        "Good risk management balances likelihood and impact, picks effective controls, records acceptance, and rechecks residual risk.",
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
      title: "Defense plan sequence",
      prompt:
        "Capstone: reorder a practical defense plan for a small school web app.",
      languageLabel: "process",
      lines: [
        "Define assets, users, and worst-case impacts",
        "Harden accounts: unique creds, MFA, least privilege",
        "Patch, reduce exposed services, and tighten firewall rules",
        "Enable logging/alerts and draft a short IR playbook",
        "Test backups/restore and schedule a risk review date",
      ],
      lineExplanations: [
        "Defining assets, users, and worst-case impacts first scopes the defense plan to what failure would actually hurt. Hardening without that map wastes effort on low-value systems while critical ones stay vague.",
        "Account hardening (unique creds, MFA, least privilege) comes next because stolen or shared logins are a top path into small web apps. Network fixes alone fail if admin passwords are weak or shared.",
        "Patching, reducing exposure, and tightening firewalls shrink how attackers reach the app after accounts are stronger. Opening this step before knowing assets can leave the wrong ports open on the wrong hosts.",
        "Logging, alerts, and a short IR playbook enable detection and response once preventive controls exist. Without telemetry and a plan, a breach becomes improvisation under pressure.",
        "Tested backups plus a scheduled risk review prove you can recover and that the plan will be revisited. Skipping restore tests or reviews leaves the capstone plan unfinished when ransomware or mistakes hit.",
      ],
      explanation:
        "A complete defense plan ties assets → preventive hardening → detection/IR → recovery → continuous review.",
    },
    {
      id: "cs16-debug",
      kind: "debug",
      title: "Capstone plan review",
      prompt: "This defense plan looks busy but misses the point. Spot the flaw.",
      contentLabel: "Buggy plan",
      buggyContent:
        '"Skip backups to save money. No MFA — passwords are enough. Open all ports for \"flexibility.\" No logging. If breached, pay any ransom immediately and keep it secret from IT leadership."',
      choices: [
        "Include backups, MFA, least exposure, logging, and transparent IR — never rely on silent ransom payment as strategy",
        "Open ports are a substitute for patching",
        "Leadership should never hear about incidents",
        "Backups are optional when ransomware exists",
      ],
      correctIndex: 0,
      hint: "Which basics stop or survive common incidents?",
      explanation:
        "Capstone-quality defense prioritizes MFA, least privilege, patching, logging, tested backups, and honest incident escalation — not secrecy and ransom as plan A.",
    },
    {
      id: "cs16-scenario",
      kind: "scenario",
      title: "Capstone priority tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Club site stores member emails. Admin login is a shared password with no MFA. Backups restore OK, firewall is default-deny, logging is on. Fix first?",
          choices: [
            {
              id: "identity",
              label: "Replace the shared admin password with unique accounts + MFA",
              nextId: "identity-ok",
              tone: "best",
              feedback: "Identity gaps trump healthy backups when admins are shared and MFA-free.",
            },
            {
              id: "ports",
              label: "Open all firewall ports for \"flexibility\" since other basics look fine",
              nextId: "ports-end",
              tone: "risky",
              feedback: "Don't undo least exposure to avoid fixing accounts.",
            },
            {
              id: "ransom",
              label: "Skip MFA and plan to pay any ransom secretly if breached",
              nextId: "ransom-end",
              tone: "risky",
              feedback: "Ransom secrecy isn't a defense strategy — harden access and escalate incidents.",
            },
          ],
        },
        {
          id: "identity-ok",
          prompt: "Admins now have unique MFA logins. What keeps the plan complete?",
          choices: [
            {
              id: "review",
              label: "Keep backups tested, logging watched, and schedule a risk review date",
              nextId: "success",
              tone: "best",
              feedback: "Capstone defense is continuous: prevent, detect, recover, review.",
            },
            {
              id: "cut-backup",
              label: "Drop backups to save money now that MFA exists",
              nextId: "backup-end",
              tone: "risky",
              feedback: "MFA reduces risk; tested backups still save you when something gets through.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Capstone priorities",
            body: "You fixed shared admin access first, kept MFA, and preserved logging/backups with a review cadence. Solid end-to-end defense plan.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "ports-end",
          ending: {
            title: "Wrong trade-off",
            body: "Shared MFA-free admin is the critical gap. Keep default-deny and harden identity.",
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
            body: "Identity hardening and tested backups work together. Keep both.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],
};
