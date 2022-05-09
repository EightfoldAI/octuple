import { IRegisterTheme, ThemeOptions } from './Theming';
import { FocusVisibleOptions } from './A11y';

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
     * Options for keyboard modality styles
     * @default { focusVisible: false, focusVisibleElement: document.documentElement }
     */
    focusVisibleOptions?: FocusVisibleOptions;
}
