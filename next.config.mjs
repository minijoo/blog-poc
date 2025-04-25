// ⚠️ Important! Please make sure the dependencies are up to date.
// You can refresh them in the Dependencies section (left-bottom on CodeSandbox)
import bundleAnalyzer from "@next/bundle-analyzer";

const configuration = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    return config;
  },
  // Support MDX files as pages:
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  // Support loading `.md`, `.mdx`:
  // webpack(config, options) {
  // config.module.rules.push({
  //   test: /\.mdx?$/,
  //   use: [
  //     // The default `babel-loader` used by Next:
  //     options.defaultLoaders.babel,
  //     {
  //       loader: "@mdx-js/loader",
  //       /** @type {import('@mdx-js/loader').Options} */
  //       options: {
  //         providerImportSource: "@mdx-js/react",
  //         /* jsxImportSource: …, otherOptions… */
  //       },
  //     },
  //   ],
  // });
  // return config;
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jordysbucket.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/public/assets/**",
      },
      {
        protocol: "https",
        hostname: "d1goytf13un2gh.cloudfront.net",
        port: "",
        pathname: "/assets/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(configuration);
