import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson4: AILessonConfig = {
  id: "csp-4",
  title: "4. Compression, Metadata, Bias & Insight from Data",
  goal: "Compare compression methods, use metadata, extract insight from data, and spot bias in datasets and conclusions.",
  xpReward: 200,
  badge: "Data Decoder",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/3",
  nextHref: "/learn/ap-csp-prep/5",
  instructorScript: `**Coach's note**
Today's lesson: **Compression, Metadata, Bias & Insight from Data**.

**Goal:** Compare compression methods, use metadata, extract insight from data, and spot bias in datasets and conclusions.

**How to facilitate**
1. Warm-up: ask students what they already think about "Data is only useful when we can move, store, and understand it".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Big Idea 2",
        title: "Data is only useful when we can move, store, and understand it",
        body: `Lesson 3 showed everything is bits. This lesson covers what we *do* with those bits: shrink them with **compression**, describe them with **metadata**, and mine them for **insight** — while staying alert to **bias**. These are heavily tested Big Idea 2 topics and central to the Impact of Computing later.`,
      },
      {
        id: "compression-why",
        kicker: "Compression",
        title: "Why compress?",
        body: `**Compression** reduces the number of bits needed to store or transmit data. Smaller data means faster downloads, cheaper storage, and less bandwidth. The AP exam distinguishes two categories:

- **Lossless compression** — the original data can be reconstructed *exactly*.
- **Lossy compression** — some data is permanently discarded to save more space; the original cannot be perfectly restored.`,
      },
      {
        id: "lossless-lossy",
        kicker: "Compare",
        title: "Lossless vs. lossy: choosing correctly",
        body: `The right choice depends on **whether every bit matters**.

| | Lossless | Lossy |
| --- | --- | --- |
| Can restore original exactly? | Yes | No |
| Typical size reduction | Smaller | Much smaller |
| Good for | Text, code, spreadsheets, ZIP | Photos, streaming audio/video |

**When lossy is appropriate:** photos, music, and video. Human eyes and ears can't perceive every detail, so discarding the least-noticeable information (subtle color shifts, frequencies you can't hear) shrinks the file dramatically while looking or sounding "close enough." A streamed movie or a JPEG photo is lossy — and that's fine, because no one needs the *exact* original pixel values.

**When you must use lossless:** text, source code, spreadsheets, executable programs, and financial or medical records. Here **every character or digit carries meaning**, so an approximation is worthless — or dangerous. A source file that is "about right" won't compile; a bank balance that is "about right" is a bug; changing one character of a contract changes its meaning. If losing *any* bit would corrupt the data's purpose, lossless is the only acceptable choice.

The trade-off in one line: **lossy buys much smaller files by throwing detail away; lossless keeps everything but saves less.**`,
        code: `LOSSLESS  original --compress--> decompress --> EXACT original
          use for: text, code, spreadsheets, .zip, .png

LOSSY     original --compress--> decompress --> CLOSE, not exact
          use for: photos (.jpg), streaming audio/video

