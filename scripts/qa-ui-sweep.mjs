#!/usr/bin/env node
/**
 * Comprehensive UI/functionality sweep (desktop + mobile).
 * Usage: node scripts/qa-ui-sweep.mjs [--base http://localhost:3000]
 */
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const BASE = process.argv.includes("--base")
  ? process.argv[process.argv.indexOf("--base") + 1]
  : "http://localhost:3000";

const VIEWPORTS = {
  desktop: { width: 1280, height: 800, isMobile: false, hasTouch: false },
  mobile: {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },
};

const ROUTES = [
  "/",
  "/welcome",
  "/welcome/choose",
  "/welcome/parent",
  "/welcome/ask-parent",
  "/help",
  "/demo",
  "/learn/demo",
  "/learn/1",
  "/learn/data/1",
  "/learn/ai/1",
  "/learn/digital/1",
  "/learn/cyber/1",
  "/learn/finance/1",
  "/learn/advanced-ai/1",
  "/learn/ap-csp-prep/1",
  "/dashboard",
  "/parent",
  "/parent/insights",
  "/instructor",
  "/billing",
];

const findings = [];
const note = (severity, area, message, extra = {}) => {
  findings.push({ severity, area, message, ...extra });
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function collectPageIssues(page, label) {
  const result = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")].map((img) => {
      const r = img.getBoundingClientRect();
      return {
        src: img.currentSrc || img.src,
        alt: img.alt || "",
        naturalWidth: img.naturalWidth,
        complete: img.complete,
        w: Math.round(r.width),
        h: Math.round(r.height),
        display: getComputedStyle(img).display,
        objectFit: getComputedStyle(img).objectFit,
      };
    });

    const buttons = [...document.querySelectorAll("button, a[href], [role='button']")]
      .filter((el) => {
        const s = getComputedStyle(el);
        return s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0";
      })
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 80),
          href: el.getAttribute("href") || "",
          disabled: Boolean(el.disabled || el.getAttribute("aria-disabled") === "true"),
          x: Math.round(r.x),
          y: Math.round(r.y),
          w: Math.round(r.width),
          h: Math.round(r.height),
          offscreen:
            r.bottom < 0 ||
            r.right < 0 ||
            r.top > window.innerHeight + 200 ||
            r.left > window.innerWidth,
          tiny: r.width > 0 && r.height > 0 && (r.width < 24 || r.height < 24),
        };
      });

    const overflowX = document.documentElement.scrollWidth > window.innerWidth + 2;
    const bodyText = (document.body?.innerText || "").slice(0, 200);
    const title = document.title;
    const h1 = document.querySelector("h1")?.textContent?.trim() || "";

    return {
      title,
      h1,
      bodyText,
      overflowX,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      imgCount: imgs.length,
      brokenImgs: imgs.filter((i) => i.complete && i.naturalWidth === 0 && i.display !== "none"),
      zeroSizeImgs: imgs.filter((i) => i.naturalWidth > 0 && (i.w < 2 || i.h < 2) && i.display !== "none"),
      coverImgs: imgs.filter((i) => i.objectFit === "cover" && /lessons|kanam|bot/i.test(i.src)),
      buttonCount: buttons.length,
      zeroSizeButtons: buttons.filter((b) => b.w === 0 || b.h === 0),
      tinyTouchTargets: buttons.filter((b) => b.tiny && !b.disabled),
      offscreenButtons: buttons.filter((b) => b.offscreen && b.text),
      sampleButtons: buttons.slice(0, 12).map((b) => b.text || b.href || b.tag),
    };
  });

  if (result.overflowX) {
    note("warn", label, `Horizontal overflow (${result.scrollWidth}px > ${result.innerWidth}px)`);
  }
  for (const img of result.brokenImgs) {
    note("error", label, `Broken image: ${img.src}`, { alt: img.alt });
  }
  for (const img of result.zeroSizeImgs.slice(0, 5)) {
    note("warn", label, `Image rendered ~0 size: ${img.src}`);
  }
  for (const img of result.coverImgs.slice(0, 3)) {
    note("warn", label, `Lesson image still object-fit:cover (may crop): ${img.src}`);
  }
  if (result.zeroSizeButtons.length) {
    note("warn", label, `${result.zeroSizeButtons.length} zero-size interactive controls`);
  }
  if (result.offscreenButtons.length > 8) {
    note("info", label, `${result.offscreenButtons.length} controls below fold / offscreen (often OK)`);
  }

  return result;
}

