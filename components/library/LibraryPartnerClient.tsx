"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { KanamAmbientBackground } from "@/components/brand/KanamAmbientBackground";
import { TrackIconArt } from "@/components/tracks/TrackIcon";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isInstructorRole, isParentRole, readUserRole } from "@/lib/roles";
import { TRACKS, type Track } from "@/lib/tracks";

type PartnerPayload = {
  ok: true;
  slug: string;
  name: string;
  location: string;
  className: string;
  classCode: string;
  trackTitles: string[];
  headline: string;
  description: string;
  cardName: string;
  joinUrl: string;
  signupUrl: string;
};

const glass =
  "rounded-[28px] border border-white/70 bg-white/80 shadow-[0_16px_40px_rgba(15,23,42,0.14),0_32px_64px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/15 dark:bg-slate-950/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.55)]";

const gradientCta = [
  "h-12 rounded-2xl px-6 font-extrabold",
  "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
  "text-[var(--accent)] shadow-lg shadow-emerald-900/20 hover:brightness-[1.06]",
].join(" ");

const cardEnter = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 280, damping: 24, delay },
});

const TRACK_COPY: Partial<Record<Track["id"], { hook: string; blurb: string; body: string[] }>> = {
  "digital-literacy": {
    hook: "Stay safe and sharp online.",
    blurb:
      "How computers, search, and AI tools work — then how to spot fake news and lock down your accounts.",
    body: [
      "How computers, search, and AI tools work",
      "Spot fake news and weak sources",
      "Passwords, privacy, and safer accounts",
      "Exercises you can use the same day",
    ],
  },
  "financial-literacy": {
    hook: "Make your money make sense.",
    blurb:
      "Paychecks, budgets, credit, and saving — then how to spot scams and build a plan you can keep.",
    body: [
      "Paychecks, banking, budgets, and credit",
      "Saving, investing, taxes, and insurance",
      "How to spot scams before they cost you",
      "A money plan you can actually keep",
    ],
  },
};

function tracksForTitles(titles: string[]): Track[] {
  return titles
    .map((title) => TRACKS.find((track) => track.title === title))
    .filter((track): track is Track => Boolean(track));
}

