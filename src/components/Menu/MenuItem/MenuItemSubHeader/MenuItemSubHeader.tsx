import React, { FC, forwardRef } from 'react';
import { MenuItemSubHeaderProps } from '../MenuItem.types';
import { mergeClasses } from '../../../../shared/utilities';
import { MenuSize } from '../../Menu.types';

import styles from '../menuItem.module.scss';

export const MenuItemSubHeader: FC<MenuItemSubHeaderProps> = forwardRef(
  (
    { classNames, direction, size, text, wrap, ...rest },
    ref: React.ForwardedRef<HTMLSpanElement>
  ) => {
    const subHeaderClassNames: string = mergeClasses([
      styles.menuItemSubHeader,
      {
        [styles.menuItemRtl]: direction === 'rtl',
        [styles.wrap]: !!wrap,
        [styles.large]: size === MenuSize.large,
        [styles.medium]: size === MenuSize.medium,
        [styles.small]: size === MenuSize.small,
      },
      classNames,
    ]);
    return (
      <li className={subHeaderClassNames}>
        <span data-disabled {...rest} tabIndex={-1} ref={ref}>
          {text}
        </span>
      </li>
    );
  }
);
