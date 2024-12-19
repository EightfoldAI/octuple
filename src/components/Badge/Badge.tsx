'use client';

import React, { FC, Ref } from 'react';
import { BadgeProps, BadgeSize } from './Badge.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './badge.module.scss';

export const Badge: FC<BadgeProps> = React.forwardRef(
  (props: BadgeProps, ref: Ref<HTMLElement>) => {
    const {
      active,
      classNames,
      size = BadgeSize.Medium,
      style,
      children,
      disruptive,
      ...rest
    } = props;
    const badgeClassNames: string = mergeClasses([
      styles.badge,
      { [styles.disruptive]: disruptive },
      { [styles.badgeLarge]: size === BadgeSize.Large },
      { [styles.badgeMedium]: size === BadgeSize.Medium },
      { [styles.badgeSmall]: size === BadgeSize.Small },
      classNames,
      { [styles.active]: active },
    ]);
    return (
      <span ref={ref} className={badgeClassNames} style={style} {...rest}>
        {children}
      </span>
    );
  }
);
