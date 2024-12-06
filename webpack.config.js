const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
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
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],  // ReactのJSXを変換するために追加
        },
      },
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
