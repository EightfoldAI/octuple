import { useEffect } from 'react';

/**
 * A custom hook that uses ResizeObserver to monitor changes in the size of a DOM element.
 * @param ref - The ref of the element to observe.
 * @param callback - A callback function that is called when the size of the element changes.
 */
export function useResizeObserver(
  ref: React.RefObject<HTMLElement>,
  callback: (entry: ResizeObserverEntry) => void
): void {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      entries.forEach(callback);
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
}
