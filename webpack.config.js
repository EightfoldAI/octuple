const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/octuple.ts'),
    module: {
        rules: [ {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            include: path.resolve(__dirname, './src')
        },
        {
            test: /\.s[ca]ss|css$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'],
            include: path.resolve(__dirname, './src')
        } ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    output: {
        path: path.join(__dirname, 'lib'),
        library: 'Octuple',
        filename: 'octuple.js',
        libraryTarget: 'umd'
    },
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