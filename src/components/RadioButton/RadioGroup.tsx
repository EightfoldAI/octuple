import React, { FC, Ref, useContext } from 'react';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { SizeContext, Size } from '../ConfigProvider';
import { RadioButtonProps, RadioGroupProps, RadioButton } from './';
import { LabelAlign, LabelPosition, SelectorSize } from '../CheckBox';
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
            configContextProps = {
                noDisabledContext: false,
                noSizeContext: false,
            },
            disabled = false,
            formItemInput = false,
            id,
            items,
            labelPosition = LabelPosition.End,
            labelAlign = LabelAlign.Center,
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
        const mergedFormItemInput: boolean = isFormItemInput || formItemInput;

        const contextuallyDisabled: Disabled = useContext(DisabledContext);
        const mergedDisabled: boolean = configContextProps.noDisabledContext
            ? disabled
            : contextuallyDisabled || disabled;

        const contextuallySized: Size = useContext(SizeContext);
        const mergedSize = configContextProps.noSizeContext
            ? size
            : contextuallySized || size;

        const radioGroupClasses: string = mergeClasses([
            styles.radioGroup,
            { [styles.vertical]: layout === 'vertical' },
            { [styles.horizontal]: layout === 'horizontal' },
            {
                [styles.radioGroupSmall]:
                    mergedSize === SelectorSize.Flex && largeScreenActive,
            },
            {
                [styles.radioGroupMedium]:
                    mergedSize === SelectorSize.Flex && mediumScreenActive,
            },
            {
                [styles.radioGroupMedium]:
                    mergedSize === SelectorSize.Flex && smallScreenActive,
            },
            {
                [styles.radioGroupLarge]:
                    mergedSize === SelectorSize.Flex && xSmallScreenActive,
            },
            { [styles.radioGroupLarge]: mergedSize === SelectorSize.Large },
            { [styles.radioGroupMedium]: mergedSize === SelectorSize.Medium },
            { [styles.radioGroupSmall]: mergedSize === SelectorSize.Small },
            { ['in-form-item']: mergedFormItemInput },
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
                    id={id}
                    {...rest}
                >
                    {items.map((item: RadioButtonProps) => (
                        <RadioButton
                            key={item.value}
                            allowDisabledFocus={allowDisabledFocus}
                            disabled={mergedDisabled}
                            {...item}
                            labelPosition={labelPosition}
                            labelAlign={labelAlign}
                            size={mergedSize}
                        />
                    ))}
                </div>
            </RadioGroupProvider>
        );
    }
);
