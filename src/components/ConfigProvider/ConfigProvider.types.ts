import { IRegisterTheme, ThemeOptions } from './Theming';

export interface IConfigContext {
    themeOptions: ThemeOptions;
    setThemeOptions: (themeOptions: ThemeOptions) => void;
    registeredTheme?: IRegisterTheme;
}

export interface ConfigProviderProps {
    /**
     * Options for theming
     * @default { name: 'blue', useSystemTheme: false, customTheme: null }
     */
    themeOptions?: ThemeOptions;
}
