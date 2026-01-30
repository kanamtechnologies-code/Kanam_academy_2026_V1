"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  LayoutGrid,
  PlayCircle,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

import { HeaderVideo } from "@/components/layout/HeaderVideo";
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
          title={
            <>
              Code Isn’t Watched. <span className="text-[var(--brand)]">It’s Built.</span>
            </>
          }
          subtitle="A quick tour of how lessons work (made for ages 10–14)."
        >
          <div className="grid w-full gap-6 lg:grid-cols-3 lg:items-stretch">
            {/* Left: Hero / vibe */}
            <Card className="kanam-glow-card flex h-full flex-col lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-slate-900">What you’re doing here</CardTitle>
                <CardDescription className="text-slate-700">
                  You learn by <span className="font-semibold">building</span>, not by watching.
                  Tiny projects. Fast feedback. Real progress.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-white/90">
                  <HeaderVideo
                    src="/video/istockphoto-1077299832-640_adpp_is.mp4"
                    playbackRate={0.8}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                    <div className="max-w-[38rem] rounded-2xl border border-white/60 bg-slate-950/55 p-4 text-white shadow-lg">
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                        The Kanam promise
                      </p>
                      <p className="mt-1 text-xl font-black tracking-tight">
                        Code Isn’t Watched. It’s Built.
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/90">
                        You’ll type real Python, run it, and fix it like a real developer.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[var(--accent)]" />
                      <p className="text-sm font-extrabold tracking-tight text-slate-900">Learn</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">Short explanation. No fluff.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-[var(--brand)]" />
                      <p className="text-sm font-extrabold tracking-tight text-slate-900">Build</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">Type code and press Run.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-[var(--accent)]" />
                      <p className="text-sm font-extrabold tracking-tight text-slate-900">Prove</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">Submit + CFU + Bonus.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right: “What happens in a lesson?” */}
            <Card className="kanam-glow-card flex h-full flex-col">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <CardTitle className="text-slate-900">What happens in a lesson</CardTitle>
                    <CardDescription className="text-slate-700">
                      Follow this order and you’ll fly.
                    </CardDescription>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
                    <LayoutGrid className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">Inside the Lesson Hub</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="mt-0.5 inline-block h-5 w-5 rounded-full bg-[var(--accent)]/15 text-center text-xs font-extrabold leading-5 text-slate-900">
                        1
                      </span>
                      <span>
                        Read the <span className="font-semibold text-slate-900">Coach-style explanation</span> (it’s short).
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-0.5 inline-block h-5 w-5 rounded-full bg-[var(--accent)]/15 text-center text-xs font-extrabold leading-5 text-slate-900">
                        2
                      </span>
                      <span>
                        Do <span className="font-semibold text-slate-900">Fill in the blanks</span> first.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-0.5 inline-block h-5 w-5 rounded-full bg-[var(--accent)]/15 text-center text-xs font-extrabold leading-5 text-slate-900">
                        3
                      </span>
                      <span>
                        Press <span className="font-semibold text-slate-900">Run</span> and check your <span className="font-semibold text-slate-900">Console output</span>.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-0.5 inline-block h-5 w-5 rounded-full bg-[var(--accent)]/15 text-center text-xs font-extrabold leading-5 text-slate-900">
                        4
                      </span>
                      <span>
                        Read the <span className="font-semibold text-slate-900">Console explanation</span> if something looks off.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-0.5 inline-block h-5 w-5 rounded-full bg-[var(--accent)]/15 text-center text-xs font-extrabold leading-5 text-slate-900">
                        5
                      </span>
                      <span>
                        Press <span className="font-semibold text-slate-900">Submit</span> to earn Success.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-0.5 inline-block h-5 w-5 rounded-full bg-[var(--accent)]/15 text-center text-xs font-extrabold leading-5 text-slate-900">
                        6
                      </span>
                      <span>
                        Do the <span className="font-semibold text-slate-900">Check for Understanding</span> (bonus progress!).
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-[var(--brand)]/10 via-white/80 to-[var(--accent)]/12 p-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/90 ring-1 ring-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-[var(--brand)]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold tracking-tight text-slate-900">
                        Mistakes are part of it
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        If you get an error, don’t panic. Read the console, change one thing, and run again.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto grid gap-2">
                  <Button
                    className="h-12 w-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                    asChild
                  >
                    <Link href="/dashboard">
                      Go to Dashboard <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    className="h-12 w-full"
                    variant="outline"
                    onClick={() => router.push("/welcome/choose")}
                  >
                    Back to Choose
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom: Quick “what you’ll build” */}
          <Card className="kanam-glow-card mt-6">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <CardTitle className="text-slate-900">What you’ll build</CardTitle>
                  <CardDescription className="text-slate-700">
                    Mini projects that get harder slowly (so you don’t get stuck).
                  </CardDescription>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
                  <PlayCircle className="h-5 w-5 text-[var(--accent)]" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">AI Helper</p>
                  <p className="mt-1 text-sm text-slate-700">
                    Your first program that introduces itself with variables + print.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">Smart Choices Bot</p>
                  <p className="mt-1 text-sm text-slate-700">
                    Ask a question, then respond using if/else.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">Mini Quiz Bot</p>
                  <p className="mt-1 text-sm text-slate-700">
                    Track points with real math: <span className="font-semibold">score = score + 1</span>.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">Looping Chat Bot</p>
                  <p className="mt-1 text-sm text-slate-700">
                    Keep your bot “alive” with a loop (and a quit word).
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">Your upgrades</p>
                  <p className="mt-1 text-sm text-slate-700">
                    Add jokes, secret commands, and your own features.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-[var(--accent)]/12 via-white/80 to-[var(--brand)]/10 p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                    <p className="text-sm font-extrabold tracking-tight text-slate-900">Bonus</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-700">
                    Extra challenges when you’re feeling brave.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Button className="h-12" variant="outline" asChild>
                  <Link href="/how-to">Read the full How-To</Link>
                </Button>
                <Button
                  className="h-12 bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                  asChild
                >
                  <Link href="/dashboard">
                    Go to Dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </WelcomeShell>
      </div>
    </WelcomeBackground>
  );
}

