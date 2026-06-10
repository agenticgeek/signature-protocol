"use client";

import { useEffect } from "react";

const REVEAL_TARGETS = ".srp-section, .srp-checkout";

export default function SrpScrollReveal() {
  useEffect(() => {
    const funnel = document.querySelector(".srp-funnel");
    funnel?.classList.add("srp-reveal-enabled");

    const nodes = document.querySelectorAll<HTMLElement>(REVEAL_TARGETS);
    if (!nodes.length) {
      return () => funnel?.classList.remove("srp-reveal-enabled");
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      nodes.forEach((node) => node.classList.add("srp-reveal--active"));
      return () => funnel?.classList.remove("srp-reveal-enabled");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("srp-reveal--active");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      funnel?.classList.remove("srp-reveal-enabled");
    };
  }, []);

  return null;
}
