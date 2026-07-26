"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle } from "lucide-react";

import { useLessonHelpPocketOptional } from "@/components/lesson/LessonHelpPocketContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function isWelcomePath(pathname: string | null) {
  if (!pathname) return false;
  return pathname === "/welcome" || pathname.startsWith("/welcome/");
}

/** Help is redundant on welcome (page already links to it). */
export function HeaderHelp() {
  const pathname = usePathname();
  const helpPocket = useLessonHelpPocketOptional();
  if (isWelcomePath(pathname)) return null;

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className={cn(
        "h-10 w-10 shrink-0 rounded-full border-white/60 bg-white/90 text-[color:var(--brand-2)] hover:bg-white sm:h-11 sm:w-auto sm:rounded-xl sm:px-4 dark:border-white/60 dark:bg-white/90 dark:text-[color:var(--brand-2)] dark:hover:bg-white",
        // Lesson phone/tablet already has Help Pocket — keep /help from lg up.
        helpPocket?.available && "hidden lg:inline-flex"
      )}
    >
      <Link href="/help" aria-label="Help">
        <HelpCircle className="h-4 w-4 sm:hidden" />
        <span className="hidden sm:inline">Help</span>
      </Link>
    </Button>
  );
}
