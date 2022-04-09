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
    buttonDefaultForegroundColor?: Color;
    buttonHoverForegroundColor?: Color;
    buttonFocusForegroundColor?: Color;
    buttonActiveForegroundColor?: Color;
    buttonVisitedForegroundColor?: Color;
    buttonDefaultOutlineColor?: Color;
    buttonHoverOutlineColor?: Color;
    buttonFocusOutlineColor?: Color;
    buttonActiveOutlineColor?: Color;
    buttonVisitedOutlineColor?: Color;
    buttonPrimaryDefaultBackgroundColor?: Color;
    buttonPrimaryHoverBackgroundColor?: Color;
    buttonPrimaryFocusBackgroundColor?: Color;
    buttonPrimaryActiveBackgroundColor?: Color;
    buttonPrimaryVisitedBackgroundColor?: Color;
    buttonPrimaryDefaultBorderColor?: Color;
    buttonPrimaryHoverBorderColor?: Color;
    buttonPrimaryFocusBorderColor?: Color;
    buttonPrimaryActiveBorderColor?: Color;
    buttonPrimaryVisitedBorderColor?: Color;
    buttonDefaultBackgroundColor?: Color;
    buttonHoverBackgroundColor?: Color;
    buttonFocusBackgroundColor?: Color;
    buttonActiveBackgroundColor?: Color;
    buttonVisitedBackgroundColor?: Color;
    buttonHoverVariantBackgroundColor?: Color;
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
