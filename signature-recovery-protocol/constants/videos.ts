export const SRP_VIDEOS = {
  opener:
    "https://customer-33e06r8tfld09gay.cloudflarestream.com/8149af1a113967ded176706f19fdd808/manifest/video.m3u8",
  interlude:
    "https://customer-33e06r8tfld09gay.cloudflarestream.com/060794c9a666d7188d6c2ea425ce9ed4/manifest/video.m3u8",
  closer:
    "https://customer-33e06r8tfld09gay.cloudflarestream.com/ca6b371f405ba53e53e8d551b1d7347e/manifest/video.m3u8",
} as const;

export type SrpVideoPlacement = "opener" | "interlude" | "closer";
