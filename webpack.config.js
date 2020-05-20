/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isEnvDevelopment = process.env.NODE_ENV !== "production";

const resolve = (dir) => path.resolve(__dirname, dir);

const commonResolve = () => ({
  extensions: [".js", ".jsx", ".css", ".less"],
  alias: {
    ["@src"]: resolve("src"),
    ["@assets"]: resolve("src/ui/popup/public/assets"),
    ["@pages"]: resolve("src/ui/popup/pages"),
    ["@components"]: resolve("src/ui/popup/components"),
    ["@styles"]: resolve("src/ui/popup/styles"),
    ["@utils"]: resolve("src/ui/popup/utils"),
    ["@redux"]: resolve("src/ui/popup/redux"),
    ["@hooks"]: resolve("src/ui/hooks"),
  },
});
const lessRule = {
  test: /(\.css)|(\.less)$/,
  oneOf: [
    // if ext includes module as prefix, it perform by css loader.
    {
      test: /style(\.less)$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[local]_[hash:base64:8]",
            },
            localsConvention: "camelCase",
          },
        },
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    },
    {
      use: [
        MiniCssExtractPlugin.loader,
        { loader: "css-loader", options: { modules: false } },
        {
          loader: "less-loader",
          options: {
            modifyVars: {
              "@primary-color": "#0FCD8C",
              "@btn-primary-color": "#FFF",
            },
            javascriptEnabled: true,
          },
        },
      ],
    },
  ],
};
const fileRule = {
  test: /\.(svg|png|jpe?g|gif|woff|woff2|eot|ttf)$/i,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        publicPath: "assets",
        outputPath: "assets",
      },
    },
  ],
};
const reactRule = {
  test: /\.(js|jsx)$/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        "@babel/plugin-transform-runtime",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
        [
          "import",
          {
            libraryName: "antd",
            libraryDirectory: "es",
            style: true,
          },
        ],
      ],
    },
  },
  exclude: /node_modules/,
};

const eslintRule = {
  test: /\.(js|jsx)$/,
  use: {
    loader: "eslint-loader",
    options: {
      enforce: "pre",
    },
  },
  exclude: /node_modules/,
};

const extensionConfig = (env, args) => {
  return {
    name: "extension",
    mode: isEnvDevelopment ? "development" : "production",
    // In development environment, turn on source map.
    devtool: isEnvDevelopment ? "inline-source-map" : false,
    // In development environment, webpack watch the file changes, and recompile
    watch: isEnvDevelopment,
    entry: {
      popup: ["./src/ui/popup/popup.js"],
      background: ["./src/background/background.js"],
      contentScripts: ["./src/content-scripts/content-scripts.js"],
      injectedScript: ["./src/content-scripts/injected-script.js"],
    },
    output: {
      path: path.resolve(__dirname, isEnvDevelopment ? "dist" : "prod"),
      filename: "[name].bundle.js",
    },
    resolve: commonResolve(),
    optimization: {
      minimizer: [
        new TerserPlugin({
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [lessRule, eslintRule, reactRule, fileRule],
    },
    plugins: [
      // Remove all and write anyway
      // TODO: Optimizing build process
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin(
        [
          {
            from: "./src/manifest.json",
            to: "./",
          },
          {
            from: "node_modules/webextension-polyfill/dist/browser-polyfill.js",
          },
        ],
        { copyUnmodified: true },
      ),
      new HtmlWebpackPlugin({
        template: "./src/popup.html",
        filename: "popup.html",
        chunks: ["popup"],
      }),
      new WriteFilePlugin(),
      new webpack.EnvironmentPlugin(["NODE_ENV"]),
      new MiniCssExtractPlugin({
        filename: "css/[name]_[hash:8].css",
      }),
      new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    ],
  };
};

module.exports = extensionConfig;
