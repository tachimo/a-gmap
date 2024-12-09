const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'build'),
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
    new HtmlWebpackPlugin({ // 自動生成の設定
      template: path.resolve(__dirname, 'public/index.html'), // `public/index.html` をテンプレートとして使用
      filename: 'index.html', // 出力先のファイル名
    }),
  ],
};
