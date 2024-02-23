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
const THEME_COMPONENT_CONTAINER_ID = 'octuple-component-theme';
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
    fillColor([...theme.palette], 'primary-color');
    variables[`primary-color`] = theme.primaryColor;
    if (theme.gradientEndPalette) {
      fillColor([...theme.gradientEndPalette], 'primary-gradient-end-color');
      variables[`primary-gradient-end-color`] = theme.primaryGradientEndColor;
    }
    if (theme.gradientMiddlePalette) {
      fillColor(
        [...theme.gradientMiddlePalette],
        'primary-gradient-middle-color'
      );
      variables[`primary-gradient-middle-color`] =
        theme.primaryGradientMiddleColor;
    }
    if (theme.gradientStartPalette) {
      fillColor(
        [...theme.gradientStartPalette],
        'primary-gradient-start-color'
      );
      variables[`primary-gradient-start-color`] =
        theme.primaryGradientStartColor;
    }
  }

  // ================ Use existing accent palette ================
  if (accentTheme.palette) {
    fillColor([...accentTheme.palette], 'accent-color');
    variables[`accent-color`] = accentTheme.primaryColor;
    if (accentTheme.gradientEndPalette) {
      fillColor(
        [...accentTheme.gradientEndPalette],
        'accent-gradient-end-color'
      );
      variables[`accent-gradient-end-color`] =
        accentTheme.accentGradientEndColor;
    }
    if (accentTheme.gradientMiddlePalette) {
      fillColor(
        [...accentTheme.gradientMiddlePalette],
        'accent-gradient-middle-color'
      );
      variables[`accent-gradient-middle-color`] =
        accentTheme.accentGradientMiddleColor;
    }
    if (accentTheme.gradientStartPalette) {
      fillColor(
        [...accentTheme.gradientStartPalette],
        'accent-gradient-start-color'
      );
      variables[`accent-gradient-start-color`] =
        accentTheme.accentGradientStartColor;
    }
  }

  // ================ Custom primary palette ================
  if (themeOptions.customTheme?.primaryColor) {
    generatePalette(theme.primaryColor, 'primary-color');
    variables[`primary-color`] = theme.primaryColor;
    if (theme.primaryGradientEndColor) {
      generatePalette(
        theme.primaryGradientEndColor,
        'primary-gradient-end-color'
      );
      variables[`primary-gradient-end-color`] = theme.primaryGradientEndColor;
    }
    if (theme.primaryGradientMiddleColor) {
      generatePalette(
        theme.primaryGradientMiddleColor,
        'primary-gradient-middle-color'
      );
      variables[`primary-gradient-middle-color`] =
        theme.primaryGradientMiddleColor;
    }
    if (theme.primaryGradientStartColor) {
      generatePalette(
        theme.primaryGradientStartColor,
        'primary-gradient-start-color'
      );
      variables[`primary-gradient-start-color`] =
        theme.primaryGradientStartColor;
    }
  }

  // ================ Custom accent palette ================
  if (themeOptions.customTheme?.accentColor) {
    generatePalette(theme.accentColor, 'accent-color');
    variables[`accent-color`] = theme.accentColor;
    if (theme.accentGradientEndColor) {
      generatePalette(
        theme.accentGradientEndColor,
        'accent-gradient-end-color'
      );
      variables[`accent-gradient-end-color`] = theme.accentGradientEndColor;
    }
    if (theme.accentGradientMiddleColor) {
      generatePalette(
        theme.accentGradientMiddleColor,
        'accent-gradient-middle-color'
      );
      variables[`accent-gradient-middle-color`] =
        theme.accentGradientMiddleColor;
    }
    if (theme.accentGradientStartColor) {
      generatePalette(
        theme.accentGradientStartColor,
        'accent-gradient-start-color'
      );
      variables[`accent-gradient-start-color`] = theme.accentGradientStartColor;
    }
  }

  // ================ Disruptive palette ================
  if (!theme.disruptiveColor) {
    fillColor([...OcThemes.red.palette], 'disruptive-color');
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
  option: Options = {},
  className: string = ''
): HTMLStyleElement {
  const target: string = className !== '' ? `.${className}` : ':root';
  const css = `
    ${target} {
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

export function registerTheme(
  themeOptions: ThemeOptions,
  containerId?: string,
  componentClassName?: string
): IRegisterTheme {
  const { themeName, light, variables } = getStyle(themeOptions);
  const styleNode: HTMLStyleElement = injectCSS(
    variables,
    componentClassName
      ? containerId || THEME_COMPONENT_CONTAINER_ID
      : THEME_CONTAINER_ID,
    themeOptions.customTheme?.customFonts,
    {},
    componentClassName || ''
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
