"use client";

import * as React from "react";
import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DownloadCsvButton({
  href,
  label = "Download CSV",
  className,
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(href);
      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(json?.error || "Could not download CSV.");
      }
      const blob = await res.blob();
      const disposition = res.headers.get("content-disposition") || "";
      const match = /filename="([^"]+)"/.exec(disposition);
      const filename = match?.[1] || "kanam-insights.csv";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Download failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-xl"
        disabled={loading}
        onClick={() => void onClick()}
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
        {label}
      </Button>
      {error ? <p className="mt-1 text-xs font-semibold text-rose-700">{error}</p> : null}
    </div>
  );
}
