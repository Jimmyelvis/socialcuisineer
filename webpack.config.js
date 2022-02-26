const path = require("path");

module.exports = {
  devtool: "eval-source-map",
  entry: "./assets/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./assets/js"),
    publicPath: "",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },

};
