import React, { FC } from 'react';
import { MenuItemSubHeaderProps } from '../MenuItem.types';
import { mergeClasses } from '../../../../shared/utilities';
import { MenuSize } from '../../Menu.types';

import styles from '../menuItem.module.scss';

export const MenuItemSubHeader: FC<MenuItemSubHeaderProps> = ({
  direction,
  size,
  text,
  wrap,
}) => {
  const subHeaderClasses: string = mergeClasses([
    styles.menuItemSubHeader,
    {
      [styles.menuItemRtl]: direction === 'rtl',
      [styles.wrap]: !!wrap,
      [styles.large]: size === MenuSize.large,
      [styles.medium]: size === MenuSize.medium,
      [styles.small]: size === MenuSize.small,
    },
  ]);
  return <span className={subHeaderClasses}>{text}</span>;
};
