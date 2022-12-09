import { Item } from '../Carousel.types';
import { observerOptions } from '../Settings';

export const observerEntriesToItems = (
    entries: IntersectionObserverEntry[],
    options: typeof observerOptions
): Item[] => {
    return [...entries].map((entry: IntersectionObserverEntry) => {
        const target: HTMLElement = entry.target as HTMLElement;
        const key: string = String(target?.dataset?.key ?? '');
        const index: string = String(target?.dataset?.index ?? '');

        return [
            key,
            {
                index,
                key,
                entry,
                visible: entry.intersectionRatio >= options.ratio,
            },
        ];
    });
};
