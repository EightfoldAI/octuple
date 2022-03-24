export type OcThemes =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blueGreen'
    | 'blue'
    | 'violet'
    | 'grey'
    | 'custom';

export interface Theme {
    name: OcThemes;
    primaryColor?: string;
    secondaryColor?: string;
    infoColor?: string;
    successColor?: string;
    processingColor?: string;
    errorColor?: string;
    warningColor?: string;
    useSystemTheme?: boolean;
}
