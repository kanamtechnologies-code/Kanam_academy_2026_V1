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

export default function WelcomePage() {
  const router = useRouter();
  const [name, setName] = React.useState<string>("");
  const [animateIn, setAnimateIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    setName(loadUserName());
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
              Welcome to Kanam Academy <span aria-hidden>🚀</span>
            </>
          }
          subtitle="I'm your AI teaching assistant. What should I call you?"
        >
          <div className="grid w-full gap-6 md:grid-cols-2 md:items-stretch">
            {/* Name / Login */}
            <Card className="border-slate-200 bg-white/85 backdrop-blur-sm">
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                    Sign in
                  </p>
                  <p className="text-sm text-slate-700">
                    Enter a name to save your progress on this device.
                  </p>
                </div>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="h-12 border-2 border-slate-200 bg-white text-base text-slate-900 placeholder:text-slate-400 focus-visible:ring-[var(--brand)]/30"
                />
                <Button
                  className="h-12 w-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                  disabled={!name.trim()}
                  onClick={() => {
                    const trimmed = name.trim();
                    saveUserName(trimmed);
                    setName(trimmed);
                    router.push("/welcome/choose");
                  }}
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-center md:text-left text-xs text-slate-400">
                  You can change your name later (we’ll add a profile page soon).
                </p>
              </CardContent>
            </Card>

            {/* Video panel */}
            <Card className="border-slate-200 bg-white/85 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
                  <div className="relative aspect-video">
                    <WelcomeVideoFader
                      sources={[
                        "/video/4918239-hd_1080_1920_25fps.mp4",
                        "/video/7310259-uhd_2160_4096_25fps.mp4",
                        "/video/5495790-uhd_2560_1080_30fps.mp4",
                        "/video/4497367-uhd_3840_2160_25fps.mp4",
                        "/video/4495343-uhd_3840_2160_25fps.mp4",
                      ]}
                      intervalMs={9000}
                      fadeMs={900}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-white/10" />
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

