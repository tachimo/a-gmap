const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: __dirname + '/public/js',
    filename: "[name].js"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // 静的ファイルのルートディレクトリ
    },
    devMiddleware: {
      publicPath: '/js/', // publicPath は devMiddleware 内に移動
    },
    port: 8080,
    hot: true, // ホットリロードを有効化
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
