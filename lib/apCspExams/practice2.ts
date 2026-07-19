import type { ApCspExamConfig, ApCspExamQuestion } from "./types";

/**
 * Kanam Academy — AP CSP Prep · Practice Test 2
 * AP-style multiple-choice questions written for exam practice.
 * These are original Kanam prep items and are NOT official College Board questions.
 */

const questions: ApCspExamQuestion[] = [
  {
    id: "p2-q01",
    bigIdea: 1,
    topic: "Iterative development",
    stem: "A team releases a simple first version of an app, collects feedback from real users, fixes problems, and then adds features in repeated cycles. This approach is best described as",
    choices: [
      "iterative (incremental) development, in which the program is improved through repeated cycles of feedback and revision.",
      "proving the program correct before any code is written.",
      "skipping testing in order to save development time.",
      "writing the entire program at once and never changing it.",
    ],
    correctIndexes: [0],
    explanation:
      "Iterative, incremental development builds a program in repeated cycles of designing, implementing, testing, and revising based on feedback. It is central to how modern software is created and refined.",
  },
  {
    id: "p2-q02",
    bigIdea: 2,
    topic: "Correlation vs. causation",
    stem: "A city finds that neighborhoods with more coffee shops also tend to have higher average incomes. A reporter concludes that opening coffee shops raises residents' incomes. What is the best critique of this conclusion?",
    choices: [
      "The conclusion is valid because the data shows a clear pattern.",
      "A correlation between two variables does not by itself establish that one causes the other; another factor may explain both.",
      "The data must be wrong, because coffee has nothing to do with income.",
      "Higher income cannot possibly be related to the number of coffee shops.",
    ],
    correctIndexes: [1],
    explanation:
      "Correlation shows that two variables tend to move together, but it does not prove causation. A confounding factor (such as an area's overall level of development) could drive both, so the causal claim is unsupported.",
  },
  {
    id: "p2-q03",
    bigIdea: 3,
    topic: "String operations",
    stem: "SUBSTRING(str, start, length) returns the length characters of str beginning at position start, where the first character is position 1. What is displayed?\n\nword ← \"COMPUTER\"\nDISPLAY(SUBSTRING(word, 4, 3))",
    choices: ["COM", "MPU", "PUT", "UTE"],
    correctIndexes: [2],
    explanation:
      "Numbering from 1, position 4 is \"P\". Taking 3 characters starting there gives \"P\", \"U\", \"T\", which forms \"PUT\".",
  },
  {
    id: "p2-q04",
    bigIdea: 4,
    topic: "Redundancy and fault tolerance",
    stem: "The Internet is designed so that if one connection between two devices fails, data can often still reach its destination by another path. Which characteristic does this describe, and what benefit does it provide?",
    choices: [
      "Redundancy, which improves fault tolerance.",
      "Lossy compression, which reduces file size.",
      "A heuristic, which guarantees the single fastest route.",
      "Encryption, which hides the contents of messages.",
    ],
    correctIndexes: [0],
    explanation:
      "Having multiple possible paths (redundancy) means the network can keep working even when parts fail, which is what fault tolerance means. Compression, heuristics, and encryption address different concerns.",
  },
  {
    id: "p2-q05",
    bigIdea: 5,
    topic: "Data collection and targeted advertising",
    stem: "A social media platform builds detailed profiles of its users based on their activity and uses those profiles to show targeted advertisements. Which of the following best describes a concern raised by this practice?",
    choices: [
      "Users may not be aware of how much data is collected about them or how it is used.",
      "Targeted ads make every website load more slowly for everyone.",
      "Collecting user data makes it technically impossible to run the platform.",
      "Targeted advertising violates the rules of binary number representation.",
    ],
    correctIndexes: [0],
    explanation:
      "A major concern with large-scale data collection is transparency and consent: users often do not know what is gathered, how long it is kept, or with whom it is shared. This raises privacy and ethical questions.",
  },
  {
    id: "p2-q06",
    bigIdea: 1,
    topic: "Documentation and comments",
    stem: "Which of the following best explains why programmers add comments and documentation to their code?",
    choices: [
      "Comments make a program run measurably faster.",
      "Comments and documentation help people (including the author later) understand what the code does and why, making it easier to maintain and to collaborate.",
      "Comments are required for the program to run at all.",
      "Documentation automatically converts logic errors into syntax errors.",
    ],
    correctIndexes: [1],
    explanation:
      "Comments and documentation communicate intent to human readers. They support maintenance and collaboration but do not affect execution speed and are not required for a program to run.",
  },
  {
    id: "p2-q07",
    bigIdea: 2,
    topic: "Number bases (decimal to binary)",
    stem: "What is the binary (base-2) representation of the decimal number 20?",
    choices: ["10010", "10100", "11000", "01010"],
    correctIndexes: [1],
    explanation:
      "20 = 16 + 4 = (1 x 16) + (0 x 8) + (1 x 4) + (0 x 2) + (0 x 1), which is 10100 in binary.",
  },
  {
    id: "p2-q08",
    bigIdea: 3,
    topic: "Boolean expressions (AND / OR)",
    stem: "What is displayed by the following code?\n\na ← 6\nb ← 3\nIF ((a > 5) AND (b > 5))\n{\n  DISPLAY(\"both\")\n}\nELSE\n{\n  IF ((a > 5) OR (b > 5))\n  {\n    DISPLAY(\"one\")\n  }\n  ELSE\n  {\n    DISPLAY(\"none\")\n  }\n}",
    choices: ["both", "one", "none", "Nothing is displayed"],
    correctIndexes: [1],
    explanation:
      "a > 5 is true and b > 5 is false. (true AND false) is false, so the ELSE runs. There, (true OR false) is true, so \"one\" is displayed.",
  },
  {
    id: "p2-q09",
    bigIdea: 4,
    topic: "IP addressing and scalability",
    stem: "Why was the newer Internet Protocol version (IPv6) developed to use much longer addresses than the older IPv4?",
    choices: [
      "Longer addresses make individual web pages load faster.",
      "The supply of IPv4 addresses was becoming insufficient for the growing number of connected devices; IPv6 provides a vastly larger address space.",
      "Longer addresses automatically encrypt all Internet traffic.",
      "IPv6 removes the need for the Domain Name System.",
    ],
    correctIndexes: [1],
    explanation:
      "IPv4 has a limited number of addresses that was being exhausted as more devices connected. IPv6 uses longer addresses to provide an enormous address space, supporting the Internet's continued growth (scalability).",
  },
  {
    id: "p2-q10",
    bigIdea: 5,
    topic: "Bias in computing systems",
    stem: "A facial-recognition system is found to perform much less accurately for some demographic groups than for others. Which is the most likely explanation and the most appropriate response?",
    choices: [
      "The training data underrepresented some groups, so developers should improve the data and test the system across groups.",
      "Computers cannot be biased, so no action is needed.",
      "The problem can be solved only by displaying the images at a larger size.",
      "Facial recognition always works equally well for everyone, regardless of the data used to build it.",
    ],
    correctIndexes: [0],
    explanation:
      "Systems learn from their training data. If some groups are underrepresented, accuracy can suffer for those groups. Responsible development includes gathering representative data and testing performance across different groups.",
  },
  {
    id: "p2-q11",
    bigIdea: 1,
    topic: "Logic vs. syntax errors",
    stem: "A program runs without crashing, but it always reports an average that is too large. The programmer discovers that she divided the total by the wrong count of items. What type of error is this?",
    choices: [
      "A syntax error, because otherwise the program would not run.",
      "A logic error, because the program runs but produces incorrect results due to a flaw in the algorithm.",
      "An overflow error caused by using too many bits.",
      "A network error caused by the Internet connection.",
    ],
    correctIndexes: [1],
    explanation:
      "A logic error lets the program run but produces wrong output because the algorithm itself is flawed. A syntax error would prevent the program from running at all.",
  },
  {
    id: "p2-q12",
    bigIdea: 2,
    topic: "Analog to digital (sampling)",
    stem: "To store a sound (an analog signal) on a computer, the sound wave is measured at regular time intervals and each measurement is recorded as a number. This process is best described as",
    choices: [
      "sampling, which converts a continuous analog signal into discrete digital data.",
      "lossless compression of a text file.",
      "encrypting the sound so it cannot be played back.",
      "a heuristic for finding the loudest note.",
    ],
    correctIndexes: [0],
    explanation:
      "Sampling measures an analog signal at intervals and stores each measurement digitally. More frequent, more precise samples produce a more faithful (but larger) digital representation.",
  },
  {
    id: "p2-q13",
    bigIdea: 3,
    topic: "Nested loops",
    stem: "How many times is the DISPLAY statement executed?\n\nREPEAT 3 TIMES\n{\n  REPEAT 4 TIMES\n  {\n    DISPLAY(\"*\")\n  }\n}",
    choices: ["7", "12", "4", "3"],
    correctIndexes: [1],
    explanation:
      "The inner loop runs 4 times for each of the 3 runs of the outer loop: 3 x 4 = 12 total executions.",
  },
  {
    id: "p2-q14",
    bigIdea: 5,
    topic: "Environmental impact of computing",
    stem: "Which of the following is an example of a negative environmental impact of computing?",
    choices: [
      "Electronic waste from discarded devices can release harmful materials if it is not recycled properly.",
      "Programs written in pseudocode cannot be compiled.",
      "Representing data in binary requires more electricity than representing it in decimal.",
      "Cloud storage eliminates the need for any physical hardware.",
    ],
    correctIndexes: [0],
    explanation:
      "Manufacturing and discarding devices produces electronic waste (e-waste) and consumes energy and materials. Improper disposal can release toxic substances, an important environmental consideration in computing.",
  },
  {
    id: "p2-q15",
    bigIdea: 2,
    topic: "Extracting information from data",
    stem: "A store has a spreadsheet listing every transaction from the past year. The manager wants to know which single product sold the most units. Which of the following describes an appropriate use of the data?",
    choices: [
      "Filtering and aggregating the transactions to total the units sold per product, then identifying the maximum.",
      "Deleting rows at random until only one product's transactions remain.",
      "Converting each price to binary and adding up the individual bits.",
      "Answering without examining the data, since collecting more data always reduces insight.",
    ],
    correctIndexes: [0],
    explanation:
      "Useful information is extracted from raw data by organizing, filtering, and aggregating it (here, summing units per product and finding the largest total). The other options do not correctly analyze the data.",
  },
  {
    id: "p2-q16",
    bigIdea: 3,
    topic: "Iteration (FOR EACH)",
    stem: "What value is displayed?\n\nnums ← [4, 7, 2, 9]\ntotal ← 0\nFOR EACH n IN nums\n{\n  total ← total + n\n}\nDISPLAY(total)",
    choices: ["18", "22", "9", "4"],
    correctIndexes: [1],
    explanation:
      "FOR EACH visits every element, adding it to total: 4 + 7 + 2 + 9 = 22.",
  },
  {
    id: "p2-q17",
    bigIdea: 5,
    topic: "Protecting data from loss",
    stem: "Which of the following is the best practice for protecting important digital files from accidental loss?",
    choices: [
      "Keeping regular backups in more than one location.",
      "Storing the only copy on a single device and never updating it.",
      "Emailing the files to strangers so someone else has a copy.",
      "Permanently disabling all software and security updates.",
    ],
    correctIndexes: [0],
    explanation:
      "Regular backups stored in multiple locations protect against hardware failure, loss, or damage. Relying on a single copy, sharing with untrusted parties, or disabling updates all increase risk.",
  },
  {
    id: "p2-q18",
    bigIdea: 3,
    topic: "Reasonable vs. unreasonable time",
    stem: "Two algorithms solve the same problem. Algorithm A takes about n^2 steps and Algorithm B takes about 2^n steps for an input of size n. As n becomes large, which statement is true?",
    choices: [
      "Algorithm B is always faster because 2 is smaller than n.",
      "Algorithm A runs in a reasonable amount of time, while Algorithm B grows so quickly that it becomes unreasonable for large inputs.",
      "Both algorithms take the same amount of time for every input.",
      "Neither algorithm can ever finish running.",
    ],
    correctIndexes: [1],
    explanation:
      "Running times that grow like a polynomial (n^2) are considered reasonable, while exponential growth (2^n) quickly becomes unreasonable as n increases, because the number of steps explodes.",
  },
  {
    id: "p2-q19",
    bigIdea: 5,
    topic: "Plagiarism and citing sources",
    stem: "A student copies several paragraphs from a website into a report and presents them as their own writing, with no citation. This is an example of",
    choices: [
      "plagiarism, which is unethical and can violate academic rules and copyright.",
      "crowdsourcing.",
      "lossless compression.",
      "fault tolerance.",
    ],
    correctIndexes: [0],
    explanation:
      "Presenting someone else's work as your own without credit is plagiarism. Ethical and legal use of others' work requires proper attribution and, when required, permission.",
  },
  {
    id: "p2-q20",
    bigIdea: 3,
    topic: "Undecidable problems",
    stem: "Which of the following best characterizes an undecidable problem?",
    choices: [
      "A problem that is merely slow but can always be solved given enough time.",
      "A problem for which no algorithm can be written that produces a correct yes-or-no answer for every possible input.",
      "A problem that requires more memory than any single computer currently has.",
      "A problem that can only be solved by using the Internet.",
    ],
    correctIndexes: [1],
    explanation:
      "An undecidable problem cannot be solved by any algorithm that always gives a correct answer for all inputs. This is different from a problem that is simply slow or resource-intensive.",
  },
  {
    id: "p2-q21",
    bigIdea: 3,
    topic: "Simulations",
    stem: "A scientist uses a computer program to model how a disease might spread through a population under different conditions. Which of the following is a genuine advantage of using such a simulation?",
    choices: [
      "It can test many scenarios quickly and safely without the cost or risk of real-world experiments.",
      "It predicts exactly what will happen in reality with perfect accuracy.",
      "It removes the need to make any assumptions about the real system.",
      "It proves that the disease will behave identically every single time.",
    ],
    correctIndexes: [0],
    explanation:
      "Simulations are simplified models based on assumptions. Their strength is enabling fast, safe, repeatable exploration of many scenarios, but they are approximations and do not guarantee perfectly accurate predictions.",
  },
  {
    id: "p2-q22",
    bigIdea: 5,
    topic: "Accessibility",
    stem: "A developer adds screen-reader support, captions for videos, and adjustable text size to an app. This is an example of designing for",
    choices: [
      "accessibility, so the app can be used by people with a wider range of abilities.",
      "lossy compression of the app's images.",
      "redundancy within the network.",
      "an undecidable problem.",
    ],
    correctIndexes: [0],
    explanation:
      "Accessibility features help make software usable by people with differing abilities (for example, vision or hearing differences). Designing for accessibility broadens who can benefit from a computing innovation.",
  },
  {
    id: "p2-q23",
    bigIdea: 3,
    topic: "Binary search efficiency",
    stem: "Binary search is performed on a sorted list of 64 elements. In the worst case, about how many times can the searched portion be cut in half before only one element remains?",
    choices: ["6", "32", "64", "8"],
    correctIndexes: [0],
    explanation:
      "Each step of binary search halves the remaining elements: 64, 32, 16, 8, 4, 2, 1. That is 6 halvings, which matches log-base-2 of 64 = 6.",
  },
  {
    id: "p2-q24",
    bigIdea: 3,
    topic: "Procedural abstraction",
    stem: "A programmer notices that the same block of code for calculating shipping cost appears in five different places. She moves that code into a single procedure and calls the procedure in each place. What is the primary benefit of this change?",
    choices: [
      "It manages complexity: the logic is written once, is easier to update, and reduces the chance of inconsistent copies.",
      "It guarantees the program will run exactly five times faster.",
      "It converts the program's numbers from binary to decimal.",
      "It removes any need to test the shipping calculation.",
    ],
    correctIndexes: [0],
    explanation:
      "Procedural abstraction lets a programmer write logic once and reuse it, which reduces duplication, eases maintenance, and lowers the risk of inconsistent copies. It does not guarantee speed gains or remove the need for testing.",
  },
  {
    id: "p2-q25",
    bigIdea: 3,
    topic: "Off-by-one errors",
    stem: "A programmer wants to display the numbers 1 through 10, but the code below displays only 1 through 9.\n\ni ← 1\nREPEAT UNTIL (i = 10)\n{\n  DISPLAY(i)\n  i ← i + 1\n}\n\nWhich change correctly makes it display 1 through 10?",
    choices: [
      "Change the condition to REPEAT UNTIL (i > 10).",
      "Change the starting value to i ← 0.",
      "Move DISPLAY(i) to after i ← i + 1.",
      "Remove the DISPLAY(i) statement entirely.",
    ],
    correctIndexes: [0],
    explanation:
      "With the condition (i = 10), the loop stops as soon as i becomes 10, before 10 is displayed (an off-by-one error). Using (i > 10) allows 10 to be displayed before the loop ends.",
  },
  {
    id: "p2-q26",
    bigIdea: 4,
    topic: "Bandwidth",
    stem: "Two networks carry data between the same two cities. Network X can transfer more bits per second than Network Y. The measure describing the maximum amount of data that can be sent through a connection in a fixed amount of time is called",
    choices: ["bandwidth.", "latency.", "redundancy.", "metadata."],
    correctIndexes: [0],
    explanation:
      "Bandwidth is the maximum rate of data transfer, often measured in bits per second. Latency is the delay before a transfer begins; redundancy and metadata describe different concepts.",
  },
  {
    id: "p2-q27",
    bigIdea: 4,
    topic: "Web protocols (HTTP/HTTPS)",
    stem: "Which TWO of the following statements about protocols used on the Internet and the Web are true? Select two answers.",
    choices: [
      "HTTP and HTTPS are protocols used to request and transfer web pages between a browser and a server.",
      "HTTPS adds encryption so that data exchanged with the site is protected while in transit.",
      "A protocol is the physical cable that connects two computers together.",
      "HTTPS makes any website load instantly, regardless of connection speed.",
    ],
    correctIndexes: [0, 1],
    explanation:
      "HTTP/HTTPS are agreed-upon rules for transferring web content, and HTTPS layers on encryption to protect data in transit. A protocol is a set of rules, not a physical cable, and HTTPS does not change load speed by itself.",
  },
  {
    id: "p2-q28",
    bigIdea: 3,
    topic: "Procedures and abstraction",
    stem: "Which TWO of the following statements about using procedures (functions) in a program are true? Select two answers.",
    choices: [
      "A procedure can be given parameters so that it works with different input values each time it is called.",
      "Using a clearly named procedure can make a program easier to read and manage through abstraction.",
      "A procedure can only ever be called once in an entire program.",
      "Procedures make it impossible to reuse any code.",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Parameters let a procedure operate on different inputs, and naming a procedure well hides detail behind a meaningful name (abstraction), improving readability. Procedures can be called many times and are a key tool for code reuse.",
  },
  {
    id: "p2-q29",
    bigIdea: 5,
    topic: "Beneficial and harmful effects",
    stem: "A new app lets users quickly share short videos with a very large audience. Which TWO of the following accurately describe possible effects of such a computing innovation? Select two answers.",
    choices: [
      "It can give creators new ways to reach audiences and build communities.",
      "It can be used to rapidly spread misinformation or harmful content.",
      "It guarantees that all shared information is accurate.",
      "It removes any possibility of privacy concerns for its users.",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Computing innovations often have both beneficial and harmful effects. Wide, fast sharing can empower creators and communities but can also accelerate the spread of misinformation, and it does not guarantee accuracy or eliminate privacy concerns.",
  },
  {
    id: "p2-q30",
    bigIdea: 2,
    topic: "Lossy vs. lossless compression",
    stem: "A streaming service must decide how to compress its video and audio files. Which TWO of the following statements about lossy and lossless compression are true? Select two answers.",
    choices: [
      "Lossy compression can achieve smaller file sizes by permanently discarding some data.",
      "Lossless compression allows the exact original data to be reconstructed.",
      "Lossy compression always produces larger files than lossless compression.",
      "Lossless compression permanently removes data that can never be recovered.",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Lossy compression discards data to shrink files (useful for streaming), while lossless compression preserves everything so the original can be restored exactly. Lossy files are generally smaller, not larger, than lossless.",
  },
];

export const apCspPracticeExam2: ApCspExamConfig = {
  id: "csp-practice-2",
  slug: "practice-2",
  title: "Practice Test 2",
  subtitle: "30 AP-style multiple-choice questions · all five Big Ideas",
  suggestedMinutes: 50,
  xpReward: 250,
  badge: "Practice Ace II",
  questions,
};
