import React, { createContext, FC, useEffect, useState } from 'react';
import { registerTheme } from './Theming/styleGenerator';
import { ConfigProviderProps, IConfigContext } from './ConfigProvider.types';
import { IRegisterTheme, ThemeOptions } from './Theming';
import { useFontSize } from '../../hooks/useFontSize';

const ConfigContext = createContext<Partial<IConfigContext>>({});

const DEFAULT_THEME = 'blue';
const DEFAULT_FONT_SIZE = 16;

const ConfigProvider: FC<ConfigProviderProps> = ({
    children,
    themeOptions: defaultThemeOptions,
}) => {
    const [themeOptions, setThemeOptions] =
        useState<ThemeOptions>(defaultThemeOptions);

    const [registeredTheme, setRegisteredTheme] = useState<IRegisterTheme>(
        {} as IRegisterTheme
    );

    const [fontSize, setFontSize] = useFontSize({
        variableName: '--font-size',
    });

    useEffect(() => {
        if (themeOptions) {
            setRegisteredTheme(
                registerTheme({
                    name: DEFAULT_THEME,
                    ...themeOptions,
                })
            );
        }
        setFontSize(DEFAULT_FONT_SIZE);
    }, [themeOptions]);

    return (
        <ConfigContext.Provider
            value={{
                themeOptions,
                setThemeOptions,
                registeredTheme,
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
