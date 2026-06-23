import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 95],
  },
  async redirects() {
    return [
      {
        source: "/signature-recovery-protocol",
        destination: "/",
        permanent: true,
      },
      {
        source: "/signature-recovery-protocol/protocole-complet",
        destination: "/protocole-complet",
        permanent: true,
      },
      {
        source: "/signature-recovery-protocol/checkout",
        destination: "/checkout",
        permanent: true,
      },
      {
        source: "/signature-recovery-protocol/upsell",
        destination: "/upsell",
        permanent: true,
      },
      {
        source: "/signature-recovery-protocol/merci",
        destination: "/merci",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
