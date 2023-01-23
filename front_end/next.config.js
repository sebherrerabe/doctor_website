/** @type {import('next').NextConfig} */

const webpack = require("webpack");

const { parsed: myEnv } = require("dotenv").config({
  path: "../.env",
});

const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
  images: {
    domains: ["127.0.0.1"],
  },
  compress: true,
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);