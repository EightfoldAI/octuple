import React, { FC, forwardRef, Ref } from 'react';
import { ScrollContainerProps } from '../Carousel.types';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../carousel.module.scss';

export const ScrollContainer: FC<ScrollContainerProps> = forwardRef(
  (props: ScrollContainerProps, ref: Ref<HTMLUListElement>) => {
    const {
      children,
      classNames,
      containerPadding = 0,
      onScroll = () => void 0,
      rtl,
      'data-test-id': dataTestId,
      ...rest
    } = props;

    const scrollContainerClassNames: string = mergeClasses([
      styles.carouselAutoScrollContainer,
      { [styles.carouselAutoScrollContainerRtl]: !!rtl },
      classNames,
    ]);

    return (
      <ul
        {...rest}
        className={scrollContainerClassNames}
        data-test-id={dataTestId}
        onScroll={() => onScroll}
        ref={ref}
        style={{
          margin: -containerPadding,
          padding: containerPadding,
        }}
      >
        {children}
      </ul>
    );
  }
);
