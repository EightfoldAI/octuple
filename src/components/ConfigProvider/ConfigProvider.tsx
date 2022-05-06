import React, {
    createContext,
    FC,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { registerTheme } from './Theming/styleGenerator';
import { ConfigProviderProps, IConfigContext } from './ConfigProvider.types';
import { IRegisterTheme, ThemeOptions } from './Theming';
import { useFocusVisible } from '../../hooks/useFocusVisible';
import { useFontSize } from '../../hooks/useFontSize';

const ConfigContext = createContext<Partial<IConfigContext>>({});

const DEFAULT_THEME = 'blue';
const DEFAULT_FONT_SIZE = 16;

const ConfigProvider: FC<ConfigProviderProps> = ({
    children,
    focusVisible = false,
    focusVisibleElement = document.documentElement,
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

    const isFocusVisible = useFocusVisible();
    const focusVisibleClassName: string = 'focus-visible';

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

    const handleFocusVisible = useCallback((): void => {
        if (
            isFocusVisible &&
            !focusVisibleElement?.classList.contains(focusVisibleClassName)
        ) {
            focusVisibleElement.classList.add(focusVisibleClassName);
        } else {
            if (
                focusVisibleElement?.classList.contains(focusVisibleClassName)
            ) {
                focusVisibleElement.classList.remove(focusVisibleClassName);
                if (focusVisibleElement.classList.length === 0) {
                    focusVisibleElement.removeAttribute('class');
                }
            }
        }
    }, [isFocusVisible]);

    useEffect(() => {
        if (focusVisible) {
            handleFocusVisible();
        }
    }, [handleFocusVisible]);

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
