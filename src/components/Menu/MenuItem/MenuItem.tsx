import React, { FC } from 'react';
import { MenuType } from '../Menu.types';
import { MenuItemProps } from './MenuItem.types';
import {
    ButtonSize,
    ButtonTextAlign,
    ButtonWidth,
    DefaultButton,
    NeutralButton,
} from '../../Button';
import { Icon } from '../../Icon';
import { mergeClasses } from '../../../shared/utilities';

import styles from './menuItem.module.scss';

export const MenuItem: FC<MenuItemProps> = ({
    type,
    iconProps,
    text,
    classNames,
}) => {
    const getDefaultButton = (item: MenuItemProps): JSX.Element => (
        <DefaultButton
            {...item}
            alignText={ButtonTextAlign.Left}
            buttonWidth={ButtonWidth.fill}
            size={ButtonSize.Medium}
            disruptive={type === MenuType.disruptive}
        />
    );

    const getNeutralButton = (item: MenuItemProps): JSX.Element => (
        <NeutralButton
            {...item}
            alignText={ButtonTextAlign.Left}
            buttonWidth={ButtonWidth.fill}
            size={ButtonSize.Medium}
        />
    );

    const menuItemClasses: string = mergeClasses([styles.menuItem, classNames]);

    return (
        <span className={menuItemClasses}>
            <Icon {...iconProps} />
            <span>{text}</span>
        </span>
    );
};
