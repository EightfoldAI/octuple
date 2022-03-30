import React, { createContext, FC, useEffect, useState } from 'react';
import { registerTheme } from './Theming/styleGenerator';
import { ConfigProviderProps, IConfigContext } from './ConfigProvider.types';
import { ThemeOptions } from './Theming';

const ConfigContext = createContext<Partial<IConfigContext>>({});

const DEFAULT_THEME = 'blue';

const ConfigProvider: FC<ConfigProviderProps> = ({
    children,
    themeOptions: defaultThemeOptions,
}) => {
    const [themeOptions, setThemeOptions] =
        useState<ThemeOptions>(defaultThemeOptions);

    useEffect(() => {
        if (themeOptions) {
            registerTheme({
                name: DEFAULT_THEME,
                ...themeOptions,
            });
        }
    }, [themeOptions]);

    return (
        <ConfigContext.Provider
            value={{
                themeOptions,
                setThemeOptions,
            }}
        >
            <div className={`theme-${themeOptions.name}`}>{children}</div>
        </ConfigContext.Provider>
    );
};

const useConfig = () => {
    const context = React.useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig hook must be used within config provider');
    }
    return context;
};

export { ConfigProvider, useConfig };
