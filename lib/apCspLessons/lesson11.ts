import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson11: AILessonConfig = {
  id: "csp-11",
  title: "11. Computing Systems, Hardware/Software & Fault Tolerance",
  goal: "Explain how hardware and software cooperate, and how parallelism, distribution, and redundancy make systems fast and reliable.",
  xpReward: 550,
  badge: "Systems Scout",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/10",
  nextHref: "/learn/ap-csp-prep/12",
  instructorScript: `**Coach's note**
Today's lesson: **Computing Systems, Hardware/Software & Fault Tolerance**.

**Goal:** Explain how hardware and software cooperate, and how parallelism, distribution, and redundancy make systems fast and reliable.

**How to facilitate**
1. Warm-up: ask students what they already think about "The machines that run your algorithms".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Big Idea 4",
        title: "The machines that run your algorithms",
        image: "/images/lessons/dl-1.png",
        imageAlt: "Everyday devices representing computing system layers",
        body: `Big Idea 4 (Computing Systems & Networks) is 11–15% of the AP multiple-choice exam. A **computing system** is a group of computing devices and programs working together for a common purpose. This lesson covers the hardware/software partnership and how systems stay fast and reliable — before Lesson 12 dives into the Internet itself.`,
      },
      {
        id: "hardware-software",
        kicker: "Two halves",
        title: "Hardware and software",
        body: `**Hardware** is the physical components — CPU, memory, storage, input/output devices. **Software** is the set of programs and instructions that tell the hardware what to do.

| Layer | Examples |
| --- | --- |
| Hardware | CPU, RAM, disk, keyboard, network card |
| System software | Operating system, drivers |
| Application software | Browser, game, this lesson |

Neither works alone: software is useless without hardware to run it, and hardware is inert without software to direct it.`,
        code: `  APPLICATION software   browser, game, this lesson
  ------------------------------------------------
  SYSTEM software        operating system, drivers
  ------------------------------------------------
  HARDWARE               CPU, RAM, disk, keyboard
# software on top gives orders; hardware below does the work`,
        codeCaption: "The stack: apps on system software on physical hardware",
        checkIn: check(
          "Which is an example of software rather than hardware?",
          [
            "The CPU chip",
            "A web browser program",
            "A stick of RAM",
            "The keyboard",
          ],
          1,
          "A browser is a set of instructions (software); CPU, RAM, and keyboard are physical hardware.",
        ),
      },
      {
        id: "os",
        kicker: "Coordinator",
        title: "The operating system as manager",
        body: `The **operating system (OS)** is system software that manages hardware resources and provides services to applications: scheduling which program uses the CPU, allocating memory, and controlling access to files and devices.

This is abstraction again (Lessons 3, 9): your app says "save this file" without knowing which physical disk sectors are used. The OS hides that complexity behind a simple interface.`,
        code: `app: "save this file"        # simple request
        |
        v
   OPERATING SYSTEM           # manages the messy details:
        |   - which CPU turn?  - which memory?
        v   - which disk sectors?
   HARDWARE does it
# the app never learns the low-level details`,
        codeCaption: "The OS hides hardware details behind a simple interface",
      },
      {
        id: "cpu-instructions",
        kicker: "Execution",
        title: "How programs actually run",
        body: `The CPU executes simple instructions extremely fast, one after another. High-level code you write (Lessons 5–10) is translated — by a **compiler** or **interpreter** — into these low-level instructions the hardware understands.

Layers of abstraction stack up: your \`average(scores)\` call → language statements → machine instructions → electrical signals in transistors. Each layer lets you ignore the one below.`,
        code: `average(scores)            # what you write
      |  compiler/interpreter translates
      v
language statements
      v
machine instructions       # tiny steps the CPU runs
      v
electrical signals in transistors`,
        codeCaption: "Your code is translated down to signals the hardware runs",
      },
      {
        id: "sequential",
        kicker: "Speed",
        title: "Sequential vs. parallel computing",
        body: `**Sequential computing** performs operations one at a time, in order. **Parallel computing** splits a task into parts that run **at the same time** on multiple processors, then combines the results.

Parallel solutions can be much faster — but **not infinitely**, and the exam expects you to reason about *why* with numbers. The limit is the part of a task that **must stay sequential**: only the splittable part gets faster when you add processors; the sequential part costs the same no matter how many you add.

Work a concrete example. A job has a **2-second setup that must run sequentially**, plus **8 seconds of work that splits perfectly** across processors:

| Processors | Sequential part | Parallel part (8s ÷ N) | Total | Speedup |
| --- | --- | --- | --- | --- |
| 1 | 2s | 8s | **10s** | 1× |
| 2 | 2s | 4s | **6s** | 1.7× |
| 4 | 2s | 2s | **4s** | 2.5× |
| 8 | 2s | 1s | **3s** | 3.3× |
| ∞ | 2s | ~0s | **~2s** | **5× (max)** |

Notice the payoff *shrinks* as you add processors, and the total can **never drop below the 2-second sequential part** — so the speedup is capped at 10 ÷ 2 = **5×**, even with a million processors. This is the essence of **Amdahl's Law**: the sequential fraction bounds the maximum speedup. Real systems fall short of even these numbers because coordinating the processors adds its own **overhead**.`,
        code: `# Job = 2s sequential setup + 8s that splits perfectly
        seq   parallel(8/N)   total   speedup
1 proc:  2  +      8      =    10s     1x
2 proc:  2  +      4      =     6s     1.7x
4 proc:  2  +      2      =     4s     2.5x
8 proc:  2  +      1      =     3s     3.3x
inf   :  2  +     ~0      =    ~2s     5x  <- HARD CAP

# the 2s sequential part NEVER shrinks -> max speedup = 10/2 = 5`,
        codeCaption: "Amdahl: the sequential part caps speedup; here 5x no matter how many processors",
        output: "max speedup = 10s / 2s = 5x (the 2s sequential part is the bottleneck)",
        examples: [
          {
            caption: "Speedup = sequential time / parallel time",
            code: `# same job, 4 processors:
sequential_time = 10s
parallel_time   = 2 + (8/4) = 4s
speedup = 10 / 4 = 2.5   # not 4 - the setup didn't shrink`,
            output: "speedup = 2.5, not 4",
          },
        ],
        checkIn: check(
          "A task takes 12 seconds sequentially. Run in parallel it takes 4 seconds. What is the speedup?",
          ["3 (12 ÷ 4)", "4", "8", "12"],
          0,
          "Speedup = sequential time ÷ parallel time = 12 ÷ 4 = 3.",
        ),
      },
      {
        id: "distributed",
        kicker: "Scale out",
        title: "Distributed computing",
        body: `**Distributed computing** spreads a problem across **multiple physical devices**, often in different locations, coordinating over a **network**. It lets systems handle problems too big for one machine — like indexing the whole web or training large models.

Students often blur *parallel* and *distributed*. Keep them straight:

| | Parallel computing | Distributed computing |
| --- | --- | --- |
| Where the work runs | Multiple **processors in one machine** (or one tight cluster) | Multiple **separate devices**, often far apart |
| Communication | Fast — shared memory / internal bus | Over a **network** (slower, can drop messages) |
| Main goal | **Speed** — finish one task faster | **Scale** — handle work too big for one machine |
| Failure model | Whole machine tends to fail together | Machines fail **independently** |

They overlap — a distributed system's individual machines usually also run parallel code — but the distinguishing line is **one machine's many processors (parallel) vs. many networked devices (distributed).** Because distributed systems talk over a network, messages can be delayed or lost and machines can fail on their own, which is exactly what motivates **fault tolerance** next.`,
        code: `PARALLEL (speed, one machine):
   [ CPU1  CPU2  CPU3  CPU4 ]   same box, shared memory
        one task, split for SPEED

DISTRIBUTED (scale, many devices over a network):
 [PC1]---[PC2]---[PC3]---[PC4]  different machines, far apart
        one giant problem, split for SCALE
# parallel = many processors here; distributed = many devices out there`,
        codeCaption: "Parallel = many processors in one machine; distributed = many devices over a network",
        checkIn: check(
          "Indexing the entire web across thousands of machines in many data centers is an example of:",
          [
            "sequential computing",
            "distributed computing",
            "a single point of failure",
            "roundoff error",
          ],
          1,
          "Spreading one large problem across many physical devices is distributed computing.",
        ),
      },
      {
        id: "fault-tolerance",
        kicker: "Reliability",
        title: "Fault tolerance and redundancy",
        body: `**Fault tolerance** is a system's ability to keep working correctly even when parts fail. The key mechanism is **redundancy**: having backups or multiple paths so no single failure stops the system.

Examples:
- Storing copies of data on multiple drives, so one disk failure loses nothing.
- Multiple network routes between two points, so a broken cable reroutes traffic.

A system with a **single point of failure** — one component whose failure breaks everything — is *not* fault tolerant.`,
        code: `NOT fault tolerant (single point of failure):
   user -> [ one server ]  --X-->  DOWN for everyone

Fault tolerant (redundancy + failover):
   user -> [ server A ]  (fails)
        \\-> [ server B ]  --> still works!`,
        codeCaption: "Redundancy + failover = no single point of failure",
        callout: {
          label: "On the AP exam",
          text: "Fault tolerance comes from redundancy: duplicate components or multiple paths. A design with a single point of failure is the opposite of fault tolerant.",
        },
        checkIn: check(
          "What primarily makes a computing system fault tolerant?",
          [
            "Using the fastest possible CPU",
            "Redundancy — backups and multiple paths so one failure doesn't stop the system",
            "Deleting old data regularly",
            "Running everything on a single powerful server",
          ],
          1,
          "Redundancy provides alternatives when a component fails, which is the basis of fault tolerance.",
        ),
      },
      {
        id: "redundancy-internet",
        kicker: "Connect",
        title: "The Internet is built for fault tolerance",
        body: `The Internet was designed with **redundant routing**: if one path between two computers fails, data can travel a different route. There is no single master computer whose failure shuts it down.

This preview connects to Lesson 12 — the Internet's packet-based, multi-path design is a giant fault-tolerant distributed system, which is exactly why it scales and survives outages.`,
        code: `A ---- R1 ---- R2 ---- B      # normal path
       |       |
       R3 --- R4              # backup routers

# if R1--R2 cable breaks:
A ---- R1 -- R3 -- R4 -- B    # data reroutes, still arrives`,
        codeCaption: "The Internet reroutes around broken links (redundant paths)",
        callout: {
          label: "On the AP exam",
          text: "Given a network diagram, expect the question: 'Are A and B still connected if one link (or router) fails?' The answer is YES whenever at least one alternate path still joins them. More redundant paths = more link failures the network can survive while staying connected.",
        },
        checkIn: check(
          "In the diagram, the direct R1–R2 link fails. Can A still reach B?",
          [
            "No — one broken link disconnects them",
            "Yes — data reroutes through the backup path R1–R3–R4",
            "Only if A and B are on the same device",
            "Only if the data is compressed first",
          ],
          1,
          "Redundant routing means an alternate path (R1–R3–R4) keeps A and B connected after one link fails.",
        ),
      },
      {
        id: "cloud",
        kicker: "Modern systems",
        title: "Servers, clients, and the cloud",
        body: `Many systems follow a **client–server** model: your device (client) requests services from powerful remote computers (servers). "The cloud" is large-scale distributed server infrastructure you access over the network.

Cloud systems use redundancy across many machines and locations for fault tolerance and scale — combining the parallel, distributed, and fault-tolerant ideas from this lesson.`,
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Designing for reliability",
        body: `A school wants its grade portal to stay up even if a server fails. Options:
- **One server:** cheap, but a single point of failure — one crash means downtime.
- **Two servers with a backup:** if one fails, the other serves requests. Redundant, fault tolerant.
- **Data mirrored to two locations:** survives even a whole-site outage.

The fault-tolerant choices cost more but eliminate single points of failure — the trade-off (Lesson 13's impact themes) between cost and reliability.`,
        checkIn: check(
          "A website runs on exactly one server with no backups. This design:",
          [
            "is fully fault tolerant",
            "has a single point of failure and is not fault tolerant",
            "uses parallel computing",
            "cannot be accessed over the Internet",
          ],
          1,
          "One server with no redundancy is a single point of failure — the opposite of fault tolerant.",
        ),
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "You understand the machine",
        body: `You can explain how hardware and software cooperate through the OS, how parallel and distributed computing speed up and scale work (with limits), and how redundancy delivers fault tolerance by removing single points of failure.

Next you'll follow the data itself across the network: packets, protocols, DNS, HTTP/HTTPS, and latency — how the Internet actually moves your requests.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Find the single point of failure",
        body: `Describe a small system (a school network, a home setup). Identify one single point of failure and propose a redundant change that would make it more fault tolerant.`,
      },
    ],
  },
  bigIdeas: [
    "**Hardware** (physical parts) and **software** (instructions) are useless without each other; the OS manages resources between them.",
    "**Parallel computing** runs parts simultaneously for speedup, but sequential portions and overhead limit how much faster it gets.",
    "**Distributed computing** spreads work across many devices to handle problems too big for one machine.",
    "**Fault tolerance** comes from **redundancy**; a single point of failure means a system is not fault tolerant.",
  ],
  keyTerms: [
    { term: "Computing system", definition: "Devices and programs working together for a common purpose." },
    { term: "Hardware", definition: "The physical components of a computer, such as CPU, memory, and storage." },
    { term: "Software", definition: "The programs and instructions that direct hardware." },
    { term: "Parallel computing", definition: "Running parts of a task simultaneously on multiple processors for speedup." },
    { term: "Distributed computing", definition: "Spreading a problem across multiple physical devices." },
    { term: "Fault tolerance", definition: "A system's ability to keep working when parts fail, achieved through redundancy." },
  ],
  realWorld:
    "When a streaming service stays online during a data-center outage, redundant distributed servers are doing exactly what this lesson describes — no single point of failure.",
  quiz: [
    {
      id: "q1",
      question: "Which pair correctly matches hardware and software?",
      choices: [
            "A keyboard is software; a driver is hardware",
            "All of these are hardware” belongs to a different situation than the one in the question stem",
            "RAM is hardware; the operating system is software",
            "CPU is software; a browser is hardware",
          ],
      correctIndex: 2,
      explanation: "RAM is a physical component (hardware); the OS is a program (software).",
    },
    {
      id: "q2",
      question: "The operating system's main role is to:",
      choices: [
            "Replace the CPU” belongs to a different situation than the one in the question stem",
            "Sort lists efficiently” belongs to a different situation than the one in the question stem",
            "Store data losslessly” belongs to a different situation than the one in the question stem",
            "Manage hardware resources and provide services to applications",
          ],
      correctIndex: 3,
      explanation: "The OS schedules the CPU, allocates memory, and mediates access to devices.",
    },
    {
      id: "q3",
      question: "A job takes 20 seconds sequentially and 5 seconds in parallel. The speedup is:",
      choices: ["2", "4", "5", "15"],
      correctIndex: 1,
      explanation: "Speedup = 20 ÷ 5 = 4.",
    },
    {
      id: "q4",
      question: "Why can't adding more processors reduce a task's time without limit?",
      choices: [
            "Sequential portions and coordination overhead cap the speedup",
            "Processors slow down when there are many” belongs to a different situation than the one in the question stem",
            "Parallel computing is always slower” belongs to a different situation than the one in the question stem",
            "Hardware cannot run software in parallel” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation: "Parts that must run in order, plus overhead, bound the achievable speedup.",
    },
    {
      id: "q5",
      question: "Distributing a computation across many machines in different locations is:",
      choices: ["sequential computing", "distributed computing", "compression", "a heuristic"],
      correctIndex: 1,
      explanation: "Using multiple physical devices, often remote, is distributed computing.",
    },
    {
      id: "q6",
      question: "Storing copies of critical data on multiple drives is an example of:",
      choices: [
        "a single point of failure",
        "redundancy for fault tolerance",
        "lossy compression",
        "sequential computing",
      ],
      correctIndex: 1,
      explanation: "Duplicating data provides a backup if one drive fails — redundancy.",
    },
    {
      id: "q7",
      question: "Which system is LEAST fault tolerant?",
      choices: [
            "Data mirrored across three locations",
            "A network with multiple routing paths",
            "Servers with automatic failover” belongs to a different situation than the one in the question stem",
            "A service running on one server with no backup",
          ],
      correctIndex: 3,
      explanation: "A single server with no backup is a single point of failure.",
    },
    {
      id: "q8",
      question: "The Internet survives many local failures mainly because it:",
      choices: [
            "Has redundant routing so data can take alternate paths",
            "Uses lossy compression on all data” belongs to a different situation than the one in the question stem",
            "Runs on one central master computer” belongs to a different situation than the one in the question stem",
            "Sorts packets before sending” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation: "Multiple possible routes let data reroute around failures — built-in fault tolerance.",
    },
  ],
  reflection: {
    prompt:
      "AP questions reward reasoning about reliability trade-offs. Describe a system you rely on, one way it could fail, and how redundancy could make it fault tolerant — and what that would cost.",
    placeholder: "The system, a failure mode, and a redundancy-based fix with its trade-off…",
  },
};
