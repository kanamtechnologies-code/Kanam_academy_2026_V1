"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Users } from "lucide-react";

import {
  ParentalConsentFields,
  type ParentalConsentFieldValues,
} from "@/components/parent/ParentalConsentFields";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";
import { MIN_SELF_SIGNUP_AGE, PRIVACY_POLICY_URL } from "@/lib/coppa/ageGate";
import { PARENTAL_CONSENT_NOTICE_VERSION } from "@/lib/coppa/parentalConsent";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export default function WelcomeParentPage() {
  const router = useRouter();
  const [parentName, setParentName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [householdName, setHouseholdName] = React.useState("");
  const [childFirstName, setChildFirstName] = React.useState("");
  const [childLastName, setChildLastName] = React.useState("");
  const [childGrade, setChildGrade] = React.useState("");
  const [childPin, setChildPin] = React.useState("");
  const [consent, setConsent] = React.useState<ParentalConsentFieldValues>({
    consentIsParent: false,
    consentAccepted: false,
    consentSignature: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fromUnder13, setFromUnder13] = React.useState(false);

  React.useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const reason = (sp.get("reason") ?? "").trim().toLowerCase();
      const under13 = sp.get("under13") === "1" || reason === "under13";
      setFromUnder13(under13);
      if (under13) {
        // Do not carry a child's email into the parent signup form.
        window.localStorage.removeItem("kanam.onboardingEmail");
      }
    } catch {
      // ignore
    }
  }, []);

  const onSubmit = async () => {
    setError(null);
    const em = email.trim().toLowerCase();
    if (!parentName.trim()) {
      setError("Enter your name.");
      return;
    }
    if (!em || !em.includes("@")) {
      setError("Enter a valid email.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    if (childPin && !/^\d{4,6}$/.test(childPin.trim())) {
      setError("Child PIN must be 4–6 digits (or leave blank).");
      return;
    }
    if (!consent.consentIsParent || !consent.consentAccepted) {
      setError("Complete the parental consent checkboxes to continue.");
      return;
    }
    if (consent.consentSignature.trim().toLowerCase() !== parentName.trim().toLowerCase()) {
      setError("Type your full name exactly as entered above to sign the consent form.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup-parent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: em,
          password,
          parentName: parentName.trim(),
          householdName: householdName.trim() || undefined,
          childFirstName: childFirstName.trim() || undefined,
          childLastName: childLastName.trim() || undefined,
          childGrade: childGrade.trim() || undefined,
          childPin: childPin.trim() || undefined,
          consentAccepted: consent.consentAccepted,
          consentIsParent: consent.consentIsParent,
          consentSignature: consent.consentSignature.trim(),
          consentNoticeVersion: PARENTAL_CONSENT_NOTICE_VERSION,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Could not create family account.");
      }

      const supabase = createSupabaseBrowserClient();
      if (!supabase) throw new Error("Sign-in is unavailable.");
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: em,
        password,
      });
      if (signInErr) throw new Error(signInErr.message);

      router.push("/parent");
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not create family account."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <WelcomeBackground>
      <div className="mx-auto flex min-h-[calc(100dvh-var(--kanam-header-height,4.75rem))] w-full max-w-lg flex-col justify-center px-4 py-10">
        <div className="rounded-3xl border border-white/50 bg-white/85 p-6 shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-slate-900/90 sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
            Family account
          </p>
          <h1 className="mt-3 flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
            <Users className="h-6 w-6 text-emerald-700" />
            I&apos;m a parent
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            One parent login. Add kid profiles with optional PINs. Billing stays on your
            account; your Family plan unlocks learning for every child.
          </p>

          <div className="mt-4 rounded-2xl border border-[rgb(var(--brand-rgb)/0.25)] bg-[rgb(var(--brand-rgb)/0.06)] px-4 py-3">
            <p className="text-sm font-bold text-slate-900">Already have a family account?</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Sign in with your parent email to open the parent hub — pick a child, manage PINs, or
              open billing.
            </p>
            <Button asChild variant="outline" className="mt-3 h-10 w-full rounded-xl font-semibold">
              <Link href="/welcome/returning?as=parent">Sign in as a returning parent</Link>
            </Button>
          </div>

          {fromUnder13 ? (
            <div className="mt-4">
              <Notice compact variant="info" role="status">
                Because this learner is under {MIN_SELF_SIGNUP_AGE}, create a family account with
                your (parent/guardian) email. Kids under {MIN_SELF_SIGNUP_AGE} cannot create their
                own student login.
              </Notice>
            </div>
          ) : null}

          {error ? (
            <div className="mt-4">
              <Notice compact variant="danger" role="alert">
                {error}
              </Notice>
            </div>
          ) : null}

          <div className="mt-6 grid gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Your name</label>
              <Input
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Jordan Lee"
                className="h-11"
                autoComplete="name"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@email.com"
                className="h-11"
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="At least 4 characters"
                className="h-11"
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">
                Family name <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <Input
                value={householdName}
                onChange={(e) => setHouseholdName(e.target.value)}
                placeholder="e.g. The Lee family"
                className="h-11"
              />
            </div>

            <div className="mt-2 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
              <p className="text-sm font-extrabold text-slate-900">First child (optional)</p>
              <p className="mt-1 text-xs text-slate-600">
                You can add more kids from the parent hub after signup. Consent below is required
                before any child profile is created.
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Input
                  value={childFirstName}
                  onChange={(e) => setChildFirstName(e.target.value)}
                  placeholder="First name"
                  className="h-11 bg-white"
                />
                <Input
                  value={childLastName}
                  onChange={(e) => setChildLastName(e.target.value)}
                  placeholder="Last name"
                  className="h-11 bg-white"
                />
                <Input
                  value={childGrade}
                  onChange={(e) => setChildGrade(e.target.value)}
                  placeholder="Grade (optional)"
                  className="h-11 bg-white"
                />
                <Input
                  value={childPin}
                  onChange={(e) => setChildPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="PIN 4–6 digits"
                  inputMode="numeric"
                  className="h-11 bg-white"
                />
              </div>
            </div>

            <ParentalConsentFields
              values={consent}
              onChange={setConsent}
              disabled={loading}
            />
          </div>

          <Button
            disabled={loading}
            aria-busy={loading}
            className="mt-6 h-12 w-full text-base font-semibold"
            onClick={onSubmit}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating…
              </>
            ) : (
              <>
                Create family account <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          <p className="mt-4 text-center text-sm text-slate-600">
            Returning parent?{" "}
            <Link
              href="/welcome/returning?as=parent"
              className="font-semibold text-emerald-800 underline"
            >
              Sign in
            </Link>
            {" · "}
            <Link href="/welcome" className="font-semibold text-emerald-800 underline">
              Student signup
            </Link>
          </p>
          <p className="mt-3 text-center text-xs text-slate-500">
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
    </WelcomeBackground>
  );
}
