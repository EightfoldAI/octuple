import React, { FC, Ref, useContext } from 'react';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { SizeContext, Size } from '../ConfigProvider';
import { mergeClasses } from '../../shared/utilities';
import {
    CheckBox,
    CheckboxGroupProps,
    LabelAlign,
    LabelPosition,
    SelectorSize,
} from './';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { FormItemInputContext } from '../Form/Context';

import styles from './checkbox.module.scss';

export const CheckBoxGroup: FC<CheckboxGroupProps> = React.forwardRef(
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
            items = [],
            labelPosition = LabelPosition.End,
            labelAlign = LabelAlign.Center,
            layout = 'vertical',
            onChange,
            size = SelectorSize.Medium,
            style,
            value,
            ...rest
        },
        ref: Ref<HTMLInputElement>
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
            { ['in-form-item']: mergedFormItemInput },
            classNames,
        ]);

        return (
            <div
                className={checkboxGroupClassNames}
                style={style}
                role="group"
                aria-label={ariaLabel}
                id={id}
                ref={ref}
                {...rest}
            >
                {items.map((item) => (
                    <CheckBox
                        allowDisabledFocus={allowDisabledFocus}
                        disabled={mergedDisabled}
                        labelPosition={labelPosition}
                        labelAlign={labelAlign}
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
