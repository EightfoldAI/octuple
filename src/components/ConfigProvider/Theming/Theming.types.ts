export type Color = string;

export type OcCustomThemeName = string;

export type OcThemeNames =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'bluegreen'
    | 'blue'
    | 'violet'
    | 'grey';

export type ThemeName = OcThemeNames | OcCustomThemeName;

export interface OcBaseTheme {
    primaryColor?: Color;
    disruptiveColor?: Color;
    textColor?: Color;
    textColorSecondary?: Color;
    textColorInverse?: Color;
    backgroundColor?: Color;
    successColor?: Color;
    warningColor?: Color;
    infoColor?: Color;
    errorColor?: Color;
}

export interface OcTheme extends OcBaseTheme {
    /**
     * Predefined color palette
     */
    palette: Color[];
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

export type Variables = Record<string, Color>;

export interface IGetStyle {
    themeName: ThemeName;
    light: boolean;
    variables: Variables;
}

export interface IRegisterTheme extends IGetStyle {
    styleNode: HTMLStyleElement;
}
