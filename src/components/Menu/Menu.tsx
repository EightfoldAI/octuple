import React, { FC } from 'react';
import { MenuProps, MenuType } from './Menu.types';
import { List } from '../List';
import { MenuItem } from './MenuItem/MenuItem';
import { MenuItemProps } from './MenuItem/MenuItem.types';

export const Menu: FC<MenuProps> = ({
    items,
    onChange,
    type = MenuType.neutral,
    classNames,
    style,
    itemClassNames,
    itemStyle,
    header,
    footer,
    listType,
    itemProps,
    ...rest
}) => (
    <List<MenuItemProps>
        {...rest}
        items={items}
        renderItem={(props) => <MenuItem {...props} />}
        classNames={classNames}
        style={style}
        itemClassNames={itemClassNames}
        itemStyle={itemStyle}
        header={header}
        footer={footer}
        listType={listType}
        role="menu"
        itemProps={{
            role: 'menuitem',
            tabIndex: 0,
            onClick: onChange,
            ...itemProps,
        }}
    />
);
