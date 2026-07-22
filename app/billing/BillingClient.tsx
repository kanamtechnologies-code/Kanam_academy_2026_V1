"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Loader2,
  Lock,
  Mail,
  Sparkles,
  Users,
  Video,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notice } from "@/components/ui/notice";
import { cn } from "@/lib/utils";

type BillingStatus = {
  ok?: boolean;
  error?: string;
  hasActiveSubscription?: boolean;
  subscription?: {
    status?: string;
    current_period_end?: string | null;
    cancel_at_period_end?: boolean;
  } | null;
  tracks?: Array<{ track_slug: string }>;
  tutoringSessionsRemaining?: number;
};

const TRACK_INCLUDES = [
  "Full track unlock in the Kanam lesson canvas",
  "Guided lessons + hands-on exercises",
  "XP, badges, and progress parents can see",
  "Self-paced — learn on your schedule",
] as const;

const TRACKS = [
  {
    slug: "financial-literacy",
    name: "Financial Literacy",
    price: "$100",
    blurb: "Budgets, credit, investing, and money decisions for real life.",
    sessions: "16 lessons · ~8 weeks",
    unique: [
      "Paychecks, banking, budgets, and emergency funds",
      "Credit scores, debt, interest, and consumer protection",
      "Saving, investing basics, insurance, and scam awareness",
      "Capstone: build a First-Year Money Plan after high school",
    ],
  },
  {
    slug: "digital-literacy",
    name: "Digital Literacy",
    price: "$100",
    blurb: "Evaluate systems, information, privacy, and digital citizenship.",
    sessions: "16 lessons · ~8 weeks",
    unique: [
      "Computing systems, storage tradeoffs, and how networks move data",
      "Search fluency, evaluating online claims, and digital communication",
      "Identity, footprint, accessibility, IP, privacy, and wellbeing",
      "Capstone: a personal digital action plan for school and work",
    ],
  },
  {
    slug: "ai-literacy",
    name: "AI Literacy",
    price: "$149",
    blurb: "What AI is, how it learns, prompting, bias, privacy, and responsible use.",
    sessions: "16 lessons · ~8 weeks",
    unique: [
      "How AI senses, represents data, and learns from examples",
      "Generative AI & LLMs — plus practical prompting skills",
      "Fact-checking, school honesty, bias, fairness, and deepfakes",
      "Capstone: become an AI-smart citizen for school and work",
    ],
  },
  {
    slug: "ai-python",
    name: "Python & AI Foundations",
    price: "$169",
    blurb: "Build your first AI helper with Python — variables, logic, loops, and a capstone.",
    sessions: "14 lessons · ~8 weeks",
    unique: [
      "Live in-browser Python runner with Run & check feedback",
      "Variables, input, conditionals, loops, lists, and functions",
      "Build an AI helper / NPC step by step with debugging practice",
      "Capstone: ship a Quest Adventure Bot that uses the whole track",
    ],
  },
  {
    slug: "advanced-ai",
    name: "Advanced AI",
    price: "$200",
    blurb: "Data, models, vision, LLMs, RAG, agents, evaluation, and shipping AI systems.",
    sessions: "16 lessons · ~8 weeks",
    unique: [
      "Train classifiers, read confusion matrices, and spot overfitting",
      "Computer vision pipelines, embeddings, RAG, and tool-using agents",
      "Fairness audits, AI security, and MLOps-lite (deploy + monitor)",
      "Capstone: build, demo, audit, and defend a thin AI system",
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    price: "$200",
    blurb: "Threats, controls, and tradeoffs — think like a defender.",
    sessions: "16 lessons · ~8 weeks",
    unique: [
      "CIA triad, authentication, malware, and social engineering",
      "Access control, networks, firewalls, crypto, and HTTPS trust",
      "Hardening, logging, incident response, and privacy tradeoffs",
      "Capstone: justify and defend a full risk-and-controls plan",
    ],
  },
  {
    slug: "data-analyst",
    name: "Data Analyst Track",
    price: "$200",
    blurb: "SQL, tables, and charts for real-world questions — in the browser.",
    sessions: "14 lessons · ~8 weeks",
    unique: [
      "In-browser SQL engine — SELECT through JOIN and HAVING",
      "Sort, filter, count, and summarize real sample tables",
      "Chart strand: bar, pie, line, histogram, and scatter",
      "Capstone: explore → join → summarize → visualize → conclude",
    ],
  },
  {
    slug: "ap-csp-prep",
    name: "AP CSP Prep",
    price: "$250",
    blurb: "AP Computer Science Principles prep — Create task studio plus practice exams.",
    sessions: "16 lessons + practice tests · ~8 weeks",
    unique: [
      "College Board–aligned Big Ideas: creative development through impact",
      "Programming foundations: variables, logic, loops, lists, procedures",
      "Create Performance Task studio with documentation practice",
      "Gated Practice Tests (30 Q) and a Final Exam (40 Q) after lessons",
    ],
  },
] as const;

const TUTORING = [
  {
    sku: "trial",
    label: "Trial session",
    price: "$49",
    note: "One 45–60 min live session to try the format",
    includes: [
      "1:1 with a Kanam instructor",
      "Lesson walkthrough + exercise coaching",
      "Clear next steps after the call",
    ],
  },
  {
    sku: "session",
    label: "Single session",
    price: "$90",
    note: "45–60 min · 1:1 live",
    includes: [
      "Focused help on a lesson, project, or stuck spot",
      "Live coding / screen-share support",
      "Follow-up notes for the learner",
    ],
  },
  {
    sku: "bundle4",
    label: "4-session bundle",
    price: "$325",
    note: "Save $35 vs singles",
    includes: [
      "4 live sessions you can use over time",
      "Great for one unit or a short push",
      "Same instructor matching process as below",
    ],
  },
  {
    sku: "bundle8",
    label: "8-session bundle",
    price: "$650",
    note: "Save $70 vs singles",
    includes: [
      "8 live sessions for steadier coaching",
      "Ideal across several weeks of a track",
      "Schedule around your learner’s availability",
    ],
  },
  {
    sku: "bundle16",
    label: "16-session bundle",
    price: "$1,250",
    note: "Full track · save $190",
    includes: [
      "16 live sessions — roughly a full track arc",
      "Best value for ongoing 1:1 support",
      "Instructor partnership through the program",
    ],
  },
] as const;

async function postJson(url: string, body?: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
    url?: string;
  };
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Request failed.");
  }
  return data;
}

