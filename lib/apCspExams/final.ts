import type { ApCspExamConfig, ApCspExamQuestion } from "./types";

/**
 * Kanam Academy — AP CSP Prep · Final Exam
 * A longer AP-style multiple-choice exam simulation.
 * These are original Kanam prep items and are NOT official College Board questions.
 */

const questions: ApCspExamQuestion[] = [
  {
    id: "f-q01",
    bigIdea: 1,
    topic: "Defining the problem",
    stem: "Before writing any code, a development team spends time clearly describing the problem they want to solve and identifying who will use the solution. Why is defining the problem carefully an important first step?",
    choices: [
      "It ensures the program will never have any runtime errors.",
      "A clear understanding of the problem and users guides design decisions and helps the team build something that actually meets the need.",
      "It makes testing the finished program unnecessary.",
      "It guarantees the program will run on every possible device.",
    ],
    correctIndexes: [1],
    explanation:
      "Understanding the problem and the intended users shapes requirements and design choices. Skipping this step risks building something that does not address the real need.",
  },
  {
    id: "f-q02",
    bigIdea: 2,
    topic: "Number bases (binary to decimal)",
    stem: "What is the decimal (base-10) value of the binary number 100101?",
    choices: ["25", "37", "41", "45"],
    correctIndexes: [1],
    explanation:
      "100101 = 32 + 0 + 0 + 4 + 0 + 1 = 37 (the 1s are in the 32, 4, and 1 places).",
  },
  {
    id: "f-q03",
    bigIdea: 3,
    topic: "Variables and swapping",
    stem: "What is displayed by the following code?\n\na ← 5\nb ← 8\ntemp ← a\na ← b\nb ← temp\nDISPLAY(a)\nDISPLAY(b)",
    choices: ["5 then 8", "8 then 5", "8 then 8", "5 then 5"],
    correctIndexes: [1],
    explanation:
      "temp saves a's original value (5). Then a becomes b's value (8), and b becomes temp (5). The values are swapped, so a is 8 and b is 5.",
  },
  {
    id: "f-q04",
    bigIdea: 4,
    topic: "IP addresses",
    stem: "What is the primary purpose of an IP address?",
    choices: [
      "To encrypt data before it is sent over the Internet.",
      "To uniquely identify a device on a network so that data can be routed to it.",
      "To compress files so they transfer faster.",
      "To translate domain names directly into finished web pages.",
    ],
    correctIndexes: [1],
    explanation:
      "An IP address identifies a device on a network so packets can be delivered to the correct destination. Encryption, compression, and name translation are handled by other mechanisms.",
  },
  {
    id: "f-q05",
    bigIdea: 5,
    topic: "Cookies and tracking",
    stem: "Many websites store small files called cookies on a user's device. One common use of cookies is to",
    choices: [
      "permanently erase the user's entire browsing history.",
      "remember information such as login status or preferences, and sometimes track a user's activity across visits.",
      "increase the physical storage capacity of the device.",
      "encrypt the user's entire Internet connection.",
    ],
    correctIndexes: [1],
    explanation:
      "Cookies store small pieces of data (like whether you are logged in or your settings) and can be used to track activity across sites, which raises privacy considerations.",
  },
  {
    id: "f-q06",
    bigIdea: 1,
    topic: "Event-driven programs",
    stem: "A program is described as \"event-driven.\" Which of the following best describes such a program's behavior?",
    choices: [
      "It always runs the same fixed sequence of steps and ignores the user.",
      "Portions of the program run in response to events, such as a user clicking a button or entering input.",
      "It can only produce output and can never accept input.",
      "It must finish running completely before the user can do anything.",
    ],
    correctIndexes: [1],
    explanation:
      "In event-driven programs, code runs in response to events (clicks, key presses, sensor input). This is common in apps and interactive web pages.",
  },
  {
    id: "f-q07",
    bigIdea: 2,
    topic: "Bits and representable values",
    stem: "A code needs to represent 100 different symbols, each with a unique binary pattern. What is the minimum number of bits required per symbol?",
    choices: ["6", "7", "8", "100"],
    correctIndexes: [1],
    explanation:
      "With b bits you can represent 2^b patterns. 2^6 = 64 (too few) and 2^7 = 128 (enough), so 7 bits are needed to give each of the 100 symbols a unique pattern.",
  },
  {
    id: "f-q08",
    bigIdea: 3,
    topic: "MOD and Boolean logic",
    stem: "A programmer wants a Boolean expression that is true exactly when the integer n is even. Which expression accomplishes this?",
    choices: ["n MOD 2 = 0", "n MOD 2 = 1", "n / 2 = 0", "n MOD 0 = 2"],
    correctIndexes: [0],
    explanation:
      "An even number has no remainder when divided by 2, so n MOD 2 = 0 is true for even n. n MOD 2 = 1 tests for odd numbers, and n MOD 0 is undefined.",
  },
  {
    id: "f-q09",
    bigIdea: 4,
    topic: "Open protocols and scalability",
    stem: "The Internet relies on open, standardized protocols (such as TCP/IP) rather than one company's private rules. Why is this important?",
    choices: [
      "It allows devices and networks made by many different manufacturers to communicate, and it lets the Internet scale as it grows.",
      "It prevents any new devices from ever joining the Internet.",
      "It makes encryption completely unnecessary.",
      "It guarantees that no data packet is ever lost.",
    ],
    correctIndexes: [0],
    explanation:
      "Open standards mean any device following the protocols can join and communicate, which supports interoperability and scalability as billions of devices connect.",
  },
  {
    id: "f-q10",
    bigIdea: 5,
    topic: "Creative Commons licensing",
    stem: "An artist publishes a drawing under a Creative Commons license that allows others to share and adapt it as long as they give credit. Another creator wants to use the drawing in a project. What must they do?",
    choices: [
      "Nothing; they may claim the drawing as entirely their own original work.",
      "Give appropriate credit (attribution) to the original artist, as the license requires.",
      "Pay a mandatory fee to a certificate authority.",
      "Convert the drawing to binary before they are allowed to use it.",
    ],
    correctIndexes: [1],
    explanation:
      "Creative Commons licenses grant reuse rights under stated conditions. An attribution license requires crediting the creator; it does not transfer ownership or require a fee to a certificate authority.",
  },
  {
    id: "f-q11",
    bigIdea: 1,
    topic: "Peer review and feedback",
    stem: "During development, a programmer asks classmates to review her code and try to break her program. What is the main benefit of this practice?",
    choices: [
      "It guarantees the program is now completely free of bugs.",
      "Others may spot errors, edge cases, or unclear logic that the original programmer overlooked.",
      "It automatically makes the program run faster.",
      "It removes the need for the programmer to understand her own code.",
    ],
    correctIndexes: [1],
    explanation:
      "Feedback from others brings fresh perspectives that can reveal overlooked bugs, edge cases, or confusing logic. It improves quality but does not guarantee a bug-free program.",
  },
  {
    id: "f-q12",
    bigIdea: 2,
    topic: "Color representation (RGB)",
    stem: "In a common digital color scheme, each pixel's color is stored as three values for red, green, and blue, with each value ranging from 0 to 255. How many bits are needed to store one of these 0-to-255 values?",
    choices: ["4", "8", "16", "255"],
    correctIndexes: [1],
    explanation:
      "The range 0 to 255 covers 256 values, and 256 = 2^8, so 8 bits are needed for each color component (24 bits total for one RGB pixel).",
  },
  {
    id: "f-q13",
    bigIdea: 3,
    topic: "Lists (APPEND and LENGTH)",
    stem: "Consider the following code. APPEND(list, value) adds value to the end of the list, and LENGTH(list) returns the number of elements.\n\nlist ← [3, 6, 9]\nAPPEND(list, 12)\nAPPEND(list, 15)\nDISPLAY(LENGTH(list))",
    choices: ["3", "4", "5", "15"],
    correctIndexes: [2],
    explanation:
      "The list starts with 3 elements. Two APPEND calls add two more, giving [3, 6, 9, 12, 15], so LENGTH is 5.",
  },
  {
    id: "f-q14",
    bigIdea: 4,
    topic: "Routing",
    stem: "As a packet travels across the Internet from a sender to a receiver, devices called routers",
    choices: [
      "store the packet permanently so it never needs to be sent again.",
      "forward the packet along a path toward its destination, choosing among available routes.",
      "translate the packet from binary into decimal for the user.",
      "encrypt the packet using a certificate authority.",
    ],
    correctIndexes: [1],
    explanation:
      "Routers direct packets toward their destination, selecting among available paths. This routing, combined with redundancy, helps data reach its destination even if some paths fail.",
  },
  {
    id: "f-q15",
    bigIdea: 5,
    topic: "Data breaches",
    stem: "A company that stores millions of users' passwords and personal data suffers a data breach. Which of the following is a realistic consequence for users?",
    choices: [
      "Their leaked information could be used for identity theft or to access their other accounts, especially if they reused passwords.",
      "Their devices will automatically gain additional storage space.",
      "The Internet will permanently stop working for everyone.",
      "Binary numbers will no longer be able to represent data.",
    ],
    correctIndexes: [0],
    explanation:
      "Breached personal data can be exploited for identity theft or account takeover, and reused passwords make the damage spread across accounts. This is why unique passwords and MFA matter.",
  },
  {
    id: "f-q16",
    bigIdea: 1,
    topic: "Decomposition",
    stem: "A team building a large program breaks it into smaller, well-defined parts that different members implement separately and then combine. This practice of dividing a problem into smaller subproblems is called",
    choices: [
      "decomposition, which helps manage complexity and supports collaboration.",
      "overflow, which extends the program's available memory.",
      "sampling, which converts the program into digital form.",
      "phishing, which distributes the workload among users.",
    ],
    correctIndexes: [0],
    explanation:
      "Decomposition breaks a problem into smaller, manageable parts. It makes complex programs easier to design, understand, test, and build collaboratively.",
  },
  {
    id: "f-q17",
    bigIdea: 2,
    topic: "Purpose of compression",
    stem: "Which of the following is a primary reason to compress data before storing or transmitting it?",
    choices: [
      "To reduce the amount of storage space or network bandwidth required.",
      "To make the data permanently impossible for anyone to read.",
      "To convert the data from digital form into analog form.",
      "To guarantee that the data contains no errors.",
    ],
    correctIndexes: [0],
    explanation:
      "Compression reduces the number of bits needed to store or send data, saving space and bandwidth. It is not primarily about secrecy (that is encryption) or error handling.",
  },
  {
    id: "f-q18",
    bigIdea: 3,
    topic: "Traversing a list to find a maximum",
    stem: "What is displayed by the following code?\n\nvalues ← [12, 45, 7, 33, 20]\nmax ← values[1]\nFOR EACH v IN values\n{\n  IF (v > max)\n  {\n    max ← v\n  }\n}\nDISPLAY(max)",
    choices: ["12", "20", "33", "45"],
    correctIndexes: [3],
    explanation:
      "max starts at 12 and is updated whenever a larger value is found. The largest value in the list is 45, so max ends at 45.",
  },
  {
    id: "f-q19",
    bigIdea: 5,
    topic: "Malware",
    stem: "Which of the following best describes malware?",
    choices: [
      "Software intentionally designed to damage, disrupt, or gain unauthorized access to a computer system.",
      "A legitimate security update issued by the operating system's vendor.",
      "A protocol used to transfer web pages between browsers and servers.",
      "A technique for compressing data without any loss.",
    ],
    correctIndexes: [0],
    explanation:
      "Malware (malicious software) is created to harm systems or gain unauthorized access. Examples include viruses and ransomware. It is different from legitimate software updates.",
  },
  {
    id: "f-q20",
    bigIdea: 2,
    topic: "Big data",
    stem: "\"Big data\" sets are often so large that they cannot be processed on a single typical computer or analyzed by hand. Which of the following is a reason big data can still be valuable?",
    choices: [
      "Patterns and correlations found in very large data sets can reveal insights that smaller samples might miss.",
      "Larger data sets are always completely free of bias.",
      "Big data eliminates any need to protect user privacy.",
      "Big data can only ever be stored in analog form.",
    ],
    correctIndexes: [0],
    explanation:
      "Analyzing very large data sets can surface patterns and correlations not visible in small samples. However, size does not remove bias, and privacy still must be protected.",
  },
  {
    id: "f-q21",
    bigIdea: 3,
    topic: "Procedures that return Booleans",
    stem: "Consider the following procedure and call.\n\nPROCEDURE isPassing(score)\n{\n  RETURN score >= 60\n}\n\nDISPLAY(isPassing(58))",
    choices: ["true", "false", "58", "60"],
    correctIndexes: [1],
    explanation:
      "The procedure returns the result of the comparison score >= 60. Since 58 >= 60 is false, the call returns and displays false.",
  },
  {
    id: "f-q22",
    bigIdea: 5,
    topic: "Filter bubbles and recommendation algorithms",
    stem: "A recommendation algorithm mostly shows users content similar to what they have already engaged with. Which of the following is a potential negative consequence?",
    choices: [
      "Users may be exposed to a narrower range of viewpoints, reinforcing existing beliefs (a \"filter bubble\").",
      "Users will automatically see perfectly balanced information on every topic.",
      "The algorithm guarantees that all recommended content is factually accurate.",
      "It makes the user's device run measurably faster.",
    ],
    correctIndexes: [0],
    explanation:
      "By favoring familiar content, recommendation systems can limit exposure to diverse perspectives, creating filter bubbles or echo chambers that reinforce existing views.",
  },
  {
    id: "f-q23",
    bigIdea: 2,
    topic: "Cleaning and organizing data",
    stem: "Before analyzing a large data set collected from an online form, an analyst removes duplicate entries and fixes inconsistent formatting (for example, \"NY\" versus \"New York\"). Why is this step important?",
    choices: [
      "Cleaning and standardizing data helps ensure the analysis produces accurate and meaningful results.",
      "It permanently encrypts the data so no one can read it.",
      "It converts the data set into a heuristic.",
      "It is required before a computer can connect to the Internet.",
    ],
    correctIndexes: [0],
    explanation:
      "Messy data (duplicates, inconsistent formats) can distort results. Cleaning and standardizing it improves the accuracy and usefulness of any analysis.",
  },
  {
    id: "f-q24",
    bigIdea: 3,
    topic: "Evaluating expressions",
    stem: "What value is displayed?\n\nDISPLAY(2 + 3 * 4)",
    choices: ["14", "20", "24", "9"],
    correctIndexes: [0],
    explanation:
      "Multiplication is performed before addition: 3 * 4 = 12, then 2 + 12 = 14.",
  },
  {
    id: "f-q25",
    bigIdea: 5,
    topic: "Crowdfunding",
    stem: "An inventor posts a prototype online and asks the public to contribute small amounts of money to help fund production. This use of the Internet to gather funding from many people is called",
    choices: ["crowdfunding.", "lossy compression.", "phishing.", "fault tolerance."],
    correctIndexes: [0],
    explanation:
      "Crowdfunding raises money from a large number of people, typically online. It is one way the Internet enables new forms of collaboration and support for projects.",
  },
  {
    id: "f-q26",
    bigIdea: 3,
    topic: "Loop iteration counting",
    stem: "How many times does the loop body execute?\n\nn ← 20\ncount ← 0\nREPEAT UNTIL (n < 3)\n{\n  n ← n - 5\n  count ← count + 1\n}\nDISPLAY(count)",
    choices: ["3", "4", "5", "6"],
    correctIndexes: [1],
    explanation:
      "n takes values 20, 15, 10, 5, 0 as the body runs, incrementing count to 1, 2, 3, 4. After n becomes 0, the condition (n < 3) is true, so the loop stops with count = 4.",
  },
  {
    id: "f-q27",
    bigIdea: 5,
    topic: "Positive impacts of computing",
    stem: "Which of the following is an example of computing having a positive impact on people's lives?",
    choices: [
      "Telemedicine apps let patients in remote areas consult doctors without traveling long distances.",
      "A program that runs slowly on older hardware.",
      "A file that is too large to send by email.",
      "A website that uses http instead of https.",
    ],
    correctIndexes: [0],
    explanation:
      "Telemedicine expands access to healthcare, especially for people far from providers. This illustrates how computing innovations can produce beneficial effects.",
  },
  {
    id: "f-q28",
    bigIdea: 3,
    topic: "Filtering a list",
    stem: "What does the following code display?\n\nnums ← [4, 9, 2, 7, 10]\nresult ← []\nFOR EACH x IN nums\n{\n  IF (x > 5)\n  {\n    APPEND(result, x)\n  }\n}\nDISPLAY(LENGTH(result))",
    choices: ["2", "3", "4", "5"],
    correctIndexes: [1],
    explanation:
      "Only values greater than 5 are appended: 9, 7, and 10. That is 3 elements, so LENGTH(result) is 3.",
  },
  {
    id: "f-q29",
    bigIdea: 4,
    topic: "Fault tolerance",
    stem: "A system is described as \"fault-tolerant.\" What does this mean?",
    choices: [
      "It can continue to operate correctly even when some of its components fail.",
      "It never requires any maintenance of any kind.",
      "It processes data faster than every other system.",
      "It stores all of its data using lossy compression.",
    ],
    correctIndexes: [0],
    explanation:
      "Fault tolerance is the ability of a system to keep working properly despite the failure of some parts. On the Internet, redundant paths contribute to fault tolerance.",
  },
  {
    id: "f-q30",
    bigIdea: 3,
    topic: "Abstraction with procedures",
    stem: "A programmer uses a built-in procedure sortList(list) to sort a list without knowing the details of how the sorting is implemented internally. This is an example of",
    choices: [
      "abstraction, because the procedure hides implementation details behind a simple interface.",
      "an overflow error caused by too many list elements.",
      "a logic error in the programmer's code.",
      "lossy compression of the list's data.",
    ],
    correctIndexes: [0],
    explanation:
      "Using a procedure by its name and inputs without needing to know how it works internally is procedural abstraction, which helps manage complexity.",
  },
  {
    id: "f-q31",
    bigIdea: 5,
    topic: "Digital footprint and permanence",
    stem: "A student posts a comment publicly online and deletes it a minute later. Why might this not fully remove the information?",
    choices: [
      "Content shared online can be copied, screenshotted, cached, or archived by others, so it may persist beyond the poster's control.",
      "Deleting a post is technically impossible on every system that exists.",
      "The comment is automatically turned into binary and therefore cannot be deleted.",
      "Only a government agency is allowed to delete online posts.",
    ],
    correctIndexes: [0],
    explanation:
      "Once information is shared online, others may have copied, cached, or archived it. This persistence is part of a person's digital footprint and is an important privacy consideration.",
  },
  {
    id: "f-q32",
    bigIdea: 3,
    topic: "Random values and simulation",
    stem: "A game simulates a fair coin flip using x ← RANDOM(1, 2), treating 1 as heads and 2 as tails. RANDOM(a, b) returns an integer from a to b inclusive, with each value equally likely. What is the probability the simulation produces heads?",
    choices: ["1/2", "1/3", "1/4", "0"],
    correctIndexes: [0],
    explanation:
      "RANDOM(1, 2) returns 1 or 2, each equally likely, so heads (value 1) occurs with probability 1/2.",
  },
  {
    id: "f-q33",
    bigIdea: 3,
    topic: "Algorithm equivalence",
    stem: "Two programmers write different algorithms that both take a list of numbers and return the sum of all the numbers, producing the same output for every possible input list. Which statement is true?",
    choices: [
      "The algorithms are functionally equivalent, even though their steps differ.",
      "Only the shorter of the two algorithms can be correct.",
      "Two different algorithms can never produce the same output.",
      "The algorithms must take the same number of steps for every input.",
    ],
    correctIndexes: [0],
    explanation:
      "Different algorithms can be functionally equivalent if they always produce the same output for the same input, even if their steps or efficiency differ.",
  },
  {
    id: "f-q34",
    bigIdea: 3,
    topic: "Accessing list elements with LENGTH",
    stem: "Lists are 1-indexed, and LENGTH(data) returns the number of elements in the list data. Which expression correctly accesses the last element of a nonempty list named data?",
    choices: [
      "data[LENGTH(data)]",
      "data[0]",
      "data[LENGTH(data) + 1]",
      "data[1]",
    ],
    correctIndexes: [0],
    explanation:
      "With 1-based indexing, valid positions run from 1 to LENGTH(data), so the last element is at position LENGTH(data). Index 0 is invalid, and LENGTH(data) + 1 is out of range.",
  },
  {
    id: "f-q35",
    bigIdea: 5,
    topic: "Protecting privacy and security",
    stem: "Which TWO of the following actions help a person protect their personal privacy and security online? Select two answers.",
    choices: [
      "Reviewing and limiting the permissions and data that apps are allowed to access.",
      "Posting their home address and daily schedule publicly.",
      "Using strong, unique passwords for different accounts.",
      "Turning off all software and security updates to avoid interruptions.",
    ],
    correctIndexes: [0, 2],
    explanation:
      "Limiting app permissions and using strong, unique passwords reduce risk. Publicly posting sensitive personal details and disabling security updates both increase vulnerability.",
  },
  {
    id: "f-q36",
    bigIdea: 3,
    topic: "Lists in pseudocode",
    stem: "Which TWO of the following statements about lists in AP CSP pseudocode are true? Select two answers.",
    choices: [
      "A list lets a single variable store an ordered collection of multiple values.",
      "In AP CSP pseudocode, the first element of a list is at index 1.",
      "A list can hold only one value at any given time.",
      "Removing an element from the middle of a list never changes the positions of the other elements.",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Lists store ordered collections, and AP CSP pseudocode uses 1-based indexing. Lists hold many values, and removing a middle element shifts later elements to fill the gap.",
  },
  {
    id: "f-q37",
    bigIdea: 4,
    topic: "Design of the Internet",
    stem: "Which TWO of the following are true about the design of the Internet? Select two answers.",
    choices: [
      "It uses open protocols that allow different devices and networks to communicate.",
      "It is built to be scalable, continuing to work as more devices are added.",
      "It relies on a single central computer that controls all traffic.",
      "It requires every message to travel along one fixed, unchangeable path.",
    ],
    correctIndexes: [0, 1],
    explanation:
      "The Internet is a decentralized network of networks that uses open protocols and is designed to scale. There is no single controlling computer, and packets can take different routes.",
  },
  {
    id: "f-q38",
    bigIdea: 2,
    topic: "Data representation",
    stem: "Which TWO of the following statements about how computers represent data are true? Select two answers.",
    choices: [
      "At the lowest level, computers represent all data (numbers, text, images, sound) using bits.",
      "A fixed number of bits can represent only a limited range of values, which can lead to overflow or rounding.",
      "Using more bits always makes a program run faster.",
      "Text and images cannot be represented in binary.",
    ],
    correctIndexes: [0, 1],
    explanation:
      "All digital data is ultimately stored as bits, and a fixed bit-width limits the values that can be represented (leading to overflow or round-off). More bits do not inherently increase speed, and text and images are represented in binary.",
  },
  {
    id: "f-q39",
    bigIdea: 3,
    topic: "Algorithmic efficiency and search",
    stem: "Which TWO of the following statements about algorithms and their efficiency are true? Select two answers.",
    choices: [
      "Binary search requires the list to be sorted, but it can be much faster than linear search on large lists.",
      "An algorithm whose running time grows exponentially is generally considered unreasonable for large inputs.",
      "Linear search requires the list to be sorted in order to work at all.",
      "Every problem can be solved by some algorithm in a reasonable amount of time.",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Binary search needs a sorted list but is very efficient, and exponential-time algorithms become unreasonable as inputs grow. Linear search works on unsorted lists, and some problems cannot be solved efficiently (or at all).",
  },
  {
    id: "f-q40",
    bigIdea: 5,
    topic: "Open data and its effects",
    stem: "A city government publishes anonymized public transit data online for anyone to use. Which TWO of the following are realistic effects of releasing such open data? Select two answers.",
    choices: [
      "Developers can build helpful apps, such as real-time arrival predictions, using the data.",
      "Researchers and residents can analyze the data to identify problems and propose improvements.",
      "Publishing the data guarantees that it can never be misused by anyone.",
      "Releasing open data automatically eliminates the digital divide.",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Open data enables useful applications and independent analysis that can benefit the public. However, it does not guarantee against misuse, and it does not by itself close gaps in access (the digital divide).",
  },
];

export const apCspFinalExam: ApCspExamConfig = {
  id: "csp-final",
  slug: "final",
  title: "Final Exam",
  subtitle: "40 AP-style multiple-choice questions · full exam simulation",
  suggestedMinutes: 70,
  xpReward: 400,
  badge: "CSP Finalist",
  questions,
};
