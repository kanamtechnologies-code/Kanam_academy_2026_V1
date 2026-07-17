"use client";

import * as React from "react";
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

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="relative overflow-hidden rounded-[1.5rem] border border-[rgb(var(--brand-2-rgb)/0.2)] bg-gradient-to-br from-[rgb(var(--brand-2-rgb)/1)] via-[rgb(var(--brand-rgb)/0.92)] to-[rgb(var(--brand-2-rgb)/0.88)] px-6 py-8 text-white sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_45%),radial-gradient(circle_at_85%_10%,rgb(var(--accent-rgb)/0.9)_0,transparent_35%)]" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            Family &amp; learner billing
          </p>
          <h1
            className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
            style={displayFont()}
          >
            Clear plans. Real progress.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Subscribe for all tracks, buy one full track (16 sessions / 8 weeks), or add live
            1:1 tutoring. You’ll pay securely with Stripe — access unlocks on this account.
          </p>
        </div>
      </section>

      {canceled ? (
        <p className="mt-4 rounded-xl border border-[rgb(var(--accent-rgb)/0.45)] bg-[rgb(var(--accent-rgb)/0.18)] px-4 py-3 text-sm text-[#14201c]">
          Checkout canceled — no charge. Pick a plan whenever you’re ready.
        </p>
      ) : null}

      {error ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <p>{error}</p>
          <p className="mt-2">
            <Link href="/welcome" className="font-semibold underline underline-offset-4">
              Sign in or create an account
            </Link>
          </p>
        </div>
      ) : null}

      <section className="mt-8 overflow-hidden rounded-[1.5rem] border border-zinc-900/10 bg-white/90 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <div className="border-b border-zinc-900/8 bg-gradient-to-br from-[rgb(var(--brand-2-rgb)/0.12)] via-white to-[rgb(var(--accent-rgb)/0.14)] px-6 py-6 sm:px-8">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--brand-2)]">
            Your access
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl" style={displayFont()}>
            What’s unlocked on this account
          </h2>
          {!status ? (
            <p className="mt-3 text-sm text-[var(--muted)]">Loading…</p>
          ) : (
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/80 px-4 py-4 ring-1 ring-zinc-900/8">
                <dt className="text-sm text-[var(--muted)]">Subscription</dt>
                <dd className="mt-1 text-base font-semibold text-zinc-950">
                  {status.hasActiveSubscription
                    ? `Active (${status.subscription?.status})`
                    : "None"}
                </dd>
              </div>
              <div className="rounded-2xl bg-white/80 px-4 py-4 ring-1 ring-zinc-900/8">
                <dt className="text-sm text-[var(--muted)]">Track unlocks</dt>
                <dd className="mt-1 text-base font-semibold text-zinc-950">
                  {(status.tracks ?? []).map((t) => t.track_slug).join(", ") || "None"}
                </dd>
              </div>
              <div className="rounded-2xl bg-white/80 px-4 py-4 ring-1 ring-zinc-900/8">
                <dt className="text-sm text-[var(--muted)]">Tutoring sessions left</dt>
                <dd className="mt-1 text-base font-semibold text-zinc-950">
                  {status.tutoringSessionsRemaining ?? 0}
                </dd>
              </div>
            </dl>
          )}
          <button
            type="button"
            onClick={openPortal}
            disabled={busy === "portal"}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-xl border border-[rgb(var(--brand-2-rgb)/0.25)] bg-white px-4 text-sm font-semibold text-[var(--brand-2)] transition hover:bg-[rgb(var(--brand-2-rgb)/0.06)] disabled:opacity-50"
          >
            {busy === "portal" ? "Opening…" : "Manage billing"}
          </button>
        </div>

        <div className="divide-y divide-zinc-900/10">
          <div className="px-6 py-7 sm:px-8">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--brand-2)]">
              Platform
            </p>
            <h3 className="mt-1 text-xl font-semibold text-zinc-950 sm:text-2xl" style={displayFont()}>
              Family subscription
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600">
              Monthly access to all six learning tracks — progress, XP, and browser-ready
              lessons. Live tutoring is separate.
            </p>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--muted)]">Per month</p>
                <p className="text-3xl font-semibold tracking-tight text-zinc-950" style={displayFont()}>
                  $30
                </p>
              </div>
              <button
                type="button"
                disabled={Boolean(busy) || status?.hasActiveSubscription}
                onClick={() => startCheckout({ kind: "subscription" })}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--brand)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--brand-2)] disabled:opacity-50"
              >
                {status?.hasActiveSubscription
                  ? "Already subscribed"
                  : busy?.includes("subscription")
                    ? "Redirecting…"
                    : "Subscribe"}
              </button>
            </div>
          </div>

          <div className="px-6 py-7 sm:px-8">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--brand-2)]">
              Or buy one track
            </p>
            <h3 className="mt-1 text-xl font-semibold text-zinc-950 sm:text-2xl" style={displayFont()}>
              Full learning tracks
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600">
              One-time unlock for a complete program — designed as 16 sessions over 8 weeks.
            </p>
            <ul className="mt-5 divide-y divide-zinc-900/8">
              {TRACKS.map((track) => (
                <li
                  key={track.slug}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div>
                    <p className="font-semibold text-zinc-950">{track.name}</p>
                    <p className="text-xs text-[var(--muted)]">Full track · 16 sessions · 8 weeks</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-[var(--brand-2)]" style={displayFont()}>
                      {track.price}
                    </span>
                    <button
                      type="button"
                      disabled={Boolean(busy)}
                      onClick={() =>
                        startCheckout({ kind: "track", trackSlug: track.slug })
                      }
                      className="inline-flex h-10 items-center justify-center rounded-xl border border-[rgb(var(--brand-2-rgb)/0.25)] bg-[rgb(var(--brand-2-rgb)/0.06)] px-4 text-sm font-semibold text-[var(--brand-2)] transition hover:bg-[rgb(var(--brand-2-rgb)/0.12)] disabled:opacity-50"
                    >
                      Buy
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-6 py-7 sm:px-8">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--brand-2)]">
              Best results
            </p>
            <h3 className="mt-1 text-xl font-semibold text-zinc-950 sm:text-2xl" style={displayFont()}>
              1:1 live tutoring
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600">
              Private sessions with a Kanam instructor — work through a full lesson and
              exercises, then leave with clear next steps. Never included in subscription or
              track price.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TUTORING.map((item) => (
                <div
                  key={item.sku}
                  className="flex flex-col rounded-2xl bg-zinc-50 px-4 py-4 ring-1 ring-zinc-900/8"
                >
                  <p className="text-sm font-medium text-zinc-600">{item.label}</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950" style={displayFont()}>
                    {item.price}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{item.note}</p>
                  <button
                    type="button"
                    disabled={Boolean(busy)}
                    onClick={() =>
                      startCheckout({ kind: "tutoring", tutoringSku: item.sku })
                    }
                    className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-[var(--brand)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--brand-2)] disabled:opacity-50"
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <p className="mt-8 text-center text-sm text-[var(--muted)]">
        Questions?{" "}
        <a
          href="mailto:info@kanamacademy.com"
          className="font-semibold text-[var(--brand-2)] underline-offset-4 hover:underline"
        >
          info@kanamacademy.com
        </a>
        {" · "}
        <Link href="/welcome" className="font-semibold text-[var(--brand-2)] underline-offset-4 hover:underline">
          Back to lessons
        </Link>
      </p>
    </main>
  );
}
