import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import Link from "next/link";

import { HeaderBrand } from "@/components/layout/HeaderBrand";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Billing | Kanam Academy",
  description:
    "Subscribe to Kanam Academy, buy a learning track, or add 1:1 live tutoring. Sign in required.",
};

export default function BillingLayout({ children }: { children: ReactNode }) {
  const theme = {
    ["--brand" as string]: "#18a16d",
    ["--brand-2" as string]: "#145c45",
    ["--brand-deep" as string]: "#0b2f24",
    ["--accent" as string]: "#d8c07a",
    ["--brand-rgb" as string]: "24 161 109",
    ["--brand-2-rgb" as string]: "20 92 69",
    ["--brand-deep-rgb" as string]: "11 47 36",
    ["--accent-rgb" as string]: "216 192 122",
    ["--background" as string]: "#f3efe4",
    ["--foreground" as string]: "#14201c",
    ["--muted" as string]: "#5b6b64",
    fontFamily:
      "var(--font-source-sans), 'Source Sans 3', ui-sans-serif, system-ui, sans-serif",
  } as CSSProperties;

  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh bg-[#f3efe4] text-[#14201c] antialiased`}
      style={theme}
    >
      <header className="sticky inset-x-0 top-0 z-[60] overflow-hidden border-b border-[rgb(var(--accent-rgb)/0.55)] bg-gradient-to-r from-[#145c45] via-[rgb(var(--brand-2-rgb)/0.96)] to-[#1a6b52] shadow-lg supports-[backdrop-filter]:backdrop-blur-md">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent-rgb)/0.85)] to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(216,192,122,0.16),transparent_50%)]" />

        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <HeaderBrand />
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/welcome"
              className="rounded-full px-3 py-2 text-sm font-semibold text-[#d7e0db] transition-colors hover:text-[var(--accent)]"
            >
              Lessons
            </Link>
            <a
              href="https://www.kanamacademy.com/pricing"
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-[#d7e0db] transition-colors hover:text-[var(--accent)] sm:inline"
              target="_blank"
              rel="noreferrer"
            >
              Pricing
            </a>
            <Link
              href="/account/billing"
              className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-[#14201c] transition hover:bg-[rgb(var(--accent-rgb)/0.92)]"
            >
              Billing hub
            </Link>
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}
