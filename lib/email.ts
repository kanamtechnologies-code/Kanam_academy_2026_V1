type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

/**
 * Send transactional email via Resend.
 * If RESEND_API_KEY is missing (local/dev), returns { ok: true, skipped: true }.
 */
export async function sendEmail(args: SendEmailArgs): Promise<
  { ok: true; skipped?: boolean; id?: string } | { ok: false; error: string }
> {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  const from =
    (process.env.KANAM_EMAIL_FROM || "").trim() || "Kanam Academy <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping send.", {
      to: args.to,
      subject: args.subject,
    });
    return { ok: true, skipped: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [args.to],
        subject: args.subject,
        html: args.html,
        text: args.text,
      }),
    });

    const json = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
    if (!res.ok) {
      return { ok: false, error: json.message || `Email failed (${res.status}).` };
    }
    return { ok: true, id: json.id };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Email failed.";
    return { ok: false, error: message };
  }
}

export async function sendAsyncClassCodeEmail(opts: {
  to: string;
  classCode: string;
  className: string;
}) {
  const code = opts.classCode.toUpperCase();
  const subject = "Your Kanam Academy self-paced class code";
  const text = [
    "Welcome to Kanam Academy!",
    "",
    "You're joining our self-paced learner group. Use this class code when you create your account:",
    "",
    code,
    "",
    `Group: ${opts.className}`,
    "",
    "Enter the code on the welcome screen, then finish creating your profile.",
    "",
    "— Kanam Academy",
  ].join("\n");

  const html = `
  <div style="font-family:Georgia,serif;line-height:1.5;color:#0f172a;max-width:520px;margin:0 auto;padding:24px">
    <p style="font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:#187a55;font-weight:700;margin:0 0 8px">Kanam Academy</p>
    <h1 style="font-size:24px;margin:0 0 12px;color:#0b3d30">Your self-paced class code</h1>
    <p style="margin:0 0 16px;color:#334155">You're joining our self-paced learner group. Use this code when you create your account:</p>
    <p style="font-size:28px;font-weight:800;letter-spacing:0.08em;margin:0 0 8px;padding:16px 18px;border-radius:14px;background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;text-align:center">${code}</p>
    <p style="margin:0 0 20px;font-size:13px;color:#64748b">Group: ${opts.className}</p>
    <p style="margin:0;color:#334155">Enter the code on the welcome screen, then finish creating your profile.</p>
  </div>`;

  return sendEmail({ to: opts.to, subject, html, text });
}
