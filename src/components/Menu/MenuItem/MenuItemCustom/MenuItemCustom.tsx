import React, { FC, forwardRef } from 'react';
import { MenuItemCustomProps } from '../MenuItem.types';
import { mergeClasses } from '../../../../shared/utilities';
import { MenuSize } from '../../Menu.types';

import styles from '../menuItem.module.scss';

export const MenuItemCustom: FC<MenuItemCustomProps> = forwardRef(
  (
    { classNames, index, onChange, size = MenuSize.medium, ...item },
    ref: React.ForwardedRef<any>
  ) => {
    const menuItemClassNames: string = mergeClasses([
      styles.menuItemCustom,
      {
        [styles.large]: size === MenuSize.large,
        [styles.medium]: size === MenuSize.medium,
        [styles.small]: size === MenuSize.small,
      },
      classNames,
    ]);

    return (
      <li className={menuItemClassNames}>
        {item.render({ index, value: item, onChange, ref: ref })}
      </li>
    );
  }
);
