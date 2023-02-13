import React, { FC, useRef } from 'react';
import { MenuItemButtonProps } from '../MenuItem.types';
import { MenuSize, MenuVariant } from '../../Menu.types';
import { mergeClasses } from '../../../../shared/utilities';
import { Icon } from '../../../Icon';
import { ButtonShape, ButtonSize, NeutralButton } from '../../../Button';

import styles from '../menuItem.module.scss';

export const MenuItemButton: FC<MenuItemButtonProps> = ({
  iconProps,
  text,
  subText,
  variant = MenuVariant.neutral,
  size = MenuSize.medium,
  classNames,
  onClick,
  tabIndex = 0,
  value,
  active,
  counter,
  type,
  secondaryButtonProps,
  ...rest
}) => {
  const secondaryButtonRef = useRef<HTMLButtonElement>(null);
  const menuItemClasses: string = mergeClasses([
    styles.menuItem,
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
    <button
      onClick={(e) => {
        if (!secondaryButtonRef?.current?.contains?.(e.target as Node)) {
          onClick?.(value);
        }
      }}
      tabIndex={tabIndex}
      role="menuitem"
      className={menuItemClasses}
      {...rest}
    >
      {iconProps && <Icon {...iconProps} />}
      <span className={styles.menuItemWrapper}>
        <span className={styles.itemText}>
          <span className={styles.label}>{text}</span>
          <span className={styles.actionWrapper}>
            {counter && <span>{counter}</span>}
            {secondaryButtonProps && (
              <NeutralButton
                ref={secondaryButtonRef}
                size={ButtonSize.Small}
                shape={ButtonShape.Round}
                {...secondaryButtonProps}
              />
            )}
          </span>
        </span>
        {subText && <span className={itemSubTextClasses}>{subText}</span>}
      </span>
    </button>
  );
};
