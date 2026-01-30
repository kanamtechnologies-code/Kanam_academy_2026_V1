"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { WelcomeShell } from "@/components/welcome/WelcomeShell";
import { WelcomeVideoFader } from "@/components/welcome/WelcomeVideoFader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WelcomePage() {
  const router = useRouter();
  const [animateIn, setAnimateIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    setAnimateIn(false);
    const t = window.setTimeout(() => setAnimateIn(true), 10);
    return () => window.clearTimeout(t);
  }, []);

  // TODO: Check if user has a saved progress index.

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
              Welcome to Kanam Academy
            </>
          }
          subtitle="Choose your path: new learner setup or returning learner."
        >
          <div className="grid w-full gap-6 lg:grid-cols-3 lg:items-stretch">
            {/* Left: New learner */}
            <Card className="kanam-glow-card flex h-full flex-col">
              <CardHeader>
                <CardTitle className="text-white">I’m new here</CardTitle>
                <CardDescription className="text-white/90">
                  Create your profile once, then your progress saves automatically.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white/90">
                  <p className="text-sm font-extrabold text-white">You’ll set up:</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    <li>Your name + grade</li>
                    <li>School (optional)</li>
                    <li>Parent/guardian info (optional)</li>
                  </ul>
                </div>
                <div className="mt-auto">
                  <Button
                    size="lg"
                    className={[
                      "h-14 w-full rounded-2xl px-6 text-base font-extrabold tracking-tight",
                      "shadow-xl shadow-emerald-900/25",
                      "bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700",
                      "text-white hover:brightness-[1.04]",
                      "focus-visible:ring-4 focus-visible:ring-white/20",
                    ].join(" ")}
                    onClick={() => router.push("/welcome/profile")}
                  >
                    Create profile <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Middle: Video */}
            <Card className="kanam-glow-card flex h-full flex-col">
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
                          Kanam Academy
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

            {/* Right: Returning learner */}
            <Card className="kanam-glow-card flex h-full flex-col">
              <CardHeader>
                <CardTitle className="text-white">I’m returning</CardTitle>
                <CardDescription className="text-white/90">
                  Already used Kanam on this device? Jump back in.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white/90">
                  <p className="text-sm font-extrabold text-white">Fast path:</p>
                  <p className="mt-1 text-sm">
                    Enter your name and continue where you left off.
                  </p>
                </div>
                <div className="mt-auto">
                  <Button
                    size="lg"
                    className={[
                      "h-14 w-full rounded-2xl px-6 text-base font-extrabold tracking-tight",
                      "shadow-xl shadow-amber-900/25",
                      "bg-gradient-to-r from-[rgb(var(--accent-rgb)/0.98)] via-[rgb(var(--accent-rgb)/0.84)] to-[rgb(var(--accent-rgb)/0.98)]",
                      "text-slate-950 hover:brightness-[1.03]",
                      "focus-visible:ring-4 focus-visible:ring-white/20",
                    ].join(" ")}
                    onClick={() => router.push("/welcome/returning")}
                  >
                    Returning learner <Zap className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="mt-2 h-12 w-full border-white/30 bg-white/10 text-white hover:bg-white/15"
                    onClick={() => router.push("/welcome/choose")}
                  >
                    Skip (if you already set your name) <Sparkles className="h-4 w-4" />
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

