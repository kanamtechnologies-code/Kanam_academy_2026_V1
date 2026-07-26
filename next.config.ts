import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/welcome",
        permanent: false,
      },
    ];
  },
};

const sentryAuth = Boolean(process.env.SENTRY_AUTH_TOKEN?.trim());

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  // Source maps only when CI/deploy has a Sentry auth token.
  sourcemaps: {
    disable: !sentryAuth,
  },
  // Avoid ad blockers; excluded from auth middleware matcher.
  tunnelRoute: "/monitoring-tunnel",
});
