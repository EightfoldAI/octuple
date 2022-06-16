import React, { FC } from 'react';
import { MenuItem, MenuProps, MenuType } from './Menu.types';
import { List } from '../List';
import {
    ButtonSize,
    ButtonTextAlign,
    ButtonWidth,
    DefaultButton,
    NeutralButton,
} from '../Button';

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
    ...rest
}) => {
    const getDefaultButton = (item: MenuItem): JSX.Element => (
        <DefaultButton
            {...item}
            alignText={ButtonTextAlign.Left}
            buttonWidth={ButtonWidth.fill}
            size={ButtonSize.Medium}
            disruptive={type === MenuType.disruptive}
            onClick={() => onChange(item.value)}
        />
    );

    const getNeutralButton = (item: MenuItem): JSX.Element => (
        <NeutralButton
            {...item}
            alignText={ButtonTextAlign.Left}
            buttonWidth={ButtonWidth.fill}
            size={ButtonSize.Medium}
            onClick={() => onChange(item.value)}
        />
    );

    const getMenuItem = (item: MenuItem) => {
        if (type === MenuType.neutral) {
            return getNeutralButton(item);
        }
        return getDefaultButton(item);
    };

    return (
        <List<MenuItem>
            {...rest}
            items={items}
            renderItem={getMenuItem}
            classNames={classNames}
            style={style}
            itemClassNames={itemClassNames}
            itemStyle={itemStyle}
            header={header}
            footer={footer}
            listType={listType}
            role="menu"
            itemRole="menuitem"
        />
    );
};
