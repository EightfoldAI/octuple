import React, { createContext, FC, useEffect, useState } from 'react';
import { registerTheme } from './Theming/styleGenerator';
import { ConfigProviderProps, IConfigContext } from './ConfigProvider.types';
import { IRegisterTheme, ThemeOptions } from './Theming';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';

const ConfigContext: React.Context<Partial<IConfigContext>> = createContext<
    Partial<IConfigContext>
>({});

const DEFAULT_THEME: string = 'blue';
const DEFAULT_ACCENT_THEME: string = 'bluegreen';

const DEFAULT_FOCUS_VISIBLE: boolean = true;
const DEFAULT_FOCUS_VISIBLE_ELEMENT: HTMLElement = document.documentElement;

const ConfigProvider: FC<ConfigProviderProps> = ({
    children,
    focusVisibleOptions = {
        focusVisible: DEFAULT_FOCUS_VISIBLE,
        focusVisibleElement: DEFAULT_FOCUS_VISIBLE_ELEMENT,
    },
    themeOptions: defaultThemeOptions,
    icomoonIconSet = {},
}) => {
    const [themeOptions, setThemeOptions] =
        useState<ThemeOptions>(defaultThemeOptions);

    const [registeredTheme, setRegisteredTheme] = useState<IRegisterTheme>(
        {} as IRegisterTheme
    );

    if (focusVisibleOptions?.focusVisible) {
        useFocusVisibleClassName(
            focusVisibleOptions?.focusVisible,
            focusVisibleOptions?.focusVisibleElement
        );
    }

    useEffect(() => {
        if (themeOptions) {
            setRegisteredTheme(
                registerTheme({
                    name: DEFAULT_THEME,
                    accentName: DEFAULT_ACCENT_THEME,
                    ...themeOptions,
                })
            );
        }
    }, [themeOptions]);

    return (
        <ConfigContext.Provider
            value={{
                themeOptions,
                setThemeOptions,
                registeredTheme,
                icomoonIconSet,
            }}
        >
            {children}
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
