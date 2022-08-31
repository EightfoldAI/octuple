import { useEffect, useState } from 'react';

export const useMaxVisibleSections = (
    containerRef: React.MutableRefObject<HTMLElement>,
    itemsRef: React.MutableRefObject<HTMLElement[]>,
    extraItemWidth = 0,
    itemPadding = 0,
    linesToShow = 1,
    itemsLength = 0
) => {
    const [maxSections, setMaxSections] = useState({
        width: 0,
        count: 0,
        filled: false,
    });

    const computeVisibleSections = () => {
        const availableWidth: number =
            (containerRef.current?.getBoundingClientRect().width -
                extraItemWidth) *
            linesToShow;
        const sections = itemsRef.current?.reduce(
            (
                acc: {
                    width: number;
                    count: number;
                    filled: boolean;
                },
                ref: HTMLElement
            ) => {
                if (!ref) {
                    return acc;
                }
                const sectionWidth =
                    ref.getBoundingClientRect().width + itemPadding;
                if (acc.width + sectionWidth < availableWidth) {
                    acc.width += sectionWidth;
                    acc.count += 1;
                } else {
                    return { ...acc, filled: true };
                }
                return acc;
            },
            {
                width: 0,
                count: 0,
                filled: false,
            }
        );
        setMaxSections(sections);
    };

    useEffect(() => {
        if (!itemsRef.current) {
            return () => {};
        }
        computeVisibleSections();
        return () => {};
    }, [itemsRef, itemsLength]);

    useEffect(() => {
        if (!containerRef.current) {
            return () => {};
        }
        const ro = new ResizeObserver(() => {
            computeVisibleSections();
        });
        ro.observe(containerRef.current);
        return () => {
            ro.disconnect();
        };
    }, [containerRef]);

    return maxSections;
};
