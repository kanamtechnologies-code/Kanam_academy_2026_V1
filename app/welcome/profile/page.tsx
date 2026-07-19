"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, Loader2, UserRound } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";
import {
  MIN_SELF_SIGNUP_AGE,
  PRIVACY_POLICY_URL,
  clearAgeAttestation,
  hasValidSelfSignupAttestation,
  isYoungerSelfSignupGrade,
  readAgeAttestation,
  validateYoungerGradeParentEmail,
} from "@/lib/coppa/ageGate";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const USER_NAME_KEY = "kanam.userName";
type SignupResponse = { ok?: boolean; error?: string; code?: string };
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
  const [parentEmailConfirm, setParentEmailConfirm] = React.useState("");
  const [parentPhone, setParentPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const youngerGrade = isYoungerSelfSignupGrade(grade);

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

    let storedClass = "";
    try {
      storedClass = window.localStorage.getItem("kanam.classCode") ?? "";
      if (!qpEmail) setEmail(window.localStorage.getItem("kanam.onboardingEmail") ?? "");
    } catch {
      // ignore
    }

    const cc = qpClass || storedClass;
    if (qpClass) setClassCode(qpClass);
    else if (storedClass) setClassCode(storedClass);
    if (qpEmail) setEmail(qpEmail);

    // COPPA: student email signup requires a fresh 13+ age attestation.
    if (!hasValidSelfSignupAttestation()) {
      const params = new URLSearchParams();
      if (cc) params.set("classCode", cc);
      router.replace(`/welcome/age${params.toString() ? `?${params.toString()}` : ""}`);
    }
  }, [router]);

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
    if (!grade) {
      setError("Select your grade.");
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

    const parentCheck = validateYoungerGradeParentEmail({
      grade,
      studentEmail: trimmedEmail,
      parentEmail,
      parentEmailConfirm,
    });
    if (!parentCheck.ok) {
      setError(parentCheck.error);
      return;
    }

    const attestation = readAgeAttestation();
    if (!attestation?.eligibleForSelfSignup || !attestation.birthdate) {
      setError(`Age confirmation expired. Confirm you are ${MIN_SELF_SIGNUP_AGE}+ to continue.`);
      const params = new URLSearchParams();
      if (cc) params.set("classCode", cc);
      router.replace(`/welcome/age${params.toString() ? `?${params.toString()}` : ""}`);
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
          birthdate: attestation.birthdate,
          grade,
          schoolName: schoolName.trim() || undefined,
          parentName: parentName.trim() || undefined,
          parentEmail: parentEmail.trim() || undefined,
          parentEmailConfirm: youngerGrade ? parentEmailConfirm.trim() || undefined : undefined,
          parentPhone: parentPhone.trim() || undefined,
        }),
      });
      const json = (await res.json()) as SignupResponse;
      if (!res.ok || !json?.ok) {
        if (json?.code === "UNDER_13_PARENT_REQUIRED") {
          clearAgeAttestation();
          router.replace("/welcome/parent?reason=under13");
          return;
        }
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
      clearAgeAttestation();

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
        <div className="rounded-3xl border border-white/50 bg-white/85 p-6 shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-slate-900/90 sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
            Student account
          </p>
          <h1 className="mt-3 flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
            <UserRound className="h-6 w-6 text-emerald-700" />
            Finish your signup
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            You confirmed you are {MIN_SELF_SIGNUP_AGE}+. Create your email login for school or
            self-paced learning. Progress and XP save to this profile. Under {MIN_SELF_SIGNUP_AGE}?
            Use a{" "}
            <Link
              href="/welcome/parent?reason=under13"
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
                Grade <span className="text-emerald-700">*</span>
              </label>
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

            {youngerGrade ? (
              <Notice compact variant="info" role="status">
                Grades 5–6 often include learners under {MIN_SELF_SIGNUP_AGE}. If that&apos;s you,
                please use a{" "}
                <Link
                  href="/welcome/parent?reason=under13"
                  className="font-semibold underline underline-offset-2"
                >
                  family account
                </Link>{" "}
                instead. Continuing with a student login requires a parent/guardian email below.
              </Notice>
            ) : null}

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

            {youngerGrade ? (
              <div className="grid gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4">
                <p className="text-sm font-extrabold text-slate-900">
                  Parent / guardian email <span className="text-emerald-700">*</span>
                </p>
                <p className="text-xs text-slate-600">
                  Required for grades 5–6. This is contact only — it does not create a parent login.
                  Use a different address from the student email above.
                </p>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Guardian email</label>
                  <Input
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    type="email"
                    placeholder="parent@email.com"
                    className="h-11 bg-white"
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">
                    Confirm guardian email
                  </label>
                  <Input
                    value={parentEmailConfirm}
                    onChange={(e) => setParentEmailConfirm(e.target.value)}
                    type="email"
                    placeholder="Type it again"
                    className="h-11 bg-white"
                    autoComplete="email"
                  />
                </div>
              </div>
            ) : null}

            <button
              type="button"
              className="mt-1 flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50"
              onClick={() => setShowOptional((v) => !v)}
              aria-expanded={showOptional}
            >
              <span>Optional details (school, guardian contact)</span>
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
                  These map to your student profile. Guardian fields are contact only — they do not
                  create a parent login.
                </p>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">School</label>
                  <Input
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="School name"
                    className="h-11 bg-white"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Guardian name"
                    className="h-11 bg-white"
                  />
                  {!youngerGrade ? (
                    <Input
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      type="email"
                      placeholder="Guardian email"
                      className="h-11 bg-white"
                    />
                  ) : null}
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
              onClick={() => {
                const params = new URLSearchParams();
                if (classCode.trim()) params.set("classCode", classCode.trim());
                router.push(`/welcome/age${params.toString() ? `?${params.toString()}` : ""}`);
              }}
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
            <p className="mt-3 text-xs text-slate-500">
              By creating an account you agree to our{" "}
              <a
                href={PRIVACY_POLICY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-800 underline underline-offset-2"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </WelcomeBackground>
  );
}
