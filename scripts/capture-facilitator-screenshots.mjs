#!/usr/bin/env node
/**
 * Capture facilitator-guide screenshots for every catalog lesson.
 *
 * Requires: local unlock (NEXT_PUBLIC_UNLOCK_ALL_LESSONS=true) + `npm run dev -- -p 3001`
 *
 * Usage:
 *   node scripts/capture-facilitator-screenshots.mjs
 *   node scripts/capture-facilitator-screenshots.mjs --base http://localhost:3001 --limit 5
 *   node scripts/capture-facilitator-screenshots.mjs --force   # overwrite existing
 */
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "docs/curriculum/facilitator-guides/images");
const TRACKS_SRC = fs.readFileSync(path.join(ROOT, "lib/tracks.ts"), "utf8");

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const baseIdx = args.indexOf("--base");
const BASE = baseIdx >= 0 ? args[baseIdx + 1] : "http://localhost:3001";
const limitIdx = args.indexOf("--limit");
const LIMIT = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity;
const trackIdx = args.indexOf("--track");
const TRACK_FILTER = trackIdx >= 0 ? args[trackIdx + 1] : null;

const PREFIX = {
  "ai-python": "python",
  "data-analyst": "data",
  "ai-literacy": "ai",
  "advanced-ai": "aai",
  "ap-csp-prep": "csp",
  "digital-literacy": "dl",
  cybersecurity: "cs",
  "financial-literacy": "fl",
};

const LESSON_CONSTS = [
  ["ai-python", "PYTHON_LESSONS"],
  ["data-analyst", "DATA_ANALYST_LESSONS"],
  ["ai-literacy", "AI_LITERACY_LESSONS"],
  ["advanced-ai", "ADVANCED_AI_LESSONS"],
  ["ap-csp-prep", "AP_CSP_PREP_LESSONS"],
  ["digital-literacy", "DIGITAL_LITERACY_LESSONS"],
  ["cybersecurity", "CYBERSECURITY_LESSONS"],
  ["financial-literacy", "FINANCIAL_LITERACY_LESSONS"],
];

function parseLessons(constName) {
  const re = new RegExp(`const ${constName}: LessonRow\\[\\] = \\[([\\s\\S]*?)\\];`);
  const m = TRACKS_SRC.match(re);
  if (!m) return [];
  const body = m[1];
  const lessons = [];
  const objRe = /\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
  let om;
  while ((om = objRe.exec(body))) {
    const o = om[1];
    const id = o.match(/id:\s*"([^"]+)"/)?.[1];
    const href = o.match(/href:\s*"([^"]+)"/)?.[1];
    const week = +(o.match(/week:\s*(\d+)/)?.[1] || 0);
    const session = +(o.match(/session:\s*(\d+)/)?.[1] || 0);
    const kind = o.match(/kind:\s*"([^"]+)"/)?.[1] || "lesson";
    if (!id || !href || !week) continue;
    lessons.push({ id, href, week, session, kind });
  }
  return lessons;
}

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

async function waitReady(page, timeout = 20000) {
  await page.waitForFunction(
    () => {
      const t = document.body?.innerText || "";
      return (
        t.includes("Lesson") ||
        t.includes("Exercises") ||
        t.includes("Quiz") ||
        t.includes("Practice") ||
        t.includes("Loading") === false
      );
    },
    { timeout }
  ).catch(() => {});
  await new Promise((r) => setTimeout(r, 600));
}

async function hideChrome(page) {
  await page.evaluate(() => {
    const kill = (el) => {
      if (el) el.style.setProperty("display", "none", "important");
    };
    // Next.js / Sentry floating widgets
    document.querySelectorAll("nextjs-portal, [data-nextjs-toast]").forEach(kill);
    [...document.querySelectorAll("button, a, div")].forEach((el) => {
      const t = (el.textContent || "").trim();
      if (
        /^Pass (current exercise|all remaining)/.test(t) ||
        t === "Temp test controls — remove later" ||
        t === "Open Next.js Dev Tools"
      ) {
        kill(el.closest("div") || el);
      }
    });
  });
}

async function unlockModule(page, lessonId) {
  await page.evaluate((id) => {
    try {
      localStorage.setItem(`kanam.lessonModuleDone:${id}`, "1");
      localStorage.setItem("kanam.guest", "1");
    } catch {
      /* ignore */
    }
  }, lessonId);
}

