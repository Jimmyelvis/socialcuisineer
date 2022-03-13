const path = require("path");

module.exports = {
  devtool: "eval-source-map",
  entry: {
    home: "./assets/js/pages/HomePage.js",
    profilepage: "./assets/js/pages/ProfilePage.js",
    postdetail: "./assets/js/pages/PostDetailPage.js",
    login: "./assets/js/pages/Login.js",
    friendreq: "./assets/js/pages/FriendsReqPage.js",
    settings: "./assets/js/pages/SettingsPage.js",
    editpost: "./assets/js/pages/EditPost.js",
    addfriend: "./assets/js/modules/AddFriend.js",
    menubtns: "./assets/js/modules/MenuBtns.js",
    parallax: "./assets/js/modules/Parallax.js",
    removefriend: "./assets/js/modules/RemoveFriend.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./assets/js/dist"),
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
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.php$/,
        // file loader maybe?
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },
};
