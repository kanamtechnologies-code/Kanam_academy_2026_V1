/** Public marketing site (kanamacademy.com), not the learn app. */
export function getMarketingSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_MARKETING_SITE_URL?.trim().replace(/\/$/, "");
  return fromEnv || "https://www.kanamacademy.com";
}
