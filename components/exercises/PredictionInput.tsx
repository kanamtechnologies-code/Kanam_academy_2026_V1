"use client";

import * as React from "react";
import { Eye } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PredictionInputProps = {
  prompt: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

/** Free-text prediction box used before Run & check on predict-style exercises. */
export function PredictionInput({
  prompt,
  value,
  onChange,
  disabled,
  placeholder = "Type exactly what you think will happen…",
  className,
}: PredictionInputProps) {
  return (
    <div className={cn("rounded-2xl border border-violet-200 bg-violet-50/70 p-4", className)}>
      <div className="flex items-start gap-2">
        <Eye className="mt-0.5 h-4 w-4 shrink-0 text-violet-700" />
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-xs font-black uppercase tracking-wide text-violet-900">Predict first</p>
          <p className="text-sm font-medium text-slate-800">{prompt}</p>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            className="h-12 border-violet-200 bg-white text-base"
            aria-label="Your prediction"
          />
          <p className="text-xs text-violet-800/80">
            Write your prediction first — the real answer stays hidden until you check.
          </p>
        </div>
      </div>
    </div>
  );
}
