import React, { FC } from 'react';
import { MenuItemSubHeaderProps } from '../MenuItem.types';
import { mergeClasses } from '../../../../shared/utilities';
import { MenuSize } from '../../Menu.types';

import styles from '../menuItem.module.scss';

export const MenuItemSubHeader: FC<MenuItemSubHeaderProps> = ({
    text,
    size,
}) => {
    const subHeaderClasses: string = mergeClasses([
        styles.menuItemSubHeader,
        { 'body3 semibold': size === MenuSize.small },
        { 'body2 semibold': size === MenuSize.medium },
        { 'body1 semibold': size === MenuSize.large },
    ]);
    return <span className={subHeaderClasses}>{text}</span>;
};
