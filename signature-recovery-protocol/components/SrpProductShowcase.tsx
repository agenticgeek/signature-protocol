import Image from "next/image";

type SrpProductShowcaseProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  title?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fluid?: boolean;
};

export default function SrpProductShowcase({
  src,
  width,
  height,
  alt,
  label,
  title,
  priority = false,
  className = "",
  sizes = "(max-width: 1240px) 100vw, 1240px",
  fluid = false,
}: SrpProductShowcaseProps) {
  return (
    <figure
      className={`srp-product-showcase ${className}`.trim()}
      style={fluid ? undefined : { maxWidth: width }}
    >
      <div className="srp-product-showcase__frame">
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes={sizes}
          quality={95}
          priority={priority}
          className="srp-product-showcase__image"
        />
      </div>
      <figcaption className="srp-product-showcase__caption">
        <span className="srp-product-showcase__label">{label}</span>
        {title ? <span className="srp-product-showcase__title">{title}</span> : null}
      </figcaption>
    </figure>
  );
}
