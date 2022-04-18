const webpack = require('webpack');
const WebpackCommonConfig = require('./webpack.common');

process.env.NODE_ENV = 'production';

module.exports = (_, argv) => {
    const commonConfig = WebpackCommonConfig(_, argv);
    return {
        ...commonConfig,
        externals: {
            react: 'commonjs react',
            'react-dom': 'commonjs react-dom',
        },
        plugins: [
            ...commonConfig.plugins,
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(require('./package.json').version),
            }),
        ],
    };
};
