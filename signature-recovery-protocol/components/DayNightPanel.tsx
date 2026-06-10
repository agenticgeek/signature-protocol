"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

type DayNightPanelProps = {
  variant: "day" | "night";
  children: ReactNode;
};

export default function DayNightPanel({ variant, children }: DayNightPanelProps) {
  const ref = useRef<HTMLElement>(null);

  const updateSpotlight = (event: React.MouseEvent<HTMLElement>) => {
    const panel = ref.current;
    if (!panel) return;

    const frame = panel.querySelector<HTMLElement>(".srp-daynight-panel__frame");
    if (!frame) return;

    const { left, top, width, height } = frame.getBoundingClientRect();
    frame.style.setProperty("--spot-x", `${((event.clientX - left) / width) * 100}%`);
    frame.style.setProperty("--spot-y", `${((event.clientY - top) / height) * 100}%`);
    panel.classList.add("srp-daynight-panel--spotlight");
  };

  const clearSpotlight = () => {
    ref.current?.classList.remove("srp-daynight-panel--spotlight");
  };

  return (
    <article
      ref={ref}
      className={`srp-daynight-panel srp-daynight-panel--${variant}`}
      onMouseMove={updateSpotlight}
      onMouseLeave={clearSpotlight}
    >
      <div className="srp-daynight-panel__glow" aria-hidden="true" />
      <div className="srp-daynight-panel__frame">
        <span className="srp-daynight-panel__spotlight" aria-hidden="true" />
        {children}
      </div>
    </article>
  );
}
