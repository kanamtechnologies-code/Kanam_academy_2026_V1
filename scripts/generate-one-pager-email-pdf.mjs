#!/usr/bin/env node
/**
 * Generates docs/Kanam-Academy-One-Pager-Email.pdf — static, no links (for email blasts).
 * Usage: node scripts/generate-one-pager-email-pdf.mjs
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "docs/one-pager-email.html");
const pdfPath = path.join(root, "docs/Kanam-Academy-One-Pager-Email.pdf");

if (!fs.existsSync(htmlPath)) {
  console.error("Missing docs/one-pager-email.html");
  process.exit(1);
}

let puppeteer;
try {
  puppeteer = await import("puppeteer");
} catch {
  console.error("Puppeteer not installed. Run: npm install --save-dev puppeteer");
  process.exit(1);
}

const browser = await puppeteer.default.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle0" });

  await page.pdf({
    path: pdfPath,
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const stats = fs.statSync(pdfPath);
  console.log(`✓ Email PDF written: ${pdfPath}`);
  console.log(`  Size: ${(stats.size / 1024).toFixed(1)} KB (static — no clickable links)`);
} finally {
  await browser.close();
}
