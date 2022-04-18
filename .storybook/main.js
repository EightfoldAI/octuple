const path = require('path');
const webpackCommon = require('../webpack.common');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-docs',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-links',
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
        return {
            ...config,
            optimization: webpackCommon.optimization,
            plugins: [...config.plugins, ...webpackCommon.plugins],
            module: { ...config.module, rules: webpackCommon.module.rules },
        };
    },
};
