import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col justify-center px-4 py-14 sm:px-6">
      <div className="overflow-hidden rounded-[1.5rem] border border-[rgb(var(--brand-2-rgb)/0.2)] bg-white/90 p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-2)]">
          Payment received
        </p>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-[#14201c]"
          style={{ fontFamily: "var(--font-fraunces), Fraunces, Georgia, serif" }}
        >
          You’re all set.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          Thanks for investing in your learner. Access updates within a few seconds after
          Stripe confirms the payment. If something looks missing, refresh billing or email
          us.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/billing"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--brand-2)]"
          >
            View billing
          </Link>
          <Link
            href="/welcome"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[rgb(var(--brand-2-rgb)/0.25)] bg-[rgb(var(--brand-2-rgb)/0.06)] px-5 text-sm font-semibold text-[var(--brand-2)] transition hover:bg-[rgb(var(--brand-2-rgb)/0.12)]"
          >
            Go to lessons
          </Link>
        </div>
      </div>
    </main>
  );
}
