import React, { FC } from 'react';
import { MenuItemButtonProps, MenuItemIconAlign } from '../MenuItem.types';
import { MenuSize, MenuVariant } from '../../Menu.types';
import { mergeClasses } from '../../../../shared/utilities';
import { Icon, IconSize } from '../../../Icon';
import { ButtonShape, ButtonSize, NeutralButton } from '../../../Button';

import styles from '../menuItem.module.scss';

export const MenuItemButton: FC<MenuItemButtonProps> = ({
  active,
  alignIcon,
  classNames,
  counter,
  direction,
  disabled,
  iconProps,
  onClick,
  role = 'menuitem',
  secondaryButtonProps,
  size = MenuSize.medium,
  subText,
  tabIndex = 0,
  text,
  type,
  value,
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
      [styles.disabled]: disabled,
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

  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ): void => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(value);
  };

  const menuSizeToIconSizeMap: Map<MenuSize, IconSize> = new Map<
    MenuSize,
    IconSize
  >([
    [MenuSize.large, IconSize.Large],
    [MenuSize.medium, IconSize.Medium],
    [MenuSize.small, IconSize.Small],
  ]);

  return secondaryButtonProps ? (
    <li role={role} tabIndex={-1} className={menuItemClasses}>
      <span className={styles.menuSecondaryWrapper}>
        <button
          className={styles.menuOuterButton}
          disabled={disabled}
          tabIndex={tabIndex}
          {...rest}
          onClick={handleOnClick}
        >
          {iconProps && alignIcon !== MenuItemIconAlign.Right && (
            <Icon size={menuSizeToIconSizeMap.get(size)} {...iconProps} />
          )}
          <span className={styles.menuItemWrapper}>
            <span className={styles.itemText}>
              <span className={styles.label}>{text}</span>
            </span>
          </span>
          {iconProps && alignIcon === MenuItemIconAlign.Right && (
            <Icon size={menuSizeToIconSizeMap.get(size)} {...iconProps} />
          )}
        </button>
        <span className={styles.menuInnerButton}>
          {counter && <span>{counter}</span>}
          {secondaryButtonProps && (
            <NeutralButton
              disabled={disabled}
              size={ButtonSize.Small}
              shape={ButtonShape.Round}
              {...secondaryButtonProps}
            />
          )}
        </span>
      </span>
      {subText && <span className={itemSubTextClasses}>{subText}</span>}
    </li>
  ) : (
    <li role={role} tabIndex={-1} className={menuItemClasses}>
      <button
        className={styles.menuItemButton}
        disabled={disabled}
        tabIndex={tabIndex}
        {...rest}
        onClick={handleOnClick}
      >
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
      </button>
    </li>
  );
};
