import React, { FC } from 'react';
import { MenuItemTypes, MenuProps, MenuSize, MenuVariant } from './Menu.types';
import { List } from '../List';
import { MenuItem } from './MenuItem/MenuItem';
import { MenuItemType } from './MenuItem/MenuItem.types';
import { mergeClasses } from '../../shared/utilities';
import { Stack } from '../Stack';
import { ButtonSize, NeutralButton, PrimaryButton } from '../Button';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './menu.module.scss';

const MENU_SIZE_TO_BUTTON_SIZE_MAP: Record<MenuSize, ButtonSize> = {
  [MenuSize.large]: ButtonSize.Large,
  [MenuSize.medium]: ButtonSize.Medium,
  [MenuSize.small]: ButtonSize.Small,
};

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
  size = MenuSize.medium,
  style,
  subHeader,
  variant = MenuVariant.neutral,
  ...rest
}) => {
  const htmlDir: string = useCanvasDirection();

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
          <NeutralButton
            {...cancelButtonProps}
            size={MENU_SIZE_TO_BUTTON_SIZE_MAP[size]}
            onClick={onCancel}
          />
        )}
        {okButtonProps && (
          <PrimaryButton
            {...okButtonProps}
            size={MENU_SIZE_TO_BUTTON_SIZE_MAP[size]}
            onClick={onOk}
          />
        )}
      </Stack>
    );

  return (
    <List<MenuItemTypes>
      {...rest}
      classNames={menuClassNames}
      footer={getFooter()}
      getItem={getListItem}
      header={getHeader()}
      items={items}
      listType={listType}
      role="menu"
      style={style}
    />
  );
};