async function clickTab(page, label) {
  const clicked = await page.evaluate((lab) => {
    const btn = [...document.querySelectorAll("button")].find((b) =>
      new RegExp(`^\\s*${lab}\\s*$`, "i").test((b.textContent || "").trim())
    );
    if (!btn) return false;
    btn.click();
    return true;
  }, label);
  if (clicked) await new Promise((r) => setTimeout(r, 500));
  return clicked;
}

async function openCoach(page) {
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) =>
      /Coach|Guidance|Help pocket/i.test(b.textContent || "")
    );
    btn?.click();
  });
  await new Promise((r) => setTimeout(r, 400));
}

async function saveShot(page, file, clipFn) {
  ensureDir(OUT);
  const dest = path.join(OUT, file);
  if (!FORCE && fs.existsSync(dest)) return { skipped: true, file };
  await hideChrome(page);
  if (clipFn) {
    const clip = await page.evaluate(clipFn);
    if (clip && clip.width > 10 && clip.height > 10) {
      await page.screenshot({ path: dest, clip, type: "png" });
    } else {
      await page.screenshot({ path: dest, type: "png" });
    }
  } else {
    await page.screenshot({ path: dest, type: "png" });
  }
  // Downscale large retina captures with sharp-less approach via puppeteer viewport already 1280
  return { skipped: false, file };
}

function heroClip() {
  const h1 = document.querySelector("h1");
  const card =
    h1?.closest("section") ||
    h1?.closest("[class*='rounded']") ||
    h1?.parentElement?.parentElement;
  const el = card || h1 || document.body;
  const r = el.getBoundingClientRect();
  const pad = 8;
  return {
    x: Math.max(0, r.x - pad),
    y: Math.max(0, r.y - pad),
    width: Math.min(window.innerWidth - 4, r.width + pad * 2),
    height: Math.min(window.innerHeight - 4, Math.max(180, r.height + pad * 2)),
  };
}

function tabsClip() {
  const btn = [...document.querySelectorAll("button")].find((b) =>
    /^Lesson$/i.test((b.textContent || "").trim())
  );
  const bar = btn?.parentElement || btn;
  if (!bar) return null;
  const r = bar.getBoundingClientRect();
  return {
    x: Math.max(0, r.x - 8),
    y: Math.max(0, r.y - 8),
    width: Math.min(window.innerWidth - 4, Math.max(280, r.width + 16)),
    height: Math.min(120, r.height + 16),
  };
}

function workspaceClip() {
  const h =
    [...document.querySelectorAll("h1,h2,h3")].find((n) =>
      /workspace|Exercise|Quiz|Knowledge|Practice|Capstone/i.test(n.textContent || "")
    ) || document.querySelector("[role='textbox'], textarea");
  const root =
    h?.closest("section") ||
    h?.closest("[class*='rounded']") ||
    document.querySelector("[role='textbox']")?.closest("div") ||
    document.body;
  const r = root.getBoundingClientRect();
  return {
    x: Math.max(0, Math.min(r.x, window.innerWidth * 0.35)),
    y: Math.max(0, r.y),
    width: Math.min(window.innerWidth - 8, Math.max(400, window.innerWidth - r.x - 8)),
    height: Math.min(window.innerHeight - r.y - 8, Math.max(320, r.height)),
  };
}

function consoleClip() {
  const pre = [...document.querySelectorAll("pre")].find((p) =>
    /kanam-bot|Console|\$|SELECT|Success|✓/.test(p.textContent || "")
  );
  if (!pre) return null;
  const r = pre.getBoundingClientRect();
  if (r.height < 20) return null;
  return {
    x: Math.max(0, r.x - 6),
    y: Math.max(0, r.y - 6),
    width: Math.min(window.innerWidth - 4, r.width + 12),
    height: Math.min(400, r.height + 12),
  };
}

async function gotoSafe(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await waitReady(page, 15000);
}

