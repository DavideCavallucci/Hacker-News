const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Per generare il file HTML con asset inclusi automaticamente
const Dotenv = require('dotenv-webpack'); // Per gestire le variabili d'ambiente

module.exports = {
  entry: './src/js/app.js', // input
  output: {
    path: path.resolve(__dirname, 'dist'), // Cartella di output per tutti i file
    filename: 'bundle.js', // Nome del file JS generato
    clean: true, // Pulisce la cartella 'Dist' prima di ogni build
    publicPath: 'Hacker-News',
  },
  module: {
    rules: [
      {
        test: /\.css$/, // regola per i file CSS
        use: ['style-loader', 'css-loader'], // loader per il CSS
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/i, // Gestisce immagini e favicon
        type: 'asset/resource', // Copia i file nella cartella di output
        generator: {
          filename: 'img/[name][ext][query]' // Immagini vengono messe nella cartella "images"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Gestisce i file font
        type: 'asset/resource', // Copia i font nella cartella di output
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // template di base per l'HTML
      favicon: './src/img/favicon.ico', // gestione della favicon automatica
      inject: 'body', // Inserisce gli script nel body del file HTML
      minify: false // Disabilita la minificazione
    }),
    new Dotenv(), // Per gestire le variabili d'ambiente da un file .env
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // cartella per il bundle
    },
    compress: true, // compressione gzip
    port: 3000, // porta del server
    open: true, // apertura automatica del browser
  },
  mode: 'production', // modalità di sviluppo o pruduzione

  // Disabilita i warning sulle dimensioni dei bundle
  performance: {
    hints: false,
  },
};
