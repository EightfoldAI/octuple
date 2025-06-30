'use client';

import React, { FC, useRef } from 'react';
import { MenuItemTypes, MenuProps, MenuSize, MenuVariant } from './Menu.types';
import { List } from '../List';
import { MenuItem } from './MenuItem/MenuItem';
import { MenuItemType } from './MenuItem/MenuItem.types';
import { Stack } from '../Stack';
import { Button, ButtonSize, ButtonVariant } from '../Button';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { mergeClasses } from '../../shared/utilities';

import styles from './menu.module.scss';

export const Menu: FC<MenuProps> = ({
  cancelButtonProps,
  classNames,
  header,
  itemClassNames,
  itemProps,
  items,
  itemStyle,
  listType,
  okButtonProps,
  onCancel,
  onChange,
  onOk,
  onClose,
  role = 'menu',
  size = MenuSize.medium,
  style,
  subHeader, // TODO: Remove in v3.0.0
  variant = MenuVariant.neutral,
  ...rest
}) => {
  const htmlDir: string = useCanvasDirection();
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const focusableElements =
      listRef.current?.querySelectorAll('[role="menuitem"]');
    if (!focusableElements?.length) return;

    const currentIndex = Array.from(focusableElements).findIndex(
      (element) => element === document.activeElement
    );

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        (focusableElements[nextIndex] as HTMLElement)?.focus();
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex =
          currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
        (focusableElements[prevIndex] as HTMLElement)?.focus();
        break;
      }
      case 'Home': {
        event.preventDefault();
        (focusableElements[0] as HTMLElement)?.focus();
        break;
      }
      case 'End': {
        event.preventDefault();
        (
          focusableElements[focusableElements.length - 1] as HTMLElement
        )?.focus();
        break;
      }
      case 'Tab': {
        event.preventDefault();
        onClose?.();
        break;
      }
      case 'Escape': {
        onClose?.();
        break;
      }
    }
  };

  const footerClassNames: string = mergeClasses([
    styles.menuFooterContainer,
    {
      [styles.large]: size === MenuSize.large,
      [styles.medium]: size === MenuSize.medium,
      [styles.small]: size === MenuSize.small,
    },
  ]);

  const headerClassNames: string = mergeClasses([
    styles.menuHeaderContainer,
    {
      [styles.large]: size === MenuSize.large,
      [styles.medium]: size === MenuSize.medium,
      [styles.small]: size === MenuSize.small,
    },
  ]);

  const menuClassNames: string = mergeClasses([
    classNames,
    styles.menuContainer,
    {
      [styles.large]: size === MenuSize.large,
      [styles.medium]: size === MenuSize.medium,
      [styles.small]: size === MenuSize.small,
    },
  ]);

  const menuSizeToButtonSizeMap: Map<MenuSize, ButtonSize> = new Map<
    MenuSize,
    ButtonSize
  >([
    [MenuSize.large, ButtonSize.Large],
    [MenuSize.medium, ButtonSize.Medium],
    [MenuSize.small, ButtonSize.Small],
  ]);

  const getListItem = (item: MenuItemTypes, index: number): React.ReactNode => (
    <MenuItem
      classNames={itemClassNames}
      direction={htmlDir}
      key={`oc-menu-item-${index}`}
      variant={variant}
      size={size}
      onClick={onChange}
      onChange={onChange}
      type={item.type ?? MenuItemType.button}
      {...item}
    />
  );

  const getHeader = (): JSX.Element =>
    header && (
      <div className={headerClassNames}>
        <div className={styles.heading}>{header}</div>
      </div>
    );

  const getFooter = (): JSX.Element =>
    (cancelButtonProps || okButtonProps) && (
      <Stack
        flexGap="s"
        justify="flex-end"
        fullWidth
        classNames={footerClassNames}
      >
        {cancelButtonProps && (
          <Button
            variant={ButtonVariant.Neutral}
            {...cancelButtonProps}
            size={menuSizeToButtonSizeMap.get(size)}
            onClick={onCancel}
          />
        )}
        {okButtonProps && (
          <Button
            variant={ButtonVariant.Primary}
            {...okButtonProps}
            size={menuSizeToButtonSizeMap.get(size)}
            onClick={onOk}
          />
        )}
      </Stack>
    );

  return (
    <List
      {...rest}
      ref={listRef}
      onKeyDown={handleKeyDown}
      classNames={menuClassNames}
      footer={getFooter()}
      getItem={getListItem}
      header={getHeader()}
      items={items}
      listType={listType}
      role={role}
      style={style}
      disableKeyboardHandling={true}
    />
  );
};
