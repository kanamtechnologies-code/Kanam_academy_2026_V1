"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Hash, Loader2, Sparkles, Users, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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
import {
  isInstructorRole,
  isParentRole,
  postSignInPath,
  readUserRole,
  safeNextPath,
} from "@/lib/roles";

type EnsureProfileResponse = {
  ok?: boolean;
  error?: string;
  student?: { id?: string; display_name?: string };
};

export default function WelcomePage() {
  const router = useRouter();
  const [returningEmail, setReturningEmail] = React.useState("");
  const [returningPassword, setReturningPassword] = React.useState("");
  const [classCode, setClassCode] = React.useState("");
  const [studentPath, setStudentPath] = React.useState<"solo" | "teacher">("solo");
  const [loadingNew, setLoadingNew] = React.useState(false);
  const [loadingReturning, setLoadingReturning] = React.useState(false);
  const [returningError, setReturningError] = React.useState<SignInErrorCopy | null>(null);
  const [newError, setNewError] = React.useState<string | null>(null);
  const [forgotOpen, setForgotOpen] = React.useState(false);
  const [forgotEmail, setForgotEmail] = React.useState("");
  const [forgotStatus, setForgotStatus] = React.useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [forgotError, setForgotError] = React.useState<string | null>(null);
  const [resetLinkError, setResetLinkError] = React.useState<string | null>(null);
  const [linkErrorKind, setLinkErrorKind] = React.useState<"reset" | "confirm">("reset");
  const [accountDeletedMsg, setAccountDeletedMsg] = React.useState<string | null>(null);
  const [signedInShortcut, setSignedInShortcut] = React.useState<{
    href: string;
    label: string;
  } | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        if (!supabase) return;
        const { data } = await supabase.auth.getSession();
        if (cancelled || !data.session) return;
        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;
        const href = postSignInPath(user);
        const role = readUserRole(user);
        const label =
          role === "parent"
            ? "Continue to family hub"
            : role === "instructor" || role === "teacher"
              ? "Continue to instructor dashboard"
              : "Continue learning";
        setSignedInShortcut({ href, label });
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const resetError = params.get("reset_error");
      const confirmError = params.get("confirm_error");
      const errorCode = params.get("error_code") || params.get("error");
      const errorDescription = params.get("error_description");
      const accountDeleted = params.get("accountDeleted") === "1";

      if (accountDeleted) {
        setAccountDeletedMsg(
          "Your family account and child learning data were deleted. Any active subscription was canceled when possible."
        );
      }

      if (confirmError) {
        setLinkErrorKind("confirm");
        setResetLinkError(decodeURIComponent(confirmError.replace(/\+/g, " ")));
      } else if (resetError) {
        setLinkErrorKind("reset");
        setResetLinkError(decodeURIComponent(resetError.replace(/\+/g, " ")));
      } else if (errorCode) {
        setLinkErrorKind("reset");
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
    "w-full min-w-0 max-w-full rounded-[24px] bg-white/80 backdrop-blur-2xl border border-white/70 shadow-[0_16px_40px_rgba(15,23,42,0.14),0_32px_64px_rgba(15,23,42,0.12)] transition-all duration-300 ease-out sm:rounded-[32px] dark:border-white/15 dark:bg-slate-950/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.55)]";

  const signInLearner = React.useCallback(async () => {
    setReturningError(null);
    const em = returningEmail.trim();
    const pw = returningPassword;

    if (!em || !em.includes("@")) {
      setReturningError({
        title: "Email needed",
        body: "Enter the email address you used for your Kanam account.",
      });
      return;
    }
    if (!pw) {
      setReturningError({
        title: "Password needed",
        body: "Enter your password to continue, or use Forgot password if you need a reset.",
      });
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
      setReturningError(mapSignInError(errorMessage(error, "Sign-in failed.")));
    } finally {
      setLoadingReturning(false);
    }
  }, [returningEmail, returningPassword, router]);

  const continueNewStudentSignup = React.useCallback(
    async (opts: { selfPaced?: boolean; classCode?: string }) => {
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

      setLoadingNew(true);
      try {
        const res = await fetch("/api/student/validate-class-code", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ classCode: cc }),
        });
        const json = (await res.json().catch(() => null)) as {
          ok?: boolean;
          error?: string;
          classCode?: string;
        } | null;
        if (!res.ok || !json?.ok) {
          setNewError(
            json?.error ||
              "That class code wasn't found. Check with your teacher, or choose self-paced learning."
          );
          setLoadingNew(false);
          return;
        }

        const normalized = (json.classCode || cc).trim().toUpperCase();
        try {
          window.localStorage.setItem("kanam.classCode", normalized);
          window.localStorage.removeItem("kanam.selfPaced");
        } catch {
          // ignore
        }
        setClassCode(normalized);
        const params = new URLSearchParams({ classCode: normalized });
        router.push(`/welcome/age?${params.toString()}`);
      } catch {
        setNewError("Could not check that class code right now. Try again.");
        setLoadingNew(false);
      }
    },
    [router]
  );

  return (
    <WelcomeBackground>
      <div className="flex min-h-[calc(100dvh-var(--kanam-header-height,4.75rem))] w-full min-w-0 items-center justify-center px-1 py-5 sm:px-2 sm:py-6 md:px-6">
        <div className="mx-auto w-full min-w-0 max-w-[1400px]">
          <NoticePresence show={Boolean(resetLinkError)} contentKey={resetLinkError} className="mb-4">
            <Notice
              variant="danger"
              role="alert"
              title={linkErrorKind === "confirm" ? "Confirmation link problem" : "Reset link problem"}
              action={
                <>
                  {linkErrorKind === "confirm" ? (
                    <Button asChild type="button" size="sm">
                      <a href="#student-signup">Create account / resend</a>
                    </Button>
                  ) : (
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
                  )}
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
          </NoticePresence>

          <NoticePresence
            show={Boolean(accountDeletedMsg)}
            contentKey={accountDeletedMsg}
            className="mb-4"
          >
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
          </NoticePresence>

          {/* Top row: welcome message + try-a-lesson card (side-by-side on large screens) */}
          <div className="grid min-w-0 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="min-w-0 max-w-full text-center lg:text-left">
              <h1 className="break-words text-[1.65rem] font-black leading-[1.08] tracking-tight text-slate-900 sm:text-4xl">
                <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 sm:gap-4 lg:justify-start">
                  <span className="min-w-0">Welcome to Kanam Academy</span>
                </span>
              </h1>
              <div className="mt-2 space-y-1.5 text-sm font-medium leading-snug text-slate-800 sm:text-base">
                <p>Glad you’re here. Tap a path below to jump to the right form:</p>
                <div className="flex flex-col gap-2 sm:gap-1.5">
                  <button
                    type="button"
                    className="rounded-xl px-1 py-2 text-left transition hover:bg-white/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.28)] sm:py-1"
                    onClick={() =>
                      document.getElementById("welcome-student")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  >
                    <span className="kanam-text-pop-strong font-extrabold text-[color:var(--brand)]">
                      Student
                    </span>
                    {" — "}
                    your own email login for school or self-paced learning.
                  </button>
                  <button
                    type="button"
                    className="rounded-xl px-1 py-2 text-left transition hover:bg-white/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.28)] sm:py-1"
                    onClick={() =>
                      document.getElementById("welcome-parent")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  >
                    <span className="kanam-text-pop-strong font-extrabold text-[color:var(--brand-2)]">
                      Parent
                    </span>
                    {" — "}
                    one login, kid profiles with optional PINs, Family plan for the whole household.
                  </button>
                  <button
                    type="button"
                    className="rounded-xl px-1 py-2 text-left transition hover:bg-white/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.28)] sm:py-1"
                    onClick={() =>
                      document.getElementById("sign-in")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  >
                    <span className="kanam-text-pop-strong font-extrabold text-[color:var(--accent)]">
                      Returning
                    </span>
                    {" — "}
                    sign in with the same email (students and parents).
                  </button>
                </div>
                {signedInShortcut ? (
                  <div className="mt-3">
                    <Button
                      type="button"
                      className="h-11 w-full rounded-xl font-semibold sm:w-auto"
                      onClick={() => router.push(signedInShortcut.href)}
                    >
                      {signedInShortcut.label}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="w-full rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.14),0_32px_64px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/15 dark:bg-slate-950/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.55)] lg:justify-self-end">
              <p className="mt-0 text-base font-black tracking-tight text-slate-900">
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
            id="welcome-parent"
            {...cardEnter(0.0)}
            className={[glassCardBase, "mt-4 scroll-mt-24 p-4 sm:p-5"].join(" ")}
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
          <div className="mt-4 grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-2 xl:gap-8">
              {/* New learner (priority) */}
              <motion.div
                id="welcome-student"
                {...cardEnter(0.05)}
                whileHover={{ y: -8 }}
                className={[
                  glassCardBase,
                  "flex h-full scroll-mt-24 flex-col p-4 sm:p-6 md:p-8",
                ].join(" ")}
              >
                <p className="kanam-text-pop-strong text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
                  Student account
                </p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  I’m a new student
                </h2>
                <p className="mt-2 min-h-[2.5rem] text-xs leading-relaxed text-slate-500">
                  Choose how you&apos;re joining, then create your student account.
                </p>

                <NoticePresence show={Boolean(newError)} contentKey={newError} className="mt-5">
                  <Notice compact variant="danger" role="alert">
                    {newError}
                  </Notice>
                </NoticePresence>

                <div
                  className="mt-6 grid flex-1 content-start gap-3 sm:grid-cols-2"
                  role="radiogroup"
                  aria-label="How you're joining"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={studentPath === "solo"}
                    onClick={() => {
                      setNewError(null);
                      setStudentPath("solo");
                    }}
                    className={[
                      "relative rounded-2xl px-4 py-4 text-left transition-all duration-300 ease-out",
                      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.28)]",
                      "active:scale-[0.98]",
                      "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
                      studentPath === "solo"
                        ? "z-[1] scale-[1.02] shadow-xl shadow-emerald-900/30 ring-2 ring-[var(--accent)] brightness-110"
                        : "shadow-md shadow-emerald-900/15 ring-1 ring-white/20 hover:brightness-[1.05] hover:shadow-lg hover:ring-[rgb(var(--accent-rgb)/0.45)]",
                    ].join(" ")}
                  >
                    {studentPath === "solo" ? (
                      <span
                        className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-[var(--accent)] text-[10px] font-black text-[color:var(--brand-2)]"
                        aria-hidden
                      >
                        ✓
                      </span>
                    ) : null}
                    <p className="pr-6 text-sm font-extrabold tracking-tight text-[var(--accent)]">
                      I&apos;m learning on my own
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--accent-rgb)/0.9)]">
                      No class code needed. We&apos;ll set you up for self-paced learning.
                    </p>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={studentPath === "teacher"}
                    onClick={() => {
                      setNewError(null);
                      setStudentPath("teacher");
                    }}
                    className={[
                      "relative rounded-2xl px-4 py-4 text-left transition-all duration-300 ease-out",
                      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.28)]",
                      "active:scale-[0.98]",
                      "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
                      studentPath === "teacher"
                        ? "z-[1] scale-[1.02] shadow-xl shadow-emerald-900/30 ring-2 ring-[var(--accent)] brightness-110"
                        : "shadow-md shadow-emerald-900/15 ring-1 ring-white/20 hover:brightness-[1.05] hover:shadow-lg hover:ring-[rgb(var(--accent-rgb)/0.45)]",
                    ].join(" ")}
                  >
                    {studentPath === "teacher" ? (
                      <span
                        className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-[var(--accent)] text-[10px] font-black text-[color:var(--brand-2)]"
                        aria-hidden
                      >
                        ✓
                      </span>
                    ) : null}
                    <p className="pr-6 text-sm font-extrabold tracking-tight text-[var(--accent)]">
                      I have a teacher code
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--accent-rgb)/0.9)]">
                      Join your school or club class with the code your teacher shared.
                    </p>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {studentPath === "teacher" ? (
                    <motion.div
                      key="teacher-code"
                      initial={{ height: 0, opacity: 0, y: -6 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -6 }}
                      transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.7 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 grid gap-3 rounded-2xl border border-white/50 bg-white/40 p-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <Hash className="h-4 w-4 text-emerald-600" />
                            Teacher class code
                          </div>
                          <Input
                            value={classCode}
                            onChange={(e) => {
                              setNewError(null);
                              setClassCode(e.target.value);
                            }}
                            placeholder="Enter your class code"
                            className="h-12 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500"
                            autoCapitalize="characters"
                            autoFocus
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div className="mt-auto pt-6">
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
                      if (studentPath === "teacher") {
                        continueNewStudentSignup({ classCode });
                        return;
                      }
                      continueNewStudentSignup({ selfPaced: true });
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
                  <p className="mt-3 text-center text-xs text-slate-600">
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
                </div>
              </motion.div>

              {/* Returning accounts */}
              <motion.div
                id="sign-in"
                {...cardEnter(0.1)}
                whileHover={{ y: -8 }}
                className={[glassCardBase, "flex h-full scroll-mt-28 flex-col p-5 sm:p-6 md:p-8"].join(" ")}
              >
                <p className="kanam-text-pop-strong text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  Returning
                </p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  Sign in
                </h2>
                <p className="mt-2 min-h-[2.5rem] text-xs leading-relaxed text-slate-500">
                  Use your student or family email and password to continue learning.
                </p>

                <NoticePresence
                  show={Boolean(returningError)}
                  contentKey={returningError?.title ?? returningError?.body}
                  className="mt-4"
                >
                  <Notice
                    compact
                    variant="danger"
                    role="alert"
                    title={returningError?.title}
                  >
                    {returningError?.body}
                  </Notice>
                </NoticePresence>

                <div className="mt-6 grid flex-1 content-start gap-3 rounded-2xl border border-white/50 bg-white/40 p-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Email</label>
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
                    <label className="text-sm font-semibold text-slate-700">Password</label>
                    <PasswordInput
                      value={returningPassword}
                      onChange={(e) => setReturningPassword(e.target.value)}
                      placeholder="Password"
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
                        <button
                          type="button"
                          onClick={() => setForgotOpen(true)}
                          className="inline-flex min-h-11 items-center text-xs font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-900 sm:min-h-0"
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
                                    mode?: string;
                                    devResetUrl?: string;
                                  };
                                  if (!res.ok || !json.ok) {
                                    throw new Error(json.error || "Could not send reset email.");
                                  }
                                  if (json.devResetUrl) {
                                    window.open(json.devResetUrl, "_blank", "noopener,noreferrer");
                                  }
                                  setForgotStatus("sent");
                                } catch (error: unknown) {
                                  setForgotStatus("error");
                                  setForgotError(
                                    errorMessage(error, "Could not send reset email.")
                                  );
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

                <div className="mt-auto pt-6">
                  <Button
                    disabled={loadingReturning}
                    aria-busy={loadingReturning}
                    className={[
                      "h-12 w-full rounded-xl px-6 text-base font-semibold",
                      "transition-all duration-300 ease-out",
                      "active:scale-95",
                      "bg-[#E9D5A3] text-[#0f513f] hover:brightness-110 dark:text-[#0f513f]",
                      "shadow-[0_12px_28px_rgba(15,23,42,0.18),0_4px_12px_rgba(201,168,78,0.25)]",
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
                  <p className="mt-3 text-center text-xs text-slate-600">
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
              </motion.div>
          </div>
        </div>
      </div>
    </WelcomeBackground>
  );
}

