import Image from "next/image";

type SrpParallaxBgProps = {
  src: string;
  speed?: number;
  opacity?: number;
  align?: "left" | "center" | "right";
  scale?: number;
  className?: string;
  priority?: boolean;
};

export default function SrpParallaxBg({
  src,
  speed = 0.35,
  opacity = 0.2,
  align = "right",
  scale = 1.18,
  className = "",
  priority = false,
}: SrpParallaxBgProps) {
  return (
    <div className={`srp-parallax-bg ${className}`.trim()} aria-hidden="true">
      <div
        className={`srp-parallax-bg__layer srp-parallax-bg__layer--${align}`}
        data-parallax-layer
        data-parallax-speed={speed}
        data-parallax-scale={scale}
        style={{ opacity }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          className="srp-parallax-bg__image"
          priority={priority}
        />
      </div>
      <div className="srp-parallax-bg__veil" />
    </div>
  );
}