# rule: if every bit must survive -> lossless only`,
        codeCaption: "Lossless restores exactly; lossy trades detail for smaller size",
        checkIn: check(
          "A programmer needs to compress a folder of source code files for backup. Which type should they use and why?",
          [
            "Lossy, because it makes files smallest",
            "Lossless, because the code must be restored exactly",
            "Either one works equally well for code",
            "Neither — code cannot be compressed",
          ],
          1,
          "Code must be reconstructed perfectly, so only lossless compression is acceptable.",
        ),
      },
      {
        id: "how-lossless",
        kicker: "Mechanism",
        title: "How lossless compression can work",
        body: `One simple lossless idea is **run-length encoding**: replace runs of repeated values with a count. The decoder expands the code back to the exact original — nothing is lost. Real algorithms are more sophisticated, but the principle is the same: **find and remove redundancy** without discarding information.`,
        code: `Original:  WWWWWWWWWWBBBB   (14 characters)
Encoded:   10W4B            ( 5 characters)
           ^^  ^
           |   run of 4 B's
           run of 10 W's`,
        codeCaption: "Run-length encoding: store a count instead of the repeats",
        output: "14 chars -> 5 chars (no information lost)",
        examples: [
          {
            caption: "Decoding restores the EXACT original - that's what makes it lossless",
            code: `encoded = [(10, "W"), (4, "B")]
result = ""
for count, symbol in encoded:
    result += symbol * count
print(result)`,
            output: "WWWWWWWWWWBBBB",
          },
        ],
        checkIn: check(
          "Run-length encoding turns 'AAAB' into '3A1B'. What makes this lossless?",
          [
            "It discards the least important letters",
            "The encoded form can be expanded back to the exact original data",
            "It always produces a smaller file than the original",
            "It approximates the original closely enough",
          ],
          1,
          "Lossless means the exact original is recoverable; '3A1B' decodes precisely back to 'AAAB'.",
        ),
      },
      {
        id: "metadata",
        kicker: "Describe",
        title: "Metadata: data about data",
        body: `**Metadata** is data that describes other data. A photo file stores the pixels *and* metadata: the date taken, camera model, resolution, and often GPS location. A song file stores audio *and* metadata: title, artist, length.

Metadata makes data searchable and organizable — you can find "all photos from July" without opening each one. But metadata can also expose more than users intend, and the classic exam example is **call metadata**.

Imagine a phone company keeps *only* metadata about your calls — never a single word of what you said. For each call it records **who you called, when, and for how long**. That "content-free" record is startlingly revealing:

- A 3 a.m. call to a suicide hotline, then a 30-minute call to a therapist the next morning.
- Repeated late-night calls to one number, then a call to a divorce lawyer.
- A call to an oncologist, then to your parents, then to a life-insurance company.

Nobody heard the conversations, yet the *pattern* of metadata paints an intimate picture. This is why the exam treats metadata as a real privacy concern (a theme you'll formalize in Lesson 14): **you can learn a great deal about people from data *about* their data, even without the content itself.**`,
        code: `photo.jpg
  CONTENT (the data):  the pixels you see
  METADATA (about it):
    date     = 2026-07-04
    camera   = Pixel 9
    size     = 4032 x 3024
    gps      = 40.71 N, 74.01 W   <- can leak your home!

# CALL METADATA (no words recorded, still revealing):
  who    = suicide hotline
  when   = 03:12 AM
  length = 22 min
# the PATTERN tells a story the "content" never had to`,
        codeCaption: "Metadata describes the data - handy for search, revealing about people",
        callout: {
          label: "On the AP exam",
          text: "Metadata (data about data) can reveal sensitive information even when the underlying content is never seen. Call metadata — who, when, how long — is the go-to example.",
        },
        checkIn: check(
          "Which of the following is metadata for a photo, rather than the photo's actual content?",
          [
            "The colors of the pixels in the image",
            "The date and GPS location where it was taken",
            "The subject standing in the picture",
            "The overall brightness of the scene",
          ],
          1,
          "Metadata describes the data — capture date and location — rather than being the image content itself.",
        ),
      },
      {
        id: "insight",
        kicker: "Analyze",
        title: "Turning data into insight",
        body: `Raw data is not knowledge. To extract **insight**, we clean, filter, transform, and visualize data to find patterns, trends, and correlations.

A typical pipeline:
- **Collect** relevant data
- **Clean** it (remove errors, duplicates, blanks)
- **Transform / filter** to the relevant subset
- **Visualize** to reveal patterns
- **Interpret** carefully, checking assumptions

Programs and tools help find patterns that would be impossible to see by hand across millions of records.`,
        code: `RAW DATA
   |  collect     gather relevant records
   |  clean       remove errors, duplicates, blanks
   |  transform   filter to the subset you need
   |  visualize   chart it to reveal patterns
   v  interpret   check assumptions before concluding
INSIGHT`,
        codeCaption: "Data to insight is a pipeline - skip a step and results lie",
      },
      {
        id: "correlation",
        kicker: "Reason carefully",
        title: "Correlation is not causation",
        body: `Data can show two things *move together* (**correlation**) without one *causing* the other. Ice-cream sales and drowning both rise in summer — but ice cream doesn't cause drowning; hot weather drives both.

The AP exam rewards cautious interpretation: a pattern in data is a starting point for questions, not automatic proof of cause. Jumping from correlation to causation is a classic reasoning error to avoid.`,
        code: `# They move together (correlation)...
ice_cream_sales  UP   in summer
drownings        UP   in summer

# ...but ice cream does NOT cause drowning
hot_weather --> more ice cream
hot_weather --> more swimming --> more drownings
#   ^ a hidden common cause explains BOTH`,
        codeCaption: "Correlation vs causation: look for a hidden common cause",
        callout: {
          label: "On the AP exam",
          text: "When a question presents a striking correlation, the strongest answer usually notes that correlation does not establish causation and that other factors may explain the pattern.",
        },
      },
      {
        id: "bias-sources",
        kicker: "Bias",
        title: "Where bias enters data",
        body: `**Bias** can enter at many stages and skew conclusions:

- **Collection bias** — the data doesn't represent everyone (e.g., a survey only of people with fast internet).
- **Sampling bias** — some groups are over- or under-represented.
- **Measurement bias** — the tool or question systematically favors an outcome.
- **Interpretation bias** — the analyst reads results through a preconception.

Biased data produces biased conclusions, even when the math is flawless. "The computer said so" is not a defense.`,
        code: `POPULATION (everyone we want to describe)
   [][][][][][][][][][][][][][][][][][][][]

SAMPLE (who we actually measured)
   [][][][]                 <- only smartphone owners
   ^^^^^^^^ over-represents one group,
            misses people without data plans
# flawless math on a skewed sample -> skewed conclusion`,
        codeCaption: "A biased sample can't represent the whole population",
        checkIn: check(
          "An app studies commuting habits using only data from users who own smartphones and have data plans. This most directly introduces:",
          [
            "an overflow error",
            "collection/sampling bias that excludes some populations",
            "lossy compression",
            "a syntax error",
          ],
          1,
          "Only sampling smartphone owners under-represents people without them, biasing the data.",
        ),
      },
      {
        id: "privacy-scale",
        kicker: "Scale",
        title: "Aggregation and combining datasets",
        body: `Combining two or more datasets is a double-edged sword — and the exam wants you to see **both** edges.

**The upside: combining can create new insight** that neither dataset held alone. Join a city's *weather* data with its *bike-share* trip data and you discover ridership drops 40% below 45°F — a pattern invisible in either file by itself. Merge *hospital admissions* with *air-quality* readings and a link between smog and asthma attacks appears. This is often *why* organizations combine data: the combination reveals relationships that drive real decisions.

**The downside: combining can re-identify people** who were anonymous in each separate dataset. Individually harmless fields become a fingerprint together. A famous result: **ZIP code + birth date + gender uniquely identifies a large share of the U.S. population** — no name required. So an "anonymized" medical dataset (diagnoses + those three fields) can be re-linked to named voter records that share ZIP, birth date, and gender, unmasking who has which condition.

Same technique, opposite ethics. Large-scale collection and combination powers useful services (maps, recommendations, public-health research) *and* raises serious privacy stakes — a tension you'll formalize in Lesson 13 (impact) and Lesson 14 (legal/ethical).`,
        code: `# COMBINING FOR INSIGHT (the good side)
weather data  +  bike-share trips
  -> "ridership drops 40% below 45 degrees"  (new knowledge!)

# COMBINING FOR RE-IDENTIFICATION (the risk)
# Each field alone feels anonymous...
ZIP        = 10025      (shared by thousands)
birthdate  = 2009-03-12 (shared by many)
gender     = F          (shared by ~half)
# ...but COMBINED they can pin down one person
ZIP + birthdate + gender  ->  often a UNIQUE match`,
        codeCaption: "Combining data can create insight OR re-identify anonymous people",
        checkIn: check(
          "A researcher merges an anonymized medical dataset (diagnosis + ZIP + birth date + gender) with a public voter list. What are the two possibilities the AP framework highlights?",
          [
            "Only that the files get smaller",
            "Combining can reveal new health insights, but can also re-identify individuals who were anonymous separately",
            "Only that it always causes an overflow error",
            "Combining data has no effect on privacy",
          ],
          1,
          "Combining datasets can produce valuable new insight and can also re-identify people — the exam expects you to recognize both outcomes.",
        ),
      },
      {
        id: "cleaning",
        kicker: "Practice",
        title: "Cleaning: garbage in, garbage out",
        body: `Before analysis, data usually needs **cleaning**: fixing typos, standardizing formats ("NY" vs "New York"), removing duplicates, and deciding how to handle missing values.

**Incomplete data** deserves special attention because it quietly skews results. Real datasets have blanks — a survey question left unanswered, a sensor that dropped offline, a form field that was optional. You have to *decide* what to do with each gap, and each choice changes the answer:

- **Drop the incomplete rows.** Simple, but if the missing values aren't random you introduce bias — e.g., if lower-income users were the ones who skipped the "salary" field, dropping them makes the sample look wealthier than it is.
- **Fill (impute) the blanks** with an average or estimate. Keeps the row, but invented values can mask real variation.
- **Flag the gaps** and report how much data was missing, so readers can judge the result's reliability.

Skipping cleaning corrupts results silently — duplicated rows inflate counts, mixed formats ("NY"/"New York") break groupings, and ignored blanks distort averages. The exam values recognizing that **trustworthy insight depends on trustworthy input data**, and that how you handle incomplete data is itself a decision that can add bias.`,
        code: `raw survey rows (age, income, city)
  [24, 40000, "NY"     ]
  [31,   ---, "New York"]   # missing income + format mismatch
  [24, 40000, "NY"     ]   # duplicate of row 1
  [ 0, 55000, "ny"     ]   # impossible age -> likely typo

# cleaning decisions:
#   standardize  "New York"/"ny" -> "NY"
#   de-duplicate remove the repeat row
#   missing income -> drop row? fill with average? flag it?
#   age 0 -> investigate/fix, don't silently average it in`,
        codeCaption: "Cleaning: standardize, de-duplicate, and decide how to treat missing values",
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Reading a claim critically",
        body: `A headline claims: "Students who use our study app score 15% higher." Before believing it, ask:
- **Who was measured?** (Only motivated students who chose the app?)
- **Compared to what?** (A fair control group?)
- **Correlation or cause?** (Maybe strong students both study more *and* use apps.)

This critical stance — separating what the data shows from what it proves — is exactly what AP data questions test.`,
        checkIn: check(
          "A dataset shows towns with more firefighters have more fire damage. What is the most careful conclusion?",
          [
            "Firefighters cause fire damage, so towns should hire fewer",
            "The correlation likely reflects a common cause (bigger towns have more fires and more firefighters)",
            "The data must contain an overflow error",
            "This proves firefighters are ineffective",
          ],
          1,
          "A lurking variable (town size) explains both; correlation here does not mean causation.",
        ),
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "Becoming a data decoder",
        body: `You can now choose lossless vs. lossy compression for a purpose, explain what metadata adds and risks, describe a pipeline from raw data to insight, and critique claims for bias and false causation.

This closes Big Idea 2. Next you enter Algorithms & Programming — the largest slice of the exam — starting with variables, expressions, and strings.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Interrogate a data claim",
        body: `Find or invent a data-based claim ("X causes Y"). Write two questions you would ask about how the data was collected or interpreted before accepting it.`,
      },
    ],
  },
  bigIdeas: [
    "**Lossless** compression restores data exactly (use for text/code); **lossy** discards detail for smaller size (use for media).",
    "**Metadata** is data about data — it makes data searchable but can leak more than users intend.",
    "Insight comes from a pipeline: collect, clean, transform, visualize, interpret — carefully.",
    "**Bias** can enter at collection, sampling, measurement, or interpretation, and correlation is not causation.",
  ],
  keyTerms: [
    { term: "Compression", definition: "Reducing the number of bits needed to store or transmit data." },
    { term: "Lossless compression", definition: "Compression from which the original data can be reconstructed exactly." },
    { term: "Lossy compression", definition: "Compression that permanently discards some data to save more space." },
    { term: "Metadata", definition: "Data that describes other data, such as a photo's date or location." },
    { term: "Bias (in data)", definition: "Systematic error from collection, sampling, measurement, or interpretation that skews results." },
    { term: "Correlation", definition: "A relationship where values move together, which does not by itself prove causation." },
  ],
  realWorld:
    "Streaming services use lossy compression so video fits your bandwidth, while your bank uses lossless storage because every cent must be exact — and both rely on metadata to organize massive datasets.",
  quiz: [
    {
      id: "q1",
      question: "Which situation absolutely requires lossless compression?",
      choices: [
        "Streaming a movie to a phone",
        "Storing a legal contract's text file",
        "Sharing a thumbnail preview image",
        "Playing background music in a game",
      ],
      correctIndex: 1,
      explanation: "A contract's text must be reconstructed exactly, so lossless is required.",
    },
    {
      id: "q2",
      question: "The main advantage of lossy over lossless compression is:",
      choices: [
            "It can always restore the exact original",
            "It works only on text files",
            "It typically achieves much greater size reduction",
            "It never loses any information",
          ],
      correctIndex: 2,
      explanation: "Lossy trades some data for substantially smaller size.",
    },
    {
      id: "q3",
      question: "Which of these is metadata rather than primary data?",
      choices: [
            "The melody a listener hears",
            "The audio samples in a song",
            "The volume of the recording",
            "The artist name and track length stored with the song",
          ],
      correctIndex: 3,
      explanation: "Artist and length describe the song — they are metadata.",
    },
    {
      id: "q4",
      question: "A run-length encoder turns 'AAAAAB' into '5A1B'. This is:",
      choices: [
        "lossy compression",
        "lossless compression",
        "encryption",
        "sampling",
      ],
      correctIndex: 1,
      explanation: "'5A1B' decodes back to the exact original, so it is lossless.",
    },
    {
      id: "q5",
      question: "A poll conducted only via a video-game chat concludes 'most teens love that game.' The biggest problem is:",
      choices: [
            "lossy compression of the responses",
            "an overflow error in the counter",
            "roundoff error",
            "sampling bias — the sample isn't representative of all teens",
          ],
      correctIndex: 3,
      explanation: "Sampling only that game's players over-represents fans, biasing the conclusion.",
    },
    {
      id: "q6",
      question: "Two variables in a dataset rise and fall together. The most careful interpretation is:",
      choices: [
            "The data is corrupted",
            "They are correlated, but this alone does not prove causation",
            "One variable must be metadata",
            "One definitely causes the other",
          ],
      correctIndex: 1,
      explanation: "Correlation shows association, not cause; a third factor may explain both.",
    },
    {
      id: "q7",
      question: "Why is combining several 'harmless' datasets a privacy concern?",
      choices: [
            "Combined fields can uniquely identify individuals who were anonymous separately",
            "It causes overflow errors",
            "It removes all metadata",
            "It always uses lossy compression",
          ],
      correctIndex: 0,
      explanation: "Aggregating fields like ZIP, birth date, and gender can re-identify people.",
    },
    {
      id: "q8",
      question: "Before analyzing a dataset with 'NY' and 'New York' as separate entries, you should:",
      choices: [
            "Compress it losslessly",
            "Assume the results will be accurate anyway",
            "Add more metadata",
            "Clean/standardize the data so equivalent values are grouped correctly",
          ],
      correctIndex: 3,
      explanation: "Cleaning standardizes formats so analysis groups equivalent values properly.",
    },
  ],
  reflection: {
    prompt:
      "AP data questions reward critical thinking. Describe a dataset you could collect for a school problem, one way bias could sneak in, and one step you'd take to reduce it.",
    placeholder: "The dataset, a bias risk, and your mitigation…",
  },
};
