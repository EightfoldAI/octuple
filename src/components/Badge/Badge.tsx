import React, { FC } from 'react';
import { BadgeProps, BadgeSize } from './Badge.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './badge.module.scss';

export const Badge: FC<BadgeProps> = ({
  active,
  classNames,
  size = BadgeSize.Medium,
  style,
  children,
  disruptive,
  ...rest
}) => {
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
    <span className={badgeClassNames} style={style} {...rest}>
      {children}
    </span>
  );
};
