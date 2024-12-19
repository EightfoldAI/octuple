'use client';

import React, { Ref } from 'react';
import { ColProps, ColSize, FlexType } from './Grid.types';
import { mergeClasses } from '../../shared/utilities';
import RowContext from './RowContext';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './grid.module.scss';

const parseFlex = (flex: FlexType): string => {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`;
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`;
  }

  return flex;
};

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const Col = React.forwardRef<HTMLDivElement, ColProps>(
  (props, ref: Ref<HTMLDivElement>) => {
    const htmlDir: string = useCanvasDirection();
    const { gutter, wrap, supportFlexGap } = React.useContext(RowContext);

    const {
      children,
      classNames,
      flex,
      offset,
      order,
      pull,
      push,
      span,
      style,
      ...rest
    } = props;

    let sizeClassObj = {};
    sizes.forEach((size) => {
      let sizeProps: ColSize = {};
      const propSize = props[size];
      if (typeof propSize === 'number') {
        sizeProps.span = propSize;
      } else if (typeof propSize === 'object') {
        sizeProps = propSize || {};
      }

      delete rest[size];

      sizeClassObj = {
        ...sizeClassObj,
        [(styles as any)[`col-${size}-${sizeProps.span}`]]:
          sizeProps.span !== undefined,
        [(styles as any)[`col-${size}-order-${sizeProps.order}`]]:
          sizeProps.order || sizeProps.order === 0,
        [(styles as any)[`col-${size}-offset-${sizeProps.offset}`]]:
          sizeProps.offset || sizeProps.offset === 0,
        [(styles as any)[`col-${size}-push-${sizeProps.push}`]]:
          sizeProps.push || sizeProps.push === 0,
        [(styles as any)[`col-${size}-pull-${sizeProps.pull}`]]:
          sizeProps.pull || sizeProps.pull === 0,
        [styles.colRtl]: htmlDir === 'rtl',
      };
    });

    const colClassNames: string = mergeClasses([
      styles.col,
      { [(styles as any)[`col-${span}`]]: span !== undefined },
      { [(styles as any)[`col-order-${order}`]]: order },
      { [(styles as any)[`col-offset-${offset}`]]: offset },
      { [(styles as any)[`col-push-${push}`]]: push },
      { [(styles as any)[`col-pull-${pull}`]]: pull },
      classNames,
      sizeClassObj,
    ]);

    const mergedStyle: React.CSSProperties = {};

    // Horizontal gutter use padding
    if (gutter && gutter[0] > 0) {
      const horizontalGutter: number = gutter[0] / 2;
      mergedStyle.paddingLeft = horizontalGutter;
      mergedStyle.paddingRight = horizontalGutter;
    }

    // Vertical gutter use padding when gap not support
    if (gutter && gutter[1] > 0 && !supportFlexGap) {
      const verticalGutter: number = gutter[1] / 2;
      mergedStyle.paddingTop = verticalGutter;
      mergedStyle.paddingBottom = verticalGutter;
    }

    if (flex) {
      mergedStyle.flex = parseFlex(flex);

      // Hack for Firefox to avoid size issue
      if (wrap === false && !mergedStyle.minWidth) {
        mergedStyle.minWidth = 0;
      }
    }

    return (
      <div
        {...rest}
        style={{ ...mergedStyle, ...style }}
        className={colClassNames}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
