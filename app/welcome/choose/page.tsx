"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Image as ImageIcon, ShieldCheck, Sparkles, Zap } from "lucide-react";

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
    // If they haven't provided a name yet, send them back to greeting.
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
              Nice to meet you, {name || "friend"}!
            </>
          }
          subtitle="Choose what you want to do next — and here’s a quick preview of how Kanam works."
        >
          <div className="grid w-full gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            {/* Left: Info + placeholders */}
            <Card className="border-slate-200 bg-white/85 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">Student Snapshot</CardTitle>
                <CardDescription className="text-slate-600">
                  A quick “at a glance” panel — plus space for images.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-slate-200 bg-white/70 p-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                      Student
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{name || "Friend"}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white/70 p-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                      Track
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      AI + Python Starter Pack
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white/70 p-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                      Time
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">~60 minutes</p>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white/70 p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[var(--accent)]" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                      What happens in a lesson
                    </p>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    <li>
                      <span className="font-semibold text-slate-900">Learn:</span> read the Coach’s Note
                      + Quick Explainer.
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">Code:</span> type Python in the big
                      editor, then press Run.
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">Level Up:</span> pass the CFU quiz
                      and earn XP + badges.
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                      Safety reminder
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-slate-700">
                    Never share your real address, passwords, or private info with a bot. If something
                    feels weird, tell a trusted adult.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                      Image slots (placeholders)
                    </p>
                    <p className="text-xs text-slate-500">Drop screenshots/graphics later</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/50 p-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <ImageIcon className="h-4 w-4" />
                        <p className="text-xs font-semibold uppercase tracking-widest">
                          Add image
                        </p>
                      </div>
                      <div className="mt-2 aspect-video rounded-lg bg-slate-100" />
                      <p className="mt-2 text-xs text-slate-500">Lesson screenshot / “boxes” diagram</p>
                    </div>
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/50 p-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <ImageIcon className="h-4 w-4" />
                        <p className="text-xs font-semibold uppercase tracking-widest">
                          Add image
                        </p>
                      </div>
                      <div className="mt-2 aspect-video rounded-lg bg-slate-100" />
                      <p className="mt-2 text-xs text-slate-500">Badges / roadmap / mascot art</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right: the two main choice cards */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-slate-200 bg-white/85 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <span aria-hidden>⚡️</span> Pick up where I left off
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Go straight back to your active lesson.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                    onClick={() => router.push("/")}
                  >
                    Jump In <Zap className="h-4 w-4" />
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => router.push("/welcome")}
                  >
                    Back
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white/85 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <span aria-hidden>👋</span> I&apos;m new here!
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    See how Kanam works and get a quick tour.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                    onClick={() => router.push("/welcome/protocol")}
                  >
                    Show Me Around <Sparkles className="h-4 w-4" />
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => router.push("/welcome")}
                  >
                    Back
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </WelcomeShell>
      </div>
    </WelcomeBackground>
  );
}

