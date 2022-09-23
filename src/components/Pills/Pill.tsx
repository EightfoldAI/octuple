import React, { FC, Ref, useContext } from 'react';
import { PillProps, PillSize, PillType } from './Pills.types';
import { mergeClasses } from '../../shared/utilities';
import { Icon, IconName, IconSize } from '../Icon';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './pills.module.scss';
import { ButtonSize, DefaultButton } from '../Button';

export const Pill: FC<PillProps> = React.forwardRef(
    (
        {
            classNames,
            color,
            configContextProps = {
                noDisabledContext: false,
                noSizeContext: false,
            },
            disabled = false,
            label,
            iconProps,
            theme = 'blue',
            onClose,
            onClick,
            closeButtonProps,
            pillButtonProps,
            type = PillType.default,
            size = PillSize.Medium,
            style,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const htmlDir: string = useCanvasDirection();

        const contextuallyDisabled: Disabled = useContext(DisabledContext);
        const mergedDisabled: boolean = configContextProps.noDisabledContext
            ? disabled
            : contextuallyDisabled || disabled;
        const pillSizeToButtonSizeMap = new Map<PillSize, ButtonSize>([
            [PillSize.Large, ButtonSize.Medium],
            [PillSize.Medium, ButtonSize.Small],
            [PillSize.Small, ButtonSize.Small],
            [PillSize.XSmall, ButtonSize.Small],
        ]);
        const pillSizeToIconSizeMap = new Map<PillSize, IconSize>([
            [PillSize.Large, IconSize.Medium],
            [PillSize.Medium, IconSize.Small],
            [PillSize.Small, IconSize.XSmall],
            [PillSize.XSmall, IconSize.XSmall],
        ]);
        const labelClassName: string = mergeClasses([
            styles.label,
            { [styles.medium]: size === PillSize.Medium },
            { [styles.small]: size === PillSize.Small },
            { [styles.xsmall]: size === PillSize.XSmall },
        ]);
        const tagClassName: string = mergeClasses([
            styles.tagPills,
            classNames,
            { [styles.red]: theme === 'red' },
            { [styles.redOrange]: theme === 'redOrange' },
            { [styles.orange]: theme === 'orange' },
            { [styles.yellow]: theme === 'yellow' },
            { [styles.yellowGreen]: theme === 'yellowGreen' },
            { [styles.green]: theme === 'green' },
            { [styles.blueGreen]: theme === 'blueGreen' },
            { [styles.blue]: theme === 'blue' },
            { [styles.blueViolet]: theme === 'blueViolet' },
            { [styles.violet]: theme === 'violet' },
            { [styles.violetRed]: theme === 'violetRed' },
            { [styles.grey]: theme === 'grey' },
            { [styles.xsmall]: size === PillSize.XSmall },
            { [styles.tagPillsDisabled]: mergedDisabled },
            { [styles.tagPillsRtl]: htmlDir === 'rtl' },
        ]);
        return (
            <div
                {...rest}
                className={tagClassName}
                style={{ ...style, color }}
                ref={ref}
            >
                {iconProps && (
                    <Icon
                        {...iconProps}
                        size={pillSizeToIconSizeMap.get(size)}
                        classNames={styles.icon}
                    />
                )}
                <span className={labelClassName}>{label}</span>
                {type === PillType.withButton && (
                    <DefaultButton
                        {...pillButtonProps}
                        onClick={!mergedDisabled ? onClick : null}
                        size={pillSizeToButtonSizeMap.get(size)}
                        classNames={styles.button}
                    />
                )}
                {type === PillType.closable && (
                    <DefaultButton
                        {...closeButtonProps}
                        iconProps={{ path: IconName.mdiClose }}
                        onClick={!mergedDisabled ? onClose : null}
                        size={pillSizeToButtonSizeMap.get(size)}
                        classNames={styles.closeButton}
                    />
                )}
            </div>
        );
    }
);
