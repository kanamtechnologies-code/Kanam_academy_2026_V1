"use client";

import * as React from "react";
import { Check, Clipboard, Download, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ClassQrCard({
  joinUrl,
  classCode,
  downloadHref,
  compact = false,
  tone = "default",
}: {
  joinUrl: string;
  classCode: string;
  downloadHref?: string;
  compact?: boolean;
  tone?: "default" | "hero";
}) {
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<"code" | "link" | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    import("qrcode")
      .then((mod) => {
        const QRCode = mod.default ?? mod;
        return QRCode.toDataURL(joinUrl, {
          width: compact ? 220 : 320,
          margin: 1,
          errorCorrectionLevel: "M",
          color: { dark: "#0f172a", light: "#ffffff" },
        });
      })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [joinUrl, compact]);

  async function copy(text: string, kind: "code" | "link") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied((c) => (c === kind ? null : c)), 1100);
    } catch {
      // ignore
    }
  }

  const hero = tone === "hero";

  return (
    <div
      className={
        hero
          ? "flex w-full flex-col items-center gap-3"
          : compact
            ? "flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3"
            : "grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-[auto_1fr]"
      }
    >
      <div
        className={
          hero
            ? "grid place-items-center rounded-[28px] bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.28)] ring-2 ring-[rgb(var(--accent-rgb)/0.85)]"
            : "mx-auto grid place-items-center rounded-2xl border border-slate-100 bg-slate-50 p-2"
        }
      >
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={dataUrl}
            alt={`QR code for class ${classCode}`}
            width={compact ? 132 : 176}
            height={compact ? 132 : 176}
            className={
              hero
                ? "h-[148px] w-[148px] lg:h-[168px] lg:w-[168px]"
                : "h-[132px] w-[132px] sm:h-[176px] sm:w-[176px]"
            }
          />
        ) : (
          <div
            className={
              hero
                ? "grid h-[148px] w-[148px] place-items-center text-slate-400 lg:h-[168px] lg:w-[168px]"
                : "grid h-[132px] w-[132px] place-items-center text-slate-400 sm:h-[176px] sm:w-[176px]"
            }
          >
            <QrCode className="h-10 w-10" />
          </div>
        )}
      </div>
      <div className={hero ? "w-full min-w-0 space-y-3 text-center" : "min-w-0 space-y-3"}>
        {hero ? (
          <p className="font-mono text-lg font-black tracking-wide text-white">{classCode}</p>
        ) : (
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-600">
              Scan to join
            </p>
            <p className="mt-1 font-mono text-base font-black text-slate-900">{classCode}</p>
            <p className="mt-1 break-all text-xs text-slate-600">{joinUrl}</p>
          </div>
        )}
        <div className={hero ? "flex flex-wrap justify-center gap-2" : "flex flex-wrap gap-2"}>
          <Button
            type="button"
            variant="outline"
            className={
              hero
                ? "h-10 rounded-xl border-white/40 bg-white/15 text-white hover:bg-white/25"
                : "h-10 rounded-xl"
            }
            onClick={() => copy(classCode, "code")}
          >
            {copied === "code" ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
            {copied === "code" ? "Copied" : "Copy code"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className={
              hero
                ? "h-10 rounded-xl border-white/40 bg-white/15 text-white hover:bg-white/25"
                : "h-10 rounded-xl"
            }
            onClick={() => copy(joinUrl, "link")}
          >
            {copied === "link" ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
            {copied === "link" ? "Copied" : "Copy link"}
          </Button>
          {downloadHref ? (
            <Button
              type="button"
              className={
                hero
                  ? "h-10 rounded-xl bg-[rgb(var(--accent-rgb)/0.95)] text-slate-950 hover:bg-[#c9a84e]"
                  : "h-10 rounded-xl"
              }
              asChild
            >
              <a href={downloadHref} download>
                <Download className="h-4 w-4" />
                Download QR
              </a>
            </Button>
          ) : dataUrl ? (
            <Button
              type="button"
              className={
                hero
                  ? "h-10 rounded-xl bg-[rgb(var(--accent-rgb)/0.95)] text-slate-950 hover:bg-[#c9a84e]"
                  : "h-10 rounded-xl"
              }
              asChild
            >
              <a href={dataUrl} download={`kanam-${classCode.toLowerCase()}-qr.png`}>
                <Download className="h-4 w-4" />
                Download QR
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
