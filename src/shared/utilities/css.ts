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
    if (element === document.body) {
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
    if (element === document.body) {
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
    const width: number = Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth
    );
    const height: number = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
    );

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
    const width: number = document.documentElement.clientWidth;
    const height: number =
        window.innerHeight || document.documentElement.clientHeight;
    return {
        width,
        height,
    };
};

/**
 * Utility to get the scroll position.
 * @returns The scroll position.
 */
export const getScroll = (): {
    scrollLeft: number;
    scrollTop: number;
} => {
    return {
        scrollLeft: Math.max(
            document.documentElement.scrollLeft,
            document.body.scrollLeft
        ),
        scrollTop: Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop
        ),
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
    const docElem: HTMLElement = document.documentElement;

    return {
        left:
            box.left +
            (window.pageXOffset || docElem.scrollLeft) -
            (docElem.clientLeft || document.body.clientLeft || 0),
        top:
            box.top +
            (window.pageYOffset || docElem.scrollTop) -
            (docElem.clientTop || document.body.clientTop || 0),
    };
};
