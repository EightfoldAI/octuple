import React, { FC, Ref } from 'react';
import { mergeClasses } from '../../shared/utilities';
import { CheckBox, CheckboxGroupProps, LabelPosition, SelectorSize } from './';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';

import styles from './checkbox.module.scss';

export const CheckBoxGroup: FC<CheckboxGroupProps> = React.forwardRef(
    (
        {
            allowDisabledFocus = false,
            ariaLabel,
            classNames,
            disabled = false,
            items = [],
            labelPosition = LabelPosition.End,
            layout = 'vertical',
            onChange,
            size = SelectorSize.Medium,
            style,
            value,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

        const checkboxGroupClassNames = mergeClasses([
            styles.checkboxGroup,
            { [styles.vertical]: layout === 'vertical' },
            { [styles.horizontal]: layout === 'horizontal' },
            {
                [styles.checkboxGroupSmall]:
                    size === SelectorSize.Flex && largeScreenActive,
            },
            {
                [styles.checkboxGroupMedium]:
                    size === SelectorSize.Flex && mediumScreenActive,
            },
            {
                [styles.checkboxGroupMedium]:
                    size === SelectorSize.Flex && smallScreenActive,
            },
            {
                [styles.checkboxGroupLarge]:
                    size === SelectorSize.Flex && xSmallScreenActive,
            },
            { [styles.checkboxGroupLarge]: size === SelectorSize.Large },
            { [styles.checkboxGroupMedium]: size === SelectorSize.Medium },
            { [styles.checkboxGroupSmall]: size === SelectorSize.Small },
            classNames,
        ]);

        return (
            <div
                className={checkboxGroupClassNames}
                style={style}
                role="group"
                aria-label={ariaLabel}
                ref={ref}
                {...rest}
            >
                {items.map((item) => (
                    <CheckBox
                        allowDisabledFocus={allowDisabledFocus}
                        disabled={disabled}
                        labelPosition={labelPosition}
                        {...item}
                        checked={value?.includes(item.value)}
                        key={item.value}
                        onChange={() => {
                            const optionIndex = value?.indexOf(item.value);
                            const newValue = [...value];
                            if (optionIndex === -1) {
                                newValue.push(item.value);
                            } else {
                                newValue.splice(optionIndex, 1);
                            }
                            onChange?.(newValue);
                        }}
                        size={size}
                    />
                ))}
            </div>
        );
    }
);
