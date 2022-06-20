const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (_, { mode }) => ({
    entry: {
        octuple: [path.resolve(__dirname, 'src/octuple.ts')],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
            },
            {
                test: /\.s[ca]ss|css$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    mode === 'production'
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader',
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
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'lib'),
        library: 'Octuple',
        filename: '[name].js',
        libraryTarget: 'umd',
    },
});
