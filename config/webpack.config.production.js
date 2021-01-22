// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const moment = require('moment')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const pkg = require('../package.json')
const externals = {}

Object.keys(pkg.dependencies).map(item => {
  externals[item] = 1
})

const rules = require('./webpack.rules')
module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'main.js',
    chunkFilename: '[name].[hash].js'
  },
  target: 'electron-renderer',
  externals: [
    function(context, request, callback) {
      if (externals[request]) {
        callback(null, 'commonjs ' + request)
      } else {
        callback()
      }
    }
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules', 'src'],
    alias: {
      '@constants': resolve('constants'),
      '@utils': resolve('utils'),
      '@components': resolve('components'),
      '@decorators': resolve('decorators'),
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin({}),
      new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    ]
  },
  module: {
    rules: rules.concat([{
        test: /\.(js|ts)x?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64]'
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|antd)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64]'
            }
          },
          {
            loader: 'less-loader',
            options: {
              relativeUrls: false
            }
          }
        ]
      },
      {
        test: /antd\.less$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {}
          },
          {
            loader: 'less-loader',
            options: {
              relativeUrls: false,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          name: 'image/[hash].[ext]'
        },
      }
    ])
  },
  plugins: [
    new WebpackCleanupPlugin({
      exclude: []
    }),
    new webpack.DefinePlugin({
      API_SERVER_PLACEHOLDER: JSON.stringify('')
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[name].[hash].css',
      filename: '[name].css'
    })
  ]
}

function resolve(p) {
  return path.join(__dirname, '../src', p)
}
