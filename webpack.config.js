const path = require('path');

module.exports = {
  entry: './src/main.ts', // Entry point del tuo codice TypeScript
  output: {
    filename: 'bundle.js', // Il file che verrà generato dopo la compilazione
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'], // Estensioni che Webpack processa
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Processa i file .ts con TypeScript loader
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development', // Imposta la modalità (development o production)
};