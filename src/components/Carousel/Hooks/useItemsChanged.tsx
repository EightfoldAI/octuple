import React, { useMemo, useState, useEffect } from 'react';
import { ItemType, separatorString, visibleElements } from '../Carousel.types';
import ItemsMap from '../ItemsMap';
import { getItemId } from '../Utilities';

const getItemsIdFromChildren = (
    children: ItemType | ItemType[] | undefined
): string[] => React.Children.toArray(children).map(getItemId).filter(Boolean);

export const useItemsChanged = (
    menuItems: ItemType | ItemType[] | undefined,
    items: ItemsMap
): string => {
    const [hash, setHash] = useState<string>('');

    const domNodes: string[] = useMemo(
        () => getItemsIdFromChildren(menuItems),
        [menuItems]
    );

    useEffect(() => {
        const hash: string = domNodes.filter(Boolean).join('');
        const allItems: visibleElements = items.toItemsWithoutSeparators();
        const removed: string[] = allItems.filter(
            (item) => !domNodes.includes(item)
        );
        removed.forEach((item: string) => {
            const isLast: boolean = items.last()?.key === item;
            const lastSeparator: string =
                (isLast && items.prev(item)?.key) || '';

            items.delete(lastSeparator);
            items.delete(`${item}${separatorString}`);
            items.delete(item);
        });

        setHash(hash);
    }, [domNodes, items]);

    return hash;
};
