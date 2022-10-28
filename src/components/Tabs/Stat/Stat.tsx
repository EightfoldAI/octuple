import React, { FC, Ref } from 'react';
import { StatProps, TabSize } from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { OcThemeNames } from '../../ConfigProvider';
import { Icon } from '../../Icon';
import { Loader } from '../../Loader';
import { Stack } from '../../Stack';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../tabs.module.scss';

export const Stat: FC<StatProps> = React.forwardRef(
    (
        {
            ariaLabel,
            classNames,
            disabled,
            icon,
            label,
            loading,
            ratioA,
            ratioB,
            size = TabSize.Medium,
            theme,
            value,
            ...rest
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const htmlDir: string = useCanvasDirection();

        const { currentActiveTab, groupTheme, readonly, onTabClick } =
            useTabs();

        let mergedTheme: OcThemeNames;

        if (theme) {
            mergedTheme = theme;
        } else {
            mergedTheme = groupTheme;
        }

        const iconExists: boolean = !!icon;
        const labelExists: boolean = !!label;
        const ratioAExists: boolean = !!ratioA;
        const ratioBExists: boolean = !!ratioB;
        const isActive: boolean = value === currentActiveTab;

        const tabClassName: string = mergeClasses([
            styles.tab,
            { [styles.readOnly]: !!readonly },
            { [styles.active]: isActive && !readonly },
            { [styles.red]: mergedTheme === 'red' },
            {
                [styles.redOrange]: mergedTheme === 'redOrange',
            },
            {
                [styles.orange]: mergedTheme === 'orange',
            },
            {
                [styles.yellow]: mergedTheme === 'yellow',
            },
            {
                [styles.yellowGreen]: mergedTheme === 'yellowGreen',
            },
            {
                [styles.green]: mergedTheme === 'green',
            },
            {
                [styles.blueGreen]: mergedTheme === 'blueGreen',
            },
            { [styles.blue]: mergedTheme === 'blue' },
            {
                [styles.blueViolet]: mergedTheme === 'blueViolet',
            },
            {
                [styles.violet]: mergedTheme === 'violet',
            },
            {
                [styles.violetRed]: mergedTheme === 'violetRed',
            },
            { [styles.grey]: mergedTheme === 'grey' },
            { [styles.tabRtl]: htmlDir === 'rtl' },
            classNames,
        ]);

        const getIcon = (): JSX.Element =>
            iconExists && (
                <Icon
                    path={icon}
                    classNames={styles.icon}
                    size={size === TabSize.Small ? '32px' : '40px'}
                />
            );

        const getLabel = (): JSX.Element =>
            labelExists && <span className={styles.label}>{label}</span>;

        const getRatioA = (): JSX.Element =>
            ratioAExists && <span className={styles.ratioA}>{ratioA}</span>;

        const getRatioB = (): JSX.Element =>
            ratioBExists && <span className={styles.ratioB}>{ratioB}</span>;

        const getLoader = (): JSX.Element =>
            loading && <Loader classNames={styles.loader} />;

        return (
            <button
                {...rest}
                ref={ref}
                className={tabClassName}
                aria-label={ariaLabel}
                aria-selected={!readonly && isActive}
                role="tab"
                disabled={disabled}
                onClick={!readonly ? (e) => onTabClick(value, e) : null}
            >
                <Stack
                    direction={'horizontal'}
                    fullWidth
                    gap={size === TabSize.Small ? 's' : 'm'}
                    justify={'center'}
                >
                    {getIcon()}
                    <Stack direction={'vertical'} fullWidth>
                        {getLabel()}
                        <span className={styles.label}>
                            {getRatioA()} {getRatioB()}
                        </span>
                        {getLoader()}
                    </Stack>
                </Stack>
            </button>
        );
    }
);
