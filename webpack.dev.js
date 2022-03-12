const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackCommonConfig = require('./webpack.common.js');

process.env.NODE_ENV = 'development';

module.exports = {
    ...WebpackCommonConfig,
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require('./package.json').version)
        }),
        new BundleAnalyzerPlugin({
            options: {
                generateStatsFile: true
            }
        })
    ]
};