"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, GraduationCap, Loader2, Mail, Sparkles, UserRound, Zap } from "lucide-react";
import { motion } from "framer-motion";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { WelcomeShell } from "@/components/welcome/WelcomeShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function WelcomePage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loadingNew, setLoadingNew] = React.useState(false);
  const [loadingReturning, setLoadingReturning] = React.useState(false);
  const [returningError, setReturningError] = React.useState<string | null>(null);

  const cardEnter = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 260, damping: 22, delay },
  });

  const glassCardBase =
    "rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out";

  return (
    <WelcomeBackground>
      <div className="flex min-h-[calc(100dvh-160px)] w-full items-center justify-center">
        <WelcomeShell
          containerClassName="mx-auto w-full max-w-[1100px]"
          title={
            <span className="inline-flex items-center gap-4">
              <span>Welcome to Kanam Academy</span>
            </span>
          }
          subtitle="Pick a path. We’ll save your progress and bring you right back where you left off."
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="grid gap-12 md:grid-cols-2">
              {/* New learner (priority) */}
              <motion.div
                {...cardEnter(0.0)}
                whileHover={{ y: -8 }}
                className={[glassCardBase, "p-10"].join(" ")}
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-600">
                  New learner
                </p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  Create your profile
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Set it up once. Then Kanam saves your progress automatically.
                </p>

                <div className="mt-6 grid gap-2 rounded-2xl border border-white/50 bg-white/40 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <UserRound className="h-4 w-4 text-emerald-600" />
                    First + last name
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Mail className="h-4 w-4 text-emerald-600" />
                    Email + password
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <GraduationCap className="h-4 w-4 text-emerald-600" />
                    Grade + school (optional)
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    disabled={loadingNew}
                    aria-busy={loadingNew}
                    className={[
                      "h-16 w-full rounded-xl px-6 text-base font-semibold",
                      "transition-all duration-300 ease-out",
                      "active:scale-95",
                      "bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-300",
                      "text-white shadow-lg shadow-emerald-100 hover:brightness-110",
                      "focus-visible:ring-4 focus-visible:ring-emerald-500/25",
                    ].join(" ")}
                    onClick={() => {
                      setLoadingNew(true);
                      router.push("/welcome/profile");
                    }}
                  >
                    {loadingNew ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading…
                      </>
                    ) : (
                      <>
                        Create profile <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Returning learner */}
              <motion.div
                {...cardEnter(0.1)}
                whileHover={{ y: -8 }}
                className={[glassCardBase, "p-10"].join(" ")}
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-600">
                  Returning learner
                </p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  Sign in fast
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Enter your email and jump right back to your dashboard.
                </p>

                {returningError ? (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
                    {returningError}
                  </div>
                ) : null}

                <div className="mt-6 rounded-2xl border border-white/50 bg-white/40 p-4">
                  <div className="space-y-3">
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='e.g. tory123@kanam.local'
                      type="email"
                      className="h-14 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      type="password"
                      className="h-14 bg-slate-50 text-base focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                    <Button
                      disabled={loadingReturning}
                      aria-busy={loadingReturning}
                      className={[
                        "h-16 w-full rounded-xl px-6 text-base font-semibold",
                        "transition-all duration-300 ease-out",
                        "active:scale-95",
                        "bg-[#E9D5A3] text-amber-950 hover:brightness-110",
                        "shadow-[0_20px_50px_rgba(0,0,0,0.04)]",
                        "focus-visible:ring-4 focus-visible:ring-emerald-500/25",
                      ].join(" ")}
                      onClick={async () => {
                        setReturningError(null);
                        setLoadingReturning(true);
                        try {
                          const supabase = createSupabaseBrowserClient();
                          const { error } = await supabase.auth.signInWithPassword({
                            email: email.trim(),
                            password,
                          });
                          if (error) throw new Error(error.message);

                          const ensureRes = await fetch("/api/auth/ensure-profile", { method: "POST" });
                          const ensureJson = (await ensureRes.json()) as any;
                          if (!ensureRes.ok || !ensureJson?.ok) {
                            throw new Error(
                              ensureJson?.error || "Signed in, but could not load your profile."
                            );
                          }

                          router.push("/dashboard");
                        } catch (e: any) {
                          setReturningError(e?.message ?? "Sign-in failed.");
                        } finally {
                          setLoadingReturning(false);
                        }
                      }}
                    >
                      {loadingReturning ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Loading…
                        </>
                      ) : (
                        <>
                          Returning learner <Zap className="h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </WelcomeShell>
      </div>
    </WelcomeBackground>
  );
}

