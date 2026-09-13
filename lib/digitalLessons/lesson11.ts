import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const digitalLesson11: AILessonConfig = {
  id: "dl-11",
  title: "11. Scams, Bad Files, and What To Do",
  goal: "Spot a fake message or a bad download, protect the accounts that matter, and pick a next step you can actually do.",
  xpReward: 550,
  badge: "Safety Habits",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/10",
  nextHref: "/learn/digital/12",
  instructorScript: `**Coach's note**
Today's lesson: **Scams, Bad Files, and What To Do**.

**Goal:** Spot a fake message or a bad download, protect the accounts that matter, and pick a next step you can actually do.

This is everyday awareness — fake messages, sketchy downloads, lock screens, and MFA. The Cybersecurity track is the place for deeper defense. Say that in plain words if a student wants the "how do they break in" version.

**How to facilitate**
1. Warm-up: show a fake "your aid is ready — sign in here" email (or describe one). Ask "What would you tap first — and what should you do instead?"
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway — pause, check another way, protect email first.
5. Artifact: students must submit the device security checklist before they can finish. It is saved on this device for review.

**Watch for:** blaming the person who clicked, or "I would just be more careful." Push them to a habit they can do this week — lock screen, unique password, MFA, or a backup.`,
  lessonModule: {
    durationLabel: "~25 min lesson",
    sections: [
      {
        id: "start",
        kicker: "Start here",
        title: "Most scams look ordinary",
        body: `A message that looks like financial aid. A download that looks like a movie. A password you reused on three sites. A family laptop left signed in.\n\nNone of that looks like a movie hack. It still can open an account or a folder you care about.\n\nYour job today is to spot the fake, protect the accounts that matter, and pick a next step you can actually do. Not to learn how to attack anything.`,
        image: "/images/lessons/dl-11.png",
        imageAlt: "A suspicious message beside a shield protecting account data",
        callout: { label: "How far this lesson goes", text: "Habits and decisions. If you want the deeper technical side, that is the Cybersecurity track." },
      },
      {
        id: "stakes",
        kicker: "What is at stake?",
        title: "It is not only \"the laptop\"",
        body: `**Sensitive data** is information that can hurt someone if it leaks: passwords, recovery codes, private messages, financial-aid forms, health notes, location, school records, contact lists.\n\nA stolen login can mean fraud, embarrassment, lost work, or trouble for people in your contacts.\n\nProtect people. The device is just the door.`,
      },
      {
        id: "malware",
        kicker: "Bad files",
        title: "Malware is software that works against you",
        body: `**Malware** is a program that harms you on purpose. It can break files, sneak information out, throw ads at you, or lock you out of your own stuff.\n\nIt often arrives as an unexpected attachment, a fake "free" download, a sketchy site, or an unofficial app store.\n\nIf that device holds saved passwords, school work, family photos, or private messages, one bad file is more than one file.`,
        image: "/images/lessons/dl-11-2.png",
        imageAlt: "A device protected from a harmful download",
      },
      {
        id: "phishing",
        kicker: "Fake messages",
        title: "Phishing is a lie that wants a click",
        body: `**Phishing** is a message that pretends to be a school, a bank, a boss, or a friend. It wants your password, a code, or a click on a bad link.\n\nWatch for rush ("do this now"), a weird sender address, a money ask, or "send the code we just texted you."\n\nPolished design does not make it safe. Open the real app or a bookmark you saved. Do not trust the link inside the message.`,
      },
      {
        id: "compare",
        kicker: "Put them side by side",
        title: "A fake message and a bad file are different",
        body: `Phishing needs you to believe it — type a password, send a code, click the link. Malware needs harmful software to run on the device. They can stack: the fake email leads to the bad download.\n\nDo not pile on the person who clicked. The message was built to work when you are tired or scared. Good habits make the safe move the easy one.`,
        checkIn: check(
          "A student gets a fake financial-aid email and a link to \"sign in.\" What is the main risk?",
          [
            "The school automatically deletes the account",
            "The laptop suddenly gets more storage",
            "The email proves the aid is approved",
            "They might type their password into a fake page",
          ],
          3,
          "The message is pretending to be someone you trust so it can take the login.",
        ),
      },
      {
        id: "habits",
        kicker: "Habits that help",
        title: "A few ordinary locks beat one perfect setting",
        body: `Use a different password for email than for games. A password manager helps. Turn on **multi-factor authentication (MFA)** — a second proof besides the password. Update the software. Keep a backup you can actually restore.\n\nDownload from the real store. Say no to extra app permissions you do not need. Check a weird request through a second channel — a saved number, a bookmark, a person you already know.\n\nOne lock is not enough. A few ordinary habits beat one fancy setting you will never use.`,
      },
      {
        id: "attachments",
        kicker: "Mystery files",
        title: "Do not open it. Check another way.",
        body: `An unexpected invoice. A "required form" from a name you kind of recognize. A movie file from a friend-of-a-friend.\n\nDo not open it. Do not forward the link. Do not poke at the file "to see."\n\nCheck the sender another way: the company's real site, a number you already have, a teacher you can ask in person. If it is real, they can send it again through the official path.`,
        checkIn: check(
          "An email you did not ask for has an invoice attached. What first?",
          [
            "Open it because it says overdue",
            "Forward it so friends can check it too",
            "Do not open it — confirm the sender another way",
            "Download it and inspect the file yourself",
          ],
          2,
          "A pause and a second check beat curiosity.",
        ),
      },
      {
        id: "ethics",
        kicker: "Respect people",
        title: "Do not \"fix\" safety by watching everyone",
        body: `Reading every student's private messages, or grabbing extra face or fingerprint data, can stop one risk and create a worse one: people get watched who did nothing wrong, and the ones with less power get watched more.\n\nUse the smallest step that actually helps. Say why you need the data. Limit who can see it. Give people a way to ask questions.\n\nSafety that only works by spying is not a good plan.`,
      },
      {
        id: "case",
        kicker: "Try it",
        title: "A shared laptop and a surprise \"invoice\"",
        body: `A family laptop is used for school, work, and health forms. An email arrives with an unexpected invoice attached.\n\nDo not open it. Check the sender another way — a saved number, the company's real site. Keep the device updated. Use separate logins if you can. Keep copies of the important files somewhere else.\n\nThat plan is cheap (you pause), doable (ordinary settings), and fair (it protects everyone who uses the machine).`,
        image: "/images/lessons/dl-11-3.png",
        imageAlt: "A shared laptop user independently verifying a suspicious attachment",
      },
      {
        id: "report",
        kicker: "If it already happened",
        title: "Pause. Do not make it bigger",
        body: `If something feels off: stop. Keep the message if you need it to report. Use the official report button or a teacher / trusted adult. Do not forward the link. Do not roast the person who clicked.\n\nIf an account might be taken over, use the service's real recovery steps and tell that service. Deeper incident work is for the Cybersecurity track or qualified help.`,
      },
      {
        id: "next-step",
        kicker: "Pick a next step",
        title: "If people cannot do it, it is not a plan",
        body: `Name the threat, what data is at risk, the step, what it buys you, and whether someone could actually live with it.\n\nAn authenticator app can be strong. A school still needs a backup path so a student without that phone is not locked out of email. If someone needs help turning MFA on, plan that help.\n\nExample: "Turn on MFA for school email. Keep recovery codes. Have a staffed help path so students without a phone this week are not locked out."`,
        checkIn: check(
          "Which plan protects accounts and still works for real students?",
          [
            "Tell people to be more careful",
            "Ban all online school work",
            "Watch every student's screen all day",
            "Use MFA on important accounts, offer a backup way in, and do not collect extra ID data you do not need",
          ],
          3,
          "It cuts risk, keeps people able to log in, and does not turn into extra watching.",
        ),
      },
      {
        id: "email-first",
        kicker: "Start here this week",
        title: "Protect email first",
        body: `Email, money, school, and recovery accounts unlock everything else. If time is short, lock those first. A game password can wait.\n\nLock the screen. Unique password. MFA. A backup you can restore. That is the stack.`,
      },
      {
        id: "support",
        kicker: "Help each other",
        title: "Make it safe to say \"I clicked\"",
        body: `People report faster when nobody mocks them. A clear report path and a calm adult keep the evidence and stop a small mistake from becoming a bigger one.`,
      },
      {
        id: "ready",
        kicker: "Remember this",
        title: "Spot it. Pause. Protect the accounts that matter.",
        body: `A fake message wants a click. A bad file wants to run. Pause and check another way.\n\nLock the screen. Unique passwords. MFA on email. A backup you can actually restore. Pick one next step you can do this week.\n\nWant the deeper technical version? That is the Cybersecurity track.`,
        checkIn: check(
          "What is the best first move on a surprise attachment?",
          [
            "Open it because it says urgent",
            "Forward it to the group chat",
            "Do not open it — check the sender another way",
            "Try to take the file apart yourself",
          ],
          2,
          "A pause and a second check beat curiosity.",
        ),
      },
    ],
  },
  bigIdeas: [
    "**Phishing** tricks a person. **Malware** is a harmful program. Both can reach private data.",
    "Stack ordinary habits: updates, unique passwords, **MFA**, backups, and checking a weird request another way.",
    "A good next step is one people can actually do — and it should not turn into watching everyone.",
  ],
  keyTerms: [
    { term: "Malware", definition: "Harmful software that can break files, lock you out, or steal data." },
    { term: "Phishing", definition: "A fake message that pretends to be someone you trust so you share a password, a code, or a click." },
    { term: "Sensitive data", definition: "Information that can hurt someone if it leaks — logins, location, health, money, school records." },
    { term: "Multi-factor authentication", definition: "A login that needs more than the password — a code, an app, or a key." },
    { term: "Backup", definition: "A copy you can get back if the device dies, a file is deleted, or ransomware locks it." },
    { term: "Shared device", definition: "A phone or laptop more than one person uses — so one person's click can affect everyone." },
  ],
  realWorld: "A fake aid email, a family laptop, and a reused password are everyday problems. Pause, check another way, and turn on MFA for email this week if you can.",
  quiz: [
    {
      id: "q1",
      question: "What can malware do to private files?",
      choices: [
        "It only changes the wallpaper",
        "It improves privacy settings",
        "It can lock, damage, or steal data on the device",
        "It always makes a backup for you",
      ],
      correctIndex: 2,
      explanation: "Malware can take files, lock them, or wreck them.",
    },
    {
      id: "q2",
      question: "How does phishing usually get your data?",
      choices: [
        "By making encryption stronger",
        "By fixing software",
        "By deleting ads",
        "By rushing you to type a password or click a bad link",
      ],
      correctIndex: 3,
      explanation: "It pretends to be trusted and puts you in a hurry.",
    },
    {
      id: "q3",
      question: "Why use unique passwords and MFA together?",
      choices: [
        "A stolen password is less likely to open the account by itself",
        "You never need a recovery path",
        "You can skip updates",
        "Phishing stops working",
      ],
      correctIndex: 0,
      explanation: "Two layers. One stolen secret is not the whole login.",
    },
    {
      id: "q4",
      question: "A school wants every student on an authenticator app. What should they check first?",
      choices: [
        "Whether passwords can be shared",
        "Whether they can skip safety entirely",
        "Whether students have a phone that works — and a backup way in",
        "Whether everyone likes the app logo",
      ],
      correctIndex: 2,
      explanation: "If people cannot do the step, it is not a real plan.",
    },
    {
      id: "q5",
      question: "Why can watching every student's screen all day be a problem?",
      choices: [
        "It is always free",
        "It stops every scam",
        "It can turn into extra watching you do not need",
        "It makes passwords shorter",
      ],
      correctIndex: 2,
      explanation: "Safety should not mean reading everyone's private life.",
    },
    {
      id: "q6",
      question: "What is a safe response to an unexpected attachment?",
      choices: [
        "Check the sender another way, and report it through the official path if it looks fake",
        "Open it in case it is urgent",
        "Forward it to everyone",
        "Try to take the file apart yourself",
      ],
      correctIndex: 0,
      explanation: "Do not open it, do not spread it, do not poke at it.",
    },
    {
      id: "q7",
      question: "If time is short, which accounts should you lock first?",
      choices: [
        "A game login you rarely use",
        "Email, money, school, and recovery accounts",
        "Every app equally, even if you skip MFA",
        "Only the ones with a pretty logo",
      ],
      correctIndex: 1,
      explanation: "Those accounts unlock everything else. Start there.",
    },
  ],
  artifact: {
    title: "Device security checklist",
    prompt: "Open **your phone or laptop** (or describe the one you use for school). Write a checklist of what is **on** vs **not yet** for: lock screen, unique password or passcode, MFA on email or school account, app or browser permissions you would revoke, and a backup or recovery path. Recommend **one next step** you can actually do this week — not a perfect lab setup.",
    placeholder: "Device: my phone. Lock screen: on. Email MFA: not yet — I will turn it on this weekend. Permissions: I would revoke always-on location for … Backup: … Next step: …",
    minChars: 100,
    rubric: [
      "Names a real device and at least three controls (lock, MFA, permissions, backup, or updates).",
      "Marks what is already true vs still open — not a generic list copied from the slides.",
      "Ends with one next step you can actually do and who it protects.",
    ],
  },
};
