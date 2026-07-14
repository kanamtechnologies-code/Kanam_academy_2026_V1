import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function noRunError(run: MiniRunResult): boolean {
  return !run.error;
}

function hasDictMemory(code: string): boolean {
  return (
    (/\b(npc_memory|hero|character|profile)\s*=\s*\{/.test(code) &&
      /["']name["']/.test(code) &&
      /["']role["']/.test(code)) ||
    (/\b\w+\s*=\s*\{/.test(code) && /["']name["']/.test(code) && /["']role["']/.test(code))
  );
}

function hasQuestList(code: string): boolean {
  return (
    /\b(quest_log|inventory|choices|log)\s*=\s*\[/.test(code) ||
    (/\b\w+\s*=\s*\[\s*\]/.test(code) && /\.append\s*\(/.test(code))
  );
}

function hasListAppend(code: string): boolean {
  return /\.append\s*\(/.test(code);
}

function hasRespondFn(code: string): boolean {
  return /\bdef\s+(respond|npc|adventure|guide|helper)\s*\(\s*[A-Za-z_]\w*\s*\)\s*:/.test(code);
}

function hasIfElifElse(code: string): boolean {
  return /\bif\s+/.test(code) && /\belif\s+/.test(code) && /\belse\s*:/.test(code);
}

function hasForLoop(code: string): boolean {
  return /\bfor\s+\w+\s+in\s+/.test(code);
}

function hasTestMessages(code: string): boolean {
  return (
    /\b(test_messages|messages|turns|player_texts)\s*=\s*\[/.test(code) ||
    (/\bfor\s+\w+\s+in\s+/.test(code) && /\.append\s*\(/.test(code))
  );
}

function hasSummaryPrint(code: string): boolean {
  return (
    /\bprint\s*\(.*(quest_log|inventory|choices|log)/.test(code) ||
    (code.match(/\bprint\s*\(/g) ?? []).length >= 3
  );
}

function usesStringJoin(code: string): boolean {
  return /\+\s*\w+|\w+\s*\+/.test(code) && /\bprint\s*\(/.test(code);
}

function projectValid(code: string, run: MiniRunResult): boolean {
  if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
  if (!hasDictMemory(code)) return false;
  if (!hasQuestList(code) || !hasListAppend(code)) return false;
  if (!hasRespondFn(code)) return false;
  if (!hasIfElifElse(code)) return false;
  if (!hasForLoop(code)) return false;
  if (!hasTestMessages(code) && !hasForLoop(code)) return false;
  if (!usesStringJoin(code)) return false;
  if (!hasSummaryPrint(code)) return false;
  return run.stdout.length >= 3;
}

const SOLUTION = `# Capstone: Quest Adventure Bot — your own rule-based AI
hero = {"name": "River", "role": "guide", "home": "Maple Grove"}
quest_log = []

def respond(player_input):
    text = player_input.lower()
    if "hello" in text or "hi" in text:
        print("Welcome, traveler! I am " + hero["name"] + ", your " + hero["role"] + ".")
        quest_log.append("greeted")
    elif "quest" in text or "mission" in text:
        print("Your quest: find the lost map near " + hero["home"] + ".")
        quest_log.append("quest given")
    elif "help" in text:
        print("Try saying hello, quest, or inventory.")
        quest_log.append("helped")
    else:
        print("I do not understand yet — ask for help.")
        quest_log.append("confused")

test_messages = ["hello", "quest", "banana", "help"]
for msg in test_messages:
    print("---")
    print("Player: " + msg)
    respond(msg)

print("Quest log:")
print(quest_log)
`;

export const lesson14: PythonLessonConfig = {
  id: "lesson-14",
  title: "14. Capstone: Quest Adventure Bot",
  goal: "Invent your own adventure, build a rule-based AI bot people can talk to, then play it live in Adventure mode — your final AI + Python product.",
  xpReward: 800,
  badge: "Quest Builder",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  prevHref: "/learn/13",
  nextHref: undefined,
  instructorScript:
    "**Coach's note — Capstone day (read this first)**\n\nThis is **not** five mini drills. You will **invent a story**, **code a rule-based AI**, and **let people play it**.\n\n**What you are building**\nA Quest Adventure Bot: a character with memory, rules for what players say, a quest log that grows, and a live chat demo in the **Adventure** tab.\n\n**Skills you will combine** (you already learned each one):\n• dictionary = who the bot is (`name`, `role`, plus one world fact)\n• list + `.append` = what happened (`quest_log`)\n• `def respond(player_input):` = the reusable AI brain\n• `if` / `elif` / `else` = story rules for keywords\n• `print(...)` + `+` = spoken replies\n• `for` + `test_messages` = quick Build tests\n\n**Exact workflow (about 60 minutes)**\n1. **Design (5–10 min)** — Write on paper or in comments: character name/role, one quest, 3 keywords, and what each keyword appends to the log.\n2. **Build (~30 min)** — Fill the scaffold. Press **Run & check** often. Watch the checklist turn green.\n3. **Adventure (~15 min)** — Switch to the Adventure tab. Chat at least **3 turns** (greeting, quest, nonsense or help).\n4. **Demo (~10 min)** — Hand the keyboard to a friend. Can they discover your quest without reading the code?\n\n**Build vs Adventure**\n• **Build** = you control a fixed `test_messages` list so every rule path is easy to debug.\n• **Adventure** = a real player types freely; the same `respond()` brain answers live.\n\n**Done means:** every checklist item is green, including 3+ live Adventure turns.",
  kidExplain: [
    {
      title: "This is a tiny AI product — not a worksheet",
      text: "Chatbots and game NPCs often start as rule systems: input → rules → memory → reply. You design that model. When someone plays Adventure mode, they are using your AI.",
    },
    {
      title: "Design the story before you type code",
      text: "Pick a character (not just River), one clear quest, and three keywords that unlock different replies. If the story is fuzzy, the code will feel random.",
    },
    {
      title: "Every rule does two jobs",
      text: "Inside each if/elif/else branch: (1) print what the bot says, and (2) quest_log.append(...) so the adventure remembers what happened.",
    },
    {
      title: "Build to prove it — Adventure to feel it",
      text: "Run & check proves the paths. Adventure is the product demo. Capstone is finished only after both.",
    },
  ],
  steps: [
    "Design: character (name + role + world fact), one quest, 3 keywords, and log labels for each keyword.",
    "Code hero = {...} and quest_log = [].",
    "Write def respond(player_input): with if / elif / else — each branch prints (use +) and appends.",
    "Add test_messages (include one nonsense string) and a for loop that calls respond(msg).",
    "Print the quest log summary, then Run & check until Build items are green.",
    "Open Adventure, play 3+ live turns, then demo for a friend.",
  ],
  cfu: [
    {
      question: "Why is your bot a kind of AI model even though you wrote the rules by hand?",
      answer:
        "An AI model maps inputs to outputs. Yours maps player messages to replies using rules and memory you designed — that is a rule-based model (the same idea behind many game NPCs and simple chatbots).",
    },
    {
      question: "What should happen inside EVERY if / elif / else branch?",
      answer:
        "Two things: print a reply the player can read, and quest_log.append(...) so the adventure remembers that this rule ran.",
    },
    {
      question: "Why keep both Build (test_messages) and Adventure (live chat)?",
      answer:
        "Build replays a fixed list so you can prove every path quickly. Adventure lets a human type freely — same respond() brain, used like a real product.",
    },
    {
      question: "What is the else branch for?",
      answer:
        "Unexpected messages. Real players type weird things. A kind, clear else reply (and a log label like \"confused\") keeps the bot safe and usable.",
    },
  ],
  tryThis: [
    "Demo: invite a classmate to play Adventure without telling them the keywords — can they discover the quest?",
    "Add a fourth keyword (like inventory) that prints the quest_log mid-adventure.",
    "Store a catchphrase in the dictionary and print it when the player says hello.",
    "Challenge: add a \"score\" number in the dictionary that goes up when the quest is given.",
  ],
  aiSafetyMoment:
    "You wrote the limits on purpose — that is responsible AI. Keep the quest friendly, don't store private real-world info about players, and always test weird messages (the else path). If someone plays your bot, they should feel safe and respected.",
  commandReference: [
    {
      command: 'hero = {"name": "...", "role": "...", "home": "..."}',
      summary: "Dictionary = character memory. Need at least name and role (add one world fact too).",
      example: 'hero = {"name": "Nova", "role": "space ranger", "home": "Orbit Station"}',
    },
    {
      command: "quest_log = []",
      summary: "Empty list that will store what happened, in order.",
      example: "quest_log = []",
    },
    {
      command: 'quest_log.append("greeted")',
      summary: "Add one event label each time a rule runs.",
      example: 'quest_log.append("quest given")',
    },
    {
      command: "def respond(player_input):",
      summary: "Your AI brain. Adventure mode calls this every time someone sends a message.",
      example: "def respond(player_input):",
    },
    {
      command: 'text = player_input.lower()',
      summary: "Make matching easier so Hello and HELLO both work.",
      example: 'if "hello" in text:',
    },
    {
      command: "if / elif / else",
      summary: "Need all three. First match wins. else handles nonsense.",
      example: 'elif "quest" in text:\n    print("...")\nelse:\n    print("...")',
    },
    {
      command: 'print("Hi, " + hero["name"])',
      summary: "Join text with + so replies use dictionary memory.",
      example: 'print("I am " + hero["name"] + ", your " + hero["role"] + ".")',
    },
    {
      command: "for msg in test_messages:",
      summary: "Build-only: replay several player lines in one Run.",
      example: 'test_messages = ["hello", "quest", "zzz"]',
    },
  ],
  project: {
    missionTitle: "Invent → Build → Adventure playtest",
    timeLabel: "~60 minute capstone",
    requirements: [
      {
        id: "req-dict",
        label: "1. hero dictionary with \"name\" and \"role\" (plus a world fact)",
        check: (code) => hasDictMemory(code),
      },
      {
        id: "req-list",
        label: "2. quest_log = [] and at least one .append(...) inside a rule",
        check: (code) => hasQuestList(code) && hasListAppend(code),
      },
      {
        id: "req-fn",
        label: "3. def respond(player_input):  — your bot brain",
        check: (code) => hasRespondFn(code),
      },
      {
        id: "req-rules",
        label: "4. if + elif + else inside respond (3 different paths)",
        check: (code) => hasIfElifElse(code),
      },
      {
        id: "req-join",
        label: "5. print a reply that joins text with + (use hero[...])",
        check: (code) => usesStringJoin(code),
      },
      {
        id: "req-loop",
        label: "6. test_messages list + for msg in test_messages: loop",
        check: (code) => hasForLoop(code) && hasTestMessages(code),
      },
      {
        id: "req-summary",
        label: "7. Build Run prints replies AND the quest log summary",
        check: (code, run) => hasSummaryPrint(code) && run.stdout.length >= 3,
      },
      {
        id: "req-play",
        label: "8. Adventure mode: send at least 3 live chat turns",
        check: () => false,
      },
    ],
  },
  lessonModule: {
    durationLabel: "~60 min capstone",
    sections: [
      {
        id: "intro",
        kicker: "Capstone day",
        title: "Ship your own adventure AI",
        body: `Week 8 Session 1 taught you an NPC brain. Today is Session 2 — the **big finish** of the AI + Python Starter Pack.\n\nYou will:\n1. **Invent** a short adventure (character + quest + keywords).\n2. **Build** a rule-based AI bot in Python.\n3. **Play** it live in **Adventure** mode — the same way a friend would use a product you made.\n\nThis is one project, not five mini drills. When someone can chat with your bot and discover your quest, you are done.`,
        image: "/images/lessons/py-6-pattern.png",
        imageAlt: "Adventure quest bot that players can talk to",
        callout: {
          label: "Definition of done",
          text: "All checklist items green — including **3+ live Adventure turns**. Build alone is not enough.",
        },
      },
      {
        id: "story",
        kicker: "Step 1 · Design (5–10 min)",
        title: "Fill this design sheet before you code",
        body: `Copy these prompts into comments at the top of your file (or write on paper). Do not skip this — fuzzy stories make messy code.\n\n**A. Character**\n• Name: ________\n• Role: ________ (guide, knight, camp counselor, space ranger, dragon librarian…)\n• One world fact: ________ (home, ship, forest, school…)\n\n**B. Quest (one sentence)**\n• The player must: ________\n\n**C. Three keywords → replies → log labels**\n1. Keyword \`________\` → bot says ________ → append \`"________"\`\n2. Keyword \`________\` → bot says ________ → append \`"________"\`\n3. Keyword \`________\` → bot says ________ → append \`"________"\`\n4. **else** (anything else) → kind fallback → append \`"confused"\` (or similar)\n\n**Starter idea (only if you are stuck):** River the guide; quest = find the lost map; keywords = hello / quest / help.`,
        bullets: [
          "Keywords should match your world (a space ranger might use \"mission\" instead of \"quest\").",
          "Log labels are short: \"greeted\", \"quest given\", \"helped\" — not full sentences.",
          "Include one nonsense test later (\"banana\", \"asdf\") so else gets proven.",
        ],
        callout: {
          label: "Hour plan",
          text: "5–10 min design → ~30 min Build + Run → ~15 min Adventure playtest → ~10 min polish + friend demo.",
        },
        checkIn: {
          prompt: "Why fill out the design sheet before writing any code?",
          choices: ["A clear character, quest, and keywords make the code you write next much easier to plan and debug", "It's required by Python and the program won't run otherwise", "It has no real effect on the code"],
          correctIndex: 0,
          explanation: "Fuzzy stories make messy code. Deciding your character, quest, and keywords up front means every if/elif branch has a clear job before you type it.",
        },
      },
      {
        id: "hook",
        kicker: "Real-world hook",
        title: "Game NPCs are rule-based bots, just like yours",
        body: `Every time a video game character says the same three lines no matter what you type, or a store's website chatbot answers "track my order" but gets confused by anything else, you're looking at a rule-based bot — exactly the kind you're building today. Keyword in, matching rule found, reply and memory update out.\n\nBig AI chat assistants are far more advanced, but the core loop — take input, match it against known patterns, respond, remember what happened — traces straight back to the simple \`if/elif/else\` structure you already know.`,
        callout: {
          label: "Why it matters",
          text: "You're not just doing a school exercise — you're building a miniature version of the same pattern that powers real customer-service bots and game characters.",
        },
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `A quick refresher on the vocabulary this capstone combines.`,
        bullets: [
          "**Rule-based AI** — a program that maps specific inputs to specific outputs using hand-written rules (if/elif/else), not machine learning.",
          "**Character memory** — a dictionary describing who your bot is (name, role, world facts).",
          "**Event log** — a list that grows every time something happens, recording the story so far.",
          "**Fallback (else)** — the catch-all reply for anything that doesn't match a known keyword.",
        ],
      },
      {
        id: "skills",
        kicker: "What you will combine",
        title: "Map each skill to a part of the bot",
        body: `You are not learning new syntax today — you are **integrating**:\n\n• **Dictionary** → \`hero\` remembers who the bot is.\n• **List + append** → \`quest_log\` remembers what happened.\n• **Function + parameter** → \`respond(player_input)\` is the brain Adventure will call.\n• **if / elif / else** → different keywords unlock different replies.\n• **print + \`+\`** → spoken sentences that use \`hero["name"]\` etc.\n• **for loop** → Build-only replay of \`test_messages\`.\n\nIf one piece feels rusty, use the **Python command guide** on the project tab while you build.`,
      },
      {
        id: "build-steps",
        kicker: "Step 2 · Build (~30 min)",
        title: "Code in this exact order",
        body: `Open **Capstone project → Build**. Work top to bottom. Run after each chunk.\n\n**1. Character dictionary**\nWrite \`hero = {"name": "...", "role": "...", "home": "..."}\` using your design sheet. Keys must include **name** and **role**.\n\n**2. Quest log**\nWrite \`quest_log = []\` — empty on purpose. It grows only when rules fire.\n\n**3. Bot brain**\nWrite:\n\`def respond(player_input):\`\nthen inside it:\n\`text = player_input.lower()\`\nthen **if / elif / else** using your keywords.\n\n**Inside every branch, do both:**\n1. \`print("..." + hero["name"] + "...")\` — a reply the player can read\n2. \`quest_log.append("...")\` — a short event label\n\n**4. Build tests**\n\`test_messages = ["keyword1", "keyword2", "nonsense", "keyword3"]\`\nthen:\n\`for msg in test_messages:\`\n    print the player line\n    \`respond(msg)\`\n\n**5. Summary**\n\`print("Quest log:")\`\n\`print(quest_log)\`\n\nPress **Run & check**. Fix anything red on the checklist before you open Adventure.`,
        callout: {
          label: "Common stuck points",
          text: "Forgot elif (need if AND elif AND else). Append outside the branch (indent under if). Empty test_messages list. Dictionary missing quotes around keys. Used PRINT instead of print.",
        },
        checkIn: {
          prompt: "What TWO things should happen inside every if/elif/else branch of respond()?",
          choices: ["Only a print() reply", "Both a print() reply AND a quest_log.append(...)", "Only a quest_log.append(...)"],
          correctIndex: 1,
          explanation: "Each branch needs to speak to the player (print) AND record that the rule fired (append) — skipping either one breaks the checklist.",
        },
      },
      {
        id: "scaffold",
        kicker: "Build shape",
        title: "Annotated example (customize everything)",
        body: `Study this shape, then rewrite it with **your** names and keywords. Do not submit a copy of River unless that is truly your story.`,
        code: `# 1) Who is the bot?
hero = {"name": "River", "role": "guide", "home": "Maple Grove"}
# 2) What happened so far?
quest_log = []

# 3) AI brain — Adventure will call this every turn
def respond(player_input):
    text = player_input.lower()
    if "hello" in text:
        print("Welcome! I am " + hero["name"] + ".")
        quest_log.append("greeted")
    elif "quest" in text:
        print("Find the map near " + hero["home"] + ".")
        quest_log.append("quest given")
    else:
        print("Ask for help if you are stuck.")
        quest_log.append("other")

# 4) Build-only tests (include nonsense for else)
test_messages = ["hello", "quest", "zzz"]
for msg in test_messages:
    print("Player: " + msg)
    respond(msg)

# 5) Summary
print(quest_log)`,
        codeCaption: "Replace River / hello / quest with your design sheet",
        output: `Player: hello
Welcome! I am River.
Player: quest
Find the map near Maple Grove.
Player: zzz
Ask for help if you are stuck.
['greeted', 'quest given', 'other']`,
        callout: {
          label: "Checklist tip",
          text: "After Run & check, read the numbered checklist on the left. Each item tells you exactly what is still missing.",
        },
      },
      {
        id: "test",
        kicker: "Prove it",
        title: "Before Adventure — pass this Build checklist",
        body: `Ask yourself after a successful Run:\n\n• Did the greeting keyword print a welcome that uses \`hero["name"]\`?\n• Did the quest keyword mention your world fact?\n• Did nonsense hit **else** with a kind reply?\n• Did \`quest_log\` grow once per turn?\n• Can you point to the line and say which rule ran for each test message?\n\nIf any answer is no, stay in Build. Adventure will only feel good when the brain is solid.`,
        bullets: [
          "Need if + elif + else (three paths minimum).",
          "Need string joining with + in at least one print.",
          "Need print(quest_log) (or similar) at the end.",
        ],
      },
      {
        id: "play",
        kicker: "Step 3 · Adventure (~15 min)",
        title: "Playtest like a real player",
        body: `When Build items 1–7 look good, open the **Adventure** tab.\n\n**Playtest script (do all of these):**\n1. Send a greeting keyword — does the bot introduce itself?\n2. Ask about the quest/mission — do you get a clear goal?\n3. Type nonsense (\`banana\`, \`asdf\`) — does else stay kind?\n4. Try help (or your third keyword).\n5. Watch the **quest log** under the chat — it should grow each turn.\n\nYou need **at least 3 live turns** for checklist item 8.\n\n**Then demo:** hand the keyboard to a friend. Do not tell them the keywords. If they can discover the quest, you shipped a mini AI product.`,
        callout: {
          label: "If Adventure says \"build first\"",
          text: "Your respond() function still needs if/elif/else. Go back to Build, finish the brain, Run & check, then return.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "Your bot doesn't \"understand\" anything",
        body: `It's easy to feel like your bot is actually understanding what players type, especially once it replies smoothly. It isn't. It's checking whether a specific substring (like \`"quest"\`) appears in the lowercased text, then running a pre-written reply. There's no comprehension — just pattern matching you designed by hand.\n\nThis matters for AI safety: knowing exactly *how* a system works (rules you wrote) versus assuming it "understands" is the difference between using AI responsibly and being fooled by it.`,
        checkIn: {
          prompt: 'Your bot replies well to "quest" but gets confused by "what\'s my mission?" What\'s actually happening?',
          choices: ["The bot understood the meaning but chose not to respond correctly", "Python is broken", "The exact keyword \"quest\" isn't in that sentence, so no if/elif branch matched, and else caught it"],
          correctIndex: 2,
          explanation: "Rule-based bots only match the literal keywords you coded. \"What's my mission?\" doesn't contain \"quest\", so it falls through to else — the bot isn't reasoning, it's pattern-matching.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Predict the log before you test it",
        body: `Suppose your \`test_messages\` list is \`["hello", "banana", "quest"]\` and your rules append \`"greeted"\`, \`"confused"\`, and \`"quest given"\` respectively. Before running it, predict exactly what \`quest_log\` will contain at the end — in order.`,
        checkIn: {
          prompt: 'With test_messages = ["hello", "banana", "quest"], what will quest_log look like at the end?',
          choices: ["[\"greeted\", \"confused\", \"quest given\"]", "[\"confused\", \"greeted\", \"quest given\"]", "[\"quest given\", \"confused\", \"greeted\"]"],
          correctIndex: 0,
          explanation: "append() adds to the list in the exact order respond() is called, which matches the order of test_messages: greeted, confused, quest given.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "One brain, two front doors",
        body: `Notice that \`respond(player_input)\` doesn't know or care whether it's being called from the Build \`for\` loop or from a real person typing in Adventure mode. Both are just calls to the same function with a string argument. This is a powerful idea: once you write a function correctly, it works no matter *where* the input comes from — a fixed test list, a live player, or eventually a webpage form.`,
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "Fixed tests vs. live play",
        body: `Build mode replays the same \`test_messages\` every single Run — perfectly repeatable, which makes debugging fast because you always know exactly what should happen. Adventure mode is the opposite: unpredictable human input, which is exactly what reveals gaps your fixed tests never would (like a player typing nothing at all, or something totally unexpected). Real products need both: repeatable tests to catch bugs, and real users to catch what tests miss.`,
        checkIn: {
          prompt: "Why do real products need both a fixed test list AND live human testing?",
          choices: ["Fixed tests are only for looks; only live testing matters", "Fixed tests are repeatable and catch known bugs fast; live testing reveals unpredictable gaps fixed tests can't anticipate", "Live testing is unnecessary once fixed tests pass"],
          correctIndex: 1,
          explanation: "Fixed tests give fast, repeatable bug-catching, while live human testing surfaces the unpredictable edge cases that a predetermined list can never fully cover.",
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Test the weird input on purpose",
        body: `Professional developers deliberately test the strangest inputs they can think of — empty strings, gibberish, emoji, all-caps — because that's where bugs hide. Your \`else\` branch and your \`"banana"\` test message are doing exactly this on a small scale. Keep this habit: whenever you build anything that takes user input, ask "what's the weirdest thing someone could type here?" and test it.`,
      },
      {
        id: "standards-connect",
        kicker: "Why this counts",
        title: "This capstone meets real CS standards",
        body: `**CSTA 3A-AP-13**: *Create prototypes that use algorithms to solve computational problems by leveraging prior knowledge and personal interests.*\n\n**CSTA 3A-AP-17**: *Decompose problems into smaller components through systematic analysis, using constructs such as procedures, modules, and/or objects.*\n\nYou designed your own character and quest (personal interest), broke the problem into a dictionary, a list, a function, and rules (decomposition), and combined them into one working prototype.`,
        callout: {
          label: "Standard",
          text: "CSTA 2017, Algorithms & Programming, Level 3A (grades 9–10): 3A-AP-13 and 3A-AP-17.",
        },
      },
      {
        id: "mini-case",
        kicker: "Real world",
        title: "Customer service bots start exactly like this",
        body: `Many real customer-service chat widgets begin life as a rule-based system almost identical to yours: a dictionary of business info, a list logging what the customer asked, a function matching keywords like "refund" or "shipping," and an else branch that hands off to a human. Companies scale up from there — but the core structure is the same one you just built.`,
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you play",
        body: `Let's confirm the capstone pattern is locked in.`,
        checkIn: {
          prompt: "What's the purpose of including a nonsense test message like \"banana\" in test_messages?",
          choices: ["It's just a joke and has no real purpose", "Python requires at least one nonsense string", "It proves your else branch works and handles unexpected input gracefully"],
          correctIndex: 2,
          explanation: "A nonsense message is the only way to prove your else branch actually runs and gives a kind, sensible fallback reply.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Start the capstone project",
        body: `You know the plan: **design → Build → Adventure → demo**.\n\nClick **Start the project**. Keep the checklist visible. Run often. When every item is green — including live play — you have completed the AI + Python Starter Pack.`,
        callout: {
          label: "Responsible AI",
          text: "You wrote the rules. Keep replies kind, keep memory fictional, and celebrate that humans — not magic — decide what the bot can do.",
        },
      },
    ],
  },
  exercises: [
    {
      id: "ex-capstone-project",
      kind: "scratch",
      title: "Quest Adventure Bot — invent, build, play",
      focusCommand: "capstone project",
      commandExplain:
        "Follow the numbered checklist. First invent your story (comments help). Then fill each section of the scaffold. Run & check until Build items are green. Finally open Adventure and send 3+ real messages.",
      goal: "Ship a playable rule-based adventure AI: dictionary memory, growing quest log, respond() with if/elif/else, Build tests, and a live Adventure demo.",
      starterCode: `# ============================================================
# CAPSTONE: Your Quest Adventure Bot (rule-based AI)
# ============================================================
# HOW TO FINISH
#   1) Fill the DESIGN comments below (2 minutes).
#   2) Replace every TODO with real code.
#   3) Press Run & check until checklist items 1–7 are green.
#   4) Open the Adventure tab and play 3+ live turns (8).
# ============================================================

# --- DESIGN SHEET (edit these comments) ---
# Character name / role / world fact:
# Quest in one sentence:
# Keyword 1 → reply idea → log label:
# Keyword 2 → reply idea → log label:
# Keyword 3 → reply idea → log label:
# else → kind fallback → log label: "confused"

# --- 1) CHARACTER MEMORY (dictionary) ---
# Need keys "name" and "role". Add one more fact (home, ship, forest...).
hero = {
    "name": "TODO_NAME",
    "role": "TODO_ROLE",
    "home": "TODO_WORLD_FACT"
}

# --- 2) ADVENTURE MEMORY (list) ---
# Starts empty. Grows when rules call .append(...)
quest_log = []

# --- 3) AI BRAIN (function + rules) ---
# Adventure mode calls respond(...) every time a player sends a chat message.
def respond(player_input):
    text = player_input.lower()

    # if: first keyword (greeting)
    if "TODO_KEYWORD_1" in text:
        print("TODO reply that uses " + hero["name"] + " and maybe " + hero["role"])
        quest_log.append("TODO_LOG_1")

    # elif: second keyword (quest / mission)
    elif "TODO_KEYWORD_2" in text:
        print("TODO quest hint that uses " + hero["home"])
        quest_log.append("TODO_LOG_2")

    # elif: third keyword (help / inventory / ...)
    elif "TODO_KEYWORD_3" in text:
        print("TODO helpful reply")
        quest_log.append("TODO_LOG_3")

    # else: anything unexpected (keep it kind)
    else:
        print("TODO kind fallback — ask them to try a keyword")
        quest_log.append("confused")

# --- 4) BUILD TESTS (fixed list so you can debug fast) ---
# Include your 3 keywords PLUS one nonsense string for else.
test_messages = ["TODO_KEYWORD_1", "TODO_KEYWORD_2", "banana", "TODO_KEYWORD_3"]

for msg in test_messages:
    print("---")
    print("Player: " + msg)
    respond(msg)

# --- 5) SUMMARY ---
print("Quest log:")
print(quest_log)
`,
      hint: "Replace TODO_NAME / TODO_KEYWORD_… with your design. Each if/elif/else branch needs print(...) AND quest_log.append(...). Use + to join hero[\"name\"] into a reply. After Build is green, open Adventure and chat 3+ times.",
      previewOutput: `---
Player: hello
Welcome, traveler! I am River, your guide.
---
Player: quest
Your quest: find the lost map near Maple Grove.
---
Player: banana
I do not understand yet — ask for help.
---
Player: help
Try saying hello, quest, or inventory.
Quest log:
['greeted', 'quest given', 'confused', 'helped']`,
      successMessage:
        "Capstone complete — you invented a story, built a rule-based AI, and let people play it live.",
      failureMessage:
        "Not done yet. Check the numbered list: finish Build items 1–7 with Run & check, then send 3+ messages in Adventure (8).",
      solutionCode: SOLUTION,
      validate: (code: string, run: MiniRunResult) => projectValid(code, run),
    },
  ],
};
