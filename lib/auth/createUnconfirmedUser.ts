import { createClient } from "@supabase/supabase-js";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type Fail = { ok: false; error: string; status: number };
type Ok = {
  ok: true;
  userId: string;
  /** False when Confirm email is disabled (user is already confirmed). */
  needsEmailConfirmation: boolean;
  confirmationEmailSent: boolean;
  confirmationEmailError?: string;
};

/**
 * Creates an auth user via the public signUp API so Supabase sends the
 * "Confirm signup" email. Admin createUser does not send that mail.
 */
export async function createUnconfirmedAuthUser(params: {
  email: string;
  password: string;
  emailRedirectTo: string;
  userMetadata?: Record<string, unknown>;
  appMetadata?: Record<string, unknown>;
}): Promise<Ok | Fail> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return { ok: false, error: "Missing Supabase public env vars.", status: 500 };
  }

  const anon = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await anon.auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      emailRedirectTo: params.emailRedirectTo,
      data: params.userMetadata ?? {},
    },
  });

  if (error) {
    const msg = error.message || "Could not create user.";
    const status = /already|registered|exists/i.test(msg) ? 409 : 400;
    if (/rate limit|over_email_send_rate_limit/i.test(msg)) {
      return {
        ok: false,
        error:
          "Email sending is temporarily rate-limited. Wait a few minutes (or up to an hour on Supabase’s default mailer), check spam, then use Resend — or confirm the user in the Supabase dashboard.",
        status: 429,
      };
    }
    return { ok: false, error: msg, status };
  }

  const user = data.user;
  if (!user?.id) {
    return {
      ok: false,
      error: "Could not create account. If you already signed up, check your email or sign in.",
      status: 400,
    };
  }

  // Supabase returns an empty identities array when the email is already registered
  // (anti-enumeration). Treat as conflict so we do not create orphan profile rows.
  if (Array.isArray(user.identities) && user.identities.length === 0) {
    return {
      ok: false,
      error: "An account with this email already exists. Sign in, or use Forgot password.",
      status: 409,
    };
  }

  if (params.appMetadata && Object.keys(params.appMetadata).length > 0) {
    try {
      const admin = createSupabaseAdminClient();
      const { error: metaErr } = await admin.auth.admin.updateUserById(user.id, {
        app_metadata: params.appMetadata,
      });
      if (metaErr) {
        return {
          ok: false,
          error: metaErr.message || "Account created but role setup failed.",
          status: 500,
        };
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Account created but role setup failed.";
      return { ok: false, error: msg, status: 500 };
    }
  }

  const needsEmailConfirmation = !user.email_confirmed_at;
  return {
    ok: true,
    userId: user.id,
    needsEmailConfirmation,
    // Public signUp triggers the Confirm signup template when Confirm email is enabled.
    confirmationEmailSent: needsEmailConfirmation,
    ...(needsEmailConfirmation
      ? {}
      : {
          confirmationEmailError:
            "Email confirmations look disabled in Supabase (user was auto-confirmed).",
        }),
  };
}
