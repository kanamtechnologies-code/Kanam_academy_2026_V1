import { NextResponse } from "next/server";

import { requireInstructorSession } from "@/lib/auth/requireInstructor";
import { classJoinUrl } from "@/lib/classJoin";
import { createCustomLibraryClass, ensureLibraryPartnerClass } from "@/lib/ensureLibraryClass";
import { findLibraryPartnerByCode, getLibraryPartner, slugifyPartnerName } from "@/lib/libraryPartners";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isMissingColumnError } from "@/lib/supabase/missingColumn";

export const runtime = "nodejs";

function randomClassCode() {
  // Avoid confusing characters (O/0, I/1).
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += alphabet[bytes[i] % alphabet.length];
  return `KANAM-${s}`;
}

type ClassRow = {
  id: string;
  name: string;
  code: string;
  created_at: string;
  kind?: string | null;
  partner_slug?: string | null;
  school?: { name?: string | null } | null;
  class_enrollments?: Array<{ count?: number }> | null;
};

function toSummary(r: ClassRow, request?: Request) {
  const count = Array.isArray(r.class_enrollments) ? r.class_enrollments[0]?.count : undefined;
  const inferred = findLibraryPartnerByCode(r.code);
  const partnerSlug = r.partner_slug ?? inferred?.slug ?? null;
  const kind = r.kind === "library" || partnerSlug ? "library" : "standard";
  return {
    id: r.id,
    name: r.name,
    code: r.code,
    createdAt: r.created_at,
    schoolName: r.school?.name ?? null,
    learnerCount: typeof count === "number" ? count : 0,
    kind,
    partnerSlug,
    joinUrl: classJoinUrl({ code: r.code, partnerSlug }, request),
  };
}

export async function GET(req: Request) {
  const gate = await requireInstructorSession();
  if (!gate.ok) return gate.response;
  const { supabase } = gate;

  const withPartner = await supabase
    .from("classes")
    .select("id, name, code, created_at, kind, partner_slug, school:schools(name), class_enrollments(count)")
    .order("created_at", { ascending: false });

  let rows = withPartner.data as ClassRow[] | null;
  if (withPartner.error) {
    if (!isMissingColumnError(withPartner.error)) {
      return NextResponse.json({ ok: false, error: withPartner.error.message }, { status: 500 });
    }
    const fallback = await supabase
      .from("classes")
      .select("id, name, code, created_at, school:schools(name), class_enrollments(count)")
      .order("created_at", { ascending: false });
    if (fallback.error) {
      return NextResponse.json({ ok: false, error: fallback.error.message }, { status: 500 });
    }
    rows = fallback.data as ClassRow[] | null;
  }

  const classes = (rows ?? []).map((r) => toSummary(r, req));
  return NextResponse.json({ ok: true, classes }, { status: 200 });
}

