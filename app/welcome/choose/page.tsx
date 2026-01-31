"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { HeaderVideo } from "@/components/layout/HeaderVideo";
import { SpotlightTour } from "@/components/ui/SpotlightTour";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { WelcomeShell } from "@/components/welcome/WelcomeShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const USER_NAME_KEY = "kanam.userName";

function loadUserName(): string {
  try {
    return window.localStorage.getItem(USER_NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export default function WelcomeChoosePage() {
  const router = useRouter();
  const [name, setName] = React.useState<string>("");
  const [ready, setReady] = React.useState<boolean>(false);
  const [animateIn, setAnimateIn] = React.useState(false);

  React.useEffect(() => {
    setName(loadUserName());
    setReady(true);
  }, []);

  React.useEffect(() => {
    setAnimateIn(false);
    const t = window.setTimeout(() => setAnimateIn(true), 10);
    return () => window.clearTimeout(t);
  }, []);

  React.useEffect(() => {
    (async () => {
      if (!ready) return;
      const supabase = createSupabaseBrowserClient();
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/welcome");
        return;
      }
      // Best-effort: load display name from DB for greeting (fallback to localStorage).
      const { data: me } = await supabase.auth.getUser();
      const userId = me.user?.id;
      if (!userId) return;
      const { data: student } = await supabase
        .from("students")
        .select("display_name")
        .eq("user_id", userId)
        .maybeSingle();
      if (student?.display_name) {
        setName(student.display_name);
        try {
          window.localStorage.setItem(USER_NAME_KEY, student.display_name);
        } catch {
          // ignore
        }
      } else {
        // If they're logged in but don't have a student row yet, auto-create it (real app behavior).
        const ensureRes = await fetch("/api/auth/ensure-profile", { method: "POST" });
        const ensureJson = (await ensureRes.json()) as any;
        if (ensureRes.ok && ensureJson?.ok) {
          const nm = String(ensureJson?.student?.display_name ?? "");
          if (nm) {
            setName(nm);
            try {
              window.localStorage.setItem(USER_NAME_KEY, nm);
            } catch {
              // ignore
            }
          }
        }
      }
    })();
  }, [name, ready, router]);

  return (
    <WelcomeBackground>
      <SpotlightTour
        storageKey="kanam_tour_welcome_choose_v1_done"
        remember={false}
        showTooltip={false}
        interactive
        autoCloseMs={1800}
        steps={[
          {
            id: "start-middle",
            selector: '[data-tour="choose-get-started"]',
            title: "Start here 👇",
            body: "This middle column tells you exactly what to do next. Then pick left (Pick up) or right (I’m new).",
            emoji: "👇",
            padding: 14,
          },
        ]}
      />
      <div
        className={[
          "flex min-h-[calc(100dvh-160px)] w-full items-center justify-start px-4 md:px-10",
          "transition-all duration-300 ease-out",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
      >
        <WelcomeShell
          title={
            <>
              Nice to meet you, {name || "friend"}!
            </>
          }
          subtitle="Choose what you want to do next."
        >
          <div className="grid w-full gap-6 lg:grid-cols-3 lg:items-stretch">
            {/* Left: Pick up */}
            <Card className="kanam-glow-card flex h-full flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
                    <Zap className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-slate-900">Pick up</CardTitle>
                    <CardDescription className="text-slate-600">
                      Jump back in where you left off.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-white/90">
                  <Image
                    src="/images/pexels-olia-danilevich-4974916.jpg"
                    alt="Student learning with a laptop"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">
                    Best for you if…
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    You’ve already started lessons before and you just want to continue.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">
                    What you’ll do next
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Open your dashboard and press the big “Next step” button to continue your path.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">
                    What you’ll see on the dashboard
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Your roadmap (completed/next/locked), your XP, and your badges. Look for the big
                    button near the top.
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-center gap-2">
                  <Button
                    onClick={() => router.push("/dashboard")}
                    size="lg"
                    className={[
                      "h-14 px-6 text-base font-extrabold tracking-tight",
                      "rounded-2xl shadow-lg shadow-emerald-700/20",
                      "bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600",
                      "text-emerald-950 hover:brightness-[1.04]",
                      "focus-visible:ring-4 focus-visible:ring-emerald-500/30",
                    ].join(" ")}
                  >
                    Go to Dashboard <Zap className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="h-12" onClick={() => router.push("/welcome")}>
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Middle: Get started */}
            <Card
              data-tour="choose-get-started"
              className="kanam-glow-card flex h-full flex-col"
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
                    <BookOpen className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-slate-900">Get started</CardTitle>
                    <CardDescription className="text-slate-600">
                      A quick “how it works” before you begin.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-white/90">
                  <HeaderVideo
                    src="/video/8499735-hd_1920_1080_30fps.mp4"
                    playbackRate={0.6}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-[var(--accent)]/18 via-white to-[var(--brand)]/12 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-base font-black tracking-tight text-slate-900">
                        Choose your path
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-700">
                        Pick the option that fits you <span className="font-semibold">today</span>.
                        You can always come back and switch later.
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-600">
                      <ArrowLeft className="h-4 w-4 text-[var(--brand)]" />
                      <span>or</span>
                      <ArrowRight className="h-4 w-4 text-[var(--accent)]" />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {/* Continue (green, left-oriented) */}
                    <div className="flex justify-start">
                      <button
                        type="button"
                        onClick={() => router.push("/dashboard")}
                        className={[
                          "group w-full rounded-3xl border border-emerald-700/55 p-6 text-left shadow-xl transition",
                          "bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700",
                          "hover:brightness-[1.04] hover:shadow-2xl hover:-translate-y-0.5",
                          "focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30",
                        ].join(" ")}
                        aria-label="Go to Dashboard"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/30">
                              <Zap className="h-6 w-6 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xl font-black tracking-tight text-white">
                                Go to Dashboard
                              </p>
                              <p className="mt-1 text-sm text-white/90">
                                Continue your path with the{" "}
                                <span className="font-extrabold text-white">Next step</span> button.
                              </p>
                            </div>
                          </div>
                          <ArrowLeft className="h-6 w-6 text-white/90 transition group-hover:text-white" />
                        </div>
                      </button>
                    </div>

                    {/* I'm new here (gold, right-oriented) */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => router.push("/welcome/protocol")}
                        className={[
                          "group w-full rounded-3xl border border-[rgb(var(--accent-rgb)/0.90)] p-6 text-right shadow-xl transition",
                          "bg-gradient-to-r from-[rgb(var(--accent-rgb)/0.98)] via-[rgb(var(--accent-rgb)/0.84)] to-[rgb(var(--accent-rgb)/0.98)]",
                          "hover:brightness-[1.03] hover:shadow-2xl hover:-translate-y-0.5",
                          "focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--accent-rgb)/0.35)]",
                        ].join(" ")}
                        aria-label="I'm new here"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <ArrowRight className="h-6 w-6 text-slate-950/90 transition group-hover:text-slate-950" />
                          <div className="flex items-start gap-3">
                            <div className="min-w-0">
                              <p className="text-xl font-black tracking-tight text-slate-950">
                                I’m new here
                              </p>
                              <p className="mt-1 text-sm text-slate-900/80">
                                Take a quick tour, then come back to your dashboard.
                              </p>
                            </div>
                            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/25 ring-1 ring-white/35">
                              <Sparkles className="h-6 w-6 text-slate-950" />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-auto" />
              </CardContent>
            </Card>

            {/* Right: New here */}
            <Card className="kanam-glow-card flex h-full flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
                    <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-slate-900">I&apos;m new here</CardTitle>
                    <CardDescription className="text-slate-600">
                      Get a quick tour and see what you’ll build.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-white/90">
                  <Image
                    src="/images/pexels-serhatturan-28927920.jpg"
                    alt="Students collaborating while learning"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">
                    Best for you if…
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    You’re brand new, or you want a quick tour before you start.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">
                    What you’ll do next
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Open “Show me around” to see what you’ll build and how the lessons work.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">
                    After the tour
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Come right back and hit <span className="font-semibold">Go to Dashboard</span> in
                    the middle column.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">
                    What you’ll get (fast)
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    A quick tour of the pages, what “Run” does, and how to earn Success + XP without
                    guessing.
                  </p>
                </div>

                <div className="mt-auto grid gap-2">
                  <div className="flex justify-center">
                    <Button
                      onClick={() => router.push("/welcome/protocol")}
                      size="lg"
                      className={[
                        "h-14 px-6 text-base font-extrabold tracking-tight rounded-2xl shadow-lg",
                        "bg-gradient-to-r from-[rgb(var(--accent-rgb)/0.98)] via-[rgb(var(--accent-rgb)/0.88)] to-[rgb(var(--accent-rgb)/0.98)]",
                        "text-slate-950 hover:brightness-[1.03]",
                        "focus-visible:ring-4 focus-visible:ring-[rgb(var(--accent-rgb)/0.35)]",
                      ].join(" ")}
                    >
                      I&apos;m new here <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={() => router.push("/how-to")}
                    variant="outline"
                    className="h-12 w-full"
                  >
                    Read the full How-To
                  </Button>
                  <Button
                    className="h-12 w-full"
                    variant="outline"
                    onClick={() => router.push("/welcome")}
                  >
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </WelcomeShell>
      </div>
    </WelcomeBackground>
  );
}

