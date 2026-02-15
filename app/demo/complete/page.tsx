"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Laptop,
  ShieldCheck,
  Sparkles,
  Wifi,
} from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DemoCompletePage() {
  return (
    <WelcomeBackground>
      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          {/* Left: full-page content */}
          <Card className="kanam-glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                Demo complete
              </CardTitle>
              <CardDescription className="text-[rgb(var(--accent-rgb)/0.98)] kanam-text-pop-strong">
                Great work. In the real class, your instructor will be with you the entire time.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-2xl bg-[var(--brand)]/10 ring-1 ring-[var(--brand)]/20">
                    <CheckCircle2 className="h-5 w-5 text-[var(--brand-2)]" />
                  </div>
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">
                    What you just proved
                  </p>
                </div>
                <ul className="mt-4 grid gap-2">
                  {[
                    "You can edit code in the canvas.",
                    "You can press Run and read the output.",
                    "You can rebuild from scratch and submit.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-slate-800">
                      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--accent)]/20 text-[rgb(var(--brand-2-rgb)/1)] ring-1 ring-[var(--accent)]/25">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-2xl bg-[var(--accent)]/12 ring-1 ring-[var(--accent)]/20">
                      <Sparkles className="h-5 w-5 text-[rgb(var(--accent-rgb)/0.95)]" />
                    </div>
                    <p className="text-sm font-extrabold tracking-tight text-slate-900">
                      What class feels like
                    </p>
                  </div>
                  <ul className="mt-4 grid gap-2">
                    {[
                      "Your instructor explains, then you try.",
                      "You can ask questions any time.",
                      "We practice in small steps.",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-slate-800">
                        <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                        <span className="leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-2xl bg-[var(--brand)]/10 ring-1 ring-[var(--brand)]/20">
                      <Laptop className="h-5 w-5 text-[var(--brand-2)]" />
                    </div>
                    <p className="text-sm font-extrabold tracking-tight text-slate-900">
                      What you need
                    </p>
                  </div>
                  <ul className="mt-4 grid gap-2">
                    <li className="flex items-start gap-2 text-sm text-slate-800">
                      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                        <Laptop className="h-4 w-4" />
                      </span>
                      <span className="leading-relaxed">A laptop or desktop</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-800">
                      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                        <Wifi className="h-4 w-4" />
                      </span>
                      <span className="leading-relaxed">Internet connection</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-800">
                      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                        <HelpCircle className="h-4 w-4" />
                      </span>
                      <span className="leading-relaxed">Willingness to try</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/85 p-5">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent)]/12 ring-1 ring-[var(--accent)]/20">
                    <ShieldCheck className="h-5 w-5 text-[var(--brand-2)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold tracking-tight text-slate-900">
                      Next step
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">
                      For class info and enrollment, head to our website.
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Button asChild className="h-12 px-6 text-base font-extrabold tracking-tight">
                        <a href="https://kanamacademy.com" target="_blank" rel="noreferrer">
                          Go to kanamacademy.com <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="h-12">
                        <Link href="/welcome">
                          Back to Welcome <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="h-12">
                        <Link href="/demo">Open Demo Dashboard</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right: image + extra info */}
          <div className="space-y-6">
            <Card className="kanam-glow-card">
              <CardHeader>
                <CardTitle className="text-slate-900">What you’ll see in class</CardTitle>
                <CardDescription className="text-[rgb(var(--accent-rgb)/0.98)] kanam-text-pop-strong">
                  A guided canvas, a scratch space, and an instructor helping live.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white/80">
                  <Image
                    src="/images/pexels-olia-danilevich-4974916.jpg"
                    alt="Student learning with a laptop"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                </div>
              </CardContent>
            </Card>

            <Card className="kanam-glow-card">
              <CardHeader>
                <CardTitle className="text-slate-900">Want a quick refresher?</CardTitle>
                <CardDescription className="text-[rgb(var(--accent-rgb)/0.98)] kanam-text-pop-strong">
                  Re-run the demo lesson any time.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-2">
                <Button asChild variant="secondary" className="h-12">
                  <Link href="/learn/demo">Open the demo lesson</Link>
                </Button>
                <Button asChild variant="outline" className="h-12">
                  <Link href="/demo">Preview dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </WelcomeBackground>
  );
}

