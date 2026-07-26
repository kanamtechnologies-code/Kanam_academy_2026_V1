import type { BrowserOptions } from "@sentry/nextjs";

/**
 * Shared Sentry init options for client / server / edge.
 * No-op when NEXT_PUBLIC_SENTRY_DSN is unset (local/CI without Sentry).
 * Session Replay is intentionally off — kid learning product.
 */

export function sentryEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN?.trim());
}

export function sharedSentryOptions(): BrowserOptions {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim() || undefined;
  return {
    dsn,
    enabled: Boolean(dsn),
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV || "development",
    // COPPA / school privacy: do not attach emails, IPs, or request bodies by default.
    sendDefaultPii: false,
    tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
    beforeSend(event) {
      if (event.request?.headers) {
        delete event.request.headers.cookie;
        delete event.request.headers.authorization;
        delete event.request.headers.Cookie;
        delete event.request.headers.Authorization;
      }
      return event;
    },
  };
}
