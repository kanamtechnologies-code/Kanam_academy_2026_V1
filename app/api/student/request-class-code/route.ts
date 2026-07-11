import { NextResponse } from "next/server";

import { ensureAsyncClass, getAsyncClassCode } from "@/lib/asyncClass";
import { sendAsyncClassCodeEmail } from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type Body = { email?: string };

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

/** Simple in-memory rate limit: one request per email per 60s (per server instance). */
const recent = new Map<string, number>();

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = s(body.email).toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 400 });
  }

  const now = Date.now();
  const last = recent.get(email) ?? 0;
  if (now - last < 60_000) {
    return NextResponse.json(
      { ok: false, error: "Check your inbox — we recently emailed this address. Try again in a minute." },
      { status: 429 }
    );
  }
  recent.set(email, now);

  try {
    const admin = createSupabaseAdminClient();
    const klass = await ensureAsyncClass(admin);
    const code = getAsyncClassCode();

    const sent = await sendAsyncClassCodeEmail({
      to: email,
      classCode: code,
      className: klass.name,
    });

    if (!sent.ok) {
      return NextResponse.json({ ok: false, error: sent.error }, { status: 502 });
    }

    // In local/dev without Resend, still return the shared code so onboarding can proceed.
    const includeCode = Boolean(sent.skipped) || process.env.NODE_ENV !== "production";

    return NextResponse.json(
      {
        ok: true,
        emailed: !sent.skipped,
        message: sent.skipped
          ? "Email is not configured on this server. Use the self-paced class code shown below."
          : "Check your email for your self-paced class code.",
        ...(includeCode ? { classCode: code } : {}),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Could not send a class code right now.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
