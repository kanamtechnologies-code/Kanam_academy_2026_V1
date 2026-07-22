"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { WelcomeShell } from "@/components/welcome/WelcomeShell";
import { WelcomeVideoFader } from "@/components/welcome/WelcomeVideoFader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isInstructorRole, isParentRole, postSignInPath } from "@/lib/roles";

const USER_NAME_KEY = "kanam.userName";
type EnsureProfileResponse = { ok?: boolean; error?: string };
type StudentNameRow = { display_name?: string | null };

function saveUserName(name: string) {
  try {
    window.localStorage.setItem(USER_NAME_KEY, name);
  } catch {
    // ignore
  }
}

function loadUserName(): string {
  try {
    return window.localStorage.getItem(USER_NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export default function WelcomeReturningPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [animateIn, setAnimateIn] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [asParent, setAsParent] = React.useState(false);

  React.useEffect(() => {
    setAnimateIn(false);
    try {
      const url = new URL(window.location.href);
      const seeded = url.searchParams.get("email");
      if (seeded) setEmail(seeded);
      setAsParent(url.searchParams.get("as") === "parent");
    } catch {
      // ignore
    }
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
          title="Welcome back"
          subtitle={
            asParent
              ? "Sign in with your parent email to open the family hub."
              : "Sign in with your email and password — students, parents, and instructors."
          }
        >
          <div className="grid w-full gap-6 md:grid-cols-2 md:items-stretch">
            <Card className="kanam-glow-card">
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-1">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                    {asParent ? "Returning parent" : "Returning account"}
                  </p>
                  <p className="text-base font-medium text-white/90">
                    {asParent
                      ? "Use the same email you used for your family account."
                      : "Enter your email to continue."}
                  </p>
                </div>

                {error ? (
                  <Notice compact variant="danger" role="alert">
                    {error}
                  </Notice>
                ) : null}

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                      {asParent ? "Parent email" : "Email"}
                    </label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={asParent ? "Parent email" : "Email"}
                      type="email"
                      className="h-14 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                      Password
                    </label>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      type="password"
                      className="h-14 border-2 border-white/20 bg-white/90 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/20"
                    />
                  </div>
                </div>

                <Button
                  size="lg"
                  className={[
                    "h-14 w-full rounded-2xl px-6 text-base font-extrabold tracking-tight",
                    "shadow-xl shadow-emerald-700/20",
                    "bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700",
                    "text-white hover:brightness-[1.04]",
                    "focus-visible:ring-4 focus-visible:ring-emerald-500/30",
                  ].join(" ")}
                  disabled={!email.trim() || !password.trim()}
                  onClick={async () => {
                    setError(null);
                    try {
                      const supabase = createSupabaseBrowserClient();
                      if (!supabase) throw new Error("Sign-in is unavailable in demo mode.");
                      const { error: signInErr } = await supabase.auth.signInWithPassword({
                        email: email.trim(),
                        password,
                      });
                      if (signInErr) throw new Error(signInErr.message);

                      const { data: me } = await supabase.auth.getUser();
                      const user = me.user;
                      if (isInstructorRole(user) || isParentRole(user)) {
                        router.push(postSignInPath(user));
                        return;
                      }

                      // Ensure a student profile row exists for this auth user (so we can save progress).
                      const ensureRes = await fetch("/api/auth/ensure-profile", { method: "POST" });
                      const ensureJson = (await ensureRes.json()) as EnsureProfileResponse;
                      if (!ensureRes.ok || !ensureJson?.ok) {
                        throw new Error(
                          ensureJson?.error ||
                            "Signed in, but could not create/load your student profile."
                        );
                      }

                      // Load profile name for greeting (optional)
                      const userId = user?.id;
                      let displayName = loadUserName();
                      if (userId) {
                        const { data: student } = await supabase
                          .from("students")
                          .select("display_name")
                          .eq("user_id", userId)
                          .maybeSingle<StudentNameRow>();
                        const fallback = student?.display_name ?? undefined;
                        if (fallback) displayName = fallback;
                      }
                      try {
                        saveUserName(displayName);
                      } catch {
                        // ignore
                      }
                      router.push(postSignInPath(user));
                    } catch (error: unknown) {
                      setError(errorMessage(error, "Something went wrong."));
                    }
                  }}
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="h-12 w-full border-white/30 bg-white/10 text-white hover:bg-white/15"
                  onClick={() => router.push(asParent ? "/welcome/parent" : "/welcome")}
                >
                  Back
                </Button>

                {asParent ? (
                  <p className="text-center text-sm text-white/85">
                    New family?{" "}
                    <Link
                      href="/welcome/parent"
                      className="font-semibold text-white underline underline-offset-2"
                    >
                      Create a family account
                    </Link>
                  </p>
                ) : (
                  <p className="text-center text-sm text-white/85">
                    Parent returning?{" "}
                    <Link
                      href="/welcome/returning?as=parent"
                      className="font-semibold text-white underline underline-offset-2"
                    >
                      Sign in to the family hub
                    </Link>
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="kanam-glow-card">
              <CardContent className="pt-6">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
                  <div className="relative aspect-video">
                    <WelcomeVideoFader
                      sources={[
                        "/video/12893579-uhd_2160_3840_24fps.mp4",
                        "/video/8499735-hd_1920_1080_30fps.mp4",
                        "/video/4497367-uhd_3840_2160_25fps.mp4",
                        "/video/4495343-uhd_3840_2160_25fps.mp4",
                        "/video/5495790-uhd_2560_1080_30fps.mp4",
                      ]}
                      intervalMs={9000}
                      fadeMs={900}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-white/10" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4">
                      <div className="max-w-[34rem] rounded-2xl border border-white/65 bg-slate-950/75 p-5 text-white shadow-xl">
                        <p className="text-2xl font-black tracking-tight">
                          Real Skills. Real Instructors. Real Results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </WelcomeShell>
      </div>
    </WelcomeBackground>
  );
}

