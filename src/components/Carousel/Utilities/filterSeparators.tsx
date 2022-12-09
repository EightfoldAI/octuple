import { separatorString, visibleElements } from '../Carousel.types';

export const filterSeparators = (items: visibleElements): visibleElements =>
    items.filter(
        (item: string) => !new RegExp(`.*${separatorString}$`).test(item)
    );
