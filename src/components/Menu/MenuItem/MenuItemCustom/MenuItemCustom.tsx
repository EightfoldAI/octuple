import React, { FC } from 'react';
import { MenuItemCustomProps } from '../MenuItem.types';

import styles from '../../menu.module.scss';

export const MenuItemCustom: FC<MenuItemCustomProps> = ({ index, ...item }) => {
    return (
        <div role="menuitem" className={styles.menuItemCustom}>
            {item.render(item, index)}
        </div>
    );
};
