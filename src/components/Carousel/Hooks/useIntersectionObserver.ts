import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { Item, Refs, visibleElements } from '../Carousel.types';
import { getNodesFromRefs, observerEntriesToItems } from '../Utilities';
import { observerOptions } from '../Settings';
import ItemsMap from '../ItemsMap';
import { requestAnimationFrameWrapper } from '../../../shared/utilities';

interface IntersectionProps {
  items: ItemsMap;
  itemsChanged: string;
  options: typeof observerOptions;
  refs: Refs;
}

export const useIntersectionObserver = ({
  items,
  itemsChanged,
  refs,
  options,
}: IntersectionProps) => {
  const observer: { current?: IntersectionObserver } = useRef();

  const [visibleElementsWithSeparators, setVisibleElementsWithSeparators] =
    useState<visibleElements>([]);

  const throttleTimer: { current: number } = useRef(
    +setTimeout(() => void 0, 0)
  );

  const intersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      items.set(observerEntriesToItems(entries, options));

      clearTimeout(throttleTimer.current);
      throttleTimer.current = +setTimeout(() => {
        requestAnimationFrameWrapper(() => {
          setVisibleElementsWithSeparators((currentVisible) => {
            const newVisibleElements = items
              .getVisible()
              .map((el: Item) => el[1].key);
            if (
              JSON.stringify(currentVisible) !==
              JSON.stringify(newVisibleElements)
            ) {
              return newVisibleElements;
            }
            return currentVisible;
          });
        });
      }, options.throttle);
    },
    [items, options]
  );

  useLayoutEffect(() => {
    const elements: HTMLElement[] = getNodesFromRefs(refs);
    const observerInstance: IntersectionObserver =
      observer.current ||
      new IntersectionObserver(intersectionObserverCallback, options);
    observer.current = observerInstance;
    elements.forEach((elem: Element) => observerInstance.observe(elem));

    return () => {
      clearTimeout(throttleTimer.current);
      observerInstance.disconnect();
      observer.current = undefined;
    };
  }, [intersectionObserverCallback, itemsChanged, options, refs]);

  return {
    visibleElementsWithSeparators,
  };
};
