import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// createMDX returns a wrapper function that adds MDX support to Next.js.
// remark and rehype plugins can be added here later if needed.
const withMDX = createMDX({});

const nextConfig: NextConfig = {
    reactStrictMode: true,

    // Allow the dev server to be accessed via 127.0.0.1 in addition to localhost
    allowedDevOrigins: ["127.0.0.1"],

    /*
      output: "export" compiles the entire site to static files at build time.
      The result is an out/ folder with plain HTML, CSS, and JS — no server needed.
      Trade-off: server-only features (API routes, image optimisation) are unavailable.
    */
    output: "export",

    /*
      Treat .md and .mdx files as valid page/component files,
      in addition to the default .ts and .tsx.
    */
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

    images: {
        /*
          Next.js image optimisation requires a running server.
          With static export we disable it — images are served as-is.
        */
        unoptimized: true,
    },
};

// Wrap nextConfig with MDX support and export the result
export default withMDX(nextConfig);