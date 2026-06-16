import Link from "next/link";

type CTAButtonProps = {
  href: string;
  label: string;
  className?: string;
  ghost?: boolean;
};

export default function CTAButton({
  href,
  label,
  className = "",
  ghost = false,
}: CTAButtonProps) {
  return (
    <Link
      className={`srp-cta${ghost ? " srp-cta--ghost" : ""} ${className}`.trim()}
      href={href}
    >
      <span className="srp-cta__label">{label}</span>
      {!ghost ? <span className="srp-cta__arrow" aria-hidden="true">→</span> : null}
    </Link>
  );
}
