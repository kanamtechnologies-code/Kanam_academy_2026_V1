"use client";

import * as React from "react";

type LessonHelpPocketContextValue = {
  /** True while a lesson page has registered a help pocket. */
  available: boolean;
  /** Sheet is open. */
  open: boolean;
  /** Whether any panel wants attention (badge on nav button). */
  attention: boolean;
  register: (opts: { defaultPanelId?: string | null; hasAttention?: boolean }) => void;
  unregister: () => void;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  setAttention: (on: boolean) => void;
  /** Preferred panel id when opening from the nav button. */
  preferredPanelId: string | null;
  setPreferredPanelId: (id: string | null) => void;
};

const LessonHelpPocketContext = React.createContext<LessonHelpPocketContextValue | null>(null);

export function LessonHelpPocketProvider({ children }: { children: React.ReactNode }) {
  const [available, setAvailable] = React.useState(false);
  const [open, setOpenState] = React.useState(false);
  const [attention, setAttention] = React.useState(false);
  const [preferredPanelId, setPreferredPanelId] = React.useState<string | null>(null);

  const register = React.useCallback(
    (opts: { defaultPanelId?: string | null; hasAttention?: boolean }) => {
      setAvailable(true);
      if (opts.defaultPanelId) setPreferredPanelId(opts.defaultPanelId);
      if (opts.hasAttention != null) setAttention(opts.hasAttention);
    },
    []
  );

  const unregister = React.useCallback(() => {
    setAvailable(false);
    setOpenState(false);
    setAttention(false);
    setPreferredPanelId(null);
  }, []);

  const setOpen = React.useCallback((next: boolean) => {
    setOpenState(next);
  }, []);

  const toggle = React.useCallback(() => {
    setOpenState((v) => !v);
  }, []);

  const value = React.useMemo(
    () => ({
      available,
      open,
      attention,
      register,
      unregister,
      setOpen,
      toggle,
      setAttention,
      preferredPanelId,
      setPreferredPanelId,
    }),
    [
      available,
      open,
      attention,
      register,
      unregister,
      setOpen,
      toggle,
      preferredPanelId,
    ]
  );

  return (
    <LessonHelpPocketContext.Provider value={value}>{children}</LessonHelpPocketContext.Provider>
  );
}

export function useLessonHelpPocket() {
  const ctx = React.useContext(LessonHelpPocketContext);
  if (!ctx) {
    throw new Error("useLessonHelpPocket must be used within LessonHelpPocketProvider");
  }
  return ctx;
}

/** Safe for header chrome — returns null when provider is missing. */
export function useLessonHelpPocketOptional() {
  return React.useContext(LessonHelpPocketContext);
}
