import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { AppChrome } from "@/components/layout/AppChrome";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-dvh overflow-x-hidden bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <AppChrome>{children}</AppChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
