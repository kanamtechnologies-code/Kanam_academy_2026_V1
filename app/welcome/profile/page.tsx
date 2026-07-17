"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, Loader2, UserRound } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const USER_NAME_KEY = "kanam.userName";
type SignupResponse = { ok?: boolean; error?: string };
type EnsureProfileResponse = { ok?: boolean; error?: string };

const GRADES = ["5", "6", "7", "8", "9", "10", "11", "12", "Other"] as const;

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

function isAsyncCode(code: string) {
  return code.trim().toUpperCase() === "KANAM-ASYNC";
}

export default function WelcomeProfilePage() {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showOptional, setShowOptional] = React.useState(false);

  const [classCode, setClassCode] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [schoolName, setSchoolName] = React.useState("");
  const [parentName, setParentName] = React.useState("");
  const [parentEmail, setParentEmail] = React.useState("");
  const [parentPhone, setParentPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  React.useEffect(() => {
    let qpEmail = "";
    let qpClass = "";
    try {
      const sp = new URLSearchParams(window.location.search);
      qpEmail = (sp.get("email") ?? "").trim();
      qpClass = (sp.get("classCode") ?? "").trim();
    } catch {
      // ignore
    }
    if (qpEmail) setEmail(qpEmail);
    if (qpClass) setClassCode(qpClass);
    if (!qpEmail || !qpClass) {
      try {
        if (!qpEmail) setEmail(window.localStorage.getItem("kanam.onboardingEmail") ?? "");
        if (!qpClass) setClassCode(window.localStorage.getItem("kanam.classCode") ?? "");
      } catch {
        // ignore
      }
    }
  }, []);

  const onSubmit = async () => {
    setError(null);
    const cc = classCode.trim();
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!cc) {
      setError("A class code is required. Go back and tap “Get a self-paced code” if you need one.");
      return;
    }
    if (!trimmedFirst) {
      setError("Enter your first name.");
      return;
    }
    if (!trimmedLast) {
      setError("Enter your last name.");
      return;
    }
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) throw new Error("Account creation is unavailable in demo mode.");

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          classCode: cc,
          email: trimmedEmail,
          password,
          firstName: trimmedFirst,
          lastName: trimmedLast,
          grade: grade || undefined,
          schoolName: schoolName.trim() || undefined,
          parentName: parentName.trim() || undefined,
          parentEmail: parentEmail.trim() || undefined,
          parentPhone: parentPhone.trim() || undefined,
        }),
      });
      const json = (await res.json()) as SignupResponse;
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Could not create account.");
      }

      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });
      if (signInErr) throw new Error(signInErr.message);

      const ensureRes = await fetch("/api/auth/ensure-profile", { method: "POST" });
      const ensureJson = (await ensureRes.json()) as EnsureProfileResponse;
      if (!ensureRes.ok || !ensureJson?.ok) {
        throw new Error(
          ensureJson?.error || "Account created, but could not load your student profile."
        );
      }

      try {
        window.localStorage.setItem(USER_NAME_KEY, trimmedFirst);
        window.localStorage.setItem("kanam.classCode", cc);
        window.localStorage.setItem("kanam.onboardingEmail", trimmedEmail);
      } catch {
        // ignore
      }

      router.push("/dashboard");
    } catch (e: unknown) {
      setError(errorMessage(e, "Something went wrong."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <WelcomeBackground>
      <div className="mx-auto flex min-h-[calc(100dvh-var(--kanam-header-height,4.75rem))] w-full max-w-xl flex-col justify-center px-4 py-10">
        <div className="rounded-3xl border border-white/50 bg-white/85 p-6 shadow-xl backdrop-blur-md sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
            Student account
          </p>
          <h1 className="mt-3 flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
            <UserRound className="h-6 w-6 text-emerald-700" />
            Finish your signup
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Your own email login for school or self-paced learning. Progress and XP save to this
            profile. Parents managing kids should use a{" "}
            <Link
              href="/welcome/parent"
              className="font-semibold text-emerald-800 underline underline-offset-2"
            >
              family account
            </Link>{" "}
            instead.
          </p>

          {error ? (
            <div className="mt-4">
              <Notice compact variant="danger" role="alert">
                {error}
              </Notice>
            </div>
          ) : null}

          <div className="mt-6 grid gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">
                Class code <span className="text-emerald-700">*</span>
              </label>
              <Input
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                placeholder="Teacher code or KANAM-ASYNC"
                className="h-11"
                autoCapitalize="characters"
              />
              <p className="text-xs text-slate-500">
                {isAsyncCode(classCode)
                  ? "Self-paced cohort — unlock tracks from Billing after you create your account."
                  : "Teacher codes join a class with assigned lessons. Self-paced? Use KANAM-ASYNC from the welcome screen."}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  First name <span className="text-emerald-700">*</span>
                </label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="h-11"
                  autoComplete="given-name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Last name <span className="text-emerald-700">*</span>
                </label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="h-11"
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">
                Email <span className="text-emerald-700">*</span>
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="e.g. you@school.org"
                className="h-11"
                autoComplete="email"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Password <span className="text-emerald-700">*</span>
                </label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="At least 8 characters"
                  className="h-11"
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Confirm <span className="text-emerald-700">*</span>
                </label>
                <Input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Type it again"
                  className="h-11"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button
              type="button"
              className="mt-1 flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50"
              onClick={() => setShowOptional((v) => !v)}
              aria-expanded={showOptional}
            >
              <span>Optional details (grade, school, guardian contact)</span>
              <ChevronDown
                className={[
                  "h-4 w-4 shrink-0 text-slate-500 transition-transform",
                  showOptional ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>

            {showOptional ? (
              <div className="grid gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                <p className="text-xs text-slate-600">
                  These map to your student profile in the database. Guardian fields are contact
                  only — they do not create a parent login.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Grade</label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <option value="">Choose…</option>
                      {GRADES.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">School</label>
                    <Input
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="School name"
                      className="h-11 bg-white"
                    />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Guardian name"
                    className="h-11 bg-white"
                  />
                  <Input
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    type="email"
                    placeholder="Guardian email"
                    className="h-11 bg-white"
                  />
                  <Input
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="Guardian phone"
                    className="h-11 bg-white sm:col-span-2"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="h-12 sm:w-auto"
              onClick={() => router.push("/welcome")}
              disabled={saving}
            >
              Back
            </Button>
            <Button
              type="button"
              disabled={saving}
              aria-busy={saving}
              className="h-12 flex-1 text-base font-semibold"
              onClick={onSubmit}
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  Create student account <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-600">
            <p className="font-extrabold text-slate-900">After signup</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>You&apos;ll land on your learning hub.</li>
              <li>
                Self-paced learners unlock tracks via{" "}
                <Link href="/billing" className="font-semibold text-emerald-800 underline">
                  Billing
                </Link>
                .
              </li>
              <li>
                Already have siblings? Convert later from the dashboard, or start with a{" "}
                <Link href="/welcome/parent" className="font-semibold text-emerald-800 underline">
                  family account
                </Link>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>
    </WelcomeBackground>
  );
}
