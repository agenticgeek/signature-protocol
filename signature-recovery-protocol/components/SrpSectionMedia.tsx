import Image from "next/image";

type SrpSectionMediaProps = {
  /** Caption label. Omit both label and title to render no caption at all. */
  label?: string;
  title?: string;
  src?: string;
  alt?: string;
  aspect?: "wide" | "landscape" | "portrait" | "square";
  tone?: "light" | "dark" | "beige";
  fit?: "cover" | "contain";
  variant?: "product" | "editorial";
  /** Full-bleed photograph: always fills the frame, never letterboxed. */
  photo?: boolean;
  /** CSS object-position — which part of the photo to keep when it is cropped. */
  position?: string;
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
  photo = false,
  position,
  priority = false,
  className = "",
}: SrpSectionMediaProps) {
  const imageAlt = alt ?? title ?? label ?? "";
  const hasCaption = Boolean(label || title);
  const isProduct = variant === "product";
  const imageFit = photo
    ? "cover"
    : isProduct && (aspect === "square" || aspect === "portrait")
      ? "contain"
      : fit;

  return (
    <figure
      className={[
        "section-media",
        `section-media--${aspect}`,
        `section-media--${tone}`,
        "srp-section-media",
        src ? "section-media--has-image" : "",
        isProduct ? "section-media--product" : "",
        photo ? "section-media--photo" : "",
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
            style={position ? { objectPosition: position } : undefined}
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
      {hasCaption ? (
        <figcaption className="section-media__caption">
          {label ? <span className="section-media__label">{label}</span> : null}
          {title ? <span className="section-media__title">{title}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
