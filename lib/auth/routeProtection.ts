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
  // Guest demo + LessonAccessGate handle /learn and /dashboard
  if (p === "/dashboard") return true;
  if (p === "/learn" || startsWithPath(p, "/learn")) return true;
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
  return null;
}

/** APIs that must reject unauthenticated callers with 401. */
export function isProtectedApi(pathname: string): boolean {
  const p = pathOnly(pathname);
  if (!p.startsWith("/api/")) return false;

  // Explicitly public
  if (p === "/api/auth/signup" || p === "/api/auth/signup-parent") return false;
  if (startsWithPath(p, "/api/admin")) return false;
  if (startsWithPath(p, "/api/stripe")) return false;
  if (p === "/api/health") return false;
  if (startsWithPath(p, "/api/lesson")) return false;

  // Everything else under these namespaces requires a session
  if (startsWithPath(p, "/api/parent")) return true;
  if (startsWithPath(p, "/api/instructor")) return true;
  if (startsWithPath(p, "/api/billing")) return true;
  if (startsWithPath(p, "/api/student")) return true;
  if (p === "/api/auth/ensure-profile") return true;
  if (p === "/api/auth/convert-to-parent") return true;

  return false;
}

/** Safe relative return path for ?next= after sign-in. */
export function loginRedirectPath(pathname: string, search: string): string {
  const next = `${pathname}${search || ""}`;
  return `/welcome?next=${encodeURIComponent(next)}`;
}