export default function BillingClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = React.useState<BillingStatus | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/billing/status");
        const data = (await res.json()) as BillingStatus;
        if (!cancelled) {
          if (!res.ok || !data.ok) setError(data.error || "Could not load billing. Sign in first.");
          else setStatus(data);
        }
      } catch {
        if (!cancelled) setError("Could not load billing. Sign in first.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function startCheckout(body: Record<string, string>) {
    setBusy(JSON.stringify(body));
    setError(null);
    try {
      const data = await postJson("/api/billing/checkout", body);
      if (data.url) window.location.href = data.url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Checkout failed.");
    } finally {
      setBusy(null);
    }
  }

  async function openPortal() {
    setBusy("portal");
    setError(null);
    try {
      const data = await postJson("/api/billing/portal");
      if (data.url) window.location.href = data.url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Portal failed.");
    } finally {
      setBusy(null);
    }
  }

  const canceled = searchParams.get("canceled") === "1";
  const featuredTrack = searchParams.get("track")?.trim() ?? "";
  const plan = searchParams.get("plan")?.trim() ?? "";
  const tutoringSku = searchParams.get("tutoring")?.trim() ?? "";
  const section =
    searchParams.get("section")?.trim() ||
    (plan === "subscription"
      ? "subscription"
      : plan === "tutoring" || tutoringSku
        ? "tutoring"
        : plan === "track" || featuredTrack
          ? "tracks"
          : "");
  const ownedTracks = new Set((status?.tracks ?? []).map((t) => t.track_slug));
  const highlightSubscription = section === "subscription";
  const featuredTrackMeta = TRACKS.find((t) => t.slug === featuredTrack);
  const signInNext = `/billing${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  const needsSignIn = Boolean(error && !status);

  React.useEffect(() => {
    const targetId = featuredTrack
      ? `track-${featuredTrack}`
      : tutoringSku
        ? `tutoring-${tutoringSku}`
        : section === "subscription"
          ? "subscription"
          : section === "tutoring"
            ? "tutoring"
            : section === "tracks"
              ? "tracks"
              : "";
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [featuredTrack, tutoringSku, section, status]);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button asChild variant="ghost" className="rounded-xl">
          <Link href="/account/billing">
            <CreditCard className="h-4 w-4" />
            Billing hub
          </Link>
        </Button>
      </div>

      <header className="mb-6 space-y-2">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[color:var(--brand-2)]">
          Unlock access
        </p>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
          {featuredTrackMeta
            ? `Unlock ${featuredTrackMeta.name}`
            : "Choose how you want to learn"}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Same Kanam lesson canvas you already know — pick monthly access to every path, unlock one
          track, or add optional live tutoring. Classroom access from a teacher is separate.
        </p>
      </header>

      {canceled ? (
        <div className="mb-4">
          <Notice variant="info" title="Checkout canceled">
            No charge was made. Pick a plan whenever you&apos;re ready.
          </Notice>
        </div>
      ) : null}

      {error ? (
        <div className="mb-4">
          <Notice variant="danger" role="alert" title="Sign in required">
            <p>{error}</p>
            <Button asChild size="sm" className="mt-3 rounded-xl">
              <Link href={`/welcome?next=${encodeURIComponent(signInNext)}`}>
                Sign in or create an account
              </Link>
            </Button>
          </Notice>
        </div>
      ) : null}

      {/* Access summary */}
      <Card className="mb-6 border-slate-200/90 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
                Your access
              </p>
              <CardTitle className="mt-1 text-lg">What&apos;s unlocked</CardTitle>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl"
              disabled={busy === "portal" || needsSignIn}
              onClick={openPortal}
            >
              {busy === "portal" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Opening…
                </>
              ) : (
                "Payment settings"
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {needsSignIn ? (
            <p className="text-sm text-slate-600">Sign in to see your subscription and unlocks.</p>
          ) : !status ? (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading…
            </div>
          ) : (
            <dl className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-3">
                <dt className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
                  Subscription
                </dt>
                <dd className="mt-1 text-sm font-bold text-slate-900">
                  {status.hasActiveSubscription
                    ? `Active (${status.subscription?.status})`
                    : "None"}
                </dd>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-3">
                <dt className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
                  Track unlocks
                </dt>
                <dd className="mt-1 text-sm font-bold text-slate-900">
                  {(status.tracks ?? []).map((t) => t.track_slug).join(", ") || "None"}
                </dd>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-3">
                <dt className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
                  Tutoring left
                </dt>
                <dd className="mt-1 text-sm font-bold text-slate-900">
                  {status.tutoringSessionsRemaining ?? 0} sessions
                </dd>
              </div>
            </dl>
          )}
        </CardContent>
      </Card>

      <div id="plans" className="space-y-5 scroll-mt-24">
        {/* Monthly */}
        <Card
          id="subscription"
          className={cn(
            "scroll-mt-24 overflow-hidden border-slate-200/90 shadow-sm",
            highlightSubscription &&
              "border-[rgb(var(--brand-rgb)/0.45)] ring-2 ring-[rgb(var(--brand-rgb)/0.2)]"
          )}
        >
          <CardContent className="p-0">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[rgb(var(--brand-rgb)/0.12)] text-[var(--brand-2)] ring-1 ring-[rgb(var(--brand-rgb)/0.2)]">
                    <Users className="h-5 w-5" />
                  </span>
                  <Badge className="bg-[rgb(var(--brand-rgb)/0.12)] text-[var(--brand-2)] hover:bg-[rgb(var(--brand-rgb)/0.12)]">
                    Best for families
                  </Badge>
                </div>
                <h2 className="mt-3 text-xl font-black tracking-tight text-slate-900 dark:text-slate-50">
                  Monthly access · all 8 paths
                </h2>
                <p className="mt-1.5 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                  Full platform access while subscribed — every training track, XP, badges, and
                  progress adults can see. Cancel anytime from payment settings.
                </p>
                <ul className="mt-3 grid max-w-xl gap-1 text-xs text-slate-600 sm:grid-cols-2 dark:text-slate-300">
                  {[
                    "All 8 learning paths unlocked",
                    "Self-paced lesson canvas",
                    "Progress for parents/guardians",
                    "Live tutoring sold separately",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-1.5">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brand)]" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                <p className="text-3xl font-black tracking-tight text-[var(--brand-2)]">
                  $30<span className="text-base font-bold text-slate-500">/mo</span>
                </p>
                {needsSignIn ? (
                  <Button asChild className="rounded-xl shadow-sm">
                    <Link href={`/welcome?next=${encodeURIComponent("/checkout?kind=subscription")}`}>
                      Sign in to subscribe
                    </Link>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="rounded-xl shadow-sm"
                    disabled={Boolean(busy) || status?.hasActiveSubscription}
                    onClick={() => startCheckout({ kind: "subscription" })}
                  >
                    {status?.hasActiveSubscription ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" /> Already subscribed
                      </>
                    ) : busy?.includes("subscription") ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Redirecting…
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracks */}
        <section id="tracks" className="scroll-mt-24 space-y-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[color:var(--brand-2)]">
              Or unlock one path
            </p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900 dark:text-slate-50">
              One-time track purchase
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Self-paced training in the same lesson canvas — not live class time. Expand a track to
              see what&apos;s included.
            </p>
          </div>

          <Card className="border-slate-200/90 bg-slate-50/70 shadow-sm dark:bg-slate-900/40">
            <CardContent className="p-4 sm:px-5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Every track includes
              </p>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {TRACK_INCLUDES.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <ul className="space-y-2">
            {TRACKS.map((track) => {
              const owned = ownedTracks.has(track.slug);
              const featured = featuredTrack === track.slug;
              return (
                <li key={track.slug} id={`track-${track.slug}`} className="scroll-mt-24">
                  <Card
                    className={cn(
                      "border-slate-200/90 shadow-sm transition",
                      featured &&
                        "border-[rgb(var(--brand-rgb)/0.45)] bg-[rgb(var(--brand-rgb)/0.04)] ring-2 ring-[rgb(var(--brand-rgb)/0.18)]"
                    )}
                  >
                    <CardContent className="space-y-3 p-4 sm:px-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold text-slate-900 dark:text-slate-50">
                              {track.name}
                            </p>
                            {featured ? (
                              <Badge className="bg-[var(--brand)] text-white hover:bg-[var(--brand)]">
                                <Lock className="mr-1 h-3 w-3" />
                                From your dashboard
                              </Badge>
                            ) : null}
                            {owned ? (
                              <Badge
                                variant="secondary"
                                className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                              >
                                Owned
                              </Badge>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            {track.blurb}
                          </p>
                          <p className="mt-1 text-xs font-semibold text-slate-500">
                            {track.sessions}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <span className="text-lg font-black text-[var(--brand-2)]">
                            {track.price}
                          </span>
                          {needsSignIn ? (
                            <Button asChild size="sm" variant="outline" className="rounded-xl">
                              <Link
                                href={`/welcome?next=${encodeURIComponent(
                                  `/checkout?kind=track&trackSlug=${track.slug}`
                                )}`}
                              >
                                Sign in
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              size="sm"
                              variant={featured ? "default" : "outline"}
                              className="rounded-xl"
                              disabled={Boolean(busy) || owned}
                              onClick={() =>
                                startCheckout({ kind: "track", trackSlug: track.slug })
                              }
                            >
                              {owned
                                ? "Owned"
                                : busy?.includes(track.slug)
                                  ? "…"
                                  : featured
                                    ? "Unlock this path"
                                    : "Purchase"}
                            </Button>
                          )}
                        </div>
                      </div>

                      <details
                        className="group/track rounded-xl border border-slate-200/80 bg-white/80 open:bg-white dark:bg-slate-950/50"
                        open={featured}
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-xs font-bold text-[var(--brand-2)] [&::-webkit-details-marker]:hidden">
                          What&apos;s unique in {track.name}
                          <ChevronDown className="h-4 w-4 transition group-open/track:rotate-180" />
                        </summary>
                        <div className="space-y-3 border-t border-slate-100 px-3 py-3">
                          <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-200">
                            {track.unique.map((line) => (
                              <li key={line} className="flex gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-slate-900/60">
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                              Also included with every track
                            </p>
                            <ul className="mt-1.5 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                              {TRACK_INCLUDES.map((line) => (
                                <li key={`${track.slug}-${line}`} className="flex gap-2">
                                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brand)]" />
                                  <span>{line}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p className="flex gap-2 text-xs text-slate-500">
                            <Video className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            <span>
                              Does <strong>not</strong> include live 1:1 tutoring — add that below if
                              you want an instructor.
                            </span>
                          </p>
                        </div>
                      </details>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Tutoring */}
        <section id="tutoring" className="scroll-mt-24 space-y-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[color:var(--brand-2)]">
              Optional live instruction
            </p>
            <h2 className="mt-1 flex items-center gap-2 text-xl font-black tracking-tight text-slate-900 dark:text-slate-50">
              <Sparkles className="h-5 w-5 text-[var(--accent)]" />
              1:1 live tutoring
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Private sessions with a Kanam instructor — never included in subscription or track
              price.
            </p>
          </div>

          <Notice variant="info" title="What happens after you purchase">
            <ol className="mt-1 list-decimal space-y-2 pl-4 text-sm leading-relaxed">
              <li>
                <strong>We email you</strong> at the account on file with next steps (usually within
                one business day).
              </li>
              <li>
                That message includes <strong>instructor availability</strong> and a{" "}
                <strong>scheduling link</strong> so you can book a time that works.
              </li>
              <li>
                Before the session you&apos;ll get a join link for live video — bring questions from
                the lesson canvas.
              </li>
            </ol>
            <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[var(--brand-2)]" />
                Confirmation + details by email
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[var(--brand-2)]" />
                You pick the time
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Video className="h-3.5 w-3.5 text-[var(--brand-2)]" />
                Live 1:1 session
              </span>
            </div>
          </Notice>

          <div className="grid gap-3 sm:grid-cols-2">
            {TUTORING.map((item) => (
              <Card
                key={item.sku}
                id={`tutoring-${item.sku}`}
                className={cn(
                  "scroll-mt-24 border-slate-200/90 shadow-sm",
                  tutoringSku === item.sku &&
                    "border-[rgb(var(--brand-rgb)/0.45)] ring-2 ring-[rgb(var(--brand-rgb)/0.18)]"
                )}
              >
                <CardContent className="flex h-full flex-col p-4 sm:p-5">
                  <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                  <p className="mt-1 text-2xl font-black text-slate-900 dark:text-slate-50">
                    {item.price}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{item.note}</p>
                  <ul className="mt-3 flex-1 space-y-1.5">
                    {item.includes.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2 text-xs leading-snug text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brand)]" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  {needsSignIn ? (
                    <Button asChild size="sm" className="mt-4 rounded-xl" variant="secondary">
                      <Link
                        href={`/welcome?next=${encodeURIComponent(
                          `/checkout?kind=tutoring&tutoringSku=${item.sku}`
                        )}`}
                      >
                        Sign in to purchase
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      className="mt-4 rounded-xl"
                      variant="secondary"
                      disabled={Boolean(busy)}
                      onClick={() =>
                        startCheckout({ kind: "tutoring", tutoringSku: item.sku })
                      }
                    >
                      {busy?.includes(item.sku) ? "Redirecting…" : "Purchase"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <p className="mt-10 text-center text-xs text-slate-500">
        Questions?{" "}
        <a
          href="mailto:info@kanamacademy.com"
          className="font-semibold text-[var(--brand-2)] underline-offset-2 hover:underline"
        >
          info@kanamacademy.com
        </a>
        {" · "}
        <Link href="/" className="font-semibold text-[var(--brand-2)] underline-offset-2 hover:underline">
          Back to dashboard
        </Link>
      </p>
    </main>
  );
}