async function captureLesson(page, lesson, prefix) {
  const base = `${prefix}-w${lesson.week}-s${lesson.session}`;
  const results = [];
  const url = `${BASE}${lesson.href}`;

  // Seed unlock before first paint of exercises view
  await gotoSafe(page, `${BASE}/learn/demo`);
  await unlockModule(page, lesson.id);

  await gotoSafe(page, `${url}?view=lesson`);
  await unlockModule(page, lesson.id);
  await hideChrome(page);

  results.push(await saveShot(page, `${base}-hero.png`, heroClip));
  results.push(await saveShot(page, `${base}-tabs.png`, tabsClip));

  // Full lesson viewport doubles as help/editor fallbacks when panels differ by track
  results.push(await saveShot(page, `${base}-help.png`, null));

  await unlockModule(page, lesson.id);
  const opened =
    (await clickTab(page, "Exercises")) ||
    (await clickTab(page, "Quiz")) ||
    (await clickTab(page, "Capstone project"));
  if (!opened) {
    await gotoSafe(page, `${url}?view=exercises`).catch(() => {});
  }
  await hideChrome(page);
  await openCoach(page);

  results.push(await saveShot(page, `${base}-editor.png`, workspaceClip));
  results.push(await saveShot(page, `${base}-run.png`, null));

  let cons = await saveShot(page, `${base}-console.png`, consoleClip);
  if (!fs.existsSync(path.join(OUT, `${base}-console.png`))) {
    cons = await saveShot(page, `${base}-console.png`, null);
  }
  results.push(cons);

  return results;
}

async function main() {
  ensureDir(OUT);
  const jobs = [];
  for (const [trackId, constName] of LESSON_CONSTS) {
    if (TRACK_FILTER && trackId !== TRACK_FILTER) continue;
    const prefix = PREFIX[trackId];
    for (const lesson of parseLessons(constName)) {
      jobs.push({ trackId, prefix, lesson });
    }
  }

  const selected = jobs.slice(0, LIMIT);
  console.log(`Capturing ${selected.length}/${jobs.length} lessons → ${OUT}`);
  console.log(`Base: ${BASE}`);

  // Health check
  try {
    const res = await fetch(`${BASE}/learn/demo`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (e) {
    console.error(`Server not reachable at ${BASE}. Start: npm run dev -- -p 3001`);
    console.error(String(e));
    process.exit(1);
  }

  const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : undefined);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  let ok = 0;
  let fail = 0;
  const started = Date.now();
  let browserRef = browser;

  async function relaunch() {
    try {
      await browserRef.close();
    } catch {
      /* ignore */
    }
    browserRef = await puppeteer.launch({
      headless: true,
      executablePath,
      defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
    return browserRef;
  }

  for (let i = 0; i < selected.length; i++) {
    // Restart browser every 8 lessons to avoid CDP detach / OOM
    if (i > 0 && i % 8 === 0) {
      console.log(`… relaunching browser at ${i}`);
      await relaunch();
    }
    const { trackId, prefix, lesson } = selected[i];
    const label = `[${i + 1}/${selected.length}] ${trackId} ${lesson.id} w${lesson.week}s${lesson.session}`;
    let page;
    try {
      page = await browserRef.newPage();
      page.setDefaultTimeout(45000);
      const results = await captureLesson(page, lesson, prefix);
      const wrote = results.filter((r) => r && !r.skipped).length;
      const skipped = results.filter((r) => r && r.skipped).length;
      ok++;
      console.log(`${label} · wrote ${wrote}, skipped ${skipped}`);
    } catch (err) {
      console.error(`${label} · ERROR`, err?.message || err);
      try {
        await page?.close().catch(() => {});
        await relaunch();
        page = await browserRef.newPage();
        page.setDefaultTimeout(45000);
        const results = await captureLesson(page, lesson, prefix);
        const wrote = results.filter((r) => r && !r.skipped).length;
        ok++;
        console.log(`${label} · RETRY ok · wrote ${wrote}`);
      } catch (err2) {
        fail++;
        console.error(`${label} · RETRY FAIL`, err2?.message || err2);
      }
    } finally {
      await page?.close().catch(() => {});
    }
  }

  await browserRef.close().catch(() => {});
  const secs = ((Date.now() - started) / 1000).toFixed(1);
  const pngs = fs.readdirSync(OUT).filter((f) => f.endsWith(".png")).length;
  console.log(JSON.stringify({ ok, fail, pngsInImagesDir: pngs, seconds: secs }, null, 2));
  if (fail) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
