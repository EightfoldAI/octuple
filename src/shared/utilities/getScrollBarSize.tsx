import { canUseDocElement } from './flexGapSupported';

let cached: number;

/**
 * Utility the gets the scroll bar size.
 * @param fresh - boolean to determine whether to get the size or use the cached size.
 * @returns {number}
 */
export const getScrollBarSize = (fresh?: boolean): number => {
  if (!canUseDocElement()) {
    return 0;
  }

  if (fresh || cached === undefined) {
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    const outerStyle = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = '0';
    outerStyle.left = '0';
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);

    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }
  return cached;
};

const ensureSize = (str: string): number => {
  const match = str.match(/^(.*)px$/);
  const value = Number(match?.[1]);
  return Number.isNaN(value) ? getScrollBarSize() : value;
};

/**
 * Utility that gets the scroll bar size of a given element.
 * @param target - the target element to get the scroll bar size.
 * @returns {number, number}
 */
export const getTargetScrollBarSize = (
  target: HTMLElement
): {
  width: number;
  height: number;
} => {
  if (!canUseDocElement() || !target || !(target instanceof Element)) {
    return { width: 0, height: 0 };
  }

  const { width, height } = getComputedStyle(target, '::-webkit-scrollbar');
  return {
    width: ensureSize(width),
    height: ensureSize(height),
  };
};
