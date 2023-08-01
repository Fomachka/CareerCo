const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  plugins: [
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: "[path][query]",
      algorithm: "gzip",
      deleteOriginalAssets: false,
    }),
  ],
};
