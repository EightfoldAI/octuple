import React, { FC } from 'react';
import { MenuProps, MenuSize, MenuType, MenuVariant } from './Menu.types';
import { List } from '../List';
import { MenuItem } from './MenuItem/MenuItem';
import { MenuItemProps } from './MenuItem/MenuItem.types';
import { mergeClasses } from '../../shared/utilities';
import { Stack } from '../Stack';
import { ButtonSize, NeutralButton, PrimaryButton } from '../Button';

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
    type = MenuType.button,
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
    const headerContainerClasses: string = mergeClasses([
        styles.menuHeaderContainer,
    ]);

    const headerClasses: string = mergeClasses([
        {
            header4: size === MenuSize.large,
        },
        {
            header5: size === MenuSize.medium,
        },
        {
            header6: size === MenuSize.small,
        },
    ]);

    const subHeaderClasses: string = mergeClasses([
        {
            body2: size === MenuSize.large,
        },
        {
            body3: size === MenuSize.medium,
        },
        {
            caption: size === MenuSize.small,
        },
    ]);

    const getListItem = (item: MenuItemProps, index: number): JSX.Element => {
        switch (type) {
            case MenuType.button:
                return (
                    <MenuItem
                        key={`oc-menu-item-${index}`}
                        onClick={onChange}
                        variant={variant}
                        size={size}
                        {...item}
                    />
                );
        }
    };

    const getHeader = (): JSX.Element =>
        (header || subHeader) && (
            <Stack direction="vertical" classNames={headerContainerClasses}>
                {header && <span className={headerClasses}>{header}</span>}
                {subHeader && (
                    <span className={subHeaderClasses}>{subHeader}</span>
                )}
            </Stack>
        );

    const getFooter = (): JSX.Element =>
        (cancelButtonProps || okButtonProps) && (
            <Stack
                gap="s"
                justify="flex-end"
                fullWidth
                classNames={styles.menuFooterContainer}
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

    return (
        <List<MenuItemProps>
            {...rest}
            items={items}
            classNames={classNames}
            style={style}
            header={getHeader()}
            footer={getFooter()}
            listType={listType}
            role="menu"
            getItem={getListItem}
        />
    );
};
