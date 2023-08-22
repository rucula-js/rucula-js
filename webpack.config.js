const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ['./index.ts'],
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
        template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
        filename:"style.css"
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    port: 8080,
    watchFiles: ['public/**/*'],
  },
  mode: 'development'
};