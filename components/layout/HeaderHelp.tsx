"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

function isWelcomePath(pathname: string | null) {
  if (!pathname) return false;
  return pathname === "/welcome" || pathname.startsWith("/welcome/");
}

/** Help is redundant on welcome (page already links to it). */
export function HeaderHelp() {
  const pathname = usePathname();
  if (isWelcomePath(pathname)) return null;

  return (
    <Button
      asChild
      variant="outline"
      className="min-h-11 border-white/60 bg-white/90 px-3 text-[color:var(--brand-2)] hover:bg-white sm:px-4"
    >
      <Link href="/help" aria-label="Help">
        <HelpCircle className="h-4 w-4 sm:hidden" />
        <span className="hidden sm:inline">Help</span>
      </Link>
    </Button>
  );
}
