import { canUseDom } from './canUseDom';
import { canUseDocElement } from './flexGapSupported';

const PIXEL_PATTERN: RegExp = /margin|padding|width|height|max|min|offset/;

const removePixel = {
  left: true,
  top: true,
};

/**
 * Utility to get the computed style of a given element.
 * @param element - The element.
 * @returns The computed style of a given element.
 */
export const getComputedStyle = (element: HTMLElement) => {
  return element.nodeType === 1
    ? element.ownerDocument.defaultView.getComputedStyle(element, null)
    : {};
};

/**
 * Utility to get the style value of a given element.
 * @param element - The element.
 * @param type - The style property
 * @param value -The style property value
 * @returns The style value of a given elementt.
 */
export const getStyleValue = (
  element: HTMLElement,
  type: string,
  value: any
) => {
  type = type.toLowerCase();
  if (value === 'auto') {
    if (type === 'height') {
      return element.offsetHeight;
    }
    if (type === 'width') {
      return element.offsetWidth;
    }
  }
  if (!(type in removePixel)) {
    (removePixel as any)[type] = PIXEL_PATTERN.test(type);
  }
  return (removePixel as any)[type] ? parseFloat(value) || 0 : value;
};

/**
 * Utility to get the outer width of a given element.
 * @param element - The element.
 * @returns The outer width of a given element.
 */
export const getOuterWidth = (element: HTMLElement): number => {
  if (canUseDocElement() && element === document.body) {
    return document.documentElement.clientWidth;
  }
  return element.offsetWidth;
};

/**
 * Utility to get the outer height of a given element.
 * @param element - The element.
 * @returns The outer height of a given element.
 */
export const getOuterHeight = (element: HTMLElement): number => {
  if (canUseDom() && canUseDocElement() && element === document.body) {
    return window.innerHeight || document.documentElement.clientHeight;
  }
  return element.offsetHeight;
};

/**
 * Utility to get the document width and height.
 * @returns The document width and height.
 */
export const getDocSize = (): {
  width: number;
  height: number;
} => {
  let width: number = 0;
  let height: number = 0;
  if (canUseDocElement()) {
    width = Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth
    );
    height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
  }

  return {
    width,
    height,
  };
};

/**
 * Utility to get the client size.
 * @returns The client size.
 */
export const getClientSize = (): {
  width: number;
  height: number;
} => {
  let width: number = 0;
  let height: number = 0;
  if (canUseDocElement()) {
    width = document.documentElement.clientWidth;
  }
  if (canUseDom()) {
    height = window.innerHeight;
  } else if (canUseDocElement()) {
    height = document.documentElement.clientHeight;
  }
  return {
    width,
    height,
  };
};

/**
 * Utility to get the scroll position.
 * @returns The scroll position.
 */
export const getScrollPosition = (): {
  scrollLeft: number;
  scrollTop: number;
} => {
  let scrollLeft: number = 0;
  let scrollTop: number = 0;
  if (canUseDocElement()) {
    scrollLeft = Math.max(
      document.documentElement.scrollLeft,
      document.body.scrollLeft
    );
    scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  }

  return {
    scrollLeft,
    scrollTop,
  };
};

/**
 * Utility to get the offset position of a given element.
 * @param element - The element.
 * @returns The offset position of a given element.
 */
export const getOffset = (
  element: HTMLElement
): {
  left: number;
  top: number;
} => {
  const box: DOMRect = element.getBoundingClientRect();
  let docElem: HTMLElement | null = null;
  let pageXOffset: number = 0;
  let pageYOffset: number = 0;
  let clientLeft: number = 0;
  let clientTop: number = 0;
  if (canUseDocElement()) {
    docElem = document.documentElement;
    clientLeft = docElem.clientLeft || document.body.clientLeft || 0;
    clientTop = docElem.clientTop || document.body.clientTop || 0;
  }
  if (canUseDom()) {
    pageXOffset = window.pageXOffset;
    pageYOffset = window.pageYOffset;
  }
  return {
    left: box.left + (pageXOffset || docElem?.scrollLeft || 0) - clientLeft,
    top: box.top + (pageYOffset || docElem?.scrollTop || 0) - clientTop,
  };
};
