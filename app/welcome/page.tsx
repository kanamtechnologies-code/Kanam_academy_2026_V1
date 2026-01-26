"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

type Step = "greeting" | "branch" | "explainer";

function ScreenShell({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-3xl">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 text-base text-slate-300 sm:text-lg">{subtitle}</p>
        ) : null}
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export default function WelcomePage() {
  const router = useRouter();

  const [step, setStep] = React.useState<Step>("greeting");
  const [name, setName] = React.useState<string>("");
  const [animateIn, setAnimateIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    setName(loadUserName());
  }, []);

  React.useEffect(() => {
    setAnimateIn(false);
    const t = window.setTimeout(() => setAnimateIn(true), 10);
    return () => window.clearTimeout(t);
  }, [step]);

  // TODO: Check if user has a saved progress index.

  const go = (next: Step) => setStep(next);

  return (
    <div className="min-h-dvh bg-[#0b0f19] px-4 py-10 text-slate-100 md:px-6">
      <div
        className={[
          "mx-auto flex min-h-[calc(100dvh-160px)] w-full items-center justify-center",
          "transition-all duration-300 ease-out",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
      >
        {step === "greeting" ? (
          <ScreenShell
            title={
              <>
                Welcome to Kanam Academy <span aria-hidden>🚀</span>
              </>
            }
            subtitle="I'm your AI teaching assistant. What should I call you?"
          >
            <Card className="border-slate-700/60 bg-white/5">
              <CardContent className="space-y-4 pt-6">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="h-12 border-2 border-slate-600 bg-white/10 text-base text-slate-50 placeholder:text-slate-400 focus-visible:ring-[var(--brand)]/30"
                />
                <Button
                  className="h-12 w-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                  disabled={!name.trim()}
                  onClick={() => {
                    const trimmed = name.trim();
                    saveUserName(trimmed);
                    setName(trimmed);
                    go("branch");
                  }}
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-center text-xs text-slate-400">
                  You can change your name later (we’ll add a profile page soon).
                </p>
              </CardContent>
            </Card>
          </ScreenShell>
        ) : null}

        {step === "branch" ? (
          <ScreenShell
            title={
              <>
                Nice to meet you, {name || "friend"}!
              </>
            }
            subtitle="Choose what you want to do next."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-slate-700/60 bg-white/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-50">
                    <span aria-hidden>⚡️</span> Pick up where I left off
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Go straight back to your active lesson.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                    onClick={() => router.push("/")}
                  >
                    Jump In <Zap className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-700/60 bg-white/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-50">
                    <span aria-hidden>👋</span> I&apos;m new here!
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    See how Kanam works and get a quick tour.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                    onClick={() => go("explainer")}
                  >
                    Show Me Around <Sparkles className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </ScreenShell>
        ) : null}

        {step === "explainer" ? (
          <ScreenShell
            title="How Kanam Works"
            subtitle="Three simple steps to level up fast."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-slate-700/60 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-slate-50">
                    <span aria-hidden>📖</span> Read & Learn
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Every lesson starts with a Coach&apos;s Note and a Quick Explainer.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-slate-700/60 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-slate-50">
                    <span aria-hidden>⌨️</span> Code & Run
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    You write Python in the editor. Press Run to see it come to life.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-slate-700/60 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-slate-50">
                    <span aria-hidden>🏆</span> Level Up
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Complete challenges to earn XP and unlock AI Badges.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                className="h-12 bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                asChild
              >
                <Link href="/learn/1">Start Lesson 1: My First AI Helper</Link>
              </Button>
              <Button
                className="h-12"
                variant="outline"
                onClick={() => go("branch")}
              >
                Back
              </Button>
            </div>
          </ScreenShell>
        ) : null}
      </div>
    </div>
  );
}

