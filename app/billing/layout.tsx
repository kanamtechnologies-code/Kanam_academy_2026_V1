import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

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
    ["--background" as string]: "#071a14",
    ["--foreground" as string]: "#f3efe4",
    ["--muted" as string]: "#a8b8b0",
    fontFamily:
      "var(--font-source-sans), 'Source Sans 3', ui-sans-serif, system-ui, sans-serif",
  } as CSSProperties;

  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh bg-[#071a14] text-[#f3efe4] antialiased`}
      style={theme}
    >
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(216,192,122,0.14),transparent_45%),radial-gradient(ellipse_at_90%_10%,rgba(24,161,109,0.22),transparent_40%),linear-gradient(180deg,#0b2f24_0%,#071a14_45%,#050f0c_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(216,192,122,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(216,192,122,0.35)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <header className="border-b border-[rgb(var(--accent-rgb)/0.18)] bg-[rgb(var(--brand-deep-rgb)/0.72)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link href="/welcome" className="flex items-center gap-2.5">
            <span className="relative h-9 w-9 overflow-hidden rounded-full bg-[#0b2f24] ring-1 ring-[rgb(var(--accent-rgb)/0.45)]">
              <Image
                src="/images/Logo.png"
                alt=""
                fill
                className="object-contain p-0.5"
                sizes="36px"
                priority
              />
            </span>
            <span>
              <span
                className="block text-lg font-semibold tracking-tight text-[#f7f3e8]"
                style={{ fontFamily: "var(--font-fraunces), Fraunces, Georgia, serif" }}
              >
                Kanam Academy
              </span>
              <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Move Forward.
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-3 text-sm font-semibold">
            <Link
              href="/welcome"
              className="text-[rgb(var(--accent-rgb)/0.95)] underline-offset-4 hover:underline"
            >
              Lessons
            </Link>
            <a
              href="https://www.kanamacademy.com"
              className="hidden text-[var(--muted)] underline-offset-4 hover:underline sm:inline"
              target="_blank"
              rel="noreferrer"
            >
              Marketing site
            </a>
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}
