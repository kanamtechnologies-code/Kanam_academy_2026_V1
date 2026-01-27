"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, Terminal, Zap } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { WelcomeShell } from "@/components/welcome/WelcomeShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const USER_NAME_KEY = "kanam.userName";

function loadUserName(): string {
  try {
    return window.localStorage.getItem(USER_NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export default function WelcomeProtocolPage() {
  const router = useRouter();
  const [animateIn, setAnimateIn] = React.useState(false);
  const [name, setName] = React.useState("");
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setName(loadUserName());
    setReady(true);
    setAnimateIn(false);
    const t = window.setTimeout(() => setAnimateIn(true), 10);
    return () => window.clearTimeout(t);
  }, []);

  React.useEffect(() => {
    if (ready && !name) router.replace("/welcome");
  }, [name, ready, router]);

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
          title="How Kanam works (the simple version)"
          subtitle="You’re not here to memorize — you’re here to build real stuff."
        >
          <Card className="border-slate-200 bg-white/85 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Timeline (horizontal) */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">The flow</p>
                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-[var(--accent)]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-700">
                          Step 1
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        Get the idea
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Learn the “why” in plain English
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-[var(--accent)]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-700">
                          Step 2
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        Build it
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Write Python and see it run
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-[var(--accent)]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-700">
                          Step 3
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        Prove it
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Quick quiz + challenges
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual assets */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                    Spots you can fill later
                  </p>
                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-3">
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-100">
                        <video
                          className="h-full w-full object-cover opacity-70"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        >
                          <source
                            src="/video/istockphoto-1077299832-640_adpp_is.mp4"
                            type="video/mp4"
                          />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/10" />
                      </div>
                    </div>
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-3">
                      <div className="aspect-video rounded-lg bg-slate-100" />
                    </div>
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-3">
                      <div className="aspect-video rounded-lg bg-slate-100" />
                    </div>
                  </div>
                </div>

                {/* Module Overviews */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                    The 3 parts (teen-friendly)
                  </p>

                  <div className="mt-3 grid gap-4 lg:grid-cols-3">
                    {/* Stage 01 */}
                    <Card
                      className={[
                        "border-slate-200 bg-white/80 backdrop-blur-sm",
                        "transition-all duration-500 ease-out",
                        animateIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6",
                      ].join(" ")}
                      style={{ transitionDelay: "40ms" }}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-[var(--accent)]" />
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-700">
                              Step 1
                            </p>
                            <h3 className="text-lg font-semibold text-slate-900">
                              Understand it
                            </h3>
                          </div>
                        </div>
                        <p className="mt-3 leading-relaxed text-slate-700">
                          We explain the idea first, so you’re not just copying code.
                          You’ll learn what variables and logic actually mean (in normal
                          words), then you’ll use that idea right away.
                        </p>
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                          <li>Think in “boxes” (variables)</li>
                          <li>Think in “choices” (if/elif/else)</li>
                          <li>Understand what the code is doing</li>
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Stage 02 */}
                    <Card
                      className={[
                        "border-slate-200 bg-white/80 backdrop-blur-sm",
                        "transition-all duration-500 ease-out",
                        animateIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6",
                      ].join(" ")}
                      style={{ transitionDelay: "140ms" }}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-5 w-5 text-[var(--accent)]" />
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-700">
                              Step 2
                            </p>
                            <h3 className="text-lg font-semibold text-slate-900">
                              Build it
                            </h3>
                          </div>
                        </div>
                        <p className="mt-3 leading-relaxed text-slate-700">
                          You’ll type real Python in the editor and press Run to see the
                          output instantly. Mess up? That’s good — we’ll show you how to
                          debug and fix it.
                        </p>
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                          <li>Write code</li>
                          <li>Run it</li>
                          <li>Fix errors like a real developer</li>
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Stage 03 */}
                    <Card
                      className={[
                        "border-slate-200 bg-white/80 backdrop-blur-sm",
                        "transition-all duration-500 ease-out",
                        animateIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6",
                      ].join(" ")}
                      style={{ transitionDelay: "240ms" }}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-[var(--accent)]" />
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-700">
                              Step 3
                            </p>
                            <h3 className="text-lg font-semibold text-slate-900">
                              Prove it
                            </h3>
                          </div>
                        </div>
                        <p className="mt-3 leading-relaxed text-slate-700">
                          After you build it, you’ll do a quick check to prove you really
                          get it. Then you’ll try challenges that level you up.
                        </p>
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                          <li>CFU = quick quiz</li>
                          <li>Try This = extra challenges</li>
                          <li>Earn XP + badges</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Start protocol */}
              <div className="mt-8">
                <Card className="border-slate-200 bg-white/85 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Ready to start?</CardTitle>
                    <CardDescription className="text-slate-600">
                      Start with Lesson 1 — you’ll build a tiny AI helper in minutes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">What you’ll make:</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        <li>A bot that introduces itself</li>
                        <li>A bot that makes choices</li>
                        <li>A mood coach bot</li>
                        <li>A quiz bot with a score</li>
                        <li>A chat bot that stays “on” in a loop</li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        className="h-12 bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                        asChild
                      >
                        <Link href="/learn/1">
                          Start Lesson 1: My First AI Helper
                        </Link>
                      </Button>
                      <Button className="h-12" variant="outline" onClick={() => router.push("/welcome/choose")}>
                        Back
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </WelcomeShell>
      </div>
    </WelcomeBackground>
  );
}

