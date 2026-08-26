'use client';

import React, { useEffect, useState } from 'react';

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
    maxPillWidth: 144,
  });

  const computeVisibleSections = () => {
    const selectedItemsLength = itemsRef.current?.filter(Boolean)?.length;
    if (selectedItemsLength === 0) return;
    const containerWidth =
      containerRef.current?.getBoundingClientRect().width ?? 0;
    const firstItemWidth =
      itemsRef.current?.[0]?.getBoundingClientRect().width ?? extraItemWidth;

    const isSingleItem = selectedItemsLength === 1;
    const isNarrowContainer = isSingleItem
      ? containerWidth <= 210
      : containerWidth <= 350;

    const updatedExtraItemWidth = isSingleItem
      ? 40
      : isNarrowContainer
      ? containerWidth * 0.45
      : firstItemWidth + 24;
    const maxPillWidth = isNarrowContainer ? 100 : 144;
    const availableWidth: number =
      (containerWidth - updatedExtraItemWidth) * linesToShow;
    const sections = itemsRef.current?.reduce(
      (
        acc: {
          width: number;
          count: number;
          filled: boolean;
          maxPillWidth: number;
        },
        ref: HTMLElement
      ) => {
        if (!ref) {
          return acc;
        }
        const sectionWidth = ref.getBoundingClientRect().width + itemPadding;
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
        maxPillWidth: maxPillWidth,
      }
    );
    setMaxSections(sections);
  };

  useEffect(() => {
    if (!itemsRef?.current) {
      return () => {};
    }
    computeVisibleSections();
    return () => {};
  }, [itemsRef, itemsLength, extraItemWidth, itemPadding, linesToShow]);

  useEffect(() => {
    if (!containerRef?.current) {
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
