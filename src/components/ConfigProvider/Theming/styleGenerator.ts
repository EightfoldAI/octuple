import {
  IGetFontStyle,
  IRegisterFont,
  FontOptions,
  OcFont,
  CustomFont,
} from './Font.types';
import {
  IGetStyle,
  IRegisterTheme,
  OcTheme,
  OcThemeName,
  ThemeName,
  ThemeOptions,
  Variables,
} from './Theming.types';
import { TinyColor } from '@ctrl/tinycolor';
import generate from './generate';
import { fontDefaults } from './font';
import OcThemes, { themeDefaults } from './themes';
import { themeGenerator } from './themeGenerator';
import { canUseDocElement } from '../../../shared/utilities';

const THEME_CONTAINER_ID = 'octuple-theme';
const FONT_CONTAINER_ID = 'octuple-font';

interface Options {
  attachTo?: Element;
  csp?: { nonce?: string };
  prepend?: boolean;
  mark?: string;
}

function getCustomFontsCss(customFonts: CustomFont[]): string {
  let css = '';
  for (const font of customFonts) {
    css += `@font-face {
      font-family: '${font.fontFamily}';
      src: ${font.src};
    `;

    if (font.fontWeight) css += `font-weight: ${font.fontWeight};\n`;
    if (font.fontStyle) css += `font-style: ${font.fontStyle};\n`;
    if (font.unicodeRange) css += `unicode-range: ${font.unicodeRange};\n`;

    css += `font-display: swap; }\n`;
  }

  return css;
}

export function getStyle(themeOptions: ThemeOptions): IGetStyle {
  let variables: Variables = {};

  const fillColor = (
    colorPalettes: string[],
    type: string
  ): Record<string, string> =>
    colorPalettes.reduce((acc, color, index) => {
      const key: string = `${type}-${(index + 1) * 10}`;
      acc[key] = color;
      return acc;
    }, variables);

  const generatePalette = (colorVal: string, type: string): void => {
    const baseColor = new TinyColor(colorVal);
    const colorPalettes = generate(baseColor.toRgbString(), {});
    fillColor(colorPalettes, type);
  };

  const themeName: ThemeName = themeOptions.name;

  const theme: OcTheme = {
    ...themeDefaults,
    ...OcThemes?.[themeName as OcThemeName],
    ...themeOptions.customTheme,
  };

  const accentTheme: OcTheme = {
    ...OcThemes?.[theme.accentName as OcThemeName],
  };

  // ================ Use existing primary palette ================
  if (theme.palette) {
    fillColor([...theme.palette].reverse(), 'primary-color');
    variables[`primary-color`] = theme.primaryColor;
  }

  // ================ Use existing accent palette ================
  if (accentTheme.palette) {
    fillColor([...accentTheme.palette].reverse(), 'accent-color');
    variables[`accent-color`] = accentTheme.primaryColor;
  }

  // ================ Custom primary palette ================
  if (themeOptions.customTheme?.primaryColor) {
    generatePalette(theme.primaryColor, 'primary-color');
    variables[`primary-color`] = theme.primaryColor;
  }

  // ================ Custom accent palette ================
  if (themeOptions.customTheme?.accentColor) {
    generatePalette(theme.accentColor, 'accent-color');
    variables[`accent-color`] = theme.accentColor;
  }

  // ================ Disruptive palette ================
  if (!theme.disruptiveColor) {
    fillColor([...OcThemes.red.palette].reverse(), 'disruptive-color');
    variables[`disruptive-color`] = OcThemes.red.primaryColor;
  } else {
    generatePalette(theme.disruptiveColor, 'disruptive-color');
    variables[`disruptive-color`] = theme.disruptiveColor;
  }

  // ================ Background Color ================
  if (theme.backgroundColor) {
    variables[`background-color`] = theme.backgroundColor;
  }

  const themePrimaryColor: TinyColor = new TinyColor(theme.primaryColor);

  // ================ Text Color ================
  if (theme.textColor) {
    variables[`text-primary-color`] = themePrimaryColor.isDark()
      ? theme.textColor
      : theme.textColorInverse;
  }

  if (theme.textColorSecondary) {
    variables[`text-secondary-color`] = theme.textColorSecondary;
  }

  if (theme.textColorInverse) {
    variables[`text-inverse-color`] = themePrimaryColor.isDark()
      ? theme.textColorInverse
      : theme.textColor;
  }

  // ================ Success Color ================
  if (theme.successColor) {
    variables[`success-color`] = theme.successColor;
  }

  // ================ Warning Color ================
  if (theme.warningColor) {
    variables[`warning-color`] = theme.warningColor;
  }

  // ================= Error Color =================
  if (theme.errorColor) {
    variables[`error-color`] = theme.errorColor;
  }

  // ================= Info Color ==================
  if (theme.infoColor) {
    variables[`info-color`] = theme.infoColor;
  }

  // ================= Tabs theme ==================
  if (theme.tabsTheme) {
    variables = {
      ...variables,
      ...themeGenerator(theme.tabsTheme, 'tab'),
    };
  }

  // ================= Navbar theme ==================
  if (theme.navbarTheme) {
    variables = {
      ...variables,
      ...themeGenerator(theme.navbarTheme, 'navbar'),
    };
  }

  // ================= var theming ==================
  if (theme.varTheme) {
    variables = {
      ...variables,
      ...theme.varTheme,
    };
  }

  return {
    variables,
    light: themePrimaryColor.isLight(),
    themeName,
  };
}

