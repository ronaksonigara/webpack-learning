const path = require("path");

const HTMLWebpackPlugin = require("html-webpack-plugin");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  //Define Mode
  mode: "development",

  // The base directory, an absolute path, for resolving entry points and loaders from the configuration.
  context: path.resolve(__dirname, "src"),

  //
  entry: {
    bundle: "./index.js",
    // bundle2: "./index.js",
    // home: { import: "./index.js", filename: "pages/[name].js" },
  },

  //
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "assets/[name][ext]",
  },

  devtool: "source-map",

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      template: "./index.html",
    }),
    new BundleAnalyzerPlugin(),
  ],
};
