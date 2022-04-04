const webpack = require('webpack');
const WebpackCommonConfig = require('./webpack.common.js');

process.env.NODE_ENV = 'production';

module.exports = {
    ...WebpackCommonConfig,
    externals: {
        react: 'commonjs react',
        'react-dom': 'commonjs react-dom',
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require('./package.json').version),
        }),
    ],
};
