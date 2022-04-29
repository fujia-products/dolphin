const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const mainBaseConfig = require('../common/webpack.config.main.base');
const webpack = require('webpack');

module.exports = merge(mainBaseConfig, {
  mode: 'production',
  entry: {
    main: path.join(cwdDir, './src/main/main.ts'),
    preload: path.join(cwdDir, './src/main/preload.ts'),
  },
  devtool: false,

  output: {
    filename: '[name].js',
    path: path.join(cwdDir, 'release/bundled'),
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true
      }),
    ]
  },

  plugins: [
    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
      START_MINIMIZED: false,
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
    }),
  ],
  /**
  * Disables webpack processing of __dirname and __filename.
  * If you run the bundle in node.js it falls back to these values of node.js.
  * https://github.com/webpack/webpack/issues/2010
  */
  node: {
    __dirname: false,
    __filename: false,
  },
});
