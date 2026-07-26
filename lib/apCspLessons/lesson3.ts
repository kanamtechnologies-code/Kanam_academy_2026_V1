import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson3: AILessonConfig = {
  id: "csp-3",
  title: "3. Bits, Binary & Data Abstraction",
  goal: "Explain how computers represent all data with bits, convert binary and decimal, and reason about abstraction.",
  xpReward: 150,
  badge: "Bit Builder",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/2",
  nextHref: "/learn/ap-csp-prep/4",
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Big Idea 2",
        title: "Everything is bits",
        image: "/images/lessons/dl-2.png",
        imageAlt: "Digital data stored and represented across devices",
        body: `Numbers, text, images, audio, video — every kind of data a computer stores is ultimately a sequence of **bits**. A **bit** (binary digit) has one of two values, written \`0\` or \`1\`. Data (Big Idea 2) is 17–22% of the AP multiple-choice exam, so fluency here pays off across the whole test.

Why two values? Hardware reliably distinguishes two states (on/off, high/low voltage) far more cheaply than ten. So computers use **binary** (base‑2) instead of the base‑10 we use by hand.`,
      },
      {
        id: "bits-bytes",
        kicker: "Units",
        title: "Bits, bytes, and combinations",
        body: `A group of 8 bits is a **byte**. The key idea the exam tests: **n bits can represent 2ⁿ distinct values.**

| Bits | Distinct values (2ⁿ) |
| --- | --- |
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |
| 8 | 256 |

So one byte (8 bits) can represent 256 different values — for example the whole numbers 0 through 255. If you need more values than a given number of bits allows, you must add bits.`,
        code: `# Each extra bit DOUBLES the number of values
1 bit  -> 2^1 = 2      values
2 bits -> 2^2 = 4      values
3 bits -> 2^3 = 8      values
4 bits -> 2^4 = 16     values
8 bits -> 2^8 = 256    values (one byte -> 0..255)`,
        codeCaption: "n bits represent 2^n values - each bit doubles the range",
        checkIn: check(
          "How many distinct values can be represented with 4 bits?",
          ["4", "8", "16", "32"],
          2,
          "n bits represent 2ⁿ values, and 2⁴ = 16.",
        ),
      },
      {
        id: "binary-to-decimal",
        kicker: "Convert",
        title: "Reading a binary number",
        body: `In binary, each place is a power of two, doubling right to left: 1, 2, 4, 8, 16, 32, 64, 128…

To convert to decimal, add the place values where a \`1\` appears. Read binary as "which powers of two are switched on."`,
        code: `Binary:   1   0   1   1
Place:    8   4   2   1
On?       +8  +0  +2  +1
                       = 11`,
        codeCaption: "Add the place values wherever a 1 appears",
        output: "1011 (binary) = 11 (decimal)",
        examples: [
          {
            caption: "The same idea as a tiny loop: shift left, add next bit",
            code: `bits = "1011"
value = 0
for b in bits:
    value = value * 2 + int(b)   # shift left, add bit
print(value)`,
            output: "11",
          },
        ],
      },
      {
        id: "decimal-to-binary",
        kicker: "Convert",
        title: "Writing a decimal number in binary",
        body: `Going the other way, subtract the largest power of two that fits, and repeat.

Subtract the largest power of two that fits, mark that place a \`1\`, and repeat with the remainder.`,
        code: `Convert 22 to binary   (places: 16 8 4 2 1)
22 - 16 = 6    -> 16 place = 1
 6 -  4 = 2    ->  8 place = 0,  4 place = 1
 2 -  2 = 0    ->  2 place = 1,  1 place = 0

check: 16 + 4 + 2 = 22`,
        codeCaption: "Decimal to binary: subtract the biggest power that fits, repeat",
        output: "22 (decimal) = 10110 (binary)",
        checkIn: check(
          "What is the decimal value of the binary number 1101?",
          ["11", "13", "14", "26"],
          1,
          "8 + 4 + 0 + 1 = 13.",
        ),
      },
      {
        id: "overflow",
        kicker: "Limits",
        title: "Overflow and roundoff errors",
        body: `Because a fixed number of bits can only hold 2ⁿ values, computation can hit limits:

- **Overflow error:** the result is too large for the allotted bits, so it wraps around or errors.
- **Roundoff (rounding) error:** many real numbers can't be stored exactly in a fixed number of bits, so they're approximated.

Work the overflow numbers so the idea sticks. Suppose a counter uses **8 bits**. That gives 2⁸ = 256 values, i.e. the whole numbers **0 through 255**. Now add 1 to the maximum:

- 255 in binary is \`11111111\`. Add 1 and every bit carries: the true answer \`100000000\` needs a **9th bit** that doesn't exist. The stored result drops the lost bit and becomes \`00000000\` = **0**. The value "rolled over," like a car odometer going from 999999 back to 000000.

Roundoff is different: the value fits, but not *exactly*. In binary, 0.1 has no finite representation (the same way 1/3 = 0.333… never ends in base 10), so the computer stores the closest value it can. Do arithmetic on those tiny approximations and the error becomes visible: **0.1 + 0.2 stores as 0.30000000000000004**, not exactly 0.3.

The AP exam expects you to recognize that both errors come from the **finite** representation of data, not from a coding mistake — and to name them correctly.`,
        code: `# OVERFLOW (8-bit counter can only hold 0..255)
  11111111   = 255  (the maximum)
+        1
----------
 100000000   = 256, but the 9th bit has nowhere to go
  00000000   = 0    <- stored result "rolls over"

# ROUNDOFF: 0.1 and 0.2 aren't exact in binary
0.1 + 0.2  ->  0.30000000000000004  (tiny approximation)`,
        codeCaption: "Overflow = too big for the bits (rolls over); roundoff = finite precision",
        output: "255 + 1 -> 0 (overflow) | 0.1 + 0.2 -> 0.30000000000000004 (roundoff)",
        callout: {
          label: "On the AP exam",
          text: "If a question describes a value getting too big for its storage, name it an *overflow* error; if it's about tiny decimal inaccuracies, name it a *roundoff* error.",
        },
      },
      {
        id: "text",
        kicker: "Encoding",
        title: "Representing text with numbers",
        body: `Text is stored by mapping each character to a number, then storing that number in binary. Standards like **ASCII** and **Unicode** define these mappings.

For example, in ASCII the letter \`A\` is 65 and \`a\` is 97. So "the same bits mean text" only because everyone agrees on the mapping. Change the interpretation and the same bits could be a number, a color, or a sound sample.

This is a first taste of **abstraction**: the bits don't "know" they're a letter — the meaning comes from the layer we build on top.`,
        code: `# Text = numbers (ASCII) = binary
char   'A'    'a'    'H'   'i'
ASCII   65     97     72   105
binary 1000001 1100001 ...

# Same bits, different interpretation:
01000001  ->  "A"  (as text)
01000001  ->  65   (as a number)`,
        codeCaption: "Bits only mean 'A' because everyone agrees on the ASCII mapping",
        output: "'A' -> 65 -> 01000001",
      },
      {
        id: "analog-digital",
        kicker: "Sampling",
        title: "Turning analog into digital",
        body: `The real world (sound, light) is **analog** — continuously varying. Computers store it **digitally** by **sampling**: measuring the signal at regular intervals and recording each measurement as a number.

Two dials control quality, and both are trade-offs against size:

- **Sample rate** — how *often* you measure. Sample more frequently and you capture faster changes in the signal, so the copy sounds/looks closer to the original.
- **Bit depth** — how many *bits per sample*. More bits let each measurement be more precise (more possible values).

There is no free lunch: **more samples and more bits per sample = a more faithful copy, but a larger file.** A rough size estimate makes the trade concrete. Say you record 1 second of audio:

- at 8,000 samples/sec × 8 bits = 64,000 bits (~8 KB) — small, but noticeably rougher.
- at 44,100 samples/sec × 16 bits = 705,600 bits (~88 KB) — CD quality, over **10× larger**.

Same second of sound; the higher-fidelity version simply costs more storage. A photo works the same way — it is a grid of **pixels**, each pixel a set of numbers for color, and more pixels (higher resolution) means a bigger file. This fidelity-vs-size tension is exactly what **compression** manages in Lesson 4.`,
        code: `# Sampling: measure the wave at regular intervals
analog wave:  ~~~~/^^^\\~~~~   (smooth, continuous)

time    0    1    2    3    4
sample  2    6    9    6    2   <- numbers stored

# 1 second of audio (size = rate x bit depth):
  8000/s  x  8 bits  =    64,000 bits (~8 KB)   rougher
 44100/s  x 16 bits  =   705,600 bits (~88 KB)  CD quality
# more samples + more bits per sample = closer copy, bigger file`,
        codeCaption: "Higher sample rate and bit depth = better quality but bigger file",
        checkIn: check(
          "Converting a continuous sound wave into a sequence of numeric measurements at regular intervals is called:",
          ["compression", "sampling", "encryption", "overflow"],
          1,
          "Sampling measures an analog signal at intervals to create a digital representation.",
        ),
      },
      {
        id: "abstraction-def",
        kicker: "Core idea",
        title: "What abstraction really means",
        body: `**Abstraction** is managing complexity by hiding details and exposing only what's needed at a given level. It is one of the most important ideas in all of computer science and appears throughout the AP exam.

Layers of abstraction in data:
- **Bit** → **byte** → **number/character** → **string/pixel** → **image/document**

Each layer lets you work without thinking about the one below. You edit a photo without manipulating individual bits; you type a sentence without computing ASCII codes.

Here is the key takeaway to say out loud on the exam: **abstraction hides the underlying bit patterns, so a programmer can ignore them when they aren't useful.** When you write \`name ← "Mia"\` you do not think about the ASCII codes 77, 105, 97, and you certainly don't think about the binary \`01001101…\` — the string abstraction lets you work at the level of "a name." The bits are still there; abstraction just frees your attention for the problem you actually care about. (You *drop down* to the bit level only when it matters — e.g., choosing how many bits a value needs.)`,
      },
      {
        id: "abstraction-levels",
        kicker: "Layers",
        title: "Data abstraction in programs",
        body: `Programs use **data abstraction** to represent complex things with simpler names. Instead of tracking three separate variables \`x\`, \`y\`, \`z\` for a point, you might use one \`point\` that bundles them.

| Level | Example |
| --- | --- |
| Low | Individual bits and bytes |
| Middle | Numbers, characters, booleans |
| High | Lists, records, images, "a student" |

Higher-level abstractions make programs easier to read and change — you reason about "the student's grades" instead of raw memory.`,
        code: `# Each layer hides the one below it
image / document        <- you edit this
    string / pixel
        number / char
            byte
                bit      <- you never touch this directly

# Data abstraction: bundle related values under one name
student = { name: "Mia", grades: [90, 85, 88] }
# reason about "student.grades", not raw memory`,
        codeCaption: "Abstraction layers: work up here, ignore the details below",
        checkIn: check(
          "What is the primary purpose of abstraction in computing?",
          [
            "To make programs run on less electricity",
            "To manage complexity by hiding details and exposing only what's needed",
            "To guarantee a program has no logic errors",
            "To convert all data into decimal",
          ],
          1,
          "Abstraction hides lower-level detail so you can reason at a higher, simpler level.",
        ),
      },
      {
        id: "why-binary-matters",
        kicker: "Connect",
        title: "Why representation choices matter",
        body: `The number of bits you allot decides what's even possible. A system that stores ages in 7 bits can represent 0–127; store a "years since 1900" field in too few bits and you get a real-world bug (the kind behind the Y2K scare).

Choosing a representation is a design decision with consequences for range, precision, storage, and speed — exactly the kind of trade-off reasoning AP questions reward.`,
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "How many bits do you need?",
        body: `A school has up to 900 students and wants each to have a unique ID number in binary. How many bits are required?

Find the smallest n where 2ⁿ ≥ 900. Since 2⁹ = 512 (too few) and 2¹⁰ = 1024 (enough), you need **10 bits**. This "smallest power of two that fits" reasoning is a classic exam pattern.`,
        code: `Need unique IDs for 900 students
Find smallest n with 2^n >= 900:
  2^9  = 512    too few  (< 900)
  2^10 = 1024   enough   (>= 900)  <-- answer`,
        codeCaption: "Bits needed = smallest power of two that fits the count",
        output: "10 bits",
        checkIn: check(
          "A code needs to represent 500 unique items. What is the minimum number of bits required?",
          ["8 bits", "9 bits", "10 bits", "16 bits"],
          1,
          "2⁸ = 256 (too few) and 2⁹ = 512 (≥ 500), so 9 bits is the minimum.",
        ),
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "From bits to meaning",
        body: `You can now explain that all data is bits, convert between binary and decimal, and reason about the limits (overflow, roundoff) and layers (abstraction) that turn raw 0s and 1s into meaningful information.

Next you'll build on this to study how data gets compressed, described by metadata, and analyzed to produce insight — and how bias can creep in.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Explain a representation choice",
        body: `Pick something a program might store (a color, a grade, a timestamp). Describe how it could be represented in bits and one consequence of allotting too few bits for it.`,
      },
    ],
  },
  bigIdeas: [
    "**All data is bits** — numbers, text, images, and sound are all sequences of 0s and 1s interpreted by a convention.",
    "n bits represent 2ⁿ distinct values; too few bits causes overflow, and finite precision causes roundoff error.",
    "Analog signals become digital through **sampling**; more samples/bits means higher fidelity but larger size.",
    "**Abstraction** manages complexity by hiding lower-level details and exposing only what's needed at each level.",
  ],
  keyTerms: [
    { term: "Bit", definition: "A binary digit with value 0 or 1 — the smallest unit of data." },
    { term: "Byte", definition: "A group of 8 bits, able to represent 256 distinct values." },
    { term: "Binary (base-2)", definition: "A number system using only 0 and 1, with place values that are powers of two." },
    { term: "Overflow error", definition: "An error when a value is too large for its allotted number of bits." },
    { term: "Sampling", definition: "Measuring an analog signal at regular intervals to represent it digitally." },
    { term: "Abstraction", definition: "Managing complexity by hiding details and exposing only what's needed at a level." },
  ],
  realWorld:
    "Image, music, and video formats all rest on these ideas: pixels and audio samples are numbers in binary, and file size versus quality is a bits-per-sample trade-off.",
  quiz: [
    {
      id: "q1",
      question: "How many distinct values can be represented with 6 bits?",
      choices: ["12", "32", "64", "128"],
      correctIndex: 2,
      explanation: "2⁶ = 64.",
    },
    {
      id: "q2",
      question: "What is the decimal value of binary 10010?",
      choices: ["9", "18", "20", "24"],
      correctIndex: 1,
      explanation: "16 + 0 + 0 + 2 + 0 = 18.",
    },
    {
      id: "q3",
      question: "Which is the binary representation of decimal 25?",
      choices: ["10011", "11001", "11010", "10101"],
      correctIndex: 1,
      explanation: "16 + 8 + 1 = 25, which is 11001.",
    },
    {
      id: "q4",
      question: "A counter stored in a fixed number of bits reaches its maximum and the next increment fails or wraps. This is best described as:",
      choices: ["a roundoff error", "an overflow error", "a syntax error", "a sampling error"],
      correctIndex: 1,
      explanation: "Exceeding the largest value the bits can hold is an overflow error.",
    },
    {
      id: "q5",
      question: "Why can a computer store 0.1 + 0.2 as a value slightly different from 0.3?",
      choices: [
            "Because some decimals can't be represented exactly in finite bits (roundoff)",
            "Because the program has a syntax error” belongs to a different situation than the one in the question stem",
            "Because binary cannot represent any fractions” belongs to a different situation than the one in the question stem",
            "Because of an overflow error” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation: "Finite precision means some real numbers are approximated — a roundoff error.",
    },
    {
      id: "q6",
      question: "Recording a continuous audio signal as numeric measurements taken 44,100 times per second is an example of:",
      choices: ["abstraction", "sampling", "compression", "encryption"],
      correctIndex: 1,
      explanation: "Taking measurements at regular intervals to digitize an analog signal is sampling.",
    },
    {
      id: "q7",
      question: "A system must give unique binary IDs to up to 2,000 devices. Minimum bits needed?",
      choices: ["10 bits", "11 bits", "12 bits", "16 bits"],
      correctIndex: 1,
      explanation: "2¹⁰ = 1024 (too few), 2¹¹ = 2048 (≥ 2000), so 11 bits.",
    },
    {
      id: "q8",
      question: "Treating a photo as 'an image you can crop' rather than millions of individual bits is an example of:",
      choices: [
            "an overflow error” belongs to a different situation than the one in the question stem",
            "sampling the image” belongs to a different situation than the one in the question stem",
            "abstraction hiding lower-level detail",
            "a logic error” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation: "Working at the 'image' level while ignoring raw bits is abstraction.",
    },
  ],
  reflection: {
    prompt:
      "On the AP exam you must reason about representation limits. Choose a real value (a price, a color, a coordinate) and explain how many bits it might need and one consequence of choosing too few.",
    placeholder: "The value, an estimated bit count, and a consequence of under-allocating…",
  },
};
