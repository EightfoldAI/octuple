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

const ConfigContext: React.Context<Partial<IConfigContext>> = createContext<
    Partial<IConfigContext>
>({});

const DEFAULT_THEME: string = 'blue';
const DEFAULT_FONT_SIZE: number = 16;

const DEFAULT_FOCUS_VISIBLE: boolean = true;
const DEFAULT_FOCUS_VISIBLE_ELEMENT: HTMLElement = document.documentElement;
const FOCUS_VISIBLE_CLASSNAME: string = 'focus-visible';

const ConfigProvider: FC<ConfigProviderProps> = ({
    children,
    focusVisibleOptions = {
        focusVisible: DEFAULT_FOCUS_VISIBLE,
        focusVisibleElement: DEFAULT_FOCUS_VISIBLE_ELEMENT,
    },
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

    const isFocusVisible: boolean = useFocusVisible();

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

    const handleFocusVisible = useCallback(
        (focusVisibleElement: HTMLElement): void => {
            if (
                isFocusVisible &&
                !focusVisibleElement?.classList.contains(
                    FOCUS_VISIBLE_CLASSNAME
                )
            ) {
                focusVisibleElement?.classList.add(FOCUS_VISIBLE_CLASSNAME);
            } else {
                if (
                    focusVisibleElement?.classList.contains(
                        FOCUS_VISIBLE_CLASSNAME
                    )
                ) {
                    focusVisibleElement?.classList.remove(
                        FOCUS_VISIBLE_CLASSNAME
                    );
                    if (focusVisibleElement?.classList.length === 0) {
                        focusVisibleElement?.removeAttribute('class');
                    }
                }
            }
        },
        [isFocusVisible]
    );

    useEffect(() => {
        if (focusVisibleOptions?.focusVisible) {
            handleFocusVisible(focusVisibleOptions.focusVisibleElement);
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
