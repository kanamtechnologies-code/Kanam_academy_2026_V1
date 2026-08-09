#!/usr/bin/env node
/**
 * Inject instructorScript into literacy / specialty AILessonConfig lessons
 * that don't already have one. Distills title + goal (+ first section title).
 */
import fs from "fs";
import path from "path";

const TRACKS = [
  { dir: "lib/aiLessons", glob: /^lesson\d+\.ts$/ },
  { dir: "lib/digitalLessons", glob: /^lesson\d+\.ts$/ },
  { dir: "lib/cyberLessons", glob: /^lesson\d+\.ts$/ },
  { dir: "lib/financeLessons", glob: /^lesson\d+\.ts$/ },
  { dir: "lib/advancedAiLessons", glob: /^lesson\d+\.ts$/ },
  { dir: "lib/apCspLessons", glob: /^lesson\d+\.ts$/ },
];

function unquote(s) {
  if (!s) return "";
  return s
    .replace(/^["'`]/, "")
    .replace(/["'`]$/, "")
    .replace(/\\n/g, " ")
    .replace(/\\"/g, '"')
    .trim();
}

function extractField(src, name) {
  const re = new RegExp(`${name}:\\s*("(?:\\\\.|[^"\\\\])*"|\`(?:\\\\.|[^\\\`\\\\])*\`)`, "m");
  const m = src.match(re);
  return m ? unquote(m[1]) : "";
}

function firstSectionTitle(src) {
  const m = src.match(/sections:\s*\[[\s\S]*?title:\s*("(?:\\.|[^"\\])*")/);
  return m ? unquote(m[1]) : "";
}

function buildScript({ title, goal, sectionTitle }) {
  const cleanTitle = title.replace(/^\d+\.\s*/, "");
  const focus = sectionTitle || cleanTitle;
  return (
    `**Coach's note**\n` +
    `Today's lesson: **${cleanTitle}**.\n\n` +
    `**Goal:** ${goal}\n\n` +
    `**How to facilitate**\n` +
    `1. Warm-up: ask students what they already think about "${focus}".\n` +
    `2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.\n` +
    `3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.\n` +
    `4. Close: one-sentence takeaway + how this shows up in real life.\n\n` +
    `**Watch for:** guessing from hype or headlines without using the lesson vocabulary. ` +
    `Push students back to the definitions and examples on the slides.`
  );
}

function escapeForTemplateLiteral(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

let updated = 0;
let skipped = 0;

for (const track of TRACKS) {
  const abs = path.join(process.cwd(), track.dir);
  if (!fs.existsSync(abs)) {
    console.warn("missing", track.dir);
    continue;
  }
  const files = fs.readdirSync(abs).filter((f) => track.glob.test(f)).sort();
  for (const file of files) {
    const fp = path.join(abs, file);
    let src = fs.readFileSync(fp, "utf8");
    if (/instructorScript\s*:/.test(src)) {
      skipped++;
      continue;
    }
    if (!/lessonModule\s*:/.test(src)) {
      console.warn("no lessonModule", fp);
      skipped++;
      continue;
    }
    const title = extractField(src, "title") || file;
    const goal = extractField(src, "goal") || "Complete today's lesson goals.";
    const sectionTitle = firstSectionTitle(src);
    const script = escapeForTemplateLiteral(buildScript({ title, goal, sectionTitle }));
    const injection = `  instructorScript: \`${script}\`,\n  lessonModule:`;
    const next = src.replace(/(\n\s*)lessonModule\s*:/, `\n${injection}`);
    if (next === src) {
      console.warn("inject failed", fp);
      skipped++;
      continue;
    }
    fs.writeFileSync(fp, next);
    updated++;
    console.log("updated", path.relative(process.cwd(), fp));
  }
}

console.log(JSON.stringify({ updated, skipped }, null, 2));
