export type WelcomeEmailRole = "student" | "parent" | "instructor";

export type WelcomeEmailInput = {
  firstName: string;
  role: WelcomeEmailRole;
  appOrigin: string;
  /** True when they still need to open the Supabase confirmation link. */
  needsEmailConfirmation?: boolean;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function roleCopy(role: WelcomeEmailRole, needsEmailConfirmation?: boolean) {
  if (role === "parent") {
    const steps = [
      ...(needsEmailConfirmation
        ? [
            {
              title: "Confirm your email",
              body: "Open the confirmation link we sent once so your family account unlocks fully.",
            },
          ]
        : []),
      { title: "Add or switch kids", body: "Use the Parent hub to manage profiles and optional PINs." },
      { title: "Follow their progress", body: "Open Parent insights anytime to celebrate wins and stay in the loop." },
    ];
    return {
      eyebrow: "Family account",
      headline: "Welcome to your family’s learning home",
      intro:
        "You’re all set to support your learner. From the Parent hub you can see progress, manage kid profiles, and keep learning safe and on track.",
      ctaLabel: "Open Parent hub",
      ctaPath: "/parent",
      steps,
    };
  }
  if (role === "instructor") {
    return {
      eyebrow: "Instructor access",
      headline: "Welcome — your classroom tools are ready",
      intro:
        "Thanks for teaching with Kanam Academy. Create a class, share your code, and watch learners grow with real practice and clear progress.",
      ctaLabel: "Open Instructor dashboard",
      ctaPath: "/instructor",
      steps: [
        { title: "Sign in", body: "Use the email and password you just created." },
        { title: "Create a class", body: "Copy your class code and share it with students (or parents)." },
        { title: "Track progress", body: "See completion, XP, and who may need a nudge." },
      ],
    };
  }
  const steps = [
    ...(needsEmailConfirmation
      ? [
          {
            title: "Confirm your email",
            body: "Open the confirmation link we sent so you can sign in anytime.",
          },
        ]
      : []),
    { title: "Open your dashboard", body: "Pick up your track and see XP, badges, and what’s next." },
    { title: "Learn by doing", body: "Work through guided lessons, then practice until it clicks." },
  ];
  return {
    eyebrow: "You’re in",
    headline: "Welcome — your Computer Science journey starts here",
    intro:
      "We’re glad you’re here. Whether you’re in high school or coming to tech later, Kanam Academy is built to help you learn with confidence and take real steps forward.",
    ctaLabel: "Go to your dashboard",
    ctaPath: "/dashboard",
    steps,
  };
}

export function welcomeEmailSubject(role: WelcomeEmailRole, firstName: string) {
  const name = firstName.trim() || "there";
  if (role === "parent") return `${name}, welcome to Kanam Academy — your family hub is ready`;
  if (role === "instructor") return `${name}, welcome to Kanam Academy — your instructor dashboard awaits`;
  return `${name}, welcome to Kanam Academy — let’s build your future in tech`;
}

export function renderWelcomeEmailHtml(input: WelcomeEmailInput) {
  const firstName = escapeHtml(input.firstName.trim() || "friend");
  const origin = input.appOrigin.replace(/\/$/, "");
  const copy = roleCopy(input.role, input.needsEmailConfirmation);
  const ctaUrl = `${origin}${copy.ctaPath}`;
  const brandUrl = `${origin}/images/kanam-email-brand.png`;
  const helpUrl = `${origin}/help`;
  const confirmNote = input.needsEmailConfirmation
    ? `<p style="margin:14px 0 0 0;padding:12px 14px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;font-size:13px;line-height:1.5;color:#065f46;">
        <strong>One quick step:</strong> check your inbox for a confirmation email and open the link once. That unlocks full sign-in on any device.
      </p>`
    : "";

  const stepsHtml = copy.steps
    .map(
      (step, i) => `
      <tr>
        <td style="padding:10px 0;${i < copy.steps.length - 1 ? "border-bottom:1px solid #e2e8f0;" : ""}">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td width="36" valign="top" style="padding-right:12px;">
                <div style="width:28px;height:28px;border-radius:999px;background:linear-gradient(135deg,#0f6e57,#18a16d);color:#ffffff;font-size:13px;font-weight:800;line-height:28px;text-align:center;">
                  ${i + 1}
                </div>
              </td>
              <td valign="top">
                <p style="margin:0;font-size:15px;font-weight:800;color:#0f172a;">${escapeHtml(step.title)}</p>
                <p style="margin:4px 0 0 0;font-size:13px;line-height:1.5;color:#475569;">${escapeHtml(step.body)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Kanam Academy</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',system-ui,-apple-system,BlinkMacSystemFont,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f1f5f9;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 18px 40px rgba(15,23,42,0.08);">

          <tr>
            <td style="padding:22px 28px 8px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-size:22px;font-weight:900;color:#0f6e57;letter-spacing:-0.02em;">
                    Kanam Academy
                  </td>
                  <td align="right">
                    <span style="display:inline-block;font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#ffffff;background:linear-gradient(135deg,#0f6e57,#18a16d);padding:8px 12px;border-radius:999px;">
                      Move forward.
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 18px 8px 18px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(125deg,#0a6f5b 0%,#0f8b73 44%,#d8c07a 100%);border-radius:16px;">
                <tr>
                  <td style="padding:26px 24px;color:#ffffff;" align="center">
                    <img src="${brandUrl}" width="56" height="56" alt="Kanam Academy" style="display:block;margin:0 auto 14px auto;border-radius:14px;background:#ffffff;padding:6px;" />
                    <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;opacity:0.92;">
                      ${escapeHtml(copy.eyebrow)}
                    </p>
                    <h1 style="margin:10px 0 0 0;font-size:26px;line-height:1.25;font-weight:900;letter-spacing:-0.02em;">
                      ${escapeHtml(copy.headline)}
                    </h1>
                    <p style="margin:12px 0 0 0;font-size:15px;line-height:1.55;opacity:0.96;max-width:460px;">
                      Hi ${firstName} — ${escapeHtml(copy.intro)}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 28px 4px 28px;">
              ${confirmNote}
            </td>
          </tr>

          <tr>
            <td style="padding:18px 28px 8px 28px;">
              <p style="margin:0 0 8px 0;font-size:12px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#0f6e57;">
                Your next steps
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                ${stepsHtml}
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:22px 28px 10px 28px;">
              <a href="${ctaUrl}" style="display:inline-block;background:linear-gradient(135deg,#0f6e57,#18a16d);color:#ffffff;text-decoration:none;font-weight:800;font-size:15px;padding:14px 28px;border-radius:999px;box-shadow:0 10px 24px rgba(15,110,87,0.28);">
                ${escapeHtml(copy.ctaLabel)}
              </a>
              <p style="margin:14px 0 0 0;font-size:12px;color:#64748b;line-height:1.45;">
                Or paste this link into your browser:<br />
                <a href="${ctaUrl}" style="color:#0f6e57;word-break:break-all;">${escapeHtml(ctaUrl)}</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 28px 28px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
                <tr>
                  <td style="padding:16px 18px;font-size:13px;line-height:1.55;color:#475569;">
                    <strong style="color:#0f172a;">We’re with you.</strong>
                    Questions? Visit <a href="${helpUrl}" style="color:#0f6e57;font-weight:700;">Help</a>
                    or reply to this email — a real person on the Kanam team will help you get unstuck.
                  </td>
                </tr>
              </table>
              <p style="margin:18px 0 0 0;font-size:11px;line-height:1.5;color:#94a3b8;text-align:center;">
                Kanam Academy · Learn by doing · <a href="${origin}" style="color:#0f6e57;text-decoration:none;">${escapeHtml(origin.replace(/^https?:\/\//, ""))}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderWelcomeEmailText(input: WelcomeEmailInput) {
  const firstName = input.firstName.trim() || "friend";
  const origin = input.appOrigin.replace(/\/$/, "");
  const copy = roleCopy(input.role, input.needsEmailConfirmation);
  const lines = [
    `Hi ${firstName},`,
    "",
    copy.headline,
    "",
    copy.intro,
    "",
    input.needsEmailConfirmation
      ? "One quick step: open the confirmation email we sent so your account unlocks fully."
      : null,
    "",
    "Your next steps:",
    ...copy.steps.map((s, i) => `${i + 1}. ${s.title} — ${s.body}`),
    "",
    `${copy.ctaLabel}: ${origin}${copy.ctaPath}`,
    "",
    `Help: ${origin}/help`,
    "",
    "— Kanam Academy",
  ];
  return lines.filter((x) => x !== null).join("\n");
}