export async function POST(req: Request) {
  const gate = await requireInstructorSession();
  if (!gate.ok) return gate.response;
  const { user } = gate;

  let body: {
    name?: string;
    schoolName?: string;
    kind?: string;
    partnerSlug?: string;
  };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const kind = body.kind === "library" ? "library" : "standard";
  const requestedSlug = (body.partnerSlug ?? "").trim().toLowerCase();
  const catalogPartner = requestedSlug ? getLibraryPartner(requestedSlug) : null;
  const name = (body.name ?? "").trim();
  const schoolName = (body.schoolName ?? "").trim();

  if (kind === "library" && catalogPartner) {
    try {
      const admin = createSupabaseAdminClient();
      const klass = await ensureLibraryPartnerClass(catalogPartner.slug, admin, {
        ownerUserId: user.id,
      });
      return NextResponse.json(
        {
          ok: true,
          klass: {
            id: klass.id,
            name: klass.name,
            code: klass.code,
            createdAt: new Date().toISOString(),
            schoolName: klass.schoolName,
            learnerCount: 0,
            kind: "library" as const,
            partnerSlug: klass.partnerSlug,
            joinUrl: classJoinUrl({ code: klass.code, partnerSlug: klass.partnerSlug }, req),
          },
        },
        { status: 200 }
      );
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Could not create library class.";
      return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
  }

  if (kind === "library") {
    const libraryName = schoolName || name;
    if (!libraryName) {
      return NextResponse.json(
        { ok: false, error: "Library name is required." },
        { status: 400 }
      );
    }
    let lastErr: string | null = null;
    for (let i = 0; i < 10; i++) {
      const code = randomClassCode().toUpperCase();
      const slugBase = requestedSlug || slugifyPartnerName(libraryName);
      const partnerSlug = i === 0 ? slugBase : `${slugBase}-${code.slice(-3).toLowerCase()}`;
      try {
        const admin = createSupabaseAdminClient();
        const klass = await createCustomLibraryClass({
          admin,
          ownerUserId: user.id,
          libraryName,
          className: name || undefined,
          code,
          partnerSlug,
        });
        return NextResponse.json(
          {
            ok: true,
            klass: {
              id: klass.id,
              name: klass.name,
              code: klass.code,
              createdAt: new Date().toISOString(),
              schoolName: klass.schoolName,
              learnerCount: 0,
              kind: "library" as const,
              partnerSlug: klass.partnerSlug,
              joinUrl: classJoinUrl({ code: klass.code, partnerSlug: klass.partnerSlug }, req),
            },
          },
          { status: 200 }
        );
      } catch (e: unknown) {
        lastErr = e instanceof Error ? e.message : "Could not create class.";
        if (!String(lastErr).toLowerCase().includes("duplicate")) break;
      }
    }
    return NextResponse.json({ ok: false, error: lastErr ?? "Could not create class." }, { status: 500 });
  }

  if (!name) return NextResponse.json({ ok: false, error: "Class name is required." }, { status: 400 });

  const supabase = gate.supabase;
  let schoolId: string | null = null;
  if (schoolName) {
    const { data: existing, error: findErr } = await supabase
      .from("schools")
      .select("id")
      .eq("name", schoolName)
      .maybeSingle();
    if (findErr) return NextResponse.json({ ok: false, error: findErr.message }, { status: 500 });

    if (existing?.id) {
      schoolId = existing.id as string;
    } else {
      const { data: inserted, error: insertErr } = await supabase
        .from("schools")
        .insert({ name: schoolName })
        .select("id")
        .single();
      if (insertErr) {
        return NextResponse.json({ ok: false, error: insertErr.message }, { status: 500 });
      }
      schoolId = (inserted as { id?: string } | null)?.id ?? null;
    }
  }

  let lastErr: string | null = null;
  for (let i = 0; i < 10; i++) {
    const code = randomClassCode().toUpperCase();
    const { data: inserted, error: insErr } = await supabase
      .from("classes")
      .insert({
        teacher_user_id: user.id,
        school_id: schoolId,
        name,
        code,
      })
      .select("id, name, code, created_at, school:schools(name)")
      .single();

    if (!insErr && inserted?.id) {
      return NextResponse.json(
        {
          ok: true,
          klass: {
            id: inserted.id as string,
            name: inserted.name as string,
            code: inserted.code as string,
            createdAt: inserted.created_at as string,
            schoolName:
              (inserted as { school?: { name?: string | null } | null } | null)?.school?.name ?? null,
            learnerCount: 0,
            kind: "standard" as const,
            partnerSlug: null,
            joinUrl: classJoinUrl({ code: inserted.code as string }, req),
          },
        },
        { status: 200 }
      );
    }

    lastErr = insErr?.message ?? "Could not create class.";
    if (!String(lastErr).toLowerCase().includes("duplicate")) break;
  }

  return NextResponse.json({ ok: false, error: lastErr ?? "Could not create class." }, { status: 500 });
}
