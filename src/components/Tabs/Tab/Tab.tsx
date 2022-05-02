import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { TabProps } from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { Flipped } from 'react-flip-toolkit';

import { Icon } from '../../Icon';
import { useConfig } from '../../ConfigProvider';
import { Badge } from '../../Badge';

import styles from '../tabs.module.scss';

export const Tab: FC<TabProps> = ({
    value,
    label,
    icon,
    disabled,
    ariaLabel,
    badgeContent,
    ...rest
}) => {
    const { onTabClick, currentActiveTab } = useTabs();

    const iconExists: boolean = !!icon;
    const labelExists: boolean = !!label;
    const isActive: boolean = value === currentActiveTab;

    const { registeredTheme: { light = false } = {} } = useConfig();

    const tabClassName: string = classNames([
        styles.tab,
        { [styles.active]: isActive },
        { [styles.inverse]: light },
    ]);

    const getIcon = (): JSX.Element =>
        iconExists && <Icon path={icon} className={styles.icon} />;

    const getLabel = (): JSX.Element =>
        labelExists && <span className={styles.label}>{label}</span>;

    const getTabIndicator = (): JSX.Element =>
        isActive && (
            <Flipped flipId="tabIndicator">
                <div className={styles.tabIndicator} />
            </Flipped>
        );

    const getBadge = (): JSX.Element =>
        !!badgeContent && (
            <Badge active={isActive} className={styles.badge}>
                {badgeContent}
            </Badge>
        );

    return (
        <button
            {...rest}
            className={tabClassName}
            aria-label={ariaLabel}
            aria-selected={isActive}
            role="tab"
            disabled={disabled}
            onClick={(e) => onTabClick(value, e)}
        >
            {getIcon()}
            {getLabel()}
            {getTabIndicator()}
            {getBadge()}
        </button>
    );
};
