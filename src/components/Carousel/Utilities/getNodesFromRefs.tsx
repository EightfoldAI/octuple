import { Refs } from '../Carousel.types';

export const getNodesFromRefs = (refs: Refs): HTMLElement[] => {
    const result = Object.values(refs)
        .map((el) => el.current)
        .filter(Boolean);

    return result as unknown as HTMLElement[];
};
