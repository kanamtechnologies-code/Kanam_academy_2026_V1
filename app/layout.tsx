import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanam Academy",
  description: "Kanam Academy lesson canvas MVP",
  icons: {
    icon: "/images/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} min-h-dvh bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50`}
      >
        <header className="sticky top-0 z-50 overflow-hidden border-b border-slate-200/70 bg-[var(--background)]/80 backdrop-blur">
          {/* Subtle video texture (kept very low-contrast so it isn't distracting) */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <video
              className="h-full w-full object-cover opacity-[0.12] saturate-0"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/video/16735004-uhd_3840_2160_30fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[var(--background)]/75" />
          </div>

          <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/images/Logo.png"
                alt="Kanam Academy logo"
                width={44}
                height={44}
                className="relative -top-0.5"
                priority
              />
              <span className="text-base font-semibold tracking-tight sm:text-lg">
                <span className="sr-only">K</span>
                <span aria-hidden className="text-slate-900">
                  anam
                </span>{" "}
                <span className="text-slate-900">Academy</span>
              </span>
            </Link>
            <span className="text-xs text-slate-500">Lesson Canvas MVP</span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
