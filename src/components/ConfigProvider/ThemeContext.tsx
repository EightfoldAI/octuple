import React, { createContext, FC, useEffect } from 'react';
import { OcThemeName } from './Theming';
import { registerTheme } from './Theming/styleGenerator';

const ThemeContext = createContext<OcThemeName>(null);

export interface ThemeContextProps {
  children?: React.ReactNode;
  theme?: OcThemeName;
  selector?: string;
}

export const ThemeContextProvider: FC<ThemeContextProps> = ({
  theme,
  children,
  selector,
}) => {
  useEffect(() => {
    if (theme) {
      registerTheme(
        {
          name: theme,
        },
        selector
      );
    }
  }, [selector, theme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
