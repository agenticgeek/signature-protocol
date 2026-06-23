"use client";

import SrpStreamVideo from "@/signature-recovery-protocol/components/SrpStreamVideo";
import type { SrpVideoPlacement } from "@/signature-recovery-protocol/constants/videos";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

type SrpVideoMomentProps = {
  src: string;
  placement: SrpVideoPlacement;
};

export default function SrpVideoMoment({ src, placement }: SrpVideoMomentProps) {
  const { ui } = useSrpContent();

  return (
    <section
      className={`srp-video-moment srp-video-moment--${placement}`}
      aria-label={ui.video[placement]}
    >
      <div className="srp-video-moment__inner">
        <SrpStreamVideo
          src={src}
          className={`srp-stream-video--${placement}`}
          autoplay
          loop
          muted
          controls={false}
          playsWhenVisible
        />
      </div>
    </section>
  );
}
