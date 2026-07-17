import {
  STRIPE_PRICE,
  type TrackSlug,
  isFamilySubPrice,
} from "@/lib/billing/stripe-catalog";

export type CheckoutKind = "subscription" | "track" | "tutoring";

export type TutoringSku = keyof typeof STRIPE_PRICE.tutoring;

export function resolveCheckoutPrice(input: {
  kind: CheckoutKind;
  trackSlug?: string;
  tutoringSku?: string;
}): { priceId: string; mode: "subscription" | "payment" } {
  if (input.kind === "subscription") {
    return { priceId: STRIPE_PRICE.familySub, mode: "subscription" };
  }

  if (input.kind === "track") {
    const slug = input.trackSlug as TrackSlug | undefined;
    if (!slug || !(slug in STRIPE_PRICE.tracks)) {
      throw new Error("Invalid trackSlug.");
    }
    return { priceId: STRIPE_PRICE.tracks[slug], mode: "payment" };
  }

  if (input.kind === "tutoring") {
    const sku = input.tutoringSku as TutoringSku | undefined;
    if (!sku || !(sku in STRIPE_PRICE.tutoring)) {
      throw new Error("Invalid tutoringSku. Use trial | session | bundle4 | bundle8 | bundle16.");
    }
    return { priceId: STRIPE_PRICE.tutoring[sku], mode: "payment" };
  }

  throw new Error("Invalid kind.");
}

export { isFamilySubPrice };
