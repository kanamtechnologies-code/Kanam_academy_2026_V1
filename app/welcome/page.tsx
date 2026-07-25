"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Hash, Loader2, Mail, Sparkles, Users, Zap } from "lucide-react";
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
import { Notice } from "@/components/ui/notice";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isInstructorRole, isParentRole, postSignInPath, safeNextPath } from "@/lib/roles";

type EnsureProfileResponse = {
  ok?: boolean;
  error?: string;
  student?: { id?: string; display_name?: string };
};

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export default function WelcomePage() {
  const router = useRouter();
  const [returningEmail, setReturningEmail] = React.useState("");
  const [returningPassword, setReturningPassword] = React.useState("");
  const [classCode, setClassCode] = React.useState("");
  const [studentPath, setStudentPath] = React.useState<"solo" | "teacher" | null>(null);
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
  const [resetLinkError, setResetLinkError] = React.useState<string | null>(null);
  const [accountDeletedMsg, setAccountDeletedMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const resetError = params.get("reset_error");
      const errorCode = params.get("error_code") || params.get("error");
      const errorDescription = params.get("error_description");
      const accountDeleted = params.get("accountDeleted") === "1";

      if (accountDeleted) {
        setAccountDeletedMsg(
          "Your family account and child learning data were deleted. Any active subscription was canceled when possible."
        );
      }

      if (resetError) {
        setResetLinkError(decodeURIComponent(resetError.replace(/\+/g, " ")));
      } else if (errorCode) {
        const decoded = errorDescription
          ? decodeURIComponent(errorDescription.replace(/\+/g, " "))
          : "";
        setResetLinkError(
          /otp_expired|access_denied|invalid/i.test(`${errorCode} ${decoded}`)
            ? "This reset link was already used or expired. Email apps sometimes open links automatically — request a new reset below (Forgot password) and open it once in your browser."
            : decoded || "This reset link is invalid. Please request a new one."
        );
      }

      if (resetError || errorCode || accountDeleted) {
        const url = new URL(window.location.href);
        url.search = "";
        url.hash = "";
        window.history.replaceState({}, document.title, url.pathname);
      }
    } catch {
      // ignore
    }
  }, []);

  const cardEnter = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 260, damping: 22, delay },
  });

  const glassCardBase =
    "rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out dark:border-white/15 dark:bg-slate-950/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]";

  const signInLearner = React.useCallback(async () => {
    setReturningError(null);
    const em = returningEmail.trim();
    const pw = returningPassword;

    if (!em || !em.includes("@")) {
      setReturningError("Enter your email.");
      return;
    }
    if (!pw) {
      setReturningError("Enter your password.");
      return;
    }

    setLoadingReturning(true);
    try {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) throw new Error("Sign-in is unavailable in demo mode.");
      const { error } = await supabase.auth.signInWithPassword({
        email: em,
        password: pw,
      });
      if (error) throw new Error(error.message);

      const { data } = await supabase.auth.getUser();
      const user = data.user;

      const next =
        typeof window !== "undefined"
          ? safeNextPath(new URLSearchParams(window.location.search).get("next"))
          : null;

      const preferNext =
        next && (next.startsWith("/billing") || next.startsWith("/checkout"));

      if (isInstructorRole(user) || isParentRole(user)) {
        router.push(preferNext ? next : postSignInPath(user));
        return;
      }

      const ensureRes = await fetch("/api/auth/ensure-profile", { method: "POST" });
      const ensureJson = (await ensureRes.json()) as EnsureProfileResponse;
      if (!ensureRes.ok || !ensureJson?.ok) {
        throw new Error(ensureJson?.error || "Signed in, but could not load your profile.");
      }
      router.push(next || "/dashboard");
    } catch (error: unknown) {
      setReturningError(errorMessage(error, "Sign-in failed."));
    } finally {
      setLoadingReturning(false);
    }
  }, [returningEmail, returningPassword, router]);

  const continueNewStudentSignup = React.useCallback(
    (opts: { selfPaced?: boolean; classCode?: string }) => {
      setNewError(null);
      if (opts.selfPaced) {
        try {
          window.localStorage.removeItem("kanam.classCode");
          window.localStorage.setItem("kanam.selfPaced", "1");
        } catch {
          // ignore
        }
        setLoadingNew(true);
        router.push("/welcome/age?selfPaced=1");
        return;
      }

      const cc = (opts.classCode ?? "").trim();
      if (!cc) {
        setNewError("Enter the class code from your teacher.");
        return;
      }
      try {
        window.localStorage.setItem("kanam.classCode", cc);
        window.localStorage.removeItem("kanam.selfPaced");
      } catch {
        // ignore
      }
      setClassCode(cc);
      setLoadingNew(true);
      const params = new URLSearchParams({ classCode: cc });
      router.push(`/welcome/age?${params.toString()}`);
    },
    [router]
  );

  return (
    <WelcomeBackground>
      <div className="flex min-h-[calc(100dvh-var(--kanam-header-height,4.75rem))] w-full items-center justify-center px-4 py-5 sm:py-6 md:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          {resetLinkError ? (
            <div className="mb-4">
              <Notice
                variant="danger"
                role="alert"
                title="Reset link problem"
                action={
                  <>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        setForgotOpen(true);
                        setForgotStatus("idle");
                        setForgotError(null);
                      }}
                    >
                      Request a new reset link
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="bg-white/80"
                      onClick={() => setResetLinkError(null)}
                    >
                      Dismiss
                    </Button>
                  </>
                }
              >
                {resetLinkError}
              </Notice>
            </div>
          ) : null}

          {accountDeletedMsg ? (
            <div className="mb-4">
              <Notice
                variant="success"
                role="status"
                title="Account deleted"
                action={
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="bg-white/80"
                    onClick={() => setAccountDeletedMsg(null)}
                  >
                    Dismiss
                  </Button>
                }
              >
                {accountDeletedMsg}
              </Notice>
            </div>
          ) : null}

          {/* Top row: welcome message + demo mode (side-by-side on large screens) */}
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="text-center lg:text-left">
              <h1 className="text-[1.65rem] font-black leading-[1.08] tracking-tight text-slate-900 sm:text-4xl">
                <span className="inline-flex items-center gap-4">
                  <span>Welcome to Kanam Academy</span>
                </span>
              </h1>
              <div className="mt-2 space-y-1.5 text-sm font-medium leading-snug text-slate-800 sm:text-base">
                <p>Glad you’re here. Pick how you want to enter:</p>
                <p>
                  <span className="kanam-text-pop-strong font-extrabold text-[color:var(--brand)]">
                    Student
                  </span>
                  {" — "}
                  your own email login for school or self-paced learning.
                </p>
                <p>
                  <span className="kanam-text-pop-strong font-extrabold text-[color:var(--brand-2)]">
                    Parent
                  </span>
                  {" — "}
                  one login, kid profiles with optional PINs, Family plan for the whole household.
                </p>
                <p>
                  <span className="kanam-text-pop-strong font-extrabold text-[color:var(--accent)]">
                    Returning
                  </span>
                  {" — "}
                  sign in with the same email (students and parents).
                </p>
              </div>
            </div>

            <div className="w-full rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/15 dark:bg-slate-950/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] lg:justify-self-end">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-600">
                Demo mode
              </p>
              <p className="mt-2 text-base font-black tracking-tight text-slate-900">
                Just browsing? Try a guided lesson — no account needed.
              </p>

              <div className="mt-4">
                <Button
                  type="button"
                  className={[
                    "h-12 w-full rounded-2xl px-6 text-sm font-extrabold tracking-tight",
                    "shadow-lg shadow-emerald-700/15",
                    "bg-gradient-to-r from-[rgb(var(--accent-rgb)/0.95)] via-[rgb(var(--brand-rgb)/0.92)] to-[rgb(var(--accent-rgb)/0.95)]",
                    "[background-size:200%_200%] animate-[kanamShimmer_1.6s_linear_infinite]",
                    "text-slate-950 hover:brightness-[1.03]",
                    "focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.28)]",
                  ].join(" ")}
                  onClick={() => router.push("/demo")}
                >
                  Try the guided lesson <Sparkles className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Parent entry */}
          <motion.div
            {...cardEnter(0.0)}
            className={[glassCardBase, "mt-4 p-4 sm:p-5"].join(" ")}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
                  Family account
                </p>
                <h2 className="mt-1 text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                  I&apos;m a parent
                </h2>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  variant="outline"
                  className="h-11 rounded-xl px-5 font-semibold"
                  onClick={() => router.push("/welcome/returning?as=parent")}
                >
                  Sign in
                </Button>
                <Button
                  className="h-11 rounded-xl px-5 font-semibold"
                  onClick={() => router.push("/welcome/parent")}
                >
                  <Users className="h-4 w-4" />
                  Create family account
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Main cards */}
          <div className="mt-4 grid gap-6 lg:grid-cols-2 xl:gap-8">
              {/* New learner (priority) */}
              <motion.div
                {...cardEnter(0.05)}
                whileHover={{ y: -8 }}
                className={[glassCardBase, "p-5 sm:p-6 md:p-8"].join(" ")}
              >
                <p className="kanam-text-pop-strong text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
                  Student account
                </p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  I’m a new student
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Under 13? A parent must{" "}
                  <button
                    type="button"
                    className="font-semibold text-emerald-800 underline underline-offset-2"
                    onClick={() => router.push("/welcome/ask-parent")}
                  >
                    create a family account
                  </button>
                  .
                </p>

                {newError ? (
                  <div className="mt-5">
                    <Notice compact variant="danger" role="alert">
                      {newError}
                    </Notice>
                  </div>
                ) : null}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewError(null);
                      setStudentPath("solo");
                    }}
                    className={[
                      "rounded-2xl px-4 py-4 text-left transition-all duration-300 ease-out",
                      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.28)]",
                      "active:scale-[0.98]",
                      studentPath === "solo"
                        ? [
                            "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
                            "shadow-lg shadow-emerald-900/25 ring-2 ring-[rgb(var(--accent-rgb)/0.85)]",
                            "hover:brightness-[1.06]",
                          ].join(" ")
                        : [
                            "bg-gradient-to-r from-[rgb(var(--brand-2-rgb)/0.88)] via-[rgb(var(--brand-rgb)/0.82)] to-[rgb(var(--brand-2-rgb)/0.88)]",
                            "shadow-md shadow-emerald-900/15 opacity-90",
                            "hover:opacity-100 hover:brightness-[1.05] hover:shadow-lg hover:shadow-emerald-900/20",
                          ].join(" "),
                    ].join(" ")}
                  >
                    <p
                      className={[
                        "text-sm font-extrabold tracking-tight",
                        studentPath === "solo" ? "text-[var(--accent)]" : "text-[rgb(var(--accent-rgb)/0.92)]",
                      ].join(" ")}
                    >
                      I&apos;m learning on my own
                    </p>
                    <p
                      className={[
                        "mt-1 text-xs leading-relaxed",
                        studentPath === "solo" ? "text-[rgb(var(--accent-rgb)/0.88)]" : "text-white/80",
                      ].join(" ")}
                    >
                      No class code needed. We&apos;ll set you up for self-paced learning.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewError(null);
                      setStudentPath("teacher");
                    }}
                    className={[
                      "rounded-2xl px-4 py-4 text-left transition-all duration-300 ease-out",
                      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.28)]",
                      "active:scale-[0.98]",
                      studentPath === "teacher"
                        ? [
                            "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
                            "shadow-lg shadow-emerald-900/25 ring-2 ring-[rgb(var(--accent-rgb)/0.85)]",
                            "hover:brightness-[1.06]",
                          ].join(" ")
                        : [
                            "bg-gradient-to-r from-[rgb(var(--brand-2-rgb)/0.88)] via-[rgb(var(--brand-rgb)/0.82)] to-[rgb(var(--brand-2-rgb)/0.88)]",
                            "shadow-md shadow-emerald-900/15 opacity-90",
                            "hover:opacity-100 hover:brightness-[1.05] hover:shadow-lg hover:shadow-emerald-900/20",
                          ].join(" "),
                    ].join(" ")}
                  >
                    <p
                      className={[
                        "text-sm font-extrabold tracking-tight",
                        studentPath === "teacher"
                          ? "text-[var(--accent)]"
                          : "text-[rgb(var(--accent-rgb)/0.92)]",
                      ].join(" ")}
                    >
                      I have a teacher code
                    </p>
                    <p
                      className={[
                        "mt-1 text-xs leading-relaxed",
                        studentPath === "teacher" ? "text-[rgb(var(--accent-rgb)/0.88)]" : "text-white/80",
                      ].join(" ")}
                    >
                      Join your school or club class with the code your teacher shared.
                    </p>
                  </button>
                </div>

                {studentPath === "teacher" ? (
                  <div className="mt-4 grid gap-3 rounded-2xl border border-white/50 bg-white/40 p-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Hash className="h-4 w-4 text-emerald-600" />
                        Teacher class code
                      </div>
                      <Input
                        value={classCode}
                        onChange={(e) => setClassCode(e.target.value)}
                        placeholder="Enter your class code"
                        className="h-12 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500"
                        autoCapitalize="characters"
                      />
                    </div>
                  </div>
                ) : null}

                <div className="mt-6">
                  <Button
                    disabled={loadingNew || !studentPath}
                    aria-busy={loadingNew}
                    className={[
                      "h-12 w-full rounded-xl px-6 text-base font-semibold",
                      "transition-all duration-300 ease-out",
                      "active:scale-95",
                      "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
                      "text-[var(--accent)] shadow-lg shadow-emerald-900/20 hover:brightness-[1.06]",
                      "focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.28)]",
                    ].join(" ")}
                    onClick={() => {
                      if (studentPath === "solo") {
                        continueNewStudentSignup({ selfPaced: true });
                        return;
                      }
                      if (studentPath === "teacher") {
                        continueNewStudentSignup({ classCode });
                        return;
                      }
                      setNewError("Choose how you’re joining first.");
                    }}
                  >
                    {loadingNew ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Starting signup…
                      </>
                    ) : (
                      <>
                        Create student account <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Returning accounts */}
              <motion.div
                id="sign-in"
                {...cardEnter(0.1)}
                whileHover={{ y: -8 }}
                className={[glassCardBase, "scroll-mt-28 p-5 sm:p-6 md:p-8"].join(" ")}
              >
                <p className="kanam-text-pop-strong text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  Returning
                </p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  Sign in
                </h2>

                {returningError ? (
                  <div className="mt-4">
                    <Notice compact variant="danger" role="alert">
                      {returningError}
                    </Notice>
                  </div>
                ) : null}

                <div className="mt-5 grid gap-3 rounded-2xl border border-white/50 bg-white/40 p-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Mail className="h-4 w-4 text-emerald-600" />
                      Email
                    </div>
                    <Input
                      value={returningEmail}
                      onChange={(e) => setReturningEmail(e.target.value)}
                      placeholder="e.g. you@email.com"
                      type="email"
                      name="kanam-returning-email"
                      autoComplete="username"
                      className="h-12 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <span className="grid h-4 w-4 place-items-center rounded-md bg-emerald-600/10 text-[11px] font-black text-emerald-700">
                        *
                      </span>
                      Password
                    </div>
                    <Input
                      value={returningPassword}
                      onChange={(e) => setReturningPassword(e.target.value)}
                      placeholder="Password"
                      type="password"
                      name="kanam-returning-password"
                      autoComplete="current-password"
                      className="h-12 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <Dialog
                        open={forgotOpen}
                        onOpenChange={(o) => {
                          setForgotOpen(o);
                          if (!o) return;
                          setForgotError(null);
                          setForgotStatus("idle");
                          setForgotEmail(returningEmail.trim() || forgotEmail);
                        }}
                      >
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex min-h-11 items-center text-xs font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-900 sm:min-h-0"
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
                            <Notice compact variant="danger" role="alert">
                              {forgotError}
                            </Notice>
                          ) : null}

                          {forgotStatus === "sent" ? (
                            <Notice compact variant="success" title="Check your email">
                              Open the reset link once in your browser (Gmail/Outlook sometimes
                              preview the link and expire it). Don’t reuse an older reset email.
                            </Notice>
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
                                  if (!supabase) throw new Error("Password reset is unavailable in demo mode.");
                                  // Client exchanges ?code=… (PKCE verifier is in this browser).
                                  // Cross-device resets need the TokenHash email template (see supabase/README.md).
                                  const redirectTo = `${window.location.origin}/welcome/reset-password`;
                                  const { error } = await supabase.auth.resetPasswordForEmail(em, {
                                    redirectTo,
                                  });
                                  if (error) throw new Error(error.message);
                                  setForgotStatus("sent");
                                } catch (error: unknown) {
                                  const msg = errorMessage(error, "Could not send reset email.");
                                  // Browser sometimes reports Failed to fetch even after Supabase queued the email.
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

                <div className="mt-6 space-y-3">
                  <Button
                    disabled={loadingReturning}
                    aria-busy={loadingReturning}
                    className={[
                      "h-12 w-full rounded-xl px-6 text-base font-semibold",
                      "transition-all duration-300 ease-out",
                      "active:scale-95",
                      "bg-[#E9D5A3] text-[#0f513f] hover:brightness-110 dark:text-[#0f513f]",
                      "shadow-[0_20px_50px_rgba(0,0,0,0.04)]",
                      "focus-visible:ring-4 focus-visible:ring-emerald-500/25",
                    ].join(" ")}
                    onClick={signInLearner}
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
                    <p className="text-xs text-slate-600">
                      Trouble signing in?{" "}
                      <Link
                        className="font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-900"
                        href="/help"
                      >
                        Open Help
                      </Link>
                      .
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

