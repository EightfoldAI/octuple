const path = require('path');
const webpack = require('webpack');
const webpackCommon = require('../webpack.common');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    'storybook-css-modules',
    '@storybook/addon-a11y',
    'storybook-addon-rtl',
  ],
  staticDirs: ['../public/assets'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config, { configType }) => {
    const webpackCommonConfig = webpackCommon(
      {},
      { mode: configType.toLowerCase() }
    );
    return {
      ...config,
      optimization: webpackCommonConfig.optimization,
      plugins: [
        ...config.plugins,
        ...webpackCommonConfig.plugins,
        // This repo's devDependency is pinned to React 17, which predates
        // `react-dom/client` (added in React 18) — see
        // `.storybook/shims/reactDomClient.js`. A plain `resolve.alias`
        // entry gets reset by another addon's `webpackFinal` before
        // webpack actually resolves modules, so replace the request
        // directly instead — this runs at resolution time regardless of
        // what else touches `resolve.alias` afterward.
        new webpack.NormalModuleReplacementPlugin(
          /^react-dom\/client$/,
          path.resolve(__dirname, 'shims/reactDomClient.js')
        ),
      ],
      module: {
        ...config.module,
        rules: webpackCommonConfig.module.rules,
      },
    };
  },
};