export function LibraryPartnerClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [partner, setPartner] = React.useState<PartnerPayload | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [attested, setAttested] = React.useState(false);
  const [sessionState, setSessionState] = React.useState<
    "unknown" | "signed-out" | "student" | "parent" | "instructor"
  >("unknown");
  const [claiming, setClaiming] = React.useState(false);
  const [claimError, setClaimError] = React.useState<string | null>(null);
  const [claimed, setClaimed] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/library/${encodeURIComponent(slug)}`);
        const json = (await res.json()) as PartnerPayload & { error?: string };
        if (!res.ok || !json?.ok) {
          throw new Error(json?.error || "This library partnership page was not found.");
        }
        if (!cancelled) setPartner(json);
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Could not load this library page.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        if (!supabase) {
          if (!cancelled) setSessionState("signed-out");
          return;
        }
        const { data } = await supabase.auth.getUser();
        if (cancelled) return;
        const user = data.user;
        if (!user) {
          setSessionState("signed-out");
          return;
        }
        const role = readUserRole(user);
        if (isInstructorRole(user) || role === "instructor" || role === "teacher") {
          setSessionState("instructor");
        } else if (isParentRole(user) || role === "parent") {
          setSessionState("parent");
        } else {
          setSessionState("student");
        }
      } catch {
        if (!cancelled) setSessionState("signed-out");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function startSignup() {
    if (!partner) return;
    try {
      window.localStorage.setItem("kanam.classCode", partner.classCode);
      window.localStorage.removeItem("kanam.selfPaced");
    } catch {
      // ignore
    }
    router.push(`/welcome/age?classCode=${encodeURIComponent(partner.classCode)}`);
  }

  async function claimAccess() {
    if (!partner) return;
    setClaiming(true);
    setClaimError(null);
    try {
      const res = await fetch("/api/student/join-class", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ partnerSlug: partner.slug, classCode: partner.classCode }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Could not unlock library access.");
      }
      setClaimed(true);
      router.push("/dashboard");
    } catch (e: unknown) {
      setClaimError(e instanceof Error ? e.message : "Could not unlock library access.");
    } finally {
      setClaiming(false);
    }
  }

  const tracks = partner ? tracksForTitles(partner.trackTitles) : [];

  return (
    <KanamAmbientBackground className="px-3 py-5 sm:px-5 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto w-full min-w-0 max-w-[1100px] space-y-4 sm:space-y-5">
        {loading ? (
          <div className={`${glass} flex items-center justify-center gap-2 px-6 py-20 text-sm font-semibold text-slate-600 dark:text-slate-300`}>
            <Loader2 className="h-5 w-5 animate-spin text-[color:var(--brand)]" />
            Opening your free courses…
          </div>
        ) : error ? (
          <motion.div {...cardEnter(0)} className={`${glass} p-6 sm:p-8`}>
            <Notice variant="danger" title="Library page unavailable" role="alert">
              {error}
            </Notice>
            <div className="mt-4">
              <Button asChild className={gradientCta}>
                <Link href="/welcome">Go to Welcome</Link>
              </Button>
            </div>
          </motion.div>
        ) : partner ? (
          <>
            <motion.section {...cardEnter(0)} className="kanam-dashboard-hero rounded-[28px] px-6 py-8 text-center sm:px-10 sm:py-12 md:py-14">
              <div className="kanam-dashboard-hero-overlay" />
              <div className="relative z-10 mx-auto max-w-2xl">
                <h1 className="text-[2.25rem] font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
                  Welcome.
                </h1>
                <p className="mt-4 text-lg font-medium leading-relaxed text-white/92 sm:text-xl">
                  We&apos;re glad you&apos;re here.
                </p>
                <p className="mt-3 text-base font-medium leading-relaxed text-white/88 sm:text-lg">
                  You can learn digital skills and money skills — free with your {partner.cardName}.
                </p>
                <p className="mt-4 text-lg font-extrabold text-[#f3e4b0] sm:text-xl">
                  Normally $100 each.
                </p>
              </div>
            </motion.section>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {tracks.map((track, i) => {
                const copy = TRACK_COPY[track.id];
                return (
                  <motion.article
                    key={track.id}
                    {...cardEnter(0.06 + i * 0.05)}
                    className={`${glass} flex flex-col items-center px-2.5 py-4 text-center sm:px-8 sm:py-10`}
                  >
                    <div className="relative">
                      <div
                        aria-hidden
                        className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[36px] bg-[rgb(var(--brand-rgb)/0.38)] blur-2xl"
                      />
                      <TrackIconArt
                        trackId={track.id}
                        className="relative h-20 w-20 drop-shadow-[0_18px_36px_rgba(15,23,42,0.32)] sm:h-44 sm:w-44"
                        alt={track.title}
                      />
                    </div>
                    <h2 className="mt-3 text-[15px] font-black leading-tight tracking-tight text-slate-900 sm:mt-6 sm:text-2xl dark:text-slate-50">
                      {track.title}
                    </h2>
                    <p className="mt-1.5 text-xs font-extrabold leading-snug text-[color:var(--brand)] sm:mt-2 sm:text-lg">
                      {copy?.hook ?? track.outcome}
                    </p>
                    <p className="mt-2 text-[11px] font-medium leading-snug text-slate-600 sm:hidden dark:text-slate-300">
                      {copy?.blurb ?? track.subtitle}
                    </p>
                    {copy?.body ? (
                      <ul className="mt-4 hidden w-full max-w-[18rem] space-y-2 text-left text-sm font-medium leading-snug text-slate-600 sm:block sm:text-[15px] dark:text-slate-300">
                        {copy.body.map((line) => (
                          <li key={line} className="flex gap-2">
                            <span
                              aria-hidden
                              className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand)]"
                            />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 hidden max-w-sm text-sm font-medium text-slate-600 sm:block dark:text-slate-300">
                        {track.subtitle}
                      </p>
                    )}
                    <p className="mt-2.5 text-[11px] font-bold text-slate-500 sm:mt-5 sm:text-sm dark:text-slate-400">
                      16 lessons and exercises.
                    </p>
                  </motion.article>
                );
              })}
            </div>

            <motion.section {...cardEnter(0.16)} className={`${glass} p-5 sm:p-7`}>
                <p className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-50">
                  Skills you can use today.
                </p>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  Spot a scam. Lock down a password. Start a budget.
                </p>
                <p className="mt-4 text-lg font-black tracking-tight text-slate-900 dark:text-slate-50">
                  Ready? Check your {partner.cardName} and start.
                </p>

              <button
                type="button"
                role="checkbox"
                aria-checked={attested}
                onClick={() => setAttested((on) => !on)}
                className={[
                  "mt-5 flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.28)]",
                  attested
                    ? "border-[var(--accent)] bg-[rgb(var(--accent-rgb)/0.16)] shadow-md shadow-amber-900/10"
                    : "border-white/60 bg-white/50 hover:border-[rgb(var(--accent-rgb)/0.55)] hover:bg-white/80 dark:border-white/10 dark:bg-white/5",
                ].join(" ")}
              >
                <span
                  aria-hidden
                  className={[
                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border",
                    attested
                      ? "border-[var(--accent)] bg-gradient-to-br from-[rgb(var(--accent-rgb)/0.95)] to-[#c9a84e] text-slate-950"
                      : "border-slate-300 bg-white dark:border-white/25 dark:bg-slate-900",
                  ].join(" ")}
                >
                  {attested ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                </span>
                <span className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                  Yes — I have a {partner.cardName}.
                </span>
              </button>
              <span className="sr-only" aria-live="polite">
                {attested ? "Library card confirmed" : "Library card not confirmed"}
              </span>

              {claimError ? (
                <div className="mt-4">
                  <Notice compact variant="danger" role="alert">
                    {claimError}
                  </Notice>
                </div>
              ) : null}

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {sessionState === "student" ? (
                  <Button
                    type="button"
                    className={gradientCta}
                    disabled={!attested || claiming}
                    onClick={() => void claimAccess()}
                  >
                    {claiming ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                    {claimed ? "Unlocked — opening dashboard" : "Unlock my free courses"}
                  </Button>
                ) : sessionState === "parent" ? (
                  <Button asChild className={gradientCta}>
                    <Link href="/parent">
                      Open family hub <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : sessionState === "instructor" ? (
                  <Button asChild className={gradientCta}>
                    <Link href="/instructor">
                      Open instructor dashboard <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className={gradientCta}
                    disabled={!attested}
                    onClick={startSignup}
                  >
                    Start free <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-2xl border-[rgb(var(--brand-2-rgb)/0.45)] bg-white/90 px-6 font-extrabold text-[color:var(--brand-2)] hover:bg-[rgb(var(--brand-rgb)/0.08)] dark:bg-slate-950/80"
                >
                  <Link href={`/welcome?classCode=${encodeURIComponent(partner.classCode)}`}>
                    I already have an account
                  </Link>
                </Button>
              </div>

              {sessionState === "parent" ? (
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                  Add or pick a child in the family hub, then come back here to unlock both courses.
                </p>
              ) : (
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                  Under 13? Have a parent sign you up.
                </p>
              )}
            </motion.section>
          </>
        ) : null}
      </div>
    </KanamAmbientBackground>
  );
}
