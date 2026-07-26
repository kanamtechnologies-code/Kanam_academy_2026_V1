"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-dvh bg-slate-950 text-white antialiased">
        <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
          <p className="text-sm text-white/70">
            We were notified. You can try again, or go back to Welcome.
          </p>
          {error.digest ? (
            <p className="font-mono text-xs text-white/40">Ref: {error.digest}</p>
          ) : null}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950"
            >
              Try again
            </button>
            <a
              href="/welcome"
              className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white"
            >
              Back to Welcome
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
