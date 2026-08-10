#!/usr/bin/env node
/** Strip garbage suffixes left by longest-choice bias rewrite. */
import fs from "fs";
import path from "path";

const ROOTS = ["lib"];
const SUFFIXES = [
  /” belongs to a different situation than the one in the question stem/g,
  /” describes a different situation than the one in the question stem/g,
  / belongs to a different situation than the one in the question stem/g,
  / describes a different situation than the one in the question stem/g,
];

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(name)) out.push(p);
  }
  return out;
}

let filesChanged = 0;
let replacements = 0;

for (const root of ROOTS) {
  for (const file of walk(root)) {
    let src = fs.readFileSync(file, "utf8");
    const before = src;
    for (const re of SUFFIXES) {
      const matches = src.match(re);
      if (matches) replacements += matches.length;
      src = src.replace(re, "");
    }
    // "You might defend “X” in casual talk, but it fails the definition used here" → X
    src = src.replace(
      /You might defend “([^”]+)” in casual talk, but it fails the definition used here/g,
      (_, claim) => {
        replacements++;
        return claim;
      }
    );
    // Leading decorative curly open-quote inside a JS string: "“Foo → "Foo
    src = src.replace(/"“/g, '"');
    // Trailing decorative curly close if somehow left alone before quote end — rare
    src = src.replace(/”"/g, '"');

    if (src !== before) {
      fs.writeFileSync(file, src);
      filesChanged++;
      console.log("fixed", file);
    }
  }
}

const remaining = walk("lib").reduce((n, f) => {
  const t = fs.readFileSync(f, "utf8");
  return (
    n +
    (t.match(/different situation than the one in the question stem/g) || []).length +
    (t.match(/fails the definition used here/g) || []).length
  );
}, 0);

console.log(JSON.stringify({ filesChanged, replacements, remaining }, null, 2));
