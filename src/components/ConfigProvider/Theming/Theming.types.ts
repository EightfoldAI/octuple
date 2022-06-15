import { TabsTheme } from '../../Tabs';
import { NavbarTheme } from '../../Navbar';

export type Value = string;

export type OcCustomThemeName = string;

export type OcThemeNames =
    | 'red'
    | 'redOrange'
    | 'orange'
    | 'yellow'
    | 'yellowGreen'
    | 'green'
    | 'blueGreen'
    | 'blue'
    | 'blueViolet'
    | 'violet'
    | 'violetRed'
    | 'grey';

export type ThemeName = OcThemeNames | OcCustomThemeName;

export interface OcBaseTheme {
    primaryColor?: Value;
    accentColor?: Value;
    disruptiveColor?: Value;
    textColor?: Value;
    textColorSecondary?: Value;
    textColorInverse?: Value;
    backgroundColor?: Value;
    successColor?: Value;
    warningColor?: Value;
    infoColor?: Value;
    errorColor?: Value;
    fontSize?: number;
    tabsTheme?: TabsTheme;
    navbarTheme?: NavbarTheme;
}

export interface OcTheme extends OcBaseTheme {
    /**
     * Name of accent theme.
     * @type {OcCustomThemeName|OcThemeNames}
     * @default blueGreen
     */
    accentName?: ThemeName;
    /**
     * Predefined color palette
     */
    palette: Value[];
}

export interface ThemeOptions {
    /**
     * Name of the theme.
     * @type {OcCustomThemeName|OcThemeNames}
     * @default blue
     */
    name?: ThemeName;
    /**
     * Use system theme or not
     * @default false
     * @experimental
     */
    useSystemTheme?: boolean;
    /**
     * Define a custom theme palette
     * @type {OcBaseTheme}
     * @default null
     */
    customTheme?: OcBaseTheme;
}

export type Variables = Record<string, Value>;

export interface IGetStyle {
    themeName: ThemeName;
    light: boolean;
    variables: Variables;
}

export interface IRegisterTheme extends IGetStyle {
    styleNode: HTMLStyleElement;
}
