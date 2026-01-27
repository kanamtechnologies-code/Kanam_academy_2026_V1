"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Zap } from "lucide-react";

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
          "mx-auto flex min-h-[calc(100dvh-160px)] w-full items-center justify-center",
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
                <Button className="w-full" variant="outline" onClick={() => router.push("/welcome")}>
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
                <Button className="w-full" variant="outline" onClick={() => router.push("/welcome")}>
                  Back
                </Button>
              </CardContent>
            </Card>
          </div>
        </WelcomeShell>
      </div>
    </WelcomeBackground>
  );
}

