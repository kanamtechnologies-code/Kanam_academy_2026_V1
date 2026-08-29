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
  applicationName: "Kanam Academy",
  appleWebApp: {
    title: "Kanam Academy",
    capable: true,
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=wordmark3", sizes: "any" },
      { url: "/favicon-32.png?v=wordmark3", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png?v=wordmark3", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=wordmark3", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=wordmark3", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico?v=wordmark3"],
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
        className={`${inter.variable} min-h-dvh overflow-x-hidden bg-transparent text-foreground antialiased`}
      >
        <ThemeProvider>
          <AppChrome>{children}</AppChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
