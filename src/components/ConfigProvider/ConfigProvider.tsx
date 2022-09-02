import React, {
    createContext,
    FC,
    useContext,
    useEffect,
    useState,
} from 'react';
import LocaleReceiver from '../LocaleProvider/LocaleReceiver';
import LocaleProvider from '../LocaleProvider';
import { registerFont, registerTheme } from './Theming/styleGenerator';
import { ConfigProviderProps, IConfigContext } from './ConfigProvider.types';
import {
    IRegisterFont,
    IRegisterTheme,
    FontOptions,
    ThemeOptions,
} from './Theming';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';
import { DisabledContextProvider } from './DisabledContext';
import { ShapeContextProvider } from './ShapeContext';
import { SizeContextProvider } from './SizeContext';
import { ValidateMessages } from '../Form/Internal/OcForm.types';
import { OcFormProvider } from '../Form/Internal';
import defaultLocale from '../Locale/Default';

const ConfigContext: React.Context<Partial<IConfigContext>> = createContext<
    Partial<IConfigContext>
>({});

const DEFAULT_THEME: string = 'blue';

const DEFAULT_FOCUS_VISIBLE: boolean = true;
const DEFAULT_FOCUS_VISIBLE_ELEMENT: HTMLElement = document.documentElement;

const ConfigProvider: FC<ConfigProviderProps> = ({
    children,
    disabled = false,
    focusVisibleOptions = {
        focusVisible: DEFAULT_FOCUS_VISIBLE,
        focusVisibleElement: DEFAULT_FOCUS_VISIBLE_ELEMENT,
    },
    fontOptions: defaultFontOptions,
    form,
    icomoonIconSet = {},
    locale,
    shape,
    size,
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

    let childNode = children;
    let validateMessages: ValidateMessages = {};

    if (locale) {
        validateMessages =
            locale.Form?.defaultValidateMessages ||
            defaultLocale.Form?.defaultValidateMessages ||
            {};
    }

    if (form && form.validateMessages) {
        validateMessages = { ...validateMessages, ...form.validateMessages };
    }

    if (Object.keys(validateMessages).length > 0) {
        childNode = (
            <OcFormProvider validateMessages={validateMessages}>
                {children}
            </OcFormProvider>
        );
    }

    if (locale) {
        childNode = (
            <LocaleProvider locale={locale}>{childNode}</LocaleProvider>
        );
    }

    if (shape) {
        childNode = (
            <ShapeContextProvider shape={shape}>
                {childNode}
            </ShapeContextProvider>
        );
    }

    if (size) {
        childNode = (
            <SizeContextProvider size={size}>{childNode}</SizeContextProvider>
        );
    }

    if (disabled !== undefined) {
        childNode = (
            <DisabledContextProvider disabled={disabled}>
                {childNode}
            </DisabledContextProvider>
        );
    }

    return (
        <LocaleReceiver>
            {(_, __) => (
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
                    {childNode}
                </ConfigContext.Provider>
            )}
        </LocaleReceiver>
    );
};

const useConfig = () => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig hook must be used within config provider');
    }
    return context;
};

export { ConfigProvider, useConfig };
