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

        <nav className="topbar-right" aria-label={ui.nav.quickAriaLabel}>
          {variant === "home" && (
            <>
              <a href="#section-philosophy">{ui.nav.philosophy}</a>
              <Link href={SRP_ROUTES.protocole}>{ui.nav.protocol}</Link>
              <Link href={SRP_ROUTES.checkout}>{ui.nav.order}</Link>
            </>
          )}
          {(variant === "checkout" || variant === "upsell") && (
            <Link href={SRP_ROUTES.landing}>{ui.nav.back}</Link>
          )}
          {variant === "thankyou" && (
            <span style={{ opacity: 0.55 }}>{ui.nav.confirmation}</span>
          )}
        </nav>
      </div>

      <nav id="srp-nav" className="topbar-nav" aria-label={ui.nav.mainAriaLabel}>
        <div className="topbar-nav__panel">
          <ul className="topbar-nav__list">
            {variant === "home" && (
              <>
                <li>
                  <a
                    href="#section-philosophy"
                    onClick={(e) => {
                      e.preventDefault();
                      close();
                      document.querySelector("#section-philosophy")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    {ui.nav.philosophy}
                  </a>
                </li>
                <li>
                  <Link href={SRP_ROUTES.protocole} onClick={close}>
                    {ui.nav.protocol}
                  </Link>
                </li>
                <li>
                  <Link className="topbar-nav__cta" href={SRP_ROUTES.checkout} onClick={close}>
                    {ui.nav.order}
                  </Link>
                </li>
              </>
            )}
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

      <div className="topbar-backdrop" aria-hidden={!open} onClick={close} />
    </header>
  );
}
