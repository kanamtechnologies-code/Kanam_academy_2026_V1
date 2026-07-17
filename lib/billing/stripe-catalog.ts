/**
 * Live Stripe Price IDs for Kanam Academy self-serve catalog.
 * Keep in sync with Stripe Dashboard (Kanam Technologies).
 */

export const STRIPE_PRICE = {
  familySub: "price_1Ttx90DPeYE3b2sPRQu1hC3h",
  tracks: {
    "financial-literacy": "price_1TtxDNDPeYE3b2sPQ8fNNGyk",
    "digital-literacy": "price_1TtxGaDPeYE3b2sP9hHajnwx",
    "ai-literacy": "price_1TtxIkDPeYE3b2sP4E4HU5nb",
    "ai-python": "price_1TtxOdDPeYE3b2sPrFYmlwqL",
    cybersecurity: "price_1TtxdDDPeYE3b2sPPGExPktz",
    "data-analyst": "price_1TtxVdDPeYE3b2sPMXeaCT1V",
  },
  tutoring: {
    trial: "price_1TtxmODPeYE3b2sPJkziVQsa",
    session: "price_1TtxrnDPeYE3b2sPE9Ji3HDl",
    bundle4: "price_1TtxwuDPeYE3b2sPoFxVFquz",
    bundle8: "price_1Tty1qDPeYE3b2sPYyaAEmdR",
    bundle16: "price_1Tty5CDPeYE3b2sPxvUIA49b",
  },
} as const;

export type TrackSlug = keyof typeof STRIPE_PRICE.tracks;

export const TUTORING_SESSIONS_BY_PRICE: Record<string, number> = {
  [STRIPE_PRICE.tutoring.trial]: 1,
  [STRIPE_PRICE.tutoring.session]: 1,
  [STRIPE_PRICE.tutoring.bundle4]: 4,
  [STRIPE_PRICE.tutoring.bundle8]: 8,
  [STRIPE_PRICE.tutoring.bundle16]: 16,
};

export const TRACK_SLUG_BY_PRICE: Record<string, TrackSlug> = {
  [STRIPE_PRICE.tracks["financial-literacy"]]: "financial-literacy",
  [STRIPE_PRICE.tracks["digital-literacy"]]: "digital-literacy",
  [STRIPE_PRICE.tracks["ai-literacy"]]: "ai-literacy",
  [STRIPE_PRICE.tracks["ai-python"]]: "ai-python",
  [STRIPE_PRICE.tracks.cybersecurity]: "cybersecurity",
  [STRIPE_PRICE.tracks["data-analyst"]]: "data-analyst",
};

export function isFamilySubPrice(priceId: string): boolean {
  return priceId === STRIPE_PRICE.familySub;
}
