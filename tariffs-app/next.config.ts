import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Замени 'tariffs-app' на точное название твоего репозитория на GitHub
  basePath: "/tariffs-app",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
