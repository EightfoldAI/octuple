import ResizeObserver from 'resize-observer-polyfill';

export type ResizeListener = (element: Element) => void;

const elementListeners = new Map<Element, Set<ResizeListener>>();

const onResize = (entities: ResizeObserverEntry[]) => {
    entities.forEach((entity) => {
        const { target } = entity;
        elementListeners.get(target)?.forEach((listener) => listener(target));
    });
};

// Note: ResizeObserver polyfill not support option to measure border-box resize
const resizeObserver: ResizeObserver = new ResizeObserver(onResize);

// Dev env only
export const _el =
    process.env.NODE_ENV !== 'production' ? elementListeners : null; // eslint-disable-line
export const _rs = process.env.NODE_ENV !== 'production' ? onResize : null; // eslint-disable-line

export const observe = (element: Element, callback: ResizeListener): void => {
    if (!elementListeners.has(element)) {
        elementListeners.set(element, new Set());
        resizeObserver.observe(element);
    }

    elementListeners.get(element).add(callback);
};

export const unobserve = (element: Element, callback: ResizeListener): void => {
    if (elementListeners.has(element)) {
        elementListeners.get(element).delete(callback);
        if (!elementListeners.get(element).size) {
            resizeObserver.unobserve(element);
            elementListeners.delete(element);
        }
    }
};
