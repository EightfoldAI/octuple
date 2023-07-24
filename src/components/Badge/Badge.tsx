import React, { FC, Ref } from 'react';
import { BadgeProps } from './Badge.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './badge.module.scss';

export const Badge: FC<BadgeProps> = React.forwardRef(
  (props: BadgeProps, ref: Ref<HTMLElement>) => {
    const { active, classNames, style, children, disruptive, ...rest } = props;
    const badgeClassNames: string = mergeClasses([
      styles.badge,
      { [styles.disruptive]: disruptive },
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
