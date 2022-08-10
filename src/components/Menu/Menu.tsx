import React, { FC } from 'react';
import { MenuProps, MenuSize, MenuType, MenuVariant } from './Menu.types';
import { List } from '../List';
import { MenuItem } from './MenuItem/MenuItem';
import { MenuItemProps } from './MenuItem/MenuItem.types';

export const Menu: FC<MenuProps> = ({
    items,
    onChange,
    variant = MenuVariant.neutral,
    type = MenuType.button,
    size = MenuSize.medium,
    classNames,
    style,
    itemClassNames,
    itemStyle,
    header,
    footer,
    listType,
    itemProps,
    ...rest
}) => {
    const getListItem = (item: MenuItemProps, index: number): JSX.Element => {
        switch (type) {
            case MenuType.button:
                return (
                    <MenuItem
                        key={`oc-menu-item-${index}`}
                        onClick={onChange}
                        variant={variant}
                        size={size}
                        {...item}
                    />
                );
        }
    };
    return (
        <List<MenuItemProps>
            {...rest}
            items={items}
            classNames={classNames}
            style={style}
            header={header}
            footer={footer}
            listType={listType}
            role="menu"
            getItem={getListItem}
        />
    );
};
