import { STRIPE_PRICE, isFamilySubPrice } from "@/lib/billing/stripe-catalog";

const TRACK_LABELS: Record<string, string> = {
  "financial-literacy": "Financial Literacy",
  "digital-literacy": "Digital Literacy",
  "ai-literacy": "AI Literacy",
  "advanced-ai": "Advanced AI",
  "ap-csp-prep": "AP CSP Prep",
  "ai-python": "Python & AI Foundations",
  cybersecurity: "Cybersecurity",
  "data-analyst": "Data Analyst Track",
};

const TUTORING_LABELS: Record<string, string> = {
  trial: "Tutoring trial session",
  session: "Single tutoring session",
  bundle4: "4-session tutoring bundle",
  bundle8: "8-session tutoring bundle",
  bundle16: "16-session tutoring bundle",
};

export function trackLabel(slug: string): string {
  return TRACK_LABELS[slug] ?? slug;
}

export function tutoringLabel(sku: string): string {
  return TUTORING_LABELS[sku] ?? sku;
}

export function priceIdLabel(priceId: string | null | undefined): string {
  if (!priceId) return "Plan";
  if (isFamilySubPrice(priceId)) return "Family subscription";
  for (const [slug, id] of Object.entries(STRIPE_PRICE.tracks)) {
    if (id === priceId) return trackLabel(slug);
  }
  for (const [sku, id] of Object.entries(STRIPE_PRICE.tutoring)) {
    if (id === priceId) return tutoringLabel(sku);
  }
  return "Kanam purchase";
}

export function formatMoney(amountCents: number | null, currency = "usd"): string {
  if (amountCents == null || !Number.isFinite(amountCents)) return "—";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amountCents / 100);
  } catch {
    return `$${(amountCents / 100).toFixed(2)}`;
  }
}
