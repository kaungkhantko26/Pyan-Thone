/** @type {import('next').NextConfig} */
// GitHub Pages serves the app from a sub-path (/Pyan-Thone) and needs a static
// export. Vercel serves it from the domain root, so the base path must be off.
const ghPages = process.env.GITHUB_PAGES === "true";
const repo = "Pyan-Thone";

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: ghPages ? `/${repo}` : "",
  assetPrefix: ghPages ? `/${repo}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: ghPages ? `/${repo}` : "",
  },
};

export default nextConfig;
