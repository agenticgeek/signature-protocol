"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import LanguageSwitch from "@/signature-recovery-protocol/components/LanguageSwitch";
import { SRP_ROUTES } from "@/signature-recovery-protocol/constants/routes";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

type SrpNavbarProps = {
  variant?: "home" | "checkout" | "thankyou" | "upsell";
};

export default function SrpNavbar({ variant = "home" }: SrpNavbarProps) {
  const { ui } = useSrpContent();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.classList.add("nav-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => {
      if (mq.matches) close();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [close]);

  // The three home links (Philosophie / Le protocole / Commander) all point at the
  // SRP offer and no new labels were supplied, so they are not rendered (Q-4 / Y2).
  // To restore, re-add them here and in the mobile panel below.
  const hasNavLinks = variant !== "home";

  const brand = (
    <>
      METCARE<span className="sup">®</span>
    </>
  );

  return (
    <header className={`topbar topbar--${variant}${open ? " topbar--open" : ""}`}>
      {variant === "home" ? (
        <div className="brand">{brand}</div>
      ) : (
        <Link className="brand" href={SRP_ROUTES.landing} onClick={close}>
          {brand}
        </Link>
      )}

      <div className="topbar-end">
        <LanguageSwitch />

        {hasNavLinks ? (
        <button
          type="button"
          className="topbar-menu-btn"
          aria-expanded={open}
          aria-controls="srp-nav"
          onClick={toggle}
        >
          <span className="visually-hidden">
            {open ? ui.nav.closeMenu : ui.nav.openMenu}
          </span>
          <span className="topbar-menu-icon" aria-hidden="true" />
        </button>
        ) : null}

        {hasNavLinks ? (
          <nav className="topbar-right" aria-label={ui.nav.quickAriaLabel}>
            {(variant === "checkout" || variant === "upsell") && (
              <Link href={SRP_ROUTES.landing}>{ui.nav.back}</Link>
            )}
            {variant === "thankyou" && (
              <span style={{ opacity: 0.55 }}>{ui.nav.confirmation}</span>
            )}
          </nav>
        ) : null}
      </div>

      {hasNavLinks ? (
        <nav id="srp-nav" className="topbar-nav" aria-label={ui.nav.mainAriaLabel}>
          <div className="topbar-nav__panel">
            <ul className="topbar-nav__list">
              {(variant === "checkout" || variant === "upsell") && (
                <li>
                  <Link href={SRP_ROUTES.landing} onClick={close}>
                    {ui.nav.backHome}
                  </Link>
                </li>
              )}
              {variant === "thankyou" && (
                <li>
                  <Link href={SRP_ROUTES.landing} onClick={close}>
                    {ui.nav.home}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      ) : null}

      {hasNavLinks ? (
        <div className="topbar-backdrop" aria-hidden={!open} onClick={close} />
      ) : null}
    </header>
  );
}
