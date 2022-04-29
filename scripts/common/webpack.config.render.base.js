/**
 * Electron render process
 */
const path = require('path')
const { resolve } = require('./utils');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@store': resolve('/src/renderer/store'),
      '@pages': resolve('/src/renderer/pages'),
      '@components': resolve('/src/renderer/components'),
      '@utils': resolve('/src/renderer/utils'),
      '@assets': resolve('/src/renderer/assets'),
    },
  },
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {},
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  name: 'removeAttrs',
                  params: {
                    attrs: 'fill',
                  },
                },
              ],
            },
          },
        ],
        include: [
          path.resolve(__dirname, '../../src/renderer/assets/icons')
        ]
      },
      {
        test: /\.(jpg|png|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: '[name]_[hash:5].[ext]',
              outputPath: 'images/',
            },
          },
        ],
        exclude: [
          path.resolve(__dirname, '../../src/renderer/assets/icons')
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // NOTE: whether to enable css module
              // modules: {
              //   localIdentName: '[local]__[hash:base64:5]',
              // },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
