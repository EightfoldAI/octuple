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
      onKeyDown,
      role,
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
    ref: React.ForwardedRef<HTMLLIElement>
  ) => {
    const menuItemClassNames: string = mergeClasses([
      styles.menuItem,
      styles.menuItemButton,
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

    const handleOnClick = (event: React.MouseEvent<HTMLLIElement>): void => {
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

    const menuButtonContent = (): JSX.Element => (
      <>
        {iconProps && alignIcon === MenuItemIconAlign.Left && getIcon()}
        <span className={styles.menuItemWrapper}>
          <span className={styles.itemText}>
            <span className={styles.label}>{text}</span>
            {counter && <span>{counter}</span>}
          </span>
          {subText && <span className={itemSubTextClassNames}>{subText}</span>}
        </span>
        {iconProps && alignIcon === MenuItemIconAlign.Right && getIcon()}
      </>
    );

    const menuButton = (isNested: boolean = false): JSX.Element => {
      if (isNested) {
        return (
          <span className={styles.menuItemButton}>{menuButtonContent()}</span>
        );
      }
      return menuButtonContent();
    };

    const secondaryButton = (): JSX.Element => (
      <>
        <span className={styles.menuSecondaryWrapper} role={role}>
          <span className={styles.menuOuterButton}>
            {iconProps && alignIcon === MenuItemIconAlign.Left && getIcon()}
            <span className={styles.menuItemWrapper}>
              <span className={styles.itemText}>
                <span className={styles.label}>{text}</span>
              </span>
            </span>
            {iconProps && alignIcon === MenuItemIconAlign.Right && getIcon()}
          </span>
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

    const handleLiKeyDown = (
      event: React.KeyboardEvent<HTMLLIElement>
    ): void => {
      if (disabled) return;

      const { key, currentTarget } = event;
      if ((key === 'Enter' || key === ' ') && !dropdownMenuItems) {
        event.preventDefault();
        currentTarget.click();
        return;
      }
      onKeyDown?.(event);
    };

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
      <li
        className={menuItemClassNames}
        aria-disabled={disabled ? true : undefined}
        tabIndex={disabled ? -1 : active ? 0 : tabIndex}
        {...rest}
        onClick={!dropdownMenuItems ? handleOnClick : undefined}
        onKeyDown={handleLiKeyDown}
        ref={ref}
        role={listItemRole ?? role}
      >
        {renderedItem()}
      </li>
    );
  }
);
