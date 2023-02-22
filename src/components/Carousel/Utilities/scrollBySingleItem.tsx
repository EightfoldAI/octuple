import { CustomScrollBehaviorCallback } from 'scroll-into-view-if-needed/typings/types';
import {
  CustomScrollBehavior,
  IntersectionObserverItem,
  ItemOrElement,
} from '../Carousel.types';

// TODO: Currently, scrollIntoView API, nor it's extended versions afford an offset to avoid
// occlusion of menu items when single scroll. For now use scrollBy API, then find a normailized solution.
export function scrollBySingleItem<T>(
  item: ItemOrElement,
  behavior?: ScrollBehavior | CustomScrollBehavior<T>,
  direction?: string,
  gap?: number,
  offset?: number
): T | Promise<T> | void {
  const _item: Element =
    (item as IntersectionObserverItem)?.entry?.target || (item as Element);
  const _behavior: ScrollBehavior | CustomScrollBehaviorCallback<T> =
    behavior || 'smooth';

  if (_item) {
    const gapMultiplierValue: number = gap * 2;
    const scrollDistance: number =
      _item.getBoundingClientRect().width - gapMultiplierValue + offset;

    return _item.parentElement?.scrollBy({
      left: direction === 'next' ? scrollDistance : -scrollDistance,
      behavior: _behavior as ScrollBehavior,
    });
  }
}
