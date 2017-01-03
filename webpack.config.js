module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/all.js'
  },
  resolve: {
    extensions: [
      '', '.js', '.jsx', '.tsx',
    ]
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [
          'babel-loader'
        ],
        exclude: [
          /node_modules/
        ]
      },
    ]
  }
}
