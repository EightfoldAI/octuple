import React, { FC } from 'react';
import { MenuItemProps } from './MenuItem.types';
import { MenuType, MenuSize } from '../Menu.types';
import { Icon } from '../../Icon';
import { mergeClasses } from '../../../shared/utilities';

import styles from './menuItem.module.scss';

export const MenuItem: FC<MenuItemProps> = ({
    iconProps,
    text,
    type = MenuType.neutral,
    size = MenuSize.medium,
    classNames,
}) => {
    const menuItemClasses: string = mergeClasses([
        styles.menuItem,
        { [styles.small]: size === MenuSize.small },
        { [styles.medium]: size === MenuSize.medium },
        { [styles.large]: size === MenuSize.large },
        { [styles.neutral]: type === MenuType.neutral },
        { [styles.primary]: type === MenuType.primary },
        { [styles.disruptive]: type === MenuType.disruptive },
        classNames,
    ]);

    const labelClasses: string = mergeClasses([styles.label]);

    return (
        <span className={menuItemClasses}>
            {iconProps && <Icon {...iconProps} />}
            <span className={labelClasses}>{text}</span>
        </span>
    );
};
