/**
 * Replaces Advanced AI check-in + quiz MCQs with topic-specific,
 * length-balanced choices. Correct answers are never uniquely longest.
 *
 * Run: node scripts/patch-aai-mcqs.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const BANK = JSON.parse(fs.readFileSync(path.join(root, "scripts/aai-mcq-bank.json"), "utf8"));

function checkCall(q) {
  return `check(${JSON.stringify(q.prompt)}, ${JSON.stringify(q.choices)}, ${q.correctIndex}, ${JSON.stringify(q.explanation)})`;
}

function quizBlock(questions) {
  return questions
    .map(
      (q, i) =>
        `    { id: "q${i + 1}", question: ${JSON.stringify(q.prompt)}, choices: ${JSON.stringify(q.choices)}, correctIndex: ${q.correctIndex}, explanation: ${JSON.stringify(q.explanation)} }`
    )
    .join(",\n");
}

let patched = 0;
for (const [nStr, questions] of Object.entries(BANK)) {
  const n = Number(nStr);
  // verify lengths
  for (const q of questions) {
    const lens = q.choices.map((c) => c.length);
    const mx = Math.max(...lens);
    if (lens[q.correctIndex] === mx && lens.filter((L) => L === mx).length === 1) {
      throw new Error(`L${n} uniquely longest: ${q.prompt} ${JSON.stringify(lens)}`);
    }
  }
  const file = path.join(root, `lib/advancedAiLessons/lesson${n}.ts`);
  let text = fs.readFileSync(file, "utf8");
  let qi = 0;
  text = text.replace(/checkIn:\s*check\([\s\S]*?\)/g, () => {
    const q = questions[Math.min(qi, questions.length - 1)];
    qi += 1;
    return `checkIn: ${checkCall(q)}`;
  });
  text = text.replace(
    /quiz:\s*\[[\s\S]*?\],\n\s*reflection:/,
    `quiz: [\n${quizBlock(questions)}\n  ],\n  reflection:`
  );
  fs.writeFileSync(file, text);
  console.log(`patched lesson ${n}: ${qi} checkIns, ${questions.length} quiz items`);
  patched += 1;
}
console.log("Done,", patched, "lessons");
