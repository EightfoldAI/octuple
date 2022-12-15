import React, { FC } from 'react';
import { MenuItemLinkProps } from '../MenuItem.types';
import { Link } from '../../../Link';
import { mergeClasses } from '../../../../shared/utilities';
import { MenuSize, MenuVariant } from '../../Menu.types';
import { Icon } from '../../../Icon';

import styles from '../menuItem.module.scss';

export const MenuItemLink: FC<MenuItemLinkProps> = ({
  variant = MenuVariant.neutral,
  size = MenuSize.medium,
  active,
  classNames,
  text,
  iconProps,
  counter,
  ...rest
}) => {
  const menuItemClasses: string = mergeClasses([
    styles.menuItem,
    styles.menuLink,
    {
      [styles.small]: size === MenuSize.small,
      [styles.medium]: size === MenuSize.medium,
      [styles.large]: size === MenuSize.large,
      [styles.neutral]: variant === MenuVariant.neutral,
      [styles.primary]: variant === MenuVariant.primary,
      [styles.disruptive]: variant === MenuVariant.disruptive,
      [styles.active]: active,
    },
    classNames,
  ]);
  return (
    <Link classNames={menuItemClasses} {...rest} role="menuitem">
      {iconProps && <Icon {...iconProps} />}
      <span className={styles.label}>{text}</span>
      {counter && <span>{counter}</span>}
    </Link>
  );
};
