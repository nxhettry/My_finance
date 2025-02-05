import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  matcher: ["/api/private/:path*"],
};

export default nextConfig;
