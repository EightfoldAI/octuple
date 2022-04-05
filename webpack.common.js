const path = require('path');
module.exports = {
    entry: path.resolve(__dirname, './src/octuple.ts'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, './src'),
            },
            {
                test: /\.s[ca]ss|css$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, './src'),
                use: [
                    'style-loader',
                    '@teamsupercell/typings-for-css-modules-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64:6]',
                                exportLocalsConvention: 'camelCase',
                            },
                        },
                    },
                    'resolve-url-loader',
                    'sass-loader',
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [
                                path.resolve(__dirname, 'src/styles/main.scss'),
                            ],
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'lib'),
        library: 'Octuple',
        filename: 'octuple.js',
        libraryTarget: 'umd',
    },
};
