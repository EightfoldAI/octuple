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
  subText,
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

  const itemSubTextClasses: string = mergeClasses([
    styles.itemSubText,
    {
      [styles.small]: size === MenuSize.small,
      [styles.medium]: size === MenuSize.medium,
      [styles.large]: size === MenuSize.large,
    },
  ]);

  return (
    <Link classNames={menuItemClasses} {...rest} role="menuitem">
      {iconProps && <Icon {...iconProps} />}
      <span className={styles.menuItemWrapper}>
        <span className={styles.itemText}>
          <span className={styles.label}>{text}</span>
          {counter && <span>{counter}</span>}
        </span>
        {subText && <span className={itemSubTextClasses}>{subText}</span>}
      </span>
    </Link>
  );
};
