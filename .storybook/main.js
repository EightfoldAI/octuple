const path = require('path');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-docs',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-links',
        ''
    ],
    staticDirs: ['../public/assets'],
    framework: "@storybook/react",
    core: {
        "builder": "webpack5"
    },
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        },
    },
    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
        fileLoaderRule.exclude = /\.svg$/;
    
        config.module.rules.push(
            {
                test: /\.s[ca]ss|css$/,
                use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'],
                include: path.resolve(__dirname, '../')
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'file-loader', 'url-loader'],
                include: path.resolve(__dirname, '../')
            }
        );

        config.resolve.fallback = {
            http: false
        }

        return config;
      },
};