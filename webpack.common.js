const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// Source maps are resource heavy and can cause out of memory issue for large source files.
/**
 * Usage GENERATE_SOURCEMAPS=1 <command>
 */
const shouldUseSourceMaps = !!process.env.GENERATE_SOURCEMAPS || false;

module.exports = (_, { mode }) => ({
  entry: {
    octuple: [path.resolve(__dirname, 'src/octuple.ts')],
    locale: [path.resolve(__dirname, 'src/locale.ts')],
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
          mode === 'production' || shouldUseSourceMaps
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:7]',
                exportLocalsConvention: 'camelCase',
              },
              sourceMap: shouldUseSourceMaps,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: shouldUseSourceMaps,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: shouldUseSourceMaps,
            },
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [path.resolve(__dirname, 'src/styles/main.scss')],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true,
        },
      }),
      new CssMinimizerPlugin(),
    ],
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
    globalObject: 'this',
  },
});
