const path = require('path');
const Dotenv = require('dotenv-webpack'); // Per gestire le variabili d'ambiente
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Per generare il file HTML con asset inclusi automaticamente

module.exports = {
  entry: './src/js/app.js', // File di ingresso principale del progetto
  output: {
    filename: 'bundle.js', // Nome del file bundle generato
    path: path.resolve(__dirname, 'dist'), // Cartella di output
    clean: true, // Pulisce la cartella di output prima di ogni build
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Regola per gestire i file CSS
        use: ['style-loader', 'css-loader'], // Applica i loader CSS
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/i, // Per immagini e favicon
        type: 'asset/resource', // Copia i file nella cartella di output
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Per font
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // File HTML di partenza
      favicon: './src/img/favicon.ico', // Percorso della favicon
    }),
    new Dotenv(), // Per le variabili d'ambiente
  ],
  optimization: {
    minimize: true, // Minimizza i file per l'ambiente di produzione
  },
  devServer: {
    static: './dist', // Serve i file dalla cartella di output
    port: 3000, // Porta del server di sviluppo
    open: true, // Apre automaticamente il browser
  },
  mode: 'development', // Modalità di sviluppo (o 'production' per la produzione)
  performance: {
    hints: false, // Disabilita i warning sulle prestazioni
  },
};
