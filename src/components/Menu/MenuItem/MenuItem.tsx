import React, {
  FC,
  ForwardedRef,
  forwardRef,
  JSXElementConstructor,
} from 'react';
import { MenuItemProps, MenuItemType } from './MenuItem.types';
import { MenuItemButton } from './MenuItemButton';
import { MenuItemCustom } from './MenuItemCustom';
import { MenuItemLink } from './MenuItemLink';
import { MenuItemSubHeader } from './MenuItemSubHeader';

const TYPE_TO_MENU_ITEM_MAP: Record<
  MenuItemType,
  JSXElementConstructor<any>
> = {
  [MenuItemType.button]: MenuItemButton,
  [MenuItemType.custom]: MenuItemCustom,
  [MenuItemType.link]: MenuItemLink,
  [MenuItemType.subHeader]: MenuItemSubHeader,
};

export const MenuItem: FC<MenuItemProps> = forwardRef(
  ({ type, ...rest }, ref: ForwardedRef<any>) => {
    const Component = TYPE_TO_MENU_ITEM_MAP?.[type] ?? null;
    return <Component ref={ref} {...rest} />;
  }
);
