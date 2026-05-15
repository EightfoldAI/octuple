import React, { FC, forwardRef } from 'react';
import { MenuItemButtonProps, MenuItemIconAlign } from '../MenuItem.types';
import { MenuSize, MenuVariant } from '../../Menu.types';
import {
  Button,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from '../../../Button';
import { Icon, IconSize } from '../../../Icon';
import { mergeClasses } from '../../../../shared/utilities';

import styles from '../menuItem.module.scss';

export const MenuItemButton: FC<MenuItemButtonProps> = forwardRef(
  (
    {
      active,
      alignIcon = MenuItemIconAlign.Left,
      classNames,
      counter,
      direction,
      disabled,
      dropdownMenuItems,
      dropdownMenuProps,
      htmlType = 'button',
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
      menuRenderer,
      listItemRole,
      ...rest
    },
    ref: React.ForwardedRef<HTMLButtonElement>
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

    const handleOnClick = (
      event: React.MouseEvent<HTMLButtonElement | MouseEvent>
    ): void => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(value, event);
    };

    const getIcon = (): JSX.Element => (
      <Icon size={menuSizeToIconSizeMap.get(size)} {...iconProps} />
    );

    const menuSizeToIconSizeMap: Map<MenuSize, IconSize> = new Map<
      MenuSize,
      IconSize
    >([
      [MenuSize.large, IconSize.Large],
      [MenuSize.medium, IconSize.Medium],
      [MenuSize.small, IconSize.Small],
    ]);

    const menuButton = (isNested: boolean = false): JSX.Element => (
      <button
        className={styles.menuItemButton}
        disabled={disabled}
        tabIndex={tabIndex}
        type={htmlType}
        {...rest}
        onClick={!isNested ? handleOnClick : null}
        ref={ref}
        role={role}
      >
        {iconProps && alignIcon === MenuItemIconAlign.Left && getIcon()}
        <span className={styles.menuItemWrapper}>
          <span className={styles.itemText}>
            <span className={styles.label}>{text}</span>
            {counter && <span>{counter}</span>}
          </span>
          {subText && <span className={itemSubTextClassNames}>{subText}</span>}
        </span>
        {iconProps && alignIcon === MenuItemIconAlign.Right && getIcon()}
      </button>
    );

    const secondaryButton = (): JSX.Element => (
      <>
        <span className={styles.menuSecondaryWrapper} role={role}>
          <button
            className={styles.menuOuterButton}
            disabled={disabled}
            tabIndex={tabIndex}
            type={htmlType}
            {...rest}
            onClick={handleOnClick}
            ref={ref}
            role={role}
          >
            {iconProps && alignIcon === MenuItemIconAlign.Left && getIcon()}
            <span className={styles.menuItemWrapper}>
              <span className={styles.itemText}>
                <span className={styles.label}>{text}</span>
              </span>
            </span>
            {iconProps && alignIcon === MenuItemIconAlign.Right && getIcon()}
          </button>
          <span className={styles.menuInnerButton}>
            {counter && <span>{counter}</span>}
            {secondaryButtonProps && (
              <Button
                disabled={disabled}
                size={ButtonSize.Small}
                shape={ButtonShape.Round}
                variant={ButtonVariant.Neutral}
                {...secondaryButtonProps}
              />
            )}
          </span>
        </span>
        {subText && <span className={itemSubTextClassNames}>{subText}</span>}
      </>
    );

    const dropdownMenuButton = (): JSX.Element => {
      if (!menuRenderer || !dropdownMenuItems) {
        return menuButton();
      }

      return menuRenderer({
        items: dropdownMenuItems,
        size,
        variant,
        ...dropdownMenuProps,
        children: (
          <div className={styles.menuItemWrapper}>{menuButton(true)}</div>
        ),
      });
    };

    const renderedItem = (): JSX.Element => {
      if (secondaryButtonProps) {
        return secondaryButton();
      }

      return dropdownMenuItems ? dropdownMenuButton() : menuButton();
    };

    return (
      <li className={menuItemClassNames} role={listItemRole ?? 'presentation'}>
        {renderedItem()}
      </li>
    );
  }
);
