"use client";

import { useEffect } from "react";

function updateParallaxLayers() {
  const layers = document.querySelectorAll<HTMLElement>("[data-parallax-layer]");
  const viewHeight = window.innerHeight;

  layers.forEach((layer) => {
    const section = layer.closest(".srp-section");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const speed = Number(layer.dataset.parallaxSpeed ?? "0.35");
    const scale = Number(layer.dataset.parallaxScale ?? "1.18");
    const progress = (viewHeight - rect.top) / (viewHeight + rect.height);
    const offset = (progress - 0.5) * speed * 160;

    layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(${scale})`;
  });
}

export default function SrpScrollParallax() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateParallaxLayers();
        ticking = false;
      });
    };

    updateParallaxLayers();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
