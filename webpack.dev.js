const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackCommonConfig = require('./webpack.common');

process.env.NODE_ENV = 'development';

module.exports = (_, argv) => {
  const commonConfig = WebpackCommonConfig(_, argv);
  return {
    ...commonConfig,
    mode: 'development',
    stats: {
      preset: 'minimal',
      moduleTrace: false,
      errorDetails: false,
    },
    plugins: [
      ...commonConfig.plugins,
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require('./package.json').version),
      }),
      ...(process.env.ANALYZE ? [
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        }),
      ] : []),
    ],
    optimization: {
      ...commonConfig.optimization,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
  };
};
