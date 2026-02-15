"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Hash, Loader2, Mail, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Button } from "@/components/ui/button";
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
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function WelcomePage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [classCode, setClassCode] = React.useState("");
  const [loadingNew, setLoadingNew] = React.useState(false);
  const [loadingReturning, setLoadingReturning] = React.useState(false);
  const [returningError, setReturningError] = React.useState<string | null>(null);
  const [newError, setNewError] = React.useState<string | null>(null);
  const [forgotOpen, setForgotOpen] = React.useState(false);
  const [forgotEmail, setForgotEmail] = React.useState("");
  const [forgotStatus, setForgotStatus] = React.useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [forgotError, setForgotError] = React.useState<string | null>(null);

  const cardEnter = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 260, damping: 22, delay },
  });

  const glassCardBase =
    "rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out";

  return (
    <WelcomeBackground>
      <div className="flex min-h-[calc(100dvh-120px)] w-full items-center justify-center px-4 py-5 md:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Top row: welcome message + demo mode (side-by-side on large screens) */}
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl leading-[1.06]">
                <span className="inline-flex items-center gap-4">
                  <span>Welcome to Kanam Academy</span>
                </span>
              </h1>
              <div className="mt-2 space-y-0.5 text-sm font-medium leading-snug text-slate-800 sm:text-base">
                <p>Glad you’re here.</p>
                <p>
                  <span className="kanam-text-pop-strong font-extrabold text-[color:var(--brand)]">
                    New student
                  </span>
                  : enter
                  your class code and email to get started.
                </p>
                <p>
                  <span className="kanam-text-pop-strong font-extrabold text-[color:var(--accent)]">
                    Returning learner
                  </span>
                  : sign in.
                </p>
                <p>Parents and educators: use Demo mode to preview what students see.</p>
              </div>
            </div>

            <div className="w-full rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-2xl lg:justify-self-end">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-600">
                Demo mode
              </p>
              <p className="mt-2 text-base font-black tracking-tight text-slate-900">
                Just testing? Try the app without signing in.
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Preview the dashboard tutorial, then launch the interactive Lesson Canvas demo.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Button
                  type="button"
                  className={[
                    "h-12 rounded-2xl px-6 text-sm font-extrabold tracking-tight",
                    "shadow-lg shadow-emerald-700/15",
                    "bg-gradient-to-r from-[rgb(var(--accent-rgb)/0.95)] via-[rgb(var(--brand-rgb)/0.92)] to-[rgb(var(--accent-rgb)/0.95)]",
                    "[background-size:200%_200%] animate-[kanamShimmer_1.6s_linear_infinite]",
                    "text-slate-950 hover:brightness-[1.03]",
                    "focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.28)]",
                  ].join(" ")}
                  onClick={() => router.push("/demo")}
                >
                  Try the demo <Sparkles className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main cards */}
          <div className="mt-4 grid gap-6 md:grid-cols-2 xl:gap-8">
              {/* New learner (priority) */}
              <motion.div
                {...cardEnter(0.0)}
                whileHover={{ y: -8 }}
                className={[glassCardBase, "p-6 md:p-8"].join(" ")}
              >
                <p className="kanam-text-pop-strong text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
                  New student
                </p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  I’m a new student
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Enter your class code and email to get started.
                </p>

                {newError ? (
                  <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
                    {newError}
                  </div>
                ) : null}

                <div className="mt-6 grid gap-3 rounded-2xl border border-white/50 bg-white/40 p-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Hash className="h-4 w-4 text-emerald-600" />
                      Class code
                    </div>
                    <Input
                      value={classCode}
                      onChange={(e) => setClassCode(e.target.value)}
                      placeholder="e.g. KANAM-7B"
                      className="h-12 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                    <p className="text-xs text-slate-600">
                      Check your email for your class code.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Mail className="h-4 w-4 text-emerald-600" />
                      Email
                    </div>
                    <Input
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder='e.g. student@school.org'
                      type="email"
                      className="h-12 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                    <p className="text-xs text-slate-600">
                      You’ll set a password on the next screen.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    disabled={loadingNew}
                    aria-busy={loadingNew}
                    className={[
                      "h-12 w-full rounded-xl px-6 text-base font-semibold",
                      "transition-all duration-300 ease-out",
                      "active:scale-95",
                      "bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-300",
                      "text-white shadow-lg shadow-emerald-100 hover:brightness-110",
                      "focus-visible:ring-4 focus-visible:ring-emerald-500/25",
                    ].join(" ")}
                    onClick={() => {
                      setNewError(null);
                      const cc = classCode.trim();
                      const em = newEmail.trim();
                      if (!cc || cc.length < 3) {
                        setNewError("Enter your class code.");
                        return;
                      }
                      if (!em || !em.includes("@")) {
                        setNewError("Enter a valid email.");
                        return;
                      }
                      try {
                        window.localStorage.setItem("kanam.classCode", cc);
                        window.localStorage.setItem("kanam.onboardingEmail", em);
                      } catch {
                        // ignore
                      }
                      setLoadingNew(true);
                      router.push(
                        `/welcome/profile?classCode=${encodeURIComponent(cc)}&email=${encodeURIComponent(em)}`
                      );
                    }}
                  >
                    {loadingNew ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading…
                      </>
                    ) : (
                      <>
                        Continue <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Returning learner */}
              <motion.div
                {...cardEnter(0.1)}
                whileHover={{ y: -8 }}
                className={[glassCardBase, "p-6 md:p-8"].join(" ")}
              >
                <p className="kanam-text-pop-strong text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  Returning learner
                </p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  Sign in fast
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Enter your email and jump right back to your dashboard.
                </p>

                {returningError ? (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
                    {returningError}
                  </div>
                ) : null}

                <div className="mt-5 grid gap-3 rounded-2xl border border-white/50 bg-white/40 p-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Mail className="h-4 w-4 text-emerald-600" />
                      Email
                    </div>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='e.g. student@school.org'
                      type="email"
                      className="h-12 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                    <p className="text-xs text-slate-600">Use the same email you used before.</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <span className="grid h-4 w-4 place-items-center rounded-md bg-emerald-600/10 text-[11px] font-black text-emerald-700">
                        *
                      </span>
                      Password
                    </div>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      type="password"
                      className="h-12 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs text-slate-600">Use your Kanam password.</p>
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
                            className="text-xs font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-900"
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

                          {forgotError ? (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                              {forgotError}
                            </div>
                          ) : null}

                          {forgotStatus === "sent" ? (
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
                              Check your email for the reset link. You can close this window.
                            </div>
                          ) : null}

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
                                  const redirectTo = `${window.location.origin}/welcome/reset-password`;
                                  const { error } = await supabase.auth.resetPasswordForEmail(em, {
                                    redirectTo,
                                  });
                                  if (error) throw new Error(error.message);
                                  setForgotStatus("sent");
                                } catch (e: any) {
                                  setForgotStatus("error");
                                  setForgotError(e?.message ?? "Could not send reset email.");
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

                <div className="mt-6 space-y-3">
                  <Button
                    disabled={loadingReturning}
                    aria-busy={loadingReturning}
                    className={[
                      "h-12 w-full rounded-xl px-6 text-base font-semibold",
                      "transition-all duration-300 ease-out",
                      "active:scale-95",
                      "bg-[#E9D5A3] text-amber-950 hover:brightness-110",
                      "shadow-[0_20px_50px_rgba(0,0,0,0.04)]",
                      "focus-visible:ring-4 focus-visible:ring-emerald-500/25",
                    ].join(" ")}
                    onClick={async () => {
                      setReturningError(null);
                      setLoadingReturning(true);
                      try {
                        const supabase = createSupabaseBrowserClient();
                        const { error } = await supabase.auth.signInWithPassword({
                          email: email.trim(),
                          password,
                        });
                        if (error) throw new Error(error.message);

                        const ensureRes = await fetch("/api/auth/ensure-profile", { method: "POST" });
                        const ensureJson = (await ensureRes.json()) as any;
                        if (!ensureRes.ok || !ensureJson?.ok) {
                          throw new Error(
                            ensureJson?.error || "Signed in, but could not load your profile."
                          );
                        }

                        router.push("/dashboard");
                      } catch (e: any) {
                        setReturningError(e?.message ?? "Sign-in failed.");
                      } finally {
                        setLoadingReturning(false);
                      }
                    }}
                  >
                    {loadingReturning ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading…
                      </>
                    ) : (
                      <>
                        Sign in <Zap className="h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <div className="rounded-2xl border border-white/50 bg-white/40 p-4">
                    <p className="text-sm font-extrabold tracking-tight text-slate-900">
                      What happens next
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      You’ll go straight to your dashboard and continue where you left off.
                    </p>
                  </div>
                </div>
              </motion.div>
          </div>
        </div>
      </div>
    </WelcomeBackground>
  );
}

