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
    ["--brand-2" as string]: "#247864",
    ["--accent" as string]: "#d8c07a",
    ["--brand-rgb" as string]: "24 161 109",
    ["--brand-2-rgb" as string]: "36 120 100",
    ["--accent-rgb" as string]: "216 192 122",
    ["--background" as string]: "#f7f6f2",
    ["--foreground" as string]: "#14201c",
    ["--muted" as string]: "#5b6b64",
    fontFamily:
      "var(--font-source-sans), 'Source Sans 3', ui-sans-serif, system-ui, sans-serif",
  } as CSSProperties;

  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh bg-[#f7f6f2] text-[#14201c] antialiased`}
      style={theme}
    >
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[rgb(var(--brand-2-rgb)/0.12)] blur-3xl" />
        <div className="absolute -right-16 top-40 h-80 w-80 rounded-full bg-[rgb(var(--accent-rgb)/0.22)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[rgb(var(--brand-rgb)/0.1)] blur-3xl" />
      </div>

      <header className="border-b border-[rgb(var(--brand-2-rgb)/0.15)] bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link href="/welcome" className="flex items-center gap-2.5">
            <span className="relative h-9 w-9 overflow-hidden rounded-full bg-white ring-2 ring-[rgb(var(--brand-2-rgb)/0.25)]">
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
                className="block text-lg font-semibold tracking-tight text-[#14201c]"
                style={{ fontFamily: "var(--font-fraunces), Fraunces, Georgia, serif" }}
              >
                Kanam Academy
              </span>
              <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--brand-2)]">
                Move Forward.
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-3 text-sm font-semibold">
            <Link
              href="/welcome"
              className="text-[var(--brand-2)] underline-offset-4 hover:underline"
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
