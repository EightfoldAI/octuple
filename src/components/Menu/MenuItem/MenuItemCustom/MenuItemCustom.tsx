import React, { FC } from 'react';
import { MenuItemCustomProps } from '../MenuItem.types';
import { mergeClasses } from '../../../../shared/utilities';
import { MenuSize } from '../../Menu.types';

import styles from '../menuItem.module.scss';

export const MenuItemCustom: FC<MenuItemCustomProps> = ({
    index,
    onChange,
    size,
    ...item
}) => {
    const menuItemClasses = mergeClasses([
        styles.menuItemCustom,
        {
            [styles.large]: size === MenuSize.large,
            [styles.medium]: size === MenuSize.medium,
            [styles.small]: size === MenuSize.small,
        },
    ]);

    return (
        <div className={menuItemClasses}>
            {item.render({ index, value: item, onChange })}
        </div>
    );
};
