"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarDays, Loader2, ShieldCheck } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";
import { NoticePresence } from "@/components/ui/notice-presence";
import {
  MIN_SELF_SIGNUP_AGE,
  PRIVACY_POLICY_URL,
  buildAgeAttestation,
  clearAgeAttestation,
  maxBirthdateForMinAge,
  writeAgeAttestation,
} from "@/lib/coppa/ageGate";

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export default function WelcomeAgeGatePage() {
  const router = useRouter();
  const [birthdate, setBirthdate] = React.useState("");
  const [classCode, setClassCode] = React.useState("");
  const [selfPaced, setSelfPaced] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let qpClass = "";
    let qpSelfPaced = false;
    try {
      const sp = new URLSearchParams(window.location.search);
      qpClass = (sp.get("classCode") ?? "").trim();
      qpSelfPaced = sp.get("selfPaced") === "1";
    } catch {
      // ignore
    }
    if (qpSelfPaced) {
      setSelfPaced(true);
      setClassCode("");
      return;
    }
    if (qpClass) {
      setClassCode(qpClass);
      setSelfPaced(false);
      return;
    }
    try {
      if (window.localStorage.getItem("kanam.selfPaced") === "1") {
        setSelfPaced(true);
        setClassCode("");
        return;
      }
      setClassCode(window.localStorage.getItem("kanam.classCode") ?? "");
    } catch {
      // ignore
    }
  }, []);

  const maxBirthdate = maxBirthdateForMinAge(MIN_SELF_SIGNUP_AGE);

  const onContinue = () => {
    setError(null);
    const cc = classCode.trim();
    if (!selfPaced && !cc) {
      setError("A class code is required. Go back and enter your teacher code, or choose self-paced.");
      return;
    }
    if (!birthdate) {
      setError("Enter your date of birth to continue.");
      return;
    }

    setLoading(true);
    try {
      const attestation = buildAgeAttestation(birthdate);
      if (!attestation) {
        setError("Enter a valid date of birth.");
        setLoading(false);
        return;
      }

      try {
        if (selfPaced) {
          window.localStorage.setItem("kanam.selfPaced", "1");
          window.localStorage.removeItem("kanam.classCode");
        } else {
          window.localStorage.setItem("kanam.classCode", cc);
          window.localStorage.removeItem("kanam.selfPaced");
        }
      } catch {
        // ignore
      }

      if (!attestation.eligibleForSelfSignup) {
        // Under 13: no student email account — explain, then hand off to parent.
        clearAgeAttestation();
        try {
          window.localStorage.removeItem("kanam.onboardingEmail");
        } catch {
          // ignore
        }
        const params = new URLSearchParams();
        if (!selfPaced && cc) params.set("classCode", cc);
        router.push(
          `/welcome/ask-parent${params.toString() ? `?${params.toString()}` : ""}`
        );
        return;
      }

      writeAgeAttestation(attestation);
      const params = new URLSearchParams();
      if (selfPaced) params.set("selfPaced", "1");
      else params.set("classCode", cc);
      router.push(`/welcome/profile?${params.toString()}`);
    } catch (e: unknown) {
      setError(errorMessage(e, "Something went wrong."));
      setLoading(false);
    }
  };

  return (
    <WelcomeBackground>
      <div className="mx-auto flex min-h-[calc(100dvh-var(--kanam-header-height,4.75rem))] w-full max-w-lg flex-col justify-center px-4 py-10">
        <div className="rounded-3xl border border-white/50 bg-white/85 p-6 shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-slate-900/90 sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
            Age check
          </p>
          <h1 className="mt-3 flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
            <ShieldCheck className="h-6 w-6 text-emerald-700" />
            Before we continue
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            U.S. law requires us to confirm age before creating a student email login. If you are
            under {MIN_SELF_SIGNUP_AGE}, we&apos;ll ask a parent or guardian to create a{" "}
            <Link
              href="/welcome/ask-parent"
              className="font-semibold text-emerald-800 underline underline-offset-2"
            >
              family account
            </Link>{" "}
            instead.
          </p>

          <NoticePresence show={Boolean(error)} contentKey={error} className="mt-4">
            <Notice compact variant="danger" role="alert">
              {error}
            </Notice>
          </NoticePresence>

          <div className="mt-6 grid gap-3">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CalendarDays className="h-4 w-4 text-emerald-600" />
                Date of birth <span className="text-emerald-700">*</span>
              </label>
              <Input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                max={new Date().toISOString().slice(0, 10)}
                className="h-11"
                autoComplete="bday"
              />
              <p className="text-xs text-slate-500">
                We use this only to check eligibility. Self-signup requires being born on or
                before {maxBirthdate} (age {MIN_SELF_SIGNUP_AGE}+).
              </p>
            </div>

            {selfPaced ? (
              <p className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-xs text-slate-700">
                Path: <span className="font-semibold">Self-paced learning</span> (no class code
                needed)
              </p>
            ) : classCode ? (
              <p className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-600">
                Class code: <span className="font-semibold text-slate-800">{classCode}</span>
              </p>
            ) : null}
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="h-12 sm:w-auto"
              onClick={() => router.push("/welcome")}
              disabled={loading}
            >
              Back
            </Button>
            <Button
              type="button"
              disabled={loading}
              aria-busy={loading}
              className="h-12 flex-1 text-base font-semibold"
              onClick={onContinue}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Checking…
                </>
              ) : (
                <>
                  Continue <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
            By continuing you confirm this date is accurate. Read our{" "}
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
    </WelcomeBackground>
  );
}
