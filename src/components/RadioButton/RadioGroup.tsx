import React, { FC, Ref } from 'react';
import { RadioButtonProps, RadioGroupProps, RadioButton } from './';
import { LabelPosition, SelectorSize } from '../CheckBox';
import { RadioGroupProvider } from './RadioGroup.context';
import { mergeClasses } from '../../shared/utilities';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';

import styles from './radio.module.scss';

export const RadioGroup: FC<RadioGroupProps> = React.forwardRef(
    (
        {
            allowDisabledFocus = false,
            ariaLabel,
            classNames,
            disabled = false,
            items,
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

        const radioGroupClasses: string = mergeClasses([
            styles.radioGroup,
            { [styles.vertical]: layout === 'vertical' },
            { [styles.horizontal]: layout === 'horizontal' },
            {
                [styles.radioGroupSmall]:
                    size === SelectorSize.Flex && largeScreenActive,
            },
            {
                [styles.radioGroupMedium]:
                    size === SelectorSize.Flex && mediumScreenActive,
            },
            {
                [styles.radioGroupMedium]:
                    size === SelectorSize.Flex && smallScreenActive,
            },
            {
                [styles.radioGroupLarge]:
                    size === SelectorSize.Flex && xSmallScreenActive,
            },
            { [styles.radioGroupLarge]: size === SelectorSize.Large },
            { [styles.radioGroupMedium]: size === SelectorSize.Medium },
            { [styles.radioGroupSmall]: size === SelectorSize.Small },
            classNames,
        ]);

        return (
            <RadioGroupProvider onChange={onChange} value={value}>
                <div
                    role="group"
                    className={radioGroupClasses}
                    style={style}
                    ref={ref}
                    aria-label={ariaLabel}
                    {...rest}
                >
                    {items.map((item: RadioButtonProps) => (
                        <RadioButton
                            key={item.value}
                            allowDisabledFocus={allowDisabledFocus}
                            disabled={disabled}
                            {...item}
                            labelPosition={labelPosition}
                            size={size}
                        />
                    ))}
                </div>
            </RadioGroupProvider>
        );
    }
);
