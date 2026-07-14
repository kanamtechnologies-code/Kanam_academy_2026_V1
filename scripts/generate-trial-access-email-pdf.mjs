#!/usr/bin/env node
/**
 * Generates docs/Kanam-Academy-Trial-Access.pdf from the trial access email HTML.
 * Usage: node scripts/generate-trial-access-email-pdf.mjs
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "docs/trial-access-email.html");
const pdfPath = path.join(root, "docs/Kanam-Academy-Trial-Access.pdf");

if (!fs.existsSync(htmlPath)) {
  console.error("Missing docs/trial-access-email.html");
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
  await page.setViewport({ width: 680, height: 900, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle0" });

  await page.pdf({
    path: pdfPath,
    format: "Letter",
    printBackground: true,
    margin: { top: "0.4in", right: "0.35in", bottom: "0.4in", left: "0.35in" },
  });

  const stats = fs.statSync(pdfPath);
  console.log(`✓ Trial access PDF written: ${pdfPath}`);
  console.log(`  Size: ${(stats.size / 1024).toFixed(1)} KB`);
} finally {
  await browser.close();
}
