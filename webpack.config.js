const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    watchContentBase: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
