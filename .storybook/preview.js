import { initializeRTL } from 'storybook-addon-rtl';
import { themes } from '@storybook/theming';
initializeRTL();

export const parameters = {
  darkMode: {
    // Override the default dark theme
    dark: {
      ...themes.dark,
      appBg: '#1a212e',
      appContentBg: '#1a212e',
      barBg: '#1a212e',
    },
  },
};
