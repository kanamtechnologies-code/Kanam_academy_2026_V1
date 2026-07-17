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
        "group inline-flex items-center rounded-2xl border border-[rgb(var(--accent-rgb)/0.95)] bg-white/95 px-2 py-1.5 sm:px-2.5 sm:py-2",
        "shadow-lg shadow-slate-950/10",
        "transform-gpu transition-all duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-y-[1px] hover:bg-white hover:shadow-xl hover:shadow-slate-950/15",
        "active:translate-y-0 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--brand-rgb)/0.25)]",
      ].join(" ")}
    >
      <Image
        src="/images/kanam-logo-nav.png"
        alt=""
        width={366}
        height={158}
        className="h-9 w-auto object-contain sm:h-11"
        priority
      />
      <span className="sr-only">Kanam Academy</span>
    </Link>
  );
}
