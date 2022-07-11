import React, { FC } from 'react';
import { MenuItemCustomProps } from '../MenuItem.types';

import styles from '../../menu.module.scss';

export const MenuItemCustom: FC<MenuItemCustomProps> = ({
    index,
    onChange,
    ...item
}) => {
    return (
        <div role="menuitem" className={styles.menuItemCustom}>
            {item.render({ index, value: item, onChange })}
        </div>
    );
};
