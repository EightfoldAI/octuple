import React, { FC, Ref, useContext } from 'react';
import DisabledContext, {
    DisabledType,
} from '../ConfigProvider/DisabledContext';
import { RadioButtonProps, RadioGroupProps, RadioButton } from './';
import { LabelPosition, SelectorSize } from '../CheckBox';
import { RadioGroupProvider } from './RadioGroup.context';
import { mergeClasses } from '../../shared/utilities';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { FormItemInputContext } from '../Form/Context';

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

        const { isFormItemInput } = useContext(FormItemInputContext);

        const contextuallyDisabled: DisabledType = useContext(DisabledContext);
        const mergedDisabled: boolean = contextuallyDisabled || disabled;

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
            { ['in-form-item']: isFormItemInput },
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
                            disabled={mergedDisabled}
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
