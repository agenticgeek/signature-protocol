import { Fragment } from "react";

type VerbatimLinesProps = {
  lines: readonly string[];
  className?: string;
  as?: "p" | "div";
};

export default function VerbatimLines({
  lines,
  className = "",
  as: Tag = "p",
}: VerbatimLinesProps) {
  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <Fragment key={`${index}-${line}`}>
          {index > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </Tag>
  );
}
