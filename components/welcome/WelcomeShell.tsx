import * as React from "react";

export function WelcomeShell({
  title,
  subtitle,
  children,
  containerClassName,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}) {
  return (
    <div className={["w-full max-w-3xl", containerClassName ?? ""].join(" ")}>
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 text-base text-slate-700 sm:text-lg">{subtitle}</p>
        ) : null}
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

