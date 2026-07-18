"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

const TRACKS = [
  { slug: "financial-literacy", name: "Financial Literacy", price: "$100" },
  { slug: "digital-literacy", name: "Digital Literacy", price: "$100" },
  { slug: "ai-literacy", name: "AI Literacy", price: "$149" },
  {
    slug: "advanced-ai",
    name: "Advanced AI",
    price: "$199",
    /** Create Stripe Price + add to stripe-catalog.ts before enabling checkout. */
    checkoutDisabled: true,
  },
  { slug: "ai-python", name: "Python & AI Foundations", price: "$169" },
  { slug: "cybersecurity", name: "Cybersecurity", price: "$200" },
  { slug: "data-analyst", name: "Data Analyst Track", price: "$200" },
] as const;

const TUTORING = [
  { sku: "trial", label: "Trial session", price: "$49", note: "Full lesson + exercises + next steps" },
  { sku: "session", label: "Single session", price: "$90", note: "45–60 min · 1:1 live" },
  { sku: "bundle4", label: "4-session bundle", price: "$325", note: "Save $35 vs singles" },
  { sku: "bundle8", label: "8-session bundle", price: "$650", note: "Save $70 vs singles" },
  { sku: "bundle16", label: "16-session bundle", price: "$1,250", note: "Full track · save $190" },
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

function displayFont(style?: React.CSSProperties): React.CSSProperties {
  return {
    fontFamily: "var(--font-fraunces), Fraunces, Georgia, serif",
    ...style,
  };
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
  /** Marketing deep-links: plan=subscription|track|tutoring, tutoring=trial|session|bundle4|… */
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

  React.useEffect(() => {
    const targetId =
      featuredTrack
        ? `track-${featuredTrack}`
        : tutoringSku
          ? `tutoring-${tutoringSku}`
          : section === "subscription"
            ? "subscription"
            : section === "tutoring"
              ? "tutoring"
              : section === "tracks"
                ? "tracks"
                : section === "plans"
                  ? "plans"
                  : "";
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [featuredTrack, tutoringSku, section, status]);

  return (
    <main className="w-full">
      {/* Full-bleed premium hero */}
      <section className="relative min-h-[78vh] overflow-hidden border-b border-[rgb(var(--accent-rgb)/0.2)]">
        <Image
          src="/images/billing/billing-hero-premium.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,26,20,0.92)_0%,rgba(11,47,36,0.78)_48%,rgba(7,26,20,0.45)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(216,192,122,0.18),transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[78vh] w-full max-w-6xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 sm:pb-20">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Kanam Academy
          </p>
          <h1
            className="mt-3 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-[#f7f3e8] sm:text-5xl lg:text-6xl"
            style={displayFont()}
          >
            Invest in the next step.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#d7e0db] sm:text-lg">
            Family access, full tracks, and private tutoring — secured by Stripe, unlocked on
            this account.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#plans"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-sm font-semibold text-[#14201c] shadow-[0_0_0_1px_rgba(216,192,122,0.35),0_12px_40px_rgba(216,192,122,0.2)] transition hover:brightness-105"
            >
              View plans
            </a>
            <button
              type="button"
              onClick={openPortal}
              disabled={busy === "portal"}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[rgb(var(--accent-rgb)/0.45)] bg-white/5 px-7 text-sm font-semibold text-[#f3efe4] backdrop-blur-sm transition hover:bg-white/10 disabled:opacity-50"
            >
              {busy === "portal" ? "Opening…" : "Manage billing"}
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {canceled ? (
          <p className="mb-6 rounded-2xl border border-[rgb(var(--accent-rgb)/0.35)] bg-[rgb(var(--accent-rgb)/0.1)] px-4 py-3 text-sm text-[#f3efe4]">
            Checkout canceled — no charge. Pick a plan whenever you’re ready.
          </p>
        ) : null}

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-950/40 px-4 py-3 text-sm text-red-100">
            <p>{error}</p>
            <p className="mt-2">
              <Link
                href={`/welcome?next=${encodeURIComponent(
                  `/billing${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
                )}`}
                className="font-semibold text-[var(--accent)] underline underline-offset-4"
              >
                Sign in or create an account
              </Link>
              {" — then return here to checkout."}
            </p>
          </div>
        ) : null}

        {/* Access strip */}
        <section className="rounded-3xl border border-[rgb(var(--accent-rgb)/0.2)] bg-[rgb(var(--brand-deep-rgb)/0.65)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Your access
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#f7f3e8]" style={displayFont()}>
                What’s unlocked
              </h2>
            </div>
            <button
              type="button"
              onClick={openPortal}
              disabled={busy === "portal"}
              className="inline-flex h-10 items-center justify-center rounded-full border border-[rgb(var(--accent-rgb)/0.35)] px-4 text-sm font-semibold text-[var(--accent)] transition hover:bg-[rgb(var(--accent-rgb)/0.08)] disabled:opacity-50"
            >
              {busy === "portal" ? "Opening…" : "Customer portal"}
            </button>
          </div>

          {!status ? (
            <p className="mt-5 text-sm text-[var(--muted)]">Loading…</p>
          ) : (
            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <dt className="text-sm text-[var(--muted)]">Subscription</dt>
                <dd className="mt-1 text-base font-semibold text-[#f7f3e8]">
                  {status.hasActiveSubscription
                    ? `Active (${status.subscription?.status})`
                    : "None"}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <dt className="text-sm text-[var(--muted)]">Track unlocks</dt>
                <dd className="mt-1 text-base font-semibold text-[#f7f3e8]">
                  {(status.tracks ?? []).map((t) => t.track_slug).join(", ") || "None"}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <dt className="text-sm text-[var(--muted)]">Tutoring sessions left</dt>
                <dd className="mt-1 text-base font-semibold text-[#f7f3e8]">
                  {status.tutoringSessionsRemaining ?? 0}
                </dd>
              </div>
            </dl>
          )}
        </section>

        <div id="plans" className="mt-14 space-y-16 scroll-mt-8">
          {/* Family subscription */}
          <section
            id="subscription"
            className={[
              "scroll-mt-8 grid items-stretch gap-0 overflow-hidden rounded-[2rem] border bg-[rgb(var(--brand-deep-rgb)/0.55)] shadow-[0_30px_90px_rgba(0,0,0,0.4)] lg:grid-cols-2",
              section === "subscription"
                ? "border-[rgb(var(--accent-rgb)/0.55)] ring-1 ring-[rgb(var(--accent-rgb)/0.35)]"
                : "border-[rgb(var(--accent-rgb)/0.22)]",
            ].join(" ")}
          >
            <div className="relative min-h-[280px] lg:min-h-full">
              <Image
                src="/images/billing/billing-subscription-premium.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071a14] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0b2f24]/80" />
            </div>
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Platform
              </p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-[#f7f3e8]" style={displayFont()}>
                Family subscription
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#c5d2cb] sm:text-base">
                Monthly access to all six learning tracks — progress, XP, and browser-ready
                lessons. Live tutoring is separate.
              </p>
              <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-[var(--muted)]">Per month</p>
                  <p className="text-4xl font-semibold tracking-tight text-[var(--accent)]" style={displayFont()}>
                    $30
                  </p>
                </div>
                <button
                  type="button"
                  disabled={Boolean(busy) || status?.hasActiveSubscription}
                  onClick={() => startCheckout({ kind: "subscription" })}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-sm font-semibold text-[#14201c] transition hover:brightness-105 disabled:opacity-50"
                >
                  {status?.hasActiveSubscription
                    ? "Already subscribed"
                    : busy?.includes("subscription")
                      ? "Redirecting…"
                      : "Subscribe"}
                </button>
              </div>
            </div>
          </section>

          {/* Tracks */}
          <section>
            <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-end">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  Or buy one track
                </p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-[#f7f3e8]" style={displayFont()}>
                  Full learning tracks
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#c5d2cb] sm:text-base">
                  One-time unlock for a complete program — designed as 16 sessions over 8 weeks.
                </p>
              </div>
              <div className="relative hidden h-44 overflow-hidden rounded-3xl border border-[rgb(var(--accent-rgb)/0.2)] lg:block">
                <Image
                  src="/images/billing/billing-tracks-premium.png"
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#071a14]/40 to-transparent" />
              </div>
            </div>

            <ul
              id="tracks"
              className="mt-8 divide-y divide-white/10 overflow-hidden rounded-3xl border border-[rgb(var(--accent-rgb)/0.18)] bg-[rgb(var(--brand-deep-rgb)/0.55)]"
            >
              {TRACKS.map((track) => {
                const owned = ownedTracks.has(track.slug);
                const featured = featuredTrack === track.slug;
                return (
                  <li
                    key={track.slug}
                    id={`track-${track.slug}`}
                    className={[
                      "flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7",
                      featured ? "bg-[rgb(var(--accent-rgb)/0.12)] ring-1 ring-inset ring-[rgb(var(--accent-rgb)/0.35)]" : "",
                    ].join(" ")}
                  >
                    <div>
                      <p className="font-semibold text-[#f7f3e8]">{track.name}</p>
                      <p className="text-xs text-[var(--muted)]">
                        Full track · 16 sessions · 8 weeks
                        {owned ? " · Owned" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-semibold text-[var(--accent)]" style={displayFont()}>
                        {track.price}
                      </span>
                      <button
                        type="button"
                        disabled={
                          Boolean(busy) ||
                          owned ||
                          ("checkoutDisabled" in track && track.checkoutDisabled)
                        }
                        onClick={() =>
                          startCheckout({ kind: "track", trackSlug: track.slug })
                        }
                        className="inline-flex h-10 items-center justify-center rounded-full border border-[rgb(var(--accent-rgb)/0.4)] bg-[rgb(var(--accent-rgb)/0.08)] px-5 text-sm font-semibold text-[var(--accent)] transition hover:bg-[rgb(var(--accent-rgb)/0.16)] disabled:opacity-45"
                      >
                        {owned
                          ? "Owned"
                          : "checkoutDisabled" in track && track.checkoutDisabled
                            ? "Soon"
                            : busy?.includes(track.slug)
                              ? "…"
                              : "Buy"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Tutoring */}
          <section id="tutoring" className="scroll-mt-8">
            <div
              className={[
                "relative mb-8 overflow-hidden rounded-[2rem] border",
                section === "tutoring"
                  ? "border-[rgb(var(--accent-rgb)/0.55)] ring-1 ring-[rgb(var(--accent-rgb)/0.35)]"
                  : "border-[rgb(var(--accent-rgb)/0.22)]",
              ].join(" ")}
            >
              <div className="relative min-h-[220px] sm:min-h-[280px]">
                <Image
                  src="/images/billing/billing-tutoring-premium.png"
                  alt=""
                  fill
                  className="object-cover object-[center_30%]"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,20,0.92)_0%,rgba(11,47,36,0.55)_55%,rgba(7,26,20,0.35)_100%)]" />
                <div className="relative flex h-full min-h-[220px] flex-col justify-end px-6 py-8 sm:min-h-[280px] sm:px-10 sm:py-10">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    Best results
                  </p>
                  <h3 className="mt-2 max-w-lg text-3xl font-semibold tracking-tight text-[#f7f3e8]" style={displayFont()}>
                    1:1 live tutoring
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#d7e0db] sm:text-base">
                    Private sessions with a Kanam instructor — full lesson, exercises, and clear
                    next steps. Never included in subscription or track price.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TUTORING.map((item) => (
                <div
                  key={item.sku}
                  id={`tutoring-${item.sku}`}
                  className={[
                    "flex scroll-mt-8 flex-col rounded-3xl border bg-[rgb(var(--brand-deep-rgb)/0.55)] px-5 py-5 shadow-[0_16px_48px_rgba(0,0,0,0.25)]",
                    tutoringSku === item.sku
                      ? "border-[rgb(var(--accent-rgb)/0.55)] bg-[rgb(var(--accent-rgb)/0.12)] ring-1 ring-[rgb(var(--accent-rgb)/0.35)]"
                      : "border-[rgb(var(--accent-rgb)/0.18)]",
                  ].join(" ")}
                >
                  <p className="text-sm font-medium text-[#c5d2cb]">{item.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--accent)]" style={displayFont()}>
                    {item.price}
                  </p>
                  <p className="mt-2 text-xs text-[var(--muted)]">{item.note}</p>
                  <button
                    type="button"
                    disabled={Boolean(busy)}
                    onClick={() =>
                      startCheckout({ kind: "tutoring", tutoringSku: item.sku })
                    }
                    className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[var(--brand)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--brand-2)] disabled:opacity-50"
                  >
                    {busy?.includes(item.sku) ? "Redirecting…" : "Buy"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <p className="mt-14 text-center text-sm text-[var(--muted)]">
          Questions?{" "}
          <a
            href="mailto:info@kanamacademy.com"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            info@kanamacademy.com
          </a>
          {" · "}
          <Link
            href="/welcome"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Back to lessons
          </Link>
        </p>
      </div>
    </main>
  );
}
