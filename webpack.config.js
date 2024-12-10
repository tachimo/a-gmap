const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'; // モードを判定

  return {
    entry: {
      app: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'js/bundle.js',
      clean: true,
      publicPath: '/',
    },
    mode: argv.mode || 'development', // mode の設定
    devtool: isProduction ? 'source-map' : 'eval-source-map', // ソースマップの設定
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
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
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode || 'development'),
      }),
    ],
  };
};
