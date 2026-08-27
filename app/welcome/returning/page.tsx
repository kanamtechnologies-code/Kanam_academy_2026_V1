"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Notice } from "@/components/ui/notice";
import { NoticePresence } from "@/components/ui/notice-presence";
import {
  errorMessage,
  mapSignInError,
  type SignInErrorCopy,
} from "@/lib/auth/signInErrors";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isInstructorRole, isParentRole, postSignInPath } from "@/lib/roles";

const USER_NAME_KEY = "kanam.userName";
type EnsureProfileResponse = { ok?: boolean; error?: string };
type StudentNameRow = { display_name?: string | null };

const glassCard =
  "w-full rounded-[24px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:rounded-[32px] sm:p-6 md:p-8 dark:border-white/15 dark:bg-slate-950/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]";

function saveUserName(name: string) {
  try {
    window.localStorage.setItem(USER_NAME_KEY, name);
  } catch {
    // ignore
  }
}

function loadUserName(): string {
  try {
    return window.localStorage.getItem(USER_NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export default function WelcomeReturningPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [animateIn, setAnimateIn] = React.useState<boolean>(false);
  const [error, setError] = React.useState<SignInErrorCopy | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [asParent, setAsParent] = React.useState(false);
  const [forgotOpen, setForgotOpen] = React.useState(false);
  const [forgotEmail, setForgotEmail] = React.useState("");
  const [forgotStatus, setForgotStatus] = React.useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [forgotError, setForgotError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setAnimateIn(false);
    try {
      const url = new URL(window.location.href);
      const seeded = url.searchParams.get("email");
      if (seeded) setEmail(seeded);
      setAsParent(url.searchParams.get("as") === "parent");
    } catch {
      // ignore
    }
    const t = window.setTimeout(() => setAnimateIn(true), 10);
    return () => window.clearTimeout(t);
  }, []);

  const signIn = React.useCallback(async () => {
    setError(null);
    const em = email.trim();
    const pw = password;
    if (!em || !em.includes("@")) {
      setError({
        title: "Email needed",
        body: "Enter the email address you used for your Kanam account.",
      });
      return;
    }
    if (!pw) {
      setError({
        title: "Password needed",
        body: "Enter your password to continue, or use Forgot password if you need a reset.",
      });
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) throw new Error("Sign-in is unavailable in demo mode.");
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: em,
        password: pw,
      });
      if (signInErr) throw new Error(signInErr.message);

      const { data: me } = await supabase.auth.getUser();
      const user = me.user;
      if (isInstructorRole(user) || isParentRole(user)) {
        router.push(postSignInPath(user));
        return;
      }

      const ensureRes = await fetch("/api/auth/ensure-profile", { method: "POST" });
      const ensureJson = (await ensureRes.json()) as EnsureProfileResponse;
      if (!ensureRes.ok || !ensureJson?.ok) {
        throw new Error(
          ensureJson?.error || "Signed in, but could not create/load your student profile."
        );
      }

      const userId = user?.id;
      let displayName = loadUserName();
      if (userId) {
        const { data: student } = await supabase
          .from("students")
          .select("display_name")
          .eq("user_id", userId)
          .maybeSingle<StudentNameRow>();
        const fallback = student?.display_name ?? undefined;
        if (fallback) displayName = fallback;
      }
      try {
        saveUserName(displayName);
      } catch {
        // ignore
      }
      router.push(postSignInPath(user));
    } catch (err: unknown) {
      setError(mapSignInError(errorMessage(err, "Something went wrong.")));
    } finally {
      setLoading(false);
    }
  }, [email, password, router]);

  return (
    <WelcomeBackground>
      <div
        className={[
          "mx-auto flex w-full max-w-lg flex-col px-1 py-2 sm:px-2 sm:py-6",
          "transition-all duration-300 ease-out",
          animateIn ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        ].join(" ")}
      >
        <div className="text-center sm:text-left">
          <p className="kanam-text-pop-strong text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--accent)]">
            {asParent ? "Family account" : "Returning"}
          </p>
          <h1 className="mt-2 text-[1.65rem] font-black leading-[1.08] tracking-tight text-slate-900 sm:text-4xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
            {asParent
              ? "Sign in with your parent email to open the family hub."
              : "Sign in with your email and password — students, parents, and instructors."}
          </p>
        </div>

        <div className={["mt-5 sm:mt-6", glassCard].join(" ")}>
          <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            Sign in
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-500 sm:text-sm">
            {asParent
              ? "Use the same email you used for your family account."
              : "Use your student or family email and password to continue learning."}
          </p>

          <NoticePresence
            show={Boolean(error)}
            contentKey={error?.title ?? error?.body}
            className="mt-4"
          >
            <Notice compact variant="danger" role="alert" title={error?.title}>
              {error?.body}
            </Notice>
          </NoticePresence>

          <div className="mt-5 grid gap-3 rounded-2xl border border-white/50 bg-white/40 p-4 dark:border-white/10 dark:bg-slate-900/40">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {asParent ? "Parent email" : "Email"}
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. you@email.com"
                type="email"
                name="kanam-returning-email"
                autoComplete="username"
                className="h-12 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Password
              </label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                name="kanam-returning-password"
                autoComplete="current-password"
                className="h-12 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-slate-900"
                onKeyDown={(e) => {
                  if (e.key === "Enter") void signIn();
                }}
              />
              <div className="flex flex-wrap items-center justify-end gap-2">
                <Dialog
                  open={forgotOpen}
                  onOpenChange={(o) => {
                    setForgotOpen(o);
                    if (!o) return;
                    setForgotError(null);
                    setForgotStatus("idle");
                    setForgotEmail(email.trim() || forgotEmail);
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setForgotOpen(true)}
                    className="inline-flex min-h-11 items-center text-xs font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-900 sm:min-h-0 dark:text-emerald-300"
                  >
                    Forgot password?
                  </button>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Reset your password</DialogTitle>
                      <DialogDescription>
                        Enter your email and we’ll send you a reset link.
                      </DialogDescription>
                    </DialogHeader>

                    <NoticePresence show={Boolean(forgotError)} contentKey={forgotError}>
                      <Notice compact variant="danger" role="alert">
                        {forgotError}
                      </Notice>
                    </NoticePresence>

                    <NoticePresence show={forgotStatus === "sent"} contentKey="forgot-sent">
                      <Notice compact variant="success" title="Reset email on the way">
                        If an account exists for that address, you’ll get a Kanam reset link
                        shortly. Open the newest email once in your browser (not an email
                        preview). Check spam if nothing appears in a couple of minutes.
                      </Notice>
                    </NoticePresence>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-700">Email</p>
                      <Input
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="you@example.com"
                        type="email"
                        className="h-12"
                      />
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setForgotOpen(false)}
                        className="h-11"
                      >
                        Close
                      </Button>
                      <Button
                        type="button"
                        className="h-11"
                        disabled={forgotStatus === "sending"}
                        onClick={async () => {
                          setForgotError(null);
                          const em = forgotEmail.trim();
                          if (!em || !em.includes("@")) {
                            setForgotError("Enter a valid email.");
                            return;
                          }
                          setForgotStatus("sending");
                          try {
                            const res = await fetch("/api/auth/request-password-reset", {
                              method: "POST",
                              headers: { "content-type": "application/json" },
                              body: JSON.stringify({ email: em }),
                            });
                            const json = (await res.json()) as {
                              ok?: boolean;
                              error?: string;
                              devResetUrl?: string;
                            };
                            if (!res.ok || !json.ok) {
                              throw new Error(json.error || "Could not send reset email.");
                            }
                            if (json.devResetUrl) {
                              window.open(json.devResetUrl, "_blank", "noopener,noreferrer");
                            }
                            setForgotStatus("sent");
                          } catch (err: unknown) {
                            setForgotStatus("error");
                            setForgotError(errorMessage(err, "Could not send reset email."));
                          }
                        }}
                      >
                        {forgotStatus === "sending" ? "Sending…" : "Send reset link"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <Button
              disabled={loading}
              aria-busy={loading}
              className={[
                "h-12 w-full rounded-xl px-6 text-base font-semibold",
                "bg-[#E9D5A3] text-[#0f513f] hover:brightness-110 dark:text-[#0f513f]",
                "shadow-[0_20px_50px_rgba(0,0,0,0.04)]",
                "focus-visible:ring-4 focus-visible:ring-emerald-500/25",
              ].join(" ")}
              onClick={() => void signIn()}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="h-11 w-full rounded-xl border-slate-200 bg-white/70 font-semibold text-slate-800 hover:bg-white dark:border-white/15 dark:bg-slate-900/60 dark:text-slate-100"
              onClick={() => router.push(asParent ? "/welcome/parent" : "/welcome")}
            >
              Back to Welcome
            </Button>
          </div>

          {asParent ? (
            <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
              New family?{" "}
              <Link
                href="/welcome/parent"
                className="font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-900 dark:text-emerald-300"
              >
                Create a family account
              </Link>
            </p>
          ) : (
            <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
              Parent returning?{" "}
              <Link
                href="/welcome/returning?as=parent"
                className="font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-900 dark:text-emerald-300"
              >
                Sign in to the family hub
              </Link>
            </p>
          )}
        </div>
      </div>
    </WelcomeBackground>
  );
}
