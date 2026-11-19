"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import AmbassadorFormModal from "./AmbassadorFormModal";

type AmbassadorFormContextValue = {
  /** Opens the Ambassador Pro registration form (CTA 1 and CTA 2). */
  open: () => void;
};

const AmbassadorFormContext = createContext<AmbassadorFormContextValue | null>(null);

export function AmbassadorFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    // Remember the button that opened the form so focus can go back to it.
    triggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <AmbassadorFormContext.Provider value={value}>
      {children}
      <AmbassadorFormModal isOpen={isOpen} onClose={close} />
    </AmbassadorFormContext.Provider>
  );
}

export function useAmbassadorForm() {
  const context = useContext(AmbassadorFormContext);
  if (!context) {
    throw new Error("useAmbassadorForm must be used within AmbassadorFormProvider");
  }
  return context;
}
