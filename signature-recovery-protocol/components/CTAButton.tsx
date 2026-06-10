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
      {label}
      {!ghost ? <span aria-hidden="true">→</span> : null}
    </Link>
  );
}
