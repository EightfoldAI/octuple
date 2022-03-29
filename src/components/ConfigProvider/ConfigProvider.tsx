import React, { createContext, FC, useEffect, useState } from 'react';
import { registerTheme } from './styleGenerator';
import { OcThemeNames, ThemeOptions } from './ConfigProvider.types';
import { OnChangeHandler, TabValue } from '../Tabs';

export interface IConfigContext {
    themeName: string;
    setThemeName: (name: OcThemeNames) => void;
}

const ConfigContext = createContext<Partial<IConfigContext>>({});

interface ConfigProviderProps {
    themeOptions?: ThemeOptions;
}

const ConfigProvider: FC<ConfigProviderProps> = ({
    children,
    themeOptions,
}) => {
    const [themeName, setThemeName] = useState<OcThemeNames>(themeOptions.name);
    useEffect(() => {
        registerTheme({
            ...themeOptions,
            name: themeName,
        });
    }, [themeName]);

    return (
        <ConfigContext.Provider
            value={{
                themeName,
                setThemeName,
            }}
        >
            <div className={`theme-${themeName}`}>{children}</div>
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
