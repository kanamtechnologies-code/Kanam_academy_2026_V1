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
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[var(--background)]/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/Logo.png"
                alt="Kanam Academy logo"
                width={28}
                height={28}
                priority
              />
              <span className="text-sm font-semibold tracking-tight">
                Kanam Academy
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
