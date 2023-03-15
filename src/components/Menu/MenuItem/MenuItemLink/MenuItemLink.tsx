import React, { FC } from 'react';
import { MenuItemIconAlign, MenuItemLinkProps } from '../MenuItem.types';
import { Link } from '../../../Link';
import { mergeClasses } from '../../../../shared/utilities';
import { MenuSize, MenuVariant } from '../../Menu.types';
import { Icon, IconSize } from '../../../Icon';

import styles from '../menuItem.module.scss';

export const MenuItemLink: FC<MenuItemLinkProps> = ({
  active,
  alignIcon = MenuItemIconAlign.Left,
  classNames,
  counter,
  direction,
  iconProps,
  size = MenuSize.medium,
  subText,
  text,
  variant = MenuVariant.neutral,
  wrap = false,
  ...rest
}) => {
  const menuItemClasses: string = mergeClasses([
    styles.menuItem,
    {
      [styles.menuItemRtl]: direction === 'rtl',
      [styles.wrap]: !!wrap,
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

  const menuSizeToIconSizeMap: Map<MenuSize, IconSize> = new Map<
    MenuSize,
    IconSize
  >([
    [MenuSize.large, IconSize.Large],
    [MenuSize.medium, IconSize.Medium],
    [MenuSize.small, IconSize.Small],
  ]);

  return (
    <li role="menuitem" tabIndex={-1} className={menuItemClasses}>
      <Link classNames={styles.menuLink} fullWidth tabIndex={0} {...rest}>
        {iconProps && alignIcon !== MenuItemIconAlign.Right && (
          <Icon size={menuSizeToIconSizeMap.get(size)} {...iconProps} />
        )}
        <span className={styles.menuItemWrapper}>
          <span className={styles.itemText}>
            <span className={styles.label}>{text}</span>
            {counter && <span>{counter}</span>}
          </span>
          {subText && <span className={itemSubTextClasses}>{subText}</span>}
        </span>
        {iconProps && alignIcon === MenuItemIconAlign.Right && (
          <Icon size={menuSizeToIconSizeMap.get(size)} {...iconProps} />
        )}
      </Link>
    </li>
  );
};
