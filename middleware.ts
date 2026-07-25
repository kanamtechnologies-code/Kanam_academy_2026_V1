import { NextResponse, type NextRequest } from "next/server";

import {
  isProtectedApi,
  isPublicPage,
  loginRedirectPath,
  protectedPageRule,
} from "@/lib/auth/routeProtection";
import { isInstructorRole, postSignInPath } from "@/lib/roles";
import { updateSession, withSessionCookies } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const { response, user } = await updateSession(request);

  // --- API: hard 401 when session missing ---
  if (pathname.startsWith("/api/")) {
    if (isProtectedApi(pathname) && !user) {
      return withSessionCookies(
        response,
        NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 })
      );
    }
    return response;
  }

  // Static / public pages: session still refreshed above
  if (isPublicPage(pathname)) {
    return response;
  }

  const rule = protectedPageRule(pathname);
  if (!rule) {
    // Unknown app page — allow through (session refreshed). Prefer adding an
    // explicit rule when introducing new private surfaces.
    return response;
  }

  if (!user) {
    const loginUrl = new URL(loginRedirectPath(pathname, search), request.url);
    return withSessionCookies(response, NextResponse.redirect(loginUrl));
  }

  if (rule.kind === "instructor" && !isInstructorRole(user)) {
    const home = postSignInPath(user);
    const dest = request.nextUrl.clone();
    dest.pathname = home;
    dest.search = "";
    return withSessionCookies(response, NextResponse.redirect(dest));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on app routes + APIs. Skip Next internals and common static assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
