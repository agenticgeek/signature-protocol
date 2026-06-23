"use client";

import { useEffect, useRef, useState } from "react";
import type Hls from "hls.js";

type SrpStreamVideoProps = {
  src: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsWhenVisible?: boolean;
  quality?: "auto" | "highest";
};

export default function SrpStreamVideo({
  src,
  className = "",
  autoplay = true,
  loop = true,
  muted = true,
  controls = false,
  playsWhenVisible = true,
  quality = "highest",
}: SrpStreamVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const attachSource = async () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        if (!cancelled) setIsReady(true);
        return;
      }

      const { default: HlsLib } = await import("hls.js");
      if (cancelled || !HlsLib.isSupported()) return;

      const hls = new HlsLib({
        autoStartLoad: false,
        capLevelToPlayerSize: false,
        enableWorker: true,
        lowLatencyMode: false,
        maxBufferLength: 45,
        maxMaxBufferLength: 90,
        startFragPrefetch: true,
      });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(HlsLib.Events.MANIFEST_PARSED, () => {
        if (quality === "highest" && hls.levels.length > 0) {
          const highestLevel = hls.levels.length - 1;
          hls.startLevel = highestLevel;
          hls.currentLevel = highestLevel;
          hls.nextLevel = highestLevel;
          hls.loadLevel = highestLevel;
        }

        hls.startLoad();
        if (!cancelled) setIsReady(true);
      });
    };

    attachSource();

    return () => {
      cancelled = true;
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [quality, src]);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || !isReady) return;

    const tryPlay = () => {
      if (!autoplay) return;
      video.play().catch(() => {
        /* autoplay may be blocked until interaction */
      });
    };

    if (!playsWhenVisible) {
      tryPlay();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [autoplay, isReady, playsWhenVisible]);

  return (
    <div
      ref={containerRef}
      className={[
        "srp-stream-video",
        isReady ? "srp-stream-video--ready" : "",
        !controls ? "srp-stream-video--chromeless" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <video
        ref={videoRef}
        className="srp-stream-video__el"
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
        {...(controls ? { controls: true } : {})}
      />
      <div className="srp-stream-video__veil" aria-hidden="true" />
    </div>
  );
}
