import React, { FC } from 'react';
import { MenuItemTypes, MenuProps, MenuSize, MenuVariant } from './Menu.types';
import { List } from '../List';
import { MenuItem } from './MenuItem/MenuItem';
import { MenuItemType } from './MenuItem/MenuItem.types';
import { mergeClasses } from '../../shared/utilities';
import { Stack } from '../Stack';
import {
    ButtonShape,
    ButtonSize,
    NeutralButton,
    PrimaryButton,
} from '../Button';

import styles from './menu.module.scss';

const MENU_SIZE_TO_BUTTON_SIZE_MAP: Record<MenuSize, ButtonSize> = {
    [MenuSize.large]: ButtonSize.Large,
    [MenuSize.medium]: ButtonSize.Medium,
    [MenuSize.small]: ButtonSize.Small,
};

export const Menu: FC<MenuProps> = ({
    items,
    onChange,
    variant = MenuVariant.neutral,
    size = MenuSize.medium,
    classNames,
    style,
    itemClassNames,
    itemStyle,
    header,
    listType,
    itemProps,
    subHeader,
    okButtonProps,
    cancelButtonProps,
    onOk,
    onCancel,
    ...rest
}) => {
    const headerClasses: string = mergeClasses([
        styles.menuHeaderContainer,
        {
            [styles.large]: size === MenuSize.large,
            [styles.medium]: size === MenuSize.medium,
            [styles.small]: size === MenuSize.small,
        },
    ]);

    const footerClasses: string = mergeClasses([
        styles.menuFooterContainer,
        {
            [styles.large]: size === MenuSize.large,
            [styles.medium]: size === MenuSize.medium,
            [styles.small]: size === MenuSize.small,
        },
    ]);

    const getListItem = (
        item: MenuItemTypes,
        index: number
    ): React.ReactNode => (
        <MenuItem
            key={`oc-menu-item-${index}`}
            variant={variant}
            size={size}
            onClick={onChange}
            onChange={onChange}
            type={item.type ?? MenuItemType.button}
            {...item}
        />
    );

    const getHeader = (): JSX.Element =>
        header && (
            <div className={headerClasses}>
                <div className={styles.heading}>{header}</div>
            </div>
        );

    const getFooter = (): JSX.Element =>
        (cancelButtonProps || okButtonProps) && (
            <Stack
                gap="s"
                justify="flex-end"
                fullWidth
                classNames={footerClasses}
            >
                {cancelButtonProps && (
                    <NeutralButton
                        {...cancelButtonProps}
                        size={MENU_SIZE_TO_BUTTON_SIZE_MAP[size]}
                        onClick={onCancel}
                    />
                )}
                {okButtonProps && (
                    <PrimaryButton
                        {...okButtonProps}
                        size={MENU_SIZE_TO_BUTTON_SIZE_MAP[size]}
                        onClick={onOk}
                    />
                )}
            </Stack>
        );

    const menuClassNames = mergeClasses([
        classNames,
        styles.menuContainer,
        {
            [styles.large]: size === MenuSize.large,
            [styles.medium]: size === MenuSize.medium,
            [styles.small]: size === MenuSize.small,
        },
    ]);

    return (
        <List<MenuItemTypes>
            {...rest}
            items={items}
            classNames={menuClassNames}
            style={style}
            header={getHeader()}
            footer={getFooter()}
            listType={listType}
            role="menu"
            getItem={getListItem}
        />
    );
};
