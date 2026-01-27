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
          title="The Kanam Development Framework"
          subtitle="A three-stage pedagogical approach designed to bridge the gap between abstract logic and functional Python engineering."
        >
          <Card className="border-slate-200 bg-white/85 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Timeline (horizontal) */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                    Protocol Timeline
                  </p>
                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-[var(--accent)]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-700">
                          Stage 01
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        Conceptual Architecture
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Mental model mapping
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-[var(--accent)]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-700">
                          Stage 02
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        Integrated Execution
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Code + console
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-[var(--accent)]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-700">
                          Stage 03
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        Logic Validation
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        CFU + challenges
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual assets */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                    Visual Assets (placeholders)
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
                        <div className="absolute bottom-2 left-2 rounded-full bg-white/75 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-900">
                          Orientation Reel
                        </div>
                      </div>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-700">
                        Add Image / Video
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Concept diagram / “Boxes”
                      </p>
                    </div>
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-3">
                      <div className="aspect-video rounded-lg bg-slate-100" />
                      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-700">
                        Add Image
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Terminal / output screenshot
                      </p>
                    </div>
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-3">
                      <div className="aspect-video rounded-lg bg-slate-100" />
                      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-700">
                        Add Image
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Badges / reward graphic
                      </p>
                    </div>
                  </div>
                </div>

                {/* Module Overviews */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                    Module Overviews
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
                              Stage 01
                            </p>
                            <h3 className="text-lg font-semibold text-slate-900">
                              Phase 1: Mental Model Mapping
                            </h3>
                          </div>
                        </div>
                        <p className="mt-3 leading-relaxed text-slate-700">
                          Before writing a single line of syntax, we establish the “why.”
                          Every lesson begins with a high-level conceptual breakdown. You
                          will learn to visualize variables as memory-allocation units
                          (Boxes) and logic gates as decision-making trees. We prioritize
                          understanding the architecture of AI over rote memorization of
                          commands.
                        </p>
                        <p className="mt-3 text-sm font-semibold text-slate-900">
                          Technical Focus:
                          <span className="font-normal text-slate-700">
                            {" "}
                            Memory Persistence, Data Types, and Logic Flow.
                          </span>
                        </p>
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
                              Stage 02
                            </p>
                            <h3 className="text-lg font-semibold text-slate-900">
                              Phase 2: Real-Time Scripting &amp; Compilation
                            </h3>
                          </div>
                        </div>
                        <p className="mt-3 leading-relaxed text-slate-700">
                          Theory is useless without application. Kanam provides a
                          sandboxed Python 3 environment where you will translate
                          concepts into code. You will interact with a standard virtual
                          terminal (Console) to view output, debug errors in real-time,
                          and observe how a computer processes instructions sequentially
                          from top to bottom.
                        </p>
                        <p className="mt-3 text-sm font-semibold text-slate-900">
                          Technical Focus:
                          <span className="font-normal text-slate-700">
                            {" "}
                            Syntax Precision, Console I/O, and Error Handling.
                          </span>
                        </p>
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
                              Stage 03
                            </p>
                            <h3 className="text-lg font-semibold text-slate-900">
                              Phase 3: Optimization &amp; Troubleshooting
                            </h3>
                          </div>
                        </div>
                        <p className="mt-3 leading-relaxed text-slate-700">
                          The final stage of the Kanam Protocol is validation. You are
                          tasked with “Check for Understanding” (CFU) modules that test
                          your theoretical knowledge, followed by “Try This” challenges.
                          These challenges force you to refactor and optimize your code,
                          ensuring you haven’t just copied syntax, but have mastered the
                          underlying logic.
                        </p>
                        <p className="mt-3 text-sm font-semibold text-slate-900">
                          Technical Focus:
                          <span className="font-normal text-slate-700">
                            {" "}
                            Code Refactoring, Logical Edge-Cases, and Achievement Tracking.
                          </span>
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Start protocol */}
              <div className="mt-8">
                <Card className="border-slate-200 bg-white/85 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">The “Start” Protocol</CardTitle>
                    <CardDescription className="text-slate-600">
                      You are currently enrolled in:{" "}
                      <span className="font-semibold text-slate-900">
                        AI + Python Starter Pack
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                          Estimated Completion
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          60 Minutes
                        </p>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                          Certification Path
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          Junior AI Logic Badge
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        className="h-12 bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                        asChild
                      >
                        <Link href="/learn/1">
                          Initialize Lesson 1: My First AI Helper
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

