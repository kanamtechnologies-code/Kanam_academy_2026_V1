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

type CreateInstructorResponse = {
  ok?: boolean;
  error?: string;
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
  const [loadingNew, setLoadingNew] = React.useState(false);
  const [loadingReturning, setLoadingReturning] = React.useState(false);
  const [loadingInstructor, setLoadingInstructor] = React.useState(false);
  const [requestingCode, setRequestingCode] = React.useState(false);
  const [requestCodeMsg, setRequestCodeMsg] = React.useState<string | null>(null);
  const [returningError, setReturningError] = React.useState<string | null>(null);
  const [instructorError, setInstructorError] = React.useState<string | null>(null);
  const [newError, setNewError] = React.useState<string | null>(null);
  const [forgotOpen, setForgotOpen] = React.useState(false);
  const [forgotEmail, setForgotEmail] = React.useState("");
  const [forgotStatus, setForgotStatus] = React.useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [forgotError, setForgotError] = React.useState<string | null>(null);
  const [resetLinkError, setResetLinkError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const resetError = params.get("reset_error");
      const errorCode = params.get("error_code") || params.get("error");
      const errorDescription = params.get("error_description");

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

      if (resetError || errorCode) {
        const url = new URL(window.location.href);
        url.search = "";
        url.hash = "";
        window.history.replaceState({}, document.title, url.pathname);
      }
    } catch {
      // ignore
    }
  }, []);

  const [instructorSignInOpen, setInstructorSignInOpen] = React.useState(false);
  const [instructorSignInEmail, setInstructorSignInEmail] = React.useState("");
  const [instructorSignInPassword, setInstructorSignInPassword] = React.useState("");

  const [instrCreateOpen, setInstrCreateOpen] = React.useState(false);
  const [instrInviteCode, setInstrInviteCode] = React.useState("");
  const [instrFirstName, setInstrFirstName] = React.useState("");
  const [instrLastName, setInstrLastName] = React.useState("");
  const [instrEmail, setInstrEmail] = React.useState("");
  const [instrPassword, setInstrPassword] = React.useState("");
  const [instrCreateStatus, setInstrCreateStatus] = React.useState<
    "idle" | "creating" | "created" | "error"
  >("idle");
  const [instrCreateError, setInstrCreateError] = React.useState<string | null>(null);

  const cardEnter = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 260, damping: 22, delay },
  });

  const glassCardBase =
    "rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out dark:border-white/15 dark:bg-slate-950/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]";

  const signInWith = React.useCallback(
    async (mode: "learner" | "instructor", creds: { email: string; password: string }) => {
      if (mode === "learner") setReturningError(null);
      if (mode === "instructor") setInstructorError(null);

      const em = creds.email.trim();
      const pw = creds.password;

      if (!em || !em.includes("@")) {
        const msg = "Enter your email.";
        if (mode === "instructor") setInstructorError(msg);
        else setReturningError(msg);
        return;
      }
      if (!pw) {
        const msg = "Enter your password.";
        if (mode === "instructor") setInstructorError(msg);
        else setReturningError(msg);
        return;
      }

      if (mode === "instructor") setLoadingInstructor(true);
      else setLoadingReturning(true);

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

        if (mode === "instructor" && !isInstructorRole(user)) {
          throw new Error(
            "This account isn’t set up as an instructor yet. Ask your admin to set role = instructor."
          );
        }

        const next =
          typeof window !== "undefined"
            ? safeNextPath(new URLSearchParams(window.location.search).get("next"))
            : null;

        if (isInstructorRole(user)) {
          setInstructorSignInOpen(false);
          router.push(next && next.startsWith("/billing") ? next : postSignInPath(user));
          return;
        }

        if (isParentRole(user)) {
          router.push(next && next.startsWith("/billing") ? next : postSignInPath(user));
          return;
        }

        if (mode === "learner") {
          const ensureRes = await fetch("/api/auth/ensure-profile", { method: "POST" });
          const ensureJson = (await ensureRes.json()) as EnsureProfileResponse;
          if (!ensureRes.ok || !ensureJson?.ok) {
            throw new Error(ensureJson?.error || "Signed in, but could not load your profile.");
          }
          router.push(next || "/dashboard");
          return;
        }

        router.push(next || postSignInPath(user));
      } catch (error: unknown) {
        const msg = errorMessage(error, "Sign-in failed.");
        if (mode === "instructor") setInstructorError(msg);
        else setReturningError(msg);
      } finally {
        if (mode === "instructor") setLoadingInstructor(false);
        else setLoadingReturning(false);
      }
    },
    [router]
  );

  const signInLearner = React.useCallback(() => {
    signInWith("learner", {
      email: returningEmail,
      password: returningPassword,
    });
  }, [returningEmail, returningPassword, signInWith]);

  const signInInstructor = React.useCallback(() => {
    signInWith("instructor", {
      email: instructorSignInEmail,
      password: instructorSignInPassword,
    });
  }, [instructorSignInEmail, instructorSignInPassword, signInWith]);

  const openInstructorSignIn = React.useCallback(() => {
    setInstructorError(null);
    setInstructorSignInOpen(true);
  }, []);

  const openInstructorCreate = React.useCallback(() => {
    setInstrCreateStatus("idle");
    setInstrCreateError(null);
    setInstrInviteCode("");
    setInstrFirstName("");
    setInstrLastName("");
    if (instructorSignInEmail.trim()) setInstrEmail(instructorSignInEmail.trim());
    setInstrPassword("");
    setInstrCreateOpen(true);
  }, [instructorSignInEmail]);

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
              <p className="mt-1 text-sm text-slate-600">
                Preview a classroom-style lesson (objectives, practice, checks). Educators and
                parents can use this before creating a real account.
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
                <p className="mt-1 text-sm text-slate-600">
                  One login for you — kid profiles with optional PINs. Family plan unlocks all kids.
                </p>
              </div>
              <Button
                className="h-11 shrink-0 rounded-xl px-5 font-semibold"
                onClick={() => router.push("/welcome/parent")}
              >
                <Users className="h-4 w-4" />
                Create family account
              </Button>
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
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Enter a class code, confirm your age, then create an email login. Use a teacher
                  code for school, or get a self-paced code to learn on your own — then unlock
                  tracks with a plan or purchase when you&apos;re ready.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Under 13? A parent must{" "}
                  <button
                    type="button"
                    className="font-semibold text-emerald-800 underline underline-offset-2"
                    onClick={() => router.push("/welcome/parent?reason=under13")}
                  >
                    create a family account
                  </button>{" "}
                  — kids under 13 can&apos;t create their own email login.
                </p>

                {newError ? (
                  <div className="mt-5">
                    <Notice compact variant="danger" role="alert">
                      {newError}
                    </Notice>
                  </div>
                ) : null}
                {requestCodeMsg ? (
                  <div className="mt-5">
                    <Notice compact variant="success">
                      {requestCodeMsg}
                    </Notice>
                  </div>
                ) : null}

                <div className="mt-6 grid gap-3 rounded-2xl border border-white/50 bg-white/40 p-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Hash className="h-4 w-4 text-emerald-600" />
                      Class code <span className="font-normal text-slate-500">(required)</span>
                    </div>
                    <Input
                      value={classCode}
                      onChange={(e) => setClassCode(e.target.value)}
                      placeholder="Teacher code or self-paced code"
                      className="h-12 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-slate-600">
                        Learning on your own? Get a self-paced code. Next we&apos;ll ask your age
                        before collecting email.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={requestingCode}
                        className="shrink-0"
                        onClick={async () => {
                          setNewError(null);
                          setRequestCodeMsg(null);
                          setRequestingCode(true);
                          try {
                            const res = await fetch("/api/student/request-class-code", {
                              method: "POST",
                              headers: { "content-type": "application/json" },
                            });
                            const json = (await res.json()) as {
                              ok?: boolean;
                              error?: string;
                              message?: string;
                              classCode?: string;
                            };
                            if (!res.ok || !json.ok) {
                              throw new Error(json.error || "Could not get a class code.");
                            }
                            if (json.classCode) {
                              setClassCode(json.classCode);
                              try {
                                window.localStorage.setItem("kanam.classCode", json.classCode);
                              } catch {
                                // ignore
                              }
                            }
                            setRequestCodeMsg(
                              json.message ||
                                (json.classCode
                                  ? `Your self-paced code is ${json.classCode}. We filled it in for you.`
                                  : "Class code ready.")
                            );
                          } catch (error: unknown) {
                            setNewError(errorMessage(error, "Could not get a class code."));
                          } finally {
                            setRequestingCode(false);
                          }
                        }}
                      >
                        {requestingCode ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Getting code…
                          </>
                        ) : (
                          "Get a self-paced code"
                        )}
                      </Button>
                    </div>
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
                      "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
                      "text-[var(--accent)] shadow-lg shadow-emerald-900/20 hover:brightness-[1.06]",
                      "focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.28)]",
                    ].join(" ")}
                    onClick={() => {
                      setNewError(null);
                      const cc = classCode.trim();
                      if (!cc) {
                        setNewError(
                          "Enter a class code, or tap “Get a self-paced code” first."
                        );
                        return;
                      }
                      try {
                        window.localStorage.setItem("kanam.classCode", cc);
                      } catch {
                        // ignore
                      }
                      setLoadingNew(true);
                      const params = new URLSearchParams({ classCode: cc });
                      router.push(`/welcome/age?${params.toString()}`);
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

                <div className="mt-4 rounded-2xl border border-white/50 bg-white/40 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">After you sign up</p>
                  <p className="mt-1 text-sm text-slate-700">
                    You&apos;ll land on your learning hub. Open tracks you&apos;ve unlocked, or go to{" "}
                    <Link
                      className="font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-900"
                      href="/billing"
                    >
                      Billing
                    </Link>{" "}
                    for the Family plan or individual tracks. Need help?{" "}
                    <Link
                      className="font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-900"
                      href="/help"
                    >
                      Help
                    </Link>
                    .
                  </p>
                </div>
              </motion.div>

              {/* Returning learner */}
              <motion.div
                {...cardEnter(0.1)}
                whileHover={{ y: -8 }}
                className={[glassCardBase, "p-5 sm:p-6 md:p-8"].join(" ")}
              >
                <p className="kanam-text-pop-strong text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  Returning
                </p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  Sign in
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Students go to the learning hub. Parents go to the family hub to pick a child.
                  Instructors go to the instructor dashboard.
                </p>

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
                    <p className="text-xs text-slate-600">
                      Student, parent, or instructor email — same one you signed up with.
                    </p>
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
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs text-slate-600">Use your Kanam password.</p>
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

                  <Notice
                    compact
                    variant="info"
                    title="Educator or instructor?"
                    action={
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full border-[var(--brand)]/30 bg-white/80 sm:w-auto"
                        onClick={openInstructorSignIn}
                      >
                        <Users className="h-4 w-4" />
                        Instructor sign in
                      </Button>
                    }
                  >
                    Use a separate sign-in for your instructor dashboard.
                  </Notice>

                  <button
                    type="button"
                    className="w-full text-xs font-semibold text-slate-700 underline underline-offset-2 hover:text-slate-900"
                    onClick={openInstructorCreate}
                  >
                    Create instructor account
                  </button>

                  <Dialog
                    open={instructorSignInOpen}
                    onOpenChange={(open) => {
                      setInstructorSignInOpen(open);
                      if (!open) setInstructorError(null);
                    }}
                  >
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Instructor sign in</DialogTitle>
                        <DialogDescription>
                          Access your classes, class codes, and learner progress.
                        </DialogDescription>
                      </DialogHeader>

                      {instructorError ? (
                        <Notice compact variant="danger" role="alert">
                          {instructorError}
                        </Notice>
                      ) : null}

                      <div className="grid gap-3">
                        <div className="space-y-1.5">
                          <p className="text-xs font-semibold text-slate-700">Instructor email</p>
                          <Input
                            value={instructorSignInEmail}
                            onChange={(e) => setInstructorSignInEmail(e.target.value)}
                            placeholder="you@school.org"
                            type="email"
                            name="kanam-instructor-email"
                            autoComplete="off"
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-xs font-semibold text-slate-700">Password</p>
                          <Input
                            value={instructorSignInPassword}
                            onChange={(e) => setInstructorSignInPassword(e.target.value)}
                            placeholder="Your instructor password"
                            type="password"
                            name="kanam-instructor-password"
                            autoComplete="new-password"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <DialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
                        <Button
                          type="button"
                          className="h-11 w-full"
                          disabled={loadingInstructor}
                          onClick={signInInstructor}
                        >
                          {loadingInstructor ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Signing in…
                            </>
                          ) : (
                            "Sign in as instructor"
                          )}
                        </Button>
                        <button
                          type="button"
                          className="text-xs font-semibold text-slate-600 underline underline-offset-2 hover:text-slate-900"
                          onClick={() => {
                            setInstructorSignInOpen(false);
                            setForgotEmail(instructorSignInEmail.trim() || forgotEmail);
                            setForgotError(null);
                            setForgotStatus("idle");
                            setForgotOpen(true);
                          }}
                        >
                          Forgot password?
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold text-slate-600 underline underline-offset-2 hover:text-slate-900"
                          onClick={() => {
                            setInstructorSignInOpen(false);
                            openInstructorCreate();
                          }}
                        >
                          Create instructor account
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={instrCreateOpen}
                    onOpenChange={(o) => {
                      setInstrCreateOpen(o);
                      if (!o) {
                        setInstrCreateStatus("idle");
                        setInstrCreateError(null);
                      }
                    }}
                  >
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Create an instructor account</DialogTitle>
                        <DialogDescription>
                          This is staff-only. You’ll need the instructor invite code.
                        </DialogDescription>
                      </DialogHeader>

                      {instrCreateError ? (
                        <Notice compact variant="danger" role="alert">
                          {instrCreateError}
                        </Notice>
                      ) : null}

                      {instrCreateStatus === "created" ? (
                        <Notice compact variant="success">
                          Instructor account created. Use the instructor sign-in window to continue.
                        </Notice>
                      ) : null}

                      <div className="grid gap-3">
                        <div className="space-y-1.5">
                          <p className="text-xs font-semibold text-slate-700">Instructor invite code</p>
                          <Input
                            value={instrInviteCode}
                            onChange={(e) => setInstrInviteCode(e.target.value)}
                            placeholder="Invite code"
                            className="h-12"
                          />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-slate-700">First name</p>
                            <Input
                              value={instrFirstName}
                              onChange={(e) => setInstrFirstName(e.target.value)}
                              placeholder="First name"
                              className="h-12"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-slate-700">Last name</p>
                            <Input
                              value={instrLastName}
                              onChange={(e) => setInstrLastName(e.target.value)}
                              placeholder="Last name"
                              className="h-12"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <p className="text-xs font-semibold text-slate-700">Email</p>
                          <Input
                            value={instrEmail}
                            onChange={(e) => setInstrEmail(e.target.value)}
                            placeholder="you@school.org"
                            type="email"
                            name="kanam-instructor-create-email"
                            autoComplete="off"
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <p className="text-xs font-semibold text-slate-700">Password</p>
                          <Input
                            value={instrPassword}
                            onChange={(e) => setInstrPassword(e.target.value)}
                            placeholder="At least 8 characters"
                            type="password"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                          type="button"
                          variant="outline"
                          className="h-11"
                          onClick={() => setInstrCreateOpen(false)}
                        >
                          Close
                        </Button>
                        <Button
                          type="button"
                          className="h-11"
                          disabled={instrCreateStatus === "creating"}
                          onClick={async () => {
                            setInstrCreateError(null);
                            setInstrCreateStatus("creating");
                            try {
                              const res = await fetch("/api/admin/create-instructor", {
                                method: "POST",
                                headers: { "content-type": "application/json" },
                                body: JSON.stringify({
                                  inviteCode: instrInviteCode.trim(),
                                  email: instrEmail.trim(),
                                  password: instrPassword,
                                  firstName: instrFirstName.trim(),
                                  lastName: instrLastName.trim(),
                                }),
                              });
                              const json = (await res.json()) as CreateInstructorResponse;
                              if (!res.ok || json?.ok === false) {
                                throw new Error(json?.error || "Could not create instructor.");
                              }
                              setInstrCreateStatus("created");
                              setInstructorSignInEmail(instrEmail.trim());
                              setInstructorSignInPassword(instrPassword);
                              setInstrCreateOpen(false);
                              setInstructorSignInOpen(true);
                            } catch (error: unknown) {
                              setInstrCreateStatus("error");
                              setInstrCreateError(
                                errorMessage(error, "Could not create instructor.")
                              );
                            }
                          }}
                        >
                          {instrCreateStatus === "creating" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Creating…
                            </>
                          ) : (
                            "Create instructor"
                          )}
                        </Button>
                      </DialogFooter>

                      <div className="pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="h-11 w-full"
                          onClick={() => {
                            setInstrCreateOpen(false);
                            setInstructorSignInEmail(instrEmail.trim() || instructorSignInEmail);
                            setInstructorSignInPassword(instrPassword || instructorSignInPassword);
                            setInstructorSignInOpen(true);
                          }}
                        >
                          Go to instructor sign in
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

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

