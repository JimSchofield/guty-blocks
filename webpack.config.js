const path = require('path');

module.exports = {
  entry: {
    "media-block": './src/media-block/media-block.js'
  },
  output: {
    path: path.resolve(__dirname, 'blocks'),
    filename: '[name].build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  stats: {
    colors: true
  }
};