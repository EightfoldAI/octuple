import React, { createContext, FC, useEffect, useState } from 'react';
import { registerFont, registerTheme } from './Theming/styleGenerator';
import { ConfigProviderProps, IConfigContext } from './ConfigProvider.types';
import {
    IRegisterFont,
    IRegisterTheme,
    FontOptions,
    ThemeOptions,
} from './Theming';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';

const ConfigContext: React.Context<Partial<IConfigContext>> = createContext<
    Partial<IConfigContext>
>({});

const DEFAULT_THEME: string = 'blue';

const DEFAULT_FOCUS_VISIBLE: boolean = true;
const DEFAULT_FOCUS_VISIBLE_ELEMENT: HTMLElement = document.documentElement;

const ConfigProvider: FC<ConfigProviderProps> = ({
    children,
    focusVisibleOptions = {
        focusVisible: DEFAULT_FOCUS_VISIBLE,
        focusVisibleElement: DEFAULT_FOCUS_VISIBLE_ELEMENT,
    },
    fontOptions: defaultFontOptions,
    icomoonIconSet = {},
    themeOptions: defaultThemeOptions,
}) => {
    const [fontOptions, setFontOptions] =
        useState<FontOptions>(defaultFontOptions);

    const [registeredFont, setRegisteredFont] = useState<IRegisterFont>(
        {} as IRegisterFont
    );

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
                    ...themeOptions,
                })
            );
        }
    }, [themeOptions]);

    useEffect(() => {
        if (fontOptions) {
            setRegisteredFont(
                registerFont({
                    ...fontOptions,
                })
            );
        }
    }, [fontOptions]);

    return (
        <ConfigContext.Provider
            value={{
                fontOptions,
                setFontOptions,
                themeOptions,
                setThemeOptions,
                registeredFont,
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