async function tryDemoFlow(page, viewportName) {
  const label = `${viewportName}:/learn/demo-flow`;
  await page.goto(`${BASE}/learn/demo`, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(1500);

  // Dismiss tour / overlays if present
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll("button")];
    const skip = btns.find((b) => /^(Skip|Got it|Close|Dismiss)/i.test((b.textContent || "").trim()));
    skip?.click();
  });
  await sleep(400);

  // Click Next a few times via text match
  for (let i = 0; i < 3; i++) {
    const clicked = await page.evaluate(() => {
      const btns = [...document.querySelectorAll("button")];
      const next = btns.find((b) => /^(Next|Start)/i.test((b.textContent || "").trim()) && !b.disabled);
      if (!next) return false;
      next.click();
      return true;
    });
    if (!clicked) break;
    await sleep(800);
  }

  const media = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")].filter((img) => {
      const src = img.currentSrc || img.src;
      return /lessons|kanam|bot|demo/i.test(src);
    });
    return imgs.map((img) => {
      const r = img.getBoundingClientRect();
      const cs = getComputedStyle(img);
      return {
        src: (img.currentSrc || img.src).split("/").pop(),
        objectFit: cs.objectFit,
        w: Math.round(r.width),
        h: Math.round(r.height),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        fullyVisible:
          img.naturalWidth > 0 &&
          r.width > 40 &&
          r.height > 40 &&
          (cs.objectFit === "contain" || cs.objectFit === "fill" || cs.objectFit === "none" || cs.objectFit === "scale-down"),
      };
    });
  });

  if (!media.length) {
    note("warn", label, "No lesson/demo media images found after Next clicks");
  }
  for (const m of media) {
    if (m.naturalWidth === 0) note("error", label, `Broken lesson image: ${m.src}`);
    if (m.objectFit === "cover") note("error", label, `Lesson image cropped (object-cover): ${m.src}`);
    if (m.w < 40 || m.h < 40) note("warn", label, `Tiny lesson image box: ${m.src} ${m.w}x${m.h}`);
  }

  const nextBack = await page.evaluate(() => {
    const texts = [...document.querySelectorAll("button")].map((b) => ({
      t: (b.textContent || "").trim(),
      disabled: b.disabled,
      h: Math.round(b.getBoundingClientRect().height),
    }));
    const next = texts.find((x) => /^Next/i.test(x.t));
    const back = texts.find((x) => /^Back/i.test(x.t));
    return { next, back, sample: texts.filter((x) => x.t).slice(0, 15) };
  });

  if (!nextBack.next && !nextBack.back) {
    note("warn", label, "Could not find Next/Back after demo interactions", {
      sample: nextBack.sample,
    });
  } else {
    if (nextBack.next && nextBack.next.h < 40 && viewportName === "mobile") {
      note("warn", label, `Next button short for touch: ${nextBack.next.h}px`);
    }
    note("info", label, "Demo nav controls present", {
      next: nextBack.next?.t,
      back: nextBack.back?.t,
    });
  }

  return { mediaCount: media.length, media };
}

async function runViewport(browser, name) {
  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(String(err.message || err)));

  await page.setViewport(VIEWPORTS[name]);

  const routeResults = [];
  for (const route of ROUTES) {
    const label = `${name}:${route}`;
    const url = `${BASE}${route}`;
    try {
      const res = await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
      const status = res?.status() ?? 0;
      await sleep(900);
      if (status >= 400) note("error", label, `HTTP ${status}`);
      const issues = await collectPageIssues(page, label);
      const errsHere = consoleErrors.splice(0);
      const pageErrsHere = pageErrors.splice(0);
      for (const e of errsHere) {
        if (/favicon|Download the React DevTools|hydrat/i.test(e)) continue;
        note("error", label, `Console: ${e.slice(0, 240)}`);
      }
      for (const e of pageErrsHere) note("error", label, `Page error: ${e.slice(0, 240)}`);
      routeResults.push({
        route,
        status,
        title: issues.title,
        h1: issues.h1,
        imgs: issues.imgCount,
        buttons: issues.buttonCount,
        overflowX: issues.overflowX,
      });
    } catch (e) {
      note("error", label, `Navigation failed: ${e.message}`);
      routeResults.push({ route, status: 0, error: e.message });
    }
  }

  let demoFlow = null;
  try {
    demoFlow = await tryDemoFlow(page, name);
  } catch (e) {
    note("error", `${name}:/learn/demo-flow`, `Demo flow failed: ${e.message}`);
  }

  await page.close();
  return { routeResults, demoFlow };
}

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  executablePath:
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (process.platform === "darwin"
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : undefined),
});

const report = { base: BASE, startedAt: new Date().toISOString(), viewports: {} };
try {
  for (const name of ["desktop", "mobile"]) {
    console.log(`\n=== ${name} ===`);
    report.viewports[name] = await runViewport(browser, name);
  }
} finally {
  await browser.close();
}

const summary = {
  error: findings.filter((f) => f.severity === "error").length,
  warn: findings.filter((f) => f.severity === "warn").length,
  info: findings.filter((f) => f.severity === "info").length,
};

report.summary = summary;
report.findings = findings;

const outDir = path.join(process.cwd(), "tmp");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "qa-ui-sweep-report.json");
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

console.log("\n=== SUMMARY ===");
console.log(JSON.stringify(summary, null, 2));
console.log(`Wrote ${outPath}`);
for (const f of findings.filter((x) => x.severity === "error" || x.severity === "warn")) {
  console.log(`[${f.severity}] ${f.area}: ${f.message}`);
}
process.exit(summary.error > 0 ? 1 : 0);
