import { Fragment } from "react";
import CTAButton from "@/signature-recovery-protocol/components/CTAButton";
import { landingContent } from "@/signature-recovery-protocol/content/landing";
import { SRP_ROUTES } from "@/signature-recovery-protocol/constants/routes";

const { hero } = landingContent;

const pillars = hero.mantra[0]
  .split(".")
  .map((word) => word.trim())
  .filter(Boolean);

export default function HeroSection() {
  return (
    <section className="srp-section srp-hero" id="section-hero">
      <div className="srp-hero-ambient" aria-hidden="true" />
      <p className="srp-hero-ghost" aria-hidden="true">
        Récupérer
      </p>

      <div className="srp-container">
        <header className="srp-hero-intro">
          <div className="srp-hero-meta">
            <span>
              § I <span className="slash">/ VIII</span>
            </span>
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
                <span>PRÉPARER</span>
                <span className="sep">·</span>
                <span>SOUTENIR</span>
                <span className="sep">·</span>
                <span>ACCOMPAGNER</span>
                <span className="sep">·</span>
                <span>RÉCUPÉRER</span>
                <span className="sep">·</span>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="srp-hero-story">
          <div className="srp-hero-story-lead">
            <p className="srp-hero-story-text">
              Parce qu&apos;une intervention esthétique ne se résume pas uniquement à
              l&apos;acte chirurgical,{" "}
              <span className="srp-hero-story-mark">METCARE®</span> a imaginé une
              approche globale pensée pour accompagner votre corps, votre peau et votre
              confort{" "}
              <span className="srp-hero-story-em">avant, pendant et après</span> votre
              intervention.
            </p>
          </div>

          <div className="srp-hero-story-accent">
            <p className="srp-hero-story-kicker">
              <span className="srp-hero-story-kicker-num">24</span>
              <span className="srp-hero-story-kicker-unit">heures</span>
            </p>
            <p className="srp-hero-story-text srp-hero-story-text--secondary">
              Le{" "}
              <span className="srp-hero-story-protocol">SIGNATURE RECOVERY PROTOCOL™</span>{" "}
              associe nutrition ciblée, confort tissulaire, récupération cutanée et
              stratégie de récupération pensée sur 24 heures afin de transformer cette phase
              souvent inconfortable en une{" "}
              <span className="srp-hero-story-em">véritable expérience de soin</span>.
            </p>
          </div>
        </div>

        <div className="srp-hero-mantra" aria-label="Les quatre piliers">
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
