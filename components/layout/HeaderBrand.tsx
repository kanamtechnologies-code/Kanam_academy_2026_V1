"use client";

import Image from "next/image";
import Link from "next/link";

export function HeaderBrand() {
  // Always return to the welcome flow when clicking the brand.
  // (Keeps behavior predictable: "Kanam Academy" = onboarding/home base.)
  const href = "/welcome";

  return (
    <Link href={href} className="flex items-center gap-1">
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
  );
}

