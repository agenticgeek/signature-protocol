"use client";

import { Fragment } from "react";
import CTAButton from "@/signature-recovery-protocol/components/CTAButton";
import { SRP_ROUTES } from "@/signature-recovery-protocol/constants/routes";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function HeroSection() {
  const { landing } = useSrpContent();
  const { hero } = landing;

  const pillars = hero.mantra[0]
    .split(".")
    .map((word) => word.trim())
    .filter(Boolean);

  return (
    <section className="srp-section srp-hero" id="section-hero">
      <div className="srp-hero-ambient" aria-hidden="true" />
      <p className="srp-hero-ghost" aria-hidden="true">
        {hero.ghostWord}
      </p>

      <div className="srp-container">
        <header className="srp-hero-intro">
          <div className="srp-hero-meta">
            <span>{hero.sectionNum}</span>
            <span>METCARE®</span>
          </div>

          <h1 className="srp-hero-title">
            <span className="srp-hero-title-line srp-hero-title-line--signature">
              SIGNATURE
            </span>
            <span className="srp-hero-title-line srp-hero-title-line--recovery">
              RECOVERY
            </span>
            <span className="srp-hero-title-line srp-hero-title-line--protocol">
              PROTOCOL<span className="tm">™</span>
            </span>
          </h1>

          <p className="srp-hero-tagline">{hero.tagline}</p>
        </header>

        <div className="srp-hero-rail" aria-hidden="true">
          <div className="srp-hero-rail-inner">
            {Array.from({ length: 2 }).map((_, loop) => (
              <Fragment key={loop}>
                {hero.railWords.map((word, i) => (
                  <Fragment key={`${loop}-${word}`}>
                    <span>{word}</span>
                    {i < hero.railWords.length - 1 ? <span className="sep">·</span> : null}
                  </Fragment>
                ))}
                <span className="sep">·</span>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="srp-hero-story">
          <div className="srp-hero-story-lead">
            <p className="srp-hero-story-text">
              {hero.storyLeadBefore}
              <span className="srp-hero-story-mark">METCARE®</span>
              {hero.storyLeadMiddle}
              <span className="srp-hero-story-em">{hero.storyLeadEmphasis}</span>
              {hero.storyLeadAfter}
            </p>
          </div>

          <div className="srp-hero-story-accent">
            <p className="srp-hero-story-kicker">
              <span className="srp-hero-story-kicker-num">{hero.storyHoursValue}</span>
              <span className="srp-hero-story-kicker-unit">{hero.storyHoursUnit}</span>
            </p>
            <p className="srp-hero-story-text srp-hero-story-text--secondary">
              {hero.storySecondaryBefore}
              <span className="srp-hero-story-protocol">{hero.storySecondaryProtocol}</span>
              {hero.storySecondaryMiddle}
              <span className="srp-hero-story-em">{hero.storySecondaryEmphasis}</span>
              {hero.storySecondaryAfter}
            </p>
          </div>
        </div>

        <div className="srp-hero-mantra" aria-label={hero.pillarsAriaLabel}>
          {pillars.map((word, i) => (
            <p className="srp-hero-mantra-line" key={word}>
              <span className="srp-hero-mantra-idx">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="srp-hero-mantra-word">{word}.</span>
            </p>
          ))}
        </div>

        <div className="srp-hero-outro">
          <p className="srp-hero-closing">{hero.closing}</p>
          <CTAButton
            className="srp-hero-cta"
            href={SRP_ROUTES.protocole}
            label={hero.ctaLabel}
          />
        </div>
      </div>
    </section>
  );
}
