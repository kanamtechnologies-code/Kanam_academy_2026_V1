import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key, {
      apiVersion: "2026-06-24.dahlia",
      typescript: true,
    });
  }
  return stripeClient;
}

export function getAppOrigin(request?: Request): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (request) {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    const proto = request.headers.get("x-forwarded-proto") ?? "https";
    if (host) return `${proto}://${host}`;
  }

  return "https://learn.kanamacademy.com";
}
