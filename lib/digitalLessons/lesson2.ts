import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const digitalLesson2: AILessonConfig = {
  id: "dl-2",
  title: "2. Where Your Files Live",
  goal: "Decide whether a file should live on your device, in the cloud, or both — and how to name it, share it, and keep a real backup.",
  xpReward: 100,
  badge: "Storage Strategist",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/1",
  nextHref: "/learn/digital/3",
  instructorScript: `**Coach's note**
Today's lesson: **Where Your Files Live**.

**Goal:** Decide whether a file should live on your device, in the cloud, or both — and how to name it, share it, and keep a real backup.

**How to facilitate**
1. Warm-up: ask "If your laptop died tonight, which school file would you still have?" Keep it concrete. Do not start with storage models.
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway — on the device is fast and works offline; the cloud is easier to share; sync is not a backup.

**Watch for:** saying "it's in the cloud" like that means the file is safe. Push students to say local, cloud, sync, or backup.`,
  lessonModule: {
    durationLabel: "~25 min lesson",
    sections: [
      {
        id: "start",
        kicker: "Start here",
        title: "On the device, or in the cloud?",
        body: `A scholarship essay, a group-project video, and a first-job résumé do not need the same plan.\n\n**On your device** can be fast and work without Wi-Fi. **In the cloud** can be opened from another computer and shared with a counselor. Both can fail — in different ways.\n\nToday you pick a home for a real file: where it lives, who can open it, and what happens if the laptop dies.`,
        image: "/images/lessons/dl-2.png",
        imageAlt: "Files organized across a laptop and cloud storage",
        callout: { label: "The first question", text: "If this laptop died tonight, would you still have the file?" },
      },
      {
        id: "data",
        kicker: "Names and folders",
        title: "A messy folder loses the file you need",
        body: `A **file** holds the work. A **folder** (also called a directory) groups files. A **path** is the address: which folder, then which file.\n\nNames are not decoration. A teammate — or you, at 11 p.m. — has to find the right version. A college portal has to open the right format.\n\nUse a path people can read: \`Applications/State-U/essay-2026-04.pdf\`. Do not leave the only copy as \`final-final2\` in Downloads.`,
      },
      {
        id: "local",
        kicker: "Option 1",
        title: "On your device: fast, and it works offline",
        body: `**Local storage** means the file sits on a device you have — the Chromebook, a phone, a drive in your backpack.\n\nThat is useful on a bus with no Wi-Fi, for a huge video, or when you just need the file to open now. It is also gone if that device is lost, cracked, dead, or left at school.\n\nLocal is not a backup by itself. One copy on one laptop is one accident away from starting over.`,
        checkIn: check(
          "You are editing a large video on a bus with no Wi-Fi. What is the main win of saving it on the laptop?",
          [
            "Teammates can always open it",
            "You can keep working with no internet",
            "Nobody else could ever see it",
            "The laptop makes a backup by itself",
          ],
          1,
          "Local files can open offline. That does not mean they are shared or safe if the laptop dies.",
        ),
      },
      {
        id: "cloud",
        kicker: "Option 2",
        title: "In the cloud: other devices, other people",
        body: `**Cloud storage** means the file lives on a company's computers, and you reach it with an account and a network. Think Drive, OneDrive, iCloud.\n\nThat is how a counselor comments on your essay from a different computer. You get version history. If one laptop dies, the file can still be there.\n\nYou still need the account, the password, and usually Wi-Fi. "Cloud" does not mean free forever, private by default, or safe from a bad click.`,
        image: "/images/lessons/dl-2-2.png",
        imageAlt: "Devices accessing shared cloud files",
      },
      {
        id: "compare",
        kicker: "Compare",
        title: "Six questions before you save",
        body: `Ask the same six things every time.\n\n**Cost** — money and your time. **Speed** — how fast it opens. **Will it still be there** if something fails. **Who can open it. Who can see it. Is this the right version.**`,
        table: {
          columns: ["Compare", "On your device", "In the cloud"],
          values: [
            ["Speed", "Often fast on that device", "Depends on Wi-Fi and sync"],
            ["Who can open it", "Usually just this device", "People you give access, from more places"],
            ["If something fails", "One dead laptop can take the file", "Account, sync, or the service can fail"],
            ["Who can see it", "Whoever can pick up the device", "Depends on the share settings"],
          ],
          rowCount: 4,
        },
        checkIn: check(
          "Your group needs to edit one slide deck from school and from home. What is the best reason to put it in the cloud?",
          [
            "The people who need it can open the same file from more than one place",
            "The cloud is always free",
            "You do not need any share settings",
            "Nothing in the cloud can ever be seen by the wrong person",
          ],
          0,
          "A shared cloud file can be the one copy the group actually uses — if you set who can open it.",
        ),
      },
      {
        id: "integrity",
        kicker: "The right version",
        title: "The file can still be there — and still be wrong",
        body: `Chaos in a folder is how a team turns in last week's draft. The file exists. It is just not the complete, current one. That is what people mean by **integrity** — the right file, still usable.\n\nName files so people can find them. Agree who can edit. Use version history. Do not rename \`.docx\` to \`.pdf\` and call it a conversion. Export a real PDF, then open it and look.`,
      },
      {
        id: "sync",
        kicker: "Important split",
        title: "Sync is not a backup",
        body: `**Sync** keeps two places matched. Save on the laptop, it shows up in the cloud. Delete it in one place — it can disappear in the other. A bad edit can copy itself everywhere.\n\nA **backup** is a separate copy you can get back after a mistake. Version history can help. It does not last forever, and the rules change by app.\n\nFor a scholarship packet or an internship portfolio, keep more than one independent copy. Then actually try opening the spare.`,
        checkIn: check(
          "Why is a synced folder a weak only backup for an internship portfolio?",
          [
            "A delete or a bad edit can show up in every synced copy",
            "Backups only count if you print them",
            "Cloud files can never be opened",
            "Sync always blocks deletes",
          ],
          0,
          "Sync copies the change — including the bad one. A backup is a spare you can still recover.",
        ),
      },
      {
        id: "privacy",
        kicker: "Sharing",
        title: "A share link is a storage choice",
        body: `When you make a link, you decide who can view, comment, or edit. That is part of where the file "lives."\n\n"Anyone with the link can edit" can be fine for a club flyer. It is a bad idea for a résumé with a phone number and an email.\n\nGive the least access that still gets the job done. Check the share settings before you send.`,
      },
      {
        id: "cost",
        kicker: "Cost",
        title: "Free can still cost you",
        body: `A free cloud plan may cap space, show ads, keep usage data, or make export a pain later. A fast local drive costs money and can fail.\n\nYour time is a cost too. A Downloads folder full of \`final-final\` is how people miss a deadline.\n\nLook at the whole bill: money, time, and what you lose if it breaks.`,
      },
      {
        id: "case",
        kicker: "Case study",
        title: "A scholarship packet",
        body: `You need a private draft, a PDF the portal will take, comments from a counselor, and a spare copy before the deadline.\n\nA solid plan: a private cloud folder, counselor on **comment** only, a clearly named PDF export, version history on, plus a copy on a drive or a second account that does not sync with the first.\n\nEach piece does a job: share with one person, keep the right format, get the file back if you mess up.`,
        image: "/images/lessons/dl-2-3.png",
        imageAlt: "Application documents with version history",
      },
      {
        id: "recommend",
        kicker: "Pick a plan",
        title: "Match the plan to the risk",
        body: `A class handout you need for one day? A simple shared link can be enough.\nA group research folder? Name a source of truth and who can edit.\nTax forms, medical files, or anything with an ID number? Share as little as you can, lock the account, keep a backup that is not the same sync.\n\nThere is no one "best" place. There is a plan that fits this file.`,
        checkIn: check(
          "A résumé has a phone number and an email on it. Which plan is the smartest?",
          [
            "A private folder, only the people who need it, clear names, and a separate backup",
            "One unnamed file sitting in Downloads",
            "A public edit link so anyone can help",
            "Drop it in a group chat",
          ],
          0,
          "Limit who can open it, and keep a spare copy that is not the same sync.",
        ),
      },
      {
        id: "practice",
        kicker: "Before you save",
        title: "Ask these six things",
        body: `Who needs this file? How fast does it have to open? Do you need it offline? What does this cost — money or time? What happens if the device, the account, or the service dies? How will you know this is the right version?\n\nAnswer those. Then pick local, cloud, or both. Do not pick from a slogan.`,
      },
      {
        id: "impact",
        kicker: "Why it matters",
        title: "Not everyone has the same Wi-Fi",
        body: `A cloud-only assignment is a different night for a student with spotty home internet than for a student who is always online. A school or a first job that requires one tool can shut people out — extra cost, no access, or a privacy problem.\n\nWhen you pick a home for a file, notice who can actually reach it.`,
      },
      {
        id: "ready",
        kicker: "Remember this",
        title: "Pick a home. Keep a spare.",
        body: `**On the device** is often faster and works offline. **The cloud** is easier to share and to open from another computer. Name the file so people can find the right version. **Sync is not a backup.**`,
        checkIn: check(
          "What makes a storage plan actually useful?",
          [
            "It names the file, who needs it, and what happens if the laptop dies",
            "It is always the cheapest option",
            "It skips any backup",
            "It always uses the cloud",
          ],
          0,
          "A good plan fits the file you have — not a slogan.",
        ),
      },
    ],
  },
  bigIdeas: [
    "**On your device** is often fast and works offline. **In the cloud** is easier to share and to open from another computer.",
    "Name the file and set who can open it so people use the **right version**.",
    "**Sync** copies changes — including deletes. A **backup** is a separate copy you can get back.",
    "Pick a home based on this file: who needs it, and what happens if the laptop dies.",
  ],
  keyTerms: [
    { term: "Local storage", definition: "The file lives on a device you have — a laptop, phone, or drive." },
    { term: "Cloud storage", definition: "The file lives on a company's computers. You open it with an account and usually Wi-Fi." },
    { term: "Data integrity", definition: "The file is the right one: complete, usable, and not last week's draft." },
    { term: "Sync", definition: "Keeps copies matched. A delete or a bad edit can show up everywhere." },
    { term: "Backup", definition: "A separate copy you can recover after loss, a delete, or a bad edit." },
    { term: "Permission", definition: "A rule for who can view, comment, or edit." },
  ],
  realWorld: "A scholarship packet needs more than a place to save. It needs the right format, the right people, a way back if you mess up, and a plan before the deadline.",
  quiz: [
    {
      id: "q1",
      question: "You are editing a large video on a trip with weak Wi-Fi. Why save it on the laptop?",
      choices: [
        "It can stay available offline and open fast on that device",
        "Sharing with the group is automatic",
        "The whole group can edit it at once",
        "A dead laptop cannot lose the file",
      ],
      correctIndex: 0,
      explanation: "Local storage can work with no connection and handle a big file. It does not replace a backup.",
    },
    {
      id: "q2",
      question: "Why put a group project in the cloud?",
      choices: [
        "You can skip account security",
        "The people who need it can open the current file from more than one device",
        "The service can never go down",
        "Cloud storage is always free",
      ],
      correctIndex: 1,
      explanation: "The cloud helps a group share one file. You still need permissions and a connection.",
    },
    {
      id: "q3",
      question: "Why is sync not enough as the only backup?",
      choices: [
        "Sync cannot store documents",
        "A delete or a bad edit can copy itself to every synced place",
        "Sync only works on phones",
        "Sync is always slower",
      ],
      correctIndex: 1,
      explanation: "Sync mirrors the change. A backup is a spare that can survive the change.",
    },
    {
      id: "q4",
      question: "A portal wants a PDF. What keeps the file actually usable?",
      choices: [
        "Upload the first file you find",
        "Export a real PDF and open it to check",
        "Rename .docx to .pdf",
        "Change the folder color",
      ],
      correctIndex: 1,
      explanation: "Export makes a real PDF. Renaming only changes the label.",
    },
    {
      id: "q5",
      question: "A résumé has personal contact details. Who should be able to open it?",
      choices: [
        "Post it in a public class channel",
        "Only the people who need to review it — view or comment",
        "Anyone can comment",
        "Anyone with the link can edit",
      ],
      correctIndex: 1,
      explanation: "Give the least access that still gets the review done.",
    },
    {
      id: "q6",
      question: "What makes a storage plan strong?",
      choices: [
        "Every file lives in Downloads",
        "It matches who needs the file, how fast it must open, privacy, cost, and how you get it back",
        "It uses the newest app",
        "It relies on one copy",
      ],
      correctIndex: 1,
      explanation: "A strong plan fits this file — access, speed, privacy, and a real spare copy.",
    },
  ],
};
