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
        {
            [styles.octupleContentLarge]: size === MenuSize.large,
            [styles.octupleContentMedium]: size === MenuSize.medium,
            [styles.octupleContentSmall]: size === MenuSize.small,
        },
    ]);
    return <span className={subHeaderClasses}>{text}</span>;
};
