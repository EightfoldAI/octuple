import { CustomScrollBehaviorCallback } from 'scroll-into-view-if-needed/typings/types';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import {
    CustomScrollBehavior,
    IntersectionObserverItem,
    ItemOrElement,
    scrollToItemOptions,
} from '../Carousel.types';

export function scrollToItem<T>(
    item: ItemOrElement,
    behavior?: ScrollBehavior | CustomScrollBehavior<T>,
    inline?: ScrollLogicalPosition,
    block?: ScrollLogicalPosition,
    rest?: scrollToItemOptions,
    noPolyfill?: boolean
): T | Promise<T> | void {
    const _item: Element =
        (item as IntersectionObserverItem)?.entry?.target || (item as Element);
    const _behavior: ScrollBehavior | CustomScrollBehaviorCallback<T> =
        behavior || 'smooth';

    if (_item) {
        if (noPolyfill) {
            return _item?.scrollIntoView({
                behavior: _behavior as ScrollBehavior,
                inline: inline || 'end',
                block: block || 'nearest',
            });
        }
        return scrollIntoView(_item, {
            behavior: _behavior as ScrollBehavior,
            inline: inline || 'end',
            block: block || 'nearest',
            duration: 400,
            ...rest,
        });
    }
}
