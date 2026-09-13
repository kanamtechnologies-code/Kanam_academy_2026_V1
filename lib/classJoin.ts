import { getAppOrigin } from "@/lib/stripe";

export function classJoinPath(opts: {
  code: string;
  partnerSlug?: string | null;
}): string {
  const slug = (opts.partnerSlug ?? "").trim().toLowerCase();
  if (slug) return `/library/${encodeURIComponent(slug)}`;
  const code = opts.code.trim().toUpperCase();
  return `/welcome?classCode=${encodeURIComponent(code)}`;
}

export function classJoinUrl(
  opts: { code: string; partnerSlug?: string | null },
  request?: Request
): string {
  return `${getAppOrigin(request)}${classJoinPath(opts)}`;
}

export function classQrFilename(opts: { code: string; partnerSlug?: string | null; name?: string }) {
  const slug = (opts.partnerSlug ?? "").trim().toLowerCase();
  if (slug) return `kanam-${slug}-qr.png`;
  const code = opts.code.trim().toUpperCase().replace(/[^A-Z0-9-]+/g, "");
  return `kanam-class-${code || "join"}-qr.png`;
}
