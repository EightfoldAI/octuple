import React, { FC } from 'react';
import { MenuItemTypes, MenuProps, MenuSize, MenuVariant } from './Menu.types';
import { List } from '../List';
import { MenuItem } from './MenuItem/MenuItem';
import { MenuItemType } from './MenuItem/MenuItem.types';
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

    const getListItem = (
        item: MenuItemTypes,
        index: number
    ): React.ReactNode => (
        <MenuItem
            key={`oc-menu-item-${index}`}
            variant={variant}
            size={size}
            onClick={onChange}
            type={item.type ?? MenuItemType.button}
            {...item}
        />
    );

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
        <List<MenuItemTypes>
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
