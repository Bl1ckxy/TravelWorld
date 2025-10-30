const path = require('path');

module.exports = {
  // ...existing webpack config if any...
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|svg|eot)$/,
        type: 'asset/resource',
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      }
    ]
  }
};
