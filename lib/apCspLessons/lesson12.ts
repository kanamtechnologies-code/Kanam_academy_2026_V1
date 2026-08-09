import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson12: AILessonConfig = {
  id: "csp-12",
  title: "12. The Internet: Packets, Protocols, DNS & HTTP",
  goal: "Trace how data moves across the Internet using packets, IP/TCP, DNS, and HTTP/HTTPS, and reason about latency and bandwidth.",
  xpReward: 600,
  badge: "Network Navigator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/11",
  nextHref: "/learn/ap-csp-prep/13",
  instructorScript: `**Coach's note**
Today's lesson: **The Internet: Packets, Protocols, DNS & HTTP**.

**Goal:** Trace how data moves across the Internet using packets, IP/TCP, DNS, and HTTP/HTTPS, and reason about latency and bandwidth.

**How to facilitate**
1. Warm-up: ask students what they already think about "How a request becomes a webpage".
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
        title: "How a request becomes a webpage",
        image: "/images/lessons/dl-3.png",
        imageAlt: "Networks connecting devices to find information online",
        body: `When you type a URL and see a page, an astonishing amount happens in under a second. This lesson traces that journey: data broken into **packets**, addressed by **IP**, made reliable by **TCP**, with names resolved by **DNS**, and pages fetched via **HTTP/HTTPS** — all governed by agreed-upon **protocols**.`,
      },
      {
        id: "network-of-networks",
        kicker: "Definition",
        title: "The Internet vs. the Web",
        body: `The **Internet** is a global network of interconnected networks — the physical and logical infrastructure. The **World Wide Web** is one service *built on top of* the Internet: interlinked pages accessed via browsers.

Confusing them is a classic exam trap. Email, video calls, and app data all use the Internet without being "the Web." The Internet is the roads; the Web is one kind of traffic on them.`,
        checkIn: check(
          "Which statement correctly distinguishes the Internet from the World Wide Web?",
          [
            "They are two names for exactly the same thing",
            "The Internet is the global network infrastructure; the Web is one service (linked pages) built on it",
            "The Web is the hardware; the Internet is the software",
            "The Web is larger than the Internet",
          ],
          1,
          "The Internet is the underlying network; the Web is one application (hyperlinked pages) that runs on it.",
        ),
      },
      {
        id: "protocols",
        kicker: "Agreements",
        title: "Protocols: shared rules",
        body: `A **protocol** is an agreed-upon set of rules for how devices communicate. Because everyone follows the same protocols, devices from different makers interoperate.

Key protocols you must know:
- **IP** (Internet Protocol) — addressing and routing packets to destinations.
- **TCP** — reliable, ordered delivery (retransmits lost packets).
- **DNS** — translates domain names to IP addresses.
- **HTTP/HTTPS** — rules for requesting and delivering web content.

Open, standard protocols are what let the Internet **scale** to billions of devices.`,
        code: `HTTP / HTTPS   request web pages   (what)
     |
TCP            reliable, in-order  (retransmit losses)
     |
IP             addressing/routing  (deliver to address)
     |
(DNS looks up the name -> IP before any of this)`,
        codeCaption: "Protocols stack: each layer does one job, built on the one below",
      },
      {
        id: "packets",
        kicker: "Chunks",
        title: "Packets and packet switching",
        body: `Data is split into small **packets** before being sent. Each packet carries a piece of the data plus a header with source and destination addresses and its position in the sequence.

In **packet switching**, packets travel **independently** and may take **different routes** to the destination, where they are reassembled in order. This is what makes the Internet fault tolerant (Lesson 11): if one path fails, packets reroute.`,
        code: `Message: "HELLO WORLD"
Packet 1: [to: 93.4.1.2 | seq: 1 | "HELLO "]
Packet 2: [to: 93.4.1.2 | seq: 2 | "WORLD"]
# May take different routes; reassembled by seq at the destination.`,
        codeCaption: "A message split into addressed, ordered packets",
        checkIn: check(
          "Why does splitting data into packets that can take different routes improve the network?",
          [
            "It compresses the data losslessly",
            "It adds fault tolerance — if one path fails, packets reroute and still arrive",
            "It guarantees packets always take the same path",
            "It removes the need for IP addresses",
          ],
          1,
          "Independent, rerouteable packets let data get around failures, making the network resilient.",
        ),
      },
      {
        id: "ip-tcp",
        kicker: "Address + reliability",
        title: "IP addresses and TCP",
        body: `Every device on the Internet has an **IP address** identifying it. **IP** handles getting packets to the right address; it doesn't guarantee they arrive or arrive in order.

**TCP** adds reliability on top of IP: it numbers packets, detects losses, requests retransmission, and reassembles them in the correct order. Together, **TCP/IP** provides addressed, reliable communication — the foundation of most Internet services.`,
        code: `sent:     [1][2][3][4]
received: [1][3][4]        # packet 2 got lost!
TCP:      "resend #2 please"
received: [1][2][3][4]     # now reassemble in order

# IP just addresses; TCP guarantees it all arrives, in order`,
        codeCaption: "TCP detects the missing packet and asks for a resend",
      },
      {
        id: "ipv4-ipv6",
        kicker: "Scaling",
        title: "Why IPv6 exists",
        body: `The older **IPv4** scheme uses 32-bit addresses — about 4.3 billion possible addresses (2³² — the bits idea from Lesson 3!). The world ran out. **IPv6** uses 128-bit addresses, providing a practically unlimited supply.

This is a direct application of Lesson 3: **more addresses require more bits**. The exam may ask why IPv6 was needed — the answer is that IPv4's fixed bit-length couldn't represent enough unique addresses.`,
        code: `IPv4:  32 bits  -> 2^32  ~= 4.3 billion  (ran out!)
       example: 93.184.216.34

IPv6: 128 bits  -> 2^128 ~= 340 undecillion (plenty)
       example: 2606:2800:220:1:248:1893:25c8:1946
# more devices need more bits (Lesson 3 idea)`,
        codeCaption: "More addresses need more bits: 32-bit IPv4 ran out, 128-bit IPv6 didn't",
        checkIn: check(
          "IPv6 was developed primarily because:",
          [
            "IPv4 was too fast",
            "IPv4's 32-bit addresses couldn't provide enough unique addresses for all devices",
            "IPv4 used too much compression",
            "IPv6 is easier to memorize",
          ],
          1,
          "A fixed 32-bit address space (2³²) ran out; IPv6's 128 bits vastly expands the supply.",
        ),
      },
      {
        id: "dns",
        kicker: "Names",
        title: "DNS: names to numbers",
        body: `People remember \`kanamacademy.org\`; computers route by IP address. **DNS** (Domain Name System) is the Internet's directory that translates human-friendly domain names into IP addresses.

When you enter a URL, your device first asks DNS for the site's IP, then sends its request there. DNS is itself a distributed, redundant system (Lesson 11) — no single server holds every name.`,
        code: `you: "what's the IP for kanamacademy.org?"
        |
      DNS lookup
        |
      "-> 93.184.216.34"
        |
you connect to 93.184.216.34 and send your request
# names are for humans; routing uses the number`,
        codeCaption: "DNS = the Internet's phone book: name in, IP address out",
        output: "kanamacademy.org  ->  93.184.216.34",
        checkIn: check(
          "You type a domain name into a browser. What does DNS do first?",
          [
            "Encrypts the page contents",
            "Translates the domain name into an IP address so the request can be routed",
            "Splits the page into packets",
            "Sorts the web server's files",
          ],
          1,
          "DNS resolves the human-readable name to an IP address before the connection is made.",
        ),
      },
      {
        id: "http",
        kicker: "The Web",
        title: "HTTP and HTTPS",
        body: `**HTTP** (HyperText Transfer Protocol) defines how a browser requests web resources and how servers respond. A request says "GET this page"; the server replies with the content (and a status like 200 OK or 404 Not Found).

**HTTPS** is HTTP with **encryption** (via TLS). It protects data in transit so eavesdroppers on the network can't read or tamper with it — essential for passwords, payments, and privacy (Lesson 14). The "S" is for secure.

**Trust / certificates:** Your browser also checks a **digital certificate** issued by a trusted **Certificate Authority (CA)**. That certificate helps prove you are talking to *example.org* and not an impostor. Encryption without authentication would still leave you vulnerable to a fake site.`,
        code: `browser -> GET /home  HTTP/1.1
           Host: example.org

server  -> 200 OK           # found it, here's the page
           <html>...</html>
# other statuses: 404 Not Found, 500 Server Error

# HTTP  = readable by anyone on the path
# HTTPS = HTTP + encryption + certificate trust check`,
        codeCaption: "HTTPS = encrypted HTTP + certificate proves the site's identity",
        output: "200 OK  ->  page loads",
        examples: [
          {
            caption: "Certificate Authority = trusted third party that vouches for a site",
            code: `Site claims: "I am bank.example"
CA certificate says: "Yes — we verified bank.example"
Browser: padlock OK -> open encrypted channel
# Fake site without a trusted cert -> browser warning`,
          },
        ],
        callout: {
          label: "On the AP exam",
          text: "HTTPS protects confidentiality/integrity in transit. Certificates / CAs help authenticate that you reached the intended server — know both ideas.",
        },
        checkIn: check(
          "What does HTTPS add compared to plain HTTP?",
          [
            "Faster packet routing",
            "Encryption that protects data in transit from eavesdropping and tampering",
            "A larger IP address space",
            "Lossless compression of web pages",
          ],
          1,
          "HTTPS encrypts the communication so others on the network can't read or modify it.",
        ),
      },
      {
        id: "latency-bandwidth",
        kicker: "Performance",
        title: "Bandwidth vs. latency",
        body: `Two different performance measures the exam distinguishes:

| Term | Meaning | Analogy |
| --- | --- | --- |
| Bandwidth | Amount of data per unit time (capacity) | Width of a pipe |
| Latency | Delay for data to travel from source to destination | Time for the first drop to arrive |

High bandwidth doesn't fix high latency: a huge pipe still has a delay for the first bit to cross the distance. Video streaming needs bandwidth; a quick click response needs low latency.`,
        code: `BANDWIDTH = how WIDE the pipe (data per second)
   thin  |==|          slow to move a big file
   wide  |========|    fast to move a big file

LATENCY = how LONG the trip (delay)
   near  A--B          reply arrives quickly
   far   A----------B  reply arrives late (even if pipe is wide)`,
        codeCaption: "Bandwidth = pipe width; latency = trip time (a wide pipe still has delay)",
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Trace a page load",
        body: `You type \`https://example.org\`:
1. **DNS** resolves \`example.org\` to an IP address.
2. Your browser opens a **TCP** connection to that IP.
3. **HTTPS** secures the connection with encryption.
4. The browser sends an **HTTP GET** request.
5. The server's response is split into **packets**, routed via **IP** (possibly different paths), reassembled by TCP, and rendered.

Each step is a protocol doing one job — and the layered design means each can improve independently. This mirrors abstraction layers from Lessons 3, 9, and 11.`,
        code: `type https://example.org
1. DNS   example.org -> 93.184.216.34
2. TCP   open a reliable connection to that IP
3. HTTPS encrypt the connection
4. HTTP  GET /  -> server replies 200 OK
5. IP    response split into packets, routed, reassembled
6. browser renders the page`,
        codeCaption: "One page load = DNS, TCP, HTTPS, HTTP, IP each doing its job",
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "You can trace the network",
        body: `You can now explain the Internet-vs-Web distinction, the role of IP, TCP, DNS, and HTTP/HTTPS, how packet switching provides fault tolerance and scalability, why IPv6 exists, and the difference between bandwidth and latency.

This closes Big Idea 4. Next you'll examine the *impact* of all this computing — its benefits, harms, and equity effects on society.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Explain one protocol",
        body: `Pick one protocol (DNS, TCP, IP, HTTP, or HTTPS). In two sentences, explain its job and what would go wrong on the Internet without it.`,
      },
    ],
  },
  bigIdeas: [
    "The **Internet** is the global network infrastructure; the **Web** is one service (linked pages) built on it.",
    "Data travels as **packets** that route independently and reassemble — providing fault tolerance and scalability.",
    "**Protocols** (IP for addressing, TCP for reliability, DNS for name lookup, HTTP/HTTPS for the Web) are shared rules that let devices interoperate.",
    "**Bandwidth** is capacity (data per time); **latency** is delay — and high bandwidth does not remove latency.",
  ],
  keyTerms: [
    { term: "Protocol", definition: "An agreed-upon set of rules governing how devices communicate." },
    { term: "Packet", definition: "A small chunk of data with addressing and sequence info, routed independently." },
    { term: "IP address", definition: "A unique identifier for a device on the Internet." },
    { term: "DNS", definition: "The system that translates domain names into IP addresses." },
    { term: "HTTPS", definition: "HTTP with encryption, protecting data in transit." },
    { term: "Latency", definition: "The time delay for data to travel from source to destination." },
  ],
  realWorld:
    "Every time a page feels slow, you're experiencing latency or limited bandwidth; every time a login is safe, HTTPS encryption is doing its job — the exact concepts in this lesson.",
  quiz: [
    {
      id: "q1",
      question: "The World Wide Web is best described as:",
      choices: [
            "The physical cables of the Internet” belongs to a different situation than the one in the question stem",
            "A service of linked pages built on top of the Internet",
            "A type of IP address” belongs to a different situation than the one in the question stem",
            "The same thing as the Internet” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation: "The Web is one application running on the Internet's infrastructure.",
    },
    {
      id: "q2",
      question: "In packet switching, packets of one message:",
      choices: [
            "Contain no addressing information” belongs to a different situation than the one in the question stem",
            "Must all take the identical route” belongs to a different situation than the one in the question stem",
            "Are never reassembled” belongs to a different situation than the one in the question stem",
            "Can take different routes and are reassembled at the destination",
          ],
      correctIndex: 3,
      explanation: "Independent routing plus reassembly gives the Internet its resilience.",
    },
    {
      id: "q3",
      question: "Which protocol translates a domain name into an IP address?",
      choices: ["TCP", "HTTP", "DNS", "HTTPS"],
      correctIndex: 2,
      explanation: "DNS is the Internet's directory from names to IP addresses.",
    },
    {
      id: "q4",
      question: "What does TCP add on top of IP?",
      choices: [
            "Reliable, ordered delivery with retransmission of lost packets",
            "Domain name lookup” belongs to a different situation than the one in the question stem",
            "A larger address space” belongs to a different situation than the one in the question stem",
            "Encryption of all data” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation: "TCP ensures packets arrive, in order, retransmitting losses; IP handles addressing.",
    },
    {
      id: "q5",
      question: "IPv6 was primarily created to:",
      choices: [
            "Provide vastly more unique addresses than 32-bit IPv4 allowed",
            "Replace DNS” belongs to a different situation than the one in the question stem",
            "Make websites load faster” belongs to a different situation than the one in the question stem",
            "Encrypt all traffic” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation: "IPv4's 2³² addresses ran out; IPv6's 128 bits expand the supply enormously.",
    },
    {
      id: "q6",
      question: "A user logs into a bank site. Which protocol protects the password in transit?",
      choices: ["HTTP", "HTTPS", "DNS", "IP"],
      correctIndex: 1,
      explanation: "HTTPS encrypts the connection so credentials can't be read en route.",
    },
    {
      id: "q7",
      question: "A connection has very high bandwidth but a long delay before data arrives. This describes:",
      choices: [
        "Low bandwidth, low latency",
        "High bandwidth, high latency",
        "Low bandwidth, high latency",
        "High bandwidth, low latency",
      ],
      correctIndex: 1,
      explanation: "Capacity is high (bandwidth) but the travel delay (latency) is large.",
    },
    {
      id: "q8",
      question: "Why do open, standardized protocols matter for the Internet?",
      choices: [
            "They remove the need for IP addresses” belongs to a different situation than the one in the question stem",
            "They let devices from different makers interoperate, enabling scalability",
            "They guarantee zero latency” belongs to a different situation than the one in the question stem",
            "They make all data lossy” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation: "Shared standards allow interoperability, which lets the network scale to billions of devices.",
    },
  ],
  reflection: {
    prompt:
      "AP questions connect design to properties like scalability and security. Pick one protocol from this lesson and explain how it contributes to the Internet being scalable, fault tolerant, or secure.",
    placeholder: "The protocol and the Internet property it enables…",
  },
};
