var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    entry: './src/main.js',
    styles: './src/styles/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
        options: {
          loaders: {
            sass: [
              'vue-style-loader',
              'css-loader',
              'svg-fill-loader/encodeSharp',
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    './src/styles/config/variables.sass',
                    './src/styles/config/extend.sass',
                    './src/styles/config/mixins.sass'
                  ]
                }
              }
            ]
          }
        }
      }, 'eslint-loader']
    },
    {
      test: /\.js$/,
      use: ['babel-loader', 'eslint-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.sass$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader?indentedSyntax'
      ]
    },
    {
      test: /\.(png|jpeg|jpg|gif|woff|woff2|ico)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    },
    {
      test: /\.svg$/,
      use: [
        'url-loader',
        {
          loader: 'svg-fill-loader?fill=white'
        }
      ]
    }]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'img': path.resolve(__dirname, 'src/assets/img'),
      'fonts': path.resolve(__dirname, 'src/assets/fonts')
    },
    extensions: ['.js', '.vue'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src/components')
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    open: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
