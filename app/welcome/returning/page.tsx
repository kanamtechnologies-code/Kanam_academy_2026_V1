"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { WelcomeShell } from "@/components/welcome/WelcomeShell";
import { WelcomeVideoFader } from "@/components/welcome/WelcomeVideoFader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Notice } from "@/components/ui/notice";
import { NoticePresence } from "@/components/ui/notice-presence";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isInstructorRole, isParentRole, postSignInPath } from "@/lib/roles";

const USER_NAME_KEY = "kanam.userName";
type EnsureProfileResponse = { ok?: boolean; error?: string };
type StudentNameRow = { display_name?: string | null };

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

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

function mapSignInError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("email not confirmed") || m.includes("email_not_confirmed")) {
    return "Confirm your email first — check your inbox (and spam) for the Kanam link, then sign in.";
  }
  if (m.includes("invalid login") || m.includes("invalid credentials")) {
    return "Email or password didn’t match. Try again, or use Forgot password.";
  }
  return message;
}

export default function WelcomeReturningPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [animateIn, setAnimateIn] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
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

  return (
    <WelcomeBackground>
      <div
        className={[
          "flex min-h-[calc(100dvh-160px)] w-full items-center justify-start px-4 md:px-10",
          "transition-all duration-300 ease-out",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
      >
        <WelcomeShell
          title="Welcome back"
          subtitle={
            asParent
              ? "Sign in with your parent email to open the family hub."
              : "Sign in with your email and password — students, parents, and instructors."
          }
        >
          <div className="grid w-full gap-6 md:grid-cols-2 md:items-stretch">
            <Card className="kanam-glow-card">
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-1">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                    {asParent ? "Returning parent" : "Returning account"}
                  </p>
                  <p className="text-base font-medium text-white/90">
                    {asParent
                      ? "Use the same email you used for your family account."
                      : "Enter your email to continue."}
                  </p>
                </div>

                <NoticePresence show={Boolean(error)} contentKey={error}>
                  <Notice compact variant="danger" role="alert">
                    {error}
                  </Notice>
                </NoticePresence>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                      {asParent ? "Parent email" : "Email"}
                    </label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={asParent ? "Parent email" : "Email"}
                      type="email"
                      className="h-14 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                      Password
                    </label>
                    <PasswordInput
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-14 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/20"
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
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex min-h-11 items-center text-xs font-semibold text-white underline underline-offset-2 hover:text-white/90 sm:min-h-0"
                          >
                            Forgot password?
                          </button>
                        </DialogTrigger>
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
                            <Notice compact variant="success" title="Check your email">
                              Open the reset link once in your browser (Gmail/Outlook sometimes
                              preview the link and expire it). Don’t reuse an older reset email.
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
                                  const supabase = createSupabaseBrowserClient();
                                  if (!supabase) {
                                    throw new Error("Password reset is unavailable in demo mode.");
                                  }
                                  const redirectTo = `${window.location.origin}/welcome/reset-password`;
                                  const { error: resetErr } = await supabase.auth.resetPasswordForEmail(
                                    em,
                                    { redirectTo }
                                  );
                                  if (resetErr) throw new Error(resetErr.message);
                                  setForgotStatus("sent");
                                } catch (err: unknown) {
                                  const msg = errorMessage(err, "Could not send reset email.");
                                  if (/failed to fetch|networkerror|load failed/i.test(msg)) {
                                    setForgotStatus("sent");
                                    setForgotError(null);
                                    return;
                                  }
                                  setForgotStatus("error");
                                  setForgotError(msg);
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

                <Button
                  size="lg"
                  className={[
                    "h-14 w-full rounded-2xl px-6 text-base font-extrabold tracking-tight",
                    "shadow-xl shadow-emerald-700/20",
                    "bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700",
                    "text-white hover:brightness-[1.04]",
                    "focus-visible:ring-4 focus-visible:ring-emerald-500/30",
                  ].join(" ")}
                  disabled={!email.trim() || !password.trim() || loading}
                  aria-busy={loading}
                  onClick={async () => {
                    setError(null);
                    setLoading(true);
                    try {
                      const supabase = createSupabaseBrowserClient();
                      if (!supabase) throw new Error("Sign-in is unavailable in demo mode.");
                      const { error: signInErr } = await supabase.auth.signInWithPassword({
                        email: email.trim(),
                        password,
                      });
                      if (signInErr) throw new Error(mapSignInError(signInErr.message));

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
                          ensureJson?.error ||
                            "Signed in, but could not create/load your student profile."
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
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="h-12 w-full border-white/30 bg-white/10 text-white hover:bg-white/15"
                  onClick={() => router.push(asParent ? "/welcome/parent" : "/welcome")}
                >
                  Back
                </Button>

                {asParent ? (
                  <p className="text-center text-sm text-white/85">
                    New family?{" "}
                    <Link
                      href="/welcome/parent"
                      className="font-semibold text-white underline underline-offset-2"
                    >
                      Create a family account
                    </Link>
                  </p>
                ) : (
                  <p className="text-center text-sm text-white/85">
                    Parent returning?{" "}
                    <Link
                      href="/welcome/returning?as=parent"
                      className="font-semibold text-white underline underline-offset-2"
                    >
                      Sign in to the family hub
                    </Link>
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="kanam-glow-card">
              <CardContent className="pt-6">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
                  <div className="relative aspect-video">
                    <WelcomeVideoFader
                      sources={[
                        "/video/12893579-uhd_2160_3840_24fps.mp4",
                        "/video/8499735-hd_1920_1080_30fps.mp4",
                        "/video/4497367-uhd_3840_2160_25fps.mp4",
                        "/video/4495343-uhd_3840_2160_25fps.mp4",
                        "/video/5495790-uhd_2560_1080_30fps.mp4",
                      ]}
                      intervalMs={9000}
                      fadeMs={900}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-white/10" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4">
                      <div className="max-w-[34rem] rounded-2xl border border-white/65 bg-slate-950/75 p-5 text-white shadow-xl">
                        <p className="text-2xl font-black tracking-tight">
                          Real Skills. Real Instructors. Real Results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </WelcomeShell>
      </div>
    </WelcomeBackground>
  );
}
