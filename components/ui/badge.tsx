import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-extrabold tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--brand)] text-white",
        secondary:
          "border-transparent bg-slate-100 text-slate-900",
        outline: "text-slate-950",
        success:
          "border-transparent bg-emerald-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

