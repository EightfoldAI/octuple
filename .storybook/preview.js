import { initializeRTL } from 'storybook-addon-rtl';
import { themes } from '@storybook/theming';
initializeRTL();

export const parameters = {
  darkMode: {
    // Override the default dark theme
    dark: {
      ...themes.dark,
      appBg: '#0f131b',
      appContentBg: '#0f131b',
      barBg: '#0f131b',
    },
  },
};
