var path = require('path');
module.exports = {
  entry: path.resolve(__dirname, './app/index.js'),

  output: {
    path: path.resolve(__dirname, './public/build'),
    filename: "bundle.js"
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
    ]
  }
}
