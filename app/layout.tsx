import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HeaderVideo } from "@/components/layout/HeaderVideo";
import { HeaderBrand } from "@/components/layout/HeaderBrand";
import { AuthActions } from "@/components/layout/AuthActions";
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
        className={`${inter.variable} min-h-dvh bg-slate-50 text-slate-900 antialiased`}
      >
        <header className="sticky top-0 z-50 overflow-hidden border-b-2 border-[rgb(var(--accent-rgb)/0.98)] bg-gradient-to-r from-[rgb(var(--brand-2-rgb)/0.98)] via-[rgb(var(--brand-rgb)/0.92)] to-[rgb(var(--accent-rgb)/0.86)] shadow-xl">
          {/* Thin highlight line for extra “brand” pop */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[rgb(var(--accent-rgb)/0.92)] via-[rgb(var(--brand-rgb)/0.92)] to-[rgb(var(--accent-rgb)/0.92)]" />
          {/* Soft inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]" />
          {/* Subtle video texture (kept very low-contrast so it isn't distracting) */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <HeaderVideo
              className="h-full w-full object-cover opacity-[0.06] saturate-0"
              src="/video/8733062-uhd_3840_2160_30fps.mp4"
              playbackRate={0.35}
            />
          </div>

          <div className="relative flex w-full items-center justify-between px-4 py-3 md:px-10">
            <HeaderBrand />
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex rounded-full border border-[rgb(var(--accent-rgb)/0.98)] bg-white/95 px-2.5 py-1 text-xs font-semibold text-[rgb(var(--brand-2-rgb)/1)] shadow-md">
                Lesson Canvas MVP
              </span>
              <AuthActions />
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
