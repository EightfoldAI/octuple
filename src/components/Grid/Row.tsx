'use client';

import React, { Ref, useEffect } from 'react';
import { Gutter, RowProps } from './Grid.types';
import useFlexGapSupport from '../../hooks/useFlexGapSupport';
import type { Breakpoint, ScreenMap } from '../../shared/utilities';
import {
  mergeClasses,
  responsiveArray,
  responsiveObserve,
} from '../../shared/utilities';
import RowContext from './RowContext';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './grid.module.scss';

type Gap = number | undefined;

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  (
    { align, children, classNames, gutter = 0, justify, style, wrap, ...rest },
    ref: Ref<HTMLDivElement>
  ) => {
    const htmlDir: string = useCanvasDirection();

    const [screens, setScreens] = React.useState<ScreenMap>({
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true,
    });

    const supportFlexGap: boolean = useFlexGapSupport();

    const gutterRef = React.useRef<Gutter | [Gutter, Gutter]>(gutter);

    useEffect(() => {
      const token = responsiveObserve.subscribe((screen: any) => {
        const currentGutter = gutterRef.current || 0;
        if (
          (!Array.isArray(currentGutter) &&
            typeof currentGutter === 'object') ||
          (Array.isArray(currentGutter) &&
            (typeof currentGutter[0] === 'object' ||
              typeof currentGutter[1] === 'object'))
        ) {
          setScreens(screen);
        }
      });
      return () => responsiveObserve.unsubscribe(token);
    }, []);

    const getGutter = (): [Gap, Gap] => {
      const results: [Gap, Gap] = [undefined, undefined];
      const normalizedGutter = Array.isArray(gutter)
        ? gutter
        : [gutter, undefined];
      normalizedGutter.forEach((g: Gutter, index: number): void => {
        if (typeof g === 'object') {
          for (let i: number = 0; i < responsiveArray.length; i++) {
            const breakpoint: Breakpoint = responsiveArray[i];
            if (screens[breakpoint] && g[breakpoint] !== undefined) {
              results[index] = g[breakpoint] as number;
              break;
            }
          }
        } else {
          results[index] = g;
        }
      });
      return results;
    };

    const gutters: [number, number] = getGutter();
    const rowClassNames: string = mergeClasses([
      styles.row,
      { [styles.rowNoWrap]: wrap === false },
      { [styles.rowStart]: justify === 'start' },
      { [styles.rowEnd]: justify === 'end' },
      { [styles.rowCenter]: justify === 'center' },
      { [styles.rowSpaceAround]: justify === 'space-around' },
      { [styles.rowSpaceBetween]: justify === 'space-between' },
      { [styles.rowSpaceEvenly]: justify === 'space-evenly' },
      { [styles.rowTop]: align === 'top' },
      { [styles.rowMiddle]: align === 'middle' },
      { [styles.rowBottom]: align === 'bottom' },
      { [styles.rowStretch]: align === 'stretch' },
      { [styles.rowRtl]: htmlDir === 'rtl' },
      classNames,
    ]);

    // Add gutter related style
    const rowStyle: React.CSSProperties = {};
    const horizontalGutter =
      gutters[0] != null && gutters[0] > 0 ? gutters[0] / -2 : undefined;
    const verticalGutter =
      gutters[1] != null && gutters[1] > 0 ? gutters[1] / -2 : undefined;

    if (horizontalGutter) {
      rowStyle.marginLeft = horizontalGutter;
      rowStyle.marginRight = horizontalGutter;
    }

    // Set gap direct if flex gap support
    if (supportFlexGap) {
      [, rowStyle.rowGap] = gutters;
    } else if (verticalGutter) {
      rowStyle.marginTop = verticalGutter;
      rowStyle.marginBottom = verticalGutter;
    }

    // "gutters" is a new array in each rendering phase, it'll make 'React.useMemo' effectless.
    // So we deconstruct "gutters" variable here.
    const [gutterH, gutterV] = gutters;
    const rowContext = React.useMemo(
      () => ({
        gutter: [gutterH, gutterV] as [number, number],
        wrap,
        supportFlexGap,
      }),
      [gutterH, gutterV, wrap, supportFlexGap]
    );

    return (
      <RowContext.Provider value={rowContext}>
        <div
          {...rest}
          className={rowClassNames}
          style={{ ...rowStyle, ...style }}
          ref={ref}
        >
          {children}
        </div>
      </RowContext.Provider>
    );
  }
);
