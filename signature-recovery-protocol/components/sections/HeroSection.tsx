"use client";

import { Fragment } from "react";
import Image from "next/image";
import CTAButton from "@/signature-recovery-protocol/components/CTAButton";
import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpStreamVideo from "@/signature-recovery-protocol/components/SrpStreamVideo";
import { SECTION_FEATURED_IMAGES, SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { useAmbassadorForm } from "@/signature-recovery-protocol/components/ambassador/AmbassadorFormProvider";
import { SRP_VIDEOS } from "@/signature-recovery-protocol/constants/videos";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

const TITLE_LINE_MODIFIERS = ["signature", "recovery", "protocol"] as const;

export default function HeroSection() {
  const { landing, ui } = useSrpContent();
  const { open: openAmbassadorForm } = useAmbassadorForm();
  const { hero } = landing;

  return (
    <section className="srp-section srp-hero" id="section-hero">
      <SrpParallaxBg
        src={SRP_BACKGROUNDS.gel}
        speed={0.42}
        opacity={0.22}
        align="right"
        priority
      />
      <SrpParallaxBg
        src={SRP_BACKGROUNDS.cream}
        speed={-0.28}
        opacity={0.1}
        align="left"
        scale={1.28}
        className="srp-parallax-bg--hero-quote"
      />

      <div className="srp-container">
        <div className="srp-hero-layout">
          <div className="srp-hero-content">
            <header className="srp-hero-intro">
              <div className="srp-hero-meta">
                <span>{hero.sectionNum}</span>
                <span>METCARE®</span>
              </div>

              <h1 className="srp-hero-title">
                {hero.titleLines.map((line, i) => (
                  <span
                    key={line}
                    className={`srp-hero-title-line srp-hero-title-line--${
                      TITLE_LINE_MODIFIERS[i] ?? "protocol"
                    }`}
                  >
                    {line}
                  </span>
                ))}
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

            <div className="srp-hero-story srp-hero-story--solo">
              <div className="srp-hero-story-lead">
                <p className="srp-hero-story-text">{hero.intro}</p>
              </div>
            </div>

            <div className="srp-hero-mantra" aria-label={hero.stepsAriaLabel}>
              {hero.steps.map((word, i) => (
                <p className="srp-hero-mantra-line" key={word}>
                  <span className="srp-hero-mantra-idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="srp-hero-mantra-word">{word}.</span>
                </p>
              ))}
            </div>

            <div className="srp-hero-outro srp-hero-outro--solo">
              <CTAButton
                className="srp-hero-cta"
                id="cta-join-hero"
                onClick={() => openAmbassadorForm("hero")}
                label={hero.ctaLabel}
              />
            </div>
          </div>

          <aside className="srp-hero-aside">
            <div className="srp-hero-video" aria-label={ui.video.opener}>
              <SrpStreamVideo
                src={SRP_VIDEOS.opener}
                className="srp-stream-video--hero"
                autoplay
                loop
                muted
                controls={false}
                playsWhenVisible
              />
            </div>

            <div className="srp-hero-showcase">
              <div className="srp-hero-showcase__slot srp-hero-showcase__primary">
                <Image
                  src={SECTION_FEATURED_IMAGES.hero.primary}
                  alt="METCARE®"
                  fill
                  sizes="(max-width: 900px) 72vw, 520px"
                  quality={90}
                  className="srp-hero-showcase__image"
                  priority
                />
              </div>
              <div className="srp-hero-showcase__slot srp-hero-showcase__secondary">
                <Image
                  src={SECTION_FEATURED_IMAGES.hero.secondary}
                  alt="METCARE®"
                  fill
                  sizes="(max-width: 900px) 40vw, 300px"
                  quality={90}
                  className="srp-hero-showcase__image"
                  style={{ objectPosition: "50% 78%" }}
                  priority
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
