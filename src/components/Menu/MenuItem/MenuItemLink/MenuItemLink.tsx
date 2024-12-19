import React, { FC, forwardRef } from 'react';
import { MenuItemIconAlign, MenuItemLinkProps } from '../MenuItem.types';
import { Link } from '../../../Link';
import { mergeClasses } from '../../../../shared/utilities';
import { MenuSize, MenuVariant } from '../../Menu.types';
import { Icon, IconSize } from '../../../Icon';

import styles from '../menuItem.module.scss';

export const MenuItemLink: FC<MenuItemLinkProps> = forwardRef(
  (
    {
      active,
      alignIcon = MenuItemIconAlign.Left,
      classNames,
      counter,
      direction,
      disabled,
      iconProps,
      role = 'menuitem',
      size = MenuSize.medium,
      subText,
      tabIndex = 0,
      text,
      variant = MenuVariant.neutral,
      wrap = false,
      ...rest
    },
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => {
    const menuItemClassNames: string = mergeClasses([
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
        [styles.disabled]: disabled,
      },
      classNames,
    ]);

    const itemSubTextClassNames: string = mergeClasses([
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

    const getIcon = (): JSX.Element => (
      <Icon size={menuSizeToIconSizeMap.get(size)} {...iconProps} />
    );

    return (
      <li className={menuItemClassNames}>
        <Link
          classNames={styles.menuLink}
          disabled={disabled}
          fullWidth
          ref={ref}
          role={role}
          tabIndex={tabIndex}
          {...rest}
        >
          {iconProps && alignIcon === MenuItemIconAlign.Left && getIcon()}
          <span className={styles.menuItemWrapper}>
            <span className={styles.itemText}>
              <span className={styles.label}>{text}</span>
              {counter && <span>{counter}</span>}
            </span>
            {subText && (
              <span className={itemSubTextClassNames}>{subText}</span>
            )}
          </span>
          {iconProps && alignIcon === MenuItemIconAlign.Right && getIcon()}
        </Link>
      </li>
    );
  }
);
