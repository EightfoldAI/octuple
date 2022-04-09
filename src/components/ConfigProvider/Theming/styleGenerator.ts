import {
    OcTheme,
    OcThemeNames,
    ThemeName,
    ThemeOptions,
} from './Theming.types';
import { TinyColor, isReadable } from '@ctrl/tinycolor';
import generate from './generate';
import OcThemes from './themes';

const THEME_CONTAINER_ID = 'octuple-theme';

interface Options {
    attachTo?: Element;
    csp?: { nonce?: string };
    prepend?: boolean;
    mark?: string;
}

export function getStyle(themeOptions: ThemeOptions): string {
    const variables: Record<string, string> = {};

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
        ...OcThemes?.[themeOptions.name as OcThemeNames],
        ...themeOptions.customTheme,
    };

    // ================ Use existing palette ================
    if (theme.palette) {
        fillColor([...theme.palette].reverse(), 'primary-color');
        variables[`primary-color`] = theme.primaryColor;
    }

    const themePrimaryColor: TinyColor = new TinyColor(theme.primaryColor);
    const whiteHex: string = '#fff';
    const blackHex: string = '#000';
    const grey80Hex: string = '#343c4c';

    // ================ Button Foreground Colors ================
    if (theme.buttonPrimaryDefaultBackgroundColor) {
        variables[`button-primary-default-background-color`] =
            themePrimaryColor.toString();
    }

    if (theme.buttonPrimaryHoverBackgroundColor) {
        variables[`button-primary-hover-background-color`] = themePrimaryColor
            .lighten(10)
            .toString();
    }

    if (theme.buttonPrimaryFocusBackgroundColor) {
        variables[`button-primary-focus-background-color`] = themePrimaryColor
            .lighten(10)
            .toString();
    }

    if (theme.buttonPrimaryActiveBackgroundColor) {
        variables[`button-primary-active-background-color`] = themePrimaryColor
            .darken(10)
            .toString();
    }

    if (theme.buttonPrimaryVisitedBackgroundColor) {
        variables[`button-primary-visited-background-color`] = themePrimaryColor
            .lighten(10)
            .toString();
    }

    if (theme.buttonPrimaryDefaultBorderColor) {
        variables[`button-primary-default-border-color`] =
            themePrimaryColor.toString();
    }

    if (theme.buttonPrimaryHoverBorderColor) {
        variables[`button-primary-hover-border-color`] = themePrimaryColor
            .lighten(5)
            .toString();
    }

    if (theme.buttonPrimaryFocusBorderColor) {
        variables[`button-primary-focus-border-color`] = themePrimaryColor
            .darken(10)
            .toString();
    }

    if (theme.buttonPrimaryActiveBorderColor) {
        variables[`button-primary-active-border-color`] = themePrimaryColor
            .darken(10)
            .toString();
    }

    if (theme.buttonPrimaryVisitedBorderColor) {
        variables[`button-primary-visited-border-color`] = themePrimaryColor
            .darken(10)
            .toString();
    }

    if (theme.buttonDefaultForegroundColor) {
        variables[`button-default-foreground-color`] =
            themePrimaryColor.toString();
    }

    if (theme.buttonHoverForegroundColor) {
        variables[`button-hover-foreground-color`] =
            themePrimaryColor.toString();
    }

    if (theme.buttonFocusForegroundColor) {
        variables[`button-focus-foreground-color`] = themePrimaryColor
            .darken(10)
            .toString();
    }

    if (theme.buttonActiveForegroundColor) {
        variables[`button-active-foreground-color`] = themePrimaryColor
            .darken(10)
            .toString();
    }

    if (theme.buttonVisitedForegroundColor) {
        variables[`button-visited-foreground-color`] = themePrimaryColor
            .darken(10)
            .toString();
    }

    if (theme.buttonDefaultBackgroundColor) {
        variables[`button-default-background-color`] = whiteHex;
    }

    if (theme.buttonHoverBackgroundColor) {
        variables[`button-hover-background-color`] = themePrimaryColor
            .lighten(60)
            .toString();
    }

    if (theme.buttonHoverVariantBackgroundColor) {
        variables[`button-hover-variant-background-color`] = themePrimaryColor
            .lighten(50)
            .toString();
    }

    if (theme.buttonFocusBackgroundColor) {
        variables[`button-focus-background-color`] = themePrimaryColor
            .lighten(60)
            .toString();
    }

    if (theme.buttonActiveBackgroundColor) {
        variables[`button-active-background-color`] = themePrimaryColor
            .lighten(60)
            .toString();
    }

    if (theme.buttonVisitedBackgroundColor) {
        variables[`button-visited-background-color`] = themePrimaryColor
            .lighten(60)
            .toString();
    }

    if (theme.buttonDefaultOutlineColor) {
        variables[`button-default-outline-color`] =
            themePrimaryColor.toString();
    }

    if (theme.buttonHoverOutlineColor) {
        variables[`button-hover-outline-color`] = themePrimaryColor
            .lighten(10)
            .toString();
    }

    if (theme.buttonFocusOutlineColor) {
        variables[`button-focus-outline-color`] = themePrimaryColor
            .darken(10)
            .toString();
    }

    if (theme.buttonActiveOutlineColor) {
        variables[`button-active-outline-color`] = themePrimaryColor
            .darken(10)
            .toString();
    }

    if (theme.buttonVisitedOutlineColor) {
        variables[`button-visited-outline-color`] = themePrimaryColor
            .darken(10)
            .toString();
    }

    // ================ Custom primary palette ================
    if (themeOptions.customTheme?.primaryColor) {
        generatePalette(theme.primaryColor, 'primary-color');
        variables[`primary-color`] = theme.primaryColor;

        // Sets the defaults using custom theme
        variables[`button-primary-default-background-color`] =
            themePrimaryColor.toString();
        variables[`button-primary-hover-background-color`] = themePrimaryColor
            .lighten(10)
            .toString();
        variables[`button-primary-focus-background-color`] = themePrimaryColor
            .lighten(10)
            .toString();
        variables[`button-primary-active-background-color`] = themePrimaryColor
            .darken(10)
            .toString();
        variables[`button-primary-visited-background-color`] = themePrimaryColor
            .lighten(10)
            .toString();

        variables[`button-primary-default-border-color`] =
            themePrimaryColor.toString();
        variables[`button-primary-hover-border-color`] = themePrimaryColor
            .lighten(5)
            .toString();
        variables[`button-primary-focus-border-color`] = themePrimaryColor
            .darken(10)
            .toString();
        variables[`button-primary-active-border-color`] = themePrimaryColor
            .darken(10)
            .toString();
        variables[`button-primary-visited-border-color`] = themePrimaryColor
            .darken(10)
            .toString();

        variables[`button-default-foreground-color`] =
            themePrimaryColor.toString();
        variables[`button-hover-foreground-color`] =
            themePrimaryColor.toString();
        variables[`button-focus-foreground-color`] = themePrimaryColor
            .darken(10)
            .toString();
        variables[`button-active-foreground-color`] = themePrimaryColor
            .darken(10)
            .toString();
        variables[`button-visited-foreground-color`] = themePrimaryColor
            .darken(10)
            .toString();

        variables[`button-default-background-color`] = whiteHex;
        variables[`button-hover-background-color`] = themePrimaryColor
            .lighten(60)
            .toString();
        variables[`button-hover-variant-background-color`] = themePrimaryColor
            .lighten(50)
            .toString();
        variables[`button-focus-background-color`] = themePrimaryColor
            .lighten(60)
            .toString();
        variables[`button-active-background-color`] = themePrimaryColor
            .lighten(60)
            .toString();
        variables[`button-visited-background-color`] = themePrimaryColor
            .lighten(60)
            .toString();

        variables[`button-default-outline-color`] =
            themePrimaryColor.toString();
        variables[`button-hover-outline-color`] = themePrimaryColor
            .lighten(10)
            .toString();
        variables[`button-focus-outline-color`] = themePrimaryColor
            .darken(10)
            .toString();
        variables[`button-active-outline-color`] = themePrimaryColor
            .darken(10)
            .toString();
        variables[`button-visited-outline-color`] = themePrimaryColor
            .darken(10)
            .toString();

        // Make adjustments for dark theme colors
        if (themePrimaryColor.isDark()) {
            variables[`button-primary-default-foreground-color`] = whiteHex;
            variables[`button-primary-hover-foreground-color`] = whiteHex;
            variables[`button-primary-focus-foreground-color`] = whiteHex;
            variables[`button-primary-active-foreground-color`] = whiteHex;
            variables[`button-primary-visited-foreground-color`] = whiteHex;

            variables[`button-default-foreground-color`] =
                themePrimaryColor.toString();
            variables[`button-hover-foreground-color`] =
                themePrimaryColor.toString();
            variables[`button-focus-foreground-color`] =
                themePrimaryColor.toString();
            variables[`button-active-foreground-color`] =
                themePrimaryColor.toString();
            variables[`button-visited-foreground-color`] =
                themePrimaryColor.toString();

            variables[`button-default-outline-color`] =
                themePrimaryColor.toString();
            variables[`button-hover-outline-color`] = themePrimaryColor
                .lighten(10)
                .toString();
            variables[`button-focus-outline-color`] = themePrimaryColor
                .lighten(5)
                .toString();
            variables[`button-active-outline-color`] = themePrimaryColor
                .lighten(5)
                .toString();
            variables[`button-visited-outline-color`] = themePrimaryColor
                .lighten(5)
                .toString();

            // Make adjustments for light theme colors with unreadable text
        } else if (
            themePrimaryColor.isLight() &&
            !isReadable(whiteHex, themePrimaryColor)
        ) {
            if (themePrimaryColor.equals('#ffffff')) {
                const blackColor: TinyColor = new TinyColor(blackHex);

                variables[`button-primary-default-foreground-color`] = whiteHex;
                variables[`button-primary-hover-foreground-color`] = whiteHex;
                variables[`button-primary-focus-foreground-color`] = whiteHex;
                variables[`button-primary-active-foreground-color`] = blackHex;
                variables[`button-primary-visited-foreground-color`] = blackHex;

                variables[`button-primary-default-background-color`] = blackHex;
                variables[`button-primary-hover-background-color`] = blackColor
                    .lighten(60)
                    .toString();
                variables[`button-primary-focus-background-color`] = blackColor
                    .lighten(80)
                    .toString();
                variables[`button-primary-active-background-color`] = blackColor
                    .lighten(80)
                    .toString();
                variables[`button-primary-visited-background-color`] =
                    blackColor.lighten(80).toString();

                variables[`button-primary-default-border-color`] = blackHex;
                variables[`button-primary-hover-border-color`] = blackColor
                    .lighten(60)
                    .toString();
                variables[`button-primary-focus-border-color`] = blackColor
                    .lighten(80)
                    .toString();
                variables[`button-primary-active-border-color`] = blackColor
                    .lighten(80)
                    .toString();
                variables[`button-primary-visited-border-color`] = blackColor
                    .lighten(80)
                    .toString();

                variables[`button-default-foreground-color`] = blackHex;
                variables[`button-hover-foreground-color`] = blackHex;
                variables[`button-focus-foreground-color`] = blackHex;
                variables[`button-active-foreground-color`] = blackHex;
                variables[`button-visited-foreground-color`] = blackHex;

                variables[`button-default-background-color`] = whiteHex;
                variables[`button-hover-background-color`] = blackColor
                    .lighten(90)
                    .toString();
                variables[`button-focus-background-color`] = blackColor
                    .lighten(90)
                    .toString();
                variables[`button-active-background-color`] = blackColor
                    .lighten(90)
                    .toString();
                variables[`button-visited-background-color`] = blackColor
                    .lighten(90)
                    .toString();

                variables[`button-hover-variant-background-color`] = blackColor
                    .lighten(70)
                    .toString();

                variables[`button-default-outline-color`] = blackHex;
                variables[`button-hover-outline-color`] = blackColor
                    .lighten(60)
                    .toString();
                variables[`button-focus-outline-color`] = blackHex;
                variables[`button-active-outline-color`] = blackHex;
                variables[`button-visited-outline-color`] = blackHex;
            } else {
                variables[`button-primary-default-foreground-color`] = blackHex;
                variables[`button-primary-hover-foreground-color`] = blackHex;

                variables[`button-primary-default-border-color`] =
                    themePrimaryColor.toString();

                variables[`button-default-foreground-color`] = blackHex;
                variables[`button-hover-foreground-color`] = blackHex;
                variables[`button-focus-foreground-color`] = blackHex;
                variables[`button-active-foreground-color`] = blackHex;
                variables[`button-visited-foreground-color`] = blackHex;
            }
        }
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

    // ================ Text Color ================
    if (theme.textColor) {
        variables[`text-primary-color`] = theme.textColor;
    }

    if (theme.textColorSecondary) {
        variables[`text-secondary-color`] = theme.textColorSecondary;
    }

    if (theme.textColorInverse) {
        variables[`text-inverse-color`] = theme.textColorInverse;
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

    // Convert to css variables
    const cssList = Object.keys(variables).map(
        (key) => `--${key}: ${variables[key]};`
    );

    return `
  .theme-${themeName} {
    ${cssList.join('\n')}
  }
  `.trim();
}

function getContainer(option: Options): Element {
    if (option.attachTo) {
        return option.attachTo;
    }

    const head = document.querySelector('head');
    return head || document.body;
}

export function injectCSS(css: string, option: Options = {}): HTMLStyleElement {
    const styleNode: HTMLStyleElement =
        (document.getElementById(THEME_CONTAINER_ID) as HTMLStyleElement) ||
        document.createElement('style');
    styleNode.id = THEME_CONTAINER_ID;
    if (option.csp?.nonce) {
        styleNode.nonce = option.csp?.nonce;
    }
    styleNode.innerHTML = css;

    const container: Element = getContainer(option);
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

    return styleNode;
}

export function registerTheme(themeOptions: ThemeOptions): void {
    injectCSS(getStyle(themeOptions));
}
