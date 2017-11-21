'use strict';

module.exports = {
    entry: './src/main.js',
    output: {
      filename: './public/bundle.js'
    },

    watch: true,
    devtool: 'source-map'
  };