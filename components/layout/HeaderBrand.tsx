"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const USER_NAME_KEY = "kanam.userName";

function hasUserName(): boolean {
  try {
    return !!window.localStorage.getItem(USER_NAME_KEY);
  } catch {
    return false;
  }
}

export function HeaderBrand() {
  const pathname = usePathname();
  const [ready, setReady] = React.useState(false);
  const [hasName, setHasName] = React.useState(false);

  React.useEffect(() => {
    setHasName(hasUserName());
    setReady(true);
  }, []);

  const isWelcome = pathname?.startsWith("/welcome");

  // While loading, default to dashboard.
  const href = !ready
    ? "/"
    : isWelcome || !hasName
      ? "/welcome?step=greeting"
      : "/";

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

