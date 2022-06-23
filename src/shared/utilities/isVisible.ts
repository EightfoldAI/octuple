/**
 * Utility to determine the visibility of an element.
 * @param element - The element to check isVisible.
 * @returns {boolean}
 */
export const isVisible = (
    element: HTMLElement | SVGGraphicsElement
): boolean => {
    if (!element) {
        return false;
    }

    if ((element as HTMLElement).offsetParent) {
        return true;
    }

    if ((element as SVGGraphicsElement).getBBox) {
        const box = (element as SVGGraphicsElement).getBBox();
        if (box.width || box.height) {
            return true;
        }
    }

    if ((element as HTMLElement).getBoundingClientRect) {
        const box = (element as HTMLElement).getBoundingClientRect();
        if (box.width || box.height) {
            return true;
        }
    }

    return false;
};
