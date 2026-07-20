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
  { slug: "advanced-ai", name: "Advanced AI", price: "$200" },
  { slug: "ap-csp-prep", name: "AP CSP Prep", price: "$250" },
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
  const highlightSubscription = section === "subscription";

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
      {/* Hero — full-bleed photo + dusk veil (matches marketing) */}
      <section className="relative isolate min-h-[28rem] overflow-hidden border-b border-[rgb(var(--accent-rgb)/0.25)] sm:min-h-[32rem]">
        <Image
          src="/images/billing/billing-hero-premium.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(11,47,36,0.94)_0%,rgba(20,92,69,0.82)_42%,rgba(11,47,36,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(216,192,122,0.18),transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[28rem] w-full max-w-6xl flex-col justify-center px-4 pb-12 pt-20 sm:min-h-[32rem] sm:px-6 sm:pb-16">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Billing
          </p>
          <h1
            className="mt-3 max-w-xl text-[2.15rem] font-semibold leading-[1.05] tracking-tight text-[#f7f3e8] sm:text-4xl lg:text-[3rem]"
            style={displayFont()}
          >
            Clear paths.
            <span className="mt-1 block text-[var(--accent)]">Clear prices.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#d7e0db] sm:text-lg">
            Family access, full tracks, and private tutoring — secured by Stripe, unlocked on
            this account.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#subscription"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-sm font-semibold text-[#14201c] transition hover:bg-[rgb(var(--accent-rgb)/0.92)]"
            >
              Monthly access · $30
            </a>
            <a
              href="#tracks"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/45 bg-white/15 px-7 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              Browse tracks
            </a>
          </div>
        </div>
      </section>

      {/* Light content band */}
      <div className="bg-[#f3efe4]">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          {canceled ? (
            <p className="mb-6 rounded-2xl border border-[rgb(var(--brand-2-rgb)/0.2)] bg-white px-4 py-3 text-sm text-[#14201c] shadow-sm">
              Checkout canceled — no charge. Pick a plan whenever you’re ready.
            </p>
          ) : null}

          {error ? (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
              <p>{error}</p>
              <p className="mt-2">
                <Link
                  href={`/welcome?next=${encodeURIComponent(
                    `/billing${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
                  )}`}
                  className="font-semibold text-[var(--brand-2)] underline underline-offset-4"
                >
                  Sign in or create an account
                </Link>
                {" — then return here to checkout."}
              </p>
            </div>
          ) : null}

          {/* Access strip */}
          <section className="border-b border-[rgb(var(--brand-2-rgb)/0.12)] pb-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand-2)]">
                  Your access
                </p>
                <h2
                  className="mt-1 text-2xl font-semibold tracking-tight text-[#14201c]"
                  style={displayFont()}
                >
                  What’s unlocked
                </h2>
              </div>
              <button
                type="button"
                onClick={openPortal}
                disabled={busy === "portal"}
                className="inline-flex h-10 items-center justify-center rounded-full border border-[rgb(var(--brand-2-rgb)/0.35)] px-4 text-sm font-semibold text-[var(--brand-2)] transition hover:bg-[rgb(var(--brand-2-rgb)/0.06)] disabled:opacity-50"
              >
                {busy === "portal" ? "Opening…" : "Customer portal"}
              </button>
            </div>

            {error && !status ? (
              <p className="mt-5 text-sm text-[var(--muted)]">
                Sign in to see subscription, track unlocks, and tutoring balance.
              </p>
            ) : !status ? (
              <p className="mt-5 text-sm text-[var(--muted)]">Loading…</p>
            ) : (
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Subscription",
                    value: status.hasActiveSubscription
                      ? `Active (${status.subscription?.status})`
                      : "None",
                  },
                  {
                    label: "Track unlocks",
                    value:
                      (status.tracks ?? []).map((t) => t.track_slug).join(", ") || "None",
                  },
                  {
                    label: "Tutoring sessions left",
                    value: String(status.tutoringSessionsRemaining ?? 0),
                  },
                ].map((item) => (
                  <div key={item.label} className="border-t border-[rgb(var(--brand-2-rgb)/0.15)] pt-3">
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-base font-semibold text-[#14201c]">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>

          <div id="plans" className="mt-12 space-y-16 scroll-mt-24">
            {/* Family subscription — spotlight */}
            <section id="subscription" className="scroll-mt-24">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand-2)]">
                Families &amp; individual learners
              </p>
              <h3
                className="mt-2 text-3xl font-semibold tracking-tight text-[#14201c]"
                style={displayFont()}
              >
                Platform first. Live help when you want it.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Monthly access to all eight learning paths — XP, badges, and progress adults can
                see. Live 1:1 tutoring is optional and priced separately.
              </p>

              <div
                className={[
                  "mt-8 grid overflow-hidden rounded-[1.75rem] border bg-[#0b2f24] text-[#f7f3e8] lg:grid-cols-2",
                  highlightSubscription
                    ? "border-[rgb(var(--accent-rgb)/0.65)] shadow-[0_24px_60px_rgba(11,47,36,0.28)] ring-1 ring-[rgb(var(--accent-rgb)/0.4)]"
                    : "border-[rgb(var(--brand-2-rgb)/0.35)] shadow-[0_18px_48px_rgba(11,47,36,0.18)]",
                ].join(" ")}
              >
                <div className="relative min-h-[240px] lg:min-h-full">
                  <Image
                    src="/images/billing/billing-subscription-premium.png"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f24] via-[#0b2f24]/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0b2f24]/85" />
                </div>
                <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    Most flexible
                  </p>
                  <h4 className="mt-2 text-3xl font-semibold tracking-tight" style={displayFont()}>
                    Monthly access
                  </h4>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[#c5d2cb] sm:text-base">
                    All eight learning paths — stay as long as you need. Cancel anytime from the
                    customer portal.
                  </p>
                  <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#a8b8b0]">Per month</p>
                      <p
                        className="text-4xl font-semibold tracking-tight text-[var(--accent)]"
                        style={displayFont()}
                      >
                        $30
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={Boolean(busy) || status?.hasActiveSubscription}
                      onClick={() => startCheckout({ kind: "subscription" })}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-sm font-semibold text-[#14201c] transition hover:bg-[rgb(var(--accent-rgb)/0.92)] disabled:opacity-50"
                    >
                      {status?.hasActiveSubscription
                        ? "Already subscribed"
                        : busy?.includes("subscription")
                          ? "Redirecting…"
                          : "Subscribe $30/mo"}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Tracks */}
            <section>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand-2)]">
                    Or buy one track
                  </p>
                  <h3
                    className="mt-2 text-3xl font-semibold tracking-tight text-[#14201c]"
                    style={displayFont()}
                  >
                    Full track prices
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    One-time unlock for a complete program — designed as 16 sessions over 8 weeks.
                  </p>
                </div>
              </div>

              <ul
                id="tracks"
                className="mt-8 divide-y divide-[rgb(var(--brand-2-rgb)/0.12)] border-y border-[rgb(var(--brand-2-rgb)/0.12)]"
              >
                {TRACKS.map((track) => {
                  const owned = ownedTracks.has(track.slug);
                  const featured = featuredTrack === track.slug;
                  return (
                    <li
                      key={track.slug}
                      id={`track-${track.slug}`}
                      className={[
                        "flex flex-wrap items-center justify-between gap-3 py-4",
                        featured ? "bg-[rgb(var(--accent-rgb)/0.12)] px-3 sm:px-4" : "",
                      ].join(" ")}
                    >
                      <div>
                        <p className="font-semibold text-[#14201c]">{track.name}</p>
                        <p className="text-xs text-[var(--muted)]">
                          Full track · 16 sessions · 8 weeks
                          {owned ? " · Owned" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xl font-semibold text-[var(--brand-2)]"
                          style={displayFont()}
                        >
                          {track.price}
                        </span>
                        <button
                          type="button"
                          disabled={Boolean(busy) || owned}
                          onClick={() =>
                            startCheckout({ kind: "track", trackSlug: track.slug })
                          }
                          className="inline-flex h-10 items-center justify-center rounded-full border border-[rgb(var(--brand-2-rgb)/0.35)] bg-white px-5 text-sm font-semibold text-[var(--brand-2)] transition hover:border-[var(--brand-2)] hover:bg-[rgb(var(--brand-2-rgb)/0.06)] disabled:opacity-45"
                        >
                          {owned ? "Owned" : busy?.includes(track.slug) ? "…" : "Buy"}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Tutoring */}
            <section id="tutoring" className="scroll-mt-24">
              <div
                className={[
                  "relative mb-8 overflow-hidden rounded-[1.75rem] border",
                  section === "tutoring"
                    ? "border-[rgb(var(--accent-rgb)/0.55)] ring-1 ring-[rgb(var(--accent-rgb)/0.35)]"
                    : "border-[rgb(var(--brand-2-rgb)/0.2)]",
                ].join(" ")}
              >
                <div className="relative min-h-[220px] sm:min-h-[260px]">
                  <Image
                    src="/images/billing/billing-tutoring-premium.png"
                    alt=""
                    fill
                    className="object-cover object-[center_30%]"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,47,36,0.92)_0%,rgba(20,92,69,0.55)_55%,rgba(11,47,36,0.35)_100%)]" />
                  <div className="relative flex h-full min-h-[220px] flex-col justify-end px-6 py-8 sm:min-h-[260px] sm:px-10 sm:py-10">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                      Optional live tutoring
                    </p>
                    <h3
                      className="mt-2 max-w-lg text-3xl font-semibold tracking-tight text-[#f7f3e8]"
                      style={displayFont()}
                    >
                      1:1 live tutoring
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#d7e0db] sm:text-base">
                      Private sessions with a Kanam instructor — full lesson, exercises, and clear
                      next steps. Never included in subscription or track price.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {TUTORING.map((item) => (
                  <div
                    key={item.sku}
                    id={`tutoring-${item.sku}`}
                    className={[
                      "flex scroll-mt-24 flex-col border-t pt-5",
                      tutoringSku === item.sku
                        ? "border-[var(--accent)]"
                        : "border-[rgb(var(--brand-2-rgb)/0.18)]",
                    ].join(" ")}
                  >
                    <p className="text-sm font-medium text-[var(--muted)]">{item.label}</p>
                    <p
                      className="mt-2 text-3xl font-semibold tracking-tight text-[#14201c]"
                      style={displayFont()}
                    >
                      {item.price}
                    </p>
                    <p className="mt-2 text-xs text-[var(--muted)]">{item.note}</p>
                    <button
                      type="button"
                      disabled={Boolean(busy)}
                      onClick={() =>
                        startCheckout({ kind: "tutoring", tutoringSku: item.sku })
                      }
                      className="mt-5 inline-flex h-11 w-fit items-center justify-center rounded-full bg-[var(--brand-2)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--brand)] disabled:opacity-50"
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
              className="font-semibold text-[var(--brand-2)] underline-offset-4 hover:underline"
            >
              info@kanamacademy.com
            </a>
            {" · "}
            <Link
              href="/welcome"
              className="font-semibold text-[var(--brand-2)] underline-offset-4 hover:underline"
            >
              Back to lessons
            </Link>
            {" · "}
            <a
              href="https://www.kanamacademy.com/pricing"
              className="font-semibold text-[var(--brand-2)] underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Full pricing page
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
