export type Color = string;

export interface OcTheme {
    primary: Color;
    palette: Color[];
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
    primaryColor?: Color;
    infoColor?: Color;
    successColor?: Color;
    errorColor?: Color;
    warningColor?: Color;
    useSystemTheme?: boolean;
}
