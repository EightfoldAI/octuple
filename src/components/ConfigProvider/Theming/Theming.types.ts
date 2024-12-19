import { CustomFont } from './Font.types';
import { TabsTheme } from '../../Tabs';
import { NavbarTheme } from '../../Navbar';

export type Value = string;

export type OcCustomThemeName = string;

export type OcThemeName =
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

export type ThemeName = OcThemeName | OcCustomThemeName;

/**
 * Used to theme based purely on css var overrides.
 * Any values provided within this record will also override
 * values provided via OcTheme
 */
export type VarTheme = Record<string, Value>;

export interface OcBaseTheme {
  primaryColor?: Value;
  primaryGradientEndColor?: Value;
  primaryGradientMiddleColor?: Value;
  primaryGradientStartColor?: Value;
  accentColor?: Value;
  accentGradientEndColor?: Value;
  accentGradientMiddleColor?: Value;
  accentGradientStartColor?: Value;
  disruptiveColor?: Value;
  textColor?: Value;
  textColorSecondary?: Value;
  textColorInverse?: Value;
  backgroundColor?: Value;
  successColor?: Value;
  warningColor?: Value;
  infoColor?: Value;
  errorColor?: Value;
  tabsTheme?: TabsTheme;
  navbarTheme?: NavbarTheme;
  varTheme?: VarTheme;
  customFonts?: CustomFont[];
}

export interface OcTheme extends OcBaseTheme {
  /**
   * Name of accent theme.
   * @type {OcCustomThemeName|OcThemeName}
   * @default blueGreen
   */
  accentName?: ThemeName;
  /**
   * Predefined gradient end color palette.
   */
  gradientEndPalette?: Value[];
  /**
   * Predefined gradient middle color palette.
   */
  gradientMiddlePalette?: Value[];
  /**
   * Predefined gradient start color palette.
   */
  gradientStartPalette?: Value[];
  /**
   * Predefined color palette.
   */
  palette: Value[];
}

export interface ThemeOptions {
  /**
   * Name of the theme.
   * @type {OcCustomThemeName|OcThemeName}
   * @default blue
   */
  name?: ThemeName;
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
