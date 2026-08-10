import { NextResponse } from "next/server";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Best-effort cleanup so long-lived instances don't grow without bound. */
function prune(now: number) {
  if (buckets.size < 2_000) return;
  for (const [key, row] of buckets) {
    if (now >= row.resetAt) buckets.delete(key);
  }
}

export function clientIpFromRequest(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export type RateLimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; remaining: number; resetAt: number; retryAfterSec: number };

/**
 * Fixed-window rate limiter (in-memory per server instance).
 * Good enough to blunt signup/invite abuse on Vercel; not a global store.
 */
export function takeRateLimit(
  key: string,
  opts: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  prune(now);
  const row = buckets.get(key);
  if (!row || now >= row.resetAt) {
    const resetAt = now + opts.windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: Math.max(0, opts.limit - 1), resetAt };
  }
  row.count += 1;
  const remaining = Math.max(0, opts.limit - row.count);
  if (row.count > opts.limit) {
    return {
      ok: false,
      remaining: 0,
      resetAt: row.resetAt,
      retryAfterSec: Math.max(1, Math.ceil((row.resetAt - now) / 1000)),
    };
  }
  return { ok: true, remaining, resetAt: row.resetAt };
}

/** Enforce one or more buckets; returns a 429 response when any is exceeded. */
export function enforceRateLimits(
  checks: Array<{ key: string; limit: number; windowMs: number }>,
  message = "Too many attempts. Please wait a minute and try again."
): NextResponse | null {
  let worst: Extract<RateLimitResult, { ok: false }> | null = null;
  for (const check of checks) {
    const result = takeRateLimit(check.key, check);
    if (!result.ok && (!worst || result.retryAfterSec > worst.retryAfterSec)) {
      worst = result;
    }
  }
  if (!worst) return null;
  return NextResponse.json(
    { ok: false, error: message },
    {
      status: 429,
      headers: {
        "Retry-After": String(worst.retryAfterSec),
        "X-RateLimit-Remaining": "0",
      },
    }
  );
}

/** Common presets for public auth / admin surfaces. */
export const AUTH_RATE_LIMITS = {
  signupIp: { limit: 8, windowMs: 15 * 60 * 1000 },
  signupEmail: { limit: 5, windowMs: 60 * 60 * 1000 },
  passwordResetIp: { limit: 10, windowMs: 15 * 60 * 1000 },
  passwordResetEmail: { limit: 5, windowMs: 60 * 60 * 1000 },
  adminInviteIp: { limit: 10, windowMs: 15 * 60 * 1000 },
  classCodeIp: { limit: 30, windowMs: 10 * 60 * 1000 },
  requestClassCodeIp: { limit: 20, windowMs: 10 * 60 * 1000 },
} as const;
