"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, IdCard, School, UserRound } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { WelcomeShell } from "@/components/welcome/WelcomeShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const USER_NAME_KEY = "kanam.userName";

const GRADES = ["5", "6", "7", "8", "9", "10", "11", "12", "Other"] as const;

export default function WelcomeProfilePage() {
  const router = useRouter();
  const [animateIn, setAnimateIn] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [grade, setGrade] = React.useState<string>("");
  const [schoolName, setSchoolName] = React.useState("");
  const [parentName, setParentName] = React.useState("");
  const [parentEmail, setParentEmail] = React.useState("");
  const [parentPhone, setParentPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  React.useEffect(() => {
    setAnimateIn(false);
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
          title="Create your student profile"
          subtitle="This helps Kanam save your progress and keep you on the right path."
        >
          <div className="grid w-full gap-6 lg:grid-cols-3 lg:items-stretch">
            <Card className="kanam-glow-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <IdCard className="h-5 w-5 text-white/95" />
                  Profile details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    {error}
                  </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                      First name
                    </label>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="h-14 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/25"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                      Last name
                    </label>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="h-14 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/25"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                      Email address
                    </label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='e.g. tory123@kanam.local'
                      type="email"
                      className="h-14 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/25"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                      Grade (optional)
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="h-14 w-full rounded-xl border-2 border-white/20 bg-white/90 px-3 text-base font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-white/20"
                    >
                      <option value="">Choose…</option>
                      {GRADES.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                      Password
                    </label>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Choose a password"
                      type="password"
                      className="h-14 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/25"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                      Confirm password
                    </label>
                    <Input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Type it again"
                      type="password"
                      className="h-14 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/25"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                    School (optional)
                  </label>
                  <Input
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Your school name"
                    className="h-14 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/25"
                  />
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <div className="flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-white/90" />
                    <p className="text-sm font-extrabold tracking-tight text-white">
                      Parent / Guardian (optional)
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-white/85">
                    If you want progress emails later, you can add this now (or skip).
                  </p>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Input
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Parent name"
                      className="h-12 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/25"
                    />
                    <Input
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="Parent email"
                      className="h-12 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/25"
                    />
                    <Input
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="Parent phone"
                      className="h-12 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/25 sm:col-span-2"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    variant="outline"
                    className="h-12 border-white/30 bg-white/10 text-white hover:bg-white/15"
                    onClick={() => router.push("/welcome")}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    disabled={saving || !firstName.trim() || !lastName.trim() || !email.trim()}
                    className={[
                      "h-14 rounded-2xl px-7 text-base font-extrabold tracking-tight",
                      "shadow-xl shadow-emerald-900/25",
                      "bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700",
                      "text-white hover:brightness-[1.04]",
                      "focus-visible:ring-4 focus-visible:ring-white/20",
                    ].join(" ")}
                    onClick={async () => {
                      setError(null);
                      const trimmedFirst = firstName.trim();
                      const trimmedLast = lastName.trim();
                      const trimmedEmail = email.trim();
                      if (!trimmedFirst) {
                        setError("Please enter your first name.");
                        return;
                      }
                      if (!trimmedLast) {
                        setError("Please enter your last name.");
                        return;
                      }
                      if (!trimmedEmail || !trimmedEmail.includes("@")) {
                        setError("Please enter a valid email address.");
                        return;
                      }
                      if (!password || password.length < 4) {
                        setError("Password must be at least 4 characters.");
                        return;
                      }
                      if (password !== confirmPassword) {
                        setError("Passwords do not match.");
                        return;
                      }
                      setSaving(true);
                      try {
                        const supabase = createSupabaseBrowserClient();
                        // Create user server-side (auto-confirm; avoids Supabase email rate limits),
                        // then sign in normally to establish a real session in the browser.
                        const res = await fetch("/api/auth/signup", {
                          method: "POST",
                          headers: { "content-type": "application/json" },
                          body: JSON.stringify({
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
                        const json = (await res.json()) as any;
                        if (!res.ok || !json?.ok) {
                          throw new Error(json?.error || "Could not create account.");
                        }

                        const { error: signInErr } = await supabase.auth.signInWithPassword({
                          email: trimmedEmail,
                          password,
                        });
                        if (signInErr) throw new Error(signInErr.message);

                        // Ensure profile exists (creates minimal row if needed).
                        const ensureRes = await fetch("/api/auth/ensure-profile", { method: "POST" });
                        const ensureJson = (await ensureRes.json()) as any;
                        if (!ensureRes.ok || !ensureJson?.ok) {
                          throw new Error(
                            ensureJson?.error ||
                              "Account created, but could not create/load your student profile."
                          );
                        }

                        try {
                          // App greets by first name only
                          window.localStorage.setItem(USER_NAME_KEY, trimmedFirst);
                        } catch {
                          // ignore
                        }
                        router.push("/dashboard");
                      } catch (e: any) {
                        setError(e?.message ?? "Something went wrong.");
                      } finally {
                        setSaving(false);
                      }
                    }}
                  >
                    Create profile <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="kanam-glow-card flex h-full flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <School className="h-5 w-5 text-white/95" />
                  What this does
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white/90">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-white">Saves your progress</p>
                  <p className="mt-1 text-sm">
                    Your wins, your streak, and where you left off can follow you.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-white">Keeps things organized</p>
                  <p className="mt-1 text-sm">
                    If you join a school later, we can link your account to your class.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-white">You can skip extras</p>
                  <p className="mt-1 text-sm">
                    Parent info is optional right now. You can add it later.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </WelcomeShell>
      </div>
    </WelcomeBackground>
  );
}

