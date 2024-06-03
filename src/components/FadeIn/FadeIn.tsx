'use client';

import React, { FC, Ref } from 'react';
import { FadeInProps } from './FadeIn.types';
import { animated, useSpring, UseSpringProps } from '@react-spring/web';

export const FadeIn: FC<FadeInProps> = React.forwardRef(
  (props: FadeInProps, ref: Ref<HTMLDivElement>) => {
    const {
      children,
      classNames,
      delay = 0,
      disabled = false,
      duration = 300,
      'data-testid': dataTestId,
      ...rest
    } = props;
    const styles: UseSpringProps<{ opacity: number }> = useSpring({
      to: { opacity: 1 },
      from: { opacity: 0 },
      config: {
        duration,
      },
      delay,
      immediate: disabled,
    });

    return (
      <animated.div
        data-testid={dataTestId}
        className={classNames}
        ref={ref}
        style={styles}
        {...rest}
      >
        {children}
      </animated.div>
    );
  }
);
