const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/entry.js",
  output: {
    path: path.join(__dirname, 'public', 'javascript'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  devtool: 'source-map'
};
