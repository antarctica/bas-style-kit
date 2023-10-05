var path = require('path');

module.exports = {
    entry: './assets/javascripts/bootstrap-bsk.js',
    output: {
      path: path.resolve(__dirname, 'dist/js'),
      filename: 'bas-style-kit.min.js',
    },
    optimization: {
        minimize: true
    },
};