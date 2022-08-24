import React, { FC, Ref, useContext } from 'react';
import DisabledContext, {
    DisabledType,
} from '../ConfigProvider/DisabledContext';
import { SizeContext, SizeType } from '../ConfigProvider';
import { mergeClasses } from '../../shared/utilities';
import { CheckBox, CheckboxGroupProps, LabelPosition, SelectorSize } from './';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { FormItemInputContext } from '../Form/Context';

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
            size = 'medium' as SizeType as SizeType,
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

        const contextuallySized: SizeType = useContext(SizeContext);
        const mergedSize: SelectorSize | SizeType = contextuallySized || size;

        const checkboxGroupClassNames = mergeClasses([
            styles.checkboxGroup,
            { [styles.vertical]: layout === 'vertical' },
            { [styles.horizontal]: layout === 'horizontal' },
            {
                [styles.checkboxGroupSmall]:
                    mergedSize === SelectorSize.Flex && largeScreenActive,
            },
            {
                [styles.checkboxGroupMedium]:
                    mergedSize === SelectorSize.Flex && mediumScreenActive,
            },
            {
                [styles.checkboxGroupMedium]:
                    mergedSize === SelectorSize.Flex && smallScreenActive,
            },
            {
                [styles.checkboxGroupLarge]:
                    mergedSize === SelectorSize.Flex && xSmallScreenActive,
            },
            { [styles.checkboxGroupLarge]: mergedSize === SelectorSize.Large },
            {
                [styles.checkboxGroupMedium]:
                    mergedSize === SelectorSize.Medium,
            },
            { [styles.checkboxGroupSmall]: mergedSize === SelectorSize.Small },
            { ['in-form-item']: isFormItemInput },
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
                        disabled={mergedDisabled}
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
                        size={mergedSize}
                    />
                ))}
            </div>
        );
    }
);
