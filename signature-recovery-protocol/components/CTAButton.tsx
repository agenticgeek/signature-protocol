import Link from "next/link";

type CTAButtonProps = {
  /** Destination. Omit it and pass `onClick` to render a <button> instead. */
  href?: string;
  onClick?: () => void;
  label: string;
  id?: string;
  className?: string;
  ghost?: boolean;
};

export default function CTAButton({
  href,
  onClick,
  label,
  id,
  className = "",
  ghost = false,
}: CTAButtonProps) {
  const classes = `srp-cta${ghost ? " srp-cta--ghost" : ""} ${className}`.trim();
  const content = (
    <>
      <span className="srp-cta__label">{label}</span>
      {!ghost ? <span className="srp-cta__arrow" aria-hidden="true">→</span> : null}
    </>
  );

  if (!href) {
    return (
      <button type="button" className={classes} id={id} onClick={onClick} aria-haspopup="dialog">
        {content}
      </button>
    );
  }

  // Another site (e.g. the training site) opens in a new tab, keeping this page.
  if (/^https?:\/\//.test(href)) {
    return (
      <a className={classes} href={href} id={id} onClick={onClick} target="_blank" rel="noopener">
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} id={id} onClick={onClick}>
      {content}
    </Link>
  );
}