export function getFontStyle(fontOptions: FontOptions): IGetFontStyle {
  let variables: Variables = {};

  const font: OcFont = {
    ...fontDefaults,
    ...fontOptions.customFont,
  };

  // ================= Primary Font ==================
  if (font.fontFamily) {
    variables[`font-family`] = font.fontFamily;
  }

  // ================= Font Stack ==================
  if (font.fontStack) {
    variables[`font-stack`] = font.fontStack;
  }

  // ================= Font Size ==================
  if (font.fontSize) {
    variables[`font-size`] = `${font.fontSize}px`;
  }

  return { variables };
}

function getContainer(option: Options): Element {
  if (option.attachTo) {
    return option.attachTo;
  }
  if (canUseDocElement()) {
    const head = document.querySelector('head');
    return head || document.body;
  }
  return null;
}

export function injectCSS(
  variables: Variables,
  id: string,
  customFonts: CustomFont[] = [],
  option: Options = {}
): HTMLStyleElement {
  const css = `
    :root {
      ${Object.keys(variables)
        .map((key) => `--${key}: ${variables[key]};`)
        .join('\n')}
    }
    ${getCustomFontsCss(customFonts)}
  `.trim();

  let styleNode: HTMLStyleElement | null = null;
  let container: Element | null = null;

  if (canUseDocElement()) {
    styleNode =
      (document.getElementById(id) as HTMLStyleElement) ||
      document.createElement('style');
    styleNode.id = id;
    if (option.csp?.nonce) {
      styleNode.nonce = option.csp?.nonce;
    }
    styleNode.innerHTML = css;

    container = getContainer(option);
    const { firstChild } = container;

    if (option.prepend && container.prepend) {
      // Use `prepend` first
      container.prepend(styleNode);
    } else if (option.prepend && firstChild) {
      // Fallback to `insertBefore` like IE not support `prepend`
      container.insertBefore(styleNode, firstChild);
    } else {
      container.appendChild(styleNode);
    }
  }

  return styleNode;
}

export function registerTheme(themeOptions: ThemeOptions): IRegisterTheme {
  const { themeName, light, variables } = getStyle(themeOptions);
  const styleNode: HTMLStyleElement = injectCSS(
    variables,
    THEME_CONTAINER_ID,
    themeOptions.customTheme?.customFonts
  );
  return {
    themeName,
    light,
    variables,
    styleNode,
  };
}

export function registerFont(fontOptions: FontOptions): IRegisterFont {
  const { variables } = getFontStyle(fontOptions);
  const styleNode: HTMLStyleElement = injectCSS(variables, FONT_CONTAINER_ID);
  return {
    variables,
    styleNode,
  };
}
