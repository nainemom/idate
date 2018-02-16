const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
function generateConfig (config = {
  minimize: false
}) {
  const filename = `${pkg.name}${config.minimize ? '.min' : ''}.js`
  const ret = {
    entry: path.join(__dirname, '/src/index.js'),
    devtool: 'source-map',
    output: {
      path: path.join(__dirname, '/dist'),
      filename,
      library: 'IDate',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader'
          },
          exclude: /node_modules/
        }
      ]
    },
    plugins: []
  }
  if (config.minimize) {
    ret.plugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }))
  }
  return ret
}

const ret = []
ret.push(generateConfig())
if (process.env.NODE_ENV === 'production') {
  ret.push(generateConfig({minimize: true}))
}
module.exports = ret
