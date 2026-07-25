"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { GraduationCap, Loader2 } from "lucide-react";

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
import { Notice } from "@/components/ui/notice";
import { isGuestMode } from "@/lib/guestProgress";
import { isInstructorRole, postSignInPath, safeNextPath } from "@/lib/roles";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type CreateInstructorResponse = {
  ok?: boolean;
  error?: string;
};

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

const chipBase =
  "inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-extrabold tracking-tight focus:outline-none focus-visible:ring-4 sm:gap-2 sm:px-3.5";

/**
 * Staff instructor entry in the header — keeps welcome/sign-up screens student/parent focused.
 */
export function HeaderInstructor() {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);

  const [signInOpen, setSignInOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [forgotOpen, setForgotOpen] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [inviteCode, setInviteCode] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [createEmail, setCreateEmail] = React.useState("");
  const [createPassword, setCreatePassword] = React.useState("");
  const [createStatus, setCreateStatus] = React.useState<
    "idle" | "creating" | "created" | "error"
  >("idle");
  const [createError, setCreateError] = React.useState<string | null>(null);

  const [forgotEmail, setForgotEmail] = React.useState("");
  const [forgotStatus, setForgotStatus] = React.useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [forgotError, setForgotError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isGuestMode()) {
      setSignedIn(false);
      setReady(true);
      return;
    }
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setSignedIn(false);
      setReady(true);
      return;
    }
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSignedIn(Boolean(data.session));
      setReady(true);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [pathname]);

  const openSignIn = () => {
    setError(null);
    setSignInOpen(true);
  };

  const openCreate = () => {
    setCreateStatus("idle");
    setCreateError(null);
    setInviteCode("");
    setFirstName("");
    setLastName("");
    if (email.trim()) setCreateEmail(email.trim());
    setCreatePassword("");
    setCreateOpen(true);
  };

  const signIn = async () => {
    setError(null);
    const em = email.trim();
    const pw = password;
    if (!em || !em.includes("@")) {
      setError("Enter your email.");
      return;
    }
    if (!pw) {
      setError("Enter your password.");
      return;
    }
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) throw new Error("Sign-in is unavailable in demo mode.");
      const { error: signErr } = await supabase.auth.signInWithPassword({
        email: em,
        password: pw,
      });
      if (signErr) throw new Error(signErr.message);

      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!isInstructorRole(user)) {
        throw new Error(
          "This account isn’t set up as an instructor yet. Ask your admin to set role = instructor."
        );
      }

      const next =
        typeof window !== "undefined"
          ? safeNextPath(new URLSearchParams(window.location.search).get("next"))
          : null;
      const preferNext =
        next && (next.startsWith("/billing") || next.startsWith("/checkout"));

      setSignInOpen(false);
      router.push(preferNext ? next : postSignInPath(user));
    } catch (e: unknown) {
      setError(errorMessage(e, "Sign-in failed."));
    } finally {
      setLoading(false);
    }
  };

  if (!ready || signedIn) return null;

  return (
    <>
      <button
        type="button"
        onClick={openSignIn}
        className={`${chipBase} border border-white/25 bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white/20`}
        aria-label="Instructor sign in"
      >
        <GraduationCap className="h-4 w-4" />
        <span className="hidden sm:inline">Instructor</span>
      </button>

      <Dialog
        open={signInOpen}
        onOpenChange={(open) => {
          setSignInOpen(open);
          if (!open) setError(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Instructor sign in</DialogTitle>
            <DialogDescription>
              Access your classes, class codes, and learner progress.
            </DialogDescription>
          </DialogHeader>

          {error ? (
            <Notice compact variant="danger" role="alert">
              {error}
            </Notice>
          ) : null}

          <div className="grid gap-3">
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-slate-700">Instructor email</p>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.org"
                type="email"
                name="kanam-header-instructor-email"
                autoComplete="off"
                className="h-12"
              />
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-slate-700">Password</p>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your instructor password"
                type="password"
                name="kanam-header-instructor-password"
                autoComplete="current-password"
                className="h-12"
              />
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <Button type="button" className="h-11 w-full" disabled={loading} onClick={() => void signIn()}>
              {loading ? (
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
                setSignInOpen(false);
                setForgotEmail(email.trim() || forgotEmail);
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
                setSignInOpen(false);
                openCreate();
              }}
            >
              Create instructor account
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={createOpen}
        onOpenChange={(o) => {
          setCreateOpen(o);
          if (!o) {
            setCreateStatus("idle");
            setCreateError(null);
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

          {createError ? (
            <Notice compact variant="danger" role="alert">
              {createError}
            </Notice>
          ) : null}

          {createStatus === "created" ? (
            <Notice compact variant="success">
              Instructor account created. Use instructor sign in to continue.
            </Notice>
          ) : null}

          <div className="grid gap-3">
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-slate-700">Instructor invite code</p>
              <Input
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Invite code"
                className="h-12"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-700">First name</p>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="h-12"
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-700">Last name</p>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-slate-700">Email</p>
              <Input
                value={createEmail}
                onChange={(e) => setCreateEmail(e.target.value)}
                placeholder="you@school.org"
                type="email"
                name="kanam-header-instructor-create-email"
                autoComplete="off"
                className="h-12"
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-slate-700">Password</p>
              <Input
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                placeholder="At least 8 characters"
                type="password"
                className="h-12"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" className="h-11" onClick={() => setCreateOpen(false)}>
              Close
            </Button>
            <Button
              type="button"
              className="h-11"
              disabled={createStatus === "creating"}
              onClick={async () => {
                setCreateError(null);
                setCreateStatus("creating");
                try {
                  const res = await fetch("/api/admin/create-instructor", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                      inviteCode: inviteCode.trim(),
                      email: createEmail.trim(),
                      password: createPassword,
                      firstName: firstName.trim(),
                      lastName: lastName.trim(),
                    }),
                  });
                  const json = (await res.json()) as CreateInstructorResponse;
                  if (!res.ok || json?.ok === false) {
                    throw new Error(json?.error || "Could not create instructor.");
                  }
                  setCreateStatus("created");
                  setEmail(createEmail.trim());
                  setPassword(createPassword);
                  setCreateOpen(false);
                  setSignInOpen(true);
                } catch (e: unknown) {
                  setCreateStatus("error");
                  setCreateError(errorMessage(e, "Could not create instructor."));
                }
              }}
            >
              {createStatus === "creating" ? (
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
                setCreateOpen(false);
                setEmail(createEmail.trim() || email);
                setPassword(createPassword || password);
                setSignInOpen(true);
              }}
            >
              Go to instructor sign in
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={forgotOpen}
        onOpenChange={(o) => {
          setForgotOpen(o);
          if (!o) return;
          setForgotError(null);
          setForgotStatus("idle");
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>Enter your email and we’ll send you a reset link.</DialogDescription>
          </DialogHeader>

          {forgotError ? (
            <Notice compact variant="danger" role="alert">
              {forgotError}
            </Notice>
          ) : null}

          {forgotStatus === "sent" ? (
            <Notice compact variant="success" title="Check your email">
              Open the reset link once in your browser. Don’t reuse an older reset email.
            </Notice>
          ) : null}

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-700">Email</p>
            <Input
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="you@school.org"
              type="email"
              className="h-12"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setForgotOpen(false)} className="h-11">
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
                  const redirectTo = `${window.location.origin}/welcome/reset-password`;
                  const { error: resetErr } = await supabase.auth.resetPasswordForEmail(em, {
                    redirectTo,
                  });
                  if (resetErr) throw new Error(resetErr.message);
                  setForgotStatus("sent");
                } catch (e: unknown) {
                  const msg = errorMessage(e, "Could not send reset email.");
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
    </>
  );
}
