import { NextResponse } from "next/server";

import { requireInstructorSession } from "@/lib/auth/requireInstructor";
import { classJoinUrl, classQrFilename } from "@/lib/classJoin";
import { classQrPngBuffer } from "@/lib/qr/generateClassQr";
import { isMissingColumnError } from "@/lib/supabase/missingColumn";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ classId: string }> }
) {
  const gate = await requireInstructorSession();
  if (!gate.ok) return gate.response;
  const { supabase } = gate;
  const { classId } = await ctx.params;

  const withPartner = await supabase
    .from("classes")
    .select("id, name, code, partner_slug")
    .eq("id", classId)
    .maybeSingle();

  let klass = withPartner.data as {
    id?: string;
    name?: string;
    code?: string;
    partner_slug?: string | null;
  } | null;

  if (withPartner.error) {
    if (!isMissingColumnError(withPartner.error)) {
      return NextResponse.json({ ok: false, error: withPartner.error.message }, { status: 500 });
    }
    const fallback = await supabase.from("classes").select("id, name, code").eq("id", classId).maybeSingle();
    if (fallback.error) {
      return NextResponse.json({ ok: false, error: fallback.error.message }, { status: 500 });
    }
    klass = fallback.data;
  }

  if (!klass?.id || !klass.code) {
    return NextResponse.json({ ok: false, error: "Class not found." }, { status: 404 });
  }

  const joinUrl = classJoinUrl({ code: klass.code, partnerSlug: klass.partner_slug }, req);
  const png = await classQrPngBuffer(joinUrl);
  const filename = classQrFilename({
    code: klass.code,
    partnerSlug: klass.partner_slug,
    name: klass.name,
  });

  return new NextResponse(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
