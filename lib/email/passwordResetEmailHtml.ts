export type PasswordResetEmailInput = {
  appOrigin: string;
  resetUrl: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function passwordResetEmailSubject() {
  return "Reset your Kanam Academy password";
}

export function renderPasswordResetEmailHtml(input: PasswordResetEmailInput) {
  const origin = input.appOrigin.replace(/\/$/, "");
  const brandUrl = `${origin}/images/kanam-email-brand.png`;
  const resetUrl = escapeHtml(input.resetUrl);
  const helpUrl = `${origin}/help`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your password</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',system-ui,-apple-system,BlinkMacSystemFont,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f1f5f9;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 18px 40px rgba(15,23,42,0.08);">
          <tr>
            <td style="padding:22px 28px 8px 28px;">
              <p style="margin:0;font-size:22px;font-weight:900;color:#0f6e57;letter-spacing:-0.02em;">Kanam Academy</p>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 18px 8px 18px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(125deg,#0a6f5b 0%,#0f8b73 44%,#d8c07a 100%);border-radius:16px;">
                <tr>
                  <td style="padding:26px 24px;color:#ffffff;" align="center">
                    <img src="${brandUrl}" width="56" height="56" alt="Kanam Academy" style="display:block;margin:0 auto 14px auto;border-radius:14px;background:#ffffff;padding:6px;" />
                    <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;opacity:0.92;">Password reset</p>
                    <h1 style="margin:10px 0 0 0;font-size:26px;line-height:1.25;font-weight:900;letter-spacing:-0.02em;">Choose a new password</h1>
                    <p style="margin:12px 0 0 0;font-size:15px;line-height:1.55;opacity:0.96;max-width:460px;">
                      We received a request to reset your Kanam Academy password. Open the button below on any device — this link works across browsers.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;" align="center">
              <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#0f6e57,#18a16d);color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;padding:14px 28px;border-radius:999px;">
                Reset password
              </a>
              <p style="margin:18px 0 0 0;font-size:12px;line-height:1.5;color:#64748b;max-width:420px;">
                If the button doesn’t work, copy and paste this link into your browser:<br />
                <a href="${resetUrl}" style="color:#0f6e57;word-break:break-all;">${resetUrl}</a>
              </p>
              <p style="margin:18px 0 0 0;font-size:12px;line-height:1.5;color:#94a3b8;">
                If you didn’t ask for this, you can ignore this email. Need help? <a href="${helpUrl}" style="color:#0f6e57;">Visit Help</a>.
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

export function renderPasswordResetEmailText(input: PasswordResetEmailInput) {
  return [
    "Reset your Kanam Academy password",
    "",
    "Open this link on any device to choose a new password:",
    input.resetUrl,
    "",
    "If you didn’t ask for this, you can ignore this email.",
  ].join("\n");
}
