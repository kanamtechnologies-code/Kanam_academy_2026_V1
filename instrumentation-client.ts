import * as Sentry from "@sentry/nextjs";

import { sharedSentryOptions } from "@/lib/sentry/options";

Sentry.init({
  ...sharedSentryOptions(),
  // No Session Replay — avoid capturing learner screens in a kids product.
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
