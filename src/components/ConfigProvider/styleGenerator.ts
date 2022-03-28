import { OcTheme, ThemeOptions } from './ConfigProvider.types';
import { TinyColor } from '@ctrl/tinycolor';
import generate from './generate';
import OcThemes from './themes';

export function getStyle(theme: ThemeOptions): string {
    const variables: Record<string, string> = {};

    const fillColor = (colorVal: string, type: string): void => {
        const baseColor = new TinyColor(colorVal);
        const colorPalettes = generate(baseColor.toRgbString(), {
            theme: 'dark',
        });
        colorPalettes.forEach((color, index) => {
            variables[`${type}-color-${(index + 1) * 10}`] = color;
        });
    };

    // ================ Primary Color ================
    const selectedTheme: OcTheme | null = OcThemes?.[theme.name];

    if (selectedTheme) {
        selectedTheme.palette.reverse().reduce((acc, color, index) => {
            acc[`primary-color-${(index + 1) * 10}`] = color;
            return acc;
        }, variables);
        variables[`primary-color`] = selectedTheme.primary;
    } else if (theme.primaryColor) {
        fillColor(theme.primaryColor, 'primary');
        variables[`primary-color`] = theme.primaryColor;
    }

    // ================ Success Color ================
    if (theme.successColor) {
        fillColor(theme.successColor, 'success');
    }

    // ================ Warning Color ================
    if (theme.warningColor) {
        fillColor(theme.warningColor, 'warning');
    }

    // ================= Error Color =================
    if (theme.errorColor) {
        fillColor(theme.errorColor, 'error');
    }

    // ================= Info Color ==================
    if (theme.infoColor) {
        fillColor(theme.infoColor, 'info');
    }

    // Convert to css variables
    const cssList = Object.keys(variables).map(
        (key) => `--${key}: ${variables[key]};`
    );

    return `
  :root {
    ${cssList.join('\n')}
  }
  `.trim();
}

interface Options {
    attachTo?: Element;
    csp?: { nonce?: string };
    prepend?: boolean;
    mark?: string;
}

function getContainer(option: Options) {
    if (option.attachTo) {
        return option.attachTo;
    }

    const head = document.querySelector('head');
    return head || document.body;
}

export function injectCSS(css: string, option: Options = {}) {
    const styleNode = document.createElement('style');
    if (option.csp?.nonce) {
        styleNode.nonce = option.csp?.nonce;
    }
    styleNode.innerHTML = css;

    const container = getContainer(option);
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

export function registerTheme(theme: ThemeOptions) {
    injectCSS(getStyle(theme));
}
