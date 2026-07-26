/**
 * Central route classification for auth middleware.
 * Pages/APIs still do their own fine-grained checks; this prevents
 * unauthenticated access to clearly private surfaces.
 */

export type ProtectedPageRule =
  | { kind: "auth" }
  | { kind: "instructor" };

function pathOnly(pathname: string): string {
  if (!pathname) return "/";
  return pathname.endsWith("/") && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;
}

function startsWithPath(pathname: string, prefix: string): boolean {
  const p = pathOnly(pathname);
  const pre = pathOnly(prefix);
  return p === pre || p.startsWith(`${pre}/`);
}

/** Public marketing / onboarding / demo surfaces — no login required. */
export function isPublicPage(pathname: string): boolean {
  const p = pathOnly(pathname);
  if (p === "/welcome" || startsWithPath(p, "/welcome")) return true;
  if (p === "/demo" || startsWithPath(p, "/demo")) return true;
  if (p === "/help") return true;
  if (p === "/billing") return true; // plan browsing; checkout is gated
  if (p === "/auth" || startsWithPath(p, "/auth")) return true;
  // Only the guided demo lesson is public; all other /learn/* require auth.
  if (p === "/learn/demo") return true;
  return false;
}

/** Pages that require a signed-in user (and optional role). */
export function protectedPageRule(pathname: string): ProtectedPageRule | null {
  const p = pathOnly(pathname);
  if (startsWithPath(p, "/instructor")) return { kind: "instructor" };
  if (startsWithPath(p, "/parent")) return { kind: "auth" };
  if (startsWithPath(p, "/account")) return { kind: "auth" };
  if (startsWithPath(p, "/checkout")) return { kind: "auth" };
  if (startsWithPath(p, "/billing/success")) return { kind: "auth" };
  if (p === "/dashboard") return { kind: "auth" };
  if (p === "/learn" || startsWithPath(p, "/learn")) {
    if (p === "/learn/demo") return null;
    return { kind: "auth" };
  }
  return null;
}

/**
 * APIs that must reject unauthenticated callers with 401.
 * Default is protected for every `/api/*` route; only an explicit allowlist is public.
 */
export function isProtectedApi(pathname: string): boolean {
  const p = pathOnly(pathname);
  if (!p.startsWith("/api/")) return false;

  // Explicit public allowlist (everything else under /api requires a session)
  if (p === "/api/auth/signup" || p === "/api/auth/signup-parent") return false;
  if (p === "/api/student/request-class-code") return false;
  if (p === "/api/student/validate-class-code") return false;
  // Invite-code gated (handler still verifies secret)
  if (startsWithPath(p, "/api/admin")) return false;
  // Stripe signature verified in handler
  if (startsWithPath(p, "/api/stripe")) return false;
  if (p === "/api/health") return false;
  // Guided demo can narrate without an account; handler rate-limits by user or IP
  if (p === "/api/lesson/speak") return false;

  return true;
}

/** Safe relative return path for ?next= after sign-in. */
export function loginRedirectPath(pathname: string, search: string): string {
  const next = `${pathname}${search || ""}`;
  return `/welcome?next=${encodeURIComponent(next)}`;
}
