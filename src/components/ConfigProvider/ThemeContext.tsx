import React, { createContext, FC, useEffect } from 'react';
import { OcThemeName } from './Theming';
import { registerTheme } from './Theming/styleGenerator';

const ThemeContext = createContext<OcThemeName>(null);

export interface ThemeContextProps {
  children?: React.ReactNode;
  containerId?: string;
  theme?: OcThemeName;
  componentClassName?: string;
}

export const ThemeContextProvider: FC<ThemeContextProps> = ({
  theme,
  children,
  containerId,
  componentClassName,
}) => {
  useEffect(() => {
    if (theme) {
      registerTheme(
        {
          name: theme,
        },
        containerId,
        componentClassName
      );
    }
  }, [containerId, componentClassName, theme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
