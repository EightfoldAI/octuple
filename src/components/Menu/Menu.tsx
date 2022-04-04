import React, { FC } from 'react';
import { MenuItem, MenuProps, MenuType } from './Menu.types';
import { List } from '../List';
import { ButtonSize, ButtonWidth, DefaultButton } from '../Button';

export const Menu: FC<MenuProps> = ({ type = MenuType.primary, items }) => {
    return (
        <List<MenuItem>
            items={items}
            renderItem={(item) => (
                <DefaultButton
                    icon={item.icon}
                    size={ButtonSize.Flex}
                    text={item.label}
                    buttonWidth={ButtonWidth.fill}
                />
            )}
        />
    );
};
