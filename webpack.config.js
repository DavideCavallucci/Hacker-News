const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './asset/js/app.js', // input
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // output
    clean: true, // per pulire la cartella 'dist' a ogni build
  },
  module: {
    rules: [
      {
        test: /\.css$/, // regola per i file CSS
        use: ['style-loader', 'css-loader'], // loader per il CSS
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // regola per le immagini
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // template di base per l'HTML
      favicon: './asset/img/Favicon.png', // gestione della favicon automatica
    }),
    new Dotenv(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // cartella per il bundle
    },
    compress: true, // compressione gzip
    port: 9000, // porta del server
    open: true, // apertura automatica del browser
  },
  mode: 'development', // modalità di sviluppo o pruduzione
};