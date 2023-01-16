/** @type {import('next').NextConfig} */

const webpack = require("webpack");


const { parsed: myEnv } = require("dotenv").config({
  path: "../.env",
});

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
  images: {
    domains: ['127.0.0.1']
  },
  compress: true,
};

module.exports = nextConfig;

