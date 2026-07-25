import type { ReactNode } from "react";

/**
 * Lesson routes must resolve entitlements per request.
 * Never bake paywall/redirect decisions into a static build.
 */
export const dynamic = "force-dynamic";

export default function LearnLayout({ children }: { children: ReactNode }) {
  return children;
}
