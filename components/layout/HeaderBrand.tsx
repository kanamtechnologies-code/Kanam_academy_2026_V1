"use client";

import Image from "next/image";
import Link from "next/link";

export function HeaderBrand() {
  // Always return to the welcome flow when clicking the brand.
  // (Keeps behavior predictable: "Kanam Academy" = onboarding/home base.)
  const href = "/welcome";

  return (
    <Link
      href={href}
      className="group flex items-center gap-1 rounded-2xl border border-[rgb(var(--accent-rgb)/0.95)] bg-white/95 px-2.5 py-1.5 shadow-lg transition hover:bg-white"
    >
      <Image
        src="/images/Logo.png"
        alt="Kanam Academy logo"
        width={44}
        height={44}
        className="relative -top-0.5 drop-shadow-[0_10px_14px_rgba(0,0,0,0.12)]"
        priority
      />
      <span className="text-base font-semibold tracking-tight sm:text-lg">
        <span className="sr-only">Kanam Academy</span>
        <span
          aria-hidden
          className="text-[color:var(--brand-2)] decoration-[rgb(var(--accent-rgb)/0.85)] decoration-2 underline-offset-4 group-hover:underline"
        >
          anam
        </span>{" "}
        <span className="text-[color:var(--brand-2)] decoration-[rgb(var(--accent-rgb)/0.85)] decoration-2 underline-offset-4 group-hover:underline">
          Academy
        </span>
      </span>
    </Link>
  );
}

