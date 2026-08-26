const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (_, { mode }) => ({
  entry: {
    octuple: [path.resolve(__dirname, 'src/octuple.ts')],
    locale: [path.resolve(__dirname, 'src/locale.ts')],
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.webpack-cache'),
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: mode === 'development',
              experimentalWatchApi: true,
            },
          },
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.s[ca]ss|css$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:7]',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          'resolve-url-loader',
          'sass-loader',
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
    moduleIds: 'deterministic',
    splitChunks: mode === 'development' ? false : {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          keep_fnames: true,
          compress: {
            drop_console: mode === 'production',
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
    symlinks: false,
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: mode === 'development' ? 'eval-cheap-module-source-map' : 'source-map',
  output: {
    path: path.join(__dirname, 'lib'),
    library: 'Octuple',
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
});
