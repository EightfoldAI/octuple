export type Color = string;

export interface OcBaseTheme {
    primaryColor?: Color;
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
    palette: Color[];
}

export interface OcCustomTheme extends OcBaseTheme {
    name: string;
}

export type OcThemeNames =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blueGreen'
    | 'blue'
    | 'violet'
    | 'grey';

export interface ThemeOptions {
    name?: OcThemeNames;
    useSystemTheme?: boolean;
    customTheme?: OcCustomTheme;
}
