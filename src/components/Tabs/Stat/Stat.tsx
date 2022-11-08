import React, { FC, Ref } from 'react';
import { StatProps, StatThemeNames, TabSize } from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { Icon } from '../../Icon';
import { Loader } from '../../Loader';
import { Stack, StackGap } from '../../Stack';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../tabs.module.scss';

const MEDIUM_ICON_SIZE: string = '40px';
const SMALL_ICON_SIZE: string = '32px';

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

        const { currentActiveTab, statgrouptheme, readOnly, onTabClick } =
            useTabs();

        const mergedTheme: StatThemeNames = theme ?? statgrouptheme;

        const iconExists: boolean = !!icon;
        const labelExists: boolean = !!label;
        const ratioAExists: boolean = !!ratioA;
        const ratioBExists: boolean = !!ratioB;
        const isActive: boolean = value === currentActiveTab;

        const tabClassName: string = mergeClasses([
            styles.tab,
            (styles as any)[`${mergedTheme}`],
            {
                [styles.readOnly]: !!readOnly,
                [styles.active]: isActive && !readOnly,
                [styles.tabRtl]: htmlDir === 'rtl',
            },
            classNames,
        ]);

        const getIcon = (): JSX.Element =>
            iconExists && (
                <Icon
                    path={icon}
                    classNames={styles.icon}
                    size={
                        size === TabSize.Small
                            ? SMALL_ICON_SIZE
                            : MEDIUM_ICON_SIZE
                    }
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

        const tabSizeToGapMap = new Map<TabSize, StackGap>([
            [TabSize.Medium, 'm'],
            [TabSize.Small, 's'],
        ]);

        return (
            <button
                {...rest}
                ref={ref}
                className={tabClassName}
                aria-label={ariaLabel}
                aria-selected={!readOnly && isActive}
                role="tab"
                disabled={disabled}
                onClick={!readOnly ? (e) => onTabClick(value, e) : null}
            >
                <Stack
                    direction="horizontal"
                    fullWidth
                    gap={tabSizeToGapMap.get(size)}
                    justify="center"
                >
                    {getIcon()}
                    <Stack direction="vertical" fullWidth>
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
