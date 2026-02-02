"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { WelcomeShell } from "@/components/welcome/WelcomeShell";
import { WelcomeVideoFader } from "@/components/welcome/WelcomeVideoFader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const USER_NAME_KEY = "kanam.userName";

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

export default function WelcomeReturningPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [animateIn, setAnimateIn] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setAnimateIn(false);
    try {
      const url = new URL(window.location.href);
      const seeded = url.searchParams.get("email");
      if (seeded) setEmail(seeded);
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
          subtitle="Sign in with your email and password."
        >
          <div className="grid w-full gap-6 md:grid-cols-2 md:items-stretch">
            <Card className="kanam-glow-card">
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-1">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                    Returning learner
                  </p>
                  <p className="text-base font-medium text-white/90">
                    Enter your email to continue.
                  </p>
                </div>

                {error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    {error}
                  </div>
                ) : null}

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                      Email
                    </label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='e.g. tory123@kanam.local'
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
                      const { error: signInErr } = await supabase.auth.signInWithPassword({
                        email: email.trim(),
                        password,
                      });
                      if (signInErr) throw new Error(signInErr.message);

                      // Ensure a student profile row exists for this auth user (so we can save progress).
                      const ensureRes = await fetch("/api/auth/ensure-profile", { method: "POST" });
                      const ensureJson = (await ensureRes.json()) as any;
                      if (!ensureRes.ok || !ensureJson?.ok) {
                        throw new Error(
                          ensureJson?.error ||
                            "Signed in, but could not create/load your student profile."
                        );
                      }

                      // Load profile name for greeting (optional)
                      const { data: me } = await supabase.auth.getUser();
                      const userId = me.user?.id;
                      let displayName = loadUserName();
                      if (userId) {
                        const { data: student } = await supabase
                          .from("students")
                          .select("display_name")
                          .eq("user_id", userId)
                          .maybeSingle();
                        const fallback = (student as any)?.display_name as string | undefined;
                        if (fallback) displayName = fallback;
                      }
                      try {
                        saveUserName(displayName);
                      } catch {
                        // ignore
                      }
                      router.push("/dashboard");
                    } catch (e: any) {
                      setError(e?.message ?? "Something went wrong.");
                    }
                  }}
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="h-12 w-full border-white/30 bg-white/10 text-white hover:bg-white/15"
                  onClick={() => router.push("/welcome")}
                >
                  Back
                </Button>
              </CardContent>
            </Card>

            <Card className="kanam-glow-card">
              <CardContent className="pt-6">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
                  <div className="relative aspect-video">
                    <WelcomeVideoFader
                      sources={[
                        "/video/12893579-uhd_2160_3840_24fps.mp4",
                        "/video/5495790-uhd_2560_1080_30fps.mp4",
                        "/video/4497367-uhd_3840_2160_25fps.mp4",
                        "/video/4495343-uhd_3840_2160_25fps.mp4",
                        "/video/8733062-uhd_3840_2160_30fps.mp4",
                      ]}
                      intervalMs={9000}
                      fadeMs={900}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-white/10" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4">
                      <div className="max-w-[34rem] rounded-2xl border border-white/65 bg-slate-950/75 p-5 text-white shadow-xl">
                        <p className="text-xs font-extrabold uppercase tracking-widest text-white/85">
                          Quick reminder
                        </p>
                        <p className="mt-1 text-2xl font-black tracking-tight">
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

