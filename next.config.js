import { withPayload } from "@payloadcms/next/withPayload";

import redirects from "./redirects.js";

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    // Skip ESLint during builds in production/Docker
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item);
        const hostname = url.hostname;
        
        // Remove www. prefix to get base domain
        const baseHostname = hostname.replace(/^www\./, '');
        
        // Return both www and non-www versions
        return [
          {
            hostname: baseHostname,
            protocol: url.protocol.replace(":", ""),
          },
          {
            hostname: `www.${baseHostname}`,
            protocol: url.protocol.replace(":", ""),
          },
        ];
      }).flat(),
    ],
  },
  reactStrictMode: true,
  redirects,
};

export default withPayload(nextConfig);
