"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2 } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { WelcomeShell } from "@/components/welcome/WelcomeShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordInput } from "@/components/ui/password-input";
import { Notice } from "@/components/ui/notice";
import { NoticePresence } from "@/components/ui/notice-presence";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

function readHashTokens(): { access_token: string; refresh_token: string; type: string } | null {
  try {
    const raw = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
    const sp = new URLSearchParams(raw);
    const access_token = sp.get("access_token") ?? "";
    const refresh_token = sp.get("refresh_token") ?? "";
    const type = sp.get("type") ?? "";
    if (!access_token || !refresh_token) return null;
    return { access_token, refresh_token, type };
  } catch {
    return null;
  }
}

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = React.useState(false);
  const [sessionOk, setSessionOk] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [pw, setPw] = React.useState("");
  const [pw2, setPw2] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setError(null);
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setError("Password reset is unavailable in demo mode.");
        setReady(true);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const errorCode = params.get("error_code") || params.get("error");
      const errorDescription = params.get("error_description");
      if (errorCode) {
        const decoded = errorDescription
          ? decodeURIComponent(errorDescription.replace(/\+/g, " "))
          : "";
        setError(
          /otp_expired|access_denied|invalid/i.test(`${errorCode} ${decoded}`)
            ? "This reset link was already used or expired. Email apps often open links automatically — request a new reset and open it once in Chrome/Safari (not from a preview)."
            : decoded || "This reset link is invalid. Please request a new one."
        );
        setReady(true);
        return;
      }

      // TokenHash recovery (works across browsers/devices)
      const tokenHash = params.get("token_hash");
      const otpType = params.get("type");
      if (tokenHash && otpType) {
        const { error: otpErr } = await supabase.auth.verifyOtp({
          type: otpType as "recovery",
          token_hash: tokenHash,
        });
        if (otpErr) {
          const raw = otpErr.message || "";
          setError(
            /expired|invalid/i.test(raw)
              ? "This reset link was already used or expired. Request a new one from Welcome → Forgot password."
              : raw
          );
          setReady(true);
          return;
        }
        try {
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch {
          // ignore
        }
        setSessionOk(true);
        setReady(true);
        return;
      }

      // Legacy PKCE: ?code=... (same browser that requested the reset)
      const code = params.get("code");
      if (code) {
        const { error: exchErr } = await supabase.auth.exchangeCodeForSession(code);
        if (exchErr) {
          const raw = exchErr.message || "";
          setError(
            /verifier|pkce|storage/i.test(raw)
              ? "This older reset link only works in the browser where you clicked Forgot password. Request a new reset email — the new link works on any device."
              : /expired|invalid/i.test(raw)
                ? "This reset link was already used or expired. Request a new one from Welcome → Forgot password."
                : raw
          );
          setReady(true);
          return;
        }
        try {
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch {
          // ignore
        }
        setSessionOk(true);
        setReady(true);
        return;
      }

      // Legacy / implicit flow: #access_token=...&type=recovery
      const tokens = readHashTokens();
      if (tokens) {
        if (tokens.type && tokens.type !== "recovery") {
          setError("This link is not a password reset link. Request a new reset email.");
          setReady(true);
          return;
        }
        const { error: sessErr } = await supabase.auth.setSession({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        });
        if (sessErr) {
          setError("This reset link expired. Please request a new reset email.");
          setReady(true);
          return;
        }
        try {
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch {
          // ignore
        }
        setSessionOk(true);
        setReady(true);
        return;
      }

      // Already signed in from /auth/confirm cookie exchange
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSessionOk(true);
        setReady(true);
        return;
      }

      setError("This reset link is missing info. Please request a new reset email from Welcome.");
      setReady(true);
    })();
  }, []);

  return (
    <WelcomeBackground>
      <div className="flex min-h-[calc(100dvh-var(--kanam-header-height,4.75rem))] w-full items-center justify-center px-4 py-8 md:px-10">
        <WelcomeShell
          containerClassName="mx-auto w-full max-w-[960px]"
          title="Reset your password"
          subtitle="Choose a new password, then you can sign in again."
        >
          <Card className="kanam-glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <KeyRound className="h-5 w-5 text-white/95" />
                Password reset
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!ready ? (
                <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm font-semibold text-white/90">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading reset link…
                </div>
              ) : null}

              <NoticePresence show={Boolean(error)} contentKey={error}>
                <Notice
                  variant="danger"
                  role="alert"
                  title="Couldn’t reset password"
                  action={
                    <Button onClick={() => router.push("/welcome")} size="sm">
                      Back to Welcome
                    </Button>
                  }
                >
                  {error}
                </Notice>
              </NoticePresence>

              <NoticePresence show={done} contentKey="password-updated">
                <Notice
                  variant="success"
                  title="Password updated!"
                  action={
                    <Button onClick={() => router.push("/welcome")} size="sm">
                      Back to Welcome
                    </Button>
                  }
                >
                  Go back to the welcome screen and sign in with your new password.
                </Notice>
              </NoticePresence>

              {ready && sessionOk && !done ? (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <p className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                        New password
                      </p>
                      <PasswordInput
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        placeholder="New password"
                        className="h-12 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/25"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                        Confirm
                      </p>
                      <PasswordInput
                        value={pw2}
                        onChange={(e) => setPw2(e.target.value)}
                        placeholder="Type it again"
                        className="h-12 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/25"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      variant="outline"
                      className="h-12 border-white/30 bg-white/10 text-white hover:bg-white/15"
                      onClick={() => router.push("/welcome")}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="h-12 rounded-2xl px-7 text-base font-extrabold tracking-tight"
                      disabled={saving}
                      onClick={async () => {
                        setError(null);
                        if (!pw || pw.length < 8) {
                          setError("Password must be at least 8 characters.");
                          return;
                        }
                        if (pw !== pw2) {
                          setError("Passwords do not match.");
                          return;
                        }
                        setSaving(true);
                        try {
                          const supabase = createSupabaseBrowserClient();
                          if (!supabase) throw new Error("Password reset is unavailable in demo mode.");
                          const { error: upErr } = await supabase.auth.updateUser({ password: pw });
                          if (upErr) throw new Error(upErr.message);
                          setDone(true);
                          try {
                            window.history.replaceState({}, document.title, window.location.pathname);
                          } catch {
                            // ignore
                          }
                        } catch (error: unknown) {
                          setError(errorMessage(error, "Could not update password."));
                        } finally {
                          setSaving(false);
                        }
                      }}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Saving…
                        </>
                      ) : (
                        "Set new password"
                      )}
                    </Button>
                  </div>
                </>
              ) : null}
            </CardContent>
          </Card>
        </WelcomeShell>
      </div>
    </WelcomeBackground>
  );
}
