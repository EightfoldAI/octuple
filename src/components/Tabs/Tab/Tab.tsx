import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { TabProps } from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { Flipped } from 'react-flip-toolkit';

import styles from '../tabs.module.scss';
import { Icon, IconName } from '../../Icon';
import { useConfig } from '../../ConfigProvider';

export const Tab: FC<TabProps> = ({
    value,
    label,
    icon,
    disabled,
    ariaLabel,
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

    const getIcon = (): JSX.Element => (
        <Icon path={icon} className={styles.icon} />
    );

    const getLabel = (): JSX.Element => (
        <span className={styles.label}>{label}</span>
    );

    const getTabIndicator = (): JSX.Element => (
        <Flipped flipId="tabIndicator">
            <div className={styles.tabIndicator} />
        </Flipped>
    );

    return (
        <button
            className={tabClassName}
            aria-label={ariaLabel}
            aria-selected={isActive}
            role="tab"
            disabled={disabled}
            onClick={(e) => onTabClick(value, e)}
        >
            {iconExists && getIcon()}
            {labelExists && getLabel()}
            {isActive && getTabIndicator()}
        </button>
    );
};
