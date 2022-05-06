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
    /**
     * Enables keyboard modality styles
     * @default false
     */
    focusVisible?: boolean;
    /**
     * Determines the target element to add the `is-focus-visible` className
     * @default document.documentElement
     */
    focusVisibleElement?: HTMLElement;
}
