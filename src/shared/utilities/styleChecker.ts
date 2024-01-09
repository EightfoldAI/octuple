import { canUseDom } from './canUseDom';
import { canUseDocElement } from './flexGapSupported';

/**
 * Utility to determine if the browser supprts a given style name.
 * Takes a single styleName string or an array.
 * @param styleName the name of the style.
 * @returns {boolean}
 */
const isStyleNameSupport = (styleName: string | string[]): boolean => {
  if (canUseDom() && canUseDocElement()) {
    const styleNameList = Array.isArray(styleName) ? styleName : [styleName];
    const { documentElement } = window.document;

    return styleNameList.some((name) => name in documentElement.style);
  }
  return false;
};

/**
 * Utility to determine if the browser supprts a given style value.
 * Takes a single styleName string.
 * @param styleName - the name of the style.
 * @param value - The value of the style
 * @returns {boolean}
 */
const isStyleValueSupport = (styleName: string, value: any): boolean => {
  if (!isStyleNameSupport(styleName)) {
    return false;
  }

  const ele = document.createElement('div');
  const origin = (<any>ele.style)[styleName];
  (<any>ele.style)[styleName] = value;
  return (<any>ele.style)[styleName] !== origin;
};

/**
 * Utility to determine if the browser supports a given style name and/or its value.
 * Takes a single styleName string or an array.
 * @param styleName - Name of the style.
 * @param styleValue - Value of the style.
 * @returns {boolean}
 */
export const isStyleSupport = (
  styleName: string | string[],
  styleValue?: any
): boolean => {
  if (!Array.isArray(styleName) && styleValue !== undefined) {
    return isStyleValueSupport(styleName, styleValue);
  }

  return isStyleNameSupport(styleName);
};
