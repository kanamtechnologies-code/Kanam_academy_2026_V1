/**
 * Create live (or test) Stripe Products + one-time Prices for premier tracks,
 * then patch lib/billing/stripe-catalog.ts and enable checkout in BillingClient.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_live_... node scripts/create-premier-track-prices.mjs
 *   # or with .env.local containing a real key (not sk_live_...)
 *
 * Amounts match BillingClient: Advanced AI $199, AP CSP Prep $199.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const TRACKS = [
  {
    slug: "advanced-ai",
    name: "Track - Advanced AI",
    productId: "prod_UvD2BcdpysyPLt",
    description:
      "One-time unlock of Kanam Academy’s Advanced AI track (8 weeks). Students learn to frame AI problems, work with training data, build and evaluate classifiers, and audit systems for bias, safety, and accountability — beyond prompt-only AI literacy. Includes interactive lessons, practice challenges, XP/progress tracking, and access on this account. Best after AI Literacy foundations.",
    unitAmount: 20000,
  },
  {
    slug: "ap-csp-prep",
    name: "Track - AP CSP Prep",
    productId: "prod_UvD5DDGrYnmTXX",
    description:
      "One-time unlock of Kanam Academy’s AP Computer Science Principles Prep track (8 weeks / 16 lessons). College Board–aligned exam prep covering Big Ideas 1–5, AP-style pseudocode practice, Create Performance Task studio with PPR practice, and gated practice exams + final. Interactive lessons with progress tracking. Prep product only — not an official AP course and not college credit. Students still register for the AP exam through their school / College Board.",
    unitAmount: 25000,
  },
];

function loadSecretKey() {
  if (process.env.STRIPE_SECRET_KEY?.trim()) {
    return process.env.STRIPE_SECRET_KEY.trim().replace(/^["']|["']$/g, "");
  }
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return null;
  const line = fs
    .readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith("STRIPE_SECRET_KEY="));
  if (!line) return null;
  let val = line.slice("STRIPE_SECRET_KEY=".length).trim();
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    val = val.slice(1, -1);
  }
  return val;
}

async function stripe(key, method, apiPath, form) {
  const res = await fetch(`https://api.stripe.com/v1${apiPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form ? new URLSearchParams(form).toString() : undefined,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`${method} ${apiPath}: ${json.error?.message || JSON.stringify(json)}`);
  }
  return json;
}

async function findOrCreateProduct(key, track) {
  if (track.productId) {
    const existing = await stripe(key, "GET", `/products/${track.productId}`);
    console.log(`Using product ${existing.id} for ${track.slug}`);
    await stripe(key, "POST", `/products/${existing.id}`, {
      "metadata[track_slug]": track.slug,
      "metadata[kanam_catalog]": "track",
    });
    return existing;
  }

  const search = await stripe(
    key,
    "GET",
    `/products/search?query=${encodeURIComponent(`metadata['track_slug']:'${track.slug}'`)}&limit=1`
  );
  if (search.data?.[0]?.id) {
    console.log(`Reusing product ${search.data[0].id} for ${track.slug}`);
    return search.data[0];
  }

  const product = await stripe(key, "POST", "/products", {
    name: track.name,
    description: track.description,
    "metadata[track_slug]": track.slug,
    "metadata[kanam_catalog]": "track",
  });
  console.log(`Created product ${product.id} for ${track.slug}`);
  return product;
}

async function findOrCreatePrice(key, track, productId) {
  const list = await stripe(
    key,
    "GET",
    `/prices?product=${encodeURIComponent(productId)}&active=true&limit=20`
  );
  const match = (list.data || []).find(
    (p) =>
      p.type === "one_time" &&
      p.unit_amount === track.unitAmount &&
      p.currency === "usd" &&
      p.metadata?.track_slug === track.slug
  );
  if (match) {
    console.log(`Reusing price ${match.id} for ${track.slug}`);
    return match;
  }

  const price = await stripe(key, "POST", "/prices", {
    product: productId,
    currency: "usd",
    unit_amount: String(track.unitAmount),
    "metadata[track_slug]": track.slug,
    "metadata[kanam_catalog]": "track",
  });
  console.log(`Created price ${price.id} for ${track.slug} ($${(track.unitAmount / 100).toFixed(0)})`);
  return price;
}

function patchCatalog(priceBySlug) {
  const catalogPath = path.join(root, "lib/billing/stripe-catalog.ts");
  let src = fs.readFileSync(catalogPath, "utf8");

  // Insert track price entries if missing
  for (const [slug, priceId] of Object.entries(priceBySlug)) {
    const entry = `    "${slug}": "${priceId}",`;
    if (src.includes(`"${slug}"`)) {
      src = src.replace(new RegExp(`"${slug}":\\s*"[^"]+"`), `"${slug}": "${priceId}"`);
    } else {
      src = src.replace(
        /("ai-literacy":\s*"[^"]+",)/,
        `$1\n${entry}`
      );
    }
  }

  // TRACK_SLUG_BY_PRICE mappings
  for (const slug of Object.keys(priceBySlug)) {
    const mapLine = `  [STRIPE_PRICE.tracks["${slug}"]]: "${slug}",`;
    if (!src.includes(`STRIPE_PRICE.tracks["${slug}"]`)) {
      src = src.replace(
        /(\[STRIPE_PRICE\.tracks\["ai-literacy"\]\]: "ai-literacy",)/,
        `$1\n${mapLine}`
      );
    }
  }

  fs.writeFileSync(catalogPath, src);
  console.log("Patched lib/billing/stripe-catalog.ts");
}

function enableBillingCheckout() {
  const billingPath = path.join(root, "app/billing/BillingClient.tsx");
  let src = fs.readFileSync(billingPath, "utf8");
  const before = src;
  src = src.replace(
    /\{\s*slug: "advanced-ai",\s*name: "Advanced AI",\s*price: "\$199",\s*\/\*\*[\s\S]*?\*\/\s*checkoutDisabled: true,\s*\},/,
    `{ slug: "advanced-ai", name: "Advanced AI", price: "$199" },`
  );
  src = src.replace(
    /\{\s*slug: "ap-csp-prep",\s*name: "AP CSP Prep",\s*price: "\$199",\s*\/\*\*[\s\S]*?\*\/\s*checkoutDisabled: true,\s*\},/,
    `{ slug: "ap-csp-prep", name: "AP CSP Prep", price: "$199" },`
  );
  if (src === before) {
    // Already enabled or format changed — force-clear flags if present
    src = src.replace(/\s*\/\*\* Create Stripe Price[\s\S]*?\*\/\s*checkoutDisabled: true,/g, "");
  }
  fs.writeFileSync(billingPath, src);
  console.log("Enabled checkout in app/billing/BillingClient.tsx");
}

async function main() {
  const key = loadSecretKey();
  if (!key || key.includes("...") || key.length < 20) {
    console.error(
      "Missing real STRIPE_SECRET_KEY.\n" +
        "Put your live (or test) secret in .env.local or pass:\n" +
        "  STRIPE_SECRET_KEY=sk_live_xxx node scripts/create-premier-track-prices.mjs"
    );
    process.exit(1);
  }

  const priceBySlug = {};
  for (const track of TRACKS) {
    const product = await findOrCreateProduct(key, track);
    const price = await findOrCreatePrice(key, track, product.id);
    priceBySlug[track.slug] = price.id;
  }

  patchCatalog(priceBySlug);
  enableBillingCheckout();

  console.log("\nDone. Premier track prices:");
  for (const [slug, id] of Object.entries(priceBySlug)) {
    console.log(`  ${slug}: ${id}`);
  }
  console.log("\nCommit the catalog + BillingClient changes when ready.");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
