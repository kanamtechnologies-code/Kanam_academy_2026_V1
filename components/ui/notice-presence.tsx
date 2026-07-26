"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

const noticeMotion = {
  initial: { height: 0, opacity: 0, y: -8 },
  animate: { height: "auto", opacity: 1, y: 0 },
  exit: { height: 0, opacity: 0, y: -6 },
  transition: { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.7 },
};

/**
 * Soft height/opacity enter+exit for conditional notices and prompts.
 */
export function NoticePresence({
  show,
  children,
  className,
  contentKey,
}: {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  /** Remount when the message text changes so the enter anim plays again. */
  contentKey?: string | number | null;
}) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      {show ? (
        <motion.div
          key={contentKey ?? "notice"}
          {...noticeMotion}
          className={cn("overflow-hidden", className)}
        >
          <div className="pb-px">{children}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
