import Image from "next/image";

type SrpSectionMediaProps = {
  label: string;
  title?: string;
  src?: string;
  alt?: string;
  aspect?: "wide" | "landscape" | "portrait" | "square";
  tone?: "light" | "dark" | "beige";
  fit?: "cover" | "contain";
  variant?: "product" | "editorial";
  priority?: boolean;
  className?: string;
};

export default function SrpSectionMedia({
  label,
  title,
  src,
  alt,
  aspect = "landscape",
  tone = "light",
  fit = "cover",
  variant = "editorial",
  priority = false,
  className = "",
}: SrpSectionMediaProps) {
  const imageAlt = alt ?? title ?? label;
  const isProduct = variant === "product";
  const imageFit =
    isProduct && (aspect === "square" || aspect === "portrait") ? "contain" : fit;

  return (
    <figure
      className={[
        "section-media",
        `section-media--${aspect}`,
        `section-media--${tone}`,
        "srp-section-media",
        src ? "section-media--has-image" : "",
        isProduct ? "section-media--product" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-media__frame">
        {src ? (
          <Image
            src={src}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 900px) 88vw, 720px"
            quality={90}
            className={`section-media__image section-media__image--${imageFit}`}
            priority={priority}
          />
        ) : (
          <>
            <div className="section-media__glow" aria-hidden="true" />
            <span className="section-media__glyph" aria-hidden="true">
              ⌁
            </span>
          </>
        )}
      </div>
      <figcaption className="section-media__caption">
        <span className="section-media__label">{label}</span>
        {title ? <span className="section-media__title">{title}</span> : null}
      </figcaption>
    </figure>
  );
}
