const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'app.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    port: 8080,
    open: true,
    historyApiFallback: true,
  },
  devtool: "eval-source-map",
  mode: 'development',
  module: {
    rules: [{
      test: /\.css$/,
      use: ["style-loader","css-loader"],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
     },
   ],
  },
  plugins: [
    new ESLintPlugin({ 
      extensions: ['js'],
      exclude: 'node_modules',
    }),
  ],
};
