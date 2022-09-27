import React, { FC, Ref } from 'react';
import { mergeClasses } from '../../../shared/utilities';
import { TabProps } from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { Flipped } from 'react-flip-toolkit';

import { Icon } from '../../Icon';
import { useConfig } from '../../ConfigProvider';
import { Badge } from '../../Badge';
import { Loader } from '../../Loader';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';

import styles from '../tabs.module.scss';

export const Tab: FC<TabProps> = React.forwardRef(
    (
        {
            value,
            label,
            icon,
            disabled,
            ariaLabel,
            badgeContent,
            classNames,
            loading,
            ...rest
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const htmlDir: string = useCanvasDirection();

        const { onTabClick, currentActiveTab } = useTabs();

        const iconExists: boolean = !!icon;
        const labelExists: boolean = !!label;
        const isActive: boolean = value === currentActiveTab;

        const { registeredTheme: { light = false } = {} } = useConfig();

        const tabClassName: string = mergeClasses([
            styles.tab,
            { [styles.active]: isActive },
            { [styles.inverse]: light },
            { [styles.tabRtl]: htmlDir === 'rtl' },
            classNames,
        ]);

        const getIcon = (): JSX.Element =>
            iconExists && <Icon path={icon} classNames={styles.icon} />;

        const getLabel = (): JSX.Element =>
            labelExists && <span className={styles.label}>{label}</span>;

        const getTabIndicator = (): JSX.Element =>
            isActive && (
                <Flipped flipId="tabIndicator">
                    <div className={styles.tabIndicator} />
                </Flipped>
            );

        const getBadge = (): JSX.Element =>
            !!badgeContent &&
            !loading && (
                <Badge active={isActive} classNames={styles.badge}>
                    {badgeContent}
                </Badge>
            );

        const getLoader = (): JSX.Element =>
            loading && <Loader classNames={styles.loader} />;

        return (
            <button
                {...rest}
                ref={ref}
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
                {getLoader()}
            </button>
        );
    }
);
