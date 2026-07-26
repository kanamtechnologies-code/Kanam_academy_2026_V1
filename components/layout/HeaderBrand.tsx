"use client";

import Image from "next/image";
import Link from "next/link";

/** Shared upper-left brand control — official Kanam Academy lockup (matches marketing site). */
export function HeaderBrand() {
  return (
    <Link
      href="/welcome"
      aria-label="Kanam Academy"
      className={[
        "group inline-flex min-w-0 max-w-[46%] shrink items-center rounded-2xl border border-[rgb(var(--accent-rgb)/0.95)] bg-white px-2 py-1.5 sm:max-w-none sm:px-3.5 sm:py-2.5",
        "transform-gpu transition-all duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-y-[1px] hover:bg-white",
        "active:translate-y-0 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.25)]",
      ].join(" ")}
    >
      <Image
        src="/images/kanam-logo-nav.png"
        alt=""
        width={348}
        height={104}
        className="h-7 w-auto max-w-full object-contain object-left sm:h-9"
        priority
        unoptimized
      />
      <span className="sr-only">Kanam Academy</span>
    </Link>
  );
}
