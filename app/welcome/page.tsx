"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { WelcomeShell } from "@/components/welcome/WelcomeShell";
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
          <Card className="border-slate-200 bg-white/85 backdrop-blur-sm">
            <CardContent className="space-y-4 pt-6">
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
        </WelcomeShell>
      </div>
    </WelcomeBackground>
  );
}

