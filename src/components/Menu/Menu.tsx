import React, { FC } from 'react';
import { MenuItem, MenuProps } from './Menu.types';
import { List } from '../List';
import { ButtonWidth, DefaultButton } from '../Button';

export const Menu: FC<MenuProps> = ({
    items,
    onChange,
    disruptive = false,
    className,
    style,
    itemClassName,
    itemStyle,
    header,
    footer,
    listType,
}) => {
    const getDefaultButton = (item: MenuItem): JSX.Element => (
        <DefaultButton
            buttonWidth={ButtonWidth.fill}
            {...item}
            disruptive={disruptive}
            onClick={() => onChange(item.value)}
        />
    );

    return (
        <List<MenuItem>
            items={items}
            renderItem={getDefaultButton}
            className={className}
            style={style}
            itemClassName={itemClassName}
            itemStyle={itemStyle}
            header={header}
            footer={footer}
            listType={listType}
            role="menu"
            itemRole="menuitem"
        />
    );
};
