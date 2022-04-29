export type Value = string;

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
    primaryColor?: Value;
    disruptiveColor?: Value;
    textColor?: Value;
    textColorSecondary?: Value;
    textColorInverse?: Value;
    backgroundColor?: Value;
    successColor?: Value;
    warningColor?: Value;
    infoColor?: Value;
    errorColor?: Value;
    styles?: OcBaseStyles;
}

export interface OcGlobalStyles {
    /**
     * Component border-radius
     */
    borderRadius?: Value;
    /**
     * Component border-width
     */
    borderThickness?: Value;
    /**
     * Component font-size
     */
    fontSize?: Value;
    /**
     * Component margin
     */
    margin?: Value;
    /**
     * Component padding
     */
    padding?: Value;
}

export interface OcButtonStyles extends OcGlobalStyles {
    /**
     * Component background color
     */
    backgroundColor?: Value;
    /**
     * Component background active color
     */
    backgroundActiveColor?: Value;
    /**
     * Component background hover color
     */
    backgroundHoverColor?: Value;
    /**
     * Component background focus color
     */
    backgroundFocusColor?: Value;
    /**
     * Component background visited color
     */
    backgroundVisitedColor?: Value;
    /**
     * Component text color
     */
    textColor?: Value;
    /**
     * Component text active color
     */
    textActiveColor?: Value;
    /**
     * Component text hover color
     */
    textHoverColor?: Value;
    /**
     * Component text focus color
     */
    textFocusColor?: Value;
    /**
     * Component text visited color
     */
    textVisitedColor?: Value;
}

export interface OcDialogStyles extends OcButtonStyles {}

export interface OcDropdownStyles extends OcButtonStyles {}

export interface OcIconStyles extends OcButtonStyles {}

export interface OcInfoBarStyles extends OcButtonStyles {}

export interface OcInputStyles extends OcButtonStyles {}

export interface OcListStyles extends OcButtonStyles {}

export interface OcMenuStyles extends OcButtonStyles {}

export interface OcModalStyles extends OcDialogStyles {}

export interface OcPanelStyles extends OcButtonStyles {}

export interface OcPillStyles extends OcButtonStyles {}

export interface OcSnackbarStyles extends OcButtonStyles {}

export interface OcTabStyles extends OcButtonStyles {}

export interface OcTooltipStyles extends OcButtonStyles {}

export interface OcBaseStyles {
    /**
     * Global styles
     * @type {OcGlobalStyles}
     */
    global?: OcGlobalStyles;
    /**
     * Button styles
     * @type {OcButtonStyles}
     */
    button?: OcButtonStyles;
    /**
     * Dialog styles
     * @type {OcDialogStyles}
     */
    dialog?: OcDialogStyles;
    /**
     * Dropdown styles
     * @type {OcDropdownStyles}
     */
    dropdown?: OcDropdownStyles;
    /**
     * Icon styles
     * @type {OcIconStyles}
     */
    icon?: OcIconStyles;
    /**
     * InfoBar styles
     * @type {OcInfoBarStyles}
     */
    infobar?: OcInfoBarStyles;
    /**
     * Input styles
     * @type {OcInputStyles}
     */
    input?: OcInputStyles;
    /**
     * List styles
     * @type {OcListStyles}
     */
    list?: OcListStyles;
    /**
     * Menu styles
     * @type {OcMenuStyles}
     */
    menu?: OcMenuStyles;
    /**
     * Modal styles
     * @type {OcModalStyles}
     */
    modal?: OcModalStyles;
    /**
     * Panel styles
     * @type {OcPanelStyles}
     */
    panel?: OcPanelStyles;
    /**
     * Pill styles
     * @type {OcPillStyles}
     */
    Pill?: OcPillStyles;
    /**
     * Snackbar styles
     * @type {OcSnackbarStyles}
     */
    snackbar?: OcSnackbarStyles;
    /**
     * Tabs styles
     * @type {OcTabStyles}
     */
    tabs?: OcTabStyles;
    /**
     * Tooltip styles
     * @type {OcTooltipStyles}
     */
    tooltip?: OcTooltipStyles;
}

export interface OcTheme extends OcBaseTheme {
    /**
     * Predefined color palette
     */
    palette: Value[];
    /**
     * Optional config styles
     */
    styles?: OcBaseStyles;
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
