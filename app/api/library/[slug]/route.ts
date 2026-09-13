import { NextResponse } from "next/server";

import {
  AUTH_RATE_LIMITS,
  clientIpFromRequest,
  enforceRateLimits,
} from "@/lib/auth/rateLimit";
import { classJoinUrl } from "@/lib/classJoin";
import { ensureLibraryPartnerClass } from "@/lib/ensureLibraryClass";
import { getLibraryPartner, trackTitlesForIds } from "@/lib/libraryPartners";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isMissingColumnError } from "@/lib/supabase/missingColumn";

export const runtime = "nodejs";

function publicPayload(
  opts: {
    slug: string;
    name: string;
    location: string;
    className: string;
    classCode: string;
    trackIds: string[];
    headline: string;
    description: string;
    cardName: string;
  },
  req: Request
) {
  return {
    ok: true as const,
    slug: opts.slug,
    name: opts.name,
    location: opts.location,
    className: opts.className,
    classCode: opts.classCode,
    trackTitles: trackTitlesForIds(opts.trackIds),
    headline: opts.headline,
    description: opts.description,
    cardName: opts.cardName,
    joinUrl: classJoinUrl({ code: opts.classCode, partnerSlug: opts.slug }, req),
    signupUrl: `/welcome?classCode=${encodeURIComponent(opts.classCode)}`,
  };
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  const ip = clientIpFromRequest(req);
  const limited = enforceRateLimits(
    [{ key: `library-partner:ip:${ip}`, ...AUTH_RATE_LIMITS.classCodeIp }],
    "Too many library lookups. Please wait and try again."
  );
  if (limited) return limited;

  const { slug: rawSlug } = await ctx.params;
  const slug = decodeURIComponent(rawSlug ?? "").trim().toLowerCase();
  if (!slug) {
    return NextResponse.json({ ok: false, error: "Library partner not found." }, { status: 404 });
  }

  const catalog = getLibraryPartner(slug);
  if (catalog) {
    try {
      const admin = createSupabaseAdminClient();
      const klass = await ensureLibraryPartnerClass(catalog.slug, admin);
      return NextResponse.json(
        publicPayload(
          {
            slug: catalog.slug,
            name: catalog.name,
            location: catalog.location,
            className: klass.name,
            classCode: klass.code,
            trackIds: catalog.trackIds,
            headline: catalog.headline,
            description: catalog.description,
            cardName: catalog.cardName,
          },
          req
        ),
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        publicPayload(
          {
            slug: catalog.slug,
            name: catalog.name,
            location: catalog.location,
            className: catalog.className,
            classCode: catalog.classCode,
            trackIds: catalog.trackIds,
            headline: catalog.headline,
            description: catalog.description,
            cardName: catalog.cardName,
          },
          req
        ),
        { status: 200 }
      );
    }
  }

  try {
    const admin = createSupabaseAdminClient();
    const withPartner = await admin
      .from("classes")
      .select("id, name, code, partner_slug, school:schools(name)")
      .eq("partner_slug", slug)
      .maybeSingle();

    if (withPartner.error && !isMissingColumnError(withPartner.error)) {
      return NextResponse.json({ ok: false, error: withPartner.error.message }, { status: 500 });
    }

    const row = withPartner.data as {
      id?: string;
      name?: string;
      code?: string;
      partner_slug?: string | null;
      school?: { name?: string | null } | null;
    } | null;

    if (!row?.id || !row.code) {
      return NextResponse.json({ ok: false, error: "Library partner not found." }, { status: 404 });
    }

    const libraryName = row.school?.name || row.name || "Library partnership";
    return NextResponse.json(
      publicPayload(
        {
          slug,
          name: libraryName,
          location: "",
          className: row.name || libraryName,
          classCode: String(row.code).toUpperCase(),
          trackIds: ["digital-literacy", "financial-literacy"],
          headline: "Welcome.",
          description: "We're glad you're here. You can learn digital skills and money skills — free with your library card.",
          cardName: "library card",
        },
        req
      ),
      { status: 200 }
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Could not load this library class.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
