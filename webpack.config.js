const path = require('path');
const Dotenv = require('dotenv-webpack'); // Per gestire le variabili d'ambiente
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Per generare il file HTML con asset inclusi automaticamente
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Per estrarre CSS in file separati

module.exports = {
  // Punto di ingresso principale del progetto
  entry: './src/js/app.js',

  // Configurazione dell'output
  output: {
    filename: 'bundle.js', // Nome del file JS generato
    path: path.resolve(__dirname, 'dist'), // Cartella di output per tutti i file
    clean: true, // Pulisce la cartella di output prima di ogni build
    publicPath: '/Hacker-News/',
  },

  // Configurazione delle regole per i loader
  module: {
    rules: [
      {
        test: /\.css$/, // Gestisce i file CSS
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Estrae il CSS in file separati
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/i, // Gestisce immagini e favicon
        type: 'asset/resource', // Copia i file nella cartella di output
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Gestisce i file font
        type: 'asset/resource', // Copia i font nella cartella di output
      },
    ],
  },

  // Configurazione dei plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // File HTML di partenza
      favicon: './src/img/favicon.ico', // Favicon da includere
      inject: 'body', // Inserisce gli script nel body del file HTML
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css', // Nome del file CSS generato
    }),
    new Dotenv(), // Per gestire le variabili d'ambiente da un file .env
  ],

  // Ottimizzazione per l'ambiente di produzione
  optimization: {
    minimize: true, // Minimizza i file JS e CSS
  },

  // Configurazione del server di sviluppo (non utilizzato su GitHub Pages)
  devServer: {
    static: './dist', // Serve i file dalla cartella di output
    port: 3000, // Porta del server di sviluppo
    open: true, // Apre automaticamente il browser
  },

  // Modalità di configurazione (produzione per GitHub Pages)
  mode: 'production',

  // Disabilita i warning sulle dimensioni dei bundle
  performance: {
    hints: false,
  },
};
