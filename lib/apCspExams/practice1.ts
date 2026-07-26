import type { ApCspExamConfig, ApCspExamQuestion } from "./types";

/**
 * Kanam Academy — AP CSP Prep · Practice Test 1
 * AP-style multiple-choice questions written for exam practice.
 * These are original Kanam prep items and are NOT official College Board questions.
 */

const questions: ApCspExamQuestion[] = [
  {
    id: "p1-q01",
    bigIdea: 1,
    topic: "Purpose vs. function",
    stem: "A team is building a mobile app that helps people drink enough water each day. In their planning notes they write a sentence describing why the app should exist and who it is for. Which of the following best describes the PURPOSE of the program, as opposed to its function?",
    choices: [
      "The app stores each logged amount in a list and adds the values to compute a daily total.",
      "The app helps people build a healthy hydration habit by reminding them to drink water.",
      "The app uses a loop to send a notification every two hours.",
      "The app converts fluid ounces to milliliters using a formula.",
    ],
    correctIndexes: [1],
    explanation:
      "The purpose is the need the program meets for its users (the \"why\"), while the function is how the program behaves mechanically (the \"how\"). Building a hydration habit is the purpose; storing values, looping to send notifications, and converting units all describe function.",
  },
  {
    id: "p1-q02",
    bigIdea: 2,
    topic: "Number bases (binary to decimal)",
    stem: "What is the decimal (base-10) value of the binary (base-2) number 1011?",
    choices: ["7", "11", "13", "23"],
    correctIndexes: [1],
    explanation:
      "Each bit is a power of two: 1x8 + 0x4 + 1x2 + 1x1 = 8 + 0 + 2 + 1 = 11.",
  },
  {
    id: "p1-q03",
    bigIdea: 3,
    topic: "Arithmetic operators (MOD)",
    stem: "What value is displayed by the following statement?\n\nDISPLAY(29 MOD 5)",
    choices: ["4", "5", "5.8", "24"],
    correctIndexes: [0],
    explanation:
      "MOD returns the remainder of integer division. 29 divided by 5 is 5 with a remainder of 4, so 29 MOD 5 evaluates to 4.",
  },
  {
    id: "p1-q04",
    bigIdea: 4,
    topic: "The Internet (packets)",
    stem: "When a large file is sent across the Internet, it is typically broken into smaller units that are sent independently and may travel along different routes before being reassembled. What are these units called?",
    choices: ["Bits", "Packets", "Protocols", "Metadata"],
    correctIndexes: [1],
    explanation:
      "Data is divided into packets, each of which is routed independently and can take a different path. Bits are individual binary digits, a protocol is an agreed set of rules, and metadata is data about data.",
  },
  {
    id: "p1-q05",
    bigIdea: 5,
    topic: "Digital divide",
    stem: "The term \"digital divide\" most directly refers to which of the following?",
    choices: [
            "The difference between analog and digital data” belongs to a different situation than the one in the question stem",
            "Unequal access to computing devices and the Internet among different groups of people.",
            "The distinction between lossy and lossless compression” belongs to a different situation than the one in the question stem",
            "The gap between the binary and decimal number systems” belongs to a different situation than the one in the question stem",
          ],
    correctIndexes: [1],
    explanation:
      "The digital divide describes differences in access to computing resources (devices, reliable Internet, digital skills) across groups, which can affect equity in education, jobs, and services.",
  },
  {
    id: "p1-q06",
    bigIdea: 1,
    topic: "Collaboration",
    stem: "Which of the following best describes a benefit of collaboration when developing a computing innovation?",
    choices: [
            "It removes the need to test the program before release” belongs to a different situation than the one in the question stem",
            "It guarantees the finished program will contain no logic errors” belongs to a different situation than the one in the question stem",
            "It brings together multiple perspectives, which can help surface problems and reduce bias in the design.",
            "It ensures the program will run faster on every device” belongs to a different situation than the one in the question stem",
          ],
    correctIndexes: [2],
    explanation:
      "Collaboration combines varied skills and viewpoints, helping teams find issues and design more inclusive solutions. It does not guarantee correctness, improve performance automatically, or replace testing.",
  },
  {
    id: "p1-q07",
    bigIdea: 2,
    topic: "Overflow error",
    stem: "A system stores unsigned integers using 4 bits, so it can represent values from 0 to 15. A program computes 13 + 5 and tries to store the result in this 4-bit space. Which of the following best describes what happens?",
    choices: [
            "The value 18 is stored exactly” belongs to a different situation than the one in the question stem",
            "The bits switch to representing decimal fractions” belongs to a different situation than the one in the question stem",
            "An overflow error occurs because 18 cannot be represented in 4 bits.",
            "The value is automatically rounded to 15” belongs to a different situation than the one in the question stem",
          ],
    correctIndexes: [2],
    explanation:
      "18 is greater than the largest value (15) that 4 bits can represent, so the result cannot be stored correctly. This is an overflow error, which happens when a value exceeds the range of the allotted bits.",
  },
  {
    id: "p1-q08",
    bigIdea: 3,
    topic: "Lists (1-based indexing)",
    stem: "Consider the following code. Lists are indexed starting at 1.\n\nwordList ← [\"apple\", \"berry\", \"cherry\", \"date\"]\nDISPLAY(wordList[2])\n\nWhat is displayed?",
    choices: ["apple", "berry", "cherry", "An index-out-of-range error"],
    correctIndexes: [1],
    explanation:
      "In AP CSP pseudocode, list indexing begins at 1, so wordList[1] is \"apple\" and wordList[2] is \"berry\".",
  },
  {
    id: "p1-q09",
    bigIdea: 4,
    topic: "DNS",
    stem: "What is the primary role of the Domain Name System (DNS)?",
    choices: [
            "To translate human-readable domain names (such as example.com) into IP addresses.",
            "To detect and correct overflow errors in stored numbers” belongs to a different situation than the one in the question stem",
            "To encrypt the data sent between a browser and a server” belongs to a different situation than the one in the question stem",
            "To break outgoing messages into packets” belongs to a different situation than the one in the question stem",
          ],
    correctIndexes: [0],
    explanation:
      "DNS acts like the Internet's address book, mapping domain names people type to the numeric IP addresses computers use to locate one another. Encryption, packetization, and error handling are separate functions.",
  },
  {
    id: "p1-q10",
    bigIdea: 5,
    topic: "Personally identifiable information (PII)",
    stem: "Which of the following is the clearest example of personally identifiable information (PII)?",
    choices: [
            "The current outdoor temperature” belongs to a different situation than the one in the question stem",
            "The number of pixels in a photograph” belongs to a different situation than the one in the question stem",
            "A country's total population” belongs to a different situation than the one in the question stem",
            "A user's Social Security number combined with their home address.",
          ],
    correctIndexes: [3],
    explanation:
      "PII is information that can identify a specific individual, such as a Social Security number, home address, or full name. Aggregate or environmental data that cannot be tied to one person is not PII.",
  },
  {
    id: "p1-q11",
    bigIdea: 1,
    topic: "Testing does not prove correctness",
    stem: "A programmer runs her program on 20 different inputs, and each time it produces the correct output. What can she correctly conclude?",
    choices: [
            "The program contains no logic errors of any kind” belongs to a different situation than the one in the question stem",
            "The program worked correctly for those 20 tested inputs, but untested inputs could still reveal errors.",
            "Testing is now unnecessary because the program already works” belongs to a different situation than the one in the question stem",
            "The program is guaranteed to be correct for every possible input” belongs to a different situation than the one in the question stem",
          ],
    correctIndexes: [1],
    explanation:
      "Testing can reveal the presence of errors but cannot prove their absence. Passing 20 test cases increases confidence only for those inputs; other inputs (such as edge cases) might still trigger errors.",
  },
  {
    id: "p1-q12",
    bigIdea: 2,
    topic: "Lossless vs. lossy compression",
    stem: "A photographer needs to reduce the file size of a set of images to email them, but it is essential that each image can later be restored to be exactly identical to the original. Which type of compression should be used?",
    choices: [
            "Neither, because compression always permanently discards data” belongs to a different situation than the one in the question stem",
            "Lossy compression, because it always produces the smallest files” belongs to a different situation than the one in the question stem",
            "Either type, since both fully restore the original data” belongs to a different situation than the one in the question stem",
            "Lossless compression, because the original data can be perfectly reconstructed.",
          ],
    correctIndexes: [3],
    explanation:
      "Lossless compression reduces size while allowing the exact original to be reconstructed. Lossy compression achieves smaller files by permanently discarding some data, so it cannot restore the exact original.",
  },
  {
    id: "p1-q13",
    bigIdea: 3,
    topic: "Nested conditionals",
    stem: "What is displayed by the following code?\n\nn ← 7\nIF (n MOD 2 = 0)\n{\n  DISPLAY(\"even\")\n}\nELSE\n{\n  IF (n > 5)\n  {\n    DISPLAY(\"big odd\")\n  }\n  ELSE\n  {\n    DISPLAY(\"small odd\")\n  }\n}",
    choices: ["even", "big odd", "small odd", "Nothing is displayed"],
    correctIndexes: [1],
    explanation:
      "7 MOD 2 is 1, not 0, so the ELSE branch runs. Inside it, 7 > 5 is true, so \"big odd\" is displayed.",
  },
  {
    id: "p1-q14",
    bigIdea: 4,
    topic: "HTTPS and certificate authorities",
    stem: "A user notices that a website's address begins with \"https\" and shows a padlock icon in the browser. Which of the following is the best conclusion?",
    choices: [
            "Data exchanged with the site is encrypted, and a certificate authority has verified the site's certificate.",
            "The website is guaranteed to be completely free of malware” belongs to a different situation than the one in the question stem",
            "The website will always load faster than an \"http\" site” belongs to a different situation than the one in the question stem",
            "The website is legally prohibited from collecting any personal information” belongs to a different situation than the one in the question stem",
          ],
    correctIndexes: [0],
    explanation:
      "HTTPS encrypts traffic between the browser and server, and the certificate is issued/validated by a certificate authority (CA) to confirm the site's identity. It does not guarantee the site is safe, fast, or private in every other respect.",
  },
  {
    id: "p1-q15",
    bigIdea: 5,
    topic: "Crowdsourcing",
    stem: "A nonprofit builds a website where volunteers around the world label photos of wildlife to help scientists track animal populations. This approach of obtaining input and contributions from a large group of people online is best described as",
    choices: ["crowdsourcing.", "phishing.", "lossy compression.", "a heuristic."],
    correctIndexes: [0],
    explanation:
      "Crowdsourcing gathers contributions (data, funding, labor, or ideas) from a large, often distributed, group of people, frequently via the Internet. It can accelerate projects that would be slow for a small team.",
  },
  {
    id: "p1-q16",
    bigIdea: 2,
    topic: "Metadata",
    stem: "A digital photo file stores the date the photo was taken, the camera model, and the GPS coordinates, in addition to the pixel data itself. This extra descriptive information is an example of",
    choices: ["metadata.", "lossy compression.", "an analog signal.", "a heuristic."],
    correctIndexes: [0],
    explanation:
      "Metadata is data that describes other data. Here it describes the photo (when, where, and how it was captured) without being the image content itself.",
  },
  {
    id: "p1-q17",
    bigIdea: 3,
    topic: "Iteration (REPEAT n TIMES)",
    stem: "What value is displayed by the following code?\n\ncount ← 0\nREPEAT 5 TIMES\n{\n  count ← count + 2\n}\nDISPLAY(count)",
    choices: ["5", "7", "10", "12"],
    correctIndexes: [2],
    explanation:
      "The loop body runs exactly 5 times, adding 2 to count each time: 2, 4, 6, 8, 10. The final value displayed is 10.",
  },
  {
    id: "p1-q18",
    bigIdea: 5,
    topic: "Intellectual property and copyright",
    stem: "A student wants to include a popular song as background music in a video they plan to post publicly. Which of the following is the most appropriate action regarding intellectual property?",
    choices: [
            "Use the song freely, because anything found online is in the public domain” belongs to a different situation than the one in the question stem",
            "Use the song as long as the video is under one minute long” belongs to a different situation than the one in the question stem",
            "Obtain permission or use music licensed for reuse, because the song is protected by copyright.",
            "Use the song because giving credit in the description removes all copyright restrictions.",
          ],
    correctIndexes: [2],
    explanation:
      "Copyright protects original works such as songs, so reusing them generally requires permission or an appropriate license. Being online, being short, or crediting the author does not by itself grant the right to reuse a copyrighted work.",
  },
  {
    id: "p1-q19",
    bigIdea: 3,
    topic: "Iteration (REPEAT UNTIL)",
    stem: "What value is displayed by the following code?\n\nx ← 1\nREPEAT UNTIL (x > 10)\n{\n  x ← x * 2\n}\nDISPLAY(x)",
    choices: ["8", "10", "16", "32"],
    correctIndexes: [2],
    explanation:
      "x doubles each pass: 1 to 2 to 4 to 8 to 16. The condition (x > 10) is checked before each pass; once x reaches 16 the loop stops, so 16 is displayed.",
  },
  {
    id: "p1-q20",
    bigIdea: 5,
    topic: "Open source and Creative Commons",
    stem: "A developer releases their program under an open-source license, and an artist releases photos under a Creative Commons license that permits reuse with attribution. What do these licenses have in common?",
    choices: [
            "They let creators grant others certain rights to use, share, or build on their work under stated conditions.",
            "“They make the works impossible to modify” describes a different situation than the one in the question stem",
            "They transfer ownership of the work to whoever downloads it” belongs to a different situation than the one in the question stem",
            "They remove all responsibility to credit the original creator” belongs to a different situation than the one in the question stem",
          ],
    correctIndexes: [0],
    explanation:
      "Open-source and Creative Commons licenses let creators keep ownership while granting others permission to use, share, or adapt the work under specified terms (such as attribution). They do not transfer ownership or forbid modification.",
  },
  {
    id: "p1-q21",
    bigIdea: 3,
    topic: "Lists (REMOVE and shifting)",
    stem: "Consider the following code. The procedure REMOVE(list, i) removes the element at position i and shifts the remaining elements toward the front. Lists are indexed starting at 1.\n\nlist ← [10, 20, 30, 40, 50]\nREMOVE(list, 2)\nDISPLAY(list[2])",
    choices: ["10", "20", "30", "40"],
    correctIndexes: [2],
    explanation:
      "REMOVE(list, 2) deletes the value 20 (position 2). The remaining elements shift down, giving [10, 30, 40, 50], so list[2] is now 30.",
  },
  {
    id: "p1-q22",
    bigIdea: 5,
    topic: "Data collection tradeoffs",
    stem: "A free navigation app collects users' real-time location data to provide accurate traffic predictions. Which of the following best describes a tradeoff of this design?",
    choices: [
            "It has no downsides because the app is free to use” belongs to a different situation than the one in the question stem",
            "It eliminates the need for the app to connect to the Internet” belongs to a different situation than the one in the question stem",
            "It guarantees that the collected data can never be misused” belongs to a different situation than the one in the question stem",
            "It improves traffic predictions but raises privacy concerns about how location data is stored and shared.",
          ],
    correctIndexes: [3],
    explanation:
      "Collecting location data can make a service more useful while creating privacy risks (who can access the data, how long it is kept, whether it could be shared or breached). Recognizing such tradeoffs is central to evaluating computing innovations.",
  },
  {
    id: "p1-q23",
    bigIdea: 3,
    topic: "Procedures and parameters",
    stem: "Consider the following procedure and call.\n\nPROCEDURE addTax(price, rate)\n{\n  RETURN price + price * rate\n}\n\nresult ← addTax(100, 0.05)\nDISPLAY(result)",
    choices: ["5", "100", "105", "100.05"],
    correctIndexes: [2],
    explanation:
      "The arguments 100 and 0.05 are passed to price and rate. The procedure returns 100 + 100 * 0.05 = 100 + 5 = 105.",
  },
  {
    id: "p1-q24",
    bigIdea: 3,
    topic: "Random values (inclusive range)",
    stem: "The procedure RANDOM(a, b) returns a random integer from a to b, inclusive. How many different values can RANDOM(3, 9) possibly return?",
    choices: ["6", "7", "9", "3"],
    correctIndexes: [1],
    explanation:
      "Because both endpoints are included, the possible values are 3, 4, 5, 6, 7, 8, and 9. That is b - a + 1 = 9 - 3 + 1 = 7 values.",
  },
  {
    id: "p1-q25",
    bigIdea: 3,
    topic: "Linear vs. binary search",
    stem: "A sorted list contains 1,000 elements. Which statement best compares linear search and binary search on this list?",
    choices: [
            "Binary search can find a target in far fewer steps because it repeatedly halves the portion of the list still being searched.",
            "“Both algorithms take the same number of steps in the worst case” describes a different situation than the one in the question stem",
            "Linear search is always faster because it does not require the list to be sorted” belongs to a different situation than the one in the question stem",
            "Binary search only works correctly on unsorted lists. That option sounds confident, but it leaves out the deciding constraint",
          ],
    correctIndexes: [0],
    explanation:
      "Binary search requires a sorted list and cuts the remaining search space roughly in half each step, so its worst case grows very slowly (about log-base-2 of n). Linear search may check every element, up to n steps in the worst case.",
  },
  {
    id: "p1-q26",
    bigIdea: 3,
    topic: "Heuristics",
    stem: "For some problems, computing an exact optimal solution would take an unreasonable amount of time. In this context, a heuristic is best described as",
    choices: [
            "a proof that a problem can never be solved by any algorithm” belongs to a different situation than the one in the question stem",
            "an approach that is always guaranteed to produce the optimal solution” belongs to a different situation than the one in the question stem",
            "“a technique for storing data using fewer bits” describes a different situation than the one in the question stem",
            "an approach that may produce a good-enough (but not guaranteed optimal) solution in a reasonable amount of time.",
          ],
    correctIndexes: [3],
    explanation:
      "A heuristic trades a guarantee of optimality for speed, aiming to find a reasonably good solution quickly. It is commonly used when an exact solution would take an unreasonable amount of time to compute.",
  },
  {
    id: "p1-q27",
    bigIdea: 5,
    topic: "Phishing and multi-factor authentication",
    stem: "A school wants to help students protect their accounts from phishing and unauthorized access. Which TWO of the following are effective practices? Select two answers.",
    choices: [
      "Enabling multi-factor authentication (MFA) on their accounts.",
      "Clicking links in unexpected emails to check whether the links are safe.",
      "Being cautious of messages that urgently demand passwords or personal information.",
      "Reusing one simple password across all accounts so it is easy to remember.",
    ],
    correctIndexes: [0, 2],
    explanation:
      "MFA adds a second verification step so a stolen password alone is not enough, and being skeptical of urgent requests for credentials helps students avoid phishing. Clicking unknown links and reusing weak passwords increase risk.",
  },
  {
    id: "p1-q28",
    bigIdea: 3,
    topic: "Create Performance Task requirements",
    stem: "The AP Create Performance Task asks students to include, among other things, a list (or other collection) used to manage complexity and a student-developed procedure. Which TWO of the following demonstrate appropriate use of these elements? Select two answers.",
    choices: [
      "Using a single list to store all players' scores so they can be processed together (for example, to find the highest score).",
      "Creating three separate variables score1, score2, and score3 instead of using a list.",
      "Writing a procedure with a parameter that performs a calculation and is called elsewhere in the program.",
      "Renaming the built-in DISPLAY command and counting it as a student-developed procedure.",
    ],
    correctIndexes: [0, 2],
    explanation:
      "A list that stores related values so they can be handled together demonstrates managing complexity, and a student-written procedure with a parameter that is called shows abstraction. Separate variables and merely renaming a built-in command do not satisfy these requirements.",
  },
  {
    id: "p1-q29",
    bigIdea: 4,
    topic: "Parallel and distributed computing",
    stem: "A program can be divided into tasks that run at the same time on multiple processors. Which TWO of the following statements about parallel and distributed computing are true? Select two answers.",
    choices: [
      "Parallel computing can reduce the total time to complete a task by running independent parts simultaneously.",
      "The speedup from parallelizing is always exactly equal to the number of processors, with no upper limit.",
      "Portions of a solution that must run sequentially can limit the overall speedup that parallelizing achieves.",
      "Distributed computing is impossible when the computers are connected over a network.",
    ],
    correctIndexes: [0, 2],
    explanation:
      "Running independent parts at the same time can shorten total time, but any part that must run sequentially caps the achievable speedup, so speedup is generally less than the number of processors. Distributed computing specifically uses multiple networked computers.",
  },
  {
    id: "p1-q30",
    bigIdea: 2,
    topic: "Bias in data and computing",
    stem: "A team trains a program to screen job applicants using a company's historical hiring records. Which TWO of the following are the most relevant concerns? Select two answers.",
    choices: [
      "If the historical data reflects past human bias, the program may learn and reproduce that bias.",
      "Using a larger amount of the same data automatically removes any bias.",
      "The data may not represent all groups fairly, leading to skewed or discriminatory results.",
      "Programs built from data cannot be influenced by the data used to create them.",
    ],
    correctIndexes: [0, 2],
    explanation:
      "Programs learn patterns from their data, so biased or unrepresentative training data can produce biased outcomes. More of the same biased data does not fix the problem, and the data used to build a program directly shapes its behavior.",
  },
];

export const apCspPracticeExam1: ApCspExamConfig = {
  id: "csp-practice-1",
  slug: "practice-1",
  title: "Practice Test 1",
  subtitle: "30 AP-style multiple-choice questions · all five Big Ideas",
  suggestedMinutes: 50,
  xpReward: 250,
  badge: "Practice Ace I",
  questions,
};
